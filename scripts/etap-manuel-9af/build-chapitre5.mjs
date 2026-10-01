// Manuel d'ETAP 9e AF — Chapitre 5 : Projet de synthèse ETAP 9e AF
// (synthèse des Chapitres 1-4 ; NE clôture PLUS le volume depuis
// l'arbitrage du 2026-08-28 qui ajoute un Chapitre 6 dédié — voir
// GATE_5_VS_6_CHAPITRES_ETAP_9AF.md, section "Résolution du gate").
//
// STATUT : [CHOIX ÉDITORIAL — SYNTHÈSE PÉDAGOGIQUE]. Ce chapitre n'est PAS
// prescrit tel quel par le MENFP : aucune nouvelle competence officielle
// n'y est inventee. Sa fonction est de faire mobiliser, articuler et
// appliquer, dans un projet integrateur original, les competences deja
// verifiees et enseignees aux Chapitres 1 a 4 :
//   Chapitre 1 - Metiers de la mer (p.56-57) : « Developper, de maniere
//   collaborative, un projet offrant des perspectives pour generer des
//   revenus dans un contexte local, tout en preservant la ressource. »
//   Chapitre 2 - Recyclage/energies renouvelables (p.57-58) : « Concevoir,
//   de maniere collaborative, des objets techniques utilisant des sources
//   d'energie renouvelables ou des objets recycles. »
//   Chapitre 3 - Agriculture (p.58-60) : « Developper, de maniere
//   collaborative, un projet offrant des perspectives pour generer des
//   revenus dans un contexte local, tout en preservant l'environnement. »
//   Chapitre 4 - Entrepreneuriat (p.60-61) : « Creer, de maniere
//   collaborative, une entreprise de production de bien ou de service en
//   reponse a un besoin local et en evaluer les impacts. »
// Toutes ces competences ont ete relues en direct au moment de la
// redaction de leur chapitre respectif (voir les rapports d'execution des
// Chapitres 1 a 4). Aucune relecture MENFP supplementaire n'etait requise
// pour ce chapitre puisqu'aucune competence nouvelle n'y est introduite.
//
// RAPPEL DE L'ANOMALIE DOCUMENTEE (Chapitre 4, 2026-08-22) : une 5e unite
// tronc-commun ("Nouvelles technologies du numerique en 9e AF", p.62,
// CAO/FAO) avait ete decouverte apres le verrouillage de la Phase 0,
// remettant en question la justification "5 chapitres, pas de champ
// Numerique dedie". RESOLU le 2026-08-28 : l'utilisateur a tranche pour
// l'Option A du gate (voir GATE_5_VS_6_CHAPITRES_ETAP_9AF.md) — un
// Chapitre 6 dedie a ete ajoute. Le present Chapitre 5 continue d'integrer
// le numerique de facon transversale (comme aux Chapitres 1-4) : il ne
// couvre PAS la competence CAO/FAO, traitee specifiquement au Chapitre 6.
//
// Ce chapitre ne repete PAS integralement le contenu des Chapitres 1 a 4 :
// il en offre une carte de synthese tres breve (section 5.1) puis se
// concentre sur une methode de projet integrateur originale, permettant a
// l'eleve de combiner librement au moins deux champs deja etudies.
//
// Adaptations de securite (heritees des Chapitres 1-4) : aucune activite
// financiere reelle, aucune sortie non supervisee, aucune manipulation
// dangereuse ; le projet integrateur reste un exercice scolaire simule,
// avec alternative accessible sans ordinateur ni Internet.
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
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  VERT, CUIVRE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  5,
  "Projet de synthèse ETAP 9e AF",
  "Depuis le début de l'année, tu as développé un projet des métiers de la mer, conçu un système écologique, " +
  "développé un projet agricole, et créé une entreprise fictive. Ce chapitre te propose de réunir ces " +
  "acquis dans un seul projet intégrateur, que tu construiras toi-même en choisissant les champs que tu veux " +
  "combiner.",
  [
    "Mobiliser au moins deux compétences déjà développées cette année.",
    "Choisir et justifier une combinaison de champs adaptée à un besoin réel.",
    "Planifier un projet intégrateur de bout en bout, en autonomie croissante.",
    "Utiliser les outils de projet (fiche, grille, tableau de ressources) déjà rencontrés cette année.",
    "Présenter et évaluer un projet intégrateur, y compris ses impacts.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Ta classe est invitée à proposer, pour la fête de fin d'année de l'école, un projet " +
  "qui combine au moins deux des champs étudiés cette année (métiers de la mer, recyclage et énergies " +
  "renouvelables, agriculture, entrepreneuriat). Ce chapitre t'aide à construire ce projet — entièrement " +
  "simulé, sans argent réel — étape par étape.",
  { italics: true },
));

children.push(subHeading("Vocabulaire utile"));
children.push(bulletPar("Projet intégrateur — projet qui combine plusieurs compétences déjà développées pour résoudre un besoin plus large."));
children.push(bulletPar("Bilan — synthèse de ce qui a été appris ou réalisé sur une période donnée."));
children.push(bulletPar("Autonomie — capacité à mener une tâche en prenant soi-même les décisions nécessaires, avec moins de guidage."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Ce que tu as appris — carte des acquis de 9e AF", "5.1"));
children.push(bodyPar(
  "Avant de commencer ton projet intégrateur, prends un moment pour te rappeler ce que chaque chapitre t'a " +
  "appris. Ce tableau résume les compétences déjà développées ; il ne les réexplique pas en détail — reviens " +
  "au chapitre correspondant si tu as besoin d'un rappel complet.",
));
children.push(threeColTable(
  ["Chapitre", "Champ", "Compétence développée (résumé)"],
  [
    ["1", "Métiers de la mer", "Développer un projet générateur de revenus en préservant la ressource marine"],
    ["2", "Recyclage et énergies renouvelables", "Concevoir un objet technique utilisant une énergie renouvelable ou des objets recyclés"],
    ["3", "Agriculture", "Développer un projet générateur de revenus en préservant l'environnement"],
    ["4", "Entrepreneuriat", "Créer une entreprise fictive et en évaluer les impacts"],
  ],
  [1800, 3400, 3800],
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C05-01",
  "Carte des acquis — les quatre champs de la 9e AF",
  "Une carte mentale ou un schéma en quatre branches (métiers de la mer, recyclage et énergies renouvelables, " +
  "agriculture, entrepreneuriat) résumant les quatre chapitres précédents.",
  "Donner à l'élève une vision d'ensemble des acquis de l'année avant d'entamer le projet intégrateur.",
  "Ancrer visuellement le lien entre les quatre chapitres et le projet de synthèse.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Une méthode pour un projet intégrateur", "5.2"));
children.push(bodyPar(
  "Chaque chapitre de cette année a suivi une méthode semblable : identifier un besoin, rechercher une " +
  "solution responsable, planifier les étapes, organiser une équipe, réaliser ou représenter le projet, le " +
  "présenter, puis évaluer ses impacts. Cette méthode reste valable pour un projet qui combine plusieurs " +
  "champs — c'est un choix de présentation pédagogique de ce manuel, pas une méthode imposée par le MENFP.",
));
children.push(calloutBox(
  "MÉTHODE — Les 7 étapes d'un projet intégrateur [CHOIX ÉDITORIAL — SYNTHÈSE PÉDAGOGIQUE]",
  [
    "1. Identifier un besoin réel qui pourrait mobiliser au moins deux champs étudiés.",
    "2. Choisir les champs à combiner et justifier ce choix.",
    "3. Rechercher une solution qui préserve la ressource et l'environnement.",
    "4. Planifier les étapes et organiser une équipe.",
    "5. Réaliser ou représenter le projet (jamais une activité réelle risquée).",
    "6. Présenter les résultats, avec ou sans numérique.",
    "7. Évaluer les impacts et les résultats du projet.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, "3A2A57",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Exemples courts de combinaisons possibles", "5.3"));
children.push(bodyPar(
  "Voici trois exemples courts de combinaisons possibles, à titre indicatif seulement. Ton équipe peut choisir " +
  "une combinaison différente, adaptée à ta communauté.",
));
children.push(threeColTable(
  ["Combinaison de champs", "Exemple de besoin", "Ce que cela mobilise"],
  [
    ["Agriculture + Recyclage/énergies", "Un jardin scolaire manquant d'eau régulièrement", "Un projet agricole utilisant une pompe solaire conçue au Chapitre 2"],
    ["Métiers de la mer + Entrepreneuriat", "Des produits de la mer non transformés", "Un projet de transformation devenant une entreprise fictive"],
    ["Agriculture + Entrepreneuriat", "Des fruits perdus faute de transformation", "Un projet agricole devenant une entreprise fictive de jus de fruits"],
  ],
  [3000, 3400, 3400],
));
children.push(spacer(160));
children.push(bodyPar(
  "Le numérique reste un outil transversal, utile à toutes les combinaisons pour organiser ou présenter le " +
  "projet — jamais un champ à part.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C05-02",
  "Identifier un besoin combiné",
  "Un groupe d'élèves de 9e AF discutant autour d'une carte ou d'un tableau reliant deux champs étudiés " +
  "(par exemple, agriculture et énergie), pour identifier un besoin combiné.",
  "Un projet intégrateur part d'un besoin qui mobilise plusieurs champs à la fois.",
  "Montrer concrètement l'étape de choix de la combinaison de champs.",
  "Illustration demi-page, scène de classe haïtienne, ton réflexif et collaboratif.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Outils de projet — fiches et grilles", "5.4"));
children.push(bodyPar(
  "Ces outils reprennent, sous une forme unique, les fiches déjà utilisées aux Chapitres 1 à 4.",
));
children.push(bodyPar("FICHE DE PROJET INTÉGRATEUR :", { bold: true }));
children.push(threeColTable(
  ["Élément du projet", "Décision de l'équipe", "Responsable"],
  [
    ["Champs combinés", "", ""],
    ["Besoin identifié", "", ""],
    ["Solution choisie", "", ""],
    ["Ressources nécessaires", "", ""],
    ["Répartition des tâches", "", ""],
    ["Impact attendu", "", ""],
  ],
  [3000, 3600, 2400],
));
children.push(spacer(160));
children.push(bodyPar("TABLEAU DES RESSOURCES :", { bold: true }));
children.push(twoColTable(
  "Ressource nécessaire", "Disponible dans mon école/ma classe ?",
  [
    ["Matériel scolaire (papier, carton, crayons)", ""],
    ["Ordinateur ou tablette (facultatif)", ""],
    ["Adulte responsable pour supervision", ""],
    ["Autre", ""],
  ],
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C05-03",
  "Planification du projet intégrateur",
  "Un groupe d'élèves remplissant la fiche de projet intégrateur et le tableau des ressources, sur une " +
  "grande feuille ou un cahier de projet.",
  "Une bonne planification s'appuie sur des outils simples et réutilisables.",
  "Illustrer concrètement l'étape de planification à l'aide des outils du chapitre.",
  "Illustration demi-page, scène de classe haïtienne, ton organisé et collaboratif.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Réaliser, présenter et évaluer le projet intégrateur", "5.5"));
children.push(bodyPar(
  "Comme dans les chapitres précédents, réaliser le projet signifie le représenter (schéma, maquette, dossier, " +
  "affiche) sans jamais mener une activité réelle risquée, financière ou dangereuse.",
));
children.push(calloutBox(
  "SÉCURITÉ — Un projet intégrateur, toujours simulé",
  [
    "Aucun argent réel n'est investi, emprunté ou manipulé.",
    "Aucune vente réelle, aucun contrat, aucun engagement financier réel.",
    "Toute visite ou enquête reste supervisée par un adulte responsable.",
    "Aucun outil dangereux, aucune installation réelle en fonctionnement n'est manipulé par l'élève.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(calloutBox(
  "NUMÉRIQUE — Présenter le projet intégrateur",
  [
    "Avec un ordinateur ou une tablette disponible : un tableau ou quelques diapositives peuvent résumer le " +
    "projet et ses résultats.",
    "Sans matériel disponible : une affiche présentant les mêmes éléments remplit exactement la même fonction.",
  ],
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE, "1F2A33",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C05-04",
  "Réaliser et représenter le projet intégrateur",
  "Une équipe assemblant une représentation simple de leur projet combiné (par exemple, une maquette de " +
  "jardin avec une petite pompe solaire dessinée), avec des matériaux scolaires simples.",
  "Réaliser un projet intégrateur reste une représentation sûre, jamais une activité réelle risquée.",
  "Montrer concrètement l'étape de réalisation du projet intégrateur.",
  "Illustration pleine largeur, scène de classe ou d'atelier scolaire haïtien, ambiance appliquée et sûre.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Grille d'évaluation du projet intégrateur", "5.6"));
children.push(bodyPar(
  "Cette grille est un outil pédagogique proposé par ce manuel. Elle n'est pas un barème officiel du MENFP.",
  { italics: true },
));
children.push(threeColTable(
  ["Critère", "Ce qui est observé", "Niveau atteint (à compléter)"],
  [
    ["Compréhension du besoin", "Le besoin est clairement identifié et justifié", ""],
    ["Pertinence de la solution", "La solution combine bien les champs choisis et préserve la ressource/l'environnement", ""],
    ["Organisation", "Les tâches sont réparties clairement dans l'équipe", ""],
    ["Mobilisation des acquis", "Le projet réutilise des notions vues dans au moins deux chapitres", ""],
    ["Justification", "Les choix de l'équipe sont expliqués et argumentés", ""],
    ["Collaboration", "Chaque membre de l'équipe a un rôle actif", ""],
    ["Présentation", "Le projet est présenté clairement, avec ou sans numérique", ""],
    ["Prise en compte des impacts", "Les impacts (environnemental, social, économique) sont évalués", ""],
  ],
  [3000, 4000, 2000],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Variantes accessibles", "5.7"));
children.push(calloutBox(
  "VARIANTES — Adapter le projet selon les ressources disponibles",
  [
    "Sans ordinateur ni Internet : toutes les fiches et présentations peuvent être réalisées entièrement sur papier.",
    "Sans possibilité de visite extérieure : une recherche documentaire en classe, ou un témoignage rapporté " +
    "par un adulte, peut remplacer l'enquête de terrain.",
    "En équipe réduite : le projet peut se limiter à deux champs combinés plutôt qu'à une combinaison plus complexe.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Le projet intégrateur — Consignes complètes"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Concevoir, en équipe, un projet intégrateur combinant au moins deux champs étudiés cette année, du besoin identifié jusqu'à l'évaluation des impacts." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier de projet, crayons, feuilles pour affiche ou schéma. Ordinateur ou tablette si disponible, facultatif." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Équipes de 4 à 5 élèves." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez au moins deux champs parmi ceux étudiés (Chapitres 1 à 4) et suivez la méthode en 7 étapes de la section 5.2." }]));
children.push(bodyPar("ÉTAPES À SUIVRE :", { bold: true }));
children.push(numberedPar("1. Remplissez la fiche de projet intégrateur (section 5.4)."));
children.push(numberedPar("2. Complétez le tableau des ressources (section 5.4)."));
children.push(numberedPar("3. Réalisez ou représentez votre projet (section 5.5)."));
children.push(numberedPar("4. Préparez une présentation, avec ou sans numérique (section 5.5)."));
children.push(numberedPar("5. Évaluez vos résultats à l'aide de la grille de la section 5.6."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un projet intégrateur combine au moins deux compétences déjà développées dans l'année.",
    "La méthode en 7 étapes (besoin, champs choisis, solution, planification, réalisation, présentation, " +
    "évaluation) reste valable pour tout projet combiné.",
    "Un projet intégrateur reste toujours simulé : aucun argent réel, aucune activité réellement risquée.",
    "Le numérique reste un outil transversal utile, jamais obligatoire.",
    "La grille d'évaluation de ce chapitre est un outil pédagogique du manuel, pas un barème officiel du MENFP.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Choisir et justifier une combinaison d'au moins deux champs étudiés.",
    "☐ Identifier un besoin qui mobilise plusieurs champs à la fois.",
    "☐ Planifier un projet intégrateur à l'aide des outils du chapitre.",
    "☐ Réaliser ou représenter un projet intégrateur sans activité réelle risquée.",
    "☐ Présenter un projet intégrateur, avec ou sans numérique.",
    "☐ Évaluer les résultats et les impacts d'un projet intégrateur.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : projet intégrateur, combinaison de champs, planification, mobilisation des acquis, impact.",
    "Avant l'évaluation, vérifie que tu peux : citer les quatre champs étudiés cette année et une compétence " +
    "pour chacun ; expliquer les 7 étapes d'un projet intégrateur ; justifier le choix d'une combinaison de " +
    "champs pour un besoin donné.",
    "Cette préparation reste un entraînement pédagogique original de ce manuel : aucune épreuve officielle " +
    "MENFP n'a été identifiée pour l'ETAP (voir RECHERCHE_EPREUVES_MENFP_ETAP_9AF.md).",
    "Question rapide de vérification : propose une combinaison de deux champs différente de celles présentées " +
    "en section 5.3, et explique brièvement pourquoi.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Vérification des acquis"));
children.push(numberedPar("1. Cite les quatre champs étudiés en 9e AF et une compétence développée pour chacun."));
children.push(numberedPar("2. Rappelle les 7 étapes de la méthode de projet intégrateur, dans l'ordre."));
children.push(numberedPar("3. Explique pourquoi un projet intégrateur reste toujours simulé."));
children.push(spacer(200));

children.push(subHeading("Exercice B — Application intégrée"));
children.push(bodyPar(
  "Une équipe souhaite combiner les champs « agriculture » et « recyclage et énergies renouvelables » pour " +
  "un projet de jardin scolaire irrigué par une pompe solaire.",
  { italics: true },
));
children.push(numberedPar("1. Quel besoin ce projet cherche-t-il à résoudre ?"));
children.push(numberedPar("2. Quelles compétences des Chapitres 2 et 3 ce projet mobilise-t-il ?"));
children.push(numberedPar("3. Propose une répartition des tâches pour une équipe de 4 élèves."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Analyse / comparaison"));
children.push(numberedPar("1. Compare deux combinaisons de champs possibles pour un même besoin (par exemple, un manque de revenus dans une famille). Laquelle te semble la plus réaliste, et pourquoi ?"));
children.push(numberedPar("2. Explique en quoi un projet intégrateur est différent d'un projet d'un seul chapitre."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Situation-problème / proposition argumentée"));
children.push(numberedPar("1. Ta communauté manque d'un service utile (à toi de le choisir). Propose une combinaison d'au moins deux champs étudiés cette année pour y répondre, et justifie ton choix."));
children.push(numberedPar("2. Une équipe propose un projet intégrateur qui demande d'investir de l'argent réel des élèves. Explique pourquoi cela ne respecte pas les règles de ce chapitre, et propose une solution simulée équivalente."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Bilan des acquis de 9e AF"));
children.push(bodyPar(
  "Cette année, tu as développé quatre projets liés à des champs différents : un projet des métiers de la mer " +
  "générateur de revenus, un système technique utilisant une énergie renouvelable ou des objets recyclés, un " +
  "projet agricole générateur de revenus, et une entreprise fictive complète. Ce chapitre t'a permis " +
  "de réunir ces acquis dans un projet intégrateur combinant plusieurs champs, en mobilisant davantage " +
  "d'autonomie, d'analyse et de justification qu'au début de l'année. Ces compétences — identifier un besoin, " +
  "planifier, organiser une équipe, réaliser, présenter et évaluer un projet — te seront utiles bien au-delà " +
  "de l'ETAP, y compris pour le chapitre suivant.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "projet intégrateur · bilan · autonomie · mobilisation des acquis · combinaison de champs.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C05-05",
  "Présentation et évaluation du projet intégrateur",
  "Une équipe d'élèves de 9e AF présentant leur projet intégrateur devant la classe, avec la grille " +
  "d'évaluation visible en arrière-plan.",
  "Valoriser la présentation et l'évaluation collective du projet intégrateur des Chapitres 1-4.",
  "Ancrer visuellement l'aboutissement du parcours des quatre premiers champs de la 9e AF.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante et conclusive.",
));

await buildAndSave(children, 58, "Manuel_ETAP_9AF_Chapitre5.docx");
