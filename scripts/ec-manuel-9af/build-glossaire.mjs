// Manuel d'EC 9e AF — Phase Finale : Glossaire.
//
// Glossaire alphabétique des termes essentiels réellement employés dans les
// 7 chapitres (rubriques "Vocabulaire essentiel"). Définitions courtes,
// cohérentes avec le sens utilisé dans les chapitres, sans doublon.
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
  "Termes essentiels employés dans les 7 chapitres du Manuel d'EC 9e AF, classés par ordre alphabétique. Le " +
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

entry("Action citoyenne argumentée", 4, "Proposition concrète, justifiée par des raisons claires, adressée à une autorité pour améliorer une situation.");
entry("Affaire simplifiée", 5, "Présentation pédagogique, simplifiée et fictive, d'une situation judiciaire, utilisée pour s'entraîner sans reproduire une affaire réelle.");
entry("Citoyenneté active (ou civique)", 2, "Engagement concret d'une personne dans la vie collective, au-delà du seul statut légal.");
entry("Citoyenneté légale (ou juridique)", 2, "Statut officiel reconnu par un État à une personne, avec des droits et des devoirs formellement établis.");
entry("Citoyenneté mondiale", 1, "Conscience et engagement d'une personne envers l'humanité tout entière, au-delà de sa seule nation.");
entry("Communauté mondiale", 2, "Ensemble de l'humanité considérée comme un groupe auquel chaque personne appartient, au-delà de sa seule nation.");
entry("Concept", 2, "Idée générale et abstraite qui permet de nommer et d'organiser une catégorie de réalités.");
entry("Coopération internationale", 6, "Collaboration entre États ou organisations de différents pays pour atteindre des objectifs communs, comme la paix ou la sécurité.");
entry("Coopération internationale pour l'environnement", 7, "Collaboration entre pays, institutions internationales ou ONG pour protéger l'environnement et soutenir un développement durable partagé.");
entry("Cour de cassation", 5, "Plus haute instance judiciaire, qui vérifie que la loi a été correctement appliquée par les tribunaux inférieurs.");
entry("Défense du territoire", 6, "Ensemble des missions visant à protéger l'intégrité et la sécurité d'un pays et de sa population.");
entry("Développement durable", 7, "Mode de développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs.");
entry("Discrimination", 4, "Traitement défavorable et injustifié d'une personne en raison d'une caractéristique (genre, origine, situation...).");
entry("Engagement universel", 1, "Action concrète en faveur de valeurs reconnues importantes pour l'ensemble des êtres humains (dignité, paix, justice).");
entry("État de droit", 3, "Principe selon lequel l'État lui-même est soumis à la loi, au même titre que les citoyens.");
entry("Éthique citoyenne", 2, "Ensemble de principes qui guident le comportement responsable d'un citoyen envers les autres, à toutes les échelles.");
entry("Impôt", 3, "Prélèvement obligatoire, fixé par la loi, versé par les citoyens et les entreprises pour financer les dépenses collectives.");
entry("Inégalité sociale", 4, "Situation dans laquelle des groupes de personnes n'ont pas un accès comparable aux mêmes droits ou ressources.");
entry("Institution chargée de faire respecter la loi", 5, "Organisme qui contribue à faire appliquer les décisions de justice et à faire respecter la loi au quotidien.");
entry("Institution internationale", 7, "Organisation regroupant plusieurs États autour d'objectifs communs, y compris environnementaux.");
entry("Légitimité institutionnelle", 6, "Caractère d'une institution dont l'autorité repose sur un mandat légal reconnu, encadré par la loi et soumis à une forme de redevabilité.");
entry("Loi", 3, "Règle adoptée selon une procédure démocratique légitime, qui s'applique également à tous les citoyens.");
entry("ONG (organisation non gouvernementale)", 6, "Organisation à but non lucratif, indépendante des États, agissant notamment pour la paix, l'aide humanitaire ou le développement.");
entry("ONG environnementale", 7, "Organisation non gouvernementale dont l'action est centrée sur la protection de l'environnement.");
entry("Patrimoine mondial", 1, "Biens culturels ou naturels reconnus comme ayant une valeur exceptionnelle pour l'humanité entière, au-delà du seul pays où ils se trouvent.");
entry("Protection sociale", 4, "Ensemble des mécanismes collectifs (santé, soutien aux plus vulnérables) qui protègent les citoyens face aux difficultés de la vie.");
entry("Redevabilité", 6, "Obligation, pour une institution, de rendre compte de ses actions devant la loi et la société.");
entry("Redistribution", 3, "Usage des recettes de l'impôt pour financer des services et des projets qui profitent à l'ensemble de la collectivité.");
entry("Résolution de conflit maîtrisée", 5, "Capacité à choisir et combiner, de façon autonome, les outils appropriés (dialogue, négociation, argumentation, recours institutionnel) selon la complexité d'une situation.");
entry("Société inclusive", 4, "Société organisée pour que chaque personne, quelles que soient ses différences ou ses difficultés, puisse y prendre pleinement sa place.");
entry("Solidarité nationale", 3, "Principe selon lequel les citoyens contribuent ensemble, notamment par l'impôt, au bien-être de la collectivité entière.");
entry("Synthèse", 1, "Mise en relation cohérente de plusieurs connaissances déjà acquises pour en dégager une compréhension d'ensemble.");

await buildAndSave(children, 112, "Manuel_EC_9AF_Glossaire.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\07_GLOSSAIRE");
