// Manuel d'EEA 8e AF — Chapitre 3 : Arts et autres disciplines
// (champ officiel : Arts plastiques et visuels, Axe 3 — Construction en
// volume / projets interdisciplinaires).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), unite d'apprentissage 3, p.45-48/63 —
//   meme unite officielle que le Chapitre 3 de la 7e AF (techniques de
//   sculpture, modelage, materiaux naturels/recycles, poterie/architecture
//   antique), dont ce chapitre utilise la portion suivante du meme tableau.
// Page relue pendant la Phase 0 (2026-08-22). Competences officielles
// ciblees [OFFICIEL - SOURCE MENFP VERIFIEE, p.45] : C1, C2, C3, C5, C6,
// C7, C8 (memes 7 competences que les autres unites d'arts plastiques).
//
// Contenu officiel repris fidelement (p.46-47), portion du tableau non
// utilisee pour la 7e AF : "Projets interdisciplinaires avec les langues,
// les mots ou avec les notions de sciences de la vie et de la terre. -
// Textes, lettrage et graphisme (esthetique du langage) - Interpretation
// artistique de planches, sculptures representant des animaux ou
// utilisation d'elements naturels pour sculpter ou construire (Ecorces,
// gousses, pailles, etc)". Savoir-faire officiel : "Etre capable de lier
// les arts visuels a d'autres disciplines ; comprendre le bien fonde des
// projets interdisciplinaires."
//
// STATUT DE L'ATTRIBUTION ANNEE : comme pour les Chapitres 1 et 2,
// l'attribution precise de cette portion du tableau a la 8e AF
// specifiquement repose sur la reconstruction documentee en Phase 0
// (00_PHASE0/04_MATRICE_EEA_8AF.md), marquee [ADAPTATION DE LECTURE - A
// RECONFIRMER]. Le contenu lui-meme (interdisciplinarite, lettrage,
// interpretation d'elements naturels) est verbatim present dans la source.
//
// CONTROLE DU PASSAGE 7e -> 8e AF (section 3 du prompt d'execution) : le
// Chapitre 3 de la 7e AF (deja redige et finalise, NON modifie ici) a
// traite les techniques de sculpture/modelage et la construction avec des
// materiaux naturels/recycles, avec un lien vers la poterie et
// l'architecture de l'Antiquite. Ce Chapitre 3 de la 8e AF part de cet
// acquis (rappel bref, section 3.1) et approfondit reellement vers une
// competence transversale nouvelle : relier consciemment les arts visuels
// a d'autres matieres scolaires (langues, sciences de la vie et de la
// terre) - une progression nette vers l'analyse et la justification
// interdisciplinaire, sans repeter le contenu de sculpture deja acquis.
// Aucune anticipation de la 9e AF (technologies numeriques, architecture
// patrimoniale approfondie) n'est introduite ici.
//
// Adaptations de securite : materiel scolaire simple (papier, crayon,
// feutres, elements naturels propres type ecorces/gousses/pailles) ;
// aucun outil dangereux.
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
  "Arts et autres disciplines",
  "L'art ne vit pas isolé des autres matières que tu étudies. Ce chapitre t'invite à faire le pont entre les " +
  "arts plastiques et le français, le créole, ou les sciences de la vie et de la terre — pour découvrir que " +
  "créer, c'est aussi observer, nommer et comprendre.",
  [
    "Comprendre pourquoi relier les arts à d'autres matières enrichit la création.",
    "Réaliser un lettrage soigné et esthétique.",
    "Explorer le graphisme comme esthétique du langage.",
    "Interpréter artistiquement un élément naturel (animal ou plante).",
    "Utiliser des éléments naturels pour construire ou sculpter.",
    "Justifier le lien entre une production artistique et une autre discipline scolaire.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école de Jacmel, une classe de 8e AF vient d'étudier, en sciences de la vie " +
  "et de la terre, le cycle de vie d'un papillon observé dans la cour de l'école. Leur enseignant d'EEA leur " +
  "propose alors un défi : transformer cette leçon de sciences en une œuvre artistique. Ce chapitre t'apprend " +
  "à faire, toi aussi, ce genre de pont entre les matières.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Interdisciplinarité — démarche qui relie consciemment deux ou plusieurs matières scolaires dans un même projet."));
children.push(bulletPar("Lettrage — art de dessiner et de composer des lettres de façon esthétique."));
children.push(bulletPar("Graphisme — organisation visuelle de textes, formes et images pour communiquer une idée."));
children.push(bulletPar("Esthétique du langage — attention portée à la beauté visuelle des mots et des lettres, au-delà de leur seul sens."));
children.push(bulletPar("Interprétation artistique — représentation personnelle et créative d'un sujet réel (ici, un élément naturel)."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : sculpter avec ce que l'on trouve", "3.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à sculpter et à modeler, notamment avec des matériaux naturels ou recyclés, et " +
  "tu as découvert le lien entre la poterie et l'histoire des civilisations. Cette année, ces mêmes matériaux " +
  "naturels reviennent, mais avec un nouvel objectif : construire des ponts entre l'art et d'autres matières " +
  "scolaires.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Pourquoi relier les arts à d'autres matières ?", "3.2"));
children.push(bodyPar(
  "Un projet interdisciplinaire combine consciemment deux matières scolaires. Loin d'être une contrainte, " +
  "cette démarche enrichit la création : elle apporte des connaissances précises (une observation " +
  "scientifique, un texte bien écrit) qui nourrissent une œuvre plus riche et plus réfléchie.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Le bien-fondé de l'interdisciplinarité",
  [
    "Les sciences de la vie et de la terre offrent une observation précise de la nature (formes, structures, " +
    "comportements) qui peut inspirer une œuvre.",
    "Les langues (français, créole) offrent des mots, des textes, des sonorités qui peuvent devenir matière " +
    "visuelle par le lettrage.",
    "Relier deux matières oblige à mieux comprendre chacune d'elles : on ne peut pas bien représenter ce " +
    "qu'on n'a pas d'abord bien observé ou compris.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C03-01",
  "Ouverture — De la science à l'art",
  "Une salle de classe haïtienne crédible (Jacmel ou similaire) où des élèves de 8e AF observent une " +
  "illustration de papillon (issue d'un cours de sciences) avant de la réinterpréter artistiquement sur " +
  "leur cahier.",
  "L'observation scientifique peut devenir le point de départ d'une création artistique.",
  "Ouvrir le chapitre sur une scène concrète illustrant le pont entre sciences et arts.",
  "Illustration pleine largeur, scène de classe haïtienne studieuse, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le lettrage et le graphisme : l'esthétique du langage", "3.3"));
children.push(bodyPar(
  "Les lettres ne sont pas seulement des signes qui portent un sens : elles peuvent aussi être dessinées, " +
  "décorées, mises en scène. C'est ce qu'on appelle le lettrage — un pont direct entre les arts visuels et " +
  "les langues que tu étudies.",
));
children.push(calloutBox(
  "TECHNIQUE — Réaliser un lettrage simple",
  [
    "1. Choisis un mot court et significatif (en français ou en créole) — par exemple un proverbe, un titre, " +
    "ou un mot qui te tient à cœur.",
    "2. Esquisse légèrement les lettres au crayon, en jouant sur leur taille et leur épaisseur.",
    "3. Ajoute des décorations qui renforcent le sens du mot (par exemple, des feuilles pour le mot « nati" +
    "re », des vagues pour le mot « lanmè »).",
    "4. Repasse au feutre ou à l'encre une fois satisfait de ton esquisse.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : commence toujours par un crayonné léger avant de finaliser — le lettrage se corrige " +
  "difficilement une fois à l'encre. Erreur fréquente à éviter : vouloir décorer chaque lettre de façon trop " +
  "chargée, ce qui rend le mot difficile à lire.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C03-02",
  "Exemple analysé — un lettrage décoratif",
  "Un exemple de lettrage simple d'un mot créole ou français, avec des décorations liées au sens du mot " +
  "(motifs naturels, par exemple), présenté en deux étapes : crayonné puis version finalisée.",
  "Le lettrage transforme un mot en une véritable composition visuelle.",
  "Donner un exemple visuel clair de la démarche de lettrage décrite dans le texte.",
  "Illustration demi-page, exemple de lettrage en deux étapes, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Interpréter la nature", "3.4"));
children.push(bodyPar(
  "Le programme officiel encourage aussi l'interprétation artistique d'éléments naturels — représenter un " +
  "animal, une plante, ou construire à partir de matériaux naturels comme les écorces, les gousses ou les " +
  "pailles.",
));
children.push(calloutBox(
  "TECHNIQUE — Observer avant d'interpréter",
  [
    "1. Choisis un animal ou une plante que tu peux observer directement ou à partir d'une image précise " +
    "(issue par exemple d'un cours de sciences).",
    "2. Note ses caractéristiques principales : forme générale, textures, motifs.",
    "3. Réalise d'abord une représentation fidèle, puis une version plus libre et personnelle (interprétation).",
    "4. Si tu construis en volume, utilise des matériaux naturels propres (écorces, gousses, pailles) pour " +
    "enrichir ta représentation.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C03-03",
  "Démonstration technique — de l'observation à l'interprétation",
  "Une planche en deux étapes montrant un animal (par exemple un papillon) d'abord représenté fidèlement, " +
  "puis réinterprété de façon plus libre et personnelle par l'élève.",
  "Interpréter un sujet suppose d'abord de bien l'observer.",
  "Montrer concrètement le passage de l'observation fidèle à l'interprétation personnelle.",
  "Illustration demi-page, planche pédagogique en 2 étapes, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Un projet à la croisée des matières", "3.5"));
children.push(bodyPar(
  "Pour bien comprendre l'interdisciplinarité, rien ne vaut un exemple concret : imaginons un projet qui " +
  "relie les sciences de la vie et de la terre à l'art visuel, en passant par le lettrage.",
));
children.push(threeColTable(
  ["Étape", "Discipline mobilisée", "Action de l'élève"],
  [
    ["1. Observer", "Sciences de la vie et de la terre", "Étudier un animal ou une plante réelle (cycle de vie, caractéristiques)"],
    ["2. Nommer", "Langue (français/créole)", "Choisir un mot ou un court texte lié au sujet observé"],
    ["3. Créer", "Arts plastiques et visuels", "Réaliser une interprétation artistique combinant image et lettrage"],
  ],
  [2200, 3400, 4200],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Un pont entre les matières"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Réaliser une production artistique reliant les arts visuels à une autre matière scolaire (sciences de la vie et de la terre, ou langue)." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier, crayon, feutres. Facultatif : matériaux naturels propres (écorces, gousses, pailles) pour une version en volume." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis une des deux options : (A) interpréter artistiquement un animal ou une plante étudié en sciences ; (B) réaliser un lettrage décoratif d'un mot ou d'un court texte en français ou en créole." }]));
children.push(bodyPar("ÉTAPES (option A — interprétation naturelle) :", { bold: true }));
children.push(numberedPar("1. Observe ton sujet (animal ou plante) et note ses caractéristiques principales."));
children.push(numberedPar("2. Réalise une représentation fidèle, puis une interprétation plus personnelle."));
children.push(numberedPar("3. Si possible, ajoute des éléments naturels (écorces, gousses, pailles) à ta composition."));
children.push(bodyPar("ÉTAPES (option B — lettrage) :", { bold: true }));
children.push(numberedPar("1. Choisis un mot ou un court texte significatif."));
children.push(numberedPar("2. Esquisse tes lettres, puis ajoute des décorations liées au sens du mot."));
children.push(numberedPar("3. Finalise ton lettrage au feutre ou à l'encre."));
children.push(bodyPar("POUR LES DEUX OPTIONS :", { bold: true }));
children.push(numberedPar("4. Prépare une courte explication du lien entre ta production et l'autre matière mobilisée."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une production artistique clairement reliée à une autre discipline scolaire, accompagnée d'une explication " +
  "justifiant ce lien.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Le lien avec l'autre matière (sciences ou langue) est clairement identifiable."));
children.push(bulletPar("La production montre un vrai travail d'observation ou de composition, pas une simple copie."));
children.push(bulletPar("L'élève peut expliquer et justifier le lien interdisciplinaire de son projet."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier interdisciplinaire sans risque",
  [
    "Le crayon, les feutres et l'encre s'utilisent sans danger particulier.",
    "Les matériaux naturels utilisés doivent être propres, secs et non coupants.",
    "Aucune manipulation d'animal vivant n'est nécessaire : l'observation se fait à distance ou à partir " +
    "d'images.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C03-04",
  "Espace de production — mon projet interdisciplinaire",
  "Un cadre vide, format portrait, prévu pour que l'élève y réalise directement sa production (interprétation " +
  "naturelle ou lettrage) dans le manuel.",
  "Offrir un espace direct de production pour ancrer la pratique interdisciplinaire dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, sans autre décoration, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présente ta production à un camarade sans lui dire quelle matière tu as mobilisée. Peut-il la deviner ? " +
  "Discutez ensemble de ce qui rend un lien interdisciplinaire visible et convaincant dans une œuvre.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un projet interdisciplinaire relie consciemment les arts visuels à une autre matière scolaire.",
    "Le lettrage transforme un mot en composition visuelle, reliant l'art et la langue.",
    "Interpréter un élément naturel suppose d'abord de bien l'observer, en lien avec les sciences de la vie " +
    "et de la terre.",
    "Les matériaux naturels (écorces, gousses, pailles) peuvent enrichir une construction en volume.",
    "Justifier le lien entre une œuvre et une autre discipline renforce la démarche artistique.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer pourquoi relier l'art à d'autres matières enrichit une création.",
    "☐ Réaliser un lettrage simple et lisible.",
    "☐ Interpréter artistiquement un élément naturel observé.",
    "☐ Utiliser des matériaux naturels dans une construction en volume.",
    "☐ Justifier le lien interdisciplinaire de ma production.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : interdisciplinarité, lettrage, graphisme, esthétique du langage, interprétation " +
    "artistique.",
    "Vocabulaire clé à maîtriser : interdisciplinarité, lettrage, interprétation artistique.",
    "Avant l'évaluation, vérifie que tu peux : expliquer ce qu'est un projet interdisciplinaire ; décrire les " +
    "étapes d'un lettrage ; expliquer la différence entre représentation fidèle et interprétation.",
    "Question rapide de vérification : donne un exemple de matière scolaire que tu pourrais relier à un " +
    "projet artistique, et explique comment.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "interdisciplinarité · lettrage · graphisme · esthétique du langage · interprétation artistique.",
  { italics: true },
));
children.push(numberedPar("1. Relier consciemment deux matières scolaires dans un projet s'appelle l'......................"));
children.push(numberedPar("2. L'art de dessiner des lettres de façon esthétique s'appelle le ......................"));
children.push(numberedPar("3. L'organisation visuelle de textes et d'images pour communiquer une idée s'appelle le ......................"));
children.push(numberedPar("4. L'attention portée à la beauté visuelle des mots s'appelle l'......................"));
children.push(numberedPar("5. La représentation personnelle et créative d'un sujet réel s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Cite deux matières scolaires (autres que les arts) qui peuvent être reliées à une production artistique dans ce chapitre."));
children.push(numberedPar("2. Cite trois matériaux naturels mentionnés dans ce chapitre pour construire en volume."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment tu réaliserais un lettrage décoratif d'un mot créole de ton choix."));
children.push(numberedPar("2. Pourquoi faut-il d'abord bien observer un animal ou une plante avant de l'interpréter artistiquement ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare une représentation fidèle et une interprétation personnelle d'un même sujet : qu'est-ce qui change entre les deux ?"));
children.push(numberedPar("2. Un camarade a réalisé un lettrage tellement décoré que le mot devient illisible. Que lui conseilles-tu ?"));
children.push(numberedPar("3. Propose un projet interdisciplinaire de ton choix, reliant les arts visuels à une matière que tu étudies actuellement, et explique ton idée."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir le bien-fondé de l'interdisciplinarité : comprendre pourquoi relier " +
  "l'art à d'autres matières enrichit la création, réaliser un lettrage esthétique reliant l'art au langage, " +
  "observer puis interpréter artistiquement un élément naturel en lien avec les sciences de la vie et de la " +
  "terre, et utiliser des matériaux naturels pour construire en volume. Cette capacité à relier les matières " +
  "prépare des projets plus ambitieux dans les chapitres suivants.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "interdisciplinarité · lettrage · graphisme · esthétique du langage · interprétation artistique.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C03-05",
  "Patrimoine — un projet à la croisée des matières",
  "Une scène de classe haïtienne montrant plusieurs productions d'élèves affichées côte à côte : " +
  "interprétations naturelles et lettrages, illustrant la diversité des ponts interdisciplinaires possibles.",
  "Ancrer visuellement la diversité des projets interdisciplinaires réalisables en classe.",
  "Illustrer la variété des productions possibles issues de l'atelier du chapitre.",
  "Illustration demi-page, mur d'exposition de classe haïtienne, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C03-06",
  "Synthèse — Arts et autres disciplines",
  "Une carte mentale simple centrée sur « Interdisciplinarité », avec des branches vers : lettrage, " +
  "graphisme, interprétation naturelle, matériaux naturels, projet à la croisée des matières.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 22, "Manuel_EEA_8AF_Chapitre3.docx");
