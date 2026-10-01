import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx";

// Anchor each TOC line by a short, unique substring of its title (as it literally appears in the
// XML <w:t> run, entity-escaped), then replace the number in the immediately-following
// "<w:tab/><w:t>NUM</w:t>" run within that same paragraph only. Chapitre 1 is left untouched
// (already correctly "1"). Annexes is intentionally excluded — no matching content was found in
// the document body, so its TOC number is left as-is and flagged in the report instead of guessed.
const anchors = [
  { needle: "Chapitre 2 —", old: "14", neu: "21" },
  { needle: "Chapitre 3 —", old: "27", neu: "39" },
  { needle: "Chapitre 4 —", old: "41", neu: "57" },
  { needle: "Chapitre 5 —", old: "54", neu: "74" },
  { needle: "Chapitre 6 —", old: "66", neu: "91" },
  { needle: "Chapitre 7 —", old: "80", neu: "109" },
  { needle: "Chapitre 8 —", old: "94", neu: "126" },
  { needle: "Chapitre 9 —", old: "108", neu: "145" },
  { needle: "Chapitre 10 —", old: "123", neu: "163" },
  { needle: "Chapitre 11 —", old: "137", neu: "180" },
  { needle: "Chapitre 12 —", old: "152", neu: "198" },
  { needle: "Corrig\u00E9 g\u00E9n\u00E9ral des exercices<", old: "168", neu: "217" },
  { needle: "Glossaire g\u00E9n\u00E9ral EPS 9e AF<", old: "195", neu: "244" },
  { needle: "R\u00E9f\u00E9rences<", old: "199", neu: "248" },
];

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

let replacedCount = 0;
for (const a of anchors) {
  const needleIdx = docXml.indexOf(a.needle);
  if (needleIdx < 0) { console.log(`ANCRE INTROUVABLE: ${a.needle}`); continue; }
  // Search only within the next ~600 chars after the anchor (same paragraph's remaining runs).
  const windowEnd = needleIdx + 600;
  const window = docXml.slice(needleIdx, windowEnd);
  const tabNumRe = new RegExp(`(<w:tab/><w:t>)${a.old}(</w:t>)`);
  const m = window.match(tabNumRe);
  if (!m) { console.log(`NUMERO NON TROUVE apres ancre: ${a.needle} (attendu ${a.old})`); continue; }
  const before = docXml.slice(0, needleIdx) + window.replace(tabNumRe, `$1${a.neu}$2`);
  docXml = before + docXml.slice(windowEnd);
  replacedCount++;
  console.log(`OK: ${a.needle} -> ${a.old} devient ${a.neu}`);
}
console.log(`Total remplacements: ${replacedCount} / ${anchors.length}`);

zip.file("word/document.xml", docXml);
const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
fs.writeFileSync(DOCX_PATH, outBuf);
console.log("Fichier de travail mis a jour (table des matieres corrigee).");
