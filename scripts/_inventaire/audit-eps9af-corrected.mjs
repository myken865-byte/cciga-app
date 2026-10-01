import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Manuel_EPS_9AF_2026_2027_FINAL.docx";

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const mediaFiles = Object.keys(zip.files).filter(p => /^word\/media\//i.test(p) && !zip.files[p].dir);
console.log(`Fichiers média: ${mediaFiles.length}`);

const relsXml = await zip.file("word/_rels/document.xml.rels").async("string");
const relMap = new Map();
for (const m of relsXml.matchAll(/<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) relMap.set(m[1], m[2]);
const imageRelIds = [...relMap.entries()].filter(([, target]) => /media\//i.test(target)).map(([id]) => id);

const docXml = await zip.file("word/document.xml").async("string");
const embedsInBody = new Set([...docXml.matchAll(/r:embed="([^"]+)"/g)].map(m => m[1]));
const bodyImageCount = imageRelIds.filter(id => embedsInBody.has(id)).length;
console.log(`Images réellement dessinées dans le corps: ${bodyImageCount}`);

const plain = docXml.replace(/<[^>]+>/g, "|").replace(/\|+/g, "|");
const illIds = new Set((plain.match(/ILL-[A-Z0-9\-]+/gi) || []).map(s => s.trim().toUpperCase()));
console.log(`Marqueurs ILL- encore présents comme texte: ${illIds.size}`);
if (illIds.size) console.log([...illIds].join(", "));

const chapMatches = [...plain.matchAll(/\bChapitre\s+(\d+)\b/gi)].map(m => Number(m[1]));
console.log(`Chapitres détectés: ${[...new Set(chapMatches)].sort((a,b)=>a-b).join(",")}`);
