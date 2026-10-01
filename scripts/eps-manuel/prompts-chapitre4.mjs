// Structured illustration definitions for Chapitre 4 — Échauffement, sécurité
// et prévention. Each entry maps 1:1 to an "Illustration 4.N" already
// described (as a placeholder brief) in build-chapitre4.mjs.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élèves d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour d'école haïtienne, sol en terre battue, quelques bâtiments scolaires simples en arrière-plan";

export const CHAPITRE = 4;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch04_ill01_echauffement.png",
    legende: "Les quatre étapes d'un échauffement progressif, de la moins intense à la plus spécifique.",
    emplacement: "Section 4.3, après la description des quatre étapes de l'échauffement",
    size: "1536x1024",
    fields: {
      sujet: "séquence en quatre images numérotées montrant les étapes d'un échauffement progressif (mise en mouvement, mobilisation, activation, préparation spécifique)",
      nombrePersonnes: "1 (le même élève répété dans les 4 vignettes)",
      age: AGE,
      environnement: COUR,
      action: "vignette 1 : l'élève marche activement / trottine légèrement ; vignette 2 : l'élève mobilise une articulation (rotation des épaules) ; vignette 3 : l'élève effectue un déplacement dynamique avec changement de direction ; vignette 4 : l'élève fait un geste proche de l'activité principale (petite passe de ballon au sol)",
      position: "postures naturelles et sécuritaires à chaque étape",
      materiel: "un ballon simple dans la vignette 4 uniquement",
      angle: "bande horizontale de 4 vignettes de même taille, séparées par de fines lignes verticales, numérotées 1 à 4, avec une petite flèche entre chaque vignette indiquant la progression",
      composition: "cadrage large en pied pour chaque vignette",
      securite: "mouvements progressifs, contrôlés, aucun risque visible",
      exclusions: "pas de texte autre que les numéros 1-2-3-4, pas de flou, pas de vignette manquante",
    },
  },
  {
    numero: 2,
    nomFichier: "ch04_ill02_mobilisation.png",
    legende: "Six mouvements simples pour mobiliser les principales articulations avant l'activité.",
    emplacement: "Section « Activités pratiques », juste avant l'encadré « Construisons notre échauffement »",
    size: "1536x1024",
    fields: {
      sujet: "six vignettes montrant des mouvements simples et anatomiquement corrects de mobilisation articulaire",
      nombrePersonnes: "1 (le même élève répété dans les 6 vignettes)",
      age: AGE,
      environnement: COUR,
      action: "vignette 1 : rotation des épaules ; vignette 2 : flexion-extension des coudes ; vignette 3 : rotation des poignets ; vignette 4 : rotation des hanches ; vignette 5 : flexion des genoux ; vignette 6 : rotation des chevilles",
      position: "gestes amples mais contrôlés, anatomiquement corrects pour chaque articulation",
      materiel: "aucun",
      angle: "grille de 6 vignettes (2 rangées de 3), chacune étiquetée avec le nom de l'articulation mobilisée en légende sous la vignette",
      composition: "cadrage en pied, vue de face ou de trois quarts selon le mouvement",
      securite: "amplitude de mouvement raisonnable, aucune position dangereuse ou extrême",
      exclusions: "pas de texte superflu au-delà des étiquettes d'articulation, pas de matériel",
    },
  },
  {
    numero: 3,
    nomFichier: "ch04_ill03_espace_ecole.png",
    legende: "Quels éléments doivent être vérifiés avant de commencer ?",
    emplacement: "Section 4.6, après « Observer l'espace avant de pratiquer »",
    size: "1536x1024",
    fields: {
      sujet: "scène d'ensemble d'une cour d'école à observer avant de commencer une activité d'EPS",
      nombrePersonnes: "6 à 8 (élèves en attente en ligne, plus l'enseignant)",
      age: AGE,
      environnement: COUR + ", avec des limites de terrain tracées à la craie au sol, un petit obstacle visible (une pierre isolée), une zone libre, et du matériel rangé sur le côté (cônes, cordes enroulées)",
      action: "les élèves attendent en ligne pendant que l'enseignant observe et inspecte l'ensemble de l'espace avant de donner le signal de début",
      position: "élèves debout, alignés, attentifs ; enseignant en position de supervision, regard balayant l'espace",
      materiel: "un ballon posé au sol, des cônes et des cordes rangés proprement sur le côté",
      angle: "vue d'ensemble large, légèrement en hauteur, pour montrer tout l'espace de jeu",
      composition: "composition claire permettant de repérer facilement chaque élément mentionné (limites, obstacle, matériel, élèves, enseignant)",
      securite: "scène calme et organisée, l'obstacle est visible mais non dangereux dans l'image",
      exclusions: "aucun texte dans l'image (la question sera ajoutée en légende dans le document)",
    },
  },
  {
    numero: 4,
    nomFichier: "ch04_ill04_comparaison.png",
    legende: "À gauche, une activité bien organisée ; à droite, des comportements à corriger.",
    emplacement: "Section 4.9, après la liste des comportements dangereux à éviter",
    size: "1536x1024",
    fields: {
      sujet: "image en deux parties côte à côte comparant une activité d'EPS bien organisée et une activité présentant des comportements à corriger, dans le même espace scolaire",
      nombrePersonnes: "4 à 6 de chaque côté",
      age: AGE,
      environnement: COUR,
      action: "côté gauche : élèves qui attendent leur tour en ligne, respectent les distances, écoutent l'enseignant ; côté droit, dans le même type d'espace : un élève qui pousse légèrement un camarade, un autre qui s'apprête à lancer un ballon sans regarder devant lui, un élève qui traverse une zone de jeu sans autorisation",
      position: "comportements génériques et lisibles, sans viser un élève en particulier",
      materiel: "ballons et cônes visibles des deux côtés",
      angle: "image divisée verticalement en deux moitiés égales, avec une fine ligne de séparation centrale",
      composition: "même style visuel des deux côtés pour faciliter la comparaison directe",
      securite: "les comportements à corriger sont visibles mais non violents et sans blessure représentée ; aucun contact violent, juste des gestes imprudents clairement lisibles",
      exclusions: "aucune scène de blessure, aucun sang, aucune chute violente, aucun texte dans l'image",
    },
  },
  {
    numero: 5,
    nomFichier: "ch04_ill05_lancer.png",
    legende: "Une zone de lancer bien organisée, avec une ligne d'attente et une zone interdite respectées par tous.",
    emplacement: "Section 4.8, après les règles de distances et d'organisation",
    size: "1536x1024",
    fields: {
      sujet: "scène de sécurité pendant un exercice scolaire de lancer",
      nombrePersonnes: "5 à 7 (un lanceur, plusieurs élèves en attente, l'enseignant)",
      age: AGE,
      environnement: COUR + ", avec une zone de lancer délimitée au sol par une ligne tracée à la craie",
      action: "un élève est en position de lancer (balle légère) dans la zone de lancer ; les autres élèves attendent derrière une ligne d'attente clairement marquée ; une zone interdite bien signalée devant le lanceur est vide de toute personne ; l'enseignant supervise depuis un endroit sûr sur le côté",
      position: "lanceur en position de lancer contrôlée et sécuritaire ; élèves en attente alignés derrière la ligne",
      materiel: "une balle légère, des lignes ou cônes marquant la zone de lancer, la ligne d'attente et la zone interdite",
      angle: "vue en plongée légère ou de trois quarts permettant de bien distinguer les trois zones (lancer, attente, interdite)",
      composition: "zones clairement séparées visuellement (par exemple par des cônes ou lignes de couleurs différentes)",
      securite: "aucune personne dans la zone interdite, geste de lancer contrôlé et non violent",
      exclusions: "aucun texte dans l'image, pas d'objet de lancer dangereux (uniquement une balle scolaire légère)",
    },
  },
  {
    numero: 6,
    nomFichier: "ch04_ill06_retour_calme.png",
    legende: "Marche calme, hydratation et rangement du matériel : les gestes du retour au calme.",
    emplacement: "Section 4.10, après la conduite à tenir en cas de problème",
    size: "1536x1024",
    fields: {
      sujet: "scène de retour au calme après une séance d'EPS",
      nombrePersonnes: "4 à 6",
      age: AGE,
      environnement: COUR + ", ambiance calme, lumière douce suggérant la fin de la séance",
      action: "un groupe d'élèves marche calmement, certains boivent de l'eau à une bouteille personnelle, d'autres rangent du matériel (cônes, cordes) sous la supervision de l'enseignant",
      position: "postures détendues, rythme lent, aucune agitation",
      materiel: "bouteilles d'eau personnelles, cônes et cordes en cours de rangement",
      angle: "vue large et posée, cadrage horizontal",
      composition: "scène équilibrée montrant les trois actions (marche calme, hydratation, rangement) réparties dans l'image",
      securite: "aucune, scène purement calme et positive",
      exclusions: "aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
