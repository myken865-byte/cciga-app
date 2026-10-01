// Manuel d'EEA 9e AF — Chapitre 5 : Harmonie et écriture musicale
// (champ officiel : Musique, Axes 1-2 — Théorie musicale + Solfège,
// regroupés [CHOIX ÉDITORIAL] en un seul chapitre — même logique que les
// Chapitres 5 des manuels 7e et 8e AF).
//
// PREMIER CHAPITRE DE MUSIQUE DE LA 9e AF : ouvre la Partie II du manuel.
// Ce chapitre n'est PAS le dernier chapitre du manuel : l'architecture
// verrouillee en Phase 0 (00_PHASE0/09_TABLE_MATIERES_PROPOSEE_EEA_9AF.md)
// prevoit 7 chapitres au total (4 arts plastiques + 3 musique). Les
// Chapitres 6 ("Jouer, enregistrer, produire") et 7 ("Produire sa musique
// aujourd'hui") restent a rediger avant toute Phase Finale — point clarifie
// et confirme explicitement par l'utilisateur avant redaction de ce
// chapitre (le prompt d'execution qualifiait par erreur ce chapitre de
// "dernier chapitre").
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.56/63 : TABLEAU DE PROGRESSION explicitement separe par annee (7e/
//     8e/9e AF) — verifie en direct (deja capture lors de la redaction des
//     Chapitres 5 de la 8e AF et reconfirme ici). Colonne 9e AF, theorie
//     musicale, citee verbatim : "Les elements courants dans la
//     constitution de la musique haitienne. Initiation a l'ecriture
//     musicale. L'analyse musicale. Harmonie." Colonne 9e AF, solfege,
//     citee verbatim : "Renforcement des acquis de la 7e et 8e annees."
//   - p.59/63 : Unite 1 (Theorie musicale, full-cycle), savoir-faire cite
//     verbatim : "Construire, identifier et utiliser les accords selon les
//     regles de l'harmonie." Activite citee verbatim : "L'eleve apprend a
//     representer les sons musicaux a partir des signes de la notation
//     musicale. Il le fait de facon manuscrite, puis le transmet a partir
//     d'un logiciel..." Evaluation citee verbatim : "un examen de fin de
//     session permettra d'evaluer les acquis."
//   - p.60-61/63 : Unite 2 (Solfege, full-cycle), competences C2, C3, C4,
//     C6 (memes que le Chapitre 5 des manuels 7e/8e AF). Evaluation citee
//     verbatim : "Un examen final au cours duquel l'eleve aura a solfier
//     une ou plusieurs pieces de musique fera l'objet d'evaluation finale a
//     la fin de chaque session."
//
// STATUT DE TRACABILITE : comme pour les Chapitres 1 et 4 (arts
// plastiques), le tableau de progression separe explicitement les colonnes
// 7e/8e/9e AF pour cet axe — l'harmonie, l'ecriture musicale, l'analyse
// musicale et le renforcement du solfege sont donc confirmes [OFFICIEL -
// SOURCE MENFP VERIFIEE] pour la 9e AF precisement, sans reconstruction
// necessaire.
//
// CONTROLE DU PASSAGE 7e -> 8e -> 9e AF (section 3 du prompt d'execution) :
// le Chapitre 5 de la 7e AF (deja finalise, NON modifie ici) a couvert la
// notation de base, la gamme diatonique MAJEURE, la cle de SOL et les
// MESURES SIMPLES. Le Chapitre 5 de la 8e AF (deja finalise, NON modifie
// ici) a couvert la cle de FA, les MESURES COMPOSEES et la gamme MINEURE.
// Ce Chapitre 5 de la 9e AF part de ces deux acquis (rappel bref, section
// 5.1) et introduit reellement les ACCORDS et l'HARMONIE, l'ECRITURE
// MUSICALE MANUSCRITE (composer, pas seulement lire), et l'ANALYSE
// MUSICALE d'une piece — un aboutissement du cycle theorie/solfege, avec
// un RENFORCEMENT explicite des acquis de lecture/rythme des deux annees
// precedentes (officiellement nomme ainsi par la source pour le solfege 9e
// AF). Aucune anticipation du Chapitre 7 (MAO) : l'ecriture musicale reste
// ici manuscrite, sans enseigner de logiciel de composition — simple
// mention que cet outil existera plus tard.
//
// PATRIMOINE : "les elements courants dans la constitution de la musique
// haitienne" est un contenu officiel (p.56), mais la source ne precise
// aucun element musicologique specifique (rythme, mode, genre nomme). Ce
// chapitre transforme donc ce contenu en une INVITATION A L'ECOUTE ET A LA
// RECHERCHE guidee par l'enseignant, plutot qu'en une affirmation
// musicologique precise non verifiee — meme prudence deja appliquee aux
// chapitres musicaux precedents (mélodies du terroir, musique classique
// haitienne).
//
// Adaptations de securite : aucune activite dangereuse ; ecriture manuscrite
// et pratique vocale, accessibles sans materiel couteux.
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
  "Harmonie et écriture musicale",
  "Tu sais déjà lire et chanter une mélodie, en clé de Sol comme en clé de Fa. Cette année, tu vas apprendre " +
  "à faire sonner plusieurs notes ensemble — et surtout, à écrire toi-même une musique qui n'existait pas " +
  "avant que tu la composes.",
  [
    "Construire des accords simples et comprendre le principe de l'harmonie.",
    "Écrire, de façon manuscrite, une courte mélodie originale sur une portée.",
    "Analyser une pièce musicale à partir de ses notes, son rythme et ses accords.",
    "Renforcer et consolider tes acquis de lecture et de rythme des deux années précédentes.",
    "Justifier tes choix musicaux dans une composition personnelle.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école de Saint-Marc, une classe de 9e AF écoute son enseignant jouer une " +
  "même mélodie de deux façons : seule, puis accompagnée de quelques notes supplémentaires jouées en même " +
  "temps. « La deuxième version semble plus riche, plus complète », remarque une élève. « C'est exactement " +
  "ça l'harmonie », répond l'enseignant. « Et aujourd'hui, tu vas apprendre à la construire toi-même — et à " +
  "écrire ta propre musique. »",
  { italics: true },
));

children.push(subHeading("Prérequis"));
children.push(bodyPar(
  "Ce chapitre suppose que tu maîtrises déjà la lecture des notes en clé de Sol (7e AF) et en clé de Fa " +
  "(8e AF), les mesures simples et composées, ainsi que les gammes majeure et mineure. Ces acquis sont " +
  "directement réactivés et consolidés dans ce chapitre.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Accord — ensemble d'au moins trois notes jouées ou entendues en même temps."));
children.push(bulletPar("Harmonie — art de combiner des accords entre eux pour accompagner ou enrichir une mélodie."));
children.push(bulletPar("Écriture musicale — action de noter une musique sur une portée, à la main, pour qu'elle puisse être lue et rejouée."));
children.push(bulletPar("Analyse musicale — étude méthodique des éléments (notes, rythme, gamme, accords) qui composent une pièce musicale."));
children.push(bulletPar("Renforcement — consolidation d'un acquis déjà appris, par la pratique répétée et approfondie."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel et renforcement : deux années de lecture musicale", "5.1"));
children.push(bodyPar(
  "En 7e AF, tu as appris à lire en clé de Sol, sur des mesures simples, dans la gamme majeure. En 8e AF, tu " +
  "as ajouté la clé de Fa, les mesures composées et la gamme mineure. Cette année, le programme officiel " +
  "prévoit explicitement un renforcement de ces acquis : reprends une courte mélodie déjà travaillée les " +
  "années précédentes et relis-la, dans les deux clés si possible, pour t'assurer que ces bases restent " +
  "solides avant d'aller plus loin.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les accords et l'harmonie", "5.2"));
children.push(bodyPar(
  "Un accord réunit plusieurs notes jouées ensemble. Construire un accord simple, dit « accord parfait », " +
  "consiste à empiler trois notes précises à partir d'une note de départ, en suivant la structure de la " +
  "gamme.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Construire un accord parfait",
  [
    "Choisis une note de départ dans la gamme (par exemple Do).",
    "Ajoute la troisième note de la gamme à partir de ce départ (Mi).",
    "Ajoute la cinquième note de la gamme à partir de ce départ (Sol).",
    "Ensemble, Do-Mi-Sol forment un accord parfait : selon l'écart entre les notes, l'accord sonnera majeur " +
    "ou mineur.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));
children.push(bodyPar(
  "Faire de l'harmonie, c'est choisir et enchaîner plusieurs accords pour accompagner une mélodie, de façon à " +
  "l'enrichir sans la couvrir.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C05-01",
  "Ouverture — D'une mélodie seule à une mélodie harmonisée",
  "Une salle de classe haïtienne crédible (Saint-Marc ou similaire) où un enseignant joue un petit instrument " +
  "devant des élèves de 9e AF attentifs, avec deux portées visibles au tableau : une mélodie seule et la " +
  "même mélodie accompagnée d'accords.",
  "L'harmonie enrichit une mélodie sans la remplacer.",
  "Ouvrir le chapitre sur une scène concrète comparant mélodie seule et mélodie harmonisée.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EEA.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C05-02",
  "Exemple analysé — construire un accord parfait",
  "Une portée annotée montrant la construction d'un accord parfait (Do-Mi-Sol) à partir de la gamme " +
  "diatonique majeure, avec des flèches numérotées indiquant chaque étape de construction.",
  "Un accord se construit par étapes précises à partir d'une note de départ.",
  "Donner un exemple visuel de référence pour la construction d'un accord parfait.",
  "Illustration demi-page, portée musicale annotée, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Écrire sa propre musique", "5.3"));
children.push(bodyPar(
  "Jusqu'ici, tu as surtout appris à lire une musique déjà écrite par quelqu'un d'autre. Ce chapitre t'invite " +
  "à faire l'inverse : écrire, à la main, une courte mélodie originale que d'autres pourront ensuite lire et " +
  "jouer.",
));
children.push(calloutBox(
  "TECHNIQUE — Écrire une mélodie sur une portée",
  [
    "1. Choisis une gamme de départ (majeure ou mineure) et une clé (Sol ou Fa).",
    "2. Choisis un rythme simple ou composé pour ta mélodie, et décide de sa longueur (par exemple 4 à 8 " +
    "mesures).",
    "3. Place tes notes sur la portée, une à une, en respectant à la fois la hauteur et la durée voulues.",
    "4. Rejoue ta mélodie (en la chantant ou en la jouant) pour vérifier qu'elle correspond bien à ce que tu " +
    "avais imaginé, et corrige si nécessaire.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Note : plus tard, tu pourras aussi écrire de la musique à l'aide d'un logiciel informatique — mais ce " +
  "chapitre se concentre volontairement sur l'écriture manuscrite, qui reste la base de toute composition, " +
  "avec ou sans ordinateur.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C05-03",
  "Démonstration technique — de l'idée à la portée écrite",
  "Une planche en deux étapes montrant d'abord une mélodie imaginée notée sommairement (croix, gribouillis " +
  "rythmiques), puis sa version finale proprement écrite sur une portée avec clé et mesures.",
  "Une composition part souvent d'une idée informelle avant de devenir une écriture musicale précise.",
  "Montrer concrètement le passage de l'idée musicale à l'écriture formelle sur portée.",
  "Illustration demi-page, planche pédagogique en 2 étapes, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Analyser une pièce musicale", "5.4"));
children.push(bodyPar(
  "Analyser une pièce musicale, c'est l'observer avec méthode : identifier sa gamme, son rythme, les accords " +
  "qu'elle utilise, et la façon dont ces éléments s'organisent ensemble.",
));
children.push(bodyPar("FICHE D'ANALYSE MUSICALE — À compléter :", { bold: true }));
children.push(threeColTable(
  ["Élément analysé", "Ce que j'observe", "Mon interprétation"],
  [
    ["Gamme (majeure ou mineure)", "", ""],
    ["Type de mesure (simple ou composée)", "", ""],
    ["Accords ou notes jouées ensemble", "", ""],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(160));
children.push(bodyPar(
  "Utilise cette fiche pour analyser une pièce que ton enseignant te fait écouter ou jouer, ou pour analyser " +
  "ta propre composition une fois terminée.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "ÉCOUTER — La musique haïtienne, une matière à analyser",
  [
    "Le programme officiel invite à repérer des éléments courants dans la constitution de la musique " +
    "haïtienne — rythmes, structures, façons de construire une mélodie.",
    "Ce chapitre ne t'impose aucun exemple précis : choisis, avec ton enseignant, une pièce musicale " +
    "haïtienne que tu connais bien, et applique-lui la fiche d'analyse de la section 5.4.",
    "Cette démarche d'écoute active complète l'analyse technique : elle relie ce que tu apprends en théorie " +
    "à la musique que tu entends réellement autour de toi.",
  ],
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE, "5A2A1E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ma première composition"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Composer, écrire et analyser une courte mélodie originale, accompagnée d'un accord simple." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Une portée vierge (dessinée ou fournie), crayon. Ta voix ou un instrument disponible pour rejouer ta composition." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Compose une mélodie originale de 4 à 8 mesures, dans la gamme et la clé de ton choix." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Choisis ta gamme (majeure ou mineure), ta clé (Sol ou Fa) et ton type de mesure (simple ou composée)."));
children.push(numberedPar("2. Compose ta mélodie et écris-la proprement sur la portée."));
children.push(numberedPar("3. Choisis un accord simple (par exemple l'accord parfait construit sur la première note de ta gamme) pour accompagner ta mélodie."));
children.push(numberedPar("4. Rejoue ta composition (chantée ou jouée) pour vérifier qu'elle correspond à ce que tu as écrit."));
children.push(numberedPar("5. Complète la fiche d'analyse musicale (section 5.4) pour ta propre composition."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une courte mélodie originale, correctement écrite sur portée, accompagnée d'un accord simple, et analysée " +
  "par l'élève lui-même à l'aide de la fiche du chapitre.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La mélodie est écrite lisiblement, avec une clé, une gamme et un rythme cohérents."));
children.push(bulletPar("L'accord d'accompagnement choisi est correctement construit."));
children.push(bulletPar("L'élève peut rejouer et analyser sa propre composition avec le vocabulaire du chapitre."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier d'écriture sans risque",
  [
    "L'écriture musicale manuscrite ne présente aucun danger particulier.",
    "Si la composition est chantée, veiller simplement à ne pas forcer sa voix.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C05-04",
  "Espace de production — ma composition originale",
  "Une portée vierge avec clé de Sol et clé de Fa disponibles au choix, prévue pour que l'élève y écrive " +
  "directement sa mélodie originale et l'accord d'accompagnement choisi.",
  "Offrir un espace direct de production pour ancrer la pratique de l'écriture musicale dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Portée simple avec deux clés au choix, bordure fine ocre, format paysage demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Échange ta composition avec un camarade et essayez de rejouer la mélodie de l'autre à partir de son " +
  "écriture, sans qu'il te la chante d'abord. Ton écriture était-elle assez claire pour être comprise ? " +
  "Discutez ensemble de ce qui rend une écriture musicale facile ou difficile à lire.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un accord réunit plusieurs notes jouées ensemble ; l'harmonie consiste à enchaîner des accords pour " +
    "accompagner une mélodie.",
    "Écrire de la musique, c'est noter une mélodie sur une portée pour qu'elle puisse être lue et rejouée " +
    "par d'autres.",
    "Analyser une pièce musicale suppose d'observer sa gamme, son rythme et ses accords.",
    "Le renforcement des acquis de lecture (clé de Sol/Fa, mesures simples/composées) reste essentiel en " +
    "fin de cycle.",
    "La musique haïtienne peut, elle aussi, être analysée avec les mêmes outils théoriques que toute autre " +
    "musique.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Construire un accord parfait simple à partir d'une gamme.",
    "☐ Écrire une courte mélodie originale sur une portée.",
    "☐ Analyser une pièce musicale à partir de sa gamme, son rythme et ses accords.",
    "☐ Relire une mélodie en clé de Sol et en clé de Fa sans hésitation majeure.",
    "☐ Justifier mes choix musicaux dans ma propre composition.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : accord, harmonie, écriture musicale, analyse musicale, renforcement.",
    "Vocabulaire clé à maîtriser : accord, harmonie, écriture musicale, analyse musicale.",
    "Avant l'évaluation, vérifie que tu peux : construire un accord parfait ; écrire une courte mélodie " +
    "lisible ; analyser une pièce simple à l'aide de la fiche du chapitre.",
    "Rappel officiel : ce chapitre fait l'objet d'une évaluation sommative de fin de cycle, en cohérence " +
    "avec l'examen final de solfège déjà annoncé les années précédentes [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : accord · " +
  "harmonie · écriture musicale · analyse musicale · renforcement.",
  { italics: true },
));
children.push(numberedPar("1. Un ensemble d'au moins trois notes jouées en même temps s'appelle un ......................"));
children.push(numberedPar("2. L'art de combiner des accords pour accompagner une mélodie s'appelle l'......................"));
children.push(numberedPar("3. Noter une musique sur une portée pour qu'elle puisse être lue et rejouée s'appelle l'......................"));
children.push(numberedPar("4. Étudier méthodiquement les éléments qui composent une pièce musicale, c'est faire une ......................"));
children.push(numberedPar("5. Consolider un acquis déjà appris par la pratique répétée s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Explique, avec tes mots, les trois étapes de construction d'un accord parfait à partir d'une gamme."));
children.push(numberedPar("2. Rappelle la différence entre une mesure simple et une mesure composée (acquis de 8e AF)."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Construis un accord parfait à partir de la note Fa, en indiquant les trois notes qui le composent."));
children.push(numberedPar("2. Décris, en trois étapes, comment tu écrirais une courte mélodie originale sur une portée."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare la lecture d'une musique déjà écrite et l'écriture d'une musique originale : quelles compétences supplémentaires demande la composition ?"));
children.push(numberedPar("2. Un camarade a écrit une mélodie, mais personne d'autre n'arrive à la lire correctement. Que lui conseilles-tu ?"));
children.push(numberedPar("3. Analyse une courte pièce musicale de ton choix (haïtienne ou non) à l'aide de la fiche d'analyse du chapitre, et résume tes observations."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la construction d'accords simples et le principe de l'harmonie, " +
  "d'apprendre à écrire une mélodie originale sur une portée, d'analyser une pièce musicale à l'aide d'une " +
  "grille méthodique, et de renforcer les acquis de lecture des deux années précédentes (clé de Sol, clé de " +
  "Fa, mesures simples et composées, gammes majeure et mineure). Ce premier chapitre de musique de la 9e AF " +
  "achève le cycle théorie/solfège et prépare les chapitres suivants, consacrés à la pratique instrumentale " +
  "avancée et à la production musicale.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "accord · harmonie · écriture musicale · analyse musicale · renforcement.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C05-05",
  "Patrimoine — analyser une pièce musicale haïtienne",
  "Une scène de classe haïtienne où des élèves de 9e AF écoutent attentivement une pièce musicale tout en " +
  "complétant une fiche d'analyse, sans qu'aucune œuvre ou compositeur précis ne soit représenté ou nommé.",
  "La musique haïtienne peut être analysée avec les mêmes outils que toute autre musique étudiée en classe.",
  "Illustrer la dimension patrimoniale et analytique du chapitre sans fixer une œuvre précise.",
  "Illustration demi-page, scène de classe haïtienne, ambiance concentrée et musicale.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C05-06",
  "Synthèse — Harmonie et écriture musicale",
  "Une carte mentale simple centrée sur « Harmonie et écriture », avec des branches vers : accords, " +
  "harmonie, écriture musicale, analyse musicale, renforcement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 41, "Manuel_EEA_9AF_Chapitre5.docx");
