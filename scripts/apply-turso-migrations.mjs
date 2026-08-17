// Safer, reusable replacement for the old "write a one-off script per
// migration" approach. Applies any prisma/migrations/*/migration.sql that
// hasn't been applied to Turso yet, tracked in a _prisma_migrations
// bookkeeping table (same shape Prisma itself uses), in a transaction per
// migration, with a mandatory dry-run preview before anything is written.
//
// Run this yourself against production — it never runs on its own.
//
// IMPORTANT ONE-TIME STEP: every migration up to this point was already
// applied to Turso by hand, over several rounds, with no _prisma_migrations
// bookkeeping. The very first time you use this script, run it with
// --baseline to record all migrations currently on disk as already-applied
// (bookkeeping only — no SQL runs, nothing is touched). Skipping this step
// would make the next --apply try to CREATE TABLE things that already
// exist, and fail.
//
// Usage (from the project root):
//   node --env-file=.env.production scripts/apply-turso-migrations.mjs --baseline
//     → ONE-TIME ONLY. Marks every migration folder currently on disk as
//     applied, without running any SQL. Refuses to run if the bookkeeping
//     table already has any rows (so it can't be used to skip a real
//     migration later by mistake).
//
//   node --env-file=.env.production scripts/apply-turso-migrations.mjs
//     → dry run: lists which migrations are pending, applies nothing.
//
//   node --env-file=.env.production scripts/apply-turso-migrations.mjs --apply
//     → applies every pending migration, in order, one transaction each.
//     Stops immediately on the first failure so later migrations are never
//     applied on top of a partially-applied one.

import { createClient } from "@libsql/client";
import { readFileSync, readdirSync } from "fs";
import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, "..", "prisma", "migrations");
const apply = process.argv.includes("--apply");
const baseline = process.argv.includes("--baseline");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Load your .env.production first (--env-file=.env.production).");
  process.exit(1);
}

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

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

if (baseline) {
  if (appliedNames.size > 0) {
    console.error(
      `Le baseline a déjà été fait (${appliedNames.size} migration(s) déjà enregistrée(s)). ` +
        "--baseline ne peut être utilisé qu'une seule fois, sur une table de suivi vide. " +
        "Utilisez --apply pour les migrations suivantes.",
    );
    client.close();
    process.exit(1);
  }
  console.log(`Baseline : enregistrement de ${migrationFolders.length} migration(s) comme déjà appliquées (aucun SQL exécuté)…`);
  for (const name of migrationFolders) {
    const sql = readFileSync(path.join(migrationsDir, name, "migration.sql"), "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    await client.execute({
      sql: `INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, started_at, applied_steps_count)
            VALUES (?, ?, datetime('now'), ?, datetime('now'), 0)`,
      args: [checksum, checksum, name],
    });
    console.log(`  ${name} — enregistrée.`);
  }
  console.log("\nBaseline terminé. La prochaine migration ajoutée au dossier prisma/migrations sera la première que --apply exécutera réellement.");
  client.close();
  process.exit(0);
}

const pending = migrationFolders.filter((name) => !appliedNames.has(name));

console.log(`Migrations sur disque : ${migrationFolders.length}`);
console.log(`Déjà appliquées sur Turso : ${appliedNames.size}`);
console.log(`En attente : ${pending.length}${pending.length ? " — " + pending.join(", ") : ""}`);

if (pending.length === 0) {
  console.log("Rien à faire. La base Turso est à jour.");
  client.close();
  process.exit(0);
}

if (!apply) {
  console.log("\nMode aperçu uniquement (aucune écriture). Relancer avec --apply pour appliquer ces migrations.");
  client.close();
  process.exit(0);
}

for (const name of pending) {
  const sqlPath = path.join(migrationsDir, name, "migration.sql");
  const sql = readFileSync(sqlPath, "utf8");
  const checksum = createHash("sha256").update(sql).digest("hex");

  const statements = sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((s) => s.trim())
    .filter(Boolean);

  console.log(`\nApplication de ${name} (${statements.length} instruction(s))…`);

  const tx = await client.transaction("write");
  try {
    for (const statement of statements) {
      await tx.execute(statement);
    }
    await tx.execute({
      sql: `INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, started_at, applied_steps_count)
            VALUES (?, ?, datetime('now'), ?, datetime('now'), ?)`,
      args: [checksum, checksum, name, statements.length],
    });
    await tx.commit();
    console.log(`  OK — ${name} appliquée et enregistrée.`);
  } catch (err) {
    await tx.rollback();
    console.error(`  ÉCHEC sur ${name} : ${err.message}`);
    console.error("  Arrêt — aucune migration suivante ne sera appliquée. La base n'a pas été modifiée par cette étape (transaction annulée).");
    client.close();
    process.exit(1);
  } finally {
    tx.close();
  }
}

console.log("\nTerminé. Toutes les migrations en attente ont été appliquées.");
client.close();
