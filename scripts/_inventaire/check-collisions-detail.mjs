import fs from "node:fs";
import crypto from "node:crypto";

function sha(p) { return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex").slice(0, 12); }
function info(p) {
  if (!fs.existsSync(p)) return `MANQUANT: ${p}`;
  const st = fs.statSync(p);
  return `${p} -> taille=${st.size}, hash=${sha(p)}`;
}

console.log("--- EEA 7AF chosen file, currently in place ---");
console.log(info("C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\03_ILLUSTRATIONS_MANQUANTES\\EEA\\7AF\\Manuel_EEA_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"));

console.log("\n--- EPS 8AF archive folder (checking both FINAL.docx and FINAL_VALIDE.docx variants) ---");
console.log(info("C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\09_ARCHIVES_ET_DOUBLONS\\EPS_8AF\\Manuel_EPS_8AF_2026_2027_FINAL.docx"));
console.log(info("C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\09_ARCHIVES_ET_DOUBLONS\\EPS_8AF\\Manuel_EPS_8AF_2026_2027_FINAL__dup2.docx"));
console.log(info("C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\09_ARCHIVES_ET_DOUBLONS\\EPS_8AF\\Manuel_EPS_8AF_2026_2027_FINAL_VALIDE.docx"));
console.log(info("C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\09_ARCHIVES_ET_DOUBLONS\\EPS_8AF\\Manuel_EPS_8AF_2026_2027_FINAL_VALIDE__dup2.docx"));

console.log("\n--- EC 7AF archive folder (PRE-FINAL_AVANT_ILLUSTRATIONS.docx variants) ---");
console.log(info("C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\09_ARCHIVES_ET_DOUBLONS\\EC_7AF\\Manuel_EC_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"));
console.log(info("C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\09_ARCHIVES_ET_DOUBLONS\\EC_7AF\\Manuel_EC_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS__dup2.docx"));
