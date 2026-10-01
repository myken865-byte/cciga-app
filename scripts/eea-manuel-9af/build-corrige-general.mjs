// Manuel d'EEA 9e AF — Corrigé général (Phase Finale, PARTIE II).
// Chaque reponse est derivee directement du texte reel des Chapitres 1 a 7
// (banques de mots, tableaux, criteres d'activite tels qu'ecrits dans
// build-chapitreN.mjs). Aucune reponse n'est inventee ; les questions
// ouvertes (majoritairement C et D) recoivent des "elements de reponse
// attendus" ou une grille d'observation plutot qu'une reponse unique
// artificielle, conformement au Plan des corriges (00_PHASE0/
// 14_PLAN_CORRIGES_ET_PREPARATION_EXAMEN_EEA.md, PARTIE II).
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
  "Ce corrigé regroupe les réponses des exercices des Chapitres 1 à 7 du Manuel d'EEA 9e AF. Il est réservé à " +
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
// Chapitre 1 — La couleur et l'art haïtien
// ---------------------------------------------------------------------
children.push(...chapTitle(1, "La couleur et l'art haïtien"));
children.push(exo("A", "Connaissance/compréhension"));
["couleur primaire", "couleur secondaire", "cercle chromatique", "teinte", "art naïf"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Primaires : rouge, jaune, bleu. Secondaires : orange (rouge+jaune), vert (jaune+bleu), violet (bleu+rouge)."));
children.push(numberedPar("2. Chaudes : rouge, jaune, orange. Froides : bleu, vert, violet."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Mélanger une couleur primaire jaune avec une couleur primaire bleue, en petite quantité d'abord, puis ajuster la proportion jusqu'à obtenir un vert satisfaisant."));
children.push(numberedPar("2. Parce qu'un mélange mal dosé est difficile à corriger une fois appliqué sur la production finale ; le brouillon permet d'ajuster sans risque."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. Réponse libre et justifiée : par exemple des couleurs chaudes et vives pour la joie, des couleurs froides et sombres pour le calme — l'élève doit argumenter le lien entre couleur choisie et émotion visée."));
children.push(numberedPar("2. Lui conseiller d'introduire des nuances plus vives et contrastées (au moins une couleur primaire ou secondaire franche), car des teintes uniquement grisâtres manquent d'intention chromatique."));
children.push(numberedPar("3. Réponse libre, cohérente avec une œuvre naïve réellement observée par l'élève, décrivant sa palette dominante et son effet ressenti (dynamisme, chaleur, étrangeté, etc.)."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 2 — Composer avec maîtrise
// ---------------------------------------------------------------------
children.push(...chapTitle(2, "Composer avec maîtrise"));
children.push(exo("A", "Connaissance/compréhension"));
["espace positif", "espace négatif", "médium", "analyse comparative", "transposer"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation (éléments de réponse attendus)"));
children.push(bodyPar(
  "Réponses dépendantes de l'œuvre choisie par l'élève : identification cohérente d'une structure de " +
  "composition dominante (verticale, diagonale ou spirale) et d'une répartition plausible entre espace " +
  "positif (le sujet) et espace négatif (ce qui l'entoure).",
));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : ignorer d'abord le sujet représenté, chercher une ligne directrice dominante, puis repérer l'espace positif et négatif de la composition."));
children.push(numberedPar("2. Parce que la composition organise l'espace et l'équilibre visuel, indépendamment du matériau ou de la technique utilisés pour la réaliser."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. Réponse argumentée, cohérente avec les deux œuvres choisies par l'élève : comparaison de leur structure dominante (verticale, diagonale, spirale) et justification de la ressemblance ou de la différence observée."));
children.push(numberedPar("2. Lui expliquer que l'espace négatif participe activement à l'équilibre général : sans lui, la composition paraîtrait surchargée ou déséquilibrée, même si rien n'y est représenté."));
children.push(numberedPar("3. Réponse libre : toute culture choisie est acceptable si l'élève décrit une démarche de recherche cohérente (observation, comparaison avec l'art traditionnel haïtien), sans affirmation factuelle non vérifiée."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 3 — L'art à l'ère du numérique
// ---------------------------------------------------------------------
children.push(...chapTitle(3, "L'art à l'ère du numérique"));
children.push(exo("A", "Connaissance/compréhension"));
["style Gingerbread", "logiciel de design", "impression « 3D »", "design intérieur", "croquis architectural"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Trois parmi : façades en bois découpé/sculpté, toits pentus/tourelles/vérandas/balcons ouvragés, couleurs vives."));
children.push(numberedPar("2. Deux parmi : peinture numérique, animation « 3D », architecture, création virtuelle en général."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : tracer d'abord les grandes lignes de la structure, puis ajouter progressivement les éléments décoratifs, en notant les proportions approximatives en marge."));
children.push(numberedPar("2. Parce qu'elle permet d'explorer la construction en volume et les proportions, quel que soit l'accès à un outil numérique — le principe reste le même."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. La sculpture manuelle repose sur un geste physique direct sur la matière ; l'impression « 3D » transforme un modèle numérique en objet via une machine — l'élève doit relever ce changement de processus, pas seulement de résultat."));
children.push(numberedPar("2. Lui conseiller de revenir sur son croquis et d'ajouter explicitement des annotations mathématiques (proportions) et sociales (contexte, usage) directement liées aux éléments observés."));
children.push(numberedPar("3. Réponse libre, cohérente avec un bâtiment réel de la région de l'élève, sans invention d'un lieu fictif."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 4 — Métiers et institutions de la culture
// ---------------------------------------------------------------------
children.push(...chapTitle(4, "Métiers et institutions de la culture"));
children.push(exo("A", "Connaissance/compréhension"));
["institution culturelle", "industries culturelles et créatives", "corps de métier", "exigences professionnelles", "salon des métiers"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Trois parmi : musées/galeries, centres culturels/maisons de la culture, écoles/centres de formation artistique, bibliothèques/centres de documentation."));
children.push(numberedPar("2. Artistique, technique, administratif/gestion, recherche/transmission."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Réponse libre : tout métier culturel réel classé de façon cohérente selon son type de compétence dominant est acceptable, avec justification."));
children.push(numberedPar("2. Éléments attendus : rechercher le métier/l'institution et ses compétences mobilisées, noter les exigences académiques/professionnelles, préparer un dossier écrit puis un support de présentation (stand)."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. Lui expliquer que les industries culturelles mobilisent aussi des compétences techniques, administratives et de recherche (restaurateur, gestionnaire de musée, chercheur en patrimoine, etc.), pas seulement des artistes."));
children.push(numberedPar("2. Réponse argumentée : les deux métiers partagent l'appartenance au secteur culturel, mais se distinguent par le type de compétence dominant (créative pour l'artiste, organisationnelle pour l'administrateur)."));
children.push(numberedPar("3. Réponse libre, cohérente avec des exemples réels et accessibles dans la commune de l'élève, sans invention d'institution précise."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 5 — Harmonie et écriture musicale
// ---------------------------------------------------------------------
children.push(...chapTitle(5, "Harmonie et écriture musicale"));
children.push(exo("A", "Connaissance/compréhension"));
["accord", "harmonie", "écriture musicale", "analyse musicale", "renforcement"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Choisir une note de départ dans la gamme, ajouter la troisième note de la gamme à partir de ce départ, puis ajouter la cinquième note — les trois notes forment l'accord."));
children.push(numberedPar("2. Dans une mesure simple, chaque temps se divise en deux ; dans une mesure composée, chaque temps se divise en trois."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Fa-La-Do (Fa comme départ, La comme 3e degré, Do comme 5e degré de la gamme de Fa majeur)."));
children.push(numberedPar("2. Éléments attendus : choisir gamme/clé/rythme, placer les notes sur la portée en respectant hauteur et durée, rejouer la mélodie pour vérifier et corriger si besoin."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. Écrire une musique originale demande de choisir soi-même la gamme, le rythme et les notes, alors que lire suppose seulement de déchiffrer un choix déjà fait par quelqu'un d'autre — une compétence de création, pas seulement de déchiffrage."));
children.push(numberedPar("2. Lui conseiller d'écrire plus lisiblement (notes bien placées sur la portée, indications de mesure claires) et de faire tester sa mélodie par quelqu'un d'autre avant de la considérer terminée."));
children.push(numberedPar("3. Réponse libre, cohérente avec une pièce réellement écoutée par l'élève, comportant au minimum une observation sur la gamme, le rythme et les accords perçus."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 6 — Jouer, enregistrer, produire
// ---------------------------------------------------------------------
children.push(...chapTitle(6, "Jouer, enregistrer, produire"));
children.push(exo("A", "Connaissance/compréhension"));
["flûte basse", "flûte ténor", "enregistrement sonore", "ingénierie du son", "récital"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Soprano, alto, ténor, basse (du plus aigu au plus grave)."));
children.push(numberedPar("2. La position du microphone (distance à la source) et le niveau sonore (ni trop faible, ni trop fort/saturé)."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : choisir la pièce et l'instrument/la voix, s'entraîner régulièrement, tester la position du micro et le niveau sonore avant l'interprétation finale."));
children.push(numberedPar("2. Parce que l'interprétation en direct permet d'observer directement la technique et la maîtrise de l'élève, sans dépendre d'un matériel qui n'est pas toujours disponible."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. 7e AF : pratique individuelle, premiers gestes techniques. 8e AF : pratique collective, harmonisation avec le groupe. 9e AF : préparation à une évaluation formelle (récital), avec introduction de l'enregistrement — chaque étape ajoute une exigence nouvelle."));
children.push(numberedPar("2. Lui conseiller de rapprocher le micro de la source sonore ou d'augmenter légèrement le niveau d'entrée, en testant avant l'enregistrement final."));
children.push(numberedPar("3. Réponse argumentée : la régularité construit la maîtrise technique sur la durée, alors qu'une bonne performance ponctuelle sans entraînement reste fragile et peu fiable."));
children.push(spacer(200));

// ---------------------------------------------------------------------
// Chapitre 7 — Produire sa musique aujourd'hui
// ---------------------------------------------------------------------
children.push(...chapTitle(7, "Produire sa musique aujourd'hui"));
children.push(exo("A", "Connaissance/compréhension"));
["mixage", "mastering", "home studio", "Pattern Beat Maker", "jugement critique"].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(120));
children.push(exo("B", "Observation"));
children.push(numberedPar("1. Le mixage équilibre plusieurs sons/pistes entre eux ; le mastering finalise et uniformise l'ensemble juste avant la diffusion."));
children.push(numberedPar("2. Deux parmi : choix de mixage, choix d'instrumentation, choix de rythme, contexte de production."));
children.push(spacer(120));
children.push(exo("C", "Application"));
children.push(numberedPar("1. Éléments attendus : choisir un tempo régulier, construire un court motif répétitif (4-8 temps), répéter ce motif pour former une structure stable."));
children.push(numberedPar("2. Parce qu'un jugement argumenté doit situer l'œuvre, analyser des choix de production précis et justifier l'appréciation portée — une simple opinion ne permet pas de comprendre le raisonnement."));
children.push(spacer(120));
children.push(exo("D", "Analyse et justification (éléments de réponse attendus)"));
children.push(numberedPar("1. La MAO de 7e AF portait sur des réglages simples (volume, panoramique) sur une pièce déjà écrite ; ce chapitre demande de produire, mixer et juger de façon autonome — une compétence de production complète, pas seulement de manipulation."));
children.push(numberedPar("2. Lui conseiller d'identifier au moins un élément précis de la production (mixage, instrumentation, rythme) qui justifie son jugement, plutôt qu'une appréciation globale non argumentée."));
children.push(numberedPar("3. Réponse libre, cohérente avec une œuvre haïtienne actuelle réellement connue de l'élève, sans invention d'un titre ou d'un artiste fictif."));
children.push(spacer(200));

await buildAndSave(
  children,
  70,
  "Manuel_EEA_9AF_CorrigeGeneral.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\06_CORRIGE_GENERAL",
);
