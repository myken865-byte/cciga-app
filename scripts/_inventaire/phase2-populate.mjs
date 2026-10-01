import fs from "node:fs";
import path from "node:path";
import { detectDiscipline, detectLevel, detectCategory, detectKind, detectSource } from "./classify.mjs";

const META_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";
const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";

const DISCIPLINES = ["EPS", "EEA", "ETAP", "EC"];
const STRUCTURE = [
  "00_RAPPORT_GENERAL",
  ...["01_PRETS_POUR_IMPRESSION", "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER",
      "03_ILLUSTRATIONS_MANQUANTES", "04_CONTENU_INCOMPLET", "06_ILLUSTRATIONS_RETROUVEES"]
    .flatMap(d => DISCIPLINES.map(disc => path.join(d, disc))),
  "05_A_VERIFIER_MANUELLEMENT",
  "07_SOURCES_DE_TRAVAIL",
  "08_PDF_DE_CONTROLE",
  "09_ARCHIVES_ET_DOUBLONS",
  "10_SAUVEGARDE_AVANT_CORRECTIONS",
];

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

for (const rel of STRUCTURE) mkdirp(path.join(ROOT, rel));

const entries = JSON.parse(fs.readFileSync(META_PATH, "utf8"));
for (const e of entries) {
  e.discipline = detectDiscipline(e.base);
  e.level = detectLevel(e.base);
  e.category = detectCategory(e.base);
  e.kind = detectKind(e.category, e);
  e.source = detectSource(e.fullName);
}

// --- Pick ONE representative per distinct content hash (dedup) ---
const byHash = new Map();
for (const e of entries) {
  if (!byHash.has(e.sha256)) byHash.set(e.sha256, []);
  byHash.get(e.sha256).push(e);
}
// Deterministic pick: shortest path first (favors canonical LIVRES_* / central locations over
// deeply nested backup copies), tie-broken alphabetically.
function pickRepresentative(group) {
  return [...group].sort((a, b) => a.fullName.length - b.fullName.length || a.fullName.localeCompare(b.fullName))[0];
}

const copyLog = []; // {original, action, target, reason}

function safeCopy(srcPath, destDir, destName) {
  mkdirp(destDir);
  const srcSize = fs.statSync(srcPath).size;
  let finalName = destName;
  let destPath = path.join(destDir, finalName);
  let n = 1;
  while (fs.existsSync(destPath)) {
    // Idempotent re-run: same target name + same size at that exact path almost certainly means
    // this representative was already copied here by a previous run — skip instead of duplicating.
    if (fs.statSync(destPath).size === srcSize) return destPath;
    n++;
    const ext = path.extname(destName);
    const stem = destName.slice(0, -ext.length || undefined);
    finalName = `${stem}__dup${n}${ext}`;
    destPath = path.join(destDir, finalName);
  }
  fs.copyFileSync(srcPath, destPath);
  return destPath;
}

function subfolderForComposant(category) {
  const map = {
    "Composant — chapitre": "Chapitres",
    "Composant — corrigé général": "CorrigeGeneral",
    "Composant — glossaire": "Glossaire",
    "Composant — références": "References",
    "Composant — annexes": "Annexes",
    "Composant — pages préliminaires": "PagesPreliminaires",
    "Composant — évaluation/examen": "Evaluations",
  };
  return map[category] || "Autres";
}
function subfolderForAuxiliaire(category) {
  const map = {
    "Auxiliaire — couverture": "Couvertures",
    "Auxiliaire — registre illustrations": "RegistresIllustrations",
    "Auxiliaire — rapport": "Rapports",
    "Auxiliaire — branding/process": "Branding",
    "Non classé (à examiner)": "NonClasse",
  };
  return map[category] || "NonClasse";
}

let copiedCount = 0, skippedDuplicateCount = 0, sizeCopied = 0;

for (const [hash, group] of byHash.entries()) {
  const rep = pickRepresentative(group);
  const others = group.filter(g => g !== rep);

  let destDir, destName = rep.base;
  if (rep.discipline === "INCONNU" || rep.level === "INCONNU") {
    destDir = path.join(ROOT, "05_A_VERIFIER_MANUELLEMENT", "Discipline_ou_niveau_indetermine");
  } else if (rep.kind === "manuscrit_complet") {
    destDir = path.join(ROOT, "05_A_VERIFIER_MANUELLEMENT", `${rep.discipline}_${rep.level}`);
  } else if (rep.kind === "composant") {
    destDir = path.join(ROOT, "07_SOURCES_DE_TRAVAIL", rep.discipline, rep.level, "Composants", subfolderForComposant(rep.category));
  } else {
    destDir = path.join(ROOT, "07_SOURCES_DE_TRAVAIL", rep.discipline, rep.level, "Auxiliaires", subfolderForAuxiliaire(rep.category));
  }

  let destPath;
  try {
    destPath = safeCopy(rep.fullName, destDir, destName);
    copiedCount++;
    sizeCopied += rep.length;
    copyLog.push({ original: rep.fullName, action: "COPIÉ (représentant)", target: destPath, discipline: rep.discipline, level: rep.level, category: rep.category, kind: rep.kind, sha256: hash, lastWriteTime: rep.lastWriteTime, length: rep.length });
  } catch (err) {
    copyLog.push({ original: rep.fullName, action: `ERREUR: ${err.message}`, target: "", discipline: rep.discipline, level: rep.level, category: rep.category, kind: rep.kind, sha256: hash, lastWriteTime: rep.lastWriteTime, length: rep.length });
    continue;
  }

  // Also stage manuscrit_complet PDFs into 08_PDF_DE_CONTROLE for the future visual QC pass.
  if (rep.kind === "manuscrit_complet" && rep.ext.toLowerCase() === ".pdf" && rep.discipline !== "INCONNU" && rep.level !== "INCONNU") {
    const pdfDestDir = path.join(ROOT, "08_PDF_DE_CONTROLE", rep.discipline, rep.level);
    const pdfDestPath = safeCopy(rep.fullName, pdfDestDir, destName);
    sizeCopied += rep.length;
    copyLog.push({ original: rep.fullName, action: "COPIÉ (copie de contrôle PDF, staging)", target: pdfDestPath, discipline: rep.discipline, level: rep.level, category: rep.category, kind: rep.kind, sha256: hash, lastWriteTime: rep.lastWriteTime, length: rep.length });
  }

  for (const dup of others) {
    skippedDuplicateCount++;
    copyLog.push({ original: dup.fullName, action: `DOUBLON EXACT — non recopié, identique à : ${rep.fullName}`, target: destPath, discipline: dup.discipline, level: dup.level, category: dup.category, kind: dup.kind, sha256: hash, lastWriteTime: dup.lastWriteTime, length: dup.length });
  }
}

// --- Write the copy journal (rule 6: keep name/date/original path for every file) ---
const journalMd = [];
journalMd.push("# JOURNAL_COPIES_PHASE2 — Collection Potentiel en Éveil");
journalMd.push("");
journalMd.push(`Généré le ${new Date().toISOString().slice(0, 19).replace("T", " ")}.`);
journalMd.push("");
journalMd.push("Règle appliquée : pour chaque groupe de fichiers strictement identiques (même SHA-256), UN SEUL représentant est physiquement copié dans l'arborescence centrale (choisi par chemin le plus court, donc généralement l'exemplaire le mieux rangé) ; les autres occurrences identiques sont seulement journalisées ici (chemin d'origine, date, taille) pour ne pas dupliquer inutilement les mêmes octets. Aucun original n'a été déplacé, renommé ou modifié — toutes les copies sont des copies.");
journalMd.push("");
journalMd.push(`Fichiers source traités : ${entries.length}. Copies physiques créées : ${copiedCount + copyLog.filter(l => l.action.startsWith("COPIÉ (copie de contrôle")).length}. Doublons exacts journalisés sans recopie : ${skippedDuplicateCount}. Volume copié : ${(sizeCopied / 1024 / 1024 / 1024).toFixed(2)} Go.`);
journalMd.push("");
journalMd.push("| Discipline | Niveau | Catégorie | Action | Chemin d'origine | Modifié | Taille | Cible |");
journalMd.push("|---|---|---|---|---|---|---|---|");
for (const l of copyLog.sort((a, b) => (a.discipline + a.level).localeCompare(b.discipline + b.level))) {
  const sizeStr = l.length > 1024 * 1024 ? (l.length / 1024 / 1024).toFixed(2) + " Mo" : (l.length / 1024).toFixed(0) + " Ko";
  journalMd.push(`| ${l.discipline} | ${l.level} | ${l.category} | ${l.action} | \`${l.original}\` | ${(l.lastWriteTime || "").slice(0, 19).replace("T", " ")} | ${sizeStr} | \`${l.target}\` |`);
}
fs.writeFileSync(path.join(ROOT, "00_RAPPORT_GENERAL", "JOURNAL_COPIES_PHASE2.md"), journalMd.join("\n"), "utf8");

// --- Copy the Phase 1 inventory reports into 00_RAPPORT_GENERAL ---
for (const f of ["INVENTAIRE_12_MANUELS.md"]) {
  const src = path.join("C:\\Users\\Me. Alcide\\Desktop", f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(ROOT, "00_RAPPORT_GENERAL", f));
}

console.log(`Structure créée sous ${ROOT}`);
console.log(`Copies physiques (représentants) : ${copiedCount}`);
console.log(`Copies de contrôle PDF (staging) : ${copyLog.filter(l => l.action.startsWith("COPIÉ (copie de contrôle")).length}`);
console.log(`Doublons exacts journalisés (non recopiés) : ${skippedDuplicateCount}`);
console.log(`Volume copié : ${(sizeCopied / 1024 / 1024 / 1024).toFixed(2)} Go`);

// --- Per-manual summary for the chat response ---
const summary = {};
for (const l of copyLog) {
  if (!l.action.startsWith("COPIÉ")) continue;
  const key = `${l.discipline}_${l.level}`;
  summary[key] = summary[key] || { manuscrit_complet: 0, composant: 0, auxiliaire: 0 };
  summary[key][l.kind] = (summary[key][l.kind] || 0) + 1;
}
fs.writeFileSync(path.join(ROOT, "00_RAPPORT_GENERAL", "_resume_phase2.json"), JSON.stringify(summary, null, 2), "utf8");
console.log(JSON.stringify(summary, null, 2));
