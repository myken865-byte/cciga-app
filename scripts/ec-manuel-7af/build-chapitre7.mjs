// Manuel d'EC 7e AF — Chapitre 7 : Protéger notre environnement
// (Unité 7 — S'engager pour la protection de l'environnement et pour un
// développement durable, Compétence C3).
//
// DERNIER CHAPITRE PÉDAGOGIQUE de l'architecture 7/7 verrouillée pour EC
// 7e AF. Prolonge les Chapitres 1-6 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 59 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-22, Chapitre 3 = pages 23-31, Chapitre 4 = pages
// 32-40, Chapitre 5 = pages 41-49, Chapitre 6 = pages 50-58).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.40-42 : Unité 7, colonne 7e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, aucune
//     [ADAPTATION DE LECTURE] pour cette unité) : "Les notions de
//     patrimoine (naturel, culturel, historique) et d'intérêt collectif.
//     Les biens collectifs, les respecter et en assurer la préservation."
//   - `09_TABLE_MATIERES_PROPOSEE_EC_7AF.md` (verrouillée sans changement
//     dans `19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md`) : situation de départ
//     "l'entretien d'un espace vert ou public de l'école/du quartier" ;
//     activité "mise en place d'un jardin/pépinière scolaire [OFFICIEL]" ;
//     évaluation "présenter et mettre en place un petit projet de
//     préservation/entretien [OFFICIEL, adapté au niveau 7e AF]".
//   - Compétence C3 uniquement — seule unité mono-compétence sur les trois
//     années, confirmé par `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`.
//
// PÉRIMÈTRE 7e AF STRICTEMENT RESPECTÉ (section 4/5 du prompt — absence
// d'anticipation 8e AF) : `05_MATRICE_COMPETENCES_UNITES_EC.md` documente,
// pour l'Unité 7, une activité officielle plus complexe (étude de cas sur
// le déboisement avec recherche juridique, analyse de photos aériennes, et
// références littéraires/artistiques haïtiennes nommément citées par la
// source : Jacques Roumain, Jacques-Stéphen Alexis, Philton Latortue,
// Sénèque Obin, Alex Bellande) et une « gestion collective éthique,
// raisonnée et équitable des ressources renouvelables ». Or
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md` classe explicitement
// cette gestion des ressources renouvelables comme un APPROFONDISSEMENT
// réservé à la 8e AF (le niveau 7e AF se limitant à « patrimoine et biens
// collectifs »). Par prudence éditoriale — déjà anticipée dans
// `05_MATRICE_COMPETENCES_UNITES_EC.md` lui-même ( « Point de vigilance
// pour la future rédaction » : ces références « pourront être utilisées
// directement dans le futur manuel EC 8e AF ») — ce Chapitre 7 de 7e AF
// N'UTILISE PAS l'étude de cas sur le déboisement ni les références
// littéraires/artistiques citées : celles-ci sont réservées à une
// utilisation future en EC 8e AF, dont l'Unité 7 porte explicitement sur la
// gestion des ressources renouvelables. Ce chapitre utilise à la place une
// étude de cas plus simple, alignée sur la situation de départ verrouillée
// (« l'entretien d'un espace vert ou public de l'école/du quartier »),
// cohérente avec le niveau 7e AF (patrimoine, biens collectifs).
//
// CONTINUITÉ AVEC LES CHAPITRES 1-6, DONT LE CHAPITRE 1 (section 4 du
// prompt) : le Chapitre 1 a introduit le patrimoine HISTORIQUE ET CULTUREL
// et la responsabilité citoyenne dans sa sauvegarde. Ce Chapitre 7 élargit
// cette notion déjà connue au patrimoine NATUREL et au concept plus large
// de bien collectif, sans répéter le contenu du Chapitre 1 (aucun retour
// sur les symboles nationaux ni sur l'organisation territoriale).
//
// CLÔTURE DU NIVEAU 7e AF (section 2 du prompt) : ce chapitre reste un
// chapitre pédagogique ordinaire, centré sur l'Unité 7 — il ne contient
// aucune synthèse générale de l'année ni de conclusion de la collection,
// conformément à l'interdiction explicite de transformer ce chapitre en
// conclusion générale ou en Phase Finale.
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
  "Protéger notre environnement",
  "Un espace vert négligé près de l'école. Un arbre planté par une classe, des années plus tôt, devenu grand. " +
  "Un jardin partagé où chacun a sa tâche. Ce chapitre t'invite à voir ton environnement non pas comme un " +
  "décor, mais comme un bien collectif — qui t'appartient un peu, et que tu peux aider à préserver.",
  [
    "Définir ce qu'est un bien collectif et donner des exemples.",
    "Distinguer patrimoine naturel, culturel et historique.",
    "Expliquer pourquoi préserver un bien collectif est une responsabilité citoyenne.",
    "Participer à la mise en place d'un jardin ou d'une pépinière scolaire.",
    "Présenter et mettre en place un petit projet de préservation ou d'entretien.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — L'espace vert oublié",
  [
    "Derrière une école haïtienne, un petit espace vert autrefois entretenu par les élèves est aujourd'hui " +
    "envahi par les herbes hautes et les déchets. Une élève propose : « Et si on s'en occupait à nouveau, " +
    "nous-mêmes ? » Ce chapitre part de cette proposition simple pour comprendre ce que signifie protéger un " +
    "bien collectif.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis issus des Chapitres 1 à 6"));
children.push(bodyPar(
  "Au Chapitre 1, tu as découvert le patrimoine historique et culturel de la nation haïtienne, ainsi que la " +
  "responsabilité citoyenne dans sa sauvegarde. Ce dernier chapitre élargit cette notion déjà connue à un " +
  "patrimoine plus large — le patrimoine naturel — et à un concept plus général : le bien collectif.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Patrimoine naturel — ensemble des espaces, ressources et éléments naturels hérités et transmis (arbres, cours d'eau, espaces verts)."));
children.push(bulletPar("Bien collectif — bien qui appartient à toute une communauté et dont tous peuvent bénéficier, sans appartenir à une seule personne."));
children.push(bulletPar("Intérêt collectif — ce qui profite à l'ensemble d'une communauté, au-delà des intérêts d'une seule personne."));
children.push(bulletPar("Préservation — ensemble des actions visant à protéger et maintenir en bon état un bien ou un espace."));
children.push(bulletPar("Entretien — soin régulier apporté à un bien ou un espace pour le maintenir en bon état."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce qu'un bien collectif ?", "7.1"));
children.push(bodyPar(
  "Un bien collectif est un bien qui appartient à toute une communauté : une place publique, un espace vert, " +
  "une fontaine, un chemin communal. Personne n'en est seul propriétaire, mais tout le monde peut en profiter " +
  "— et tout le monde partage la responsabilité de le préserver.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des exemples de biens collectifs",
  [
    "Un espace vert ou un jardin public, utilisé par toute la communauté.",
    "Un point d'eau commun, dont dépendent plusieurs familles.",
    "Un chemin ou une route communale, empruntée par tout le quartier.",
    "Une place publique, où se déroulent des activités collectives.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C07-01",
  "Ouverture — L'espace vert oublié",
  "Une scène crédible d'un espace vert scolaire haïtien envahi par les herbes hautes, avec des élèves " +
  "l'observant, dans un style illustratif cohérent avec la charte EC.",
  "Un espace collectif négligé illustre concrètement la notion de bien collectif à préserver.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire réaliste et non alarmante.",
  "Illustration pleine largeur, scène d'espace vert scolaire haïtien, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le patrimoine naturel, culturel et historique", "7.2"));
children.push(bodyPar(
  "Le patrimoine ne se limite pas aux monuments et aux symboles étudiés au Chapitre 1 : il comprend aussi le " +
  "patrimoine naturel — les espaces, les arbres, les cours d'eau — hérités et transmis d'une génération à " +
  "l'autre.",
));
children.push(threeColTable(
  ["Type de patrimoine", "Ce qu'il comprend", "Exemple"],
  [
    ["Patrimoine naturel", "Espaces, ressources et éléments naturels", "Un espace vert, un arbre ancien"],
    ["Patrimoine culturel", "Traditions, savoir-faire, pratiques partagées", "Une fête communautaire, un artisanat local"],
    ["Patrimoine historique", "Lieux et monuments liés à l'histoire (Chapitre 1)", "Un fort, une place historique"],
  ],
  [2800, 3600, 3000],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces trois formes de patrimoine ont un point commun : elles appartiennent à toute la communauté, et leur " +
  "disparition serait une perte pour tous, pas seulement pour une personne.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Préserver un bien collectif : une responsabilité citoyenne", "7.3"));
children.push(bodyPar(
  "Préserver un bien collectif ne repose pas uniquement sur l'État ou la mairie : chaque citoyen, même jeune, " +
  "peut y contribuer par des gestes simples et réguliers — entretenir, respecter, signaler un problème, " +
  "sensibiliser son entourage.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des gestes simples de préservation",
  [
    "Ne pas jeter de déchets dans un espace collectif, et en ramasser si nécessaire.",
    "Participer à l'entretien régulier d'un espace vert ou public.",
    "Signaler une dégradation à un adulte ou à une autorité locale compétente.",
    "Sensibiliser d'autres élèves ou membres de la communauté à l'importance de ce bien.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C07-02",
  "Exemple analysé — trois types de patrimoine",
  "Une planche illustrée en trois colonnes, présentant un exemple visuel de patrimoine naturel, culturel et " +
  "historique haïtien, de façon générique et non identifiable précisément, cohérente avec la charte EC.",
  "Les trois formes de patrimoine se distinguent par des exemples concrets et visuels.",
  "Donner une référence visuelle claire des trois types de patrimoine étudiés.",
  "Illustration demi-page, planche en trois colonnes, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "ÉTUDE DE CAS — Qui doit entretenir l'espace vert ?",
  [
    "Reprends la situation d'ouverture : l'espace vert de l'école est envahi par les herbes hautes et les " +
    "déchets. Certains élèves pensent que c'est à l'administration de l'école de s'en occuper. D'autres " +
    "pensent que les élèves eux-mêmes pourraient agir.",
    "1. Pourquoi cet espace vert peut-il être considéré comme un bien collectif de l'école ?",
    "2. Quelles conséquences sa dégradation continue pourrait-elle avoir pour la communauté scolaire ?",
    "3. Propose une répartition réaliste des responsabilités entre l'administration et les élèves pour son " +
    "entretien.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Qui est responsable d'un bien collectif ?",
  [
    "Certains pensent que la préservation d'un bien collectif revient d'abord aux autorités (État, mairie, " +
    "administration). D'autres pensent que chaque citoyen, même jeune, porte une part réelle de cette " +
    "responsabilité.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Entretenir un espace collectif"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Participer, avec ta classe, à une action concrète d'entretien d'un espace vert ou public de " +
    "l'école ou du quartier. [OFFICIEL — situation de départ prévue par le programme]",
    "CONSIGNES : Avec l'accord de l'enseignant(e), choisissez un espace accessible et sûr à entretenir " +
    "(nettoyage, désherbage léger, rangement).",
    "ÉTAPES : 1. Observer l'état actuel de l'espace. 2. Identifier les tâches nécessaires. 3. Se répartir les " +
    "tâches en petits groupes. 4. Réaliser l'entretien, puis comparer l'avant et l'après.",
    "RÉSULTAT ATTENDU : Un espace collectif visiblement amélioré, et une réflexion de classe sur ce que cela a " +
    "demandé comme engagement.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Mettre en place un jardin ou une pépinière scolaire"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit la mise en place d'un jardin ou d'une pépinière scolaire. [OFFICIEL — " +
    "activité prévue par le programme]",
    "OBJECTIF : Créer, avec ta classe, un petit jardin ou une pépinière d'espèces locales dans un espace " +
    "disponible de l'école, comme projet concret de préservation et d'entretien.",
    "ÉTAPES : 1. Choisir un emplacement adapté avec l'enseignant(e). 2. Choisir des plantes ou espèces locales " +
    "simples à cultiver. 3. Répartir les responsabilités d'entretien régulier entre les élèves. 4. Présenter " +
    "le projet à la classe ou à l'école : ce qui a été planté, pourquoi, et comment il sera entretenu.",
    "Ce projet correspond directement à l'évaluation officielle de cette unité : présenter et mettre en place " +
    "un petit projet de préservation ou d'entretien. [OFFICIEL]",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C07-03",
  "Espace de production — le plan de mon jardin scolaire",
  "Un cadre vide, format portrait, structuré en un plan simple à compléter (emplacement, plantes choisies, " +
  "responsables de l'entretien par semaine), prévu pour que l'élève y consigne directement son projet de " +
  "jardin ou de pépinière.",
  "Offrir un espace direct de production pour ancrer la mise en place réelle du jardin ou de la pépinière " +
  "scolaire.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine vert communautaire, plan à compléter, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un bien collectif appartient à toute une communauté ; personne n'en est seul propriétaire, mais chacun " +
    "en partage la responsabilité.",
    "Le patrimoine naturel, culturel et historique constitue ensemble une richesse commune à préserver.",
    "Préserver un bien collectif repose à la fois sur les autorités et sur l'engagement de chaque citoyen, " +
    "même jeune.",
    "Des gestes simples et réguliers (entretien, respect, signalement, sensibilisation) contribuent " +
    "concrètement à cette préservation.",
    "Mettre en place un jardin ou une pépinière scolaire est une façon concrète d'agir pour un bien collectif.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de définir ce qu'est un bien collectif, de distinguer patrimoine naturel, culturel et " +
  "historique, et de comprendre que leur préservation est une responsabilité partagée entre les autorités et " +
  "les citoyens. Il s'est conclu par une activité concrète d'entretien d'un espace collectif et par la mise " +
  "en place d'un jardin ou d'une pépinière scolaire, correspondant directement à l'évaluation officielle de " +
  "cette unité.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "patrimoine naturel · bien collectif · intérêt collectif · préservation · entretien.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Définir ce qu'est un bien collectif et donner deux exemples.",
    "☐ Distinguer patrimoine naturel, culturel et historique.",
    "☐ Expliquer pourquoi préserver un bien collectif est une responsabilité citoyenne.",
    "☐ Décrire une action concrète d'entretien d'un espace collectif.",
    "☐ Présenter les grandes lignes d'un petit projet de préservation ou d'entretien.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : bien collectif, intérêt collectif, patrimoine naturel/culturel/historique, " +
    "préservation, entretien.",
    "Vocabulaire clé à maîtriser : patrimoine naturel, bien collectif, préservation.",
    "Avant l'évaluation, vérifie que tu peux : définir un bien collectif ; distinguer les trois formes de " +
    "patrimoine ; présenter un petit projet de préservation ou d'entretien.",
    "Rappel officiel : l'évaluation attendue pour cette unité consiste à présenter et mettre en place un petit " +
    "projet de préservation ou d'entretien, adapté au niveau 7e AF [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(7));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : bien " +
  "collectif · patrimoine naturel · préservation · entretien · intérêt collectif.",
  { italics: true },
));
children.push(numberedPar("1. Un bien qui appartient à toute une communauté, sans appartenir à une seule personne, s'appelle un ......................"));
children.push(numberedPar("2. L'ensemble des espaces et ressources naturels hérités et transmis s'appelle le ......................"));
children.push(numberedPar("3. L'ensemble des actions visant à protéger et maintenir en bon état un bien s'appelle la ......................"));
children.push(numberedPar("4. Le soin régulier apporté à un bien pour le maintenir en bon état s'appelle l'......................"));
children.push(numberedPar("5. Ce qui profite à l'ensemble d'une communauté, au-delà d'une seule personne, s'appelle l'......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Classe les exemples suivants selon le type de patrimoine (naturel, culturel ou historique) : un arbre centenaire ; une fête traditionnelle du quartier ; un fort ancien."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « La préservation d'un bien collectif est uniquement la responsabilité de l'État. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec tes propres mots, pourquoi un espace vert scolaire peut être considéré comme un bien collectif."));
children.push(numberedPar("2. Donne deux gestes simples que tu pourrais poser toi-même pour contribuer à la préservation d'un bien collectif de ton quartier."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas de l'espace vert de l'école. Propose une répartition précise des responsabilités entre l'administration et les élèves pour son entretien régulier."));
children.push(numberedPar("2. Décris, étape par étape, comment ta classe pourrait mettre en place un petit jardin ou une pépinière, en t'appuyant sur ce que tu as appris dans ce chapitre."));
children.push(numberedPar("3. Un camarade affirme : « Ce n'est pas grave si je jette un déchet dans un espace collectif, ça ne concerne pas que moi de toute façon. » Que lui réponds-tu, en t'appuyant sur ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-7AF-C07-04",
  "Synthèse — Protéger notre environnement",
  "Une carte mentale simple centrée sur « Bien collectif », avec des branches vers : patrimoine naturel, " +
  "patrimoine culturel, patrimoine historique, préservation citoyenne, jardin/pépinière scolaire.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 58, "Manuel_EC_7AF_Chapitre7.docx");
