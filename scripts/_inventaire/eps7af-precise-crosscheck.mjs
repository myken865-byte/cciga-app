import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\7AF\\EPS 7e.AF final.docx";

// Canonical list: 59 illustrations across the 10 chapters, built and verified earlier this
// session from the manual's own established illustrationBox/resolveIllustration briefs.
const chapterCounts = { 1: 1, 2: 6, 3: 5, 4: 6, 5: 7, 6: 6, 7: 7, 8: 7, 9: 7, 10: 7 };
const canonicalIds = [];
for (const [ch, n] of Object.entries(chapterCounts)) {
  for (let i = 1; i <= n; i++) {
    const chNum = Number(ch);
    const id = chNum >= 7
      ? `ILL-7AF-C${String(chNum).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      : `Illustration ${chNum}.${i}`;
    canonicalIds.push(id);
  }
}
console.log(`Total canonique: ${canonicalIds.length}`);

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");
const plain = docXml.replace(/<[^>]+>/g, "|").replace(/\|+/g, "|");

// For each canonical ID still present as literal text in the document = NOT yet illustrated
// (still showing its placeholder brief). If the ID text is gone, the image has replaced it.
const stillText = canonicalIds.filter(id => {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i").test(plain);
});

console.log(`IDs encore présents comme texte (non illustrés) : ${stillText.length}`);
stillText.forEach(id => console.log(`  - ${id}`));

// Cross-check against actual rendered image count in the body (57, established above).
const relsXml = await zip.file("word/_rels/document.xml.rels").async("string");
const relMap = new Map();
for (const m of relsXml.matchAll(/<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) relMap.set(m[1], m[2]);
const imageRelIds = [...relMap.entries()].filter(([, target]) => /media\//i.test(target)).map(([id]) => id);
const embedsInBody = new Set([...docXml.matchAll(/r:embed="([^"]+)"/g)].map(m => m[1]));
const bodyImageCount = imageRelIds.filter(id => embedsInBody.has(id)).length;
console.log(`Images réellement dessinées dans le corps : ${bodyImageCount}`);
console.log(`59 canonique - ${stillText.length} encore texte = ${59 - stillText.length} attendu illustré ; réellement dessiné = ${bodyImageCount}`);
