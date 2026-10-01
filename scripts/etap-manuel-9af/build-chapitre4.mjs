// Manuel d'ETAP 9e AF — Chapitre 4 : Créer une entreprise
// (champ officiel : Entrepreneuriat).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), unite "L'entrepreneuriat en 9e
//   annee du fondamental", p.60-61/77.
// Page reverifiee en direct le 2026-08-22 (execution controlee Chapitre 4,
// verification prealable obligatoire) via le lecteur Google Drive.
//
// CORRECTION DE BORNE DE PAGE (documentee ce jour dans
// SOURCES_VERIFIEES_ETAP_9AF.md et MATRICE_MENFP_ETAP_9AF.md) : l'unite
// Entrepreneuriat se termine a la fin de la page 61 (bloc "Modalites et
// criteres d'evaluation"), et NON p.62 comme l'indiquait par arrondi la
// matrice de Phase 0 ("p.60-62"). La page 62 ouvre une unite tronc-commun
// distincte et jusque-la non recensee ("Nouvelles technologies du numerique
// en 9e annee du fondamental" - CAO/FAO), sans rapport avec ce chapitre.
// Cette decouverte ne modifie ni la competence ni le contenu de ce
// Chapitre 4 (Entrepreneuriat, p.60-61, confirme exact) ; elle est
// documentee separement et doit etre arbitree par l'utilisateur avant le
// Chapitre 5 quant a l'architecture globale (5 vs 6 chapitres) - voir le
// rapport d'execution de ce chapitre.
//
// Citations exactes relevees ce jour (p.60-61) :
//   Competence : « Creer, de maniere collaborative, une entreprise de
//   production de bien ou de service en reponse a un besoin local et en
//   evaluer les impacts. »
//   Savoirs/savoir-faire (verbatim resume fidele) :
//   (1) de maniere collaborative, identifier un besoin, de maniere
//   collective, rechercher et choisir des solutions ;
//   (2) definir et planifier les etapes d'un projet de creation
//   d'entreprise (analyse de la situation, definition des objectifs,
//   conception, realisation, evaluation ; creation d'un organigramme -
//   structure fonctionnelle/divisionnelle/matricielle ; choix d'un mode de
//   production) ;
//   (3) inventorier, decrire les etapes essentielles dans la creation d'une
//   entreprise dans le contexte local (opportunite d'affaires, plan
//   d'affaires, financement necessaire, enregistrement legal de
//   l'entreprise aupres de l'organe regulateur) ;
//   (4) evaluer l'efficacite du projet (definir des outils d'evaluation,
//   determiner des objectifs de production/chiffre d'affaires, analyser les
//   resultats, adapter les objectifs en fonction des contraintes et du
//   marche).
//   Activites officielles : identification de besoins non satisfaits dans
//   la communaute/l'ecole ; concevoir des projets de creation d'entreprise
//   en presentant taches, chiffre d'affaires, cout de production, prevision
//   de taxe sur le chiffre d'affaires (TCA), prix ; identifier difficultes
//   et strategies de gestion des ressources ; usage du numerique encourage
//   pour la presentation ; execution collaborative des etapes du plan ;
//   evaluation du projet (plus-values, impact social et environnemental).
//   Exemples officiels de projets (non exhaustifs) : recyclage du
//   plastique, jus de fruits tropicaux, sacs d'ecole en plastique recycle,
//   poulet de chair, production d'oeufs, assemblage de cellules
//   photovoltaiques, elevage et vente de poissons.
//   Modalites d'evaluation officielles (p.61, meme formulation que les
//   Chapitres 1-3) : exposes collectifs, analyse documentaire individuelle,
//   tests de connaissances ; criteres : implication, estimation des
//   progres, maitrise de competence.
//
// ARBITRAGE PHASE 0 APPLIQUE (voir MATRICE_MENFP_ETAP_9AF.md, section
// VALIDATION du 2026-08-22) : le savoir officiel demande d'« inventorier,
// decrire » les etapes de creation d'entreprise - un objectif de
// CONNAISSANCE/DESCRIPTION [OFFICIEL - SOURCE VERIFIEE, p.61], pas une
// instruction d'executer reellement une demarche legale. Le cadrage
// "creation d'entreprise = simulation pedagogique integrale" est donc une
// [ADAPTATION PEDAGOGIQUE] legitime et non une invention. Ce statut est
// rendu explicite dans le chapitre (encadre ENTREPRENDRE, section 4.4).
// Le terme "simulation d'entreprise" n'est lui-meme jamais presente comme
// une formulation officielle MENFP : il est utilise ici comme [CHOIX
// EDITORIAL] de mise en forme, cadre par l'adaptation pedagogique
// ci-dessus.
//
// NOTIONS ECONOMIQUES - bornes verrouillees (ARCHITECTURE_PEDAGOGIQUE_
// ETAP_9AF.md, section 8) : chiffre d'affaires, cout de production, prix
// des produits/services, prevision de TCA (conceptuelle, sans calcul de
// taux) - calculs arithmetiques simples uniquement (addition, soustraction,
// multiplication, comparaison) sur des montants FICTIFS. Aucun taux fiscal,
// taux d'interet, prix officiel, procedure administrative ou obligation
// legale reel n'est invente ici.
//
// Ce chapitre ne reprend PAS le contenu du Chapitre 5 de la 8e AF ("Modes
// de production et financement" - registre "appréhender" des notions
// economiques isolees : modes de production, marge, TCA, TVA, ressources).
// Il reinvestit ces notions deja vues (chiffre d'affaires, TCA) dans un
// projet de creation d'entreprise complet, avec organigramme et etapes de
// creation, conformement a la progression verrouillee en Phase 0
// (MATRICE_PROGRESSION_ETAP_7_8_9_AF.md, section 4).
//
// Adaptations de securite (SIMULATION / MINI-PROJET - LIMITES, section 8 du
// prompt d'execution) : aucun eleve n'emprunte ni n'investit d'argent reel,
// n'ouvre de compte, n'effectue de paiement reel, ne signe de contrat, ne
// vend obligatoirement un produit, ou ne prend un engagement financier.
// Toute "entreprise" du chapitre reste fictive et scolaire.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_PROJET_FILL, BOX_PROJET_LINE,
  BOX_ENTREPRENDRE_FILL, BOX_ENTREPRENDRE_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE,
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
  4,
  "Créer une entreprise",
  "En 8e AF, tu as découvert les modes de production et quelques notions économiques simples (chiffre " +
  "d'affaires, coûts, prix). Cette année, avec ton équipe, tu vas utiliser ces notions pour créer, de manière " +
  "entièrement simulée, une entreprise fictive répondant à un besoin réel de ta communauté — sans jamais " +
  "manipuler d'argent réel.",
  [
    "Identifier un besoin non satisfait et rechercher des solutions en équipe.",
    "Planifier les étapes de création d'une entreprise fictive.",
    "Créer un organigramme simple et choisir un mode de production.",
    "Décrire les étapes essentielles de la création d'une entreprise dans le contexte local.",
    "Utiliser des notions économiques simples (chiffre d'affaires, coûts, prix, taxe) dans des calculs fictifs.",
    "Présenter les résultats d'un projet, y compris à l'aide du numérique.",
    "Évaluer l'efficacité et les impacts d'un projet d'entreprise simulée.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans un quartier de Jacmel, plusieurs familles jettent des sacs en plastique et des " +
  "fruits abîmés, alors que ces déchets pourraient être transformés en produits utiles. Une classe de 9e AF " +
  "décide de créer, à titre d'exercice scolaire entièrement fictif, un projet d'entreprise imaginaire pour " +
  "répondre à ce besoin — sans jamais fonder une vraie entreprise, sans argent réel, sans document " +
  "administratif réel. Ce chapitre t'apprend à construire ce projet, étape par étape.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Entreprise — organisation qui produit un bien ou un service pour répondre à un besoin."));
children.push(bulletPar("Organigramme — schéma qui montre comment les rôles sont répartis dans une organisation."));
children.push(bulletPar("Opportunité d'affaires — besoin non satisfait qui pourrait être exploité par une entreprise."));
children.push(bulletPar("Plan d'affaires — document qui décrit un projet d'entreprise : besoin, solution, ressources, résultats attendus."));
children.push(bulletPar("Chiffre d'affaires — somme totale des ventes réalisées par une entreprise sur une période donnée."));
children.push(bulletPar("Coût de production — ensemble des dépenses nécessaires pour fabriquer un bien ou réaliser un service."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : des notions économiques au projet d'entreprise", "4.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à distinguer différents modes de production et à comprendre des notions comme " +
  "le chiffre d'affaires ou le prix de vente, de façon isolée. Cette année, ces notions deviennent des outils " +
  "que tu vas utiliser ensemble, dans le cadre d'un seul projet complet : la création — entièrement fictive et " +
  "simulée — d'une entreprise.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Identifier un besoin et rechercher des solutions", "4.2"));
children.push(bodyPar(
  "Le programme officiel demande d'identifier, de manière collaborative, un besoin non satisfait, puis de " +
  "rechercher et choisir des solutions. Toute entreprise utile commence par un vrai besoin observé.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des besoins non satisfaits, sources d'opportunités",
  [
    "Des déchets (plastique, fruits abîmés) qui pourraient être transformés plutôt que jetés.",
    "Un produit ou un service qui manque dans le quartier ou autour de l'école.",
    "Une activité locale qui pourrait être mieux organisée ou mieux présentée.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C04-01",
  "Ouverture — Un contexte entrepreneurial haïtien",
  "Une scène de petit commerce ou d'atelier artisanal haïtien crédible (couturière, marchande, petit " +
  "atelier de transformation), observée par un groupe d'élèves de 9e AF avec un enseignant.",
  "Une entreprise, même fictive, s'inspire toujours d'une réalité économique locale observée.",
  "Ouvrir le chapitre sur un contexte entrepreneurial concret et haïtien.",
  "Illustration pleine largeur, scène haïtienne crédible, ambiance studieuse et respectueuse.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Planifier la création d'une entreprise", "4.3"));
children.push(bodyPar(
  "Le programme officiel demande de définir et planifier les étapes d'un projet de création d'entreprise : " +
  "analyse de la situation, définition des objectifs, conception, réalisation et évaluation. Il demande aussi " +
  "de créer un organigramme et de choisir un mode de production.",
));
children.push(twoColTable(
  "Structure d'organigramme", "Description simple",
  [
    ["Structure fonctionnelle", "Les rôles sont répartis par fonction (production, vente, gestion)."],
    ["Structure divisionnelle", "L'entreprise est organisée par produit ou par zone géographique."],
    ["Structure matricielle", "Les employés dépendent à la fois d'un rôle et d'un projet précis."],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "Pour une entreprise fictive scolaire, une structure fonctionnelle simple suffit généralement : par " +
  "exemple, une équipe « production », une équipe « présentation/vente fictive » et une équipe " +
  "« coordination ».",
));
children.push(spacer(160));
children.push(calloutBox(
  "PROJET — Les grandes étapes de planification",
  [
    "1. Analyser la situation : quel besoin, quelles ressources disponibles ?",
    "2. Définir des objectifs clairs et réalistes pour l'entreprise fictive.",
    "3. Concevoir le produit ou le service (voir section 4.4).",
    "4. Réaliser le projet (voir section 4.6).",
    "5. Évaluer les résultats (voir section 4.8).",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, "3A2A57",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C04-02",
  "Organigramme simple d'une entreprise fictive",
  "Un schéma simple d'organigramme fonctionnel (production / présentation / coordination), dessiné à la main " +
  "par un groupe d'élèves de 9e AF sur une grande feuille.",
  "Un organigramme clarifie qui fait quoi dans une entreprise, même fictive.",
  "Montrer concrètement la structure d'organisation d'un projet d'entreprise.",
  "Illustration demi-page, schéma clair et lisible, cohérent avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Décrire les étapes de création d'une entreprise", "4.4"));
children.push(bodyPar(
  "Le programme officiel demande d'inventorier et de décrire les étapes essentielles de la création d'une " +
  "entreprise dans le contexte local. Il s'agit ici de connaître et d'expliquer ces étapes — pas de les " +
  "exécuter réellement.",
));
children.push(calloutBox(
  "ENTREPRENDRE — Les étapes à connaître et décrire [ADAPTATION PÉDAGOGIQUE — simulation intégrale]",
  [
    "Opportunité d'affaires : le besoin non satisfait qui justifie la création de l'entreprise.",
    "Plan d'affaires : le document qui décrit le projet (besoin, solution, ressources, résultats attendus).",
    "Financement nécessaire : les ressources qu'il faudrait réunir pour démarrer (toujours fictives ici).",
    "Enregistrement légal de l'entreprise auprès de l'organe régulateur : la démarche administrative réelle " +
    "existante dans la vie économique, décrite dans ce chapitre comme connaissance générale — jamais réalisée " +
    "par l'élève.",
  ],
  BOX_ENTREPRENDRE_FILL, BOX_ENTREPRENDRE_LINE, "6A3A12",
));
children.push(spacer(160));
children.push(bodyPar(
  "Dans ce chapitre, chaque équipe invente un plan d'affaires fictif pour son entreprise imaginaire, mais " +
  "aucune équipe ne réalise une véritable démarche d'enregistrement, n'emprunte ou n'investit de l'argent " +
  "réel, n'ouvre de compte, ne signe de contrat, ou ne prend un engagement financier réel.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C04-03",
  "Étapes de création simulées",
  "Une équipe d'élèves de 9e AF remplissant une fiche de « plan d'affaires fictif » (besoin, solution, " +
  "ressources), sur papier, dans une salle de classe.",
  "Décrire les étapes de création d'une entreprise reste un exercice de connaissance, jamais une démarche réelle.",
  "Illustrer concrètement l'étape de description du plan d'affaires fictif.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance sérieuse et appliquée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Chiffre d'affaires, coûts et prix : des calculs simples", "4.5"));
children.push(bodyPar(
  "Le programme officiel demande de présenter, pour un projet de création d'entreprise, le chiffre " +
  "d'affaires, le coût de production, une prévision de taxe sur le chiffre d'affaires (TCA) et la fixation du " +
  "prix des produits ou des services. Ces notions restent ici de niveau simple : des calculs arithmétiques sur " +
  "des montants entièrement fictifs.",
));
children.push(threeColTable(
  ["Notion", "Explication simple", "Exemple fictif (en gourdes)"],
  [
    ["Coût de production", "Ce que coûte la fabrication d'un produit", "50 gourdes pour fabriquer un sac recyclé"],
    ["Prix de vente", "Le prix auquel le produit est proposé", "100 gourdes par sac"],
    ["Chiffre d'affaires", "Total des ventes sur une période (prix × quantité vendue)", "100 × 20 sacs = 2 000 gourdes"],
    ["TCA (prévision)", "Une partie du chiffre d'affaires reversée à l'État (notion à connaître, sans calcul de taux)", "Non calculée ici — connaissance conceptuelle uniquement"],
  ],
  [2600, 3600, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces montants sont entièrement inventés à des fins pédagogiques : ils ne représentent ni des prix réels du " +
  "marché, ni un taux de taxe officiel. Aucun taux de TCA n'est calculé dans ce chapitre : il s'agit de " +
  "comprendre qu'une entreprise doit en prévoir une, pas de la chiffrer précisément.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Réaliser le projet d'entreprise simulée", "4.6"));
children.push(bodyPar(
  "Le programme officiel prévoit l'exécution collaborative des différentes étapes du plan du projet. Dans ce " +
  "chapitre, « réaliser » signifie mettre en œuvre, en classe, les décisions prises : répartir les rôles selon " +
  "l'organigramme, préparer une présentation du produit ou du service imaginé, et simuler un catalogue ou une " +
  "affiche de présentation — jamais une vraie production ni une vraie vente.",
));
children.push(calloutBox(
  "SÉCURITÉ — Une entreprise entièrement fictive",
  [
    "Aucun élève n'emprunte, n'investit ou ne manipule de l'argent réel.",
    "Aucun élève n'ouvre de compte, ne signe de contrat, ou ne prend un engagement financier réel.",
    "Aucune vente réelle n'est réalisée : les « clients » et les « ventes » restent des exemples fictifs.",
    "Toute démarche administrative réelle (enregistrement légal, autorisation) reste une connaissance décrite, jamais exécutée.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C04-04",
  "Exemple d'entreprise simulée",
  "Une équipe d'élèves présentant, sous forme d'affiche ou de catalogue fictif, un produit imaginé (sacs " +
  "recyclés, jus de fruits), avec la mention claire « projet scolaire fictif ».",
  "Une entreprise simulée reste toujours identifiable comme un exercice scolaire, jamais une vraie activité commerciale.",
  "Illustrer concrètement un exemple de production issu du projet d'entreprise fictive.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante et clairement scolaire.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Présenter les résultats, y compris avec le numérique", "4.7"));
children.push(bodyPar(
  "Comme pour les projets précédents, le numérique reste un outil transversal utile pour présenter les " +
  "résultats — le programme officiel encourage explicitement son usage pour cette unité.",
));
children.push(calloutBox(
  "NUMÉRIQUE — Présenter une entreprise fictive",
  [
    "Avec un ordinateur ou une tablette disponible : un tableau ou quelques diapositives peuvent résumer le " +
    "plan d'affaires fictif, l'organigramme et les résultats attendus.",
    "Sans matériel disponible : une affiche présentant les mêmes éléments remplit exactement la même fonction.",
    "Dans les deux cas, la présentation reste claire, organisée, et fidèle au travail réellement effectué.",
  ],
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE, "1F2A33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Évaluer l'efficacité et les impacts du projet", "4.8"));
children.push(bodyPar(
  "Le programme officiel demande de définir des outils d'évaluation, de déterminer des objectifs de " +
  "production et de chiffre d'affaires, d'analyser les résultats, et d'adapter les objectifs selon les " +
  "contraintes et le marché. Il demande aussi d'évaluer les impacts social et environnemental du projet.",
));
children.push(threeColTable(
  ["Type d'évaluation", "Question à se poser", "Exemple"],
  [
    ["Efficacité économique", "Le chiffre d'affaires fictif dépasse-t-il le coût de production fictif ?", "2 000 gourdes de ventes pour 1 000 gourdes de coûts"],
    ["Impact social", "Le projet répond-il à un vrai besoin de la communauté ?", "Des sacs utiles à un prix accessible"],
    ["Impact environnemental", "Le projet préserve-t-il l'environnement ?", "Réutilisation de déchets plastiques"],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : l'entreprise fictive de Jacmel", "4.9"));
children.push(bodyPar(
  "Reprenons la situation présentée au début du chapitre. Avec ton équipe, choisis un des exemples proposés " +
  "par le programme (recyclage du plastique, jus de fruits tropicaux, sacs d'école en plastique recyclé, " +
  "poulet de chair, production d'œufs, assemblage de cellules photovoltaïques, ou élevage et vente de " +
  "poissons) pour créer une entreprise entièrement fictive.",
));
children.push(numberedPar("1. Quel besoin non satisfait votre entreprise fictive cherche-t-elle à résoudre ?"));
children.push(numberedPar("2. Quel organigramme simple proposez-vous pour votre équipe ?"));
children.push(numberedPar("3. Proposez un coût de production et un prix de vente fictifs pour votre produit ou service."));
children.push(numberedPar("4. Quel impact social et environnemental attendez-vous de ce projet fictif ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de projet collectif — Créer une entreprise fictive"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Créer, en équipe, une entreprise entièrement fictive répondant à un besoin local, du plan d'affaires jusqu'à l'évaluation des impacts." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier de projet, crayons, feuilles pour affiche ou schéma. Ordinateur ou tablette si disponible, facultatif." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Équipes de 4 à 5 élèves, avec un organigramme fonctionnel simple (production, présentation, coordination)." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez un des exemples de projet proposés dans ce chapitre (voir section 4.9). Rappel : aucune démarche réelle, aucun argent réel." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Analysez la situation et décrivez le besoin non satisfait."));
children.push(numberedPar("2. Créez un organigramme simple pour votre équipe (section 4.3)."));
children.push(numberedPar("3. Décrivez les étapes de création de votre entreprise fictive (section 4.4)."));
children.push(numberedPar("4. Proposez un coût de production et un prix de vente fictifs, puis calculez un chiffre d'affaires fictif (section 4.5)."));
children.push(numberedPar("5. Préparez une présentation (affiche ou numérique) de votre entreprise fictive."));
children.push(numberedPar("6. Évaluez l'efficacité et les impacts attendus de votre projet (section 4.8)."));
children.push(spacer(120));

children.push(bodyPar("FICHE DE PROJET — À compléter par l'équipe :", { bold: true }));
children.push(threeColTable(
  ["Élément du plan d'affaires", "Décision de l'équipe", "Responsable"],
  [
    ["Besoin identifié", "", ""],
    ["Produit ou service", "", ""],
    ["Coût de production (fictif)", "", ""],
    ["Prix de vente (fictif)", "", ""],
    ["Impact attendu", "", ""],
  ],
  [3200, 3400, 2400],
));
children.push(spacer(160));

children.push(mixedPar([{ text: "PRÉSENTATION : ", bold: true }, { text: "Chaque équipe présente son entreprise fictive au reste de la classe (5 minutes environ), en rappelant clairement qu'il s'agit d'un exercice scolaire." }]));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C04-05",
  "Présentation des résultats devant la classe",
  "Une équipe d'élèves de 9e AF présentant son entreprise fictive devant la classe, à l'aide d'une affiche ou " +
  "d'un écran partagé montrant un tableau de coûts et de prix.",
  "Présenter clairement un projet d'entreprise fictive, avec ou sans outil numérique.",
  "Ancrer visuellement l'étape de présentation des résultats du projet.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance valorisante et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Un petit entrepreneur près de chez moi"));
children.push(bodyPar(
  "Avec un adulte responsable, interroge, avec son accord, une personne qui a créé une petite activité " +
  "productive ou un service près de chez toi (couturière, marchande, artisan). Pose-lui quelques questions " +
  "simples sur son parcours.",
));
children.push(threeColTable(
  ["Activité observée", "Quel besoin répond-elle ?", "Une difficulté rencontrée par cette personne"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Créer une entreprise commence par l'identification d'un besoin non satisfait.",
    "Un organigramme simple (fonctionnel, divisionnel ou matriciel) répartit les rôles dans une équipe.",
    "Les étapes de création d'une entreprise (opportunité d'affaires, plan d'affaires, financement, " +
    "enregistrement légal) sont des connaissances à décrire, jamais des démarches réelles à exécuter dans ce " +
    "chapitre.",
    "Le chiffre d'affaires, le coût de production et le prix de vente s'utilisent avec des calculs simples et " +
    "des montants fictifs.",
    "Une entreprise scolaire simulée ne manipule jamais d'argent réel ni ne prend d'engagement financier réel.",
    "Évaluer un projet d'entreprise, c'est examiner son efficacité économique et ses impacts social et " +
    "environnemental.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Identifier un besoin non satisfait pouvant justifier la création d'une entreprise.",
    "☐ Créer un organigramme simple pour une équipe de projet.",
    "☐ Décrire les étapes essentielles de la création d'une entreprise.",
    "☐ Calculer un coût de production, un prix de vente et un chiffre d'affaires fictifs simples.",
    "☐ Expliquer pourquoi une entreprise scolaire simulée reste entièrement fictive.",
    "☐ Présenter les résultats d'un projet, avec ou sans outil numérique.",
    "☐ Évaluer l'efficacité et les impacts d'un projet d'entreprise.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : besoin, organigramme, mode de production, opportunité d'affaires, plan d'affaires, " +
    "financement, chiffre d'affaires, coût de production, prix, TCA (notion conceptuelle).",
    "Vocabulaire clé à maîtriser : entreprise, organigramme, plan d'affaires, chiffre d'affaires, coût de production.",
    "Avant l'évaluation, vérifie que tu peux : citer les étapes de création d'une entreprise ; calculer un " +
    "chiffre d'affaires simple (prix × quantité) ; expliquer pourquoi ce projet reste fictif.",
    "Question rapide de vérification : si un produit coûte 50 gourdes à produire et se vend 80 gourdes, quel " +
    "est le bénéfice fictif par produit vendu ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(4));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "organigramme · opportunité d'affaires · plan d'affaires · chiffre d'affaires · coût de production · prix de vente.",
  { italics: true },
));
children.push(numberedPar("1. Un besoin non satisfait qui pourrait être exploité par une entreprise est une ......................"));
children.push(numberedPar("2. Le document qui décrit un projet d'entreprise s'appelle un ......................"));
children.push(numberedPar("3. Un schéma qui montre la répartition des rôles dans une entreprise est un ......................"));
children.push(numberedPar("4. Ce que coûte la fabrication d'un produit s'appelle le ......................"));
children.push(numberedPar("5. La somme à laquelle un produit est proposé aux clients est son ......................"));
children.push(numberedPar("6. Le total des ventes réalisées sur une période s'appelle le ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Application / calcul simple"));
children.push(bodyPar(
  "Une équipe fabrique des sacs recyclés. Chaque sac coûte 50 gourdes à produire et se vend 90 gourdes.",
  { italics: true },
));
children.push(numberedPar("1. Quel est le bénéfice fictif réalisé sur un sac vendu ?"));
children.push(numberedPar("2. Si l'équipe vend 15 sacs, quel est le chiffre d'affaires fictif total ?"));
children.push(numberedPar("3. Quel est le coût de production fictif total pour ces 15 sacs ?"));
children.push(numberedPar("4. Quel est le bénéfice fictif total pour ces 15 sacs ?"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Analyse / comparaison"));
children.push(numberedPar("1. Compare une structure fonctionnelle et une structure divisionnelle : dans quel cas chacune serait-elle plus adaptée à un petit projet scolaire ?"));
children.push(numberedPar("2. Explique la différence entre une opportunité d'affaires et un plan d'affaires."));
children.push(numberedPar("3. Pourquoi une entreprise doit-elle prévoir une taxe sur son chiffre d'affaires, même sans en connaître le taux exact ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Mini-cas entrepreneurial"));
children.push(numberedPar("1. Une équipe propose un prix de vente très bas pour attirer plus de clients fictifs, même si cela réduit fortement son bénéfice. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("2. Un camarade pense qu'il faut vraiment enregistrer l'entreprise fictive de la classe auprès d'une institution réelle pour que le projet soit sérieux. Es-tu d'accord ? Justifie ta réponse."));
children.push(numberedPar("3. Propose une adaptation à un projet d'entreprise fictive qui aurait un impact environnemental négatif, pour le rendre plus responsable."));
children.push(numberedPar("4. Explique pourquoi évaluer les résultats d'un projet est aussi important que de le réaliser."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de créer, de manière entièrement fictive et simulée, une entreprise répondant à un " +
  "besoin local : identifier un besoin non satisfait, planifier la création de l'entreprise, créer un " +
  "organigramme simple, décrire les étapes essentielles de création (opportunité d'affaires, plan d'affaires, " +
  "financement, enregistrement légal) comme connaissances et non comme démarches réelles, utiliser des " +
  "notions économiques simples (chiffre d'affaires, coût de production, prix, TCA) dans des calculs fictifs, " +
  "présenter les résultats — avec ou sans numérique — et évaluer l'efficacité et les impacts du projet.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "entreprise · organigramme · opportunité d'affaires · plan d'affaires · chiffre d'affaires · coût de " +
  "production · prix · impact.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C04-06",
  "Évaluer les impacts d'un projet d'entreprise",
  "Un petit groupe d'élèves examinant ensemble un tableau d'évaluation (efficacité économique, impact social, " +
  "impact environnemental) rempli à la main, dans une salle de classe haïtienne.",
  "L'évaluation des impacts est une étape aussi importante que la création elle-même.",
  "Ancrer visuellement l'étape finale d'évaluation du projet.",
  "Illustration demi-page, scène de classe haïtienne, ton réflexif et sérieux.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C04-07",
  "Synthèse — Créer une entreprise fictive",
  "Une carte mentale ou un schéma en étapes (besoin, organigramme, étapes de création, coûts et prix, " +
  "présentation, évaluation), avec une icône simple pour chaque étape.",
  "Visualiser d'un coup d'œil la démarche complète de création d'entreprise enseignée dans ce chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style schéma/carte mentale colorée, cohérente avec la charte ETAP.",
));

await buildAndSave(children, 44, "Manuel_ETAP_9AF_Chapitre4.docx");
