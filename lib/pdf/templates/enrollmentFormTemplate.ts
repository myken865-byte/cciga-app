import type { CheckboxMark, PhotoBox, TextField } from "@/lib/pdf/officialFicheTemplate";

/**
 * Coordonnées mesurées directement sur assets/fiches/universite.pdf (calque
 * texte réel, extrait via `pdftotext -bbox`) — École Professionnelle réutilise
 * exactement la même mise en page (mêmes libellés, mêmes positions, seul le
 * bandeau d'en-tête diffère visuellement), donc les mêmes coordonnées
 * s'appliquent aux deux gabarits (assets/fiches/ecole-professionnelle.pdf et
 * assets/fiches/universite.pdf). Chaque position ci-dessous correspond au
 * coin bas-droit du libellé correspondant + une marge de quelques points.
 */
export const enrollmentFormFieldPositions = {
  ficheNumber: { page: 0, x: 470, y: 598, size: 9 } satisfies TextField,
  registrationDate: { page: 0, x: 493, y: 579, size: 9 } satisfies TextField,
  formation: { page: 0, x: 118, y: 558, size: 9, maxWidth: 400 } satisfies TextField,
  lastName: { page: 0, x: 80, y: 498, maxWidth: 400 } satisfies TextField,
  firstName: { page: 0, x: 100, y: 476, maxWidth: 400 } satisfies TextField,
  birthDateAndPlace: { page: 0, x: 132, y: 454, maxWidth: 380 } satisfies TextField,
  sex: { page: 0, x: 80, y: 414, maxWidth: 380 } satisfies TextField,
  fatherName: { page: 0, x: 112, y: 393, maxWidth: 340 } satisfies TextField,
  fatherPhone: { page: 0, x: 490, y: 393, size: 9, maxWidth: 90 } satisfies TextField,
  motherName: { page: 0, x: 124, y: 373, maxWidth: 320 } satisfies TextField,
  motherPhone: { page: 0, x: 488, y: 373, size: 9, maxWidth: 90 } satisfies TextField,
  cin: { page: 0, x: 78, y: 327, maxWidth: 145 } satisfies TextField,
  cinIssuedDate: { page: 0, x: 282, y: 327, maxWidth: 130 } satisfies TextField,
  address: { page: 0, x: 150, y: 306, maxWidth: 400 } satisfies TextField,
  phone: { page: 0, x: 102, y: 285, maxWidth: 400 } satisfies TextField,
  email: { page: 0, x: 194, y: 264, maxWidth: 350 } satisfies TextField,
  emergencyContactName: { page: 0, x: 122, y: 218, maxWidth: 400 } satisfies TextField,
  emergencyContactPhone: { page: 0, x: 102, y: 198, maxWidth: 400 } satisfies TextField,
  emergencyContactEmail: { page: 0, x: 144, y: 178, maxWidth: 400 } satisfies TextField,

  option: { page: 1, x: 200, y: 345, maxWidth: 350 } satisfies TextField,
  inscriptionInfo: { page: 1, x: 200, y: 321, maxWidth: 350 } satisfies TextField,
  duration: { page: 1, x: 200, y: 297, maxWidth: 350 } satisfies TextField,
  uniformInfo: { page: 1, x: 200, y: 273, maxWidth: 350 } satisfies TextField,
  versement1: { page: 1, x: 200, y: 249, maxWidth: 350 } satisfies TextField,
  versement2: { page: 1, x: 200, y: 225, maxWidth: 350 } satisfies TextField,
  versement3: { page: 1, x: 200, y: 201, maxWidth: 350 } satisfies TextField,
  niveauEtude: { page: 1, x: 50, y: 577, maxWidth: 500 } satisfies TextField,
  engagementName: { page: 1, x: 70, y: 477, size: 9, maxWidth: 285 } satisfies TextField,
};

// Cases à cocher "Situation de famille" (page 1) — position estimée à
// gauche du libellé correspondant, sur la même ligne.
export const enrollmentFormFamilyStatusMarks: Record<string, CheckboxMark> = {
  maries: { page: 0, x: 164, y: 347 },
  vie_maritale: { page: 0, x: 226, y: 347 },
  veuf_veuve: { page: 0, x: 311, y: 347 },
  divorces: { page: 0, x: 398, y: 347 },
  separes: { page: 0, x: 468, y: 347 },
  celibataire: { page: 0, x: 536, y: 347 },
};

// Encadré "PHOTO" (page 1) — position estimée depuis le rendu visuel du
// gabarit ; ne déborde jamais sur les colonnes voisines (marge conservée de
// chaque côté).
export const enrollmentFormPhotoBox: PhotoBox = { page: 0, x: 469, y: 408, width: 85, height: 110 };
