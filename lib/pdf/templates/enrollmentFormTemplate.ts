import type { CheckboxMark, PhotoBox, TextField } from "@/lib/pdf/officialFicheTemplate";

/**
 * Coordonnées mesurées directement sur assets/fiches/universite.pdf (calque
 * texte réel, extrait via `pdftotext -bbox`) — École Professionnelle réutilise
 * exactement la même mise en page (mêmes libellés, mêmes positions, seul le
 * bandeau d'en-tête diffère visuellement), donc les mêmes coordonnées
 * s'appliquent aux deux gabarits (assets/fiches/ecole-professionnelle.pdf et
 * assets/fiches/universite.pdf). Chaque position ci-dessous correspond au
 * coin bas-droit du libellé correspondant + une marge de quelques points.
 *
 * CORRECTION (2026-09-16, mandat "alignement définitif des fiches") :
 * cette dérivation ("bas du libellé + marge") plaçait plusieurs valeurs
 * quasiment SUR la ligne imprimée (confirmé visuellement sur une fiche
 * réelle générée : "À la formation", "Nom", "Adresse électronique du
 * candidat", "Nom et prénom" du contact d'urgence tous traversés par leur
 * ligne). Une marge verticale supplémentaire de +6.5pt a été ajoutée à
 * TOUTES les valeurs de ce gabarit (page 0 et page 1) pour garantir un
 * dégagement systématique au-dessus de la ligne, plutôt que de ne
 * corriger que les champs vus en défaut.
 */
export const enrollmentFormFieldPositions = {
  // ficheNumber : maxWidth ajouté (2026-09-17, "reprise fiches
  // d'inscription") — ce champ n'avait AUCUNE limite de largeur ; sans
  // protection, toute référence future plus longue que l'espace réel avant
  // la bordure de page déborderait sans que fitTextToField puisse
  // intervenir (voir enrollmentFormTemplateProfessionnelle.ts, même défaut
  // confirmé et corrigé sur le gabarit Professionnelle).
  ficheNumber: { page: 0, x: 470, y: 604.5, size: 9, maxWidth: 130 } satisfies TextField,
  registrationDate: { page: 0, x: 493, y: 585.5, size: 9 } satisfies TextField,
  formation: { page: 0, x: 118, y: 564.5, size: 9, maxWidth: 400 } satisfies TextField,
  lastName: { page: 0, x: 80, y: 504.5, maxWidth: 400 } satisfies TextField,
  firstName: { page: 0, x: 100, y: 482.5, maxWidth: 400 } satisfies TextField,
  birthDateAndPlace: { page: 0, x: 132, y: 460.5, maxWidth: 380 } satisfies TextField,
  sex: { page: 0, x: 80, y: 420.5, maxWidth: 380 } satisfies TextField,
  fatherName: { page: 0, x: 112, y: 399.5, maxWidth: 340 } satisfies TextField,
  fatherPhone: { page: 0, x: 490, y: 399.5, size: 9, maxWidth: 90 } satisfies TextField,
  motherName: { page: 0, x: 124, y: 379.5, maxWidth: 320 } satisfies TextField,
  motherPhone: { page: 0, x: 488, y: 379.5, size: 9, maxWidth: 90 } satisfies TextField,
  cin: { page: 0, x: 78, y: 333.5, maxWidth: 145 } satisfies TextField,
  cinIssuedDate: { page: 0, x: 282, y: 333.5, maxWidth: 130 } satisfies TextField,
  address: { page: 0, x: 150, y: 312.5, maxWidth: 400 } satisfies TextField,
  phone: { page: 0, x: 102, y: 291.5, maxWidth: 400 } satisfies TextField,
  email: { page: 0, x: 194, y: 270.5, maxWidth: 350 } satisfies TextField,
  emergencyContactName: { page: 0, x: 122, y: 224.5, maxWidth: 400 } satisfies TextField,
  emergencyContactPhone: { page: 0, x: 102, y: 204.5, maxWidth: 400 } satisfies TextField,
  emergencyContactEmail: { page: 0, x: 144, y: 184.5, maxWidth: 400 } satisfies TextField,

  option: { page: 1, x: 200, y: 351.5, maxWidth: 350 } satisfies TextField,
  inscriptionInfo: { page: 1, x: 200, y: 327.5, maxWidth: 350 } satisfies TextField,
  duration: { page: 1, x: 200, y: 303.5, maxWidth: 350 } satisfies TextField,
  uniformInfo: { page: 1, x: 200, y: 279.5, maxWidth: 350 } satisfies TextField,
  versement1: { page: 1, x: 200, y: 255.5, maxWidth: 350 } satisfies TextField,
  versement2: { page: 1, x: 200, y: 231.5, maxWidth: 350 } satisfies TextField,
  versement3: { page: 1, x: 200, y: 207.5, maxWidth: 350 } satisfies TextField,
  niveauEtude: { page: 1, x: 50, y: 583.5, maxWidth: 500 } satisfies TextField,
  engagementName: { page: 1, x: 70, y: 483.5, size: 9, maxWidth: 285 } satisfies TextField,
};

// Cases à cocher "Situation de famille" (page 1) — position estimée à
// gauche du libellé correspondant, sur la même ligne. y corrigé (+6.5,
// 2026-09-16) en cohérence avec les champs texte de la même rangée.
//
// RECALIBRÉ (2026-09-16, 2e passe) : "célibataire" cochée sur une fiche
// réelle plaçait le ✓ visiblement HORS de la case (au-dessus et à gauche,
// confirmé par crop 300 DPI serré) — décalage mesuré ≈ (+10, -8). Les 6
// cases de cette rangée partagent la même mesure d'origine (même ligne
// imprimée) : le même delta est appliqué aux 6, pas seulement à celle
// visuellement vérifiée.
export const enrollmentFormFamilyStatusMarks: Record<string, CheckboxMark> = {
  maries: { page: 0, x: 169, y: 355.5 },
  vie_maritale: { page: 0, x: 231, y: 355.5 },
  veuf_veuve: { page: 0, x: 316, y: 355.5 },
  divorces: { page: 0, x: 403, y: 355.5 },
  separes: { page: 0, x: 473, y: 355.5 },
  celibataire: { page: 0, x: 541, y: 355.5 },
};

// Encadré "PHOTO" (page 1) — position estimée depuis le rendu visuel du
// gabarit ; ne déborde jamais sur les colonnes voisines (marge conservée de
// chaque côté).
export const enrollmentFormPhotoBox: PhotoBox = { page: 0, x: 469, y: 408, width: 85, height: 110 };
