// Manuel d'EEA 7e AF — Chapitre 4 : Raconter le patrimoine en images
// (champ officiel : Arts plastiques et visuels, Axe 4 — La valorisation du
// patrimoine).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), unite d'apprentissage 4, p.40, 48-51/63.
// Page relue pendant la Phase 0 (2026-08-22). Competences officielles
// ciblees [OFFICIEL - SOURCE MENFP VERIFIEE] : C3, C4, C5, C8 (different du
// jeu de 7 competences des Chapitres 1-3 - cette unite mobilise un
// sous-ensemble plus restreint, centre sur le patrimoine).
//
// STATUT DE L'ATTRIBUTION ANNEE : comme documente en Phase 0
// (00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md, 00_PHASE0/03_MATRICE_EEA_7AF.md),
// l'attribution precise du contenu "illustrations caricaturales/bandes
// dessinees a partir de contes, proverbes, personnages traditionnels" a la
// 7e AF specifiquement repose sur une reconstruction de lecture du tableau
// source, marquee [ADAPTATION DE LECTURE - A RECONFIRMER]. Ce contenu (et
// non les "visites de sites historiques", reconstruits comme relevant de la
// 8e AF) est celui retenu pour ce chapitre, coherent avec le theme annuel
// officiel de la 7e AF ("Eveil artistique et environnement culturel") et
// avec le registre plus imaginatif/narratif attendu a ce niveau.
//
// Contenu officiel repris fidelement (p.48-51) : savoirs "art, artisanat et
// societe" et patrimoine materiel/immateriel ; savoir-faire "creer a partir
// d'elements patrimoniaux" ; activite officielle explicite [OFFICIEL -
// SOURCE MENFP VERIFIEE, p.40] : "illustrations caricaturales et/ou bandes
// dessinees narratives, creees a partir des contes, proverbes ou
// personnages traditionnels de l'imaginaire haitien".
//
// REFERENCES CULTURELLES UTILISEES (verifiees, non inventees) : Bouki et
// Malice (aussi appele Ti Malis) sont des personnages traditionnels bien
// documentes du folklore oral haitien (contes populaires transmis en
// creole) - reference generique a leur existence, sans inventer de conte
// precis non verifie ni de source d'attribution fictive. Le proverbe
// haitien "Deye mon gen mon" (derriere les montagnes, il y a d'autres
// montagnes) est un proverbe largement documente et connu, utilise ici a
// titre d'exemple generique.
//
// Adaptations de securite : aucun outil dangereux ; materiel = papier,
// crayon, feutres.
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
  4,
  "Raconter le patrimoine en images",
  "Tu as observé, dessiné des formes et sculpté en volume. Maintenant, tu vas raconter une histoire — celle " +
  "que ta grand-mère ou ton grand-père t'a peut-être déjà racontée. Ce chapitre t'apprend à transformer un " +
  "conte, un proverbe ou un personnage traditionnel haïtien en image.",
  [
    "Comprendre le lien entre l'art, l'artisanat et la société.",
    "Découvrir ce qu'est le patrimoine immatériel : contes, proverbes, personnages traditionnels.",
    "Reconnaître des personnages traditionnels de l'imaginaire haïtien.",
    "Découvrir les bases de l'illustration caricaturale et de la bande dessinée.",
    "Créer une courte histoire illustrée inspirée du patrimoine haïtien.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Le soir, à Léogâne, une grand-mère raconte à ses petits-enfants une histoire de " +
  "Bouki et Malice, deux personnages que tout le monde connaît en Haïti. Un des enfants se dit : « Et si je " +
  "dessinais cette histoire, pour ne jamais l'oublier ? » Ce chapitre t'apprend à faire exactement cela.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Patrimoine immatériel — ce qui se transmet sans objet physique : contes, proverbes, chansons, traditions orales."));
children.push(bulletPar("Conte — récit traditionnel, souvent transmis oralement, mettant en scène des personnages récurrents."));
children.push(bulletPar("Proverbe — phrase courte et imagée qui transmet une leçon ou une sagesse populaire."));
children.push(bulletPar("Illustration caricaturale — dessin qui exagère volontairement certains traits pour faire passer une idée ou une émotion."));
children.push(bulletPar("Bande dessinée narrative — suite d'images organisées pour raconter une histoire."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("L'art, l'artisanat et la société", "4.1"));
children.push(bodyPar(
  "L'art n'existe jamais seul : il naît toujours d'une société, de ses besoins, de ses histoires et de son " +
  "savoir-faire. Un artisan qui décore un objet du quotidien, un conteur qui raconte une histoire le soir, un " +
  "musicien qui chante lors d'une fête — tous participent, chacun à leur manière, à la vie artistique et " +
  "culturelle de leur communauté.",
));
children.push(calloutBox(
  "DÉCOUVRIR — L'art dans la vie de tous les jours",
  [
    "L'artisanat transforme des objets utiles en objets qui portent aussi une valeur esthétique.",
    "Les récits traditionnels (contes, proverbes) sont eux aussi une forme d'art : l'art de raconter.",
    "La société transmet son patrimoine à travers ces pratiques, génération après génération.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C04-01",
  "Ouverture — Une soirée de contes",
  "Une scène familiale haïtienne crédible (Léogâne ou similaire), le soir, où une grand-mère raconte une " +
  "histoire à des enfants attentifs, l'un d'eux avec un carnet et un crayon.",
  "Le patrimoine immatériel se transmet souvent oralement, dans des moments simples du quotidien.",
  "Ouvrir le chapitre sur une scène concrète et haïtienne qui ancre la notion de patrimoine immatériel.",
  "Illustration pleine largeur, scène familiale haïtienne le soir, ambiance chaleureuse et intime.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le patrimoine immatériel : contes et proverbes", "4.2"));
children.push(bodyPar(
  "Contrairement à un objet ou un monument, le patrimoine immatériel ne se touche pas : il se raconte, se " +
  "chante, se transmet de bouche à oreille. En Haïti, les contes et les proverbes occupent une place " +
  "importante dans cette tradition orale.",
));
children.push(calloutBox(
  "PATRIMOINE HAÏTIEN — Un exemple de proverbe",
  [
    "« Dèyè mòn gen mòn » — « Derrière les montagnes, il y a d'autres montagnes » : un proverbe créole " +
    "haïtien très connu, qui rappelle qu'après une difficulté surmontée, d'autres défis peuvent survenir.",
    "Les proverbes condensent en une phrase courte une leçon de vie ou une observation sur le monde.",
    "Chaque proverbe peut être imaginé comme une petite scène à illustrer.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, "3E4F3B",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Personnages traditionnels de l'imaginaire haïtien", "4.3"));
children.push(bodyPar(
  "Certains personnages reviennent régulièrement dans les contes haïtiens et sont connus de presque tout le " +
  "monde. Le programme officiel encourage justement à s'en inspirer pour créer des illustrations.",
));
children.push(calloutBox(
  "OBSERVER — Bouki et Malice",
  [
    "Bouki et Malice (parfois appelé Ti Malice) sont deux personnages traditionnels très présents dans les " +
    "contes populaires haïtiens transmis oralement en créole.",
    "Bouki est souvent représenté comme naïf ou malchanceux, tandis que Malice est rusé et malin — leurs " +
    "histoires opposent souvent ces deux caractères.",
    "Ces personnages permettent d'imaginer de nombreuses situations à illustrer, sans qu'il soit nécessaire " +
    "de connaître un conte précis : leur simple opposition de caractères suffit à inventer une scène.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C04-02",
  "Exemple analysé — deux caractères, deux silhouettes",
  "Deux silhouettes de personnages stylisés côte à côte, l'une évoquant la naïveté (posture détendue, " +
  "expression surprise) et l'autre la ruse (posture penchée, sourire en coin), sans reproduire une " +
  "illustration existante précise de Bouki et Malice.",
  "La personnalité d'un personnage peut se lire dans sa posture et son expression, avant même toute couleur.",
  "Montrer comment traduire un trait de caractère en choix visuels simples (posture, expression).",
  "Illustration demi-page, deux silhouettes stylisées comparées, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Dessiner une histoire : caricature et bande dessinée", "4.4"));
children.push(bodyPar(
  "Pour raconter une histoire en images, deux outils sont particulièrement utiles : l'illustration " +
  "caricaturale, qui exagère un trait pour le rendre plus lisible, et la bande dessinée narrative, qui " +
  "découpe une histoire en plusieurs images successives.",
));
children.push(calloutBox(
  "TECHNIQUE — Construire une courte bande dessinée",
  [
    "1. Choisis ton histoire (un conte connu, un proverbe, une scène avec Bouki et Malice).",
    "2. Découpe-la en 3 ou 4 moments clés (pas plus, pour rester simple).",
    "3. Pour chaque moment, dessine une case simple avec le personnage principal et l'action.",
    "4. Ajoute, si tu le souhaites, une courte phrase sous chaque case pour expliquer l'action.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : pour une caricature réussie, choisis un seul trait à exagérer (un grand sourire, des " +
  "yeux écarquillés) plutôt que de tout déformer à la fois. Erreur fréquente à éviter : vouloir raconter " +
  "toute l'histoire en une seule image très chargée — mieux vaut la découper en plusieurs cases simples.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C04-03",
  "Démonstration technique — les 4 cases d'une bande dessinée",
  "Une planche montrant un exemple de bande dessinée simple en 4 cases vides numérotées, avec des " +
  "indications légères (« début », « problème », « rebondissement », « fin ») pour guider la construction.",
  "Une histoire se construit en quelques moments clés, pas en une seule image chargée.",
  "Montrer concrètement la structure d'une courte bande dessinée en 4 cases.",
  "Illustration demi-page, planche pédagogique en 4 cases, style clair et structuré.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ma bande dessinée du patrimoine"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Créer une courte bande dessinée ou une illustration caricaturale inspirée d'un conte, d'un proverbe ou d'un personnage traditionnel haïtien (par exemple Bouki et Malice)." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier, crayon, et si possible des feutres ou crayons de couleur." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis un conte que tu connais, un proverbe haïtien, ou imagine une courte scène avec Bouki et Malice." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Choisis ton histoire ou ton proverbe de départ."));
children.push(numberedPar("2. Découpe-la en 3 ou 4 moments clés (section 4.4)."));
children.push(numberedPar("3. Dessine chaque case avec le ou les personnages et l'action principale."));
children.push(numberedPar("4. Ajoute une courte phrase sous chaque case si tu le souhaites."));
children.push(numberedPar("5. Donne un titre à ta bande dessinée."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une courte bande dessinée de 3 à 4 cases (ou une illustration caricaturale unique), clairement inspirée " +
  "d'un élément du patrimoine immatériel haïtien, racontant une histoire compréhensible.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("L'histoire est inspirée d'un conte, d'un proverbe ou d'un personnage traditionnel haïtien."));
children.push(bulletPar("Les cases (ou l'image unique) racontent une action compréhensible."));
children.push(bulletPar("L'élève peut expliquer le lien entre sa production et le patrimoine immatériel choisi."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier sans risque",
  [
    "Le crayon, les feutres et le papier s'utilisent sans danger particulier.",
    "Aucun matériel coûteux n'est nécessaire pour cette activité.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C04-04",
  "Espace de production — planche de bande dessinée",
  "Un cadre vide divisé en 4 cases numérotées, format paysage, prévu pour que l'élève réalise directement sa " +
  "bande dessinée dans le manuel.",
  "Offrir un espace direct de production structuré pour ancrer la pratique dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Grille de 4 cases, bordure fine ocre, format paysage demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Montre ta bande dessinée à un camarade sans lui expliquer l'histoire à l'avance. Peut-il suivre l'histoire " +
  "juste avec les images ? Discutez ensemble de ce qui rend une histoire en images facile ou difficile à " +
  "suivre.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "L'art naît toujours d'une société : l'artisanat et les récits traditionnels en sont des exemples.",
    "Le patrimoine immatériel se transmet sans objet physique : contes, proverbes, personnages traditionnels.",
    "Bouki et Malice sont des personnages bien connus du folklore oral haïtien.",
    "Une caricature exagère volontairement un trait pour le rendre plus lisible.",
    "Une bande dessinée découpe une histoire en plusieurs moments clés, plutôt qu'en une seule image chargée.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer le lien entre l'art, l'artisanat et la société.",
    "☐ Donner un exemple de patrimoine immatériel haïtien.",
    "☐ Citer Bouki et Malice comme personnages traditionnels haïtiens.",
    "☐ Construire une courte bande dessinée en 3 ou 4 cases.",
    "☐ Créer une illustration inspirée d'un conte ou d'un proverbe.",
    "☐ Expliquer le lien entre ma production et le patrimoine choisi.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : patrimoine immatériel, conte, proverbe, illustration caricaturale, bande dessinée " +
    "narrative.",
    "Vocabulaire clé à maîtriser : patrimoine immatériel, conte, proverbe, caricature.",
    "Avant l'évaluation, vérifie que tu peux : définir le patrimoine immatériel ; citer un exemple de " +
    "personnage traditionnel haïtien ; expliquer les étapes de construction d'une courte bande dessinée.",
    "Question rapide de vérification : pourquoi dit-on que les contes et les proverbes font partie du " +
    "patrimoine, même s'ils ne sont pas des objets ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(4));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : patrimoine " +
  "immatériel · conte · proverbe · caricature · bande dessinée.",
  { italics: true },
));
children.push(numberedPar("1. Ce qui se transmet sans objet physique, comme les contes ou les chansons, s'appelle le ......................"));
children.push(numberedPar("2. Un récit traditionnel transmis oralement s'appelle un ......................"));
children.push(numberedPar("3. Une phrase courte et imagée qui transmet une leçon de vie est un ......................"));
children.push(numberedPar("4. Un dessin qui exagère volontairement un trait s'appelle une ......................"));
children.push(numberedPar("5. Une suite d'images organisées pour raconter une histoire s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(bodyPar(
  "Observe les descriptions suivantes et indique si chacune correspond plutôt à Bouki ou plutôt à Malice, " +
  "d'après ce que tu as appris en section 4.3 : « il tombe souvent dans le piège » · « il trouve toujours une " +
  "astuce » · « il se fait surprendre facilement » · « il réfléchit avant d'agir ».",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Choisis un proverbe haïtien que tu connais (ou utilise « Dèyè mòn gen mòn ») et décris en une phrase l'image que tu pourrais dessiner pour l'illustrer."));
children.push(numberedPar("2. Découpe une courte histoire de ton choix en 3 moments clés (début, problème, fin) sans encore la dessiner."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Pourquoi est-il plus facile de suivre une histoire racontée en plusieurs cases plutôt qu'en une seule image très chargée ?"));
children.push(numberedPar("2. Explique en quelques phrases pourquoi transmettre un conte ou un proverbe par le dessin peut aider à ne pas l'oublier."));
children.push(numberedPar("3. Propose un autre proverbe ou une autre tradition orale de ta région que tu pourrais illustrer dans un futur projet."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir le lien entre l'art, l'artisanat et la société, de comprendre ce qu'est " +
  "le patrimoine immatériel à travers les contes et les proverbes haïtiens, de rencontrer des personnages " +
  "traditionnels comme Bouki et Malice, et de s'initier aux techniques de l'illustration caricaturale et de " +
  "la bande dessinée narrative pour raconter une histoire en images. Ce chapitre clôt la première partie du " +
  "manuel, consacrée aux arts plastiques et visuels.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "patrimoine immatériel · conte · proverbe · Bouki et Malice · caricature · bande dessinée narrative.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C04-05",
  "Patrimoine haïtien lié au chapitre",
  "Une scène évoquant, de façon respectueuse et stylisée, une veillée de contes en Haïti (personnages " +
  "assis en cercle, un conteur au centre), sans illustrer un conte précis de façon à en fixer une seule " +
  "version visuelle définitive.",
  "Ancrer visuellement le lien entre le chapitre et la tradition orale haïtienne.",
  "Illustration demi-page, scène de veillée haïtienne respectueuse et chaleureuse.",
  "Illustration demi-page, cohérente avec la charte EEA, tons terracotta et ocre.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C04-06",
  "Synthèse — Raconter le patrimoine en images",
  "Une carte mentale simple centrée sur « Patrimoine immatériel », avec des branches vers : contes, " +
  "proverbes, Bouki et Malice, caricature, bande dessinée.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 32, "Manuel_EEA_7AF_Chapitre4.docx");
