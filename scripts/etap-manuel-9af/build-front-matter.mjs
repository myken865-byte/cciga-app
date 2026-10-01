// Manuel d'ETAP 9e AF — Pages préliminaires (couverture, page de titre,
// informations éditoriales, avant-propos, table des matières).
// Pagination en chiffres romains, indépendante de la pagination arabe des
// chapitres qui commence à 1.
//
// PAGINATION PROVISOIRE : Word (COM) est resté indisponible sur la
// machine pendant toute la rédaction de cette Phase Finale ; les numéros
// de page ci-dessous sont estimés à partir du nombre de mots de chaque
// section (ratio ~217 mots/page observé sur les Chapitres 1-4, déjà
// mesurés). Ils devront être vérifiés et corrigés dès que Word sera de
// nouveau disponible (mesure directe, comme pour tous les autres niveaux
// de ce projet).
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Header, Footer, PageNumber, NumberFormat, BorderStyle,
  TabStopType, TabStopPosition, LeaderType,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import { VERT, CUIVRE, CREME, GRIS, FONT, GREY_TEXT } from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Couverture
// ---------------------------------------------------------------------
children.push(new Paragraph({ spacing: { before: 1800, after: 0 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "MANUEL D'ÉDUCATION À LA TECHNOLOGIE", bold: true, size: 40, color: VERT, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "ET AUX ACTIVITÉS PRODUCTIVES (ETAP)", bold: true, size: 40, color: VERT, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "9e ANNÉE FONDAMENTALE", bold: true, size: 32, color: CUIVRE, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 1000 },
  children: [new TextRun({ text: "Année scolaire 2026-2027", size: 26, italics: true, color: GRIS, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: "Version PRÉ-FINALE — avant génération des illustrations définitives", bold: true, size: 22, color: "7A2A0E", font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: "Document de travail — non homologué, non publié", italics: true, size: 20, color: GREY_TEXT, font: FONT })],
}));
children.push(new Paragraph({ children: [], pageBreakBefore: true }));

// ---------------------------------------------------------------------
// Page de titre / informations éditoriales
// ---------------------------------------------------------------------
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 600, after: 400 },
  children: [new TextRun({ text: "INFORMATIONS ÉDITORIALES", bold: true, size: 28, color: VERT, font: FONT })],
}));

function infoLine(label, value) {
  return new Paragraph({
    spacing: { after: 140 },
    children: [
      new TextRun({ text: `${label} : `, bold: true, size: 24, font: FONT }),
      new TextRun({ text: value, size: 24, font: FONT }),
    ],
  });
}

children.push(infoLine("Titre", "Manuel d'Éducation à la Technologie et aux Activités Productives (ETAP) — 9e Année Fondamentale"));
children.push(infoLine("Année scolaire", "2026-2027"));
children.push(infoLine("Auteur / préparé par", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("Éditeur", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("ISBN", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("Mentions légales / copyright", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("Statut MENFP", "Ce manuel n'est ni publié, ni homologué, ni approuvé par le MENFP. Il constitue une adaptation pédagogique du programme officiel ETAP (tronc commun, 7e à 9e AF), version définitive du 28 juillet 2024."));
children.push(new Paragraph({ children: [], pageBreakBefore: true }));

// ---------------------------------------------------------------------
// Avant-propos
// ---------------------------------------------------------------------
children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Avant-propos", bold: true, size: 32, color: VERT, font: FONT })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel accompagne les élèves de 9e Année Fondamentale — dernier niveau du 3e cycle — dans " +
      "l'achèvement de leur parcours en Éducation à la Technologie et aux Activités Productives (ETAP), " +
      "conformément au programme officiel du Ministère de l'Éducation Nationale et de la Formation " +
      "Professionnelle (MENFP), version définitive du 28 juillet 2024.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Troisième et dernier volume de la collection, il prolonge les Manuels ETAP 7e AF et 8e AF et couvre " +
      "six chapitres : quatre champs générateurs de revenus (métiers de la mer, recyclage et énergies " +
      "renouvelables, agriculture, entrepreneuriat), un chapitre de synthèse mobilisant ces acquis dans un " +
      "projet intégrateur, et un sixième chapitre dédié à une compétence officielle distincte, découverte après " +
      "la rédaction initiale du Chapitre 4 et documentée dans les fichiers de traçabilité du projet : modéliser " +
      "des solutions techniques à l'aide d'outils numériques de conception et de fabrication assistées par " +
      "ordinateur (CAO/FAO).",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Une attention particulière a été portée à la sécurité et à l'accessibilité des élèves : aucune " +
      "activité ne demande de manipuler seul un outil dangereux, une machine de fabrication réelle, ou de " +
      "l'argent réel ; chaque activité numérique propose une variante papier/carton complète, pour rester " +
      "accessible sans ordinateur ni connexion Internet.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel se termine par un Corrigé général des exercices, une section de préparation à l'évaluation " +
      "structurée en trois niveaux de progression (entraînement guidé, semi-autonome, simulation complète) " +
      "avec ses corrigés détaillés, un Glossaire et une section de Références documentant les sources " +
      "utilisées. Aucune épreuve officielle ETAP n'ayant été localisée pour la 9e AF, toutes les épreuves " +
      "proposées sont des créations originales, jamais présentées comme officielles. Il s'agit, à ce stade, " +
      "d'une version pré-finale : les illustrations prévues restent réservées (identifiants, objectifs " +
      "pédagogiques et descriptions détaillées disponibles dans le registre du projet) mais pas encore " +
      "générées.",
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
  children: [new TextRun({ text: "Table des matières", bold: true, size: 32, color: VERT, font: FONT })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({
    text: "Pagination provisoire, estimée par nombre de mots en l'absence de Word au moment de la rédaction — " +
      "à vérifier et corriger dès que possible (voir note en tête de ce fichier).",
    italics: true, size: 20, color: GREY_TEXT, font: FONT,
  })],
}));

function tocRow(label, page, bold = false) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: LeaderType.DOT }],
    spacing: { after: bold ? 180 : 120 },
    children: [
      new TextRun({ text: label, bold, size: bold ? 26 : 24, color: bold ? VERT : "000000", font: FONT }),
      new TextRun({ text: `\t${page}`, bold, size: bold ? 26 : 24, font: FONT }),
    ],
  });
}

children.push(tocRow("Avant-propos", "iii"));
children.push(tocRow("Chapitre 1 — Métiers de la mer", "1", true));
children.push(tocRow("Chapitre 2 — Recyclage et énergies renouvelables", "16", true));
children.push(tocRow("Chapitre 3 — Agriculture", "29", true));
children.push(tocRow("Chapitre 4 — Entrepreneuriat", "44", true));
children.push(tocRow("Chapitre 5 — Projet de synthèse ETAP 9e AF", "58", true));
children.push(tocRow("Chapitre 6 — Modéliser avec le numérique : CAO et FAO", "68", true));
children.push(tocRow("Corrigé général des exercices", "80", true));
children.push(tocRow("Préparation à l'évaluation", "92", true));
children.push(tocRow("Corrigés des épreuves d'entraînement", "97", true));
children.push(tocRow("Glossaire", "101", true));
children.push(tocRow("Références", "104", true));

const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\LIVRES_ETAP\\ETAP_9e_AF\\09_ASSEMBLAGE", "Manuel_ETAP_9AF_PagesPreliminaires.docx");

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
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { color: VERT, space: 4, style: BorderStyle.SINGLE, size: 6 } },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "Manuel d'ETAP 9ème AF — Tronc commun", font: FONT, size: 18, bold: true, color: VERT })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            border: { top: { color: "CCCCCC", space: 4, style: BorderStyle.SINGLE, size: 4 } },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Préparé par My-ken Dieujuste, Agronome, professeur d'EPS, d'ETAP et d'EEA", font: FONT, size: 16, color: GREY_TEXT }),
              new TextRun({ text: "   |   Page ", font: FONT, size: 16, color: GREY_TEXT }),
              new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY_TEXT }),
            ],
          })],
        }),
      },
      children,
    },
  ],
});

const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log("OK ->", outPath, buf.length, "bytes");
