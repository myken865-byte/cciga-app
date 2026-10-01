// Annexes pedagogiques et Dossier d'evaluation — Manuel d'EPS 9e AF.
import {
  Paragraph, TextRun, bodyPar, sectionHeading, subHeading, spacer, pageBreak,
  threeColTable, buildAndSave, FONT, NAVY, GOLD, GREY_TEXT,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, calloutBox,
} from "./common.mjs";
import { HeadingLevel } from "docx";

const children = [];

children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Annexes pédagogiques et dossier d’évaluation", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Manuel d’EPS 9e Année Fondamentale — 2026-2027", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));
children.push(spacer(200));

// ---- Annexe 1 : index des methodes ----
children.push(sectionHeading("Annexe 1 — Index des encadrés MÉTHODE du manuel", ""));
children.push(bodyPar(
  "Cet index rassemble les huit encadrés MÉTHODE introduits dans les douze chapitres, pour un repérage rapide."
));
children.push(threeColTable(
  ["Encadré MÉTHODE", "Chapitre d’introduction", "Usage"],
  [
    ["Observer → comprendre → décider → agir → analyser → ajuster", "Chapitre 1", "Démarche générale de progression, valable dans toute situation motrice"],
    ["Analyser une performance", "Chapitre 2", "Analyser une réalisation individuelle à partir de critères simples"],
    ["Vérifier une information historique sportive", "Chapitre 3", "Distinguer fait, interprétation et opinion à partir d’une source"],
    ["Lire une situation de jeu (football)", "Chapitre 4", "Observer ballon, partenaires, adversaires, espace avant de décider"],
    ["Analyser un document historique sportif", "Chapitre 5", "Identifier, dater et interpréter un document ou une illustration historique"],
    ["Lire le jeu avant d’agir (basketball) / Analyser une action", "Chapitre 6", "Lecture tactique du jeu et analyse d’une action réalisée"],
    ["Analyser une information historique", "Chapitre 7", "Méthode en sept questions pour vérifier une source avant de l’utiliser"],
    ["Lire la trajectoire (volleyball)", "Chapitre 8", "Observer, estimer et décider à partir de la trajectoire du ballon"],
    ["Analyser une exigence motrice", "Chapitre 9", "Identifier les habiletés et qualités physiques nécessaires à une tâche"],
    ["Prendre une décision d’arbitrage", "Chapitre 10", "Démarche d’observation et de décision pour un arbitrage scolaire"],
    ["Gérer son effort", "Chapitre 11", "Adapter son intensité, observer ses sensations, récupérer, signaler un problème"],
    ["Réviser efficacement", "Chapitre 12", "Méthode de révision avant une évaluation"],
  ],
  [3600, 2200, 3600],
));
children.push(spacer(200));

// ---- Annexe 2 : grille d'observation generique ----
children.push(pageBreak());
children.push(sectionHeading("Annexe 2 — Grille d’observation générique (à photocopier)", ""));
children.push(bodyPar(
  "Cette grille vierge peut être utilisée par un élève-observateur ou un élève-arbitre scolaire, quel que soit le sport étudié dans ce manuel. Elle ne sert jamais à classer les élèves entre eux."
));
children.push(threeColTable(
  ["Critère observé", "Ce que j’observe", "Remarque ou décision"],
  [
    ["Respect de la consigne", "", ""],
    ["Contrôle du geste", "", ""],
    ["Placement / occupation de l’espace", "", ""],
    ["Communication avec les partenaires", "", ""],
    ["Respect des règles et de l’arbitre", "", ""],
    ["Sécurité", "", ""],
  ],
  [3000, 3200, 3200],
));
children.push(spacer(200));

// ---- Dossier d'evaluation ----
children.push(pageBreak());
children.push(sectionHeading("Dossier d’évaluation", ""));
children.push(calloutBox(
  "Avertissement",
  [
    "Ce dossier distingue clairement trois catégories : épreuves officielles MENFP vérifiées, textes modèles officiels vérifiés, et évaluations blanches originales de ce manuel. Aucun document protégé n’est reproduit intégralement sans autorisation.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(160));

children.push(subHeading("Épreuves officielles MENFP vérifiées pour l’EPS de 9e AF"));
children.push(bodyPar(
  "Aucune. La consultation du document officiel « Préparations des examens de la 9ème AF (2022) » (Direction de l’Enseignement Fondamental, MENFP, voir Références) montre que l’examen d’État de 9e AF porte sur sept matières (Communication Française, Mathématiques, Communication Créole, Sciences Sociales, Sciences Expérimentales, Anglais, Espagnol) ; l’Éducation Physique et Sportive n’y figure pas. Ce manuel ne peut donc reproduire ni citer aucune épreuve officielle d’EPS pour la 9e AF, faute d’existence vérifiée d’un tel document."
));
children.push(spacer(160));

children.push(subHeading("Textes modèles officiels vérifiés"));
children.push(bodyPar(
  "Aucun texte modèle officiel spécifique à l’EPS n’a été trouvé sur les sources consultées (voir Références, section A). Ce point n’est donc pas fabriqué : il est signalé honnêtement comme une absence de source, et non comme un oubli."
));
children.push(spacer(160));

children.push(subHeading("Évaluations blanches originales de ce manuel"));
children.push(bodyPar(
  "Une seule évaluation blanche est proposée dans ce manuel : « ÉVALUATION BLANCHE DE PRÉPARATION — NON OFFICIELLE », intégrée au Chapitre 12, couvrant de façon équilibrée les grands acquis des douze chapitres (QCM, compléter, correspondances, situation-problème, comparaison et justification). Son corrigé figure séparément dans le Corrigé général, clairement identifié. Cette évaluation ne reproduit et ne prétend reproduire aucune épreuve officielle du MENFP."
));

const outPath = await buildAndSave(children, 203, "Manuel_EPS_9AF_AnnexesDossier.docx");
console.log("Annexes et dossier (9e AF) genere:", outPath);
