import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

const manualBreakRe = /<w:p w:rsidR="[^"]*" w:rsidRDefault="[^"]*" w:rsidP="[^"]*"><w:r><w:br w:type="page"\/><\/w:r><\/w:p>/;

function removeManualBreakBeforeHeading(xml, headingText, searchFromIdx) {
  const idx = xml.indexOf(headingText, searchFromIdx);
  if (idx < 0) return { xml, removed: false, reason: "heading not found" };
  const window = xml.slice(Math.max(0, idx - 500), idx);
  const m = window.match(manualBreakRe);
  if (!m) return { xml, removed: false, reason: "manual break pattern not found nearby" };
  const absoluteStart = Math.max(0, idx - 500) + m.index;
  return {
    xml: xml.slice(0, absoluteStart) + xml.slice(absoluteStart + m[0].length),
    removed: true,
    matched: m[0],
  };
}

let totalRemoved = 0;

const r1 = removeManualBreakBeforeHeading(docXml, "Trois touches pour coop\u00E9rer", 0);
if (r1.removed) {
  docXml = r1.xml;
  totalRemoved++;
  console.log("Removed manual break before 'Trois touches...':", r1.matched);
} else {
  console.log("#1 not removed:", r1.reason);
}

const anchor2From = docXml.indexOf("Trois touches pour coop\u00E9rer");
const r2 = removeManualBreakBeforeHeading(docXml, "Autoévaluation", anchor2From);
if (r2.removed) {
  docXml = r2.xml;
  totalRemoved++;
  console.log("Removed manual break before 'Autoévaluation':", r2.matched);
} else {
  console.log("#2 not removed:", r2.reason);
}

console.log(`Total removed: ${totalRemoved}`);
if (totalRemoved === 2) {
  zip.file("word/document.xml", docXml);
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(DOCX_PATH, outBuf);
  console.log("Fichier de travail mis a jour (2 sauts de page manuels retires).");
} else {
  console.log("ABANDON: pas exactement 2 suppressions, rien enregistre par securite.");
}
