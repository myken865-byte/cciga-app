// Manuel d'EC 8e AF — Chapitre 1 : La nation haïtienne dans la Caraïbe
// (Unité 1 — La nation haïtienne et l'identité haïtienne, Compétence C1).
//
// PREMIER CHAPITRE DU MANUEL 8e AF : ouvre le livre, pagination fraîche
// (page 1), ne réutilise ni le texte ni la pagination du manuel EC 7e AF
// (déjà finalisé, Phase Finale incluse, NON modifié ici).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.33-34 : Unité 1, colonne 8e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "Les
//     fondements de la nation haïtienne (histoire, territoire, mémoire,
//     patrimoine partagés, désir de vivre ensemble), les valeurs, les
//     symboles, les textes de référence. Les autres nations caribéennes :
//     valeurs, symboles, patrimoine historique et culturel, textes de
//     référence. Les valeurs universelles. La responsabilité citoyenne dans
//     la sauvegarde du patrimoine historique et culturel."
//   - `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md` (verrouillée sans changement
//     dans `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`) : situation de départ
//     "comparaison d'un symbole national haïtien avec celui d'un pays
//     caribéen voisin" ; activités "recherche comparative (lien
//     géographie) ; poursuite du glossaire collaboratif".
//   - Compétence C1 seule, comme au Chapitre 1 de 7e AF (tableau croisé
//     compétences × unités, `05_MATRICE_COMPETENCES_UNITES_EC.md`).
//
// PROGRESSION RÉELLE 7e → 8e AF (sections 4-5 du prompt d'exécution) : le
// Chapitre 1 de 7e AF (déjà finalisé, NON modifié ici) a construit la
// notion de nation, les symboles nationaux haïtiens (drapeau, hymne,
// devise, armoiries) et l'organisation territoriale d'Haïti. CES ÉLÉMENTS
// NE SONT PAS RÉENSEIGNÉS ICI : ils sont mobilisés comme acquis, rappelés
// brièvement (section 1.1), pour construire un contenu réellement nouveau —
// l'élargissement de l'identité nationale à la région caribéenne
// (comparaison internationale) et l'introduction des valeurs universelles.
// Conformément à `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, la
// « citoyenneté du monde » (maîtrise attendue en 9e AF) n'est pas
// anticipée : ce chapitre reste au niveau de la comparaison régionale
// caribéenne et de l'introduction (non l'approfondissement) des valeurs
// universelles.
//
// REFORMULATION DE L'ANGLE SUR LA RESPONSABILITÉ PATRIMONIALE (transparence
// éditoriale, section 6 du prompt) : la source répète la formule
// « responsabilité citoyenne dans la sauvegarde du patrimoine » à
// l'identique sur les 3 années (risque de répétition documenté dans
// `04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, Unité 1). Ce chapitre traite
// cette responsabilité sous un angle différent de celui du Chapitre 1 de
// 7e AF (préservation locale d'un monument/lieu) : ici, l'angle est celui
// du PATRIMOINE COMME ÉLÉMENT DE COMPARAISON ET DE RESPECT MUTUEL entre
// nations caribéennes — reformulation de l'angle, pas du fond, conformément
// à la recommandation explicite de la matrice de progression.
//
// CHOIX DU PAYS DE COMPARAISON (transparence éditoriale) : la source ne
// nomme aucun pays caribéen précis pour cette unité. La Jamaïque est
// retenue ici comme exemple de comparaison [CHOIX ÉDITORIAL] : nation
// caribéenne sans contentieux historique connu avec Haïti (contrairement à
// la République dominicaine, dont les relations avec Haïti incluent des
// enjeux sensibles hors du périmètre de ce chapitre), et dont les symboles
// (drapeau, devise) sont des faits publics larges et bien établis. Les
// informations utilisées (couleurs du drapeau, devise, date
// d'indépendance) sont des connaissances générales, non vérifiées en
// direct sur une source institutionnelle pendant cette session —
// [ADAPTATION PÉDAGOGIQUE], sans détail contestable. La République
// dominicaine n'est mentionnée que pour un fait géographique neutre
// (partage de l'île d'Hispaniola avec Haïti), sans comparaison approfondie
// de symboles, par prudence éditoriale.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_SITUATION_FILL, BOX_SITUATION_LINE,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE,
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE,
  BOX_DEBAT_FILL, BOX_DEBAT_LINE,
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE,
  BOX_PROJET_FILL, BOX_PROJET_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BLEU_CIVIQUE, OR_CITOYEN, VERT_COMMUNAUTAIRE, ANTHRACITE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  1,
  "La nation haïtienne dans la Caraïbe",
  "Tu connais déjà le drapeau, l'hymne et la devise d'Haïti. Mais savais-tu que chaque pays de la Caraïbe " +
  "possède, lui aussi, ses propres symboles et son propre patrimoine ? Ce chapitre t'invite à regarder ta " +
  "nation depuis un point de vue plus large : celui de la région caribéenne tout entière.",
  [
    "Rappeler et mobiliser les acquis sur la nation et les symboles haïtiens (7e AF).",
    "Situer Haïti parmi les autres nations de la Caraïbe.",
    "Comparer les symboles et le patrimoine d'Haïti avec ceux d'une nation caribéenne voisine.",
    "Définir ce qu'est une valeur universelle et en donner des exemples.",
    "Expliquer la responsabilité citoyenne face à un patrimoine partagé à l'échelle régionale.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Deux drapeaux, deux histoires",
  [
    "Lors d'une compétition sportive régionale, une classe de 8e AF voit défiler les drapeaux de plusieurs " +
    "pays de la Caraïbe aux côtés de celui d'Haïti. « Ils ont chacun leur histoire, comme nous », remarque un " +
    "élève. Ce chapitre part de cette observation pour comprendre ce qui relie et ce qui distingue les " +
    "nations caribéennes.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (acquis de la 7e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as appris ce qu'est une nation, découvert les symboles de la nation haïtienne (drapeau, " +
  "hymne, devise, armoiries) et l'organisation territoriale d'Haïti. Ce chapitre ne reprend pas ces " +
  "définitions : il s'appuie dessus pour élargir ton regard à l'échelle régionale.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Nation caribéenne — nation dont le territoire se situe dans la région de la Caraïbe."));
children.push(bulletPar("Région / communauté caribéenne — ensemble des pays et territoires bordant ou situés dans la mer des Caraïbes, partageant certains traits historiques et géographiques."));
children.push(bulletPar("Valeur universelle — principe considéré comme important pour l'ensemble de l'humanité, au-delà d'une seule nation (par exemple : dignité, paix, justice)."));
children.push(bulletPar("Patrimoine partagé — éléments culturels, historiques ou naturels qui, bien que propres à une nation, résonnent avec l'histoire d'autres nations voisines."));
children.push(bulletPar("Comparaison interculturelle — démarche consistant à mettre en relation des éléments culturels de nations différentes pour mieux les comprendre, sans les hiérarchiser."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Haïti, une nation caribéenne", "1.1"));
children.push(bodyPar(
  "Haïti fait partie d'une région du monde appelée la Caraïbe : un ensemble d'îles et de territoires bordant " +
  "la mer des Caraïbes, qui partagent certains traits d'histoire — notamment une expérience commune de la " +
  "colonisation — tout en ayant chacun développé une identité propre.",
));
children.push(calloutBox(
  "DÉCOUVRIR — La Caraïbe, une région de nations voisines",
  [
    "La Caraïbe regroupe de nombreux pays et territoires : Haïti, la République dominicaine (qui partage " +
    "l'île d'Hispaniola avec Haïti), Cuba, la Jamaïque, et bien d'autres.",
    "Chaque nation caribéenne possède ses propres symboles, sa propre langue ou ses propres langues, et son " +
    "propre patrimoine — tout en partageant, avec ses voisines, certains traits d'histoire régionale.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C01-01",
  "Ouverture — Défilé de drapeaux caribéens",
  "Une scène crédible de défilé sportif régional avec plusieurs drapeaux de pays caribéens (dont celui " +
  "d'Haïti, reconnaissable) portés par des jeunes, dans un style illustratif cohérent avec la charte EC.",
  "La diversité des drapeaux caribéens illustre concrètement la diversité des nations de la région.",
  "Ancrer l'ouverture du chapitre dans une scène régionale concrète et reconnaissable.",
  "Illustration pleine largeur, scène de défilé, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comparer les symboles et le patrimoine : l'exemple de la Jamaïque", "1.2"));
children.push(bodyPar(
  "Pour mieux comprendre ce qui distingue et ce qui rapproche les nations caribéennes, comparons les symboles " +
  "d'Haïti à ceux d'une nation voisine : la Jamaïque.",
));
children.push(threeColTable(
  ["Élément", "Haïti (rappel 7e AF)", "Jamaïque [ADAPTATION PÉDAGOGIQUE]"],
  [
    ["Drapeau", "Bleu et rouge, avec les armoiries au centre", "Diagonales dorées sur fond noir et vert"],
    ["Devise", "« L'Union fait la Force »", "« Out of Many, One People » (« D'un grand nombre, un seul peuple »)"],
    ["Indépendance", "1804", "1962"],
  ],
  [2400, 3600, 3400],
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette comparaison ne cherche pas à dire qu'une nation est « meilleure » qu'une autre : elle aide à mieux " +
  "comprendre ce qui rend chaque nation unique, et ce que plusieurs nations caribéennes peuvent avoir en " +
  "commun (une devise centrée sur l'unité, une indépendance conquise).",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C01-02",
  "Exemple analysé — comparaison de deux drapeaux caribéens",
  "Une planche présentant côte à côte le drapeau haïtien et un drapeau caribéen générique stylisé (inspiré de " +
  "la Jamaïque, sans reproduction exacte protégée), avec de courtes légendes comparatives.",
  "Comparer deux drapeaux aide à repérer ressemblances et différences entre nations voisines.",
  "Donner une référence visuelle claire pour l'activité de comparaison du chapitre.",
  "Illustration demi-page, planche comparative, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les valeurs universelles", "1.3"));
children.push(bodyPar(
  "Au-delà des symboles propres à chaque nation, certaines valeurs sont considérées comme importantes pour " +
  "l'ensemble de l'humanité, quelle que soit la nation à laquelle on appartient : on les appelle des valeurs " +
  "universelles.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des exemples de valeurs universelles",
  [
    "La dignité de toute personne humaine.",
    "La paix entre les peuples.",
    "La justice et l'égalité.",
    "Le respect de la diversité culturelle.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces valeurs se retrouvent, sous des formes parfois différentes, dans la devise de plusieurs nations " +
  "caribéennes — comme tu as pu le constater dans le tableau comparatif précédent.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Un patrimoine partagé, une responsabilité renouvelée", "1.4"));
children.push(bodyPar(
  "En 7e AF, tu as appris que sauvegarder le patrimoine est une responsabilité citoyenne locale — celle d'un " +
  "quartier ou d'une commune. À l'échelle régionale, cette responsabilité prend un sens supplémentaire : " +
  "respecter le patrimoine des nations voisines, tout comme on souhaite que le nôtre soit respecté.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Un échange scolaire régional",
  [
    "Une école haïtienne prépare un échange virtuel avec une école jamaïcaine. Les élèves des deux pays " +
    "doivent présenter un symbole ou un lieu patrimonial de leur nation à leurs correspondants.",
    "1. Pourquoi est-il important de bien comprendre son propre patrimoine avant de le présenter à d'autres ?",
    "2. Que peut apporter, selon toi, la découverte du patrimoine d'une nation voisine ?",
    "3. Comment éviter, dans cet échange, de comparer les deux patrimoines de façon irrespectueuse ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Se comparer aux autres nations, est-ce utile ?",
  [
    "Certains pensent que se comparer à d'autres nations aide à mieux se connaître soi-même. D'autres pensent " +
    "que cela risque de créer des jugements de valeur entre nations (« meilleure », « moins développée »).",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Recherche comparative"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Réaliser une recherche comparative sur un symbole ou un élément de patrimoine d'une nation " +
    "caribéenne, en lien avec la géographie. [OFFICIEL — activité prévue par le programme]",
    "CONSIGNES : Choisis une nation caribéenne (autre que la Jamaïque déjà étudiée en exemple). Recherche un " +
    "symbole national ou un lieu patrimonial de cette nation, avec l'aide d'un adulte, d'un(e) enseignant(e) " +
    "ou d'une source fiable.",
    "ÉTAPES : 1. Choisir la nation et situer son territoire sur une carte de la Caraïbe. 2. Identifier un " +
    "symbole ou un lieu patrimonial. 3. Comparer brièvement avec l'équivalent haïtien. 4. Présenter le " +
    "résultat à la classe.",
    "RÉSULTAT ATTENDU : Une courte fiche comparative, respectueuse des deux nations concernées.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet du cycle — Poursuivre le glossaire collaboratif"));
children.push(calloutBox(
  "PROJET",
  [
    "Le glossaire illustré collaboratif, commencé en 7e AF, se poursuit sur les trois années du cycle. " +
    "[OFFICIEL — dispositif transversal de la Collection EC]",
    "Ajoute à ton glossaire au moins quatre nouveaux mots de ce chapitre (nation caribéenne, valeur " +
    "universelle, patrimoine partagé, comparaison interculturelle), illustrés et expliqués avec tes propres " +
    "mots.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C01-03",
  "Espace de production — ma fiche comparative",
  "Un cadre vide, format portrait, structuré en deux colonnes (« Haïti » / « Nation caribéenne choisie »), " +
  "prévu pour que l'élève y consigne directement sa recherche comparative.",
  "Offrir un espace direct de production pour ancrer l'activité de recherche comparative.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, deux colonnes délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Haïti fait partie de la région caribéenne, aux côtés de nombreuses autres nations ayant chacune leur " +
    "propre identité.",
    "Comparer les symboles et le patrimoine de différentes nations aide à mieux comprendre chacune d'elles, " +
    "sans les hiérarchiser.",
    "Une valeur universelle (dignité, paix, justice...) est considérée comme importante pour l'ensemble de " +
    "l'humanité, au-delà d'une seule nation.",
    "La responsabilité citoyenne face au patrimoine s'élargit, à l'échelle régionale, au respect du " +
    "patrimoine des nations voisines.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de situer Haïti parmi les autres nations de la Caraïbe, de comparer respectueusement " +
  "ses symboles et son patrimoine avec ceux d'une nation voisine, de découvrir la notion de valeur " +
  "universelle, et d'élargir la responsabilité citoyenne patrimoniale à l'échelle régionale — sans reprendre " +
  "les définitions déjà construites en 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "nation caribéenne · région caribéenne · valeur universelle · patrimoine partagé · comparaison " +
  "interculturelle.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Situer Haïti dans la région caribéenne et citer au moins deux nations voisines.",
    "☐ Comparer un symbole haïtien avec celui d'une autre nation caribéenne, de façon respectueuse.",
    "☐ Définir ce qu'est une valeur universelle et en citer deux exemples.",
    "☐ Expliquer en quoi la responsabilité patrimoniale peut s'élargir à l'échelle régionale.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : nation caribéenne, valeur universelle, patrimoine partagé, comparaison " +
    "interculturelle.",
    "Vocabulaire clé à maîtriser : nation caribéenne, valeur universelle, patrimoine partagé.",
    "Avant l'évaluation, vérifie que tu peux : situer Haïti dans la Caraïbe ; comparer un symbole haïtien à " +
    "celui d'une nation voisine ; expliquer ce qu'est une valeur universelle.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec celle de 7e AF — expliquer, à partir " +
    "de représentations et de symboles, ce qu'ils symbolisent — adaptée ici au niveau comparatif régional " +
    "[OFFICIEL, adapté au niveau 8e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : nation " +
  "caribéenne · valeur universelle · patrimoine partagé · comparaison interculturelle · région caribéenne.",
  { italics: true },
));
children.push(numberedPar("1. Une nation dont le territoire se situe dans la région de la Caraïbe est une ......................"));
children.push(numberedPar("2. Un principe important pour l'ensemble de l'humanité, au-delà d'une seule nation, est une ......................"));
children.push(numberedPar("3. L'ensemble des pays bordant la mer des Caraïbes forme la ......................"));
children.push(numberedPar("4. Mettre en relation des éléments culturels de nations différentes, sans les hiérarchiser, s'appelle une ......................"));
children.push(numberedPar("5. Des éléments culturels qui résonnent avec l'histoire de plusieurs nations voisines forment un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite deux nations caribéennes autres qu'Haïti, étudiées ou mentionnées dans ce chapitre."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Comparer les symboles de deux nations sert à dire laquelle est la meilleure. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Compare la devise haïtienne et la devise jamaïcaine étudiées dans ce chapitre : quel point commun peux-tu identifier ?"));
children.push(numberedPar("2. Explique en quoi une valeur peut être considérée comme « universelle » plutôt que propre à une seule nation."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas de l'échange scolaire régional. Propose une règle pour que la comparaison entre les deux patrimoines reste respectueuse."));
children.push(numberedPar("2. Choisis une nation caribéenne (autre que la Jamaïque) et explique, en quelques phrases, un symbole ou un lieu patrimonial que tu aimerais présenter à des correspondants."));
children.push(numberedPar("3. Un camarade affirme : « Ce qui compte, c'est seulement notre propre nation, pas celle des autres. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-8AF-C01-04",
  "Synthèse — La nation haïtienne dans la Caraïbe",
  "Une carte mentale simple centrée sur « Haïti dans la Caraïbe », avec des branches vers : nations " +
  "voisines, comparaison des symboles, valeurs universelles, patrimoine partagé.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 1, "Manuel_EC_8AF_Chapitre1.docx");
