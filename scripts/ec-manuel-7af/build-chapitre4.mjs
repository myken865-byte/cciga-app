// Manuel d'EC 7e AF — Chapitre 4 : Toi comme moi : le principe d'égalité
// (Unité 4 — Penser l'autre comme soi-même : le principe d'égalité,
// Compétences C1, C2, C3).
//
// Prolonge les Chapitres 1-3 (déjà finalisés, NON modifiés ici) :
// pagination continue à partir de la page 32 (Chapitre 1 = pages 1-11,
// Chapitre 2 = pages 12-22, Chapitre 3 = pages 23-31).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.36-37 : Unité 4, colonne 7e AF explicitement séparée par année.
//     Contenu officiel cité verbatim (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`,
//     verrouillé sans changement dans
//     `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`,
//     [ADAPTATION DE LECTURE] pour la segmentation par année uniquement) :
//     "Notion de respect de soi et de l'autre, tolérance, éthique
//     individuelle et collective. Notion de personne et droits attachés
//     (respect, dignité, tolérance, libertés de circulation/pensée/
//     conscience/religion/opinion/expression). Droits relatifs à
//     l'éducation et à la scolarité, participation démocratique en classe.
//     L'égalité dans la société. Participation personnelle à des actions
//     pour l'égalité, entr'aide."
//   - `09_TABLE_MATIERES_PROPOSEE_EC_7AF.md` (verrouillée sans changement
//     dans `19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md`) : situation de départ
//     "une situation vécue d'exclusion ou d'inclusion en classe" ;
//     activités "portfolio de textes/images sur le respect des droits de
//     l'enfant [OFFICIEL] ; campagne d'affiches (lien arts plastiques)
//     [OFFICIEL]" ; évaluation "proposer deux actions citoyennes pour
//     réduire les inégalités [OFFICIEL]".
//   - `05_MATRICE_COMPETENCES_UNITES_EC.md`, section documentée sous
//     l'intitulé « Unité 3 » (anomalie d'extraction déjà signalée dans ce
//     même fichier — ce contenu appartient en réalité à l'Unité 4, comme
//     confirmé par sa cohérence avec la table des matières Chapitre 4) :
//     savoirs cités verbatim : "questionner individu/personne et droits
//     attachés (respect, dignité, tolérance, libertés) ; expliquer
//     l'engagement des textes universels ; connaître les droits à
//     l'éducation/scolarité et participer à la vie démocratique de classe ;
//     savoir ce que signifie le droit à l'information, la liberté
//     d'expression et de la presse." Activité officielle citée verbatim :
//     "portfolio de textes/images d'enfants victimes de traitements non
//     conformes à la Convention des droits de l'enfant (domesticité,
//     travail des enfants) ; débat après film/actualités ; pétition ; en
//     lien avec arts plastiques/musique, campagne d'affiches et création
//     musicale." Évaluation officielle citée verbatim : "à partir
//     d'articles de la Constitution, de la DUDH et de la Convention des
//     droits de l'enfant, proposer deux actions citoyennes pour réduire les
//     inégalités."
//   - Compétences C1, C2, C3 toutes mobilisées (tableau croisé compétences
//     × unités, `05_MATRICE_COMPETENCES_UNITES_EC.md`).
//
// TRAITEMENT DU SUJET « DOMESTICITÉ / TRAVAIL DES ENFANTS » (transparence
// éditoriale, section 9 du prompt) : ce sujet est nommé explicitement par
// le programme MENFP lui-même, pas ajouté par choix éditorial. Il est
// traité ici de façon factuelle, respectueuse et centrée sur les DROITS
// (éducation, protection contre l'exploitation) et sur les réponses
// citoyennes possibles (sensibilisation, portfolio, plaidoyer), sans détail
// choquant ou invraisemblable, sans nommer un enfant réel, et sans jugement
// moral envers des familles ou des personnes précises — conformément à la
// consigne officielle qui porte sur l'analyse de droits, pas sur un fait
// divers.
//
// STATUT DES TEXTES DE RÉFÉRENCE : aucun article précis de la Constitution,
// de la DUDH ou de la Convention des droits de l'enfant n'est cité mot pour
// mot ; leur contenu est résumé pédagogiquement [ADAPTATION PÉDAGOGIQUE],
// et un emplacement DOC est réservé, marqué [SOURCE À VÉRIFIER].
//
// CONTRÔLE DE LA PROGRESSION (section 4 du prompt) : ce chapitre reprend
// comme acquis la démocratie de classe déjà traitée au Chapitre 3, sans la
// redévelopper, pour introduire un contenu réellement nouveau : dignité,
// libertés fondamentales, droit à l'information/liberté de la presse, et
// égalité. Conformément à `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`,
// seule la « participation personnelle » (niveau 7e AF) est développée ici
// — l'« engagement citoyen nommé pour l'égalité » (8e AF) et
// l'« engagement pour une société inclusive, protection sociale » (9e AF)
// ne sont pas anticipés.
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
  4,
  "Toi comme moi : le principe d'égalité",
  "Une élève arrive en retard, essoufflée, parce qu'elle a dû aider chez elle avant de venir. Un autre élève " +
  "chuchote une moquerie. Personne ne dit rien. Ce chapitre t'aide à comprendre pourquoi chaque personne " +
  "mérite le même respect — et ce que tu peux faire, concrètement, quand ce respect n'est pas au rendez-vous.",
  [
    "Expliquer ce que signifie la dignité de toute personne.",
    "Connaître les principales libertés fondamentales (circulation, pensée, conscience, religion, opinion, " +
    "expression).",
    "Relier le droit à l'éducation à la participation démocratique en classe.",
    "Expliquer le droit à l'information et la liberté d'expression et de la presse.",
    "Reconnaître une situation d'inégalité et proposer des actions citoyennes pour la réduire.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Une remarque qui blesse",
  [
    "Dans une classe de 7e AF, un élève se moque discrètement d'un camarade arrivé en retard et fatigué. " +
    "Personne n'intervient, par gêne ou par habitude. Plus tard, l'enseignant(e) demande : « Qu'est-ce que " +
    "cette scène nous apprend sur le respect de chacun ? » Ce chapitre part de cette question simple pour " +
    "construire une réponse solide : le principe d'égalité.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis issus des Chapitres 1 à 3"));
children.push(bodyPar(
  "Tu as déjà appris à distinguer droit et devoir (Chapitre 2) et à comprendre le fonctionnement d'un État " +
  "démocratique, y compris la participation démocratique en classe (Chapitre 3). Ce chapitre s'appuie sur ces " +
  "acquis, sans les redévelopper, pour introduire une nouvelle notion : le principe d'égalité entre les " +
  "personnes.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Dignité — valeur fondamentale reconnue à toute personne, qui mérite respect quelles que soient ses différences."));
children.push(bulletPar("Tolérance — capacité à respecter des personnes, des idées ou des pratiques différentes des siennes."));
children.push(bulletPar("Liberté fondamentale — possibilité essentielle reconnue à toute personne (par exemple : circuler, penser, croire, s'exprimer)."));
children.push(bulletPar("Égalité — principe selon lequel toutes les personnes ont la même valeur et les mêmes droits fondamentaux."));
children.push(bulletPar("Inégalité — situation dans laquelle des personnes n'ont pas, dans les faits, le même accès à un droit."));
children.push(bulletPar("Liberté d'expression — droit d'exprimer ses idées et ses opinions, dans le respect d'autrui et de la loi."));
children.push(bulletPar("Droit à l'information — droit d'accéder à des informations fiables sur ce qui concerne la vie collective."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("La dignité de toute personne", "4.1"));
children.push(bodyPar(
  "Chaque personne, sans exception, possède une dignité qui mérite d'être respectée. Cela signifie que " +
  "personne ne devrait être humilié, moqué ou traité injustement à cause de son apparence, de son origine, de " +
  "sa situation familiale ou de sa condition économique.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Respecter soi-même et l'autre",
  [
    "Respecter les autres commence souvent par se respecter soi-même : reconnaître sa propre valeur, sans " +
    "chercher à rabaisser quelqu'un d'autre pour se sentir supérieur.",
    "La tolérance ne signifie pas être d'accord avec tout, mais accepter que d'autres personnes puissent " +
    "penser, croire ou vivre différemment, sans que cela justifie un manque de respect.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C04-01",
  "Ouverture — La remarque qui blesse",
  "Une scène de classe haïtienne crédible montrant un élève moqué discrètement pendant que ses camarades " +
  "détournent le regard, dans un style illustratif cohérent avec la charte EC, sans détail choquant.",
  "Une situation ordinaire de moquerie permet d'introduire concrètement le principe d'égalité et de dignité.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire réaliste et respectueuse.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les libertés fondamentales de la personne", "4.2"));
children.push(bodyPar(
  "Au-delà de la dignité, chaque personne dispose de libertés fondamentales : des possibilités essentielles " +
  "que personne ne devrait lui retirer sans raison légitime.",
));
children.push(threeColTable(
  ["Liberté", "Ce qu'elle protège", "Exemple concret"],
  [
    ["Liberté de circulation", "Se déplacer librement", "Aller à l'école, se rendre au marché"],
    ["Liberté de pensée", "Réfléchir et former sa propre opinion", "Avoir un avis différent de ses camarades"],
    ["Liberté de conscience/religion", "Croire ou ne pas croire selon son choix", "Pratiquer ou non une religion"],
    ["Liberté d'opinion/expression", "Exprimer ce que l'on pense", "Participer à un débat en classe"],
  ],
  [2600, 3600, 3200],
));
children.push(spacer(160));
children.push(bodyPar(
  "Ces libertés ne sont pas illimitées : elles s'exercent dans le respect des autres et des règles communes, " +
  "un principe déjà rencontré au Chapitre 3 avec le fonctionnement démocratique.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le droit à l'éducation et la participation en classe", "4.3"));
children.push(bodyPar(
  "Le droit à l'éducation garantit à chaque enfant la possibilité d'aller à l'école et d'y apprendre dans de " +
  "bonnes conditions. Ce droit est étroitement lié à la participation démocratique en classe, déjà étudiée au " +
  "Chapitre 3 : une classe où chacun peut s'exprimer et participer est une classe qui respecte davantage " +
  "l'égalité entre ses élèves.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EC-7AF-C04-02",
  "Exemple analysé — les libertés fondamentales",
  "Une planche pédagogique présentant, sous forme de pictogrammes simples, les cinq libertés fondamentales " +
  "étudiées (circulation, pensée, conscience, opinion, expression), cohérente avec la charte EC.",
  "Les libertés fondamentales se distinguent et se reconnaissent par des exemples concrets.",
  "Donner une référence visuelle claire et mémorisable des libertés fondamentales.",
  "Illustration demi-page, planche de pictogrammes, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Le droit à l'information et la liberté de la presse", "4.4"));
children.push(bodyPar(
  "S'informer est aussi un droit : chaque personne a le droit d'accéder à des informations fiables sur ce qui " +
  "concerne la vie collective. La liberté de la presse permet aux journalistes de rapporter des faits et des " +
  "opinions sans être empêchés injustement de le faire, ce qui aide les citoyens à se forger leur propre " +
  "avis.",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-7AF-C04-01 — Emplacement réservé pour un extrait exact et vérifié de la Constitution haïtienne, de " +
    "la DUDH ou de la Convention des droits de l'enfant sur la dignité, les libertés fondamentales ou le droit " +
    "à l'éducation.",
    "Statut : [SOURCE À VÉRIFIER] — aucune formulation n'est reproduite ici tant que le texte exact n'a pas " +
    "été confirmé auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("L'égalité dans la société : reconnaître une inégalité", "4.5"));
children.push(bodyPar(
  "Le principe d'égalité affirme que toutes les personnes ont la même valeur et les mêmes droits. Pourtant, " +
  "dans la réalité, certaines personnes n'ont pas toujours le même accès à ces droits — c'est ce qu'on appelle " +
  "une inégalité. Reconnaître une inégalité est la première étape pour agir contre elle.",
));

children.push(calloutBox(
  "ÉTUDE DE CAS — Le droit à l'éducation mis à l'épreuve",
  [
    "Dans certaines familles haïtiennes, un enfant peut être fortement sollicité pour des tâches domestiques " +
    "ou un travail, au point que sa scolarité en est affectée — une situation reconnue par la Convention des " +
    "droits de l'enfant comme contraire à ses droits, notamment lorsqu'elle prend la forme de domesticité ou " +
    "de travail des enfants.",
    "1. Quels droits de l'enfant sont concernés dans une telle situation ?",
    "2. En quoi cette situation illustre-t-elle une inégalité, même si elle n'est pas toujours visible de " +
    "l'extérieur ?",
    "3. Que peut faire une classe, une école ou une communauté pour sensibiliser à ce droit, sans juger les " +
    "familles concernées ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette étude de cas porte sur des droits, pas sur un jugement des familles ou des enfants concernés : " +
  "l'objectif est de comprendre un droit fondamental et de réfléchir à des réponses citoyennes respectueuses.",
  { italics: true },
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Traiter tout le monde pareil, est-ce toujours être juste ?",
  [
    "Certains pensent que l'égalité signifie traiter absolument tout le monde de la même façon, en toutes " +
    "circonstances. D'autres pensent qu'être juste suppose parfois de tenir compte des différences de " +
    "situation pour que chacun ait réellement les mêmes chances.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Campagne d'affiches pour l'égalité"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : Créer, en lien avec les arts plastiques, une affiche promouvant le respect de la dignité et " +
    "de l'égalité entre les personnes. [OFFICIEL — activité prévue par le programme]",
    "CONSIGNES : Choisis un message clair et positif (par exemple : « Chaque enfant a le droit d'apprendre » " +
    "ou « Le respect commence par moi »). Illustre-le simplement, avec des mots et un dessin ou un collage.",
    "ÉTAPES : 1. Choisir un droit ou une valeur à promouvoir. 2. Rédiger un message court et clair. 3. " +
    "Illustrer le message. 4. Afficher les productions dans la classe ou l'école.",
    "RÉSULTAT ATTENDU : Une affiche claire, respectueuse et positive, reliant un message concret à un droit ou " +
    "une valeur étudiée dans ce chapitre.",
    "Variante possible mentionnée par le programme officiel : une pétition de classe en faveur d'un droit " +
    "précis, présentée dans les mêmes conditions de respect. [OFFICIEL]",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet — Portfolio sur le respect des droits de l'enfant"));
children.push(calloutBox(
  "PROJET",
  [
    "Le programme officiel prévoit la constitution d'un portfolio de textes et d'images sur le respect des " +
    "droits de l'enfant. [OFFICIEL — activité prévue par le programme]",
    "OBJECTIF : Rassembler, au fil du chapitre, des extraits de textes (résumés, jamais copiés mot pour mot " +
    "sans vérification), des dessins ou des découpages illustrant un droit de l'enfant étudié en classe.",
    "ÉTAPES : 1. Choisir un droit de l'enfant à documenter (éducation, protection, expression). 2. Rechercher " +
    "ou créer un texte court et une image associée. 3. Les organiser dans un portfolio personnel ou collectif. " +
    "4. Présenter une page du portfolio à la classe.",
    "Ce portfolio peut être enrichi, si le temps le permet, par un débat mené après le visionnage d'un " +
    "reportage ou la lecture d'un article d'actualité, comme le suggère le programme officiel. [OFFICIEL]",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C04-03",
  "Espace de production — ma page de portfolio",
  "Un cadre vide, format portrait, structuré en deux zones (une pour un court texte, une pour un dessin ou une " +
  "image collée), prévu pour que l'élève y crée directement sa page de portfolio sur un droit de l'enfant.",
  "Offrir un espace direct de production pour ancrer le portfolio sur le respect des droits de l'enfant.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, deux zones délimitées, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Toute personne possède une dignité qui mérite d'être respectée, sans exception.",
    "Les libertés fondamentales (circulation, pensée, conscience, religion, opinion, expression) protègent " +
    "des possibilités essentielles de chaque personne.",
    "Le droit à l'éducation est lié à la participation démocratique en classe.",
    "Le droit à l'information et la liberté de la presse aident les citoyens à se forger leur propre opinion.",
    "Reconnaître une inégalité est la première étape pour proposer des actions citoyennes afin de la réduire.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de comprendre la dignité de toute personne, de découvrir les libertés fondamentales, " +
  "de relier le droit à l'éducation à la participation démocratique en classe, et d'aborder le droit à " +
  "l'information et la liberté de la presse. Il a aussi permis d'examiner une situation réelle d'inégalité " +
  "liée au droit à l'éducation, et de s'exercer à des actions citoyennes concrètes (affiche, portfolio) pour " +
  "promouvoir l'égalité.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "dignité · tolérance · liberté fondamentale · égalité · inégalité · liberté d'expression · droit à " +
  "l'information.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer ce que signifie la dignité de toute personne.",
    "☐ Citer au moins trois libertés fondamentales.",
    "☐ Expliquer le lien entre droit à l'éducation et participation démocratique en classe.",
    "☐ Expliquer ce qu'est le droit à l'information et la liberté de la presse.",
    "☐ Reconnaître une situation d'inégalité et proposer une action citoyenne pour la réduire.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : dignité, tolérance, libertés fondamentales, égalité, inégalité, droit à " +
    "l'information.",
    "Vocabulaire clé à maîtriser : dignité, liberté fondamentale, égalité, liberté d'expression.",
    "Avant l'évaluation, vérifie que tu peux : expliquer la dignité et les libertés fondamentales ; reconnaître " +
    "une situation d'inégalité ; proposer des actions citoyennes concrètes pour la réduire.",
    "Rappel officiel : l'évaluation attendue pour cette unité consiste à proposer deux actions citoyennes pour " +
    "réduire les inégalités, à partir d'articles de la Constitution, de la DUDH et de la Convention des droits " +
    "de l'enfant [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(4));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : dignité · " +
  "tolérance · égalité · liberté d'expression · inégalité.",
  { italics: true },
));
children.push(numberedPar("1. La valeur fondamentale reconnue à toute personne, quelles que soient ses différences, s'appelle la ......................"));
children.push(numberedPar("2. Accepter des personnes ou des idées différentes des siennes, c'est faire preuve de ......................"));
children.push(numberedPar("3. Le principe selon lequel toutes les personnes ont la même valeur et les mêmes droits s'appelle l'......................"));
children.push(numberedPar("4. Une situation où des personnes n'ont pas le même accès à un droit s'appelle une ......................"));
children.push(numberedPar("5. Le droit d'exprimer ses idées dans le respect d'autrui et de la loi s'appelle la ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite trois libertés fondamentales étudiées dans ce chapitre et donne un exemple concret pour chacune."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « La tolérance signifie être d'accord avec toutes les opinions des autres. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique le lien entre le droit à l'éducation et la participation démocratique en classe, étudiée au Chapitre 3."));
children.push(numberedPar("2. Pourquoi le droit à l'information et la liberté de la presse sont-ils utiles pour un citoyen ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas sur le droit à l'éducation. Propose deux actions citoyennes concrètes pour réduire ce type d'inégalité, comme demandé par l'évaluation officielle."));
children.push(numberedPar("2. Décris le message et l'image que tu choisirais pour ta propre affiche sur l'égalité, en expliquant pourquoi."));
children.push(numberedPar("3. Un camarade affirme : « Si quelqu'un est différent de moi, je n'ai pas à le respecter de la même façon. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-7AF-C04-04",
  "Synthèse — Toi comme moi : le principe d'égalité",
  "Une carte mentale simple centrée sur « Égalité », avec des branches vers : dignité, libertés fondamentales, " +
  "droit à l'éducation, droit à l'information, actions contre les inégalités.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 31, "Manuel_EC_7AF_Chapitre4.docx");
