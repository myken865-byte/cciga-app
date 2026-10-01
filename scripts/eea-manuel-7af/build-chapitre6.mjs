// Manuel d'EEA 7e AF — Chapitre 6 : Jouer et interpréter
// (champ officiel : Musique, Axe 3 — Pratique instrumentale).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), section B-Musique, unite d'apprentissage
//   3 (Pratique instrumentale), p.52, 56, 61-62/63.
// Page relue pendant la Phase 0 (2026-08-22). Competence officielle ciblee
// [OFFICIEL - SOURCE MENFP VERIFIEE, p.61] : TOUTES LES COMPETENCES (C1 a
// C8) - seule unite de tout le programme EEA a mobiliser l'integralite des
// 8 competences a la fois.
//
// Contenu officiel repris fidelement, niveau 7e AF specifiquement
// (progression annuelle p.56) : la FLUTE A BEC SOPRANO (pas alto, reservee
// a la 8e AF), la voix, la percussion. Savoir officiel : "theorie relative
// a un instrument (la flute a bec, la voix, ou la percussion)". Savoir-faire
// officiel : "jouer un instrument (seul ou en groupe)". Activites
// officielles : presentation et tenue de l'instrument ; le doigte et
// mecanisme de l'instrument ; exercices progressifs sur la technique de jeu
// de l'instrument ; l'interpretation de pieces musicales.
//
// FIDELITE A LA PROGRESSION : la flute a bec ALTO et la "musique
// d'ensemble" (chorale, orchestre) sont explicitement reservees a la 8e AF
// selon la reconstruction documentee en Phase 0
// (00_PHASE0/04_MATRICE_EEA_8AF.md) - ce chapitre reste centre sur la
// pratique INDIVIDUELLE ou en petit groupe informel, avec la flute a bec
// SOPRANO uniquement.
//
// PATRIMOINE : comme deja signale dans la table des matieres verrouillee,
// aucun titre precis de repertoire n'est impose par la source a ce niveau -
// le choix d'un repertoire proche de la culture locale reste un [CHOIX
// EDITORIAL], sans inventer de titre, compositeur ou date non verifies.
//
// Adaptations de securite/hygiene : toute flute a bec partagee entre
// eleves doit etre nettoyee ou individuelle, pour des raisons d'hygiene ;
// alternative systematique sans instrument (voix et percussion corporelle)
// prevue pour les eleves sans acces a une flute a bec.
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
  6,
  "Jouer et interpréter",
  "Tu sais maintenant lire une note et sentir un rythme. Il est temps de faire sonner tout cela pour de " +
  "vrai : avec ta voix, tes mains, ou un instrument. Ce chapitre t'apprend à jouer et à interpréter une " +
  "courte pièce musicale.",
  [
    "Découvrir la présentation et la tenue de base d'un instrument.",
    "S'initier au doigté simple de la flûte à bec soprano.",
    "Utiliser sa voix comme un véritable instrument.",
    "Sentir et reproduire un rythme avec la percussion corporelle.",
    "Interpréter une courte pièce musicale, seul ou en petit groupe.",
  ],
));

children.push(bodyPar(
  "Situation de départ : À Jérémie, une classe de 7e AF reçoit pour la première fois des flûtes à bec pour le " +
  "cours de musique. Certains élèves n'en ont jamais tenu une, d'autres se demandent déjà comment en jouer un " +
  "premier son. Ce chapitre t'accompagne, que tu aies une flûte entre les mains ou non.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Flûte à bec — instrument à vent que l'on souffle par une embouchure, joué en couvrant des trous avec les doigts."));
children.push(bulletPar("Doigté — la façon de placer les doigts sur un instrument pour produire une note précise."));
children.push(bulletPar("Percussion — famille d'instruments (ou de gestes) que l'on frappe pour produire un son rythmique."));
children.push(bulletPar("Interpréter — jouer ou chanter une pièce musicale en y apportant sa propre sensibilité."));
children.push(bulletPar("Improviser — créer de la musique sur le moment, sans partition préparée à l'avance."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Se familiariser avec son instrument", "6.1"));
children.push(bodyPar(
  "Avant de jouer une seule note, il faut apprendre à connaître son instrument : comment le tenir, comment " +
  "le manipuler avec soin, et quelles sont ses différentes parties.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Trois instruments accessibles en classe",
  [
    "La flûte à bec soprano : instrument à vent, joué en soufflant doucement par l'embouchure tout en " +
    "couvrant certains trous avec les doigts.",
    "La voix : le premier instrument de tous, toujours disponible, qui demande simplement de bien respirer et " +
    "de contrôler sa justesse.",
    "La percussion : peut être un instrument réel (tambour) ou simplement le corps (mains, pieds) — chacun " +
    "peut donc pratiquer la percussion, avec ou sans matériel.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C06-01",
  "Ouverture — Premiers pas avec la flûte à bec",
  "Une salle de classe haïtienne crédible (Jérémie ou similaire) où des élèves de 7e AF découvrent leur " +
  "flûte à bec pour la première fois, certains la tenant avec curiosité, sous la supervision d'un enseignant.",
  "Découvrir un instrument commence par l'observation et la manipulation prudente, avant de jouer.",
  "Ouvrir le chapitre sur une scène concrète qui ancre la découverte de l'instrument.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance curieuse et bienveillante.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La flûte à bec soprano : posture et premières notes", "6.2"));
children.push(bodyPar(
  "La flûte à bec soprano se tient à deux mains, les doigts couvrant certains trous pour changer la hauteur " +
  "du son. Le doigté — la position exacte des doigts — détermine quelle note sort de l'instrument.",
));
children.push(calloutBox(
  "TECHNIQUE — Tenir et souffler correctement",
  [
    "1. Tiens la flûte verticalement, sans la mordre, les lèvres refermées doucement sur l'embouchure.",
    "2. Souffle de façon régulière et douce, comme si tu disais « tu » à voix basse.",
    "3. Place tes doigts pour couvrir complètement les trous indiqués, sans laisser d'espace.",
    "4. Entraîne-toi d'abord à produire un son stable avant de chercher à jouer plusieurs notes.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : un son qui « couine » vient souvent d'un souffle trop fort — souffle plus doucement. " +
  "Erreur fréquente à éviter : appuyer trop fort sur les trous ou laisser un petit espace non couvert, ce qui " +
  "empêche d'obtenir une note claire.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C06-02",
  "Exemple analysé — posture correcte de la flûte à bec",
  "Un schéma clair montrant la posture correcte pour tenir une flûte à bec soprano : position des mains, " +
  "des doigts sur les trous, et angle de l'instrument, avec une légende pour chaque élément.",
  "Une bonne posture est la base d'un jeu instrumental réussi.",
  "Donner un exemple visuel de référence précis pour la posture de la flûte à bec.",
  "Illustration demi-page, schéma technique clair, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La voix comme instrument", "6.3"));
children.push(bodyPar(
  "Contrairement à la flûte, la voix est un instrument que tout le monde possède déjà. Bien l'utiliser " +
  "demande cependant un peu de technique : respirer profondément, se tenir droit, et contrôler sa justesse " +
  "(chanter ni trop haut, ni trop bas par rapport à la note attendue).",
));
children.push(bodyPar(
  "Alternative sans instrument : si aucune flûte à bec n'est disponible, toutes les activités de ce chapitre " +
  "peuvent être réalisées uniquement avec la voix et la percussion corporelle, sans que cela réduise la " +
  "qualité de l'apprentissage.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La percussion : sentir le rythme avec le corps", "6.4"));
children.push(bodyPar(
  "La percussion ne demande pas nécessairement un instrument : frapper dans ses mains, taper sur une table, " +
  "ou marquer le rythme avec les pieds sont déjà des formes de percussion accessibles à tous.",
));
children.push(calloutBox(
  "TECHNIQUE — S'entraîner à la percussion corporelle",
  [
    "1. Choisis un rythme simple (par exemple : frappe, frappe, pause, frappe).",
    "2. Répète-le plusieurs fois à voix basse en même temps que tu le frappes.",
    "3. Essaie de le maintenir stable, même en accélérant légèrement.",
    "4. Ajoute une deuxième personne qui frappe un rythme différent en même temps : c'est déjà un petit " +
    "ensemble musical.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C06-03",
  "Démonstration technique — percussion corporelle en groupe",
  "Une planche montrant deux ou trois élèves pratiquant la percussion corporelle ensemble (frappes de mains, " +
  "tapes sur les genoux), avec des symboles rythmiques simples au-dessus de chaque élève.",
  "La percussion peut se pratiquer partout, avec ou sans instrument, seul ou en groupe.",
  "Montrer concrètement une pratique collective de percussion corporelle.",
  "Illustration demi-page, scène de classe haïtienne dynamique, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ma première interprétation"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Interpréter une courte pièce musicale simple, seul ou en petit groupe, avec la flûte à bec, la voix, et/ou la percussion." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Une flûte à bec si disponible. Sinon : uniquement ta voix et tes mains — l'activité reste entièrement réalisable sans instrument." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Reprends la courte mélodie travaillée au Chapitre 5, ou une mélodie simple proposée par ton enseignant, en cohérence avec ta culture locale." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Choisis ton moyen d'interprétation (flûte, voix, ou les deux) et, si tu le souhaites, un accompagnement en percussion corporelle."));
children.push(numberedPar("2. Entraîne-toi lentement, note par note ou geste par geste."));
children.push(numberedPar("3. Assemble progressivement l'ensemble de la pièce, à un tempo confortable."));
children.push(numberedPar("4. Présente ton interprétation à la classe, seul ou avec un petit groupe."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une courte interprétation reconnaissable de la pièce choisie, jouée ou chantée avec une justesse et un " +
  "rythme globalement respectés.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La posture ou la technique vocale de base est respectée."));
children.push(bulletPar("Le rythme de la pièce est globalement maintenu."));
children.push(bulletPar("L'élève peut expliquer son choix d'interprétation (instrument, voix, ou les deux)."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier instrumental sans risque",
  [
    "Chaque flûte à bec doit être individuelle ou nettoyée avant d'être partagée, pour des raisons " +
    "d'hygiène.",
    "Ne jamais forcer sa voix, surtout dans les notes aiguës.",
    "La percussion corporelle se pratique sans frapper trop fort pour éviter toute gêne.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-7AF-C06-04",
  "Espace de production — carnet d'entraînement instrumental",
  "Un tableau à compléter par l'élève, avec des lignes pour noter ses progrès jour après jour sur la pièce " +
  "travaillée (date, ce qui a été réussi, ce qui reste à améliorer).",
  "Offrir un espace de suivi personnel pour ancrer une pratique régulière et progressive.",
  "Espace de production dédié au suivi de l'entraînement instrumental.",
  "Tableau simple à trois colonnes, bordure fine ocre, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Écoute l'interprétation d'un camarade. Peux-tu reconnaître la mélodie ou le rythme sans qu'il te la " +
  "présente à l'avance ? Discutez ensemble de ce qui rend une interprétation claire et agréable à écouter.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Connaître son instrument (présentation, tenue) est la première étape avant de jouer.",
    "La flûte à bec soprano se joue en soufflant doucement et en couvrant précisément les trous du doigté.",
    "La voix est un instrument accessible à tous, qui demande respiration et justesse.",
    "La percussion corporelle permet de pratiquer le rythme sans instrument, seul ou en groupe.",
    "Interpréter une pièce, c'est y apporter sa propre sensibilité, au-delà de la simple exécution technique.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire la posture correcte pour tenir une flûte à bec soprano.",
    "☐ Produire un son stable avec la flûte à bec, ou avec ma voix.",
    "☐ Reproduire un rythme simple en percussion corporelle.",
    "☐ Interpréter une courte pièce, seul ou en groupe.",
    "☐ Expliquer la différence entre interpréter et improviser.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : flûte à bec, doigté, voix, percussion, interpréter, improviser.",
    "Vocabulaire clé à maîtriser : embouchure, doigté, percussion corporelle, interprétation.",
    "Avant l'évaluation, vérifie que tu peux : décrire la posture de jeu de la flûte à bec ; expliquer " +
    "comment pratiquer la percussion sans instrument ; définir « interpréter ».",
    "Question rapide de vérification : cite deux instruments (ou moyens sonores) que tu peux utiliser sans " +
    "matériel spécifique.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : flûte à " +
  "bec · doigté · percussion · interpréter · improviser.",
  { italics: true },
));
children.push(numberedPar("1. Un instrument à vent joué en couvrant des trous avec les doigts est une ......................"));
children.push(numberedPar("2. La position des doigts pour produire une note précise s'appelle le ......................"));
children.push(numberedPar("3. Frapper un rythme, avec ou sans instrument, c'est faire de la ......................"));
children.push(numberedPar("4. Jouer une pièce en y apportant sa sensibilité, c'est l'......................"));
children.push(numberedPar("5. Créer de la musique sur le moment, sans préparation, c'est ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Décris, en trois étapes simples, comment produire un premier son stable avec une flûte à bec."));
children.push(numberedPar("2. Cite deux erreurs fréquentes qui empêchent d'obtenir une note claire à la flûte à bec."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Propose un court rythme de percussion corporelle (par exemple avec des frappes et des pauses) que tu pourrais enseigner à un camarade."));
children.push(numberedPar("2. Si tu n'as pas de flûte à bec disponible, quelle alternative peux-tu utiliser pour pratiquer ce chapitre ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Compare interpréter et improviser : dans quelle situation choisirais-tu l'un plutôt que l'autre ?"));
children.push(numberedPar("2. Un camarade joue toutes les notes correctement mais sans aucune expression. Que lui conseillerais-tu pour mieux interpréter sa pièce ?"));
children.push(numberedPar("3. Propose un morceau ou une chanson de ta région que tu aimerais un jour apprendre à jouer ou à chanter, et explique pourquoi."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la pratique instrumentale de base en musique : se familiariser avec un " +
  "instrument, adopter la bonne posture pour la flûte à bec soprano, utiliser sa voix comme instrument, " +
  "sentir et reproduire un rythme en percussion corporelle, et interpréter une courte pièce musicale, seul ou " +
  "en groupe. Ce chapitre clôt la première approche de la musique en 7e AF, en combinant tout ce qui a été " +
  "appris depuis le début de la Partie II.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "flûte à bec · doigté · voix · percussion · interpréter · improviser.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C06-05",
  "Patrimoine — un répertoire proche de la culture locale",
  "Une scène de classe haïtienne où des élèves interprètent une mélodie simple, dans une ambiance conviviale " +
  "évoquant la culture musicale locale, sans référence à une œuvre précise.",
  "Le choix d'un répertoire proche de la culture locale rend l'apprentissage plus vivant.",
  "Illustrer la dimension culturelle du choix de répertoire, sans fixer une œuvre précise.",
  "Illustration demi-page, scène de classe haïtienne, ambiance chaleureuse et musicale.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-7AF-C06-06",
  "Synthèse — Jouer et interpréter",
  "Une carte mentale simple centrée sur « Jouer et interpréter », avec des branches vers : flûte à bec, voix, " +
  "percussion, interprétation, improvisation.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 52, "Manuel_EEA_7AF_Chapitre6.docx");
