// Listes de choix prédéfinis partagées par les fiches d'inscription
// (École Classique et École Professionnelle) — une donnée qui a une liste
// finie et connue de réponses possibles ne doit jamais rester un champ
// texte libre.

export const SEX_OPTIONS = [
  { value: "Masculin", label: "Masculin" },
  { value: "Féminin", label: "Féminin" },
];

export const FAMILY_STATUS_OPTIONS = ["Mariés", "Vie maritale", "Veuf / Veuve", "Divorcés", "Séparés", "Célibataire"];

export const BLOOD_TYPE_OPTIONS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Non renseigné / Inconnu"];

export const LIVES_WITH_OPTIONS: { value: string; label: string }[] = [
  { value: "parents", label: "Chez les parents" },
  { value: "pere", label: "Chez le père" },
  { value: "mere", label: "Chez la mère" },
  { value: "tuteurs", label: "Chez ses tuteurs" },
];

/** Format international raisonnable — n'empêche pas un numéro étranger différent du format haïtien habituel. */
export const PHONE_PATTERN = "^[+0-9][0-9 ().-]{5,20}$";
