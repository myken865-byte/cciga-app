// Manuel d'EC 8e AF — Chapitre 7 : Gérer nos ressources durablement
// (Unité 7 — S'engager pour la protection de l'environnement et pour un
// développement durable, Compétence C3).
//
// DERNIER CHAPITRE PÉDAGOGIQUE de l'architecture 7/7 verrouillée pour EC
// 8e AF. Prolonge les Chapitres 1-6 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 55 (Chapitre 1 = pages 1-9,
// Chapitre 2 = pages 10-19, Chapitre 3 = pages 20-28, Chapitre 4 = pages
// 29-37, Chapitre 5 = pages 38-46, Chapitre 6 = pages 47-54).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.40-42 : Unité 7, colonne 8e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "La
//     gestion collective éthique, raisonnée et équitable des ressources
//     renouvelables."
//   - `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md` (verrouillée sans changement
//     dans `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`) : situation de départ
//     "un projet de reboisement ou de gestion de l'eau à l'école" ;
//     activités "étude de cas sur le déboisement, analyse d'œuvres
//     haïtiennes (Jacques Roumain, Jacques-Stéphen Alexis, Philton
//     Latortue, Sénèque Obin — [OFFICIEL, noms cités par la source
//     elle-même])" ; évaluation "présenter et mettre en place un projet de
//     reboisement/sauvegarde d'une parcelle boisée [OFFICIEL]".
//   - `05_MATRICE_COMPETENCES_UNITES_EC.md`, Unité 7 : savoirs cités
//     verbatim incluant "gestion collective éthique, raisonnée et
//     équitable des ressources renouvelables" ; activité officielle citée
//     verbatim : "étude de cas sur le déboisement (recherche sur les lois,
//     analyse de photos aériennes/images satellite, analyse d'extraits
//     d'œuvres littéraires et artistiques haïtiennes... et l'essai « Haïti
//     déforestée, paysages remodelés » d'Alex Bellande, tous cités
//     nommément par la source elle-même, [OFFICIEL — SOURCE MENFP
//     VÉRIFIÉE])." Compétence C3 uniquement (seule unité mono-compétence).
//
// RÉCUPÉRATION D'UNE DÉCISION ÉDITORIALE ANTÉRIEURE (transparence) : lors
// de la rédaction du Chapitre 7 EC 7e AF, l'étude de cas sur le
// déboisement et les références littéraires officiellement nommées
// avaient été délibérément ÉCARTÉES de ce niveau et réservées à un usage
// futur en EC 8e AF (voir `build-chapitre7.mjs` d'EC 7e AF et son contrôle
// de traçabilité), conformément au « Point de vigilance » de
// `05_MATRICE_COMPETENCES_UNITES_EC.md` lui-même. Ce chapitre les utilise
// maintenant, à leur niveau prévu.
//
// TRAITEMENT DES RÉFÉRENCES LITTÉRAIRES (prudence éditoriale, comme pour
// les précédentes références culturelles du projet) : Jacques Roumain,
// Jacques-Stéphen Alexis, Philton Latortue, Sénèque Obin et l'essai « Haïti
// déforestée, paysages remodelés » d'Alex Bellande sont cités PAR LEUR NOM
// SEUL, comme le fait la source elle-même — aucune œuvre précise, date ou
// détail biographique n'est inventé au-delà de ce que la source cite. Les
// élèves sont invités à RECHERCHER eux-mêmes le contenu exact de ces
// œuvres, plutôt que de recevoir une analyse de contenu non vérifiée.
//
// PROGRESSION RÉELLE 7e → 8e AF (section 4 du prompt) : le Chapitre 7 de
// 7e AF (déjà finalisé, NON modifié ici) a construit la notion de BIEN
// COLLECTIF et de préservation simple (entretien d'un espace vert). CES
// ACQUIS NE SONT PAS REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref,
// section 7.1) pour construire un contenu réellement plus exigeant — la
// GESTION RAISONNÉE d'une ressource renouvelable, selon quatre critères
// explicites (éthique, raisonnée, équitable, collective), et un projet de
// reboisement réel, plus ambitieux que le simple entretien d'espace vert
// de 7e AF.
//
// CLÔTURE DU NIVEAU 8e AF (section 2/4 du prompt) : ce chapitre reste un
// chapitre pédagogique ordinaire, centré sur l'Unité 7 — il ne contient
// aucune synthèse générale de l'année ni de conclusion de la collection,
// conformément à l'interdiction explicite de transformer ce chapitre en
// Phase Finale.
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
  "Gérer nos ressources durablement",
  "Entretenir un espace vert, comme tu l'as fait en 7e AF, est un bon début. Mais certaines ressources — les " +
  "arbres, l'eau, les sols — demandent davantage : une gestion pensée sur le long terme, qui profite à tous " +
  "sans épuiser ce qu'elle utilise. Ce chapitre t'invite à comprendre, et à agir, à cette échelle.",
  [
    "Définir ce qu'est une ressource renouvelable.",
    "Expliquer les quatre critères d'une gestion durable : éthique, raisonnée, équitable, collective.",
    "Analyser une étude de cas sur le déboisement en Haïti.",
    "Découvrir le regard d'écrivains et d'artistes haïtiens sur l'environnement.",
    "Mettre en place un projet de reboisement ou de sauvegarde d'une parcelle boisée.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Une colline qui change",
  [
    "Des élèves de 8e AF comparent deux photographies d'une même colline près de leur commune, prises à " +
    "plusieurs années d'écart : la végétation semble nettement moins dense sur la photo récente. « Comment " +
    "vérifier ce qui s'est vraiment passé, et ce qu'on peut faire ? » se demande une élève. Ce chapitre te " +
    "donne les outils pour répondre à cette question.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (acquis de la 7e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris ce qu'est un bien collectif et comment contribuer à l'entretien simple d'un espace " +
  "collectif (jardin, espace vert). Ce chapitre ne redéveloppe pas ces notions : il s'appuie dessus pour " +
  "aborder une gestion plus exigeante — celle des ressources renouvelables sur le long terme.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Ressource renouvelable — ressource naturelle qui peut se régénérer avec le temps, à condition d'être utilisée de façon raisonnable (forêts, eau, sols fertiles)."));
children.push(bulletPar("Gestion durable — façon d'utiliser une ressource qui répond aux besoins actuels sans compromettre sa disponibilité pour l'avenir."));
children.push(bulletPar("Déboisement — disparition ou réduction importante de la couverture forestière d'une zone."));
children.push(bulletPar("Reboisement — action de planter à nouveau des arbres sur une zone qui en a été privée."));
children.push(bulletPar("Gestion équitable — répartition juste de l'usage et des bénéfices d'une ressource entre tous les membres d'une communauté."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce qu'une gestion durable des ressources ?", "7.1"));
children.push(bodyPar(
  "Une ressource renouvelable, comme une forêt ou une source d'eau, peut se régénérer — mais seulement si " +
  "elle est utilisée de façon raisonnable. La gérer durablement suppose de respecter quatre critères " +
  "complémentaires.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Quatre critères d'une gestion durable [OFFICIEL]",
  [
    "Éthique : respecter la ressource et les générations futures qui en dépendront aussi.",
    "Raisonnée : fonder les décisions sur une connaissance réelle de la ressource, pas sur l'improvisation.",
    "Équitable : répartir justement l'usage et les bénéfices entre tous les membres de la communauté.",
    "Collective : impliquer la communauté entière dans les décisions, pas seulement quelques personnes.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C07-01",
  "Ouverture — Deux photographies d'une même colline",
  "Une illustration en deux vignettes montrant une même colline haïtienne stylisée, l'une avec une végétation " +
  "dense, l'autre nettement dégradée, dans un style illustratif cohérent avec la charte EC, sans donner de " +
  "date précise ni de lieu réel identifiable.",
  "Une comparaison visuelle simple introduit concrètement la question du déboisement.",
  "Ancrer l'ouverture du chapitre dans une observation concrète et vérifiable par l'élève.",
  "Illustration pleine largeur, composition avant/après, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Étude de cas : le déboisement en Haïti", "7.2"));
children.push(bodyPar(
  "Le déboisement — la réduction importante de la couverture forestière — est un défi environnemental " +
  "largement documenté en Haïti. Plutôt que de retenir des chiffres précis non vérifiés dans cette session, " +
  "ce chapitre te propose de mener toi-même une enquête, comme le prévoit le programme officiel.",
));
children.push(calloutBox(
  "ÉTUDE DE CAS — Enquêter sur le déboisement, méthodiquement",
  [
    "1. Recherche des lois : avec l'aide d'un adulte ou d'une source fiable, identifie s'il existe des lois " +
    "haïtiennes visant à protéger les forêts ou à encadrer la coupe du bois. [OFFICIEL — activité prévue par " +
    "le programme]",
    "2. Analyse d'images : compare deux photographies aériennes ou satellite d'une même zone (si disponibles " +
    "via un atlas, une carte en ligne ou un autre support fourni par l'enseignant(e)), prises à des périodes " +
    "différentes. [OFFICIEL]",
    "3. Mise en relation : quelles causes possibles peux-tu identifier pour expliquer un changement observé " +
    "(usage du bois comme combustible, extension de terres agricoles, urbanisation) ? Reste prudent : ne " +
    "conclus que ce que les documents observés permettent réellement d'affirmer.",
    "4. Synthèse : rédige une courte conclusion sur ce que ton enquête permet, et ne permet pas, de démontrer.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C07-02",
  "Exemple analysé — méthode d'enquête sur le déboisement",
  "Un schéma en quatre étapes (lois, images, causes possibles, synthèse prudente), avec des pictogrammes " +
  "simples pour chaque étape, cohérent avec la charte EC.",
  "L'enquête sur le déboisement suit une méthode rigoureuse en quatre étapes.",
  "Donner une référence visuelle claire de la méthode d'enquête attendue.",
  "Illustration demi-page, schéma en quatre étapes, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le regard des écrivains et artistes haïtiens sur l'environnement", "7.3"));
children.push(bodyPar(
  "La terre, les paysages et la vie rurale haïtienne ont inspiré plusieurs écrivains et artistes haïtiens, " +
  "cités par le programme officiel : Jacques Roumain, Jacques-Stéphen Alexis, Philton Latortue, Sénèque Obin, " +
  "ainsi que l'essai « Haïti déforestée, paysages remodelés » d'Alex Bellande.",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — À rechercher, pas à supposer",
  [
    "DOC-EC-8AF-C07-01 — Emplacement réservé pour un extrait vérifié d'une œuvre de l'un de ces auteurs, en " +
    "lien avec la terre, la nature ou les paysages haïtiens.",
    "Statut : [SOURCE À VÉRIFIER / À FOURNIR] — cette collection ne suppose aucun contenu précis de ces " +
    "œuvres non vérifié pendant cette session. Consigne : recherche, avec l'aide d'un adulte, d'une " +
    "bibliothèque ou d'une source fiable, un court extrait réel de l'un de ces auteurs.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette démarche de recherche personnelle, plutôt qu'une analyse toute faite, te permet de découvrir " +
  "directement comment la littérature et l'art haïtiens peuvent porter un regard sur l'environnement.",
  { italics: true },
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — La gestion durable doit-elle parfois limiter la liberté économique ?",
  [
    "Certains pensent que protéger les ressources naturelles justifie de limiter certaines activités " +
    "économiques (coupe de bois, extension agricole). D'autres pensent que cela pénaliserait des familles qui " +
    "dépendent de ces ressources pour vivre.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle nuancée qui tient compte des quatre critères " +
    "(éthique, raisonnée, équitable, collective) étudiés dans ce chapitre.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Rechercher les lois environnementales"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Identifier, avec l'aide d'un adulte ou d'une source fiable, l'existence de règles ou de lois " +
    "haïtiennes visant à protéger l'environnement. [OFFICIEL — activité prévue par le programme]",
    "CONSIGNES : Ne pas te contenter d'une impression générale : cherche une source identifiable (site " +
    "institutionnel, document officiel, adulte informé).",
    "ÉTAPES : 1. Formuler une question précise (par exemple : « Existe-t-il une règle sur la coupe du bois " +
    "? »). 2. Chercher une réponse auprès d'une source fiable. 3. Noter la source utilisée. 4. Présenter le " +
    "résultat à la classe, y compris si la réponse reste incomplète.",
    "RÉSULTAT ATTENDU : Une fiche courte et honnête, qui distingue ce qui a été vérifié de ce qui reste " +
    "incertain.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Mettre en place un projet de reboisement"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit un projet de reboisement, de sauvegarde et d'entretien d'une parcelle " +
    "boisée. [OFFICIEL — évaluation prévue par le programme]",
    "OBJECTIF : Planifier, avec ta classe, un projet réel ou réaliste de reboisement ou de sauvegarde d'un " +
    "espace boisé, appliquant les quatre critères de gestion durable étudiés dans ce chapitre.",
    "ÉTAPES : 1. Choisir un espace disponible (à l'école ou à proximité) ou, si impossible, concevoir un " +
    "projet détaillé et réaliste. 2. Choisir des espèces locales adaptées. 3. Définir une répartition juste " +
    "des tâches d'entretien (critère d'équité). 4. Prévoir un suivi sur plusieurs mois, pas seulement une " +
    "action ponctuelle. 5. Présenter le projet complet à la classe.",
    "Ce projet, plus ambitieux que le simple entretien d'espace vert de 7e AF, applique une véritable gestion " +
    "raisonnée et équitable dans la durée.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C07-03",
  "Espace de production — mon plan de reboisement",
  "Un cadre vide, format portrait, structuré en un plan à compléter (emplacement, espèces choisies, " +
  "répartition des tâches, calendrier de suivi), prévu pour que l'élève y consigne directement son projet.",
  "Offrir un espace direct de production pour planifier concrètement le projet de reboisement.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine vert communautaire, plan à compléter, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une ressource renouvelable peut se régénérer, mais seulement si elle est gérée avec soin.",
    "Une gestion durable respecte quatre critères : éthique, raisonnée, équitable et collective.",
    "Enquêter sur le déboisement suppose une méthode rigoureuse : lois, images comparatives, causes " +
    "possibles, conclusion prudente.",
    "Des écrivains et artistes haïtiens ont porté un regard sur la terre et les paysages du pays — à découvrir " +
    "par une recherche personnelle plutôt que par une affirmation toute faite.",
    "Un projet de reboisement bien conçu applique concrètement les critères de gestion durable, dans la " +
    "durée.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de définir la gestion durable des ressources renouvelables selon quatre critères, de " +
  "mener une enquête méthodique sur le déboisement, de découvrir des références littéraires et artistiques " +
  "haïtiennes liées à l'environnement, et de planifier un projet réel de reboisement — une progression réelle " +
  "par rapport à la préservation simple de biens collectifs étudiée en 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "ressource renouvelable · gestion durable · déboisement · reboisement · gestion équitable.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Définir une ressource renouvelable et donner un exemple.",
    "☐ Citer les quatre critères d'une gestion durable.",
    "☐ Mener une enquête méthodique sur une question environnementale, sans dépasser ce que les preuves " +
    "permettent d'affirmer.",
    "☐ Nommer au moins un écrivain ou artiste haïtien associé au regard sur l'environnement.",
    "☐ Présenter les grandes lignes d'un projet de reboisement appliquant les critères de gestion durable.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : ressource renouvelable, gestion durable (éthique/raisonnée/équitable/collective), " +
    "déboisement, reboisement.",
    "Vocabulaire clé à maîtriser : ressource renouvelable, gestion durable, déboisement, reboisement.",
    "Avant l'évaluation, vérifie que tu peux : expliquer les quatre critères de gestion durable ; décrire une " +
    "méthode d'enquête rigoureuse ; présenter un projet de reboisement complet.",
    "Rappel officiel : l'évaluation attendue pour cette unité consiste à présenter et mettre en place un " +
    "projet de reboisement, de sauvegarde et d'entretien d'une parcelle boisée [OFFICIEL — SOURCE MENFP " +
    "VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(7));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : ressource " +
  "renouvelable · gestion durable · déboisement · reboisement · équitable.",
  { italics: true },
));
children.push(numberedPar("1. Une ressource naturelle qui peut se régénérer avec le temps s'appelle une ......................"));
children.push(numberedPar("2. Une façon d'utiliser une ressource sans compromettre sa disponibilité future s'appelle une ......................"));
children.push(numberedPar("3. La réduction importante de la couverture forestière d'une zone s'appelle le ......................"));
children.push(numberedPar("4. L'action de planter à nouveau des arbres sur une zone qui en a été privée s'appelle le ......................"));
children.push(numberedPar("5. Une gestion qui répartit justement l'usage d'une ressource entre tous est dite ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite les quatre critères d'une gestion durable des ressources étudiés dans ce chapitre."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Comparer deux photographies suffit, à lui seul, à prouver la cause exacte d'un déboisement. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec tes propres mots, la différence entre entretenir un espace vert (7e AF) et gérer durablement une ressource renouvelable (8e AF)."));
children.push(numberedPar("2. Pourquoi est-il important de rester prudent dans les conclusions d'une enquête sur le déboisement ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Présente les grandes lignes d'un projet de reboisement, en expliquant comment il respecte les quatre critères de gestion durable."));
children.push(numberedPar("2. Un camarade affirme, sans preuve précise, qu'une zone a été entièrement déboisée « à cause des habitants du coin ». Comment réagirais-tu, à partir de la méthode d'enquête étudiée dans ce chapitre ?"));
children.push(numberedPar("3. Explique en quoi la recherche d'une œuvre littéraire ou artistique haïtienne sur l'environnement peut enrichir ta compréhension de la gestion durable des ressources."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-8AF-C07-04",
  "Synthèse — Gérer nos ressources durablement",
  "Une carte mentale simple centrée sur « Gestion durable », avec des branches vers : ressource renouvelable, " +
  "quatre critères, enquête sur le déboisement, regard artistique, projet de reboisement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 55, "Manuel_EC_8AF_Chapitre7.docx");
