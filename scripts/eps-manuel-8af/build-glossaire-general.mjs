// Glossaire général — Manuel d'EPS 8e AF (12 chapitres).
// Termes compilés à partir des listes "Vocabulaire essentiel" de chaque
// chapitre ; définitions reprises telles qu'exprimées dans le contenu
// réellement rédigé et validé (sections, exercices A-Compléter, C-Relier).
// Aucune définition inventée.
import {
  Paragraph, TextRun, bodyPar, sectionHeading, spacer, pageBreak, buildAndSave, FONT, NAVY, GREY_TEXT,
} from "./common.mjs";
import { HeadingLevel } from "docx";

const children = [];

children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Glossaire général EPS 8e AF", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Manuel d’EPS 8e Année Fondamentale — 2026-2027", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));
children.push(bodyPar(
  "Ce glossaire réunit, par ordre alphabétique, les termes du vocabulaire essentiel des douze chapitres du manuel. Chaque définition reprend le sens donné au terme dans le chapitre où il a été introduit (numéro indiqué entre parenthèses) ; aucun terme ni aucune définition n’a été ajouté en dehors du contenu réellement rédigé et validé."
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
  ["Accélération", "Augmentation progressive de la vitesse après le départ.", "chapitre 5"],
  ["Activité physique", "Toute forme de mouvement du corps — quotidien, jeu actif, séance d’EPS ou pratique sportive — contribuant à une vie active.", "chapitre 12"],
  ["Adaptation", "Fait de modifier sa réponse motrice selon la situation, ou de modifier un jeu pour l’ajuster à l’espace ou au nombre d’élèves.", "chapitres 1, 4, 11"],
  ["Ajustement", "Étape de la méthode observer-choisir-agir-ajuster qui consiste à évaluer si la réponse choisie a fonctionné, après avoir agi.", "chapitre 2"],
  ["Allure", "Rythme choisi et maintenu pendant une activité de durée (course, effort).", "chapitres 2, 3, 5"],
  ["Arbitrage", "Action d’observer le jeu, signaler et décider selon des règles communes.", "chapitre 11"],
  ["Autoévaluation", "Fait d’observer ses propres progrès à l’aide de critères simples ; ne sert jamais à comparer les élèves entre eux ni à juger l’apparence physique.", "chapitre 1"],
  ["Autonomie", "Capacité à agir de façon responsable sans attendre chaque consigne de l’enseignant.", "chapitres 1, 12"],
  ["Capacité (physique ou motrice)", "Ressource mobilisée pour agir efficacement dans une situation motrice.", "chapitre 2"],
  ["Cible", "But, panier ou espace à atteindre pour marquer.", "chapitre 7"],
  ["Communication", "Fait d’échanger des informations claires entre partenaires (par exemple annoncer sa disponibilité) pour mieux coordonner les actions collectives.", "chapitres 7, 9"],
  ["Conservation", "Fait de garder le ballon lorsqu’aucune solution sûre n’est disponible.", "chapitre 7"],
  ["Contrôle", "Maîtrise volontaire d’un geste, pour qu’il soit précis plutôt qu’approximatif.", "chapitre 1"],
  ["Coopération", "Fait de travailler ensemble, en communiquant, vers un objectif commun.", "chapitres 1, 8, 9, 11"],
  ["Coordination", "Organisation harmonieuse de plusieurs mouvements du corps.", "chapitres 1, 2, 6, 10"],
  ["Décélération", "Ralentissement progressif après la ligne d’arrivée.", "chapitre 5"],
  ["Défense", "Fait de se placer, rester vigilant et protéger un espace ou une cible sans contact dangereux.", "chapitres 7, 8"],
  ["Démarquage", "Action de se déplacer pour devenir disponible pour un partenaire.", "chapitres 7, 8"],
  ["Départ", "Moment où la course commence, à partir d’un signal donné par l’enseignant, suivi de premières foulées contrôlées.", "chapitre 5"],
  ["Diagnostic (pédagogique)", "Observation et description pédagogique d’une situation, sans interprétation médicale.", "chapitre 4"],
  ["Dribble", "Fait de se déplacer avec le ballon en le faisant rebondir au sol.", "chapitre 8"],
  ["Échange", "Suite d’actions qui permet de garder le ballon en jeu entre les deux équipes.", "chapitre 9"],
  ["Effort (physique)", "Mobilisation du corps pour réaliser une activité physique.", "chapitre 3"],
  ["Élan", "Préparation qui permet de se placer ou de prendre un peu de vitesse avant un saut.", "chapitre 6"],
  ["Enchaînement", "Suite organisée de plusieurs actions, avec un début, des transitions et une fin.", "chapitre 10"],
  ["Endurance", "Capacité à poursuivre un effort adapté pendant une certaine durée, en gérant son rythme.", "chapitre 2"],
  ["Équilibre", "Capacité à maintenir ou retrouver une position stable.", "chapitres 1, 10"],
  ["Équité", "Fait de donner à chaque élève une possibilité réelle de participer.", "chapitre 11"],
  ["Espace", "Zone du terrain occupée ou à occuper par les joueurs ; une équipe bien répartie dans l’espace multiplie ses solutions de jeu.", "chapitres 7, 8"],
  ["Espacement", "Répartition des joueurs dans l’espace pour offrir plusieurs solutions de passe.", "chapitre 8"],
  ["Expression (corporelle)", "Fait de communiquer une intention à travers les gestes et la posture.", "chapitre 10"],
  ["Fair-play", "Ensemble de comportements respectueux envers adversaires, partenaires, arbitre et règles, dans la victoire comme dans la défaite.", "chapitres 7, 8, 9, 11"],
  ["Force adaptée", "Capacité à produire ou contrôler une action musculaire adaptée à une tâche, sans charge lourde ni recherche de puissance maximale.", "chapitre 2"],
  ["Foulée", "Pas effectué en courant, notamment pendant une phase d’accélération.", "chapitre 5"],
  ["Fréquence cardiaque / Pouls", "Nombre de battements du cœur pendant une durée donnée.", "chapitre 3"],
  ["Hydratation", "Fait de boire régulièrement pour compenser la perte d’eau.", "chapitre 12"],
  ["Hygiène de vie", "Ensemble d’habitudes favorables au bien-être : activité physique, repos, sommeil, hydratation, alimentation variée et hygiène corporelle.", "chapitre 12"],
  ["Impartialité", "Fait d’appliquer la même règle à tous, sans favoriser personne.", "chapitre 11"],
  ["Impulsion", "Action qui permet de quitter le sol pour réaliser un saut.", "chapitre 6"],
  ["Intensité", "Quantité d’effort demandée par une activité.", "chapitre 3"],
  ["Manchette", "Réception basse scolaire construite avec les avant-bras réunis, un placement stable et un contrôle du geste.", "chapitre 9"],
  ["Mesure", "Fait d’évaluer un essai à l’aide d’un ruban ou de repères gradués.", "chapitre 6"],
  ["Mobilité", "Fait de réaliser un mouvement articulaire simple sans forcer l’amplitude.", "chapitre 2"],
  ["Objectif", "Résultat clair et observable que l’on cherche à atteindre.", "chapitre 12"],
  ["Orientation", "Direction et niveau utilisés dans l’espace.", "chapitre 10"],
  ["Panier", "But visé au basket-ball ; y faire entrer le ballon permet de marquer un point.", "chapitre 8"],
  ["Partenaire", "Coéquipier avec lequel un joueur coopère pendant un jeu collectif.", "chapitres 7, 8, 9"],
  ["Passe", "Fait d’envoyer le ballon à un partenaire pour qu’il le reçoive.", "chapitres 7, 8, 9"],
  ["Passe haute", "Geste réalisé avec les mains, au-dessus du visage, qui oriente le ballon vers un partenaire.", "chapitre 9"],
  ["Planification", "Organisation à l’avance du moment, du lieu et des conditions d’une activité.", "chapitre 12"],
  ["Posture", "Alignement et organisation des parties du corps.", "chapitre 1"],
  ["Précision", "Fait de viser une cible précise plutôt que de rechercher la distance.", "chapitre 6"],
  ["Progression", "Action de progresser vers la cible grâce à une passe ou un déplacement (chapitre 7) ; amélioration observable de sa pratique dans le temps (chapitre 12).", "chapitres 7, 12"],
  ["Progressivité", "Augmentation graduelle de l’intensité, sans forcer brutalement.", "chapitre 4"],
  ["Récupération", "Retour progressif du corps ou de l’organisme vers un état plus calme après l’effort.", "chapitres 3, 4, 5, 12"],
  ["Régularité", "Fait de pratiquer une activité de façon constante dans le temps.", "chapitre 12"],
  ["Règle", "Énoncé clair qui organise un jeu et le rend compréhensible par tous.", "chapitre 11"],
  ["Relais", "Course d’équipe où un témoin est transmis d’un coureur à l’autre.", "chapitre 5"],
  ["Renvoi", "Action qui envoie le ballon vers l’adversaire, après réception et passe.", "chapitre 9"],
  ["Réception", "Retour équilibré au sol après un saut (chapitre 6) ; premier contact contrôlé avec un ballon adverse (chapitre 9).", "chapitres 6, 9"],
  ["Replacement", "Changement rapide de position après une perte ou une récupération du ballon.", "chapitres 8, 9"],
  ["Responsabilité", "Fait de respecter les autres, le matériel et les espaces de pratique.", "chapitre 1"],
  ["Responsabilité collective", "Fait de contribuer à la sécurité de tous en signalant un danger.", "chapitre 4"],
  ["Rythme", "Variation de vitesse, de pauses et d’accents dans un mouvement.", "chapitre 10"],
  ["Sécurité", "Ensemble des règles et comportements qui protègent les élèves.", "tous les chapitres"],
  ["Sensations", "Indicateurs personnels comme la fatigue ressentie ou la facilité à parler pendant l’effort.", "chapitre 3"],
  ["Service", "Geste qui met le ballon en jeu depuis l’arrière du terrain.", "chapitre 9"],
  ["Signal", "Geste ou consigne qui indique le début ou la fin d’une action.", "chapitres 4, 5"],
  ["Souplesse", "Capacité à réaliser certains mouvements avec une amplitude adaptée.", "chapitre 2"],
  ["Spécificité", "Fait, pour une préparation, de se rapprocher des gestes de l’activité principale à venir.", "chapitre 4"],
  ["Trajectoire", "Chemin suivi par un objet lancé, par un ballon ou par un coureur.", "chapitres 5, 6, 9"],
  ["Transition", "Passage organisé entre deux éléments d’un enchaînement.", "chapitre 10"],
  ["Transmission", "Moment où le témoin passe d’un coureur à l’autre, dans un relais.", "chapitre 5"],
  ["Vitesse", "Capacité à réaliser une action rapidement dans une situation donnée.", "chapitre 2"],
  ["Zone", "Portion délimitée du terrain, utile pour organiser les joueurs.", "chapitres 5, 6, 9"],
  ["Zone d’action", "Espace où se déroule l’activité elle-même, distinct de la zone d’attente et de la zone interdite.", "chapitre 4"],
  ["Zone d’attente", "Endroit où les élèves attendent leur tour avant une activité.", "chapitre 4"],
  ["Zone de chute", "Zone où personne ne doit se trouver pendant un lancer.", "chapitre 6"],
  ["Zone de transmission", "Zone où le témoin passe d’un coureur à l’autre.", "chapitre 5"],
  ["Zone interdite", "Espace où personne ne doit se trouver pendant une action précise.", "chapitres 4, 6"],
];

glossary.forEach(([term, def, chap]) => children.push(entry(term, def, chap)));

const outPath = await buildAndSave(children, 192, "Manuel_EPS_8AF_Glossaire.docx");
console.log("Glossaire general (8e AF) genere:", outPath);
