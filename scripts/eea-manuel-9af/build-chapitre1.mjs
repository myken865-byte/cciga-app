// Manuel d'EEA 9e AF — Chapitre 1 : La couleur et l'art haïtien
// (champ officiel : Arts plastiques et visuels, Axe 1 — L'observation,
// approfondissement final du cycle).
//
// PREMIER CHAPITRE DU MANUEL 9e AF : ouvre le livre, pagination fraîche
// (page 1), ne réutilise ni le texte ni la pagination des manuels EEA 7e ou
// 8e AF (déjà finalisés, NON modifiés ici).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.39/63 : TABLEAU DE PROGRESSION explicitement separe par annee (7e/
//     8e/9e AF) pour l'Axe 1 (L'observation) — verifie en direct le
//     2026-08-23. Colonne 9e AF, 1re periode, citee verbatim : "Introduction
//     a la couleur : - La theorie des couleurs - Le cercle chromatique.
//     Reinterpretation des Peintres «naifs» haitiens et leurs couleurs :
//     Ex : Casimir Laurent, Prefete Duffaut..." Ce meme tableau confirme
//     (pour memoire, deja traite et NON reintroduit ici) que le point/ligne
//     (+ pointillisme/art Saint-Soleil) appartient a la 7e AF et que les
//     valeurs/clair-obscur (+ Rembrandt/Caravage) appartiennent a la 8e AF.
//   - p.41-42/63 : Unite d'apprentissage 1 (L'observation), tableau complet
//     (full-cycle) — verifie en direct le 2026-08-23. Competences
//     officielles : C1, C2, C3, C5, C6, C7, C8 (C4 non mobilisee dans cette
//     unite, comme pour les Chapitres 1 des manuels 7e et 8e AF). Savoir D
//     cite verbatim : "Vocabulaire de la lumiere et de la couleur - Comment
//     determiner la valeur d'une couleur (ou l'ensemble des valeurs qui
//     compose une image). Les couleurs de bases et secondaires du cercle
//     chromatique. La psychologie de la couleur." Savoir-faire cite
//     verbatim : "Melanger, superposer, agencer les couleurs." Activite
//     citee verbatim : "4-Introduction a la couleur : - La theorie des
//     couleurs - le melange et le mariage des couleurs - Le cercle
//     chromatique. - Reinterpretation des Peintres «naifs» haitiens en
//     imitant leurs couleurs vives : tel Casimir Laurent, Prefete
//     Duffaut..." Evaluation citee verbatim : "MODALITES ET CRITERES
//     D'EVALUATION : EVALUATION FORMATIVE."
//
// NOTE DE PERIMETRE (transparence, non une omission silencieuse) : la meme
// liste d'activites (p.42) mentionne aussi, juste apres l'item 4, "Le
// patrimoine visuel haitien Ex. analyse de la technique des Saint-Soleil,
// comment se fait l'appropriation des formes, des lignes et des points" —
// mais cette reference precise a l'art Saint-Soleil est deja l'ancrage
// patrimonial du Chapitre 1 de la 7e AF (tableau de progression p.39,
// colonne 7e AF : "References au pointillisme... et/ou l'art Saint Soleil
// d'Haiti"). Pour eviter une repetition avec un chapitre deja redige et
// finalise, ce Chapitre 1 de la 9e AF NE reprend PAS l'art Saint-Soleil
// comme ancrage patrimonial : seul l'ancrage explicitement et uniquement
// tague 9e AF par le tableau de progression separe par annee (peintres
// naifs haitiens et leurs couleurs) est utilise ici.
//
// CONTROLE DE LA PROGRESSION 7e -> 8e -> 9e AF (section 3 du prompt
// d'execution) : le Chapitre 1 de la 7e AF (deja finalise, NON modifie ici)
// a traite le point et la ligne (trait pur). Le Chapitre 1 de la 8e AF
// (deja finalise, NON modifie ici) a traite les valeurs et le clair-obscur
// (lumiere en niveaux de gris). Ce Chapitre 1 de la 9e AF acheve ce cycle
// de trois ans sur l'Axe 1 en introduisant la couleur elle-meme (cercle
// chromatique, melange, psychologie de la couleur) — une progression
// explicite du programme officiel (trait -> valeur -> couleur), rappelee
// brievement (section 1.1) puis reellement approfondie. Aucune anticipation
// d'un contenu reserve a un chapitre ulterieur du meme manuel (metiers de
// l'art, institutions culturelles = Chapitre 4) n'est introduite ici.
//
// PATRIMOINE : les peintres "naifs" haitiens sont cites par la source
// elle-meme comme des EXEMPLES non exhaustifs ("tel...", "Ex...", suivi de
// points de suspension), jamais comme une liste fermee. Ce chapitre reprend
// cette meme prudence : Casimir Laurent et Prefete Duffaut sont nommes
// exactement comme dans la source, presentes comme deux exemples parmi
// d'autres peintres naifs haitiens, sans qu'aucune œuvre precise, date ou
// biographie ne leur soit attribuee (aucune de ces informations n'etant
// fournies par la source EEA elle-meme). La description du style "naif"
// (couleurs vives, scenes du quotidien, perspective simplifiee) reste
// generale et non attachee a une œuvre nommee.
//
// Adaptations de securite : materiel = crayons de couleur, peinture (eau),
// pinceaux ; aucun outil dangereux.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE,
  BOX_ATELIER_FILL, BOX_ATELIER_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_CRITIQUE_FILL, BOX_CRITIQUE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  OUTREMER, OCRE, SAUGE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  1,
  "La couleur et l'art haïtien",
  "Le trait t'a appris à observer. La valeur t'a appris à faire naître la lumière. Cette année, la couleur " +
  "vient achever ce parcours : apprendre à la comprendre, à la maîtriser, et à reconnaître comment des " +
  "peintres haïtiens en ont fait une signature.",
  [
    "Comprendre le cercle chromatique et distinguer couleurs primaires et secondaires.",
    "Mélanger, superposer et agencer des couleurs de façon maîtrisée.",
    "Décrire, avec un vocabulaire précis, l'effet d'une couleur sur une image.",
    "Analyser une œuvre naïve haïtienne à partir de sa palette de couleurs.",
    "Réinterpréter une scène en s'inspirant d'une palette de couleurs vives.",
    "Justifier des choix chromatiques dans une production personnelle.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une galerie improvisée à Jacmel, une classe de 9e AF observe des reproductions " +
  "de peintures haïtiennes aux couleurs éclatantes — un marché rouge et jaune, un jardin vert et bleu, un " +
  "ciel presque violet. « Pourquoi ces couleurs semblent-elles si vivantes, presque irréelles ? » demande un " +
  "élève. Ce chapitre répond à cette question, et te donne les outils pour créer, toi aussi, avec cette même " +
  "intensité.",
  { italics: true },
));

children.push(subHeading("Prérequis utiles"));
children.push(bodyPar(
  "Ce chapitre suppose que tu maîtrises déjà : le tracé précis du point et de la ligne (7e AF), ainsi que la " +
  "gamme de valeurs et l'ombrage pour donner du volume à un dessin (8e AF). Ces deux acquis restent utiles : " +
  "une couleur, elle aussi, possède une valeur, et une composition colorée reste construite sur des formes et " +
  "des lignes déjà maîtrisées.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Couleur primaire — couleur de base qui ne peut être obtenue par aucun mélange (rouge, jaune, bleu)."));
children.push(bulletPar("Couleur secondaire — couleur obtenue en mélangeant deux couleurs primaires (orange, vert, violet)."));
children.push(bulletPar("Cercle chromatique — représentation circulaire organisant les couleurs primaires et secondaires selon leurs relations."));
children.push(bulletPar("Teinte — variante d'une couleur, plus claire ou plus foncée, plus vive ou plus terne."));
children.push(bulletPar("Palette — ensemble de couleurs choisies et utilisées dans une œuvre ou une production."));
children.push(bulletPar("Art naïf (peintre naïf) — courant artistique caractérisé par des couleurs vives, des formes simplifiées et des scènes du quotidien, sans recherche de perspective réaliste."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : du trait à la valeur, vers la couleur", "1.1"));
children.push(bodyPar(
  "En 7e AF, tu as appris à observer et à tracer avec précision. En 8e AF, tu as appris à maîtriser la lumière " +
  "et l'ombre grâce aux valeurs. Cette année, un dernier élément vient compléter ce parcours : la couleur, " +
  "qui ajoute une dimension nouvelle à tout ce que tu sais déjà faire.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le cercle chromatique", "1.2"));
children.push(bodyPar(
  "Le cercle chromatique organise les couleurs selon leurs relations. Il part de trois couleurs primaires, " +
  "que l'on ne peut obtenir par aucun mélange, et qui permettent à elles seules de créer toutes les autres " +
  "couleurs secondaires.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Primaires et secondaires",
  [
    "Couleurs primaires : rouge, jaune, bleu.",
    "Couleurs secondaires (obtenues par mélange de deux primaires) : orange (rouge + jaune), vert (jaune + " +
    "bleu), violet (bleu + rouge).",
    "Sur le cercle chromatique, chaque couleur secondaire se place entre les deux primaires qui la composent.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C01-01",
  "Ouverture — Couleurs vives à Jacmel",
  "Une scène de galerie ou d'atelier d'art haïtien crédible (Jacmel ou similaire), avec des élèves de 9e AF " +
  "observant des reproductions colorées stylisées, sans reproduire une œuvre précise et protégée.",
  "La couleur, une fois maîtrisée, transforme la façon dont une œuvre est perçue.",
  "Ouvrir le chapitre sur une scène concrète ancrant la découverte de la couleur dans un contexte artistique haïtien.",
  "Illustration pleine largeur, scène de galerie/atelier haïtien, cohérente avec la charte EEA.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C01-02",
  "Exemple analysé — le cercle chromatique",
  "Un cercle chromatique clair et annoté, montrant les trois couleurs primaires et les trois couleurs " +
  "secondaires à leurs positions correctes, avec des flèches indiquant les mélanges.",
  "Le cercle chromatique organise visuellement la relation entre toutes les couleurs de base.",
  "Donner une référence visuelle claire et directement utilisable du cercle chromatique.",
  "Illustration demi-page, schéma coloré et annoté, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mélanger, superposer, agencer les couleurs", "1.3"));
children.push(bodyPar(
  "Connaître le cercle chromatique ne suffit pas : il faut aussi savoir manipuler concrètement les couleurs, " +
  "en les mélangeant, en les superposant ou en les plaçant côte à côte pour obtenir l'effet recherché.",
));
children.push(calloutBox(
  "TECHNIQUE — Manipuler la couleur avec méthode",
  [
    "1. Mélanger : combine deux couleurs primaires en petite quantité pour observer précisément la " +
    "secondaire obtenue, avant de mélanger de plus grandes quantités.",
    "2. Superposer : applique une couche de couleur fine sur une autre déjà sèche pour modifier subtilement " +
    "la teinte perçue.",
    "3. Agencer : place plusieurs couleurs côte à côte sur ta feuille pour observer comment elles " +
    "s'influencent visuellement l'une l'autre.",
    "4. Teste toujours sur un brouillon avant d'appliquer un mélange définitif sur ta production principale.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : commence toujours par de petites quantités de couleur — un mélange trop généreux est " +
  "difficile à corriger. Erreur fréquente à éviter : mélanger trop de couleurs différentes à la fois, ce qui " +
  "produit souvent une teinte terne et grisâtre plutôt qu'une couleur vive et intentionnelle.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La psychologie de la couleur", "1.4"));
children.push(bodyPar(
  "Une couleur ne se contente pas d'être belle ou vive : elle communique aussi une impression, une émotion, " +
  "une ambiance. Choisir une couleur, c'est donc aussi choisir ce que l'on veut faire ressentir.",
));
children.push(calloutBox(
  "OBSERVER — Ce que suggère une couleur",
  [
    "Les couleurs chaudes (rouge, orange, jaune) évoquent souvent l'énergie, la chaleur ou l'intensité.",
    "Les couleurs froides (bleu, vert, violet) évoquent souvent le calme, la fraîcheur ou la distance.",
    "Une même couleur peut suggérer des impressions différentes selon son intensité (vive ou pâle) et les " +
    "couleurs qui l'entourent.",
    "Il n'existe pas une seule bonne interprétation : l'important est que l'artiste puisse justifier son " +
    "choix.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le patrimoine visuel haïtien : les peintres naïfs", "1.5"));
children.push(bodyPar(
  "Haïti possède une tradition artistique reconnue pour l'usage vif et affirmé de la couleur : l'art naïf. Ce " +
  "courant se caractérise par des couleurs éclatantes, des formes simplifiées et des scènes du quotidien " +
  "haïtien, sans recherche de perspective réaliste.",
));
children.push(calloutBox(
  "PATRIMOINE — Les peintres naïfs haïtiens et leurs couleurs",
  [
    "Le programme officiel cite, à titre d'exemples parmi d'autres, deux peintres naïfs haïtiens : Casimir " +
    "Laurent et Préfète Duffaut.",
    "Leur art se reconnaît notamment par des couleurs vives et affirmées, utilisées sans chercher à imiter " +
    "exactement les couleurs réelles d'une scène.",
    "Ce chapitre t'invite à t'inspirer de cet usage vif de la couleur, sans copier une œuvre précise, mais en " +
    "t'appropriant l'esprit de cette liberté chromatique.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, SAUGE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C01-03",
  "Démonstration technique — du mélange à la palette naïve",
  "Une planche en deux étapes : une palette de couleurs primaires/secondaires mélangées, puis leur " +
  "application sur une scène simple de style naïf (marché ou paysage haïtien stylisé), sans reproduire une " +
  "œuvre précise.",
  "Une palette maîtrisée peut s'inspirer librement de l'intensité chromatique de l'art naïf haïtien.",
  "Montrer concrètement le passage du mélange technique de couleurs à une application de style naïf.",
  "Illustration demi-page, planche pédagogique en 2 étapes, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Réinterpréter en couleurs vives"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Réinterpréter une scène haïtienne du quotidien à l'aide d'une palette de couleurs vives, inspirée de l'esprit de l'art naïf haïtien." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier, crayons de couleur ou peinture (eau), pinceaux si disponibles. Alternative : crayons de couleur uniquement, en travaillant la superposition pour intensifier les teintes." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis une scène simple de ton quotidien (marché, cour, jardin, rue) et prépare une palette d'au moins quatre couleurs, incluant au moins une primaire et une secondaire." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Esquisse légèrement les formes principales de ta scène, sans détail excessif."));
children.push(numberedPar("2. Prépare ta palette de couleurs en testant tes mélanges sur un brouillon."));
children.push(numberedPar("3. Applique tes couleurs en privilégiant l'intensité plutôt que le réalisme exact des teintes observées."));
children.push(numberedPar("4. Ajuste par superposition si une couleur te semble trop pâle ou insuffisamment vive."));
children.push(numberedPar("5. Prépare une courte justification de tes choix de couleurs (pourquoi ce rouge, ce bleu, cette combinaison)."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une composition colorée reconnaissable, utilisant une palette assumée d'au moins quatre couleurs, " +
  "accompagnée d'une justification claire des choix chromatiques.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La palette utilise au moins une couleur primaire et une couleur secondaire, correctement identifiées."));
children.push(bulletPar("Les couleurs sont appliquées avec intention plutôt qu'au hasard."));
children.push(bulletPar("L'élève peut justifier ses choix de couleurs, y compris leur effet recherché."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier de couleur sans risque",
  [
    "La peinture à l'eau et les crayons de couleur s'utilisent sans danger particulier.",
    "Bien nettoyer pinceaux et mains après l'activité si de la peinture est utilisée.",
    "Aucun matériel coûteux n'est nécessaire : des crayons de couleur suffisent pour réaliser l'ensemble de " +
    "l'atelier.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C01-04",
  "Espace de production — ma palette et ma réinterprétation",
  "Un cadre vide, format portrait, avec une petite zone réservée pour tester la palette de couleurs et une " +
  "grande zone pour la composition finale, prévu pour que l'élève y réalise directement son travail dans le " +
  "manuel.",
  "Offrir un espace direct de production pour ancrer la pratique de la couleur dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, deux zones délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présente ta composition à un camarade sans lui expliquer tes choix. Peut-il deviner l'ambiance que tu as " +
  "voulu créer (joyeuse, calme, intense) rien qu'en regardant tes couleurs ? Discutez ensemble de ce qui rend " +
  "une palette de couleurs cohérente et intentionnelle.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Analyser une œuvre naïve haïtienne", "1.6"));
children.push(bodyPar(
  "Pour bien comprendre l'usage de la couleur dans l'art naïf haïtien, rien ne vaut l'analyse directe d'une " +
  "œuvre réelle, trouvée dans un livre, une reproduction ou une ressource fournie par ton enseignant.",
));
children.push(bodyPar("FICHE D'ANALYSE D'UNE ŒUVRE NAÏVE HAÏTIENNE — À compléter :", { bold: true }));
children.push(threeColTable(
  ["Élément observé", "Ce que je remarque", "Mon interprétation"],
  [
    ["Couleurs dominantes", "", ""],
    ["Couleurs primaires/secondaires identifiées", "", ""],
    ["Ambiance ou émotion suggérée", "", ""],
  ],
  [3000, 3400, 3600],
));
children.push(spacer(160));
children.push(bodyPar(
  "Si aucune reproduction n'est disponible en classe, décris de mémoire une œuvre haïtienne aux couleurs " +
  "vives que tu as déjà vue (peinture, artisanat, tissu), et applique la même grille d'analyse.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Le cercle chromatique organise les couleurs primaires (rouge, jaune, bleu) et secondaires (orange, " +
    "vert, violet).",
    "Mélanger, superposer et agencer sont trois façons différentes de manipuler la couleur.",
    "Une couleur communique aussi une impression : couleurs chaudes et couleurs froides suggèrent des " +
    "ambiances différentes.",
    "L'art naïf haïtien se caractérise par des couleurs vives et des formes simplifiées ; Casimir Laurent et " +
    "Préfète Duffaut en sont deux exemples cités par le programme officiel.",
    "Réinterpréter une scène en couleurs vives suppose de justifier ses choix, pas seulement de les " +
    "appliquer.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Nommer les couleurs primaires et expliquer comment obtenir les couleurs secondaires.",
    "☐ Mélanger, superposer et agencer des couleurs de façon maîtrisée.",
    "☐ Expliquer l'effet d'une couleur chaude ou froide sur une image.",
    "☐ Analyser une œuvre naïve haïtienne à partir de sa palette de couleurs.",
    "☐ Réinterpréter une scène avec une palette de couleurs vives et justifiée.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : couleur primaire, couleur secondaire, cercle chromatique, teinte, psychologie de " +
    "la couleur, art naïf.",
    "Vocabulaire clé à maîtriser : couleur primaire, couleur secondaire, cercle chromatique, palette.",
    "Avant l'évaluation, vérifie que tu peux : construire un cercle chromatique simple ; expliquer la " +
    "différence entre couleur chaude et couleur froide ; citer un trait caractéristique de l'art naïf " +
    "haïtien.",
    "Rappel officiel : l'évaluation de ce chapitre est formative, centrée sur la justesse chromatique de tes " +
    "productions [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : couleur " +
  "primaire · couleur secondaire · cercle chromatique · teinte · art naïf.",
  { italics: true },
));
children.push(numberedPar("1. Une couleur qui ne peut être obtenue par aucun mélange s'appelle une ......................"));
children.push(numberedPar("2. Une couleur obtenue en mélangeant deux couleurs primaires s'appelle une ......................"));
children.push(numberedPar("3. La représentation circulaire organisant les couleurs s'appelle le ......................"));
children.push(numberedPar("4. Une variante plus claire ou plus foncée d'une couleur s'appelle une ......................"));
children.push(numberedPar("5. Le courant artistique aux couleurs vives et aux formes simplifiées s'appelle l'......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Cite les trois couleurs primaires et les trois couleurs secondaires du cercle chromatique."));
children.push(numberedPar("2. Classe les couleurs suivantes en couleurs chaudes ou couleurs froides : rouge, bleu, jaune, vert, orange, violet."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Explique, en trois étapes, comment tu obtiendrais la couleur verte à partir de couleurs primaires."));
children.push(numberedPar("2. Pourquoi est-il conseillé de tester un mélange de couleurs sur un brouillon avant de l'appliquer sur sa production finale ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Choisis une émotion (joie, calme, colère) et propose une palette de couleurs qui, selon toi, l'exprime bien. Justifie ton choix."));
children.push(numberedPar("2. Un camarade a réalisé une composition dont toutes les couleurs semblent grisâtres et ternes. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("3. À partir d'une œuvre naïve haïtienne que tu as observée (en classe ou par toi-même), décris sa palette de couleurs dominante et explique l'effet qu'elle produit sur toi."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis d'achever le parcours entamé en 7e AF (le trait) et poursuivi en 8e AF (la valeur) en " +
  "introduisant la couleur : comprendre le cercle chromatique, mélanger et agencer des couleurs avec méthode, " +
  "reconnaître l'effet psychologique d'une couleur, découvrir l'usage vif de la couleur dans l'art naïf " +
  "haïtien à travers des exemples comme Casimir Laurent et Préfète Duffaut, et réinterpréter une scène en " +
  "assumant une palette de couleurs justifiée. Cette maîtrise de la couleur clôt le cycle de l'observation et " +
  "prépare des analyses artistiques plus complexes dans les chapitres suivants.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "couleur primaire · couleur secondaire · cercle chromatique · teinte · palette · art naïf · Casimir Laurent · Préfète Duffaut.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C01-05",
  "Patrimoine — palette inspirée de l'art naïf haïtien",
  "Une palette de couleurs vives (rouges, jaunes, bleus, verts) présentée comme un nuancier inspiré de l'art " +
  "naïf haïtien, sans reproduire une œuvre précise ni attribuer une couleur exacte à un artiste nommé.",
  "Ancrer visuellement l'intensité chromatique caractéristique de l'art naïf haïtien.",
  "Illustrer la palette de couleurs vives évoquée dans le chapitre, de façon générale et non attribuée.",
  "Illustration demi-page, nuancier de couleurs vives, cohérent avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C01-06",
  "Synthèse — La couleur et l'art haïtien",
  "Une carte mentale simple centrée sur « Couleur », avec des branches vers : cercle chromatique, mélange, " +
  "psychologie de la couleur, art naïf haïtien, réinterprétation.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 1, "Manuel_EEA_9AF_Chapitre1.docx");
