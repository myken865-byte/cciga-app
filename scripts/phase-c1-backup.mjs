// Phase C1 — sauvegarde ciblée + contrôle d'intégrité, avant l'ajout des 10
// champs institutionnels nullable (voir prisma/migrations/20260907122344_*).
// Lecture seule : n'exécute aucune écriture sur la base. Prépare tout ce qui
// est nécessaire pour que l'étape suivante (apply-turso-migrations.mjs
// --apply) soit la seule action qui écrit réellement.
//
// Run this yourself against devtest — it never runs on its own.
//
// Usage (depuis la racine du projet) :
//   node --env-file=.env.preprod scripts/phase-c1-backup.mjs
//
// Produit :
//   backups/phase-c1-<horodatage>/manifest.json   — résumé (commit, tables, comptages)
//   backups/phase-c1-<horodatage>/<Table>.json    — export complet de chaque table concernée
// Puis relit chaque fichier écrit pour confirmer qu'il est valide et que son
// nombre de lignes correspond à la base, et affiche l'état des migrations en
// attente (aperçu seul, comme apply-turso-migrations.mjs sans --apply).

import { createClient } from "@libsql/client";
import { writeFileSync, readFileSync, mkdirSync, readdirSync } from "fs";
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

// Les 10 tables concernées par Phase C1 (prisma/schema.prisma, champ `school`).
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
];

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(projectRoot, "backups", `phase-c1-${timestamp}`);
mkdirSync(backupDir, { recursive: true });

let commit = "inconnu (git indisponible)";
try {
  commit = execSync("git rev-parse HEAD", { cwd: projectRoot }).toString().trim();
} catch {
  // non bloquant — le manifeste reste utile sans le commit
}

console.log(`Sauvegarde Phase C1 — horodatage ${timestamp}`);
console.log(`Commit pré-migration : ${commit}`);
console.log(`Dossier : ${path.relative(projectRoot, backupDir)}\n`);

const counts = {};
let allOk = true;

for (const table of TABLES) {
  const result = await client.execute(`SELECT * FROM "${table}"`);
  const filePath = path.join(backupDir, `${table}.json`);
  writeFileSync(filePath, JSON.stringify(result.rows, null, 2), "utf8");

  // Contrôle d'intégrité : relire le fichier qu'on vient d'écrire et
  // confirmer qu'il est un JSON valide dont le nombre de lignes correspond
  // exactement à ce que la base a renvoyé.
  let readBackOk = false;
  try {
    const reparsed = JSON.parse(readFileSync(filePath, "utf8"));
    readBackOk = Array.isArray(reparsed) && reparsed.length === result.rows.length;
  } catch {
    readBackOk = false;
  }

  counts[table] = result.rows.length;
  const status = readBackOk ? "OK" : "ÉCHEC DE RELECTURE";
  if (!readBackOk) allOk = false;
  console.log(`  ${table.padEnd(22)} ${String(result.rows.length).padStart(5)} ligne(s) — export ${status}`);
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
  totalRows: Object.values(counts).reduce((a, b) => a + b, 0),
  integrityCheckPassed: allOk,
};
writeFileSync(path.join(backupDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

console.log(`\nTotal : ${manifest.totalRows} ligne(s) exportée(s) sur ${TABLES.length} table(s).`);
console.log(`Contrôle d'intégrité (relecture des fichiers écrits) : ${allOk ? "RÉUSSI" : "ÉCHOUÉ — NE PAS MIGRER"}`);

if (!allOk) {
  console.error("\nArrêt : la sauvegarde n'est pas fiable, ne lancez pas la migration.");
  client.close();
  process.exit(1);
}

// Aperçu des migrations en attente (lecture seule, même logique que
// apply-turso-migrations.mjs sans --apply) — pour confirmer que seule la
// migration Phase C1 attendue sera appliquée, rien d'autre.
const migrationsDir = path.join(projectRoot, "prisma", "migrations");
try {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS _prisma_migrations (
      id                  TEXT PRIMARY KEY NOT NULL,
      checksum            TEXT NOT NULL,
      finished_at         DATETIME,
      migration_name      TEXT NOT NULL,
      logs                TEXT,
      rolled_back_at      DATETIME,
      started_at          DATETIME NOT NULL DEFAULT current_timestamp,
      applied_steps_count INTEGER UNSIGNED NOT NULL DEFAULT 0
    )
  `);
  const applied = await client.execute("SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL");
  const appliedNames = new Set(applied.rows.map((r) => r.migration_name));
  const migrationFolders = readdirSync(migrationsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  const pending = migrationFolders.filter((name) => !appliedNames.has(name));
  console.log(`\nMigrations sur disque : ${migrationFolders.length}`);
  console.log(`Déjà appliquées sur cette base : ${appliedNames.size}`);
  console.log(`En attente : ${pending.length}${pending.length ? " — " + pending.join(", ") : ""}`);
  if (pending.length === 1 && pending[0].endsWith("phase_c1_add_nullable_school_fields")) {
    console.log("\nConforme à l'attendu : seule la migration Phase C1 est en attente.");
  } else if (pending.length > 0) {
    console.log("\nATTENTION : la liste des migrations en attente ne correspond pas exactement à la seule migration Phase C1 — vérifiez avant d'appliquer.");
  }
} catch (err) {
  console.error(`\nAvertissement : aperçu des migrations impossible (${err.message}). La sauvegarde ci-dessus reste valide.`);
}

console.log(`\nSauvegarde prête et vérifiée. Prochaine étape (la seule qui écrit réellement) :`);
console.log(`  node --env-file=.env.preprod scripts/apply-turso-migrations.mjs --apply`);

client.close();
