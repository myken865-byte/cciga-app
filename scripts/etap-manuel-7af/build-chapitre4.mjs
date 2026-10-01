// Manuel d'ETAP 7e AF — Chapitre 4 : Les metiers de l'agriculture : outils et
// organisation (champ officiel : Metiers de l'agriculture generateurs de
// revenus).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.43-44/77 (programme detaille 7e AF, unite "Les metiers de
//       l'agriculture generateurs de revenus en 7e annee du fondamental") :
//       competence ciblee, listes de metiers (production vegetale /
//       production animale), outils (manuels / mecanises / informatises /
//       biologiques), taches/organisation sociale/enjeux environnementaux
//       (dont l'usage de produits phytosanitaires), propositions d'activites,
//       modalites/criteres d'evaluation.
// Page 45/77 commence l'unite suivante ("L'entrepreneuriat en 7e annee") —
// hors perimetre de ce chapitre.
//
// Regle de securite stricte appliquee : aucune activite ne demande a
// l'eleve de manipuler un outil mecanise/motorise (motoculteur, chargeuse de
// balles, vibreur a olives), un produit phytosanitaire (fongicide,
// insecticide, herbicide) ou tout autre materiel dangereux. Ces elements
// sont uniquement decrits/observes, jamais manipules par l'eleve.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_METIER_FILL, BOX_METIER_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
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
  4,
  "Les métiers de l'agriculture : outils et organisation",
  "Un jardin derrière une maison, un champ de maïs, des poules dans une cour... L'agriculture est partout autour " +
  "de toi, même en ville. Découvre les métiers, les outils et l'organisation qui la rendent possible.",
  [
    "Expliquer le rôle de l'agriculture pour répondre aux besoins humains.",
    "Identifier des métiers liés à la production végétale et à la production animale.",
    "Reconnaître des outils agricoles et leur fonction.",
    "Comprendre comment s'organise le travail agricole.",
    "Décrire une chaîne simple, de la préparation à la production.",
    "Expliquer des règles de sécurité et des pratiques respectueuses de l'environnement en agriculture.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans la cour de son grand-père, à Marmelade, Rodson observe chaque semaine les mêmes " +
  "gestes : préparer la terre, semer, arroser, surveiller les plantes, puis récolter. Il se demande combien de " +
  "métiers différents se cachent derrière ce travail qui semble si simple.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Production végétale — activité agricole liée à la culture des plantes."));
children.push(bulletPar("Production animale — activité agricole liée à l'élevage des animaux."));
children.push(bulletPar("Outil manuel — outil utilisé directement à la main, sans moteur."));
children.push(bulletPar("Outil mécanisé — outil ou machine équipé d'un moteur pour faciliter le travail."));
children.push(bulletPar("Organisation sociale — façon dont les rôles et les tâches sont répartis entre les personnes."));
children.push(bulletPar("Produit phytosanitaire — produit utilisé pour protéger les cultures (fongicide, insecticide, herbicide)."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("L'agriculture et les besoins humains", "4.1"));
children.push(bodyPar(
  "L'agriculture regroupe l'ensemble des activités qui permettent de cultiver des plantes ou d'élever des " +
  "animaux pour répondre à des besoins essentiels : se nourrir, mais aussi produire des matières premières " +
  "utilisées dans d'autres activités (textile, artisanat...). En Haïti, de nombreuses familles vivent, en tout " +
  "ou en partie, de l'agriculture, que ce soit sur une grande exploitation ou dans un simple jardin familial.",
));
children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-01",
  "Scène agricole haïtienne d'ouverture",
  "Vue d'ensemble d'un petit paysage agricole haïtien : un champ cultivé, quelques animaux d'élevage à distance, " +
  "une personne travaillant la terre avec un outil manuel, sans scène dangereuse.",
  "L'agriculture répond à des besoins essentiels et prend des formes variées.",
  "Donner à l'élève une vision d'ensemble avant d'entrer dans le détail des métiers.",
  "Illustration pleine largeur, paysage rural haïtien paisible, style scolaire réaliste.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Découvrir les métiers de l'agriculture", "4.2"));
children.push(bodyPar(
  "Le programme distingue deux grandes familles de métiers agricoles : les métiers de la production végétale " +
  "(liés à la culture des plantes) et les métiers de la production animale (liés à l'élevage).",
));

children.push(calloutBox(
  "MÉTIER — Quelques exemples par famille",
  [
    "Production végétale : producteur céréalier, technicien horticole, conseiller agricole, chef de culture.",
    "Production animale : éleveur (bovin, ovin, caprin...), technicien d'élevage (lait, viande, aviculture...).",
  ],
  BOX_METIER_FILL, BOX_METIER_LINE, "6B3512",
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce ne sont là que quelques exemples parmi les nombreux métiers liés à l'agriculture. Certains exigent une " +
  "formation technique, d'autres s'apprennent surtout par l'expérience transmise en famille ou dans la " +
  "communauté.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-02",
  "Panorama des métiers agricoles",
  "Petits portraits côte à côte : un producteur céréalier dans un champ, un éleveur près de ses animaux, un " +
  "conseiller agricole discutant avec un producteur, sans activité dangereuse.",
  "Les métiers de l'agriculture sont variés : certains liés aux plantes, d'autres aux animaux.",
  "Aider l'élève à associer un métier à la famille (production végétale ou animale) à laquelle il appartient.",
  "Illustration en 3 vignettes, pleine largeur, personnages haïtiens crédibles.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les outils agricoles", "4.3"));
children.push(bodyPar(
  "Le travail agricole s'appuie sur des outils très différents selon les tâches à réaliser. On distingue les " +
  "outils manuels, les outils mécanisés, les outils informatisés et les outils biologiques.",
));

children.push(calloutBox(
  "OUTIL — Quatre familles d'outils agricoles",
  [
    "Outils manuels : pioche, pelle, bêche, fourche à foin, râteau.",
    "Outils mécanisés : motoculteur, chargeuse de balles, vibreur à olives.",
    "Outils informatisés : logiciels et applications pour planifier ou suivre une production.",
    "Outils biologiques : semences, engrais.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, "343B42",
));
children.push(spacer(160));
children.push(bodyPar(
  "Les outils mécanisés, équipés d'un moteur, permettent de travailler plus vite sur de grandes surfaces, mais " +
  "ils exigent une formation et des précautions particulières : ce sont des outils réservés à des adultes " +
  "compétents.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-03",
  "Planche des outils agricoles et de leurs fonctions",
  "Planche illustrée présentant, avec leur nom en légende : une pioche, une bêche, un râteau, un motoculteur " +
  "(vu de loin, à l'arrêt), des semences et un sac d'engrais — objets seuls, sans mise en situation dangereuse.",
  "Reconnaître et nommer des outils agricoles et associer chacun à sa fonction.",
  "Permettre à l'élève d'associer un outil à son nom et à son usage.",
  "Illustration type planche pédagogique, fond neutre, objets bien séparés et légendés.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Organisation du travail agricole", "4.4"));
children.push(bodyPar(
  "Comme pour les métiers de la mer, le travail agricole demande de l'organisation : préparer la terre, semer " +
  "ou installer les animaux, entretenir les cultures ou s'occuper des bêtes, puis récolter ou commercialiser les " +
  "produits. Ces tâches sont souvent réparties entre plusieurs personnes, dans une famille ou une coopérative.",
));

children.push(calloutBox(
  "OBSERVER — Avant, pendant, après",
  [
    "Avant : préparer le sol ou les installations, choisir les semences ou les animaux.",
    "Pendant : entretenir les cultures ou les animaux, surveiller leur évolution.",
    "Après : récolter ou produire, puis conserver, transformer ou vendre.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-04",
  "Coopération autour d'une activité agricole",
  "Scène familiale ou communautaire : plusieurs personnes travaillant ensemble dans un jardin ou un petit champ, " +
  "chacune avec une tâche différente (arrosage, désherbage manuel, transport de récolte).",
  "Le travail agricole repose souvent sur la coopération entre plusieurs personnes.",
  "Illustrer concrètement la répartition des rôles dans une activité agricole.",
  "Illustration pleine largeur, scène rurale haïtienne, ambiance collaborative et sereine.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("De la préparation à la production", "4.5"));
children.push(bodyPar(
  "Comprendre un métier agricole, c'est aussi suivre les grandes étapes qui mènent d'un sol préparé à un produit " +
  "récolté. Prenons l'exemple simple d'une culture de légumes.",
));

children.push(twoColTable(
  "Étape", "Ce qui se passe",
  [
    ["1. Préparation du sol", "Le sol est nettoyé et préparé pour recevoir les semences."],
    ["2. Semis", "Les semences sont mises en terre."],
    ["3. Entretien", "Les cultures sont arrosées et surveillées jusqu'à leur croissance."],
    ["4. Récolte et vente", "Les légumes sont récoltés puis vendus ou consommés."],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette chaîne simple montre que la production agricole demande du temps et de la constance, bien avant " +
  "d'arriver jusqu'au marché ou à la table familiale.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-05",
  "De la préparation du sol à la récolte : une chaîne simple",
  "Schéma en 4 étapes reliées par des flèches : sol préparé → semis → plante qui pousse et est arrosée → panier " +
  "de légumes récoltés.",
  "La production agricole suit plusieurs étapes avant d'arriver au consommateur.",
  "Faire comprendre la notion de chaîne simple d'activité productive appliquée à l'agriculture.",
  "Schéma horizontal en 4 cases, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Utiliser et entretenir les outils de manière responsable", "4.6"));
children.push(bodyPar(
  "Un outil agricole bien entretenu dure plus longtemps et reste plus sûr à utiliser. Après chaque usage, un " +
  "outil manuel doit être nettoyé, séché et rangé correctement, à l'abri de l'humidité et hors de portée des " +
  "jeunes enfants.",
));

children.push(calloutBox(
  "SÉCURITÉ — Manipuler et ranger un outil manuel",
  [
    "Toujours utiliser un outil pour la tâche à laquelle il est destiné.",
    "Nettoyer et sécher l'outil après usage.",
    "Ranger les outils tranchants ou pointus hors de portée des jeunes enfants.",
    "Ne jamais utiliser seul un outil mécanisé ou motorisé (motoculteur, chargeuse...) : ces outils sont réservés à des adultes formés.",
    "Signaler tout outil endommagé à un adulte responsable, sans essayer de le réparer soi-même.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Agriculture et environnement", "4.7"));
children.push(bodyPar(
  "Certaines pratiques agricoles utilisent des produits phytosanitaires — des fongicides, des insecticides ou " +
  "des herbicides — pour protéger les cultures. Ces produits peuvent être utiles, mais leur usage a aussi des " +
  "conséquences sur l'environnement : ils peuvent affecter le sol, l'eau et les êtres vivants s'ils sont mal " +
  "utilisés.",
));
children.push(bodyPar(
  "C'est pourquoi il est important de comprendre ces enjeux, même sans manipuler soi-même ces produits : cela " +
  "permet de devenir un citoyen capable de comprendre les choix faits par les agriculteurs et de réfléchir à des " +
  "pratiques plus respectueuses du sol et de l'eau.",
));

children.push(calloutBox(
  "ENVIRONNEMENT — Des pratiques à comprendre",
  [
    "Les produits phytosanitaires (fongicides, insecticides, herbicides) protègent les cultures mais peuvent " +
    "avoir des conséquences sur l'environnement s'ils sont mal utilisés.",
    "Protéger le sol et l'eau permet de conserver des terres fertiles pour l'avenir.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-07",
  "Agriculture et protection de l'environnement",
  "Illustration comparative : d'un côté un sol bien entretenu avec une culture saine, de l'autre un sol appauvri " +
  "; sans montrer de manipulation de produit chimique, uniquement le résultat visible.",
  "Les pratiques agricoles ont un effet direct sur la qualité du sol et de l'eau.",
  "Faire comprendre l'impact environnemental de certaines pratiques agricoles, sans mettre en scène de manipulation dangereuse.",
  "Illustration en deux vignettes comparatives, pleine largeur, contexte rural haïtien.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La technologie au service du travail agricole", "4.8"));
children.push(bodyPar(
  "Certains outils vus à la section 4.3 aident les agriculteurs à mieux organiser leur travail. Un motoculteur " +
  "permet de préparer un sol plus rapidement qu'à la main ; un logiciel ou une application peut aider à " +
  "planifier les semis ou à suivre l'évolution d'une culture. Ces outils ne remplacent pas le savoir-faire des " +
  "agriculteurs, mais ils rendent leur travail plus efficace.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Résoudre un problème lié à l'agriculture", "4.9"));
children.push(bodyPar(
  "Chez le grand-père de Rodson, la terre semble donner de moins en moins de légumes chaque saison, même en " +
  "utilisant les mêmes techniques qu'avant. Réfléchis à cette situation en mobilisant ce que tu as appris dans " +
  "ce chapitre.",
));
children.push(numberedPar("1. À ton avis, quelles pourraient être les causes de cette situation ?"));
children.push(numberedPar("2. Quel métier, parmi ceux vus à la section 4.2, pourrait aider à comprendre le problème ?"));
children.push(numberedPar("3. Propose une solution respectueuse de l'environnement, en t'appuyant sur la section 4.7."));
children.push(numberedPar("4. Quel outil, parmi ceux vus à la section 4.3, pourrait aider à mettre en œuvre ta solution ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Fiche d'identité d'un outil agricole"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Décrire un outil agricole, sa fonction et les précautions liées à son usage." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier, crayon, images ou dessins d'outils agricoles (apportés par l'enseignant, dessinés par les élèves, ou un vrai outil manuel simple si l'école en dispose)." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Travail en petits groupes de 2 à 3 élèves, en classe ou dans un espace scolaire sûr." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis, avec ton groupe, un outil agricole étudié à la section 4.3." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Nommez l'outil choisi et dites à quelle famille il appartient (manuel, mécanisé, informatisé, biologique)."));
children.push(numberedPar("2. Décrivez sa fonction principale."));
children.push(numberedPar("3. Indiquez qui peut l'utiliser (un élève, un adulte formé...) et pourquoi."));
children.push(numberedPar("4. Complétez la fiche d'identité ci-dessous."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Fiche d'identité de l'outil :", { bold: true }));
children.push(threeColTable(
  ["Élément", "Description", "Remarque"],
  [
    ["Nom de l'outil", "", ""],
    ["Famille (manuel / mécanisé / informatisé / biologique)", "", ""],
    ["Fonction principale", "", ""],
    ["Qui peut l'utiliser en sécurité ?", "", ""],
  ],
  [3200, 3400, 2400],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Pourquoi certains outils agricoles ne doivent-ils être utilisés que par des adultes formés ?"));
children.push(numberedPar("2. Que risque-t-on à mal entretenir un outil agricole ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre fiche d'identité au reste de la classe en une ou deux phrases." }]));
children.push(spacer(80));

children.push(calloutBox(
  "SÉCURITÉ pour cette activité",
  [
    "Cette activité se réalise à partir d'images, de dessins ou d'un outil manuel simple, sous supervision.",
    "Aucune manipulation d'outil mécanisé, motorisé ou de produit phytosanitaire n'est demandée.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-06",
  "Usage responsable des outils en activité",
  "Un petit groupe d'élèves de 7e AF, en classe, observant et décrivant un outil manuel simple (pioche ou " +
  "bêche) posé sur une table, sous le regard d'un enseignant.",
  "Décrire un outil agricole et son usage responsable, en toute sécurité.",
  "Illustrer concrètement le déroulement de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et encadrée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Une activité agricole près de chez moi"));
children.push(bodyPar(
  "Avec l'accord et sous la supervision d'un adulte responsable, observe ou interroge une personne exerçant une " +
  "activité agricole près de chez toi (dans un jardin, un petit champ, un élevage familial). Reste toujours à " +
  "distance des outils mécanisés et des produits utilisés pour protéger les cultures.",
));
children.push(threeColTable(
  ["Activité observée", "Tâches principales", "Outils remarqués"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [3200, 3400, 2400],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'analyse — Une situation à résoudre"));
children.push(bodyPar(
  "Une famille cultive un petit jardin, mais les plants sont régulièrement attaqués par des insectes, ce qui " +
  "réduit la récolte.",
));
children.push(numberedPar("1. Quel est le besoin exact à résoudre dans cette situation ?"));
children.push(numberedPar("2. Quel métier, parmi ceux vus dans ce chapitre, pourrait conseiller cette famille ?"));
children.push(numberedPar("3. Propose une solution qui tient compte à la fois de la récolte et de la protection de l'environnement."));
children.push(numberedPar("4. Pourquoi est-il important qu'un enfant de la famille ne manipule pas lui-même de produit destiné à protéger les cultures ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "L'agriculture répond à des besoins essentiels : se nourrir et produire des matières premières.",
    "Les métiers de l'agriculture se répartissent en production végétale et production animale.",
    "Les outils agricoles sont manuels, mécanisés, informatisés ou biologiques.",
    "Le travail agricole suppose une organisation en plusieurs étapes : avant, pendant et après.",
    "Une production agricole suit une chaîne simple, de la préparation du sol à la récolte.",
    "Les produits phytosanitaires protègent les cultures mais peuvent avoir des conséquences sur l'environnement.",
    "Certains outils agricoles sont réservés à des adultes formés.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer le rôle de l'agriculture pour répondre aux besoins humains.",
    "☐ Citer des métiers de la production végétale et de la production animale.",
    "☐ Reconnaître des outils manuels, mécanisés, informatisés et biologiques.",
    "☐ Décrire l'organisation du travail agricole avant, pendant et après.",
    "☐ Expliquer une chaîne simple, de la préparation du sol à la récolte.",
    "☐ Citer une règle de sécurité liée aux outils agricoles.",
    "☐ Expliquer un effet des produits phytosanitaires sur l'environnement.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : production végétale/animale, outil manuel/mécanisé/informatisé/biologique, " +
    "organisation sociale, chaîne préparation-production, produit phytosanitaire, sécurité.",
    "Vocabulaire clé à maîtriser : producteur céréalier, éleveur, motoculteur, semences, engrais, fongicide, " +
    "insecticide, herbicide.",
    "Avant l'évaluation, vérifie que tu peux : citer un métier de chaque famille (végétale, animale) ; nommer " +
    "un outil de chaque type ; expliquer pourquoi certains outils sont réservés aux adultes formés.",
    "Question rapide de vérification : cite une étape réalisée avant la récolte, et une réalisée après.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(4));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "éleveur · motoculteur · engrais · production végétale · herbicide · organisation sociale · récolte · pioche.",
  { italics: true },
));
children.push(numberedPar("1. Cultiver des légumes fait partie de la ......................"));
children.push(numberedPar("2. Une personne qui s'occupe d'animaux comme des bœufs ou des chèvres est un ......................"));
children.push(numberedPar("3. La ...................... est un outil manuel utilisé pour travailler la terre."));
children.push(numberedPar("4. Le ...................... est un outil mécanisé qui prépare le sol plus rapidement."));
children.push(numberedPar("5. Un ...................... est un produit biologique utilisé pour nourrir le sol."));
children.push(numberedPar("6. Un ...................... est un produit phytosanitaire utilisé contre les mauvaises herbes."));
children.push(numberedPar("7. La façon dont les rôles sont répartis dans une exploitation agricole s'appelle l'......................"));
children.push(numberedPar("8. La dernière étape de la chaîne agricole étudiée dans ce chapitre est la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Lequel de ces métiers appartient à la production animale ?"));
children.push(bulletPar("a) producteur céréalier"));
children.push(bulletPar("b) technicien horticole"));
children.push(bulletPar("c) éleveur"));
children.push(spacer(60));
children.push(numberedPar("2. Le motoculteur est un outil :"));
children.push(bulletPar("a) manuel"));
children.push(bulletPar("b) mécanisé"));
children.push(bulletPar("c) biologique"));
children.push(spacer(60));
children.push(numberedPar("3. Qui peut utiliser un outil mécanisé comme un motoculteur ?"));
children.push(bulletPar("a) n'importe quel élève"));
children.push(bulletPar("b) un adulte formé"));
children.push(bulletPar("c) personne, jamais"));
children.push(spacer(60));
children.push(numberedPar("4. Un produit phytosanitaire sert à :"));
children.push(bulletPar("a) nourrir les animaux"));
children.push(bulletPar("b) protéger les cultures"));
children.push(bulletPar("c) préparer le sol"));
children.push(spacer(60));
children.push(numberedPar("5. Pourquoi faut-il faire attention à l'usage des produits phytosanitaires ?"));
children.push(bulletPar("a) ils n'ont aucun effet particulier"));
children.push(bulletPar("b) ils peuvent avoir des conséquences sur l'environnement s'ils sont mal utilisés"));
children.push(bulletPar("c) ils rendent le sol plus fertile automatiquement"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Producteur céréalier", "a. Outil manuel utilisé pour travailler la terre."],
    ["2. Éleveur", "b. Produit utilisé pour protéger les cultures contre les insectes."],
    ["3. Bêche", "c. Personne qui cultive des céréales."],
    ["4. Insecticide", "d. Outil mécanisé qui prépare le sol plus rapidement."],
    ["5. Motoculteur", "e. Produit biologique qui nourrit le sol."],
    ["6. Engrais", "f. Personne qui s'occupe d'animaux d'élevage."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Choisis un métier agricole étudié dans ce chapitre et explique en quoi il répond à un besoin humain."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi l'organisation est importante dans le travail agricole."));
children.push(numberedPar("3. Un voisin veut utiliser seul un motoculteur qu'il ne connaît pas. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("4. Propose une action simple, réalisable par des élèves, pour protéger le sol d'un jardin scolaire."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir le rôle de l'agriculture dans la satisfaction des besoins humains, ainsi " +
  "que les métiers de la production végétale et de la production animale. Tu as appris à reconnaître les " +
  "outils manuels, mécanisés, informatisés et biologiques utilisés en agriculture, et à comprendre comment le " +
  "travail s'organise avant, pendant et après une activité agricole, à travers une chaîne simple allant de la " +
  "préparation du sol à la récolte. Tu as aussi découvert des règles de sécurité liées aux outils, ainsi que " +
  "les enjeux environnementaux liés à l'usage des produits phytosanitaires. Ces notions te seront utiles dans " +
  "le prochain chapitre, consacré à un métier qui, lui aussi, mobilise organisation et responsabilité : " +
  "l'entrepreneuriat.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "production végétale · production animale · outil manuel/mécanisé/informatisé/biologique · organisation " +
  "sociale · produit phytosanitaire · sécurité · environnement.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C04-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Les métiers de l'agriculture », avec des branches vers : métiers, " +
  "outils, organisation, chaîne de production, sécurité, environnement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, sobre.",
));

await buildAndSave(children, 43, "Manuel_ETAP_7AF_Chapitre4.docx");
