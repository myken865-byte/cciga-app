// Manuel d'EEA 8e AF — Chapitre 6 : Jouer ensemble : chorale et orchestre
// (champ officiel : Musique, Axe 3 — Pratique instrumentale).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.57/63 (texte imprime p.56) : TABLEAU DE PROGRESSION explicitement
//     separe par annee (7e/8e/9e AF) — verifie en direct le 2026-08-23.
//     Colonne 8e AF, Pratique instrumentale, citee verbatim : "La flute a
//     bec alto" ; "La percussion" ; "Musique d'ensemble - Chorale -
//     Orchestre" ; "Chants traditionnels Haitiens". Colonne 9e AF (pour
//     memoire, NON traitee ici) : "Flute a bec (tenor et basse)" ;
//     "Introduction d'elements electroniques, d'enregistrement et/ou
//     d'ingenieries du son".
//   - p.61-62/63 : Unite d'apprentissage 3 (Pratique instrumentale),
//     tableau complet (full-cycle) — verifie en direct le 2026-08-22/23.
//     Competence ciblee officielle : TOUTES LES COMPETENCES (C1 a C8) —
//     seule unite du programme EEA a mobiliser l'integralite des 8
//     competences. Savoir officiel : "Theorie relative a un instrument
//     (flute a bec, voix, percussion)". Savoir-faire officiel : "Jouer un
//     instrument (seul ou en groupe)". Activites officielles : presentation
//     et tenue de l'instrument ; le doigte et mecanisme de l'instrument ;
//     exercices progressifs sur la technique de jeu ; interpretation de
//     pieces musicales.
//
// STATUT DE TRACABILITE : comme pour le Chapitre 5, le tableau de
// progression (p.57) separe explicitement les colonnes 7e/8e/9e AF — la
// flute a bec alto, la musique d'ensemble (chorale, orchestre) et les
// chants traditionnels haitiens sont donc confirmes [OFFICIEL - SOURCE
// MENFP VERIFIEE] pour la 8e AF precisement, sans reconstruction
// necessaire.
//
// CONTROLE DU PASSAGE 7e -> 8e AF (section 3 du prompt d'execution) : le
// Chapitre 6 de la 7e AF (deja redige et finalise, NON modifie ici) a
// traite la flute a bec SOPRANO, la voix et la percussion, dans une
// pratique INDIVIDUELLE ou en petit groupe informel — explicitement documente
// comme excluant la flute alto et la musique d'ensemble, reservees a la 8e
// AF (00_PHASE0/04_MATRICE_EEA_8AF.md). Ce Chapitre 6 de la 8e AF part de
// cet acquis (rappel bref, section 6.1) et introduit reellement la flute a
// bec ALTO et surtout la MUSIQUE D'ENSEMBLE — jouer en choeur (chorale) ou
// en petit orchestre, ce qui exige de s'harmoniser avec d'autres, une
// competence nouvelle par rapport a la pratique individuelle de la 7e AF.
// Aucune anticipation de la 9e AF : la flute a bec TENOR et BASSE, ainsi
// que l'introduction d'elements electroniques/enregistrement/ingenierie du
// son (reserves a la 9e AF selon le meme tableau, p.57), ne sont pas
// abordes dans ce chapitre.
//
// PATRIMOINE : "Chants traditionnels Haitiens" est un contenu officiel
// explicitement nomme comme CATEGORIE par la source pour la 8e AF (p.57) —
// contrairement aux chapitres precedents ou seule une formulation generique
// etait possible. Ce chapitre traite donc ce contenu comme [OFFICIEL -
// SOURCE MENFP VERIFIEE] pour la categorie elle-meme, mais SANS nommer de
// titre, compositeur ou date de chant precis non verifies — le choix d'un
// chant traditionnel specifique reste une decision locale de l'enseignant
// [CHOIX EDITORIAL], conformement a la mise en garde deja appliquee aux
// chapitres musicaux precedents.
//
// Adaptations de securite/hygiene : toute flute a bec partagee entre
// eleves doit etre nettoyee ou individuelle ; alternative systematique sans
// instrument (voix et percussion corporelle) prevue pour les eleves sans
// acces a une flute a bec alto.
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
  OUTREMER, OCRE, SAUGE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  6,
  "Jouer ensemble : chorale et orchestre",
  "L'an dernier, tu as joué et chanté seul ou avec un camarade. Cette année, tu vas apprendre quelque chose " +
  "de différent : faire sonner ta voix ou ton instrument avec tout un groupe, sans jamais couvrir les autres " +
  "— c'est ça, jouer ensemble.",
  [
    "Découvrir la flûte à bec alto et ce qui la distingue de la flûte soprano.",
    "Comprendre ce qu'est la musique d'ensemble : chorale et orchestre.",
    "Apprendre à s'harmoniser avec un groupe plutôt que jouer seul.",
    "Interpréter un chant traditionnel haïtien en petit groupe.",
    "Reconnaître le rôle de chacun dans une pratique musicale collective.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Aux Gonaïves, une classe de 8e AF se prépare pour la première fois à chanter " +
  "ensemble, en chorale, un chant que tout le monde connaît déjà. « Si je chante trop fort, est-ce que je " +
  "gâche tout ? » demande une élève. Son professeur répond : « Au contraire — aujourd'hui, tu vas apprendre à " +
  "écouter les autres autant qu'à chanter toi-même. »",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Flûte à bec alto — flûte à bec plus grande et plus grave que la flûte soprano, jouée avec un doigté proche mais adapté."));
children.push(bulletPar("Musique d'ensemble — pratique musicale collective où plusieurs musiciens jouent ou chantent ensemble."));
children.push(bulletPar("Chorale — groupe de personnes qui chantent ensemble, souvent réparties en plusieurs voix (pupitres)."));
children.push(bulletPar("Orchestre — groupe de musiciens qui jouent ensemble, généralement avec des instruments variés."));
children.push(bulletPar("S'harmoniser — ajuster sa voix ou son jeu à celui du groupe, pour que l'ensemble sonne juste et équilibré."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : jouer seul", "6.1"));
children.push(bodyPar(
  "L'an dernier, tu as découvert la flûte à bec soprano, la voix et la percussion, dans une pratique surtout " +
  "individuelle ou en tout petit groupe informel. Cette année, ce savoir devient la base d'une pratique " +
  "beaucoup plus collective.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("La flûte à bec alto", "6.2"));
children.push(bodyPar(
  "La flûte à bec alto ressemble à la flûte soprano que tu connais, mais elle est plus grande et produit des " +
  "sons plus graves. Le doigté de base reste proche, mais demande un souffle et une posture légèrement " +
  "adaptés à sa taille.",
));
children.push(calloutBox(
  "TECHNIQUE — Passer de la flûte soprano à la flûte alto",
  [
    "1. Observe la différence de taille entre les deux flûtes avant de jouer.",
    "2. Reprends la posture apprise l'an dernier (dos droit, embouchure sans mordre) en l'adaptant à la " +
    "taille plus grande de l'alto.",
    "3. Souffle avec un débit un peu plus soutenu, car l'instrument est plus grand.",
    "4. Retrouve d'abord une note stable et connue avant d'explorer de nouvelles notes.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C06-01",
  "Ouverture — De la flûte soprano à la flûte alto",
  "Une salle de classe haïtienne crédible (Gonaïves ou similaire) où des élèves de 8e AF comparent une flûte " +
  "à bec soprano et une flûte à bec alto, sous la supervision d'un enseignant.",
  "La flûte alto prolonge ce que tu connais déjà, avec un registre plus grave.",
  "Ouvrir le chapitre sur une comparaison concrète entre l'acquis de 7e AF et la nouveauté de 8e AF.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Qu'est-ce que la musique d'ensemble ?", "6.3"));
children.push(bodyPar(
  "Jouer seul et jouer en groupe ne demandent pas la même attention. La musique d'ensemble regroupe deux " +
  "grandes pratiques collectives : la chorale, où l'on chante à plusieurs, et l'orchestre, où l'on joue " +
  "ensemble avec des instruments.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Chorale et orchestre",
  [
    "Dans une chorale, les chanteurs sont souvent répartis en plusieurs voix (pupitres), qui se complètent " +
    "pour former un ensemble harmonieux.",
    "Dans un orchestre, chaque instrument (flûte, percussion, voix) joue un rôle précis, et personne ne doit " +
    "couvrir les autres.",
    "Dans les deux cas, le résultat collectif compte plus que la performance individuelle de chacun.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C06-02",
  "Exemple analysé — chorale et orchestre de classe",
  "Deux scènes côte à côte : à gauche, une chorale scolaire haïtienne en pupitres ; à droite, un petit " +
  "orchestre scolaire mêlant flûtes à bec et percussion, dans un cadre haïtien crédible.",
  "Chorale et orchestre sont deux formes différentes de musique d'ensemble.",
  "Donner un exemple visuel clair distinguant chorale et orchestre.",
  "Illustration demi-page, deux scènes comparatives, cohérentes avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("S'harmoniser avec le groupe", "6.4"));
children.push(bodyPar(
  "S'harmoniser, c'est ajuster sa voix ou son jeu à celui des autres. Cela demande une compétence nouvelle " +
  "par rapport à la pratique individuelle : écouter en jouant.",
));
children.push(calloutBox(
  "TECHNIQUE — Écouter pour mieux jouer ensemble",
  [
    "1. Avant de jouer fort, écoute d'abord le volume général du groupe.",
    "2. Cherche à t'intégrer au son collectif plutôt qu'à te faire remarquer individuellement.",
    "3. Reste attentif au signal du chef de chœur ou de l'enseignant pour commencer, ralentir ou s'arrêter " +
    "ensemble.",
    "4. Si tu te trompes, continue discrètement plutôt que de t'arrêter brusquement, ce qui perturberait le " +
    "groupe.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : une bonne pratique d'ensemble ne signifie pas jouer plus fort que les autres, mais " +
  "jouer avec les autres — la qualité du groupe compte plus que la performance individuelle.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C06-03",
  "Démonstration technique — s'harmoniser en groupe",
  "Une planche montrant un petit groupe d'élèves en cercle, certains chantant, d'autres jouant de la flûte à " +
  "bec, tous attentifs au geste d'un enseignant qui dirige le tempo.",
  "S'harmoniser demande d'écouter le groupe autant que de jouer sa propre partie.",
  "Montrer concrètement la pratique collective de l'écoute et de l'ajustement au groupe.",
  "Illustration demi-page, scène de classe haïtienne dynamique, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Un répertoire proche de nous", "6.5"));
children.push(bodyPar(
  "Pour pratiquer la musique d'ensemble, rien ne vaut un répertoire que le groupe connaît déjà. Le programme " +
  "officiel encourage justement l'interprétation de chants traditionnels haïtiens en musique d'ensemble.",
));
children.push(calloutBox(
  "PATRIMOINE — Les chants traditionnels haïtiens",
  [
    "Les chants traditionnels haïtiens font partie du patrimoine musical du pays et se prêtent bien à la " +
    "pratique en chorale ou en petit orchestre scolaire.",
    "Ton enseignant choisira, avec la classe, un chant traditionnel connu de votre région ou de votre " +
    "communauté, pour que l'apprentissage reste proche de votre culture.",
    "Ce manuel ne fixe volontairement aucun titre précis : le choix du chant appartient à ta classe et à ton " +
    "enseignant.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, SAUGE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Notre première interprétation collective"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Interpréter un chant traditionnel haïtien en musique d'ensemble (chorale et/ou petit orchestre), en s'harmonisant avec le groupe." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Voix de tous les élèves. Facultatif : flûtes à bec (soprano et/ou alto) et instruments de percussion disponibles." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "En classe entière ou en petits groupes, choisissez avec votre enseignant un chant traditionnel haïtien connu de tous." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Répartissez les rôles : voix (chorale), flûtes à bec, percussion, selon le matériel disponible."));
children.push(numberedPar("2. Entraînez-vous d'abord chacun séparément, comme en 7e AF."));
children.push(numberedPar("3. Réunissez-vous progressivement en petits groupes, puis en groupe complet, en vous écoutant les uns les autres."));
children.push(numberedPar("4. Ajustez ensemble le volume et le tempo, sous la direction de l'enseignant, jusqu'à obtenir un son collectif équilibré."));
children.push(numberedPar("5. Présentez votre interprétation collective devant un autre groupe ou une autre classe."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une interprétation collective reconnaissable d'un chant traditionnel haïtien, où chaque élève tient sa " +
  "partie sans couvrir le groupe.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Le groupe reste globalement synchronisé (même tempo, mêmes départs et arrêts)."));
children.push(bulletPar("Aucun élève ne cherche à couvrir systématiquement le reste du groupe."));
children.push(bulletPar("L'élève peut expliquer son rôle précis dans l'interprétation collective."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier collectif sans risque",
  [
    "Chaque flûte à bec doit être individuelle ou nettoyée avant d'être partagée, pour des raisons " +
    "d'hygiène.",
    "Ne jamais forcer sa voix pour « couvrir » le groupe, surtout dans l'aigu.",
    "Les répétitions collectives se font dans le calme, pour permettre à chacun de bien s'entendre et de " +
    "s'entendre avec les autres.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C06-04",
  "Espace de production — répartition des rôles dans le groupe",
  "Un tableau à compléter par l'élève, listant les membres de son groupe et le rôle de chacun (voix, flûte " +
  "soprano, flûte alto, percussion) pour l'interprétation du chant choisi.",
  "Offrir un espace direct pour organiser la répartition des rôles avant l'interprétation collective.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Tableau simple à deux colonnes, bordure fine ocre, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Écoute l'interprétation collective d'un autre groupe. Le groupe semble-t-il bien synchronisé ? Peux-tu " +
  "identifier les différents rôles (voix, instruments) ? Discutez ensemble de ce qui rend une interprétation " +
  "collective réussie.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La flûte à bec alto prolonge la pratique de la flûte soprano, avec un registre plus grave.",
    "La musique d'ensemble regroupe la chorale (chant collectif) et l'orchestre (instruments collectifs).",
    "S'harmoniser, c'est ajuster sa voix ou son jeu au groupe, en écoutant autant qu'en jouant.",
    "Les chants traditionnels haïtiens forment un répertoire officiel adapté à la musique d'ensemble scolaire.",
    "Dans une pratique collective, le résultat du groupe compte plus que la performance individuelle.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire une différence entre la flûte à bec soprano et la flûte à bec alto.",
    "☐ Expliquer la différence entre une chorale et un orchestre.",
    "☐ M'harmoniser avec un groupe sans chercher à le couvrir.",
    "☐ Tenir mon rôle dans une interprétation collective d'un chant traditionnel haïtien.",
    "☐ Expliquer pourquoi le résultat du groupe compte plus que la performance individuelle.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : flûte à bec alto, musique d'ensemble, chorale, orchestre, s'harmoniser, chant " +
    "traditionnel haïtien.",
    "Vocabulaire clé à maîtriser : musique d'ensemble, chorale, orchestre, s'harmoniser.",
    "Avant l'évaluation, vérifie que tu peux : distinguer chorale et orchestre ; expliquer ce que signifie " +
    "s'harmoniser ; décrire ton rôle dans le projet collectif du chapitre.",
    "L'évaluation de ce chapitre se fait principalement par observation de groupe, en particulier la qualité " +
    "de l'harmonisation collective [OUTIL PÉDAGOGIQUE].",
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
  "bec alto · musique d'ensemble · chorale · orchestre · s'harmoniser.",
  { italics: true },
));
children.push(numberedPar("1. Une flûte plus grande et plus grave que la flûte soprano s'appelle la ......................"));
children.push(numberedPar("2. Une pratique musicale collective où plusieurs musiciens jouent ensemble s'appelle la ......................"));
children.push(numberedPar("3. Un groupe de personnes qui chantent ensemble s'appelle une ......................"));
children.push(numberedPar("4. Un groupe de musiciens qui jouent ensemble avec des instruments variés s'appelle un ......................"));
children.push(numberedPar("5. Ajuster sa voix ou son jeu à celui du groupe, c'est ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Cite deux différences entre jouer seul (7e AF) et jouer en musique d'ensemble (8e AF)."));
children.push(numberedPar("2. Quel contenu officiel de ce chapitre existait déjà en 7e AF, et lequel est nouveau cette année ?"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment ton groupe pourrait passer d'un entraînement individuel à une interprétation collective réussie."));
children.push(numberedPar("2. Pourquoi est-il important de ne pas jouer plus fort que les autres dans une chorale ou un orchestre ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et expression"));
children.push(numberedPar("1. Compare la pratique individuelle de la 7e AF et la musique d'ensemble de la 8e AF : quelles compétences nouvelles cela demande-t-il ?"));
children.push(numberedPar("2. Un camarade chante toujours plus fort que le reste de la chorale. Que lui conseilles-tu ?"));
children.push(numberedPar("3. Propose un chant traditionnel de ta région que ta classe pourrait interpréter en musique d'ensemble, et explique pourquoi ce choix te semble adapté."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la flûte à bec alto, de comprendre ce qu'est la musique d'ensemble à " +
  "travers la chorale et l'orchestre, d'apprendre à s'harmoniser avec un groupe plutôt que de jouer seul, et " +
  "d'interpréter collectivement un chant traditionnel haïtien. Cette compétence à jouer ensemble prépare des " +
  "pratiques musicales collectives encore plus riches dans les années suivantes.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "flûte à bec alto · musique d'ensemble · chorale · orchestre · s'harmoniser · chant traditionnel haïtien.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C06-05",
  "Patrimoine — interpréter un chant traditionnel ensemble",
  "Une scène de classe haïtienne où un groupe d'élèves interprète collectivement un chant traditionnel, dans " +
  "une ambiance chaleureuse, sans qu'aucun titre précis de chant ne soit représenté ou nommé.",
  "L'interprétation collective d'un chant traditionnel renforce à la fois la technique musicale et le lien " +
  "au patrimoine.",
  "Illustrer la dimension collective et patrimoniale du chapitre sans fixer un chant précis.",
  "Illustration demi-page, scène de classe haïtienne, ambiance conviviale et musicale.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C06-06",
  "Synthèse — Jouer ensemble : chorale et orchestre",
  "Une carte mentale simple centrée sur « Musique d'ensemble », avec des branches vers : flûte alto, chorale, " +
  "orchestre, s'harmoniser, chants traditionnels haïtiens.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 51, "Manuel_EEA_8AF_Chapitre6.docx");
