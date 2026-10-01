// Manuel d'EEA 8e AF — Glossaire final (Phase Finale).
// Constitue exclusivement a partir des termes figurant reellement dans les
// blocs "Vocabulaire essentiel" des Chapitres 1 a 6 (deja curates au moment
// de la redaction de chaque chapitre). Aucun terme n'a ete ajoute pour
// completer artificiellement la liste. Aucun doublon entre chapitres (6
// vocabulaires distincts, 30 termes). Definitions redactionnelles, non
// attribuees au MENFP.
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
  "Ce glossaire regroupe, par ordre alphabétique, les termes essentiels employés dans les six chapitres du " +
  "Manuel d'EEA 8e AF. Les définitions sont volontairement courtes et adaptées au niveau de la 8e Année " +
  "Fondamentale.",
));
children.push(spacer(200));

const terms = [
  ["Balance (visuelle)", "Répartition équilibrée du poids visuel des éléments sur une surface."],
  ["Carnet de visite", "Support sur lequel on note, dessine et documente ce que l'on observe pendant une sortie."],
  ["Chorale", "Groupe de personnes qui chantent ensemble, souvent réparties en plusieurs voix (pupitres)."],
  ["Clair-obscur", "Contraste marqué entre les zones claires (lumière) et les zones sombres (ombre) d'une image."],
  ["Clé de Fa", "Signe placé au début de la portée, utilisé pour lire des notes plus graves que celles de la clé de Sol."],
  ["Composition en spirale", "Organisation des éléments qui guide le regard en cercle vers un point central."],
  ["Contraste de matière", "Opposition visuelle entre deux matières différentes dans une même composition."],
  ["Esthétique du langage", "Attention portée à la beauté visuelle des mots et des lettres, au-delà de leur seul sens."],
  ["Flûte à bec alto", "Flûte à bec plus grande et plus grave que la flûte soprano, jouée avec un doigté proche mais adapté."],
  ["Gamme de valeurs", "Suite organisée de nuances, du plus clair au plus foncé."],
  ["Gamme mineure", "Gamme de sept notes à la couleur sonore différente de la gamme majeure, souvent perçue comme plus grave ou plus mélancolique."],
  ["Gamme relative", "Gamme mineure qui partage exactement les mêmes notes qu'une gamme majeure donnée, mais qui commence sur une note différente."],
  ["Graphisme", "Organisation visuelle de textes, formes et images pour communiquer une idée."],
  ["Harmonie", "Sensation d'équilibre agréable entre les éléments d'une composition."],
  ["Interdisciplinarité", "Démarche qui relie consciemment deux ou plusieurs matières scolaires dans un même projet."],
  ["Interprétation artistique", "Représentation personnelle et créative d'un sujet réel."],
  ["Lettrage", "Art de dessiner et de composer des lettres de façon esthétique."],
  ["Mesure composée", "Mesure dans laquelle chaque temps se divise naturellement en trois, et non en deux."],
  ["Métronome", "Outil (mécanique, électronique ou en application) qui donne un tempo régulier pour s'entraîner au rythme."],
  ["Musique d'ensemble", "Pratique musicale collective où plusieurs musiciens jouent ou chantent ensemble."],
  ["Nuance de gris", "Degré d'intensité entre le blanc pur et le noir pur."],
  ["Ombrage", "Technique de dessin qui utilise les valeurs pour suggérer le volume et la lumière."],
  ["Orchestre", "Groupe de musiciens qui jouent ensemble, généralement avec des instruments variés."],
  ["Patrimoine", "Ensemble des biens (matériels) et des pratiques (immatériels) hérités du passé et transmis aux générations suivantes."],
  ["Portfolio", "Ensemble organisé de productions et de traces d'un travail, réuni pour montrer une démarche complète."],
  ["Réappropriation du patrimoine", "Démarche par laquelle on redécouvre et fait sien un élément du patrimoine, par l'observation directe et la création."],
  ["S'harmoniser", "Ajuster sa voix ou son jeu à celui du groupe, pour que l'ensemble sonne juste et équilibré."],
  ["Site historique", "Lieu (bâtiment, place, quartier) porteur d'une histoire reconnue par la communauté."],
  ["Texture", "Aspect de surface d'une matière (rugueuse, lisse, granuleuse, souple...)."],
  ["Volume (dessiné)", "Impression de profondeur et de relief donnée à un dessin normalement plat."],
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
  68,
  "Manuel_EEA_8AF_Glossaire.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_8e_AF\\07_GLOSSAIRE",
);
