import fs from "node:fs";
import JSZip from "jszip";

const docxPath = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(docxPath);
const zip = await JSZip.loadAsync(buf);
const stylesXml = await zip.file("word/styles.xml").async("string");

const idx = stylesXml.indexOf('w:styleId="Heading2"');
console.log("Heading2 style def:");
console.log(stylesXml.slice(idx - 20, idx + 800));

// Also check for pageBreakBefore anywhere near "Autoevaluation"/"Activite pratique" headings in
// document.xml, and look further back for "Resume du chapitre" heading preceding them.
const docXml = await zip.file("word/document.xml").async("string");
const idx2 = docXml.indexOf("Autoévaluation");
console.log("\n--- 1200 chars BEFORE 'Autoévaluation' (chapitre 8 occurrence, first hit) ---");
console.log(docXml.slice(Math.max(0, idx2 - 1600), idx2));
