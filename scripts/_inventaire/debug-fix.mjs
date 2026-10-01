import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

const idx = docXml.indexOf("Trois touches pour coop\u00E9rer");
console.log("idx:", idx);
const window = docXml.slice(idx - 260, idx);
console.log("WINDOW:");
console.log(JSON.stringify(window));

const manualBreakRe = /<w:p w:rsidR="[^"]*" w:rsidRDefault="[^"]*" w:rsidP="[^"]*"><w:r><w:br w:type="page"\/><\/w:r><\/w:p>/;
console.log("Match in window:", window.match(manualBreakRe));
