import fs from "node:fs";
import JSZip from "jszip";

const p = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.pdf".replace(".pdf", "");
// use the docx working copy instead
const docxPath = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";

const buf = fs.readFileSync(docxPath);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

function showAround(anchorText, label) {
  const idx = docXml.indexOf(anchorText);
  console.log(`\n=== ${label} (anchor "${anchorText.slice(0, 40)}...") idx=${idx} ===`);
  if (idx < 0) { console.log("NOT FOUND"); return; }
  console.log(docXml.slice(idx, idx + 1500));
}

showAround("contexte scolaire ha\u00EFtien", "Before blank page 133 (end of ch8 body)");
showAround("Trois touches pour coop\u00E9rer", "After blank page 133 (Activite pratique heading)");
showAround("Activit\u00E9 d\u2019arbitrage et fair-play", "Before blank page 136");
