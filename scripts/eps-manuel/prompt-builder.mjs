// Builds a normalized image-generation prompt from structured fields, so
// every illustration in the manual shares one consistent visual style.
// See assets/illustrations/README.md for the full field reference.

const PERMANENT_STYLE_PHRASE =
  "professional educational textbook illustration, Haitian school context, " +
  "anatomically coherent movement, safe supervised PE activity, clean composition, " +
  "no random text, no watermark, no brand logos, not caricatural, semi-realistic editorial illustration style";

/**
 * @param {object} f
 * @param {string} f.sujet - pedagogical subject, e.g. "sequence d'echauffement en quatre etapes"
 * @param {number} f.nombrePersonnes
 * @param {string} f.age - e.g. "eleves d'environ 12-13 ans (7e Annee Fondamentale)"
 * @param {string} f.environnement - e.g. "cour d'ecole haitienne en terre battue"
 * @param {string} f.action - exact action/pose
 * @param {string} f.position - body position detail
 * @param {string} f.materiel - visible equipment, or "aucun materiel visible"
 * @param {string} f.angle - camera angle/composition, e.g. "vue de trois quarts, cadrage large"
 * @param {string} f.realisme - realism level, defaults to semi-realistic editorial style
 * @param {string} f.composition - layout notes (e.g. "bande de 4 vignettes numerotees")
 * @param {string} f.securite - safety notes to depict
 * @param {string} f.exclusions - things to exclude beyond the permanent defaults
 */
export function buildImagePrompt(f) {
  const parts = [
    `Sujet pédagogique : ${f.sujet}.`,
    `Nombre de personnes : ${f.nombrePersonnes}, ${f.age}.`,
    `Identité : élèves haïtiens, diversité naturelle de visages et de carnations.`,
    `Environnement : ${f.environnement}.`,
    `Action exacte : ${f.action}.`,
    f.position ? `Position corporelle : ${f.position}.` : "",
    `Matériel visible : ${f.materiel || "aucun matériel dangereux ou non pertinent"}.`,
    `Angle de vue et composition : ${f.angle}${f.composition ? "; " + f.composition : ""}.`,
    `Niveau de réalisme : ${f.realisme || "illustration éditoriale semi-réaliste, propre, non caricaturale"}.`,
    `Sécurité représentée : ${f.securite || "comportement sécuritaire, activité supervisée, aucune blessure représentée"}.`,
    f.exclusions ? `À exclure : ${f.exclusions}.` : "",
    PERMANENT_STYLE_PHRASE,
  ].filter(Boolean);
  return parts.join(" ");
}

export { PERMANENT_STYLE_PHRASE };
