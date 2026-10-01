// Manuel d'EC 9e AF — Chapitre 7 : Développement durable et coopération internationale
// (Unité 7 — S'engager pour la protection de l'environnement et pour un
// développement durable, Compétence C3).
//
// DERNIER CHAPITRE PÉDAGOGIQUE de l'architecture 7/7 verrouillée pour EC
// 9e AF — et DERNIER CHAPITRE DE TOUTE LA COLLECTION EC (7e+8e+9e AF = 21
// chapitres). Prolonge les Chapitres 1-6 (déjà finalisés, NON modifiés
// ici) : pagination continue à partir de la page 63 (Chapitre 1 = pages
// 1-11, Chapitre 2 = pages 12-21, Chapitre 3 = pages 22-32, Chapitre 4 =
// pages 33-42, Chapitre 5 = pages 43-52, Chapitre 6 = pages 53-62).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.40-42 : Unité 7, colonne 9e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "La
//     gestion collective éthique, raisonnée et équitable des ressources
//     renouvelables. Les institutions internationales et ONG pour la
//     protection de l'environnement et le développement durable."
//   - `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md` (verrouillée sans changement
//     dans `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`) : situation de départ
//     "un projet de développement durable impliquant une coopération
//     locale/internationale" ; activité "bilan du projet de reboisement
//     engagé sur le cycle". Compétence C3 uniquement — seule unité
//     mono-compétence sur les trois années.
//
// LIEN EXAMEN — STATUT HONNÊTE : comme le Chapitre 5, ce chapitre n'a pas
// de correspondance directement confirmée par `21_TABLE_MATIERES_EC_9AF_
// VERROUILLEE.md` (liste : Chapitres 1, 3, 4, 6). Un lien PARTIEL existe :
// `08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md` rattache un item du Texte
// modèle 2024 (classement d'attitudes citoyennes sur le déboisement, la
// pollution, la participation communautaire) conjointement aux Unités 4 ET
// 7. Ce lien partiel est utilisé avec prudence, sans affirmer une
// correspondance complète.
//
// PROGRESSION RÉELLE 7e → 8e → 9e AF (section 4 du prompt) : le Chapitre 7
// de 7e AF a construit le bien collectif et la préservation simple ; le
// Chapitre 7 de 8e AF a construit la gestion durable raisonnée (quatre
// critères) et l'enquête sur le déboisement. CES ACQUIS NE SONT PAS
// REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref, section 7.1) pour
// atteindre la « maîtrise attendue en fin de cycle » — la dimension
// INTERNATIONALE du développement durable (institutions internationales,
// ONG), entièrement nouvelle à ce stade, conformément à
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`.
//
// CLÔTURE DU NIVEAU 9e AF ET DE LA COLLECTION (section 2 du prompt) : ce
// chapitre reste un chapitre pédagogique ordinaire, centré sur l'Unité 7 —
// son résumé et sa synthèse portent sur les trois années de CETTE unité
// (biens collectifs → gestion raisonnée → coopération internationale),
// conformément au contenu officiellement prévu pour ce chapitre, et non
// sur une conclusion générale de tout le manuel ou de toute la collection,
// explicitement hors périmètre de ce prompt (réservée à une Phase Finale
// distincte).
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
  7,
  "Développement durable et coopération internationale",
  "Un bien collectif à préserver (7e AF). Une ressource à gérer durablement (8e AF). Aujourd'hui, un dernier " +
  "pas : comprendre que certains défis environnementaux dépassent les frontières d'un seul pays, et " +
  "nécessitent une coopération internationale.",
  [
    "Faire la synthèse de trois années sur la protection de l'environnement.",
    "Expliquer le rôle des institutions internationales et des ONG pour le développement durable.",
    "Analyser un projet de développement durable impliquant une coopération locale/internationale.",
    "Réaliser le bilan du projet de reboisement engagé sur le cycle.",
    "S'entraîner aux formats de jugement raisonné attestés à l'examen 9e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un projet soutenu de l'extérieur",
  [
    "Un projet de gestion de l'eau dans une commune haïtienne reçoit un appui technique et financier d'une " +
    "coopération internationale, en complément de l'engagement des habitants eux-mêmes. « Pourquoi ce projet " +
    "a-t-il besoin d'un soutien extérieur ? » se demande un élève. Ce chapitre t'aide à comprendre comment " +
    "l'échelle locale et l'échelle internationale se complètent en matière de développement durable.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e et 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris à préserver un bien collectif simple. En 8e AF, tu as découvert la gestion durable " +
  "d'une ressource renouvelable selon quatre critères (éthique, raisonnée, équitable, collective) et mené une " +
  "enquête sur le déboisement. Ce chapitre ne redéveloppe pas ces contenus : il les élargit à la dimension " +
  "internationale.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Développement durable — mode de développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs."));
children.push(bulletPar("Coopération internationale pour l'environnement — collaboration entre pays, institutions internationales ou ONG pour protéger l'environnement et soutenir un développement durable partagé."));
children.push(bulletPar("Institution internationale — organisation regroupant plusieurs États autour d'objectifs communs, y compris environnementaux."));
children.push(bulletPar("ONG environnementale — organisation non gouvernementale dont l'action est centrée sur la protection de l'environnement."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("De la préservation locale à la coopération mondiale", "7.1"));
children.push(bodyPar(
  "Ce cycle t'a fait parcourir trois étapes sur la protection de l'environnement : préserver un bien " +
  "collectif (7e AF), gérer durablement une ressource selon des critères précis (8e AF), et maintenant, " +
  "comprendre que certains enjeux environnementaux — déforestation à grande échelle, gestion de l'eau " +
  "partagée, changements climatiques — dépassent les frontières d'un seul pays.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Trois étapes, un même engagement",
  [
    "Échelle locale (7e AF) : préserver un bien collectif (espace vert, jardin scolaire).",
    "Échelle nationale (8e AF) : gérer durablement une ressource selon des critères précis (reboisement, " +
    "gestion raisonnée).",
    "Échelle internationale (9e AF) : coopérer avec d'autres pays, institutions et ONG pour des défis " +
    "environnementaux partagés.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C07-01",
  "Ouverture — Un projet de gestion de l'eau soutenu de l'extérieur",
  "Une scène haïtienne crédible montrant des habitants et des intervenants travaillant ensemble sur un projet " +
  "de gestion de l'eau (puits, réseau simple), dans un style illustratif cohérent avec la charte EC.",
  "Un projet concret de coopération illustre la complémentarité entre échelle locale et internationale.",
  "Ancrer l'ouverture du chapitre dans une scène constructive et réaliste.",
  "Illustration pleine largeur, scène de coopération locale/internationale, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les institutions internationales et ONG pour le développement durable", "7.2"));
children.push(bodyPar(
  "Plusieurs institutions internationales et ONG agissent, à travers le monde, pour la protection de " +
  "l'environnement et le développement durable — par le financement de projets, l'appui technique, ou la " +
  "coordination entre pays.",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-9AF-C07-01 — Emplacement réservé pour une fiche exacte et vérifiée sur le rôle d'une institution " +
    "internationale ou d'une ONG environnementale intervenant en Haïti.",
    "Statut : [SOURCE À VÉRIFIER] — aucune organisation précise n'est nommée ni détaillée ici tant que " +
    "l'information n'a pas été confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C07-02",
  "Exemple analysé — trois échelles de la protection de l'environnement",
  "Un schéma en trois cercles concentriques : « Local » (7e AF) → « National » (8e AF) → « International » " +
  "(9e AF), avec des icônes simples pour chaque échelle, cohérent avec la charte EC.",
  "Les trois échelles de protection de l'environnement s'emboîtent, du local à l'international.",
  "Rendre visible la synthèse des trois années sur ce thème.",
  "Illustration demi-page, schéma en cercles concentriques, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Un projet de développement durable, entre local et international", "7.3"));
children.push(bodyPar(
  "Beaucoup de projets de développement durable combinent aujourd'hui un engagement local (habitants, " +
  "autorités locales) et un appui international (financement, expertise technique). Aucun des deux niveaux, " +
  "à lui seul, ne suffit généralement à répondre à des défis environnementaux complexes.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Un projet de reboisement à deux échelles",
  [
    "Reprends la situation d'ouverture, adaptée à un projet de reboisement : une communauté haïtienne " +
    "s'engage à planter et entretenir des arbres sur une parcelle, tandis qu'une coopération internationale " +
    "fournit les plants et un appui technique.",
    "1. Quel rôle revient à la communauté locale ? Quel rôle revient à la coopération internationale ?",
    "2. En quoi ce projet illustre-t-il les quatre critères de gestion durable étudiés en 8e AF (éthique, " +
    "raisonnée, équitable, collective) ?",
    "3. Pourquoi un tel projet aurait-il moins de chances de réussir si un seul des deux niveaux (local ou " +
    "international) agissait seul ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Le développement durable, une responsabilité d'abord locale ou mondiale ?",
  [
    "Certains pensent que le développement durable doit d'abord reposer sur l'engagement local, chaque " +
    "communauté agissant à son échelle. D'autres pensent que les défis environnementaux actuels exigent " +
    "d'abord une coordination mondiale, sans laquelle l'action locale resterait insuffisante.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui reconnaît la complémentarité des deux échelles, " +
    "étudiée tout au long de ce chapitre.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne / Projet — Bilan du projet de reboisement sur le cycle"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit un bilan du projet de reboisement engagé sur le cycle. [OFFICIEL — " +
    "activité prévue par le programme]",
    "OBJECTIF : Faire le bilan, réel ou réfléchi, du projet de reboisement ou de préservation engagé en 8e AF " +
    "(ou d'un projet similaire), en le reliant à la dimension internationale étudiée dans ce chapitre.",
    "ÉTAPES : 1. Rappeler brièvement le projet engagé (espèces plantées, objectif initial). 2. Évaluer ce qui " +
    "a fonctionné et ce qui pourrait être amélioré. 3. Réfléchir : un appui extérieur (technique, matériel) " +
    "aurait-il pu renforcer ce projet ? Comment ? 4. Présenter ce bilan à la classe.",
    "RÉSULTAT ATTENDU : Un bilan honnête et réfléchi, reliant l'expérience concrète du cycle à la dimension " +
    "internationale du développement durable.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Activité citoyenne — Rechercher une institution internationale pour l'environnement"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Identifier, de façon générale, un type d'institution internationale ou d'ONG agissant pour " +
    "l'environnement.",
    "CONSIGNES : Avec l'aide d'un adulte, d'un(e) enseignant(e) ou d'une source fiable, identifie le type de " +
    "mission qu'une telle organisation pourrait remplir (reboisement, gestion de l'eau, lutte contre la " +
    "pollution).",
    "ÉTAPES : 1. Choisir un type d'action environnementale internationale. 2. Décrire son objectif général. " +
    "3. Expliquer en quoi cette action complète l'engagement local déjà connu depuis la 7e AF.",
    "RÉSULTAT ATTENDU : Une fiche courte et honnête, sans détail non vérifié sur une organisation précise.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C07-03",
  "Espace de production — mon bilan du projet de reboisement",
  "Un cadre vide, format portrait, structuré en zones (rappel du projet / ce qui a fonctionné / à améliorer / " +
  "rôle possible d'un appui international), prévu pour que l'élève y rédige directement son bilan.",
  "Offrir un espace direct de production pour le bilan final du projet de reboisement du cycle.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine vert communautaire, quatre zones délimitées, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La protection de l'environnement s'exerce à trois échelles complémentaires : locale (7e AF), nationale " +
    "(8e AF) et internationale (9e AF).",
    "Les institutions internationales et les ONG environnementales appuient le développement durable par le " +
    "financement, l'expertise technique et la coordination entre pays.",
    "Un projet de développement durable réussit souvent mieux en combinant engagement local et appui " +
    "international, plutôt qu'en s'appuyant sur un seul niveau.",
    "Faire le bilan d'un projet permet d'évaluer honnêtement ses réussites et ses limites, pour mieux " +
    "poursuivre l'engagement citoyen.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de faire la synthèse des trois années consacrées à la protection de l'environnement " +
  "(préservation locale, gestion raisonnée, coopération internationale), de découvrir le rôle des " +
  "institutions internationales et des ONG pour le développement durable, et de réaliser le bilan du projet " +
  "de reboisement engagé sur le cycle — complétant ainsi les 7 unités du programme d'Éducation à la " +
  "Citoyenneté pour la 9e Année Fondamentale.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "développement durable · coopération internationale · institution internationale · ONG environnementale.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Relier les trois échelles de protection de l'environnement étudiées sur le cycle.",
    "☐ Expliquer le rôle d'une institution internationale ou d'une ONG pour le développement durable.",
    "☐ Analyser un projet combinant engagement local et coopération internationale.",
    "☐ Présenter un bilan honnête d'un projet environnemental engagé sur plusieurs années.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : développement durable, coopération internationale, institution internationale, " +
    "ONG environnementale, synthèse des trois échelles.",
    "Vocabulaire clé à maîtriser : développement durable, coopération internationale, ONG environnementale.",
    "Avant l'évaluation, vérifie que tu peux : relier les trois échelles du cycle ; expliquer le rôle d'une " +
    "institution internationale ; analyser un projet à deux échelles.",
    "Rappel officiel : le lien direct de cette unité avec le Texte modèle 2024 reste partiel (un item commun " +
    "avec l'Unité 4, sur le classement d'attitudes citoyennes liées au déboisement et à la pollution) — aucune " +
    "correspondance complète n'est affirmée [conforme au statut documenté, transparence maintenue].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(7));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "développement durable · coopération internationale · institution internationale · ONG environnementale.",
  { italics: true },
));
children.push(numberedPar("1. Un mode de développement qui répond aux besoins du présent sans compromettre l'avenir s'appelle le ......................"));
children.push(numberedPar("2. Une collaboration entre pays pour protéger l'environnement s'appelle une ......................"));
children.push(numberedPar("3. Une organisation regroupant plusieurs États autour d'objectifs communs s'appelle une ......................"));
children.push(numberedPar("4. Une organisation non gouvernementale centrée sur la protection de l'environnement s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite les trois échelles de protection de l'environnement étudiées sur le cycle (7e, 8e, 9e AF)."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Un projet de développement durable n'a jamais besoin d'appui extérieur pour réussir. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec l'exemple du projet de gestion de l'eau étudié dans ce chapitre, comment l'échelle locale et l'échelle internationale peuvent se compléter."));
children.push(numberedPar("2. Pourquoi certains défis environnementaux (déforestation à grande échelle, changements climatiques) nécessitent-ils une coopération internationale ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Présente ton bilan du projet de reboisement engagé sur le cycle, en expliquant ce qui a fonctionné et ce qui pourrait être amélioré."));
children.push(numberedPar("2. Décris le type d'appui international qui pourrait renforcer un projet environnemental local que tu connais ou imagines."));
children.push(numberedPar("3. Un camarade affirme : « L'environnement, c'est un problème mondial, donc les actions locales ne servent à rien. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris sur les trois années du cycle ?"));
children.push(spacer(240));

// =======================================================================
// BLOC SPÉCIFIQUE — PRÉPARATION AUX EXAMENS OFFICIELS 9e AF
// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Préparation à l'examen officiel de 9e AF", ""));
children.push(bodyPar(
  "Comme pour le Chapitre 5, ce chapitre ne présente qu'un lien PARTIEL et documenté avec le Texte modèle " +
  "2024 — cette limite est signalée en toute transparence.",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE MODÈLE MENFP / DOCUMENT DE PRÉPARATION — Traçabilité (lien partiel)",
  [
    "Référence : « EXAMENS DE 9ème ANNÉE FONDAMENTALE » (juillet 2024), matière Éducation à la Citoyenneté, " +
    "MENFP/DEF/BUNEXE, statut [TEXTE MODÈLE] — jamais requalifié en « examen officiel », statut de " +
    "reproduction [DROITS / SOURCE À RÉGLER], non reproduit.",
    "Lien documenté (`08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`) : l'item « classement d'attitudes » " +
    "(déboisement, pollution, participation communautaire) est rattaché CONJOINTEMENT aux Unités 4 et 7 — pas " +
    "une correspondance exclusive et complète à l'Unité 7. Ce chapitre exploite ce lien avec prudence.",
    "Aucune ressource 2025/2026 vérifiée n'est disponible à ce jour — statut [À VÉRIFIER — PREUVE À FOURNIR] " +
    "inchangé depuis le Chapitre 1.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("A. Entraînement type examen — Jugement raisonné"));
children.push(bodyPar(
  "Question originale, inspirée du format « jugement raisonné » partiellement documenté pour cette unité.",
  { italics: true },
));
children.push(numberedPar("1. Classe les actions suivantes en « favorables au développement durable » ou « défavorables au développement durable » : (a) participer à un projet communautaire de reboisement ; (b) ignorer les conséquences environnementales d'une décision locale ; (c) coopérer avec un appui international pour un projet de gestion de l'eau."));
children.push(spacer(200));

children.push(subHeading("B. Entraînement type examen — Analyse de situation"));
children.push(bodyPar(
  "Question originale, dans le format « analyse de situation citoyenne » utilisé de façon générale dans les " +
  "ressources d'examen consultées.",
  { italics: true },
));
children.push(numberedPar("1. En 3 à 5 lignes, explique pourquoi un projet de développement durable combinant engagement local et coopération internationale a souvent plus de chances de réussir qu'un projet reposant sur un seul niveau."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mini-évaluation — Préparation à l'examen officiel de 9e AF, Chapitre 7", ""));
children.push(bodyPar(
  "Épreuve d'entraînement originale, propre à ce manuel. Elle ne reproduit pas et ne remplace pas une épreuve " +
  "MENFP réelle. Barème indicatif sur 20 points. Le corrigé est réservé à la Phase Finale du manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — QCM (8 points, 4 questions)"));
children.push(numberedPar("1. Le développement durable vise à répondre aux besoins du présent : (a) sans se soucier de l'avenir (b) sans compromettre les générations futures (c) uniquement à l'échelle locale"));
children.push(numberedPar("2. Une ONG environnementale est principalement définie par : (a) son appartenance à un gouvernement (b) son indépendance et son action pour l'environnement (c) sa mission militaire"));
children.push(numberedPar("3. La coopération internationale pour l'environnement implique : (a) uniquement un seul pays (b) plusieurs pays, institutions ou ONG (c) aucune institution"));
children.push(numberedPar("4. Un projet de développement durable combinant local et international illustre surtout : (a) une concurrence entre échelles (b) une complémentarité entre échelles (c) l'inutilité de l'échelle locale"));
children.push(spacer(200));

children.push(subHeading("Partie II — Jugement raisonné (6 points)"));
children.push(bodyPar(
  "Classe les actions suivantes en « favorables » ou « défavorables » au développement durable, en " +
  "justifiant brièvement : (a) accepter un appui technique international pour un projet local respectueux de " +
  "l'environnement ; (b) exploiter une ressource sans se soucier de sa régénération ; (c) partager les " +
  "bénéfices d'un projet environnemental avec l'ensemble de la communauté.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie III — Bilan argumenté (6 points)"));
children.push(numberedPar("1. En t'appuyant sur les trois années du cycle (préservation locale, gestion raisonnée, coopération internationale), rédige un court bilan de ce que représente, pour toi, l'engagement citoyen pour l'environnement."));

await buildAndSave(children, 63, "Manuel_EC_9AF_Chapitre7.docx");
