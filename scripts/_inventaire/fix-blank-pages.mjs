import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

// The exact empty spacer paragraph pattern found immediately before both problem headings.
const emptyPara = '<w:p w:rsidR="00077C78" w:rsidRDefault="00077C78" w:rsidP="00303FB2"><w:pPr><w:spacing w:after="200"/></w:pPr></w:p>';

let removed = 0;
for (const heading of ["Trois touches pour coop\u00E9rer", "Autoévaluation"]) {
  const headingParaMarker = `<w:t>${heading}`;
  // Find heading occurrence AFTER "Activité d'arbitrage et fair-play" / chapter-8-specific area —
  // to keep this surgical, only remove the FIRST occurrence of the empty-paragraph-immediately-
  // before-this-exact-heading pattern that sits inside the identified chapter 8 region (character
  // offset > 380000, established from the earlier inspection).
  let searchFrom = 380000;
  const headIdx = docXml.indexOf(headingParaMarker, searchFrom);
  if (headIdx < 0) { console.log(`Heading not found after offset: ${heading}`); continue; }
  const beforeHeading = docXml.slice(Math.max(0, headIdx - 200), headIdx);
  if (beforeHeading.includes(emptyPara)) {
    const fullIdxOfEmpty = docXml.lastIndexOf(emptyPara, headIdx);
    docXml = docXml.slice(0, fullIdxOfEmpty) + docXml.slice(fullIdxOfEmpty + emptyPara.length);
    removed++;
    console.log(`Removed empty spacer paragraph before: ${heading}`);
  } else {
    console.log(`Empty spacer pattern NOT found immediately before: ${heading}`);
    console.log("Context:", beforeHeading.slice(-300));
  }
}

console.log(`Total removed: ${removed}`);

if (removed > 0) {
  zip.file("word/document.xml", docXml);
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(DOCX_PATH, outBuf);
  console.log("Fichier de travail mis a jour.");
} else {
  console.log("Aucune modification enregistree (rien trouve).");
}
