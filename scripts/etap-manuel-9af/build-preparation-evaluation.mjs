// Manuel d'ETAP 9e AF — Phase Finale, PARTIE III : Préparation à
// l'évaluation (épreuves d'entraînement originales).
//
// Structure conforme à PLAN_PREPARATION_EVALUATION_ETAP_9AF.md (validé,
// Phase 0), mise à jour de 4 à 5 champs suite à l'ajout du Chapitre 6
// (voir GATE_5_VS_6_CHAPITRES_ETAP_9AF.md, résolution 2026-08-28) :
//   Niveau 1 — Entraînement guidé : une épreuve par champ (5 épreuves).
//   Niveau 2 — Entraînement semi-autonome : 2 épreuves combinant 2 champs.
//   Niveau 3 — Simulation complète : 1 épreuve couvrant les 5 champs.
// Aucune épreuve officielle ETAP n'a été localisée (voir RECHERCHE_
// EPREUVES_MENFP_ETAP_9AF.md) : toutes les épreuves ci-dessous sont des
// créations originales, jamais présentées comme des épreuves officielles.
// Durées et barèmes : [CHOIX ÉDITORIAL — NON OFFICIEL].
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, threeColTable, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE, VERT, CUIVRE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "PARTIE III — Préparation à l'évaluation", bold: true, color: VERT, size: 40 })],
}));
children.push(calloutBox(
  "Statut de cette section",
  [
    "Aucune épreuve officielle ETAP, aucun barème officiel n'a été localisé pour la 9e AF (voir " +
    "RECHERCHE_EPREUVES_MENFP_ETAP_9AF.md, statut « NON CONFIRMÉ PAR SOURCE OFFICIELLE DISPONIBLE »). Les 8 " +
    "épreuves ci-dessous sont des créations originales de ce manuel, structurées en 3 niveaux de progression. " +
    "Aucune n'est présentée comme une épreuve officielle. Durées et barèmes : [CHOIX ÉDITORIAL — NON OFFICIEL].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(240));

// =======================================================================
children.push(sectionHeading("Niveau 1 — Entraînement guidé", ""));
children.push(bodyPar(
  "Une épreuve courte par champ, avec un rappel de la notion juste avant chaque question. Barème indicatif : " +
  "10 points par épreuve.",
  { italics: true },
));
children.push(spacer(200));

function n1(label, champ, items) {
  children.push(subHeading(`Épreuve N1-${label} — ${champ}`));
  items.forEach((it, i) => {
    children.push(bodyPar(`Rappel : ${it.rappel}`, { italics: true, color: "5B6470" }));
    children.push(numberedPar(`${i + 1}. ${it.q}`));
  });
  children.push(spacer(200));
}

n1("A", "Métiers de la mer", [
  { rappel: "Un projet générateur de revenus doit d'abord répondre à un besoin réel observé.", q: "Cite un besoin réel que pourrait résoudre un projet lié aux métiers de la mer dans ta communauté. (3 pts)" },
  { rappel: "Une solution responsable préserve l'écosystème marin.", q: "Donne un exemple de pratique qui préserve l'écosystème marin. (3 pts)" },
  { rappel: "Un projet mobilise une équipe aux rôles répartis.", q: "Cite deux rôles possibles dans une équipe de projet. (4 pts)" },
]);

n1("B", "Recyclage et énergies renouvelables", [
  { rappel: "Le soleil, le vent et la biomasse sont des sources d'énergie renouvelable.", q: "Cite deux sources d'énergie renouvelable étudiées dans ce manuel. (4 pts)" },
  { rappel: "Un schéma représente un système à plat ; une maquette non fonctionnelle le représente en volume.", q: "Quelle est la différence entre un schéma et une maquette non fonctionnelle ? (3 pts)" },
  { rappel: "Évaluer un système suppose de considérer plusieurs types d'impacts.", q: "Cite les trois types d'impacts à évaluer pour un système technique. (3 pts)" },
]);

n1("C", "Agriculture", [
  { rappel: "Transformer un produit agricole, c'est le modifier pour créer un nouveau produit.", q: "Donne un exemple de transformation d'un produit agricole. (3 pts)" },
  { rappel: "La conservation permet de garder un produit utilisable plus longtemps.", q: "Pourquoi une bonne conservation réduit-elle les pertes d'un produit agricole ? (4 pts)" },
  { rappel: "Une solution responsable préserve l'environnement.", q: "Donne un exemple de pratique agricole qui préserve les sols. (3 pts)" },
]);

n1("D", "Entrepreneuriat", [
  { rappel: "Le bénéfice se calcule en soustrayant le coût de production du prix de vente.", q: "Une entreprise fictive vend un objet 100 gourdes qui lui coûte 70 gourdes à produire. Quel est le bénéfice fictif réalisé par objet vendu ? (4 pts)" },
  { rappel: "L'organigramme montre la répartition des rôles dans une entreprise.", q: "Qu'est-ce qu'un organigramme ? (3 pts)" },
  { rappel: "Une entreprise fictive reste entièrement simulée.", q: "Pourquoi une entreprise scolaire fictive ne doit-elle jamais manipuler d'argent réel ? (3 pts)" },
]);

n1("E", "Modéliser avec le numérique (CAO et FAO)", [
  { rappel: "La CAO permet de concevoir un objet à l'écran ; la FAO utilise ce modèle pour guider une machine de fabrication.", q: "Quelle est la différence entre la CAO et la FAO ? (4 pts)" },
  { rappel: "Plusieurs logiciels libres existent pour la modélisation.", q: "Cite un logiciel libre de modélisation présenté dans ce manuel. (3 pts)" },
  { rappel: "Sans ordinateur, la modélisation reste possible sur papier/carton.", q: "Comment peux-tu réaliser un modèle 3D si aucun ordinateur n'est disponible ? (3 pts)" },
]);

// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Niveau 2 — Entraînement semi-autonome", ""));
children.push(bodyPar(
  "Deux épreuves combinant chacune deux champs, avec moins d'indices et une situation-problème à traiter en " +
  "autonomie partielle. Barème indicatif : 20 points par épreuve.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Épreuve N2-A — Agriculture + Recyclage/énergies renouvelables"));
children.push(bodyPar(
  "Situation : Un jardin scolaire a besoin d'être irrigué régulièrement, mais l'accès à l'eau courante est " +
  "irrégulier dans la commune.",
  { italics: true },
));
children.push(numberedPar("1. Propose une solution combinant les deux champs pour répondre à ce besoin. (6 pts)"));
children.push(numberedPar("2. Quelles compétences des Chapitres 2 et 3 cette solution mobilise-t-elle ? (6 pts)"));
children.push(numberedPar("3. Situation-problème : décris, en 4 à 5 lignes, les grandes étapes de mise en œuvre de ce projet, en indiquant au moins un impact attendu. (8 pts)"));
children.push(spacer(200));

children.push(subHeading("Épreuve N2-B — Métiers de la mer + Entrepreneuriat"));
children.push(bodyPar(
  "Situation : Dans une commune côtière, des produits de la mer sont vendus non transformés, à faible valeur.",
  { italics: true },
));
children.push(numberedPar("1. Propose une transformation possible pour augmenter la valeur de ce produit. (6 pts)"));
children.push(numberedPar("2. Une équipe fictive transforme ce produit à un coût de 30 gourdes par unité et le revend 55 gourdes. Calcule le bénéfice fictif réalisé sur 10 unités vendues. (6 pts)"));
children.push(numberedPar("3. Situation-problème : présente, en 4 à 5 lignes, comment organiser une petite équipe pour ce projet, en respectant la préservation de l'écosystème marin. (8 pts)"));
children.push(spacer(200));

// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Niveau 3 — Simulation complète", ""));
children.push(bodyPar(
  "Durée indicative : 60 minutes (choix pédagogique interne, non officielle). Barème indicatif : 40 points.",
  { italics: true },
));
children.push(spacer(160));

children.push(subHeading("Répartition indicative des compétences couvertes"));
children.push(threeColTable(
  ["Partie", "Champ(s) couverts", "Points"],
  [
    ["A — Connaissance/compréhension", "Les 5 champs (Mer, Recyclage/énergies, Agriculture, Entrepreneuriat, Numérique)", "15"],
    ["B — Analyse", "Numérique intégré de façon transversale à un champ", "10"],
    ["C — Situation-problème / mini-projet", "Combinaison libre d'au moins deux champs, dont le Numérique pour la présentation", "15"],
  ],
  [3400, 4400, 1400],
));
children.push(spacer(200));

children.push(subHeading("Partie A — Connaissance/compréhension (15 points, 5 questions)"));
children.push(numberedPar("1. Cite un exemple de projet générateur de revenus lié aux métiers de la mer, respectueux de l'écosystème marin. (3 pts)"));
children.push(numberedPar("2. Cite une source d'énergie renouvelable et un exemple de système l'utilisant. (3 pts)"));
children.push(numberedPar("3. Cite une pratique agricole responsable étudiée cette année. (3 pts)"));
children.push(numberedPar("4. Cite deux notions économiques utilisées pour calculer un bénéfice fictif. (3 pts)"));
children.push(numberedPar("5. Cite la différence entre un modèle 2D et un modèle 3D. (3 pts)"));
children.push(spacer(200));

children.push(subHeading("Partie B — Analyse (10 points)"));
children.push(bodyPar(
  "Une équipe souhaite modéliser, avant de le fabriquer, l'objet technique conçu au Chapitre 2 (système " +
  "utilisant une énergie renouvelable ou des objets recyclés).",
  { italics: true },
));
children.push(numberedPar("1. Explique en quoi la modélisation numérique (ou papier/carton) de cet objet, avant sa fabrication, peut être utile à l'équipe. (10 pts)"));
children.push(spacer(200));

children.push(subHeading("Partie C — Situation-problème / mini-projet intégrateur (15 points)"));
children.push(bodyPar(
  "Choisis une combinaison d'au moins deux champs étudiés cette année (Mer, Recyclage/énergies, Agriculture, " +
  "Entrepreneuriat) et décris un mini-projet répondant à un besoin réel de ta communauté. Explique comment tu " +
  "présenterais ce projet, avec ou sans numérique, et cite un impact attendu.",
  { italics: true },
));
children.push(numberedPar("1. Réponse structurée : besoin, champs combinés, solution proposée, mode de présentation, impact attendu. (15 pts)"));

await buildAndSave(children, 92, "Manuel_ETAP_9AF_PreparationEvaluation.docx");
