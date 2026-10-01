// Manuel d'ETAP 9e AF — Chapitre 2 : Un projet pour le recyclage et les
// énergies renouvelables (champ officiel : Métiers du recyclage et des
// énergies renouvelables).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), unite "Les metiers du recyclage et
//   des energies renouvelables en 9e annee du fondamental", p.57-58/77.
// Page reverifiee en direct le 2026-08-22 (execution controlee Chapitre 2,
// controle prealable obligatoire) via le lecteur Google Drive, en plus de la
// verification deja faite en Phase 0 et lors du Chapitre 1. Confirme aussi
// la limite exacte : l'unite Recyclage/Energies se termine sur la page 58
// (avec son propre bloc "Modalites et criteres d'evaluation") ; l'unite
// Agriculture commence page 59 - aucun chevauchement, aucune contamination
// entre chapitres 9e AF.
//
// Citations exactes relevees ce jour :
//   Competence : « Concevoir, de maniere collaborative, des objets
//   techniques utilisant des sources d'energie renouvelables ou des objets
//   recycles. »
//   Savoirs/savoir-faire (2, verbatim resume fidele - liste plus courte que
//   celle du Chapitre 1, fidelement respectee sans en ajouter) :
//   (1) definir et planifier les differentes etapes d'un projet ecologique
//   generateur de revenus ; (2) organiser des projets pour realiser des
//   systemes utilisant les energies renouvelables ou des objets recycles
//   (installation solaire domestique ; objets a partir de dechets
//   plastique/bois/metal ; compost pour cuisson a partir de la biomasse ;
//   four solaire ; chauffe-eau solaire a partir d'objets recycles).
//   Activites officielles : organisation d'une equipe de projet (taches,
//   revue de projet, presentation des resultats) ; visites d'installations
//   de production d'energies vertes (centrale solaire, eolienne,
//   hydroelectrique, biodigesteur) et interview des acteurs ; analyse des
//   installations visitees ; projets possibles (liste non exhaustive) :
//   electrification d'un prototype de maison ecologique, assemblage de
//   cellules photovoltaiques, eolienne a partir d'objets recycles, pompe
//   solaire pour arroser le jardin de l'ecole, biodigesteur, chauffe-eau
//   solaire.
//   Modalites d'evaluation officielles (p.58, meme formulation qu'au
//   Chapitre 1) : exposes collectifs, analyse documentaire individuelle,
//   tests de connaissances ; criteres : implication, estimation des
//   progres, maitrise de competence.
//
// Point de vigilance documente : contrairement a l'unite "Metiers de la mer"
// (Chapitre 1) et a l'unite "Agriculture", le texte source de cette unite ne
// repete PAS explicitement la phrase "l'usage des nouvelles technologies du
// numerique est fortement encourage..." dans sa propre liste d'activites.
// La section numerique de ce chapitre reste donc fondee uniquement sur le
// statut TRANSVERSAL general du numerique en 9e AF [OFFICIEL - SOURCE
// VERIFIEE, p.63], jamais presentee comme une activite specifique a cette
// unite.
//
// Ce chapitre ne reprend PAS le contenu du Chapitre 3 de la 8e AF ("Les
// energies renouvelables" : identifier des sources d'energie, comparer des
// installations, comprendre une chaine d'energie - registre "identifier/
// comprendre") ni celui du Chapitre 3 de la 7e AF ("Le recyclage des objets
// techniques" : enjeux/cycle de vie - registre "apprehender"). Il porte sur
// la CONCEPTION d'objets techniques combinant energie renouvelable ET
// objets recycles, integree a un projet economique complet (planifier,
// organiser une equipe, realiser/representer, presenter, evaluer les
// impacts), conformement a la progression verrouillee en Phase 0
// (MATRICE_PROGRESSION_ETAP_7_8_9_AF.md, section 2). Seul un rappel tres
// bref des acquis 7e/8e AF est inclus (section 2.1).
//
// Adaptations pedagogiques de securite (heritees du Chapitre 3 de la 8e AF
// et documentees dans ARCHITECTURE_PEDAGOGIQUE_ETAP_9AF.md) : aucun montage
// electrique reel, aucune installation solaire reellement raccordee, aucune
// manipulation de flamme/chaleur reelle sans supervision ; tout systeme
// "concu" par l'eleve reste un schema ou une maquette NON FONCTIONNELLE.
// Toute visite d'installation reste supervisee par un adulte responsable.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_PROJET_FILL, BOX_PROJET_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
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
  2,
  "Un projet pour le recyclage et les énergies renouvelables",
  "En 7e AF, tu as découvert les enjeux du recyclage. En 8e AF, tu as identifié des sources d'énergie " +
  "renouvelables et compris comment elles produisent de l'électricité. Cette année, tu vas réunir ces deux " +
  "sujets pour concevoir, en équipe, un véritable objet technique — utilisant une énergie renouvelable ou des " +
  "objets recyclés — dans le cadre d'un projet complet.",
  [
    "Planifier les étapes d'un projet écologique générateur de revenus.",
    "Concevoir un système utilisant une source d'énergie renouvelable ou des objets recyclés.",
    "Organiser une équipe de projet et enquêter sur des installations réelles, en toute sécurité.",
    "Représenter un système conçu par un schéma ou une maquette non fonctionnelle.",
    "Présenter les résultats d'un projet, y compris à l'aide du numérique.",
    "Évaluer les impacts environnementaux, sociaux et économiques d'un projet.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école de la région des Cayes, l'électricité du réseau est irrégulière et " +
  "beaucoup d'objets en plastique ou en métal finissent jetés sans être réutilisés. Une classe de 9e AF décide " +
  "de développer, à titre d'exercice scolaire, un projet combinant énergie renouvelable et objets recyclés — " +
  "par exemple une petite installation solaire ou un objet technique fabriqué à partir de déchets. Ce chapitre " +
  "t'apprend à concevoir un tel projet, sans jamais réaliser de montage électrique réel.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Objet technique — objet conçu par l'être humain pour répondre à un besoin précis."));
children.push(bulletPar("Énergie renouvelable — source d'énergie qui se renouvelle naturellement (soleil, vent, eau, biomasse)."));
children.push(bulletPar("Objet recyclé — objet fabriqué à partir de matériaux réutilisés (plastique, bois, métal) plutôt que jetés."));
children.push(bulletPar("Schéma — dessin simplifié qui représente le fonctionnement ou la structure d'un système."));
children.push(bulletPar("Maquette non fonctionnelle — représentation réduite d'un système, réalisée pour l'expliquer, jamais pour le faire fonctionner réellement."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : du recyclage et des énergies aux systèmes à concevoir", "2.1"));
children.push(bodyPar(
  "En 7e AF, tu as appris pourquoi il est important de recycler les objets techniques. En 8e AF, tu as appris " +
  "à identifier différentes sources d'énergie renouvelables et à comprendre comment une installation les " +
  "transforme en électricité. Cette année, ces deux connaissances deviennent des outils : tu vas les utiliser " +
  "pour concevoir, en équipe, un système technique réel dans le cadre d'un projet complet.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Planifier les étapes d'un projet écologique générateur de revenus", "2.2"));
children.push(bodyPar(
  "Le programme officiel demande de définir et planifier les différentes étapes d'un projet écologique " +
  "générateur de revenus — la même démarche de planification que celle vue au Chapitre 1, appliquée cette " +
  "fois à un système énergétique ou recyclé.",
));
children.push(calloutBox(
  "PROJET — Les grandes étapes à planifier",
  [
    "1. Décrire le besoin (manque d'électricité, objets jetés à réutiliser).",
    "2. Choisir un système à concevoir (voir section 2.3).",
    "3. Lister les ressources nécessaires (matériaux recyclés, schémas, temps).",
    "4. Répartir les tâches entre les membres de l'équipe.",
    "5. Prévoir un moment de présentation des résultats.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, "3A2A57",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C02-01",
  "Ouverture — Une installation d'énergie renouvelable en Haïti",
  "Vue crédible d'une petite installation solaire ou éolienne dans un contexte scolaire ou communautaire " +
  "haïtien, avec un groupe d'élèves de 9e AF en observation, encadrés par un enseignant.",
  "Un projet technique s'inspire d'installations réelles observées dans son milieu.",
  "Ouvrir le chapitre sur une scène concrète et contextualisée qui ancre la démarche de conception.",
  "Illustration pleine largeur, scène haïtienne crédible, ambiance studieuse et respectueuse des consignes de sécurité.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Concevoir un système : énergie renouvelable ou objets recyclés", "2.3"));
children.push(bodyPar(
  "Le programme officiel propose d'organiser des projets pour réaliser des systèmes utilisant les énergies " +
  "renouvelables ou des objets recyclés. Plusieurs exemples sont cités, à titre non exhaustif.",
));
children.push(threeColTable(
  ["Système à concevoir", "Ressource utilisée", "Exemple de projet officiel"],
  [
    ["Installation solaire domestique", "Énergie solaire", "Électrification d'un prototype de maison écologique"],
    ["Panneau photovoltaïque", "Énergie solaire", "Assemblage de cellules photovoltaïques"],
    ["Éolienne", "Énergie éolienne + objets recyclés", "Construction d'une éolienne à partir d'objets recyclés"],
    ["Pompe solaire", "Énergie solaire", "Arrosage du jardin de l'école par une pompe solaire"],
    ["Biodigesteur", "Biomasse", "Construction d'un biodigesteur"],
    ["Chauffe-eau solaire", "Énergie solaire + objets recyclés", "Construction d'un chauffe-eau solaire"],
    ["Four solaire / compost", "Énergie solaire / biomasse", "Réalisation de fours solaires ou de composts pour la cuisson"],
  ],
  [2800, 3000, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Le programme cite aussi l'utilisation de déchets plastiques, de bois ou de métaux pour la fabrication " +
  "d'objets techniques — le recyclage devient ici un matériau de conception, pas seulement un geste de tri.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C02-02",
  "Schéma d'un système à concevoir",
  "Un schéma simple annoté (par exemple : pompe solaire ou four solaire), montrant les éléments principaux " +
  "et le trajet de l'énergie, réalisé à la main par un groupe d'élèves.",
  "Un schéma clair permet d'expliquer un système avant de le représenter physiquement.",
  "Montrer concrètement l'étape de conception graphique avant la maquette.",
  "Illustration demi-page, dessin technique simple et lisible, cohérent avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Organiser une équipe et enquêter sur des installations réelles", "2.4"));
children.push(bodyPar(
  "Le programme officiel propose l'organisation d'une équipe de projet (répartition des tâches, revue de " +
  "projet, présentation des résultats), ainsi que la visite d'installations de production d'énergies vertes " +
  "(centrale solaire, éolienne, hydroélectrique, biodigesteur...) pour interviewer les acteurs et identifier " +
  "les difficultés rencontrées, puis analyser ces installations afin de proposer des améliorations.",
));
children.push(calloutBox(
  "SÉCURITÉ — Enquêter sans risque",
  [
    "Toute visite d'une installation d'énergie ou d'un site de recyclage se fait uniquement en groupe et sous " +
    "la supervision d'un adulte responsable.",
    "Aucun élève ne touche une installation électrique réelle, un panneau solaire branché, ou un équipement en " +
    "fonctionnement.",
    "Les entretiens avec les acteurs se font avec leur accord, de façon respectueuse et encadrée.",
    "Toute manipulation d'objets recyclés (plastique, bois, métal) se fait avec des matériaux propres et non " +
    "coupants, sous supervision.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C02-03",
  "Sécurité — Visite encadrée d'une installation",
  "Un groupe d'élèves de 9e AF observant, à distance de sécurité et sous la supervision d'un enseignant, une " +
  "installation solaire ou éolienne, carnet en main, sans manipuler l'équipement.",
  "Observer et apprendre sans jamais manipuler une installation réelle en fonctionnement.",
  "Ancrer visuellement la règle de sécurité de la visite encadrée.",
  "Illustration demi-page, scène haïtienne crédible, ton sérieux et rassurant.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Réaliser et représenter le système conçu", "2.5"));
children.push(bodyPar(
  "Concevoir un système technique en classe ne signifie pas le construire réellement en fonctionnement : cela " +
  "prend la forme d'un schéma détaillé puis, si possible, d'une maquette non fonctionnelle réalisée avec des " +
  "matériaux scolaires simples (carton, bois léger, objets recyclés propres), qui représente le système sans " +
  "jamais produire ni transporter d'électricité réelle.",
));
children.push(calloutBox(
  "TECHNIQUE — Réaliser une maquette non fonctionnelle",
  [
    "1. Choisir un système parmi ceux étudiés en section 2.3.",
    "2. Reproduire ses éléments principaux en matériaux légers et sûrs (carton, bouchons, tiges de bois).",
    "3. Étiqueter chaque élément pour expliquer son rôle réel dans le système.",
    "4. Ne jamais brancher la maquette à une source d'électricité réelle.",
    "5. Préparer une courte explication du fonctionnement réel du système représenté.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C02-04",
  "Maquette représentative non fonctionnelle",
  "Des élèves de 9e AF assemblant une maquette non fonctionnelle (par exemple une éolienne miniature en " +
  "objets recyclés) avec des matériaux scolaires simples, sans aucun branchement électrique visible.",
  "Une maquette explique un système technique sans jamais le faire fonctionner réellement.",
  "Montrer concrètement l'étape de réalisation, restant une représentation sûre.",
  "Illustration pleine largeur, scène de classe ou d'atelier scolaire haïtien, ambiance appliquée et sûre.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Présenter les résultats, y compris avec le numérique", "2.6"));
children.push(bodyPar(
  "Comme pour tous les projets de cette année, le numérique reste un outil transversal — jamais un chapitre à " +
  "part — utile pour présenter clairement les résultats d'un projet, quand le matériel est disponible.",
));
children.push(calloutBox(
  "NUMÉRIQUE — Présenter un système conçu",
  [
    "Avec un ordinateur ou une tablette disponible : quelques diapositives ou un tableau peuvent résumer le " +
    "système choisi, son schéma et son impact attendu.",
    "Sans matériel disponible : une affiche présentant le schéma et la maquette remplit la même fonction.",
    "Dans les deux cas, la présentation doit expliquer clairement le rôle de chaque élément du système.",
  ],
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE, "1F2A33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Évaluer les impacts du projet", "2.7"));
children.push(bodyPar(
  "Un système technique bien conçu doit aussi être évalué selon ses impacts environnementaux, sociaux et " +
  "économiques — pas seulement selon son apparence ou sa complexité.",
));
children.push(threeColTable(
  ["Type d'impact", "Question à se poser", "Exemple"],
  [
    ["Impact environnemental", "Le système réduit-il la pollution ou le gaspillage d'énergie ?", "Moins de déchets plastiques jetés grâce à leur réutilisation"],
    ["Impact social", "Le système répond-il à un vrai besoin de la communauté ?", "Accès à l'eau ou à la lumière amélioré pour l'école"],
    ["Impact économique", "Le système pourrait-il réduire des coûts ou créer des revenus ?", "Moins de dépenses en combustible grâce à un four solaire"],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : le projet de l'école des Cayes", "2.8"));
children.push(bodyPar(
  "Reprenons la situation présentée au début du chapitre. Avec ton équipe, choisis un système parmi ceux " +
  "étudiés (installation solaire, éolienne, biodigesteur, four solaire...) pour répondre au besoin de l'école.",
));
children.push(numberedPar("1. Quel besoin réel votre système cherche-t-il à résoudre ?"));
children.push(numberedPar("2. Quelle énergie ou quels objets recyclés utilisez-vous, et pourquoi ce choix ?"));
children.push(numberedPar("3. Quelles précautions de sécurité devez-vous respecter pendant la conception ?"));
children.push(numberedPar("4. Quel impact positif attendez-vous de ce système pour l'école ou la communauté ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de projet collectif — Concevoir un système écologique"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Concevoir, en équipe, un système utilisant une énergie renouvelable ou des objets recyclés, du schéma jusqu'à l'évaluation de ses impacts." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier de projet, crayons, feuilles pour schéma. Facultatif : carton, objets recyclés propres et non coupants pour une maquette non fonctionnelle." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Équipes de 4 à 5 élèves, avec un rôle attribué à chacun (coordination, recherche, conception du schéma, présentation)." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez un des systèmes proposés dans ce chapitre (installation solaire, éolienne, pompe solaire, biodigesteur, chauffe-eau solaire ou four solaire)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Décrivez le besoin réel que votre système cherche à résoudre."));
children.push(numberedPar("2. Choisissez le système et justifiez ce choix (voir section 2.3)."));
children.push(numberedPar("3. Réalisez un schéma annoté du système."));
children.push(numberedPar("4. Si le matériel est disponible, réalisez une maquette non fonctionnelle du système."));
children.push(numberedPar("5. Préparez une courte présentation des résultats, avec ou sans outil numérique."));
children.push(numberedPar("6. Évaluez les impacts attendus de votre système (tableau de la section 2.7)."));
children.push(spacer(120));

children.push(bodyPar("GRILLE DE PLANIFICATION — À compléter par l'équipe :", { bold: true }));
children.push(threeColTable(
  ["Étape du projet", "Décision de l'équipe", "Responsable"],
  [
    ["Besoin identifié", "", ""],
    ["Système choisi", "", ""],
    ["Ressources nécessaires", "", ""],
    ["Répartition des tâches", "", ""],
    ["Impact attendu", "", ""],
  ],
  [3000, 3600, 2400],
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C02-05",
  "Présentation des résultats devant la classe",
  "Une équipe d'élèves de 9e AF présentant son schéma et sa maquette devant la classe, à l'aide d'une affiche " +
  "ou d'un écran partagé.",
  "Présenter clairement un système conçu, avec ou sans outil numérique.",
  "Ancrer visuellement l'étape de présentation des résultats du projet.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Une installation ou un objet recyclé près de chez moi"));
children.push(bodyPar(
  "Avec un adulte responsable, observe ou renseigne-toi sur une installation d'énergie renouvelable ou un " +
  "objet fabriqué à partir de matériaux recyclés près de chez toi. Pose quelques questions simples, avec " +
  "l'accord des personnes concernées.",
));
children.push(threeColTable(
  ["Installation ou objet observé", "Quelle énergie ou quel matériau utilise-t-il ?", "Une amélioration possible"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un projet écologique générateur de revenus se planifie en plusieurs étapes claires, comme au Chapitre 1.",
    "Un système technique peut utiliser une énergie renouvelable (solaire, éolienne, biomasse) ou des objets " +
    "recyclés (plastique, bois, métal), ou combiner les deux.",
    "Concevoir un système, c'est d'abord réaliser un schéma, puis, si possible, une maquette non fonctionnelle.",
    "Aucune installation réelle n'est branchée ni manipulée : toute réalisation reste une représentation sûre.",
    "Visiter une installation ou interviewer un acteur se fait toujours en groupe, sous supervision d'un adulte.",
    "Le numérique est un outil utile, mais non obligatoire, pour présenter les résultats d'un projet.",
    "Un système conçu s'évalue selon ses impacts environnementaux, sociaux et économiques.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Planifier les étapes d'un projet écologique générateur de revenus.",
    "☐ Citer plusieurs systèmes utilisant une énergie renouvelable ou des objets recyclés.",
    "☐ Réaliser un schéma annoté d'un système technique.",
    "☐ Expliquer pourquoi une maquette doit rester non fonctionnelle.",
    "☐ Citer une règle de sécurité pour une visite d'installation.",
    "☐ Présenter les résultats d'un projet, avec ou sans outil numérique.",
    "☐ Évaluer les impacts environnementaux, sociaux et économiques d'un système.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : planification de projet, énergie renouvelable, objet recyclé, schéma, maquette non " +
    "fonctionnelle, impact.",
    "Vocabulaire clé à maîtriser : objet technique, énergie renouvelable, objet recyclé, schéma, maquette non " +
    "fonctionnelle.",
    "Avant l'évaluation, vérifie que tu peux : citer un système utilisant une énergie renouvelable ou des " +
    "objets recyclés ; expliquer la différence entre un schéma et une maquette ; citer une règle de sécurité.",
    "Question rapide de vérification : pourquoi une maquette de ce chapitre doit-elle toujours rester non " +
    "fonctionnelle ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "énergie renouvelable · objet recyclé · schéma · maquette non fonctionnelle · biodigesteur · impact · équipe de projet.",
  { italics: true },
));
children.push(numberedPar("1. Le soleil, le vent et la biomasse sont des sources d'......................"));
children.push(numberedPar("2. Un objet fabriqué à partir de déchets plastiques, bois ou métaux est un ......................"));
children.push(numberedPar("3. Un dessin annoté qui représente un système s'appelle un ......................"));
children.push(numberedPar("4. Une représentation réduite d'un système, qui ne fonctionne pas réellement, est une ......................"));
children.push(numberedPar("5. Un système qui transforme des déchets biologiques en énergie s'appelle un ......................"));
children.push(numberedPar("6. Les effets d'un projet sur l'environnement ou la société s'appellent son ......................"));
children.push(numberedPar("7. Un groupe qui se répartit les tâches d'un projet forme une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Relier"));
children.push(bodyPar(
  "Relie chaque système de la colonne A à la ressource qu'il utilise principalement dans la colonne B.",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Pompe solaire", "a. Biomasse"],
    ["2. Éolienne", "b. Énergie solaire"],
    ["3. Biodigesteur", "c. Vent (et objets recyclés)"],
    ["4. Chauffe-eau solaire", "d. Énergie solaire et objets recyclés"],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice C — Analyse / comparaison"));
children.push(numberedPar("1. Compare une installation solaire domestique et un biodigesteur : quelle ressource utilise chacun, et pour quel usage ?"));
children.push(numberedPar("2. Explique la différence entre un schéma et une maquette non fonctionnelle. Pourquoi les deux sont-ils utiles ?"));
children.push(numberedPar("3. Un système recyclé (par exemple une éolienne en objets recyclés) peut-il aussi être considéré comme un système à énergie renouvelable ? Justifie ta réponse."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / décision de projet"));
children.push(numberedPar("1. Ton équipe hésite entre concevoir un four solaire et un chauffe-eau solaire. Propose un critère pour vous aider à choisir, et justifie-le."));
children.push(numberedPar("2. Une équipe veut construire une maquette avec des objets en verre cassé pour représenter un panneau solaire. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("3. Explique pourquoi une visite d'installation d'énergie doit toujours être supervisée par un adulte responsable."));
children.push(numberedPar("4. Propose un système simple qui pourrait combiner à la fois une énergie renouvelable et des objets recyclés."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de concevoir, étape par étape, un système technique utilisant une énergie renouvelable " +
  "ou des objets recyclés, dans le cadre d'un projet écologique générateur de revenus : planifier les étapes du " +
  "projet, choisir un système parmi ceux proposés par le programme, réaliser un schéma puis, si possible, une " +
  "maquette non fonctionnelle, organiser une équipe et enquêter en toute sécurité sur des installations " +
  "réelles, présenter les résultats — avec ou sans numérique — et évaluer les impacts environnementaux, " +
  "sociaux et économiques du système conçu.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "énergie renouvelable · objet recyclé · schéma · maquette non fonctionnelle · équipe de projet · impact.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C02-06",
  "Évaluer les impacts d'un système conçu",
  "Un petit groupe d'élèves examinant ensemble un tableau d'impacts (environnemental, social, économique) " +
  "rempli à la main, dans une salle de classe haïtienne.",
  "L'évaluation des impacts est une étape aussi importante que la conception elle-même.",
  "Ancrer visuellement l'étape finale d'évaluation du projet.",
  "Illustration demi-page, scène de classe haïtienne, ton réflexif et sérieux.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C02-07",
  "Synthèse — Concevoir un système écologique",
  "Une carte mentale ou un schéma en étapes (besoin, système choisi, schéma, maquette non fonctionnelle, " +
  "présentation, évaluation des impacts), avec une icône simple pour chaque étape.",
  "Visualiser d'un coup d'œil la démarche complète de conception enseignée dans ce chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style schéma/carte mentale colorée, cohérente avec la charte ETAP.",
));

await buildAndSave(children, 16, "Manuel_ETAP_9AF_Chapitre2.docx");
