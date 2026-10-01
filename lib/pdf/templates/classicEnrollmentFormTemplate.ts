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
  // ficheNumber : y recalibré (2026-09-16) — mesuré 542 traversait la ligne
  // imprimée (baseline confirmée à 300 DPI sur une fiche réelle générée) ;
  // 550 reproduit le même dégagement au-dessus de la ligne que
  // registrationDateTop (déjà correct) sur la même rangée.
  ficheNumber: { page: 0, x: 485, y: 550, size: 7, maxWidth: 110 } satisfies TextField,
  registrationDateTop: { page: 0, x: 518, y: 530, size: 9 } satisfies TextField,
  registrationDate: { page: 0, x: 178, y: 471, size: 9, maxWidth: 150 } satisfies TextField,
  schoolLevel: { page: 0, x: 158, y: 447, maxWidth: 150 } satisfies TextField,
  className: { page: 0, x: 461, y: 447, maxWidth: 150 } satisfies TextField,
  previousSchool: { page: 0, x: 221, y: 423, maxWidth: 180 } satisfies TextField,
  adminCode: { page: 0, x: 523, y: 423, size: 9, maxWidth: 80 } satisfies TextField,

  // lastName/birthPlaceCity : maxWidth RECALIBRÉ (2026-09-16, 2e passe, test
  // "données longues") — la photo d'identité (classicFichePhotoBox, x=495)
  // est dessinée APRÈS le texte (voir fillOfficialFiche) : un maxWidth trop
  // généreux laisse un nom/lieu long s'étendre jusque SOUS la photo, où il
  // est ensuite invisible (recouvert). Plafonné à 485 (495 - 10pt marge)
  // moins x, pour ne jamais atteindre la photo.
  lastName: { page: 0, x: 130, y: 355, maxWidth: 355 } satisfies TextField,
  firstName: { page: 0, x: 96, y: 335, maxWidth: 380 } satisfies TextField,
  birthPlaceCity: { page: 0, x: 206, y: 315, maxWidth: 275 } satisfies TextField,
  birthDate: { page: 0, x: 158, y: 295, maxWidth: 250 } satisfies TextField,
  // birthPlaceDept : x recalibré (2026-09-16, 2e passe) — 110 collait "Ouest"
  // directement contre les deux-points imprimés (confirmé par crop 300 DPI) ;
  // 130 reproduit le même dégagement horizontal que les autres champs.
  birthPlaceDept: { page: 0, x: 130, y: 275, maxWidth: 300 } satisfies TextField,
  bloodType: { page: 0, x: 130, y: 230, maxWidth: 300 } satisfies TextField,
  // religion : x recalibré (2026-09-16, 2e passe) — 86 collait la valeur
  // contre les deux-points ("Religion :Protestante", confirmé par crop 300
  // DPI) ; 106 reproduit le dégagement horizontal des champs voisins.
  religion: { page: 0, x: 106, y: 161, maxWidth: 380 } satisfies TextField,
  // addressNumber/addressStreet : y recalibré (2026-09-16) — 124 traversait
  // la ligne "Adresse" (confirmé visuellement sur fiche réelle) ; 132
  // reproduit le même dégagement que les autres lignes correctement
  // alignées de la fiche.
  addressNumber: { page: 0, x: 120, y: 132, size: 9, maxWidth: 80 } satisfies TextField,
  addressStreet: { page: 0, x: 206, y: 132, maxWidth: 260 } satisfies TextField,
  // addressCity/addressPostalCode/addressZone : y recalibré (2026-09-16, 2e
  // passe) — 95 posait la baseline QUASIMENT SUR la ligne "Ville/Code Postal/
  // Zone" (effet de texte barré confirmé par crop 300 DPI) ; 102 reproduit le
  // même dégagement que la ligne "Adresse" juste au-dessus (132 vs 124 avant
  // correction, soit +8, cohérent avec le delta appliqué ici).
  // addressCity : maxWidth RECALIBRÉ (2026-09-16, 3e passe, test "données
  // longues") — 140 PUIS 110 laissaient encore une ville longue ("Delmas 75,
  // Port-au-Prince") chevaucher le libellé imprimé "Code Postal" (confirmé
  // par crop 300 DPI à chaque passe) — le libellé démarre réellement vers
  // x≈192, pas ~240 comme estimé la fois précédente. 75 s'arrête net avant.
  addressCity: { page: 0, x: 103, y: 102, maxWidth: 75 } satisfies TextField,
  addressPostalCode: { page: 0, x: 283, y: 102, size: 9, maxWidth: 90 } satisfies TextField,
  addressZone: { page: 0, x: 384, y: 102, maxWidth: 150 } satisfies TextField,

  // Section 3 (Père/Mère) : maxWidth RECALIBRÉ (2026-09-16, 2e passe, test
  // "données longues") — les valeurs précédentes (jusqu'à 380pt) ignoraient
  // la largeur RÉELLE disponible : la colonne Père se termine sur la ligne
  // verticale de séparation Père/Mère mesurée à ~305pt (pas 464-509pt comme
  // l'ancien maxWidth le permettait), et la colonne Mère se termine sur la
  // marge droite imprimée mesurée à ~590pt. Avec des données courtes
  // (fiche témoin initiale) ces débordements ne se voyaient jamais — un nom
  // long (ex. "Jean-Baptiste-Alexandre Ferdinand Duverneau-Pierre") ou une
  // profession longue traversait littéralement la colonne voisine, ou pour
  // Mère sortait carrément de la page. Confirmé par crop 300 DPI puis
  // corrigé pour chaque champ selon sa position x réelle jusqu'à cette
  // limite, avec ~5-8pt de marge de sécurité.
  fatherName: { page: 1, x: 144, y: 539, maxWidth: 153 } satisfies TextField,
  fatherProfession: { page: 1, x: 125, y: 522, maxWidth: 172 } satisfies TextField,
  fatherOccupation: { page: 1, x: 158, y: 505, maxWidth: 139 } satisfies TextField,
  fatherEmail: { page: 1, x: 89, y: 489, maxWidth: 208 } satisfies TextField,
  fatherPhone: { page: 1, x: 110, y: 471, maxWidth: 187 } satisfies TextField,
  fatherNif: { page: 1, x: 72, y: 455, size: 9, maxWidth: 130 } satisfies TextField,
  fatherCin: { page: 1, x: 254, y: 455, size: 9, maxWidth: 45 } satisfies TextField,

  motherName: { page: 1, x: 432, y: 539, maxWidth: 153 } satisfies TextField,
  motherProfession: { page: 1, x: 413, y: 522, maxWidth: 172 } satisfies TextField,
  motherOccupation: { page: 1, x: 446, y: 505, maxWidth: 139 } satisfies TextField,
  motherEmail: { page: 1, x: 377, y: 489, maxWidth: 208 } satisfies TextField,
  motherPhone: { page: 1, x: 398, y: 471, maxWidth: 187 } satisfies TextField,
  motherNif: { page: 1, x: 360, y: 455, size: 9, maxWidth: 150 } satisfies TextField,
  motherCin: { page: 1, x: 542, y: 455, size: 9, maxWidth: 45 } satisfies TextField,

  medicationDetails: { page: 1, x: 398, y: 387, size: 8, maxWidth: 180 } satisfies TextField,

  engagementDate: { page: 1, x: 72, y: 101, size: 9, maxWidth: 200 } satisfies TextField,
};

// Toutes les coordonnées de cases ci-dessous ont été RECALIBRÉES le
// 2026-09-16 par détection automatique des bordures réellement imprimées
// (analyse pixel à 300 DPI d'une fiche réelle générée, jamais une nouvelle
// estimation à l'œil) — les anciennes valeurs plaçaient la coche visiblement
// hors-case sur plusieurs champs (mandat "alignement définitif des fiches").
export const classicFicheSexMarks: Record<string, CheckboxMark> = {
  masculin: { page: 0, x: 89, y: 253 },
  feminin: { page: 0, x: 165, y: 253 },
  autre: { page: 0, x: 242, y: 253 },
};

export const classicFicheLivesWithMarks: Record<string, CheckboxMark> = {
  parents: { page: 0, x: 140, y: 206 },
  pere: { page: 0, x: 253, y: 206 },
  mere: { page: 0, x: 351, y: 206 },
  tuteurs: { page: 0, x: 140, y: 185 },
};

export const classicFicheFamilyStatusMarks: Record<string, CheckboxMark> = {
  maries: { page: 1, x: 150, y: 583 },
  vie_maritale: { page: 1, x: 216, y: 583 },
  veuf_veuve: { page: 1, x: 306, y: 583 },
  divorces: { page: 1, x: 383, y: 583 },
  separes: { page: 1, x: 454, y: 583 },
  celibataire: { page: 1, x: 526, y: 583 },
};

export const classicFicheVaccinesMarks = {
  oui: { page: 1, x: 107, y: 426 } satisfies CheckboxMark,
  non: { page: 1, x: 161, y: 426 } satisfies CheckboxMark,
};

export const classicFicheMedicationMarks = {
  oui: { page: 1, x: 301, y: 406 } satisfies CheckboxMark,
  non: { page: 1, x: 360, y: 406 } satisfies CheckboxMark,
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
