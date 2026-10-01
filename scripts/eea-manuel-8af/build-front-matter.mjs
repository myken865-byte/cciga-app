// Manuel d'EEA 8e AF — Pages preliminaires (couverture, page de titre,
// informations editoriales, avant-propos, mode d'emploi, table des
// matieres) — Phase Finale, construites en dernier une fois les pages
// reelles de tous les autres elements connues (chapitres + corrige +
// glossaire + references, mesures via Word COM).
// Pagination en chiffres romains (i, ii, iii...), independante de la
// pagination arabe du corps du manuel qui commence a 1.
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Header, Footer, PageNumber, NumberFormat, BorderStyle,
  TabStopType, TabStopPosition, LeaderType,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import { OUTREMER, OCRE, SAUGE, ANTHRACITE, FONT, GREY_TEXT } from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Couverture
// ---------------------------------------------------------------------
children.push(new Paragraph({ spacing: { before: 1800, after: 0 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "MANUEL D'ÉDUCATION ESTHÉTIQUE", bold: true, size: 40, color: OUTREMER, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "ET ARTISTIQUE (EEA)", bold: true, size: 40, color: OUTREMER, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "8e ANNÉE FONDAMENTALE", bold: true, size: 32, color: OCRE, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 1000 },
  children: [new TextRun({ text: "Arts plastiques et visuels — Musique", size: 26, italics: true, color: GREY_TEXT, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: "Version PRÉ-FINALE — illustrations en réserve, avant génération définitive", bold: true, size: 22, color: "7A2A0E", font: FONT })],
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
  children: [new TextRun({ text: "INFORMATIONS ÉDITORIALES", bold: true, size: 28, color: OUTREMER, font: FONT })],
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

children.push(infoLine("Titre", "Manuel d'Éducation Esthétique et Artistique (EEA) — 8e Année Fondamentale"));
children.push(infoLine("Discipline", "Éducation Esthétique et Artistique (arts plastiques et visuels, musique)"));
children.push(infoLine("Auteur / préparé par", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Éditeur", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("ISBN", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Dépôt légal", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Mentions légales / copyright", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Statut MENFP", "Ce manuel n'est ni publié, ni homologué, ni approuvé par le MENFP. Il constitue une adaptation pédagogique du programme officiel EEA (tronc commun, 7e à 9e AF), version définitive du 28 juillet 2024, unités d'apprentissage propres à la 8e AF (pages 40 à 62)."));
children.push(new Paragraph({ children: [], pageBreakBefore: true }));

// ---------------------------------------------------------------------
// Avant-propos
// ---------------------------------------------------------------------
children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Avant-propos", bold: true, size: 32, color: OUTREMER, font: FONT })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel poursuit la collection d'Éducation Esthétique et Artistique (EEA) commencée avec le manuel " +
      "de 7e Année Fondamentale, indépendante des manuels d'Éducation Physique et Sportive (EPS) et d'Éducation " +
      "à la Technologie et aux Activités Productives (ETAP) déjà réalisés pour le 3e cycle fondamental. Il " +
      "accompagne les élèves de 8e Année Fondamentale dans un approfondissement réel de leurs acquis de 7e AF : " +
      "la maîtrise du clair-obscur et du volume, la matière et la texture, l'interdisciplinarité, l'observation " +
      "directe du patrimoine, et une pratique musicale élargie à la clé de Fa et à la musique d'ensemble.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Chaque chapitre a été construit à partir d'une lecture directe et vérifiée du programme officiel " +
      "MENFP/Direction Enseignement Fondamental, « Éducation Esthétique et Artistique — Programme du 3e cycle " +
      "(7e à 9e AF) », version définitive du 28 juillet 2024. Les compétences, savoirs et activités officiels " +
      "sont clairement identifiés dans les fichiers de traçabilité du projet ; les exemples, situations, " +
      "activités pédagogiques et exercices sont des adaptations et des choix éditoriaux, contextualisés pour " +
      "des élèves haïtiens de 8e AF, sans jamais être présentés comme des exigences officielles du MENFP. Pour " +
      "les deux chapitres de musique, le tableau de progression officiel séparant explicitement les colonnes " +
      "7e/8e/9e AF a permis une traçabilité renforcée, documentée dans les fichiers de contrôle correspondants.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Une attention particulière a été portée à la sécurité et à l'accessibilité des élèves : aucune " +
      "activité ne demande de manipuler un outil dangereux sans supervision, et chaque activité prévoit une " +
      "alternative accessible lorsque le matériel n'est pas disponible (voix et percussion corporelle sans " +
      "flûte, alternative documentaire sans sortie scolaire, un seul crayon sans matériel varié).",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel se termine par un Corrigé général réservé à l'enseignant, un Glossaire et une section de " +
      "Références documentant les sources utilisées. Il s'agit, à ce stade, d'une version pré-finale : les " +
      "36 illustrations prévues sont réservées (identifiants, objectifs pédagogiques et descriptions détaillées " +
      "disponibles dans les scripts de génération du projet) mais pas encore générées.",
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
  children: [new TextRun({ text: "Mode d'emploi du manuel", bold: true, size: 32, color: OUTREMER, font: FONT })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Chaque chapitre suit une structure cohérente : une ouverture avec une situation de départ ancrée " +
      "dans le quotidien haïtien, un vocabulaire essentiel, un développement en sections numérotées, des " +
      "encadrés (DÉCOUVRIR, OBSERVER, TECHNIQUE, PATRIMOINE, ÉCOUTER, SÉCURITÉ selon les besoins réels du " +
      "contenu), un atelier/projet pratique, un temps de regard critique, un bloc À RETENIR, une " +
      "AUTOÉVALUATION, une PRÉPARATION À L'ÉVALUATION, quatre familles d'exercices (A-Connaissance/" +
      "compréhension, B-Observation, C-Application, D-Analyse et justification/expression), puis un résumé et " +
      "des mots-clés.",
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
  children: [new TextRun({ text: "Table des matières", bold: true, size: 32, color: OUTREMER, font: FONT })],
}));

function tocRow(label, page, bold = false) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: LeaderType.DOT }],
    spacing: { after: bold ? 180 : 120 },
    children: [
      new TextRun({ text: label, bold, size: bold ? 26 : 24, color: bold ? OUTREMER : "000000", font: FONT }),
      new TextRun({ text: `\t${page}`, bold, size: bold ? 26 : 24, font: FONT }),
    ],
  });
}

children.push(tocRow("Avant-propos", "iii"));
children.push(tocRow("Mode d'emploi du manuel", "iv"));
children.push(new Paragraph({
  spacing: { before: 120, after: 100 },
  children: [new TextRun({ text: "Partie I — Arts plastiques et visuels", bold: true, italics: true, size: 24, color: OCRE, font: FONT })],
}));
children.push(tocRow("Chapitre 1 — Lumière, ombre et volume dessiné", "1", true));
children.push(tocRow("Chapitre 2 — Matières, textures et équilibre", "12", true));
children.push(tocRow("Chapitre 3 — Arts et autres disciplines", "22", true));
children.push(tocRow("Chapitre 4 — Sur les traces du patrimoine", "32", true));
children.push(new Paragraph({
  spacing: { before: 120, after: 100 },
  children: [new TextRun({ text: "Partie II — Musique", bold: true, italics: true, size: 24, color: SAUGE, font: FONT })],
}));
children.push(tocRow("Chapitre 5 — Lire et chanter en clé de Fa", "41", true));
children.push(tocRow("Chapitre 6 — Jouer ensemble : chorale et orchestre", "51", true));
children.push(tocRow("Corrigé général", "61", true));
children.push(tocRow("Glossaire", "68", true));
children.push(tocRow("Références", "70", true));

const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_8e_AF\\09_ASSEMBLAGE", "Manuel_EEA_8AF_PagesPreliminaires.docx");

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
            border: { bottom: { color: OUTREMER, space: 4, style: BorderStyle.SINGLE, size: 6 } },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "Manuel d'EEA 8ème AF — Éducation Esthétique et Artistique", font: FONT, size: 18, bold: true, color: OUTREMER })],
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
