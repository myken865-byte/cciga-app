// Manuel d'EPS 9e AF — Chapitre 11
// Sante, preparation physique, gestion de l'effort et securite
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, chapterOpening,
  exercicesHeading, pageBreak, qcmBlock, spacer, buildAndSave,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
} from "./common.mjs";

const children = [];

// ================= OUVERTURE DE CHAPITRE =================
children.push(...chapterOpening(
  11,
  "Santé, préparation physique, gestion de l’effort et sécurité",
  "Deux élèves réalisent le même exercice, côte à côte — et pourtant, l’un le trouve facile, l’autre difficile. Ce chapitre ne cherche pas à départager qui a raison : il t’aide à mieux te connaître, en sécurité.",
  [
    "Expliquer le rôle général de l’échauffement et d’une préparation progressive à l’activité.",
    "Distinguer effort, récupération et retour au calme.",
    "Reconnaître des indicateurs simples de l’intensité de l’effort, sans établir de diagnostic.",
    "Comprendre les principes généraux d’hydratation, de repos, d’hygiène et de récupération.",
    "Identifier les risques liés au terrain, au matériel, à l’environnement et aux comportements.",
    "Savoir arrêter l’activité et prévenir un adulte responsable en cas de problème inhabituel.",
    "Analyser une situation et proposer une conduite plus sûre et responsable.",
  ],
));
children.push(spacer(200));

// ---- Activation des acquis ----
children.push(sectionHeading("Activation des acquis", ""));
[
  "Pourquoi ne commence-t-on pas un effort intense sans préparation ?",
  "Pourquoi deux élèves peuvent-ils ressentir différemment le même exercice ?",
  "À quoi sert la récupération ?",
  "Quels éléments d’un espace d’EPS faut-il vérifier avant une activité ?",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Préparer → agir → observer → adapter → récupérer → prévenir : c’est la progression que suit ce chapitre.",
  { italics: true }
));
children.push(spacer(200));

// ---- 11.1 ----
children.push(sectionHeading("Santé et EPS", "11.1"));
children.push(bodyPar(
  "L’Éducation Physique et Sportive contribue à apprendre à bouger, à mieux connaître son corps, à coopérer avec les autres, à gérer son effort, et à adopter des comportements sûrs. Ce chapitre reste toujours prudent : il n’affirme jamais que l’activité physique garantit, à elle seule, une bonne santé ou prévient toutes les maladies — ce qui ne serait pas exact."
));
children.push(spacer(200));

// ---- 11.2 ----
children.push(sectionHeading("Préparation physique scolaire", "11.2"));
children.push(bodyPar(
  "La préparation physique scolaire vise une progression adaptée aux objectifs pédagogiques de l’EPS, en s’appuyant sur ce que tu as déjà appris : mobilité, coordination, endurance, vitesse, force adaptée et souplesse. Ce chapitre ne propose jamais de programme extrême : chaque activité reste dimensionnée pour un cadre scolaire."
));
children.push(spacer(200));

// ---- 11.3 ----
children.push(sectionHeading("L’échauffement", "11.3"));
children.push(bodyPar(
  "L’échauffement prépare progressivement le corps à l’activité principale, en distinguant une activation générale (mise en mouvement de l’ensemble du corps) et une préparation plus spécifique (proche des gestes de l’activité à venir). Ce chapitre ne présente jamais l’échauffement comme une garantie absolue contre toute blessure : c’est une préparation utile, pas une protection totale."
));
children.push(illustrationBox(
  "ILL-9AF-C11-01",
  "Préparation progressive",
  "Séquence scolaire organisée montrant des élèves haïtiens de 9e AF réalisant un échauffement progressif : mise en mouvement générale, puis exercices plus spécifiques, dans une cour d’école.",
  "Une séquence d’échauffement progressive et organisée.",
  "Illustrer concrètement la progressivité de l’échauffement présentée dans cette section.",
  "Paysage, format horizontal, séquence de 2-3 vignettes.",
));
children.push(spacer(200));

// ---- 11.4 ----
children.push(sectionHeading("Comprendre l’effort", "11.4"));
children.push(bodyPar(
  "Pendant un effort, le corps s’adapte : la respiration change, des sensations apparaissent, la facilité à parler diminue, une fatigue se fait sentir. Ces observations simples t’aident à mieux comprendre ton propre effort, sans jamais constituer un diagnostic médical."
));
children.push(illustrationBox(
  "ILL-9AF-C11-02",
  "Lire son effort",
  "Infographie pédagogique sobre présentant quatre indicateurs simples et non médicaux : respiration, sensation d’effort, facilité à parler, fatigue ressentie, chacun illustré par une petite icône claire.",
  "Des indicateurs simples pour observer son propre effort, sans diagnostic.",
  "Aider l’élève à observer son effort à l’aide de repères simples et non médicaux.",
  "Paysage, format horizontal, infographie pleine largeur.",
));
children.push(spacer(200));

// ---- 11.5 ----
children.push(sectionHeading("Gérer l’intensité", "11.5"));
children.push(bodyPar(
  "Gérer l’intensité, c’est éviter deux extrêmes : un effort trop faible pour atteindre l’objectif pédagogique, et un effort excessif qui dépasse ce qui est raisonnable. L’intensité d’une activité est toujours adaptée par l’enseignant, selon l’activité elle-même, sa durée, le niveau réel du groupe et les conditions du moment."
));
children.push(spacer(200));

// ---- 11.6 ----
children.push(sectionHeading("Effort et récupération", "11.6"));
children.push(bodyPar(
  "Une pratique équilibrée alterne des phases de travail et des phases de récupération, y compris entre plusieurs répétitions d’un même exercice, avec un retour progressif vers une activité plus calme en fin de séance. La récupération ne doit jamais être vue comme une perte de temps : elle fait pleinement partie de l’apprentissage."
));
children.push(illustrationBox(
  "ILL-9AF-C11-03",
  "Effort et récupération",
  "Schéma simple en trois temps montrant l’alternance activité → récupération → reprise, avec des élèves haïtiens de 9e AF représentés dans chaque phase (en action, en pause calme, puis reprenant l’activité).",
  "L’alternance entre effort et récupération dans une séance équilibrée.",
  "Illustrer concrètement le principe d’alternance présenté dans cette section.",
  "Paysage, format horizontal, schéma en 3 temps.",
));
children.push(spacer(200));

// ---- 11.7 ----
children.push(sectionHeading("Hydratation", "11.7"));
children.push(bodyPar(
  "Boire de l’eau régulièrement, autour et pendant une activité physique, fait partie d’une pratique responsable, particulièrement dans un contexte chaud comme celui d’Haïti. Ce chapitre ne prescrit aucun volume individuel rigide : il s’agit de principes généraux, adaptés au contexte scolaire et climatique réel de chaque établissement."
));
children.push(illustrationBox(
  "ILL-9AF-C11-04",
  "Hydratation et pause",
  "Groupe d’élèves haïtiens de 9e AF faisant une courte pause pour boire de l’eau pendant une séance d’EPS, dans une cour d’école, ambiance calme et responsable.",
  "Une pause d’hydratation intégrée normalement à une séance d’EPS.",
  "Illustrer une situation scolaire crédible d’hydratation responsable.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 11.8 ----
children.push(sectionHeading("Repos, sommeil et récupération", "11.8"));
children.push(bodyPar(
  "Le repos et le sommeil jouent un rôle important dans le fonctionnement quotidien et dans la récupération générale du corps. Ce chapitre ne fixe aucun objectif extrême de sommeil et ne compare jamais les élèves entre eux à ce sujet : chacun peut avoir des besoins différents."
));
children.push(spacer(200));

// ---- 11.9 ----
children.push(sectionHeading("Hygiène en contexte sportif", "11.9"));
children.push(bodyPar(
  "Une tenue propre et adaptée à l’activité, une hygiène corporelle simple, un partage prudent du matériel commun (ballons, cônes...) et un entretien raisonnable des espaces de pratique contribuent à une pratique sportive plus sûre et plus agréable pour tous, selon les moyens réellement disponibles dans chaque établissement."
));
children.push(spacer(200));

// ---- 11.10 ----
children.push(sectionHeading("Prévention des risques", "11.10"));
children.push(bodyPar(
  "Plusieurs types de risques peuvent affecter une séance d’EPS : un sol irrégulier, des obstacles, une chaleur excessive, la pluie, un matériel instable, un espace insuffisant pour le nombre d’élèves, un risque de collision, un comportement imprudent, ou une activité mal organisée. Identifier ces risques à l’avance permet de les prévenir plutôt que de les subir."
));
children.push(spacer(200));

// ---- 11.11 ----
children.push(sectionHeading("Sécurité du matériel et de l’espace", "11.11"));
children.push(bodyPar(
  "Avant toute activité, une inspection simple permet de vérifier : le sol, les limites de l’espace, les obstacles éventuels, les fixations (buts, poteaux, filets), l’état des ballons et du matériel, les distances suffisantes entre les groupes, et la circulation prévue entre les ateliers. Ce chapitre ne recommande jamais une installation improvisée dangereuse, quelle que soit la contrainte de ressources."
));
children.push(illustrationBox(
  "ILL-9AF-C11-05",
  "Inspection de l’espace",
  "Élèves haïtiens de 9e AF et un enseignant inspectant ensemble un espace scolaire avant une activité : vérification du sol, des limites, des obstacles et du matériel. Attitude attentive et méthodique.",
  "Une inspection méthodique de l’espace et du matériel avant une activité.",
  "Illustrer concrètement la méthode d’inspection présentée dans cette section.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 11.12 ----
children.push(sectionHeading("Conditions climatiques et environnement", "11.12"));
children.push(bodyPar(
  "En Haïti, la chaleur, le soleil, la pluie et des surfaces pouvant devenir glissantes influencent directement la sécurité d’une activité d’EPS. L’enseignant adapte, reporte ou arrête une activité lorsque les conditions du moment rendent la pratique non sûre : cette décision n’appartient jamais aux élèves seuls."
));
children.push(illustrationBox(
  "ILL-9AF-C11-06",
  "Conditions environnementales",
  "Illustration comparative en deux parties : à gauche, une situation scolaire adaptée à une pratique sûre (temps clair, sol sec, espace dégagé) ; à droite, une situation nécessitant une adaptation (sol mouillé, chaleur visible, ciel menaçant). Style clair, comparaison pédagogique.",
  "Comparer une situation adaptée à une pratique sûre et une situation demandant une adaptation.",
  "Aider l’élève à reconnaître des conditions environnementales nécessitant un ajustement.",
  "Paysage, format horizontal, comparaison côte à côte.",
));
children.push(spacer(200));

// ---- 11.13 ----
children.push(sectionHeading("Douleur, malaise ou signe inhabituel", "11.13"));
children.push(bodyPar(
  "La règle est claire et ne souffre aucune exception : en cas de douleur, de malaise ou de tout signe inhabituel, il faut arrêter l’activité, se mettre en sécurité, et prévenir immédiatement l’enseignant ou un adulte responsable. Ce chapitre ne demande jamais à un élève de « pousser malgré la douleur »."
));
children.push(calloutBox(
  "Sécurité",
  ["En cas de douleur, de malaise ou de tout signe inhabituel : arrête l’activité, mets-toi en sécurité, et préviens immédiatement ton enseignant ou un adulte responsable. Ne jamais continuer « malgré la douleur »."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(illustrationBox(
  "ILL-9AF-C11-07",
  "Réagir à un problème",
  "Un élève haïtien de 9e AF s’arrêtant pendant une activité et se dirigeant calmement vers son enseignant pour signaler un problème, attitude responsable. Aucune représentation médicale graphique, aucune scène alarmante.",
  "La bonne réaction face à un problème inhabituel : arrêter et prévenir un adulte responsable.",
  "Illustrer la règle de sécurité de cette section sans représentation médicale graphique.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 11.14 ----
children.push(sectionHeading("Préparation physique responsable", "11.14"));
children.push(bodyPar(
  "Une logique scolaire simple guide toute séance responsable : un objectif clair, une activité adaptée à cet objectif, une exécution correcte du geste, une récupération suffisante, une observation de ce qui s’est passé, puis un ajustement si nécessaire. Ce chapitre ne prescrit jamais de régime alimentaire, d’objectif de perte de poids, de complément ou de programme d’entraînement intensif : cela dépasse largement le cadre de l’EPS scolaire."
));
children.push(illustrationBox(
  "ILL-9AF-C11-08",
  "Plan d’une séance responsable",
  "Schéma en six étapes reliées par des flèches : PRÉPARER → EFFORT → OBSERVER → RÉCUPÉRER → AJUSTER → BILAN. Style épuré, une petite icône simple par étape.",
  "Les six étapes d’une séance d’EPS responsable et équilibrée.",
  "Servir de repère visuel réutilisable pour organiser une séance.",
  "Paysage, format horizontal, schéma pleine largeur.",
));
children.push(spacer(200));

// ---- 11.15 ----
children.push(sectionHeading("Autonomie et responsabilité", "11.15"));
children.push(bodyPar(
  "L’autonomie, dans ce chapitre, signifie appliquer les consignes reçues, reconnaître un risque, communiquer clairement avec l’enseignant ou ses camarades, respecter ses propres limites du moment, et contribuer activement à la sécurité de l’ensemble du groupe."
));
children.push(calloutBox(
  "Méthode — Gérer son effort",
  [
    "Connaître l’objectif de l’activité.",
    "Commencer progressivement.",
    "Observer ses propres sensations.",
    "Respecter les consignes de l’enseignant.",
    "Récupérer.",
    "Signaler tout problème inhabituel.",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(calloutBox(
  "Sécurité — Avant l’activité",
  ["Vérifier : l’espace, le matériel, la météo et les conditions du moment, une tenue adaptée, les consignes reçues, et l’organisation du groupe."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Pratiquer en sécurité dans le contexte scolaire haïtien", ""));
children.push(bodyPar(
  "Une cour d’école, un terrain scolaire ou un espace polyvalent, une chaleur importante, un matériel parfois limité et des groupes nombreux sont des réalités fréquentes de l’EPS en Haïti. Des solutions réalistes existent : ateliers, rotations, zones clairement délimitées, pauses adaptées et organisation soigneuse du matériel disponible. Ce chapitre ne normalise jamais un espace manifestement dangereux sous prétexte de manque de ressources : dans ce cas, l’activité doit être adaptée, déplacée ou reportée."
));
children.push(spacer(200));

// ================= ACTIVITE PRATIQUE =================
children.push(pageBreak());
children.push(sectionHeading("Activité pratique — « Construisons une séance équilibrée »", ""));
children.push(bodyPar(
  "Sous supervision, ton groupe organise une courte séquence comprenant une préparation, une activité principale adaptée, une récupération et un bilan. L’objectif est de comprendre l’organisation d’une séance équilibrée, jamais de rechercher la fatigue maximale."
));
[
  "Fixez un objectif clair et simple pour la séquence.",
  "Préparez une courte activation progressive.",
  "Réalisez l’activité principale, adaptée à l’espace et au matériel disponibles.",
  "Prévoyez un temps de récupération suffisant.",
  "Terminez par un bref bilan : qu’avez-vous observé ? Qu’ajusteriez-vous la prochaine fois ?",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Cette séquence peut être adaptée selon l’espace et le matériel réellement disponibles dans l’école.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(pageBreak());
children.push(sectionHeading("Activité d’analyse — « Est-ce une situation sûre ? »", ""));
children.push(bodyPar(
  "Pour chaque situation suivante, réponds à quatre questions : Quel est le risque ? Quelle décision faut-il prendre ? Quelle correction proposer ? Qui doit être informé ?"
));
[
  "Le sol est mouillé après une pluie récente.",
  "Un poteau ou un support de but semble instable.",
  "La chaleur est particulièrement importante ce jour-là.",
  "Un groupe est installé trop près d’un autre groupe en activité.",
  "Un élève ressent un problème inhabituel pendant l’activité.",
  "Un groupe enchaîne plusieurs exercices intenses sans aucun temps de récupération.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE J'OBSERVE MON EFFORT =================
children.push(pageBreak());
children.push(sectionHeading("Activité — « J’observe mon effort »", ""));
children.push(bodyPar(
  "Complète cette fiche qualitative simple avant, pendant et après une activité. Cette fiche ne sert jamais à classer les élèves entre eux, ni à imposer une norme corporelle."
));
children.push(threeColTable(
  ["Moment", "Ce que je peux observer", "Ma description"],
  [
    ["Avant l’activité", "Sensation générale, énergie ressentie", ""],
    ["Pendant l’activité", "Respiration, facilité à parler, fatigue ressentie", ""],
    ["Après l’activité", "Récupération, sensation générale", ""],
  ],
  [2600, 3800, 2800],
));
children.push(spacer(200));

// ================= AUTOEVALUATION =================
children.push(pageBreak());
children.push(sectionHeading("Autoévaluation", ""));
children.push(calloutBox(
  "Autoévaluation",
  ["Ce bilan personnel t’aide à mesurer ta propre compréhension. Il ne sert jamais à te comparer aux autres élèves."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Je prépare progressivement mon activité", "", ""],
    ["Je respecte les consignes", "", ""],
    ["Je sais reconnaître quand l’effort devient trop difficile", "", ""],
    ["Je récupère", "", ""],
    ["Je participe à l’inspection de l’espace", "", ""],
    ["Je signale un risque", "", ""],
    ["Je sais arrêter et prévenir un adulte en cas de problème", "", ""],
    ["Je peux expliquer une séance équilibrée", "", ""],
  ],
  [3800, 3200, 2200],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "L’EPS contribue à apprendre à bouger, à connaître son corps et à gérer son effort, sans promesse médicale absolue.",
  "L’échauffement prépare progressivement le corps ; il n’est jamais une garantie absolue contre les blessures.",
  "Observer sa respiration, ses sensations et sa fatigue permet de mieux comprendre son effort, sans diagnostic.",
  "L’intensité d’une activité est toujours adaptée par l’enseignant selon l’activité, le groupe et les conditions du moment.",
  "La récupération fait partie de l’apprentissage ; l’hydratation, le repos et l’hygiène restent des principes généraux, jamais des prescriptions rigides.",
  "Une inspection de l’espace et du matériel avant l’activité permet de prévenir de nombreux risques.",
  "En cas de douleur, de malaise ou de signe inhabituel : arrêter, se mettre en sécurité et prévenir immédiatement un adulte responsable.",
  "L’autonomie responsable, c’est appliquer les consignes, reconnaître un risque, communiquer et respecter ses propres limites.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : expliquer une notion, ordonner les étapes d’une séance, identifier un risque, analyser une situation, proposer une adaptation sûre et justifier une décision, à partir de situations nouvelles.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(11));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(risque - responsabilité - échauffement - observation - repos - adaptation - récupération - hydratation - sécurité - effort)", italics: true, color: "555555" },
]));
[
  "1. La préparation progressive du corps avant l’activité principale s’appelle l’____________________.",
  "2. La mobilisation du corps pour réaliser une activité physique s’appelle un ____________________.",
  "3. Le retour progressif de l’organisme vers un état plus calme après l’effort s’appelle la ____________________.",
  "4. L’ensemble des règles et comportements qui protègent les élèves s’appelle la ____________________.",
  "5. Le fait de boire régulièrement pour compenser la perte d’eau s’appelle l’____________________.",
  "6. Le temps consacré au sommeil et à la récupération quotidienne s’appelle le ____________________.",
  "7. La possibilité qu’un événement indésirable ou dangereux se produise s’appelle un ____________________.",
  "8. Le fait de modifier une activité ou un comportement selon la situation s’appelle une ____________________.",
  "9. Le fait de regarder attentivement une situation avant d’agir s’appelle l’____________________.",
  "10. Le fait d’assumer les conséquences de ses choix et de son comportement s’appelle la ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Quel est le rôle général de l’échauffement, selon ce chapitre ?", opts: ["a) garantir de façon absolue qu’aucune blessure ne surviendra", "b) préparer progressivement le corps à l’activité principale", "c) remplacer complètement la récupération", "d) être inutile si l’activité est courte"] },
  { q: "2. Que doit faire un élève qui ressent une douleur, un malaise ou un symptôme inhabituel pendant une activité ?", opts: ["a) continuer en « poussant » malgré la douleur", "b) arrêter l’activité, se mettre en sécurité et prévenir immédiatement l’enseignant ou un adulte responsable", "c) attendre la fin du cours pour en parler", "d) demander à un camarade de continuer à sa place"] },
  { q: "3. Que recommande ce chapitre au sujet de l’hydratation ?", opts: ["a) un volume individuel rigide identique pour tous les élèves", "b) des principes généraux d’accès à l’eau, adaptés au contexte scolaire et climatique", "c) éviter complètement de boire pendant une activité", "d) boire uniquement après un malaise"] },
  { q: "4. Pourquoi deux élèves peuvent-ils ressentir différemment un même exercice, selon ce chapitre ?", opts: ["a) parce qu’un seul des deux fait l’exercice correctement", "b) parce que la perception de l’effort varie d’une personne à l’autre, sans que cela soit un problème", "c) parce que l’un des deux triche", "d) parce que les qualités physiques ne varient jamais entre élèves"] },
  { q: "5. Que doit faire un enseignant face à des conditions climatiques rendant une pratique non sûre (chaleur importante, sol glissant) ?", opts: ["a) continuer l’activité sans aucun changement", "b) adapter, reporter ou arrêter l’activité selon les conditions", "c) ignorer les conditions si le programme doit être respecté", "d) laisser les élèves décider seuls de continuer ou non"] },
  { q: "6. Que ne doit jamais prescrire ce chapitre, selon ses propres règles ?", opts: ["a) un rappel des règles de sécurité", "b) un régime, une perte de poids, un supplément ou un programme d’entraînement intensif", "c) une séquence d’échauffement progressive", "d) une activité de récupération calme"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Échauffement", "a) Fait de boire régulièrement pour compenser la perte d’eau"],
  ["2. Effort", "b) Vérification du sol, du matériel et de l’espace avant une activité"],
  ["3. Récupération", "c) Possibilité qu’un événement indésirable ou dangereux se produise"],
  ["4. Hydratation", "d) Fait de modifier une activité ou un comportement selon la situation"],
  ["5. Inspection", "e) Fait d’assumer les conséquences de ses choix et de son comportement"],
  ["6. Risque", "f) Préparation progressive du corps avant l’activité principale"],
  ["7. Adaptation", "g) Mobilisation du corps pour réaliser une activité physique"],
  ["8. Responsabilité", "h) Retour progressif de l’organisme vers un état plus calme après l’effort"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève commence un effort intense sans aucune préparation progressive. Explique les risques de ce comportement et propose une meilleure façon de procéder.",
  "2. Avant une activité, tu remarques qu’une partie du terrain est glissante à cause de la pluie. Explique ce que tu devrais faire, et pourquoi cette réaction est responsable.",
  "3. Un élève ressent un problème inhabituel pendant une activité mais insiste pour continuer malgré tout. Explique pourquoi cette attitude est risquée et ce qui devrait être fait à la place.",
  "4. Un groupe enchaîne plusieurs efforts intenses sans jamais prévoir de temps de récupération. Explique pourquoi cette organisation pose problème et propose une amélioration.",
  "5. Avant une activité, tu remarques que le matériel (buts, poteaux, support) est instable. Explique ce que tu devrais faire, et pourquoi cette réaction est une preuve de responsabilité.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 137, "Manuel_EPS_9AF_Chapitre11.docx");
console.log("Chapitre 11 (9e AF) genere:", outPath);
