// Manuel d'EPS 9e AF — Chapitre 6
// Basketball : reglements, fondamentaux techniques et organisation tactique
//
// Regles de basketball verifiees (recherche web avant redaction) : le
// marcher (traveling) et la reprise de dribble (double dribble) tels que
// definis par les regles standard (FIBA / regles largement partagees) —
// aucune regle inventee, presentation volontairement simplifiee pour la
// 9e AF.
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
  6,
  "Basketball : règlements, fondamentaux techniques et organisation tactique",
  "Un partenaire complètement démarqué, et pourtant le ballon reste dans les mains du même joueur qui continue de dribbler : la meilleure décision n’est pas toujours celle qui saute aux yeux.",
  [
    "Identifier les règles nécessaires à une pratique scolaire du basketball et les repères du terrain.",
    "Expliquer le rôle de l’arbitrage.",
    "Réaliser un dribble contrôlé, effectuer et recevoir des passes simples, comprendre les principes du tir.",
    "Utiliser des déplacements sans ballon et distinguer attaque et défense.",
    "Comprendre espace, soutien, démarquage et transition.",
    "Observer une situation avant de décider, analyser une action et proposer une amélioration.",
    "Adopter un comportement sécuritaire et fair-play.",
  ],
));
children.push(spacer(200));

// ---- Activation des acquis ----
children.push(sectionHeading("Activation des acquis", ""));
children.push(bodyPar(
  "Tu as découvert au Chapitre 5 l’histoire, l’évolution et la culture sportive du basketball. Ce chapitre ne revient pas sur ce contenu historique : il s’agit maintenant de comprendre et de pratiquer le jeu lui-même."
));
[
  "Quel est l’objectif principal d’une équipe au basketball ?",
  "Pourquoi le basketball est-il un sport collectif ?",
  "Pourquoi les règles sont-elles indispensables ?",
  "Que signifie coopérer avec ses coéquipiers ?",
  "Peut-on être utile à son équipe sans avoir le ballon ?",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Culture sportive → compréhension du jeu → pratique → analyse : c’est le chemin que suit ce chapitre.",
  { italics: true }
));
children.push(spacer(200));

// ---- 6.1 ----
children.push(sectionHeading("Le terrain et l’organisation générale du jeu", "6.1"));
children.push(bodyPar(
  "Le basketball se joue sur un terrain délimité, avec un panier à chaque extrémité. Deux équipes s’opposent, chacune cherchant à faire progresser un même ballon pour marquer dans le panier adverse, tout en protégeant son propre panier. Le jeu se déroule dans les deux sens, avec des zones utiles (près du panier, à mi-distance, plus éloignées) qui influencent les choix des joueurs."
));
children.push(illustrationBox(
  "ILL-9AF-C06-01",
  "Le terrain de basketball",
  "Schéma pédagogique clair, vu du dessus, d’un terrain de basketball scolaire : limites du terrain, ligne médiane, paniers, zones utiles, sens de jeu. Style épuré, étiquettes lisibles.",
  "Les repères essentiels d’un terrain de basketball scolaire.",
  "Donner un repère spatial commun avant de présenter les règles et les fondamentaux.",
  "Paysage, format horizontal, schéma pleine largeur.",
));
children.push(spacer(200));

// ---- 6.2 ----
children.push(sectionHeading("Les règles essentielles", "6.2"));
children.push(bodyPar(
  "Le jeu commence par une mise en jeu, et le ballon est hors du jeu lorsqu’il franchit entièrement une limite du terrain ou lorsque l’arbitre arrête le jeu. Un joueur peut se déplacer avec le ballon uniquement en le faisant rebondir au sol : c’est le dribble. Un « marcher » est sifflé lorsqu’un joueur déplace de façon irrégulière son pied de pivot, ou fait trop de pas avec le ballon en main sans dribbler. Une « reprise de dribble » est sifflée lorsqu’un joueur arrête son dribble (en tenant le ballon à deux mains) puis recommence à dribbler, sans qu’un autre joueur n’ait touché le ballon entre-temps."
));
children.push(bodyPar(
  "Les contacts dangereux (pousser, bloquer brutalement, tirer un adversaire) sont interdits et sanctionnés par une faute. Selon la règle enfreinte, le jeu reprend par une remise en jeu depuis la ligne de touche, ou par des lancers depuis une position fixe. Chaque panier marqué compte pour le score de l’équipe qui l’a inscrit."
));
children.push(bodyPar(
  "Ce chapitre présente ces règles à un niveau volontairement simplifié pour la 9e AF, sans détail réglementaire professionnel inutile.",
  { italics: true }
));
children.push(spacer(200));

// ---- 6.3 ----
children.push(sectionHeading("Arbitrage et respect des décisions", "6.3"));
children.push(bodyPar(
  "L’arbitre applique les règles, veille à la sécurité des joueurs et reste impartial envers les deux équipes. Un désaccord ou une frustration face à une décision arbitrale ne justifie jamais l’insulte, la violence ou un comportement agressif : un désaccord se signale toujours de façon respectueuse."
));
children.push(calloutBox(
  "Fair-play",
  ["Respecter une décision arbitrale, même en désaccord, fait partie du jeu — bien plus que la contestation ou la confrontation."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ---- 6.4 ----
children.push(sectionHeading("La position de base", "6.4"));
children.push(bodyPar(
  "Une position équilibrée et fonctionnelle — genoux légèrement fléchis, pieds à largeur des épaules, regard relevé — facilite le déplacement, la réception, la passe, le dribble et la défense. Cette position ne doit jamais être douloureuse ni extrême : elle reste naturelle et adaptée à chaque élève."
));
children.push(spacer(200));

// ---- 6.5 ----
children.push(sectionHeading("Le dribble", "6.5"));
children.push(bodyPar(
  "Bien dribbler suppose de contrôler le ballon avec la main, de coordonner main et ballon, de garder le regard suffisamment relevé pour observer la situation, de se déplacer, de savoir changer simplement de direction, et de protéger raisonnablement le ballon face à un adversaire. Le dribble n’est cependant qu’une des solutions possibles : selon la situation, il peut être préférable de dribbler, de passer, de se déplacer sans le ballon, ou de tirer."
));
children.push(illustrationBox(
  "ILL-9AF-C06-02",
  "Le dribble contrôlé",
  "Un élève haïtien de 9e AF dribblant dans une position équilibrée et sécuritaire, regard relevé, ballon proche du corps, dans un environnement scolaire haïtien.",
  "Un dribble contrôlé, avec regard relevé et protection raisonnable du ballon.",
  "Servir de référence visuelle pour la posture correcte du dribble.",
  "Paysage, format horizontal, plan rapproché.",
));
children.push(spacer(200));

// ---- 6.6 ----
children.push(sectionHeading("Les passes", "6.6"));
children.push(bodyPar(
  "Les passes de base au niveau scolaire incluent la passe à deux mains depuis la poitrine et la passe avec rebond au sol, ainsi que quelques variantes simples adaptées au contexte. Une bonne passe combine précision, direction, dosage adapté à la distance, un bon choix de partenaire et de moment, suivie d’un déplacement utile après la passe plutôt que de rester immobile."
));
children.push(spacer(200));

// ---- 6.7 ----
children.push(sectionHeading("Réception du ballon", "6.7"));
children.push(bodyPar(
  "Bien recevoir un ballon demande de l’attention, une préparation du corps, une orientation qui facilite l’action suivante, un contrôle sûr, et une protection raisonnable du ballon. La réception n’est jamais une fin en soi : elle prépare directement la décision suivante — dribbler, passer ou tirer."
));
children.push(illustrationBox(
  "ILL-9AF-C06-03",
  "Passe et réception",
  "Deux élèves haïtiens de 9e AF : l’un réalise une passe à deux mains depuis la poitrine, l’autre se prépare à la recevoir, bras tendus, regard sur le ballon, dans un environnement scolaire.",
  "Une passe et sa réception, avec préparation de l’action suivante.",
  "Illustrer concrètement la trajectoire et la réception d’une passe simple.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 6.8 ----
children.push(sectionHeading("Le tir", "6.8"));
children.push(bodyPar(
  "Un tir efficace repose sur l’équilibre du corps, une orientation correcte vers le panier, un bon contrôle du ballon, une coordination entre les jambes et les bras, et la précision du geste — en particulier lorsque le tir est réalisé près du panier. Ce chapitre ne valorise jamais uniquement la distance ou la puissance du tir : le contrôle et la précision restent prioritaires."
));
children.push(illustrationBox(
  "ILL-9AF-C06-04",
  "Le tir près du panier",
  "Un élève haïtien de 9e AF réalisant un tir proche du panier, posture anatomiquement cohérente : jambes fléchies, bras tendu vers le panier, regard sur la cible.",
  "Un tir équilibré et précis, réalisé près du panier.",
  "Servir de référence visuelle pour la posture correcte du tir.",
  "Paysage, format horizontal, plan rapproché.",
));
children.push(spacer(200));

// ---- 6.9 ----
children.push(sectionHeading("Se déplacer sans ballon", "6.9"));
children.push(bodyPar(
  "Un joueur sans ballon participe activement au jeu de son équipe : il se démarque pour devenir disponible, il offre du soutien au porteur du ballon, il crée de l’espace par ses déplacements, il change de position selon la situation, il reste disponible, et il observe en permanence le jeu. Ces actions, moins visibles qu’une passe ou qu’un tir, sont tout aussi importantes pour l’équipe."
));
children.push(illustrationBox(
  "ILL-9AF-C06-05",
  "Jouer sans ballon",
  "Scène scolaire montrant un porteur de balle et, autour de lui, un partenaire qui se démarque et un autre qui offre du soutien, créant une ligne de passe claire (flèche pointillée). Élèves haïtiens de 9e AF.",
  "Le démarquage et le soutien créent de l’espace disponible et des solutions pour le porteur du ballon.",
  "Illustrer concrètement l’action utile d’un joueur sans ballon.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 6.10 ----
children.push(sectionHeading("Principes offensifs élémentaires", "6.10"));
children.push(bodyPar(
  "En attaque, une équipe cherche à conserver le ballon, à progresser vers le panier adverse, et à créer plusieurs solutions pour le porteur du ballon : utiliser l’espace disponible, soutenir le porteur, passer, se déplacer, et choisir entre passe, dribble ou tir selon la situation. Ce chapitre ne demande pas de mémoriser une tactique professionnelle complexe."
));
children.push(illustrationBox(
  "ILL-9AF-C06-06",
  "Organisation offensive",
  "Schéma d’un terrain scolaire montrant une équipe en attaque, avec circulation du ballon entre plusieurs joueurs (flèches), occupation de l’espace et soutien du porteur.",
  "La circulation du ballon, l’occupation de l’espace et le soutien créent des solutions offensives.",
  "Illustrer concrètement l’organisation offensive présentée dans cette section.",
  "Paysage, format horizontal, schéma de terrain.",
));
children.push(spacer(200));

// ---- 6.11 ----
children.push(sectionHeading("Principes défensifs élémentaires", "6.11"));
children.push(bodyPar(
  "En défense, une équipe cherche à protéger son espace et son panier : se replacer rapidement, observer les déplacements de l’adversaire, se positionner utilement, s’entraider entre partenaires, et récupérer le ballon dans le respect des règles. Aucune technique de contact dangereux n’est jamais proposée dans les activités scolaires de ce chapitre."
));
children.push(calloutBox(
  "Sécurité",
  ["Les poussées, les contacts dangereux, les comportements agressifs et la suspension au panier sont strictement interdits dans les activités scolaires de ce chapitre."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- 6.12 ----
children.push(sectionHeading("Transition attaque-défense", "6.12"));
children.push(bodyPar(
  "Quand une équipe récupère le ballon, elle doit observer rapidement la situation, offrir des solutions, occuper l’espace disponible, et progresser avec contrôle. Quand une équipe perd le ballon, elle doit réagir rapidement, se replacer, protéger les espaces importants, et coopérer avec ses partenaires pour retrouver une organisation défensive."
));
children.push(illustrationBox(
  "ILL-9AF-C06-07",
  "Replacement défensif et transition",
  "Séquence de trois vignettes montrant une même situation scolaire : perte du ballon, réaction immédiate des joueurs, puis replacement et organisation défensive complète.",
  "Le cycle perte du ballon → réaction → replacement → organisation défensive.",
  "Illustrer concrètement la notion de transition présentée dans cette section.",
  "Paysage, format horizontal, séquence de 3 vignettes.",
));
children.push(spacer(200));

// ---- 6.13 ----
children.push(sectionHeading("Lire une situation de jeu", "6.13"));
children.push(bodyPar(
  "Avant d’agir, un joueur doit observer rapidement plusieurs informations essentielles."
));
children.push(calloutBox(
  "Méthode — Lire le jeu avant d’agir",
  [
    "Où est le ballon ?",
    "Où sont mes partenaires ?",
    "Où sont les adversaires ?",
    "Quel espace est disponible ?",
    "Suis-je moi-même démarqué ?",
    "Quelle action est la plus appropriée ?",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ---- 6.14 ----
children.push(sectionHeading("Prendre une décision", "6.14"));
children.push(bodyPar(
  "Face à une situation de jeu, un joueur choisit entre dribbler, passer, tirer, ou attendre une meilleure solution — et doit pouvoir justifier ce choix. Il n’existe pas toujours une seule bonne réponse : plusieurs décisions peuvent être raisonnables selon la façon dont elles sont justifiées."
));
children.push(spacer(200));

// ---- 6.15 ----
children.push(sectionHeading("Organisation tactique scolaire", "6.15"));
children.push(bodyPar(
  "Dans un cadre scolaire, l’organisation tactique reste simple : des principes en petits effectifs, notamment des situations à 2 contre 2 ou à 3 contre 3, adaptées par l’enseignant selon l’espace et le nombre d’élèves. Les objectifs restent constants : occuper l’espace, coopérer, se soutenir, faire circuler le ballon, et se replacer."
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Pratiquer le basketball dans le contexte scolaire haïtien", ""));
children.push(bodyPar(
  "Les activités de ce chapitre peuvent se dérouler dans une cour d’école, un terrain scolaire, un espace polyvalent ou un terrain aménagé. Lorsque le nombre de ballons est limité ou que les groupes sont nombreux, l’enseignant organise des ateliers, des rotations, des petits groupes et des jeux à effectifs réduits, avec une observation entre élèves toujours sous supervision. Aucun panier, poteau, support ou équipement improvisé dangereux n’est jamais utilisé."
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique — « Passe, déplace-toi, offre une solution »", ""));
children.push(bodyPar(
  "Sous supervision, votre classe organise un jeu à effectif réduit centré sur la passe, le déplacement après la passe, le démarquage, l’observation, le soutien et la décision. L’enseignant peut adapter les dimensions, le nombre d’élèves, la durée, le nombre de ballons et certaines règles. La sécurité prime toujours sur la recherche de compétition."
));
[
  "Comprendre la consigne et les limites de l’espace de jeu.",
  "Jouer une première période courte en observant vos propres choix (passe, déplacement, soutien).",
  "Faire une courte pause pour observer, avec l’enseignant, un ou deux critères simples.",
  "Jouer une seconde période en essayant d’améliorer ce critère.",
  "Analyser, en petit groupe, ce qui a changé entre les deux périodes.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE TECHNIQUE =================
children.push(sectionHeading("Activité technique — « Dribbler ou passer ? »", ""));
children.push(bodyPar(
  "Dans un atelier organisé par ton enseignant, ton choix entre dribbler et passer dépend de la situation : un espace libre devant toi, un partenaire démarqué, un défenseur proche, ou un accès direct au panier. L’objectif de cette activité est la prise de décision, pas seulement la réussite technique du geste."
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(pageBreak());
children.push(sectionHeading("Activité d’analyse — « Quelle décision prendrais-tu ? »", ""));
children.push(illustrationBox(
  "ILL-9AF-C06-08",
  "Grande situation d’analyse tactique",
  "Schéma d’un petit terrain de basketball scolaire haïtien montrant un porteur du ballon, un partenaire démarqué, un partenaire en soutien, un défenseur proche du porteur, et un espace libre vers le panier. Suffisamment de détails pour permettre plusieurs questions d’observation et de décision.",
  "Une situation de jeu suffisamment riche pour observer, analyser et décider.",
  "Servir de support commun à l’activité d’analyse du chapitre.",
  "Paysage, format horizontal, schéma de terrain.",
));
[
  "Où se trouve le ballon, et qui le possède ?",
  "Quels partenaires sont démarqués ou en soutien ?",
  "Où se trouvent les adversaires, et quel espace est disponible ?",
  "Quelle décision te semble la plus adaptée ? Justifie ta réponse.",
  "Une autre décision pourrait-elle aussi être raisonnable ? Explique pourquoi.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE D'ARBITRAGE ET FAIR-PLAY =================
children.push(sectionHeading("Activité d’arbitrage et fair-play", ""));
children.push(bodyPar(
  "Observe une courte situation de jeu proposée par ton enseignant, en restant dans le cadre des règles étudiées dans ce chapitre. Identifie une éventuelle infraction (marcher, reprise de dribble, contact interdit), explique la décision appropriée, et propose le comportement fair-play attendu de la part des joueurs concernés."
));
children.push(spacer(200));

// ================= METHODE - ANALYSER UNE ACTION =================
children.push(sectionHeading("Méthode — Analyser une action", ""));
children.push(bodyPar(
  "Cette méthode reprend et prolonge ce que tu as déjà appris aux Chapitres 1, 2 et 4 : observer, décider, agir, puis analyser pour ajuster."
));
children.push(calloutBox(
  "Méthode — Analyser une action",
  [
    "Quel était l’objectif ?",
    "Qu’ai-je observé ?",
    "Quelle décision a été prise ?",
    "L’exécution était-elle adaptée ?",
    "Quel a été le résultat ?",
    "Que pourrait-on modifier ?",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
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
    ["Respect des règles", "", ""],
    ["Contrôle du dribble", "", ""],
    ["Passe adaptée", "", ""],
    ["Déplacement après la passe", "", ""],
    ["Observation avant décision", "", ""],
    ["Démarquage", "", ""],
    ["Replacement défensif", "", ""],
    ["Respect des partenaires, adversaires et de l’arbitre", "", ""],
    ["Capacité à expliquer une décision simple", "", ""],
  ],
  [3600, 3200, 2400],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le basketball se joue selon des règles précises : dribble, marcher, reprise de dribble, contacts interdits, fautes et remises en jeu.",
  "L’arbitre applique ces règles ; le fair-play suppose de respecter ses décisions, même en cas de désaccord exprimé avec respect.",
  "Dribble, passe, réception et tir sont les fondamentaux techniques présentés dans ce chapitre, toujours travaillés de façon progressive et sécuritaire.",
  "Se déplacer sans ballon (démarquage, soutien) est aussi important que les actions avec ballon.",
  "En attaque, circulation du ballon, espace et soutien créent des solutions ; en défense, replacement, observation et entraide protègent l’espace, sans contact dangereux.",
  "La transition attaque-défense demande d’observer et de réagir rapidement lors d’une perte ou d’une récupération du ballon.",
  "Lire le jeu avant d’agir et analyser une action après coup permettent de progresser de façon responsable.",
  "La sécurité (vérification de l’espace et du matériel, réaction en cas de problème) reste une condition indispensable de toute pratique.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : reconnaître une règle ou une infraction simple, interpréter un schéma, identifier une technique, analyser une situation, choisir et justifier une action, expliquer un principe offensif ou défensif, et proposer une amélioration, à partir de situations nouvelles.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(6));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(réception - fair-play - dribble - espace - décision - passe - replacement - tir - démarquage - arbitrage)", italics: true, color: "555555" },
]));
[
  "1. Le fait de faire rebondir le ballon au sol tout en se déplaçant, en le contrôlant, s’appelle le ____________________.",
  "2. L’action d’envoyer le ballon à un partenaire pour qu’il le reçoive s’appelle une ____________________.",
  "3. L’action de se déplacer pour devenir disponible pour un partenaire s’appelle le ____________________.",
  "4. L’action d’envoyer le ballon vers le panier pour marquer s’appelle un ____________________.",
  "5. Le fait de recevoir le ballon en préparant l’action suivante s’appelle la ____________________.",
  "6. Le fait de revenir rapidement à une position utile après une perte ou une récupération du ballon s’appelle le ____________________.",
  "7. Le fait de choisir une action après avoir observé une situation de jeu s’appelle une ____________________.",
  "8. Une zone du terrain libre ou occupée par les joueurs, à utiliser ou à protéger, s’appelle un ____________________.",
  "9. Le respect des règles, des adversaires, des partenaires et de l’arbitre, dans la victoire comme dans la défaite, est une marque de ____________________.",
  "10. L’action d’observer le jeu, signaler et décider selon des règles communes s’appelle l’____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que se passe-t-il si un joueur reprend son dribble après l’avoir arrêté (reprise de dribble) ?", opts: ["a) rien, c’est autorisé", "b) une violation est sifflée et le ballon est remis à l’équipe adverse", "c) un panier est automatiquement accordé", "d) le joueur doit immédiatement tirer"] },
  { q: "2. Qu’appelle-t-on un « marcher » au basketball ?", opts: ["a) déplacer illégalement son pied de pivot ou faire trop de pas sans dribbler", "b) courir normalement pendant un dribble", "c) s’arrêter complètement avec le ballon", "d) passer le ballon à un partenaire"] },
  { q: "3. Que doit faire un élève face à une décision arbitrale avec laquelle il n’est pas d’accord ?", opts: ["a) contester bruyamment et agressivement", "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin", "c) arrêter de jouer immédiatement", "d) insulter l’arbitre"] },
  { q: "4. Que permet le démarquage dans le jeu offensif ?", opts: ["a) rester immobile près d’un adversaire", "b) devenir disponible pour recevoir une passe d’un partenaire", "c) éviter tout contact avec le ballon", "d) sortir volontairement du terrain"] },
  { q: "5. Que recommande ce chapitre au sujet des contacts et poussées dans les activités scolaires de basketball ?", opts: ["a) ils sont encouragés pour récupérer le ballon plus vite", "b) ils sont interdits ; la priorité va à une récupération sûre et collective", "c) ils sont autorisés uniquement en fin de partie", "d) ils ne concernent que les compétitions officielles"] },
  { q: "6. Selon la méthode « Lire le jeu avant d’agir », que doit-on observer en plus du ballon, des partenaires et des adversaires ?", opts: ["a) le score final du match", "b) l’espace disponible et si l’on est soi-même démarqué", "c) la couleur des maillots", "d) le nombre de spectateurs"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Dribble", "a) Action d’envoyer le ballon vers le panier pour marquer"],
  ["2. Passe", "b) Action de se déplacer pour devenir disponible pour un partenaire"],
  ["3. Réception", "c) Fait de se placer pour offrir une solution supplémentaire au porteur du ballon"],
  ["4. Tir", "d) Fait de revenir rapidement à une position utile après une perte ou une récupération du ballon"],
  ["5. Démarquage", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
  ["6. Soutien", "f) Fait de faire rebondir le ballon au sol tout en se déplaçant, en le contrôlant"],
  ["7. Replacement", "g) Action d’envoyer le ballon à un partenaire pour qu’il le reçoive"],
  ["8. Arbitrage", "h) Fait de recevoir le ballon en préparant l’action suivante"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève continue de dribbler alors qu’un partenaire est complètement démarqué à côté de lui. Explique pourquoi cette décision n’est pas optimale, et propose ce qu’il aurait pu faire à la place.",
  "2. Après avoir réalisé une passe, un élève reste immobile au même endroit. Explique pourquoi ce comportement limite les solutions de son équipe, et propose ce qu’il devrait faire.",
  "3. Une équipe perd le ballon au milieu du terrain pendant un jeu de basketball. Décris ce que les joueurs devraient faire immédiatement après cette perte, en t’appuyant sur la notion de transition.",
  "4. Un élève conteste bruyamment et de façon agressive une décision de l’arbitre pendant un match scolaire. Explique pourquoi cette réaction n’est pas adaptée, et ce qu’il aurait dû faire à la place.",
  "5. Avant une activité de basketball, tu remarques qu’une partie du terrain est glissante. Explique ce que tu devrais faire, et pourquoi cette réaction est une preuve de responsabilité.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 66, "Manuel_EPS_9AF_Chapitre6.docx");
console.log("Chapitre 6 (9e AF) genere:", outPath);
