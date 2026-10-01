// Manuel d'ETAP 8e AF — Chapitre 2 : Concevoir un prototype : metiers de la
// mer (champ officiel : Metiers de la mer generateurs de revenus).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.48-49/77 (programme detaille 8e AF, unite "Les metiers de la mer
//       generateurs de revenus en 8e annee du fondamental") : competence
//       ciblee, savoirs/savoir-faire (fonction d'usage, fonctions de
//       contraintes, mecanismes, evolution historique, cahier des charges,
//       croquis/maquettes/prototypes), activites, modalites/criteres.
// Cette unite a deja ete lue et verifiee integralement a deux reprises
// pendant les phases precedentes de ce projet (preparation du Chapitre 1 de
// la 7e AF puis Phase 0 ETAP 8e AF) : meme texte, meme pages, aucune
// divergence. Non re-telechargee une troisieme fois (document statique deja
// capture avec son contexte complet) ; les pages restent p.48-49.
//
// Regle de securite stricte appliquee : aucune activite ne demande a
// l'eleve de se rendre en mer, de manipuler une embarcation ou un outil de
// peche reel, ou de travailler sans supervision pres de l'eau. Le
// "prototype" reste une maquette pedagogique en materiaux scolaires surs
// (papier, carton), jamais un objet destine a un usage reel en mer.
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
  2,
  "Concevoir un prototype : métiers de la mer",
  "L'an dernier, tu as observé et décrit des outils utilisés dans les métiers de la mer. Cette année, tu vas " +
  "aller plus loin : comprendre pourquoi ces outils sont conçus ainsi, et participer, en équipe, à la conception " +
  "d'un prototype simple.",
  [
    "Analyser la fonction et les contraintes d'un outil des métiers de la mer.",
    "Comparer l'évolution d'un outil dans le temps.",
    "Comprendre ce qu'est un cahier des charges.",
    "Imaginer et choisir une solution technique en équipe.",
    "Réaliser un croquis puis une maquette simple et sûre.",
    "Présenter et expliquer un prototype.",
    "Proposer des solutions techniques respectueuses de l'environnement marin.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Au débarcadère de Anse-à-Veau, les pêcheurs transportent le poisson du bateau jusqu'au " +
  "marché dans de vieux sacs en plastique, qui se déchirent souvent et laissent le poisson s'abîmer au soleil. " +
  "Une classe de 8e AF décide de concevoir, à titre d'exercice scolaire, un prototype de panier de transport " +
  "mieux adapté. C'est cette démarche que tu vas suivre dans ce chapitre.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Fonction d'usage — ce à quoi sert réellement un outil pour son utilisateur."));
children.push(bulletPar("Fonction de contrainte — exigence que doit respecter un outil (technique, économique, écologique, ergonomique...)."));
children.push(bulletPar("Mécanisme — dispositif qui transmet ou transforme un mouvement (poulie, levier, système de transmission)."));
children.push(bulletPar("Cahier des charges — liste des exigences que doit respecter une solution technique avant sa conception."));
children.push(bulletPar("Croquis — dessin simple et rapide qui représente une idée de solution."));
children.push(bulletPar("Maquette — représentation en volume, à échelle réduite, d'un objet à concevoir."));
children.push(bulletPar("Prototype — premier exemplaire construit d'une solution technique, pour la tester et l'évaluer."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : décrire un outil des métiers de la mer", "2.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à reconnaître des outils des métiers de la mer (filet, pirogue, canne à pêche, " +
  "GPS...) et à comprendre l'organisation du travail autour d'eux. Cette année, tu vas apprendre à analyser un " +
  "outil plus en profondeur : à quoi sert-il exactement, et pourquoi a-t-il été conçu de cette façon ?",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Observer et analyser un outil : fonction et contraintes", "2.2"));
children.push(bodyPar(
  "Chaque outil technique répond à une fonction d'usage précise, mais sa conception doit aussi respecter des " +
  "fonctions de contraintes : des exigences techniques, économiques, écologiques, environnementales ou " +
  "ergonomiques. Beaucoup d'outils utilisent aussi des mécanismes, comme des poulies, des leviers ou des " +
  "systèmes de transmission, pour faciliter le travail.",
));

children.push(calloutBox(
  "OBSERVER — Analyser un outil des métiers de la mer",
  [
    "Fonction d'usage : à quoi sert cet outil ? (ex. un panier sert à transporter le poisson)",
    "Fonctions de contraintes : quelles exigences doit-il respecter ? (léger, résistant, peu coûteux, ne nuit pas à l'environnement, facile à manipuler)",
    "Mécanisme éventuel : utilise-t-il une poulie, un levier, un système de transmission ?",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-01",
  "Contexte professionnel : le débarcadère",
  "Scène d'ouverture : un débarcadère haïtien avec des pêcheurs déchargeant du poisson, des paniers et des " +
  "outils simples visibles, ambiance de travail organisée, sans activité en mer.",
  "La conception technique part toujours de l'observation d'une situation réelle.",
  "Ancrer le chapitre dans un contexte professionnel crédible avant d'entrer dans l'analyse technique.",
  "Illustration pleine largeur, scène de débarcadère haïtien, réaliste et paisible.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-02",
  "Observer un outil : fonction et contraintes",
  "Un outil simple des métiers de la mer (par exemple un panier ou une nasse) présenté avec des légendes " +
  "pointant sa fonction d'usage et deux ou trois contraintes (matériau, poids, résistance).",
  "Analyser un outil, c'est identifier sa fonction et les exigences qu'il doit respecter.",
  "Illustrer concrètement la démarche d'analyse d'un outil technique.",
  "Illustration demi-page, schéma annoté, fond neutre.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("L'évolution des outils dans le temps", "2.3"));
children.push(bodyPar(
  "Les outils des métiers de la mer ont évolué au fil du temps : les matériaux utilisés, l'énergie nécessaire " +
  "pour les faire fonctionner, les choix techniques et les règles de sécurité pour les utilisateurs ont changé. " +
  "Comparer un outil ancien et un outil plus récent permet de comprendre pourquoi ces évolutions ont eu lieu.",
));

children.push(twoColTable(
  "Hier", "Aujourd'hui",
  [
    ["Matériaux naturels (bois, fibres végétales)", "Matériaux plus résistants ou plus légers (plastique recyclé, métal traité)"],
    ["Force humaine uniquement", "Parfois assistée par un mécanisme simple (poulie, treuil)"],
    ["Peu de règles de sécurité formalisées", "Attention plus grande portée à la sécurité des utilisateurs"],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces évolutions ont aussi un impact sur l'écosystème marin : un matériau mal choisi ou un outil mal entretenu " +
  "peut devenir un déchet dans la mer. C'est une contrainte que tout concepteur doit garder à l'esprit.",
));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-03",
  "L'évolution d'un outil dans le temps",
  "Illustration comparative en deux vignettes : un outil traditionnel en matériaux naturels à gauche, une " +
  "version plus récente du même outil à droite, avec de courtes légendes sur les différences.",
  "Un outil évolue selon les matériaux, l'énergie disponible et les besoins de sécurité.",
  "Rendre concrète la notion d'évolution historique d'un outil technique.",
  "Illustration en deux vignettes comparatives, pleine largeur, contexte haïtien.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le cahier des charges : point de départ de la conception", "2.4"));
children.push(bodyPar(
  "Avant de concevoir un outil, il faut définir un cahier des charges : la liste des exigences que la solution " +
  "devra respecter. Reprenons l'exemple du panier de transport du poisson.",
));

children.push(threeColTable(
  ["Besoin", "Fonction attendue", "Contraintes à respecter"],
  [
    ["Transporter le poisson du bateau au marché sans l'abîmer", "Contenir et protéger le poisson pendant le transport", "Léger, résistant, laisse s'écouler l'eau, matériaux peu coûteux et disponibles localement, ne pollue pas s'il est abandonné"],
  ],
  [3000, 3200, 3200],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-04",
  "Du besoin au cahier des charges",
  "Schéma simple en trois cases reliées par des flèches : besoin → fonction attendue → contraintes à " +
  "respecter, illustré avec l'exemple du panier de transport du poisson.",
  "Un cahier des charges relie un besoin réel à des exigences précises.",
  "Faire comprendre la construction d'un cahier des charges simple.",
  "Schéma horizontal, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Imaginer et choisir une solution", "2.5"));
children.push(bodyPar(
  "À partir du cahier des charges, plusieurs solutions sont possibles. Il est utile d'en imaginer plusieurs en " +
  "équipe, puis de les comparer selon des critères simples avant d'en choisir une.",
));

children.push(calloutBox(
  "PROJET — Comparer des solutions",
  [
    "Solution A répond-elle à toutes les contraintes du cahier des charges ?",
    "Solution B est-elle réalisable avec les matériaux disponibles à l'école ?",
    "Quelle solution est la plus simple à fabriquer, tout en respectant l'environnement ?",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-05",
  "Travail collaboratif : imaginer plusieurs solutions",
  "Un groupe d'élèves de 8e AF autour d'une table, dessinant plusieurs croquis d'idées différentes pour le " +
  "même besoin, en discutant.",
  "Concevoir, c'est d'abord imaginer plusieurs solutions avant d'en choisir une.",
  "Illustrer concrètement le travail collectif de recherche de solutions.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance de réflexion collective.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Du croquis à la maquette", "2.6"));
children.push(bodyPar(
  "Une fois la solution choisie, l'équipe réalise un croquis annoté (un dessin simple avec des légendes), puis " +
  "une maquette : une représentation en volume, à échelle réduite, réalisée avec des matériaux scolaires sûrs " +
  "(papier, carton, colle). La maquette permet de mieux visualiser la solution avant d'aller plus loin — elle " +
  "reste un objet pédagogique, jamais un outil destiné à un usage réel en mer.",
));

children.push(calloutBox(
  "TECHNIQUE — Du croquis à la maquette",
  [
    "1. Croquis : dessiner la solution choisie, avec des légendes (matériaux, dimensions approximatives).",
    "2. Découpage et façonnage : préparer les éléments en carton ou en papier.",
    "3. Assemblage : coller ou plier les parties pour former la maquette.",
    "4. Vérification : la maquette correspond-elle bien au cahier des charges ?",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Sécurité pendant la conception", "2.7"));
children.push(calloutBox(
  "SÉCURITÉ",
  [
    "Utiliser uniquement des matériaux scolaires sûrs : papier, carton, colle, ciseaux à bouts ronds.",
    "Ne jamais utiliser d'outil tranchant, motorisé ou électrique pour réaliser la maquette.",
    "La maquette reste un objet pédagogique : elle ne doit jamais être utilisée en situation réelle, ni testée en mer ou dans l'eau.",
    "Toute manipulation d'un outil professionnel réel (filet, hameçon, embarcation) reste réservée aux adultes formés — l'élève ne fait qu'observer ou décrire ces outils.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Concevoir en préservant la ressource marine", "2.8"));
children.push(bodyPar(
  "Le programme encourage à rechercher des solutions techniques écologiques face aux problèmes rencontrés " +
  "dans les métiers de la mer. En concevant un prototype, il est donc important de se demander : ce choix de " +
  "matériau ou de solution risque-t-il de nuire à l'écosystème marin s'il est abandonné ou mal utilisé ?",
));

children.push(calloutBox(
  "ENVIRONNEMENT — Concevoir de façon responsable",
  [
    "Préférer des matériaux qui ne polluent pas s'ils finissent dans la nature.",
    "Éviter le gaspillage de matériaux lors de la fabrication de la maquette.",
    "Réfléchir à ce que devient l'objet une fois qu'il n'est plus utilisé.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-06",
  "Concevoir en pensant à l'environnement marin",
  "Illustration montrant une maquette de panier réalisée en matériaux simples, avec en arrière-plan une mer " +
  "propre, suggérant un choix de conception respectueux de l'environnement.",
  "Une bonne conception technique prend en compte son impact sur l'environnement marin.",
  "Relier concrètement la démarche de conception à la préservation de la ressource marine.",
  "Illustration pleine largeur, scène côtière haïtienne, ton positif.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Présenter et expliquer son prototype", "2.9"));
children.push(bodyPar(
  "La conception ne s'arrête pas à la fabrication de la maquette : il faut aussi savoir la présenter et " +
  "expliquer les choix effectués.",
));
children.push(numberedPar("1. Quel était le besoin de départ ?"));
children.push(numberedPar("2. Quelles contraintes du cahier des charges votre solution respecte-t-elle ?"));
children.push(numberedPar("3. Pourquoi avez-vous choisi cette solution plutôt qu'une autre ?"));
children.push(numberedPar("4. Que pourrait-on améliorer si vous aviez plus de temps ou de matériel ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de conception collective — Concevoir un panier de transport du poisson"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Concevoir, en équipe, un prototype pédagogique de panier de transport du poisson respectant un cahier des charges simple." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier, carton léger, ciseaux à bouts ronds, colle, crayons de couleur. Aucun matériau dangereux ou tranchant motorisé." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Groupes de 4 à 5 élèves." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Votre panier doit être léger, laisser s'écouler l'eau, et être réalisable avec des matériaux simples." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Relisez le cahier des charges (section 2.4)."));
children.push(numberedPar("2. Imaginez au moins deux solutions possibles et dessinez un croquis rapide de chacune."));
children.push(numberedPar("3. Choisissez la solution la plus adaptée, en expliquant pourquoi."));
children.push(numberedPar("4. Réalisez une maquette simple en carton, à partir du croquis choisi."));
children.push(numberedPar("5. Vérifiez que votre maquette respecte les contraintes du cahier des charges."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Fiche de conception :", { bold: true }));
children.push(threeColTable(
  ["Élément", "Description", "Remarque"],
  [
    ["Solution choisie", "", ""],
    ["Matériaux utilisés", "", ""],
    ["Contrainte la plus difficile à respecter", "", ""],
  ],
  [3000, 3400, 2600],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Votre solution respecte-t-elle toutes les contraintes du cahier des charges ? Sinon, laquelle est la plus difficile à satisfaire ?"));
children.push(numberedPar("2. En quoi le travail en équipe a-t-il aidé à améliorer votre solution ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre prototype à la classe en expliquant votre démarche de conception." }]));
children.push(spacer(80));

children.push(calloutBox(
  "RÈGLES DE SÉCURITÉ pour cette activité",
  [
    "Utiliser uniquement papier, carton et colle — aucun outil tranchant motorisé.",
    "La maquette reste un objet scolaire, jamais destiné à un usage réel en mer.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-07",
  "Exemple de maquette réalisée en classe",
  "Une maquette simple de panier en carton posée sur une table, entourée des croquis préparatoires, dans un " +
  "environnement de classe haïtien.",
  "Le résultat d'une démarche de conception peut rester simple et sûr.",
  "Montrer un exemple concret et réalisable du résultat attendu de l'activité de conception.",
  "Illustration pleine largeur, photo-like scolaire, éléments bien identifiables.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / analyse — Un outil des métiers de la mer près de chez moi"));
children.push(bodyPar(
  "Avec l'accord et sous la supervision d'un adulte responsable, observe un outil réellement utilisé dans les " +
  "métiers de la mer près de chez toi. N'y touche pas sans autorisation : contente-toi de l'observer et, si " +
  "possible, d'interroger la personne qui l'utilise.",
));
children.push(threeColTable(
  ["Outil observé", "Fonction d'usage", "Une contrainte remarquée (matériau, poids, sécurité...)"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [2800, 3200, 3200],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un outil technique répond à une fonction d'usage et doit respecter des fonctions de contraintes.",
    "Certains outils utilisent des mécanismes (poulies, leviers, systèmes de transmission).",
    "Les outils des métiers de la mer évoluent selon les matériaux, l'énergie disponible et la sécurité.",
    "Un cahier des charges relie un besoin à des exigences précises avant la conception.",
    "La conception suit une démarche : imaginer plusieurs solutions, en choisir une, réaliser un croquis puis une maquette.",
    "Une bonne conception technique prend en compte la préservation de l'environnement marin.",
    "La maquette scolaire reste un objet pédagogique, jamais un outil destiné à un usage réel en mer.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire la fonction d'usage et une contrainte d'un outil des métiers de la mer.",
    "☐ Expliquer ce qu'est un mécanisme et donner un exemple.",
    "☐ Comparer un outil ancien et un outil plus récent.",
    "☐ Construire un cahier des charges simple à partir d'un besoin.",
    "☐ Imaginer et comparer plusieurs solutions techniques.",
    "☐ Réaliser un croquis puis une maquette simple et sûre.",
    "☐ Expliquer les choix effectués lors de la conception d'un prototype.",
    "☐ Proposer une solution technique respectueuse de l'environnement marin.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : fonction d'usage, fonction de contrainte, mécanisme, cahier des charges, croquis, " +
    "maquette, prototype, démarche de conception.",
    "Vocabulaire clé à maîtriser : poulie, levier, système de transmission, contrainte écologique.",
    "Avant l'évaluation, vérifie que tu peux : construire un cahier des charges simple ; citer les étapes du " +
    "croquis à la maquette ; expliquer pourquoi une solution technique doit respecter l'environnement.",
    "Question rapide de vérification : relie un besoin donné à une fonction d'usage et à une contrainte adaptée.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "cahier des charges · fonction d'usage · maquette · levier · croquis · contrainte · prototype · mécanisme.",
  { italics: true },
));
children.push(numberedPar("1. Ce à quoi sert réellement un outil s'appelle sa ......................"));
children.push(numberedPar("2. Une exigence que doit respecter une solution technique s'appelle une ......................"));
children.push(numberedPar("3. Une poulie ou un levier sont des exemples de ......................"));
children.push(numberedPar("4. La liste des exigences à respecter avant de concevoir un objet s'appelle un ......................"));
children.push(numberedPar("5. Un dessin rapide et simple d'une idée de solution s'appelle un ......................"));
children.push(numberedPar("6. Une représentation en volume, à échelle réduite, s'appelle une ......................"));
children.push(numberedPar("7. Le premier exemplaire construit d'une solution technique s'appelle un ......................"));
children.push(numberedPar("8. Un dispositif simple qui facilite un mouvement, comme pour soulever une charge, est un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. La fonction d'usage d'un outil, c'est :"));
children.push(bulletPar("a) son prix"));
children.push(bulletPar("b) ce à quoi il sert réellement"));
children.push(bulletPar("c) sa couleur"));
children.push(spacer(60));
children.push(numberedPar("2. Un cahier des charges sert à :"));
children.push(bulletPar("a) décorer un objet"));
children.push(bulletPar("b) lister les exigences que doit respecter une solution"));
children.push(bulletPar("c) vendre un produit"));
children.push(spacer(60));
children.push(numberedPar("3. Quelle est la bonne suite d'étapes de la démarche de conception ?"));
children.push(bulletPar("a) maquette → croquis → cahier des charges"));
children.push(bulletPar("b) cahier des charges → croquis → maquette"));
children.push(bulletPar("c) croquis → cahier des charges → maquette"));
children.push(spacer(60));
children.push(numberedPar("4. Concevoir une solution technique respectueuse de l'environnement marin, c'est notamment :"));
children.push(bulletPar("a) choisir des matériaux qui ne polluent pas s'ils sont abandonnés"));
children.push(bulletPar("b) utiliser le plus de matériaux possible"));
children.push(bulletPar("c) ignorer l'impact du matériau choisi"));
children.push(spacer(60));
children.push(numberedPar("5. Une maquette scolaire de prototype doit être réalisée :"));
children.push(bulletPar("a) avec des outils tranchants motorisés"));
children.push(bulletPar("b) avec des matériaux scolaires sûrs comme le papier et le carton"));
children.push(bulletPar("c) directement en mer pour la tester"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Fonction de contrainte", "a. Dispositif qui transmet ou transforme un mouvement."],
    ["2. Mécanisme", "b. Premier exemplaire construit d'une solution technique."],
    ["3. Croquis", "c. Exigence que doit respecter une solution technique."],
    ["4. Prototype", "d. Représentation en volume, à échelle réduite, d'un objet."],
    ["5. Maquette", "e. Dessin simple et rapide représentant une idée de solution."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Un pêcheur a besoin de garder ses appâts au frais pendant plusieurs heures sur le bateau. Propose un cahier des charges simple (fonction attendue + 3 contraintes) pour une solution possible."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi il est utile d'imaginer plusieurs solutions avant d'en choisir une."));
children.push(numberedPar("3. Un camarade propose de fabriquer sa maquette avec des morceaux de verre cassé trouvés sur la plage, car « c'est gratuit ». Que lui réponds-tu, et pourquoi ?"));
children.push(numberedPar("4. Choisis un outil ancien des métiers de la mer étudié en 7e AF et propose une amélioration simple, en justifiant ton choix."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis d'apprendre à analyser un outil des métiers de la mer selon sa fonction d'usage et ses " +
  "fonctions de contraintes, et à comprendre comment ces outils évoluent dans le temps. Tu as découvert ce " +
  "qu'est un cahier des charges, et tu as suivi, en équipe, une véritable démarche de conception : imaginer " +
  "plusieurs solutions, en choisir une, réaliser un croquis puis une maquette simple et sûre, et enfin " +
  "présenter et expliquer ton prototype. Tu as aussi appris qu'une bonne conception technique tient compte de " +
  "la préservation de l'environnement marin. Cette démarche de conception te sera utile pour d'autres champs " +
  "de l'ETAP, notamment pour l'agriculture.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "fonction d'usage · fonction de contrainte · mécanisme · cahier des charges · croquis · maquette · " +
  "prototype · démarche de conception · environnement marin.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C02-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Concevoir un prototype : métiers de la mer », avec des branches " +
  "vers : fonction/contraintes, évolution des outils, cahier des charges, croquis/maquette, sécurité, " +
  "environnement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte ETAP.",
));

await buildAndSave(children, 15, "Manuel_ETAP_8AF_Chapitre2.docx");
