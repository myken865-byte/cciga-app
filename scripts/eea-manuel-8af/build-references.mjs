// Manuel d'EEA 8e AF — References finales et tracabilite MENFP
// (Phase Finale). Ne cite que la source de niveau A deja verifiee (voir
// 00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md). Aucune source non verifiee n'est
// presentee comme reference officielle. Aucune donnee editoriale (auteur,
// editeur, ISBN, depot legal) n'est inventee.
import {
  bodyPar, subHeading, bulletPar,
  spacer, pageBreak, threeColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, OUTREMER,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "RÉFÉRENCES", bold: true, size: 44, color: OUTREMER, font: "Calibri" })],
}));
children.push(bodyPar(
  "Cette section présente les sources documentaires effectivement consultées et utilisées pour la conception " +
  "du Manuel d'EEA 8e AF. Elle distingue la source officielle principale des ressources d'accompagnement " +
  "consultées.",
));
children.push(spacer(200));

children.push(subHeading("Source officielle principale"));
children.push(bodyPar(
  "Ministère de l'Éducation Nationale et de la Formation Professionnelle — Direction Enseignement Fondamental " +
  "(MENFP/DEF). Éducation Esthétique et Artistique (EEA) — Programme du 3e cycle (7e à 9e AF), version " +
  "définitive, 28 juillet 2024 (63 pages). Consulté via la Banque de Documents de la plateforme " +
  "NectarEduProfHaïti (menfp.reseau-canope.fr), dossier « PROGRAMME FONDAMENTAL ». Même document source que " +
  "celui utilisé pour le Manuel d'EEA 7e AF de ce projet, dont les unités d'apprentissage propres à la 8e AF " +
  "ont été relues et vérifiées en direct pour chacun des six chapitres.",
  { italics: true },
));
children.push(bodyPar(
  "C'est le document source de l'ensemble des compétences, savoirs et activités cités comme [OFFICIEL — " +
  "SOURCE MENFP VÉRIFIÉE] dans les six chapitres du manuel, pour les unités d'apprentissage 1 à 4 (arts " +
  "plastiques, p.37-51) et 1, 2, 3 (musique, p.52-62), ainsi que le tableau de progression annuelle " +
  "explicitement séparé par année (p.40, 56-57), qui a permis de confirmer avec un niveau de preuve renforcé " +
  "les contenus propres à la 8e AF pour les Chapitres 5 et 6.",
));
children.push(spacer(160));

children.push(subHeading("Documents d'examen 9e AF identifiés (recherche complémentaire, Phase 0)"));
children.push(bodyPar(
  "Un « Texte modèle » EEA 9e AF à en-tête MENFP/BUNEXE/DEF authentique, daté juillet 2024, a été localisé et " +
  "analysé (hébergé sur haitilibre.com, plateforme tierce). Ce document concerne la 9e AF, hors périmètre de " +
  "ce manuel de 8e AF, et n'a donc pas été utilisé pour sa conception. Il reste documenté à titre de contexte " +
  "dans 00_PHASE0/13_INVENTAIRE_EXAMENS_EEA_9AF_2024_2025_2026.md.",
  { italics: true },
));
children.push(spacer(200));

children.push(pageBreak());
children.push(subHeading("Tableau de traçabilité MENFP par chapitre"));
children.push(threeColTable(
  ["Chapitre", "Axe EEA", "Pages du document source réellement vérifiées et citées"],
  [
    ["1", "Arts plastiques — Axe 1 : L'observation (approfondissement)", "p.40-42"],
    ["2", "Arts plastiques — Axe 2 : Le développement des sens", "p.43-44"],
    ["3", "Arts plastiques — Axe 3 : Construction en volume / interdisciplinarité", "p.45-48"],
    ["4", "Arts plastiques — Axe 4 : Valorisation du patrimoine", "p.40, 49-51"],
    ["5", "Musique — Axes 1-2 : Théorie musicale + Solfège", "p.53-54, 56, 59-61"],
    ["6", "Musique — Axe 3 : Pratique instrumentale", "p.57, 61-62"],
  ],
  [1200, 4600, 3800],
));
children.push(spacer(200));

children.push(subHeading("Note sur le niveau de preuve de l'attribution annuelle"));
children.push(bodyPar(
  "Pour les Chapitres 1 à 4 (arts plastiques), l'attribution précise d'une portion du tableau d'unité complète " +
  "à la 8e AF spécifiquement repose sur une reconstruction de lecture documentée en Phase 0, marquée " +
  "[ADAPTATION DE LECTURE — À RECONFIRMER] dans les fichiers de traçabilité correspondants ; le contenu " +
  "lui-même reste verbatim présent dans la source. Pour les Chapitres 5 et 6 (musique), le tableau de " +
  "progression (p.56-57) sépare explicitement les colonnes 7e/8e/9e AF, ce qui confirme directement " +
  "l'attribution à la 8e AF sans reconstruction nécessaire — un niveau de preuve plus solide, documenté dans " +
  "les fichiers CONTROLE_TRACABILITE_CHAPITRE5.md et CHAPITRE6.md.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Note sur le regroupement des axes de musique"));
children.push(bodyPar(
  "Le programme officiel définit 5 axes musicaux distincts (Théorie musicale, Solfège, Pratique instrumentale, " +
  "MAO, Appréciation musicale). Pour la lisibilité du manuel, les deux premiers axes ont été regroupés en un " +
  "seul chapitre (Chapitre 5) — un choix éditorial explicitement documenté dès la Phase 0 " +
  "(00_PHASE0/08_TABLE_MATIERES_PROPOSEE_EEA_8AF.md), jamais présenté comme un découpage imposé par le MENFP. " +
  "Les axes 4 (MAO) et 5 (Appréciation musicale) prévus pour les Chapitres 7 de la collection ne sont pas " +
  "traités dans ce manuel de 8e AF, dont l'architecture verrouillée s'arrête à 6 chapitres.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Note sur les sources non retenues"));
children.push(bodyPar(
  "Conformément à la règle de traçabilité déjà appliquée aux collections EPS, ETAP et EEA 7e AF de ce projet, " +
  "les documents suivants ont été identifiés mais ne sont pas cités comme référence officielle : les " +
  "ressources pédagogiques tierces sans en-tête institutionnel visible (« Contenus Essentiels EEA 2025 », " +
  "« Cours EEA 9AF — Vladimyr Fleury », « Syllabus EEA 9e AF », toutes trouvées sur Scribd), ainsi que l'offre " +
  "commerciale « Modèles d'examens officiels du MENFP » d'Éditions JPL, écartée par principe. Ces éléments " +
  "restent documentés, à titre interne, dans 00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md et " +
  "00_PHASE0/13_INVENTAIRE_EXAMENS_EEA_9AF_2024_2025_2026.md.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Avertissement"));
children.push(bodyPar(
  "Ce manuel constitue une adaptation pédagogique du programme officiel EEA 8e AF du MENFP. Il n'est ni " +
  "publié, ni homologué, ni approuvé par le MENFP. Les adaptations pédagogiques, les exemples contextualisés, " +
  "les activités et les exercices sont des choix éditoriaux de ce manuel, clairement distincts des éléments " +
  "directement issus du programme officiel — cette distinction est documentée en détail dans les fichiers de " +
  "traçabilité du projet (00_PHASE0/ et EEA_8e_AF/10_AUDITS/).",
));

await buildAndSave(
  children,
  70,
  "Manuel_EEA_8AF_References.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_8e_AF\\08_REFERENCES_FINALES",
);
