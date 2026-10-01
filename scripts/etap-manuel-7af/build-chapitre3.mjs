// Manuel d'ETAP 7e AF — Chapitre 3 : Le recyclage des objets techniques
// (champ officiel : Metiers du recyclage et des energies renouvelables).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.42-43/77 (programme detaille 7e AF, unite "Les metiers du recyclage
//       et des energies renouvelables en 7e annee du fondamental") :
//       competence ciblee, savoirs/savoir-faire, activites, modalites et
//       criteres d'evaluation.
// Constat important, verifie directement dans le texte : pour la 7e AF, le
// contenu detaille de cette unite porte entierement sur le RECYCLAGE (cycle
// de vie, collecte/tri/traitement/revalorisation, outils de gestion des
// dechets, metiers du recyclage, reemploi d'objets obsoletes) — AUCUN savoir
// relatif aux energies renouvelables (solaire, eolien...) n'apparait a ce
// niveau ; ce contenu n'apparait que dans l'unite 8e AF (p.49-50), et n'a
// donc pas ete utilise ici, conformement a la regle interdisant de completer
// le niveau 7e AF avec du contenu 8e/9e AF. Le titre verrouille du chapitre
// ("Le recyclage des objets techniques") est de ce fait deja fidele au
// contenu reel du programme pour la 7e AF.
//
// Regle de securite stricte appliquee : aucune activite ne demande a
// l'eleve de manipuler des dechets dangereux, du verre casse, des objets
// coupants, des batteries endommagees, des fils electriques ou tout autre
// materiel a risque. L'atelier pratique se limite a des materiaux surs et
// propres (plastique, carton, papier, capsules non tranchantes).
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_METIER_FILL, BOX_METIER_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  VERT, CUIVRE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  3,
  "Le recyclage des objets techniques",
  "Une bouteille en plastique vide, un vieux seau fissuré, une radio qui ne s'allume plus... Que deviennent " +
  "ces objets une fois qu'ils ne servent plus ? Ce chapitre t'aide à comprendre ce qui se passe après la fin de " +
  "vie d'un objet technique.",
  [
    "Décrire le cycle de vie d'un objet technique.",
    "Distinguer un objet recyclable d'un objet qui ne l'est pas.",
    "Comprendre les étapes du recyclage : collecte, tri, traitement, revalorisation.",
    "Reconnaître des outils utilisés pour la gestion des déchets.",
    "Découvrir des métiers liés au recyclage.",
    "Comprendre l'intérêt de réemployer un objet plutôt que de le jeter.",
    "Expliquer les effets d'une mauvaise gestion des déchets sur l'environnement.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans le quartier de Fabiola, aux Cayes, les déchets s'accumulent parfois au bord de la " +
  "route parce que personne ne sait vraiment quoi en faire. Pourtant, certains objets jetés — bouteilles, " +
  "boîtes, morceaux de bois — pourraient encore servir. Ce chapitre va t'aider à comprendre comment.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Cycle de vie — ensemble des étapes de la vie d'un objet, de sa fabrication à sa fin d'usage."));
children.push(bulletPar("Recyclable — qui peut être transformé pour fabriquer un nouvel objet."));
children.push(bulletPar("Collecte — action de rassembler les déchets pour les traiter."));
children.push(bulletPar("Tri — action de séparer les déchets selon leur type."));
children.push(bulletPar("Revalorisation — action de redonner de la valeur à un déchet ou à un objet usagé."));
children.push(bulletPar("Réemploi — utilisation d'un objet, ou de ses parties, pour un nouvel usage."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le cycle de vie d'un objet technique", "3.1"));
children.push(bodyPar(
  "Tout objet technique a une vie : il est d'abord fabriqué, puis utilisé — parfois pendant plusieurs années — " +
  "avant de devenir inutilisable ou d'être remplacé. C'est ce que l'on appelle son cycle de vie. Quand un objet " +
  "arrive en fin de vie, deux possibilités existent : certains objets sont recyclables (le plastique, le carton, " +
  "certains métaux), tandis que d'autres ne le sont pas, ou le sont plus difficilement.",
));
children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-01",
  "Le cycle de vie d'un objet technique",
  "Scène d'ouverture dans un quartier haïtien : une bouteille en plastique, un vieux seau et une radio hors " +
  "d'usage posés côte à côte, avec une frise simple montrant fabrication → utilisation → fin de vie.",
  "Tout objet technique suit un cycle : il naît, il sert, puis il arrive en fin de vie.",
  "Introduire visuellement la notion de cycle de vie avant le développement du chapitre.",
  "Illustration pleine largeur, contexte haïtien reconnaissable, ton neutre et pédagogique.",
));
children.push(spacer(160));

children.push(calloutBox(
  "OBSERVER — Recyclable ou non ?",
  [
    "Souvent recyclables : bouteilles en plastique, boîtes en carton, canettes, certains métaux.",
    "Difficilement recyclables ou non recyclables : certains emballages mélangés, objets électroniques complexes.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Découvrir le processus de recyclage", "3.2"));
children.push(bodyPar(
  "Recycler un objet ne se fait pas en une seule étape. Le programme distingue quatre grandes étapes : la " +
  "collecte (rassembler les déchets), le tri (les séparer selon leur type), le traitement (les préparer pour " +
  "être réutilisés) et la revalorisation (leur redonner une valeur, sous forme de matière ou de nouvel objet).",
));

children.push(calloutBox(
  "TECHNIQUE — Les quatre étapes du recyclage",
  [
    "1. Collecte : rassembler les déchets.",
    "2. Tri : séparer les déchets selon leur type (plastique, carton, métal...).",
    "3. Traitement : préparer les matériaux triés (nettoyage, transformation...).",
    "4. Revalorisation : redonner une valeur au déchet, sous forme de matière première ou de nouvel objet.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-03",
  "Schéma des quatre étapes du recyclage",
  "Schéma en 4 cases reliées par des flèches : collecte → tri → traitement → revalorisation, avec un petit " +
  "pictogramme pour chaque étape.",
  "Le recyclage suit toujours les mêmes grandes étapes.",
  "Fixer visuellement l'ordre des étapes du processus de recyclage.",
  "Schéma horizontal, pleine largeur, style pédagogique clair et coloré.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les outils de la gestion des déchets", "3.3"));
children.push(bodyPar(
  "Autour de l'école ou dans une entreprise de recyclage, plusieurs outils permettent de gérer les déchets. Les " +
  "plus simples, comme la corbeille de tri sélectif ou la poubelle écologique, peuvent être utilisés par tout le " +
  "monde. D'autres, comme la benne, le camion à bascule ou la pelle mécanisée, sont réservés à des " +
  "professionnels formés.",
));

children.push(calloutBox(
  "OUTIL — Des plus simples aux plus spécialisés",
  [
    "Outils utilisables par tous : corbeille de tri sélectif, poubelle écologique.",
    "Outils professionnels : benne, camion à bascule, pelle mécanisée.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, "343B42",
));
children.push(spacer(160));

children.push(calloutBox(
  "SÉCURITÉ",
  [
    "La benne, le camion à bascule et la pelle mécanisée sont manipulés uniquement par des adultes formés : un " +
    "élève ne doit jamais s'approcher de ces engins en fonctionnement ni essayer de les utiliser.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-02",
  "Observer et identifier des matériaux récupérables",
  "Un élève, en classe ou dans la cour de l'école, observe et identifie des objets propres et sûrs pouvant être " +
  "récupérés (bouteille en plastique, boîte en carton), sans manipuler de déchets dangereux.",
  "Observer avant de trier : identifier ce qui peut être récupéré.",
  "Montrer une démarche d'observation sûre, réalisable par un élève de 7e AF.",
  "Illustration demi-page, scène scolaire haïtienne, ambiance calme et encadrée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les métiers du recyclage", "3.4"));
children.push(bodyPar(
  "Le recyclage fait vivre plusieurs métiers, souvent moins connus que ceux de la pêche ou de l'agriculture, " +
  "mais tout aussi importants pour la communauté. En voici quelques exemples.",
));

children.push(calloutBox(
  "MÉTIER — Quelques métiers du recyclage",
  [
    "Technicien de traitement de déchets : prépare et transforme les déchets collectés.",
    "Conseiller en gestion des déchets : aide les communautés à mieux organiser le tri et la collecte.",
    "Ingénieur environnement : étudie l'impact des déchets et propose des solutions.",
    "Responsable de qualité et de sécurité de l'environnement : veille au respect des règles de sécurité et d'environnement.",
  ],
  BOX_METIER_FILL, BOX_METIER_LINE, "6B3512",
));
children.push(spacer(160));
children.push(bodyPar(
  "Dans de nombreux quartiers haïtiens, des initiatives locales et des ateliers d'artisanat transforment déjà " +
  "des déchets (plastique, bois, métal) en objets utiles ou décoratifs — une forme de recyclage à petite " +
  "échelle, proche de ce que tu vas découvrir à la section suivante.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-07",
  "Une initiative locale de valorisation des déchets",
  "Un artisan dans son atelier, transformant des bouteilles en plastique ou des chutes de bois en objets utiles " +
  "(pot, jouet simple, objet décoratif), dans un contexte haïtien crédible.",
  "Le recyclage peut aussi être une activité artisanale et créatrice de revenus.",
  "Montrer un métier ou une initiative locale liée à la valorisation des déchets.",
  "Illustration pleine largeur, scène d'atelier artisanal, ambiance positive et valorisante.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Donner une seconde vie aux objets : le réemploi", "3.5"));
children.push(bodyPar(
  "Avant même de recycler un objet, on peut parfois lui donner une seconde vie directement : c'est ce qu'on " +
  "appelle le réemploi. Un objet devenu inutile pour son usage d'origine peut, avec un peu d'imagination, servir " +
  "à fabriquer ou à utiliser un nouvel objet.",
));

children.push(calloutBox(
  "DÉCOUVRIR — Exemples de réemploi",
  [
    "Une bouteille en plastique devient un petit pot pour une plante.",
    "Une boîte en carton devient une boîte de rangement ou un support pour une maquette.",
    "Une chute de bois devient un jouet simple ou un objet décoratif.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-04",
  "Les étapes d'une démarche de réemploi",
  "Frise en 3-4 étapes : objet en fin d'usage → nettoyage/préparation → transformation simple → nouvel objet " +
  "utile, illustrée avec une bouteille en plastique devenant un pot pour une plante.",
  "Le réemploi suit lui aussi une petite démarche, du repérage de l'objet à son nouvel usage.",
  "Rendre concrète la démarche de réemploi à travers un exemple simple et sûr.",
  "Frise horizontale, pleine largeur, style schématique et coloré.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les impacts du recyclage sur l'environnement", "3.6"));
children.push(bodyPar(
  "Bien gérer les déchets a des effets positifs sur l'environnement proche (le quartier, l'école) mais aussi, à " +
  "plus grande échelle, sur tout le pays. À l'inverse, une mauvaise gestion des déchets — les jeter n'importe " +
  "où, ne pas les trier — peut boucher les canaux d'évacuation d'eau, polluer les sols et l'eau, et nuire à la " +
  "santé de tous.",
));

children.push(calloutBox(
  "ENVIRONNEMENT — Bien gérer les déchets, à toutes les échelles",
  [
    "À l'échelle du quartier : moins de déchets au sol, moins de risques d'inondation liés aux canaux bouchés.",
    "À l'échelle du pays : préservation des sols, de l'eau et de la santé publique.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-06",
  "Les effets d'une mauvaise gestion des déchets",
  "Illustration en deux parties : à gauche, un caniveau bouché par des déchets et de l'eau stagnante ; à " +
  "droite, la même rue propre avec des déchets correctement triés — sans images choquantes.",
  "Une mauvaise gestion des déchets a des conséquences visibles sur l'environnement proche.",
  "Faire comprendre concrètement pourquoi la gestion des déchets est importante, sans dramatiser à l'excès.",
  "Illustration en deux vignettes comparatives, pleine largeur, contexte haïtien.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Résoudre un problème de gestion des déchets", "3.7"));
children.push(bodyPar(
  "Reprenons la situation de Fabiola et de son quartier, présentée au début du chapitre. Avec ta classe, " +
  "réfléchis à une solution simple pour mieux gérer les déchets autour de l'école.",
));
children.push(twoColTable(
  "Étape de la démarche", "Application à la situation du quartier de Fabiola",
  [
    ["1. Identifier le besoin", "Éviter que les déchets s'accumulent au bord de la route."],
    ["2. Rechercher des solutions", "Mettre en place un tri sélectif à l'école, sensibiliser les familles, organiser une collecte régulière."],
    ["3. Choisir et préparer", "La classe choisit une solution réalisable avec les moyens de l'école."],
    ["4. Réaliser", "Mettre en place la solution choisie (par exemple, des points de tri simples à l'école)."],
    ["5. Tester et évaluer", "Observer, après quelques semaines, si la quantité de déchets au sol a diminué."],
    ["6. Améliorer si nécessaire", "Ajuster l'organisation si le tri n'est pas encore bien suivi."],
  ],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Atelier de tri et de seconde vie"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Trier des matériaux récupérables et proposer une idée simple de réemploi." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Matériaux propres et sûrs apportés de la maison : bouteilles en plastique vides, boîtes en carton, morceaux de papier, capsules de bouteille non tranchantes. Aucun déchet dangereux, cassé ou coupant ne doit être apporté." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Travail en petits groupes de 3 à 4 élèves, en classe." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Rassemble les matériaux apportés par ton groupe et prépare-toi à les trier puis à imaginer un réemploi simple." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Trie les matériaux du groupe selon leur type (plastique, carton, papier, autre)."));
children.push(numberedPar("2. Pour chaque type, indique s'il te semble recyclable et pourquoi."));
children.push(numberedPar("3. Choisis un objet et imagine, à l'oral ou par un dessin, un réemploi simple pour lui."));
children.push(numberedPar("4. Complète le tableau d'observation ci-dessous."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Tableau à compléter :", { bold: true }));
children.push(threeColTable(
  ["Matériau observé", "Type (plastique / carton / papier / autre)", "Idée de réemploi"],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  [3000, 3200, 2800],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Quel matériau était le plus facile à trier ? Pourquoi ?"));
children.push(numberedPar("2. En quoi le réemploi que tu as imaginé évite-t-il de jeter l'objet ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "D'après cet atelier, quel geste simple pourrais-tu adopter chez toi pour mieux gérer tes déchets ?" }]));
children.push(spacer(80));

children.push(calloutBox(
  "RÈGLES DE SÉCURITÉ pour cette activité",
  [
    "N'apporter que des matériaux propres, secs et non coupants.",
    "Ne jamais apporter de verre cassé, de métal tranchant, de batterie ou de produit chimique.",
    "Se laver les mains après la manipulation des matériaux.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-05",
  "L'atelier de tri en classe",
  "Un petit groupe d'élèves de 7e AF, en classe, triant des matériaux propres (bouteilles en plastique, boîtes " +
  "en carton) sur une table, dans une ambiance organisée et sûre.",
  "Trier et réfléchir au réemploi, avec des matériaux simples et sûrs.",
  "Illustrer concrètement le déroulement de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — La gestion des déchets près de chez moi"));
children.push(bodyPar(
  "Avec l'accord et sous la supervision d'un adulte responsable, observe comment les déchets sont gérés à " +
  "l'école ou dans ton quartier (poubelles, tri, collecte). Tu peux aussi interroger une personne responsable de " +
  "cette gestion (agent d'entretien, membre d'une initiative locale). N'entre jamais en contact direct avec des " +
  "déchets non triés ou potentiellement dangereux : cette enquête se fait par observation et par échange.",
));
children.push(threeColTable(
  ["Lieu observé", "Comment les déchets sont-ils gérés ?", "Une amélioration possible"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [2800, 3600, 2600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'analyse — Une situation à résoudre"));
children.push(bodyPar(
  "L'école de ton quartier n'a qu'une seule poubelle pour tous les types de déchets, et celle-ci déborde " +
  "souvent avant la fin de la semaine.",
));
children.push(numberedPar("1. Quel est le besoin exact à résoudre dans cette situation ?"));
children.push(numberedPar("2. Propose une solution simple, en t'appuyant sur ce que tu as appris sur le tri et le recyclage."));
children.push(numberedPar("3. Quel métier ou quelle personne, vu(e) dans ce chapitre, pourrait aider l'école à mettre en place ta solution ?"));
children.push(numberedPar("4. Quelle règle de sécurité faudrait-il rappeler aux élèves qui participeraient au tri ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Tout objet technique a un cycle de vie : fabrication, utilisation, fin de vie.",
    "Un objet en fin de vie peut être recyclable ou non recyclable.",
    "Le recyclage suit quatre étapes : collecte, tri, traitement, revalorisation.",
    "Certains outils de gestion des déchets sont utilisables par tous ; d'autres sont réservés aux professionnels.",
    "Le recyclage fait vivre des métiers comme technicien de traitement de déchets ou ingénieur environnement.",
    "Le réemploi donne une seconde vie à un objet, avant même son recyclage.",
    "Une bonne gestion des déchets protège l'environnement, du quartier jusqu'à l'échelle du pays.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire le cycle de vie d'un objet technique.",
    "☐ Expliquer la différence entre un objet recyclable et un objet qui ne l'est pas.",
    "☐ Nommer les quatre étapes du recyclage dans l'ordre.",
    "☐ Citer un outil simple et un outil professionnel de gestion des déchets.",
    "☐ Citer au moins un métier lié au recyclage.",
    "☐ Expliquer ce qu'est le réemploi et donner un exemple.",
    "☐ Expliquer un effet d'une mauvaise gestion des déchets sur l'environnement.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : cycle de vie, recyclable, collecte, tri, traitement, revalorisation, réemploi, " +
    "métiers du recyclage.",
    "Vocabulaire clé à maîtriser : corbeille de tri sélectif, poubelle écologique, technicien de traitement de " +
    "déchets, ingénieur environnement.",
    "Avant l'évaluation, vérifie que tu peux : citer les 4 étapes du recyclage dans l'ordre ; expliquer la " +
    "différence entre recyclage et réemploi ; expliquer une conséquence d'une mauvaise gestion des déchets.",
    "Question rapide de vérification : cite un objet recyclable et un exemple de réemploi pour un objet en fin de vie.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "revalorisation · cycle de vie · tri · réemploi · collecte · recyclable · ingénieur environnement · traitement.",
  { italics: true },
));
children.push(numberedPar("1. L'ensemble des étapes de la vie d'un objet, de sa fabrication à sa fin d'usage, s'appelle son ......................"));
children.push(numberedPar("2. Un objet ...................... peut être transformé pour fabriquer un nouvel objet."));
children.push(numberedPar("3. La première étape du recyclage consiste à rassembler les déchets : c'est la ......................"));
children.push(numberedPar("4. Séparer les déchets selon leur type s'appelle le ......................"));
children.push(numberedPar("5. Préparer les matériaux triés (nettoyage, transformation) s'appelle le ......................"));
children.push(numberedPar("6. Redonner de la valeur à un déchet s'appelle la ......................"));
children.push(numberedPar("7. Utiliser un objet en fin de vie pour un nouvel usage, sans le transformer complètement, s'appelle le ......................"));
children.push(numberedPar("8. Un ...................... étudie l'impact des déchets sur l'environnement."));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Le cycle de vie d'un objet technique comprend :"));
children.push(bulletPar("a) uniquement sa fabrication"));
children.push(bulletPar("b) sa fabrication, son utilisation et sa fin de vie"));
children.push(bulletPar("c) uniquement son recyclage"));
children.push(spacer(60));
children.push(numberedPar("2. Quelle est la première étape du processus de recyclage ?"));
children.push(bulletPar("a) le tri"));
children.push(bulletPar("b) la collecte"));
children.push(bulletPar("c) la revalorisation"));
children.push(spacer(60));
children.push(numberedPar("3. Lequel de ces outils est réservé à des professionnels formés ?"));
children.push(bulletPar("a) la corbeille de tri sélectif"));
children.push(bulletPar("b) la poubelle écologique"));
children.push(bulletPar("c) le camion à bascule"));
children.push(spacer(60));
children.push(numberedPar("4. Transformer une bouteille en plastique en pot pour une plante est un exemple de :"));
children.push(bulletPar("a) collecte"));
children.push(bulletPar("b) réemploi"));
children.push(bulletPar("c) traitement industriel"));
children.push(spacer(60));
children.push(numberedPar("5. Une mauvaise gestion des déchets peut notamment :"));
children.push(bulletPar("a) améliorer la qualité de l'eau"));
children.push(bulletPar("b) boucher les canaux d'évacuation d'eau"));
children.push(bulletPar("c) n'avoir aucun effet"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Tri", "a. Redonner de la valeur à un déchet ou à un objet usagé."],
    ["2. Revalorisation", "b. Personne qui prépare et transforme les déchets collectés."],
    ["3. Réemploi", "c. Rassembler les déchets pour les traiter."],
    ["4. Collecte", "d. Séparer les déchets selon leur type."],
    ["5. Technicien de traitement de déchets", "e. Ensemble des étapes de la vie d'un objet."],
    ["6. Cycle de vie", "f. Donner un nouvel usage à un objet en fin de vie."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Choisis un objet technique de ta maison arrivé en fin de vie et décris son cycle de vie, du début à la fin."));
children.push(numberedPar("2. Explique, avec tes propres mots, la différence entre le recyclage et le réemploi."));
children.push(numberedPar("3. Propose une action simple, réalisable par des élèves, pour améliorer la gestion des déchets de ton école."));
children.push(numberedPar("4. Un camarade veut trier lui-même des déchets trouvés dans la rue, y compris des objets cassés. Que lui conseilles-tu, et pourquoi ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de comprendre que tout objet technique suit un cycle de vie, et qu'en fin de vie, un " +
  "objet peut être recyclable ou non. Tu as découvert les quatre étapes du recyclage — collecte, tri, " +
  "traitement, revalorisation — ainsi que des outils simples et des outils professionnels utilisés pour la " +
  "gestion des déchets, et plusieurs métiers liés au recyclage. Tu as aussi appris que le réemploi permet de " +
  "donner une seconde vie à un objet, et que la gestion des déchets a des effets réels sur l'environnement, du " +
  "quartier jusqu'à l'échelle du pays. Ces notions te préparent à comprendre, dans le prochain chapitre, " +
  "d'autres métiers qui, eux aussi, dépendent d'une bonne gestion des ressources.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "cycle de vie · recyclable · collecte · tri · traitement · revalorisation · réemploi · technicien de " +
  "traitement de déchets · ingénieur environnement.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C03-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Le recyclage des objets techniques », avec des branches vers : cycle " +
  "de vie, étapes du recyclage, outils, métiers, réemploi, environnement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, sobre.",
));

await buildAndSave(children, 30, "Manuel_ETAP_7AF_Chapitre3.docx");
