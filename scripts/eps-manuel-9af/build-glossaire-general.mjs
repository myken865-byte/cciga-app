// Glossaire general — Manuel d'EPS 9e AF (12 chapitres).
// Termes compiles a partir des exercices A-Completer et C-Relier et du
// contenu reellement redige dans chaque chapitre ; definitions reprises
// telles qu'exprimees dans le corps du manuel. Aucun terme ni definition
// invente.
import {
  Paragraph, TextRun, bodyPar, sectionHeading, spacer, buildAndSave, FONT, NAVY, GREY_TEXT,
} from "./common.mjs";
import { HeadingLevel } from "docx";

const children = [];

children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Glossaire général EPS 9e AF", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Manuel d’EPS 9e Année Fondamentale — 2026-2027", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));
children.push(bodyPar(
  "Ce glossaire réunit, par ordre alphabétique, les termes réellement employés dans les douze chapitres du manuel (exercices A-Compléter, C-Relier et corps de texte). Chaque définition reprend le sens donné au terme dans le ou les chapitres où il apparaît (numéro indiqué entre parenthèses) ; aucun terme ni aucune définition n’a été ajouté en dehors du contenu réellement rédigé et validé."
));
children.push(spacer(200));

function entry(term, def, chap) {
  return new Paragraph({
    spacing: { after: 140 },
    children: [
      new TextRun({ text: `${term}. `, font: FONT, size: 24, bold: true, color: NAVY }),
      new TextRun({ text: `${def} `, font: FONT, size: 24 }),
      new TextRun({ text: `(${chap})`, font: FONT, size: 22, italics: true, color: GREY_TEXT }),
    ],
  });
}

const glossary = [
  ["Adaptation", "Fait de modifier une activité, un geste ou un comportement selon la situation.", "chapitres 9, 11"],
  ["Agilité", "Capacité à modifier efficacement son déplacement ou son action selon la situation.", "chapitre 2"],
  ["Ajustement", "Fait de modifier son action après l’avoir observée et analysée.", "chapitres 1, 2"],
  ["Arbitre / Arbitrage", "Personne qui observe le jeu, signale et décide selon des règles communes ; action de mener cette observation et cette décision.", "chapitres 3, 4, 5, 6, 8, 10, 12"],
  ["Autonomie", "Capacité à agir de manière responsable sans attendre chaque consigne, en respectant les règles et la sécurité.", "chapitre 1"],
  ["Autoévaluation", "Démarche par laquelle l’élève observe ses propres progrès et difficultés, sans se comparer aux autres.", "chapitres 1, 12"],
  ["Beach-volley", "Forme du volleyball pratiquée sur sable, avec un nombre réduit de joueurs par équipe.", "chapitre 7"],
  ["Chronologie", "Mise en ordre d’événements selon leur date, permettant d’observer continuité et changement.", "chapitre 3"],
  ["Codification", "Fait d’établir des règles communes permettant d’organiser rencontres et compétitions.", "chapitre 3"],
  ["Communication", "Fait d’échanger des informations claires entre partenaires pour mieux coordonner leurs actions.", "chapitres 8, 12"],
  ["Compétence", "Capacité à mobiliser des connaissances, des gestes, des méthodes et des comportements dans une situation donnée.", "chapitre 1"],
  ["Compétition internationale", "Rencontre organisée entre équipes de différents pays, contribuant à la reconnaissance mondiale d’un sport.", "chapitre 7"],
  ["Contrôle", "Fait de recevoir le ballon de façon à faciliter l’action suivante.", "chapitre 4"],
  ["Coopération", "Fait de travailler ensemble, communiquer et s’entraider pour progresser collectivement.", "chapitres 1, 5, 7, 8, 12"],
  ["Coordination", "Capacité à organiser efficacement plusieurs mouvements ou actions corporelles en même temps.", "chapitres 2, 9, 12"],
  ["Corner", "Coup de pied de coin accordé à l’attaque quand le ballon sort par la ligne de but après avoir touché un défenseur en dernier.", "chapitre 4"],
  ["Culture sportive", "Ensemble des repères identitaires, des médias et des pratiques sociales autour d’un sport.", "chapitres 5, 7"],
  ["Décision", "Fait de choisir une action après avoir observé une situation.", "chapitres 4, 6, 10, 12"],
  ["Démarquage", "Action de se déplacer pour devenir disponible pour un partenaire.", "chapitres 4, 6"],
  ["Diffusion", "Fait, pour une pratique sportive, de se répandre et de devenir largement pratiquée dans différents pays.", "chapitre 3"],
  ["Dribble", "Fait de faire rebondir le ballon au sol tout en se déplaçant, en le contrôlant.", "chapitre 6"],
  ["Échauffement", "Préparation progressive du corps avant l’activité principale.", "chapitre 11"],
  ["Effort", "Mobilisation du corps pour réaliser une activité physique.", "chapitres 2, 11"],
  ["Endurance", "Capacité à poursuivre un effort adapté en gérant son rythme et sa récupération.", "chapitres 2, 9"],
  ["Équilibre", "Capacité à maintenir ou retrouver une position ou une posture contrôlée.", "chapitres 2, 9"],
  ["Espace", "Zone du terrain libre ou occupée par les joueurs, à utiliser ou à protéger.", "chapitres 4, 6"],
  ["Évolution (du jeu)", "Transformation progressive du matériel, des règles et de l’organisation d’un sport dans le temps.", "chapitres 5, 7"],
  ["Fair-play", "Ensemble de comportements honnêtes et respectueux envers partenaires, adversaires et arbitre, au-delà du simple respect des règles.", "chapitres 1, 3, 4, 5, 6, 7, 8, 10, 12"],
  ["Fait historique", "Information vérifiable, appuyée par des sources fiables et recoupées.", "chapitre 3"],
  ["FIBA", "Fédération internationale qui organise le basketball à l’échelle mondiale, fondée en 1932.", "chapitre 5"],
  ["FIVB", "Fédération internationale qui organise le volleyball à l’échelle mondiale, fondée en 1947.", "chapitre 7"],
  ["Filet", "Élément qui sépare les deux équipes sur le terrain de volleyball.", "chapitres 7, 8"],
  ["Force adaptée", "Ressource utile pour stabiliser, pousser, sauter ou lancer, dans des tâches scolaires sûres.", "chapitre 9"],
  ["Histoire (du sport)", "Étude des faits vérifiés du passé, à distinguer d’une simple anecdote.", "chapitre 7"],
  ["Hydratation", "Fait de boire régulièrement pour compenser la perte d’eau.", "chapitre 11"],
  ["Impartialité", "Fait d’appliquer la même règle à tous, sans favoriser personne.", "chapitre 10"],
  ["Inspection (de l’espace)", "Vérification du sol, du matériel et de l’espace avant une activité.", "chapitre 11"],
  ["International", "Caractère d’un sport diffusé et pratiqué dans de nombreux pays.", "chapitres 5, 7"],
  ["Jeux olympiques", "Compétition qui a contribué à la visibilité internationale de plusieurs sports, dont le basketball et le volleyball.", "chapitres 5, 7"],
  ["Manchette", "Geste défensif réalisé avec les avant-bras pour contrôler un ballon bas, au volleyball.", "chapitre 8"],
  ["Mémoire (sportive)", "Ce qu’une communauté transmet d’une génération à l’autre à propos d’un événement ou d’une pratique.", "chapitre 3"],
  ["Mintonette", "Premier nom donné au jeu à l’origine du volleyball par son créateur, avant qu’il ne soit renommé.", "chapitre 7"],
  ["Mobilité", "Amplitude fonctionnelle nécessaire à certains mouvements, sans amplitude extrême.", "chapitre 9"],
  ["Naismith (James)", "Éducateur physique qui a inventé le basketball en 1891, à Springfield (États-Unis).", "chapitre 5"],
  ["Observation", "Fait de regarder attentivement une situation avant d’agir.", "chapitres 2, 10, 11"],
  ["Occupation de l’espace", "Répartition des joueurs sur le terrain pour multiplier les solutions de jeu.", "chapitre 12"],
  ["Opinion", "Jugement personnel qui peut varier d’une personne à l’autre, non vérifiable comme un fait.", "chapitre 3"],
  ["Orientation", "Capacité à se situer par rapport au ballon, aux partenaires et aux espaces disponibles.", "chapitre 9"],
  ["Passe", "Action d’envoyer le ballon à un partenaire pour qu’il le reçoive.", "chapitres 4, 6"],
  ["Passe haute", "Geste réalisé avec les mains, au-dessus de la tête, qui oriente le ballon vers un partenaire, au volleyball.", "chapitre 8"],
  ["Patrimoine (sportif)", "Ensemble des repères, événements et mémoires qu’une société conserve autour d’un sport.", "chapitre 3"],
  ["Précision", "Capacité à adapter un geste ou un mouvement à une cible ou à un objectif précis.", "chapitres 2, 4, 9"],
  ["Réaction", "Capacité à observer un signal ou une trajectoire puis à répondre de manière adaptée.", "chapitre 9"],
  ["Réception", "Fait de recevoir le ballon en préparant l’action suivante.", "chapitre 6"],
  ["Récupération", "Retour progressif de l’organisme vers un état plus calme après l’effort.", "chapitres 11, 12"],
  ["Repère (historique)", "Événement marquant que l’on retient comme particulièrement important dans une histoire.", "chapitre 3"],
  ["Repos", "Temps consacré au sommeil et à la récupération quotidienne.", "chapitre 11"],
  ["Replacement", "Fait de revenir rapidement à une position utile après une perte ou une récupération du ballon.", "chapitres 4, 6, 8"],
  ["Respect", "Considération que l’on porte aux autres, à leurs différences et aux règles communes.", "chapitre 10"],
  ["Responsabilité", "Fait d’assumer les conséquences de ses choix et de son comportement, individuellement ou collectivement.", "chapitres 1, 10, 11"],
  ["Risque", "Possibilité qu’un événement indésirable ou dangereux se produise.", "chapitre 11"],
  ["Rotation", "Changement de position des joueurs dans le sens des aiguilles d’une montre, à chaque reprise du service, au volleyball.", "chapitre 8"],
  ["Règle", "Énoncé clair qui organise un jeu et le rend compréhensible par tous.", "chapitres 3, 5, 10"],
  ["Sécurité", "Ensemble des règles et comportements qui protègent les élèves.", "tous les chapitres"],
  ["Service", "Geste qui met le ballon en jeu depuis l’arrière du terrain, au volleyball.", "chapitre 8"],
  ["Soutien", "Fait de se placer pour offrir une solution supplémentaire à un partenaire porteur du ballon.", "chapitre 4"],
  ["Source historique", "Origine vérifiable d’une information, permettant de distinguer un fait d’une simple affirmation.", "chapitre 7"],
  ["Tir", "Action d’envoyer le ballon vers le panier (basketball) ou le but (football) pour marquer.", "chapitres 4, 6"],
  ["Touche", "Remise en jeu du ballon depuis la ligne de touche, au football, après qu’il l’ait entièrement franchie.", "chapitre 4"],
  ["Trajectoire", "Chemin suivi par le ballon dans les airs.", "chapitre 8"],
  ["Transfert (des apprentissages)", "Fait de réutiliser un principe appris dans un sport pour progresser dans un autre.", "chapitre 12"],
  ["Vitesse", "Capacité à réaliser une action rapidement dans une situation donnée.", "chapitres 2, 9"],
];

glossary.forEach(([term, def, chap]) => children.push(entry(term, def, chap)));

const outPath = await buildAndSave(children, 195, "Manuel_EPS_9AF_Glossaire.docx");
console.log("Glossaire general (9e AF) genere:", outPath);
