// Manuel d'EC 7e AF — Phase Finale : Corrigés des exercices (Chapitres 1-7).
//
// Chaque réponse correspond exactement à une consigne existante dans les
// scripts build-chapitre1.mjs à build-chapitre7.mjs (vérifiés ligne par
// ligne avant rédaction de ce fichier). Aucun exercice inventé, aucune
// consigne ambiguë identifiée. Pour les réponses ouvertes (Exercices C et
// D de chaque chapitre), ce corrigé fournit des éléments de réponse
// attendus / critères, pas une formulation unique obligatoire — cohérent
// avec la section 1 du Prompt Maître Phase Finale.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE, OR_CITOYEN, ANTHRACITE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Corrigés des exercices", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(bodyPar(
  "Ce corrigé couvre l'ensemble des exercices des 7 chapitres du Manuel d'EC 7e AF. Pour les questions " +
  "fermées (compréhension, vrai/faux, association), la réponse exacte est fournie, avec justification " +
  "lorsqu'utile. Pour les questions ouvertes (argumentation, analyse, proposition d'action), des éléments de " +
  "réponse attendus sont fournis à titre de repère pédagogique — d'autres formulations correctes et bien " +
  "justifiées par l'élève restent acceptables.",
  { italics: true },
));
children.push(spacer(240));

function chapterCorrige(num, titre) {
  children.push(pageBreak());
  children.push(sectionHeading(`Chapitre ${num} — ${titre}`, ""));
}

function exoHeading(label) {
  children.push(subHeading(label));
}

function rep(text) {
  children.push(numberedPar(text));
}

// =======================================================================
chapterCorrige(1, "Moi, Haïtien : nation et identité");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. nation");
rep("2. symbole national");
rep("3. patrimoine");
rep("4. territoire");
rep("5. citoyenneté");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Département → arrondissement → commune → section communale (du plus grand au plus proche du quotidien).");
rep("2. Faux. Le patrimoine comprend aussi le patrimoine naturel et culturel (traditions, lieux, savoir-faire), pas seulement des monuments très anciens.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Nommer un symbole étudié (drapeau, hymne, devise ou armoiries) et expliquer qu'il permet à chaque citoyen de se reconnaître dans une même nation, quelle que soit sa région — favorisant ainsi l'unité nationale.");
rep("2. L'État légifère et protège juridiquement le patrimoine, mais son entretien concret au quotidien (respect, signalement, actions locales) repose sur l'engagement des citoyens — les deux niveaux sont complémentaires.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. L'élève identifie un monument ou lieu réel et explique le lien avec l'identité/l'unité nationales (histoire commune, symbole reconnu par la communauté).");
rep("2. Une action réaliste et proportionnée à l'échelle de la classe/école : campagne de sensibilisation, journée de nettoyage, recherche présentée aux autorités locales, etc.");
rep("3. Réponse attendue : rappeler que les symboles nationaux favorisent le sentiment d'appartenance et l'unité, utile au vivre-ensemble même si l'effet n'est pas immédiatement « pratique ».");
children.push(spacer(240));

// =======================================================================
chapterCorrige(2, "Citoyenne, citoyen : mes droits, mes devoirs");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. droit");
rep("2. devoir");
rep("3. constitution");
rep("4. citoyen");
rep("5. démocratie");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. (a)-(2) droit à l'éducation → devoir de fréquenter et respecter l'école ; (b)-(3) droit à la sécurité → devoir de respecter les règles communes ; (c)-(1) droit de s'exprimer → devoir de respecter l'écoute d'autrui.");
rep("2. Faux. La nationalité est un lien juridique ; la citoyenneté active suppose en plus de connaître et d'exercer ses droits/devoirs, ce qui ne va pas toujours de soi (âge, connaissance, participation).");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Exemple attendu : un droit reconnu par un texte (ex. droit à l'éducation) peut, dans les faits, être limité par des obstacles concrets (distance, coût, disponibilité de l'école).");
rep("2. Ce vocabulaire permet de nommer précisément les institutions et mécanismes qui organisent la vie collective, condition nécessaire pour comprendre et participer à la citoyenneté.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Argumentaire attendu : décrire l'écart entre le droit reconnu et son exercice réel (eau, logement, emploi) et proposer au moins une recommandation concrète aux autorités (ex. amélioration de l'accès à l'eau potable).");
rep("2. Action réaliste : affiche, discussion en famille, message à des camarades, présentation en classe — reliée explicitement à un droit social précis.");
rep("3. Réponse attendue : un droit non respecté quelque part concerne la collectivité entière car il révèle une inégalité que la solidarité citoyenne peut aider à réduire.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(3, "Vivre dans un État démocratique");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. État démocratique");
rep("2. élection");
rep("3. représentant");
rep("4. coopérative");
rep("5. participation citoyenne");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Ordre correct : s'informer → réfléchir → voter → accepter le résultat.");
rep("2. Faux. La démocratie est une « conquête au quotidien » : elle demande une attention continue (écoute, participation, respect des règles), pas seulement lors des élections.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. La démocratie doit être entretenue chaque jour par des gestes concrets (écoute, respect du résultat, participation), pas seulement acquise une fois pour toutes.");
rep("2. Exemples attendus : écouter un point de vue différent, respecter un résultat de vote, participer activement à une réunion de classe.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Règles possibles : temps de parole égal pour chaque candidat, un seul vote par élève (vérifié), vote secret ou encadré pour éviter la pression.");
rep("2. Étapes attendues : définir le rôle de la coopérative, élire un petit comité, fixer des règles simples, prévoir un temps de réunion régulier.");
rep("3. Réponse attendue : la démocratie continue après le vote — écoute, participation, entretien des règles communes restent nécessaires au quotidien.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(4, "Toi comme moi : le principe d'égalité");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. dignité");
rep("2. tolérance");
rep("3. égalité");
rep("4. inégalité");
rep("5. liberté d'expression");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Trois libertés parmi : circulation (se déplacer), pensée (former sa propre opinion), conscience/religion (croire ou non selon son choix), opinion/expression (exprimer ce que l'on pense) — avec un exemple concret pour chacune.");
rep("2. Faux. La tolérance signifie respecter une différence, pas nécessairement être d'accord avec elle.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Une classe où chacun participe et s'exprime respecte davantage l'égalité entre élèves, car le droit à l'éducation inclut la possibilité de participer, pas seulement d'être présent.");
rep("2. Ils permettent aux citoyens d'accéder à des informations fiables et de se forger leur propre opinion, condition nécessaire à une participation citoyenne éclairée.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Deux actions parmi : sensibilisation (affiche, message), soutien scolaire entre pairs, dialogue avec la famille concernée, relais vers un adulte/une institution compétente — cohérentes avec l'évaluation officielle « réduire les inégalités ».");
rep("2. Réponse ouverte : un message clair et positif relié à un droit précis (ex. « Chaque enfant a le droit d'apprendre »), avec une justification du choix visuel.");
rep("3. Réponse attendue : la dignité et le respect sont dus à toute personne, indépendamment des différences ; ne pas respecter quelqu'un à cause d'une différence est contraire au principe d'égalité étudié.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(5, "Résoudre les conflits, vivre ensemble");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. conflit");
rep("2. dialogue");
rep("3. négociation");
rep("4. objectivité");
rep("5. paix sociale");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. (a) plutôt positif — le désaccord est géré par la discussion calme et mène à une amélioration ; (b) plutôt négatif — le désaccord dégénère sans recherche de compréhension mutuelle.");
rep("2. Faux. Admettre un point de vue différent signifie le respecter et le comprendre, pas nécessairement le partager.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Les quatre étapes : (1) chacun explique calmement ce qu'il ressent/souhaite ; (2) on reformule pour vérifier la compréhension ; (3) on cherche une solution tenant compte des deux points de vue ; (4) on vérifie après un moment que la solution fonctionne.");
rep("2. Exemple de fait : « Il a plu hier dans cette commune » (vérifiable). Exemple d'opinion : « Cette décision était une mauvaise idée » (jugement personnel).");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Application de la méthode en 4 étapes au conflit de voisinage : écouter chaque partie, reformuler, chercher un compromis (ex. horaires de bruit acceptés par les deux), vérifier ensuite.");
rep("2. Conseil attendu : vérifier la source de l'information, chercher si elle est confirmée par plusieurs sources indépendantes avant de la considérer comme un fait et de la répéter.");
rep("3. Réponse attendue : un moment régulier dédié au dialogue permet de résoudre les petits désaccords avant qu'ils ne s'aggravent, contribuant à un climat de classe plus paisible.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(6, "Paix, protection et sécurité au quotidien");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. sécurité");
rep("2. institution");
rep("3. risque");
rep("4. consigne");
rep("5. protection");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. (a)-(2) Police Nationale d'Haïti → maintenir l'ordre public ; (b)-(1) Direction de la Protection Civile → préparer et répondre aux risques naturels.");
rep("2. Faux. La sécurité concerne tout le monde, y compris les élèves, à travers des gestes quotidiens de vigilance et de prudence.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Danger : tremblement de terre / risque de chute d'objets près des fenêtres. Action : s'éloigner des fenêtres et s'abriter sous une table solide. Personne à prévenir : un adulte, dès que possible après l'événement.");
rep("2. La sécurité individuelle (gestes personnels prudents) et la sécurité collective (respect de règles communes, institutions) se renforcent mutuellement.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Réponse attendue : rester prudent, ne pas s'approcher, informer un adulte ou, si la situation semble réellement dangereuse, une institution compétente (ex. Police Nationale d'Haïti).");
rep("2. Consigne originale respectant les trois éléments (danger/action/personne à prévenir), par exemple sur la circulation devant l'école.");
rep("3. Réponse attendue : rappeler que la sécurité repose aussi sur la vigilance et les gestes de chaque citoyen, la police n'étant qu'une des institutions impliquées.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(7, "Protéger notre environnement");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. bien collectif");
rep("2. patrimoine naturel");
rep("3. préservation");
rep("4. entretien");
rep("5. intérêt collectif");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Un arbre centenaire → patrimoine naturel ; une fête traditionnelle du quartier → patrimoine culturel ; un fort ancien → patrimoine historique.");
rep("2. Faux. La préservation d'un bien collectif est une responsabilité partagée entre les autorités et les citoyens.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. L'espace vert profite à toute la communauté scolaire, sans appartenir à un seul élève : c'est un bien collectif.");
rep("2. Deux gestes parmi : ne pas jeter de déchets, participer à l'entretien, signaler une dégradation, sensibiliser d'autres personnes.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Répartition réaliste : l'administration fournit les moyens/outils, les élèves assurent un entretien régulier par petits groupes tournants.");
rep("2. Étapes attendues : choisir l'emplacement, choisir des plantes locales, répartir les responsabilités d'entretien, présenter le projet.");
rep("3. Réponse attendue : un bien collectif appartient à tous ; un geste individuel négatif a un effet réel sur la communauté entière, même si l'auteur ne le voit pas directement.");

await buildAndSave(children, 67, "Manuel_EC_7AF_CorrigeGeneral.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\06_CORRIGE_GENERAL");
