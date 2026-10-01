// Manuel d'EEA 9e AF — References finales et tracabilite MENFP
// (Phase Finale, PARTIE VI). Ne cite que les sources deja verifiees (voir
// 00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md et
// 00_PHASE0/13_INVENTAIRE_EXAMENS_EEA_9AF_2024_2025_2026.md). Aucune source
// non verifiee n'est presentee comme reference officielle. Aucune donnee
// editoriale (auteur, editeur, ISBN, depot legal) n'est inventee.
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
  "du Manuel d'EEA 9e AF. Elle distingue la source officielle principale des documents d'examen identifiés en " +
  "recherche complémentaire.",
));
children.push(spacer(200));

children.push(subHeading("Source officielle principale"));
children.push(bodyPar(
  "Ministère de l'Éducation Nationale et de la Formation Professionnelle — Direction Enseignement Fondamental " +
  "(MENFP/DEF). Éducation Esthétique et Artistique (EEA) — Programme du 3e cycle (7e à 9e AF), version " +
  "définitive, 28 juillet 2024 (63 pages). Consulté via la Banque de Documents de la plateforme " +
  "NectarEduProfHaïti (menfp.reseau-canope.fr), dossier « PROGRAMME FONDAMENTAL ». Même document source que " +
  "celui utilisé pour les Manuels d'EEA 7e AF et 8e AF de ce projet.",
  { italics: true },
));
children.push(bodyPar(
  "C'est le document source de l'ensemble des compétences, savoirs et activités cités comme [OFFICIEL — " +
  "SOURCE MENFP VÉRIFIÉE] dans les sept chapitres du manuel, pour les unités d'apprentissage 1 à 4 (arts " +
  "plastiques, p.36-51) et 1 à 5 (musique, p.52-63), ainsi que les tableaux de progression annuelle " +
  "explicitement séparés par année (p.39-40, 56-58), qui ont permis de confirmer avec un niveau de preuve " +
  "renforcé les contenus propres à la 9e AF pour les Chapitres 1, 4, 5, 6 et 7.",
));
children.push(spacer(160));

children.push(subHeading("Documents d'examen 9e AF identifiés (recherche complémentaire, Phase 0)"));
children.push(bodyPar(
  "Un « Texte modèle » EEA 9e AF à en-tête MENFP/BUNEXE/DEF authentique, daté juillet 2024, ainsi qu'un " +
  "« Texte Modèle 2025 » d'origine institutionnelle non confirmée, ont été localisés et analysés (voir " +
  "00_PHASE0/13_INVENTAIRE_EXAMENS_EEA_9AF_2024_2025_2026.md et la section ANNEXES de ce manuel). Leurs " +
  "droits de reproduction n'étant pas confirmés, seules leurs métadonnées et une description de leur " +
  "structure sont présentées ; leurs thèmes et niveau de difficulté ont servi de repère, sans copie " +
  "d'énoncés, pour construire la section « Préparation à l'examen » de ce manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(pageBreak());
children.push(subHeading("Tableau de traçabilité MENFP par chapitre"));
children.push(threeColTable(
  ["Chapitre", "Axe EEA", "Pages du document source réellement vérifiées et citées"],
  [
    ["1", "Arts plastiques — Axe 1 : L'observation (approfondissement final)", "p.39-42"],
    ["2", "Arts plastiques — Axe 2 : Le développement des sens", "p.38-39, 43-44"],
    ["3", "Arts plastiques — Axe 3 : Construction en volume / nouvelles technologies", "p.38-40, 45-48"],
    ["4", "Arts plastiques — Axe 4 : Institutions culturelles et métiers de l'art", "p.36-37, 40, 48-51"],
    ["5", "Musique — Axes 1-2 : Théorie musicale + Solfège", "p.56, 59-61"],
    ["6", "Musique — Axe 3 : Pratique instrumentale", "p.57, 61-62"],
    ["7", "Musique — Axes 4-5 : MAO + Appréciation musicale", "p.57-58, 62-63"],
  ],
  [1200, 5000, 3400],
));
children.push(spacer(200));

children.push(subHeading("Note sur le niveau de preuve de l'attribution annuelle"));
children.push(bodyPar(
  "Pour les Chapitres 1, 4, 5, 6 et 7, le tableau de progression officiel sépare explicitement les colonnes " +
  "7e/8e/9e AF, confirmant directement l'attribution à la 9e AF sans reconstruction nécessaire. Pour les " +
  "Chapitres 2 et 3 (Axes 2 et 3), ce même tableau ne remplit que les colonnes 7e AF et 8e AF ; l'attribution " +
  "à la 9e AF repose alors sur la portion la plus avancée du tableau d'unité complète, marquée [ADAPTATION DE " +
  "LECTURE — À RECONFIRMER] dans les fichiers de contrôle correspondants (CONTROLE_TRACABILITE_CHAPITRE2.md " +
  "et CHAPITRE3.md).",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Note sur le regroupement des axes de musique"));
children.push(bodyPar(
  "Le programme officiel définit 5 axes musicaux distincts (Théorie musicale, Solfège, Pratique instrumentale, " +
  "MAO, Appréciation musicale). Pour la lisibilité du manuel, les deux premiers axes ont été regroupés dans le " +
  "Chapitre 5 et les deux derniers dans le Chapitre 7 — un choix éditorial explicitement documenté dès la " +
  "Phase 0 (00_PHASE0/09_TABLE_MATIERES_PROPOSEE_EEA_9AF.md), jamais présenté comme un découpage imposé par " +
  "le MENFP.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Note sur les sources non retenues"));
children.push(bodyPar(
  "Conformément à la règle de traçabilité déjà appliquée aux collections EPS, ETAP et aux Manuels EEA 7e/8e AF " +
  "de ce projet, les documents suivants ont été identifiés mais ne sont pas cités comme référence officielle : " +
  "les ressources pédagogiques tierces sans en-tête institutionnel confirmé (« Contenus Essentiels EEA 2025 », " +
  "« Cours EEA 9AF — Vladimyr Fleury », « Syllabus EEA 9e AF », toutes trouvées sur Scribd), ainsi que l'offre " +
  "commerciale « Modèles d'examens officiels du MENFP » d'Éditions JPL, écartée par principe. Ces éléments " +
  "restent documentés, à titre interne, dans 00_PHASE0/02_SOURCES_EEA_7_8_9_AF.md et " +
  "00_PHASE0/13_INVENTAIRE_EXAMENS_EEA_9AF_2024_2025_2026.md.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Avertissement"));
children.push(bodyPar(
  "Ce manuel constitue une adaptation pédagogique du programme officiel EEA 9e AF du MENFP. Il n'est ni " +
  "publié, ni homologué, ni approuvé par le MENFP. Les adaptations pédagogiques, les exemples contextualisés, " +
  "les activités, les exercices et les épreuves d'entraînement sont des choix éditoriaux de ce manuel, " +
  "clairement distincts des éléments directement issus du programme officiel — cette distinction est " +
  "documentée en détail dans les fichiers de traçabilité du projet (00_PHASE0/ et EEA_9e_AF/10_AUDITS/).",
));

await buildAndSave(
  children,
  94,
  "Manuel_EEA_9AF_References.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\08_REFERENCES_FINALES",
);
