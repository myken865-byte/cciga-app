// Manuel d'EPS 9e AF — Chapitre 1
// L'EPS en 9e AF : autonomie, responsabilite, sante et competences
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, chapterOpening,
  exercicesHeading, pageBreak, qcmBlock, spacer, buildAndSave,
  NAVY, TEAL, GOLD, GREY_TEXT,
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
  1,
  "L’EPS en 9e AF : autonomie, responsabilité, santé et compétences",
  "Et si l’Éducation Physique et Sportive n’était pas seulement une affaire de mouvement, mais aussi d’observation, de décision et de progrès personnel ?",
  [
    "Expliquer ce qu’est l’EPS et son rôle dans ta formation.",
    "Distinguer pratiquer, observer, analyser et ajuster.",
    "Comprendre ce qu’est une compétence et pourquoi l’autonomie devient plus importante en 9e AF.",
    "Identifier tes responsabilités et les comportements sécuritaires pendant une séance.",
    "Relier activité physique, santé et hygiène de vie.",
    "Coopérer et respecter partenaires, adversaires, arbitres et enseignant.",
    "Commencer à construire ton bilan personnel.",
  ],
));

children.push(illustrationBox(
  "ILL-9AF-C01-01",
  "L’EPS en 9e AF",
  "Groupe d’élèves haïtiens de 9e AF dans une cour d’école organisée, en pleine séance d’EPS : certains pratiquent une activité, d’autres observent et échangent, un enseignant supervise en retrait. Ambiance sérieuse, active et positive.",
  "Une séance d’EPS bien organisée mêle pratique, observation et coopération.",
  "Illustrer d’emblée que l’EPS ne se limite pas à l’exécution de mouvements.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 1.1 ----
children.push(sectionHeading("L’EPS au troisième cycle fondamental", "1.1"));
children.push(bodyPar(
  "L’Éducation Physique et Sportive est une discipline éducative à part entière, au même titre que les autres matières de ton programme. Elle ne se limite pas à « faire du sport » : elle relie l’action corporelle, la réflexion et l’apprentissage. Quand tu cours, joues, sautes ou coopères avec un camarade, tu mobilises en même temps ton corps et ton esprit — tu observes une situation, tu réfléchis, puis tu agis."
));
children.push(bodyPar(
  "Au troisième cycle, et particulièrement en 9e AF, l’EPS te prépare à devenir un pratiquant plus autonome, plus réfléchi et plus responsable, capable de comprendre pourquoi il agit d’une certaine façon, et pas seulement de reproduire un geste."
));
children.push(calloutBox(
  "Le savais-tu ?",
  ["Dans de nombreux systèmes éducatifs, l’EPS est reconnue comme une discipline qui contribue à la santé, à la citoyenneté et à la réussite scolaire globale de l’élève, et pas seulement à la performance physique."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A0F",
));
children.push(spacer(200));

// ---- 1.2 ----
children.push(sectionHeading("Les compétences à consolider en 9e AF", "1.2"));
children.push(bodyPar(
  "Une compétence n’est pas seulement un geste technique réussi. C’est la capacité à mobiliser, dans une situation donnée, plusieurs ressources à la fois : des connaissances (ce que tu sais), des gestes (ce que tu sais faire), des méthodes (comment tu t’organises) et des comportements (comment tu agis avec les autres et avec les règles)."
));
children.push(bodyPar(
  "Par exemple, bien te démarquer dans un jeu collectif suppose de connaître la règle du jeu, de savoir te déplacer efficacement, de choisir le bon moment pour agir, et de le faire dans le respect de tes partenaires et adversaires. En 9e AF, tu es invité à consolider ces compétences déjà abordées les années précédentes, en devenant plus autonome dans la façon dont tu les mobilises."
));
children.push(calloutBox(
  "À retenir",
  ["Une compétence = connaissances + gestes + méthode + comportement, mobilisés ensemble dans une situation réelle."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(200));

// ---- 1.3 ----
children.push(sectionHeading("De la pratique guidée vers l’autonomie", "1.3"));
children.push(bodyPar(
  "Depuis les années précédentes, tu as pratiqué de nombreuses activités sous la conduite de ton enseignant. En 9e AF, tu es invité à devenir progressivement plus autonome : comprendre une consigne sans qu’elle soit répétée plusieurs fois, préparer le matériel nécessaire, observer l’espace disponible, organiser ton action, respecter les règles fixées, prendre de petites décisions, analyser ce qui s’est passé, et demander de l’aide lorsque c’est nécessaire."
));
children.push(bodyPar(
  "Cette autonomie grandissante ne signifie jamais que l’enseignant se retire : il reste à tout moment responsable de l’organisation générale et de la sécurité de la séance. L’autonomie de l’élève s’exerce toujours à l’intérieur d’un cadre organisé et supervisé."
));
children.push(illustrationBox(
  "ILL-9AF-C01-03",
  "Autonomie responsable",
  "Petit groupe d’élèves haïtiens de 9e AF préparant correctement une activité (installation de cônes ou d’un petit espace de jeu) sous le regard attentif d’un enseignant présent en arrière-plan. Aucune situation dangereuse.",
  "L’autonomie se construit toujours à l’intérieur d’un cadre organisé et supervisé.",
  "Montrer une autonomie réelle mais encadrée, sans jamais suggérer une absence de supervision.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 1.4 ----
children.push(sectionHeading("Observer, analyser, décider et ajuster", "1.4"));
children.push(bodyPar(
  "Que ce soit dans un jeu collectif, dans la gestion de ton effort ou dans une question de sécurité, une même démarche peut t’aider à mieux agir : observer la situation, comprendre ce qui se passe, décider d’une action, agir, analyser le résultat, puis ajuster si nécessaire."
));
children.push(calloutBox(
  "Méthode",
  [
    "OBSERVER : que se passe-t-il autour de moi, dans le jeu, dans mon corps ?",
    "COMPRENDRE : qu’est-ce que cela signifie ? Quel est le problème ou l’enjeu ?",
    "DÉCIDER : quelle solution je choisis, et pourquoi ?",
    "AGIR : je mets ma décision en pratique.",
    "ANALYSER : qu’est-ce qui a fonctionné ou non ?",
    "AJUSTER : qu’est-ce que je modifie pour la prochaine fois ?",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(illustrationBox(
  "ILL-9AF-C01-02",
  "Observer → comprendre → décider → agir → analyser → ajuster",
  "Schéma pédagogique clair en six étapes reliées par des flèches formant un cycle, chaque étape illustrée par une petite icône sobre (œil, point d’interrogation, flèche de choix, silhouette en action, loupe, flèche de correction). Style épuré, sans effet 3D ni dégradé.",
  "La démarche observer-comprendre-décider-agir-analyser-ajuster, présentée comme un cycle continu.",
  "Servir de repère visuel réutilisable dans les activités du chapitre.",
  "Paysage, format horizontal, schéma pleine largeur.",
));
children.push(spacer(200));

// ---- 1.5 ----
children.push(sectionHeading("Santé, sécurité et responsabilité", "1.5"));
children.push(bodyPar(
  "Une pratique physique de qualité repose aussi sur une bonne préparation : s’échauffer avant l’effort, s’hydrater régulièrement, respecter les temps de récupération, et adopter une hygiène adaptée. Elle repose également sur le respect des consignes, de l’espace de pratique et du matériel."
));
children.push(calloutBox(
  "Sécurité",
  ["En cas de douleur, de malaise ou de tout problème inhabituel pendant une activité, arrête immédiatement ce que tu fais et préviens ton enseignant ou un adulte responsable. Ce réflexe est une preuve de responsabilité, jamais un signe de faiblesse."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(illustrationBox(
  "ILL-9AF-C01-04",
  "Observer un espace scolaire en sécurité",
  "Un élève haïtien de 9e AF observant attentivement un espace scolaire avant une activité (sol, obstacles éventuels, matériel), avec quelques éléments à vérifier suggérés dans la scène (une pierre isolée, une zone humide, du matériel mal rangé). Aucune situation déjà dangereuse en cours, seulement une observation préventive.",
  "Vérifier l’espace avant une activité fait partie des responsabilités de chacun.",
  "Servir de support à une activité d’observation de la sécurité.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 1.6 ----
children.push(sectionHeading("Coopération et respect d’autrui", "1.6"));
children.push(bodyPar(
  "Réussir une activité collective demande de communiquer clairement, de s’entraider, et d’assumer sa part de responsabilité dans le groupe. Cela suppose aussi de respecter les différences de niveau entre élèves, ainsi que tes partenaires comme tes adversaires : chacun progresse à son propre rythme, et chacun mérite le même respect."
));
children.push(illustrationBox(
  "ILL-9AF-C01-05",
  "Coopérer pour résoudre un problème moteur",
  "Petit groupe d’élèves haïtiens de 9e AF résolvant ensemble un problème moteur simple (par exemple faire traverser un objet d’un point à un autre sans le faire tomber, en se coordonnant). Expressions concentrées et coopératives, aucune compétition visible.",
  "Un groupe qui communique et s’organise ensemble pour résoudre un problème moteur.",
  "Illustrer concrètement la coopération en action.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 1.7 ----
children.push(sectionHeading("Valeurs éducatives", "1.7"));
children.push(bodyPar(
  "Le respect, la solidarité, la tolérance, l’honnêteté, l’équité, le fair-play et la responsabilité ne sont pas des idées abstraites : ce sont des comportements concrets que tu peux observer et pratiquer à chaque séance. Féliciter un adversaire, reconnaître une faute commise sans attendre d’être vu, ou inclure un camarade moins à l’aise sont des exemples très concrets de ces valeurs en action."
));
children.push(calloutBox(
  "Fair-play",
  ["Le fair-play, c’est respecter les règles, les partenaires, les adversaires et l’arbitre, dans la victoire comme dans la défaite — et reconnaître honnêtement ses propres erreurs."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(illustrationBox(
  "ILL-9AF-C01-06",
  "Une situation de fair-play",
  "Deux élèves haïtiens de 9e AF, l’un aidant l’autre à se relever après une chute sans gravité pendant un jeu, avec une attitude clairement respectueuse et bienveillante.",
  "Reconnaître un comportement respectueux, caractéristique du fair-play.",
  "Servir de support à une observation guidée du fair-play en situation.",
  "Paysage, format horizontal, plan rapproché.",
));
children.push(spacer(200));

// ---- 1.8 ----
children.push(sectionHeading("Construire son bilan personnel", "1.8"));
children.push(bodyPar(
  "Faire le point régulièrement sur sa propre pratique t’aide à mieux progresser. Ce bilan personnel — ou autoévaluation — porte sur ce que tu maîtrises, sur tes difficultés, sur le respect des consignes, sur ta coopération avec les autres, et sur les stratégies que tu peux utiliser pour t’améliorer. Il ne sert jamais à te comparer aux autres élèves."
));
children.push(calloutBox(
  "Autoévaluation",
  ["Faire le point sur sa pratique n’est ni un jugement, ni une compétition : c’est un outil personnel pour mieux se connaître et progresser à son propre rythme."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(illustrationBox(
  "ILL-9AF-C01-07",
  "Construire son bilan personnel",
  "Un élève haïtien de 9e AF assis calmement, complétant une petite grille d’autoévaluation après une activité, expression concentrée et sereine.",
  "L’autoévaluation est un moment calme et personnel de bilan, non comparatif.",
  "Illustrer la démarche d’autoévaluation présentée dans cette section.",
  "Portrait, format vertical ou carré, plan rapproché.",
));
children.push(spacer(200));

// ================= CONTEXTUALISATION (integree) =================
children.push(sectionHeading("Pratiquer l’EPS dans le contexte scolaire haïtien", ""));
children.push(bodyPar(
  "Les activités de ce manuel peuvent se dérouler dans une cour d’école, sur un terrain scolaire, dans un espace polyvalent ou sur un petit terrain communautaire utilisé dans un cadre scolaire autorisé. La disponibilité du matériel et la taille des groupes varient d’une école à l’autre : une EPS de qualité repose aussi sur la capacité à bien organiser une séance lorsque les ressources sont limitées, par exemple en adaptant les zones, les rotations ou le nombre de participants par atelier."
));
children.push(bodyPar(
  "Ce manuel ne propose jamais de fabriquer ou d’utiliser du matériel improvisé dangereux : lorsque le matériel manque, l’enseignant adapte l’activité plutôt que de recourir à une solution risquée."
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE PRINCIPALE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique principale — « Observer, décider, agir »", ""));
children.push(bodyPar(
  "Sous la supervision de ton enseignant, votre groupe reçoit une petite situation motrice ou un petit jeu (par exemple : faire traverser un espace délimité en évitant des obstacles simples, ou organiser un petit relais avec un nombre limité de ballons)."
));
children.push(bodyPar("Déroulement proposé :"));
[
  "Observez la situation et le matériel disponible.",
  "Identifiez ensemble le problème à résoudre.",
  "Choisissez une solution et répartissez les rôles.",
  "Agissez en mettant votre solution en pratique.",
  "Observez le résultat obtenu.",
  "Proposez un ajustement pour améliorer votre solution lors d’un second essai.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Cette activité doit toujours rester sûre et adaptée à l’espace et au matériel réellement disponibles dans ton école.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(sectionHeading("Activité d’analyse — « Quelle décision prendrais-tu ? »", ""));
children.push(bodyPar(
  "Pour chaque situation ci-dessous, identifie le problème, propose une décision, justifie ton choix et explique comment tu pourrais encore améliorer la situation."
));
children.push(illustrationBox(
  "ILL-9AF-C01-08",
  "Situation d’analyse",
  "Scène sportive scolaire riche en détails, montrant plusieurs élèves haïtiens de 9e AF dans une situation de jeu collectif : un joueur hésitant entre deux partenaires démarqués, un autre observant depuis la touche, un enseignant en retrait. Suffisamment de détails pour permettre plusieurs questions d’observation.",
  "Une situation de jeu suffisamment riche pour observer, analyser et décider.",
  "Servir de support visuel commun aux situations d’analyse proposées.",
  "Paysage, format horizontal, plan large.",
));
[
  "Situation 1 : Pendant un jeu collectif, deux partenaires sont démarqués en même temps, mais un seul peut recevoir le ballon.",
  "Situation 2 : Un groupe doit installer un petit parcours, mais il ne reste que la moitié du matériel habituellement utilisé.",
  "Situation 3 : Un élève ressent une légère gêne au niveau de la cheville après un saut, sans douleur intense.",
  "Situation 4 : Un camarade moins à l’aise techniquement est rarement sollicité par le reste du groupe pendant un jeu.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= AUTOEVALUATION =================
children.push(pageBreak());
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau simple pour faire le point sur ta compréhension des notions de ce chapitre. Ce tableau ne sert jamais à te comparer aux autres élèves : il t’aide à identifier ce que tu maîtrises déjà et ce que tu veux encore travailler."
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Comprendre une consigne", "", ""],
    ["Observer avant d’agir", "", ""],
    ["Respecter les règles", "", ""],
    ["Coopérer avec les autres", "", ""],
    ["Expliquer mes décisions", "", ""],
    ["Reconnaître une difficulté", "", ""],
    ["Chercher une solution adaptée", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "L’EPS en 9e AF relie action corporelle, réflexion et apprentissage ; elle ne se limite pas à l’exécution de mouvements.",
  "Une compétence mobilise ensemble des connaissances, des gestes, une méthode et des comportements dans une situation réelle.",
  "L’autonomie grandit en 9e AF, mais reste toujours encadrée par l’enseignant, responsable de l’organisation et de la sécurité.",
  "La démarche observer → comprendre → décider → agir → analyser → ajuster aide à progresser dans toutes les situations.",
  "La santé et la sécurité reposent sur la préparation, l’hydratation, la récupération, et le réflexe d’alerter un adulte en cas de problème.",
  "La coopération et le respect des différences de niveau sont essentiels à toute activité collective réussie.",
  "Le respect, la solidarité, l’honnêteté, l’équité et le fair-play se manifestent par des comportements concrets, observables à chaque séance.",
  "L’autoévaluation aide à construire un bilan personnel, sans jamais servir à comparer les élèves entre eux.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : comprendre une consigne, analyser une situation, identifier une règle ou un comportement approprié, justifier une décision, interpréter une illustration ou un schéma, et mobiliser plusieurs connaissances à la fois.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(1));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(autonomie - fair-play - ajustement - compétence - autoévaluation - sécurité - responsabilité - coopération)", italics: true, color: "555555" },
]));
[
  "1. La capacité à mobiliser des connaissances, des gestes, des méthodes et des comportements dans une situation donnée s’appelle une ____________________.",
  "2. Agir de façon responsable sans attendre chaque consigne, en respectant les règles, est une marque d’____________________.",
  "3. Respecter les autres, le matériel et les espaces de pratique est une forme de ____________________.",
  "4. Vérifier l’espace, le matériel et les consignes avant une activité relève de la ____________________.",
  "5. Travailler ensemble, communiquer et s’entraider pour progresser s’appelle la ____________________.",
  "6. Respecter adversaires, partenaires, arbitre et règles, dans la victoire comme dans la défaite, est une marque de ____________________.",
  "7. Observer ses propres progrès et difficultés, sans se comparer aux autres, s’appelle l’____________________.",
  "8. Modifier son action après l’avoir analysée s’appelle l’____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que signifie pratiquer l’EPS en 9e AF, selon ce chapitre ?", opts: ["a) seulement exécuter des mouvements", "b) mobiliser mouvement, réflexion et apprentissage à la fois", "c) uniquement pratiquer un sport collectif", "d) suivre des consignes sans jamais réfléchir"] },
  { q: "2. Dans la chaîne observer-comprendre-décider-agir-analyser-ajuster, que fait-on juste après avoir décidé ?", opts: ["a) on observe à nouveau depuis le début", "b) on agit", "c) on analyse immédiatement sans agir", "d) on ajuste avant d’agir"] },
  { q: "3. Que doit faire un élève qui ressent une douleur ou un malaise inhabituel pendant une activité ?", opts: ["a) continuer sans en parler", "b) arrêter et prévenir l’enseignant ou un adulte responsable", "c) attendre la fin du cours pour en parler", "d) demander à un camarade de continuer à sa place"] },
  { q: "4. Que signifie l’autonomie présentée dans ce chapitre ?", opts: ["a) faire ce que l’on veut sans aucune règle", "b) agir de façon responsable, dans un cadre organisé et sécurisé par l’enseignant", "c) ne plus avoir besoin d’un enseignant", "d) refuser de demander de l’aide"] },
  { q: "5. À quoi sert l’autoévaluation, selon ce chapitre ?", opts: ["a) à comparer les élèves entre eux", "b) à classer les élèves du meilleur au moins bon", "c) à observer ses propres progrès et difficultés, sans se comparer aux autres", "d) à juger l’apparence physique d’un élève"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Autonomie", "a) Fait de travailler ensemble, communiquer et s’entraider pour progresser collectivement"],
  ["2. Compétence", "b) Ensemble des règles et comportements qui protègent les élèves pendant une activité physique"],
  ["3. Coopération", "c) Ensemble de comportements respectueux envers partenaires, adversaires et arbitre, dans le respect des règles"],
  ["4. Sécurité", "d) Démarche par laquelle l’élève observe ses propres progrès et difficultés, sans se comparer aux autres"],
  ["5. Fair-play", "e) Capacité à agir de manière responsable sans attendre chaque consigne, en respectant les règles et la sécurité"],
  ["6. Autoévaluation", "f) Capacité à mobiliser des connaissances, des gestes, des méthodes et des comportements dans une situation donnée"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Pendant un jeu collectif, un élève hésite entre deux solutions pour aider son équipe. Décris comment il pourrait utiliser la démarche observer-comprendre-décider-agir-analyser-ajuster pour faire un choix, puis explique comment il pourrait ajuster son action si le résultat n’est pas celui attendu.",
  "2. Un groupe d’élèves prépare une activité en autonomie, sous supervision. L’un d’eux propose de commencer sans vérifier l’espace ni le matériel. Explique pourquoi cette proposition pose problème et ce que le groupe devrait faire à la place.",
  "3. Un élève remarque qu’un camarade moins à l’aise n’est presque jamais inclus dans les actions du jeu. Analyse cette situation du point de vue de la coopération et du fair-play, et propose une solution concrète.",
  "4. Après une activité, un élève complète sa grille d’autoévaluation et se rend compte qu’il a eu du mal à respecter une consigne. Explique comment il pourrait utiliser cette autoévaluation pour progresser, sans se comparer aux autres élèves.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 1, "Manuel_EPS_9AF_Chapitre1.docx");
console.log("Chapitre 1 (9e AF) genere:", outPath);
