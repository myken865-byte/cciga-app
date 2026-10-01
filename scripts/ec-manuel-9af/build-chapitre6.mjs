// Manuel d'EC 9e AF — Chapitre 6 : Sécurité nationale et coopération internationale
// (Unité 6 — La paix, la protection et la sécurité, Compétences C1, C2,
// C3).
//
// Prolonge les Chapitres 1-5 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 53 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-21, Chapitre 3 = pages 22-32, Chapitre 4 = pages
// 33-42, Chapitre 5 = pages 43-52).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.38-40 : Unité 6, colonne 9e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`,
//     [ADAPTATION DE LECTURE] pour la segmentation par année, contenu
//     lui-même verbatim) : "Les institutions chargées d'assurer la défense
//     du territoire (organisation, missions, fonctions, types
//     d'interventions des forces de l'ordre). Les institutions
//     internationales et ONG pour la préservation de la paix et le
//     règlement des conflits."
//   - `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md` (verrouillée sans changement
//     dans `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`) : situation de départ
//     "le rôle d'une ONG internationale présente en Haïti (générique, sans
//     nommer d'organisation précise non vérifiée)" ; activité "recherche
//     sur les missions des forces de l'ordre".
//
// **CHAPITRE À CORRESPONDANCE EXAMEN DIRECTEMENT CONFIRMÉE** :
// `08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md` rattache à cette unité un QCM
// du Texte modèle 2024 (Partie I) portant sur les structures chargées de la
// sécurité du pays, avec une distinction entre forces légitimes et groupes
// agissant hors-la-loi. Conformément à la règle de preuve, seul ce THÈME
// sert de repère : la question ci-dessous est une création 100% originale,
// traitée à un niveau conceptuel et non partisan.
//
// TRAITEMENT DE LA DISTINCTION « FORCES DE L'ORDRE LÉGITIMES / GROUPES
// AGISSANT HORS-LA-LOI » (transparence éditoriale, sections 3 et 11 du
// prompt d'exécution) : ce thème est nommé explicitement par l'examen
// officiel lui-même. Il est traité ici STRICTEMENT à un niveau conceptuel
// et civique (les CRITÈRES qui distinguent une institution légitime d'un
// groupe agissant hors-la-loi : mandat légal, encadrement par la loi,
// redevabilité), sans référence à un événement, un groupe, une période ou
// une actualité précise, conformément aux principes de neutralité,
// d'exactitude et de non-invention du projet. Aucun fait d'actualité n'est
// évoqué ; aucune institution ni aucun groupe n'est nommé au-delà des
// catégories générales déjà utilisées dans la collection (Police Nationale
// d'Haïti, mentionnée dès la 7e AF).
//
// PROGRESSION RÉELLE 7e → 8e → 9e AF (section 4 du prompt) : le Chapitre 6
// de 7e AF a nommé les institutions de sécurité de base et enseigné
// l'analyse d'une consigne de sécurité ; le Chapitre 6 de 8e AF a construit
// la culture de la paix (approche proactive, piliers, charte de classe).
// CES ACQUIS NE SONT PAS REDÉVELOPPÉS ICI : ils sont mobilisés (rappel
// bref, section 6.1) pour atteindre le niveau attendu en 9e AF — un
// FONCTIONNEMENT DÉTAILLÉ des institutions de défense du territoire et une
// DIMENSION INTERNATIONALE entièrement nouvelle (institutions et ONG pour
// la paix), conformément à `18_MATRICE_PROGRESSION_EC_7_8_9AF_
// VERROUILLEE.md`.
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
  6,
  "Sécurité nationale et coopération internationale",
  "En 7e AF, tu as nommé les institutions de sécurité. En 8e AF, tu as appris à cultiver la paix. Ce chapitre " +
  "va plus loin : comprendre en détail comment fonctionnent les institutions de défense du territoire, ce qui " +
  "distingue une institution légitime d'un groupe hors-la-loi, et comment la coopération internationale " +
  "contribue elle aussi à la paix.",
  [
    "Décrire le fonctionnement détaillé des institutions de défense du territoire.",
    "Identifier les critères qui distinguent une institution de sécurité légitime.",
    "Expliquer le rôle des institutions internationales et des ONG pour la paix.",
    "Réaliser une recherche sur les missions des forces de l'ordre.",
    "S'entraîner aux formats de questions sur les institutions de sécurité, attestés à l'examen 9e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Une ONG internationale en action",
  [
    "Après une catastrophe naturelle dans une région d'Haïti, une organisation non gouvernementale " +
    "internationale intervient pour appuyer les secours, aux côtés des institutions haïtiennes. « Pourquoi " +
    "une organisation étrangère intervient-elle ici ? » se demande un élève. Ce chapitre t'aide à comprendre " +
    "le rôle de la coopération internationale en matière de sécurité et de paix.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e et 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as identifié des institutions de sécurité (dont la Police Nationale d'Haïti) et appris à " +
  "analyser une consigne de sécurité. En 8e AF, tu as découvert la culture de la paix et ses piliers. Ce " +
  "chapitre ne redéveloppe pas ces contenus : il approfondit le fonctionnement institutionnel et ouvre à la " +
  "dimension internationale.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Défense du territoire — ensemble des missions visant à protéger l'intégrité et la sécurité d'un pays et de sa population."));
children.push(bulletPar("Légitimité institutionnelle — caractère d'une institution dont l'autorité repose sur un mandat légal reconnu, encadré par la loi et soumis à une forme de redevabilité."));
children.push(bulletPar("Redevabilité — obligation, pour une institution, de rendre compte de ses actions devant la loi et la société."));
children.push(bulletPar("Coopération internationale — collaboration entre États ou organisations de différents pays pour atteindre des objectifs communs, comme la paix ou la sécurité."));
children.push(bulletPar("ONG (organisation non gouvernementale) — organisation à but non lucratif, indépendante des États, agissant notamment pour la paix, l'aide humanitaire ou le développement."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le fonctionnement détaillé des institutions de défense du territoire", "6.1"));
children.push(bodyPar(
  "Les institutions chargées de la défense du territoire remplissent plusieurs missions complémentaires : " +
  "protection de la population, maintien de l'ordre public, intervention en cas de danger collectif.",
));
children.push(threeColTable(
  ["Mission", "Ce qu'elle implique", "Exemple de type d'intervention"],
  [
    ["Protection de la population", "Assurer la sécurité des citoyens au quotidien", "Présence dans les zones à risque"],
    ["Maintien de l'ordre public", "Faire respecter les règles communes", "Intervention lors d'un trouble à l'ordre public"],
    ["Réponse aux situations d'urgence", "Agir rapidement face à un danger collectif", "Coordination lors d'une catastrophe naturelle"],
  ],
  [2800, 3600, 3000],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette présentation reste générale et non partisane, adaptée au niveau 9e AF : elle vise à comprendre les " +
  "grandes missions institutionnelles, pas à détailler une organisation précise ou une actualité particulière.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C06-01",
  "Ouverture — Coopération lors d'une catastrophe naturelle",
  "Une scène haïtienne crédible montrant une coordination de secours après une catastrophe naturelle, avec " +
  "des intervenants locaux et internationaux travaillant ensemble, dans un style illustratif cohérent avec la " +
  "charte EC, sans détail alarmant.",
  "Une scène de coopération concrète illustre la dimension internationale de la sécurité et de la paix.",
  "Ancrer l'ouverture du chapitre dans une scène constructive et non alarmante.",
  "Illustration pleine largeur, scène de coordination de secours, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Distinguer une institution légitime d'un groupe hors-la-loi", "6.2"));
children.push(bodyPar(
  "Un principe civique important consiste à savoir reconnaître ce qui rend une institution de sécurité " +
  "légitime — c'est-à-dire fondée à exercer une autorité — par opposition à un groupe qui agirait en dehors " +
  "de tout cadre légal.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Trois critères de légitimité institutionnelle",
  [
    "Un mandat légal reconnu : l'institution tire son autorité d'un texte de loi ou d'une décision légitime, " +
    "pas d'une prise de pouvoir arbitraire.",
    "Un encadrement par la loi : ses actions doivent respecter des règles précises, qui limitent ce qu'elle " +
    "peut faire.",
    "Une redevabilité : elle doit pouvoir rendre compte de ses actions, contrairement à un groupe qui " +
    "n'accepte aucun contrôle.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce cadre conceptuel permet d'analyser n'importe quelle situation de façon rigoureuse, sans avoir besoin de " +
  "connaître les détails d'une actualité précise : il suffit de vérifier si les trois critères sont réunis.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C06-02",
  "Exemple analysé — les trois critères de légitimité",
  "Un schéma avec trois cases (mandat légal, encadrement par la loi, redevabilité) reliées à un bouclier " +
  "symbolisant la légitimité institutionnelle, cohérent avec la charte EC, sans représentation d'armes ni de " +
  "violence.",
  "Trois critères permettent d'évaluer, de façon rigoureuse, la légitimité d'une institution de sécurité.",
  "Donner un outil conceptuel clair et non partisan pour analyser la légitimité institutionnelle.",
  "Illustration demi-page, schéma en trois cases, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La dimension internationale : institutions et ONG pour la paix", "6.3"));
children.push(bodyPar(
  "La paix et la sécurité ne dépendent pas uniquement des institutions nationales. Des institutions " +
  "internationales — comme l'Organisation des Nations Unies — et des organisations non gouvernementales " +
  "(ONG) contribuent également, à travers le monde, à la préservation de la paix et au règlement des " +
  "conflits.",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-9AF-C06-01 — Emplacement réservé pour une fiche exacte et vérifiée sur le rôle d'une institution " +
    "internationale ou d'une ONG intervenant en matière de paix ou d'aide humanitaire en Haïti.",
    "Statut : [SOURCE À VÉRIFIER] — aucune organisation précise n'est nommée ni détaillée ici tant que " +
    "l'information n'a pas été confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Analyser la légitimité, à partir des critères",
  [
    "On te présente deux groupes fictifs. Le Groupe A affirme agir pour la sécurité, mais ne rend de comptes " +
    "à aucune autorité et n'a reçu aucun mandat légal. Le Groupe B agit dans le cadre d'un mandat légal " +
    "reconnu, respecte des règles précises, et peut être contrôlé par d'autres institutions.",
    "1. En utilisant les trois critères du cours, explique lequel des deux groupes peut être considéré comme " +
    "légitime.",
    "2. Pourquoi la redevabilité est-elle un critère particulièrement important pour distinguer les deux " +
    "groupes ?",
    "3. En quoi ce cadre d'analyse pourrait-il t'aider à réfléchir, plus tard, à des situations réelles, sans " +
    "avoir besoin d'un avis tout fait ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — La sécurité peut-elle reposer uniquement sur les institutions nationales ?",
  [
    "Certains pensent que la sécurité d'un pays doit reposer uniquement sur ses propres institutions " +
    "nationales. D'autres pensent que la coopération internationale (ONG, institutions internationales) " +
    "apporte une contribution réelle et complémentaire.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle nuancée, qui reconnaît le rôle des deux niveaux " +
    "(national et international).",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Recherche sur les missions des forces de l'ordre"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Réaliser une recherche sur les missions d'une institution chargée de la sécurité en Haïti. " +
    "[OFFICIEL — activité prévue par le programme]",
    "CONSIGNES : Avec l'aide d'un adulte, d'un(e) enseignant(e) ou d'une source fiable, identifie une mission " +
    "concrète d'une institution de sécurité déjà nommée dans la collection (par exemple la Police Nationale " +
    "d'Haïti).",
    "ÉTAPES : 1. Choisir l'institution. 2. Identifier une mission précise. 3. Relier cette mission aux trois " +
    "critères de légitimité étudiés dans ce chapitre. 4. Présenter le résultat à la classe.",
    "RÉSULTAT ATTENDU : Une fiche courte, factuelle et respectueuse, présentant une mission réelle d'une " +
    "institution de sécurité.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Fiche sur une institution internationale de paix"));
children.push(calloutBox(
  "PROJET",
  [
    "OBJECTIF : Réaliser une fiche générique sur le rôle d'une institution internationale ou d'une ONG dans " +
    "la préservation de la paix, sans affirmer de détail non vérifié sur une organisation précise.",
    "ÉTAPES : 1. Choisir un type d'institution internationale (organisation intergouvernementale ou ONG). 2. " +
    "Décrire, de façon générale, le type de mission qu'elle pourrait remplir (aide humanitaire, médiation, " +
    "reconstruction). 3. Expliquer en quoi cette action complète le rôle des institutions nationales.",
    "RÉSULTAT ATTENDU : Une fiche générale et honnête, qui ne prétend pas connaître des détails non vérifiés.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C06-03",
  "Espace de production — ma fiche sur les institutions de sécurité et de paix",
  "Un cadre vide, format portrait, structuré en deux zones (institution nationale / institution " +
  "internationale), prévu pour que l'élève y consigne directement ses recherches.",
  "Offrir un espace direct de production pour les recherches sur les institutions de sécurité et de paix.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine vert communautaire, deux zones délimitées, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Les institutions de défense du territoire remplissent plusieurs missions complémentaires : protection, " +
    "maintien de l'ordre, réponse aux urgences.",
    "Trois critères permettent d'évaluer la légitimité d'une institution de sécurité : mandat légal, " +
    "encadrement par la loi, redevabilité.",
    "La coopération internationale (institutions internationales, ONG) complète l'action des institutions " +
    "nationales en matière de paix et de sécurité.",
    "Analyser la légitimité d'une institution à partir de critères clairs permet un jugement rigoureux, sans " +
    "avis tout fait.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de décrire en détail le fonctionnement des institutions de défense du territoire, de " +
  "définir trois critères de légitimité institutionnelle, de découvrir la dimension internationale de la " +
  "sécurité et de la paix, et de réaliser une recherche sur les missions des forces de l'ordre — une " +
  "progression réelle par rapport à la simple identification des institutions vue en 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "défense du territoire · légitimité institutionnelle · redevabilité · coopération internationale · ONG.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire trois missions des institutions de défense du territoire.",
    "☐ Citer les trois critères de légitimité institutionnelle.",
    "☐ Expliquer le rôle des institutions internationales et des ONG pour la paix.",
    "☐ Présenter une mission réelle d'une institution de sécurité haïtienne.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : missions des institutions de défense du territoire, critères de légitimité " +
    "institutionnelle, coopération internationale, ONG.",
    "Vocabulaire clé à maîtriser : défense du territoire, légitimité institutionnelle, redevabilité, " +
    "coopération internationale.",
    "Avant l'évaluation, vérifie que tu peux : décrire une mission institutionnelle ; appliquer les trois " +
    "critères de légitimité à une situation ; expliquer le rôle d'une ONG ou d'une institution internationale.",
    "Rappel officiel : cette unité correspond directement à un QCM du Texte modèle 2024 sur les structures " +
    "chargées de la sécurité du pays [OFFICIEL — SOURCE MENFP VÉRIFIÉE, correspondance documentée].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : défense " +
  "du territoire · légitimité institutionnelle · redevabilité · coopération internationale.",
  { italics: true },
));
children.push(numberedPar("1. L'ensemble des missions visant à protéger l'intégrité et la sécurité d'un pays s'appelle la ......................"));
children.push(numberedPar("2. Le caractère d'une institution dont l'autorité repose sur un mandat légal reconnu s'appelle la ......................"));
children.push(numberedPar("3. L'obligation de rendre compte de ses actions devant la loi et la société s'appelle la ......................"));
children.push(numberedPar("4. La collaboration entre États ou organisations pour atteindre des objectifs communs s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite les trois missions des institutions de défense du territoire étudiées dans ce chapitre."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Un groupe qui n'accepte aucun contrôle et ne rend de comptes à personne peut quand même être considéré comme légitime. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, à partir des trois critères du cours, ce qui distingue une institution légitime d'un groupe hors-la-loi."));
children.push(numberedPar("2. Pourquoi la coopération internationale est-elle utile en complément des institutions nationales ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas des deux groupes fictifs. Explique en détail pourquoi le Groupe B est légitime et le Groupe A ne l'est pas."));
children.push(numberedPar("2. Présente les résultats de ta recherche sur les missions d'une institution de sécurité haïtienne."));
children.push(numberedPar("3. Un camarade affirme : « Toutes les organisations qui prétendent assurer la sécurité se valent. » Que lui réponds-tu, en t'appuyant sur les critères étudiés dans ce chapitre ?"));
children.push(spacer(240));

// =======================================================================
// BLOC SPÉCIFIQUE — PRÉPARATION AUX EXAMENS OFFICIELS 9e AF
// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Préparation à l'examen officiel de 9e AF", ""));
children.push(bodyPar(
  "Ce chapitre présente une correspondance directement confirmée avec le Texte modèle 2024 (QCM sur les " +
  "structures chargées de la sécurité du pays).",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE MODÈLE MENFP / DOCUMENT DE PRÉPARATION — Traçabilité (correspondance confirmée)",
  [
    "Référence : « EXAMENS DE 9ème ANNÉE FONDAMENTALE » (juillet 2024), matière Éducation à la Citoyenneté, " +
    "MENFP/DEF/BUNEXE, statut [TEXTE MODÈLE] — jamais requalifié en « examen officiel », statut de " +
    "reproduction [DROITS / SOURCE À RÉGLER], non reproduit.",
    "Correspondance documentée (`08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`) : un QCM de la Partie I porte sur " +
    "les structures chargées de la sécurité du pays, avec une distinction entre forces légitimes et groupes " +
    "hors-la-loi. Seul ce THÈME sert de repère : la question ci-dessous est une création 100 % originale, " +
    "traitée à un niveau conceptuel, sans référence à une actualité ou à un groupe précis.",
    "Aucune ressource 2025/2026 vérifiée n'est disponible à ce jour — statut [À VÉRIFIER — PREUVE À FOURNIR] " +
    "inchangé.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("A. Entraînement type examen — QCM sur les institutions de sécurité"));
children.push(bodyPar(
  "Questions originales, inspirées du thème observé (Partie I, Texte modèle 2024). Entoure la bonne réponse.",
  { italics: true },
));
children.push(numberedPar("1. Une institution de sécurité légitime tire son autorité : (a) d'un mandat légal reconnu (b) de sa seule force (c) d'une décision arbitraire"));
children.push(numberedPar("2. Un groupe qui n'accepte aucun contrôle et refuse toute redevabilité est : (a) légitime (b) hors du cadre légal (c) automatiquement une ONG"));
children.push(numberedPar("3. La coopération internationale en matière de paix implique notamment : (a) uniquement l'armée nationale (b) des institutions internationales et des ONG (c) aucune institution étrangère"));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mini-évaluation — Préparation à l'examen officiel de 9e AF, Chapitre 6", ""));
children.push(bodyPar(
  "Épreuve d'entraînement originale, propre à ce manuel. Elle ne reproduit pas et ne remplace pas une épreuve " +
  "MENFP réelle. Barème indicatif sur 20 points. Le corrigé est réservé à la Phase Finale du manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — QCM (8 points, 4 questions)"));
children.push(numberedPar("1. Le maintien de l'ordre public relève de la mission de : (a) coopération internationale (b) défense du territoire (c) protection sociale"));
children.push(numberedPar("2. La redevabilité signifie qu'une institution doit : (a) agir sans aucun contrôle (b) rendre compte de ses actions (c) éviter toute transparence"));
children.push(numberedPar("3. Une ONG est : (a) une institution gouvernementale (b) une organisation indépendante des États (c) une force armée nationale"));
children.push(numberedPar("4. Face à une catastrophe naturelle, une coordination entre acteurs locaux et internationaux illustre : (a) un conflit d'autorité (b) la coopération internationale (c) l'absence de légitimité"));
children.push(spacer(200));

children.push(subHeading("Partie II — Analyse de situation (7 points)"));
children.push(numberedPar("1. Un groupe affirme protéger un quartier, mais impose ses propres règles sans en rendre compte à aucune autorité. En t'appuyant sur les trois critères du cours, explique pourquoi ce groupe ne peut pas être considéré comme une institution de sécurité légitime."));
children.push(spacer(200));

children.push(subHeading("Partie III — Justification courte (5 points)"));
children.push(numberedPar("1. En 3 à 5 lignes, explique pourquoi la coopération internationale peut compléter, sans la remplacer, l'action des institutions nationales de sécurité."));

await buildAndSave(children, 53, "Manuel_EC_9AF_Chapitre6.docx");
