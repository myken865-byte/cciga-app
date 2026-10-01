import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

const idx = docXml.indexOf("<w:t>Atelier</w:t>");
const tblStart = docXml.lastIndexOf("<w:tbl>", idx);
const oldTag = `<w:tblW w:w="7469" w:type="pct"/>`;
const window = docXml.slice(tblStart, tblStart + 100);
if (!window.includes(oldTag)) {
  console.log("NOT FOUND, window:", window);
} else {
  const tagIdx = docXml.indexOf(oldTag, tblStart);
  const newTag = `<w:tblW w:w="5000" w:type="pct"/>`;
  docXml = docXml.slice(0, tagIdx) + newTag + docXml.slice(tagIdx + oldTag.length);
  console.log("Fixed Table3 (ch9 atelier): 7469 -> 5000");
  zip.file("word/document.xml", docXml);
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(DOCX_PATH, outBuf);
  console.log("Fichier de travail mis a jour.");
}
