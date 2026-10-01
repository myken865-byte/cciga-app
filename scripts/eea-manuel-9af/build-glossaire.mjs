// Manuel d'EEA 9e AF — Glossaire final (Phase Finale, PARTIE V).
// Constitue exclusivement a partir des termes figurant reellement dans les
// blocs "Vocabulaire essentiel" des Chapitres 1 a 7 (deja curates au
// moment de la redaction de chaque chapitre). Aucun terme n'a ete ajoute
// pour completer artificiellement la liste. Aucun doublon entre chapitres
// (36 termes distincts). Definitions redactionnelles, non attribuees au
// MENFP.
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
  "Manuel d'EEA 9e AF. Les définitions sont volontairement courtes et adaptées au niveau de la 9e Année " +
  "Fondamentale.",
));
children.push(spacer(200));

const terms = [
  ["Accord", "Ensemble d'au moins trois notes jouées ou entendues en même temps."],
  ["Analyse comparative", "Démarche qui consiste à examiner deux œuvres ou traditions différentes pour en dégager ressemblances et différences."],
  ["Analyse musicale", "Étude méthodique des éléments (notes, rythme, gamme, accords) qui composent une pièce musicale."],
  ["Art naïf", "Courant artistique caractérisé par des couleurs vives, des formes simplifiées et des scènes du quotidien, sans recherche de perspective réaliste."],
  ["Cercle chromatique", "Représentation circulaire organisant les couleurs primaires et secondaires selon leurs relations."],
  ["Corps de métier", "Ensemble des professions qui partagent des compétences et des pratiques communes dans un même domaine."],
  ["Couleur primaire", "Couleur de base qui ne peut être obtenue par aucun mélange (rouge, jaune, bleu)."],
  ["Couleur secondaire", "Couleur obtenue en mélangeant deux couleurs primaires (orange, vert, violet)."],
  ["Croquis architectural", "Dessin rapide et précis destiné à observer et à documenter les caractéristiques d'un bâtiment."],
  ["Design intérieur", "Discipline qui organise l'espace, les couleurs et les matières à l'intérieur d'un lieu."],
  ["Écriture musicale", "Action de noter une musique sur une portée, à la main, pour qu'elle puisse être lue et rejouée."],
  ["Enregistrement sonore", "Action de capturer un son pour pouvoir l'écouter à nouveau plus tard."],
  ["Espace négatif", "Zone d'une composition qui entoure le sujet principal, laissée vide ou en arrière-plan."],
  ["Espace positif", "Zone d'une composition occupée par le sujet principal (la forme elle-même)."],
  ["Exigences académiques et professionnelles", "Formations, diplômes ou compétences nécessaires pour exercer un métier donné."],
  ["Flûte à bec basse", "La plus grande et la plus grave des flûtes à bec couramment utilisées en classe."],
  ["Flûte à bec ténor", "Flûte à bec plus grande que l'alto, au registre plus grave."],
  ["Harmonie", "Art de combiner des accords entre eux pour accompagner ou enrichir une mélodie."],
  ["Home studio", "Espace, même modeste, équipé pour enregistrer et produire de la musique chez soi ou à l'école."],
  ["Impression « 3D »", "Technique de fabrication qui construit un objet en volume, couche par couche, à partir d'un modèle numérique."],
  ["Industries culturelles et créatives", "Ensemble des secteurs économiques liés à la production et à la diffusion de biens et services culturels."],
  ["Ingénierie du son", "Ensemble des techniques utilisées pour capter, régler et améliorer la qualité d'un son enregistré."],
  ["Institution culturelle", "Organisation dont la mission concerne la culture ou les arts (musée, galerie, centre culturel, école d'art...)."],
  ["Jugement critique", "Capacité à évaluer et à justifier une opinion argumentée sur une œuvre."],
  ["Logiciel de design", "Programme informatique permettant de concevoir et de modifier des formes ou des plans numériquement."],
  ["Mastering", "Dernière étape de finalisation d'une production musicale, avant sa diffusion."],
  ["Médium (artistique)", "Matériau ou moyen d'expression utilisé pour créer une œuvre (dessin, photographie, sculpture, cinéma, graphisme...)."],
  ["Mixage", "Équilibrage et ajustement de plusieurs sons ou pistes enregistrées pour obtenir un résultat harmonieux."],
  ["Palette", "Ensemble de couleurs choisies et utilisées dans une œuvre ou une production."],
  ["Pattern Beat Maker", "Outil (logiciel ou application) permettant de créer et d'assembler des motifs rythmiques."],
  ["Récital", "Présentation musicale, individuelle ou collective, généralement organisée en fin d'année pour évaluer les acquis."],
  ["Renforcement", "Consolidation d'un acquis déjà appris, par la pratique répétée et approfondie."],
  ["Salon des métiers", "Événement où plusieurs métiers ou institutions sont présentés au public, souvent sous forme de stands."],
  ["Style Gingerbread", "Style architectural haïtien caractérisé par des façades en bois ouvragé, des couleurs vives et une décoration abondante."],
  ["Teinte", "Variante d'une couleur, plus claire ou plus foncée, plus vive ou plus terne."],
  ["Transposer (un principe)", "Appliquer un même principe (par exemple de composition) à un médium différent de celui pour lequel on l'a d'abord appris."],
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
  91,
  "Manuel_EEA_9AF_Glossaire.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\07_GLOSSAIRE",
);
