// Structured illustration definitions for Chapitre 10 — Hygiène de vie,
// santé, récupération et pratique physique responsable. Each entry maps
// 1:1 to an illustration already described (as a placeholder brief, IDs
// ILL-7AF-C10-0N) in build-chapitre10.mjs. Fields derived directly from
// the existing brief — no new content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élève d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour d'école haïtienne";

export const CHAPITRE = 10;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch10_ill01_preparer_seance.png",
    legende: "Bien préparer sa tenue, son eau et son matériel avant une séance d'EPS.",
    emplacement: "Section 10.7, préparation d'une séance",
    size: "1536x1024",
    fields: {
      sujet: "élève préparant calmement ses affaires pour une séance d'EPS",
      nombrePersonnes: "1",
      age: AGE,
      environnement: "maison ou cour de l'école, ambiance simple et réaliste",
      action: "l'élève prépare tenue de sport propre, une petite bouteille d'eau personnelle, et son matériel scolaire habituel posé à côté",
      position: "posture calme et concentrée",
      materiel: "tenue de sport, bouteille d'eau personnelle, matériel scolaire",
      angle: "plan rapproché sur la scène de préparation",
      composition: "ambiance simple, sans objet coûteux ou superflu",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 2,
    nomFichier: "ch10_ill02_hydratation.png",
    legende: "Une pause d'hydratation organisée, à l'ombre, sous la supervision de l'enseignant.",
    emplacement: "Section sur l'hydratation régulière",
    size: "1536x1024",
    fields: {
      sujet: "petit groupe d'élèves buvant de l'eau pendant une pause organisée",
      nombrePersonnes: "4 à 5",
      age: AGE,
      environnement: COUR + ", climat visiblement chaud (soleil), si possible à l'ombre",
      action: "les élèves boivent de l'eau à leur bouteille personnelle pendant une pause organisée par l'enseignant",
      position: "ambiance calme",
      materiel: "bouteilles d'eau personnelles",
      angle: "plan large montrant le groupe",
      composition: "supervision de l'enseignant visible en arrière-plan",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 3,
    nomFichier: "ch10_ill03_alimentation_variee.png",
    legende: "Une alimentation variée, avec des aliments familiers du quotidien haïtien.",
    emplacement: "Section sur l'alimentation variée et équilibrée",
    size: "1536x1024",
    fields: {
      sujet: "composition pédagogique simple présentant des aliments variés et familiers du quotidien haïtien (céréales, légumineuses, protéines, légumes, fruits locaux)",
      nombrePersonnes: "0 — aucune représentation de personnage ni de silhouette corporelle",
      age: "n/a",
      environnement: "surface neutre, dans le même esprit que l'illustration du Chapitre 3",
      action: "sans objet — composition alimentaire",
      position: "sans objet",
      materiel: "céréales, légumineuses, protéines, légumes, fruits locaux",
      angle: "vue de dessus ou de trois quarts, cadrage centré",
      composition: "cohérent avec l'illustration 3.3 du Chapitre 3",
      securite: "sans objet",
      exclusions: "aucun personnage, aucune silhouette corporelle, aucun message de régime ou de restriction, aucun texte dans l'image",
    },
  },
  {
    numero: 4,
    nomFichier: "ch10_ill04_recuperation.png",
    legende: "Le retour au calme, la marche douce et l'organisation après l'activité : des gestes de récupération.",
    emplacement: "Section sur la récupération, en lien avec le Chapitre 4",
    size: "1536x1024",
    fields: {
      sujet: "petit groupe d'élèves marchant doucement après une séance d'EPS",
      nombrePersonnes: "4 à 5",
      age: AGE,
      environnement: COUR + ", ambiance calme",
      action: "les élèves marchent doucement, certains s'étirant légèrement, sous la supervision de l'enseignant qui organise le retour au calme",
      position: "postures détendues, rythme lent",
      materiel: "aucun",
      angle: "plan large",
      composition: "cohérent avec l'illustration du retour au calme du Chapitre 4",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 5,
    nomFichier: "ch10_ill05_respect_materiel.png",
    legende: "Ranger le matériel ensemble, sous la supervision de l'enseignant : un geste de responsabilité collective.",
    emplacement: "Section sur le respect du matériel",
    size: "1536x1024",
    fields: {
      sujet: "petit groupe d'élèves rangeant ensemble le matériel d'EPS",
      nombrePersonnes: "3 à 5",
      age: AGE,
      environnement: COUR + " propre et bien tenue",
      action: "les élèves rangent ensemble ballons, cônes et cordes, sous la supervision de l'enseignant",
      position: "ambiance coopérative et organisée",
      materiel: "ballons, cônes, cordes",
      angle: "plan large",
      composition: "scène de rangement clairement lisible",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 6,
    nomFichier: "ch10_ill06_vie_active.png",
    legende: "L'activité physique au quotidien prend plusieurs formes, au-delà des sports organisés.",
    emplacement: "Section sur l'activité physique quotidienne",
    size: "1536x1024",
    fields: {
      sujet: "plusieurs petites vignettes montrant différentes formes d'activité physique quotidienne adaptées aux jeunes",
      nombrePersonnes: "3 à 6 réparti(e)s dans les vignettes",
      age: AGE,
      environnement: "contexte haïtien crédible : chemin de l'école, cour ou rue sécurisée, domicile",
      action: "un élève qui marche pour se rendre à l'école ; des enfants jouant activement dans la cour ou la rue en sécurité ; un élève aidant à une tâche domestique qui demande du mouvement",
      position: "scènes variées et réalistes",
      materiel: "aucun matériel coûteux",
      angle: "plusieurs petites vignettes juxtaposées",
      composition: "diversité des formes d'activité physique quotidienne",
      securite: "aucune activité dangereuse ou non supervisée sur la voie publique",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 7,
    nomFichier: "ch10_ill07_bilan_manuel.png",
    legende: "Un an d'apprentissages en EPS, résumé en une seule scène : sports, sécurité, santé et coopération.",
    emplacement: "Conclusion du chapitre et du manuel",
    size: "1536x1024",
    fields: {
      sujet: "grande scène pédagogique de synthèse réunissant des éléments symbolisant les dix chapitres du manuel",
      nombrePersonnes: "6 à 8 élèves souriants réunis autour de leur enseignant",
      age: AGE,
      environnement: COUR,
      action: "scène rassemblant un ballon de basket-ball, un ballon de football, un ballon de volley-ball et un filet, une piste ou ligne de course, un petit tapis de gymnastique, une bouteille d'eau, et le groupe d'élèves réuni autour de l'enseignant",
      position: "ambiance positive et rassembleuse",
      materiel: "ballons de basket/football/volley, filet, tapis de gymnastique, bouteille d'eau",
      angle: "plan large et englobant",
      composition: "composition claire, éléments des dix chapitres identifiables",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
