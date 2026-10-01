import fs from "node:fs";
import JSZip from "jszip";

const p = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx";
const buf = fs.readFileSync(p);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");
const plain = docXml.replace(/<[^>]+>/g, "|").replace(/\|+/g, "|");

const idx = plain.search(/Table des mati[eè]res/i);
console.log("Index trouvé:", idx);
if (idx >= 0) {
  console.log(plain.slice(idx, idx + 3000));
}
