// Manuel d'EPS 9e AF — Chapitre 10
// Arbitrage, regles, fair-play, cooperation et responsabilite
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, chapterOpening,
  exercicesHeading, pageBreak, qcmBlock, spacer, buildAndSave,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
} from "./common.mjs";

const children = [];

// ================= OUVERTURE DE CHAPITRE =================
children.push(...chapterOpening(
  10,
  "Arbitrage, règles, fair-play, coopération et responsabilité",
  "Sans arbitre, sans règle acceptée par tous, sans un minimum de confiance entre joueurs — un match n’est plus un match. Ce qui rend le sport possible n’est pas seulement technique.",
  [
    "Distinguer règle, faute, sanction, décision arbitrale, fair-play, coopération et responsabilité.",
    "Expliquer les fonctions essentielles de l’arbitrage en EPS et dans le sport organisé.",
    "Observer une situation et appliquer une règle connue sans favoritisme.",
    "Communiquer une décision avec calme, clarté et respect.",
    "Accepter une décision sans agressivité et utiliser les procédures prévues pour demander une explication.",
    "Coopérer dans différents rôles au sein d’un groupe.",
    "Analyser un conflit simple et proposer une réponse respectueuse, équitable et sécuritaire.",
  ],
));
children.push(spacer(200));

// ---- 10.1 ----
children.push(sectionHeading("Pourquoi les sports ont-ils des règles ?", "10.1"));
children.push(bodyPar(
  "Les règles d’un sport remplissent plusieurs fonctions à la fois : elles assurent la sécurité des joueurs, garantissent l’équité entre les équipes, organisent clairement le déroulement du jeu, permettent une compréhension commune de ce qui se passe, et rendent possible l’évaluation d’une action (juger si elle est correcte ou non). Une règle n’est donc jamais seulement une interdiction : c’est une condition nécessaire pour qu’un jeu collectif puisse exister."
));
children.push(illustrationBox(
  "ILL-9AF-C10-01",
  "Règles et organisation",
  "Scène scolaire haïtienne montrant des élèves en pleine activité sportive, un observateur/arbitre scolaire en position adaptée, limites du terrain clairement visibles, ambiance organisée et respectueuse.",
  "Une pratique sportive organisée grâce au respect des règles communes.",
  "Ancrer visuellement l’idée que les règles rendent possible une pratique organisée.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 10.2 ----
children.push(sectionHeading("Règles et responsabilité", "10.2"));
children.push(bodyPar(
  "Connaître une règle ne suffit pas : il faut aussi l’appliquer soi-même, dans son propre comportement, sans attendre qu’un arbitre ou un enseignant l’impose à chaque instant. Chaque choix individuel — respecter une règle ou la contourner — a des conséquences directes sur l’ensemble du groupe et sur la qualité de l’activité collective."
));
children.push(spacer(200));

// ---- 10.3 ----
children.push(sectionHeading("Le rôle de l’arbitre", "10.3"));
children.push(bodyPar(
  "L’arbitre observe le jeu, reste impartial envers les deux équipes, applique les règles communes, veille à la sécurité, communique ses décisions clairement, et gère le déroulement général du jeu. Ce chapitre ne présente jamais l’arbitre comme une autorité pouvant agir de façon arbitraire : ses décisions doivent toujours pouvoir s’appuyer sur une règle connue et sur ce qui a été réellement observé."
));
children.push(spacer(200));

// ---- 10.4 ----
children.push(sectionHeading("Observer avant de décider", "10.4"));
children.push(bodyPar(
  "Avant de décider, il faut apprendre à distinguer ce qui a été réellement observé d’une simple impression ou d’une supposition. Une démarche simple guide cette observation : observer → identifier la règle concernée → décider → communiquer la décision."
));
children.push(illustrationBox(
  "ILL-9AF-C10-02",
  "Observer avant de décider",
  "Un arbitre scolaire haïtien correctement placé, à une distance adaptée, observant attentivement une action de jeu (football, basketball ou volleyball), attitude concentrée et neutre.",
  "Un bon placement d’observation, condition d’une décision fiable.",
  "Illustrer concrètement l’importance du placement et de l’observation avant toute décision.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 10.5 ----
children.push(sectionHeading("Signaler et expliquer une décision", "10.5"));
children.push(bodyPar(
  "Une fois la décision prise, elle doit être communiquée clairement, par un signal simple et une explication respectueuse, sans jamais humilier les joueurs concernés. Ce chapitre n’introduit que des signaux déjà pertinents pour les sports étudiés dans ce manuel."
));
children.push(illustrationBox(
  "ILL-9AF-C10-03",
  "Communiquer une décision",
  "Un arbitre scolaire haïtien communiquant une décision par un signal simple et une explication brève à deux joueurs, attitude calme et respectueuse, aucune confrontation visible.",
  "Une décision communiquée clairement et respectueusement.",
  "Illustrer une communication de décision sans confrontation ni humiliation.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 10.6 ----
children.push(sectionHeading("Accepter une décision et gérer le désaccord", "10.6"));
children.push(bodyPar(
  "Un désaccord avec une décision peut toujours être exprimé, mais uniquement avec respect. Les insultes, les menaces, l’intimidation et la violence sont strictement interdites. Ce chapitre développe plutôt l’écoute, la maîtrise de soi, et un dialogue encadré par l’enseignant lorsque cela est nécessaire."
));
children.push(spacer(200));

// ---- 10.7 ----
children.push(sectionHeading("Le fair-play", "10.7"));
children.push(bodyPar(
  "Le fair-play mobilise l’honnêteté, le respect, l’équité, le refus de tricher, la reconnaissance spontanée d’une faute commise, le respect de l’adversaire et l’acceptation du résultat, qu’il soit favorable ou non. Le fair-play dépasse le simple respect formel des règles : c’est aussi ce qui pousse un joueur à agir correctement même lorsque personne ne le surveille."
));
children.push(calloutBox(
  "Fair-play",
  ["Reconnaître spontanément une faute que personne n’a vue est l’une des marques les plus fortes du fair-play — bien au-delà du simple respect des règles imposées."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(illustrationBox(
  "ILL-9AF-C10-04",
  "Le fair-play",
  "Un élève haïtien de 9e AF levant la main pour signaler spontanément que le ballon est sorti sur lui, alors qu’aucun adulte ne le regardait directement ; camarades et enseignant réagissant avec approbation respectueuse.",
  "Un comportement fair-play : reconnaître une faute même sans être surveillé.",
  "Illustrer concrètement l’honnêteté sportive au-delà du simple respect formel des règles.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 10.8 ----
children.push(sectionHeading("Coopération et communication", "10.8"));
children.push(bodyPar(
  "Coopérer, c’est partager les rôles, écouter les autres, encourager avec respect, communiquer utilement, et rechercher ensemble un objectif collectif. Un élève moins performant ne doit jamais être mis à l’écart : la coopération suppose d’inclure chacun, quel que soit son niveau."
));
children.push(illustrationBox(
  "ILL-9AF-C10-05",
  "Coopération",
  "Petit groupe d’élèves haïtiens de 9e AF répartissant ensemble des rôles et du matériel de façon organisée (ballons, cônes, chasubles), ambiance collaborative et inclusive.",
  "Un groupe qui coopère en répartissant rôles et matériel de façon organisée.",
  "Illustrer concrètement la coopération dans une tâche collective simple.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 10.9 ----
children.push(sectionHeading("Responsabilité individuelle", "10.9"));
children.push(bodyPar(
  "La responsabilité individuelle se manifeste par la ponctualité, le respect des consignes, l’utilisation correcte du matériel, l’attention portée à la sécurité, la maîtrise de son propre comportement, et un engagement réel dans la tâche proposée."
));
children.push(spacer(200));

// ---- 10.10 ----
children.push(sectionHeading("Responsabilité collective", "10.10"));
children.push(bodyPar(
  "Une équipe ou un groupe partage aussi une responsabilité collective : protéger l’espace de pratique, respecter les autres groupes qui partagent le même espace ou le même matériel, organiser correctement ce matériel, et contribuer activement à un climat sûr pour tous."
));
children.push(spacer(200));

// ---- 10.11 ----
children.push(sectionHeading("Arbitrage scolaire dans le football", "10.11"));
children.push(bodyPar(
  "En t’appuyant sur les règles déjà étudiées au Chapitre 4 (touche, corner, coup de pied de but, coup franc), observe une situation simple : un ballon sort par la ligne de touche. Identifie la règle concernée, décide quelle équipe doit remettre le ballon en jeu, et explique ta décision."
));
children.push(spacer(200));

// ---- 10.12 ----
children.push(sectionHeading("Arbitrage scolaire dans le basketball", "10.12"));
children.push(bodyPar(
  "En t’appuyant sur les règles déjà étudiées au Chapitre 6 (marcher, reprise de dribble), observe une situation simple : un joueur semble avoir repris son dribble après l’avoir arrêté. Observe attentivement, identifie la règle concernée, communique ta décision avec clarté."
));
children.push(spacer(200));

// ---- 10.13 ----
children.push(sectionHeading("Arbitrage scolaire dans le volleyball", "10.13"));
children.push(bodyPar(
  "En t’appuyant sur les règles déjà étudiées au Chapitre 8 (trois touches maximum, ballon dedans/dehors), place-toi correctement pour observer une situation simple : une équipe semble avoir touché le ballon plus de trois fois. Justifie ta décision à partir de ce que tu as réellement observé."
));
children.push(spacer(200));

// ---- 10.14 ----
children.push(sectionHeading("Conflits et résolution responsable", "10.14"));
children.push(bodyPar(
  "Plusieurs désaccords réalistes peuvent survenir en EPS : une contestation d’une décision, une accusation de tricherie, l’exclusion d’un partenaire, ou un mauvais partage du matériel. Dans chaque cas, une solution non violente et équitable doit être recherchée, en écoutant les personnes concernées et en s’appuyant sur les règles ou les valeurs étudiées dans ce chapitre."
));
children.push(illustrationBox(
  "ILL-9AF-C10-07",
  "Résolution d’un désaccord",
  "Deux élèves haïtiens de 9e AF en léger désaccord, un enseignant intervenant calmement pour encadrer un dialogue respectueux ; attitudes non agressives des deux côtés.",
  "Un désaccord géré par le dialogue encadré, sans agressivité.",
  "Illustrer une résolution de conflit respectueuse et non violente.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 10.15 ----
children.push(sectionHeading("Éthique sportive et citoyenneté", "10.15"));
children.push(bodyPar(
  "Le respect des règles, la responsabilité, la dignité de chacun, la coopération et la vie collective sont étroitement liés : ce que l’on apprend à respecter dans une activité sportive scolaire — les règles communes, l’arbitre, les partenaires, les adversaires — prépare aussi à des comportements responsables dans d’autres situations de la vie collective."
));
children.push(spacer(200));

// ---- 10.16 ----
children.push(sectionHeading("Sécurité et devoir d’intervention", "10.16"));
children.push(bodyPar(
  "Un élève qui remarque un équipement dangereux, un malaise, une blessure ou toute situation présentant un risque doit toujours le signaler immédiatement à l’enseignant. Il ne doit jamais improviser lui-même un geste de secours qu’il ne maîtrise pas : signaler rapidement et clairement reste la réponse la plus responsable."
));
children.push(calloutBox(
  "Sécurité",
  ["Signaler un risque à l’enseignant est toujours la bonne réponse. Un élève ne doit jamais improviser un geste de secours qu’il ne maîtrise pas."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(illustrationBox(
  "ILL-9AF-C10-06",
  "Responsabilité et sécurité",
  "Des élèves haïtiens de 9e AF remarquant un risque (matériel mal rangé, sol glissant) et se dirigeant immédiatement vers leur enseignant pour le signaler, attitude responsable et calme.",
  "Signaler un risque à l’enseignant plutôt que d’improviser une solution.",
  "Illustrer concrètement le devoir d’intervention responsable présenté dans cette section.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- Méthode ----
children.push(sectionHeading("Prendre une décision d’arbitrage", ""));
children.push(calloutBox(
  "Méthode — Prendre une décision d’arbitrage",
  [
    "Me placer pour observer.",
    "Observer les faits.",
    "Identifier la règle étudiée.",
    "Prendre une décision impartiale.",
    "La communiquer clairement.",
    "Reprendre le jeu dans le calme.",
    "Si la situation est incertaine ou dépasse mon rôle, demander l’intervention de l’enseignant.",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Vivre l’arbitrage et la coopération à l’école haïtienne", ""));
children.push(bodyPar(
  "Dans une cour d’école, un terrain scolaire ou un espace polyvalent, le matériel et l’espace sont souvent partagés entre plusieurs groupes. L’arbitrage scolaire, présenté dans ce chapitre, reste toujours un outil d’apprentissage sous la supervision de l’enseignant, jamais une délégation de la responsabilité de sécurité, qui reste celle de l’adulte responsable."
));
children.push(spacer(200));

// ---- Tableau de responsabilités ----
children.push(sectionHeading("Tableau de responsabilités", ""));
children.push(threeColTable(
  ["Rôle", "Responsabilités", "Comportements à éviter"],
  [
    ["Joueur", "Respecter les règles, ses partenaires, ses adversaires et l’arbitre", "Tricher, contester agressivement, ignorer une consigne de sécurité"],
    ["Arbitre scolaire", "Observer, appliquer une règle connue, communiquer sa décision avec calme", "Décider sans avoir observé, favoriser un camp, humilier un joueur"],
    ["Observateur", "Regarder attentivement, relever des informations utiles à l’analyse", "Juger sans avoir observé, se moquer d’un camarade"],
    ["Responsable du matériel", "Vérifier, ranger et signaler tout matériel endommagé ou mal placé", "Laisser du matériel dans une zone de passage ou de jeu"],
    ["Membre d’équipe", "Coopérer, inclure chacun, partager l’information utile", "Exclure un partenaire, refuser de coopérer"],
  ],
  [2400, 3800, 2800],
));
children.push(bodyPar(
  "Aucune responsabilité présentée dans ce tableau ne remplace celle de l’enseignant, qui reste seul responsable de la sécurité générale de l’activité.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique — « J’observe, je décide, j’explique »", ""));
children.push(bodyPar(
  "En petits groupes, réalisez plusieurs mini-situations d’arbitrage scolaire liées au football, au basketball ou au volleyball déjà étudiés, en faisant alterner les rôles de joueur, d’observateur, d’arbitre scolaire et d’analyste."
));
[
  "Choisissez une règle déjà étudiée dans un des chapitres sportifs précédents.",
  "Réalisez une courte situation de jeu illustrant cette règle.",
  "L’élève-arbitre observe, décide et communique sa décision.",
  "Après chaque situation, l’élève-arbitre justifie brièvement sa décision.",
  "Changez de rôle et recommencez avec une autre règle.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "L’élève n’arbitre jamais que des règles déjà apprises ; l’enseignant reste à tout moment responsable du cadre général et de la sécurité.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE FAIR-PLAY =================
children.push(sectionHeading("Activité — « Le défi du fair-play »", ""));
children.push(bodyPar(
  "Pour chaque situation suivante, identifie le comportement le plus responsable parmi plusieurs possibles, et explique pourquoi."
));
[
  "Après une faute commise sans que l’arbitre ne l’ait vue.",
  "Après une décision arbitrale que le joueur croit incorrecte.",
  "Après une victoire face à une équipe qui a beaucoup progressé pendant le match.",
  "Après une défaite qui déçoit fortement un groupe d’élèves.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Cette activité ne vise jamais à humilier un élève, à sanctionner collectivement un groupe, ni à mettre en scène une situation agressive.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(pageBreak());
children.push(sectionHeading("Activité d’analyse — « Que ferais-tu ? »", ""));
children.push(illustrationBox(
  "ILL-9AF-C10-08",
  "Analyse multisport",
  "Planche en trois vignettes montrant une situation à analyser en football, une en basketball et une en volleyball, chacune impliquant une règle, une décision ou un comportement à examiner. Élèves haïtiens de 9e AF, environnements scolaires sûrs.",
  "Trois situations, une par sport déjà étudié, à analyser du point de vue des règles et des valeurs de ce chapitre.",
  "Servir de support commun à l’activité d’analyse du chapitre.",
  "Paysage, format horizontal, planche en 3 vignettes.",
));
[
  "Un camarade conteste agressivement une décision arbitrale.",
  "Un joueur reconnaît que le ballon est sorti sur lui, sans que personne ne l’ait vu.",
  "Un groupe exclut régulièrement un élève moins performant des actions de jeu.",
  "Du matériel est laissé dans une zone présentant un risque pour d’autres élèves.",
  "Deux joueurs réclament chacun la même décision en leur faveur.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Pour chaque situation, réponds à quatre questions : Quel est le problème ? Quelle règle ou valeur est concernée ? Quelle réponse est responsable ? Comment éviter que la situation ne s’aggrave ?",
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
    ["Je connais les règles étudiées", "", ""],
    ["J’observe avant de décider", "", ""],
    ["Je peux expliquer une décision", "", ""],
    ["Je reste respectueux en cas de désaccord", "", ""],
    ["Je coopère", "", ""],
    ["Je prends soin du matériel", "", ""],
    ["Je signale un risque", "", ""],
    ["J’accepte mes responsabilités", "", ""],
    ["Je reconnais une erreur", "", ""],
    ["Je peux proposer une solution équitable", "", ""],
  ],
  [3600, 3200, 2400],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Les règles assurent sécurité, équité, organisation et compréhension commune du jeu ; elles ne sont jamais de simples interdictions.",
  "L’arbitre observe, applique les règles avec impartialité, veille à la sécurité et communique ses décisions clairement.",
  "Un désaccord peut s’exprimer, mais toujours avec respect ; insultes, menaces et violence sont strictement interdites.",
  "Le fair-play dépasse le respect formel des règles : il pousse à bien agir même sans surveillance.",
  "Coopération et communication supposent d’inclure chacun, quel que soit son niveau.",
  "Responsabilité individuelle et responsabilité collective se complètent pour garantir une pratique sûre et respectueuse.",
  "Les règles déjà étudiées au football, au basketball et au volleyball permettent de pratiquer un arbitrage scolaire simple, toujours sous supervision.",
  "Un désaccord ou un conflit se résout par le dialogue, jamais par la violence ; un risque se signale toujours à l’enseignant.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : reconnaître une règle ou une valeur, analyser une situation, identifier une décision adaptée, expliquer le rôle d’un arbitre, proposer une résolution de conflit et justifier un comportement responsable, à partir de situations nouvelles en football, basketball et volleyball.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(10));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(sécurité - décision - règle - respect - impartialité - observation - coopération - fair-play - arbitre - responsabilité)", italics: true, color: "555555" },
]));
[
  "1. Un énoncé clair qui organise un jeu et le rend compréhensible par tous s’appelle une ____________________.",
  "2. La personne qui observe le jeu, signale et décide selon des règles communes s’appelle l’____________________.",
  "3. Le fait d’appliquer la même règle à tous, sans favoriser personne, s’appelle l’____________________.",
  "4. Un ensemble de comportements honnêtes et respectueux, au-delà du simple respect formel des règles, s’appelle le ____________________.",
  "5. Le fait de travailler ensemble vers un objectif commun s’appelle la ____________________.",
  "6. Le fait d’assumer les conséquences de ses choix et de son comportement s’appelle la ____________________.",
  "7. L’ensemble des règles et comportements qui protègent les élèves s’appelle la ____________________.",
  "8. Le fait de choisir une action après avoir observé une situation s’appelle une ____________________.",
  "9. La considération que l’on porte aux autres, à leurs différences et aux règles communes s’appelle le ____________________.",
  "10. Le fait de regarder attentivement une situation avant d’agir s’appelle l’____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. À quoi servent les règles d’un sport, selon ce chapitre ?", opts: ["a) uniquement à interdire des actions", "b) à assurer la sécurité, l’équité, l’organisation et une compréhension commune du jeu", "c) à donner tous les pouvoirs à l’arbitre", "d) à compliquer inutilement la pratique"] },
  { q: "2. Comment ce chapitre présente-t-il le rôle de l’arbitre ?", opts: ["a) comme une autorité pouvant agir arbitrairement", "b) comme une personne qui observe, applique les règles avec impartialité et communique ses décisions", "c) comme un simple spectateur sans responsabilité", "d) comme un joueur supplémentaire de l’une des deux équipes"] },
  { q: "3. Que doit faire un élève qui n’est pas d’accord avec une décision arbitrale ?", opts: ["a) contester bruyamment et agressivement", "b) exprimer son désaccord avec respect, en utilisant les procédures prévues", "c) ignorer complètement la décision et continuer à jouer autrement", "d) menacer l’arbitre"] },
  { q: "4. Qu’est-ce que le fair-play, selon ce chapitre, dépasse ?", opts: ["a) le simple respect formel des règles", "b) la victoire", "c) la coopération", "d) la sécurité"] },
  { q: "5. Que doit faire un élève qui remarque un équipement dangereux ou un risque pendant une activité ?", opts: ["a) improviser une solution lui-même", "b) le signaler immédiatement à l’enseignant", "c) l’ignorer si l’activité semble pouvoir continuer", "d) attendre qu’un accident se produise pour réagir"] },
  { q: "6. Que doit faire un groupe qui exclut systématiquement un élève moins performant, selon ce chapitre ?", opts: ["a) continuer, car la performance justifie ce choix", "b) inclure cet élève, la coopération excluant toute mise à l’écart injustifiée", "c) demander à cet élève de quitter l’activité", "d) ignorer le problème tant qu’il n’est pas signalé"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque notion de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Arbitre", "a) Fait de travailler ensemble vers un objectif commun"],
  ["2. Règle", "b) Fait d’assumer, seul, les conséquences de ses choix et de son comportement"],
  ["3. Fair-play", "c) Fait, pour un groupe, de protéger l’espace de pratique et de contribuer à un climat sûr"],
  ["4. Coopération", "d) Ensemble des règles et comportements qui protègent les élèves"],
  ["5. Responsabilité individuelle", "e) Fait d’appliquer la même règle à tous, sans favoriser personne"],
  ["6. Responsabilité collective", "f) Personne qui observe le jeu, signale et décide selon des règles communes"],
  ["7. Sécurité", "g) Énoncé clair qui organise un jeu et le rend compréhensible par tous"],
  ["8. Impartialité", "h) Ensemble de comportements honnêtes et respectueux, au-delà du simple respect formel des règles"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un camarade conteste agressivement une décision arbitrale pendant un match scolaire. Analyse cette situation et explique quelle réponse aurait été plus responsable de sa part.",
  "2. Un joueur reconnaît spontanément que le ballon est sorti sur lui, alors que personne n’avait vu l’action. Explique en quoi ce comportement illustre le fair-play.",
  "3. Un groupe exclut régulièrement un élève moins performant des actions de jeu. Analyse cette situation du point de vue de la coopération et propose une solution concrète.",
  "4. Après une activité, du matériel est laissé dans une zone où d’autres élèves doivent circuler. Explique pourquoi cette situation est problématique et ce que le groupe aurait dû faire.",
  "5. Un arbitre scolaire doit prendre une décision sur une action qu’il n’a pas clairement observée. Explique ce qu’il devrait faire dans cette situation.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 123, "Manuel_EPS_9AF_Chapitre10.docx");
console.log("Chapitre 10 (9e AF) genere:", outPath);
