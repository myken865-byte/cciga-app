import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");
const plain = docXml.replace(/<[^>]+>/g, "|").replace(/\|+/g, "|");

let idx = 0;
let n = 0;
while (n < 10) {
  idx = plain.indexOf("Collection", idx);
  if (idx < 0) break;
  console.log(`\n--- occurrence at ${idx} ---`);
  console.log(plain.slice(Math.max(0, idx - 100), idx + 200));
  idx += 10;
  n++;
}
