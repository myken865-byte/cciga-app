import fs from "node:fs";
import crypto from "node:crypto";
import readline from "node:readline";
import JSZip from "jszip";

const IN_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_candidats.tsv";
const OUT_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function xmlTagText(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i"));
  return m ? m[1] : null;
}

async function inspectDocx(filePath) {
  const info = {
    pagesCached: null, wordsCached: null, paragraphsCached: null,
    titleCore: null, lastModifiedBy: null, revision: null,
    mediaImageCount: 0, mediaExtensions: {},
    illustrationMarkerCount: 0, illustrationMarkers: {},
    chapterHeadingCount: 0,
    openError: null,
  };
  try {
    const buf = fs.readFileSync(filePath);
    const zip = await JSZip.loadAsync(buf);

    const appXmlFile = zip.file("docProps/app.xml");
    if (appXmlFile) {
      const appXml = await appXmlFile.async("string");
      info.pagesCached = xmlTagText(appXml, "Pages");
      info.wordsCached = xmlTagText(appXml, "Words");
      info.paragraphsCached = xmlTagText(appXml, "Paragraphs");
    }
    const coreXmlFile = zip.file("docProps/core.xml");
    if (coreXmlFile) {
      const coreXml = await coreXmlFile.async("string");
      info.titleCore = xmlTagText(coreXml, "dc:title");
      info.lastModifiedBy = xmlTagText(coreXml, "cp:lastModifiedBy");
      info.revision = xmlTagText(coreXml, "cp:revision");
    }

    const mediaFiles = Object.keys(zip.files).filter(p => /^word\/media\//i.test(p) && !zip.files[p].dir);
    info.mediaImageCount = mediaFiles.length;
    for (const p of mediaFiles) {
      const ext = (p.split(".").pop() || "").toLowerCase();
      info.mediaExtensions[ext] = (info.mediaExtensions[ext] || 0) + 1;
    }

    const docXmlFile = zip.file("word/document.xml");
    if (docXmlFile) {
      const docXml = await docXmlFile.async("string");
      // Strip XML tags to get a rough plain-text stream for marker scanning (good enough — we
      // only count occurrences, not extract exact positions).
      const plain = docXml.replace(/<[^>]+>/g, " ");
      const markerPatterns = {
        "ILL-": /ILL-[A-Z0-9\-]+/gi,
        "Illustration N.M": /\bIllustration\s+\d+\.\d+\b/gi,
        "Emplacement de l'illustration": /Emplacement de l['’]illustration/gi,
        "Illustration à réaliser": /Illustration [aà] r[ée]aliser/gi,
        "Brief pour l'illustrateur": /Brief pour l['’]illustrateur/gi,
        "Description visuelle": /Description visuelle/gi,
        "Image à insérer": /Image [aà] ins[ée]rer/gi,
        "placeholder": /placeholder/gi,
      };
      let total = 0;
      for (const [label, pat] of Object.entries(markerPatterns)) {
        const matches = plain.match(pat) || [];
        const uniqueCount = label === "ILL-" || label === "Illustration N.M"
          ? new Set(matches.map(m => m.trim())).size
          : matches.length;
        if (uniqueCount > 0) info.illustrationMarkers[label] = uniqueCount;
      }
      // Best-effort unique illustration count: union of distinct ILL- ids and distinct
      // "Illustration N.M" labels (the two ID conventions seen in this project).
      const illIds = new Set((plain.match(/ILL-[A-Z0-9\-]+/gi) || []).map(s => s.trim().toUpperCase()));
      const illLabels = new Set((plain.match(/\bIllustration\s+\d+\.\d+\b/gi) || []).map(s => s.trim()));
      info.illustrationMarkerCount = illIds.size + illLabels.size;

      const chapMatches = plain.match(/\bChapitre\s+\d+\b/gi) || [];
      info.chapterHeadingCount = new Set(chapMatches.map(s => s.trim())).size;
    }
  } catch (err) {
    info.openError = err.message;
  }
  return info;
}

function inspectPdfPageCount(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    const text = buf.toString("latin1");
    // Prefer /Type /Pages /Count N (most reliable single declaration); fall back to counting
    // "/Type /Page" object occurrences (excludes "/Type /Pages" via negative lookahead).
    const countMatch = text.match(/\/Type\s*\/Pages[^>]*?\/Count\s+(\d+)/);
    if (countMatch) return { pages: Number(countMatch[1]), method: "Pages/Count" };
    const pageObjs = text.match(/\/Type\s*\/Page(?![A-Za-z])/g) || [];
    if (pageObjs.length > 0) return { pages: pageObjs.length, method: "count /Type /Page objects (approximatif)" };
    return { pages: null, method: "indéterminé" };
  } catch (err) {
    return { pages: null, method: `erreur: ${err.message}` };
  }
}

async function main() {
  const rl = readline.createInterface({ input: fs.createReadStream(IN_PATH, "utf8") });
  let header = true;
  const rows = [];
  for await (const line of rl) {
    if (header) { header = false; continue; }
    if (!line.trim()) continue;
    const [fullName, length, lastWriteTime, ext, base, matchedTokens] = line.split("\t");
    rows.push({ fullName, length: Number(length), lastWriteTime, ext, base, matchedTokens });
  }

  const results = [];
  let i = 0;
  for (const row of rows) {
    i++;
    process.stderr.write(`\r[${i}/${rows.length}] ${row.base}                              `);
    const entry = { ...row, sha256: null, docx: null, pdf: null, error: null };
    try {
      entry.sha256 = sha256(row.fullName);
    } catch (err) {
      entry.error = `hash: ${err.message}`;
    }
    if (row.ext.toLowerCase() === ".docx") {
      entry.docx = await inspectDocx(row.fullName);
    } else if (row.ext.toLowerCase() === ".pdf") {
      entry.pdf = inspectPdfPageCount(row.fullName);
    }
    results.push(entry);
  }
  process.stderr.write("\n");

  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), "utf8");
  console.log(`Wrote ${results.length} entries to ${OUT_PATH}`);
}

main();
