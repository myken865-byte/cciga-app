// Manuel d'EC 7e AF — Chapitre 5 : Résoudre les conflits, vivre ensemble
// (Unité 5 — La résolution de conflit et le vivre ensemble,
// Compétences C1, C3).
//
// Prolonge les Chapitres 1-4 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 41 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-22, Chapitre 3 = pages 23-31, Chapitre 4 = pages
// 32-40).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.37-38 : Unité 5, colonne 7e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, PAS de
//     [ADAPTATION DE LECTURE] pour cette unité — limites de colonnes
//     explicites) : "La négociation dans la résolution des conflits. La
//     paix sociale dans le cadre de l'école et de la communauté."
//   - `09_TABLE_MATIERES_PROPOSEE_EC_7AF.md` (verrouillée sans changement
//     dans `19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md`) : situation de départ
//     "un conflit simple vécu en classe ou dans la cour" ; activités "étude
//     de cas, jeu de rôle encadré sur des points de vue différents
//     [OFFICIEL]" ; évaluation "exercer sa pensée critique pour résoudre un
//     conflit en classe [OFFICIEL]".
//   - `05_MATRICE_COMPETENCES_UNITES_EC.md`, Unité 5 (section correctement
//     étiquetée, sans anomalie d'extraction) : savoirs cités verbatim :
//     "interpréter association/partage/solidarité/entraide et s'engager au
//     quotidien ; appréhender l'actualité de façon critique et argumenter
//     dans un débat ; admettre les opinions/croyances/points de vue
//     d'autrui ; résoudre les conflits (positifs ou négatifs) par le
//     dialogue et la négociation." Activité officielle citée verbatim : "à
//     partir d'études de cas ou de faits d'actualité clivants, les élèves
//     se font « avocats » de différents points de vue, s'initient à la
//     négociation et à la pensée critique (notions d'objectivité et de
//     vérité)."
//   - Compétences C1, C3 uniquement — seule unité avec cette combinaison
//     précise (C2 non mobilisée), confirmé par le tableau croisé
//     compétences × unités et par `18_MATRICE_PROGRESSION_EC_7_8_9AF_
//     VERROUILLEE.md`.
//
// CONTINUITÉ CHAPITRES 1-4 → CHAPITRE 5 (section 4 du prompt) : la
// tolérance et le respect des points de vue différents, déjà introduits au
// Chapitre 4, sont repris comme acquis pour construire, cette fois, des
// OUTILS concrets de résolution (dialogue, négociation) plutôt qu'une
// simple posture de respect. Aucun contenu réservé au Chapitre 6 (paix,
// protection, sécurité — institutions de défense) n'est anticipé ici :
// seule la « paix sociale » à l'échelle de l'école et de la communauté est
// traitée, sans aborder les institutions de sécurité. Conformément à
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, la démarche critique
// structurée/débat et les institutions de justice (approfondissement 8e
// AF) ainsi que les institutions judiciaires (maîtrise 9e AF) ne sont pas
// anticipées : ce chapitre reste au niveau de la négociation de base.
//
// STATUT DES CONTENUS FACTUELS : aucun texte juridique n'est cité mot pour
// mot dans ce chapitre — l'unité porte sur des compétences relationnelles
// (dialogue, négociation, pensée critique) plutôt que sur un texte de
// référence à citer, à la différence des Chapitres 1, 2 et 4 (aucun
// document DOC- n'est donc réservé ici, choix éditorial documenté dans le
// contrôle de traçabilité).
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
  "Résoudre les conflits, vivre ensemble",
  "Deux élèves se disputent un ballon dans la cour. La voix monte, presque une bagarre. Puis quelqu'un " +
  "propose : « Et si on jouait chacun son tour ? » Le conflit ne disparaît pas par magie — il se résout, " +
  "grâce au dialogue. Ce chapitre te donne les outils pour transformer un désaccord en solution.",
  [
    "Distinguer un conflit positif d'un conflit négatif.",
    "Utiliser le dialogue et la négociation pour résoudre un désaccord.",
    "Admettre et respecter des opinions, croyances ou points de vue différents des siens.",
    "Exercer sa pensée critique face à l'actualité, en distinguant objectivité et vérité.",
    "Contribuer à la paix sociale dans le cadre de l'école et de la communauté.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un conflit dans la cour de récréation",
  [
    "Dans une école haïtienne, deux élèves se disputent l'usage du seul ballon disponible pendant la " +
    "récréation. Le ton monte, d'autres élèves prennent parti. Un enseignant intervient : « Avant de crier, " +
    "essayons de comprendre ce que chacun veut vraiment. » Ce chapitre part de cette situation très ordinaire " +
    "pour apprendre à résoudre un conflit sans qu'il ne dégénère.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis issus des Chapitres 1 à 4"));
children.push(bodyPar(
  "Au Chapitre 4, tu as appris à respecter la dignité de chaque personne et à faire preuve de tolérance envers " +
  "des points de vue différents du tien. Ce chapitre s'appuie sur cette posture de respect pour construire, " +
  "cette fois, des outils concrets : comment dialoguer, négocier et réfléchir de façon critique lorsqu'un " +
  "désaccord survient.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Conflit — désaccord ou opposition entre deux ou plusieurs personnes, qui peut être positif (utile pour progresser) ou négatif (destructeur s'il n'est pas géré)."));
children.push(bulletPar("Dialogue — échange respectueux de paroles entre personnes, pour se comprendre avant de décider."));
children.push(bulletPar("Négociation — recherche d'un accord entre des personnes en désaccord, par des concessions acceptées de part et d'autre."));
children.push(bulletPar("Paix sociale — climat de respect et de coopération qui permet à une communauté de vivre ensemble sans violence."));
children.push(bulletPar("Objectivité — capacité à présenter des faits tels qu'ils sont, sans les déformer selon ses propres opinions."));
children.push(bulletPar("Point de vue — façon de voir une situation, propre à chaque personne, qui peut différer d'un point de vue à un autre sans qu'aucun ne soit forcément faux."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce qu'un conflit ?", "5.1"));
children.push(bodyPar(
  "Un conflit n'est pas toujours négatif. Il peut être l'occasion de mieux se comprendre, de clarifier une " +
  "règle, ou d'améliorer une situation — c'est un conflit positif. Mais un conflit peut aussi devenir " +
  "destructeur, si personne ne cherche à le résoudre : c'est un conflit négatif, qui abîme les relations " +
  "plutôt que de les faire progresser.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Conflit positif ou négatif ?",
  [
    "Conflit positif : deux élèves ne sont pas d'accord sur l'organisation d'un jeu, en discutent, et trouvent " +
    "ensemble une règle plus juste.",
    "Conflit négatif : le même désaccord dégénère en insultes ou en bagarre, sans que personne ne cherche à se " +
    "comprendre.",
    "Ce qui fait la différence, ce n'est pas le désaccord lui-même, mais la façon dont il est géré.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C05-01",
  "Ouverture — Le conflit du ballon dans la cour",
  "Une scène de cour d'école haïtienne crédible, montrant deux élèves en désaccord autour d'un ballon, un " +
  "enseignant s'approchant pour engager le dialogue, dans un style illustratif cohérent avec la charte EC, " +
  "sans violence représentée.",
  "Un conflit ordinaire du quotidien scolaire permet d'introduire concrètement la résolution par le dialogue.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire réaliste et non violente.",
  "Illustration pleine largeur, scène de cour d'école haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le dialogue et la négociation", "5.2"));
children.push(bodyPar(
  "Résoudre un conflit commence presque toujours par le dialogue : prendre le temps d'écouter l'autre avant de " +
  "répondre. La négociation va un peu plus loin : elle cherche un accord où chacun accepte de céder un peu, " +
  "pour que la solution convienne aux deux parties.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Une méthode simple pour dialoguer",
  [
    "1. Chacun explique calmement ce qu'il ressent et ce qu'il souhaite, sans couper la parole de l'autre.",
    "2. On reformule ce que l'autre a dit, pour vérifier qu'on l'a bien compris.",
    "3. On cherche ensemble une solution qui tient compte des deux points de vue, même si elle demande un " +
    "compromis.",
    "4. On vérifie, après un moment, que la solution fonctionne bien pour les deux.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Reprenons la situation du ballon : plutôt que de se disputer, les deux élèves pourraient proposer de jouer " +
  "chacun leur tour, ou d'inviter un troisième élève à arbitrer. Aucune de ces solutions n'annule le " +
  "désaccord initial — mais toutes deux le résolvent par la négociation.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Admettre des points de vue différents", "5.3"));
children.push(bodyPar(
  "Résoudre un conflit suppose aussi d'admettre que l'autre personne peut avoir une opinion, une croyance ou " +
  "un point de vue différent du sien, sans que cela signifie qu'elle a tort. Ce principe rejoint la tolérance " +
  "déjà étudiée au Chapitre 4 : respecter une différence, ce n'est pas forcément être d'accord avec elle.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La pensée critique face à l'actualité", "5.4"));
children.push(bodyPar(
  "Un conflit ne concerne pas toujours deux personnes précises : il peut aussi naître d'un désaccord sur un " +
  "sujet d'actualité qui divise. Face à une information ou à une opinion, la pensée critique consiste à se " +
  "demander : « Est-ce un fait vérifiable (objectivité), ou seulement une opinion qu'on présente comme si " +
  "c'était la vérité ? »",
));
children.push(calloutBox(
  "DÉCOUVRIR — Fait ou opinion ?",
  [
    "Un fait peut être vérifié par plusieurs sources indépendantes (« Il a plu hier dans cette commune »).",
    "Une opinion exprime un jugement personnel, qui peut être partagé ou non par d'autres (« Cette décision " +
    "était une mauvaise idée »).",
    "Confondre les deux peut transformer un simple désaccord d'opinion en conflit inutile, si chacun présente " +
    "son opinion comme une vérité absolue.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C05-02",
  "Exemple analysé — dialogue, négociation, pensée critique",
  "Un schéma en trois étapes reliant « écouter » (dialogue), « trouver un accord » (négociation) et « " +
  "vérifier les faits » (pensée critique), avec des pictogrammes simples, cohérent avec la charte EC.",
  "Les trois outils du chapitre (dialogue, négociation, pensée critique) se complètent pour résoudre un " +
  "conflit.",
  "Donner une référence visuelle claire et mémorisable des trois outils du chapitre.",
  "Illustration demi-page, schéma en trois étapes, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La paix sociale à l'école et dans la communauté", "5.5"));
children.push(bodyPar(
  "La paix sociale ne signifie pas l'absence totale de désaccords : elle signifie que les désaccords sont " +
  "gérés par le dialogue plutôt que par la violence. Contribuer à la paix sociale, c'est un rôle que chaque " +
  "élève peut jouer, à l'école comme dans sa communauté.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Le conflit du ballon, autrement",
  [
    "Reprends la situation d'ouverture : deux élèves se disputent le seul ballon disponible pendant la " +
    "récréation, et le ton commence à monter.",
    "1. Identifie ce que veut chaque élève dans cette situation.",
    "2. Ce conflit est-il, au départ, plutôt positif ou négatif ? Justifie ta réponse.",
    "3. Propose une solution de négociation qui tienne compte des deux points de vue.",
    "4. Comment cette solution contribue-t-elle, à petite échelle, à la paix sociale de la classe ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Un conflit peut-il être utile ?",
  [
    "Certains pensent qu'il vaut toujours mieux éviter les conflits. D'autres pensent qu'un conflit bien géré " +
    "peut être utile, car il permet de clarifier une règle ou une incompréhension.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Jeu de rôle : plaider un point de vue"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : À partir d'une étude de cas ou d'un fait d'actualité qui divise, se répartir en petits groupes " +
    "défendant chacun un point de vue différent, comme des « avocats » de leur position. [OFFICIEL — activité " +
    "prévue par le programme]",
    "CONSIGNES : Choisis, avec ta classe, un sujet simple qui suscite des avis différents (par exemple : « " +
    "Faut-il partager le seul ballon à tour de rôle, ou en acheter un second ? »). Répartissez-vous en groupes " +
    "défendant chacun une position.",
    "ÉTAPES : 1. Chaque groupe prépare deux ou trois arguments pour sa position. 2. Chaque groupe présente ses " +
    "arguments calmement, à tour de rôle. 3. La classe échange, en distinguant les faits vérifiables des " +
    "opinions. 4. La classe cherche ensemble une solution de négociation, pas nécessairement celle d'un seul " +
    "groupe.",
    "RÉSULTAT ATTENDU : Un échange structuré, respectueux, où chaque point de vue est entendu, suivi d'une " +
    "recherche commune de solution.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Un coin du dialogue dans la classe"));
children.push(calloutBox(
  "PROJET",
  [
    "OBJECTIF : Mettre en place, avec ta classe, un « coin du dialogue » : un espace ou un moment prévu " +
    "chaque semaine pour exprimer et résoudre calmement les petits désaccords, en lien avec la paix sociale à " +
    "l'école étudiée dans ce chapitre.",
    "ÉTAPES : 1. Choisir avec l'enseignant(e) un moment régulier (par exemple, cinq minutes en fin de semaine). " +
    "2. Définir une règle simple : une personne parle à la fois, sans jugement. 3. Utiliser la méthode de " +
    "dialogue en quatre étapes présentée dans ce chapitre pour les désaccords soulevés. 4. Faire un bilan " +
    "après quelques semaines : est-ce que cela aide à mieux vivre ensemble ?",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C05-03",
  "Espace de production — mon carnet du dialogue",
  "Un cadre vide, format portrait, structuré en un tableau à deux colonnes (Le désaccord / La solution " +
  "trouvée ensemble), prévu pour que l'élève y consigne les petits conflits résolus par le dialogue.",
  "Offrir un espace direct de production pour ancrer la pratique régulière du dialogue et de la négociation.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, tableau à deux colonnes, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un conflit peut être positif (utile) ou négatif (destructeur), selon la façon dont il est géré.",
    "Le dialogue et la négociation permettent de résoudre un désaccord en tenant compte des deux points de " +
    "vue.",
    "Admettre un point de vue différent du sien ne signifie pas être d'accord avec lui.",
    "La pensée critique aide à distinguer un fait vérifiable (objectivité) d'une simple opinion.",
    "La paix sociale, à l'école comme dans la communauté, repose sur la gestion des désaccords par le dialogue " +
    "plutôt que par la violence.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de distinguer conflit positif et conflit négatif, de découvrir une méthode simple de " +
  "dialogue et de négociation, d'admettre des points de vue différents, et de développer sa pensée critique en " +
  "distinguant faits et opinions. Il a aussi permis de s'exercer, à travers un jeu de rôle et un projet de " +
  "classe, à contribuer concrètement à la paix sociale à l'école.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "conflit · dialogue · négociation · paix sociale · objectivité · point de vue.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer un conflit positif d'un conflit négatif.",
    "☐ Appliquer les étapes simples du dialogue pour résoudre un désaccord.",
    "☐ Proposer une solution de négociation tenant compte de deux points de vue.",
    "☐ Distinguer un fait vérifiable d'une opinion.",
    "☐ Expliquer ce qu'est la paix sociale à l'école ou dans ma communauté.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : conflit positif/négatif, dialogue, négociation, objectivité, point de vue, paix " +
    "sociale.",
    "Vocabulaire clé à maîtriser : conflit, dialogue, négociation, paix sociale.",
    "Avant l'évaluation, vérifie que tu peux : décrire les étapes du dialogue ; proposer une solution de " +
    "négociation à un conflit simple ; distinguer un fait d'une opinion.",
    "Rappel officiel : l'évaluation attendue pour cette unité consiste à exercer sa pensée critique pour " +
    "résoudre un conflit, notamment dans la classe [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : conflit · " +
  "dialogue · négociation · objectivité · paix sociale.",
  { italics: true },
));
children.push(numberedPar("1. Un désaccord ou une opposition entre deux personnes s'appelle un ......................"));
children.push(numberedPar("2. Un échange respectueux de paroles pour se comprendre s'appelle un ......................"));
children.push(numberedPar("3. La recherche d'un accord par des concessions de part et d'autre s'appelle la ......................"));
children.push(numberedPar("4. La capacité à présenter des faits tels qu'ils sont, sans les déformer, s'appelle l'......................"));
children.push(numberedPar("5. Le climat de respect qui permet de vivre ensemble sans violence s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Classe les situations suivantes en conflit plutôt positif ou plutôt négatif, en justifiant : (a) deux élèves discutent calmement d'une règle de jeu injuste ; (b) deux élèves s'insultent sans chercher à se comprendre."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Admettre le point de vue d'un camarade signifie être d'accord avec lui. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Décris, en tes propres mots, les quatre étapes de la méthode de dialogue présentée dans ce chapitre."));
children.push(numberedPar("2. Donne un exemple de phrase qui exprime un fait, et un exemple de phrase qui exprime une opinion sur le même sujet."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Un camarade te raconte un conflit qu'il a eu avec un voisin à propos du bruit. Propose-lui, étape par étape, une méthode de négociation pour le résoudre."));
children.push(numberedPar("2. Exerce ta pensée critique : un camarade affirme qu'une rumeur entendue dans le quartier est « sûrement vraie ». Que lui conseilles-tu de vérifier avant de la répéter ?"));
children.push(numberedPar("3. Explique comment le projet du « coin du dialogue » pourrait contribuer, à petite échelle, à la paix sociale de ta classe."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-7AF-C05-04",
  "Synthèse — Résoudre les conflits, vivre ensemble",
  "Une carte mentale simple centrée sur « Vivre ensemble », avec des branches vers : conflit positif/négatif, " +
  "dialogue, négociation, pensée critique, paix sociale.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 40, "Manuel_EC_7AF_Chapitre5.docx");
