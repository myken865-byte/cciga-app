import fs from "node:fs";
import readline from "node:readline";

const IN_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_scan_bruteforce.tsv";
const OUT_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_candidats.tsv";

// Primary discipline signal REQUIRED — bare level tokens (7AF/8AF/9AF) or "Potentiel en Éveil"
// alone are too permissive: they also match the user's many OTHER manual collections (Sciences
// Physiques, Sciences Sociales, Biologie/On Est Là, Kreyòl, Économie, ...), some of which also
// carry the "Potentiel en Éveil" brand or overlapping level names. Only one of the 4 target
// disciplines (spelled out or abbreviated) qualifies a file for this specific 12-manual mission.
// NOTE: JS "\b" treats underscore as a word char, so it does NOT match at "_EPS_" boundaries —
// and this project's canonical filenames are almost all underscore-separated
// (e.g. "Manuel_EPS_7AF_Chapitre1.docx"). Use an explicit separator class instead of \b.
const SEP = "[-_ .()\\[\\],]";
const patterns = [
  new RegExp(`(^|${SEP})EPS(${SEP}|$)`, "i"),
  new RegExp(`(^|${SEP})EEA(${SEP}|$)`, "i"),
  new RegExp(`(^|${SEP})ETAP(${SEP}|$)`, "i"),
  /[EÉ]ducation[\s_\-]*Physique[\s_\-]*(et|&)[\s_\-]*Sportive/i,
  /[EÉ]ducation[\s_\-]*Esth[eé]tique[\s_\-]*(et|&)[\s_\-]*Artistique/i,
  /[EÉ]ducation[\s_\-]*[aà][\s_\-]*la[\s_\-]*Technologie/i,
  /Technologie[\s_\-]*(et|&)[\s_\-]*(aux[\s_\-]*)?Activit[eé]s[\s_\-]*Productives/i,
];

// Extra guard for the bare "EC" token: only count it if flanked by non-letters (so "SECTION",
// "SPECIAL", "RECU" etc. don't match) AND the filename also contains a level/discipline-ish hint
// OR literally "EC_" / "EC-" / "EC " / "_EC" / "-EC" / " EC" adjacency, OR "Education a la Citoyennete"/
// "Citoyennete" spelled out.
// Only real word-separators (space, dash, underscore, dot, parenthesis) count as boundaries —
// NOT digits, so hash-like filenames (e.g. "...4ec0...png") never match.
function hasBareECToken(name) {
  return /(^|[-_ .()\[\]])EC([-_ .()\[\]]|$)/i.test(name);
}
function hasCitoyennete(name) {
  return /Citoyennet[eé]/i.test(name);
}
// Exclude the unrelated "Économie" source-file numbering scheme (EC-A1, EC-G1..G3, EC-P1..P5),
// which coincidentally starts with "EC-" but has nothing to do with Éducation à la Citoyenneté.
function isEconomieSourceFile(name) {
  return /^EC-[AGP]\d/i.test(name);
}

const rl = readline.createInterface({ input: fs.createReadStream(IN_PATH, "utf8") });
let header = true;
const rows = [];
for await (const line of rl) {
  if (header) { header = false; continue; }
  if (!line.trim()) continue;
  const [fullName, length, lastWriteTime, ext] = line.split("\t");
  if (!fullName) continue;
  const base = fullName.split(/[\\/]/).pop();

  let matched = false;
  let matchedTokens = [];
  for (const pat of patterns) {
    if (pat.source === "\\bEC\\b") continue; // handled specially below
    if (pat.test(base)) { matched = true; matchedTokens.push(pat.source); }
  }
  if (!isEconomieSourceFile(base) && (hasBareECToken(base) || hasCitoyennete(base))) {
    matched = true; matchedTokens.push("EC-token");
  }

  if (matched) {
    rows.push({ fullName, length: Number(length), lastWriteTime, ext, base, matchedTokens: matchedTokens.join(",") });
  }
}

const outLines = ["FullName\tLength\tLastWriteTime\tExtension\tBaseName\tMatchedTokens"];
for (const r of rows) {
  outLines.push(`${r.fullName}\t${r.length}\t${r.lastWriteTime}\t${r.ext}\t${r.base}\t${r.matchedTokens}`);
}
fs.writeFileSync(OUT_PATH, outLines.join("\n"), "utf8");
console.log(`Candidates matched: ${rows.length}`);
