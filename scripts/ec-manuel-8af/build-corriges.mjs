// Manuel d'EC 8e AF — Phase Finale : Corrigés des exercices (Chapitres 1-7).
//
// Chaque réponse correspond exactement à une consigne existante dans les
// scripts build-chapitre1.mjs à build-chapitre7.mjs (relus ligne par ligne
// avant rédaction de ce fichier). Aucun exercice inventé, aucune consigne
// jugée ambiguë ou impossible à corriger sans source supplémentaire. Pour
// les réponses ouvertes (Exercices C et D), ce corrigé fournit des
// éléments de réponse attendus / critères, pas une formulation unique
// obligatoire.
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
  "Ce corrigé couvre l'ensemble des exercices des 7 chapitres du Manuel d'EC 8e AF. Pour les questions " +
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
function exoHeading(label) { children.push(subHeading(label)); }
function rep(text) { children.push(numberedPar(text)); }

// =======================================================================
chapterCorrige(1, "La nation haïtienne dans la Caraïbe");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. nation caribéenne");
rep("2. valeur universelle");
rep("3. région caribéenne");
rep("4. comparaison interculturelle");
rep("5. patrimoine partagé");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Deux nations parmi : République dominicaine, Cuba, Jamaïque (ou toute autre nation caribéenne mentionnée).");
rep("2. Faux. Comparer les symboles de deux nations sert à mieux comprendre chacune d'elles, sans les hiérarchiser.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Point commun attendu : les deux devises insistent sur l'unité (« L'Union fait la Force » / « D'un grand nombre, un seul peuple »).");
rep("2. Une valeur est dite universelle lorsqu'elle est reconnue comme importante pour l'ensemble de l'humanité, au-delà d'une seule nation ou culture (dignité, paix, justice...).");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Règle attendue : présenter chaque patrimoine avec respect, éviter tout jugement de valeur comparatif, valoriser les deux cultures également.");
rep("2. Réponse ouverte, cohérente : nation choisie, symbole ou lieu réel ou plausible, explication respectueuse.");
rep("3. Réponse attendue : connaître d'autres nations aide à mieux comprendre la sienne et à développer une ouverture utile au dialogue interculturel, sans minimiser l'importance de la nation haïtienne.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(2, "Citoyenneté et État : approfondir mes droits");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. droits civils et politiques");
rep("2. droits économiques et sociaux");
rep("3. économie informelle");
rep("4. obligation");
rep("5. plaidoyer");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Civils/politiques : droit de vote, liberté d'expression. Économiques/sociaux : droit à l'éducation, droit à la santé.");
rep("2. Faux. L'exercice effectif d'un droit économique dépend aussi de facteurs structurels (économiques, institutionnels), pas seulement de la personne concernée.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Le principe du droit au travail est reconnu par les textes ; l'obligation concrète de l'État est de favoriser la création d'emplois et la formation professionnelle — ce qui ne garantit pas à lui seul l'exercice immédiat du droit.");
rep("2. Une lettre argumentée structure une situation, des arguments et des recommandations, ce qui va au-delà d'un simple message ponctuel de sensibilisation.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Acteurs attendus : la personne elle-même (formation, recherche active), l'État (politiques d'emploi), les employeurs (embauche formelle) — rôle de chacun à décrire.");
rep("2. Réponse ouverte structurée en trois parties (situation, deux arguments, une recommandation), cohérente avec la méthode du chapitre.");
rep("3. Réponse attendue : un droit économique est bien un droit reconnu par des textes (Constitution, DUDH), même si son exercice dépend de conditions concrètes — ce n'est pas un simple souhait.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(3, "La séparation des pouvoirs");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. pouvoir législatif");
rep("2. pouvoir exécutif");
rep("3. pouvoir judiciaire");
rep("4. séparation des pouvoirs");
rep("5. équilibre des pouvoirs");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. (a)-(2) voter une loi → pouvoir législatif ; (b)-(3) juger un litige → pouvoir judiciaire ; (c)-(1) appliquer une loi déjà adoptée → pouvoir exécutif.");
rep("2. Faux. Concentrer tout le pouvoir dans une seule institution augmente le risque d'abus, même si cela peut sembler plus rapide.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Le législatif adopte la règle, l'exécutif l'applique (panneaux, contrôles), le judiciaire tranche en cas de contestation — trois étapes distinctes.");
rep("2. Chaque pouvoir contrôle les autres, ce qui réduit le risque de décision arbitraire, même si la coordination entre plusieurs institutions prend parfois plus de temps qu'une décision unique.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Problèmes attendus : risque d'injustice, absence de contrôle, décisions arbitraires. Organisation proposée : séparer qui décide la règle, qui l'applique, et qui tranche les sanctions contestées.");
rep("2. Réponse ouverte, basée sur la recherche de l'élève (exécutif, législatif ou judiciaire), avec un exemple concret.");
rep("3. Réponse attendue : même des personnes honnêtes peuvent se tromper ou avoir des intérêts différents ; la séparation des pouvoirs protège contre les erreurs autant que contre la malhonnêteté.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(4, "S'engager pour l'égalité");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. engagement citoyen");
rep("2. entraide");
rep("3. solidarité");
rep("4. participation inclusive");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Trois formes parmi : partage de fournitures, tutorat entre pairs, écoute et soutien (camarades référents).");
rep("2. Faux. Connaître un droit est une première étape ; encore faut-il s'engager concrètement pour qu'il soit respecté dans la réalité.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Connaître : savoir que l'égalité existe et l'expliquer (7e AF). S'engager : agir concrètement, par exemple organiser une entraide (8e AF).");
rep("2. Une participation qui exclut certains élèves (par manque de moyens ou d'accès) n'est pas réellement démocratique : la démocratie suppose que chacun puisse effectivement participer.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Méthode attendue : recueil anonyme des besoins, règles claires et discrètes de distribution, aucune désignation publique des bénéficiaires.");
rep("2. Étapes attendues : diagnostic des besoins, choix d'une forme d'entraide, règles de fonctionnement, période d'essai, évaluation.");
rep("3. Réponse attendue : l'entraide est une action concrète et volontaire au service de la collectivité, ce qui correspond exactement à la définition de l'engagement citoyen étudiée dans ce chapitre.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(5, "Débattre et argumenter pour la justice");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. argumentaire");
rep("2. thèse");
rep("3. justice civile");
rep("4. justice pénale");
rep("5. présomption d'innocence");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Ordre correct : déclaration d'ouverture → réfutation → conclusion.");
rep("2. Faux. Un bon argumentaire anticipe et répond aux contre-arguments, ce qui le rend plus solide.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Justice civile : litige entre particuliers (ex. désaccord sur un contrat). Justice pénale : infraction à la loi et sanction (ex. vol).");
rep("2. La présomption d'innocence protège les citoyens contre des accusations arbitraires, en garantissant qu'une personne reste innocente tant que sa culpabilité n'est pas prouvée.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Réponse ouverte, structurée (thèse + deux arguments), cohérente avec la méthode du chapitre.");
rep("2. Contre-argument attendu : risque pour la vie privée, coût d'installation et d'entretien, efficacité limitée sans autres mesures.");
rep("3. Réponse attendue : dans un débat argumenté, c'est la solidité des arguments qui compte, pas le volume de la voix — un principe central de la méthode structurée étudiée.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(6, "Cultiver la paix");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. prévention");
rep("2. non-violence");
rep("3. charte");
rep("4. culture de la paix");
rep("5. cohésion sociale");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. (a) approche réactive ; (b) approche proactive.");
rep("2. Faux. Les deux approches sont complémentaires : la prévention ne rend pas les institutions réactives inutiles.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. Ces initiatives agissent avant qu'un problème n'apparaisse (occuper positivement le temps libre, créer du lien), plutôt que de réagir à une tension déjà présente.");
rep("2. Deux piliers parmi : dialogue et coopération, respect de la diversité, résolution non-violente, engagement communautaire — chacun avec un exemple concret.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Trois engagements réalistes et justifiés (ex. : écouter avant de juger, régler les désaccords par le dialogue, inclure tous les élèves dans les activités).");
rep("2. Amélioration réaliste, cohérente avec les piliers étudiés (ex. élargir l'initiative à davantage de quartiers, ou l'inscrire dans la durée).");
rep("3. Réponse attendue : la paix se construit activement par des choix et des actions collectives (culture de la paix), ce n'est pas un simple état de fait qui échappe à toute action humaine.");
children.push(spacer(240));

// =======================================================================
chapterCorrige(7, "Gérer nos ressources durablement");

exoHeading("Exercice A — Connaissance/compréhension");
rep("1. ressource renouvelable");
rep("2. gestion durable");
rep("3. déboisement");
rep("4. reboisement");
rep("5. équitable");
children.push(spacer(160));

exoHeading("Exercice B — Observation/analyse de situation");
rep("1. Éthique, raisonnée, équitable, collective.");
rep("2. Faux. Comparer deux photographies aide à observer un changement, mais n'explique pas à elle seule ses causes exactes — il faut croiser d'autres sources.");
children.push(spacer(160));

exoHeading("Exercice C — Application/argumentation courte (éléments de réponse attendus)");
rep("1. L'entretien d'espace vert (7e AF) est une action simple et ponctuelle ; la gestion durable (8e AF) applique des critères précis (éthique, raisonnée, équitable, collective) sur le long terme.");
rep("2. Il faut rester prudent car plusieurs causes peuvent expliquer un même changement observé ; conclure sans preuve suffisante risque de produire une explication fausse ou incomplète.");
children.push(spacer(160));

exoHeading("Exercice D — Analyse et justification / proposition d'action (éléments de réponse attendus)");
rep("1. Projet structuré reliant chaque critère : éthique (respect des générations futures), raisonnée (choix d'espèces adaptées), équitable (répartition juste des tâches), collective (participation de toute la classe).");
rep("2. Réponse attendue : demander des preuves précises (lois, images, sources) avant d'accepter une explication, conformément à la méthode d'enquête prudente étudiée dans ce chapitre.");
rep("3. Réponse attendue : la littérature et l'art permettent de comprendre le rapport sensible et culturel d'une société à son environnement, en complément de l'analyse factuelle (lois, images).");

await buildAndSave(children, 64, "Manuel_EC_8AF_CorrigeGeneral.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_8e_AF\\06_CORRIGE_GENERAL");
