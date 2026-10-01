// Manuel d'EEA 7e AF — Chapitre 3 : Sculpter, construire, recycler
// (champ officiel : Arts plastiques et visuels, Axe 3 — Construction en
// volume, modelage, décoration, projets interdisciplinaires).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), unite d'apprentissage 3, p.45-48/63.
// Page relue pendant la Phase 0 (2026-08-22). Competences officielles
// ciblees [OFFICIEL - SOURCE MENFP VERIFIEE, p.45] : C1, C2, C3, C5, C6, C7,
// C8 (memes 7 competences que les Chapitres 1-2).
//
// Contenu officiel repris fidelement (p.46-48) : quatre techniques de base
// de la sculpture (sculpter/procede soustractif ; fonte-casting/additif ;
// modeler/additif ; assemblage/additif) ; modelage a l'argile ; construction
// avec elements naturels ou de recuperation/recyclage ; reference a la
// poterie et a l'architecture de l'Antiquite (Mesopotamie, Egypte,
// civilisation greco-romaine, lien explicite avec les sciences sociales).
//
// FIDELITE A LA PROGRESSION : le tableau officiel de l'unite 3 (p.46-48)
// mentionne aussi, plus loin, le role des logiciels de design et de
// l'impression "3D" ainsi que l'etude du style architectural Gingerbread
// d'Haiti - la reconstruction documentee en Phase 0
// (00_PHASE0/05_MATRICE_EEA_9AF.md) attribue ces elements plus avances a la
// 9e AF (technologies numeriques, architecture patrimoniale approfondie).
// Ce chapitre de 7e AF reste donc centre sur les techniques manuelles de
// base (sculpture, modelage, assemblage, materiaux naturels/recycles) et NE
// couvre PAS le design numerique/impression 3D ni le style Gingerbread,
// conformement a la regle de ne pas anticiper un contenu reserve aux
// niveaux superieurs.
//
// CADRAGE HAITIEN DE LA REFERENCE PATRIMONIALE (section 3.5) : la source
// cite la poterie et l'architecture de l'Antiquite (Mesopotamie, Egypte,
// civilisation greco-romaine) sans lien haitien explicite pour cette unite
// precise. Le lien avec la poterie haitienne traditionnelle est donc un
// [CHOIX EDITORIAL] de contextualisation, formule de maniere generale et
// verifiable (savoir-faire traditionnel de poterie/construction en
// materiaux naturels, transmis de generation en generation), sans inventer
// de nom d'artisan, de site ou de date precise non verifies.
//
// Adaptations de securite : aucun outil dangereux ; argile, materiaux
// naturels et recycles proprement selectionnes ; toute utilisation de
// ciseaux se fait sous supervision.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE,
  BOX_ATELIER_FILL, BOX_ATELIER_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_CRITIQUE_FILL, BOX_CRITIQUE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  OUTREMER, OCRE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  3,
  "Sculpter, construire, recycler",
  "Jusqu'ici, tu as dessiné sur une feuille plate. Mais que se passe-t-il quand une forme prend du volume, " +
  "quand elle peut être touchée de tous les côtés ? Ce chapitre te fait passer du dessin à la sculpture — en " +
  "réutilisant ce que tu trouves autour de toi.",
  [
    "Comprendre la différence entre une œuvre en deux dimensions et une œuvre en volume.",
    "Découvrir les techniques de base de la sculpture.",
    "Modeler une forme simple avec de l'argile ou un matériau souple.",
    "Construire un objet en volume à partir de matériaux naturels ou recyclés.",
    "Faire le lien entre la poterie et l'histoire des civilisations.",
    "Réfléchir à un savoir-faire traditionnel présent en Haïti.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Près du Cap-Haïtien, une classe de 7e AF visite un petit atelier où une artisane " +
  "façonne des pots en terre cuite. Les élèves remarquent qu'elle ne dessine pas son pot — elle le construit " +
  "directement avec ses mains, en volume. « Comment fait-elle pour que ce soit solide et équilibré ? » se " +
  "demande l'un d'eux. Ce chapitre répond à cette question.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Volume — l'espace occupé par un objet en trois dimensions (contrairement à un dessin, plat)."));
children.push(bulletPar("Sculpture — l'art de créer une forme en volume en enlevant de la matière."));
children.push(bulletPar("Modelage — l'art de créer une forme en volume en façonnant une matière souple, comme l'argile."));
children.push(bulletPar("Assemblage — l'art de créer une forme en volume en réunissant plusieurs éléments séparés."));
children.push(bulletPar("Matériau de récupération — objet ou matière déjà utilisé, réemployé pour une nouvelle création."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Du plat au volume", "3.1"));
children.push(bodyPar(
  "Un dessin occupe une surface plate : on parle de deux dimensions (longueur et largeur). Une sculpture, " +
  "elle, occupe un espace réel : on parle de trois dimensions (longueur, largeur et profondeur). On peut en " +
  "faire le tour, la regarder sous tous les angles — ce qui change complètement la façon de la concevoir.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Deux façons différentes de représenter une idée",
  [
    "Une œuvre en deux dimensions (dessin, peinture) se regarde d'un seul côté.",
    "Une œuvre en volume (sculpture, modelage) peut être observée sous plusieurs angles, voire touchée.",
    "Passer du dessin au volume demande de penser non plus à une surface, mais à un espace entier.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C03-01",
  "Ouverture — L'atelier de poterie",
  "Une scène crédible d'atelier artisanal haïtien (près du Cap-Haïtien ou similaire) où une artisane façonne " +
  "un pot en terre cuite, observée par un groupe d'élèves de 7e AF avec un enseignant.",
  "Le passage du dessin plat à la sculpture en volume s'observe dans un vrai savoir-faire artisanal.",
  "Ouvrir le chapitre sur une scène concrète et haïtienne qui ancre la notion de volume.",
  "Illustration pleine largeur, scène d'atelier haïtien crédible, ambiance chaleureuse et respectueuse.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les techniques de base de la sculpture", "3.2"));
children.push(bodyPar(
  "Il existe plusieurs façons de créer une œuvre en volume. Certaines techniques enlèvent de la matière " +
  "(procédé soustractif), d'autres en ajoutent (procédé additif).",
));
children.push(twoColTable(
  "Technique", "Principe",
  [
    ["Sculpter (procédé soustractif)", "Découper ou ébrécher une forme à partir d'une masse (pierre, bois), en enlevant de la matière de l'extérieur vers l'intérieur."],
    ["Modeler (procédé additif)", "Façonner une matière souple ou malléable (comme l'argile) pour construire une forme, parfois sur une armature."],
    ["Assembler (procédé additif)", "Réunir et fixer ensemble différents matériaux pour créer une sculpture composée de plusieurs éléments."],
    ["Fondre / couler (procédé additif)", "Verser un matériau fondu (comme un métal) dans un moule pour qu'il prenne une forme précise."],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "En classe, les techniques les plus accessibles restent le modelage et l'assemblage, réalisables avec de " +
  "l'argile et des matériaux simples.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C03-02",
  "Exemple analysé — comparer soustractif et additif",
  "Deux images côte à côte : une sculpture en pierre (matière enlevée, effet ciselé) et une sculpture en " +
  "argile modelée (matière ajoutée, effet façonné), avec des flèches indiquant la direction du geste (enlever " +
  "vs ajouter).",
  "Visualiser clairement la différence entre technique soustractive et technique additive.",
  "Donner un exemple visuel comparatif des deux grandes familles de techniques présentées dans le texte.",
  "Illustration demi-page, schéma comparatif clair, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le modelage : donner forme à l'argile", "3.3"));
children.push(bodyPar(
  "Le modelage est la technique la plus accessible pour débuter en sculpture : une matière souple, comme " +
  "l'argile ou la pâte à modeler, se façonne directement avec les mains, sans outil dangereux.",
));
children.push(calloutBox(
  "TECHNIQUE — Modeler une forme simple",
  [
    "1. Pétris la matière pour la rendre souple et sans bulles d'air.",
    "2. Commence par une forme de base simple (boule, boudin, plaque).",
    "3. Façonne progressivement la forme en ajoutant ou en lissant la matière.",
    "4. Vérifie l'équilibre de ta forme sous plusieurs angles, pas seulement de face.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : travaille toujours en tournant ton objet pour vérifier chaque face. Erreur fréquente " +
  "à éviter : ne regarder sa sculpture que d'un seul côté, ce qui donne souvent une forme déséquilibrée vue " +
  "d'un autre angle.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Construire avec ce que l'on trouve", "3.4"));
children.push(bodyPar(
  "On peut aussi créer une œuvre en volume par assemblage, en réunissant des matériaux naturels (branches, " +
  "coquillages, graines) ou des matériaux de récupération (carton, bouchons, tissus). C'est une excellente " +
  "façon de créer sans dépenser, tout en réutilisant plutôt que de jeter.",
));
children.push(calloutBox(
  "ATELIER — Bien choisir ses matériaux de récupération",
  [
    "Privilégier des matériaux propres, non coupants, non dangereux (carton, bouchons de liège ou de " +
    "plastique lavés, tissus, ficelle).",
    "Éviter le verre cassé, le métal rouillé tranchant, ou tout objet pouvant blesser.",
    "Demander l'accord d'un adulte avant de récupérer un objet à la maison.",
  ],
  BOX_ATELIER_FILL, BOX_ATELIER_LINE, "6A3A12",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C03-03",
  "Démonstration technique — assembler des matériaux recyclés",
  "Une planche en trois étapes montrant l'assemblage d'une petite construction (par exemple un animal ou un " +
  "objet imaginaire) à partir de carton, bouchons et ficelle, du tri des matériaux jusqu'à l'objet final.",
  "L'assemblage permet de créer en volume à partir de matériaux simples et réutilisés.",
  "Montrer concrètement la démarche pas-à-pas de construction par assemblage.",
  "Illustration demi-page, planche pédagogique en 3 étapes, style croquis clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Un lien avec l'histoire : la poterie à travers le temps", "3.5"));
children.push(bodyPar(
  "Le modelage de l'argile n'est pas une invention récente : c'est l'une des plus anciennes techniques " +
  "artistiques de l'humanité. Dès l'Antiquité, en Mésopotamie, en Égypte et dans la civilisation " +
  "gréco-romaine, la poterie et l'architecture utilisaient déjà ces mêmes principes de construction en " +
  "volume — un sujet que tu retrouveras aussi en cours de sciences sociales.",
));
children.push(calloutBox(
  "PATRIMOINE — La poterie, un savoir-faire transmis dans le temps",
  [
    "Façonner l'argile pour créer des récipients utiles est une pratique très ancienne, présente dans de " +
    "nombreuses civilisations (Mésopotamie, Égypte, monde gréco-romain).",
    "En Haïti aussi, la poterie et la construction en matériaux naturels (terre, bois, matériaux locaux) font " +
    "partie de savoir-faire artisanaux transmis de génération en génération, dans plusieurs régions du pays.",
    "Observer un objet en terre cuite ou en matériaux naturels, c'est observer un savoir-faire qui traverse " +
    "le temps et les cultures.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, "3E4F3B",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Modeler ou construire en volume"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Créer une œuvre en volume, au choix par modelage (argile ou pâte à modeler) ou par assemblage (matériaux naturels ou recyclés)." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Option modelage : argile, pâte à modeler ou terre humide. Option assemblage : carton, bouchons, ficelle, éléments naturels propres (branches, graines, coquillages)." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis un thème simple : un animal, un objet imaginaire, ou un petit récipient. Réalise ta création en volume, en gardant à l'esprit qu'elle doit pouvoir être regardée de plusieurs côtés." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Choisis ta technique (modelage ou assemblage) et ton thème."));
children.push(numberedPar("2. Rassemble ton matériel (voir consignes de sécurité ci-dessus pour les matériaux recyclés)."));
children.push(numberedPar("3. Réalise une forme de base simple, puis ajoute progressivement les détails."));
children.push(numberedPar("4. Vérifie l'équilibre de ta création en la regardant sous plusieurs angles."));
children.push(numberedPar("5. Donne un titre à ta création."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une œuvre en volume reconnaissable, stable, qui peut être observée sous au moins deux angles différents.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("L'œuvre tient debout ou reste stable sans support artificiel."));
children.push(bulletPar("L'œuvre est reconnaissable sous plusieurs angles."));
children.push(bulletPar("L'élève peut expliquer la technique utilisée (modelage ou assemblage)."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier en volume sans risque",
  [
    "Aucun outil tranchant ou pointu n'est nécessaire pour le modelage à la main.",
    "Toute utilisation de ciseaux pour découper du carton se fait sous la supervision d'un adulte.",
    "N'utiliser que des matériaux de récupération propres, non coupants et non dangereux.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C03-04",
  "Espace de production — atelier de sculpture",
  "Un cadre illustré (et non un simple espace vide, puisqu'il s'agit d'un objet en volume) montrant trois " +
  "angles de vue à compléter par l'élève avec des croquis rapides de sa création (face, profil, dessus).",
  "Offrir un espace de production adapté à une œuvre en volume, observable sous plusieurs angles.",
  "Espace de production dédié, conforme à la charte EEA, adapté à la nature tridimensionnelle du projet.",
  "Trois cadres simples côte à côte, bordure fine ocre, format paysage demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présente ta création à un camarade en la faisant tourner lentement. Lui demande-t-elle de deviner ton " +
  "thème avant que tu ne le révèles ? Discutez ensemble de ce qui rend une œuvre en volume équilibrée, vue " +
  "sous tous ses angles.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une œuvre en volume occupe un espace réel en trois dimensions, contrairement à un dessin plat.",
    "Les techniques de sculpture se divisent en procédés soustractifs (sculpter) et additifs (modeler, " +
    "assembler, fondre).",
    "Le modelage façonne une matière souple comme l'argile ; l'assemblage réunit plusieurs matériaux, " +
    "naturels ou recyclés.",
    "Bien choisir ses matériaux de récupération, c'est privilégier la sécurité et la réutilisation.",
    "La poterie est une pratique très ancienne, présente dans de nombreuses civilisations et dans des " +
    "savoir-faire artisanaux transmis en Haïti.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer la différence entre une œuvre en deux dimensions et une œuvre en volume.",
    "☐ Nommer au moins deux techniques de sculpture.",
    "☐ Modeler une forme simple avec de l'argile ou un matériau souple.",
    "☐ Construire un objet en volume par assemblage, avec des matériaux sûrs.",
    "☐ Expliquer le lien entre la poterie et l'histoire des civilisations.",
    "☐ Citer un exemple de savoir-faire artisanal haïtien lié aux matériaux naturels.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : volume, sculpture, modelage, assemblage, matériau de récupération.",
    "Vocabulaire clé à maîtriser : procédé soustractif, procédé additif, modelage, assemblage.",
    "Avant l'évaluation, vérifie que tu peux : distinguer un procédé soustractif d'un procédé additif ; " +
    "citer les étapes du modelage ; expliquer le lien entre poterie et histoire.",
    "Question rapide de vérification : le modelage est-il un procédé soustractif ou additif ? Justifie ta " +
    "réponse.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : volume · " +
  "sculpture · modelage · assemblage · matériau de récupération.",
  { italics: true },
));
children.push(numberedPar("1. L'espace occupé par un objet en trois dimensions s'appelle le ......................"));
children.push(numberedPar("2. Créer une forme en enlevant de la matière, c'est faire de la ......................"));
children.push(numberedPar("3. Façonner une matière souple comme l'argile, c'est faire du ......................"));
children.push(numberedPar("4. Réunir plusieurs éléments séparés pour créer une forme, c'est faire un ......................"));
children.push(numberedPar("5. Un objet déjà utilisé, réemployé pour une nouvelle création, est un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation / classement"));
children.push(bodyPar(
  "Classe les techniques suivantes selon qu'elles sont plutôt un procédé soustractif ou un procédé additif : " +
  "sculpter le bois · modeler l'argile · assembler du carton · tailler la pierre · couler du métal dans un moule.",
  { italics: true },
));
children.push(twoColTable(
  "Procédé soustractif", "Procédé additif",
  [["", ""], ["", ""], ["", ""]],
));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris en trois étapes comment tu modèlerais une forme simple (par exemple une petite coupelle) avec de l'argile."));
children.push(numberedPar("2. Pourquoi est-il important de vérifier l'équilibre d'une sculpture sous plusieurs angles et pas seulement de face ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Compare le modelage et l'assemblage : quels sont les avantages de chaque technique selon le résultat recherché ?"));
children.push(numberedPar("2. Explique en quelques phrases pourquoi réutiliser des matériaux de récupération peut être à la fois une démarche artistique et une démarche responsable pour l'environnement."));
children.push(numberedPar("3. Propose un objet du quotidien que tu pourrais recycler pour une prochaine création en volume, et explique ton idée."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de passer du dessin plat à la création en volume : comprendre la différence entre " +
  "deux et trois dimensions, découvrir les techniques de base de la sculpture (soustractives et additives), " +
  "modeler une forme simple avec de l'argile, construire par assemblage avec des matériaux naturels ou " +
  "recyclés en toute sécurité, et découvrir le lien entre la poterie et l'histoire des civilisations, y " +
  "compris des savoir-faire artisanaux présents en Haïti. Ces bases en volume prépareront des projets plus " +
  "élaborés dans les années suivantes.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "volume · sculpture · modelage · assemblage · procédé soustractif · procédé additif · matériau de " +
  "récupération.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C03-05",
  "Patrimoine haïtien lié au chapitre",
  "Une scène montrant des objets en terre cuite ou en matériaux naturels de fabrication artisanale haïtienne " +
  "(pots, canaris), présentés avec respect, sans attribution à un artisan ou un site précis non vérifié.",
  "Ancrer visuellement le lien entre le chapitre et un savoir-faire artisanal présent en Haïti.",
  "Illustration demi-page, objets artisanaux génériques crédibles, ton respectueux et valorisant.",
  "Illustration demi-page, cohérente avec la charte EEA, tons terracotta et ocre.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C03-06",
  "Synthèse — Sculpter, construire, recycler",
  "Une carte mentale simple centrée sur « Volume », avec des branches vers : techniques de sculpture, " +
  "modelage, assemblage, matériaux recyclés, poterie et histoire.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 21, "Manuel_EEA_7AF_Chapitre3.docx");
