// Manuel d'EC 9e AF — Chapitre 2 : Citoyen et citoyenneté, ici et dans le monde
// (Unité 2 — La citoyenne, le citoyen, la citoyenneté et l'État, des droits
// et des devoirs, Compétences C1, C2, C3).
//
// Prolonge le Chapitre 1 (déjà finalisé, NON modifié ici) : pagination
// continue à partir de la page 12 (Chapitre 1 = pages 1-11).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.34-35 : Unité 2, colonne 9e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "Définition
//     des concepts de citoyen/citoyenneté au niveau national et mondial.
//     L'éthique citoyenne. Droits fondamentaux (Constitution, DUDH).
//     Participation active à la vie de la cité." Niveau attendu en fin de
//     cycle : « définition conceptuelle approfondie (citoyen/citoyenneté
//     national et mondial), éthique citoyenne réintroduite avec cadrage
//     élargi » — différence réelle et nette avec la 8e AF (où l'éthique
//     citoyenne avait disparu), confirmée par la matrice de progression.
//   - `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md` (verrouillée sans changement
//     dans `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`) : situation de départ
//     "comparaison entre citoyenneté nationale et appartenance à une
//     communauté mondiale" ; activité "synthèse comparative citoyen
//     national/mondial".
//
// PROGRESSION RÉELLE Chapitre 1 → Chapitre 2, ET 7e/8e → 9e AF (section 4
// du prompt) : le Chapitre 1 (9e AF) a introduit la citoyenneté mondiale
// comme ENGAGEMENT concret (valeurs universelles, patrimoine mondial). Ce
// Chapitre 2 change de registre : il porte sur la DÉFINITION ET LA
// DISCUSSION DU CONCEPT lui-même de citoyen/citoyenneté — un niveau
// d'abstraction supérieur, explicitement demandé par la matrice de
// progression (« capacité à définir et discuter les concepts eux-mêmes,
// pas seulement les appliquer »). Le vocabulaire de base déjà enseigné en
// 7e AF (droit, devoir, citoyen, nationalité) et la distinction droits
// civils/politiques vs économiques/sociaux (8e AF) NE SONT PAS
// REDÉVELOPPÉS : ils sont mobilisés comme acquis (rappel bref, section
// 2.1). L'éthique citoyenne, absente du contenu officiel 8e AF, est
// réintroduite ici avec un cadrage élargi (national ET mondial),
// conformément à la matrice de progression — pas une redite du contenu
// 7e AF, qui la traitait à l'échelle locale uniquement.
//
// LIEN AVEC LES EXAMENS OFFICIELS (Phase 0, `08_MATRICE_EXIGENCES_
// EVALUATION_EC_9AF.md`) : le Texte modèle 2024 comporte un QCM sur les
// « devoirs du citoyen » (impôt, respect des biens de l'État), rattaché
// explicitement aux Unités 2 et 3 par la matrice d'exigences d'évaluation.
// Ce chapitre s'appuie sur cette correspondance documentée (thème des
// devoirs du citoyen) pour son bloc de préparation à l'examen — sans
// aborder le thème fiscal en détail, réservé au Chapitre 3 (Unité 3).
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
  2,
  "Citoyen et citoyenneté, ici et dans le monde",
  "Tu sais déjà CE QUE FAIT un citoyen : voter, respecter des règles, s'engager. Ce chapitre te pose une " +
  "question plus difficile : que signifie CE MOT lui-même — « citoyen » ? Et ce mot veut-il dire la même chose " +
  "à l'échelle d'un pays et à l'échelle du monde entier ?",
  [
    "Définir le concept de citoyen selon plusieurs dimensions (légale, civique).",
    "Comparer citoyenneté nationale et appartenance à une communauté mondiale.",
    "Expliquer l'éthique citoyenne dans un cadrage élargi, national et mondial.",
    "Relier les droits fondamentaux à leur double portée, nationale et internationale.",
    "S'entraîner aux formats de questions sur les devoirs du citoyen, attestés à l'examen 9e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Deux façons d'être citoyen",
  [
    "Une élève de 9e AF s'interroge : « Je suis citoyenne haïtienne parce que je suis née ici, c'est écrit sur " +
    "un document. Mais quand je participe à une collecte pour aider des victimes d'une catastrophe dans un " +
    "autre pays, est-ce que je suis citoyenne de la même façon ? » Ce chapitre t'aide à répondre, en " +
    "distinguant deux dimensions du mot « citoyen ».",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e, 8e AF et Chapitre 1)"));
children.push(bodyPar(
  "Tu as déjà appris à distinguer droit et devoir, citoyen et nationalité (7e AF), puis à distinguer droits " +
  "civils/politiques et économiques/sociaux (8e AF), puis à découvrir la citoyenneté mondiale comme " +
  "engagement (Chapitre 1, 9e AF). Ce chapitre ne redéveloppe pas ces contenus : il les mobilise pour " +
  "interroger le concept même de citoyenneté, à un niveau plus abstrait.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Concept — idée générale et abstraite qui permet de nommer et d'organiser une catégorie de réalités (ici : ce que signifie « être citoyen »)."));
children.push(bulletPar("Citoyenneté légale (ou juridique) — statut officiel reconnu par un État à une personne, avec des droits et des devoirs formellement établis (ex. nationalité, droit de vote)."));
children.push(bulletPar("Citoyenneté active (ou civique) — engagement concret d'une personne dans la vie collective, au-delà du seul statut légal."));
children.push(bulletPar("Éthique citoyenne — ensemble de principes qui guident le comportement responsable d'un citoyen envers les autres, à toutes les échelles."));
children.push(bulletPar("Communauté mondiale — ensemble de l'humanité considérée comme un groupe auquel chaque personne appartient, au-delà de sa seule nation."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Définir le concept de citoyen : deux dimensions", "2.1"));
children.push(bodyPar(
  "Le mot « citoyen » recouvre en réalité deux dimensions différentes, qu'il est utile de distinguer pour " +
  "bien comprendre le concept.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Citoyenneté légale et citoyenneté active",
  [
    "La citoyenneté légale est un statut : elle est reconnue par un État (nationalité, droit de vote, " +
    "obligations légales). Elle existe même si la personne ne l'exerce pas activement.",
    "La citoyenneté active est un comportement : elle se construit par l'engagement réel dans la vie " +
    "collective (participer, s'informer, agir), qu'il existe ou non un statut légal correspondant.",
    "Une personne peut avoir la citoyenneté légale d'un pays sans être très active ; elle peut aussi agir " +
    "comme une citoyenne engagée envers des causes mondiales, sans qu'aucun statut légal de « citoyen du " +
    "monde » n'existe formellement.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C02-01",
  "Ouverture — Deux façons d'être citoyen",
  "Une illustration en deux vignettes : à gauche, une scène de vote ou de démarche administrative (citoyenneté " +
  "légale) ; à droite, une scène de collecte de solidarité internationale (citoyenneté active mondiale), " +
  "cohérente avec la charte EC.",
  "Deux vignettes contrastées permettent de visualiser concrètement les deux dimensions du concept de " +
  "citoyen.",
  "Ancrer l'ouverture du chapitre dans une comparaison visuelle claire.",
  "Illustration pleine largeur, composition en deux vignettes, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Citoyenneté nationale et communauté mondiale : ce qui change, ce qui reste", "2.2"));
children.push(bodyPar(
  "La citoyenneté nationale et l'appartenance à la communauté mondiale ne fonctionnent pas exactement de la " +
  "même façon — mais elles ne s'opposent pas non plus.",
));
children.push(threeColTable(
  ["Élément", "Citoyenneté nationale", "Communauté mondiale"],
  [
    ["Statut légal", "Existe (nationalité, droits civiques formels)", "N'existe pas formellement"],
    ["Droit de vote", "Existe, encadré par la loi nationale", "N'existe pas à cette échelle"],
    ["Devoirs", "Fixés par la Constitution et les lois", "Fondés sur des valeurs partagées, non imposés légalement"],
    ["Engagement possible", "Vote, participation locale, respect des lois", "Solidarité, information, actions volontaires"],
  ],
  [2400, 3400, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce qui reste commun aux deux échelles, c'est l'éthique citoyenne : le souci de responsabilité envers les " +
  "autres, qu'ils appartiennent à sa nation ou à l'humanité tout entière.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("L'éthique citoyenne, à cadrage élargi", "2.3"));
children.push(bodyPar(
  "L'éthique citoyenne — le souci d'agir de façon responsable envers les autres — avait été étudiée en 7e AF " +
  "à l'échelle locale. Ce chapitre l'élargit : les mêmes principes (respect, responsabilité, solidarité) " +
  "s'appliquent aussi bien envers un voisin de quartier qu'envers une personne inconnue, à l'autre bout du " +
  "monde.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Une éthique, deux échelles",
  [
    "Respecter les biens collectifs de son quartier (échelle locale, déjà connue) repose sur le même principe " +
    "éthique que respecter les ressources partagées de la planète (échelle mondiale).",
    "Aider un camarade de classe en difficulté (échelle locale) et soutenir une cause humanitaire " +
    "internationale (échelle mondiale) relèvent tous deux de la même éthique de responsabilité envers autrui.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C02-02",
  "Exemple analysé — une éthique, deux échelles",
  "Un schéma en forme de balance ou d'équilibre, avec d'un côté « échelle locale » et de l'autre « échelle " +
  "mondiale », reliées par le mot « éthique citoyenne » au centre, cohérent avec la charte EC.",
  "L'éthique citoyenne relie les échelles locale et mondiale par les mêmes principes de responsabilité.",
  "Rendre visible la continuité éthique entre les échelles locale et mondiale.",
  "Illustration demi-page, schéma en équilibre, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les droits fondamentaux : un socle commun, une double portée", "2.4"));
children.push(bodyPar(
  "Les droits fondamentaux que tu as étudiés (Constitution haïtienne, DUDH) ont, eux aussi, une double " +
  "portée : nationale, quand ils sont appliqués par un État précis, et mondiale, car la DUDH elle-même est un " +
  "texte adopté au niveau international, reconnu comme un socle commun à l'humanité entière.",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-9AF-C02-01 — Emplacement réservé pour un extrait exact et vérifié du préambule de la DUDH, " +
    "illustrant sa portée universelle.",
    "Statut : [SOURCE À VÉRIFIER] — aucune formulation exacte n'est reproduite ici tant qu'elle n'a pas été " +
    "confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Participer activement à la vie de la cité, ici et ailleurs", "2.5"));
children.push(bodyPar(
  "Participer activement à la vie de la cité, notion déjà connue depuis la 7e AF, peut aujourd'hui s'exercer " +
  "à deux échelles : dans ta commune, et — grâce à l'information et à la solidarité — dans des causes qui " +
  "dépassent les frontières nationales.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Une même valeur, deux formes d'action",
  [
    "Une élève de 9e AF participe à une collecte pour l'entretien d'une place publique de son quartier " +
    "(action locale). La même élève participe aussi, avec sa classe, à une campagne de sensibilisation " +
    "internationale sur le droit à l'éducation (action mondiale).",
    "1. Identifie la dimension de citoyenneté mobilisée dans chaque action (légale ou active ?).",
    "2. Quelle valeur éthique commune peux-tu identifier entre les deux actions ?",
    "3. Cette élève est-elle « plus citoyenne » quand elle agit localement, ou quand elle agit à l'échelle " +
    "mondiale ? Justifie une réponse nuancée.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — La citoyenneté doit-elle toujours reposer sur un statut légal ?",
  [
    "Certains pensent que seule la citoyenneté légale (nationalité, droits formels) mérite vraiment le nom de " +
    "« citoyenneté ». D'autres pensent que l'engagement actif suffit à faire de quelqu'un un véritable " +
    "citoyen, même sans statut légal correspondant (par exemple à l'échelle mondiale).",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui distingue clairement les deux dimensions du " +
    "concept étudiées dans ce chapitre.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Synthèse comparative citoyen national/mondial"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Réaliser une synthèse comparative entre citoyenneté nationale et appartenance à la communauté " +
    "mondiale. [OFFICIEL — activité prévue par le programme]",
    "CONSIGNES : Reprends le tableau comparatif de ce chapitre (statut légal, droit de vote, devoirs, " +
    "engagement) et complète-le avec au moins un exemple personnel pour chaque ligne.",
    "ÉTAPES : 1. Recopier ou photocopier le tableau. 2. Ajouter, pour chaque ligne, un exemple concret tiré de " +
    "ta propre vie ou de ton observation. 3. Rédiger une courte conclusion personnelle sur ce que signifie, " +
    "pour toi, être à la fois citoyen(ne) haïtien(ne) et membre de la communauté mondiale.",
    "RÉSULTAT ATTENDU : Un tableau enrichi d'exemples personnels et une conclusion synthétique.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C02-03",
  "Espace de production — mon tableau comparatif enrichi",
  "Un cadre vide, format portrait, reproduisant la structure du tableau comparatif du cours avec une colonne " +
  "supplémentaire « Mon exemple », prévu pour que l'élève y consigne directement sa synthèse.",
  "Offrir un espace direct de production pour la synthèse comparative citoyen national/mondial.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, tableau à quatre colonnes, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Le concept de citoyen recouvre deux dimensions : la citoyenneté légale (statut reconnu par un État) et " +
    "la citoyenneté active (engagement réel dans la vie collective).",
    "La citoyenneté nationale et l'appartenance à la communauté mondiale diffèrent par le statut légal, mais " +
    "partagent la même éthique de responsabilité.",
    "L'éthique citoyenne s'applique aux mêmes principes, qu'elle s'exerce à l'échelle locale ou mondiale.",
    "Les droits fondamentaux (Constitution, DUDH) ont une double portée : nationale et internationale.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de définir et de discuter le concept même de citoyen, en distinguant sa dimension " +
  "légale et sa dimension active, de comparer citoyenneté nationale et communauté mondiale, de réintroduire " +
  "l'éthique citoyenne avec un cadrage élargi, et de relier les droits fondamentaux à leur double portée — un " +
  "niveau d'abstraction supérieur à celui des chapitres précédents, conforme aux exigences de la 9e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "concept · citoyenneté légale · citoyenneté active · éthique citoyenne · communauté mondiale.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer citoyenneté légale et citoyenneté active.",
    "☐ Comparer citoyenneté nationale et communauté mondiale sur plusieurs critères.",
    "☐ Expliquer l'éthique citoyenne à l'échelle locale et à l'échelle mondiale.",
    "☐ Expliquer la double portée (nationale et internationale) des droits fondamentaux.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : concept de citoyen, citoyenneté légale/active, éthique citoyenne élargie, double " +
    "portée des droits fondamentaux.",
    "Vocabulaire clé à maîtriser : citoyenneté légale, citoyenneté active, éthique citoyenne, communauté " +
    "mondiale.",
    "Avant l'évaluation, vérifie que tu peux : distinguer les deux dimensions de la citoyenneté ; comparer " +
    "citoyenneté nationale et mondiale ; expliquer la portée élargie de l'éthique citoyenne.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec la structure officielle full-cycle, " +
    "centrée ici sur la définition conceptuelle approfondie attendue en fin de cycle [OFFICIEL, adapté au " +
    "niveau 9e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "citoyenneté légale · citoyenneté active · éthique citoyenne · communauté mondiale.",
  { italics: true },
));
children.push(numberedPar("1. Le statut officiel reconnu par un État, avec des droits et des devoirs formels, s'appelle la ......................"));
children.push(numberedPar("2. L'engagement concret d'une personne dans la vie collective, au-delà du seul statut légal, s'appelle la ......................"));
children.push(numberedPar("3. L'ensemble de principes qui guident le comportement responsable d'un citoyen s'appelle l'......................"));
children.push(numberedPar("4. L'ensemble de l'humanité considérée comme un groupe auquel chaque personne appartient s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Classe les éléments suivants selon qu'ils relèvent de la citoyenneté légale ou de la citoyenneté active : le droit de vote, une action de solidarité internationale, la nationalité, participer à une réunion communautaire."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Il n'existe aucun lien entre la citoyenneté nationale et l'appartenance à la communauté mondiale. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec un exemple personnel, la différence entre citoyenneté légale et citoyenneté active."));
children.push(numberedPar("2. Pourquoi peut-on dire que la DUDH a une portée à la fois nationale et mondiale ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas de l'élève engagée localement et mondialement. Explique en quoi les deux actions relèvent de la même éthique citoyenne."));
children.push(numberedPar("2. Complète, avec un exemple personnel pour chaque ligne, le tableau comparatif citoyenneté nationale / communauté mondiale présenté dans ce chapitre."));
children.push(numberedPar("3. Un camarade affirme : « Sans nationalité reconnue, on ne peut pas être un vrai citoyen. » Que lui réponds-tu, en t'appuyant sur les deux dimensions du concept étudiées dans ce chapitre ?"));
children.push(spacer(240));

// =======================================================================
// BLOC SPÉCIFIQUE — PRÉPARATION AUX EXAMENS OFFICIELS 9e AF
// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Préparation à l'examen officiel de 9e AF", ""));
children.push(bodyPar(
  "Ce bloc, distinct des exercices ordinaires ci-dessus, prolonge la logique de préparation aux examens " +
  "officiels commencée au Chapitre 1.",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE MODÈLE MENFP / DOCUMENT DE PRÉPARATION — Traçabilité (mise à jour)",
  [
    "Référence : « EXAMENS DE 9ème ANNÉE FONDAMENTALE » (juillet 2024), matière Éducation à la Citoyenneté, " +
    "MENFP/DEF/BUNEXE, statut [TEXTE MODÈLE] — jamais requalifié en « examen officiel », statut de " +
    "reproduction [DROITS / SOURCE À RÉGLER], toujours non reproduit.",
    "Correspondance documentée pour ce chapitre (`08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`) : la Partie I " +
    "(QCM) du Texte modèle comporte une question sur les « devoirs du citoyen » (impôt, respect des biens de " +
    "l'État), explicitement rattachée aux Unités 2 et 3. Seul ce thème et ce format (QCM de connaissance " +
    "directe) servent de repère ici — le développement fiscal complet reste réservé au Chapitre 3 (Unité 3).",
    "Aucune ressource 2025/2026 vérifiée n'est disponible à ce jour — statut [À VÉRIFIER — PREUVE À FOURNIR] " +
    "inchangé depuis le Chapitre 1.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("A. Entraînement type examen — QCM sur les devoirs du citoyen"));
children.push(bodyPar(
  "Questions originales, inspirées du format QCM et du thème « devoirs du citoyen » observés (Partie I, " +
  "Texte modèle 2024). Entoure la bonne réponse.",
  { italics: true },
));
children.push(numberedPar("1. Respecter les biens de l'État (écoles publiques, espaces communs) est : (a) un choix facultatif (b) un devoir du citoyen (c) réservé aux fonctionnaires"));
children.push(numberedPar("2. La citoyenneté légale se distingue de la citoyenneté active parce qu'elle repose sur : (a) un statut reconnu par la loi (b) une opinion personnelle (c) une préférence culturelle"));
children.push(numberedPar("3. Un devoir civique typique du citoyen envers l'État est : (a) ignorer les lois (b) contribuer, selon les règles établies, au fonctionnement du pays (c) éviter toute participation"));
children.push(spacer(200));

children.push(subHeading("B. Entraînement type examen — Mise en relation de concepts"));
children.push(bodyPar(
  "Exercice original, inspiré des formats de mise en relation observés dans les ressources d'examen.",
  { italics: true },
));
children.push(numberedPar("1. Relie chaque exemple à la dimension de citoyenneté qu'il illustre le mieux : (a) posséder la nationalité haïtienne, (b) participer à une collecte de solidarité internationale, (c) voter à une élection — avec : (1) citoyenneté légale, (2) citoyenneté active mondiale, (3) citoyenneté légale et active à la fois."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mini-évaluation — Préparation à l'examen officiel de 9e AF, Chapitre 2", ""));
children.push(bodyPar(
  "Épreuve d'entraînement originale, propre à ce manuel. Elle ne reproduit pas et ne remplace pas une épreuve " +
  "MENFP réelle. Barème indicatif sur 20 points. Le corrigé est réservé à la Phase Finale du manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — QCM sur les devoirs du citoyen (8 points, 4 questions)"));
children.push(numberedPar("1. Payer ses obligations envers l'État selon les règles établies est : (a) facultatif (b) un devoir civique (c) réservé aux entreprises"));
children.push(numberedPar("2. La citoyenneté active se manifeste par : (a) un document officiel uniquement (b) un engagement concret dans la vie collective (c) l'absence de participation"));
children.push(numberedPar("3. La DUDH est un texte : (a) purement local (b) reconnu au niveau international (c) sans lien avec les droits nationaux"));
children.push(numberedPar("4. L'éthique citoyenne étudiée dans ce chapitre s'applique : (a) uniquement à l'échelle locale (b) uniquement à l'échelle mondiale (c) aux deux échelles à la fois"));
children.push(spacer(200));

children.push(subHeading("Partie II — Mise en relation (6 points)"));
children.push(bodyPar(
  "Relie chaque situation à la dimension de citoyenneté qu'elle illustre principalement (légale, active, ou " +
  "les deux) : (a) respecter une loi nationale ; (b) s'informer sur un enjeu humanitaire mondial ; (c) voter " +
  "lors d'une élection.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie III — Justification courte (6 points)"));
children.push(numberedPar("1. En 3 à 5 lignes, explique pourquoi l'éthique citoyenne reste la même, que l'on agisse à l'échelle locale ou à l'échelle mondiale."));

await buildAndSave(children, 12, "Manuel_EC_9AF_Chapitre2.docx");
