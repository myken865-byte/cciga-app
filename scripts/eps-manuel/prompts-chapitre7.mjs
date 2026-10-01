// Structured illustration definitions for Chapitre 7 — Football scolaire.
// Each entry maps 1:1 to an illustration already described (as a
// placeholder brief, IDs ILL-7AF-C07-0N) in build-chapitre7.mjs. Fields
// derived directly from the existing brief — no new content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élèves d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour ou terrain polyvalent d'école haïtienne";
const SCHEMA_STYLE = "schéma pédagogique de terrain, vue de dessus, traits nets, couleurs sobres, sans détails inutiles";

export const CHAPITRE = 7;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch07_ill01_terrain_football.png",
    legende: "Les principales lignes et zones d'un terrain de football scolaire.",
    emplacement: "Après l'introduction du terrain de football",
    size: "1536x1024",
    fields: {
      sujet: "schéma vu du dessus d'un terrain de football simplifié, avec étiquettes claires (lignes de touche, lignes de but, ligne médiane, cercle central, les deux buts)",
      nombrePersonnes: "0",
      age: "n/a (schéma)",
      environnement: "vue de dessus du terrain, fond neutre",
      action: "sans objet — schéma statique",
      position: "sans objet",
      materiel: "lignes de terrain, deux buts",
      angle: "vue aérienne complète du terrain",
      composition: SCHEMA_STYLE,
      securite: "sans objet",
      exclusions: "aucun texte hors des étiquettes de zones",
    },
  },
  {
    numero: 2,
    nomFichier: "ch07_ill02_conduite_ballon.png",
    legende: "Une conduite de balle contrôlée, avec le regard tourné vers l'espace de jeu.",
    emplacement: "Après la présentation de la conduite du ballon",
    size: "1536x1024",
    fields: {
      sujet: "élève en train de conduire un ballon de football avec de petites touches",
      nombrePersonnes: "1",
      age: AGE,
      environnement: COUR,
      action: "conduite du ballon avec petites touches successives, trajectoire représentée par une ligne pointillée au sol",
      position: "regard légèrement relevé vers l'espace de jeu plutôt que fixé sur le ballon",
      materiel: "un ballon de football",
      angle: "plan rapproché en pied, vue de trois quarts",
      composition: "lisibilité claire du geste de conduite",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 3,
    nomFichier: "ch07_ill03_controle_passe.png",
    legende: "Un contrôle du ballon suivi d'une passe simple entre deux partenaires.",
    emplacement: "Après la présentation du contrôle et de la passe",
    size: "1536x1024",
    fields: {
      sujet: "deux élèves, l'un réceptionnant un ballon au sol (contrôle), l'autre réalisant une passe simple du pied",
      nombrePersonnes: "2",
      age: AGE,
      environnement: COUR,
      action: "élève 1 : contrôle du ballon, genoux légèrement fléchis, pied prêt à amortir le contact ; élève 2, quelques mètres plus loin : passe simple du pied vers élève 1, ballon représenté en mouvement entre les deux",
      position: "enchaînement contrôle-passe lisible",
      materiel: "un ballon de football",
      angle: "plan large montrant les deux élèves et la trajectoire du ballon",
      composition: "coordination visuelle claire entre réception et transmission",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 4,
    nomFichier: "ch07_ill04_tir_but.png",
    legende: "Un tir simple vers le but : équilibre, orientation vers la cible et précision du geste.",
    emplacement: "Après la présentation du tir au but",
    size: "1536x1024",
    fields: {
      sujet: "séquence de 2 vignettes montrant un élève effectuant un tir simple vers le but",
      nombrePersonnes: "1 (le même élève dans les 2 vignettes)",
      age: AGE,
      environnement: COUR + ", but visible",
      action: "vignette 1 : pied d'appui placé à côté du ballon, regard orienté vers le but ; vignette 2 : geste de frappe accompagné vers le but",
      position: "mouvement anatomiquement cohérent, sans exagération",
      materiel: "un ballon de football, un but",
      angle: "2 vignettes côte à côte",
      composition: "technique simple et sécuritaire, adaptée à un débutant",
      securite: "geste contrôlé, sans exagération",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 5,
    nomFichier: "ch07_ill05_demarquage.png",
    legende: "Des partenaires se démarquent vers des espaces libres pour se rendre disponibles.",
    emplacement: "Après la présentation du démarquage",
    size: "1536x1024",
    fields: {
      sujet: "scène de jeu réduit avec un joueur en possession du ballon cherchant une solution de passe",
      nombrePersonnes: "4 à 5",
      age: AGE,
      environnement: COUR,
      action: "un ou deux partenaires se déplacent vers des espaces libres en s'éloignant d'un adversaire, la main ou le regard indiquant leur disponibilité",
      position: "ambiance coopérative, aucun contact",
      materiel: "un ballon de football",
      angle: "plan large montrant l'ensemble de la situation",
      composition: "lisibilité claire des déplacements de démarquage",
      securite: "aucun contact entre joueurs",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 6,
    nomFichier: "ch07_ill06_attaque_defense.png",
    legende: "Une situation de jeu où l'on peut identifier les attaquants, les défenseurs et les espaces occupés.",
    emplacement: "Après la présentation de l'attaque et de la défense",
    size: "1536x1024",
    fields: {
      sujet: "situation de jeu réduit (par exemple 3 contre 3) montrant clairement une équipe en attaque face à une équipe en défense",
      nombrePersonnes: "6",
      age: AGE,
      environnement: COUR,
      action: "équipe en attaque : joueur avec ballon progressant vers le but adverse, partenaires occupant des espaces ; équipe en défense : joueurs positionnés pour protéger leur but et gêner la progression, sans contact violent",
      position: "rôles d'attaque et de défense visuellement distincts",
      materiel: "un ballon de football, un but",
      angle: "plan large montrant les deux équipes et les espaces occupés",
      composition: "lisibilité claire des rôles et positions",
      securite: "aucun contact violent entre joueurs",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 7,
    nomFichier: "ch07_ill07_securite_fairplay.png",
    legende: "Quels comportements sont corrects ? Lesquels devraient être corrigés ?",
    emplacement: "Activité d'observation en fin de chapitre",
    size: "1536x1024",
    fields: {
      sujet: "scène de mini-football scolaire avec deux situations à identifier",
      nombrePersonnes: "4 à 5",
      age: AGE,
      environnement: COUR,
      action: "un élève qui aide un camarade à se relever après une chute légère (comportement correct) ; un élève qui pousse volontairement un adversaire pour récupérer le ballon (comportement à corriger)",
      position: "comportements génériques et lisibles",
      materiel: "un ballon de football",
      angle: "plan large",
      composition: "style clair, situations facilement distinguables",
      securite: "sans contact violent ni blessure représentée",
      exclusions: "aucun texte dans l'image, aucune scène de blessure",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
