// Manuel d'EC 9e AF — Phase Finale : Préparation finale à l'examen d'État
// (section 5 du Prompt Maître Phase Finale).
//
// Reprend, de façon transversale, les contenus réellement enseignés dans
// les 7 chapitres. N'annonce jamais qu'un thème précis "tombera" à
// l'examen — se limite à des méthodes, un rappel structuré et des
// exercices d'entraînement originaux.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, threeColTable, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BLEU_CIVIQUE, OR_CITOYEN, ANTHRACITE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Préparation finale à l'examen d'État", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(bodyPar(
  "Cette section rassemble, de façon transversale, les sept unités du programme d'Éducation à la Citoyenneté " +
  "de 9e AF réellement enseignées dans ce manuel. Elle propose des fiches de révision, des méthodes de travail " +
  "et des exercices originaux. Aucun thème précis n'est annoncé comme devant « tomber » à l'examen : cette " +
  "section prépare une maîtrise générale des compétences du cycle, pas une liste de pronostics.",
  { italics: true },
));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(sectionHeading("1. Fiches de révision synthétiques", ""));
children.push(threeColTable(
  ["Chapitre / Unité", "Notions essentielles", "Vocabulaire clé"],
  [
    ["1 — Citoyenne, citoyen du monde", "Trois échelles de citoyenneté (nationale, régionale, mondiale), patrimoine mondial, engagement universel", "citoyenneté mondiale, patrimoine mondial, engagement universel"],
    ["2 — Citoyen et citoyenneté, ici et dans le monde", "Citoyenneté légale/active, éthique citoyenne élargie, double portée des droits fondamentaux", "citoyenneté légale, citoyenneté active, éthique citoyenne"],
    ["3 — La loi, l'impôt et la solidarité nationale", "Loi légitime, État de droit, rôles financier/économique/social de l'impôt, redistribution", "loi, impôt, redistribution, solidarité nationale"],
    ["4 — Vers une société inclusive", "Société inclusive, protection sociale, inégalités sociales (genre, éducation, santé), actions argumentées", "société inclusive, protection sociale, discrimination, inégalité sociale"],
    ["5 — Résoudre les conflits, connaître la justice", "Démarche maîtrisée (dialogue → argumentaire → recours), institutions judiciaires, présomption d'innocence", "cour de cassation, institution chargée de faire respecter la loi"],
    ["6 — Sécurité nationale et coopération internationale", "Missions de défense du territoire, trois critères de légitimité institutionnelle, coopération internationale", "défense du territoire, légitimité institutionnelle, redevabilité"],
    ["7 — Développement durable et coopération internationale", "Synthèse des trois échelles environnementales, institutions internationales et ONG, bilan de projet", "développement durable, coopération internationale, ONG environnementale"],
  ],
  [2600, 4200, 2600],
));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("2. Erreurs fréquentes à éviter", ""));
children.push(bulletPar("Répondre « vrai » ou « faux » sans justifier : dans ce manuel, chaque question de ce type demande une justification courte — une réponse seule, même correcte, reste incomplète."));
children.push(bulletPar("Confondre citoyenneté légale et citoyenneté active (Chapitre 2) : la première est un statut, la seconde un comportement. Les deux peuvent exister séparément."));
children.push(bulletPar("Oublier qu'un rôle de l'impôt peut recouvrir plusieurs aspects à la fois (Chapitre 3) : un même exemple illustre parfois deux rôles (financier et social, par exemple) — il faut choisir celui qui correspond le mieux à la question posée."));
children.push(bulletPar("Généraliser une inégalité sociale à partir d'un seul exemple (Chapitre 4) : le manuel demande une analyse nuancée, sans stigmatiser un groupe ou une situation précise."));
children.push(bulletPar("Sauter directement à un recours institutionnel dans une analyse de conflit (Chapitre 5) : la démarche maîtrisée du manuel suit un ordre (dialogue → argumentaire → recours), qu'il faut respecter dans l'analyse."));
children.push(bulletPar("Confondre légitimité et efficacité (Chapitre 6) : une institution n'est pas légitime parce qu'elle agit vite ou avec force, mais parce qu'elle réunit un mandat légal, un encadrement par la loi et une redevabilité."));
children.push(bulletPar("Présenter une action locale comme inutile face à un enjeu mondial (Chapitre 7) : le manuel insiste au contraire sur la complémentarité entre échelle locale et échelle internationale."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("3. Méthode pour lire une consigne", ""));
children.push(numberedPar("1. Repère le verbe de consigne (Explique, Compare, Classe, Justifie, Propose...) : il indique le type de réponse attendue, pas seulement le thème."));
children.push(numberedPar("2. Compte le nombre d'éléments demandés (« deux raisons », « deux actions ») : une réponse incomplète, même juste, perd des points."));
children.push(numberedPar("3. Repère si la consigne demande une justification, une comparaison ou un simple rappel de connaissance — adapte la longueur de ta réponse en conséquence."));
children.push(numberedPar("4. Si la consigne fait référence à un texte ou à une étude de cas (« D'après le texte... »), ta réponse doit s'appuyer explicitement sur ce document, pas seulement sur tes connaissances générales."));
children.push(spacer(200));

children.push(sectionHeading("4. Méthode pour analyser un document (texte, tableau, situation)", ""));
children.push(numberedPar("1. Lis d'abord le document en entier, sans répondre, pour en comprendre le sens général."));
children.push(numberedPar("2. Identifie l'idée principale de chaque paragraphe ou de chaque colonne (pour un tableau)."));
children.push(numberedPar("3. Relis ensuite la question et repère, dans le document, les mots ou passages qui y répondent directement."));
children.push(numberedPar("4. Rédige ta réponse en citant ou en reformulant précisément l'élément du document qui la justifie, plutôt qu'une impression générale."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("5. Exercices transversaux originaux", ""));
children.push(bodyPar(
  "Ces exercices originaux relient volontairement plusieurs unités du cycle, pour t'entraîner à mobiliser " +
  "plusieurs chapitres en même temps — une compétence utile pour l'examen.",
  { italics: true },
));
children.push(numberedPar("1. Une commune décide de financer, grâce aux recettes fiscales (Chapitre 3), l'aménagement d'une école pour la rendre plus inclusive (Chapitre 4). Explique, en quelques lignes, le lien entre ces deux chapitres dans cette situation."));
children.push(numberedPar("2. Un projet de reboisement communautaire (Chapitre 7) fait l'objet d'un désaccord entre deux groupes d'habitants sur la répartition des tâches. Décris, en t'appuyant sur la démarche maîtrisée (Chapitre 5), les étapes que ces habitants devraient suivre pour résoudre ce désaccord."));
children.push(numberedPar("3. Explique, en t'appuyant sur les Chapitres 1 et 2, pourquoi la citoyenneté mondiale n'annule pas la citoyenneté légale nationale, mais s'y ajoute."));
children.push(numberedPar("4. Une ONG internationale (Chapitre 6 ou 7) intervient après une catastrophe naturelle, en coordination avec les institutions haïtiennes de sécurité (Chapitre 6). Explique en quoi cette situation illustre à la fois la légitimité institutionnelle et la coopération internationale."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("6. Série de questions courtes couvrant plusieurs unités", ""));
children.push(bodyPar(
  "Série originale, à traiter en temps limité (15-20 minutes), pour t'entraîner à répondre rapidement sur des " +
  "thèmes variés du cycle.",
  { italics: true },
));
children.push(numberedPar("1. Cite un exemple de patrimoine mondial haïtien (Chapitre 1)."));
children.push(numberedPar("2. Donne un exemple de citoyenneté active, distincte de la citoyenneté légale (Chapitre 2)."));
children.push(numberedPar("3. Cite les trois rôles de l'impôt (Chapitre 3)."));
children.push(numberedPar("4. Cite une des trois inégalités sociales étudiées et une action possible pour la réduire (Chapitre 4)."));
children.push(numberedPar("5. Cite les trois étapes de la démarche maîtrisée de résolution de conflit (Chapitre 5)."));
children.push(numberedPar("6. Cite les trois critères de légitimité institutionnelle (Chapitre 6)."));
children.push(numberedPar("7. Cite les trois échelles de protection de l'environnement étudiées sur le cycle (Chapitre 7)."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("7. Stratégies de gestion du temps et de vérification des réponses", ""));
children.push(calloutBox(
  "Avant l'épreuve",
  [
    "Relis les fiches de révision synthétiques et le vocabulaire clé de chaque chapitre plutôt que de relire " +
    "chaque chapitre en entier.",
    "Entraîne-toi avec les mini-évaluations des 7 chapitres et l'examen blanc de cette Phase Finale, dans des " +
    "conditions proches de l'épreuve réelle (temps limité, sans notes).",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(160));
children.push(calloutBox(
  "Pendant l'épreuve",
  [
    "Lis l'épreuve en entier avant de commencer à répondre, pour répartir ton temps entre les parties selon " +
    "leur barème.",
    "Commence par les questions dont tu es le plus sûr(e), puis reviens sur les questions plus difficiles.",
    "Pour une question de compréhension de texte, relis le passage concerné avant de répondre, plutôt que de " +
    "répondre de mémoire.",
    "Garde quelques minutes en fin d'épreuve pour vérifier que chaque partie de chaque consigne a bien reçu " +
    "une réponse (nombre d'éléments demandés, justification).",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(160));
children.push(calloutBox(
  "Après avoir répondu, avant de rendre",
  [
    "Relis chaque réponse en te demandant : « Ma réponse correspond-elle exactement à ce que demande la " +
    "consigne ? »",
    "Vérifie l'orthographe des mots de vocabulaire clé utilisés (ils sont souvent notés avec attention).",
    "Assure-toi qu'aucune question n'a été oubliée, y compris au verso d'une page.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));

await buildAndSave(children, 96, "Manuel_EC_9AF_PreparationExamenEtat.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\11_EVALUATION_FINALE");
