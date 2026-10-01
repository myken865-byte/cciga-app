const { app, BrowserWindow, ipcMain, Menu, session, dialog, shell } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

// Mandat "Desktop Production Readiness" (2026-09-12) : l'hote distant vient
// desormais de config.js (jamais code en dur ici), lui-meme choisi par
// `node scripts/set-target.js devtest|production` AVANT le packaging - un
// build Desktop deja packagé ne peut plus changer d'environnement a
// l'execution (pas de variable d'environnement lue au runtime : un
// installeur distribue a un utilisateur final n'a aucune raison d'en avoir
// une). Filet de securite : meme si config.js etait corrompu/vide/local,
// l'app refuse de demarrer plutot que de se connecter silencieusement a un
// hote inattendu - un build Production ne doit jamais pouvoir charger
// DEVTEST, et reciproquement.
const { REMOTE_HOST } = require("./config.js");
const ALLOWED_HOSTS = ["cciga-app-devtest.vercel.app", "cciga-app.vercel.app"];
if (!ALLOWED_HOSTS.includes(REMOTE_HOST)) {
  dialog.showErrorBox(
    "Configuration CCIGA App invalide",
    `Hôte distant non autorisé ou introuvable : "${REMOTE_HOST}". ` +
      `Seuls ${ALLOWED_HOSTS.join(" et ")} sont acceptés. L'application ne peut pas démarrer.`,
  );
  app.quit();
  process.exit(1);
}
const REMOTE_ORIGIN = `https://${REMOTE_HOST}`;
const APP_TITLE = "CCIGA App";
const HOME_FILE = path.join(__dirname, "home.html");
const LOADING_FILE = path.join(__dirname, "loading.html");
const ERROR_FILE = path.join(__dirname, "error.html");

// Reprend exactement le mappage deja utilise par components/DevBypassPicker.tsx
// (lib/roles.ts) - aucune route inventee, les 8 portails historiques sont
// integralement conserves ; Rectorat/Decanat/Coordination/Logistique ajoutes
// avec les routes deja definies dans proxy.ts et lib/roles.ts.
const ROLE_PATHS = {
  SUPER_ADMIN: "/admin/admissions",
  ADMIN: "/admin/admissions",
  SECRETARIAT: "/admin/admissions",
  STUDENT: "/portail/etudiant",
  PARENT: "/portail/parent",
  TEACHER: "/portail/enseignant",
  ACADEMIC_OFFICER: "/portail/responsable",
  CONSEILLER: "/admin/psychosocial",
  RECTEUR: "/portail/rectorat",
  DOYEN: "/portail/decanat",
  COORDONNATEUR: "/portail/coordination",
  LOGISTICIEN: "/portail/logistique",
};

let mainWindow;
let lastAttemptedUrl = null;

// Imprimer directement via Electron (webContents.print) plutôt que de
// laisser Windows tenter d'imprimer la fenêtre lui-même — c'est cette
// dernière voie qui déclenche "This app doesn't support print preview"
// (aucun gestionnaire d'impression n'était câblé nulle part dans l'app).
// Cible la fenêtre qui a le focus, qu'il s'agisse de la fenêtre principale
// ou d'une fenêtre enfant ouverte pour afficher un PDF (ex. carnet de
// paiement, target="_blank").
function printWebContents(contents) {
  if (!contents) return;
  contents.print({ silent: false, printBackground: true }, (success, errorType) => {
    // Une boîte de dialogue native, jamais showError (qui navigue la
    // fenêtre PRINCIPALE) — l'échec peut venir d'une fenêtre enfant (PDF).
    if (!success && errorType) {
      dialog.showErrorBox("Impossible d'imprimer", errorType);
    }
  });
}

function printFocusedWindow() {
  printWebContents(BrowserWindow.getFocusedWindow()?.webContents);
}

function goHome() {
  lastAttemptedUrl = null;
  mainWindow.loadFile(HOME_FILE);
}

// Toute navigation vers un portail distant passe par ici : un ecran de
// chargement local (jamais de blanc nu) s'affiche d'abord, l'URL tentee est
// memorisee pour permettre un vrai "Reessayer" depuis l'ecran d'erreur.
async function navigateTo(url) {
  lastAttemptedUrl = url;
  try {
    await mainWindow.loadFile(LOADING_FILE);
  } catch {
    // L'ecran de chargement local ne peut pas echouer (fichier embarque) ;
    // si jamais il le fait, on continue quand meme vers la cible reelle.
  }
  mainWindow.loadURL(url);
}

function showError(message, detail) {
  const search = new URLSearchParams({ message, detail: detail || "" }).toString();
  mainWindow.loadFile(ERROR_FILE, { search });
}

// CCIGA App est un chargeur distant (voir VERSION.txt du dossier de
// distribution) : tout portail necessite une connexion Internet active vers
// le serveur. Ces codes Chromium signalent specifiquement une absence de
// connectivite (pas de reseau, DNS injoignable, delai depasse) plutot qu'une
// panne du serveur distant lui-meme (ex. -102 CONNECTION_REFUSED reste dans
// le message generique) - la distinction donne un message reellement utile
// plutot qu'un "erreur" vague, sans pretendre a un mode hors ligne qui n'existe pas.
const OFFLINE_ERROR_CODES = new Set([-105, -106, -109, -118, -21]);

function describeLoadFailure(errorCode, errorDescription) {
  if (OFFLINE_ERROR_CODES.has(errorCode)) {
    return {
      message: "Connexion Internet requise",
      detail:
        "CCIGA App a besoin d'un acces Internet actif pour afficher les portails " +
        `(aucune donnee n'est stockee sur cet ordinateur). Verifiez votre connexion, ` +
        `puis reessayez. (${errorDescription}, code ${errorCode})`,
    };
  }
  return null;
}

// Mandat "Desktop Production Readiness" (2026-09-12) §7 : aucune fenêtre
// (principale ou enfant, ex. target="_blank" pour un PDF) ne doit pouvoir
// naviguer vers un domaine hors des deux hôtes autorisés. Un vrai lien
// externe (ex. réseaux sociaux dans le site public) s'ouvre dans le
// navigateur système plutôt que dans une fenêtre Electron. contextIsolation
// et nodeIntegration restaient déjà corrects (voir webPreferences
// ci-dessous) — seule cette restriction de navigation manquait.
function isAllowedOrigin(urlString) {
  try {
    const url = new URL(urlString);
    // file: couvre les ecrans locaux embarques (accueil/chargement/erreur,
    // charges via loadFile depuis le processus principal) - jamais une
    // navigation initiee par le contenu distant lui-meme vers un fichier local.
    if (url.protocol === "file:") return true;
    return url.host === new URL(REMOTE_ORIGIN).host;
  } catch {
    return false;
  }
}

function restrictNavigation(contents) {
  contents.on("will-navigate", (event, url) => {
    if (!isAllowedOrigin(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
  contents.setWindowOpenHandler(({ url }) => {
    if (isAllowedOrigin(url)) {
      return { action: "allow" };
    }
    shell.openExternal(url);
    return { action: "deny" };
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    title: APP_TITLE,
    icon: path.join(__dirname, "icon.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Le nom affiche de l'application reste "CCIGA App" en toute circonstance,
  // independamment du <title> de la page chargee (accueil local ou portail distant).
  mainWindow.on("page-title-updated", (event) => {
    event.preventDefault();
    mainWindow.setTitle(APP_TITLE);
  });

  // Aucun ecran blanc n'est jamais tolere : un chargement distant qui echoue
  // (reseau, DNS, pare-feu/antivirus du poste, certificat, timeout) affiche
  // un ecran d'erreur clair avec Reessayer/Accueil au lieu de rester nu.
  // isMainFrame exclut les echecs de sous-ressources (police, image) qui ne
  // doivent pas faire disparaitre une page par ailleurs correctement chargee.
  // -3 (ERR_ABORTED) est ignore : declenche normalement quand une navigation
  // est remplacee par une autre (double-clic, retour rapide), pas une vraie panne.
  // Limite au domaine distant : un echec sur error.html/loading.html eux-memes
  // (paquet casse) ne doit jamais reboucler sur showError -> loadFile(error.html).
  mainWindow.webContents.on(
    "did-fail-load",
    (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      if (!isMainFrame || errorCode === -3 || !validatedURL.startsWith(REMOTE_ORIGIN)) return;
      const offline = describeLoadFailure(errorCode, errorDescription);
      if (offline) {
        showError(offline.message, offline.detail);
        return;
      }
      showError(
        "Impossible de charger CCIGA App",
        `${errorDescription} (code ${errorCode}) — ${validatedURL}`,
      );
    },
  );

  mainWindow.webContents.on("render-process-gone", (_event, details) => {
    showError("L'affichage de CCIGA App a ete interrompu", `Raison : ${details.reason}`);
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "CCIGA App",
      submenu: [
        { label: "Accueil (portails)", accelerator: "CmdOrCtrl+H", click: goHome },
        { label: "Site public CCIGA", accelerator: "CmdOrCtrl+Shift+H", click: () => navigateTo(REMOTE_ORIGIN) },
        { type: "separator" },
        { label: "Imprimer", accelerator: "CmdOrCtrl+P", click: printFocusedWindow },
        { type: "separator" },
        { label: "Quitter", role: "quit" },
      ],
    },
  ]);
  // Menu global : le raccourci Ctrl+P cible la fenêtre qui a le focus au
  // moment de l'appui, y compris une fenêtre enfant (carnet de paiement
  // ouvert en target="_blank"), pas seulement la fenêtre principale.
  Menu.setApplicationMenu(menu);

  goHome();
}

// Le renderer (page locale ou distante) n'a jamais acces a Node ni au cookie
// directement - seul le processus principal pose le cookie de session DEV/TEST
// et navigue vers le portail choisi, exactement comme /api/dev-bypass le fait
// deja cote serveur (lib/devBypass.ts), sans dupliquer cette logique metier.
ipcMain.handle("open-portal", async (event, role) => {
  const targetPath = ROLE_PATHS[role];
  if (!targetPath) return { ok: false };

  await session.defaultSession.cookies.set({
    url: REMOTE_ORIGIN,
    name: "cciga_dev_bypass_role",
    value: role,
    httpOnly: true,
    sameSite: "lax",
    expirationDate: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
  });

  await navigateTo(REMOTE_ORIGIN + targetPath);
  return { ok: true };
});

// Correction "Actualités non visible" (2026-09-06) : la seule liaison
// existante entre l'app locale et le serveur distant menait aux portails
// authentifies (ROLE_PATHS) - aucun chemin n'atteignait jamais le site
// public (/, /actualites, /admission, /programmes, /a-propos...), ce qui
// rendait chaque refonte visuelle de ces pages invisible depuis l'app
// reellement utilisee, meme deployee et correcte cote serveur.
ipcMain.handle("open-public-site", async () => {
  await navigateTo(REMOTE_ORIGIN);
  return { ok: true };
});

ipcMain.handle("retry-load", async () => {
  if (lastAttemptedUrl) await navigateTo(lastAttemptedUrl);
  else goHome();
  return { ok: true };
});

ipcMain.handle("go-home", async () => {
  goHome();
  return { ok: true };
});

// Filet de sécurité : intercepte Ctrl+P au niveau clavier sur CHAQUE
// webContents (fenêtre principale et toute fenêtre enfant, ex. le PDF du
// carnet de paiement ouvert en target="_blank") avant que le visualiseur PDF
// intégré de Chromium ne tente de gérer l'impression lui-même — c'est cette
// tentative interne, sans gestionnaire câblé côté app, qui provoquait
// "This app doesn't support print preview". preventDefault() empêche le
// double déclenchement si le menu natif gère aussi le raccourci.
app.on("web-contents-created", (_event, contents) => {
  restrictNavigation(contents);
  contents.on("before-input-event", (event, input) => {
    const isPrintShortcut =
      input.type === "keyDown" && input.key.toLowerCase() === "p" && (input.control || input.meta) && !input.shift && !input.alt;
    if (!isPrintShortcut) return;
    event.preventDefault();
    printWebContents(contents);
  });
});

// Mise a jour automatique (mandat "installation sans intervention humaine",
// 2026-09-06) : verifie les Releases GitHub du depot (package.json ->
// build.publish), telecharge en arriere-plan si une version plus recente
// existe, puis installe seule au prochain redemarrage normal de
// l'application - comportement par defaut d'electron-updater
// (autoDownload/autoInstallOnAppQuit), jamais desactive ici. Aucune boite de
// dialogue n'est jamais montree a l'utilisateur : une verification qui
// echoue (pas encore de Release publiee, hors ligne...) reste totalement
// silencieuse plutot que d'afficher une erreur pour un mecanisme de fond.
// Ne remplace pas le premier telechargement/installation manuelle d'une
// version (le consentement Windows SmartScreen/UAC sur un logiciel non
// signe est impose par Windows lui-meme, aucun code ne peut le supprimer) -
// seules les mises a jour APRES cette premiere installation deviennent
// automatiques.
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.on("error", () => {
  // Volontairement silencieux : voir commentaire ci-dessus.
});

function checkForUpdatesSilently() {
  autoUpdater.checkForUpdates().catch(() => {
    // Idem : aucune Release disponible ou reseau indisponible ne doit
    // jamais interrompre l'utilisateur.
  });
}

app.whenReady().then(() => {
  createWindow();
  checkForUpdatesSilently();
  // Re-verifie periodiquement pour une session laissee ouverte longtemps.
  setInterval(checkForUpdatesSilently, 4 * 60 * 60 * 1000);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
