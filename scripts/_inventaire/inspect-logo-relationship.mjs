import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

const idx = docXml.indexOf("LogoCollectionPotentielEnEveil");
console.log(docXml.slice(idx, idx + 1500));

const relsXml = await zip.file("word/_rels/document.xml.rels").async("string");
console.log("\n--- all relationships mentioning 'logo' or the embed id used ---");
const embedMatch = docXml.slice(idx, idx + 1500).match(/r:embed="([^"]+)"/);
console.log("embed id used by drawing:", embedMatch ? embedMatch[1] : "NOT FOUND IN WINDOW");
if (embedMatch) {
  const relMatch = relsXml.match(new RegExp(`<Relationship[^>]*Id="${embedMatch[1]}"[^>]*/>`));
  console.log("Matching relationship entry:", relMatch ? relMatch[0] : "NO MATCHING RELATIONSHIP FOUND (broken reference)");
}
