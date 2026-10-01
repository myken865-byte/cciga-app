import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(5, "Initiation au basket-ball : techniques, règles et coopération"));

children.push(
  calloutBox(
    "Situation de départ",
    [
      "Pendant la récréation, un ballon de basket-ball traîne près du mur de l'école. Sherline le ramasse et essaie de le faire rebondir, mais il lui échappe à chaque fois. Un peu plus tard, en séance d'EPS, le professeur annonce : « Aujourd'hui, nous commençons le basket-ball. » Sherline se demande si elle va réussir, elle qui n'a presque jamais touché un ballon de ce genre.",
      "Ce chapitre t'apprendra, étape par étape, à contrôler un ballon de basket-ball, à dribbler, à passer, à tirer et à jouer avec ton équipe, même si tu débutes complètement.",
    ],
    "F0F0F0", "1F4E5F", NAVY,
  ),
  spacer(240),
);

children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "identifier l’objectif général du basket-ball et quelques caractéristiques essentielles du jeu ;",
  "reconnaître les principales zones et lignes d’un terrain de basket-ball ;",
  "adopter une position de base équilibrée ;",
  "contrôler le ballon avec des exercices simples de manipulation ;",
  "réaliser un dribble élémentaire en déplacement, en gardant le contrôle du ballon ;",
  "effectuer et recevoir des passes simples avec un partenaire ;",
  "découvrir des formes simples de tir adaptées au niveau débutant ;",
  "te démarquer et occuper l’espace de façon élémentaire ;",
  "participer à de petits jeux collectifs en respectant partenaires, adversaires, enseignant et règles ;",
  "identifier des règles de sécurité indispensables avant et pendant la pratique.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Mots-clés"));
children.push(mixedPar([
  { text: "Basket-ball, équipe, panier, dribble, passe, réception, tir, démarquage, fair-play, sécurité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ================= 5.1 =================
children.push(sectionHeading("Découvrir le basket-ball", "5.1"));
children.push(bodyPar(
  "Le basket-ball est un sport collectif qui oppose deux équipes. Chaque équipe cherche à faire entrer le ballon dans le panier adverse, tout en protégeant son propre panier."
));
children.push(bodyPar(
  "Le jeu se joue avec un ballon, sur un terrain délimité, avec un panier à chaque extrémité. Comme dans tous les sports collectifs, la réussite d’une équipe dépend de la coopération entre ses joueurs, et non des exploits d’un seul élève."
));
children.push(spacer(160));

// ================= 5.2 =================
children.push(sectionHeading("Le terrain et le matériel", "5.2"));
children.push(bodyPar(
  "Un terrain de basket-ball comporte plusieurs lignes et zones qu’il est utile de connaître :"
));
children.push(threeColTable(
  ["Élément du terrain", "Description simple", "Utilité pour l’élève"],
  [
    ["Lignes de côté", "Lignes qui délimitent les bords latéraux du terrain.", "Savoir quand le ballon sort du jeu."],
    ["Lignes de fond", "Lignes situées derrière chaque panier.", "Repérer les limites derrière le panier."],
    ["Ligne médiane", "Ligne qui coupe le terrain en deux moitiés égales.", "Séparer les deux camps."],
    ["Cercle central", "Cercle tracé au milieu du terrain.", "Repère utilisé pour certaines remises en jeu."],
    ["Paniers", "Un panier à chaque extrémité du terrain.", "Cible que chaque équipe doit atteindre."],
  ],
  [2600, 4000, 3000],
));
children.push(spacer(160));
children.push(bodyPar(
  "Les dimensions et les installations peuvent varier d’une école à l’autre. L’enseignant peut réduire l’espace de jeu, marquer des repères simples au sol ou adapter les règles selon le terrain disponible."
));
children.push(bodyPar(
  "Le matériel possible comprend : un ballon adapté à l’âge des élèves, les paniers disponibles dans l’établissement, des cônes ou repères souples, et des chasubles lorsque l’école en possède. Il ne faut jamais utiliser une structure instable ou dangereuse (comme un panier improvisé mal fixé) pour remplacer un panier officiel."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 5.1",
  "Schéma simplifié d’un terrain de basket-ball",
  "Dessiner un schéma vu du dessus d’un terrain de basket-ball simplifié, avec des étiquettes claires pour : les lignes de côté, les lignes de fond, la ligne médiane, le cercle central et les deux paniers. Utiliser des traits nets et des couleurs sobres, sans détails inutiles.",
  "Les principales lignes et zones d’un terrain de basket-ball.",
  "Aider l’élève à identifier et nommer les éléments essentiels du terrain avant de commencer à jouer.",
));
children.push(spacer(200));

// ================= 5.3 =================
children.push(sectionHeading("Position de base et contrôle du ballon", "5.3"));
children.push(bodyPar(
  "Avant de manipuler le ballon, il est important d’adopter une position de base équilibrée : les appuis stables et légèrement écartés, les genoux légèrement fléchis, le regard disponible pour observer le jeu, et le ballon contrôlé près du corps."
));
children.push(bodyPar(
  "Les premières manipulations du ballon se font avec les deux mains, à un rythme simple : faire rouler le ballon autour de la taille, le faire passer d’une main à l’autre, ou le tenir fermement en position d’attente. Aucun exercice acrobatique n’est nécessaire à ce stade : ce qui compte, c’est la maîtrise progressive et la coordination, pas la vitesse."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 5.2",
  "Position de base équilibrée avec ballon",
  "Dessiner un élève haïtien de 7e AF en position de base de basket-ball : appuis stables et légèrement écartés, genoux légèrement fléchis, ballon tenu à deux mains près du corps, regard vers l’avant. Environnement scolaire haïtien simple (cour ou terrain polyvalent).",
  "Une position de base équilibrée : appuis stables, genoux fléchis, ballon contrôlé.",
  "Montrer clairement la posture de référence que l’élève doit reproduire avant toute manipulation du ballon.",
));
children.push(spacer(200));

// ================= 5.4 =================
children.push(sectionHeading("Le dribble", "5.4"));
children.push(bodyPar(
  "Dribbler, c’est faire rebondir le ballon au sol de façon répétée pour se déplacer tout en le gardant sous contrôle. Le dribble permet à un joueur d’avancer avec le ballon sans enfreindre les règles."
));
children.push(bodyPar("Pour bien dribbler, il faut développer :"));
[
  "le contrôle du ballon, avec une main qui guide le rebond ;",
  "une poussée souple vers le sol, sans frapper le ballon trop fort ;",
  "un regard qui ne reste pas constamment fixé sur le ballon, pour pouvoir observer le jeu ;",
  "un déplacement progressif, d’abord lent, puis un peu plus rapide une fois le contrôle acquis.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Il est utile de commencer par des parcours très simples (par exemple dribbler en ligne droite sur une courte distance) avant d’essayer des situations plus complexes. Tu découvriras aussi, progressivement, à utiliser ta main droite et ta main gauche : il n’est pas nécessaire d’avoir la même maîtrise des deux mains dès le début."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 5.3",
  "Séquence pédagogique du dribble en déplacement",
  "Dessiner une séquence de 2 à 3 vignettes montrant un élève haïtien qui dribble en se déplaçant vers l’avant : ballon en contact avec le sol à chaque vignette, trajectoire simple représentée par une ligne pointillée au sol, regard de l’élève orienté vers l’espace de jeu plutôt que vers le ballon.",
  "Le dribble en déplacement : contrôle du ballon et regard tourné vers l’espace de jeu.",
  "Illustrer la coordination entre le contrôle du ballon et l’observation de l’environnement pendant le dribble.",
));
children.push(spacer(200));

// ================= 5.5 =================
children.push(sectionHeading("Les passes et la réception", "5.5"));
children.push(bodyPar(
  "La passe permet de faire circuler le ballon entre coéquipiers plus rapidement qu’en dribblant. Deux formes simples sont utiles au débutant : la passe à deux mains depuis la poitrine, et une passe avec un léger rebond au sol, lorsque cela convient à la situation."
));
children.push(bodyPar(
  "Recevoir une passe demande aussi de l’attention : il faut regarder le ballon jusqu’à son arrivée, préparer les mains pour l’accueillir, amortir la réception en fléchissant légèrement les bras, puis sécuriser le contrôle du ballon."
));
children.push(bodyPar(
  "Ces gestes s’entraînent d’abord en binômes, puis en petits groupes. Plus qu’une question de force, la passe est une question de précision, de communication et de coopération avec ses partenaires."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 5.4",
  "Passe et réception entre deux élèves",
  "Dessiner deux élèves haïtiens face à face, à quelques mètres de distance : l’un réalisant une passe à deux mains depuis la poitrine, ballon en l’air entre les deux ; l’autre en position de réception, bras légèrement fléchis, mains prêtes à accueillir le ballon.",
  "Une passe à deux mains bien réalisée, avec une réception préparée et amortie.",
  "Montrer la coordination entre le geste de passe et la posture de réception correcte.",
));
children.push(spacer(200));

// ================= 5.6 =================
children.push(sectionHeading("Le tir", "5.6"));
children.push(bodyPar(
  "Le tir consiste à envoyer le ballon vers le panier pour marquer. Au niveau débutant, on utilise une forme simple de tir proche du panier, sans chercher la puissance ni la distance."
));
children.push(bodyPar(
  "Quelques repères suffisent pour commencer : garder l’équilibre du corps, orienter le regard et les épaules vers la cible, contrôler le ballon avec les deux mains, puis accompagner le geste vers le panier sans mouvement brusque. Il n’est pas nécessaire de surcharger l’élève de détails techniques dès la première séance."
));
children.push(bodyPar(
  "La distance de tir doit être adaptée aux capacités des élèves et au matériel disponible : mieux vaut réussir souvent depuis une courte distance que multiplier les échecs depuis trop loin. Ces exercices ne doivent jamais devenir un concours de puissance entre élèves."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 5.5",
  "Séquence simple d’un tir proche du panier",
  "Dessiner une séquence de 2 vignettes montrant un élève haïtien effectuant un tir simple proche du panier : vignette 1, position équilibrée avec le ballon tenu à deux mains devant soi, regard vers le panier ; vignette 2, le geste accompagné vers le panier, bras tendus vers la cible. Mouvement anatomiquement cohérent, sans exagération.",
  "Un tir simple proche du panier : équilibre, orientation vers la cible et accompagnement du geste.",
  "Illustrer une technique de tir simple et sécuritaire, adaptée à un débutant de 7e AF.",
));
children.push(spacer(200));

// ================= 5.7 =================
children.push(sectionHeading("Se déplacer, se démarquer et occuper l’espace", "5.7"));
children.push(bodyPar(
  "Au basket-ball, un joueur n’a pas besoin d’avoir le ballon pour aider son équipe. En se déplaçant vers un espace libre, il aide ses partenaires à mieux faire circuler le jeu."
));
children.push(bodyPar(
  "Se démarquer, c’est se déplacer pour se rendre disponible et pouvoir recevoir une passe, en s’éloignant d’un adversaire trop proche. Cela demande d’observer le jeu en permanence : où sont mes partenaires ? Où sont les espaces libres ?"
));
children.push(bodyPar(
  "De petits jeux, sans contact excessif, permettent d’apprendre progressivement à lever la tête et à observer à la fois ses partenaires, ses adversaires et les espaces disponibles sur le terrain."
));
children.push(spacer(160));

// ================= 5.8 =================
children.push(sectionHeading("Principales règles adaptées au niveau 7e AF", "5.8"));
children.push(bodyPar(
  "Cette section présente uniquement les règles essentielles utiles à la compréhension scolaire du jeu, et non un règlement officiel complet."
));
[
  "respecter les limites du terrain (le ballon ou le joueur qui sort des lignes arrête le jeu) ;",
  "reprendre son dribble après un arrêt (« double dribble ») n’est pas autorisé, à un niveau introductif ;",
  "marcher plusieurs pas avec le ballon sans dribbler n’est pas autorisé ;",
  "éviter tout contact volontaire avec un adversaire (pousser, accrocher, bousculer) ;",
  "respecter les décisions de l’enseignant, qui joue le rôle d’arbitre ;",
  "reprendre le jeu (remise en jeu) selon les consignes données pour la situation travaillée.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Lorsque ces règles sont simplifiées pour faciliter l’apprentissage, il s’agit toujours d’une adaptation pédagogique décidée par l’enseignant, et non des règles officielles complètes du basket-ball."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Au niveau 7e AF, les règles du basket-ball sont volontairement simplifiées pour faciliter l’apprentissage. Elles seront précisées progressivement au fil de ta pratique."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(200));

// ================= 5.9 =================
children.push(sectionHeading("Coopération, respect et fair-play", "5.9"));
children.push(bodyPar(
  "Le basket-ball, comme tous les sports collectifs, se joue avec des partenaires et des adversaires qu’il faut respecter."
));
[
  "respecter ses partenaires et ses adversaires ;",
  "accepter les décisions de l’enseignant sans discuter au moment de l’action ;",
  "partager le ballon avec ses coéquipiers plutôt que de le garder pour soi ;",
  "encourager ses partenaires, surtout après une erreur ;",
  "garder la maîtrise de soi, même en cas de frustration.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Une équipe efficace ne dépend jamais d’un seul joueur : elle repose sur la coopération de tous. Il ne faut jamais humilier un camarade ou comparer les corps ou les performances physiques entre élèves."
));
children.push(spacer(120));

children.push(calloutBox(
  "Fair-play",
  ["Au basket-ball comme dans tous les sports, féliciter un adversaire, accepter une décision arbitrale et partager le ballon avec ses coéquipiers sont des marques de fair-play, aussi importantes que la réussite d’un tir."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ================= 5.10 =================
children.push(sectionHeading("Sécurité au basket-ball scolaire", "5.10"));
children.push(bodyPar(
  "Avant chaque séance de basket-ball, certaines vérifications sont indispensables :"
));
[
  "l’état du sol (propreté, absence d’objets dangereux) ;",
  "l’espace disponible autour du terrain (pas d’obstacle proche) ;",
  "la stabilité des équipements, notamment des paniers ;",
  "l’état du ballon (gonflage correct, pas de partie abîmée).",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Pendant le jeu, il faut respecter les distances entre joueurs et éviter tout geste volontaire dangereux : pousser, accrocher ou percuter un camarade. Comme pour toute activité d’EPS, un échauffement progressif et un retour au calme (voir chapitre 4) doivent encadrer la séance."
));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  [
    "Vérifie le sol, l’espace de jeu, la stabilité des paniers et l’état du ballon avant de commencer.",
    "Ne pousse, n’accroche et ne percute jamais volontairement un camarade.",
    "En cas de douleur, de malaise ou de problème inhabituel, arrête l’activité et préviens immédiatement l’enseignant ou un adulte responsable.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(200));

children.push(illustrationBox(
  "Illustration 5.6",
  "Petit jeu collectif : démarquage et coopération",
  "Dessiner une scène de petit jeu collectif de basket-ball adapté (par exemple 3 contre 3) dans une cour d’école haïtienne : un joueur avec le ballon cherchant un partenaire démarqué, un partenaire qui s’est déplacé vers un espace libre en levant la main pour demander la balle, et un ou deux adversaires positionnés à distance raisonnable. Ambiance coopérative, aucun contact.",
  "Un partenaire se démarque vers un espace libre pour se rendre disponible.",
  "Illustrer concrètement les notions de démarquage, d’occupation de l’espace et de coopération d’équipe.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Je contrôle mon ballon",
  [
    "Objectif : améliorer la manipulation et le dribble simple du ballon.",
    "Organisation : chaque élève dispose d’un ballon (ou en alternance si le matériel est limité), dans un espace délimité par des cônes ou des repères au sol.",
    "Matériel : un ballon par élève ou par petit groupe, cônes ou repères souples.",
    "Consignes : manipuler le ballon à deux mains, puis dribbler sur place, puis dribbler en avançant lentement dans l’espace délimité, sans bousculer les autres élèves.",
    "Sécurité : garder une distance suffisante entre les élèves ; ne jamais dribbler en regardant uniquement le ballon en présence de camarades proches.",
    "Critère de réussite : garder le contrôle du ballon pendant un court parcours simple, sans le perdre plus d’une ou deux fois.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Passe et déplace-toi",
  [
    "Objectif : s’entraîner à passer, recevoir, puis se déplacer vers un nouvel espace.",
    "Organisation : élèves en binômes ou en petits groupes de 3 à 4, répartis dans l’espace de jeu.",
    "Matériel : un ballon par binôme ou petit groupe.",
    "Consignes : faire une passe à deux mains à un partenaire, puis se déplacer immédiatement vers un nouvel espace libre pour recevoir la passe suivante.",
    "Sécurité : regarder avant de se déplacer pour éviter toute collision avec un autre groupe.",
    "Critère de réussite : réaliser plusieurs passes et réceptions réussies de suite, avec un déplacement à chaque fois.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Vise le panier",
  [
    "Objectif : s’exercer à un tir simple proche du panier.",
    "Organisation : les élèves forment une file, avec une zone d’attente sécurisée à distance raisonnable du tireur.",
    "Matériel : un ballon, un panier disponible, des repères au sol pour la distance de tir et la zone d’attente.",
    "Consignes : chaque élève tire à tour de rôle depuis une distance adaptée, récupère son ballon, puis retourne en fin de file.",
    "Sécurité : rester dans la zone d’attente tant que ce n’est pas son tour ; ne jamais courir vers le panier pendant qu’un camarade tire.",
    "Critère de réussite : réaliser un geste de tir équilibré et contrôlé, que le ballon rentre ou non dans le panier.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Mini-basket coopératif",
  [
    "Objectif : appliquer dribble, passes, démarquage et règles essentielles dans un petit jeu collectif.",
    "Organisation : petits groupes à effectif réduit (par exemple 3 contre 3), sur un terrain adapté à l’espace disponible.",
    "Matériel : un ballon, repères pour délimiter le terrain, chasubles si disponibles pour distinguer les équipes.",
    "Consignes : règles simplifiées favorisant les passes et le déplacement (par exemple, exiger au moins deux passes avant de tirer) pour que tous les élèves participent.",
    "Sécurité : respecter les limites du terrain et éviter tout contact volontaire.",
    "Critère de réussite : chaque élève de l’équipe touche le ballon au moins une fois pendant le jeu.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "Illustration 5.7",
  "Observe et analyse : comportements corrects et erreurs simples",
  "Dessiner une scène de mini-basket coopératif avec plusieurs situations à identifier : un élève qui partage le ballon en faisant une passe à un partenaire démarqué (comportement correct), et un élève qui garde le ballon sans jamais le passer malgré des partenaires libres (erreur simple à identifier). Style clair, sans texte dans l’image.",
  "Quels comportements sont corrects ? Lesquels devraient être corrigés ?",
  "Servir de support à un exercice d’observation où l’élève identifie les bons comportements et les erreurs simples à corriger.",
));
children.push(spacer(120));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Le basket-ball a été inventé en 1891 par un professeur d’éducation physique qui cherchait un jeu pouvant se pratiquer à l’intérieur, pendant l’hiver. Le tout premier panier était... un panier de pêches accroché en hauteur !"],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le basket-ball est un sport collectif où deux équipes cherchent à marquer dans le panier adverse tout en protégeant leur propre panier.",
  "Le terrain comprend des lignes de côté, des lignes de fond, une ligne médiane, un cercle central et deux paniers.",
  "La position de base équilibrée et le contrôle du ballon sont les premiers gestes à maîtriser.",
  "Le dribble permet de se déplacer avec le ballon tout en le gardant sous contrôle.",
  "Les passes et la réception demandent précision, communication et coopération.",
  "Le tir proche du panier s’apprend d’abord sans rechercher la puissance ni la distance.",
  "Se démarquer et occuper l’espace aide l’équipe même sans avoir le ballon.",
  "Les règles présentées sont volontairement simplifiées pour l’apprentissage scolaire.",
  "La coopération, le respect et le fair-play sont aussi importants que la technique.",
  "La sécurité (terrain, matériel, distances, absence de contact volontaire) doit toujours être respectée.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(5));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(dribble - passe - panier - équipe - réception - terrain - coopération - sécurité)", italics: true, color: "555555" },
]));
[
  "1. Au basket-ball, chaque ____________________ cherche à marquer dans le panier adverse.",
  "2. Faire rebondir le ballon au sol pour se déplacer en le gardant sous contrôle s’appelle le ____________________.",
  "3. Envoyer le ballon à un partenaire pour qu’il le reçoive s’appelle une ____________________.",
  "4. Regarder le ballon, préparer les mains et amortir sont les étapes d’une bonne ____________________.",
  "5. Un ____________________ de basket-ball comporte des lignes de côté, une ligne médiane et deux paniers.",
  "6. Marquer un point consiste à faire entrer le ballon dans le ____________________ adverse.",
  "7. Partager le ballon et encourager ses partenaires sont des marques de ____________________.",
  "8. Vérifier l’état du ballon et du terrain avant de jouer est une règle de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quel est l’objectif principal du basket-ball ?", opts: ["a) courir le plus vite possible", "b) marquer dans le panier adverse tout en protégeant son propre panier", "c) garder le ballon le plus longtemps possible sans le passer", "d) éviter tout contact avec le ballon"] },
  { q: "2. Que faut-il faire pour bien dribbler ?", opts: ["a) frapper le ballon le plus fort possible", "b) garder le regard fixé uniquement sur le ballon", "c) contrôler le ballon avec une poussée souple et observer le jeu", "d) courir sans jamais faire rebondir le ballon"] },
  { q: "3. Que signifie « se démarquer » ?", opts: ["a) rester immobile près d’un adversaire", "b) se déplacer vers un espace libre pour se rendre disponible", "c) garder le ballon sans le partager", "d) sortir du terrain volontairement"] },
  { q: "4. Pourquoi les règles présentées dans ce chapitre sont-elles simplifiées ?", opts: ["a) parce que le vrai règlement n’existe pas", "b) pour faciliter l’apprentissage au niveau scolaire", "c) parce que les élèves ne peuvent pas comprendre de règles", "d) parce que le basket-ball scolaire n’a aucune règle"] },
  { q: "5. Que doit faire un élève qui ressent un malaise pendant une séance de basket-ball ?", opts: ["a) continuer à jouer normalement", "b) arrêter l’activité et prévenir immédiatement l’enseignant", "c) demander à un camarade de le remplacer sans rien dire", "d) attendre la fin de la séance pour en parler"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Dribble", "a) Se déplacer vers un espace libre pour se rendre disponible"],
  ["2. Passe", "b) Geste qui envoie le ballon vers le panier pour marquer"],
  ["3. Réception", "c) Faire rebondir le ballon au sol pour se déplacer en le contrôlant"],
  ["4. Tir", "d) Respecter l’adversaire, l’arbitre et les partenaires"],
  ["5. Démarquage", "e) Regarder le ballon, préparer les mains et amortir son arrivée"],
  ["6. Fair-play", "f) Envoyer le ballon à un partenaire"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un camarade garde toujours le ballon et ne fait aucune passe pendant le jeu collectif. Explique comment cela nuit au jeu d’équipe et propose une solution pour améliorer la situation.",
  "2. Explique, avec tes propres mots, pourquoi il est utile de se démarquer même quand on n’a pas le ballon.",
  "3. Pourquoi ce chapitre insiste-t-il sur le fait que les règles présentées sont « simplifiées » plutôt que d’enseigner directement le règlement officiel complet ?",
  "4. Décris deux comportements de fair-play que tu pourrais appliquer pendant un match de basket-ball scolaire.",
].forEach(t => children.push(numberedPar(t)));

await buildAndSave(children, 40, "Manuel_EPS_7AF_Chapitre5.docx");
