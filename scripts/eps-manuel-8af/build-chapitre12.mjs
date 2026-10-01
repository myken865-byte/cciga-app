import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_SANTE_FILL, BOX_SANTE_LINE, BOX_SANTE_TITLE,
  BOX_PROJET_FILL, BOX_PROJET_LINE, BOX_PROJET_TITLE,
  BOX_BILAN_FILL, BOX_BILAN_LINE, BOX_BILAN_TITLE, NAVY,
} from "./common.mjs";

// Illustration ID tracker (must all be used exactly once, 01-10):
// 01 intro/12.1, 02 12.7, 03 12.4, 04 12.5/12.6, 05 12.8, 06 12.10,
// 07 activité d'analyse, 08 12.11, 09 activité collective, 10 projet final / fin

const children = [];

children.push(...chapterTitleBlock(12, "Santé, hygiène de vie, autonomie et projet personnel d’activité physique"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Ce dernier chapitre referme une année complète d’EPS en 8e AF. Il ne s’agit plus d’apprendre une nouvelle technique sportive, mais de relier tout ce que tu as appris à une question plus large : comment prendre soin de ton corps et rester actif, de façon autonome et responsable, bien au-delà de la salle de classe ? Tu vas terminer ce manuel en construisant ton propre petit projet personnel d’activité physique."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Comprendre les liens entre activité physique régulière, hygiène de vie, récupération, sécurité et bien-être général. Ce chapitre développe une autonomie progressive : observer tes habitudes, identifier des possibilités réalistes de mouvement, fixer un objectif raisonnable, planifier, pratiquer en sécurité et t’autoévaluer. Un projet personnel d’activité physique est toujours adaptable, progressif et non compétitif."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "expliquer avec des mots simples pourquoi une activité physique régulière contribue à la santé et au bien-être ;",
  "identifier plusieurs composantes d’une hygiène de vie favorable : activité physique, repos, sommeil, hydratation, alimentation variée et hygiène corporelle ;",
  "comprendre l’importance de l’équilibre entre activité et récupération ;",
  "identifier des occasions sûres d’être actif dans la vie quotidienne et scolaire ;",
  "formuler un objectif personnel réaliste et observable, sans objectif esthétique ou de perte de poids ;",
  "construire un petit projet d’activité physique adapté au contexte, au temps disponible et aux conditions de sécurité ;",
  "utiliser des indicateurs simples de suivi : régularité, sensations, participation, progression technique ou accomplissement d’une tâche ;",
  "adapter ou interrompre ton projet lorsqu’une situation le nécessite, et demander l’aide d’un adulte responsable ;",
  "réaliser une autoévaluation finale des compétences développées pendant l’année.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Activité physique, hygiène de vie, récupération, hydratation, autonomie, objectif, planification, régularité, autoévaluation, progression.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis de l'année ----
children.push(subHeading("Activation des acquis de l’année"));
children.push(bodyPar(
  "Avant de commencer, prends un moment pour relier ce que tu as appris cette année : les capacités physiques et motrices, la gestion de l’effort, l’échauffement et la sécurité, l’athlétisme, les sports collectifs, la gymnastique, et les jeux et la coopération."
));
children.push(bodyPar(
  "Identifie trois apprentissages de cette année que tu pourrais réutiliser pour organiser, seul, une pratique physique responsable. Ce chapitre ne va pas résumer mécaniquement les onze chapitres précédents : il va t’aider à sélectionner ce qui est réellement utile pour ton autonomie."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C12-01",
  "Schéma de synthèse : de l’activité physique à l’autonomie",
  "Réaliser un schéma en cinq étapes reliées par des flèches formant une chaîne : « Activité physique » → « Récupération » → « Hygiène de vie » → « Bien-être » → « Autonomie ». Utiliser une petite icône simple pour chaque étape.",
  "De l’activité physique à l’autonomie : une chaîne de liens simples et cohérents.",
  "Donner à l’élève une vue d’ensemble du fil conducteur du chapitre avant son étude détaillée.",
  "Paysage, format horizontal, schéma en chaîne.",
));
children.push(spacer(200));

// ================= 12.1 =================
children.push(sectionHeading("Activité physique, santé et bien-être", "12.1"));
children.push(bodyPar(
  "Une pratique physique régulière et adaptée peut soutenir le fonctionnement de ton corps, tes capacités motrices, ton énergie quotidienne, ta concentration et ton bien-être général. Ce chapitre reste toujours prudent : il n’affirme jamais qu’une activité physique prévient ou guérit toutes les maladies, ce qui ne serait pas exact."
));
children.push(bodyPar(
  "Il est utile de distinguer plusieurs formes d’activité physique : l’activité physique quotidienne (marcher, se déplacer), la séance d’EPS à l’école, le jeu actif (jouer en bougeant), et la pratique sportive plus organisée. Toutes contribuent, chacune à leur manière, à une vie active."
));
children.push(spacer(160));

// ================= 12.2 =================
children.push(sectionHeading("Bouger régulièrement sans rechercher l’excès", "12.2"));
children.push(bodyPar(
  "Ce qui compte le plus, c’est la régularité et la progressivité d’une pratique physique, plutôt que son intensité maximale. Ce chapitre oppose clairement une pratique régulière et adaptée à un effort brutal, un défi extrême ou un entraînement excessif, qui ne sont jamais recommandés."
));
children.push(bodyPar(
  "Les capacités et les rythmes de progression diffèrent d’un élève à l’autre : il n’existe pas un seul rythme correct pour tous, et cela n’a jamais été le cas dans ce manuel."
));
children.push(spacer(160));

// ================= 12.3 =================
children.push(sectionHeading("Repos, récupération et sommeil", "12.3"));
children.push(bodyPar(
  "Comme tu l’as étudié aux chapitres 3 et 4, le repos et la récupération font partie intégrante de toute pratique physique. Le sommeil joue un rôle général important dans la récupération de ton corps et dans ton fonctionnement quotidien, y compris ta concentration en classe."
));
children.push(bodyPar(
  "Ce chapitre ne prescrit aucun traitement et n’interprète jamais un trouble du sommeil : si une difficulté de sommeil persistante t’inquiète, il est toujours recommandé d’en parler à un adulte responsable, qui pourra t’orienter si nécessaire."
));
children.push(spacer(160));

// ================= 12.4 =================
children.push(sectionHeading("Hydratation", "12.4"));
children.push(bodyPar(
  "Il est important de boire de l’eau régulièrement au cours de la journée, et particulièrement autour d’une activité physique, selon les conditions. En Haïti, la chaleur et le climat demandent une attention particulière à l’hydratation, comme tu l’as déjà appris."
));
children.push(bodyPar(
  "Ce chapitre ne recommande jamais de boissons énergisantes, de produits stimulants ou de suppléments : l’eau reste toujours la boisson de référence."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C12-03",
  "Hydratation et récupération",
  "Dessiner un petit groupe d’élèves haïtiens de 8e AF buvant de l’eau à leur bouteille personnelle après une activité scolaire, dans une ambiance calme, si possible à l’ombre, dans un contexte scolaire haïtien crédible.",
  "S’hydrater régulièrement après l’activité physique, particulièrement dans un climat chaud.",
  "Rappeler visuellement l’importance de l’hydratation et de la récupération, en lien avec les acquis des chapitres précédents.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ================= 12.5 =================
children.push(sectionHeading("Alimentation variée et activité physique", "12.5"));
children.push(bodyPar(
  "L’alimentation est une composante de l’hygiène de vie et fournit l’énergie nécessaire à tes activités quotidiennes. Ce chapitre valorise la variété, l’équilibre et des habitudes adaptées au contexte familial et culturel de chaque élève, sans jamais proposer de régime restrictif, de comptage de calories ou d’objectif de transformation corporelle."
));
children.push(bodyPar(
  "Les exemples alimentaires haïtiens utilisés dans ce manuel restent toujours variés, sans jamais classer moralement les personnes selon ce qu’elles mangent."
));
children.push(spacer(160));

// ================= 12.6 =================
children.push(sectionHeading("Hygiène corporelle et pratique", "12.6"));
children.push(bodyPar(
  "Quelques habitudes simples restent utiles autour de la pratique physique : des vêtements adaptés et propres lorsque cela est possible, le lavage des mains, le soin du matériel personnel, et le changement de vêtements humides lorsque les conditions le permettent."
));
children.push(bodyPar(
  "Ces habitudes sont liées au confort, au respect de soi-même, des autres et des espaces communs. Ce chapitre évite toujours toute stigmatisation liée aux ressources économiques des élèves : chaque famille dispose de moyens différents, et cela ne remet jamais en cause la valeur d’un élève."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C12-04",
  "Hygiène de vie : plusieurs composantes réunies",
  "Dessiner une composition simple réunissant plusieurs icônes représentant les composantes de l’hygiène de vie : une activité physique légère, un lit ou une icône de repos, une bouteille d’eau, une assiette avec des aliments variés (sans représentation corporelle), et un point d’eau pour le lavage des mains. Aucune silhouette corporelle ni idéal physique représenté.",
  "Plusieurs composantes d’une hygiène de vie favorable, réunies dans un même schéma.",
  "Offrir une vue d’ensemble des composantes de l’hygiène de vie, sans jamais représenter un idéal corporel.",
  "Paysage, format horizontal, composition d’icônes.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Santé",
  ["Une activité physique adaptée s'inscrit toujours dans un ensemble plus large d'habitudes de vie : hydratation, sommeil, alimentation variée et hygiène, jamais isolée les unes des autres."],
  BOX_SANTE_FILL, BOX_SANTE_LINE, BOX_SANTE_TITLE,
));
children.push(spacer(200));

// ================= 12.7 =================
children.push(sectionHeading("Être actif dans la vie quotidienne", "12.7"));
children.push(bodyPar(
  "Plusieurs occasions réalistes et sûres permettent d’être actif au quotidien : marcher dans un environnement approprié, participer à des jeux actifs, aider à certaines tâches physiques adaptées, ou pratiquer une activité dans un espace scolaire ou communautaire sécurisé."
));
children.push(bodyPar(
  "Ce chapitre n’encourage jamais l’activité physique dans un environnement routier, isolé ou autrement dangereux. Réfléchis aux ressources réellement disponibles autour de toi : ton projet personnel doit s’appuyer sur ce qui existe vraiment dans ton quotidien, pas sur des conditions idéales inaccessibles."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C12-02",
  "Formes d’activité physique quotidienne et scolaire",
  "Dessiner plusieurs petites vignettes montrant des élèves haïtiens dans différentes formes d’activité physique sûres : marcher vers l’école dans un environnement adapté, jouer activement dans une cour, aider à une tâche domestique légère qui demande du mouvement, pratiquer un jeu dans un espace scolaire sécurisé.",
  "Plusieurs occasions sûres d’être actif dans la vie quotidienne et scolaire.",
  "Montrer que l’activité physique peut s’intégrer simplement au quotidien, sans matériel coûteux ni structure organisée.",
  "Paysage, format horizontal, bande de plusieurs vignettes.",
));
children.push(spacer(200));

// ================= 12.8 =================
children.push(sectionHeading("Qu’est-ce qu’un projet personnel d’activité physique ?", "12.8"));
children.push(bodyPar(
  "Un petit projet personnel est une intention organisée qui te permet de pratiquer régulièrement une activité choisie et adaptée. La démarche suit une logique simple : choisir un objectif, identifier une activité, prévoir une fréquence et un temps de pratique de manière raisonnable, organiser la sécurité et la récupération, observer, puis ajuster."
));
children.push(bodyPar(
  "Ce projet ne vise jamais la perte de poids, la modification de ton apparence, l’épuisement ou une performance extrême : il reste toujours centré sur le plaisir, la régularité et ta progression personnelle."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Être autonome en EPS, c’est savoir choisir, pratiquer, observer, ajuster et respecter sa sécurité."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C12-05",
  "Étapes d’un projet personnel",
  "Réaliser un schéma en cinq étapes reliées par des flèches formant un cycle : « Choisir » → « Planifier » → « Pratiquer » → « Observer » → « Ajuster », avec une flèche de retour vers « Choisir ». Utiliser une petite icône simple pour chaque étape.",
  "Les cinq étapes d’un projet personnel d’activité physique, organisées en cycle.",
  "Donner à l’élève un schéma de référence pour construire son propre projet personnel.",
  "Paysage, format horizontal, schéma en boucle.",
));
children.push(spacer(200));

// ================= 12.9 =================
children.push(sectionHeading("Choisir un objectif réaliste", "12.9"));
children.push(bodyPar(
  "Un bon objectif éducatif est observable, par exemple : améliorer la régularité d’une activité, mieux coordonner un geste, participer davantage à un jeu, mieux gérer son allure, progresser dans une compétence technique, ou coopérer plus efficacement avec ses partenaires."
));
children.push(bodyPar(
  "Un objectif observable se distingue d’un souhait trop vague (par exemple « être en forme », qui ne permet pas de savoir précisément ce qui doit changer). Les objectifs restent toujours flexibles et révisables : tu peux les ajuster à tout moment."
));
children.push(spacer(160));

// ================= 12.10 =================
children.push(sectionHeading("Planifier avec simplicité", "12.10"));
children.push(bodyPar(
  "Une fiche de planification hebdomadaire légère peut t’aider : l’activité choisie, le moment prévu, une durée approximative et adaptée, le lieu, une règle de sécurité à respecter, et une sensation ou observation après la pratique."
));
children.push(threeColTable(
  ["Jour et moment prévu", "Activité et durée approximative", "Lieu et règle de sécurité"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 3200, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce chapitre n’impose jamais un volume d’entraînement universel identique à tous les élèves : ton projet doit toujours rester compatible avec l’école, le repos, la vie familiale et tes conditions réelles."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C12-06",
  "Exemple de fiche hebdomadaire simple",
  "Dessiner une fiche simple et lisible représentant un exemple de planification hebdomadaire légère d’un élève haïtien : quelques lignes avec activité, moment, durée approximative, lieu et une règle de sécurité, présentées de façon claire et non contraignante.",
  "Un exemple de fiche hebdomadaire simple pour planifier un projet personnel d’activité physique.",
  "Illustrer concrètement à quoi peut ressembler une planification légère et réaliste, en lien avec la section 12.10.",
  "Portrait, format vertical, document stylisé.",
));
children.push(spacer(200));

// ================= 12.11 =================
children.push(sectionHeading("Suivre et ajuster son projet", "12.11"));
children.push(bodyPar(
  "Un carnet simple, sans donnée corporelle sensible, peut t’aider à suivre ton projet : l’activité réalisée, ta participation, la difficulté ressentie, une réussite, et un point à améliorer."
));
children.push(bodyPar(
  "Apprends à modifier une activité si elle est trop difficile, trop facile, peu accessible, ou si les conditions ne sont pas sûres. Ce chapitre valorise toujours la constance, l’apprentissage et l’autonomie, jamais la performance pour elle-même."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C12-08",
  "Élève utilisant un carnet de suivi",
  "Dessiner un élève haïtien de 8e AF assis calmement, écrivant dans un petit carnet simple des notes sur son activité, sa participation et ses sensations générales, sans aucune donnée corporelle (poids, mensurations) visible sur le carnet.",
  "Un carnet de suivi centré sur l’apprentissage et les sensations générales, jamais sur des données corporelles.",
  "Illustrer un suivi de projet respectueux et non centré sur l’apparence, en lien avec la section 12.11.",
  "Portrait, format vertical, plan moyen.",
));
children.push(spacer(200));

// ================= 12.12 =================
children.push(sectionHeading("Quand faut-il demander de l’aide ?", "12.12"));
children.push(bodyPar(
  "En cas de douleur, de malaise, de vertiges, de difficulté respiratoire inhabituelle, de blessure ou de tout autre problème préoccupant, il faut toujours arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable."
));
children.push(bodyPar(
  "Il ne t’est jamais demandé de poser un diagnostic ni de te soigner toi-même : savoir t’arrêter et demander de l’aide fait pleinement partie de l’autonomie responsable que ce manuel cherche à développer."
));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  ["Savoir arrêter une activité et prévenir immédiatement un adulte responsable en cas de problème fait partie intégrante de l'autonomie, pas d'un échec."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Méthode",
  ["Objectif → Planification → Pratique → Observation → Ajustement : ce cycle t'accompagne tout au long de ton projet personnel d'activité physique."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ================= 12.13 =================
children.push(sectionHeading("Bilan personnel de fin d’année", "12.13"));
children.push(bodyPar(
  "Pour terminer, réfléchis à ce que tu maîtrises désormais mieux, à ce que tu dois encore travailler, et aux comportements responsables que tu as développés cette année. Reprends les compétences travaillées tout au long du manuel : observer, analyser, choisir, agir, coopérer, ajuster et t’autoévaluer."
));
children.push(bodyPar(
  "Ce bilan reste toujours positif, non comparatif, et orienté vers ta progression personnelle, jamais vers un classement entre élèves."
));
children.push(spacer(120));

children.push(calloutBox(
  "Bilan",
  ["Un bilan de fin d'année valorise les progrès réalisés, quels qu'ils soient, et ne sert jamais à comparer les élèves entre eux."],
  BOX_BILAN_FILL, BOX_BILAN_LINE, BOX_BILAN_TITLE,
));
children.push(spacer(200));

// ---- Projet final du chapitre ----
children.push(sectionHeading("Projet final : mon projet personnel d’activité physique", ""));
children.push(bodyPar(
  "Choisis une activité sûre et accessible, formule un objectif non esthétique, prévois une organisation simple et identifie les règles de sécurité applicables. Ce projet doit toujours être validé par ton enseignant avant toute mise en pratique dans le cadre scolaire, et doit pouvoir s’adapter aux ressources réellement disponibles en Haïti, sans dépendre de matériel coûteux."
));
children.push(calloutBox(
  "Mon projet",
  [
    "Mon objectif : (un résultat observable, jamais esthétique ou lié au poids)",
    "Mon activité : (l’activité physique choisie)",
    "Où et quand je peux la pratiquer : (lieu sûr et moment réaliste)",
    "Ce dont j’ai besoin : (matériel simple et accessible, ou aucun matériel)",
    "Comment je m’échauffe : (une préparation adaptée à l’activité choisie)",
    "Comment je gère mon effort : (allure, intensité et pauses adaptées)",
    "Comment je récupère : (hydratation, repos, retour au calme)",
    "Comment j’observe ma progression : (régularité, sensations, réussite d’une tâche)",
    "Quand je dois arrêter ou demander de l’aide : (signes à surveiller et adulte à prévenir)",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, BOX_PROJET_TITLE,
));
children.push(spacer(200));

// ---- Activité d'analyse ----
children.push(sectionHeading("Activité d’analyse", ""));
children.push(bodyPar(
  "Pour chacun des projets fictifs suivants, identifie le ou les problèmes, puis reformule le projet de façon plus sûre et éducative."
));
children.push(calloutBox(
  "Quel projet est le plus responsable ?",
  [
    "Projet 1 : un élève prévoit de s’entraîner très intensément tous les jours, sans aucun jour de repos.",
    "Projet 2 : un élève prévoit de courir seul, tôt le matin, le long d’une route fréquentée, sans avoir prévu de règle de sécurité particulière.",
    "Projet 3 : un élève prévoit de marcher activement trois fois par semaine avec un camarade, dans un espace sécurisé, avec de l’eau et un temps de récupération prévu.",
    "Projet 4 : un élève formule son objectif comme « avoir un corps plus musclé » et prévoit une pratique très intense pour y parvenir rapidement.",
    "Pour chaque projet, identifie ce qui pose problème (ou ce qui est bien organisé pour le projet 3), puis reformule les projets 1, 2 et 4 de façon plus sûre, réaliste et éducative.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C12-07",
  "Comparaison pédagogique : projet responsable / projet à corriger",
  "Dessiner une image en deux parties, côte à côte. À gauche : un élève haïtien présentant un projet personnel écrit avec un objectif observable, une activité réaliste, un lieu sûr et une règle de sécurité clairement identifiée. À droite : une fiche de projet incomplète, sans règle de sécurité visible, sans mention de repos. Aucune représentation de comportement dangereux détaillé ni de blessure.",
  "À gauche, un projet personnel responsable et complet ; à droite, un projet à corriger.",
  "Servir de support visuel à l’activité d’analyse « Quel projet est le plus responsable ? ».",
  "Paysage, format horizontal, image divisée en deux parties.",
));
children.push(spacer(200));

// ---- Activité collective de synthèse ----
children.push(sectionHeading("Activité collective de synthèse", ""));
children.push(calloutBox(
  "Notre carte des compétences EPS de 8e AF",
  [
    "En groupe, reliez les apprentissages des douze chapitres de cette année : mouvement, capacités, effort, sécurité, athlétisme, jeux collectifs, gymnastique, activités haïtiennes, santé et autonomie.",
    "Organisez ces apprentissages sur une grande feuille ou un tableau, sous forme de carte reliant les différents chapitres entre eux.",
    "Produisez ensuite une courte conclusion collective à la question : « Ce que l’EPS m’apprend pour agir de manière autonome et responsable ».",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C12-09",
  "Carte visuelle des compétences acquises",
  "Dessiner une grande carte visuelle avec, au centre, « EPS 8e AF », reliée par des flèches à plusieurs bulles représentant les grands domaines du manuel : mouvement et capacités, effort et sécurité, athlétisme, sports collectifs, gymnastique, jeux et activités haïtiennes, santé et autonomie. Style clair et synthétique, sans surcharge de texte.",
  "Une carte visuelle reliant l’ensemble des compétences développées pendant l’année de 8e AF.",
  "Servir de support à l’activité collective de synthèse « Notre carte des compétences EPS de 8e AF ».",
  "Paysage, format horizontal, carte conceptuelle centrale.",
));
children.push(spacer(200));

// ---- Autoévaluation finale ----
children.push(sectionHeading("Autoévaluation finale", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le bilan de ton année d’EPS en 8e AF. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne te demande jamais ton poids, tes mensurations, un comptage de calories, ta silhouette ou une comparaison avec d’autres élèves."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je connais mieux mon corps en mouvement", "", ""],
    ["Je gère mieux mon effort", "", ""],
    ["Je respecte les règles de sécurité", "", ""],
    ["Je coopère", "", ""],
    ["Je peux analyser une situation", "", ""],
    ["Je peux choisir une solution", "", ""],
    ["Je peux m’autoévaluer", "", ""],
    ["Je peux construire un petit projet responsable", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(160));
children.push(bodyPar("Mon principal progrès cette année : ____________________________________________________"));
children.push(bodyPar("Mon prochain objectif : ____________________________________________________"));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C12-10",
  "Scène finale positive",
  "Dessiner une scène positive d’un groupe d’élèves haïtiens de 8e AF présentant chacun leur projet personnel devant la classe, dans une ambiance chaleureuse et encourageante, sous la supervision bienveillante de l’enseignant. Diversité naturelle des élèves représentée avec dignité et réalisme.",
  "Des élèves présentant fièrement leur projet personnel d’activité physique, en fin d’année.",
  "Clore le manuel sur une scène positive valorisant l’autonomie et l’engagement des élèves.",
  "Paysage, format horizontal, vue d’ensemble chaleureuse.",
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Une activité physique régulière et adaptée contribue au fonctionnement du corps, à l’énergie et au bien-être, sans promesse médicale absolue.",
  "La régularité et la progressivité comptent plus que l’intensité maximale ; les rythmes diffèrent d’un élève à l’autre.",
  "Le repos, le sommeil, l’hydratation et une alimentation variée font partie d’une hygiène de vie équilibrée, sans régime ni restriction.",
  "L’hygiène corporelle autour de la pratique physique est liée au confort et au respect de soi et des autres.",
  "Être actif au quotidien passe par des occasions simples et sûres, adaptées aux ressources réellement disponibles.",
  "Un projet personnel d’activité physique suit un cycle : choisir, planifier, pratiquer, observer, ajuster.",
  "Un bon objectif est observable, jamais centré sur l’apparence, le poids ou une performance extrême.",
  "Suivre son projet avec un carnet simple valorise l’apprentissage, jamais des données corporelles sensibles.",
  "Savoir s’arrêter et demander de l’aide en cas de problème fait partie de l’autonomie responsable.",
  "Le bilan de fin d’année est toujours positif, non comparatif, et orienté vers la progression personnelle.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Ce manuel t’a fait progresser, chapitre après chapitre, vers six compétences : maîtriser, analyser, choisir, coopérer, justifier et t’autoévaluer. Ces compétences resteront utiles bien au-delà de la salle de classe et de l’année scolaire."
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(12));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(autonomie - récupération - hydratation - objectif - régularité - sécurité - planification - progression)", italics: true, color: "555555" },
]));
[
  "1. Agir de façon responsable sans attendre chaque consigne est une marque d’____________________.",
  "2. Le retour progressif du corps au calme après l’effort s’appelle la ____________________.",
  "3. Boire régulièrement pour compenser la perte d’eau s’appelle l’____________________.",
  "4. Un résultat clair et observable que l’on cherche à atteindre s’appelle un ____________________.",
  "5. Pratiquer une activité de façon constante dans le temps relève de la ____________________.",
  "6. Vérifier l’espace, le matériel et les conditions avant une activité est une règle de ____________________.",
  "7. Organiser à l’avance le moment, le lieu et les conditions d’une activité s’appelle la ____________________.",
  "8. Observer ses progrès personnels d’une semaine à l’autre permet de suivre sa ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que recommande ce chapitre au sujet de l’intensité de la pratique physique ?", opts: ["a) rechercher toujours l’intensité maximale", "b) privilégier la régularité et la progressivité", "c) s’entraîner intensément tous les jours sans repos", "d) comparer son intensité à celle des autres élèves"] },
  { q: "2. Sur quoi doit porter un objectif personnel d’activité physique, selon ce chapitre ?", opts: ["a) la perte de poids", "b) la transformation de l’apparence physique", "c) un résultat observable, comme la régularité ou une progression technique", "d) la comparaison avec les performances des autres élèves"] },
  { q: "3. Que doit faire un élève qui ressent un problème préoccupant pendant son projet personnel ?", opts: ["a) continuer sans en parler à personne", "b) arrêter l’activité et prévenir immédiatement un adulte responsable", "c) essayer de se soigner lui-même", "d) attendre que le problème disparaisse tout seul"] },
  { q: "4. Que doit contenir un carnet de suivi de projet personnel, selon ce chapitre ?", opts: ["a) le poids et les mensurations de l’élève", "b) l’activité réalisée, la participation, les sensations et un point à améliorer", "c) une comparaison avec les autres élèves de la classe", "d) un comptage précis de calories"] },
  { q: "5. Que valorise le bilan de fin d’année présenté dans ce chapitre ?", opts: ["a) le classement des élèves selon leurs performances", "b) la progression personnelle, de façon positive et non comparative", "c) uniquement les élèves les plus performants physiquement", "d) l’apparence physique des élèves"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Autonomie", "a) Fait de boire régulièrement pour compenser la perte d’eau"],
  ["2. Récupération", "b) Résultat clair et observable que l’on cherche à atteindre"],
  ["3. Hydratation", "c) Fait de pratiquer une activité de façon constante dans le temps"],
  ["4. Objectif", "d) Organisation à l’avance du moment, du lieu et des conditions d’une activité"],
  ["5. Régularité", "e) Capacité à agir de façon responsable sans attendre chaque consigne"],
  ["6. Planification", "f) Retour progressif du corps au calme après l’effort"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève prévoit un projet personnel très intense, sans aucun jour de repos entre les séances. Analyse ce projet et propose une version plus réaliste et responsable.",
  "2. Un élève organise ses séances d’activité physique sans jamais prévoir de temps de récupération après l’effort. Explique pourquoi cette organisation pose problème et propose une amélioration.",
  "3. Un élève prévoyait de marcher dans un espace sûr, mais les conditions changent (chaleur extrême, terrain devenu dangereux). Explique ce qu’il devrait faire, et pourquoi adapter son projet est une preuve de responsabilité, pas d’échec.",
  "4. Un élève formule son objectif personnel comme « avoir un corps plus musclé rapidement ». Explique pourquoi cet objectif ne correspond pas à ce que recommande ce chapitre, et reformule-le en objectif observable et approprié.",
  "5. Un élève souhaite construire un projet personnel, mais sa famille ne dispose que de très peu de ressources matérielles. Propose une façon d’adapter son projet à ce contexte réel, sans jamais le présenter comme un défaut ou une infériorité.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 153, "Manuel_EPS_8AF_Chapitre12.docx");
console.log("Chapitre 12 (8e AF) genere:", outPath);
