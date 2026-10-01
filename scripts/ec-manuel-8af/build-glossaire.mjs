// Manuel d'EC 8e AF — Phase Finale : Glossaire.
//
// Glossaire alphabétique des termes essentiels réellement employés dans les
// 7 chapitres (rubriques "Vocabulaire essentiel"). Définitions courtes,
// cohérentes avec le sens utilisé dans les chapitres, sans doublon ni
// notion étrangère au corpus.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, spacer, pageBreak,
  buildAndSave, AlignmentType, TextRun, Paragraph, BLEU_CIVIQUE, GREY_TEXT,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Glossaire", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(bodyPar(
  "Termes essentiels employés dans les 7 chapitres du Manuel d'EC 8e AF, classés par ordre alphabétique. Le " +
  "numéro entre parenthèses indique le chapitre où le terme est introduit.",
  { italics: true },
));
children.push(spacer(240));

function entry(term, chapNum, def) {
  children.push(new Paragraph({
    spacing: { after: 140, line: 276 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: `${term} `, bold: true, color: BLEU_CIVIQUE, size: 24 }),
      new TextRun({ text: `(Chapitre ${chapNum}) — `, italics: true, color: GREY_TEXT, size: 22 }),
      new TextRun({ text: def, size: 24 }),
    ],
  }));
}

entry("Argumentaire", 5, "Ensemble organisé d'arguments construits pour soutenir une position sur une question.");
entry("Charte", 6, "Document écrit, élaboré collectivement, qui fixe des engagements ou des règles partagées par un groupe.");
entry("Cohésion sociale", 6, "Qualité des liens qui unissent les membres d'une communauté et leur permettent de vivre ensemble sereinement.");
entry("Comparaison interculturelle", 1, "Démarche consistant à mettre en relation des éléments culturels de nations différentes pour mieux les comprendre, sans les hiérarchiser.");
entry("Contre-argument", 5, "Argument qui vient nuancer ou s'opposer à une thèse, à prendre en compte pour argumenter avec rigueur.");
entry("Culture de la paix", 6, "Ensemble de valeurs, d'attitudes et de pratiques collectives qui rejettent la violence et cherchent à prévenir les tensions avant qu'elles n'éclatent.");
entry("Déboisement", 7, "Disparition ou réduction importante de la couverture forestière d'une zone.");
entry("Droits civils et politiques", 2, "Droits qui protègent la liberté individuelle et la participation à la vie politique (expression, vote, sûreté...).");
entry("Droits économiques, sociaux et culturels", 2, "Droits qui concernent les conditions de vie et de développement d'une personne (travail, éducation, santé, culture...).");
entry("Économie informelle", 2, "Ensemble des activités économiques exercées en dehors d'un cadre légal ou déclaré (sans contrat officiel, sans protection sociale).");
entry("Engagement citoyen", 4, "Implication active et volontaire d'une personne dans une action au service de la collectivité, au-delà de la simple connaissance d'un principe.");
entry("Entraide", 4, "Soutien mutuel organisé entre personnes, pour que chacune puisse surmonter une difficulté.");
entry("Équilibre des pouvoirs", 3, "Situation dans laquelle chaque pouvoir peut, dans une certaine mesure, contrôler ou limiter les autres, pour éviter les abus.");
entry("Gestion durable", 7, "Façon d'utiliser une ressource qui répond aux besoins actuels sans compromettre sa disponibilité pour l'avenir.");
entry("Gestion équitable", 7, "Répartition juste de l'usage et des bénéfices d'une ressource entre tous les membres d'une communauté.");
entry("Justice civile", 5, "Justice qui règle les litiges entre particuliers (par exemple un désaccord sur un contrat).");
entry("Justice pénale", 5, "Justice qui traite les infractions à la loi et leurs sanctions.");
entry("Nation caribéenne", 1, "Nation dont le territoire se situe dans la région de la Caraïbe.");
entry("Non-violence", 6, "Refus actif de recourir à la violence pour résoudre un désaccord, au profit du dialogue et de la coopération.");
entry("Obligation de l'État", 2, "Engagement concret que l'État doit remplir envers ses citoyens pour que leurs droits soient réellement exercés.");
entry("Participation inclusive", 4, "Participation organisée de façon à ce que chaque personne, quelle que soit sa situation, puisse réellement y prendre part.");
entry("Patrimoine partagé", 1, "Éléments culturels, historiques ou naturels qui, bien que propres à une nation, résonnent avec l'histoire d'autres nations voisines.");
entry("Plaidoyer citoyen", 2, "Démarche argumentée et structurée par laquelle un citoyen défend une cause ou demande une action auprès d'une autorité.");
entry("Pouvoir exécutif", 3, "Pouvoir chargé de diriger le pays et de mettre en œuvre les lois au quotidien.");
entry("Pouvoir judiciaire", 3, "Pouvoir chargé d'appliquer la loi et de trancher les désaccords devant les tribunaux.");
entry("Pouvoir législatif", 3, "Pouvoir chargé de proposer, discuter et voter les lois.");
entry("Prévention", 6, "Ensemble d'actions menées à l'avance pour éviter qu'un problème ne se produise.");
entry("Présomption d'innocence", 5, "Principe selon lequel une personne accusée est considérée innocente tant que sa culpabilité n'a pas été prouvée.");
entry("Reboisement", 7, "Action de planter à nouveau des arbres sur une zone qui en a été privée.");
entry("Région caribéenne", 1, "Ensemble des pays et territoires bordant ou situés dans la mer des Caraïbes, partageant certains traits historiques et géographiques.");
entry("Ressource renouvelable", 7, "Ressource naturelle qui peut se régénérer avec le temps, à condition d'être utilisée de façon raisonnable (forêts, eau, sols fertiles).");
entry("Séparation des pouvoirs", 3, "Principe selon lequel le pouvoir de l'État est réparti entre plusieurs institutions distinctes, afin qu'aucune ne puisse décider seule de tout.");
entry("Solidarité", 4, "Sentiment de responsabilité partagée qui pousse à s'entraider au sein d'un groupe.");
entry("Thèse", 5, "Position principale que l'on défend dans un argumentaire ou un débat.");
entry("Valeur universelle", 1, "Principe considéré comme important pour l'ensemble de l'humanité, au-delà d'une seule nation (par exemple : dignité, paix, justice).");

await buildAndSave(children, 78, "Manuel_EC_8AF_Glossaire.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_8e_AF\\07_GLOSSAIRE");
