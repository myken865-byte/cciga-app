import fs from "node:fs";
const p = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\08_PDF_DE_CONTROLE\\EPS\\9AF\\EPS_9AF_CONTROLE_PRELIMINAIRE_AVANT_CORRECTIONS_PAGINATION.pdf";
const st = fs.statSync(p);
console.log(`Taille PDF: ${(st.size / 1024 / 1024).toFixed(2)} Mo`);
const text = fs.readFileSync(p).toString("latin1");
const countMatch = text.match(/\/Type\s*\/Pages[^>]*?\/Count\s+(\d+)/);
console.log(`Pages (via /Pages /Count): ${countMatch ? countMatch[1] : "non trouvé"}`);
const pageObjs = text.match(/\/Type\s*\/Page(?![A-Za-z])/g) || [];
console.log(`Pages (comptage objets /Type /Page): ${pageObjs.length}`);
