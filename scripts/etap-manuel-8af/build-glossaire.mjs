// Manuel d'ETAP 8e AF — Glossaire final (Phase finale).
// Constitue exclusivement a partir des termes figurant reellement dans les
// blocs "Mots-cles du chapitre" des Chapitres 1 a 6 (deja curates au moment
// de la redaction de chaque chapitre). Variantes fusionnees : "fonction
// d'usage"/"fonction de contrainte" (Ch.2/4) et "contrainte" (Ch.6) ; les 4
// modes de production (Ch.5) regroupes sous une entree "mode de production"
// plus 4 entrees specifiques. Aucun terme n'a ete ajoute pour completer
// artificiellement la liste. Definitions redactionnelles, non attribuees
// au MENFP.
import {
  bodyPar, spacer, AlignmentType, TextRun, Paragraph, VERT,
  buildAndSave,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "GLOSSAIRE", bold: true, size: 44, color: VERT, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ce glossaire regroupe, par ordre alphabétique, les termes essentiels employés dans les six chapitres du " +
  "Manuel d'ETAP 8e AF. Les définitions sont volontairement courtes et adaptées au niveau de la 8e Année " +
  "Fondamentale.",
));
children.push(spacer(200));

const terms = [
  ["Amélioration", "Changement apporté à un projet ou une solution pour la rendre plus efficace, après l'avoir testée ou évaluée."],
  ["Application (ou logiciel)", "Programme informatique conçu pour réaliser une tâche précise."],
  ["Application collaborative", "Application qui permet à plusieurs personnes de travailler ensemble sur un même document."],
  ["Biomasse", "Source d'énergie renouvelable provenant de la matière organique (végétaux, déchets)."],
  ["Cahier des charges", "Liste des exigences que doit respecter une solution technique avant sa conception."],
  ["Chaîne d'énergie", "Suite des transformations que subit l'énergie, de sa source jusqu'à son usage final."],
  ["Chiffre d'affaires", "Somme totale des ventes réalisées sur une période."],
  ["Comparaison de solutions", "Étape de la démarche de conception consistant à examiner plusieurs solutions avant d'en choisir une."],
  ["Contrainte (ou fonction de contrainte)", "Exigence que doit respecter une solution technique (technique, économique, écologique, ergonomique...)."],
  ["Coût de production", "Ce que coûte réellement la fabrication d'un bien ou d'un service."],
  ["Croquis", "Dessin simple et rapide qui représente une idée de solution."],
  ["Démarche de conception", "Suite d'étapes permettant de passer d'un besoin à une solution technique : cahier des charges, croquis, maquette, prototype."],
  ["Diaporama", "Présentation composée de plusieurs diapositives, réalisée avec un logiciel de PAO."],
  ["Énergie éolienne", "Énergie renouvelable produite à partir du mouvement du vent."],
  ["Énergie géothermique", "Énergie renouvelable produite à partir de la chaleur de la terre."],
  ["Énergie hydraulique", "Énergie renouvelable produite à partir du mouvement de l'eau."],
  ["Énergie solaire", "Énergie renouvelable produite à partir de la lumière et de la chaleur du soleil."],
  ["Fiche projet", "Outil qui accompagne un groupe tout au long d'un projet, en rassemblant ses informations essentielles."],
  ["Financement", "Moyens permettant à une activité de disposer de l'argent nécessaire à son fonctionnement."],
  ["Fonction d'usage", "Ce à quoi sert réellement un outil ou un objet technique."],
  ["Graphique", "Représentation visuelle de données, souvent créée à partir d'un tableur."],
  ["Grille d'évaluation", "Outil qui précise les critères permettant d'apprécier un projet."],
  ["Impact", "Conséquence positive ou négative d'une technologie sur l'économie ou l'environnement."],
  ["Installation", "Ensemble d'équipements qui transforme une source d'énergie en électricité ou en chaleur utilisable."],
  ["Libre de droits", "Se dit d'une application gratuite et légale à utiliser."],
  ["Maquette", "Représentation en volume, à échelle réduite, d'un objet à concevoir."],
  ["Marge", "Différence entre le prix de vente et le coût de production."],
  ["Mécanisme", "Dispositif qui transmet ou transforme un mouvement (levier, poulie, système de transmission)."],
  ["Mise en forme", "Action de présenter un texte de façon claire et organisée (titres, gras, listes...)."],
  ["Mode de production", "Façon dont une entreprise organise sa production : unitaire, par lot, en série ou en continue."],
  ["PAO (publication ou présentation assistée par ordinateur)", "Application utilisée pour concevoir des présentations ou des documents à publier."],
  ["Prix de vente", "Somme demandée au client pour un bien ou un service."],
  ["Problème", "Situation à améliorer, à partir de laquelle un projet peut être construit."],
  ["Production en continue", "Mode de production qui ne s'arrête pas."],
  ["Production en série", "Mode de production d'une grande quantité, de façon répétée et identique."],
  ["Production par lot", "Mode de production d'une petite quantité en même temps."],
  ["Production unitaire", "Mode de production d'un seul exemplaire, souvent réalisé sur mesure."],
  ["Prototype", "Premier exemplaire construit d'une solution technique, pour la représenter et l'évaluer."],
  ["Ressource", "Élément nécessaire à une activité ou un projet : humaine, matérielle, financière ou immatérielle."],
  ["Risque corporel", "Danger que peut représenter un outil pour la santé ou le corps de son utilisateur."],
  ["Sécurité", "Ensemble des règles et comportements permettant d'éviter les risques et les accidents."],
  ["Source d'information", "Origine d'une information utilisée dans un projet : observation, entretien, document."],
  ["Tableur", "Application utilisée pour organiser des données en tableaux, faire des calculs et créer des graphiques."],
  ["Traitement de texte", "Application utilisée pour rédiger et mettre en forme un texte."],
  ["Usage responsable (du numérique)", "Ensemble de comportements permettant d'utiliser les outils numériques en toute sécurité et dans le respect des autres."],
];

terms.forEach(([term, def]) => {
  children.push(new Paragraph({
    spacing: { after: 120, line: 276 },
    children: [
      new TextRun({ text: `${term} — `, bold: true, size: 24, color: VERT, font: "Calibri" }),
      new TextRun({ text: def, size: 24, font: "Calibri" }),
    ],
  }));
});

await buildAndSave(children, 96, "Manuel_ETAP_8AF_Glossaire.docx");
