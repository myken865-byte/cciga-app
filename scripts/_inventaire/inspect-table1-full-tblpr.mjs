import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

const idx = docXml.indexOf("Capacit\u00E9s mobilis\u00E9es");
const tblStart = docXml.lastIndexOf("<w:tbl>", idx);
console.log("tbl start:", tblStart);
console.log(docXml.slice(tblStart, tblStart + 700));

// Also check section page width / margins for reference
const sectPrIdx = docXml.indexOf("<w:sectPr");
console.log("\n--- first sectPr for reference ---");
console.log(docXml.slice(sectPrIdx, sectPrIdx + 400));
