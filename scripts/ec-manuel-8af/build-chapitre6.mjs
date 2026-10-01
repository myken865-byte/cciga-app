// Manuel d'EC 8e AF — Chapitre 6 : Cultiver la paix
// (Unité 6 — La paix, la protection et la sécurité, Compétences C1, C2,
// C3).
//
// Prolonge les Chapitres 1-5 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 47 (Chapitre 1 = pages 1-9,
// Chapitre 2 = pages 10-19, Chapitre 3 = pages 20-28, Chapitre 4 = pages
// 29-37, Chapitre 5 = pages 38-46).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.38-40 : Unité 6, colonne 8e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`,
//     [ADAPTATION DE LECTURE] pour la segmentation par année, contenu
//     lui-même verbatim) : "L'engagement du citoyen dans les activités
//     visant à garantir la paix, la protection individuelle et collective,
//     la sécurité. La culture de la paix."
//   - `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md` (verrouillée sans changement
//     dans `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`) : situation de départ
//     "une initiative locale de prévention de la violence" ; activité
//     "projet ou charte de classe pour la culture de la paix".
//
// VIGILANCE DOCUMENTÉE (proximité 7e/8e AF, section 4 du prompt) :
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md` signale que les
// différences réelles entre 7e et 8e AF sur cette unité sont « plus
// ténues » qu'entre 8e et 9e AF (marqueur de segmentation reconstruit,
// statut [À VÉRIFIER — PREUVE INSUFFISANTE] maintenu pour cette unité).
// Le Chapitre 6 de 7e AF (déjà finalisé, NON modifié ici) a construit une
// approche RÉACTIVE et INSTITUTIONNELLE de la sécurité : identifier les
// institutions de sécurité (Police Nationale d'Haïti, Direction de la
// Protection Civile), analyser une consigne de sécurité, adopter des
// comportements prudents face à un risque déjà présent. CES ACQUIS NE SONT
// PAS REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref, section 6.1) pour
// construire un contenu réellement nouveau — la « culture de la paix »,
// explicitement identifiée par la matrice de progression comme dimension
// RÉFLEXIVE et PROACTIVE propre à la 8e AF : agir en amont, par des valeurs
// et des pratiques collectives, pour PRÉVENIR les tensions, plutôt que
// seulement réagir à un danger déjà présent.
//
// NEUTRALITÉ (section 9 du prompt) : le concept de « culture de la paix »
// est un concept international reconnu (popularisé notamment par une
// déclaration des Nations Unies de 1999) [ADAPTATION PÉDAGOGIQUE, mention
// générale non vérifiée en direct sur une source institutionnelle pendant
// cette session], présenté ici de façon factuelle et non partisane, sans
// lien avec un gouvernement, un parti ou une période politique haïtienne
// précise.
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
  6,
  "Cultiver la paix",
  "En 7e AF, tu as appris à réagir face à un danger déjà présent : suivre une consigne, identifier une " +
  "institution de sécurité. Ce chapitre te propose d'aller plus loin : agir en amont, avant qu'un problème " +
  "n'apparaisse, pour cultiver activement un climat de paix — dans ta classe, ton école, ta communauté.",
  [
    "Distinguer une approche réactive et une approche proactive de la paix.",
    "Définir ce qu'est une culture de la paix.",
    "Analyser une initiative locale de prévention de la violence.",
    "Participer à un débat raisonné sur la prévention des tensions.",
    "Élaborer une charte de classe pour la culture de la paix.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un club de médiation entre élèves",
  [
    "Dans une école haïtienne, un groupe d'élèves plus âgés a mis en place un petit « club de médiation » : " +
    "avant qu'un désaccord ne dégénère, ils proposent d'aider leurs camarades à en parler calmement. « On " +
    "n'attend pas que ça devienne grave », explique l'un d'eux. Ce chapitre part de cette initiative pour " +
    "comprendre ce que signifie « cultiver » la paix, plutôt que seulement réagir aux problèmes.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (acquis de la 7e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as identifié des institutions de sécurité et appris à analyser une consigne de sécurité face " +
  "à un danger déjà présent. Ce chapitre ne redéveloppe pas ces acquis : il s'appuie dessus pour construire " +
  "une approche différente et complémentaire — agir avant que le problème n'apparaisse.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Culture de la paix — ensemble de valeurs, d'attitudes et de pratiques collectives qui rejettent la violence et cherchent à prévenir les tensions avant qu'elles n'éclatent."));
children.push(bulletPar("Prévention — ensemble d'actions menées à l'avance pour éviter qu'un problème ne se produise."));
children.push(bulletPar("Non-violence — refus actif de recourir à la violence pour résoudre un désaccord, au profit du dialogue et de la coopération."));
children.push(bulletPar("Charte — document écrit, élaboré collectivement, qui fixe des engagements ou des règles partagées par un groupe."));
children.push(bulletPar("Cohésion sociale — qualité des liens qui unissent les membres d'une communauté et leur permettent de vivre ensemble sereinement."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("D'une approche réactive à une approche proactive", "6.1"));
children.push(bodyPar(
  "Assurer sa sécurité, comme tu l'as appris en 7e AF, consiste souvent à réagir face à un danger déjà " +
  "présent. Cultiver la paix va plus loin : c'est agir en amont, avant qu'un problème n'apparaisse, pour " +
  "créer un climat qui rend les tensions moins probables.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Réagir ou prévenir ?",
  [
    "Approche réactive (7e AF) : suivre une consigne de sécurité, identifier l'institution compétente, une " +
    "fois qu'un danger est déjà présent.",
    "Approche proactive (8e AF) : construire, en amont, des habitudes, des valeurs et des pratiques " +
    "collectives qui réduisent les risques de tension ou de violence.",
    "Les deux approches sont complémentaires : l'une n'annule pas l'autre.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C06-01",
  "Ouverture — Le club de médiation",
  "Une scène d'école haïtienne crédible montrant un petit groupe d'élèves aidant deux camarades à discuter " +
  "calmement avant qu'un désaccord ne s'aggrave, dans un style illustratif cohérent avec la charte EC.",
  "Une initiative de prévention par les élèves eux-mêmes illustre concrètement la culture de la paix.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire constructive et non alarmante.",
  "Illustration pleine largeur, scène scolaire haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Qu'est-ce que la culture de la paix ?", "6.2"));
children.push(bodyPar(
  "La culture de la paix est un ensemble de valeurs, d'attitudes et de pratiques qui rejettent la violence et " +
  "cherchent à en prévenir les causes — plutôt que de simplement réagir une fois qu'elle a éclaté. Ce concept " +
  "est reconnu internationalement comme une orientation utile pour bâtir des sociétés plus stables et plus " +
  "solidaires.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Les piliers d'une culture de la paix",
  [
    "Le dialogue et la coopération plutôt que l'affrontement.",
    "Le respect de la diversité et des différences.",
    "L'éducation à la résolution non-violente des conflits (notion déjà pratiquée en 7e AF avec le dialogue " +
    "et la négociation).",
    "L'engagement communautaire pour prévenir les tensions avant qu'elles ne s'aggravent.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C06-02",
  "Exemple analysé — les piliers de la culture de la paix",
  "Un schéma en forme de colonnes soutenant un toit commun « Culture de la paix », chaque colonne représentant " +
  "un pilier (dialogue, respect de la diversité, résolution non-violente, engagement communautaire), cohérent " +
  "avec la charte EC.",
  "La culture de la paix repose sur plusieurs piliers complémentaires.",
  "Donner une référence visuelle claire et mémorisable des piliers de la culture de la paix.",
  "Illustration demi-page, schéma en colonnes, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Une initiative locale de prévention", "6.3"));
children.push(bodyPar(
  "Partout en Haïti, des initiatives locales — parfois modestes, parfois plus organisées — cherchent à " +
  "prévenir la violence avant qu'elle n'éclate : activités sportives ou culturelles pour les jeunes, groupes " +
  "de médiation entre voisins, projets communautaires rassembleurs.",
));
children.push(calloutBox(
  "ÉTUDE DE CAS — Une initiative locale de prévention de la violence",
  [
    "Dans un quartier, un groupe de jeunes organise chaque semaine un tournoi sportif ouvert à tous, " +
    "notamment pour occuper positivement le temps libre et créer des liens entre jeunes de différents " +
    "quartiers voisins, parfois en tension.",
    "1. En quoi cette initiative relève-t-elle d'une approche proactive plutôt que réactive ?",
    "2. Quels piliers de la culture de la paix, étudiés dans ce chapitre, reconnais-tu dans cette initiative ?",
    "3. Une telle initiative peut-elle, à elle seule, garantir l'absence de toute tension ? Pourquoi une " +
    "réponse nuancée est-elle plus juste qu'une réponse absolue ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — La paix se construit-elle surtout en amont ou en réaction ?",
  [
    "Certains pensent que l'essentiel des efforts doit porter sur la prévention (en amont). D'autres pensent " +
    "que des institutions réactives fortes (comme celles étudiées en 7e AF) restent indispensables, quoi " +
    "qu'il arrive.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle nuancée qui tient compte des deux approches.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Analyser une initiative de paix locale"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Identifier et analyser une initiative locale (réelle ou plausible) de prévention de la " +
    "violence ou de promotion de la paix. [OFFICIEL — situation de départ prévue par le programme]",
    "CONSIGNES : Avec l'aide d'un adulte, d'un(e) enseignant(e) ou d'une source fiable, identifie une " +
    "initiative locale (sportive, culturelle, communautaire) qui contribue, même indirectement, à la culture " +
    "de la paix.",
    "ÉTAPES : 1. Identifier l'initiative. 2. Relier son fonctionnement à un ou plusieurs piliers de la culture " +
    "de la paix. 3. Réfléchir à ses limites éventuelles. 4. Présenter le résultat à la classe.",
    "RÉSULTAT ATTENDU : Une analyse courte et nuancée d'une initiative locale, reliée explicitement aux " +
    "piliers étudiés dans ce chapitre.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Élaborer une charte de classe pour la culture de la paix"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit un projet ou une charte de classe pour la culture de la paix. [OFFICIEL — " +
    "activité prévue par le programme]",
    "OBJECTIF : Rédiger, collectivement, une charte fixant des engagements concrets pour cultiver la paix au " +
    "quotidien dans la classe.",
    "ÉTAPES : 1. Discuter en groupe des comportements qui favorisent un climat de classe paisible. 2. " +
    "Sélectionner cinq à sept engagements concrets et réalistes. 3. Rédiger la charte dans un langage clair. " +
    "4. Faire approuver et signer la charte par l'ensemble de la classe. 5. Prévoir un moment, plus tard dans " +
    "l'année, pour en évaluer l'application.",
    "RÉSULTAT ATTENDU : Une charte de classe originale, concrète et réellement applicable — pas une liste " +
    "abstraite de bonnes intentions.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C06-03",
  "Espace de production — notre charte de classe pour la paix",
  "Un cadre vide, format portrait, présenté comme un document solennel avec un titre « Charte de la paix » et " +
  "des lignes numérotées pour lister les engagements, avec un espace de signature en bas, cohérent avec la " +
  "charte EC.",
  "Offrir un espace direct de production pour rédiger et formaliser la charte de classe.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, lignes numérotées et espace de signature, format portrait pleine " +
  "page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une approche réactive répond à un danger déjà présent ; une approche proactive agit en amont pour le " +
    "prévenir — les deux sont complémentaires.",
    "La culture de la paix regroupe des valeurs et pratiques (dialogue, respect de la diversité, résolution " +
    "non-violente, engagement communautaire) qui préviennent les tensions.",
    "Des initiatives locales, même modestes, peuvent contribuer concrètement à la culture de la paix.",
    "Une charte de classe permet de formaliser des engagements concrets pour cultiver la paix au quotidien.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de distinguer une approche réactive d'une approche proactive de la sécurité, de " +
  "définir la culture de la paix et ses piliers, d'analyser une initiative locale de prévention, et " +
  "d'élaborer une charte de classe engageant concrètement chaque élève — une dimension réflexive et " +
  "collective, réellement nouvelle par rapport aux acquis institutionnels de la 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "culture de la paix · prévention · non-violence · charte · cohésion sociale.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer une approche réactive et une approche proactive de la paix.",
    "☐ Définir la culture de la paix et citer au moins deux de ses piliers.",
    "☐ Analyser une initiative locale de prévention de la violence, avec nuance.",
    "☐ Participer à la rédaction d'une charte de classe concrète et applicable.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : approche réactive/proactive, culture de la paix, prévention, non-violence, " +
    "cohésion sociale.",
    "Vocabulaire clé à maîtriser : culture de la paix, prévention, non-violence, charte.",
    "Avant l'évaluation, vérifie que tu peux : expliquer la différence entre réagir et prévenir ; citer les " +
    "piliers de la culture de la paix ; analyser une initiative locale avec nuance.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec la structure officielle full-cycle sur " +
    "l'engagement pour la paix, centrée ici sur la dimension réflexive de la culture de la paix [OFFICIEL, " +
    "adapté au niveau 8e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : culture " +
  "de la paix · prévention · non-violence · charte · cohésion sociale.",
  { italics: true },
));
children.push(numberedPar("1. L'ensemble des actions menées à l'avance pour éviter qu'un problème ne se produise s'appelle la ......................"));
children.push(numberedPar("2. Le refus actif de recourir à la violence pour résoudre un désaccord s'appelle la ......................"));
children.push(numberedPar("3. Un document écrit fixant des engagements partagés par un groupe s'appelle une ......................"));
children.push(numberedPar("4. L'ensemble de valeurs et de pratiques qui préviennent les tensions s'appelle la ......................"));
children.push(numberedPar("5. La qualité des liens qui unissent les membres d'une communauté s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Classe les actions suivantes en approche réactive ou proactive : (a) suivre une consigne de sécurité en cas de danger, (b) organiser une activité pour prévenir les tensions entre jeunes."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Une approche proactive de la paix rend inutile toute institution de sécurité réactive. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec l'exemple du club de médiation ou du tournoi sportif étudié dans ce chapitre, ce qu'est une approche proactive de la paix."));
children.push(numberedPar("2. Cite deux piliers de la culture de la paix et illustre chacun par un exemple concret."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Propose trois engagements concrets que tu inclurais dans une charte de classe pour la culture de la paix, en justifiant chacun."));
children.push(numberedPar("2. Reprends l'étude de cas de l'initiative locale de prévention. Propose une amélioration réaliste pour la rendre encore plus efficace."));
children.push(numberedPar("3. Un camarade affirme : « La paix, soit elle existe, soit elle n'existe pas — on ne peut rien y faire. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-8AF-C06-04",
  "Synthèse — Cultiver la paix",
  "Une carte mentale simple centrée sur « Culture de la paix », avec des branches vers : approche réactive/" +
  "proactive, piliers de la culture de la paix, initiative locale, charte de classe.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 47, "Manuel_EC_8AF_Chapitre6.docx");
