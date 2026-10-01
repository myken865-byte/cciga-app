// Manuel d'EPS 9e AF — Chapitre 8
// Volleyball : reglements, fondamentaux techniques et organisation tactique
//
// Regles de volleyball verifiees (recherche web avant redaction, FIVB) :
// maximum trois touches par equipe avant renvoi (un contact de bloc ne
// compte pas comme une touche d'equipe) ; rotation des joueurs dans le sens
// des aiguilles d'une montre a chaque reprise du service par une equipe.
// Aucune regle inventee, presentation volontairement simplifiee pour la
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
  8,
  "Volleyball : règlements, fondamentaux techniques et organisation tactique",
  "Trois touches, une équipe entière, et un seul objectif : faire retomber le ballon dans le camp adverse. Mais avant d’y arriver, encore faut-il savoir qui doit jouer le ballon, et quand.",
  [
    "Identifier les repères essentiels du terrain et les principales règles nécessaires à la pratique scolaire.",
    "Comprendre rotation, service, échanges, points, fautes simples et rôle de l’arbitrage.",
    "Adopter une position d’attente équilibrée et se déplacer selon la trajectoire.",
    "Pratiquer de façon adaptée la manchette, la passe haute et le service scolaire.",
    "Comprendre la construction collective d’un échange et les rôles élémentaires en attaque et en défense.",
    "Communiquer, se replacer, observer une situation et choisir une action appropriée.",
    "Analyser une réalisation et proposer un ajustement.",
  ],
));
children.push(spacer(200));

// ---- Activation des acquis ----
children.push(sectionHeading("Activation des acquis", ""));
children.push(bodyPar(
  "Tu as découvert au Chapitre 7 l’histoire, l’évolution et la culture sportive du volleyball. Ce chapitre ne revient pas sur ce contenu : il s’agit maintenant de comprendre et de pratiquer le jeu lui-même."
));
[
  "Pourquoi le filet structure-t-il le jeu ?",
  "Pourquoi une équipe doit-elle communiquer ?",
  "Pourquoi le ballon ne doit-il pas être contrôlé comme au basketball ?",
  "Que se passe-t-il lorsqu’une équipe récupère le droit de servir ?",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Histoire → règles → technique → coopération → analyse : c’est le chemin que suit ce chapitre.",
  { italics: true }
));
children.push(spacer(200));

// ---- 8.1 ----
children.push(sectionHeading("Terrain et organisation générale", "8.1"));
children.push(bodyPar(
  "Le volleyball se joue sur un terrain rectangulaire séparé en deux par un filet, à une hauteur adaptée au niveau et à l’âge des joueurs. Chaque équipe occupe son propre camp et cherche à faire progresser le ballon au-dessus du filet, sans jamais le laisser tomber dans son propre camp."
));
children.push(illustrationBox(
  "ILL-9AF-C08-01",
  "Le terrain et ses repères",
  "Schéma pédagogique clair, vu du dessus, d’un terrain de volleyball scolaire : filet central, lignes de fond et de côté, ligne médiane, zones de service. Style épuré, étiquettes lisibles.",
  "Les repères essentiels d’un terrain de volleyball scolaire.",
  "Donner un repère spatial commun avant de présenter les règles et les fondamentaux.",
  "Paysage, format horizontal, schéma pleine largeur.",
));
children.push(spacer(200));

// ---- 8.2 ----
children.push(sectionHeading("Objectif du jeu", "8.2"));
children.push(bodyPar(
  "L’objectif général du volleyball est simple : envoyer le ballon dans le camp adverse, au-dessus du filet, tout en empêchant qu’il tombe dans son propre camp — le tout dans le respect des règles communes."
));
children.push(spacer(200));

// ---- 8.3 ----
children.push(sectionHeading("Règles essentielles", "8.3"));
children.push(bodyPar(
  "Le jeu commence par un service, qui met le ballon en jeu depuis l’arrière du terrain. Le ballon est hors du jeu lorsqu’il touche le sol, franchit entièrement une limite du terrain, ou lorsque l’arbitre arrête le jeu. Une même équipe dispose au maximum de trois touches consécutives pour renvoyer le ballon dans le camp adverse (un contact réalisé au filet pour bloquer une attaque adverse ne compte pas parmi ces trois touches). Un même joueur ne peut pas toucher le ballon deux fois de suite, sauf exception. Le ballon doit passer au-dessus du filet, à l’intérieur des limites prévues, pour rester en jeu."
));
children.push(bodyPar(
  "Chaque échange remporté rapporte un point à l’équipe gagnante. Lorsque l’équipe qui reçoit le service remporte l’échange, elle gagne le droit de servir à son tour, et ses joueurs tournent d’une position dans le sens des aiguilles d’une montre : c’est la rotation, développée plus loin dans ce chapitre."
));
children.push(bodyPar(
  "Ce chapitre présente ces règles à un niveau volontairement simplifié pour la 9e AF, sans détail réglementaire professionnel inutile.",
  { italics: true }
));
children.push(spacer(200));

// ---- 8.4 ----
children.push(sectionHeading("Arbitrage et fair-play", "8.4"));
children.push(bodyPar(
  "L’arbitre observe le jeu, signale les fautes (ballon hors limite, trop de touches, faute de rotation, contact irrégulier), et reste impartial envers les deux équipes. Un désaccord ou une frustration face à une décision arbitrale ne justifie jamais l’insulte ou un comportement agressif : un désaccord se signale toujours de façon respectueuse."
));
children.push(calloutBox(
  "Fair-play",
  ["Accepter une décision arbitrale, même en désaccord, et l’exprimer avec respect, fait partie intégrante du jeu."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ---- 8.5 ----
children.push(sectionHeading("Position d’attente et déplacements", "8.5"));
children.push(bodyPar(
  "Une position d’attente équilibrée — genoux légèrement fléchis, poids du corps réparti, regard sur le ballon — permet de rester disponible et de se déplacer rapidement selon la trajectoire du ballon. Cette position ne doit jamais être extrême ni douloureuse : elle reste naturelle et adaptée à chaque élève."
));
children.push(illustrationBox(
  "ILL-9AF-C08-02",
  "Position d’attente et déplacement",
  "Élèves haïtiens de 9e AF en position d’attente équilibrée et fonctionnelle sur un terrain scolaire, prêts à se déplacer selon la trajectoire du ballon. Posture sécuritaire, aucune position extrême.",
  "Une position d’attente équilibrée, prête au déplacement.",
  "Servir de référence visuelle pour la posture correcte de la position d’attente.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 8.6 ----
children.push(sectionHeading("La manchette", "8.6"));
children.push(bodyPar(
  "La manchette est un geste défensif réalisé avec les avant-bras, utilisé pour contrôler un ballon bas ou puissant. Elle demande une bonne orientation du corps, une base stable, un contact contrôlé (sans « frapper » le ballon), et une direction choisie vers un partenaire. Ce travail se construit progressivement, sans répétitions excessives ni douloureuses."
));
children.push(illustrationBox(
  "ILL-9AF-C08-03",
  "La manchette",
  "Séquence pédagogique en deux ou trois vignettes montrant un élève haïtien de 9e AF réalisant une manchette : position stable, avant-bras joints, contact avec le ballon, direction orientée vers un partenaire. Anatomie cohérente.",
  "Le geste de la manchette, étape par étape.",
  "Servir de référence visuelle pour la posture correcte de la manchette.",
  "Paysage, format horizontal, séquence de 2-3 vignettes.",
));
children.push(spacer(200));

// ---- 8.7 ----
children.push(sectionHeading("La passe haute", "8.7"));
children.push(bodyPar(
  "La passe haute se réalise avec les mains, au-dessus de la tête, pour orienter le ballon vers un partenaire. Elle demande un bon placement du corps sous le ballon, une orientation précise, et un contrôle du geste. Ce chapitre ne demande aucun geste forcé ni position dangereuse des doigts : la priorité reste toujours le confort et la sécurité du geste."
));
children.push(illustrationBox(
  "ILL-9AF-C08-04",
  "La passe haute",
  "Un élève haïtien de 9e AF réalisant une passe haute, placé sous le ballon, mains levées au-dessus de la tête, trajectoire du ballon représentée par une ligne pointillée vers un partenaire. Situation scolaire sûre.",
  "Le placement, l’orientation et la trajectoire d’une passe haute.",
  "Servir de référence visuelle pour la posture correcte de la passe haute.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 8.8 ----
children.push(sectionHeading("Le service", "8.8"));
children.push(bodyPar(
  "Le service scolaire présenté dans ce chapitre reste progressif et adapté : une forme simple, permettant surtout de mettre le ballon en jeu de façon fiable. La réussite et le contrôle du geste priment toujours sur la recherche de puissance."
));
children.push(illustrationBox(
  "ILL-9AF-C08-05",
  "Le service scolaire",
  "Séquence simple montrant un élève haïtien de 9e AF réalisant un service scolaire progressif : préparation, contact avec le ballon, mise en jeu par-dessus le filet. Style clair, priorité au contrôle du geste.",
  "Un service scolaire progressif, centré sur la réussite et le contrôle.",
  "Illustrer un service simple et adapté au niveau scolaire.",
  "Paysage, format horizontal, séquence de 2-3 vignettes.",
));
children.push(spacer(200));

// ---- 8.9 ----
children.push(sectionHeading("Recevoir et construire l’échange", "8.9"));
children.push(bodyPar(
  "Une équipe cherche à contrôler, orienter puis transmettre le ballon pour construire une action collective, plutôt que de renvoyer immédiatement le ballon sans réflexion. Une logique simple guide cette construction : réception (premier contact contrôlé), préparation (orientation vers un partenaire), puis renvoi (envoi du ballon vers le camp adverse)."
));
children.push(illustrationBox(
  "ILL-9AF-C08-06",
  "Construction collective de l’échange",
  "Trois élèves haïtiens de 9e AF illustrant la séquence réception → préparation → renvoi, avec des flèches reliant chaque étape et indiquant les positions respectives des partenaires sur le terrain.",
  "La construction collective d’un échange : réception, préparation, renvoi.",
  "Illustrer concrètement la logique collective présentée dans cette section.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 8.10 ----
children.push(sectionHeading("Jouer sans ballon", "8.10"));
children.push(bodyPar(
  "Un joueur qui n’a pas le ballon reste actif : il se place utilement, couvre un espace du terrain, anticipe la suite de l’action, offre du soutien à ses partenaires, et communique clairement. Ces actions, moins visibles qu’un service ou une attaque, sont essentielles à l’organisation collective de l’équipe."
));
children.push(spacer(200));

// ---- 8.11 ----
children.push(sectionHeading("Principes offensifs élémentaires", "8.11"));
children.push(bodyPar(
  "En attaque, une équipe cherche à placer le ballon dans un espace libre du camp adverse, en construisant collectivement l’action et en renvoyant le ballon de façon contrôlée plutôt qu’au hasard. Ce chapitre ne demande pas de mémoriser une tactique professionnelle complexe."
));
children.push(spacer(200));

// ---- 8.12 ----
children.push(sectionHeading("Principes défensifs élémentaires", "8.12"));
children.push(bodyPar(
  "En défense, une équipe cherche à couvrir l’ensemble du terrain, à anticiper la trajectoire du ballon adverse, à se replacer rapidement, à s’entraider entre partenaires, et à communiquer clairement pour éviter les hésitations. Les situations proposées dans ce chapitre restent toujours adaptées au niveau réel des élèves de 9e AF."
));
children.push(spacer(200));

// ---- 8.13 ----
children.push(sectionHeading("Rotation et organisation collective", "8.13"));
children.push(bodyPar(
  "À chaque fois qu’une équipe gagne le droit de servir après avoir remporté un échange en tant que receveuse, ses joueurs tournent d’une position dans le sens des aiguilles d’une montre. Ce principe de rotation permet à chaque joueur d’occuper, à tour de rôle, différentes zones du terrain."
));
children.push(illustrationBox(
  "ILL-9AF-C08-07",
  "Rotation et replacement",
  "Schéma simple d’un terrain de volleyball vu du dessus, montrant six positions de joueurs numérotées et une flèche circulaire indiquant le sens de rotation (sens des aiguilles d’une montre).",
  "Le principe de rotation des joueurs dans le sens des aiguilles d’une montre.",
  "Illustrer clairement le principe de rotation présenté dans cette section.",
  "Paysage, format horizontal, schéma de terrain.",
));
children.push(spacer(200));

// ---- 8.14 ----
children.push(sectionHeading("Lire une trajectoire", "8.14"));
children.push(bodyPar(
  "Bien lire une trajectoire suppose d’observer la hauteur du ballon, sa direction, sa vitesse relative, la zone probable où il va arriver, et la position de ses partenaires. Cette observation guide directement le déplacement du joueur vers la meilleure position possible."
));
children.push(calloutBox(
  "Méthode — Lire la trajectoire",
  [
    "Observer le ballon.",
    "Estimer sa direction.",
    "Repérer l’espace disponible.",
    "Se déplacer.",
    "Communiquer.",
    "Choisir l’action.",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ---- 8.15 ----
children.push(sectionHeading("Prendre une décision", "8.15"));
children.push(bodyPar(
  "Face à un ballon qui arrive, un joueur doit choisir rapidement : laisser un partenaire mieux placé intervenir, réceptionner lui-même, orienter le ballon vers un partenaire, ou le renvoyer directement. Cette décision doit toujours pouvoir être justifiée simplement, à partir de ce que le joueur a observé."
));
children.push(spacer(200));

// ---- 8.16 ----
children.push(sectionHeading("Communication et coopération", "8.16"));
children.push(bodyPar(
  "Des appels simples (annoncer clairement « à moi ! »), une information claire entre partenaires, et une responsabilité partagée réduisent les hésitations et les collisions, et améliorent l’organisation collective de l’équipe. La communication reste toujours respectueuse, même en cas d’erreur d’un partenaire."
));
children.push(spacer(200));

// ---- 8.17 ----
children.push(sectionHeading("Sécurité", "8.17"));
children.push(bodyPar(
  "Avant toute activité, il convient de vérifier le sol, l’espace disponible, le filet, les poteaux ou supports, l’état du ballon, la présence d’obstacles et les distances entre les groupes. Aucun filet ou support improvisé dangereux n’est jamais utilisé."
));
children.push(calloutBox(
  "Sécurité",
  ["En cas de douleur, de malaise ou de tout problème inhabituel pendant une activité, arrête immédiatement ce que tu fais et préviens ton enseignant ou un adulte responsable."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Pratiquer le volleyball dans le contexte scolaire haïtien", ""));
children.push(bodyPar(
  "Les activités de ce chapitre s’adaptent à une cour d’école, un terrain scolaire ou un espace polyvalent. Lorsque le matériel est limité, l’enseignant organise des ateliers, des rotations et des groupes réduits, avec une observation entre élèves toujours sous supervision. Aucun poteau, corde, fil ou support improvisé susceptible de blesser n’est jamais utilisé. Filles et garçons sont représentés de façon respectueuse et équitable dans toutes les situations pédagogiques de ce chapitre."
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique — « Trois touches pour coopérer »", ""));
children.push(bodyPar(
  "En petits groupes, cherchez à contrôler et à transmettre le ballon (jusqu’à trois touches) avant un renvoi adapté au-dessus du filet ou d’une ligne de référence. L’objectif principal est la coopération, le placement, la communication et le contrôle — pas la puissance."
));
children.push(bodyPar(
  "L’enseignant peut simplifier le nombre de touches, la distance, la présence ou non d’un filet, et l’organisation générale, selon le niveau réel du groupe, dans un cadre toujours sûr.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE TECHNIQUE =================
children.push(sectionHeading("Activité technique — « Oriente le ballon »", ""));
children.push(bodyPar(
  "Dans un atelier progressif, réalise des manchettes et/ou des passes hautes vers une zone cible désignée. L’enseignant observe le placement, le contrôle, l’orientation et la régularité du geste, sans jamais établir de classement humiliant entre élèves. Les rôles alternent, avec des temps de récupération adaptés."
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(pageBreak());
children.push(sectionHeading("Activité d’analyse — « Qui doit jouer le ballon ? »", ""));
children.push(illustrationBox(
  "ILL-9AF-C08-08",
  "Grande situation d’analyse tactique",
  "Schéma d’un terrain de volleyball scolaire haïtien montrant un ballon arrivant entre deux joueurs, un troisième joueur proche d’une ligne de terrain, et un espace libre plus loin. Suffisamment de détails pour permettre plusieurs questions d’observation et de décision.",
  "Une situation de jeu suffisamment riche pour observer, analyser et décider qui doit jouer le ballon.",
  "Servir de support commun à l’activité d’analyse du chapitre.",
  "Paysage, format horizontal, schéma de terrain.",
));
children.push(bodyPar(
  "Observe les situations suivantes, où le ballon arrive entre deux joueurs, près d’une ligne, ou dans un espace libre."
));
[
  "Quelles positions et quelle trajectoire dois-tu observer avant de décider qui joue le ballon ?",
  "Quel rôle joue la communication dans cette décision ?",
  "Quelle décision te semble la plus adaptée dans chaque situation ? Justifie ta réponse.",
  "Comment la communication et le placement permettent-ils d’éviter les collisions entre partenaires ?",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE D'ARBITRAGE ET FAIR-PLAY =================
children.push(sectionHeading("Activité d’arbitrage et fair-play", ""));
children.push(bodyPar(
  "Observe une courte situation de jeu proposée par ton enseignant : ballon dedans ou dehors, nombre de touches, service, ou faute simple, selon les règles étudiées dans ce chapitre. Explique la décision appropriée, et l’attitude fair-play attendue de la part des joueurs concernés."
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
    ["Je respecte les règles", "", ""],
    ["Je me place mieux sur le terrain", "", ""],
    ["J’observe la trajectoire du ballon", "", ""],
    ["Je communique avec mes partenaires", "", ""],
    ["Je peux orienter une manchette ou une passe adaptée", "", ""],
    ["Je participe à la construction collective", "", ""],
    ["Je me replace après une action", "", ""],
    ["Je respecte partenaires, adversaires et arbitre", "", ""],
    ["Je peux expliquer une décision simple", "", ""],
  ],
  [3600, 3200, 2400],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le volleyball se joue sur un terrain séparé par un filet ; l’objectif est de faire tomber le ballon dans le camp adverse sans le laisser tomber dans le sien.",
  "Une équipe dispose de trois touches maximum ; la rotation fait tourner les joueurs dans le sens des aiguilles d’une montre à chaque changement de service.",
  "L’arbitre applique les règles ; le fair-play suppose de respecter ses décisions, même en cas de désaccord exprimé avec respect.",
  "Manchette, passe haute et service sont les fondamentaux techniques présentés dans ce chapitre, toujours travaillés de façon progressive et sécuritaire.",
  "Une équipe construit son échange par réception, préparation puis renvoi, en coopérant à tout moment.",
  "Jouer sans ballon (placement, couverture d’espace, communication) est aussi important que les actions avec ballon.",
  "Lire une trajectoire et communiquer avant d’agir permettent d’éviter les hésitations et les collisions.",
  "La sécurité (vérification de l’espace et du matériel, réaction en cas de problème) reste une condition indispensable de toute pratique.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : reconnaître une règle, interpréter un schéma de terrain ou de rotation, identifier un geste technique, lire une trajectoire, analyser une situation, choisir une action, justifier une décision et proposer un ajustement, à partir de situations nouvelles.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(8));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(trajectoire - communication - service - filet - arbitrage - manchette - replacement - coopération - passe - rotation)", italics: true, color: "555555" },
]));
[
  "1. Le geste qui met le ballon en jeu depuis l’arrière du terrain s’appelle le ____________________.",
  "2. Le geste défensif réalisé avec les avant-bras pour contrôler un ballon bas s’appelle la ____________________.",
  "3. Le geste réalisé avec les mains, au-dessus de la tête, qui oriente le ballon vers un partenaire, s’appelle une ____________________ haute.",
  "4. Le changement de position des joueurs dans le sens des aiguilles d’une montre, à chaque reprise du service, s’appelle la ____________________.",
  "5. Le chemin suivi par le ballon dans les airs s’appelle sa ____________________.",
  "6. L’élément qui sépare les deux équipes sur le terrain s’appelle le ____________________.",
  "7. Le fait de travailler ensemble vers un objectif commun s’appelle la ____________________.",
  "8. Le fait de revenir rapidement à une position utile après une action s’appelle le ____________________.",
  "9. L’action d’observer le jeu, signaler et décider selon des règles communes s’appelle l’____________________.",
  "10. Le fait d’échanger des informations claires entre partenaires pour mieux coordonner leurs actions s’appelle la ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Combien de touches maximum une équipe peut-elle effectuer avant de renvoyer le ballon (hors contact de bloc) ?", opts: ["a) une seule touche", "b) deux touches", "c) trois touches", "d) un nombre illimité de touches"] },
  { q: "2. Que se passe-t-il pour une équipe qui gagne le droit de servir après avoir remporté l’échange ?", opts: ["a) elle reste dans la même position toute la partie", "b) ses joueurs tournent d’une position dans le sens des aiguilles d’une montre", "c) elle perd automatiquement un point", "d) le service revient obligatoirement à l’équipe adverse"] },
  { q: "3. Que privilégie ce chapitre pour le service scolaire ?", opts: ["a) la puissance maximale avant tout", "b) la réussite et le contrôle du geste", "c) un service identique pour tous les élèves", "d) l’absence totale de règles"] },
  { q: "4. Que doit faire un élève face à une décision arbitrale avec laquelle il n’est pas d’accord ?", opts: ["a) contester bruyamment et agressivement", "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin", "c) arrêter de jouer immédiatement", "d) insulter l’arbitre"] },
  { q: "5. Pourquoi la communication est-elle particulièrement importante au volleyball ?", opts: ["a) elle n’a aucune utilité réelle", "b) elle réduit les hésitations et les collisions entre partenaires", "c) elle sert uniquement à impressionner l’adversaire", "d) elle remplace complètement la technique"] },
  { q: "6. Selon la méthode « Lire la trajectoire », que doit-on faire après avoir observé le ballon et estimé sa direction ?", opts: ["a) repérer l’espace disponible, se déplacer, puis communiquer", "b) arrêter immédiatement le jeu", "c) attendre les instructions de l’arbitre", "d) ignorer les partenaires proches"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Service", "a) Changement de position des joueurs dans le sens des aiguilles d’une montre"],
  ["2. Manchette", "b) Chemin suivi par le ballon dans les airs"],
  ["3. Passe haute", "c) Fait de revenir rapidement à une position utile après une action"],
  ["4. Rotation", "d) Fait d’échanger des informations claires entre partenaires"],
  ["5. Trajectoire", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
  ["6. Replacement", "f) Geste qui met le ballon en jeu depuis l’arrière du terrain"],
  ["7. Communication", "g) Geste défensif réalisé avec les avant-bras pour contrôler un ballon bas"],
  ["8. Arbitrage", "h) Geste réalisé avec les mains, au-dessus de la tête, qui oriente le ballon vers un partenaire"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Deux joueurs hésitent au moment de jouer un même ballon qui arrive entre eux, ce qui provoque une petite collision. Explique comment la communication aurait pu éviter cette situation.",
  "2. Pendant un match scolaire, une équipe reste mal répartie sur le terrain, laissant de grands espaces libres. Explique pourquoi cette organisation pose problème et propose un ajustement.",
  "3. Un élève cherche uniquement la puissance maximale à son service, sans réussir à le mettre en jeu correctement. Explique pourquoi ce choix n’est pas adapté et propose une amélioration.",
  "4. Un ballon arrive très près d’une ligne du terrain. Explique quelles informations un joueur ou un arbitre doit observer avant de décider si le ballon est dedans ou dehors.",
  "5. Avant une activité de volleyball, tu remarques que l’installation du filet présente un risque (poteau instable, corde tendue de façon dangereuse). Explique ce que tu devrais faire, et pourquoi cette réaction est une preuve de responsabilité.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 94, "Manuel_EPS_9AF_Chapitre8.docx");
console.log("Chapitre 8 (9e AF) genere:", outPath);
