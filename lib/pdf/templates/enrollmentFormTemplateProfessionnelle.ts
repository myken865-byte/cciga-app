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
 *
 * CORRECTION (2026-09-16, mandat "alignement définitif des fiches") :
 * confirmé sur une fiche réelle générée — 4 valeurs traversaient leur ligne
 * (birthDateAndPlace, sex, fatherName, motherName, +5pt, seules celles-ci :
 * une première passe à +6.5pt PARTOUT a été testée puis rejetée, "Nom"
 * étant juste sous le bandeau "ÉTAT CIVIL", elle poussait sa valeur dans le
 * bandeau) ET plusieurs valeurs chevauchaient la fin de leur propre
 * libellé, plus long que prévu (address, phone, emergencyContactName/Phone
 * — x augmenté pour dégager le libellé, mesuré visuellement).
 *
 * CORRECTION (2026-09-16, 2e passe, "alignement définitif") : cette
 * première passe n'avait pas suffi — confirmé par crop 300 DPI sur une
 * fiche réelle : lastName/firstName/birthDateAndPlace/sex/cin/address/
 * phone collaient ENCORE contre leur libellé (x augmenté à nouveau) ; et
 * surtout emergencyContactName/Phone/Email se dessinaient CHACUN UNE LIGNE
 * TROP HAUT — "Ernst Joseph (pere)" (le nom du contact) apparaissait
 * superposé au TITRE "Personne à contacter en cas de nécessité :" au lieu
 * de sa propre ligne "Nom et prénom :", décalant les 3 valeurs d'un cran
 * (le téléphone sur la ligne "Nom et prénom", l'email sur la ligne
 * "Téléphone", et "Adresse électronique" restait vide). Les 3 y ont été
 * descendus d'une ligne complète (-20, même pas que address→phone→email
 * juste au-dessus, déjà correct).
 */
export const enrollmentFormProFieldPositions = {
  // ficheNumber : size réduite à 7 + maxWidth ajouté (2026-09-17, "reprise
  // fiches d'inscription") — le vrai format (CCIGA-FI-XXXXXXXXXX, voir
  // lib/enrollmentFormReference.ts) mesure ~92pt à la taille par défaut
  // (9pt) mais cette zone de la fiche ne laisse que ~85pt avant la bordure
  // de page : sans cette correction, la référence RÉELLE (pas seulement un
  // exemple de test) se faisait tronquer, jamais juste débordait.
  ficheNumber: { page: 0, x: 523, y: 636, size: 7, maxWidth: 85 } satisfies TextField,
  registrationDate: { page: 0, x: 518, y: 614, size: 9 } satisfies TextField,
  formation: { page: 0, x: 130, y: 596, maxWidth: 400 } satisfies TextField,
  lastName: { page: 0, x: 85, y: 538, maxWidth: 380 } satisfies TextField,
  firstName: { page: 0, x: 100, y: 517, maxWidth: 380 } satisfies TextField,
  // birthDateAndPlace/sex/fatherName/motherName : RECALIBRÉES (2026-09-17,
  // "reprise fiches d'inscription") — mesurées avec une règle de référence
  // dessinée directement sur le gabarit réel (lignes rouges tous les 5pt via
  // pdf-lib, comparées à la position exacte des lignes imprimées), pas à
  // l'œil. Deux passes précédentes (2026-09-16) avaient laissé birthDateAndPlace
  // sur la ligne "Prénom(s)" (une ligne trop haut) et fatherName/motherName
  // quasiment SUR leur propre ligne imprimée (texte barré), confirmé par
  // crop 300/400 DPI. Ligne "Date de naissance" mesurée à y≈483, "Sexe" à
  // y≈448 (correcte, inchangée), "Nom du père" à y≈440, "Nom de la mère" à
  // y≈420 — chaque valeur posée à +8pt au-dessus de sa ligne réelle.
  birthDateAndPlace: { page: 0, x: 128, y: 497, maxWidth: 360 } satisfies TextField,
  sex: { page: 0, x: 113, y: 453, maxWidth: 330 } satisfies TextField,
  fatherName: { page: 0, x: 145, y: 444, maxWidth: 305 } satisfies TextField,
  fatherPhone: { page: 0, x: 470, y: 444, size: 9, maxWidth: 90 } satisfies TextField,
  motherName: { page: 0, x: 148, y: 426, maxWidth: 282 } satisfies TextField,
  motherPhone: { page: 0, x: 470, y: 426, size: 9, maxWidth: 90 } satisfies TextField,
  cin: { page: 0, x: 85, y: 374, maxWidth: 127 } satisfies TextField,
  cinIssuedDate: { page: 0, x: 307, y: 374, maxWidth: 130 } satisfies TextField,
  address: { page: 0, x: 195, y: 351, maxWidth: 339 } satisfies TextField,
  phone: { page: 0, x: 135, y: 331, maxWidth: 351 } satisfies TextField,
  email: { page: 0, x: 230, y: 311, maxWidth: 350 } satisfies TextField,
  emergencyContactName: { page: 0, x: 160, y: 249, maxWidth: 350 } satisfies TextField,
  emergencyContactPhone: { page: 0, x: 135, y: 230, maxWidth: 351 } satisfies TextField,
  emergencyContactEmail: { page: 0, x: 172, y: 210, maxWidth: 362 } satisfies TextField,

  option: { page: 1, x: 202, y: 401, maxWidth: 350 } satisfies TextField,
  inscriptionInfo: { page: 1, x: 202, y: 372, maxWidth: 350 } satisfies TextField,
  duration: { page: 1, x: 202, y: 345, maxWidth: 350 } satisfies TextField,
  uniformInfo: { page: 1, x: 202, y: 316, maxWidth: 350 } satisfies TextField,
  versement1: { page: 1, x: 202, y: 287, maxWidth: 350 } satisfies TextField,
  versement2: { page: 1, x: 202, y: 258, maxWidth: 350 } satisfies TextField,
  versement3: { page: 1, x: 202, y: 230, maxWidth: 350 } satisfies TextField,
  // niveauEtude : y recalibré (2026-09-16, 2e passe) — 586 posait la
  // baseline SUR la ligne imprimée (effet de texte barré confirmé par crop
  // 300 DPI) ; 598 dégage la ligne (ce gabarit a sa propre ligne, à une
  // hauteur différente du gabarit Université malgré la mise en page proche).
  niveauEtude: { page: 1, x: 50, y: 598, maxWidth: 500 } satisfies TextField,
  engagementName: { page: 1, x: 140, y: 516, size: 9, maxWidth: 240 } satisfies TextField,
};

export const enrollmentFormProFamilyStatusMarks: Record<string, CheckboxMark> = {
  maries: { page: 0, x: 160, y: 400 },
  vie_maritale: { page: 0, x: 213, y: 400 },
  veuf_veuve: { page: 0, x: 292, y: 400 },
  divorces: { page: 0, x: 386, y: 400 },
  separes: { page: 0, x: 458, y: 400 },
  celibataire: { page: 0, x: 528, y: 400 },
};

export const enrollmentFormProPhotoBox: PhotoBox = { page: 0, x: 480, y: 461, width: 85, height: 90 };
