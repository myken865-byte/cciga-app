// Manuel d'EEA 9e AF — Chapitre 3 : L'art à l'ère du numérique
// (champ officiel : Arts plastiques et visuels, Axe 3 — Construction en
// volume / nouvelles technologies / projets interdisciplinaires).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), Unite d'apprentissage 3, p.45-48/63 —
//   verifie en direct le 2026-08-23.
//
// STATUT DE L'ATTRIBUTION ANNEE : comme pour le Chapitre 2, le tableau de
// progression de l'Axe 3 (p.38-40, "3E PERIODE") ne remplit que les
// colonnes 7e AF (sculpture, modelage, poterie/architecture antique) et 8e
// AF (projets interdisciplinaires langues/sciences, decoration
// d'evenements) — AUCUNE colonne 9e AF distincte n'y apparait, verifie en
// direct. L'attribution de ce chapitre a la 9e AF repose donc sur la
// portion la plus avancee du tableau complet de l'Unite 3 (activite D,
// p.46 ; savoirs/savoir-faire technologiques, p.46-47), marquee
// [ADAPTATION DE LECTURE - A RECONFIRMER], deja documentee ainsi dans
// 00_PHASE0/05_MATRICE_EEA_9AF.md. Le contenu lui-meme est verbatim present
// dans la source.
//
// Contenu officiel repris fidelement : Activite D (p.46) : "Projet
// Impliquant les maths, l'ETAP ou les sciences sociales... Etude du design
// des maisons haitiennes, ex : le style Gingerbread d'Haiti." Savoir cite
// verbatim (p.47) : "Role des logiciels de design et des imprimantes «3D»
// dans les creations artistiques nouvelles." Savoir-faire cite verbatim
// (p.47) : "Etudier la composition et l'agencement des couleurs dans le
// design decoratif (design interieur)." Attitude citee verbatim (p.48) :
// "Ouverture vers la perspective simple et l'observation de l'architecture
// – L'architecture du patrimoine haitien." Competence C7 citee verbatim
// (p.45) : "il/elle explore quand possible des logiciels pour la creation
// en trois dimensions, l'animation, le «3D», etc." Competence C8 citee
// verbatim (p.46) : "Il prend connaissance de l'impact des nouvelles
// technologies dans la creation artistique virtuelle et 3D. Il comprend
// l'importance de l'imprimante dans l'evolution des arts visuels (la
// peinture numerique et l'animation «3D», l'architecture et toutes autres
// nouvelles technologies.)" Evaluation citee verbatim (p.48) : "Il/elle
// peut expliquer les processus utilises de transposition et de jumelage
// d'idees interdisciplinaires et ceux de decoration d'espace pour des
// evenements scolaires ou communautaires."
//
// COMPETENCES : la table des matieres verrouillee (comme les Chapitres 3
// des manuels 7e et 8e AF) retient C1, C2, C3, C5, C6, C7, C8 pour ce
// chapitre — C4 ("Travailler en equipe") figure pourtant explicitement
// parmi les competences officielles completes de l'Unite 3 (p.45), mais
// n'est pas repris dans le sous-ensemble verrouille en Phase 0, choix deja
// applique de facon identique aux deux chapitres 3 precedents. Non modifie
// ici, signale par transparence.
//
// PROTECTION DES CHAPITRES ET MANUELS ANTERIEURS — CONTROLE ANTI-REPETITION :
// le Chapitre 3 de la 7e AF (deja finalise, NON modifie ici) a traite les
// techniques de sculpture/modelage et la reference a la poterie/
// architecture de l'Antiquite (activite A). Le Chapitre 3 de la 8e AF (deja
// finalise, NON modifie ici) a traite les projets interdisciplinaires avec
// les langues et les sciences, le lettrage et l'interpretation d'elements
// naturels (activite B). CE CHAPITRE NE REPREND NI L'UN NI L'AUTRE : il
// developpe la portion technologique et architecturale de l'Unite 3,
// totalement absente des deux chapitres precedents (activites C et D :
// decoration/amenagement d'espace, projet maths/ETAP/sciences sociales,
// logiciels de design, impression "3D", architecture patrimoniale
// haitienne).
//
// PATRIMOINE : le "style Gingerbread d'Haiti" est cite tel quel par la
// source (p.46), sans qu'aucune ville, quartier ou batiment precis ne soit
// nomme. Ce chapitre ne fixe donc aucun lieu precis (aucune ville ou
// quartier nomme), conformement a la regle anti-invention — les eleves
// sont invites a observer un quartier ancien reellement accessible dans
// leur propre environnement.
//
// Adaptations de securite : materiel de croquis/maquette (papier, carton,
// colle non toxique) ; aucun outil dangereux ; alternative papier
// systematique pour les logiciels/imprimantes 3D, non garantis accessibles
// dans le contexte scolaire haitien ("explore quand possible" — source,
// p.45).
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
  OUTREMER, OCRE, SAUGE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  3,
  "L'art à l'ère du numérique",
  "La sculpture et le volume ne se limitent plus à l'argile ou au bois : aujourd'hui, un logiciel ou une " +
  "imprimante peuvent eux aussi donner forme à une idée. Ce chapitre t'invite à observer comment les " +
  "nouvelles technologies transforment la création artistique — et comment le patrimoine architectural " +
  "haïtien continue d'inspirer, même à l'ère du numérique.",
  [
    "Comprendre le rôle des logiciels de design et des imprimantes « 3D » dans la création artistique.",
    "Observer et analyser un style architectural patrimonial haïtien.",
    "Réaliser un croquis d'observation architecturale précis.",
    "Réaliser un projet interdisciplinaire reliant les arts à d'autres matières (mathématiques, ETAP, " +
    "sciences sociales).",
    "Travailler en équipe pour mener à bien un projet de recherche architecturale.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Une classe de 9e AF se promène dans un quartier ancien de sa ville et remarque des " +
  "maisons aux façades ouvragées, aux couleurs vives et aux détails en bois sculpté, très différentes des " +
  "constructions modernes environnantes. « On dirait des maisons de conte de fées », dit un élève. Son " +
  "enseignant sourit : « On appelle ce style « Gingerbread ». Aujourd'hui, tu vas apprendre à l'observer, à " +
  "le comprendre, et à voir comment la technologie pourrait aujourd'hui aider à le faire vivre autrement. »",
  { italics: true },
));

children.push(subHeading("Prérequis"));
children.push(bodyPar(
  "Ce chapitre suppose que tu maîtrises déjà les techniques de base de la construction en volume (modelage, " +
  "assemblage, matériaux de récupération, 7e AF) et que tu as l'habitude de mener un projet reliant les arts " +
  "visuels à d'autres matières scolaires (interdisciplinarité, 8e AF). Ces deux acquis servent directement le " +
  "projet de ce chapitre.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Style Gingerbread — style architectural haïtien caractérisé par des façades en bois ouvragé, des couleurs vives et une décoration abondante."));
children.push(bulletPar("Logiciel de design — programme informatique permettant de concevoir et de modifier des formes ou des plans numériquement."));
children.push(bulletPar("Impression « 3D » — technique de fabrication qui construit un objet en volume, couche par couche, à partir d'un modèle numérique."));
children.push(bulletPar("Design intérieur — discipline qui organise l'espace, les couleurs et les matières à l'intérieur d'un lieu."));
children.push(bulletPar("Croquis architectural — dessin rapide et précis destiné à observer et à documenter les caractéristiques d'un bâtiment."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : du volume artisanal au volume interdisciplinaire", "3.1"));
children.push(bodyPar(
  "En 7e AF, tu as appris à construire en volume avec des techniques artisanales (modelage, assemblage). En " +
  "8e AF, tu as appris à relier les arts visuels à d'autres matières scolaires. Cette année, ces deux acquis " +
  "se rejoignent autour d'un projet plus vaste : observer un patrimoine architectural réel et comprendre le " +
  "rôle des nouvelles technologies dans la création.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("L'impact des nouvelles technologies sur la création", "3.2"));
children.push(bodyPar(
  "Les logiciels de design et les imprimantes « 3D » transforment la façon dont un artiste ou un artisan peut " +
  "aujourd'hui concevoir et fabriquer une forme en volume — sans remplacer les techniques traditionnelles, " +
  "mais en leur offrant de nouveaux outils.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Deux outils numériques au service du volume",
  [
    "Un logiciel de design permet de concevoir une forme à l'écran, de la faire pivoter, de tester des " +
    "proportions, avant même de la fabriquer.",
    "Une imprimante « 3D » construit ensuite un objet réel, couche par couche, à partir de ce modèle " +
    "numérique.",
    "Ces outils ne sont pas toujours disponibles dans toutes les écoles : ce chapitre t'apprend à en " +
    "comprendre le principe, que tu puisses ou non les utiliser directement.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C03-01",
  "Ouverture — Un quartier au patrimoine architectural",
  "Une rue haïtienne crédible bordée de maisons anciennes richement ouvragées (style Gingerbread stylisé), " +
  "observées par des élèves de 9e AF munis de carnets de croquis, sans nommer de ville ou de quartier précis.",
  "Le patrimoine architectural haïtien s'observe directement dans l'environnement de l'élève.",
  "Ouvrir le chapitre sur une scène concrète ancrant l'observation architecturale.",
  "Illustration pleine largeur, scène de rue haïtienne patrimoniale, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le patrimoine architectural haïtien : le style Gingerbread", "3.3"));
children.push(bodyPar(
  "Haïti possède un patrimoine architectural reconnu : le style dit « Gingerbread » (littéralement « pain " +
  "d'épices »), caractérisé par des façades en bois richement ouvragé, des couleurs vives et une décoration " +
  "abondante, rappelant la pâtisserie qui lui donne son nom.",
));
children.push(calloutBox(
  "PATRIMOINE — Observer le style Gingerbread",
  [
    "Façades en bois découpé et sculpté, souvent en dentelle de bois.",
    "Toits pentus, tourelles, vérandas et balcons ouvragés.",
    "Couleurs vives, contrastant avec le vert de la végétation environnante.",
    "Ce style se trouve dans certains quartiers anciens de villes haïtiennes ; observe s'il en existe un " +
    "exemple accessible près de chez toi.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, SAUGE,
));
children.push(spacer(200));

children.push(calloutBox(
  "TECHNIQUE — Réaliser un croquis architectural",
  [
    "1. Choisis un bâtiment (ou une photographie de bâtiment) que tu peux observer clairement.",
    "2. Trace d'abord les grandes lignes de la structure (toit, murs, ouvertures) avant les détails.",
    "3. Ajoute progressivement les éléments décoratifs (bois ouvragé, balcons, couleurs) une fois la " +
    "structure posée.",
    "4. Note en marge les proportions approximatives (par exemple, la hauteur du toit par rapport à la " +
    "façade).",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C03-02",
  "Exemple analysé — les caractéristiques du style Gingerbread",
  "Un croquis architectural annoté d'une maison stylisée de style Gingerbread, avec des légendes identifiant " +
  "les éléments caractéristiques (bois ouvragé, toit pentu, véranda, couleurs vives), sans reproduire un " +
  "bâtiment réel précis.",
  "Le style Gingerbread se reconnaît à un ensemble précis de caractéristiques architecturales.",
  "Donner un exemple visuel de référence annoté pour l'observation architecturale.",
  "Illustration demi-page, croquis architectural annoté, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Du croquis à la maquette numérique (ou papier)", "3.4"));
children.push(bodyPar(
  "Une fois un bâtiment observé et croqué, il est possible d'en imaginer une version simplifiée en volume — " +
  "soit à l'aide d'un logiciel de conception en trois dimensions si l'école y a accès, soit avec une maquette " +
  "en papier ou en carton, qui reste tout aussi valable pour comprendre la construction en volume.",
));
children.push(bodyPar(
  "Alternative sans ordinateur : si aucun logiciel ni imprimante « 3D » n'est disponible, réalise une petite " +
  "maquette en papier ou en carton reproduisant les grandes lignes de ton croquis architectural — la " +
  "réflexion sur le volume et les proportions reste identique.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C03-03",
  "Démonstration technique — du croquis à la maquette",
  "Une planche en deux étapes montrant un croquis architectural de style Gingerbread, puis sa traduction en " +
  "une maquette simple en papier/carton, sans reproduire un bâtiment réel précis.",
  "Un croquis d'observation peut se transformer en une véritable production en volume.",
  "Montrer concrètement le passage du croquis à la maquette, avec ou sans outil numérique.",
  "Illustration demi-page, planche pédagogique en 2 étapes, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Étudier une maison de style Gingerbread"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Mener un projet interdisciplinaire (arts, mathématiques, ETAP, sciences sociales) autour de l'étude d'un bâtiment de style Gingerbread ou d'un autre bâtiment patrimonial accessible." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Carnet de croquis, crayon. Facultatif : carton, colle non toxique pour une maquette, ou logiciel de design si disponible." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "En équipe, choisissez un bâtiment ancien accessible (réel ou en photographie) et répartissez les tâches suivantes entre les membres du groupe." }]));
children.push(bodyPar("ÉTAPES (projet interdisciplinaire en équipe) :", { bold: true }));
children.push(numberedPar("1. ARTS : réalise un croquis architectural précis et annoté du bâtiment choisi."));
children.push(numberedPar("2. MATHÉMATIQUES : estime et note les proportions générales du bâtiment (rapport hauteur/largeur, proportions du toit)."));
children.push(numberedPar("3. ETAP : réfléchis aux matériaux de construction utilisés (bois, couleurs, techniques d'assemblage) et à leur entretien."));
children.push(numberedPar("4. SCIENCES SOCIALES : recherche le contexte de construction de ce type de bâtiment dans ta communauté (période, usage d'origine, usage actuel)."));
children.push(numberedPar("5. Réunissez vos observations dans une courte présentation d'équipe, avec croquis à l'appui."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Un dossier d'équipe réunissant un croquis architectural annoté, des observations mathématiques, " +
  "techniques et sociales sur le bâtiment étudié, présenté brièvement à la classe.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Le croquis architectural est précis et identifie clairement les caractéristiques du bâtiment."));
children.push(bulletPar("Chaque discipline (maths, ETAP, sciences sociales) est représentée par une observation concrète."));
children.push(bulletPar("L'équipe peut expliquer et jumeler ses observations lors de la présentation."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un projet d'observation sans risque",
  [
    "L'observation d'un bâtiment se fait toujours en groupe et sous supervision, sans pénétrer dans une " +
    "propriété privée sans autorisation.",
    "Le matériel de maquette (papier, carton, colle non toxique) ne présente aucun danger particulier.",
    "Si aucune sortie n'est possible, une photographie ou une image fournie par l'enseignant permet de " +
    "réaliser le même travail depuis la salle de classe.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C03-04",
  "Espace de production — mon dossier d'équipe",
  "Un cadre vide, format portrait, divisé en quatre zones (arts, mathématiques, ETAP, sciences sociales), " +
  "prévu pour que l'équipe y réunisse directement ses observations dans le manuel.",
  "Offrir un espace direct de production pour ancrer la démarche interdisciplinaire dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre à quatre zones, bordure fine ocre, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présentez votre dossier d'équipe à un autre groupe. Ont-ils choisi un bâtiment similaire ou très " +
  "différent ? Discutez de ce que la comparaison de vos deux bâtiments révèle sur la diversité du patrimoine " +
  "architectural de votre région.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Les logiciels de design et les imprimantes « 3D » offrent de nouveaux outils à la création en volume, " +
    "sans remplacer les techniques traditionnelles.",
    "Le style Gingerbread haïtien se reconnaît à ses façades en bois ouvragé, ses couleurs vives et sa " +
    "décoration abondante.",
    "Un croquis architectural précis observe d'abord la structure générale, puis les détails.",
    "Une maquette en papier ou en carton permet d'explorer le volume même sans accès à un logiciel ou une " +
    "imprimante « 3D ».",
    "Un projet interdisciplinaire réunit plusieurs regards (arts, maths, ETAP, sciences sociales) sur un " +
    "même sujet.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer le rôle d'un logiciel de design et d'une imprimante « 3D » dans la création artistique.",
    "☐ Décrire les caractéristiques du style architectural Gingerbread haïtien.",
    "☐ Réaliser un croquis architectural précis et annoté.",
    "☐ Contribuer à un projet interdisciplinaire reliant les arts à d'autres matières.",
    "☐ Travailler en équipe pour mener à bien une recherche architecturale.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : style Gingerbread, logiciel de design, impression « 3D », design intérieur, " +
    "croquis architectural, projet interdisciplinaire.",
    "Vocabulaire clé à maîtriser : style Gingerbread, logiciel de design, impression « 3D ».",
    "Avant l'évaluation, vérifie que tu peux : citer trois caractéristiques du style Gingerbread ; expliquer " +
    "la différence entre un logiciel de design et une imprimante « 3D » ; nommer les quatre disciplines " +
    "mobilisées dans le projet du chapitre.",
    "L'évaluation de ce chapitre porte sur le projet interdisciplinaire réalisé en équipe : capacité à " +
    "expliquer la transposition et le jumelage des observations entre disciplines [OFFICIEL — SOURCE MENFP " +
    "VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : style " +
  "Gingerbread · logiciel de design · impression « 3D » · design intérieur · croquis architectural.",
  { italics: true },
));
children.push(numberedPar("1. Un style architectural haïtien aux façades en bois ouvragé s'appelle le ......................"));
children.push(numberedPar("2. Un programme permettant de concevoir une forme numériquement s'appelle un ......................"));
children.push(numberedPar("3. Une technique de fabrication construisant un objet couche par couche à partir d'un modèle numérique s'appelle l'......................"));
children.push(numberedPar("4. La discipline qui organise l'espace et les couleurs à l'intérieur d'un lieu s'appelle le ......................"));
children.push(numberedPar("5. Un dessin rapide destiné à observer un bâtiment s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Cite trois caractéristiques visuelles du style Gingerbread mentionnées dans ce chapitre."));
children.push(numberedPar("2. Cite deux domaines artistiques (autres que l'architecture) où les nouvelles technologies jouent un rôle, selon ce chapitre."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment tu réaliserais le croquis d'un bâtiment ancien de ta région."));
children.push(numberedPar("2. Pourquoi une maquette en papier reste-t-elle utile même si l'on n'a pas accès à un logiciel de design ou à une imprimante « 3D » ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare une sculpture réalisée à la main (7e AF) et un objet conçu par ordinateur puis imprimé en « 3D » : qu'est-ce qui change réellement dans le processus de création ?"));
children.push(numberedPar("2. Une équipe n'a pas réussi à relier ses observations en mathématiques et en sciences sociales à son croquis architectural. Que lui conseilles-tu ?"));
children.push(numberedPar("3. Décris un bâtiment ancien de ta région (autre que ceux présentés dans ce chapitre) que tu aimerais étudier dans un futur projet interdisciplinaire, et explique pourquoi."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir le rôle des nouvelles technologies (logiciels de design, impression " +
  "« 3D ») dans la création artistique en volume, d'observer et de croquer le style architectural Gingerbread " +
  "haïtien, de réaliser une maquette avec ou sans outil numérique, et de mener un projet interdisciplinaire " +
  "en équipe reliant les arts aux mathématiques, à l'ETAP et aux sciences sociales. Cette capacité à relier " +
  "technologie, patrimoine et travail d'équipe prépare la suite du manuel.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "style Gingerbread · logiciel de design · impression « 3D » · design intérieur · croquis architectural · " +
  "projet interdisciplinaire.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C03-05",
  "Patrimoine — un dossier d'équipe interdisciplinaire",
  "Une scène de classe haïtienne montrant plusieurs équipes présentant leurs dossiers de recherche " +
  "architecturale (croquis, notes), illustrant la diversité des bâtiments patrimoniaux étudiés.",
  "Ancrer visuellement l'aboutissement du projet interdisciplinaire du chapitre.",
  "Illustrer la diversité des dossiers d'équipe réalisables à partir de l'atelier du chapitre.",
  "Illustration demi-page, scène de classe haïtienne, présentation de dossiers d'équipe, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C03-06",
  "Synthèse — L'art à l'ère du numérique",
  "Une carte mentale simple centrée sur « Art et numérique », avec des branches vers : logiciels de design, " +
  "impression « 3D », style Gingerbread, croquis architectural, projet interdisciplinaire.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 22, "Manuel_EEA_9AF_Chapitre3.docx");
