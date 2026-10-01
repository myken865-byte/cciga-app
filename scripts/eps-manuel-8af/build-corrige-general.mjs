// Corrigé général des exercices — Manuel d'EPS 8e AF (12 chapitres).
// Réponses dérivées directement du contenu réellement rédigé et validé de
// chaque chapitre (mêmes fichiers build-chapitreN.mjs) : aucune réponse
// inventée. Pour les questions D (réflexion ouverte), le corrigé donne des
// éléments de réponse attendus (critères), pas une réponse unique imposée.
import {
  AlignmentType, Paragraph, TextRun,
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  spacer, twoColTable, pageBreak, buildAndSave, FONT, NAVY, GOLD, GREY_TEXT,
} from "./common.mjs";
import { HeadingLevel } from "docx";

const children = [];

function titleBlock() {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240 },
      children: [new TextRun({ text: "Corrigé général des exercices", font: FONT, size: 34, bold: true, color: NAVY })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: "Manuel d’EPS 8e Année Fondamentale — 2026-2027", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
    }),
  ];
}

function chapTitle(num, title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 160 },
    children: [
      new TextRun({ text: `Chapitre ${num} — `, font: FONT, size: 26, bold: true, color: GOLD }),
      new TextRun({ text: title, font: FONT, size: 26, bold: true, color: NAVY }),
    ],
  });
}

function completerBlock(answers) {
  const arr = [subHeading("A. Compléter — réponses")];
  answers.forEach((a, i) => arr.push(numberedPar(`${i + 1}. ${a}`)));
  return arr;
}

function qcmBlockCorrige(answers) {
  const arr = [subHeading("B. QCM — bonnes réponses")];
  answers.forEach((a, i) => arr.push(numberedPar(`${i + 1}. ${a}`)));
  return arr;
}

function relierBlock(pairs) {
  return [
    subHeading("C. Relier — bonnes correspondances"),
    twoColTable("Colonne A", "Correspond à", pairs.map(([a, b]) => [a, b])),
    spacer(120),
  ];
}

function reflexionBlock(items) {
  const arr = [subHeading("D. Questions de réflexion — éléments de réponse attendus"), bodyPar(
    "Ces questions sont ouvertes : il n’existe pas de réponse unique à recopier. L’enseignant évalue la réponse de l’élève à l’aide des critères ci-dessous, qui indiquent les idées essentielles attendues.", { italics: true }
  )];
  items.forEach((t, i) => arr.push(numberedPar(`${i + 1}. ${t}`)));
  return arr;
}

children.push(...titleBlock());
children.push(bodyPar(
  "Ce corrigé rassemble les réponses des exercices A (Compléter), B (QCM) et C (Relier) des douze chapitres du manuel, ainsi que des éléments de réponse attendus pour les questions D (réflexion). Toutes les réponses ont été établies à partir du contenu réellement rédigé et validé de chaque chapitre ; aucune réponse n’a été inventée. Les questions de réflexion, par nature ouvertes, sont accompagnées de critères d’évaluation plutôt que d’une réponse imposée."
));
children.push(spacer(200));
children.push(pageBreak());

// ================= CHAPITRE 1 =================
children.push(chapTitle(1, "L’EPS en 8e AF : corps, mouvement, autonomie et responsabilité"));
children.push(...completerBlock([
  "posture", "équilibre", "coordination", "adaptation", "autonomie", "responsabilité", "coopération", "sécurité",
]));
children.push(...qcmBlockCorrige([
  "b) en 8e AF, l’élève progresse vers l’analyse, le choix et l’autoévaluation",
  "c) la puissance musculaire maximale",
  "b) on agit",
  "c) à observer ses propres progrès avec des critères simples",
  "b) arrêter l’activité et prévenir immédiatement l’enseignant",
]));
children.push(...relierBlock([
  ["1. Posture", "c) Alignement et organisation des parties du corps"],
  ["2. Équilibre", "d) Capacité à maintenir ou retrouver une position stable"],
  ["3. Coordination", "b) Organisation harmonieuse de plusieurs mouvements"],
  ["4. Adaptation", "a) Modifier sa réponse motrice selon la situation"],
  ["5. Autonomie", "f) Capacité à agir sans attendre chaque consigne de l’enseignant"],
  ["6. Sécurité", "e) Ensemble des règles et comportements qui protègent les élèves"],
]));
children.push(...reflexionBlock([
  "Un exemple concret hors EPS (ex. une autre matière) où l’élève observe une situation, choisit une réponse, agit puis ajuste selon le résultat.",
  "L’autoévaluation sert à mesurer son propre progrès, jamais à classer ou comparer les élèves entre eux.",
  "Un exemple concret et réaliste de responsabilité (rangement du matériel, respect d’une zone, aide à un camarade).",
  "La coopération explique la réussite collective autant que la technique individuelle ; un exemple d’activité collective à l’appui.",
]));
children.push(pageBreak());

// ================= CHAPITRE 2 =================
children.push(chapTitle(2, "Capacités physiques et motrices : coordination, vitesse, endurance, force adaptée et souplesse"));
children.push(...completerBlock([
  "capacité", "coordination", "vitesse", "allure", "mobilité", "contrôle", "sécurité", "activité",
]));
children.push(bodyPar(
  "Note d’audit — item 8 : le réservoir de mots du chapitre 2 a été corrigé après validation explicite (« endurance » remplacé par « activité »), l’ancienne formulation étant grammaticalement moins naturelle. « Endurance » reste testée dans ce chapitre via l’exercice C (Relier).",
  { italics: true }
));
children.push(...qcmBlockCorrige([
  "b) une action motrice sollicite souvent plusieurs capacités à des degrés différents",
  "b) la vitesse",
  "b) utiliser uniquement des situations sûres, sans charge lourde ni recherche de puissance maximale",
  "b) arrêter immédiatement le mouvement",
  "c) après avoir agi, au moment d’ajuster",
]));
children.push(...relierBlock([
  ["1. Coordination", "e) Capacité à organiser plusieurs actions du corps de façon contrôlée"],
  ["2. Vitesse", "a) Capacité à réaliser une action rapidement dans une situation donnée"],
  ["3. Endurance", "b) Capacité à poursuivre un effort adapté en gérant son rythme"],
  ["4. Force adaptée", "f) Capacité à produire ou contrôler une action musculaire adaptée à une tâche"],
  ["5. Souplesse", "c) Capacité à réaliser certains mouvements avec une amplitude adaptée"],
  ["6. Capacité", "d) Ressource mobilisée pour agir efficacement dans une situation motrice"],
]));
children.push(...reflexionBlock([
  "Identifier une capacité dominante dans une situation de jeu vécue et justifier avec ce que fait précisément le corps.",
  "Le camarade aurait dû gérer son allure dès le départ (partir moins vite, garder un rythme régulier) plutôt que forcer puis s’arrêter.",
  "La souplesse forcée présente un risque de blessure ; chaque élève progresse à son propre rythme, sans compétition entre élèves.",
  "Décrire un cycle observer-choisir-agir-ajuster appliqué à un parcours de coordination raté puis corrigé.",
  "Les charges lourdes/la force maximale présentent des risques pour un corps encore en développement ; le chapitre privilégie la sécurité et l’adaptation à l’âge.",
]));
children.push(pageBreak());

// ================= CHAPITRE 3 =================
children.push(chapTitle(3, "Effort physique : respiration, fréquence cardiaque, récupération et gestion de l’intensité"));
children.push(...completerBlock([
  "effort", "intensité", "respiration", "pouls", "allure", "sensations", "récupération", "sécurité",
]));
children.push(...qcmBlockCorrige([
  "b) réaliser une observation pédagogique simple, sans interprétation médicale",
  "b) elle devient plus rapide et plus ample",
  "c) un rythme que l’on peut maintenir, ajusté légèrement si nécessaire",
  "b) ralentir et prévenir immédiatement l’enseignant",
  "c) ne jamais proposer de privation d’air, d’hyperventilation ou de blocage respiratoire",
]));
children.push(...relierBlock([
  ["1. Intensité", "d) Quantité d’effort demandée par une activité"],
  ["2. Fréquence cardiaque", "e) Nombre de battements du cœur pendant une durée donnée"],
  ["3. Allure", "a) Rythme choisi et maintenu pendant une activité de durée"],
  ["4. Récupération", "b) Retour progressif de l’organisme vers un état plus calme après l’effort"],
  ["5. Sensations", "c) Indicateurs personnels comme la fatigue ressentie ou la facilité à parler"],
]));
children.push(...reflexionBlock([
  "Un départ trop rapide accélère excessivement la respiration et la fréquence cardiaque ; l’ajustement consiste à ralentir dès le début et gérer son allure.",
  "Sans récupération ni eau, la fatigue et le risque de malaise augmentent ; la récupération et l’hydratation permettent au corps de revenir à un état stable avant un nouvel effort.",
  "Étapes attendues : arrêter l’activité, informer immédiatement l’enseignant, ne pas minimiser la sensation, attendre les consignes de l’adulte.",
  "Décrire un exemple personnel où l’allure a été ajustée avant l’épuisement, avec un indicateur concret (respiration, sensations).",
  "La chaleur et l’accès limité à l’eau exigent des adaptations (pauses plus fréquentes, hydratation, intensité modérée) ; un enseignant doit en tenir compte dans l’organisation.",
]));
children.push(pageBreak());

// ================= CHAPITRE 4 =================
children.push(chapTitle(4, "Préparation à l’effort : échauffement, prévention, sécurité et organisation de la pratique"));
children.push(...completerBlock([
  "progressivité", "spécifique", "sécurité", "signal", "matériel", "zone", "récupération", "organisation",
]));
children.push(...qcmBlockCorrige([
  "b) parce que chaque activité a des exigences différentes qui demandent une préparation adaptée",
  "b) une mise en mouvement progressive et une mobilisation articulaire du corps entier",
  "c) signaler immédiatement le danger à l’enseignant",
  "b) une observation et une description pédagogique d’une situation",
  "b) la valider, l’adapter ou la refuser avant toute réalisation pratique",
]));
children.push(...relierBlock([
  ["1. Progressivité", "c) Augmentation graduelle de l’intensité, sans forcer brutalement"],
  ["2. Zone d’attente", "a) Endroit où les élèves attendent leur tour avant une activité"],
  ["3. Signal", "b) Geste ou consigne qui indique le début ou la fin d’une action"],
  ["4. Zone interdite", "e) Espace où personne ne doit se trouver pendant une action précise"],
  ["5. Responsabilité collective", "d) Fait de contribuer à la sécurité de tous en signalant un danger"],
]));
children.push(...reflexionBlock([
  "Un échauffement doit être spécifique à l’activité principale ; proposer deux échauffements distincts adaptés à la course de vitesse et à la gymnastique.",
  "Signaler la pierre à l’enseignant sans y toucher soi-même ; la décision finale revient à l’adulte, qui a la vue d’ensemble et la responsabilité de la sécurité.",
  "Traverser une zone interdite avant le signal est dangereux (risque de collision avec un objet lancé) ; correction attendue : attendre le signal, rappeler la règle.",
  "Signaler une douleur est un acte responsable, pas un signe de faiblesse ; se moquer d’un camarade qui le fait doit être découragé.",
  "Décrire l’organisation des zones (attente, action, chute) selon le cycle observer-analyser-choisir-agir-ajuster.",
]));
children.push(pageBreak());

// ================= CHAPITRE 5 =================
children.push(chapTitle(5, "Athlétisme — Courses : vitesse, endurance, relais et gestion de l’allure"));
children.push(...completerBlock([
  "signal", "accélération", "trajectoire", "décélération", "allure", "relais", "transmission", "récupération",
]));
children.push(...qcmBlockCorrige([
  "b) une position debout, simple et sûre",
  "b) décélérer progressivement dans une zone libre prévue",
  "b) une alternance d’accélérations et de ralentissements sans logique claire",
  "b) à faible vitesse, avant d’augmenter progressivement si l’enseignant le juge sûr",
  "c) à apprendre et s’autoévaluer, sans comparaison humiliante",
]));
children.push(...relierBlock([
  ["1. Accélération", "b) Augmentation progressive de la vitesse après le départ"],
  ["2. Trajectoire", "c) Chemin suivi par le coureur, qu’il doit maintenir droit"],
  ["3. Allure", "e) Rythme choisi et maintenu pendant une course de durée"],
  ["4. Zone de transmission", "a) Zone où le témoin passe d’un coureur à l’autre"],
  ["5. Décélération", "d) Ralentissement progressif après la ligne d’arrivée"],
]));
children.push(...reflexionBlock([
  "L’élève doit revoir sa gestion de l’allure au départ : partir à un rythme soutenable plutôt qu’au maximum.",
  "Sans zone de décélération, les coureurs n’ont pas d’espace pour ralentir en sécurité ; correction attendue : prévoir une zone libre après l’arrivée.",
  "Une transmission réussie exige une communication préalable (signal verbal, repère) entre les deux coureurs avant le passage du témoin.",
  "Les mesures servent à suivre son propre progrès, jamais à comparer ou humilier ; exemple à l’appui.",
  "Décrire un cycle observer-analyser-choisir-agir-ajuster appliqué à l’amélioration de la régularité d’allure.",
]));
children.push(pageBreak());

// ================= CHAPITRE 6 =================
children.push(chapTitle(6, "Athlétisme — Sauts et lancers : techniques, coordination, mesure et progression"));
children.push(...completerBlock([
  "impulsion", "réception", "trajectoire", "précision", "mesure", "coordination", "zone", "sécurité",
]));
children.push(...qcmBlockCorrige([
  "b) coordination, contrôle et technique",
  "d) la réception",
  "c) uniquement sur signal de l’enseignant, quand tous les lancers sont terminés",
  "b) à suivre sa propre progression",
  "b) donner un retour factuel et respectueux",
]));
children.push(...relierBlock([
  ["1. Impulsion", "b) Action qui permet de quitter le sol pour réaliser un saut"],
  ["2. Réception", "e) Retour équilibré au sol après un saut"],
  ["3. Trajectoire", "a) Chemin suivi par un objet lancé dans les airs"],
  ["4. Zone de chute", "c) Zone où personne ne doit se trouver pendant un lancer"],
  ["5. Mesure", "d) Fait d’évaluer un essai à l’aide d’un ruban ou de repères"],
]));
children.push(...reflexionBlock([
  "Des jambes raides à la réception indiquent un manque d’amortissement ; ajustement attendu : fléchir davantage les jambes à l’impact.",
  "Une cause possible est un mauvais alignement du corps ou du geste au moment du lâcher ; correction technique simple centrée sur l’orientation du geste.",
  "Vérifier la mesure ensemble, avec le même instrument et la même méthode, sans accusation ni jugement.",
  "Proposer une nouvelle organisation avec zones clairement délimitées et ateliers suffisamment espacés, en justifiant chaque changement par la sécurité.",
  "Récupérer un objet avant le signal reste dangereux même « une seconde » : un lancer peut survenir sans prévenir ; la règle protège tout le monde, sans exception.",
]));
children.push(pageBreak());

// ================= CHAPITRE 7 =================
children.push(chapTitle(7, "Sports collectifs : coopération, occupation de l’espace, passe, démarquage et stratégies simples"));
children.push(...completerBlock([
  "partenaire ; démarquage", "passe", "espace", "défense", "communication", "cible", "fair-play",
]));
children.push(...qcmBlockCorrige([
  "b) parce qu’elle limite fortement ses solutions de passe",
  "b) se déplacer pour devenir disponible pour un partenaire",
  "b) lorsqu’il n’existe pas de solution sûre à cet instant",
  "b) se placer, rester vigilant et protéger un espace sans contact dangereux",
  "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin",
]));
children.push(...relierBlock([
  ["1. Démarquage", "c) Action de se déplacer pour devenir disponible pour un partenaire"],
  ["2. Conservation", "a) Fait de garder le ballon lorsqu’aucune solution sûre n’est disponible"],
  ["3. Progression", "b) Action de progresser vers la cible grâce à une passe ou un déplacement"],
  ["4. Transition", "e) Changement rapide de rôle après une perte ou une récupération du ballon"],
  ["5. Défense", "d) Fait de se placer pour protéger un espace sans contact dangereux"],
]));
children.push(...reflexionBlock([
  "Un regroupement autour du ballon réduit l’espace disponible et les solutions de passe ; ajustement attendu : occuper l’espace, se démarquer.",
  "Ignorer un partenaire démarqué limite l’efficacité collective ; solution attendue : privilégier la passe quand une solution sûre existe.",
  "Rester immobile après une récupération laisse l’adversaire se replacer ; une transition rapide (recherche immédiate d’une solution) est nécessaire.",
  "Pousser un adversaire est un contact dangereux et contraire au fair-play ; l’enseignant doit arrêter le jeu, rappeler la règle et sanctionner si besoin.",
  "Exclure un camarade moins performant est inacceptable ; solution attendue : lui donner des occasions réelles de participer (passes délibérées, rôle valorisé).",
]));
children.push(pageBreak());

// ================= CHAPITRE 8 =================
children.push(chapTitle(8, "Basket-ball : maîtrise technique, démarquage, attaque, défense et coopération"));
children.push(...completerBlock([
  "dribble", "passe", "démarquage", "panier", "défense", "espace", "replacement", "coopération",
]));
children.push(...qcmBlockCorrige([
  "b) parce qu’il peut ralentir le jeu collectif et réduire les occasions de l’équipe",
  "b) se placer et se déplacer de façon contrôlée, sans contact dangereux",
  "b) le contrôle du geste et la précision",
  "b) chercher rapidement une solution sûre de passe ou de progression",
  "b) accepter la décision et, si nécessaire, en discuter calmement après l’action",
]));
children.push(...relierBlock([
  ["1. Dribble", "d) Se déplacer avec le ballon en le faisant rebondir au sol"],
  ["2. Démarquage", "e) Se déplacer pour devenir disponible pour un partenaire"],
  ["3. Espacement", "a) Répartition des joueurs dans l’espace pour offrir plusieurs solutions de passe"],
  ["4. Défense", "b) Se placer pour protéger un espace ou la cible sans contact dangereux"],
  ["5. Replacement", "c) Changement rapide de position après une perte ou une récupération du ballon"],
]));
children.push(...reflexionBlock([
  "Un dribble excessif sans passe réduit les occasions de l’équipe ; ajustement attendu : passer au partenaire démarqué.",
  "Tenter une action difficile seul plutôt que de servir un partenaire proche du panier réduit les chances de réussite ; la passe est la meilleure décision.",
  "Un regroupement permanent autour du porteur réduit l’espace et les solutions ; correction attendue : occuper l’espace, s’espacer.",
  "Pousser un adversaire est un contact dangereux et contraire au fair-play ; l’enseignant doit intervenir et rappeler la règle.",
  "Un replacement lent laisse l’adversaire se réorganiser complètement ; ajustement attendu : réagir rapidement après la récupération.",
]));
children.push(pageBreak());

// ================= CHAPITRE 9 =================
children.push(chapTitle(9, "Volley-ball : réception, passe, service et construction collective de l’échange"));
children.push(...completerBlock([
  "trajectoire", "réception", "passe", "service", "échange", "replacement", "coopération", "zone",
]));
children.push(...qcmBlockCorrige([
  "b) pour se déplacer par anticipation et bien se placer",
  "b) la régularité et le contrôle",
  "b) garder le ballon en jeu de façon organisée grâce à la coopération de l’équipe",
  "b) elle réduit les hésitations et certaines collisions entre partenaires",
  "b) prendre une décision simple sous la direction de l’enseignant, dans le respect du fair-play",
]));
children.push(...relierBlock([
  ["1. Trajectoire", "e) Chemin suivi par le ballon dans les airs"],
  ["2. Réception", "f) Premier contact contrôlé du ballon reçu par l’équipe"],
  ["3. Passe haute", "a) Geste avec les mains qui oriente le ballon vers un partenaire"],
  ["4. Service", "b) Geste qui met le ballon en jeu"],
  ["5. Échange", "c) Suite d’actions qui permet de garder le ballon en jeu entre les deux équipes"],
  ["6. Replacement", "d) Changement rapide de position après une action"],
]));
children.push(...reflexionBlock([
  "Se regrouper sous le même ballon laisse le reste du terrain vide ; ajustement attendu : occuper les zones libres.",
  "Réceptionner sans orienter le ballon vers un partenaire interrompt l’échange ; correction attendue : viser une passe précise après réception.",
  "Une communication claire (annoncer « à moi ! ») aurait évité la collision entre les deux élèves.",
  "Un service trop puissant et mal maîtrisé sort du terrain ; ajustement attendu : rechercher d’abord la régularité et le contrôle plutôt que la puissance.",
  "Une installation instable doit être signalée immédiatement à l’enseignant avant toute activité, sans l’utiliser en l’état.",
]));
children.push(pageBreak());

// ================= CHAPITRE 10 =================
children.push(chapTitle(10, "Gymnastique et expression corporelle : équilibre, coordination et construction d’enchaînements"));
children.push(...completerBlock([
  "équilibre", "coordination", "transition", "rythme", "orientation", "enchaînement", "sécurité", "expression",
]));
children.push(...qcmBlockCorrige([
  "b) l’ordre, les transitions, le contrôle et une fin maîtrisée",
  "b) remplacer cette proposition par un élément scolaire sûr, validé par l’enseignant",
  "b) la maîtrise fonctionnelle et la sécurité",
  "b) une description factuelle avec un seul ajustement utile",
  "c) les portés risqués et les acrobaties non encadrées",
]));
children.push(...relierBlock([
  ["1. Équilibre", "e) Capacité à maintenir ou retrouver une position stable"],
  ["2. Coordination", "f) Organisation harmonieuse de plusieurs mouvements"],
  ["3. Transition", "a) Passage organisé entre deux éléments d’un enchaînement"],
  ["4. Rythme", "b) Variation de vitesse, de pauses et d’accents dans un mouvement"],
  ["5. Orientation", "c) Direction et niveau utilisés dans l’espace"],
  ["6. Enchaînement", "d) Suite organisée de plusieurs actions avec un début et une fin"],
]));
children.push(...reflexionBlock([
  "Des arrêts brusques sans transition nuisent à la cohérence ; ajustement attendu : construire des transitions fluides entre les éléments.",
  "Rester au même endroit limite l’utilisation de l’espace scénique ; amélioration attendue : varier les directions et les niveaux dans l’espace disponible.",
  "Un salto est une acrobatie dangereuse non encadrée ; refus justifié, avec proposition d’un élément scolaire sûr et validé par l’enseignant à la place.",
  "Solution attendue : convenir d’un signal commun ou d’un comptage partagé pour synchroniser le groupe.",
  "Une composition bien organisée présente un début clair, un ordre logique, des transitions fluides, une utilisation de l’espace et une fin maîtrisée.",
]));
children.push(pageBreak());

// ================= CHAPITRE 11 =================
children.push(chapTitle(11, "Jeux, activités physiques haïtiennes, coopération, arbitrage et fair-play"));
children.push(...completerBlock([
  "arbitrage", "coopération", "règle", "fair-play", "équité", "sécurité", "adaptation", "impartialité",
]));
children.push(...qcmBlockCorrige([
  "b) observer attentivement la situation",
  "b) parce que les variantes régionales et locales sont réelles et font partie de leur richesse",
  "b) arrêter, rappeler la règle, écouter, appliquer la décision et reprendre calmement",
  "b) des comportements observables comme le respect des règles et l’honnêteté",
  "b) préciser règles, sécurité, arbitrage et critère de réussite, puis tester sous supervision",
]));
children.push(...relierBlock([
  ["1. Arbitrage", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
  ["2. Coopération", "f) Fait de travailler ensemble vers un objectif commun"],
  ["3. Règle", "a) Énoncé clair qui organise un jeu et le rend compréhensible par tous"],
  ["4. Fair-play", "b) Ensemble de comportements respectueux dans la victoire comme dans la défaite"],
  ["5. Équité", "c) Fait de donner à chacun une possibilité réelle de participer"],
  ["6. Impartialité", "d) Fait d’appliquer la même règle à tous, sans favoriser personne"],
]));
children.push(...reflexionBlock([
  "Démarche attendue : arrêter le jeu, rappeler calmement la règle, écouter les deux points de vue, appliquer une décision, reprendre le jeu.",
  "Favoriser ses amis viole l’impartialité ; l’enseignant doit intervenir, rappeler le principe et, si besoin, superviser davantage l’arbitrage.",
  "Deux élèves qui touchent rarement l’objet du jeu posent un problème d’équité ; adaptation attendue : règle garantissant une participation réelle de chacun.",
  "Un défi dangereux doit être refusé ; le groupe peut proposer une variante stimulante sans contact dangereux.",
  "Se moquer d’un adversaire après une victoire est contraire au fair-play ; l’élève aurait dû reconnaître le jeu de l’adversaire avec respect.",
]));
children.push(pageBreak());

// ================= CHAPITRE 12 =================
children.push(chapTitle(12, "Santé, hygiène de vie, autonomie et projet personnel d’activité physique"));
children.push(...completerBlock([
  "autonomie", "récupération", "hydratation", "objectif", "régularité", "sécurité", "planification", "progression",
]));
children.push(...qcmBlockCorrige([
  "b) privilégier la régularité et la progressivité",
  "c) un résultat observable, comme la régularité ou une progression technique",
  "b) arrêter l’activité et prévenir immédiatement un adulte responsable",
  "b) l’activité réalisée, la participation, les sensations et un point à améliorer",
  "b) la progression personnelle, de façon positive et non comparative",
]));
children.push(...relierBlock([
  ["1. Autonomie", "e) Capacité à agir de façon responsable sans attendre chaque consigne"],
  ["2. Récupération", "f) Retour progressif du corps au calme après l’effort"],
  ["3. Hydratation", "a) Fait de boire régulièrement pour compenser la perte d’eau"],
  ["4. Objectif", "b) Résultat clair et observable que l’on cherche à atteindre"],
  ["5. Régularité", "c) Fait de pratiquer une activité de façon constante dans le temps"],
  ["6. Planification", "d) Organisation à l’avance du moment, du lieu et des conditions d’une activité"],
]));
children.push(...reflexionBlock([
  "Un projet sans jour de repos est irréaliste et risqué ; version plus réaliste attendue : alterner séances et jours de récupération.",
  "L’absence de récupération augmente la fatigue et les risques ; amélioration attendue : prévoir un temps de retour au calme après chaque séance.",
  "Adapter son projet face à un danger (chaleur extrême, terrain dangereux) est un acte de responsabilité, pas un échec ; solution attendue : choisir un autre moment ou lieu sûr.",
  "« Avoir un corps plus musclé rapidement » n’est pas un objectif observable et cible l’apparence ; reformulation attendue centrée sur une action mesurable (ex. : marcher régulièrement trois fois par semaine).",
  "Adapter le projet aux ressources disponibles (matériel simple, espace existant) sans jamais le présenter comme un défaut ; valoriser la régularité plutôt que le matériel.",
]));

const outPath = await buildAndSave(children, 167, "Manuel_EPS_8AF_CorrigeGeneral.docx");
console.log("Corrigé général (8e AF) genere:", outPath);
