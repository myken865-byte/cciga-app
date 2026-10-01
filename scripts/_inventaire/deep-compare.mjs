// Phase de Travail 3 — deeper introspection of the "manuscrit complet" candidates only (the ones
// copied into 05_A_VERIFIER_MANUELLEMENT), to support a real per-manual version comparison:
// distinct chapter numbers actually present, word counts, and (for PDFs) an approximate embedded
// image count. Nothing here modifies any file — read-only analysis.
import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";
import { detectDiscipline, detectLevel, detectCategory, detectKind } from "./classify.mjs";

const META_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";
const OUT_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_deep_compare.json";

function xmlTagText(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return m ? m[1] : null;
}

async function deepInspectDocx(filePath) {
  const info = { chapterNumbers: [], wordCountBody: null, headingsFound: [], openError: null };
  try {
    const buf = fs.readFileSync(filePath);
    const zip = await JSZip.loadAsync(buf);
    const docXmlFile = zip.file("word/document.xml");
    if (docXmlFile) {
      const docXml = await docXmlFile.async("string");
      const plain = docXml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const chapMatches = [...plain.matchAll(/\bChapitre\s+(\d+)\b/gi)].map(m => Number(m[1]));
      info.chapterNumbers = [...new Set(chapMatches)].sort((a, b) => a - b);
      info.wordCountBody = plain.trim().split(/\s+/).filter(Boolean).length;
      // Grab first ~15 short-ish "titles" heuristically (lines with fewer than 12 words that
      // start with a capital and mention "Chapitre" — a cheap proxy for a table of contents).
      const headingLike = [...plain.matchAll(/Chapitre\s+\d+\s*[:\-–—]?\s*([^.]{0,80})/gi)]
        .map(m => m[0].trim()).slice(0, 20);
      info.headingsFound = [...new Set(headingLike)];
    }
  } catch (err) {
    info.openError = err.message;
  }
  return info;
}

function deepInspectPdf(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    const text = buf.toString("latin1");
    const imageObjs = text.match(/\/Subtype\s*\/Image/g) || [];
    const chapMatches = [...text.matchAll(/Chapitre\s+(\d+)/gi)].map(m => Number(m[1]));
    return {
      approxImageObjectCount: imageObjs.length,
      chapterNumbers: [...new Set(chapMatches)].sort((a, b) => a - b),
    };
  } catch (err) {
    return { approxImageObjectCount: null, chapterNumbers: [], error: err.message };
  }
}

async function main() {
  const entries = JSON.parse(fs.readFileSync(META_PATH, "utf8"));
  for (const e of entries) {
    e.discipline = detectDiscipline(e.base);
    e.level = detectLevel(e.base);
    e.category = detectCategory(e.base);
    e.kind = detectKind(e.category, e);
  }
  const manuscripts = entries.filter(e => e.kind === "manuscrit_complet" && e.discipline !== "INCONNU" && e.level !== "INCONNU");

  // Dedup by hash (same rule as Phase 2) — no need to deep-inspect byte-identical copies twice.
  const seen = new Map();
  const targets = [];
  for (const e of manuscripts) {
    if (seen.has(e.sha256)) continue;
    seen.set(e.sha256, true);
    targets.push(e);
  }

  console.log(`Deep-inspecting ${targets.length} distinct manuscript candidates...`);
  let i = 0;
  for (const e of targets) {
    i++;
    process.stderr.write(`\r[${i}/${targets.length}] ${e.discipline} ${e.level} — ${e.base}                    `);
    if (e.ext.toLowerCase() === ".docx") {
      e.deep = await deepInspectDocx(e.fullName);
    } else if (e.ext.toLowerCase() === ".pdf") {
      e.deep = deepInspectPdf(e.fullName);
    }
  }
  process.stderr.write("\n");

  fs.writeFileSync(OUT_PATH, JSON.stringify(targets, null, 2), "utf8");
  console.log(`Wrote ${targets.length} entries to ${OUT_PATH}`);
}

main();
