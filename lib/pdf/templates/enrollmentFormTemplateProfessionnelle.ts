import type { CheckboxMark, PhotoBox, TextField } from "@/lib/pdf/officialFicheTemplate";

/**
 * Coordonnées propres à assets/fiches/ecole-professionnelle.pdf — mesurées
 * visuellement (ce gabarit est une image composée, sans calque texte, voir
 * `pdftotext` "no word list"). Ne PAS réutiliser les coordonnées de
 * enrollmentFormTemplate.ts (Université) : bien que les deux gabarits se
 * ressemblent visuellement, leur mise en page réelle diverge suffisamment
 * (marges/espacement internes différents) pour que les coordonnées de l'un
 * produisent un rendu totalement décalé sur l'autre — confirmé par test réel
 * (2026-09-11).
 */
export const enrollmentFormProFieldPositions = {
  ficheNumber: { page: 0, x: 523, y: 636, size: 9 } satisfies TextField,
  registrationDate: { page: 0, x: 518, y: 614, size: 9 } satisfies TextField,
  formation: { page: 0, x: 130, y: 596, maxWidth: 400 } satisfies TextField,
  lastName: { page: 0, x: 67, y: 538, maxWidth: 400 } satisfies TextField,
  firstName: { page: 0, x: 84, y: 517, maxWidth: 400 } satisfies TextField,
  birthDateAndPlace: { page: 0, x: 110, y: 497, maxWidth: 380 } satisfies TextField,
  sex: { page: 0, x: 67, y: 458, maxWidth: 380 } satisfies TextField,
  fatherName: { page: 0, x: 110, y: 440, maxWidth: 340 } satisfies TextField,
  fatherPhone: { page: 0, x: 470, y: 440, size: 9, maxWidth: 90 } satisfies TextField,
  motherName: { page: 0, x: 110, y: 421, maxWidth: 320 } satisfies TextField,
  motherPhone: { page: 0, x: 470, y: 421, size: 9, maxWidth: 90 } satisfies TextField,
  cin: { page: 0, x: 67, y: 374, maxWidth: 145 } satisfies TextField,
  cinIssuedDate: { page: 0, x: 307, y: 374, maxWidth: 130 } satisfies TextField,
  address: { page: 0, x: 134, y: 351, maxWidth: 400 } satisfies TextField,
  phone: { page: 0, x: 86, y: 331, maxWidth: 400 } satisfies TextField,
  email: { page: 0, x: 230, y: 311, maxWidth: 350 } satisfies TextField,
  emergencyContactName: { page: 0, x: 110, y: 269, maxWidth: 400 } satisfies TextField,
  emergencyContactPhone: { page: 0, x: 86, y: 250, maxWidth: 400 } satisfies TextField,
  emergencyContactEmail: { page: 0, x: 134, y: 230, maxWidth: 400 } satisfies TextField,

  option: { page: 1, x: 202, y: 401, maxWidth: 350 } satisfies TextField,
  inscriptionInfo: { page: 1, x: 202, y: 372, maxWidth: 350 } satisfies TextField,
  duration: { page: 1, x: 202, y: 345, maxWidth: 350 } satisfies TextField,
  uniformInfo: { page: 1, x: 202, y: 316, maxWidth: 350 } satisfies TextField,
  versement1: { page: 1, x: 202, y: 287, maxWidth: 350 } satisfies TextField,
  versement2: { page: 1, x: 202, y: 258, maxWidth: 350 } satisfies TextField,
  versement3: { page: 1, x: 202, y: 230, maxWidth: 350 } satisfies TextField,
  niveauEtude: { page: 1, x: 50, y: 586, maxWidth: 500 } satisfies TextField,
  engagementName: { page: 1, x: 140, y: 516, size: 9, maxWidth: 240 } satisfies TextField,
};

export const enrollmentFormProFamilyStatusMarks: Record<string, CheckboxMark> = {
  maries: { page: 0, x: 182, y: 396 },
  vie_maritale: { page: 0, x: 235, y: 396 },
  veuf_veuve: { page: 0, x: 314, y: 396 },
  divorces: { page: 0, x: 408, y: 396 },
  separes: { page: 0, x: 480, y: 396 },
  celibataire: { page: 0, x: 550, y: 396 },
};

export const enrollmentFormProPhotoBox: PhotoBox = { page: 0, x: 480, y: 461, width: 85, height: 90 };
