// Manuel d'EEA 7e AF — Chapitre 2 : Formes, couleurs et premiers repères
// (champ officiel : Arts plastiques et visuels, Axe 2 — Le développement
// des sens, connaissance des éléments et principes artistiques visuels).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), unite d'apprentissage 2 "Le
//   developpement des sens - connaissance des elements et principes
//   artistiques visuels", p.43-44/63.
// Page relue pendant la Phase 0 (2026-08-22). Competences officielles
// ciblees pour cette unite [OFFICIEL - SOURCE MENFP VERIFIEE, p.43] : C1,
// C2, C3, C5, C6, C7, C8 (memes 7 competences que le Chapitre 1, C4 non
// mobilisee dans cette unite).
//
// Contenu officiel repris fidelement (p.43-44) : differencier les formes
// geometriques des formes naturelles/biomorphiques ; introduction aux
// principes de composition (harmonie, balance). Activites officielles :
// dessin de formes geometriques et naturelles/biomorphiques ; decomposition
// d'un objet ou d'un tableau en formes geometriques. References culturelles
// officielles, citees ensemble dans la source : le cubisme ET les Vèvès
// (Haiti) [OFFICIEL - SOURCE MENFP VERIFIEE, p.43].
//
// FIDELITE AU TITRE VERROUILLE : le titre du chapitre (TABLE_MATIERES
// verrouillee, Phase 0) mentionne "couleurs" alors que le savoir officiel
// de cette unite (p.43-44) ne detaille pas la couleur pour la 7e AF -
// celle-ci est associee a la 9e AF dans la reconstruction documentee en
// Phase 0 (00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md, statut ADAPTATION DE
// LECTURE - A RECONFIRMER). Le titre n'est PAS modifie (interdiction
// absolue du prompt d'execution) ; sa mention de "couleurs" est honoree par
// un "premier repere" tres bref et explicitement non evalue comme acquis
// 7e AF (section 2.5), coherent avec le sous-titre du chapitre lui-meme
// ("premiers reperes", pas "maitrise"). Meme logique de prudence deja
// appliquee au Chapitre 1 pour les valeurs de lumiere.
//
// FIDELITE CULTURELLE : les Vèvès sont des symboles sacres du vodou
// haitien, traces ceremoniellement. Ce chapitre les presente uniquement
// comme exemple pedagogique de formes symboliques/geometriques (tel que le
// fait le programme officiel lui-meme, en les citant aupres du cubisme),
// de maniere factuelle et respectueuse, sans reproduire un vève ceremoniel
// precis ni le detourner de son sens.
//
// Adaptations de securite : materiel scolaire simple (crayon, papier,
// regle) ; aucun outil dangereux.
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
  "Formes, couleurs et premiers repères",
  "Au chapitre 1, tu as appris à observer des points et des lignes. Maintenant, regarde ce qui se passe " +
  "quand plusieurs lignes se rejoignent : elles créent des formes. Ce chapitre t'apprend à reconnaître, " +
  "organiser et composer avec des formes — et à poser un premier regard sur la couleur.",
  [
    "Différencier les formes géométriques des formes naturelles.",
    "Décomposer un objet ou une image en formes simples.",
    "Découvrir les principes de base d'une composition équilibrée.",
    "Reconnaître un exemple du patrimoine artistique haïtien lié aux formes symboliques.",
    "Créer une composition personnelle à partir de formes observées dans la nature ou le milieu.",
    "Poser un premier regard sur la couleur, sans encore chercher à la maîtriser complètement.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Sur le marché de Croix-des-Bouquets, un jeune observateur remarque que les paniers " +
  "tressés, les fruits empilés et les toits environnants forment tous des figures reconnaissables : cercles, " +
  "triangles, formes irrégulières comme celles des feuilles ou des nuages. Il se demande : « Peut-on ranger " +
  "toutes ces formes dans des familles ? » Ce chapitre répond à sa question.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Forme géométrique — forme régulière et mesurable (cercle, carré, triangle, rectangle...)."));
children.push(bulletPar("Forme naturelle ou biomorphique — forme irrégulière, inspirée du vivant (une feuille, un nuage, une vague)."));
children.push(bulletPar("Décomposer — analyser un objet complexe en le ramenant à des formes simples."));
children.push(bulletPar("Composition — l'organisation des formes entre elles sur une surface."));
children.push(bulletPar("Harmonie et balance — l'équilibre ressenti entre les différents éléments d'une composition."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Différencier les formes", "2.1"));
children.push(bodyPar(
  "Toutes les formes ne se ressemblent pas. Certaines suivent des règles précises et mesurables : ce sont les " +
  "formes géométriques. D'autres sont irrégulières, comme celles que l'on trouve dans la nature : ce sont les " +
  "formes naturelles ou biomorphiques.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Deux grandes familles de formes",
  [
    "Formes géométriques : cercle, carré, triangle, rectangle, losange — régulières, mesurables, souvent " +
    "présentes dans les objets fabriqués.",
    "Formes naturelles/biomorphiques : irrégulières, organiques — présentes dans les feuilles, les nuages, " +
    "les vagues, le corps humain.",
    "Un même objet peut souvent être vu des deux façons selon l'angle d'observation.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C02-01",
  "Ouverture — Formes du marché",
  "Une scène de marché haïtien crédible (Croix-des-Bouquets ou similaire) où apparaissent naturellement des " +
  "formes géométriques (paniers, étals) et biomorphiques (fruits, feuilles), avec un élève observant et " +
  "esquissant dans un carnet.",
  "Les formes géométriques et naturelles coexistent partout dans notre environnement.",
  "Ouvrir le chapitre sur une scène concrète et haïtienne qui ancre la distinction des deux familles de formes.",
  "Illustration pleine largeur, scène de marché haïtien, ambiance vivante et colorée mais professionnelle.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le cubisme : décomposer le monde en formes", "2.2"));
children.push(bodyPar(
  "Décomposer un objet, c'est le regarder comme un ensemble de formes simples plutôt que comme un tout. " +
  "C'est exactement ce qu'ont fait les peintres du mouvement cubiste : ils ont réinventé la façon de " +
  "représenter les objets et les visages en les décomposant en formes géométriques, montrées parfois sous " +
  "plusieurs angles à la fois.",
));
children.push(calloutBox(
  "OBSERVER — La méthode cubiste",
  [
    "Regarder un objet et identifier les formes géométriques simples qui le composent (un visage peut " +
    "devenir un assemblage de triangles et de cercles).",
    "Représenter parfois plusieurs points de vue d'un même objet dans une seule image.",
    "Simplifier volontairement la réalité pour mieux en révéler la structure.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C02-02",
  "Exemple analysé — décomposition cubiste",
  "Une image en deux parties : à gauche, un objet simple (une théière ou un fruit) dessiné normalement ; à " +
  "droite, le même objet décomposé en formes géométriques simples façon cubiste, avec des flèches reliant les " +
  "deux versions.",
  "Décomposer un objet en formes révèle sa structure cachée.",
  "Donner un exemple visuel clair et progressif de la méthode cubiste expliquée dans le texte.",
  "Illustration demi-page, schéma comparatif clair, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les Vèvès : des formes chargées de sens", "2.3"));
children.push(bodyPar(
  "En Haïti, une autre tradition artistique utilise elle aussi des formes géométriques et symboliques " +
  "organisées avec précision : les Vèvès. Ce sont des dessins symboliques tracés dans la tradition vodou " +
  "haïtienne, composés de lignes, de points et de formes géométriques répétées selon des règles précises, " +
  "chacun représentant une signification particulière.",
));
children.push(calloutBox(
  "PATRIMOINE HAÏTIEN — Les Vèvès, formes et symboles",
  [
    "Un vève est un dessin symbolique de la tradition vodou haïtienne, tracé selon des motifs géométriques et " +
    "linéaires précis.",
    "Comme dans le cubisme, on y retrouve une organisation rigoureuse de formes simples (lignes, points, " +
    "courbes) pour construire un ensemble porteur de sens.",
    "Le programme national d'éducation artistique reconnaît les Vèvès comme une référence importante pour " +
    "comprendre comment une culture peut organiser des formes géométriques de façon symbolique.",
    "Ce chapitre les évoque avec respect, comme un exemple de patrimoine haïtien, sans reproduire un dessin " +
    "cérémoniel précis.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, "3E4F3B",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Composer avec des formes", "2.4"));
children.push(bodyPar(
  "Une fois les formes identifiées, il faut apprendre à les organiser ensemble sur une page : c'est le " +
  "principe de la composition. Une bonne composition donne une impression d'équilibre — d'harmonie et de " +
  "balance — même si les formes utilisées sont très différentes les unes des autres.",
));
children.push(calloutBox(
  "TECHNIQUE — Décomposer un objet en formes",
  [
    "1. Choisis un objet simple à observer (un fruit, un outil, un meuble).",
    "2. Regarde-le en plissant légèrement les yeux : quelles formes géométriques ou naturelles vois-tu ?",
    "3. Dessine d'abord ces formes simples, légèrement, au crayon.",
    "4. Ajoute ensuite les détails par-dessus ce squelette de formes.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : commence toujours par les grandes formes avant les détails. Erreur fréquente à " +
  "éviter : vouloir dessiner tous les petits détails avant d'avoir posé la structure générale — le résultat " +
  "devient alors déséquilibré.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C02-03",
  "Démonstration technique — du squelette de formes au dessin final",
  "Une planche en trois étapes montrant un objet simple (une chaise ou un fruit) d'abord réduit à des formes " +
  "géométriques légères, puis progressivement détaillé jusqu'au dessin final.",
  "Une bonne composition commence toujours par les grandes formes avant les détails.",
  "Montrer concrètement la démarche pas-à-pas de décomposition puis de composition.",
  "Illustration demi-page, planche pédagogique en 3 étapes, style croquis clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Premiers repères de couleur", "2.5"));
children.push(bodyPar(
  "Pour terminer, un tout premier repère : remarque que certaines formes autour de toi te semblent « chaudes » " +
  "(comme le rouge, l'orange, le jaune) et d'autres « froides » (comme le bleu, le vert). Ce n'est qu'un " +
  "premier repère — tu apprendras à utiliser la couleur avec plus de précision dans les années suivantes de " +
  "ta scolarité. Pour l'instant, il suffit de commencer à remarquer cette différence autour de toi.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ma composition de formes"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Créer une composition personnelle inspirée d'un élément de la nature ou du milieu, en utilisant à la fois des formes géométriques et des formes naturelles." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Une feuille de papier, un crayon. Facultatif : une règle pour les formes géométriques précises. Alternative : dessin sur une ardoise ou une surface de terre lissée si aucun papier n'est disponible." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis un élément de ton environnement (un fruit, une feuille, un objet de la maison ou de l'école) et représente-le en deux étapes." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Observe attentivement ton élément choisi."));
children.push(numberedPar("2. Décompose-le d'abord en formes géométriques et/ou naturelles simples (comme à la section 2.4)."));
children.push(numberedPar("3. Réalise ta composition finale en gardant une trace visible des formes de départ."));
children.push(numberedPar("4. Donne un titre à ta composition."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une composition reconnaissable qui montre clairement le passage des formes simples vers le dessin final, " +
  "utilisant au moins une forme géométrique et une forme naturelle.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La composition utilise au moins une forme géométrique et une forme naturelle."));
children.push(bulletPar("Les grandes formes ont été posées avant les détails."));
children.push(bulletPar("L'élève peut nommer les formes utilisées dans sa composition."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier sans risque",
  [
    "Le crayon et la règle s'utilisent sans danger particulier ; rester prudent uniquement avec la pointe du " +
    "crayon lors des déplacements.",
    "Aucun matériel coûteux ou dangereux n'est nécessaire pour cette activité.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C02-04",
  "Espace de production — atelier de composition",
  "Un cadre vide, format portrait, prévu pour que l'élève réalise directement sa composition de formes dans " +
  "le manuel (ou reproduise le cadre sur une feuille séparée).",
  "Offrir un espace direct de production pour ancrer la pratique dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, sans autre décoration, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Montre ta composition à un camarade sans lui dire quel était ton élément de départ. Peut-il reconnaître " +
  "les formes géométriques et naturelles que tu as utilisées ? Discutez ensemble de ce qui rend une " +
  "composition équilibrée ou non.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Les formes géométriques sont régulières et mesurables ; les formes naturelles/biomorphiques sont " +
    "irrégulières et organiques.",
    "Décomposer un objet en formes simples aide à mieux comprendre sa structure — c'est la méthode du " +
    "cubisme.",
    "Les Vèvès, dans la tradition vodou haïtienne, organisent eux aussi des formes géométriques et " +
    "symboliques selon des règles précises.",
    "Une bonne composition s'organise des grandes formes vers les détails, en cherchant l'harmonie et la " +
    "balance.",
    "Certaines couleurs sont ressenties comme « chaudes » et d'autres comme « froides » — un premier repère " +
    "que tu approfondiras plus tard.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer une forme géométrique d'une forme naturelle/biomorphique.",
    "☐ Décomposer un objet simple en formes de base.",
    "☐ Expliquer le principe de la méthode cubiste en une phrase.",
    "☐ Citer les Vèvès comme exemple du patrimoine haïtien lié à ce chapitre.",
    "☐ Réaliser une composition équilibrée à partir de formes simples.",
    "☐ Reconnaître une couleur chaude et une couleur froide.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : forme géométrique, forme naturelle/biomorphique, composition, harmonie, balance.",
    "Vocabulaire clé à maîtriser : décomposer, composition, harmonie, balance.",
    "Avant l'évaluation, vérifie que tu peux : citer deux formes géométriques et deux formes naturelles ; " +
    "expliquer la méthode de décomposition d'un objet ; citer les Vèvès comme référence patrimoniale.",
    "Question rapide de vérification : donne un exemple d'objet de ton environnement qui contient à la fois " +
    "des formes géométriques et des formes naturelles.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : forme " +
  "géométrique · forme naturelle · décomposer · composition · harmonie.",
  { italics: true },
));
children.push(numberedPar("1. Un cercle, un carré et un triangle sont des exemples de ......................"));
children.push(numberedPar("2. Une feuille ou un nuage est un exemple de ......................"));
children.push(numberedPar("3. Analyser un objet en le ramenant à des formes simples, c'est le ......................"));
children.push(numberedPar("4. L'organisation des formes entre elles sur une surface s'appelle la ......................"));
children.push(numberedPar("5. L'équilibre ressenti entre les éléments d'une composition s'appelle l'......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(bodyPar(
  "Classe les objets suivants selon qu'ils te semblent plutôt géométriques ou plutôt naturels/biomorphiques : " +
  "un ballon · un caillou · une fenêtre · un nuage · une brique · une feuille de bananier.",
  { italics: true },
));
children.push(twoColTable(
  "Plutôt géométrique", "Plutôt naturel / biomorphique",
  [["", ""], ["", ""], ["", ""]],
));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Dans le cadre ci-dessous, décompose un objet de ton choix en trois formes géométriques simples."));
children.push(threeColTable(
  ["Étape 1 : formes simples", "Étape 2 : ajout de détails", "Étape 3 : dessin final"],
  [["", "", ""]],
  [3000, 3000, 3000],
));
children.push(spacer(160));
children.push(numberedPar("2. Pourquoi est-il conseillé de commencer un dessin par les grandes formes plutôt que par les détails ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Compare une composition qui utilise uniquement des formes géométriques à une composition qui mélange formes géométriques et naturelles. Laquelle te semble la plus vivante ? Justifie ta réponse."));
children.push(numberedPar("2. En quoi la méthode du cubisme (décomposer un objet en formes) et l'organisation d'un vève (formes géométriques symboliques) se ressemblent-elles, même si leurs objectifs sont différents ?"));
children.push(numberedPar("3. Propose un objet de ton quotidien que tu pourrais décomposer en formes géométriques pour un futur dessin."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de distinguer les formes géométriques des formes naturelles, de découvrir la méthode " +
  "cubiste de décomposition d'un objet, de reconnaître les Vèvès comme exemple du patrimoine haïtien lié à " +
  "l'organisation de formes symboliques, d'apprendre à composer en partant des grandes formes vers les " +
  "détails, et de poser un tout premier regard sur les couleurs chaudes et froides. Ces repères préparent les " +
  "découvertes plus approfondies des prochains chapitres et des années suivantes.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "forme géométrique · forme naturelle · décomposer · composition · harmonie · balance · Vèvès.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C02-05",
  "Patrimoine haïtien lié au chapitre",
  "Une représentation respectueuse et stylisée évoquant l'organisation géométrique de motifs symboliques " +
  "haïtiens, sans reproduire un vève cérémoniel précis — motifs géométriques abstraits inspirés du principe " +
  "décrit dans le texte.",
  "Ancrer visuellement le lien entre le chapitre et le patrimoine artistique haïtien, avec respect.",
  "Illustration demi-page, motifs géométriques abstraits, style respectueux et non cérémoniel.",
  "Illustration demi-page, cohérente avec la charte EEA, tons ocre et vert sauge.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C02-06",
  "Synthèse — Formes, couleurs et premiers repères",
  "Une carte mentale simple centrée sur « Formes », avec des branches vers : formes géométriques, formes " +
  "naturelles, décomposition/cubisme, Vèvès, composition, premiers repères de couleur.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 11, "Manuel_EEA_7AF_Chapitre2.docx");
