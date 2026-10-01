import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

let idx = docXml.indexOf("Collection");
console.log("First raw idx:", idx);
if (idx >= 0) console.log(docXml.slice(Math.max(0, idx - 200), idx + 300));

// Also check core.xml (docProps) for a "Collection" subject/keyword mention.
const core = await zip.file("docProps/core.xml").async("string");
console.log("\ncore.xml contains Collection:", core.includes("Collection"));
console.log(core.slice(0, 1000));
