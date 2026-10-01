import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(3, "Effort physique : respiration, fréquence cardiaque, récupération et gestion de l’intensité"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Au chapitre 2, tu as découvert que la vitesse et l’endurance sont deux capacités différentes, qui demandent notamment de bien gérer son allure. Mais que se passe-t-il exactement à l’intérieur de ton corps pendant que tu fournis un effort ? Ce chapitre t’aide à observer et comprendre les réactions de ton organisme à l’effort physique, pour mieux adapter ton engagement, sans jamais transformer ce cours en enseignement médical."
));
children.push(spacer(160));

// ---- Objectif général (Finalité) ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Comprendre comment l’organisme réagit de manière observable à un effort physique et comment adapter raisonnablement son engagement, en développant une première capacité à mettre en relation intensité de l’effort, respiration, fréquence cardiaque, sensations et récupération. Ce chapitre renforce ton autonomie à travers une démarche en six temps : observer → analyser → choisir → agir → ajuster → récupérer."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "définir simplement effort physique et intensité ;",
  "décrire les changements courants de la respiration pendant et après l’activité ;",
  "comprendre que la fréquence cardiaque varie notamment avec l’activité et la récupération ;",
  "apprendre, sous la conduite de l’enseignant, à observer ou mesurer simplement le pouls, sans interprétation médicale ;",
  "distinguer qualitativement effort léger, modéré et plus soutenu dans des situations pédagogiques adaptées ;",
  "comprendre la notion d’allure et éviter un départ inutilement trop rapide ;",
  "identifier le rôle de la récupération et du retour progressif au calme ;",
  "utiliser tes sensations et des critères simples pour ajuster ton effort ;",
  "savoir arrêter l’activité et prévenir l’enseignant en cas de douleur, malaise, vertiges ou difficulté inhabituelle.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Effort physique, intensité, respiration, fréquence cardiaque, pouls, sensations, allure, récupération.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Au chapitre 2, tu as appris à distinguer vitesse et endurance, et à gérer ton allure dans une activité de durée. Réponds mentalement, ou à l’oral avec la classe, à cette petite situation-problème, sans relire la leçon précédente :"
));
children.push(bodyPar(
  "Deux élèves partent en même temps pour un parcours de plusieurs minutes. Le premier démarre très vite, puis doit s’arrêter avant la fin. Le second garde une allure régulière et termine sans s’épuiser. Que s’est-il passé, selon toi, à l’intérieur de leur corps pendant l’effort ? Pourquoi le second a-t-il pu terminer plus facilement ?"
));
children.push(bodyPar(
  "Cette situation mobilise déjà des notions que ce chapitre va approfondir : l’intensité de l’effort, la respiration, le rythme cardiaque et la récupération."
));
children.push(spacer(160));

// ================= 3.1 =================
children.push(sectionHeading("Qu’est-ce qu’un effort physique ?", "3.1"));
children.push(bodyPar(
  "Un effort physique correspond à la mobilisation de ton corps pour réaliser une activité. La demande que ton corps doit fournir varie selon plusieurs facteurs : la tâche elle-même (marcher, courir, sauter, lancer), la durée de l’activité, le rythme choisi, et la personne qui la réalise."
));
children.push(bodyPar(
  "Un même exercice peut être vécu très différemment d’un élève à l’autre : ce qui semble facile pour l’un peut demander plus d’effort à un autre, selon sa condition physique, sa croissance ou son état du jour. Ces différences sont normales et ne doivent jamais donner lieu à une comparaison humiliante entre élèves."
));
children.push(spacer(160));

// ================= 3.2 =================
children.push(sectionHeading("Comprendre l’intensité", "3.2"));
children.push(bodyPar(
  "L’intensité correspond à la quantité d’effort demandée par une activité. Elle peut être décrite qualitativement, à partir de situations scolaires simples plutôt que de seuils chiffrés."
));
children.push(threeColTable(
  ["Niveau d’intensité", "Exemple scolaire", "Ce que l’on ressent généralement"],
  [
    ["Léger", "Marche active dans la cour d’école.", "Respiration presque normale, on peut parler facilement."],
    ["Modéré", "Déplacement régulier, petit trot soutenu.", "Respiration plus marquée, parler reste possible mais demande un effort."],
    ["Plus soutenu", "Course plus rapide sur une courte durée.", "Respiration nettement accélérée, parler devient difficile."],
  ],
  [2600, 3800, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce chapitre n’impose aucun seuil universel ni aucune zone d’entraînement chiffrée : le rythme choisi, la durée de l’activité, les temps de récupération et la nature de la tâche modifient tous l’intensité réellement ressentie par chaque élève."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C03-01",
  "Schéma pédagogique : repos → activité → récupération",
  "Réaliser un schéma simple en trois étapes reliées par des flèches : 1) un élève haïtien au repos, assis calmement ; 2) le même élève en pleine activité physique modérée (course légère) ; 3) l’élève en phase de récupération, marchant doucement et buvant de l’eau. Style clair, sans représentation médicale complexe.",
  "Les trois grandes phases d’une séance : repos, activité, récupération.",
  "Donner à l’élève une vue d’ensemble simple du cycle repos-activité-récupération avant l’étude détaillée du chapitre.",
  "Paysage, format horizontal, bande de 3 étapes.",
));
children.push(spacer(200));

// ================= 3.3 =================
children.push(sectionHeading("Respiration et activité physique", "3.3"));
children.push(bodyPar(
  "Pendant un effort, ta respiration s’adapte généralement à la demande de ton corps : elle devient plus rapide et plus ample, pour apporter davantage d’oxygène. Après l’effort, elle revient progressivement vers un état plus calme, pendant la phase de récupération."
));
children.push(bodyPar(
  "Tu peux observer simplement ta fréquence respiratoire (le nombre de respirations) et son amplitude (la profondeur de chaque respiration), avant, pendant et après une activité modérée. Il ne s’agit jamais de réaliser un exercice de privation d’air, d’hyperventilation volontaire ou de blocage respiratoire : ces pratiques ne sont jamais proposées en EPS scolaire. La respiration est directement liée à l’allure choisie et à la perception que tu as de ton propre effort."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C03-02",
  "Respiration avant, pendant et après un effort modéré",
  "Dessiner trois vignettes montrant un même élève haïtien : 1) au repos, respiration calme représentée par une petite icône simple (par exemple un symbole d’air discret) ; 2) pendant un effort modéré, respiration plus marquée (icône légèrement plus grande) ; 3) en récupération, respiration qui redevient progressivement plus calme. Aucune représentation anatomique complexe ni médicale.",
  "L’évolution simple de la respiration avant, pendant et après un effort modéré.",
  "Illustrer de façon accessible les changements respiratoires liés à l’effort, sans complexité médicale.",
  "Paysage, format horizontal, bande de 3 vignettes.",
));
children.push(spacer(200));

// ================= 3.4 =================
children.push(sectionHeading("Fréquence cardiaque et pouls", "3.4"));
children.push(bodyPar(
  "La fréquence cardiaque est le nombre de battements de ton cœur pendant une durée donnée (par exemple, en une minute). Elle varie selon l’activité que tu réalises et d’autres facteurs, et elle diminue généralement de façon progressive après l’arrêt de l’effort."
));
children.push(bodyPar(
  "Sous la conduite de ton enseignant, tu peux observer ton pouls de façon simple (par exemple au poignet ou au niveau du cou), avant et après une activité. Cette observation reste toujours pédagogique : elle ne te demande jamais de poser un diagnostic, ni d’interpréter un chiffre comme une preuve de bonne ou de mauvaise santé. Ce chapitre n’impose aucune fréquence cardiaque cible, ni aucun calcul d’entraînement chiffré : seule l’observation qualitative du changement (« mon pouls était plus rapide juste après l’effort ») est demandée."
));
children.push(spacer(160));

children.push(calloutBox(
  "Sécurité",
  ["L’observation du pouls ou de la respiration en EPS reste toujours une observation pédagogique simple : elle ne sert jamais à poser un diagnostic médical, à toi-même ou à un camarade."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C03-03",
  "Observation simple du pouls sous supervision",
  "Dessiner un élève haïtien de 8e AF assis calmement, plaçant deux doigts sur son poignet pour observer son pouls, sous la supervision visible de l’enseignant qui explique le geste à la classe. Ambiance calme et pédagogique, aucun matériel médical.",
  "Une observation simple et encadrée du pouls, sans interprétation médicale.",
  "Illustrer la façon correcte et supervisée d’observer son pouls dans un cadre scolaire, en lien avec l’Activité 4.",
  "Portrait, format vertical, plan rapproché sur le geste.",
));
children.push(spacer(200));

// ================= 3.5 =================
children.push(sectionHeading("Sensations et perception de l’effort", "3.5"));
children.push(bodyPar(
  "En plus de la respiration et du pouls, tes propres sensations sont un indicateur précieux de ton effort. Plusieurs indices simples peuvent t’aider : la facilité ou la difficulté à parler pendant l’activité, la sensation d’effort ressentie, ta respiration, ta fatigue ressentie, et la qualité de ton mouvement (contrôlé ou de plus en plus imprécis)."
));
children.push(bodyPar(
  "Toute sensation inhabituelle ou inquiétante (douleur, vertige, difficulté respiratoire anormale, malaise) doit toujours être signalée immédiatement à l’enseignant. Ce chapitre ne valorise jamais le fait de continuer une activité malgré une douleur importante : c’est au contraire un comportement à éviter."
));
children.push(spacer(160));

// ================= 3.6 =================
children.push(sectionHeading("Gérer son allure", "3.6"));
children.push(bodyPar(
  "Une allure adaptée te permet de mieux répartir ton effort tout au long d’une activité de durée, plutôt que de t’épuiser rapidement. On peut comparer, de façon pédagogique, trois façons de gérer une même activité :"
));
[
  "un départ trop rapide : l’élève démarre à une vitesse qu’il ne peut pas maintenir, et doit ralentir fortement ou s’arrêter avant la fin ;",
  "une allure irrégulière : l’élève alterne accélérations et ralentissements sans logique claire, ce qui rend l’effort plus difficile à gérer ;",
  "une allure mieux contrôlée : l’élève choisit un rythme qu’il peut maintenir, et ajuste légèrement si nécessaire, sans à-coups brusques.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Cette notion de gestion de l’allure prépare directement les apprentissages du futur chapitre d’athlétisme consacré aux courses."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C03-04",
  "Trois allures dans une situation scolaire",
  "Dessiner trois vignettes côte à côte représentant, sur un même parcours scolaire, trois élèves haïtiens différents : 1) un élève qui démarre très vite puis ralentit fortement (ligne de rythme irrégulière et décroissante) ; 2) un élève qui alterne accélérations et ralentissements (ligne en dents de scie) ; 3) un élève qui garde une allure stable du début à la fin (ligne régulière). Utiliser une ligne simple sous chaque vignette pour représenter le rythme dans le temps.",
  "Trois façons de gérer son allure : départ trop rapide, allure irrégulière, allure mieux contrôlée.",
  "Aider l’élève à comparer visuellement différentes stratégies de gestion de l’allure, en lien avec l’Activité 2.",
  "Paysage, format horizontal, bande de 3 vignettes avec courbes.",
));
children.push(spacer(200));

// ================= 3.7 =================
children.push(sectionHeading("Récupération", "3.7"));
children.push(bodyPar(
  "La récupération immédiate correspond aux premières minutes après l’arrêt d’une activité, pendant lesquelles ta respiration, tes sensations et ton rythme cardiaque évoluent progressivement vers un état plus calme. Le retour progressif au calme (marche douce, étirements légers) fait partie intégrante de cette récupération, comme tu l’as déjà appris en 7e AF."
));
children.push(bodyPar(
  "La récupération est aussi liée à une hydratation appropriée, au repos et à l’organisation générale de la séance (temps de pause suffisants entre les activités). Ce chapitre ne donne jamais de conseils médicaux individualisés : il se limite à des principes généraux applicables à tous les élèves, adaptés ensuite par l’enseignant selon les besoins observés."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C03-05",
  "Récupération après activité",
  "Dessiner un petit groupe d’élèves haïtiens de 8e AF en phase de récupération organisée : certains marchant calmement, un élève buvant de l’eau à sa bouteille personnelle, dans une zone de pause à l’ombre si possible, sous la supervision de l’enseignant.",
  "Une récupération organisée : marche calme, pause et hydratation.",
  "Illustrer concrètement les gestes de récupération après l’effort, en cohérence avec les chapitres 3 et 4 du manuel de 7e AF.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ================= 3.8 =================
children.push(sectionHeading("Ajuster son engagement", "3.8"));
children.push(bodyPar(
  "Ce chapitre te propose de réutiliser une démarche en six temps pour gérer ton effort : observer (ta respiration, tes sensations), analyser (ce que ces indices signifient), choisir (une réponse adaptée : continuer, ralentir, récupérer), agir, ajuster (si nécessaire), et récupérer après l’effort."
));
children.push(bodyPar(
  "Dans une activité donnée, tu pourras être amené à ralentir, à maintenir ton allure, à prendre un temps de récupération, ou à demander de l’aide à l’enseignant, selon ce que tu observes de ton propre état. La gestion de l’effort est avant tout une compétence de responsabilité personnelle, et non une recherche de performance maximale."
));
children.push(spacer(120));

children.push(calloutBox(
  "À retenir",
  ["Gérer son effort signifie adapter son rythme et savoir récupérer, pas chercher systématiquement l’intensité maximale."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(calloutBox(
  "Méthode",
  ["Observer → Analyser → Choisir → Agir → Ajuster → Récupérer : ce cycle en six temps te permet de mieux gérer ton effort dans toutes les activités physiques de l’année."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Le cœur d’un enfant ou d’un adolescent bat généralement plus vite que celui d’un adulte, même au repos. C’est une différence normale liée à la croissance, et non un signe de bonne ou de mauvaise santé."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C03-06",
  "Scène haïtienne : gestion de l’effort dans une cour d’école",
  "Dessiner une scène d’ensemble dans une cour d’école haïtienne, avec plusieurs zones organisées : une zone d’activité modérée où des élèves se déplacent, une zone de pause à l’ombre avec de l’eau disponible, et l’enseignant supervisant l’ensemble. Climat visiblement chaud (soleil), ambiance organisée et sécurisée.",
  "Une séance bien organisée, avec zones d’activité et de récupération adaptées au climat haïtien.",
  "Illustrer une organisation de séance réaliste, tenant compte de la chaleur et de l’accès à l’eau potable.",
  "Paysage, format horizontal, vue d’ensemble.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Avant, pendant, après",
  [
    "Objectif : observer qualitativement la respiration et les sensations autour d’une activité modérée.",
    "Organisation : activité modérée collective organisée par l’enseignant (par exemple une marche active ou un petit trot), avec un temps d’observation avant, immédiatement après, et quelques minutes plus tard.",
    "Matériel : aucun matériel indispensable ; une fiche d’observation simple peut être utilisée.",
    "Consignes : noter ou décrire oralement ta respiration et tes sensations à chacun des trois moments (avant, pendant, après).",
    "Sécurité : signaler immédiatement toute sensation inhabituelle à l’enseignant.",
    "Critères de réussite : décrire au moins un changement observé entre les trois moments.",
    "Variantes et adaptations : réduire la durée ou l’intensité de l’activité modérée selon les besoins des élèves.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Trouver une allure régulière",
  [
    "Objectif : parcourir une durée ou un trajet adapté en recherchant la régularité plutôt que la vitesse maximale.",
    "Organisation : individuellement ou en petit groupe, sur une durée ou un trajet défini par l’enseignant.",
    "Matériel : repères délimitant l’espace ou le trajet.",
    "Consignes : choisir un rythme que tu peux maintenir du début à la fin, sans départ trop rapide.",
    "Sécurité : ralentir ou s’arrêter en cas de sensation inhabituelle, et le signaler.",
    "Critères de réussite : maintenir un rythme relativement stable, sans ralentissement brutal en fin de parcours.",
    "Variantes et adaptations : proposer une marche active plutôt qu’un trot pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Observer la récupération",
  [
    "Objectif : comparer ses sensations immédiatement après une activité, puis après un temps de récupération.",
    "Organisation : après une activité modérée collective, observation individuelle à deux moments (juste après, puis après quelques minutes de récupération organisée).",
    "Matériel : aucun matériel indispensable.",
    "Consignes : décrire tes sensations (respiration, fatigue) juste après l’activité, puis à nouveau après la récupération, et comparer les deux moments.",
    "Sécurité : prévoir un temps de récupération suffisant, à l’ombre si possible.",
    "Critères de réussite : décrire clairement au moins une différence entre les deux moments observés.",
    "Variantes et adaptations : allonger le temps de récupération selon les besoins.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Le pouls comme observation",
  [
    "Objectif : comprendre que les battements du cœur peuvent varier avec l’effort, par une observation strictement encadrée.",
    "Organisation : activité entièrement dirigée par l’enseignant, en petit groupe, avec démonstration préalable du geste d’observation du pouls.",
    "Matériel : aucun matériel indispensable.",
    "Consignes : observer ton pouls au repos, réaliser une courte activité modérée proposée par l’enseignant, puis observer à nouveau ton pouls juste après.",
    "Sécurité : cette activité reste une observation pédagogique, jamais un diagnostic ; aucune cible ou valeur à atteindre n’est fixée.",
    "Critères de réussite : décrire qualitativement un changement observé (par exemple « plus rapide qu’au repos »), sans donner de chiffre interprété médicalement.",
    "Variantes et adaptations : réaliser l’observation en groupe avec l’enseignant plutôt qu’individuellement, si cela facilite la compréhension.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation et d'analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(bodyPar(
  "Pour chacune des situations suivantes, identifie les indices qui te permettent de comprendre comment l’élève gère son effort, explique ton choix, puis propose un ajustement si nécessaire. Cette activité évalue ton raisonnement, jamais une performance physique."
));
children.push(calloutBox(
  "Qui gère mieux son effort ?",
  [
    "Situation 1 : un élève démarre une course de plusieurs minutes à toute vitesse, puis doit s’arrêter avant la fin, très essoufflé.",
    "Situation 2 : un élève garde un rythme stable du début à la fin d’un parcours, et peut encore parler facilement en terminant.",
    "Situation 3 : un élève termine une activité intense et repart immédiatement dans une nouvelle activité, sans temps de récupération ni eau.",
    "Situation 4 : un élève ressent une gêne inhabituelle pendant l’effort, ralentit, puis en informe immédiatement l’enseignant.",
    "Pour chaque situation, réponds : quels indices observes-tu (allure, respiration, sensations, comportement) ? Cette gestion de l’effort te semble-t-elle adaptée ? Quel ajustement proposerais-tu, si nécessaire ?",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C03-07",
  "Situation d’analyse : stratégies différentes de gestion de l’effort",
  "Dessiner une scène scolaire haïtienne montrant plusieurs élèves différents pendant ou après une même activité : un élève visiblement essoufflé et arrêté, un autre qui continue à un rythme stable et parle avec un camarade, et un autre en train de boire de l’eau calmement en zone de récupération. Aucune expression de souffrance intense ni de malaise grave représentée.",
  "Plusieurs élèves adoptant des stratégies différentes de gestion de l’effort, à comparer et analyser.",
  "Servir de support visuel à l’activité d’observation et d’analyse « Qui gère mieux son effort ? ».",
  "Paysage, format horizontal, plan large avec plusieurs élèves.",
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta compréhension de la gestion de l’effort. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à te comparer aux autres élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je reconnais les changements liés à l’effort", "", ""],
    ["Je peux décrire mes sensations", "", ""],
    ["Je sais ajuster mon allure", "", ""],
    ["Je respecte la récupération", "", ""],
    ["Je sais quand prévenir l’enseignant", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Un effort physique correspond à la mobilisation du corps, avec une demande qui varie selon la tâche, la durée, le rythme et la personne.",
  "L’intensité peut être décrite qualitativement : effort léger, modéré ou plus soutenu, sans seuils universels.",
  "La respiration s’adapte à l’effort et revient progressivement au calme pendant la récupération.",
  "La fréquence cardiaque et le pouls varient avec l’activité ; leur observation reste pédagogique, jamais un diagnostic.",
  "Les sensations (facilité à parler, fatigue, qualité du mouvement) aident à percevoir son propre effort.",
  "Une allure bien gérée permet de répartir son effort, plutôt qu’un départ trop rapide ou une allure irrégulière.",
  "La récupération (retour au calme, hydratation, repos) fait partie intégrante de toute pratique physique.",
  "La démarche observer → analyser → choisir → agir → ajuster → récupérer aide à gérer son effort de façon responsable.",
  "Tout signe inhabituel (douleur, malaise, vertiges, difficulté respiratoire) doit être signalé immédiatement à l’enseignant.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(3));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(récupération - intensité - respiration - pouls - allure - effort - sensations - sécurité)", italics: true, color: "555555" },
]));
[
  "1. La mobilisation du corps pour réaliser une activité physique s’appelle un ____________________.",
  "2. La quantité d’effort demandée par une activité s’appelle son ____________________.",
  "3. Pendant l’effort, la ____________________ devient généralement plus rapide et plus ample.",
  "4. Observer le nombre de battements du cœur pendant une durée donnée, c’est observer son ____________________.",
  "5. Choisir un rythme que l’on peut maintenir tout au long d’une activité, c’est gérer son ____________________.",
  "6. Décrire sa fatigue, sa respiration ou la facilité à parler pendant l’effort, ce sont des ____________________.",
  "7. Le retour progressif au calme après l’effort fait partie de la ____________________.",
  "8. Signaler immédiatement une douleur ou un malaise à l’enseignant est une règle de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que signifie observer son pouls en EPS, selon ce chapitre ?", opts: ["a) poser un diagnostic médical sur soi-même", "b) réaliser une observation pédagogique simple, sans interprétation médicale", "c) atteindre une fréquence cardiaque cible imposée", "d) comparer son pouls à celui des autres élèves pour les classer"] },
  { q: "2. Qu’arrive-t-il généralement à la respiration pendant un effort modéré à soutenu ?", opts: ["a) elle ralentit progressivement", "b) elle devient plus rapide et plus ample", "c) elle s’arrête complètement", "d) elle ne change jamais, quelle que soit l’intensité"] },
  { q: "3. Qu’est-ce qu’une allure « mieux contrôlée », selon ce chapitre ?", opts: ["a) un départ très rapide suivi d’un arrêt", "b) une alternance désordonnée d’accélérations et de ralentissements", "c) un rythme que l’on peut maintenir, ajusté légèrement si nécessaire", "d) l’intensité maximale du début à la fin"] },
  { q: "4. Que doit faire un élève qui ressent une gêne inhabituelle pendant un effort ?", opts: ["a) continuer sans en parler, car c’est probablement normal", "b) ralentir et prévenir immédiatement l’enseignant", "c) accélérer pour « passer » la sensation plus vite", "d) attendre la fin de la séance pour en parler"] },
  { q: "5. Que recommande ce chapitre au sujet des exercices de respiration ?", opts: ["a) pratiquer l’hyperventilation pour améliorer sa capacité respiratoire", "b) réaliser des exercices de rétention de souffle en compétition", "c) ne jamais proposer de privation d’air, d’hyperventilation ou de blocage respiratoire", "d) bloquer sa respiration le plus longtemps possible comme défi"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition ou son exemple correspondant dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Intensité", "a) Rythme choisi et maintenu pendant une activité de durée"],
  ["2. Fréquence cardiaque", "b) Retour progressif de l’organisme vers un état plus calme après l’effort"],
  ["3. Allure", "c) Indicateurs personnels comme la fatigue ressentie ou la facilité à parler"],
  ["4. Récupération", "d) Quantité d’effort demandée par une activité"],
  ["5. Sensations", "e) Nombre de battements du cœur pendant une durée donnée"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève démarre une course de plusieurs minutes beaucoup trop vite et doit s’arrêter avant la fin. Analyse cette situation en expliquant précisément ce qui a pu se passer au niveau de sa respiration et de son rythme cardiaque, puis propose un ajustement concret.",
  "2. Après une activité intense, un élève repart immédiatement dans une nouvelle activité sans récupération ni eau. Explique pourquoi cette récupération est insuffisante, et quelles pourraient en être les conséquences.",
  "3. Un élève ressent une sensation inhabituelle (par exemple des vertiges) pendant un effort modéré. Explique, étape par étape, ce qu’il devrait faire, et pourquoi chaque étape est importante.",
  "4. Décris un exemple où tu as toi-même (ou un camarade) bien géré une allure pendant une activité physique. Qu’est-ce qui, précisément, montre que cette gestion était adaptée ?",
  "5. Explique en quoi les conditions de pratique en Haïti (chaleur, accès à l’eau, taille des groupes) peuvent influencer la façon dont un enseignant organise une activité liée à l’effort et à la récupération.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 24, "Manuel_EPS_8AF_Chapitre3.docx");
console.log("Chapitre 3 (8e AF) genere:", outPath);
