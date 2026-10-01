// Manuel d'EC 8e AF — Chapitre 5 : Débattre et argumenter pour la justice
// (Unité 5 — La résolution de conflit et le vivre ensemble,
// Compétences C1, C3).
//
// Prolonge les Chapitres 1-4 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 38 (Chapitre 1 = pages 1-9,
// Chapitre 2 = pages 10-19, Chapitre 3 = pages 20-28, Chapitre 4 = pages
// 29-37).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.37-38 : Unité 5, colonne 8e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "La
//     démarche critique et l'argumentation, le débat. Les formes et les
//     institutions de justice."
//   - `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md` (verrouillée sans changement
//     dans `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`) : situation de départ
//     "un débat encadré sur un fait d'actualité local" ; activité
//     "recherche sur les institutions judiciaires haïtiennes".
//
// PROGRESSION RÉELLE 7e → 8e AF (section 4 du prompt) : le Chapitre 5 de
// 7e AF (déjà finalisé, NON modifié ici) a construit la NÉGOCIATION SIMPLE
// (méthode de dialogue en 4 étapes, distinction fait/opinion, jeu de rôle
// informel « avocats » de points de vue). CES ACQUIS NE SONT PAS
// REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref, section 5.1) pour
// construire un contenu réellement nouveau, conforme à
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md` : l'ARGUMENTATION
// STRUCTURÉE (thèse, arguments, contre-arguments) et la DÉCOUVERTE DES
// INSTITUTIONS DE JUSTICE — deux notions explicitement identifiées comme
// nouvelles pour la 8e AF.
//
// PÉRIMÈTRE 8e AF STRICTEMENT RESPECTÉ (absence d'anticipation 9e AF) :
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md` réserve à la 9e AF
// « les institutions judiciaires ET les institutions chargées de faire
// respecter la loi » (donc l'appareil complet justice + application de la
// loi). Ce chapitre reste au niveau « formes et institutions de justice »
// prévu pour la 8e AF : structure générale et principes de base (justice
// civile/pénale, hiérarchie des tribunaux, présomption d'innocence), sans
// détailler les institutions chargées de faire respecter la loi (déjà
// amorcées côté sécurité à l'Unité 6, hors périmètre ici) ni la dimension
// approfondie réservée à la 9e AF.
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
  5,
  "Débattre et argumenter pour la justice",
  "En 7e AF, tu as appris à dialoguer et à négocier pour résoudre un désaccord simple. Certaines questions " +
  "collectives demandent davantage : un argumentaire construit, un débat structuré, et parfois même " +
  "l'intervention d'une institution de justice. Ce chapitre t'y prépare.",
  [
    "Construire un argumentaire structuré (thèse, arguments, contre-arguments).",
    "Participer à un débat encadré selon une méthode structurée.",
    "Distinguer justice civile et justice pénale.",
    "Comprendre le principe de présomption d'innocence.",
    "Réaliser une recherche sur les institutions judiciaires haïtiennes.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Des caméras au coin de la rue ?",
  [
    "Après plusieurs vols de téléphones portables près de l'arrêt de bus d'un quartier, un débat local se " +
    "développe : faut-il installer des caméras de surveillance ? Certains habitants sont pour, d'autres " +
    "s'inquiètent de la vie privée. Ce chapitre te propose de construire, sur un sujet comme celui-ci, un " +
    "véritable débat argumenté — plus structuré que le simple échange de points de vue vu en 7e AF.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (acquis de la 7e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris une méthode simple de dialogue et de négociation, et à distinguer un fait d'une " +
  "opinion. Ce chapitre ne redéveloppe pas ces acquis : il les mobilise pour construire, cette fois, un " +
  "argumentaire structuré et un débat organisé selon des règles précises.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Argumentaire — ensemble organisé d'arguments construits pour soutenir une position sur une question."));
children.push(bulletPar("Thèse — position principale que l'on défend dans un argumentaire ou un débat."));
children.push(bulletPar("Contre-argument — argument qui vient nuancer ou s'opposer à une thèse, à prendre en compte pour argumenter avec rigueur."));
children.push(bulletPar("Justice civile — justice qui règle les litiges entre particuliers (par exemple un désaccord sur un contrat)."));
children.push(bulletPar("Justice pénale — justice qui traite les infractions à la loi et leurs sanctions."));
children.push(bulletPar("Présomption d'innocence — principe selon lequel une personne accusée est considérée innocente tant que sa culpabilité n'a pas été prouvée."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Construire un argumentaire structuré", "5.1"));
children.push(bodyPar(
  "Un argumentaire structuré va plus loin qu'une simple opinion : il organise une position en plusieurs " +
  "éléments clairs, pour convaincre par la rigueur plutôt que par la seule conviction personnelle.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Les éléments d'un argumentaire",
  [
    "La thèse : la position principale que l'on défend, énoncée clairement.",
    "Les arguments : les raisons qui soutiennent cette thèse, si possible appuyées par des faits ou des " +
    "exemples.",
    "Les contre-arguments : les objections possibles, que l'on anticipe et auxquelles on répond — un " +
    "argumentaire solide ne les ignore pas.",
    "La conclusion : un rappel synthétique de la position, tenant compte de la discussion.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C05-01",
  "Ouverture — Le débat des caméras de surveillance",
  "Une scène de quartier haïtien crédible avec des habitants échangeant, certains pour et d'autres contre " +
  "l'installation d'une caméra visible près d'un arrêt de bus, dans un style illustratif cohérent avec la " +
  "charte EC.",
  "Un désaccord local concret introduit le besoin d'un argumentaire structuré.",
  "Ancrer l'ouverture du chapitre dans une scène communautaire réaliste et équilibrée.",
  "Illustration pleine largeur, scène de quartier haïtien, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le débat argumenté : une méthode structurée", "5.2"));
children.push(bodyPar(
  "Un débat argumenté suit des étapes précises, plus formelles que l'échange libre pratiqué en 7e AF.",
));
children.push(threeColTable(
  ["Étape", "Ce qui se passe", "Durée indicative"],
  [
    ["Déclaration d'ouverture", "Chaque camp présente sa thèse et ses arguments principaux", "2 minutes par camp"],
    ["Réfutation", "Chaque camp répond aux arguments du camp adverse", "2 minutes par camp"],
    ["Conclusion", "Chaque camp résume sa position en tenant compte des échanges", "1 minute par camp"],
  ],
  [2600, 4200, 3000],
));
children.push(spacer(160));
children.push(bodyPar(
  "Contrairement au jeu de rôle libre de 7e AF, ce format impose un temps limité et une structure précise à " +
  "chaque étape — ce qui exige davantage de préparation et de rigueur.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C05-02",
  "Exemple analysé — les étapes du débat argumenté",
  "Une frise illustrée en trois étapes (ouverture, réfutation, conclusion), avec des pictogrammes simples de " +
  "chronomètre pour chaque étape, cohérente avec la charte EC.",
  "Le débat argumenté suit une structure claire, en temps limité.",
  "Donner une référence visuelle claire et mémorisable des étapes du débat structuré.",
  "Illustration demi-page, frise en trois étapes, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les formes et institutions de justice", "5.3"));
children.push(bodyPar(
  "Quand un désaccord ne peut être résolu par le dialogue ou le débat, la justice intervient pour trancher, " +
  "selon des règles précises.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Deux grandes formes de justice [ADAPTATION PÉDAGOGIQUE]",
  [
    "La justice civile règle les désaccords entre particuliers, par exemple un litige sur un contrat ou une " +
    "propriété.",
    "La justice pénale traite les infractions à la loi et détermine les sanctions applicables.",
    "En Haïti, plusieurs niveaux de tribunaux existent selon la nature et l'importance des affaires (par " +
    "exemple : tribunal de paix, tribunal de première instance, cour d'appel).",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-8AF-C05-01 — Emplacement réservé pour un extrait exact et vérifié de la Constitution haïtienne sur " +
    "l'organisation judiciaire et la présomption d'innocence.",
    "Statut : [SOURCE À VÉRIFIER] — aucune formulation exacte n'est reproduite ici tant qu'elle n'a pas été " +
    "confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(bodyPar(
  "Un principe essentiel encadre la justice pénale : la présomption d'innocence. Une personne accusée reste " +
  "considérée comme innocente tant que sa culpabilité n'a pas été prouvée devant un tribunal — ce principe " +
  "protège chaque citoyen contre des accusations arbitraires.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "ÉTUDE DE CAS — Argumenter avant de trancher",
  [
    "Reprends la situation des caméras de surveillance. Un habitant propose de saisir les autorités locales " +
    "pour trancher le désaccord, faute d'accord entre voisins.",
    "1. Construis une thèse et deux arguments en faveur de l'installation des caméras.",
    "2. Construis une thèse et deux arguments contre cette installation.",
    "3. Le désaccord relève-t-il, selon toi, de la justice civile, de la justice pénale, ou plutôt d'une " +
    "décision communautaire qui n'a pas besoin d'un tribunal ? Justifie ta réponse.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ (encadré) — Faut-il installer des caméras de surveillance dans le quartier ?",
  [
    "Organise, avec ta classe, un débat argumenté structuré (ouverture, réfutation, conclusion) sur cette " +
    "question, en suivant la méthode présentée dans ce chapitre.",
    "Règles supplémentaires par rapport à 7e AF : respecter le temps imparti à chaque étape ; préparer à " +
    "l'avance au moins un contre-argument à anticiper ; ne pas répéter un argument déjà donné par son propre " +
    "camp.",
    "À la fin du débat, chaque élève rédige une conclusion personnelle nuancée, tenant compte des meilleurs " +
    "arguments des deux camps.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Recherche sur les institutions judiciaires haïtiennes"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Réaliser une recherche sur une institution judiciaire haïtienne. [OFFICIEL — activité prévue " +
    "par le programme]",
    "CONSIGNES : Choisis un niveau de tribunal étudié dans ce chapitre (tribunal de paix, tribunal de première " +
    "instance, cour d'appel). Avec l'aide d'un adulte, d'un(e) enseignant(e) ou d'une source fiable, identifie " +
    "sa mission générale.",
    "ÉTAPES : 1. Choisir le niveau de tribunal. 2. Identifier le type d'affaires qu'il traite généralement. " +
    "3. Relier cette information à la distinction justice civile/justice pénale vue dans ce chapitre. 4. " +
    "Présenter le résultat à la classe.",
    "RÉSULTAT ATTENDU : Une fiche courte présentant, de façon générale et factuelle, le rôle d'un niveau de " +
    "tribunal haïtien.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Rédiger un argumentaire écrit complet"));
children.push(calloutBox(
  "PROJET",
  [
    "OBJECTIF : Rédiger un argumentaire écrit complet (thèse, deux arguments, un contre-argument anticipé, " +
    "conclusion) sur une question civique de ton choix, différente de celle des caméras de surveillance.",
    "ÉTAPES : 1. Choisir une question qui admet plusieurs points de vue légitimes. 2. Rédiger la thèse. 3. " +
    "Développer deux arguments distincts. 4. Anticiper et répondre à un contre-argument. 5. Rédiger une " +
    "conclusion synthétique.",
    "Ce projet applique directement la méthode d'argumentation structurée étudiée dans ce chapitre, de façon " +
    "autonome.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C05-03",
  "Espace de production — mon argumentaire structuré",
  "Un cadre vide, format portrait, structuré en quatre zones (thèse / arguments / contre-argument / " +
  "conclusion), prévu pour que l'élève y rédige directement son argumentaire complet.",
  "Offrir un espace direct de production pour structurer la rédaction de l'argumentaire.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, quatre zones délimitées, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un argumentaire structuré comprend une thèse, des arguments, des contre-arguments anticipés et une " +
    "conclusion.",
    "Un débat argumenté suit une méthode précise en temps limité : ouverture, réfutation, conclusion.",
    "La justice civile règle les litiges entre particuliers ; la justice pénale traite les infractions à la " +
    "loi.",
    "La présomption d'innocence protège toute personne accusée tant que sa culpabilité n'est pas prouvée.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de construire un argumentaire structuré, de participer à un débat encadré selon une " +
  "méthode précise, de découvrir les formes de justice (civile et pénale) et le principe de présomption " +
  "d'innocence, et de réaliser une recherche sur les institutions judiciaires haïtiennes — une progression " +
  "réelle par rapport à la négociation simple étudiée en 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "argumentaire · thèse · contre-argument · justice civile · justice pénale · présomption d'innocence.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Construire un argumentaire avec thèse, arguments et contre-argument.",
    "☐ Participer à un débat structuré en respectant les étapes et le temps imparti.",
    "☐ Distinguer justice civile et justice pénale.",
    "☐ Expliquer le principe de présomption d'innocence.",
    "☐ Présenter le rôle d'un niveau de tribunal haïtien.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : argumentaire, thèse, contre-argument, débat structuré, justice civile/pénale, " +
    "présomption d'innocence.",
    "Vocabulaire clé à maîtriser : argumentaire, thèse, justice civile, justice pénale, présomption " +
    "d'innocence.",
    "Avant l'évaluation, vérifie que tu peux : construire un argumentaire complet ; distinguer justice civile " +
    "et pénale ; expliquer la présomption d'innocence.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec la structure officielle full-cycle sur " +
    "l'argumentation et la découverte des institutions de justice [OFFICIEL, adapté au niveau 8e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "argumentaire · thèse · justice civile · justice pénale · présomption d'innocence.",
  { italics: true },
));
children.push(numberedPar("1. Un ensemble organisé d'arguments construits pour soutenir une position s'appelle un ......................"));
children.push(numberedPar("2. La position principale que l'on défend dans un débat s'appelle la ......................"));
children.push(numberedPar("3. La justice qui règle les litiges entre particuliers s'appelle la ......................"));
children.push(numberedPar("4. La justice qui traite les infractions à la loi s'appelle la ......................"));
children.push(numberedPar("5. Le principe selon lequel un accusé est considéré innocent tant que sa culpabilité n'est pas prouvée s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Remets dans l'ordre les trois étapes d'un débat argumenté : réfutation · conclusion · déclaration d'ouverture."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Un bon argumentaire n'a pas besoin de prendre en compte les contre-arguments. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique la différence entre justice civile et justice pénale, avec un exemple pour chacune."));
children.push(numberedPar("2. Pourquoi la présomption d'innocence est-elle un principe important pour protéger les citoyens ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Choisis une question civique de ton quotidien et construis une thèse avec deux arguments à l'appui."));
children.push(numberedPar("2. Reprends l'étude de cas des caméras de surveillance. Rédige un contre-argument sérieux à opposer à la thèse « il faut installer des caméras »."));
children.push(numberedPar("3. Un camarade affirme : « Dans un débat, celui qui parle le plus fort a raison. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-8AF-C05-04",
  "Synthèse — Débattre et argumenter pour la justice",
  "Une carte mentale simple centrée sur « Argumenter pour la justice », avec des branches vers : " +
  "argumentaire structuré, débat argumenté, justice civile/pénale, présomption d'innocence, institutions " +
  "judiciaires.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 38, "Manuel_EC_8AF_Chapitre5.docx");
