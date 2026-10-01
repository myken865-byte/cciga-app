// Manuel d'ETAP 8e AF — Chapitre 1 : Applications numeriques et outils
// collaboratifs (champ officiel : Nouvelles technologies du numerique).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.54-55/77 (programme detaille 8e AF, unite "Nouvelles technologies
//       du numerique en 8e annee du fondamental") : competence ciblee,
//       savoirs/savoir-faire, activites, listes de logiciels reels
//       (traitement de texte / PAO / tableurs), modalites/criteres.
// Re-verifie en direct le 2026-08-22 avant redaction (page exacte affinee :
// 54-55, contre l'estimation "53-55" de la Phase 0 - ecart mineur signale
// dans le rapport, sans divergence de fond).
// Page 53/77 clot l'unite Entrepreneuriat-8e (hors perimetre) ; page 56/77
// ouvre la 9e AF (non consultee, non utilisee).
//
// Ce chapitre ne reprend PAS le contenu du Chapitre 1 de la 7e AF (objets
// numeriques, stockage, reseaux sans fil, capteurs/actionneurs) : il porte
// sur l'UTILISATION d'applications et de logiciels (traitement de texte,
// tableur, PAO, outils collaboratifs), conformement a la progression
// verifiee en Phase 0. Seul un rappel tres bref des prerequis 7e AF est
// inclus (section 1.1).
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  VERT, CUIVRE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  1,
  "Applications numériques et outils collaboratifs",
  "L'an dernier, tu as découvert ce qu'est un objet numérique et comment il conserve l'information. Cette " +
  "année, tu vas apprendre à utiliser de vrais logiciels pour produire des documents utiles — seul ou en " +
  "équipe — comme le font déjà de nombreux élèves, enseignants et professionnels en Haïti.",
  [
    "Reconnaître différents types d'applications numériques et leur utilité.",
    "Utiliser un logiciel de traitement de texte pour élaborer un contenu.",
    "Utiliser un tableur pour organiser des données simples.",
    "Concevoir une présentation à l'aide d'un logiciel de PAO.",
    "Travailler en équipe avec des outils collaboratifs.",
    "Comparer des solutions numériques et faire des choix responsables.",
    "Utiliser le numérique de façon responsable et sécurisée.",
  ],
));

children.push(bodyPar(
  "Situation de départ : L'association des jeunes du quartier de Wideline, à Saint-Marc, doit préparer un " +
  "dossier pour présenter son projet de reboisement à la mairie : un texte explicatif, un tableau de suivi des " +
  "arbres plantés, et une courte présentation. Un seul ordinateur est disponible, partagé par toute l'équipe. " +
  "Ce chapitre t'apprend à réaliser exactement ce genre de dossier.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Application (ou logiciel) — programme qui permet de réaliser une tâche précise sur un ordinateur, une tablette ou un téléphone."));
children.push(bulletPar("Application collaborative — application qui permet à plusieurs personnes de travailler ensemble sur un même document."));
children.push(bulletPar("Traitement de texte — application utilisée pour rédiger et mettre en forme un texte."));
children.push(bulletPar("Tableur — application utilisée pour organiser des données en tableaux, graphiques ou schémas."));
children.push(bulletPar("PAO (publication ou présentation assistée par ordinateur) — application utilisée pour concevoir des présentations ou des documents à publier."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : des objets numériques aux applications", "1.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris qu'un outil numérique (ordinateur, tablette, téléphone) traite et conserve de " +
  "l'information, localement ou à distance (le cloud), et qu'il peut communiquer grâce à des réseaux sans fil. " +
  "Cette année, tu vas apprendre à utiliser ce que ces outils permettent réellement de faire : produire des " +
  "documents utiles grâce à des applications.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Découvrir les applications numériques", "1.2"));
children.push(bodyPar(
  "Une application (ou logiciel) est un programme conçu pour une tâche précise. Le programme officiel " +
  "distingue notamment les applications collaboratives, les logiciels de traitement de texte, les tableurs et " +
  "les logiciels de PAO. Pour bien les utiliser, il faut d'abord comprendre ce que chacun permet de faire.",
));

children.push(calloutBox(
  "DÉCOUVRIR — Quatre familles d'applications",
  [
    "Traitement de texte : rédiger et mettre en forme un texte (rapport, lettre, dossier).",
    "Tableur : organiser des données en tableaux, calculer, créer des graphiques.",
    "PAO : concevoir une présentation, une affiche ou un document à publier.",
    "Applications collaboratives : permettre à plusieurs personnes de travailler ensemble sur un même document, en même temps ou à des moments différents.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-01",
  "Une équipe qui prépare un dossier numérique",
  "Un petit groupe d'élèves haïtiens de 8e AF, autour d'un seul ordinateur partagé, préparant un dossier " +
  "(texte, tableau, présentation) pour un projet scolaire ou communautaire.",
  "Un seul appareil suffit pour produire un dossier complet, à condition de bien s'organiser.",
  "Ouvrir le chapitre sur une scène concrète et réaliste (matériel partagé, pas un ordinateur par élève).",
  "Illustration pleine largeur, scène de classe ou de local associatif haïtien, ambiance motivée et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Utiliser un traitement de texte", "1.3"));
children.push(bodyPar(
  "Un logiciel de traitement de texte permet de rédiger un contenu, de le mettre en forme (titres, paragraphes, " +
  "listes) et de le corriger avant de l'imprimer ou de le partager. Le programme officiel cite, parmi de " +
  "nombreux exemples possibles, des logiciels comme Microsoft Word, LibreOffice Writer ou Google Docs — le " +
  "principe d'utilisation reste très semblable d'un logiciel à l'autre.",
));

children.push(calloutBox(
  "OUTIL — Les bases d'un traitement de texte",
  [
    "Taper et corriger un texte.",
    "Organiser le texte avec des titres, des paragraphes, des listes.",
    "Mettre en forme (gras, souligné, taille du texte) pour rendre le document plus lisible.",
    "Enregistrer le document pour pouvoir le retrouver et le modifier plus tard.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, "343B42",
));
children.push(spacer(160));

children.push(bodyPar(
  "Si ton école ne dispose pas d'ordinateur, tu peux quand même t'entraîner : rédige ton texte sur une fiche " +
  "papier, en respectant les mêmes étapes (titre, paragraphes, relecture), comme si tu préparais le contenu " +
  "avant de le saisir plus tard sur un appareil partagé.",
  { italics: true },
));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-02",
  "Rédiger avec un traitement de texte",
  "Une élève rédige un document à l'écran (traitement de texte simple, sans marque commerciale visible) ; en " +
  "vignette, une fiche papier reproduisant la même structure pour l'alternative sans ordinateur.",
  "On peut s'entraîner à structurer un texte même sans ordinateur disponible.",
  "Montrer à la fois l'usage réel du logiciel et l'alternative papier.",
  "Illustration demi-page en deux parties (écran + fiche papier), style scolaire clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Utiliser un tableur pour organiser des données", "1.4"));
children.push(bodyPar(
  "Un tableur permet de ranger des informations dans un tableau, de faire des calculs simples, et de créer un " +
  "graphique pour mieux visualiser des données. C'est un outil précieux pour suivre l'évolution d'une activité " +
  "dans le temps — par exemple, le nombre d'arbres plantés chaque semaine par l'association de Wideline.",
));
children.push(threeColTable(
  ["Semaine", "Arbres plantés", "Total cumulé"],
  [
    ["1", "12", "12"],
    ["2", "8", "20"],
    ["3", "15", "35"],
  ],
  [2800, 3000, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce type de tableau, une fois créé dans un tableur, peut être transformé automatiquement en graphique pour " +
  "présenter les résultats plus clairement.",
));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-03",
  "Organiser des données avec un tableur",
  "Un écran de tableur simplifié montrant un tableau de suivi (semaines/arbres plantés) et un petit graphique " +
  "en barres généré à partir de ces données.",
  "Un tableur transforme des données en informations faciles à comprendre.",
  "Montrer concrètement le passage d'un tableau de données à un graphique.",
  "Illustration demi-page, capture stylisée d'écran, sans marque commerciale visible.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Concevoir une présentation avec un logiciel de PAO", "1.5"));
children.push(bodyPar(
  "Un logiciel de PAO (publication ou présentation assistée par ordinateur) permet de concevoir des documents " +
  "destinés à être présentés ou publiés : diaporamas, affiches, dépliants. Le programme officiel cite, parmi " +
  "d'autres, des logiciels comme Microsoft PowerPoint, LibreOffice Impress, Canva ou Google Slides.",
));

children.push(calloutBox(
  "TECHNIQUE — Concevoir une présentation simple",
  [
    "1. Choisir les idées principales à présenter (pas trop de texte par diapositive).",
    "2. Organiser les diapositives dans un ordre logique.",
    "3. Ajouter des titres clairs et, si possible, des images ou schémas utiles.",
    "4. Relire et corriger avant de présenter.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-04",
  "Concevoir un diaporama simple",
  "Un élève organisant plusieurs diapositives simples (titre, quelques mots-clés, une image) sur un écran, " +
  "dans une salle de classe haïtienne.",
  "Une bonne présentation reste simple et bien organisée.",
  "Illustrer la démarche de conception d'une présentation numérique.",
  "Illustration demi-page, capture stylisée d'écran, sans marque commerciale visible.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Travailler en équipe avec des outils collaboratifs", "1.6"));
children.push(bodyPar(
  "Une application collaborative permet à plusieurs personnes de contribuer à un même document — chacune peut " +
  "écrire une partie du texte, remplir une partie du tableau, ou proposer une diapositive, avant de mettre le " +
  "tout en commun.",
));

children.push(calloutBox(
  "PROJET — Organiser un travail collaboratif",
  [
    "Répartir les tâches : qui rédige le texte, qui prépare le tableau, qui conçoit la présentation ?",
    "Se mettre d'accord sur la présentation générale (mêmes titres, même style).",
    "Se relire mutuellement avant de finaliser le document.",
    "Si un seul appareil est disponible : travailler à tour de rôle, chacun préparant son contenu sur papier avant de le saisir.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-05",
  "Travail collaboratif en équipe",
  "Un groupe d'élèves de 8e AF se répartissant les tâches (rédaction, tableau, présentation) autour d'une " +
  "table, avec un seul ordinateur visible et des fiches papier pour les autres membres.",
  "Un projet numérique se prépare souvent en équipe, même avec un seul appareil disponible.",
  "Illustrer concrètement l'organisation d'un travail collaboratif avec un matériel limité.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance organisée et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comparer des solutions et faire des choix responsables", "1.7"));
children.push(bodyPar(
  "Pour une même tâche, plusieurs applications sont souvent possibles. Le programme officiel encourage à " +
  "comparer les solutions disponibles et à privilégier, quand c'est possible, des applications libres de " +
  "droits — c'est-à-dire gratuites et légales à utiliser, comme LibreOffice ou certains outils en ligne " +
  "gratuits.",
));
children.push(twoColTable(
  "Type d'application", "Exemples cités par le programme (liste non exhaustive)",
  [
    ["Traitement de texte", "Microsoft Word, LibreOffice Writer, Google Docs, OpenOffice..."],
    ["Tableur", "Microsoft Excel, LibreOffice Calc, Google Sheets..."],
    ["PAO / présentation", "Microsoft PowerPoint, LibreOffice Impress, Canva, Google Slides..."],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "Le choix d'une application dépend souvent de ce qui est réellement disponible à l'école ou à la maison : " +
  "il n'existe pas un seul « bon » logiciel, mais des solutions adaptées à chaque situation.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Utiliser le numérique de manière responsable", "1.8"));
children.push(bodyPar(
  "Utiliser des applications, c'est aussi manipuler des informations parfois personnelles. Quelques habitudes " +
  "simples permettent de rester en sécurité et de respecter les autres.",
));

children.push(calloutBox(
  "SÉCURITÉ — Usage numérique responsable",
  [
    "Ne jamais communiquer d'informations personnelles (adresse, mot de passe) dans un document partagé.",
    "Vérifier une information avant de la considérer comme vraie et de la partager.",
    "Respecter le travail des autres membres du groupe (ne pas modifier sans prévenir).",
    "Prendre soin du matériel partagé (fermer proprement les documents, éteindre l'appareil correctement).",
    "Utiliser les outils numériques uniquement dans un cadre scolaire ou de projet approuvé par un adulte responsable.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : préparer un dossier numérique", "1.9"));
children.push(bodyPar(
  "Reprenons la situation de l'association de Wideline, présentée au début du chapitre. Avec ton groupe, " +
  "planifie la réalisation du dossier de présentation du projet de reboisement.",
));
children.push(numberedPar("1. Quelles applications utiliseriez-vous pour le texte, le tableau et la présentation ?"));
children.push(numberedPar("2. Comment répartiriez-vous les tâches si un seul ordinateur est disponible ?"));
children.push(numberedPar("3. Quelles informations faudrait-il vérifier avant de les inclure dans le dossier ?"));
children.push(numberedPar("4. Quelle règle de sécurité numérique faudrait-il rappeler au groupe avant de commencer ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Réaliser une fiche de suivi avec un tableur"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Organiser des données simples dans un tableau, avec ou sans ordinateur disponible." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier, crayon, règle. Si disponible : un ordinateur avec un tableur. L'activité reste entièrement réalisable sur papier si aucun ordinateur n'est disponible." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Travail en petits groupes de 2 à 3 élèves." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez une activité simple à suivre sur plusieurs semaines (ex. présence à un club scolaire, ventes d'une petite activité, plantations)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Définissez les colonnes utiles à votre suivi (par exemple : semaine, quantité, total cumulé)."));
children.push(numberedPar("2. Construisez le tableau, sur ordinateur si disponible, sinon sur papier avec une règle."));
children.push(numberedPar("3. Remplissez le tableau avec des données inventées mais réalistes."));
children.push(numberedPar("4. Si un ordinateur est disponible, essayez de représenter vos données avec un graphique simple."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Tableau à construire (exemple de structure) :", { bold: true }));
children.push(threeColTable(
  ["Colonne 1", "Colonne 2", "Colonne 3"],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 3200, 3200],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Pourquoi un tableau est-il plus pratique qu'un simple texte pour suivre une évolution dans le temps ?"));
children.push(numberedPar("2. Quel avantage y aurait-il à transformer ce tableau en graphique ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre tableau au reste de la classe en expliquant ce qu'il permet de suivre." }]));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-06",
  "L'activité pratique en classe",
  "Un petit groupe d'élèves de 8e AF construisant un tableau de suivi, certains sur papier avec une règle, " +
  "d'autres sur un ordinateur partagé.",
  "Un tableau de suivi peut être réalisé sur ordinateur ou entièrement sur papier.",
  "Illustrer concrètement le déroulement de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / analyse — Les applications autour de moi"));
children.push(bodyPar(
  "Observe, à l'école, à la maison ou dans un cybercafé, une application numérique utilisée par un adulte " +
  "(traitement de texte, tableur, présentation...). Avec son accord, pose-lui quelques questions.",
));
children.push(threeColTable(
  ["Application observée", "À quoi sert-elle ?", "Qui l'utilise et pourquoi ?"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [3000, 3200, 3400],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité de production collaborative"));
children.push(bodyPar(
  "En groupe, choisissez un petit sujet scolaire (par exemple, la présentation d'un des chapitres déjà étudiés " +
  "en ETAP). Répartissez-vous les tâches pour produire, sur ordinateur si possible ou sur papier, un texte " +
  "court, un tableau simple et une présentation de 2 à 3 diapositives sur ce sujet.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une application (ou logiciel) est un programme conçu pour une tâche précise.",
    "Le traitement de texte sert à rédiger et mettre en forme un texte.",
    "Le tableur sert à organiser des données, faire des calculs simples et créer des graphiques.",
    "La PAO sert à concevoir des présentations ou des documents à publier.",
    "Une application collaborative permet à plusieurs personnes de travailler sur un même document.",
    "Il existe souvent plusieurs solutions pour une même tâche ; les applications libres de droits sont à privilégier quand c'est possible.",
    "Utiliser le numérique de façon responsable protège les informations personnelles et respecte le travail des autres.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer un traitement de texte, un tableur et un logiciel de PAO.",
    "☐ Expliquer les étapes de base pour rédiger un document avec un traitement de texte.",
    "☐ Organiser des données simples dans un tableau.",
    "☐ Concevoir une présentation simple et bien organisée.",
    "☐ Expliquer comment organiser un travail collaboratif, même avec un seul appareil disponible.",
    "☐ Comparer deux solutions numériques et expliquer mon choix.",
    "☐ Citer une règle d'usage numérique responsable.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : application/logiciel, traitement de texte, tableur, PAO, application collaborative, " +
    "usage responsable du numérique.",
    "Vocabulaire clé à maîtriser : document, mise en forme, tableau, graphique, diaporama, application libre de droits.",
    "Avant l'évaluation, vérifie que tu peux : associer chaque type d'application à une tâche précise ; " +
    "expliquer comment répartir un travail collaboratif ; citer une règle de sécurité numérique.",
    "Question rapide de vérification : quelle application choisirais-tu pour organiser un tableau de suivi, et pourquoi ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "tableur · application collaborative · PAO · traitement de texte · graphique · mise en forme · libre de droits · diaporama.",
  { italics: true },
));
children.push(numberedPar("1. Pour rédiger un rapport, on utilise un logiciel de ......................"));
children.push(numberedPar("2. Pour organiser des données en tableau, on utilise un ......................"));
children.push(numberedPar("3. Pour concevoir une présentation, on utilise un logiciel de ......................"));
children.push(numberedPar("4. Une application qui permet à plusieurs personnes de travailler ensemble est une ......................"));
children.push(numberedPar("5. Mettre un texte en gras ou changer sa taille, c'est faire de la ......................"));
children.push(numberedPar("6. Un tableau de données peut être transformé en ...................... pour être plus clair."));
children.push(numberedPar("7. Une présentation de plusieurs diapositives s'appelle un ......................"));
children.push(numberedPar("8. Une application gratuite et légale à utiliser est dite ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Un logiciel de traitement de texte sert principalement à :"));
children.push(bulletPar("a) organiser des données en tableau"));
children.push(bulletPar("b) rédiger et mettre en forme un texte"));
children.push(bulletPar("c) concevoir un diaporama"));
children.push(spacer(60));
children.push(numberedPar("2. Un tableur permet notamment de :"));
children.push(bulletPar("a) créer des graphiques à partir de données"));
children.push(bulletPar("b) uniquement écrire du texte"));
children.push(bulletPar("c) uniquement dessiner"));
children.push(spacer(60));
children.push(numberedPar("3. Une application collaborative permet :"));
children.push(bulletPar("a) de travailler seul uniquement"));
children.push(bulletPar("b) à plusieurs personnes de contribuer à un même document"));
children.push(bulletPar("c) de supprimer automatiquement le travail des autres"));
children.push(spacer(60));
children.push(numberedPar("4. Le programme recommande de privilégier, quand c'est possible :"));
children.push(bulletPar("a) les applications les plus chères"));
children.push(bulletPar("b) les applications libres de droits"));
children.push(bulletPar("c) une seule application, toujours la même"));
children.push(spacer(60));
children.push(numberedPar("5. Utiliser le numérique de façon responsable, c'est notamment :"));
children.push(bulletPar("a) partager son mot de passe avec le groupe"));
children.push(bulletPar("b) vérifier une information avant de la partager"));
children.push(bulletPar("c) ignorer le travail des autres membres du groupe"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque application de la colonne A à sa fonction principale dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Traitement de texte", "a. Organiser des données et créer des graphiques."],
    ["2. Tableur", "b. Concevoir une présentation ou un document à publier."],
    ["3. PAO", "c. Permettre à plusieurs personnes de travailler sur un même document."],
    ["4. Application collaborative", "d. Rédiger et mettre en forme un texte."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Ton école ne dispose que d'un seul ordinateur pour toute la classe. Propose une organisation permettant à chaque groupe de préparer sa partie d'un projet numérique commun."));
children.push(numberedPar("2. Compare un traitement de texte et un tableur : dans quelle situation choisirais-tu l'un plutôt que l'autre ? Justifie ta réponse."));
children.push(numberedPar("3. Un camarade veut inclure, dans une présentation de groupe, une information trouvée en ligne sans la vérifier. Que lui conseilles-tu ?"));
children.push(numberedPar("4. Propose une amélioration simple à un document collaboratif mal organisé (par exemple, sans titres ni mise en forme)."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir les grandes familles d'applications numériques utilisées dans le monde " +
  "réel : le traitement de texte pour rédiger, le tableur pour organiser des données, la PAO pour concevoir " +
  "des présentations, et les applications collaboratives pour travailler à plusieurs sur un même document. Tu " +
  "as appris que ces outils restent utilisables même avec peu de matériel, à condition de bien s'organiser en " +
  "équipe, et que plusieurs solutions existent souvent pour une même tâche, les applications libres de droits " +
  "étant à privilégier quand c'est possible. Enfin, tu as vu que l'usage du numérique s'accompagne toujours " +
  "d'une responsabilité : protéger ses informations, vérifier ce que l'on partage, et respecter le travail des " +
  "autres.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "application (logiciel) · traitement de texte · tableur · PAO · application collaborative · mise en forme · " +
  "graphique · diaporama · libre de droits · usage responsable.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-07",
  "Usage responsable du numérique",
  "Un élève montrant à un camarade une bonne pratique numérique (ne pas partager un mot de passe, vérifier " +
  "une information), dans une ambiance pédagogique bienveillante.",
  "L'usage du numérique s'accompagne toujours d'une responsabilité.",
  "Ancrer visuellement les règles de sécurité et d'usage responsable du chapitre.",
  "Illustration demi-page, scène de classe haïtienne, ton pédagogique et positif.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C01-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Applications et outils collaboratifs », avec des branches vers : " +
  "traitement de texte, tableur, PAO, collaboration, choix responsables, sécurité.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte ETAP.",
));

await buildAndSave(children, 1, "Manuel_ETAP_8AF_Chapitre1.docx");
