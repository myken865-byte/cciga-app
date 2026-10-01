// Assemble le manuel PRE-FINAL EEA 7e AF (Phase Finale) a partir des 11
// fichiers deja generes et verifies (pages preliminaires + 7 chapitres +
// corrige + glossaire + references), en splicing OOXML brut : chaque
// section garde son propre sectPr (donc sa propre pagination : romain pour
// les pages preliminaires, arabe continu 1->83 pour le reste), sans
// toucher au contenu textuel de chaque fichier source.
// Nomme PRE-FINAL_AVANT_ILLUSTRATIONS car les 42 illustrations restent a
// generer (voir scripts build-chapitreN.mjs pour les emplacements reserves).
import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_7e_AF";
const SRC_DIR = "C:\\Users\\ME339F~1.ALC\\AppData\\Local\\Temp\\eea7af_assembly\\src";
const OUT_DIR = "C:\\Users\\ME339F~1.ALC\\AppData\\Local\\Temp\\eea7af_assembly\\out";
const OUT_DOCX = path.join(ROOT, "09_ASSEMBLAGE", "Manuel_EEA_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx");

const files = [
  path.join(ROOT, "09_ASSEMBLAGE", "Manuel_EEA_7AF_PagesPreliminaires.docx"),
  path.join(ROOT, "02_CHAPITRES", "Manuel_EEA_7AF_Chapitre1.docx"),
  path.join(ROOT, "02_CHAPITRES", "Manuel_EEA_7AF_Chapitre2.docx"),
  path.join(ROOT, "02_CHAPITRES", "Manuel_EEA_7AF_Chapitre3.docx"),
  path.join(ROOT, "02_CHAPITRES", "Manuel_EEA_7AF_Chapitre4.docx"),
  path.join(ROOT, "02_CHAPITRES", "Manuel_EEA_7AF_Chapitre5.docx"),
  path.join(ROOT, "02_CHAPITRES", "Manuel_EEA_7AF_Chapitre6.docx"),
  path.join(ROOT, "02_CHAPITRES", "Manuel_EEA_7AF_Chapitre7.docx"),
  path.join(ROOT, "06_CORRIGE_GENERAL", "Manuel_EEA_7AF_CorrigeGeneral.docx"),
  path.join(ROOT, "07_GLOSSAIRE", "Manuel_EEA_7AF_Glossaire.docx"),
  path.join(ROOT, "08_REFERENCES_FINALES", "Manuel_EEA_7AF_References.docx"),
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

if (fs.existsSync(SRC_DIR)) fs.rmSync(SRC_DIR, { recursive: true, force: true });
fs.mkdirSync(SRC_DIR, { recursive: true });

let mergedInner = "";
for (let idx = 0; idx < files.length; idx++) {
  const fname = files[idx];
  const buf = fs.readFileSync(fname);
  const zip = await JSZip.loadAsync(buf);
  const extractDir = path.join(SRC_DIR, String(idx + 1));
  fs.mkdirSync(extractDir, { recursive: true });
  for (const [relPath, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    const outFile = path.join(extractDir, relPath);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, await entry.async("nodebuffer"));
  }
  const xml = fs.readFileSync(path.join(extractDir, "word", "document.xml"), "utf-8");
  const { contentOnly, sectPr } = extractBodyAndSectPr(xml);
  mergedInner += contentOnly;
  const isLast = idx === files.length - 1;
  if (isLast) {
    mergedInner += sectPr;
  } else {
    mergedInner += `<w:p><w:pPr>${sectPr}</w:pPr></w:p>`;
  }
  console.log(`merged [${idx + 1}/${files.length}]`, path.basename(fname), "len=", contentOnly.length);
}

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
