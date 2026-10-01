// Manuel d'EEA 8e AF — Chapitre 1 : Lumière, ombre et volume dessiné
// (champ officiel : Arts plastiques et visuels, Axe 1 — L'observation,
// approfondissement).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), unite d'apprentissage 1 "L'observation
//   (developpement du jugement)", p.40-42/63 — meme unite officielle que le
//   Chapitre 1 de la 7e AF, approfondie ici pour la 8e AF.
// Page relue pendant la Phase 0 (2026-08-22) et reconfirmee pendant la
// redaction du Chapitre 1 EEA 7e AF (2026-08-23). Competences officielles
// ciblees pour cette unite [OFFICIEL - SOURCE MENFP VERIFIEE, p.40] : C1,
// C2, C3, C5, C6, C7, C8 (memes 7 competences que le Chapitre 1 de la 7e AF
// - C4 non mobilisee dans cette unite, conforme au tableau source).
//
// STATUT DE L'ATTRIBUTION ANNEE : comme documente en Phase 0
// (00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md, 00_PHASE0/04_MATRICE_EEA_8AF.md),
// l'attribution precise du contenu "valeurs en dessin / contraste
// clair-obscur (nuances de gris, ombre et lumiere) / references Rembrandt,
// le Caravage / photographie noir et blanc" a la 8e AF specifiquement
// repose sur une reconstruction de lecture du tableau source, marquee
// [ADAPTATION DE LECTURE - A RECONFIRMER]. Ce contenu est neanmoins
// explicitement present, mot pour mot, dans le texte officiel de l'unite 1
// (p.41) : seule son annee precise d'enseignement (7e, 8e ou 9e AF) repose
// sur une reconstruction, pas son existence ni sa formulation.
//
// Contenu officiel repris fidelement (p.41) : "Les valeurs en dessin / le
// contraste clair-obscur (nuances de gris, ombre et lumiere)". References
// explicites : Rembrandt, le Caravage, et "la photographie en noir et
// blanc (photos anciennes, photos familiales)". Savoir-faire officiel
// associe : "ombrage en dessin pour rendre le volume et la lumiere".
// Activite officielle : "Exercices de gammes de valeurs".
//
// CONTROLE DU PASSAGE 7e -> 8e AF (section 2 du prompt d'execution) : le
// Chapitre 1 de la 7e AF (deja redige et finalise, NON modifie ici) a
// traite le point et la ligne, avec seulement un "premier regard" tres
// bref et explicitement non evalue sur les valeurs de lumiere (section 1.5
// de ce chapitre precedent). Ce Chapitre 1 de la 8e AF reprend ce
// prerequis en un rappel court (section 1.1), puis approfondit reellement
// la maitrise du clair-obscur, du volume dessine et de l'analyse d'images
// reelles (photographies anciennes) - une progression nette en analyse, en
// maitrise technique et en vocabulaire, sans repeter le contenu du point
// et de la ligne deja acquis. Aucune anticipation de la 9e AF (couleur,
// cercle chromatique) n'est introduite ici.
//
// Adaptations de securite : materiel = crayon, fusain, gomme, papier ;
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
  1,
  "Lumière, ombre et volume dessiné",
  "L'an dernier, tu as appris à observer le point et la ligne, et tu as eu un tout premier aperçu de la " +
  "lumière dans un dessin. Cette année, tu vas vraiment apprendre à maîtriser l'ombre et la lumière — pour " +
  "faire naître le volume sur une simple feuille plate.",
  [
    "Approfondir le contraste clair-obscur : ombre et lumière.",
    "Utiliser des nuances de gris pour créer une gamme de valeurs.",
    "Ombrer un dessin pour lui donner du volume.",
    "Analyser une photographie ancienne en noir et blanc.",
    "Observer et comprendre le travail de deux grands maîtres du clair-obscur.",
    "Reconnaître la lumière et l'ombre dans des scènes haïtiennes du quotidien.",
  ],
));

children.push(bodyPar(
  "Situation de départ : En fin d'après-midi, dans une cour d'école de Léogâne, la lumière du soleil couchant " +
  "traverse la varangue et dessine de longues ombres sur le sol. Une élève de 8e AF s'arrête, surprise par le " +
  "contraste entre les zones très claires et les zones presque noires. « Comment un simple crayon pourrait-il " +
  "rendre ça ? » se demande-t-elle. Ce chapitre répond à sa question.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Clair-obscur — contraste marqué entre les zones claires (lumière) et les zones sombres (ombre) d'une image."));
children.push(bulletPar("Nuance de gris — degré d'intensité entre le blanc pur et le noir pur."));
children.push(bulletPar("Gamme de valeurs — suite organisée de nuances, du plus clair au plus foncé."));
children.push(bulletPar("Ombrage — technique de dessin qui utilise les valeurs pour suggérer le volume et la lumière."));
children.push(bulletPar("Volume (dessiné) — impression de profondeur et de relief donnée à un dessin normalement plat."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : du trait à la lumière", "1.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à observer et tracer des points et des lignes, et tu as eu un premier aperçu " +
  "de la notion de lumière : la densité des lignes pouvait déjà suggérer une zone plus ou moins claire. Cette " +
  "année, cette notion devient une véritable compétence à maîtriser : le contraste clair-obscur.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le contraste clair-obscur : ombre et lumière", "1.2"));
children.push(bodyPar(
  "Le clair-obscur désigne le contraste marqué entre les zones éclairées et les zones dans l'ombre d'une " +
  "image. Bien observé et bien rendu, ce contraste donne une impression de volume et de profondeur à un " +
  "dessin qui reste pourtant totalement plat.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Observer la lumière avant de la dessiner",
  [
    "Repère d'abord la source de lumière : d'où vient-elle ?",
    "Identifie les zones les plus éclairées (souvent proches de la source de lumière).",
    "Identifie les zones les plus sombres (souvent à l'opposé de la lumière, ou cachées).",
    "Remarque les nuances intermédiaires : entre le très clair et le très sombre, il existe de nombreuses " +
    "nuances de gris.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C01-01",
  "Ouverture — Ombre et lumière dans une cour d'école",
  "Une cour d'école haïtienne crédible (Léogâne ou similaire), en fin d'après-midi, avec un fort contraste " +
  "d'ombre et de lumière (varangue, arbres), et une élève de 8e AF observant la scène, carnet en main.",
  "Le clair-obscur s'observe d'abord dans la réalité, avant de se retrouver sur le papier.",
  "Ouvrir le chapitre sur une scène concrète et haïtienne qui ancre la notion de clair-obscur.",
  "Illustration pleine largeur, scène de cour d'école haïtienne en fin de journée, fort contraste lumineux.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les maîtres de l'ombre et de la lumière", "1.3"));
children.push(bodyPar(
  "Le clair-obscur n'est pas une invention récente : plusieurs grands peintres de l'histoire de l'art l'ont " +
  "utilisé de façon spectaculaire pour donner du drame et de la profondeur à leurs œuvres.",
));
children.push(calloutBox(
  "OBSERVER — Rembrandt et le Caravage",
  [
    "Rembrandt (peintre néerlandais) est connu pour ses portraits où une lumière douce et concentrée fait " +
    "émerger un visage d'un fond presque entièrement sombre.",
    "Le Caravage (peintre italien) a poussé le contraste encore plus loin, avec des zones de lumière très " +
    "vives opposées à des ombres presque noires, donnant un effet dramatique et théâtral.",
    "Observer ces deux approches aide à comprendre qu'il existe plusieurs façons d'utiliser le clair-obscur, " +
    "selon l'effet recherché.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C01-02",
  "Exemple analysé — deux approches du clair-obscur",
  "Deux portraits stylisés côte à côte (inspirés du principe du clair-obscur, sans reproduire une œuvre " +
  "précise protégée) : l'un avec un contraste doux façon Rembrandt, l'autre avec un contraste marqué façon " +
  "Caravage.",
  "Deux artistes peuvent utiliser le même principe (le clair-obscur) de façons très différentes.",
  "Donner un exemple visuel comparatif des deux approches présentées dans le texte.",
  "Illustration demi-page, deux portraits stylisés comparés, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La technique de l'ombrage", "1.4"));
children.push(bodyPar(
  "Pour donner du volume à un dessin, il faut apprendre à organiser les nuances de gris de façon progressive " +
  "— c'est ce qu'on appelle une gamme de valeurs.",
));
children.push(calloutBox(
  "TECHNIQUE — Construire une gamme de valeurs",
  [
    "1. Trace une bande divisée en 5 ou 6 cases égales.",
    "2. Laisse la première case blanche (aucune pression du crayon).",
    "3. Remplis progressivement chaque case suivante avec une pression plus forte, jusqu'au noir presque " +
    "complet dans la dernière case.",
    "4. Utilise ensuite cette gamme comme référence pour ombrer une forme simple (une sphère, un cube).",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : pour un dégradé bien progressif, travaille par petits mouvements circulaires plutôt " +
  "que par traits droits. Erreur fréquente à éviter : passer trop vite du blanc au noir, sans nuances " +
  "intermédiaires — le volume paraît alors artificiel et dur.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C01-03",
  "Démonstration technique — gamme de valeurs et volume",
  "Une planche montrant une gamme de valeurs en 6 cases (du blanc au noir), suivie d'une sphère ombrée " +
  "utilisant ces mêmes valeurs pour créer une impression de volume.",
  "Une gamme de valeurs organisée permet de créer un volume convaincant.",
  "Montrer concrètement le lien entre la gamme de valeurs et l'ombrage d'une forme.",
  "Illustration demi-page, planche pédagogique claire, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Lire une photographie ancienne en noir et blanc", "1.5"));
children.push(bodyPar(
  "La photographie en noir et blanc — en particulier les photos anciennes ou familiales — est un excellent " +
  "outil pour observer le clair-obscur dans la réalité, puisqu'elle ne montre que des nuances de gris, sans " +
  "couleur pour distraire le regard.",
));
children.push(calloutBox(
  "TECHNIQUE — Analyser une photographie ancienne",
  [
    "Repère d'abord la zone la plus claire et la zone la plus sombre de la photo.",
    "Observe comment la lumière semble venir d'une direction précise.",
    "Remarque les nuances intermédiaires qui donnent du volume aux visages ou aux objets.",
    "Si possible, apporte une photo de famille ancienne en noir et blanc pour cette analyse — sinon, une " +
    "photo trouvée dans un livre ou décrite par l'enseignant convient aussi.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La lumière et l'ombre dans notre quotidien", "1.6"));
children.push(bodyPar(
  "Le clair-obscur n'est pas réservé aux musées : il est partout dans le quotidien haïtien — sous l'auvent " +
  "d'un marché, à travers les lattes d'une varangue, ou dans la lumière rasante du matin sur un mur de " +
  "quartier.",
));
children.push(calloutBox(
  "PATRIMOINE — Observer la lumière autour de soi [CHOIX ÉDITORIAL]",
  [
    "Un étal de marché à l'ombre d'une bâche, avec la lumière vive du dehors qui découpe des zones nettes.",
    "Les lattes d'une varangue qui projettent des bandes d'ombre régulières sur le sol.",
    "Le contraste entre l'intérieur sombre d'une salle de classe et la lumière vive de la cour, vue depuis " +
    "une fenêtre.",
    "Ces situations quotidiennes ne sont pas mentionnées telles quelles dans le programme officiel : elles " +
    "sont proposées ici comme exemples pour ancrer le clair-obscur dans l'environnement haïtien de l'élève.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, "3E4F3B",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C01-04",
  "Contextualisation haïtienne — la lumière du marché",
  "Une scène de marché haïtien crédible avec un étal à l'ombre d'une bâche et une forte lumière à " +
  "l'extérieur, créant un contraste net de clair-obscur.",
  "Le clair-obscur s'observe dans des scènes haïtiennes ordinaires, pas seulement dans les musées.",
  "Ancrer visuellement le lien entre la notion technique et le quotidien haïtien.",
  "Illustration demi-page, scène de marché haïtien, fort contraste lumineux, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ombrer pour donner du volume"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Construire une gamme de valeurs, puis l'utiliser pour ombrer une forme simple et lui donner du volume." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier, crayon à papier (idéalement de plusieurs duretés si disponible), et éventuellement un fusain. Alternative : un seul crayon standard suffit, en variant la pression appliquée." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis une forme géométrique simple (sphère, cube ou cylindre) et imagine une source de lumière venant d'un côté précis." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Construis d'abord ta gamme de valeurs en 5 ou 6 cases (section 1.4)."));
children.push(numberedPar("2. Dessine légèrement le contour de ta forme choisie."));
children.push(numberedPar("3. Identifie la zone la plus claire (proche de la lumière) et la zone la plus sombre (opposée à la lumière)."));
children.push(numberedPar("4. Ombre progressivement ta forme en utilisant les nuances de ta gamme de valeurs."));
children.push(numberedPar("5. Analyse une photographie ancienne en noir et blanc (section 1.5) et note tes observations."));
children.push(spacer(120));
children.push(bodyPar("FICHE D'ANALYSE DE LA PHOTOGRAPHIE — À compléter :", { bold: true }));
children.push(threeColTable(
  ["Élément observé", "Ce que je remarque", "Mon interprétation"],
  [
    ["Zone la plus claire", "", ""],
    ["Zone la plus sombre", "", ""],
    ["Direction de la lumière", "", ""],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(160));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une forme dessinée qui donne une réelle impression de volume grâce à l'ombrage, et une fiche d'analyse de " +
  "photographie complétée avec des observations pertinentes.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La gamme de valeurs comporte au moins 5 nuances progressives et lisibles."));
children.push(bulletPar("La forme ombrée donne une impression de volume reconnaissable."));
children.push(bulletPar("La fiche d'analyse identifie clairement une zone claire, une zone sombre et une direction de lumière."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier sans risque",
  [
    "Le crayon et le fusain s'utilisent sans danger particulier ; rester prudent uniquement avec la pointe " +
    "lors des déplacements.",
    "Aucun matériel coûteux ou dangereux n'est nécessaire pour cette activité.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C01-05",
  "Espace de production — ma forme ombrée",
  "Un cadre vide, format portrait, prévu pour que l'élève y dessine directement sa gamme de valeurs et sa " +
  "forme ombrée dans le manuel.",
  "Offrir un espace direct de production pour ancrer la pratique de l'ombrage dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, sans autre décoration, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Montre ta forme ombrée à un camarade. Peut-il deviner d'où vient la lumière, rien qu'en regardant tes " +
  "nuances ? Discutez ensemble de ce qui rend un ombrage convaincant ou, au contraire, plat et peu réaliste.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Le clair-obscur est le contraste marqué entre les zones claires et les zones sombres d'une image.",
    "Une gamme de valeurs organise les nuances de gris du blanc au noir, de façon progressive.",
    "L'ombrage utilise ces valeurs pour créer une impression de volume sur un dessin plat.",
    "Rembrandt et le Caravage ont utilisé le clair-obscur de façons différentes : douce et concentrée pour " +
    "l'un, marquée et théâtrale pour l'autre.",
    "La photographie ancienne en noir et blanc est un bon outil pour observer le clair-obscur dans la " +
    "réalité.",
    "Le clair-obscur s'observe aussi dans des scènes haïtiennes du quotidien, pas seulement dans l'art " +
    "classique.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer ce qu'est le clair-obscur.",
    "☐ Construire une gamme de valeurs progressive.",
    "☐ Ombrer une forme simple pour lui donner du volume.",
    "☐ Comparer les approches de Rembrandt et du Caravage.",
    "☐ Analyser une photographie ancienne en noir et blanc.",
    "☐ Repérer le clair-obscur dans une scène haïtienne du quotidien.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : clair-obscur, nuance de gris, gamme de valeurs, ombrage, volume dessiné.",
    "Vocabulaire clé à maîtriser : clair-obscur, gamme de valeurs, ombrage.",
    "Avant l'évaluation, vérifie que tu peux : construire une gamme de valeurs en au moins 5 nuances ; " +
    "expliquer la différence d'approche entre Rembrandt et le Caravage ; citer un exemple haïtien de " +
    "clair-obscur observé dans ton quotidien.",
    "Question rapide de vérification : pourquoi une gamme de valeurs doit-elle comporter des nuances " +
    "progressives, et pas seulement du blanc et du noir ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "clair-obscur · nuance de gris · gamme de valeurs · ombrage · volume.",
  { italics: true },
));
children.push(numberedPar("1. Le contraste marqué entre zones claires et zones sombres s'appelle le ......................"));
children.push(numberedPar("2. Un degré d'intensité entre le blanc et le noir est une ......................"));
children.push(numberedPar("3. Une suite organisée de nuances, du plus clair au plus foncé, forme une ......................"));
children.push(numberedPar("4. La technique qui utilise les valeurs pour suggérer la lumière s'appelle l'......................"));
children.push(numberedPar("5. L'impression de profondeur donnée à un dessin plat s'appelle le ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(bodyPar(
  "Observe une photographie (ancienne, en noir et blanc, ou une image imprimée en niveaux de gris) et réponds " +
  "aux questions suivantes.",
  { italics: true },
));
children.push(numberedPar("1. Où se trouve la zone la plus claire de l'image ?"));
children.push(numberedPar("2. Où se trouve la zone la plus sombre de l'image ?"));
children.push(numberedPar("3. D'où semble venir la lumière ?"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Dans le cadre ci-dessous, construis une gamme de valeurs en 5 cases, du blanc au noir."));
children.push(threeColTable(
  ["Case 1 (blanc)", "Case 2-4 (progression)", "Case 5 (noir)"],
  [["", "", ""]],
  [2800, 3400, 2800],
));
children.push(spacer(160));
children.push(numberedPar("2. Explique en une phrase pourquoi il est utile de commencer par une gamme de valeurs avant d'ombrer un dessin."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare l'approche de Rembrandt et celle du Caravage : laquelle préfères-tu, et pourquoi ?"));
children.push(numberedPar("2. Un camarade ombre son dessin uniquement avec du noir et du blanc, sans nuance intermédiaire. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("3. Décris une scène de ton quotidien (autre que celles présentées dans ce chapitre) où tu pourrais observer un clair-obscur intéressant."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis d'approfondir la notion de lumière déjà entrevue en 7e AF : comprendre et maîtriser " +
  "le contraste clair-obscur, construire une gamme de valeurs progressive, ombrer une forme pour lui donner " +
  "du volume, observer le travail de deux grands maîtres (Rembrandt et le Caravage), analyser une " +
  "photographie ancienne en noir et blanc, et reconnaître le clair-obscur dans des scènes haïtiennes du " +
  "quotidien. Cette maîtrise du volume dessiné prépare les découvertes suivantes de l'année.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "clair-obscur · nuance de gris · gamme de valeurs · ombrage · volume dessiné · Rembrandt · le Caravage.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C01-06",
  "Synthèse — Lumière, ombre et volume dessiné",
  "Une carte mentale simple centrée sur « Clair-obscur », avec des branches vers : gamme de valeurs, " +
  "ombrage, Rembrandt/Caravage, photographie ancienne, contextualisation haïtienne.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 1, "Manuel_EEA_8AF_Chapitre1.docx");
