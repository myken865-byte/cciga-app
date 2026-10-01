import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

// Full recompute after the 3 table-width fixes. Chapitre 1 unaffected ("1"). Chapitre 2 unaffected
// numerically (still "18") — included anyway as a no-op for completeness/traceability.
const anchors = [
  { needle: "Chapitre 3 —", old: "36", neu: "37" },
  { needle: "Chapitre 4 —", old: "54", neu: "55" },
  { needle: "Chapitre 5 —", old: "71", neu: "72" },
  { needle: "Chapitre 6 —", old: "88", neu: "89" },
  { needle: "Chapitre 7 —", old: "106", neu: "107" },
  { needle: "Chapitre 8 —", old: "123", neu: "125" },
  { needle: "Chapitre 9 —", old: "140", neu: "142" },
  { needle: "Chapitre 10 —", old: "158", neu: "161" },
  { needle: "Chapitre 11 —", old: "175", neu: "178" },
  { needle: "Chapitre 12 —", old: "193", neu: "196" },
  { needle: "Corrig\u00E9 g\u00E9n\u00E9ral des exercices<", old: "212", neu: "215" },
  { needle: "Glossaire g\u00E9n\u00E9ral EPS 9e AF<", old: "239", neu: "242" },
  { needle: "R\u00E9f\u00E9rences<", old: "243", neu: "246" },
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
  console.log("Fichier de travail mis a jour (table des matieres re-corrigee, v4).");
} else {
  console.log("ABANDON: pas tous les remplacements trouves, rien enregistre.");
}
