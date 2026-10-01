// Manuel d'ETAP 8e AF — Chapitre 5 : Modes de production et financement
// (champ officiel : Entrepreneuriat).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.52-53/77 (programme detaille 8e AF, unite "L'entrepreneuriat en 8e
//       annee du fondamental") : competence ciblee, savoirs/savoir-faire
//       (modes de production, ressources, calcul economique simple,
//       mobilisation des ressources), activites, modalites/criteres.
// Deja lu et verifie integralement pendant la Phase 0 ETAP 8e AF (capture
// complete avec contexte). Non re-telecharge une troisieme fois (document
// statique) ; les pages restent p.52-53.
//
// Limite stricte appliquee (au-dela de ce que demande deja le programme) :
// le savoir officiel mentionne l'evaluation de la TCA et de la TVA, mais
// aucune formule fiscale, aucun taux et aucun calcul bancaire/comptable
// avance n'est enseigne ici - ces notions sont seulement nommees et
// presentees de facon conceptuelle (une taxe existe et s'ajoute au prix),
// conformement a l'interdiction explicite de transformer ce chapitre en
// cours de comptabilite. Les seuls calculs demandes a l'eleve sont des
// additions/soustractions/multiplications/comparaisons de montants fictifs
// (cout, prix de vente, marge, chiffre d'affaires).
// Aucune banque, taux d'interet, loi ou dispositif public reel n'est cite :
// toute mention de financement reste generique et non nominative.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_ENTREPRENDRE_FILL, BOX_ENTREPRENDRE_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
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
  5,
  "Modes de production et financement",
  "L'an dernier, tu as découvert ce qu'est une entreprise. Cette année, tu vas comprendre comment une " +
  "activité productive s'organise réellement : comment elle produit, quelles ressources elle mobilise, et " +
  "comment elle peut trouver les moyens de financer son activité.",
  [
    "Décrire les étapes d'une activité productive.",
    "Distinguer différents modes de production.",
    "Identifier les ressources humaines, matérielles, financières et immatérielles d'une entreprise.",
    "Calculer simplement un coût, un prix de vente et une marge.",
    "Comprendre ce qu'est un chiffre d'affaires.",
    "Expliquer pourquoi et comment une activité peut mobiliser des ressources ou un financement.",
    "Organiser les ressources d'un petit projet productif fictif.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Un groupe d'élèves de 8e AF veut produire des sacs réutilisables, à partir de tissus " +
  "récupérés, pour les vendre lors de la fête annuelle de l'école. L'argent récolté servira à acheter du " +
  "matériel sportif pour la classe. Le groupe doit maintenant s'organiser : combien de sacs produire ? Avec " +
  "quelles ressources ? Comment financer les premiers achats ? Ce chapitre va t'aider à répondre à ces " +
  "questions.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Production — action de fabriquer un bien ou de réaliser un service."));
children.push(bulletPar("Mode de production — façon dont une entreprise organise sa production (unitaire, par lot, en série, en continue)."));
children.push(bulletPar("Ressource — élément nécessaire à une activité (humaine, matérielle, financière, immatérielle)."));
children.push(bulletPar("Coût de production — ce que coûte réellement la fabrication d'un bien ou d'un service."));
children.push(bulletPar("Prix de vente — somme demandée au client pour un bien ou un service."));
children.push(bulletPar("Marge — différence entre le prix de vente et le coût de production."));
children.push(bulletPar("Chiffre d'affaires — somme totale des ventes réalisées sur une période."));
children.push(bulletPar("Financement — moyens permettant à une activité de disposer de l'argent nécessaire à son fonctionnement."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : produire un bien ou fournir un service", "5.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris qu'une entreprise produit un bien ou un service pour répondre à un besoin, en " +
  "mobilisant des personnes, des ressources et des outils. Cette année, tu vas approfondir cette idée : " +
  "comment cette production s'organise-t-elle concrètement, et comment l'activité peut-elle se financer ?",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les étapes d'une activité productive", "5.2"));
children.push(bodyPar(
  "Toute activité productive suit des étapes simples : identifier ce qu'il faut produire, rassembler les " +
  "ressources nécessaires, réaliser la production, puis vendre ou distribuer le bien ou le service obtenu.",
));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-01",
  "Une situation entrepreneuriale haïtienne",
  "Scène d'ouverture : un petit atelier scolaire ou communautaire haïtien où plusieurs personnes préparent une " +
  "production simple (couture, transformation alimentaire, artisanat).",
  "Une activité productive mobilise des personnes et des ressources organisées.",
  "Ancrer le chapitre dans une situation entrepreneuriale crédible avant l'analyse technique.",
  "Illustration pleine largeur, scène d'atelier haïtien, réaliste et paisible.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-02",
  "Une chaîne simple de production",
  "Schéma en 4 cases reliées par des flèches : identifier le besoin → rassembler les ressources → produire → " +
  "vendre/distribuer, illustré avec l'exemple des sacs réutilisables.",
  "Toute activité productive suit une chaîne d'étapes simples.",
  "Faire comprendre la notion de chaîne de production avant d'entrer dans le détail des modes de production.",
  "Schéma horizontal, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les modes de production", "5.3"));
children.push(bodyPar(
  "Le programme officiel distingue quatre modes de production, selon la quantité produite et la façon dont " +
  "l'activité est organisée.",
));

children.push(threeColTable(
  ["Mode de production", "Description", "Exemple haïtien"],
  [
    ["Unitaire", "Un seul exemplaire, souvent fait sur mesure", "Un meuble fabriqué à la demande d'un client"],
    ["Par lot", "Une petite quantité produite en même temps", "Vingt paniers tissés pour un marché"],
    ["En série", "Une grande quantité produite de façon répétée et identique", "Des centaines de vêtements identiques dans un atelier de confection"],
    ["En continue", "Une production qui ne s'arrête pas", "Une minoterie qui transforme du grain en continu"],
  ],
  [2200, 3400, 3400],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-03",
  "Comparer les modes de production",
  "Quatre vignettes illustrant chacun des modes de production (unitaire, par lot, en série, en continue) avec " +
  "un exemple visuel simple pour chacun.",
  "Les modes de production se distinguent par la quantité produite et la façon de s'organiser.",
  "Aider l'élève à visualiser et distinguer les quatre modes de production.",
  "Illustration en 4 vignettes, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Schématiser un processus de production", "5.4"));
children.push(bodyPar(
  "Pour bien comprendre une production, il est utile de la représenter par un schéma simple, qui montre les " +
  "grandes étapes, de la matière première ou de l'idée de départ jusqu'au bien ou service final.",
));

children.push(calloutBox(
  "TECHNIQUE — Schématiser une production",
  [
    "1. Point de départ : la matière première ou l'idée du service.",
    "2. Transformation ou réalisation : le travail effectué.",
    "3. Résultat : le bien ou le service obtenu.",
    "4. Destination : le client ou l'utilisateur final.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les ressources d'une entreprise", "5.5"));
children.push(bodyPar(
  "Une entreprise, même petite, mobilise plusieurs types de ressources pour fonctionner.",
));

children.push(calloutBox(
  "OUTIL — Quatre types de ressources",
  [
    "Ressources humaines : les personnes qui travaillent pour l'activité.",
    "Ressources matérielles : les outils, machines, locaux nécessaires.",
    "Ressources financières : l'argent disponible pour fonctionner.",
    "Ressources immatérielles : le savoir-faire, la réputation, les idées.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, "343B42",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-04",
  "Les ressources d'une entreprise",
  "Quatre pictogrammes légendés représentant les ressources humaines (personnes), matérielles (outils), " +
  "financières (argent) et immatérielles (idée/savoir-faire), autour d'un petit atelier.",
  "Une entreprise mobilise plusieurs types de ressources différentes.",
  "Illustrer concrètement les quatre types de ressources d'une entreprise.",
  "Illustration en 4 pictogrammes, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comprendre le coût, le prix et la marge", "5.6"));
children.push(bodyPar(
  "Reprenons l'exemple des sacs réutilisables. Pour savoir si l'activité est intéressante, le groupe doit " +
  "comparer ce que coûte la fabrication d'un sac et le prix auquel il pourrait être vendu.",
));

children.push(threeColTable(
  ["Élément", "Montant fictif", "Calcul"],
  [
    ["Coût de production d'un sac (tissu récupéré, fil, temps)", "50 gourdes", "—"],
    ["Prix de vente prévu", "125 gourdes", "—"],
    ["Marge par sac", "?", "Prix de vente − Coût de production = 125 − 50 = 75 gourdes"],
  ],
  [3600, 2400, 3000],
));
children.push(spacer(160));
children.push(bodyPar(
  "Si le groupe vend 20 sacs, le chiffre d'affaires (la somme totale des ventes) sera de 125 × 20 = 2 500 " +
  "gourdes. Ces montants sont uniquement des exemples pédagogiques, pas des prix réels.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le chiffre d'affaires et les taxes", "5.7"));
children.push(bodyPar(
  "Le chiffre d'affaires est la somme totale des ventes réalisées sur une période. Le programme officiel " +
  "mentionne aussi que certaines entreprises doivent reverser des taxes à l'État, comme la taxe sur le chiffre " +
  "d'affaires (TCA) ou la taxe sur la valeur ajoutée (TVA) : une partie de l'argent gagné n'est donc pas " +
  "entièrement gardée par l'entreprise. Ce chapitre ne calcule pas ces taxes en détail — retiens simplement " +
  "qu'elles existent et s'ajoutent aux calculs économiques d'une entreprise réelle.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Mobiliser des ressources et un financement", "5.8"));
children.push(bodyPar(
  "Pour démarrer ou développer une activité, il faut souvent réunir des ressources supplémentaires : c'est ce " +
  "qu'on appelle mobiliser des ressources. Plusieurs moyens sont possibles, à des niveaux très différents.",
));

children.push(calloutBox(
  "ENTREPRENDRE — Des exemples de mobilisation de ressources",
  [
    "Utiliser une petite épargne personnelle ou familiale.",
    "Demander l'aide de proches ou de la communauté.",
    "S'associer avec d'autres personnes qui apportent des ressources (une coopérative, par exemple).",
    "Faire appel à des organismes de soutien aux entreprises, qui offrent parfois conseils, formations ou aide financière.",
  ],
  BOX_ENTREPRENDRE_FILL, BOX_ENTREPRENDRE_LINE, "6B3512",
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce chapitre ne présente aucune banque, aucun taux ni aucun programme précis : chaque situation réelle doit " +
  "être étudiée avec un adulte responsable le moment venu.",
  { italics: true },
));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-05",
  "Mobiliser des ressources pour un projet",
  "Un groupe d'élèves discutant avec un adulte représentant un organisme de soutien local (conseiller, " +
  "enseignant), dans une ambiance d'échange et de conseil.",
  "Mobiliser des ressources passe souvent par l'échange et l'entraide.",
  "Illustrer concrètement la notion de mobilisation des ressources sans citer d'institution réelle.",
  "Illustration pleine largeur, scène d'échange haïtienne, ambiance positive.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : organiser la production des sacs réutilisables", "5.9"));
children.push(bodyPar(
  "Reprenons la situation présentée au début du chapitre. Avec ton groupe, organise la production des sacs " +
  "réutilisables pour la fête de l'école.",
));
children.push(numberedPar("1. Quel mode de production (unitaire, par lot, en série) semble le plus adapté à ce projet ? Justifie ta réponse."));
children.push(numberedPar("2. Liste les ressources humaines, matérielles, financières et immatérielles nécessaires."));
children.push(numberedPar("3. Si produire 20 sacs coûte 1 000 gourdes au total, et que chaque sac est vendu 125 gourdes, quel sera le chiffre d'affaires si tous les sacs sont vendus ? Ce montant couvre-t-il le coût total ?"));
children.push(numberedPar("4. Le groupe n'a pas assez d'argent pour acheter tout le tissu nécessaire au départ. Propose une façon de mobiliser cette ressource manquante, parmi celles vues à la section 5.8."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Organiser les ressources d'un petit projet"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Identifier et organiser les ressources nécessaires à un petit projet productif fictif." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier, crayon. Aucun argent réel, aucun matériel de vente n'est nécessaire." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Groupes de 3 à 4 élèves." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez, avec votre groupe, un petit projet fictif de production (bien ou service) utile à votre école." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Décrivez le bien ou le service que vous souhaitez produire."));
children.push(numberedPar("2. Choisissez un mode de production adapté (unitaire, par lot, en série)."));
children.push(numberedPar("3. Listez les ressources humaines, matérielles, financières et immatérielles nécessaires."));
children.push(numberedPar("4. Fixez un coût de production fictif et un prix de vente fictif, puis calculez la marge."));
children.push(numberedPar("5. Proposez une façon de mobiliser une ressource manquante."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Fiche de projet :", { bold: true }));
children.push(threeColTable(
  ["Élément", "Description", "Remarque"],
  [
    ["Bien ou service produit", "", ""],
    ["Mode de production choisi", "", ""],
    ["Coût de production (fictif)", "", ""],
    ["Prix de vente (fictif)", "", ""],
    ["Marge calculée", "", ""],
  ],
  [3000, 3400, 2600],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Pourquoi avez-vous choisi ce mode de production plutôt qu'un autre ?"));
children.push(numberedPar("2. Quelle ressource vous semble la plus difficile à réunir pour ce projet ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre projet à la classe en expliquant vos choix d'organisation et de financement." }]));
children.push(spacer(80));

children.push(calloutBox(
  "RAPPEL",
  [
    "Ce projet reste entièrement fictif et pédagogique : aucun argent réel, aucune vente réelle, aucun " +
    "emprunt ou engagement financier n'est demandé aux élèves.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-06",
  "Organiser un projet productif en groupe",
  "Un groupe d'élèves de 8e AF, en classe, complétant une fiche de projet productif fictif (ressources, coût, " +
  "prix), sans aucun matériel financier réel.",
  "Organiser les ressources d'un projet peut se faire entièrement par écrit, en toute sécurité.",
  "Illustrer concrètement le déroulement de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / analyse — Une activité productive près de chez moi"));
children.push(bodyPar(
  "Avec l'accord et sous la supervision d'un adulte responsable, observe ou interroge une personne qui produit " +
  "un bien ou un service près de chez toi (atelier, petite production agricole, artisanat, commerce).",
));
children.push(threeColTable(
  ["Activité observée", "Mode de production (si identifiable)", "Une ressource remarquée"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [2800, 3400, 3000],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une activité productive suit des étapes : identifier le besoin, rassembler les ressources, produire, vendre.",
    "Il existe quatre modes de production : unitaire, par lot, en série, en continue.",
    "Une entreprise mobilise des ressources humaines, matérielles, financières et immatérielles.",
    "La marge se calcule ainsi : prix de vente − coût de production.",
    "Le chiffre d'affaires est la somme totale des ventes réalisées.",
    "Certaines entreprises doivent reverser des taxes (comme la TCA ou la TVA) à l'État.",
    "Mobiliser des ressources peut passer par l'épargne, l'entraide, une coopérative ou des organismes de soutien.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire les étapes d'une activité productive.",
    "☐ Distinguer les quatre modes de production et donner un exemple pour chacun.",
    "☐ Citer les quatre types de ressources d'une entreprise.",
    "☐ Calculer une marge simple à partir d'un coût et d'un prix de vente.",
    "☐ Expliquer ce qu'est un chiffre d'affaires.",
    "☐ Citer un exemple de mobilisation de ressources ou de financement.",
    "☐ Organiser les ressources d'un petit projet productif fictif.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : mode de production, ressources (humaines/matérielles/financières/immatérielles), " +
    "coût, prix de vente, marge, chiffre d'affaires, mobilisation des ressources.",
    "Vocabulaire clé à maîtriser : production unitaire/par lot/en série/en continue, TCA, TVA (notions, sans calcul).",
    "Avant l'évaluation, vérifie que tu peux : citer les 4 modes de production ; calculer une marge simple ; " +
    "citer les 4 types de ressources d'une entreprise.",
    "Question rapide de vérification : si un produit coûte 40 gourdes à fabriquer et se vend 60 gourdes, " +
    "quelle est la marge ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "marge · chiffre d'affaires · ressource humaine · production en série · coût de production · financement · " +
  "ressource immatérielle · production unitaire.",
  { italics: true },
));
children.push(numberedPar("1. Fabriquer un seul meuble sur mesure est un exemple de ......................"));
children.push(numberedPar("2. Fabriquer des centaines de vêtements identiques est un exemple de ......................"));
children.push(numberedPar("3. Une personne qui travaille pour une entreprise est une ......................"));
children.push(numberedPar("4. Le savoir-faire ou la réputation d'une entreprise est une ......................"));
children.push(numberedPar("5. Ce que coûte réellement la fabrication d'un produit s'appelle le ......................"));
children.push(numberedPar("6. La différence entre le prix de vente et le coût de production s'appelle la ......................"));
children.push(numberedPar("7. La somme totale des ventes réalisées sur une période s'appelle le ......................"));
children.push(numberedPar("8. Trouver l'argent nécessaire au fonctionnement d'une activité s'appelle le ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. La production en continue se caractérise par :"));
children.push(bulletPar("a) un seul exemplaire produit sur mesure"));
children.push(bulletPar("b) une production qui ne s'arrête pas"));
children.push(bulletPar("c) une production réalisée une seule fois par an"));
children.push(spacer(60));
children.push(numberedPar("2. Les ressources matérielles d'une entreprise comprennent notamment :"));
children.push(bulletPar("a) les outils et les locaux"));
children.push(bulletPar("b) uniquement l'argent"));
children.push(bulletPar("c) uniquement les idées"));
children.push(spacer(60));
children.push(numberedPar("3. Si un produit coûte 30 gourdes à fabriquer et se vend 50 gourdes, la marge est de :"));
children.push(bulletPar("a) 80 gourdes"));
children.push(bulletPar("b) 20 gourdes"));
children.push(bulletPar("c) 30 gourdes"));
children.push(spacer(60));
children.push(numberedPar("4. Le chiffre d'affaires correspond à :"));
children.push(bulletPar("a) la somme totale des ventes réalisées"));
children.push(bulletPar("b) uniquement le coût de production"));
children.push(bulletPar("c) le nombre d'employés d'une entreprise"));
children.push(spacer(60));
children.push(numberedPar("5. Mobiliser des ressources pour un projet peut notamment passer par :"));
children.push(bulletPar("a) l'entraide familiale ou communautaire"));
children.push(bulletPar("b) ignorer le besoin de ressources"));
children.push(bulletPar("c) attendre sans rien organiser"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Production par lot", "a. Le savoir-faire ou la réputation d'une entreprise."],
    ["2. Ressource financière", "b. Une petite quantité produite en même temps."],
    ["3. Ressource immatérielle", "c. L'argent disponible pour fonctionner."],
    ["4. Prix de vente", "d. Ce que coûte réellement la fabrication d'un produit."],
    ["5. Coût de production", "e. Somme demandée au client pour un bien ou un service."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Une coopérative agricole fictive produit 100 paniers de légumes par semaine. Quel mode de production correspond le mieux à cette situation ? Justifie ta réponse."));
children.push(numberedPar("2. Un projet fictif coûte 2 000 gourdes à réaliser. L'équipe ne dispose que de 800 gourdes. Propose deux façons possibles de mobiliser la somme manquante, parmi celles vues dans ce chapitre."));
children.push(numberedPar("3. Explique, avec tes propres mots, pourquoi une entreprise a besoin de connaître à la fois son coût de production et son prix de vente."));
children.push(numberedPar("4. Un camarade affirme que le chiffre d'affaires est toujours entièrement gardé par l'entreprise. Que lui réponds-tu, en t'appuyant sur la section 5.7 ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de comprendre comment une activité productive s'organise concrètement : à travers les " +
  "étapes d'une production, les quatre modes de production (unitaire, par lot, en série, en continue), et les " +
  "quatre types de ressources qu'une entreprise mobilise (humaines, matérielles, financières, immatérielles). " +
  "Tu as appris à calculer simplement un coût, un prix de vente, une marge et un chiffre d'affaires, et tu as " +
  "découvert que certaines entreprises doivent reverser des taxes à l'État. Tu as aussi vu plusieurs façons de " +
  "mobiliser des ressources ou un financement pour un projet, et tu as organisé, en groupe, les ressources " +
  "d'un petit projet productif fictif. Ces notions te prépareront, l'an prochain, à aller plus loin dans la " +
  "compréhension de la création d'une entreprise.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "production unitaire/par lot/en série/en continue · ressource humaine/matérielle/financière/immatérielle · " +
  "coût de production · prix de vente · marge · chiffre d'affaires · financement.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-07",
  "Comparer modes de production et financement",
  "Tableau visuel synthétique reliant chaque mode de production à un besoin en ressources et une piste de " +
  "financement adaptée, de façon simple et schématique.",
  "Le mode de production choisi influence les ressources et le financement nécessaires.",
  "Synthétiser visuellement le lien entre modes de production, ressources et financement.",
  "Illustration pleine largeur, tableau visuel coloré, cohérent avec la charte ETAP.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C05-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Modes de production et financement », avec des branches vers : " +
  "étapes de production, modes de production, ressources, coût/prix/marge, financement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, sobre.",
));

await buildAndSave(children, 55, "Manuel_ETAP_8AF_Chapitre5.docx");
