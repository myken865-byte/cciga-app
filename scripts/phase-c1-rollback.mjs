// Phase C1 — rollback. À N'UTILISER QUE SI UNE ANOMALIE EST DÉTECTÉE après
// l'application de la migration 20260907122344_phase_c1_add_nullable_school_fields.
//
// Comme cette migration n'a fait qu'AJOUTER 10 colonnes nullable (aucune
// donnée existante transformée, aucune ligne supprimée ou déplacée), le
// rollback le plus sûr est de retirer ces colonnes — SQLite/Turso supporte
// DROP COLUMN nativement, aucune restauration depuis la sauvegarde JSON
// n'est nécessaire pour ce cas précis (elle reste disponible si un doute
// subsiste sur l'intégrité des données elles-mêmes).
//
// Run this yourself against devtest — it never runs on its own, et
// uniquement après une anomalie réellement constatée.
//
// Usage :
//   node --env-file=.env.preprod scripts/phase-c1-rollback.mjs           (aperçu)
//   node --env-file=.env.preprod scripts/phase-c1-rollback.mjs --apply   (exécute)

import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Load your .env.preprod first (--env-file=.env.preprod).");
  process.exit(1);
}
const apply = process.argv.includes("--apply");

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

console.log("Rollback Phase C1 — retire la colonne \"school\" des 10 tables concernées.\n");

if (!apply) {
  for (const t of TABLES) console.log(`  ALTER TABLE "${t}" DROP COLUMN "school";`);
  console.log("\nAperçu uniquement (aucune écriture). Relancer avec --apply pour exécuter.");
  client.close();
  process.exit(0);
}

for (const table of TABLES) {
  try {
    await client.execute(`ALTER TABLE "${table}" DROP COLUMN "school"`);
    console.log(`  ${table} — colonne "school" retirée.`);
  } catch (err) {
    console.error(`  ÉCHEC sur ${table} : ${err.message}`);
    console.error("  Arrêt. Les tables déjà traitées ci-dessus restent modifiées ; vérifiez manuellement avant de continuer.");
    client.close();
    process.exit(1);
  }
}

await client.execute(
  `DELETE FROM _prisma_migrations WHERE migration_name = '20260907122344_phase_c1_add_nullable_school_fields'`,
).catch(() => {});

console.log("\nRollback terminé. Les 10 colonnes \"school\" ont été retirées ; aucune autre donnée n'a été touchée.");
client.close();
