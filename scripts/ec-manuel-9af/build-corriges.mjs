// Manuel d'EC 9e AF — Phase Finale : Corrigés des exercices ET des
// mini-évaluations (Chapitres 1-7).
//
// Chaque réponse correspond exactement à une consigne existante dans les
// scripts build-chapitre1.mjs à build-chapitre7.mjs (relus intégralement
// avant rédaction de ce fichier). Aucun exercice inventé. Pour les
// questions ouvertes, ce corrigé fournit des éléments de réponse attendus /
// critères, pas une formulation unique obligatoire. Section 1 couvre les
// exercices ordinaires (A-D) et les blocs "Entraînement type examen" ;
// Section 2 couvre les mini-évaluations "Préparation à l'examen officiel"
// de chaque chapitre — conformément aux sections 3 et 4 du Prompt Maître
// Phase Finale.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE, OR_CITOYEN, ANTHRACITE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Corrigés des exercices et des mini-évaluations", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(bodyPar(
  "Ce corrigé couvre l'ensemble des exercices ordinaires (A-D), des blocs « Entraînement type examen » et des " +
  "mini-évaluations « Préparation à l'examen officiel de 9e AF » des 7 chapitres du Manuel d'EC 9e AF. Pour " +
  "les questions fermées (QCM, vrai/faux, classement), la réponse exacte est fournie, avec justification " +
  "lorsqu'utile. Pour les questions ouvertes (argumentation, analyse, proposition d'action), des éléments de " +
  "réponse attendus sont fournis à titre de repère pédagogique — d'autres formulations correctes et bien " +
  "justifiées par l'élève restent acceptables.",
  { italics: true },
));
children.push(spacer(240));

function chapterCorrige(num, titre) {
  children.push(pageBreak());
  children.push(sectionHeading(`Chapitre ${num} — ${titre}`, ""));
}
function exoHeading(label) { children.push(subHeading(label)); }
function rep(text) { children.push(numberedPar(text)); }

// =======================================================================
children.push(new Paragraph({
  spacing: { after: 240 },
  children: [new TextRun({ text: "Section 1 — Corrigés des exercices", bold: true, color: BLEU_CIVIQUE, size: 32 })],
}));

// ---- Chapitre 1 --------------------------------------------------------
chapterCorrige(1, "Citoyenne, citoyen du monde");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. citoyenneté mondiale");
rep("2. patrimoine mondial");
rep("3. engagement universel");
rep("4. synthèse");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Échelle nationale (7e AF), échelle régionale/caribéenne (8e AF), échelle mondiale (9e AF).");
rep("2. Faux. La citoyenneté mondiale s'ajoute à la citoyenneté nationale et la complète, elle ne la remplace pas.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Le Parc national historique (Citadelle, Sans-Souci, Ramiers) est reconnu comme ayant une valeur exceptionnelle pour l'humanité entière, au-delà du seul territoire haïtien — c'est précisément ce que signifie « patrimoine mondial ».");
rep("2. Réponse ouverte : par exemple s'informer sur un enjeu humanitaire international, participer à une collecte de solidarité mondiale, ou relier une action locale (entraide, reboisement) à une valeur reconnue universellement.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Ce qui change : l'échelle (quartier vs site reconnu mondialement) et la nature de la reconnaissance (locale vs internationale). Ce qui reste identique : le principe de responsabilité citoyenne envers un bien qui dépasse le seul intérêt personnel.");
rep("2. Réponse ouverte, cohérente avec le glossaire des trois années — synthèse de trois mots essentiels, chacun justifié.");
rep("3. Réponse attendue : la citoyenneté mondiale se manifeste par des actions concrètes et accessibles (s'informer, relier une action locale à une valeur universelle), pas seulement par un concept abstrait — le chapitre en donne des exemples précis et réalisables.");
children.push(spacer(160));

exoHeading("Entraînement type examen A — QCM de reconnaissance");
rep("1. (c) l'humanité entière");
rep("2. (b) le Parc national historique (Citadelle, Sans-Souci, Ramiers)");
rep("3. (b) s'engager pour des valeurs importantes pour toute l'humanité, en plus de sa citoyenneté nationale");
rep("4. (b) la dignité humaine");
rep("5. (b) les trois années du cycle");
children.push(spacer(160));

exoHeading("Entraînement type examen B — Justification courte (éléments de réponse attendus)");
rep("1. Le site est physiquement situé en Haïti (intérêt haïtien direct) mais sa valeur est reconnue comme exceptionnelle pour l'humanité entière (intérêt mondial) — sa préservation profite donc à la fois aux Haïtiens et au reste du monde.");
children.push(spacer(240));

// ---- Chapitre 2 --------------------------------------------------------
chapterCorrige(2, "Citoyen et citoyenneté, ici et dans le monde");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. citoyenneté légale");
rep("2. citoyenneté active");
rep("3. éthique citoyenne");
rep("4. communauté mondiale");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Citoyenneté légale : droit de vote, nationalité. Citoyenneté active : une action de solidarité internationale, participer à une réunion communautaire.");
rep("2. Faux. Les droits fondamentaux (Constitution, DUDH) relient les deux échelles, et la même éthique citoyenne s'applique aux deux — il existe donc un lien réel entre elles.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Réponse ouverte avec exemple personnel, distinguant le statut légal (ex. une carte d'identité, la nationalité) de l'engagement actif (ex. participer à une collecte de solidarité).");
rep("2. Parce que la DUDH est appliquée concrètement par des États précis (portée nationale), mais qu'elle a été adoptée comme texte international, reconnu comme un socle commun à l'humanité entière (portée mondiale).");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Les deux actions relèvent du même principe de responsabilité envers autrui (respect, solidarité), qu'il s'agisse d'un camarade de classe ou d'une cause humanitaire internationale.");
rep("2. Réponse ouverte, tableau comparatif complété avec un exemple personnel cohérent pour chaque ligne (statut légal, droit de vote, devoirs, engagement).");
rep("3. Réponse attendue : la citoyenneté active (engagement réel) peut exister même sans statut légal correspondant, par exemple à l'échelle mondiale — la seule nationalité ne suffit donc pas à définir complètement ce que signifie être citoyen.");
children.push(spacer(160));

exoHeading("Entraînement type examen A — QCM sur les devoirs du citoyen");
rep("1. (b) un devoir du citoyen");
rep("2. (a) un statut reconnu par la loi");
rep("3. (b) contribuer, selon les règles établies, au fonctionnement du pays");
children.push(spacer(160));

exoHeading("Entraînement type examen B — Mise en relation de concepts");
rep("1. (a) nationalité haïtienne → (1) citoyenneté légale ; (b) collecte de solidarité internationale → (2) citoyenneté active mondiale ; (c) voter à une élection → (3) citoyenneté légale et active à la fois.");
children.push(spacer(240));

// ---- Chapitre 3 --------------------------------------------------------
chapterCorrige(3, "La loi, l'impôt et la solidarité nationale");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. loi");
rep("2. impôt");
rep("3. redistribution");
rep("4. solidarité nationale");
rep("5. État de droit");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. D'après le Texte documentaire A : aucun citoyen ne pourrait financer seul des services qui profitent à tout le monde en même temps (route, école, hôpital) ; l'impôt permet de mettre en commun les contributions et de les redistribuer pour financer ces services partagés.");
rep("2. Faux. D'après le Texte documentaire B, la réparation de la route a amélioré l'accès au marché pour l'ensemble de la population locale, pas seulement pour les commerçants directement concernés.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Rôle financier : financer directement les services publics (écoles, routes, hôpitaux). Rôle social : réduire les écarts entre citoyens par la redistribution (aide aux zones ou familles les plus vulnérables).");
rep("2. Parce que l'État de droit signifie que l'État lui-même est soumis à la loi, au même titre que les citoyens — il doit respecter les mêmes règles qu'il impose.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Réponse ouverte structurée : refuser de contribuer prive la collectivité de ressources nécessaires aux services partagés (Texte A), affaiblit la solidarité nationale et peut compromettre des projets bénéfiques à tous, comme la route du Texte B.");
rep("2. Réponse ouverte : calcul simple et juste, accompagné d'une explication reliant le résultat au principe de redistribution (une contribution modeste par personne peut financer un projet collectif important).");
rep("3. Réponse attendue : la redistribution profite à la collectivité dans son ensemble (services publics accessibles à tous), même si un contributeur individuel n'en perçoit pas toujours un bénéfice direct et immédiat — la solidarité nationale ne se mesure pas au bénéfice individuel seul.");
children.push(spacer(160));

exoHeading("Entraînement type examen A — Compréhension de texte documentaire");
rep("1. Parce que ces services profitent à tout le monde en même temps et sont trop coûteux pour qu'une seule personne les finance seule (Texte documentaire A).");
rep("2. L'accès au marché s'est nettement amélioré pour l'ensemble de la population locale, réduisant les pertes de temps et de marchandises subies par les commerçants (Texte documentaire B).");
rep("3. Texte A : rôle financier (financer des services partagés que personne ne pourrait financer seul). Texte B : rôle social et économique (amélioration concrète de l'accès au marché pour l'ensemble de la population).");
children.push(spacer(160));

exoHeading("Entraînement type examen B — Justification courte (éléments de réponse attendus)");
rep("1. Contribuer à l'impôt profite à l'ensemble de la collectivité par la redistribution (services publics partagés), ce qui dépasse la simple obligation légale et relève aussi d'un choix de solidarité envers les autres citoyens.");
children.push(spacer(240));

// ---- Chapitre 4 --------------------------------------------------------
chapterCorrige(4, "Vers une société inclusive");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. société inclusive");
rep("2. protection sociale");
rep("3. discrimination");
rep("4. inégalité sociale");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Discrimination liée au genre, école non inclusive, accès limité aux soins.");
rep("2. Faux. Une école devient inclusive par son organisation et son attention réelle aux besoins de chaque élève, pas uniquement par ses moyens financiers.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. L'exclusion involontaire (cas de l'étude) résulte d'un manque de moyens ou d'anticipation, sans intention négative ; la discrimination volontaire suppose un traitement défavorable intentionnel envers une personne en raison d'une caractéristique.");
rep("2. Parce que la protection sociale est souvent financée, en partie, par les recettes de l'impôt redistribuées (mécanisme étudié au Chapitre 3), pour aider les citoyens face aux difficultés de la vie.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Réponse ouverte, modeste et réaliste à court terme (ex. aide humaine temporaire, matériel simple, adaptation partielle en attendant des moyens plus importants).");
rep("2. Réponse ouverte : reprise et présentation des deux actions citoyennes argumentées rédigées dans le Projet de ce chapitre.");
rep("3. Réponse attendue : les inégalités sociales concernent aussi les citoyens eux-mêmes (signaler, s'engager, proposer des actions), même si l'État a un rôle central — ce n'est donc pas uniquement l'affaire du gouvernement.");
children.push(spacer(160));

exoHeading("Entraînement type examen A — Classement d'attitudes");
rep("1. (a) signaler poliment un manque d'accessibilité → citoyen(ne) engagé(e) ; (b) se moquer d'un élève en difficulté → citoyen(ne) irresponsable ; (c) proposer son aide à un camarade en difficulté → citoyen(ne) engagé(e).");
children.push(spacer(160));

exoHeading("Entraînement type examen B — Proposition de deux actions argumentées");
rep("1. Réponse ouverte : deux actions citoyennes distinctes et justifiées, portant sur une inégalité sociale différente de celle traitée dans le Projet du chapitre, adressées de façon respectueuse et réaliste à l'État.");
children.push(spacer(240));

// ---- Chapitre 5 --------------------------------------------------------
chapterCorrige(5, "Résoudre les conflits, connaître la justice");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. cour de cassation");
rep("2. institution chargée de faire respecter la loi");
rep("3. affaire simplifiée");
rep("4. résolution de conflit maîtrisée");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Ordre correct : dialogue et négociation → argumentaire structuré → recours institutionnel.");
rep("2. Faux. La cour de cassation vérifie la bonne application de la loi par les tribunaux inférieurs ; elle ne rejuge pas entièrement les faits d'une affaire.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Une institution judiciaire (tribunal) tranche les litiges et rend des décisions ; une institution chargée de faire respecter la loi appuie l'application de ces décisions et le respect de la loi au quotidien.");
rep("2. Parce qu'une affaire simplifiée présente une situation avant tout jugement ; la présomption d'innocence protège la personne accusée de tout jugement anticipé de la part de la classe ou des autres élèves.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Réponse ouverte : un recours institutionnel devient nécessaire quand le dialogue et l'argumentaire structuré n'ont pas permis de résoudre le désaccord, malgré des tentatives sérieuses.");
rep("2. Réponse ouverte : présentation de l'affaire fictive du Projet, en expliquant concrètement comment la présomption d'innocence a été respectée (faits présentés neutralement, pas de coupable désigné à l'avance).");
rep("3. Réponse attendue : la démarche maîtrisée recommande d'essayer d'abord le dialogue, puis l'argumentaire structuré, avant d'envisager un recours institutionnel — aller directement voir la justice n'est donc pas toujours l'étape la plus appropriée.");
children.push(spacer(160));

exoHeading("Entraînement type examen A — Jugement raisonné");
rep("1. (a) proposer une médiation avant tout recours à la justice → favorise ; (b) inciter d'autres personnes à réagir violemment → dessert ; (c) respecter la présomption d'innocence même en cas de forte suspicion → favorise.");
children.push(spacer(160));

exoHeading("Entraînement type examen B — Analyse de situation (éléments de réponse attendus)");
rep("1. La communauté doit s'abstenir de tout jugement ou traitement défavorable envers la personne accusée tant que sa culpabilité n'a pas été prouvée par la justice — la présomption d'innocence s'applique même en cas de forte suspicion.");
children.push(spacer(240));

// ---- Chapitre 6 --------------------------------------------------------
chapterCorrige(6, "Sécurité nationale et coopération internationale");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. défense du territoire");
rep("2. légitimité institutionnelle");
rep("3. redevabilité");
rep("4. coopération internationale");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Protection de la population, maintien de l'ordre public, réponse aux situations d'urgence.");
rep("2. Faux. La redevabilité (rendre compte de ses actions) est justement l'un des trois critères qui distingue une institution légitime d'un groupe hors-la-loi ; un groupe qui n'en rend à personne ne peut pas être considéré comme légitime.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Une institution légitime réunit un mandat légal reconnu, un encadrement par la loi et une redevabilité ; un groupe hors-la-loi ne réunit pas ces trois critères.");
rep("2. Parce qu'elle apporte un appui complémentaire (expertise, ressources, coordination) que les institutions nationales seules ne possèdent pas toujours, en particulier lors de situations d'urgence comme une catastrophe naturelle.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Le Groupe B est légitime : il agit dans le cadre d'un mandat légal reconnu, respecte des règles précises et peut être contrôlé (les trois critères sont réunis). Le Groupe A ne l'est pas : il ne rend de comptes à aucune autorité et n'a reçu aucun mandat légal (aucun critère n'est réuni).");
rep("2. Réponse ouverte : présentation d'une fiche factuelle et respectueuse sur une mission réelle d'une institution de sécurité haïtienne (par exemple la Police Nationale d'Haïti).");
rep("3. Réponse attendue : non, toutes les organisations ne se valent pas — seules celles qui réunissent les trois critères (mandat légal, encadrement par la loi, redevabilité) peuvent être considérées comme légitimes.");
children.push(spacer(160));

exoHeading("Entraînement type examen A — QCM sur les institutions de sécurité");
rep("1. (a) d'un mandat légal reconnu");
rep("2. (b) hors du cadre légal");
rep("3. (b) des institutions internationales et des ONG");
children.push(spacer(240));

// ---- Chapitre 7 --------------------------------------------------------
chapterCorrige(7, "Développement durable et coopération internationale");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. développement durable");
rep("2. coopération internationale");
rep("3. institution internationale");
rep("4. ONG environnementale");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Échelle locale (7e AF), échelle nationale (8e AF), échelle internationale (9e AF).");
rep("2. Faux. Beaucoup de projets de développement durable réussissent mieux en combinant engagement local et appui international, comme l'illustre l'exemple du projet de gestion de l'eau étudié dans ce chapitre.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. La communauté locale s'engage concrètement dans le projet (habitants, autorités locales), tandis que la coopération internationale apporte un financement et un appui technique — les deux niveaux se complètent, aucun ne suffit seul.");
rep("2. Parce que ces défis (déforestation à grande échelle, changements climatiques) dépassent les frontières d'un seul pays et nécessitent une coordination et des ressources partagées entre plusieurs pays ou organisations.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Réponse ouverte : bilan honnête reliant l'expérience concrète du cycle (projet de reboisement ou similaire) à la dimension internationale étudiée dans ce chapitre.");
rep("2. Réponse ouverte, cohérente avec un type d'appui international réaliste (technique, matériel ou financier).");
rep("3. Réponse attendue : les actions locales et l'échelle internationale se complètent — l'action locale reste utile et nécessaire, même si certains défis dépassent les frontières d'un seul pays.");
children.push(spacer(160));

exoHeading("Entraînement type examen A — Jugement raisonné");
rep("1. (a) participer à un projet communautaire de reboisement → favorable ; (b) ignorer les conséquences environnementales d'une décision locale → défavorable ; (c) coopérer avec un appui international pour un projet de gestion de l'eau → favorable.");
children.push(spacer(160));

exoHeading("Entraînement type examen B — Analyse de situation (éléments de réponse attendus)");
rep("1. La combinaison des deux échelles permet de bénéficier à la fois de la connaissance du terrain et de l'engagement des habitants (niveau local) et de ressources ou d'une expertise supplémentaires (niveau international), ce qui augmente les chances de réussite par rapport à un seul niveau agissant isolément.");
children.push(spacer(280));

// =======================================================================
children.push(pageBreak());
children.push(new Paragraph({
  spacing: { after: 240 },
  children: [new TextRun({ text: "Section 2 — Corrigés des mini-évaluations", bold: true, color: BLEU_CIVIQUE, size: 32 })],
}));
children.push(bodyPar(
  "Corrigé de chaque mini-évaluation « Préparation à l'examen officiel de 9e AF » créée dans les chapitres. " +
  "Barème indicatif conservé tel qu'annoncé dans chaque chapitre (20 points).",
  { italics: true },
));
children.push(spacer(200));

// ---- Mini-éval Chapitre 1 ----------------------------------------------
chapterCorrige(1, "Mini-évaluation — Citoyenne, citoyen du monde (20 points)");
exoHeading("Partie I — QCM (10 points)");
rep("1. (a) Vrai");
rep("2. (b) patrimoine mondial");
rep("3. (b) valeurs universelles");
rep("4. (b) trois années");
rep("5. (b) régionale/caribéenne");
children.push(spacer(160));
exoHeading("Partie II — Classement d'attitudes (5 points)");
rep("(a) s'informer sur un enjeu humanitaire international → cohérente ; (b) refuser de connaître toute réalité en dehors de son quartier → incohérente ; (c) relier une action locale d'entraide à une valeur universelle → cohérente.");
children.push(spacer(160));
exoHeading("Partie III — Question ouverte courte (5 points, éléments attendus)");
rep("Reconnaître les trois échelles vécues sur le cycle (nation, région, monde), comprendre qu'elles s'emboîtent plutôt qu'elles ne s'opposent, et exprimer une réflexion personnelle sur sa place de citoyen(ne) haïtien(ne) aujourd'hui.");
children.push(spacer(240));

// ---- Mini-éval Chapitre 2 ----------------------------------------------
chapterCorrige(2, "Mini-évaluation — Citoyen et citoyenneté, ici et dans le monde (20 points)");
exoHeading("Partie I — QCM sur les devoirs du citoyen (8 points)");
rep("1. (b) un devoir civique");
rep("2. (b) un engagement concret dans la vie collective");
rep("3. (b) reconnu au niveau international");
rep("4. (c) aux deux échelles à la fois");
children.push(spacer(160));
exoHeading("Partie II — Mise en relation (6 points)");
rep("(a) respecter une loi nationale → citoyenneté légale ; (b) s'informer sur un enjeu humanitaire mondial → citoyenneté active ; (c) voter lors d'une élection → citoyenneté légale (exercice actif d'un droit formellement reconnu — réponse « les deux » également acceptée si bien justifiée).");
children.push(spacer(160));
exoHeading("Partie III — Justification courte (6 points, éléments attendus)");
rep("L'éthique citoyenne repose sur les mêmes principes de responsabilité envers autrui (respect, solidarité), qu'on agisse à l'échelle locale ou mondiale ; seule l'échelle d'application change, pas le principe lui-même.");
children.push(spacer(240));

// ---- Mini-éval Chapitre 3 ----------------------------------------------
chapterCorrige(3, "Mini-évaluation — La loi, l'impôt et la solidarité nationale (20 points)");
exoHeading("Partie I — Compréhension de texte documentaire, Texte C (10 points, éléments attendus)");
rep("1. Parce que les choix d'utilisation de l'impôt ne sont pas neutres : privilégier un domaine (éducation, santé, infrastructures) signifie souvent en financer un autre plus modestement, ce qui justifie un débat démocratique continu même après l'adoption de la loi fiscale.");
rep("2. Rôle économique, car le texte porte sur les choix d'orientation des recettes entre domaines (réponse « social » également acceptée si bien justifiée par référence à la répartition entre besoins collectifs).");
children.push(spacer(160));
exoHeading("Partie II — QCM sur les rôles de l'impôt (6 points)");
rep("1. (a) financier");
rep("2. (c) social");
rep("3. (b) de l'État de droit");
children.push(spacer(160));
exoHeading("Partie III — Justification courte (4 points, éléments attendus)");
rep("Une loi fiscale doit s'appliquer également à tous les citoyens pour respecter le principe d'égalité devant la loi ; une exception injustifiée romprait la légitimité démocratique de la loi.");
children.push(spacer(240));

// ---- Mini-éval Chapitre 4 ----------------------------------------------
chapterCorrige(4, "Mini-évaluation — Vers une société inclusive (20 points)");
exoHeading("Partie I — QCM (6 points)");
rep("1. (b) permet à chacun d'y prendre pleinement sa place");
rep("2. (b) aider les citoyens face aux difficultés de la vie");
rep("3. (b) engagée");
children.push(spacer(160));
exoHeading("Partie II — Classement d'attitudes (6 points)");
rep("(a) aider un camarade en situation de handicap à participer à une activité → citoyen(ne) engagé(e) ; (b) refuser catégoriquement toute discussion sur les inégalités → citoyen(ne) irresponsable ; (c) proposer une solution concrète face à un problème d'accès aux soins → citoyen(ne) engagé(e).");
children.push(spacer(160));
exoHeading("Partie III — Proposition de deux actions argumentées (8 points, éléments attendus)");
rep("Deux actions citoyennes distinctes, chacune clairement justifiée, adressées à l'État de façon réaliste et respectueuse, portant sur l'une des trois inégalités sociales étudiées (genre, éducation, santé).");
children.push(spacer(240));

// ---- Mini-éval Chapitre 5 ----------------------------------------------
chapterCorrige(5, "Mini-évaluation — Résoudre les conflits, connaître la justice (20 points)");
exoHeading("Partie I — QCM (8 points)");
rep("1. (b) vérifier la bonne application de la loi");
rep("2. (b) appuyer l'application de la loi et des décisions de justice");
rep("3. (b) tenter le dialogue et la négociation");
rep("4. (b) tant que la culpabilité n'est pas prouvée");
children.push(spacer(160));
exoHeading("Partie II — Jugement raisonné (6 points)");
rep("(a) accuser publiquement une personne avant tout jugement → dessert ; (b) proposer un dialogue structuré avant un recours institutionnel → favorise ; (c) respecter une décision de justice même en désaccord → favorise.");
children.push(spacer(160));
exoHeading("Partie III — Analyse de situation (6 points, éléments attendus)");
rep("Application ordonnée de la démarche maîtrisée à la situation entre camarades : tenter d'abord le dialogue, puis structurer un argumentaire si le désaccord persiste, et n'envisager un recours institutionnel (médiation d'un adulte, par exemple) qu'en dernier ressort.");
children.push(spacer(240));

// ---- Mini-éval Chapitre 6 ----------------------------------------------
chapterCorrige(6, "Mini-évaluation — Sécurité nationale et coopération internationale (20 points)");
exoHeading("Partie I — QCM (8 points)");
rep("1. (b) défense du territoire");
rep("2. (b) rendre compte de ses actions");
rep("3. (b) une organisation indépendante des États");
rep("4. (b) la coopération internationale");
children.push(spacer(160));
exoHeading("Partie II — Analyse de situation (7 points, éléments attendus)");
rep("Ce groupe ne réunit aucun des trois critères de légitimité (pas de mandat légal, pas d'encadrement par la loi, aucune redevabilité) ; il ne peut donc pas être considéré comme une institution de sécurité légitime, même s'il prétend protéger le quartier.");
children.push(spacer(160));
exoHeading("Partie III — Justification courte (5 points, éléments attendus)");
rep("La coopération internationale apporte des ressources et une expertise complémentaires (par exemple lors d'une catastrophe naturelle), mais elle ne remplace pas la responsabilité première des institutions nationales sur leur propre territoire — elle vient en appui, pas en substitution.");
children.push(spacer(240));

// ---- Mini-éval Chapitre 7 ----------------------------------------------
chapterCorrige(7, "Mini-évaluation — Développement durable et coopération internationale (20 points)");
exoHeading("Partie I — QCM (8 points)");
rep("1. (b) sans compromettre les générations futures");
rep("2. (b) son indépendance et son action pour l'environnement");
rep("3. (b) plusieurs pays, institutions ou ONG");
rep("4. (b) une complémentarité entre échelles");
children.push(spacer(160));
exoHeading("Partie II — Jugement raisonné (6 points)");
rep("(a) accepter un appui technique international pour un projet local respectueux de l'environnement → favorable ; (b) exploiter une ressource sans se soucier de sa régénération → défavorable ; (c) partager les bénéfices d'un projet environnemental avec toute la communauté → favorable.");
children.push(spacer(160));
exoHeading("Partie III — Bilan argumenté (6 points, éléments attendus)");
rep("Bilan personnel reliant les trois années du cycle (préservation locale en 7e AF, gestion raisonnée en 8e AF, coopération internationale en 9e AF) à une réflexion sur ce que représente, pour l'élève, l'engagement citoyen pour l'environnement.");

await buildAndSave(children, 73, "Manuel_EC_9AF_CorrigeGeneral.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\06_CORRIGE_GENERAL");
