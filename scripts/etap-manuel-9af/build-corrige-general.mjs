// Manuel d'ETAP 9e AF — Phase Finale, PARTIE II : Corrigés des exercices
// des Chapitres 1 à 6.
//
// Structure conforme à PLAN_CORRIGES_ETAP_9AF.md (validé, Phase 0) : une
// sous-section par chapitre, correspondance exacte exercice -> réponse,
// éléments de réponse + erreur fréquente à éviter pour les questions
// ouvertes (D), grille d'évaluation commentée pour l'activité de projet
// collectif. Chaque réponse dérive exclusivement du texte réel des
// scripts build-chapitreN.mjs, relus intégralement avant rédaction.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, threeColTable, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT, CUIVRE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "PARTIE II — Corrigés des exercices", bold: true, color: VERT, size: 40 })],
}));
children.push(bodyPar(
  "Corrigé complet des exercices des 6 chapitres. Pour les questions fermées, la réponse exacte est fournie. " +
  "Pour les questions ouvertes (Exercice D de chaque chapitre), ce corrigé fournit des éléments de réponse " +
  "attendus et, lorsque pertinent, l'erreur fréquente à éviter — pas une formulation unique obligatoire. " +
  "L'activité de projet collectif de chaque chapitre est corrigée sous forme de grille d'évaluation " +
  "commentée, la production des élèves étant par nature variable.",
  { italics: true },
));
children.push(spacer(240));

function chapterCorrige(num, titre) {
  children.push(pageBreak());
  children.push(sectionHeading(`Chapitre ${num} — ${titre}`, ""));
}
function exoHeading(label) { children.push(subHeading(label)); }
function rep(text) { children.push(numberedPar(text)); }

// =======================================================================
chapterCorrige(1, "Métiers de la mer");

exoHeading("Grille commentée — Activité de projet collectif (mini-projet des métiers de la mer)");
children.push(threeColTable(
  ["Critère", "Ce qui est attendu", "Point de vigilance"],
  [
    ["Besoin identifié", "Un besoin réel, observable localement, lié aux produits de la mer", "Un besoin vague (« améliorer la pêche ») n'est pas suffisant"],
    ["Solution responsable", "Préserve l'écosystème marin (ex. respect des périodes de reproduction)", "Une solution qui maximise les revenus sans condition écologique est incomplète"],
    ["Planification et équipe", "Étapes et rôles clairement répartis", "L'absence de répartition des tâches doit être signalée"],
    ["Réalisation et présentation", "Schéma, maquette ou dossier — jamais d'activité réelle risquée", "Toute proposition d'activité réelle (vente, argent réel) doit être corrigée"],
    ["Évaluation des impacts", "Impacts environnemental, social, économique identifiés", "Une évaluation limitée au seul revenu attendu est incomplète"],
  ],
  [2600, 3800, 3000],
));
children.push(spacer(200));

exoHeading("Exercice A — Compléter");
rep("1. besoin");
rep("2. écosystème marin");
rep("3. produits halieutiques");
rep("4. planification");
rep("5. équipe de projet");
rep("6. revenus");
rep("7. impact");
children.push(spacer(160));

exoHeading("Exercice B — QCM");
rep("1. b) répondre à un besoin réel observé");
rep("2. b) respecte les périodes de reproduction des espèces");
rep("3. a) Projet de transformation des fruits de mer");
rep("4. b) en groupe, sous la supervision d'un adulte responsable");
rep("5. b) présenter les résultats d'un projet, quand c'est possible");
children.push(spacer(160));

exoHeading("Exercice C — Vrai ou faux (justifie ta réponse)");
rep("1. Vrai — le chapitre précise explicitement que la réalisation peut prendre la forme d'un schéma, d'une maquette simple ou d'un dossier, sans jamais impliquer d'activité réelle risquée.");
rep("2. Faux — évaluer un projet suppose de considérer aussi les impacts environnemental et social, pas seulement les revenus.");
rep("3. Vrai — un suivi régulier de l'équipe fait partie de la méthode de projet enseignée.");
rep("4. Faux — le chapitre présente un exemple officiel (transformation des produits de la mer) à titre indicatif, sans imposer un projet unique.");
children.push(spacer(160));

exoHeading("Exercice D — Réflexion / décision de projet (éléments de réponse attendus)");
rep("1. Critère possible : la disponibilité réelle de la ressource dans la communauté, ou l'intérêt et les compétences déjà présentes dans l'équipe. Erreur fréquente à éviter : choisir uniquement en fonction du revenu espéré, sans considérer la faisabilité.");
rep("2. Conseil attendu : privilégier une solution plus lente mais durable, en expliquant que l'épuisement rapide de la ressource compromet le projet à moyen terme. Erreur fréquente à éviter : présenter la préservation de la ressource comme un obstacle au projet plutôt que comme une condition de sa réussite.");
rep("3. Une bonne planification permet d'anticiper les ressources nécessaires, de répartir les tâches et d'éviter les retards ou les conflits pendant la réalisation.");
rep("4. Réponse attendue : non, un support écrit ou visuel (schéma, affiche, dossier) renforce la clarté de la présentation, même si le numérique n'est pas obligatoire. Erreur fréquente à éviter : confondre « pas obligatoire » avec « inutile ».");
children.push(spacer(240));

// =======================================================================
chapterCorrige(2, "Recyclage et énergies renouvelables");

exoHeading("Grille commentée — Activité de projet collectif (système technique écologique)");
children.push(threeColTable(
  ["Critère", "Ce qui est attendu", "Point de vigilance"],
  [
    ["Choix du système", "Un système utilisant une énergie renouvelable ou des objets recyclés, parmi ceux proposés", "Un système inventé sans lien avec l'énergie renouvelable ou le recyclage n'est pas conforme"],
    ["Schéma / maquette", "Schéma annoté puis, si possible, maquette non fonctionnelle", "Une maquette fonctionnelle réelle n'est jamais exigée ni nécessaire"],
    ["Sécurité", "Aucune manipulation dangereuse, visite toujours supervisée", "Toute proposition de manipulation réelle non supervisée doit être corrigée"],
    ["Évaluation des impacts", "Impacts environnemental, social, économique identifiés", "Une évaluation focalisée uniquement sur l'aspect technique est incomplète"],
  ],
  [2600, 4000, 3200],
));
children.push(spacer(200));

exoHeading("Exercice A — Compléter");
rep("1. énergie renouvelable");
rep("2. objet recyclé");
rep("3. schéma");
rep("4. maquette non fonctionnelle");
rep("5. biodigesteur");
rep("6. impact");
rep("7. équipe de projet");
children.push(spacer(160));

exoHeading("Exercice B — Relier");
rep("1 → b (Pompe solaire → Énergie solaire) ; 2 → c (Éolienne → Vent, et objets recyclés) ; 3 → a (Biodigesteur → Biomasse) ; 4 → d (Chauffe-eau solaire → Énergie solaire et objets recyclés).");
children.push(spacer(160));

exoHeading("Exercice C — Analyse / comparaison");
rep("1. Une installation solaire domestique utilise l'énergie du soleil, généralement pour l'éclairage ou le chauffage de l'eau ; un biodigesteur utilise la biomasse (déchets organiques) pour produire du biogaz utilisable comme énergie.");
rep("2. Un schéma représente le système de façon annotée à plat, utile pour expliquer son fonctionnement ; une maquette non fonctionnelle le représente en volume, utile pour visualiser sa forme réelle — les deux sont complémentaires.");
rep("3. Oui — un système peut combiner les deux catégories à la fois (par exemple une éolienne fabriquée avec des objets recyclés utilise à la fois une énergie renouvelable et des matériaux recyclés).");
children.push(spacer(160));

exoHeading("Exercice D — Réflexion / décision de projet (éléments de réponse attendus)");
rep("1. Critère possible : la disponibilité du matériel nécessaire dans l'école ou la communauté. Erreur fréquente à éviter : choisir uniquement selon la complexité apparente du système, sans vérifier sa faisabilité réelle.");
rep("2. Conseil attendu : déconseiller le verre cassé (risque de coupure) et proposer un matériau recyclé sûr équivalent (carton, plastique rigide). Erreur fréquente à éviter : accepter un matériau dangereux au nom du réalisme de la maquette.");
rep("3. Une visite doit toujours être supervisée car elle implique un déplacement et un environnement technique potentiellement dangereux pour des élèves non formés.");
rep("4. Réponse ouverte, cohérente (ex. une éolienne fabriquée avec des bouteilles recyclées) combinant clairement une énergie renouvelable et des objets recyclés.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(3, "Agriculture");

exoHeading("Grille commentée — Activité de projet collectif (projet agricole générateur de revenus)");
children.push(threeColTable(
  ["Critère", "Ce qui est attendu", "Point de vigilance"],
  [
    ["Besoin identifié", "Un besoin réel lié à la production, la conservation ou la transformation agricole", "Un besoin trop général (« améliorer l'agriculture ») n'est pas suffisant"],
    ["Solution responsable", "Préserve l'environnement (sols, ressources en eau)", "Une solution qui épuise rapidement les sols est incomplète"],
    ["Planification et équipe", "Étapes et rôles clairement répartis", "L'absence de répartition des tâches doit être signalée"],
    ["Réalisation et présentation", "Schéma, maquette ou dossier — jamais d'activité réelle risquée", "Toute proposition d'activité réelle (vente, argent réel) doit être corrigée"],
    ["Évaluation des impacts", "Impacts environnemental, social, économique identifiés", "Une évaluation limitée au seul revenu attendu est incomplète"],
  ],
  [2600, 3800, 3000],
));
children.push(spacer(200));

exoHeading("Exercice A — Compléter");
rep("1. stockage");
rep("2. transformation");
rep("3. distribution");
rep("4. environnement");
rep("5. équipe de projet");
rep("6. impact");
rep("7. conservation");
children.push(spacer(160));

exoHeading("Exercice B — QCM");
rep("1. b) répondre à un besoin réel observé");
rep("2. b) respecte les cycles naturels de culture ou d'élevage");
rep("3. a) Projet de transformation et de vente de jus de fruits");
rep("4. b) en groupe, sous la supervision d'un adulte responsable");
rep("5. b) présenter les résultats d'un projet, quand c'est possible");
children.push(spacer(160));

exoHeading("Exercice C — Vrai ou faux (justifie ta réponse)");
rep("1. Vrai — comme pour les autres chapitres, la réalisation reste une représentation (dossier, maquette), jamais une activité réelle risquée.");
rep("2. Faux — le stockage et la conservation servent avant tout à réduire les pertes et à garder les produits utilisables plus longtemps.");
rep("3. Vrai — un suivi régulier de l'équipe fait partie de la méthode de projet enseignée.");
rep("4. Faux — le chapitre présente un exemple officiel (transformation et vente de jus de fruits) à titre indicatif, sans imposer un projet unique.");
children.push(spacer(160));

exoHeading("Exercice D — Réflexion / décision de projet (éléments de réponse attendus)");
rep("1. Critère possible : la disponibilité réelle des matières premières ou des compétences dans l'équipe. Erreur fréquente à éviter : choisir uniquement en fonction du revenu espéré.");
rep("2. Conseil attendu : privilégier une pratique agricole qui préserve les sols (rotation, quantités raisonnables), en expliquant que l'épuisement des sols compromet le projet à moyen terme.");
rep("3. La conservation et la transformation permettent d'utiliser des produits qui, sans cela, se dégraderaient et seraient perdus, ce qui réduit le gaspillage et augmente la valeur du produit.");
rep("4. Réponse attendue : non, une présentation claire reste nécessaire même sur un sujet connu, car elle permet de mettre en valeur les choix spécifiques du projet. Erreur fréquente à éviter : confondre familiarité du sujet et clarté de la présentation.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(4, "Entrepreneuriat");

exoHeading("Grille commentée — Activité de projet collectif (entreprise fictive)");
children.push(threeColTable(
  ["Critère", "Ce qui est attendu", "Point de vigilance"],
  [
    ["Opportunité et plan", "Besoin non satisfait identifié, plan d'affaires cohérent", "Une opportunité vague sans besoin réel identifié est insuffisante"],
    ["Organigramme", "Rôles clairement répartis dans l'équipe", "L'absence de répartition des rôles doit être signalée"],
    ["Calculs économiques", "Coût, prix, chiffre d'affaires et bénéfice fictifs cohérents entre eux", "Toute incohérence de calcul doit être corrigée avec l'élève"],
    ["Caractère fictif", "Aucun argent réel, aucun enregistrement légal réel", "Toute proposition d'activité réelle (argent, enregistrement) doit être corrigée"],
    ["Évaluation des impacts", "Impacts économique, social, environnemental identifiés", "Une évaluation limitée au seul bénéfice fictif est incomplète"],
  ],
  [2600, 3800, 3000],
));
children.push(spacer(200));

exoHeading("Exercice A — Compléter");
rep("1. opportunité d'affaires");
rep("2. plan d'affaires");
rep("3. organigramme");
rep("4. coût de production");
rep("5. prix de vente");
rep("6. chiffre d'affaires");
children.push(spacer(160));

exoHeading("Exercice B — Application / calcul simple");
rep("1. Bénéfice fictif par sac : 90 − 50 = 40 gourdes.");
rep("2. Chiffre d'affaires fictif total pour 15 sacs : 15 × 90 = 1350 gourdes.");
rep("3. Coût de production fictif total pour 15 sacs : 15 × 50 = 750 gourdes.");
rep("4. Bénéfice fictif total pour 15 sacs : 1350 − 750 = 600 gourdes (ou 15 × 40 = 600 gourdes).");
children.push(spacer(160));

exoHeading("Exercice C — Analyse / comparaison");
rep("1. Une structure fonctionnelle (rôles organisés par fonction : production, vente, gestion) convient bien à un petit projet scolaire simple ; une structure divisionnelle (organisée par produit ou zone) devient utile seulement si le projet grandit et se diversifie.");
rep("2. Une opportunité d'affaires est le besoin non satisfait repéré au départ ; un plan d'affaires est le document qui décrit ensuite comment répondre à ce besoin (produit, organisation, coûts, prix).");
rep("3. Même sans connaître le taux exact, prévoir une taxe habitue les élèves à anticiper une charge réelle que toute entreprise doit intégrer dans ses prix, pour éviter de sous-estimer ses coûts.");
children.push(spacer(160));

exoHeading("Exercice D — Mini-cas entrepreneurial (éléments de réponse attendus)");
rep("1. Conseil attendu : vérifier que le prix reste supérieur au coût de production, sinon le projet devient déficitaire même avec plus de clients fictifs. Erreur fréquente à éviter : privilégier le volume de ventes sans vérifier la rentabilité.");
rep("2. Réponse attendue : non, l'entreprise reste entièrement fictive et simulée ; un enregistrement réel auprès d'une institution n'est ni nécessaire ni approprié pour ce projet scolaire.");
rep("3. Réponse ouverte, cohérente : par exemple utiliser des matériaux recyclés, réduire les déchets de production, ou proposer une compensation environnementale simulée.");
rep("4. Évaluer les résultats permet de vérifier si les objectifs du projet ont été atteints et d'identifier ce qui pourrait être amélioré — sans cette étape, la réalisation seule ne suffit pas à démontrer la compétence.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(5, "Projet de synthèse ETAP 9e AF");

exoHeading("Grille commentée — Le projet intégrateur (consignes complètes, section 5.8)");
children.push(threeColTable(
  ["Critère", "Ce qui est attendu", "Point de vigilance"],
  [
    ["Combinaison de champs", "Au moins deux champs (Chapitres 1-4) réellement combinés et justifiés", "Une combinaison purement nominale, sans lien réel entre les champs, est insuffisante"],
    ["Fiche de projet et ressources", "Fiche et tableau des ressources complétés de façon réaliste", "Des ressources non disponibles ne doivent pas être présumées acquises"],
    ["Réalisation", "Représentation sûre (schéma, maquette, dossier)", "Toute activité réelle risquée doit être corrigée"],
    ["Présentation et évaluation", "Présentation claire ; grille d'évaluation de la section 5.6 complétée", "Une évaluation limitée à un seul critère est incomplète"],
  ],
  [2800, 3800, 3000],
));
children.push(spacer(200));

exoHeading("Exercice A — Vérification des acquis");
rep("1. Métiers de la mer (générer des revenus en préservant la ressource marine), Recyclage et énergies renouvelables (concevoir un objet technique écologique), Agriculture (générer des revenus en préservant l'environnement), Entrepreneuriat (créer une entreprise fictive et évaluer ses impacts).");
rep("2. 1. Identifier un besoin. 2. Choisir les champs à combiner et justifier. 3. Rechercher une solution responsable. 4. Planifier et organiser une équipe. 5. Réaliser ou représenter. 6. Présenter les résultats. 7. Évaluer les impacts.");
rep("3. Parce que, comme dans tous les chapitres précédents, aucune activité financière réelle, aucune sortie non supervisée et aucune manipulation dangereuse n'est autorisée dans un projet scolaire.");
children.push(spacer(160));

exoHeading("Exercice B — Application intégrée");
rep("1. Le besoin est l'irrigation régulière d'un jardin scolaire, difficile à assurer sans accès simple à l'eau.");
rep("2. Le Chapitre 3 apporte la conception du projet agricole (choix des cultures, entretien) ; le Chapitre 2 apporte la conception du système technique (pompe utilisant une énergie renouvelable).");
rep("3. Réponse ouverte, réaliste : par exemple deux élèves responsables du jardin, deux responsables de la pompe solaire, avec une coordination commune.");
children.push(spacer(160));

exoHeading("Exercice C — Analyse / comparaison");
rep("1. Réponse ouverte, argumentée : la combinaison jugée la plus réaliste dépend des ressources et compétences réellement disponibles dans l'équipe — l'important est la justification, pas un choix unique correct.");
rep("2. Un projet d'un seul chapitre mobilise une seule compétence ; un projet intégrateur combine et articule au moins deux compétences déjà développées, ce qui demande davantage d'autonomie et de coordination.");
children.push(spacer(160));

exoHeading("Exercice D — Situation-problème / proposition argumentée (éléments de réponse attendus)");
rep("1. Réponse ouverte, cohérente, combinant au moins deux champs étudiés, avec une justification claire du choix. Erreur fréquente à éviter : proposer une combinaison de façade sans lien réel entre les deux champs.");
rep("2. Réponse attendue : ce projet ne respecte pas la règle du caractère entièrement simulé (aucun argent réel) ; une solution équivalente consiste à simuler l'investissement avec un budget fictif sur papier.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(6, "Modéliser avec le numérique : CAO et FAO");

exoHeading("Grille commentée — Activité de projet collectif (modéliser un objet technique de l'année)");
children.push(threeColTable(
  ["Critère", "Ce qui est attendu", "Point de vigilance"],
  [
    ["Choix de l'objet", "Objet réellement rencontré aux Chapitres 1, 2 ou 3", "Un objet sans lien avec l'année n'est pas conforme à l'activité"],
    ["Modèle 2D", "Dimensions principales représentées, à l'échelle ou proportionnées", "Un croquis sans dimensions notées reste incomplet"],
    ["Passage au modèle 3D", "Volume cohérent avec le modèle 2D (numérique ou maquette papier/carton)", "Un modèle 3D disproportionné par rapport au modèle 2D doit être signalé"],
    ["Accessibilité", "Variante papier/carton acceptée à égalité avec le numérique", "Un élève sans accès à un ordinateur ne doit jamais être pénalisé"],
  ],
  [2600, 4000, 3200],
));
children.push(spacer(200));

exoHeading("Exercice A — Compléter");
rep("1. modèle 2D");
rep("2. modèle 3D");
rep("3. CAO");
rep("4. FAO");
rep("5. logiciel libre");
children.push(spacer(160));

exoHeading("Exercice B — QCM");
rep("1. b) une machine de fabrication");
rep("2. b) une troisième dimension");
rep("3. a) TinkerCAD");
rep("4. b) reste possible sur papier/carton");
children.push(spacer(160));

exoHeading("Exercice C — Vrai ou faux (justifie ta réponse)");
rep("1. Faux — la FAO n'intervient que si une machine de fabrication est réellement disponible ; sans machine, le modèle numérique reste un plan précis pour une fabrication manuelle.");
rep("2. Vrai — le chapitre encourage explicitement à modéliser des objets déjà rencontrés aux Chapitres 1 à 3.");
children.push(spacer(160));

exoHeading("Exercice D — Réflexion / décision de projet (éléments de réponse attendus)");
rep("1. Réponse attendue : réaliser le modèle 2D sur papier quadrillé avec les dimensions notées, puis construire une maquette en carton respectant les mêmes proportions, en suivant les mêmes étapes que la démarche numérique. Erreur fréquente à éviter : penser que l'absence d'ordinateur empêche de modéliser.");
rep("2. Réponse ouverte, cohérente : un modèle 3D permet par exemple de vérifier que les proportions de l'objet sont réalistes, ou que les pièces s'assemblent correctement, avant de le fabriquer réellement.");

// Enregistré dans 02_CHAPITRES par buildAndSave (chemin fixe imposé par
// common.mjs) puis déplacé vers 06_CORRIGE_GENERAL/ par le script
// d'orchestration — même convention que ETAP 7e/8e AF.
await buildAndSave(children, 80, "Manuel_ETAP_9AF_CorrigeGeneral.docx");
