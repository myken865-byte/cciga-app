// Manuel d'ETAP 8e AF — Chapitre 4 : Concevoir un prototype : metiers
// agricoles (champ officiel : Metiers de l'agriculture generateurs de
// revenus).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.51-52/77 (programme detaille 8e AF, unite "Les metiers de
//       l'agriculture generateurs de revenus en 8e annee du fondamental") :
//       competence ciblee, savoirs/savoir-faire (fonction d'usage,
//       fonctions de contraintes, mecanismes, evolution historique, risques
//       corporels, cahier des charges, croquis/maquettes/prototypes, avec
//       exemples officiels non exhaustifs : reproduction de plantes,
//       pepiniere, jardin de legumes, serre, elevage de volailles),
//       activites, modalites/criteres.
// Deja lu et verifie integralement pendant la Phase 0 ETAP 8e AF (capture
// complete avec contexte). Non re-telecharge une troisieme fois (document
// statique) ; les pages restent p.51-52.
//
// Regle de securite stricte appliquee : aucune activite ne demande a
// l'eleve de manipuler une machette, une lame, un outil motorise, un
// pesticide, un engrais chimique ou une machine agricole. Le "prototype"
// reste une maquette pedagogique en materiaux scolaires surs (papier,
// carton, plastique recycle propre), jamais un objet destine a un usage
// agricole reel.
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
  "Concevoir un prototype : métiers agricoles",
  "L'an dernier, tu as observé des outils et des métiers de l'agriculture. Cette année, tu vas apprendre à " +
  "analyser un besoin agricole réel et à concevoir, en équipe, un prototype simple pour y répondre.",
  [
    "Analyser la fonction et les contraintes d'un outil agricole.",
    "Comparer l'évolution d'un outil agricole dans le temps.",
    "Identifier les risques corporels liés à l'utilisation d'outils agricoles.",
    "Construire un cahier des charges à partir d'un besoin agricole.",
    "Imaginer et choisir une solution technique en équipe.",
    "Réaliser un croquis puis une maquette simple et sûre.",
    "Présenter et expliquer un prototype, en tenant compte de l'environnement.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans le jardin scolaire de l'école de Frantzy, à Marmelade, les jeunes plants de " +
  "légumes fraîchement semés sont souvent abîmés par le soleil trop fort ou par une pluie violente. Une classe " +
  "de 8e AF décide de concevoir, à titre d'exercice scolaire, un prototype pour protéger les jeunes plants. " +
  "C'est cette démarche que tu vas suivre dans ce chapitre.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Fonction d'usage — ce à quoi sert réellement un outil pour son utilisateur."));
children.push(bulletPar("Fonction de contrainte — exigence que doit respecter un outil (technique, économique, environnementale, ergonomique...)."));
children.push(bulletPar("Mécanisme — dispositif qui transmet ou transforme un mouvement (levier, système de transmission)."));
children.push(bulletPar("Risque corporel — danger que peut représenter un outil pour la santé ou le corps de son utilisateur."));
children.push(bulletPar("Cahier des charges — liste des exigences que doit respecter une solution technique avant sa conception."));
children.push(bulletPar("Prototype — premier exemplaire construit d'une solution technique, pour la représenter et l'évaluer."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : les métiers et outils de l'agriculture", "4.1"));
children.push(bodyPar(
  "L'an dernier, tu as appris à reconnaître des métiers de l'agriculture (production végétale, production " +
  "animale) et des outils simples (pioche, bêche, motoculteur...). Cette année, tu vas analyser ces outils plus " +
  "en profondeur, et participer à la conception d'une solution nouvelle pour répondre à un besoin agricole.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Observer et analyser un outil agricole", "4.2"));
children.push(bodyPar(
  "Chaque outil agricole répond à une fonction d'usage précise, mais doit aussi respecter des fonctions de " +
  "contraintes : techniques, économiques, environnementales, ergonomiques. Certains outils utilisent des " +
  "mécanismes, comme des leviers ou des systèmes de transmission, pour faciliter le travail.",
));

children.push(calloutBox(
  "OBSERVER — Analyser un outil agricole",
  [
    "Fonction d'usage : à quoi sert cet outil ? (ex. une serre protège les jeunes plants)",
    "Fonctions de contraintes : quelles exigences doit-il respecter ? (léger, résistant, peu coûteux, facile à installer, ne nuit pas à l'environnement)",
    "Mécanisme éventuel : utilise-t-il un levier, un système de transmission ?",
  ],
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE, VERT,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-01",
  "Un besoin agricole réel : protéger les jeunes plants",
  "Scène d'ouverture : un jardin scolaire haïtien avec de jeunes plants exposés au soleil et à la pluie, sans " +
  "protection, illustrant le besoin qui ouvre le chapitre.",
  "La conception technique part toujours de l'observation d'un besoin réel.",
  "Ancrer le chapitre dans une situation agricole crédible avant l'analyse technique.",
  "Illustration pleine largeur, scène de jardin scolaire haïtien, réaliste et paisible.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-02",
  "Observer un outil agricole : fonction et contraintes",
  "Un outil agricole simple (par exemple une brouette ou un arrosoir) présenté avec des légendes pointant sa " +
  "fonction d'usage et deux ou trois contraintes (matériau, poids, facilité d'usage).",
  "Analyser un outil agricole, c'est identifier sa fonction et les exigences qu'il doit respecter.",
  "Illustrer concrètement la démarche d'analyse d'un outil technique agricole.",
  "Illustration demi-page, schéma annoté, fond neutre.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("L'évolution des outils agricoles dans le temps", "4.3"));
children.push(bodyPar(
  "Les outils agricoles ont évolué : les matériaux utilisés, l'énergie nécessaire pour les faire fonctionner, " +
  "les choix techniques et les règles de sécurité pour les utilisateurs ont changé, avec des conséquences sur " +
  "la société.",
));

children.push(twoColTable(
  "Hier", "Aujourd'hui",
  [
    ["Outils entièrement manuels, force humaine", "Certains outils mécanisés (motoculteur, chargeuse)"],
    ["Matériaux naturels (bois, fibres)", "Matériaux plus résistants (métal traité, plastique recyclé)"],
    ["Peu de règles de sécurité formalisées", "Attention plus grande portée aux risques corporels"],
  ],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-03",
  "L'évolution d'un outil agricole dans le temps",
  "Illustration comparative en deux vignettes : un outil agricole traditionnel à gauche, une version plus " +
  "récente du même type d'outil à droite, avec de courtes légendes.",
  "Un outil agricole évolue selon les matériaux, l'énergie disponible et les besoins de sécurité.",
  "Rendre concrète la notion d'évolution historique d'un outil agricole.",
  "Illustration en deux vignettes comparatives, pleine largeur, contexte haïtien.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les risques liés aux outils agricoles", "4.4"));
children.push(bodyPar(
  "Le programme officiel demande d'identifier les risques corporels liés à l'utilisation des outils agricoles. " +
  "Comprendre ces risques, sans manipuler soi-même les outils dangereux, permet de concevoir des solutions " +
  "plus sûres.",
));

children.push(calloutBox(
  "SÉCURITÉ — Risques corporels et outils agricoles",
  [
    "Certains outils (machette, outils motorisés, produits chimiques) présentent des risques réels : coupures, blessures, intoxication.",
    "Un élève ne doit jamais utiliser seul une machette, un outil motorisé, un pesticide ou un engrais chimique.",
    "L'observation et l'analyse de ces outils se font uniquement par description, jamais par manipulation directe.",
    "Toute démonstration avec un outil réel reste réservée à un adulte compétent.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le cahier des charges d'un outil agricole", "4.5"));
children.push(bodyPar(
  "Avant de concevoir une solution, il faut définir un cahier des charges. Reprenons l'exemple de la " +
  "protection des jeunes plants, l'un des besoins agricoles concrets proposés par le programme officiel.",
));

children.push(threeColTable(
  ["Besoin", "Fonction attendue", "Contraintes à respecter"],
  [
    ["Protéger de jeunes plants du soleil trop fort et de la pluie violente", "Abriter les plants tout en laissant passer suffisamment de lumière", "Léger, peu coûteux, matériaux disponibles localement, facile à installer et à retirer, ne nuit pas à l'environnement"],
  ],
  [3000, 3200, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Le programme officiel cite d'autres besoins agricoles concrets pouvant faire l'objet d'un cahier des " +
  "charges similaire : la réalisation d'une pépinière, d'un jardin de légumes, d'une serre, ou encore " +
  "l'élevage de volailles.",
  { italics: true },
));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-04",
  "Du besoin au cahier des charges",
  "Schéma simple en trois cases reliées par des flèches : besoin → fonction attendue → contraintes à " +
  "respecter, illustré avec l'exemple de la protection des jeunes plants.",
  "Un cahier des charges relie un besoin agricole réel à des exigences précises.",
  "Faire comprendre la construction d'un cahier des charges simple appliqué à l'agriculture.",
  "Schéma horizontal, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Imaginer et choisir une solution", "4.6"));
children.push(bodyPar(
  "À partir du cahier des charges, plusieurs solutions sont possibles : une mini-serre, un simple filet " +
  "d'ombrage, un abri temporaire... Il est utile d'en imaginer plusieurs en équipe avant de choisir.",
));

children.push(calloutBox(
  "PROJET — Comparer des solutions",
  [
    "Solution A protège-t-elle vraiment des deux problèmes identifiés (soleil et pluie) ?",
    "Solution B est-elle réalisable avec les matériaux disponibles à l'école ?",
    "Quelle solution est la plus simple à installer, tout en respectant l'environnement ?",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-05",
  "Travail collaboratif : imaginer plusieurs solutions",
  "Un groupe d'élèves de 8e AF autour d'une table, dessinant plusieurs croquis d'idées différentes pour " +
  "protéger de jeunes plants, en discutant.",
  "Concevoir, c'est d'abord imaginer plusieurs solutions avant d'en choisir une.",
  "Illustrer concrètement le travail collectif de recherche de solutions.",
  "Illustration pleine largeur, scène de classe ou de jardin scolaire haïtien, ambiance de réflexion collective.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Du croquis à la maquette", "4.7"));
children.push(bodyPar(
  "Une fois la solution choisie, l'équipe réalise un croquis annoté, puis une maquette en matériaux scolaires " +
  "sûrs (carton léger, plastique recyclé propre, ficelle). La maquette reste un objet pédagogique, jamais une " +
  "installation destinée à un usage agricole réel.",
));

children.push(calloutBox(
  "TECHNIQUE — Du croquis à la maquette",
  [
    "1. Croquis : dessiner la solution choisie, avec des légendes (matériaux, dimensions approximatives).",
    "2. Découpage et façonnage : préparer les éléments en carton ou en plastique recyclé propre, avec des ciseaux à bouts ronds.",
    "3. Assemblage : coller ou attacher les parties pour former la maquette.",
    "4. Vérification : la maquette correspond-elle bien au cahier des charges ?",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Concevoir en préservant les ressources", "4.8"));
children.push(bodyPar(
  "Concevoir une solution agricole, c'est aussi penser à la protection du sol, de l'eau et des ressources " +
  "disponibles. Un choix de matériau ou de solution mal pensé peut gaspiller de l'eau ou abîmer le sol.",
));

children.push(calloutBox(
  "ENVIRONNEMENT — Concevoir de façon responsable",
  [
    "Préférer des matériaux qui ne polluent pas le sol ou l'eau s'ils sont abandonnés.",
    "Éviter le gaspillage de matériaux lors de la fabrication de la maquette.",
    "Réfléchir à l'impact de la solution sur l'eau disponible (par exemple, éviter un système qui gaspille l'arrosage).",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Présenter et expliquer son prototype", "4.9"));
children.push(bodyPar(
  "La conception ne s'arrête pas à la fabrication de la maquette : il faut aussi savoir la présenter et " +
  "expliquer les choix effectués.",
));
children.push(numberedPar("1. Quel était le besoin agricole de départ ?"));
children.push(numberedPar("2. Quelles contraintes du cahier des charges votre solution respecte-t-elle ?"));
children.push(numberedPar("3. Pourquoi avez-vous choisi cette solution plutôt qu'une autre ?"));
children.push(numberedPar("4. Que pourrait-on améliorer si vous aviez plus de temps ou de matériel ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité de conception collective — Concevoir une mini-serre pour de jeunes plants"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Concevoir, en équipe, un prototype pédagogique de mini-serre respectant un cahier des charges simple." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Carton léger, plastique transparent recyclé et propre (par exemple une bouteille coupée par un adulte), ciseaux à bouts ronds, colle ou ruban adhésif, crayons de couleur." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Groupes de 4 à 5 élèves." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Votre mini-serre doit protéger de jeunes plants tout en laissant passer la lumière, avec des matériaux simples et sûrs." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Relisez le cahier des charges (section 4.5)."));
children.push(numberedPar("2. Imaginez au moins deux solutions possibles et dessinez un croquis rapide de chacune."));
children.push(numberedPar("3. Choisissez la solution la plus adaptée, en expliquant pourquoi."));
children.push(numberedPar("4. Réalisez une maquette simple, à partir du croquis choisi."));
children.push(numberedPar("5. Vérifiez que votre maquette respecte les contraintes du cahier des charges."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Fiche de conception :", { bold: true }));
children.push(threeColTable(
  ["Élément", "Description", "Remarque"],
  [
    ["Solution choisie", "", ""],
    ["Matériaux utilisés", "", ""],
    ["Contrainte la plus difficile à respecter", "", ""],
  ],
  [3000, 3400, 2600],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Votre solution respecte-t-elle toutes les contraintes du cahier des charges ? Sinon, laquelle est la plus difficile à satisfaire ?"));
children.push(numberedPar("2. En quoi le travail en équipe a-t-il aidé à améliorer votre solution ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre prototype à la classe en expliquant votre démarche de conception." }]));
children.push(spacer(80));

children.push(calloutBox(
  "RÈGLES DE SÉCURITÉ pour cette activité",
  [
    "Utiliser uniquement du carton, du plastique recyclé propre (découpé par un adulte si nécessaire) et des ciseaux à bouts ronds.",
    "Aucun outil tranchant motorisé, aucune machette, aucun produit chimique.",
    "La maquette reste un objet scolaire, jamais destiné à un usage agricole réel.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-06",
  "Exemple de maquette réalisée en classe",
  "Une maquette simple de mini-serre en carton et plastique transparent posée sur une table, entourée des " +
  "croquis préparatoires, dans un environnement de classe haïtien.",
  "Le résultat d'une démarche de conception peut rester simple et sûr.",
  "Montrer un exemple concret et réalisable du résultat attendu de l'activité de conception.",
  "Illustration pleine largeur, scène scolaire, éléments bien identifiables.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / analyse — Un outil agricole près de chez moi"));
children.push(bodyPar(
  "Avec l'accord et sous la supervision d'un adulte responsable, observe un outil agricole réellement utilisé " +
  "près de chez toi. N'y touche pas sans autorisation : contente-toi de l'observer et, si possible, d'interroger " +
  "la personne qui l'utilise.",
));
children.push(threeColTable(
  ["Outil observé", "Fonction d'usage", "Un risque corporel possible"],
  [
    ["", "", ""],
    ["", "", ""],
  ],
  [2800, 3200, 3200],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un outil agricole répond à une fonction d'usage et doit respecter des fonctions de contraintes.",
    "Certains outils agricoles utilisent des mécanismes (leviers, systèmes de transmission).",
    "Les outils agricoles évoluent selon les matériaux, l'énergie disponible et la sécurité.",
    "Certains outils agricoles présentent des risques corporels réels et ne doivent jamais être manipulés seul par un élève.",
    "Un cahier des charges relie un besoin agricole à des exigences précises avant la conception.",
    "La conception suit une démarche : imaginer plusieurs solutions, en choisir une, réaliser un croquis puis une maquette.",
    "Une bonne conception agricole prend en compte la préservation du sol et de l'eau.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Décrire la fonction d'usage et une contrainte d'un outil agricole.",
    "☐ Expliquer ce qu'est un mécanisme et donner un exemple.",
    "☐ Comparer un outil agricole ancien et un outil plus récent.",
    "☐ Citer un risque corporel lié à un outil agricole.",
    "☐ Construire un cahier des charges simple à partir d'un besoin agricole.",
    "☐ Imaginer et comparer plusieurs solutions techniques.",
    "☐ Réaliser un croquis puis une maquette simple et sûre.",
    "☐ Proposer une solution technique respectueuse du sol et de l'eau.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : fonction d'usage, fonction de contrainte, mécanisme, risque corporel, cahier des " +
    "charges, croquis, maquette, prototype.",
    "Vocabulaire clé à maîtriser : levier, système de transmission, pépinière, serre.",
    "Avant l'évaluation, vérifie que tu peux : construire un cahier des charges simple ; citer les étapes du " +
    "croquis à la maquette ; citer un risque corporel lié à un outil agricole.",
    "Question rapide de vérification : relie un besoin agricole donné à une fonction d'usage et à une contrainte adaptée.",
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
  "cahier des charges · fonction d'usage · risque corporel · levier · croquis · contrainte · maquette · pépinière.",
  { italics: true },
));
children.push(numberedPar("1. Ce à quoi sert réellement un outil s'appelle sa ......................"));
children.push(numberedPar("2. Une exigence que doit respecter une solution technique s'appelle une ......................"));
children.push(numberedPar("3. Un danger que peut représenter un outil pour le corps de son utilisateur s'appelle un ......................"));
children.push(numberedPar("4. La liste des exigences à respecter avant de concevoir un objet s'appelle un ......................"));
children.push(numberedPar("5. Un dessin rapide et simple d'une idée de solution s'appelle un ......................"));
children.push(numberedPar("6. Une représentation en volume, à échelle réduite, s'appelle une ......................"));
children.push(numberedPar("7. Un dispositif simple qui facilite un mouvement est un ......................"));
children.push(numberedPar("8. Un espace où l'on fait pousser de jeunes plants à partir de graines collectées s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. La fonction d'usage d'un outil agricole, c'est :"));
children.push(bulletPar("a) son prix"));
children.push(bulletPar("b) ce à quoi il sert réellement"));
children.push(bulletPar("c) sa couleur"));
children.push(spacer(60));
children.push(numberedPar("2. Identifier les risques corporels d'un outil sert à :"));
children.push(bulletPar("a) décorer un rapport"));
children.push(bulletPar("b) mieux comprendre les dangers avant de concevoir une solution plus sûre"));
children.push(bulletPar("c) rien de particulier"));
children.push(spacer(60));
children.push(numberedPar("3. Quelle est la bonne suite d'étapes de la démarche de conception ?"));
children.push(bulletPar("a) maquette → croquis → cahier des charges"));
children.push(bulletPar("b) cahier des charges → croquis → maquette"));
children.push(bulletPar("c) croquis → cahier des charges → maquette"));
children.push(spacer(60));
children.push(numberedPar("4. Concevoir une solution agricole respectueuse de l'environnement, c'est notamment :"));
children.push(bulletPar("a) éviter de gaspiller l'eau disponible"));
children.push(bulletPar("b) utiliser le plus de matériaux possible"));
children.push(bulletPar("c) ignorer l'impact de la solution sur le sol"));
children.push(spacer(60));
children.push(numberedPar("5. Une maquette scolaire de mini-serre doit être réalisée :"));
children.push(bulletPar("a) avec une machette et des outils motorisés"));
children.push(bulletPar("b) avec des matériaux scolaires sûrs comme le carton et le plastique recyclé propre"));
children.push(bulletPar("c) directement dans un vrai champ pour la tester"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque terme de la colonne A à sa définition dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Fonction de contrainte", "a. Dispositif qui transmet ou transforme un mouvement."],
    ["2. Mécanisme", "b. Danger que peut représenter un outil pour le corps."],
    ["3. Risque corporel", "c. Exigence que doit respecter une solution technique."],
    ["4. Cahier des charges", "d. Liste des exigences à respecter avant de concevoir un objet."],
    ["5. Prototype", "e. Premier exemplaire construit d'une solution technique."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Une famille souhaite conserver plus longtemps ses récoltes de légumes avant de les vendre. Propose un cahier des charges simple (fonction attendue + 3 contraintes) pour une solution possible."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi il est important d'identifier les risques corporels d'un outil avant de concevoir une nouvelle solution."));
children.push(numberedPar("3. Un camarade propose de fabriquer sa maquette avec du verre cassé trouvé dans la cour, car « c'est solide ». Que lui réponds-tu, et pourquoi ?"));
children.push(numberedPar("4. Choisis un outil agricole ancien étudié en 7e AF et propose une amélioration simple, en justifiant ton choix."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis d'apprendre à analyser un outil agricole selon sa fonction d'usage et ses fonctions de " +
  "contraintes, à comprendre son évolution dans le temps, et à identifier les risques corporels qu'il peut " +
  "présenter. Tu as découvert ce qu'est un cahier des charges appliqué à un besoin agricole, et tu as suivi, " +
  "en équipe, une démarche de conception complète : imaginer plusieurs solutions, en choisir une, réaliser un " +
  "croquis puis une maquette simple et sûre, et enfin présenter et expliquer ton prototype. Tu as aussi appris " +
  "qu'une bonne conception agricole tient compte de la préservation du sol et de l'eau. Cette démarche de " +
  "conception, déjà pratiquée pour les métiers de la mer, te sera utile dans de nombreuses situations futures.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "fonction d'usage · fonction de contrainte · mécanisme · risque corporel · cahier des charges · croquis · " +
  "maquette · prototype · démarche de conception · environnement.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-07",
  "Concevoir en pensant à l'environnement",
  "Illustration montrant une mini-serre en matériaux recyclés installée dans un jardin scolaire, avec un sol " +
  "et une réserve d'eau visiblement bien entretenus.",
  "Une bonne conception agricole prend en compte la préservation du sol et de l'eau.",
  "Relier concrètement la démarche de conception à la préservation des ressources agricoles.",
  "Illustration pleine largeur, scène de jardin scolaire haïtien, ton positif.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C04-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Concevoir un prototype : métiers agricoles », avec des branches " +
  "vers : fonction/contraintes, évolution des outils, risques, cahier des charges, croquis/maquette, environnement.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte ETAP.",
));

await buildAndSave(children, 42, "Manuel_ETAP_8AF_Chapitre4.docx");
