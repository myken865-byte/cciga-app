// Manuel d'ETAP 7e AF — Chapitre 1 : Decouvrir la demarche technologique et
// les outils numeriques (champ officiel : Nouvelles technologies du numerique).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.24-25 (domaine, finalite de l'ETAP)
//     - p.30 (demarche de projet en 4 etapes)
//     - p.39 (competence generale fin de cycle du champ numerique)
//     - p.46-47 (programme detaille 7e AF, champ "Nouvelles technologies du
//       numerique" : competence ciblee, savoirs/savoir-faire, activites,
//       modalites/criteres d'evaluation)
// Le contenu officiel detaille (p.46-47) porte sur : supports de stockage
// (local/a distance), unites bit/octet, reseaux sans fil (Wi-Fi, Bluetooth,
// WiMax), structure d'un reseau informatique, capteurs et actionneurs — plus
// technique que la premiere ebauche de l'architecture (qui envisageait une
// simple description d'objets comme la tablette/le smartphone). Ce chapitre
// reste fidele au contenu officiel reellement verifie, adapte pedagogiquement
// (vocabulaire simplifie, exemples haitiens, activites concretes) pour le
// niveau 7e AF, sans jamais presenter l'adaptation comme une exigence MENFP
// distincte de ce qui est ecrit dans le programme.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  VERT, CUIVRE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  1,
  "Découvrir la démarche technologique et les outils numériques",
  "Un téléphone, une clé USB, une pompe à eau solaire, une radio... Tous les jours, tu utilises des objets " +
  "techniques sans toujours te demander comment ils fonctionnent ni pourquoi ils ont été conçus ainsi. " +
  "Ce chapitre t'invite à observer ces objets avec un regard neuf.",
  [
    "Reconnaître un objet technique et le distinguer d'un objet ordinaire.",
    "Découvrir les principaux outils numériques et leurs supports de stockage.",
    "Comprendre ce que sont un réseau sans fil, un capteur et un actionneur.",
    "Expliquer les grandes étapes de la démarche technologique.",
    "Utiliser les outils numériques de façon responsable et sécurisée.",
    "Appliquer la démarche technologique à un besoin simple de ton quotidien.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans l'école de Nadège, à Jacmel, les élèves de 7e AF partagent une seule clé USB " +
  "pour enregistrer leurs exposés. Plusieurs fois déjà, des fichiers ont été perdus ou effacés par erreur. " +
  "Le professeur d'ETAP propose à la classe de comprendre comment fonctionnent les outils numériques avant " +
  "de chercher ensemble une solution. C'est exactement ce que tu vas apprendre à faire dans ce chapitre.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Objet technique — objet conçu par l'être humain pour répondre à un besoin."));
children.push(bulletPar("Démarche technologique — suite d'étapes utilisées pour concevoir une solution technique."));
children.push(bulletPar("Stockage numérique — façon de conserver des données (localement ou à distance)."));
children.push(bulletPar("Bit et octet — unités utilisées pour mesurer la quantité d'information numérique."));
children.push(bulletPar("Réseau sans fil — moyen de faire communiquer des appareils sans câble (Wi-Fi, Bluetooth...)."));
children.push(bulletPar("Capteur et actionneur — éléments qui permettent à un système technique de percevoir puis d'agir."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La technologie dans notre vie quotidienne", "1.1"));
children.push(bodyPar(
  "Autour de toi, certains objets sont naturels (une pierre, un arbre, l'eau de la rivière) et d'autres ont été " +
  "fabriqués par l'être humain pour répondre à un besoin précis : on les appelle des objets techniques. Une " +
  "machette, une radio, un panneau solaire, une bicyclette ou un téléphone sont tous des objets techniques, " +
  "même s'ils ne se ressemblent pas.",
));
children.push(bodyPar(
  "Parmi les objets techniques, certains servent à agir directement (un outil, comme une pioche), d'autres " +
  "combinent plusieurs pièces pour réaliser une tâche complexe (une machine, comme un moulin à moteur), et " +
  "d'autres enfin traitent de l'information plutôt que de la matière : ce sont les outils numériques (un " +
  "téléphone, un ordinateur, une tablette). La technologie regroupe l'ensemble de ces objets, ainsi que les " +
  "connaissances et les méthodes utilisées pour les concevoir, les fabriquer et les utiliser.",
));
children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-01",
  "Des objets techniques dans la vie quotidienne haïtienne",
  "Une scène composite montrant plusieurs objets techniques familiers : une machette, une radio à piles, un " +
  "panneau solaire sur un toit, un téléphone portable, une bicyclette.",
  "Des objets techniques très différents répondent chacun à un besoin précis.",
  "Aider l'élève à élargir sa définition d'« objet technique » au-delà du seul numérique.",
  "Illustration pleine largeur, style scolaire réaliste, ancrée dans un contexte haïtien reconnaissable.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Reconnaître les objets techniques", "1.2"));
children.push(bodyPar(
  "Pour bien comprendre un objet technique, on peut se poser toujours les mêmes questions : à quoi sert-il " +
  "(sa fonction) ? Qui l'utilise (l'utilisateur) ? Quel besoin satisfait-il (son utilité) ? De quelles parties " +
  "principales est-il composé (ses composants) ? Dans quel environnement est-il utilisé (à l'école, à la " +
  "maison, dans un champ, un atelier, un commerce) ?",
));

children.push(calloutBox(
  "OBSERVER — Autour de toi",
  [
    "À l'école : une règle, un tableau, une horloge, un ordinateur de bureau du secrétariat.",
    "À la maison : une lampe, une radio, un réchaud, un téléphone.",
    "Dans l'agriculture ou l'artisanat : une machette, une brouette, une machine à coudre.",
    "Dans le commerce ou les services : une balance, une caisse enregistreuse, un four.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-02",
  "Fiche d'observation d'un objet technique",
  "Un élève examine un objet technique de son environnement (par exemple une machine à coudre familiale) et " +
  "remplit une fiche : fonction, utilisateur, besoin, composants principaux.",
  "Observer, c'est déjà commencer à comprendre.",
  "Montrer concrètement la démarche d'observation d'un objet technique.",
  "Illustration demi-page, scène d'intérieur haïtien, personnage principal un élève de 7e AF.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Découvrir les outils numériques", "1.3"));
children.push(bodyPar(
  "Parmi les objets techniques, certains sont dits « numériques » parce qu'ils traitent, stockent ou transmettent " +
  "de l'information sous forme de données. L'ordinateur, la tablette et le smartphone (téléphone intelligent) en " +
  "sont les exemples les plus courants, mais on trouve aussi des outils numériques dans une radio moderne, une " +
  "balance électronique ou un lecteur de carte de paiement.",
));
children.push(bodyPar(
  "Un outil numérique reçoit une information (par exemple, ce que tu tapes ou ce que capte un microphone), la " +
  "traite, puis la restitue (à l'écran, par un haut-parleur, en l'enregistrant). Pour bien utiliser ces outils, il " +
  "faut d'abord comprendre où et comment l'information qu'ils traitent est conservée : c'est ce que tu vas " +
  "découvrir dans les deux sections suivantes.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les supports de stockage numérique", "1.4"));
children.push(bodyPar(
  "Quand tu enregistres une photo, un devoir ou une chanson, cette information est conservée sur un support de " +
  "stockage. On distingue deux grandes familles de stockage : le stockage local, où l'information reste sur un " +
  "objet que tu peux tenir dans ta main, et le stockage à distance, où l'information est conservée sur un " +
  "ordinateur ailleurs, accessible par Internet.",
));

children.push(calloutBox(
  "OUTIL — Principaux supports de stockage",
  [
    "Stockage local : mémoire flash, disque dur, clé USB, carte mémoire (carte SD).",
    "Stockage à distance : le cloud (littéralement « nuage »), qui garde tes données sur des ordinateurs " +
    "connectés à Internet, accessibles depuis un autre appareil.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, VERT,
));
children.push(spacer(160));

children.push(bodyPar(
  "Chaque support a des avantages et des limites : une clé USB est facile à transporter mais peut se perdre ou " +
  "se casser ; le cloud est accessible de partout mais nécessite une connexion Internet fiable, ce qui n'est pas " +
  "toujours simple dans toutes les régions d'Haïti.",
));

children.push(subHeading("Mesurer l'information numérique : le bit et l'octet"));
children.push(bodyPar(
  "Pour savoir si une information numérique est « grosse » ou « petite », on la mesure en bits et en octets. Le " +
  "bit est la plus petite unité d'information numérique. Un octet regroupe 8 bits. On utilise ensuite des " +
  "multiples de l'octet (kilooctet, mégaoctet, gigaoctet...) pour mesurer des fichiers plus volumineux, comme une " +
  "photo ou une vidéo.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-03",
  "Comparer les supports de stockage",
  "Un schéma simple comparant trois supports (clé USB, carte mémoire, cloud représenté par un nuage relié à un " +
  "ordinateur), avec une courte légende pour chacun.",
  "Chaque support de stockage a ses avantages et ses limites.",
  "Aider l'élève à visualiser et comparer les supports de stockage étudiés.",
  "Schéma pédagogique, demi-page, trois éléments alignés horizontalement.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les réseaux de communication sans fil", "1.5"));
children.push(bodyPar(
  "Pour échanger des informations sans câble, les appareils numériques utilisent des réseaux sans fil. Les plus " +
  "courants sont le Wi-Fi (pour se connecter à Internet ou à un réseau local), le Bluetooth (pour relier deux " +
  "appareils proches, par exemple un téléphone et des écouteurs) et le WiMax (utilisé pour couvrir de plus " +
  "grandes distances).",
));
children.push(bodyPar(
  "Un réseau informatique est composé de plusieurs éléments reliés entre eux : les appareils eux-mêmes " +
  "(ordinateurs, téléphones), les moyens de connexion (câbles ou ondes) et, souvent, un appareil central (comme " +
  "une borne ou un routeur) qui fait circuler les données entre tous les appareils connectés.",
));

children.push(calloutBox(
  "NUMÉRIQUE — Trois réseaux sans fil à connaître",
  [
    "Wi-Fi : connecte des appareils à un réseau local ou à Internet, sur une distance de quelques dizaines de mètres.",
    "Bluetooth : relie deux appareils très proches l'un de l'autre (écouteurs, enceinte, manette).",
    "WiMax : permet une connexion sans fil sur une distance plus grande que le Wi-Fi.",
  ],
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE, "233241",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-04",
  "Schéma d'un petit réseau informatique",
  "Schéma simplifié : un routeur/borne au centre, relié par des traits (câble) ou des ondes (sans fil) à un " +
  "ordinateur, une tablette et un téléphone.",
  "Les appareils d'un réseau communiquent entre eux grâce à des moyens de connexion.",
  "Faire comprendre la structure de base d'un réseau informatique (composants, trajet des données).",
  "Schéma pédagogique clair, demi-page, légendes courtes en français.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Utiliser les outils numériques de manière responsable", "1.6"));
children.push(bodyPar(
  "Un outil numérique est utile seulement s'il est bien entretenu et bien utilisé. Prendre soin du matériel, " +
  "organiser ses fichiers dans des dossiers clairement nommés, et vérifier une information avant de la croire ou " +
  "de la partager sont des habitudes essentielles pour tout élève qui utilise ces outils, à l'école comme en " +
  "dehors.",
));

children.push(calloutBox(
  "SÉCURITÉ — Bonnes pratiques numériques",
  [
    "Prendre soin du matériel : mains propres et sèches, transport prudent, branchement délicat.",
    "Organiser ses fichiers dans des dossiers nommés clairement, pour les retrouver facilement.",
    "Ne jamais brancher une clé USB inconnue ou trouvée sans l'autorisation d'un adulte responsable.",
    "Protéger ses informations personnelles : ne pas communiquer un mot de passe, même à un ami.",
    "Vérifier une information avant de la croire ou de la partager avec d'autres.",
    "Signaler tout matériel endommagé à l'enseignant ou à un adulte responsable, sans essayer de le réparer soi-même.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comprendre la démarche technologique", "1.7"));
children.push(bodyPar(
  "Quand une équipe de techniciens veut créer une solution à un problème, elle ne commence pas au hasard : elle " +
  "suit une démarche organisée. Le programme d'ETAP décrit cette démarche à travers un projet qui avance en " +
  "plusieurs étapes.",
));

children.push(calloutBox(
  "TECHNIQUE — Les étapes de la démarche technologique",
  [
    "1. Identifier le besoin : quel problème faut-il résoudre ?",
    "2. Rechercher des solutions : quelles idées permettraient d'y répondre ?",
    "3. Choisir et préparer : quelle solution retenir, et avec quoi la réaliser ?",
    "4. Réaliser : mettre en œuvre la solution choisie.",
    "5. Tester et évaluer : la solution répond-elle réellement au besoin ?",
    "6. Améliorer si nécessaire : que faudrait-il changer pour faire encore mieux ?",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-05",
  "Les étapes de la démarche technologique",
  "Frise illustrée en 6 étapes reliées par des flèches, chaque étape représentée par un petit pictogramme " +
  "(loupe pour « identifier », ampoule pour « rechercher des solutions », outil pour « réaliser », etc.).",
  "La démarche technologique avance étape par étape, du besoin à la solution améliorée.",
  "Fixer visuellement l'ordre des 6 étapes pour que l'élève puisse s'y référer tout au long du manuel.",
  "Frise horizontale, pleine largeur, style schématique et coloré.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("La technologie qui réagit à son environnement : capteurs et actionneurs", "1.8"));
children.push(bodyPar(
  "Certains systèmes techniques sont capables de percevoir ce qui se passe autour d'eux, puis d'agir en " +
  "conséquence. Un capteur est un dispositif qui perçoit un phénomène (la lumière, la température, un mouvement, " +
  "un son...). Un actionneur est un dispositif qui agit en réponse à une commande, souvent après qu'un capteur a " +
  "détecté quelque chose.",
));
children.push(bodyPar(
  "Par exemple, un lampadaire solaire qui s'allume tout seul à la tombée de la nuit utilise un capteur de " +
  "lumière : lorsque la lumière du jour diminue, le capteur envoie un signal qui déclenche l'actionneur (ici, " +
  "l'ampoule) pour qu'il s'allume.",
));

children.push(calloutBox(
  "DÉCOUVRIR — Exemples de capteurs et d'actionneurs",
  [
    "Capteurs : capteur de lumière, capteur de température, capteur de mouvement, microphone.",
    "Actionneurs : lampe, haut-parleur, sirène, moteur électrique, pompe électrique.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-06",
  "Un capteur et un actionneur en action",
  "Schéma d'un lampadaire solaire : un capteur de lumière en haut, une flèche vers l'ampoule (actionneur) qui " +
  "s'allume quand la nuit tombe, avec de courtes légendes « capteur » et « actionneur ».",
  "Le capteur perçoit, l'actionneur agit.",
  "Rendre concrète la relation entre un capteur et un actionneur à travers un exemple familier.",
  "Schéma pédagogique simple, demi-page, contexte haïtien (éclairage public solaire).",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La technologie pour résoudre un problème", "1.9"));
children.push(bodyPar(
  "Reprenons la situation de Nadège et de sa classe, présentée au début du chapitre : une seule clé USB " +
  "partagée entraîne régulièrement des fichiers perdus ou effacés. Applique maintenant les 6 étapes de la " +
  "démarche technologique pour aider la classe à résoudre ce problème.",
));

children.push(twoColTable(
  "Étape de la démarche", "Application à la situation de Nadège",
  [
    ["1. Identifier le besoin", "Éviter de perdre des fichiers importants enregistrés par plusieurs élèves."],
    ["2. Rechercher des solutions", "Plusieurs clés USB, un dossier par élève, une sauvegarde en double, un compte cloud partagé si Internet est disponible..."],
    ["3. Choisir et préparer", "La classe compare les solutions selon le matériel réellement disponible à l'école."],
    ["4. Réaliser", "Mettre en place la solution choisie (par exemple, un dossier nommé par élève sur chaque clé disponible)."],
    ["5. Tester et évaluer", "Vérifier pendant quelques semaines si les fichiers sont mieux protégés."],
    ["6. Améliorer si nécessaire", "Ajuster l'organisation si un problème apparaît encore."],
  ],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Enquête sur les supports de stockage numérique"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Identifier et comparer différents supports de stockage numérique présents à l'école, à la maison ou dans le quartier." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier d'enquête, crayon. Si disponibles : une clé USB, une carte mémoire, un téléphone. L'activité reste réalisable même sans ces objets, par observation et par échange oral." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Travail individuel ou en petits groupes de 2 à 3 élèves." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Recense au moins quatre supports de stockage numérique que tu connais ou que tu as déjà vus utilisés autour de toi." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Liste les supports de stockage observés ou connus (à l'école, à la maison, dans un cybercafé, chez un commerçant...)."));
children.push(numberedPar("2. Pour chacun, note s'il s'agit d'un stockage local ou à distance."));
children.push(numberedPar("3. Complète le tableau d'observation ci-dessous."));
children.push(numberedPar("4. Compare tes résultats avec ceux d'un autre groupe."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Tableau à compléter :", { bold: true }));
children.push(threeColTable(
  ["Support observé", "Local ou à distance ?", "Avantage / limite remarqué(e)"],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 2800, 3000],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Quel support est le plus pratique pour transporter un document d'un endroit à un autre ? Pourquoi ?"));
children.push(numberedPar("2. Pourquoi le stockage à distance (cloud) nécessite-t-il une connexion Internet ?"));
children.push(numberedPar("3. Que risque-t-on à n'utiliser qu'un seul support de stockage pour un travail important ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "D'après ton enquête, quelle combinaison de supports te semble la plus sûre pour un élève de 7e AF ? Explique ton choix en une ou deux phrases." }]));
children.push(spacer(80));

children.push(calloutBox(
  "RÈGLES DE SÉCURITÉ pour cette activité",
  [
    "Ne jamais brancher un support de stockage inconnu ou trouvé sans l'autorisation d'un adulte responsable.",
    "Manipuler les clés USB et cartes mémoire avec soin, sans les retirer brutalement d'un appareil.",
    "Ne pas partager d'informations personnelles pendant l'enquête.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-07",
  "L'activité pratique en classe",
  "Un petit groupe d'élèves de 7e AF, en classe, comparant des supports de stockage (clé USB, carte mémoire) " +
  "et remplissant un tableau d'observation.",
  "Une activité de comparaison réalisable avec un matériel simple.",
  "Illustrer concrètement le déroulement de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Les technologies autour de moi"));
children.push(bodyPar(
  "En dehors de la classe (à la maison, dans le quartier, dans un commerce ou un atelier), observe trois objets " +
  "techniques ou numériques et complète le tableau suivant.",
));
children.push(threeColTable(
  ["Objet observé", "Fonction / besoin satisfait", "Utilisateur et précaution éventuelle"],
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 3200, 2600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'analyse — Une situation à résoudre"));
children.push(bodyPar(
  "Une école de ta commune reçoit en don plusieurs tablettes numériques, mais l'école n'a pas de connexion " +
  "Internet stable. Les élèves doivent pourtant pouvoir enregistrer et partager leurs travaux entre eux.",
));
children.push(numberedPar("1. Quel est le besoin exact à satisfaire dans cette situation ?"));
children.push(numberedPar("2. Propose une solution de stockage adaptée, en t'appuyant sur ce que tu as appris à la section 1.4."));
children.push(numberedPar("3. Quels sont les avantages et les limites de la solution que tu proposes ?"));
children.push(numberedPar("4. Quelle règle de sécurité numérique faudrait-il rappeler aux élèves qui utiliseront ces tablettes ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un objet technique répond à un besoin ; parmi eux, les outils numériques traitent de l'information.",
    "Le stockage numérique peut être local (mémoire flash, disque dur, clé USB, carte SD) ou à distance (le cloud).",
    "Le bit et l'octet mesurent la quantité d'information numérique.",
    "Le Wi-Fi, le Bluetooth et le WiMax sont des réseaux de communication sans fil.",
    "Un capteur perçoit un phénomène ; un actionneur agit en réponse à une commande.",
    "La démarche technologique avance en six étapes : identifier, rechercher, choisir/préparer, réaliser, tester/évaluer, améliorer.",
    "Utiliser les outils numériques de façon responsable protège le matériel et les informations personnelles.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer ce qu'est un objet technique et donner des exemples.",
    "☐ Distinguer un support de stockage local d'un stockage à distance.",
    "☐ Utiliser les mots bit et octet pour parler d'une quantité d'information numérique.",
    "☐ Citer et différencier le Wi-Fi, le Bluetooth et le WiMax.",
    "☐ Expliquer la différence entre un capteur et un actionneur.",
    "☐ Nommer les six étapes de la démarche technologique.",
    "☐ Proposer une solution simple à un besoin technique de mon quotidien.",
    "☐ Utiliser un outil numérique de façon responsable et sécurisée.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : objet technique, outil numérique, stockage local/à distance, bit, octet, réseau " +
    "sans fil, réseau informatique, capteur, actionneur, démarche technologique.",
    "Vocabulaire clé à maîtriser : clé USB, carte SD, cloud, Wi-Fi, Bluetooth, WiMax, capteur, actionneur.",
    "Avant l'évaluation, vérifie que tu peux : citer les 6 étapes de la démarche technologique dans l'ordre ; " +
    "expliquer la différence entre stockage local et stockage à distance ; expliquer la différence entre un " +
    "capteur et un actionneur.",
    "Question rapide de vérification : cite un support de stockage local et un support de stockage à distance.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "octet · capteur · démarche technologique · stockage local · Bluetooth · actionneur · besoin · cloud.",
  { italics: true },
));
children.push(numberedPar("1. Une clé USB est un exemple de ...................... , car les données restent sur un objet que l'on peut tenir dans la main."));
children.push(numberedPar("2. Le ...................... permet de conserver des données à distance, accessibles par Internet."));
children.push(numberedPar("3. Un ...................... regroupe 8 bits."));
children.push(numberedPar("4. Le ...................... est un réseau sans fil utilisé pour relier deux appareils très proches, comme un téléphone et des écouteurs."));
children.push(numberedPar("5. Un ...................... perçoit un phénomène de son environnement, comme la lumière ou la température."));
children.push(numberedPar("6. Un ...................... agit en réponse à une commande, par exemple une lampe qui s'allume."));
children.push(numberedPar("7. La première étape de la ...................... consiste à identifier un ......................."));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Un objet technique est :"));
children.push(bulletPar("a) uniquement un objet numérique"));
children.push(bulletPar("b) un objet conçu par l'être humain pour répondre à un besoin"));
children.push(bulletPar("c) uniquement un objet trouvé dans la nature"));
children.push(spacer(60));
children.push(numberedPar("2. Lequel de ces supports est un support de stockage à distance ?"));
children.push(bulletPar("a) une clé USB"));
children.push(bulletPar("b) une carte mémoire"));
children.push(bulletPar("c) le cloud"));
children.push(spacer(60));
children.push(numberedPar("3. Un octet correspond à :"));
children.push(bulletPar("a) 2 bits"));
children.push(bulletPar("b) 8 bits"));
children.push(bulletPar("c) 80 bits"));
children.push(spacer(60));
children.push(numberedPar("4. Lequel de ces réseaux sans fil est le plus adapté pour relier un téléphone à des écouteurs très proches ?"));
children.push(bulletPar("a) le Wi-Fi"));
children.push(bulletPar("b) le Bluetooth"));
children.push(bulletPar("c) le WiMax"));
children.push(spacer(60));
children.push(numberedPar("5. Quelle est la première étape de la démarche technologique ?"));
children.push(bulletPar("a) Réaliser la solution"));
children.push(bulletPar("b) Identifier le besoin"));
children.push(bulletPar("c) Tester la solution"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Clé USB", "a. La plus petite unité de mesure de l'information numérique."],
    ["2. Le cloud", "b. Réseau de communication sans fil permettant de connecter des appareils proches sans câble."],
    ["3. Bit", "c. Dispositif qui perçoit un phénomène de son environnement (lumière, température, mouvement...)."],
    ["4. Wi-Fi", "d. Dispositif qui agit en réponse à une commande (lampe, moteur, haut-parleur...)."],
    ["5. Capteur", "e. Petit support de stockage local que l'on branche sur un port pour transporter des données."],
    ["6. Actionneur", "f. Stockage à distance des données, accessible par Internet."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Dans ta communauté, l'accès à l'électricité n'est pas toujours garanti pour recharger les téléphones. En t'appuyant sur les six étapes de la démarche technologique, propose une solution simple à ce problème."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi il n'est pas prudent de garder un seul exemplaire d'un travail important sur un seul support de stockage."));
children.push(numberedPar("3. Donne un exemple, autre que celui du lampadaire solaire, où un capteur et un actionneur travaillent ensemble dans la vie de tous les jours."));
children.push(numberedPar("4. Un camarade te propose de brancher, sur l'ordinateur de l'école, une clé USB trouvée dans la cour. Que lui réponds-tu, et pourquoi ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir ce qu'est un objet technique, et en particulier les outils numériques qui " +
  "traitent de l'information. Tu as appris à distinguer le stockage local du stockage à distance, à utiliser " +
  "les unités bit et octet, à reconnaître les principaux réseaux sans fil (Wi-Fi, Bluetooth, WiMax), et à " +
  "comprendre le fonctionnement d'un capteur et d'un actionneur. Tu as aussi découvert les six étapes de la " +
  "démarche technologique, une méthode que tu réutiliseras dans les prochains chapitres pour résoudre des " +
  "problèmes concrets liés aux métiers de la mer, au recyclage, à l'agriculture et à l'entrepreneuriat. Enfin, " +
  "tu as vu qu'utiliser les outils numériques de façon responsable protège à la fois le matériel et les " +
  "informations personnelles.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "objet technique · outil numérique · stockage local · stockage à distance (cloud) · bit · octet · réseau " +
  "sans fil (Wi-Fi, Bluetooth, WiMax) · réseau informatique · capteur · actionneur · démarche technologique.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C01-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « La technologie autour de moi », avec des branches vers : objets " +
  "techniques, stockage numérique, réseaux sans fil, capteurs/actionneurs, démarche technologique.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, sobre.",
));

await buildAndSave(children, 1, "Manuel_ETAP_7AF_Chapitre1.docx");
