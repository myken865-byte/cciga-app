// Manuel d'EC 8e AF — Phase Finale : Préparation / évaluation finale + corrigé.
//
// Couvre de façon équilibrée les 7 unités/compétences réellement
// enseignées dans les Chapitres 1-7 (aucun contenu non enseigné). Reste
// une évaluation de 8e AF — n'est pas présentée comme une épreuve
// officielle MENFP et ne prépare pas prématurément à l'examen d'État de
// 9e AF.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, threeColTable, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BLEU_CIVIQUE, OR_CITOYEN, ANTHRACITE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Préparation à l'évaluation finale", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(bodyPar(
  "Cette préparation finale reprend, de façon équilibrée, les notions et compétences travaillées dans les 7 " +
  "chapitres du Manuel d'EC 8e AF. Elle constitue une épreuve d'entraînement originale, propre à ce manuel, " +
  "et non une reproduction d'une épreuve officielle MENFP, ni une préparation prématurée à l'examen d'État de " +
  "9e AF.",
  { italics: true },
));
children.push(spacer(200));

children.push(sectionHeading("Rappel des notions essentielles par chapitre", ""));
children.push(threeColTable(
  ["Chapitre", "Unité", "Notions clés"],
  [
    ["1", "La nation haïtienne dans la Caraïbe", "nation caribéenne, valeur universelle, comparaison interculturelle"],
    ["2", "Approfondir mes droits", "droits civils/politiques, droits économiques/sociaux, obligation de l'État"],
    ["3", "La séparation des pouvoirs", "pouvoir exécutif/législatif/judiciaire, équilibre des pouvoirs"],
    ["4", "S'engager pour l'égalité", "engagement citoyen, entraide, participation inclusive"],
    ["5", "Débattre et argumenter pour la justice", "argumentaire, thèse, justice civile/pénale, présomption d'innocence"],
    ["6", "Cultiver la paix", "approche réactive/proactive, culture de la paix, charte de classe"],
    ["7", "Gérer nos ressources durablement", "ressource renouvelable, gestion durable, déboisement/reboisement"],
  ],
  [1600, 4400, 3400],
));
children.push(spacer(240));

children.push(pageBreak());
children.push(sectionHeading("Épreuve d'entraînement — EC 8e AF", ""));
children.push(bodyPar(
  "Durée indicative : 50 minutes. Barème indicatif sur 40 points, réparti selon les quatre parties " +
  "ci-dessous.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie 1 — Vocabulaire et compréhension (10 points)"));
children.push(numberedPar("1. Distingue en une phrase droits civils/politiques et droits économiques/sociaux."));
children.push(numberedPar("2. Nomme les trois pouvoirs de l'État et leur fonction principale."));
children.push(numberedPar("3. Qu'est-ce qu'une ressource renouvelable ? Donne un exemple."));
children.push(numberedPar("4. Que signifie la présomption d'innocence ?"));
children.push(spacer(200));

children.push(subHeading("Partie 2 — Analyse de situation (12 points)"));
children.push(bodyPar(
  "Situation : Une commune souhaite installer des caméras de surveillance près d'une école pour réduire les " +
  "vols, mais certains parents s'inquiètent du coût et du respect de la vie privée des élèves.",
  { italics: true },
));
children.push(numberedPar("1. Identifie les acteurs concernés par cette décision et le rôle que pourrait jouer chacun des trois pouvoirs de l'État dans un tel projet."));
children.push(numberedPar("2. Cette situation relève-t-elle davantage d'une approche réactive ou proactive de la sécurité ? Justifie."));
children.push(spacer(200));

children.push(subHeading("Partie 3 — Argumentation structurée (10 points)"));
children.push(numberedPar("1. Construis un argumentaire complet (thèse, deux arguments, un contre-argument anticipé, conclusion) sur la question : « Faut-il installer les caméras de surveillance près de l'école ? »"));
children.push(spacer(200));

children.push(subHeading("Partie 4 — Étude de situation et décision citoyenne (8 points)"));
children.push(bodyPar(
  "Situation : Ta classe souhaite mettre en place un projet concret d'engagement citoyen, au choix parmi : un " +
  "système d'entraide, une charte de classe pour la paix, ou un projet de reboisement.",
  { italics: true },
));
children.push(numberedPar("1. Choisis un projet et explique en quoi il applique une progression réelle par rapport à ce que tu avais appris en 7e AF (pas une simple répétition)."));
children.push(numberedPar("2. Propose une étape concrète de mise en œuvre de ce projet."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Corrigé de l'épreuve d'entraînement", ""));
children.push(bodyPar(
  "Comme pour les corrigés de chapitre, les réponses aux questions ouvertes sont fournies comme éléments de " +
  "réponse attendus, pas comme formulation unique obligatoire.",
  { italics: true },
));
children.push(spacer(160));

children.push(subHeading("Partie 1 — Corrigé"));
children.push(numberedPar("1. Les droits civils/politiques protègent la liberté individuelle et la participation politique ; les droits économiques/sociaux concernent les conditions de vie (travail, éducation, santé)."));
children.push(numberedPar("2. Exécutif (diriger/appliquer les lois), législatif (proposer/voter les lois), judiciaire (trancher les désaccords)."));
children.push(numberedPar("3. Une ressource qui peut se régénérer avec le temps si elle est utilisée raisonnablement (ex. forêt, eau)."));
children.push(numberedPar("4. Une personne accusée est considérée innocente tant que sa culpabilité n'a pas été prouvée."));
children.push(spacer(160));

children.push(subHeading("Partie 2 — Corrigé (éléments attendus)"));
children.push(numberedPar("1. Acteurs : commune/mairie (exécutif local), parents, élèves. Législatif : pourrait encadrer par une règle générale ; exécutif : mettrait en œuvre le projet ; judiciaire : trancherait un éventuel litige sur la vie privée."));
children.push(numberedPar("2. Approche proactive : installer des caméras avant qu'un incident grave ne survienne, dans une logique de prévention."));
children.push(spacer(160));

children.push(subHeading("Partie 3 — Corrigé (éléments attendus)"));
children.push(numberedPar("1. Thèse claire (pour ou contre) ; deux arguments distincts et pertinents ; un contre-argument sérieux anticipé (coût, vie privée, ou efficacité) ; conclusion qui tient compte de la discussion — structure conforme à la méthode du Chapitre 5."));
children.push(spacer(160));

children.push(subHeading("Partie 4 — Corrigé (éléments attendus)"));
children.push(numberedPar("1. Réponse attendue : montrer un passage de la connaissance (7e AF) à l'engagement concret et structuré (8e AF) — par exemple l'entraide organisée avec règles précises, plutôt qu'une simple sensibilisation."));
children.push(numberedPar("2. Étape concrète, réaliste et cohérente avec le projet choisi."));

await buildAndSave(children, 72, "Manuel_EC_8AF_EvaluationFinale.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_8e_AF\\11_EVALUATION_FINALE");
