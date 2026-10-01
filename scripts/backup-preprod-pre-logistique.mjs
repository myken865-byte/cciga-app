// Sauvegarde PREPROD avant la migration additive "Portail Logistique"
// (3 nouvelles tables : Room, MaintenanceRequest, LogisticsRequest — aucune
// table existante modifiée). Lecture seule : n'exécute aucune écriture.
//
// Usage (depuis la racine du projet) :
//   node --env-file=.env.preprod scripts/backup-preprod-pre-logistique.mjs
//
// Produit backups/pre-logistique-<horodatage>/manifest.json — preuve de
// l'état avant migration (rollback trivial : DROP TABLE des 3 nouvelles
// tables suffit, aucune table existante n'est touchée).

import { createClient } from "@libsql/client";
import { writeFileSync, mkdirSync } from "fs";
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
const backupDir = path.join(projectRoot, "backups", `pre-logistique-${timestamp}`);
mkdirSync(backupDir, { recursive: true });

const tablesResult = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma%' ORDER BY name",
);
const tableNames = tablesResult.rows.map((r) => r.name);

const counts = {};
for (const name of tableNames) {
  const res = await client.execute(`SELECT COUNT(*) as c FROM "${name}"`);
  counts[name] = Number(res.rows[0].c);
}

let commit = "unknown";
try {
  commit = execSync("git rev-parse HEAD", { cwd: projectRoot }).toString().trim();
} catch {
  // ignore
}

const manifest = {
  purpose: "Backup PREPROD avant migration additive 'Portail Logistique' (Room, MaintenanceRequest, LogisticsRequest)",
  timestamp,
  commit,
  tableCount: tableNames.length,
  tables: tableNames,
  rowCounts: counts,
};

writeFileSync(path.join(backupDir, "manifest.json"), JSON.stringify(manifest, null, 2));

console.log(`Backup manifest écrit : ${path.join(backupDir, "manifest.json")}`);
console.log(`${tableNames.length} tables existantes recensées, ${Object.values(counts).reduce((a, b) => a + b, 0)} lignes au total.`);
process.exit(0);
