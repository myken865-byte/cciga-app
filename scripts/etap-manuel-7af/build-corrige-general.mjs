// Manuel d'ETAP 7e AF — Corrige general (Etape F3 de la Phase finale).
// Chaque reponse ci-dessous est derivee directement du texte reel des
// Chapitres 1 a 6 (mots-banques, options QCM, paires de correspondance et
// criteres de reponse tels qu'ecrits dans build-chapitreN.mjs). Aucune
// reponse n'est inventee ; les questions D (reflexion/application) recoivent
// des "elements de reponse attendus" plutot qu'une reponse unique artificielle.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  spacer, pageBreak, twoColTable, threeColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, VERT,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "CORRIGÉ GÉNÉRAL", bold: true, size: 44, color: VERT, font: "Calibri" })],
}));
children.push(bodyPar(
  "Ce corrigé regroupe les réponses des exercices des Chapitres 1 à 6 du Manuel d'ETAP 7e AF. Il est réservé à " +
  "l'usage de l'enseignant et n'apparaît pas dans la partie élève. Pour les questions de réflexion/application " +
  "(exercice D), des éléments de réponse attendus sont proposés plutôt qu'une réponse unique, car ces questions " +
  "admettent plusieurs formulations correctes.",
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
  out.push(subHeading("Exercice D — Réflexion / application (éléments de réponse attendus)"));
  d.forEach((t, i) => out.push(numberedPar(`${i + 1}. ${t}`)));
  out.push(spacer(200));
  return out;
}

// ---------------------------------------------------------------------
// Chapitre 1
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  1, "Découvrir la démarche technologique et les outils numériques",
  [
    "stockage local", "cloud", "octet", "Bluetooth", "capteur", "actionneur",
    "démarche technologique / besoin",
  ],
  [
    "b) un objet conçu par l'être humain pour répondre à un besoin",
    "c) le cloud",
    "b) 8 bits",
    "b) le Bluetooth",
    "b) Identifier le besoin",
  ],
  ["e", "f", "a", "b", "c", "d"],
  [
    "L'élève applique les 6 étapes de la démarche technologique (identifier → rechercher → choisir/préparer → " +
    "réaliser → tester/évaluer → améliorer) à un besoin d'accès à l'électricité ; toute solution cohérente et " +
    "réaliste (panneau solaire partagé, point de recharge communautaire...) est acceptée si les étapes sont bien suivies.",
    "L'élève explique le risque de perte totale des données en cas de perte/panne d'un support unique ; " +
    "mention attendue de la sauvegarde en plusieurs endroits (ex. local + cloud).",
    "Tout exemple cohérent est accepté (ex. un détecteur de mouvement qui déclenche une lumière automatique, " +
    "un thermostat qui déclenche un ventilateur...), du moment que capteur et actionneur sont correctement distingués.",
    "L'élève doit refuser de brancher la clé trouvée et expliquer le risque (virus, perte de données) ; " +
    "réponse attendue en lien avec l'encadré SÉCURITÉ du chapitre.",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 2
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  2, "Les métiers de la mer : outils et organisation",
  [
    "navigant", "non navigant", "filet", "GPS", "gilet de sauvetage",
    "organisation sociale", "marché", "écosystème marin",
  ],
  [
    "c) agent maritime",
    "b) communiquer avec d'autres bateaux ou le port",
    "a) déplacer des personnes ou des marchandises par bateau",
    "b) les conditions météorologiques et l'état de son matériel",
    "b) parce que la ressource n'est pas illimitée et doit se renouveler",
  ],
  ["c", "a", "b", "f", "d", "e"],
  [
    "L'élève choisit un métier étudié (mer, tourisme ou non navigant) et explique son lien avec la ressource " +
    "marine (pêche, transport, accueil de visiteurs liés au littoral...).",
    "Réponse centrée sur la nécessité de répartir les tâches avant/pendant/après pour que l'activité se déroule " +
    "efficacement et en sécurité.",
    "L'élève conseille de toujours vérifier la météo, en s'appuyant sur l'encadré SÉCURITÉ du chapitre.",
    "Toute action réaliste et sûre est acceptée (ramassage de déchets, sensibilisation, limitation du gaspillage...).",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 3
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  3, "Le recyclage des objets techniques",
  [
    "cycle de vie", "recyclable", "collecte", "tri", "traitement",
    "revalorisation", "réemploi", "ingénieur environnement",
  ],
  [
    "b) sa fabrication, son utilisation et sa fin de vie",
    "b) la collecte",
    "c) le camion à bascule",
    "b) réemploi",
    "b) boucher les canaux d'évacuation d'eau",
  ],
  ["d", "a", "f", "c", "b", "e"],
  [
    "L'élève décrit un objet de son choix à travers ses grandes étapes : fabrication, utilisation, fin de vie.",
    "Le recyclage transforme un déchet en matière/nouvel objet (processus en 4 étapes) ; le réemploi donne " +
    "directement un nouvel usage à l'objet, sans transformation complète.",
    "Toute action réaliste est acceptée (mise en place d'un tri sélectif, sensibilisation des élèves...).",
    "L'élève déconseille de manipuler des objets cassés ou inconnus trouvés dans la rue, en s'appuyant sur " +
    "l'encadré SÉCURITÉ du chapitre.",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 4
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  4, "Les métiers de l'agriculture : outils et organisation",
  [
    "production végétale", "éleveur", "pioche", "motoculteur", "engrais",
    "herbicide", "organisation sociale", "récolte",
  ],
  [
    "c) éleveur",
    "b) mécanisé",
    "b) un adulte formé",
    "b) protéger les cultures",
    "b) ils peuvent avoir des conséquences sur l'environnement s'ils sont mal utilisés",
  ],
  ["c", "f", "a", "b", "d", "e"],
  [
    "L'élève choisit un métier agricole étudié et explique le besoin qu'il satisfait (alimentation, revenus...).",
    "L'organisation permet de répartir les tâches (préparation, entretien, récolte) et d'éviter les pertes.",
    "L'élève déconseille l'usage seul d'un motoculteur inconnu, en s'appuyant sur l'encadré SÉCURITÉ du chapitre.",
    "Toute action réaliste est acceptée (compost, réduction de l'usage de produits phytosanitaires, paillage...).",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 5
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  5, "Découvrir l'entreprise",
  [
    "bien", "service", "entreprise individuelle", "coopérative", "PME",
    "secteur primaire", "secteur tertiaire", "ressources",
  ],
  [
    "b) un bien ou un service pour répondre à un besoin",
    "c) une réparation de vélo",
    "b) un groupe de personnes qui gèrent ensemble une activité",
    "b) transforment des matières en produits",
    "b) tient compte de sa communauté et de son environnement",
  ],
  ["c", "a", "f", "b", "d", "e"],
  [
    "L'élève choisit une entreprise connue et identifie le besoin satisfait (bien ou service).",
    "Même petite, une entreprise a besoin de rôles complémentaires (diriger, produire, vendre).",
    "Toute proposition réaliste et sûre est acceptée (petit service ou bien utile à l'école).",
    "L'entreprise dépend de sa communauté (clients) et de ses ressources naturelles ; en tenir compte assure sa " +
    "durabilité et sa bonne réputation.",
  ],
));

// ---------------------------------------------------------------------
// Chapitre 6
// ---------------------------------------------------------------------
children.push(...chapitreCorrige(
  6, "Projet de synthèse ETAP — 7e AF",
  [
    "besoin", "comparer", "fiche projet", "rôles", "présentation",
    "solution", "autoévaluation", "sécurité",
  ],
  [
    "b) l'identification d'un besoin",
    "b) pour choisir la solution la plus adaptée au besoin",
    "a) fabriquer une affiche en papier et carton propre",
    "b) le besoin, la démarche, le résultat, les difficultés et les apprentissages",
    "a) comprendre ce qui a fonctionné et ce qui peut être amélioré",
  ],
  ["c", "b", "d", "e", "a"],
  [
    "Réponse libre, cohérente avec un besoin réel de l'école et une piste de projet parmi les 5 proposées (section 6.3).",
    "La sécurité protège les élèves des risques réels, même dans un cadre scolaire simple (matériaux propres, supervision).",
    "Réponse libre : réemploi de matériaux, absence de gaspillage, choix responsable des ressources.",
    "Réponse libre et réaliste, cohérente avec le projet présenté par l'élève.",
  ],
));

await buildAndSave(children, 87, "Manuel_ETAP_7AF_CorrigeGeneral.docx");
