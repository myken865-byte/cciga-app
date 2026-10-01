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

children.push(...chapterTitleBlock(5, "Athlétisme — Courses : vitesse, endurance, relais et gestion de l’allure"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Au chapitre 4, tu as appris à analyser une activité pour préparer un échauffement adapté et à organiser un espace de pratique en sécurité. Ce chapitre applique directement ces acquis à une famille d’activités précise : les courses. Tu vas y approfondir la vitesse, l’endurance et le relais, en apprenant à observer, analyser et ajuster ta propre pratique."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Mieux maîtriser différentes formes de course, distinguer les exigences de la vitesse et de l’endurance, gérer son allure et coopérer efficacement dans un relais. Ce chapitre développe ta capacité à observer une performance, identifier un facteur d’amélioration et ajuster ton action en sécurité."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "distinguer course de vitesse et course d’endurance à partir de leurs objectifs et exigences ;",
  "adopter une posture et une coordination de course efficaces, adaptées au niveau scolaire ;",
  "réagir à un signal et accélérer de manière contrôlée sur une courte distance ;",
  "comprendre la notion d’allure et rechercher une régularité dans un effort de durée adaptée ;",
  "comprendre les principes de base d’un relais : coopération, zone prévue, communication et transmission organisée ;",
  "observer quelques critères simples : départ, posture, coordination, trajectoire, allure et transmission ;",
  "utiliser les acquis des chapitres 2, 3 et 4 pour préparer, gérer et récupérer après l’effort ;",
  "respecter les règles, les zones, les signaux et les autres élèves.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Départ, accélération, foulée, trajectoire, allure, relais, transmission, zone.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Ce chapitre réutilise directement des notions déjà installées : les capacités physiques (chapitre 2), l’intensité, la respiration et la récupération (chapitre 3), et l’échauffement et la sécurité (chapitre 4). Réponds à cette question avant de commencer, sans relire les leçons précédentes :"
));
children.push(bodyPar(
  "Courir vite pendant quelques secondes et courir régulièrement pendant plusieurs minutes demandent-ils la même stratégie ? Pourquoi ?"
));
children.push(bodyPar(
  "Cette question t’invite à mobiliser ce que tu sais déjà sur l’intensité et l’allure pour construire une première idée des différences entre vitesse et endurance, avant de les étudier plus précisément."
));
children.push(spacer(160));

// ================= 5.1 =================
children.push(sectionHeading("Les courses en athlétisme scolaire", "5.1"));
children.push(bodyPar(
  "Ce chapitre étudie trois formes de course : la course de vitesse (courir le plus rapidement possible sur une courte distance), la course d’endurance (maintenir un effort régulier sur une durée plus longue), et le relais (une course d’équipe où le témoin, ou un objet léger, est transmis d’un coureur à l’autre)."
));
children.push(bodyPar(
  "Chacune de ces formes poursuit un objectif pédagogique différent : la vitesse développe la réaction et l’accélération, l’endurance développe la gestion de l’effort et la régularité, et le relais développe la coopération et l’organisation collective."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C05-01",
  "Comparaison pédagogique : vitesse, endurance et relais",
  "Dessiner trois vignettes côte à côte montrant des élèves haïtiens de 8e AF : 1) un élève sprintant sur une courte distance (vitesse) ; 2) un élève courant à allure régulière sur un parcours plus long (endurance) ; 3) deux élèves se transmettant un témoin dans une zone marquée (relais). Étiqueter chaque vignette.",
  "Trois formes de course étudiées dans ce chapitre : vitesse, endurance et relais.",
  "Donner à l’élève une vue d’ensemble des trois formes de course avant leur étude détaillée.",
  "Paysage, format horizontal, bande de 3 vignettes.",
));
children.push(spacer(200));

// ================= 5.2 =================
children.push(sectionHeading("Courir vite : départ et réaction", "5.2"));
children.push(bodyPar(
  "Un bon départ commence par l’attention portée au signal : rester concentré, prêt à réagir, sans anticiper. La réaction est le temps entre le signal et le début du mouvement ; plus elle est rapide et contrôlée, plus le départ est efficace."
));
children.push(bodyPar(
  "Au niveau scolaire, une position de départ debout, simple et sûre, est suffisante : il n’est pas nécessaire d’exiger une technique de starting-blocks si le matériel ou un enseignement spécialisé ne sont pas disponibles. Ce qui est observé, ce sont la qualité de la réaction au signal, le maintien d’une direction claire, et la qualité des premiers appuis au sol."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C05-02",
  "Départ scolaire sûr",
  "Dessiner un élève haïtien de 8e AF en position de départ debout derrière une ligne tracée au sol, attentif au signal de l’enseignant (représenté à proximité), avec une posture simple et équilibrée, prêt à s’élancer.",
  "Un départ scolaire sûr : attention au signal, position simple, premières foulées contrôlées.",
  "Illustrer une position de départ accessible, sans exiger de matériel ou de technique spécialisée.",
  "Portrait, format vertical, plan rapproché sur la position de départ.",
));
children.push(spacer(200));

// ================= 5.3 =================
children.push(sectionHeading("Accélération et coordination", "5.3"));
children.push(bodyPar(
  "Pendant l’accélération, les bras et les jambes travaillent de façon coordonnée : les bras accompagnent le mouvement des jambes plutôt que de rester immobiles ou désordonnés. Cette coordination se développe progressivement, sans qu’il soit nécessaire de donner des consignes biomécaniques trop techniques."
));
children.push(bodyPar(
  "L’objectif est de maintenir une trajectoire claire (rester dans son couloir ou son axe de course) et de garder le contrôle du mouvement jusqu’à la fin de la zone prévue, plutôt que de perdre en précision en cherchant uniquement la vitesse maximale."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C05-03",
  "Coordination de course",
  "Dessiner un élève haïtien de 8e AF en pleine course, montrant une posture générale équilibrée et une coordination claire entre le mouvement des bras et des jambes, dans un axe de course rectiligne tracé au sol.",
  "Une posture de course équilibrée avec une coordination claire entre bras et jambes.",
  "Illustrer la coordination générale du geste de course, sans détail biomécanique excessif.",
  "Portrait, format vertical, plan moyen en action.",
));
children.push(spacer(200));

// ================= 5.4 =================
children.push(sectionHeading("Finir une course en sécurité", "5.4"));
children.push(bodyPar(
  "Franchir la ligne d’arrivée n’est pas la fin du mouvement : il faut ensuite décélérer progressivement, dans une zone libre prévue à cet effet, plutôt que de s’arrêter brutalement."
));
[
  "les arrêts brusques juste après la ligne d’arrivée sont à éviter ;",
  "les collisions avec d’autres coureurs doivent être anticipées et évitées ;",
  "il ne faut jamais traverser un couloir ou un axe où d’autres élèves courent encore ;",
  "il ne faut jamais retourner immédiatement dans la zone des coureurs après avoir terminé.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Une arrivée bien organisée prévoit toujours un espace suffisant après la ligne d’arrivée pour permettre à chaque coureur de ralentir en toute sécurité."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C05-04",
  "Arrivée sécurisée",
  "Dessiner une scène scolaire montrant une ligne d’arrivée clairement tracée au sol, suivie d’une zone de décélération dégagée où un élève haïtien ralentit progressivement en marchant, sans obstacle ni autre coureur sur son chemin.",
  "Une arrivée sécurisée : ligne d’arrivée suivie d’une zone de décélération dégagée.",
  "Illustrer l’organisation nécessaire à une fin de course sécurisée, en lien avec l’Activité 2.",
  "Paysage, format horizontal, vue latérale de la zone d’arrivée.",
));
children.push(spacer(200));

// ================= 5.5 =================
children.push(sectionHeading("Endurance et gestion de l’allure", "5.5"));
children.push(bodyPar(
  "Comme tu l’as étudié au chapitre 3, une course de durée exige une répartition raisonnable de l’effort. On peut comparer trois façons de gérer une même course d’endurance : un départ trop rapide, qui oblige à ralentir fortement ou à s’arrêter avant la fin ; une allure irrégulière, qui alterne accélérations et ralentissements sans logique claire ; et une allure plus régulière, mieux répartie sur toute la distance."
));
children.push(bodyPar(
  "Ce chapitre ne fixe jamais de distance ou d’intensité identique pour tous les élèves : c’est l’enseignant qui adapte la tâche selon les élèves et les conditions de pratique."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Une course réussie dépend de l’objectif : accélérer, gérer son allure ou coopérer dans un relais."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C05-05",
  "Gestion de l’allure : trois stratégies comparées",
  "Reprendre le principe du schéma du chapitre 3 : trois vignettes représentant chacune un élève sur un même parcours scolaire, avec une ligne de rythme sous chaque vignette : 1) départ trop rapide puis chute brutale du rythme ; 2) allure en dents de scie (irrégulière) ; 3) ligne stable du début à la fin (allure régulière).",
  "Trois stratégies de gestion de l’allure sur une course de durée : trop rapide, irrégulière, régulière.",
  "Aider l’élève à comparer visuellement différentes stratégies d’allure appliquées à la course d’endurance.",
  "Paysage, format horizontal, bande de 3 vignettes avec courbes.",
));
children.push(spacer(200));

// ================= 5.6 =================
children.push(sectionHeading("Observer sa régularité", "5.6"));
children.push(bodyPar(
  "Pour t’aider à progresser en endurance, quelques repères simples peuvent être utilisés : le nombre de tours ou de segments parcourus, un temps indicatif lorsque le contexte le permet, tes sensations pendant l’effort, et ta capacité à maintenir une allure stable jusqu’à la fin."
));
children.push(bodyPar(
  "Ces mesures servent uniquement à apprendre et à t’autoévaluer : elles ne doivent jamais être utilisées pour humilier ou classer les élèves entre eux. Après un essai, essaie d’identifier un ajustement simple pour la prochaine tentative (par exemple : « partir un peu moins vite au début »)."
));
children.push(spacer(160));

// ================= 5.7 =================
children.push(sectionHeading("Le relais : courir ensemble", "5.7"));
children.push(bodyPar(
  "Le relais est une activité de coopération : la performance de l’équipe dépend autant de l’organisation du groupe que de la vitesse individuelle de chaque coureur. Il demande de définir un ordre des coureurs, une zone prévue pour la transmission, une communication claire entre partenaires, et le respect du trajet prévu par chacun."
));
children.push(bodyPar(
  "Le relais scolaire utilise un témoin adapté, ou à défaut un objet léger, sûr et prévu par l’enseignant : il ne faut jamais improviser un objet dangereux comme témoin."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C05-06",
  "Relais : organisation de la transmission",
  "Dessiner une zone de transmission de relais clairement identifiée au sol (par exemple par des lignes ou des cônes), avec deux élèves haïtiens : l’un arrivant en courant avec le témoin, l’autre déjà en mouvement dans la zone, prêt à le recevoir, communication visible entre eux (regard, geste).",
  "Une transmission de relais organisée dans une zone clairement identifiée.",
  "Illustrer l’organisation spatiale nécessaire à une transmission de relais sécurisée et coopérative.",
  "Paysage, format horizontal, plan moyen sur la zone de transmission.",
));
children.push(spacer(200));

// ================= 5.8 =================
children.push(sectionHeading("La transmission", "5.8"));
children.push(bodyPar(
  "La transmission du témoin s’apprend progressivement. Elle commence toujours à faible vitesse, pour permettre aux deux partenaires de bien se coordonner, avant d’augmenter progressivement la vitesse si l’enseignant juge les conditions suffisamment sûres."
));
children.push(bodyPar(
  "Une bonne transmission demande de la communication (annoncer clairement le moment de la transmission), des repères adaptés à la tâche (regard ou signal convenu à l’avance), une synchronisation entre les deux coureurs, et le maintien de la transmission à l’intérieur de la zone prévue. Ce chapitre n’exige jamais une technique de transmission de niveau compétition."
));
children.push(spacer(120));

children.push(calloutBox(
  "Coopération",
  ["Dans un relais, la communication et la synchronisation entre partenaires comptent autant que la vitesse individuelle : une transmission bien organisée fait souvent la différence."],
  BOX_COOPERATION_FILL, BOX_COOPERATION_LINE, BOX_COOPERATION_TITLE,
));
children.push(spacer(200));

// ================= 5.9 =================
children.push(sectionHeading("Règles, rôles et responsabilité", "5.9"));
children.push(bodyPar(
  "Dans les activités de ce chapitre, plusieurs rôles peuvent être occupés par les élèves, sous la direction de l’enseignant : coureur, partenaire de relais, observateur, et éventuellement chronométreur si le contexte le permet."
));
children.push(bodyPar(
  "Le rôle d’observateur demande de donner un retour factuel et respectueux à un camarade : décrire ce qui a été observé (par exemple « ta trajectoire est restée droite »), plutôt que de juger la performance ou la personne. Ces rôles relient directement les règles de la course, le fair-play, la coopération et la citoyenneté déjà étudiés dans les chapitres précédents."
));
children.push(spacer(160));

children.push(calloutBox(
  "Sécurité",
  [
    "Vérifie le terrain et le matériel avant chaque activité de course.",
    "Les départs sont organisés pour que les élèves ne se croisent jamais pendant la course.",
    "Une zone de décélération dégagée est toujours prévue après l’arrivée.",
    "En cas de douleur, malaise, vertiges ou difficulté inhabituelle, arrête l’activité et préviens immédiatement l’enseignant.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Le relais 4 x 100 mètres est l’une des seules épreuves olympiques d’athlétisme où quatre athlètes doivent se coordonner parfaitement : une transmission ratée peut faire perdre une course, même si chaque coureur est individuellement très rapide."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C05-07",
  "Scène d’athlétisme scolaire haïtienne",
  "Dessiner une vue d’ensemble d’un terrain scolaire haïtien crédible (cour ou espace polyvalent, sans piste officielle), avec des repères sûrs délimitant plusieurs zones : une zone de départ, un axe de course, une zone de décélération, et un groupe d’élèves en attente organisée, sous la supervision de l’enseignant.",
  "Une séance d’athlétisme scolaire bien organisée, réalisable sans piste officielle.",
  "Montrer que les activités du chapitre restent réalisables dans un contexte scolaire haïtien courant.",
  "Paysage, format horizontal, vue d’ensemble large.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Réagir et accélérer",
  [
    "Objectif : réagir à un signal et accélérer de façon contrôlée sur une courte distance.",
    "Organisation : élèves répartis dans des couloirs ou zones clairement séparés, à tour de rôle ou par petits groupes.",
    "Matériel : lignes de départ tracées au sol, signal sonore ou visuel.",
    "Consignes : rester attentif au signal, réagir sans anticiper, accélérer en gardant sa trajectoire.",
    "Sécurité : couloirs ou zones bien séparés pour éviter tout croisement entre coureurs.",
    "Critères de réussite : réagir au signal sans anticipation et maintenir sa trajectoire jusqu’à la fin de la zone.",
    "Variantes et adaptations : allonger le temps de récupération entre deux essais selon les besoins.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Courir droit et finir en contrôle",
  [
    "Objectif : maintenir une trajectoire claire et décélérer progressivement après la ligne d’arrivée.",
    "Organisation : élèves à tour de rôle, sur une distance courte avec une zone de décélération dégagée après l’arrivée.",
    "Matériel : lignes de départ et d’arrivée tracées au sol.",
    "Consignes : courir en ligne droite jusqu’à la ligne d’arrivée, puis ralentir progressivement dans la zone prévue, sans s’arrêter brutalement.",
    "Sécurité : la zone de décélération doit rester dégagée en permanence.",
    "Critères de réussite : franchir la ligne d’arrivée en gardant sa trajectoire, puis décélérer sans arrêt brutal.",
    "Variantes et adaptations : allonger la zone de décélération pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Trouver mon allure",
  [
    "Objectif : rechercher une allure régulière sur un effort de durée adaptée, sans épuisement.",
    "Organisation : individuellement ou en petit groupe, sur une durée ou un nombre de tours défini par l’enseignant.",
    "Matériel : repères délimitant le parcours (tours ou segments).",
    "Consignes : choisir un rythme que tu peux maintenir du début à la fin, en observant tes sensations.",
    "Sécurité : ralentir ou s’arrêter dès qu’un signe inhabituel de fatigue ou de malaise apparaît, et le signaler.",
    "Critères de réussite : maintenir un rythme relativement stable, et identifier un ajustement pour le prochain essai.",
    "Variantes et adaptations : réduire la durée ou proposer une marche active selon les besoins.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Observer et ajuster",
  [
    "Objectif : observer un camarade selon des critères simples et lui donner un retour utile.",
    "Organisation : binômes, un élève pratique une des activités précédentes pendant que l’autre observe, puis les rôles s’inversent.",
    "Matériel : une petite grille d’observation avec 2 ou 3 critères simples (par exemple réaction au signal, trajectoire, décélération).",
    "Consignes : observer attentivement le camarade sans le gêner, noter ce qui est observé, puis échanger les observations de façon respectueuse.",
    "Sécurité : rester à une distance qui ne gêne pas l’élève qui pratique.",
    "Critères de réussite : donner un retour factuel et respectueux, basé sur les critères observés.",
    "Variantes et adaptations : réduire le nombre de critères observés pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Relais progressif",
  [
    "Objectif : réaliser une transmission de relais organisée, d’abord à faible vitesse.",
    "Organisation : petits groupes, avec une zone de transmission clairement marquée au sol.",
    "Matériel : un témoin scolaire ou un objet léger et sûr prévu par l’enseignant, repères pour la zone de transmission.",
    "Consignes : réaliser d’abord la transmission en marchant ou en trottinant légèrement, puis augmenter progressivement la vitesse uniquement si l’enseignant valide que les conditions sont sûres.",
    "Sécurité : ne jamais augmenter la vitesse sans validation de l’enseignant ; rester dans la zone de transmission prévue.",
    "Critères de réussite : réaliser une transmission réussie dans la zone prévue, avec une bonne communication entre partenaires.",
    "Variantes et adaptations : garder une vitesse faible plus longtemps pour les groupes qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C05-08",
  "Élève observateur avec une grille",
  "Dessiner un élève haïtien de 8e AF debout à distance raisonnable, tenant une petite feuille ou ardoise représentant une grille d’observation, observant attentivement un camarade en train de courir dans un espace scolaire.",
  "Un élève observateur utilisant une grille simple pendant qu’un camarade court.",
  "Servir de support visuel à l’Activité 4 « Observer et ajuster ».",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ---- Activité d'observation et d'analyse ----
children.push(sectionHeading("Activité d’observation et d’analyse", ""));
children.push(bodyPar(
  "Pour chacune des situations suivantes, identifie l’objectif de la course, la capacité dominante mobilisée, la stratégie d’effort adaptée, un point technique important, et une règle de sécurité applicable."
));
children.push(calloutBox(
  "Quelle stratégie pour quelle course ?",
  [
    "Situation 1 : un sprint court sur une distance de quelques mètres, avec un départ sur signal.",
    "Situation 2 : une course de durée adaptée, réalisée sur plusieurs tours d’un espace scolaire.",
    "Situation 3 : un relais en petit groupe, avec transmission d’un témoin dans une zone prévue.",
    "Situation 4 : une course organisée par un enseignant remplaçant, où la zone de décélération après l’arrivée n’a pas été prévue, et où deux élèves manquent de se percuter après la ligne d’arrivée.",
    "Pour les situations 1 à 3, réponds : quel est l’objectif de la course ? Quelle capacité domine ? Quelle stratégie d’effort est adaptée ? Quel point technique est important ? Quelle règle de sécurité s’applique ?",
    "Pour la situation 4, identifie l’erreur d’organisation, explique pourquoi elle est dangereuse, et propose une correction.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique des courses. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à te comparer aux autres élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je réagis au signal", "", ""],
    ["Je maintiens ma trajectoire", "", ""],
    ["Je termine en contrôle", "", ""],
    ["Je gère mieux mon allure", "", ""],
    ["Je coopère dans le relais", "", ""],
    ["Je respecte les zones et consignes", "", ""],
    ["Je peux expliquer un ajustement", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "La vitesse, l’endurance et le relais sont trois formes de course avec des objectifs pédagogiques différents.",
  "Un bon départ demande de l’attention au signal et une position simple et sûre, sans technique spécialisée obligatoire.",
  "L’accélération coordonne bras et jambes, en maintenant une trajectoire claire jusqu’à la fin de la zone prévue.",
  "Finir une course en sécurité demande une décélération progressive dans une zone libre, sans arrêt brutal ni collision.",
  "L’endurance exige une répartition raisonnable de l’effort, avec une allure régulière plutôt qu’un départ trop rapide.",
  "Observer sa régularité (tours, sensations, temps indicatifs) aide à s’autoévaluer et à ajuster son prochain essai.",
  "Le relais est une activité de coopération où l’organisation du groupe compte autant que la vitesse individuelle.",
  "La transmission s’apprend progressivement, en commençant à faible vitesse avant toute accélération validée par l’enseignant.",
  "Les rôles de coureur, partenaire et observateur développent la responsabilité et le retour respectueux entre élèves.",
  "L’élève de 8e AF doit désormais savoir analyser une stratégie de course, identifier un point à ajuster et le justifier.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(5));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(allure - relais - accélération - transmission - trajectoire - récupération - signal - décélération)", italics: true, color: "555555" },
]));
[
  "1. Un bon départ commence par une attention soutenue au ____________________ donné par l’enseignant.",
  "2. L’augmentation progressive de la vitesse après le départ s’appelle l’____________________.",
  "3. Rester dans son couloir ou son axe de course, c’est maintenir sa ____________________.",
  "4. Ralentir progressivement après la ligne d’arrivée s’appelle la ____________________.",
  "5. Choisir un rythme régulier que l’on peut maintenir sur une course de durée, c’est gérer son ____________________.",
  "6. Une course d’équipe où un témoin est transmis d’un coureur à l’autre s’appelle un ____________________.",
  "7. Le moment où le témoin passe d’un coureur à l’autre s’appelle la ____________________.",
  "8. Après l’effort, le retour progressif au calme fait partie de la ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quelle position de départ est recommandée au niveau scolaire, selon ce chapitre ?", opts: ["a) une technique de starting-blocks obligatoire", "b) une position debout, simple et sûre", "c) aucune position particulière n’est nécessaire", "d) une position couchée au sol"] },
  { q: "2. Que doit faire un coureur après avoir franchi la ligne d’arrivée ?", opts: ["a) s’arrêter brutalement sur place", "b) décélérer progressivement dans une zone libre prévue", "c) retourner immédiatement dans la zone des coureurs", "d) traverser les couloirs des autres coureurs"] },
  { q: "3. Qu’est-ce qu’une allure irrégulière, selon ce chapitre ?", opts: ["a) un rythme stable maintenu du début à la fin", "b) une alternance d’accélérations et de ralentissements sans logique claire", "c) une vitesse maximale tout le long du parcours", "d) une marche lente et constante"] },
  { q: "4. À quelle vitesse doit-on commencer à apprendre une transmission de relais ?", opts: ["a) à vitesse maximale dès le premier essai", "b) à faible vitesse, avant d’augmenter progressivement si l’enseignant le juge sûr", "c) la vitesse n’a aucune importance pour la transmission", "d) uniquement en compétition officielle"] },
  { q: "5. À quoi servent les mesures (temps, tours, sensations) utilisées en endurance, selon ce chapitre ?", opts: ["a) à classer les élèves du plus rapide au moins rapide", "b) à humilier les élèves les plus lents", "c) à apprendre et s’autoévaluer, sans comparaison humiliante", "d) à sélectionner les élèves pour une compétition"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition ou sa fonction correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Accélération", "a) Zone où le témoin passe d’un coureur à l’autre"],
  ["2. Trajectoire", "b) Augmentation progressive de la vitesse après le départ"],
  ["3. Allure", "c) Chemin suivi par le coureur, qu’il doit maintenir droit"],
  ["4. Zone de transmission", "d) Ralentissement progressif après la ligne d’arrivée"],
  ["5. Décélération", "e) Rythme choisi et maintenu pendant une course de durée"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève part beaucoup trop vite au début d’une course d’endurance et doit s’arrêter avant la fin. Analyse cette situation et propose un ajustement précis pour son prochain essai.",
  "2. Une arrivée de course scolaire n’a pas prévu de zone de décélération, et deux élèves manquent de se percuter juste après la ligne d’arrivée. Explique pourquoi cette organisation est dangereuse et propose une correction.",
  "3. Dans un relais, la transmission échoue plusieurs fois parce que les deux coureurs ne communiquent pas avant le passage du témoin. Propose une stratégie concrète pour améliorer cette transmission.",
  "4. Explique pourquoi ce chapitre insiste sur le fait que les mesures de temps ou de distance servent à apprendre, et non à comparer ou humilier les élèves.",
  "5. En t’appuyant sur le cycle observer-analyser-choisir-agir-ajuster, décris comment tu procéderais pour améliorer ta régularité dans une course d’endurance que tu réussis mal la première fois.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 50, "Manuel_EPS_8AF_Chapitre5.docx");
console.log("Chapitre 5 (8e AF) genere:", outPath);
