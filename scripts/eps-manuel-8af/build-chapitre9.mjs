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

children.push(...chapterTitleBlock(9, "Volley-ball : réception, passe, service et construction collective de l’échange"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Aux chapitres 7 et 8, tu as appris les principes communs des sports collectifs et leur application au basket-ball. Ce chapitre applique ces mêmes principes au volley-ball, avec une particularité : les deux équipes ne se disputent jamais directement le ballon, séparées par un filet. Réussir au volley-ball demande donc, plus que jamais, de contrôler le ballon et de coopérer avec ses partenaires pour construire un échange."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Contrôler progressivement le ballon, comprendre la logique de l’échange au volley-ball et coopérer avec ses partenaires pour réceptionner, passer, servir et construire une action collective simple. Ce chapitre développe la lecture de trajectoire, le placement, la communication et la prise de décision, sans rechercher une technicité de compétition."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "comprendre le principe général du volley-ball et l’objectif d’un échange ;",
  "identifier terrain, filet ou séparation adaptée, zones, partenaires et adversaires ;",
  "lire une trajectoire simple et te déplacer pour te placer sous ou derrière le ballon selon la situation ;",
  "réaliser une réception scolaire contrôlée avec une technique adaptée et sûre ;",
  "réaliser une passe haute simple et orientée vers un partenaire ;",
  "effectuer un service scolaire adapté à ton niveau et à tes capacités ;",
  "comprendre l’enchaînement réception → passe → renvoi dans une construction collective simple ;",
  "communiquer avec tes partenaires pour éviter les hésitations et les collisions ;",
  "respecter règles simplifiées, rotation ou organisation décidée par l’enseignant, adversaires et arbitrage ;",
  "observer un échange et proposer un ajustement technique ou collectif.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Trajectoire, réception, manchette, passe haute, service, échange, renvoi, replacement, zone, coopération, fair-play.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Ce chapitre réutilise les principes collectifs (chapitre 7) et la coopération, le démarquage et la prise d’information (chapitre 8). Réponds à cette question avant de commencer :"
));
children.push(bodyPar(
  "Pourquoi une équipe qui renvoie immédiatement chaque ballon peut-elle avoir plus de difficulté à construire un échange ?"
));
children.push(bodyPar(
  "Cette question t’invite à réfléchir à ce que tu as déjà appris : le contrôle, le placement, la communication et la coopération permettent souvent de mieux construire une action que la précipitation."
));
children.push(spacer(160));

// ================= 9.1 =================
children.push(sectionHeading("Comprendre le volley-ball scolaire", "9.1"));
children.push(bodyPar(
  "Le volley-ball est un sport collectif dans lequel deux équipes, séparées par un filet, cherchent à envoyer le ballon dans l’espace adverse tout en empêchant qu’il tombe dans leur propre espace. Le jeu se construit autour de quelques actions clés : le service (qui met le ballon en jeu), la réception (le premier contact avec le ballon adverse), la passe (qui prépare le renvoi), et le renvoi (qui envoie le ballon vers l’adversaire)."
));
children.push(bodyPar(
  "Ce chapitre distingue toujours les règles essentielles du jeu des adaptations pédagogiques choisies par l’enseignant (hauteur du filet, taille du terrain, nombre de contacts autorisés), sans reproduire une longue liste de règles officielles de compétition."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-01",
  "Terrain scolaire simplifié",
  "Dessiner un schéma vu du dessus d’un terrain de volley-ball scolaire simplifié, avec le filet ou une séparation pédagogique, des zones identifiées, des partenaires (une couleur) et des adversaires (une autre couleur) de chaque côté.",
  "Les éléments d’un terrain de volley-ball scolaire : zones, filet ou séparation, partenaires et adversaires.",
  "Donner à l’élève une vue d’ensemble du terrain avant l’étude détaillée des principes de jeu.",
  "Paysage, format horizontal, schéma vu du dessus.",
));
children.push(spacer(200));

// ================= 9.2 =================
children.push(sectionHeading("Lire la trajectoire du ballon", "9.2"));
children.push(bodyPar(
  "Observer la direction, la hauteur et la vitesse apparente du ballon permet de se déplacer tôt, avant même que le ballon n’arrive. Il est souvent plus efficace de se placer par anticipation que d’attendre immobile que le ballon arrive exactement sur soi."
));
children.push(bodyPar(
  "Cette lecture de trajectoire s’apprend progressivement, à travers des situations simples où l’on observe d’abord des trajectoires faciles et prévisibles avant de complexifier la tâche."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-02",
  "Lecture de trajectoire et déplacement",
  "Dessiner un élève haïtien de 8e AF observant un ballon en approche (trajectoire représentée par une ligne pointillée), se déplaçant latéralement pour se placer sous le ballon avant son arrivée.",
  "Lire la trajectoire du ballon permet de se déplacer par anticipation plutôt que d’attendre immobile.",
  "Illustrer l’importance d’observer tôt la trajectoire pour bien se placer, en lien avec l’Activité 1.",
  "Paysage, format horizontal, plan moyen avec trajectoire visible.",
));
children.push(spacer(200));

// ================= 9.3 =================
children.push(sectionHeading("Position d’attente et déplacement", "9.3"));
children.push(bodyPar(
  "Une position équilibrée (appuis stables, genoux légèrement fléchis, attention portée sur le ballon et l’espace de jeu) prépare le déplacement à tout moment. À partir de cette position, de petits déplacements avant, arrière et latéraux, sans mouvements brusques inutiles, permettent de se placer efficacement."
));
children.push(spacer(160));

// ================= 9.4 =================
children.push(sectionHeading("La réception", "9.4"));
children.push(bodyPar(
  "La réception basse scolaire (souvent appelée manchette) se construit progressivement : un bon placement du corps, une surface de contact adaptée (les avant-bras réunis), une orientation claire, et un contrôle du geste, sans mouvement brusque."
));
children.push(bodyPar(
  "Cette technique commence toujours avec des ballons et des trajectoires faciles, avant de proposer des situations plus complexes. L’objectif initial n’est jamais la puissance : c’est de contrôler et d’orienter le ballon vers un partenaire ou une zone précise."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-03",
  "Réception basse scolaire",
  "Dessiner un élève haïtien de 8e AF réalisant une réception basse (manchette) : avant-bras réunis devant le corps, appuis stables, geste orienté vers une cible (un partenaire ou une zone), ballon arrivant en trajectoire basse.",
  "Une réception basse contrôlée : avant-bras réunis, appuis stables, orientation vers une cible.",
  "Illustrer une technique de réception simple et sécuritaire, adaptée au niveau 8e AF.",
  "Portrait, format vertical, plan moyen sur le geste.",
));
children.push(spacer(200));

// ================= 9.5 =================
children.push(sectionHeading("La passe haute", "9.5"));
children.push(bodyPar(
  "La passe haute se réalise avec les mains, au-dessus du visage : se placer sous le ballon, préparer les mains, réaliser un contact contrôlé, et orienter le geste vers la cible visée (un partenaire, par exemple)."
));
children.push(bodyPar(
  "Ce chapitre ne recherche jamais la puissance ou une hauteur excessive : la technique s’apprend d’abord dans des échanges à courte distance, avant d’être utilisée dans des situations collectives plus complexes."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-04",
  "Passe haute",
  "Dessiner un élève haïtien de 8e AF réalisant une passe haute : placé sous le ballon, mains levées au-dessus du visage, doigts écartés et souples, regard et geste orientés vers un partenaire face à lui.",
  "La passe haute : placement sous le ballon, mains préparées, orientation vers un partenaire.",
  "Illustrer la position des mains et le placement du corps nécessaires à une passe haute simple.",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ================= 9.6 =================
children.push(sectionHeading("Le service adapté", "9.6"));
children.push(bodyPar(
  "Le service est le geste qui met le ballon en jeu. Ce chapitre privilégie un service scolaire simple et contrôlé, notamment par-dessous, lorsque cela convient au niveau de l’élève. La distance au filet ou à la zone cible est toujours adaptée aux capacités réelles des élèves."
));
children.push(bodyPar(
  "Ce chapitre n’impose jamais un service puissant ou techniquement avancé : la régularité et le contrôle du geste sont valorisés avant tout."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-05",
  "Service par-dessous adapté",
  "Dessiner un élève haïtien de 8e AF effectuant un service par-dessous depuis une distance adaptée : ballon tenu d’une main, l’autre main s’apprêtant à le frapper doucement vers le haut et vers l’avant, avec une zone cible visible de l’autre côté du filet ou de la séparation.",
  "Un service par-dessous adapté, avec une zone cible clairement visible.",
  "Illustrer une technique de service accessible, en lien avec l’Activité 4.",
  "Portrait, format vertical, plan moyen sur le geste.",
));
children.push(spacer(200));

// ================= 9.7 =================
children.push(sectionHeading("Réception → passe → renvoi", "9.7"));
children.push(bodyPar(
  "Ce chapitre construit progressivement la logique collective en trois actions : réception, passe, renvoi. Il n’est pas exigé systématiquement de réaliser trois contacts lorsque le niveau des élèves ne le permet pas encore : un premier contact contrôlé peut déjà faciliter un second, puis le renvoi."
));
children.push(bodyPar(
  "Ce chapitre valorise la construction de l’échange, c’est-à-dire la capacité à garder le ballon en jeu de façon organisée, plutôt que la recherche d’un point gagné immédiatement."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Pour construire un échange, il faut observer, se placer, contrôler le ballon, coopérer et se replacer."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-06",
  "Séquence collective : réception → passe → renvoi",
  "Dessiner trois élèves haïtiens de 8e AF coopérant sur le même côté du terrain : le premier réceptionnant un ballon bas, le deuxième réalisant une passe haute vers le troisième, et le troisième renvoyant le ballon par-dessus le filet. Flèches légères indiquant le trajet du ballon entre les trois élèves.",
  "Réception, passe, renvoi : trois élèves qui coopèrent pour construire un échange.",
  "Illustrer concrètement l’enchaînement des trois actions et la coopération nécessaire, en lien avec l’Activité 5.",
  "Paysage, format horizontal, trois élèves alignés avec flèches.",
));
children.push(spacer(200));

// ================= 9.8 =================
children.push(sectionHeading("Occupation de l’espace", "9.8"));
children.push(bodyPar(
  "Il est important d’observer les zones libres et d’éviter que tous les joueurs se regroupent sous le même ballon, ce qui laisse le reste du terrain vide et complique le jeu de l’équipe."
));
children.push(bodyPar(
  "Une répartition simple de l’espace, avec un replacement après chaque action, aide l’équipe à couvrir davantage de terrain. Le nombre de joueurs est toujours adapté à la taille réelle du terrain scolaire disponible."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-07",
  "Comparaison : joueurs regroupés / meilleure répartition",
  "Dessiner deux schémas vus du dessus, côte à côte, d’un même terrain de volley-ball scolaire : à gauche, tous les partenaires regroupés sous le même ballon, laissant le reste du terrain vide ; à droite, les mêmes partenaires répartis dans l’espace, couvrant mieux le terrain.",
  "Comparaison entre des joueurs regroupés sous le ballon et une meilleure répartition de l’espace.",
  "Illustrer concrètement pourquoi une bonne répartition de l’espace facilite le jeu collectif.",
  "Paysage, format horizontal, deux schémas côte à côte.",
));
children.push(spacer(200));

// ================= 9.9 =================
children.push(sectionHeading("Communication", "9.9"));
children.push(bodyPar(
  "Des appels courts et respectueux (par exemple « à moi ! ») permettent d’annoncer clairement qui va prendre le ballon, et aident à coordonner toute l’équipe. La communication réduit fortement les hésitations et certaines collisions entre partenaires."
));
children.push(bodyPar(
  "Les cris agressifs, les moqueries et les reproches humiliants envers un partenaire sont strictement interdits, quelle que soit la situation de jeu."
));
children.push(spacer(160));

// ================= 9.10 =================
children.push(sectionHeading("Construire un échange collectif", "9.10"));
children.push(bodyPar(
  "La construction d’un échange collectif suit une logique en plusieurs temps : observer la situation, se placer, contrôler le ballon reçu, orienter le geste vers un partenaire, apporter du soutien aux autres joueurs, renvoyer le ballon, puis se replacer pour l’action suivante."
));
children.push(bodyPar(
  "Une action collective contrôlée, même plus lente, est souvent plus efficace qu’un renvoi précipité qui perd rapidement le ballon : c’est tout l’enjeu de la construction de l’échange étudiée dans ce chapitre."
));
children.push(spacer(120));

children.push(calloutBox(
  "Méthode",
  ["Observer → Se placer → Agir → Communiquer → Se replacer → Ajuster : ce cycle t’aide à mieux construire un échange de volley-ball, à chaque instant du jeu."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ================= 9.11 =================
children.push(sectionHeading("Défense et replacement", "9.11"));
children.push(bodyPar(
  "Se préparer à recevoir le ballon adverse demande de l’attention, une bonne répartition de l’espace entre partenaires, un déplacement adapté, et de la communication. Ce chapitre n’introduit aucun système défensif complexe : il s’agit simplement d’être prêt et bien placé."
));
children.push(bodyPar(
  "Chaque joueur doit se replacer après son action, pour être de nouveau prêt à intervenir lors de l’échange suivant."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C09-08",
  "Communication et replacement",
  "Dessiner deux élèves haïtiens de 8e AF pendant un échange : l’un annonçant clairement sa prise du ballon (bulle ou geste indiquant « à moi »), l’autre se replaçant vers un espace libre du terrain juste après avoir joué son ballon.",
  "La communication et le replacement, deux gestes essentiels pendant un échange de volley-ball.",
  "Illustrer concrètement la communication entre partenaires et l’importance du replacement, en lien avec les sections 9.9 et 9.11.",
  "Paysage, format horizontal, deux élèves avec indications visuelles.",
));
children.push(spacer(200));

// ================= 9.12 =================
children.push(sectionHeading("Arbitrage, règles et fair-play", "9.12"));
children.push(bodyPar(
  "Quelques décisions simples (par exemple, un ballon qui touche le sol dedans ou dehors) peuvent être confiées à un élève observateur ou arbitre, sous la direction claire de l’enseignant."
));
children.push(bodyPar(
  "Accepter une décision, reconnaître une faute simple sans discuter longuement, et reprendre le jeu calmement font partie des apprentissages de ce chapitre. Le fair-play, l’honnêteté et la responsabilité sont directement liés à la qualité du jeu collectif."
));
children.push(spacer(120));

children.push(calloutBox(
  "Coopération",
  ["Valorise la continuité de l'échange et la participation de tous : un échange qui dure grâce à la coopération de toute l'équipe est une vraie réussite collective."],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Fair-play",
  ["Respecter partenaires, adversaires, arbitre et décisions, même lorsqu'un point est perdu à cause d'une erreur simple."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Sécurité",
  ["Communique avec tes partenaires pour éviter les collisions, et vérifie toujours que le filet, la séparation ou les poteaux sont stables avant de commencer."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Au volley-ball, les deux équipes ne se touchent jamais et ne se disputent jamais directement le ballon : elles restent chacune dans leur propre espace, séparées par le filet, ce qui rend la coopération à l'intérieur de chaque équipe encore plus déterminante."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C09-09",
  "Scène réaliste de volley-ball scolaire haïtien",
  "Dessiner une scène d’ensemble d’élèves haïtiens de 8e AF pratiquant le volley-ball dans une cour ou un terrain scolaire sécurisé (avec filet ou séparation pédagogique stable), sous la supervision de l’enseignant depuis un endroit approprié.",
  "Une séance de volley-ball scolaire haïtienne, bien organisée et supervisée.",
  "Montrer que les principes du chapitre s’appliquent dans un contexte scolaire haïtien réaliste, même sans terrain réglementaire.",
  "Paysage, format horizontal, vue d’ensemble large.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Lire et se placer",
  [
    "Objectif : lire une trajectoire simple et se déplacer pour se placer dans une position adaptée.",
    "Organisation : binômes, un élève envoie le ballon avec des trajectoires simples, l’autre se déplace pour se placer.",
    "Matériel : un ballon léger par binôme.",
    "Consignes : envoyer le ballon avec différentes trajectoires (plus haut, plus bas, sur le côté) ; l’autre élève se déplace tôt pour se placer avant l’arrivée du ballon.",
    "Sécurité : garder une distance suffisante entre les binômes.",
    "Critères de réussite : se placer correctement avant l’arrivée du ballon, pour la majorité des trajectoires proposées.",
    "Variantes et adaptations : réduire la variété des trajectoires pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Réception vers une cible",
  [
    "Objectif : réaliser une réception contrôlée orientée vers un partenaire ou une zone.",
    "Organisation : binômes, un élève lance le ballon en trajectoire basse, l’autre réceptionne.",
    "Matériel : un ballon léger par binôme, une zone cible marquée au sol si possible.",
    "Consignes : contrôler la réception et orienter le ballon vers le partenaire ou la zone cible.",
    "Sécurité : rester attentif à la trajectoire pour éviter d’être surpris.",
    "Critères de réussite : réceptionner plusieurs ballons de suite en les orientant correctement.",
    "Variantes et adaptations : rapprocher les binômes ou ralentir les lancers selon le niveau.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Passe et replace-toi",
  [
    "Objectif : réaliser une passe haute simple, puis se replacer vers une position d’appui.",
    "Organisation : binômes ou petits groupes de 3, en cercle ou face à face.",
    "Matériel : un ballon léger par groupe.",
    "Consignes : réaliser une passe haute vers un partenaire, puis se déplacer immédiatement vers une position utile pour la suite de l’échange.",
    "Sécurité : ne jouer que le ballon annoncé, pour éviter les collisions.",
    "Critères de réussite : enchaîner plusieurs passes réussies avec un replacement après chacune.",
    "Variantes et adaptations : réduire la distance entre les élèves pour faciliter le contrôle.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Service vers une zone",
  [
    "Objectif : réaliser un service adapté, en visant d’abord le contrôle et la précision.",
    "Organisation : file d’élèves, chacun servant à tour de rôle vers une zone cible.",
    "Matériel : un ballon léger, une zone cible délimitée de l’autre côté du filet ou de la séparation.",
    "Consignes : réaliser un service par-dessous, contrôlé, en visant la zone cible plutôt que la puissance.",
    "Sécurité : respecter une distance de service adaptée à ton niveau.",
    "Critères de réussite : réaliser un service régulier qui atteint la zone cible ou s’en approche.",
    "Variantes et adaptations : rapprocher la ligne de service pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Construire trois actions",
  [
    "Objectif : rechercher l’enchaînement réception, passe, puis renvoi, lorsque le niveau le permet.",
    "Organisation : petits groupes de 3, sur le même côté du terrain.",
    "Matériel : un ballon léger par groupe.",
    "Consignes : chercher à réaliser une réception contrôlée, suivie d’une passe, puis d’un renvoi, sans exiger systématiquement les trois actions si le niveau ne le permet pas encore.",
    "Sécurité : communiquer clairement pour éviter que deux élèves ne jouent le même ballon.",
    "Critères de réussite : réaliser au moins deux actions enchaînées de façon contrôlée.",
    "Variantes et adaptations : se concentrer d’abord sur réception puis renvoi, sans passe intermédiaire, pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 6 — Mini-volley coopératif",
  [
    "Objectif : construire des échanges continus dans un jeu réduit, avec la participation de tous.",
    "Organisation : petits effectifs (par exemple 3 contre 3), terrain réduit, filet ou séparation adaptée.",
    "Matériel : un ballon léger, filet ou séparation, repères pour délimiter le terrain.",
    "Consignes : règles aménagées favorisant la continuité de l’échange (par exemple, exiger au moins deux contacts avant le renvoi) et la participation de tous.",
    "Sécurité : respecter les limites du terrain, ne jamais toucher le filet ou les poteaux.",
    "Critères de réussite : chaque élève de l’équipe touche le ballon au moins une fois pendant le jeu.",
    "Variantes et adaptations : réduire l’exigence de contacts pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C09-10",
  "Élève observateur avec grille pendant un mini-volley",
  "Dessiner un élève haïtien de 8e AF debout à distance raisonnable, tenant une petite grille d’observation, observant attentivement un mini-volley auquel participent ses camarades.",
  "Un élève observateur utilisant une grille simple pendant un mini-volley.",
  "Servir de support visuel à l’activité d’observation et d’analyse ci-dessous.",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ---- Activité d'observation et d'analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(bodyPar(
  "Pour chacune des séquences suivantes, identifie ce qui facilite ou interrompt l’échange, et propose un ajustement. Plusieurs solutions peuvent être acceptées lorsqu’elles sont correctement justifiées."
));
children.push(calloutBox(
  "Comment prolonger l’échange ?",
  [
    "Séquence 1 : un élève renvoie précipitamment chaque ballon dès qu’il le touche, sans jamais contrôler ni orienter son geste.",
    "Séquence 2 : un élève réalise une réception contrôlée, orientée clairement vers un partenaire.",
    "Séquence 3 : tous les partenaires se regroupent sous le même ballon, laissant le reste du terrain complètement vide.",
    "Séquence 4 : une équipe communique clairement avant chaque contact (« à moi ! ») et se replace après chaque action.",
    "Pour chaque séquence, réponds : cet élément facilite-t-il ou interrompt-il l’échange ? Pourquoi ? Quel ajustement proposerais-tu si nécessaire ?",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité de coopération ----
children.push(sectionHeading("Activité de coopération", ""));
children.push(calloutBox(
  "Notre record d’échanges contrôlés",
  [
    "Objectif : améliorer, en équipe, le nombre d’échanges contrôlés réalisés de suite, dans une logique non compétitive entre groupes.",
    "Organisation : petits groupes, chacun cherchant à améliorer son propre record, sans classement entre les groupes.",
    "Consignes : compter le nombre d’échanges contrôlés (contacts orientés et maîtrisés) réalisés de suite, puis chercher à faire mieux lors de l’essai suivant.",
    "Cette activité valorise la précision, la communication et la participation de tous, jamais la puissance ni la comparaison humiliante entre groupes.",
    "Chaque groupe garde son propre objectif de progression, indépendamment des résultats des autres groupes.",
  ],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique du volley-ball. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à te comparer aux autres élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je lis mieux la trajectoire", "", ""],
    ["Je me place avant le contact", "", ""],
    ["Je contrôle une réception", "", ""],
    ["J’oriente une passe", "", ""],
    ["Je peux servir de manière adaptée", "", ""],
    ["Je communique", "", ""],
    ["Je me replace", "", ""],
    ["Je respecte les règles", "", ""],
    ["Je peux expliquer un ajustement", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le volley-ball est un sport collectif séparé par un filet, où chaque équipe joue dans son propre espace.",
  "Lire la trajectoire du ballon permet de se déplacer par anticipation plutôt que d’attendre immobile.",
  "La réception basse (manchette) contrôle et oriente un ballon bas vers une cible.",
  "La passe haute se joue avec les mains, au-dessus du visage, pour orienter le ballon vers un partenaire.",
  "Le service scolaire adapté privilégie régularité et contrôle avant puissance.",
  "L’enchaînement réception → passe → renvoi construit progressivement une action collective.",
  "Une bonne occupation de l’espace évite que tous les joueurs se regroupent sous le même ballon.",
  "La communication réduit les hésitations et les collisions entre partenaires.",
  "Chaque joueur se replace après son action pour rester prêt pour l’échange suivant.",
  "Le fair-play, l’acceptation des décisions et le respect de l’arbitrage sont indispensables au jeu collectif.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "L’élève de 8e AF doit désormais contrôler davantage le ballon et justifier des choix collectifs simples, et non simplement renvoyer chaque ballon reçu."
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(9));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(réception - trajectoire - service - passe - échange - replacement - coopération - zone)", italics: true, color: "555555" },
]));
[
  "1. Observer la direction, la hauteur et la vitesse d’un ballon qui arrive, c’est lire sa ____________________.",
  "2. Le premier contact contrôlé avec un ballon adverse s’appelle la ____________________.",
  "3. Orienter le ballon vers un partenaire avec les mains, au-dessus du visage, s’appelle une ____________________.",
  "4. Le geste qui met le ballon en jeu depuis l’arrière du terrain s’appelle le ____________________.",
  "5. Une suite d’actions qui permet de garder le ballon en jeu entre les deux équipes s’appelle un ____________________.",
  "6. Se déplacer vers une nouvelle position après avoir joué le ballon s’appelle le ____________________.",
  "7. Travailler ensemble en communiquant pour construire un échange est une forme de ____________________.",
  "8. Une portion délimitée du terrain, utile pour organiser les joueurs, s’appelle une ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Pourquoi est-il utile de lire la trajectoire du ballon avant qu’il n’arrive ?", opts: ["a) pour ne rien faire jusqu’à son arrivée", "b) pour se déplacer par anticipation et bien se placer", "c) parce que cela n’a aucune utilité au volley-ball", "d) uniquement pour impressionner l’adversaire"] },
  { q: "2. Que recherche en priorité le service scolaire présenté dans ce chapitre ?", opts: ["a) la puissance maximale", "b) la régularité et le contrôle", "c) une technique de compétition avancée", "d) le plus grand nombre de services ratés"] },
  { q: "3. Que signifie construire un échange, selon ce chapitre ?", opts: ["a) renvoyer le ballon le plus vite possible sans réfléchir", "b) garder le ballon en jeu de façon organisée grâce à la coopération de l’équipe", "c) marquer un point immédiatement à chaque contact", "d) éviter tout contact avec le ballon"] },
  { q: "4. Pourquoi la communication est-elle particulièrement importante au volley-ball ?", opts: ["a) elle n’a aucune utilité réelle", "b) elle réduit les hésitations et certaines collisions entre partenaires", "c) elle sert uniquement à impressionner l’adversaire", "d) elle remplace complètement la technique"] },
  { q: "5. Que doit faire un élève arbitre ou observateur face à une situation simple à trancher ?", opts: ["a) refuser de prendre une décision", "b) prendre une décision simple sous la direction de l’enseignant, dans le respect du fair-play", "c) favoriser systématiquement ses amis", "d) ignorer complètement la situation"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Trajectoire", "a) Geste avec les mains qui oriente le ballon vers un partenaire"],
  ["2. Réception", "b) Geste qui met le ballon en jeu"],
  ["3. Passe haute", "c) Suite d’actions qui permet de garder le ballon en jeu entre les deux équipes"],
  ["4. Service", "d) Changement rapide de position après une action"],
  ["5. Échange", "e) Chemin suivi par le ballon dans les airs"],
  ["6. Replacement", "f) Premier contact contrôlé du ballon reçu par l’équipe"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Tous les partenaires d’une équipe se regroupent systématiquement sous le même ballon, laissant le reste du terrain vide. Analyse cette situation et propose un ajustement.",
  "2. Un élève réceptionne précipitamment chaque ballon sans jamais l’orienter vers un partenaire, ce qui interrompt régulièrement l’échange. Explique les conséquences de ce comportement et propose une correction.",
  "3. Deux élèves jouent le même ballon en même temps, faute de communication, ce qui provoque une petite collision. Explique comment la communication aurait pu éviter cette situation.",
  "4. Un service trop puissant, mal maîtrisé par l’élève, sort systématiquement du terrain. Explique pourquoi ce choix n’est pas adapté et propose un ajustement technique.",
  "5. Une installation de séparation (corde tendue entre deux poteaux) te semble instable avant une séance de volley-ball. Explique ce que tu devrais faire, et pourquoi.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 107, "Manuel_EPS_8AF_Chapitre9.docx");
console.log("Chapitre 9 (8e AF) genere:", outPath);
