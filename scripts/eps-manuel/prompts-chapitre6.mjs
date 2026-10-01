// Structured illustration definitions for Chapitre 6 — Athlétisme : courir,
// sauter et lancer. Each entry maps 1:1 to an "Illustration 6.N" already
// described (as a placeholder brief) in build-chapitre6.mjs. Fields
// derived directly from the existing brief — no new content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élèves d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour d'école haïtienne, sol en terre battue";

export const CHAPITRE = 6;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch06_ill01_trois_familles.png",
    legende: "Les trois grandes familles d'actions travaillées en athlétisme scolaire.",
    emplacement: "Ouverture du chapitre, présentation des trois familles",
    size: "1536x1024",
    fields: {
      sujet: "trois vignettes côte à côte étiquetées « Courir », « Sauter », « Lancer »",
      nombrePersonnes: "3 (un élève différent par vignette, ou le même répété)",
      age: AGE,
      environnement: COUR,
      action: "vignette 1 : élève qui court dans la cour ; vignette 2 : élève en phase d'impulsion pour un saut au-dessus d'une zone marquée au sol ; vignette 3 : élève qui lance un objet léger vers une cible",
      position: "postures dynamiques et sécuritaires propres à chaque action",
      materiel: "objet léger de lancer à la vignette 3",
      angle: "trois vignettes côte à côte de taille égale",
      composition: "étiquette de titre sous chaque vignette",
      securite: "gestes contrôlés, aucun risque visible",
      exclusions: "aucun texte hors des trois étiquettes de titre",
    },
  },
  {
    numero: 2,
    nomFichier: "ch06_ill02_course_rapide.png",
    legende: "Les étapes d'une course rapide : départ, accélération, course contrôlée, puis ralentissement après l'arrivée.",
    emplacement: "Après la présentation de la course rapide",
    size: "1536x1024",
    fields: {
      sujet: "bande de 4 vignettes numérotées montrant un même élève en course rapide",
      nombrePersonnes: "1 (le même élève répété dans les 4 vignettes)",
      age: AGE,
      environnement: COUR + ", ligne de départ et ligne d'arrivée tracées au sol",
      action: "1) position de départ derrière la ligne, prêt au signal ; 2) phase d'accélération, buste légèrement penché en avant ; 3) course contrôlée vers la ligne d'arrivée visible au loin ; 4) ralentissement progressif juste après avoir franchi la ligne",
      position: "postures de course cohérentes et progressives",
      materiel: "lignes tracées au sol",
      angle: "bande horizontale de 4 vignettes avec flèches entre elles",
      composition: "numérotation claire, progression visuelle logique",
      securite: "sans objet",
      exclusions: "aucun texte hors de la numérotation",
    },
  },
  {
    numero: 3,
    nomFichier: "ch06_ill03_relais.png",
    legende: "La zone de transmission d'un relais scolaire : communication et organisation entre partenaires.",
    emplacement: "Après la présentation du relais",
    size: "1536x1024",
    fields: {
      sujet: "scène de relais scolaire dans une zone de transmission",
      nombrePersonnes: "4 à 6",
      age: AGE,
      environnement: COUR,
      action: "deux élèves dans la zone de transmission, l'un tendant un témoin (ou objet pédagogique) à l'autre qui commence à courir ; d'autres élèves en attente, alignés derrière une ligne, observant la course",
      position: "ambiance organisée et coopérative",
      materiel: "un témoin ou objet pédagogique de relais",
      angle: "plan large montrant la zone de transmission et les élèves en attente",
      composition: "lisibilité claire du moment de transmission",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 4,
    nomFichier: "ch06_ill04_saut_longueur.png",
    legende: "Les phases du saut en longueur scolaire : approche, impulsion, réception sûre.",
    emplacement: "Après la présentation du saut en longueur",
    size: "1536x1024",
    fields: {
      sujet: "séquence de 3 vignettes montrant un même élève réalisant un saut en longueur scolaire",
      nombrePersonnes: "1 (le même élève répété dans les 3 vignettes)",
      age: AGE,
      environnement: COUR + ", zone d'impulsion marquée au sol, zone de réception en sable ou surface souple",
      action: "1) course d'approche courte vers la zone d'impulsion ; 2) impulsion, un pied au sol dans la zone identifiée, corps en phase de décollage ; 3) réception équilibrée, genoux légèrement fléchis, dans la zone de réception adaptée",
      position: "accent particulier sur la sécurité de la réception",
      materiel: "zone de réception en sable ou surface souple",
      angle: "bande de 3 vignettes",
      composition: "progression claire des trois phases",
      securite: "réception équilibrée et sécurisée mise en avant",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 5,
    nomFichier: "ch06_ill05_lancer_precision.png",
    legende: "Une zone de lancer de précision bien organisée : ligne de lancer, cible et zone interdite respectées.",
    emplacement: "Après la présentation du lancer de précision",
    size: "1536x1024",
    fields: {
      sujet: "scène de lancer de précision scolaire bien organisée",
      nombrePersonnes: "3 à 5 (un lanceur, quelques élèves en attente, l'enseignant)",
      age: AGE,
      environnement: COUR + ", ligne de lancer tracée au sol, cible simple à distance adaptée, zone interdite bien signalée",
      action: "élève en position de lancer avec un objet léger (petite balle souple) ; zone interdite devant la cible vide de toute personne ; enseignant supervisant depuis un endroit sûr",
      position: "posture de lancer contrôlée et sécuritaire",
      materiel: "petite balle souple, ligne de lancer, cible, marquage de zone interdite",
      angle: "vue permettant de distinguer clairement les zones (lancer, attente, interdite)",
      composition: "zones clairement séparées visuellement",
      securite: "aucune personne dans la zone interdite, geste de lancer contrôlé",
      exclusions: "aucun texte dans l'image, aucun objet de lancer dangereux",
    },
  },
  {
    numero: 6,
    nomFichier: "ch06_ill06_securite_athletisme.png",
    legende: "Quels éléments de sécurité peux-tu identifier dans cet espace d'athlétisme scolaire ?",
    emplacement: "Activité d'observation en fin de chapitre",
    size: "1536x1024",
    fields: {
      sujet: "vue d'ensemble d'un espace scolaire aménagé pour l'athlétisme, avec plusieurs éléments de sécurité à observer",
      nombrePersonnes: "6 à 8 (élèves en attente, enseignant)",
      age: AGE,
      environnement: COUR + ", ligne de départ et zone d'arrivée séparées, zone de réception de saut dégagée, zone de lancer avec ligne d'attente et zone interdite",
      action: "élèves attendant calmement à distance de sécurité, enseignant en position de supervision",
      position: "scène organisée, calme",
      materiel: "lignes, marquages de zones",
      angle: "vue d'ensemble large de l'espace",
      composition: "composition claire permettant de repérer chaque élément de sécurité",
      securite: "scène entièrement organisée et sécurisée",
      exclusions: "aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
