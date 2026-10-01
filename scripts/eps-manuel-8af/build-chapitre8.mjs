import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(8, "Basket-ball : maîtrise technique, démarquage, attaque, défense et coopération"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Au chapitre 7, tu as étudié les principes communs à tous les sports collectifs. Ce chapitre applique directement ces principes au basket-ball : contrôler le ballon, passer, te démarquer, progresser vers le panier, défendre sans danger, et surtout coopérer avec tes partenaires pour construire des occasions de jeu."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Mieux maîtriser les fondamentaux scolaires du basket-ball et les utiliser dans des situations de jeu : dribbler avec contrôle, passer, recevoir, se démarquer, progresser vers la cible, tirer dans une situation adaptée, défendre sans danger et coopérer. Ce chapitre développe une logique de jeu : observer → décider → agir → communiquer → se replacer → ajuster."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "connaître le but général du basket-ball et quelques règles scolaires essentielles ;",
  "adopter une position de disponibilité adaptée à l’action ;",
  "dribbler en contrôlant le ballon et en prenant progressivement des informations sur l’environnement ;",
  "réaliser et recevoir des passes simples avec précision ;",
  "te démarquer afin d’offrir une solution au porteur du ballon ;",
  "choisir entre dribbler, passer ou tenter une action vers le panier selon une situation simple ;",
  "comprendre les principes élémentaires de l’attaque : largeur, soutien, circulation du ballon et progression ;",
  "comprendre les principes élémentaires de la défense : placement, contrôle, respect de l’adversaire et protection d’un espace ou de la cible ;",
  "te replacer lors d’un changement de possession ;",
  "coopérer, communiquer, respecter les décisions et analyser une situation de jeu.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Dribble, démarquage, passe, panier, défense, espace, coopération, replacement.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Ce chapitre réutilise la coordination, la vitesse, la gestion de l’effort, la sécurité et les principes de coopération déjà étudiés, ainsi que les principes communs des sports collectifs vus au chapitre 7. Réponds à cette question avant de commencer :"
));
children.push(bodyPar(
  "Un joueur sait très bien dribbler, mais garde toujours le ballon. Son équipe joue-t-elle efficacement ? Pourquoi ?"
));
children.push(bodyPar(
  "Cette question t’invite à réfléchir à ce que tu as déjà appris : la passe, le démarquage, la prise d’information et la coopération sont souvent plus utiles à l’équipe qu’un dribble individuel prolongé."
));
children.push(spacer(160));

// ================= 8.1 =================
children.push(sectionHeading("Découvrir le basket-ball", "8.1"));
children.push(bodyPar(
  "Le basket-ball est un sport collectif où deux équipes cherchent à faire entrer le ballon dans le panier adverse, tout en protégeant leur propre panier. Comme dans tout sport collectif, on y retrouve des partenaires, des adversaires, un espace de jeu et une cible : le panier."
));
children.push(bodyPar(
  "Ce chapitre introduit uniquement les règles nécessaires aux situations scolaires proposées, sans reproduire longuement le règlement officiel de compétition."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-01",
  "Terrain scolaire simplifié",
  "Dessiner un schéma vu du dessus d’un terrain de basket-ball scolaire simplifié, avec un panier, des espaces identifiés, des partenaires (une couleur) et des adversaires (une autre couleur) positionnés sur le terrain.",
  "Les éléments d’un terrain de basket-ball scolaire : panier, espaces, partenaires et adversaires.",
  "Donner à l’élève une vue d’ensemble du terrain avant l’étude détaillée des principes de jeu.",
  "Paysage, format horizontal, schéma vu du dessus.",
));
children.push(spacer(200));

// ================= 8.2 =================
children.push(sectionHeading("Position de disponibilité et contrôle du ballon", "8.2"));
children.push(bodyPar(
  "Une posture équilibrée (appuis stables, genoux légèrement fléchis, regard disponible) te permet de recevoir, passer, dribbler ou te déplacer à tout moment, sans perdre de temps à te replacer."
));
children.push(bodyPar(
  "Le contrôle du ballon se développe avec des exercices progressifs : le tenir fermement, le manipuler à deux mains, le protéger avec le corps. Ce chapitre n’exige jamais de gestes spectaculaires ou de techniques avancées."
));
children.push(spacer(160));

// ================= 8.3 =================
children.push(sectionHeading("Le dribble", "8.3"));
children.push(bodyPar(
  "Le dribble sert à se déplacer avec le ballon lorsqu’une passe immédiate n’est pas la meilleure solution. Il demande du contrôle, la capacité à changer simplement de direction, et progressivement la capacité à lever le regard pour observer le jeu plutôt que de fixer uniquement le ballon."
));
children.push(bodyPar(
  "Un dribble excessif (garder le ballon trop longtemps sans raison) peut ralentir le jeu collectif et réduire les occasions de ton équipe, comme tu l’as réfléchi dans la situation-problème d’ouverture."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-02",
  "Dribble contrôlé",
  "Dessiner un élève haïtien de 8e AF dribblant un ballon de basket-ball dans une cour d’école, avec le regard progressivement relevé vers l’espace de jeu plutôt que fixé sur le ballon.",
  "Un dribble contrôlé, avec le regard tourné vers le jeu plutôt que vers le ballon.",
  "Illustrer la coordination entre le contrôle du ballon et la prise d’information sur l’environnement.",
  "Portrait, format vertical, plan moyen en action.",
));
children.push(spacer(200));

// ================= 8.4 =================
children.push(sectionHeading("Passe et réception", "8.4"));
children.push(bodyPar(
  "Deux passes scolaires fondamentales sont particulièrement utiles : la passe à deux mains depuis la poitrine, et la passe avec un léger rebond au sol, lorsque la situation le justifie (par exemple pour éviter un défenseur proche)."
));
children.push(bodyPar(
  "Une bonne passe demande précision, un dosage adapté à la distance, une orientation claire vers le partenaire, et une préparation des mains pour la réception. Après une passe, il est important de continuer à te déplacer plutôt que de rester immobile."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-03",
  "Passe à deux mains et réception",
  "Dessiner deux élèves haïtiens face à face, à quelques mètres de distance : l’un réalisant une passe à deux mains depuis la poitrine, ballon en l’air entre les deux ; l’autre en position de réception, bras légèrement fléchis, mains prêtes à accueillir le ballon.",
  "Une passe à deux mains bien réalisée, avec une réception préparée.",
  "Rappeler la technique de passe et de réception déjà étudiée en 7e AF, comme base pour les situations de jeu plus complexes de ce chapitre.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ================= 8.5 =================
children.push(sectionHeading("Se démarquer", "8.5"));
children.push(bodyPar(
  "Se démarquer, c’est quitter une zone défendue pour devenir disponible pour un partenaire porteur du ballon. Cela demande un changement de direction, un déplacement vers un espace libre, et une communication claire (regard, geste, appel de balle)."
));
children.push(bodyPar(
  "Il existe une différence importante entre rester immobile derrière un défenseur (ce qui ne crée aucune solution) et se déplacer pour créer une ligne de passe claire et dégagée vers le porteur du ballon."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-04",
  "Passe puis démarquage",
  "Dessiner une séquence en deux vignettes : 1) un élève haïtien réalisant une passe vers un partenaire, avec une flèche indiquant la trajectoire du ballon ; 2) le même élève se déplaçant vers un espace libre après sa passe, avec une flèche indiquant son déplacement, pour redevenir disponible.",
  "Après une passe, le joueur se déplace vers un espace libre pour redevenir disponible.",
  "Illustrer l’enchaînement entre la passe et le démarquage, en lien avec l’Activité 2.",
  "Paysage, format horizontal, deux vignettes reliées par des flèches.",
));
children.push(spacer(200));

// ================= 8.6 =================
children.push(sectionHeading("Occupation de l’espace et soutien", "8.6"));
children.push(bodyPar(
  "Une équipe trop regroupée autour du porteur du ballon réduit fortement ses possibilités de passe. À l’inverse, une équipe qui occupe bien l’espace (avec de l’espacement et de la largeur) offre plusieurs solutions de passe et de soutien au porteur du ballon."
));
children.push(bodyPar(
  "Le soutien consiste à se positionner à une distance utile d’un partenaire, ni trop proche (ce qui facilite la défense adverse), ni trop loin (ce qui rend la passe difficile ou risquée)."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-05",
  "Comparaison : équipe regroupée / équipe mieux espacée",
  "Dessiner deux schémas vus du dessus, côte à côte, d’un même terrain de basket-ball scolaire : à gauche, tous les partenaires regroupés près du porteur du ballon ; à droite, les mêmes partenaires répartis avec un bon espacement, offrant plusieurs solutions de passe (flèches).",
  "Comparaison entre une équipe regroupée et une équipe mieux espacée sur le terrain.",
  "Illustrer concrètement pourquoi un bon espacement multiplie les solutions de jeu, en lien avec la section 8.6.",
  "Paysage, format horizontal, deux schémas côte à côte.",
));
children.push(spacer(200));

// ================= 8.7 =================
children.push(sectionHeading("Progresser vers le panier", "8.7"));
children.push(bodyPar(
  "Une logique simple guide la progression vers le panier : regarder la situation, choisir une passe ou un déplacement, progresser vers le panier, puis rechercher une situation favorable pour continuer l’action."
));
children.push(bodyPar(
  "L’objectif n’est jamais de tirer systématiquement dès que l’on reçoit le ballon : ce chapitre valorise la construction collective d’une occasion, plutôt que la précipitation individuelle."
));
children.push(spacer(160));

// ================= 8.8 =================
children.push(sectionHeading("Le tir dans un cadre scolaire", "8.8"));
children.push(bodyPar(
  "Une technique simple et sûre de tir, proche du panier ou à une distance adaptée au niveau, repose sur l’équilibre du corps, l’orientation claire vers la cible, et le contrôle du geste plutôt que la puissance."
));
children.push(bodyPar(
  "Ce chapitre n’impose jamais une distance de tir identique pour tous les élèves, et ne valorise jamais la force au détriment du contrôle : mieux vaut un tir contrôlé depuis une distance raisonnable qu’un tir puissant mais imprécis depuis trop loin."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-07",
  "Tir scolaire contrôlé",
  "Dessiner un élève haïtien de 8e AF en position de tir vers le panier, posture équilibrée, regard vers la cible, geste contrôlé, dans une zone dégagée et sécurisée sans autre élève à proximité immédiate.",
  "Un tir scolaire contrôlé : équilibre, orientation vers la cible, geste maîtrisé.",
  "Illustrer une technique de tir simple et sécuritaire, adaptée au niveau 8e AF.",
  "Portrait, format vertical, plan moyen sur le geste de tir.",
));
children.push(spacer(200));

// ================= 8.9 =================
children.push(sectionHeading("Attaque en petit effectif", "8.9"));
children.push(bodyPar(
  "Des situations à effectif réduit (2 contre 1, 2 contre 2 ou 3 contre 3, selon l’espace et le niveau disponibles) permettent de multiplier les décisions à prendre pour chaque élève. Dans ces situations, il s’agit d’identifier le porteur du ballon, un ou plusieurs partenaires en soutien, l’espace libre, et la cible."
));
children.push(bodyPar(
  "Ces situations favorisent un grand nombre de décisions et une participation active de tous les élèves impliqués, plutôt qu’un jeu à effectif complet où certains élèves touchent rarement le ballon."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-06",
  "Situation 2 contre 1",
  "Dessiner une situation de jeu réduit 2 contre 1 sur un terrain scolaire : deux partenaires (porteur du ballon et un partenaire en soutien) face à un seul défenseur, avec des flèches pédagogiques indiquant plusieurs choix possibles (passe, dribble, progression).",
  "Une situation 2 contre 1 avec plusieurs choix possibles pour le porteur du ballon.",
  "Illustrer une situation de jeu réduit permettant de multiplier les décisions, en lien avec l’Activité 3.",
  "Paysage, format horizontal, schéma vu du dessus.",
));
children.push(spacer(200));

children.push(calloutBox(
  "À retenir",
  ["Au basket-ball, bien jouer signifie contrôler le ballon, observer, choisir et coopérer."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(200));

// ================= 8.10 =================
children.push(sectionHeading("Défendre sans contact dangereux", "8.10"));
children.push(bodyPar(
  "Défendre au basket-ball scolaire consiste à se positionner, se déplacer de façon contrôlée, et maintenir une distance adaptée avec l’adversaire, afin de gêner sa progression dans le cadre des règles."
));
children.push(bodyPar(
  "Défendre ne signifie jamais chercher le contact physique : pousser, retenir, frapper ou provoquer un contact dangereux sont des comportements strictement interdits. Une bonne défense se construit avec du placement et de l’anticipation, jamais avec de la force physique dirigée contre un adversaire."
));
children.push(spacer(160));

children.push(calloutBox(
  "Sécurité",
  ["Défendre avec contrôle et sans contact dangereux : ne jamais pousser, retenir, frapper ou s'accrocher au cercle du panier."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-08",
  "Défense contrôlée",
  "Dessiner un élève haïtien en position défensive contrôlée face à un adversaire porteur du ballon, à une distance adaptée, sans aucun contact physique, posture équilibrée et vigilante.",
  "Une défense contrôlée, sans contact dangereux, respectant une distance adaptée.",
  "Illustrer une défense sécuritaire, en opposition claire à tout comportement agressif.",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ================= 8.11 =================
children.push(sectionHeading("Changement de possession et replacement", "8.11"));
children.push(bodyPar(
  "Au basket-ball, la possession du ballon change souvent et rapidement. Après une perte du ballon, il faut identifier rapidement son nouveau rôle (défenseur) et se replacer. Après une récupération, il faut chercher une solution sûre de passe ou de progression."
));
children.push(bodyPar(
  "Ce chapitre travaille cette transition de façon simple, sans exiger l’apprentissage d’une tactique complexe."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C08-09",
  "Transition après changement de possession",
  "Dessiner deux vignettes côte à côte : à gauche, un élève qui vient de perdre le ballon et se replace rapidement en défense (flèche de déplacement) ; à droite, un élève qui vient de récupérer le ballon et cherche déjà du regard une solution de passe (flèche vers un partenaire).",
  "La transition : se replacer après une perte, chercher une solution après une récupération.",
  "Illustrer la réaction rapide attendue lors d’un changement de possession, en lien avec l’Activité 5.",
  "Paysage, format horizontal, deux vignettes côte à côte.",
));
children.push(spacer(200));

// ================= 8.12 =================
children.push(sectionHeading("Communication, arbitrage et fair-play", "8.12"));
children.push(bodyPar(
  "Bien jouer ensemble demande des appels utiles (annoncer sa disponibilité), des encouragements respectueux, et un respect constant des partenaires et des adversaires. Des rôles simples d’arbitre ou d’observateur peuvent être confiés à des élèves, avec des règles données clairement par l’enseignant."
));
children.push(bodyPar(
  "Il est important d’apprendre à accepter une décision d’arbitrage, même en cas de désaccord, et de pouvoir discuter calmement d’une règle après l’action si nécessaire, jamais pendant le jeu ni de façon agressive."
));
children.push(spacer(120));

children.push(calloutBox(
  "Méthode",
  ["Observer → Décider → Agir → Communiquer → Se replacer → Ajuster : ce cycle en six temps t'aide à mieux jouer au basket-ball, à chaque instant du jeu."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Coopération",
  ["Passer puis continuer à participer au jeu : une passe n'est jamais la fin de ton implication, mais le début d'un nouveau déplacement utile à l'équipe."],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Fair-play",
  ["Respecter partenaires, adversaires, arbitre et décisions, même lorsqu'on n'est pas d'accord avec un choix arbitral."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Le basket-ball a été inventé en 1891 avec un tout premier panier fait d'un panier de pêches accroché en hauteur. Ce n'est que plus tard qu'un fond ouvert a été ajouté, pour éviter d'aller récupérer le ballon après chaque panier marqué !"],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C08-10",
  "Scène réaliste de basket-ball scolaire haïtien",
  "Dessiner une scène d’ensemble d’élèves haïtiens de 8e AF jouant au basket-ball dans un environnement scolaire crédible (cour ou terrain polyvalent, avec ou sans terrain réglementaire complet), avec des limites clairement organisées et l’enseignant supervisant depuis un endroit approprié.",
  "Une séance de basket-ball scolaire haïtienne, bien organisée et supervisée.",
  "Montrer que les principes du chapitre s’appliquent dans un contexte scolaire haïtien réaliste, avec ou sans installation complète.",
  "Paysage, format horizontal, vue d’ensemble large.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Dribbler en regardant",
  [
    "Objectif : contrôler le ballon en dribble tout en repérant des signaux ou des espaces autour de soi.",
    "Organisation : parcours simple délimité par des repères, réalisé individuellement à tour de rôle.",
    "Matériel : un ballon par élève ou par petit groupe, cônes ou repères souples.",
    "Consignes : dribbler le long du parcours en gardant le contrôle, tout en essayant de repérer un signal donné par l’enseignant (geste, couleur, direction).",
    "Sécurité : garder une distance suffisante entre les élèves.",
    "Critères de réussite : terminer le parcours en gardant le contrôle du ballon et en identifiant correctement le signal.",
    "Variantes et adaptations : réduire la difficulté du parcours ou la fréquence des signaux selon le niveau de l’élève.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Passe et démarque-toi",
  [
    "Objectif : réaliser une passe puis se déplacer immédiatement pour redevenir disponible.",
    "Organisation : petits groupes de 3 à 4 élèves, dans un espace délimité.",
    "Matériel : un ballon adapté, repères pour délimiter l’espace.",
    "Consignes : après chaque passe, changer immédiatement de position pour offrir une nouvelle solution au porteur du ballon.",
    "Sécurité : regarder avant de se déplacer pour éviter toute collision.",
    "Critères de réussite : enchaîner plusieurs passes réussies, avec un déplacement après chaque passe.",
    "Variantes et adaptations : réduire la taille de l’espace pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Deux contre un : choisir",
  [
    "Objectif : identifier quand passer, avancer ou conserver brièvement le ballon face à un seul défenseur.",
    "Organisation : situations de 2 contre 1 en petits groupes, avec rotation des rôles.",
    "Matériel : un ballon adapté, repères délimitant l’espace de jeu et la cible.",
    "Consignes : le porteur du ballon doit choisir, selon la position du défenseur, entre passer à son partenaire, progresser lui-même, ou conserver brièvement le ballon.",
    "Sécurité : respecter les limites de l’espace et éviter tout contact dangereux avec le défenseur.",
    "Critères de réussite : justifier oralement le choix réalisé à chaque situation.",
    "Variantes et adaptations : ralentir le rythme du jeu pour les élèves qui ont besoin de plus de temps pour décider.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Trois contre trois, espace et coopération",
  [
    "Objectif : appliquer occupation de l’espace, passes et coopération dans un petit jeu collectif.",
    "Organisation : petits groupes à effectif réduit (3 contre 3), terrain adapté à l’espace disponible.",
    "Matériel : un ballon, repères pour délimiter le terrain, chasubles si disponibles.",
    "Consignes : règles pédagogiques favorisant la circulation du ballon (par exemple, exiger un nombre minimum de passes avant de tenter une action vers le panier).",
    "Sécurité : respecter les limites du terrain et éviter tout contact volontaire.",
    "Critères de réussite : chaque élève de l’équipe touche le ballon au moins une fois pendant le jeu.",
    "Variantes et adaptations : réduire le nombre de passes exigées pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Attaquer puis se replacer",
  [
    "Objectif : réagir rapidement à un changement de possession du ballon.",
    "Organisation : jeu réduit en petits groupes, avec changement de rôle à chaque perte ou récupération du ballon.",
    "Matériel : un ballon adapté, repères délimitant l’espace et la cible.",
    "Consignes : après une perte du ballon, se replacer rapidement ; après une récupération, chercher une solution de passe ou de progression.",
    "Sécurité : contrôler ses déplacements lors des changements rapides de rôle.",
    "Critères de réussite : réagir de façon adaptée après chaque changement de possession.",
    "Variantes et adaptations : ralentir le rythme du jeu pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation et d'analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(bodyPar(
  "Pour chacune des situations suivantes, identifie le porteur du ballon, les partenaires disponibles, les défenseurs, l’espace libre, et une ou plusieurs solutions possibles. Justifie ton choix : passer, dribbler, se déplacer ou tenter une action vers le panier. Plusieurs réponses peuvent être acceptées lorsqu’elles sont cohérentes et correctement justifiées."
));
children.push(calloutBox(
  "Quelle est la meilleure solution ?",
  [
    "Situation 1 : le porteur du ballon a un partenaire démarqué proche du panier, et un défenseur qui s’approche rapidement de lui.",
    "Situation 2 : le porteur du ballon n’a aucun partenaire démarqué, mais un espace libre devant lui vers le panier.",
    "Situation 3 : le porteur du ballon est entouré de deux défenseurs, mais un partenaire est totalement libre sur le côté.",
    "Pour chaque situation, réponds : quelle solution te semble la plus adaptée (passer, dribbler, se déplacer, tenter une action vers le panier) ? Pourquoi ?",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité de coopération ----
children.push(sectionHeading("Activité de coopération", ""));
children.push(calloutBox(
  "Tout le monde participe",
  [
    "Objectif : impliquer plusieurs partenaires avant une tentative vers le panier, selon des règles adaptées par l’enseignant.",
    "Organisation : petit jeu collectif, effectif et règles adaptés par l’enseignant selon la classe et l’espace disponible.",
    "Consignes : l’équipe doit chercher à impliquer plusieurs partenaires (par exemple, un nombre minimum de joueurs différents touchant le ballon) avant de tenter une action vers le panier.",
    "Cette règle ne doit jamais empêcher une décision évidente et sûre (par exemple, un panier facile totalement dégagé) : l’objectif est d’encourager la coopération, pas de la rendre rigide.",
    "Variante pour les classes nombreuses : organiser plusieurs petits jeux simultanés sur des espaces réduits, avec rotation des groupes.",
  ],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique du basket-ball. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à te classer selon ta morphologie ou ton niveau physique."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je contrôle mieux mon dribble", "", ""],
    ["Je regarde avant d’agir", "", ""],
    ["Mes passes sont plus précises", "", ""],
    ["Je me démarque", "", ""],
    ["J’utilise l’espace", "", ""],
    ["Je choisis une solution", "", ""],
    ["Je me replace", "", ""],
    ["Je défends sans contact dangereux", "", ""],
    ["Je coopère", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le basket-ball est un sport collectif où chaque équipe cherche à marquer dans le panier adverse tout en protégeant le sien.",
  "Une position de disponibilité et un bon contrôle du ballon préparent toutes les actions du jeu.",
  "Le dribble sert à se déplacer avec le ballon, mais un dribble excessif peut ralentir le jeu collectif.",
  "La passe et la réception demandent précision, dosage et communication.",
  "Se démarquer, c’est quitter une zone défendue pour créer une ligne de passe claire.",
  "Une équipe bien espacée offre plus de solutions qu’une équipe regroupée autour du ballon.",
  "Progresser vers le panier suit une logique de construction collective, pas de précipitation individuelle.",
  "Le tir scolaire recherche le contrôle et la précision, pas la puissance à tout prix.",
  "Les situations à effectif réduit (2 contre 1, 3 contre 3) multiplient les décisions et la participation.",
  "Défendre sans contact dangereux repose sur le placement, jamais sur la force physique.",
  "Après un changement de possession, il faut réagir rapidement : se replacer ou chercher une solution.",
  "La communication, la coopération, le fair-play et le respect de l’arbitrage restent indispensables.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "L’élève de 8e AF doit désormais utiliser la technique du basket-ball pour résoudre des situations simples de jeu, et non simplement répéter des gestes isolés."
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(8));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(dribble - démarquage - passe - panier - défense - espace - coopération - replacement)", italics: true, color: "555555" },
]));
[
  "1. Se déplacer avec le ballon en le faisant rebondir s’appelle le ____________________.",
  "2. Envoyer le ballon à un partenaire pour qu’il le reçoive s’appelle une ____________________.",
  "3. Se déplacer pour devenir disponible pour un partenaire s’appelle le ____________________.",
  "4. Faire entrer le ballon dans le ____________________ adverse permet de marquer un point.",
  "5. Se placer, rester vigilant et protéger un espace sans contact dangereux relève de la ____________________.",
  "6. Une équipe qui occupe bien l’____________________ multiplie ses solutions de passe.",
  "7. Après une perte du ballon, il faut rapidement effectuer un ____________________ vers la défense.",
  "8. Impliquer plusieurs partenaires avant une tentative vers le panier est une forme de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Pourquoi un dribble excessif peut-il nuire à l’équipe ?", opts: ["a) parce que le dribble est interdit au basket-ball", "b) parce qu’il peut ralentir le jeu collectif et réduire les occasions de l’équipe", "c) parce qu’il fatigue uniquement le joueur qui dribble", "d) parce qu’il n’a aucune influence sur le jeu"] },
  { q: "2. Que doit faire un défenseur au basket-ball scolaire, selon ce chapitre ?", opts: ["a) pousser l’adversaire pour récupérer le ballon", "b) se placer et se déplacer de façon contrôlée, sans contact dangereux", "c) s’accrocher au cercle du panier pour gêner l’attaquant", "d) rester immobile pendant tout le jeu"] },
  { q: "3. Que privilégie ce chapitre pour le tir scolaire ?", opts: ["a) la puissance maximale, quelle que soit la distance", "b) le contrôle du geste et la précision", "c) une distance de tir identique pour tous les élèves", "d) un concours de puissance entre élèves"] },
  { q: "4. Que doit faire un joueur après avoir récupéré le ballon suite à une perte de l’adversaire ?", opts: ["a) rester immobile en attendant les consignes", "b) chercher rapidement une solution sûre de passe ou de progression", "c) tirer immédiatement vers le panier, quelle que soit la situation", "d) redonner le ballon à l’adversaire"] },
  { q: "5. Que doit faire un élève face à une décision d’arbitrage avec laquelle il n’est pas d’accord ?", opts: ["a) contester bruyamment pendant le jeu", "b) accepter la décision et, si nécessaire, en discuter calmement après l’action", "c) arrêter de jouer immédiatement", "d) ignorer complètement l’arbitre pour la suite du jeu"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition ou sa fonction correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Dribble", "a) Répartition des joueurs dans l’espace pour offrir plusieurs solutions de passe"],
  ["2. Démarquage", "b) Se placer pour protéger un espace ou la cible sans contact dangereux"],
  ["3. Espacement", "c) Changement rapide de position après une perte ou une récupération du ballon"],
  ["4. Défense", "d) Se déplacer avec le ballon en le faisant rebondir au sol"],
  ["5. Replacement", "e) Se déplacer pour devenir disponible pour un partenaire"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un joueur dribble constamment sans jamais passer, même lorsqu’un partenaire est totalement démarqué. Analyse cette situation, explique ses conséquences pour l’équipe, et propose un ajustement.",
  "2. Un partenaire démarqué proche du panier est ignoré par le porteur du ballon, qui tente une action difficile lui-même. Explique pourquoi ce choix n’est pas optimal et propose une meilleure décision.",
  "3. Toute une équipe reste regroupée autour du porteur du ballon pendant tout le match. Explique pourquoi cette organisation réduit l’efficacité de l’équipe et propose une correction.",
  "4. Pendant une défense, un élève pousse volontairement un adversaire pour l’empêcher de progresser. Analyse ce comportement du point de vue de la sécurité et du fair-play, et propose ce que l’enseignant devrait faire.",
  "5. Après une récupération du ballon, une équipe met plusieurs secondes avant de réagir, ce qui permet à l’adversaire de se replacer complètement. Explique pourquoi cette lenteur pose problème et propose un ajustement.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 92, "Manuel_EPS_8AF_Chapitre8.docx");
console.log("Chapitre 8 (8e AF) genere:", outPath);
