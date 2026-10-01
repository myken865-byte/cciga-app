import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(7, "Football scolaire : technique, règles et coopération"));

children.push(
  calloutBox(
    "Situation de départ",
    [
      "Dès que la cloche sonne pour la récréation, presque tous les élèves se précipitent vers le seul ballon de football de la cour. Pendant la séance d'EPS suivante, le professeur explique : « Le football, ce n'est pas courir tous ensemble derrière le ballon : c'est une activité d'équipe, avec des rôles, des règles et des espaces à occuper. »",
      "Ce chapitre va t'apprendre à conduire, contrôler, passer et tirer le ballon, mais aussi à comprendre le jeu collectif, l'attaque, la défense et le rôle du gardien.",
    ],
    "F0F0F0", "1F4E5F", NAVY,
  ),
  spacer(240),
);

children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "expliquer simplement l’objectif du football et identifier les principaux éléments d’un terrain ;",
  "conduire et contrôler un ballon de manière élémentaire ;",
  "réaliser une passe simple et un tir simple vers une cible ;",
  "comprendre l’importance du déplacement sans ballon et du démarquage ;",
  "distinguer sommairement attaque et défense ;",
  "connaître quelques règles fondamentales et le rôle général du gardien ;",
  "coopérer, pratiquer le fair-play et appliquer les règles essentielles de sécurité.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Mots-clés"));
children.push(mixedPar([
  { text: "Football, équipe, conduite, contrôle, passe, tir, démarquage, attaque, défense, gardien, fair-play.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ================= 7.1 =================
children.push(sectionHeading("Découverte du football", "7.1"));
children.push(bodyPar(
  "Le football est un sport collectif dans lequel deux équipes cherchent à faire progresser le ballon avec les pieds pour marquer dans le but adverse, tout en protégeant leur propre but."
));
children.push(bodyPar(
  "Comme les autres sports collectifs déjà étudiés, la réussite d’une équipe de football dépend de la coopération entre joueurs, et non des exploits d’un seul élève."
));
children.push(spacer(160));

// ================= 7.2 =================
children.push(sectionHeading("Le terrain et le matériel", "7.2"));
children.push(bodyPar("Un terrain de football comporte plusieurs éléments essentiels à connaître :"));
children.push(threeColTable(
  ["Élément du terrain", "Description simple", "Utilité pour l’élève"],
  [
    ["Lignes de touche", "Lignes qui délimitent les bords latéraux du terrain.", "Savoir quand le ballon sort du jeu sur le côté."],
    ["Lignes de but", "Lignes situées derrière chaque but.", "Repérer les limites derrière le but."],
    ["Ligne médiane", "Ligne qui coupe le terrain en deux moitiés égales.", "Séparer les deux camps."],
    ["Cercle central", "Cercle tracé au milieu du terrain.", "Repère utilisé pour le coup d’envoi."],
    ["Buts", "Un but à chaque extrémité du terrain.", "Cible que chaque équipe doit atteindre."],
  ],
  [2600, 4000, 3000],
));
children.push(spacer(160));
children.push(bodyPar(
  "Les installations scolaires peuvent être adaptées : une cour d’école ou un espace polyvalent correctement sécurisé peuvent tout à fait servir à l’apprentissage, sans qu’un terrain professionnel soit nécessaire."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C07-01",
  "Le terrain de football",
  "Dessiner un schéma vu du dessus d’un terrain de football simplifié, avec des étiquettes claires pour : les lignes de touche, les lignes de but, la ligne médiane, le cercle central et les deux buts. Traits nets, couleurs sobres, sans détails inutiles.",
  "Les principales lignes et zones d’un terrain de football scolaire.",
  "Aider l’élève à identifier et nommer les éléments essentiels du terrain avant de commencer à jouer.",
));
children.push(spacer(200));

// ================= 7.3 =================
children.push(sectionHeading("La conduite du ballon", "7.3"));
children.push(bodyPar(
  "Conduire le ballon, c’est le déplacer avec des petites touches successives du pied, tout en gardant le contrôle. Une bonne conduite demande des touches adaptées (ni trop fortes, ni trop faibles), une observation constante de l’espace autour de soi, la capacité à changer simplement de direction, une vitesse maîtrisée, et progressivement l’utilisation des deux pieds."
));
children.push(bodyPar(
  "Aucun geste technique avancé n’est exigé à ce niveau : l’objectif est de garder le ballon proche de soi tout en restant capable d’observer le jeu autour."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C07-02",
  "Conduite du ballon",
  "Dessiner un élève haïtien de 7e AF en train de conduire un ballon de football avec de petites touches, dans une cour d’école haïtienne. Regard légèrement relevé vers l’espace de jeu plutôt que fixé sur le ballon, trajectoire simple représentée par une ligne pointillée au sol.",
  "Une conduite de balle contrôlée, avec le regard tourné vers l’espace de jeu.",
  "Illustrer la coordination entre le contrôle du ballon et l’observation de l’environnement pendant la conduite.",
));
children.push(spacer(200));

// ================= 7.4 =================
children.push(sectionHeading("Le contrôle du ballon", "7.4"));
children.push(bodyPar(
  "Contrôler le ballon, c’est le recevoir et le maîtriser avant de décider de l’action suivante (passer, conduire ou tirer). Un contrôle simple au sol demande d’observer la trajectoire du ballon qui arrive, de garder l’équilibre du corps, d’amortir le contact avec le pied pour stopper le ballon, puis de se préparer pour l’action suivante."
));
children.push(spacer(160));

// ================= 7.5 =================
children.push(sectionHeading("Les passes", "7.5"));
children.push(bodyPar(
  "La passe est un élément fondamental du jeu collectif : elle permet de faire circuler le ballon plus rapidement qu’en le conduisant seul."
));
children.push(bodyPar("Une bonne passe demande :"));
[
  "une orientation claire vers le partenaire visé ;",
  "de la précision, plutôt que de la puissance ;",
  "un dosage simple de la force selon la distance ;",
  "une observation du jeu avant de passer ;",
  "une communication avec le partenaire (regard, appel de balle) ;",
  "un déplacement après la passe pour rester disponible.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Ces gestes s’entraînent d’abord en binômes, puis en petits groupes, avant d’être utilisés dans un jeu complet."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C07-03",
  "Contrôle et passe",
  "Dessiner deux élèves haïtiens : le premier réceptionnant un ballon au sol (contrôle), genoux légèrement fléchis, pied prêt à amortir le contact ; le second, quelques mètres plus loin, réalisant une passe simple du pied vers le premier. Ballon représenté en mouvement entre les deux.",
  "Un contrôle du ballon suivi d’une passe simple entre deux partenaires.",
  "Montrer l’enchaînement entre la réception du ballon (contrôle) et la transmission à un partenaire (passe).",
));
children.push(spacer(200));

// ================= 7.6 =================
children.push(sectionHeading("Le tir au but", "7.6"));
children.push(bodyPar(
  "Le tir consiste à envoyer le ballon vers le but pour marquer. Au niveau débutant, quelques repères suffisent : garder l’équilibre du corps, orienter le regard et les épaules vers la cible, placer simplement le pied d’appui à côté du ballon, contrôler le geste de frappe, et rechercher la précision avant la puissance."
));
children.push(bodyPar(
  "Ces exercices ne doivent jamais devenir un concours de puissance entre élèves : ce qui compte, c’est la qualité et la précision du geste."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C07-04",
  "Le tir au but",
  "Dessiner une séquence de 2 vignettes montrant un élève haïtien effectuant un tir simple : vignette 1, pied d’appui placé à côté du ballon, regard orienté vers le but ; vignette 2, le geste de frappe accompagné vers le but, mouvement anatomiquement cohérent, sans exagération.",
  "Un tir simple vers le but : équilibre, orientation vers la cible et précision du geste.",
  "Illustrer une technique de tir simple et sécuritaire, adaptée à un débutant de 7e AF.",
));
children.push(spacer(200));

// ================= 7.7 =================
children.push(sectionHeading("Se déplacer et se démarquer", "7.7"));
children.push(bodyPar(
  "Un joueur sans ballon participe pleinement au jeu : en se déplaçant vers un espace libre, il aide son équipe à mieux faire circuler le ballon."
));
children.push(bodyPar(
  "Se démarquer demande une observation constante des partenaires et des espaces disponibles, une disponibilité pour recevoir une passe, la capacité à changer de position selon le jeu, et une communication avec ses coéquipiers (regard, geste, appel de balle)."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C07-05",
  "Se démarquer",
  "Dessiner une scène de jeu réduit avec un joueur en possession du ballon cherchant une solution de passe, et un ou deux partenaires qui se déplacent vers des espaces libres en s’éloignant d’un adversaire, la main ou le regard indiquant leur disponibilité. Ambiance coopérative, aucun contact.",
  "Des partenaires se démarquent vers des espaces libres pour se rendre disponibles.",
  "Illustrer concrètement la notion de démarquage et d’occupation de l’espace en football.",
));
children.push(spacer(200));

// ================= 7.8 =================
children.push(sectionHeading("Attaquer et défendre", "7.8"));
children.push(bodyPar(
  "Selon la possession du ballon, une équipe attaque ou défend."
));
children.push(bulletMixed([{ text: "Attaquer : ", bold: true }, { text: "conserver le ballon, progresser vers le but adverse, utiliser les espaces libres et créer une possibilité de tir." }]));
children.push(bulletMixed([{ text: "Défendre : ", bold: true }, { text: "protéger son propre but, gêner la progression de l’adversaire dans le respect des règles, essayer de récupérer le ballon, et rester organisé sur le terrain." }]));
children.push(bodyPar(
  "À ce niveau, il n’est pas nécessaire d’apprendre des systèmes tactiques complexes : comprendre la différence entre ces deux rôles suffit pour bien commencer à jouer en équipe."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C07-06",
  "Attaque et défense",
  "Dessiner une situation de jeu réduit (par exemple 3 contre 3) montrant clairement une équipe en position d’attaque (joueur avec ballon progressant vers le but adverse, partenaires occupant des espaces) face à une équipe en position de défense (joueurs positionnés pour protéger leur but et gêner la progression, sans contact violent).",
  "Une situation de jeu où l’on peut identifier les attaquants, les défenseurs et les espaces occupés.",
  "Aider l’élève à distinguer visuellement les rôles d’attaque et de défense dans une situation de jeu réelle.",
));
children.push(spacer(200));

// ================= 7.9 =================
children.push(sectionHeading("Principales règles", "7.9"));
children.push(bodyPar(
  "Cette section présente uniquement les règles essentielles utiles à la compréhension scolaire du jeu, et non un règlement officiel complet."
));
[
  "respecter les limites du terrain (le ballon qui sort des lignes arrête le jeu) ;",
  "une remise en jeu adaptée est utilisée lorsque le ballon sort du terrain ;",
  "un but est marqué lorsque le ballon franchit entièrement la ligne de but adverse ;",
  "certains comportements sont interdits : pousser, accrocher, faire un tacle dangereux ;",
  "tout contact dangereux avec un adversaire doit être évité ;",
  "les décisions de l’enseignant, qui joue le rôle d’arbitre, doivent être respectées ;",
  "une faute est généralement un geste qui met en danger ou désavantage injustement un adversaire.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "La règle du hors-jeu ne sera présentée que de façon très introductive, si cela est utile à la situation de jeu travaillée : ce chapitre ne remplace pas le règlement officiel complet du football."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Les règles présentées dans ce chapitre sont volontairement simplifiées pour l’apprentissage scolaire du football, et non un règlement officiel complet."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(200));

// ================= 7.10 =================
children.push(sectionHeading("Le gardien de but", "7.10"));
children.push(bodyPar(
  "Le gardien de but a un rôle particulier dans l’équipe : il protège le but, observe l’ensemble du jeu pour anticiper les actions adverses, communique avec ses coéquipiers pour organiser la défense, et relance le jeu après avoir arrêté le ballon."
));
children.push(bodyPar(
  "Certaines règles particulières s’appliquent au gardien (par exemple, il peut toucher le ballon avec les mains dans une zone définie). Tous les exercices impliquant le gardien doivent rester sécurisés, sans tir violent ni contact dangereux."
));
children.push(spacer(160));

// ================= 7.11 =================
children.push(sectionHeading("Coopération et fair-play", "7.11"));
children.push(bodyPar(
  "Le football, comme tous les sports collectifs, se joue avec des partenaires et des adversaires qu’il faut respecter."
));
[
  "partager le ballon avec ses coéquipiers plutôt que de le garder pour soi ;",
  "encourager ses partenaires, surtout après une erreur ;",
  "respecter ses adversaires et accepter les décisions de l’enseignant ;",
  "garder la maîtrise de soi, même en cas de frustration ;",
  "refuser toute forme de violence, verbale ou physique ;",
  "assumer une part de responsabilité collective dans le jeu de l’équipe.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Une équipe ne dépend jamais uniquement de son meilleur joueur : elle repose sur la coopération de tous."
));
children.push(spacer(120));

children.push(calloutBox(
  "Fair-play",
  ["Aider un adversaire à se relever après une chute, féliciter une bonne action de l'équipe opposée, ou accepter calmement la décision de l'enseignant sont des marques de fair-play, aussi importantes qu'un but marqué."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ================= 7.12 =================
children.push(sectionHeading("Sécurité", "7.12"));
children.push(bodyPar(
  "Comme tu l’as appris au chapitre 4, avant chaque séance de football, il faut vérifier le terrain, les obstacles éventuels, la stabilité des buts, l’état des équipements, l’état du ballon et les limites de l’espace de jeu, puis prévoir un échauffement progressif."
));
children.push(bodyPar(
  "Pendant l’activité, il faut éviter toute poussée ou geste dangereux, respecter les distances et les consignes données, et arrêter immédiatement au signal de l’enseignant."
));
children.push(bodyPar(
  "En cas de douleur, de malaise ou de tout autre problème inhabituel, il faut arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable."
));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  [
    "Vérifie le terrain, les buts, le ballon et les limites de l’espace avant de commencer.",
    "Évite toute poussée, tout tacle dangereux ou tout contact volontaire avec un camarade.",
    "Arrête immédiatement l’activité au signal de l’enseignant ou en cas de malaise, et préviens un adulte responsable.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Le football est aujourd’hui l’un des sports les plus pratiqués au monde. En Haïti, il occupe une place particulièrement importante dans la culture sportive nationale, comme tu le découvriras plus en détail au chapitre 10."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-7AF-C07-07",
  "Sécurité et fair-play",
  "Dessiner une scène de mini-football scolaire avec plusieurs situations à identifier : un élève qui aide un camarade à se relever après une chute légère (comportement correct), et un élève qui pousse volontairement un adversaire pour récupérer le ballon (comportement à corriger). Style clair, sans contact violent ni blessure représentée, sans texte dans l’image.",
  "Quels comportements sont corrects ? Lesquels devraient être corrigés ?",
  "Servir de support à une activité d’observation où l’élève distingue les comportements sécuritaires et fair-play des comportements à corriger.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Je maîtrise mon ballon",
  [
    "Objectif : améliorer la conduite du ballon dans un petit parcours.",
    "Organisation : parcours simple délimité par des cônes, réalisé individuellement à tour de rôle.",
    "Matériel : un ballon par élève ou par petit groupe, cônes ou repères souples.",
    "Consignes : conduire le ballon le long du parcours en gardant le contrôle, sans le perdre, en observant l’espace autour de soi.",
    "Sécurité : garder une distance suffisante entre les élèves ; ne pas se précipiter si le parcours est occupé.",
    "Critère de réussite : terminer le parcours en gardant le contrôle du ballon, sans le perdre plus d’une ou deux fois.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Passe et déplace-toi",
  [
    "Objectif : s’entraîner à passer, puis à se déplacer pour redevenir disponible.",
    "Organisation : élèves en binômes ou petits groupes de 3 à 4, répartis dans l’espace de jeu.",
    "Matériel : un ballon par binôme ou petit groupe.",
    "Consignes : réaliser une passe simple à un partenaire, puis se déplacer immédiatement vers un nouvel espace libre pour redevenir disponible.",
    "Sécurité : regarder avant de se déplacer pour éviter toute collision avec un autre groupe.",
    "Critère de réussite : enchaîner plusieurs passes réussies, avec un déplacement après chaque passe.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Je vise",
  [
    "Objectif : s’exercer à un tir simple et précis vers une cible ou un but adapté.",
    "Organisation : file d’élèves, avec une zone d’attente sécurisée à distance raisonnable du tireur.",
    "Matériel : un ballon, un but ou une cible adaptée, repères au sol pour la distance de tir et la zone d’attente.",
    "Consignes : chaque élève tire à tour de rôle en recherchant la précision plutôt que la puissance, récupère son ballon, puis retourne en fin de file.",
    "Sécurité : rester dans la zone d’attente tant que ce n’est pas son tour.",
    "Critère de réussite : réaliser un tir équilibré et orienté vers la cible, que le ballon l’atteigne ou non.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Mini-football coopératif",
  [
    "Objectif : appliquer conduite, passes, démarquage, attaque et défense dans un petit jeu collectif.",
    "Organisation : petits groupes à effectif réduit (par exemple 4 contre 4), sur un terrain adapté à l’espace disponible, durée courte.",
    "Matériel : un ballon, repères pour délimiter le terrain, chasubles si disponibles pour distinguer les équipes.",
    "Consignes : règles adaptées favorisant la circulation du ballon (par exemple, exiger au moins deux passes avant de tirer) pour que tous les élèves participent.",
    "Sécurité : respecter les limites du terrain et éviter tout contact volontaire.",
    "Critère de réussite : chaque élève de l’équipe touche le ballon au moins une fois pendant le jeu.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation ----
children.push(sectionHeading("Activité d’observation", ""));
children.push(calloutBox(
  "Observe le jeu",
  [
    "Pendant une phase de mini-football coopératif (la tienne ou celle d’un autre groupe), observe le jeu avec un camarade et identifie :",
    "1) un joueur disponible pour recevoir une passe ;",
    "2) un espace libre sur le terrain ;",
    "3) le joueur actuellement en possession du ballon ;",
    "4) un défenseur qui gêne la progression adverse ;",
    "5) un comportement de fair-play observé pendant le jeu ;",
    "6) un éventuel comportement à corriger, s’il y en a un.",
    "Partage ensuite tes observations avec ton groupe, sous la conduite de l’enseignant.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(240));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le football est un sport collectif où deux équipes cherchent à marquer dans le but adverse tout en protégeant leur propre but.",
  "Le terrain comprend des lignes de touche, des lignes de but, une ligne médiane, un cercle central et deux buts.",
  "La conduite permet de déplacer le ballon avec de petites touches tout en gardant le contrôle.",
  "Le contrôle prépare l’action suivante après réception du ballon.",
  "La passe fait circuler le ballon et demande précision et communication.",
  "Le tir au but recherche d’abord la précision, avant la puissance.",
  "Se démarquer et occuper l’espace aide l’équipe même sans avoir le ballon.",
  "Une équipe attaque (progresse vers le but adverse) ou défend (protège son but) selon la possession du ballon.",
  "Les règles présentées sont volontairement simplifiées pour l’apprentissage scolaire.",
  "Le gardien de but protège le but, observe, communique et relance le jeu.",
  "La coopération, le respect et le fair-play sont aussi importants que la technique.",
  "La sécurité (terrain, matériel, distances, absence de contact volontaire) doit toujours être respectée.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(7));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(passe - contrôle - tir - ballon - démarquage - équipe - défense - sécurité)", italics: true, color: "555555" },
]));
[
  "1. Au football, chaque ____________________ cherche à marquer dans le but adverse tout en protégeant le sien.",
  "2. Recevoir et maîtriser le ____________________ avant l’action suivante s’appelle le ____________________.",
  "3. Envoyer le ballon à un partenaire pour qu’il le reçoive s’appelle une ____________________.",
  "4. Envoyer le ballon vers le but pour marquer s’appelle un ____________________.",
  "5. Se déplacer vers un espace libre pour se rendre disponible s’appelle le ____________________.",
  "6. Protéger son but et gêner la progression adverse correspond à la ____________________.",
  "7. Vérifier le terrain, les buts et le ballon avant de jouer est une règle de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quel est l’objectif principal du football ?", opts: ["a) courir le plus vite possible sans ballon", "b) marquer dans le but adverse tout en protégeant son propre but", "c) garder le ballon le plus longtemps possible sans le passer", "d) éviter tout contact avec le ballon"] },
  { q: "2. Que doit rechercher un élève débutant pendant un exercice de tir ?", opts: ["a) la puissance maximale", "b) la précision, avant la puissance", "c) le nombre de tirs le plus élevé possible", "d) uniquement la vitesse du geste"] },
  { q: "3. Que signifie « se démarquer » ?", opts: ["a) rester immobile près d’un adversaire", "b) se déplacer vers un espace libre pour se rendre disponible", "c) garder le ballon sans le partager", "d) sortir du terrain volontairement"] },
  { q: "4. Quel est le rôle général du gardien de but ?", opts: ["a) uniquement courir sur tout le terrain", "b) protéger le but, observer, communiquer et relancer le jeu", "c) tirer le plus souvent possible vers le but adverse", "d) rester immobile pendant tout le match"] },
  { q: "5. Que doit faire un élève qui ressent un malaise pendant une séance de football ?", opts: ["a) continuer à jouer normalement", "b) arrêter l’activité et prévenir immédiatement l’enseignant", "c) demander à un camarade de le remplacer sans rien dire", "d) attendre la fin de la séance pour en parler"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Conduite", "a) Envoyer le ballon vers le but pour marquer"],
  ["2. Contrôle", "b) Protéger son but et gêner la progression de l’adversaire"],
  ["3. Passe", "c) Déplacer le ballon avec de petites touches en gardant le contrôle"],
  ["4. Tir", "d) Respecter l’adversaire, l’arbitre et les partenaires"],
  ["5. Démarquage", "e) Recevoir et maîtriser le ballon avant l’action suivante"],
  ["6. Défense", "f) Se déplacer vers un espace libre pour se rendre disponible"],
  ["7. Fair-play", "g) Envoyer le ballon à un partenaire"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un camarade garde toujours le ballon et ne fait jamais de passe, même quand un partenaire est démarqué. Explique comment cela nuit au jeu d’équipe et propose une solution.",
  "2. Explique, avec tes propres mots, pourquoi il est utile de se déplacer vers un espace libre même quand on n’a pas le ballon.",
  "3. Pendant un match, un élève pousse volontairement un adversaire pour récupérer le ballon. Explique pourquoi ce geste est dangereux et contraire au fair-play, et ce que l’enseignant devrait faire.",
  "4. Avant une séance de football, tu remarques un obstacle dangereux (une pierre ou un trou) au milieu du terrain. Explique ce que tu devrais faire, et pourquoi.",
].forEach(t => children.push(numberedPar(t)));

await buildAndSave(children, 63, "Manuel_EPS_7AF_Chapitre7.docx");
