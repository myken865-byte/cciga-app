// Manuel d'EPS 9e AF — Chapitre 9
// Habiletes motrices et qualites physiques appliquees aux sports collectifs
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, chapterOpening,
  exercicesHeading, pageBreak, qcmBlock, spacer, buildAndSave,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
} from "./common.mjs";

const children = [];

// ================= OUVERTURE DE CHAPITRE =================
children.push(...chapterOpening(
  9,
  "Habiletés motrices et qualités physiques appliquées aux sports collectifs",
  "Un joueur très rapide rate sa passe ; un autre, plus lent, la réussit parfaitement. La vitesse ne suffit jamais seule — encore faut-il savoir ce qui, exactement, fait la différence.",
  [
    "Distinguer habileté motrice et qualité physique à un niveau accessible.",
    "Identifier coordination, équilibre, orientation, réaction, précision et adaptation dans des situations collectives.",
    "Comprendre le rôle de la vitesse, de l’endurance, de la force adaptée et de la mobilité dans l’action sportive scolaire.",
    "Relier une qualité physique à une situation concrète de football, basketball ou volleyball.",
    "Observer sa réalisation, analyser une difficulté et proposer un ajustement.",
    "Participer à des activités progressives, sans recherche de performance maximale ni comparaison corporelle.",
    "Respecter récupération, hydratation, espace, matériel et signaux d’arrêt.",
  ],
));

children.push(illustrationBox(
  "ILL-9AF-C09-01",
  "Carte des habiletés et qualités",
  "Infographie sobre présentant neuf petites vignettes reliées à un titre central : coordination, équilibre, orientation, réaction, précision, vitesse, endurance, force adaptée, mobilité. Chaque vignette illustrée par une petite icône simple. Style épuré, sans effet 3D.",
  "Les habiletés motrices et qualités physiques présentées dans ce chapitre.",
  "Offrir une vue d’ensemble claire avant d’entrer dans le détail de chaque notion.",
  "Paysage, format horizontal, infographie pleine largeur.",
));
children.push(spacer(200));

// ---- Activation des acquis ----
children.push(sectionHeading("Activation des acquis", ""));
children.push(bodyPar(
  "Rappelle-toi quelques situations déjà rencontrées dans les Chapitres 3 à 8 : un changement de direction au football, un déplacement après une passe au basketball, une lecture de trajectoire au volleyball."
));
[
  "Quelles capacités permettent de réagir rapidement à une situation ?",
  "Pourquoi la précision compte-t-elle autant que la vitesse ?",
  "Peut-on être efficace avec une seule qualité physique ?",
  "Pourquoi faut-il adapter son effort selon la situation ?",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Situation de jeu → exigence motrice → qualité physique → décision → ajustement : c’est le chemin que suit ce chapitre.",
  { italics: true }
));
children.push(spacer(200));

// ---- 9.1 ----
children.push(sectionHeading("Habiletés motrices et qualités physiques", "9.1"));
children.push(bodyPar(
  "Une habileté motrice est une capacité à organiser un mouvement de façon efficace face à une tâche précise (par exemple : s’orienter sous un ballon avant de le contrôler). Une qualité physique est une ressource plus générale que le corps mobilise pour agir (par exemple : la vitesse, la force ou l’endurance). Ces deux notions sont étroitement liées : une même action sportive combine souvent une ou plusieurs habiletés motrices et une ou plusieurs qualités physiques."
));
children.push(calloutBox(
  "À retenir",
  ["Une habileté motrice organise le mouvement pour une tâche précise ; une qualité physique est une ressource plus générale (vitesse, force, endurance...) que ce mouvement mobilise."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, "1F4E5F",
));
children.push(spacer(200));

// ---- 9.2 ----
children.push(sectionHeading("Coordination", "9.2"));
children.push(bodyPar(
  "La coordination est la capacité à organiser efficacement plusieurs actions corporelles en fonction d’une tâche : courir puis passer, se déplacer puis recevoir, s’orienter sous un ballon avant de le contrôler. Cette habileté se retrouve dans les trois sports collectifs déjà étudiés."
));
children.push(illustrationBox(
  "ILL-9AF-C09-02",
  "Coordination et changement de direction",
  "Séquence scolaire sûre montrant un élève haïtien de 9e AF changeant de direction entre des repères posés au sol (cônes ou marques simples), geste anatomiquement cohérent, environnement scolaire.",
  "La coordination mobilisée dans un changement de direction contrôlé.",
  "Illustrer concrètement la coordination dans une tâche motrice simple et sûre.",
  "Paysage, format horizontal, séquence de 2-3 vignettes.",
));
children.push(spacer(200));

// ---- 9.3 ----
children.push(sectionHeading("Équilibre et contrôle postural", "9.3"));
children.push(bodyPar(
  "Une posture stable et adaptable est essentielle lors des arrêts, des changements de direction, des réceptions et de nombreux gestes techniques. Ce travail ne demande jamais de position extrême : l’équilibre recherché reste toujours fonctionnel et confortable."
));
children.push(spacer(200));

// ---- 9.4 ----
children.push(sectionHeading("Orientation spatiale", "9.4"));
children.push(bodyPar(
  "L’orientation spatiale est la capacité à se situer par rapport au ballon, aux partenaires, aux adversaires, aux lignes du terrain et aux espaces disponibles. Cette capacité, déjà mobilisée dans les trois sports collectifs étudiés, permet de choisir une position utile avant même d’agir."
));
children.push(spacer(200));

// ---- 9.5 ----
children.push(sectionHeading("Réaction et prise d’information", "9.5"));
children.push(bodyPar(
  "Réagir efficacement, c’est relier perception et action : observer un signal, une trajectoire ou un déplacement, puis répondre de manière adaptée. Ce chapitre ne réduit jamais la réaction à la seule vitesse d’exécution : une réaction efficace suppose d’abord d’avoir bien observé la situation."
));
children.push(illustrationBox(
  "ILL-9AF-C09-03",
  "Réaction et orientation",
  "Un élève haïtien de 9e AF observant attentivement un signal ou la trajectoire d’un ballon, puis représenté (dans une seconde vignette) se déplaçant vers une zone adaptée. Style clair, progression visible.",
  "La réaction, reliant observation d’un signal et déplacement adapté.",
  "Illustrer concrètement le lien entre perception et action.",
  "Paysage, format horizontal, séquence de 2 vignettes.",
));
children.push(spacer(200));

// ---- 9.6 ----
children.push(sectionHeading("Précision et contrôle", "9.6"));
children.push(bodyPar(
  "La précision et le dosage interviennent dans les passes, les tirs, les services, les réceptions et toutes les orientations du ballon. La réussite d’une action ne dépend donc pas uniquement de la force ou de la vitesse déployée, mais aussi, et souvent surtout, du contrôle précis du geste."
));
children.push(spacer(200));

// ---- 9.7 ----
children.push(sectionHeading("Vitesse adaptée", "9.7"));
children.push(bodyPar(
  "La vitesse de déplacement et la rapidité d’action se travaillent dans ce chapitre à travers des situations scolaires courtes et contrôlées. Ce chapitre évite tout test maximal, tout surentraînement et toute comparaison humiliante entre élèves : l’objectif reste de mieux utiliser sa vitesse dans une situation de jeu, pas de la maximiser à tout prix."
));
children.push(spacer(200));

// ---- 9.8 ----
children.push(sectionHeading("Endurance", "9.8"));
children.push(bodyPar(
  "L’endurance est la capacité à maintenir une activité adaptée dans le temps, et à récupérer ensuite. Dans les sports collectifs, elle se manifeste par une bonne alternance entre les phases d’effort et les phases de récupération, plutôt que par un effort continu et maximal. Ce chapitre ne prescrit aucun volume d’activité intensif non justifié."
));
children.push(spacer(200));

// ---- 9.9 ----
children.push(sectionHeading("Force adaptée", "9.9"));
children.push(bodyPar(
  "La force adaptée est une ressource utile pour stabiliser une position, pousser, sauter, lancer ou contrôler un mouvement, à travers des tâches scolaires toujours sûres. Ce chapitre exclut strictement tout exercice à charge lourde ou tout défi de force maximale entre élèves."
));
children.push(calloutBox(
  "Sécurité",
  ["Aucune activité de ce chapitre ne recherche l’épuisement, la douleur, le dépassement forcé, la charge maximale ou une compétition physique humiliante entre élèves."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- 9.10 ----
children.push(sectionHeading("Souplesse et mobilité", "9.10"));
children.push(bodyPar(
  "La souplesse et la mobilité désignent l’amplitude fonctionnelle nécessaire à certains mouvements : elles facilitent la préparation du geste et l’aisance gestuelle, sans jamais promouvoir des amplitudes extrêmes ni des positions douloureuses recherchées volontairement."
));
children.push(spacer(200));

// ---- 9.11 ----
children.push(sectionHeading("Combiner plusieurs qualités", "9.11"));
children.push(bodyPar(
  "Une action collective mobilise le plus souvent plusieurs habiletés et qualités en même temps : observation, coordination, vitesse adaptée, équilibre, précision et endurance interviennent rarement de façon isolée."
));
children.push(threeColTable(
  ["Situation", "Habiletés / qualités mobilisées", "Pourquoi"],
  [
    ["Recevoir une passe en mouvement (football)", "Coordination, orientation, précision", "Il faut s’orienter, ajuster sa course et contrôler le ballon en même temps"],
    ["Défendre en reculant (basketball)", "Équilibre, réaction, endurance", "Il faut rester stable, réagir aux déplacements adverses et tenir l’effort dans la durée"],
    ["Réceptionner un service (volleyball)", "Réaction, orientation, précision", "Il faut lire la trajectoire, se placer puis orienter le ballon avec contrôle"],
  ],
  [3000, 3400, 3000],
));
children.push(spacer(200));

// ---- 9.12 ----
children.push(sectionHeading("Football : application", "9.12"));
children.push(bodyPar(
  "Dans une action de contrôle-passe, l’élève mobilise sa coordination (orienter son corps et son geste), sa précision (transmettre le ballon avec exactitude) et son orientation spatiale (situer un partenaire démarqué). Un démarquage réussi combine orientation, réaction et vitesse adaptée. Un bon replacement défensif combine endurance, réaction et orientation. Ce chapitre n’enseigne pas à nouveau les règles ou les techniques déjà présentées : il en analyse les exigences motrices."
));
children.push(illustrationBox(
  "ILL-9AF-C09-04",
  "Football : situation analysée",
  "Scène scolaire de football montrant un élève haïtien de 9e AF réalisant un contrôle orienté puis une passe, avec de petites annotations pédagogiques (flèches, étiquettes) indiquant les habiletés et qualités mobilisées.",
  "Les habiletés et qualités physiques mobilisées dans une action de football.",
  "Illustrer concrètement l’analyse motrice d’une situation de football.",
  "Paysage, format horizontal, plan large avec annotations.",
));
children.push(spacer(200));

// ---- 9.13 ----
children.push(sectionHeading("Basketball : application", "9.13"));
children.push(bodyPar(
  "Un dribble contrôlé combine coordination, équilibre et orientation (garder le regard relevé pour observer l’espace). Une passe suivie d’un déplacement combine précision, réaction et vitesse adaptée. Une réception bien préparée combine coordination et orientation. Un bon replacement défensif combine endurance, réaction et lecture de l’espace disponible."
));
children.push(illustrationBox(
  "ILL-9AF-C09-05",
  "Basketball : passe, déplacement et replacement",
  "Scène scolaire de basketball montrant une passe, un déplacement du joueur après la passe, et un replacement défensif d’un partenaire, avec annotations pédagogiques indiquant les habiletés et qualités mobilisées à chaque étape.",
  "Les habiletés et qualités physiques mobilisées dans une séquence de basketball.",
  "Illustrer concrètement l’analyse motrice d’une situation de basketball.",
  "Paysage, format horizontal, plan large avec annotations.",
));
children.push(spacer(200));

// ---- 9.14 ----
children.push(sectionHeading("Volleyball : application", "9.14"));
children.push(bodyPar(
  "Se déplacer sous la trajectoire d’un ballon combine réaction, orientation et vitesse adaptée. Une manchette ou une passe orientée combine précision, équilibre et coordination. Communiquer puis se replacer combine orientation, réaction et endurance. Ce chapitre met ici l’accent sur l’anticipation, la coordination et la précision, sans reprendre en détail les gestes déjà présentés."
));
children.push(illustrationBox(
  "ILL-9AF-C09-06",
  "Volleyball : lecture de trajectoire",
  "Scène scolaire de volleyball montrant un élève haïtien de 9e AF observant la trajectoire d’un ballon, se déplaçant, puis orientant le ballon vers un partenaire, avec annotations pédagogiques indiquant les habiletés et qualités mobilisées.",
  "Les habiletés et qualités physiques mobilisées dans une séquence de volleyball.",
  "Illustrer concrètement l’analyse motrice d’une situation de volleyball.",
  "Paysage, format horizontal, plan large avec annotations.",
));
children.push(spacer(200));

// ---- 9.15 ----
children.push(sectionHeading("Adapter son effort", "9.15"));
children.push(bodyPar(
  "Un élève module l’intensité, le rythme et la récupération de son effort selon la tâche demandée, les consignes reçues, et son propre état du moment. La douleur ou le malaise impose toujours l’arrêt immédiat de l’activité et l’information de l’enseignant ou d’un adulte responsable."
));
children.push(spacer(200));

// ---- 9.16 ----
children.push(sectionHeading("Observer, analyser, ajuster", "9.16"));
children.push(bodyPar(
  "Une démarche stable permet de progresser : observer le résultat obtenu, identifier une difficulté, en chercher une cause possible liée à la tâche elle-même, modifier un élément précis, puis réessayer sous supervision."
));
children.push(calloutBox(
  "Méthode — Analyser une exigence motrice",
  [
    "Quelle est la tâche ?",
    "Que dois-je observer ?",
    "Quelles habiletés sont nécessaires ?",
    "Quelles qualités physiques interviennent ?",
    "Quel ajustement peut améliorer l’action ?",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Pratiquer dans le contexte scolaire haïtien", ""));
children.push(bodyPar(
  "Les activités de ce chapitre s’adaptent à une cour d’école, un terrain polyvalent, un nombre limité de ballons ou des groupes nombreux, à travers des ateliers, des rotations, des petits groupes et des zones clairement délimitées, avec un matériel scolaire toujours sûr. Aucune activité de ce chapitre ne demande d’équipement coûteux, et aucun objet improvisé dangereux n’est jamais recommandé."
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique — « Circuit des qualités en action »", ""));
children.push(bodyPar(
  "En petits groupes, votre classe réalise un circuit progressif comportant plusieurs ateliers courts. Aucun classement par vitesse, force ou endurance n’est établi : l’objectif est de comprendre et d’améliorer l’action, pas de comparer les élèves entre eux."
));
children.push(threeColTable(
  ["Atelier", "Objectif", "Consigne de sécurité"],
  [
    ["Coordination / déplacement", "Changer de direction en gardant le contrôle du geste", "Espace dégagé, repères stables au sol"],
    ["Précision", "Orienter un geste vers une cible simple", "Distance adaptée, zone de récupération du matériel sécurisée"],
    ["Réaction / orientation", "Répondre rapidement à un signal ou une trajectoire", "Signal clair, espace suffisant entre les élèves"],
    ["Action collective simple", "Combiner plusieurs qualités dans une petite situation de jeu", "Effectif réduit, règles simplifiées par l’enseignant"],
  ],
  [2600, 3600, 3200],
));
children.push(illustrationBox(
  "ILL-9AF-C09-07",
  "Circuit scolaire adapté",
  "Schéma ou scène montrant quatre ateliers scolaires disposés dans une cour ou un espace polyvalent haïtien : coordination/déplacement, précision, réaction/orientation, action collective simple. Élèves haïtiens en activité, ambiance calme et organisée, sans recherche de performance maximale.",
  "Les quatre ateliers du circuit des qualités en action, organisés dans un espace scolaire haïtien.",
  "Illustrer concrètement l’organisation du circuit proposé dans cette activité.",
  "Paysage, format horizontal, plan large.",
));
children.push(bodyPar(
  "Chaque atelier peut être simplifié ou rendu plus exigeant par l’enseignant, selon le niveau réel du groupe, tout en restant toujours dans un cadre sûr.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'OBSERVATION =================
children.push(pageBreak());
children.push(sectionHeading("Activité d’observation — « Quelle qualité intervient ? »", ""));
children.push(bodyPar(
  "Observe les actions suivantes, issues du football, du basketball et du volleyball. Pour chacune, identifie la ou les habiletés et qualités qui te semblent les plus mobilisées, et justifie ta réponse."
));
[
  "Un joueur change brusquement de direction pour éviter un adversaire.",
  "Une joueuse maintient sa position en défense pendant plusieurs minutes, sans jamais relâcher son attention.",
  "Un élève oriente précisément une passe haute vers un partenaire démarqué.",
  "Un joueur réagit immédiatement à un service qui arrive rapidement dans sa zone.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Une même action peut mobiliser plusieurs qualités à la fois : n’hésite pas à en citer plus d’une lorsque cela te semble justifié.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(pageBreak());
children.push(sectionHeading("Activité d’analyse — « Observe et ajuste »", ""));
children.push(illustrationBox(
  "ILL-9AF-C09-08",
  "Analyse d’une situation collective",
  "Grande scène scolaire haïtienne montrant une action collective (football, basketball ou volleyball) avec une réalisation imparfaite mais non dangereuse (par exemple une passe légèrement imprécise), plusieurs élèves visibles avec leurs positions, suffisamment de détails pour permettre plusieurs questions d’observation.",
  "Une situation collective suffisamment riche pour observer, analyser et proposer un ajustement.",
  "Servir de support commun à l’activité d’analyse du chapitre.",
  "Paysage, format horizontal, plan large.",
));
children.push(bodyPar(
  "Observe la situation ci-dessus (une passe imprécise, un déplacement tardif, un manque de replacement ou une mauvaise orientation), puis réponds aux questions suivantes."
));
[
  "Qu’observes-tu précisément dans cette réalisation ?",
  "Quelle habileté ou quelle qualité physique semble en jeu ?",
  "Quel ajustement simple proposerais-tu pour améliorer cette action ?",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Cette activité ne demande jamais de diagnostic médical, ni un jugement sur le corps de l’élève concerné : elle porte uniquement sur l’action motrice observée.",
  { italics: true }
));
children.push(spacer(200));

// ================= AUTOEVALUATION =================
children.push(pageBreak());
children.push(sectionHeading("Autoévaluation", ""));
children.push(calloutBox(
  "Autoévaluation",
  ["Ce bilan personnel t’aide à mesurer ta propre compréhension. Il ne sert jamais à te comparer aux autres élèves."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Distinguer habileté motrice et qualité physique", "", ""],
    ["Identifier plusieurs qualités dans une action", "", ""],
    ["Adapter mon déplacement", "", ""],
    ["Contrôler davantage ma précision", "", ""],
    ["Communiquer avec mes partenaires", "", ""],
    ["Gérer mon effort", "", ""],
    ["Respecter la récupération", "", ""],
    ["Analyser une difficulté", "", ""],
    ["Proposer un ajustement", "", ""],
    ["Respecter la sécurité", "", ""],
  ],
  [3600, 3200, 2400],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Une habileté motrice organise un mouvement pour une tâche précise ; une qualité physique est une ressource plus générale (vitesse, force, endurance...).",
  "Coordination, équilibre, orientation, réaction, précision, vitesse, endurance, force adaptée et mobilité interviennent, souvent ensemble, dans les sports collectifs.",
  "Une action collective mobilise le plus souvent plusieurs habiletés et qualités en même temps, jamais une seule de façon isolée.",
  "Au football, au basketball et au volleyball, les mêmes notions s’appliquent à des gestes différents (contrôle-passe, dribble, manchette...).",
  "Adapter son effort (intensité, rythme, récupération) selon la tâche et son propre état reste une condition indispensable d’une pratique sûre.",
  "Observer un résultat, identifier une difficulté, en chercher une cause, ajuster un élément puis réessayer permet de progresser de façon responsable.",
  "Aucune activité de ce chapitre ne recherche la performance maximale, le surentraînement ou la comparaison corporelle entre élèves.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : définir et distinguer des notions, associer une situation à des habiletés ou qualités physiques, interpréter un schéma, analyser une situation collective, justifier un choix et proposer un ajustement sûr, à partir de situations nouvelles et contextualisées.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(9));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(précision - mobilité - coordination - force - réaction - adaptation - équilibre - vitesse - orientation - endurance)", italics: true, color: "555555" },
]));
[
  "1. La capacité à organiser efficacement plusieurs actions corporelles selon une tâche s’appelle la ____________________.",
  "2. La capacité à maintenir ou retrouver une posture stable s’appelle l’____________________.",
  "3. La capacité à se situer par rapport au ballon, aux partenaires et aux espaces disponibles s’appelle l’____________________.",
  "4. La capacité à observer un signal ou une trajectoire puis à répondre de manière adaptée s’appelle la ____________________.",
  "5. La capacité à adapter un geste à une cible ou à un objectif précis relève de la ____________________.",
  "6. La capacité à réaliser une action rapidement dans une situation donnée s’appelle la ____________________.",
  "7. La capacité à maintenir une activité adaptée dans le temps et à récupérer s’appelle l’____________________.",
  "8. Une ressource utile pour stabiliser, pousser, sauter ou lancer, dans des tâches scolaires sûres, s’appelle la ____________________ adaptée.",
  "9. L’amplitude fonctionnelle nécessaire à certains mouvements, sans amplitude extrême, s’appelle la ____________________.",
  "10. Le fait de modifier son action après l’avoir analysée s’appelle une ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quelle est la différence entre une habileté motrice et une qualité physique, selon ce chapitre ?", opts: ["a) il n’existe aucune différence entre les deux", "b) une habileté motrice organise un mouvement pour une tâche précise, une qualité physique est une ressource comme la vitesse ou la force", "c) les qualités physiques ne concernent que les sports individuels", "d) les habiletés motrices ne s’appliquent qu’au football"] },
  { q: "2. Pourquoi la précision compte-t-elle autant que la vitesse dans une action sportive ?", opts: ["a) la vitesse seule garantit toujours la réussite d’une action", "b) une action rapide mais imprécise n’est souvent pas efficace pour l’équipe", "c) la précision n’a aucune importance dans les sports collectifs", "d) seule la force détermine la réussite d’une passe"] },
  { q: "3. Que doit faire un élève qui ressent une douleur, un malaise ou un vertige pendant une activité de ce chapitre ?", opts: ["a) continuer sans en parler", "b) arrêter immédiatement et prévenir l’enseignant ou un adulte responsable", "c) attendre la fin du cours pour en parler", "d) demander à un camarade de continuer à sa place"] },
  { q: "4. Qu’est-ce qu’une action collective mobilise le plus souvent, selon ce chapitre ?", opts: ["a) une seule qualité physique isolée", "b) plusieurs habiletés et qualités physiques en même temps", "c) uniquement la force maximale", "d) uniquement la vitesse maximale"] },
  { q: "5. Que recommande ce chapitre au sujet de la souplesse et de la mobilité ?", opts: ["a) rechercher des amplitudes extrêmes pour progresser plus vite", "b) une amplitude fonctionnelle adaptée, sans amplitude extrême ni douleur recherchée", "c) comparer la souplesse des élèves entre eux", "d) éviter complètement ce travail"] },
  { q: "6. Selon la méthode « Analyser une exigence motrice », que doit-on faire après avoir identifié les habiletés et qualités physiques nécessaires à une tâche ?", opts: ["a) recommencer l’observation depuis le début", "b) proposer un ajustement qui peut améliorer l’action", "c) arrêter immédiatement l’activité", "d) comparer sa performance à celle des autres élèves"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque notion de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Coordination", "a) Capacité à observer un signal ou une trajectoire puis à répondre de manière adaptée"],
  ["2. Équilibre", "b) Capacité à adapter un geste à une cible ou à un objectif précis"],
  ["3. Orientation", "c) Capacité à réaliser une action rapidement dans une situation donnée"],
  ["4. Réaction", "d) Capacité à maintenir une activité adaptée dans le temps et à récupérer"],
  ["5. Précision", "e) Ressource utile pour stabiliser, pousser, sauter ou lancer, dans des tâches scolaires sûres"],
  ["6. Vitesse", "f) Capacité à organiser efficacement plusieurs actions corporelles selon une tâche"],
  ["7. Endurance", "g) Capacité à maintenir ou retrouver une posture stable"],
  ["8. Force adaptée", "h) Capacité à se situer par rapport au ballon, aux partenaires et aux espaces disponibles"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un joueur est très rapide mais réalise souvent des passes imprécises. Explique pourquoi la vitesse seule ne suffit pas, et propose un ajustement qui pourrait l’aider à progresser.",
  "2. Un élève se déplace toujours trop tard vers un ballon qui arrive. Identifie la ou les capacités qui semblent en jeu, et propose un ajustement simple.",
  "3. Un groupe enchaîne plusieurs efforts intenses sans jamais prévoir de récupération. Explique pourquoi cette organisation pose problème, et propose une amélioration.",
  "4. Décris une action de football, de basketball ou de volleyball qui mobilise, selon toi, au moins trois qualités ou habiletés différentes en même temps. Explique comment elles se combinent.",
  "5. Propose un atelier plus sûr pour remplacer une activité qui rechercherait uniquement la performance maximale ou la comparaison entre élèves.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 108, "Manuel_EPS_9AF_Chapitre9.docx");
console.log("Chapitre 9 (9e AF) genere:", outPath);
