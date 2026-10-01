import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

// "Trois touches pour coopérer" is unique in the document (chapter 8 only) — anchor point.
const anchorIdx = docXml.indexOf("Trois touches pour coop\u00E9rer");
console.log("Anchor 'Trois touches pour coopérer' at:", anchorIdx);
if (anchorIdx < 0) throw new Error("Anchor not found");

// Regex to remove an EMPTY paragraph (<w:p ...><w:pPr>...</w:pPr></w:p>, no <w:r> run) that sits
// immediately before a Heading2 paragraph containing the given text, searched only within a
// bounded window starting at `fromIdx` (to stay inside chapter 8, avoid matching other chapters).
function removeEmptyParaBeforeHeadingInWindow(xml, headingText, fromIdx, windowSize) {
  const window = xml.slice(fromIdx, fromIdx + windowSize);
  const escaped = headingText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<w:p [^>]*>(?:(?!<w:r[ >]).)*?<\\/w:p>(?=<w:p [^>]*><w:pPr><w:pStyle w:val="Heading2"\\/>[^<]*<w:spacing[^\\/]*\\/><\\/w:pPr><w:r>(?:<w:rPr>.*?<\\/w:rPr>)?<w:t>${escaped})`,
    "s"
  );
  const m = window.match(re);
  if (!m) return { xml, removed: false };
  const absoluteStart = fromIdx + m.index;
  return {
    xml: xml.slice(0, absoluteStart) + xml.slice(absoluteStart + m[0].length),
    removed: true,
    matched: m[0],
  };
}

let totalRemoved = 0;

// 1) Before "Trois touches pour coopérer" itself — search a window ending right at the anchor.
const r1 = removeEmptyParaBeforeHeadingInWindow(docXml, "Trois touches pour coop\u00E9rer", anchorIdx - 400, 400);
if (r1.removed) { docXml = r1.xml; totalRemoved++; console.log("Removed #1 (before 'Trois touches...'):", r1.matched.slice(0, 120)); }
else console.log("#1 NOT FOUND (before 'Trois touches...')");

// Recompute anchor (indices shifted if #1 was removed).
const anchorIdx2 = docXml.indexOf("Trois touches pour coop\u00E9rer");

// 2) Before "Autoévaluation", searched in the 4000 chars AFTER the (possibly shifted) anchor —
//    bounded so it can only match chapter 8's own Autoévaluation, not another chapter's.
const r2 = removeEmptyParaBeforeHeadingInWindow(docXml, "Autoévaluation", anchorIdx2, 4000);
if (r2.removed) { docXml = r2.xml; totalRemoved++; console.log("Removed #2 (before 'Autoévaluation'):", r2.matched.slice(0, 120)); }
else console.log("#2 NOT FOUND (before 'Autoévaluation')");

console.log(`Total removed: ${totalRemoved}`);
if (totalRemoved > 0) {
  zip.file("word/document.xml", docXml);
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(DOCX_PATH, outBuf);
  console.log("Fichier de travail mis a jour.");
}
