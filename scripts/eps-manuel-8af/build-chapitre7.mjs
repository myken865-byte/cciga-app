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

children.push(...chapterTitleBlock(7, "Sports collectifs : coopération, occupation de l’espace, passe, démarquage et stratégies simples"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Aux chapitres 5 et 6, tu as approfondi des actions individuelles : courir, sauter, lancer. Ce chapitre change d’échelle : il s’agit maintenant de jouer avec des partenaires, face à des adversaires, dans un espace partagé. Football, basket-ball, volley-ball et de nombreux jeux collectifs partagent des principes communs que tu vas apprendre à reconnaître et à utiliser, quel que soit le sport pratiqué."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Comprendre les principes communs des sports collectifs : coopérer avec ses partenaires, s’opposer dans le respect des règles, utiliser l’espace, faire circuler le ballon, se démarquer, défendre, et choisir une solution simple selon la situation. Ce chapitre développe une intelligence du jeu adaptée à la 8e AF, à travers le cycle : observer → comprendre → décider → agir → communiquer → ajuster."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "identifier partenaires, adversaires, cible, espace de jeu et règles essentielles ;",
  "comprendre la notion de conservation et de progression collective du ballon ;",
  "réaliser des passes et réceptions adaptées à plusieurs situations scolaires ;",
  "te déplacer pour offrir une solution au porteur du ballon ;",
  "comprendre et appliquer le démarquage dans des situations simples ;",
  "occuper l’espace de manière plus équilibrée et éviter l’attroupement autour du ballon ;",
  "choisir entre passer, te déplacer, conserver brièvement ou tenter une action vers la cible selon la situation ;",
  "adopter une défense scolaire contrôlée : te placer, suivre un adversaire ou protéger un espace sans contact dangereux ;",
  "communiquer avec tes partenaires et respecter arbitre, adversaires et décisions ;",
  "observer une situation de jeu et proposer un ajustement tactique simple.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Démarquage, partenaire, espace, passe, défense, communication, cible, fair-play, conservation, progression.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Ce chapitre réutilise la coordination, la vitesse, l’endurance, la gestion de l’effort, l’échauffement, la sécurité et la coopération déjà étudiés. Réponds à cette question avant de commencer :"
));
children.push(bodyPar(
  "Pourquoi une équipe composée de joueurs rapides peut-elle perdre si tous courent vers le ballon ?"
));
children.push(bodyPar(
  "Cette question t’invite à réfléchir à ce qui fait vraiment gagner une équipe : l’occupation de l’espace, la communication, la passe, le soutien et les choix collectifs comptent souvent plus que la rapidité individuelle."
));
children.push(spacer(160));

// ================= 7.1 =================
children.push(sectionHeading("Qu’est-ce qu’un sport collectif ?", "7.1"));
children.push(bodyPar(
  "Un sport collectif est une activité où des partenaires coopèrent, face à des adversaires, dans un espace donné et selon des règles, pour atteindre un objectif commun (généralement, marquer plus de points que l’adversaire). Le football, le basket-ball, le volley-ball et de nombreux jeux collectifs adaptés en sont des exemples scolaires."
));
children.push(bodyPar(
  "Ce chapitre présente des principes communs à ces sports, sans jamais confondre les règles spécifiques de chacun : ce que tu apprends ici est transférable d’un sport collectif à l’autre."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C07-01",
  "Les éléments d’un sport collectif",
  "Dessiner un schéma simple représentant une situation de jeu collectif générique dans un espace scolaire haïtien : des partenaires (une couleur), des adversaires (une autre couleur), un ballon, une cible (but ou panier symbolique), et les limites de l’espace de jeu. Étiqueter chaque élément.",
  "Les éléments fondamentaux présents dans tout sport collectif : partenaires, adversaires, ballon, espace, cible.",
  "Donner à l’élève un vocabulaire visuel commun avant l’étude des principes de jeu collectif.",
  "Paysage, format horizontal, schéma vu du dessus.",
));
children.push(spacer(200));

// ================= 7.2 =================
children.push(sectionHeading("Partenaires, adversaires, cible et espace", "7.2"));
children.push(bodyPar(
  "Toute situation de jeu collectif comprend des éléments fondamentaux : les partenaires (avec qui tu coopères), les adversaires (contre qui tu joues), la cible (le but à atteindre) et l’espace de jeu (où tout cela se déroule)."
));
children.push(bodyPar(
  "La position de tes partenaires et de tes adversaires change constamment pendant le jeu, et cette position influence directement les décisions à prendre à chaque instant : ce qui était une bonne solution il y a une seconde peut ne plus l’être maintenant."
));
children.push(spacer(160));

// ================= 7.3 =================
children.push(sectionHeading("Regarder avant d’agir", "7.3"));
children.push(bodyPar(
  "Avant d’agir, il est essentiel de prendre de l’information sur la situation : où est le ballon ? où sont mes partenaires ? où sont les adversaires ? où se trouve l’espace libre ?"
));
children.push(bodyPar(
  "Lever le regard, lorsque la situation et le niveau technique le permettent, aide à mieux observer le jeu plutôt que de rester concentré uniquement sur le ballon. Ce chapitre ne demande jamais une lecture tactique avancée : il s’agit simplement de relier ce que tu observes à un choix simple."
));
children.push(spacer(160));

// ================= 7.4 =================
children.push(sectionHeading("Passe et réception", "7.4"));
children.push(bodyPar(
  "Quel que soit le sport collectif pratiqué, une bonne passe repose sur des principes communs : une orientation claire vers le partenaire visé, de la précision, un dosage adapté à la distance, une préparation à recevoir de la part du partenaire, et une communication entre les deux joueurs."
));
children.push(bodyPar(
  "Ce chapitre n’impose pas une technique unique valable pour tous les sports : au football, la passe se joue avec le pied ; au basket-ball, avec les mains ; au volley-ball, avec la manchette ou la passe haute. Les principes restent communs, mais leur exécution varie selon le sport utilisé comme exemple."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C07-03",
  "Passe puis déplacement vers un espace libre",
  "Dessiner une séquence de 2 vignettes montrant un élève haïtien de 8e AF : 1) réalisant une passe vers un partenaire, avec une flèche pédagogique indiquant la trajectoire du ballon ; 2) le même élève se déplaçant immédiatement vers un espace libre après sa passe, avec une flèche indiquant son déplacement.",
  "Après une passe, le joueur se déplace immédiatement vers un espace libre pour redevenir disponible.",
  "Illustrer l’enchaînement entre la passe et le déplacement de soutien, en lien avec l’Activité 1.",
  "Paysage, format horizontal, deux vignettes reliées par des flèches.",
));
children.push(spacer(200));

// ================= 7.5 =================
children.push(sectionHeading("Se démarquer et offrir une solution", "7.5"));
children.push(bodyPar(
  "Se démarquer, c’est se déplacer pour devenir disponible pour un partenaire, en particulier lorsqu’un adversaire te surveille de près. Cela demande de quitter une zone encombrée (là où trop de joueurs sont regroupés) pour utiliser un espace libre."
));
children.push(bodyPar(
  "Quelques changements de direction et de rythme, réalisés de façon contrôlée, aident à se démarquer efficacement, sans que cela ne devienne une course désordonnée."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C07-04",
  "Démarquage",
  "Dessiner deux vignettes montrant un même élève haïtien : 1) marqué de près par un adversaire, dans une zone encombrée ; 2) après un déplacement contrôlé, démarqué dans un espace libre, main levée pour demander le ballon. Flèche entre les deux vignettes indiquant le déplacement.",
  "Le démarquage : se déplacer d’une zone encombrée vers un espace libre pour devenir disponible.",
  "Illustrer concrètement l’action de démarquage, en lien avec l’Activité 1.",
  "Paysage, format horizontal, deux vignettes reliées par une flèche.",
));
children.push(spacer(200));

// ================= 7.6 =================
children.push(sectionHeading("Occuper l’espace collectivement", "7.6"));
children.push(bodyPar(
  "Une équipe regroupée autour du ballon limite fortement ses solutions de passe : tous les joueurs sont proches les uns des autres, dans le même espace restreint. Une équipe mieux répartie, à l’inverse, occupe davantage de largeur et de profondeur, ce qui multiplie les solutions disponibles pour le porteur du ballon."
));
children.push(bodyPar(
  "Garder des distances utiles entre partenaires (ni trop proches, ni trop éloignés) facilite à la fois les passes et les déplacements de soutien."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C07-02",
  "Attroupement autour du ballon / occupation équilibrée",
  "Dessiner deux schémas vus du dessus, côte à côte, d’un même espace de jeu scolaire : à gauche, tous les partenaires regroupés autour du ballon dans un coin du terrain ; à droite, les mêmes partenaires répartis dans l’espace, occupant largeur et profondeur, avec plusieurs solutions de passe possibles (flèches).",
  "Comparaison entre une équipe regroupée autour du ballon et une équipe mieux répartie dans l’espace.",
  "Illustrer concrètement pourquoi une meilleure occupation de l’espace multiplie les solutions de jeu.",
  "Paysage, format horizontal, deux schémas côte à côte.",
));
children.push(spacer(200));

// ================= 7.7 =================
children.push(sectionHeading("Conserver et faire progresser le ballon", "7.7"));
children.push(bodyPar(
  "Une logique simple guide la décision du porteur du ballon : conserver le ballon lorsqu’il n’existe pas de solution sûre à cet instant, et progresser (par une passe ou un déplacement) lorsqu’un espace ou un partenaire est disponible."
));
children.push(bodyPar(
  "Les jeux à effectifs réduits (par exemple 3 contre 3) sont particulièrement utiles pour ce travail : ils multiplient les décisions à prendre par chaque élève, sans jamais exiger l’apprentissage de systèmes tactiques complexes."
));
children.push(spacer(160));

// ================= 7.8 =================
children.push(sectionHeading("Attaquer une cible", "7.8"));
children.push(bodyPar(
  "Une attaque efficace prépare une occasion, plutôt que de chercher systématiquement une action individuelle immédiate. Cela demande de combiner passes, déplacements de soutien, et un choix du moment approprié pour tenter une action vers la cible (un tir, par exemple)."
));
children.push(bodyPar(
  "La cible et les règles précises varient selon le sport ou le jeu utilisé comme support (un but, un panier, un espace à atteindre), mais la logique de préparation reste commune."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C07-05",
  "Situation d’attaque simple",
  "Dessiner une situation de jeu réduit montrant un porteur du ballon, un partenaire en position de soutien à proximité, et la cible (but ou panier) plus loin, avec une flèche pédagogique indiquant une solution de passe vers le partenaire mieux placé pour tenter une action vers la cible.",
  "Une situation d’attaque simple : porteur, soutien et choix vers la cible.",
  "Illustrer la logique de préparation d’une occasion, plutôt qu’une action individuelle immédiate.",
  "Paysage, format horizontal, schéma vu du dessus.",
));
children.push(spacer(200));

// ================= 7.9 =================
children.push(sectionHeading("Défendre sans danger", "7.9"));
children.push(bodyPar(
  "Défendre, dans un cadre scolaire, consiste à se placer, rester vigilant, protéger une zone ou suivre un adversaire, toujours avec un contrôle du corps et un respect strict des règles."
));
children.push(bodyPar(
  "Ce chapitre écarte totalement les contacts dangereux, les charges, les gestes agressifs, les tacles risqués et toute action pouvant blesser un autre élève. Une défense scolaire contrôlée n’a jamais besoin de contact violent pour être efficace."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C07-06",
  "Défense scolaire contrôlée",
  "Dessiner un élève haïtien en position défensive contrôlée, se plaçant entre un adversaire et la cible, sans aucun contact physique, dans une posture équilibrée et vigilante.",
  "Une défense scolaire contrôlée : placement et vigilance, sans contact dangereux.",
  "Illustrer une défense sécuritaire, en opposition claire à tout comportement agressif.",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ================= 7.10 =================
children.push(sectionHeading("Transition : perdre ou récupérer le ballon", "7.10"));
children.push(bodyPar(
  "Le jeu collectif demande de changer rapidement de rôle : après une perte du ballon, il faut se replacer pour aider la défense de l’équipe ; après une récupération, il faut chercher rapidement une solution de passe ou de progression."
));
children.push(bodyPar(
  "Ce chapitre travaille cette réaction collective simple, sans jamais exiger une tactique de transition avancée."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C07-07",
  "Transition après perte ou récupération",
  "Dessiner deux vignettes côte à côte : à gauche, un élève qui vient de perdre le ballon et se replace rapidement vers sa zone de défense (flèche de déplacement) ; à droite, un élève qui vient de récupérer le ballon et cherche déjà du regard une solution de passe (flèche vers un partenaire).",
  "La transition : se replacer après une perte, chercher une solution après une récupération.",
  "Illustrer la réaction collective simple attendue lors d’un changement de possession du ballon.",
  "Paysage, format horizontal, deux vignettes côte à côte.",
));
children.push(spacer(200));

// ================= 7.11 =================
children.push(sectionHeading("Communication et coopération", "7.11"));
children.push(bodyPar(
  "Bien jouer ensemble demande de communiquer : des appels simples (annoncer que l’on est disponible), des indications utiles à un partenaire (par exemple signaler un adversaire proche), des encouragements respectueux, et une écoute attentive des partenaires."
));
children.push(bodyPar(
  "Les insultes, les moqueries et l’exclusion d’un camarade moins performant sont strictement interdites. Tous les membres du groupe doivent pouvoir participer réellement au jeu, quel que soit leur niveau."
));
children.push(spacer(120));

children.push(calloutBox(
  "Coopération",
  ["Valorise la participation de tous : un partenaire qui touche rarement le ballon a autant besoin d'être inclus qu'un joueur plus à l'aise techniquement."],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(200));

// ================= 7.12 =================
children.push(sectionHeading("Règles, arbitrage et fair-play", "7.12"));
children.push(bodyPar(
  "Les règles servent à garantir l’équité entre les équipes et la sécurité de tous les joueurs. Dans certaines activités, des rôles d’arbitre ou d’observateur peuvent être confiés à des élèves, avec des règles simplifiées clairement données par l’enseignant."
));
children.push(bodyPar(
  "Accepter une décision d’arbitrage, même lorsqu’on n’est pas d’accord, fait partie du jeu ; il est toujours possible d’exprimer un désaccord de façon respectueuse, sans jamais contester bruyamment ou agressivement."
));
children.push(spacer(120));

children.push(calloutBox(
  "À retenir",
  ["Bien jouer ensemble, c’est observer, se déplacer, communiquer et choisir une solution utile au groupe."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(calloutBox(
  "Méthode",
  ["Regarder → Décider → Agir → Communiquer → Se replacer : ce cycle t’aide à mieux jouer en équipe, à chaque instant du jeu."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Fair-play",
  ["Respecter adversaires, partenaires, arbitre et règles reste une priorité, même dans un jeu collectif intense et disputé."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Sécurité",
  ["Contrôle tes déplacements et évite tout contact dangereux avec un partenaire ou un adversaire, même dans le feu de l'action."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Dans de nombreux sports collectifs de haut niveau, les entraîneurs analysent le nombre de passes réussies et l’occupation de l’espace autant que le nombre de buts ou de points marqués : une équipe qui occupe bien l’espace crée souvent plus d’occasions qu’une équipe qui court simplement plus vite."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C07-08",
  "Scène réaliste d’un sport collectif scolaire haïtien",
  "Dessiner une scène d’ensemble d’élèves haïtiens de 8e AF jouant un sport collectif (par exemple football ou basket-ball) dans une cour ou un terrain scolaire sécurisé, avec des limites clairement tracées, du matériel adapté, et l’enseignant supervisant l’ensemble depuis un endroit approprié.",
  "Une séance de sport collectif scolaire haïtienne, bien organisée et supervisée.",
  "Montrer que les principes du chapitre s’appliquent dans un contexte scolaire haïtien réaliste et sécurisé.",
  "Paysage, format horizontal, vue d’ensemble large.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Passe et suis",
  [
    "Objectif : passer puis se déplacer vers un nouvel espace pour offrir une solution.",
    "Organisation : petits groupes de 3 à 4 élèves, dans un espace délimité.",
    "Matériel : un ballon adapté au sport choisi, repères pour délimiter l’espace.",
    "Consignes : après chaque passe, se déplacer immédiatement vers un espace libre pour redevenir disponible.",
    "Sécurité : regarder avant de se déplacer pour éviter toute collision avec un autre élève.",
    "Critères de réussite : enchaîner plusieurs passes réussies, avec un déplacement après chaque passe.",
    "Variantes et adaptations : réduire la taille de l’espace ou le nombre d’élèves selon le niveau du groupe.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Trouver l’espace libre",
  [
    "Objectif : se déplacer vers un espace libre pour recevoir le ballon dans de bonnes conditions.",
    "Organisation : jeu réduit (par exemple 3 contre 3) dans un espace délimité par zones.",
    "Matériel : un ballon adapté, repères délimitant des zones dans l’espace de jeu.",
    "Consignes : un point pédagogique est accordé selon des règles fixées par l’enseignant lorsqu’un joueur reçoit le ballon dans une zone identifiée comme libre.",
    "Sécurité : respecter les limites de l’espace et éviter tout contact dangereux.",
    "Critères de réussite : réussir à se placer et à recevoir le ballon dans une zone libre à plusieurs reprises.",
    "Variantes et adaptations : ajuster la taille des zones selon le niveau et l’espace disponible.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Conserver ensemble",
  [
    "Objectif : rechercher plusieurs passes contrôlées avant de progresser vers la cible.",
    "Organisation : petit groupe de 4 à 6 élèves, dans un espace délimité, avec ou sans opposition légère.",
    "Matériel : un ballon adapté, repères délimitant l’espace.",
    "Consignes : réaliser un nombre minimum de passes réussies (défini par l’enseignant) avant de tenter une progression vers la cible.",
    "Sécurité : garder une distance suffisante entre les joueurs pour éviter les collisions.",
    "Critères de réussite : atteindre le nombre de passes demandé avant de progresser, sans perdre le contrôle du ballon.",
    "Variantes et adaptations : réduire le nombre de passes exigées pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Attaquer / se replacer",
  [
    "Objectif : alterner rapidement entre attaque et défense selon la possession du ballon.",
    "Organisation : jeu réduit en petits groupes, avec changement de rôle à chaque perte ou récupération du ballon.",
    "Matériel : un ballon adapté, repères délimitant l’espace et la cible.",
    "Consignes : après une perte du ballon, se replacer rapidement ; après une récupération, chercher une solution de passe ou de progression.",
    "Sécurité : contrôler ses déplacements lors des changements rapides de rôle pour éviter les collisions.",
    "Critères de réussite : réagir rapidement et de façon adaptée après chaque changement de possession.",
    "Variantes et adaptations : ralentir le rythme du jeu pour les groupes qui ont besoin de plus de temps pour réagir.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Observer pour mieux jouer",
  [
    "Objectif : observer un critère simple pendant un jeu réduit et donner un retour factuel.",
    "Organisation : un groupe joue pendant qu’un petit groupe observe, sous supervision de l’enseignant, puis les rôles s’inversent.",
    "Matériel : une petite grille d’observation avec 1 ou 2 critères simples (par exemple occupation de l’espace, démarquage).",
    "Consignes : observer attentivement sans gêner le jeu, noter ce qui est observé, puis échanger les observations de façon respectueuse.",
    "Sécurité : les observateurs restent à une distance qui ne gêne pas les joueurs.",
    "Critères de réussite : donner un retour factuel et respectueux, basé sur le critère observé.",
    "Variantes et adaptations : réduire à un seul critère d’observation pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C07-09",
  "Élèves observateurs avec grille pendant un jeu réduit",
  "Dessiner deux élèves haïtiens de 8e AF debout à distance raisonnable du jeu, tenant une petite grille d’observation, observant attentivement un jeu réduit auquel participent leurs camarades.",
  "Des élèves observateurs utilisant une grille simple pendant un jeu réduit.",
  "Servir de support visuel à l’Activité 5 « Observer pour mieux jouer ».",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- Activité d'observation et d'analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(bodyPar(
  "Pour chacun des schémas suivants (représentant une situation de jeu collectif), réponds : quels espaces sont libres ? quel partenaire est disponible ? quelle solution semble la plus adaptée ? pourquoi ? Plusieurs réponses peuvent être acceptées si elles sont cohérentes et bien justifiées."
));
children.push(calloutBox(
  "Où jouer le ballon ?",
  [
    "Schéma 1 : le porteur du ballon a un partenaire démarqué sur son côté gauche, et un adversaire proche sur sa droite.",
    "Schéma 2 : le porteur du ballon est entouré de plusieurs adversaires, mais un partenaire est totalement libre plus loin, proche de la cible.",
    "Schéma 3 : aucun partenaire n’est réellement démarqué ; tous sont marqués de près par un adversaire.",
    "Schéma 4 (situation à corriger) : toute l’équipe est regroupée autour du porteur du ballon, dans un même coin du terrain.",
    "Pour les schémas 1 à 3, identifie les espaces libres, le partenaire disponible (s’il y en a un), et justifie la solution que tu choisirais.",
    "Pour le schéma 4, propose une meilleure organisation de l’équipe dans l’espace, en expliquant pourquoi elle serait plus efficace.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité de coopération ----
children.push(sectionHeading("Activité de coopération", ""));
children.push(calloutBox(
  "Le défi des cinq partenaires",
  [
    "Objectif : permettre à chaque membre du groupe de toucher ou de recevoir le ballon avant de tenter une action finale vers la cible, selon des règles adaptées par l’enseignant.",
    "Organisation : petits groupes (l’enseignant peut adapter l’effectif et les règles selon l’espace disponible).",
    "Consignes : chaque élève du groupe doit avoir touché ou reçu le ballon au moins une fois avant qu’une action finale vers la cible ne soit autorisée.",
    "L’objectif de cette activité est l’inclusion, la circulation du ballon et la communication, jamais la vitesse maximale d’exécution.",
    "Variante pour les groupes plus nombreux ou les espaces plus petits : réduire le nombre de partenaires devant toucher le ballon, ou agrandir légèrement le temps disponible, selon la décision de l’enseignant.",
  ],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique des sports collectifs. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à comparer publiquement les capacités physiques ou l’apparence des élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je regarde avant d’agir", "", ""],
    ["Je passe avec précision", "", ""],
    ["Je me rends disponible", "", ""],
    ["J’utilise l’espace", "", ""],
    ["Je communique", "", ""],
    ["Je me replace", "", ""],
    ["Je respecte partenaires et adversaires", "", ""],
    ["Je peux expliquer un choix", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Un sport collectif fait coopérer des partenaires face à des adversaires, dans un espace, selon des règles, pour atteindre un objectif commun.",
  "Regarder avant d’agir permet d’observer le ballon, les partenaires, les adversaires et les espaces libres.",
  "La passe et la réception reposent sur des principes communs : orientation, précision, dosage et communication.",
  "Le démarquage consiste à se déplacer vers un espace libre pour devenir disponible pour un partenaire.",
  "Une équipe bien répartie dans l’espace multiplie ses solutions de jeu par rapport à une équipe regroupée autour du ballon.",
  "On conserve le ballon en l’absence de solution sûre, et on progresse lorsqu’un espace ou un partenaire est disponible.",
  "Une attaque efficace prépare une occasion, plutôt que de chercher systématiquement une action individuelle immédiate.",
  "Défendre sans danger repose sur le placement et la vigilance, jamais sur le contact violent.",
  "Après une perte ou une récupération du ballon, il faut réagir rapidement : se replacer ou chercher une solution.",
  "La communication, la coopération, le fair-play et le respect de l’arbitrage sont indispensables au jeu collectif.",
  "L’élève de 8e AF doit désormais savoir justifier ses choix dans le jeu, et pas seulement exécuter des gestes.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(7));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(démarquage - partenaire - espace - passe - défense - communication - cible - fair-play)", italics: true, color: "555555" },
]));
[
  "1. Se déplacer pour devenir disponible pour un ____________________ s’appelle le ____________________.",
  "2. Envoyer le ballon à un coéquipier pour qu’il le reçoive s’appelle une ____________________.",
  "3. Une équipe bien répartie dans l’____________________ multiplie ses solutions de jeu.",
  "4. Se placer, rester vigilant et protéger une zone sans contact dangereux relève de la ____________________.",
  "5. Annoncer clairement sa disponibilité à un partenaire est une forme de ____________________.",
  "6. Le but, le panier ou l’espace à atteindre pour marquer s’appelle la ____________________.",
  "7. Respecter adversaires, partenaires, arbitre et règles est une marque de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Pourquoi une équipe entièrement regroupée autour du ballon est-elle souvent moins efficace ?", opts: ["a) parce qu’elle court plus vite", "b) parce qu’elle limite fortement ses solutions de passe", "c) parce que les règles l’interdisent", "d) parce qu’elle protège mieux son but"] },
  { q: "2. Que signifie « se démarquer » ?", opts: ["a) rester immobile près d’un adversaire", "b) se déplacer pour devenir disponible pour un partenaire", "c) garder le ballon sans le partager", "d) sortir volontairement de l’espace de jeu"] },
  { q: "3. Quand un joueur doit-il choisir de conserver le ballon, selon ce chapitre ?", opts: ["a) toujours, quelle que soit la situation", "b) lorsqu’il n’existe pas de solution sûre à cet instant", "c) uniquement lorsqu’un adversaire le lui demande", "d) jamais, il doit toujours passer immédiatement"] },
  { q: "4. Que doit faire un défenseur scolaire, selon ce chapitre ?", opts: ["a) utiliser des contacts physiques pour récupérer le ballon", "b) se placer, rester vigilant et protéger un espace sans contact dangereux", "c) rester immobile pendant tout le jeu", "d) suivre l’arbitre plutôt que les adversaires"] },
  { q: "5. Que doit faire un élève face à une décision d’arbitrage avec laquelle il n’est pas d’accord ?", opts: ["a) contester bruyamment et agressivement", "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin", "c) arrêter de jouer immédiatement", "d) ignorer complètement l’arbitre pour la suite du jeu"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition ou sa fonction correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Démarquage", "a) Fait de garder le ballon lorsqu’aucune solution sûre n’est disponible"],
  ["2. Conservation", "b) Action de progresser vers la cible grâce à une passe ou un déplacement"],
  ["3. Progression", "c) Action de se déplacer pour devenir disponible pour un partenaire"],
  ["4. Transition", "d) Fait de se placer pour protéger un espace sans contact dangereux"],
  ["5. Défense", "e) Changement rapide de rôle après une perte ou une récupération du ballon"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Toute une équipe se regroupe systématiquement autour du ballon pendant un jeu collectif. Analyse cette situation, explique pourquoi elle limite l’efficacité de l’équipe, et propose un ajustement.",
  "2. Un partenaire complètement démarqué n’est jamais servi par le porteur du ballon, qui préfère toujours tenter une action seul. Explique les conséquences possibles de ce comportement et propose une solution.",
  "3. Après une récupération du ballon, un élève reste immobile plusieurs secondes sans réagir, ce qui permet à l’adversaire de se replacer. Explique ce qu’il aurait dû faire, et pourquoi la rapidité de la transition est importante.",
  "4. Pendant un jeu collectif, un défenseur pousse volontairement un adversaire pour récupérer le ballon. Analyse ce comportement du point de vue de la sécurité et du fair-play, et propose ce que l’enseignant devrait faire.",
  "5. Un élève moins performant techniquement est systématiquement exclu du jeu par ses camarades, qui ne lui font jamais de passe. Explique pourquoi ce comportement est inacceptable, et propose une solution concrète pour l’inclure.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 77, "Manuel_EPS_8AF_Chapitre7.docx");
console.log("Chapitre 7 (8e AF) genere:", outPath);
