// Manuel d'EEA 9e AF — Annexes : documents d'examen identifiés
// (Phase Finale, section ANNEXES, distincte des chapitres).
//
// Conforme au plan verrouille en Phase 0
// (00_PHASE0/14_PLAN_CORRIGES_ET_PREPARATION_EXAMEN_EEA.md, "Annexes —
// documents d'examen a statut particulier") et a l'inventaire
// (00_PHASE0/13_INVENTAIRE_EXAMENS_EEA_9AF_2024_2025_2026.md).
//
// STATUT DE REPRODUCTION NON RESOLU : l'inventaire de Phase 0 marque
// explicitement les deux documents identifies "DROITS / SOURCE A REGLER"
// — en-tete MENFP/BUNEXE authentique pour le Document 1, mais obtenu via
// une plateforme tierce (haitilibre.com) sans confirmation explicite
// d'autorisation de republication ; origine institutionnelle non confirmee
// pour le Document 2 (Scribd). Aucun des deux textes n'est donc reproduit
// integralement ici. Seules les METADONNEES (titre exact, annee, organisme,
// statut affiche, source, contenu resume fidelement) sont presentees,
// conformement a la regle du Plan Phase 0 : "Dans le cas contraire [droits
// non confirmes], seule une description/analyse de sa structure et de ses
// themes (sans reproduction integrale de son texte) sera utilisee".
//
// Statuts affiches conserves EXACTEMENT tels quels : "Texte modele", jamais
// requalifie "examen officiel" ni "examen blanc" en epreuve officielle.
import {
  bodyPar, subHeading, bulletPar,
  spacer, pageBreak, threeColTable,
  buildAndSave, AlignmentType, TextRun, Paragraph, OUTREMER,
  calloutBox, BOX_SECURITE_FILL, BOX_SECURITE_LINE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "ANNEXES — DOCUMENTS D'EXAMEN IDENTIFIÉS", bold: true, size: 36, color: OUTREMER, font: "Calibri" })],
}));
children.push(bodyPar(
  "Cette section rassemble les documents d'examen EEA 9e AF identifiés lors de la recherche documentaire de " +
  "Phase 0 (recherche menée le 22 août 2026). Elle ne contient aucune reproduction intégrale de ces " +
  "documents : leurs droits de reproduction n'étant pas confirmés au moment de la rédaction, seules leurs " +
  "métadonnées et une description fidèle de leur structure sont présentées ici, conformément à la règle " +
  "établie dès la Phase 0 du projet.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ANNEXE À FOURNIR / DROITS À VÉRIFIER",
  [
    "Les textes intégraux des documents ci-dessous ne sont pas reproduits dans ce manuel.",
    "Si leurs droits de reproduction sont confirmés dans le futur (autorisation directe du MENFP/BUNEXE), " +
    "ils pourront être intégrés en annexe avec leur statut affiché conservé tel quel.",
    "En attendant, la section « Préparation à l'examen » de ce manuel s'appuie uniquement sur les thèmes et " +
    "le niveau de difficulté observés dans ces documents, pour construire des épreuves entièrement " +
    "originales.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Document 1 — « Texte modèle » EEA 9e AF, juillet 2024"));
children.push(threeColTable(
  ["Champ", "Valeur", ""],
  [
    ["Titre exact affiché", "« EXAMENS DE 9ème ANNÉE FONDAMENTALE (JUILLET 2024) » — Matière : Éducation esthétique et artistique — mention « Texte modèle »", ""],
    ["Année", "Juillet 2024", ""],
    ["Organisme (en-tête imprimé)", "Ministère de l'Éducation Nationale et de la Formation Professionnelle — Bureau National des Examens d'État / Direction de l'Enseignement Fondamental", ""],
    ["Statut affiché", "Texte modèle (conservé tel quel — jamais requalifié « examen officiel »)", ""],
    ["Source", "haitilibre.com (plateforme tierce, pas le site officiel menfp.gouv.ht)", ""],
    ["Statut de reproduction", "DROITS / SOURCE À RÉGLER — non reproduit intégralement dans ce manuel", ""],
  ],
  [2600, 6600, 200],
));
children.push(spacer(160));
children.push(bodyPar("Structure et thèmes (résumé fidèle, sans reproduction des énoncés) :", { bold: true }));
children.push(bulletPar("Durée indicative : 1 heure."));
children.push(bulletPar("Partie I — 4 questions à choix multiples : éléments de base en arts plastiques, technique du pointillisme, peinture pariétale préhistorique, ISPAN (Institut de Sauvegarde du Patrimoine National)."));
children.push(bulletPar("Partie II — 3 questions à compléter : couleurs primaires, choix de couleurs pour une affiche de sensibilisation, un site patrimonial haïtien classé UNESCO."));
children.push(bulletPar("Partie III — 3 questions ouvertes courtes : un compositeur haïtien et le genre musical qu'il a créé, raisons de conserver les sites historiques, production graphique personnelle à partir de formes géométriques."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Document 2 — « Texte Modèle 2025 » EEA 9e AF"));
children.push(threeColTable(
  ["Champ", "Valeur", ""],
  [
    ["Titre exact affiché", "« Examen 9ème 2025 : Modèle et Questions » — fichier « EEA 9e AF_ Texte Modèle 2025 »", ""],
    ["Année", "2025", ""],
    ["Organisme", "Aucun en-tête institutionnel visible ; document mis en ligne par un particulier", ""],
    ["Statut affiché", "Texte modèle (par son propre titre — conservé tel quel)", ""],
    ["Source", "scribd.com (plateforme tierce)", ""],
    ["Statut de reproduction", "DROITS / SOURCE À RÉGLER — origine institutionnelle non confirmée — [DOCUMENT À CONFIRMER]", ""],
  ],
  [2600, 6600, 200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Sujet (résumé non vérifié en détail, contenu intégral non extrait) : porterait sur la musique haïtienne, " +
  "ses figures emblématiques et les liens avec les traditions musicales africaines.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Documents complémentaires identifiés (ressources pédagogiques, non des épreuves)"));
children.push(threeColTable(
  ["Document", "Nature", "Statut"],
  [
    ["« Contenus Essentiels EEA 2025 »", "Résumé de contenus/révision", "[DOCUMENT À CONFIRMER] — ressource tierce"],
    ["« Cours - EEA - 9AF - MENFP - Vladimyr Fleury »", "Notes de cours attribuées à un individu", "[DOCUMENT À CONFIRMER] — auteur individuel malgré le nom de fichier"],
    ["« Syllabus EEA pour 9ème A.F. en Haïti »", "Syllabus/plan de cours", "[DOCUMENT À CONFIRMER]"],
    ["« Test pré-évaluation officielle 9e AF » (hpninfo.com)", "Article de presse sur une démarche DEF/MENFP", "[SOURCE INSTITUTIONNELLE INDIRECTE] — article rapportant la démarche, pas le document lui-même"],
  ],
  [3600, 3200, 2600],
));
children.push(spacer(200));

children.push(subHeading("Source explicitement écartée"));
children.push(bodyPar(
  "Éditions JPL (éditeur commercial privé proposant des « modèles d'examens officiels du MENFP ») — non " +
  "utilisée comme preuve d'authenticité officielle, conformément à la règle déjà appliquée aux collections " +
  "EPS et ETAP de ce projet.",
  { italics: true },
));

await buildAndSave(
  children,
  83,
  "Manuel_EEA_9AF_Annexes.docx",
  "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\12_ANNEXES",
);
