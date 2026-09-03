const { app, BrowserWindow, ipcMain, Menu, session } = require("electron");
const path = require("path");

// Environnement DEV/TEST/PREPROD isole - jamais la Production reelle.
// L'activation d'une infrastructure Production distante necessite une
// autorisation separee et explicite (non donnee ici).
const REMOTE_HOST = "cciga-app-devtest.vercel.app";
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
        { label: "Accueil", accelerator: "CmdOrCtrl+H", click: goHome },
        { type: "separator" },
        { label: "Quitter", role: "quit" },
      ],
    },
  ]);
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

ipcMain.handle("retry-load", async () => {
  if (lastAttemptedUrl) await navigateTo(lastAttemptedUrl);
  else goHome();
  return { ok: true };
});

ipcMain.handle("go-home", async () => {
  goHome();
  return { ok: true };
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
