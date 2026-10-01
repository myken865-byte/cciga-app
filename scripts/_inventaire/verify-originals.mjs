import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";

function findDecisionNotes(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(findDecisionNotes(full));
    else if (entry.name.endsWith("_DECISION_VERSION_PRINCIPALE.md") || entry.name.endsWith("_SOURCE_EDITABLE_MANQUANTE.md")) results.push(full);
  }
  return results;
}

const notes = [
  ...findDecisionNotes(path.join(ROOT, "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER")),
  ...findDecisionNotes(path.join(ROOT, "03_ILLUSTRATIONS_MANQUANTES")),
  ...findDecisionNotes(path.join(ROOT, "05_A_VERIFIER_MANUELLEMENT")),
];
console.error(`Notes trouvées: ${notes.length}`);

function sha256(p) { return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex"); }

const results = [];
for (const notePath of notes) {
  const content = fs.readFileSync(notePath, "utf8");
  const pathLines = [...content.matchAll(/- `([^`]+)` → `([^`]+)`/g)];
  for (const m of pathLines) {
    const [, base, origPath] = m;
    const exists = fs.existsSync(origPath);
    let size = null, hashPreview = null;
    if (exists) {
      const st = fs.statSync(origPath);
      hashPreview = sha256(origPath).slice(0, 12);
      size = st.size;
    }
    results.push({ base, origPath, exists, size, hash: hashPreview });
  }
}

console.log(`Total chemins vérifiés : ${results.length}`);
const missing = results.filter(r => !r.exists);
console.log(`Manquants : ${missing.length}`);
for (const r of results) {
  console.log(`${r.exists ? "OK" : "MANQUANT"} | ${r.base} | ${r.origPath} | ${r.size ?? ""} | ${r.hash ?? ""}`);
}
