import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

function fixTableWidth(xml, anchorText, oldWidth, label) {
  const idx = xml.indexOf(anchorText);
  if (idx < 0) return { xml, fixed: false, reason: "anchor not found" };
  const tblStart = xml.lastIndexOf("<w:tbl>", idx);
  const oldTag = `<w:tblW w:w="${oldWidth}" w:type="pct"/>`;
  const window = xml.slice(tblStart, tblStart + 200);
  if (!window.includes(oldTag)) return { xml, fixed: false, reason: `tag not found in window: ${window.slice(0, 100)}` };
  const tagIdx = xml.indexOf(oldTag, tblStart);
  const newTag = `<w:tblW w:w="5000" w:type="pct"/>`;
  return {
    xml: xml.slice(0, tagIdx) + newTag + xml.slice(tagIdx + oldTag.length),
    fixed: true,
  };
}

let fixedCount = 0;

const r1 = fixTableWidth(docXml, "Capacit\u00E9s mobilis\u00E9es", "7390", "Table1 (ch2)");
if (r1.fixed) { docXml = r1.xml; fixedCount++; console.log("Fixed Table1 (ch2): 7390 -> 5000"); }
else console.log("Table1 NOT fixed:", r1.reason);

const r2 = fixTableWidth(docXml, "Volleyball des d\u00E9buts", "7888", "Table2 (ch7)");
if (r2.fixed) { docXml = r2.xml; fixedCount++; console.log("Fixed Table2 (ch7): 7888 -> 5000"); }
else console.log("Table2 NOT fixed:", r2.reason);

console.log(`Total fixed: ${fixedCount}`);
if (fixedCount === 2) {
  zip.file("word/document.xml", docXml);
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(DOCX_PATH, outBuf);
  console.log("Fichier de travail mis a jour.");
} else {
  console.log("ABANDON: pas exactement 2 corrections, rien enregistre.");
}
