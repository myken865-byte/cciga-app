import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);

// Find which footer part corresponds to the Corrigé général section (section 14) vs the rest.
const relsXml = await zip.file("word/_rels/document.xml.rels").async("string");
console.log("--- footer relationships ---");
console.log([...relsXml.matchAll(/<Relationship[^>]*Type="[^"]*footer"[^>]*\/>/g)].map(m => m[0]).join("\n"));

const names = Object.keys(zip.files).filter(n => /^word\/footer\d+\.xml$/.test(n));
for (const n of names) {
  const xml = await zip.file(n).async("string");
  const jc = xml.match(/<w:jc w:val="(\w+)"\/>/);
  console.log(`\n${n}: jc=${jc ? jc[1] : "none (default = left)"}`);
  console.log(xml.slice(0, 400));
}
