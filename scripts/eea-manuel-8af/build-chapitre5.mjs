// Manuel d'EEA 8e AF — Chapitre 5 : Lire et chanter en clé de Fa
// (champ officiel : Musique, Axes 1-2 — Théorie musicale + Solfège,
// regroupés [CHOIX ÉDITORIAL] en un seul chapitre — même logique que le
// Chapitre 5 de la 7e AF).
//
// PREMIER CHAPITRE DE MUSIQUE DE LA 8e AF : ouvre la Partie II du manuel.
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.54/63 (texte imprime p.53) : "8e annee - Expressions culturelles et
//     enjeux patrimoniaux. Solfege et pratique" ; theorie musicale
//     "(Continuation de la 7e annee)... pouvoir justifier chaque champ
//     correspondant aux formes de la musique classique haitienne." —
//     verifie en direct le 2026-08-23.
//   - p.56/63 : TABLEAU DE PROGRESSION explicitement separe par annee (7e/
//     8e/9e AF) — verifie en direct le 2026-08-23. Colonne 8e AF, solfege :
//     "Lectures des notes (cle de Fa)" ; "Lecture rythmique (les mesures
//     composees)" ; "Le chant et l'intonation" ; "Exercices de solfege".
//     Colonne 8e AF, theorie musicale : "La gamme diatonique mineure" ;
//     "Gammes relatives" ; "Les accords". CE TABLEAU SEPARE LES ANNEES DE
//     FACON EXPLICITE (contrairement au tableau d'unite complete) : statut
//     [OFFICIEL - SOURCE MENFP VERIFIEE] renforce pour clé de Fa/mesures
//     composees/gamme mineure/gammes relatives, sans hedge "ADAPTATION DE
//     LECTURE" necessaire pour l'attribution annee.
//   - p.59-61/63 : tableaux complets des Unites 1 (Theorie musicale) et 2
//     (Solfege), verifies en direct le 2026-08-23. Competences ciblees
//     officielles : Unite 1 = C2, C3 ; Unite 2 = C2, C3, C4, C6 (ce
//     chapitre reprend l'ensemble de l'Unite 2, comme le Chapitre 5 de la
//     7e AF). Savoir-faire cites verbatim : "Lire des notes, c'est a dire
//     l'identification des notes suivant leur degre de hauteur sur la
//     portee (cle de Sol, cle de Fa)." Activite citee verbatim : "Exercices
//     de lecture de notes en cle de Sol et en cle de Fa." ; "Des exercices
//     de rythme sur les mesures simples et les mesures composees." ;
//     "L'eleve bat les mesures librement ou en utilisant le metronome."
//     Evaluation citee verbatim : "Un examen final au cours duquel l'eleve
//     aura a solfier une ou plusieurs pieces de musique fera l'objet
//     d'evaluation finale a la fin de chaque session."
//
// NOTE DE PERIMETRE (transparence, non une omission silencieuse) : la
// colonne 8e AF du tableau de progression (p.56) mentionne aussi "Les
// accords" pour la theorie musicale. La table des matieres verrouillee
// (00_PHASE0/08_TABLE_MATIERES_PROPOSEE_EEA_8AF.md) ne liste, pour ce
// chapitre, que "clé de Fa, mesures composées, gammes mineures" — "les
// accords" n'y figure pas. Conformement a la consigne de ne pas modifier
// l'architecture verrouillee, ce chapitre NE traite PAS les accords, meme
// si le contenu est officiellement disponible pour cette annee. Signale
// ici pour transparence, non traite comme un contenu 8e AF de ce chapitre.
//
// CONTROLE DU PASSAGE 7e -> 8e AF (section 3 du prompt d'execution) : le
// Chapitre 5 de la 7e AF (deja redige et finalise, NON modifie ici) a
// couvert la notation de base, la gamme diatonique MAJEURE, la lecture en
// CLE DE SOL et les MESURES SIMPLES. Ce Chapitre 5 de la 8e AF part de cet
// acquis (rappel bref, section 5.1) et introduit reellement la CLE DE FA,
// les MESURES COMPOSEES et la GAMME MINEURE (avec la notion de gamme
// relative) — une progression nette en complexite technique, sans repeter
// le contenu deja acquis. Aucune anticipation de la 9e AF : le "renforcement
// des acquis de la 7e et 8e annees" et le fait de "solfier des pieces plus
// complexes" (9e AF, Unite 2 selon 00_PHASE0/05_MATRICE_EEA_9AF.md) ne sont
// pas abordes ici ; les exercices restent d'un niveau d'introduction/
// pratique, non virtuose.
//
// PATRIMOINE : "formes de la musique classique haitienne" est un contenu
// officiel (p.53-54), mais aucune oeuvre, compositeur ou date precis n'est
// nomme par la source a ce niveau. Toute reference reste generique [CHOIX
// EDITORIAL], sans inventer de titre, compositeur ou date non verifies —
// meme prudence deja appliquee au Chapitre 5 de la 7e AF.
//
// Adaptations de securite : aucune activite dangereuse ; pratique vocale et
// exercices rythmiques frappes des mains ou avec un metronome (ou un
// battement de main a defaut), accessibles sans materiel couteux.
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
  "Lire et chanter en clé de Fa",
  "L'an dernier, tu as appris à lire la musique en clé de Sol. Cette année, tu découvres une deuxième clé, " +
  "de nouveaux rythmes plus riches, et une gamme à la couleur différente : la gamme mineure. Ton langage " +
  "musical s'agrandit.",
  [
    "Lire des notes placées en clé de Fa.",
    "Reconnaître et pratiquer un rythme sur une mesure composée.",
    "Distinguer une gamme majeure d'une gamme mineure et comprendre la notion de gamme relative.",
    "Solfier une courte mélodie combinant clé de Fa et mesure composée.",
    "Reconnaître que la musique classique haïtienne existe comme forme musicale à part entière.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école de Cap-Haïtien, une classe de 8e AF retrouve sa portée musicale de " +
  "l'an dernier. « On sait déjà lire ça ! » lance un élève, confiant. Son professeur sourit et trace une " +
  "nouvelle clé, différente de la clé de Sol. « Cette année, ta voix — ou ton instrument — va aussi explorer " +
  "des sons plus graves. Il te faut une nouvelle clé pour les lire. »",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Clé de Fa — signe placé au début de la portée, utilisé pour lire des notes plus graves que celles de la clé de Sol."));
children.push(bulletPar("Mesure composée — mesure dans laquelle chaque temps se divise naturellement en trois, et non en deux."));
children.push(bulletPar("Gamme mineure — gamme de sept notes à la couleur sonore différente de la gamme majeure, souvent perçue comme plus grave ou plus mélancolique."));
children.push(bulletPar("Gamme relative — gamme mineure qui partage exactement les mêmes notes qu'une gamme majeure donnée, mais qui commence sur une note différente."));
children.push(bulletPar("Métronome — outil (mécanique, électronique ou en application) qui donne un tempo régulier pour s'entraîner au rythme."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : ce que tu savais déjà lire", "5.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à lire des notes en clé de Sol, à reconnaître la gamme diatonique majeure, et à " +
  "lire un rythme sur des mesures simples (où chaque temps se divise en deux). Cette année, ce savoir devient " +
  "la base sur laquelle tu vas construire une lecture musicale plus riche.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("La clé de Fa : lire les sons graves", "5.2"));
children.push(bodyPar(
  "La clé de Sol, que tu connais, sert surtout à lire des sons aigus ou moyens. Beaucoup d'instruments graves " +
  "(et certaines voix graves) ont besoin d'une autre clé pour être lus confortablement : la clé de Fa.",
));
children.push(calloutBox(
  "TECHNIQUE — S'initier à la clé de Fa",
  [
    "1. Repère la clé de Fa au début de la portée : elle a une forme différente de la clé de Sol, avec deux " +
    "points placés autour d'une ligne.",
    "2. Comme en clé de Sol, identifie si la note est sur une ligne ou dans un espace.",
    "3. Compte les lignes ou les espaces à partir d'un repère connu pour trouver le nom de la note — les " +
    "repères ne sont pas les mêmes qu'en clé de Sol.",
    "4. Entraîne-toi d'abord avec quelques notes isolées avant de lire une suite complète.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : ne cherche pas à retenir la clé de Fa par cœur d'un coup — comme pour la clé de Sol " +
  "l'an dernier, la lecture devient naturelle avec la pratique répétée.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C05-01",
  "Ouverture — Deux clés, deux univers de sons",
  "Une salle de classe haïtienne crédible (Cap-Haïtien ou similaire) où un enseignant trace au tableau une " +
  "portée avec la clé de Sol et une portée avec la clé de Fa, côte à côte, devant des élèves de 8e AF " +
  "attentifs.",
  "La clé de Fa ouvre l'accès à un nouveau registre de sons graves.",
  "Ouvrir le chapitre sur une scène concrète comparant les deux clés déjà et nouvellement connues.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les mesures composées", "5.3"));
children.push(bodyPar(
  "L'an dernier, tu as pratiqué des mesures simples, où chaque temps se divise en deux. Cette année, tu " +
  "découvres les mesures composées, où chaque temps se divise naturellement en trois — ce qui donne un " +
  "rythme différent, souvent plus balancé.",
));
children.push(twoColTable(
  "Type de mesure", "Division de chaque temps",
  [
    ["Mesure simple (déjà connue)", "Chaque temps se divise en deux"],
    ["Mesure composée (nouvelle)", "Chaque temps se divise en trois"],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "Pour bien sentir une mesure composée, on peut la battre librement en frappant dans ses mains, ou " +
  "s'entraîner avec un métronome pour garder un tempo régulier et précis.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C05-02",
  "Démonstration technique — sentir une mesure composée",
  "Une planche montrant un élève battant une mesure composée (division en trois), avec des symboles " +
  "représentant chaque subdivision, en comparaison directe avec une mesure simple déjà connue.",
  "La mesure composée se ressent d'abord par le corps avant de se lire précisément.",
  "Montrer concrètement la différence de division entre mesure simple et mesure composée.",
  "Illustration demi-page, planche pédagogique comparative, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La gamme mineure et les gammes relatives", "5.4"));
children.push(bodyPar(
  "La gamme diatonique majeure, que tu connais, n'est pas la seule gamme possible. La gamme mineure, " +
  "construite avec un ordre différent de tons et de demi-tons, produit une couleur sonore différente — " +
  "souvent perçue comme plus grave ou plus mélancolique que la gamme majeure.",
));
children.push(calloutBox(
  "DÉCOUVRIR — La gamme relative",
  [
    "Chaque gamme majeure possède une gamme mineure « relative », qui utilise exactement les mêmes notes, " +
    "mais qui commence sur une note différente.",
    "Écouter une gamme majeure puis sa relative mineure permet d'entendre clairement la différence de " +
    "couleur sonore, même si les notes utilisées sont identiques.",
    "Reconnaître à l'oreille une gamme mineure demande de la pratique — ce n'est pas un réflexe immédiat.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C05-03",
  "Exemple analysé — gamme majeure et gamme relative mineure",
  "Deux portées superposées montrant une gamme diatonique majeure et sa gamme relative mineure, avec les " +
  "mêmes notes reliées visuellement entre les deux portées pour montrer leur parenté.",
  "Une gamme majeure et sa relative mineure partagent les mêmes notes, dans un ordre de départ différent.",
  "Donner un exemple visuel clair de la relation entre gamme majeure et gamme relative mineure.",
  "Illustration demi-page, deux portées comparatives annotées, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Solfier en clé de Fa", "5.5"));
children.push(bodyPar(
  "Solfier en clé de Fa suit exactement la même logique que solfier en clé de Sol : combiner la lecture des " +
  "notes, la lecture rythmique et le chant. Seule la clé — et donc les repères de lecture — change.",
));
children.push(calloutBox(
  "ÉCOUTER — La musique classique haïtienne",
  [
    "En Haïti existent des formes de musique classique haïtienne, composées et interprétées par des " +
    "musiciens haïtiens, au même titre que la musique classique universelle.",
    "Écouter des œuvres de ce répertoire, quand l'occasion se présente, permet de développer ton oreille et " +
    "ta culture musicale, tout en restant proche de ton patrimoine.",
    "Avant de solfier un morceau inconnu, écoute-le d'abord si possible, et essaie de repérer si tu perçois " +
    "une couleur majeure ou mineure.",
  ],
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE, "5A2A1E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Lecture et rythme en clé de Fa"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Lire des notes en clé de Fa, pratiquer une mesure composée, puis solfier une courte mélodie combinant les deux." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Ta voix et tes mains. Facultatif : un métronome (mécanique, électronique ou en application)." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Ton enseignant te propose une courte suite de notes en clé de Fa, avec un rythme sur mesure composée." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Lis d'abord les noms des notes en clé de Fa à voix haute, sans chanter, lentement."));
children.push(numberedPar("2. Bats la mesure composée dans tes mains (ou avec un métronome), sans encore chanter les notes."));
children.push(numberedPar("3. Combine les deux : chante chaque note en respectant sa durée sur la mesure composée (tu solfies)."));
children.push(numberedPar("4. Recommence plusieurs fois en accélérant progressivement, sans perdre en justesse."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "L'élève parvient à chanter la courte mélodie proposée en clé de Fa, en respectant à la fois les notes et " +
  "le rythme sur mesure composée, même lentement.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Les notes chantées correspondent à celles écrites en clé de Fa."));
children.push(bulletPar("Le rythme sur la mesure composée est globalement respecté."));
children.push(bulletPar("L'élève peut expliquer la différence entre une mesure simple et une mesure composée."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier vocal et rythmique sans risque",
  [
    "Chanter ne présente aucun danger ; veiller simplement à ne pas forcer sa voix, surtout dans le grave.",
    "Aucun matériel coûteux n'est nécessaire : le métronome peut être remplacé par un battement de mains " +
    "régulier.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C05-04",
  "Espace de production — ma portée en clé de Fa",
  "Une portée vierge avec la clé de Fa déjà tracée, prévue pour que l'élève y écrive ou colle les notes d'une " +
  "courte mélodie proposée par l'enseignant.",
  "Offrir un espace direct de production pour ancrer la pratique de la clé de Fa dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Portée simple avec clé de Fa, bordure fine ocre, format paysage demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Écoute un camarade chanter la mélodie de l'atelier en clé de Fa. Reconnais-tu si le rythme suit bien une " +
  "mesure composée ? Discutez ensemble de ce qui distingue, à l'oreille, une mesure composée d'une mesure " +
  "simple.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La clé de Fa permet de lire des notes plus graves que celles de la clé de Sol.",
    "Dans une mesure composée, chaque temps se divise en trois, contrairement à la mesure simple (division " +
    "en deux).",
    "La gamme mineure a une couleur sonore différente de la gamme majeure ; chaque gamme majeure possède une " +
    "gamme relative mineure partageant les mêmes notes.",
    "Solfier en clé de Fa suit la même démarche que solfier en clé de Sol : lecture des notes, rythme et " +
    "chant combinés.",
    "La musique classique haïtienne est une forme musicale à part entière, à découvrir progressivement.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Reconnaître la clé de Fa sur une portée.",
    "☐ Lire quelques notes simples placées en clé de Fa.",
    "☐ Distinguer, à l'écoute ou à la lecture, une mesure simple d'une mesure composée.",
    "☐ Expliquer ce qu'est une gamme relative mineure.",
    "☐ Solfier une très courte mélodie en clé de Fa sur une mesure composée.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : clé de Fa, mesure composée, gamme mineure, gamme relative, solfier.",
    "Vocabulaire clé à maîtriser : clé de Fa, mesure composée, gamme mineure, gamme relative, métronome.",
    "Avant l'évaluation, vérifie que tu peux : lire une note simple en clé de Fa ; expliquer la différence " +
    "entre mesure simple et mesure composée ; définir ce qu'est une gamme relative.",
    "Rappel officiel : un examen final, au cours duquel l'élève doit solfier une ou plusieurs pièces de " +
    "musique, a lieu à la fin de chaque session [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : clé de " +
  "Fa · mesure composée · gamme mineure · gamme relative · métronome.",
  { italics: true },
));
children.push(numberedPar("1. Le signe qui permet de lire des notes plus graves que la clé de Sol s'appelle la ......................"));
children.push(numberedPar("2. Une mesure dans laquelle chaque temps se divise en trois s'appelle une ......................"));
children.push(numberedPar("3. Une gamme à la couleur sonore différente de la gamme majeure s'appelle une ......................"));
children.push(numberedPar("4. Une gamme mineure qui partage les mêmes notes qu'une gamme majeure donnée s'appelle sa ......................"));
children.push(numberedPar("5. L'outil qui donne un tempo régulier pour s'entraîner au rythme s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Explique, avec tes mots, la différence entre une mesure simple et une mesure composée."));
children.push(numberedPar("2. Qu'est-ce qui distingue une gamme majeure d'une gamme relative mineure, et qu'ont-elles en commun ?"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Bats (ou décris) une courte mesure composée de ton choix, en expliquant comment tu comptes les temps."));
children.push(numberedPar("2. Sur une portée en clé de Fa (que tu peux décrire ou dessiner), indique où se trouverait approximativement une note grave que tu connais déjà en clé de Sol."));
children.push(spacer(160));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Compare la lecture en clé de Sol (7e AF) et la lecture en clé de Fa (8e AF) : qu'est-ce qui change réellement dans ta pratique musicale ?"));
children.push(numberedPar("2. Un camarade confond systématiquement mesure simple et mesure composée en battant le rythme. Que lui conseilles-tu ?"));
children.push(numberedPar("3. Propose une courte mélodie de 4 notes en clé de Fa que tu aimerais essayer de solfier, en précisant si tu l'imagines plutôt majeure ou mineure."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la clé de Fa pour lire des sons plus graves, de pratiquer les mesures " +
  "composées où chaque temps se divise en trois, de comprendre la gamme mineure et la notion de gamme " +
  "relative, et de solfier une courte mélodie en combinant ces nouveaux acquis. Ce premier chapitre de " +
  "musique de la 8e AF élargit considérablement le langage musical découvert l'an dernier.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "clé de Fa · mesure composée · gamme mineure · gamme relative · métronome · solfier.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C05-05",
  "Patrimoine — écouter la musique classique haïtienne",
  "Une scène de classe haïtienne où des élèves écoutent attentivement, casque ou haut-parleur simple à " +
  "l'appui, un extrait de musique décrite comme classique haïtienne, sans qu'aucune œuvre ou compositeur " +
  "précis ne soit représenté ou nommé.",
  "La musique classique haïtienne se découvre aussi par l'écoute attentive en classe.",
  "Illustrer la dimension patrimoniale et auditive du chapitre sans fixer une œuvre précise.",
  "Illustration demi-page, scène de classe haïtienne, ambiance concentrée et musicale.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C05-06",
  "Synthèse — Lire et chanter en clé de Fa",
  "Une carte mentale simple centrée sur « Clé de Fa », avec des branches vers : mesure composée, gamme " +
  "mineure, gamme relative, solfier, musique classique haïtienne.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 41, "Manuel_EEA_8AF_Chapitre5.docx");
