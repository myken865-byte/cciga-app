// Manuel d'EPS 7e AF — Phase Finale : Corrigé général des exercices.
//
// Structure reprise à l'identique de Manuel_EPS_8AF_CorrigeGeneral.docx
// (déjà validé) : par chapitre, A. Compléter (réponses exactes), B. QCM
// (bonne réponse + justification courte), C. Relier (correspondances),
// D. Questions de réflexion (éléments de réponse attendus, critères
// d'évaluation plutôt que réponse imposée). Chaque réponse dérive
// exclusivement des exercices réellement rédigés dans les 10 chapitres
// (scripts build-chapitre4.mjs à 10.mjs relus intégralement ; Chapitres
// 1-3 relus directement dans les fichiers .docx canoniques, faute de
// script de génération disponible pour ces trois chapitres).
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, twoColTable, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  NAVY, TEAL, GOLD,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text: "Corrigé général des exercices", bold: true, color: NAVY, size: 40 })],
}));
children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Manuel d'EPS 7e Année Fondamentale — 2026-2027", italics: true, color: TEAL, size: 26 })],
}));
children.push(bodyPar(
  "Ce corrigé rassemble les réponses des exercices A (Compléter), B (QCM) et C (Relier) des dix chapitres du " +
  "manuel, ainsi que des éléments de réponse attendus pour les questions D (réflexion). Toutes les réponses " +
  "ont été établies à partir du contenu réellement rédigé de chaque chapitre ; aucune réponse n'a été " +
  "inventée. Les questions de réflexion, par nature ouvertes, sont accompagnées de critères d'évaluation " +
  "plutôt que d'une réponse imposée.",
));
children.push(spacer(240));

function chap(num, titre) {
  children.push(pageBreak());
  children.push(sectionHeading(`Chapitre ${num} — `, ""));
  children.push(new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: titre, bold: true, color: NAVY, size: 28 })],
  }));
}
function abc(label) { children.push(subHeading(label)); }
function rep(text) { children.push(numberedPar(text)); }
function relier(rows) {
  children.push(twoColTable("Colonne A", "Correspond à", rows));
}

// =======================================================================
chap(1, "Comprendre l'éducation physique et sportive");

abc("A. Compléter — réponses");
rep("1. activité physique");
rep("2. sport");
rep("3. EPS");
rep("4. discipline");
rep("5. fair-play");
rep("6. coopération");
rep("7. sécurité");
rep("8. respect");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) une matière scolaire avec des objectifs éducatifs précis");
rep("2. c) balayer la cour de l'école");
rep("3. d) objectif financier — ce n'est pas un objectif de l'EPS.");
rep("4. b) le fair-play");
rep("5. b) le signaler immédiatement au professeur");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Fair-play", "b) Jouer honnêtement et respecter l'adversaire"],
  ["2. Activité physique", "a) Mouvement du corps qui fait travailler les muscles"],
  ["3. Discipline", "d) Suivre les consignes et respecter les règles du groupe"],
  ["4. EPS", "c) Matière scolaire structurée avec des objectifs éducatifs"],
  ["5. Coopération", "e) Travailler ensemble pour atteindre un but commun"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Le sport est une activité organisée et souvent compétitive ; l'EPS est une matière scolaire aux objectifs éducatifs (moteur, cognitif, social, personnel), qui peut utiliser le sport comme moyen, pas comme fin en soi.");
rep("2. Le matériel limité doit servir à tous les élèves sur plusieurs années : l'abîmer prive les camarades et les classes suivantes de son usage.");
rep("3. Exemple concret et réaliste, tiré de l'expérience personnelle de l'élève, illustrant clairement le fair-play ou la coopération.");
rep("4. Risque accru de blessures ; réponse cohérente reliant sécurité individuelle et collective.");
children.push(spacer(240));

// =======================================================================
chap(2, "Le corps humain et le mouvement");

abc("A. Compléter — réponses");
rep("1. squelette");
rep("2. articulation");
rep("3. muscles");
rep("4. contraction");
rep("5. cœur");
rep("6. poumons");
rep("7. respiration");
rep("8. circulation");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) le crâne");
rep("2. c) le genou");
rep("3. b) il se raccourcit et devient plus dur");
rep("4. a) pour envoyer plus de sang et d'oxygène aux muscles");
rep("5. c) arrêter l'activité et prévenir immédiatement l'enseignant");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Squelette", "b) Ensemble des os qui soutiennent et protègent le corps"],
  ["2. Genou", "c) Articulation très sollicitée pendant la course et le saut"],
  ["3. Cœur", "a) Muscle qui pompe le sang dans le corps"],
  ["4. Poumons", "d) Permettent à l'oxygène de l'air de passer dans le sang"],
  ["5. Transpiration", "e) Réaction du corps qui aide à se refroidir pendant l'effort"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Les muscles ont besoin de plus d'oxygène pendant l'effort ; la respiration s'accélère pour en apporter davantage au sang.");
rep("2. Connaître ses articulations aide à comprendre leurs limites et à éviter les mouvements qui pourraient les blesser.");
rep("3. Ordre attendu : début du mouvement → muscles sollicités → besoin accru d'oxygène → accélération du cœur et de la respiration.");
rep("4. Arrêter l'activité et prévenir immédiatement l'enseignant — une douleur à la poitrine est un signal à ne jamais ignorer.");
children.push(spacer(240));

// =======================================================================
chap(3, "Santé, hygiène, hydratation et récupération");

abc("A. Compléter — réponses");
rep("1. activité physique");
rep("2. hygiène");
rep("3. eau");
rep("4. hydratation");
rep("5. alimentation");
rep("6. sommeil");
rep("7. récupération");
rep("8. sédentarité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) parce qu'il perd de l'eau en transpirant");
rep("2. b) l'eau");
rep("3. c) avoir une alimentation variée et adaptée à ses besoins");
rep("4. c) de la fatigue et des difficultés de concentration");
rep("5. b) le fait de passer beaucoup de temps sans bouger");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Hydratation", "c) Fait de boire régulièrement pour compenser la perte d'eau"],
  ["2. Sédentarité", "b) Fait de passer beaucoup de temps sans bouger"],
  ["3. Récupération", "d) Retour progressif du corps au calme après un effort"],
  ["4. Hygiène", "a) Ensemble des gestes qui permettent de garder son corps propre"],
  ["5. Sommeil", "e) Moment où le corps et l'esprit se réparent et récupèrent"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. La chaleur augmente la transpiration, donc la perte d'eau ; boire régulièrement compense cette perte et évite la déshydratation.");
rep("2. Réponse reliant manque de sommeil à fatigue, difficulté de concentration et moindre performance scolaire/sportive.");
rep("3. Deux exemples concrets et réalistes adaptés au contexte haïtien (ex. marcher plutôt que rester assis, jouer activement pendant la récréation).");
rep("4. La variété respecte tous les corps et évite de stigmatiser un élève selon son poids ou son apparence — l'objectif est le bien-être, pas un modèle physique unique.");
children.push(spacer(240));

// =======================================================================
chap(4, "Échauffement, sécurité et prévention");

abc("A. Compléter — réponses");
rep("1. échauffement");
rep("2. articulations");
rep("3. terrain");
rep("4. matériel");
rep("5. progressivement");
rep("6. enseignant");
rep("7. récupération");
rep("8. sécurité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) une préparation progressive du corps et de l'esprit avant l'activité principale");
rep("2. d) mobilisation → préparation spécifique → activation → mise en mouvement — ordre progressif conforme à la méthode du chapitre.");
rep("3. b) l'état du terrain et la présence d'objets dangereux");
rep("4. c) arrêter l'activité et prévenir immédiatement l'enseignant");
rep("5. b) parce que cela peut blesser gravement cette personne");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Échauffement", "e) Préparation progressive du corps et de l'esprit avant l'activité principale"],
  ["2. Mobilisation", "a) Mouvement des articulations pour les préparer à l'effort"],
  ["3. Sécurité", "b) Ensemble des règles et comportements qui protègent les élèves"],
  ["4. Retour au calme", "c) Diminution progressive de l'intensité après l'effort, avec hydratation et repos"],
  ["5. Matériel", "d) Ballons, cônes, cordes et autres objets utilisés pendant la séance, qui doivent être vérifiés avant usage"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Signaler le danger à l'enseignant avant de commencer, pour éviter une chute ou une blessure.");
rep("2. Un départ anticipé peut provoquer des collisions ou des chutes ; le signal garantit que tous les élèves sont prêts et attentifs.");
rep("3. Comparaison cohérente : l'échauffement avant un match sollicite davantage les jambes et le cardio ; avant la gymnastique, davantage les articulations et l'équilibre.");
rep("4. La sécurité de chacun dépend du comportement de tous — un geste imprudent peut blesser un camarade, pas seulement soi-même.");
children.push(spacer(240));

// =======================================================================
chap(5, "Initiation au basket-ball : techniques, règles et coopération");

abc("A. Compléter — réponses");
rep("1. équipe");
rep("2. dribble");
rep("3. passe");
rep("4. réception");
rep("5. terrain");
rep("6. panier");
rep("7. coopération");
rep("8. sécurité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) marquer dans le panier adverse tout en protégeant son propre panier");
rep("2. c) contrôler le ballon avec une poussée souple et observer le jeu");
rep("3. b) se déplacer vers un espace libre pour se rendre disponible");
rep("4. b) pour faciliter l'apprentissage au niveau scolaire");
rep("5. b) arrêter l'activité et prévenir immédiatement l'enseignant");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Dribble", "c) Faire rebondir le ballon au sol pour se déplacer en le contrôlant"],
  ["2. Passe", "f) Envoyer le ballon à un partenaire"],
  ["3. Réception", "e) Regarder le ballon, préparer les mains et amortir son arrivée"],
  ["4. Tir", "b) Geste qui envoie le ballon vers le panier pour marquer"],
  ["5. Démarquage", "a) Se déplacer vers un espace libre pour se rendre disponible"],
  ["6. Fair-play", "d) Respecter l'adversaire, l'arbitre et les partenaires"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Garder toujours le ballon empêche le jeu collectif ; solution : encourager explicitement les passes et valoriser le jeu d'équipe.");
rep("2. Se démarquer crée une option de passe supplémentaire pour le partenaire qui a le ballon, même sans le toucher soi-même.");
rep("3. Les règles simplifiées restent accessibles à des débutants tout en gardant l'esprit du jeu réel.");
rep("4. Deux comportements concrets parmi : féliciter un adversaire, ne pas contester une décision, encourager un partenaire en difficulté.");
children.push(spacer(240));

// =======================================================================
chap(6, "Athlétisme : courir, sauter et lancer");

abc("A. Compléter — réponses");
rep("1. course");
rep("2. allure");
rep("3. relais");
rep("4. impulsion");
rep("5. réception");
rep("6. lancer");
rep("7. trajectoire");
rep("8. sécurité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) courir, sauter, lancer");
rep("2. b) gérer son allure pour répartir son effort");
rep("3. c) la réception");
rep("4. c) des objets pédagogiques légers et sûrs");
rep("5. b) uniquement lorsque l'enseignant l'autorise");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Course rapide", "d) Course avec départ, accélération et ralentissement après l'arrivée"],
  ["2. Allure", "a) Répartir son effort sur une distance plus longue"],
  ["3. Relais", "e) Transmission d'un témoin entre partenaires dans une zone prévue"],
  ["4. Impulsion", "b) Moment où l'on pousse sur le sol pour décoller pendant un saut"],
  ["5. Réception", "f) Retomber au sol de façon équilibrée après un saut"],
  ["6. Lancer de précision", "c) Viser une cible avec un objet léger et contrôlé"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Pour éviter qu'un objet en vol ne blesse quelqu'un entrant trop tôt dans la zone.");
rep("2. Partir trop vite épuise l'énergie avant la fin de la course, rendant la fin plus difficile ou dangereuse.");
rep("3. Organisation cohérente : zones espacées, sens de saut unique, élèves attendant leur tour à distance de sécurité.");
rep("4. Une mauvaise réception peut causer une entorse ou une chute ; une réception équilibrée protège les articulations.");
children.push(spacer(240));

// =======================================================================
chap(7, "Football scolaire : technique, règles et coopération");

abc("A. Compléter — réponses");
rep("1. équipe");
rep("2. ballon ; contrôle");
rep("3. passe");
rep("4. tir");
rep("5. démarquage");
rep("6. défense");
rep("7. sécurité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) marquer dans le but adverse tout en protégeant son propre but");
rep("2. b) la précision, avant la puissance");
rep("3. b) se déplacer vers un espace libre pour se rendre disponible");
rep("4. b) protéger le but, observer, communiquer et relancer le jeu");
rep("5. b) arrêter l'activité et prévenir immédiatement l'enseignant");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Conduite", "c) Déplacer le ballon avec de petites touches en gardant le contrôle"],
  ["2. Contrôle", "e) Recevoir et maîtriser le ballon avant l'action suivante"],
  ["3. Passe", "g) Envoyer le ballon à un partenaire"],
  ["4. Tir", "a) Envoyer le ballon vers le but pour marquer"],
  ["5. Démarquage", "f) Se déplacer vers un espace libre pour se rendre disponible"],
  ["6. Défense", "b) Protéger son but et gêner la progression de l'adversaire"],
  ["7. Fair-play", "d) Respecter l'adversaire, l'arbitre et les partenaires"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Garder toujours le ballon prive l'équipe d'options de jeu ; solution : encourager la passe vers un partenaire démarqué.");
rep("2. Se démarquer crée une option supplémentaire pour le porteur du ballon, même sans le toucher immédiatement.");
rep("3. Geste dangereux et contraire au fair-play ; l'enseignant devrait arrêter le jeu et rappeler la règle de respect de l'adversaire.");
rep("4. Signaler l'obstacle à l'enseignant avant de jouer, pour éviter une chute ou une blessure.");
children.push(spacer(240));

// =======================================================================
chap(8, "Volley-ball : techniques de base, règles et coopération");

abc("A. Compléter — réponses");
rep("1. filet");
rep("2. trajectoire");
rep("3. manchette");
rep("4. passe");
rep("5. service");
rep("6. équipe");
rep("7. coopération");
rep("8. sécurité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) envoyer le ballon dans l'espace adverse sans le laisser tomber dans le sien");
rep("2. b) pour contrôler un ballon qui arrive bas");
rep("3. b) la régularité, la direction et le contrôle");
rep("4. b) pour éviter les collisions et bien communiquer avec ses partenaires");
rep("5. c) le signaler immédiatement à l'enseignant avant de jouer");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Manchette", "e) Technique qui contrôle un ballon bas avec les avant-bras"],
  ["2. Passe haute", "f) Geste qui envoie le ballon vers un partenaire ou par-dessus le filet"],
  ["3. Service", "g) Geste qui met le ballon en jeu depuis l'arrière du terrain"],
  ["4. Filet", "a) Sépare le terrain en deux espaces, un par équipe"],
  ["5. Trajectoire", "b) Chemin suivi par le ballon dans les airs"],
  ["6. Coopération", "c) Travailler ensemble en communiquant pour maintenir le ballon en jeu"],
  ["7. Sécurité", "d) Ensemble des règles et comportements qui protègent les élèves pendant l'activité"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Communiquer évite que deux joueurs se percutent en visant le même ballon et clarifie qui joue.");
rep("2. Signaler immédiatement l'instabilité à l'enseignant avant de continuer à jouer.");
rep("3. Attendre immobile réduit les chances d'atteindre le ballon à temps et dans une bonne position ; se déplacer permet un meilleur contrôle.");
rep("4. Les trois touches obligent les joueurs à se relayer, ce qui encourage le jeu collectif plutôt qu'individuel.");
children.push(spacer(240));

// =======================================================================
chap(9, "Gymnastique : équilibre, coordination et maîtrise du corps");

abc("A. Compléter — réponses");
rep("1. appui");
rep("2. équilibre");
rep("3. coordination");
rep("4. réception");
rep("5. enchaînement");
rep("6. espace");
rep("7. posture");
rep("8. sécurité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) la maîtrise et la sécurité");
rep("2. b) un point de contact entre le corps et le sol");
rep("3. b) s'assurer que l'enseignant, le matériel et l'espace permettent une pratique sécurisée");
rep("4. c) son apparence physique ou sa morphologie");
rep("5. b) arrêter l'activité et prévenir immédiatement l'enseignant");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Appui", "e) Point de contact entre le corps et le sol"],
  ["2. Équilibre", "f) Position stable obtenue à partir de ses appuis"],
  ["3. Coordination", "b) Association de plusieurs mouvements du corps, avec rythme et continuité"],
  ["4. Réception", "c) Position stable retrouvée après un saut ou un déplacement"],
  ["5. Enchaînement", "d) Série de plusieurs actions simples réalisées l'une après l'autre"],
  ["6. Sécurité", "a) Ensemble des règles et comportements qui protègent les élèves pendant l'activité"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Signaler le manque d'espace à l'enseignant et proposer d'organiser un roulement entre petits groupes.");
rep("2. Signaler le matériel instable à l'enseignant avant de continuer, sans l'utiliser entre-temps.");
rep("3. Une mauvaise réception peut causer une chute ou une blessure aux articulations ; elle mérite donc une attention particulière.");
rep("4. Remarque centrée sur le geste et non la personne (ex. « essaie de garder les bras plus écartés pour l'équilibre »).");
children.push(spacer(240));

// =======================================================================
chap(10, "Hygiène de vie, santé, récupération et pratique physique responsable");

abc("A. Compléter — réponses");
rep("1. hydratation");
rep("2. hygiène");
rep("3. sommeil");
rep("4. récupération");
rep("5. sécurité");
rep("6. matériel");
rep("7. activité");
rep("8. responsabilité");
children.push(spacer(160));

abc("B. QCM — bonnes réponses");
rep("1. b) une alimentation variée, sans régime ni restriction");
rep("2. b) arrêter l'activité et prévenir immédiatement l'enseignant");
rep("3. b) à cause de la perte d'eau par la transpiration, surtout par climat chaud");
rep("4. b) un geste de responsabilité et de citoyenneté");
rep("5. c) le plaisir, la régularité et la sécurité");
children.push(spacer(160));

abc("C. Relier — bonnes correspondances");
relier([
  ["1. Hydratation", "e) Fait de boire régulièrement pour compenser la perte d'eau"],
  ["2. Récupération", "f) Retour progressif du corps au calme après un effort"],
  ["3. Hygiène", "g) Ensemble des gestes qui permettent de garder son corps propre"],
  ["4. Sommeil", "a) Moment de repos qui participe à la récupération du corps et de l'esprit"],
  ["5. Sécurité", "b) Ensemble des règles et comportements qui protègent les élèves"],
  ["6. Matériel", "c) Ensemble des objets utilisés pendant une séance, à utiliser et ranger correctement"],
  ["7. Activité physique", "d) Tout mouvement du corps, pratiqué régulièrement à l'école ou au quotidien"],
]);
children.push(spacer(160));

abc("D. Questions de réflexion — éléments de réponse attendus");
children.push(bodyPar("Ces questions sont ouvertes : il n'existe pas de réponse unique à recopier. L'enseignant évalue la réponse de l'élève à l'aide des critères ci-dessous.", { italics: true }));
rep("1. Boire de l'eau dès que possible et le signaler à l'enseignant si un malaise apparaît ; prévoir de mieux s'hydrater avant la prochaine séance.");
rep("2. Signaler le matériel manquant à l'enseignant ; prévoir une liste ou une routine de préparation la veille pour éviter que cela se reproduise.");
rep("3. La fatigue inhabituelle est un signal à prendre au sérieux ; l'attitude n'est pas responsable car elle expose le camarade à un risque évitable.");
rep("4. Réponse personnelle et réaliste, reliant clairement une habitude du manuel (hydratation, échauffement, hygiène, sécurité...) à une justification cohérente.");

await buildAndSave(children, 111, "Manuel_EPS_7AF_CorrigeGeneral.docx");
