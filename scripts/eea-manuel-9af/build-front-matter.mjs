// Manuel d'EEA 9e AF — Pages preliminaires (couverture, page de titre,
// informations editoriales, avant-propos, mode d'emploi, table des
// matieres) — Phase Finale, construites en dernier une fois les pages
// reelles de tous les autres elements connues (chapitres + corrige +
// preparation examen + annexes + corriges epreuves + glossaire +
// references, mesurees via Word COM).
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
  children: [new TextRun({ text: "9e ANNÉE FONDAMENTALE", bold: true, size: 32, color: OCRE, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 1000 },
  children: [new TextRun({ text: "Arts plastiques et visuels — Musique", size: 26, italics: true, color: GREY_TEXT, font: FONT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: "VERSION PRÉ-FINALE — 42 illustrations à fournir / à générer", bold: true, size: 22, color: "7A2A0E", font: FONT })],
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

children.push(infoLine("Titre", "Manuel d'Éducation Esthétique et Artistique (EEA) — 9e Année Fondamentale"));
children.push(infoLine("Discipline", "Éducation Esthétique et Artistique (arts plastiques et visuels, musique)"));
children.push(infoLine("Auteur / préparé par", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Éditeur", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("ISBN", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Dépôt légal", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Mentions légales / copyright", "À COMPLÉTER — PREUVE À FOURNIR"));
children.push(infoLine("Statut MENFP", "Ce manuel n'est ni publié, ni homologué, ni approuvé par le MENFP. Il constitue une adaptation pédagogique du programme officiel EEA (tronc commun, 7e à 9e AF), version définitive du 28 juillet 2024, unités d'apprentissage propres à la 9e AF (pages 36 à 63)."));
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
    text: "Ce manuel achève la collection d'Éducation Esthétique et Artistique (EEA) commencée avec les manuels " +
      "de 7e et 8e Années Fondamentales, indépendante des manuels d'Éducation Physique et Sportive (EPS) et " +
      "d'Éducation à la Technologie et aux Activités Productives (ETAP) déjà réalisés pour le 3e cycle " +
      "fondamental. Il accompagne les élèves de 9e Année Fondamentale — dernière année du cycle fondamental — " +
      "dans l'aboutissement de leur parcours en EEA : la maîtrise de la couleur, la composition avancée " +
      "multi-médiums, l'art à l'ère du numérique, la découverte des métiers et institutions culturelles, " +
      "l'harmonie et l'écriture musicale, l'enregistrement sonore et la production musicale critique.",
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
      "des élèves haïtiens de 9e AF, sans jamais être présentés comme des exigences officielles du MENFP.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "La 9e AF marquant la fin du cycle fondamental, ce manuel intègre une section de préparation à " +
      "l'examen, construite en quatre temps (diagnostic, entraînement guidé, entraînement semi-autonome, " +
      "simulation complète). Toutes les épreuves qui la composent sont des créations originales de ce manuel, " +
      "inspirées des thèmes et du niveau de difficulté observés dans les documents d'examen identifiés en " +
      "recherche (voir la section Annexes), mais ne reproduisant aucun énoncé existant.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Ce manuel se termine par un Corrigé général, une Préparation à l'examen, des Annexes documentant " +
      "les examens identifiés, des Corrigés d'épreuves d'entraînement, un Glossaire et une section de " +
      "Références. Il s'agit, à ce stade, d'une version pré-finale : les 42 illustrations prévues sont " +
      "réservées (identifiants, objectifs pédagogiques et descriptions détaillées disponibles dans les " +
      "scripts de génération du projet) mais pas encore générées.",
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
      "compréhension, B-Observation, C-Application, D-Analyse et justification), puis un résumé et des " +
      "mots-clés.",
    size: 24, font: FONT,
  })],
}));
children.push(new Paragraph({
  spacing: { after: 160, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({
    text: "Les corrigés des exercices ne se trouvent jamais immédiatement après un chapitre : ils sont " +
      "regroupés dans le Corrigé général, en fin de manuel. La Préparation à l'examen, les Annexes et leurs " +
      "corrigés se trouvent, eux aussi, dans des sections finales séparées, réservées à l'enseignant pour ce " +
      "qui concerne les corrigés.",
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
children.push(tocRow("Chapitre 1 — La couleur et l'art haïtien", "1", true));
children.push(tocRow("Chapitre 2 — Composer avec maîtrise", "12", true));
children.push(tocRow("Chapitre 3 — L'art à l'ère du numérique", "22", true));
children.push(tocRow("Chapitre 4 — Métiers et institutions de la culture", "31", true));
children.push(new Paragraph({
  spacing: { before: 120, after: 100 },
  children: [new TextRun({ text: "Partie II — Musique", bold: true, italics: true, size: 24, color: SAUGE, font: FONT })],
}));
children.push(tocRow("Chapitre 5 — Harmonie et écriture musicale", "41", true));
children.push(tocRow("Chapitre 6 — Jouer, enregistrer, produire", "52", true));
children.push(tocRow("Chapitre 7 — Produire sa musique aujourd'hui", "60", true));
children.push(new Paragraph({
  spacing: { before: 120, after: 100 },
  children: [new TextRun({ text: "Partie III — Corrigés, préparation à l'examen et annexes", bold: true, italics: true, size: 24, color: ANTHRACITE, font: FONT })],
}));
children.push(tocRow("Corrigé général (Chapitres 1 à 7)", "69", true));
children.push(tocRow("Préparation à l'examen de fin de cycle", "77", true));
children.push(tocRow("Annexes — documents d'examen identifiés", "82", true));
children.push(tocRow("Corrigés des épreuves d'entraînement", "86", true));
children.push(tocRow("Glossaire", "90", true));
children.push(tocRow("Références", "93", true));

const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\09_ASSEMBLAGE", "Manuel_EEA_9AF_PagesPreliminaires.docx");

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
            children: [new TextRun({ text: "Manuel d'EEA 9ème AF — Éducation Esthétique et Artistique", font: FONT, size: 18, bold: true, color: OUTREMER })],
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
