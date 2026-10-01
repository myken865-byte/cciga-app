// Manuel d'EC 9e AF — Phase Finale : Examen blanc / Simulation finale
// (section 8 du Prompt Maître Phase Finale).
//
// CRÉATION ORIGINALE, présentée clairement comme telle — jamais comme un
// examen officiel. La structure en 3 parties (40/40/20 points) reprend le
// FORMAT documenté et vérifié en Phase 0 pour le Texte modèle EC 9e AF
// juillet 2024 (`07_INVENTAIRE_EXAMENS_EC_9AF.md`, `08_MATRICE_EXIGENCES_
// EVALUATION_EC_9AF.md`, déjà cités comme [OFFICIEL - SOURCE MENFP
// VÉRIFIÉE] dans les 7 chapitres, notamment le Chapitre 3). Aucun énoncé du
// Texte modèle n'est reproduit ou paraphrasé : toutes les questions
// ci-dessous sont des créations 100% originales. La durée indicative n'a
// PAS été vérifiée sur une source officielle : elle est donc présentée
// comme un choix pédagogique interne, distinct de la structure en points.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, threeColTable, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE, BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE, OR_CITOYEN, ANTHRACITE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "EXAMEN BLANC / SIMULATION — CRÉATION ORIGINALE", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(calloutBox(
  "Traçabilité — statut de cette épreuve",
  [
    "Cette épreuve est une CRÉATION ORIGINALE propre à ce manuel. Elle n'est en aucun cas un examen officiel " +
    "MENFP, ni une reproduction du Texte modèle EC 9e AF (juillet 2024, MENFP/DEF/BUNEXE, statut [TEXTE " +
    "MODÈLE], reproduction [DROITS / SOURCE À RÉGLER]).",
    "Structure reprise (FORMAT seulement) : 3 parties, 100 points au total (40 + 40 + 20), conforme au format " +
    "documenté et vérifié en Phase 0 pour le Texte modèle 2024 [OFFICIEL — SOURCE MENFP VÉRIFIÉE, cohérent " +
    "avec la correspondance déjà documentée au Chapitre 3]. Aucun énoncé du Texte modèle n'est reproduit ou " +
    "paraphrasé de façon reconnaissable : toutes les questions ci-dessous sont des créations 100 % originales.",
    "Durée indicative : 2 heures. Cette durée n'a PAS été vérifiée sur une source officielle disponible : elle " +
    "constitue un choix pédagogique interne, distinct du format en points ci-dessus, et clairement identifié " +
    "comme tel.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(240));

// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Partie I — Questions à choix multiple (40 points, 10 questions, 4 points chacune)", ""));
children.push(bodyPar("Entoure la bonne réponse. Chaque question porte sur une unité différente du programme.", { italics: true }));
children.push(spacer(160));
children.push(numberedPar("1. Le patrimoine mondial reconnaît des biens ayant une valeur exceptionnelle pour : (a) un seul quartier (b) une seule nation (c) l'humanité entière"));
children.push(numberedPar("2. La citoyenneté légale est un statut reconnu par : (a) une opinion personnelle (b) un État (c) une tradition familiale"));
children.push(numberedPar("3. L'impôt est un prélèvement : (a) volontaire et sans règle précise (b) obligatoire, fixé par la loi (c) réservé aux seules entreprises"));
children.push(numberedPar("4. Financer une route publique grâce aux recettes fiscales illustre principalement le rôle : (a) financier de l'impôt (b) social de l'impôt (c) culturel de l'impôt"));
children.push(numberedPar("5. Une société inclusive est une société qui permet à chaque personne, quelles que soient ses différences, de : (a) participer pleinement (b) être écartée si nécessaire (c) rester invisible"));
children.push(numberedPar("6. La cour de cassation a pour rôle principal de : (a) rejuger entièrement les faits (b) vérifier la bonne application de la loi (c) remplacer le tribunal de paix"));
children.push(numberedPar("7. Face à un désaccord simple entre deux personnes, la démarche maîtrisée recommande de commencer par : (a) saisir directement la justice (b) tenter le dialogue et la négociation (c) ignorer le désaccord"));
children.push(numberedPar("8. Une institution de sécurité légitime doit notamment : (a) agir sans aucun contrôle (b) rendre compte de ses actions (c) refuser tout encadrement par la loi"));
children.push(numberedPar("9. La coopération internationale en matière de sécurité et de paix implique notamment : (a) uniquement l'armée nationale (b) des institutions internationales et des ONG (c) aucune institution étrangère"));
children.push(numberedPar("10. Le développement durable vise à répondre aux besoins du présent : (a) sans se soucier de l'avenir (b) sans compromettre les générations futures (c) uniquement à l'échelle locale"));
children.push(spacer(240));

// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Partie II — Analyse citoyenne (40 points)", ""));

children.push(subHeading("Question 6 — Classement d'attitudes citoyennes (20 points)"));
children.push(bodyPar(
  "Classe chacune des attitudes suivantes en « citoyen(ne) engagé(e) » ou « citoyen(ne) irresponsable », en " +
  "justifiant brièvement chaque choix (4 points par attitude).",
  { italics: true },
));
children.push(numberedPar("(a) Signaler poliment, à la direction d'une école, un manque d'accessibilité pour les élèves à mobilité réduite."));
children.push(numberedPar("(b) Refuser tout dialogue face à un désaccord avec un camarade de classe."));
children.push(numberedPar("(c) Participer à un projet communautaire de reboisement organisé dans son quartier."));
children.push(numberedPar("(d) Se moquer publiquement d'une personne en difficulté."));
children.push(numberedPar("(e) Accepter un appui technique international pour améliorer un projet local respectueux de l'environnement."));
children.push(spacer(200));

children.push(subHeading("Question 7 — Question ouverte : inégalités sociales et actions citoyennes (20 points)"));
children.push(bodyPar(
  "Choisis une inégalité sociale parmi celles étudiées dans ce manuel (discrimination liée au genre, école non " +
  "inclusive, accès limité aux soins). Décris brièvement une situation illustrant cette inégalité, sans viser " +
  "un lieu ou une personne précise (8 points), puis propose DEUX actions concrètes et argumentées que l'État " +
  "pourrait mettre en place pour la réduire (6 points chacune).",
  { italics: true },
));
children.push(spacer(240));

// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Partie III — Compréhension de textes documentaires (20 points)", ""));
children.push(bodyPar(
  "Les deux textes ci-dessous sont des créations originales pour cette épreuve, dans l'esprit des textes " +
  "documentaires étudiés au Chapitre 3 — ils ne reproduisent aucun texte déjà présenté dans ce manuel ni " +
  "aucun énoncé du Texte modèle 2024.",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DOCUMENTAIRE D — Pourquoi la loi encadre-t-elle l'impôt ?",
  [
    "« Si chaque citoyen pouvait décider librement du montant et du moment de sa contribution, les recettes " +
    "collectées seraient imprévisibles, et les services publics (écoles, routes, hôpitaux) risqueraient de " +
    "manquer de financement stable. C'est pourquoi la loi fixe des règles précises et communes à tous : elle " +
    "garantit que chacun contribue selon des critères connus à l'avance, et que l'État peut prévoir ses " +
    "dépenses pour l'année. »",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DOCUMENTAIRE E — Un choix budgétaire",
  [
    "« Une municipalité doit choisir, avec les recettes fiscales disponibles cette année, entre agrandir un " +
    "centre de santé déjà existant ou construire une nouvelle route reliant deux quartiers isolés. Les deux " +
    "projets sont utiles, mais le budget ne permet pas de financer les deux entièrement. Après consultation, " +
    "la municipalité choisit de prioriser l'agrandissement du centre de santé, jugé plus urgent pour la " +
    "population. »",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(numberedPar("1. D'après le Texte documentaire D, pourquoi la loi doit-elle fixer les règles de l'impôt plutôt que de laisser chacun décider librement ? (7 points)"));
children.push(numberedPar("2. D'après le Texte documentaire E, quel choix budgétaire est présenté, et quel rôle de l'impôt (financier, économique ou social) ce choix illustre-t-il le mieux ? (7 points)"));
children.push(numberedPar("3. En t'appuyant sur les deux textes, explique le lien entre la loi, l'impôt et la solidarité nationale. (6 points)"));
children.push(spacer(280));

// =======================================================================
// CORRIGÉ ET BARÈME
// =======================================================================
children.push(pageBreak());
children.push(new Paragraph({
  spacing: { after: 240 },
  children: [new TextRun({ text: "Corrigé et barème détaillé de l'examen blanc", bold: true, color: BLEU_CIVIQUE, size: 34 })],
}));
children.push(bodyPar(
  "Comme pour les corrigés de chapitre, les réponses aux questions ouvertes sont fournies comme éléments de " +
  "réponse attendus, pas comme formulation unique obligatoire.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — Corrigé (40 points, 4 points par question)"));
children.push(numberedPar("1. (c)  —  2. (b)  —  3. (b)  —  4. (a)  —  5. (a)  —  6. (b)  —  7. (b)  —  8. (b)  —  9. (b)  —  10. (b)"));
children.push(spacer(200));

children.push(subHeading("Partie II — Corrigé (40 points)"));
children.push(bodyPar("Question 6 (20 points, 4 points par attitude, réponse + justification) :", { bold: true }));
children.push(numberedPar("(a) citoyen(ne) engagé(e) — signaler poliment un problème à l'autorité compétente est une démarche constructive."));
children.push(numberedPar("(b) citoyen(ne) irresponsable — refuser tout dialogue empêche la résolution du désaccord."));
children.push(numberedPar("(c) citoyen(ne) engagé(e) — participer à un projet collectif utile à la communauté."));
children.push(numberedPar("(d) citoyen(ne) irresponsable — se moquer d'une personne en difficulté est contraire au respect dû à autrui."));
children.push(numberedPar("(e) citoyen(ne) engagé(e) — accepter un appui utile illustre la complémentarité local/international étudiée au Chapitre 7."));
children.push(spacer(160));
children.push(bodyPar("Question 7 (20 points, éléments de réponse attendus) :", { bold: true }));
children.push(numberedPar("Situation (8 points) : description générale et respectueuse d'une des trois inégalités sociales étudiées (genre, éducation, santé), sans viser un lieu ou une personne précise."));
children.push(numberedPar("Deux actions (6 points chacune) : deux propositions distinctes, réalistes, clairement justifiées et adressées à l'État de façon respectueuse — par exemple, pour l'inégalité d'accès aux soins : (1) renforcer la présence de services de santé de proximité dans les zones les moins desservies, avec justification ; (2) soutenir la formation de personnel de santé supplémentaire, avec justification."));
children.push(spacer(200));

children.push(subHeading("Partie III — Corrigé (20 points)"));
children.push(numberedPar("1. (7 points) Parce que sans règles communes fixées par la loi, les contributions seraient imprévisibles et les services publics risqueraient de manquer d'un financement stable ; la loi garantit des critères connus à l'avance pour tous."));
children.push(numberedPar("2. (7 points) La municipalité choisit de prioriser l'agrandissement du centre de santé plutôt que la construction d'une route, faute de budget suffisant pour les deux — ce choix illustre principalement le rôle social de l'impôt (répondre à un besoin jugé prioritaire pour la population), avec une dimension financière (gestion d'un budget limité)."));
children.push(numberedPar("3. (6 points) La loi encadre l'impôt pour qu'il soit prélevé équitablement auprès de tous ; les recettes ainsi collectées sont ensuite redistribuées à travers des choix budgétaires (comme celui du Texte E) qui profitent à la collectivité — c'est ce mécanisme, encadré par la loi, qui rend concrète la solidarité nationale."));
children.push(spacer(240));

children.push(calloutBox(
  "Barème récapitulatif",
  [
    "Partie I — QCM : 40 points.",
    "Partie II — Analyse citoyenne (classement + question ouverte) : 40 points.",
    "Partie III — Compréhension de textes documentaires : 20 points.",
    "TOTAL : 100 points. Durée indicative interne : 2 heures (choix pédagogique, non issu d'une source " +
    "officielle vérifiée).",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));

await buildAndSave(children, 102, "Manuel_EC_9AF_ExamenBlanc.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\11_EVALUATION_FINALE");
