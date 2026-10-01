import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(2, "Capacités physiques et motrices : coordination, vitesse, endurance, force adaptée et souplesse"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Quand tu cours, dribbles un ballon, sautes ou réalises un équilibre, ton corps mobilise plusieurs ressources en même temps : de la coordination, de la vitesse, de l’endurance, de la force ou de la souplesse. Ce chapitre t’aide à identifier ces capacités, à comprendre comment elles interviennent dans des situations variées, et à observer la façon dont tu les mobilises toi-même."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Identifier, comprendre et mobiliser plusieurs capacités physiques et motrices dans des situations scolaires variées, en développant ta capacité à observer ta manière d’agir, choisir une réponse adaptée, exécuter avec contrôle et ajuster ton action, dans une progression vers davantage d’autonomie."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "définir simplement les notions de capacité physique et de capacité motrice ;",
  "distinguer coordination, vitesse, endurance, force adaptée et souplesse, sans les considérer comme totalement indépendantes ;",
  "identifier les capacités principalement mobilisées dans différentes situations d’EPS ;",
  "réaliser des tâches simples permettant de mobiliser et d’observer ces capacités ;",
  "comprendre qu’une même activité peut mobiliser plusieurs capacités en même temps ;",
  "adapter ton engagement à la tâche et aux consignes ;",
  "observer ta progression avec des critères simples, sans comparaison humiliante avec les autres ;",
  "utiliser un vocabulaire EPS plus précis pour décrire une action motrice ;",
  "appliquer les règles de sécurité liées aux exercices proposés.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Capacité physique, capacité motrice, coordination, vitesse, endurance, force adaptée, souplesse, mobilité, allure, ajustement.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis de 7e AF"));
children.push(bodyPar(
  "Avant d’aller plus loin, réponds mentalement (ou à l’oral avec la classe) à ces quelques questions, sans relire tes notes de 7e AF :"
));
[
  "Quand tu te déplaces rapidement dans un jeu, quelles parties de ton corps travaillent ensemble ?",
  "Pourquoi t’échauffes-tu avant une activité physique ?",
  "Que ressens-tu dans ton corps pendant un effort plus long, comme une course d’endurance ?",
  "Que dois-tu faire si tu ressens une douleur inhabituelle pendant une activité ?",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Ces questions mobilisent des acquis déjà installés l’an dernier : le mouvement, l’effort, l’échauffement, la récupération et la sécurité. Ce chapitre ne va pas reprendre ces leçons en détail : il va s’appuyer dessus pour aller plus loin, avec la même méthode que celle vue au chapitre 1 : observer → choisir → agir → ajuster."
));
children.push(spacer(160));

// ================= 2.1 =================
children.push(sectionHeading("Capacités physiques et motrices : de quoi parle-t-on ?", "2.1"));
children.push(bodyPar(
  "Une capacité est une ressource qui te permet d’agir efficacement dans une situation motrice. Certaines capacités sont surtout liées à l’effort que ton corps doit fournir (par exemple courir vite, ou courir longtemps), tandis que d’autres sont surtout liées au contrôle et à l’organisation de ton mouvement (par exemple coordonner tes gestes, ou réaliser un mouvement avec une bonne amplitude)."
));
children.push(bodyPar(
  "Ces deux familles ne sont jamais complètement séparées : dans une passe de basket-ball, par exemple, tu as besoin à la fois de coordination (pour réaliser le geste correctement) et d’un minimum de force adaptée (pour envoyer le ballon avec la bonne intensité). Ce chapitre présente cinq capacités que tu vas retrouver tout au long de l’année : la coordination, la vitesse, l’endurance, la force adaptée et la souplesse."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C02-01",
  "Carte pédagogique des cinq capacités",
  "Réaliser un schéma central avec le mot « Capacités physiques et motrices » au centre, relié par des flèches à cinq bulles représentant chacune une capacité : coordination, vitesse, endurance, force adaptée, souplesse/mobilité. Pour chaque bulle, ajouter une petite icône représentant un élève haïtien de 8e AF en action illustrant cette capacité (par exemple courir pour la vitesse, s’étirer pour la souplesse).",
  "Les cinq capacités physiques et motrices étudiées dans ce chapitre, reliées entre elles.",
  "Offrir à l’élève une vue d’ensemble des cinq capacités avant leur étude détaillée.",
  "Paysage, format horizontal, schéma central.",
));
children.push(spacer(200));

// ================= 2.2 =================
children.push(sectionHeading("La coordination", "2.2"));
children.push(bodyPar(
  "La coordination est la capacité à organiser plusieurs actions du corps de manière adaptée et contrôlée. Elle se développe notamment à travers la coordination entre les bras et les jambes, la coordination avec un objet (comme un ballon), les changements de direction, le rythme et la précision du geste."
));
children.push(bodyPar(
  "Tu mobilises ta coordination dans presque toutes les activités physiques : en course (bras et jambes qui travaillent ensemble), dans les jeux de ballon (main et regard coordonnés), dans les sauts (élan et impulsion synchronisés), en gymnastique (enchaînement de mouvements), mais aussi dans des actions quotidiennes comme monter un escalier rapidement. Les situations proposées pour la développer restent progressives, jamais acrobatiques."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C02-02",
  "Parcours de coordination",
  "Dessiner un petit parcours dans une cour d’école haïtienne sécurisée, avec des repères au sol (cônes, lignes tracées à la craie) organisant des changements de direction, et un élève haïtien de 8e AF en train de le suivre avec un ballon, montrant une bonne coordination entre déplacement et contrôle de l’objet.",
  "Un parcours de coordination combinant déplacement, changement de direction et contrôle d’un objet.",
  "Illustrer concrètement une situation scolaire mobilisant la coordination, en lien avec l’Activité 1.",
  "Paysage, format horizontal, vue d’ensemble du parcours.",
));
children.push(spacer(200));

// ================= 2.3 =================
children.push(sectionHeading("La vitesse", "2.3"));
children.push(bodyPar(
  "La vitesse est la capacité à réaliser une action ou un déplacement rapidement dans une situation donnée. On peut distinguer, de façon simple, trois éléments : la réaction à un signal (le temps entre le signal et le début du mouvement), l’accélération (l’augmentation progressive de la vitesse), et le maintien d’une vitesse élevée sur une courte durée."
));
children.push(bodyPar(
  "Ces notions te seront utiles pour les futures unités de courses de vitesse et de relais, que tu approfondiras au chapitre 5. À ce stade, il ne s’agit jamais de rechercher l’épuisement ni de multiplier les efforts maximaux : les tâches proposées restent courtes et bien récupérées."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C02-03",
  "Réaction à un signal et accélération courte",
  "Dessiner un élève haïtien de 8e AF en position de départ derrière une ligne clairement tracée, prêt à réagir à un signal (par exemple un professeur avec un sifflet visible), avec une zone d’accélération courte et bien délimitée devant lui, et une zone de récupération après la ligne d’arrivée.",
  "Réagir à un signal, puis accélérer sur une courte distance clairement délimitée.",
  "Illustrer une situation scolaire sécurisée de réaction et d’accélération courte, en lien avec l’Activité 2.",
  "Paysage, format horizontal, vue latérale du couloir de course.",
));
children.push(spacer(200));

// ================= 2.4 =================
children.push(sectionHeading("L’endurance", "2.4"));
children.push(bodyPar(
  "L’endurance est la capacité à poursuivre un effort adapté pendant une certaine durée, en gérant son rythme. Contrairement à la vitesse, elle ne cherche pas la rapidité maximale, mais la régularité : garder une allure que l’on peut maintenir, sans s’épuiser trop rapidement."
));
children.push(bodyPar(
  "Ce chapitre met l’accent sur la gestion de l’allure, la régularité et l’écoute de tes propres sensations, plutôt que sur une compétition de distance entre élèves. Ces notions préparent directement le chapitre 3, consacré à l’effort physique, à la respiration, à la fréquence cardiaque et à la récupération. Aucune intensité ou distance identique n’est imposée à tous les élèves : l’enseignant adapte toujours la tâche."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Dans une activité physique, plusieurs capacités peuvent être mobilisées en même temps."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C02-04",
  "Gestion de l’allure",
  "Dessiner un petit groupe de 3 à 4 élèves haïtiens de 8e AF se déplaçant en petite foulée régulière autour d’un espace scolaire délimité (cour ou terrain polyvalent), sous la supervision visible de l’enseignant, avec une expression calme et maîtrisée plutôt qu’un effort intense.",
  "Un petit groupe d’élèves qui cherche à maintenir une allure régulière, sous supervision.",
  "Illustrer une situation scolaire de gestion de l’allure, en lien avec l’Activité 3.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ================= 2.5 =================
children.push(sectionHeading("La force adaptée", "2.5"));
children.push(bodyPar(
  "Dans un cadre scolaire, la force adaptée est la capacité à produire ou contrôler une action musculaire adaptée à une tâche précise, et non la recherche d’une force maximale. Elle se travaille uniquement à travers des situations sûres : des actions utilisant le poids du corps de façon adaptée, la manipulation d’objets légers prévus par l’enseignant, ou des poussées et résistances pédagogiques contrôlées lorsque cela est pertinent."
));
children.push(bodyPar(
  "Ce chapitre ne propose jamais de charges lourdes, de recherche de force maximale, de musculation spécialisée ni de défi de puissance entre élèves. L’important est la posture, le contrôle du geste, la progressivité de la difficulté et la sécurité à chaque étape."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C02-05",
  "Force adaptée et contrôle postural",
  "Dessiner un élève haïtien de 8e AF réalisant une action simple mobilisant une force adaptée, par exemple une poussée contrôlée contre un ballon lesté léger tenu par un partenaire, ou un appui au sol avec le poids du corps (par exemple une position de gainage simple), avec une posture clairement correcte et contrôlée. Aucune charge visible.",
  "Une action de force adaptée, avec une posture contrôlée et sans charge lourde.",
  "Illustrer une situation scolaire sûre mobilisant la force adaptée, en lien avec l’Activité 4.",
  "Portrait, format vertical, plan rapproché sur la posture.",
));
children.push(spacer(200));

// ================= 2.6 =================
children.push(sectionHeading("La souplesse et la mobilité", "2.6"));
children.push(bodyPar(
  "La souplesse est la capacité à réaliser certains mouvements avec une amplitude adaptée. On distingue, de façon pédagogique, la mobilité articulaire (le fait de pouvoir bouger une articulation dans son amplitude naturelle) et la recherche d’amplitude (aller un peu plus loin dans un mouvement, toujours progressivement), sans entrer dans une technicité excessive."
));
children.push(bodyPar(
  "Une règle est absolue : il ne faut jamais forcer une articulation, ni demander à un élève de supporter une douleur pour aller plus loin dans un mouvement. Les différences de souplesse d’un élève à l’autre sont parfaitement normales, et ne doivent jamais donner lieu à une comparaison des corps."
));
children.push(spacer(160));

children.push(calloutBox(
  "Sécurité",
  ["En travaillant la souplesse ou la mobilité, arrête toujours un mouvement dès que tu ressens une douleur : la souplesse ne se force jamais."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C02-06",
  "Mobilité contrôlée",
  "Dessiner un élève haïtien de 8e AF réalisant un mouvement de mobilité articulaire simple et anatomiquement cohérent (par exemple une rotation d’épaule ou une flexion de hanche modérée), sans amplitude extrême ni expression de douleur, dans un contexte scolaire haïtien.",
  "Un mouvement de mobilité simple, réalisé sans forcer l’amplitude.",
  "Illustrer une situation scolaire sûre de travail de la mobilité, en lien avec l’Activité 5.",
  "Portrait, format vertical, plan rapproché sur le mouvement.",
));
children.push(spacer(200));

// ================= 2.7 =================
children.push(sectionHeading("Des capacités qui travaillent ensemble", "2.7"));
children.push(bodyPar(
  "Aucune activité physique ne mobilise une seule capacité de façon isolée. Le tableau suivant montre comment différentes situations scolaires mobilisent plusieurs capacités à des degrés différents."
));
children.push(threeColTable(
  ["Situation motrice", "Capacité dominante", "Capacités complémentaires"],
  [
    ["Un relais de course", "Vitesse", "Coordination (transmission), endurance légère"],
    ["Une action de football (dribble puis tir)", "Coordination", "Vitesse, force adaptée (frappe du ballon)"],
    ["Un saut en longueur", "Coordination", "Vitesse (élan), force adaptée (impulsion)"],
    ["Un parcours scolaire de plusieurs minutes", "Endurance", "Coordination, gestion de l’allure"],
    ["Un enchaînement de gymnastique", "Souplesse et coordination", "Force adaptée (maintien de positions), contrôle"],
  ],
  [3200, 2600, 3600],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette analyse n’est jamais une classification rigide ou scientifique stricte : il s’agit d’un outil pédagogique pour t’aider à identifier ce qui est le plus sollicité dans une situation donnée, tout en reconnaissant que d’autres capacités interviennent aussi."
));
children.push(spacer(160));

// ================= 2.8 =================
children.push(sectionHeading("Observer et ajuster son action", "2.8"));
children.push(bodyPar(
  "Comme au chapitre 1, tu vas réutiliser la méthode observer → choisir → agir → ajuster pour progresser dans les tâches de ce chapitre. Une grille d’observation simple, et non comparative, peut t’aider :"
));
[
  "le contrôle du mouvement (le geste est-il maîtrisé ?) ;",
  "le respect de la consigne (la tâche demandée a-t-elle été suivie ?) ;",
  "la régularité (l’action est-elle répétée de façon stable ?) ;",
  "la précision (le geste atteint-il l’objectif visé ?) ;",
  "la gestion de l’effort (l’intensité est-elle adaptée à la durée de la tâche ?) ;",
  "la sécurité (les consignes de sécurité sont-elles respectées ?).",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Après une tâche, essaie d’identifier un point réussi et un point à améliorer, plutôt que de te comparer à un autre élève."
));
children.push(spacer(120));

children.push(calloutBox(
  "Méthode",
  ["Observer → Choisir → Agir → Ajuster : applique ce cycle à chaque tâche de ce chapitre. Par exemple, observe la distance du parcours de coordination, choisis ta vitesse de déplacement, agis, puis ajuste ton rythme si tu perds le contrôle du ballon."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Les cinq capacités présentées dans ce chapitre ne sont pas figées : elles se développent à des rythmes différents selon les élèves, et évoluent tout au long de la croissance. C’est pourquoi il n’existe jamais un seul « bon » niveau à atteindre au même moment pour tous les élèves d’une classe."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Le parcours de coordination",
  [
    "Objectif : mobiliser la coordination à travers des déplacements contrôlés et des changements de direction.",
    "Organisation : petit parcours individuel, réalisé à tour de rôle, avec plusieurs changements de direction.",
    "Matériel : cônes ou repères souples, éventuellement un ballon pour une variante avec contrôle d’objet.",
    "Consignes : suivre le parcours en gardant le contrôle de ses déplacements, en respectant l’ordre des repères, avec ou sans ballon selon la variante proposée.",
    "Sécurité : attendre que le parcours soit libre ; garder une distance suffisante avec les autres élèves.",
    "Critères de réussite : terminer le parcours en gardant le contrôle du déplacement (et du ballon si utilisé), sans sortir des repères.",
    "Adaptation possible : réduire le nombre de changements de direction ou la vitesse de déplacement selon le niveau de l’élève.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Réagir et accélérer",
  [
    "Objectif : mobiliser la vitesse à travers la réaction à un signal et une courte accélération.",
    "Organisation : élèves par petits groupes, à tour de rôle, avec une distance courte adaptée par l’enseignant.",
    "Matériel : lignes tracées au sol (départ et arrivée), signal sonore ou visuel.",
    "Consignes : réagir au signal, accélérer sur la courte distance, puis ralentir progressivement dans la zone prévue après l’arrivée.",
    "Sécurité : prévoir une zone de récupération dégagée après la ligne d’arrivée ; respecter un temps de récupération entre deux essais.",
    "Critères de réussite : réagir au signal sans anticiper, et maintenir une trajectoire contrôlée jusqu’à l’arrivée.",
    "Adaptation possible : allonger le temps de récupération entre les essais selon les besoins des élèves.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Trouver mon allure",
  [
    "Objectif : mobiliser l’endurance à travers la recherche d’un rythme régulier.",
    "Organisation : petit groupe se déplaçant ensemble ou individuellement dans un espace délimité, pendant une durée modérée définie par l’enseignant.",
    "Matériel : repères délimitant l’espace de déplacement.",
    "Consignes : chercher un rythme de déplacement que tu peux maintenir sans t’épuiser, en observant ta respiration et tes sensations.",
    "Sécurité : ralentir ou s’arrêter dès qu’un signe inhabituel de fatigue ou de malaise apparaît, et le signaler à l’enseignant.",
    "Critères de réussite : maintenir un rythme relativement stable pendant la durée proposée, sans accélération ni ralentissement brusque.",
    "Adaptation possible : réduire la durée ou proposer une marche active plutôt qu’un petit trot, selon les besoins.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Contrôler mon action",
  [
    "Objectif : mobiliser une force adaptée et le contrôle postural, sans charge lourde.",
    "Organisation : individuellement ou en binômes, selon la tâche choisie par l’enseignant.",
    "Matériel : objets légers prévus par l’enseignant si nécessaire (par exemple un ballon léger).",
    "Consignes : réaliser l’action proposée (par exemple une poussée contrôlée, un appui au sol maintenu quelques secondes) en gardant une posture stable et contrôlée.",
    "Sécurité : ne jamais forcer au-delà de ce que le corps peut contrôler ; arrêter en cas de douleur.",
    "Critères de réussite : maintenir une posture stable et contrôlée pendant toute la durée de l’action demandée.",
    "Adaptation possible : réduire la durée de maintien ou l’intensité de la poussée selon les capacités de l’élève.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Mobilité en contrôle",
  [
    "Objectif : mobiliser la souplesse et la mobilité articulaire, sans forcer l’amplitude.",
    "Organisation : individuellement, chaque élève dans son propre espace.",
    "Matériel : aucun matériel indispensable.",
    "Consignes : réaliser quelques mouvements de mobilité simples (épaules, hanches, chevilles), lentement et sans à-coups, en s’arrêtant avant toute sensation de douleur.",
    "Sécurité : ne jamais forcer une articulation ; arrêter immédiatement en cas de douleur.",
    "Critères de réussite : réaliser les mouvements proposés de façon contrôlée, sans jamais dépasser une amplitude confortable.",
    "Adaptation possible : réduire l’amplitude ou le nombre de répétitions selon le confort de chaque élève.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation et d'analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(bodyPar(
  "Pour chacune des situations suivantes, identifie la capacité qui te semble dominante, justifie ton choix, indique une capacité complémentaire éventuelle, puis propose un ajustement qui permettrait de mieux réussir la tâche."
));
children.push(calloutBox(
  "Quelle capacité est mobilisée ?",
  [
    "Situation 1 : un élève court le plus vite possible sur une courte distance pour rattraper un ballon avant qu’il ne sorte du terrain.",
    "Situation 2 : un élève maintient un rythme de course régulier pendant plusieurs minutes sans s’essouffler excessivement.",
    "Situation 3 : un élève dribble un ballon tout en changeant plusieurs fois de direction pour éviter un adversaire.",
    "Situation 4 : un élève maintient une position d’équilibre stable sur un pied pendant plusieurs secondes.",
    "Situation 5 : un élève réalise une poussée contrôlée pour faire une passe précise à un partenaire éloigné.",
    "Pour chaque situation, réponds : quelle capacité semble dominante ? Pourquoi ? Quelle capacité complémentaire intervient aussi ? Que pourrait ajuster l’élève pour mieux réussir ?",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C02-07",
  "Analyse d’une situation motrice",
  "Dessiner une scène scolaire haïtienne montrant un élève réalisant une action motrice combinant plusieurs capacités (par exemple un élève dribblant un ballon tout en changeant de direction, mobilisant à la fois coordination et vitesse), avec un camarade qui observe attentivement à distance, comme pour analyser la situation.",
  "Une situation motrice mobilisant plusieurs capacités en même temps, observée par un camarade.",
  "Servir de support visuel à l’activité d’observation et d’analyse « Quelle capacité est mobilisée ? ».",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique dans ce chapitre. Utilise « je réussis », « je progresse » ou « j’ai encore besoin d’aide » : ce tableau ne sert jamais à te classer par rapport aux autres élèves, ni à évaluer ton apparence physique."
));
children.push(threeColTable(
  ["Capacité ou compétence", "Je réussis / Je progresse / J’ai encore besoin d’aide", "Un exemple personnel"],
  [
    ["Coordination", "", ""],
    ["Gestion de l’allure (endurance)", "", ""],
    ["Réaction à un signal (vitesse)", "", ""],
    ["Contrôle postural (force adaptée)", "", ""],
    ["Respect des consignes de sécurité", "", ""],
    ["Capacité à expliquer mon action", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Une capacité physique ou motrice est une ressource qui permet d’agir efficacement dans une situation motrice.",
  "La coordination organise plusieurs actions du corps de façon adaptée et contrôlée.",
  "La vitesse combine réaction à un signal, accélération et maintien d’une vitesse sur une courte durée.",
  "L’endurance demande de gérer son allure et de rester régulier plutôt que de rechercher la vitesse maximale.",
  "La force adaptée se travaille uniquement dans des situations sûres, sans charge lourde ni recherche de puissance maximale.",
  "La souplesse et la mobilité s’exercent progressivement, sans jamais forcer une articulation.",
  "Une même situation motrice mobilise plusieurs capacités en même temps, à des degrés différents.",
  "La méthode observer → choisir → agir → ajuster, associée à une grille d’observation simple, aide à progresser dans chaque tâche.",
  "L’autoévaluation utilise des critères simples et non comparatifs, jamais liés à l’apparence physique.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(2));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(coordination - activité - vitesse - mobilité - contrôle - allure - capacité - sécurité)", italics: true, color: "555555" },
]));
[
  "1. Une ____________________ est une ressource qui permet d’agir efficacement dans une situation motrice.",
  "2. Organiser plusieurs actions du corps de manière adaptée s’appelle la ____________________.",
  "3. Réagir à un signal puis accélérer sur une courte distance mobilise surtout la ____________________.",
  "4. Gérer son ____________________ permet de maintenir un effort régulier sur une plus longue durée.",
  "5. Réaliser un mouvement articulaire simple sans forcer l’amplitude relève de la ____________________.",
  "6. Maintenir une posture stable pendant une action de force adaptée demande du ____________________.",
  "7. Ne jamais forcer une articulation ni supporter une douleur est une règle de ____________________.",
  "8. Observer, choisir, agir puis ajuster t’aide à progresser dans chaque ____________________ proposée.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que signifie « une même activité peut mobiliser plusieurs capacités » ?", opts: ["a) chaque activité ne mobilise qu’une seule capacité isolée", "b) une action motrice sollicite souvent plusieurs capacités à des degrés différents", "c) les capacités ne peuvent jamais être combinées entre elles", "d) seule la vitesse est réellement utile en EPS"] },
  { q: "2. Un élève court le plus vite possible pour rattraper un ballon avant qu’il ne sorte du terrain. Quelle capacité est ici la plus directement mobilisée ?", opts: ["a) la souplesse", "b) la vitesse", "c) la force maximale", "d) l’endurance de longue durée"] },
  { q: "3. Que recommande ce chapitre au sujet de la force en 8e AF ?", opts: ["a) rechercher une force maximale avec des charges lourdes", "b) utiliser uniquement des situations sûres, sans charge lourde ni recherche de puissance maximale", "c) comparer la force des élèves entre eux", "d) éviter complètement de travailler la force adaptée"] },
  { q: "4. Que doit faire un élève qui ressent une douleur pendant un exercice de mobilité ?", opts: ["a) continuer un peu plus pour gagner en amplitude", "b) arrêter immédiatement le mouvement", "c) demander à un camarade de l’aider à forcer davantage", "d) ignorer la douleur si elle est légère"] },
  { q: "5. Dans la méthode observer-choisir-agir-ajuster, à quel moment évalue-t-on si la réponse choisie a fonctionné ?", opts: ["a) avant d’observer la situation", "b) au moment de choisir une réponse", "c) après avoir agi, au moment d’ajuster", "d) cette méthode ne prévoit aucune évaluation"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition ou son exemple correspondant dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Coordination", "a) Capacité à réaliser une action rapidement dans une situation donnée"],
  ["2. Vitesse", "b) Capacité à poursuivre un effort adapté en gérant son rythme"],
  ["3. Endurance", "c) Capacité à réaliser certains mouvements avec une amplitude adaptée"],
  ["4. Force adaptée", "d) Ressource mobilisée pour agir efficacement dans une situation motrice"],
  ["5. Souplesse", "e) Capacité à organiser plusieurs actions du corps de façon contrôlée"],
  ["6. Capacité", "f) Capacité à produire ou contrôler une action musculaire adaptée à une tâche"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Choisis une situation de jeu collectif que tu as déjà pratiquée (football, basket-ball ou volley-ball). Identifie la capacité qui te semble la plus mobilisée, et justifie ton choix en expliquant précisément ce que fait le corps dans cette situation.",
  "2. Un camarade démarre une course d’endurance beaucoup trop vite, puis doit s’arrêter avant la fin. Explique, en utilisant la notion de gestion de l’allure, ce qu’il aurait pu ajuster, et pourquoi.",
  "3. Explique pourquoi ce chapitre insiste sur le fait que la souplesse ne doit jamais être forcée, même si un élève souhaite progresser plus vite que les autres.",
  "4. En t’appuyant sur la méthode observer-choisir-agir-ajuster, décris comment tu procéderais pour améliorer ta coordination dans un parcours que tu réussis mal la première fois.",
  "5. Pourquoi ce chapitre refuse-t-il de proposer des charges lourdes ou une recherche de force maximale pour des élèves de 8e AF ? Appuie ta réponse sur des arguments liés à la sécurité et au développement de l’élève.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 11, "Manuel_EPS_8AF_Chapitre2.docx");
console.log("Chapitre 2 (8e AF) genere:", outPath);
