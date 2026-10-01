// Shared classification helpers for the Collection Potentiel en Éveil inventory (Phase 1) and
// central-folder population (Phase 2). Kept in one place so both stages agree on the same rules.
export const SEP = "[-_ .()\\[\\],]";

export function detectDiscipline(base) {
  const tok = (t) => new RegExp(`(^|${SEP})${t}(${SEP}|$)`, "i").test(base);
  if (tok("EPS") || /Physique.*Sportive/i.test(base)) return "EPS";
  if (tok("EEA") || /Esth[eé]tique.*Artistique/i.test(base)) return "EEA";
  if (tok("ETAP") || /Activit[eé]s.*Productives/i.test(base)) return "ETAP";
  if (/(^|[-_ .()\[\],])EC([-_ .()\[\],]|$)/i.test(base) || /Citoyennet[eé]/i.test(base)) return "EC";
  return "INCONNU";
}

export function detectLevel(base) {
  const lvl = (d) => new RegExp(`(^|${SEP})${d}\\s*(e|[eè]me)?\\s*${SEP}?AF(${SEP}|$)`, "i");
  if (lvl("7").test(base)) return "7AF";
  if (lvl("8").test(base)) return "8AF";
  if (lvl("9").test(base)) return "9AF";
  return "INCONNU";
}

// NOTE: fixed vs. the first Phase-1 pass — "\bfinal\b" silently failed on "_FINAL.docx" /
// "_FINAL_" because "_" counts as a word character in JS regex, so it never reached a boundary.
// Same fix pattern as detectDiscipline/detectLevel: explicit separator class.
const hasToken = (b, t) => new RegExp(`(^|${SEP})${t}(${SEP}|$)`, "i").test(b);

export function detectCategory(base) {
  const b = base.toLowerCase();
  // Auxiliary/component signals are checked FIRST: a report or a component file can legitimately
  // contain the word "final" (e.g. "Audit_Final_Manuel_EPS_8AF.docx") without being the manuscript
  // itself — checking "final"/"original" first would misfile these as full manuscripts.
  if (/rapport|audit/.test(b)) return "Auxiliaire — rapport";
  if (/registre.*illustration/.test(b)) return "Auxiliaire — registre illustrations";
  if (/couverture/.test(b)) return "Auxiliaire — couverture";
  if (/identite.visuelle|phase.fondation/.test(b)) return "Auxiliaire — branding/process";
  if (/chapitre\s*\d+/.test(b)) return "Composant — chapitre";
  if (/corrigegeneral|corrige.general/.test(b)) return "Composant — corrigé général";
  if (/glossaire/.test(b)) return "Composant — glossaire";
  if (/r[ée]f[ée]rences?/.test(b)) return "Composant — références";
  if (/annexes?/.test(b)) return "Composant — annexes";
  if (/pagespreliminaires|pages.preliminaires/.test(b)) return "Composant — pages préliminaires";
  if (/evaluationfinale|examenblanc|preparationexamen|corrigesepreuves|preparationevaluation/.test(b)) return "Composant — évaluation/examen";
  if (/original/.test(b)) return "ORIGINAL (racine outil)";
  if (/pre-?final.*avant.*illustration/.test(b)) return "PRE-FINAL avant illustrations";
  if (/final/.test(b) && /corrig/.test(b)) return "CORRIGÉ FINAL";
  if (/reorganise.*final/.test(b)) return "RÉORGANISÉ FINAL";
  if (hasToken(b, "final")) return "FINAL (déclaré)";
  return "Non classé";
}

export function detectKind(category, entry) {
  if (category.startsWith("Composant")) return "composant";
  if (category.startsWith("Auxiliaire")) return "auxiliaire";
  if (category === "Non classé") {
    if (entry.ext.toLowerCase() === ".pdf") return "manuscrit_complet";
    if (entry.ext.toLowerCase() === ".docx" && entry.length > 5 * 1024 * 1024) return "manuscrit_complet";
    return "auxiliaire";
  }
  return "manuscrit_complet"; // ORIGINAL, PRE-FINAL, CORRIGÉ FINAL, RÉORGANISÉ FINAL, FINAL (déclaré)
}

export function detectSource(fullName) {
  const has = (needle) => fullName.toLowerCase().includes(needle.toLowerCase());
  if (has("\\LIVRES_EPS\\") || has("\\LIVRES_EEA\\") || has("\\LIVRES_ETAP\\") || has("\\LIVRES_EC\\")) {
    return "Bibliothèque LIVRES_* (organisée)";
  }
  if (has("\\cciga app\\") && !has("\\LIVRES_")) return "Racine repo cciga app (copie technique résiduelle)";
  if (has("backup")) return "Backup horodaté";
  if (has("\\Documents\\")) return "Documents";
  if (has("\\Downloads\\")) return "Downloads";
  if (has("\\Desktop\\")) return "Desktop (racine ou sous-dossier)";
  return "Autre";
}
