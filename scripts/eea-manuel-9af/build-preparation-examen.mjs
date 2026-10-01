// Manuel d'EEA 9e AF — Préparation à l'examen / évaluation de fin de
// cycle (Phase Finale, PARTIE III).
//
// Conforme au plan verrouillé en Phase 0
// (00_PHASE0/14_PLAN_CORRIGES_ET_PREPARATION_EXAMEN_EEA.md) : structure en
// 4 temps (diagnostic -> entrainement guide -> entrainement semi-autonome
// -> simulation complete), a partir UNIQUEMENT des competences et notions
// reellement enseignees dans les Chapitres 1 a 7.
//
// STATUT : toutes les epreuves de cette section sont des EPREUVES
// D'ENTRAINEMENT ORIGINALES, creees pour ce manuel. Aucune n'est une copie
// ni une reproduction d'un examen officiel MENFP. Le niveau de difficulte
// et le format (QCM, completion, questions ouvertes courtes ; duree
// indicative 1h pour la simulation) s'inspirent de la STRUCTURE et des
// THEMES observes dans le "Texte modele" EEA 9e AF (juillet 2024, en-tete
// MENFP/BUNEXE authentique) documente dans
// 00_PHASE0/13_INVENTAIRE_EXAMENS_EEA_9AF_2024_2025_2026.md — sans jamais
// en recopier les enonces, conformement a la reserve de droits documentee
// dans ce meme inventaire ("DROITS / SOURCE A REGLER").
//
// Aucun corrige n'apparait dans cette section : les corriges des epreuves
// d'entrainement sont regroupes dans la PARTIE IV (voir
// build-corriges-epreuves.mjs).
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, spacer, pageBreak, threeColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, OUTREMER, OCRE,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "PRÉPARATION À L'EXAMEN DE FIN DE CYCLE", bold: true, size: 40, color: OUTREMER, font: "Calibri" })],
}));
children.push(bodyPar(
  "La 9e Année Fondamentale marque la fin du 3e cycle fondamental. Cette section te propose une préparation " +
  "progressive à l'évaluation de fin de cycle en Éducation Esthétique et Artistique, construite " +
  "exclusivement à partir des compétences et notions réellement enseignées dans les sept chapitres de ce " +
  "manuel.",
));
children.push(calloutBox(
  "STATUT DE CETTE SECTION",
  [
    "Toutes les épreuves qui suivent sont des ÉPREUVES D'ENTRAÎNEMENT ORIGINALES, créées spécifiquement pour " +
    "ce manuel. Aucune n'est une épreuve officielle du MENFP, ni une reproduction d'un examen déjà passé.",
    "Leur format (questionnaire à choix multiples, complétion, questions ouvertes courtes) et leur niveau de " +
    "difficulté s'inspirent de la structure générale des évaluations de fin de cycle, sans copier aucun " +
    "énoncé existant.",
    "Les corrigés de ces épreuves d'entraînement se trouvent dans une section séparée, après les annexes.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("1. Diagnostic — où en es-tu ?", "III.1"));
children.push(bodyPar(
  "Ce court diagnostic couvre les sept chapitres du manuel. Réponds rapidement, sans réviser au préalable : " +
  "il sert à repérer les notions à revoir avant de poursuivre la préparation.",
  { italics: true },
));
children.push(numberedPar("1. Cite les trois couleurs primaires. (Chapitre 1)"));
children.push(numberedPar("2. Qu'est-ce qui distingue l'espace positif de l'espace négatif dans une composition ? (Chapitre 2)"));
children.push(numberedPar("3. Cite deux caractéristiques du style architectural Gingerbread haïtien. (Chapitre 3)"));
children.push(numberedPar("4. Cite deux types de compétences mobilisées dans les métiers culturels. (Chapitre 4)"));
children.push(numberedPar("5. Qu'est-ce qu'un accord en musique ? (Chapitre 5)"));
children.push(numberedPar("6. Cite les quatre tailles de flûtes à bec rencontrées depuis la 7e AF. (Chapitre 6)"));
children.push(numberedPar("7. Quelle est la différence entre le mixage et le mastering ? (Chapitre 7)"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("2. Entraînement guidé — par thème", "III.2"));
children.push(bodyPar(
  "Ces exercices sont organisés par grand thème, avec un indice pour t'aider si besoin.",
));
children.push(spacer(160));

children.push(subHeading("Thème A — Arts plastiques et visuels (Chapitres 1 à 4)"));
children.push(numberedPar("1. Construis un accord de couleurs (une primaire + une secondaire) et explique l'effet recherché. Indice : relis la section 1.2 sur le cercle chromatique."));
children.push(numberedPar("2. Observe une image (dessin, photo ou affiche) et identifie sa structure de composition dominante. Indice : verticale, diagonale ou spirale (section 2.1)."));
children.push(numberedPar("3. Explique en une phrase le rôle d'un logiciel de design dans une création artistique actuelle. Indice : relis la section 3.2."));
children.push(numberedPar("4. Cite un métier culturel et le type de compétence qu'il mobilise principalement. Indice : tableau de la section 4.3."));
children.push(spacer(160));

children.push(subHeading("Thème B — Patrimoine haïtien (transversal)"));
children.push(numberedPar("1. Cite un exemple de patrimoine haïtien étudié dans ce manuel (visuel, architectural ou musical), sans le confondre avec un autre niveau."));
children.push(numberedPar("2. Explique en une phrase pourquoi la réappropriation directe du patrimoine (visite, observation) est différente de sa simple évocation imaginée."));
children.push(spacer(160));

children.push(subHeading("Thème C — Musique (Chapitres 5 à 7)"));
children.push(numberedPar("1. Construis un accord parfait à partir de la note Sol. Indice : empile la 1re, la 3e et la 5e note de la gamme de Sol majeur."));
children.push(numberedPar("2. Explique la différence entre une mesure simple et une mesure composée. Indice : division du temps en deux ou en trois (acquis de 8e AF)."));
children.push(numberedPar("3. Explique ce qu'apporte le mixage à un enregistrement brut. Indice : relis la section 7.2."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("3. Entraînement semi-autonome", "III.3"));
children.push(bodyPar(
  "Ces épreuves combinent plusieurs chapitres à la fois, avec moins d'indices. Prends le temps de bien lire " +
  "chaque consigne avant de répondre.",
));
children.push(spacer(160));

children.push(subHeading("Épreuve semi-autonome 1 — Arts plastiques (Chapitres 1-4)"));
children.push(numberedPar("1. Décris une composition (réelle ou imaginée) en précisant : sa palette de couleurs dominante, sa structure de composition, et un métier culturel qui pourrait être impliqué dans sa réalisation ou sa diffusion."));
children.push(numberedPar("2. Compare deux médiums artistiques étudiés dans ce manuel (par exemple le dessin et l'architecture) : qu'ont-ils en commun sur le plan de la composition ?"));
children.push(spacer(160));

children.push(subHeading("Épreuve semi-autonome 2 — Musique (Chapitres 5-7)"));
children.push(numberedPar("1. Décris les étapes qui mènent de l'écriture d'une mélodie originale (Chapitre 5) à sa production finale mixée (Chapitre 7), en passant par son enregistrement (Chapitre 6)."));
children.push(numberedPar("2. Un morceau utilise une gamme mineure et une mesure composée. Que peux-tu en déduire sur son caractère probable, et pourquoi ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("4. Simulation complète", "III.4"));
children.push(bodyPar(
  "Cette épreuve d'entraînement originale se présente sous une forme proche d'une évaluation de fin de " +
  "cycle : trois parties, durée indicative d'une heure. Elle ne reproduit aucun examen existant.",
  { italics: true },
));
children.push(spacer(160));

children.push(subHeading("Partie I — Questionnaire à choix multiples (4 questions)"));
children.push(numberedPar("1. Les trois couleurs primaires sont : (a) rouge, vert, bleu (b) rouge, jaune, bleu (c) orange, vert, violet (d) jaune, vert, violet."));
children.push(numberedPar("2. Une composition en spirale guide le regard : (a) en ligne droite (b) vers un point central (c) uniquement vers le bas (d) de façon aléatoire."));
children.push(numberedPar("3. Le style architectural Gingerbread se caractérise notamment par : (a) des façades en béton lisse (b) des façades en bois ouvragé et des couleurs vives (c) l'absence totale de décoration (d) des tours en verre."));
children.push(numberedPar("4. Le mastering intervient : (a) avant le mixage (b) à la place du mixage (c) après le mixage, pour finaliser la production (d) uniquement pour l'enregistrement live."));
children.push(spacer(160));

children.push(subHeading("Partie II — Complétion (3 questions)"));
children.push(numberedPar("1. Un accord réunit plusieurs ...................... jouées en même temps."));
children.push(numberedPar("2. Une organisation dont la mission concerne la culture ou les arts s'appelle une ......................"));
children.push(numberedPar("3. La zone qui entoure le sujet principal d'une composition s'appelle l'......................"));
children.push(spacer(160));

children.push(subHeading("Partie III — Questions ouvertes courtes (3 questions)"));
children.push(numberedPar("1. Explique en quelques phrases pourquoi la couleur, la composition et le patrimoine sont liés dans l'art haïtien, en t'appuyant sur au moins un exemple de ce manuel."));
children.push(numberedPar("2. Décris les étapes que tu suivrais pour préparer une courte production musicale originale, de l'écriture à la diffusion."));
children.push(numberedPar("3. Choisis un métier culturel étudié dans ce manuel et explique en quoi il te semble utile à la société haïtienne."));
children.push(spacer(200));

await buildAndSave(
  children,
  78,
  "Manuel_EEA_9AF_PreparationExamen.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\11_PREPARATION_EXAMEN",
);
