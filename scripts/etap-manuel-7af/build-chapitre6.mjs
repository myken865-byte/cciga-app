// Manuel d'ETAP 7e AF — Chapitre 6 : Projet de synthese ETAP - 7e AF.
//
// [CHOIX EDITORIAL] Ce chapitre n'est adosse a aucune nouvelle unite
// detaillee du document source : il reinvestit les cinq champs et
// competences deja verifies et enseignes aux Chapitres 1 a 5, organises
// autour de la demarche de projet officielle (p.30/77 : identification d'un
// besoin -> recherche de solutions -> mise en place d'une production ->
// utilisation/reperage des ecarts et ameliorations), deja utilisee comme
// trame pedagogique au Chapitre 1 (section 1.7, adaptee en 6 etapes). Aucune
// competence, activite ou page nouvelle n'est inventee ; ce chapitre ne fait
// que mobiliser, sous forme de projet, ce qui a deja ete verifie :
//   - Numerique (Ch.1)         : p.24-25, p.30, p.39, p.46-47
//   - Metiers de la mer (Ch.2) : p.40-41
//   - Recyclage (Ch.3)         : p.42-43
//   - Agriculture (Ch.4)       : p.43-44
//   - Entrepreneuriat (Ch.5)   : p.45-46
// Le titre "Chapitre 6" et le principe d'un "projet de synthese" sont un
// choix editorial du manuel, non une exigence explicite du MENFP.
//
// Securite : aucun projet propose ne demande a l'eleve de manipuler seul un
// outil dangereux, un produit chimique, un dechet dangereux, un equipement
// electrique ouvert, un moteur, une embarcation ou du feu. Toutes les pistes
// de projet reposent sur observation, papier/carton propre, maquettes
// sures, entretiens supervises et outils numeriques ordinaires si
// disponibles — jamais une exigence d'equipement couteux.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
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
  6,
  "Projet de synthèse ETAP — 7e AF",
  "Tu as découvert cette année les outils numériques, les métiers de la mer, le recyclage, l'agriculture et " +
  "l'entreprise. Il est temps de mettre tout cela en pratique, en petit groupe, à travers un vrai projet.",
  [
    "Faire le point sur ce que tu as appris cette année en ETAP.",
    "Identifier un besoin simple de ton école ou de ta communauté.",
    "Choisir et organiser un projet réaliste, sûr et réalisable.",
    "Rechercher et organiser des informations utiles.",
    "Réaliser une production simple et sûre, puis la présenter.",
    "Évaluer ton projet et proposer une amélioration.",
  ],
));

children.push(bodyPar(
  "Ce chapitre est différent des précédents : il ne t'apprend pas une notion nouvelle, mais t'aide à réutiliser " +
  "tout ce que tu as appris dans les cinq chapitres précédents, à travers un projet que ta classe va construire " +
  "ensemble, étape par étape.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel (déjà rencontré, à réactiver)"));
children.push(bulletPar("Besoin — ce à quoi une solution doit répondre."));
children.push(bulletPar("Démarche de projet — suite d'étapes permettant de passer d'un besoin à une solution."));
children.push(bulletPar("Ressources — ce dont on a besoin pour réaliser un projet (matériel, personnes, informations)."));
children.push(bulletPar("Présentation — moment où l'on explique son projet à d'autres personnes."));
children.push(bulletPar("Autoévaluation — moment où l'on réfléchit soi-même à ce qui a bien ou moins bien fonctionné."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Faire le point sur ce que nous avons appris", "6.1"));
children.push(bodyPar(
  "Avant de commencer un projet, il est utile de se rappeler ce que l'on sait déjà. Le tableau suivant résume " +
  "les cinq champs étudiés cette année.",
));
children.push(threeColTable(
  ["Chapitre et champ", "Ce que tu as appris", "Compétence travaillée"],
  [
    ["1 — Nouvelles technologies du numérique", "Objets numériques, stockage, réseaux sans fil, capteurs/actionneurs, démarche technologique", "Décrire le fonctionnement d'objets numériques"],
    ["2 — Métiers de la mer", "Métiers, outils, organisation du travail, sécurité, préservation de la ressource", "Décrire les métiers de la mer, leurs outils et leur organisation"],
    ["3 — Recyclage des objets techniques", "Cycle de vie, étapes du recyclage, métiers, réemploi", "Appréhender les enjeux et processus du recyclage"],
    ["4 — Métiers de l'agriculture", "Métiers, outils, organisation, environnement", "Décrire les métiers de l'agriculture, leurs outils et leur organisation"],
    ["5 — Découvrir l'entreprise", "Bien/service, tailles et statuts d'entreprise, secteurs d'activité", "Appréhender les formes d'entreprise, leur contexte social et juridique"],
  ],
  [2600, 4200, 2600],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-01",
  "Un groupe d'élèves prépare un projet ETAP",
  "Un petit groupe d'élèves haïtiens de 7e AF, en classe, autour d'une table, discutant et commençant à " +
  "organiser un projet (feuilles, crayons, quelques images).",
  "Le projet de synthèse se construit en groupe, à partir de ce qui a été appris dans l'année.",
  "Ouvrir le chapitre sur une scène concrète de travail collectif.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance motivée et collaborative.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-02",
  "Carte visuelle des cinq champs étudiés",
  "Carte mentale ou schéma en étoile avec « ETAP 7e AF » au centre et cinq branches : numérique, métiers de la " +
  "mer, recyclage, agriculture, entrepreneuriat, chacune avec un petit pictogramme.",
  "Visualiser d'un coup d'œil les cinq champs étudiés cette année.",
  "Aider l'élève à se repérer parmi les acquis de l'année avant de choisir son projet.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Identifier un besoin ou un problème simple", "6.2"));
children.push(bodyPar(
  "Un bon projet part toujours d'un besoin réel, observé dans son école ou sa communauté. Voici quelques " +
  "exemples de besoins simples, liés à chacun des cinq champs étudiés.",
));

children.push(calloutBox(
  "OBSERVER — Exemples de besoins, par champ",
  [
    "Numérique : mieux organiser le stockage des fichiers de la classe.",
    "Métiers de la mer : mieux faire connaître un métier de la mer de la région.",
    "Recyclage : réduire les déchets à l'école.",
    "Agriculture : mieux comprendre une activité agricole locale.",
    "Entrepreneuriat : imaginer un petit bien ou service utile à l'école.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-03",
  "Identifier un besoin ou un problème",
  "Des élèves observant leur environnement scolaire (cour, classe, alentours) en notant sur un carnet ce qui " +
  "pourrait être amélioré, sans situation dangereuse.",
  "Un projet commence toujours par l'observation d'un besoin réel.",
  "Illustrer concrètement l'étape d'identification du besoin.",
  "Illustration pleine largeur, scène scolaire haïtienne, ambiance d'observation active.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Choisir et définir son projet", "6.3"));
children.push(bodyPar(
  "Une fois un besoin identifié, il faut choisir une piste de projet réaliste. Voici cinq pistes possibles, une " +
  "par champ étudié. L'enseignant choisira, selon les moyens de l'école, une ou plusieurs pistes accessibles à " +
  "toute la classe — aucune piste n'exige d'ordinateur, d'Internet, de jardin ou d'accès à la mer.",
));

children.push(twoColTable(
  "Piste de projet", "Exemple de production simple",
  [
    ["A — Numérique simple", "Une affiche (papier ou numérique si possible) expliquant comment bien organiser ses fichiers ou reconnaître un réseau sans fil."],
    ["B — Recyclage / réemploi sûr", "Un objet réemployé simple (voir Chapitre 3) ou une affiche de sensibilisation au tri des déchets de l'école."],
    ["C — Observation agricole", "Une fiche d'enquête sur une activité agricole locale, ou un petit suivi d'une plante en pot si l'école le permet."],
    ["D — Étude d'un métier de la mer", "Un dossier de recherche documentaire ou d'entretien sur un métier de la mer, même pour une école éloignée de la côte."],
    ["E — Mini bien ou service", "Une fiche décrivant un petit bien ou service utile à l'école, sans le réaliser réellement."],
  ],
));
children.push(spacer(160));

children.push(bodyPar(
  "Quelle que soit la piste choisie, il faut définir : l'objectif du projet, les bénéficiaires (qui va en " +
  "profiter), les contraintes (temps, matériel disponible) et le résultat attendu.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("La fiche projet — un outil à réutiliser pour tout le chapitre"));
children.push(bodyPar(
  "Cette fiche accompagne le groupe tout au long du projet. Elle se complète progressivement, section après " +
  "section, au fil du chapitre.",
));
children.push(threeColTable(
  ["Rubrique", "Contenu à compléter", "Section du chapitre"],
  [
    ["Titre du projet", "", "6.3"],
    ["Problème / besoin", "", "6.2"],
    ["Objectif", "", "6.3"],
    ["Champ(s) ETAP mobilisé(s)", "", "6.1 / 6.3"],
    ["Personnes concernées (bénéficiaires)", "", "6.3"],
    ["Informations à rechercher", "", "6.4"],
    ["Matériel", "", "6.6"],
    ["Règles de sécurité", "", "6.6"],
    ["Étapes", "", "6.6"],
    ["Rôles", "", "6.6"],
    ["Résultat attendu", "", "6.3 / 6.7"],
    ["Impact environnemental", "", "6.7"],
    ["Présentation prévue", "", "6.8"],
    ["Autoévaluation", "", "6.9"],
    ["Améliorations possibles", "", "6.9"],
  ],
  [3400, 3400, 2200],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rechercher et organiser les informations", "6.4"));
children.push(bodyPar(
  "Une fois le projet choisi, il faut rassembler des informations utiles : observer, poser des questions, " +
  "prendre des notes. Les sources simples et sûres sont à privilégier : ce que l'on observe soi-même, ce que " +
  "raconte une personne interrogée avec l'accord d'un adulte responsable, ou un document fourni par " +
  "l'enseignant.",
));

children.push(calloutBox(
  "TECHNIQUE — Organiser ses informations",
  [
    "Noter ce que l'on observe, avec la date.",
    "Préparer ses questions avant un entretien.",
    "Classer ses notes par thème (besoin, solutions possibles, matériel...).",
    "Distinguer ce qui est observé directement de ce qui est rapporté par une autre personne.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Imaginer une solution", "6.5"));
children.push(bodyPar(
  "À partir des informations recueillies, le groupe imagine plusieurs solutions possibles, puis les compare " +
  "pour choisir la plus adaptée : la plus simple à réaliser, la plus sûre, et celle qui répond le mieux au " +
  "besoin identifié.",
));
children.push(twoColTable(
  "Solution envisagée", "Avantages et limites",
  [
    ["Solution 1", ""],
    ["Solution 2", ""],
  ],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-04",
  "Comparer plusieurs solutions simples",
  "Des élèves autour d'un tableau ou d'une grande feuille, comparant deux ou trois idées de solutions avec des " +
  "dessins ou des mots-clés.",
  "Un bon projet compare plusieurs solutions avant d'en choisir une.",
  "Illustrer concrètement l'étape de comparaison des solutions.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance de réflexion collective.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Préparer le travail", "6.6"));
children.push(bodyPar(
  "Avant de réaliser le projet, le groupe organise son travail : qui fait quoi, avec quel matériel, et en " +
  "combien de temps.",
));
children.push(threeColTable(
  ["Rôle", "Élève responsable", "Tâche principale"],
  [
    ["Coordination du groupe", "", ""],
    ["Recherche d'informations", "", ""],
    ["Réalisation de la production", "", ""],
    ["Présentation finale", "", ""],
  ],
  [2800, 2800, 3400],
));
children.push(spacer(160));

children.push(calloutBox(
  "SÉCURITÉ — Règles valables pour tous les projets",
  [
    "Utiliser uniquement du papier, du carton propre, ou des matériaux sûrs déjà validés dans les chapitres précédents.",
    "Ne jamais manipuler seul un outil coupant, un produit chimique, un déchet dangereux, un équipement électrique ouvert, un moteur ou une embarcation.",
    "Réaliser toute observation en dehors de la classe uniquement avec l'accord et sous la supervision d'un adulte responsable.",
    "Demander de l'aide à l'enseignant en cas de doute sur la sécurité d'une étape.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-05",
  "Planifier : rôles, matériel et étapes",
  "Un tableau ou une affiche de planification en classe, avec les noms des élèves, leurs rôles et une liste " +
  "d'étapes, dans une ambiance organisée.",
  "Un projet réussi commence par une bonne organisation du travail.",
  "Illustrer concrètement l'étape de planification du projet.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et organisée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Réaliser ou représenter la solution", "6.7"));
children.push(bodyPar(
  "Le groupe réalise maintenant sa production : une affiche, un dossier, une maquette sûre (par exemple à " +
  "partir de papier, de carton ou d'objets réemployés comme au Chapitre 3), ou toute autre production adaptée à " +
  "la piste choisie. Cette étape doit toujours respecter les règles de sécurité rappelées à la section 6.6.",
));
children.push(bodyPar(
  "Pense aussi à noter l'impact environnemental de ton projet : ta production utilise-t-elle des matériaux " +
  "réemployés ? Évite-t-elle le gaspillage ?",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-06",
  "Réalisation d'une production sûre",
  "Des élèves fabriquant une affiche ou une maquette simple en papier/carton, sous la supervision de " +
  "l'enseignant, sans outil ni matériau dangereux.",
  "La réalisation du projet se fait toujours avec des matériaux et des méthodes sûrs.",
  "Illustrer concrètement l'étape de réalisation, en insistant sur la sécurité.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance active et encadrée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Présenter et expliquer le projet", "6.8"));
children.push(bodyPar(
  "La dernière étape importante est de présenter le projet à la classe. Une bonne présentation explique, dans " +
  "l'ordre : le besoin de départ, la démarche suivie, le résultat obtenu, les difficultés rencontrées, et ce " +
  "que le groupe a appris.",
));

children.push(calloutBox(
  "DÉCOUVRIR — Le plan d'une bonne présentation",
  [
    "1. Le besoin auquel répond le projet.",
    "2. La démarche suivie (les grandes étapes).",
    "3. Le résultat obtenu.",
    "4. Les difficultés rencontrées.",
    "5. Ce que le groupe a appris.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-07",
  "Présentation du projet devant la classe",
  "Un groupe d'élèves présentant leur projet (affiche ou maquette) devant leurs camarades assis, dans une " +
  "salle de classe haïtienne.",
  "Présenter son travail fait partie intégrante de la démarche de projet.",
  "Illustrer concrètement le moment de la présentation finale.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Évaluer et améliorer", "6.9"));
children.push(bodyPar(
  "Un projet ne s'arrête pas à la présentation : il est utile de réfléchir à ce qui a bien fonctionné, à ce qui " +
  "pourrait être amélioré, et d'écouter les retours des autres groupes et de l'enseignant.",
));

children.push(bodyPar(
  "Grille d'évaluation du projet [CHOIX ÉDITORIAL — barème du manuel, non un barème officiel MENFP] :",
  { bold: true },
));
children.push(threeColTable(
  ["Critère", "À consolider", "Maîtrisé"],
  [
    ["Compréhension du besoin", "", ""],
    ["Utilisation des connaissances ETAP", "", ""],
    ["Organisation et coopération", "", ""],
    ["Respect de la sécurité", "", ""],
    ["Attention à l'environnement", "", ""],
    ["Clarté de la présentation", "", ""],
    ["Capacité à expliquer et à améliorer le projet", "", ""],
  ],
  [4200, 2600, 2600],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C06-08",
  "Évaluer, recevoir un retour, améliorer",
  "Un groupe d'élèves relisant leur fiche projet et cochant une grille d'évaluation simple, dans une ambiance " +
  "réflexive et positive.",
  "Évaluer son projet permet de comprendre ce qui a bien fonctionné et ce qui peut encore progresser.",
  "Illustrer concrètement l'étape finale d'évaluation et d'amélioration.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance calme et réflexive.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de réactivation des acquis"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Se rappeler les notions essentielles des cinq champs étudiés cette année avant de commencer le projet." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier, crayon, le tableau de la section 6.1." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Travail individuel, puis mise en commun en classe entière." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Pour chacun des cinq champs, note un mot-clé et un exemple appris cette année." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Complète individuellement un tableau avec les cinq champs (numérique, mer, recyclage, agriculture, entrepreneuriat)."));
children.push(numberedPar("2. Pour chacun, écris un mot-clé et un exemple vu dans le chapitre correspondant."));
children.push(numberedPar("3. Partage tes réponses avec un camarade, puis avec la classe."));
children.push(spacer(80));
children.push(bodyPar("OBSERVATIONS — Tableau à compléter :", { bold: true }));
children.push(threeColTable(
  ["Champ", "Mot-clé", "Exemple retenu"],
  [
    ["Numérique", "", ""],
    ["Métiers de la mer", "", ""],
    ["Recyclage", "", ""],
    ["Agriculture", "", ""],
    ["Entrepreneuriat", "", ""],
  ],
  [2800, 2800, 3400],
));
children.push(spacer(80));
children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Quel champ te semble le plus utile pour ton projet ? Pourquoi ?"));
children.push(numberedPar("2. Deux champs différents peuvent-ils être liés dans un même projet ? Donne un exemple."));
children.push(spacer(80));
children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Cette réactivation t'aide à choisir, dans la section suivante, la piste de projet la plus adaptée à ton groupe." }]));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité de planification — Compléter la fiche projet"));
children.push(bodyPar(
  "En groupe, choisissez une piste de projet parmi celles de la section 6.3, puis complétez ensemble le début " +
  "de votre fiche projet (titre, problème/besoin, objectif, champ(s) mobilisé(s), personnes concernées).",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Le projet principal — à réaliser sur plusieurs séances"));
children.push(bodyPar(
  "Le projet principal se déroule sur plusieurs séances, en suivant les sections 6.4 à 6.9 de ce chapitre : " +
  "rechercher des informations, imaginer et choisir une solution, préparer le travail, réaliser la production, " +
  "la présenter, puis l'évaluer. La fiche projet (page précédente) accompagne le groupe tout au long de ce " +
  "travail.",
));
children.push(calloutBox(
  "PROJET — Calendrier indicatif",
  [
    "Séance 1 : réactivation des acquis, choix de la piste, début de la fiche projet.",
    "Séance 2 : recherche et organisation des informations.",
    "Séance 3 : comparaison des solutions et préparation du travail.",
    "Séance 4 : réalisation de la production.",
    "Séance 5 : présentation et évaluation.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(bodyPar(
  "Ce calendrier est indicatif : l'enseignant peut l'adapter selon le temps disponible et les moyens de " +
  "l'école.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Présentation orale/écrite adaptée"));
children.push(bodyPar(
  "Selon les moyens de l'école, la présentation peut être orale (devant la classe, avec une affiche ou une " +
  "maquette), écrite (un dossier remis à l'enseignant), ou les deux. Elle suit le plan présenté à la section " +
  "6.8.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Bilan personnel — Ce que j'ai appris en ETAP cette année"));
children.push(bodyPar(
  "Pour terminer, réponds individuellement à ces quelques questions, dans ton cahier.",
));
children.push(numberedPar("1. Quel chapitre de cette année t'a le plus intéressé(e) ? Pourquoi ?"));
children.push(numberedPar("2. Quelle notion nouvelle utilises-tu déjà dans ta vie quotidienne ?"));
children.push(numberedPar("3. Qu'as-tu préféré dans ton projet de synthèse ?"));
children.push(numberedPar("4. Que voudrais-tu approfondir l'année prochaine ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un projet part toujours d'un besoin réel, observé dans son école ou sa communauté.",
    "La démarche de projet suit des étapes : besoin, recherche, choix, préparation, réalisation, présentation, évaluation.",
    "Un bon projet compare plusieurs solutions avant d'en choisir une.",
    "La sécurité doit toujours être respectée, quelle que soit la piste de projet choisie.",
    "Présenter et évaluer son projet fait partie intégrante de la démarche.",
    "Les cinq champs étudiés cette année (numérique, mer, recyclage, agriculture, entrepreneuriat) peuvent tous nourrir un projet.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Résumer ce que j'ai appris dans chacun des cinq champs de l'année.",
    "☐ Identifier un besoin simple de mon école ou de ma communauté.",
    "☐ Choisir une piste de projet réaliste et sûre.",
    "☐ Organiser des informations utiles à mon projet.",
    "☐ Comparer plusieurs solutions avant d'en choisir une.",
    "☐ Présenter mon projet de façon claire et organisée.",
    "☐ Évaluer mon projet et proposer une amélioration.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : démarche de projet, besoin, solution, ressources, présentation, autoévaluation, " +
    "amélioration, et les cinq champs de l'année.",
    "Vocabulaire clé à maîtriser : les six étapes de la démarche technologique (Chapitre 1), les compétences " +
    "de chacun des cinq champs (tableau de la section 6.1).",
    "Avant l'évaluation, vérifie que tu peux : citer les grandes étapes d'un projet ; expliquer pourquoi on " +
    "compare plusieurs solutions ; citer une règle de sécurité valable pour tous les projets.",
    "Question rapide de vérification : cite les cinq champs étudiés cette année en ETAP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "besoin · présentation · sécurité · solution · fiche projet · autoévaluation · rôles · comparer.",
  { italics: true },
));
children.push(numberedPar("1. Un bon projet part toujours d'un ...................... réel."));
children.push(numberedPar("2. Avant de choisir une solution, il faut ...................... plusieurs idées."));
children.push(numberedPar("3. L'outil qui accompagne le groupe tout au long du projet s'appelle la ......................"));
children.push(numberedPar("4. Répartir les tâches entre les membres du groupe, c'est définir les ......................"));
children.push(numberedPar("5. La ...................... permet d'expliquer son projet à la classe."));
children.push(numberedPar("6. Une réponse proposée à un besoin s'appelle une ......................"));
children.push(numberedPar("7. Réfléchir soi-même à ce qui a bien ou moins bien fonctionné s'appelle l'......................"));
children.push(numberedPar("8. Respecter les règles de ...................... est indispensable dans tous les projets."));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Un projet de synthèse commence toujours par :"));
children.push(bulletPar("a) la présentation"));
children.push(bulletPar("b) l'identification d'un besoin"));
children.push(bulletPar("c) l'évaluation"));
children.push(spacer(60));
children.push(numberedPar("2. Pourquoi compare-t-on plusieurs solutions avant d'en choisir une ?"));
children.push(bulletPar("a) pour perdre du temps"));
children.push(bulletPar("b) pour choisir la solution la plus adaptée au besoin"));
children.push(bulletPar("c) ce n'est pas nécessaire"));
children.push(spacer(60));
children.push(numberedPar("3. Lequel de ces projets respecte les règles de sécurité du chapitre ?"));
children.push(bulletPar("a) fabriquer une affiche en papier et carton propre"));
children.push(bulletPar("b) manipuler seul un produit chimique"));
children.push(bulletPar("c) utiliser un moteur sans supervision"));
children.push(spacer(60));
children.push(numberedPar("4. Une bonne présentation de projet explique notamment :"));
children.push(bulletPar("a) uniquement le résultat final"));
children.push(bulletPar("b) le besoin, la démarche, le résultat, les difficultés et les apprentissages"));
children.push(bulletPar("c) uniquement les difficultés rencontrées"));
children.push(spacer(60));
children.push(numberedPar("5. Évaluer son projet sert surtout à :"));
children.push(bulletPar("a) comprendre ce qui a fonctionné et ce qui peut être amélioré"));
children.push(bulletPar("b) obtenir uniquement une note"));
children.push(bulletPar("c) arrêter le projet définitivement"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque champ de la colonne A à l'exemple de projet correspondant dans la colonne B (une seule bonne " +
  "réponse par champ).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Numérique", "a. Une fiche décrivant un petit bien ou service utile à l'école."],
    ["2. Métiers de la mer", "b. Un dossier de recherche sur un métier de la mer."],
    ["3. Recyclage", "c. Une affiche expliquant comment organiser ses fichiers."],
    ["4. Agriculture", "d. Un objet réemployé fabriqué à partir de matériaux propres."],
    ["5. Entrepreneuriat", "e. Une fiche d'enquête sur une activité agricole locale."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Choisis un besoin simple de ton école et propose une piste de projet parmi celles vues à la section 6.3."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi la sécurité doit être respectée même dans un projet scolaire."));
children.push(numberedPar("3. Comment ton groupe pourrait-il tenir compte de l'environnement dans son projet ?"));
children.push(numberedPar("4. Après avoir présenté un projet, quelle amélioration pourrais-tu proposer ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de mobiliser, à travers un projet concret, tout ce qui a été appris cette année en " +
  "ETAP : les outils numériques, les métiers de la mer, le recyclage, l'agriculture et la découverte de " +
  "l'entreprise. Tu as suivi une démarche de projet complète : identifier un besoin, choisir et définir un " +
  "projet, rechercher des informations, imaginer et comparer des solutions, préparer le travail, réaliser une " +
  "production sûre, la présenter, puis l'évaluer. Cette démarche, que tu as pratiquée cette année à un niveau " +
  "simple, te sera utile tout au long de ta scolarité, et bien au-delà.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "besoin · démarche de projet · fiche projet · solution · rôles · sécurité · présentation · autoévaluation · " +
  "amélioration.",
));

await buildAndSave(children, 70, "Manuel_ETAP_7AF_Chapitre6.docx");
