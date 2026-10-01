// Structured illustration definitions for Chapitre 8 — Volley-ball. Each
// entry maps 1:1 to an illustration already described (as a placeholder
// brief, IDs ILL-7AF-C08-0N) in build-chapitre8.mjs. Fields derived
// directly from the existing brief — no new content invented.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élèves d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour ou terrain polyvalent d'école haïtienne, filet ou corde tendue";
const SCHEMA_STYLE = "schéma pédagogique de terrain, vue de dessus, traits nets, couleurs sobres, sans détails inutiles";

export const CHAPITRE = 8;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch08_ill01_terrain_volley.png",
    legende: "Les principaux éléments d'un terrain de volley-ball scolaire : filet, lignes et deux espaces de jeu.",
    emplacement: "Après l'introduction du terrain de volley-ball",
    size: "1536x1024",
    fields: {
      sujet: "schéma vu du dessus d'un terrain de volley-ball simplifié, avec étiquettes claires (lignes du terrain, filet, ligne médiane, deux espaces de jeu)",
      nombrePersonnes: "0",
      age: "n/a (schéma)",
      environnement: "vue de dessus du terrain, fond neutre",
      action: "sans objet — schéma statique",
      position: "sans objet",
      materiel: "filet, lignes de terrain",
      angle: "vue aérienne complète du terrain",
      composition: SCHEMA_STYLE,
      securite: "sans objet",
      exclusions: "aucun texte hors des étiquettes de zones",
    },
  },
  {
    numero: 2,
    nomFichier: "ch08_ill02_position_attente.png",
    legende: "Une position d'attente équilibrée, prête à se déplacer vers le ballon.",
    emplacement: "Après la présentation de la position d'attente",
    size: "1536x1024",
    fields: {
      sujet: "élève en position d'attente de volley-ball",
      nombrePersonnes: "1",
      age: AGE,
      environnement: COUR,
      action: "position d'attente statique",
      position: "appuis stables et légèrement écartés, genoux légèrement fléchis, bras légèrement devant le corps, regard attentif vers l'espace de jeu",
      materiel: "aucun (filet visible en arrière-plan)",
      angle: "plan rapproché en pied, vue de trois quarts",
      composition: "posture de référence claire et lisible",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 3,
    nomFichier: "ch08_ill03_manchette.png",
    legende: "La manchette : avant-bras unis, appuis stables, geste accompagné vers la cible.",
    emplacement: "Après la présentation de la manchette",
    size: "1536x1024",
    fields: {
      sujet: "séquence de 2 vignettes montrant un élève réalisant une manchette",
      nombrePersonnes: "1 (le même élève dans les 2 vignettes)",
      age: AGE,
      environnement: COUR,
      action: "vignette 1 : position d'attente avec avant-bras unis devant le corps, ballon arrivant en trajectoire basse ; vignette 2 : contact du ballon avec les avant-bras, geste accompagné vers la cible",
      position: "mouvement anatomiquement cohérent, sans exagération",
      materiel: "un ballon de volley-ball",
      angle: "2 vignettes côte à côte",
      composition: "technique simple et sécuritaire, adaptée à un débutant",
      securite: "geste contrôlé, sans exagération",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 4,
    nomFichier: "ch08_ill04_passe_haute.png",
    legende: "La passe haute : placement sous le ballon, mains préparées au-dessus du visage, orientation vers un partenaire.",
    emplacement: "Après la présentation de la passe haute",
    size: "1536x1024",
    fields: {
      sujet: "élève réalisant une passe haute",
      nombrePersonnes: "1",
      age: AGE,
      environnement: COUR,
      action: "élève placé sous le ballon, mains levées au-dessus du visage, doigts écartés et souples, jambes légèrement fléchies, regard vers un partenaire situé face à lui, ballon juste au-dessus des mains",
      position: "position des mains et du corps clairement visible",
      materiel: "un ballon de volley-ball",
      angle: "plan rapproché, vue de trois quarts ou de face",
      composition: "lisibilité claire du placement des mains",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 5,
    nomFichier: "ch08_ill05_service.png",
    legende: "Un service scolaire simple, réalisé par-dessous, avec régularité et contrôle plutôt que puissance.",
    emplacement: "Après la présentation du service",
    size: "1536x1024",
    fields: {
      sujet: "élève effectuant un service simple par-dessous",
      nombrePersonnes: "3 à 4 (le serveur, une zone d'attente avec d'autres élèves visible à l'écart)",
      age: AGE,
      environnement: COUR + ", ligne de fond du terrain",
      action: "ballon tenu d'une main, l'autre main s'apprêtant à le frapper doucement vers le haut et vers l'avant, en direction du filet, depuis une distance adaptée derrière la ligne de fond",
      position: "geste contrôlé, régularité plutôt que puissance",
      materiel: "un ballon de volley-ball",
      angle: "plan large montrant le serveur et la zone d'attente",
      composition: "technique accessible à un débutant, cadre sécurisé",
      securite: "zone d'attente respectée, geste non violent",
      exclusions: "aucun texte dans l'image",
    },
  },
  {
    numero: 6,
    nomFichier: "ch08_ill06_construire_echange.png",
    legende: "Réception, préparation, renvoi : trois élèves qui coopèrent pour construire un échange.",
    emplacement: "Après la présentation du principe des trois touches",
    size: "1536x1024",
    fields: {
      sujet: "trois élèves coopérant sur le même côté du terrain pour construire un échange",
      nombrePersonnes: "3",
      age: AGE,
      environnement: COUR,
      action: "élève 1 réceptionnant un ballon bas à la manchette ; élève 2 se préparant à réaliser une passe haute vers élève 3 ; élève 3 prêt à renvoyer le ballon par-dessus le filet ; flèches légères indiquant le trajet du ballon",
      position: "coordination des trois rôles clairement lisible",
      materiel: "un ballon de volley-ball",
      angle: "plan large montrant les trois élèves et le trajet du ballon",
      composition: "organisation réception-préparation-renvoi bien visible",
      securite: "sans objet",
      exclusions: "aucun texte dans l'image hors des flèches de trajectoire",
    },
  },
  {
    numero: 7,
    nomFichier: "ch08_ill07_observe_analyse.png",
    legende: "Quels comportements sont corrects ? Lesquels devraient être corrigés ?",
    emplacement: "Activité d'observation en fin de chapitre",
    size: "1536x1024",
    fields: {
      sujet: "scène de mini-volley scolaire avec plusieurs éléments à observer",
      nombrePersonnes: "3 à 4",
      age: AGE,
      environnement: COUR,
      action: "un élève qui se déplace clairement vers le ballon en l'annonçant, un partenaire bien placé dans un espace libre, et à l'écart, un élève qui s'appuie sur le poteau du filet (comportement à corriger)",
      position: "comportements génériques et lisibles",
      materiel: "un ballon de volley-ball, un filet avec poteau",
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
