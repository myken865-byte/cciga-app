// Manuel d'EEA 7e AF — Glossaire final (Phase Finale).
// Constitue exclusivement a partir des termes figurant reellement dans les
// blocs "Vocabulaire essentiel" et "Mots-cles du chapitre" des Chapitres 1
// a 7 (deja curates au moment de la redaction de chaque chapitre). Aucun
// terme n'a ete ajoute pour completer artificiellement la liste. Doublons
// entre chapitres fusionnes en une seule entree (ex. "flûte à bec" defini
// une fois). Definitions redactionnelles, non attribuees au MENFP.
import {
  bodyPar, spacer, AlignmentType, TextRun, Paragraph, OUTREMER,
  buildAndSave,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "GLOSSAIRE", bold: true, size: 44, color: OUTREMER, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ce glossaire regroupe, par ordre alphabétique, les termes essentiels employés dans les sept chapitres du " +
  "Manuel d'EEA 7e AF. Les définitions sont volontairement courtes et adaptées au niveau de la 7e Année " +
  "Fondamentale.",
));
children.push(spacer(200));

const terms = [
  ["Assemblage", "Technique de sculpture qui consiste à réunir et fixer ensemble plusieurs matériaux séparés pour créer une forme en volume."],
  ["Bande dessinée narrative", "Suite d'images organisées pour raconter une histoire."],
  ["Caricature (illustration caricaturale)", "Dessin qui exagère volontairement certains traits pour faire passer une idée ou une émotion."],
  ["Classique universel", "Œuvre musicale reconnue mondialement, souvent ancienne, qui a traversé le temps."],
  ["Clé de Sol", "Signe placé au début de la portée qui indique comment lire la hauteur des notes."],
  ["Composition", "Façon dont les éléments (points, lignes, formes) sont organisés sur une surface."],
  ["Conte", "Récit traditionnel, souvent transmis oralement, mettant en scène des personnages récurrents."],
  ["Décomposer", "Analyser un objet complexe en le ramenant à des formes simples."],
  ["Doigté", "Position exacte des doigts sur un instrument pour produire une note précise."],
  ["Écoute active", "Fait d'écouter une œuvre en cherchant à comprendre sa construction, pas seulement à l'apprécier passivement."],
  ["Flûte à bec", "Instrument à vent que l'on souffle par une embouchure, joué en couvrant des trous avec les doigts."],
  ["Forme géométrique", "Forme régulière et mesurable (cercle, carré, triangle, rectangle...)."],
  ["Forme naturelle (ou biomorphique)", "Forme irrégulière, inspirée du vivant (une feuille, un nuage, une vague)."],
  ["Gamme (diatonique majeure)", "Suite de sept notes rangées du grave à l'aigu selon un ordre précis : Do, Ré, Mi, Fa, Sol, La, Si."],
  ["Harmonie et balance", "Équilibre ressenti entre les différents éléments d'une composition."],
  ["Improviser", "Créer de la musique sur le moment, sans partition préparée à l'avance."],
  ["Interpréter", "Jouer ou chanter une pièce musicale en y apportant sa propre sensibilité."],
  ["Ligne", "Tracé continu reliant des points, qui peut être simple, épaisse, fine ou pointillée."],
  ["MAO (musique assistée par ordinateur)", "Utilisation de l'informatique pour composer, éditer ou produire de la musique."],
  ["Matériau de récupération", "Objet ou matière déjà utilisé, réemployé pour une nouvelle création."],
  ["Modelage", "Technique de sculpture qui consiste à façonner une matière souple, comme l'argile, pour créer une forme en volume."],
  ["Note", "Signe qui représente un son précis, placé sur la portée."],
  ["Panoramique", "Réglage sonore qui indique de quel côté (gauche, droite, centre) un son semble venir à l'écoute."],
  ["Patrimoine immatériel", "Ce qui se transmet sans objet physique : contes, proverbes, chansons, traditions orales."],
  ["Percussion", "Famille d'instruments (ou de gestes) que l'on frappe pour produire un son rythmique."],
  ["Point", "La plus petite unité visuelle, une simple marque sur une surface."],
  ["Pointillisme", "Technique artistique qui utilise de petits points pour créer une image."],
  ["Portée", "Cinq lignes horizontales sur lesquelles s'écrit la musique."],
  ["Procédé additif", "Technique de sculpture qui consiste à ajouter de la matière pour créer une forme (modeler, assembler, fondre)."],
  ["Procédé soustractif", "Technique de sculpture qui consiste à enlever de la matière pour créer une forme (sculpter)."],
  ["Proverbe", "Phrase courte et imagée qui transmet une leçon ou une sagesse populaire."],
  ["Rythme (visuel)", "Effet créé par la répétition ou la variation de lignes ou de formes."],
  ["Rythme (musical)", "Organisation des notes dans le temps, selon leur durée."],
  ["Solfier", "Chanter une partition en combinant la lecture des notes, le rythme et l'intonation."],
  ["Sculpture", "Art de créer une forme en volume, notamment en enlevant de la matière (procédé soustractif)."],
  ["Volume", "Espace occupé par un objet en trois dimensions, contrairement à un dessin plat en deux dimensions."],
];

// Alphabetical sort by first term (accent-insensitive best-effort)
terms.sort((a, b) => a[0].localeCompare(b[0], "fr", { sensitivity: "base" }));

terms.forEach(([term, def]) => {
  children.push(new Paragraph({
    spacing: { after: 140, line: 264 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: `${term} — `, bold: true, size: 24, font: "Calibri", color: OUTREMER }),
      new TextRun({ text: def, size: 24, font: "Calibri" }),
    ],
  }));
});

await buildAndSave(
  children,
  79,
  "Manuel_EEA_7AF_Glossaire.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_7e_AF\\07_GLOSSAIRE",
);
