import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(6, "Athlétisme — Sauts et lancers : techniques, coordination, mesure et progression"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Au chapitre 5, tu as approfondi la course, l’allure et le relais. Ce chapitre poursuit l’athlétisme scolaire avec deux nouvelles familles d’actions : sauter et lancer. Tu vas y apprendre à préparer ton geste, à contrôler ta réception ou ta trajectoire, à mesurer un essai, et à ajuster ton action pour progresser, toujours dans un cadre sécurisé."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Comprendre et maîtriser les principes élémentaires des sauts et des lancers scolaires : préparation, impulsion ou action de lancer, trajectoire, réception ou zone de chute, mesure et analyse. Ce chapitre développe ta coordination, ta précision, ton contrôle, ton sens de l’observation et ta capacité à ajuster une action après un essai."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "distinguer les objectifs généraux d’un saut et d’un lancer ;",
  "identifier les phases simples d’un saut scolaire : préparation/élan adapté, impulsion, phase aérienne et réception ;",
  "réaliser des sauts adaptés à ton niveau avec une réception contrôlée ;",
  "identifier les principes simples d’un lancer : préparation, action coordonnée, direction, trajectoire et fin du geste ;",
  "lancer uniquement du matériel scolaire sûr, dans une zone organisée ;",
  "mesurer une performance de manière simple et fiable, sous la direction de l’enseignant ;",
  "comparer tes propres essais afin d’identifier une progression ou un point à ajuster, sans comparaison humiliante ;",
  "assumer des rôles d’observateur, mesureur ou responsable de zone selon les consignes ;",
  "appliquer strictement les règles de sécurité des zones de saut et de lancer.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Élan, impulsion, réception, trajectoire, précision, mesure, coordination, zone, sécurité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Ce chapitre réutilise des notions déjà installées : la coordination et la force adaptée (chapitre 2), la vitesse (chapitre 5), et la préparation à l’effort (chapitre 4). Réponds à cette question avant de commencer :"
));
children.push(bodyPar(
  "Pour aller plus loin dans un saut ou un lancer, suffit-il d’utiliser plus de force ?"
));
children.push(bodyPar(
  "Cette question t’invite à réfléchir à ce qui influence réellement un saut ou un lancer : la coordination, la technique, la direction, l’équilibre et le contrôle jouent un rôle au moins aussi important que la force."
));
children.push(spacer(160));

// ================= 6.1 =================
children.push(sectionHeading("Découvrir les familles de sauts et de lancers", "6.1"));
children.push(bodyPar(
  "Les sauts et les lancers étudiés dans ce chapitre sont présentés dans un cadre strictement scolaire, avec des exemples adaptés à la 8e AF, sans surcharge réglementaire. La technique étudiée vise avant tout l’efficacité, la maîtrise du geste et la sécurité, jamais la performance maximale ou la recherche de records."
));
children.push(spacer(160));

// ================= 6.2 =================
children.push(sectionHeading("Les phases d’un saut", "6.2"));
children.push(bodyPar(
  "Un saut scolaire s’enchaîne en plusieurs phases simples : une préparation ou un élan adapté (pour se placer ou prendre un peu de vitesse), une impulsion (le moment où l’on quitte le sol), une phase aérienne (le déplacement du corps dans les airs), puis une réception."
));
children.push(bodyPar(
  "Observer comment ces phases s’enchaînent, sans rupture brutale, est plus important que de maîtriser chaque détail technique de façon isolée."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C06-01",
  "Les quatre phases d’un saut",
  "Réaliser une bande de 4 vignettes numérotées montrant un même élève haïtien de 8e AF : 1) préparation/élan adapté (quelques pas de marche ou de trot léger) ; 2) impulsion (un pied au sol, corps en phase de décollage) ; 3) phase aérienne (corps en l’air, position contrôlée) ; 4) réception (genoux légèrement fléchis, équilibre stable).",
  "Les quatre phases d’un saut scolaire : préparation, impulsion, phase aérienne, réception.",
  "Donner à l’élève une vue d’ensemble claire de l’enchaînement des phases avant leur étude détaillée.",
  "Paysage, format horizontal, bande de 4 vignettes.",
));
children.push(spacer(200));

// ================= 6.3 =================
children.push(sectionHeading("L’impulsion", "6.3"));
children.push(bodyPar(
  "L’impulsion est l’action qui permet de quitter le sol pour réaliser le saut. Elle se travaille à travers des situations progressives qui développent la coordination des appuis (bien placer son pied au moment de l’impulsion) et l’équilibre du corps au moment du décollage."
));
children.push(bodyPar(
  "Ce chapitre ne propose jamais de hauteurs importantes ni d’obstacles dangereux : l’impulsion se travaille toujours dans des conditions sûres, adaptées au niveau de chaque élève."
));
children.push(spacer(160));

// ================= 6.4 =================
children.push(sectionHeading("La réception", "6.4"));
children.push(bodyPar(
  "La réception est l’apprentissage central de ce chapitre, du point de vue de la sécurité. Elle demande une zone dégagée, un bon équilibre au moment de retomber, un contrôle du mouvement, et le respect de l’espace des autres élèves."
));
children.push(bodyPar(
  "Seules des surfaces et dispositifs adaptés à la tâche sont utilisés (par exemple une zone de sable ou une surface souple). Aucun saut acrobatique n’est jamais proposé dans ce chapitre."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Sauter ou lancer efficacement demande coordination, contrôle et technique, pas seulement de la force."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C06-03",
  "Comparaison pédagogique de deux réceptions",
  "Dessiner deux vignettes côte à côte : à gauche, un élève haïtien réalisant une réception contrôlée (genoux fléchis, équilibre stable, bras aidant à stabiliser) ; à droite, un élève avec une réception à corriger (jambes trop raides, léger déséquilibre visible), sans jamais montrer de chute violente ni de blessure.",
  "Une réception contrôlée à gauche, une réception à corriger à droite.",
  "Aider l’élève à distinguer visuellement une réception sûre d’une réception à améliorer, sans dramatisation.",
  "Paysage, format horizontal, deux vignettes côte à côte.",
));
children.push(spacer(200));

// ================= 6.5 =================
children.push(sectionHeading("Sauter loin dans un cadre scolaire", "6.5"));
children.push(bodyPar(
  "Une situation de saut en longueur simplifiée peut être proposée : un élan court et adapté, une zone d’impulsion clairement repérée au sol, et une réception sûre. Ce qui est observé, c’est la régularité de l’élan (retrouver le même rythme d’un essai à l’autre), la coordination générale du geste, et le contrôle de la réception."
));
children.push(bodyPar(
  "Ce chapitre n’exige jamais la technique réglementaire complète de compétition : l’objectif reste l’apprentissage progressif, adapté au niveau scolaire."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C06-02",
  "Petit saut scolaire",
  "Dessiner un élève haïtien de 8e AF réalisant un saut en longueur scolaire simplifié : élan court représenté par quelques pas, une zone d’impulsion marquée au sol, et une zone de réception sûre (sable ou surface souple) clairement délimitée.",
  "Un saut scolaire avec une zone d’impulsion identifiée et une réception sécurisée.",
  "Illustrer concrètement l’organisation d’un petit saut en longueur adapté au niveau scolaire.",
  "Paysage, format horizontal, vue latérale du saut.",
));
children.push(spacer(200));

// ================= 6.6 =================
children.push(sectionHeading("Principes d’un lancer efficace", "6.6"));
children.push(bodyPar(
  "Un lancer efficace repose sur plusieurs éléments : une préparation (se placer correctement avant le geste), une coordination du corps entier (pas seulement du bras), une orientation claire vers la direction ou la cible visée, une action du bras contrôlée, une trajectoire cohérente, et le maintien de l’équilibre pendant et après le geste."
));
children.push(bodyPar(
  "La précision et la coordination comptent au moins autant que la force dans la réussite d’un lancer. Seuls des objets légers et sûrs, prévus par l’enseignant, sont utilisés pour ces activités."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C06-04",
  "Principes d’un lancer scolaire",
  "Dessiner un élève haïtien de 8e AF en position de lancer, avec des repères visuels simples indiquant : la préparation du corps (position des pieds et des épaules), la direction visée (flèche vers l’avant), et la trajectoire de l’objet (ligne pointillée légère vers une cible ou une zone de chute).",
  "Les principes d’un lancer scolaire : préparation, orientation et trajectoire.",
  "Illustrer de façon simple les éléments clés d’un lancer efficace, sans surcharge technique.",
  "Portrait, format vertical, plan moyen sur le geste.",
));
children.push(spacer(200));

// ================= 6.7 =================
children.push(sectionHeading("Lancer en précision et en distance", "6.7"));
children.push(bodyPar(
  "Deux intentions différentes peuvent guider un lancer : atteindre une cible précise, ou envoyer un objet à une distance adaptée. Dans les deux cas, la direction du geste, l’angle de la trajectoire et la coordination générale influencent directement le résultat, sans qu’il soit nécessaire d’entrer dans une formalisation physique avancée."
));
children.push(bodyPar(
  "Une règle est absolue : il est interdit de récupérer un objet lancé avant que l’enseignant n’en donne le signal, quelle que soit l’intention du lancer (précision ou distance)."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C06-05",
  "Lancer de précision vers une cible",
  "Dessiner un élève haïtien de 8e AF en position de lancer, visant une cible simple (par exemple un cercle tracé au sol ou sur un support), avec une zone clairement délimitée autour de la cible où personne d’autre ne se trouve.",
  "Un lancer de précision vers une cible sûre, dans une zone dégagée.",
  "Illustrer concrètement une situation de lancer de précision, en lien avec l’Activité 3.",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ================= 6.8 =================
children.push(sectionHeading("Mesurer et enregistrer", "6.8"));
children.push(bodyPar(
  "Lorsqu’un ruban de mesure ou des repères gradués sont disponibles, ils peuvent être utilisés pour mesurer simplement un essai de saut ou de lancer, toujours sous la direction de l’enseignant, qui précise le point de départ et le point d’arrivée de la mesure selon la situation pédagogique."
));
children.push(bodyPar(
  "Une fiche simple peut t’aider à suivre tes essais :"
));
children.push(threeColTable(
  ["Essai", "Résultat ou observation", "Ajustement pour le prochain essai"],
  [
    ["Essai 1", "", ""],
    ["Essai 2", "", ""],
    ["Essai 3", "", ""],
  ],
  [2400, 3600, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette mesure sert uniquement à suivre ta propre progression, jamais à dévaloriser les autres élèves."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C06-07",
  "Mesure d’un essai sous supervision",
  "Dessiner deux élèves haïtiens de 8e AF mesurant ensemble la distance d’un essai de saut ou de lancer à l’aide d’un ruban ou de repères gradués au sol, sous la supervision visible de l’enseignant qui valide la mesure.",
  "Une mesure simple et fiable, réalisée sous supervision, pour suivre la progression personnelle.",
  "Illustrer la façon correcte de mesurer un essai, en lien avec l’Activité 5.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ================= 6.9 =================
children.push(sectionHeading("Observer, analyser et ajuster", "6.9"));
children.push(bodyPar(
  "Comme dans les chapitres précédents, la démarche observer → analyser → choisir → agir → ajuster t’aide à progresser. Après un essai de saut ou de lancer, essaie d’identifier un seul point prioritaire à améliorer : l’élan, l’impulsion, l’équilibre, la direction, la coordination ou la réception."
));
children.push(bodyPar(
  "Les retours entre camarades doivent toujours rester factuels et respectueux : décrire ce qui a été observé, plutôt que de juger la performance ou la personne."
));
children.push(spacer(120));

children.push(calloutBox(
  "Méthode",
  ["Observer → Analyser → Choisir → Agir → Ajuster : après chaque essai de saut ou de lancer, identifie un seul point prioritaire à améliorer avant le prochain essai."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ================= 6.10 =================
children.push(sectionHeading("Rôles et coopération", "6.10"));
children.push(bodyPar(
  "Selon la tâche, plusieurs rôles peuvent être organisés entre élèves : pratiquant, observateur, mesureur, secrétaire de résultats, ou responsable d’attente. Ces rôles permettent à chacun de participer activement, même en dehors des moments où l’on saute ou lance soi-même."
));
children.push(bodyPar(
  "Un élève ne doit jamais pénétrer dans une zone de lancer pour mesurer ou récupérer un objet sans autorisation explicite de l’enseignant. Ces rôles relient directement la coopération, le respect des règles et la citoyenneté déjà étudiés dans les chapitres précédents."
));
children.push(spacer(120));

children.push(calloutBox(
  "Coopération",
  ["Les rôles d'observateur, de mesureur ou de responsable de zone sont aussi importants que la pratique elle-même : ils permettent à toute la classe de progresser ensemble en sécurité."],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(200));

// ================= 6.11 =================
children.push(sectionHeading("Sécurité spécifique aux lancers", "6.11"));
[
  "la zone de lancer, la ligne d’attente et la zone de chute sont toujours clairement délimitées ;",
  "tous les lancers d’un même atelier vont dans une seule direction prévue et contrôlée ;",
  "personne ne doit jamais se trouver dans la zone de chute pendant un lancer ;",
  "le matériel n’est récupéré que sur signal de l’enseignant, et uniquement lorsque tous les lancers sont terminés ;",
  "il est interdit de lancer un objet vers une personne, même pour plaisanter.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  ["Personne ne doit se trouver dans la zone de chute d'un lancer ; la récupération du matériel se fait uniquement sur signal de l'enseignant."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C06-06",
  "Organisation sécurisée d’une zone de lancer",
  "Dessiner une zone de lancer scolaire vue d’ensemble : un lanceur en position, une ligne d’attente où se trouvent d’autres élèves, une zone de chute clairement délimitée et vide de toute personne, et l’enseignant supervisant l’ensemble depuis un endroit sûr.",
  "Une zone de lancer bien organisée : lanceur, ligne d’attente, zone de chute et supervision.",
  "Illustrer l’organisation spatiale complète nécessaire à la sécurité d’un atelier de lancer.",
  "Paysage, format horizontal, vue d’ensemble.",
));
children.push(spacer(200));

// ================= 6.12 =================
children.push(sectionHeading("Sécurité spécifique aux sauts", "6.12"));
[
  "la zone d’élan, la zone d’impulsion et la zone de réception sont vérifiées avant de commencer ;",
  "un seul élève à la fois se trouve dans la zone active, lorsque l’organisation l’exige ;",
  "chaque élève attend que la zone de réception soit libre avant de s’élancer ;",
  "la tâche est toujours adaptée à l’état réel du sol et au matériel réellement disponible.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Dans les compétitions officielles de saut en longueur, les athlètes ne cherchent pas seulement à sauter fort : ils travaillent surtout la régularité de leur élan, car un élan mal réglé fait souvent perdre plus de distance qu’un manque de force."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C06-08",
  "Scène haïtienne d’atelier sauts et lancers",
  "Dessiner une vue d’ensemble d’une cour d’école haïtienne organisée en plusieurs ateliers séparés : un atelier de saut avec zone d’impulsion et réception, un atelier de lancer avec ligne d’attente et zone de chute, plusieurs élèves occupant différents rôles (pratiquant, observateur, mesureur), et l’enseignant supervisant l’ensemble.",
  "Un atelier scolaire haïtien de sauts et de lancers, avec plusieurs rôles et zones clairement séparées.",
  "Montrer que les activités du chapitre restent réalisables dans un contexte scolaire haïtien courant, sans installation officielle.",
  "Paysage, format horizontal, vue d’ensemble large.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Impulsion et réception",
  [
    "Objectif : réaliser de petits sauts adaptés avec une réception contrôlée.",
    "Organisation : file d’élèves, chacun réalisant l’exercice à tour de rôle dans une zone dégagée.",
    "Matériel : zone d’impulsion marquée au sol, zone de réception sûre (sable ou surface souple).",
    "Consignes : réaliser une courte préparation, une impulsion contrôlée, puis une réception équilibrée, genoux légèrement fléchis.",
    "Sécurité : la zone de réception doit toujours être libre avant chaque saut ; un seul élève à la fois dans la zone active.",
    "Critères de réussite : réaliser une réception équilibrée, sans perte d’équilibre en retombant.",
    "Variantes et adaptations : réduire la distance d’élan ou la hauteur recherchée selon le niveau de l’élève.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Mon saut, mon ajustement",
  [
    "Objectif : réaliser deux ou trois essais de saut en identifiant un critère simple à améliorer.",
    "Organisation : binômes, un élève saute pendant que l’autre observe, puis les rôles s’inversent.",
    "Matériel : zone d’impulsion et de réception identiques à l’Activité 1.",
    "Consignes : réaliser un premier essai, recevoir un retour de l’observateur sur un critère simple (élan, impulsion, équilibre), puis ajuster ce critère lors de l’essai suivant.",
    "Sécurité : attendre que la zone soit libre avant chaque nouvel essai.",
    "Critères de réussite : identifier et expliquer un ajustement réalisé entre deux essais.",
    "Variantes et adaptations : limiter l’observation à un seul critère pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Lancer vers une cible",
  [
    "Objectif : réaliser un lancer de précision avec un objet scolaire léger.",
    "Organisation : file d’élèves derrière une ligne de lancer, avec une zone d’attente clairement définie.",
    "Matériel : objets légers et sûrs (petites balles souples), cible simple, repères pour la ligne de lancer et la zone de chute.",
    "Consignes : lancer à tour de rôle vers la cible, en recherchant la précision plutôt que la puissance.",
    "Sécurité : personne n’entre dans la zone de chute avant l’autorisation explicite de l’enseignant.",
    "Critères de réussite : réaliser un geste de lancer contrôlé et orienté vers la cible.",
    "Variantes et adaptations : rapprocher ou éloigner la cible selon le niveau de l’élève.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Lancer et observer la trajectoire",
  [
    "Objectif : comparer plusieurs intentions de lancer (précision et distance) sous contrôle de l’enseignant.",
    "Organisation : petits groupes, alternant lancers de précision vers une cible et lancers en distance dans une zone dégagée.",
    "Matériel : objets légers et sûrs, repères pour les différentes zones.",
    "Consignes : observer, pour chaque lancer, la direction et la trajectoire de l’objet, et comparer les deux intentions de lancer.",
    "Sécurité : un seul type de lancer à la fois dans une zone donnée ; personne dans la zone de chute.",
    "Critères de réussite : décrire une différence observée entre un lancer de précision et un lancer en distance.",
    "Variantes et adaptations : réduire le nombre d’essais pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Mesurer pour progresser",
  [
    "Objectif : relever des résultats simples de saut ou de lancer et choisir un ajustement technique.",
    "Organisation : petits groupes avec rôles définis (pratiquant, mesureur, secrétaire de résultats), sous supervision de l’enseignant.",
    "Matériel : ruban de mesure ou repères gradués si disponibles, fiche de suivi simple.",
    "Consignes : réaliser 2 ou 3 essais, mesurer chaque essai sous supervision, noter le résultat ou l’observation, puis proposer un ajustement pour le prochain essai.",
    "Sécurité : la mesure ne se fait qu’après le signal de l’enseignant confirmant que la zone est libre.",
    "Critères de réussite : compléter la fiche de suivi et proposer un ajustement cohérent avec l’observation.",
    "Variantes et adaptations : utiliser des repères simples au sol si aucun ruban de mesure n’est disponible.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation et de résolution de problème ----
children.push(sectionHeading("Activité d’observation et de résolution de problème", ""));
children.push(bodyPar(
  "Pour chacune des situations suivantes, identifie les différences observées, justifie laquelle te semble mieux organisée, et propose un ajustement."
));
children.push(calloutBox(
  "Pourquoi cet essai est-il plus efficace ?",
  [
    "Situation 1 : deux élèves réalisent un saut en longueur scolaire. Le premier garde un élan régulier et une réception équilibrée ; le second change de rythme juste avant l’impulsion et se réceptionne en perdant légèrement l’équilibre.",
    "Situation 2 : deux élèves réalisent un lancer de précision. Le premier oriente clairement son corps et son bras vers la cible ; le second lance sans réajuster sa direction, et l’objet part sur le côté.",
    "Situation 3 : un élève veut récupérer son objet de lancer immédiatement après l’avoir lancé, avant que l’enseignant n’ait donné le signal.",
    "Pour les situations 1 et 2, réponds : quelles différences observes-tu ? Quel essai te semble mieux organisé, et pourquoi ? Quel ajustement proposerais-tu à l’élève le moins efficace ?",
    "Pour la situation 3, explique quelle est la conduite correcte à adopter, et pourquoi cette règle est importante.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique des sauts et des lancers. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à te comparer aux autres élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je prépare mon action", "", ""],
    ["Je coordonne mieux mes mouvements", "", ""],
    ["Je respecte la zone", "", ""],
    ["Je contrôle ma réception", "", ""],
    ["Je peux mesurer correctement", "", ""],
    ["Je peux identifier un ajustement", "", ""],
    ["Je respecte les rôles", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Un saut scolaire s’enchaîne en quatre phases : préparation/élan, impulsion, phase aérienne, réception.",
  "La réception est un apprentissage central pour la sécurité : zone dégagée, équilibre et contrôle.",
  "Un lancer efficace repose sur la préparation, la coordination du corps, l’orientation et la trajectoire — pas seulement la force.",
  "On distingue lancer de précision (viser une cible) et lancer en distance, avec les mêmes principes de coordination.",
  "Mesurer un essai, sous supervision, permet de suivre sa propre progression, jamais de dévaloriser les autres.",
  "La démarche observer → analyser → choisir → agir → ajuster aide à identifier un point prioritaire après chaque essai.",
  "Les rôles d’observateur, de mesureur ou de responsable de zone sont aussi importants que la pratique elle-même.",
  "La sécurité des lancers impose une zone de chute toujours vide et une récupération uniquement sur signal.",
  "La sécurité des sauts impose une zone de réception toujours libre avant chaque tentative.",
  "L’élève de 8e AF doit désormais savoir mesurer, analyser et ajuster son action, et non simplement répéter un geste.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(6));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(impulsion - réception - trajectoire - précision - mesure - coordination - zone - sécurité)", italics: true, color: "555555" },
]));
[
  "1. L’action qui permet de quitter le sol pour réaliser un saut s’appelle l’____________________.",
  "2. Retomber au sol de façon équilibrée après un saut s’appelle la ____________________.",
  "3. Le chemin suivi par un objet lancé dans les airs s’appelle sa ____________________.",
  "4. Viser une cible précise plutôt que rechercher la distance est un objectif de ____________________.",
  "5. Utiliser un ruban ou des repères gradués pour évaluer un essai s’appelle une ____________________.",
  "6. Organiser harmonieusement plusieurs mouvements du corps s’appelle la ____________________.",
  "7. La ligne d’attente, la zone d’action et la zone de chute sont des exemples de ____________________ à respecter.",
  "8. Ne jamais entrer dans une zone de chute sans autorisation est une règle de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que faut-il en priorité pour bien réussir un saut ou un lancer, selon ce chapitre ?", opts: ["a) uniquement de la force maximale", "b) coordination, contrôle et technique", "c) une compétition entre élèves", "d) une hauteur ou une distance très importante"] },
  { q: "2. Quelle est la phase d’un saut la plus centrale pour la sécurité ?", opts: ["a) la préparation", "b) l’impulsion", "c) la phase aérienne", "d) la réception"] },
  { q: "3. Quand un élève peut-il récupérer un objet lancé ?", opts: ["a) immédiatement après l’avoir lancé", "b) dès qu’il en a envie", "c) uniquement sur signal de l’enseignant, quand tous les lancers sont terminés", "d) pendant qu’un camarade est encore en train de lancer"] },
  { q: "4. À quoi sert la mesure d’un essai de saut ou de lancer, selon ce chapitre ?", opts: ["a) à classer les élèves du meilleur au moins bon", "b) à suivre sa propre progression", "c) à comparer les corps des élèves", "d) à sélectionner les élèves pour une compétition"] },
  { q: "5. Que doit faire un élève qui observe un camarade réaliser un saut ou un lancer ?", opts: ["a) juger sévèrement sa performance", "b) donner un retour factuel et respectueux", "c) ne rien dire du tout", "d) se moquer si l’essai n’est pas réussi"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition ou sa fonction correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Impulsion", "a) Chemin suivi par un objet lancé dans les airs"],
  ["2. Réception", "b) Action qui permet de quitter le sol pour réaliser un saut"],
  ["3. Trajectoire", "c) Zone où personne ne doit se trouver pendant un lancer"],
  ["4. Zone de chute", "d) Fait d’évaluer un essai à l’aide d’un ruban ou de repères"],
  ["5. Mesure", "e) Retour équilibré au sol après un saut"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève se réceptionne mal après un saut, avec les jambes raides et un déséquilibre visible. Analyse cette situation et propose un ajustement précis pour son prochain essai.",
  "2. Un lancer de précision part systématiquement sur le côté de la cible. Identifie une cause possible et propose une correction technique simple.",
  "3. Un élève affirme avoir mesuré son essai à une distance qui semble incohérente avec ce qui a été observé. Explique comment vérifier cette mesure de façon fiable et respectueuse.",
  "4. Une zone de lancer est mal organisée : la zone de chute n’est pas clairement délimitée et deux ateliers se trouvent trop proches l’un de l’autre. Propose une nouvelle organisation, en justifiant chaque correction.",
  "5. Un élève veut récupérer son objet de lancer avant le signal de l’enseignant, en disant que « ça ne prendra qu’une seconde ». Explique pourquoi cette attitude est dangereuse, même si l’intention semble anodine.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 63, "Manuel_EPS_8AF_Chapitre6.docx");
console.log("Chapitre 6 (8e AF) genere:", outPath);
