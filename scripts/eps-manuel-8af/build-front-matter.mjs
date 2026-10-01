// Pages preliminaires (couverture, avant-propos, table des matieres) —
// Manuel d'EPS 8e AF. Contenu NOUVEAU, jamais valide par l'utilisateur au
// chapitre pres comme le reste du manuel : a presenter explicitement comme
// un brouillon en attente de validation (voir audit final).
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Header, Footer, PageNumber, LevelFormat, NumberFormat, BorderStyle,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import {
  bodyPar, sectionHeading, spacer, pageBreak, FONT, NAVY, GOLD, TEAL, GREY_TEXT, header, footer,
} from "./common.mjs";

const children = [];

// ---- Page de couverture ----
children.push(new Paragraph({ spacing: { before: 2200 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 160 },
  children: [new TextRun({ text: "MANUEL D’ÉDUCATION PHYSIQUE ET SPORTIVE", font: FONT, size: 40, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 },
  children: [new TextRun({ text: "8e Année Fondamentale", font: FONT, size: 34, bold: true, color: TEAL })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 800 },
  children: [new TextRun({ text: "Année scolaire 2026-2027", font: FONT, size: 26, italics: true, color: GREY_TEXT })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 1400, after: 60 },
  children: [new TextRun({ text: "My-ken Dieujuste", font: FONT, size: 26, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 40 },
  children: [new TextRun({ text: "Agronome, professeur d’EPS, d’ETAP et d’EEA", font: FONT, size: 22, color: GREY_TEXT })],
}));
children.push(pageBreak());

// ---- Avant-propos ----
children.push(sectionHeading("Avant-propos", ""));
children.push(bodyPar(
  "Ce manuel accompagne les élèves de 8e Année Fondamentale tout au long d’une année complète d’Éducation Physique et Sportive. Il prolonge les apprentissages engagés en 7e AF et propose douze chapitres construits autour d’une même exigence : aider chaque élève à mieux comprendre son corps et son mouvement, à progresser à son propre rythme, et à devenir progressivement plus autonome et plus responsable dans sa pratique physique."
));
children.push(bodyPar(
  "Chaque chapitre suit une même démarche pédagogique — observer, choisir, agir, ajuster — et propose un contenu structuré : objectifs, activation des acquis, vocabulaire essentiel, activités pratiques, encadrés thématiques, autoévaluation, résumé et exercices. Une attention constante est portée à la sécurité, au respect du corps de chaque élève, à la non-comparaison entre élèves, et à l’adaptation au contexte scolaire haïtien."
));
children.push(bodyPar(
  "Ce manuel a été rédigé chapitre par chapitre, chacun étant relu et validé avant que le suivant ne soit entrepris. Les pages préliminaires (couverture, présent avant-propos et table des matières) constituent en revanche un ajout réalisé au moment de l’assemblage final de l’ouvrage : elles n’ont pas encore fait l’objet de la même relecture chapitre par chapitre et doivent être validées avant toute diffusion, au même titre que le reste du contenu."
));
children.push(bodyPar(
  "Ce manuel a été élaboré à partir de principes pédagogiques généraux de l’Éducation Physique et Sportive, adaptés au contexte scolaire haïtien. Lors de la finalisation de l’ouvrage, les ressources curriculaires institutionnelles du Ministère de l’Éducation Nationale et de la Formation Professionnelle (MENFP) ont été consultées à titre de contexte, via la plateforme NectarEduProfHaïti (voir la section Références en fin d’ouvrage). Ce manuel n’est toutefois ni approuvé, ni homologué, ni certifié par le MENFP : il s’agit d’un ouvrage élaboré de façon autonome, en cohérence avec des orientations et ressources curriculaires MENFP consultées, et non d’un manuel officiel."
));
children.push(spacer(200));
children.push(pageBreak());

// ---- Table des matieres ----
children.push(sectionHeading("Table des matières", ""));

function tocLine(label, pageNum) {
  return new Paragraph({
    spacing: { after: 100 },
    tabStops: [{ type: "right", leader: "dot", position: 9350 }],
    children: [
      new TextRun({ text: label, font: FONT, size: 24 }),
      new TextRun({ text: `\t${pageNum}`, font: FONT, size: 24 }),
    ],
  });
}

const toc = [
  ["Chapitre 1 — L’EPS en 8e AF : corps, mouvement, autonomie et responsabilité", 1],
  ["Chapitre 2 — Capacités physiques et motrices", 11],
  ["Chapitre 3 — Effort physique : respiration, fréquence cardiaque, récupération", 24],
  ["Chapitre 4 — Préparation à l’effort : échauffement, sécurité, organisation", 37],
  ["Chapitre 5 — Athlétisme — Courses", 50],
  ["Chapitre 6 — Athlétisme — Sauts et lancers", 63],
  ["Chapitre 7 — Sports collectifs : principes généraux", 77],
  ["Chapitre 8 — Basket-ball", 92],
  ["Chapitre 9 — Volley-ball", 107],
  ["Chapitre 10 — Gymnastique et expression corporelle", 122],
  ["Chapitre 11 — Jeux et activités physiques haïtiennes, arbitrage, fair-play", 137],
  ["Chapitre 12 — Santé, hygiène de vie, autonomie et projet personnel", 153],
  ["Corrigé général des exercices", 167],
  ["Glossaire général EPS 8e AF", 192],
  ["Références", 196],
];
toc.forEach(([label, num]) => children.push(tocLine(label, num)));
children.push(spacer(160));
children.push(bodyPar(
  "Les numéros de page ci-dessus correspondent à la pagination continue du corps de l’ouvrage (chapitres, corrigé, glossaire, références), qui débute à la page 1 juste après ces pages préliminaires. Ils ont été vérifiés un par un par rapport aux fichiers sources de chaque section avant l’assemblage final.",
  { italics: true }
));

const doc = new Document({
  numbering: { config: [] },
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

const outPath = path.join("C:\\Users\\Me. Alcide\\Desktop\\cciga app", "Manuel_EPS_8AF_PagesPreliminaires.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
console.log("Pages preliminaires (8e AF) genere:", outPath, buf.length, "bytes");
