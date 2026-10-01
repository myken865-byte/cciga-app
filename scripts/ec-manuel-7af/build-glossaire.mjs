// Manuel d'EC 7e AF — Phase Finale : Glossaire.
//
// Glossaire alphabétique des termes essentiels réellement employés dans les
// 7 chapitres (rubriques "Vocabulaire essentiel"). Définitions courtes,
// cohérentes avec le sens utilisé dans les chapitres, sans notion étrangère
// au corpus.
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
  "Termes essentiels employés dans les 7 chapitres du Manuel d'EC 7e AF, classés par ordre alphabétique. Le " +
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

entry("Bien collectif", 7, "Bien qui appartient à toute une communauté et dont tous peuvent bénéficier, sans appartenir à une seule personne.");
entry("Citoyen", 2, "Personne reconnue comme membre à part entière d'un État, avec des droits et des devoirs civiques et politiques.");
entry("Citoyenneté", 1, "Statut et rôle d'une personne reconnue comme membre à part entière d'un État, avec des droits et des devoirs.");
entry("Conflit", 5, "Désaccord ou opposition entre deux ou plusieurs personnes, qui peut être positif (utile) ou négatif (destructeur).");
entry("Conquête au quotidien", 3, "Idée que la démocratie ne s'obtient pas une fois pour toutes, mais se pratique et se renforce chaque jour.");
entry("Consigne de sécurité", 6, "Instruction précise à suivre pour éviter un danger ou réagir correctement face à un risque.");
entry("Constitution", 2, "Texte fondamental qui organise un État et fixe les droits et devoirs de ses citoyens.");
entry("Coopérative", 3, "Groupe organisé dont les membres décident ensemble des règles et des activités communes.");
entry("Démocratie", 2, "Système politique dans lequel le pouvoir appartient au peuple, exercé directement ou par des représentants.");
entry("Devoir", 2, "Ce qu'une personne est tenue de faire ou de respecter envers les autres ou envers l'État.");
entry("Dialogue", 5, "Échange respectueux de paroles entre personnes, pour se comprendre avant de décider.");
entry("Dignité", 4, "Valeur fondamentale reconnue à toute personne, qui mérite respect quelles que soient ses différences.");
entry("Droit", 2, "Ce qu'une personne est autorisée à faire, à recevoir ou à voir respecter, reconnu par la loi ou un texte fondamental.");
entry("Droit à l'information", 4, "Droit d'accéder à des informations fiables sur ce qui concerne la vie collective.");
entry("Égalité", 4, "Principe selon lequel toutes les personnes ont la même valeur et les mêmes droits fondamentaux.");
entry("Élection", 3, "Procédure permettant de choisir un ou plusieurs représentants par le vote.");
entry("Entretien", 7, "Soin régulier apporté à un bien ou un espace pour le maintenir en bon état.");
entry("État démocratique", 3, "État dans lequel le pouvoir appartient au peuple, exercé directement ou par des représentants choisis.");
entry("Gouvernement / institution", 2, "Organes chargés de diriger l'État et d'assurer le fonctionnement de ses services.");
entry("Identité nationale", 1, "Ce qui permet à une population de se reconnaître et d'être reconnue comme appartenant à une même nation.");
entry("Inégalité", 4, "Situation dans laquelle des personnes n'ont pas, dans les faits, le même accès à un droit.");
entry("Institution de sécurité", 6, "Organisme officiel chargé de protéger les citoyens et de faire respecter l'ordre public.");
entry("Intérêt collectif", 7, "Ce qui profite à l'ensemble d'une communauté, au-delà des intérêts d'une seule personne.");
entry("Liberté", 2, "Possibilité reconnue à une personne d'agir, de penser ou de s'exprimer sans entrave injustifiée.");
entry("Liberté d'expression", 4, "Droit d'exprimer ses idées et ses opinions, dans le respect d'autrui et de la loi.");
entry("Liberté fondamentale", 4, "Possibilité essentielle reconnue à toute personne (par exemple : circuler, penser, croire, s'exprimer).");
entry("Loi", 2, "Règle écrite, adoptée selon une procédure officielle, qui s'applique à tous dans un État.");
entry("Nation", 1, "Ensemble de personnes qui partagent une histoire, une culture, un territoire et le sentiment d'appartenir à une même communauté.");
entry("Nationalité", 2, "Lien juridique qui rattache une personne à un État ; elle ne se confond pas toujours avec la citoyenneté active.");
entry("Négociation", 5, "Recherche d'un accord entre des personnes en désaccord, par des concessions acceptées de part et d'autre.");
entry("Objectivité", 5, "Capacité à présenter des faits tels qu'ils sont, sans les déformer selon ses propres opinions.");
entry("Paix sociale", 5, "Climat de respect et de coopération qui permet à une communauté de vivre ensemble sans violence.");
entry("Participation citoyenne", 3, "Implication active d'une personne dans la vie collective de sa classe, de son école ou de sa communauté.");
entry("Patrimoine", 1, "Ensemble des biens, lieux et traditions hérités du passé, que la collectivité choisit de préserver.");
entry("Patrimoine naturel", 7, "Ensemble des espaces, ressources et éléments naturels hérités et transmis (arbres, cours d'eau, espaces verts).");
entry("Point de vue", 5, "Façon de voir une situation, propre à chaque personne, qui peut différer d'un point de vue à un autre sans qu'aucun ne soit forcément faux.");
entry("Préservation", 7, "Ensemble des actions visant à protéger et maintenir en bon état un bien ou un espace.");
entry("Protection", 6, "Ensemble des mesures prises pour préserver la sécurité et le bien-être d'une personne ou d'un groupe.");
entry("République", 2, "Forme d'État dans laquelle le pouvoir n'appartient à personne à titre héréditaire, mais à des institutions et des représentants.");
entry("Représentant(e)", 3, "Personne choisie par un groupe pour parler et agir en son nom.");
entry("Risque", 6, "Possibilité qu'un événement dangereux ou dommageable se produise.");
entry("Sécurité", 6, "État dans lequel une personne ou une communauté est protégée contre un danger ou un risque.");
entry("Suffrage universel", 2, "Droit de vote reconnu à l'ensemble des citoyennes et citoyens remplissant les conditions légales.");
entry("Symbole national", 1, "Objet, image, chant ou devise qui représente officiellement un pays et son unité.");
entry("Territoire", 1, "Espace géographique délimité sur lequel s'exerce l'autorité d'un État.");
entry("Tolérance", 4, "Capacité à respecter des personnes, des idées ou des pratiques différentes des siennes.");
entry("Vigilance citoyenne", 6, "Attention et prudence qu'une personne exerce au quotidien pour sa sécurité et celle des autres.");

await buildAndSave(children, 82, "Manuel_EC_7AF_Glossaire.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\07_GLOSSAIRE");
