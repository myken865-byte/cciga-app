// Manuel d'ETAP 9e AF — Chapitre 6 : Modéliser avec le numérique : CAO et FAO
// (Unité tronc-commun « Nouvelles technologies du numérique en 9e année du
// fondamental », p.62 du document source `ETAP (3).pdf`).
//
// ORIGINE : cette unité a été découverte après le verrouillage de la Phase
// 0 (rapport d'exécution du Chapitre 4, 2026-08-22), documentée dans
// `GATE_5_VS_6_CHAPITRES_ETAP_9AF.md` comme gate bloquant nécessitant un
// arbitrage utilisateur (Option A / B / C). L'utilisateur a tranché pour
// l'Option A le 2026-08-28 (voir section « Résolution du gate » du même
// fichier) : un 6e chapitre dédié est créé, sur le modèle des chapitres
// « champ » (1 à 4) plutôt que sur le modèle synthèse du Chapitre 5.
//
// CONTENU OFFICIEL VÉRIFIÉ (p.62, [OFFICIEL — SOURCE VÉRIFIÉE]) :
//   Compétence : « Modéliser des solutions techniques à l'aide des outils
//   numériques. »
//   Savoirs/savoir-faire : explorer des logiciels de Conception Assistée
//   par Ordinateur (CAO), de Fabrication Assistée par Ordinateur (FAO) et
//   de modelage volumique, pour les décrire et expliciter leur
//   fonctionnement ; concevoir, modeler, créer des objets en utilisant ces
//   logiciels.
//   Activités : exploration collaborative de logiciels CAO/FAO ; tableaux
//   comparatifs des logiciels ; conceptions 2D et 3D d'objets — avec un
//   lien explicite et fortement encouragé vers la modélisation des outils
//   techniques des métiers de la mer, de l'agriculture, du recyclage
//   générateur de revenus (Chapitres 1-3) ; usage préférentiel
//   d'applications libres de droits : 3D Builder, TinkerCAD, FreeCAD,
//   Blender, Google SketchUp.
//   Modalités/critères d'évaluation : identiques aux 4 autres unités
//   (exposés collectifs, analyse documentaire individuelle, tests de
//   connaissances ; implication, progrès, maîtrise de compétence).
//
// ADAPTATIONS DE SÉCURITÉ / ACCESSIBILITÉ (héritées des Chapitres 1-5) :
// la FAO (fabrication assistée par ordinateur) implique en toute rigueur
// des machines réelles (imprimante 3D, découpe laser/CNC) rarement
// disponibles dans une école haïtienne moyenne — ce chapitre présente donc
// la FAO comme un PRINCIPE À COMPRENDRE (comment un modèle numérique guide
// une machine de fabrication), jamais comme une activité de fabrication
// réelle obligatoire. De même, aucun logiciel n'est présumé disponible :
// chaque activité propose une alternative papier/carton complète, sans
// ordinateur ni Internet, conformément à la règle d'accessibilité déjà
// appliquée dans tout le manuel.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_PROJET_FILL, BOX_PROJET_LINE,
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  VERT, CUIVRE, GRIS,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  6,
  "Modéliser avec le numérique : CAO et FAO",
  "Avant de fabriquer un objet — une pompe simple, un bac de recyclage, un outil agricole — on peut d'abord " +
  "le concevoir à l'écran. Ce chapitre t'apprend à explorer des logiciels de conception et de fabrication " +
  "assistées par ordinateur, pour modéliser en 2D et en 3D des objets techniques que tu as déjà rencontrés " +
  "cette année.",
  [
    "Expliquer ce que sont la CAO et la FAO, et à quoi elles servent.",
    "Explorer et comparer plusieurs logiciels libres de modélisation.",
    "Concevoir un modèle 2D d'un objet technique déjà étudié.",
    "Concevoir un modèle 3D (volumique) d'un objet technique.",
    "Relier la modélisation numérique aux outils des Chapitres 1 à 3.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Une équipe qui a conçu, au Chapitre 2, un objet technique utilisant une énergie " +
  "renouvelable, souhaite maintenant en dessiner un plan précis avant de le fabriquer. Un(e) enseignant(e) " +
  "leur propose d'utiliser un logiciel de modélisation, gratuit, pour représenter leur objet avant de le " +
  "réaliser en carton. Ce chapitre t'aide à comprendre comment.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("CAO (Conception Assistée par Ordinateur) — utilisation d'un logiciel pour dessiner et concevoir un objet avant de le fabriquer."));
children.push(bulletPar("FAO (Fabrication Assistée par Ordinateur) — utilisation d'un modèle numérique pour guider une machine qui fabrique réellement l'objet (imprimante 3D, découpe, etc.)."));
children.push(bulletPar("Modélisation — action de représenter un objet réel ou imaginé sous une forme numérique (2D ou 3D)."));
children.push(bulletPar("Modèle 2D — représentation plate (longueur et largeur) d'un objet, comme un plan."));
children.push(bulletPar("Modèle volumique (3D) — représentation en volume (longueur, largeur, hauteur) d'un objet, que l'on peut faire tourner à l'écran."));
children.push(bulletPar("Logiciel libre — logiciel que l'on peut utiliser gratuitement et légalement."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce que la CAO ? Qu'est-ce que la FAO ?", "6.1"));
children.push(bodyPar(
  "La CAO permet de concevoir un objet à l'écran, avec précision, avant de le fabriquer. La FAO va plus loin : " +
  "elle utilise ce modèle numérique pour piloter une machine qui fabrique réellement l'objet. Les deux sont " +
  "liées, mais distinctes : on peut faire de la CAO sans jamais fabriquer l'objet réellement (par exemple pour " +
  "vérifier une idée), alors que la FAO suppose toujours une machine de fabrication.",
));
children.push(calloutBox(
  "DÉCOUVRIR — De l'idée à l'objet, en trois étapes",
  [
    "1. L'idée : je sais quel objet je veux réaliser (par exemple, un support pour une pompe solaire).",
    "2. La CAO : je le dessine et je le modélise précisément avec un logiciel, en 2D puis en 3D.",
    "3. La FAO (si une machine est disponible) : le modèle numérique guide une machine qui fabrique l'objet " +
    "réellement — sinon, le modèle numérique reste un plan précis pour une fabrication manuelle.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C06-01",
  "Ouverture — Modéliser un objet avant de le fabriquer",
  "Un(e) élève de 9e AF assis(e) devant un ordinateur ou une tablette, modélisant à l'écran un objet technique " +
  "simple (support, bac, petit outil), avec une esquisse papier du même objet posée à côté.",
  "La modélisation numérique et le dessin papier représentent la même démarche de conception.",
  "Ancrer l'ouverture du chapitre dans une scène concrète reliant numérique et pratique manuelle.",
  "Illustration pleine largeur, scène de classe ou d'atelier scolaire haïtien, cohérente avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Explorer des logiciels de CAO et de FAO", "6.2"));
children.push(bodyPar(
  "Il existe plusieurs logiciels gratuits (libres) permettant de faire de la CAO. En équipe, avec un adulte, " +
  "vous pouvez explorer ceux qui sont réellement disponibles pour vous, et comparer ce qu'ils permettent de " +
  "faire.",
));
children.push(threeColTable(
  ["Logiciel", "Type de modélisation", "Remarque"],
  [
    ["3D Builder", "Modélisation 3D simple", "Souvent déjà installé sur les ordinateurs Windows"],
    ["TinkerCAD", "Modélisation 3D simple, en ligne", "Pensé pour l'apprentissage, prise en main rapide"],
    ["FreeCAD", "Modélisation 3D technique", "Plus complet, adapté aux pièces techniques précises"],
    ["Blender", "Modélisation 3D avancée", "Très complet, davantage utilisé pour l'image et l'animation"],
    ["Google SketchUp", "Modélisation 3D simple", "Souvent utilisé pour des maquettes de bâtiments ou objets"],
  ],
  [2400, 3400, 3600],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces cinq logiciels sont cités comme exemples d'applications libres de droits couramment utilisées pour la " +
  "CAO. Aucun n'est obligatoire : utilisez celui qui est réellement disponible pour vous, ou aucun (voir la " +
  "variante papier, section 6.6).",
  { italics: true },
));
children.push(spacer(200));

children.push(calloutBox(
  "OUTIL — Tableau comparatif de logiciels (activité collaborative)",
  [
    "En équipe, choisissez deux logiciels parmi ceux du tableau ci-dessus (ou deux autres que vous connaissez) " +
    "et comparez-les selon trois critères : facilité de prise en main, précision obtenue, besoin ou non d'une " +
    "connexion Internet.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, GRIS,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C06-02",
  "Exploration collaborative de logiciels de CAO",
  "Un petit groupe d'élèves autour d'un ou deux ordinateurs/tablettes, comparant l'interface de deux logiciels " +
  "de modélisation différents, avec un tableau comparatif rempli à la main à côté.",
  "Comparer plusieurs logiciels permet de choisir l'outil le plus adapté à un projet donné.",
  "Illustrer concrètement l'activité d'exploration collaborative attendue par le programme.",
  "Illustration demi-page, scène de classe haïtienne, ton collaboratif et curieux.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Concevoir un modèle 2D d'un objet déjà rencontré", "6.3"));
children.push(bodyPar(
  "Un modèle 2D représente un objet à plat, comme un plan technique. C'est souvent la première étape avant de " +
  "passer au volume (3D). Le programme encourage explicitement à modéliser des outils déjà rencontrés dans " +
  "les Chapitres 1 à 3 : un outil des métiers de la mer, un objet technique du Chapitre 2 (énergie " +
  "renouvelable ou recyclage), ou un outil agricole du Chapitre 3.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Ce que montre un modèle 2D",
  [
    "Les formes principales de l'objet, vues de face, de dessus ou de côté.",
    "Les dimensions approximatives (longueur, largeur) de chaque partie.",
    "La position des éléments les uns par rapport aux autres.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C06-03",
  "Exemple analysé — d'un croquis papier à un modèle 2D",
  "Deux vues côte à côte du même objet technique simple (par exemple un support de pompe) : à gauche, un " +
  "croquis fait main sur papier quadrillé ; à droite, le même objet modélisé en 2D dans un logiciel.",
  "Un modèle 2D numérique reprend exactement les mêmes informations qu'un bon croquis papier, en plus précis.",
  "Montrer que le numérique prolonge une compétence déjà pratiquée à la main, sans la remplacer.",
  "Illustration demi-page, composition en deux vues, cohérente avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Concevoir un modèle 3D (volumique)", "6.4"));
children.push(bodyPar(
  "Le modèle 3D ajoute la troisième dimension (la hauteur ou l'épaisseur) au modèle 2D. Il permet de faire " +
  "tourner l'objet à l'écran pour le voir sous tous les angles, avant même de le fabriquer.",
));
children.push(calloutBox(
  "MÉTHODE — Passer du modèle 2D au modèle 3D",
  [
    "1. Partir du modèle 2D déjà réalisé (section 6.3).",
    "2. Ajouter une épaisseur ou une hauteur à chaque forme plate (« extrusion » — donner du volume à une " +
    "forme plate).",
    "3. Vérifier, en faisant tourner le modèle, que les proportions restent cohérentes.",
    "4. Comparer le modèle 3D à l'objet réel déjà réalisé (Chapitres 1 à 3) : correspond-il ?",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, "3A2A57",
));
children.push(spacer(200));

children.push(calloutBox(
  "NUMÉRIQUE — Et la FAO, dans tout ça ?",
  [
    "Si une imprimante 3D ou une machine de découpe est disponible : le modèle 3D peut être envoyé " +
    "directement à la machine, qui fabrique l'objet — c'est la FAO en action.",
    "Si aucune machine n'est disponible (le cas le plus fréquent) : le modèle 3D reste un plan très précis, " +
    "utile pour fabriquer l'objet à la main, avec des matériaux scolaires simples — la FAO reste alors un " +
    "principe à comprendre, pas une étape obligatoire.",
  ],
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE, "1F2A33",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C06-04",
  "Exemple analysé — du modèle 3D à l'objet fabriqué",
  "Trois étapes illustrées côte à côte : un modèle 3D à l'écran, une flèche vers une machine de fabrication " +
  "générique (représentée simplement, sans marque précise), puis l'objet fini équivalent réalisé à la main en " +
  "carton, pour montrer les deux issues possibles (FAO ou fabrication manuelle).",
  "Le modèle 3D peut guider une machine réelle ou simplement une fabrication manuelle précise.",
  "Montrer clairement que la FAO est une possibilité, pas une obligation, sans exclure ceux qui n'y ont pas accès.",
  "Illustration pleine largeur, schéma en trois étapes, cohérent avec la charte ETAP.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Variante accessible : modéliser sans ordinateur", "6.5"));
children.push(bodyPar(
  "Si aucun ordinateur ni tablette n'est disponible, la démarche de modélisation reste entièrement possible " +
  "sur papier — la compétence visée (modéliser une solution technique) ne dépend pas d'un outil précis.",
));
children.push(calloutBox(
  "VARIANTE — Modélisation papier/carton, sans ordinateur ni Internet",
  [
    "Modèle 2D papier : dessiner l'objet à l'échelle sur papier quadrillé, avec les dimensions notées.",
    "Modèle 3D « papier » : construire une petite maquette en carton ou en papier plié, respectant les mêmes " +
    "proportions que le modèle 2D.",
    "Cette variante remplit exactement la même fonction pédagogique que la modélisation numérique : elle " +
    "permet de vérifier une idée avant de fabriquer l'objet réel.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Relier la modélisation aux outils des Chapitres 1 à 3", "6.6"));
children.push(bodyPar(
  "Le programme encourage explicitement à réutiliser les outils techniques déjà rencontrés cette année comme " +
  "objets à modéliser. Ce tableau propose un exemple par champ déjà étudié.",
));
children.push(threeColTable(
  ["Chapitre d'origine", "Exemple d'objet à modéliser", "Ce que le modèle doit montrer"],
  [
    ["1 — Métiers de la mer", "Un outil ou un contenant lié à la pêche ou à la transformation des produits de la mer", "Forme générale et dimensions principales"],
    ["2 — Recyclage/énergies", "Le système technique conçu (utilisant une énergie renouvelable ou des objets recyclés)", "Assemblage des pièces principales"],
    ["3 — Agriculture", "Un outil agricole simple utilisé dans le projet du Chapitre 3", "Proportions et zones de prise en main"],
  ],
  [2600, 3800, 3000],
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-9AF-C06-05",
  "Espace de production — mon modèle 2D et 3D",
  "Un cadre vide, format portrait, structuré en deux zones (modèle 2D à dessiner / notes sur le passage au " +
  "modèle 3D), prévu pour que l'élève y réalise directement sa modélisation d'un objet des Chapitres 1 à 3.",
  "Offrir un espace direct de production pour la modélisation 2D puis 3D d'un objet déjà rencontré.",
  "Espace de production dédié, conforme à la charte ETAP.",
  "Cadre simple, bordure fine cuivre, deux zones délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de projet collectif — Modéliser un objet technique de l'année"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Explorer un logiciel de CAO (ou la variante papier), puis concevoir un modèle 2D et un modèle 3D d'un objet technique déjà rencontré aux Chapitres 1, 2 ou 3." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Ordinateur ou tablette avec un logiciel libre de CAO, si disponible (section 6.2). Sinon : papier quadrillé, carton, ciseaux, règle (variante section 6.5)." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Équipes de 3 à 4 élèves." }]));
children.push(bodyPar("ÉTAPES À SUIVRE :", { bold: true }));
children.push(numberedPar("1. Choisissez un objet technique déjà réalisé ou étudié aux Chapitres 1 à 3."));
children.push(numberedPar("2. Explorez un logiciel de CAO disponible, ou préparez votre matériel papier/carton."));
children.push(numberedPar("3. Réalisez un modèle 2D de l'objet, avec ses dimensions principales."));
children.push(numberedPar("4. Faites évoluer ce modèle en un modèle 3D (numérique ou maquette papier/carton)."));
children.push(numberedPar("5. Comparez votre modèle à l'objet réel (ou à sa description) : correspond-il ?"));
children.push(numberedPar("6. Présentez votre modèle à la classe en expliquant vos choix."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Modéliser reste toujours sûr",
  [
    "Aucune machine de fabrication (imprimante 3D, découpe) n'est manipulée directement par l'élève sans " +
    "supervision d'un adulte responsable.",
    "Si aucune machine n'est disponible, le modèle reste numérique ou en papier/carton — jamais une obligation " +
    "de fabrication réelle risquée.",
    "Aucune installation, aucun logiciel payant, aucune connexion Internet non supervisée n'est requis.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La CAO permet de concevoir et de modéliser un objet à l'écran avant de le fabriquer ; la FAO utilise ce " +
    "modèle pour guider une machine de fabrication réelle.",
    "Un modèle 2D représente un objet à plat ; un modèle 3D (volumique) ajoute la troisième dimension.",
    "Plusieurs logiciels libres existent (3D Builder, TinkerCAD, FreeCAD, Blender, Google SketchUp) ; aucun " +
    "n'est obligatoire.",
    "Sans ordinateur, la modélisation papier/carton remplit la même fonction pédagogique.",
    "Modéliser les outils déjà rencontrés aux Chapitres 1 à 3 relie ce chapitre au reste de l'année.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre t'a fait découvrir la CAO et la FAO, deux démarches liées à la conception numérique d'objets " +
  "techniques. Tu as exploré et comparé des logiciels libres, conçu un modèle 2D puis un modèle 3D d'un objet " +
  "déjà rencontré cette année, et compris que cette compétence reste accessible même sans ordinateur, grâce à " +
  "une variante papier/carton équivalente.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "CAO · FAO · modélisation · modèle 2D · modèle 3D · logiciel libre.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer la différence entre CAO et FAO.",
    "☐ Comparer au moins deux logiciels de modélisation selon des critères simples.",
    "☐ Réaliser un modèle 2D d'un objet technique.",
    "☐ Faire évoluer un modèle 2D vers un modèle 3D.",
    "☐ Relier un objet modélisé à un chapitre déjà étudié cette année.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : CAO, FAO, modélisation, modèle 2D, modèle 3D, logiciel libre.",
    "Avant l'évaluation, vérifie que tu peux : distinguer CAO et FAO ; expliquer ce qu'ajoute un modèle 3D par " +
    "rapport à un modèle 2D ; citer au moins deux logiciels libres de modélisation.",
    "Cette préparation reste un entraînement pédagogique original de ce manuel : aucune épreuve officielle " +
    "MENFP n'a été identifiée pour l'ETAP (voir RECHERCHE_EPREUVES_MENFP_ETAP_9AF.md).",
    "Modalités d'évaluation officielles pour cette unité [OFFICIEL — SOURCE VÉRIFIÉE, p.62] : exposés " +
    "collectifs, analyse documentaire individuelle, tests de connaissances ; critères : implication, progrès, " +
    "maîtrise de la compétence — identiques aux quatre autres unités de l'année.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(6));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : CAO · FAO " +
  "· modèle 2D · modèle 3D · logiciel libre.",
  { italics: true },
));
children.push(numberedPar("1. Un plan qui représente un objet à plat, en longueur et largeur, s'appelle un ......................"));
children.push(numberedPar("2. Une représentation en volume, qu'on peut faire tourner à l'écran, s'appelle un ......................"));
children.push(numberedPar("3. Concevoir un objet à l'écran avant de le fabriquer, c'est faire de la ......................"));
children.push(numberedPar("4. Utiliser un modèle numérique pour guider une machine de fabrication, c'est faire de la ......................"));
children.push(numberedPar("5. Un programme que l'on peut utiliser gratuitement et légalement est un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. La FAO suppose toujours : (a) un logiciel gratuit (b) une machine de fabrication (c) une connexion Internet"));
children.push(numberedPar("2. Un modèle 3D ajoute, par rapport à un modèle 2D : (a) une couleur (b) une troisième dimension (c) un prix"));
children.push(numberedPar("3. Parmi ces logiciels, lequel est cité comme exemple de logiciel libre de CAO : (a) TinkerCAD (b) un traitement de texte quelconque (c) un lecteur vidéo"));
children.push(numberedPar("4. Sans ordinateur disponible, la modélisation d'un objet : (a) devient impossible (b) reste possible sur papier/carton (c) doit être reportée à une autre année"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Vrai ou faux (justifie ta réponse)"));
children.push(numberedPar("1. « La FAO est obligatoire dans toute activité de modélisation numérique. »"));
children.push(numberedPar("2. « Le programme encourage à modéliser des objets déjà rencontrés dans d'autres chapitres de l'année. »"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / décision de projet"));
children.push(numberedPar("1. Ton équipe n'a accès à aucun ordinateur. Explique comment vous pourriez quand même réaliser un modèle 2D puis 3D d'un objet technique, en respectant la même démarche que ce chapitre."));
children.push(numberedPar("2. Choisis un objet des Chapitres 1, 2 ou 3 et explique brièvement ce qu'un modèle 3D de cet objet permettrait de vérifier avant sa fabrication réelle."));

// pageStart PROVISOIRE (68 = estimation par ratio mots/page des Chapitres
// 1-4, Word COM indisponible pour mesure directe au moment de la
// rédaction — à corriger dès que la pagination réelle du Chapitre 5 et de
// ce chapitre aura pu être mesurée).
await buildAndSave(children, 68, "Manuel_ETAP_9AF_Chapitre6.docx");
