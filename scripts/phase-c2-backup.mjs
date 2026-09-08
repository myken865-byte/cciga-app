// Phase C2 — sauvegarde ciblée avant attribution institutionnelle contrôlée
// (backfill) sur PREPROD. Lecture seule : n'exécute aucune écriture.
//
// Reprend le motif de scripts/phase-c1-backup.mjs, étendu à InventoryItem
// (11e table concernée par le champ `school`, ajoutée après Phase C1 par le
// mandat "Option 2 — InventoryItem nullable").
//
// Run this yourself against devtest — it never runs on its own.
//
// Usage (depuis la racine du projet) :
//   node --env-file=.env.preprod scripts/phase-c2-backup.mjs
//
// Produit :
//   backups/phase-c2-<horodatage>/manifest.json   — résumé (commit, tables, comptages avant traitement)
//   backups/phase-c2-<horodatage>/<Table>.json    — export complet de chaque table concernée

import { createClient } from "@libsql/client";
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Load your .env.preprod first (--env-file=.env.preprod).");
  process.exit(1);
}

// Les 11 tables concernées par le champ `school` (10 de Phase C1 + InventoryItem).
const TABLES = [
  "Badge",
  "Employee",
  "InfirmaryVisit",
  "PsychosocialCase",
  "Book",
  "BookLoan",
  "Vehicle",
  "TransportAssignment",
  "CanteenMenu",
  "CanteenReservation",
  "InventoryItem",
];

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(projectRoot, "backups", `phase-c2-${timestamp}`);
mkdirSync(backupDir, { recursive: true });

let commit = "inconnu (git indisponible)";
try {
  commit = execSync("git rev-parse HEAD", { cwd: projectRoot }).toString().trim();
} catch {
  // non bloquant
}

console.log(`Sauvegarde Phase C2 — horodatage ${timestamp}`);
console.log(`Commit pré-backfill : ${commit}`);
console.log(`Dossier : ${path.relative(projectRoot, backupDir)}\n`);

const counts = {};
const nullSchoolCounts = {};
let allOk = true;

for (const table of TABLES) {
  const result = await client.execute(`SELECT * FROM "${table}"`);
  const filePath = path.join(backupDir, `${table}.json`);
  writeFileSync(filePath, JSON.stringify(result.rows, null, 2), "utf8");

  let readBackOk = false;
  try {
    const reparsed = JSON.parse(readFileSync(filePath, "utf8"));
    readBackOk = Array.isArray(reparsed) && reparsed.length === result.rows.length;
  } catch {
    readBackOk = false;
  }

  counts[table] = result.rows.length;
  nullSchoolCounts[table] = result.rows.filter((r) => r.school === null || r.school === undefined).length;
  const status = readBackOk ? "OK" : "ÉCHEC DE RELECTURE";
  if (!readBackOk) allOk = false;
  console.log(
    `  ${table.padEnd(22)} ${String(result.rows.length).padStart(5)} ligne(s), ${String(nullSchoolCounts[table]).padStart(5)} avec school=NULL — export ${status}`,
  );
}

const manifest = {
  timestamp,
  commit,
  databaseUrlHost: (() => {
    try {
      return new URL(url).host;
    } catch {
      return "non-URL (probablement file:./dev.db)";
    }
  })(),
  tables: counts,
  nullSchoolBeforeBackfill: nullSchoolCounts,
  totalRows: Object.values(counts).reduce((a, b) => a + b, 0),
  integrityCheckPassed: allOk,
};
writeFileSync(path.join(backupDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

console.log(`\nTotal : ${manifest.totalRows} ligne(s) exportée(s) sur ${TABLES.length} table(s).`);
console.log(`Contrôle d'intégrité (relecture des fichiers écrits) : ${allOk ? "RÉUSSI" : "ÉCHOUÉ — NE PAS LANCER LE BACKFILL"}`);

if (!allOk) {
  console.error("\nArrêt : la sauvegarde n'est pas fiable, ne lancez pas le backfill Phase C2.");
  client.close();
  process.exit(1);
}

console.log(`\nSauvegarde prête et vérifiée (lisible, restaurable manuellement à partir des fichiers JSON ci-dessus).`);
console.log(`Prochaine étape (aperçu, aucune écriture) :`);
console.log(`  node --env-file=.env.preprod scripts/phase-c2-backfill.mjs`);
console.log(`Puis, après relecture du plan (aucune écriture avant cette commande) :`);
console.log(`  node --env-file=.env.preprod scripts/phase-c2-backfill.mjs --apply`);

client.close();
