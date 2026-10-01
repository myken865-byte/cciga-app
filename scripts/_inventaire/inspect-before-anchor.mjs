import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

const idx = docXml.indexOf("Trois touches pour coop\u00E9rer");
console.log("=== 1200 chars BEFORE 'Trois touches pour coopérer' ===");
console.log(docXml.slice(idx - 1200, idx));

const idx2 = docXml.indexOf("Autoévaluation", idx);
console.log("\n=== 1200 chars BEFORE the next 'Autoévaluation' after that ===");
console.log(docXml.slice(idx2 - 1200, idx2));
