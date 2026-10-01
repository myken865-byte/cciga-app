// Structured illustration definitions for Chapitre 2 — Le corps humain et
// le mouvement. Each entry maps 1:1 to an "Illustration 2.N" already
// described (as a placeholder brief) in the canonical Chapitre 2 docx.
// Fields derived directly from the existing brief/légende/fonction — no
// new pedagogical content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élève d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour d'école haïtienne, sol en terre battue, quelques bâtiments scolaires simples en arrière-plan";
const SCHEMA_STYLE = "schéma pédagogique anatomique, style scolaire, traits nets, couleurs sobres, sans surcharge de détails";

export const CHAPITRE = 2;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch02_ill01_silhouette_parties_corps.png",
    legende: "Silhouette du corps humain avec les principales parties identifiées.",
    emplacement: "Après l'introduction des parties du corps utilisées pendant l'activité physique",
    size: "1536x1024",
    fields: {
      sujet: "silhouette humaine schématique de face, avec étiquettes fléchées identifiant les régions du corps (tête, cou, tronc/thorax/abdomen, bras, avant-bras, main, cuisse, jambe, pied)",
      nombrePersonnes: "1",
      age: AGE,
      environnement: "fond neutre, planche pédagogique (pas de décor)",
      action: "silhouette statique, de face, bras légèrement écartés du corps pour la lisibilité des étiquettes",
      position: "posture neutre, debout, symétrique",
      materiel: "aucun",
      angle: "vue de face, cadrage vertical centré sur la silhouette",
      composition: "étiquettes reliées par de fines flèches à chaque région nommée",
      securite: "sans objet — planche schématique",
      exclusions: "aucun détail anatomique complexe superflu ; " + SCHEMA_STYLE,
    },
  },
  {
    numero: 2,
    nomFichier: "ch02_ill02_squelette_simplifie.png",
    legende: "Squelette humain simplifié avec les principaux os utiles au niveau 7e AF.",
    emplacement: "Après la présentation du rôle du squelette",
    size: "1536x1024",
    fields: {
      sujet: "squelette humain simplifié de face, sans détail anatomique complexe, avec étiquettes claires (crâne, colonne vertébrale, côtes, sternum, bassin, humérus, radius, cubitus, fémur, tibia, péroné)",
      nombrePersonnes: "0 (schéma osseux, pas de personnage réaliste)",
      age: "n/a (schéma anatomique générique adapté au niveau 7e AF)",
      environnement: "fond neutre, planche pédagogique",
      action: "sans objet — schéma statique",
      position: "squelette de face, posture neutre debout",
      materiel: "aucun",
      angle: "vue de face, cadrage vertical",
      composition: "tons de gris ou de bleu clair, traits épais et lisibles, étiquettes claires pour chaque os nommé",
      securite: "sans objet",
      exclusions: "" + SCHEMA_STYLE,
    },
  },
  {
    numero: 3,
    nomFichier: "ch02_ill03_articulations.png",
    legende: "Principales articulations du corps.",
    emplacement: "Après la présentation des articulations",
    size: "1536x1024",
    fields: {
      sujet: "silhouette humaine de face (même style que l'illustration 2.1) avec un point ou petit cercle coloré à chaque articulation étudiée (épaule, coude, poignet, hanche, genou, cheville), chaque point relié à une étiquette nommée",
      nombrePersonnes: "1",
      age: AGE,
      environnement: "fond neutre, planche pédagogique",
      action: "silhouette statique, de face, bras légèrement écartés",
      position: "posture neutre, debout, symétrique",
      materiel: "aucun",
      angle: "vue de face, cadrage vertical centré",
      composition: "points colorés aux 6 articulations, étiquettes claires reliées par de fines lignes",
      securite: "sans objet",
      exclusions: "" + SCHEMA_STYLE,
    },
  },
  {
    numero: 4,
    nomFichier: "ch02_ill04_groupes_musculaires.png",
    legende: "Principaux groupes musculaires utiles à la compréhension des mouvements sportifs.",
    emplacement: "Après la présentation du rôle des muscles",
    size: "1536x1024",
    fields: {
      sujet: "silhouette musculaire simplifiée, vue de face (et de dos si possible), avec grandes zones colorées identifiant les groupes musculaires principaux (biceps, triceps, abdominaux, muscles du dos, quadriceps, ischio-jambiers, mollets), chacune étiquetée",
      nombrePersonnes: "1 (ou 1 silhouette double face/dos)",
      age: AGE,
      environnement: "fond neutre, planche pédagogique",
      action: "silhouette statique",
      position: "posture neutre, debout, symétrique, vue de face et de dos",
      materiel: "aucun",
      angle: "vue de face (et de dos), cadrage vertical",
      composition: "grandes zones simples et faciles à identifier, sans niveau de détail anatomique excessif",
      securite: "sans objet",
      exclusions: "" + SCHEMA_STYLE,
    },
  },
  {
    numero: 5,
    nomFichier: "ch02_ill05_coeur_poumons_effort.png",
    legende: "Schéma simple montrant cœur, poumons, respiration et circulation pendant l'effort.",
    emplacement: "Après la présentation de la respiration et de la circulation pendant l'effort",
    size: "1536x1024",
    fields: {
      sujet: "schéma simplifié du thorax montrant le cœur et les poumons, avec flèches indiquant l'entrée de l'air (inspiration), la sortie du gaz carbonique (expiration), et le trajet du sang enrichi en oxygène depuis les poumons, via le cœur, vers les muscles (représentés par un bras ou une jambe simplifiés)",
      nombrePersonnes: "0 (schéma anatomique)",
      age: "n/a (schéma anatomique générique)",
      environnement: "fond neutre, planche pédagogique",
      action: "sans objet — schéma statique avec flèches de circulation",
      position: "sans objet",
      materiel: "aucun",
      angle: "vue frontale du thorax, cadrage centré",
      composition: "couleurs simples et codifiées (bleu pour l'air, rouge pour le sang), flèches claires",
      securite: "sans objet",
      exclusions: "" + SCHEMA_STYLE,
    },
  },
  {
    numero: 6,
    nomFichier: "ch02_ill06_effort_reactions_corps.png",
    legende: "Élèves haïtiens de 7e AF pratiquant une activité physique dans une cour d'école haïtienne.",
    emplacement: "Après la section sur les réactions du corps pendant l'effort (section 2.7)",
    size: "1536x1024",
    fields: {
      sujet: "petit groupe d'élèves courant légèrement, illustrant les réactions normales du corps pendant l'effort",
      nombrePersonnes: "4 à 6",
      age: AGE,
      environnement: COUR,
      action: "les élèves courent légèrement sous la supervision visible d'un(e) professeur d'EPS ; signes naturels d'effort adapté (respiration active, légère transpiration) sans exagération",
      position: "posture de course légère, dynamique mais contrôlée",
      materiel: "aucun",
      angle: "plan large, cadrage horizontal",
      composition: "cohérent avec le style de l'illustration du Chapitre 1",
      securite: "effort adapté, aucune exagération, aucun signe de détresse",
      exclusions: "aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
