// Manuel d'EPS 9e AF — Chapitre 4
// Football : reglements, fondamentaux techniques et organisation tactique
//
// Regles de football verifiees (recherche web avant redaction, IFAB /
// The FA) : distinction coup franc direct / indirect (le direct peut etre
// marque directement, l'indirect doit d'abord toucher un autre joueur).
// Les autres regles presentees ici (touche, corner, coup de pied de but,
// penalty, hors-jeu simplifie) correspondent aux Lois du Jeu standard,
// presentees a un niveau volontairement simplifie pour la 9e AF, sans
// detail professionnel inutile (aucune regle inventee).
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, chapterOpening,
  exercicesHeading, pageBreak, qcmBlock, spacer, buildAndSave,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
} from "./common.mjs";

const children = [];

// ================= OUVERTURE DE CHAPITRE =================
children.push(...chapterOpening(
  4,
  "Football : règlements, fondamentaux techniques et organisation tactique",
  "Un partenaire démarqué, un espace libre, un adversaire proche : en une fraction de seconde, quelle décision est la plus adaptée — et pourquoi ?",
  [
    "Identifier les principales règles nécessaires à une pratique scolaire organisée du football.",
    "Reconnaître le rôle de l’arbitre, des partenaires et des adversaires.",
    "Expliquer et appliquer conduite de balle, contrôle, passe, tir et déplacement sans ballon.",
    "Distinguer attaque et défense : largeur, profondeur, soutien, démarquage, replacement.",
    "Observer une situation de jeu, choisir une solution simple et justifier sa décision.",
    "Adopter fair-play, sécurité, coopération et respect des décisions arbitrales.",
    "Analyser sa pratique et proposer un ajustement.",
  ],
));

children.push(illustrationBox(
  "ILL-9AF-C04-01",
  "Le terrain et ses repères essentiels",
  "Schéma pédagogique clair, vu du dessus, d’un terrain de football scolaire : limites du terrain, ligne médiane, surfaces de but, buts, sens de jeu indiqué par une flèche. Style épuré, étiquettes lisibles.",
  "Les repères essentiels d’un terrain de football scolaire.",
  "Donner un repère spatial commun avant de présenter les règles et les fondamentaux.",
  "Paysage, format horizontal, schéma pleine largeur.",
));
children.push(spacer(200));

// ---- 4.1 ----
children.push(sectionHeading("Le football, un jeu collectif réglementé", "4.1"));
children.push(bodyPar(
  "Comme tu l’as vu au Chapitre 3, le football s’est construit autour de règles communes qui permettent d’organiser le jeu entre deux équipes. Ce chapitre revient sur ces règles à un niveau pratique : le but du jeu est de faire progresser le ballon pour marquer dans le but adverse, tout en coopérant avec ses partenaires et en s’opposant, dans le respect des règles, aux actions de l’équipe adverse. Le jeu se déroule sur un terrain délimité, avec un ballon, deux buts, deux équipes, et un arbitre chargé de faire respecter les règles communes."
));
children.push(spacer(200));

// ---- 4.2 ----
children.push(sectionHeading("Les règles essentielles", "4.2"));
children.push(bodyPar(
  "Le jeu commence et reprend selon des règles précises (coup d’envoi en début de période ou après un but). Le ballon est hors du jeu lorsqu’il franchit entièrement une ligne de touche ou de but, ou lorsque l’arbitre arrête le jeu ; il est en jeu dans tous les autres cas, y compris lorsqu’il touche l’arbitre resté sur le terrain."
));
children.push(bodyPar(
  "Lorsque le ballon sort entièrement par la ligne de touche, il est remis en jeu par une touche, réalisée par l’équipe adverse de celle qui l’a touché en dernier. Lorsqu’il sort par la ligne de but après avoir touché en dernier un joueur de l’équipe qui attaque, un coup de pied de but est accordé à l’équipe qui défend. Lorsqu’il sort par la ligne de but après avoir touché en dernier un joueur de l’équipe qui défend, un corner est accordé à l’équipe qui attaque."
));
children.push(bodyPar(
  "Une faute peut donner lieu à un coup franc. Un coup franc direct peut être marqué directement dans le but adverse ; un coup franc indirect doit d’abord toucher un autre joueur avant qu’un but puisse être valable. Lorsqu’une faute grave est commise par l’équipe qui défend à l’intérieur de sa propre surface de but, un penalty peut être accordé."
));
children.push(bodyPar(
  "Le hors-jeu, expliqué ici de façon simple, concerne un joueur attaquant qui, au moment où le ballon lui est joué par un partenaire, se trouve plus près du but adverse que l’avant-dernier adversaire, sans être dans sa propre moitié de terrain. Ce chapitre ne détaille pas toutes les exceptions professionnelles de cette règle : l’essentiel, au niveau scolaire, est de comprendre l’idée générale pour mieux lire le jeu."
));
children.push(illustrationBox(
  "ILL-9AF-C04-02",
  "Règles et reprises du jeu",
  "Planche pédagogique en plusieurs vignettes simples illustrant : une remise en touche, un corner, un coup de pied de but et un coup franc, dans des situations scolaires claires. Style épuré, étiquettes lisibles.",
  "Quatre reprises de jeu essentielles, présentées côte à côte pour faciliter la comparaison.",
  "Aider l’élève à distinguer visuellement les différentes reprises de jeu.",
  "Paysage, format horizontal, planche en 4 vignettes.",
));
children.push(spacer(200));

// ---- 4.3 ----
children.push(sectionHeading("Arbitrage et fair-play", "4.3"));
children.push(bodyPar(
  "L’arbitre observe le jeu, applique les règles communes et signale ses décisions. Un joueur respecte le signal de l’arbitre, fait preuve d’honnêteté (par exemple en reconnaissant une faute commise sans attendre d’être vu), garde la maîtrise de soi, et respecte à la fois ses partenaires et ses adversaires. Une décision arbitrale, même contestée, ne justifie jamais la violence ni les insultes : un désaccord se signale toujours de façon respectueuse."
));
children.push(calloutBox(
  "Fair-play",
  ["Accepter une décision arbitrale, même en désaccord, et l’exprimer avec respect, fait partie intégrante du jeu — bien plus que la contestation ou la confrontation."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ---- 4.4 ----
children.push(sectionHeading("Conduite de balle", "4.4"));
children.push(bodyPar(
  "Bien conduire le ballon suppose de garder le regard suffisamment relevé pour observer la situation, d’utiliser des touches de balle adaptées à la vitesse recherchée, de savoir changer de direction, et de protéger raisonnablement le ballon face à un adversaire, sans geste dangereux. Ce travail se construit à travers des situations progressives, jamais à travers des défis dangereux ou une recherche de vitesse maximale non contrôlée."
));
children.push(spacer(200));

// ---- 4.5 ----
children.push(sectionHeading("Contrôle et réception", "4.5"));
children.push(bodyPar(
  "Bien contrôler un ballon reçu, c’est déjà préparer l’action suivante. Un contrôle orienté consiste à recevoir le ballon de façon à faciliter directement une passe, une conduite ou un tir, plutôt que de simplement arrêter le ballon devant soi sans intention."
));
children.push(illustrationBox(
  "ILL-9AF-C04-03",
  "Fondamentaux techniques",
  "Planche illustrant quatre fondamentaux dans des positions anatomiquement cohérentes : un élève conduisant le ballon en regardant devant lui, un élève réalisant un contrôle orienté, un élève réalisant une passe, un élève réalisant un tir équilibré. Élèves haïtiens de 9e AF, environnement scolaire.",
  "Les quatre fondamentaux techniques présentés dans ce chapitre : conduite, contrôle, passe et tir.",
  "Servir de référence visuelle pour la posture correcte de chaque fondamental.",
  "Paysage, format horizontal, planche en 4 vignettes.",
));
children.push(spacer(200));

// ---- 4.6 ----
children.push(sectionHeading("La passe", "4.6"));
children.push(bodyPar(
  "Une bonne passe combine précision (elle arrive là où le partenaire peut la contrôler), dosage (une force adaptée à la distance), orientation (elle facilite l’action suivante du partenaire), et un bon choix de partenaire et de moment. Après avoir passé le ballon, le joueur doit également se déplacer pour rester utile à son équipe plutôt que de rester immobile."
));
children.push(spacer(200));

// ---- 4.7 ----
children.push(sectionHeading("Le tir", "4.7"));
children.push(bodyPar(
  "Un tir efficace repose d’abord sur le placement du corps, l’équilibre et la précision, bien plus que sur la seule puissance. Ce chapitre ne valorise jamais la recherche de puissance maximale au détriment du contrôle. Les activités scolaires de tir doivent toujours prévoir des distances et des zones de sécurité adaptées, pour protéger les élèves qui observent ou qui récupèrent le ballon."
));
children.push(calloutBox(
  "Sécurité",
  ["Ne jamais récupérer un ballon dans une zone de tir avant le signal de l’enseignant, et toujours respecter les distances de sécurité prévues."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- 4.8 ----
children.push(sectionHeading("Jouer sans ballon", "4.8"));
children.push(bodyPar(
  "Un joueur peut aider son équipe même sans toucher le ballon. Le démarquage consiste à se déplacer pour devenir disponible pour un partenaire. Le soutien consiste à se placer pour offrir une solution supplémentaire au porteur du ballon. Créer de l’espace, se déplacer utilement et observer en permanence la situation font partie des actions les plus importantes du jeu collectif, même si elles restent parfois moins visibles qu’une passe ou qu’un tir."
));
children.push(illustrationBox(
  "ILL-9AF-C04-04",
  "Jouer sans ballon",
  "Scène de jeu scolaire montrant un porteur de balle et, autour de lui, un partenaire qui se démarque et un autre qui offre un soutien, créant une ligne de passe claire (représentée par une flèche pointillée). Élèves haïtiens de 9e AF.",
  "Le démarquage et le soutien créent des solutions pour le porteur du ballon.",
  "Illustrer concrètement l’action utile d’un joueur sans ballon.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 4.9 ----
children.push(sectionHeading("Principes offensifs élémentaires", "4.9"));
children.push(bodyPar(
  "En attaque, une équipe cherche à conserver le ballon, à progresser vers le but adverse, et à créer plusieurs solutions pour le porteur du ballon. Cela passe par la largeur (occuper les côtés du terrain pour élargir l’espace de jeu), la profondeur (proposer des solutions devant et derrière le porteur du ballon), le soutien, et un choix réfléchi entre passe, conduite ou tir selon la situation. Ce chapitre ne demande pas de mémoriser des systèmes tactiques professionnels complexes : il s’agit de comprendre ces principes simples et de les appliquer."
));
children.push(illustrationBox(
  "ILL-9AF-C04-05",
  "Principes offensifs",
  "Schéma d’un petit terrain scolaire montrant une équipe en attaque occupant largeur et profondeur, avec plusieurs lignes de passe possibles représentées par des flèches pointillées vers le porteur du ballon.",
  "Largeur, profondeur et soutien créent plusieurs solutions pour l’équipe qui attaque.",
  "Illustrer concrètement l’organisation offensive présentée dans cette section.",
  "Paysage, format horizontal, schéma de terrain.",
));
children.push(spacer(200));

// ---- 4.10 ----
children.push(sectionHeading("Principes défensifs élémentaires", "4.10"));
children.push(bodyPar(
  "En défense, une équipe cherche à protéger son espace et son but : se replacer rapidement, observer les déplacements de l’adversaire, s’entraider entre partenaires, et intercepter ou récupérer le ballon de façon sûre. Les activités scolaires de ce chapitre interdisent strictement les tacles et les contacts dangereux : la récupération du ballon doit toujours rester contrôlée et sécuritaire."
));
children.push(illustrationBox(
  "ILL-9AF-C04-06",
  "Principes défensifs",
  "Schéma d’un petit terrain scolaire montrant deux défenseurs se replaçant pour protéger l’espace devant leur but, en s’entraidant, sans aucun contact physique représenté. Style clair et sécuritaire.",
  "Le replacement et l’entraide défensive protègent l’espace sans contact dangereux.",
  "Illustrer une organisation défensive scolaire sûre.",
  "Paysage, format horizontal, schéma de terrain.",
));
children.push(spacer(200));

// ---- 4.11 ----
children.push(sectionHeading("Transition attaque-défense", "4.11"));
children.push(bodyPar(
  "Le jeu change rapidement selon que l’équipe possède ou perd le ballon. Quand une équipe perd le ballon, elle doit observer rapidement la nouvelle situation et se replacer pour protéger son espace. Quand une équipe récupère le ballon, elle doit rapidement offrir des solutions offensives plutôt que d’attendre. Cette capacité à changer rapidement de posture, appelée transition, est une compétence importante du jeu collectif."
));
children.push(illustrationBox(
  "ILL-9AF-C04-07",
  "La transition attaque-défense",
  "Séquence de trois vignettes montrant la même situation scolaire : perte du ballon, puis replacement/récupération collective, puis offre de solutions offensives par l’équipe qui vient de récupérer le ballon.",
  "Le cycle perte du ballon → replacement/récupération → solutions offensives.",
  "Illustrer concrètement la notion de transition présentée dans cette section.",
  "Paysage, format horizontal, séquence de 3 vignettes.",
));
children.push(spacer(200));

// ---- 4.12 ----
children.push(sectionHeading("Lire le jeu et prendre une décision", "4.12"));
children.push(bodyPar(
  "Face à une situation de jeu — un partenaire démarqué, un espace libre, un défenseur proche — un joueur doit observer rapidement plusieurs informations avant de choisir une action. Il n’existe pas toujours une seule bonne réponse : plusieurs décisions peuvent être raisonnables selon la façon dont elles sont justifiées."
));
children.push(calloutBox(
  "Méthode — Lire une situation de jeu",
  [
    "Où est le ballon ?",
    "Où sont mes partenaires ?",
    "Où sont les adversaires ?",
    "Quel espace est disponible ?",
    "Quelle action est la plus adaptée ?",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ---- 4.13 ----
children.push(sectionHeading("Organisation tactique scolaire", "4.13"));
children.push(bodyPar(
  "Dans un cadre scolaire, l’organisation tactique reste simple : elle vise une occupation rationnelle de l’espace et une répartition claire des rôles (par exemple, ne pas se regrouper systématiquement autour du ballon), plutôt que la mémorisation de formations professionnelles complexes. En petits effectifs, chaque élève peut plus facilement comprendre son rôle et celui de ses partenaires."
));
children.push(spacer(200));

// ---- 4.14 ----
children.push(sectionHeading("Sécurité dans la pratique", "4.14"));
children.push(bodyPar(
  "Avant toute activité, il convient de vérifier le sol, les limites du terrain, la stabilité des buts, l’état du ballon, la présence d’obstacles, l’espace entre les groupes et le matériel utilisé. Un échauffement adapté et une attention à l’hydratation et à la récupération, selon le contexte, complètent cette préparation."
));
children.push(calloutBox(
  "Sécurité",
  ["En cas de douleur, de malaise ou de tout problème inhabituel pendant une activité, arrête immédiatement ce que tu fais et préviens ton enseignant ou un adulte responsable."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Pratiquer le football dans le contexte scolaire haïtien", ""));
children.push(bodyPar(
  "Le football occupe une place sociale importante en Haïti, mais ce chapitre reste centré sur les apprentissages d’EPS. Lorsque le nombre de ballons disponibles est limité, l’enseignant organise des ateliers, des rotations et des jeux à effectif réduit, dans une cour, un terrain scolaire ou un espace polyvalent correctement organisé. Aucun poteau, objet ou installation improvisé présentant un danger n’est jamais utilisé, quelle que soit la contrainte de ressources."
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique — « Passer, se déplacer, décider »", ""));
children.push(bodyPar(
  "Sous supervision, votre classe organise un jeu à effectif réduit, adapté à l’espace et au nombre de ballons disponibles. Objectifs : réaliser des passes précises, se déplacer utilement après avoir passé, offrir du soutien, observer la situation, et prendre une décision adaptée."
));
[
  "Comprendre la consigne et les limites de l’espace de jeu.",
  "Jouer une première période courte en observant vos propres choix (passe, déplacement, soutien).",
  "Faire une courte pause pour observer, avec l’enseignant, un ou deux critères simples (par exemple : se déplacer après sa passe).",
  "Jouer une seconde période en essayant d’améliorer ce critère.",
  "Analyser, en petit groupe, ce qui a changé entre les deux périodes.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "L’enseignant peut adapter les dimensions du terrain, la durée, l’effectif et certaines règles selon le contexte de l’école ; aucune recherche de contact physique n’est jamais proposée dans cette activité.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(sectionHeading("Activité d’analyse — « Quelle solution choisir ? »", ""));
children.push(bodyPar(
  "Observe la situation ci-dessous, puis identifie les informations importantes, choisis une solution et justifie ton choix."
));
children.push(illustrationBox(
  "ILL-9AF-C04-08",
  "Grande situation d’analyse tactique",
  "Schéma d’un petit terrain scolaire haïtien montrant un porteur du ballon, un partenaire démarqué à droite, un partenaire en soutien derrière, un défenseur proche du porteur, et un espace libre devant. Suffisamment de détails pour permettre plusieurs questions d’observation et de décision.",
  "Une situation de jeu suffisamment riche pour observer, analyser et décider.",
  "Servir de support commun à l’activité d’analyse tactique du chapitre.",
  "Paysage, format horizontal, schéma de terrain.",
));
[
  "Où se trouve le ballon, et qui le possède ?",
  "Quels partenaires sont démarqués ou en soutien ?",
  "Où se trouvent les adversaires, et quel espace est disponible ?",
  "Quelle décision te semble la plus adaptée : passer, conduire ou tirer ? Justifie ta réponse.",
  "Une autre décision pourrait-elle aussi être raisonnable ? Explique pourquoi.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE D'ARBITRAGE ET FAIR-PLAY =================
children.push(pageBreak());
children.push(sectionHeading("Activité d’arbitrage et fair-play", ""));
children.push(bodyPar(
  "Sous supervision, observe une courte situation de jeu proposée par ton enseignant. Identifie la règle concernée, observe attentivement ce qui se passe, puis explique la décision appropriée, dans le respect, la neutralité et l’honnêteté."
));
children.push(bodyPar(
  "Cette activité ne vise jamais à encourager une confrontation ou une contestation agressive : elle entraîne à observer et à expliquer une décision avec calme et respect.",
  { italics: true }
));
children.push(spacer(200));

// ================= AUTOEVALUATION =================
children.push(sectionHeading("Autoévaluation", ""));
children.push(calloutBox(
  "Autoévaluation",
  ["Ce bilan personnel t’aide à mesurer ton propre chemin parcouru. Il ne sert jamais à te comparer aux autres élèves."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Je respecte les règles", "", ""],
    ["Je contrôle et je passe avec davantage de précision", "", ""],
    ["Je me déplace après ma passe", "", ""],
    ["J’observe avant de décider", "", ""],
    ["Je participe à l’attaque et au replacement", "", ""],
    ["Je respecte partenaires, adversaires et arbitre", "", ""],
    ["Je peux expliquer une décision tactique simple", "", ""],
  ],
  [3600, 3200, 2400],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le football se joue selon des règles communes : touche, corner, coup de pied de but, coups francs directs et indirects, penalty, hors-jeu simplifié.",
  "L’arbitre applique ces règles ; le fair-play suppose de respecter ses décisions, même en cas de désaccord exprimé avec respect.",
  "Conduite, contrôle, passe et tir sont les fondamentaux techniques présentés dans ce chapitre, toujours travaillés de façon progressive et sécuritaire.",
  "Jouer sans ballon (démarquage, soutien) est aussi important que les actions avec ballon.",
  "En attaque, largeur, profondeur et soutien créent plusieurs solutions ; en défense, replacement, observation et entraide protègent l’espace, sans contact dangereux.",
  "La transition attaque-défense demande d’observer et de réagir rapidement lors d’une perte ou d’une récupération du ballon.",
  "La méthode « Où est le ballon ? Où sont mes partenaires ? Où sont les adversaires ? Quel espace est disponible ? Quelle action est la plus adaptée ? » aide à lire une situation de jeu.",
  "La sécurité (vérification de l’espace et du matériel, réaction en cas de problème) reste une condition indispensable de toute pratique.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : interpréter un schéma de terrain, reconnaître une règle, identifier un fondamental technique, analyser une situation tactique, choisir une décision et la justifier, à partir de situations nouvelles et contextualisées.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(4));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(démarquage - précision - fair-play - passe - replacement - décision - contrôle - espace - arbitrage - soutien)", italics: true, color: "555555" },
]));
[
  "1. L’action d’envoyer le ballon à un partenaire pour qu’il le reçoive s’appelle une ____________________.",
  "2. Le fait de recevoir le ballon de façon à faciliter l’action suivante s’appelle le ____________________.",
  "3. L’action de se déplacer pour devenir disponible pour un partenaire s’appelle le ____________________.",
  "4. Le fait de se placer pour offrir une solution supplémentaire à un partenaire porteur du ballon s’appelle le ____________________.",
  "5. L’action d’observer le jeu, signaler et décider selon des règles communes s’appelle l’____________________.",
  "6. Une zone du terrain libre ou occupée par les joueurs, à utiliser ou à protéger, s’appelle un ____________________.",
  "7. Le fait de revenir rapidement à une position utile après une perte ou une récupération du ballon s’appelle le ____________________.",
  "8. Le fait d’adapter son geste à une cible ou à un objectif précis relève de la ____________________.",
  "9. Le respect des adversaires, des partenaires et de l’arbitre, dans la victoire comme dans la défaite, est une marque de ____________________.",
  "10. Le fait de choisir une action après avoir observé une situation de jeu s’appelle une ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que se passe-t-il lorsque le ballon franchit entièrement la ligne de touche ?", opts: ["a) le jeu s’arrête définitivement", "b) une remise en touche est accordée à l’équipe adverse de celle qui a touché le ballon en dernier", "c) un corner est automatiquement accordé", "d) un penalty est sifflé"] },
  { q: "2. Quelle est la principale différence entre un coup franc direct et un coup franc indirect ?", opts: ["a) il n’existe aucune différence", "b) un coup franc direct peut être marqué directement, un coup franc indirect doit d’abord toucher un autre joueur", "c) seul le coup franc indirect peut être marqué directement", "d) le coup franc direct n’est jamais autorisé à l’école"] },
  { q: "3. Que doit faire un élève face à une décision arbitrale avec laquelle il n’est pas d’accord ?", opts: ["a) contester bruyamment et agressivement", "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin", "c) arrêter de jouer immédiatement", "d) insulter l’arbitre"] },
  { q: "4. Que permet le démarquage dans le jeu offensif ?", opts: ["a) rester immobile près d’un adversaire", "b) devenir disponible pour recevoir une passe d’un partenaire", "c) éviter tout contact avec le ballon", "d) sortir volontairement du terrain"] },
  { q: "5. Que recommande ce chapitre au sujet des tacles ou contacts dangereux dans les activités scolaires ?", opts: ["a) ils sont encouragés pour récupérer le ballon plus vite", "b) ils sont interdits ; la priorité va à une récupération sûre et collective", "c) ils sont autorisés uniquement en fin de match", "d) ils ne concernent que les compétitions officielles"] },
  { q: "6. Selon la méthode « Lire une situation de jeu » présentée dans ce chapitre, que doit-on faire après avoir observé le ballon, les partenaires, les adversaires et l’espace disponible ?", opts: ["a) recommencer l’observation depuis le début", "b) choisir l’action la plus adaptée à la situation", "c) arrêter immédiatement le jeu", "d) attendre les instructions de l’arbitre"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Touche", "a) Action d’envoyer le ballon à un partenaire pour qu’il le reçoive"],
  ["2. Corner", "b) Action de se déplacer pour devenir disponible pour un partenaire"],
  ["3. Contrôle", "c) Fait de se placer pour offrir une solution supplémentaire au porteur du ballon"],
  ["4. Passe", "d) Fait de revenir rapidement à une position utile après une perte ou une récupération du ballon"],
  ["5. Démarquage", "e) Ensemble de comportements respectueux envers partenaires, adversaires et arbitre"],
  ["6. Soutien", "f) Remise en jeu du ballon depuis la ligne de touche, après qu’il l’ait entièrement franchie"],
  ["7. Replacement", "g) Coup de pied de coin accordé à l’attaque quand le ballon sort par la ligne de but après avoir touché un défenseur en dernier"],
  ["8. Fair-play", "h) Fait de recevoir le ballon de façon à faciliter l’action suivante"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève reçoit le ballon avec un partenaire démarqué à sa droite et un espace libre devant lui. Explique quelles informations il doit observer avant de choisir entre passer, conduire ou tirer, puis propose une décision justifiée pour cette situation.",
  "2. Après avoir réalisé une passe, un élève reste immobile au même endroit. Explique pourquoi ce comportement limite les solutions de son équipe, et propose ce qu’il devrait faire à la place.",
  "3. Une équipe perd le ballon au milieu du terrain. Décris, à l’aide de la notion de transition, ce que les joueurs devraient faire immédiatement après cette perte.",
  "4. Un élève n’est pas d’accord avec une décision de l’arbitre pendant un match scolaire. Explique la réaction appropriée, et pourquoi contester bruyamment ne serait pas une solution adaptée.",
  "5. Avant une activité de football, tu remarques que le terrain présente un risque (par exemple une zone glissante ou un but instable). Explique ce que tu devrais faire, et pourquoi cette réaction est une preuve de responsabilité.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 41, "Manuel_EPS_9AF_Chapitre4.docx");
console.log("Chapitre 4 (9e AF) genere:", outPath);
