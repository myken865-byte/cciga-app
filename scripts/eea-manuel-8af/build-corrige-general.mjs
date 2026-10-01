// Manuel d'EEA 8e AF — Corrigé général (Phase Finale).
// Chaque reponse est derivee directement du texte reel des Chapitres 1 a 6
// (banques de mots, tableaux de classement, criteres d'activite tels
// qu'ecrits dans build-chapitreN.mjs). Aucune reponse n'est inventee ; les
// questions ouvertes (majoritairement les exercices C et D) recoivent des
// "elements de reponse attendus" plutot qu'une reponse unique artificielle,
// conformement a la nature des productions artistiques/reflexives evaluees
// dans ce manuel.
import {
  bodyPar, sectionHeading, subHeading, numberedPar,
  spacer, pageBreak, threeColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, OUTREMER,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "CORRIGÉ GÉNÉRAL", bold: true, size: 44, color: OUTREMER, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ce corrigé regroupe les réponses des exercices des Chapitres 1 à 6 du Manuel d'EEA 8e AF. Il est réservé à " +
  "l'usage de l'enseignant et n'apparaît pas dans la partie élève. Pour les questions d'observation, " +
  "d'application ou d'analyse/justification liées à une production artistique, des éléments de réponse " +
  "attendus et des critères d'appréciation sont proposés plutôt qu'une réponse unique artificielle — cohérent " +
  "avec la nature créative de la discipline."
));
children.push(spacer(200));

function chapTitle(num, titre) {
  const out = [];
  out.push(pageBreak());
  out.push(sectionHeading(`Chapitre ${num} — ${titre}`));
  return out;
}
function exo(letter, label) {
  return subHeading(`Exercice ${letter} — ${label}`);
}

// ---------------------------------------------------------------------
// Chapitre 1 — Lumière, ombre et volume dessiné
// ---------------------------------------------------------------------
children.push(...chapTitle(1, "Lumière, ombre et volume dessiné"));
children.push(exo("A", "Connaissance/compréhension"));
["clair-obscur", "nuance de gris", "gamme de valeurs", "ombrage", "volume"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation (éléments de réponse attendus)"));
children.push(bodyPar(
  "Réponses dépendantes de la photographie choisie par l'élève : identification cohérente d'une zone la plus " +
  "claire, d'une zone la plus sombre, et d'une direction de lumière plausible en fonction des ombres visibles. " +
  "L'important est la cohérence de l'observation, pas une réponse unique.",
));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Production de l'élève : 5 cases progressives du blanc (case 1) au noir (case 5), sans saut brusque entre deux cases voisines."));
children.push(numberedPar("2. Parce que la gamme de valeurs sert de repère de nuances progressives, évitant de passer directement du blanc au noir sans transition lors de l'ombrage du dessin final."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. Réponse libre et justifiée : Rembrandt (contraste doux et concentré) ou le Caravage (contraste marqué et théâtral), selon la préférence argumentée de l'élève."));
children.push(numberedPar("2. Lui conseiller d'ajouter des nuances de gris intermédiaires entre le blanc et le noir, car un ombrage à deux valeurs seulement donne un résultat plat et peu réaliste."));
children.push(numberedPar("3. Réponse libre, cohérente avec une scène haïtienne réelle de fort contraste lumineux (différente de celles déjà présentées dans le chapitre)."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 2 — Matières, textures et équilibre
// ---------------------------------------------------------------------
children.push(...chapTitle(2, "Matières, textures et équilibre"));
children.push(exo("A", "Connaissance/compréhension"));
["texture", "harmonie", "balance", "composition diagonale", "composition en spirale"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(bodyPar(
  "Rugueuse : écorce d'arbre, sac de jute. Lisse : calebasse polie. Granuleuse/souple : sable, tissu de madras.",
));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : rassembler des matériaux de textures différentes, organiser les morceaux sans coller pour vérifier l'équilibre, coller définitivement en respectant l'organisation prévue."));
children.push(numberedPar("2. Parce que l'équilibre visuel peut être obtenu par compensation (un grand élément sombre équilibré par plusieurs petits éléments clairs), et non uniquement par une symétrie parfaite."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. Réponse argumentée : la composition verticale convient à un sujet stable ou imposant (portrait, bâtiment) ; la composition en spirale convient pour mettre en valeur un élément central précis — l'élève doit justifier selon le sujet choisi."));
children.push(numberedPar("2. Lui conseiller de varier davantage les textures utilisées (matériaux rugueux, granuleux, souples) pour enrichir le contraste de sa composition."));
children.push(numberedPar("3. Réponse libre, cohérente avec un matériau local réel (par exemple : paille, coquillage, terre cuite) et sa texture décrite avec justesse."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 3 — Arts et autres disciplines
// ---------------------------------------------------------------------
children.push(...chapTitle(3, "Arts et autres disciplines"));
children.push(exo("A", "Connaissance/compréhension"));
["interdisciplinarité", "lettrage", "graphisme", "esthétique du langage", "interprétation artistique"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Sciences de la vie et de la terre ; langue (français ou créole)."));
children.push(numberedPar("2. Écorces, gousses, pailles."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : choisir un mot court et significatif, esquisser légèrement les lettres au crayon, ajouter des décorations liées au sens du mot avant de finaliser au feutre ou à l'encre."));
children.push(numberedPar("2. Parce qu'il faut d'abord bien connaître les caractéristiques réelles du sujet (forme, texture, motifs) pour ensuite pouvoir s'en éloigner de façon personnelle et cohérente lors de l'interprétation."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. La représentation fidèle reste proche du sujet réellement observé ; l'interprétation personnelle s'en éloigne pour exprimer un point de vue ou une sensibilité propre à l'élève."));
children.push(numberedPar("2. Lui conseiller de simplifier les décorations autour des lettres, pour que le mot reste lisible malgré l'aspect décoratif."));
children.push(numberedPar("3. Réponse libre, reliant les arts visuels à une matière réellement étudiée par l'élève, avec une justification cohérente du lien proposé."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 4 — Sur les traces du patrimoine
// ---------------------------------------------------------------------
children.push(...chapTitle(4, "Sur les traces du patrimoine"));
children.push(exo("A", "Connaissance/compréhension"));
["site historique", "patrimoine", "réappropriation", "carnet de visite", "portfolio"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Deux exemples de patrimoine matériel (par exemple : un bâtiment ancien, un objet ancien) et un exemple de patrimoine immatériel (par exemple : un savoir-faire ou une pratique transmise oralement)."));
children.push(numberedPar("2. Deux parmi : ateliers, laboratoires, chantiers, galeries d'art, musées."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : noter la date, le lieu et une courte description ; réaliser un ou plusieurs croquis rapides ; ajouter des mots-clés (matériaux, couleurs, impressions)."));
children.push(numberedPar("2. Parce que même imparfait, un croquis rapide garde une trace exploitable pour la création future, contrairement à l'absence totale de notes."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. En 7e AF, le patrimoine était imaginé (contes, personnages traditionnels, illustrations) ; en 8e AF, il est observé directement (visite réelle ou documentaire) et documenté dans un carnet — un changement réel de méthode, de l'imaginaire vers l'observation du réel."));
children.push(numberedPar("2. Lui proposer l'alternative documentaire prévue par le chapitre : réaliser le même travail à partir de photographies, de souvenirs précis ou de récits de proches."));
children.push(numberedPar("3. Réponse libre, cohérente avec un lieu patrimonial réel de la commune de l'élève, sans invention d'un site fictif."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 5 — Lire et chanter en clé de Fa
// ---------------------------------------------------------------------
children.push(...chapTitle(5, "Lire et chanter en clé de Fa"));
children.push(exo("A", "Connaissance/compréhension"));
["clé de Fa", "mesure composée", "gamme mineure", "gamme relative", "métronome"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Dans une mesure simple, chaque temps se divise en deux ; dans une mesure composée, chaque temps se divise en trois."));
children.push(numberedPar("2. Une gamme relative mineure partage exactement les mêmes notes qu'une gamme majeure donnée, mais elle commence sur une note différente, ce qui donne une couleur sonore différente."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Réponse libre : toute mesure composée cohérente (division de chaque temps en trois) est acceptable si l'élève explique correctement son comptage."));
children.push(numberedPar("2. Réponse descriptive libre, cohérente avec le fait que les repères de lecture en clé de Fa diffèrent de ceux de la clé de Sol pour une même note grave."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. La lecture s'élargit à un registre plus grave (clé de Fa) et à de nouveaux repères de lecture sur la portée, en plus de ce qui était déjà maîtrisé en clé de Sol."));
children.push(numberedPar("2. Lui conseiller de compter à voix haute en distinguant bien la division en deux (mesure simple) de la division en trois (mesure composée), avant de rejouer le rythme."));
children.push(numberedPar("3. Réponse libre : toute suite de 4 notes en clé de Fa est acceptable, avec une indication cohérente de couleur majeure ou mineure."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 6 — Jouer ensemble : chorale et orchestre
// ---------------------------------------------------------------------
children.push(...chapTitle(6, "Jouer ensemble : chorale et orchestre"));
children.push(exo("A", "Connaissance/compréhension"));
["flûte à bec alto", "musique d'ensemble", "chorale", "orchestre", "s'harmoniser"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Deux différences parmi : jouer seul (7e AF) vs jouer avec un groupe (8e AF) ; absence d'écoute collective requise (7e AF) vs nécessité de s'harmoniser avec les autres (8e AF)."));
children.push(numberedPar("2. Déjà connu en 7e AF : flûte à bec soprano, voix, percussion. Nouveau en 8e AF : flûte à bec alto, musique d'ensemble (chorale, orchestre), chants traditionnels haïtiens."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : répartir les rôles, s'entraîner d'abord séparément, se réunir progressivement en écoutant les autres, ajuster ensemble volume et tempo sous la direction de l'enseignant."));
children.push(numberedPar("2. Pour ne pas couvrir le reste du groupe et permettre à l'ensemble de rester équilibré et compréhensible collectivement."));
children.push(spacer(120));
children.push(exo("D", "Analyse et expression (éléments de réponse attendus)"));
children.push(numberedPar("1. La musique d'ensemble exige des compétences nouvelles : écouter le groupe en jouant, ajuster son propre volume, respecter un rôle précis dans un ensemble plutôt que jouer en autonomie complète."));
children.push(numberedPar("2. Lui conseiller de baisser son volume et de s'exercer à écouter davantage les autres voix ou instruments du groupe pendant qu'il joue ou chante."));
children.push(numberedPar("3. Réponse libre, cohérente avec un chant traditionnel réellement connu de l'élève ou de sa région, sans invention d'un titre fictif."));
children.push(spacer(200));

await buildAndSave(
  children,
  61,
  "Manuel_EEA_8AF_CorrigeGeneral.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_8e_AF\\06_CORRIGE_GENERAL",
);
