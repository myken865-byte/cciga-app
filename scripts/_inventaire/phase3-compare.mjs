import fs from "node:fs";
import path from "node:path";
import { detectDiscipline, detectLevel, detectCategory, detectKind } from "./classify.mjs";

const META_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";
const DEEP_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_deep_compare.json";
const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";

const allEntries = JSON.parse(fs.readFileSync(META_PATH, "utf8"));
for (const e of allEntries) {
  e.discipline = detectDiscipline(e.base);
  e.level = detectLevel(e.base);
  e.category = detectCategory(e.base);
  e.kind = detectKind(e.category, e);
}
const deepEntries = JSON.parse(fs.readFileSync(DEEP_PATH, "utf8"));
const deepByHash = new Map(deepEntries.map(e => [e.sha256, e]));

const DISCIPLINES = ["EPS", "EEA", "ETAP", "EC"];
const LEVELS = ["7AF", "8AF", "9AF"];

// --- Ground truth: expected chapter numbers per manual, derived from the canonical component
// files (Composant — chapitre) copied in Phase 2, NOT from any single candidate's own claims. ---
function expectedChapters(disc, lvl) {
  const nums = new Set();
  for (const e of allEntries) {
    if (e.discipline !== disc || e.level !== lvl) continue;
    if (e.category !== "Composant — chapitre") continue;
    const m = e.base.match(/chapitre\s*(\d+)/i);
    if (m) nums.add(Number(m[1]));
  }
  return [...nums].sort((a, b) => a - b);
}

function fmtSize(bytes) {
  if (bytes == null) return "";
  if (bytes > 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " Mo";
  return (bytes / 1024).toFixed(0) + " Ko";
}
function fmtDate(iso) { return (iso || "").slice(0, 19).replace("T", " "); }

function missing(expected, present) {
  const p = new Set(present);
  return expected.filter(n => !p.has(n));
}

const synthesisRows = [];

for (const disc of DISCIPLINES) {
  for (const lvl of LEVELS) {
    const expected = expectedChapters(disc, lvl);
    // Distinct manuscript candidates for this manual (dedup by hash, same as Phase 2/deep pass).
    const cands = allEntries.filter(e => e.discipline === disc && e.level === lvl && e.kind === "manuscrit_complet");
    const seen = new Map();
    const distinct = [];
    for (const c of cands) { if (!seen.has(c.sha256)) { seen.set(c.sha256, true); distinct.push(c); } }

    for (const c of distinct) {
      const d = deepByHash.get(c.sha256);
      c.chapterNumbers = d?.deep?.chapterNumbers || [];
      c.wordCountBody = d?.deep?.wordCountBody ?? null;
      c.approxImageObjectCount = d?.deep?.approxImageObjectCount ?? null;
    }

    if (distinct.length === 0) {
      synthesisRows.push({ disc, lvl, n: 0, verdict: "AUCUN CANDIDAT MANUSCRIT COMPLET TROUVÉ", detail: "voir composants seuls" });
      continue;
    }

    // --- Score each candidate on objective, stated criteria only ---
    for (const c of distinct) {
      const chapMissing = missing(expected, c.chapterNumbers);
      c._chapCoverage = expected.length > 0 ? (expected.length - chapMissing.length) / expected.length : null;
      c._chapMissing = chapMissing;
      c._images = c.ext.toLowerCase() === ".pdf" ? c.approxImageObjectCount : c.docx?.mediaImageCount;
    }
    const maxImages = Math.max(...distinct.map(c => c._images || 0));
    const maxChapCoverage = Math.max(...distinct.map(c => c._chapCoverage ?? -1));
    const mostRecentTime = Math.max(...distinct.map(c => new Date(c.lastWriteTime).getTime()));

    // A candidate "dominates" if it ties-or-beats every other candidate on chapter coverage AND
    // image count AND is at least as recent as any candidate with equal coverage+images.
    const dominant = distinct.filter(c =>
      (c._chapCoverage ?? -1) >= maxChapCoverage - 1e-9 &&
      (c._images || 0) >= maxImages - 0 &&
      new Date(c.lastWriteTime).getTime() >= mostRecentTime - 1000 * 60 * 60 * 24 // within 24h of the most recent among the field
    );

    let verdict, recommended;
    if (distinct.length === 1) {
      verdict = "SEUL CANDIDAT — pas de choix à faire, mais Phase 3 (illustrations) et Phase 10 (contrôle PDF) restent à faire";
      recommended = distinct[0];
    } else if (dominant.length === 1) {
      verdict = "RECOMMANDATION CLAIRE (à confirmer)";
      recommended = dominant[0];
    } else {
      verdict = "DÉCISION REQUISE — plusieurs candidats proches ou incomparables";
      recommended = null;
    }

    synthesisRows.push({
      disc, lvl, n: distinct.length, verdict,
      recommended: recommended ? recommended.base : null,
      detail: `${distinct.length} version(s) distincte(s), ${expected.length} chapitres attendus (canonique)`,
    });

    // --- Per-manual markdown report ---
    const md = [];
    md.push(`# ${disc} ${lvl} — Comparaison des versions (Phase de Travail 3)`);
    md.push("");
    md.push(`Chapitres attendus (d'après les composants canoniques \`Composant — chapitre\` présents dans l'inventaire) : **${expected.length > 0 ? expected.join(", ") : "indéterminé — aucun composant chapitre trouvé pour ce manuel"}**.`);
    md.push("");
    md.push(`**Verdict : ${verdict}**`);
    if (recommended) md.push(`**Candidat recommandé (à confirmer) : \`${recommended.base}\`**`);
    md.push("");
    md.push("| Fichier | Catégorie | Modifié | Taille | Chapitres présents | Chapitres manquants | Images | Mots (corps) | SHA-256 |");
    md.push("|---|---|---|---|---|---|---|---|---|");
    for (const c of distinct.sort((a, b) => new Date(b.lastWriteTime) - new Date(a.lastWriteTime))) {
      const chapPresent = c.chapterNumbers.length ? c.chapterNumbers.join(",") : "—";
      const chapMiss = c._chapMissing.length ? c._chapMissing.join(",") : (expected.length ? "aucun" : "n/a");
      md.push(`| \`${c.base}\` | ${c.category} | ${fmtDate(c.lastWriteTime)} | ${fmtSize(c.length)} | ${chapPresent} | ${chapMiss} | ${c._images ?? "—"} | ${c.wordCountBody ?? "—"} | \`${c.sha256.slice(0, 8)}\` |`);
    }
    md.push("");
    md.push("### Méthodologie et limites");
    md.push("- « Chapitres présents » = numéros de chapitre détectés par recherche textuelle de `Chapitre N` dans le document — signal approximatif (peut inclure une mention isolée), pas une vérification de contenu complet de chaque chapitre.");
    md.push("- « Images » = nombre d'images réellement intégrées (`word/media/` pour un .docx, objets `/Subtype /Image` pour un .pdf) — pas encore comparé emplacement par emplacement à la liste des illustrations prévues (ce sera fait dans le rapport d'état des illustrations séparé).");
    md.push("- Aucun contrôle visuel n'a été effectué sur les PDF (Phase 10, non commencée).");
    md.push("- La « recommandation » ci-dessus repose uniquement sur des critères objectifs mesurables (couverture des chapitres, nombre d'images, date) — **ce n'est pas une lecture du contenu réel page par page**. Si le verdict est « DÉCISION REQUISE », c'est qu'aucun candidat ne domine clairement les autres sur ces critères : je ne choisis pas arbitrairement (règle de sécurité n°7).");
    md.push("");

    const outDir = path.join(ROOT, "05_A_VERIFIER_MANUELLEMENT", `${disc}_${lvl}`);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${disc}_${lvl}_COMPARAISON_VERSIONS.md`), md.join("\n"), "utf8");
  }
}

// --- Synthesis across all 12 manuals ---
const synth = ["# PHASE3_SYNTHESE_DECISIONS — Vue d'ensemble des 12 manuels", "",
  "| Manuel | Versions distinctes | Verdict | Recommandation (à confirmer) |",
  "|---|---|---|---|"];
for (const r of synthesisRows) {
  synth.push(`| ${r.disc} ${r.lvl} | ${r.n} | ${r.verdict} | ${r.recommended || "—"} |`);
}
fs.writeFileSync(path.join(ROOT, "00_RAPPORT_GENERAL", "PHASE3_SYNTHESE_DECISIONS.md"), synth.join("\n"), "utf8");

console.log(synth.join("\n"));
