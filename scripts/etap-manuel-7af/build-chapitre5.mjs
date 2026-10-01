// Manuel d'ETAP 7e AF — Chapitre 5 : Decouvrir l'entreprise
// (champ officiel : Entrepreneuriat).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.45-46/77 (programme detaille 7e AF, unite "L'entrepreneuriat en 7e
//       annee du fondamental") : competence ciblee, savoirs/savoir-faire
//       (formes d'entreprise, taille, statuts juridiques, secteurs
//       d'activite primaire/secondaire/tertiaire, organisation,
//       environnement de l'entreprise), activites, modalites/criteres.
// Page 46/77 termine l'unite (Modalites et criteres d'evaluation) juste
// avant le debut de l'unite Numerique-7e AF — hors perimetre de ce chapitre.
//
// Fidelite au niveau 7e AF : le programme officiel liste 9 statuts
// juridiques (entreprise individuelle, societe etrangere, societe en nom
// collectif, societe en commandite, societe anonyme, societe anonyme
// d'economie mixte, cooperative, PME, societe par actions). Conformement a
// la consigne de ne pas transformer le chapitre en cours de droit, seuls 3
// statuts parmi les plus concrets pour un eleve de 7e AF (entreprise
// individuelle, cooperative, PME) sont expliques en detail ; les autres sont
// simplement nommes comme vocabulaire rencontre, sans definition juridique.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_METIER_FILL, BOX_METIER_LINE,
  BOX_ENTREPRENDRE_FILL, BOX_ENTREPRENDRE_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
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
  5,
  "Découvrir l'entreprise",
  "Un petit magasin de quartier, un atelier de couture, une coopérative de producteurs de café... Toutes ces " +
  "activités ont un point commun : elles répondent à un besoin en produisant un bien ou un service. Découvre ce " +
  "qu'est une entreprise.",
  [
    "Comprendre pourquoi des biens et des services sont produits.",
    "Distinguer un bien d'un service.",
    "Découvrir différentes formes d'entreprise, selon leur taille et leur statut.",
    "Identifier les personnes et les rôles dans une petite organisation.",
    "Décrire les ressources et les outils nécessaires à une activité.",
    "Comprendre le lien entre une entreprise, sa communauté et son environnement.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Près de chez elle, à Hinche, Sherline observe chaque jour la même boutique : le matin, " +
  "la propriétaire ouvre, range ses produits, sert ses clients, puis fait ses comptes le soir. Sherline se " +
  "demande : qu'est-ce qui fait de cette petite boutique une entreprise ?",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Entreprise — organisation qui produit un bien ou un service pour répondre à un besoin."));
children.push(bulletPar("Bien — objet matériel produit pour être utilisé ou vendu."));
children.push(bulletPar("Service — action réalisée pour répondre à un besoin, sans produire d'objet matériel."));
children.push(bulletPar("Statut juridique — forme légale que peut prendre une entreprise."));
children.push(bulletPar("Secteur d'activité — grande catégorie à laquelle appartient une activité économique (primaire, secondaire, tertiaire)."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Des besoins aux activités économiques", "5.1"));
children.push(bodyPar(
  "Chaque jour, les personnes ont des besoins : se nourrir, se vêtir, se déplacer, se soigner, apprendre. Pour " +
  "répondre à ces besoins, des personnes s'organisent pour produire des biens (des objets) ou des services (des " +
  "actions utiles). C'est ce qu'on appelle une activité économique.",
));
children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-01",
  "Une activité économique locale",
  "Scène d'ouverture crédible : une petite boutique de quartier haïtienne, avec sa propriétaire servant un " +
  "client, dans une rue animée mais paisible.",
  "Une activité économique répond à un besoin réel des personnes.",
  "Introduire concrètement la notion d'activité économique avant de définir l'entreprise.",
  "Illustration pleine largeur, scène urbaine ou de quartier haïtienne, ton neutre et réaliste.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Qu'est-ce qu'une entreprise ?", "5.2"));
children.push(bodyPar(
  "Une entreprise est une organisation qui produit un bien ou un service, pour répondre à un besoin, en " +
  "mobilisant des personnes, des ressources et des outils. Une entreprise peut être économique (vendre un " +
  "produit ou un service), mais elle a aussi une dimension sociale et humaine : elle fait travailler des " +
  "personnes et fait partie d'une communauté.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Bien ou service : apprendre à les distinguer", "5.3"));
children.push(bodyPar(
  "Certaines entreprises fabriquent ou vendent des biens : des objets que l'on peut toucher, transporter, " +
  "garder. D'autres proposent des services : des actions qui répondent à un besoin sans produire d'objet " +
  "matériel.",
));

children.push(calloutBox(
  "DÉCOUVRIR — Bien ou service ?",
  [
    "Biens : un sac de riz, une chaise fabriquée par un menuisier, un vêtement cousu par une couturière.",
    "Services : une coupe de cheveux, un transport en taxi-moto, une réparation de vélo.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-02",
  "Bien ou service : comparaison pédagogique",
  "Illustration en deux colonnes : à gauche des exemples de biens (sac de riz, chaise, vêtement), à droite des " +
  "exemples de services (coupe de cheveux, transport, réparation), avec de courtes légendes.",
  "Distinguer visuellement un bien d'un service à travers des exemples concrets.",
  "Fixer la distinction bien/service avant d'aborder les formes d'entreprise.",
  "Illustration en deux colonnes, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Découvrir différentes formes d'entreprise", "5.4"));
children.push(bodyPar(
  "Les entreprises n'ont pas toutes la même taille. Le programme distingue les très petites entreprises, les " +
  "petites et moyennes entreprises (PME), et les grandes entreprises.",
));

children.push(calloutBox(
  "OBSERVER — Trois tailles d'entreprise",
  [
    "Très petite entreprise : une seule personne ou une famille (un petit commerce, un atelier).",
    "Petite et moyenne entreprise (PME) : quelques employés à quelques dizaines de personnes.",
    "Grande entreprise : de nombreux employés, souvent organisée en plusieurs services.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(bodyPar(
  "Une entreprise peut aussi avoir un statut, c'est-à-dire une forme légale reconnue. Le programme cite " +
  "plusieurs statuts juridiques ; en voici trois, particulièrement fréquents dans le contexte haïtien.",
));

children.push(calloutBox(
  "ENTREPRENDRE — Trois statuts fréquents",
  [
    "Entreprise individuelle : une seule personne possède et dirige l'entreprise.",
    "Coopérative : un groupe de personnes s'associe pour gérer ensemble une activité (par exemple, une " +
    "coopérative de producteurs agricoles).",
    "Petite et moyenne entreprise (PME) : entreprise de taille limitée, avec quelques employés.",
  ],
  BOX_ENTREPRENDRE_FILL, BOX_ENTREPRENDRE_LINE, "6B3512",
));
children.push(spacer(160));
children.push(bodyPar(
  "D'autres statuts existent, avec des noms plus techniques (société en nom collectif, société anonyme, " +
  "société par actions...) : tu les rencontreras peut-être plus tard, mais ce chapitre ne va pas plus loin dans " +
  "leur explication.",
  { italics: true },
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-03",
  "Différentes formes d'entreprise",
  "Trois vignettes comparant une très petite entreprise (un vendeur seul), une PME (un petit atelier avec " +
  "quelques employés) et une coopérative (un groupe de producteurs travaillant ensemble).",
  "Les entreprises se distinguent par leur taille et leur organisation.",
  "Illustrer concrètement les différentes formes d'entreprise adaptées au niveau 7e AF.",
  "Illustration en 3 vignettes, pleine largeur, contexte haïtien crédible.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les personnes et les rôles dans une entreprise", "5.5"));
children.push(bodyPar(
  "Dans une entreprise, même petite, plusieurs rôles sont nécessaires : quelqu'un dirige et organise, quelqu'un " +
  "produit le bien ou réalise le service, quelqu'un s'occupe de vendre ou d'accueillir les clients. Dans une " +
  "très petite entreprise, une seule personne peut cumuler plusieurs rôles ; dans une entreprise plus grande, " +
  "les rôles sont répartis entre plusieurs personnes, selon une organisation (parfois représentée par un " +
  "organigramme).",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-04",
  "Les personnes et les rôles dans une petite organisation",
  "Scène dans un petit atelier haïtien : plusieurs personnes avec des rôles différents (une qui dirige, une qui " +
  "fabrique, une qui vend), dans une ambiance de travail organisée.",
  "Une entreprise repose sur plusieurs rôles complémentaires.",
  "Illustrer concrètement la répartition des rôles dans une petite entreprise.",
  "Illustration pleine largeur, scène d'atelier ou de commerce haïtien, ambiance collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Ressources, outils et moyens de travail", "5.6"));
children.push(bodyPar(
  "Pour fonctionner, une entreprise a besoin de ressources : de l'argent pour démarrer et fonctionner, des " +
  "matières premières (comme le tissu pour une couturière), des outils adaptés à son activité, et un lieu de " +
  "travail (un atelier, une boutique, un champ).",
));

children.push(calloutBox(
  "OUTIL — Ce dont une entreprise a besoin",
  [
    "Des ressources (argent, matières premières).",
    "Des outils adaptés à son activité.",
    "Un lieu de travail.",
    "Des personnes pour réaliser les tâches.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, "343B42",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-05",
  "Ressources et outils nécessaires à une activité",
  "Illustration d'un atelier de couture haïtien avec ses éléments essentiels visibles : tissu, machine à " +
  "coudre, table de travail, sans mise en situation dangereuse.",
  "Une entreprise mobilise des ressources et des outils précis pour fonctionner.",
  "Rendre concrète la notion de ressources et d'outils nécessaires à une activité économique.",
  "Illustration demi-page, scène d'atelier haïtien, éléments bien identifiables.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les secteurs d'activité", "5.7"));
children.push(bodyPar(
  "Le programme distingue trois grands secteurs d'activité : le secteur primaire (qui exploite directement les " +
  "ressources naturelles, comme l'agriculture, la pêche ou le recyclage), le secteur secondaire (qui transforme " +
  "des matières en produits, comme l'artisanat), et le secteur tertiaire (qui propose des services, comme le " +
  "commerce ou le transport).",
));
children.push(bodyPar(
  "Tu remarqueras que ces secteurs rejoignent directement ce que tu as déjà étudié : les métiers de la mer, le " +
  "recyclage et l'agriculture, vus dans les chapitres précédents, appartiennent en grande partie au secteur " +
  "primaire — le programme recommande d'ailleurs de choisir en priorité des exemples d'entreprises dans ces " +
  "domaines.",
));

children.push(threeColTable(
  ["Secteur", "Ce qu'il regroupe", "Exemple lié aux chapitres précédents"],
  [
    ["Primaire", "Exploitation directe des ressources naturelles", "Pêche (Chapitre 2), agriculture (Chapitre 4), collecte de déchets (Chapitre 3)"],
    ["Secondaire", "Transformation des matières en produits", "Un atelier d'artisanat qui transforme des déchets recyclés (Chapitre 3)"],
    ["Tertiaire", "Services rendus aux personnes", "Un petit commerce, un service de transport"],
  ],
  [2200, 3600, 3400],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Entreprise, communauté et environnement", "5.8"));
children.push(bodyPar(
  "Une entreprise ne fonctionne jamais seule : elle est influencée par son environnement, c'est-à-dire " +
  "l'ensemble des éléments extérieurs qui l'entourent — les clients, les autres entreprises, la communauté, " +
  "les ressources naturelles disponibles. Une entreprise responsable tient compte de ces éléments : elle " +
  "cherche à répondre utilement aux besoins de sa communauté, sans nuire à l'environnement.",
));

children.push(calloutBox(
  "ENVIRONNEMENT — Une entreprise responsable",
  [
    "Répond à un besoin réel de sa communauté.",
    "Traite bien les personnes qui y travaillent.",
    "Fait attention à son impact sur les ressources naturelles et l'environnement.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-07",
  "Entreprise, communauté et responsabilité",
  "Scène montrant une petite entreprise (atelier ou boutique) en lien avec sa communauté : des clients, un " +
  "voisinage, un environnement propre et respecté.",
  "Une entreprise fait partie d'une communauté et doit en tenir compte.",
  "Faire comprendre le lien entre une entreprise, sa communauté et son environnement.",
  "Illustration pleine largeur, scène de quartier haïtien, ambiance positive.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : imaginer une activité simple", "5.9"));
children.push(bodyPar(
  "Reprenons la situation de Sherline, présentée au début du chapitre. Imagine, avec ta classe, une petite " +
  "activité simple (bien ou service) que des élèves de 7e AF pourraient imaginer pour répondre à un besoin de " +
  "leur école ou de leur quartier — sans aller jusqu'à créer une véritable entreprise, ce qui sera étudié plus " +
  "tard dans ta scolarité.",
));
children.push(numberedPar("1. Quel besoin, dans ton école ou ton quartier, pourrait être satisfait par un bien ou un service simple ?"));
children.push(numberedPar("2. S'agit-il plutôt d'un bien ou d'un service ? Explique pourquoi."));
children.push(numberedPar("3. Quelles ressources, outils ou personnes seraient nécessaires pour réaliser cette activité ?"));
children.push(numberedPar("4. À quel secteur d'activité (primaire, secondaire, tertiaire) cette activité appartiendrait-elle ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Fiche d'identité d'une petite entreprise"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Décrire une petite entreprise à partir d'une image ou d'une description, en identifiant ce qu'elle produit, ses rôles et ses ressources." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier, crayon, images ou descriptions de petites entreprises locales (apportées par l'enseignant ou décrites de mémoire par les élèves). Aucune sortie ni aucune dépense n'est nécessaire." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Travail en petits groupes de 2 à 3 élèves, entièrement en classe." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis, avec ton groupe, une petite entreprise que tu connais (boutique, atelier, service de quartier)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Nommez l'entreprise choisie et dites ce qu'elle produit (bien ou service)."));
children.push(numberedPar("2. Identifiez sa taille approximative (très petite, PME, grande)."));
children.push(numberedPar("3. Listez les ressources et outils qu'elle utilise probablement."));
children.push(numberedPar("4. Complétez la fiche d'identité ci-dessous."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Fiche d'identité de l'entreprise :", { bold: true }));
children.push(threeColTable(
  ["Élément", "Description", "Remarque"],
  [
    ["Nom ou type d'entreprise", "", ""],
    ["Bien ou service produit", "", ""],
    ["Taille (très petite / PME / grande)", "", ""],
    ["Ressources et outils utilisés", "", ""],
  ],
  [3200, 3400, 2400],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Quel besoin de la communauté cette entreprise satisfait-elle ?"));
children.push(numberedPar("2. À quel secteur d'activité appartient-elle (primaire, secondaire, tertiaire) ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre fiche d'identité au reste de la classe en une ou deux phrases." }]));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-06",
  "L'activité pratique en classe",
  "Un petit groupe d'élèves de 7e AF, en classe, complétant une fiche d'identité d'entreprise à partir d'images " +
  "ou de descriptions, dans une ambiance organisée et collaborative.",
  "Décrire une entreprise à partir d'observations, entièrement en classe.",
  "Illustrer le déroulement concret de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Une activité économique près de chez moi"));
children.push(bodyPar(
  "Avec l'accord et sous la supervision d'un adulte responsable, observe ou interroge une personne qui tient un " +
  "petit commerce, un atelier ou propose un service près de chez toi.",
));
children.push(threeColTable(
  ["Activité observée", "Bien ou service produit", "Rôles remarqués"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 3200, 2600],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'analyse — Une situation à résoudre"));
children.push(bodyPar(
  "Un groupe de producteurs de ton quartier vend chacun ses légumes séparément, à des prix différents, et a du " +
  "mal à attirer suffisamment de clients.",
));
children.push(numberedPar("1. Quel est le besoin exact que ces producteurs doivent résoudre ?"));
children.push(numberedPar("2. Quelle forme d'entreprise, vue dans ce chapitre, pourrait les aider à s'organiser ensemble ?"));
children.push(numberedPar("3. Quels avantages y aurait-il à s'organiser de cette façon ?"));
children.push(numberedPar("4. À quel secteur d'activité appartient leur activité principale ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une entreprise produit un bien ou un service pour répondre à un besoin.",
    "Un bien est un objet matériel ; un service est une action rendue à quelqu'un.",
    "Les entreprises se distinguent par leur taille : très petite, PME, grande.",
    "Une entreprise peut avoir différents statuts juridiques (entreprise individuelle, coopérative, PME...).",
    "Une entreprise mobilise des ressources, des outils, un lieu de travail et des personnes aux rôles complémentaires.",
    "Il existe trois secteurs d'activité : primaire, secondaire, tertiaire.",
    "Une entreprise fait partie d'une communauté et doit tenir compte de son environnement.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer ce qu'est une entreprise.",
    "☐ Distinguer un bien d'un service.",
    "☐ Citer les trois tailles d'entreprise.",
    "☐ Nommer au moins deux statuts juridiques d'entreprise.",
    "☐ Citer des ressources et des outils nécessaires à une entreprise.",
    "☐ Citer les trois secteurs d'activité et donner un exemple pour chacun.",
    "☐ Expliquer pourquoi une entreprise doit tenir compte de sa communauté et de son environnement.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : entreprise, bien, service, taille d'entreprise, statut juridique, secteur d'activité " +
    "(primaire/secondaire/tertiaire), ressources, environnement de l'entreprise.",
    "Vocabulaire clé à maîtriser : très petite entreprise, PME, coopérative, entreprise individuelle, secteur " +
    "primaire/secondaire/tertiaire.",
    "Avant l'évaluation, vérifie que tu peux : distinguer un bien d'un service avec un exemple ; citer les trois " +
    "tailles d'entreprise ; citer les trois secteurs d'activité avec un exemple pour chacun.",
    "Question rapide de vérification : donne un exemple d'entreprise du secteur primaire et un exemple du " +
    "secteur tertiaire.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(5));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "service · coopérative · secteur primaire · bien · entreprise individuelle · secteur tertiaire · ressources · PME.",
  { italics: true },
));
children.push(numberedPar("1. Un objet matériel produit pour être utilisé ou vendu s'appelle un ......................"));
children.push(numberedPar("2. Une coupe de cheveux est un exemple de ......................"));
children.push(numberedPar("3. Une entreprise dirigée par une seule personne s'appelle une ......................"));
children.push(numberedPar("4. Un groupe de producteurs qui s'associent pour gérer une activité ensemble forme une ......................"));
children.push(numberedPar("5. Une entreprise de taille limitée, avec quelques employés, est une ......................"));
children.push(numberedPar("6. L'agriculture et la pêche appartiennent au ......................"));
children.push(numberedPar("7. Un service de transport appartient au ......................"));
children.push(numberedPar("8. L'argent, les matières premières et les outils sont des exemples de ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Une entreprise produit :"));
children.push(bulletPar("a) uniquement des biens"));
children.push(bulletPar("b) un bien ou un service pour répondre à un besoin"));
children.push(bulletPar("c) uniquement des services gratuits"));
children.push(spacer(60));
children.push(numberedPar("2. Lequel de ces exemples est un service ?"));
children.push(bulletPar("a) une chaise"));
children.push(bulletPar("b) un sac de riz"));
children.push(bulletPar("c) une réparation de vélo"));
children.push(spacer(60));
children.push(numberedPar("3. Une coopérative est :"));
children.push(bulletPar("a) une entreprise dirigée par une seule personne"));
children.push(bulletPar("b) un groupe de personnes qui gèrent ensemble une activité"));
children.push(bulletPar("c) une très grande entreprise uniquement"));
children.push(spacer(60));
children.push(numberedPar("4. Le secteur secondaire regroupe des activités qui :"));
children.push(bulletPar("a) exploitent directement les ressources naturelles"));
children.push(bulletPar("b) transforment des matières en produits"));
children.push(bulletPar("c) proposent uniquement des services"));
children.push(spacer(60));
children.push(numberedPar("5. Une entreprise responsable :"));
children.push(bulletPar("a) ignore les besoins de sa communauté"));
children.push(bulletPar("b) tient compte de sa communauté et de son environnement"));
children.push(bulletPar("c) n'a aucun lien avec son environnement"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Bien", "a. Action réalisée pour répondre à un besoin, sans objet matériel."],
    ["2. Service", "b. Ensemble des éléments extérieurs qui influencent une entreprise."],
    ["3. Secteur primaire", "c. Objet matériel produit pour être utilisé ou vendu."],
    ["4. Environnement de l'entreprise", "d. Entreprise de taille limitée, avec quelques employés."],
    ["5. PME", "e. Groupe de personnes qui gèrent ensemble une activité."],
    ["6. Coopérative", "f. Secteur qui exploite directement les ressources naturelles."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Choisis une entreprise que tu connais et explique quel besoin elle satisfait, avec un bien ou un service."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi une entreprise a besoin de plusieurs rôles, même quand elle est petite."));
children.push(numberedPar("3. Propose une petite activité (bien ou service) qui pourrait répondre à un besoin de ton école."));
children.push(numberedPar("4. Explique pourquoi une entreprise devrait faire attention à son environnement et à sa communauté."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir ce qu'est une entreprise : une organisation qui produit un bien ou un " +
  "service pour répondre à un besoin. Tu as appris à distinguer un bien d'un service, à reconnaître différentes " +
  "tailles d'entreprise (très petite, PME, grande) et quelques statuts juridiques (entreprise individuelle, " +
  "coopérative, PME), ainsi que les rôles et les ressources nécessaires à son fonctionnement. Tu as aussi " +
  "découvert les trois secteurs d'activité — primaire, secondaire, tertiaire — et compris qu'une entreprise " +
  "fait toujours partie d'une communauté et d'un environnement dont elle doit tenir compte. Ce chapitre te " +
  "prépare à mobiliser, dans le dernier chapitre de l'année, ce que tu as appris sur les métiers de la mer, le " +
  "recyclage, l'agriculture et l'entrepreneuriat.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "entreprise · bien · service · très petite entreprise · PME · coopérative · entreprise individuelle · secteur " +
  "primaire/secondaire/tertiaire · environnement de l'entreprise.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C05-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Découvrir l'entreprise », avec des branches vers : bien/service, " +
  "tailles d'entreprise, statuts, rôles, ressources, secteurs d'activité, environnement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, sobre.",
));

await buildAndSave(children, 57, "Manuel_ETAP_7AF_Chapitre5.docx");
