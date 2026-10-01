import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

// Only the 7 entries affected by removing the 2 blank pages inside Chapitre 8 (shift -2).
const anchors = [
  { needle: "Chapitre 9 —", old: "142", neu: "140" },
  { needle: "Chapitre 10 —", old: "160", neu: "158" },
  { needle: "Chapitre 11 —", old: "177", neu: "175" },
  { needle: "Chapitre 12 —", old: "195", neu: "193" },
  { needle: "Corrig\u00E9 g\u00E9n\u00E9ral des exercices<", old: "214", neu: "212" },
  { needle: "Glossaire g\u00E9n\u00E9ral EPS 9e AF<", old: "241", neu: "239" },
  { needle: "R\u00E9f\u00E9rences<", old: "245", neu: "243" },
];

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
let docXml = await zip.file("word/document.xml").async("string");

let replacedCount = 0;
for (const a of anchors) {
  const needleIdx = docXml.indexOf(a.needle);
  if (needleIdx < 0) { console.log(`ANCRE INTROUVABLE: ${a.needle}`); continue; }
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

if (replacedCount === anchors.length) {
  zip.file("word/document.xml", docXml);
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(DOCX_PATH, outBuf);
  console.log("Fichier de travail mis a jour (table des matieres re-corrigee).");
} else {
  console.log("ABANDON: pas tous les remplacements trouves, rien enregistre.");
}
