// Manuel d'ETAP 8e AF — Corrige general (Phase finale).
// Chaque reponse est derivee directement du texte reel des Chapitres 1 a 6
// (mots-banques, options QCM, paires de correspondance et criteres de
// reponse tels qu'ecrits dans build-chapitreN.mjs). Aucune reponse n'est
// inventee ; les questions D (reflexion/application/conception) recoivent
// des "elements de reponse attendus" plutot qu'une reponse unique artificielle.
import {
  bodyPar, sectionHeading, subHeading, numberedPar,
  spacer, pageBreak, twoColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, VERT,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "CORRIGÉ GÉNÉRAL", bold: true, size: 44, color: VERT, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ce corrigé regroupe les réponses des exercices des Chapitres 1 à 6 du Manuel d'ETAP 8e AF. Il est réservé à " +
  "l'usage de l'enseignant et n'apparaît pas dans la partie élève. Pour les questions de réflexion, d'application " +
  "ou de conception (exercice D), des éléments de réponse attendus sont proposés plutôt qu'une réponse unique.",
));
children.push(spacer(200));

function chapitreCorrige(num, titre, a, b, c, d) {
  const out = [];
  out.push(pageBreak());
  out.push(sectionHeading(`Chapitre ${num} — ${titre}`));
  out.push(subHeading("Exercice A — Compléter"));
  a.forEach((t, i) => out.push(numberedPar(`${i + 1}. ${t}`)));
  out.push(spacer(120));
  out.push(subHeading("Exercice B — QCM"));
  b.forEach((t, i) => out.push(numberedPar(`${i + 1}. ${t}`)));
  out.push(spacer(120));
  out.push(subHeading("Exercice C — Relier"));
  out.push(twoColTable("N°", "Bonne réponse", c.map((t, i) => [String(i + 1), t])));
  out.push(spacer(120));
  out.push(subHeading("Exercice D — Réflexion / application / conception (éléments de réponse attendus)"));
  d.forEach((t, i) => out.push(numberedPar(`${i + 1}. ${t}`)));
  out.push(spacer(200));
  return out;
}

// ---------------------------------------------------------------------
// Chapitre 1
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  1, "Applications numériques et outils collaboratifs",
  ["traitement de texte", "tableur", "PAO", "application collaborative", "mise en forme", "graphique", "diaporama", "libre de droits"],
  [
    "b) rédiger et mettre en forme un texte",
    "a) créer des graphiques à partir de données",
    "b) à plusieurs personnes de contribuer à un même document",
    "b) les applications libres de droits",
    "b) vérifier une information avant de la partager",
  ],
  ["d", "a", "b", "c"],
  [
    "L'élève propose une organisation par tour de rôle ou par sous-tâches (rédaction/tableau/présentation), " +
    "chacun préparant son contenu sur papier avant la saisie sur le poste partagé.",
    "Réponse argumentée cohérente avec les fonctions vues (ex. traitement de texte pour un texte long à " +
    "corriger, tableur pour des données chiffrées à comparer).",
    "L'élève conseille de vérifier l'information avant de la partager, en s'appuyant sur l'encadré SÉCURITÉ du chapitre.",
    "Réponse libre proposant l'ajout de titres, d'une mise en forme claire ou d'une meilleure organisation, en lien avec la section 1.3/1.5.",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 2
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  2, "Concevoir un prototype : métiers de la mer",
  ["fonction d'usage", "contrainte", "mécanisme", "cahier des charges", "croquis", "maquette", "prototype", "levier"],
  [
    "b) ce à quoi il sert réellement",
    "b) lister les exigences que doit respecter une solution",
    "b) cahier des charges → croquis → maquette",
    "a) choisir des matériaux qui ne polluent pas s'ils sont abandonnés",
    "b) avec des matériaux scolaires sûrs comme le papier et le carton",
  ],
  ["c", "a", "e", "b", "d"],
  [
    "L'élève propose un cahier des charges cohérent (ex. fonction : garder les appâts au frais ; contraintes : " +
    "léger, isolant, peu coûteux, matériaux disponibles localement).",
    "Réponse centrée sur l'intérêt de comparer plusieurs points de vue avant de choisir la meilleure solution.",
    "L'élève refuse le verre cassé (risque de coupure) et propose une alternative sûre, en s'appuyant sur l'encadré SÉCURITÉ.",
    "Réponse libre proposant une amélioration cohérente avec l'évolution des outils vue en section 2.3 (matériau, mécanisme, sécurité).",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 3
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  3, "Les énergies renouvelables",
  ["renouvelable", "non renouvelable", "éolienne", "hydraulique", "biomasse", "installation", "chaîne d'énergie", "impact"],
  [
    "b) le soleil",
    "b) concentrer la chaleur du soleil pour cuire des aliments",
    "b) la source (le soleil)",
    "a) elle nécessite un vent régulier et suffisant",
    "b) la signaler à un adulte responsable sans y toucher",
  ],
  ["c", "d", "a", "e", "b"],
  [
    "Réponse argumentée selon les ressources disponibles chez l'élève (ex. solaire si ensoleillé, éolien si " +
    "venteux), en s'appuyant sur la comparaison de la section 3.6.",
    "L'élève explique que chaque source a des limites (disponibilité, coût, entretien) selon la section 3.6.",
    "L'élève corrige l'affirmation : l'installation a un coût, un entretien, et dépend des conditions (soleil, vent...).",
    "Réponse structurée en 4 étapes : source (vent) → captage (éolienne) → transformation (électricité) → usage (lampe).",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 4
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  4, "Concevoir un prototype : métiers agricoles",
  ["fonction d'usage", "contrainte", "risque corporel", "cahier des charges", "croquis", "maquette", "levier", "pépinière"],
  [
    "b) ce à quoi il sert réellement",
    "b) mieux comprendre les dangers avant de concevoir une solution plus sûre",
    "b) cahier des charges → croquis → maquette",
    "a) éviter de gaspiller l'eau disponible",
    "b) avec des matériaux scolaires sûrs comme le carton et le plastique recyclé propre",
  ],
  ["c", "a", "b", "d", "e"],
  [
    "L'élève propose un cahier des charges cohérent (ex. fonction : conserver les légumes ; contraintes : " +
    "aéré, peu coûteux, facile à construire, matériaux disponibles).",
    "Réponse centrée sur la prévention des accidents avant même de concevoir la solution.",
    "L'élève refuse le verre cassé (risque de coupure) et propose une alternative sûre.",
    "Réponse libre proposant une amélioration cohérente avec l'évolution des outils agricoles vue en section 4.3.",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 5
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  5, "Modes de production et financement",
  ["production unitaire", "production en série", "ressource humaine", "ressource immatérielle", "coût de production", "marge", "chiffre d'affaires", "financement"],
  [
    "b) une production qui ne s'arrête pas",
    "a) les outils et les locaux",
    "b) 20 gourdes",
    "a) la somme totale des ventes réalisées",
    "a) l'entraide familiale ou communautaire",
  ],
  ["b", "c", "a", "e", "d"],
  [
    "Production par lot ou en série selon la régularité ; l'élève justifie par la quantité (100 paniers) et la répétition de la tâche.",
    "Réponse combinant deux pistes de la section 5.8 (ex. épargne personnelle + entraide communautaire), sans emprunt réel.",
    "L'élève explique que comparer coût et prix de vente permet de savoir si l'activité est viable (marge positive ou non).",
    "L'élève corrige l'affirmation en s'appuyant sur la section 5.7 : une partie du chiffre d'affaires peut être reversée en taxes (TCA/TVA).",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 6
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  6, "Projet de synthèse ETAP — 8e AF",
  ["problème", "source d'information", "comparer", "contrainte", "ressource", "rôles", "grille d'évaluation", "sécurité"],
  [
    "b) réel, précis et réalisable",
    "b) combiner au moins deux champs étudiés dans l'année",
    "b) fictifs et pédagogiques",
    "b) être adapté avec un matériel partagé ou une version papier",
    "a) comprendre ce qui a fonctionné et ce qui peut être amélioré",
  ],
  ["c", "a", "b", "e", "d"],
  [
    "Réponse libre, cohérente avec un problème réel de l'école et une piste combinant au moins deux champs (section 6.8).",
    "L'élève rappelle que même un projet scolaire simple peut présenter des risques si les règles ne sont pas respectées.",
    "Réponse libre : fonction attendue + 2 contraintes cohérentes avec le problème choisi à la question 1.",
    "Réponse libre et réaliste, cohérente avec le projet présenté par l'élève.",
  ],
));

await buildAndSave(children, 83, "Manuel_ETAP_8AF_CorrigeGeneral.docx");
