// Manuel d'EC 7e AF — Chapitre 6 : Paix, protection et sécurité au quotidien
// (Unité 6 — La paix, la protection et la sécurité, Compétences C1, C2, C3).
//
// Prolonge les Chapitres 1-5 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 50 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-22, Chapitre 3 = pages 23-31, Chapitre 4 = pages
// 32-40, Chapitre 5 = pages 41-49).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.38-40 : Unité 6. Contenu officiel 7e AF cité verbatim
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillé sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`,
//     [ADAPTATION DE LECTURE] pour la segmentation par année, contenu
//     lui-même verbatim) : "L'engagement du citoyen dans les activités
//     visant à garantir la paix, la protection individuelle et collective,
//     la sécurité. Les institutions chargées d'assurer la défense du
//     territoire national et des citoyens."
//   - `09_TABLE_MATIERES_PROPOSEE_EC_7AF.md` (verrouillée sans changement
//     dans `19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md`) : situation de départ
//     "une situation de sécurité au quotidien (traversée d'une rue,
//     incident de quartier)" ; activité "recherche sur les institutions de
//     sécurité [OFFICIEL]" ; évaluation "portfolio d'extraits de presse sur
//     la paix/protection/sécurité [OFFICIEL]".
//   - Compétences C1, C2, C3 (tableau croisé compétences × unités,
//     `05_MATRICE_COMPETENCES_UNITES_EC.md`).
//
// PÉRIMÈTRE 7e AF STRICTEMENT RESPECTÉ (section 4/5 du prompt) :
// `05_MATRICE_COMPETENCES_UNITES_EC.md` documente, pour l'Unité 6, un
// tableau savoirs/activités/évaluation « full-cycle » (7e+8e+9e AF combinés
// dans le document source lui-même, comme précisé en tête de ce fichier).
// Ce tableau mentionne des éléments explicitement réservés à des niveaux
// supérieurs selon `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md` :
// institutions judiciaires, législation du travail, prélèvement et
// redistribution, institutions internationales/ONG (dimension 9e AF ;
// culture de la paix = approfondissement 8e AF). Ce chapitre N'UTILISE PAS
// ces éléments : seuls l'engagement citoyen pour la paix/protection/
// sécurité et les institutions de défense du territoire (7e AF) sont
// développés, conformément à la matrice de progression verrouillée.
//
// INSTITUTIONS CITÉES (transparence éditoriale) : la Police Nationale
// d'Haïti (institution chargée de l'ordre public) et la Direction de la
// Protection Civile (institution chargée de la réponse aux risques
// naturels) sont des institutions publiques haïtiennes réelles et
// non partisanes, citées ici comme connaissance civique générale
// [ADAPTATION PÉDAGOGIQUE] pour répondre à l'objectif officiel « identifier
// les institutions de sécurité » — leur mention factuelle n'implique aucun
// jugement politique et ne mentionne aucun parti, gouvernement ni période
// précise.
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
  "Paix, protection et sécurité au quotidien",
  "Traverser une rue sans regarder. Un attroupement qui inquiète dans le quartier. Une alerte météo annoncée " +
  "à la radio. La sécurité fait partie du quotidien, et elle ne dépend pas que des institutions : elle " +
  "commence aussi par les gestes de chaque citoyen, dès la 7e AF.",
  [
    "Comprendre que la sécurité est une responsabilité à la fois individuelle et collective.",
    "Identifier des institutions chargées d'assurer la protection des citoyens.",
    "Interpréter correctement une consigne ou un avertissement de sécurité.",
    "Décrire son propre rôle citoyen dans la paix et la sécurité au quotidien.",
    "Constituer un portfolio d'extraits de presse sur la paix, la protection et la sécurité.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Traverser la rue devant l'école",
  [
    "Chaque matin, des élèves traversent une rue passante devant leur école, parfois en courant, sans regarder " +
    "des deux côtés. Un jour, un accident est évité de justesse. « On a eu de la chance », dit une élève. Ce " +
    "chapitre part de cette situation ordinaire pour comprendre ce que signifie vraiment la sécurité au " +
    "quotidien.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis issus des Chapitres 1 à 5"));
children.push(bodyPar(
  "Au Chapitre 5, tu as appris que la paix sociale se construit par le dialogue, à l'échelle des relations " +
  "entre personnes. Ce chapitre élargit cette idée de paix à une échelle plus large : celle de la protection " +
  "et de la sécurité de toute une communauté, avec l'aide d'institutions dédiées.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Sécurité — état dans lequel une personne ou une communauté est protégée contre un danger ou un risque."));
children.push(bulletPar("Protection — ensemble des mesures prises pour préserver la sécurité et le bien-être d'une personne ou d'un groupe."));
children.push(bulletPar("Institution de sécurité — organisme officiel chargé de protéger les citoyens et de faire respecter l'ordre public."));
children.push(bulletPar("Risque — possibilité qu'un événement dangereux ou dommageable se produise."));
children.push(bulletPar("Consigne de sécurité — instruction précise à suivre pour éviter un danger ou réagir correctement face à un risque."));
children.push(bulletPar("Vigilance citoyenne — attention et prudence qu'une personne exerce au quotidien pour sa sécurité et celle des autres."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La sécurité, une responsabilité partagée", "6.1"));
children.push(bodyPar(
  "La sécurité ne dépend pas uniquement des institutions : elle repose aussi sur les gestes quotidiens de " +
  "chaque personne. Regarder des deux côtés avant de traverser, respecter une consigne, signaler une situation " +
  "dangereuse — ce sont des actions simples qui contribuent à la sécurité collective.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Sécurité individuelle et sécurité collective",
  [
    "La sécurité individuelle concerne les gestes qui protègent une seule personne (regarder avant de " +
    "traverser, porter un équipement de protection si nécessaire).",
    "La sécurité collective concerne ce qui protège tout un groupe (respecter les règles de circulation dans " +
    "une cour d'école, alerter en cas de danger commun).",
    "Les deux sont liées : un geste individuel prudent contribue souvent à la sécurité de tout le groupe.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C06-01",
  "Ouverture — La traversée devant l'école",
  "Une scène de rue haïtienne crédible devant une école, avec des élèves qui s'apprêtent à traverser, l'un " +
  "d'eux regardant prudemment des deux côtés, dans un style illustratif cohérent avec la charte EC, sans " +
  "scène d'accident représentée.",
  "Un geste quotidien simple illustre concrètement la sécurité individuelle et collective.",
  "Ancrer l'ouverture du chapitre dans une scène réaliste et non alarmante.",
  "Illustration pleine largeur, scène de rue devant une école haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les institutions chargées de notre protection", "6.2"));
children.push(bodyPar(
  "En Haïti, plusieurs institutions publiques sont chargées d'assurer la protection des citoyens et du " +
  "territoire, chacune avec une mission particulière.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des institutions de sécurité [ADAPTATION PÉDAGOGIQUE]",
  [
    "La Police Nationale d'Haïti — institution chargée de maintenir l'ordre public et de protéger les " +
    "citoyens au quotidien.",
    "La Direction de la Protection Civile — institution chargée de préparer la population et de coordonner la " +
    "réponse face aux risques naturels (cyclones, séismes, inondations).",
    "D'autres institutions locales, comme les mairies, participent aussi à la sécurité de leur commune, par " +
    "exemple en organisant la circulation ou en alertant en cas de danger.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-7AF-C06-01 — Emplacement réservé pour un extrait exact et vérifié d'un texte national ou " +
    "international reconnaissant le droit à la sûreté et à la protection.",
    "Statut : [SOURCE À VÉRIFIER] — aucune formulation exacte n'est reproduite ici tant qu'elle n'a pas été " +
    "confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(threeColTable(
  ["Institution", "Mission principale", "Exemple de situation"],
  [
    ["Police Nationale d'Haïti", "Maintenir l'ordre public et protéger les citoyens", "Intervenir lors d'un incident de quartier"],
    ["Direction de la Protection Civile", "Préparer et répondre aux risques naturels", "Alerter avant l'arrivée d'un cyclone"],
    ["Mairie / autorités locales", "Organiser la sécurité à l'échelle de la commune", "Sécuriser la circulation près d'une école"],
  ],
  [2800, 3400, 3200],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comprendre et respecter une consigne de sécurité", "6.3"));
children.push(bodyPar(
  "Une consigne de sécurité n'est utile que si elle est bien comprise et suivie. Elle est généralement claire, " +
  "précise, et prévoit une action concrète à réaliser en cas de danger.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Lire une consigne de sécurité",
  [
    "Une bonne consigne répond à trois questions : Quel est le danger ? Que dois-je faire ? Qui dois-je " +
    "prévenir si besoin ?",
    "Exemple : « En cas de fortes pluies, évite les zones proches des ravines et informe un adulte. » — Le " +
    "danger (crue soudaine), l'action (éviter la zone), et la personne à prévenir (un adulte) sont tous " +
    "présents.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C06-02",
  "Exemple analysé — anatomie d'une consigne de sécurité",
  "Un schéma présentant une consigne de sécurité simple (par exemple sur les fortes pluies), avec trois " +
  "flèches annotées : le danger, l'action à faire, la personne à prévenir, cohérent avec la charte EC.",
  "Une consigne de sécurité bien comprise se décompose en trois éléments clairs.",
  "Donner une méthode visuelle claire pour analyser toute consigne de sécurité.",
  "Illustration demi-page, schéma annoté en trois flèches, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le rôle du citoyen dans la paix et la sécurité", "6.4"));
children.push(bodyPar(
  "Être un citoyen engagé pour la paix et la sécurité, ce n'est pas seulement respecter les règles : c'est " +
  "aussi rester vigilant, signaler une situation dangereuse, et adopter des comportements qui protègent soi-" +
  "même et les autres, à l'école comme dans le quartier.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Un incident dans le quartier",
  [
    "Un soir, un groupe d'élèves remarque un attroupement inhabituel et bruyant près d'un carrefour de leur " +
    "quartier, sur le chemin du retour de l'école. Certains veulent s'approcher pour voir ce qui se passe, " +
    "d'autres préfèrent rentrer directement.",
    "1. Quels risques cette situation peut-elle présenter ?",
    "2. Quel comportement citoyen, parmi les deux proposés, te semble le plus prudent ? Justifie ta réponse.",
    "3. Quelle institution pourrait être prévenue si la situation semblait réellement dangereuse ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — La sécurité, seulement l'affaire des institutions ?",
  [
    "Certains pensent que la sécurité est uniquement le travail des institutions (police, protection civile). " +
    "D'autres pensent que chaque citoyen, même jeune, a un rôle réel à jouer au quotidien.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Enquête sur une institution de sécurité"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Réaliser une courte recherche sur une institution de sécurité présente dans ta commune " +
    "(poste de police, comité de protection civile local, etc.). [OFFICIEL — activité prévue par le " +
    "programme]",
    "CONSIGNES : Choisis une institution accessible. Renseigne-toi, auprès d'un adulte ou d'une source fiable, " +
    "sur son rôle et sur une situation où elle est intervenue.",
    "ÉTAPES : 1. Choisir l'institution. 2. Recueillir au moins trois informations vérifiées (mission, zone " +
    "d'action, exemple d'intervention). 3. Préparer une courte présentation pour la classe. 4. Expliquer en " +
    "quoi cette institution contribue à la sécurité de la communauté.",
    "RÉSULTAT ATTENDU : Une fiche courte et une présentation orale expliquant le rôle concret d'une " +
    "institution de sécurité locale.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Portfolio de presse sur la paix et la sécurité"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit la constitution d'un portfolio d'extraits de presse sur la paix, la " +
    "protection et la sécurité — ce portfolio sert aussi de base à l'évaluation officielle de ce chapitre. " +
    "[OFFICIEL — activité et évaluation prévues par le programme]",
    "OBJECTIF : Rassembler, au fil des semaines, des articles ou résumés d'articles (radio, journal, actualité " +
    "locale) liés à la paix, à la protection ou à la sécurité dans ta commune ou ton pays.",
    "ÉTAPES : 1. Choisir un article ou une information d'actualité liée au sujet. 2. En résumer les points " +
    "principaux avec tes propres mots (jamais copiés mot pour mot). 3. Noter le lien avec la paix, la " +
    "protection ou la sécurité. 4. Ajouter la page au portfolio, poursuivi tout au long du chapitre.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C06-03",
  "Espace de production — ma page de portfolio presse",
  "Un cadre vide, format portrait, structuré en trois zones (titre de l'article, résumé personnel, lien avec " +
  "la paix/protection/sécurité), prévu pour que l'élève y crée directement sa page de portfolio.",
  "Offrir un espace direct de production pour ancrer le portfolio de presse sur la paix et la sécurité.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, trois zones délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La sécurité est une responsabilité à la fois individuelle et collective.",
    "Plusieurs institutions haïtiennes (Police Nationale d'Haïti, Direction de la Protection Civile, autorités " +
    "locales) sont chargées de la protection des citoyens.",
    "Une consigne de sécurité répond à trois questions : quel danger, quelle action, qui prévenir.",
    "Le citoyen, même jeune, a un rôle réel à jouer dans la paix et la sécurité au quotidien : vigilance, " +
    "prudence, signalement.",
    "Le portfolio de presse permet de suivre, dans l'actualité, comment la paix et la sécurité concernent la " +
    "vie collective.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de comprendre que la sécurité repose à la fois sur des institutions dédiées et sur des " +
  "gestes citoyens individuels, d'identifier des institutions de sécurité haïtiennes, d'apprendre à analyser " +
  "une consigne de sécurité, et de s'exercer à une enquête citoyenne ainsi qu'à un portfolio de presse sur la " +
  "paix, la protection et la sécurité.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "sécurité · protection · institution de sécurité · risque · consigne de sécurité · vigilance citoyenne.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer la différence entre sécurité individuelle et sécurité collective.",
    "☐ Nommer au moins une institution de sécurité haïtienne et sa mission principale.",
    "☐ Analyser une consigne de sécurité en identifiant le danger, l'action et la personne à prévenir.",
    "☐ Décrire un comportement citoyen prudent face à une situation à risque.",
    "☐ Constituer une page de portfolio reliant un fait d'actualité à la paix, la protection ou la sécurité.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : sécurité individuelle/collective, institution de sécurité, risque, consigne de " +
    "sécurité, vigilance citoyenne.",
    "Vocabulaire clé à maîtriser : sécurité, protection, institution de sécurité, consigne de sécurité.",
    "Avant l'évaluation, vérifie que tu peux : identifier une institution de sécurité et sa mission ; analyser " +
    "une consigne de sécurité ; expliquer ton propre rôle citoyen face à un risque quotidien.",
    "Rappel officiel : l'évaluation attendue pour cette unité prend la forme d'un portfolio d'extraits de " +
    "presse sur la paix, la protection et la sécurité [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : sécurité · " +
  "protection · institution · risque · consigne.",
  { italics: true },
));
children.push(numberedPar("1. L'état dans lequel une personne est protégée contre un danger s'appelle la ......................"));
children.push(numberedPar("2. Un organisme officiel chargé de protéger les citoyens est une ......................"));
children.push(numberedPar("3. La possibilité qu'un événement dangereux se produise s'appelle un ......................"));
children.push(numberedPar("4. Une instruction précise à suivre pour éviter un danger s'appelle une ......................"));
children.push(numberedPar("5. L'ensemble des mesures prises pour préserver la sécurité d'un groupe s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Associe chaque institution à sa mission principale : (a) Police Nationale d'Haïti, (b) Direction de la Protection Civile — avec : (1) préparer et répondre aux risques naturels, (2) maintenir l'ordre public."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « La sécurité ne concerne que les adultes, pas les élèves de 7e AF. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Analyse cette consigne : « En cas de tremblement de terre, éloigne-toi des fenêtres et abrite-toi sous une table solide. » Identifie le danger, l'action et, si possible, la personne à prévenir."));
children.push(numberedPar("2. Explique pourquoi la sécurité est décrite comme une responsabilité à la fois individuelle et collective."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas de l'attroupement dans le quartier. Rédige, en quelques phrases, ce que tu ferais et pourquoi."));
children.push(numberedPar("2. Propose une consigne de sécurité originale, utile pour ton école, en respectant les trois éléments étudiés (danger, action, personne à prévenir)."));
children.push(numberedPar("3. Un camarade affirme : « La sécurité, c'est uniquement le travail de la police. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-7AF-C06-04",
  "Synthèse — Paix, protection et sécurité au quotidien",
  "Une carte mentale simple centrée sur « Sécurité », avec des branches vers : sécurité individuelle/" +
  "collective, institutions de sécurité, consignes de sécurité, rôle du citoyen, portfolio de presse.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 49, "Manuel_EC_7AF_Chapitre6.docx");
