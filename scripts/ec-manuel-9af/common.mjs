// Shared building blocks for "Manuel d'EC 9e AF" — third and final book of
// the Éducation à la Citoyenneté collection. Copied from
// scripts/ec-manuel-8af/common.mjs (same palette/encadres, cf.
// LIVRES_EC/00_PHASE0/23_CHARTE_EC_VERROUILLEE.md — one charte for the
// whole EC collection) with only the header text, chapter-opening level
// badge, and output directory changed. Nothing here touches EPS, ETAP,
// EEA, CCIGA App, SchoolHub, or the EC 7e/8e AF scripts/files.
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  Header, Footer, PageNumber, LevelFormat,
  VerticalAlign, PageBreak, ImageRun,
} from "docx";
import fs from "node:fs";
import path from "node:path";

// ---------- Palette EC (bleu civique / rouge engagement / or citoyen / vert communautaire) ----------
export const BLEU_CIVIQUE = "1B3A6B";
export const ROUGE_ENGAGEMENT = "A6192E";
export const OR_CITOYEN = "C9A227";
export const VERT_COMMUNAUTAIRE = "4C7A57";
export const PAPIER = "F8F6F1";
export const ANTHRACITE = "33312E";
export const NAVY = BLEU_CIVIQUE;
export const GOLD = OR_CITOYEN;
export const GREEN = VERT_COMMUNAUTAIRE;
export const RED = ROUGE_ENGAGEMENT;

// ---------- 10 familles d'encadrés EC (verrouillées) ----------
export const BOX_SITUATION_FILL = "F5EAC7";
export const BOX_SITUATION_LINE = OR_CITOYEN;
export const BOX_DECOUVRIR_FILL = "DCE3EF";
export const BOX_DECOUVRIR_LINE = BLEU_CIVIQUE;
export const BOX_TEXTEREF_FILL = "EDEBE7";
export const BOX_TEXTEREF_LINE = ANTHRACITE;
export const BOX_ETUDECAS_FILL = "F1DCDF";
export const BOX_ETUDECAS_LINE = ROUGE_ENGAGEMENT;
export const BOX_DEBAT_FILL = "E0EAE3";
export const BOX_DEBAT_LINE = VERT_COMMUNAUTAIRE;
export const BOX_ACTIVITECIT_FILL = "DCE3EF";
export const BOX_ACTIVITECIT_LINE = BLEU_CIVIQUE;
export const BOX_PROJET_FILL = "F5EAC7";
export const BOX_PROJET_LINE = OR_CITOYEN;
export const BOX_RETENIR_FILL = "DCE3EF";
export const BOX_RETENIR_LINE = BLEU_CIVIQUE;
export const BOX_AUTOEVAL_FILL = "E0EAE3";
export const BOX_AUTOEVAL_LINE = VERT_COMMUNAUTAIRE;
export const BOX_AUTOEVAL_TITLE = "2E4A38";
export const BOX_PREPEVAL_FILL = "EDEBE7";
export const BOX_PREPEVAL_LINE = ANTHRACITE;
export const BOX_PREPEVAL_TITLE = ANTHRACITE;

export const TABLE_HEAD_FILL = BLEU_CIVIQUE;
export const TABLE_ALT_FILL = "F2EFEA";
export const GREY_TEXT = "6B655F";
export const FONT = "Calibri";

export { AlignmentType, Paragraph, TextRun };

export function bodyPar(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 276 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24, italics: opts.italics || false, bold: opts.bold || false, color: opts.color })],
  });
}

export function runsFromParts(parts) {
  return parts.map(p => new TextRun({
    text: p.text, font: FONT, size: 24, bold: !!p.bold, italics: !!p.italics, color: p.color,
  }));
}

export function mixedPar(parts, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 276 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
    children: runsFromParts(parts),
  });
}

export function sectionHeading(text, numbering) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 160 },
    children: [
      new TextRun({ text: numbering ? `${numbering}  ` : "", font: FONT, size: 26, bold: true, color: OR_CITOYEN }),
      new TextRun({ text, font: FONT, size: 26, bold: true, color: BLEU_CIVIQUE }),
    ],
  });
}

export function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: FONT, size: 24, bold: true, color: BLEU_CIVIQUE })],
  });
}

export function bulletPar(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 90 },
    children: [new TextRun({ text, font: FONT, size: 24, bold: opts.bold || false })],
  });
}

export function bulletMixed(parts) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 90 },
    children: runsFromParts(parts),
  });
}

export function numberedPar(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

export function calloutBox(title, bodyLines, fill, lineColor, titleColor) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: lineColor },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: lineColor },
      left: { style: BorderStyle.SINGLE, size: 8, color: lineColor },
      right: { style: BorderStyle.SINGLE, size: 8, color: lineColor },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: fill },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: fill },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, color: "auto", fill },
            margins: { top: 140, bottom: 140, left: 180, right: 180 },
            children: [
              new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: title, font: FONT, size: 24, bold: true, color: titleColor })],
              }),
              ...bodyLines.map(t => new Paragraph({
                spacing: { after: 40 },
                children: [new TextRun({ text: t, font: FONT, size: 22, color: "2A2622" })],
              })),
            ],
          }),
        ],
      }),
    ],
  });
}

export function spacer(h = 160) {
  return new Paragraph({ spacing: { after: h }, children: [] });
}

// Placeholder brief box — used until an illustration/document has been
// generated and validated. Includes ID, title, description, legend,
// pedagogical goal, and orientation/format. Deliberately NOT a generated
// image or a reproduced document at this phase.
export function illustrationBox(id, title, description, legend, fonction, orientation) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.DASHED, size: 6, color: "8A8478" },
      bottom: { style: BorderStyle.DASHED, size: 6, color: "8A8478" },
      left: { style: BorderStyle.DASHED, size: 6, color: "8A8478" },
      right: { style: BorderStyle.DASHED, size: 6, color: "8A8478" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: "FBFAF7" },
            margins: { top: 200, bottom: 200, left: 220, right: 220 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [new TextRun({ text: `${id} — ${title}`, font: FONT, size: 22, bold: true, color: BLEU_CIVIQUE })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
                children: [new TextRun({ text: "[Emplacement reserve — a fournir / a generer ulterieurement]", font: FONT, size: 20, italics: true, color: GREY_TEXT })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 60 },
                children: [new TextRun({ text: "Description : ", font: FONT, size: 20, bold: true, color: "333333" }), new TextRun({ text: description, font: FONT, size: 20, color: "333333" })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 60 },
                children: [new TextRun({ text: "Objectif pedagogique : ", font: FONT, size: 20, bold: true, color: "333333" }), new TextRun({ text: fonction, font: FONT, size: 20, color: "333333" })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 60 },
                children: [new TextRun({ text: "Orientation / format : ", font: FONT, size: 20, bold: true, color: "333333" }), new TextRun({ text: orientation, font: FONT, size: 20, color: "333333" })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: `Legende : ${legend}`, font: FONT, size: 20, italics: true, color: GREY_TEXT })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function twoColTable(headA, headB, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [4500, 4500],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [headA, headB].map(h => new TableCell({
          width: { size: 4500, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color: "auto", fill: TABLE_HEAD_FILL },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: h, font: FONT, size: 22, bold: true, color: "FFFFFF" })] })],
        })),
      }),
      ...rows.map((r, i) => new TableRow({
        children: r.map(cellText => new TableCell({
          width: { size: 4500, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color: "auto", fill: i % 2 === 0 ? "FFFFFF" : TABLE_ALT_FILL },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: cellText, font: FONT, size: 22 })] })],
        })),
      })),
    ],
  });
}

export function threeColTable(heads, rows, widths) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: widths,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: heads.map((h, i) => new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color: "auto", fill: TABLE_HEAD_FILL },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: h, font: FONT, size: 22, bold: true, color: "FFFFFF" })] })],
        })),
      }),
      ...rows.map((r, i) => new TableRow({
        children: r.map((cellText, ci) => new TableCell({
          width: { size: widths[ci], type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, color: "auto", fill: i % 2 === 0 ? "FFFFFF" : TABLE_ALT_FILL },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: cellText, font: FONT, size: 22 })] })],
        })),
      })),
    ],
  });
}

export const header = new Header({
  children: [
    new Paragraph({
      border: { bottom: { color: BLEU_CIVIQUE, space: 4, style: BorderStyle.SINGLE, size: 6 } },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Manuel d'EC 9ème AF — Éducation à la Citoyenneté", font: FONT, size: 18, bold: true, color: BLEU_CIVIQUE })],
    }),
  ],
});

export const footer = new Footer({
  children: [
    new Paragraph({
      border: { top: { color: "CCCCCC", space: 4, style: BorderStyle.SINGLE, size: 4 } },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Préparé par My-ken Dieujuste, Agronome, professeur d'EPS, d'ETAP et d'EEA", font: FONT, size: 16, color: GREY_TEXT }),
        new TextRun({ text: "   |   Page ", font: FONT, size: 16, color: GREY_TEXT }),
        new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY_TEXT }),
      ],
    }),
  ],
});

export function chapterOpening(num, title, accroche, objectifs) {
  const blocks = [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 20 },
      children: [
        new TextRun({ text: "CHAPITRE", font: FONT, size: 22, bold: true, color: OR_CITOYEN }),
        new TextRun({ text: "   ·   9e ANNÉE FONDAMENTALE", font: FONT, size: 18, bold: true, color: ANTHRACITE }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 160 },
      children: [new TextRun({ text: String(num), font: FONT, size: 72, bold: true, color: BLEU_CIVIQUE })],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
      children: [new TextRun({ text: title, font: FONT, size: 32, bold: true, color: BLEU_CIVIQUE })],
    }),
  ];
  if (accroche) {
    blocks.push(new Paragraph({
      spacing: { after: 240, line: 300 },
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: accroche, font: FONT, size: 26, italics: true, color: VERT_COMMUNAUTAIRE })],
    }));
  }
  if (objectifs && objectifs.length) {
    blocks.push(calloutBox(
      "Dans ce chapitre, tu vas apprendre à…",
      objectifs,
      BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
    ));
    blocks.push(spacer(200));
  }
  return blocks;
}

export function exercicesHeading(num) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { after: 200 },
    children: [new TextRun({ text: `Exercices du chapitre ${num}`, font: FONT, size: 28, bold: true, color: BLEU_CIVIQUE })],
  });
}

export function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

export function buildAndSave(children, pageStart, outFileName, outDirOverride) {
  const doc = new Document({
    numbering: {
      config: [
        { reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 260 } } } }] },
      ],
    },
    styles: {
      default: {
        document: { run: { font: FONT, size: 24 } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1350, bottom: 1250, left: 1300, right: 1300, header: 600, footer: 600 },
            pageNumbers: { start: pageStart },
          },
        },
        headers: { default: header },
        footers: { default: footer },
        children,
      },
    ],
  });

  const outDir = outDirOverride || "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\02_CHAPITRES";
  const outPath = path.join(outDir, outFileName);
  return Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outPath, buf);
    console.log("OK ->", outPath, buf.length, "bytes");
    return outPath;
  });
}
