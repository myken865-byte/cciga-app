// Manuel d'EEA 8e AF — Chapitre 4 : Sur les traces du patrimoine
// (champ officiel : Arts plastiques et visuels, Axe 4 — Valorisation du
// patrimoine / Unite d'apprentissage 4 : Activites specifiques au
// developpement de la creativite et de decouverte du patrimoine).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.40/63 : tableau de progression annuelle (4e periode, arts
//     plastiques) — verifie en direct le 2026-08-23. Cite verbatim :
//     "Reappropriation du patrimoine : visites de sites historiques" ;
//     "Illustration de documentaires ou textes en rapport avec le
//     patrimoine." ; "Creation a partir d'elements lies au patrimoine" ;
//     "L'art, l'artisanat et la societe." ; "Connaissance du patrimoine et
//     projets autour des metiers de l'art et/ou du patrimoine."
//   - p.49-51/63 : Unite d'apprentissage 4 (tableau complet), verifiee en
//     direct le 2026-08-23. Competences ciblees officielles de l'unite :
//     C1-C8 (toutes) ; ce chapitre reprend le sous-ensemble C3, C4, C5, C8
//     deja retenu en Phase 0 pour ce chapitre precis (meme sous-ensemble
//     que le Chapitre 4 de la 7e AF, qui utilisait la meme unite pour sa
//     portion "illustrations/BD a partir de l'imaginaire"). Savoir cite
//     verbatim (source, avec attribution UNESCO deja presente dans le
//     document officiel) : « Le patrimoine etant l'heritage du passe dont
//     nous profitons aujourd'hui et que nous transmettons aux generations
//     a venir. Notre patrimoine culturel et naturel sont deux sources
//     irremplacables de vie et d'inspiration. Le patrimoine inclut
//     notamment les oeuvres qui ont une valeur universelle exceptionnelle
//     du point de vue de l'Histoire, des arts et de la science, des points
//     de vue esthetique, ethnologique ou anthropologique. » (UNESCO, 2008)
//     — coquilles d'OCR mineures corrigees ("inclu" -> "inclut") sans
//     modifier le sens ; attribution et annee conservees telles que dans
//     la source.
//   - Activite officielle citee verbatim (p.50) : "Reappropriation du
//     patrimoine par visites de sites historiques. Visites d'ateliers, de
//     laboratoires, de chantiers, de galeries d'art, de musees ou d'autres
//     lieux (publics ou prives) pour decouvrir les innovations, les
//     explorations creatives et les expressions du patrimoine sur le plan
//     local, national et mondial."
//
// STATUT DE L'ATTRIBUTION ANNEE : le tableau de progression (p.40) place
// a la fois "illustrations/BD (imaginaire)" ET "reappropriation du
// patrimoine (visites)" dans le meme bloc "4e periode" — sans les separer
// explicitement par annee. Le Chapitre 4 de la 7e AF (deja finalise, NON
// modifie ici) a documente que "visites de sites historiques" etait
// reservee a la 8e AF (00_PHASE0/04_MATRICE_EEA_8AF.md), et ce chapitre
// applique cette meme reconstruction, marquee [ADAPTATION DE LECTURE - A
// RECONFIRMER]. Le contenu lui-meme (reappropriation du patrimoine par
// visites) est verbatim present dans la source (p.40 et p.49-51).
//
// CONTROLE DU PASSAGE 7e -> 8e AF (section 3 du prompt d'execution) : le
// Chapitre 4 de la 7e AF a traite le patrimoine par la voie de
// l'imaginaire (contes, proverbes, personnages traditionnels, illustration
// caricaturale/BD) — un patrimoine reconstruit en images, sans sortie du
// cadre de la classe. Ce Chapitre 4 de la 8e AF part de cet acquis (rappel
// bref, section 4.1) et approfondit reellement vers l'observation directe
// du patrimoine reel : visite (sur le terrain si possible, ou a defaut
// documentaire/photographique), carnet de visite, creation inspiree d'un
// site observe — une progression nette de l'imaginaire vers l'observation
// et la documentation. Aucune anticipation de la 9e AF : les "metiers de
// l'art et du patrimoine" et l'"entrepreneuriat culturel" (theme annuel
// dominant de la 9e AF selon 00_PHASE0/05_MATRICE_EEA_9AF.md) ne sont
// qu'evoques tres brievement ici (mention simple, non developpee), et
// aucun site patrimonial haitien precis (ex. architecture Gingerbread,
// sites UNESCO/ISPAN, reserves a la 9e AF) n'est nomme.
//
// Adaptations de securite : aucun outil dangereux ; recommandations de
// prudence generales pour une sortie scolaire encadree (rester en groupe,
// respecter les lieux visites, alternative documentaire si aucune sortie
// n'est possible).
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
  4,
  "Sur les traces du patrimoine",
  "L'an dernier, tu as imaginé le patrimoine haïtien à travers des contes et des dessins. Cette année, tu vas " +
  "aller à sa rencontre directement : observer un lieu chargé d'histoire, le noter, le dessiner, et créer à " +
  "partir de ce que tu auras vraiment vu.",
  [
    "Expliquer ce qu'est le patrimoine et pourquoi il mérite d'être connu.",
    "Observer et documenter un lieu ou un objet patrimonial dans un carnet de visite.",
    "Créer une œuvre inspirée d'un site ou d'un élément du patrimoine observé.",
    "Reconnaître quelques métiers liés à l'art et au patrimoine.",
    "Présenter et justifier une production inspirée du patrimoine.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Une classe de 8e AF se prépare à visiter un lieu historique de sa commune — un vieux " +
  "bâtiment, une place publique ancienne, ou un site que les élèves connaissent de vue sans jamais l'avoir " +
  "vraiment observé. Avant de partir, leur enseignant leur demande : « Que va-t-on emporter pour ne rien " +
  "oublier de ce que nous allons voir ? » Ce chapitre t'apprend à préparer, réaliser et prolonger une telle " +
  "visite par la création artistique.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Patrimoine — ensemble des biens (matériels) et des pratiques (immatériels) hérités du passé et transmis aux générations suivantes."));
children.push(bulletPar("Réappropriation du patrimoine — démarche par laquelle on redécouvre et fait sien un élément du patrimoine, par l'observation directe et la création."));
children.push(bulletPar("Site historique — lieu (bâtiment, place, quartier) porteur d'une histoire reconnue par la communauté."));
children.push(bulletPar("Carnet de visite — support sur lequel on note, dessine et documente ce que l'on observe pendant une sortie."));
children.push(bulletPar("Portfolio — ensemble organisé de productions et de traces d'un travail, réuni pour montrer une démarche complète."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : le patrimoine imaginé", "4.1"));
children.push(bodyPar(
  "L'an dernier, tu as découvert le patrimoine haïtien par l'imaginaire : contes, proverbes et personnages " +
  "traditionnels transformés en illustrations et en bandes dessinées. Cette année, tu vas aller plus loin : " +
  "au lieu d'imaginer le patrimoine, tu vas l'observer directement, tel qu'il existe vraiment autour de toi.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce que le patrimoine ?", "4.2"));
children.push(bodyPar(
  "Le patrimoine, ce n'est pas seulement un vieux bâtiment ou un objet ancien : c'est tout ce que les " +
  "générations précédentes nous ont laissé et que nous choisissons de connaître, de protéger et de " +
  "transmettre à notre tour.",
));
children.push(calloutBox(
  "PATRIMOINE — Une définition de référence",
  [
    "« Le patrimoine est l'héritage du passé dont nous profitons aujourd'hui et que nous transmettons aux " +
    "générations à venir. Notre patrimoine culturel et naturel sont deux sources irremplaçables de vie et " +
    "d'inspiration. Le patrimoine inclut notamment les œuvres qui ont une valeur universelle exceptionnelle " +
    "du point de vue de l'Histoire, des arts et de la science, des points de vue esthétique, ethnologique ou " +
    "anthropologique. » — UNESCO, 2008 (définition citée dans le programme officiel).",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, SAUGE,
));
children.push(spacer(200));
children.push(bodyPar(
  "Le patrimoine peut être matériel (un bâtiment, un objet, une œuvre d'art) ou immatériel (un savoir-faire, " +
  "une fête, une pratique transmise oralement). Un site historique, un atelier d'artisan, une galerie d'art ou " +
  "un musée sont tous des lieux où le patrimoine se laisse observer directement.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C04-01",
  "Ouverture — Préparer une visite du patrimoine",
  "Un groupe d'élèves de 8e AF, carnet et crayon en main, devant un bâtiment ancien crédible d'une commune " +
  "haïtienne, sous la supervision d'un enseignant.",
  "Observer directement le patrimoine, c'est se préparer à en devenir le gardien.",
  "Ouvrir le chapitre sur une scène concrète de préparation à la visite patrimoniale.",
  "Illustration pleine largeur, scène de sortie scolaire haïtienne crédible, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Observer et documenter : le carnet de visite", "4.3"));
children.push(bodyPar(
  "Se réapproprier le patrimoine, ce n'est pas seulement le regarder : c'est le documenter, pour ne rien " +
  "oublier et pour nourrir une création future. Le carnet de visite est l'outil principal de cette démarche.",
));
children.push(calloutBox(
  "TECHNIQUE — Tenir un carnet de visite",
  [
    "1. Note la date, le lieu et une courte description de ce que tu observes.",
    "2. Fais un ou plusieurs croquis rapides des formes, détails ou motifs qui te marquent (une porte, une " +
    "façade, un objet, une texture).",
    "3. Ajoute des mots-clés : matériaux, couleurs, état du lieu, impressions ressenties.",
    "4. Si une visite réelle n'est pas possible, réalise le même travail à partir de photographies, de " +
    "documentaires ou de témoignages disponibles sur un lieu patrimonial de ta commune.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : un croquis rapide, même imparfait, vaut mieux qu'aucune trace — le carnet de visite " +
  "n'est pas un dessin final, c'est une mémoire de travail que tu pourras exploiter ensuite.",
  { italics: true },
));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Une sortie patrimoniale bien préparée",
  [
    "Une visite se fait toujours en groupe et sous la supervision d'un adulte responsable.",
    "On respecte les lieux visités : on ne touche pas aux objets fragiles, on ne dégrade rien.",
    "Si aucune sortie n'est organisée, l'alternative documentaire (photos, textes, témoignages) permet de " +
    "réaliser le même travail d'observation sans quitter la salle de classe.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C04-02",
  "Exemple analysé — une page de carnet de visite",
  "Une double page de carnet de visite illustrant la méthode : croquis rapide d'un détail architectural, " +
  "annotations (date, lieu, matériaux, impressions).",
  "Le carnet de visite transforme une observation en documentation exploitable.",
  "Donner un exemple visuel clair de la méthode décrite dans le texte.",
  "Illustration demi-page, exemple de carnet annoté, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Créer à partir du patrimoine observé", "4.4"));
children.push(bodyPar(
  "Une fois le carnet rempli, la démarche de réappropriation se poursuit par la création : transformer ce " +
  "que tu as observé en une œuvre personnelle, qui garde une trace du lieu tout en portant ton propre regard.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Le patrimoine, l'art et les métiers",
  [
    "Derrière un site patrimonial se trouvent souvent des personnes dont le métier est de le faire vivre : " +
    "artisans restaurateurs, guides, artistes, chercheurs en patrimoine.",
    "Créer à partir d'un site observé, c'est aussi une première façon de comprendre ce que ces métiers " +
    "protègent et transmettent.",
    "Nous découvrirons ces métiers plus en détail dans les années suivantes ; pour l'instant, retiens " +
    "simplement qu'ils existent et qu'ils sont utiles à la communauté.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C04-03",
  "Démonstration technique — du carnet à l'œuvre",
  "Une planche en deux étapes montrant un détail observé dans un carnet de visite (par exemple une façade ou " +
  "un motif), puis transformé en une composition artistique personnelle.",
  "Une observation documentée devient la base d'une création originale.",
  "Montrer concrètement le passage de l'observation au carnet, puis à l'œuvre créée.",
  "Illustration demi-page, planche pédagogique en 2 étapes, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Carnet de visite et création patrimoniale"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Observer et documenter un lieu ou un élément patrimonial, puis réaliser une création artistique qui s'en inspire." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Carnet ou feuilles, crayon, feutres. Si disponible : appareil photo ou téléphone pour documenter une visite réelle." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Réalise une visite réelle d'un lieu patrimonial de ta commune si elle est organisée par ton école ; sinon, choisis un lieu patrimonial que tu connais et documente-le à partir de photographies, de souvenirs précis ou de récits de proches." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Avant la visite (ou la recherche), prépare ton carnet : une page pour les notes, une page pour les croquis."));
children.push(numberedPar("2. Pendant l'observation, note la date, le lieu, et fais au moins deux croquis rapides de détails qui te marquent."));
children.push(numberedPar("3. Ajoute des mots-clés décrivant les matériaux, les couleurs et tes impressions."));
children.push(numberedPar("4. À partir de ton carnet, réalise une création artistique inspirée du lieu observé (dessin, composition, collage)."));
children.push(numberedPar("5. Prépare une courte présentation expliquant le lien entre ta création et le lieu observé."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Un carnet de visite documenté et une création artistique inspirée d'un lieu ou d'un élément du patrimoine, " +
  "accompagnés d'une courte présentation justifiant le lien entre les deux.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Le carnet de visite contient des notes et des croquis clairs, datés et localisés."));
children.push(bulletPar("La création artistique montre un lien visible avec le lieu ou l'élément observé."));
children.push(bulletPar("L'élève peut expliquer et justifier ce lien lors de la présentation."));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-8AF-C04-04",
  "Espace de production — mon carnet de visite",
  "Un cadre vide, format portrait, imitant une double page de carnet (une zone pour les notes, une zone pour " +
  "les croquis), prévu pour que l'élève y réalise directement son travail dans le manuel.",
  "Offrir un espace direct de production pour ancrer la pratique du carnet de visite dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, deux zones délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présente ta création à un camarade sans lui montrer ton carnet de visite. Peut-il deviner quel type de " +
  "lieu t'a inspiré ? Discutez ensemble de ce qui rend un lien entre une observation réelle et une œuvre " +
  "artistique visible et convaincant.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Le patrimoine est l'héritage du passé que nous transmettons aux générations à venir ; il peut être " +
    "matériel ou immatériel.",
    "La réappropriation du patrimoine passe par l'observation directe d'un lieu ou d'un objet, et non plus " +
    "seulement par l'imaginaire.",
    "Le carnet de visite permet de documenter une observation par des notes et des croquis.",
    "Une création artistique peut s'inspirer directement d'un lieu ou d'un élément patrimonial observé.",
    "Des métiers existent pour faire vivre et transmettre le patrimoine.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer ce qu'est le patrimoine et donner un exemple matériel et un exemple immatériel.",
    "☐ Tenir un carnet de visite avec des notes et des croquis.",
    "☐ Créer une œuvre inspirée d'un lieu ou d'un élément patrimonial observé.",
    "☐ Nommer au moins un métier lié à l'art ou au patrimoine.",
    "☐ Présenter et justifier ma création devant la classe.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : patrimoine matériel/immatériel, réappropriation du patrimoine, carnet de visite, " +
    "portfolio.",
    "Vocabulaire clé à maîtriser : patrimoine, réappropriation, site historique, carnet de visite.",
    "Avant l'évaluation, vérifie que tu peux : définir le patrimoine avec tes mots ; décrire les étapes d'un " +
    "carnet de visite ; expliquer comment une observation devient une création.",
    "Question rapide de vérification : cite un lieu de ta commune que tu considères comme faisant partie du " +
    "patrimoine, et explique pourquoi.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(4));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "patrimoine · réappropriation · carnet de visite · site historique · portfolio.",
  { italics: true },
));
children.push(numberedPar("1. Un lieu porteur d'une histoire reconnue par la communauté s'appelle un ......................"));
children.push(numberedPar("2. L'ensemble des biens et pratiques hérités du passé et transmis aux générations suivantes s'appelle le ......................"));
children.push(numberedPar("3. Redécouvrir et faire sien un élément du passé par l'observation directe, c'est la ......................"));
children.push(numberedPar("4. Le support sur lequel on note et dessine ce que l'on observe pendant une sortie s'appelle un ......................"));
children.push(numberedPar("5. Un ensemble organisé de productions réunies pour montrer une démarche complète s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Cite deux exemples de patrimoine matériel et un exemple de patrimoine immatériel."));
children.push(numberedPar("2. Cite deux types de lieux (autres qu'un site historique) où l'on peut observer directement le patrimoine, selon ce chapitre."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment tu préparerais et tiendrais un carnet de visite lors d'une sortie patrimoniale."));
children.push(numberedPar("2. Pourquoi le carnet de visite est-il utile même si le dessin qu'on y fait n'est pas parfait ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare la façon dont le patrimoine était abordé en 7e AF (par l'imaginaire) et en 8e AF (par l'observation directe) : qu'est-ce qui change réellement ?"));
children.push(numberedPar("2. Un camarade n'a pas pu participer à la sortie patrimoniale de sa classe. Propose-lui une alternative pour réaliser tout de même le carnet de visite."));
children.push(numberedPar("3. Choisis un lieu patrimonial de ta commune et explique comment tu t'y prendrais pour créer une œuvre qui s'en inspire, en justifiant tes choix."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la réappropriation du patrimoine par l'observation directe : comprendre " +
  "ce qu'est le patrimoine, tenir un carnet de visite pour documenter un lieu ou un objet observé, créer une " +
  "œuvre inspirée de cette observation, et reconnaître qu'il existe des métiers pour faire vivre le " +
  "patrimoine. Cette capacité à observer et documenter le réel prépare des démarches créatives encore plus " +
  "approfondies dans les années suivantes.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "patrimoine · réappropriation · site historique · carnet de visite · portfolio.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C04-05",
  "Patrimoine — un carnet de visite complété",
  "Une double page de carnet de visite complète et variée : notes, croquis multiples, mots-clés, prête à " +
  "servir de base à une création.",
  "Ancrer visuellement l'aboutissement du travail de documentation du chapitre.",
  "Illustrer un exemple achevé de carnet de visite comme référence pour l'élève.",
  "Illustration demi-page, double page de carnet richement annotée, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-8AF-C04-06",
  "Synthèse — Sur les traces du patrimoine",
  "Une carte mentale simple centrée sur « Patrimoine », avec des branches vers : matériel/immatériel, " +
  "réappropriation, carnet de visite, création inspirée, métiers du patrimoine.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 32, "Manuel_EEA_8AF_Chapitre4.docx");
