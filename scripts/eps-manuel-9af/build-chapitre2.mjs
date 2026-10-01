// Manuel d'EPS 9e AF — Chapitre 2
// Capacites physiques et motrices : analyser, gerer et ameliorer sa performance
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
  2,
  "Capacités physiques et motrices : analyser, gérer et améliorer sa performance",
  "Deux élèves réalisent le même parcours : l’un termine plus vite, l’autre plus précisément. Qui a la meilleure performance — et comment le savoir vraiment ?",
  [
    "Définir simplement une capacité physique et motrice.",
    "Distinguer coordination, vitesse, endurance, force adaptée, mobilité/souplesse, équilibre, précision et agilité.",
    "Comprendre que plusieurs capacités interviennent souvent ensemble dans une même activité.",
    "Observer ta pratique à partir de critères simples et comprendre la gestion de l’effort.",
    "Identifier des facteurs qui influencent une performance.",
    "Proposer un ajustement pour améliorer une action.",
    "Réaliser une autoévaluation constructive, sans comparaison humiliante.",
  ],
));

children.push(illustrationBox(
  "ILL-9AF-C02-01",
  "Les capacités physiques et motrices",
  "Infographie sobre présentant huit petites vignettes autour d’un titre central « Capacités physiques et motrices » : coordination, vitesse, endurance, force adaptée, mobilité/souplesse, équilibre, précision, agilité. Chaque vignette illustrée par un élève haïtien de 9e AF en action, geste anatomiquement cohérent, style épuré sans effet 3D.",
  "Les huit capacités physiques et motrices présentées dans ce chapitre.",
  "Offrir une vue d’ensemble claire avant d’entrer dans le détail de chaque capacité.",
  "Paysage, format horizontal, infographie pleine largeur.",
));
children.push(spacer(200));

// ---- Activation des acquis ----
children.push(sectionHeading("Activation des acquis", ""));
children.push(bodyPar(
  "Avant d’aller plus loin, prends un moment pour réfléchir à ce que tu as déjà appris en 7e et en 8e AF sur les capacités physiques et motrices."
));
[
  "Quelles capacités peuvent être mobilisées pendant une course ?",
  "Pourquoi deux activités différentes ne demandent-elles pas exactement les mêmes qualités ?",
  "Comment sais-tu qu’un effort doit être mieux géré ?",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "En 9e AF, tu ne te contentes plus d’identifier ou de pratiquer ces capacités : tu apprends à observer, mesurer, comprendre, choisir, agir, analyser et ajuster ta propre pratique.",
  { italics: true }
));
children.push(spacer(200));

// ---- 2.1 ----
children.push(sectionHeading("Comprendre les capacités physiques et motrices", "2.1"));
children.push(bodyPar(
  "Une capacité physique et motrice est une ressource que ton corps mobilise pour réaliser un mouvement. Aucun mouvement ne repose sur une seule capacité isolée : la plupart des actions combinent plusieurs capacités à la fois, à des degrés différents selon la situation."
));
children.push(bodyPar(
  "Ces capacités ne sont jamais des caractéristiques fixes propres à une personne : elles peuvent toutes être travaillées et progresser, à des rythmes différents selon chaque élève."
));
children.push(calloutBox(
  "À retenir",
  ["Une capacité physique et motrice n’est pas figée : elle se travaille et progresse, à ton propre rythme."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, "1F4E5F",
));
children.push(spacer(200));

// ---- 2.2 ----
children.push(sectionHeading("La coordination", "2.2"));
children.push(bodyPar(
  "La coordination est la capacité à organiser efficacement différents mouvements : courir tout en contrôlant un ballon, recevoir puis passer, modifier sa direction, coordonner bras et jambes, effectuer un enchaînement simple, ou réagir à un signal. Elle demande de l’attention, un bon rythme, de la précision et une bonne organisation du geste."
));
children.push(illustrationBox(
  "ILL-9AF-C02-02",
  "La coordination en action",
  "Un élève haïtien de 9e AF réalisant une action coordonnée (par exemple dribbler un ballon tout en changeant de direction) dans une cour d’école organisée. Geste anatomiquement cohérent, attitude concentrée.",
  "La coordination mobilise l’attention, le rythme et la précision en même temps.",
  "Illustrer concrètement une action coordonnée.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 2.3 ----
children.push(sectionHeading("La vitesse", "2.3"));
children.push(bodyPar(
  "La vitesse se manifeste de plusieurs façons : réagir rapidement à un signal, se déplacer rapidement sur une courte distance, ou exécuter rapidement une action motrice précise. En 9e AF, il ne s’agit pas de transformer chaque activité en recherche systématique de performance maximale, mais de relier la vitesse à l’observation de la situation et à la prise de décision : agir vite, mais au bon moment et de la bonne façon."
));
children.push(spacer(200));

// ---- 2.4 ----
children.push(sectionHeading("L’endurance et la gestion de l’effort", "2.4"));
children.push(bodyPar(
  "L’endurance permet de poursuivre un effort adapté pendant une certaine durée. Bien gérer son effort suppose d’éviter un départ trop rapide, de choisir une allure adaptée, d’observer son propre état pendant l’activité, d’ajuster son rythme si nécessaire, et de respecter un temps de récupération. Ce chapitre ne propose aucune prescription médicale : il t’aide seulement à observer et ajuster ta pratique."
));
children.push(calloutBox(
  "Sécurité",
  ["En présence d’une douleur, d’un malaise ou de tout problème inhabituel, arrête immédiatement l’activité et préviens ton enseignant ou un adulte responsable."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(illustrationBox(
  "ILL-9AF-C02-03",
  "Gérer son effort",
  "Séquence de deux ou trois vignettes montrant un même élève haïtien de 9e AF pendant une course de durée : un départ trop rapide et essoufflé, puis une allure adaptée et régulière après ajustement. Style clair, sans exagération.",
  "L’adaptation progressive de l’allure permet une meilleure gestion de l’effort.",
  "Illustrer concrètement le passage d’un effort mal géré à un effort ajusté.",
  "Paysage, format horizontal, séquence de 2-3 vignettes.",
));
children.push(spacer(200));

// ---- 2.5 ----
children.push(sectionHeading("La force adaptée", "2.5"));
children.push(bodyPar(
  "Dans le cadre scolaire, la force adaptée se travaille à travers des déplacements contrôlés, des poussées ou tractions adaptées dans des activités sûres, le maintien de positions simples, et des actions utilisant le poids du corps ou du matériel scolaire léger. Ce chapitre interdit strictement les charges maximales, les défis dangereux et les compétitions de force non contrôlées : la priorité reste toujours la technique, le contrôle, la posture et la sécurité."
));
children.push(spacer(200));

// ---- 2.6 ----
children.push(sectionHeading("Souplesse et mobilité", "2.6"));
children.push(bodyPar(
  "La mobilité articulaire et la souplesse permettent de réaliser certains mouvements avec une amplitude adaptée. Ce travail doit toujours rester progressif : aucun mouvement forcé, aucune douleur recherchée, aucune position extrême. Les différences d’amplitude entre élèves sont normales et ne doivent jamais donner lieu à une comparaison."
));
children.push(calloutBox(
  "Le savais-tu ?",
  ["La souplesse varie naturellement d’une personne à l’autre, et même d’un jour à l’autre chez la même personne, selon la fatigue ou l’échauffement — ce n’est donc jamais un critère de comparaison valable entre élèves."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A0F",
));
children.push(spacer(200));

// ---- 2.7 ----
children.push(sectionHeading("Équilibre, précision et agilité", "2.7"));
children.push(bodyPar(
  "L’équilibre est la capacité à maintenir ou retrouver une position contrôlée. La précision consiste à adapter son mouvement à une cible ou à un objectif précis. L’agilité permet de modifier efficacement son déplacement ou son action selon l’évolution d’une situation. Ces trois capacités se travaillent notamment à travers des jeux collectifs, des parcours moteurs, des activités gymniques adaptées et des situations avec ballon."
));
children.push(illustrationBox(
  "ILL-9AF-C02-06",
  "Équilibre, précision et agilité",
  "Un élève haïtien de 9e AF traversant un petit parcours scolaire sûr mobilisant équilibre (passage sur une ligne au sol), précision (viser une cible simple) et agilité (contourner un plot). Aucun mouvement dangereux, aucun matériel improvisé.",
  "Trois capacités mobilisées ensemble dans un même parcours scolaire.",
  "Illustrer concrètement équilibre, précision et agilité sans matériel ni geste dangereux.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 2.8 ----
children.push(sectionHeading("Plusieurs capacités dans une même activité", "2.8"));
children.push(bodyPar(
  "La plupart des activités sportives mobilisent plusieurs capacités à la fois, à des degrés différents. Le tableau suivant en donne quelques exemples."
));
children.push(threeColTable(
  ["Activité", "Capacités mobilisées", "Exemple d’action"],
  [
    ["Football", "Coordination, vitesse, précision, endurance", "Contrôler le ballon puis tirer précisément vers le but"],
    ["Volley-ball", "Coordination, précision, équilibre, agilité", "Se replacer rapidement puis réaliser une passe précise"],
    ["Course de durée", "Endurance, gestion de l’effort, régularité", "Adapter son allure pour tenir toute la distance"],
  ],
  [2600, 3600, 3200],
));
children.push(illustrationBox(
  "ILL-9AF-C02-04",
  "Plusieurs capacités dans une même activité",
  "Scène de jeu collectif (football ou volley-ball) avec des élèves haïtiens de 9e AF, montrant simultanément un geste de coordination, un déplacement rapide et une action précise, dans un même instant de jeu.",
  "Une même situation de jeu mobilise souvent plusieurs capacités en même temps.",
  "Illustrer concrètement le contenu du tableau ci-dessus.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 2.9 ----
children.push(sectionHeading("Observer sa performance", "2.9"));
children.push(bodyPar(
  "Observer sa performance, c’est utiliser des critères simples pour analyser sa propre réalisation : le respect de la consigne, le contrôle du mouvement, la précision, la régularité, la gestion de l’effort, la prise de décision et la sécurité. Observer ne signifie jamais juger ou humilier : c’est un outil pour mieux comprendre sa propre pratique."
));
children.push(calloutBox(
  "Observe",
  ["Avant de conclure qu’une performance est « bonne » ou « mauvaise », observe d’abord plusieurs critères précis plutôt qu’une seule impression générale."],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(illustrationBox(
  "ILL-9AF-C02-05",
  "Observer une performance",
  "Deux élèves haïtiens de 9e AF : l’un réalise une action motrice (par exemple un lancer de précision), l’autre observe avec une petite grille de critères en main, attitude attentive et respectueuse. Une flèche ou une légende suggère l’inversion des rôles ensuite.",
  "L’observation entre pairs, à partir de critères simples et respectueux.",
  "Servir de support à l’activité d’observation et d’analyse.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 2.10 ----
children.push(sectionHeading("Mesurer sans réduire la performance à un chiffre", "2.10"));
children.push(bodyPar(
  "Certaines situations permettent d’utiliser une mesure simple : un temps, une distance, un nombre de réalisations correctes, une régularité, ou la réussite d’une tâche. Mais un chiffre seul ne suffit pas toujours à décrire la qualité complète d’une performance : il ne dit rien, par exemple, de la précision du geste, de la sécurité ou de la prise de décision. Ce chapitre ne crée et n’utilise aucune norme corporelle, ni aucun classement humiliant entre élèves."
));
children.push(spacer(200));

// ---- 2.11 ----
children.push(sectionHeading("Facteurs qui influencent une performance", "2.11"));
children.push(bodyPar(
  "De nombreux facteurs influencent une performance, bien au-delà des seules qualités physiques : la compréhension de la consigne, la technique, la coordination, la gestion de l’effort, l’attention, la stratégie choisie, la récupération, les conditions de pratique, la sécurité, et la régularité de l’apprentissage dans le temps."
));
[
  "Compréhension de la consigne",
  "Technique du geste",
  "Coordination",
  "Gestion de l’effort",
  "Attention et concentration",
  "Stratégie choisie",
  "Récupération",
  "Conditions de pratique",
  "Sécurité",
  "Régularité de l’apprentissage",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ---- 2.12 ----
children.push(sectionHeading("Analyser et ajuster", "2.12"));
children.push(bodyPar(
  "Comme tu l’as vu au Chapitre 1, la démarche observer → comprendre → choisir → agir → analyser → ajuster t’aide à progresser dans n’importe quelle situation motrice. Par exemple, un élève qui remarque, après analyse, que ses lancers manquent régulièrement la cible sur le côté droit peut choisir d’ajuster la position de son pied d’appui, puis observer si ce changement améliore sa précision lors des essais suivants."
));
children.push(calloutBox(
  "Méthode — Analyser une performance",
  [
    "Identifier l’objectif de l’action.",
    "Observer la réalisation.",
    "Relever un ou deux critères importants.",
    "Identifier une réussite.",
    "Identifier une difficulté.",
    "Choisir une modification.",
    "Réessayer lorsque l’activité le permet.",
    "Observer l’évolution.",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(illustrationBox(
  "ILL-9AF-C02-07",
  "Analyser et ajuster",
  "Séquence de trois vignettes montrant un même élève haïtien de 9e AF : première tentative (lancer imprécis), observation (l’élève réfléchit, grille en main), puis deuxième tentative après modification (lancer plus précis). Style clair, progression visible.",
  "Le cycle première tentative → observation → modification → deuxième tentative.",
  "Illustrer concrètement la méthode d’analyse présentée ci-dessus.",
  "Paysage, format horizontal, séquence de 3 vignettes.",
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Pratiquer dans le contexte scolaire haïtien", ""));
children.push(bodyPar(
  "Les activités de ce chapitre peuvent se dérouler dans une cour d’école, un terrain scolaire, un espace polyvalent ou un terrain aménagé. Lorsque le matériel est disponible en quantité limitée, l’enseignant organise des ateliers, de petits groupes, des rotations et des zones clairement délimitées, avec une observation entre élèves toujours sous supervision. Aucun matériel improvisé dangereux n’est jamais proposé, quelle que soit la contrainte de ressources."
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE PRINCIPALE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique principale — « Mon circuit de capacités »", ""));
children.push(bodyPar(
  "Sous la supervision de ton enseignant, votre classe organise de petits ateliers simples mobilisant coordination, précision, équilibre, déplacement et gestion de l’effort. Aucun classement n’est établi entre élèves."
));
[
  "Comprendre la consigne de chaque atelier.",
  "Réaliser l’atelier une première fois.",
  "Observer sa propre réalisation à partir de critères simples.",
  "Identifier les capacités mobilisées dans cet atelier.",
  "Choisir un élément précis à améliorer.",
  "Recommencer l’atelier si l’organisation le prévoit.",
  "Analyser l’évolution entre les deux essais.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE D'OBSERVATION ET D'ANALYSE =================
children.push(sectionHeading("Activité d’observation et d’analyse — « Qu’est-ce qui explique la performance ? »", ""));
children.push(bodyPar(
  "Observe la situation suivante, puis réponds aux questions ci-dessous."
));
children.push(illustrationBox(
  "ILL-9AF-C02-08",
  "Grande situation d’analyse",
  "Scène scolaire haïtienne riche en détails : deux élèves de 9e AF viennent de terminer un même parcours moteur — l’un a l’air essoufflé et pressé, l’autre est plus posé. Des repères visuels simples (cônes, ligne d’arrivée) permettent de deviner les résultats de chacun sans donner la réponse. Enseignant présent en retrait avec une grille d’observation.",
  "Une situation suffisamment riche pour comparer deux façons différentes de réaliser une même tâche.",
  "Servir de support commun à l’activité d’observation et d’analyse.",
  "Paysage, format horizontal, plan large.",
));
children.push(bodyPar(
  "Situation : un élève termine un parcours très vite, mais commet plusieurs erreurs de précision (il renverse deux plots). Un autre élève est un peu plus lent, mais réalise correctement presque toutes les actions demandées."
));
[
  "Quelles capacités physiques et motrices sont mobilisées par chacun des deux élèves ?",
  "Que peux-tu observer, au-delà du simple temps réalisé par chacun ?",
  "Pourquoi la vitesse seule ne suffit-elle pas à décrire une bonne performance dans cette situation ?",
  "Que pourrait améliorer chacun des deux élèves ?",
  "Quelle stratégie proposerais-tu à chacun pour son prochain essai ?",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= AUTOEVALUATION =================
children.push(pageBreak());
children.push(sectionHeading("Autoévaluation", ""));
children.push(calloutBox(
  "Autoévaluation",
  ["Ce bilan personnel t’aide à mesurer ton propre chemin parcouru. Il ne sert jamais à te comparer aux autres élèves."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Identifier plusieurs capacités physiques et motrices", "", ""],
    ["Comprendre que plusieurs capacités interviennent ensemble", "", ""],
    ["Observer ma réalisation à partir de critères", "", ""],
    ["Identifier une difficulté et proposer une modification", "", ""],
    ["Gérer mon effort", "", ""],
    ["Respecter les règles de sécurité", "", ""],
  ],
  [3800, 3200, 2200],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Une capacité physique et motrice est une ressource mobilisée pour agir efficacement ; elle n’est jamais figée et peut toujours progresser.",
  "Coordination, vitesse, endurance, force adaptée, mobilité/souplesse, équilibre, précision et agilité interviennent souvent ensemble dans une même activité.",
  "Bien gérer son effort suppose d’adapter son allure, d’observer son état et de respecter la récupération, sans aucune prescription médicale.",
  "La force adaptée privilégie toujours la technique, le contrôle et la sécurité, jamais les charges maximales ni les défis dangereux.",
  "Observer sa performance, c’est utiliser des critères précis, jamais juger ou humilier.",
  "Un chiffre seul ne suffit pas à décrire la qualité complète d’une performance.",
  "De nombreux facteurs influencent une performance, au-delà des seules qualités physiques.",
  "La méthode observer → comprendre → choisir → agir → analyser → ajuster permet d’améliorer sa pratique de façon responsable.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : identifier une capacité à partir d’une situation, reconnaître plusieurs capacités dans une même activité, analyser une petite situation sportive, interpréter un tableau simple ou une illustration, expliquer une décision, proposer un ajustement, et justifier une réponse à partir de situations nouvelles.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(2));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(coordination - endurance - précision - équilibre - vitesse - effort - observation - ajustement - agilité - sécurité)", italics: true, color: "555555" },
]));
[
  "1. La capacité à organiser efficacement plusieurs mouvements en même temps s’appelle la ____________________.",
  "2. La capacité à poursuivre un effort adapté en gérant son rythme s’appelle l’____________________.",
  "3. La capacité à réaliser une action rapidement dans une situation donnée s’appelle la ____________________.",
  "4. Maintenir ou retrouver une position contrôlée, c’est garder son ____________________.",
  "5. Adapter son mouvement à une cible ou à un objectif précis relève de la ____________________.",
  "6. Modifier efficacement son déplacement ou son action selon la situation s’appelle l’____________________.",
  "7. La mobilisation du corps pour réaliser une activité physique s’appelle un ____________________.",
  "8. Utiliser des critères simples pour analyser sa propre réalisation, sans juger ni humilier, s’appelle l’____________________.",
  "9. Modifier son action après l’avoir observée et analysée s’appelle l’____________________.",
  "10. Vérifier l’espace, le matériel et les consignes avant une activité est une question de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que signifie observer sa performance, selon ce chapitre ?", opts: ["a) juger sévèrement le résultat obtenu", "b) comparer les corps des élèves entre eux", "c) utiliser des critères simples pour analyser sa propre réalisation, sans juger ni humilier", "d) classer les élèves du plus rapide au moins rapide"] },
  { q: "2. Pourquoi un chiffre (temps, distance) ne suffit-il pas toujours à décrire une performance ?", opts: ["a) parce que les chiffres n’ont aucune utilité", "b) parce que la qualité d’une action (précision, contrôle, sécurité) n’est pas toujours visible dans un seul chiffre", "c) parce qu’il faut toujours utiliser un chronomètre", "d) parce que seule la vitesse compte réellement"] },
  { q: "3. Que recommande ce chapitre au sujet de la force adaptée en 9e AF ?", opts: ["a) rechercher une charge maximale", "b) organiser des compétitions de force entre élèves", "c) privilégier des actions contrôlées et sécuritaires avec le poids du corps ou du matériel léger", "d) éviter complètement de travailler la force"] },
  { q: "4. Dans la démarche observer-comprendre-choisir-agir-analyser-ajuster, que fait-on juste après avoir analysé un résultat ?", opts: ["a) on observe à nouveau depuis le début", "b) on ajuste", "c) on choisit avant d’agir", "d) on arrête définitivement l’activité"] },
  { q: "5. Qu’est-ce que la souplesse/mobilité, selon ce chapitre, ne doit jamais impliquer ?", opts: ["a) un mouvement articulaire adapté et progressif", "b) des mouvements forcés ou des positions extrêmes recherchant la douleur", "c) une amplitude différente d’un élève à l’autre", "d) une progression personnelle"] },
  { q: "6. Que doit faire un élève qui ressent une douleur ou un malaise inhabituel pendant une activité de ce chapitre ?", opts: ["a) continuer sans en parler", "b) arrêter et prévenir l’enseignant ou un adulte responsable", "c) attendre la fin du cours", "d) demander à un camarade de continuer à sa place"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Coordination", "a) Capacité à maintenir ou retrouver une position contrôlée"],
  ["2. Endurance", "b) Capacité à adapter son mouvement à une cible ou un objectif précis"],
  ["3. Vitesse", "c) Capacité à modifier efficacement son déplacement ou son action selon la situation"],
  ["4. Équilibre", "d) Fait d’adapter son allure et son rythme selon son état et la durée de l’activité"],
  ["5. Précision", "e) Fait de modifier son action après l’avoir observée et analysée"],
  ["6. Agilité", "f) Capacité à organiser efficacement plusieurs mouvements en même temps"],
  ["7. Gestion de l’effort", "g) Capacité à poursuivre un effort adapté en gérant son rythme et sa récupération"],
  ["8. Ajustement", "h) Capacité à réagir rapidement à un signal et à se déplacer vite sur une courte distance"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève termine un parcours très vite mais commet plusieurs erreurs de précision, tandis qu’un camarade est un peu plus lent mais réalise presque toutes les actions correctement. Explique pourquoi la vitesse seule ne suffit pas à évaluer une performance, et propose un conseil pour chacun des deux élèves.",
  "2. Un élève part trop vite au début d’une course d’endurance et doit fortement ralentir avant la fin. En t’appuyant sur la méthode d’analyse de ce chapitre, décris comment il pourrait ajuster sa stratégie pour son prochain essai.",
  "3. Pendant un atelier d’équilibre, un élève réussit facilement alors qu’un camarade a plus de difficulté. Explique pourquoi cette différence est normale, et propose une façon respectueuse d’aider ce camarade à progresser, sans le comparer aux autres.",
  "4. Un élève affirme qu’un seul chiffre (comme un temps ou une distance) suffit toujours à juger une performance. Explique en quoi cette affirmation est incomplète, en t’appuyant sur les facteurs présentés dans ce chapitre.",
  "5. Décris une activité que tu as déjà pratiquée où plusieurs capacités physiques et motrices intervenaient en même temps. Identifie ces capacités et explique comment elles se combinaient.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 14, "Manuel_EPS_9AF_Chapitre2.docx");
console.log("Chapitre 2 (9e AF) genere:", outPath);
