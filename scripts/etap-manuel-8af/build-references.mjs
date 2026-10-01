// Manuel d'ETAP 8e AF — References finales et tracabilite MENFP
// (Phase finale). Ne cite que les sources de niveau A/B deja verifiees
// (voir 00_REFERENCES/SOURCES_VERIFIEES_ETAP_8AF.md). Aucune source non
// verifiee n'est presentee comme reference officielle.
import {
  bodyPar, subHeading, bulletPar,
  spacer, pageBreak, threeColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, VERT,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "RÉFÉRENCES", bold: true, size: 44, color: VERT, font: "Calibri" })],
}));
children.push(bodyPar(
  "Cette section présente les sources documentaires effectivement consultées et utilisées pour la conception du " +
  "Manuel d'ETAP 8e AF. Elle distingue la source officielle principale des ressources d'accompagnement " +
  "consultées.",
));
children.push(spacer(200));

children.push(subHeading("Source officielle principale"));
children.push(bodyPar(
  "Ministère de l'Éducation Nationale et de la Formation Professionnelle — Direction Enseignement Fondamental " +
  "(MENFP/DEF). Programme du 3e cycle (7e à 9e AF) — Éducation à la Technologie et aux Activités Productives " +
  "(ETAP), tronc commun, version définitive, 28 juillet 2024 (77 pages). Consulté via la Banque de Documents " +
  "de la plateforme NectarEduProfHaïti (menfp.reseau-canope.fr), dossier « PROGRAMME FONDAMENTAL ». Même " +
  "document que celui utilisé pour le Manuel ETAP 7e AF — aucun document distinct n'existe par niveau.",
  { italics: true },
));
children.push(bodyPar(
  "C'est le document source de l'ensemble des compétences, savoirs et activités cités comme [OFFICIEL — SOURCE " +
  "VÉRIFIÉE] dans les six chapitres du manuel, pour la section « 8e année du fondamental » (pages 48 à 55).",
));
children.push(spacer(160));

children.push(subHeading("Ressource d'accompagnement consultée (complément)"));
children.push(bulletPar("Page « Banque de Documents », menfp.reseau-canope.fr/course/view.php?id=61 — portail d'accès public ayant permis de localiser la source officielle principale."));
children.push(bulletPar("Séquences modèles ETAP 8e AF, menfp.reseau-canope.fr/course/view.php?id=609 — identifiées mais verrouillées par un accès identifiants ; non consultées, non utilisées comme source de contenu."));
children.push(spacer(200));

children.push(pageBreak());
children.push(subHeading("Tableau de traçabilité MENFP par chapitre"));
children.push(threeColTable(
  ["Chapitre", "Champ ETAP", "Pages du document source réellement vérifiées et citées"],
  [
    ["1", "Nouvelles technologies du numérique (applications/outils collaboratifs)", "p.54-55"],
    ["2", "Métiers de la mer générateurs de revenus (conception de prototype)", "p.48-49"],
    ["3", "Métiers du recyclage et des énergies renouvelables (contenu 8e AF : énergies renouvelables)", "p.49-50"],
    ["4", "Métiers de l'agriculture générateurs de revenus (conception de prototype)", "p.51-52"],
    ["5", "Entrepreneuriat (modes de production, financement, ressources)", "p.52-53"],
    ["6", "Projet de synthèse (transversal, choix éditorial)", "réinvestit p.48-55 ; aucune page nouvelle"],
  ],
  [1200, 4600, 3800],
));
children.push(spacer(200));

children.push(subHeading("Note sur les sources non retenues"));
children.push(bodyPar(
  "Conformément à la règle de traçabilité appliquée depuis la Phase 0 (7e AF puis 8e AF), les sources suivantes " +
  "ont été identifiées mais n'ont pas pu être vérifiées et ne sont donc citées nulle part dans ce manuel comme " +
  "référence officielle : le cours ETAP verrouillé et les séquences modèles 8e AF de la même plateforme (accès " +
  "par identifiants), un éventuel « guide MENFP d'appui aux stratégies d'enseignement et d'évaluation des " +
  "nouvelles matières » (introuvable publiquement à ce jour), ainsi que l'ancien hébergeur " +
  "projet-nectar.canoprof.fr (plateforme fermée depuis le 2026-08-01). Ces éléments restent documentés, à " +
  "titre interne, dans 00_REFERENCES/SOURCES_VERIFIEES_ETAP_8AF.md.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Avertissement"));
children.push(bodyPar(
  "Ce manuel constitue une adaptation pédagogique du programme officiel ETAP 8e AF du MENFP. Il n'est ni " +
  "publié, ni homologué, ni approuvé par le MENFP. Les adaptations pédagogiques, les exemples contextualisés, " +
  "les activités et les exercices sont des choix éditoriaux de ce manuel, clairement distincts des éléments " +
  "directement issus du programme officiel — cette distinction est documentée en détail dans les fichiers de " +
  "traçabilité du projet.",
));

await buildAndSave(children, 99, "Manuel_ETAP_8AF_References.docx");
