import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

function inspectTableNear(searchText, label) {
  const idx = docXml.indexOf(searchText);
  if (idx < 0) { console.log(`${label}: TEXT NOT FOUND`); return; }
  const tblStart = docXml.lastIndexOf("<w:tbl>", idx);
  const snippet = docXml.slice(tblStart, tblStart + 200);
  const m = snippet.match(/<w:tblW w:w="(\d+)" w:type="(\w+)"\/>/);
  console.log(`${label}: tblStart=${tblStart}, tblW match=${m ? m[0] : "NONE"}`);
}

// Table 2: "Volleyball des débuts / contemporain" comparison (chapter 7)
inspectTableNear("Volleyball des d\u00E9buts", "Table2 (ch7 volleyball comparison)");
// Table 3: "Atelier | Objectif" circuit table (chapter 9)
inspectTableNear("Circuit des qualit\u00E9s en action", "Table3 (ch9 circuit)");
