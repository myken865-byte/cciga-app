// Manuel d'EC 7e AF — Phase Finale : Préparation / évaluation finale + corrigé.
//
// Couvre de façon équilibrée les 7 unités/compétences réellement
// enseignées dans les Chapitres 1-7 (aucun contenu non enseigné). Reste
// une évaluation de 7e AF — ne reproduit pas le format de l'examen d'État
// de 9e AF et ne prépare pas prématurément à celui-ci (section 2 du Prompt
// Maître Phase Finale).
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
  "chapitres du Manuel d'EC 7e AF. Elle constitue une épreuve d'entraînement originale, propre à ce manuel, " +
  "et non une reproduction ni une anticipation de l'examen d'État de 9e AF.",
  { italics: true },
));
children.push(spacer(200));

children.push(sectionHeading("Rappel des notions essentielles par chapitre", ""));
children.push(threeColTable(
  ["Chapitre", "Unité", "Notions clés"],
  [
    ["1", "La nation haïtienne et l'identité", "nation, symboles nationaux, organisation territoriale, patrimoine"],
    ["2", "Droits et devoirs, citoyenneté et État", "droit/devoir, citoyen/nationalité, vocabulaire politique"],
    ["3", "État démocratique", "fonctionnement démocratique, élection, coopérative"],
    ["4", "Le principe d'égalité", "dignité, libertés fondamentales, égalité/inégalité"],
    ["5", "Résolution de conflit", "conflit positif/négatif, dialogue, négociation, pensée critique"],
    ["6", "Paix, protection et sécurité", "sécurité individuelle/collective, institutions, consignes"],
    ["7", "Protection de l'environnement", "bien collectif, patrimoine naturel, préservation"],
  ],
  [1600, 4200, 3600],
));
children.push(spacer(240));

children.push(pageBreak());
children.push(sectionHeading("Épreuve d'entraînement — EC 7e AF", ""));
children.push(bodyPar(
  "Durée indicative : 45 minutes. Barème indicatif sur 40 points, réparti selon les quatre parties ci-dessous.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie 1 — Vocabulaire et compréhension (12 points)"));
children.push(bodyPar("Complète chaque phrase avec le mot qui convient (un mot par phrase) :", { italics: true }));
children.push(numberedPar("1. Le principe selon lequel toutes les personnes ont la même valeur et les mêmes droits s'appelle l'égalité / la démocratie (entoure la bonne réponse)."));
children.push(numberedPar("2. Un État dans lequel le pouvoir appartient au peuple s'appelle un État ...................... "));
children.push(numberedPar("3. La recherche d'un accord entre personnes en désaccord s'appelle la ......................"));
children.push(numberedPar("4. Un bien qui appartient à toute une communauté s'appelle un bien ......................"));
children.push(numberedPar("5. Nomme deux institutions de sécurité étudiées dans le Chapitre 6."));
children.push(numberedPar("6. Cite deux symboles de la nation haïtienne étudiés dans le Chapitre 1."));
children.push(spacer(200));

children.push(subHeading("Partie 2 — Analyse de situation (10 points)"));
children.push(bodyPar(
  "Situation : Dans une école, deux élèves se disputent la place assise près de la fenêtre. Le ton commence à " +
  "monter.",
  { italics: true },
));
children.push(numberedPar("1. Ce conflit est-il, au départ, positif ou négatif ? Justifie."));
children.push(numberedPar("2. Décris les deux premières étapes de la méthode de dialogue étudiée au Chapitre 5 que les élèves pourraient appliquer."));
children.push(spacer(200));

children.push(subHeading("Partie 3 — Argumentation guidée (10 points)"));
children.push(numberedPar("1. Explique pourquoi le respect de la dignité de chaque personne est un principe qui relie plusieurs chapitres de ce manuel (donne au moins deux exemples tirés de chapitres différents)."));
children.push(numberedPar("2. Un camarade affirme : « Voter une seule fois suffit pour être un bon citoyen toute l'année. » Réponds-lui en t'appuyant sur au moins deux notions étudiées dans ce manuel."));
children.push(spacer(200));

children.push(subHeading("Partie 4 — Étude de situation et décision citoyenne (8 points)"));
children.push(bodyPar(
  "Situation : L'espace vert de ton école est à nouveau envahi par les déchets, quelques semaines après une " +
  "première journée d'entretien organisée par ta classe.",
  { italics: true },
));
children.push(numberedPar("1. Identifie le bien collectif concerné et explique pourquoi sa préservation concerne toute la communauté scolaire."));
children.push(numberedPar("2. Propose une décision citoyenne concrète et durable (pas seulement ponctuelle) pour que la situation ne se reproduise pas."));
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
children.push(numberedPar("1. l'égalité."));
children.push(numberedPar("2. démocratique."));
children.push(numberedPar("3. négociation."));
children.push(numberedPar("4. collectif."));
children.push(numberedPar("5. Deux institutions parmi : Police Nationale d'Haïti, Direction de la Protection Civile, mairie/autorités locales."));
children.push(numberedPar("6. Deux symboles parmi : le drapeau, l'hymne national (« La Dessalinienne »), la devise (« L'Union fait la Force »), les armoiries."));
children.push(spacer(160));

children.push(subHeading("Partie 2 — Corrigé (éléments attendus)"));
children.push(numberedPar("1. Plutôt positif au départ (désaccord simple), à condition d'être géré par le dialogue avant de dégénérer."));
children.push(numberedPar("2. Étape 1 : chacun explique calmement ce qu'il ressent et ce qu'il souhaite, sans couper la parole. Étape 2 : on reformule ce que l'autre a dit pour vérifier qu'on l'a bien compris."));
children.push(spacer(160));

children.push(subHeading("Partie 3 — Corrigé (éléments attendus)"));
children.push(numberedPar("1. Exemples possibles : Chapitre 4 (dignité de toute personne, libertés fondamentales) et Chapitre 2 (droits et devoirs reconnus à chaque citoyen) ; ou Chapitre 5 (admettre des points de vue différents sans juger) — au moins deux chapitres distincts attendus."));
children.push(numberedPar("2. Réponse attendue : la citoyenneté est une « conquête au quotidien » (Chapitre 3) qui suppose des gestes réguliers (écoute, participation, respect des règles, engagement pour un bien collectif), pas seulement un acte ponctuel de vote."));
children.push(spacer(160));

children.push(subHeading("Partie 4 — Corrigé (éléments attendus)"));
children.push(numberedPar("1. L'espace vert est un bien collectif : il appartient à toute la communauté scolaire, sans appartenir à une seule personne ; sa dégradation affecte donc tout le monde, pas seulement ceux qui l'ont observée."));
children.push(numberedPar("2. Décision durable attendue : mettre en place un roulement régulier de responsabilités entre élèves (pas seulement une journée ponctuelle), avec un rappel des règles de respect du bien collectif — cohérent avec le Projet du Chapitre 7."));

await buildAndSave(children, 75, "Manuel_EC_7AF_EvaluationFinale.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\11_EVALUATION_FINALE");
