// Marks a manifest entry as "validated" or "rejected" after visual review
// (done by reading the PNG directly — see project workflow notes). Usage:
//
//   node scripts/eps-manuel/mark-validated.mjs 4 1 validated
//   node scripts/eps-manuel/mark-validated.mjs 4 1 rejected "raison courte"
import { loadManifest, saveManifest, getEntry, upsertEntry } from "./manifest.mjs";

const [, , chapterArg, illArg, statusArg, reasonArg] = process.argv;
const chapterNum = Number(chapterArg);
const illNumber = Number(illArg);

if (!chapterNum || !illNumber || !["validated", "rejected"].includes(statusArg)) {
  console.error("Usage: node mark-validated.mjs <chapitre> <illustration> <validated|rejected> [raison]");
  process.exit(1);
}

const manifest = loadManifest();
const entry = getEntry(manifest, chapterNum, illNumber);
if (!entry) {
  console.error(`Aucune entrée manifest pour Chapitre ${chapterNum}, illustration ${illNumber}. Génère-la d'abord.`);
  process.exit(1);
}

upsertEntry(manifest, chapterNum, illNumber, {
  statut: statusArg,
  ...(statusArg === "rejected" ? { raisonRejet: reasonArg || "non précisée", dateRevue: new Date().toISOString() } : { dateValidation: new Date().toISOString() }),
});
saveManifest(manifest);
console.log(`Illustration ${chapterNum}.${illNumber} marquée "${statusArg}".`);
