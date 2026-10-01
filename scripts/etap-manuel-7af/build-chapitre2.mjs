// Manuel d'ETAP 7e AF — Chapitre 2 : Les metiers de la mer : outils et
// organisation (champ officiel : Metiers de la mer generateurs de revenus).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.40-41/77 (programme detaille 7e AF, unite "Les metiers de la mer
//       generateurs de revenus en 7e annee du fondamental") : competence
//       ciblee, listes de metiers (navigants / tourisme / non-navigants),
//       outils (manuels / mecanises / informatises), taches et organisation
//       sociale (transport maritime, peche, sports et loisirs nautiques),
//       propositions d'activites, modalites/criteres d'evaluation.
// Page 42/77 commence l'unite suivante ("Les metiers du recyclage et des
// energies renouvelables en 7e annee") — hors perimetre de ce chapitre.
//
// Regle de securite stricte appliquee : aucune activite ne demande a
// l'eleve de manipuler une embarcation, un moteur, un hameçon, une lame ou
// un filet lourd, ni de se rendre seul en mer. Les activites officielles du
// programme ("visites", "interviewer des acteurs") sont reprises sous forme
// d'observation/enquete encadree par l'ecole, jamais de manipulation directe
// d'equipement dangereux.
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
  2,
  "Les métiers de la mer : outils et organisation",
  "Filets qui sèchent sur le sable, pirogues qui rentrent au port, marché animé au petit matin... La mer fait " +
  "vivre de nombreuses familles haïtiennes, à travers des métiers variés et une organisation précise. Découvre-les.",
  [
    "Décrire ce que la mer apporte comme ressources et activités humaines.",
    "Identifier plusieurs métiers de la mer et ce qu'ils exigent.",
    "Reconnaître des outils utilisés dans ces métiers et leur fonction.",
    "Comprendre comment s'organise le travail autour d'une activité maritime.",
    "Expliquer les règles de sécurité liées aux métiers de la mer.",
    "Comprendre pourquoi il faut préserver les ressources marines.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Wilkenson habite un village côtier près de Miragoâne. Chaque matin, il observe les " +
  "pêcheurs préparer leurs sorties, les vendeuses attendre le retour des pirogues, et parfois des agents du port " +
  "contrôler les marchandises. Il se demande : combien de métiers différents la mer fait-elle vivre autour de " +
  "lui, et comment tout ce monde s'organise-t-il ?",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Métier navigant — métier exercé en mer, à bord d'une embarcation."));
children.push(bulletPar("Métier non navigant — métier lié à la mer mais exercé sur la terre ferme (port, quai)."));
children.push(bulletPar("Organisation sociale — façon dont les rôles et les tâches sont répartis entre les personnes."));
children.push(bulletPar("Écosystème marin — ensemble des êtres vivants et de leur milieu dans la mer."));
children.push(bulletPar("Ressource — élément de la mer (poissons, coquillages...) utilisé par l'être humain."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La mer, un espace de vie et d'activités productives", "2.1"));
children.push(bodyPar(
  "La mer n'est pas seulement un paysage : c'est aussi une source de nourriture, de revenus et de transport pour " +
  "de nombreuses communautés haïtiennes. Elle offre des ressources (poissons, coquillages, sel) et permet des " +
  "activités variées : la pêche, le transport de personnes et de marchandises, ainsi que des activités de sports " +
  "et loisirs nautiques.",
));
children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-01",
  "La mer, espace de vie et d'activités",
  "Vue d'ensemble d'un littoral haïtien animé : quelques pirogues sur l'eau au loin, un petit port, un marché de " +
  "poissons sur la plage, sans personne en action dangereuse.",
  "La mer fait vivre plusieurs activités humaines à la fois.",
  "Donner à l'élève une vision d'ensemble avant d'entrer dans le détail des métiers.",
  "Illustration pleine largeur, vue panoramique paisible, style scolaire réaliste.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Découvrir les métiers de la mer", "2.2"));
children.push(bodyPar(
  "Le programme distingue trois familles de métiers de la mer : les métiers navigants (exercés à bord d'une " +
  "embarcation), les métiers liés au tourisme, et les métiers non navigants (exercés à terre, souvent au port).",
));

children.push(calloutBox(
  "MÉTIER — Quelques exemples par famille",
  [
    "Métiers navigants : marin-pêcheur, pisciculteur, aquaculteur, mécanicien marin, capitaine de navire.",
    "Métiers liés au tourisme : moniteur de ski nautique, hôtesse d'accueil dans une station balnéaire.",
    "Métiers non navigants : douanier, agent maritime, gardien de phare, poissonnier.",
  ],
  BOX_METIER_FILL, BOX_METIER_LINE, "6B3512",
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce ne sont que quelques exemples parmi les nombreux métiers liés à la mer. Chacun exige des connaissances et " +
  "des responsabilités différentes, mais tous contribuent, à leur manière, à faire vivre les communautés côtières.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-02",
  "Portraits de métiers de la mer",
  "Quatre petits portraits côte à côte : un marin-pêcheur sur le quai avec ses filets rangés, un agent maritime " +
  "au port avec un registre, une hôtesse d'accueil dans une station balnéaire, un pisciculteur près d'un bassin.",
  "Les métiers de la mer sont variés : certains en mer, d'autres à terre.",
  "Aider l'élève à associer un métier à son cadre de travail (embarcation, port, station balnéaire).",
  "Illustration en 4 vignettes, pleine largeur, personnages haïtiens crédibles, aucune situation dangereuse.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les outils utilisés", "2.3"));
children.push(bodyPar(
  "Chaque métier de la mer s'appuie sur des outils précis. On peut les classer en trois groupes : les outils " +
  "manuels, les outils mécanisés, et les outils informatisés, qui aident à situer, orienter ou communiquer.",
));

children.push(calloutBox(
  "OUTIL — Trois familles d'outils",
  [
    "Outils manuels : filet, pirogue, canne à pêche, nasse.",
    "Outils mécanisés : système de poulies, treuil, bateau à moteur, compas.",
    "Outils informatisés : GPS, radio VHF, thermomètre, indicateur de marée.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, "343B42",
));
children.push(spacer(160));
children.push(bodyPar(
  "Les outils informatisés, en particulier le GPS et la radio VHF, servent surtout à aider les professionnels à " +
  "se repérer en mer et à communiquer en cas de besoin : ce sont des outils de sécurité autant que de travail.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-03",
  "Planche des outils des métiers de la mer",
  "Planche illustrée présentant, avec leur nom en légende : un filet, une pirogue, une canne à pêche, un compas, " +
  "un GPS, une radio VHF — objets seuls, sans mise en situation dangereuse.",
  "Reconnaître et nommer des outils utilisés dans les métiers de la mer.",
  "Permettre à l'élève d'associer chaque outil à son nom et, plus tard, à sa fonction.",
  "Illustration type planche pédagogique, fond neutre, objets bien séparés et légendés.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Organisation du travail", "2.4"));
children.push(bodyPar(
  "Un métier de la mer n'est presque jamais exercé seul. Avant une sortie de pêche, par exemple, plusieurs " +
  "tâches doivent être réparties : vérifier et préparer le matériel, planifier le trajet, répartir les rôles à " +
  "bord, puis, au retour, organiser la vente ou la conservation des produits.",
));
children.push(bodyPar(
  "Le programme identifie trois grandes activités où cette organisation est particulièrement visible : le " +
  "transport maritime, la pêche, et les sports et loisirs nautiques. Dans chacune, les tâches, les rôles et les " +
  "responsabilités sont différents, mais la coopération entre les personnes reste indispensable.",
));

children.push(calloutBox(
  "OBSERVER — Avant, pendant, après",
  [
    "Avant : préparation du matériel, vérification de la météo, répartition des rôles.",
    "Pendant : réalisation de la tâche (pêche, transport, accueil des visiteurs...).",
    "Après : retour, vente ou conservation des produits, entretien du matériel.",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-04",
  "La préparation d'une sortie de pêche",
  "Scène sur la plage/le quai (pas en mer) : un groupe de pêcheurs qui préparent et rangent leur matériel avant " +
  "le départ, se répartissant les tâches, dans une ambiance calme et organisée.",
  "L'organisation du travail commence avant même de partir en mer.",
  "Illustrer concrètement la répartition des rôles sans montrer d'activité en mer.",
  "Illustration pleine largeur, scène côtière haïtienne, aucune embarcation en mouvement sur l'eau.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("De la ressource au produit", "2.5"));
children.push(bodyPar(
  "Comprendre un métier de la mer, c'est aussi suivre le chemin parcouru par une ressource, depuis la mer " +
  "jusqu'à la personne qui la consomme ou l'utilise. Prenons l'exemple simple du poisson.",
));

children.push(twoColTable(
  "Étape", "Ce qui se passe",
  [
    ["1. Capture", "Le poisson est pêché en mer par un marin-pêcheur (activité réservée aux professionnels)."],
    ["2. Retour et tri", "Le poisson est ramené au port, trié selon sa taille ou son espèce."],
    ["3. Vente", "Le poisson est vendu au marché ou à un poissonnier."],
    ["4. Consommation", "La famille ou le restaurant prépare et consomme le poisson."],
  ],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette chaîne simple montre que chaque produit de la mer passe par plusieurs métiers avant d'arriver jusqu'à " +
  "nous — ce qui explique pourquoi la coopération entre ces métiers est si importante.",
));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-05",
  "De la mer à l'assiette : une chaîne simple",
  "Schéma en 4 étapes reliées par des flèches : poisson dans la mer → pirogue au port avec tri → étal de marché " +
  "→ assiette/repas familial.",
  "Un produit de la mer passe par plusieurs étapes avant d'arriver au consommateur.",
  "Faire comprendre la notion de chaîne simple d'activité productive.",
  "Schéma horizontal en 4 cases, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Sécurité et prévention", "2.6"));
children.push(bodyPar(
  "Les métiers de la mer exposent les professionnels à des risques réels : mauvais temps, courants, fatigue, " +
  "matériel mal entretenu. C'est pourquoi les personnes qui travaillent en mer respectent des règles de " +
  "sécurité précises, avant, pendant et après chaque sortie.",
));

children.push(calloutBox(
  "SÉCURITÉ — Ce que font les professionnels de la mer",
  [
    "Ils vérifient les conditions météorologiques avant de partir.",
    "Ils portent un équipement adapté (gilet de sauvetage, par exemple).",
    "Ils vérifient l'état de leur embarcation et de leur matériel avant de prendre la mer.",
    "Ils préviennent une autre personne de leur destination et de leur heure de retour prévue.",
    "Un élève ne doit jamais partir en mer seul, ni manipuler une embarcation, un moteur ou un matériel de pêche sans la supervision directe d'un adulte responsable.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-06",
  "Un pêcheur qui se prépare en sécurité",
  "Un marin-pêcheur sur le quai, portant un gilet de sauvetage, consultant une indication météo simple avant de " +
  "partir, en présence d'un collègue.",
  "La sécurité en mer commence par la préparation à terre.",
  "Montrer des comportements de sécurité concrets sans mettre en scène une situation dangereuse.",
  "Illustration demi-page, scène de quai, ambiance sereine et responsable.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Préserver les ressources marines", "2.7"));
children.push(bodyPar(
  "Les métiers de la mer dépendent d'une ressource qui n'est pas illimitée : si l'on pêche plus de poissons que " +
  "la mer ne peut en reproduire, ou si l'on pollue l'eau avec des déchets, l'écosystème marin s'appauvrit, et les " +
  "générations futures auront moins de ressources.",
));
children.push(bodyPar(
  "C'est pourquoi de nombreux professionnels de la mer s'intéressent aujourd'hui à des pratiques plus " +
  "responsables : respecter certaines périodes de repos pour la pêche, éviter de jeter des déchets dans l'eau, " +
  "et signaler les pratiques qui nuisent à l'environnement marin.",
));

children.push(calloutBox(
  "ENVIRONNEMENT — Préserver la ressource marine",
  [
    "Éviter de pêcher plus que nécessaire, pour laisser à la mer le temps de se renouveler.",
    "Ne jamais jeter de déchets (plastique, huile...) dans l'eau.",
    "Protéger les zones où vivent et se reproduisent les poissons.",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-07",
  "Protéger la mer et ses ressources",
  "Scène de plage : quelques élèves et un adulte responsable ramassant des déchets sur le sable, avec la mer " +
  "propre en arrière-plan.",
  "Chacun peut contribuer à préserver la ressource marine.",
  "Rendre concrète la notion de préservation de l'environnement marin, à hauteur d'élève.",
  "Illustration pleine largeur, scène de plage haïtienne, ambiance positive et collective.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La technologie au service des métiers de la mer", "2.8"));
children.push(bodyPar(
  "Certains outils vus à la section 2.3 aident les professionnels à mieux travailler et à travailler plus " +
  "prudemment. Le GPS permet de connaître précisément sa position en mer ; la radio VHF permet de communiquer " +
  "avec d'autres bateaux ou avec le port en cas de problème ; l'indicateur de marée aide à choisir le bon moment " +
  "pour partir ou revenir.",
));
children.push(bodyPar(
  "Ces outils ne remplacent pas l'expérience des professionnels, mais ils rendent leur travail plus sûr et plus " +
  "efficace — un bon exemple de technologie mise au service d'une activité humaine.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Résoudre un problème lié aux métiers de la mer", "2.9"));
children.push(bodyPar(
  "Dans le village de Wilkenson, les pêcheurs remarquent depuis quelques années qu'ils doivent aller de plus en " +
  "plus loin pour trouver du poisson en quantité suffisante. Réfléchis à cette situation en mobilisant ce que tu " +
  "as appris dans ce chapitre.",
));
children.push(numberedPar("1. À ton avis, quelles pourraient être les causes de cette situation ?"));
children.push(numberedPar("2. Quels métiers ou quelles personnes pourraient être consultés pour mieux comprendre le problème ?"));
children.push(numberedPar("3. Propose une solution respectueuse de l'environnement marin, en t'appuyant sur la section 2.7."));
children.push(numberedPar("4. Quels outils, parmi ceux vus à la section 2.3, pourraient aider à mettre en œuvre ta solution ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Fiche d'identité d'un métier de la mer"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Décrire un métier de la mer en identifiant ses tâches, ses outils et son organisation." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier, crayon, images ou photos de métiers de la mer (apportées par l'enseignant ou dessinées par les élèves)." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Travail en petits groupes de 2 à 3 élèves, en classe." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis, avec ton groupe, un métier de la mer parmi ceux étudiés à la section 2.2." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Nommez le métier choisi et dites s'il est navigant, non navigant, ou lié au tourisme."));
children.push(numberedPar("2. Listez les outils que cette personne utilise, en vous appuyant sur la section 2.3."));
children.push(numberedPar("3. Décrivez brièvement l'organisation de son travail (avant/pendant/après)."));
children.push(numberedPar("4. Complétez la fiche d'identité ci-dessous."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Fiche d'identité du métier :", { bold: true }));
children.push(threeColTable(
  ["Élément", "Description", "Remarque"],
  [
    ["Nom du métier", "", ""],
    ["Famille (navigant / non navigant / tourisme)", "", ""],
    ["Outils utilisés", "", ""],
    ["Organisation du travail", "", ""],
  ],
  [3000, 3600, 2400],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. En quoi ce métier dépend-il directement de la ressource marine ?"));
children.push(numberedPar("2. Quelle règle de sécurité te semble la plus importante pour ce métier ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre fiche d'identité au reste de la classe en une ou deux phrases." }]));
children.push(spacer(80));

children.push(calloutBox(
  "SÉCURITÉ pour cette activité",
  [
    "Cette activité se réalise entièrement en classe, à partir d'images, de descriptions et d'échanges.",
    "Aucune manipulation d'outil réel de pêche ou de navigation n'est nécessaire ni demandée.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-7AF-C02-08",
  "L'activité pratique en classe",
  "Un petit groupe d'élèves en classe, autour d'une table, complétant une fiche d'identité de métier à partir " +
  "d'images de métiers de la mer.",
  "Décrire un métier de la mer à partir d'observations et d'images, en toute sécurité.",
  "Illustrer le déroulement concret de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / enquête — Un métier de la mer près de chez moi"));
children.push(bodyPar(
  "Avec l'accord et sous la supervision d'un adulte responsable (enseignant, parent), observe ou interroge une " +
  "personne exerçant un métier lié à la mer près de chez toi (pêcheur, poissonnier, agent du port...). Ne " +
  "t'approche jamais seul(e) d'une embarcation ou de l'eau : cette enquête se fait par l'observation à distance " +
  "ou par un entretien encadré.",
));
children.push(threeColTable(
  ["Métier observé", "Tâches principales", "Outils remarqués"],
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
  "Une coopérative de pêcheurs de ta région constate que le nombre de poissons pêchés diminue chaque année, " +
  "alors que le nombre de familles qui vivent de la pêche a augmenté.",
));
children.push(numberedPar("1. Quel est le besoin exact que cette coopérative doit résoudre ?"));
children.push(numberedPar("2. Quel métier ou quelle organisation sociale, parmi ceux vus dans ce chapitre, pourrait être concerné(e) ?"));
children.push(numberedPar("3. Propose une solution qui tient compte à la fois du revenu des familles et de la préservation de la ressource marine."));
children.push(numberedPar("4. Quelle règle de sécurité faudrait-il rappeler aux pêcheurs impliqués dans ta solution ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "La mer offre des ressources et permet plusieurs activités : transport maritime, pêche, sports et loisirs nautiques.",
    "Les métiers de la mer se répartissent en métiers navigants, liés au tourisme, et non navigants.",
    "Les outils des métiers de la mer sont manuels, mécanisés ou informatisés (GPS, radio VHF...).",
    "Un métier de la mer suppose une organisation du travail avant, pendant et après l'activité.",
    "La sécurité (météo, équipement, supervision) est essentielle dans tous les métiers de la mer.",
    "La ressource marine n'est pas illimitée : elle doit être préservée par des pratiques responsables.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer ce que la mer apporte comme ressources et activités.",
    "☐ Citer des métiers navigants, non navigants et liés au tourisme.",
    "☐ Reconnaître des outils manuels, mécanisés et informatisés des métiers de la mer.",
    "☐ Décrire l'organisation du travail avant, pendant et après une activité maritime.",
    "☐ Expliquer une chaîne simple, de la ressource marine au produit consommé.",
    "☐ Citer des règles de sécurité liées aux métiers de la mer.",
    "☐ Expliquer pourquoi il faut préserver les ressources marines.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : métier navigant/non navigant, organisation sociale, outil manuel/mécanisé/informatisé, " +
    "chaîne ressource-produit, sécurité, préservation de la ressource marine.",
    "Vocabulaire clé à maîtriser : marin-pêcheur, agent maritime, filet, GPS, radio VHF, écosystème marin.",
    "Avant l'évaluation, vérifie que tu peux : citer un métier de chaque famille (navigant, non navigant, " +
    "tourisme) ; nommer un outil de chaque type (manuel, mécanisé, informatisé) ; expliquer une règle de " +
    "sécurité et une règle de préservation de la ressource marine.",
    "Question rapide de vérification : cite une tâche réalisée avant une sortie de pêche, et une réalisée après.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "GPS · organisation sociale · écosystème marin · navigant · gilet de sauvetage · non navigant · filet · marché.",
  { italics: true },
));
children.push(numberedPar("1. Un marin-pêcheur exerce un métier ...................... , car il travaille à bord d'une embarcation."));
children.push(numberedPar("2. Un douanier travaille au port : c'est un métier ......................"));
children.push(numberedPar("3. Le ...................... est un outil manuel utilisé pour capturer le poisson."));
children.push(numberedPar("4. Le ...................... est un outil informatisé qui aide à connaître sa position en mer."));
children.push(numberedPar("5. Avant de partir en mer, un professionnel porte un ...................... pour sa sécurité."));
children.push(numberedPar("6. La façon dont les rôles sont répartis dans un métier s'appelle l'......................"));
children.push(numberedPar("7. Après avoir été pêché et trié, le poisson est vendu au ......................"));
children.push(numberedPar("8. Pêcher plus de poissons que la mer ne peut en reproduire nuit à l'......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Lequel de ces métiers est un métier non navigant ?"));
children.push(bulletPar("a) marin-pêcheur"));
children.push(bulletPar("b) capitaine de navire"));
children.push(bulletPar("c) agent maritime"));
children.push(spacer(60));
children.push(numberedPar("2. La radio VHF sert surtout à :"));
children.push(bulletPar("a) mesurer la température de l'eau"));
children.push(bulletPar("b) communiquer avec d'autres bateaux ou le port"));
children.push(bulletPar("c) capturer du poisson"));
children.push(spacer(60));
children.push(numberedPar("3. Parmi ces activités, laquelle correspond au transport maritime ?"));
children.push(bulletPar("a) déplacer des personnes ou des marchandises par bateau"));
children.push(bulletPar("b) vendre du poisson au marché"));
children.push(bulletPar("c) nettoyer une plage"));
children.push(spacer(60));
children.push(numberedPar("4. Que doit vérifier un professionnel de la mer avant de partir ?"));
children.push(bulletPar("a) uniquement l'heure"));
children.push(bulletPar("b) les conditions météorologiques et l'état de son matériel"));
children.push(bulletPar("c) rien de particulier"));
children.push(spacer(60));
children.push(numberedPar("5. Pourquoi faut-il préserver les ressources marines ?"));
children.push(bulletPar("a) parce que la mer ne sert à rien d'autre"));
children.push(bulletPar("b) parce que la ressource n'est pas illimitée et doit se renouveler"));
children.push(bulletPar("c) parce que cela n'a pas d'importance"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Marin-pêcheur", "a. Personne qui travaille au port pour contrôler les marchandises."],
    ["2. Douanier", "b. Outil informatisé qui indique la position en mer."],
    ["3. GPS", "c. Métier exercé à bord d'une embarcation pour capturer du poisson."],
    ["4. Filet", "d. Ensemble des êtres vivants et de leur milieu dans la mer."],
    ["5. Écosystème marin", "e. Répartition des rôles et des tâches entre les personnes."],
    ["6. Organisation sociale", "f. Outil manuel utilisé pour capturer le poisson."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Choisis un métier de la mer étudié dans ce chapitre et explique en quoi il dépend directement de la ressource marine."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi l'organisation du travail est importante dans un métier de la mer."));
children.push(numberedPar("3. Un pêcheur veut économiser du temps en ne vérifiant plus la météo avant de partir. Que lui conseilles-tu, et pourquoi ?"));
children.push(numberedPar("4. Propose une action simple, réalisable par des élèves, pour aider à préserver les ressources marines de ta région."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir la diversité des métiers liés à la mer : métiers navigants, métiers non " +
  "navigants et métiers liés au tourisme. Tu as appris à reconnaître les outils manuels, mécanisés et " +
  "informatisés qu'ils utilisent, et à comprendre comment le travail s'organise avant, pendant et après une " +
  "activité maritime, à travers le transport maritime, la pêche et les sports et loisirs nautiques. Tu as suivi " +
  "une chaîne simple, de la ressource marine jusqu'au produit consommé, et tu as découvert des règles de " +
  "sécurité et des pratiques permettant de préserver l'écosystème marin. Ces notions te seront utiles pour " +
  "comprendre, dans les prochains chapitres, d'autres métiers qui, eux aussi, dépendent d'une ressource à " +
  "préserver.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "métier navigant · métier non navigant · organisation sociale · outil manuel/mécanisé/informatisé · GPS · " +
  "radio VHF · transport maritime · écosystème marin · préservation de la ressource.",
));

await buildAndSave(children, 16, "Manuel_ETAP_7AF_Chapitre2.docx");
