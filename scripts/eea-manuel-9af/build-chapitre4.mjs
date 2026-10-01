// Manuel d'EEA 9e AF — Chapitre 4 : Métiers et institutions de la culture
// (champ officiel : Arts plastiques et visuels, Axe 4 — Institutions
// culturelles et métiers de l'art / Unité d'apprentissage 4).
//
// DERNIER CHAPITRE D'ARTS PLASTIQUES DU MANUEL 9e AF : intègre les acquis
// des Chapitres 1 à 3 dans une reflexion finale sur les metiers et
// institutions de la culture, avant la Partie II (Musique).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.36-37/63 : description complete et officielle de la COMPETENCE 8
//     ("Decouvrir les metiers et les opportunites des industries
//     culturelles et creatives"), transversale a tout le cycle — verifiee
//     en direct le 2026-08-23. Citee verbatim : "Identifier les
//     institutions culturelles et les differents profils de competences
//     mobilisees au sein de chaque organisation" ; "Classer les corps de
//     metiers, leurs exigences academiques et professionnelles, les
//     avantages et les responsabilites qui conditionnent leur pratique" ;
//     "L'eleve connait les principaux metiers et competences dans chaque
//     secteur et filiere artistique et culturel (competences artistiques,
//     techniques, administratifs, politiques, scientifiques)" ;
//     "Organisation d'expositions, de simulation et de salons des metiers
//     culturels en mettant l'accent sur les exigences pratiques, les
//     contraintes sociologiques et les opportunites economiques."
//     Evaluation : "Des evaluations sommatives".
//   - p.40/63 : TABLEAU DE PROGRESSION explicitement separe par annee (7e/
//     8e/9e AF) pour l'Axe 4 — verifie en direct (deja capture lors de la
//     redaction du Chapitre 4, manuel 8e AF, et reconfirme ici). Colonne 9e
//     AF, 4e periode, citee verbatim : "L'art, l'artisanat et la societe. -
//     Connaissance du patrimoine et projets autour des metiers de l'art
//     et/ou du patrimoine." Cette meme colonne confirme, pour memoire (deja
//     traite, NON reintroduit ici), que l'imaginaire/BD appartient a la 7e
//     AF et que la reappropriation par visites de sites appartient a la 8e
//     AF.
//   - p.49-51/63 : Unite d'apprentissage 4 (tableau complet), verifiee en
//     direct le 2026-08-22/23. Competences officielles de l'unite : C1-C8
//     (toutes) ; ce chapitre reprend le sous-ensemble C3, C4, C5, C8
//     (dominante) deja retenu en Phase 0 — meme sous-ensemble que le
//     Chapitre 4 de la 8e AF, qui portait sur une autre portion de la meme
//     unite. Activite citee verbatim (p.50) : "Projets autour des metiers
//     de l'art et/ou du patrimoine. Definitions, dimensions, fonctions et
//     finalites de la creativite et du patrimoine." et "Exposition,
//     animation et concours entre les eleves et les classes... et/ou
//     publication d'un journal... sur la creativite et/ou le patrimoine."
//
// PROTECTION DES CHAPITRES ET MANUELS ANTERIEURS — CONTINUITE DELIBEREE :
// le fichier de controle du Chapitre 4 de la 8e AF (deja finalise, NON
// modifie ici) documentait explicitement que "les 'metiers de l'art' et
// l'entrepreneuriat culturel... ne sont qu'evoques tres brievement (une
// mention simple, non developpee)... reserves a la 9e AF". Ce Chapitre 4 de
// la 9e AF est precisement le chapitre qui developpe cette reserve
// annoncee : institutions culturelles, corps de metiers, salon des metiers
// culturels. Aucune repetition avec le Chapitre 4 de la 7e AF (patrimoine
// imagine par contes/BD) ni avec celui de la 8e AF (visites de sites,
// carnet de visite) — les deux restant centres sur l'observation directe du
// patrimoine, non sur les metiers/institutions.
//
// PATRIMOINE : "industries culturelles haïtiennes" est mentionne dans la
// table des matieres verrouillee comme [CHOIX EDITORIAL pour les exemples
// precis] — aucune institution culturelle haitienne precise (nom d'un
// musee, d'une galerie ou d'un centre culturel reel) n'est nommee par la
// source EEA elle-meme a ce niveau. Ce chapitre presente donc des
// CATEGORIES generiques d'institutions et de metiers, sans nommer
// d'organisation haitienne precise non verifiee, conformement a la regle
// anti-invention. Les eleves sont invites a rechercher des exemples
// reellement accessibles dans leur propre environnement.
//
// Adaptations de securite : recherche documentaire et presentation orale
// uniquement ; aucun materiel dangereux.
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
  "Métiers et institutions de la culture",
  "Derrière chaque œuvre, chaque exposition, chaque concert, se trouvent des personnes dont c'est le métier. " +
  "Ce chapitre t'invite à découvrir ce monde professionnel de la culture — ses institutions, ses métiers, ses " +
  "exigences — pour mieux comprendre comment l'art que tu pratiques depuis trois ans peut aussi devenir une " +
  "voie d'avenir.",
  [
    "Identifier différentes institutions culturelles et leur rôle.",
    "Classer des corps de métiers artistiques et culturels selon leurs exigences.",
    "Comprendre le lien entre l'art, l'artisanat et la société.",
    "Réaliser un dossier de recherche sur un métier culturel.",
    "Présenter et défendre ce dossier lors d'une simulation de salon des métiers culturels.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Une école haïtienne organise un « salon des métiers culturels » : chaque classe de " +
  "9e AF doit présenter, sous forme de petit stand, un métier lié à l'art ou à la culture. Un élève " +
  "s'interroge : « Mais un métier culturel, c'est juste être artiste, non ? » Ce chapitre lui montre — et te " +
  "montre — que le monde de la culture est bien plus vaste que cela.",
  { italics: true },
));

children.push(subHeading("Prérequis"));
children.push(bodyPar(
  "Ce chapitre suppose que tu as déjà observé et documenté un lieu ou un élément du patrimoine (carnet de " +
  "visite, 8e AF), et que tu as brièvement entendu parler de métiers liés au patrimoine sans les avoir " +
  "explorés en détail. Cette année, cette exploration devient le cœur du chapitre.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Institution culturelle — organisation dont la mission concerne la culture ou les arts (musée, galerie, centre culturel, école d'art, bibliothèque...)."));
children.push(bulletPar("Industries culturelles et créatives — ensemble des secteurs économiques liés à la production et à la diffusion de biens et services culturels."));
children.push(bulletPar("Corps de métier — ensemble des professions qui partagent des compétences et des pratiques communes dans un même domaine."));
children.push(bulletPar("Exigences académiques et professionnelles — formations, diplômes ou compétences nécessaires pour exercer un métier donné."));
children.push(bulletPar("Salon des métiers — événement où plusieurs métiers ou institutions sont présentés au public, souvent sous forme de stands."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : du patrimoine observé au patrimoine professionnel", "4.1"));
children.push(bodyPar(
  "L'an dernier, tu as observé et documenté un lieu patrimonial, et tu as brièvement entendu parler des " +
  "métiers qui font vivre le patrimoine. Cette année, tu vas explorer ces métiers en profondeur, ainsi que " +
  "les institutions qui les rassemblent.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce qu'une institution culturelle ?", "4.2"));
children.push(bodyPar(
  "Une institution culturelle est une organisation dont la mission concerne la culture ou les arts. Elle " +
  "mobilise, en son sein, des profils de compétences très variés — pas seulement des artistes.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des institutions culturelles variées",
  [
    "Musées et galeries : conservation, exposition et médiation d'œuvres d'art.",
    "Centres culturels et maisons de la culture : organisation d'événements, d'ateliers, de spectacles.",
    "Écoles et centres de formation artistique : transmission des techniques et des savoirs.",
    "Bibliothèques et centres de documentation : conservation et diffusion du savoir culturel.",
    "Chaque institution culturelle emploie des profils très différents : artistes, techniciens, " +
    "administrateurs, chercheurs, médiateurs.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C04-01",
  "Ouverture — Un salon des métiers culturels",
  "Une salle d'école haïtienne crédible aménagée en petit salon des métiers, avec plusieurs stands stylisés " +
  "représentant différentes institutions culturelles (musée, centre culturel, atelier), animée par des " +
  "élèves de 9e AF.",
  "Le monde professionnel de la culture rassemble des institutions et des métiers très variés.",
  "Ouvrir le chapitre sur une scène concrète ancrant la découverte des institutions culturelles.",
  "Illustration pleine largeur, scène de salon scolaire haïtien, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les métiers des industries culturelles et créatives", "4.3"));
children.push(bodyPar(
  "Les industries culturelles et créatives rassemblent des corps de métiers très différents, qui ne se " +
  "limitent pas à la pratique artistique elle-même : compétences artistiques, techniques, administratives, " +
  "scientifiques ou encore liées à la communication contribuent toutes à faire vivre la culture.",
));
children.push(threeColTable(
  ["Type de compétence", "Exemples de métiers possibles", "Ce qu'il faut généralement savoir"],
  [
    ["Artistique", "peintre, sculpteur, musicien, designer", "maîtrise technique d'un médium artistique"],
    ["Technique", "restaurateur d'œuvres, technicien du son, imprimeur", "savoir-faire spécialisé, souvent formé en atelier ou en école technique"],
    ["Administratif / gestion", "responsable de musée, organisateur d'événements culturels", "gestion de projet, connaissance du secteur culturel"],
    ["Recherche / transmission", "enseignant d'art, chercheur en patrimoine, guide culturel", "formation académique et goût pour la transmission"],
  ],
  [2400, 3800, 3200],
));
children.push(spacer(200));
children.push(calloutBox(
  "OBSERVER — Classer un métier culturel",
  [
    "Pour situer un métier, demande-toi : quelles compétences mobilise-t-il principalement (artistiques, " +
    "techniques, administratives, de recherche) ?",
    "Demande-toi aussi quelles exigences académiques ou professionnelles il suppose : une formation courte, " +
    "un diplôme spécialisé, une expérience pratique ?",
    "Un même métier peut mobiliser plusieurs types de compétences à la fois — les catégories aident à " +
    "réfléchir, mais elles ne sont pas toujours strictement séparées.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C04-02",
  "Exemple analysé — la diversité des métiers culturels",
  "Un schéma simple classant plusieurs silhouettes de métiers culturels stylisés (artiste, technicien, " +
  "administrateur, chercheur) autour d'une institution culturelle centrale, sans nommer de personne réelle.",
  "Une institution culturelle rassemble des métiers aux compétences très différentes.",
  "Donner une référence visuelle claire de la diversité des métiers culturels.",
  "Illustration demi-page, schéma organisé et annoté, cohérent avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("L'art, l'artisanat et la société", "4.4"));
children.push(bodyPar(
  "L'art et l'artisanat ne vivent jamais isolés de la société qui les entoure : ils créent des emplois, " +
  "transmettent des savoir-faire, et participent à l'identité culturelle d'une communauté.",
));
children.push(calloutBox(
  "PATRIMOINE — L'art et l'artisanat dans ta communauté",
  [
    "Observe autour de toi : quels métiers artistiques ou artisanaux existent réellement dans ta commune " +
    "(artisan, décorateur, musicien, professeur d'art, etc.) ?",
    "Ce chapitre ne nomme aucune institution ou entreprise culturelle haïtienne précise : c'est à toi, avec " +
    "ton enseignant, d'identifier des exemples réellement présents dans ton environnement.",
    "Ces métiers, même modestes, participent à faire vivre la culture et l'économie locale.",
  ],
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE, SAUGE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Mon dossier métier et salon des métiers culturels"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Réaliser un dossier de recherche sur un métier ou une institution culturelle, puis le présenter lors d'une simulation de salon des métiers culturels." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier, de quoi écrire, éventuellement des images ou objets illustrant le métier choisi pour le stand." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis, seul ou en petit groupe, un métier ou une institution culturelle qui t'intéresse (réel et accessible dans ton environnement, ou largement connu)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Recherche : en quoi consiste ce métier ou cette institution ? Quelles compétences (artistiques, techniques, administratives, de recherche) mobilise-t-il ?"));
children.push(numberedPar("2. Note les exigences académiques ou professionnelles nécessaires, si tu peux les trouver."));
children.push(numberedPar("3. Prépare un court dossier écrit présentant ta recherche (une demi-page à une page)."));
children.push(numberedPar("4. Prépare un petit « stand » (affiche, objets, dessin) pour présenter ton métier lors du salon."));
children.push(numberedPar("5. Lors du salon, présente ton métier aux autres élèves qui passent devant ton stand, et visite au moins deux autres stands."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Un dossier de recherche complet sur un métier ou une institution culturelle, présenté avec clarté lors " +
  "d'une simulation de salon des métiers culturels.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Le dossier identifie clairement le métier ou l'institution et le type de compétences mobilisées."));
children.push(bulletPar("Les exigences académiques ou professionnelles sont mentionnées, même de façon générale."));
children.push(bulletPar("L'élève peut présenter et discuter son dossier de façon claire devant un public."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un projet de recherche sans risque",
  [
    "La recherche documentaire (livres, entretiens, ressources en ligne encadrées) ne présente aucun danger.",
    "Si un entretien avec un professionnel réel est organisé, il se fait toujours avec l'accord et sous la " +
    "supervision de l'enseignant.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C04-03",
  "Espace de production — mon dossier métier",
  "Un cadre vide, format portrait, structuré en zones (nom du métier, compétences mobilisées, exigences, " +
  "pourquoi ce choix), prévu pour que l'élève y rédige directement son dossier dans le manuel.",
  "Offrir un espace direct de production pour structurer le dossier métier de l'élève.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre à quatre zones, bordure fine ocre, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Visite le stand d'un camarade lors du salon simulé. Son dossier t'a-t-il donné une idée claire du métier " +
  "présenté ? Discutez ensemble de ce qui rend une présentation de métier convaincante et informative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une institution culturelle mobilise des profils de compétences variés : artistiques, techniques, " +
    "administratifs, de recherche.",
    "Un corps de métier se caractérise par des compétences et des exigences académiques ou professionnelles " +
    "communes.",
    "L'art et l'artisanat participent à l'économie et à l'identité culturelle d'une société.",
    "Un dossier métier documente clairement un métier : ses compétences, ses exigences, son rôle dans la " +
    "société.",
    "Un salon des métiers permet de présenter et de comparer différents métiers culturels.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Citer différents types d'institutions culturelles et leur rôle.",
    "☐ Classer un métier culturel selon le type de compétences qu'il mobilise.",
    "☐ Expliquer le lien entre l'art, l'artisanat et la société.",
    "☐ Réaliser un dossier de recherche complet sur un métier culturel.",
    "☐ Présenter et défendre mon dossier devant un public.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : institution culturelle, industries culturelles et créatives, corps de métier, " +
    "exigences académiques et professionnelles.",
    "Vocabulaire clé à maîtriser : institution culturelle, corps de métier, industries culturelles et " +
    "créatives.",
    "Avant l'évaluation, vérifie que tu peux : citer trois types d'institutions culturelles ; classer un " +
    "métier selon le type de compétences qu'il mobilise ; expliquer pourquoi les industries culturelles ne " +
    "se limitent pas aux artistes.",
    "Rappel officiel : ce chapitre fait l'objet d'une évaluation sommative portant sur la connaissance des " +
    "principaux métiers, compétences et institutions culturelles [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
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
  "institution culturelle · industries culturelles et créatives · corps de métier · exigences " +
  "professionnelles · salon des métiers.",
  { italics: true },
));
children.push(numberedPar("1. Une organisation dont la mission concerne la culture ou les arts s'appelle une ......................"));
children.push(numberedPar("2. L'ensemble des secteurs économiques liés à la production de biens et services culturels s'appelle les ......................"));
children.push(numberedPar("3. Un ensemble de professions qui partagent des compétences et pratiques communes forme un ......................"));
children.push(numberedPar("4. Les formations ou compétences nécessaires pour exercer un métier s'appellent les ......................"));
children.push(numberedPar("5. Un événement où plusieurs métiers sont présentés sous forme de stands s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Cite trois types d'institutions culturelles présentées dans ce chapitre."));
children.push(numberedPar("2. Cite les quatre types de compétences utilisés pour classer les métiers culturels dans ce chapitre."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Choisis un métier culturel de ton choix et classe-le selon le type de compétences qu'il mobilise principalement (artistique, technique, administratif, recherche)."));
children.push(numberedPar("2. Décris, en trois étapes, comment tu préparerais un dossier métier pour un salon des métiers culturels."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Un camarade pense que seuls les artistes travaillent dans le secteur culturel. Explique-lui, avec des arguments précis, pourquoi ce n'est pas exact."));
children.push(numberedPar("2. Compare deux métiers culturels très différents (par exemple un artiste et un administrateur de musée) : quelles compétences partagent-ils, et lesquelles les distinguent ?"));
children.push(numberedPar("3. Explique en quoi l'art et l'artisanat de ta région participent, selon toi, à la vie économique et sociale de ta communauté."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la diversité des institutions culturelles et des métiers qui composent " +
  "les industries culturelles et créatives, de comprendre le lien entre l'art, l'artisanat et la société, et " +
  "de réaliser un dossier métier présenté lors d'une simulation de salon des métiers culturels. Ce dernier " +
  "chapitre d'arts plastiques du manuel intègre les acquis techniques des trois années dans une réflexion " +
  "sur le monde professionnel de la culture, avant d'aborder la Partie II du manuel consacrée à la musique.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "institution culturelle · industries culturelles et créatives · corps de métier · exigences " +
  "professionnelles · salon des métiers.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C04-04",
  "Patrimoine — l'art et l'artisanat dans la communauté",
  "Une scène de quartier haïtien crédible montrant un artisan ou un artiste au travail dans son atelier, " +
  "sans nommer de personne, d'institution ou d'entreprise réelle précise.",
  "L'art et l'artisanat participent concrètement à la vie économique et sociale d'une communauté.",
  "Ancrer visuellement le lien entre art, artisanat et société évoqué dans le chapitre.",
  "Illustration demi-page, scène d'atelier haïtien, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C04-05",
  "Espace de production — le salon des métiers culturels",
  "Une scène de classe haïtienne montrant plusieurs élèves de 9e AF présentant leurs stands lors de la " +
  "simulation de salon des métiers culturels, ambiance dynamique et professionnelle.",
  "Ancrer visuellement l'aboutissement du projet du chapitre.",
  "Illustrer la présentation collective des dossiers métiers réalisés par les élèves.",
  "Illustration demi-page, scène de salon scolaire haïtien, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C04-06",
  "Synthèse — Métiers et institutions de la culture",
  "Une carte mentale simple centrée sur « Métiers de la culture », avec des branches vers : institutions " +
  "culturelles, corps de métiers, art/artisanat/société, dossier métier, salon des métiers.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 31, "Manuel_EEA_9AF_Chapitre4.docx");
