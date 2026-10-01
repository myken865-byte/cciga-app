// Manuel d'EC 9e AF — Chapitre 3 : La loi, l'impôt et la solidarité nationale
// (Unité 3 — Savoir être et agir en citoyenne et citoyen d'un État
// démocratique, Compétences C1, C2, C3).
//
// Prolonge les Chapitres 1-2 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 22 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-21).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.35-36 : Unité 3, colonne 9e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "La loi
//     comme principe d'un État démocratique. La démocratie comme conquête
//     au quotidien. L'engagement éthique en tant que citoyenne et citoyen.
//     Prélèvement et redistribution (rôle, fonction, forme de l'impôt),
//     solidarité nationale et internationale."
//   - `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md` (verrouillée sans changement
//     dans `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`) : situation de départ
//     "les deux textes documentaires sur l'impôt, dans l'esprit du Texte
//     modèle (sans en copier les énoncés)" ; activité "étude chiffrée
//     simple (lien mathématiques) sur un projet financé par la
//     redistribution".
//
// **CHAPITRE AU LIEN EXAMEN LE PLUS FORT DE LA COLLECTION** : le contenu
// fiscal de cette unité correspond DIRECTEMENT à la Partie III du Texte
// modèle EC 9e AF 2024 (20 points sur 100, compréhension de deux textes
// documentaires sur le paiement des impôts — obligation fiscale, usage de
// l'impôt, rôles financier/économique/social), ainsi qu'à la question 7 de
// la Partie II (justification en 2-3 lignes sur l'obligation de payer
// l'impôt), voir `07_INVENTAIRE_EXAMENS_EC_9AF.md` et `08_MATRICE_
// EXIGENCES_EVALUATION_EC_9AF.md`. Conformément à la règle de preuve
// (section 7 du prompt d'exécution), le format et le niveau de difficulté
// SEULEMENT servent de repère : les deux textes documentaires ci-dessous
// sont des créations 100% originales, aucun énoncé du Texte modèle 2024
// n'est reproduit ni paraphrasé de façon reconnaissable.
//
// PROGRESSION RÉELLE 7e → 8e → 9e AF (section 4 du prompt) : le Chapitre 3
// de 7e AF a construit le fonctionnement général d'un État démocratique
// (élection de classe, coopérative) ; le Chapitre 3 de 8e AF a introduit la
// séparation des pouvoirs (exécutif/législatif/judiciaire). CES ACQUIS NE
// SONT PAS REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref, section 3.1)
// pour construire un contenu réellement nouveau — la loi comme PRINCIPE
// (légitimité, égalité devant la loi), l'engagement éthique du citoyen, et
// surtout le rôle de l'impôt et la solidarité nationale/internationale,
// notion technique entièrement nouvelle à ce stade de la collection. La
// formule « conquête au quotidien », déjà rencontrée en 7e AF à propos de
// la démocratie de classe, est reformulée ici à un niveau plus abstrait
// (l'engagement éthique et fiscal du citoyen), conformément à la continuité
// documentée par la matrice de progression, sans répéter le contenu 7e AF.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_SITUATION_FILL, BOX_SITUATION_LINE,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE,
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE,
  BOX_DEBAT_FILL, BOX_DEBAT_LINE,
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE,
  BOX_PROJET_FILL, BOX_PROJET_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BLEU_CIVIQUE, OR_CITOYEN, VERT_COMMUNAUTAIRE, ANTHRACITE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  3,
  "La loi, l'impôt et la solidarité nationale",
  "Une route réparée. Une école publique qui fonctionne. Un centre de santé ouvert. Derrière ces réalités " +
  "concrètes se trouve souvent un mécanisme peu visible : l'impôt. Ce chapitre t'explique comment la loi " +
  "organise la solidarité entre citoyens, et pourquoi cette solidarité te concerne directement.",
  [
    "Expliquer ce qui fait d'une loi un principe légitime dans un État démocratique.",
    "Définir l'impôt et ses rôles financier, économique et social.",
    "Lire et interpréter des textes documentaires sur la fiscalité.",
    "Expliquer le lien entre prélèvement, redistribution et solidarité nationale.",
    "S'entraîner à la compréhension de texte, format central de l'examen officiel de 9e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — D'où vient l'argent de l'école publique ?",
  [
    "Une classe de 9e AF visite une école publique récemment rénovée. « Qui a payé pour ça ? » demande un " +
    "élève. L'enseignant répond : « En partie, ce sont des citoyens comme vos parents, à travers l'impôt. » " +
    "Ce chapitre t'explique ce mécanisme, central dans le fonctionnement d'un État démocratique.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e et 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as compris le fonctionnement général d'un État démocratique. En 8e AF, tu as découvert la " +
  "séparation des pouvoirs (exécutif, législatif, judiciaire). Ce chapitre ne redéveloppe pas ces contenus : " +
  "il les mobilise pour comprendre un mécanisme précis — comment la loi organise le financement de la vie " +
  "collective par l'impôt.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Loi — règle adoptée selon une procédure démocratique légitime, qui s'applique également à tous les citoyens (égalité devant la loi)."));
children.push(bulletPar("État de droit — principe selon lequel l'État lui-même est soumis à la loi, au même titre que les citoyens."));
children.push(bulletPar("Impôt — prélèvement obligatoire, fixé par la loi, versé par les citoyens et les entreprises pour financer les dépenses collectives."));
children.push(bulletPar("Redistribution — usage des recettes de l'impôt pour financer des services et des projets qui profitent à l'ensemble de la collectivité."));
children.push(bulletPar("Solidarité nationale — principe selon lequel les citoyens contribuent ensemble, notamment par l'impôt, au bien-être de la collectivité entière."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La loi comme principe d'un État démocratique", "3.1"));
children.push(bodyPar(
  "Une loi n'est pas seulement une règle à respecter : dans un État démocratique, elle est un PRINCIPE. Elle " +
  "doit être adoptée selon une procédure légitime (rappel : le pouvoir législatif, étudié en 8e AF) et " +
  "s'appliquer également à tous, y compris à l'État lui-même — c'est ce qu'on appelle l'État de droit.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Ce qui rend une loi légitime",
  [
    "Elle est adoptée selon une procédure démocratique reconnue (et non imposée arbitrairement).",
    "Elle s'applique également à tous les citoyens, sans exception injustifiée.",
    "Elle engage aussi l'État lui-même, qui doit la respecter (État de droit).",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C03-01",
  "Ouverture — L'école publique rénovée",
  "Une scène haïtienne crédible d'une école publique rénovée, avec des élèves observant les travaux achevés, " +
  "dans un style illustratif cohérent avec la charte EC.",
  "Une réalisation publique concrète introduit le rôle invisible mais réel de l'impôt.",
  "Ancrer l'ouverture du chapitre dans une scène concrète et positive.",
  "Illustration pleine largeur, scène scolaire haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("L'impôt : rôles financier, économique et social", "3.2"));
children.push(bodyPar(
  "L'impôt est un prélèvement obligatoire, fixé par la loi, qui finance les dépenses collectives. Il remplit " +
  "trois rôles complémentaires.",
));
children.push(threeColTable(
  ["Rôle", "Ce qu'il signifie", "Exemple"],
  [
    ["Financier", "Financer directement les services publics", "Écoles, routes, hôpitaux publics"],
    ["Économique", "Orienter et stabiliser l'activité économique du pays", "Soutien à des secteurs prioritaires"],
    ["Social", "Réduire les écarts entre citoyens par la redistribution", "Aide aux zones ou familles les plus vulnérables"],
  ],
  [2200, 3800, 3400],
));
children.push(spacer(200));

children.push(subHeading("Textes documentaires — Comprendre le rôle de l'impôt"));
children.push(bodyPar(
  "Les deux textes courts ci-dessous sont des créations originales pour ce manuel, rédigées dans l'esprit " +
  "des textes documentaires observés dans les ressources d'examen — ils ne reproduisent aucun énoncé " +
  "existant.",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DOCUMENTAIRE A — Pourquoi paie-t-on l'impôt ?",
  [
    "« Dans un pays, beaucoup de services profitent à tout le monde en même temps : une route, une école " +
    "publique, un hôpital. Aucun citoyen ne pourrait financer seul ces services. C'est pourquoi la loi prévoit " +
    "que chacun contribue, selon ses moyens, par l'impôt. Cet argent est ensuite mis en commun et redistribué " +
    "pour financer ces services partagés. Ne pas payer l'impôt prévu par la loi prive donc la collectivité de " +
    "ressources dont elle a besoin. »",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DOCUMENTAIRE B — Un exemple de redistribution",
  [
    "« Dans une commune, les recettes fiscales collectées au niveau national ont permis de financer la " +
    "réparation d'une route reliant plusieurs sections communales à un marché important. Avant ces travaux, " +
    "les commerçants perdaient beaucoup de temps et de marchandises à cause du mauvais état de la route. " +
    "Grâce à ce projet financé par la redistribution, l'accès au marché s'est nettement amélioré pour " +
    "l'ensemble de la population locale. »",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C03-02",
  "Exemple analysé — le cycle de l'impôt",
  "Un schéma circulaire en trois étapes : « Prélèvement » (citoyens et entreprises) → « Mise en commun » " +
  "(recettes de l'État) → « Redistribution » (services et projets collectifs), cohérent avec la charte EC.",
  "L'impôt suit un cycle clair, du prélèvement individuel au bénéfice collectif.",
  "Donner une référence visuelle claire du cycle de l'impôt.",
  "Illustration demi-page, schéma circulaire en trois étapes, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Solidarité nationale et internationale", "3.3"));
children.push(bodyPar(
  "La redistribution organisée par l'impôt exprime une solidarité nationale : chacun contribue selon ses " +
  "moyens, et chacun peut bénéficier des services financés collectivement. Cette solidarité peut aussi " +
  "s'exercer à l'échelle internationale, par exemple à travers une aide entre États ou des mécanismes de " +
  "coopération — un thème que tu approfondiras au Chapitre 6.",
));
children.push(spacer(200));

children.push(sectionHeading("L'engagement éthique du citoyen face à la loi et à l'impôt", "3.4"));
children.push(bodyPar(
  "Respecter la loi et contribuer honnêtement à l'impôt relève de l'engagement éthique du citoyen, déjà " +
  "rencontré à d'autres échelles dans ce cycle (Chapitre 2). C'est une façon concrète de « conquérir » la " +
  "démocratie au quotidien — non plus seulement par le vote ou le dialogue (7e AF), mais par une contribution " +
  "réelle et continue à la vie collective.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Refuser de contribuer, quelles conséquences ?",
  [
    "Dans une commune, plusieurs commerçants refusent de contribuer aux taxes locales prévues par la loi, " +
    "estimant que « ça ne sert à rien ».",
    "1. À partir des Textes documentaires A et B, explique ce que cette situation prive la collectivité.",
    "2. Cette situation relève-t-elle davantage d'un problème de loi, d'éthique citoyenne, ou des deux ? " +
    "Justifie.",
    "3. Que répondrais-tu à un commerçant qui pense que sa contribution individuelle « ne change rien » ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Payer l'impôt : une contrainte ou un acte de solidarité ?",
  [
    "Certains pensent que l'impôt est avant tout une contrainte légale à laquelle on ne peut pas échapper. " +
    "D'autres pensent qu'il faut d'abord le comprendre comme un acte de solidarité envers la collectivité.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte à la fois de la dimension légale et " +
    "de la dimension éthique de l'impôt.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Identifier des services financés par l'impôt"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Identifier, dans ta commune ou ton quartier, des services ou infrastructures probablement " +
    "financés en tout ou partie par des fonds publics.",
    "CONSIGNES : Observe ton environnement (école publique, route, centre de santé, éclairage public) et " +
    "identifie au moins deux exemples plausibles.",
    "ÉTAPES : 1. Lister deux services observés. 2. Relier chacun à un rôle de l'impôt (financier, économique " +
    "ou social). 3. Présenter le résultat à la classe.",
    "RÉSULTAT ATTENDU : Une liste courte et argumentée reliant des services concrets aux rôles de l'impôt " +
    "étudiés dans ce chapitre.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Étude chiffrée d'un projet financé par la redistribution"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit une étude chiffrée simple, en lien avec les mathématiques, sur un projet " +
    "financé par la redistribution. [OFFICIEL — activité prévue par le programme]",
    "OBJECTIF : Réaliser un calcul simple illustrant comment une contribution collective peut financer un " +
    "projet commun.",
    "EXEMPLE DE DÉMARCHE : Si 200 familles d'un quartier contribuaient chacune à un fonds commun pour " +
    "réparer une rue, et que la réparation coûte une somme donnée, calcule la contribution moyenne par " +
    "famille. Réfléchis ensuite : cette somme te semble-t-elle réaliste pour la plupart des familles ? " +
    "Pourquoi la contribution de chacun peut-elle rester modeste alors que le projet est important ?",
    "RÉSULTAT ATTENDU : Un calcul simple et juste, accompagné d'une courte explication reliant le résultat au " +
    "principe de redistribution.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C03-03",
  "Espace de production — mon étude chiffrée",
  "Un cadre vide, format portrait, structuré en zones pour le calcul (données, opération, résultat) et une " +
  "zone d'explication, prévu pour que l'élève y réalise directement son étude chiffrée.",
  "Offrir un espace direct de production pour l'étude chiffrée du projet financé par la redistribution.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine vert communautaire, zones de calcul et d'explication, format portrait pleine " +
  "page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une loi légitime dans un État démocratique est adoptée démocratiquement, s'applique à tous et engage " +
    "l'État lui-même (État de droit).",
    "L'impôt est un prélèvement obligatoire qui remplit trois rôles : financier, économique et social.",
    "La redistribution transforme les recettes de l'impôt en services et projets qui profitent à la " +
    "collectivité — c'est la solidarité nationale en action.",
    "Contribuer honnêtement à l'impôt est une forme concrète d'engagement éthique et de « conquête au " +
    "quotidien » de la démocratie.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de comprendre la loi comme principe d'un État démocratique, de découvrir les trois " +
  "rôles de l'impôt à travers deux textes documentaires originaux, de relier prélèvement et redistribution à " +
  "la solidarité nationale, et de réaliser une étude chiffrée simple sur un projet financé par la " +
  "redistribution — le contenu le plus directement confirmé par l'examen officiel de 9e AF dans toute cette " +
  "collection.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "loi · État de droit · impôt · redistribution · solidarité nationale.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer ce qui rend une loi légitime dans un État démocratique.",
    "☐ Citer les trois rôles de l'impôt et donner un exemple pour chacun.",
    "☐ Lire un texte documentaire sur la fiscalité et en extraire les informations essentielles.",
    "☐ Expliquer le lien entre prélèvement, redistribution et solidarité nationale.",
    "☐ Réaliser un calcul simple sur un projet financé par la redistribution.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : loi, État de droit, impôt (rôles financier/économique/social), redistribution, " +
    "solidarité nationale.",
    "Vocabulaire clé à maîtriser : loi, impôt, redistribution, solidarité nationale.",
    "Avant l'évaluation, vérifie que tu peux : expliquer les trois rôles de l'impôt ; lire un texte " +
    "documentaire sur la fiscalité ; justifier l'obligation fiscale en 2-3 lignes.",
    "Rappel officiel : cette unité correspond directement à la Partie III du Texte modèle 2024 (compréhension " +
    "de textes sur l'impôt, 20 points) et à la question de justification de la Partie II — le contenu de ce " +
    "chapitre est donc particulièrement représentatif du niveau attendu à l'examen [OFFICIEL — SOURCE MENFP " +
    "VÉRIFIÉE, correspondance documentée].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : loi · " +
  "impôt · redistribution · solidarité nationale · État de droit.",
  { italics: true },
));
children.push(numberedPar("1. Une règle adoptée selon une procédure démocratique légitime s'appelle une ......................"));
children.push(numberedPar("2. Un prélèvement obligatoire fixé par la loi pour financer les dépenses collectives s'appelle un ......................"));
children.push(numberedPar("3. L'usage des recettes fiscales pour financer des projets collectifs s'appelle la ......................"));
children.push(numberedPar("4. Le principe selon lequel les citoyens contribuent ensemble au bien-être collectif s'appelle la ......................"));
children.push(numberedPar("5. Le principe selon lequel l'État lui-même est soumis à la loi s'appelle l'......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. À partir du Texte documentaire A, cite deux raisons pour lesquelles l'impôt est nécessaire au financement de services partagés."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse à partir du Texte documentaire B : « La réparation de la route n'a profité qu'aux commerçants directement concernés. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec tes propres mots, la différence entre le rôle financier et le rôle social de l'impôt."));
children.push(numberedPar("2. Pourquoi dit-on que respecter la loi engage aussi l'État lui-même, pas seulement les citoyens ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas des commerçants refusant de contribuer. Rédige un argumentaire court expliquant les conséquences collectives de ce refus."));
children.push(numberedPar("2. Présente les résultats de ton étude chiffrée sur un projet financé par la redistribution, en expliquant le lien avec la solidarité nationale."));
children.push(numberedPar("3. Un camarade affirme : « Je ne bénéficierai jamais personnellement de mes contributions, donc ça ne sert à rien. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(240));

// =======================================================================
// BLOC SPÉCIFIQUE — PRÉPARATION AUX EXAMENS OFFICIELS 9e AF
// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Préparation à l'examen officiel de 9e AF", ""));
children.push(bodyPar(
  "Ce chapitre présente la correspondance la plus directe et la plus forte de toute la collection avec le " +
  "Texte modèle 2024 (Partie III, compréhension de texte sur l'impôt, et question de justification de la " +
  "Partie II).",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE MODÈLE MENFP / DOCUMENT DE PRÉPARATION — Traçabilité (correspondance renforcée)",
  [
    "Référence : « EXAMENS DE 9ème ANNÉE FONDAMENTALE » (juillet 2024), matière Éducation à la Citoyenneté, " +
    "MENFP/DEF/BUNEXE, statut [TEXTE MODÈLE] — jamais requalifié en « examen officiel », statut de " +
    "reproduction [DROITS / SOURCE À RÉGLER], non reproduit.",
    "Correspondance documentée (`08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`) : la Partie III du Texte modèle " +
    "(20 points sur 100) porte sur la compréhension de deux textes documentaires sur le paiement des impôts " +
    "(obligation fiscale, usage de l'impôt, rôles financier/économique/social) — thème identique à celui de " +
    "ce chapitre. La question 7 de la Partie II (justification en 2-3 lignes sur l'obligation de payer " +
    "l'impôt) correspond également à ce chapitre.",
    "Seuls le FORMAT (compréhension de texte documentaire, justification courte) et le NIVEAU DE DIFFICULTÉ " +
    "servent de repère : les Textes documentaires A et B de ce chapitre sont des créations 100 % originales.",
    "Aucune ressource 2025/2026 vérifiée n'est disponible à ce jour — statut [À VÉRIFIER — PREUVE À FOURNIR] " +
    "inchangé.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("A. Entraînement type examen — Compréhension de texte documentaire"));
children.push(bodyPar(
  "Relis le Texte documentaire A et le Texte documentaire B de ce chapitre, puis réponds aux questions " +
  "suivantes — format directement inspiré de la Partie III du Texte modèle 2024.",
  { italics: true },
));
children.push(numberedPar("1. D'après le Texte documentaire A, pourquoi aucun citoyen ne pourrait-il financer seul certains services publics ?"));
children.push(numberedPar("2. D'après le Texte documentaire B, quel effet concret la réparation de la route a-t-elle eu sur la population locale ?"));
children.push(numberedPar("3. En t'appuyant sur les deux textes, identifie un rôle de l'impôt (financier, économique ou social) illustré par chacun."));
children.push(spacer(200));

children.push(subHeading("B. Entraînement type examen — Justification courte"));
children.push(bodyPar(
  "Question originale, inspirée du format de la question 7 (Partie II) du Texte modèle 2024.",
  { italics: true },
));
children.push(numberedPar("1. En 2 à 3 lignes, justifie pourquoi contribuer à l'impôt prévu par la loi peut être considéré comme un acte de solidarité, et non seulement comme une obligation légale."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mini-évaluation — Préparation à l'examen officiel de 9e AF, Chapitre 3", ""));
children.push(bodyPar(
  "Épreuve d'entraînement originale, propre à ce manuel. Elle ne reproduit pas et ne remplace pas une épreuve " +
  "MENFP réelle. Barème indicatif sur 20 points, avec un poids renforcé sur la compréhension de texte, " +
  "cohérent avec le poids réel de ce thème dans le Texte modèle 2024 (Partie III, 20 points sur 100). Le " +
  "corrigé est réservé à la Phase Finale du manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — Compréhension de texte documentaire (10 points)"));
children.push(bodyPar(
  "Relis un troisième texte documentaire original, puis réponds aux questions.",
  { italics: true },
));
children.push(calloutBox(
  "TEXTE DOCUMENTAIRE C — L'impôt et les priorités collectives",
  [
    "« Chaque année, l'État doit décider comment utiliser les recettes fiscales collectées : combien pour " +
    "l'éducation, combien pour la santé, combien pour les infrastructures. Ces choix ne sont pas neutres : " +
    "privilégier un domaine signifie souvent en financer un autre plus modestement. C'est pourquoi le débat " +
    "démocratique sur l'usage de l'impôt reste important, même après que la loi fiscale a été adoptée. »",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(numberedPar("1. D'après ce texte, pourquoi l'usage de l'impôt continue-t-il de faire débat même après l'adoption de la loi fiscale ?"));
children.push(numberedPar("2. Quel rôle de l'impôt (financier, économique ou social) ce texte illustre-t-il le mieux ? Justifie."));
children.push(spacer(200));

children.push(subHeading("Partie II — QCM sur les rôles de l'impôt (6 points, 3 questions)"));
children.push(numberedPar("1. Financer une école publique relève principalement du rôle : (a) financier (b) économique (c) social"));
children.push(numberedPar("2. Réduire les écarts entre citoyens par la redistribution relève principalement du rôle : (a) financier (b) économique (c) social"));
children.push(numberedPar("3. Un État qui respecte ses propres lois applique le principe : (a) de la souveraineté (b) de l'État de droit (c) de la redistribution"));
children.push(spacer(200));

children.push(subHeading("Partie III — Justification courte (4 points)"));
children.push(numberedPar("1. En 2 à 3 lignes, explique pourquoi une loi fiscale doit s'appliquer également à tous les citoyens pour être considérée comme légitime."));

await buildAndSave(children, 22, "Manuel_EC_9AF_Chapitre3.docx");
