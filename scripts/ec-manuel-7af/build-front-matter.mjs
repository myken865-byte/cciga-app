// Manuel d'EC 7e AF — Phase Finale : Pages liminaires (pagination romaine).
//
// Page de titre, avant-propos bref, table des matières manuelle dont les
// numéros de page sont calculés à partir de la pagination réelle mesurée
// via Word COM après assemblage de chaque section (méthode déjà établie
// pour EPS/ETAP/EEA dans ce projet : nombres vérifiés, pas un champ TOC
// natif de Word, pour garantir l'exactitude après l'assemblage OOXML).
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Header, Footer, PageNumber, NumberFormat, BorderStyle,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import {
  bodyPar, sectionHeading, subHeading, spacer, pageBreak,
  header, footer, FONT, BLEU_CIVIQUE, OR_CITOYEN, ANTHRACITE, GREY_TEXT,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Page de titre
// ---------------------------------------------------------------------
children.push(new Paragraph({ spacing: { after: 800 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "MANUEL D'ÉDUCATION À LA CITOYENNETÉ", bold: true, color: BLEU_CIVIQUE, size: 44 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "7e ANNÉE FONDAMENTALE", bold: true, color: OR_CITOYEN, size: 32 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 800 },
  children: [new TextRun({ text: "Conforme au programme du 3e cycle — MENFP/DEF, version définitive du 28 juillet 2024", italics: true, color: ANTHRACITE, size: 22 })],
}));
children.push(new Paragraph({ spacing: { after: 1600 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 80 },
  children: [new TextRun({ text: "Préparé par My-ken Dieujuste", bold: true, color: ANTHRACITE, size: 24 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Agronome, professeur d'EPS, d'ETAP et d'EEA", color: GREY_TEXT, size: 22 })],
}));

children.push(pageBreak());

// ---------------------------------------------------------------------
// Avant-propos
// ---------------------------------------------------------------------
children.push(sectionHeading("Avant-propos", ""));
children.push(bodyPar(
  "Ce manuel accompagne les élèves de 7e Année Fondamentale dans la découverte de l'Éducation à la " +
  "Citoyenneté, conformément au programme du 3e cycle du Ministère de l'Éducation Nationale et de la " +
  "Formation Professionnelle (MENFP/DEF), version définitive du 28 juillet 2024.",
));
children.push(bodyPar(
  "Organisé en 7 chapitres correspondant chacun à une unité d'apprentissage officielle, il propose des " +
  "situations concrètes ancrées dans la réalité haïtienne, une progression pédagogique active (observer, " +
  "comprendre, analyser, confronter des points de vue, argumenter, décider, agir, évaluer), et des activités " +
  "citoyennes originales.",
));
children.push(bodyPar(
  "Les illustrations et certains documents de référence restent, à ce stade, des emplacements réservés — " +
  "marqués « à fournir / à générer » — en attente d'une production graphique et d'une vérification " +
  "documentaire ultérieures.",
));
children.push(spacer(200));

children.push(pageBreak());

// ---------------------------------------------------------------------
// Table des matières
// ---------------------------------------------------------------------
children.push(sectionHeading("Table des matières", ""));
children.push(spacer(120));

function tocRow(label, pageLabel, bold = false) {
  children.push(new Paragraph({
    spacing: { after: 100 },
    tabStops: [{ type: "right", position: 9350, leader: "dot" }],
    children: [
      new TextRun({ text: label, bold, color: bold ? BLEU_CIVIQUE : "000000", size: 24 }),
      new TextRun({ text: `\t${pageLabel}`, bold, size: 24 }),
    ],
  }));
}

tocRow("Chapitre 1 — Moi, Haïtien : nation et identité", "1");
tocRow("Chapitre 2 — Citoyenne, citoyen : mes droits, mes devoirs", "12");
tocRow("Chapitre 3 — Vivre dans un État démocratique", "22");
tocRow("Chapitre 4 — Toi comme moi : le principe d'égalité", "31");
tocRow("Chapitre 5 — Résoudre les conflits, vivre ensemble", "40");
tocRow("Chapitre 6 — Paix, protection et sécurité au quotidien", "49");
tocRow("Chapitre 7 — Protéger notre environnement", "58");
children.push(spacer(160));
tocRow("Corrigés des exercices", "67", true);
tocRow("Préparation à l'évaluation finale", "75", true);
tocRow("Annexes et documents", "79", true);
tocRow("Glossaire", "82", true);
tocRow("Références et sources", "85", true);

children.push(spacer(240));
children.push(bodyPar(
  "Note : la pagination ci-dessus a été vérifiée directement sur le document maître assemblé (mesure Word), " +
  "et non générée par un champ de table des matières automatique de Word — méthode retenue pour garantir " +
  "l'exactitude après l'assemblage technique des 7 chapitres et des sections finales.",
  { italics: true, color: undefined },
));

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

const outDir = "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\09_ASSEMBLAGE";
const outPath = path.join(outDir, "Manuel_EC_7AF_PagesPreliminaires.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log("OK ->", outPath, buf.length, "bytes");
