import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

// Chapitre 1 stays "1" (already correct, no-op). Others recomputed for the new 16-section layout
// where front matter is its own section (physical pages 1-5, roman) and Chapitre 1 begins physical
// page 6 (arabic "1"); every later value = physical_start - 5.
const anchors = [
  { needle: "Chapitre 2 —", old: "14", neu: "18" },
  { needle: "Chapitre 3 —", old: "27", neu: "36" },
  { needle: "Chapitre 4 —", old: "41", neu: "54" },
  { needle: "Chapitre 5 —", old: "54", neu: "71" },
  { needle: "Chapitre 6 —", old: "66", neu: "88" },
  { needle: "Chapitre 7 —", old: "80", neu: "106" },
  { needle: "Chapitre 8 —", old: "94", neu: "123" },
  { needle: "Chapitre 9 —", old: "108", neu: "142" },
  { needle: "Chapitre 10 —", old: "123", neu: "160" },
  { needle: "Chapitre 11 —", old: "137", neu: "177" },
  { needle: "Chapitre 12 —", old: "152", neu: "195" },
  { needle: "Corrig\u00E9 g\u00E9n\u00E9ral des exercices<", old: "168", neu: "214" },
  { needle: "Glossaire g\u00E9n\u00E9ral EPS 9e AF<", old: "195", neu: "241" },
  { needle: "R\u00E9f\u00E9rences<", old: "199", neu: "245" },
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

zip.file("word/document.xml", docXml);
const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
fs.writeFileSync(DOCX_PATH, outBuf);
console.log("Fichier de travail mis a jour (table des matieres corrigee).");
