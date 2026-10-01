import fs from "node:fs";
import crypto from "node:crypto";

function sha(p) { return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex"); }

const chosen = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Manuel_EPS_9AF_2026_2027_FINAL.docx";
const backup = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\10_SAUVEGARDE_AVANT_CORRECTIONS\\EPS_9AF\\Manuel_EPS_9AF_2026_2027_FINAL_BACKUP_2026-09-22T17-22-00.docx";
const travail = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx";

console.log("Chosen (source, jamais touche):", sha(chosen).slice(0, 16));
console.log("Backup (sauvegarde propre):    ", sha(backup).slice(0, 16));
console.log("Travail (reinitialise):        ", sha(travail).slice(0, 16));
console.log("Attendu partout: 2f14d097ad9c017c");
console.log("Source == Backup:", sha(chosen) === sha(backup));
console.log("Source == Travail:", sha(chosen) === sha(travail));
