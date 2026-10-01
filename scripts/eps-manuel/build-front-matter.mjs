// Manuel d'EPS 7e AF — Pages préliminaires (couverture, avant-propos,
// table des matières). Pagination en chiffres romains, indépendante de la
// pagination arabe des chapitres qui commence à 1. Style repris à
// l'identique de Manuel_EPS_8AF_PagesPreliminaires.docx (déjà validé).
//
// PAGINATION PROVISOIRE : Word (COM) est resté indisponible pendant toute
// la rédaction de cette Phase Finale ; les numéros de page arabes
// listés ci-dessous pour les 10 chapitres proviennent des valeurs
// pgNumType déjà présentes dans les fichiers sources (probablement
// vérifiées lors de leur création). Les numéros du corrigé, du glossaire
// et des références sont en revanche des ESTIMATIONS (ratio mots/page
// observé sur les chapitres 1-10) et devront être vérifiés dès que Word
// sera de nouveau disponible.
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Header, Footer, PageNumber, NumberFormat, BorderStyle,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import { NAVY, TEAL, GOLD, FONT, GREY_TEXT, header, footer } from "./common.mjs";

const children = [];

children.push(new Paragraph({ spacing: { before: 1400, after: 0 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "MANUEL D'ÉDUCATION PHYSIQUE ET SPORTIVE", bold: true, size: 40, color: NAVY, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "7e Année Fondamentale", bold: true, size: 32, color: GOLD, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 800 },
  children: [new TextRun({ text: "Année scolaire 2026-2027", italics: true, size: 26, color: TEAL, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 60 },
  children: [new TextRun({ text: "My-ken Dieujuste", bold: true, size: 24, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: "Agronome, professeur d'EPS, d'ETAP et d'EEA", size: 22, color: GREY_TEXT, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: "Version PRÉ-FINALE — avant génération des illustrations définitives", bold: true, size: 22, color: "B23A2E", font: FONT })],
}));
children.push(new Paragraph({ children: [], pageBreakBefore: true }));

// ---------------------------------------------------------------------
// Avant-propos
// ---------------------------------------------------------------------
children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Avant-propos", bold: true, size: 32, color: NAVY, font: FONT })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel accompagne les élèves de 7e Année Fondamentale tout au long d'une année complète " +
      "d'Éducation Physique et Sportive. Premier volume de la collection, il propose dix chapitres construits " +
      "autour d'une même exigence : aider chaque élève à comprendre ce qu'est l'EPS, à découvrir son corps et " +
      "son mouvement, à s'initier progressivement au basket-ball, à l'athlétisme, au football, au volley-ball " +
      "et à la gymnastique, et à adopter des habitudes de sécurité, d'hygiène et de responsabilité qui lui " +
      "seront utiles bien au-delà de cette année scolaire.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Chaque chapitre propose un contenu structuré : situation de départ, objectifs d'apprentissage, " +
      "vocabulaire essentiel, activités pratiques progressives, encadrés thématiques (sécurité, fair-play, " +
      "coopération, santé), autoévaluation, résumé et exercices. Une attention constante est portée à la " +
      "sécurité, au respect du corps de chaque élève, à la non-comparaison entre élèves, et à l'adaptation au " +
      "contexte scolaire haïtien.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel a été élaboré à partir de principes pédagogiques généraux de l'Éducation Physique et " +
      "Sportive, adaptés au contexte scolaire haïtien. Les ressources curriculaires institutionnelles du " +
      "Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP) ont été consultées à " +
      "titre de contexte, via la plateforme NectarEduProfHaïti (voir la section Références en fin d'ouvrage). " +
      "Ce manuel n'est toutefois ni approuvé, ni homologué, ni certifié par le MENFP : il s'agit d'un ouvrage " +
      "élaboré de façon autonome, en cohérence avec des orientations et ressources curriculaires MENFP " +
      "consultées, et non d'un manuel officiel.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Il s'agit, à ce stade, d'une version pré-finale : les illustrations prévues restent réservées " +
      "(encadrés-briefs détaillés dans chaque chapitre) mais pas encore générées, et la pagination indiquée " +
      "dans la table des matières ci-dessous, pour le corrigé général, le glossaire et les références, reste " +
      "une estimation à confirmer (voir note de traçabilité dans le rapport de Phase Finale).",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({ children: [], pageBreakBefore: true }));

// ---------------------------------------------------------------------
// Table des matières
// ---------------------------------------------------------------------
children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 260 },
  children: [new TextRun({ text: "Table des matières", bold: true, size: 32, color: NAVY, font: FONT })],
}));

function tocRow(label, page) {
  children.push(new Paragraph({
    spacing: { after: 140 },
    tabStops: [{ type: "right", position: 9350, leader: "dot" }],
    children: [
      new TextRun({ text: label, size: 24, font: FONT }),
      new TextRun({ text: `\t${page}`, size: 24, font: FONT }),
    ],
  }));
}

tocRow("Chapitre 1 — Comprendre l'éducation physique et sportive", "1");
tocRow("Chapitre 2 — Le corps humain et le mouvement", "9");
tocRow("Chapitre 3 — Santé, hygiène, hydratation et récupération", "19");
tocRow("Chapitre 4 — Échauffement, sécurité et prévention", "28");
tocRow("Chapitre 5 — Initiation au basket-ball : techniques, règles et coopération", "40");
tocRow("Chapitre 6 — Athlétisme : courir, sauter et lancer", "52");
tocRow("Chapitre 7 — Football scolaire : technique, règles et coopération", "63");
tocRow("Chapitre 8 — Volley-ball : techniques de base, règles et coopération", "75");
tocRow("Chapitre 9 — Gymnastique : équilibre, coordination et maîtrise du corps", "87");
tocRow("Chapitre 10 — Hygiène de vie, santé, récupération et pratique physique responsable", "98");
tocRow("Corrigé général des exercices", "111");
tocRow("Glossaire", "121");
tocRow("Références", "124");

children.push(new Paragraph({
  spacing: { before: 240 },
  children: [new TextRun({
    text: "Les numéros de page des Chapitres 1 à 10 correspondent aux valeurs déjà fixées dans les fichiers " +
      "sources de chaque chapitre. Les numéros du Corrigé général, du Glossaire et des Références sont des " +
      "estimations (voir avertissement ci-dessus) — Word (COM) n'était pas disponible pour une vérification " +
      "directe au moment de la rédaction.",
    italics: true, size: 20, color: GREY_TEXT, font: FONT,
  })],
}));

const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EPS\\EPS_7e_AF\\08_PAGES_PRELIMINAIRES", "Manuel_EPS_7AF_PagesPreliminaires.docx");

const doc = new Document({
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

const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log("OK ->", outPath, buf.length, "bytes");
