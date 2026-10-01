// Manuel d'EEA 9e AF — Chapitre 6 : Jouer, enregistrer, produire
// (champ officiel : Musique, Axe 3 — Pratique instrumentale).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.57/63 : TABLEAU DE PROGRESSION explicitement separe par annee (7e/
//     8e/9e AF) — verifie en direct (deja capture lors des Chapitres 6 des
//     manuels 7e/8e AF, reconfirme ici). Colonne 9e AF, Pratique
//     instrumentale, citee verbatim : "Flute a bec (tenor et basse)" ; "La
//     percussion" ; "Musique d'ensemble - Chorale - Orchestre" ;
//     "Introduction d'elements electroniques, d'enregistrement et/ou
//     d'ingenieries du son."
//   - p.61-62/63 : Unite d'apprentissage 3 (Pratique instrumentale, full-
//     cycle), verifiee en direct le 2026-08-23. Competence ciblee
//     officielle : TOUTES LES COMPETENCES (C1 a C8). Savoir officiel :
//     "Theorie relative a un instrument (la flute a bec, la voix, ou la
//     percussion)." Savoir-faire officiel : "Jouer un instrument (seul ou
//     en groupe)." Evaluation citee verbatim : "Une evaluation finale se
//     fera a travers des auditions ou des recitals de fin d'annee."
//
// STATUT DE TRACABILITE : comme pour les Chapitres 5 (9e AF) et 5-6 (8e
// AF), le tableau de progression separe explicitement les colonnes 7e/8e/
// 9e AF — la flute tenor/basse et l'introduction aux elements
// electroniques/enregistrement/ingenierie du son sont donc confirmes
// [OFFICIEL - SOURCE MENFP VERIFIEE] pour la 9e AF precisement.
//
// PROTECTION DES CHAPITRES ET MANUELS ANTERIEURS — CONTROLE ANTI-REPETITION :
// le Chapitre 6 de la 7e AF (deja finalise, NON modifie ici) a traite la
// flute a bec SOPRANO, la voix et la percussion, en pratique INDIVIDUELLE.
// Le Chapitre 6 de la 8e AF (deja finalise, NON modifie ici) a traite la
// flute a bec ALTO et la MUSIQUE D'ENSEMBLE (chorale, orchestre), avec les
// chants traditionnels haitiens. CE CHAPITRE NE REPREND NI L'UN NI L'AUTRE :
// il introduit reellement la flute a bec TENOR ET BASSE, ainsi qu'une
// premiere approche de l'ENREGISTREMENT SONORE et de l'INGENIERIE DU SON —
// un territoire entierement nouveau, absent des deux chapitres precedents.
//
// PATRIMOINE : le repertoire reste, comme pour les Chapitres 6 des manuels
// 7e/8e AF, un [CHOIX EDITORIAL] construit a partir de pieces deja
// rencontrees en 7e/8e AF, sans qu'aucun titre, compositeur ou date precis
// ne soit invente.
//
// Adaptations de securite/hygiene : toute flute a bec partagee entre eleves
// doit etre nettoyee ou individuelle ; alternative systematique sans
// materiel d'enregistrement (interpretation live evaluee directement),
// conforme a la formulation officielle de la table des matieres verrouillee
// ("productions artistiques possibles : courte interpretation enregistree
// si materiel disponible ; sinon interpretation live evaluee en direct").
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
  6,
  "Jouer, enregistrer, produire",
  "Tu as déjà joué seul, puis en groupe. Cette année, ton instrument s'agrandit encore — vers des registres " +
  "plus graves — et ta pratique s'ouvre à une nouvelle question : que se passe-t-il quand on capture un son " +
  "pour le conserver et le faire écouter à d'autres ?",
  [
    "Découvrir la flûte à bec ténor et la flûte à bec basse.",
    "Comprendre les bases de l'enregistrement sonore.",
    "S'initier au vocabulaire de l'ingénierie du son.",
    "Interpréter une pièce avancée, seul ou en groupe, avec ou sans enregistrement.",
    "Se préparer à une évaluation de type audition ou récital.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école de Hinche, une classe de 9e AF prépare un petit récital de fin " +
  "d'année. « Est-ce qu'on pourrait enregistrer notre concert ? » demande un élève. Son professeur répond : " +
  "« C'est justement ce que nous allons apprendre à faire — même sans studio professionnel. »",
  { italics: true },
));

children.push(subHeading("Prérequis"));
children.push(bodyPar(
  "Ce chapitre suppose que tu maîtrises déjà la flûte à bec soprano (7e AF) et la flûte à bec alto ainsi que " +
  "la pratique en musique d'ensemble — chorale, orchestre (8e AF). Ces acquis servent directement " +
  "l'interprétation avancée proposée ici.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Flûte à bec ténor — flûte à bec plus grande que l'alto, au registre plus grave."));
children.push(bulletPar("Flûte à bec basse — la plus grande et la plus grave des flûtes à bec couramment utilisées en classe."));
children.push(bulletPar("Enregistrement sonore — action de capturer un son pour pouvoir l'écouter à nouveau plus tard."));
children.push(bulletPar("Ingénierie du son — ensemble des techniques utilisées pour capter, régler et améliorer la qualité d'un son enregistré."));
children.push(bulletPar("Récital — présentation musicale, individuelle ou collective, généralement organisée en fin d'année pour évaluer les acquis."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : de la flûte soprano à la flûte alto", "6.1"));
children.push(bodyPar(
  "En 7e AF, tu as découvert la flûte à bec soprano, en pratique individuelle. En 8e AF, tu as ajouté la " +
  "flûte alto et appris à jouer en musique d'ensemble (chorale, orchestre). Cette année, la famille des " +
  "flûtes à bec s'agrandit encore, et une nouvelle compétence s'ajoute : celle de capter et conserver un " +
  "son.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("La flûte à bec ténor et la flûte à bec basse", "6.2"));
children.push(bodyPar(
  "La flûte à bec ténor et la flûte à bec basse complètent la famille des flûtes à bec que tu connais déjà. " +
  "Plus grandes que la soprano et l'alto, elles produisent des sons encore plus graves, et demandent un " +
  "souffle plus soutenu.",
));
children.push(calloutBox(
  "TECHNIQUE — S'adapter à un instrument plus grand",
  [
    "Observe la taille croissante de la famille des flûtes : soprano, alto, ténor, basse — du plus aigu au " +
    "plus grave.",
    "Le doigté de base reste proche d'un instrument à l'autre, mais la posture et le souffle doivent " +
    "s'adapter à la taille grandissante de l'instrument.",
    "Si ces instruments ne sont pas disponibles dans ton école, observe leur principe à travers une " +
    "description ou une écoute, en t'appuyant sur ce que tu connais déjà de la soprano et de l'alto.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C06-01",
  "Ouverture — Préparer un récital de fin d'année",
  "Une salle de classe haïtienne crédible (Hinche ou similaire) où des élèves de 9e AF répètent en groupe " +
  "avec plusieurs flûtes à bec de tailles différentes, en vue d'un récital.",
  "La pratique instrumentale de fin de cycle mobilise toute la famille des flûtes à bec.",
  "Ouvrir le chapitre sur une scène concrète de préparation collective à un récital.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EEA.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C06-02",
  "Exemple analysé — la famille des flûtes à bec",
  "Une planche comparant les quatre tailles de flûtes à bec (soprano, alto, ténor, basse) côte à côte, avec " +
  "leurs noms et une indication de leur registre (aigu à grave).",
  "La famille des flûtes à bec s'organise du plus aigu au plus grave.",
  "Donner une référence visuelle claire de la famille complète des flûtes à bec.",
  "Illustration demi-page, planche comparative annotée, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les bases de l'enregistrement sonore", "6.3"));
children.push(bodyPar(
  "Enregistrer un son, c'est le capturer pour pouvoir l'écouter à nouveau plus tard, l'analyser, ou le " +
  "partager. Cette première approche de l'enregistrement introduit un vocabulaire technique simple, utile " +
  "même sans matériel professionnel.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Trois notions de base de l'ingénierie du son",
  [
    "Le microphone capte le son : sa position (proche ou loin de la source) change beaucoup la qualité de " +
    "l'enregistrement.",
    "Le niveau sonore doit être ni trop faible (son difficile à entendre), ni trop fort (son déformé ou " +
    "« saturé »).",
    "Écouter un enregistrement au casque ou avec un bon haut-parleur permet de mieux juger sa qualité que de " +
    "l'écouter en même temps qu'on le joue.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(160));
children.push(bodyPar(
  "Alternative sans matériel d'enregistrement : si aucun microphone ou appareil n'est disponible, " +
  "l'interprétation se fait directement en direct (« live »), et c'est cette interprétation en direct qui " +
  "est observée et évaluée — l'apprentissage reste entièrement valable.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C06-03",
  "Démonstration technique — enregistrer une interprétation",
  "Une planche montrant un élève interprétant une pièce devant un téléphone ou un petit enregistreur, avec " +
  "des repères simples indiquant la distance au micro et un niveau sonore correct.",
  "Un enregistrement de qualité dépend de choix techniques simples mais précis.",
  "Montrer concrètement les bases pratiques d'un enregistrement réalisé avec un matériel accessible.",
  "Illustration demi-page, planche pédagogique claire, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Interpréter et évaluer : vers le récital", "6.4"));
children.push(bodyPar(
  "La pratique instrumentale de fin de cycle se conclut traditionnellement par une audition ou un récital : " +
  "une présentation, individuelle ou collective, qui permet de montrer les acquis techniques accumulés " +
  "depuis trois ans.",
));
children.push(bodyPar(
  "Un récital réussi ne dépend pas seulement de la justesse technique : la régularité de la pratique et la " +
  "maîtrise progressive de l'instrument, développées tout au long de l'année, comptent tout autant.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Mon récital de fin de cycle"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Préparer et interpréter une pièce avancée, seul ou en groupe, avec tentative d'enregistrement si le matériel est disponible." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Une flûte à bec (soprano, alto, ténor ou basse selon disponibilité), la voix, ou la percussion. Facultatif : un téléphone ou un enregistreur simple." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis, seul ou en groupe, une pièce déjà travaillée les années précédentes ou une nouvelle pièce simple proposée par ton enseignant." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Choisis ta pièce et ton instrument (ou ta voix)."));
children.push(numberedPar("2. Entraîne-toi régulièrement, en visant une interprétation stable et maîtrisée."));
children.push(numberedPar("3. Si un matériel d'enregistrement est disponible, teste la position du micro et le niveau sonore avant l'interprétation finale."));
children.push(numberedPar("4. Interprète ta pièce, enregistrée ou en direct, devant la classe."));
children.push(numberedPar("5. Écoute (si enregistré) ou fais un retour immédiat (si en direct) sur ta propre interprétation."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une interprétation avancée, stable et maîtrisée, présentée en récital, avec ou sans enregistrement selon " +
  "le matériel disponible.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La technique instrumentale (ou vocale) montre une maîtrise réelle, acquise par la pratique régulière."));
children.push(bulletPar("Si un enregistrement est réalisé, le niveau sonore et la position du micro sont raisonnablement corrects."));
children.push(bulletPar("L'élève peut commenter sa propre interprétation avec un regard critique."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un récital sans risque",
  [
    "Chaque flûte à bec doit être individuelle ou nettoyée avant d'être partagée, pour des raisons " +
    "d'hygiène.",
    "Le matériel d'enregistrement (téléphone, enregistreur) doit être manipulé avec soin, sous supervision " +
    "si nécessaire.",
    "Ne jamais forcer sa voix ou son souffle pour obtenir un effet sonore particulier.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C06-04",
  "Espace de production — mon carnet de préparation au récital",
  "Un tableau à compléter par l'élève, avec des colonnes pour noter la pièce choisie, les progrès de " +
  "l'entraînement et les points à améliorer avant le récital.",
  "Offrir un espace de suivi personnel pour ancrer une préparation régulière au récital.",
  "Espace de production dédié au suivi de la préparation instrumentale.",
  "Tableau simple à trois colonnes, bordure fine ocre, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Écoute (ou observe en direct) l'interprétation d'un camarade. Peux-tu identifier un point technique " +
  "particulièrement réussi, et un point à améliorer ? Discutez ensemble de ce qui distingue une " +
  "interprétation de récital d'une simple répétition.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La flûte à bec ténor et la flûte à bec basse complètent la famille des flûtes à bec, avec un registre " +
    "de plus en plus grave.",
    "Enregistrer un son suppose de prêter attention à la position du micro et au niveau sonore.",
    "Sans matériel d'enregistrement, l'interprétation en direct reste une évaluation entièrement valable.",
    "La pratique instrumentale de fin de cycle se conclut par une audition ou un récital.",
    "La régularité de l'entraînement compte autant que la performance du jour du récital.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire la famille complète des flûtes à bec, de la soprano à la basse.",
    "☐ Expliquer le rôle du microphone et du niveau sonore dans un enregistrement.",
    "☐ Interpréter une pièce avancée avec une technique stable et maîtrisée.",
    "☐ Réaliser (ou envisager) un enregistrement simple de mon interprétation.",
    "☐ Porter un regard critique sur ma propre interprétation et celle des autres.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : flûte à bec ténor/basse, enregistrement sonore, ingénierie du son, récital.",
    "Vocabulaire clé à maîtriser : flûte ténor, flûte basse, enregistrement, ingénierie du son, récital.",
    "Avant l'évaluation, vérifie que tu peux : décrire la famille des flûtes à bec ; expliquer les bases " +
    "d'un bon enregistrement ; présenter une interprétation stable.",
    "Rappel officiel : l'évaluation finale de ce chapitre se fait à travers des auditions ou des récitals de " +
    "fin d'année [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : flûte " +
  "ténor · flûte basse · enregistrement sonore · ingénierie du son · récital.",
  { italics: true },
));
children.push(numberedPar("1. La plus grande et la plus grave des flûtes à bec courantes s'appelle la ......................"));
children.push(numberedPar("2. Une flûte plus grande que l'alto mais plus petite que la basse s'appelle la ......................"));
children.push(numberedPar("3. L'action de capturer un son pour l'écouter à nouveau plus tard s'appelle l'......................"));
children.push(numberedPar("4. L'ensemble des techniques pour capter et régler la qualité d'un son enregistré s'appelle l'......................"));
children.push(numberedPar("5. Une présentation musicale organisée pour évaluer les acquis de fin d'année s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Classe dans l'ordre, du plus aigu au plus grave, les quatre tailles de flûtes à bec rencontrées depuis la 7e AF."));
children.push(numberedPar("2. Cite deux éléments à surveiller pour réussir un enregistrement simple."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment tu préparerais ta pièce pour un récital de fin d'année."));
children.push(numberedPar("2. Pourquoi une interprétation en direct reste-t-elle une évaluation valable, même sans matériel d'enregistrement ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare la pratique individuelle (7e AF), la musique d'ensemble (8e AF) et la préparation à un récital (9e AF) : qu'est-ce qui distingue chaque étape ?"));
children.push(numberedPar("2. Un camarade a enregistré son interprétation, mais le son est trop faible pour être bien entendu. Que lui conseilles-tu ?"));
children.push(numberedPar("3. Explique pourquoi la régularité de l'entraînement compte autant que la performance du jour du récital, selon toi."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la flûte à bec ténor et la flûte à bec basse, de s'initier aux bases de " +
  "l'enregistrement sonore et de l'ingénierie du son, et de préparer une interprétation avancée en vue d'un " +
  "récital de fin d'année, avec ou sans enregistrement. Cette compétence à jouer, enregistrer et se préparer " +
  "à une évaluation finale prépare directement le dernier chapitre du manuel, consacré à la production " +
  "musicale.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "flûte ténor · flûte basse · enregistrement sonore · ingénierie du son · récital.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C06-05",
  "Patrimoine — un récital de fin d'année",
  "Une scène de classe haïtienne où plusieurs élèves de 9e AF interprètent ensemble une pièce lors d'un " +
  "récital de fin d'année, dans une ambiance festive et solennelle à la fois.",
  "Le récital de fin d'année rassemble les acquis instrumentaux de tout le cycle.",
  "Illustrer la dimension collective et solennelle du récital de fin d'année.",
  "Illustration demi-page, scène de récital scolaire haïtien, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C06-06",
  "Synthèse — Jouer, enregistrer, produire",
  "Une carte mentale simple centrée sur « Jouer et enregistrer », avec des branches vers : flûte ténor/" +
  "basse, enregistrement, ingénierie du son, récital, préparation à l'évaluation.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 52, "Manuel_EEA_9AF_Chapitre6.docx");
