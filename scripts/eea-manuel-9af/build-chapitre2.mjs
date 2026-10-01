// Manuel d'EEA 9e AF — Chapitre 2 : Composer avec maîtrise
// (champ officiel : Arts plastiques et visuels, Axe 2 — Le développement
// des sens, connaissance des éléments et principes artistiques visuels).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf"), Unite d'apprentissage 2, p.43-44/63 —
//   verifie en direct le 2026-08-23.
//
// STATUT DE L'ATTRIBUTION ANNEE : contrairement au Chapitre 1 (dont le
// tableau de progression p.39 separe explicitement les colonnes 7e/8e/9e
// AF), le tableau de progression de l'Axe 2 (p.38-39, "2E PERIODE") ne
// remplit que les colonnes 7e AF (formes geometriques/biomorphiques,
// cubisme/Vevès) et 8e AF (textures, harmonie/balance, composition
// verticale/diagonale/spirale) — AUCUNE colonne 9e AF distincte n'y
// apparait. L'attribution du contenu de ce chapitre a la 9e AF specifiquement
// repose donc sur la portion la plus avancee du tableau complet de l'Unite
// 2 (activite 5, p.44), marquee [ADAPTATION DE LECTURE - A RECONFIRMER],
// deja documentee ainsi dans 00_PHASE0/05_MATRICE_EEA_9AF.md. Le contenu
// lui-meme est neanmoins verbatim present dans la source.
//
// Contenu officiel repris fidelement (p.44), activite 5 de l'Unite 2 :
// "Exercice de composition verticale, diagonale et de la spirale.
// References a l'Histoire de l'art : Analyse d'oeuvres d'art a partir des
// principes de base de la composition. Les principes de base de la
// composition appliquee en photographie, peinture, cinema, sculpture,
// graphisme, etc." Competence C6 citee verbatim (p.43) : "L'eleve est
// capable de construire et realiser des productions abstraites ou
// figuratives bien balancees en equilibrant sa production par le dosage de
// l'espace positif et negatif." Competence C5 citee verbatim (p.43) :
// "Chercher la notion de contraste, de balance et d'harmonie dans l'Art
// traditionnel d'Haiti... et dans les cultures africaines par rapport a la
// notre, les cultures occidentales, orientales ou autres par rapport a la
// notre." Competences ciblees officielles de l'unite : C1, C2, C3, C5, C6,
// C7, C8 (C4 non mobilisee, comme dans les Chapitres 2 des manuels 7e et 8e
// AF).
//
// PROTECTION DU CHAPITRE 1 ET DES MANUELS 7e/8e AF : le Chapitre 1 de la 9e
// AF (deja redige, NON modifie ici) a traite la couleur (Axe 1). Le
// Chapitre 2 de la 8e AF (deja finalise, NON modifie ici) a deja explique
// et defini les TROIS TYPES DE COMPOSITION (verticale, diagonale, spirale),
// ainsi que l'harmonie et la balance, avec un tableau dedie. CE CHAPITRE NE
// REEXPLIQUE PAS CES DEFINITIONS DE BASE : il part de cet acquis (rappel
// bref, section 2.1) et developpe reellement un contenu nouveau et propre a
// la 9e AF, absent des manuels 7e/8e AF : l'espace positif/negatif (C6),
// l'application des principes de composition A TRAVERS PLUSIEURS MEDIUMS
// artistiques (photographie, peinture, cinema, sculpture, graphisme — C7,
// C8, activite 5), et une demarche d'analyse comparative interculturelle
// (C5) — une progression nette vers l'autonomie d'analyse attendue en fin
// de cycle.
//
// PRUDENCE INTERCULTURELLE : la competence C5 invite a comparer les
// principes de composition entre l'art traditionnel haitien et d'autres
// cultures (africaine, occidentale, orientale), sans que la source ne cite
// une oeuvre, un artiste ou un fait culturel precis pour ces autres
// cultures. Ce chapitre transforme donc cette competence en UNE DEMARCHE DE
// RECHERCHE GUIDEE PAR L'ELEVE, plutot qu'en affirmations factuelles sur des
// cultures precises — aucun artiste, oeuvre, date ou tradition n'est
// invente ou affirme par le manuel lui-meme pour les cultures autres que
// haitienne.
//
// Adaptations de securite : materiel de dessin/collage habituel ; aucun
// outil dangereux.
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
  2,
  "Composer avec maîtrise",
  "Tu connais déjà les grandes structures de composition. Cette année, tu vas découvrir qu'elles ne " +
  "s'arrêtent pas au dessin : une photographie, un film, une sculpture ou une affiche obéissent, eux aussi, " +
  "aux mêmes principes — à toi de les reconnaître, où qu'ils se trouvent.",
  [
    "Réactiver ta connaissance des compositions verticale, diagonale et en spirale.",
    "Comprendre et utiliser l'espace positif et l'espace négatif dans une composition.",
    "Reconnaître les principes de composition dans plusieurs médiums artistiques.",
    "Analyser une œuvre à partir de ses seuls principes de composition, quel que soit son médium.",
    "Comparer la notion d'équilibre visuel entre l'art traditionnel haïtien et d'autres cultures.",
    "Réaliser une composition avancée, personnelle et justifiée.",
  ],
));

children.push(bodyPar(
  "Situation de départ : À Port-au-Prince, une classe de 9e AF visite une petite exposition réunissant une " +
  "photographie, une affiche graphique et une sculpture. « Ces trois œuvres n'ont presque rien en commun », " +
  "remarque un élève. Son enseignant lui répond : « Regarde encore une fois, mais uniquement leur " +
  "composition — pas leur sujet. » Ce chapitre t'apprend à voir au-delà du médium, pour reconnaître ce que " +
  "toutes les œuvres bien composées partagent.",
  { italics: true },
));

children.push(subHeading("Prérequis"));
children.push(bodyPar(
  "Ce chapitre suppose que tu maîtrises déjà les trois grandes structures de composition — verticale, " +
  "diagonale et en spirale — ainsi que les principes d'harmonie et de balance, étudiés en détail en 8e AF. Si " +
  "ces notions ne sont plus claires, un bref rappel te les remet en mémoire avant d'aller plus loin.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Espace positif — zone d'une composition occupée par le sujet principal (la forme elle-même)."));
children.push(bulletPar("Espace négatif — zone d'une composition qui entoure le sujet principal, laissée vide ou en arrière-plan."));
children.push(bulletPar("Médium (artistique) — matériau ou moyen d'expression utilisé pour créer une œuvre (dessin, photographie, sculpture, cinéma, graphisme...)."));
children.push(bulletPar("Analyse comparative — démarche qui consiste à examiner deux œuvres ou traditions différentes pour en dégager ressemblances et différences."));
children.push(bulletPar("Transposer (un principe) — appliquer un même principe de composition à un médium différent de celui pour lequel on l'a d'abord appris."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : les structures de composition", "2.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à reconnaître et à utiliser trois grandes structures de composition : la " +
  "composition verticale (hauteur, stabilité), la composition diagonale (mouvement, dynamisme) et la " +
  "composition en spirale (regard guidé vers un centre), ainsi que les principes d'harmonie et de balance. " +
  "Cette année, ces notions ne sont plus expliquées à nouveau : elles deviennent des outils que tu vas " +
  "utiliser pour analyser et créer de façon plus autonome.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("L'espace positif et l'espace négatif", "2.2"));
children.push(bodyPar(
  "Une composition ne se limite pas à ce que l'on dessine ou représente directement : l'espace laissé vide " +
  "autour du sujet joue, lui aussi, un rôle actif dans l'équilibre général de l'œuvre.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Deux espaces, un seul équilibre",
  [
    "L'espace positif est occupé par le sujet principal : une silhouette, un objet, une forme.",
    "L'espace négatif est l'espace qui l'entoure — souvent négligé, mais essentiel à l'équilibre général.",
    "Un bon dosage entre espace positif et espace négatif évite qu'une composition paraisse trop chargée ou, " +
    "au contraire, trop vide.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C02-01",
  "Ouverture — Une exposition à composition multiple",
  "Une petite salle d'exposition haïtienne crédible (Port-au-Prince ou similaire) présentant une " +
  "photographie, une affiche graphique et une sculpture stylisées, sans reproduire d'œuvres précises et " +
  "protégées, observées par des élèves de 9e AF.",
  "Les principes de composition se retrouvent dans des œuvres très différentes en apparence.",
  "Ouvrir le chapitre sur une scène concrète comparant plusieurs médiums artistiques.",
  "Illustration pleine largeur, scène d'exposition haïtienne, cohérente avec la charte EEA.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C02-02",
  "Exemple analysé — espace positif et espace négatif",
  "Deux compositions simples côte à côte : l'une avec un bon équilibre entre espace positif et espace " +
  "négatif, l'autre trop chargée, avec une légende identifiant clairement les deux zones sur chaque exemple.",
  "L'espace vide autour d'un sujet participe autant à l'équilibre qu'un remplissage réussi.",
  "Donner un exemple visuel comparatif clair de la notion d'espace positif/négatif.",
  "Illustration demi-page, deux compositions comparées et annotées, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La composition au-delà du dessin", "2.3"));
children.push(bodyPar(
  "Les structures de composition que tu connais ne sont pas réservées au dessin : elles s'appliquent aussi à " +
  "la photographie, à la peinture, au cinéma, à la sculpture et au graphisme. Apprendre à les repérer dans " +
  "des médiums différents est une compétence précieuse, utile bien au-delà des arts plastiques.",
));
children.push(calloutBox(
  "TECHNIQUE — Repérer la composition dans un médium différent",
  [
    "Ignore d'abord le sujet de l'œuvre (ce qu'elle représente) et concentre-toi uniquement sur son " +
    "organisation visuelle.",
    "Cherche une ligne directrice : est-elle plutôt verticale, diagonale, en spirale, ou une combinaison ?",
    "Repère l'espace positif (le sujet) et l'espace négatif (ce qui l'entoure).",
    "Demande-toi si la composition semble équilibrée (harmonie, balance) ou volontairement déséquilibrée " +
    "pour créer une tension.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Conseil technique : une photographie, une affiche ou une sculpture peuvent être analysées exactement " +
  "comme un dessin — seuls les outils de création changent, pas les principes de composition eux-mêmes.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C02-03",
  "Démonstration technique — un même principe, plusieurs médiums",
  "Une planche comparant trois représentations stylisées d'une composition en spirale : un croquis, une " +
  "photographie stylisée et une petite sculpture stylisée, montrant que le même principe s'applique aux " +
  "trois, sans reproduire d'œuvres précises et protégées.",
  "Un principe de composition reste identique, quel que soit le médium utilisé pour le réaliser.",
  "Montrer concrètement la transposition d'un principe de composition à travers différents médiums.",
  "Illustration demi-page, planche comparative en 3 médiums stylisés, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Regards croisés : la composition à travers les cultures", "2.4"));
children.push(bodyPar(
  "L'équilibre, l'harmonie et la balance ne se comprennent pas de la même façon partout dans le monde. Le " +
  "programme officiel t'invite à comparer la façon dont l'art traditionnel haïtien organise ces notions avec " +
  "celle d'autres cultures — africaine, occidentale, orientale, ou toute autre culture que tu souhaites " +
  "explorer.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Une démarche de recherche, pas une réponse toute faite",
  [
    "Ce chapitre ne t'impose aucune œuvre ni aucune culture précise à étudier : c'est une invitation à la " +
    "recherche personnelle, avec l'aide de ton enseignant et des ressources disponibles (livres, musées, " +
    "internet encadré).",
    "Choisis une culture qui t'intéresse et cherche : comment cette culture organise-t-elle l'espace, la " +
    "couleur ou la forme dans son art traditionnel ?",
    "Compare ensuite tes observations avec ce que tu connais de l'art traditionnel haïtien : quelles " +
    "ressemblances, quelles différences remarques-tu ?",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Une composition avancée, un médium au choix"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Réaliser une composition avancée, dans un médium au choix (dessin, collage, photographie, ou description d'une composition sculpturale), en maîtrisant consciemment l'espace positif et négatif." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Papier, crayon, matériel de collage, ou appareil photo/téléphone si disponible. Alternative : décrire précisément par écrit une composition en volume imaginée, si aucun matériel de production n'est disponible." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis un médium (dessin, collage, photographie ou description de sculpture) et une structure de composition (verticale, diagonale ou spirale) que tu maîtrises déjà." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Choisis ton médium et ta structure de composition."));
children.push(numberedPar("2. Esquisse ou planifie ta composition en identifiant clairement où se situera l'espace positif et l'espace négatif."));
children.push(numberedPar("3. Réalise ta composition (ou rédige une description précise si tu choisis la sculpture imaginée)."));
children.push(numberedPar("4. Vérifie l'équilibre obtenu : rien ne semble-t-il trop chargé ou trop vide ?"));
children.push(numberedPar("5. Prépare une courte analyse de ta propre composition, en identifiant sa structure et son dosage d'espace positif/négatif."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une composition avancée et personnelle, dans un médium choisi par l'élève, avec un dosage visible et " +
  "maîtrisé d'espace positif et négatif, accompagnée d'une courte analyse.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("La structure de composition choisie (verticale, diagonale, spirale) est reconnaissable."));
children.push(bulletPar("L'espace positif et l'espace négatif sont dosés de façon équilibrée et intentionnelle."));
children.push(bulletPar("L'élève peut analyser sa propre composition avec le vocabulaire du chapitre."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Un atelier sans risque",
  [
    "Le matériel de dessin, de collage ou de photographie ne présente aucun danger particulier.",
    "Toute découpe se fait avec des ciseaux à bouts ronds, sous supervision si nécessaire.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C02-04",
  "Espace de production — ma composition avancée",
  "Un cadre vide, format portrait, prévu pour que l'élève y réalise directement sa composition (dessin, " +
  "collage ou croquis de photographie) dans le manuel.",
  "Offrir un espace direct de production pour ancrer la pratique de la composition avancée dans le manuel.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre simple, bordure fine ocre, sans autre décoration, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présente ta composition à un camarade et demande-lui d'identifier, sans aide, la structure utilisée " +
  "(verticale, diagonale, spirale) et de repérer l'espace positif et l'espace négatif. Discutez ensemble de " +
  "ce qui rend une composition immédiatement lisible ou, au contraire, confuse.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "L'espace positif (le sujet) et l'espace négatif (ce qui l'entoure) participent tous deux à l'équilibre " +
    "d'une composition.",
    "Les principes de composition (verticale, diagonale, spirale) s'appliquent à tous les médiums : dessin, " +
    "photographie, peinture, cinéma, sculpture, graphisme.",
    "Analyser une œuvre par sa composition permet de la comprendre indépendamment de son sujet ou de son " +
    "médium.",
    "La notion d'équilibre visuel peut se comparer d'une culture à l'autre, sans qu'il existe une seule " +
    "bonne façon de composer.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Identifier une structure de composition (verticale, diagonale, spirale) dans une œuvre.",
    "☐ Distinguer l'espace positif et l'espace négatif dans une composition.",
    "☐ Reconnaître les principes de composition dans un médium autre que le dessin.",
    "☐ Analyser une œuvre à partir de ses seuls principes de composition.",
    "☐ Réaliser une composition avancée et personnelle, avec un espace positif/négatif maîtrisé.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : espace positif, espace négatif, médium artistique, analyse comparative, " +
    "transposition d'un principe de composition.",
    "Vocabulaire clé à maîtriser : espace positif, espace négatif, médium, analyse comparative.",
    "Avant l'évaluation, vérifie que tu peux : expliquer la différence entre espace positif et négatif ; " +
    "citer au moins trois médiums où s'appliquent les principes de composition ; analyser une composition " +
    "en argumentant ton observation.",
    "L'évaluation de ce chapitre repose sur une grille d'analyse argumentée : ce qui compte n'est pas " +
    "seulement ce que tu observes, mais ta capacité à le justifier [OUTIL PÉDAGOGIQUE / CHOIX ÉDITORIAL].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : espace " +
  "positif · espace négatif · médium · analyse comparative · transposer.",
  { italics: true },
));
children.push(numberedPar("1. La zone d'une composition occupée par le sujet principal s'appelle l'......................"));
children.push(numberedPar("2. La zone qui entoure le sujet principal s'appelle l'......................"));
children.push(numberedPar("3. Le matériau ou moyen d'expression utilisé pour créer une œuvre s'appelle un ......................"));
children.push(numberedPar("4. Examiner deux œuvres ou traditions différentes pour en dégager ressemblances et différences, c'est faire une ......................"));
children.push(numberedPar("5. Appliquer un principe de composition à un médium différent de celui pour lequel on l'a appris, c'est le ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Observe une photographie, une affiche ou une œuvre de ton choix : identifie sa structure de composition dominante (verticale, diagonale ou spirale)."));
children.push(numberedPar("2. Dans la même œuvre, identifie ce qui relève de l'espace positif et ce qui relève de l'espace négatif."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment tu analyserais la composition d'une œuvre dans un médium que tu n'as jamais étudié en classe (par exemple une affiche de film)."));
children.push(numberedPar("2. Pourquoi les mêmes principes de composition peuvent-ils s'appliquer aussi bien à un dessin qu'à une sculpture ou une photographie ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare deux œuvres de médiums différents (par exemple une peinture et une photographie) que tu connais : ont-elles une structure de composition semblable ou différente ? Justifie."));
children.push(numberedPar("2. Un camarade affirme que l'espace négatif d'une composition « ne sert à rien » puisqu'il est vide. Que lui réponds-tu ?"));
children.push(numberedPar("3. Choisis une culture (autre que haïtienne) que tu aimerais explorer pour comparer sa notion d'équilibre visuel avec celle de l'art traditionnel haïtien, et explique ta démarche de recherche."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis d'approfondir la maîtrise de la composition acquise en 8e AF : comprendre le dosage " +
  "de l'espace positif et de l'espace négatif, reconnaître que les principes de composition s'appliquent à " +
  "de nombreux médiums (photographie, peinture, cinéma, sculpture, graphisme), analyser une œuvre à partir " +
  "de sa seule composition, et amorcer une démarche de comparaison interculturelle de la notion d'équilibre " +
  "visuel. Cette autonomie d'analyse prépare les chapitres suivants du manuel.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "espace positif · espace négatif · médium artistique · analyse comparative · transposer.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C02-05",
  "Patrimoine — équilibre visuel dans l'art traditionnel haïtien",
  "Une composition stylisée s'inspirant de motifs de l'art traditionnel haïtien (sans reproduire une œuvre " +
  "précise), illustrant un exemple d'équilibre entre espace positif et espace négatif.",
  "Ancrer visuellement la démarche comparative interculturelle proposée dans le chapitre.",
  "Illustrer un exemple d'équilibre visuel inspiré de l'art traditionnel haïtien, de façon générale et non attribuée.",
  "Illustration demi-page, composition stylisée, cohérente avec la charte EEA.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C02-06",
  "Synthèse — Composer avec maîtrise",
  "Une carte mentale simple centrée sur « Composition avancée », avec des branches vers : espace positif/" +
  "négatif, médiums multiples, analyse d'œuvres, comparaison interculturelle.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 12, "Manuel_EEA_9AF_Chapitre2.docx");
