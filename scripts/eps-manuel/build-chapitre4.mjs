import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, resolveIllustration, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, NAVY,
} from "./common.mjs";
import { loadManifest, getEntry } from "./manifest.mjs";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\cciga app";
const manifest = loadManifest();
const ill = n => getEntry(manifest, 4, n);

const children = [];

children.push(...chapterTitleBlock(4, "Échauffement, sécurité et prévention"));

children.push(
  calloutBox(
    "Situation de départ",
    [
      "Pendant la récréation, Jerry et ses camarades se lancent directement dans un match de football improvisé, sans aucune préparation. Un peu plus tard, pendant la séance d’EPS, le professeur procède autrement : il fait d’abord vérifier l’état du terrain, puis propose une préparation progressive avant de commencer le jeu. Jerry remarque qu’il se sent plus à l’aise, plus attentif et plus efficace pendant l’activité.",
      "Pourquoi cette différence ? Ce chapitre t’aidera à comprendre l’importance de l’échauffement, ainsi que les règles de sécurité et de prévention à respecter avant, pendant et après une activité physique.",
    ],
    "F0F0F0", "1F4E5F", NAVY,
  ),
  spacer(240),
);

children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "définir simplement l’échauffement ;",
  "expliquer son utilité avant une activité physique ;",
  "identifier les principales étapes d’un échauffement progressif ;",
  "réaliser, sous supervision, un échauffement simple adapté ;",
  "comprendre le retour au calme ;",
  "identifier des dangers dans un espace de pratique ;",
  "expliquer l’importance de vérifier le terrain et le matériel ;",
  "appliquer les principales règles de sécurité en EPS ;",
  "adopter un comportement responsable envers tes camarades ;",
  "en cas de malaise, de douleur ou de problème inhabituel, arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Mots-clés"));
children.push(mixedPar([
  { text: "Échauffement, sécurité, prévention, mobilisation, retour au calme, matériel, terrain, consigne, responsabilité.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ================= 4.1 =================
children.push(sectionHeading("Qu’est-ce que l’échauffement ?", "4.1"));
children.push(bodyPar(
  "L’échauffement est une préparation progressive du corps et de l’esprit avant une activité physique principale. Ce n’est pas l’activité elle-même, mais une étape qui la précède et qui la prépare."
));
children.push(bodyPar(
  "Il prépare ton corps (muscles, articulations), tes mouvements, ton attention et toi-même, en tant qu’élève, à l’activité qui va suivre. Un bon échauffement réduit certains risques, mais il ne constitue pas une garantie absolue contre toute blessure : il reste indispensable de respecter aussi toutes les autres règles de sécurité présentées dans ce chapitre."
));
children.push(spacer(160));

// ================= 4.2 =================
children.push(sectionHeading("Pourquoi s’échauffer ?", "4.2"));
children.push(bodyPar("S’échauffer avant une activité physique permet de :"));
[
  "passer progressivement du repos à l’activité, plutôt que de démarrer brutalement ;",
  "augmenter progressivement l’activité du corps, notamment la respiration et la circulation (comme tu l’as vu au chapitre 2) ;",
  "préparer les articulations et les muscles aux mouvements à venir ;",
  "préparer la coordination et la concentration ;",
  "répéter des gestes simples qui seront utilisés pendant la séance.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Par exemple, avant un match de football, faire quelques passes et de petites courses avec le ballon permet au corps et à l’attention de se préparer progressivement au jeu qui va suivre."
));
children.push(spacer(160));

// ================= 4.3 =================
children.push(sectionHeading("Les étapes d’un échauffement progressif", "4.3"));
children.push(bodyPar("Un échauffement bien construit suit quatre étapes, de la moins intense à la plus proche de l’activité principale :"));
children.push(bulletMixed([{ text: "Étape 1 — Mise en mouvement : ", bold: true }, { text: "marche active, déplacement léger, petit trot lorsque les conditions le permettent." }]));
children.push(bulletMixed([{ text: "Étape 2 — Mobilisation : ", bold: true }, { text: "mobiliser les principales articulations — épaules, coudes, poignets, hanches, genoux, chevilles." }]));
children.push(bulletMixed([{ text: "Étape 3 — Activation progressive : ", bold: true }, { text: "changements de direction, déplacements variés, exercices de coordination, mouvements dynamiques adaptés." }]));
children.push(bulletMixed([{ text: "Étape 4 — Préparation spécifique : ", bold: true }, { text: "quelques mouvements simples proches de l’activité principale qui va suivre." }]));
children.push(bodyPar(
  "Le principe le plus important est la progressivité : chaque étape doit être un peu plus intense que la précédente, sans jamais forcer brutalement dès le début."
));
children.push(spacer(160));

children.push(...resolveIllustration(
  ill(1),
  "Illustration 4.1",
  "Séquence en quatre images : mise en mouvement → mobilisation → activation → préparation spécifique",
  "Réaliser une bande de quatre images alignées, numérotées de 1 à 4, montrant un même élève haïtien de 7e AF : 1) marchant activement ou trottinant légèrement ; 2) mobilisant une articulation (par exemple les épaules) ; 3) effectuant un déplacement dynamique avec changement de direction ; 4) réalisant un geste proche de l’activité principale (par exemple une petite passe de ballon). Utiliser des flèches entre chaque image pour montrer la progression.",
  "Les quatre étapes d’un échauffement progressif, de la moins intense à la plus spécifique.",
  "Aider l’élève à mémoriser visuellement l’ordre logique des étapes d’un échauffement.",
  ROOT,
));
children.push(spacer(200));

// ================= 4.4 =================
children.push(sectionHeading("Adapter l’échauffement à l’activité", "4.4"));
children.push(bodyPar(
  "Un échauffement n’est pas identique pour toutes les activités : il doit être adapté à ce que tu vas pratiquer ensuite."
));
children.push(threeColTable(
  ["Activité principale", "Exemple d’échauffement adapté", "Ce qui est préparé en priorité"],
  [
    ["Course", "Marche, petit trot, puis quelques accélérations progressives.", "Jambes, respiration, rythme de course"],
    ["Football", "Mobilisation des jambes, petites passes, dribbles légers.", "Jambes, chevilles, contrôle du ballon"],
    ["Basketball", "Mobilisation des poignets et des épaules, dribbles, petits tirs.", "Bras, poignets, coordination main-œil"],
    ["Volleyball", "Mobilisation des épaules et des poignets, petites touches de balle.", "Épaules, bras, réactivité"],
    ["Activité gymnique", "Mobilisation générale, exercices d’équilibre et de coordination.", "Tout le corps, équilibre, coordination"],
  ],
  [2400, 4200, 2600],
));
children.push(spacer(160));
children.push(bodyPar(
  "On distingue une préparation générale, qui mobilise l’ensemble du corps, et une préparation spécifique, qui reproduit des gestes proches de l’activité principale."
));
children.push(spacer(160));

// ================= 4.5 =================
children.push(sectionHeading("Le retour au calme", "4.5"));
children.push(bodyPar("Après l’activité principale, le corps a besoin d’un retour au calme progressif, qui comprend :"));
[
  "une diminution progressive de l’intensité de l’effort ;",
  "une marche calme, lorsque cela est approprié ;",
  "une respiration qui revient progressivement vers son rythme habituel ;",
  "de l’hydratation et de la récupération.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Tu as déjà étudié l’hydratation et la récupération en détail au chapitre 3 : les mêmes principes s’appliquent après chaque séance d’EPS."
));
children.push(spacer(160));

// ================= 4.6 =================
children.push(sectionHeading("Observer l’espace avant de pratiquer", "4.6"));
children.push(bodyPar(
  "Dans les écoles haïtiennes, l’EPS se pratique dans des espaces variés : cour d’école, terrain, espace polyvalent ou zone temporairement aménagée. Avant toute activité, il est indispensable d’observer cet espace."
));
children.push(subHeading("Ce qu’il faut vérifier"));
[
  "l’état du sol (terre battue, ciment, herbe) ;",
  "la présence de trous, de pierres ou d’objets dangereux ;",
  "les surfaces glissantes ;",
  "les obstacles et les structures proches (murs, poteaux, escaliers) ;",
  "les limites de la zone de jeu ;",
  "l’espace suffisant entre les élèves.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "L’activité proposée doit toujours être adaptée aux conditions réelles du terrain disponible, et non l’inverse."
));
children.push(spacer(160));

children.push(...resolveIllustration(
  ill(3),
  "Illustration 4.3",
  "Scène dans une cour d’école haïtienne à observer avant de commencer",
  "Dessiner une cour d’école haïtienne avec un ballon, des limites de terrain tracées à la craie, un petit obstacle (pierre ou trou), une zone libre, du matériel rangé (cônes, cordes), des élèves qui attendent en ligne et un professeur qui observe l’ensemble de l’espace. Ajouter la question suivante sous l’illustration, bien visible : « Quels éléments doivent être vérifiés avant de commencer ? »",
  "Quels éléments doivent être vérifiés avant de commencer ?",
  "Amener l’élève à repérer activement les éléments à vérifier dans un espace de pratique réaliste, avant de lire les réponses dans le texte.",
  ROOT,
));
children.push(spacer(200));

// ================= 4.7 =================
children.push(sectionHeading("Vérifier le matériel", "4.7"));
children.push(bodyPar(
  "Le matériel utilisé pendant une séance d’EPS doit lui aussi être vérifié : ballons, cônes, cordes, filets, plots, matériel gymnique, repères, etc."
));
[
  "Le matériel doit être adapté à l’activité et à l’âge des élèves.",
  "Il doit être en bon état d’utilisation, sans partie cassée ou dangereuse.",
  "Il doit être correctement installé (par exemple, un filet bien fixé).",
  "Il doit être utilisé selon les consignes données par l’enseignant.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Il ne faut jamais utiliser d’objets dangereux comme matériel improvisé (par exemple des bâtons, des morceaux de verre ou des pierres tranchantes) : seul le matériel approuvé par l’enseignant doit être utilisé."
));
children.push(spacer(160));

// ================= 4.8 =================
children.push(sectionHeading("Distances et organisation des élèves", "4.8"));
children.push(bodyPar(
  "Certaines activités demandent de respecter des distances de sécurité entre les élèves : course, saut, lancer, exercices avec ballon ou parcours moteur."
));
children.push(bodyPar("Pour rester en sécurité, il faut :"));
[
  "attendre son tour avant de commencer ;",
  "respecter le sens de circulation indiqué par l’enseignant ;",
  "rester hors d’une zone de lancer lorsqu’un camarade s’y trouve ;",
  "ne jamais traverser une zone d’activité sans autorisation ;",
  "respecter l’espace personnel de ses camarades.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(160));

children.push(...resolveIllustration(
  ill(5),
  "Illustration 4.5",
  "Sécurité pendant un lancer",
  "Dessiner une scène de lancer scolaire (par exemple un lancer de balle) avec : le lanceur en position, une zone de lancer clairement délimitée au sol, une ligne d’attente où se trouvent les autres élèves, une zone interdite bien signalée où personne ne doit se trouver pendant le lancer, et l’enseignant qui supervise l’ensemble depuis un endroit sûr.",
  "Une zone de lancer bien organisée, avec une ligne d’attente et une zone interdite respectées par tous.",
  "Illustrer concrètement l’organisation spatiale nécessaire à la sécurité pendant un exercice de lancer.",
  ROOT,
));
children.push(spacer(200));

// ================= 4.9 =================
children.push(sectionHeading("Comportements dangereux à éviter", "4.9"));
children.push(bodyPar("Certains comportements rendent une activité dangereuse pour toi-même ou pour tes camarades :"));
[
  "pousser ou faire trébucher un camarade ;",
  "utiliser le matériel sans autorisation de l’enseignant ;",
  "lancer un objet alors qu’une personne se trouve dans la zone de lancer ;",
  "commencer une activité avant la consigne, ou continuer après un signal d’arrêt ;",
  "transformer une activité scolaire en défi dangereux entre camarades.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Ces comportements sont dangereux parce qu’ils rendent le déroulement de l’activité imprévisible : personne ne peut alors anticiper les mouvements des autres, ce qui augmente fortement le risque d’accident."
));
children.push(spacer(160));

children.push(...resolveIllustration(
  ill(4),
  "Illustration 4.4",
  "Comparaison entre une activité bien organisée et une activité présentant des comportements à corriger",
  "Dessiner une scène en deux parties, côte à côte. À gauche : une activité bien organisée, avec des élèves qui attendent leur tour en ligne, respectent les distances et écoutent l’enseignant. À droite, dans le même espace : plusieurs comportements à corriger (un élève qui pousse un camarade, un autre qui lance un ballon sans regarder, un élève qui traverse une zone de lancer). Ne pas viser un élève en particulier ; représenter des comportements génériques.",
  "À gauche, une activité bien organisée ; à droite, des comportements à corriger.",
  "Permettre à l’élève de comparer visuellement une pratique sécuritaire et une pratique risquée, pour mieux identifier les comportements à éviter.",
  ROOT,
));
children.push(spacer(200));

children.push(calloutBox(
  "Sécurité",
  [
    "Un bon échauffement est progressif et adapté à l’activité qui va suivre.",
    "Vérifie toujours le terrain et le matériel avant de commencer une activité.",
    "Respecte les distances de sécurité et les consignes de circulation données par l’enseignant.",
    "N’utilise jamais le matériel sans autorisation, et ne transforme jamais une activité scolaire en défi dangereux.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(200));

// ================= 4.10 =================
children.push(sectionHeading("Que faire lorsqu’un problème survient ?", "4.10"));
children.push(bodyPar(
  "Si un problème survient pendant une séance d’EPS (malaise, douleur, chute, accident), voici la conduite à tenir :"
));
[
  "arrêter immédiatement l’activité ;",
  "prévenir immédiatement l’enseignant ou un adulte responsable ;",
  "laisser de l’espace autour de la personne concernée ;",
  "suivre les instructions données par l’adulte responsable.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Il ne faut jamais demander à des élèves d’improviser des gestes médicaux qu’ils ne maîtrisent pas : seul l’adulte responsable doit décider des soins à apporter."
));
children.push(spacer(160));

children.push(...resolveIllustration(
  ill(6),
  "Illustration 4.6",
  "Retour au calme après l’activité",
  "Dessiner un petit groupe d’élèves haïtiens en train de marcher calmement en cercle ou en ligne après une activité, certains buvant de l’eau, d’autres rangeant le matériel (cônes, cordes) sous la supervision de l’enseignant. Ambiance calme et posée, cohérente avec le climat chaud d’Haïti.",
  "Marche calme, hydratation et rangement du matériel : les gestes du retour au calme.",
  "Illustrer concrètement les gestes attendus pendant le retour au calme décrit à la section 4.5.",
  ROOT,
));
children.push(spacer(200));

// ================= 4.11 =================
children.push(sectionHeading("La responsabilité collective", "4.11"));
children.push(bodyPar(
  "La sécurité pendant une séance d’EPS n’est pas seulement la responsabilité de l’enseignant : chaque élève y contribue, par exemple en :"
));
[
  "respectant les règles et les consignes ;",
  "signalant un danger repéré dans l’espace de pratique ;",
  "prenant soin du matériel collectif ;",
  "respectant ses camarades ;",
  "évitant les comportements imprudents ;",
  "écoutant attentivement les consignes.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "La sécurité, la responsabilité et la citoyenneté sont donc étroitement liées : comme tu l’as vu au chapitre 1 avec le respect et le fair-play, prendre soin des autres fait partie des valeurs de l’EPS. Tu approfondiras la citoyenneté au chapitre 10."
));
children.push(spacer(120));

children.push(calloutBox(
  "À retenir",
  ["Un bon échauffement est progressif et adapté à l’activité qui va suivre."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Un muscle légèrement échauffé est plus souple et se déchire moins facilement qu’un muscle froid. C’est l’une des raisons pour lesquelles les athlètes professionnels ne sautent jamais l’échauffement, même avant un entraînement léger."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));
children.push(...resolveIllustration(
  ill(2),
  "Illustration 4.2",
  "Mouvements simples de mobilisation",
  "Dessiner une bande de six petites vignettes montrant un élève haïtien réalisant, l’une après l’autre, des mouvements de mobilisation simples et anatomiquement corrects : rotation des épaules, flexion-extension des coudes, rotation des poignets, rotation des hanches, flexion des genoux, rotation des chevilles. Étiqueter chaque vignette avec le nom de l’articulation mobilisée.",
  "Six mouvements simples pour mobiliser les principales articulations avant l’activité.",
  "Servir de support visuel direct pour réaliser l’étape 2 (mobilisation) de l’échauffement et pour l’activité pratique ci-dessous.",
  ROOT,
));
children.push(spacer(160));

children.push(calloutBox(
  "Construisons notre échauffement",
  [
    "Sous la supervision de ton professeur, construis avec ton groupe une courte séquence d’échauffement en suivant les quatre étapes apprises dans ce chapitre :",
    "1) une mise en mouvement (marche active ou petit trot) ;",
    "2) une mobilisation des principales articulations ;",
    "3) des déplacements dynamiques simples (changements de direction) ;",
    "4) une préparation spécifique adaptée à l’activité principale du jour.",
    "L’objectif n’est pas de rechercher l’intensité maximale : ton professeur adapte la durée, les mouvements et l’organisation aux élèves et aux conditions de l’établissement.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

children.push(calloutBox(
  "Observe — Inspectons notre espace d’EPS",
  [
    "Avec ton professeur, observe l’espace où se déroule la séance d’EPS et identifie ensemble :",
    "1) les limites de la zone de jeu ;",
    "2) les obstacles éventuels ;",
    "3) l’état du sol ;",
    "4) l’emplacement du matériel ;",
    "5) les zones de circulation ;",
    "6) les zones nécessitant une attention particulière (proches d’un mur, d’un escalier, etc.).",
    "Cette activité développe ton sens de la responsabilité et de la prévention, utile bien au-delà des séances d’EPS.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(240));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "L’échauffement est une préparation progressive du corps et de l’esprit avant une activité physique.",
  "Un échauffement progressif suit quatre étapes : mise en mouvement, mobilisation, activation progressive et préparation spécifique.",
  "L’échauffement doit être adapté à l’activité principale : préparation générale et préparation spécifique.",
  "Le retour au calme diminue progressivement l’intensité et favorise l’hydratation et la récupération.",
  "Avant toute activité, il faut observer le terrain et vérifier le matériel.",
  "Le respect des distances de sécurité et de l’organisation évite de nombreux accidents.",
  "Certains comportements sont dangereux et doivent toujours être évités.",
  "En cas de problème, il faut arrêter l’activité et prévenir immédiatement l’enseignant ou un adulte responsable.",
  "La sécurité pendant l’EPS est une responsabilité collective, liée au respect et à la citoyenneté.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(4));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(échauffement - sécurité - articulations - matériel - récupération - enseignant - terrain - progressivement)", italics: true, color: "555555" },
]));
[
  "1. L’____________________ est une préparation progressive du corps avant une activité physique.",
  "2. Il est important de mobiliser les ____________________ avant de commencer une activité intense.",
  "3. Avant de pratiquer une activité, il faut vérifier l’état du ____________________ pour éviter les dangers.",
  "4. Un ballon abîmé ou des cônes cassés sont des exemples de ____________________ à vérifier avant la séance.",
  "5. L’intensité de l’échauffement doit augmenter ____________________, sans jamais forcer brutalement.",
  "6. En cas de malaise, il faut immédiatement prévenir l’____________________.",
  "7. Après l’effort, l’hydratation et le repos favorisent une bonne ____________________.",
  "8. Respecter les distances entre élèves et vérifier le matériel sont deux règles de ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Qu’est-ce que l’échauffement ?", opts: ["a) une activité de compétition intense", "b) une préparation progressive du corps et de l’esprit avant l’activité principale", "c) un moment pour se reposer complètement", "d) une étape facultative qui ne sert à rien"] },
  { q: "2. Quelle est la bonne progression d’un échauffement ?", opts: ["a) préparation spécifique → mobilisation → mise en mouvement → activation", "b) mise en mouvement → mobilisation → activation progressive → préparation spécifique", "c) activation → préparation spécifique → mise en mouvement → mobilisation", "d) mobilisation → préparation spécifique → activation → mise en mouvement"] },
  { q: "3. Avant de commencer une activité dans la cour d’école, que doit-on vérifier en premier ?", opts: ["a) uniquement la tenue des élèves", "b) l’état du terrain et la présence d’objets dangereux", "c) le nombre de spectateurs", "d) la couleur des ballons"] },
  { q: "4. Que faire si un camarade se blesse pendant une activité ?", opts: ["a) continuer l’activité comme si de rien n’était", "b) essayer de soigner soi-même la blessure", "c) arrêter l’activité et prévenir immédiatement l’enseignant", "d) demander à tous les élèves de courir chercher de l’aide en même temps"] },
  { q: "5. Pourquoi ne faut-il jamais lancer un objet quand quelqu’un se trouve dans la zone de lancer ?", opts: ["a) parce que cela ralentit le jeu", "b) parce que cela peut blesser gravement cette personne", "c) parce que le professeur n’aime pas ça", "d) il n’y a aucune raison particulière"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Échauffement", "a) Mouvement des articulations pour les préparer à l’effort"],
  ["2. Mobilisation", "b) Ensemble des règles et comportements qui protègent les élèves pendant l’activité"],
  ["3. Sécurité", "c) Diminution progressive de l’intensité après l’effort, avec hydratation et repos"],
  ["4. Retour au calme", "d) Ballons, cônes, cordes et autres objets utilisés pendant la séance, qui doivent être vérifiés avant usage"],
  ["5. Matériel", "e) Préparation progressive du corps et de l’esprit avant l’activité principale"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Avant une séance d’EPS, tu remarques que le terrain contient plusieurs pierres et un petit trou. Explique ce que tu devrais faire, et pourquoi il est important d’agir ainsi avant de commencer l’activité.",
  "2. Un camarade démarre une course avant que le signal de départ soit donné. Explique pourquoi ce comportement est dangereux et ce qu’il peut provoquer.",
  "3. Compare l’échauffement que tu ferais avant un match de football à celui que tu ferais avant une séance de gymnastique. En quoi sont-ils différents, et pourquoi ?",
  "4. Explique en quoi le respect des règles de sécurité en EPS est aussi une forme de responsabilité envers les autres élèves.",
].forEach(t => children.push(numberedPar(t)));

await buildAndSave(children, 28, "Manuel_EPS_7AF_Chapitre4.docx");
