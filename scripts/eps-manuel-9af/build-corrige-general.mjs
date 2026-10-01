// Corrige general des exercices — Manuel d'EPS 9e AF (12 chapitres).
// Reponses derivees directement du contenu reellement redige et valide de
// chaque chapitre (fichiers build-chapitreN.mjs) : aucune reponse inventee.
// Pour les questions D (reflexion), le corrige donne des elements de
// reponse attendus (criteres), pas une reponse unique imposee.
import {
  Paragraph, TextRun,
  bodyPar, sectionHeading, spacer, pageBreak, buildAndSave, FONT, NAVY, GOLD, GREY_TEXT,
  twoColTable, BOX_SECURITE_FILL, BOX_SECURITE_LINE, calloutBox,
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
      children: [new TextRun({ text: "Manuel d’EPS 9e Année Fondamentale — 2026-2027", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
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

function subH(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: FONT, size: 24, bold: true, color: NAVY })],
  });
}

function numPar(text) {
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, font: FONT, size: 24 })] });
}

function completerBlock(answers) {
  const arr = [subH("A. Compléter — réponses")];
  answers.forEach((a, i) => arr.push(numPar(`${i + 1}. ${a}`)));
  return arr;
}

function qcmBlockCorrige(answers) {
  const arr = [subH("B. QCM — bonnes réponses")];
  answers.forEach((a, i) => arr.push(numPar(`${i + 1}. ${a}`)));
  return arr;
}

function relierBlock(pairs) {
  return [
    subH("C. Relier — bonnes correspondances"),
    twoColTable("Colonne A", "Correspond à", pairs.map(([a, b]) => [a, b])),
    spacer(120),
  ];
}

function reflexionBlock(items) {
  const arr = [subH("D. Questions de réflexion — éléments de réponse attendus"), bodyPar(
    "Ces questions sont ouvertes : il n’existe pas de réponse unique à recopier. L’enseignant évalue la réponse de l’élève à l’aide des critères ci-dessous, qui indiquent les idées essentielles attendues.", { italics: true }
  )];
  items.forEach((t, i) => arr.push(numPar(`${i + 1}. ${t}`)));
  return arr;
}

children.push(...titleBlock());
children.push(bodyPar(
  "Ce corrigé rassemble les réponses des exercices A (Compléter), B (QCM) et C (Relier) des douze chapitres du manuel, le corrigé de l’Évaluation blanche du Chapitre 12, ainsi que des éléments de réponse attendus pour les questions D (réflexion). Toutes les réponses ont été établies à partir du contenu réellement rédigé et validé de chaque chapitre ; aucune réponse n’a été inventée."
));
children.push(spacer(200));
children.push(pageBreak());

// ================= CHAPITRE 1 =================
children.push(chapTitle(1, "L’EPS en 9e AF : autonomie, responsabilité, santé et compétences"));
children.push(...completerBlock([
  "compétence", "autonomie", "responsabilité", "sécurité", "coopération", "fair-play", "autoévaluation", "ajustement",
]));
children.push(...qcmBlockCorrige([
  "b) mobiliser mouvement, réflexion et apprentissage à la fois",
  "b) on agit",
  "b) arrêter et prévenir l’enseignant ou un adulte responsable",
  "b) agir de façon responsable, dans un cadre organisé et sécurisé par l’enseignant",
  "c) à observer ses propres progrès et difficultés, sans se comparer aux autres",
]));
children.push(...relierBlock([
  ["1. Autonomie", "e) Capacité à agir de manière responsable sans attendre chaque consigne, en respectant les règles et la sécurité"],
  ["2. Compétence", "f) Capacité à mobiliser des connaissances, des gestes, des méthodes et des comportements dans une situation donnée"],
  ["3. Coopération", "a) Fait de travailler ensemble, communiquer et s’entraider pour progresser collectivement"],
  ["4. Sécurité", "b) Ensemble des règles et comportements qui protègent les élèves pendant une activité physique"],
  ["5. Fair-play", "c) Ensemble de comportements respectueux envers partenaires, adversaires et arbitre, dans le respect des règles"],
  ["6. Autoévaluation", "d) Démarche par laquelle l’élève observe ses propres progrès et difficultés, sans se comparer aux autres"],
]));
children.push(...reflexionBlock([
  "Décrire un cycle observer-comprendre-décider-agir-analyser-ajuster appliqué au choix entre deux solutions, avec un ajustement proposé si le résultat n’est pas celui attendu.",
  "Commencer sans vérifier l’espace ni le matériel est risqué ; le groupe devrait d’abord observer et vérifier avant d’agir.",
  "Exclure un camarade moins à l’aise est contraire à la coopération et au fair-play ; solution attendue : lui donner des occasions réelles de participer.",
  "L’autoévaluation aide à identifier une consigne mal respectée et à progresser, sans jamais se comparer aux autres élèves.",
]));
children.push(pageBreak());

// ================= CHAPITRE 2 =================
children.push(chapTitle(2, "Capacités physiques et motrices : analyser, gérer et améliorer sa performance"));
children.push(...completerBlock([
  "coordination", "endurance", "vitesse", "équilibre", "précision", "agilité", "effort", "observation", "ajustement", "sécurité",
]));
children.push(...qcmBlockCorrige([
  "c) utiliser des critères simples pour analyser sa propre réalisation, sans juger ni humilier",
  "b) parce que la qualité d’une action (précision, contrôle, sécurité) n’est pas toujours visible dans un seul chiffre",
  "c) privilégier des actions contrôlées et sécuritaires avec le poids du corps ou du matériel léger",
  "b) on ajuste",
  "b) des mouvements forcés ou des positions extrêmes recherchant la douleur",
  "b) arrêter et prévenir l’enseignant ou un adulte responsable",
]));
children.push(...relierBlock([
  ["1. Coordination", "f) Capacité à organiser efficacement plusieurs mouvements en même temps"],
  ["2. Endurance", "g) Capacité à poursuivre un effort adapté en gérant son rythme et sa récupération"],
  ["3. Vitesse", "h) Capacité à réagir rapidement à un signal et à se déplacer vite sur une courte distance"],
  ["4. Équilibre", "a) Capacité à maintenir ou retrouver une position contrôlée"],
  ["5. Précision", "b) Capacité à adapter son mouvement à une cible ou un objectif précis"],
  ["6. Agilité", "c) Capacité à modifier efficacement son déplacement ou son action selon la situation"],
  ["7. Gestion de l’effort", "d) Fait d’adapter son allure et son rythme selon son état et la durée de l’activité"],
  ["8. Ajustement", "e) Fait de modifier son action après l’avoir observée et analysée"],
]));
children.push(...reflexionBlock([
  "La vitesse seule ne suffit pas si la précision manque ; conseils distincts pour chaque élève (ralentir légèrement / continuer à progresser en gardant le contrôle).",
  "Utiliser la méthode d’analyse (identifier l’objectif, observer, relever un critère, choisir une modification) pour ajuster l’allure dès le départ.",
  "Les différences d’équilibre entre élèves sont normales ; proposer une aide respectueuse (conseil, entraînement progressif), jamais une comparaison.",
  "Un chiffre seul ne dit rien de la précision, du contrôle ou de la sécurité d’une action ; exemple à l’appui.",
  "Décrire une action réelle combinant au moins trois qualités (ex. coordination, vitesse, précision) et expliquer leur combinaison.",
]));
children.push(pageBreak());

// ================= CHAPITRE 3 =================
children.push(chapTitle(3, "Football : histoire, évolution et place dans le patrimoine sportif haïtien"));
children.push(...completerBlock([
  "codification", "diffusion", "patrimoine", "fair-play", "chronologie", "arbitre", "fait", "opinion", "repère", "mémoire",
]));
children.push(...qcmBlockCorrige([
  "b) elles ont permis d’organiser des rencontres et des compétitions entre équipes différentes",
  "b) un repère majeur du patrimoine sportif national",
  "b) chercher à la vérifier avant de la considérer comme un fait",
  "b) un fait est vérifiable par des sources fiables, une opinion est un jugement personnel",
  "b) qu’un sport peut évoluer (règles, tactiques, équipements) tout en conservant des principes fondamentaux",
  "b) avec respect et égalité, en s’appuyant sur des faits vérifiés",
]));
children.push(...relierBlock([
  ["1. Codification", "f) Fait d’établir des règles communes permettant d’organiser rencontres et compétitions"],
  ["2. Diffusion", "g) Fait, pour une pratique sportive, de se répandre et de devenir largement pratiquée"],
  ["3. Patrimoine", "h) Ensemble des repères, événements et mémoires qu’une société conserve autour d’un sport"],
  ["4. Fair-play", "a) Respect des règles, de l’adversaire et de l’arbitre, dans la victoire comme dans la défaite"],
  ["5. Chronologie", "b) Mise en ordre d’événements selon leur date, permettant d’observer continuité et changement"],
  ["6. Arbitrage", "c) Action d’observer le jeu, signaler et décider selon des règles communes"],
  ["7. Fait historique", "d) Information vérifiable, appuyée par des sources fiables et recoupées"],
  ["8. Opinion", "e) Jugement personnel qui peut varier d’une personne à l’autre, non vérifiable comme un fait"],
]));
children.push(...reflexionBlock([
  "La qualification de 1974 reste un repère patrimonial car elle marque la seule participation d’Haïti à une Coupe du monde masculine, indépendamment du résultat sportif.",
  "Citer au moins deux évolutions réelles (règles, arbitrage, tactiques, équipements, médiatisation, participation féminine).",
  "« La meilleure équipe de l’histoire » est une opinion, non un fait vérifiable : aucune source ne peut établir objectivement un tel classement.",
  "La qualification de 2023 est historique car c’est la première participation féminine haïtienne à une Coupe du monde, indépendamment des résultats.",
  "Décrire une situation de fair-play plausible et une réaction responsable (respect, maîtrise de soi, reconnaissance de l’adversaire).",
]));
children.push(pageBreak());

// ================= CHAPITRE 4 =================
children.push(chapTitle(4, "Football : règlements, fondamentaux techniques et organisation tactique"));
children.push(...completerBlock([
  "passe", "contrôle", "démarquage", "soutien", "arbitrage", "espace", "replacement", "précision", "fair-play", "décision",
]));
children.push(...qcmBlockCorrige([
  "b) une remise en touche est accordée à l’équipe adverse de celle qui a touché le ballon en dernier",
  "b) un coup franc direct peut être marqué directement, un coup franc indirect doit d’abord toucher un autre joueur",
  "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin",
  "b) devenir disponible pour recevoir une passe d’un partenaire",
  "b) ils sont interdits ; la priorité va à une récupération sûre et collective",
  "b) choisir l’action la plus adaptée à la situation",
]));
children.push(...relierBlock([
  ["1. Touche", "f) Remise en jeu du ballon depuis la ligne de touche, après qu’il l’ait entièrement franchie"],
  ["2. Corner", "g) Coup de pied de coin accordé à l’attaque quand le ballon sort par la ligne de but après avoir touché un défenseur en dernier"],
  ["3. Contrôle", "h) Fait de recevoir le ballon de façon à faciliter l’action suivante"],
  ["4. Passe", "a) Action d’envoyer le ballon à un partenaire pour qu’il le reçoive"],
  ["5. Démarquage", "b) Action de se déplacer pour devenir disponible pour un partenaire"],
  ["6. Soutien", "c) Fait de se placer pour offrir une solution supplémentaire au porteur du ballon"],
  ["7. Replacement", "d) Fait de revenir rapidement à une position utile après une perte ou une récupération du ballon"],
  ["8. Fair-play", "e) Ensemble de comportements respectueux envers partenaires, adversaires et arbitre"],
]));
children.push(...reflexionBlock([
  "Observer partenaire démarqué, espace libre et position du défenseur ; décision justifiée selon la situation (passe si un partenaire est mieux placé, conduite si l’espace est libre).",
  "Rester immobile après une passe réduit les solutions de l’équipe ; se déplacer pour redevenir disponible.",
  "Après une perte de balle, se replacer rapidement et protéger l’espace (transition défensive).",
  "Accepter la décision avec respect ; contester bruyamment nuit au jeu et ne change pas la décision.",
  "Signaler le risque à l’enseignant avant de commencer l’activité ; ne jamais utiliser une zone dangereuse.",
]));
children.push(pageBreak());

// ================= CHAPITRE 5 =================
children.push(chapTitle(5, "Basketball : histoire, évolution et culture sportive"));
children.push(...completerBlock([
  "Naismith", "1891", "règles", "coopération", "évolution", "arbitrage", "culture", "international", "fair-play", "Haïti",
]));
children.push(...qcmBlockCorrige([
  "b) à Springfield, aux États-Unis, en 1891",
  "b) pour proposer une activité collective praticable en intérieur pendant l’hiver",
  "b) qu’une compétition internationale peut contribuer à la visibilité mondiale d’un sport",
  "b) comme une partie intégrante de l’histoire du sport, avec des faits vérifiés",
  "b) l’omettre ou la formuler avec prudence plutôt que de la présenter comme un fait certain",
  "b) l’ensemble des repères identitaires, des médias et des pratiques sociales qui l’entourent",
]));
children.push(...relierBlock([
  ["1. Naismith", "f) Éducateur physique qui a inventé le basketball en 1891, à Springfield"],
  ["2. FIBA", "g) Fédération internationale qui organise le basketball à l’échelle mondiale"],
  ["3. Jeux olympiques", "h) Compétition qui a contribué à la visibilité internationale du basketball"],
  ["4. Culture sportive", "a) Ensemble des repères identitaires, des médias et des pratiques sociales autour d’un sport"],
  ["5. Fair-play", "b) Respect des règles, de l’adversaire et de l’arbitre, dans la victoire comme dans la défaite"],
  ["6. Évolution du jeu", "c) Transformation progressive du matériel, des règles et de l’organisation d’un sport dans le temps"],
  ["7. Basketball féminin", "d) Développement de la pratique et de la visibilité des joueuses, partie intégrante de l’histoire du basketball"],
  ["8. Basketball en Haïti", "e) Pratique scolaire, communautaire et compétitive, documentée avec prudence faute de sources complètes"],
]));
children.push(...reflexionBlock([
  "Citer au moins deux évolutions (matériel, règles, arbitrage, rythme) et expliquer le besoin d’équité, de sécurité ou de dynamisme.",
  "Décrire la diffusion progressive : activité éducative locale → réseau YMCA → clubs → fédérations → compétitions internationales.",
  "Distinguer une observation directe (matériel, tenue visibles) d’une hypothèse (raison supposée du changement).",
  "Le fair-play (respect, honnêteté) est ce qui rend la culture sportive positive ; exemple de comportement concret à l’appui.",
  "Distinguer un fait vérifiable (adhésion FIBA 1970) d’une information non confirmée (année de fondation de la fédération, contradictoire selon les sources) ; ne jamais l’affirmer comme certaine.",
]));
children.push(pageBreak());

// ================= CHAPITRE 6 =================
children.push(chapTitle(6, "Basketball : règlements, fondamentaux techniques et organisation tactique"));
children.push(...completerBlock([
  "dribble", "passe", "démarquage", "tir", "réception", "replacement", "décision", "espace", "fair-play", "arbitrage",
]));
children.push(...qcmBlockCorrige([
  "b) une violation est sifflée et le ballon est remis à l’équipe adverse",
  "a) déplacer illégalement son pied de pivot ou faire trop de pas sans dribbler",
  "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin",
  "b) devenir disponible pour recevoir une passe d’un partenaire",
  "b) ils sont interdits ; la priorité va à une récupération sûre et collective",
  "b) l’espace disponible et si l’on est soi-même démarqué",
]));
children.push(...relierBlock([
  ["1. Dribble", "f) Fait de faire rebondir le ballon au sol tout en se déplaçant, en le contrôlant"],
  ["2. Passe", "g) Action d’envoyer le ballon à un partenaire pour qu’il le reçoive"],
  ["3. Réception", "h) Fait de recevoir le ballon en préparant l’action suivante"],
  ["4. Tir", "a) Action d’envoyer le ballon vers le panier pour marquer"],
  ["5. Démarquage", "b) Action de se déplacer pour devenir disponible pour un partenaire"],
  ["6. Soutien", "c) Fait de se placer pour offrir une solution supplémentaire au porteur du ballon"],
  ["7. Replacement", "d) Fait de revenir rapidement à une position utile après une perte ou une récupération du ballon"],
  ["8. Arbitrage", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
]));
children.push(...reflexionBlock([
  "Dribbler malgré un partenaire libre limite les solutions de l’équipe ; passer serait souvent préférable.",
  "Rester immobile après une passe limite les solutions ; se déplacer pour redevenir utile.",
  "Après une perte de balle, réagir rapidement et se replacer (transition défensive).",
  "Contester agressivement une décision arbitrale n’est jamais adapté ; exprimer un désaccord avec calme et respect.",
  "Signaler un terrain glissant à l’enseignant avant de jouer, plutôt que de continuer malgré le risque.",
]));
children.push(pageBreak());

// ================= CHAPITRE 7 =================
children.push(chapTitle(7, "Volleyball : histoire, évolution et culture sportive"));
children.push(...completerBlock([
  "Morgan", "Mintonette", "volleyball", "évolution", "filet", "coopération", "international", "règles", "culture", "histoire",
]));
children.push(...qcmBlockCorrige([
  "b) William G. Morgan",
  "b) Mintonette",
  "b) pour proposer une activité moins intense, adaptée à un public plus âgé",
  "a) qu’un sport et son identité peuvent évoluer après sa création",
  "b) la traiter avec prudence et chercher à la vérifier avant de l’utiliser",
  "b) avec respect, en s’appuyant sur des faits vérifiés",
]));
children.push(...relierBlock([
  ["1. William G. Morgan", "f) Éducateur physique qui a inventé le jeu à l’origine du volleyball, en 1895"],
  ["2. Mintonette", "g) Premier nom donné au jeu par son créateur, avant qu’il ne soit renommé"],
  ["3. Volleyball", "h) Nom adopté après qu’un spectateur a remarqué que les joueurs semblaient « voleyer » le ballon"],
  ["4. FIVB", "a) Fédération internationale qui organise le volleyball à l’échelle mondiale, fondée en 1947"],
  ["5. Compétition internationale", "b) Rencontre organisée entre équipes de différents pays, contribuant à la reconnaissance mondiale d’un sport"],
  ["6. Beach-volley", "c) Forme du volleyball pratiquée sur sable, avec un nombre réduit de joueurs par équipe"],
  ["7. Coopération", "d) Fait de travailler ensemble, communiquer et s’entraider pour progresser collectivement"],
  ["8. Source historique", "e) Origine vérifiable d’une information, permettant de distinguer un fait d’une simple affirmation"],
]));
children.push(...reflexionBlock([
  "Citer un exemple d’évolution des règles (organisation, score, arbitrage) présenté dans le chapitre.",
  "Chercher l’auteur/organisme, la date et recouper avec une autre source avant d’utiliser l’information.",
  "Décrire la diffusion progressive : YMCA locale → réseau international → fédération → compétitions mondiales.",
  "La communication réduit les hésitations et les collisions entre partenaires, essentielle vu le nombre limité de touches.",
  "Connaître l’histoire éclaire le sens des règles et pratiques actuelles ; savoir pratiquer suppose en plus la technique et la décision en situation réelle.",
]));
children.push(pageBreak());

// ================= CHAPITRE 8 =================
children.push(chapTitle(8, "Volleyball : règlements, fondamentaux techniques et organisation tactique"));
children.push(...completerBlock([
  "service", "manchette", "passe", "rotation", "trajectoire", "filet", "coopération", "replacement", "arbitrage", "communication",
]));
children.push(...qcmBlockCorrige([
  "c) trois touches",
  "b) ses joueurs tournent d’une position dans le sens des aiguilles d’une montre",
  "b) la réussite et le contrôle du geste",
  "b) accepter la décision, en exprimant un désaccord de façon respectueuse si besoin",
  "b) elle réduit les hésitations et les collisions entre partenaires",
  "a) repérer l’espace disponible, se déplacer, puis communiquer",
]));
children.push(...relierBlock([
  ["1. Service", "f) Geste qui met le ballon en jeu depuis l’arrière du terrain"],
  ["2. Manchette", "g) Geste défensif réalisé avec les avant-bras pour contrôler un ballon bas"],
  ["3. Passe haute", "h) Geste réalisé avec les mains, au-dessus de la tête, qui oriente le ballon vers un partenaire"],
  ["4. Rotation", "a) Changement de position des joueurs dans le sens des aiguilles d’une montre"],
  ["5. Trajectoire", "b) Chemin suivi par le ballon dans les airs"],
  ["6. Replacement", "c) Fait de revenir rapidement à une position utile après une action"],
  ["7. Communication", "d) Fait d’échanger des informations claires entre partenaires"],
  ["8. Arbitrage", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
]));
children.push(...reflexionBlock([
  "Une communication claire (annoncer « à moi ! ») aurait évité la collision entre les deux joueurs.",
  "Une équipe mal répartie laisse trop d’espace libre ; ajustement attendu : occuper l’espace disponible.",
  "Rechercher uniquement la puissance nuit au contrôle du service ; privilégier d’abord la réussite et la régularité.",
  "Observer le point d’impact par rapport à la ligne, la trajectoire et, si besoin, demander l’avis de l’enseignant.",
  "Signaler l’installation instable du filet à l’enseignant avant de jouer, plutôt que de continuer malgré le risque.",
]));
children.push(pageBreak());

// ================= CHAPITRE 9 =================
children.push(chapTitle(9, "Habiletés motrices et qualités physiques appliquées aux sports collectifs"));
children.push(...completerBlock([
  "coordination", "équilibre", "orientation", "réaction", "précision", "vitesse", "endurance", "force", "mobilité", "adaptation",
]));
children.push(...qcmBlockCorrige([
  "b) une habileté motrice organise un mouvement pour une tâche précise, une qualité physique est une ressource comme la vitesse ou la force",
  "b) une action rapide mais imprécise n’est souvent pas efficace pour l’équipe",
  "b) arrêter immédiatement et prévenir l’enseignant ou un adulte responsable",
  "b) plusieurs habiletés et qualités physiques en même temps",
  "b) une amplitude fonctionnelle adaptée, sans amplitude extrême ni douleur recherchée",
  "b) proposer un ajustement qui peut améliorer l’action",
]));
children.push(...relierBlock([
  ["1. Coordination", "f) Capacité à organiser efficacement plusieurs actions corporelles selon une tâche"],
  ["2. Équilibre", "g) Capacité à maintenir ou retrouver une posture stable"],
  ["3. Orientation", "h) Capacité à se situer par rapport au ballon, aux partenaires et aux espaces disponibles"],
  ["4. Réaction", "a) Capacité à observer un signal ou une trajectoire puis à répondre de manière adaptée"],
  ["5. Précision", "b) Capacité à adapter un geste à une cible ou à un objectif précis"],
  ["6. Vitesse", "c) Capacité à réaliser une action rapidement dans une situation donnée"],
  ["7. Endurance", "d) Capacité à maintenir une activité adaptée dans le temps et à récupérer"],
  ["8. Force adaptée", "e) Ressource utile pour stabiliser, pousser, sauter ou lancer, dans des tâches scolaires sûres"],
]));
children.push(...reflexionBlock([
  "La vitesse seule ne compense pas un manque de précision ; ajustement attendu : ralentir légèrement pour gagner en contrôle.",
  "Un déplacement tardif suggère un manque de réaction ou d’observation ; ajustement : observer plus tôt la trajectoire.",
  "Enchaîner des efforts sans récupération augmente la fatigue et le risque ; prévoir des temps de repos.",
  "Décrire une action réelle combinant au moins trois qualités et expliquer leur combinaison.",
  "Proposer un atelier centré sur la progression individuelle, sans classement ni recherche de performance maximale.",
]));
children.push(pageBreak());

// ================= CHAPITRE 10 =================
children.push(chapTitle(10, "Arbitrage, règles, fair-play, coopération et responsabilité"));
children.push(...completerBlock([
  "règle", "arbitre", "impartialité", "fair-play", "coopération", "responsabilité", "sécurité", "décision", "respect", "observation",
]));
children.push(...qcmBlockCorrige([
  "b) à assurer la sécurité, l’équité, l’organisation et une compréhension commune du jeu",
  "b) comme une personne qui observe, applique les règles avec impartialité et communique ses décisions",
  "b) exprimer son désaccord avec respect, en utilisant les procédures prévues",
  "a) le simple respect formel des règles",
  "b) le signaler immédiatement à l’enseignant",
  "b) inclure cet élève, la coopération excluant toute mise à l’écart injustifiée",
]));
children.push(...relierBlock([
  ["1. Arbitre", "f) Personne qui observe le jeu, signale et décide selon des règles communes"],
  ["2. Règle", "g) Énoncé clair qui organise un jeu et le rend compréhensible par tous"],
  ["3. Fair-play", "h) Ensemble de comportements honnêtes et respectueux, au-delà du simple respect formel des règles"],
  ["4. Coopération", "a) Fait de travailler ensemble vers un objectif commun"],
  ["5. Responsabilité individuelle", "b) Fait d’assumer, seul, les conséquences de ses choix et de son comportement"],
  ["6. Responsabilité collective", "c) Fait, pour un groupe, de protéger l’espace de pratique et de contribuer à un climat sûr"],
  ["7. Sécurité", "d) Ensemble des règles et comportements qui protègent les élèves"],
  ["8. Impartialité", "e) Fait d’appliquer la même règle à tous, sans favoriser personne"],
]));
children.push(...reflexionBlock([
  "Une contestation agressive n’est jamais adaptée ; réponse attendue : exprimer le désaccord avec calme et respect.",
  "Reconnaître spontanément une faute sans y être obligé illustre l’honnêteté au cœur du fair-play.",
  "Exclure un partenaire est contraire à la coopération ; solution attendue : l’inclure activement dans le jeu.",
  "Laisser du matériel dans une zone de passage est un risque ; le groupe aurait dû le ranger immédiatement.",
  "Un arbitre incertain doit s’abstenir de décider seul ou demander l’avis de l’enseignant plutôt que de deviner.",
]));
children.push(pageBreak());

// ================= CHAPITRE 11 =================
children.push(chapTitle(11, "Santé, préparation physique, gestion de l’effort et sécurité"));
children.push(...completerBlock([
  "échauffement", "effort", "récupération", "sécurité", "hydratation", "repos", "risque", "adaptation", "observation", "responsabilité",
]));
children.push(...qcmBlockCorrige([
  "b) préparer progressivement le corps à l’activité principale",
  "b) arrêter l’activité, se mettre en sécurité et prévenir immédiatement l’enseignant ou un adulte responsable",
  "b) des principes généraux d’accès à l’eau, adaptés au contexte scolaire et climatique",
  "b) parce que la perception de l’effort varie d’une personne à l’autre, sans que cela soit un problème",
  "b) adapter, reporter ou arrêter l’activité selon les conditions",
  "b) un régime, une perte de poids, un supplément ou un programme d’entraînement intensif",
]));
children.push(...relierBlock([
  ["1. Échauffement", "f) Préparation progressive du corps avant l’activité principale"],
  ["2. Effort", "g) Mobilisation du corps pour réaliser une activité physique"],
  ["3. Récupération", "h) Retour progressif de l’organisme vers un état plus calme après l’effort"],
  ["4. Hydratation", "a) Fait de boire régulièrement pour compenser la perte d’eau"],
  ["5. Inspection", "b) Vérification du sol, du matériel et de l’espace avant une activité"],
  ["6. Risque", "c) Possibilité qu’un événement indésirable ou dangereux se produise"],
  ["7. Adaptation", "d) Fait de modifier une activité ou un comportement selon la situation"],
  ["8. Responsabilité", "e) Fait d’assumer les conséquences de ses choix et de son comportement"],
]));
children.push(...reflexionBlock([
  "Commencer sans préparation progressive augmente le risque ; proposer un échauffement adapté avant l’effort principal.",
  "Signaler le terrain glissant à l’enseignant avant l’activité, sans l’utiliser en l’état.",
  "Continuer malgré un problème inhabituel est risqué ; arrêter et prévenir un adulte responsable est la seule réponse adaptée.",
  "Enchaîner les efforts sans récupération augmente la fatigue ; prévoir des temps de pause.",
  "Signaler le matériel instable à l’enseignant avant l’activité, sans l’utiliser en l’état.",
]));
children.push(pageBreak());

// ================= CHAPITRE 12 =================
children.push(chapTitle(12, "Synthèse des compétences et préparation à l’évaluation EPS de 9e AF"));
children.push(...completerBlock([
  "coordination", "occupation de l’espace", "communication", "arbitrage", "fair-play", "récupération", "sécurité", "décision", "transfert", "autoévaluation",
]));
children.push(...qcmBlockCorrige([
  "b) réutiliser un principe appris dans un sport pour progresser dans une situation différente",
  "b) dans les trois sports, bien occuper l’espace crée plusieurs solutions pour l’équipe",
  "b) relire les objectifs, identifier les notions-clés, reformuler avec ses mots et vérifier ses réponses",
  "b) parce qu’elle a été créée pour ce manuel, à des fins de préparation, sans être un document du MENFP",
  "b) identifier ce qui est acquis et ce qui reste à renforcer, sans classement humiliant",
  "b) on agit de façon adaptée",
]));
children.push(...relierBlock([
  ["1. Occupation de l’espace", "f) Répartition des joueurs sur le terrain pour multiplier les solutions de jeu"],
  ["2. Transfert", "g) Fait de réutiliser un principe appris dans un sport pour progresser dans un autre"],
  ["3. Autoévaluation", "h) Démarche par laquelle l’élève observe ses propres progrès, sans se comparer aux autres"],
  ["4. Fair-play", "a) Ensemble de comportements honnêtes et respectueux, au-delà du simple respect des règles"],
  ["5. Communication", "b) Fait d’échanger des informations claires entre partenaires"],
  ["6. Gestion de l’effort", "c) Fait d’adapter son intensité et son rythme selon la tâche et son propre état"],
  ["7. Sécurité", "d) Ensemble des règles et comportements qui protègent les élèves"],
  ["8. Arbitrage", "e) Action d’observer le jeu, signaler et décider selon des règles communes"],
]));
children.push(...reflexionBlock([
  "Principe commun : rester actif après son action (se déplacer/se replacer) plutôt que rester immobile ; remède identique dans les deux sports : bouger utilement après l’action.",
  "Signaler le filet mal fixé à l’enseignant avant de continuer à jouer.",
  "Se moquer de l’adversaire après une victoire est contraire au fair-play ; attitude attendue : reconnaître le jeu de l’adversaire avec respect.",
  "Décrire une action réelle combinant plusieurs qualités physiques et une communication claire.",
  "Identifier une notion maîtrisée et une à renforcer, avec une stratégie de révision réaliste (relire, reformuler, s’entraîner).",
]));
children.push(pageBreak());

// ================= CORRIGE DE L'EVALUATION BLANCHE (CHAPITRE 12) =================
children.push(new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 200, after: 200 },
  children: [new TextRun({ text: "Corrigé de l’Évaluation blanche de préparation (Chapitre 12) — NON OFFICIELLE", font: FONT, size: 28, bold: true, color: NAVY })],
}));
children.push(subH("Partie 1 — Connaissances essentielles (QCM)"));
[
  "1. b) réutiliser un principe appris pour progresser dans une situation différente",
  "2. b) l’accepter, en exprimant un désaccord respectueux si besoin",
  "3. b) elle permet à l’organisme de revenir à un état plus calme et de mieux poursuivre l’activité",
].forEach(t => children.push(numPar(t)));
children.push(subH("Partie 2 — Compléter"));
[
  "1. démarquage", "2. replacement", "3. impartialité", "4. hydratation", "5. construction collective",
].forEach(t => children.push(numPar(t)));
children.push(subH("Partie 3 — Correspondances"));
children.push(twoColTable("Colonne A", "Correspond à", [
  ["1. Fair-play", "b) Ensemble de comportements honnêtes et respectueux, au-delà du simple respect des règles"],
  ["2. Coopération", "a) Fait de travailler ensemble vers un objectif commun"],
  ["3. Sécurité", "d) Ensemble des règles et comportements qui protègent les élèves"],
  ["4. Réaction", "c) Capacité à observer un signal ou une trajectoire puis à répondre de manière adaptée"],
]));
children.push(spacer(120));
children.push(subH("Partie 4 — Situation-problème (éléments de réponse attendus)"));
[
  "Deux problèmes distincts attendus : (1) l’équipe reste regroupée autour du porteur du ballon, réduisant l’espace disponible ; (2) un joueur continue malgré une gêne inhabituelle sans le signaler.",
  "Décisions adaptées : occuper l’espace disponible pour le premier problème ; arrêter l’activité et prévenir l’enseignant pour le second.",
  "Signaler une gêne même légère permet de prévenir un problème plus grave et relève de la responsabilité individuelle, jamais d’un signe de faiblesse.",
].forEach((t, i) => children.push(numPar(`${i + 1}. ${t}`)));
children.push(subH("Partie 5 — Comparaison et justification (éléments de réponse attendus)"));
[
  "Dans les deux sports, transformer une récupération en action offensive suppose d’observer rapidement la situation, de se replacer ou de se démarquer, et de communiquer pour organiser une solution collective plutôt que d’agir seul.",
  "La sécurité protège les joueurs, le fair-play garantit le respect mutuel et des règles communes, la coopération permet la réussite collective : les trois s’appuient l’un sur l’autre pour qu’une pratique sportive scolaire reste à la fois sûre, respectueuse et efficace.",
].forEach((t, i) => children.push(numPar(`${i + 1}. ${t}`)));

const outPath = await buildAndSave(children, 168, "Manuel_EPS_9AF_CorrigeGeneral.docx");
console.log("Corrigé général (9e AF) genere:", outPath);
