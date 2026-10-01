// Pages preliminaires (couverture, credits, avant-propos, note d'utilisation,
// table des matieres) — Manuel d'EPS 9e AF. Contenu nouveau, jamais valide
// par l'utilisateur au chapitre pres comme le reste du manuel : a presenter
// explicitement comme redige lors de l'assemblage final et soumis a
// validation, exactement comme pour le manuel 8e AF.
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Header, Footer, PageNumber, LevelFormat, NumberFormat, BorderStyle,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import {
  bodyPar, sectionHeading, subHeading, spacer, pageBreak, FONT, NAVY, GOLD, TEAL, GREY_TEXT, header, footer,
} from "./common.mjs";

const children = [];

// ---- Page de couverture ----
children.push(new Paragraph({ spacing: { before: 2200 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 160 },
  children: [new TextRun({ text: "MANUEL D’ÉDUCATION PHYSIQUE ET SPORTIVE", font: FONT, size: 40, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "9e Année Fondamentale", font: FONT, size: 34, bold: true, color: TEAL })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 800 },
  children: [new TextRun({ text: "Année scolaire 2026-2027", font: FONT, size: 26, italics: true, color: GREY_TEXT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 1400, after: 60 },
  children: [new TextRun({ text: "My-ken Dieujuste", font: FONT, size: 26, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 40 },
  children: [new TextRun({ text: "Agronome, professeur d’EPS, d’ETAP et d’EEA", font: FONT, size: 22, color: GREY_TEXT })],
}));
children.push(pageBreak());

// ---- Credits ----
children.push(sectionHeading("Crédits", ""));
children.push(bodyPar(
  "Manuel conçu, rédigé et assemblé par My-ken Dieujuste, Agronome, professeur d’EPS, d’ETAP et d’EEA, dans le cadre de la collection de manuels d’Éducation Physique et Sportive couvrant la 7e, la 8e et la 9e Année Fondamentale."
));
children.push(bodyPar(
  "Ce manuel a été élaboré à partir de principes pédagogiques généraux de l’Éducation Physique et Sportive et de faits historiques et réglementaires sportifs vérifiés (voir la section Références en fin d’ouvrage), adaptés au contexte scolaire haïtien. Il n’est ni approuvé, ni homologué, ni certifié par le MENFP : il s’agit d’un ouvrage élaboré de façon autonome, en cohérence avec des orientations et ressources curriculaires MENFP consultées, et non d’un manuel officiel.",
  { italics: true }
));
children.push(spacer(200));
children.push(pageBreak());

// ---- Avant-propos ----
children.push(sectionHeading("Avant-propos", ""));
children.push(bodyPar(
  "Ce manuel accompagne les élèves de 9e Année Fondamentale tout au long d’une année complète d’Éducation Physique et Sportive. Il prolonge les apprentissages engagés en 7e et en 8e AF, et propose douze chapitres construits autour d’une même exigence : amener l’élève à observer, comprendre, décider, agir, analyser et ajuster — dans le mouvement, dans le jeu, et dans sa relation aux autres."
));
children.push(bodyPar(
  "Chaque chapitre propose un contenu structuré, adapté au niveau réel de la 9e AF : objectifs, activation des acquis, contenu développé en sous-sections, illustrations pédagogiques, encadrés thématiques (dont plusieurs méthodes stables réutilisées d’un chapitre à l’autre), activités pratiques et d’analyse, autoévaluation, résumé, préparation à l’évaluation et quatre catégories d’exercices. Trois chapitres retracent l’histoire du football, du basketball et du volleyball à partir de faits vérifiés, sans jamais inventer une date, un nom ou un événement incertain."
));
children.push(bodyPar(
  "Ce manuel a été rédigé chapitre par chapitre, chacun étant relu et validé avant que le suivant ne soit entrepris. Les pages préliminaires (couverture, crédits, présent avant-propos, note d’utilisation et table des matières), le Corrigé général, le Glossaire, les Références et les Annexes constituent des ajouts réalisés lors de l’assemblage final de l’ouvrage : ils n’ont pas encore fait l’objet de la même relecture chapitre par chapitre et doivent être validés avant toute diffusion, au même titre que le reste du contenu."
));
children.push(spacer(200));
children.push(pageBreak());

// ---- Note d'utilisation pedagogique ----
children.push(sectionHeading("Note d’utilisation pédagogique", ""));
children.push(bodyPar(
  "Ce manuel s’adresse à la fois à l’élève et à l’enseignant. Chaque chapitre peut se lire dans l’ordre proposé, en s’appuyant sur les activités pratiques et les encadrés pour organiser une séance concrète. Les illustrations pédagogiques sont, à ce stade, des emplacements réservés (identifiants permanents conservés) en attente d’insertion définitive ; la pagination du manuel reste provisoire tant que ces illustrations ne sont pas insérées."
));
children.push(bodyPar(
  "Le Corrigé général, placé après les douze chapitres, ne doit être utilisé qu’après la réalisation des exercices par l’élève. Les questions de réflexion (exercices D) admettent plusieurs formulations correctes : le corrigé propose des éléments de réponse attendus, non une réponse unique à recopier. L’Évaluation blanche du Chapitre 12 est un outil de préparation original, clairement non officiel."
));
children.push(spacer(200));
children.push(pageBreak());

// ---- Table des matieres ----
children.push(sectionHeading("Table des matières", ""));

function tocLine(label, pageNum) {
  return new Paragraph({
    spacing: { after: 100 },
    tabStops: [{ type: "right", leader: "dot", position: 9350 }],
    children: [
      new TextRun({ text: label, font: FONT, size: 24 }),
      new TextRun({ text: `\t${pageNum}`, font: FONT, size: 24 }),
    ],
  });
}

const toc = [
  ["Chapitre 1 — L’EPS en 9e AF : autonomie, responsabilité, santé et compétences", 1],
  ["Chapitre 2 — Capacités physiques et motrices : analyser, gérer et améliorer sa performance", 14],
  ["Chapitre 3 — Football : histoire, évolution et patrimoine sportif haïtien", 27],
  ["Chapitre 4 — Football : règlements, fondamentaux techniques et organisation tactique", 41],
  ["Chapitre 5 — Basketball : histoire, évolution et culture sportive", 54],
  ["Chapitre 6 — Basketball : règlements, fondamentaux techniques et organisation tactique", 66],
  ["Chapitre 7 — Volleyball : histoire, évolution et culture sportive", 80],
  ["Chapitre 8 — Volleyball : règlements, fondamentaux techniques et organisation tactique", 94],
  ["Chapitre 9 — Habiletés motrices et qualités physiques appliquées aux sports collectifs", 108],
  ["Chapitre 10 — Arbitrage, règles, fair-play, coopération et responsabilité", 123],
  ["Chapitre 11 — Santé, préparation physique, gestion de l’effort et sécurité", 137],
  ["Chapitre 12 — Synthèse des compétences et préparation à l’évaluation EPS de 9e AF", 152],
  ["Corrigé général des exercices", 168],
  ["Glossaire général EPS 9e AF", 195],
  ["Références", 199],
  ["Annexes pédagogiques et dossier d’évaluation", 203],
];
toc.forEach(([label, num]) => children.push(tocLine(label, num)));
children.push(spacer(160));
children.push(bodyPar(
  "Les numéros de page ci-dessus correspondent à la pagination continue du corps de l’ouvrage, qui débute à la page 1 juste après ces pages préliminaires. Ils ont été vérifiés un par un par rapport aux fichiers sources de chaque section avant l’assemblage final. Cette pagination reste provisoire tant que les illustrations définitives ne sont pas insérées ; une repagination générale sera effectuée à ce moment-là.",
  { italics: true }
));

const doc = new Document({
  numbering: { config: [] },
  styles: { default: { document: { run: { font: FONT, size: 24 } } } },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1350, bottom: 1250, left: 1300, right: 1300, header: 600, footer: 600 },
          pageNumbers: { start: 1, formatType: NumberFormat.LOWER_ROMAN },
        },
      },
      headers: { default: header },
      footers: { default: footer },
      children,
    },
  ],
});

const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\cciga app", "Manuel_EPS_9AF_PagesPreliminaires.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log("Pages preliminaires (9e AF) genere:", outPath, buf.length, "bytes");
