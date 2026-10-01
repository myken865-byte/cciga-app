// Manuel d'EEA 9e AF — Corrigés des épreuves d'entraînement
// (Phase Finale, PARTIE IV).
//
// Corrige chaque epreuve de build-preparation-examen.mjs (diagnostic,
// entrainement guide, entrainement semi-autonome, simulation complete),
// dans le meme ordre exact. Reponses derivees du contenu reel des
// Chapitres 1 a 7. Pour les questions ouvertes/de production, des elements
// de reponse attendus ou une grille d'observation commentee sont fournis,
// conformement a 00_PHASE0/14_PLAN_CORRIGES_ET_PREPARATION_EXAMEN_EEA.md
// (PARTIE IV). Aucun de ces corriges n'est presente comme "corrige
// officiel MENFP" : ce sont des corriges pedagogiques crees pour ce
// manuel, a partir du raisonnement du programme retenu.
import {
  bodyPar, sectionHeading, subHeading, numberedPar,
  spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph, OUTREMER,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "CORRIGÉS DES ÉPREUVES D'ENTRAÎNEMENT", bold: true, size: 36, color: OUTREMER, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ces corrigés sont réservés à l'enseignant. Ils portent sur les épreuves d'entraînement originales de la " +
  "section « Préparation à l'examen » et ne constituent en aucun cas un corrigé officiel du MENFP. Les " +
  "réponses ouvertes sont accompagnées d'éléments attendus plutôt que d'une formulation unique imposée.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("1. Corrigé du diagnostic"));
children.push(numberedPar("1. Rouge, jaune, bleu."));
children.push(numberedPar("2. L'espace positif est occupé par le sujet principal ; l'espace négatif est la zone qui l'entoure — les deux participent à l'équilibre général."));
children.push(numberedPar("3. Deux parmi : façades en bois découpé/sculpté, toits pentus/tourelles/vérandas, couleurs vives."));
children.push(numberedPar("4. Deux parmi : artistique, technique, administratif/gestion, recherche/transmission."));
children.push(numberedPar("5. Un ensemble d'au moins trois notes jouées en même temps."));
children.push(numberedPar("6. Soprano, alto, ténor, basse."));
children.push(numberedPar("7. Le mixage équilibre plusieurs sons entre eux ; le mastering finalise et uniformise la production juste avant sa diffusion."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("2. Corrigé de l'entraînement guidé"));
children.push(subHeading("Thème A — Arts plastiques et visuels"));
children.push(numberedPar("1. Réponse libre : par exemple rouge (primaire) + vert (secondaire) pour un contraste vif ; l'élève doit nommer les deux couleurs et justifier l'effet recherché (contraste, harmonie, intensité)."));
children.push(numberedPar("2. Réponse dépendante de l'image choisie ; l'important est la cohérence entre la structure identifiée (verticale, diagonale ou spirale) et l'observation décrite."));
children.push(numberedPar("3. Élément attendu : un logiciel de design permet de concevoir, tester et modifier une forme numériquement avant sa fabrication ou sa diffusion."));
children.push(numberedPar("4. Réponse libre : tout métier culturel réel est acceptable si le type de compétence (artistique, technique, administratif, recherche) est correctement identifié."));
children.push(spacer(160));

children.push(subHeading("Thème B — Patrimoine haïtien"));
children.push(numberedPar("1. Réponse libre, cohérente avec un exemple réellement étudié dans ce manuel (art naïf haïtien, style Gingerbread, chants traditionnels, musique haïtienne actuelle, etc.), sans confusion avec un contenu d'un autre niveau (7e/8e AF)."));
children.push(numberedPar("2. Élément attendu : l'observation directe (visite, croquis) documente une réalité concrète et vérifiable, alors que l'évocation imaginée reste une reconstruction sans contact direct avec le patrimoine réel."));
children.push(spacer(160));

children.push(subHeading("Thème C — Musique"));
children.push(numberedPar("1. Sol-Si-Ré (1re, 3e et 5e degré de la gamme de Sol majeur)."));
children.push(numberedPar("2. Dans une mesure simple, chaque temps se divise en deux ; dans une mesure composée, chaque temps se divise en trois."));
children.push(numberedPar("3. Élément attendu : le mixage équilibre le volume, la clarté et la position des différents sons d'un enregistrement brut, pour obtenir un résultat plus cohérent et agréable à l'écoute."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("3. Corrigé de l'entraînement semi-autonome"));
children.push(subHeading("Épreuve semi-autonome 1 — Arts plastiques"));
children.push(numberedPar("1. Réponse libre et argumentée : la production doit préciser une palette dominante cohérente (primaire/secondaire), une structure de composition nommée, et un métier culturel plausible (par exemple un designer graphique, un restaurateur, un galeriste) selon le type de production décrite."));
children.push(numberedPar("2. Élément attendu : les deux médiums partagent les mêmes principes de composition (équilibre, structure verticale/diagonale/spirale, espace positif/négatif), même si les outils et matériaux diffèrent."));
children.push(spacer(160));

children.push(subHeading("Épreuve semi-autonome 2 — Musique"));
children.push(numberedPar("1. Éléments attendus : écrire la mélodie sur portée (Chapitre 5) → l'enregistrer, seul ou en groupe, avec attention à la position du micro et au niveau sonore (Chapitre 6) → mixer et finaliser l'enregistrement (Chapitre 7)."));
children.push(numberedPar("2. Élément attendu : la gamme mineure suggère souvent une couleur plus grave ou mélancolique, et la mesure composée donne un rythme balancé (division en trois) — le morceau pourrait donc sonner plus sombre et plus souple rythmiquement qu'un morceau en majeur/mesure simple. Réponse à nuancer et à justifier par l'élève."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("4. Corrigé de la simulation complète"));
children.push(subHeading("Partie I — Questionnaire à choix multiples"));
children.push(numberedPar("1. (b) rouge, jaune, bleu."));
children.push(numberedPar("2. (b) vers un point central."));
children.push(numberedPar("3. (b) des façades en bois ouvragé et des couleurs vives."));
children.push(numberedPar("4. (c) après le mixage, pour finaliser la production."));
children.push(spacer(160));

children.push(subHeading("Partie II — Complétion"));
children.push(numberedPar("1. notes."));
children.push(numberedPar("2. institution culturelle."));
children.push(numberedPar("3. espace négatif."));
children.push(spacer(160));

children.push(subHeading("Partie III — Questions ouvertes courtes (éléments de réponse attendus)"));
children.push(numberedPar("1. L'élève doit relier au moins deux éléments du manuel (par exemple : la couleur vive de l'art naïf haïtien, une composition inspirée du patrimoine, ou un projet reliant architecture et patrimoine) en expliquant leur lien, avec un exemple concret tiré d'un chapitre."));
children.push(numberedPar("2. Élément attendu : écriture de la mélodie → construction d'un accord/harmonie simple → enregistrement (position du micro, niveau sonore) → mixage/mastering avant diffusion, dans un ordre logique et justifié."));
children.push(numberedPar("3. Réponse libre et argumentée, cohérente avec un métier réellement étudié dans le Chapitre 4, expliquant son utilité sociale, économique ou culturelle pour Haïti."));

await buildAndSave(
  children,
  87,
  "Manuel_EEA_9AF_CorrigesEpreuves.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\13_CORRIGES_EPREUVES",
);
