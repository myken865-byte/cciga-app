// Manuel d'EC 9e AF — Chapitre 5 : Résoudre les conflits, connaître la justice
// (Unité 5 — La résolution de conflit et le vivre ensemble,
// Compétences C1, C3).
//
// Prolonge les Chapitres 1-4 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 43 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-21, Chapitre 3 = pages 22-32, Chapitre 4 = pages
// 33-42).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.37-38 : Unité 5, colonne 9e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "La
//     résolution des conflits. La démarche critique et l'argumentation, le
//     débat. Les institutions judiciaires et les institutions chargées de
//     faire respecter la loi."
//   - `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md` (verrouillée sans changement
//     dans `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`) : situation de départ
//     "un cas complexe nécessitant argumentation et connaissance
//     institutionnelle" ; activité "présentation d'affaires simplifiées
//     (présomption d'innocence)".
//
// LIEN EXAMEN — STATUT HONNÊTE (section 3/7 du prompt d'exécution) :
// contrairement aux Chapitres 1, 3, 4 et 6 (correspondance directement
// confirmée par `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`), ce Chapitre 5
// n'a PAS de correspondance directement confirmée dans l'audit de Phase 0.
// Un lien PARTIEL existe : `08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`
// rattache un item du Texte modèle 2024 (distinction entre actions
// favorisant la culture de la paix et actions la desservant — violence,
// incitation) conjointement aux Unités 5 ET 6. Ce lien partiel est utilisé
// avec prudence dans le bloc examen ci-dessous, sans être présenté comme
// une correspondance directe et complète — conformément à la règle
// « ne jamais inventer un contenu officiel ».
//
// PROGRESSION RÉELLE 7e → 8e → 9e AF (section 4 du prompt) : le Chapitre 5
// de 7e AF a construit la négociation simple (méthode de dialogue) ; le
// Chapitre 5 de 8e AF a construit l'argumentaire structuré et une première
// connaissance des formes de justice (civile/pénale, hiérarchie générale
// des tribunaux, présomption d'innocence). CES ACQUIS NE SONT PAS
// REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref, section 5.1) pour
// atteindre la « maîtrise attendue en fin de cycle » explicitement nommée
// par la table des matières verrouillée — une résolution de conflit
// autonome et complexe, et une connaissance approfondie des institutions
// judiciaires ET des institutions chargées de faire respecter la loi
// (notion technique nouvelle, distincte de la dimension « défense du
// territoire » de l'Unité 6, traitée au Chapitre 6).
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
  5,
  "Résoudre les conflits, connaître la justice",
  "Négocier (7e AF). Argumenter (8e AF). Aujourd'hui, un pas de plus : résoudre un conflit complexe de façon " +
  "autonome, et comprendre en profondeur les institutions qui interviennent quand le dialogue seul ne " +
  "suffit plus.",
  [
    "Résoudre un conflit complexe en mobilisant négociation et argumentation.",
    "Approfondir la connaissance des institutions judiciaires.",
    "Comprendre le rôle des institutions chargées de faire respecter la loi.",
    "Présenter une affaire simplifiée en respectant la présomption d'innocence.",
    "S'entraîner aux formats d'analyse de situation attestés à l'examen 9e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un conflit qui s'envenime",
  [
    "Un différend commercial entre deux voisins commerçants, d'abord réglé par une simple discussion, finit " +
    "par s'aggraver : accusations, tensions, intervention d'un tiers, puis d'une institution. « À quel moment " +
    "un désaccord devient-il une affaire pour la justice ? » se demande une élève de 9e AF. Ce chapitre " +
    "t'aide à répondre, en mobilisant tout ce que tu as appris sur trois ans.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e et 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris une méthode simple de négociation. En 8e AF, tu as construit un argumentaire " +
  "structuré et découvert les formes de justice (civile, pénale) et la présomption d'innocence. Ce chapitre " +
  "ne redéveloppe pas ces contenus : il les mobilise ensemble pour résoudre des situations plus complexes.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Résolution de conflit maîtrisée — capacité à choisir et combiner, de façon autonome, les outils appropriés (dialogue, négociation, argumentation, recours institutionnel) selon la complexité d'une situation."));
children.push(bulletPar("Cour de cassation — plus haute instance judiciaire, qui vérifie que la loi a été correctement appliquée par les tribunaux inférieurs."));
children.push(bulletPar("Institution chargée de faire respecter la loi — organisme (comme la police, dans sa fonction judiciaire) qui contribue à faire appliquer les décisions de justice et à faire respecter la loi au quotidien."));
children.push(bulletPar("Affaire simplifiée — présentation pédagogique, simplifiée et fictive, d'une situation judiciaire, utilisée pour s'entraîner sans reproduire une affaire réelle."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Résoudre un conflit complexe : une démarche maîtrisée", "5.1"));
children.push(bodyPar(
  "Un conflit complexe ne se résout pas toujours par un seul outil. Il demande souvent de combiner " +
  "plusieurs étapes, dans un ordre réfléchi.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Une démarche maîtrisée, étape par étape",
  [
    "1. Tenter d'abord le dialogue et la négociation directe (méthode vue en 7e AF).",
    "2. Si le désaccord persiste, structurer un argumentaire clair pour chaque partie (méthode vue en 8e AF).",
    "3. Si aucun accord n'est trouvé, envisager un recours institutionnel (médiation, puis justice si " +
    "nécessaire).",
    "Cette progression n'est pas automatique : un citoyen averti sait reconnaître à quelle étape en est un " +
    "conflit, et choisir l'outil adapté plutôt que de sauter directement à la justice.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C05-01",
  "Ouverture — Un différend commercial qui s'aggrave",
  "Une scène de marché haïtien crédible montrant deux commerçants en désaccord, avec un tiers essayant de " +
  "faire médiation, dans un style illustratif cohérent avec la charte EC, sans conflit physique représenté.",
  "Un différend commercial concret illustre la progression d'un conflit vers un éventuel recours " +
  "institutionnel.",
  "Ancrer l'ouverture du chapitre dans une scène réaliste et non violente.",
  "Illustration pleine largeur, scène de marché haïtien, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les institutions judiciaires, en profondeur", "5.2"));
children.push(bodyPar(
  "En 8e AF, tu as découvert une hiérarchie générale de tribunaux. Ce chapitre approfondit cette " +
  "connaissance, notamment avec la plus haute instance du système judiciaire.",
));
children.push(threeColTable(
  ["Niveau", "Rôle", "Particularité"],
  [
    ["Tribunal de paix", "Traiter les affaires mineures locales", "Premier niveau, proche des citoyens"],
    ["Tribunal de première instance", "Traiter des affaires plus importantes", "Niveau intermédiaire"],
    ["Cour d'appel", "Réexaminer une décision contestée", "Second regard sur une affaire déjà jugée"],
    ["Cour de cassation", "Vérifier la bonne application de la loi", "Plus haute instance, ne rejuge pas les faits"],
  ],
  [2600, 3600, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette présentation reste générale et simplifiée, adaptée au niveau 9e AF, sans détailler l'ensemble des " +
  "procédures réelles.",
  { italics: true },
));
children.push(spacer(200));

children.push(sectionHeading("Les institutions chargées de faire respecter la loi", "5.3"));
children.push(bodyPar(
  "Au-delà des tribunaux eux-mêmes, d'autres institutions contribuent à faire respecter la loi au quotidien " +
  "— notamment en aidant à faire appliquer les décisions de justice ou en intervenant lorsqu'une loi n'est " +
  "pas respectée. Cette fonction se distingue de la mission de défense du territoire, que tu étudieras au " +
  "Chapitre 6.",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-9AF-C05-01 — Emplacement réservé pour une fiche exacte et vérifiée sur le rôle des institutions " +
    "chargées de faire respecter la loi, dans leur fonction d'appui à la justice.",
    "Statut : [SOURCE À VÉRIFIER] — aucune formulation exacte n'est reproduite ici tant qu'elle n'a pas été " +
    "confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C05-02",
  "Exemple analysé — de la loi au respect de la loi",
  "Un schéma en trois cases reliées par des flèches : « La loi est votée » → « La justice l'applique » → " +
  "« Des institutions veillent à son respect », cohérent avec la charte EC.",
  "Faire respecter la loi implique plusieurs institutions complémentaires, de son adoption à son application " +
  "concrète.",
  "Rendre visible la chaîne complète, de la loi votée à son respect effectif.",
  "Illustration demi-page, schéma en trois cases, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "ÉTUDE DE CAS — Un cas complexe, du dialogue à la justice",
  [
    "Reprends la situation d'ouverture : un différend commercial qui s'aggrave progressivement, malgré une " +
    "première tentative de dialogue.",
    "1. Identifie les étapes déjà tentées et celle qui semble nécessaire à ce stade.",
    "2. Construis un argumentaire court pour l'une des deux parties, en tenant compte de la présomption " +
    "d'innocence si une accusation est en jeu.",
    "3. À quel niveau de tribunal (parmi ceux étudiés) cette affaire serait-elle probablement d'abord " +
    "présentée ? Justifie.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Le recours à la justice est-il toujours nécessaire ?",
  [
    "Certains pensent qu'il vaut mieux toujours privilégier le dialogue et éviter la justice autant que " +
    "possible. D'autres pensent que certaines situations nécessitent réellement un recours institutionnel, " +
    "sans que cela soit un échec.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui distingue clairement les situations où le " +
    "dialogue suffit de celles qui nécessitent un recours institutionnel.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne / Projet — Présenter une affaire simplifiée"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit la présentation d'affaires simplifiées, en lien avec la présomption " +
    "d'innocence. [OFFICIEL — activité prévue par le programme]",
    "OBJECTIF : Créer et présenter une affaire fictive et simplifiée, respectant strictement la présomption " +
    "d'innocence.",
    "ÉTAPES : 1. Inventer une situation fictive de désaccord ou d'accusation (non violente, réaliste). 2. " +
    "Présenter les faits de façon neutre, sans désigner de coupable à l'avance. 3. Présenter les arguments " +
    "possibles des deux parties. 4. Expliquer pourquoi la présomption d'innocence doit s'appliquer jusqu'à ce " +
    "qu'une décision soit rendue.",
    "RÉSULTAT ATTENDU : Une affaire fictive claire, présentée avec neutralité, démontrant une compréhension " +
    "réelle de la présomption d'innocence.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C05-03",
  "Espace de production — mon affaire simplifiée",
  "Un cadre vide, format portrait, structuré en zones (faits / argument partie A / argument partie B / " +
  "explication de la présomption d'innocence), prévu pour que l'élève y rédige directement son affaire " +
  "fictive.",
  "Offrir un espace direct de production pour la présentation d'une affaire simplifiée.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, quatre zones délimitées, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Résoudre un conflit complexe suppose de choisir l'outil adapté : dialogue, argumentaire structuré, ou " +
    "recours institutionnel.",
    "Les institutions judiciaires comprennent plusieurs niveaux, jusqu'à la cour de cassation, plus haute " +
    "instance.",
    "Les institutions chargées de faire respecter la loi appuient l'application des décisions de justice, " +
    "sans se confondre avec les institutions de défense du territoire.",
    "Présenter une affaire simplifiée exige de respecter strictement la présomption d'innocence.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de mobiliser, dans une démarche maîtrisée, la négociation et l'argumentation déjà " +
  "connues, d'approfondir la connaissance des institutions judiciaires jusqu'à la cour de cassation, de " +
  "comprendre le rôle des institutions chargées de faire respecter la loi, et de s'exercer à la présentation " +
  "d'une affaire simplifiée dans le respect de la présomption d'innocence.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "résolution de conflit maîtrisée · cour de cassation · institution chargée de faire respecter la loi · " +
  "affaire simplifiée.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Choisir l'outil adapté (dialogue, argumentaire, recours institutionnel) selon la complexité d'un " +
    "conflit.",
    "☐ Situer les niveaux de tribunaux, jusqu'à la cour de cassation.",
    "☐ Expliquer le rôle des institutions chargées de faire respecter la loi.",
    "☐ Présenter une affaire simplifiée en respectant la présomption d'innocence.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : résolution de conflit maîtrisée, institutions judiciaires (jusqu'à la cour de " +
    "cassation), institutions chargées de faire respecter la loi, présomption d'innocence.",
    "Vocabulaire clé à maîtriser : cour de cassation, institution chargée de faire respecter la loi, affaire " +
    "simplifiée.",
    "Avant l'évaluation, vérifie que tu peux : choisir l'outil adapté à un conflit ; situer les niveaux de " +
    "tribunaux ; présenter une affaire simplifiée en respectant la présomption d'innocence.",
    "Rappel officiel : le lien direct de cette unité avec le Texte modèle 2024 reste partiel (un seul item " +
    "commun avec l'Unité 6, sur le jugement raisonné d'actions liées à la culture de la paix) — aucune " +
    "correspondance complète n'est affirmée [conforme au statut documenté, transparence maintenue].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : cour de " +
  "cassation · institution chargée de faire respecter la loi · affaire simplifiée · résolution de conflit " +
  "maîtrisée.",
  { italics: true },
));
children.push(numberedPar("1. La plus haute instance judiciaire, qui vérifie la bonne application de la loi, s'appelle la ......................"));
children.push(numberedPar("2. Un organisme qui aide à faire appliquer les décisions de justice s'appelle une ......................"));
children.push(numberedPar("3. Une présentation pédagogique et fictive d'une situation judiciaire s'appelle une ......................"));
children.push(numberedPar("4. La capacité à choisir l'outil adapté selon la complexité d'un conflit s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Remets dans l'ordre les étapes d'une démarche maîtrisée de résolution de conflit : recours institutionnel · dialogue et négociation · argumentaire structuré."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « La cour de cassation rejuge entièrement les faits d'une affaire. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique la différence entre une institution judiciaire et une institution chargée de faire respecter la loi."));
children.push(numberedPar("2. Pourquoi la présomption d'innocence est-elle particulièrement importante lors de la présentation d'une affaire simplifiée ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas du différend commercial. Explique à quel moment, selon toi, un recours institutionnel devient nécessaire."));
children.push(numberedPar("2. Présente les grandes lignes de ton affaire simplifiée, en expliquant comment tu as respecté la présomption d'innocence."));
children.push(numberedPar("3. Un camarade affirme : « Dès qu'il y a un désaccord, il faut aller directement voir la justice. » Que lui réponds-tu, en t'appuyant sur la démarche maîtrisée étudiée dans ce chapitre ?"));
children.push(spacer(240));

// =======================================================================
// BLOC SPÉCIFIQUE — PRÉPARATION AUX EXAMENS OFFICIELS 9e AF
// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Préparation à l'examen officiel de 9e AF", ""));
children.push(bodyPar(
  "Contrairement aux Chapitres 1, 3 et 4, ce chapitre ne présente qu'un lien PARTIEL et documenté avec le " +
  "Texte modèle 2024 — cette limite est signalée ici en toute transparence, plutôt que d'affirmer une " +
  "correspondance qui ne serait pas prouvée.",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE MODÈLE MENFP / DOCUMENT DE PRÉPARATION — Traçabilité (lien partiel)",
  [
    "Référence : « EXAMENS DE 9ème ANNÉE FONDAMENTALE » (juillet 2024), matière Éducation à la Citoyenneté, " +
    "MENFP/DEF/BUNEXE, statut [TEXTE MODÈLE] — jamais requalifié en « examen officiel », statut de " +
    "reproduction [DROITS / SOURCE À RÉGLER], non reproduit.",
    "Lien documenté (`08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`) : un seul item du Texte modèle 2024 " +
    "(distinction entre actions favorisant la culture de la paix et actions la desservant — violence, " +
    "incitation) est rattaché CONJOINTEMENT aux Unités 5 et 6 — pas une correspondance complète et exclusive " +
    "à l'Unité 5. Ce chapitre exploite ce lien avec prudence, sans affirmer davantage.",
    "Aucune ressource 2025/2026 vérifiée n'est disponible à ce jour — statut [À VÉRIFIER — PREUVE À FOURNIR] " +
    "inchangé.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("A. Entraînement type examen — Jugement raisonné"));
children.push(bodyPar(
  "Question originale, inspirée du format « jugement raisonné » partiellement documenté pour cette unité.",
  { italics: true },
));
children.push(numberedPar("1. Classe les actions suivantes selon qu'elles favorisent ou desservent la résolution pacifique des conflits : (a) proposer une médiation avant tout recours à la justice ; (b) inciter d'autres personnes à réagir violemment ; (c) respecter la présomption d'innocence même en cas de forte suspicion."));
children.push(spacer(200));

children.push(subHeading("B. Entraînement type examen — Analyse de situation"));
children.push(bodyPar(
  "Question originale, dans le format « analyse de situation citoyenne » utilisé de façon générale dans les " +
  "ressources d'examen consultées.",
  { italics: true },
));
children.push(numberedPar("1. Une personne accusée d'un vol proteste de son innocence avant tout jugement. Explique, en 2 à 3 lignes, comment la présomption d'innocence doit encadrer la réaction de la communauté à son égard."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mini-évaluation — Préparation à l'examen officiel de 9e AF, Chapitre 5", ""));
children.push(bodyPar(
  "Épreuve d'entraînement originale, propre à ce manuel. Elle ne reproduit pas et ne remplace pas une épreuve " +
  "MENFP réelle. Barème indicatif sur 20 points. Le corrigé est réservé à la Phase Finale du manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — QCM (8 points, 4 questions)"));
children.push(numberedPar("1. La cour de cassation a pour rôle principal de : (a) rejuger entièrement les faits (b) vérifier la bonne application de la loi (c) remplacer le tribunal de paix"));
children.push(numberedPar("2. Une institution chargée de faire respecter la loi intervient principalement pour : (a) voter les lois (b) appuyer l'application de la loi et des décisions de justice (c) organiser les élections"));
children.push(numberedPar("3. Face à un conflit simple, la première démarche recommandée est : (a) saisir directement la cour de cassation (b) tenter le dialogue et la négociation (c) ignorer le désaccord"));
children.push(numberedPar("4. La présomption d'innocence s'applique : (a) uniquement après un jugement (b) tant que la culpabilité n'est pas prouvée (c) uniquement aux personnes riches"));
children.push(spacer(200));

children.push(subHeading("Partie II — Jugement raisonné (6 points)"));
children.push(bodyPar(
  "Classe les actions suivantes selon qu'elles favorisent ou desservent une résolution pacifique et juste " +
  "des conflits, en justifiant brièvement : (a) accuser publiquement une personne avant tout jugement ; (b) " +
  "proposer un dialogue structuré avant d'envisager un recours institutionnel ; (c) respecter une décision de " +
  "justice même quand on est en désaccord avec elle.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie III — Analyse de situation (6 points)"));
children.push(numberedPar("1. Décris, en 3 à 5 lignes, comment tu appliquerais la démarche maîtrisée de résolution de conflit (dialogue, argumentaire, recours institutionnel) à une situation de désaccord persistant entre deux camarades de classe."));

await buildAndSave(children, 43, "Manuel_EC_9AF_Chapitre5.docx");
