// Manuel d'EC 9e AF — Chapitre 4 : Vers une société inclusive
// (Unité 4 — Penser l'autre comme soi-même : le principe d'égalité,
// Compétences C1, C2, C3).
//
// Prolonge les Chapitres 1-3 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 33 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-21, Chapitre 3 = pages 22-32).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.36-37 : Unité 4, colonne 9e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`,
//     [ADAPTATION DE LECTURE] pour la segmentation par année, contenu
//     lui-même verbatim) : "Engagement pour une école et une société
//     inclusive, entr'aide. Droits relatifs à l'éducation et à la
//     scolarité, participation démocratique en classe. La protection
//     sociale. Engagement citoyen pour le respect des principes d'égalité,
//     entr'aide."
//   - `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md` (verrouillée sans changement
//     dans `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`) : situation de départ
//     "les situations d'inégalités citées par le Texte modèle 2024
//     (reformulées, non copiées)" ; activité "proposition d'actions
//     citoyennes argumentées".
//
// **CHAPITRE À CORRESPONDANCE EXAMEN DIRECTEMENT CONFIRMÉE** : la question
// 7 de la Partie II du Texte modèle EC 9e AF 2024 porte explicitement sur
// les inégalités sociales — discrimination envers les femmes, école non
// inclusive, accès limité aux soins — et demande deux actions proposées à
// l'État (voir `07_INVENTAIRE_EXAMENS_EC_9AF.md`,
// `08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`). La question 6 (classement
// d'attitudes « citoyen irresponsable »/« citoyen engagé ») est également
// rattachée à cette unité. Conformément à la règle de preuve, ces THÈMES
// et ce FORMAT servent uniquement de repère : toutes les situations et
// questions ci-dessous sont reformulées et rédigées originalement, aucun
// énoncé du Texte modèle 2024 n'est copié.
//
// PROGRESSION RÉELLE 7e → 8e → 9e AF (section 4 du prompt) : le Chapitre 4
// de 7e AF a construit la connaissance de l'égalité (dignité, libertés,
// inégalité) ; le Chapitre 4 de 8e AF a fait passer cette connaissance à un
// engagement personnel concret (entraide de classe). CES ACQUIS NE SONT
// PAS REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref, section 4.1) pour
// franchir un nouveau palier — le passage de l'engagement personnel/de
// classe à une RÉFLEXION SOCIÉTALE sur l'inclusion (école et société
// inclusives) et la PROTECTION SOCIALE, notion entièrement nouvelle à ce
// stade, conformément à `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`.
// La formule répétée dans la source (« respect de soi et de l'autre,
// tolérance ») n'est volontairement pas reprise ici.
//
// TRAITEMENT DU THÈME « DISCRIMINATION ENVERS LES FEMMES » (transparence,
// section 9 du prompt d'exécution du Chapitre 1, reconduite ici) : ce thème
// est nommé explicitement par l'examen officiel lui-même — il n'est pas un
// ajout éditorial. Il est traité ici de façon factuelle et respectueuse,
// centré sur le principe d'égalité déjà construit en 7e AF, sans détail
// choquant ni généralisation, cohérent avec les principes de neutralité et
// de dignité du projet.
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
  4,
  "Vers une société inclusive",
  "En 8e AF, tu as organisé l'entraide dans ta propre classe. Ce chapitre t'invite à penser plus grand : " +
  "comment une école entière, une société entière, peut-elle devenir réellement inclusive — et quel rôle la " +
  "protection sociale joue-t-elle dans cette construction ?",
  [
    "Définir ce qu'est une société inclusive, à l'échelle de l'école et au-delà.",
    "Expliquer le rôle de la protection sociale.",
    "Analyser des situations d'inégalité sociale (genre, éducation, santé).",
    "Proposer, par écrit, des actions citoyennes argumentées adressées à l'État.",
    "S'entraîner aux formats d'analyse citoyenne et de proposition d'action attestés à l'examen 9e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Une école pas comme les autres",
  [
    "Une classe de 9e AF visite une école qui a mis en place des aménagements pour accueillir des élèves en " +
    "situation de handicap, des bourses pour les familles à faibles revenus, et un accompagnement pour les " +
    "élèves en difficulté scolaire. « C'est ça, une école inclusive », explique la directrice. Ce chapitre " +
    "t'aide à comprendre ce que signifie vraiment ce mot — et à réfléchir à l'échelle de toute une société.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e et 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris ce que sont la dignité, les libertés fondamentales et l'inégalité. En 8e AF, tu as " +
  "organisé un engagement concret pour l'égalité à l'échelle de ta classe (entraide). Ce chapitre ne " +
  "redéveloppe pas ces contenus : il élargit ton regard à l'échelle de l'école entière et de la société.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Société inclusive — société organisée pour que chaque personne, quelles que soient ses différences ou ses difficultés, puisse y prendre pleinement sa place."));
children.push(bulletPar("Protection sociale — ensemble des mécanismes collectifs (santé, soutien aux plus vulnérables) qui protègent les citoyens face aux difficultés de la vie."));
children.push(bulletPar("Discrimination — traitement défavorable et injustifié d'une personne en raison d'une caractéristique (genre, origine, situation...)."));
children.push(bulletPar("Inégalité sociale — situation dans laquelle des groupes de personnes n'ont pas un accès comparable aux mêmes droits ou ressources."));
children.push(bulletPar("Action citoyenne argumentée — proposition concrète, justifiée par des raisons claires, adressée à une autorité pour améliorer une situation."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("De l'engagement personnel à la réflexion sociétale", "4.1"));
children.push(bodyPar(
  "Organiser l'entraide dans sa classe (8e AF) est une action réelle et utile. Mais certaines inégalités " +
  "dépassent ce que peut résoudre une seule classe : elles concernent l'organisation de toute une école, " +
  "voire de toute une société. Ce chapitre t'invite à réfléchir à cette échelle plus large.",
));
children.push(spacer(200));

children.push(sectionHeading("Qu'est-ce qu'une société inclusive ?", "4.2"));
children.push(bodyPar(
  "Une société inclusive est organisée pour que chaque personne — quelles que soient ses différences " +
  "(situation économique, capacités, genre, origine) — puisse y participer pleinement, sans en être exclue.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Une école inclusive, exemples concrets",
  [
    "Des aménagements pour les élèves en situation de handicap (accès physique, matériel adapté).",
    "Un soutien pour les élèves rencontrant des difficultés économiques ou scolaires.",
    "Une attention à ce que chaque élève, quel que soit son genre ou son origine, ait les mêmes chances de " +
    "participer et de réussir.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C04-01",
  "Ouverture — Une école aménagée pour tous",
  "Une scène d'école haïtienne crédible montrant des aménagements simples favorisant l'inclusion (rampe " +
  "d'accès, matériel adapté, ambiance de classe diverse et accueillante), dans un style illustratif cohérent " +
  "avec la charte EC.",
  "Une école concrètement aménagée illustre ce que signifie une société inclusive.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire positive et réaliste.",
  "Illustration pleine largeur, scène scolaire haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La protection sociale : un filet de sécurité collectif", "4.3"));
children.push(bodyPar(
  "La protection sociale regroupe les mécanismes collectifs qui aident les citoyens à faire face aux " +
  "difficultés de la vie — maladie, perte de revenu, vulnérabilité — sans que chacun ait à y faire face " +
  "totalement seul. Elle est souvent financée, en partie, par la redistribution étudiée au Chapitre 3.",
));
children.push(spacer(200));

children.push(sectionHeading("Trois inégalités sociales à examiner", "4.4"));
children.push(bodyPar(
  "Certaines inégalités sociales concernent particulièrement la vie quotidienne des citoyens. En voici trois, " +
  "à examiner avec attention et sans généralisation excessive.",
));
children.push(threeColTable(
  ["Inégalité", "Ce qu'elle signifie", "Piste de réflexion"],
  [
    ["Discrimination liée au genre", "Traitement défavorable selon qu'on est une femme ou un homme", "Égalité d'accès à l'éducation, au travail, à la parole"],
    ["École non inclusive", "Une école qui ne s'adapte pas aux besoins de tous les élèves", "Aménagements, soutien, accompagnement"],
    ["Accès limité aux soins", "Difficulté à accéder à des services de santé de qualité", "Proximité, coût, disponibilité des services"],
  ],
  [2600, 3600, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces trois situations, examinées ici de façon générale et respectueuse, illustrent des inégalités sociales " +
  "réelles, sans viser une personne, une famille ou un lieu précis.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C04-02",
  "Exemple analysé — trois inégalités sociales",
  "Une planche en trois vignettes générales et respectueuses illustrant chacune des trois inégalités " +
  "(genre, éducation, santé), sans représentation stigmatisante, cohérente avec la charte EC.",
  "Les trois inégalités sociales étudiées se distinguent et se comprennent par des situations concrètes.",
  "Donner une référence visuelle claire et respectueuse des trois thèmes étudiés.",
  "Illustration demi-page, planche en trois vignettes, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "ÉTUDE DE CAS — Une école qui exclut sans le vouloir",
  [
    "Une école accueille un nouvel élève ayant une difficulté de mobilité. L'école n'a ni rampe d'accès ni " +
    "matériel adapté, non par mauvaise volonté, mais faute de moyens et d'anticipation.",
    "1. En quoi cette situation illustre-t-elle une école « non inclusive », même sans intention négative ?",
    "2. Quelles solutions, même modestes, pourraient être envisagées à court terme, en attendant des moyens " +
    "plus importants ?",
    "3. À qui revient, selon toi, la responsabilité principale de résoudre ce problème : l'école seule, " +
    "l'État, ou les deux ensemble ? Justifie une réponse nuancée.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — L'inclusion, une responsabilité de l'État ou de chacun ?",
  [
    "Certains pensent que rendre la société inclusive est avant tout une responsabilité de l'État (lois, " +
    "moyens, protection sociale). D'autres pensent que les comportements individuels et collectifs comptent " +
    "tout autant, indépendamment des moyens de l'État.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle nuancée, qui distingue le rôle de l'État et celui du " +
    "citoyen.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Classer des attitudes citoyennes"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Classer des attitudes citoyennes face aux inégalités sociales, pour distinguer un " +
    "comportement responsable d'un comportement qui aggrave la situation.",
    "CONSIGNES : Pour chaque situation suivante, indique si elle relève d'un « citoyen engagé » ou d'un " +
    "« citoyen qui aggrave le problème », et justifie brièvement : (a) signaler poliment un manque " +
    "d'accessibilité à la direction d'une école ; (b) se moquer d'un élève en difficulté ; (c) proposer son " +
    "aide à un camarade qui a du mal à suivre le cours à cause d'un problème de santé.",
    "RÉSULTAT ATTENDU : Un classement justifié, montrant une compréhension claire de ce qu'est un comportement " +
    "citoyen responsable face à l'inclusion.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Proposer deux actions citoyennes argumentées à l'État"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit la proposition d'actions citoyennes argumentées. [OFFICIEL — activité " +
    "prévue par le programme]",
    "OBJECTIF : Choisis une des trois inégalités sociales étudiées dans ce chapitre (genre, éducation, santé) " +
    "et propose DEUX actions concrètes que l'État pourrait mettre en place pour la réduire.",
    "ÉTAPES : 1. Choisir l'inégalité sociale. 2. Décrire brièvement la situation (sans viser un lieu ou une " +
    "personne précise). 3. Rédiger une première action, avec une justification. 4. Rédiger une seconde " +
    "action, différente de la première, avec sa justification. 5. Relire pour vérifier le ton respectueux et " +
    "réaliste des propositions.",
    "RÉSULTAT ATTENDU : Deux actions citoyennes distinctes, clairement justifiées, adressées à l'État de " +
    "façon respectueuse et réaliste.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C04-03",
  "Espace de production — mes deux actions citoyennes",
  "Un cadre vide, format portrait, structuré en deux zones symétriques (Action 1 + justification / Action 2 + " +
  "justification), prévu pour que l'élève y rédige directement ses propositions.",
  "Offrir un espace direct de production pour structurer la rédaction des deux actions citoyennes.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, deux zones symétriques, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une société inclusive permet à chaque personne, quelles que soient ses différences, d'y participer " +
    "pleinement.",
    "La protection sociale est un mécanisme collectif qui aide les citoyens à faire face aux difficultés de " +
    "la vie.",
    "La discrimination liée au genre, l'école non inclusive et l'accès limité aux soins sont des inégalités " +
    "sociales réelles, à traiter avec nuance et sans stigmatisation.",
    "Proposer des actions citoyennes argumentées à l'État est une façon concrète de contribuer à une société " +
    "plus inclusive.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de définir ce qu'est une société inclusive, de comprendre le rôle de la protection " +
  "sociale, d'examiner trois inégalités sociales avec nuance (genre, éducation, santé), et de s'exercer à " +
  "proposer des actions citoyennes argumentées à l'État — un passage de l'engagement personnel/de classe à " +
  "une réflexion véritablement sociétale.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "société inclusive · protection sociale · discrimination · inégalité sociale · action citoyenne argumentée.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Définir ce qu'est une société inclusive à partir d'un exemple scolaire.",
    "☐ Expliquer le rôle de la protection sociale.",
    "☐ Analyser une inégalité sociale (genre, éducation ou santé) sans généralisation excessive.",
    "☐ Classer des attitudes citoyennes face à l'inclusion.",
    "☐ Proposer deux actions citoyennes argumentées adressées à l'État.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : société inclusive, protection sociale, discrimination, inégalité sociale, action " +
    "citoyenne argumentée.",
    "Vocabulaire clé à maîtriser : société inclusive, protection sociale, discrimination, inégalité sociale.",
    "Avant l'évaluation, vérifie que tu peux : définir une société inclusive ; analyser une inégalité sociale " +
    "avec nuance ; proposer deux actions citoyennes argumentées.",
    "Rappel officiel : cette unité correspond directement à la question sur les inégalités sociales et à la " +
    "proposition de deux actions à l'État, ainsi qu'au classement d'attitudes citoyennes, tous deux observés " +
    "dans le Texte modèle 2024 [OFFICIEL — SOURCE MENFP VÉRIFIÉE, correspondance documentée].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(4));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : société " +
  "inclusive · protection sociale · discrimination · inégalité sociale.",
  { italics: true },
));
children.push(numberedPar("1. Une société organisée pour que chacun puisse y prendre pleinement sa place s'appelle une ......................"));
children.push(numberedPar("2. L'ensemble des mécanismes collectifs qui protègent les citoyens face aux difficultés de la vie s'appelle la ......................"));
children.push(numberedPar("3. Un traitement défavorable et injustifié en raison d'une caractéristique personnelle s'appelle une ......................"));
children.push(numberedPar("4. Une situation où des groupes n'ont pas un accès comparable aux mêmes droits ou ressources s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite les trois inégalités sociales étudiées dans ce chapitre."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Une école devient automatiquement inclusive si elle a beaucoup de moyens financiers. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, à partir de l'étude de cas de l'école non aménagée, ce qui distingue une exclusion involontaire d'une discrimination volontaire."));
children.push(numberedPar("2. Pourquoi la protection sociale est-elle souvent liée au mécanisme de redistribution étudié au Chapitre 3 ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas de l'élève à mobilité réduite. Propose une solution modeste et réaliste, réalisable à court terme."));
children.push(numberedPar("2. Présente les deux actions citoyennes argumentées que tu as rédigées dans le Projet de ce chapitre."));
children.push(numberedPar("3. Un camarade affirme : « Les inégalités sociales, ce n'est pas notre problème, c'est celui du gouvernement. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(240));

// =======================================================================
// BLOC SPÉCIFIQUE — PRÉPARATION AUX EXAMENS OFFICIELS 9e AF
// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Préparation à l'examen officiel de 9e AF", ""));
children.push(bodyPar(
  "Ce chapitre présente une correspondance directement confirmée avec le Texte modèle 2024 (questions sur les " +
  "inégalités sociales et le classement d'attitudes citoyennes).",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE MODÈLE MENFP / DOCUMENT DE PRÉPARATION — Traçabilité (correspondance confirmée)",
  [
    "Référence : « EXAMENS DE 9ème ANNÉE FONDAMENTALE » (juillet 2024), matière Éducation à la Citoyenneté, " +
    "MENFP/DEF/BUNEXE, statut [TEXTE MODÈLE] — jamais requalifié en « examen officiel », statut de " +
    "reproduction [DROITS / SOURCE À RÉGLER], non reproduit.",
    "Correspondance documentée (`08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`) : la question 6 de la Partie II " +
    "(classement d'attitudes « citoyen irresponsable »/« citoyen engagé ») et la question 7 (question ouverte " +
    "sur les inégalités sociales — discrimination envers les femmes, école non inclusive, accès limité aux " +
    "soins — avec deux actions proposées à l'État) sont rattachées à cette unité.",
    "Seuls ces THÈMES et ce FORMAT (classement d'attitudes ; proposition de deux actions argumentées) servent " +
    "de repère : toutes les situations ci-dessous sont reformulées et originales, aucun énoncé du Texte " +
    "modèle 2024 n'est copié.",
    "Aucune ressource 2025/2026 vérifiée n'est disponible à ce jour — statut [À VÉRIFIER — PREUVE À FOURNIR] " +
    "inchangé.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("A. Entraînement type examen — Classement d'attitudes"));
children.push(bodyPar(
  "Exercice original, inspiré du format de classement observé (question 6, Partie II, Texte modèle 2024).",
  { italics: true },
));
children.push(numberedPar("1. Classe chaque attitude en « citoyen(ne) engagé(e) » ou « citoyen(ne) irresponsable » : (a) proposer une solution constructive face à une inégalité observée ; (b) ignorer volontairement une situation d'exclusion ; (c) participer à une action collective pour améliorer l'accès à un service public ; (d) se moquer d'une personne en difficulté."));
children.push(spacer(200));

children.push(subHeading("B. Entraînement type examen — Proposition de deux actions argumentées"));
children.push(bodyPar(
  "Exercice original, inspiré du format de la question 7 (Partie II, Texte modèle 2024).",
  { italics: true },
));
children.push(numberedPar("1. Choisis une inégalité sociale différente de celle traitée dans ton Projet. Propose deux actions citoyennes argumentées que l'État pourrait mettre en place pour la réduire."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mini-évaluation — Préparation à l'examen officiel de 9e AF, Chapitre 4", ""));
children.push(bodyPar(
  "Épreuve d'entraînement originale, propre à ce manuel. Elle ne reproduit pas et ne remplace pas une épreuve " +
  "MENFP réelle. Barème indicatif sur 20 points. Le corrigé est réservé à la Phase Finale du manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — QCM (6 points, 3 questions)"));
children.push(numberedPar("1. Une société inclusive est une société qui : (a) exclut les personnes différentes (b) permet à chacun d'y prendre pleinement sa place (c) ignore les inégalités"));
children.push(numberedPar("2. La protection sociale a pour but principal de : (a) enrichir l'État (b) aider les citoyens face aux difficultés de la vie (c) remplacer l'éducation"));
children.push(numberedPar("3. Signaler poliment un problème d'accessibilité à une autorité compétente est une attitude : (a) irresponsable (b) engagée (c) sans importance"));
children.push(spacer(200));

children.push(subHeading("Partie II — Classement d'attitudes (6 points)"));
children.push(bodyPar(
  "Classe les attitudes suivantes en « citoyen(ne) engagé(e) » ou « citoyen(ne) irresponsable », en " +
  "justifiant brièvement chaque choix : (a) aider un camarade en situation de handicap à participer à une " +
  "activité ; (b) refuser catégoriquement toute discussion sur les inégalités ; (c) proposer une solution " +
  "concrète face à un problème d'accès aux soins observé dans son quartier.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie III — Proposition de deux actions argumentées (8 points)"));
children.push(numberedPar("1. À partir d'une des trois inégalités sociales étudiées dans ce chapitre (genre, éducation ou santé), propose deux actions citoyennes argumentées adressées à l'État pour la réduire."));

await buildAndSave(children, 33, "Manuel_EC_9AF_Chapitre4.docx");
