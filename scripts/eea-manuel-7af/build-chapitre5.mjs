// Manuel d'EEA 7e AF — Chapitre 5 : Comprendre et lire la musique
// (champ officiel : Musique, Axes 1-2 — Théorie musicale + Solfège,
// regroupés [CHOIX ÉDITORIAL] en un seul chapitre).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), section B-Musique, unites
//   d'apprentissage 1 (Theorie musicale) et 2 (Solfege), p.52-53, 56, 59-61/63.
// Page relue pendant la Phase 0 (2026-08-22). Competences officielles
// ciblees pour ces deux unites [OFFICIEL - SOURCE MENFP VERIFIEE, p.59-60] :
// C2, C3 (unite 1) et C2, C3, C4, C6 (unite 2) - retenues ensemble : C2, C3,
// C4, C6.
//
// PREMIER CHAPITRE DE MUSIQUE DE LA COLLECTION : contrairement aux
// Chapitres 1-4 (arts plastiques et visuels), ce chapitre ouvre la Partie
// II du manuel (Musique) et introduit un vocabulaire et une pedagogie
// entierement nouveaux - conforme au gabarit EEA qui prevoit une section
// "Ecoute / analyse musicale" specifique aux chapitres de musique.
//
// Contenu officiel repris fidelement, niveau 7e AF specifiquement
// (progression annuelle documentee p.56-58, reconstruction Phase 0) :
// signes de notation musicale (intonation, duree) ; gamme diatonique
// majeure et ses degres ; intervalles ; lecture des notes en CLE DE SOL
// (pas clef de Fa, reservee a la 8e AF) ; lecture rythmique sur les MESURES
// SIMPLES (pas mesures composees, reservees a la 8e AF) ; le chant et
// l'intonation ; solfier = combiner lecture des notes + lecture rythmique +
// chant + intonation.
//
// FIDELITE A LA PROGRESSION : la cle de Fa, les mesures composees, la
// gamme diatonique mineure et les gammes relatives sont explicitement
// reserves a la 8e AF selon la reconstruction Phase 0
// (00_PHASE0/04_MATRICE_EEA_8AF.md) et ne sont PAS enseignes dans ce
// chapitre.
//
// PATRIMOINE : le Prompt Maitre et la table des matieres verrouillee
// signalent explicitement qu'aucune oeuvre musicale haitienne n'est nommee
// par la source a ce niveau precis - toute reference a une "melodie du
// terroir" reste generique [CHOIX EDITORIAL], sans inventer de titre,
// compositeur ou date non verifies.
//
// Adaptations de securite : aucune activite dangereuse ; pratique vocale et
// exercices rythmiques frappes des mains, accessibles sans materiel.
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
  5,
  "Comprendre et lire la musique",
  "Jusqu'ici, tu as observé, dessiné, sculpté et raconté avec des images. La musique a, elle aussi, son " +
  "propre langage visuel : des signes qui, une fois lus, se transforment en sons. Ce chapitre t'apprend à " +
  "lire ce langage pour la première fois.",
  [
    "Reconnaître les signes de base de la notation musicale.",
    "Identifier les notes de la gamme diatonique majeure.",
    "Lire des notes placées en clé de Sol.",
    "Reconnaître un rythme simple et le chanter avec justesse.",
    "Combiner lecture des notes, rythme, chant et intonation : solfier une courte mélodie.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école des Cayes, une classe de 7e AF découvre pour la première fois une " +
  "feuille couverte de petits signes noirs alignés sur cinq lignes. « On dirait un code secret », dit un " +
  "élève. Sa professeure sourit : « C'est exactement ça — et aujourd'hui, tu vas apprendre à le déchiffrer. »",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Portée — les cinq lignes horizontales sur lesquelles s'écrit la musique."));
children.push(bulletPar("Note — un signe qui représente un son précis, placé sur la portée."));
children.push(bulletPar("Clé de Sol — un signe placé au début de la portée qui indique comment lire la hauteur des notes."));
children.push(bulletPar("Gamme — une suite de notes rangées du grave à l'aigu selon un ordre précis."));
children.push(bulletPar("Rythme — l'organisation des notes dans le temps, selon leur durée."));
children.push(bulletPar("Solfier — chanter une partition en combinant la lecture des notes, le rythme et l'intonation."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le langage de la musique : la notation", "5.1"));
children.push(bodyPar(
  "Comme le dessin utilise des points et des lignes, la musique utilise des signes précis pour représenter " +
  "les sons : c'est la notation musicale. Deux familles de signes sont essentielles : les signes qui " +
  "indiquent la hauteur d'un son (intonation) et les signes qui indiquent sa durée.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Les bases de la notation musicale",
  [
    "La portée : cinq lignes horizontales sur lesquelles et entre lesquelles s'écrivent les notes.",
    "La clé de Sol : placée au début de la portée, elle indique comment lire la hauteur de chaque note.",
    "Les signes de durée : chaque note a une forme différente selon sa durée (ronde, blanche, noire, croche).",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C05-01",
  "Ouverture — Découvrir une partition",
  "Une salle de classe haïtienne crédible (Les Cayes ou similaire) où une enseignante montre une partition " +
  "simple à des élèves de 7e AF curieux et attentifs, avec la portée et la clé de Sol bien visibles.",
  "La musique a son propre langage visuel, qui s'apprend comme on apprend à lire un texte.",
  "Ouvrir le chapitre sur une scène concrète qui ancre la découverte de la notation musicale.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance curieuse et bienveillante.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La gamme diatonique majeure", "5.2"));
children.push(bodyPar(
  "Une gamme est une suite de notes rangées dans l'ordre, du grave à l'aigu. La gamme diatonique majeure, " +
  "que tu vas apprendre cette année, est composée de sept notes qui se répètent ensuite à l'infini, de plus " +
  "en plus aigu ou de plus en plus grave.",
));
children.push(threeColTable(
  ["Degré", "Nom de la note", "Remarque"],
  [
    ["1", "Do", "Note de départ de la gamme"],
    ["2", "Ré", ""],
    ["3", "Mi", ""],
    ["4", "Fa", ""],
    ["5", "Sol", "Donne son nom à la clé utilisée cette année"],
    ["6", "La", ""],
    ["7", "Si", ""],
    ["8 (= 1)", "Do", "La gamme recommence, une octave plus haut"],
  ],
  [2200, 2800, 4000],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Lire les notes en clé de Sol", "5.3"));
children.push(bodyPar(
  "La clé de Sol, placée au début de la portée, permet de savoir exactement quelle note correspond à quelle " +
  "ligne ou quel espace de la portée. C'est la clé la plus utilisée pour commencer à lire la musique.",
));
children.push(calloutBox(
  "TECHNIQUE — S'entraîner à lire en clé de Sol",
  [
    "1. Repère la clé de Sol au début de la portée.",
    "2. Identifie si la note est sur une ligne ou dans un espace.",
    "3. Compte les lignes ou les espaces à partir d'un repère connu pour trouver le nom de la note.",
    "4. Chante ou dis à voix haute le nom de chaque note en la pointant du doigt.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : entraîne-toi d'abord lentement, note par note, avant de chercher à lire vite. Erreur " +
  "fréquente à éviter : deviner une note au lieu de vérifier précisément sa position sur la portée.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C05-02",
  "Exemple analysé — la portée en clé de Sol",
  "Une portée annotée avec la clé de Sol et les sept notes de la gamme (Do à Si) clairement identifiées, " +
  "chacune reliée à son nom par une flèche légère.",
  "Visualiser précisément la position de chaque note de la gamme sur la portée en clé de Sol.",
  "Donner un exemple visuel de référence pour la lecture des notes en clé de Sol.",
  "Illustration demi-page, portée musicale claire et annotée, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le rythme et les mesures simples", "5.4"));
children.push(bodyPar(
  "Une note n'a pas seulement une hauteur : elle a aussi une durée. Certaines notes durent plus longtemps que " +
  "d'autres. Ces durées s'organisent en mesures — des groupes de temps réguliers qui structurent le rythme " +
  "d'un morceau.",
));
children.push(twoColTable(
  "Nom de la note", "Durée relative",
  [
    ["Ronde", "La plus longue (dure 4 temps)"],
    ["Blanche", "Dure 2 temps"],
    ["Noire", "Dure 1 temps"],
    ["Croche", "Dure une demi-temps"],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "En 7e AF, tu travailles sur les mesures simples, où les temps se divisent naturellement en deux. Frapper " +
  "dans ses mains en suivant ces durées est un excellent exercice pour bien sentir le rythme avant de le lire.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C05-03",
  "Démonstration technique — frapper un rythme simple",
  "Une planche montrant un élève frappant dans ses mains face à une courte ligne rythmique simple (par " +
  "exemple : noire, noire, blanche), avec des symboles représentant chaque frappe.",
  "Le rythme se ressent avec le corps avant de se lire précisément sur la portée.",
  "Montrer concrètement comment traduire une durée musicale en geste rythmique.",
  "Illustration demi-page, planche pédagogique claire, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Solfier : tout assembler", "5.5"));
children.push(bodyPar(
  "Solfier, c'est réunir en même temps la lecture des notes, la lecture rythmique, le chant et l'intonation : " +
  "c'est l'étape où tout ce que tu as appris dans ce chapitre se combine pour donner vie à une mélodie.",
));
children.push(calloutBox(
  "ÉCOUTER — S'entraîner l'oreille",
  [
    "Avant de solfier un morceau inconnu, écoute-le d'abord si possible (chanté par l'enseignant ou un " +
    "camarade).",
    "Essaie de repérer, à l'oreille, si une note monte, descend, ou reste la même que la précédente.",
    "La culture de l'oreille s'entraîne progressivement — ne t'inquiète pas si cela demande de la pratique.",
  ],
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE, "5A2A1E",
));
children.push(spacer(160));
children.push(bodyPar(
  "Les mélodies que tu chanteras en classe pourront s'inspirer de chants du terroir haïtien que ton " +
  "enseignant connaît déjà — une belle façon d'apprendre à lire la musique tout en restant proche de ta " +
  "culture.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ma première lecture chantée"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Lire, frapper le rythme, puis chanter une très courte mélodie simple en solfiant." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Ta voix et tes mains (pour frapper le rythme). Aucun instrument n'est nécessaire pour cette première activité." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Ton enseignant te propose une courte suite de notes simples (par exemple Do-Ré-Mi-Ré-Do) avec un rythme simple (par exemple noire, noire, blanche, noire, blanche)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Lis d'abord les noms des notes à voix haute, sans chanter, lentement."));
children.push(numberedPar("2. Frappe dans tes mains le rythme correspondant, sans encore chanter les notes."));
children.push(numberedPar("3. Combine les deux : chante chaque note avec sa bonne durée (tu solfies)."));
children.push(numberedPar("4. Recommence plusieurs fois en accélérant progressivement, sans perdre en justesse."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "L'élève parvient à chanter la courte mélodie proposée en respectant à la fois les notes et le rythme, " +
  "même lentement.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Les notes chantées correspondent à celles écrites."));
children.push(bulletPar("Le rythme (les durées) est globalement respecté."));
children.push(bulletPar("L'élève peut nommer les notes qu'il vient de chanter."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier vocal sans risque",
  [
    "Chanter ne présente aucun danger ; veiller simplement à ne pas forcer sa voix, surtout dans l'aigu.",
    "Aucun matériel n'est nécessaire pour cette activité vocale et rythmique.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C05-04",
  "Espace de production — ma portée à compléter",
  "Une portée vierge avec la clé de Sol déjà tracée, prévue pour que l'élève y écrive ou colle les notes " +
  "d'une courte mélodie proposée par l'enseignant.",
  "Offrir un espace direct de production pour ancrer la pratique de la notation dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Portée simple avec clé de Sol, bordure fine ocre, format paysage demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Écoute un camarade chanter la mélodie de l'atelier. Reconnais-tu les notes et le rythme sans regarder la " +
  "partition ? Discutez ensemble de ce qui rend une lecture chantée juste ou hésitante.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La notation musicale utilise des signes précis pour représenter la hauteur et la durée des sons.",
    "La gamme diatonique majeure est composée de sept notes : Do, Ré, Mi, Fa, Sol, La, Si.",
    "La clé de Sol permet de lire la hauteur des notes placées sur la portée.",
    "Chaque note a une durée (ronde, blanche, noire, croche) organisée en mesures.",
    "Solfier, c'est combiner lecture des notes, rythme, chant et intonation.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Nommer les sept notes de la gamme diatonique majeure, dans l'ordre.",
    "☐ Reconnaître la clé de Sol sur une portée.",
    "☐ Lire quelques notes simples placées en clé de Sol.",
    "☐ Frapper un rythme simple correspondant à une courte suite de notes.",
    "☐ Solfier une très courte mélodie en combinant notes, rythme et chant.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : portée, note, clé de Sol, gamme diatonique majeure, rythme, mesure, solfier.",
    "Vocabulaire clé à maîtriser : portée, clé de Sol, gamme, ronde/blanche/noire/croche, solfier.",
    "Avant l'évaluation, vérifie que tu peux : citer les sept notes de la gamme dans l'ordre ; lire une note " +
    "simple en clé de Sol ; expliquer ce que signifie « solfier ».",
    "Rappel officiel : un examen de fin de session permet d'évaluer les acquis de solfège [OFFICIEL — SOURCE " +
    "MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : portée · " +
  "clé de Sol · gamme · rythme · solfier.",
  { italics: true },
));
children.push(numberedPar("1. Les cinq lignes sur lesquelles s'écrit la musique forment la ......................"));
children.push(numberedPar("2. Le signe qui indique comment lire la hauteur des notes s'appelle la ......................"));
children.push(numberedPar("3. Une suite de notes rangées du grave à l'aigu s'appelle une ......................"));
children.push(numberedPar("4. L'organisation des notes dans le temps s'appelle le ......................"));
children.push(numberedPar("5. Chanter une partition en combinant notes, rythme et intonation, c'est ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Écris, dans l'ordre, les sept notes de la gamme diatonique majeure."));
children.push(numberedPar("2. Parmi ronde, blanche, noire et croche, laquelle dure le plus longtemps ? Laquelle dure le moins longtemps ?"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Frappe (ou écris le nombre de frappes pour) le rythme suivant : noire, noire, blanche, noire."));
children.push(numberedPar("2. Sur la portée ci-dessous, indique où se trouverait approximativement la note Sol par rapport à la clé de Sol (tu peux écrire une courte explication si tu ne peux pas dessiner)."));
children.push(spacer(160));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Explique pourquoi il est utile de connaître la durée d'une note, et pas seulement sa hauteur, pour bien jouer ou chanter un morceau."));
children.push(numberedPar("2. Un camarade chante juste les notes mais ne respecte pas le rythme. Que lui conseilles-tu pour s'améliorer ?"));
children.push(numberedPar("3. Propose une courte mélodie de 4 notes (en utilisant les notes de la gamme) que tu aimerais essayer de solfier."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir le langage de la notation musicale, d'apprendre les sept notes de la " +
  "gamme diatonique majeure, de lire des notes simples en clé de Sol, de reconnaître et de frapper un rythme " +
  "sur des mesures simples, et de combiner ces éléments pour solfier une courte mélodie. Ce premier chapitre " +
  "de musique pose les bases qui seront approfondies dans les prochains chapitres et les années suivantes.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "portée · note · clé de Sol · gamme diatonique majeure · rythme · mesure simple · solfier.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C05-05",
  "Patrimoine — chanter ensemble",
  "Une scène de classe haïtienne où un groupe d'élèves chante ensemble une courte mélodie simple, sous la " +
  "direction de l'enseignant, dans une ambiance conviviale.",
  "La musique se pratique aussi collectivement, dans une ambiance partagée.",
  "Illustrer la dimension collective et vivante de la pratique musicale en classe.",
  "Illustration demi-page, scène de classe haïtienne, ambiance chaleureuse et musicale.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C05-06",
  "Synthèse — Comprendre et lire la musique",
  "Une carte mentale simple centrée sur « Lire la musique », avec des branches vers : notation, gamme, clé de " +
  "Sol, rythme, solfier.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 41, "Manuel_EEA_7AF_Chapitre5.docx");
