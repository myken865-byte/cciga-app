import fs from "node:fs";
import path from "node:path";
import { detectDiscipline, detectLevel } from "./classify.mjs";

const META_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";
const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";

const entries = JSON.parse(fs.readFileSync(META_PATH, "utf8"));
const byBaseAndDL = new Map(); // "disc|lvl|base" -> [fullName,...]
for (const e of entries) {
  const disc = detectDiscipline(e.base);
  const lvl = detectLevel(e.base);
  const key = `${disc}|${lvl}|${e.base}`;
  if (!byBaseAndDL.has(key)) byBaseAndDL.set(key, []);
  byBaseAndDL.get(key).push(e.fullName);
}

function findNoteFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(findNoteFiles(full));
    else if (entry.name.endsWith("_DECISION_VERSION_PRINCIPALE.md") || entry.name.endsWith("_SOURCE_EDITABLE_MANQUANTE.md")) results.push(full);
  }
  return results;
}

const noteFiles = [
  ...findNoteFiles(path.join(ROOT, "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER")),
  ...findNoteFiles(path.join(ROOT, "03_ILLUSTRATIONS_MANQUANTES")),
  ...findNoteFiles(path.join(ROOT, "05_A_VERIFIER_MANUELLEMENT")),
];

for (const notePath of noteFiles) {
  let content = fs.readFileSync(notePath, "utf8");
  if (content.includes("## Chemin(s) d'origine")) continue; // idempotent
  const fileMatches = [...content.matchAll(/`([^`]+\.(?:docx|pdf))`/g)].map(m => m[1]);
  const disc = path.basename(notePath).split("_")[0];
  const lines = ["", "## Chemin(s) d'origine (avant copie dans cette collection)", ""];
  const seen = new Set();
  for (const fname of fileMatches) {
    if (seen.has(fname)) continue;
    seen.add(fname);
    // Try all disc/lvl combos present in the note filename context — simplest robust approach:
    // search all keys whose base matches, regardless of disc/lvl (base names are unique enough).
    let found = null;
    for (const [key, paths] of byBaseAndDL.entries()) {
      if (key.endsWith(`|${fname}`)) { found = paths; break; }
    }
    if (found && found.length) {
      lines.push(`- \`${fname}\` → \`${found[0]}\`${found.length > 1 ? ` (+ ${found.length - 1} copie(s) identique(s) ailleurs — voir INVENTAIRE_12_MANUELS.md)` : ""}`);
    }
  }
  if (lines.length > 3) {
    fs.writeFileSync(notePath, content.trimEnd() + "\n" + lines.join("\n") + "\n", "utf8");
    console.log(`Enrichi: ${notePath}`);
  }
}
