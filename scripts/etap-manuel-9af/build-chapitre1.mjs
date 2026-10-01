// Manuel d'ETAP 9e AF — Chapitre 1 : Un projet pour les métiers de la mer
// (champ officiel : Métiers de la mer générateurs de revenus).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), unite "Les metiers de la mer
//   generateurs de revenus en 9e annee du fondamental", p.56-57/77.
// Page verifiee en direct le 2026-08-22 (execution controlee Chapitre 1) via
// le lecteur Google Drive, en plus de la verification deja faite en Phase 0.
// Citations exactes relevees ce jour :
//   Competence : « Developper, de maniere collaborative, un projet offrant
//   des perspectives pour generer des revenus dans un contexte local, tout
//   en preservant la ressource. »
//   Savoirs/savoir-faire (4, verbatim resume fidele) : identifier un besoin
//   (peche, pisciculture, conservation et distribution des produits
//   halieutiques) ; rechercher et choisir des solutions qui preservent
//   l'ecosysteme marin ; definir et planifier les etapes d'un projet dans le
//   secteur de la peche, generateur de revenus ; gerer et coordonner les
//   activites du projet en adoptant un comportement responsable.
//   Activites officielles : organisation d'une equipe de projet (taches,
//   revue de projet, presentation des resultats) ; visites d'entreprises ou
//   de fermes (elevage de poissons/crustaces, installations de conservation
//   et de distribution) ; analyse des installations visitees ; usage du
//   numerique fortement encourage pour presenter les resultats ; projets
//   possibles (liste non exhaustive) : production de fruits de mer,
//   transformation, elevage et vente de poissons, conservation/distribution.
//   Modalites d'evaluation officielles (p.57) : exposes collectifs, analyse
//   documentaire individuelle, tests de connaissances ; criteres :
//   implication, estimation des progres, maitrise de competence.
//
// Ce chapitre ne reprend PAS le contenu du Chapitre 1 de la 8e AF (concevoir
// un PROTOTYPE D'OUTIL maritime, cahier des charges/croquis/maquette d'un
// objet isole) : il porte sur le developpement d'un PROJET ECONOMIQUE
// COMPLET (besoin -> solution responsable -> planification -> equipe ->
// realisation -> presentation -> evaluation d'impact), conformement a la
// progression verrouillee en Phase 0
// (MATRICE_PROGRESSION_ETAP_7_8_9_AF.md, section 1). Seul un rappel tres
// bref de l'acquis 8e AF est inclus (section 1.1).
//
// Adaptations pedagogiques de securite (comme en 7e/8e AF et documentees
// dans ARCHITECTURE_PEDAGOGIQUE_ETAP_9AF.md) : toute visite d'entreprise ou
// de ferme reste supervisee par un adulte responsable ; aucune sortie en mer
// non supervisee ; aucune vente reelle, aucun argent reel ; le "projet
// generateur de revenus" est traite comme un projet scolaire simule.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
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
  1,
  "Un projet pour les métiers de la mer",
  "Les 2 années précédentes, tu as découvert les métiers de la mer en Haïti, puis conçu le prototype d'un " +
  "outil utilisé par ce secteur. Cette année, tu vas aller plus loin : avec ton équipe, tu vas développer un " +
  "véritable projet — de l'idée jusqu'à l'évaluation des résultats — capable de générer des revenus dans ta " +
  "communauté tout en préservant la ressource marine.",
  [
    "Identifier un besoin réel lié aux produits de la mer dans un contexte local.",
    "Rechercher et choisir des solutions qui préservent l'écosystème marin.",
    "Planifier les étapes d'un projet générateur de revenus dans le secteur de la pêche.",
    "Organiser une équipe de projet et coordonner ses activités de façon responsable.",
    "Représenter la réalisation d'un projet (production, transformation, élevage ou distribution simulés).",
    "Présenter les résultats d'un projet, y compris à l'aide du numérique.",
    "Évaluer les impacts d'un projet sur la ressource, l'environnement et la communauté.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une commune côtière comme Anse-à-Veau, plusieurs jeunes remarquent qu'une " +
  "grande partie du poisson pêché localement est vendue sans transformation, souvent au même prix bas, faute " +
  "d'un vrai projet organisé de conservation ou de valorisation. Une classe de 9e AF décide de développer, à " +
  "titre d'exercice scolaire, un projet qui pourrait améliorer cette situation — sans jamais manipuler d'argent " +
  "réel ni sortir en mer sans supervision. Ce chapitre t'apprend à construire un tel projet, étape par étape.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Projet générateur de revenus — ensemble organisé d'activités visant à répondre à un besoin tout en créant une source de revenus pour ceux qui le réalisent."));
children.push(bulletPar("Écosystème marin — ensemble des êtres vivants et de leur milieu dans la mer, en interaction les uns avec les autres."));
children.push(bulletPar("Produits halieutiques — produits issus de la pêche (poissons, crustacés, mollusques...)."));
children.push(bulletPar("Équipe de projet — groupe de personnes qui se répartissent des tâches pour réaliser un projet commun."));
children.push(bulletPar("Impact — effet, positif ou négatif, d'un projet sur l'environnement, la société ou l'économie locale."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : des outils maritimes au projet complet", "1.1"));
children.push(bodyPar(
  "L'an dernier, tu as conçu le prototype d'un outil technique utilisé par les métiers de la mer, en suivant " +
  "un cahier des charges. Cette année, l'outil n'est plus l'objet central : c'est le projet dans son ensemble " +
  "qui devient la compétence à développer — depuis le besoin identifié jusqu'à l'évaluation des résultats, en " +
  "passant par le travail en équipe.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Identifier un besoin lié aux produits de la mer", "1.2"));
children.push(bodyPar(
  "Un bon projet commence toujours par un besoin réel, observé sur le terrain. Le programme officiel cite " +
  "notamment les besoins liés à la pêche, à la pisciculture (élevage de poissons), ainsi qu'à la conservation " +
  "et à la distribution des produits halieutiques.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des besoins fréquents dans les communautés côtières haïtiennes",
  [
    "Une partie de la pêche se perd faute de moyens de conservation adaptés.",
    "Les prix de vente restent bas quand le poisson n'est pas transformé.",
    "L'élevage de poissons ou de crustacés reste peu développé dans certaines zones.",
    "La distribution des produits vers les marchés voisins peut être mal organisée.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C01-01",
  "Ouverture — Une communauté côtière haïtienne",
  "Vue d'ensemble d'un petit port de pêche haïtien crédible (barques, étals de vente, filets), avec un groupe " +
  "d'élèves de 9e AF en observation, carnet en main, encadrés par un enseignant.",
  "Un vrai projet part toujours de l'observation d'un besoin réel du milieu.",
  "Ouvrir le chapitre sur une scène concrète, contextualisée en Haïti, qui ancre la démarche de projet.",
  "Illustration pleine largeur, scène de bord de mer haïtienne, ambiance studieuse et respectueuse du milieu.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C01-02",
  "Un besoin identifié sur le terrain",
  "Des élèves de 9e AF, carnet en main sous la supervision d'un enseignant, observant et notant un besoin " +
  "réel près d'un point de pêche ou d'un étal de vente de poissons (produit non conservé, prix bas, file " +
  "d'attente pour la transformation).",
  "Un projet solide part toujours d'un besoin réel et précisément observé, pas d'une idée improvisée.",
  "Montrer concrètement l'étape d'identification du besoin avant toute solution.",
  "Illustration demi-page, scène de bord de mer haïtienne, ton observateur et sérieux.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Rechercher des solutions qui préservent l'écosystème marin", "1.3"));
children.push(bodyPar(
  "Une fois le besoin identifié, il faut rechercher des solutions — mais jamais n'importe lesquelles : le " +
  "programme officiel insiste sur le fait que ces solutions doivent préserver l'écosystème marin. Une solution " +
  "qui génère des revenus en épuisant la ressource n'est pas une bonne solution.",
));
children.push(calloutBox(
  "ENVIRONNEMENT — Une solution responsable, c'est une solution qui...",
  [
    "Ne prélève pas plus de ressources que ce que la mer peut renouveler.",
    "Évite le gaspillage (transformation ou conservation plutôt que perte du produit).",
    "Respecte les périodes et les zones de reproduction des espèces marines.",
    "Profite à la communauté locale sur le long terme, pas seulement à court terme.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1F4A33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Planifier les étapes d'un projet générateur de revenus", "1.4"));
children.push(bodyPar(
  "Le programme officiel demande de définir et planifier les différentes étapes d'un projet dans le secteur " +
  "de la pêche. Plusieurs types de projets sont proposés par le programme, à titre d'exemples non exhaustifs : " +
  "production de fruits de mer, transformation pour la consommation, élevage et vente de poissons, ou " +
  "conservation et distribution des produits halieutiques.",
));
children.push(threeColTable(
  ["Type de projet", "Exemple d'activité", "Ce que le projet cherche à améliorer"],
  [
    ["Production", "Élevage de poissons, crustacés ou écrevisses", "Augmenter une ressource disponible localement"],
    ["Transformation", "Fumage, séchage ou salage du poisson", "Réduire les pertes, augmenter la valeur du produit"],
    ["Élevage et vente", "Élevage et vente de poissons", "Créer une activité génératrice de revenus stable"],
    ["Conservation et distribution", "Chaîne du froid, transport vers les marchés", "Réduire les pertes entre la pêche et la vente"],
  ],
  [2600, 3400, 3400],
));
children.push(spacer(160));
children.push(calloutBox(
  "PROJET — Les grandes étapes à planifier",
  [
    "1. Décrire précisément le besoin observé et la solution envisagée.",
    "2. Fixer un objectif clair et réaliste pour le projet.",
    "3. Lister les ressources nécessaires (matériel, personnes, temps).",
    "4. Répartir les tâches entre les membres de l'équipe.",
    "5. Prévoir un moment de présentation des résultats.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, "3A2A57",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C01-03",
  "Planifier les étapes d'un projet",
  "Un groupe d'élèves autour d'un tableau ou d'une grande feuille, écrivant les étapes d'un projet (besoin, " +
  "solution, ressources, tâches, présentation) sous forme de schéma simple.",
  "Un projet réussi commence toujours par une planification claire, écrite et partagée.",
  "Rendre visible la démarche de planification avant la réalisation.",
  "Illustration demi-page, scène de classe haïtienne, ton organisé et collaboratif.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Organiser et coordonner une équipe responsable", "1.5"));
children.push(bodyPar(
  "Le programme officiel demande de gérer et coordonner les activités du projet en adoptant un comportement " +
  "responsable. Cela signifie répartir les tâches clairement, faire des points d'avancement réguliers " +
  "(« revue de projet »), et présenter les résultats au groupe ou à la classe.",
));
children.push(twoColTable(
  "Rôle dans l'équipe", "Responsabilité principale",
  [
    ["Coordination", "S'assurer que chaque tâche avance et que l'équipe se réunit régulièrement."],
    ["Recherche", "Rassembler les informations utiles sur le besoin et les solutions possibles."],
    ["Organisation matérielle", "Lister et préparer ce qui est nécessaire pour représenter le projet."],
    ["Présentation", "Préparer la présentation finale des résultats, avec ou sans outil numérique."],
  ],
));
children.push(spacer(160));

children.push(calloutBox(
  "SÉCURITÉ — Un projet responsable, même simulé",
  [
    "Toute visite d'une entreprise, d'une ferme d'élevage ou d'un site de pêche se fait uniquement en groupe et " +
    "sous la supervision d'un adulte responsable (enseignant ou tuteur).",
    "Aucune sortie en mer n'est réalisée dans le cadre de ce chapitre.",
    "Aucun argent réel n'est manipulé : les revenus et les ventes évoqués dans le projet restent simulés, à " +
    "titre d'exercice scolaire.",
    "Toute manipulation de produits de la mer (transformation, conservation) respecte les règles d'hygiène de " +
    "base et se fait sous supervision.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Réaliser et représenter le projet", "1.6"));
children.push(bodyPar(
  "Réaliser un projet en classe ne signifie pas nécessairement produire et vendre réellement : cela peut " +
  "prendre la forme d'un dossier de projet complet, d'une maquette, d'un plan détaillé ou d'une simulation " +
  "présentée à la classe. L'important est de montrer que toutes les étapes précédentes (besoin, solution, " +
  "planification, équipe) ont été suivies avec sérieux.",
));
children.push(bodyPar(
  "Le programme officiel prévoit notamment la visite d'entreprises de production ou de fermes d'élevage de " +
  "poissons et de crustacés, ainsi que d'installations de conservation et de distribution des produits " +
  "halieutiques, afin d'analyser leur fonctionnement et d'identifier des pistes d'amélioration — toujours en " +
  "groupe, sous la supervision d'un adulte responsable.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C01-04",
  "Exemple de production — élevage et transformation simulés",
  "Une scène représentant, de façon simulée et pédagogique, une étape d'un projet (bassin d'élevage de " +
  "poissons miniature réalisé en classe, ou étal de transformation représenté par une maquette), avec des " +
  "élèves de 9e AF au travail.",
  "Illustrer concrètement un exemple de réalisation de projet, restant une simulation scolaire.",
  "Montrer que la « réalisation » d'un projet peut prendre une forme représentée, sans activité réelle risquée.",
  "Illustration pleine largeur, scène de classe ou d'atelier scolaire haïtien, ambiance sérieuse et positive.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Présenter les résultats, y compris avec le numérique", "1.7"));
children.push(bodyPar(
  "Le programme officiel encourage fortement l'usage des nouvelles technologies du numérique pour présenter " +
  "les résultats des travaux de recherche — par exemple sous forme de tableaux ou de supports de présentation. " +
  "Ce n'est pas un chapitre à part : c'est un outil que tu utilises, quand c'est possible, pour mieux partager " +
  "le travail de ton équipe.",
));
children.push(calloutBox(
  "NUMÉRIQUE — Présenter un projet, avec ou sans ordinateur",
  [
    "Avec un ordinateur ou une tablette disponible : un tableau simple ou quelques diapositives peuvent " +
    "résumer le besoin, la solution et les résultats du projet.",
    "Sans matériel disponible : une affiche ou un tableau dessiné à la main remplit exactement la même " +
    "fonction — présenter clairement les résultats.",
    "Dans tous les cas, la présentation doit rester claire, organisée, et fidèle au travail réellement effectué.",
  ],
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE, "1F2A33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Évaluer les impacts du projet", "1.8"));
children.push(bodyPar(
  "Un bon projet ne s'arrête pas à sa réalisation : il faut aussi évaluer ses impacts, c'est-à-dire ses effets " +
  "sur la ressource marine, sur l'environnement et sur la communauté.",
));
children.push(threeColTable(
  ["Type d'impact", "Question à se poser", "Exemple"],
  [
    ["Impact sur la ressource", "Le projet préserve-t-il l'écosystème marin ?", "Pas de surpêche, respect des périodes de reproduction"],
    ["Impact environnemental", "Le projet évite-t-il le gaspillage ou la pollution ?", "Réduction des pertes grâce à la conservation"],
    ["Impact social/économique", "Le projet profite-t-il réellement à la communauté ?", "Revenus mieux répartis, activité stable pour les familles"],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : le projet de l'équipe d'Anse-à-Veau", "1.9"));
children.push(bodyPar(
  "Reprenons la situation présentée au début du chapitre. Avec ton équipe, tu dois choisir et planifier un " +
  "projet parmi ceux proposés par le programme (production, transformation, élevage et vente, ou conservation " +
  "et distribution).",
));
children.push(numberedPar("1. Quel besoin réel votre projet cherche-t-il à résoudre ?"));
children.push(numberedPar("2. Quelle solution choisissez-vous, et en quoi préserve-t-elle l'écosystème marin ?"));
children.push(numberedPar("3. Comment répartiriez-vous les rôles dans votre équipe de projet ?"));
children.push(numberedPar("4. Quel impact positif attendez-vous de ce projet pour la communauté ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de projet collectif — Développer un mini-projet des métiers de la mer"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Développer, en équipe, un mini-projet complet lié aux métiers de la mer, du besoin identifié jusqu'à l'évaluation des impacts, sous forme simulée." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier de projet, crayons, feuilles pour affiche ou schéma. Ordinateur ou tablette si disponible, facultatif." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Équipes de 4 à 5 élèves, avec un rôle attribué à chacun (coordination, recherche, organisation matérielle, présentation)." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez un des quatre types de projets proposés dans ce chapitre (production, transformation, élevage et vente, ou conservation et distribution)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Décrivez le besoin réel que votre projet cherche à résoudre."));
children.push(numberedPar("2. Proposez une solution qui préserve l'écosystème marin, en expliquant pourquoi."));
children.push(numberedPar("3. Planifiez les grandes étapes de votre projet (voir section 1.4)."));
children.push(numberedPar("4. Répartissez les rôles dans l'équipe (voir section 1.5)."));
children.push(numberedPar("5. Représentez la réalisation du projet (schéma, maquette simple, ou dossier écrit) — jamais une activité réelle risquée."));
children.push(numberedPar("6. Préparez une courte présentation des résultats, avec ou sans outil numérique."));
children.push(numberedPar("7. Évaluez les impacts attendus de votre projet (tableau de la section 1.8)."));
children.push(spacer(120));

children.push(bodyPar("GRILLE DE PLANIFICATION — À compléter par l'équipe :", { bold: true }));
children.push(threeColTable(
  ["Étape du projet", "Décision de l'équipe", "Responsable"],
  [
    ["Besoin identifié", "", ""],
    ["Solution choisie", "", ""],
    ["Ressources nécessaires", "", ""],
    ["Répartition des tâches", "", ""],
    ["Impact attendu", "", ""],
  ],
  [3000, 3600, 2400],
));
children.push(spacer(160));

children.push(mixedPar([{ text: "PRÉSENTATION : ", bold: true }, { text: "Chaque équipe présente son projet au reste de la classe (5 minutes environ), en expliquant le besoin, la solution choisie et l'impact attendu." }]));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C01-05",
  "Présentation des résultats devant la classe",
  "Une équipe d'élèves de 9e AF présentant son projet devant la classe, à l'aide d'une affiche ou d'un écran " +
  "partagé montrant un tableau simple.",
  "Le numérique, comme l'affiche papier, sert avant tout à partager clairement un travail d'équipe.",
  "Ancrer visuellement l'étape de présentation des résultats du projet.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Une installation liée aux métiers de la mer"));
children.push(bodyPar(
  "Avec un adulte responsable, visite ou renseigne-toi sur une installation liée aux métiers de la mer près de " +
  "chez toi (lieu de pêche, petit atelier de transformation, point de vente de poissons). Pose quelques " +
  "questions simples aux personnes présentes, avec leur accord.",
));
children.push(threeColTable(
  ["Installation observée", "À quel besoin répond-elle ?", "Une amélioration possible"],
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
    "Un projet générateur de revenus commence toujours par un besoin réel, observé dans le milieu.",
    "Une solution n'est acceptable que si elle préserve l'écosystème marin.",
    "Planifier un projet, c'est fixer un objectif, lister les ressources et répartir les tâches.",
    "Une équipe de projet responsable communique régulièrement et présente ses résultats.",
    "Réaliser un projet en classe peut prendre la forme d'un dossier, d'une maquette ou d'une simulation — " +
    "jamais une activité réelle risquée.",
    "Le numérique est un outil utile, mais non obligatoire, pour présenter les résultats d'un projet.",
    "Évaluer un projet, c'est examiner ses impacts sur la ressource, l'environnement et la communauté.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Identifier un besoin réel lié aux produits de la mer.",
    "☐ Proposer une solution qui préserve l'écosystème marin.",
    "☐ Planifier les grandes étapes d'un projet générateur de revenus.",
    "☐ Expliquer comment organiser et coordonner une équipe de projet.",
    "☐ Représenter la réalisation d'un projet sans activité réelle risquée.",
    "☐ Présenter les résultats d'un projet, avec ou sans outil numérique.",
    "☐ Évaluer les impacts d'un projet sur la ressource, l'environnement et la communauté.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : besoin, solution responsable, écosystème marin, planification, équipe de projet, " +
    "présentation des résultats, impact.",
    "Vocabulaire clé à maîtriser : projet générateur de revenus, produits halieutiques, équipe de projet, impact.",
    "Avant l'évaluation, vérifie que tu peux : décrire les étapes d'un projet ; expliquer pourquoi une solution " +
    "doit préserver l'écosystème marin ; citer un exemple d'impact positif et un exemple d'impact négatif.",
    "Question rapide de vérification : cite les quatre étapes principales d'un projet vues dans ce chapitre, " +
    "dans l'ordre.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "écosystème marin · équipe de projet · impact · produits halieutiques · besoin · planification · revenus.",
  { italics: true },
));
children.push(numberedPar("1. Un projet commence toujours par l'identification d'un ......................"));
children.push(numberedPar("2. Une solution doit préserver l'......................"));
children.push(numberedPar("3. Les poissons, crustacés et mollusques issus de la pêche sont des ......................"));
children.push(numberedPar("4. Fixer un objectif et lister les ressources fait partie de la ......................"));
children.push(numberedPar("5. Un groupe qui se répartit les tâches d'un projet forme une ......................"));
children.push(numberedPar("6. Un projet générateur de ...................... vise à créer une source de revenus locale."));
children.push(numberedPar("7. Évaluer les effets d'un projet sur l'environnement, c'est évaluer son ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Un projet générateur de revenus doit d'abord :"));
children.push(bulletPar("a) être présenté avec un ordinateur"));
children.push(bulletPar("b) répondre à un besoin réel observé"));
children.push(bulletPar("c) utiliser de l'argent réel"));
children.push(spacer(60));
children.push(numberedPar("2. Une solution qui préserve l'écosystème marin, c'est une solution qui :"));
children.push(bulletPar("a) prélève le plus de ressources possible"));
children.push(bulletPar("b) respecte les périodes de reproduction des espèces"));
children.push(bulletPar("c) ignore l'environnement pour maximiser les revenus"));
children.push(spacer(60));
children.push(numberedPar("3. Parmi les projets suivants, lequel est cité par le programme officiel ?"));
children.push(bulletPar("a) Projet de transformation des fruits de mer"));
children.push(bulletPar("b) Projet de construction d'un bateau à moteur"));
children.push(bulletPar("c) Projet d'exportation internationale"));
children.push(spacer(60));
children.push(numberedPar("4. Une visite d'entreprise ou de ferme prévue par ce chapitre se fait :"));
children.push(bulletPar("a) seul, sans autorisation"));
children.push(bulletPar("b) en groupe, sous la supervision d'un adulte responsable"));
children.push(bulletPar("c) uniquement en mer"));
children.push(spacer(60));
children.push(numberedPar("5. Le numérique, dans ce chapitre, sert surtout à :"));
children.push(bulletPar("a) remplacer complètement le travail d'équipe"));
children.push(bulletPar("b) présenter les résultats d'un projet, quand c'est possible"));
children.push(bulletPar("c) réaliser des ventes réelles en ligne"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Vrai ou faux (justifie ta réponse)"));
children.push(numberedPar("1. Un projet peut être réalisé uniquement sous forme de dossier ou de maquette, sans activité réelle risquée."));
children.push(numberedPar("2. Évaluer un projet consiste uniquement à compter l'argent gagné."));
children.push(numberedPar("3. Une équipe de projet doit se réunir régulièrement pour suivre l'avancement du travail."));
children.push(numberedPar("4. Le programme officiel impose un seul type de projet possible pour ce chapitre."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / décision de projet"));
children.push(numberedPar("1. Ton équipe hésite entre un projet de transformation et un projet d'élevage de poissons. Propose un critère pour vous aider à choisir, et justifie-le."));
children.push(numberedPar("2. Une équipe propose un projet qui rapporterait beaucoup de revenus mais épuiserait rapidement la ressource marine. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("3. Explique pourquoi une bonne planification peut éviter des problèmes pendant la réalisation d'un projet."));
children.push(numberedPar("4. Un camarade pense que présenter un projet à l'oral suffit, sans support écrit ni numérique. Es-tu d'accord ? Justifie ta réponse."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de développer, étape par étape, un projet complet lié aux métiers de la mer : " +
  "identifier un besoin réel, rechercher une solution qui préserve l'écosystème marin, planifier les étapes du " +
  "projet, organiser une équipe responsable, représenter la réalisation du projet sans activité réelle risquée, " +
  "présenter les résultats — avec ou sans numérique — et évaluer les impacts du projet sur la ressource, " +
  "l'environnement et la communauté. Cette démarche complète, du besoin à l'évaluation, prépare aux projets des " +
  "chapitres suivants du manuel.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "besoin · écosystème marin · produits halieutiques · planification · équipe de projet · présentation des " +
  "résultats · impact.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C01-06",
  "Évaluer les impacts d'un projet",
  "Un petit groupe d'élèves examinant ensemble un tableau d'impacts (ressource, environnement, communauté) " +
  "rempli à la main, dans une salle de classe haïtienne.",
  "L'évaluation des impacts est une étape aussi importante que la réalisation elle-même.",
  "Ancrer visuellement l'étape finale d'évaluation du projet.",
  "Illustration demi-page, scène de classe haïtienne, ton réflexif et sérieux.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C01-07",
  "Synthèse — Les étapes d'un projet des métiers de la mer",
  "Une carte mentale ou un schéma en 6 étapes (besoin, solution responsable, planification, équipe, " +
  "réalisation/représentation, présentation et évaluation), avec une icône simple pour chaque étape.",
  "Visualiser d'un coup d'œil la démarche complète de projet enseignée dans ce chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style schéma/carte mentale colorée, cohérente avec la charte ETAP.",
));

await buildAndSave(children, 1, "Manuel_ETAP_9AF_Chapitre1.docx");
