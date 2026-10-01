// Shared building blocks for generating "Manuel d'EPS 7e AF" chapter .docx files.
// Ported from the session scratchpad into the repo so the manual-generation
// toolchain persists across sessions (see AGENTS.md / project memory).
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  Header, Footer, PageNumber, LevelFormat,
  VerticalAlign, PageBreak, ImageRun,
} from "docx";
import fs from "node:fs";
import path from "node:path";

// ---------- Palette ----------
export const NAVY = "1F4E5F";
export const TEAL = "1B7A6E";
export const GOLD = "C9822A";
export const BOX_RETENIR_FILL = "DCEEF3";
export const BOX_RETENIR_LINE = "1F4E5F";
export const BOX_SAVAIS_FILL = "FCF3D9";
export const BOX_SAVAIS_LINE = "C9822A";
export const BOX_SECURITE_FILL = "FBE1DD";
export const BOX_SECURITE_LINE = "B23A2E";
export const BOX_OBSERVE_FILL = "E4F1E0";
export const BOX_OBSERVE_LINE = "3E7A3E";
export const BOX_FAIRPLAY_FILL = "EDE3F5";
export const BOX_FAIRPLAY_LINE = "6B3FA0";
export const BOX_FAIRPLAY_TITLE = "4B2A73";
export const BOX_COOPERATION_FILL = "DCEFEC";
export const BOX_COOPERATION_LINE = "1B7A6E";
export const BOX_COOPERATION_TITLE = "145048";
export const BOX_SANTE_FILL = "FDEAD9";
export const BOX_SANTE_LINE = "C2701A";
export const BOX_SANTE_TITLE = "8A4A0F";
export const BOX_CITOYEN_FILL = "EDE9D8";
export const BOX_CITOYEN_LINE = "7A6A2E";
export const BOX_CITOYEN_TITLE = "544A1E";
export const TABLE_HEAD_FILL = "1F4E5F";
export const TABLE_ALT_FILL = "F2F2F2";
export const GREY_TEXT = "555555";
export const FONT = "Calibri";

export { AlignmentType, Paragraph, TextRun };

export function bodyPar(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 276 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24, italics: opts.italics || false, bold: opts.bold || false })],
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
      new TextRun({ text: numbering ? `${numbering}  ` : "", font: FONT, size: 26, bold: true, color: GOLD }),
      new TextRun({ text, font: FONT, size: 26, bold: true, color: TEAL }),
    ],
  });
}

export function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: FONT, size: 24, bold: true, color: NAVY })],
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

// Placeholder brief box — used until an illustration has been generated and validated.
export function illustrationBox(numLabel, title, description, legend, fonction) {
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
                children: [new TextRun({ text: `${numLabel} — ${title}`, font: FONT, size: 22, bold: true, color: NAVY })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
                children: [new TextRun({ text: "[Emplacement de l’illustration — à réaliser par l’illustrateur]", font: FONT, size: 20, italics: true, color: GREY_TEXT })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 60 },
                children: [new TextRun({ text: "Brief pour l’illustrateur : ", font: FONT, size: 20, bold: true, color: "333333" }), new TextRun({ text: description, font: FONT, size: 20, color: "333333" })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 60 },
                children: [new TextRun({ text: "Fonction pédagogique : ", font: FONT, size: 20, bold: true, color: "333333" }), new TextRun({ text: fonction, font: FONT, size: 20, color: "333333" })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: `Légende : ${legend}`, font: FONT, size: 20, italics: true, color: GREY_TEXT })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function readPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  // PNG signature (8 bytes) + IHDR chunk: length(4) type(4) width(4) height(4) ...
  if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error(`Fichier non reconnu comme PNG valide : ${filePath}`);
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

// Real generated illustration — embeds the PNG at `imagePath`, scaled to fit
// the page width, followed by the same caption/legend style as the manual's
// other illustrations.
export function illustrationImage(numLabel, title, imagePath, legend, fonction, opts = {}) {
  const { width: pxW, height: pxH } = readPngDimensions(imagePath);
  const maxWidthIn = opts.maxWidthIn || 5.7; // fits within 8.5in page, 1.3in margins each side
  const maxHeightIn = opts.maxHeightIn || 5.5;
  let widthIn = maxWidthIn;
  let heightIn = (pxH / pxW) * widthIn;
  if (heightIn > maxHeightIn) {
    heightIn = maxHeightIn;
    widthIn = (pxW / pxH) * heightIn;
  }
  const DPI = 96;
  const imageBuffer = fs.readFileSync(imagePath);

  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60 },
      children: [
        new ImageRun({
          type: "png",
          data: imageBuffer,
          transformation: { width: Math.round(widthIn * DPI), height: Math.round(heightIn * DPI) },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: `${numLabel} — ${title}`, font: FONT, size: 20, bold: true, color: NAVY })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [new TextRun({ text: `Légende : ${legend}`, font: FONT, size: 20, italics: true, color: GREY_TEXT })],
    }),
  ];
}

// Picks the real embedded image if the manifest marks it "validated" and the
// file exists on disk; otherwise falls back to the placeholder brief box.
// `manifestEntry` is the object returned by manifest.getEntry(...), or null.
export function resolveIllustration(manifestEntry, numLabel, title, description, legend, fonction, projectRoot) {
  if (manifestEntry && manifestEntry.statut === "validated" && manifestEntry.cheminFichier) {
    const absPath = path.join(projectRoot, manifestEntry.cheminFichier);
    if (fs.existsSync(absPath)) {
      return illustrationImage(numLabel, title, absPath, manifestEntry.legende || legend, fonction);
    }
  }
  return [illustrationBox(numLabel, title, description, legend, fonction)];
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
      border: { bottom: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 6 } },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Manuel d’EPS 7ème AF", font: FONT, size: 18, bold: true, color: NAVY })],
    }),
  ],
});

export const footer = new Footer({
  children: [
    new Paragraph({
      border: { top: { color: "CCCCCC", space: 4, style: BorderStyle.SINGLE, size: 4 } },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Préparé par My-ken Dieujuste, Agronome, professeur d’EPS, d’ETAP et d’EEA", font: FONT, size: 16, color: GREY_TEXT }),
        new TextRun({ text: "   |   Page ", font: FONT, size: 16, color: GREY_TEXT }),
        new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY_TEXT }),
      ],
    }),
  ],
});

export function chapterTitleBlock(num, title) {
  return [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 40 },
      children: [new TextRun({ text: `CHAPITRE ${num}`, font: FONT, size: 22, bold: true, color: GOLD })],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 240 },
      children: [new TextRun({ text: title, font: FONT, size: 32, bold: true, color: NAVY })],
    }),
  ];
}

export function exercicesHeading(num) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { after: 200 },
    children: [new TextRun({ text: `Exercices du chapitre ${num}`, font: FONT, size: 28, bold: true, color: NAVY })],
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

  const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\cciga app", outFileName);
  return Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outPath, buf);
    console.log("OK ->", outPath, buf.length, "bytes");
    return outPath;
  });
}
