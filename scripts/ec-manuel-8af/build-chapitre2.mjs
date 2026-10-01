// Manuel d'EC 8e AF — Chapitre 2 : Citoyenneté et État : approfondir mes droits
// (Unité 2 — La citoyenne, le citoyen, la citoyenneté et l'État, des droits
// et des devoirs, Compétences C1, C2, C3).
//
// Prolonge le Chapitre 1 (déjà finalisé, NON modifié ici) : pagination
// continue à partir de la page 10 (Chapitre 1 = pages 1-9).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.34-35 : Unité 2, colonne 8e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "Droits et
//     devoirs fondamentaux (Constitution, DUDH). Droits et devoirs de
//     l'État et du citoyen. Participation active à la vie de la cité."
//     Notez l'absence de « l'éthique citoyenne » par rapport à la colonne
//     7e AF — non un oubli, un retrait réel documenté par la source.
//   - `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md` (verrouillée sans changement
//     dans `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`) : situation de départ
//     "un cas concret plus complexe qu'en 7e AF (conflit entre un droit et
//     son application réelle)" ; activité "approfondissement de l'étude de
//     cas déjà amorcée en 7e AF".
//
// TRAITEMENT DE LA « PROXIMITÉ VOLONTAIRE DU PROGRAMME » (transparence
// éditoriale MAJEURE, section 1/4 du prompt d'exécution) :
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, Unité 2, point 9,
// signale EXPLICITEMENT que le contenu officiel 8e AF est quasi identique
// au contenu officiel 7e AF dans la source elle-même — ce n'est pas une
// erreur de lecture ni un doublon éditorial créé par ce projet
// (`20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`, note sur le Chapitre 2). La
// consigne officielle du projet est claire : différencier par la
// PROFONDEUR D'ANALYSE et le NIVEAU D'AUTONOMIE/D'ARGUMENTATION, jamais en
// inventant un contenu factuel absent de la source. Ce chapitre applique
// cette consigne de trois façons concrètes, documentées ici :
//   1. Le vocabulaire de base déjà enseigné en 7e AF (droit, devoir,
//      citoyen, nationalité, constitution, loi, démocratie, république,
//      liberté, institution, suffrage universel) N'EST PAS redéfini : il
//      est mobilisé comme acquis en une phrase de rappel.
//   2. Une distinction conceptuelle plus fine est introduite (droits civils
//      et politiques / droits économiques, sociaux et culturels) — une
//      organisation plus structurée du même socle de droits déjà connu,
//      pas un contenu nouveau inventé.
//   3. L'étude de cas est délibérément plus complexe qu'en 7e AF (économie
//      informelle et droit au travail, plutôt que l'accès simple à
//      l'eau/au logement/à l'emploi déjà traité), avec une tâche
//      d'argumentation structurée (lettre argumentée) au lieu du simple
//      message de sensibilisation demandé en 7e AF.
//   4. « L'éthique citoyenne », présente en 7e AF, N'EST PAS reprise ici,
//      conformément au retrait réel documenté dans la source pour la
//      colonne 8e AF.
//
// CONTRÔLE DE LA PROGRESSION (Chapitre 1 → Chapitre 2 du même niveau,
// section 4 du prompt) : le Chapitre 1 de 8e AF a introduit la comparaison
// régionale caribéenne et les valeurs universelles. Ce Chapitre 2 change de
// terrain (retour aux droits/devoirs et à l'État, comme annoncé par
// l'Unité 2) sans réutiliser le contenu comparatif du Chapitre 1.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_SITUATION_FILL, BOX_SITUATION_LINE,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE,
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE,
  BOX_DEBAT_FILL, BOX_DEBAT_LINE,
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE,
  BOX_PROJET_FILL, BOX_PROJET_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  BLEU_CIVIQUE, OR_CITOYEN, VERT_COMMUNAUTAIRE, ANTHRACITE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  2,
  "Citoyenneté et État : approfondir mes droits",
  "Un droit reconnu sur le papier n'est pas toujours un droit exercé dans la réalité. En 7e AF, tu as " +
  "découvert cette idée. Ce chapitre te propose d'aller plus loin : comprendre pourquoi cet écart existe " +
  "parfois, quelles obligations pèsent réellement sur l'État, et comment argumenter, de façon structurée, " +
  "pour le réduire.",
  [
    "Distinguer droits civils et politiques et droits économiques, sociaux et culturels.",
    "Analyser un cas concret et complexe de droit non pleinement exercé.",
    "Identifier des obligations concrètes de l'État envers ses citoyens.",
    "Construire un argumentaire structuré sur une question de droits.",
    "Rédiger une action de participation citoyenne plus élaborée qu'en 7e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un droit reconnu, un quotidien différent",
  [
    "Dans une commune haïtienne, un jeune homme diplômé cherche depuis plusieurs mois un emploi stable et " +
    "déclaré, sans succès. Il finit par vendre des marchandises dans la rue pour subvenir à ses besoins. « " +
    "J'ai le droit de travailler, non ? » se demande-t-il. Ce chapitre part de cette question pour comprendre " +
    "un droit plus complexe que ceux étudiés en 7e AF : le droit au travail.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (7e AF et Chapitre 1 de 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as déjà appris à distinguer droit et devoir, citoyen et nationalité, et à utiliser le " +
  "vocabulaire politique de base (État, institution, constitution, loi, démocratie...). Ce chapitre ne " +
  "redéfinit pas ces mots : il les mobilise directement. Il ne reprend pas non plus le contenu comparatif du " +
  "Chapitre 1 de 8e AF (nations caribéennes) : il change de terrain pour approfondir les droits et l'État.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Droits civils et politiques — droits qui protègent la liberté individuelle et la participation à la vie politique (expression, vote, sûreté...)."));
children.push(bulletPar("Droits économiques, sociaux et culturels — droits qui concernent les conditions de vie et de développement d'une personne (travail, éducation, santé, culture...)."));
children.push(bulletPar("Économie informelle — ensemble des activités économiques exercées en dehors d'un cadre légal ou déclaré (sans contrat officiel, sans protection sociale)."));
children.push(bulletPar("Obligation de l'État — engagement concret que l'État doit remplir envers ses citoyens pour que leurs droits soient réellement exercés."));
children.push(bulletPar("Plaidoyer citoyen — démarche argumentée et structurée par laquelle un citoyen défend une cause ou demande une action auprès d'une autorité."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Deux grandes familles de droits", "2.1"));
children.push(bodyPar(
  "Les droits fondamentaux étudiés en 7e AF peuvent être organisés en deux grandes familles, reconnues par " +
  "les textes nationaux et internationaux (Constitution, DUDH) : les droits civils et politiques d'une part, " +
  "les droits économiques, sociaux et culturels d'autre part.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Deux familles de droits",
  [
    "Droits civils et politiques : liberté d'expression, droit de vote, droit à la sûreté, liberté de " +
    "conscience...",
    "Droits économiques, sociaux et culturels : droit au travail, droit à l'éducation, droit à la santé, " +
    "droit à un logement décent...",
    "Ces deux familles sont complémentaires : une personne peut jouir pleinement de sa liberté d'expression " +
    "tout en connaissant des difficultés d'accès à l'emploi ou au logement.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-8AF-C02-01 — Emplacement réservé pour un extrait exact et vérifié de la Constitution haïtienne, " +
    "de la DUDH, ou des Pactes internationaux de 1966 relatifs à ces deux familles de droits.",
    "Statut : [SOURCE À VÉRIFIER] — aucune formulation exacte n'est reproduite ici tant qu'elle n'a pas été " +
    "confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C02-01",
  "Ouverture — Chercher un emploi stable",
  "Une scène crédible d'un jeune adulte haïtien diplômé consultant des annonces ou se déplaçant en ville à la " +
  "recherche d'un emploi, dans un style illustratif cohérent avec la charte EC.",
  "Le droit au travail se comprend mieux à partir d'une situation concrète et réaliste.",
  "Ancrer l'ouverture du chapitre dans une scène économique réaliste et non caricaturale.",
  "Illustration pleine largeur, scène urbaine haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Étude de cas approfondie : le droit au travail face à l'économie informelle", "2.2"));
children.push(bodyPar(
  "En Haïti, une grande partie de l'activité économique se déroule dans le secteur informel : des emplois " +
  "sans contrat écrit, sans déclaration officielle, souvent sans protection sociale. Le droit au travail est " +
  "reconnu, mais son exercice réel se heurte à des obstacles structurels — rareté des emplois formels, accès " +
  "limité à la formation, contraintes économiques du pays.",
));
children.push(calloutBox(
  "ÉTUDE DE CAS — Le droit au travail, entre principe et réalité",
  [
    "Reprends la situation d'ouverture. Le jeune homme diplômé n'a pas trouvé d'emploi formel et travaille " +
    "aujourd'hui dans l'économie informelle, sans contrat ni protection sociale.",
    "1. En quoi cette situation illustre-t-elle un écart entre le principe du droit au travail et son " +
    "exercice effectif (notion vue en 7e AF, à mobiliser ici) ?",
    "2. Quels acteurs sont concernés par cette situation (le jeune homme lui-même, l'État, les employeurs, la " +
    "communauté) ? Quel rôle chacun peut-il jouer ?",
    "3. Cette situation est-elle uniquement due à un manque de volonté individuelle, ou aussi à des facteurs " +
    "économiques plus larges ? Justifie ta réponse avec nuance.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette étude de cas est volontairement plus complexe que celle de 7e AF (accès à l'eau, au logement, à " +
  "l'emploi à Cité Soleil) : elle demande de mettre en relation plusieurs acteurs et plusieurs causes, plutôt " +
  "que de décrire une seule situation.",
  { italics: true },
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Les obligations concrètes de l'État envers ses citoyens", "2.3"));
children.push(bodyPar(
  "Reconnaître un droit dans un texte engage l'État à agir concrètement pour le rendre possible. Ces actions " +
  "concrètes s'appellent des obligations de l'État.",
));
children.push(threeColTable(
  ["Droit reconnu", "Obligation concrète de l'État", "Exemple"],
  [
    ["Droit au travail", "Favoriser la création d'emplois, soutenir la formation professionnelle", "Programmes de formation, appui aux petites entreprises"],
    ["Droit à l'éducation", "Organiser et financer des écoles accessibles", "Écoles publiques, appui aux zones rurales"],
    ["Droit à la santé", "Organiser des services de santé accessibles", "Centres de santé communautaires"],
  ],
  [2600, 3800, 3000],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces obligations ne signifient pas que l'État peut, à lui seul, garantir instantanément chaque droit : " +
  "elles définissent une direction d'action et une responsabilité, que les citoyens peuvent légitimement " +
  "rappeler.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C02-02",
  "Exemple analysé — droit, obligation de l'État, réalité",
  "Un schéma en trois colonnes reliées par des flèches : « Droit reconnu » → « Obligation de l'État » → « " +
  "Réalité observée », appliqué à l'exemple du droit au travail, cohérent avec la charte EC.",
  "Un droit engage une obligation concrète de l'État, dont l'effet réel peut être observé et discuté.",
  "Rendre visible la chaîne droit → obligation → réalité pour structurer l'analyse.",
  "Illustration demi-page, schéma en trois colonnes, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "DÉBAT RAISONNÉ — L'État est-il seul responsable quand un droit n'est pas exercé ?",
  [
    "Certains pensent que si un droit n'est pas exercé, c'est avant tout la responsabilité de l'État. " +
    "D'autres pensent que des facteurs économiques, sociaux ou individuels jouent aussi un rôle, sans que " +
    "cela dispense l'État de ses obligations.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle nuancée, qui tient compte des arguments échangés en " +
    "classe — sans réduire la question à une seule cause.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Activité citoyenne — Rédiger une lettre argumentée"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Rédiger une lettre argumentée et structurée à une autorité locale, à partir de l'étude de cas " +
    "sur le droit au travail — une démarche plus élaborée que le simple message de sensibilisation réalisé en " +
    "7e AF.",
    "CONSIGNES : Choisis un droit économique ou social étudié dans ce chapitre. Identifie un obstacle réel à " +
    "son exercice et une autorité compétente à qui adresser ta lettre (mairie, direction d'école, autre " +
    "institution locale).",
    "ÉTAPES : 1. Décrire brièvement la situation et le droit concerné. 2. Présenter au moins deux arguments " +
    "structurés (pas seulement une opinion). 3. Formuler une ou deux recommandations concrètes et réalistes. " +
    "4. Relire pour vérifier le ton respectueux et argumenté de la lettre.",
    "RÉSULTAT ATTENDU : Une lettre courte mais structurée (situation, arguments, recommandations), au ton " +
    "respectueux, démontrant une argumentation plus construite qu'un simple message de sensibilisation.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet du cycle — Enrichir le répertoire de textes"));
children.push(calloutBox(
  "PROJET",
  [
    "Le répertoire de textes sur les droits et devoirs, commencé en 7e AF, se poursuit. [OFFICIEL — " +
    "dispositif transversal de la Collection EC]",
    "Ajoute à ton répertoire une nouvelle colonne : classe chaque texte déjà noté (Constitution, DUDH...) " +
    "selon qu'il concerne plutôt des droits civils et politiques, ou des droits économiques, sociaux et " +
    "culturels — applique ainsi la distinction étudiée dans ce chapitre à ton travail déjà commencé.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-8AF-C02-03",
  "Espace de production — ma lettre argumentée",
  "Un cadre vide, format portrait, structuré en trois zones (situation / arguments / recommandations), prévu " +
  "pour que l'élève y rédige directement sa lettre argumentée.",
  "Offrir un espace direct de production pour structurer la rédaction de la lettre argumentée.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, trois zones délimitées, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Les droits fondamentaux se répartissent en deux grandes familles complémentaires : droits civils et " +
    "politiques, droits économiques, sociaux et culturels.",
    "Un droit reconnu engage l'État à des obligations concrètes, sans garantir à lui seul son exercice " +
    "immédiat et total.",
    "L'écart entre un droit et son exercice réel peut avoir plusieurs causes à la fois (institutionnelles, " +
    "économiques, individuelles) : une analyse nuancée évite les explications trop simples.",
    "Un plaidoyer citoyen structuré (comme une lettre argumentée) va plus loin qu'un simple message de " +
    "sensibilisation.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de distinguer droits civils/politiques et droits économiques/sociaux/culturels, " +
  "d'analyser en profondeur un cas complexe (le droit au travail face à l'économie informelle), d'identifier " +
  "des obligations concrètes de l'État, et de s'exercer à un plaidoyer citoyen structuré à travers une lettre " +
  "argumentée — une progression réelle par rapport à l'étude de cas et à l'activité de sensibilisation " +
  "réalisées en 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "droits civils et politiques · droits économiques, sociaux et culturels · économie informelle · obligation " +
  "de l'État · plaidoyer citoyen.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer droits civils/politiques et droits économiques/sociaux/culturels.",
    "☐ Analyser un cas complexe de droit non pleinement exercé, en identifiant plusieurs acteurs et causes.",
    "☐ Citer une obligation concrète de l'État liée à un droit donné.",
    "☐ Construire un argumentaire structuré (situation, arguments, recommandations).",
    "☐ Rédiger une lettre argumentée respectueuse adressée à une autorité.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : droits civils/politiques, droits économiques/sociaux/culturels, économie " +
    "informelle, obligation de l'État, plaidoyer citoyen.",
    "Vocabulaire clé à maîtriser : droits civils et politiques, droits économiques et sociaux, obligation de " +
    "l'État.",
    "Avant l'évaluation, vérifie que tu peux : classer un droit dans l'une des deux familles ; analyser un cas " +
    "complexe avec plusieurs acteurs et causes ; construire un argumentaire structuré à trois parties.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec la structure officielle full-cycle " +
    "(étude d'une situation de droits et argumentaire de recommandations), adaptée ici à la profondeur " +
    "d'analyse attendue en 8e AF [OFFICIEL, adapté au niveau 8e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : droits " +
  "civils et politiques · droits économiques et sociaux · économie informelle · obligation · plaidoyer.",
  { italics: true },
));
children.push(numberedPar("1. Les droits qui protègent la liberté individuelle et la participation politique s'appellent les ......................"));
children.push(numberedPar("2. Les droits qui concernent le travail, l'éducation ou la santé s'appellent les ......................"));
children.push(numberedPar("3. Un emploi exercé sans contrat officiel ni déclaration fait partie de l'......................"));
children.push(numberedPar("4. Un engagement concret que l'État doit remplir envers ses citoyens s'appelle une ......................"));
children.push(numberedPar("5. Une démarche argumentée pour défendre une cause auprès d'une autorité s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Classe les droits suivants selon leur famille (civils/politiques ou économiques/sociaux) : droit de vote, droit à l'éducation, liberté d'expression, droit à la santé."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Si un droit économique n'est pas exercé, c'est uniquement la faute de la personne concernée. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec l'exemple du droit au travail, la différence entre le principe d'un droit et son obligation concrète pour l'État."));
children.push(numberedPar("2. Pourquoi une lettre argumentée est-elle une action citoyenne plus élaborée qu'un simple message de sensibilisation ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas du droit au travail. Identifie au moins trois acteurs concernés et le rôle que chacun pourrait jouer pour améliorer la situation."));
children.push(numberedPar("2. Rédige les grandes lignes (situation, deux arguments, une recommandation) d'une lettre argumentée sur un droit économique ou social de ton choix."));
children.push(numberedPar("3. Un camarade affirme : « Un droit économique, ce n'est pas vraiment un droit, juste un souhait. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-8AF-C02-04",
  "Synthèse — Citoyenneté et État : approfondir mes droits",
  "Une carte mentale simple centrée sur « Droits et État », avec des branches vers : deux familles de droits, " +
  "obligations de l'État, étude de cas, plaidoyer citoyen.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 10, "Manuel_EC_8AF_Chapitre2.docx");
