// Manuel d'ETAP 8e AF — Chapitre 6 : Projet de synthese ETAP - 8e AF.
//
// [CHOIX EDITORIAL] Ce chapitre n'est adosse a aucune nouvelle unite
// detaillee du document source : il reinvestit uniquement les cinq
// competences 8e AF deja verifiees et enseignees aux Chapitres 1 a 5.
// Aucune competence, activite ou page nouvelle n'est inventee :
//   - Numerique (Ch.1, applications/outils collaboratifs) : p.53-55 (affine
//     a p.54-55 lors de la redaction du Chapitre 1)
//   - Metiers de la mer (Ch.2, conception de prototype)   : p.48-49
//   - Energies renouvelables (Ch.3)                        : p.49-50
//   - Agriculture (Ch.4, conception de prototype)          : p.51-52
//   - Entrepreneuriat (Ch.5, production/financement)       : p.52-53
// Le titre "Chapitre 6" et le principe d'un "projet de synthese" restent un
// choix editorial du manuel, non une exigence explicite du MENFP.
//
// Securite : aucune piste de projet ne demande a l'eleve de manipuler seul
// un outil coupant/motorise, un produit chimique, une installation
// electrique domestique, une batterie endommagee, une machine, une
// embarcation, du feu ou un pesticide. Tous les prototypes restent scolaires
// (papier, carton, materiaux recycles propres, schemas, maquettes).
// Financement : montants strictement fictifs, aucun engagement financier
// reel demande a l'eleve (pas d'emprunt, de compte, de paiement reel).
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  VERT, CUIVRE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  6,
  "Projet de synthèse ETAP — 8e AF",
  "Maintenant, mobilisons nos acquis. Cette année, tu as appris à utiliser des applications numériques, à " +
  "concevoir des prototypes pour les métiers de la mer et l'agriculture, à comprendre les énergies " +
  "renouvelables, et à organiser une production. Il est temps de combiner plusieurs de ces acquis dans un vrai " +
  "projet d'équipe.",
  [
    "Faire le point sur les acquis des cinq champs étudiés cette année.",
    "Choisir un problème pertinent et réaliste.",
    "Rechercher et organiser des informations utiles.",
    "Imaginer, comparer et choisir une solution.",
    "Planifier les ressources et les rôles d'une équipe.",
    "Représenter ou réaliser une solution scolaire sûre.",
    "Présenter un projet, l'évaluer et proposer une amélioration.",
  ],
));

children.push(bodyPar(
  "Ce chapitre est différent des précédents : il ne t'apprend pas une notion nouvelle, mais t'aide à combiner " +
  "au moins deux des acquis de l'année, dans un projet plus exigeant que celui de la 7e AF — sans devenir un " +
  "projet professionnel réel.",
  { italics: true },
));

children.push(subHeading("Vocabulaire de la démarche de projet"));
children.push(bulletPar("Problème — situation à améliorer, à partir de laquelle un projet peut être construit."));
children.push(bulletPar("Source d'information — origine d'une information (observation, entretien, document)."));
children.push(bulletPar("Contrainte — exigence que le projet doit respecter (matériel, temps, sécurité, environnement, ressources)."));
children.push(bulletPar("Ressource — ce dont une équipe a besoin pour réaliser son projet (personnes, matériel, argent fictif, savoir-faire)."));
children.push(bulletPar("Grille d'évaluation — outil qui précise les critères permettant d'apprécier un projet."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Faire le point : la carte des acquis", "6.1"));
children.push(bodyPar(
  "Avant de choisir un projet, il est utile de se rappeler ce que chaque chapitre de l'année t'a appris.",
));
children.push(threeColTable(
  ["Chapitre et champ", "Compétence travaillée", "Ce que tu peux réutiliser"],
  [
    ["1 — Applications numériques et outils collaboratifs", "Découvrir le fonctionnement d'applications numériques", "Traitement de texte, tableur, PAO, travail collaboratif"],
    ["2 — Concevoir un prototype : métiers de la mer", "Concevoir collectivement des prototypes d'outils des métiers de la mer", "Cahier des charges, croquis, maquette"],
    ["3 — Les énergies renouvelables", "Identifier l'impact des énergies renouvelables", "Sources d'énergie, chaîne d'énergie, comparaison de solutions"],
    ["4 — Concevoir un prototype : métiers agricoles", "Concevoir collectivement des prototypes d'outils agricoles", "Cahier des charges, croquis, maquette, risques corporels"],
    ["5 — Modes de production et financement", "Appréhender modes de production, financement, ressources", "Modes de production, ressources, coût/prix/marge, mobilisation de ressources"],
  ],
  [3000, 3200, 3200],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-01",
  "Carte des acquis de l'année",
  "Carte mentale ou schéma en étoile avec « ETAP 8e AF » au centre et cinq branches (numérique, mer, énergies " +
  "renouvelables, agriculture, entrepreneuriat), chacune avec un petit pictogramme rappelant l'acquis principal.",
  "Visualiser d'un coup d'œil les cinq compétences travaillées cette année avant de choisir son projet.",
  "Aider l'élève à se repérer parmi les acquis de l'année avant de choisir son projet.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comment choisir un problème pertinent", "6.2"));
children.push(bodyPar(
  "Un bon projet part d'un problème réel, observé dans l'école ou la communauté, et suffisamment précis pour " +
  "être traité en quelques séances.",
));

children.push(calloutBox(
  "OBSERVER — Un problème pertinent est...",
  [
    "Réel : observé concrètement, pas inventé.",
    "Précis : on peut l'expliquer en une phrase.",
    "Réalisable : une solution scolaire, sûre et sans grand moyen, peut y répondre.",
    "Lié à au moins un des cinq champs étudiés cette année.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-02",
  "Identifier un besoin ou un problème",
  "Des élèves de 8e AF observant leur environnement scolaire (cour, jardin, matériel numérique partagé) en " +
  "notant sur un carnet un problème réel, sans situation dangereuse.",
  "Un projet commence toujours par l'observation d'un problème réel.",
  "Illustrer concrètement l'étape de choix du problème.",
  "Illustration pleine largeur, scène scolaire haïtienne, ambiance d'observation active.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Comment rechercher et organiser les informations", "6.3"));
children.push(bodyPar(
  "Une fois le problème choisi, l'équipe rassemble des informations utiles : observation directe, entretien " +
  "avec une personne compétente (sous supervision), ou document fourni par l'enseignant.",
));

children.push(calloutBox(
  "TECHNIQUE — Organiser ses informations",
  [
    "Noter la source de chaque information (observation, personne interrogée, document).",
    "Classer les informations par thème (besoin, solutions possibles, ressources nécessaires).",
    "Si des outils numériques sont disponibles, les utiliser pour organiser un tableau de recherche ; sinon, un tableau papier fonctionne tout aussi bien.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-03",
  "Rechercher et organiser des informations",
  "Un groupe d'élèves consultant un document papier et complétant un tableau de recherche, avec en option un " +
  "ordinateur partagé en arrière-plan.",
  "Organiser ses informations est possible avec ou sans matériel numérique.",
  "Illustrer concrètement l'étape de recherche et d'organisation des informations.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comment imaginer, comparer et choisir une solution", "6.4"));
children.push(bodyPar(
  "Comme au Chapitre 2 et au Chapitre 4, une bonne démarche de conception imagine plusieurs solutions avant " +
  "d'en choisir une, selon des critères clairs.",
));
children.push(twoColTable(
  "Solution envisagée", "Avantages et limites",
  [
    ["Solution 1", ""],
    ["Solution 2", ""],
  ],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-04",
  "Comparer plusieurs solutions",
  "Des élèves autour d'un tableau ou d'une grande feuille, comparant deux ou trois idées de solutions avec des " +
  "croquis ou des mots-clés.",
  "Un bon projet compare plusieurs solutions avant d'en choisir une.",
  "Illustrer concrètement l'étape de comparaison des solutions.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance de réflexion collective.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Comment planifier les ressources et les rôles", "6.5"));
children.push(bodyPar(
  "Avant de réaliser le projet, l'équipe planifie qui fait quoi, avec quelles ressources (humaines, " +
  "matérielles, techniques, et financières si le projet touche à l'entrepreneuriat), et selon quel calendrier.",
));
children.push(threeColTable(
  ["Rôle", "Élève responsable", "Tâche principale"],
  [
    ["Coordination", "", ""],
    ["Recherche d'informations", "", ""],
    ["Conception / réalisation", "", ""],
    ["Présentation finale", "", ""],
  ],
  [2800, 2800, 3400],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-05",
  "Planifier les ressources et les rôles",
  "Un tableau de planification en classe avec les noms des élèves, leurs rôles, et une liste d'étapes, dans " +
  "une ambiance organisée.",
  "Un projet réussi commence par une bonne planification.",
  "Illustrer concrètement l'étape de planification du projet.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et organisée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comment représenter ou réaliser une solution scolaire sûre", "6.6"));
children.push(bodyPar(
  "La réalisation se fait toujours en équipe, chacun jouant le rôle défini à l'étape précédente, en respectant " +
  "les règles de sécurité rappelées ci-dessous.",
));
children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-06",
  "Travail collaboratif en équipe",
  "Un groupe d'élèves de 8e AF réalisant ensemble leur maquette ou leur dossier, chacun occupant le rôle " +
  "défini lors de la planification, dans une ambiance organisée et sûre.",
  "La réalisation d'un projet de synthèse se fait toujours en équipe, dans le respect des rôles définis.",
  "Illustrer concrètement le travail collaboratif au moment de la réalisation.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance active et collaborative.",
));
children.push(spacer(160));
children.push(calloutBox(
  "SÉCURITÉ — Règles valables pour tous les projets",
  [
    "Utiliser uniquement papier, carton, plastique recyclé propre, ou matériaux déjà validés dans les chapitres précédents.",
    "Ne jamais manipuler seul un outil coupant motorisé, un produit chimique, une installation électrique domestique, une batterie endommagée, une machine, une embarcation, du feu ou un pesticide.",
    "Toute observation hors de la classe se fait uniquement avec l'accord et sous la supervision d'un adulte responsable.",
    "Si le projet touche à l'entrepreneuriat : aucun argent réel, aucun emprunt, aucun compte, aucun paiement réel — uniquement des montants fictifs.",
    "Si un projet utilise le numérique : prévoir une version réalisable avec un matériel partagé ou entièrement sur papier.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Comment présenter, évaluer et améliorer", "6.7"));
children.push(bodyPar(
  "Présenter un projet, c'est expliquer le problème de départ, la démarche suivie, la solution choisie, le " +
  "résultat obtenu, les difficultés rencontrées, et ce que l'équipe a appris. Évaluer le projet permet ensuite " +
  "de proposer une amélioration réaliste.",
));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-07",
  "Le résultat d'un projet de synthèse",
  "Une maquette ou un dossier collaboratif terminé, posé sur une table, entouré des croquis et fiches de " +
  "recherche qui ont mené à ce résultat.",
  "Un projet de synthèse aboutit à une représentation concrète et sûre de la solution choisie.",
  "Illustrer le résultat concret attendu d'un projet de synthèse.",
  "Illustration pleine largeur, scène scolaire haïtienne, résultat clairement visible.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C06-08",
  "Présenter et évaluer son projet",
  "Un groupe d'élèves présentant leur projet devant la classe, avec un camarade tenant une grille d'évaluation " +
  "simple.",
  "Présenter et évaluer un projet fait partie intégrante de la démarche.",
  "Illustrer le moment de présentation et d'évaluation finale du projet.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les pistes de projet", "6.8"));
children.push(bodyPar(
  "Voici plusieurs pistes de projet, à choisir selon les moyens de l'école. Un projet peut combiner deux " +
  "champs, sans obligation de mobiliser les cinq à la fois.",
));

children.push(threeColTable(
  ["Piste", "Champs combinés", "Exemple de production"],
  [
    ["A — Numérique / collaboratif", "Numérique", "Un dossier collaboratif présentant un des projets de la classe (texte, tableau, diaporama)"],
    ["B — Prototype métiers de la mer", "Mer", "Un prototype amélioré d'un outil de pêche ou de transport, comme au Chapitre 2"],
    ["C — Étude d'une énergie renouvelable", "Énergies renouvelables", "Un schéma d'installation solaire adapté à un besoin précis de l'école"],
    ["D — Prototype agricole", "Agriculture", "Une solution simple pour un besoin du jardin scolaire, comme au Chapitre 4"],
    ["E — Mini-projet de production", "Entrepreneuriat", "Organisation fictive d'une petite production ou d'un service, avec ressources et financement pédagogiques"],
    ["F — Projet transversal", "Deux champs ou plus", "Ex. un prototype agricole présenté et financé fictivement (Agriculture + Entrepreneuriat), ou un prototype maritime présenté dans un dossier collaboratif (Mer + Numérique)"],
  ],
  [2000, 2400, 4400],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Fiche projet complète — un outil à réutiliser pour tout le chapitre"));
children.push(bodyPar(
  "Cette fiche, plus détaillée que celle de la 7e AF, accompagne le groupe tout au long du projet.",
));
children.push(threeColTable(
  ["Rubrique", "Contenu à compléter", "Section du chapitre"],
  [
    ["Titre et thème", "", "6.8"],
    ["Besoin / problème identifié", "", "6.2"],
    ["Objectif et bénéficiaires", "", "6.2"],
    ["Champ(s) ETAP et acquis mobilisés", "", "6.1 / 6.8"],
    ["Informations à rechercher et sources", "", "6.3"],
    ["Contraintes (matériel, temps, sécurité, environnement, ressources)", "", "6.3 / 6.6"],
    ["Idées de solutions et comparaison", "", "6.4"],
    ["Solution choisie et justification", "", "6.4"],
    ["Croquis / schéma / plan de réalisation", "", "6.6"],
    ["Ressources humaines, matérielles, techniques, financières (fictives)", "", "6.5"],
    ["Répartition des rôles et calendrier", "", "6.5"],
    ["Réalisation / représentation", "", "6.6"],
    ["Présentation du résultat", "", "6.7"],
    ["Évaluation, autoévaluation, améliorations", "", "6.7"],
  ],
  [3800, 3200, 2200],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(bodyPar("Grille d'évaluation du projet [CHOIX PÉDAGOGIQUE — barème du manuel, non un barème officiel MENFP] :", { bold: true }));
children.push(threeColTable(
  ["Critère", "À consolider", "Maîtrisé"],
  [
    ["Compréhension du besoin/problème", "", ""],
    ["Mobilisation des acquis ETAP", "", ""],
    ["Pertinence de la solution choisie", "", ""],
    ["Organisation et planification", "", ""],
    ["Coopération au sein de l'équipe", "", ""],
    ["Respect des contraintes (dont sécurité)", "", ""],
    ["Attention à l'environnement, si pertinent", "", ""],
    ["Qualité de la représentation/production", "", ""],
    ["Clarté de la présentation et capacité à expliquer les choix", "", ""],
  ],
  [4600, 2200, 2200],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Bilan personnel — Ce que j'ai appris en ETAP 8e AF"));
children.push(numberedPar("1. Quel chapitre de cette année t'a semblé le plus exigeant ? Pourquoi ?"));
children.push(numberedPar("2. Quelle étape de la démarche de conception (cahier des charges, croquis, maquette...) maîtrises-tu le mieux ?"));
children.push(numberedPar("3. Qu'as-tu préféré dans ton projet de synthèse ?"));
children.push(numberedPar("4. Que voudrais-tu approfondir l'année prochaine ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un projet de synthèse combine au moins deux champs ETAP étudiés dans l'année, sans obligation de tous les mobiliser.",
    "Un bon problème est réel, précis, réalisable et lié à un champ étudié.",
    "La démarche de conception suit des étapes : rechercher, imaginer, comparer, choisir, planifier, réaliser, présenter, évaluer.",
    "La sécurité doit toujours être respectée, quelle que soit la piste de projet choisie.",
    "Un projet touchant à l'entrepreneuriat reste entièrement fictif : aucun engagement financier réel.",
    "Présenter et évaluer son projet permet de proposer une amélioration réaliste.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Résumer ce que j'ai appris dans chacun des cinq champs de l'année.",
    "☐ Choisir un problème pertinent et réaliste.",
    "☐ Rechercher et organiser des informations utiles, avec ou sans outil numérique.",
    "☐ Comparer plusieurs solutions avant d'en choisir une.",
    "☐ Planifier les ressources et les rôles d'une équipe.",
    "☐ Réaliser une représentation ou une maquette scolaire sûre.",
    "☐ Présenter mon projet et expliquer mes choix.",
    "☐ Évaluer mon projet et proposer une amélioration.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : problème, source d'information, contrainte, ressource, comparaison de solutions, " +
    "grille d'évaluation, et les compétences des cinq champs de l'année (tableau de la section 6.1).",
    "Vocabulaire clé à maîtriser : cahier des charges, croquis, maquette, mode de production, ressource, " +
    "mobilisation des ressources, application collaborative, chaîne d'énergie.",
    "Avant l'évaluation, vérifie que tu peux : citer les grandes étapes d'un projet de synthèse ; expliquer " +
    "pourquoi on compare plusieurs solutions ; citer une règle de sécurité valable pour tous les projets.",
    "Question rapide de vérification : cite deux champs ETAP que tu pourrais combiner dans un même projet, et explique pourquoi.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "contrainte · grille d'évaluation · source d'information · ressource · comparer · problème · rôles · sécurité.",
  { italics: true },
));
children.push(numberedPar("1. Un projet de synthèse part toujours d'un ...................... réel."));
children.push(numberedPar("2. L'origine d'une information (observation, entretien, document) s'appelle une ......................"));
children.push(numberedPar("3. Avant de choisir une solution, il faut ...................... plusieurs idées."));
children.push(numberedPar("4. Une exigence que le projet doit respecter (matériel, temps, sécurité) s'appelle une ......................"));
children.push(numberedPar("5. Ce dont une équipe a besoin pour réaliser son projet s'appelle une ......................"));
children.push(numberedPar("6. Répartir les tâches entre les membres du groupe, c'est définir les ......................"));
children.push(numberedPar("7. L'outil qui précise les critères d'appréciation d'un projet s'appelle une ......................"));
children.push(numberedPar("8. Respecter les règles de ...................... est indispensable dans tous les projets."));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Un bon problème de projet est :"));
children.push(bulletPar("a) vague et impossible à expliquer simplement"));
children.push(bulletPar("b) réel, précis et réalisable"));
children.push(bulletPar("c) inventé sans lien avec la réalité"));
children.push(spacer(60));
children.push(numberedPar("2. Un projet de synthèse 8e AF doit :"));
children.push(bulletPar("a) mobiliser obligatoirement les cinq champs de l'année"));
children.push(bulletPar("b) combiner au moins deux champs étudiés dans l'année"));
children.push(bulletPar("c) ne mobiliser aucun champ étudié"));
children.push(spacer(60));
children.push(numberedPar("3. Si un projet touche à l'entrepreneuriat, les montants utilisés doivent être :"));
children.push(bulletPar("a) réels et empruntés à une banque"));
children.push(bulletPar("b) fictifs et pédagogiques"));
children.push(bulletPar("c) payés réellement par les élèves"));
children.push(spacer(60));
children.push(numberedPar("4. Un projet numérique sans ordinateur disponible pour chaque élève doit :"));
children.push(bulletPar("a) être annulé"));
children.push(bulletPar("b) être adapté avec un matériel partagé ou une version papier"));
children.push(bulletPar("c) être réalisé uniquement par l'enseignant"));
children.push(spacer(60));
children.push(numberedPar("5. Évaluer un projet sert surtout à :"));
children.push(bulletPar("a) comprendre ce qui a fonctionné et ce qui peut être amélioré"));
children.push(bulletPar("b) attribuer une note sans explication"));
children.push(bulletPar("c) arrêter définitivement le projet"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque piste de projet de la colonne A au champ ETAP principal qu'elle mobilise dans la colonne B " +
  "(une seule bonne réponse par piste).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Dossier collaboratif de présentation", "a. Métiers de la mer"],
    ["2. Prototype d'outil de pêche amélioré", "b. Énergies renouvelables"],
    ["3. Schéma d'installation solaire scolaire", "c. Numérique"],
    ["4. Solution pour le jardin scolaire", "d. Entrepreneuriat"],
    ["5. Organisation d'une petite production fictive", "e. Agriculture"],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / conception"));
children.push(numberedPar("1. Choisis un problème réel de ton école et propose une piste de projet parmi celles de la section 6.8, en indiquant les champs ETAP combinés."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi la sécurité doit être respectée même dans un projet scolaire de conception."));
children.push(numberedPar("3. Propose un cahier des charges simple (fonction attendue + 2 contraintes) pour le projet que tu as choisi à la question 1."));
children.push(numberedPar("4. Après avoir présenté un projet, quelle amélioration réaliste pourrais-tu proposer, et pourquoi ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de mobiliser, à travers un projet de synthèse plus exigeant que celui de la 7e AF, " +
  "les acquis des cinq champs étudiés cette année : les applications numériques et outils collaboratifs, la " +
  "conception de prototypes pour les métiers de la mer, la compréhension des énergies renouvelables, la " +
  "conception de prototypes agricoles, et les modes de production et le financement. Tu as suivi une démarche " +
  "complète : choisir un problème pertinent, rechercher et organiser des informations, imaginer et comparer " +
  "des solutions, planifier les ressources et les rôles, réaliser une représentation sûre, puis présenter et " +
  "évaluer ton projet. Cette démarche, pratiquée cette année à un niveau plus exigeant qu'en 7e AF, continuera " +
  "à évoluer dans les années suivantes.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "problème · source d'information · contrainte · ressource · comparaison de solutions · fiche projet · " +
  "grille d'évaluation · sécurité · amélioration.",
));

await buildAndSave(children, 68, "Manuel_ETAP_8AF_Chapitre6.docx");
