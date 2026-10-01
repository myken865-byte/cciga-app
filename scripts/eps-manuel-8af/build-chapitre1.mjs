import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(1, "L’EPS en 8e AF : corps, mouvement, autonomie et responsabilité"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Tu entres cette année en 8e Année Fondamentale. En EPS, tu ne pars pas de zéro : tu as déjà appris, en 7e AF, à t’échauffer, à jouer collectivement, à courir, sauter, lancer, réaliser des équilibres simples, et à adopter des habitudes de sécurité et de santé. Cette année, l’EPS te demande d’aller plus loin : non plus seulement exécuter un mouvement, mais observer une situation, choisir une réponse adaptée, agir, puis ajuster, tout en devenant progressivement plus autonome et responsable."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Comprendre le rôle particulier de l’EPS en 8e AF et la progression attendue par rapport à la 7e AF, en développant une meilleure connaissance de son corps et de son mouvement, ainsi qu’une pratique physique plus autonome, responsable et réfléchie."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "expliquer le rôle de l’EPS en 8e AF et la progression attendue par rapport à l’année précédente ;",
  "identifier les principales composantes du mouvement : posture, équilibre, coordination, contrôle et adaptation ;",
  "observer une situation motrice, choisir une réponse adaptée, agir, puis ajuster ta réponse ;",
  "développer autonomie, responsabilité, coopération et autoévaluation dans ta pratique ;",
  "appliquer les règles de sécurité et respecter les autres, les espaces et le matériel.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Posture, équilibre, coordination, contrôle, adaptation, autonomie, responsabilité, coopération, autoévaluation, sécurité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis : ce que tu as déjà appris en 7e AF"));
children.push(bodyPar(
  "Avant de commencer, prends un moment pour te rappeler ce que tu as déjà appris l’an dernier. Ces bases ne seront pas répétées en détail cette année : elles seront réutilisées et approfondies."
));
[
  "l’échauffement progressif, la sécurité et la prévention des risques ;",
  "les réactions du corps à l’effort : respiration, cœur, récupération ;",
  "la pratique collective : football, basket-ball, volley-ball ;",
  "l’athlétisme : courir, sauter, lancer ;",
  "des équilibres et des enchaînements simples en gymnastique ;",
  "des habitudes de santé, d’hygiène et de responsabilité.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Cette année, tu vas utiliser ces acquis pour aller plus loin : maîtriser des gestes plus précis, analyser des situations, choisir tes réponses, coopérer davantage, justifier tes choix et t’autoévaluer."
));
children.push(spacer(160));

// ================= 1.1 =================
children.push(sectionHeading("Le rôle de l’EPS en 8e AF", "1.1"));
children.push(bodyPar(
  "En 7e AF, l’EPS t’a surtout permis de découvrir : découvrir de nouvelles activités, de nouveaux gestes, de nouvelles règles. En 8e AF, l’objectif change de nature : il ne s’agit plus seulement de découvrir, mais de progresser vers six capacités plus exigeantes, qui accompagneront toute ta pratique de l’année."
));
children.push(threeColTable(
  ["Capacité", "Ce que cela signifie", "Exemple concret"],
  [
    ["Maîtriser", "Réaliser un geste avec plus de précision et de contrôle qu’en 7e AF.", "Réussir une passe précise plutôt qu’une passe approximative."],
    ["Analyser", "Observer une situation avant d’agir, pour mieux comprendre ce qui se passe.", "Repérer où se trouve un espace libre avant de se déplacer."],
    ["Choisir", "Sélectionner la réponse la plus adaptée parmi plusieurs possibles.", "Décider de passer le ballon plutôt que de tirer, selon la situation."],
    ["Coopérer", "Travailler avec les autres pour atteindre un objectif commun.", "Organiser un relais avec ses coéquipiers."],
    ["Justifier", "Expliquer pourquoi on a fait un choix, avec des arguments.", "Expliquer pourquoi on a choisi de ralentir son allure de course."],
    ["S’autoévaluer", "Observer ses propres progrès avec des critères simples.", "Reconnaître que son équilibre est plus stable qu’au début de l’année."],
  ],
  [1800, 4000, 3400],
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["En 8e AF, l’EPS ne se limite plus à exécuter un mouvement : elle te demande d’observer, de choisir, de coopérer, de justifier et de t’autoévaluer."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(200));

// ================= 1.2 =================
children.push(sectionHeading("Corps et mouvement : cinq composantes essentielles", "1.2"));
children.push(bodyPar(
  "Tout mouvement, quel que soit le sport ou l’activité pratiquée, repose sur cinq composantes essentielles que tu vas retrouver tout au long de l’année."
));
children.push(bulletMixed([{ text: "La posture : ", bold: true }, { text: "la façon dont les différentes parties de ton corps sont alignées et organisées, au repos comme en mouvement." }]));
children.push(bulletMixed([{ text: "L’équilibre : ", bold: true }, { text: "ta capacité à maintenir, ou à retrouver rapidement, une position stable." }]));
children.push(bulletMixed([{ text: "La coordination : ", bold: true }, { text: "l’organisation harmonieuse de plusieurs mouvements réalisés en même temps ou l’un après l’autre." }]));
children.push(bulletMixed([{ text: "Le contrôle : ", bold: true }, { text: "la maîtrise volontaire d’un geste, pour qu’il soit précis plutôt qu’approximatif." }]));
children.push(bulletMixed([{ text: "L’adaptation : ", bold: true }, { text: "ta capacité à modifier ta réponse motrice selon la situation qui se présente." }]));
children.push(bodyPar(
  "Ces cinq composantes ne sont pas propres à un seul sport : tu les retrouveras aussi bien en athlétisme, dans les sports collectifs, qu’en gymnastique, tout au long de ce manuel."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C01-01",
  "Posture et équilibre",
  "Dessiner un élève haïtien de 8e AF en position debout, avec des repères visuels simples (lignes légères) indiquant l’alignement de la tête, des épaules, du bassin et des pieds, en contexte scolaire haïtien (cour d’école).",
  "Une posture alignée et équilibrée : repère visuel de référence pour les composantes du mouvement.",
  "Illustrer concrètement la notion de posture alignée, en lien avec les définitions de la section 1.2.",
  "Portrait, format vertical, plan large.",
));
children.push(spacer(200));

// ================= 1.3 =================
children.push(sectionHeading("Observer, choisir, agir, ajuster : une méthode pour progresser", "1.3"));
children.push(bodyPar(
  "Face à une situation motrice (par exemple recevoir un ballon, franchir un obstacle, ou réaliser un équilibre), il est utile de suivre une méthode en quatre temps, que tu réutiliseras dans presque tous les chapitres de ce manuel."
));
[
  "Observer : prendre le temps de regarder la situation avant d’agir (où sont mes partenaires ? quel est l’obstacle ? quelle est la trajectoire du ballon ?).",
  "Choisir : sélectionner, parmi plusieurs réponses possibles, celle qui semble la plus adaptée à la situation.",
  "Agir : réaliser le geste choisi, avec le plus de contrôle possible.",
  "Ajuster : si le résultat n’est pas celui attendu, modifier sa réponse pour la fois suivante.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Par exemple, avant de franchir un petit obstacle dans un parcours scolaire, tu observes sa hauteur et l’espace disponible, tu choisis la façon de le franchir, tu agis, puis tu ajustes ta technique si nécessaire pour le prochain passage."
));
children.push(spacer(160));

children.push(calloutBox(
  "Méthode",
  ["Observer → Choisir → Agir → Ajuster : cette méthode en quatre temps t’aide à progresser dans n’importe quelle activité physique, pas seulement en EPS."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C01-02",
  "La méthode observer-choisir-agir-ajuster",
  "Réaliser un schéma en 4 étapes reliées par des flèches formant un cycle : 1) un élève haïtien qui observe un petit obstacle scolaire (icône représentant l’observation, par exemple un œil stylisé) ; 2) le même élève qui réfléchit à sa réponse (icône de choix) ; 3) l’élève franchissant l’obstacle (action) ; 4) l’élève qui ajuste sa position pour la tentative suivante (icône de flèche de correction), reliée par une flèche de retour vers l’étape 1.",
  "La méthode observer-choisir-agir-ajuster appliquée à une situation motrice simple.",
  "Aider l’élève à mémoriser visuellement la méthode en quatre temps et son fonctionnement cyclique.",
  "Paysage, format horizontal, schéma en boucle.",
));
children.push(spacer(200));

// ================= 1.4 =================
children.push(sectionHeading("Autonomie et responsabilité en EPS", "1.4"));
children.push(bodyPar(
  "Devenir autonome en EPS, c’est progressivement être capable de préparer ton matériel, de gérer ton effort, de reconnaître tes propres limites, et de participer à l’organisation d’une activité sans attendre que l’enseignant indique chaque détail."
));
children.push(bodyPar(
  "Cette autonomie s’accompagne toujours de responsabilité : envers toi-même (respecter tes propres limites et ta sécurité), envers les autres (respecter tes camarades et l’enseignant), envers le matériel (l’utiliser et le ranger correctement), et envers les espaces de pratique (les respecter et signaler tout danger observé)."
));
children.push(spacer(160));

// ================= 1.5 =================
children.push(sectionHeading("Coopération et autoévaluation", "1.5"));
children.push(bodyPar(
  "De nombreuses activités de cette année demandent de coopérer : construire un relais, organiser une défense, réaliser un enchaînement en groupe. Coopérer, c’est communiquer, partager les responsabilités et travailler ensemble vers un objectif commun."
));
children.push(bodyPar(
  "S’autoévaluer, c’est observer ses propres progrès à l’aide de critères simples (par exemple : « mon équilibre est-il plus stable qu’au début de l’année ? »). L’autoévaluation ne sert jamais à te comparer aux autres élèves, ni à juger ton apparence physique : elle t’aide à mesurer ton propre chemin parcouru."
));
children.push(spacer(120));

children.push(calloutBox(
  "Coopération",
  ["Travailler avec ses camarades, partager les responsabilités et communiquer clairement sont des compétences aussi importantes en 8e AF que la technique elle-même."],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C01-03",
  "Coopération et responsabilité",
  "Dessiner un petit groupe d’élèves haïtiens de 8e AF installant ensemble du matériel scolaire d’EPS (cônes, cordes) dans une cour d’école, en communiquant et en se répartissant les tâches, sous la supervision de l’enseignant.",
  "Coopérer pour installer le matériel : communication et partage des responsabilités.",
  "Illustrer concrètement la coopération et la responsabilité appliquées à une tâche d’organisation collective.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ================= 1.6 =================
children.push(sectionHeading("Sécurité, respect des autres, des espaces et du matériel", "1.6"));
children.push(bodyPar(
  "Comme en 7e AF, la sécurité reste une condition indispensable de toute pratique physique. Avant une activité, il faut vérifier le sol, les obstacles, les limites de l’espace, le matériel et les distances entre élèves. Pendant l’activité, il faut respecter les consignes, les zones d’attente, la circulation, l’espace des camarades et le signal d’arrêt donné par l’enseignant."
));
children.push(bodyPar(
  "En cas de douleur, de malaise ou de tout autre problème inhabituel, il faut toujours arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable. Le respect des autres (camarades, adversaires, enseignant), des espaces communs et du matériel collectif fait partie intégrante d’une pratique physique responsable."
));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  [
    "Avant toute activité : vérifier sol, obstacles, limites, matériel, distances et organisation du groupe.",
    "Pendant l’activité : respecter consignes, zones d’attente, circulation et signal d’arrêt.",
    "En cas de douleur, malaise ou problème inhabituel : arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["La méthode observer-choisir-agir-ajuster que tu viens d’apprendre est aussi utilisée par les entraîneurs sportifs de haut niveau : elle porte parfois le nom de « cycle de prise de décision », et s’applique aussi bien au sport qu’à de nombreuses situations de la vie quotidienne."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — J’observe et j’ajuste",
  [
    "Objectif : appliquer la méthode observer-choisir-agir-ajuster à un petit parcours moteur.",
    "Organisation : parcours simple avec deux ou trois obstacles adaptés (à franchir, contourner ou enjamber), réalisé individuellement à tour de rôle.",
    "Matériel : cônes, cordes ou repères souples pour matérialiser les obstacles.",
    "Consignes : avant chaque obstacle, observer sa forme et l’espace disponible, choisir la façon de le franchir, agir, puis ajuster ta méthode si besoin lors du passage suivant.",
    "Sécurité : attendre que le parcours soit libre avant de commencer ; garder une distance suffisante avec les autres élèves.",
    "Critère de réussite : franchir chaque obstacle de façon contrôlée, et expliquer un ajustement réalisé entre deux passages.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation / analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(calloutBox(
  "Observe et analyse",
  [
    "Observe un camarade qui réalise le parcours de l’Activité 1, ou une autre tâche motrice simple proposée par l’enseignant, et identifie :",
    "1) sa posture pendant l’action ;",
    "2) un moment où il a dû garder ou retrouver son équilibre ;",
    "3) un exemple de coordination entre plusieurs parties de son corps ;",
    "4) un moment où il a adapté sa réponse à la situation ;",
    "5) un éventuel élément à corriger, formulé de façon respectueuse.",
    "Partage ensuite ton analyse avec ton camarade, sous la conduite de l’enseignant.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C01-04",
  "Observe et analyse : une tâche motrice en cours",
  "Dessiner deux élèves haïtiens de 8e AF : l’un réalisant une tâche motrice (franchir un petit obstacle scolaire), l’autre l’observant à distance raisonnable avec attention, comme pour l’évaluer selon des critères simples. Ambiance calme et respectueuse, sans jugement visible.",
  "Un élève observe et analyse la performance d’un camarade, selon des critères simples et respectueux.",
  "Servir de support visuel à l’activité d’observation et d’analyse ci-dessus.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau simple pour faire le point sur ta compréhension des notions de ce chapitre. Ce tableau ne sert jamais à te comparer aux autres élèves : il t’aide à identifier ce que tu maîtrises déjà et ce que tu veux encore travailler."
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Posture et équilibre", "", ""],
    ["Coordination", "", ""],
    ["Méthode observer-choisir-agir-ajuster", "", ""],
    ["Autonomie et responsabilité", "", ""],
    ["Sécurité", "", ""],
  ],
  [3200, 3600, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "En 8e AF, l’EPS te fait progresser vers six capacités : maîtriser, analyser, choisir, coopérer, justifier et t’autoévaluer.",
  "Cinq composantes du mouvement se retrouvent dans toutes les activités de l’année : posture, équilibre, coordination, contrôle et adaptation.",
  "La méthode observer-choisir-agir-ajuster t’aide à progresser dans n’importe quelle situation motrice.",
  "L’autonomie et la responsabilité se développent progressivement, envers toi-même, les autres, le matériel et les espaces.",
  "La coopération et l’autoévaluation sont des compétences aussi importantes que la technique.",
  "La sécurité (vérification avant, respect des consignes pendant, information immédiate en cas de problème) reste une condition indispensable de toute pratique.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(1));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(posture - équilibre - coordination - autonomie - responsabilité - sécurité - coopération - adaptation)", italics: true, color: "555555" },
]));
[
  "1. La façon dont les parties du corps sont alignées et organisées s’appelle la ____________________.",
  "2. Maintenir ou retrouver rapidement une position stable, c’est garder son ____________________.",
  "3. Organiser harmonieusement plusieurs mouvements en même temps s’appelle la ____________________.",
  "4. Modifier sa réponse motrice selon la situation s’appelle l’____________________.",
  "5. Préparer son matériel et gérer son effort sans attendre chaque consigne est un signe d’____________________.",
  "6. Respecter les autres, le matériel et les espaces de pratique est une forme de ____________________.",
  "7. Travailler avec ses camarades vers un objectif commun s’appelle la ____________________.",
  "8. Vérifier le sol, le matériel et les distances avant une activité est une règle de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quelle est la principale différence entre l’EPS en 7e AF et en 8e AF, selon ce chapitre ?", opts: ["a) il n’y a aucune différence", "b) en 8e AF, l’élève progresse vers l’analyse, le choix et l’autoévaluation", "c) en 8e AF, on ne pratique plus aucun sport collectif", "d) en 8e AF, la sécurité n’est plus nécessaire"] },
  { q: "2. Laquelle de ces propositions n’est PAS une composante du mouvement présentée dans ce chapitre ?", opts: ["a) la posture", "b) l’équilibre", "c) la puissance musculaire maximale", "d) la coordination"] },
  { q: "3. Dans la méthode observer-choisir-agir-ajuster, que fait-on juste après avoir « choisi » une réponse ?", opts: ["a) on observe à nouveau depuis le début", "b) on agit", "c) on ajuste immédiatement sans agir", "d) on arrête l’activité"] },
  { q: "4. À quoi sert l’autoévaluation, selon ce chapitre ?", opts: ["a) à comparer les élèves entre eux", "b) à juger l’apparence physique d’un élève", "c) à observer ses propres progrès avec des critères simples", "d) à classer les élèves du meilleur au moins bon"] },
  { q: "5. Que doit faire un élève qui ressent un problème inhabituel pendant une activité ?", opts: ["a) continuer sans en parler", "b) arrêter l’activité et prévenir immédiatement l’enseignant", "c) attendre la fin du cours pour en parler", "d) demander à un camarade de continuer à sa place"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Posture", "a) Modifier sa réponse motrice selon la situation"],
  ["2. Équilibre", "b) Organisation harmonieuse de plusieurs mouvements"],
  ["3. Coordination", "c) Alignement et organisation des parties du corps"],
  ["4. Adaptation", "d) Capacité à maintenir ou retrouver une position stable"],
  ["5. Autonomie", "e) Ensemble des règles et comportements qui protègent les élèves"],
  ["6. Sécurité", "f) Capacité à agir sans attendre chaque consigne de l’enseignant"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Explique, avec un exemple personnel, comment tu pourrais appliquer la méthode observer-choisir-agir-ajuster en dehors de l’EPS, par exemple dans une autre matière scolaire.",
  "2. Pourquoi l’autoévaluation ne doit-elle jamais servir à comparer les élèves entre eux ?",
  "3. Donne un exemple concret de responsabilité que tu pourrais assumer pendant une séance d’EPS cette année, en lien avec le matériel ou les espaces de pratique.",
  "4. Explique en quoi la coopération est aussi importante que la technique dans les activités collectives que tu vas pratiquer cette année.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 1, "Manuel_EPS_8AF_Chapitre1.docx");
console.log("Chapitre 1 (8e AF) genere:", outPath);
