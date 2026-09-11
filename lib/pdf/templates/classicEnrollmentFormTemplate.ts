import type { CheckboxMark, PhotoBox, TextField } from "@/lib/pdf/officialFicheTemplate";

/**
 * Coordonnées estimées visuellement sur assets/fiches/ecole-classique.pdf
 * (gabarit sans calque texte — page entièrement composée en image), puis
 * calibrées par génération + relecture visuelle d'une fiche de test (voir
 * mandat "fiches d'inscription fidèles au modèle papier", 2026-09-11).
 * "De :" (page 1, sous le titre) n'a pas d'équivalent net dans
 * ClassicEnrollmentForm — jamais rempli plutôt qu'une donnée devinée.
 */
export const classicFicheFieldPositions = {
  ficheNumber: { page: 0, x: 485, y: 542, size: 7, maxWidth: 110 } satisfies TextField,
  registrationDateTop: { page: 0, x: 518, y: 530, size: 9 } satisfies TextField,
  registrationDate: { page: 0, x: 178, y: 471, size: 9, maxWidth: 150 } satisfies TextField,
  schoolLevel: { page: 0, x: 158, y: 447, maxWidth: 150 } satisfies TextField,
  className: { page: 0, x: 461, y: 447, maxWidth: 150 } satisfies TextField,
  previousSchool: { page: 0, x: 221, y: 423, maxWidth: 180 } satisfies TextField,
  adminCode: { page: 0, x: 523, y: 423, size: 9, maxWidth: 80 } satisfies TextField,

  lastName: { page: 0, x: 130, y: 355, maxWidth: 380 } satisfies TextField,
  firstName: { page: 0, x: 96, y: 335, maxWidth: 380 } satisfies TextField,
  birthPlaceCity: { page: 0, x: 206, y: 315, maxWidth: 300 } satisfies TextField,
  birthDate: { page: 0, x: 158, y: 295, maxWidth: 250 } satisfies TextField,
  birthPlaceDept: { page: 0, x: 110, y: 275, maxWidth: 300 } satisfies TextField,
  bloodType: { page: 0, x: 130, y: 230, maxWidth: 300 } satisfies TextField,
  religion: { page: 0, x: 86, y: 161, maxWidth: 400 } satisfies TextField,
  addressNumber: { page: 0, x: 120, y: 124, size: 9, maxWidth: 80 } satisfies TextField,
  addressStreet: { page: 0, x: 206, y: 124, maxWidth: 260 } satisfies TextField,
  addressCity: { page: 0, x: 103, y: 95, maxWidth: 140 } satisfies TextField,
  addressPostalCode: { page: 0, x: 283, y: 95, size: 9, maxWidth: 90 } satisfies TextField,
  addressZone: { page: 0, x: 384, y: 95, maxWidth: 150 } satisfies TextField,

  fatherName: { page: 1, x: 144, y: 539, maxWidth: 320 } satisfies TextField,
  fatherProfession: { page: 1, x: 125, y: 522, maxWidth: 340 } satisfies TextField,
  fatherOccupation: { page: 1, x: 158, y: 505, maxWidth: 300 } satisfies TextField,
  fatherEmail: { page: 1, x: 89, y: 489, maxWidth: 380 } satisfies TextField,
  fatherPhone: { page: 1, x: 110, y: 471, maxWidth: 380 } satisfies TextField,
  fatherNif: { page: 1, x: 72, y: 455, size: 9, maxWidth: 130 } satisfies TextField,
  fatherCin: { page: 1, x: 254, y: 455, size: 9, maxWidth: 130 } satisfies TextField,

  motherName: { page: 1, x: 432, y: 539, maxWidth: 320 } satisfies TextField,
  motherProfession: { page: 1, x: 413, y: 522, maxWidth: 340 } satisfies TextField,
  motherOccupation: { page: 1, x: 446, y: 505, maxWidth: 300 } satisfies TextField,
  motherEmail: { page: 1, x: 377, y: 489, maxWidth: 380 } satisfies TextField,
  motherPhone: { page: 1, x: 398, y: 471, maxWidth: 380 } satisfies TextField,
  motherNif: { page: 1, x: 360, y: 455, size: 9, maxWidth: 130 } satisfies TextField,
  motherCin: { page: 1, x: 542, y: 455, size: 9, maxWidth: 130 } satisfies TextField,

  medicationDetails: { page: 1, x: 398, y: 387, size: 8, maxWidth: 180 } satisfies TextField,

  engagementDate: { page: 1, x: 72, y: 101, size: 9, maxWidth: 200 } satisfies TextField,
};

export const classicFicheSexMarks: Record<string, CheckboxMark> = {
  masculin: { page: 0, x: 95, y: 246 },
  feminin: { page: 0, x: 169, y: 246 },
  autre: { page: 0, x: 248, y: 246 },
};

export const classicFicheLivesWithMarks: Record<string, CheckboxMark> = {
  parents: { page: 0, x: 143, y: 203 },
  pere: { page: 0, x: 269, y: 203 },
  mere: { page: 0, x: 349, y: 203 },
  tuteurs: { page: 0, x: 143, y: 179 },
};

export const classicFicheFamilyStatusMarks: Record<string, CheckboxMark> = {
  maries: { page: 1, x: 147, y: 579 },
  vie_maritale: { page: 1, x: 214, y: 579 },
  veuf_veuve: { page: 1, x: 305, y: 579 },
  divorces: { page: 1, x: 377, y: 579 },
  separes: { page: 1, x: 454, y: 579 },
  celibataire: { page: 1, x: 531, y: 579 },
};

export const classicFicheVaccinesMarks = {
  oui: { page: 1, x: 142, y: 422 } satisfies CheckboxMark,
  non: { page: 1, x: 195, y: 422 } satisfies CheckboxMark,
};

export const classicFicheMedicationMarks = {
  oui: { page: 1, x: 339, y: 402 } satisfies CheckboxMark,
  non: { page: 1, x: 387, y: 402 } satisfies CheckboxMark,
};

// Table "FRATRIE" (page 2) — 6 lignes numérotées déjà imprimées, seules les
// colonnes Prénom(s) / Année de naissance / École fréquentée sont remplies.
export const classicFicheSiblingRows: Array<{ prenom: TextField; annee: TextField; ecole: TextField }> = [
  { prenom: { page: 1, x: 110, y: 288, size: 9 }, annee: { page: 1, x: 288, y: 288, size: 9 }, ecole: { page: 1, x: 456, y: 288, size: 9 } },
  { prenom: { page: 1, x: 110, y: 268.8, size: 9 }, annee: { page: 1, x: 288, y: 268.8, size: 9 }, ecole: { page: 1, x: 456, y: 268.8, size: 9 } },
  { prenom: { page: 1, x: 110, y: 249.6, size: 9 }, annee: { page: 1, x: 288, y: 249.6, size: 9 }, ecole: { page: 1, x: 456, y: 249.6, size: 9 } },
  { prenom: { page: 1, x: 110, y: 230.4, size: 9 }, annee: { page: 1, x: 288, y: 230.4, size: 9 }, ecole: { page: 1, x: 456, y: 230.4, size: 9 } },
  { prenom: { page: 1, x: 110, y: 211.2, size: 9 }, annee: { page: 1, x: 288, y: 211.2, size: 9 }, ecole: { page: 1, x: 456, y: 211.2, size: 9 } },
  { prenom: { page: 1, x: 110, y: 192, size: 9 }, annee: { page: 1, x: 288, y: 192, size: 9 }, ecole: { page: 1, x: 456, y: 192, size: 9 } },
];

export const classicFichePhotoBox: PhotoBox = { page: 0, x: 495, y: 245, width: 85, height: 115 };
