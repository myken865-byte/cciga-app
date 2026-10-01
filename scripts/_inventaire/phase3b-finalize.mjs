import fs from "node:fs";
import path from "node:path";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";
const VER = path.join(ROOT, "05_A_VERIFIER_MANUELLEMENT");

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function move(src, destDir, destName) {
  mkdirp(destDir);
  const dest = path.join(destDir, destName || path.basename(src));
  if (fs.existsSync(dest)) return dest; // idempotent
  fs.renameSync(src, dest);
  return dest;
}

// Per-manual final decisions. `chosen` = filename inside 05_A_VERIFIER_MANUELLEMENT/<Disc>_<Lvl>/.
// `statusFolder` = one of "02" (illustrations complètes, mise en page à finaliser),
// "03" (illustrations manquantes), or "source_manquante" (EEA/ETAP 9AF special case).
const DECISIONS = [
  { disc: "EPS", lvl: "7AF", chosen: "EPS 7e.AF final.docx", statusFolder: "02",
    reason: "Confirmé par l'utilisateur (2026-09-22) : 57 images, 10/10 chapitres. Écart de 3 sur le décompte de marqueurs texte jugé non significatif (bruit de mesure probable), à revérifier lors du contrôle visuel." },
  { disc: "EPS", lvl: "8AF", chosen: "Manuel_EPS_8AF_2026_2027_COMPLET_IMPRESSION_FINAL_MAJ_TITRES.docx", statusFolder: "02",
    reason: "Recommandation Phase 3 acceptée telle quelle par l'utilisateur (candidat dominant : 12/12 chapitres, 103 images, le plus d'images du groupe, parmi les plus récents)." },
  { disc: "EPS", lvl: "9AF", chosen: "Manuel_EPS_9AF_2026_2027_FINAL.docx", statusFolder: "02",
    reason: "Recommandation Phase 3 acceptée telle quelle (36/36 chapitres, 96 images = 96 emplacements déclarés, correspondance exacte)." },
  { disc: "EEA", lvl: "7AF", chosen: "Manuel_EEA_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx", statusFolder: "03",
    reason: "Recommandation Phase 3 acceptée. Contenu complet (7/7 chapitres) mais seulement 1 image sur 42 emplacements déclarés — illustrations à produire." },
  { disc: "EEA", lvl: "8AF", chosen: "Manuel_EEA_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx", statusFolder: "03",
    reason: "Recommandation Phase 3 acceptée. Contenu complet mais seulement 1 image sur 36 emplacements déclarés — illustrations à produire." },
  { disc: "ETAP", lvl: "7AF", chosen: "Manuel_ETAP_7AF_2026_2027_PRE-FINAL_AVANT_ILLUSTRATIONS.docx", statusFolder: "03",
    reason: "Recommandation Phase 3 acceptée. Contenu complet mais seulement 1 image sur 48 emplacements déclarés — illustrations à produire." },
  { disc: "ETAP", lvl: "8AF", chosen: "Manuel_ETAP_8AF_2026_2027_PRE-FINAL_AVANT_ILLUSTRATIONS.docx", statusFolder: "03",
    reason: "Recommandation Phase 3 acceptée. Contenu complet mais seulement 1 image sur 48 emplacements déclarés — illustrations à produire." },
  { disc: "EC", lvl: "7AF", chosen: "EC 7e AF. Final.docx", statusFolder: "02",
    reason: "Confirmé par l'utilisateur (2026-09-22) : version la plus récente, quasi identique à Manuel_EC_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx (mêmes 28 images, mêmes 7 chapitres, mêmes ~17500 mots) — celle-ci archivée comme quasi-doublon." },
  { disc: "EC", lvl: "8AF", chosen: "Manuel_EC_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx", statusFolder: "02",
    reason: "Recommandation Phase 3 acceptée telle quelle (7/7 chapitres, 27 images pour 28 emplacements déclarés, écart de 1 probablement du bruit de mesure)." },
  { disc: "EC", lvl: "9AF", chosen: "Manuel_EC_9AF_2026_2027_CORRIGE_FINAL.docx", statusFolder: "02",
    reason: "Recommandation Phase 3 acceptée telle quelle (7/7 chapitres, 41 images — le plus illustré du groupe ; base de comparaison des emplacements déclarés jugée peu fiable pour ce fichier)." },
];

const SPECIAL = [
  { disc: "EEA", lvl: "9AF", chosenPdf: "Manuel_EEA_9AF_2026_REORGANISE_FINAL (1).pdf", bestDocx: "Manuel_EEA_9AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx",
    reason: "Aucune version .docx illustrée équivalente retrouvée après recherche ciblée (Bureau, Documents, Téléchargements, Corbeille, dossiers Claude/ChatGPT/Images/Livres, OneDrive local — aucun lecteur externe présent). Le PDF réorganisé (43 images, 7/7 chapitres) est utilisé comme référence provisoire ; le meilleur .docx disponible (10 images seulement) est conservé à côté pour une reconstruction future." },
  { disc: "ETAP", lvl: "9AF", chosenPdf: "Manuel_ETAP_9AF_2026_CORRIGE_FINAL_V2.pdf", bestDocx: "Manuel_ETAP_9AF_2026_2027_PRE-FINAL_AVANT_ILLUSTRATIONS.docx",
    reason: "Aucune version .docx illustrée équivalente retrouvée (même recherche que EEA 9AF). Le PDF corrigé final (39 images, 6/6 chapitres) est utilisé comme référence provisoire ; le meilleur .docx disponible (1 image seulement) est conservé à côté pour une reconstruction future." },
];

const dashboard = [];

for (const d of DECISIONS) {
  const srcDir = path.join(VER, `${d.disc}_${d.lvl}`);
  const chosenPath = path.join(srcDir, d.chosen);
  if (!fs.existsSync(chosenPath)) {
    console.error(`MANQUANT: ${chosenPath}`);
    continue;
  }
  const statusDirName = d.statusFolder === "02"
    ? "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER"
    : "03_ILLUSTRATIONS_MANQUANTES";
  const destDir = path.join(ROOT, statusDirName, d.disc, `${d.lvl}`);
  const finalPath = move(chosenPath, destDir, d.chosen);

  // Archive every OTHER manuscript-complete candidate left behind in 05_A_VERIFIER for this manual.
  const archiveDir = path.join(ROOT, "09_ARCHIVES_ET_DOUBLONS", `${d.disc}_${d.lvl}`);
  const remaining = fs.existsSync(srcDir) ? fs.readdirSync(srcDir).filter(f => !f.endsWith(".md")) : [];
  const archivedList = [];
  for (const f of remaining) {
    const archived = move(path.join(srcDir, f), archiveDir, f);
    archivedList.push(f);
  }
  // Move the comparison report alongside the chosen file's new home for easy reference.
  const cmpReport = path.join(srcDir, `${d.disc}_${d.lvl}_COMPARAISON_VERSIONS.md`);
  if (fs.existsSync(cmpReport)) move(cmpReport, destDir, path.basename(cmpReport));

  const noteLines = [
    `# ${d.disc} ${d.lvl} — Décision de version principale`, "",
    `**Version principale de travail : \`${d.chosen}\`**`, "",
    `Raison : ${d.reason}`, "",
    archivedList.length
      ? `Autres versions archivées (conservées, non modifiées) dans \`09_ARCHIVES_ET_DOUBLONS/${d.disc}_${d.lvl}/\` : ${archivedList.map(f => `\`${f}\``).join(", ")}.`
      : "Aucune autre version à archiver (candidat unique).",
  ];
  fs.writeFileSync(path.join(destDir, `${d.disc}_${d.lvl}_DECISION_VERSION_PRINCIPALE.md`), noteLines.join("\n"), "utf8");

  dashboard.push({ disc: d.disc, lvl: d.lvl, chosen: d.chosen, statutDossier: statusDirName.split("_")[0], statutLabel: d.statusFolder === "02" ? "Illustrations complètes — mise en page à finaliser" : "Illustrations manquantes" });
}

for (const s of SPECIAL) {
  const srcDir = path.join(VER, `${s.disc}_${s.lvl}`);
  // Keep everything in 05_A_VERIFIER_MANUELLEMENT for these two — but archive the ORIGINAL
  // (superseded, 0 images) and any leftover candidate that isn't the chosen PDF or the best docx.
  const keep = new Set([s.chosenPdf, s.bestDocx]);
  const archiveDir = path.join(ROOT, "09_ARCHIVES_ET_DOUBLONS", `${s.disc}_${s.lvl}`);
  const remaining = fs.existsSync(srcDir) ? fs.readdirSync(srcDir).filter(f => !f.endsWith(".md") && !keep.has(f)) : [];
  const archivedList = [];
  for (const f of remaining) {
    move(path.join(srcDir, f), archiveDir, f);
    archivedList.push(f);
  }
  const cmpReport = path.join(srcDir, `${s.disc}_${s.lvl}_COMPARAISON_VERSIONS.md`);
  const noteLines = [
    `# ${s.disc} ${s.lvl} — SOURCE ÉDITABLE MANQUANTE`, "",
    `**Statut : source .docx illustrée introuvable — référence provisoire = PDF.**`, "",
    `PDF de référence (provisoire, non modifié) : \`${s.chosenPdf}\``,
    `Meilleur .docx disponible pour une future reconstruction : \`${s.bestDocx}\``, "",
    `Raison / recherche effectuée : ${s.reason}`, "",
    "Ce manuel ne doit PAS être déclaré prêt pour l'impression tant que :",
    "1. un contrôle visuel page par page du PDF n'a pas été fait (prévu en Phase de Travail 4) ;",
    "2. une décision n'a pas été prise sur la reconstruction d'une source .docx éditable.",
    "",
    archivedList.length ? `Autres candidats archivés : ${archivedList.map(f => `\`${f}\``).join(", ")}.` : "",
  ];
  fs.writeFileSync(path.join(srcDir, `${s.disc}_${s.lvl}_SOURCE_EDITABLE_MANQUANTE.md`), noteLines.join("\n"), "utf8");

  dashboard.push({ disc: s.disc, lvl: s.lvl, chosen: `${s.chosenPdf} (PDF, source .docx manquante)`, statutDossier: "05", statutLabel: "À vérifier manuellement — source éditable manquante" });
}

fs.writeFileSync(path.join(ROOT, "00_RAPPORT_GENERAL", "_dashboard_data.json"), JSON.stringify(dashboard, null, 2), "utf8");
console.log(JSON.stringify(dashboard, null, 2));
