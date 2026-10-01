// Manuel d'ETAP 8e AF — Pages preliminaires (couverture, page de titre,
// informations editoriales, avant-propos, mode d'emploi, table des
// matieres) — Phase finale, construites en dernier une fois les pages
// reelles de tous les autres elements connues.
// Pagination en chiffres romains (i, ii, iii...), independante de la
// pagination arabe des chapitres qui commence a 1.
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
  children: [new TextRun({ text: "8e ANNÉE FONDAMENTALE", bold: true, size: 32, color: CUIVRE, font: FONT })],
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

children.push(infoLine("Titre", "Manuel d'Éducation à la Technologie et aux Activités Productives (ETAP) — 8e Année Fondamentale"));
children.push(infoLine("Année scolaire", "2026-2027"));
children.push(infoLine("Auteur / préparé par", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("Éditeur", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("ISBN", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("Dépôt légal", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("Mentions légales / copyright", "À COMPLÉTER — INFORMATION À FOURNIR"));
children.push(infoLine("Statut MENFP", "Ce manuel n'est ni publié, ni homologué, ni approuvé par le MENFP. Il constitue une adaptation pédagogique du programme officiel ETAP (tronc commun, 7e à 9e AF), version définitive du 28 juillet 2024, section 8e AF (pages 48 à 55)."));
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
    text: "Ce manuel accompagne les élèves de 8e Année Fondamentale dans l'approfondissement de l'Éducation à la " +
      "Technologie et aux Activités Productives (ETAP), en continuité directe avec le Manuel ETAP 7e AF. Il " +
      "couvre les cinq champs thématiques du programme officiel du Ministère de l'Éducation Nationale et de la " +
      "Formation Professionnelle (MENFP) pour ce niveau, avec une exigence supérieure à celle de la 7e AF : " +
      "utiliser des applications numériques et des outils collaboratifs, concevoir collectivement des " +
      "prototypes pour les métiers de la mer et l'agriculture, comprendre les énergies renouvelables, et " +
      "appréhender les modes de production, le financement et la mobilisation des ressources d'une entreprise.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Chaque chapitre a été construit à partir d'une lecture directe et vérifiée du programme officiel " +
      "MENFP/Direction Enseignement Fondamental, « Programme du 3e cycle (7e à 9e AF) — ETAP », version " +
      "définitive du 28 juillet 2024, section détaillée « 8e année du fondamental » (pages 48 à 55). Les " +
      "compétences, savoirs et activités officiels sont clairement identifiés dans les fichiers de traçabilité " +
      "du projet ; les exemples, situations, activités pédagogiques et exercices sont des adaptations et des " +
      "choix éditoriaux, contextualisés pour des élèves haïtiens de 8e AF, sans jamais être présentés comme " +
      "des exigences officielles du MENFP.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Une attention particulière a été portée à la sécurité des élèves : aucune activité proposée ne demande " +
      "de manipuler seul un outil dangereux, un produit chimique, une installation électrique domestique, une " +
      "machine, une embarcation ou du feu. Les prototypes conçus en classe restent des maquettes pédagogiques " +
      "en matériaux scolaires sûrs, jamais des objets destinés à un usage réel. Les situations financières " +
      "abordées au Chapitre 5 et au Chapitre 6 restent entièrement fictives.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel se termine par un Corrigé général réservé à l'enseignant, un Glossaire et une section de " +
      "Références documentant les sources utilisées. Il s'agit, à ce stade, d'une version pré-finale : les " +
      "48 illustrations prévues sont réservées (identifiants, objectifs pédagogiques et descriptions détaillées " +
      "disponibles dans le registre du projet) mais pas encore générées.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({ children: [], pageBreakBefore: true }));

// ---------------------------------------------------------------------
// Mode d'emploi pédagogique
// ---------------------------------------------------------------------
children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Mode d'emploi du manuel", bold: true, size: 32, color: VERT, font: FONT })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Chaque chapitre suit la même structure : une ouverture avec une situation-problème, un rappel bref " +
      "des acquis de 7e AF utiles, un développement en sections numérotées, des encadrés (DÉCOUVRIR, OBSERVER, " +
      "OUTIL, TECHNIQUE, SÉCURITÉ, ENVIRONNEMENT, PROJET, ENTREPRENDRE selon les besoins réels du contenu), une " +
      "ou plusieurs activités pratiques ou de conception, un bloc À RETENIR, une AUTOÉVALUATION, une " +
      "PRÉPARATION À L'ÉVALUATION, quatre catégories d'exercices (A-Compléter, B-QCM, C-Relier, " +
      "D-Réflexion/application/conception), puis un résumé et des mots-clés.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Les corrigés des exercices ne se trouvent jamais immédiatement après un chapitre : ils sont " +
      "regroupés dans le Corrigé général, en fin de manuel, réservé à l'enseignant.",
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
children.push(tocRow("Mode d'emploi du manuel", "iv"));
children.push(tocRow("Chapitre 1 — Applications numériques et outils collaboratifs", "1", true));
children.push(tocRow("Chapitre 2 — Concevoir un prototype : métiers de la mer", "15", true));
children.push(tocRow("Chapitre 3 — Les énergies renouvelables", "28", true));
children.push(tocRow("Chapitre 4 — Concevoir un prototype : métiers agricoles", "42", true));
children.push(tocRow("Chapitre 5 — Modes de production et financement", "55", true));
children.push(tocRow("Chapitre 6 — Projet de synthèse ETAP — 8e AF", "68", true));
children.push(tocRow("Corrigé général", "83", true));
children.push(tocRow("Glossaire", "96", true));
children.push(tocRow("Références", "99", true));

const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\LIVRES_ETAP\\ETAP_8e_AF\\09_ASSEMBLAGE", "Manuel_ETAP_8AF_PagesPreliminaires.docx");

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
            children: [new TextRun({ text: "Manuel d'ETAP 8ème AF — Tronc commun", font: FONT, size: 18, bold: true, color: VERT })],
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
