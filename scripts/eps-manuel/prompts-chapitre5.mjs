// Structured illustration definitions for Chapitre 5 — Initiation au
// basket-ball. Each entry maps 1:1 to an "Illustration 5.N" already
// described (as a placeholder brief) in build-chapitre5.mjs. Fields
// derived directly from the existing brief — no new content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élèves d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour ou terrain polyvalent d'école haïtienne";
const SCHEMA_STYLE = "schéma pédagogique de terrain, vue de dessus, traits nets, couleurs sobres, sans détails inutiles";

export const CHAPITRE = 5;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch05_ill01_terrain_basket.png",
    legende: "Les principales lignes et zones d'un terrain de basket-ball.",
    emplacement: "Après l'introduction du terrain de basket-ball",
    size: "1536x1024",
    fields: {
      sujet: "schéma vu du dessus d'un terrain de basket-ball simplifié, avec étiquettes claires (lignes de côté, lignes de fond, ligne médiane, cercle central, les deux paniers)",
      nombrePersonnes: "0",
      age: "n/a (schéma)",
      environnement: "vue de dessus du terrain, fond neutre",
      action: "sans objet — schéma statique",
      position: "sans objet",
      materiel: "lignes de terrain, deux paniers",
      angle: "vue aérienne complète du terrain",
      composition: SCHEMA_STYLE,
      securite: "sans objet",
      exclusions: "aucun texte hors des étiquettes de zones",
    },
  },
  {
    numero: 2,
    nomFichier: "ch05_ill02_position_base.png",
    legende: "Une position de base équilibrée : appuis stables, genoux fléchis, ballon contrôlé.",
    emplacement: "Après la présentation de la position de base",
    size: "1536x1024",
    fields: {
      sujet: "élève en position de base de basket-ball : appuis stables et légèrement écartés, genoux légèrement fléchis, ballon tenu à deux mains près du corps, regard vers l'avant",
      nombrePersonnes: "1",
      age: AGE,
      environnement: COUR,
      action: "position de base statique, ballon tenu à deux mains",
      position: "appuis stables légèrement écartés, genoux fléchis, regard vers l'avant",
      materiel: "un ballon de basket-ball",
      angle: "plan rapproché en pied, vue de trois quarts",
      composition: "posture de référence claire et lisible",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 3,
    nomFichier: "ch05_ill03_dribble.png",
    legende: "Le dribble en déplacement : contrôle du ballon et regard tourné vers l'espace de jeu.",
    emplacement: "Après la présentation du dribble",
    size: "1536x1024",
    fields: {
      sujet: "séquence de 2 à 3 vignettes montrant un élève qui dribble en se déplaçant vers l'avant",
      nombrePersonnes: "1 (le même élève répété dans les vignettes)",
      age: AGE,
      environnement: COUR,
      action: "ballon en contact avec le sol à chaque vignette, trajectoire représentée par une ligne pointillée au sol, regard orienté vers l'espace de jeu plutôt que vers le ballon",
      position: "posture dynamique de dribble, genoux fléchis",
      materiel: "un ballon de basket-ball",
      angle: "bande de 2-3 vignettes horizontales",
      composition: "cohérence visuelle entre les vignettes",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 4,
    nomFichier: "ch05_ill04_passe_reception.png",
    legende: "Une passe à deux mains bien réalisée, avec une réception préparée et amortie.",
    emplacement: "Après la présentation de la passe et de la réception",
    size: "1536x1024",
    fields: {
      sujet: "deux élèves face à face, à quelques mètres de distance, l'un réalisant une passe à deux mains depuis la poitrine, l'autre en position de réception",
      nombrePersonnes: "2",
      age: AGE,
      environnement: COUR,
      action: "élève 1 : passe à deux mains, ballon en l'air entre les deux ; élève 2 : bras légèrement fléchis, mains prêtes à accueillir le ballon",
      position: "postures de passe et de réception coordonnées",
      materiel: "un ballon de basket-ball",
      angle: "plan large montrant les deux élèves et la trajectoire du ballon",
      composition: "coordination visuelle claire entre le geste de passe et la posture de réception",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 5,
    nomFichier: "ch05_ill05_tir.png",
    legende: "Un tir simple proche du panier : équilibre, orientation vers la cible et accompagnement du geste.",
    emplacement: "Après la présentation du tir simple",
    size: "1536x1024",
    fields: {
      sujet: "séquence de 2 vignettes montrant un élève effectuant un tir simple proche du panier",
      nombrePersonnes: "1 (le même élève dans les 2 vignettes)",
      age: AGE,
      environnement: COUR + ", panier de basket-ball visible",
      action: "vignette 1 : position équilibrée, ballon tenu à deux mains devant soi, regard vers le panier ; vignette 2 : geste accompagné vers le panier, bras tendus vers la cible",
      position: "mouvement anatomiquement cohérent, sans exagération",
      materiel: "un ballon de basket-ball, un panier",
      angle: "2 vignettes côte à côte",
      composition: "technique simple et sécuritaire, adaptée à un débutant",
      securite: "geste contrôlé, sans exagération",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 6,
    nomFichier: "ch05_ill06_jeu_collectif.png",
    legende: "Un partenaire se démarque vers un espace libre pour se rendre disponible.",
    emplacement: "Après la présentation du démarquage et du jeu collectif",
    size: "1536x1024",
    fields: {
      sujet: "scène de petit jeu collectif de basket-ball adapté (par exemple 3 contre 3)",
      nombrePersonnes: "5 à 6",
      age: AGE,
      environnement: COUR,
      action: "un joueur avec le ballon cherchant un partenaire démarqué ; un partenaire déplacé vers un espace libre, main levée pour demander la balle ; un ou deux adversaires positionnés à distance raisonnable",
      position: "ambiance coopérative, aucun contact physique",
      materiel: "un ballon de basket-ball",
      angle: "plan large montrant l'ensemble du jeu réduit",
      composition: "lisibilité claire des rôles (porteur du ballon, partenaire démarqué, adversaires)",
      securite: "aucun contact entre joueurs",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 7,
    nomFichier: "ch05_ill07_observe_analyse.png",
    legende: "Quels comportements sont corrects ? Lesquels devraient être corrigés ?",
    emplacement: "Activité d'observation en fin de chapitre",
    size: "1536x1024",
    fields: {
      sujet: "scène de mini-basket coopératif avec deux situations à identifier côte à côte",
      nombrePersonnes: "4 à 6",
      age: AGE,
      environnement: COUR,
      action: "un élève qui partage le ballon en faisant une passe à un partenaire démarqué (comportement correct) ; un élève qui garde le ballon sans jamais le passer malgré des partenaires libres (erreur simple à identifier)",
      position: "comportements génériques et lisibles",
      materiel: "un ballon de basket-ball",
      angle: "plan large",
      composition: "style clair, situations facilement distinguables",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
