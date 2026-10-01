// Manuel d'ETAP 7e AF — References finales et tracabilite MENFP
// (Etape F5 de la Phase finale).
// Ne cite que les sources de niveau A/B/C deja verifiees (voir
// 00_REFERENCES/SOURCES_VERIFIEES_PHASE0.md et 08_REFERENCES_FINALES/
// PLAN_REFERENCES_ETAP_7AF.md). Aucune source de niveau D (inaccessible/
// non verifiee) n'est presentee comme reference officielle.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar,
  spacer, pageBreak, threeColTable, twoColTable,
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
  "Manuel d'ETAP 7e AF. Elle distingue la source officielle principale, une source complémentaire non utilisée " +
  "pour le contenu, et les ressources d'accompagnement consultées.",
));
children.push(spacer(200));

children.push(subHeading("Source officielle principale"));
children.push(bodyPar(
  "Ministère de l'Éducation Nationale et de la Formation Professionnelle — Direction Enseignement Fondamental " +
  "(MENFP/DEF). Programme du 3e cycle (7e à 9e AF) — Éducation à la Technologie et aux Activités Productives " +
  "(ETAP), tronc commun, version définitive, 28 juillet 2024 (77 pages). Consulté via la Banque de Documents " +
  "de la plateforme NectarEduProfHaïti (menfp.reseau-canope.fr), dossier « PROGRAMME FONDAMENTAL ».",
  { italics: true },
));
children.push(bodyPar(
  "C'est le document source de l'ensemble des compétences, savoirs et activités cités comme [OFFICIEL — SOURCE " +
  "VÉRIFIÉE] dans les six chapitres du manuel. Aucune autre source n'a servi de fondement pédagogique au contenu.",
));
children.push(spacer(160));

children.push(subHeading("Source complémentaire non utilisée pour le contenu"));
children.push(bodyPar(
  "MENFP/DEF. Programme du 3e cycle (7e à 9e AF) — ETAP, option (5 heures hebdomadaires), version définitive, " +
  "28 juillet 2024 (38 pages). Même dossier documentaire que la source principale. Cette source a été " +
  "identifiée et conservée en réserve documentaire, mais son contenu détaillé n'a pas été lu ni utilisé : le " +
  "Manuel ETAP 7e AF porte exclusivement sur le tronc commun.",
  { italics: true },
));
children.push(spacer(160));

children.push(subHeading("Ressources d'accompagnement consultées (complément)"));
children.push(bulletPar("Page « Banque de Documents », menfp.reseau-canope.fr/course/view.php?id=61 — portail d'accès public ayant permis de localiser la source officielle principale."));
children.push(bulletPar("Séquences modèles ETAP 7e AF, menfp.reseau-canope.fr/course/view.php?id=1636 — 6 thèmes réels consultés (titres uniquement), utilisés comme éclairage contextuel, non comme fondement pédagogique du contenu rédigé."));
children.push(spacer(200));

children.push(pageBreak());
children.push(subHeading("Tableau de traçabilité MENFP par chapitre"));
children.push(threeColTable(
  ["Chapitre", "Champ ETAP", "Pages du document source réellement vérifiées et citées"],
  [
    ["1", "Nouvelles technologies du numérique", "p.24-25, p.30, p.39, p.46-47"],
    ["2", "Métiers de la mer générateurs de revenus", "p.40-41"],
    ["3", "Métiers du recyclage et des énergies renouvelables (contenu 7e AF)", "p.42-43"],
    ["4", "Métiers de l'agriculture générateurs de revenus", "p.43-44"],
    ["5", "Entrepreneuriat", "p.45-46"],
    ["6", "Projet de synthèse (transversal, choix éditorial)", "p.30 (démarche de projet, trame pédagogique) ; réinvestissement des pages ci-dessus"],
  ],
  [1200, 4200, 4200],
));
children.push(spacer(200));

children.push(subHeading("Note sur les sources non retenues"));
children.push(bodyPar(
  "Conformément à la règle de traçabilité appliquée depuis la Phase 0, les sources suivantes ont été " +
  "recherchées mais n'ont pas pu être vérifiées et ne sont donc citées nulle part dans le manuel comme " +
  "référence officielle : le cours ETAP verrouillé (accès par identifiants) et les séquences modèles 8e AF de " +
  "la même plateforme (accès par identifiants), un éventuel « guide MENFP d'appui aux stratégies " +
  "d'enseignement et d'évaluation des nouvelles matières » (introuvable publiquement à ce jour), ainsi que " +
  "l'ancien hébergeur projet-nectar.canoprof.fr (plateforme fermée depuis le 2026-08-01). Ces éléments restent " +
  "documentés, à titre interne, dans " +
  "00_REFERENCES/SOURCES_VERIFIEES_PHASE0.md et 08_REFERENCES_FINALES/PLAN_REFERENCES_ETAP_7AF.md.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Avertissement"));
children.push(bodyPar(
  "Ce manuel constitue une adaptation pédagogique du programme officiel ETAP 7e AF du MENFP. Il n'est ni " +
  "publié, ni homologué, ni approuvé par le MENFP. Les adaptations pédagogiques, les exemples contextualisés, " +
  "les activités et les exercices sont des choix éditoriaux de ce manuel, clairement distincts des éléments " +
  "directement issus du programme officiel — cette distinction est documentée en détail dans les fichiers de " +
  "traçabilité du projet.",
));

await buildAndSave(children, 103, "Manuel_ETAP_7AF_References.docx");
