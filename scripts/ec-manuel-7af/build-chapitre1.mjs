// Manuel d'EC 7e AF — Chapitre 1 : Moi, Haïtien : nation et identité
// (Unité 1 — La nation haïtienne et l'identité haïtienne, Compétence C1).
//
// PREMIER CHAPITRE DE LA COLLECTION EC : ouvre le manuel 7e AF, pagination
// fraîche (page 1). Aucune collection EPS/ETAP/EEA n'est modifiée ou
// réutilisée ici.
//
// Contenu construit à partir des livrables Phase 0 / Validation &
// Verrouillage de la Collection EC, eux-mêmes vérifiés en direct sur le
// document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.33-34 : Unité 1, colonne 7e AF explicitement séparée par année
//     (`09_TABLE_MATIERES_PROPOSEE_EC_7AF.md`, verrouillée sans changement
//     dans `19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md`) : "la nation
//     haïtienne (valeurs, symboles, patrimoine historique et culturel,
//     textes de référence) ; l'organisation territoriale d'Haïti ; la
//     responsabilité citoyenne dans la sauvegarde du patrimoine."
//   - `05_MATRICE_COMPETENCES_UNITES_EC.md`, Unité 1 : savoirs/savoir-faire
//     cités verbatim : "définir l'identité (et l'identité haïtienne en
//     particulier) ; connaître les fondements d'une nation et ceux de la
//     nation haïtienne ; connaître et respecter les éléments constitutifs
//     de l'identité haïtienne ; connaître les symboles de la nation et de
//     l'État haïtiens ; connaître l'organisation territoriale d'Haïti."
//     Activité officielle citée verbatim : "recherche sur les monuments et
//     lieux historiques/patrimoniaux... rédaction collaborative d'un
//     glossaire illustré (poursuivie tout le cycle) et d'un répertoire de
//     textes sur les droits et devoirs." Évaluation officielle citée
//     verbatim : "à partir de représentations (dessin, gravure, photo,
//     film) et de symboles/monuments, expliquer en quoi ceux-ci symbolisent
//     l'identité et l'unité nationales."
//   - Compétence C1 mobilisée seule dans cette unité (voir tableau croisé
//     compétences × unités, `05_MATRICE_COMPETENCES_UNITES_EC.md`).
//
// STATUT DES CONTENUS FACTUELS AJOUTÉS (transparence, section 3/9 du prompt
// d'exécution) :
//   - Les symboles nationaux (drapeau bleu et rouge, hymne "La
//     Dessalinienne", devise "L'Union fait la Force", armoiries) sont des
//     éléments d'ordre public largement documentés, mais leur formulation
//     exacte dans la Constitution de 1987 n'a PAS été revérifiée en direct
//     pendant cette session : ils sont donc traités comme
//     [ADAPTATION PÉDAGOGIQUE] (connaissance civique générale, non copiée
//     d'un texte précis), et un emplacement DOC est réservé, marqué
//     [SOURCE À VÉRIFIER], pour un futur extrait constitutionnel exact.
//   - L'organisation territoriale d'Haïti (10 départements, arrondissements,
//     communes, sections communales) est une structure administrative
//     factuelle d'ordre public, non spécifique au MENFP : traitée comme
//     [ADAPTATION PÉDAGOGIQUE], aucune liste de communes n'est inventée par
//     souci de prudence (seule la structure générale est présentée).
//   - Aucune situation, aucun nom de lieu précis n'est présenté comme un
//     exemple officiel du programme sauf lorsque explicitement tagué
//     [OFFICIEL].
//
// Neutralité : les symboles nationaux et l'organisation territoriale sont
// présentés de façon factuelle et institutionnelle, sans référence à un
// parti, un gouvernement ou une période politique précise.
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
  1,
  "Moi, Haïtien : nation et identité",
  "Un drapeau qui flotte devant une école, un monument au centre d'une place, une chanson que tout le monde " +
  "reconnaît dès les premières notes : ce chapitre part de ce que tu vois et entends déjà autour de toi pour " +
  "comprendre ce qui fait de toi une citoyenne ou un citoyen haïtien.",
  [
    "Définir ce qu'est une nation et ce qui fonde la nation haïtienne.",
    "Reconnaître et respecter les éléments constitutifs de l'identité haïtienne.",
    "Identifier les symboles de la nation et de l'État haïtiens.",
    "Décrire l'organisation territoriale d'Haïti.",
    "Expliquer en quoi un symbole ou un monument représente l'identité et l'unité nationales.",
    "S'engager comme citoyenne ou citoyen dans la sauvegarde du patrimoine.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Une place, un monument, une question",
  [
    "Dans une commune haïtienne, une classe de 7e AF passe devant un monument ou un lieu historique de son " +
    "quartier — un fort, une place publique, une maison ancienne, une statue. « On passe devant tous les " +
    "jours, mais qu'est-ce que ça représente vraiment ? » demande un élève. Ce chapitre t'aide à répondre à " +
    "cette question, pour ce lieu comme pour les symboles de tout le pays.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis utiles"));
children.push(bodyPar(
  "Ce chapitre ouvre la Collection EC : il ne suppose aucun acquis préalable spécifique à cette discipline. " +
  "Il s'appuie simplement sur ce que tu connais déjà de ton quartier, de ta commune et de ton pays — ce que tu " +
  "as vu, entendu ou vécu — pour construire, pas à pas, un vocabulaire et des repères plus précis.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Nation — ensemble de personnes qui partagent une histoire, une culture, un territoire et le sentiment d'appartenir à une même communauté."));
children.push(bulletPar("Identité nationale — ce qui permet à une population de se reconnaître et d'être reconnue comme appartenant à une même nation."));
children.push(bulletPar("Symbole national — objet, image, chant ou devise qui représente officiellement un pays et son unité."));
children.push(bulletPar("Patrimoine — ensemble des biens, lieux et traditions hérités du passé, que la collectivité choisit de préserver."));
children.push(bulletPar("Territoire — espace géographique délimité sur lequel s'exerce l'autorité d'un État."));
children.push(bulletPar("Citoyenneté — statut et rôle d'une personne reconnue comme membre à part entière d'un État, avec des droits et des devoirs."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce qu'une nation ?", "1.1"));
children.push(bodyPar(
  "Une nation n'est pas seulement un territoire sur une carte. C'est un ensemble de personnes qui partagent " +
  "une histoire commune, une langue ou des langues communes, des valeurs, des traditions, et le sentiment " +
  "d'appartenir ensemble à un même pays — même lorsqu'elles vivent dans des régions différentes, ou même à " +
  "l'étranger.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Ce qui fonde une nation",
  [
    "Une histoire commune, faite d'événements que la population reconnaît comme siens.",
    "Une ou plusieurs langues partagées, qui permettent de se comprendre et de se transmettre cette histoire.",
    "Des valeurs et des traditions communes, vécues au quotidien.",
    "Le sentiment d'appartenance : se sentir membre de cette communauté, où que l'on se trouve.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C01-01",
  "Ouverture — Devant le monument du quartier",
  "Une scène crédible d'élèves de 7e AF, en groupe devant un monument ou un lieu patrimonial générique d'une " +
  "commune haïtienne (place publique, fort, statue), dans un style illustratif cohérent avec la charte EC.",
  "Un lieu du quotidien peut devenir un point de départ pour comprendre l'identité nationale.",
  "Ancrer l'ouverture du chapitre dans une scène concrète et reconnaissable.",
  "Illustration pleine largeur, scène de rue/place haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les fondements de la nation haïtienne", "1.2"));
children.push(bodyPar(
  "La nation haïtienne s'est construite à travers une histoire particulière : celle d'un peuple qui a conquis " +
  "son indépendance et qui a, depuis, forgé une identité propre — marquée par des langues partagées (le " +
  "créole et le français), des pratiques culturelles, des croyances et des façons de vivre ensemble reconnues " +
  "comme haïtiennes.",
));
children.push(bodyPar(
  "Reconnaître ces fondements, ce n'est pas réciter une liste : c'est comprendre pourquoi certains éléments — " +
  "une date, une chanson, un lieu — comptent pour l'ensemble du pays, et pas seulement pour une région ou une " +
  "famille.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les symboles de la nation et de l'État haïtiens", "1.3"));
children.push(bodyPar(
  "Un symbole national représente officiellement le pays tout entier. Il permet à chaque citoyenne et chaque " +
  "citoyen de se reconnaître comme appartenant à la même nation, quelle que soit la région où il ou elle vit.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des symboles à reconnaître [ADAPTATION PÉDAGOGIQUE]",
  [
    "Le drapeau — bleu et rouge, disposé horizontalement, avec les armoiries au centre sur les drapeaux " +
    "officiels.",
    "L'hymne national — « La Dessalinienne », chanté lors des cérémonies officielles et des grands événements " +
    "nationaux.",
    "La devise — « L'Union fait la Force », rappel de l'importance de l'unité entre les citoyennes et les " +
    "citoyens.",
    "Les armoiries — un ensemble d'éléments (palmier, bonnet, drapeaux, canons) réunis pour représenter la " +
    "souveraineté et l'histoire du pays.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces symboles sont présentés ici de façon générale, à partir de connaissances civiques largement partagées. " +
  "La formulation exacte de leur description officielle (Constitution) reste à vérifier avant intégration " +
  "définitive — voir le document réservé ci-dessous.",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-7AF-C01-01 — Emplacement réservé pour un extrait exact et vérifié de la Constitution haïtienne de " +
    "1987 décrivant les symboles nationaux (drapeau, hymne, devise, armoiries).",
    "Statut : [SOURCE À VÉRIFIER] — aucune formulation n'est reproduite ici tant que le texte exact n'a pas " +
    "été confirmé auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C01-02",
  "Exemple analysé — les symboles de la nation",
  "Une planche pédagogique présentant, côte à côte et de façon schématique, le drapeau haïtien, une portée " +
  "musicale symbolisant l'hymne, et la devise écrite, sans reproduire les armoiries officielles en détail " +
  "exact tant que la source n'est pas vérifiée.",
  "Les symboles nationaux se reconnaissent et se distinguent les uns des autres.",
  "Donner une référence visuelle claire des principaux symboles évoqués dans le cours.",
  "Illustration demi-page, planche schématique, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("L'organisation territoriale d'Haïti", "1.4"));
children.push(bodyPar(
  "Comprendre son pays, c'est aussi comprendre comment son territoire est organisé. Haïti est divisé en " +
  "plusieurs niveaux administratifs, du plus large au plus proche du quotidien.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Du département à la section communale [ADAPTATION PÉDAGOGIQUE]",
  [
    "Le département — le plus grand niveau administratif ; Haïti compte dix départements.",
    "L'arrondissement — un regroupement de communes à l'intérieur d'un département.",
    "La commune — l'unité administrative où se trouvent la mairie et les principaux services locaux.",
    "La section communale — la subdivision la plus proche du quotidien des habitants, notamment en zone " +
    "rurale.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Recherche : dans quel département, quel arrondissement, quelle commune et — si tu le sais — quelle section " +
  "communale se trouve ton école ? Situe-les sur une carte d'Haïti.",
  { italics: true },
));
children.push(spacer(200));

children.push(threeColTable(
  ["Niveau administratif", "Ce qu'il regroupe", "Mon repère personnel"],
  [
    ["Département", "Plusieurs arrondissements", ""],
    ["Arrondissement", "Plusieurs communes", ""],
    ["Commune", "Sections communales, quartiers", ""],
    ["Section communale", "Localités, habitations", ""],
  ],
  [3200, 3400, 3400],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le patrimoine haïtien et la responsabilité citoyenne", "1.5"));
children.push(bodyPar(
  "Le patrimoine d'un pays regroupe tout ce qui a été hérité du passé et que la population choisit de " +
  "préserver : monuments, lieux historiques, traditions, savoir-faire. Le sauvegarder n'est pas seulement le " +
  "rôle de l'État : c'est aussi une responsabilité citoyenne, qui commence à l'échelle du quartier et de " +
  "l'école.",
));

children.push(calloutBox(
  "ÉTUDE DE CAS — Un lieu patrimonial menacé",
  [
    "Dans une commune haïtienne, un ancien fort ou une place historique se dégrade faute d'entretien : murs " +
    "fissurés, déchets accumulés, absence de panneau explicatif. Des habitants du quartier proposent une " +
    "journée de nettoyage et de sensibilisation, mais tout le monde n'est pas convaincu que « ça vaut le " +
    "coup ».",
    "1. Pourquoi ce lieu peut-il être considéré comme faisant partie du patrimoine national, même s'il est " +
    "situé dans une seule commune ?",
    "2. Quelles conséquences la dégradation d'un tel lieu peut-elle avoir pour la communauté ?",
    "3. Que répondrais-tu à un habitant qui pense que ce n'est « pas son problème » ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Faut-il connaître les symboles nationaux pour être un bon citoyen ?",
  [
    "Certains pensent que connaître le drapeau, l'hymne et les monuments est indispensable pour se sentir " +
    "membre de la nation. D'autres pensent que ce qui compte, c'est surtout d'agir de façon responsable au " +
    "quotidien, avec ou sans cette connaissance.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, essaie de formuler une position qui tient compte des deux points de vue échangés en " +
    "classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C01-03",
  "Étude de cas — le lieu patrimonial à restaurer",
  "Une illustration montrant un lieu patrimonial haïtien générique (fort, place, maison ancienne) en état de " +
  "dégradation d'un côté, et une scène de journée citoyenne de nettoyage/sensibilisation de l'autre, sans " +
  "représenter un monument réel et identifiable précis.",
  "Un même lieu peut être montré avant et après un engagement citoyen.",
  "Illustrer concrètement la situation de l'étude de cas pour faciliter la discussion.",
  "Illustration demi-page, composition avant/après, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Enquête sur un lieu patrimonial"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Réaliser une courte recherche sur un monument ou un lieu historique/patrimonial de ton " +
    "quartier ou de ta commune, puis la partager avec la classe. [OFFICIEL — activité prévue par le programme]",
    "CONSIGNES : Choisis un lieu accessible (place, monument, bâtiment ancien, site naturel reconnu). " +
    "Renseigne-toi auprès d'un adulte, d'un(e) enseignant(e) ou d'une source fiable sur son histoire et son " +
    "importance.",
    "ÉTAPES : 1. Choisir le lieu. 2. Recueillir au moins trois informations vérifiées (date, événement, rôle " +
    "actuel). 3. Prendre une photo, faire un dessin ou rédiger une courte description. 4. Préparer une " +
    "présentation de deux minutes pour la classe.",
    "RÉSULTAT ATTENDU : Une fiche courte (informations + illustration ou photo) présentée oralement, " +
    "expliquant pourquoi ce lieu mérite d'être connu et préservé.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet du cycle — Lancer le glossaire illustré collaboratif"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit la rédaction collaborative, poursuivie sur les trois années du cycle, d'un " +
    "glossaire illustré des notions de citoyenneté, ainsi que d'un répertoire de textes sur les droits et " +
    "devoirs. [OFFICIEL — dispositif transversal de la Collection EC]",
    "À partir de ce chapitre, commence ta première page de glossaire : reprends au moins quatre mots du " +
    "Vocabulaire essentiel, illustre-les (dessin, symbole, photo découpée) et ajoute ta propre explication, " +
    "avec tes propres mots.",
    "Ce glossaire continuera de grandir à chaque chapitre, jusqu'à la fin de la 9e AF.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C01-04",
  "Espace de production — ma première page de glossaire",
  "Un cadre vide, format portrait, structuré en quatre cases (une par mot), chacune prévue pour un dessin ou " +
  "une image collée et une courte définition manuscrite.",
  "Offrir un espace direct de production pour lancer le glossaire illustré collaboratif dès le premier " +
  "chapitre.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, quatre cases délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une nation se reconnaît à une histoire, une ou des langues, des valeurs et un sentiment d'appartenance " +
    "partagés.",
    "Les symboles nationaux (drapeau, hymne, devise, armoiries) permettent à chaque citoyenne et citoyen de se " +
    "reconnaître dans une même nation.",
    "Le territoire haïtien s'organise en départements, arrondissements, communes et sections communales.",
    "Le patrimoine (monuments, lieux, traditions) se préserve grâce à l'engagement de l'État, mais aussi grâce " +
    "à la responsabilité citoyenne de chacun.",
    "Expliquer ce que représente un symbole ou un monument, c'est déjà exercer sa citoyenneté.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de définir ce qu'est une nation, de découvrir les fondements et les symboles de la " +
  "nation haïtienne, de comprendre l'organisation territoriale du pays, et de réfléchir au rôle citoyen dans " +
  "la sauvegarde du patrimoine. Il a aussi lancé le glossaire illustré collaboratif, qui accompagnera toute la " +
  "collection EC jusqu'à la fin du cycle.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "nation · identité nationale · symbole national · patrimoine · territoire · citoyenneté · département · " +
  "commune.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer avec mes mots ce qu'est une nation.",
    "☐ Citer au moins trois fondements de la nation haïtienne.",
    "☐ Nommer et décrire les principaux symboles de la nation et de l'État haïtiens.",
    "☐ Situer mon école dans l'organisation territoriale d'Haïti (département, commune).",
    "☐ Expliquer en quoi un lieu ou un symbole représente l'identité et l'unité nationales.",
    "☐ Décrire une action citoyenne possible pour sauvegarder un lieu patrimonial.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : nation, identité nationale, symbole national, patrimoine, organisation " +
    "territoriale, responsabilité citoyenne.",
    "Vocabulaire clé à maîtriser : nation, symbole national, patrimoine, territoire, citoyenneté.",
    "Avant l'évaluation, vérifie que tu peux : nommer les symboles nationaux ; expliquer un fondement de la " +
    "nation haïtienne ; situer les niveaux de l'organisation territoriale ; expliquer, à partir d'un symbole " +
    "ou d'un monument, ce qu'il représente pour l'identité et l'unité nationales.",
    "Rappel officiel : l'évaluation attendue pour cette unité part de représentations (dessin, gravure, photo, " +
    "film) et de symboles/monuments, pour expliquer en quoi ils symbolisent l'identité et l'unité nationales " +
    "[OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : nation · " +
  "symbole national · patrimoine · territoire · citoyenneté.",
  { italics: true },
));
children.push(numberedPar("1. Un ensemble de personnes qui partagent une histoire, une culture et un sentiment d'appartenance forme une ......................"));
children.push(numberedPar("2. Le drapeau, l'hymne et la devise sont des exemples de ......................"));
children.push(numberedPar("3. L'ensemble des monuments, lieux et traditions hérités du passé s'appelle le ......................"));
children.push(numberedPar("4. L'espace géographique sur lequel s'exerce l'autorité d'un État s'appelle le ......................"));
children.push(numberedPar("5. Le statut de membre reconnu d'un État, avec des droits et des devoirs, s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite les quatre niveaux de l'organisation territoriale d'Haïti étudiés dans ce chapitre, du plus grand au plus proche du quotidien."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Le patrimoine d'un pays ne concerne que les monuments très anciens. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Choisis un symbole national étudié dans ce chapitre et explique, en quelques phrases, ce qu'il représente pour l'unité nationale."));
children.push(numberedPar("2. Pourquoi la sauvegarde du patrimoine est-elle décrite comme une responsabilité à la fois de l'État et des citoyens ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. À partir d'un monument ou d'un lieu patrimonial que tu connais réellement (dans ton quartier ou ta commune), explique en quoi il symbolise, selon toi, l'identité ou l'unité nationales."));
children.push(numberedPar("2. Reprends la situation de l'étude de cas (lieu patrimonial dégradé). Propose une action citoyenne concrète, réalisable à l'échelle de ta classe ou de ton école, pour contribuer à sa sauvegarde."));
children.push(numberedPar("3. Un camarade affirme : « Les symboles nationaux, ça ne sert à rien pour la vie de tous les jours. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-7AF-C01-05",
  "Synthèse — Moi, Haïtien : nation et identité",
  "Une carte mentale simple centrée sur « Nation haïtienne », avec des branches vers : fondements, symboles " +
  "nationaux, organisation territoriale, patrimoine, responsabilité citoyenne.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 1, "Manuel_EC_7AF_Chapitre1.docx");
