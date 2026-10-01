import crypto from "node:crypto";
import fs from "node:fs";

const files = [
  ["C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\7AF\\EPS 7e.AF final.docx", "74a30b87a1b3"],
  ["C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\8AF\\Manuel_EPS_8AF_2026_2027_COMPLET_IMPRESSION_FINAL_MAJ_TITRES.docx", "4f4451373cbc"],
  ["C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EC\\7AF\\EC 7e AF. Final.docx", "845cf955ba24"],
  ["C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EC\\8AF\\Manuel_EC_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx", "c0b7c66536b4"],
  ["C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EC\\9AF\\Manuel_EC_9AF_2026_2027_CORRIGE_FINAL.docx", "a9719fe7e0a8"],
];

for (const [p, expectedPrefix] of files) {
  if (!fs.existsSync(p)) { console.log(`MANQUANT: ${p}`); continue; }
  const h = crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex").slice(0, 12);
  console.log(`${h === expectedPrefix ? "OK — inchangé" : "!! CHANGÉ !!"} | attendu ${expectedPrefix} | obtenu ${h} | ${p}`);
}
