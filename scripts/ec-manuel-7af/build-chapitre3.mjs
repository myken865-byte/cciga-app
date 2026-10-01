// Manuel d'EC 7e AF — Chapitre 3 : Vivre dans un État démocratique
// (Unité 3 — Savoir être et agir en citoyenne et citoyen d'un État
// démocratique, Compétences C1, C2, C3).
//
// Prolonge les Chapitres 1-2 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 23 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-22).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.35-36 : Unité 3, colonne 7e AF explicitement séparée par année.
//     Contenu officiel cité verbatim (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`,
//     verrouillé sans changement dans
//     `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "Le
//     fonctionnement d'un État démocratique. La démocratie comme conquête
//     au quotidien. Participation aux activités de renforcement de la
//     démocratie dans la communauté."
//   - `09_TABLE_MATIERES_PROPOSEE_EC_7AF.md` (verrouillée sans changement
//     dans `19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md`) : situation de départ
//     "élection d'un comité ou d'un(e) représentant(e) de classe" ;
//     activités "mise en place d'une coopérative de classe [OFFICIEL] ;
//     débat encadré" ; évaluation "décrire le rôle et la participation du
//     citoyen dans des élections démocratiques [OFFICIEL]".
//   - Compétences C1, C2, C3 toutes mobilisées (tableau croisé compétences
//     × unités, `05_MATRICE_COMPETENCES_UNITES_EC.md`).
//
// PRÉCONDITION VÉRIFIÉE (section 1 du prompt d'exécution) : le fichier
// `05_MATRICE_COMPETENCES_UNITES_EC.md` documente, sous son propre intitulé
// « Unité 3 », un contenu (individu/personne, dignité, tolérance,
// Convention des droits de l'enfant, inégalités) qui appartient en réalité
// à l'Unité 4 — une anomalie d'extraction déjà signalée et documentée par
// ce même fichier (note sous « Unité 4 ») et confirmée non bloquante par
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, qui fait foi pour le
// contenu réellement verrouillé de l'Unité 3 (fonctionnement de l'État
// démocratique). Ce chapitre utilise donc exclusivement le contenu
// verrouillé de la matrice de progression et de la table des matières, PAS
// le paragraphe mal étiqueté de `05_MATRICE_COMPETENCES_UNITES_EC.md`. Ceci
// n'est pas une contradiction majeure au sens de la section 1 (les deux
// documents-source verrouillés eux-mêmes — matrice et table des matières —
// concordent), donc aucun arrêt n'était nécessaire.
//
// CONTINUITÉ CHAPITRES 1-2 → CHAPITRE 3 (section 4 du prompt) : le
// Chapitre 2 a introduit le vocabulaire politique de base (État,
// gouvernement, institution, suffrage universel) SANS développer le
// fonctionnement électoral. Ce Chapitre 3 reprend ce vocabulaire comme
// acquis et développe, pour la première fois, le fonctionnement concret
// d'un État démocratique et le rôle du citoyen dans une élection — à
// l'échelle accessible de la classe et de la commune, sans anticiper la
// séparation des pouvoirs (réservée à la 8e AF) ni la fiscalité citoyenne
// (réservée à la 9e AF).
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
  3,
  "Vivre dans un État démocratique",
  "Choisir un(e) délégué(e) de classe à main levée. Décider ensemble des règles d'une coopérative. Participer " +
  "à une réunion de quartier. Ces gestes simples reposent tous sur le même principe : dans un État " +
  "démocratique, le pouvoir se construit, se partage et se renouvelle avec la participation de chacun.",
  [
    "Expliquer simplement le fonctionnement d'un État démocratique.",
    "Comprendre pourquoi la démocratie est décrite comme une « conquête au quotidien ».",
    "Décrire le rôle et la participation du citoyen dans des élections démocratiques.",
    "Participer à la mise en place d'une coopérative de classe.",
    "S'impliquer dans des activités de renforcement de la démocratie à l'échelle de la communauté.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Élire un(e) représentant(e) de classe",
  [
    "En début d'année, une classe de 7e AF doit choisir un(e) délégué(e) pour la représenter auprès de la " +
    "direction de l'école. Deux élèves se présentent. « Comment on choisit, pour que ce soit juste ? » " +
    "demande un élève. Ce chapitre part de cette question très concrète pour comprendre ce qu'est, plus " +
    "largement, un État démocratique.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis issus des Chapitres 1 et 2"));
children.push(bodyPar(
  "Au Chapitre 2, tu as découvert le vocabulaire politique de base : État, gouvernement, institution, et le " +
  "suffrage universel comme droit de vote reconnu à tous les citoyens remplissant les conditions légales. Ce " +
  "chapitre reprend ces mots comme acquis, sans les redéfinir, pour expliquer concrètement comment ils " +
  "fonctionnent ensemble dans un État démocratique.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("État démocratique — État dans lequel le pouvoir appartient au peuple, exercé directement ou par des représentants choisis."));
children.push(bulletPar("Élection — procédure permettant de choisir un ou plusieurs représentants par le vote."));
children.push(bulletPar("Représentant(e) — personne choisie par un groupe pour parler et agir en son nom."));
children.push(bulletPar("Conquête au quotidien — idée que la démocratie ne s'obtient pas une fois pour toutes, mais se pratique et se renforce chaque jour."));
children.push(bulletPar("Coopérative — groupe organisé dont les membres décident ensemble des règles et des activités communes."));
children.push(bulletPar("Participation citoyenne — implication active d'une personne dans la vie collective de sa classe, de son école ou de sa communauté."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le fonctionnement d'un État démocratique", "3.1"));
children.push(bodyPar(
  "Dans un État démocratique, le pouvoir n'appartient à personne de façon permanente : il est confié, pour un " +
  "temps, à des représentants choisis par la population. Ces représentants doivent rendre des comptes, et " +
  "peuvent être remplacés lors d'élections suivantes.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Trois principes d'un État démocratique",
  [
    "Le pouvoir appartient au peuple, qui l'exerce directement ou à travers des représentants.",
    "Les représentants sont choisis pour une durée limitée, pas de façon permanente.",
    "Chaque citoyen peut, selon les règles en vigueur, participer aux décisions ou choisir qui le représente.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C03-01",
  "Ouverture — L'élection du délégué de classe",
  "Une scène de classe haïtienne crédible : des élèves de 7e AF votant à main levée ou par bulletin simple " +
  "pour choisir un(e) délégué(e), dans un style illustratif cohérent avec la charte EC.",
  "Une élection de classe illustre concrètement le principe démocratique du pouvoir confié pour un temps.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire concrète et reconnaissable.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La démocratie, une conquête au quotidien", "3.2"));
children.push(bodyPar(
  "La démocratie n'est pas seulement un système inscrit dans un texte : elle se pratique et se renforce chaque " +
  "jour, par de petites actions concrètes. C'est pour cela qu'on la décrit comme une « conquête au quotidien " +
  "» — elle doit être entretenue, pas seulement obtenue une fois.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des gestes démocratiques du quotidien",
  [
    "Écouter un point de vue différent du sien avant de décider.",
    "Respecter le résultat d'un vote, même quand on n'a pas voté pour le gagnant.",
    "Participer activement à une réunion de classe, d'école ou de quartier.",
    "Proposer une idée pour améliorer une décision collective, dans le respect des règles établies.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le rôle du citoyen dans une élection démocratique", "3.3"));
children.push(bodyPar(
  "Participer à une élection démocratique, ce n'est pas seulement voter le jour du scrutin. C'est aussi " +
  "s'informer sur les personnes ou les propositions en présence, réfléchir avant de choisir, et accepter le " +
  "résultat, même s'il ne correspond pas à son propre choix.",
));
children.push(threeColTable(
  ["Étape", "Ce que fait le citoyen", "Exemple en classe"],
  [
    ["S'informer", "Découvrir les candidat(e)s ou les propositions", "Écouter chaque candidat se présenter"],
    ["Réfléchir", "Comparer les propositions avant de choisir", "Se demander qui représentera le mieux la classe"],
    ["Voter", "Exprimer son choix selon les règles établies", "Voter à main levée ou par bulletin"],
    ["Accepter le résultat", "Respecter la décision collective", "Féliciter le/la délégué(e) élu(e)"],
  ],
  [2200, 3600, 3600],
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C03-02",
  "Exemple analysé — les étapes d'une élection démocratique",
  "Une frise illustrée en quatre étapes (s'informer, réfléchir, voter, accepter le résultat), avec des icônes " +
  "simples pour chaque étape, cohérente avec la charte EC.",
  "Une élection démocratique suit des étapes claires, du citoyen informé au résultat respecté.",
  "Donner une référence visuelle claire et mémorisable des étapes d'une élection démocratique.",
  "Illustration demi-page, frise en quatre étapes, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Participer au renforcement de la démocratie dans sa communauté", "3.4"));
children.push(bodyPar(
  "La démocratie ne se limite pas à l'école : elle se vit aussi dans le quartier, la section communale ou la " +
  "commune. Assister à une réunion communautaire, poser une question à un responsable local, ou participer à " +
  "une activité collective sont autant de façons, accessibles dès la 7e AF, de renforcer la démocratie à " +
  "cette échelle.",
));

children.push(calloutBox(
  "ÉTUDE DE CAS — Une élection de classe contestée",
  [
    "Après l'élection d'un(e) délégué(e) de classe, plusieurs élèves affirment que le vote n'était pas juste : " +
    "certains n'ont pas eu le temps d'entendre tous les candidats, et un élève a voté deux fois par erreur.",
    "1. En quoi cette situation remet-elle en cause le fonctionnement démocratique de l'élection ?",
    "2. Quelles règles simples permettraient d'éviter que cela se reproduise ?",
    "3. Si tu étais le/la délégué(e) élu(e) dans cette situation, comment réagirais-tu pour rassurer la " +
    "classe ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Voter est-il le seul moyen de participer à la démocratie ?",
  [
    "Certains pensent que voter est l'action démocratique la plus importante. D'autres pensent que s'informer, " +
    "débattre, proposer des idées ou s'engager dans une coopérative comptent tout autant, même en dehors des " +
    "élections.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Organiser une élection de classe"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Organiser, en classe, l'élection d'un(e) délégué(e) ou d'un comité, en appliquant les étapes " +
    "d'une élection démocratique. [OFFICIEL — situation de départ prévue par le programme]",
    "CONSIGNES : Avec l'enseignant(e), définis les règles du vote (candidatures, temps de parole, mode de " +
    "vote). Chaque candidat(e) présente brièvement ses idées pour la classe.",
    "ÉTAPES : 1. Appel à candidatures. 2. Présentation de chaque candidat(e). 3. Vote selon les règles " +
    "définies. 4. Annonce du résultat et acceptation collective.",
    "RÉSULTAT ATTENDU : Une élection menée dans l'ordre et le respect, avec un résultat accepté par l'ensemble " +
    "de la classe, y compris par les candidat(e)s non élu(e)s.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Mettre en place une coopérative de classe"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit la mise en place d'une coopérative de classe. [OFFICIEL — activité prévue " +
    "par le programme]",
    "OBJECTIF : Créer, avec toute la classe, un petit groupe organisé où les décisions concernant la vie de la " +
    "classe (rangement, activités communes, entraide) sont prises collectivement.",
    "ÉTAPES : 1. Définir ensemble le rôle de la coopérative. 2. Choisir, par élection, un petit comité " +
    "(trésorier, secrétaire, responsable des activités). 3. Fixer quelques règles simples de fonctionnement. " +
    "4. Prévoir un moment régulier où la coopérative se réunit pour décider ensemble.",
    "Ce projet applique directement, à l'échelle de la classe, tout ce que tu as appris sur le fonctionnement " +
    "d'un État démocratique.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C03-03",
  "Espace de production — le règlement de ma coopérative de classe",
  "Un cadre vide, format portrait, structuré en une liste à compléter (nom de la coopérative, rôles élus, " +
  "règles principales), prévu pour que l'élève y consigne directement les décisions prises par la classe.",
  "Offrir un espace direct de production pour ancrer la mise en place réelle de la coopérative de classe.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, liste à compléter, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Dans un État démocratique, le pouvoir est confié pour un temps à des représentants choisis par le " +
    "peuple.",
    "La démocratie est une « conquête au quotidien » : elle se pratique et se renforce chaque jour, pas " +
    "seulement lors des élections.",
    "Participer à une élection démocratique suppose de s'informer, réfléchir, voter et accepter le résultat.",
    "Une coopérative de classe permet d'appliquer concrètement le fonctionnement démocratique à l'échelle " +
    "scolaire.",
    "Renforcer la démocratie dans sa communauté est une action accessible dès la 7e AF, au-delà du seul vote.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de comprendre le fonctionnement général d'un État démocratique, de découvrir pourquoi " +
  "la démocratie est décrite comme une conquête quotidienne, et de s'exercer concrètement au rôle du citoyen " +
  "dans une élection à travers l'organisation d'une élection de classe et la mise en place d'une coopérative. " +
  "Il prépare, sans l'anticiper, l'étude de notions plus techniques comme la séparation des pouvoirs, réservée " +
  "à la 8e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "État démocratique · élection · représentant · conquête au quotidien · coopérative · participation " +
  "citoyenne.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer avec mes mots le fonctionnement général d'un État démocratique.",
    "☐ Expliquer pourquoi on parle de la démocratie comme d'une « conquête au quotidien ».",
    "☐ Décrire les étapes du rôle du citoyen dans une élection démocratique.",
    "☐ Expliquer le fonctionnement d'une coopérative de classe.",
    "☐ Citer une action possible pour renforcer la démocratie dans ma communauté.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : État démocratique, élection, représentant, conquête au quotidien, coopérative, " +
    "participation citoyenne.",
    "Vocabulaire clé à maîtriser : État démocratique, élection, représentant, participation citoyenne.",
    "Avant l'évaluation, vérifie que tu peux : expliquer le fonctionnement d'un État démocratique ; décrire les " +
    "étapes d'une élection démocratique ; expliquer le rôle du citoyen à chaque étape.",
    "Rappel officiel : l'évaluation attendue pour cette unité consiste à décrire le rôle et la participation du " +
    "citoyen dans des élections démocratiques [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : État " +
  "démocratique · élection · représentant · coopérative · participation citoyenne.",
  { italics: true },
));
children.push(numberedPar("1. Un État dans lequel le pouvoir appartient au peuple s'appelle un ......................"));
children.push(numberedPar("2. La procédure permettant de choisir un représentant par le vote s'appelle une ......................"));
children.push(numberedPar("3. Une personne choisie par un groupe pour parler en son nom est un(e) ......................"));
children.push(numberedPar("4. Un groupe organisé dont les membres décident ensemble des règles communes est une ......................"));
children.push(numberedPar("5. L'implication active dans la vie collective de sa classe ou de sa communauté s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Remets dans l'ordre les quatre étapes du rôle du citoyen dans une élection démocratique : voter · accepter le résultat · réfléchir · s'informer."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Une fois un délégué élu, la démocratie de la classe n'a plus besoin d'attention jusqu'à la prochaine élection. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec tes propres mots, pourquoi on dit que la démocratie est une « conquête au quotidien »."));
children.push(numberedPar("2. Donne deux exemples de gestes démocratiques que tu peux poser toi-même, en dehors d'un jour de vote."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas de l'élection contestée. Propose trois règles précises pour garantir une élection de classe juste."));
children.push(numberedPar("2. Décris, étape par étape, comment ta classe pourrait mettre en place une coopérative, en t'appuyant sur ce que tu as appris."));
children.push(numberedPar("3. Un camarade affirme : « Voter, c'est bien, mais après on n'a plus rien à faire pour la démocratie. » Que lui réponds-tu, en t'appuyant sur ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-7AF-C03-04",
  "Synthèse — Vivre dans un État démocratique",
  "Une carte mentale simple centrée sur « État démocratique », avec des branches vers : fonctionnement, " +
  "conquête au quotidien, élection, coopérative de classe, participation communautaire.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 22, "Manuel_EC_7AF_Chapitre3.docx");
