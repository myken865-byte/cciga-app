// Structured illustration definitions for Chapitre 9 — Gymnastique :
// équilibre, coordination et maîtrise du corps. Each entry maps 1:1 to an
// illustration already described (as a placeholder brief, IDs
// ILL-7AF-C09-0N) in build-chapitre9.mjs. Fields derived directly from the
// existing brief — no new content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élèves d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour d'école haïtienne, sol en terre battue";

export const CHAPITRE = 9;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch09_ill01_appuis_equilibre.png",
    legende: "Plusieurs positions simples et stables : le contrôle et la stabilité comptent plus que la difficulté.",
    emplacement: "Après la présentation de l'appui et de l'équilibre",
    size: "1536x1024",
    fields: {
      sujet: "3 vignettes montrant des élèves dans des positions d'équilibre simples et stables",
      nombrePersonnes: "1 à 3 (un ou plusieurs élèves selon les vignettes) plus l'enseignant sur la vignette 3",
      age: AGE,
      environnement: COUR,
      action: "vignette 1 : élève debout sur deux pieds, bras légèrement écartés ; vignette 2 : élève en position accroupie stable ; vignette 3 : élève en équilibre sur un pied, bras écartés pour stabiliser, sous le regard de l'enseignant",
      position: "du plus simple (deux appuis) au plus avancé (un appui), toujours sous supervision",
      materiel: "aucun",
      angle: "3 vignettes côte à côte",
      composition: "progression de difficulté claire entre les vignettes",
      securite: "supervision de l'enseignant visible sur la vignette la plus avancée",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 2,
    nomFichier: "ch09_ill02_deplacements.png",
    legende: "Un petit parcours de déplacement avec changements de direction contrôlés.",
    emplacement: "Après la présentation des déplacements",
    size: "1536x1024",
    fields: {
      sujet: "petit parcours au sol matérialisé par des repères simples, avec un élève le suivant",
      nombrePersonnes: "1",
      age: AGE,
      environnement: COUR + ", repères simples au sol (cônes ou lignes tracées à la craie)",
      action: "une portion en marche avant, une portion en déplacement latéral, un changement de direction marqué par une flèche au sol",
      position: "déplacement contrôlé",
      materiel: "cônes ou lignes tracées à la craie",
      angle: "plan large montrant le parcours complet",
      composition: "trajectoire du parcours clairement lisible",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 3,
    nomFichier: "ch09_ill03_coordination.png",
    legende: "Une coordination simple entre le déplacement des jambes et le mouvement des bras.",
    emplacement: "Après la présentation de la coordination",
    size: "1536x1024",
    fields: {
      sujet: "séquence de 3 vignettes montrant un même élève associant un déplacement simple à un mouvement des bras",
      nombrePersonnes: "1 (le même élève répété dans les 3 vignettes)",
      age: AGE,
      environnement: COUR,
      action: "vignette 1 : position de départ, bras le long du corps ; vignette 2 : un pas en avant avec les bras qui se lèvent progressivement ; vignette 3 : position finale, bras levés, équilibre stable",
      position: "association progressive et accessible de mouvements",
      materiel: "aucun",
      angle: "bande de 3 vignettes",
      composition: "progression claire entre les vignettes",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 4,
    nomFichier: "ch09_ill04_petit_saut_reception.png",
    legende: "Un petit saut scolaire : départ stable, phase aérienne courte, réception équilibrée.",
    emplacement: "Après la présentation du petit saut",
    size: "1536x1024",
    fields: {
      sujet: "séquence de 3 vignettes montrant un élève réalisant un petit saut scolaire",
      nombrePersonnes: "1 (le même élève répété dans les 3 vignettes)",
      age: AGE,
      environnement: COUR,
      action: "vignette 1 : position de départ stable, genoux légèrement fléchis ; vignette 2 : courte phase aérienne, corps groupé de façon contrôlée ; vignette 3 : réception équilibrée au sol, genoux fléchis, bras aidant à stabiliser",
      position: "accent particulier sur la sécurité de la réception",
      materiel: "aucun",
      angle: "bande de 3 vignettes",
      composition: "les trois temps du saut clairement distincts",
      securite: "réception équilibrée mise en avant",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 5,
    nomFichier: "ch09_ill05_enchainement.png",
    legende: "Un enchaînement simple combinant plusieurs actions maîtrisées, du départ à la position finale.",
    emplacement: "Après la présentation de l'enchaînement simple",
    size: "1536x1024",
    fields: {
      sujet: "bande de 5 vignettes numérotées montrant un même élève réalisant un petit enchaînement",
      nombrePersonnes: "1 (le même élève répété dans les 5 vignettes)",
      age: AGE,
      environnement: COUR,
      action: "1) position de départ stable ; 2) un déplacement simple ; 3) un équilibre sur deux appuis ; 4) un mouvement coordonné des bras ; 5) une position finale stable",
      position: "enchaînement fluide de gestes déjà maîtrisés",
      materiel: "aucun",
      angle: "bande horizontale de 5 vignettes avec flèches entre elles",
      composition: "numérotation claire, ordre logique",
      securite: "sans objet",
      exclusions: "aucun texte hors de la numérotation",
    },
  },
  {
    numero: 6,
    nomFichier: "ch09_ill06_organisation_securisee.png",
    legende: "Une organisation sécurisée : élèves en attente, zone d'activité libre, enseignant en supervision.",
    emplacement: "Après la présentation de l'organisation sécurisée d'une séance",
    size: "1536x1024",
    fields: {
      sujet: "scène de gymnastique scolaire bien organisée",
      nombrePersonnes: "5 à 7 (élèves en file plus enseignant)",
      age: AGE,
      environnement: COUR,
      action: "plusieurs élèves en file, attendant calmement leur tour à distance de sécurité ; un élève réalisant son passage dans une zone d'activité clairement libre et dégagée ; l'enseignant en position de supervision, observant l'ensemble",
      position: "scène calme et organisée",
      materiel: "aucun",
      angle: "plan large montrant l'ensemble de l'organisation",
      composition: "zones et rôles clairement identifiables",
      securite: "organisation exemplaire mise en avant",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 7,
    nomFichier: "ch09_ill07_observe_analyse.png",
    legende: "Quelle situation est bien organisée ? Quelles erreurs de sécurité peux-tu identifier dans l'autre ?",
    emplacement: "Activité d'observation en fin de chapitre",
    size: "1536x1024",
    fields: {
      sujet: "image en deux parties côte à côte comparant une situation bien organisée et une situation avec des erreurs de sécurité",
      nombrePersonnes: "3 à 5 de chaque côté",
      age: AGE,
      environnement: COUR,
      action: "à gauche : élève en équilibre stable, zone libre, camarades en attente à distance de sécurité ; à droite, dans un espace similaire : un élève trop proche de celui qui réalise l'exercice, une zone de réception encombrée par du matériel mal rangé",
      position: "comparaison claire entre les deux situations",
      materiel: "matériel mal rangé côté droit",
      angle: "composition en deux parties égales, séparées par une ligne",
      composition: "même style visuel des deux côtés pour faciliter la comparaison",
      securite: "aucune blessure représentée",
      exclusions: "aucune blessure représentée, aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
