// Shared building blocks for "Manuel d'ETAP 7e AF" — first book of the new
// ETAP collection. Independent module, modeled on scripts/eps-manuel-9af/common.mjs
// but with its own palette and its own set of encadre types (charte graphique
// ETAP, cf. LIVRES_ETAP/7e_AF/01_ARCHITECTURE). Nothing here touches the EPS
// manuals or their scripts.
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  Header, Footer, PageNumber, LevelFormat,
  VerticalAlign, PageBreak, ImageRun,
} from "docx";
import fs from "node:fs";
import path from "node:path";

// ---------- Palette ETAP (vert profond / orange-cuivre / creme / gris technique) ----------
export const VERT = "1E4D3B";
export const CUIVRE = "C96A2E";
export const CREME = "F6F1E7";
export const GRIS = "5B6470";
export const GOLD = CUIVRE;
export const NAVY = VERT;
export const TEAL = "2E6B54";

export const BOX_RETENIR_FILL = "EFEAD9";
export const BOX_RETENIR_LINE = VERT;
export const BOX_DECOUVRIR_FILL = "E3EEE7";
export const BOX_DECOUVRIR_LINE = VERT;
export const BOX_OBSERVER_FILL = "E9F1EC";
export const BOX_OBSERVER_LINE = "3E7A5C";
export const BOX_OUTIL_FILL = "E7E9EC";
export const BOX_OUTIL_LINE = GRIS;
export const BOX_TECHNIQUE_FILL = "E2E6EA";
export const BOX_TECHNIQUE_LINE = "465059";
export const BOX_METIER_FILL = "F5E7DA";
export const BOX_METIER_LINE = CUIVRE;
export const BOX_ENTREPRENDRE_FILL = "F6E4D2";
export const BOX_ENTREPRENDRE_LINE = "A85A24";
export const BOX_ENVIRONNEMENT_FILL = "E6F0E9";
export const BOX_ENVIRONNEMENT_LINE = "3E7A5C";
export const BOX_SECURITE_FILL = "F7DCCB";
export const BOX_SECURITE_LINE = "C1440E";
export const BOX_NUMERIQUE_FILL = "E5E9ED";
export const BOX_NUMERIQUE_LINE = "3D4B57";
export const BOX_AUTOEVAL_FILL = "EFEAD9";
export const BOX_AUTOEVAL_LINE = VERT;
export const BOX_AUTOEVAL_TITLE = "16332A";
export const BOX_PREPEVAL_FILL = "E7E9EC";
export const BOX_PREPEVAL_LINE = GRIS;
export const BOX_PREPEVAL_TITLE = "343B42";
export const TABLE_HEAD_FILL = VERT;
export const TABLE_ALT_FILL = "F2F2F2";
export const GREY_TEXT = "555555";
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
      new TextRun({ text: numbering ? `${numbering}  ` : "", font: FONT, size: 26, bold: true, color: CUIVRE }),
      new TextRun({ text, font: FONT, size: 26, bold: true, color: VERT }),
    ],
  });
}

export function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: FONT, size: 24, bold: true, color: VERT })],
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
                children: [new TextRun({ text: t, font: FONT, size: 22, color: "222222" })],
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

// Placeholder brief box — used until an illustration has been generated and
// validated. Includes ID, title, description, legend, pedagogical goal, and
// orientation/format. Deliberately NOT a generated image at this phase.
export function illustrationBox(id, title, description, legend, fonction, orientation) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.DASHED, size: 6, color: "888888" },
      bottom: { style: BorderStyle.DASHED, size: 6, color: "888888" },
      left: { style: BorderStyle.DASHED, size: 6, color: "888888" },
      right: { style: BorderStyle.DASHED, size: 6, color: "888888" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: "FAFAFA" },
            margins: { top: 200, bottom: 200, left: 220, right: 220 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [new TextRun({ text: `${id} — ${title}`, font: FONT, size: 22, bold: true, color: VERT })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
                children: [new TextRun({ text: "[Emplacement de l'illustration — reserve, a realiser ulterieurement]", font: FONT, size: 20, italics: true, color: GREY_TEXT })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 60 },
                children: [new TextRun({ text: "Description visuelle : ", font: FONT, size: 20, bold: true, color: "333333" }), new TextRun({ text: description, font: FONT, size: 20, color: "333333" })],
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
      border: { bottom: { color: VERT, space: 4, style: BorderStyle.SINGLE, size: 6 } },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Manuel d'ETAP 7ème AF — Tronc commun", font: FONT, size: 18, bold: true, color: VERT })],
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
      children: [new TextRun({ text: "CHAPITRE", font: FONT, size: 22, bold: true, color: CUIVRE })],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 160 },
      children: [new TextRun({ text: String(num), font: FONT, size: 72, bold: true, color: VERT })],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
      children: [new TextRun({ text: title, font: FONT, size: 32, bold: true, color: VERT })],
    }),
  ];
  if (accroche) {
    blocks.push(new Paragraph({
      spacing: { after: 240, line: 300 },
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: accroche, font: FONT, size: 26, italics: true, color: TEAL })],
    }));
  }
  if (objectifs && objectifs.length) {
    blocks.push(calloutBox(
      "Dans ce chapitre, tu vas apprendre à…",
      objectifs,
      BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
    ));
    blocks.push(spacer(200));
  }
  return blocks;
}

export function exercicesHeading(num) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { after: 200 },
    children: [new TextRun({ text: `Exercices du chapitre ${num}`, font: FONT, size: 28, bold: true, color: VERT })],
  });
}

export function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

export function qcmBlock(items) {
  const out = [];
  items.forEach(item => {
    out.push(bodyPar(item.q, { align: AlignmentType.LEFT }));
    item.opts.forEach(o => out.push(new Paragraph({ spacing: { after: 60 }, indent: { left: 360 }, children: [new TextRun({ text: o, font: FONT, size: 22 })] })));
    out.push(spacer(80));
  });
  return out;
}

export function buildAndSave(children, pageStart, outFileName) {
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

  const outDir = "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_ETAP\\ETAP_7e_AF\\02_CHAPITRES";
  const outPath = path.join(outDir, outFileName);
  return Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outPath, buf);
    console.log("OK ->", outPath, buf.length, "bytes");
    return outPath;
  });
}
