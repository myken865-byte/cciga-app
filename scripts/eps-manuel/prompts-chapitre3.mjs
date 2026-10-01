// Structured illustration definitions for Chapitre 3 — Santé, hygiène,
// hydratation et récupération. Each entry maps 1:1 to an "Illustration
// 3.N" already described (as a placeholder brief) in the canonical
// Chapitre 3 docx. Fields derived directly from the existing brief —
// no new pedagogical content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élève d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour d'école haïtienne, sol en terre battue";
const SCHEMA_STYLE = "schéma pédagogique en étapes reliées par des flèches, icônes simples, style scolaire clair";

export const CHAPITRE = 3;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch03_ill01_bonnes_habitudes.png",
    legende: "Bonnes habitudes autour d'une séance d'EPS.",
    emplacement: "Après l'introduction des bonnes habitudes d'hygiène, de tenue et d'hydratation",
    size: "1536x1024",
    fields: {
      sujet: "élève en tenue de sport propre et adaptée, se lavant les mains à un point d'eau simple, avec une petite bouteille d'eau personnelle à la main",
      nombrePersonnes: "1",
      age: AGE,
      environnement: COUR + ", point d'eau simple (seau, robinet extérieur ou pichet)",
      action: "l'élève se lave les mains à un point d'eau simple, bouteille d'eau personnelle à portée de main",
      position: "posture naturelle, penché légèrement vers le point d'eau",
      materiel: "bouteille d'eau personnelle, point d'eau simple (seau/robinet/pichet)",
      angle: "plan rapproché sur la scène d'hygiène",
      composition: "ambiance simple et réaliste, cohérente avec une école haïtienne disposant de peu de matériel",
      securite: "sans objet, scène calme et positive",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 2,
    nomFichier: "ch03_ill02_schema_hydratation.png",
    legende: "Schéma : activité physique → transpiration → besoin d'eau → hydratation.",
    emplacement: "Après la présentation du besoin d'hydratation pendant l'effort",
    size: "1536x1024",
    fields: {
      sujet: "schéma en quatre étapes reliées par des flèches : 1) élève en train de courir/jouer (activité physique) ; 2) même élève avec gouttes de sueur visibles (transpiration) ; 3) goutte d'eau ou verre vide (besoin d'eau) ; 4) élève buvant de l'eau (hydratation)",
      nombrePersonnes: "1 (le même élève répété dans les 4 étapes)",
      age: AGE,
      environnement: COUR,
      action: "voir les 4 étapes décrites dans le sujet",
      position: "postures naturelles à chaque étape",
      materiel: "bouteille ou verre d'eau à l'étape 4",
      angle: "bande horizontale de 4 vignettes/icônes numérotées, séparées par des flèches",
      composition: SCHEMA_STYLE,
      securite: "sans objet",
      exclusions: "pas de texte autre que la numérotation des étapes",
    },
  },
  {
    numero: 3,
    nomFichier: "ch03_ill03_alimentation_variee.png",
    legende: "Alimentation variée avec des aliments familiers du contexte haïtien.",
    emplacement: "Après la présentation de l'alimentation variée et équilibrée",
    size: "1536x1024",
    fields: {
      sujet: "assiette simple et appétissante, vue de dessus, contenant des aliments variés et familiers en Haïti : riz, haricots (pois), un morceau de poisson ou de viande, légumes verts, et un fruit local (mangue ou orange) posé à côté",
      nombrePersonnes: "0 — aucune représentation de personnage ni de silhouette corporelle",
      age: "n/a",
      environnement: "table ou surface neutre, vue de dessus de l'assiette",
      action: "sans objet — nature morte alimentaire",
      position: "sans objet",
      materiel: "assiette, riz, haricots, poisson ou viande, légumes verts, fruit local",
      angle: "vue de dessus (plongée totale), cadrage centré sur l'assiette",
      composition: "présentation neutre et non comparative, appétissante mais sobre",
      securite: "sans objet",
      exclusions: "aucun personnage, aucune silhouette corporelle, aucun message de régime ou de restriction, aucun texte dans l'image",
    },
  },
  {
    numero: 4,
    nomFichier: "ch03_ill04_schema_recuperation.png",
    legende: "Schéma : activité → retour au calme → hydratation → repos → récupération.",
    emplacement: "Après la présentation des gestes de récupération",
    size: "1536x1024",
    fields: {
      sujet: "schéma en cinq étapes reliées par des flèches, icône simple pour chacune : 1) élève en pleine activité physique ; 2) élève marchant doucement ou s'étirant légèrement (retour au calme) ; 3) élève buvant de l'eau (hydratation) ; 4) élève assis, au repos ; 5) élève souriant, en pleine forme (récupération)",
      nombrePersonnes: "1 (le même élève répété dans les 5 étapes)",
      age: AGE,
      environnement: COUR,
      action: "voir les 5 étapes décrites dans le sujet",
      position: "postures naturelles à chaque étape, cohérence avec l'illustration 3.2",
      materiel: "bouteille d'eau à l'étape 3",
      angle: "bande horizontale de 5 vignettes/icônes numérotées, séparées par des flèches",
      composition: SCHEMA_STYLE + ", cohérent avec l'illustration 3.2",
      securite: "sans objet",
      exclusions: "pas de texte autre que la numérotation des étapes",
    },
  },
  {
    numero: 5,
    nomFichier: "ch03_ill05_observation_habitudes.png",
    legende: "Scène d'observation : habitudes favorables / habitudes à corriger.",
    emplacement: "Avant l'activité pratique d'observation",
    size: "1536x1024",
    fields: {
      sujet: "scène de cour d'école en deux parties (avant/après une séance d'EPS), montrant plusieurs élèves adoptant différents comportements d'hygiène et de récupération",
      nombrePersonnes: "6 à 8 répartis entre les deux parties",
      age: AGE,
      environnement: COUR,
      action: "côté favorable : élèves qui boivent de l'eau, se lavent les mains, rangent le matériel ; côté à corriger : élèves qui négligent de boire, laissent traîner le matériel, ne se lavent pas les mains avant de manger",
      position: "comportements génériques et lisibles, sans viser un élève en particulier",
      materiel: "bouteilles d'eau, matériel scolaire/sportif rangé ou laissé au sol selon le côté",
      angle: "composition en deux parties comparables, séparation visuelle claire",
      composition: "même style visuel des deux côtés pour faciliter la comparaison",
      securite: "sans objet, aucune scène choquante",
      exclusions: "aucun élève ciblé individuellement, aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
