// Manuel d'EC 8e AF — Chapitre 4 : S'engager pour l'égalité
// (Unité 4 — Penser l'autre comme soi-même : le principe d'égalité,
// Compétences C1, C2, C3).
//
// Prolonge les Chapitres 1-3 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 29 (Chapitre 1 = pages 1-9,
// Chapitre 2 = pages 10-19, Chapitre 3 = pages 20-28).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.36-37 : Unité 4, colonne 8e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`,
//     [ADAPTATION DE LECTURE] pour la segmentation par année, contenu
//     lui-même verbatim) : "Notion de respect de soi et de l'autre,
//     tolérance, éthique individuelle et collective. Engagement citoyen
//     pour le respect des principes d'égalité, entr'aide. Droits relatifs
//     à l'éducation et à la scolarité, participation démocratique en
//     classe."
//   - `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md` (verrouillée sans changement
//     dans `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`) : situation de départ
//     "un projet d'entraide concret entre élèves" ; activité "projet de
//     classe sur l'égalité".
//
// PROGRESSION RÉELLE 7e → 8e AF (section 4 du prompt) :
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md` décrit explicitement
// le passage attendu : « de la connaissance des droits (7e) à l'engagement
// citoyen actif nommé pour l'égalité (8e), puis à l'engagement sociétal
// inclusif (9e) ». Le Chapitre 4 de 7e AF (déjà finalisé, NON modifié ici)
// a construit la CONNAISSANCE : dignité, tolérance, libertés fondamentales,
// égalité/inégalité, droit à l'information. CES NOTIONS NE SONT PAS
// REDÉFINIES ICI : elles sont mobilisées comme acquis (rappel bref, section
// 4.1) pour construire un contenu réellement nouveau — le passage de la
// connaissance à l'ENGAGEMENT CONCRET, à travers l'entraide organisée entre
// élèves. La source répète la formule « respect de soi et de l'autre,
// tolérance » à l'identique sur les 3 années (risque de répétition
// documenté) : ce chapitre ne la reprend pas, conformément à la
// recommandation de différencier par l'ampleur de l'engagement, pas par un
// contenu factuel nouveau.
//
// LE SUJET « DOMESTICITÉ / TRAVAIL DES ENFANTS » (déjà traité en 7e AF,
// Chapitre 4) N'EST PAS REPRIS ICI. Ce chapitre porte sur l'entraide entre
// pairs à l'école, pas sur le travail des enfants.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_SITUATION_FILL, BOX_SITUATION_LINE,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE,
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE,
  BOX_DEBAT_FILL, BOX_DEBAT_LINE,
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE,
  BOX_PROJET_FILL, BOX_PROJET_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BLEU_CIVIQUE, OR_CITOYEN, VERT_COMMUNAUTAIRE, ANTHRACITE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  4,
  "S'engager pour l'égalité",
  "Savoir qu'un droit à l'éducation existe pour tous, c'est une chose. Faire en sorte, concrètement, qu'un " +
  "camarade en difficulté puisse réellement suivre les cours, c'est autre chose. Ce chapitre te fait passer " +
  "de la connaissance à l'action : t'engager, avec ta classe, pour une égalité réelle.",
  [
    "Distinguer connaître un droit et s'engager activement pour le faire vivre.",
    "Comprendre l'entraide comme une forme concrète d'engagement pour l'égalité.",
    "Analyser une situation d'inégalité vécue en classe et proposer une réponse d'entraide.",
    "Participer à un projet de classe favorisant une participation inclusive de chacun.",
    "Mettre en place un projet concret d'entraide entre élèves.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un cahier qui manque",
  [
    "Dans une classe de 8e AF, un élève arrive régulièrement sans cahier ni fournitures, sans jamais " +
    "l'expliquer. Un camarade propose, à voix basse : « On pourrait s'organiser entre nous, non ? » Ce " +
    "chapitre part de cette proposition simple pour construire un véritable engagement de classe pour " +
    "l'égalité.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (acquis de la 7e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris ce qu'est la dignité, la tolérance, les libertés fondamentales, et la différence " +
  "entre égalité et inégalité. Ce chapitre ne redéfinit pas ces notions : il s'appuie dessus pour passer de " +
  "la connaissance de l'égalité à un engagement concret et organisé.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Engagement citoyen — implication active et volontaire d'une personne dans une action au service de la collectivité, au-delà de la simple connaissance d'un principe."));
children.push(bulletPar("Entraide — soutien mutuel organisé entre personnes, pour que chacune puisse surmonter une difficulté."));
children.push(bulletPar("Solidarité — sentiment de responsabilité partagée qui pousse à s'entraider au sein d'un groupe."));
children.push(bulletPar("Participation inclusive — participation organisée de façon à ce que chaque personne, quelle que soit sa situation, puisse réellement y prendre part."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("De la connaissance à l'engagement", "4.1"));
children.push(bodyPar(
  "Connaître le principe d'égalité, comme tu l'as fait en 7e AF, est une première étape nécessaire. Mais " +
  "connaître un principe ne suffit pas à le rendre réel dans le quotidien : il faut aussi s'engager, " +
  "c'est-à-dire agir concrètement pour qu'il se traduise en actes.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Connaître n'est pas s'engager",
  [
    "Connaître un droit : savoir qu'il existe et pouvoir l'expliquer (ce que tu as appris en 7e AF).",
    "S'engager pour ce droit : agir concrètement, avec d'autres, pour qu'il soit mieux respecté dans la " +
    "réalité (ce que ce chapitre te propose de faire).",
    "Un engagement citoyen peut être modeste (une action simple, à l'échelle de la classe) et rester réel et " +
    "utile.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C04-01",
  "Ouverture — Le cahier qui manque",
  "Une scène de classe haïtienne crédible, avec un élève sans fournitures et un camarade qui s'approche " +
  "discrètement pour proposer de l'aide, dans un style illustratif cohérent avec la charte EC, sans " +
  "stigmatiser l'élève concerné.",
  "Une situation simple et respectueuse illustre le passage de la connaissance à l'engagement concret.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire réaliste et bienveillante.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("L'entraide, une forme concrète d'engagement", "4.2"));
children.push(bodyPar(
  "L'entraide consiste à organiser, entre plusieurs personnes, un soutien mutuel face à une difficulté. À " +
  "l'échelle d'une classe, elle peut prendre des formes simples et efficaces.",
));
children.push(threeColTable(
  ["Forme d'entraide", "Ce qu'elle permet", "Exemple concret"],
  [
    ["Partage de fournitures", "Réduire l'impact d'un manque matériel", "Un fonds ou un coin de classe pour du matériel partagé"],
    ["Tutorat entre pairs", "Soutenir la réussite scolaire de chacun", "Un élève à l'aise dans une matière aide un camarade"],
    ["Écoute et soutien", "Prévenir l'isolement d'un camarade en difficulté", "Un système de « camarades référents »"],
  ],
  [2600, 3600, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces formes d'entraide ne remplacent pas les obligations de l'État étudiées au Chapitre 2 : elles agissent " +
  "à une échelle différente, complémentaire — celle que les élèves peuvent directement organiser eux-mêmes.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C04-02",
  "Exemple analysé — trois formes d'entraide de classe",
  "Une planche illustrée en trois vignettes montrant : un coin de fournitures partagées, une séance de " +
  "tutorat entre deux élèves, un moment d'écoute entre camarades — cohérente avec la charte EC.",
  "L'entraide de classe peut prendre plusieurs formes concrètes et complémentaires.",
  "Donner une référence visuelle claire des formes d'entraide étudiées.",
  "Illustration demi-page, planche en trois vignettes, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Participer de façon inclusive à la vie de classe", "4.3"));
children.push(bodyPar(
  "En 7e AF, tu as découvert que le droit à l'éducation est lié à la participation démocratique en classe. Ce " +
  "chapitre approfondit cette idée : une classe n'est réellement démocratique que si CHAQUE élève, quelle que " +
  "soit sa situation (matérielle, scolaire, personnelle), peut effectivement y participer — pas seulement " +
  "ceux qui en ont le plus facilement les moyens.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Participation et inclusion",
  [
    "Organiser un vote de classe à un moment où tous les élèves sont présents et informés, plutôt qu'à un " +
    "moment qui exclurait certains.",
    "Adapter une activité pour qu'un élève rencontrant une difficulté particulière (matérielle, scolaire) " +
    "puisse y participer pleinement.",
    "Veiller à ce que la prise de parole en classe ne soit pas réservée aux mêmes élèves.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "ÉTUDE DE CAS — Organiser l'entraide sans stigmatiser",
  [
    "Reprends la situation d'ouverture : un élève arrive régulièrement sans fournitures. Sa classe souhaite " +
    "organiser une entraide, mais certains élèves proposent de « désigner publiquement » les élèves qui " +
    "reçoivent de l'aide, pour que « ce soit clair pour tout le monde ».",
    "1. Quel est le risque de cette proposition pour l'élève concerné ?",
    "2. Comment organiser l'entraide de façon efficace tout en respectant la dignité de chacun (notion vue en " +
    "7e AF, à mobiliser ici) ?",
    "3. Propose une méthode concrète d'entraide qui évite ce risque.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — L'entraide doit-elle être organisée ou spontanée ?",
  [
    "Certains pensent que l'entraide fonctionne mieux si elle est organisée par des règles claires (tour de " +
    "rôle, système établi). D'autres pensent qu'elle doit rester spontanée, pour ne pas devenir une obligation " +
    "pesante.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Diagnostic des besoins de la classe"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Identifier, de façon respectueuse et anonyme, les types de besoins qui pourraient bénéficier " +
    "d'une entraide de classe (matériel, tutorat, écoute).",
    "CONSIGNES : Avec l'enseignant(e), propose un moyen anonyme de recueillir les besoins (boîte à idées, " +
    "questionnaire anonyme).",
    "ÉTAPES : 1. Définir les catégories de besoins possibles. 2. Recueillir les besoins de façon anonyme. 3. " +
    "Analyser les résultats en groupe, sans chercher à identifier qui a répondu quoi. 4. Proposer des pistes " +
    "d'entraide adaptées aux besoins recueillis.",
    "RÉSULTAT ATTENDU : Une vision claire, respectueuse de l'anonymat, des besoins réels de la classe, prête " +
    "à nourrir le projet d'entraide.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Mettre en place un système d'entraide de classe"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit un projet de classe sur l'égalité, fondé sur l'entraide. [OFFICIEL — " +
    "activité prévue par le programme]",
    "OBJECTIF : Mettre en place, à partir des besoins identifiés, un système d'entraide durable et respectueux " +
    "de la dignité de chacun.",
    "ÉTAPES : 1. Choisir une ou deux formes d'entraide (fournitures, tutorat, écoute) adaptées aux besoins " +
    "identifiés. 2. Définir des règles simples et non stigmatisantes de fonctionnement. 3. Lancer le système " +
    "pour une période d'essai. 4. Évaluer, après quelques semaines, ce qui fonctionne et ce qui doit être " +
    "ajusté.",
    "Ce projet applique directement, à l'échelle de la classe, le passage de la connaissance à l'engagement " +
    "étudié dans ce chapitre.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C04-03",
  "Espace de production — le règlement de notre système d'entraide",
  "Un cadre vide, format portrait, structuré en une liste à compléter (forme d'entraide choisie, règles de " +
  "fonctionnement, responsables), prévu pour que l'élève y consigne les décisions prises par la classe.",
  "Offrir un espace direct de production pour ancrer la mise en place réelle du système d'entraide.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, liste à compléter, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Connaître un principe d'égalité ne suffit pas : s'y engager suppose une action concrète et organisée.",
    "L'entraide (fournitures, tutorat, écoute) est une forme accessible d'engagement citoyen à l'échelle de " +
    "la classe.",
    "Une participation réellement démocratique en classe doit être inclusive : accessible à chaque élève, " +
    "quelle que soit sa situation.",
    "Organiser l'entraide sans stigmatiser suppose de respecter la dignité et la discrétion de chacun.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de distinguer connaître un droit et s'y engager, de découvrir l'entraide comme forme " +
  "concrète d'engagement pour l'égalité, d'analyser comment l'organiser sans stigmatiser, et de participer à " +
  "la mise en place d'un système d'entraide réel dans la classe — une progression réelle par rapport à la " +
  "simple connaissance de l'égalité construite en 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "engagement citoyen · entraide · solidarité · participation inclusive.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer la différence entre connaître un droit et s'engager pour lui.",
    "☐ Citer au moins deux formes concrètes d'entraide entre élèves.",
    "☐ Expliquer ce qu'est une participation inclusive en classe.",
    "☐ Proposer une méthode d'entraide qui respecte la dignité de chacun.",
    "☐ Décrire les grandes étapes de la mise en place d'un projet d'entraide.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : engagement citoyen, entraide, solidarité, participation inclusive.",
    "Vocabulaire clé à maîtriser : engagement citoyen, entraide, participation inclusive.",
    "Avant l'évaluation, vérifie que tu peux : distinguer connaissance et engagement ; proposer une forme " +
    "d'entraide adaptée à une situation donnée ; expliquer comment éviter la stigmatisation.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec la structure officielle full-cycle sur " +
    "l'engagement pour l'égalité, centrée ici sur un projet concret d'entraide [OFFICIEL, adapté au niveau " +
    "8e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(4));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "engagement citoyen · entraide · solidarité · participation inclusive.",
  { italics: true },
));
children.push(numberedPar("1. L'implication active dans une action au service de la collectivité s'appelle un ......................"));
children.push(numberedPar("2. Le soutien mutuel organisé entre personnes pour surmonter une difficulté s'appelle l'......................"));
children.push(numberedPar("3. Le sentiment de responsabilité partagée qui pousse à s'entraider s'appelle la ......................"));
children.push(numberedPar("4. Une participation organisée pour que chacun puisse réellement y prendre part s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite trois formes d'entraide de classe étudiées dans ce chapitre."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Connaître un droit suffit à garantir qu'il soit respecté dans la réalité. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique la différence entre connaître le principe d'égalité et s'engager pour lui, avec un exemple du chapitre."));
children.push(numberedPar("2. Pourquoi une participation démocratique en classe doit-elle être inclusive pour être réellement démocratique ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas de l'élève sans fournitures. Propose une méthode d'entraide précise qui évite toute stigmatisation."));
children.push(numberedPar("2. Décris, étape par étape, comment ta classe pourrait mettre en place un système d'entraide, en t'appuyant sur ce que tu as appris."));
children.push(numberedPar("3. Un camarade affirme : « L'entraide, c'est bien, mais ce n'est pas vraiment un engagement citoyen. » Que lui réponds-tu, en t'appuyant sur ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-8AF-C04-04",
  "Synthèse — S'engager pour l'égalité",
  "Une carte mentale simple centrée sur « Engagement pour l'égalité », avec des branches vers : connaissance " +
  "vs engagement, formes d'entraide, participation inclusive, projet de classe.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 29, "Manuel_EC_8AF_Chapitre4.docx");
