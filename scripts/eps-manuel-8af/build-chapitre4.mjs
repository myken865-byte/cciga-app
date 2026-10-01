import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_CITOYEN_FILL, BOX_CITOYEN_LINE, BOX_CITOYEN_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(4, "Préparation à l’effort : échauffement, prévention, sécurité et organisation de la pratique"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Au chapitre 3, tu as appris à observer comment ton corps réagit à l’effort et à gérer ton allure. Ce chapitre te propose d’aller plus loin : au lieu de simplement suivre un échauffement proposé par l’enseignant, tu vas apprendre à comprendre pourquoi il est organisé ainsi, à analyser les besoins d’une activité, et à participer, sous supervision, à l’organisation sécurisée d’une séance."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Préparer une activité physique de façon plus réfléchie, comprendre les principes d’un échauffement adapté, analyser les conditions de pratique et participer à l’organisation sécurisée d’une séance sous la responsabilité de l’enseignant. Il s’agit de progresser de « suivre un échauffement » vers « comprendre pourquoi il est organisé ainsi, observer les besoins de l’activité et proposer des choix simples et justifiés »."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "rappeler la fonction générale de l’échauffement, sans refaire la leçon de 7e AF ;",
  "identifier les principes de progressivité, de spécificité, d’adaptation et d’organisation ;",
  "distinguer une partie générale et une préparation plus spécifique à l’activité ;",
  "analyser les exigences simples d’une activité afin d’identifier les mouvements à préparer ;",
  "construire, en petit groupe et sous supervision, une courte proposition d’échauffement cohérente ;",
  "observer un espace de pratique et identifier des risques simples ;",
  "vérifier de façon responsable l’organisation et le matériel avant l’activité ;",
  "comprendre les distances, zones d’attente, sens de circulation et signaux ;",
  "expliquer comment la coopération et la communication contribuent à la sécurité ;",
  "reconnaître une situation nécessitant l’arrêt de l’activité et l’intervention d’un adulte.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Progressivité, spécificité, adaptation, zone d’attente, zone d’action, zone interdite, signal, diagnostic (pédagogique), responsabilité collective.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Au chapitre 2, tu as identifié plusieurs capacités mobilisées selon les situations. Au chapitre 3, tu as appris à observer intensité, respiration, allure et récupération. Réponds à cette question, sans relire les leçons précédentes :"
));
children.push(bodyPar(
  "Pourquoi, selon toi, un même échauffement ne peut-il pas être reproduit mécaniquement avant toutes les activités, qu’il s’agisse d’une course, d’un match de football ou d’un enchaînement de gymnastique ?"
));
children.push(bodyPar(
  "Cette question t’invite à réutiliser tes acquis (capacités mobilisées, intensité, allure) pour construire un raisonnement nouveau, propre à la 8e AF : celui de l’analyse et de la justification, plutôt que de la simple mémorisation."
));
children.push(spacer(160));

// ================= 4.1 =================
children.push(sectionHeading("Préparer son corps et son attention", "4.1"));
children.push(bodyPar(
  "La préparation à l’effort est une transition progressive vers l’activité principale. Elle concerne non seulement les mouvements du corps, mais aussi l’attention (être concentré sur ce qui va suivre), l’organisation (savoir où et comment se placer) et la compréhension des consignes données par l’enseignant."
));
children.push(bodyPar(
  "Un échauffement bien conduit réduit certains risques, mais il ne garantit jamais l’absence totale de blessure : il reste indispensable de respecter aussi toutes les autres règles de sécurité présentées dans ce chapitre."
));
children.push(spacer(160));

// ================= 4.2 =================
children.push(sectionHeading("Les principes d’un échauffement adapté", "4.2"));
children.push(bodyPar("Un échauffement adapté repose sur quatre principes :"));
children.push(bulletMixed([{ text: "Progressivité : ", bold: true }, { text: "l’intensité augmente petit à petit, sans jamais forcer brutalement dès le début." }]));
children.push(bulletMixed([{ text: "Adaptation à l’activité : ", bold: true }, { text: "le contenu de l’échauffement dépend de l’activité principale qui va suivre." }]));
children.push(bulletMixed([{ text: "Organisation : ", bold: true }, { text: "l’espace, le temps et les groupes sont pensés pour que chacun puisse s’échauffer sans gêner les autres." }]));
children.push(bulletMixed([{ text: "Sécurité : ", bold: true }, { text: "le terrain et le matériel sont vérifiés avant de commencer, et les consignes sont respectées." }]));
children.push(bodyPar(
  "Ces principes restent les mêmes, mais leur application change selon l’activité, comme le montre le tableau suivant."
));
children.push(threeColTable(
  ["Activité principale", "Ce qui reste commun", "Ce qui change"],
  [
    ["Course", "Mise en mouvement progressive, mobilisation articulaire", "Accélérations courtes et progressives proches de la course à venir"],
    ["Football / basket-ball", "Mise en mouvement progressive, mobilisation articulaire", "Touches ou dribbles légers avec le ballon"],
    ["Volley-ball", "Mise en mouvement progressive, mobilisation articulaire", "Mobilisation des épaules et des poignets, touches de balle simples"],
    ["Gymnastique", "Mise en mouvement progressive, mobilisation articulaire", "Exercices d’équilibre et de mobilité proches des actions gymniques prévues"],
  ],
  [2800, 3600, 3600],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C04-02",
  "Comparaison de deux échauffements spécifiques",
  "Dessiner deux colonnes côte à côte représentant deux élèves haïtiens de 8e AF réalisant des préparations spécifiques différentes : à gauche, un élève effectuant des touches de ballon légères avant un match de football ; à droite, un élève réalisant un exercice d’équilibre simple avant une séance de gymnastique. Même style visuel des deux côtés pour faciliter la comparaison.",
  "Deux préparations spécifiques différentes, adaptées chacune à leur activité principale.",
  "Illustrer concrètement la notion d’adaptation de l’échauffement à l’activité, en lien avec la section 4.2.",
  "Paysage, format horizontal, deux vignettes côte à côte.",
));
children.push(spacer(200));

// ================= 4.3 =================
children.push(sectionHeading("Partie générale et préparation spécifique", "4.3"));
children.push(bodyPar(
  "Un échauffement complet comprend généralement deux parties. La partie générale correspond à une mise en mouvement progressive du corps entier : marche active, petit trot, mobilisation des principales articulations. La préparation spécifique correspond ensuite à des déplacements, des coordinations ou des gestes simples proches de l’activité qui va suivre."
));
children.push(bodyPar(
  "Plutôt que d’appliquer une recette fixe, il s’agit de justifier tes choix : pourquoi telle mobilisation est-elle utile avant telle activité ? Quel geste spécifique se rapproche le plus de ce que tu vas faire ensuite ?"
));
children.push(spacer(160));

// ================= 4.4 =================
children.push(sectionHeading("Construire une séquence cohérente", "4.4"));
children.push(bodyPar(
  "Pour construire un échauffement cohérent, une logique simple peut être suivie : observer l’activité principale, identifier les besoins qu’elle demande, choisir quelques actions adaptées, organiser leur progression du plus général au plus spécifique, puis vérifier la sécurité de l’ensemble."
));
children.push(bodyPar(
  "Cette logique reprend directement le cycle du manuel : observer → analyser → choisir → agir → ajuster. Par exemple, avant un petit tournoi de basket-ball, un groupe d’élèves observe que l’activité demande des changements de direction et des lancers de ballon ; ils identifient ce besoin, choisissent une mise en mouvement suivie de dribbles légers et de quelques tirs faciles, organisent cette progression, puis vérifient que l’espace et le matériel sont sûrs avant de commencer."
));
children.push(spacer(160));

children.push(calloutBox(
  "Méthode",
  ["Observer → Analyser → Choisir → Agir → Ajuster : utilise ce cycle pour construire toi-même une proposition d’échauffement adaptée à une activité donnée."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C04-01",
  "Schéma : observer l’activité → préparer → pratiquer → récupérer",
  "Réaliser un schéma en quatre étapes reliées par des flèches formant un cycle : 1) un élève qui observe une activité à venir (icône d’observation) ; 2) le même élève qui réalise une préparation adaptée (icône d’échauffement) ; 3) l’élève qui pratique l’activité principale ; 4) l’élève en phase de récupération. Flèche de retour reliant l’étape 4 à l’étape 1 pour symboliser une nouvelle séance.",
  "Le cycle complet d’une séance : observer l’activité, se préparer, pratiquer, puis récupérer.",
  "Offrir une vue d’ensemble du déroulement logique d’une séance avant l’étude détaillée de chaque étape.",
  "Paysage, format horizontal, schéma en boucle.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C04-03",
  "Construction progressive d’un échauffement en quatre étapes",
  "Réaliser une bande de 4 vignettes numérotées montrant la construction progressive d’un échauffement : 1) mise en mouvement générale (marche active) ; 2) mobilisation articulaire ; 3) activation progressive (petits déplacements dynamiques) ; 4) préparation spécifique à l’activité (par exemple dribbles légers). Élève haïtien de 8e AF dans chaque vignette.",
  "Les quatre étapes progressives d’un échauffement bien construit.",
  "Rappeler visuellement la progression déjà étudiée en 7e AF, comme base pour la construction autonome demandée en 8e AF.",
  "Paysage, format horizontal, bande de 4 vignettes.",
));
children.push(spacer(200));

// ================= 4.5 =================
children.push(sectionHeading("Analyser l’espace de pratique", "4.5"));
children.push(bodyPar(
  "Dans les écoles haïtiennes, l’EPS se pratique dans des espaces variés : cour d’école, terrain en terre battue ou espace polyvalent sécurisé. Avant toute activité, il faut observer attentivement cet espace : l’état du sol, la présence de trous, de pierres ou de surfaces glissantes, les obstacles et la proximité de murs ou d’autres structures, les limites de la zone, la circulation possible, et l’espace réellement disponible."
));
children.push(bodyPar(
  "Si les conditions ne sont pas sûres, l’activité doit être adaptée, déplacée ou arrêtée par l’adulte responsable : ce n’est jamais à l’élève seul de décider de continuer une activité dans un espace manifestement dangereux."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C04-04",
  "Grande scène d’une cour d’école haïtienne à analyser",
  "Dessiner une vue d’ensemble large d’une cour d’école haïtienne contenant plusieurs éléments à observer : une portion de sol irrégulier ou une pierre isolée, un mur proche d’une zone d’activité, des limites de terrain tracées à la craie, du matériel rangé sur le côté, plusieurs élèves en attente organisée, et l’enseignant supervisant l’ensemble.",
  "Une cour d’école à analyser : sol, obstacles, limites, matériel, circulation et supervision.",
  "Servir de support visuel principal à l’activité « Notre diagnostic sécurité ».",
  "Paysage, format horizontal, vue d’ensemble large.",
));
children.push(spacer(200));

// ================= 4.6 =================
children.push(sectionHeading("Matériel et installation", "4.6"));
children.push(bodyPar(
  "Le matériel utilisé (ballons, cônes, cordes, filets, repères, matériel gymnique lorsqu’il est présent) doit être analysé avant usage : sa stabilité, son état, son emplacement, et sa compatibilité avec l’activité prévue. Il ne faut jamais utiliser d’objets dangereux comme matériel improvisé, quelle que soit la situation."
));
children.push(spacer(160));

// ================= 4.7 =================
children.push(sectionHeading("Organiser les zones et les déplacements", "4.7"));
children.push(bodyPar(
  "Organiser une activité demande de définir plusieurs zones : une ligne ou zone d’attente, une zone d’action (où se déroule l’activité), une zone de récupération, un sens de circulation clair, et parfois une zone interdite (par exemple devant une zone de lancer)."
));
children.push(bodyPar(
  "Ces zones s’appliquent à de nombreuses situations : course, saut, lancer, parcours moteur, ou activités avec ballon. Une bonne organisation des zones réduit fortement les collisions et les interférences entre élèves ou entre groupes."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C04-06",
  "Zones sécurisées d’une activité",
  "Dessiner un schéma vu du dessus d’une activité scolaire (par exemple un atelier de lancer) avec des zones clairement identifiées et étiquetées : zone d’attente, zone d’action, sens de circulation (flèches), et zone interdite. Utiliser des couleurs ou des types de lignes différents pour chaque zone.",
  "Les différentes zones d’une activité bien organisée : attente, action, circulation, zone interdite.",
  "Aider l’élève à mémoriser visuellement les différentes zones nécessaires à une organisation sécurisée.",
  "Paysage, format horizontal, schéma vu du dessus.",
));
children.push(spacer(200));

// ================= 4.8 =================
children.push(sectionHeading("Communication et signaux", "4.8"));
children.push(bodyPar(
  "Un signal de départ (par exemple un coup de sifflet) indique le moment où une action peut commencer ; un signal d’arrêt indique qu’il faut immédiatement cesser l’activité. Les consignes doivent être données de façon courte et claire, et chaque élève doit les écouter attentivement."
));
children.push(bodyPar(
  "Un élève ne commence jamais une tâche avant le signal prévu, même s’il pense être prêt plus tôt que les autres. Dans les activités de groupe, une communication respectueuse entre élèves (annoncer clairement une action, prévenir un camarade d’un danger) contribue directement à la sécurité de tous."
));
children.push(spacer(160));

// ================= 4.9 =================
children.push(sectionHeading("Prévention et responsabilité collective", "4.9"));
children.push(bodyPar(
  "Chaque élève contribue à la sécurité collective en signalant un danger observé, en respectant le matériel, en attendant son tour, en aidant à maintenir une zone organisée, et en respectant les décisions de sécurité prises par l’enseignant, même lorsqu’elles ne sont pas immédiatement comprises."
));
children.push(bodyPar(
  "La sécurité, la coopération, le fair-play, la responsabilité et la citoyenneté sont étroitement liés : prendre soin des autres et de l’espace commun fait partie des mêmes valeurs, que ce soit sur un terrain de sport ou dans la vie scolaire en général."
));
children.push(spacer(120));

children.push(calloutBox(
  "Citoyen responsable",
  ["Chacun contribue à la sécurité collective : signaler un danger, respecter le matériel et les décisions de l'enseignant sont des gestes de responsabilité, pas seulement des obligations."],
  BOX_CITOYEN_FILL, BOX_CITOYEN_LINE, BOX_CITOYEN_TITLE,
));
children.push(spacer(200));

// ================= 4.10 =================
children.push(sectionHeading("Quand faut-il arrêter ?", "4.10"));
children.push(bodyPar(
  "En cas de douleur, de malaise, de vertiges, de difficulté respiratoire inhabituelle, de chute ou de toute situation dangereuse, il faut toujours arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable."
));
children.push(bodyPar(
  "Il n’est jamais demandé à un élève d’improviser des soins ou des gestes médicaux : signaler un problème est en soi un comportement responsable, et non un signe de faiblesse."
));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  ["Signale immédiatement une situation dangereuse ou un problème inhabituel, que ce soit pour toi-même ou pour un camarade."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(200));

// ================= 4.11 =================
children.push(sectionHeading("Retour au calme et rangement sécurisé", "4.11"));
children.push(bodyPar(
  "Comme tu l’as étudié au chapitre 3, la fin d’une activité comprend une diminution progressive de l’intensité, une phase de récupération et une observation de tes propres sensations. Ce chapitre ajoute un élément d’organisation : le matériel n’est récupéré que selon les consignes de l’enseignant, rangé de façon ordonnée, et l’espace est vérifié une dernière fois avant de quitter les lieux."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C04-08",
  "Fin de séance : récupération et rangement organisé",
  "Dessiner un petit groupe d’élèves haïtiens de 8e AF rangeant ensemble le matériel (ballons, cônes, cordes) à la fin d’une séance, de façon ordonnée, sous la supervision de l’enseignant qui vérifie l’espace une dernière fois.",
  "Un rangement organisé et supervisé à la fin de la séance.",
  "Illustrer concrètement l’organisation de fin de séance décrite à la section 4.11.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Dans de nombreux sports de haut niveau, les entraîneurs et les athlètes passent presque autant de temps à analyser et organiser l’entraînement (terrain, matériel, sécurité) qu’à s’entraîner eux-mêmes : l’organisation fait partie intégrante de la performance et de la sécurité."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

// ---- Activité pratique principale ----
children.push(sectionHeading("Activité pratique principale", ""));
children.push(calloutBox(
  "Concevoir un échauffement adapté",
  [
    "En petits groupes et sous la supervision de l’enseignant, vous recevez une activité cible (par exemple : football, saut en longueur, ou gymnastique).",
    "1) Identifiez les besoins de cette activité (quels mouvements, quelles articulations, quelle coordination sont particulièrement sollicités ?).",
    "2) Proposez une mise en mouvement générale.",
    "3) Proposez quelques mobilisations ou activations adaptées.",
    "4) Proposez une préparation spécifique proche de l’activité cible.",
    "5) Justifiez au moins deux de vos choix, et expliquez une règle de sécurité applicable à votre proposition.",
    "L’enseignant valide, adapte ou refuse votre proposition avant toute réalisation pratique. L’objectif n’est jamais de rechercher une intensité maximale, mais une proposition cohérente et justifiée.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C04-07",
  "Groupe d’élèves préparant une proposition d’échauffement",
  "Dessiner un petit groupe d’élèves haïtiens de 8e AF assis ou debout en cercle, discutant et notant une proposition d’échauffement (par exemple sur une feuille ou une ardoise), sous la supervision visible de l’enseignant qui écoute leur proposition.",
  "Un groupe d’élèves construisant et justifiant une proposition d’échauffement, sous supervision.",
  "Servir de support visuel à l’activité pratique principale « Concevoir un échauffement adapté ».",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- Activité d'analyse de l'espace ----
children.push(sectionHeading("Activité d’analyse de l’espace", ""));
children.push(bodyPar(
  "Le mot « diagnostic » est utilisé ici dans un sens strictement pédagogique : il s’agit d’observer et de décrire une situation, jamais d’un diagnostic médical."
));
children.push(calloutBox(
  "Notre diagnostic sécurité",
  [
    "Dans un espace scolaire réel ou représenté par l’illustration 4.4, observe sans jamais manipuler les dangers, puis complète une grille avec : l’élément observé, le risque éventuel qu’il représente, une proposition d’organisation, et la décision finale de l’enseignant.",
    "Exemples d’éléments à observer : état du sol, obstacles, limites de la zone, matériel présent, circulation entre élèves, zones d’attente, distance entre les groupes.",
    "Pour chaque élément observé, réponds : quel est le risque éventuel ? Que proposerais-tu pour organiser l’espace de façon plus sûre ? Que déciderait finalement l’enseignant, selon toi ?",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));
children.push(threeColTable(
  ["Élément observé", "Risque éventuel", "Proposition d’organisation"],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 3200, 3200],
));
children.push(spacer(200));

// ---- Activité de résolution de problème ----
children.push(sectionHeading("Activité de résolution de problème", ""));
children.push(bodyPar(
  "Voici la description d’une séance fictive mal organisée. Analyse-la avec ton groupe."
));
children.push(calloutBox(
  "Une séance à corriger",
  [
    "Un enseignant remplaçant organise une activité de course dans la cour de l’école. Voici ce qui se passe : le matériel (cônes, ballons) est laissé au milieu de la zone où les élèves doivent courir ; certains élèves traversent la zone d’action pour rejoindre leurs amis pendant qu’un groupe court encore ; le signal de départ donné par l’enseignant n’a pas été bien compris par tous les élèves, et deux groupes s’élancent à des moments différents ; enfin, deux groupes s’entraînent presque au même endroit, à une distance insuffisante l’un de l’autre.",
    "1) Repère tous les problèmes présents dans cette description.",
    "2) Classe-les selon leur type (organisation de l’espace, matériel, communication, distances entre groupes).",
    "3) Propose une nouvelle organisation de la séance, en justifiant chacune de tes corrections.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C04-05",
  "Bonne organisation / organisation à corriger",
  "Dessiner une image en deux parties, côte à côte. À gauche : une activité de course bien organisée, avec zones claires, matériel rangé sur le côté, groupes bien espacés. À droite, dans un espace similaire : les problèmes décrits dans l’activité de résolution de problème (matériel au milieu de la zone, élève traversant pendant la course, groupes trop proches). Style clair, sans scène dangereuse ou blessure représentée.",
  "À gauche, une activité bien organisée ; à droite, plusieurs problèmes d’organisation à corriger.",
  "Servir de support visuel à l’activité de résolution de problème « Une séance à corriger ».",
  "Paysage, format horizontal, image divisée en deux parties.",
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta compréhension de ce chapitre. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à te comparer aux autres élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je peux expliquer la progressivité", "", ""],
    ["Je sais distinguer général / spécifique", "", ""],
    ["Je peux identifier un danger", "", ""],
    ["Je respecte les zones et les signaux", "", ""],
    ["Je peux justifier un choix", "", ""],
    ["Je sais quand arrêter et prévenir l’enseignant", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "La préparation à l’effort concerne le corps, l’attention, l’organisation et la compréhension des consignes.",
  "Un échauffement adapté repose sur quatre principes : progressivité, adaptation à l’activité, organisation et sécurité.",
  "Une partie générale (mise en mouvement du corps entier) précède une préparation spécifique, proche de l’activité principale.",
  "Construire une séquence cohérente suit une logique : observer, identifier les besoins, choisir, organiser, vérifier la sécurité.",
  "Analyser l’espace de pratique (sol, obstacles, limites, circulation) est indispensable avant toute activité.",
  "Le matériel doit être vérifié : stabilité, état, emplacement, compatibilité avec l’activité.",
  "Organiser les zones (attente, action, récupération, circulation, zone interdite) réduit les collisions.",
  "Les signaux et une communication respectueuse contribuent directement à la sécurité collective.",
  "Chaque élève contribue à la sécurité collective : signaler un danger, respecter le matériel et les décisions de l’enseignant.",
  "En cas de problème inhabituel, il faut toujours arrêter l’activité et prévenir immédiatement un adulte responsable.",
  "La fin de séance comprend récupération, rangement organisé et vérification finale de l’espace.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Contrairement à la 7e AF, où tu apprenais surtout à suivre un échauffement, la 8e AF te demande désormais d’analyser une situation, de construire une proposition et de justifier tes choix."
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(4));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(progressivité - spécifique - sécurité - signal - matériel - zone - récupération - organisation)", italics: true, color: "555555" },
]));
[
  "1. L’intensité d’un échauffement doit augmenter petit à petit : c’est le principe de ____________________.",
  "2. Une préparation ____________________ se rapproche des gestes de l’activité principale à venir.",
  "3. Vérifier le sol, les obstacles et le matériel avant une activité est une question de ____________________.",
  "4. Un élève ne commence jamais une tâche avant d’avoir reçu le ____________________ prévu.",
  "5. Les ballons, cônes et cordes utilisés pendant une séance constituent le ____________________.",
  "6. Une ligne d’attente, une zone d’action et une zone interdite sont des exemples de ____________________ à respecter.",
  "7. Après l’effort, le retour progressif au calme fait partie de la ____________________.",
  "8. Définir les zones, les groupes et les temps avant une activité relève de l’____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Pourquoi un même échauffement ne peut-il pas être reproduit mécaniquement avant toutes les activités ?", opts: ["a) parce que l’échauffement est inutile de toute façon", "b) parce que chaque activité a des exigences différentes qui demandent une préparation adaptée", "c) parce que la progressivité n’est jamais nécessaire", "d) parce qu’il faut toujours faire le même échauffement, quelle que soit l’activité"] },
  { q: "2. Que comprend la partie générale d’un échauffement ?", opts: ["a) uniquement des gestes très proches de l’activité principale", "b) une mise en mouvement progressive et une mobilisation articulaire du corps entier", "c) uniquement des étirements très intenses", "d) aucun mouvement, seulement de l’observation"] },
  { q: "3. Que doit faire un élève qui observe un danger sur le terrain avant une activité ?", opts: ["a) ne rien dire et commencer l’activité normalement", "b) essayer de résoudre le problème lui-même sans en parler", "c) signaler immédiatement le danger à l’enseignant", "d) attendre qu’un camarade se blesse pour réagir"] },
  { q: "4. Dans l’activité « Notre diagnostic sécurité », que signifie le mot « diagnostic » ?", opts: ["a) un diagnostic médical réalisé par les élèves", "b) une observation et une description pédagogique d’une situation", "c) un test physique chronométré", "d) une décision finale prise uniquement par les élèves"] },
  { q: "5. Que doit faire l’enseignant face à une proposition d’échauffement construite par un groupe d’élèves ?", opts: ["a) la laisser être réalisée sans jamais la regarder", "b) la valider, l’adapter ou la refuser avant toute réalisation pratique", "c) l’ignorer complètement", "d) demander aux élèves de rechercher l’intensité maximale"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition ou sa fonction correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Progressivité", "a) Endroit où les élèves attendent leur tour avant une activité"],
  ["2. Zone d’attente", "b) Geste ou consigne qui indique le début ou la fin d’une action"],
  ["3. Signal", "c) Augmentation graduelle de l’intensité, sans forcer brutalement"],
  ["4. Zone interdite", "d) Fait de contribuer à la sécurité de tous en signalant un danger"],
  ["5. Responsabilité collective", "e) Espace où personne ne doit se trouver pendant une action précise"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un groupe d’élèves propose un échauffement identique avant une course de vitesse et avant une séance de gymnastique. Explique pourquoi cette proposition n’est pas adaptée, et propose une correction justifiée.",
  "2. Pendant une observation de l’espace, tu remarques une pierre isolée au milieu d’une zone de course. Explique ce que tu devrais faire, et pourquoi la décision finale revient à l’adulte responsable.",
  "3. Dans une activité de lancer, un élève traverse la zone interdite pour récupérer un objet avant le signal de l’enseignant. Analyse les risques de ce comportement et propose une correction.",
  "4. Un élève signale une douleur inhabituelle à l’enseignant pendant une activité, puis un camarade se moque de lui en disant qu’il exagère. Explique pourquoi signaler un problème est un comportement responsable, et non un signe de faiblesse.",
  "5. En t’appuyant sur le cycle observer-analyser-choisir-agir-ajuster, explique comment tu procéderais pour organiser les zones d’un atelier de saut en longueur dans ta cour d’école.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 37, "Manuel_EPS_8AF_Chapitre4.docx");
console.log("Chapitre 4 (8e AF) genere:", outPath);
