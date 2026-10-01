// Read/write helpers for assets/illustrations/illustrations_manifest.json.
// Tracks, per chapter and illustration number: the exact prompt used, the
// output filename, caption, intended location in the chapter, and status —
// so illustrations are never silently regenerated and costs stay predictable.
import fs from "node:fs";
import path from "node:path";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\cciga app";
export const MANIFEST_PATH = path.join(ROOT, "assets", "illustrations", "illustrations_manifest.json");

export function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  const raw = fs.readFileSync(MANIFEST_PATH, "utf-8");
  return raw.trim() ? JSON.parse(raw) : {};
}

export function saveManifest(manifest) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
}

export function chapterKey(chapterNum) {
  return `chapitre_${String(chapterNum).padStart(2, "0")}`;
}

export function illKey(illNumber) {
  return `ill${String(illNumber).padStart(2, "0")}`;
}

export function getEntry(manifest, chapterNum, illNumber) {
  return manifest[chapterKey(chapterNum)]?.[illKey(illNumber)] || null;
}

export function upsertEntry(manifest, chapterNum, illNumber, fields) {
  const cKey = chapterKey(chapterNum);
  const iKey = illKey(illNumber);
  manifest[cKey] = manifest[cKey] || {};
  manifest[cKey][iKey] = {
    ...(manifest[cKey][iKey] || {}),
    chapitre: chapterNum,
    numero: illNumber,
    ...fields,
  };
  return manifest[cKey][iKey];
}
