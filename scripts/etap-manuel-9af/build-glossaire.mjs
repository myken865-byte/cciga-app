// Manuel d'ETAP 9e AF — Phase Finale, PARTIE V : Glossaire.
//
// Termes réellement employés dans les rubriques "Vocabulaire essentiel"
// des 6 chapitres, classés par ordre alphabétique, sans doublon.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, spacer, pageBreak,
  buildAndSave, AlignmentType, TextRun, Paragraph, VERT, GRIS,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "PARTIE V — Glossaire", bold: true, color: VERT, size: 40 })],
}));
children.push(bodyPar(
  "Termes essentiels employés dans les 6 chapitres du Manuel d'ETAP 9e AF, classés par ordre alphabétique. Le " +
  "numéro entre parenthèses indique le chapitre où le terme est introduit.",
  { italics: true },
));
children.push(spacer(240));

function entry(term, chapNum, def) {
  children.push(new Paragraph({
    spacing: { after: 140, line: 276 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: `${term} `, bold: true, color: VERT, size: 24 }),
      new TextRun({ text: `(Chapitre ${chapNum}) — `, italics: true, color: GRIS, size: 22 }),
      new TextRun({ text: def, size: 24 }),
    ],
  }));
}

entry("Autonomie", 5, "Capacité à mener une tâche en prenant soi-même les décisions nécessaires, avec moins de guidage.");
entry("Bilan", 5, "Synthèse de ce qui a été appris ou réalisé sur une période donnée.");
entry("CAO (Conception Assistée par Ordinateur)", 6, "Utilisation d'un logiciel pour dessiner et concevoir un objet avant de le fabriquer.");
entry("Chiffre d'affaires", 4, "Somme totale des ventes réalisées par une entreprise sur une période donnée.");
entry("Conservation", 3, "Ensemble de techniques permettant de garder un produit agricole utilisable plus longtemps.");
entry("Coût de production", 4, "Ensemble des dépenses nécessaires pour fabriquer un bien ou réaliser un service.");
entry("Distribution", 3, "Fait d'acheminer un produit du lieu de production vers les lieux de vente ou de consommation.");
entry("Écosystème marin", 1, "Ensemble des êtres vivants et de leur milieu dans la mer, en interaction les uns avec les autres.");
entry("Énergie renouvelable", 2, "Source d'énergie qui se renouvelle naturellement (soleil, vent, eau, biomasse).");
entry("Entreprise", 4, "Organisation qui produit un bien ou un service pour répondre à un besoin.");
entry("Équipe de projet", 1, "Groupe de personnes qui se répartissent des tâches pour réaliser un projet commun.");
entry("FAO (Fabrication Assistée par Ordinateur)", 6, "Utilisation d'un modèle numérique pour guider une machine qui fabrique réellement l'objet.");
entry("Impact", 1, "Effet, positif ou négatif, d'un projet sur l'environnement, la société ou l'économie locale.");
entry("Logiciel libre", 6, "Logiciel que l'on peut utiliser gratuitement et légalement.");
entry("Maquette non fonctionnelle", 2, "Représentation réduite d'un système, réalisée pour l'expliquer, jamais pour le faire fonctionner réellement.");
entry("Modèle 2D", 6, "Représentation plate (longueur et largeur) d'un objet, comme un plan.");
entry("Modèle volumique (3D)", 6, "Représentation en volume (longueur, largeur, hauteur) d'un objet, que l'on peut faire tourner à l'écran.");
entry("Modélisation", 6, "Action de représenter un objet réel ou imaginé sous une forme numérique (2D ou 3D).");
entry("Objet recyclé", 2, "Objet fabriqué à partir de matériaux réutilisés (plastique, bois, métal) plutôt que jetés.");
entry("Objet technique", 2, "Objet conçu par l'être humain pour répondre à un besoin précis.");
entry("Opportunité d'affaires", 4, "Besoin non satisfait qui pourrait être exploité par une entreprise.");
entry("Organigramme", 4, "Schéma qui montre comment les rôles sont répartis dans une organisation.");
entry("Plan d'affaires", 4, "Document qui décrit un projet d'entreprise : besoin, solution, ressources, résultats attendus.");
entry("Produits halieutiques", 1, "Produits issus de la pêche (poissons, crustacés, mollusques...).");
entry("Projet générateur de revenus", 1, "Ensemble organisé d'activités visant à répondre à un besoin tout en créant une source de revenus pour ceux qui le réalisent.");
entry("Projet intégrateur", 5, "Projet qui combine plusieurs compétences déjà développées pour résoudre un besoin plus large.");
entry("Schéma", 2, "Dessin simplifié qui représente le fonctionnement ou la structure d'un système.");
entry("Stockage", 3, "Fait de conserver un produit dans de bonnes conditions avant son utilisation ou sa vente.");
entry("Transformation", 3, "Fait de modifier un produit agricole pour créer un nouveau produit (par exemple, des fruits transformés en jus).");

await buildAndSave(children, 101, "Manuel_ETAP_9AF_Glossaire.docx");
