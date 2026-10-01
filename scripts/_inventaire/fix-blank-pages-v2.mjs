import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

// Generic pattern: an EMPTY paragraph (a <w:p ...>...</w:p> block containing a <w:pPr> with
// spacing but NO <w:r> run inside) immediately followed by a Heading2 paragraph containing the
// target heading text. Regex tolerates any rsid attribute values.
function removeEmptyParaBeforeHeading(xml, headingText) {
  const escaped = headingText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<w:p [^>]*>(?:(?!<w:r[ >]).)*?<\\/w:p>(?=<w:p [^>]*><w:pPr><w:pStyle w:val="Heading2"\\/>[^<]*<w:spacing[^\\/]*\\/><\\/w:pPr><w:r>(?:<w:rPr>.*?<\\/w:rPr>)?<w:t>${escaped})`,
    "s"
  );
  const m = xml.match(re);
  if (!m) return { xml, removed: false, matchedEmpty: null };
  return { xml: xml.slice(0, m.index) + xml.slice(m.index + m[0].length), removed: true, matchedEmpty: m[0] };
}

let totalRemoved = 0;
for (const heading of ["Trois touches pour coop\u00E9rer", "Autoévaluation"]) {
  const result = removeEmptyParaBeforeHeading(docXml, heading);
  if (result.removed) {
    docXml = result.xml;
    totalRemoved++;
    console.log(`Removed empty paragraph before "${heading}": ${result.matchedEmpty.slice(0, 150)}`);
  } else {
    console.log(`NOT FOUND for heading: ${heading}`);
  }
}

console.log(`Total removed: ${totalRemoved}`);
if (totalRemoved > 0) {
  zip.file("word/document.xml", docXml);
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(DOCX_PATH, outBuf);
  console.log("Fichier de travail mis a jour.");
}
