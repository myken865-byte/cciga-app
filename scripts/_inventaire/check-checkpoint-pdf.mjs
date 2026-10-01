import fs from "node:fs";
const p = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\08_PDF_DE_CONTROLE\\EPS\\9AF\\EPS_9AF_CHECKPOINT_APRES_SAUT_SECTION.pdf";
const text = fs.readFileSync(p).toString("latin1");
const countMatch = text.match(/\/Type\s*\/Pages[^>]*?\/Count\s+(\d+)/);
console.log(`Pages: ${countMatch ? countMatch[1] : "?"}`);
