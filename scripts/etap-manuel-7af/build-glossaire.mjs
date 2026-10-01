// Manuel d'ETAP 7e AF — Glossaire final (Etape F4 de la Phase finale).
// Constitue exclusivement a partir des termes figurant reellement dans les
// blocs "Mots-cles du chapitre" des Chapitres 1 a 6 (deja curates au moment
// de la redaction de chaque chapitre). Doublons/variantes fusionnes :
// "demarche technologique" (Ch.1) et "demarche de projet" (Ch.6) regroupes
// en une seule entree, le Chapitre 6 reprenant explicitement la meme notion.
// Aucun terme n'a ete ajoute pour completer artificiellement la liste.
import {
  bodyPar, spacer, pageBreak, AlignmentType, TextRun, Paragraph, VERT, GREY_TEXT,
  buildAndSave,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "GLOSSAIRE", bold: true, size: 44, color: VERT, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ce glossaire regroupe, par ordre alphabétique, les termes essentiels employés dans les six chapitres du " +
  "Manuel d'ETAP 7e AF. Les définitions sont volontairement courtes et adaptées au niveau de la 7e Année " +
  "Fondamentale.",
));
children.push(spacer(200));

const terms = [
  ["Actionneur", "Dispositif qui agit en réponse à une commande, souvent après qu'un capteur a détecté quelque chose (une lampe, un moteur...)."],
  ["Amélioration", "Changement apporté à une solution ou à un projet pour le rendre plus efficace, après l'avoir testé ou évalué."],
  ["Autoévaluation", "Moment où l'on réfléchit soi-même à ce qui a bien ou moins bien fonctionné dans son travail."],
  ["Besoin", "Ce à quoi une solution, un projet ou une activité doit répondre."],
  ["Bien", "Objet matériel produit pour être utilisé ou vendu."],
  ["Bit", "La plus petite unité de mesure de l'information numérique."],
  ["Capteur", "Dispositif qui perçoit un phénomène de son environnement (lumière, température, mouvement...)."],
  ["Collecte", "Action de rassembler les déchets pour les traiter."],
  ["Coopérative", "Entreprise où un groupe de personnes s'associe pour gérer ensemble une activité."],
  ["Cycle de vie (d'un objet technique)", "Ensemble des étapes de la vie d'un objet, de sa fabrication à sa fin d'usage."],
  ["Démarche technologique (ou démarche de projet)", "Suite d'étapes permettant de passer d'un besoin à une solution : identifier le besoin, rechercher des solutions, choisir et préparer, réaliser, tester et évaluer, améliorer si nécessaire."],
  ["Écosystème marin", "Ensemble des êtres vivants et de leur milieu dans la mer."],
  ["Engrais", "Produit biologique utilisé pour nourrir le sol."],
  ["Entreprise", "Organisation qui produit un bien ou un service pour répondre à un besoin."],
  ["Entreprise individuelle", "Entreprise dirigée et possédée par une seule personne."],
  ["Environnement de l'entreprise", "Ensemble des facteurs extérieurs à une entreprise qui ont une influence directe ou indirecte sur elle (clients, communauté, ressources naturelles...)."],
  ["Fiche projet", "Outil qui accompagne un groupe tout au long d'un projet, en rassemblant ses informations essentielles (besoin, objectif, étapes, rôles...)."],
  ["GPS", "Outil informatisé qui indique la position d'une personne ou d'un véhicule."],
  ["Grande entreprise", "Entreprise employant de nombreuses personnes, souvent organisée en plusieurs services."],
  ["Herbicide", "Produit phytosanitaire utilisé contre les mauvaises herbes."],
  ["Ingénieur environnement", "Personne qui étudie l'impact des déchets ou des activités humaines sur l'environnement et propose des solutions."],
  ["Insecticide", "Produit phytosanitaire utilisé pour protéger les cultures contre les insectes."],
  ["Métier navigant", "Métier exercé en mer, à bord d'une embarcation."],
  ["Métier non navigant", "Métier lié à la mer mais exercé sur la terre ferme (port, quai)."],
  ["Motoculteur", "Outil mécanisé (motorisé) qui permet de préparer le sol plus rapidement qu'à la main."],
  ["Octet", "Unité de mesure de l'information numérique regroupant 8 bits."],
  ["Organisation sociale", "Façon dont les rôles et les tâches sont répartis entre les personnes dans une activité ou un métier."],
  ["Outil biologique", "Élément vivant utilisé en agriculture, comme une semence ou un engrais."],
  ["Outil informatisé", "Outil utilisant un logiciel ou une application pour aider au travail."],
  ["Outil manuel", "Outil utilisé directement à la main, sans moteur."],
  ["Outil mécanisé", "Outil ou machine équipé d'un moteur pour faciliter le travail."],
  ["Outil numérique", "Objet technique qui traite, stocke ou transmet de l'information (ordinateur, tablette, smartphone...)."],
  ["Petite et moyenne entreprise (PME)", "Entreprise de taille limitée, employant quelques personnes."],
  ["Présentation", "Moment où l'on explique son travail ou son projet à d'autres personnes."],
  ["Préservation de la ressource (marine)", "Ensemble des pratiques qui permettent de ne pas épuiser une ressource naturelle."],
  ["Production animale", "Activité agricole liée à l'élevage des animaux."],
  ["Production végétale", "Activité agricole liée à la culture des plantes."],
  ["Produit phytosanitaire", "Produit utilisé pour protéger les cultures (fongicide, insecticide, herbicide)."],
  ["Radio VHF", "Outil informatisé qui permet de communiquer, notamment en mer."],
  ["Recyclable", "Se dit d'un objet qui peut être transformé pour fabriquer un nouvel objet."],
  ["Réemploi", "Fait de donner un nouvel usage à un objet en fin de vie, sans le transformer complètement."],
  ["Réseau informatique", "Ensemble d'appareils reliés entre eux pour échanger des informations."],
  ["Réseau sans fil", "Moyen de faire communiquer des appareils sans câble (Wi-Fi, Bluetooth, WiMax)."],
  ["Ressources", "Ce dont on a besoin pour réaliser une activité ou un projet (matériel, personnes, informations, argent...)."],
  ["Revalorisation", "Action de redonner de la valeur à un déchet ou à un objet usagé."],
  ["Rôle", "Tâche ou responsabilité confiée à une personne dans un groupe ou une organisation."],
  ["Secteur primaire", "Secteur d'activité qui exploite directement les ressources naturelles (pêche, agriculture, recyclage...)."],
  ["Secteur secondaire", "Secteur d'activité qui transforme des matières en produits."],
  ["Secteur tertiaire", "Secteur d'activité qui propose des services."],
  ["Sécurité", "Ensemble des règles et comportements permettant d'éviter les risques et les accidents."],
  ["Service", "Action réalisée pour répondre à un besoin, sans production d'objet matériel."],
  ["Solution", "Réponse proposée à un besoin ou à un problème."],
  ["Statut juridique", "Forme légale que peut prendre une entreprise (entreprise individuelle, coopérative, société...)."],
  ["Technicien de traitement de déchets", "Personne qui prépare et transforme les déchets collectés."],
  ["Traitement (des déchets)", "Étape du recyclage qui consiste à préparer les matériaux triés (nettoyage, transformation...)."],
  ["Transport maritime", "Activité qui consiste à déplacer des personnes ou des marchandises par bateau."],
  ["Tri", "Action de séparer les déchets selon leur type."],
  ["Très petite entreprise", "Entreprise dirigée par une seule personne ou une famille."],
];

terms.forEach(([term, def]) => {
  children.push(new Paragraph({
    spacing: { after: 120, line: 276 },
    children: [
      new TextRun({ text: `${term} — `, bold: true, size: 24, color: VERT, font: "Calibri" }),
      new TextRun({ text: def, size: 24, font: "Calibri" }),
    ],
  }));
});

await buildAndSave(children, 100, "Manuel_ETAP_7AF_Glossaire.docx");
