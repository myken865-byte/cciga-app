#!/usr/bin/env node
// Garde-fou de build Desktop (mandat "Desktop Production Readiness",
// 2026-09-12) — même principe que le garde-fou Android déjà en place
// (android-release-aab.yml / google-play-internal-test-upload.yml) :
// PATCHER puis REVÉRIFIER le résultat avant de laisser le build continuer,
// jamais une simple substitution de texte suivie d'une confiance aveugle.
//
// Usage :
//   node scripts/set-target.js devtest
//   node scripts/set-target.js production
//
// N'écrit QUE desktop/config.js (jamais main.js, jamais les gabarits
// config.devtest.js/config.production.js) — origines autorisées : les deux
// listées ci-dessous, aucune autre.

const fs = require("fs");
const path = require("path");

const DESKTOP_DIR = path.join(__dirname, "..");

const ALLOWED_ORIGINS = {
  devtest: "cciga-app-devtest.vercel.app",
  production: "cciga-app.vercel.app",
};

function fail(message) {
  console.error(`\n❌ ÉCHEC DU GARDE-FOU DESKTOP : ${message}\n`);
  console.error("Le build ne continue pas. config.js n'a pas été modifié de façon incertaine.");
  process.exit(1);
}

const target = process.argv[2];
if (target !== "devtest" && target !== "production") {
  fail(`cible invalide "${target}" — utiliser exactement "devtest" ou "production".`);
}

const expectedHost = ALLOWED_ORIGINS[target];
const templatePath = path.join(DESKTOP_DIR, `config.${target}.js`);
const activePath = path.join(DESKTOP_DIR, "config.js");

if (!fs.existsSync(templatePath)) {
  fail(`gabarit introuvable : ${templatePath}`);
}

// Étape 1 — PATCH : copie littérale du gabarit vers le fichier actif.
fs.copyFileSync(templatePath, activePath);

// Étape 2 — VÉRIFICATION : jamais faire confiance à la copie elle-même,
// relire ce qui a été réellement écrit sur disque et le comparer à ce qui
// est attendu. Toute anomalie (hôte vide, localhost, mauvais hôte, hôte
// inconnu) fait échouer le build — jamais un Desktop Production connecté à
// DEVTEST en silence.
delete require.cache[require.resolve(activePath)];
// eslint-disable-next-line import/no-dynamic-require, global-require
const written = require(activePath);
const resolvedHost = written && written.REMOTE_HOST;

if (!resolvedHost || typeof resolvedHost !== "string") {
  fail("config.js écrit ne contient aucun REMOTE_HOST exploitable (vide/absent).");
}
if (resolvedHost.includes("localhost") || resolvedHost.includes("127.0.0.1")) {
  fail(`config.js résout vers un hôte local ("${resolvedHost}") — jamais autorisé pour un build packagé.`);
}
if (!Object.values(ALLOWED_ORIGINS).includes(resolvedHost)) {
  fail(`config.js résout vers un hôte inconnu ("${resolvedHost}") — seuls ${Object.values(ALLOWED_ORIGINS).join(" et ")} sont autorisés.`);
}
if (resolvedHost !== expectedHost) {
  fail(`cible "${target}" attendait "${expectedHost}" mais config.js résout vers "${resolvedHost}".`);
}
if (target === "production" && resolvedHost === ALLOWED_ORIGINS.devtest) {
  // Filet de sécurité supplémentaire, redondant avec le check ci-dessus mais
  // explicite : un build Production ne doit JAMAIS pouvoir résoudre DEVTEST.
  fail("un build Production a résolu DEVTEST — refusé.");
}

console.log(`✅ Garde-fou Desktop : config.js résout vers "${resolvedHost}" (cible "${target}"), conforme.`);
