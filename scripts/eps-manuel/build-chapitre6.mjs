import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(6, "Athlétisme : courir, sauter et lancer"));

children.push(
  calloutBox(
    "Situation de départ",
    [
      "Pendant la séance d'EPS, le professeur trace une ligne de départ et une ligne d'arrivée dans la cour de l'école, puis installe un peu plus loin une petite zone marquée au sol avec un tas de sable. Widchou se demande pourquoi son professeur prépare plusieurs ateliers différents le même jour. Le professeur explique : « Aujourd'hui, nous découvrons l'athlétisme : courir, sauter et lancer. »",
      "Ce chapitre va t'apprendre à courir avec une bonne posture, à sauter en te réceptionnant en sécurité, et à lancer avec précision, tout en respectant les zones et les consignes de sécurité.",
    ],
    "F0F0F0", "1F4E5F", NAVY,
  ),
  spacer(240),
);

children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "définir simplement l’athlétisme et reconnaître les trois familles travaillées : courses, sauts et lancers ;",
  "différencier une course rapide d’une course où l’allure doit être gérée ;",
  "comprendre le départ, la trajectoire, l’arrivée et le respect de son couloir ou de son espace ;",
  "découvrir les phases simples d’un saut : approche, impulsion, suspension ou franchissement, puis réception sécurisée ;",
  "réaliser des lancers pédagogiques de précision ou de distance avec du matériel scolaire sûr et sous supervision ;",
  "observer un camarade et identifier un ou deux critères simples de réussite ;",
  "respecter les zones d’attente, de course, de saut et de lancer ;",
  "relier échauffement, hydratation, récupération et sécurité aux apprentissages de ce chapitre.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Mots-clés"));
children.push(mixedPar([
  { text: "Athlétisme, course, allure, relais, impulsion, réception, lancer, trajectoire, précision, sécurité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ================= 6.1 =================
children.push(sectionHeading("Qu’est-ce que l’athlétisme ?", "6.1"));
children.push(bodyPar(
  "L’athlétisme regroupe un ensemble d’activités fondées notamment sur trois grandes familles d’actions : courir, sauter et lancer. Ce sont des mouvements naturels que tu pratiques déjà, souvent sans y penser, dans la cour de l’école ou à la maison."
));
children.push(bodyPar(
  "Dans ce chapitre, l’important n’est pas de connaître l’histoire détaillée des compétitions d’athlétisme, mais de comprendre et de pratiquer correctement ces trois familles d’actions, de façon progressive et sécuritaire."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 6.1",
  "Les trois familles de l’athlétisme : courir, sauter, lancer",
  "Dessiner trois vignettes côte à côte montrant des élèves haïtiens de 7e AF dans un contexte scolaire : vignette 1, un élève qui court dans la cour d’école ; vignette 2, un élève en phase d’impulsion pour un saut au-dessus d’une zone marquée au sol ; vignette 3, un élève qui lance un objet léger vers une cible. Étiqueter chaque vignette (« Courir », « Sauter », « Lancer »).",
  "Les trois grandes familles d’actions travaillées en athlétisme scolaire.",
  "Donner à l’élève une vue d’ensemble des trois familles d’actions avant de les étudier une à une.",
));
children.push(spacer(200));

// ================= 6.2 =================
children.push(sectionHeading("Courir : posture et coordination", "6.2"));
children.push(bodyPar(
  "Courir correctement demande une posture naturelle et équilibrée : le buste légèrement penché vers l’avant, les bras et les jambes qui travaillent de façon coordonnée, le regard orienté vers l’espace de course plutôt que vers le sol."
));
children.push(bodyPar(
  "Il n’existe pas une seule « bonne » façon de courir identique pour tous les élèves : chaque coureur a sa propre foulée. Ce qu’il faut observer, ce sont quelques repères simples : le respect de sa trajectoire, une coordination naturelle entre bras et jambes, et une posture qui reste équilibrée du départ jusqu’à l’arrivée."
));
children.push(spacer(160));

// ================= 6.3 =================
children.push(sectionHeading("La course rapide", "6.3"));
children.push(bodyPar(
  "Une course rapide se déroule en plusieurs moments : un départ simple donné sur un signal (par exemple un coup de sifflet), une accélération progressive, une course contrôlée jusqu’à la ligne d’arrivée, puis un ralentissement après avoir franchi cette ligne."
));
children.push(bodyPar(
  "Au niveau 7e AF, il n’est pas nécessaire d’apprendre des techniques avancées de départ en starting-blocks : un départ debout, simple et sur signal, suffit largement. Les distances utilisées doivent rester courtes et adaptées par l’enseignant selon l’espace scolaire disponible."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 6.2",
  "Séquence d’une course rapide",
  "Réaliser une bande de 4 vignettes numérotées montrant un même élève haïtien : 1) position de départ derrière une ligne tracée au sol, prêt au signal ; 2) phase d’accélération, buste légèrement penché vers l’avant ; 3) course contrôlée vers une ligne d’arrivée visible au loin ; 4) ralentissement progressif juste après avoir franchi la ligne d’arrivée. Utiliser des flèches entre les vignettes.",
  "Les étapes d’une course rapide : départ, accélération, course contrôlée, puis ralentissement après l’arrivée.",
  "Aider l’élève à mémoriser l’enchaînement complet d’une course rapide, du départ jusqu’au ralentissement final.",
));
children.push(spacer(200));

// ================= 6.4 =================
children.push(sectionHeading("Gérer son allure", "6.4"));
children.push(bodyPar(
  "Une course plus longue ne se court pas de la même façon qu’une course rapide sur une courte distance : elle demande de répartir son effort sur toute la distance, en choisissant une allure que l’on peut maintenir sans s’épuiser trop vite."
));
children.push(bodyPar(
  "Cette notion est directement liée à ce que tu as appris au chapitre 2 sur la respiration et le cœur, et au chapitre 3 sur la récupération : si tu pars trop vite, ta respiration et ton cœur devront travailler beaucoup plus fort, et la fatigue arrivera plus rapidement."
));
children.push(bodyPar(
  "Il n’est jamais question d’imposer des distances ou des durées extrêmes : c’est l’enseignant qui adapte l’activité selon les élèves et les conditions du jour."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Pour une course longue, il vaut mieux garder une allure régulière que possible tenir jusqu’au bout, plutôt que de partir trop vite au risque de s’épuiser rapidement."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(200));

// ================= 6.5 =================
children.push(sectionHeading("Les relais et la coopération", "6.5"));
children.push(bodyPar(
  "Le relais est une forme de course d’équipe : chaque élève court jusqu’à une zone prévue, transmet un témoin (ou un objet pédagogique sûr) à son partenaire, qui prend alors le relais en partant à son tour."
));
children.push(bodyPar(
  "Le relais demande de la communication (annoncer clairement la transmission), de l’organisation (savoir où se placer et quand partir), de la patience (attendre son tour) et de la sécurité (transmettre calmement, sans bousculade). Si l’établissement ne possède pas de témoin officiel, l’enseignant peut utiliser un objet pédagogique adapté, léger et sûr."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 6.3",
  "Relais scolaire",
  "Dessiner une scène de relais dans une cour d’école haïtienne : deux élèves dans la zone de transmission, l’un tendant un témoin (ou objet pédagogique) à l’autre qui commence à courir, ainsi que d’autres élèves en attente, alignés derrière une ligne, observant la course. Ambiance organisée et coopérative.",
  "La zone de transmission d’un relais scolaire : communication et organisation entre partenaires.",
  "Illustrer concrètement le moment clé du relais — la transmission — et l’organisation des élèves en attente.",
));
children.push(spacer(200));

// ================= 6.6 =================
children.push(sectionHeading("Sauter : principes de base", "6.6"));
children.push(bodyPar(
  "Un saut se déroule généralement en plusieurs phases : un élan ou une approche (pour prendre de la vitesse ou se placer), une impulsion (le moment où l’on pousse sur le sol pour décoller), un déplacement du corps dans les airs, puis une réception."
));
children.push(bodyPar(
  "La réception est la phase la plus importante du point de vue de la sécurité : elle doit toujours être équilibrée et se faire dans une zone sûre, prévue à cet effet. Aucun saut acrobatique ni aucun dispositif improvisé et dangereux (par exemple sauter par-dessus un obstacle instable) ne doit jamais être proposé aux élèves."
));
children.push(spacer(160));

// ================= 6.7 =================
children.push(sectionHeading("Initiation au saut en longueur", "6.7"));
children.push(bodyPar(
  "Le saut en longueur scolaire suit une progression simple : une course d’approche courte, une impulsion réalisée dans une zone clairement identifiée au sol, puis une réception dans une surface adaptée (par exemple une fosse de sable, lorsque l’établissement en possède une)."
));
children.push(bodyPar(
  "Si aucune fosse adaptée n’est disponible, l’enseignant peut proposer uniquement des situations pédagogiques alternatives sûres (par exemple sauter vers une zone dégagée et souple, clairement délimitée), sans jamais improviser de dispositif risqué."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 6.4",
  "Phases pédagogiques du saut en longueur",
  "Dessiner une séquence de 3 vignettes montrant un même élève haïtien : 1) course d’approche courte vers une zone d’impulsion marquée au sol ; 2) impulsion, un pied au sol dans la zone identifiée, corps en phase de décollage ; 3) réception équilibrée, genoux légèrement fléchis, dans une zone de réception adaptée (sable ou surface souple).",
  "Les phases du saut en longueur scolaire : approche, impulsion, réception sûre.",
  "Montrer la progression complète du saut avec un accent particulier sur la sécurité de la réception.",
));
children.push(spacer(200));

// ================= 6.8 =================
children.push(sectionHeading("Lancer : précision et contrôle", "6.8"));
children.push(bodyPar(
  "Lancer un objet demande de l’orientation (viser une direction ou une cible), de la coordination (utiliser le corps entier, pas seulement le bras) et du contrôle (maîtriser la force du geste)."
));
children.push(bodyPar(
  "L’apprentissage commence par des lancers de précision, avec des objets pédagogiques légers et sûrs adaptés à l’EPS (par exemple de petites balles souples), vers une cible simple. Ensuite, si les conditions le permettent, l’enseignant peut proposer une recherche modérée de distance, toujours sous son contrôle direct."
));
children.push(bodyPar(
  "Il ne faut jamais utiliser d’objets durs, coupants, lourds ou dangereux comme matériel de lancer improvisé : seul le matériel pédagogique approuvé par l’enseignant doit être utilisé."
));
children.push(spacer(160));

children.push(illustrationBox(
  "Illustration 6.5",
  "Lancer de précision",
  "Dessiner une scène de lancer de précision scolaire : un élève haïtien en position de lancer avec un objet léger (petite balle souple), une ligne de lancer tracée au sol, une cible simple placée à une distance adaptée, une zone interdite bien signalée devant la cible où personne ne doit se trouver pendant le lancer, et l’enseignant qui supervise depuis un endroit sûr.",
  "Une zone de lancer de précision bien organisée : ligne de lancer, cible et zone interdite respectées.",
  "Illustrer l’organisation spatiale nécessaire à la sécurité pendant un exercice de lancer de précision.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Sécurité",
  ["En lancer, on récupère le matériel uniquement lorsque l’enseignant autorise l’entrée dans la zone."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(200));

// ================= 6.9 =================
children.push(sectionHeading("Mesurer et observer les progrès", "6.9"));
children.push(bodyPar(
  "Une distance sautée ou lancée, un temps de course, ou la réussite d’un geste peuvent servir à observer sa propre progression, sans jamais humilier ou comparer les élèves entre eux."
));
children.push(bodyPar(
  "Un petit tableau simple peut t’aider à suivre tes progrès personnels :"
));
children.push(threeColTable(
  ["Essai 1", "Essai 2", "Observation / Progrès"],
  [
    ["Résultat ou sensation du premier essai", "Résultat ou sensation du deuxième essai", "Ce qui s’est amélioré (technique, régularité, confiance...)"],
  ],
  [3200, 3200, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce qui compte le plus, ce n’est pas seulement le résultat chiffré, mais la régularité, la qualité de la technique, le respect des consignes et l’amélioration personnelle d’une tentative à l’autre."
));
children.push(spacer(160));

// ================= 6.10 =================
children.push(sectionHeading("Sécurité en athlétisme scolaire", "6.10"));
children.push(bodyPar(
  "Avant toute activité d’athlétisme, il faut vérifier le sol, les obstacles éventuels, les limites de l’espace et le matériel disponible."
));
[
  "Pour les courses : organiser clairement les départs et les arrivées afin d’éviter les collisions entre élèves.",
  "Pour les sauts : garder la zone de réception toujours libre et dégagée.",
  "Pour les lancers : établir clairement une ligne d’attente et une zone de lancer ; personne ne doit entrer dans la zone avant l’autorisation de l’enseignant.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "En cas de douleur, de malaise ou de tout autre problème inhabituel, il faut arrêter immédiatement l’activité et prévenir l’enseignant ou un adulte responsable, comme tu l’as appris au chapitre 4."
));
children.push(spacer(160));

children.push(calloutBox(
  "Fair-play",
  ["Encourager un camarade qui termine dernier une course, ou applaudir la tentative d’un élève même si son saut ou son lancer n’a pas réussi, sont des marques de fair-play tout aussi importantes qu’une bonne performance."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["L’athlétisme est souvent considéré comme le sport le plus ancien du monde : des courses, des sauts et des lancers étaient déjà pratiqués lors des Jeux olympiques de la Grèce antique, il y a plus de deux mille ans."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "Illustration 6.6",
  "Observe et analyse : sécurité dans un espace d’athlétisme scolaire",
  "Dessiner une vue d’ensemble d’un espace scolaire haïtien aménagé pour l’athlétisme, avec plusieurs éléments à observer : une ligne de départ et une zone d’arrivée bien séparées, une zone de réception de saut dégagée, une zone de lancer avec ligne d’attente et zone interdite respectées, des élèves qui attendent calmement à distance de sécurité, et l’enseignant en position de supervision. Ne pas inclure de texte dans l’image.",
  "Quels éléments de sécurité peux-tu identifier dans cet espace d’athlétisme scolaire ?",
  "Servir de support à une activité d’observation où l’élève identifie les éléments de sécurité correctement mis en place.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Courir avec contrôle",
  [
    "Objectif : réaliser une course rapide avec un départ, une trajectoire contrôlée et un ralentissement après l’arrivée.",
    "Organisation : petits groupes qui courent à tour de rôle sur une distance courte, définie par l’enseignant.",
    "Matériel : lignes tracées au sol (départ et arrivée), sifflet ou signal de départ.",
    "Consignes : partir uniquement au signal, courir dans sa trajectoire sans gêner les autres, ralentir progressivement après la ligne d’arrivée plutôt que de s’arrêter net.",
    "Sécurité : prévoir un espace dégagé après la ligne d’arrivée pour permettre le ralentissement en toute sécurité.",
    "Critère de réussite : respecter le signal de départ, garder sa trajectoire et ralentir progressivement après l’arrivée.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Notre relais",
  [
    "Objectif : réaliser une transmission simple et sécurisée dans une course de relais.",
    "Organisation : petits groupes de 3 à 4 élèves, avec une zone de transmission clairement marquée au sol.",
    "Matériel : un témoin ou un objet pédagogique léger et sûr par groupe, repères au sol.",
    "Consignes : courir jusqu’à la zone de transmission, annoncer clairement la transmission, remettre calmement l’objet au partenaire, qui part alors à son tour.",
    "Sécurité : rester attentif dans la zone d’attente ; ne jamais partir avant d’avoir reçu l’objet.",
    "Critère de réussite : réaliser une transmission calme et réussie, sans que l’objet ne tombe.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Je saute et je me réceptionne",
  [
    "Objectif : réaliser une progression élémentaire de saut, centrée sur l’équilibre et la réception sûre.",
    "Organisation : file d’élèves, chacun réalisant l’exercice à tour de rôle dans une zone dégagée.",
    "Matériel : zone d’impulsion marquée au sol, zone de réception sûre (sable ou surface souple, ou situation alternative sécurisée décidée par l’enseignant).",
    "Consignes : réaliser une courte approche, une impulsion dans la zone identifiée, puis une réception équilibrée avec les genoux légèrement fléchis.",
    "Sécurité : la zone de réception doit toujours rester libre avant chaque saut ; attendre que le camarade précédent ait dégagé la zone.",
    "Critère de réussite : réaliser une réception équilibrée, sans perdre l’équilibre en retombant.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Je vise",
  [
    "Objectif : réaliser un lancer de précision avec du matériel léger et sûr.",
    "Organisation : file d’élèves derrière une ligne de lancer, avec une zone d’attente clairement définie.",
    "Matériel : objets pédagogiques légers (petites balles souples), cible simple, repères pour la ligne de lancer et la zone interdite.",
    "Consignes : lancer à tour de rôle vers la cible, puis attendre l’autorisation de l’enseignant avant d’aller récupérer les objets lancés.",
    "Sécurité : personne n’entre dans la zone de lancer avant l’autorisation explicite de l’enseignant.",
    "Critère de réussite : réaliser un geste de lancer contrôlé et orienté vers la cible, que l’objet l’atteigne ou non.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "L’athlétisme regroupe trois grandes familles d’actions : courir, sauter et lancer.",
  "Une course rapide comprend un départ, une accélération, une course contrôlée et un ralentissement après l’arrivée.",
  "Gérer son allure permet de répartir son effort sur une course plus longue.",
  "Le relais demande communication, organisation et sécurité entre partenaires.",
  "Un saut se déroule en plusieurs phases : approche, impulsion, déplacement du corps et réception, la réception étant la phase la plus importante pour la sécurité.",
  "Le saut en longueur scolaire suit une progression simple, avec une réception toujours sécurisée.",
  "Lancer demande orientation, coordination et contrôle, en commençant par des lancers de précision.",
  "Mesurer ses progrès (distance, temps, réussite) valorise la progression personnelle, jamais la comparaison entre élèves.",
  "La sécurité (zones de course, de saut et de lancer) doit toujours être respectée.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(6));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(impulsion - relais - allure - réception - lancer - course - sécurité - trajectoire)", italics: true, color: "555555" },
]));
[
  "1. Une ____________________ rapide comprend un départ, une accélération et un ralentissement après l’arrivée.",
  "2. Gérer son ____________________ permet de répartir son effort sur une course plus longue.",
  "3. Dans un ____________________, chaque élève transmet un témoin à son partenaire dans une zone prévue.",
  "4. Le moment où l’on pousse sur le sol pour décoller pendant un saut s’appelle l’____________________.",
  "5. Après un saut, la ____________________ doit toujours être équilibrée et se faire dans une zone sûre.",
  "6. Viser une cible avec un objet léger et sûr est un exemple de ____________________ de précision.",
  "7. Pendant une course, il faut respecter sa ____________________ sans gêner les autres coureurs.",
  "8. Attendre l’autorisation de l’enseignant avant d’entrer dans une zone de lancer est une règle de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quelles sont les trois grandes familles d’actions travaillées en athlétisme ?", opts: ["a) sauter, nager, lancer", "b) courir, sauter, lancer", "c) courir, grimper, lancer", "d) sauter, lancer, dribbler"] },
  { q: "2. Que doit faire un élève qui court une distance plus longue ?", opts: ["a) partir le plus vite possible dès le départ", "b) gérer son allure pour répartir son effort", "c) s’arrêter dès qu’il ressent un effort", "d) courir uniquement en fermant les yeux"] },
  { q: "3. Quelle est la phase la plus importante d’un saut, du point de vue de la sécurité ?", opts: ["a) l’élan", "b) l’impulsion", "c) la réception", "d) le regard"] },
  { q: "4. Quel type de matériel peut-on utiliser pour un lancer de précision scolaire ?", opts: ["a) des objets lourds et coupants", "b) des pierres ramassées au sol", "c) des objets pédagogiques légers et sûrs", "d) n’importe quel objet disponible"] },
  { q: "5. Quand peut-on entrer dans une zone de lancer pour récupérer les objets ?", opts: ["a) dès que l’on a envie de le faire", "b) uniquement lorsque l’enseignant l’autorise", "c) avant même que le lancer commence", "d) pendant qu’un camarade est en train de lancer"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Course rapide", "a) Répartir son effort sur une distance plus longue"],
  ["2. Allure", "b) Moment où l’on pousse sur le sol pour décoller pendant un saut"],
  ["3. Relais", "c) Viser une cible avec un objet léger et contrôlé"],
  ["4. Impulsion", "d) Course avec départ, accélération et ralentissement après l’arrivée"],
  ["5. Réception", "e) Transmission d’un témoin entre partenaires dans une zone prévue"],
  ["6. Lancer de précision", "f) Retomber au sol de façon équilibrée après un saut"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Pourquoi faut-il attendre l’autorisation de l’enseignant avant de récupérer un objet lancé dans une zone de lancer ?",
  "2. Pourquoi un élève ne doit-il pas partir à vitesse maximale dès le début s’il doit gérer une course plus longue ?",
  "3. Comment organiserais-tu une zone de saut dans ta cour d’école pour éviter les collisions entre élèves ?",
  "4. Explique pourquoi la réception est considérée comme la phase la plus importante d’un saut, du point de vue de la sécurité.",
].forEach(t => children.push(numberedPar(t)));

await buildAndSave(children, 52, "Manuel_EPS_7AF_Chapitre6.docx");
