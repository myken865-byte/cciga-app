import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

function sha256(p) { return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex"); }

const dup2Path = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\09_ARCHIVES_ET_DOUBLONS\\EPS_9AF\\Manuel_EPS_9AF_2026_2027_FINAL__dup2.docx";
const st = fs.statSync(dup2Path);
console.log(`dup2 file: taille=${st.size}, hash=${sha256(dup2Path).slice(0, 12)}`);
console.log(`Attendu (candidat 96 images, 168.5 Mo, hash 2f14d097...) : ${st.size > 100 * 1024 * 1024 ? "TAILLE COHÉRENTE" : "TAILLE INCOHÉRENTE"}`);

// --- Systemic scan: for every DECISION note's chosen filename, check whether 05_A_VERIFIER (or
// its post-move remnants) ever held MORE THAN ONE distinct-hash file sharing that exact base name
// -> if so, the naive filename-based move in phase3b-finalize.mjs could have picked the wrong one.
const META_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";
const entries = JSON.parse(fs.readFileSync(META_PATH, "utf8"));

// Re-derive discipline/level/category/kind exactly like classify.mjs (import it properly instead).
import("./classify.mjs").then(async ({ detectDiscipline, detectLevel, detectCategory, detectKind }) => {
  for (const e of entries) {
    e.discipline = detectDiscipline(e.base);
    e.level = detectLevel(e.base);
    e.category = detectCategory(e.base);
    e.kind = detectKind(e.category, e);
  }
  const manuscripts = entries.filter(e => e.kind === "manuscrit_complet" && e.discipline !== "INCONNU" && e.level !== "INCONNU");

  const byManualAndName = new Map(); // "disc|lvl|base" -> Set(hash)
  for (const e of manuscripts) {
    const key = `${e.discipline}|${e.level}|${e.base}`;
    if (!byManualAndName.has(key)) byManualAndName.set(key, new Map());
    byManualAndName.get(key).set(e.sha256, (byManualAndName.get(key).get(e.sha256) || 0) + 1);
  }

  console.log("\n=== Noms de fichier partagés par PLUSIEURS contenus distincts (collision potentielle) ===");
  let anyCollision = false;
  for (const [key, hashMap] of byManualAndName.entries()) {
    if (hashMap.size > 1) {
      anyCollision = true;
      console.log(`${key} -> ${hashMap.size} contenus distincts sous le même nom : ${[...hashMap.keys()].map(h => h.slice(0, 8)).join(", ")}`);
    }
  }
  if (!anyCollision) console.log("Aucune collision trouvée.");
});
