// Manuel d'EC 8e AF — Chapitre 3 : La séparation des pouvoirs
// (Unité 3 — Savoir être et agir en citoyenne et citoyen d'un État
// démocratique, Compétences C1, C2, C3).
//
// Prolonge les Chapitres 1-2 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 20 (Chapitre 1 = pages 1-9,
// Chapitre 2 = pages 10-19).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.35-36 : Unité 3, colonne 8e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "Le
//     fonctionnement d'un État démocratique : la séparation des pouvoirs.
//     Participation aux activités de renforcement de la démocratie dans la
//     communauté." La séparation des pouvoirs est explicitement identifiée
//     comme « notion technique nouvelle » de la colonne 8e AF (pas de
//     répétition avec la 7e AF sur ce point).
//   - `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md` (verrouillée sans changement
//     dans `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`) : situation de départ
//     "un schéma simple des trois pouvoirs de l'État haïtien" ; activité
//     "recherche sur le rôle de chaque pouvoir".
//
// PROGRESSION RÉELLE 7e/Chapitres 1-2 → CHAPITRE 3 (section 4 du prompt) :
// le Chapitre 3 de 7e AF (déjà finalisé, NON modifié ici) a construit le
// fonctionnement GÉNÉRAL d'un État démocratique (pouvoir confié pour un
// temps, élection, coopérative de classe) SANS détailler la séparation des
// pouvoirs. Ce chapitre reprend ce socle comme acquis (rappel bref,
// section 3.1) pour introduire, pour la première fois dans la collection,
// la structure technique des trois pouvoirs de l'État haïtien — un contenu
// réellement nouveau, conformément à la matrice de progression. Il ne
// reprend pas non plus le contenu des Chapitres 1-2 de 8e AF (comparaison
// caribéenne, droits économiques/sociaux).
//
// NEUTRALITÉ (section 9 du prompt) : la séparation des pouvoirs est
// présentée comme un principe constitutionnel structurel et universel du
// fonctionnement démocratique, jamais en lien avec un gouvernement, un
// parti ou une période politique précise. La structure des trois pouvoirs
// de l'État haïtien (exécutif, législatif, judiciaire) est une
// connaissance civique générale [ADAPTATION PÉDAGOGIQUE], présentée de
// façon simplifiée et non partisane, adaptée au niveau 8e AF — aucune
// institution précise n'est citée nommément (aucun nom de personne, de
// parti ou de mandat), seule la structure constitutionnelle est décrite.
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
  "La séparation des pouvoirs",
  "Imagine une seule personne qui écrirait les règles, déciderait de les appliquer, et jugerait aussi les " +
  "désaccords qui en découlent. Rien ne l'obligerait à être juste. C'est pour éviter cela qu'un État " +
  "démocratique répartit son pouvoir entre plusieurs institutions distinctes. Ce chapitre t'explique comment " +
  "et pourquoi.",
  [
    "Expliquer pourquoi un État démocratique sépare ses pouvoirs.",
    "Identifier les trois pouvoirs de l'État haïtien et leur rôle respectif.",
    "Analyser une situation concrète mettant en jeu les trois pouvoirs.",
    "Réaliser une recherche sur le rôle de chaque pouvoir.",
    "Participer à des activités de renforcement de la démocratie dans sa communauté.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un schéma à compléter",
  [
    "En cours d'EC, un(e) enseignant(e) dessine un schéma vide avec trois cases reliées, sans les remplir : « " +
    "Devinez ce que représentent ces trois cases dans le fonctionnement de l'État. » Une élève propose : « " +
    "Peut-être que ce sont trois façons différentes de gouverner, séparées exprès ? » Ce chapitre te permet de " +
    "compléter ce schéma toi-même, en comprenant pourquoi cette séparation existe.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e AF et Chapitres 1-2 de 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris le fonctionnement général d'un État démocratique : le pouvoir y est confié pour un " +
  "temps à des représentants choisis. Ce chapitre ne redéveloppe pas cette base : il l'utilise pour expliquer " +
  "comment ce pouvoir est, en plus, réparti entre plusieurs institutions distinctes — un contenu entièrement " +
  "nouveau à ce stade de la collection.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Séparation des pouvoirs — principe selon lequel le pouvoir de l'État est réparti entre plusieurs institutions distinctes, afin qu'aucune ne puisse décider seule de tout."));
children.push(bulletPar("Pouvoir exécutif — pouvoir chargé de diriger le pays et de mettre en œuvre les lois au quotidien."));
children.push(bulletPar("Pouvoir législatif — pouvoir chargé de proposer, discuter et voter les lois."));
children.push(bulletPar("Pouvoir judiciaire — pouvoir chargé d'appliquer la loi et de trancher les désaccords devant les tribunaux."));
children.push(bulletPar("Équilibre des pouvoirs — situation dans laquelle chaque pouvoir peut, dans une certaine mesure, contrôler ou limiter les autres, pour éviter les abus."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Pourquoi séparer les pouvoirs ?", "3.1"));
children.push(bodyPar(
  "Si une seule personne ou un seul groupe détenait tout le pouvoir — décider des règles, les appliquer, et " +
  "juger les désaccords — rien ne garantirait que ce pouvoir soit exercé de façon juste. La séparation des " +
  "pouvoirs répond à ce risque : elle répartit les grandes fonctions de l'État entre plusieurs institutions " +
  "distinctes, qui se contrôlent mutuellement.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Le risque d'un pouvoir concentré",
  [
    "Un pouvoir concentré (détenu par une seule personne ou un seul groupe, sans contrôle) risque de favoriser " +
    "des décisions injustes, sans possibilité réelle de les contester.",
    "La séparation des pouvoirs ne rend pas le désaccord impossible : elle prévoit des institutions distinctes " +
    "pour créer les règles, les appliquer et trancher les litiges, ce qui limite les abus.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C03-01",
  "Ouverture — Le schéma des trois pouvoirs à compléter",
  "Un schéma pédagogique avec trois cases vides reliées par des flèches, dans une salle de classe haïtienne, " +
  "prêt à être complété par les élèves, cohérent avec la charte EC.",
  "Un schéma à compléter engage activement l'élève dans la découverte de la séparation des pouvoirs.",
  "Ancrer l'ouverture du chapitre dans une activité de classe concrète.",
  "Illustration pleine largeur, schéma pédagogique en classe, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les trois pouvoirs de l'État haïtien", "3.2"));
children.push(bodyPar(
  "Comme dans de nombreux États démocratiques, le pouvoir de l'État haïtien est réparti entre trois grandes " +
  "institutions, chacune avec une fonction propre.",
));
children.push(threeColTable(
  ["Pouvoir", "Fonction principale", "Ce qu'il fait concrètement"],
  [
    ["Exécutif", "Diriger le pays et appliquer les lois au quotidien", "Gérer l'administration, mettre en œuvre les politiques publiques"],
    ["Législatif", "Proposer, discuter et voter les lois", "Débattre et adopter de nouveaux textes de loi"],
    ["Judiciaire", "Appliquer la loi et trancher les désaccords", "Juger les litiges devant les tribunaux"],
  ],
  [2200, 3800, 3400],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette présentation reste volontairement générale et simplifiée, adaptée au niveau 8e AF : elle vise à " +
  "comprendre le principe de séparation, pas à détailler l'ensemble des institutions précises de chaque " +
  "pouvoir.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C03-02",
  "Exemple analysé — les trois pouvoirs et leurs liens",
  "Un schéma en triangle reliant les trois pouvoirs (exécutif, législatif, judiciaire) par des flèches " +
  "doubles symbolisant le contrôle mutuel, avec des pictogrammes simples pour chaque pouvoir, cohérent avec " +
  "la charte EC.",
  "Les trois pouvoirs ne sont pas isolés : ils se contrôlent mutuellement.",
  "Donner une référence visuelle claire et mémorisable de la séparation des pouvoirs.",
  "Illustration demi-page, schéma en triangle, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les trois pouvoirs en action : un exemple concret", "3.3"));
children.push(bodyPar(
  "Pour bien comprendre comment les trois pouvoirs interviennent réellement, suivons un exemple simple et " +
  "neutre : l'adoption d'une règle de sécurité routière près des écoles.",
));
children.push(calloutBox(
  "ÉTUDE DE CAS — Une nouvelle règle de sécurité routière",
  [
    "1. Le pouvoir législatif propose et adopte une règle imposant une limite de vitesse réduite près des " +
    "écoles.",
    "2. Le pouvoir exécutif organise l'application de cette règle : installation de panneaux, information du " +
    "public, contrôles.",
    "3. Un conducteur conteste une amende reçue pour non-respect de cette règle : le pouvoir judiciaire " +
    "examine le désaccord et tranche, en s'appuyant sur la règle adoptée.",
    "Questions : (a) Que se passerait-il si la même institution décidait la règle, l'appliquait et jugeait " +
    "elle-même les désaccords, sans aucune séparation ? (b) En quoi cette séparation protège-t-elle à la fois " +
    "le conducteur et l'intérêt collectif de sécurité ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — La séparation des pouvoirs ralentit-elle trop les décisions ?",
  [
    "Certains pensent que séparer les pouvoirs ralentit les décisions et complique l'action de l'État. " +
    "D'autres pensent que cette lenteur relative est le prix nécessaire pour éviter les abus.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Participer au renforcement de la démocratie dans sa communauté", "3.4"));
children.push(bodyPar(
  "Au-delà des trois pouvoirs de l'État central, la démocratie se vit aussi à l'échelle locale. En Haïti, des " +
  "structures locales existent pour organiser la participation citoyenne à ce niveau — par exemple des " +
  "conseils ou comités au niveau de la section communale ou de la commune, où les habitants peuvent, selon " +
  "les cas, s'informer, participer à des réunions ou faire remonter des besoins locaux.",
));
children.push(calloutBox(
  "DÉCOUVRIR — La démocratie à l'échelle locale [ADAPTATION PÉDAGOGIQUE]",
  [
    "Assister à une réunion communautaire locale, quand elle est ouverte au public.",
    "S'informer sur les décisions qui concernent directement son quartier ou sa section communale.",
    "Participer à une action collective organisée localement (nettoyage, sensibilisation, projet commun).",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Activité citoyenne — Recherche sur le rôle de chaque pouvoir"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Réaliser une recherche sur le rôle de l'un des trois pouvoirs de l'État haïtien. [OFFICIEL — " +
    "activité prévue par le programme]",
    "CONSIGNES : Choisis un pouvoir (exécutif, législatif ou judiciaire). Avec l'aide d'un adulte, d'un(e) " +
    "enseignant(e) ou d'une source fiable, identifie une mission concrète de ce pouvoir.",
    "ÉTAPES : 1. Choisir le pouvoir. 2. Identifier sa fonction principale. 3. Trouver un exemple concret de ce " +
    "que fait ce pouvoir. 4. Présenter le résultat à la classe.",
    "RÉSULTAT ATTENDU : Une fiche courte expliquant, avec un exemple concret, le rôle du pouvoir choisi.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — S'informer sur une structure locale de participation"));
children.push(calloutBox(
  "PROJET",
  [
    "OBJECTIF : Identifier une structure locale de participation citoyenne dans ta section communale ou ta " +
    "commune (conseil, comité, réunion communautaire).",
    "ÉTAPES : 1. Se renseigner, avec l'aide d'un adulte, sur l'existence d'une telle structure près de chez " +
    "toi. 2. Noter son rôle général. 3. Réfléchir à une façon dont un jeune citoyen pourrait, un jour, s'y " +
    "informer ou y participer.",
    "Ce projet applique, à l'échelle locale, le principe de participation démocratique déjà rencontré en 7e " +
    "AF à l'échelle de la classe.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C03-03",
  "Espace de production — ma fiche sur un pouvoir de l'État",
  "Un cadre vide, format portrait, structuré en trois zones (pouvoir choisi / fonction principale / exemple " +
  "concret), prévu pour que l'élève y consigne directement sa recherche.",
  "Offrir un espace direct de production pour ancrer la recherche sur le rôle d'un pouvoir.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, trois zones délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La séparation des pouvoirs répartit le pouvoir de l'État entre plusieurs institutions distinctes, pour " +
    "éviter qu'une seule ne décide, applique et juge sans aucun contrôle.",
    "L'État haïtien répartit son pouvoir en trois grandes fonctions : exécutif, législatif et judiciaire.",
    "Ces trois pouvoirs interviennent souvent ensemble, à des étapes différentes, dans une même situation " +
    "concrète.",
    "La démocratie se vit aussi à l'échelle locale, à travers des structures de participation communautaire.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de comprendre pourquoi un État démocratique sépare ses pouvoirs, d'identifier les " +
  "trois pouvoirs de l'État haïtien (exécutif, législatif, judiciaire) et leur rôle respectif à travers un " +
  "exemple concret, et de réfléchir à la participation citoyenne à l'échelle locale — une notion technique " +
  "entièrement nouvelle par rapport à la 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "séparation des pouvoirs · pouvoir exécutif · pouvoir législatif · pouvoir judiciaire · équilibre des " +
  "pouvoirs.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer pourquoi un État démocratique sépare ses pouvoirs.",
    "☐ Nommer les trois pouvoirs de l'État haïtien et leur fonction principale.",
    "☐ Analyser une situation concrète en identifiant l'intervention de chaque pouvoir.",
    "☐ Citer une façon de participer à la démocratie à l'échelle locale.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : séparation des pouvoirs, pouvoir exécutif, pouvoir législatif, pouvoir judiciaire, " +
    "équilibre des pouvoirs.",
    "Vocabulaire clé à maîtriser : séparation des pouvoirs, pouvoir exécutif, pouvoir législatif, pouvoir " +
    "judiciaire.",
    "Avant l'évaluation, vérifie que tu peux : expliquer le principe de séparation des pouvoirs ; associer " +
    "chaque pouvoir à sa fonction ; analyser un exemple concret impliquant les trois pouvoirs.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec la structure officielle full-cycle sur " +
    "le fonctionnement démocratique, adaptée ici à la notion technique de séparation des pouvoirs [OFFICIEL, " +
    "adapté au niveau 8e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : pouvoir " +
  "exécutif · pouvoir législatif · pouvoir judiciaire · séparation des pouvoirs · équilibre des pouvoirs.",
  { italics: true },
));
children.push(numberedPar("1. Le pouvoir chargé de proposer et voter les lois s'appelle le ......................"));
children.push(numberedPar("2. Le pouvoir chargé de diriger le pays et d'appliquer les lois au quotidien s'appelle le ......................"));
children.push(numberedPar("3. Le pouvoir chargé de trancher les désaccords devant les tribunaux s'appelle le ......................"));
children.push(numberedPar("4. Le principe qui répartit le pouvoir de l'État entre plusieurs institutions distinctes s'appelle la ......................"));
children.push(numberedPar("5. La situation dans laquelle chaque pouvoir peut contrôler les autres s'appelle l'......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Associe chaque action à son pouvoir : (a) voter une nouvelle loi, (b) juger un litige, (c) appliquer une loi déjà adoptée — avec : (1) pouvoir exécutif, (2) pouvoir législatif, (3) pouvoir judiciaire."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Dans un État démocratique, il est préférable qu'un seul pouvoir contrôle tout, pour aller plus vite. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec l'exemple de la règle de sécurité routière étudiée dans ce chapitre, comment les trois pouvoirs interviennent à des étapes différentes."));
children.push(numberedPar("2. Pourquoi dit-on que la séparation des pouvoirs limite les abus, même si elle peut ralentir certaines décisions ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Imagine une situation scolaire où une seule personne déciderait des règles, les appliquerait et jugerait elle-même les sanctions. Quels problèmes cela pourrait-il poser ? Propose une meilleure organisation, inspirée de la séparation des pouvoirs."));
children.push(numberedPar("2. Présente, en quelques phrases, le rôle d'un des trois pouvoirs de l'État haïtien, à partir de ta recherche."));
children.push(numberedPar("3. Un camarade affirme : « La séparation des pouvoirs, ça ne sert à rien si tout le monde est honnête. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-8AF-C03-04",
  "Synthèse — La séparation des pouvoirs",
  "Une carte mentale simple centrée sur « Séparation des pouvoirs », avec des branches vers : pouvoir " +
  "exécutif, pouvoir législatif, pouvoir judiciaire, équilibre des pouvoirs, participation locale.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 20, "Manuel_EC_8AF_Chapitre3.docx");
