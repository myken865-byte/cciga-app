import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const mediaFiles = Object.keys(zip.files).filter(p => /^word\/media\//i.test(p) && !zip.files[p].dir);
console.log("Media files:", mediaFiles.length);
console.log(mediaFiles.filter(f => /logo/i.test(f)));

const footerFiles = Object.keys(zip.files).filter(p => /^word\/footer\d*\.xml$/i.test(p));
const footer1 = await zip.file("word/footer1.xml").async("string");
console.log("\nFooter1 text snippet:");
console.log(footer1.replace(/<[^>]+>/g, "|").slice(0, 300));

const docXml = await zip.file("word/document.xml").async("string");
console.log("\nContains 'Potentiel en" + "\\u00C9veil'?", docXml.includes("Potentiel en \u00C9veil") || docXml.includes("Potentiel en \u00E9veil"));
console.log("Contains 'Collection'?", docXml.includes("Collection"));
