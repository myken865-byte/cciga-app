// Manuel d'EEA 7e AF — Corrigé général (Phase Finale).
// Chaque reponse est derivee directement du texte reel des Chapitres 1 a 7
// (banques de mots, tableaux de classement, criteres d'activite tels
// qu'ecrits dans build-chapitreN.mjs). Aucune reponse n'est inventee ; les
// questions ouvertes (majoritairement les exercices C et D, propres au
// gabarit EEA) recoivent des "elements de reponse attendus" plutot qu'une
// reponse unique artificielle, conformement a la nature des productions
// artistiques/reflexives evaluees dans ce manuel.
import {
  bodyPar, sectionHeading, subHeading, numberedPar,
  spacer, pageBreak, twoColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, OUTREMER,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "CORRIGÉ GÉNÉRAL", bold: true, size: 44, color: OUTREMER, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ce corrigé regroupe les réponses des exercices des Chapitres 1 à 7 du Manuel d'EEA 7e AF. Il est réservé à " +
  "l'usage de l'enseignant et n'apparaît pas dans la partie élève. Pour les questions d'observation, " +
  "d'application ou d'analyse/expression liées à une production artistique, des éléments de réponse attendus " +
  "et des critères d'appréciation sont proposés plutôt qu'une réponse unique artificielle — cohérent avec la " +
  "nature créative de la discipline."
));
children.push(spacer(200));

function chapTitle(num, titre) {
  const out = [];
  out.push(pageBreak());
  out.push(sectionHeading(`Chapitre ${num} — ${titre}`));
  return out;
}
function exo(letter, label) {
  return subHeading(`Exercice ${letter} — ${label}`);
}

// ---------------------------------------------------------------------
// Chapitre 1 — Le point, la ligne et le regard
// ---------------------------------------------------------------------
children.push(...chapTitle(1, "Le point, la ligne et le regard"));
children.push(exo("A", "Connaissance/compréhension"));
["point", "ligne", "composition", "rythme visuel", "pointillisme"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(bodyPar(
  "Éléments de réponse attendus : grillage → lignes (croisées) ; ciel étoilé → points ; clôture en bois → " +
  "lignes (planches verticales) ; pluie fine → lignes fines (traits qui tombent) ; escalier → lignes " +
  "(marches répétées). La justification personnelle de l'élève pour l'un des cinq exemples est l'élément " +
  "principal évalué, pas uniquement le classement.",
));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Une ligne simple : fine et continue. Une ligne épaisse : large et continue. Une ligne pointillée : faite de petits segments espacés. (Production graphique de l'élève, à apprécier selon ces critères.)"));
children.push(numberedPar("2. La ligne amincie (dont l'épaisseur varie du début à la fin) : elle donne une impression de mouvement ou de vitesse."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. En s'approchant, on distingue les points individuels ; en s'éloignant, l'œil les fusionne en une image cohérente — c'est le principe du pointillisme."));
children.push(numberedPar("2. Une ligne courbe évoque le mouvement et la fluidité ; une ligne droite immobile évoque le calme et la stabilité."));
children.push(numberedPar("3. Réponse libre : tout thème cohérent avec un rythme de points/lignes est acceptable si justifié (ex. la pluie, une foule, un champ de canne à sucre)."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 2 — Formes, couleurs et premiers repères
// ---------------------------------------------------------------------
children.push(...chapTitle(2, "Formes, couleurs et premiers repères"));
children.push(exo("A", "Connaissance/compréhension"));
["forme géométrique", "forme naturelle", "décomposer", "composition", "harmonie"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(bodyPar(
  "Plutôt géométrique : ballon (sphère), fenêtre, brique. Plutôt naturel/biomorphique : caillou, nuage, " +
  "feuille de bananier.",
));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Production de l'élève : forme(s) simple(s) → ajout de détails → dessin final, en trois étapes visibles."));
children.push(numberedPar("2. Parce que cela permet de poser la structure générale avant les détails, évitant un résultat déséquilibré ou mal proportionné."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. Réponse argumentée : le mélange de formes géométriques et naturelles est souvent perçu comme plus vivant, car il combine régularité et spontanéité — l'élève doit justifier son choix."));
children.push(numberedPar("2. Les deux méthodes organisent une réalité complexe en formes simples et reconnaissables ; le cubisme le fait à des fins artistiques/expressives, le vève à des fins symboliques/rituelles."));
children.push(numberedPar("3. Réponse libre, cohérente avec un objet du quotidien de l'élève."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 3 — Sculpter, construire, recycler
// ---------------------------------------------------------------------
children.push(...chapTitle(3, "Sculpter, construire, recycler"));
children.push(exo("A", "Connaissance/compréhension"));
["volume", "sculpture", "modelage", "assemblage", "matériau de récupération"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation/classement"));
children.push(bodyPar(
  "Procédé soustractif : sculpter le bois, tailler la pierre. Procédé additif : modeler l'argile, assembler du " +
  "carton, couler du métal dans un moule.",
));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : pétrir la matière, façonner une forme de base simple, ajouter/lisser progressivement les détails."));
children.push(numberedPar("2. Pour s'assurer que la sculpture est équilibrée sous tous les angles et ne paraît pas déformée vue d'un côté non vérifié."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. Le modelage permet des formes organiques et progressives ; l'assemblage permet de combiner des matériaux variés et de recycler — l'élève doit justifier selon le résultat recherché."));
children.push(numberedPar("2. Réutiliser des matériaux évite le gaspillage et réduit les déchets, tout en offrant une contrainte créative intéressante (transformer un objet en autre chose)."));
children.push(numberedPar("3. Réponse libre, cohérente avec un objet recyclable réel."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 4 — Raconter le patrimoine en images
// ---------------------------------------------------------------------
children.push(...chapTitle(4, "Raconter le patrimoine en images"));
children.push(exo("A", "Connaissance/compréhension"));
["patrimoine immatériel", "conte", "proverbe", "caricature", "bande dessinée"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(bodyPar(
  "« Il tombe souvent dans le piège » → Bouki. « Il trouve toujours une astuce » → Malice. « Il se fait " +
  "surprendre facilement » → Bouki. « Il réfléchit avant d'agir » → Malice.",
));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Réponse libre décrivant une image cohérente avec le sens du proverbe choisi (ex. pour « Dèyè mòn gen mòn » : une silhouette qui franchit une montagne et en découvre une autre)."));
children.push(numberedPar("2. Découpage en 3 moments (début, problème/rebondissement, fin) — réponse libre cohérente avec l'histoire choisie."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. Plusieurs cases permettent de suivre une progression claire ; une seule image chargée peut être confuse et difficile à interpréter d'un coup d'œil."));
children.push(numberedPar("2. L'image fixe visuellement un récit oral, facilitant sa mémorisation et sa transmission à d'autres."));
children.push(numberedPar("3. Réponse libre, cohérente avec une tradition orale réelle connue de l'élève."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 5 — Comprendre et lire la musique
// ---------------------------------------------------------------------
children.push(...chapTitle(5, "Comprendre et lire la musique"));
children.push(exo("A", "Connaissance/compréhension"));
["portée", "clé de Sol", "gamme", "rythme", "solfier"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Do, Ré, Mi, Fa, Sol, La, Si (puis retour au Do, une octave plus haut)."));
children.push(numberedPar("2. La ronde dure le plus longtemps (4 temps) ; la croche dure le moins longtemps (une demi-temps)."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Rythme attendu : 1 temps, 1 temps, 2 temps, 1 temps (frappé ou noté en conséquence)."));
children.push(numberedPar("2. La note Sol se situe sur la deuxième ligne en partant du bas de la portée — c'est justement la ligne que traverse le tracé de la clé de Sol, qui indique sa position."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. La durée organise la musique dans le temps ; sans elle, même des notes justes produiraient un résultat confus ou méconnaissable."));
children.push(numberedPar("2. Conseiller de ralentir et de s'entraîner d'abord à frapper le rythme seul, avant de le combiner au chant des notes."));
children.push(numberedPar("3. Réponse libre : toute suite de 4 notes de la gamme est acceptable."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 6 — Jouer et interpréter
// ---------------------------------------------------------------------
children.push(...chapTitle(6, "Jouer et interpréter"));
children.push(exo("A", "Connaissance/compréhension"));
["flûte à bec", "doigté", "percussion", "interpréter", "improviser"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Souffler doucement et régulièrement ; couvrir complètement les trous indiqués ; ne pas mordre l'embouchure."));
children.push(numberedPar("2. Souffler trop fort (son qui « couine ») ; laisser un petit espace non couvert sur un trou."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Réponse libre : tout rythme simple combinant frappes et pauses est acceptable (ex. frappe-frappe-pause-frappe)."));
children.push(numberedPar("2. Pratiquer uniquement avec la voix et la percussion corporelle, sans flûte — le chapitre le prévoit explicitement."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. Interpréter s'appuie sur une pièce déjà écrite/apprise ; improviser crée sur le moment, sans préparation — l'élève choisit selon le contexte (répétition vs. jeu libre)."));
children.push(numberedPar("2. Conseiller de penser à ce que la pièce exprime (une émotion, une histoire) plutôt qu'à la seule exécution technique correcte."));
children.push(numberedPar("3. Réponse libre, cohérente avec une chanson ou un morceau réel connu de l'élève."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 7 — Créer et écouter avec le numérique
// ---------------------------------------------------------------------
children.push(...chapTitle(7, "Créer et écouter avec le numérique"));
children.push(exo("A", "Connaissance/compréhension"));
["MAO", "logiciel de notation", "panoramique", "écoute active", "classique universel"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Volume, panoramique, effet de balayage."));
children.push(numberedPar("2. Le tempo, l'ambiance générale, les instruments repérés, l'époque estimée (au moins deux attendus)."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Fiche d'écoute complétée de façon cohérente avec le titre/genre choisi par l'élève, même de façon imaginée."));
children.push(numberedPar("2. Réaliser l'activité entièrement sur une portée papier, en réutilisant les acquis du Chapitre 5 — le chapitre le prévoit explicitement comme alternative."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. Réponse personnelle : une œuvre lente peut apaiser, une œuvre rapide peut stimuler — l'élève doit décrire sa propre réaction, sans réponse unique imposée."));
children.push(numberedPar("2. Expliquer que le terme « classique » désigne une reconnaissance dans le temps, pas seulement l'ancienneté, et proposer une écoute ouverte avant de juger."));
children.push(numberedPar("3. Réponse libre, réflexive, portant sur l'ensemble du parcours de la 7e AF (dessin, sculpture, patrimoine, musique)."));
children.push(spacer(200));

await buildAndSave(
  children,
  71,
  "Manuel_EEA_7AF_CorrigeGeneral.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_7e_AF\\06_CORRIGE_GENERAL",
);
