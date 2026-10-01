// Manuel d'EEA 8e AF — Chapitre 2 : Matières, textures et équilibre
// (champ officiel : Arts plastiques et visuels, Axe 2 — Le développement
// des sens, connaissance des éléments et principes artistiques visuels).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), unite d'apprentissage 2, p.43-44/63 —
//   meme unite officielle que le Chapitre 2 de la 7e AF (formes
//   geometriques/biomorphiques, cubisme/Vèvès), approfondie ici pour la
//   8e AF avec la suite du meme tableau source.
// Page relue pendant la Phase 0 (2026-08-22). Competences officielles
// ciblees [OFFICIEL - SOURCE MENFP VERIFIEE, p.43] : C1, C2, C3, C5, C6,
// C7, C8 (memes 7 competences que les autres unites d'arts plastiques).
//
// Contenu officiel repris fidelement (p.43-44), portion du tableau non
// utilisee pour la 7e AF : "Les contrastes : matieres, textures" ;
// "collage de textures" ; "representation de la texture en dessin" ;
// "introduction aux principes de la composition en art : comprendre les
// principes d'harmonie et de balance" ; "la composition et ses etudes :
// verticale, diagonale, de la spirale", avec reference explicite a
// l'Histoire de l'art.
//
// STATUT DE L'ATTRIBUTION ANNEE : comme pour le Chapitre 1, l'attribution
// precise de cette portion du tableau a la 8e AF specifiquement (plutot
// qu'a la 7e AF, qui a deja utilise la premiere partie du meme tableau
// pour les formes geometriques/biomorphiques) repose sur la reconstruction
// documentee en Phase 0 (00_PHASE0/04_MATRICE_EEA_8AF.md), marquee
// [ADAPTATION DE LECTURE - A RECONFIRMER]. Le contenu lui-meme (textures,
// harmonie, balance, composition) est verbatim present dans la source.
//
// CONTROLE DU PASSAGE 7e -> 8e AF (section 3 du prompt d'execution) : le
// Chapitre 2 de la 7e AF (deja redige et finalise, NON modifie ici) a
// traite la distinction formes geometriques/naturelles et la methode
// cubiste de decomposition (avec reference aux Vèvès haitiens). Ce
// Chapitre 2 de la 8e AF part de cet acquis (rappel bref, section 2.1) et
// approfondit reellement vers la matiere, la texture, et la maitrise d'une
// composition equilibree (harmonie/balance, etudes de composition) - une
// progression nette en analyse et en maitrise technique, sans repeter le
// contenu deja acquis. Aucune anticipation de la 9e AF (couleur) n'est
// introduite ici.
//
// Adaptations de securite : materiel de collage (papier, tissus, materiaux
// naturels propres) ; colle non toxique ; aucun outil dangereux.
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
  2,
  "Matières, textures et équilibre",
  "Au chapitre précédent, tu as appris à jouer avec la lumière et l'ombre. Ce chapitre t'invite à explorer un " +
  "autre sens : le toucher. Rugueux, lisse, doux, granuleux — chaque matière a sa propre texture, et savoir " +
  "l'utiliser permet de composer une image vraiment équilibrée.",
  [
    "Distinguer et représenter différents contrastes de matière et de texture.",
    "Réaliser un collage de textures.",
    "Comprendre les principes d'harmonie et de balance dans une composition.",
    "Étudier trois types de composition : verticale, diagonale, en spirale.",
    "Utiliser des matériaux locaux comme source de texture.",
    "Justifier les choix de composition d'une œuvre.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Au marché de Pétion-Ville, un élève de 8e AF remarque la diversité des matières qui " +
  "l'entourent : le tressage rugueux d'un panier, la surface lisse d'une calebasse, le grain rêche d'un sac " +
  "de jute, le tissu souple d'un madras. Il se demande comment representer, sur une simple feuille, cette " +
  "richesse de sensations. Ce chapitre lui donne les outils pour y parvenir.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Texture — aspect de surface d'une matière (rugueuse, lisse, granuleuse, souple...)."));
children.push(bulletPar("Contraste de matière — opposition visuelle entre deux matières différentes dans une même composition."));
children.push(bulletPar("Harmonie — sensation d'équilibre agréable entre les éléments d'une composition."));
children.push(bulletPar("Balance (visuelle) — répartition équilibrée du poids visuel des éléments sur une surface."));
children.push(bulletPar("Composition en spirale — organisation des éléments qui guide le regard en cercle vers un point central."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : des formes à la matière", "2.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à distinguer les formes géométriques des formes naturelles, et à décomposer un " +
  "objet à la manière du cubisme — une démarche que l'on retrouve aussi dans l'organisation des Vèvès " +
  "haïtiens. Cette année, tu vas aller plus loin : au-delà de la forme, c'est la matière elle-même qui devient " +
  "un outil d'expression.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Contrastes de matière et de texture", "2.2"));
children.push(bodyPar(
  "Une texture peut être représentée de deux façons : en la touchant réellement (collage) ou en la suggérant " +
  "par le dessin (hachures, points, motifs répétés). Mettre en contraste plusieurs textures dans une même " +
  "composition crée une richesse visuelle qui va bien au-delà de la simple forme.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Quatre familles de textures",
  [
    "Rugueuse — comme l'écorce d'un arbre ou une corde tressée.",
    "Lisse — comme une calebasse polie ou une feuille de papier glacé.",
    "Granuleuse — comme du sable ou du sel.",
    "Souple — comme un tissu ou une feuille de bananier.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C02-01",
  "Ouverture — Les matières du marché",
  "Une scène de marché haïtien crédible (Pétion-Ville ou similaire) montrant plusieurs matières et textures " +
  "visibles (paniers tressés, calebasses, sacs de jute, tissus), avec un élève de 8e AF observant, carnet en " +
  "main.",
  "La texture est partout dans notre environnement — il suffit d'apprendre à la regarder.",
  "Ouvrir le chapitre sur une scène concrète et haïtienne qui ancre la notion de texture.",
  "Illustration pleine largeur, scène de marché haïtien riche en matières variées, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le collage de textures", "2.3"));
children.push(bodyPar(
  "Le collage est une technique directe pour intégrer de vraies textures dans une composition : on assemble " +
  "des matériaux différents sur une surface, plutôt que de les dessiner.",
));
children.push(calloutBox(
  "TECHNIQUE — Réaliser un collage de textures",
  [
    "1. Rassemble plusieurs matériaux aux textures différentes (papier froissé, tissu, carton ondulé, " +
    "sable collé, feuilles séchées...).",
    "2. Découpe ou déchire chaque matériau selon la forme souhaitée.",
    "3. Organise les morceaux sur ta feuille avant de coller, pour vérifier l'équilibre général.",
    "4. Colle progressivement, en respectant ton organisation prévue.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : toujours organiser les morceaux avant de coller — un collage réalisé trop " +
  "rapidement, sans plan, donne souvent un résultat déséquilibré. Erreur fréquente à éviter : coller " +
  "uniquement des matériaux de texture similaire, ce qui réduit le contraste recherché.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C02-02",
  "Démonstration technique — organiser un collage de textures",
  "Une planche en trois étapes montrant l'organisation de morceaux de matériaux variés (tissu, papier " +
  "froissé, carton) sur une feuille, avant puis après collage.",
  "Un bon collage s'organise avant d'être collé définitivement.",
  "Montrer concrètement la démarche pas-à-pas du collage de textures.",
  "Illustration demi-page, planche pédagogique en 3 étapes, style clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Harmonie et balance dans la composition", "2.4"));
children.push(bodyPar(
  "Une composition réussie donne une impression d'équilibre, même lorsqu'elle combine des éléments très " +
  "différents. Ce ressenti s'appuie sur deux principes : l'harmonie (les éléments semblent bien aller " +
  "ensemble) et la balance (le poids visuel est réparti de façon équilibrée sur la surface).",
));
children.push(calloutBox(
  "OBSERVER — Reconnaître l'harmonie et la balance",
  [
    "Une composition équilibrée ne signifie pas symétrique : un grand élément sombre d'un côté peut être " +
    "équilibré par plusieurs petits éléments clairs de l'autre.",
    "L'harmonie se ressent souvent dans la répétition contrôlée d'une texture, d'une forme ou d'une couleur " +
    "à travers la composition.",
    "Un bon exercice : couvre une moitié de ta composition — l'autre moitié te semble-t-elle « trop chargée » " +
    "ou « trop vide » en comparaison ?",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Étudier la composition : verticale, diagonale, spirale", "2.5"));
children.push(bodyPar(
  "L'histoire de l'art a identifié plusieurs grandes structures de composition, qui orientent le regard du " +
  "spectateur de façon différente.",
));
children.push(threeColTable(
  ["Type de composition", "Effet sur le regard", "Exemple d'usage"],
  [
    ["Verticale", "Donne une impression de hauteur, de stabilité ou de grandeur", "Un portrait, un arbre, un bâtiment"],
    ["Diagonale", "Crée du mouvement et du dynamisme", "Une scène d'action, un paysage en perspective"],
    ["En spirale", "Guide le regard progressivement vers un point central", "Une scène qui met en valeur un élément précis"],
  ],
  [2600, 3600, 3800],
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C02-03",
  "Exemple analysé — trois structures de composition",
  "Trois croquis simples côte à côte illustrant une composition verticale, une composition diagonale et une " +
  "composition en spirale, avec des flèches indiquant le trajet du regard dans chaque cas.",
  "Chaque structure de composition guide le regard d'une façon différente.",
  "Donner un exemple visuel comparatif des trois structures présentées dans le tableau.",
  "Illustration demi-page, trois croquis comparés avec flèches directionnelles, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les matériaux locaux comme source de texture", "2.6"));
children.push(bodyPar(
  "Haïti offre une grande diversité de matériaux naturels et artisanaux qui peuvent enrichir un collage de " +
  "textures : fibres de bananier, jute, bambou, coquillages, sable, tissus traditionnels.",
));
children.push(calloutBox(
  "PATRIMOINE — Des matériaux locaux à explorer [CHOIX ÉDITORIAL]",
  [
    "Fibres végétales (bananier, latanier) pour une texture tressée.",
    "Sable ou terre séchée pour une texture granuleuse.",
    "Tissus locaux pour une texture souple et colorée.",
    "Ces matériaux ne sont pas nommés tels quels dans le programme officiel : ils sont proposés ici comme " +
    "choix éditorial pour ancrer l'activité dans l'environnement haïtien de l'élève.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, "3E4F3B",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Composition équilibrée en textures"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Réaliser un collage de textures organisé selon un principe de composition (verticale, diagonale ou spirale), en recherchant l'harmonie et la balance." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier support, colle non toxique, et plusieurs matériaux de textures différentes (tissus, papiers, fibres végétales, sable). Alternative : représenter les textures uniquement par le dessin (hachures, motifs) si aucun matériau de collage n'est disponible." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis un type de composition (verticale, diagonale ou spirale) avant de commencer, et garde-le comme fil conducteur." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Rassemble au moins trois matériaux de textures différentes (ou prépare des motifs de hachures variés si tu dessines)."));
children.push(numberedPar("2. Choisis ton type de composition (section 2.5)."));
children.push(numberedPar("3. Organise tes éléments sans coller, pour vérifier l'équilibre général."));
children.push(numberedPar("4. Colle (ou dessine) définitivement ta composition."));
children.push(numberedPar("5. Donne un titre à ta composition et explique ton choix de structure."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une composition utilisant au moins trois textures ou contrastes de matière différents, organisée selon " +
  "une structure claire (verticale, diagonale ou spirale), donnant une impression d'équilibre.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Au moins trois textures ou contrastes de matière sont identifiables."));
children.push(bulletPar("La structure de composition choisie est reconnaissable."));
children.push(bulletPar("L'élève peut expliquer pourquoi sa composition lui semble équilibrée."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier de collage sans risque",
  [
    "Utiliser uniquement de la colle non toxique adaptée au milieu scolaire.",
    "Toute découpe se fait avec des ciseaux à bouts ronds, sous supervision si nécessaire.",
    "Aucun matériau coupant ou dangereux (verre, métal rouillé) n'est utilisé pour le collage.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C02-04",
  "Espace de production — ma composition en textures",
  "Un cadre vide, format portrait, prévu pour que l'élève y réalise directement son collage de textures ou " +
  "son dessin de textures dans le manuel.",
  "Offrir un espace direct de production pour ancrer la pratique du collage dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, sans autre décoration, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présente ta composition à un camarade. Peut-il identifier la structure que tu as choisie (verticale, " +
  "diagonale, spirale) sans que tu ne la lui dises ? Discutez ensemble de ce qui rend une composition " +
  "réellement équilibrée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La texture est l'aspect de surface d'une matière : rugueuse, lisse, granuleuse ou souple.",
    "Le collage permet d'intégrer de vraies textures dans une composition.",
    "L'harmonie et la balance donnent une impression d'équilibre à une composition, sans nécessiter de " +
    "symétrie parfaite.",
    "Trois grandes structures de composition orientent le regard différemment : verticale, diagonale, en " +
    "spirale.",
    "Les matériaux locaux haïtiens (fibres, sable, tissus) sont d'excellentes sources de texture pour un " +
    "collage.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer au moins quatre familles de textures.",
    "☐ Réaliser un collage de textures organisé.",
    "☐ Expliquer les principes d'harmonie et de balance.",
    "☐ Reconnaître une composition verticale, diagonale ou en spirale.",
    "☐ Utiliser un matériau local comme source de texture.",
    "☐ Justifier le choix de structure de ma composition.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : texture, contraste de matière, harmonie, balance, composition verticale/" +
    "diagonale/spirale.",
    "Vocabulaire clé à maîtriser : texture, harmonie, balance, composition en spirale.",
    "Avant l'évaluation, vérifie que tu peux : citer quatre familles de textures ; expliquer la différence " +
    "entre harmonie et balance ; décrire les trois structures de composition étudiées.",
    "Question rapide de vérification : quelle structure de composition choisirais-tu pour représenter un " +
    "événement dynamique, et pourquoi ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : texture · " +
  "harmonie · balance · composition diagonale · composition en spirale.",
  { italics: true },
));
children.push(numberedPar("1. L'aspect de surface d'une matière s'appelle sa ......................"));
children.push(numberedPar("2. La sensation d'équilibre agréable entre les éléments d'une composition s'appelle l'......................"));
children.push(numberedPar("3. La répartition équilibrée du poids visuel sur une surface s'appelle la ......................"));
children.push(numberedPar("4. Une composition qui crée du mouvement et du dynamisme est une ......................"));
children.push(numberedPar("5. Une composition qui guide le regard vers un point central est une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(bodyPar(
  "Classe les matériaux suivants selon leur texture principale : sable · tissu de madras · écorce d'arbre · " +
  "calebasse polie · sac de jute.",
  { italics: true },
));
children.push(threeColTable(
  ["Rugueuse", "Lisse", "Granuleuse/souple"],
  [["", "", ""]],
  [3000, 3000, 3000],
));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment tu organiserais un collage de textures avant de le coller définitivement."));
children.push(numberedPar("2. Pourquoi une composition équilibrée n'a-t-elle pas besoin d'être parfaitement symétrique ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare une composition verticale et une composition en spirale : dans quelle situation choisirais-tu chacune ?"));
children.push(numberedPar("2. Un camarade a réalisé un collage avec des textures très similaires (que du papier lisse). Que lui conseilles-tu pour enrichir sa composition ?"));
children.push(numberedPar("3. Propose un matériau local (autre que ceux déjà cités) que tu pourrais utiliser pour un futur collage, et décris sa texture."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis d'explorer la matière et la texture comme outils d'expression artistique : " +
  "distinguer différentes familles de textures, réaliser un collage organisé, comprendre les principes " +
  "d'harmonie et de balance, étudier trois structures de composition (verticale, diagonale, spirale), et " +
  "utiliser des matériaux locaux haïtiens comme source de texture. Cette maîtrise de la composition " +
  "équilibrée prépare les projets plus élaborés des chapitres suivants.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "texture · contraste de matière · collage · harmonie · balance · composition verticale/diagonale/spirale.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C02-05",
  "Patrimoine — matériaux locaux haïtiens",
  "Une nature morte simple regroupant des matériaux locaux haïtiens (fibres tressées, calebasse, tissu, " +
  "sable), présentés comme sources de texture pour un futur collage.",
  "Ancrer visuellement le lien entre la texture et les matériaux disponibles dans l'environnement haïtien.",
  "Illustrer les matériaux locaux proposés en section 2.6.",
  "Illustration demi-page, nature morte de matériaux haïtiens, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C02-06",
  "Synthèse — Matières, textures et équilibre",
  "Une carte mentale simple centrée sur « Texture et équilibre », avec des branches vers : familles de " +
  "textures, collage, harmonie/balance, structures de composition, matériaux locaux.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 12, "Manuel_EEA_8AF_Chapitre2.docx");
