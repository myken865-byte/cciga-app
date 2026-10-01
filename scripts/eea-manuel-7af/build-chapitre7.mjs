// Manuel d'EEA 7e AF — Chapitre 7 : Créer et écouter avec le numérique
// (champ officiel : Musique, Axes 4-5 — MAO + Appréciation musicale,
// regroupés [CHOIX ÉDITORIAL] en un seul chapitre). DERNIER CHAPITRE DU
// CORPUS PÉDAGOGIQUE EEA 7e AF.
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), section B-Musique, unites
//   d'apprentissage 4 (MAO) et 5 (Appreciation musicale), p.52, 57-58, 63/63.
// Page relue pendant la Phase 0 (2026-08-22). Competences officielles
// ciblees [OFFICIEL - SOURCE MENFP VERIFIEE, p.63] pour l'unite 5 :
// C3, C4, C5, C8. L'unite 4 (MAO) n'a pas de tableau individuel capture en
// Phase 0 (page 62 non relue en detail - voir
// 00_PHASE0/01_RAPPORT_RECHERCHE_EEA_7_8_9_AF.md, section 5) ; son contenu
// 7e AF est neanmoins connu avec certitude via le tableau de progression
// annuelle (p.56-58), utilise ici comme source principale pour cette partie.
// Retenues ensemble pour ce chapitre : C2, C3, C4, C5, C6, C7, C8.
//
// Contenu officiel repris fidelement, niveau 7e AF specifiquement :
//   MAO (p.57) : familiarisation a au moins un logiciel pour faire de la
//   musique ; edition de partitions avec l'assistance d'un logiciel de
//   creation musicale (exemple cite explicitement : Musescore) ; creation
//   de sons de qualite, en ajustant le volume, le panoramique, et en
//   utilisant l'effet de balayage.
//   Appreciation musicale (p.58, 63) : ecoute et appreciation de grands
//   classiques universels ; situer les oeuvres ecoutees dans le temps et
//   l'espace ; les analyser et les comparer.
//
// FIDELITE A LA PROGRESSION : les "musiques savantes haitiennes" comme
// objet d'ecoute specifique sont reservees a la 8e AF selon la
// reconstruction Phase 0 (00_PHASE0/04_MATRICE_EEA_8AF.md) - ce chapitre
// de 7e AF reste centre sur les "grands classiques universels", conforme au
// texte source et a la note explicite de la table des matieres verrouillee
// ("lien patrimoine haitien a developper progressivement, approfondi en
// 8e/9e AF").
//
// Adaptations d'accessibilite : toute activite numerique (MAO) prevoit une
// alternative papier complete et equivalente, conformement a la regle
// d'accessibilite du prompt d'execution.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE,
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE,
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
  7,
  "Créer et écouter avec le numérique",
  "Pour terminer cette première année d'EEA, deux dernières compétences t'attendent : utiliser l'ordinateur " +
  "pour créer de la musique, et apprendre à vraiment écouter une œuvre — pas seulement l'entendre.",
  [
    "Se familiariser avec un logiciel simple de création musicale.",
    "Créer un son de qualité en ajustant volume et effets simples.",
    "Écouter et apprécier de grandes œuvres classiques universelles.",
    "Situer une œuvre écoutée dans le temps et dans l'espace.",
    "Analyser et comparer deux œuvres musicales différentes.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école de Port-au-Prince équipée d'une salle informatique, une classe de 7e " +
  "AF découvre un logiciel qui permet d'écrire de la musique directement à l'écran. Dans une autre école, sans " +
  "ordinateur, une classe travaille les mêmes notions entièrement sur papier. Ce chapitre s'adresse aux deux.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("MAO (musique assistée par ordinateur) — utilisation de l'informatique pour composer, éditer ou produire de la musique."));
children.push(bulletPar("Logiciel de notation musicale — programme qui permet d'écrire une partition à l'écran."));
children.push(bulletPar("Écoute active — le fait d'écouter une œuvre en cherchant à comprendre sa construction, pas seulement à l'apprécier passivement."));
children.push(bulletPar("Classique universel — œuvre musicale reconnue mondialement, souvent ancienne, qui a traversé le temps."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Se familiariser avec un logiciel de musique", "7.1"));
children.push(bodyPar(
  "Un logiciel de notation musicale permet d'écrire une partition directement à l'écran, de l'écouter, et de " +
  "la modifier facilement. Le programme officiel cite notamment un logiciel accessible et gratuit : " +
  "Musescore.",
));
children.push(calloutBox(
  "NUMÉRIQUE — Utiliser un logiciel de musique, avec ou sans ordinateur",
  [
    "Si un ordinateur est disponible : ouvre un logiciel de notation musicale (par exemple Musescore) et " +
    "essaie d'y placer quelques notes simples sur une portée.",
    "Si aucun ordinateur n'est disponible : reprends une portée papier (comme celle du Chapitre 5) et " +
    "réalise le même travail à la main — le raisonnement musical reste identique.",
    "Dans les deux cas, l'objectif est de structurer une courte suite de notes de façon claire et lisible.",
  ],
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE, "1F2A33",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C07-01",
  "Ouverture — Créer de la musique, à l'écran ou sur papier",
  "Deux scènes côte à côte : une salle informatique haïtienne où des élèves de 7e AF utilisent un logiciel de " +
  "notation musicale, et une salle de classe sans ordinateur où d'autres élèves réalisent le même travail sur " +
  "une portée papier.",
  "Créer de la musique assistée par ordinateur reste possible, avec ou sans équipement numérique.",
  "Ouvrir le chapitre sur les deux scénarios possibles, garantissant l'égalité d'accès au contenu.",
  "Illustration pleine largeur, deux scènes de classe haïtiennes comparées, ambiance studieuse.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Créer un son de qualité", "7.2"));
children.push(bodyPar(
  "Créer de la musique assistée par ordinateur, ce n'est pas seulement écrire des notes : c'est aussi ajuster " +
  "certains réglages simples pour obtenir un son agréable et équilibré.",
));
children.push(calloutBox(
  "TECHNIQUE — Trois réglages simples à connaître",
  [
    "Le volume : à quel point un son est fort ou doux — un volume trop élevé peut « écraser » les autres " +
    "sons d'un morceau.",
    "Le panoramique : de quel côté (gauche, droite, ou centre) un son semble venir à l'écoute.",
    "L'effet de balayage : un effet qui fait varier progressivement un son, souvent utilisé pour des " +
    "transitions douces entre deux parties d'un morceau.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Sans ordinateur, ces notions peuvent se comprendre autrement : imagine le volume comme la force de ta " +
  "voix, le panoramique comme la direction d'où vient un son dans une pièce, et l'effet de balayage comme un " +
  "son qui s'approche ou s'éloigne progressivement.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C07-02",
  "Exemple analysé — les réglages d'un logiciel de musique",
  "Une capture d'écran stylisée (non liée à une marque précise) d'un logiciel de notation musicale simplifié, " +
  "avec trois curseurs annotés : volume, panoramique, effet de balayage.",
  "Visualiser concrètement les trois réglages présentés dans le texte.",
  "Donner un exemple visuel de référence pour les réglages sonores de base.",
  "Illustration demi-page, interface stylisée simple, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Écouter et situer une œuvre", "7.3"));
children.push(bodyPar(
  "Le programme officiel invite à découvrir de grands classiques universels — des œuvres musicales connues " +
  "dans le monde entier, souvent anciennes, mais toujours écoutées aujourd'hui. Écouter une œuvre " +
  "attentivement, c'est chercher à savoir : à quelle époque a-t-elle été composée ? Dans quel contexte ?",
));
children.push(calloutBox(
  "ÉCOUTER — Situer une œuvre dans le temps et l'espace",
  [
    "Avant d'écouter, note ce que tu sais déjà de l'œuvre (titre, compositeur, si tu les connais).",
    "Pendant l'écoute, essaie de repérer : le tempo (rapide ou lent), l'ambiance (joyeuse, calme, solennelle), " +
    "les instruments que tu reconnais.",
    "Après l'écoute, cherche à situer l'œuvre : à quelle époque a-t-elle probablement été composée ? Pourquoi " +
    "penses-tu cela ?",
    "Des compositeurs très connus dans le monde entier, comme Wolfgang Amadeus Mozart ou Ludwig van " +
    "Beethoven, sont des exemples fréquents de « grands classiques universels » à découvrir.",
  ],
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE, "5A2A1E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Analyser et comparer : devenir un auditeur critique", "7.4"));
children.push(bodyPar(
  "Analyser une œuvre, c'est aller plus loin que la simple écoute : c'est comparer, questionner, et commencer " +
  "à développer un jugement personnel sur ce que l'on entend.",
));
children.push(calloutBox(
  "OBSERVER — Comparer deux œuvres écoutées",
  [
    "Les deux œuvres ont-elles le même tempo, la même ambiance ?",
    "Utilisent-elles des instruments semblables ou très différents ?",
    "Laquelle préfères-tu, et surtout : pourquoi ? (Cette dernière question est la plus importante — elle " +
    "développe ton propre jugement esthétique.)",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C07-03",
  "Démonstration technique — remplir une fiche d'écoute",
  "Une planche montrant un élève écoutant attentivement (casque ou simplement attentif en classe) avec, à " +
  "côté, un exemple de fiche d'écoute partiellement complétée (tempo, ambiance, instruments repérés).",
  "Une fiche d'écoute aide à structurer son analyse d'une œuvre musicale.",
  "Montrer concrètement la démarche d'écoute active et de remplissage d'une fiche d'écoute.",
  "Illustration demi-page, scène de classe haïtienne, ton concentré et studieux.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Créer et écouter"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Réaliser une courte édition musicale simple (numérique ou papier) et compléter une fiche d'écoute sur une œuvre classique universelle." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Option numérique : un ordinateur avec un logiciel de notation musicale (par exemple Musescore). Option papier : une portée vierge et un crayon. Pour l'écoute : un enregistrement si disponible, ou une description faite par l'enseignant si aucun matériel audio n'est accessible." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Réalise les deux parties de l'atelier : la création (section 7.1-7.2) et l'écoute (section 7.3-7.4)." }]));
children.push(bodyPar("ÉTAPES — PARTIE CRÉATION :", { bold: true }));
children.push(numberedPar("1. Choisis ton support (logiciel ou papier)."));
children.push(numberedPar("2. Place une courte suite de 5 à 8 notes sur ta portée, en réutilisant ce que tu as appris au Chapitre 5."));
children.push(numberedPar("3. Si tu utilises un logiciel, essaie d'ajuster le volume d'au moins une note."));
children.push(bodyPar("ÉTAPES — PARTIE ÉCOUTE :", { bold: true }));
children.push(numberedPar("4. Écoute (ou fais décrire par ton enseignant) une œuvre classique universelle."));
children.push(numberedPar("5. Complète une fiche d'écoute : tempo, ambiance, instruments repérés, époque estimée."));
children.push(numberedPar("6. Note ton appréciation personnelle et explique-la en une phrase."));
children.push(spacer(120));
children.push(bodyPar("FICHE D'ÉCOUTE — À compléter :", { bold: true }));
children.push(threeColTable(
  ["Élément observé", "Ce que j'entends", "Mon appréciation"],
  [
    ["Tempo (rapide/lent)", "", ""],
    ["Ambiance générale", "", ""],
    ["Instruments repérés", "", ""],
    ["Époque estimée", "", ""],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(160));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une courte suite de notes créée (numérique ou papier) et une fiche d'écoute complétée, avec une " +
  "appréciation personnelle justifiée.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La suite de notes créée est lisible et structurée."));
children.push(bulletPar("La fiche d'écoute est complétée avec des observations pertinentes."));
children.push(bulletPar("L'appréciation personnelle est justifiée, même brièvement."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier numérique sans risque",
  [
    "Utiliser un ordinateur ou un casque audio scolaire ne présente pas de danger particulier ; veiller " +
    "simplement à ne pas régler le volume trop fort pour préserver son audition.",
    "Aucune activité de ce chapitre n'exige de connexion Internet non supervisée.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C07-04",
  "Espace de production — ma courte création musicale",
  "Une portée vierge avec clé de Sol, prévue pour que l'élève y place sa courte suite de notes (version " +
  "papier de l'atelier).",
  "Offrir un espace direct de production pour la partie création de l'atelier, accessible sans ordinateur.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Portée simple avec clé de Sol, bordure fine ocre, format paysage demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Partage ta fiche d'écoute avec un camarade qui a écouté la même œuvre. Avez-vous remarqué les mêmes " +
  "choses ? Vos appréciations personnelles sont-elles semblables ou différentes ? Une œuvre peut être " +
  "appréciée de plusieurs façons — c'est normal et même enrichissant.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La musique assistée par ordinateur (MAO) permet de créer, éditer et produire de la musique — mais les " +
    "mêmes notions s'apprennent aussi bien sur papier.",
    "Le volume, le panoramique et l'effet de balayage sont trois réglages simples pour améliorer un son.",
    "Un « grand classique universel » est une œuvre musicale reconnue mondialement, souvent ancienne.",
    "Écouter activement, c'est repérer le tempo, l'ambiance et les instruments, puis situer l'œuvre dans le " +
    "temps.",
    "Analyser une œuvre, c'est comparer, questionner, et développer son propre jugement esthétique.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Me familiariser avec un logiciel de notation musicale, ou réaliser l'équivalent sur papier.",
    "☐ Expliquer ce que sont le volume, le panoramique et l'effet de balayage.",
    "☐ Écouter activement une œuvre et repérer son tempo et son ambiance.",
    "☐ Situer une œuvre dans le temps, même approximativement.",
    "☐ Comparer deux œuvres et justifier ma préférence.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : MAO, logiciel de notation musicale, écoute active, classique universel.",
    "Vocabulaire clé à maîtriser : volume, panoramique, effet de balayage, écoute active.",
    "Avant l'évaluation, vérifie que tu peux : citer un logiciel de notation musicale ; expliquer les trois " +
    "réglages sonores de base ; décrire les étapes d'une écoute active.",
    "Question rapide de vérification : que dois-tu observer en premier lorsque tu écoutes activement une " +
    "œuvre musicale ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(7));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : MAO · " +
  "logiciel de notation · écoute active · classique universel · panoramique.",
  { italics: true },
));
children.push(numberedPar("1. L'utilisation de l'informatique pour créer de la musique s'appelle la ......................"));
children.push(numberedPar("2. Un programme qui permet d'écrire une partition à l'écran est un ......................"));
children.push(numberedPar("3. Le réglage qui indique de quel côté semble venir un son s'appelle le ......................"));
children.push(numberedPar("4. Écouter une œuvre en cherchant à comprendre sa construction, c'est pratiquer l'......................"));
children.push(numberedPar("5. Une œuvre musicale reconnue mondialement, souvent ancienne, est un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Cite les trois réglages sonores de base présentés dans ce chapitre."));
children.push(numberedPar("2. Cite deux éléments à observer pendant une écoute active."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Complète une courte fiche d'écoute (comme celle de l'atelier) pour une œuvre musicale de ton choix, même si tu ne l'écoutes pas maintenant — imagine ses caractéristiques probables à partir de son titre ou de son genre."));
children.push(numberedPar("2. Si tu n'as pas d'ordinateur disponible, comment peux-tu tout de même pratiquer la création musicale de ce chapitre ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Compare l'écoute d'une œuvre calme et lente à celle d'une œuvre rapide et énergique : quelles différences observes-tu dans ta propre réaction ?"));
children.push(numberedPar("2. Un camarade dit qu'il n'aime pas la musique classique parce qu'elle est « trop ancienne ». Que pourrais-tu lui répondre, en t'appuyant sur ce que tu as appris ce chapitre ?"));
children.push(numberedPar("3. En repensant à toute cette première année d'EEA (dessin, sculpture, patrimoine, musique), quelle activité as-tu préférée, et pourquoi ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce dernier chapitre de la 7e AF a permis de découvrir la musique assistée par ordinateur, avec une " +
  "alternative papier pour chaque activité, d'apprendre à ajuster des réglages sonores simples, et de " +
  "développer une véritable écoute active en situant et en analysant de grands classiques universels. Il " +
  "clôt une première année riche en découvertes : de l'observation du point et de la ligne jusqu'à l'écoute " +
  "critique d'une œuvre musicale, en passant par le volume, le patrimoine haïtien et la pratique " +
  "instrumentale.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "MAO · logiciel de notation musicale · volume · panoramique · écoute active · classique universel.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C07-05",
  "Patrimoine — vers la musique haïtienne",
  "Une scène évoquant l'ouverture vers d'autres découvertes musicales à venir (par exemple un élève " +
  "regardant vers un instrument traditionnel haïtien en arrière-plan), sans détailler de contenu réservé aux " +
  "années suivantes.",
  "Annoncer, sans l'enseigner encore, que le patrimoine musical haïtien sera approfondi dans les années à venir.",
  "Illustration de transition, ouvrant vers la suite du parcours sans anticiper de contenu 8e/9e AF.",
  "Illustration demi-page, cohérente avec la charte EEA, ton d'ouverture positive.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C07-06",
  "Synthèse — Créer et écouter avec le numérique",
  "Une carte mentale simple centrée sur « Créer et écouter », avec des branches vers : MAO, réglages sonores, " +
  "écoute active, classiques universels, analyse et comparaison.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 61, "Manuel_EEA_7AF_Chapitre7.docx");
