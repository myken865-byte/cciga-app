// Manuel d'EPS 9e AF — Chapitre 12
// Synthese des competences et preparation a l'evaluation EPS de 9e AF
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
import { AlignmentType, Paragraph, TextRun } from "docx";

const children = [];

// ================= OUVERTURE DE CHAPITRE =================
children.push(...chapterOpening(
  12,
  "Synthèse des compétences et préparation à l’évaluation EPS de 9e AF",
  "Onze chapitres, trois sports, une seule question au fond : sais-tu observer une situation, choisir une réponse adaptée, et l’expliquer ? C’est exactement ce que ce dernier chapitre va vérifier avec toi.",
  [
    "Identifier et relier les notions essentielles étudiées dans les 11 chapitres précédents.",
    "Analyser une situation motrice ou sportive et sélectionner des connaissances pertinentes.",
    "Interpréter schémas, tableaux, consignes et situations-problèmes.",
    "Justifier une décision technique, tactique, sécuritaire ou fair-play.",
    "Mobiliser les acquis de football, basketball et volleyball sans refaire les chapitres complets.",
    "Utiliser une méthode de révision et d’autoévaluation.",
    "Identifier tes acquis et les points à renforcer avant une évaluation.",
  ],
));
children.push(spacer(200));

// ================= 3. SYNTHESE TRANSVERSALE =================
children.push(sectionHeading("Synthèse transversale des acquis", ""));
children.push(bodyPar(
  "Ce chapitre ne reprend pas en détail ce que tu as déjà appris : il relie les grandes notions entre elles, pour t’aider à les mobiliser ensemble."
));

children.push(sectionHeading("Corps, mouvement et maîtrise motrice", "12.1"));
children.push(bodyPar(
  "Posture, coordination, équilibre, orientation, déplacement et contrôle moteur forment la base de toute action sportive : ce sont les mêmes ressources qui te permettent de contrôler un ballon au football, de te replacer au basketball ou de lire une trajectoire au volleyball."
));

children.push(sectionHeading("Qualités physiques et motrices", "12.2"));
children.push(bodyPar(
  "Coordination, vitesse, endurance, force adaptée, souplesse et réaction interviennent, souvent ensemble, dans chaque situation sportive étudiée. Leur développement reste toujours progressif, adapté à ton âge, et jamais transformé en recherche de performance maximale."
));

children.push(sectionHeading("Football", "12.3"));
children.push(bodyPar(
  "Règles essentielles, fondamentaux techniques, jeu sans ballon, occupation de l’espace, principes offensifs et défensifs, transition, décision, arbitrage et fair-play forment un ensemble cohérent, mobilisé à travers des situations concrètes plutôt que mémorisé isolément."
));
children.push(illustrationBox(
  "ILL-9AF-C12-03",
  "Football : situation intégrée",
  "Scène scolaire de football montrant un porteur du ballon, un partenaire démarqué, un adversaire proche et un espace libre, avec de petites annotations pédagogiques reliant la situation à plusieurs notions déjà étudiées (espace, décision, fair-play).",
  "Une situation de football mobilisant plusieurs acquis à la fois.",
  "Servir de support à l’analyse intégrée d’une situation de football.",
  "Paysage, format horizontal, plan large avec annotations.",
));

children.push(sectionHeading("Basketball", "12.4"));
children.push(bodyPar(
  "Dribble, passe, réception, tir, déplacement sans ballon, attaque, défense, transition, arbitrage et prise de décision se combinent dans chaque situation réelle de jeu, jamais de façon isolée."
));
children.push(illustrationBox(
  "ILL-9AF-C12-04",
  "Basketball : situation intégrée",
  "Scène scolaire de basketball montrant un joueur hésitant entre passe, déplacement, dribble ou tir, avec un partenaire démarqué et un défenseur proche, annotations pédagogiques reliant la situation aux notions déjà étudiées.",
  "Une situation de basketball mobilisant plusieurs choix tactiques à la fois.",
  "Servir de support à l’analyse intégrée d’une situation de basketball.",
  "Paysage, format horizontal, plan large avec annotations.",
));

children.push(sectionHeading("Volleyball", "12.5"));
children.push(bodyPar(
  "Service, manchette, passe haute, lecture de trajectoire, placement, rotation, construction collective de l’échange, communication, arbitrage et sécurité forment ensemble une pratique cohérente du volleyball scolaire."
));
children.push(illustrationBox(
  "ILL-9AF-C12-05",
  "Volleyball : situation intégrée",
  "Scène scolaire de volleyball montrant un ballon en trajectoire, un joueur se plaçant pour le réceptionner, un partenaire communiquant, annotations pédagogiques reliant la situation aux notions déjà étudiées.",
  "Une situation de volleyball mobilisant trajectoire, placement, communication et décision.",
  "Servir de support à l’analyse intégrée d’une situation de volleyball.",
  "Paysage, format horizontal, plan large avec annotations.",
));

children.push(sectionHeading("Arbitrage, fair-play et responsabilité", "12.6"));
children.push(bodyPar(
  "Connaître une règle, l’appliquer avec neutralité, respecter partenaires et adversaires, coopérer, assumer ses responsabilités et gérer un désaccord avec calme forment un ensemble cohérent, applicable aux trois sports collectifs étudiés dans ce manuel."
));
children.push(illustrationBox(
  "ILL-9AF-C12-07",
  "Arbitrage et fair-play",
  "Scène scolaire montrant un arbitre scolaire communiquant une décision avec calme à deux joueurs, l’un des deux reconnaissant respectueusement la décision. Attitude posée, aucune confrontation.",
  "Une décision d’arbitrage acceptée dans le respect et le fair-play.",
  "Servir de support à l’analyse d’une situation d’arbitrage et de fair-play.",
  "Paysage, format horizontal, plan moyen.",
));

children.push(sectionHeading("Santé, effort et sécurité", "12.7"));
children.push(bodyPar(
  "Préparation progressive à l’effort, gestion raisonnable de l’intensité, récupération, hydratation adaptée au contexte, reconnaissance de ses propres limites et comportements sécuritaires restent valables dans n’importe quelle activité physique, quel que soit le sport pratiqué."
));
children.push(illustrationBox(
  "ILL-9AF-C12-06",
  "Gestion de l’effort et sécurité",
  "Infographie pédagogique sobre reliant quatre étapes : préparation progressive, effort adapté, récupération, signalement d’un problème à l’enseignant. Style épuré, icônes simples, aucune représentation médicale.",
  "Les grandes étapes d’une gestion responsable de l’effort et de la sécurité.",
  "Synthétiser visuellement les principes de santé et de sécurité étudiés au Chapitre 11.",
  "Paysage, format horizontal, infographie pleine largeur.",
));

children.push(sectionHeading("Observer et décider", "12.8"));
children.push(bodyPar(
  "Une méthode transversale, déjà rencontrée sous différentes formes dans ce manuel, aide à progresser dans n’importe quelle situation motrice ou sportive : observer les informations utiles, identifier le problème, choisir une réponse, agir de façon adaptée, analyser le résultat, puis proposer un ajustement."
));
children.push(illustrationBox(
  "ILL-9AF-C12-02",
  "Observer, décider, agir",
  "Schéma en six étapes reliées par des flèches formant un cycle : observer → identifier le problème → choisir → agir → analyser → ajuster, chaque étape illustrée par une petite icône sobre.",
  "La démarche transversale observer-décider-agir-analyser-ajuster, valable dans tous les sports étudiés.",
  "Servir de repère méthodologique de synthèse pour l’ensemble du manuel.",
  "Paysage, format horizontal, schéma pleine largeur.",
));

children.push(sectionHeading("Communiquer et coopérer", "12.9"));
children.push(bodyPar(
  "Dans les trois sports collectifs étudiés, la réussite d’une équipe dépend directement de sa communication, du soutien entre partenaires, du respect des rôles de chacun et d’une responsabilité collective partagée — bien plus que de la seule performance individuelle."
));

children.push(sectionHeading("Transférer les apprentissages", "12.10"));
children.push(bodyPar(
  "Un même principe appris dans un sport peut être utile dans un autre : bien occuper l’espace, offrir du soutien, se replacer rapidement, anticiper une trajectoire, communiquer clairement, respecter le fair-play ou vérifier la sécurité sont des compétences transférables, et non des connaissances isolées propres à un seul sport."
));
children.push(spacer(200));

// ================= METHODE DE REVISION =================
children.push(pageBreak());
children.push(sectionHeading("Méthode de révision", ""));
children.push(calloutBox(
  "Méthode — Réviser efficacement",
  [
    "Relire les objectifs du chapitre.",
    "Identifier les notions-clés.",
    "Reformuler ces notions avec ses propres mots.",
    "Utiliser les schémas et les tableaux du manuel.",
    "Répondre à des questions sans regarder ses notes.",
    "Vérifier ses réponses et se corriger.",
    "Revenir sur les notions qui restent mal maîtrisées.",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(bodyPar(
  "Une bonne préparation reste toujours régulière, organisée et réaliste. Ce chapitre ne recommande jamais de réviser en privant son sommeil, en s’épuisant physiquement ou sous une pression excessive : ces méthodes nuisent à l’apprentissage plutôt que de l’aider.",
  { italics: true }
));
children.push(spacer(200));

// ================= CARTE DE SYNTHESE =================
children.push(sectionHeading("Carte de synthèse", ""));
children.push(bodyPar(
  "Cette carte relie les grands domaines du manuel : ils ne fonctionnent jamais de façon isolée."
));
children.push(illustrationBox(
  "ILL-9AF-C12-01",
  "Carte générale des compétences",
  "Grande carte conceptuelle avec, au centre, « EPS 9e AF », reliée par des flèches expliquées à treize domaines : corps et mouvement, qualités physiques, football, basketball, volleyball, arbitrage, fair-play, coopération, effort, santé, sécurité, analyse, décision. Chaque lien porte une courte légende expliquant le rapport (et non une flèche purement décorative). Style épuré, lisible.",
  "Une synthèse visuelle des grands domaines du manuel et de leurs liens pédagogiques.",
  "Offrir une vue d’ensemble finale avant les activités de synthèse et l’évaluation blanche.",
  "Paysage, format horizontal, carte conceptuelle pleine page.",
));
children.push(threeColTable(
  ["Domaine", "Relié à", "Pourquoi"],
  [
    ["Qualités physiques", "Football, basketball, volleyball", "Chaque sport mobilise coordination, vitesse, endurance, force et souplesse à des degrés différents"],
    ["Arbitrage et fair-play", "Sécurité, coopération", "Une décision arbitrale acceptée avec respect protège à la fois l’équité et la sécurité du jeu"],
    ["Effort et santé", "Analyse et décision", "Bien gérer son effort suppose d’observer ses sensations et d’ajuster ses choix en conséquence"],
  ],
  [2600, 3200, 3600],
));
children.push(spacer(200));

// ================= ACTIVITE 1 =================
children.push(pageBreak());
children.push(sectionHeading("Activité 1 — « Relie les compétences »", ""));
children.push(bodyPar(
  "Pour chaque situation ci-dessous, indique quelles compétences sont mobilisées (technique, tactique, physique, sécurité, coopération ou arbitrage) — plusieurs réponses sont possibles — et justifie brièvement ton choix."
));
[
  "Un joueur de football se démarque puis reçoit une passe précise avant de tirer au but.",
  "Une équipe de basketball se replace rapidement après avoir perdu le ballon.",
  "Un joueur de volleyball communique avec un partenaire avant de réceptionner un service.",
  "Un arbitre scolaire observe une situation avant de siffler une faute.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE 2 =================
children.push(sectionHeading("Activité 2 — « Analyse une situation complète »", ""));
children.push(bodyPar(
  "Pour chacune des trois situations suivantes, réalise une analyse complète : observe, identifie le problème, propose une décision, justifie-la, signale un éventuel risque, et propose un ajustement."
));
[
  "Football : un joueur hésite entre garder le ballon et le passer à un partenaire démarqué, alors qu’un défenseur se rapproche rapidement.",
  "Basketball : une équipe reste regroupée autour du porteur du ballon, laissant de grands espaces libres, pendant qu’un match scolaire se déroule sous une forte chaleur.",
  "Volleyball : deux joueurs hésitent au moment de jouer un même ballon qui arrive entre eux, près du filet installé sur un terrain de fortune.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Ces situations restent réalistes pour une séance d’EPS en Haïti : espace partagé, matériel limité, chaleur, groupes nombreux.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE 3 =================
children.push(pageBreak());
children.push(sectionHeading("Activité 3 — « Construis ton plan de révision »", ""));
children.push(bodyPar(
  "Complète ce tableau personnel pour organiser ta préparation à l’évaluation. Il ne sert jamais à te comparer aux autres élèves, ni à associer un résultat scolaire à ta valeur personnelle."
));
children.push(threeColTable(
  ["Domaine", "Notion maîtrisée / à revoir", "Stratégie de révision"],
  [
    ["Football", "", ""],
    ["Basketball", "", ""],
    ["Volleyball", "", ""],
    ["Arbitrage, fair-play, coopération", "", ""],
    ["Santé, effort, sécurité", "", ""],
  ],
  [3000, 3200, 3200],
));
children.push(spacer(200));

// ================= AUTOEVALUATION GLOBALE =================
children.push(pageBreak());
children.push(sectionHeading("Autoévaluation globale", ""));
children.push(calloutBox(
  "Autoévaluation",
  ["Ce bilan global t’aide à mesurer ton propre parcours dans l’ensemble du manuel. Il ne sert jamais à te comparer aux autres élèves."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(threeColTable(
  ["Domaine", "À renforcer / En progrès / Acquis", "Un exemple personnel"],
  [
    ["Connaissances générales (règles, notions)", "", ""],
    ["Techniques fondamentales (football, basketball, volleyball)", "", ""],
    ["Lecture de jeu et prise de décision", "", ""],
    ["Coopération", "", ""],
    ["Arbitrage et fair-play", "", ""],
    ["Gestion de l’effort", "", ""],
    ["Sécurité", "", ""],
    ["Capacité à justifier une décision", "", ""],
  ],
  [3800, 3200, 2200],
));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION FINALE =================
children.push(sectionHeading("Préparation à l’évaluation finale", ""));
children.push(bodyPar(
  "Une évaluation d’EPS de 9e AF peut te proposer différents types de tâches : compléter une phrase, répondre à un QCM, relier des éléments, interpréter un schéma, analyser une situation-problème, justifier une décision, comparer deux éléments, ou rédiger une courte réponse argumentée."
));
children.push(bodyPar(
  "Pour bien réussir ce type d’évaluation : lis attentivement chaque consigne, repère les mots-clés, gère ton temps entre les différentes parties, et relis tes réponses avant de terminer."
));
children.push(calloutBox(
  "À retenir",
  ["Aucune structure présentée dans ce manuel n’est affirmée comme celle d’une épreuve officielle du MENFP, faute de preuve documentaire à ce sujet."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, "1F4E5F",
));
children.push(illustrationBox(
  "ILL-9AF-C12-08",
  "Parcours de préparation à l’évaluation",
  "Schéma en six étapes reliées par des flèches : RÉVISER → S’ENTRAÎNER → ANALYSER → S’AUTOÉVALUER → CORRIGER → PROGRESSER. Style épuré, icône simple par étape.",
  "Le parcours complet de préparation à une évaluation d’EPS.",
  "Servir de repère visuel pour organiser sa préparation à l’évaluation finale.",
  "Paysage, format horizontal, schéma pleine largeur.",
));
children.push(spacer(200));

// ================= EVALUATION BLANCHE =================
children.push(pageBreak());
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 100, after: 60 },
  children: [new TextRun({ text: "ÉVALUATION BLANCHE DE PRÉPARATION", font: "Calibri", size: 30, bold: true, color: "1F4E5F" })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "— NON OFFICIELLE —", font: "Calibri", size: 24, bold: true, color: "B23A2E" })],
}));
children.push(calloutBox(
  "Avertissement",
  [
    "Cette évaluation blanche est une création originale et pédagogique de ce manuel, destinée uniquement à la préparation. Elle ne reproduit et ne prétend reproduire aucune épreuve officielle du MENFP, et ne doit jamais être présentée comme telle.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

children.push(subHeading("Partie 1 — Connaissances essentielles (QCM)"));
children.push(...qcmBlock([
  { q: "1. Que signifie « transférer un apprentissage » d’un sport à un autre ?", opts: ["a) copier exactement le même geste", "b) réutiliser un principe appris pour progresser dans une situation différente", "c) oublier ce qu’on a appris ailleurs", "d) comparer deux sports pour dire lequel est meilleur"] },
  { q: "2. Que doit faire un élève face à une décision arbitrale avec laquelle il n’est pas d’accord ?", opts: ["a) contester bruyamment", "b) l’accepter, en exprimant un désaccord respectueux si besoin", "c) arrêter de jouer", "d) ignorer l’arbitre"] },
  { q: "3. Pourquoi la récupération fait-elle partie de l’apprentissage, selon ce manuel ?", opts: ["a) elle ne sert à rien", "b) elle permet à l’organisme de revenir à un état plus calme et de mieux poursuivre l’activité", "c) elle remplace l’échauffement", "d) elle n’est utile qu’en cas de blessure"] },
]));

children.push(subHeading("Partie 2 — Compléter"));
children.push(mixedPar([
  { text: "(replacement - hydratation - démarquage - impartialité - construction collective)", italics: true, color: "555555" },
]));
[
  "1. Se déplacer pour devenir disponible pour un partenaire s’appelle le ____________________.",
  "2. Revenir rapidement à une position utile après une perte ou une récupération du ballon s’appelle le ____________________.",
  "3. Appliquer la même règle à tous, sans favoriser personne, s’appelle l’____________________.",
  "4. Boire régulièrement pour compenser la perte d’eau s’appelle l’____________________.",
  "5. Réception, préparation puis renvoi du ballon forment la ____________________ d’un échange, notamment au volleyball.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

children.push(subHeading("Partie 3 — Correspondances"));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Fair-play", "a) Fait de travailler ensemble vers un objectif commun"],
  ["2. Coopération", "b) Ensemble de comportements honnêtes et respectueux, au-delà du simple respect des règles"],
  ["3. Sécurité", "c) Capacité à observer un signal ou une trajectoire puis à répondre de manière adaptée"],
  ["4. Réaction", "d) Ensemble des règles et comportements qui protègent les élèves"],
]));
children.push(spacer(160));

children.push(subHeading("Partie 4 — Situation-problème"));
children.push(bodyPar(
  "Un match scolaire de basketball se déroule sous une forte chaleur. Une équipe reste regroupée autour du porteur du ballon. Un joueur ressent une gêne inhabituelle mais continue de jouer sans le signaler."
));
[
  "Identifie deux problèmes distincts dans cette situation.",
  "Pour chacun, propose une décision adaptée.",
  "Explique pourquoi il est important de signaler une gêne inhabituelle, même si elle semble légère.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(160));

children.push(subHeading("Partie 5 — Comparaison et justification"));
children.push(numberedPar(
  "1. Compare la construction d’une action collective au basketball et au volleyball : que faut-il faire dans les deux sports pour transformer une simple récupération du ballon en une action offensive organisée ?"
));
children.push(numberedPar(
  "2. Explique, en une réponse argumentée de quelques phrases, pourquoi la sécurité, le fair-play et la coopération sont indispensables ensemble à une pratique sportive scolaire réussie."
));
children.push(spacer(200));

// ================= EXERCICES OBLIGATOIRES DU CHAPITRE =================
children.push(pageBreak());
children.push(exercicesHeading(12));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(fair-play - récupération - sécurité - décision - transfert - autoévaluation - coordination - occupation de l’espace - communication - arbitrage)", italics: true, color: "555555" },
]));
[
  "1. Organiser efficacement plusieurs actions du corps s’appelle la ____________________.",
  "2. Répartir judicieusement les joueurs sur le terrain pour multiplier les solutions de jeu s’appelle l’____________________.",
  "3. Échanger des informations claires entre partenaires s’appelle la ____________________.",
  "4. Observer le jeu, signaler et décider selon des règles communes s’appelle l’____________________.",
  "5. Respecter les règles, les adversaires et l’arbitre, au-delà du simple respect formel, s’appelle le ____________________.",
  "6. Revenir à un état plus calme après l’effort s’appelle la ____________________.",
  "7. L’ensemble des règles et comportements qui protègent les élèves s’appelle la ____________________.",
  "8. Choisir une action après avoir observé une situation s’appelle une ____________________.",
  "9. Réutiliser un principe appris dans un sport pour progresser dans un autre s’appelle un ____________________.",
  "10. Observer ses propres progrès sans se comparer aux autres s’appelle une ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que signifie « transférer un apprentissage », selon ce chapitre ?", opts: ["a) copier exactement le même geste d’un sport à l’autre", "b) réutiliser un principe appris dans un sport pour progresser dans une situation différente", "c) oublier ce qui a été appris dans un autre sport", "d) comparer deux sports pour déterminer lequel est meilleur"] },
  { q: "2. Qu’ont en commun l’occupation de l’espace au football, au basketball et au volleyball ?", opts: ["a) rien, ces notions sont propres à chaque sport", "b) dans les trois sports, bien occuper l’espace crée plusieurs solutions pour l’équipe", "c) elle ne concerne que les défenseurs", "d) elle dépend uniquement de la vitesse des joueurs"] },
  { q: "3. Que doit faire un élève qui prépare une évaluation, selon la méthode de révision présentée ?", opts: ["a) réviser toute la nuit juste avant l’évaluation", "b) relire les objectifs, identifier les notions-clés, reformuler avec ses mots et vérifier ses réponses", "c) mémoriser mot pour mot chaque paragraphe du manuel", "d) comparer ses résultats à ceux des autres élèves"] },
  { q: "4. Pourquoi l’évaluation blanche proposée dans ce chapitre n’est-elle pas une épreuve officielle du MENFP ?", opts: ["a) parce qu’elle est plus difficile qu’une épreuve officielle", "b) parce qu’elle a été créée pour ce manuel, à des fins de préparation, sans être un document du MENFP", "c) parce qu’elle ne contient aucune question", "d) parce qu’elle ne peut être utilisée qu’une seule fois"] },
  { q: "5. Que recherche une bonne autoévaluation globale, selon ce chapitre ?", opts: ["a) classer les élèves du meilleur au moins bon", "b) identifier ce qui est acquis et ce qui reste à renforcer, sans classement humiliant", "c) uniquement mesurer la vitesse des élèves", "d) comparer les résultats à ceux d’une autre classe"] },
  { q: "6. Dans la démarche observer → identifier le problème → choisir une réponse → agir → analyser → ajuster, que fait-on juste après avoir choisi une réponse ?", opts: ["a) on recommence l’observation", "b) on agit de façon adaptée", "c) on ajuste immédiatement sans agir", "d) on arrête l’activité"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque notion de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Occupation de l’espace", "a) Ensemble de comportements honnêtes et respectueux, au-delà du simple respect des règles"],
  ["2. Transfert", "b) Fait d’échanger des informations claires entre partenaires"],
  ["3. Autoévaluation", "c) Fait d’adapter son intensité et son rythme selon la tâche et son propre état"],
  ["4. Fair-play", "d) Ensemble des règles et comportements qui protègent les élèves"],
  ["5. Communication", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
  ["6. Gestion de l’effort", "f) Répartition des joueurs sur le terrain pour multiplier les solutions de jeu"],
  ["7. Sécurité", "g) Fait de réutiliser un principe appris dans un sport pour progresser dans un autre"],
  ["8. Arbitrage", "h) Démarche par laquelle l’élève observe ses propres progrès, sans se comparer aux autres"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un joueur de basketball reste immobile après sa passe, comme un joueur de football qui ne se replace pas après une perte de balle. Explique le principe commun que ces deux situations illustrent, et comment y remédier dans chaque sport.",
  "2. Pendant une activité de volleyball, un élève remarque que le filet est mal fixé. Explique ce qu’il devrait faire, en t’appuyant sur ce que tu as appris sur la sécurité.",
  "3. Une équipe de football gagne un match, mais un joueur se moque ouvertement de l’équipe adverse après la victoire. Analyse ce comportement à la lumière du fair-play, et propose une attitude plus responsable.",
  "4. Décris une situation sportive (football, basketball ou volleyball) où plusieurs qualités physiques et une bonne communication sont nécessaires en même temps pour réussir une action.",
  "5. En préparant ton évaluation de fin d’année, identifie une notion que tu maîtrises bien et une notion que tu dois encore renforcer ; explique comment tu comptes progresser sur ce second point.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 152, "Manuel_EPS_9AF_Chapitre12.docx");
console.log("Chapitre 12 (9e AF) genere:", outPath);
