import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

// Search for "Atelier" as a table header text specifically (w:t>Atelier<)
let searchFrom = 0;
let count = 0;
while (count < 5) {
  const idx = docXml.indexOf("<w:t>Atelier</w:t>", searchFrom);
  if (idx < 0) break;
  console.log(`\n=== Occurrence ${count + 1} at ${idx} ===`);
  const tblStart = docXml.lastIndexOf("<w:tbl>", idx);
  console.log("distance from tbl start:", idx - tblStart);
  console.log(docXml.slice(tblStart, tblStart + 500));
  searchFrom = idx + 10;
  count++;
}
