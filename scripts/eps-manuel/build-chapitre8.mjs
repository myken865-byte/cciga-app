import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(8, "Volley-ball : techniques de base, règles et coopération"));

children.push(
  calloutBox(
    "Situation de départ",
    [
      "Le professeur tend une corde entre deux poteaux, à hauteur des épaules des élèves, et annonce : « Aujourd'hui, on ne se dispute plus le ballon : on apprend à se le faire passer par-dessus le filet. » Rosemond, qui n'a jamais joué au volley-ball, se demande comment on peut envoyer un ballon sans jamais le tenir dans les mains.",
      "Ce chapitre va t'apprendre à te déplacer vers le ballon, à le contrôler à la manchette, à réaliser une passe haute, à effectuer un service simple, et surtout à construire un échange avec tes partenaires.",
    ],
    "F0F0F0", "1F4E5F", NAVY,
  ),
  spacer(240),
);

children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "expliquer simplement le but du volley-ball et identifier le terrain, le filet, le ballon et les principales zones utiles ;",
  "adopter une position d’attente équilibrée et te déplacer pour te placer sous ou derrière la trajectoire du ballon ;",
  "découvrir la manchette et la passe haute à un niveau introductif, avec des exercices progressifs ;",
  "réaliser un envoi simple du ballon vers un partenaire ou au-dessus d’un filet adapté ;",
  "découvrir un service scolaire simple adapté aux débutants, sans exiger puissance ni technique avancée ;",
  "comprendre le principe des trois touches comme repère de jeu collectif ;",
  "participer à des mini-jeux, communiquer avec tes partenaires et respecter les règles de sécurité.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Mots-clés"));
children.push(mixedPar([
  { text: "Volley-ball, filet, trajectoire, manchette, passe haute, service, échange, coopération, sécurité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ================= 8.1 =================
children.push(sectionHeading("Découvrir le volley-ball", "8.1"));
children.push(bodyPar(
  "Le volley-ball est un sport collectif dans lequel deux équipes, séparées par un filet, cherchent à envoyer le ballon dans l’espace adverse, tout en empêchant qu’il tombe dans leur propre espace."
));
children.push(bodyPar(
  "Contrairement au football ou au basket-ball, les deux équipes ne se disputent jamais directement le ballon : chacune joue dans son propre espace, ce qui rend la coopération entre partenaires particulièrement importante."
));
children.push(spacer(160));

// ================= 8.2 =================
children.push(sectionHeading("Terrain, filet et matériel", "8.2"));
children.push(bodyPar("Un terrain de volley-ball comporte plusieurs éléments essentiels à connaître :"));
children.push(threeColTable(
  ["Élément", "Description simple", "Utilité pour l’élève"],
  [
    ["Lignes du terrain", "Lignes qui délimitent l’espace de jeu de chaque équipe.", "Savoir quand le ballon sort du jeu."],
    ["Filet", "Sépare le terrain en deux espaces égaux, un par équipe.", "Cible que le ballon doit franchir pour passer chez l’adversaire."],
    ["Ligne médiane", "Ligne au sol, sous le filet, séparant les deux espaces.", "Repère de séparation entre les deux équipes."],
    ["Ballon", "Ballon léger adapté au volley-ball scolaire.", "Objet central du jeu, à envoyer par-dessus le filet."],
  ],
  [2400, 4200, 2600],
));
children.push(spacer(160));
children.push(bodyPar(
  "La hauteur du filet, les dimensions du terrain et le type de ballon peuvent être adaptés pour l’apprentissage scolaire. Dans les écoles disposant de peu de matériel, seules des adaptations sûres, décidées et vérifiées par l’enseignant, sont autorisées (par exemple une corde tendue à la place d’un filet officiel) : il ne faut jamais utiliser une structure instable ou dangereuse."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C08-01",
  "Terrain de volley-ball",
  "Dessiner un schéma vu du dessus d’un terrain de volley-ball simplifié, avec des étiquettes claires pour : les lignes du terrain, le filet, la ligne médiane, et les deux espaces de jeu (un par équipe). Traits nets, couleurs sobres, sans détails inutiles.",
  "Les principaux éléments d’un terrain de volley-ball scolaire : filet, lignes et deux espaces de jeu.",
  "Aider l’élève à identifier et nommer les éléments essentiels du terrain avant de commencer à jouer.",
));
children.push(spacer(200));

// ================= 8.3 =================
children.push(sectionHeading("Position d’attente et déplacements", "8.3"));
children.push(bodyPar(
  "Avant qu’un ballon n’arrive, il est important d’adopter une position d’attente équilibrée : les appuis stables et légèrement écartés, les genoux légèrement fléchis, l’attention orientée vers le ballon, et le corps prêt à se déplacer à tout moment."
));
children.push(bodyPar(
  "À partir de cette position, il faut pouvoir réaliser de petits déplacements vers l’avant, vers l’arrière et sur les côtés, dans un espace sécurisé. Ce qui compte le plus n’est pas la rapidité du déplacement, mais un bon placement par rapport à la trajectoire du ballon, plutôt que des mouvements rapides et désordonnés."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C08-02",
  "Position d’attente",
  "Dessiner un élève haïtien de 7e AF en position d’attente de volley-ball : appuis stables et légèrement écartés, genoux légèrement fléchis, bras légèrement devant le corps, regard attentif vers l’espace de jeu. Environnement scolaire haïtien simple (cour ou terrain polyvalent avec filet ou corde tendue).",
  "Une position d’attente équilibrée, prête à se déplacer vers le ballon.",
  "Montrer clairement la posture de référence que l’élève doit adopter avant chaque échange.",
));
children.push(spacer(200));

// ================= 8.4 =================
children.push(sectionHeading("Manipulation et trajectoire du ballon", "8.4"));
children.push(bodyPar(
  "Avant d’apprendre des gestes spécifiques comme la manchette ou la passe haute, il est utile de s’exercer à lancer, rattraper et suivre la trajectoire du ballon avec des exercices simples."
));
children.push(bodyPar(
  "Ces exercices permettent d’observer la hauteur, la direction et la distance de la trajectoire d’un ballon qui arrive, une compétence essentielle avant de tenter de le contrôler. Les exercices doivent être adaptés aux capacités de chaque élève, afin de construire progressivement la confiance et la coordination œil-main."
));
children.push(spacer(160));

// ================= 8.5 =================
children.push(sectionHeading("La manchette", "8.5"));
children.push(bodyPar(
  "La manchette est une technique qui permet de contrôler ou de renvoyer certains ballons bas, en utilisant les avant-bras plutôt que les mains."
));
children.push(bodyPar(
  "Quelques repères simples suffisent pour commencer : orienter le corps vers la direction souhaitée, unir les avant-bras devant soi, garder des appuis stables, et accompagner le geste de façon contrôlée, sans mouvement brusque. Il n’est pas nécessaire de surcharger l’élève de détails biomécaniques ; l’enseignant corrige seulement les positions manifestement dangereuses."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C08-03",
  "La manchette",
  "Dessiner une séquence de 2 vignettes montrant un élève haïtien réalisant une manchette : vignette 1, position d’attente avec avant-bras unis devant le corps, ballon arrivant en trajectoire basse ; vignette 2, contact du ballon avec les avant-bras, geste accompagné vers la cible. Mouvement anatomiquement cohérent, sans exagération.",
  "La manchette : avant-bras unis, appuis stables, geste accompagné vers la cible.",
  "Illustrer une technique de manchette simple et sécuritaire, adaptée à un débutant de 7e AF.",
));
children.push(spacer(200));

// ================= 8.6 =================
children.push(sectionHeading("La passe haute", "8.6"));
children.push(bodyPar(
  "La passe haute se joue avec les mains, au-dessus du visage, pour renvoyer un ballon qui arrive plus haut. Elle se présente ici de manière introductive : se placer sous le ballon, préparer les mains au-dessus du visage (doigts écartés, souples), réaliser une action souple des bras et des jambes, puis orienter le geste vers la cible."
));
children.push(bodyPar(
  "Cette technique s’apprend d’abord dans des situations individuelles simples (par exemple se renvoyer le ballon à soi-même), puis dans des échanges en binômes. Une technique parfaite n’est jamais exigée dès la première séance."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C08-04",
  "La passe haute",
  "Dessiner un élève haïtien réalisant une passe haute : placé sous le ballon, mains levées au-dessus du visage, doigts écartés et souples, jambes légèrement fléchies, regard vers un partenaire situé face à lui, ballon représenté juste au-dessus des mains.",
  "La passe haute : placement sous le ballon, mains préparées au-dessus du visage, orientation vers un partenaire.",
  "Illustrer la position des mains et le placement du corps nécessaires à une passe haute simple.",
));
children.push(spacer(200));

// ================= 8.7 =================
children.push(sectionHeading("L’envoi et le service scolaire", "8.7"));
children.push(bodyPar(
  "Un envoi simple consiste à faire parvenir le ballon à un partenaire ou par-dessus le filet, sans chercher la puissance. Le service, quant à lui, est le geste qui met le ballon en jeu, généralement depuis une zone derrière le terrain."
));
children.push(bodyPar(
  "Au niveau débutant, un service scolaire simple est privilégié, éventuellement réalisé par-dessous, selon le niveau des élèves et les conditions matérielles. Ce qui est valorisé, c’est la régularité, la direction et le contrôle du geste, bien avant la puissance. Une zone d’attente et des distances adaptées doivent toujours être prévues."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C08-05",
  "Service scolaire",
  "Dessiner un élève haïtien effectuant un service simple par-dessous, depuis une distance adaptée derrière la ligne de fond du terrain : ballon tenu d’une main, l’autre main s’apprêtant à le frapper doucement vers le haut et vers l’avant, en direction du filet. Une zone d’attente avec d’autres élèves est visible à l’écart.",
  "Un service scolaire simple, réalisé par-dessous, avec régularité et contrôle plutôt que puissance.",
  "Illustrer une technique de service accessible à un débutant, dans un cadre sécurisé.",
));
children.push(spacer(200));

// ================= 8.8 =================
children.push(sectionHeading("Construire un échange", "8.8"));
children.push(bodyPar(
  "Au volley-ball, maintenir le ballon en jeu demande que les partenaires observent la trajectoire, communiquent entre eux (par exemple en annonçant « à moi ! »), et se placent pour permettre l’enchaînement des actions."
));
children.push(bodyPar(
  "Une organisation pédagogique simple peut aider à construire un échange : réception (contrôler le ballon qui arrive), préparation (le remettre en position favorable, souvent avec une passe haute), puis renvoi (l’envoyer vers un partenaire ou par-dessus le filet)."
));
children.push(bodyPar(
  "Le volley-ball officiel limite généralement chaque équipe à trois touches avant de renvoyer le ballon : ce principe des trois touches sert ici de repère pédagogique simple pour organiser le jeu collectif, sans transformer l’activité en règlement technique complexe."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Au volley-ball, se déplacer vers la trajectoire du ballon aide à mieux le contrôler."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C08-06",
  "Construire un échange",
  "Dessiner trois élèves haïtiens coopérant sur le même côté du terrain : le premier réceptionnant un ballon bas à la manchette, le deuxième se préparant à réaliser une passe haute vers le troisième, et le troisième prêt à renvoyer le ballon par-dessus le filet. Flèches légères indiquant le trajet du ballon entre les trois élèves.",
  "Réception, préparation, renvoi : trois élèves qui coopèrent pour construire un échange.",
  "Illustrer concrètement l’organisation réception-préparation-renvoi et la coopération nécessaire pour maintenir le ballon en jeu.",
));
children.push(spacer(200));

// ================= 8.9 =================
children.push(sectionHeading("Principales règles", "8.9"));
children.push(bodyPar(
  "Cette section présente uniquement les règles essentielles utiles à la compréhension scolaire du jeu, et non un règlement officiel complet."
));
[
  "un ballon qui touche le sol à l’intérieur des lignes est « dedans » ; à l’extérieur, il est « dehors » ;",
  "le ballon doit passer au-dessus du filet pour aller chez l’adversaire, sans le toucher de façon excessive ;",
  "chaque équipe dispose d’un nombre limité de touches (trois, à titre de repère) avant de renvoyer le ballon ;",
  "il est interdit de toucher le filet ou les poteaux pendant l’action de jeu ;",
  "une rotation ou un placement simple des joueurs peut être utilisé, uniquement au niveau nécessaire pour les mini-jeux proposés.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Lorsque ces règles sont simplifiées pour faciliter l’apprentissage, il s’agit toujours d’une adaptation pédagogique décidée par l’enseignant, et non des règles officielles complètes du volley-ball."
));
children.push(spacer(160));

// ================= 8.10 =================
children.push(sectionHeading("Coopération, communication et fair-play", "8.10"));
children.push(bodyPar(
  "Le volley-ball demande une coopération constante entre partenaires, puisque le ballon doit circuler efficacement dans le même espace de jeu avant d’être renvoyé."
));
[
  "appeler clairement le ballon lorsqu’on va le jouer (« à moi ! ») pour éviter les collisions ;",
  "encourager ses partenaires, surtout après une erreur ;",
  "partager les responsabilités plutôt que de laisser un seul élève jouer tous les ballons ;",
  "respecter ses partenaires et ses adversaires ;",
  "accepter les décisions de l’enseignant ;",
  "garder la maîtrise de soi, même en cas de frustration.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Une erreur fait naturellement partie de l’apprentissage : elle ne doit jamais servir à humilier un camarade."
));
children.push(spacer(120));

children.push(calloutBox(
  "Fair-play",
  ["Encourager un partenaire après une erreur, féliciter un bon échange de l'équipe adverse, ou accepter calmement une décision de l'enseignant sont des marques de fair-play, aussi importantes qu'un échange réussi."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ================= 8.11 =================
children.push(sectionHeading("Sécurité au volley-ball scolaire", "8.11"));
children.push(bodyPar(
  "Avant chaque séance de volley-ball, il faut vérifier le sol, les obstacles éventuels, les poteaux, la fixation du filet (ou de la corde utilisée), l’espace autour du terrain et l’état du ballon."
));
[
  "ne jamais s’accrocher au filet ni aux poteaux ;",
  "éviter de passer sous le filet lorsqu’une action de jeu est en cours ;",
  "organiser les groupes de manière à éviter les collisions et les ballons provenant de plusieurs exercices dans la même zone.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Comme pour toute activité d’EPS, un échauffement progressif doit précéder la pratique. En cas de douleur ou de malaise, il faut arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable."
));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  [
    "Vérifie le sol, la fixation du filet ou de la corde, et l’état du ballon avant de commencer.",
    "Ne t’accroche jamais au filet ni aux poteaux, et ne passe pas sous le filet pendant une action de jeu.",
    "En cas de douleur ou de malaise, arrête l’activité et préviens immédiatement l’enseignant ou un adulte responsable.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Contrairement au football ou au basket-ball, les deux équipes de volley-ball ne se touchent jamais et ne se disputent jamais directement le ballon : elles restent chacune dans leur propre espace, séparées par le filet."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-7AF-C08-07",
  "Observe et analyse",
  "Dessiner une scène de mini-volley scolaire avec plusieurs éléments à observer : un élève qui se déplace clairement vers le ballon en l’annonçant, un partenaire bien placé dans un espace libre, et à l’écart, un élève qui s’appuie sur le poteau du filet (comportement à corriger). Style clair, sans texte dans l’image.",
  "Quels comportements sont corrects ? Lesquels devraient être corrigés ?",
  "Servir de support à une activité d’observation où l’élève distingue les comportements sécuritaires et coopératifs des comportements à corriger.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Je suis la trajectoire",
  [
    "Objectif : apprendre à observer la trajectoire du ballon et à se déplacer pour se placer correctement.",
    "Organisation : élèves par deux, à quelques mètres l’un de l’autre, dans un espace sécurisé.",
    "Matériel : un ballon léger par binôme.",
    "Consignes : lancer le ballon à son partenaire de différentes façons (plus haut, plus bas, sur le côté) ; l’autre élève se déplace pour se placer sous la trajectoire avant de le rattraper.",
    "Sécurité : garder une distance suffisante entre les binômes pour éviter les collisions.",
    "Critère de réussite : se déplacer et se placer correctement sous la trajectoire avant de rattraper le ballon.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Manchette avec mon partenaire",
  [
    "Objectif : s’exercer à la manchette, en échange simple ou avec un ballon lancé par le partenaire selon le niveau.",
    "Organisation : élèves par deux, face à face, à une distance adaptée.",
    "Matériel : un ballon léger par binôme.",
    "Consignes : un partenaire lance le ballon en trajectoire basse ; l’autre élève le contrôle à la manchette et le renvoie, ou le rattrape simplement selon son niveau.",
    "Sécurité : rester attentif à la trajectoire pour éviter d’être touché sans préparation.",
    "Critère de réussite : contrôler plusieurs ballons de suite à la manchette, ou progresser dans la tentative.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Passe et communique",
  [
    "Objectif : s’exercer à la passe haute (ou à une adaptation pédagogique) en communiquant avec ses partenaires.",
    "Organisation : binômes ou petits groupes de 3, en cercle ou face à face.",
    "Matériel : un ballon léger par groupe.",
    "Consignes : annoncer clairement « à moi ! » avant de jouer le ballon, réaliser une passe haute (ou l’adaptation proposée par l’enseignant) vers un partenaire.",
    "Sécurité : ne jouer que le ballon annoncé, pour éviter les collisions entre élèves.",
    "Critère de réussite : enchaîner plusieurs passes réussies avec communication claire entre partenaires.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Par-dessus le filet",
  [
    "Objectif : réaliser des envois contrôlés au-dessus d’un filet (ou d’une corde) adapté.",
    "Organisation : élèves répartis de chaque côté du filet, par petits groupes.",
    "Matériel : un filet ou une corde tendue de façon sûre, un ballon léger.",
    "Consignes : envoyer le ballon par-dessus le filet vers l’espace adverse, en recherchant la régularité plutôt que la puissance.",
    "Sécurité : ne jamais s’accrocher au filet ni aux poteaux ; ne pas passer sous le filet pendant l’action.",
    "Critère de réussite : envoyer le ballon par-dessus le filet dans l’espace adverse, de façon régulière.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Mini-volley coopératif",
  [
    "Objectif : appliquer position d’attente, manchette, passe haute et service dans un petit jeu collectif.",
    "Organisation : petits effectifs (par exemple 3 contre 3), terrain réduit, filet ou corde adapté.",
    "Matériel : un ballon léger, filet ou corde, repères pour délimiter le terrain.",
    "Consignes : règles simplifiées favorisant plusieurs contacts avant le renvoi (par exemple exiger au moins deux touches) pour que tous les élèves participent.",
    "Sécurité : respecter les limites du terrain, ne jamais toucher le filet ou les poteaux.",
    "Critère de réussite : chaque élève de l’équipe touche le ballon au moins une fois pendant le jeu.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation ----
children.push(sectionHeading("Activité d’observation", ""));
children.push(calloutBox(
  "Observe notre échange",
  [
    "Pendant une phase de mini-volley coopératif (la tienne ou celle d’un autre groupe), observe le jeu avec un camarade et identifie :",
    "1) qui se déplace vers le ballon ;",
    "2) qui communique (par exemple en annonçant « à moi ! ») ;",
    "3) où se trouve l’espace libre dans le camp adverse ;",
    "4) quel geste (manchette, passe haute, service) est adapté à la situation observée ;",
    "5) un éventuel comportement qui devrait être corrigé.",
    "Partage ensuite tes observations avec ton groupe, sous la conduite de l’enseignant.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(240));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le volley-ball est un sport collectif séparé par un filet, où chaque équipe joue dans son propre espace sans se disputer le ballon.",
  "Le terrain comprend des lignes, un filet, une ligne médiane et deux espaces de jeu.",
  "La position d’attente équilibrée et le placement par rapport à la trajectoire précèdent tout geste technique.",
  "La manchette permet de contrôler des ballons bas avec les avant-bras.",
  "La passe haute se joue avec les mains, au-dessus du visage, pour renvoyer un ballon plus haut.",
  "L’envoi et le service scolaire valorisent régularité et contrôle avant puissance.",
  "Construire un échange demande observation, communication et l’organisation réception-préparation-renvoi.",
  "Les règles présentées sont volontairement simplifiées pour l’apprentissage scolaire.",
  "La communication, la coopération et le fair-play sont aussi importants que la technique.",
  "La sécurité (filet, poteaux, sol, organisation des groupes) doit toujours être respectée.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(8));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(filet - manchette - trajectoire - passe - service - équipe - sécurité - coopération)", italics: true, color: "555555" },
]));
[
  "1. Au volley-ball, le ballon doit passer au-dessus du ____________________ pour aller chez l’adversaire.",
  "2. Observer la hauteur, la direction et la distance d’un ballon qui arrive, c’est suivre sa ____________________.",
  "3. Contrôler un ballon bas avec les avant-bras s’appelle la ____________________.",
  "4. Renvoyer le ballon avec les mains, au-dessus du visage, s’appelle une ____________________ haute.",
  "5. Le geste qui met le ballon en jeu depuis l’arrière du terrain s’appelle le ____________________.",
  "6. Chaque ____________________ joue dans son propre espace, séparée de l’autre par le filet.",
  "7. Annoncer clairement « à moi ! » avant de jouer le ballon est une marque de ____________________.",
  "8. Ne jamais s’accrocher au filet ni aux poteaux est une règle de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quel est l’objectif principal du volley-ball ?", opts: ["a) se disputer le ballon avec l’équipe adverse", "b) envoyer le ballon dans l’espace adverse sans le laisser tomber dans le sien", "c) courir le plus vite possible sur le terrain", "d) garder le ballon le plus longtemps possible sans le renvoyer"] },
  { q: "2. Quand faut-il utiliser la manchette ?", opts: ["a) pour un ballon qui arrive haut, au niveau du visage", "b) pour contrôler un ballon qui arrive bas", "c) uniquement pour le service", "d) jamais, ce n’est pas une technique de volley-ball"] },
  { q: "3. Que doit rechercher un élève débutant pendant le service ?", opts: ["a) la puissance maximale", "b) la régularité, la direction et le contrôle", "c) le plus grand nombre de services ratés", "d) uniquement la vitesse du geste"] },
  { q: "4. Pourquoi faut-il annoncer clairement « à moi ! » avant de jouer le ballon ?", opts: ["a) pour impressionner l’équipe adverse", "b) pour éviter les collisions et bien communiquer avec ses partenaires", "c) parce que c’est obligatoire dans toutes les activités d’EPS", "d) cela n’a aucune utilité"] },
  { q: "5. Que doit faire un élève qui remarque que le filet ou un poteau semble instable ?", opts: ["a) continuer à jouer sans rien dire", "b) tirer fort sur le filet pour vérifier", "c) le signaler immédiatement à l’enseignant avant de jouer", "d) s’accrocher au poteau pour le stabiliser lui-même"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Manchette", "a) Sépare le terrain en deux espaces, un par équipe"],
  ["2. Passe haute", "b) Chemin suivi par le ballon dans les airs"],
  ["3. Service", "c) Travailler ensemble en communiquant pour maintenir le ballon en jeu"],
  ["4. Filet", "d) Ensemble des règles et comportements qui protègent les élèves pendant l’activité"],
  ["5. Trajectoire", "e) Technique qui contrôle un ballon bas avec les avant-bras"],
  ["6. Coopération", "f) Geste qui envoie le ballon vers un partenaire ou par-dessus le filet"],
  ["7. Sécurité", "g) Geste qui met le ballon en jeu depuis l’arrière du terrain"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Pourquoi est-il important de communiquer avec ses partenaires avant de jouer un ballon au volley-ball ?",
  "2. Que devrais-tu faire si le filet ou un poteau te paraît instable avant une séance de volley-ball ?",
  "3. Pourquoi un élève doit-il se déplacer vers le ballon plutôt que d’attendre immobile qu’il arrive exactement sur lui ?",
  "4. Explique en quoi le principe des trois touches encourage la coopération entre les membres d’une même équipe.",
].forEach(t => children.push(numberedPar(t)));

await buildAndSave(children, 75, "Manuel_EPS_7AF_Chapitre8.docx");
