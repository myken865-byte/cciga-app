import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
  BOX_ARBITRAGE_FILL, BOX_ARBITRAGE_LINE, BOX_ARBITRAGE_TITLE,
  BOX_CULTURE_FILL, BOX_CULTURE_LINE, BOX_CULTURE_TITLE, NAVY,
} from "./common.mjs";

// Illustration ID tracker (must all be used exactly once, 01-10):
// 01 intro/11.1, 02 11.2, 03 11.3, 04 11.4, 05 11.6, 06 11.7, 07 11.8, 08 11.9, 09 11.11, 10 near résumé

const children = [];

children.push(...chapterTitleBlock(11, "Jeux, activités physiques haïtiennes, coopération, arbitrage et fair-play"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Après avoir approfondi les sports collectifs et la gymnastique, ce chapitre élargit ton regard sur l’EPS : les jeux moteurs, y compris ceux issus du patrimoine haïtien, sont eux aussi de véritables situations d’apprentissage. Tu vas apprendre à comprendre et adapter des règles, à coopérer, à arbitrer avec impartialité, et à résoudre des désaccords, tout en valorisant les jeux transmis dans les familles et les communautés."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Découvrir, pratiquer, analyser et adapter des jeux et activités physiques issus ou inspirés du contexte haïtien, tout en développant coopération, respect des règles, arbitrage, fair-play et responsabilité. Un jeu devient véritablement éducatif lorsque les participants partagent des règles claires, respectent les autres et recherchent une participation équitable."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "définir simplement jeu moteur, coopération, opposition, arbitrage et fair-play ;",
  "identifier les qualités motrices et sociales mobilisées dans différents jeux ;",
  "expliquer une règle avec précision et vérifier qu’elle est comprise ;",
  "participer à l’adaptation d’un jeu à l’espace, au matériel et au nombre d’élèves ;",
  "coopérer pour atteindre un objectif collectif ;",
  "respecter partenaires, adversaires, arbitre, matériel et décisions ;",
  "assumer un rôle simple d’arbitre ou d’observateur avec impartialité ;",
  "identifier un conflit de jeu et proposer une résolution fondée sur les règles ;",
  "analyser si une règle favorise sécurité, équité et participation ;",
  "valoriser les pratiques ludiques haïtiennes sans exclure les élèves qui ne les connaissent pas.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Arbitrage, coopération, règle, fair-play, équité, sécurité, adaptation, impartialité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Ce chapitre réutilise les principes des sports collectifs, du basket-ball, du volley-ball, de la gymnastique et de l’expression corporelle, ainsi que la sécurité et la coopération déjà étudiées. Réponds à cette question avant de commencer :"
));
children.push(bodyPar(
  "Deux groupes jouent au même jeu, mais n’utilisent pas exactement les mêmes règles. Comment peuvent-ils jouer ensemble équitablement ?"
));
children.push(bodyPar(
  "Cette question t’invite à réfléchir à ce qui rend un jeu jouable à plusieurs : des règles partagées, une discussion préalable, une adaptation si nécessaire, et parfois un arbitrage pour appliquer ces règles de façon équitable."
));
children.push(spacer(160));

// ================= 11.1 =================
children.push(sectionHeading("Le jeu comme activité physique et sociale", "11.1"));
children.push(bodyPar(
  "Un jeu moteur mobilise ton corps, ton attention, tes décisions, et tes relations avec les autres joueurs. On peut distinguer, sans rigidité excessive, des jeux de coopération (où les joueurs travaillent ensemble vers un même but), des jeux d’opposition (où des joueurs ou des équipes s’affrontent selon des règles), et des jeux qui combinent les deux."
));
children.push(bodyPar(
  "Quel que soit le type de jeu, les règles donnent un cadre commun à l’activité : elles permettent à tous les participants de savoir ce qui est permis, ce qui ne l’est pas, et comment le jeu se déroule."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-01",
  "Carte conceptuelle du jeu moteur",
  "Réaliser un schéma central avec le mot « Jeu moteur » au centre, relié par des flèches à quatre bulles : « Règles », « Coopération / Opposition », « Sécurité », « Fair-play ». Pour chaque bulle, ajouter une petite icône simple représentant la notion.",
  "Les éléments qui structurent tout jeu moteur : règles, coopération ou opposition, sécurité et fair-play.",
  "Donner à l’élève une vue d’ensemble des notions clés avant l’étude détaillée du chapitre.",
  "Paysage, format horizontal, schéma central avec quatre branches.",
));
children.push(spacer(200));

// ================= 11.2 =================
children.push(sectionHeading("Jeux et patrimoine haïtien", "11.2"));
children.push(bodyPar(
  "De nombreux jeux physiques sont transmis dans les familles, les quartiers, les écoles et les communautés en Haïti. Ce chapitre présente quelques exemples crédibles, en précisant que leur nom et leurs règles précises peuvent varier selon les régions, les écoles ou les groupes qui les pratiquent."
));
children.push(bodyPar(
  "Voici trois exemples de jeux ou d’activités physiques connus en Haïti, adaptés ici à un cadre scolaire sécurisé :"
));
children.push(subHeading("La marèl (marelle)"));
children.push(bodyPar(
  "Contexte : jeu individuel ou en petit groupe, pratiqué avec des cases tracées au sol. Objectif moteur : sauter à cloche-pied ou à pieds joints avec équilibre et précision, en respectant un tracé. Organisation : un tracé simple à la craie ou avec des repères sûrs, un petit objet léger (par exemple un caillou plat non tranchant ou un petit sac de graines) pour marquer la case visée. Règles adaptées à l’école : sauter dans l’ordre des cases sans toucher les lignes, récupérer l’objet en équilibre. Compétences mobilisées : équilibre, coordination, précision. Sécurité : tracé sur un sol plat et dégagé, sans obstacle."
));
children.push(subHeading("Sote kòd (saut à la corde)"));
children.push(bodyPar(
  "Contexte : jeu individuel ou collectif, très répandu dans les cours d’école en Haïti. Objectif moteur : sauter par-dessus une corde en mouvement, seul ou pendant qu’elle est tenue par deux camarades. Organisation : une corde souple et sûre, un espace dégagé autour des personnes qui la font tourner. Règles adaptées à l’école : sauter en rythme sans se prendre les pieds dans la corde, alterner les rôles (sauteur, tourneurs). Compétences mobilisées : coordination, rythme, endurance légère. Sécurité : faire tourner la corde à une vitesse adaptée au niveau du sauteur, dégager l’espace autour."
));
children.push(subHeading("Lago (jeu de poursuite)"));
children.push(bodyPar(
  "Contexte : jeu collectif de poursuite, connu sous ce nom ou sous des noms voisins selon les régions. Objectif moteur : courir, changer de direction et éviter d’être touché par le joueur désigné. Organisation : un espace clairement délimité, un ou plusieurs joueurs « poursuivants » désignés au départ. Règles adaptées à l’école : rester dans l’espace délimité, toucher sans bousculer, alterner les rôles régulièrement pour que chacun participe. Compétences mobilisées : vitesse, changement de direction, prise d’information. Sécurité : espace dégagé sans obstacle, contact limité à un toucher léger, jamais une poussée ou une accroche."
));
children.push(bodyPar(
  "Ce chapitre ne prétend pas retracer une origine historique précise de ces jeux : il se limite à présenter des exemples crédibles, transmis de génération en génération, et à proposer une version scolaire sûre et adaptée à la 8e AF."
));
children.push(spacer(160));

children.push(calloutBox(
  "Culture haïtienne",
  ["Les jeux physiques haïtiens sont transmis depuis longtemps dans les familles et les communautés, avec des variantes selon les régions et les écoles : cette diversité fait partie de leur richesse."],
  BOX_CULTURE_FILL, BOX_CULTURE_LINE, BOX_CULTURE_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-02",
  "Scène réaliste d’un jeu physique scolaire haïtien",
  "Dessiner une scène d’ensemble d’élèves haïtiens de 8e AF pratiquant un jeu traditionnel adapté (par exemple sote kòd, saut à la corde) dans une cour d’école, avec un espace dégagé, sous la supervision de l’enseignant.",
  "Une pratique scolaire adaptée et sécurisée d’un jeu physique connu en Haïti.",
  "Montrer que les jeux du patrimoine haïtien peuvent être pratiqués en toute sécurité dans un cadre scolaire.",
  "Paysage, format horizontal, vue d’ensemble.",
));
children.push(spacer(200));

// ================= 11.3 =================
children.push(sectionHeading("Adapter un jeu au contexte scolaire", "11.3"));
children.push(bodyPar(
  "Adapter un jeu suit une démarche simple : identifier l’objectif du jeu, observer l’espace disponible, choisir le matériel adapté, fixer des limites claires, préciser les règles, tester le jeu, puis ajuster si nécessaire."
));
children.push(bodyPar(
  "Les effectifs, les distances, la durée et les zones sont toujours adaptés aux conditions réelles de l’établissement. Une bonne adaptation conserve l’intérêt du jeu tout en améliorant la sécurité et la participation de tous les élèves."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-03",
  "Comparaison : jeu désorganisé / jeu bien organisé",
  "Dessiner une image en deux parties, côte à côte. À gauche : un jeu désorganisé, sans limites claires, avec des élèves qui ne semblent pas savoir où se placer. À droite, le même jeu avec des zones tracées, des règles rappelées, et des rôles clairement répartis (joueurs, arbitre).",
  "À gauche, un jeu désorganisé ; à droite, le même jeu avec zones, règles et rôles clairs.",
  "Illustrer concrètement l’effet d’une bonne adaptation sur l’organisation et la clarté d’un jeu.",
  "Paysage, format horizontal, image divisée en deux parties.",
));
children.push(spacer(200));

// ================= 11.4 =================
children.push(sectionHeading("Coopérer pour réussir", "11.4"));
children.push(bodyPar(
  "Coopérer demande de la communication, une répartition des rôles, de l’entraide, et une prise de décision collective. Il existe une différence importante entre agir seul, sans tenir compte des autres, et coordonner ses actions avec un groupe pour atteindre un objectif commun."
));
children.push(bodyPar(
  "Ce chapitre valorise toujours la participation de tous les élèves, plutôt que la domination des élèves les plus performants dans un jeu collectif."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-04",
  "Coopération : défi collectif inclusif",
  "Dessiner un groupe d’élèves haïtiens de 8e AF réalisant ensemble un défi collectif simple (par exemple faire passer un objet léger de main en main jusqu’au bout d’une ligne), chaque élève ayant un rôle actif et visible dans l’action.",
  "Un défi collectif où chaque élève participe activement, quel que soit son niveau.",
  "Illustrer concrètement la coopération inclusive, en lien avec l’Activité 2.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ================= 11.5 =================
children.push(sectionHeading("S’opposer dans le respect", "11.5"));
children.push(bodyPar(
  "L’opposition sportive ne signifie ni agressivité ni humiliation. S’opposer à un adversaire demande de contrôler ses gestes, de respecter les limites du jeu, et d’accepter qu’un adversaire puisse réussir une action, sans que cela ne remette en cause le respect qui lui est dû."
));
children.push(bodyPar(
  "Ce chapitre écarte totalement les contacts dangereux, les défis risqués et tout comportement visant à faire mal à un autre élève, quelle que soit la situation de jeu."
));
children.push(spacer(160));

// ================= 11.6 =================
children.push(sectionHeading("Comprendre l’arbitrage", "11.6"));
children.push(bodyPar(
  "Un arbitre est le garant du cadre de jeu, de la sécurité et de l’équité entre les joueurs. Son rôle repose sur l’observation attentive de la situation, un signal clair pour indiquer sa décision, une décision cohérente avec les règles, l’impartialité (appliquer la même règle à tous), et une communication claire avec les joueurs."
));
children.push(bodyPar(
  "Ce chapitre commence toujours avec peu de règles clairement observables, avant d’élargir progressivement les responsabilités confiées à un élève-arbitre."
));
children.push(spacer(160));

children.push(calloutBox(
  "Arbitrage",
  ["Observer avant de décider, et appliquer la même règle à tous : c'est la base de tout arbitrage juste, même dans un petit jeu scolaire."],
  BOX_ARBITRAGE_FILL, BOX_ARBITRAGE_LINE, BOX_ARBITRAGE_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-05",
  "Élève-arbitre bien placé",
  "Dessiner un élève haïtien de 8e AF en position d’arbitre, placé à un endroit qui lui permet d’observer clairement l’ensemble du jeu, à distance raisonnable des joueurs, sous la supervision discrète de l’enseignant en arrière-plan.",
  "Un élève-arbitre bien placé pour observer une situation simple, sous supervision.",
  "Illustrer un placement correct pour l’arbitrage, en lien avec la section 11.7.",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ================= 11.7 =================
children.push(sectionHeading("Devenir arbitre dans une situation scolaire", "11.7"));
children.push(bodyPar(
  "Une méthode simple peut guider un élève-arbitre : connaître les règles, se placer pour bien observer, rester attentif pendant le jeu, signaler clairement une décision, décider selon la règle, puis expliquer brièvement si nécessaire."
));
children.push(bodyPar(
  "Les rôles de joueur, d’arbitre et d’observateur peuvent alterner entre les élèves. L’enseignant conserve toujours la supervision de l’activité et intervient dès qu’une situation dépasse les compétences de l’élève-arbitre."
));
children.push(spacer(160));

children.push(calloutBox(
  "Méthode",
  ["Observer → Comprendre → Décider → Agir → Expliquer → Ajuster : ce cycle t'aide à assumer un rôle d'arbitre ou d'observateur, étape par étape."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-06",
  "Séquence d’arbitrage",
  "Réaliser une bande de 4 vignettes numérotées montrant un élève-arbitre haïtien : 1) observant attentivement le jeu ; 2) signalant clairement une décision (geste ou signal sonore) ; 3) annonçant brièvement la décision aux joueurs ; 4) le jeu qui reprend calmement après la décision.",
  "La séquence d’arbitrage : observer, signaler, décider, reprendre le jeu.",
  "Aider l’élève à mémoriser les étapes simples d’un arbitrage scolaire, en lien avec l’Activité d’arbitrage.",
  "Paysage, format horizontal, bande de 4 vignettes.",
));
children.push(spacer(200));

// ================= 11.8 =================
children.push(sectionHeading("Le fair-play", "11.8"));
children.push(bodyPar(
  "Le fair-play se reconnaît à des comportements observables : respecter les règles, reconnaître soi-même une faute commise, accepter une décision d’arbitrage, aider un camarade, éviter la tricherie et les moqueries."
));
children.push(bodyPar(
  "Gagner ne justifie jamais un comportement dangereux ou irrespectueux envers un adversaire ou un partenaire. Le fair-play est directement lié à la citoyenneté et à la vie scolaire en général, bien au-delà des seules activités d’EPS."
));
children.push(spacer(160));

children.push(calloutBox(
  "Fair-play",
  ["Gagner ou perdre sans tricher, sans humilier et sans mettre quelqu'un en danger : voilà ce que signifie vraiment le fair-play."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-07",
  "Fair-play en action",
  "Dessiner plusieurs petites vignettes montrant des comportements positifs après une action de jeu : un élève félicitant un adversaire qui a réussi une action, un élève reconnaissant lui-même une faute, un élève aidant un camarade tombé à se relever.",
  "Plusieurs comportements de fair-play observables après une action de jeu.",
  "Illustrer concrètement des exemples de fair-play, en lien avec l’Activité 4.",
  "Paysage, format horizontal, bande de 3 vignettes.",
));
children.push(spacer(200));

// ================= 11.9 =================
children.push(sectionHeading("Gérer un désaccord", "11.9"));
children.push(bodyPar(
  "Face à un désaccord pendant un jeu, une démarche simple peut être suivie : arrêter la dispute, rappeler la règle concernée, écouter brièvement les différents points de vue, appliquer la décision prévue par la règle, puis reprendre calmement le jeu."
));
children.push(bodyPar(
  "Ce chapitre n’encourage jamais les élèves à régler un désaccord par une confrontation physique. L’enseignant intervient systématiquement lorsqu’un désaccord persiste, ou lorsqu’il concerne la sécurité, l’intimidation ou un comportement grave."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-08",
  "Désaccord résolu calmement",
  "Dessiner deux élèves haïtiens de 8e AF en léger désaccord sur une règle, debout et calmes, avec l’enseignant intervenant pour rappeler la règle, sans aucune confrontation physique ni geste agressif.",
  "Un désaccord sur une règle résolu calmement, sans confrontation physique.",
  "Illustrer une résolution de désaccord respectueuse, en lien avec la section 11.9.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ================= 11.10 =================
children.push(sectionHeading("Règles, équité et inclusion", "11.10"));
children.push(bodyPar(
  "Il est important d’analyser régulièrement si tous les élèves ont réellement des possibilités de participer à un jeu. Des adaptations raisonnables peuvent être proposées : l’espace, le rôle attribué, la durée, le nombre de touches ou d’actions autorisées, ou l’organisation des équipes, selon la tâche."
));
children.push(bodyPar(
  "Ce chapitre écarte fermement toute humiliation liée au niveau physique, au sexe, à l’apparence ou à la maîtrise technique d’un élève."
));
children.push(spacer(160));

// ================= 11.11 =================
children.push(sectionHeading("Créer ou transformer un jeu", "11.11"));
children.push(bodyPar(
  "En groupe, tu vas concevoir une variante simple d’un jeu connu. Ta proposition doit préciser : l’objectif, le terrain, le matériel, le nombre de joueurs, les règles, le système de reprise après une pause, la sécurité, le rôle de l’arbitre, et un critère de réussite."
));
children.push(bodyPar(
  "Chaque groupe doit justifier au moins deux choix réalisés, puis tester sa proposition sous la supervision de l’enseignant avant de l’ajuster si nécessaire."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-09",
  "Groupe concevant une variante de jeu",
  "Dessiner un petit groupe d’élèves haïtiens de 8e AF assis ou debout, discutant autour d’une feuille sur laquelle ils notent les règles d’une variante de jeu, avec du matériel léger (cônes, corde) posé à côté, sous la supervision de l’enseignant.",
  "Un groupe d’élèves concevant et notant les règles d’une variante de jeu.",
  "Servir de support visuel à l’Activité 5 « Créons notre jeu » et à la section 11.11.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

children.push(calloutBox(
  "À retenir",
  ["Une bonne règle permet de jouer ensemble avec sécurité, équité et respect."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C11-10",
  "Tableau visuel : une règle utile",
  "Réaliser un tableau visuel simple avec le titre « Une règle utile doit être... » suivi de quatre cases illustrées par de petites icônes : « claire » (une icône de loupe ou d’œil), « sûre » (une icône de bouclier), « équitable » (une icône de balance), « applicable » (une icône de coche). Style clair et synthétique.",
  "Une règle utile doit être claire, sûre, équitable et applicable.",
  "Offrir à l’élève un repère visuel synthétique pour évaluer la qualité d’une règle de jeu.",
  "Paysage, format horizontal, tableau en quatre cases.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Sécurité",
  [
    "Vérifie l’espace et le matériel avant toute activité, et délimite clairement les zones et les signaux d’arrêt.",
    "Aucun jeu comportant violence, étranglement, coups, mise en danger, humiliation ou défi physique extrême n’est jamais autorisé.",
    "En cas de douleur, malaise, chute problématique ou situation dangereuse, arrête l’activité et préviens immédiatement l’enseignant.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["De nombreux jeux traditionnels pratiqués dans le monde partagent des principes communs avec les jeux haïtiens présentés dans ce chapitre : équilibre, rythme, poursuite ou coopération se retrouvent dans des jeux d'enfants sur presque tous les continents, sous des formes et des noms différents."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Jouons, observons, adaptons",
  [
    "Objectif : pratiquer un jeu sélectionné, puis identifier une règle à ajuster pour améliorer la sécurité ou la participation.",
    "Organisation : classe entière ou petits groupes, jeu choisi par l’enseignant parmi les exemples du chapitre ou un autre jeu adapté.",
    "Matériel : matériel léger et sûr selon le jeu choisi (corde, repères au sol, objets légers).",
    "Règles : rappelées clairement avant de commencer, avec vérification que tous les élèves les comprennent.",
    "Consignes : jouer une première fois, puis discuter en groupe d’une règle qui pourrait être améliorée.",
    "Sécurité : vérifier l’espace et le matériel avant de commencer.",
    "Critères de réussite : proposer une modification de règle cohérente, qui améliore réellement la sécurité ou la participation.",
    "Variantes et adaptations : simplifier davantage les règles pour les groupes qui découvrent le jeu.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Coopérer avant de gagner",
  [
    "Objectif : réussir un défi collectif dont la réussite dépend de la participation coordonnée de tous les membres du groupe.",
    "Organisation : petits groupes, défi collectif simple (par exemple faire circuler un objet léger jusqu’au bout d’une ligne sans le faire tomber).",
    "Matériel : objet léger et sûr, repères délimitant l’espace.",
    "Règles : chaque membre du groupe doit participer activement à la réussite du défi.",
    "Consignes : organiser les rôles avant de commencer, communiquer pendant le défi, s’entraider en cas de difficulté.",
    "Sécurité : garder une distance suffisante entre les groupes.",
    "Critères de réussite : réussir le défi avec la participation visible de tous les membres du groupe.",
    "Variantes et adaptations : adapter la difficulté du défi selon la taille et le niveau du groupe.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Je joue, j’arbitre, j’observe",
  [
    "Objectif : expérimenter, à tour de rôle, les rôles de joueur, d’arbitre et d’observateur.",
    "Organisation : petits groupes, avec rotation régulière des rôles pendant un jeu simple à peu de règles.",
    "Matériel : une petite fiche d’observation simple, matériel du jeu choisi.",
    "Règles : peu nombreuses et clairement énoncées avant de commencer, pour permettre à l’élève-arbitre de réussir.",
    "Consignes : chaque élève occupe successivement les trois rôles ; l’arbitre applique les règles avec impartialité.",
    "Sécurité : l’enseignant supervise en permanence et intervient si nécessaire.",
    "Critères de réussite : appliquer une règle de façon cohérente en tant qu’arbitre, et donner une observation utile en tant qu’observateur.",
    "Variantes et adaptations : ne pas imposer le rôle d’arbitre à un élève qui n’est pas encore prêt ; proposer d’abord le rôle d’observateur.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Fair-play en action",
  [
    "Objectif : choisir et justifier un comportement responsable face à de courts scénarios de jeu.",
    "Organisation : petits groupes ou classe entière, discussion à partir de scénarios courts proposés par l’enseignant.",
    "Matériel : aucun matériel indispensable.",
    "Consignes : pour chaque scénario (par exemple une faute non vue par l’arbitre, une victoire facile), choisir le comportement le plus fair-play et expliquer pourquoi.",
    "Sécurité : aucune mise en situation physique risquée n’est nécessaire pour cette activité.",
    "Critères de réussite : justifier clairement le choix du comportement fair-play pour chaque scénario.",
    "Variantes et adaptations : réduire le nombre de scénarios pour les groupes qui ont besoin de plus de temps de discussion.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Créons notre jeu",
  [
    "Objectif : concevoir, présenter, tester et améliorer une variante sûre d’un jeu connu.",
    "Organisation : petits groupes, avec un temps de conception avant le test pratique.",
    "Matériel : une feuille pour noter les règles, matériel léger et sûr selon le jeu conçu.",
    "Règles : conçues par le groupe, en précisant objectif, terrain, matériel, nombre de joueurs, règles, système de reprise, sécurité, rôle de l’arbitre et critère de réussite.",
    "Consignes : présenter la proposition à l’enseignant, la tester en conditions réelles sous supervision, puis l’ajuster si nécessaire.",
    "Sécurité : l’enseignant valide la proposition avant tout test, et peut refuser tout élément dangereux.",
    "Critères de réussite : présenter une variante complète, testée, et justifiée sur au moins deux choix.",
    "Variantes et adaptations : simplifier le nombre d’éléments à préciser pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation et d'analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(bodyPar(
  "Pour chacune des mini-situations suivantes, réponds : quel est le problème ? quelle règle est concernée ? est-elle comprise de tous ? l’organisation est-elle équitable ? quelle modification proposerais-tu ?"
));
children.push(calloutBox(
  "Cette règle est-elle juste et sûre ?",
  [
    "Situation 1 : dans un jeu de poursuite, un seul élève est désigné poursuivant pendant toute la durée du jeu, sans jamais changer.",
    "Situation 2 : deux élèves ne sont pas d’accord sur le moment exact où un joueur a été touché, et le jeu s’arrête sans que personne ne sache que faire.",
    "Situation 3 : dans un jeu collectif, deux élèves ne touchent jamais le ballon ou l’objet du jeu, contrairement aux autres.",
    "Pour la situation 2, plusieurs réponses peuvent être acceptées si elles sont correctement justifiées.",
    "Pour chaque situation, identifie le problème, la règle concernée, si elle est bien comprise, si l’organisation est équitable, et propose une modification.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'arbitrage ----
children.push(sectionHeading("Activité d’arbitrage", ""));
children.push(bodyPar(
  "Utilise une fiche très simple pour t’exercer à l’arbitrage : règle observée, décision, signal utilisé, et une justification courte."
));
children.push(threeColTable(
  ["Règle observée", "Décision", "Signal / Justification courte"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 3200, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette activité utilise un petit jeu avec peu de règles, pour permettre à chaque élève-arbitre de réussir. Une rotation des rôles permet à plusieurs élèves d’expérimenter cette responsabilité, sans jamais l’imposer à un élève qui n’est pas encore prêt."
));
children.push(spacer(200));

// ---- Projet culturel court ----
children.push(sectionHeading("Projet culturel court", ""));
children.push(calloutBox(
  "Un jeu de chez nous",
  [
    "Avec l’encadrement de l’enseignant, recueille auprès de ton entourage (famille, voisins, camarades) le nom et les règles d’un jeu physique qu’ils connaissent.",
    "En classe, comparez les variantes rapportées par différents élèves, identifiez les éléments communs, puis construisez ensemble une version scolaire sûre de ce jeu.",
    "Aucune donnée personnelle sensible sur les personnes interrogées ne doit être demandée ou notée : seuls le nom du jeu et ses règles t’intéressent.",
    "Cette activité est une démarche de valorisation culturelle et d’analyse : elle ne prétend jamais prouver une origine historique précise du jeu étudié.",
  ],
  BOX_CULTURE_FILL, BOX_CULTURE_LINE, BOX_CULTURE_TITLE,
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à te comparer aux autres élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je respecte les règles", "", ""],
    ["Je coopère", "", ""],
    ["Je joue sans agressivité", "", ""],
    ["Je peux arbitrer quelques règles", "", ""],
    ["J’accepte une décision", "", ""],
    ["Je peux proposer une adaptation", "", ""],
    ["Je contribue au fair-play", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Un jeu moteur mobilise le corps, l’attention, les décisions et les relations avec les autres.",
  "Les jeux physiques haïtiens font partie d’un patrimoine transmis, avec des variantes selon les régions et les écoles.",
  "Adapter un jeu suit une démarche : objectif, espace, matériel, limites, règles, test, ajustement.",
  "Coopérer demande communication, répartition des rôles, entraide et prise de décision collective.",
  "S’opposer dans le respect exclut totalement agressivité, contacts dangereux et humiliation.",
  "Un arbitre observe, signale, décide avec impartialité, et communique clairement.",
  "Le fair-play se reconnaît à des comportements observables : respect des règles, honnêteté, entraide.",
  "Un désaccord se gère par le dialogue et le respect des règles, jamais par la confrontation physique.",
  "L’équité et l’inclusion demandent d’analyser si tous les élèves peuvent réellement participer.",
  "Créer ou transformer un jeu demande de préciser règles, sécurité, arbitrage et critère de réussite.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "L’élève de 8e AF ne se contente plus de jouer : il analyse, arbitre, adapte et justifie ses choix dans le jeu."
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(11));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(arbitrage - coopération - règle - fair-play - équité - sécurité - adaptation - impartialité)", italics: true, color: "555555" },
]));
[
  "1. Observer, signaler et décider selon des règles communes est le rôle de l’____________________.",
  "2. Travailler ensemble vers un objectif commun s’appelle la ____________________.",
  "3. Un énoncé clair qui organise un jeu et le rend compréhensible par tous s’appelle une ____________________.",
  "4. Respecter les règles, reconnaître une faute et aider un camarade sont des marques de ____________________.",
  "5. Donner à chaque élève une possibilité réelle de participer est une question d’____________________.",
  "6. Vérifier l’espace et le matériel avant une activité est une règle de ____________________.",
  "7. Modifier un jeu pour l’adapter à l’espace ou au nombre d’élèves s’appelle une ____________________.",
  "8. Appliquer la même règle à tous, sans favoriser personne, s’appelle l’____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que doit faire un arbitre avant de prendre une décision ?", opts: ["a) décider immédiatement sans observer", "b) observer attentivement la situation", "c) favoriser son équipe préférée", "d) ignorer la situation"] },
  { q: "2. Pourquoi ce chapitre précise-t-il que les règles des jeux haïtiens présentés peuvent varier ?", opts: ["a) parce que ces jeux n’ont aucune règle précise", "b) parce que les variantes régionales et locales sont réelles et font partie de leur richesse", "c) parce que ces jeux n’existent pas vraiment", "d) pour éviter d’avoir à les expliquer"] },
  { q: "3. Que doit faire un élève face à un désaccord sur une règle pendant un jeu ?", opts: ["a) régler le désaccord par une confrontation physique", "b) arrêter, rappeler la règle, écouter, appliquer la décision et reprendre calmement", "c) ignorer complètement le désaccord et continuer à jouer", "d) exclure immédiatement l’autre élève du jeu"] },
  { q: "4. Qu’est-ce que le fair-play, selon ce chapitre ?", opts: ["a) gagner à tout prix, même en trichant", "b) des comportements observables comme le respect des règles et l’honnêteté", "c) uniquement le fait de féliciter son équipe", "d) une notion qui ne concerne que les compétitions officielles"] },
  { q: "5. Que doit toujours faire un groupe qui conçoit une variante de jeu ?", opts: ["a) inclure des éléments dangereux pour rendre le jeu plus intéressant", "b) préciser règles, sécurité, arbitrage et critère de réussite, puis tester sous supervision", "c) éviter de tester sa proposition", "d) copier exactement un jeu déjà existant sans aucune adaptation"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Arbitrage", "a) Énoncé clair qui organise un jeu et le rend compréhensible par tous"],
  ["2. Coopération", "b) Ensemble de comportements respectueux dans la victoire comme dans la défaite"],
  ["3. Règle", "c) Fait de donner à chacun une possibilité réelle de participer"],
  ["4. Fair-play", "d) Fait d’appliquer la même règle à tous, sans favoriser personne"],
  ["5. Équité", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
  ["6. Impartialité", "f) Fait de travailler ensemble vers un objectif commun"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Deux élèves ne sont pas d’accord sur une règle pendant un jeu et la discussion devient de plus en plus tendue. Explique la démarche à suivre pour résoudre ce désaccord, étape par étape.",
  "2. Un élève-arbitre favorise systématiquement ses amis dans ses décisions. Analyse ce comportement du point de vue de l’impartialité et propose ce que l’enseignant devrait faire.",
  "3. Dans un jeu collectif, deux élèves ne touchent presque jamais le ballon ou l’objet du jeu, contrairement aux autres. Explique pourquoi cette situation pose un problème d’équité et propose une adaptation.",
  "4. Un groupe propose d’intégrer un défi dangereux (par exemple pousser fort un adversaire) dans sa variante de jeu. Explique pourquoi cette proposition doit être refusée, et ce que le groupe pourrait proposer à la place.",
  "5. Après avoir perdu un jeu, un élève se moque ouvertement de ses adversaires. Analyse ce comportement du point de vue du fair-play et explique ce qu’il aurait dû faire à la place.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 137, "Manuel_EPS_8AF_Chapitre11.docx");
console.log("Chapitre 11 (8e AF) genere:", outPath);
