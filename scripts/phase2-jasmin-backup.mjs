// Phase 2 (Jasmine Kindergarten English Program, 2026-09-09) — sauvegarde
// avant migration, PREPROD uniquement. Contrairement à Phase C1 (qui ajoutait
// des colonnes à des tables existantes contenant des données réelles), cette
// migration ne fait que CREATE TABLE de 6 tables entièrement nouvelles et
// vides — aucune table existante n'est modifiée. La sauvegarde consiste donc
// à enregistrer le nombre de lignes de CHAQUE table déjà présente (pas
// seulement une liste ciblée), pour pouvoir prouver après coup qu'aucune n'a
// varié — le critère d'arrêt documenté dans docs/DEPLOIEMENT.md.
//
// Run this yourself against preprod — it never runs on its own.
//
// Usage (depuis la racine du projet) :
//   node --env-file=.env.preprod scripts/phase2-jasmin-backup.mjs
//
// Produit :
//   backups/phase2-jasmin-<horodatage>/manifest.json — comptage de toutes les
//   tables existantes + aperçu des migrations en attente (lecture seule).

import { createClient } from "@libsql/client";
import { writeFileSync, mkdirSync, readdirSync } from "fs";
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

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(projectRoot, "backups", `phase2-jasmin-${timestamp}`);
mkdirSync(backupDir, { recursive: true });

let commit = "inconnu (git indisponible)";
try {
  commit = execSync("git rev-parse HEAD", { cwd: projectRoot }).toString().trim();
} catch {
  // non bloquant
}

console.log(`Sauvegarde Phase 2 (Jasmine Kindergarten) — horodatage ${timestamp}`);
console.log(`Commit pré-migration : ${commit}`);
console.log(`Dossier : ${path.relative(projectRoot, backupDir)}\n`);

const tablesResult = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != '_prisma_migrations' ORDER BY name",
);
const tableNames = tablesResult.rows.map((r) => r.name);

const counts = {};
for (const table of tableNames) {
  const result = await client.execute(`SELECT COUNT(*) as c FROM "${table}"`);
  counts[table] = Number(result.rows[0].c);
  console.log(`  ${table.padEnd(28)} ${String(counts[table]).padStart(6)} ligne(s)`);
}

const manifest = {
  timestamp,
  commit,
  databaseUrlHost: (() => {
    try {
      return new URL(url).host;
    } catch {
      return "non-URL";
    }
  })(),
  existingTableCount: tableNames.length,
  rowCountsBeforeMigration: counts,
  totalRowsBeforeMigration: Object.values(counts).reduce((a, b) => a + b, 0),
};
writeFileSync(path.join(backupDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

console.log(
  `\nTotal : ${manifest.totalRowsBeforeMigration} ligne(s) sur ${tableNames.length} table(s) existante(s), avant migration.`,
);

// Aperçu des migrations en attente (lecture seule).
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
  if (pending.length === 1 && pending[0].endsWith("add_jasmin_kindergarten_module")) {
    console.log("\nConforme à l'attendu : seule la migration Phase 2 Jasmin Kindergarten est en attente.");
  } else if (pending.length > 0) {
    console.log("\nATTENTION : la liste des migrations en attente ne correspond pas exactement à la seule migration Phase 2 — vérifiez avant d'appliquer.");
  }
} catch (err) {
  console.error(`\nAvertissement : aperçu des migrations impossible (${err.message}). La sauvegarde ci-dessus reste valide.`);
}

console.log(`\nSauvegarde prête. Prochaine étape (la seule qui écrit réellement) :`);
console.log(`  node --env-file=.env.preprod scripts/apply-turso-migrations.mjs --apply`);

client.close();
