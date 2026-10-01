// Manuel d'ETAP 9e AF — Phase Finale, PARTIE IV : Corrigés des épreuves
// d'entraînement (Partie III).
//
// Conforme à PLAN_CORRIGES_ETAP_9AF.md : réponses + raisonnement + erreur
// fréquente à éviter lorsque pertinent, barème pédagogique rappelé,
// [CHOIX ÉDITORIAL — NON OFFICIEL].
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE, VERT,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "PARTIE IV — Corrigés des épreuves d'entraînement", bold: true, color: VERT, size: 40 })],
}));
children.push(bodyPar(
  "Corrigé de chacune des 8 épreuves de la Partie III, avec éléments de réponse, raisonnement attendu et, " +
  "lorsque pertinent, l'erreur fréquente à éviter. Barèmes rappelés à titre pédagogique [CHOIX ÉDITORIAL — " +
  "NON OFFICIEL].",
  { italics: true },
));
children.push(spacer(240));

function epreuveCorrige(label, titre) {
  children.push(pageBreak());
  children.push(sectionHeading(`Corrigé — Épreuve ${label} — ${titre}`, ""));
}
function rep(text) { children.push(numberedPar(text)); }

// =======================================================================
children.push(sectionHeading("Niveau 1 — Corrigés", ""));
children.push(spacer(160));

epreuveCorrige("N1-A", "Métiers de la mer");
rep("1. Réponse ouverte, réaliste (ex. valoriser un produit de la mer peu utilisé, réduire les pertes après la pêche).");
rep("2. Réponse ouverte (ex. respecter les périodes de reproduction, ne pas surexploiter une zone de pêche).");
rep("3. Deux rôles parmi : responsable de la recherche, responsable de la planification, responsable de la présentation, responsable du matériel.");
children.push(spacer(200));

epreuveCorrige("N1-B", "Recyclage et énergies renouvelables");
rep("1. Deux parmi : énergie solaire, énergie éolienne, biomasse.");
rep("2. Le schéma représente le système à plat, de façon annotée ; la maquette non fonctionnelle le représente en volume, sans faire réellement fonctionner le système.");
rep("3. Impact environnemental, impact social, impact économique.");
children.push(spacer(200));

epreuveCorrige("N1-C", "Agriculture");
rep("1. Réponse ouverte (ex. transformer des fruits en jus, du manioc en farine).");
rep("2. Une bonne conservation évite que le produit se dégrade avant d'être utilisé ou vendu, ce qui réduit le gaspillage.");
rep("3. Réponse ouverte (ex. rotation des cultures, quantités d'eau raisonnables).");
children.push(spacer(200));

epreuveCorrige("N1-D", "Entrepreneuriat");
rep("1. 100 − 70 = 30 gourdes de bénéfice fictif par objet.");
rep("2. Un schéma qui montre comment les rôles sont répartis dans une entreprise.");
rep("3. Parce que le projet reste un exercice scolaire simulé : manipuler de l'argent réel comporterait un risque réel pour les élèves et ne correspond pas à l'objectif pédagogique.");
children.push(spacer(200));

epreuveCorrige("N1-E", "Modéliser avec le numérique (CAO et FAO)");
rep("1. La CAO permet de concevoir/modéliser un objet à l'écran ; la FAO utilise ce modèle numérique pour guider une machine qui fabrique réellement l'objet.");
rep("2. Un logiciel parmi : 3D Builder, TinkerCAD, FreeCAD, Blender, Google SketchUp.");
rep("3. En réalisant un modèle 2D sur papier quadrillé avec les dimensions notées, puis une maquette en carton respectant les mêmes proportions.");
children.push(spacer(240));

// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Niveau 2 — Corrigés", ""));
children.push(spacer(160));

epreuveCorrige("N2-A", "Agriculture + Recyclage/énergies renouvelables");
rep("1. Réponse ouverte, cohérente : par exemple un système d'irrigation utilisant une pompe alimentée par énergie solaire.");
rep("2. Chapitre 2 : conception d'un système technique utilisant une énergie renouvelable. Chapitre 3 : gestion responsable d'un projet agricole (préservation des sols et de l'eau).");
rep("3. Éléments attendus : identification du besoin (irrigation irrégulière), choix de la solution combinée, étapes de mise en œuvre (planification, réalisation, présentation), au moins un impact attendu (ex. réduction de la dépendance à l'eau courante). Erreur fréquente à éviter : proposer une solution technique sans mentionner d'impact.");
children.push(spacer(200));

epreuveCorrige("N2-B", "Métiers de la mer + Entrepreneuriat");
rep("1. Réponse ouverte, cohérente : par exemple transformer le produit brut en un produit préparé ou conditionné, à plus forte valeur.");
rep("2. Bénéfice fictif par unité : 55 − 30 = 25 gourdes. Pour 10 unités : 25 × 10 = 250 gourdes.");
rep("3. Éléments attendus : répartition claire des rôles, mention explicite du respect de l'écosystème marin dans l'organisation du projet. Erreur fréquente à éviter : présenter une organisation d'équipe sans lien avec la préservation de la ressource marine.");
children.push(spacer(240));

// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Niveau 3 — Corrigé", ""));
children.push(spacer(160));

children.push(subHeading("Partie A — Corrigé (15 points)"));
rep("1. Réponse ouverte, cohérente avec un exemple du Chapitre 1 (ex. transformation des produits de la mer).");
rep("2. Réponse ouverte (ex. énergie solaire → pompe solaire ; biomasse → biodigesteur).");
rep("3. Réponse ouverte (ex. rotation des cultures, conservation raisonnée).");
rep("4. Deux notions parmi : coût de production, prix de vente, chiffre d'affaires, bénéfice.");
rep("5. Un modèle 2D représente l'objet à plat (longueur, largeur) ; un modèle 3D ajoute la troisième dimension (hauteur/épaisseur) et peut être visualisé sous tous les angles.");
children.push(spacer(200));

children.push(subHeading("Partie B — Corrigé (10 points, éléments attendus)"));
rep("1. La modélisation permet de vérifier les proportions et l'assemblage de l'objet avant de le fabriquer réellement, ce qui évite de gaspiller des matériaux sur un objet mal conçu — que la modélisation soit numérique ou réalisée en papier/carton.");
children.push(spacer(200));

children.push(subHeading("Partie C — Corrigé (15 points, éléments attendus)"));
rep("1. Réponse structurée attendue, comportant les 5 éléments demandés : un besoin réel et précis, au moins deux champs clairement combinés (et justifiés), une solution cohérente avec les deux champs, un mode de présentation (avec ou sans numérique), et un impact attendu explicite (environnemental, social ou économique). Erreur fréquente à éviter : une combinaison de champs purement nominale, sans lien réel entre eux dans la solution proposée.");
children.push(spacer(200));

children.push(calloutBox(
  "Barème récapitulatif — Niveau 3 (Simulation complète)",
  [
    "Partie A — Connaissance/compréhension : 15 points.",
    "Partie B — Analyse : 10 points.",
    "Partie C — Situation-problème / mini-projet intégrateur : 15 points.",
    "TOTAL : 40 points. Durée indicative interne : 60 minutes — choix pédagogique, non officiel.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));

await buildAndSave(children, 97, "Manuel_ETAP_9AF_CorrigesEpreuves.docx");
