// Manuel d'EEA 7e AF — Chapitre 1 : Le point, la ligne et le regard
// (champ officiel : Arts plastiques et visuels, Axe 1 — L'observation,
// développement du jugement).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), unite d'apprentissage 1 "L'observation
//   (developpement du jugement)", p.40-42/63.
// Page relue en direct pendant la Phase 0 (2026-08-22) via le lecteur Google
// Drive. Competences officielles ciblees pour cette unite [OFFICIEL -
// SOURCE MENFP VERIFIEE, p.40] : C1, C2, C3, C5, C6, C7, C8 (C4 non
// mobilisee dans cette unite specifique, conforme au tableau source).
//
// Contenu officiel repris fidelement (savoirs/savoir-faire/activites,
// p.40-42) : vocabulaire du point et de la ligne comme elements de
// composition ; rythme par le contraste des lignes ; vocabulaire de la
// forme (observation par formes geometriques) ; debut d'introduction aux
// valeurs (clair-obscur) et a la couleur, cite dans le tableau officiel de
// l'unite mais reserve comme PREPARATION, jamais enseigne comme exigence de
// maitrise en 7e AF (voir note ci-dessous - fidelite a la progression).
// Activites officielles : points/lignes en composition (contraste,
// dimension, direction) ; expression du mouvement par la ligne (exemple
// officiel : tornade, vent) ; etude du mouvement chez les maitres (Leonard
// de Vinci cite explicitement) ; point/ligne comme base du graphisme et de
// la calligraphie. References culturelles officielles : mouvement
// pointilliste (Seurat, Signac) et art Saint-Soleil (Haiti) [OFFICIEL -
// SOURCE MENFP VERIFIEE, p.41].
//
// FIDELITE A LA PROGRESSION (regle du prompt d'execution, section 3) :
// le tableau officiel de l'unite 1 mentionne aussi les valeurs/clair-obscur
// et la couleur (savoirs C et D, p.40-41) - mais la reconstruction de la
// repartition annuelle documentee en Phase 0
// (00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md) attribue le developpement complet
// des valeurs a la 8e AF et de la couleur a la 9e AF. Ce chapitre reste donc
// strictement centre sur le point, la ligne et l'observation ; les valeurs
// et la couleur ne sont qu'evoquees tres brievement en fin de chapitre
// comme un « premier regard », explicitement presente comme une preparation
// et non comme un contenu a maitriser en 7e AF - conformement a la regle
// "preparer naturellement les apprentissages futurs sans les presenter
// comme contenus officiels de 7e".
//
// Adaptations pedagogiques de securite : aucun outil dangereux ; materiel
// = crayon, fusain (sous supervision), papier, materiaux naturels/recycles
// propres pour la texture. Alternative sans materiel specifique toujours
// proposee.
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
  1,
  "Le point, la ligne et le regard",
  "Autour de toi, des points et des lignes sont partout : les fils électriques au-dessus d'une rue, les " +
  "planches d'une clôture, les motifs d'un tissu. Ce chapitre t'apprend à vraiment les regarder — et à les " +
  "utiliser pour créer.",
  [
    "Observer attentivement les points et les lignes qui composent le monde autour de toi.",
    "Utiliser le vocabulaire du point, de la ligne et du rythme visuel.",
    "Tracer des lignes variées avec précision et intention.",
    "T'inspirer d'un mouvement artistique connu pour créer une composition personnelle.",
    "Reconnaître un exemple du patrimoine artistique haïtien lié à l'observation.",
    "Exprimer une idée ou un mouvement grâce au simple tracé d'une ligne.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Un matin, à Jacmel, une élève de 7e AF attend le bus scolaire. En regardant autour " +
  "d'elle, elle remarque les lignes du grillage d'une clôture, les points de rouille sur un toit de tôle, et " +
  "le motif régulier des marches d'un escalier voisin. Elle se dit : « Je n'avais jamais vraiment regardé ça. » " +
  "Ce chapitre t'apprend à observer comme elle — puis à transformer ce regard en dessin.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Point — la plus petite unité visuelle, une simple marque sur une surface."));
children.push(bulletPar("Ligne — un tracé continu reliant des points, qui peut être simple, épaisse, fine, pointillée."));
children.push(bulletPar("Composition — la façon dont les éléments (points, lignes, formes) sont organisés sur une surface."));
children.push(bulletPar("Rythme visuel — l'effet créé par la répétition ou la variation de lignes ou de formes."));
children.push(bulletPar("Pointillisme — technique artistique qui utilise de petits points pour créer une image."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Observer avec les yeux et la main", "1.1"));
children.push(bodyPar(
  "Avant de dessiner, il faut apprendre à observer. Le point et la ligne sont les éléments de base de toute " +
  "composition visuelle : un simple point peut attirer l'œil, une ligne peut guider le regard, exprimer un " +
  "mouvement ou délimiter une forme.",
));
children.push(calloutBox(
  "OBSERVER — Le point et la ligne autour de toi",
  [
    "Un point peut être isolé ou répété pour créer une texture.",
    "Une ligne peut être droite, courbe, brisée — chaque forme raconte quelque chose de différent.",
    "Le contraste entre des lignes simples, épaisses, amincies ou pointillées crée un rythme visuel.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C01-01",
  "Ouverture — Points et lignes dans la rue",
  "Une scène de rue haïtienne crédible (Jacmel ou ville similaire) où apparaissent naturellement des points " +
  "et lignes : grillage, toit de tôle, escalier, câbles électriques, avec un ou deux élèves de 7e AF en train " +
  "d'observer, carnet en main.",
  "Un vrai regard artistique commence par l'observation du quotidien.",
  "Ouvrir le chapitre sur une scène concrète et haïtienne qui ancre la notion de point/ligne dans le réel.",
  "Illustration pleine largeur, scène urbaine haïtienne, ambiance lumineuse et curieuse.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le rythme des lignes", "1.2"));
children.push(bodyPar(
  "Une ligne n'est jamais neutre : selon son épaisseur, sa direction et sa régularité, elle produit un effet " +
  "différent sur celui qui regarde. Apprendre à varier ses lignes, c'est déjà commencer à s'exprimer.",
));
children.push(calloutBox(
  "TECHNIQUE — Quatre familles de lignes à explorer",
  [
    "Lignes simples et fines : légèreté, délicatesse.",
    "Lignes épaisses : force, solidité.",
    "Lignes amincies (qui varient d'épaisseur) : mouvement, vitesse.",
    "Lignes pointillées : légèreté, suggestion plutôt qu'affirmation.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : pour tracer une ligne franche et droite, garde le poignet souple mais le geste sûr — " +
  "un tracé hésitant produit une ligne tremblante. Erreur fréquente à éviter : vouloir aller trop vite dès le " +
  "début ; mieux vaut d'abord s'entraîner lentement avant de chercher la rapidité.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le pointillisme et l'art Saint-Soleil", "1.3"));
children.push(bodyPar(
  "Le point et la ligne comme base d'une œuvre entière : c'est le principe du pointillisme, un mouvement " +
  "artistique où l'image entière est composée de petits points juxtaposés. Ce principe rejoint aussi une " +
  "démarche artistique bien connue en Haïti.",
));
children.push(calloutBox(
  "PATRIMOINE HAÏTIEN — L'art Saint-Soleil",
  [
    "Le pointillisme, développé notamment par les peintres Georges Seurat et Paul Signac, construit une image " +
    "entière à partir de petits points de couleur juxtaposés.",
    "En Haïti, le mouvement artistique Saint-Soleil est une référence importante liée à cette manière " +
    "d'observer et de composer par petites touches, reconnue dans le programme national d'éducation " +
    "artistique.",
    "Observer une œuvre de ce type, c'est apprendre à voir comment une multitude de petites marques peut " +
    "former une image cohérente vue de loin.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, "3E4F3B",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C01-02",
  "Exemple d'œuvre analysée — composition de points",
  "Reproduction stylisée (non protégée par le droit d'auteur, réalisée pour le manuel) illustrant le principe " +
  "du pointillisme : une image simple composée uniquement de petits points de couleurs variées, avec une " +
  "loupe montrant le détail des points.",
  "Le pointillisme et l'art Saint-Soleil montrent qu'une image peut naître de la répétition d'un geste simple.",
  "Donner un exemple visuel concret du principe expliqué dans l'encadré Patrimoine haïtien.",
  "Illustration demi-page, image stylisée à points colorés + zoom, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Exprimer un mouvement grâce à la ligne", "1.4"));
children.push(bodyPar(
  "Une ligne peut aussi exprimer une force ou un mouvement, même sans dessiner d'objet précis. Pense à la " +
  "façon dont on représente le vent ou un tourbillon : quelques lignes courbes suffisent à faire « sentir » le " +
  "mouvement.",
));
children.push(calloutBox(
  "OBSERVER — Le geste des grands maîtres",
  [
    "De nombreux artistes, dont Léonard de Vinci, ont étudié le mouvement à travers des croquis rapides et " +
    "des gribouillages qui capturaient l'essentiel d'un geste ou d'une force, avant de devenir des dessins " +
    "figuratifs plus précis.",
    "S'entraîner à dessiner rapidement un mouvement (sans chercher la perfection) aide à mieux comprendre " +
    "comment une ligne peut exprimer une idée.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C01-03",
  "Démonstration technique — dessiner le mouvement",
  "Une planche en trois étapes montrant comment quelques lignes courbes simples peuvent représenter une " +
  "tornade ou un coup de vent, du croquis le plus simple au plus élaboré.",
  "Une ligne bien tracée peut exprimer un mouvement sans dessiner d'objet précis.",
  "Montrer concrètement la démarche pas-à-pas pour représenter un mouvement par la ligne.",
  "Illustration demi-page, planche pédagogique en 3 étapes, style croquis clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Un premier regard vers la lumière", "1.5"));
children.push(bodyPar(
  "Le point et la ligne peuvent aussi commencer à suggérer une sensation de lumière ou d'ombre, simplement en " +
  "variant leur densité (beaucoup de lignes rapprochées = zone plus sombre ; lignes espacées = zone plus " +
  "claire). Ce n'est qu'un premier aperçu : tu approfondiras vraiment le travail des valeurs et de la couleur " +
  "dans les années suivantes de ta scolarité. Pour l'instant, il suffit de remarquer que la ligne peut, elle " +
  "aussi, suggérer la lumière.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ma composition de points et de lignes"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Créer une composition personnelle en utilisant uniquement des points et des lignes de différentes familles (simples, épaisses, amincies, pointillées)." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Une feuille de papier, un crayon, et si possible un feutre fin ou un fusain. Alternative : un bâton fin sur une surface de terre lissée si aucun papier n'est disponible." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis un thème parmi : « le vent », « une foule », ou « un motif de tissu ». Utilise uniquement des points et des lignes pour le représenter." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Choisis ton thème et réfléchis à ce qu'il évoque (mouvement, calme, agitation...)."));
children.push(numberedPar("2. Trace d'abord un brouillon rapide, sans chercher la perfection (comme le gribouillage des maîtres)."));
children.push(numberedPar("3. Réalise ta composition finale en variant les familles de lignes ou de points."));
children.push(numberedPar("4. Donne un titre court à ta composition."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une composition originale, reconnaissable, utilisant au moins deux familles de lignes ou de points " +
  "différentes, cohérente avec le thème choisi.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La composition utilise bien uniquement des points et/ou des lignes (pas de formes pleines)."));
children.push(bulletPar("Au moins deux familles de lignes différentes sont reconnaissables."));
children.push(bulletPar("L'élève peut expliquer le lien entre son thème et sa composition."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier sans risque",
  [
    "Le fusain et les crayons s'utilisent normalement sans danger ; en cas d'usage de matériel taillé " +
    "(taille-crayon), rester prudent avec la lame.",
    "Aucun outil tranchant non scolaire n'est nécessaire pour cette activité.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C01-04",
  "Espace de production — atelier de composition",
  "Un cadre vide, format portrait, prévu pour que l'élève réalise directement sa composition de points et de " +
  "lignes dans le manuel (ou reproduise le cadre sur une feuille séparée).",
  "Offrir un espace direct de production pour ancrer la pratique dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, sans autre décoration, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Échange ta composition avec un camarade. Sans connaître ton thème, peut-il deviner ce que tu as voulu " +
  "représenter rien qu'en observant tes lignes ? Discutez ensemble de ce qui fonctionne bien et de ce qui " +
  "pourrait être encore plus clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Le point et la ligne sont les éléments de base de toute composition visuelle.",
    "Le contraste entre lignes simples, épaisses, amincies et pointillées crée un rythme visuel.",
    "Le pointillisme construit une image entière à partir de petits points juxtaposés — un principe présent " +
    "aussi dans l'art Saint-Soleil en Haïti.",
    "Une ligne peut exprimer un mouvement ou une force sans représenter un objet précis.",
    "Observer le geste des artistes (comme les croquis rapides de Léonard de Vinci) aide à mieux dessiner.",
    "La densité des lignes peut commencer à suggérer une sensation de lumière — une notion que tu " +
    "approfondiras plus tard.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Observer et nommer des points et des lignes dans mon environnement.",
    "☐ Tracer au moins deux familles de lignes différentes.",
    "☐ Expliquer ce qu'est le pointillisme en une phrase.",
    "☐ Citer l'art Saint-Soleil comme exemple du patrimoine haïtien lié à ce chapitre.",
    "☐ Utiliser une ligne pour exprimer un mouvement.",
    "☐ Expliquer ma composition à un camarade.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : point, ligne, composition, rythme visuel, pointillisme.",
    "Vocabulaire clé à maîtriser : point, ligne, contraste, composition, rythme.",
    "Avant l'évaluation, vérifie que tu peux : nommer les quatre familles de lignes vues dans ce chapitre ; " +
    "expliquer le principe du pointillisme ; citer l'art Saint-Soleil.",
    "Question rapide de vérification : donne un exemple de point ou de ligne que tu observes tous les jours " +
    "autour de toi.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : point · " +
  "ligne · composition · rythme visuel · pointillisme.",
  { italics: true },
));
children.push(numberedPar("1. La plus petite unité visuelle, une simple marque sur une surface, est un ......................"));
children.push(numberedPar("2. Un tracé continu reliant des points s'appelle une ......................"));
children.push(numberedPar("3. La façon d'organiser les éléments sur une surface s'appelle la ......................"));
children.push(numberedPar("4. L'effet créé par la répétition ou la variation de lignes s'appelle le ......................"));
children.push(numberedPar("5. La technique qui construit une image à partir de petits points s'appelle le ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(bodyPar(
  "Observe attentivement les objets suivants et indique, pour chacun, s'ils te font penser davantage à des " +
  "points ou à des lignes : un grillage · un ciel étoilé · une clôture en bois · une pluie fine · un escalier.",
  { italics: true },
));
children.push(numberedPar("Note tes réponses puis explique en une phrase pourquoi pour l'un des cinq exemples."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Dessine, dans le cadre ci-dessous, trois exemples de lignes appartenant à trois familles différentes (simple, épaisse, pointillée)."));
children.push(threeColTable(
  ["Ligne simple", "Ligne épaisse", "Ligne pointillée"],
  [["", "", ""]],
  [3000, 3000, 3000],
));
children.push(spacer(160));
children.push(numberedPar("2. À quelle famille appartient une ligne qui varie d'épaisseur du début à la fin ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Regarde une œuvre ou une image composée uniquement de points (pointillisme). Que remarques-tu quand tu t'en approches, puis quand tu t'en éloignes ?"));
children.push(numberedPar("2. Explique en quelques phrases pourquoi une ligne courbe peut donner une impression de mouvement, alors qu'une ligne droite et immobile donne une impression de calme."));
children.push(numberedPar("3. Propose un thème (autre que ceux de l'atelier) que tu pourrais représenter uniquement avec des points et des lignes, et explique ton choix."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir le point et la ligne comme éléments de base de toute composition " +
  "visuelle : observer leur présence dans le quotidien, distinguer différentes familles de lignes, comprendre " +
  "le principe du pointillisme et son lien avec l'art Saint-Soleil en Haïti, utiliser la ligne pour exprimer " +
  "un mouvement, et réaliser une composition personnelle. Ce premier regard entraîné prépare les prochaines " +
  "découvertes de l'année, sans encore aborder en profondeur les valeurs de lumière ni la couleur.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "point · ligne · composition · rythme visuel · pointillisme · art Saint-Soleil.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C01-05",
  "Patrimoine haïtien lié au chapitre",
  "Une scène évoquant, de façon respectueuse et stylisée, l'esprit de l'art Saint-Soleil (couleurs vives, " +
  "composition par petites touches), sans reproduire une œuvre précise protégée.",
  "Ancrer visuellement le lien entre le chapitre et le patrimoine artistique haïtien.",
  "Illustration demi-page, style inspiré, respectueux, non attribué faussement à un artiste précis.",
  "Illustration demi-page, cohérente avec la charte EEA, couleurs vives mais professionnelles.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C01-06",
  "Synthèse — Le point, la ligne et le regard",
  "Une carte mentale simple centrée sur « Point et ligne », avec des branches vers : familles de lignes, " +
  "pointillisme/Saint-Soleil, mouvement, premier regard sur la lumière.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 1, "Manuel_EEA_7AF_Chapitre1.docx");
