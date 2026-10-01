// Registre maître des illustrations — Manuel d'EC 7e AF.
//
// Ce script NE MODIFIE AUCUN fichier du manuel EC 7e AF : il importe
// uniquement les helpers de style (palette, gabarits) depuis
// scripts/ec-manuel-7af/common.mjs en LECTURE SEULE, pour produire un
// document séparé et nouveau. Aucune image n'est générée : ce document ne
// contient que du texte (fiches + prompts destinés à ChatGPT).
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Header, Footer, PageNumber, BorderStyle, Table, TableRow, TableCell,
  WidthType, ShadingType, VerticalAlign,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import {
  BLEU_CIVIQUE, OR_CITOYEN, VERT_COMMUNAUTAIRE, ANTHRACITE, GREY_TEXT,
  TABLE_HEAD_FILL, TABLE_ALT_FILL, FONT,
} from "../ec-manuel-7af/common.mjs";
import { ILLUSTRATIONS, CHAPTERS, assignEcIds } from "./data.mjs";

const items = assignEcIds();

function bodyPar(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 140, line: 270 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 22, italics: opts.italics || false, bold: opts.bold || false, color: opts.color })],
  });
}
function fieldLine(label, value) {
  return new Paragraph({
    spacing: { after: 90, line: 260 },
    children: [
      new TextRun({ text: `${label} : `, font: FONT, size: 22, bold: true, color: BLEU_CIVIQUE }),
      new TextRun({ text: value, font: FONT, size: 22, color: "222222" }),
    ],
  });
}
function pageBreak() { return new Paragraph({ children: [], pageBreakBefore: true }); }
function spacer(h = 140) { return new Paragraph({ spacing: { after: h }, children: [] }); }

const children = [];

// ---------------------------------------------------------------------
// Page de titre
// ---------------------------------------------------------------------
children.push(new Paragraph({ spacing: { after: 400 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "REGISTRE MAÎTRE DES ILLUSTRATIONS", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 300 },
  children: [new TextRun({ text: "Manuel d'Éducation à la Citoyenneté (EC) — 7e Année Fondamentale", bold: true, color: OR_CITOYEN, size: 28 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 600 },
  children: [new TextRun({ text: "Inventaire exhaustif et prompts de génération d'image autonomes, destinés à ChatGPT — aucune image générée par Claude", italics: true, color: ANTHRACITE, size: 20 })],
}));
children.push(bodyPar(
  "Document source analysé : LIVRES_EC/EC_7e_AF/09_ASSEMBLAGE/Manuel_EC_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx " +
  "(version assemblée et validée la plus récente du manuel EC 7e AF, 89 pages : 3 romaines + 86 arabes). Ce " +
  "registre est un document nouveau et séparé : le manuel n'a été ni modifié ni réécrasé pour le produire.",
));
children.push(bodyPar(
  "Périmètre : les 29 illustrations (`ILL-EC-7AF-*`) réellement prévues dans les 7 chapitres. Les 5 documents " +
  "textuels de référence (`DOC-EC-7AF-*`) sont HORS PÉRIMÈTRE : ce sont des textes à sourcer (extraits " +
  "constitutionnels, littéraires), pas des illustrations à générer par IA.",
  { italics: true },
));
children.push(pageBreak());

// ---------------------------------------------------------------------
// Index synthétique
// ---------------------------------------------------------------------
function tableHeadCell(text) {
  return new TableCell({
    shading: { type: ShadingType.CLEAR, color: "auto", fill: TABLE_HEAD_FILL },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 90, right: 90 },
    children: [new Paragraph({ children: [new TextRun({ text, font: FONT, size: 18, bold: true, color: "FFFFFF" })] })],
  });
}
function tableCell(text, alt) {
  return new TableCell({
    shading: { type: ShadingType.CLEAR, color: "auto", fill: alt ? TABLE_ALT_FILL : "FFFFFF" },
    margins: { top: 70, bottom: 70, left: 90, right: 90 },
    children: [new Paragraph({ children: [new TextRun({ text, font: FONT, size: 18 })] })],
  });
}

children.push(new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { after: 200 },
  children: [new TextRun({ text: "Index synthétique", bold: true, color: BLEU_CIVIQUE, size: 28 })],
}));

const widths = [1400, 700, 900, 1900, 1300, 1100];
const rows = [
  new TableRow({
    tableHeader: true,
    children: [
      tableHeadCell("ID"), tableHeadCell("Chap."), tableHeadCell("Page"),
      tableHeadCell("Type d'image"), tableHeadCell("Format"), tableHeadCell("Statut"),
    ],
  }),
  ...items.map((it, i) => new TableRow({
    children: [
      tableCell(it.ecId, i % 2 === 1),
      tableCell(String(it.chap), i % 2 === 1),
      tableCell(String(it.page), i % 2 === 1),
      tableCell(it.type, i % 2 === 1),
      tableCell(it.format.split(",")[0], i % 2 === 1),
      tableCell(it.statut.split(" ")[0] + (it.statut.includes("PRÊT") ? " PRÊT" : ""), i % 2 === 1),
    ],
  })),
];
children.push(new Table({
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
  rows,
}));
children.push(spacer(200));

const perChapter = CHAPTERS.map(c => ({ c, count: items.filter(it => it.chap === c.num).length }));
const promptPret = items.filter(it => it.statut.startsWith("PROMPT PRÊT")).length;
const aVerifier = items.length - promptPret;

children.push(bodyPar(`Nombre total d'illustrations : ${items.length}.`, { bold: true }));
children.push(bodyPar(perChapter.map(p => `Chapitre ${p.c.num} : ${p.count}`).join("  |  ")));
children.push(bodyPar(`PROMPT PRÊT : ${promptPret}  —  À VÉRIFIER (statut nuancé) : ${aVerifier}.`));
children.push(bodyPar(
  "Doublons potentiels détectés : AUCUN doublon exact. Deux FAMILLES de gabarits partagent un même format " +
  "visuel récurrent mais un contenu distinct à chaque occurrence (voir Audit) : les 7 « Synthèse » (cartes " +
  "mentales de fin de chapitre) et les 7 « Espace de production » (cadres vides). Conservées telles quelles, " +
  "signalées pour transparence, non fusionnées.",
));

// ---------------------------------------------------------------------
// Fiches détaillées
// ---------------------------------------------------------------------
for (const it of items) {
  children.push(pageBreak());
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { after: 160 },
    children: [new TextRun({ text: `${it.ecId} — ${it.illId}`, bold: true, color: BLEU_CIVIQUE, size: 26 })],
  }));
  const chapMeta = CHAPTERS.find(c => c.num === it.chap);
  children.push(fieldLine("Chapitre", `${it.chap} — ${chapMeta.title}`));
  children.push(fieldLine("Section", it.section));
  children.push(fieldLine("Page / emplacement", `Page ${it.page} du manuel assemblé (chapitre ${it.chap} : p.${chapMeta.pageStart}-${chapMeta.pageEnd})`));
  children.push(fieldLine("Type d'image", it.type));
  children.push(fieldLine("Objectif pédagogique", it.objectif));
  children.push(fieldLine("Notion à illustrer", it.notion));
  children.push(fieldLine("Personnages nécessaires", it.personnages));
  children.push(fieldLine("Lieu / environnement", it.lieu));
  children.push(fieldLine("Action / scène", it.action));
  children.push(fieldLine("Objets / éléments obligatoires", it.objets));
  children.push(fieldLine("Éléments interdits", it.interdits));
  children.push(fieldLine("Texte visible autorisé", it.texte));
  children.push(fieldLine("Orientation / format recommandé", it.format));
  children.push(fieldLine("Niveau de réalisme", it.realisme));
  children.push(spacer(120));
  children.push(new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text: "PROMPT COMPLET POUR CHATGPT :", bold: true, color: OR_CITOYEN, size: 22 })],
  }));
  children.push(bodyPar(it.prompt));
  children.push(spacer(100));
  children.push(fieldLine("Statut", it.statut));
}

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1350, bottom: 1250, left: 1300, right: 1300, header: 600, footer: 600 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { color: BLEU_CIVIQUE, space: 4, style: BorderStyle.SINGLE, size: 6 } },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "Registre maître des illustrations — Manuel d'EC 7e AF", font: FONT, size: 16, bold: true, color: BLEU_CIVIQUE })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            border: { top: { color: "CCCCCC", space: 4, style: BorderStyle.SINGLE, size: 4 } },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Préparé par My-ken Dieujuste   |   Page ", font: FONT, size: 16, color: GREY_TEXT }),
              new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY_TEXT }),
            ],
          })],
        }),
      },
      children,
    },
  ],
});

const outDir = "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\13_ILLUSTRATIONS_INVENTAIRE";
const outPath = path.join(outDir, "REGISTRE_MAITRE_ILLUSTRATIONS_EC_7AF.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log("OK ->", outPath, buf.length, "bytes");
