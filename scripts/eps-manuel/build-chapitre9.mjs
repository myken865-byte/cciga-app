import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(9, "Gymnastique : équilibre, coordination et maîtrise du corps"));

children.push(
  calloutBox(
    "Situation de départ",
    [
      "Le professeur demande à la classe de tenir immobile sur un pied pendant quelques secondes. Beaucoup d'élèves vacillent et rient en essayant de garder l'équilibre. Fedeline reste debout, bras légèrement écartés, le regard fixé sur un point devant elle, et parvient à tenir la position bien plus longtemps que ses camarades.",
      "Comment fait-elle ? Ce chapitre va t'apprendre à contrôler ta posture, ton équilibre, tes déplacements et tes mouvements, jusqu'à construire un petit enchaînement gymnique simple, en toute sécurité.",
    ],
    "F0F0F0", "1F4E5F", NAVY,
  ),
  spacer(240),
);

children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "définir simplement la gymnastique et identifier quelques qualités motrices qu’elle développe ;",
  "adopter des positions de départ et d’arrivée stables ;",
  "réaliser des équilibres simples au sol adaptés à ton niveau ;",
  "enchaîner quelques déplacements et actions motrices simples ;",
  "comprendre les notions d’appui, d’équilibre, de coordination et de réception ;",
  "construire une courte séquence gymnique scolaire avec l’aide de l’enseignant ;",
  "observer un camarade avec respect et utiliser des critères simples de réussite ;",
  "appliquer rigoureusement les règles de sécurité.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Mots-clés"));
children.push(mixedPar([
  { text: "Gymnastique, appui, équilibre, coordination, réception, enchaînement, posture, espace, sécurité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ================= 9.1 =================
children.push(sectionHeading("Qu’est-ce que la gymnastique ?", "9.1"));
children.push(bodyPar(
  "La gymnastique est un ensemble d’activités qui permettent de contrôler son corps dans différentes positions et différents déplacements : rester en équilibre, se déplacer avec précision, coordonner ses mouvements ou se réceptionner après un petit saut."
));
children.push(bodyPar(
  "Dans ce chapitre, l’important n’est pas de réaliser des figures spectaculaires ou acrobatiques, mais de développer progressivement le contrôle de ton corps, dans un cadre scolaire sécurisé."
));
children.push(spacer(160));

// ================= 9.2 =================
children.push(sectionHeading("Posture, appuis et équilibre", "9.2"));
children.push(bodyPar(
  "Un appui est un point de contact entre ton corps et le sol (par exemple tes deux pieds, ou une main). Rechercher l’équilibre, c’est trouver une position stable à partir de ces appuis, sans vaciller."
));
children.push(bodyPar(
  "Les premiers équilibres se réalisent sur deux appuis (par exemple debout, pieds légèrement écartés). Lorsque cela est approprié et sous la supervision de l’enseignant, tu pourras ensuite essayer des équilibres sur un nombre réduit d’appuis (par exemple sur un pied). Ce qui compte n’est pas la difficulté de la position, mais le contrôle et la stabilité que tu parviens à maintenir."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C09-01",
  "Appuis et équilibre",
  "Dessiner 3 vignettes montrant des élèves haïtiens de 7e AF dans des positions d’équilibre simples et stables : vignette 1, un élève debout sur deux pieds, bras légèrement écartés ; vignette 2, un élève en position accroupie stable ; vignette 3, un élève en équilibre sur un pied, bras écartés pour s’aider à stabiliser sa position, sous le regard de l’enseignant.",
  "Plusieurs positions simples et stables : le contrôle et la stabilité comptent plus que la difficulté.",
  "Montrer différents niveaux d’équilibre accessibles, du plus simple (deux appuis) au plus avancé (un appui), toujours sous supervision.",
));
children.push(spacer(200));

// ================= 9.3 =================
children.push(sectionHeading("Se déplacer et changer de direction", "9.3"));
children.push(bodyPar(
  "En gymnastique, il est important de savoir se déplacer avec contrôle : marcher de façon maîtrisée, se déplacer latéralement (sur le côté), et changer de direction sans perdre l’équilibre."
));
children.push(bodyPar(
  "Ces déplacements se pratiquent d’abord dans de petits parcours simples, en observant toujours l’espace disponible et la distance avec les autres élèves, afin d’éviter toute collision."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C09-02",
  "Déplacements",
  "Dessiner un petit parcours au sol dans une cour d’école haïtienne, matérialisé par des repères simples (cônes ou lignes tracées à la craie), avec un élève en train de le suivre : une portion en marche avant, une portion en déplacement latéral, et un changement de direction marqué par une flèche au sol.",
  "Un petit parcours de déplacement avec changements de direction contrôlés.",
  "Illustrer un parcours simple permettant de travailler la marche contrôlée, le déplacement latéral et le changement de direction.",
));
children.push(spacer(200));

// ================= 9.4 =================
children.push(sectionHeading("Coordination des mouvements", "9.4"));
children.push(bodyPar(
  "Coordonner ses mouvements, c’est associer plusieurs actions du corps en même temps ou l’une après l’autre : par exemple, faire un pas tout en levant les bras, ou enchaîner un déplacement avec un mouvement des jambes."
));
children.push(bodyPar(
  "Ce travail développe le rythme, la précision et la continuité du mouvement. Il n’est pas nécessaire que tous les élèves réalisent le mouvement de façon identique : chacun progresse à son rythme, selon ses propres capacités."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C09-03",
  "Coordination",
  "Dessiner une séquence de 3 vignettes montrant un même élève haïtien associant un déplacement simple à un mouvement des bras : vignette 1, position de départ, bras le long du corps ; vignette 2, un pas en avant avec les bras qui se lèvent progressivement ; vignette 3, position finale, bras levés, équilibre stable.",
  "Une coordination simple entre le déplacement des jambes et le mouvement des bras.",
  "Illustrer une association simple de mouvements, accessible et progressive, pour travailler la coordination.",
));
children.push(spacer(200));

// ================= 9.5 =================
children.push(sectionHeading("Sauts simples et réception", "9.5"));
children.push(bodyPar(
  "Un petit saut scolaire adapté comprend un départ stable (position équilibrée avant de sauter), une courte phase aérienne, puis une réception contrôlée, avec les genoux légèrement fléchis pour absorber l’impact."
));
children.push(bodyPar(
  "Il faut toujours s’assurer que l’espace de réception est libre, garder l’équilibre au moment de retomber, et adapter la difficulté du saut aux capacités de chaque élève. Aucune hauteur importante ni aucun dispositif improvisé et dangereux ne doit jamais être proposé."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C09-04",
  "Petit saut et réception",
  "Dessiner une séquence de 3 vignettes montrant un élève haïtien réalisant un petit saut scolaire : vignette 1, position de départ stable, genoux légèrement fléchis ; vignette 2, courte phase aérienne, corps groupé de façon contrôlée ; vignette 3, réception équilibrée au sol, genoux fléchis, bras aidant à stabiliser la position.",
  "Un petit saut scolaire : départ stable, phase aérienne courte, réception équilibrée.",
  "Illustrer les trois temps d’un saut simple, avec un accent particulier sur la sécurité de la réception.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Sécurité",
  ["Un saut ne doit jamais être proposé si la zone de réception n’est pas libre, ou si l’élève ne maîtrise pas encore la position de départ et la réception équilibrée."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(200));

// ================= 9.6 =================
children.push(sectionHeading("Actions au sol", "9.6"));
children.push(bodyPar(
  "Au sol, seules des actions simples, sûres et adaptées au niveau de la classe doivent être proposées (par exemple, une position tenue, un déplacement au sol contrôlé, ou un changement de position simple)."
));
children.push(bodyPar(
  "Des mouvements plus techniques (par exemple une roulade) ne doivent être introduits que si l’enseignant dispose des compétences nécessaires, du matériel adapté (comme un tapis approprié) et de l’espace permettant une pratique réellement sécurisée. Il ne faut jamais encourager un élève à tenter seul une figure acrobatique sans encadrement adapté."
));
children.push(spacer(160));

// ================= 9.7 =================
children.push(sectionHeading("Construire un petit enchaînement", "9.7"));
children.push(bodyPar(
  "Un enchaînement gymnique combine plusieurs actions simples réalisées l’une après l’autre : par exemple, une position de départ, un déplacement, un équilibre, un mouvement coordonné, un petit saut adapté, puis une position finale."
));
children.push(bodyPar(
  "Il est préférable de limiter la séquence à quelques éléments simples que tu maîtrises déjà, plutôt que de chercher à intégrer des éléments difficiles. L’objectif est de travailler la fluidité (l’enchaînement se déroule sans interruption brusque), la mémorisation de l’ordre des actions, et le contrôle du mouvement — jamais la difficulté pour elle-même."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["En gymnastique scolaire, la maîtrise et la sécurité sont plus importantes que la difficulté."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C09-05",
  "Enchaînement simple",
  "Dessiner une bande de 5 vignettes numérotées montrant un même élève haïtien réalisant un petit enchaînement : 1) position de départ stable ; 2) un déplacement simple ; 3) un équilibre sur deux appuis ; 4) un mouvement coordonné des bras ; 5) une position finale stable. Flèches entre les vignettes indiquant l’ordre.",
  "Un enchaînement simple combinant plusieurs actions maîtrisées, du départ à la position finale.",
  "Montrer concrètement comment plusieurs actions simples peuvent être combinées en une courte séquence gymnique.",
));
children.push(spacer(200));

// ================= 9.8 =================
children.push(sectionHeading("Observer et améliorer", "9.8"));
children.push(bodyPar(
  "Observer un camarade permet de l’aider à progresser. Quelques critères simples peuvent guider cette observation :"
));
[
  "la stabilité (la position ou la réception est-elle bien tenue, sans vaciller ?) ;",
  "le contrôle (les mouvements sont-ils maîtrisés, sans précipitation ?) ;",
  "le respect de l’espace (l’élève reste-t-il dans la zone prévue, sans gêner les autres ?) ;",
  "la continuité (l’enchaînement se déroule-t-il sans interruption brusque ?) ;",
  "la sécurité (l’élève respecte-t-il les consignes et adapte-t-il la difficulté à son niveau ?).",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Une observation doit toujours être formulée de façon respectueuse et utile pour aider le camarade à s’améliorer. L’apparence physique ou la morphologie d’un élève ne doivent jamais être utilisées comme critère d’évaluation."
));
children.push(spacer(160));

// ================= 9.9 =================
children.push(sectionHeading("Coopération et responsabilité", "9.9"));
children.push(bodyPar(
  "La gymnastique scolaire se pratique aussi en groupe, ce qui demande de l’entraide (aider un camarade à installer le matériel, par exemple), le respect de l’attente de son tour, le respect de l’espace de pratique des autres, le rangement soigné du matériel après usage, et l’encouragement des camarades pendant leurs essais."
));
children.push(bodyPar(
  "Chaque élève porte une part de responsabilité individuelle dans la sécurité collective : respecter les consignes, ne pas bousculer un camarade en train de réaliser un équilibre, et signaler tout danger observé."
));
children.push(spacer(120));

children.push(calloutBox(
  "Coopération",
  ["Aider un camarade à installer ou ranger le matériel, attendre calmement son tour et encourager un élève qui a du mal à garder l'équilibre sont des gestes essentiels en gymnastique scolaire."],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(200));

// ================= 9.10 =================
children.push(sectionHeading("Sécurité en gymnastique scolaire", "9.10"));
children.push(bodyPar(
  "Avant toute activité de gymnastique, il faut vérifier le sol, l’espace disponible, le matériel et les zones de circulation."
));
[
  "utiliser uniquement du matériel stable, adapté et correctement installé ;",
  "maintenir une distance suffisante entre les élèves ;",
  "attendre que la zone soit libre avant de commencer son passage ;",
  "ne jamais encourager une figure que l’élève ne maîtrise pas, ou qui nécessiterait un encadrement spécialisé absent de l’école.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "En cas de douleur, de malaise ou de tout autre problème inhabituel, il faut arrêter immédiatement l’activité et prévenir l’enseignant ou un adulte responsable."
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Bien avant de devenir un sport de compétition, la gymnastique était pratiquée dans la Grèce antique pour préparer le corps de façon générale : équilibre, souplesse et coordination étaient déjà considérés comme des qualités essentielles, tout comme dans ce chapitre."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-7AF-C09-06",
  "Organisation sécurisée",
  "Dessiner une scène de gymnastique scolaire bien organisée dans une cour d’école haïtienne : plusieurs élèves en file, attendant calmement leur tour à distance de sécurité, un élève réalisant son passage dans une zone d’activité clairement libre et dégagée, et l’enseignant en position de supervision, observant l’ensemble.",
  "Une organisation sécurisée : élèves en attente, zone d’activité libre, enseignant en supervision.",
  "Illustrer l’organisation attendue d’une séance de gymnastique scolaire, avec attente, zone libre et supervision.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Je trouve mon équilibre",
  [
    "Objectif : réaliser des positions d’équilibre simples et stables.",
    "Organisation : chaque élève dispose d’un espace individuel dans la cour ou la salle, à distance des autres.",
    "Matériel : aucun matériel indispensable ; un repère au sol peut aider à délimiter chaque espace.",
    "Consignes : réaliser une position d’équilibre sur deux appuis, la tenir quelques secondes sans vaciller, puis essayer, si le niveau le permet, une position sur un nombre réduit d’appuis.",
    "Sécurité : garder une distance suffisante entre les élèves ; ne jamais pousser un camarade en équilibre.",
    "Critère de réussite : tenir une position stable pendant quelques secondes, sans perdre l’équilibre.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Mon parcours de coordination",
  [
    "Objectif : réaliser des déplacements et des changements de direction contrôlés.",
    "Organisation : petit parcours délimité par des repères, réalisé individuellement à tour de rôle.",
    "Matériel : cônes ou repères souples, lignes tracées au sol.",
    "Consignes : suivre le parcours en marche contrôlée, réaliser un déplacement latéral, puis changer de direction en gardant l’équilibre.",
    "Sécurité : attendre que le parcours soit libre avant de commencer ; garder une distance suffisante avec les autres élèves.",
    "Critère de réussite : suivre le parcours du début à la fin sans perdre l’équilibre ni sortir de la zone prévue.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Je saute et je me réceptionne",
  [
    "Objectif : réaliser un petit saut adapté avec une réception contrôlée.",
    "Organisation : file d’élèves, chacun réalisant le saut à tour de rôle dans une zone dégagée.",
    "Matériel : zone de départ marquée au sol, zone de réception dégagée et adaptée.",
    "Consignes : adopter une position de départ stable, réaliser un petit saut, puis se réceptionner avec les genoux légèrement fléchis.",
    "Sécurité : la zone de réception doit toujours être libre avant chaque saut ; attendre que le camarade précédent l’ait dégagée.",
    "Critère de réussite : réaliser une réception équilibrée, sans perdre l’équilibre en retombant.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Notre mini-enchaînement",
  [
    "Objectif : construire et réaliser une courte séquence combinant plusieurs actions déjà maîtrisées.",
    "Organisation : individuellement ou en petit groupe, avec l’aide de l’enseignant pour choisir les éléments de la séquence.",
    "Matériel : aucun matériel indispensable ; des repères au sol peuvent aider à organiser l’espace.",
    "Consignes : combiner une position de départ, un déplacement, un équilibre, un mouvement coordonné et une position finale, dans un ordre mémorisé.",
    "Sécurité : ne choisir que des éléments déjà maîtrisés individuellement ; l’enseignant valide la séquence avant sa réalisation.",
    "Critère de réussite : réaliser l’enchaînement du début à la fin, avec continuité et sans interruption brusque.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation ----
children.push(sectionHeading("Activité d’observation", ""));
children.push(calloutBox(
  "Observe la séquence",
  [
    "Observe un camarade qui réalise une séquence gymnique simple (équilibre, déplacement, saut ou enchaînement) et identifie :",
    "1) une position stable ;",
    "2) un déplacement contrôlé ;",
    "3) une réception équilibrée ;",
    "4) le respect des distances avec les autres élèves ;",
    "5) un éventuel comportement à corriger.",
    "Partage ensuite ton observation avec ton camarade, de façon respectueuse et utile, sous la conduite de l’enseignant.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C09-07",
  "Observe et analyse",
  "Dessiner une image en deux parties, côte à côte. À gauche : une situation de gymnastique scolaire bien organisée (élève en équilibre stable, zone libre, camarades en attente à distance de sécurité). À droite, dans un espace similaire : plusieurs erreurs de sécurité à identifier (un élève trop proche de celui qui réalise l’exercice, une zone de réception encombrée par du matériel mal rangé). Style clair, sans blessure représentée, sans texte dans l’image.",
  "Quelle situation est bien organisée ? Quelles erreurs de sécurité peux-tu identifier dans l’autre ?",
  "Servir de support à une activité de comparaison entre une pratique sécuritaire et une pratique présentant des erreurs à corriger.",
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "La gymnastique développe le contrôle du corps dans différentes positions et différents déplacements, sans rechercher de figures spectaculaires.",
  "Un appui est un point de contact avec le sol ; l’équilibre demande une position stable à partir de ces appuis.",
  "Se déplacer avec contrôle et changer de direction demande d’observer l’espace et les autres élèves.",
  "La coordination associe plusieurs mouvements du corps, avec rythme, précision et continuité.",
  "Un petit saut scolaire comprend un départ stable, une phase aérienne courte et une réception équilibrée.",
  "Seules des actions au sol simples et sûres doivent être proposées, sans figure acrobatique non encadrée.",
  "Un enchaînement combine quelques actions simples déjà maîtrisées, avec fluidité et mémorisation.",
  "Observer un camarade se fait avec des critères simples et respectueux, jamais sur l’apparence physique.",
  "La coopération et la responsabilité individuelle contribuent à la sécurité collective.",
  "La sécurité (matériel stable, distances, zones libres, difficulté adaptée) doit toujours être respectée.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(9));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(équilibre - appui - coordination - réception - sécurité - enchaînement - posture - espace)", italics: true, color: "555555" },
]));
[
  "1. Un ____________________ est un point de contact entre le corps et le sol.",
  "2. Trouver une position stable à partir de ses appuis, c’est rechercher l’____________________.",
  "3. Associer plusieurs mouvements du corps en même temps ou l’un après l’autre s’appelle la ____________________.",
  "4. Après un saut, il faut toujours veiller à avoir une bonne ____________________, avec les genoux légèrement fléchis.",
  "5. Une série de plusieurs actions simples réalisées l’une après l’autre s’appelle un ____________________.",
  "6. Avant de se déplacer, il faut toujours observer l’____________________ disponible et la distance avec les autres élèves.",
  "7. Une position de départ ou d’arrivée stable dépend d’une bonne ____________________ du corps.",
  "8. Vérifier le matériel et attendre que la zone soit libre avant de commencer sont des règles de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que recherche-t-on en priorité en gymnastique scolaire ?", opts: ["a) la difficulté maximale", "b) la maîtrise et la sécurité", "c) la comparaison entre élèves", "d) la vitesse d’exécution"] },
  { q: "2. Qu’est-ce qu’un appui ?", opts: ["a) un mouvement rapide du corps", "b) un point de contact entre le corps et le sol", "c) un type de saut", "d) une figure acrobatique"] },
  { q: "3. Que doit-on faire avant de tenter un mouvement plus technique comme une roulade ?", opts: ["a) l’essayer seul dès que possible", "b) s’assurer que l’enseignant, le matériel et l’espace permettent une pratique sécurisée", "c) demander à un camarade de le faire à sa place", "d) l’essayer sans en parler à l’enseignant"] },
  { q: "4. Sur quel critère ne doit-on jamais évaluer un camarade en gymnastique ?", opts: ["a) la stabilité de sa position", "b) le respect des consignes", "c) son apparence physique ou sa morphologie", "d) le contrôle de son mouvement"] },
  { q: "5. Que doit faire un élève qui ressent un malaise pendant une séance de gymnastique ?", opts: ["a) continuer l’activité normalement", "b) arrêter l’activité et prévenir immédiatement l’enseignant", "c) attendre la fin de la séance pour en parler", "d) demander à un camarade de continuer à sa place"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Appui", "a) Ensemble des règles et comportements qui protègent les élèves pendant l’activité"],
  ["2. Équilibre", "b) Association de plusieurs mouvements du corps, avec rythme et continuité"],
  ["3. Coordination", "c) Position stable retrouvée après un saut ou un déplacement"],
  ["4. Réception", "d) Série de plusieurs actions simples réalisées l’une après l’autre"],
  ["5. Enchaînement", "e) Point de contact entre le corps et le sol"],
  ["6. Sécurité", "f) Position stable obtenue à partir de ses appuis"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Tu remarques que l’espace disponible pour un parcours de gymnastique est trop petit pour le nombre d’élèves. Que devrais-tu faire, et pourquoi ?",
  "2. Un morceau de matériel utilisé pour un exercice te semble instable. Explique ce que tu devrais faire avant de continuer l’activité.",
  "3. Pourquoi la réception est-elle considérée comme un moment particulièrement important, du point de vue de la sécurité, après un saut ou un équilibre ?",
  "4. En observant un camarade, comment pourrais-tu formuler une remarque utile et respectueuse, plutôt qu’une critique blessante ?",
].forEach(t => children.push(numberedPar(t)));

await buildAndSave(children, 87, "Manuel_EPS_7AF_Chapitre9.docx");
