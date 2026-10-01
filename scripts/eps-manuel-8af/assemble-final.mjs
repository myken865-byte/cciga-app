// Assemble le manuel final EPS 8e AF a partir des 16 fichiers deja generes
// et valides (pages preliminaires + 12 chapitres + corrige + glossaire +
// references), en splicing OOXML brut : chaque section garde son propre
// sectPr (donc sa propre pagination), sans toucher au contenu textuel de
// chaque fichier source. Necessite que les 16 fichiers partagent le meme
// schema de relationIds (verifie manuellement : rId7=header1.xml, rId8=footer1.xml
// dans tous les fichiers).
import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\cciga app";
const SRC_DIR = "C:\\Users\\ME339F~1.ALC\\AppData\\Local\\Temp\\8af_final\\src";
const OUT_DIR = "C:\\Users\\ME339F~1.ALC\\AppData\\Local\\Temp\\8af_final\\out";
const OUT_DOCX = path.join(ROOT, "Manuel_EPS_8AF_2026_2027_FINAL_VALIDE.docx");

const files = [
  "Manuel_EPS_8AF_PagesPreliminaires.docx",
  "Manuel_EPS_8AF_Chapitre1.docx",
  "Manuel_EPS_8AF_Chapitre2.docx",
  "Manuel_EPS_8AF_Chapitre3.docx",
  "Manuel_EPS_8AF_Chapitre4.docx",
  "Manuel_EPS_8AF_Chapitre5.docx",
  "Manuel_EPS_8AF_Chapitre6.docx",
  "Manuel_EPS_8AF_Chapitre7.docx",
  "Manuel_EPS_8AF_Chapitre8.docx",
  "Manuel_EPS_8AF_Chapitre9.docx",
  "Manuel_EPS_8AF_Chapitre10.docx",
  "Manuel_EPS_8AF_Chapitre11.docx",
  "Manuel_EPS_8AF_Chapitre12.docx",
  "Manuel_EPS_8AF_CorrigeGeneral.docx",
  "Manuel_EPS_8AF_Glossaire.docx",
  "Manuel_EPS_8AF_References.docx",
];

function extractBodyAndSectPr(xml) {
  const bodyMatch = xml.match(/<w:body>([\s\S]*)<\/w:body>/);
  if (!bodyMatch) throw new Error("w:body not found");
  const bodyInner = bodyMatch[1];
  const sectPrMatch = bodyInner.match(/<w:sectPr[\s\S]*?<\/w:sectPr>/);
  if (!sectPrMatch) throw new Error("w:sectPr not found");
  const sectPr = sectPrMatch[0];
  const contentOnly = bodyInner.slice(0, sectPrMatch.index);
  return { contentOnly, sectPr };
}

let mergedInner = "";
files.forEach((fname, idx) => {
  const srcDir = path.join(SRC_DIR, String(idx + 1));
  const xmlPath = path.join(srcDir, "word", "document.xml");
  const xml = fs.readFileSync(xmlPath, "utf-8");
  const { contentOnly, sectPr } = extractBodyAndSectPr(xml);
  mergedInner += contentOnly;
  const isLast = idx === files.length - 1;
  if (isLast) {
    mergedInner += sectPr; // final, body-level sectPr governing the last section
  } else {
    // embed as a paragraph-level sectPr -> creates a section break here
    mergedInner += `<w:p><w:pPr>${sectPr}</w:pPr></w:p>`;
  }
  console.log(`merged [${idx + 1}/${files.length}]`, fname, "len=", contentOnly.length);
});

// Use file #1 (pages preliminaires) as the package skeleton: same rels scheme
// verified identical (rId1..rId9) across all 16 sources.
const skeletonDir = path.join(SRC_DIR, "1");
if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.cpSync(skeletonDir, OUT_DIR, { recursive: true });

const origDoc = fs.readFileSync(path.join(OUT_DIR, "word", "document.xml"), "utf-8");
const docHead = origDoc.match(/^[\s\S]*?<w:body>/)[0];
const finalDoc = docHead + mergedInner + "</w:body></w:document>";
fs.writeFileSync(path.join(OUT_DIR, "word", "document.xml"), finalDoc, "utf-8");

console.log("Prepared merged package folder at:", OUT_DIR);
console.log("Merged document.xml length:", finalDoc.length, "bytes (text)");

function addDirToZip(zip, dir, base = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      addDirToZip(zip, full, rel);
    } else {
      zip.file(rel, fs.readFileSync(full));
    }
  }
}

const zip = new JSZip();
addDirToZip(zip, OUT_DIR);
const zipBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
fs.writeFileSync(OUT_DOCX, zipBuf);
console.log("OK ->", OUT_DOCX, zipBuf.length, "bytes");
