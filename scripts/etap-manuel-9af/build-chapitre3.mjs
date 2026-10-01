// Manuel d'ETAP 9e AF — Chapitre 3 : Un projet pour l'agriculture
// (champ officiel : Métiers de l'agriculture générateurs de revenus).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), unite "Les metiers de l'agriculture
//   generateurs de revenus en 9e annee du fondamental", p.58(fin)-60/77.
// Page reverifiee en direct le 2026-08-22 (execution controlee Chapitre 3,
// verification prealable obligatoire) via le lecteur Google Drive, en plus
// de la verification deja faite en Phase 0 et lors des Chapitres 1 et 2.
// Limite exacte confirmee : l'unite Agriculture se termine en tout debut de
// page 60 (bloc "Modalites et criteres d'evaluation") ; l'unite
// Entrepreneuriat (Chapitre 4) commence immediatement apres sur la meme
// page 60 - aucun chevauchement, aucun contenu d'Entrepreneuriat importe
// par erreur dans ce chapitre.
//
// Citations exactes relevees ce jour :
//   Competence : « Developper, de maniere collaborative, un projet offrant
//   des perspectives pour generer des revenus dans un contexte local, tout
//   en preservant l'environnement. »
//   Savoirs/savoir-faire (4, verbatim resume fidele - meme structure que
//   l'unite "Metiers de la mer" du Chapitre 1) : (1) identifier un besoin
//   (production, stockage, conservation, transformation et distribution) en
//   relation avec les produits ; (2) rechercher et choisir des solutions qui
//   preservent l'environnement ; (3) definir et planifier les differentes
//   etapes d'un projet de l'agriculture generateur de revenus ; (4) gerer et
//   coordonner les activites d'un projet en adoptant un comportement
//   responsable.
//   Activites officielles : organisation d'une equipe de projet (taches,
//   revue de projet, presentation des resultats) ; visites de fermes de
//   production de legumes, de volaille et d'usines de transformation
//   agricole, avec analyse des installations visitees ; usage du numerique
//   fortement encourage pour presenter les resultats (comme pour l'unite
//   Mer - explicitement present dans le texte de cette unite) ; projets
//   possibles (liste non exhaustive) : production et vente de legumes,
//   transformation et vente de jus de fruits, production et vente de
//   volailles.
//   Modalites d'evaluation officielles (p.60, meme formulation que les
//   Chapitres 1 et 2) : exposes collectifs, analyse documentaire
//   individuelle, tests de connaissances ; criteres : implication,
//   estimation des progres, maitrise de competence.
//
// Ce chapitre ne reprend PAS le contenu du Chapitre 4 de la 7e AF ("Les
// metiers de l'agriculture : outils et organisation" - registre "identifier/
// decrire" les outils et organisations sociales) ni celui du Chapitre 4 de
// la 8e AF ("Concevoir un prototype : metiers agricoles" - registre
// "concevoir un prototype d'outil" isole, cahier des charges/croquis/
// maquette). Il porte sur le developpement d'un PROJET ECONOMIQUE COMPLET
// (besoin -> solution -> planification -> equipe -> realisation ->
// presentation -> evaluation d'impact), au meme titre que le Chapitre 1
// (Mer), conformement a la progression verrouillee en Phase 0
// (MATRICE_PROGRESSION_ETAP_7_8_9_AF.md, section 3). Seul un rappel tres
// bref des acquis 7e/8e AF est inclus (section 3.1).
//
// Adaptations pedagogiques de securite : toute visite de ferme ou d'usine
// de transformation reste supervisee par un adulte responsable ; aucune
// manipulation d'outil agricole tranchant, d'animal sans encadrement, ou de
// produit chimique (engrais/pesticide) par l'eleve ; toute transformation
// alimentaire simulee respecte des regles d'hygiene de base ; aucune vente
// reelle, aucun argent reel - le projet reste un exercice scolaire simule,
// comme au Chapitre 1.
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
  3,
  "Un projet pour l'agriculture",
  "En 7e AF, tu as décrit des outils et des organisations utilisés dans les métiers de l'agriculture. En 8e " +
  "AF, tu as conçu le prototype d'un outil agricole. Cette année, l'outil laisse la place au projet dans son " +
  "ensemble : avec ton équipe, tu vas développer un projet agricole complet, capable de générer des revenus " +
  "tout en préservant l'environnement.",
  [
    "Identifier un besoin réel lié à la production, au stockage, à la conservation, à la transformation ou à la distribution agricole.",
    "Rechercher et choisir des solutions qui préservent l'environnement.",
    "Planifier les étapes d'un projet agricole générateur de revenus.",
    "Organiser une équipe de projet et coordonner ses activités de façon responsable.",
    "Représenter la réalisation d'un projet agricole (production, transformation ou distribution simulées).",
    "Présenter les résultats d'un projet, y compris à l'aide du numérique.",
    "Évaluer les impacts d'un projet sur l'environnement et la communauté.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Près de Mirebalais, dans le Plateau Central, une classe de 9e AF remarque qu'une " +
  "partie des légumes récoltés par les jardins scolaires et familiaux se gâte faute de conservation, et que " +
  "peu de jus de fruits locaux sont transformés avant d'être vendus. La classe décide de développer, à titre " +
  "d'exercice scolaire, un projet agricole qui pourrait améliorer cette situation — sans jamais manipuler " +
  "d'argent réel ni d'outil dangereux. Ce chapitre t'apprend à construire un tel projet, étape par étape.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Stockage — le fait de conserver un produit dans de bonnes conditions avant son utilisation ou sa vente."));
children.push(bulletPar("Conservation — ensemble de techniques permettant de garder un produit agricole utilisable plus longtemps."));
children.push(bulletPar("Transformation — le fait de modifier un produit agricole pour créer un nouveau produit (par exemple, des fruits transformés en jus)."));
children.push(bulletPar("Distribution — le fait d'acheminer un produit du lieu de production vers les lieux de vente ou de consommation."));
children.push(bulletPar("Impact — effet, positif ou négatif, d'un projet sur l'environnement, la société ou l'économie locale."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : des outils agricoles au projet complet", "3.1"));
children.push(bodyPar(
  "L'an dernier, tu as conçu le prototype d'un outil agricole en suivant un cahier des charges. Cette année, " +
  "l'outil n'est plus l'objet central : c'est le projet dans son ensemble qui devient la compétence à " +
  "développer — depuis le besoin identifié jusqu'à l'évaluation des résultats, en passant par le travail en " +
  "équipe, exactement comme au Chapitre 1 pour les métiers de la mer.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Identifier un besoin lié à la production agricole", "3.2"));
children.push(bodyPar(
  "Un bon projet agricole commence par un besoin réel. Le programme officiel cite notamment les besoins liés " +
  "à la production, au stockage, à la conservation, à la transformation et à la distribution des produits " +
  "agricoles.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des besoins fréquents dans les communautés agricoles haïtiennes",
  [
    "Une partie de la récolte se perd faute de moyens de stockage ou de conservation adaptés.",
    "Les fruits et légumes sont souvent vendus bruts, sans transformation qui augmenterait leur valeur.",
    "L'élevage de volailles reste peu développé dans certaines zones, malgré la demande locale.",
    "La distribution vers les marchés voisins peut être mal organisée, causant des pertes.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C03-01",
  "Ouverture — Une petite exploitation scolaire",
  "Vue d'un jardin scolaire ou d'une petite exploitation agricole haïtienne crédible (légumes, poulailler), " +
  "avec un groupe d'élèves de 9e AF en observation, carnet en main, encadrés par un enseignant.",
  "Un vrai projet part toujours de l'observation d'un besoin réel du milieu agricole.",
  "Ouvrir le chapitre sur une scène concrète, contextualisée en Haïti, qui ancre la démarche de projet.",
  "Illustration pleine largeur, scène agricole haïtienne, ambiance studieuse et respectueuse du milieu.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C03-02",
  "Un besoin identifié sur le terrain",
  "Des élèves de 9e AF, carnet en main sous la supervision d'un enseignant, observant et notant un besoin " +
  "réel dans un jardin scolaire ou un petit marché agricole (légumes non conservés, prix bas, manque de " +
  "transformation).",
  "Un projet solide part toujours d'un besoin réel et précisément observé.",
  "Montrer concrètement l'étape d'identification du besoin avant toute solution.",
  "Illustration demi-page, scène agricole haïtienne, ton observateur et sérieux.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Rechercher des solutions qui préservent l'environnement", "3.3"));
children.push(bodyPar(
  "Une fois le besoin identifié, il faut rechercher des solutions qui préservent l'environnement — le " +
  "programme officiel insiste sur ce point pour l'agriculture, comme il insistait sur la préservation de " +
  "l'écosystème marin au Chapitre 1.",
));
children.push(calloutBox(
  "ENVIRONNEMENT — Une solution responsable, c'est une solution qui...",
  [
    "N'épuise pas les sols par une utilisation excessive d'engrais ou de pesticides.",
    "Évite le gaspillage (conservation ou transformation plutôt que perte du produit).",
    "Respecte les cycles naturels de culture ou d'élevage.",
    "Profite à la communauté locale sur le long terme, pas seulement à court terme.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1F4A33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Planifier les étapes d'un projet agricole générateur de revenus", "3.4"));
children.push(bodyPar(
  "Le programme officiel demande de définir et planifier les différentes étapes d'un projet de l'agriculture. " +
  "Plusieurs types de projets sont proposés, à titre d'exemples non exhaustifs : production et vente de " +
  "légumes, transformation et vente de jus de fruits, ou production et vente de volailles.",
));
children.push(threeColTable(
  ["Type de projet", "Exemple d'activité", "Ce que le projet cherche à améliorer"],
  [
    ["Production et vente", "Culture et vente de légumes", "Créer une activité génératrice de revenus stable"],
    ["Transformation et vente", "Fabrication et vente de jus de fruits", "Réduire les pertes, augmenter la valeur du produit"],
    ["Élevage et vente", "Production et vente de volailles", "Développer une filière locale encore peu exploitée"],
  ],
  [2800, 3400, 3400],
));
children.push(spacer(160));
children.push(calloutBox(
  "PROJET — Les grandes étapes à planifier",
  [
    "1. Décrire précisément le besoin observé et la solution envisagée.",
    "2. Fixer un objectif clair et réaliste pour le projet.",
    "3. Lister les ressources nécessaires (terrain ou espace scolaire, matériel, temps).",
    "4. Répartir les tâches entre les membres de l'équipe.",
    "5. Prévoir un moment de présentation des résultats.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, "3A2A57",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C03-03",
  "Planifier les étapes d'un projet agricole",
  "Un groupe d'élèves autour d'un tableau ou d'une grande feuille, écrivant les étapes d'un projet agricole " +
  "(besoin, solution, ressources, tâches, présentation) sous forme de schéma simple.",
  "Un projet agricole réussi commence toujours par une planification claire, écrite et partagée.",
  "Rendre visible la démarche de planification avant la réalisation.",
  "Illustration demi-page, scène de classe haïtienne, ton organisé et collaboratif.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Organiser et coordonner une équipe responsable", "3.5"));
children.push(bodyPar(
  "Le programme officiel demande de gérer et coordonner les activités du projet en adoptant un comportement " +
  "responsable — répartir les tâches, faire des points d'avancement réguliers, et présenter les résultats.",
));
children.push(twoColTable(
  "Rôle dans l'équipe", "Responsabilité principale",
  [
    ["Coordination", "S'assurer que chaque tâche avance et que l'équipe se réunit régulièrement."],
    ["Recherche", "Rassembler les informations utiles sur le besoin agricole et les solutions possibles."],
    ["Organisation matérielle", "Lister et préparer ce qui est nécessaire pour représenter le projet."],
    ["Présentation", "Préparer la présentation finale des résultats, avec ou sans outil numérique."],
  ],
));
children.push(spacer(160));

children.push(calloutBox(
  "SÉCURITÉ — Un projet responsable, même simulé",
  [
    "Toute visite d'une ferme, d'un jardin ou d'une usine de transformation se fait uniquement en groupe et " +
    "sous la supervision d'un adulte responsable.",
    "Aucun élève ne manipule seul un outil agricole tranchant, un animal sans encadrement, ou un produit " +
    "chimique (engrais, pesticide).",
    "Toute transformation alimentaire simulée (jus, conserves) respecte des règles d'hygiène de base et se " +
    "fait sous supervision.",
    "Aucun argent réel n'est manipulé : les ventes évoquées dans le projet restent simulées, à titre " +
    "d'exercice scolaire.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Réaliser et représenter le projet", "3.6"));
children.push(bodyPar(
  "Comme au Chapitre 1, réaliser un projet en classe ne signifie pas produire et vendre réellement : cela " +
  "peut prendre la forme d'un dossier de projet complet, d'une maquette de petite exploitation, d'un plan " +
  "détaillé ou d'une simulation présentée à la classe.",
));
children.push(bodyPar(
  "Le programme officiel prévoit la visite de fermes de production de légumes, de volaille, ainsi que " +
  "d'usines de transformation agricole, afin d'analyser leur fonctionnement et d'identifier des pistes " +
  "d'amélioration face à l'environnement — toujours en groupe, sous la supervision d'un adulte responsable.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C03-04",
  "Exemple de production — légumes, jus et volailles simulés",
  "Une scène représentant, de façon simulée et pédagogique, une étape d'un projet agricole (petit jardin " +
  "scolaire, étal de jus de fruits ou poulailler représenté par une maquette), avec des élèves de 9e AF au " +
  "travail.",
  "Illustrer concrètement un exemple de réalisation de projet, restant une simulation scolaire.",
  "Montrer que la « réalisation » d'un projet peut prendre une forme représentée, sans activité réelle risquée.",
  "Illustration pleine largeur, scène de jardin scolaire ou d'atelier haïtien, ambiance sérieuse et positive.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Présenter les résultats, y compris avec le numérique", "3.7"));
children.push(bodyPar(
  "Le programme officiel encourage fortement l'usage des nouvelles technologies du numérique pour présenter " +
  "les résultats des travaux de recherche — par exemple sous forme de tableaux ou de supports de " +
  "présentation, exactement comme pour l'unité des métiers de la mer.",
));
children.push(calloutBox(
  "NUMÉRIQUE — Présenter un projet agricole, avec ou sans ordinateur",
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
children.push(sectionHeading("Évaluer les impacts du projet", "3.8"));
children.push(bodyPar(
  "Un bon projet agricole s'évalue aussi selon ses impacts sur l'environnement et sur la communauté.",
));
children.push(threeColTable(
  ["Type d'impact", "Question à se poser", "Exemple"],
  [
    ["Impact environnemental", "Le projet préserve-t-il les sols et évite-t-il le gaspillage ?", "Réduction des pertes grâce à la conservation ou à la transformation"],
    ["Impact social", "Le projet répond-il à un vrai besoin de la communauté ?", "Accès à des produits transformés localement, moins chers"],
    ["Impact économique", "Le projet crée-t-il une source de revenus stable ?", "Activité génératrice de revenus pour les familles impliquées"],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : le projet de l'équipe de Mirebalais", "3.9"));
children.push(bodyPar(
  "Reprenons la situation présentée au début du chapitre. Avec ton équipe, choisis et planifie un projet " +
  "parmi ceux proposés par le programme (production et vente de légumes, transformation et vente de jus de " +
  "fruits, ou production et vente de volailles).",
));
children.push(numberedPar("1. Quel besoin réel votre projet cherche-t-il à résoudre ?"));
children.push(numberedPar("2. Quelle solution choisissez-vous, et en quoi préserve-t-elle l'environnement ?"));
children.push(numberedPar("3. Comment répartiriez-vous les rôles dans votre équipe de projet ?"));
children.push(numberedPar("4. Quel impact positif attendez-vous de ce projet pour la communauté ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de projet collectif — Développer un mini-projet agricole"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Développer, en équipe, un mini-projet agricole complet, du besoin identifié jusqu'à l'évaluation des impacts, sous forme simulée." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier de projet, crayons, feuilles pour affiche ou schéma. Ordinateur ou tablette si disponible, facultatif." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Équipes de 4 à 5 élèves, avec un rôle attribué à chacun (coordination, recherche, organisation matérielle, présentation)." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez un des trois types de projets proposés dans ce chapitre (production et vente de légumes, transformation et vente de jus de fruits, ou production et vente de volailles)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Décrivez le besoin réel que votre projet cherche à résoudre."));
children.push(numberedPar("2. Proposez une solution qui préserve l'environnement, en expliquant pourquoi."));
children.push(numberedPar("3. Planifiez les grandes étapes de votre projet (voir section 3.4)."));
children.push(numberedPar("4. Répartissez les rôles dans l'équipe (voir section 3.5)."));
children.push(numberedPar("5. Représentez la réalisation du projet (schéma, maquette simple, ou dossier écrit) — jamais une activité réelle risquée."));
children.push(numberedPar("6. Préparez une courte présentation des résultats, avec ou sans outil numérique."));
children.push(numberedPar("7. Évaluez les impacts attendus de votre projet (tableau de la section 3.8)."));
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
  "ILL-ETAP-9AF-C03-05",
  "Présentation des résultats devant la classe",
  "Une équipe d'élèves de 9e AF présentant son projet agricole devant la classe, à l'aide d'une affiche ou " +
  "d'un écran partagé montrant un tableau simple.",
  "Le numérique, comme l'affiche papier, sert avant tout à partager clairement un travail d'équipe.",
  "Ancrer visuellement l'étape de présentation des résultats du projet.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Une exploitation agricole près de chez moi"));
children.push(bodyPar(
  "Avec un adulte responsable, visite ou renseigne-toi sur une petite exploitation agricole ou un point de " +
  "vente de produits agricoles près de chez toi. Pose quelques questions simples aux personnes présentes, " +
  "avec leur accord.",
));
children.push(threeColTable(
  ["Exploitation observée", "À quel besoin répond-elle ?", "Une amélioration possible"],
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
    "Un projet agricole générateur de revenus commence toujours par un besoin réel, observé dans le milieu.",
    "Une solution n'est acceptable que si elle préserve l'environnement (sols, cycles naturels).",
    "Planifier un projet, c'est fixer un objectif, lister les ressources et répartir les tâches.",
    "Une équipe de projet responsable communique régulièrement et présente ses résultats.",
    "Réaliser un projet en classe peut prendre la forme d'un dossier, d'une maquette ou d'une simulation — " +
    "jamais une activité réelle risquée.",
    "Le numérique est un outil utile, mais non obligatoire, pour présenter les résultats d'un projet.",
    "Évaluer un projet, c'est examiner ses impacts sur l'environnement, la société et l'économie locale.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Identifier un besoin réel lié à la production, au stockage, à la conservation, à la transformation ou à la distribution agricole.",
    "☐ Proposer une solution qui préserve l'environnement.",
    "☐ Planifier les grandes étapes d'un projet agricole générateur de revenus.",
    "☐ Expliquer comment organiser et coordonner une équipe de projet.",
    "☐ Représenter la réalisation d'un projet sans activité réelle risquée.",
    "☐ Présenter les résultats d'un projet, avec ou sans outil numérique.",
    "☐ Évaluer les impacts d'un projet sur l'environnement et la communauté.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : besoin agricole, solution responsable, environnement, planification, équipe de " +
    "projet, présentation des résultats, impact.",
    "Vocabulaire clé à maîtriser : stockage, conservation, transformation, distribution, impact.",
    "Avant l'évaluation, vérifie que tu peux : décrire les étapes d'un projet agricole ; expliquer pourquoi " +
    "une solution doit préserver l'environnement ; citer un exemple d'impact positif et un exemple d'impact " +
    "négatif.",
    "Question rapide de vérification : cite les trois types de projets agricoles proposés dans ce chapitre.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "stockage · conservation · transformation · distribution · environnement · équipe de projet · impact.",
  { italics: true },
));
children.push(numberedPar("1. Conserver un produit dans de bonnes conditions avant de l'utiliser, c'est faire du ......................"));
children.push(numberedPar("2. Modifier un produit agricole pour créer un nouveau produit (comme un jus), c'est faire de la ......................"));
children.push(numberedPar("3. Acheminer un produit vers les lieux de vente, c'est assurer sa ......................"));
children.push(numberedPar("4. Une solution responsable préserve l'......................"));
children.push(numberedPar("5. Un groupe qui se répartit les tâches d'un projet forme une ......................"));
children.push(numberedPar("6. Évaluer les effets d'un projet sur la société ou l'économie, c'est évaluer son ......................"));
children.push(numberedPar("7. Garder des légumes plus longtemps utilisables grâce à de bonnes techniques, c'est faire de la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Un projet agricole générateur de revenus doit d'abord :"));
children.push(bulletPar("a) être présenté avec un ordinateur"));
children.push(bulletPar("b) répondre à un besoin réel observé"));
children.push(bulletPar("c) utiliser de l'argent réel"));
children.push(spacer(60));
children.push(numberedPar("2. Une solution qui préserve l'environnement, c'est une solution qui :"));
children.push(bulletPar("a) épuise les sols le plus rapidement possible"));
children.push(bulletPar("b) respecte les cycles naturels de culture ou d'élevage"));
children.push(bulletPar("c) ignore l'environnement pour maximiser les revenus"));
children.push(spacer(60));
children.push(numberedPar("3. Parmi les projets suivants, lequel est cité par le programme officiel ?"));
children.push(bulletPar("a) Projet de transformation et de vente de jus de fruits"));
children.push(bulletPar("b) Projet de construction d'un tracteur motorisé"));
children.push(bulletPar("c) Projet d'exportation internationale de céréales"));
children.push(spacer(60));
children.push(numberedPar("4. Une visite de ferme ou d'usine de transformation prévue par ce chapitre se fait :"));
children.push(bulletPar("a) seul, sans autorisation"));
children.push(bulletPar("b) en groupe, sous la supervision d'un adulte responsable"));
children.push(bulletPar("c) uniquement avec des outils tranchants"));
children.push(spacer(60));
children.push(numberedPar("5. Le numérique, dans ce chapitre, sert surtout à :"));
children.push(bulletPar("a) remplacer complètement le travail d'équipe"));
children.push(bulletPar("b) présenter les résultats d'un projet, quand c'est possible"));
children.push(bulletPar("c) réaliser des ventes réelles en ligne"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Vrai ou faux (justifie ta réponse)"));
children.push(numberedPar("1. Un projet agricole peut être réalisé uniquement sous forme de dossier ou de maquette, sans activité réelle risquée."));
children.push(numberedPar("2. Le stockage et la conservation servent uniquement à décorer un produit."));
children.push(numberedPar("3. Une équipe de projet doit se réunir régulièrement pour suivre l'avancement du travail."));
children.push(numberedPar("4. Le programme officiel impose un seul type de projet agricole possible pour ce chapitre."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / décision de projet"));
children.push(numberedPar("1. Ton équipe hésite entre un projet de transformation de jus de fruits et un projet d'élevage de volailles. Propose un critère pour vous aider à choisir, et justifie-le."));
children.push(numberedPar("2. Une équipe propose un projet qui rapporterait beaucoup de revenus mais épuiserait rapidement les sols. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("3. Explique pourquoi la conservation ou la transformation d'un produit agricole peut réduire les pertes."));
children.push(numberedPar("4. Un camarade pense qu'un projet agricole n'a pas besoin d'être présenté clairement, puisque « tout le monde connaît déjà l'agriculture ». Es-tu d'accord ? Justifie ta réponse."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de développer, étape par étape, un projet complet lié à l'agriculture : identifier un " +
  "besoin réel de production, de stockage, de conservation, de transformation ou de distribution, rechercher " +
  "une solution qui préserve l'environnement, planifier les étapes du projet, organiser une équipe " +
  "responsable, représenter la réalisation du projet sans activité réelle risquée, présenter les résultats — " +
  "avec ou sans numérique — et évaluer les impacts du projet sur l'environnement et la communauté. Cette " +
  "démarche, déjà rencontrée au Chapitre 1, se retrouve appliquée ici à un nouveau champ.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "besoin agricole · stockage · conservation · transformation · distribution · équipe de projet · impact.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C03-06",
  "Évaluer les impacts d'un projet agricole",
  "Un petit groupe d'élèves examinant ensemble un tableau d'impacts (environnement, société, économie) " +
  "rempli à la main, dans une salle de classe haïtienne.",
  "L'évaluation des impacts est une étape aussi importante que la réalisation elle-même.",
  "Ancrer visuellement l'étape finale d'évaluation du projet.",
  "Illustration demi-page, scène de classe haïtienne, ton réflexif et sérieux.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C03-07",
  "Synthèse — Les étapes d'un projet agricole",
  "Une carte mentale ou un schéma en 6 étapes (besoin, solution responsable, planification, équipe, " +
  "réalisation/représentation, présentation et évaluation), avec une icône simple pour chaque étape.",
  "Visualiser d'un coup d'œil la démarche complète de projet enseignée dans ce chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style schéma/carte mentale colorée, cohérente avec la charte ETAP.",
));

await buildAndSave(children, 29, "Manuel_ETAP_9AF_Chapitre3.docx");
