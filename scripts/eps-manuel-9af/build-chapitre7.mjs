// Manuel d'EPS 9e AF — Chapitre 7
// Volleyball : histoire, evolution et culture sportive
//
// Sources reellement consultees pour les faits historiques de ce chapitre
// (a integrer aux References finales du manuel) :
// - International Volleyball Hall of Fame (Holyoke, Massachusetts),
//   Encyclopaedia Britannica, Mass Moments, New England Historical Society,
//   Olympics.com : William G. Morgan (1870-1942), etudiant au Springfield
//   College de la YMCA ou il cotoie James Naismith, devient directeur
//   d'education physique a la YMCA de Holyoke (Massachusetts) ; constatant
//   que le basketball est trop intense pour un public plus age, il invente
//   un nouveau jeu, teste pour la premiere fois en decembre 1895 sous le nom
//   de "Mintonette". En 1896, lors d'une demonstration a la YMCA de
//   Springfield, un spectateur remarque que les joueurs semblent "voleyer"
//   le ballon ; Morgan adopte alors le nom "volleyball".
// - FIVB.com / Olympics.com : la Federation Internationale de Volleyball
//   (FIVB) est fondee en 1947. Premiers championnats du monde organises en
//   1949 (hommes) et 1952 (femmes). Le volleyball est reconnu sport
//   olympique en 1957, puis integre au programme olympique (hommes et
//   femmes) en 1964, a Tokyo. Le beach-volley est presente en demonstration
//   en 1992 et devient sport olympique officiel en 1996.
// - FIVB.com (article "Volleyball grows in Haiti through youth
//   tournaments") et recherches croisees : la Federation Haitienne de
//   Volleyball existe et est affiliee a la NORCECA (confederation
//   nord-americaine, centre-americaine et caribeenne de volleyball) ;
//   elle organise des tournois jeunesse et des selections haitiennes
//   participent a des competitions regionales (ex. CAZOVA). Aucune annee de
//   fondation precise ni palmares detaille n'a pu etre confirme a partir
//   des sources consultees : ces elements sont donc volontairement omis
//   plutot qu'inventes.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, chapterOpening,
  exercicesHeading, pageBreak, qcmBlock, spacer, buildAndSave,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
} from "./common.mjs";

const children = [];

// ================= OUVERTURE DE CHAPITRE =================
children.push(...chapterOpening(
  7,
  "Volleyball : histoire, évolution et culture sportive",
  "Un professeur cherche un jeu moins épuisant que le basketball pour un public plus âgé — et invente, presque par hasard, un sport aujourd’hui pratiqué sur toutes les plages et dans tous les gymnases du monde.",
  [
    "Situer approximativement la naissance du volleyball et identifier William G. Morgan comme figure centrale de sa création.",
    "Expliquer l’origine du nom « volleyball ».",
    "Identifier quelques étapes majeures de l’évolution du volleyball.",
    "Expliquer la diffusion internationale et le développement institutionnel du volleyball.",
    "Reconnaître différentes formes modernes du volleyball.",
    "Distinguer une information historique vérifiée d’une affirmation insuffisamment documentée.",
    "Expliquer certaines valeurs éducatives associées au volleyball.",
  ],
));
children.push(spacer(200));

// ---- Activation des connaissances ----
children.push(sectionHeading("Activation des connaissances", ""));
children.push(bodyPar(
  "Avant d’aller plus loin, prends un moment pour réfléchir à ce que tu sais déjà — ou crois savoir — sur le volleyball."
));
[
  "As-tu déjà observé ou pratiqué un match de volleyball ?",
  "Quel est l’objectif général du jeu ?",
  "Pourquoi un filet sépare-t-il les deux équipes ?",
  "Le volleyball a-t-il toujours été joué comme aujourd’hui ?",
  "Comment un sport devient-il international ?",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Ce chapitre ne te donne pas immédiatement toutes les réponses : il t’invite à mener une véritable enquête historique, en distinguant à chaque étape ce qui est un fait vérifié de ce qui reste à démontrer.",
  { italics: true }
));
children.push(spacer(200));

// ---- 7.1 ----
children.push(sectionHeading("La naissance du volleyball", "7.1"));
children.push(bodyPar(
  "Le volleyball naît en 1895, à la YMCA de Holyoke, dans le Massachusetts (États-Unis). William G. Morgan, formé au Springfield College de la YMCA — où il avait côtoyé James Naismith, l’inventeur du basketball — devient directeur d’éducation physique à Holyoke. Constatant que le basketball, encore récent, est trop intense pour certains de ses pratiquants plus âgés, il cherche à créer une activité physique collective plus modérée, mais tout aussi engageante."
));
children.push(illustrationBox(
  "ILL-9AF-C07-01",
  "La naissance du volleyball",
  "Reconstruction éducative (clairement présentée comme illustration, non comme photographie authentique) d’un gymnase de la fin du XIXe siècle : un éducateur physique et un groupe d’adultes en tenue d’époque, autour d’un filet tendu à hauteur intermédiaire, dans une ambiance calme et posée.",
  "Le contexte de création du volleyball, pensé comme une activité moins intense que le basketball.",
  "Ancrer visuellement le contexte de naissance du volleyball, sans le présenter comme un document d’archive authentique.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 7.2 ----
children.push(sectionHeading("De « Mintonette » au volleyball", "7.2"));
children.push(bodyPar(
  "La première partie du nouveau jeu de Morgan est disputée en décembre 1895, sous le nom de « Mintonette ». En 1896, lors d’une démonstration à la YMCA de Springfield, un spectateur remarque que les joueurs semblent « voleyer » le ballon (le faire aller et venir au-dessus du filet, sans le laisser tomber). Il suggère alors le nom de « volleyball », que Morgan adopte aussitôt."
));
children.push(calloutBox(
  "Le savais-tu ?",
  ["Le nom « volleyball » n’a pas été choisi par son créateur dès le départ : il vient de la remarque d’un simple spectateur, lors d’une démonstration publique en 1896."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A0F",
));
children.push(illustrationBox(
  "ILL-9AF-C07-02",
  "De Mintonette à volleyball",
  "Infographie sobre en deux temps : à gauche, l’étiquette « Mintonette » (1895) associée à une petite icône de filet et de ballon ; à droite, l’étiquette « Volleyball » (1896) avec une flèche reliant les deux, accompagnée d’une courte légende expliquant le changement de nom.",
  "L’évolution du nom du jeu, de Mintonette à volleyball.",
  "Illustrer visuellement le changement de nom expliqué dans cette section.",
  "Paysage, format horizontal, infographie en deux parties.",
));
children.push(spacer(200));

// ---- 7.3 ----
children.push(sectionHeading("Le volleyball à ses débuts", "7.3"));
children.push(bodyPar(
  "Le jeu inventé par Morgan se distinguait déjà par l’idée d’un filet séparant deux équipes et d’un ballon à faire circuler sans le laisser tomber, mais son organisation restait très différente de la pratique actuelle. Le tableau suivant compare quelques éléments généraux, sans entrer dans le détail technique, qui sera abordé dans le prochain chapitre."
));
children.push(threeColTable(
  ["Élément", "Volleyball des débuts", "Volleyball moderne"],
  [
    ["Nombre de joueurs", "Variable, non strictement fixé", "Équipes de six joueurs sur le terrain"],
    ["Rythme du jeu", "Plus lent, orienté vers l’échange prolongé", "Plus rapide, avec des actions plus spécialisées"],
    ["Organisation", "Règles locales, peu standardisées", "Règlement international commun, arbitrage structuré"],
  ],
  [2600, 3600, 3200],
));
children.push(illustrationBox(
  "ILL-9AF-C07-03",
  "Volleyball ancien et volleyball moderne",
  "Illustration comparative en deux parties : à gauche, une scène de volleyball de la fin du XIXe siècle (filet simple, tenue d’époque, gymnase sobre) ; à droite, une scène de volleyball scolaire contemporain (filet réglementaire, tenue de sport actuelle). Style clair, comparaison pédagogique.",
  "Une comparaison visuelle entre le volleyball des débuts et sa pratique contemporaine.",
  "Illustrer concrètement le tableau comparatif présenté dans cette section.",
  "Paysage, format horizontal, comparaison côte à côte.",
));
children.push(spacer(200));

// ---- 7.4 ----
children.push(sectionHeading("L’évolution progressive des règles", "7.4"));
children.push(bodyPar(
  "Comme pour de nombreux sports, les règles du volleyball se sont structurées progressivement : un terrain défini, un nombre de joueurs précisé, un système de score, un arbitrage organisé, puis des compétitions structurées. Ce chapitre ne détaille pas l’ensemble des règles actuelles, qui seront présentées dans le chapitre consacré à la pratique du volleyball."
));
children.push(spacer(200));

// ---- 7.5 ----
children.push(sectionHeading("La diffusion internationale", "7.5"));
children.push(bodyPar(
  "Porté par le réseau international de la YMCA, puis par des établissements éducatifs, des associations sportives et des échanges internationaux, le volleyball s’est diffusé bien au-delà des États-Unis au cours du XXe siècle, jusqu’à devenir un sport pratiqué dans de très nombreux pays."
));
children.push(illustrationBox(
  "ILL-9AF-C07-04",
  "La diffusion internationale du volleyball",
  "Schéma pédagogique simple (non cartographique et non trompeur) montrant, par des icônes reliées, l’idée de diffusion progressive : YMCA locale → réseau international → établissements éducatifs → fédérations nationales → compétitions internationales.",
  "La diffusion du volleyball, du gymnase de Holyoke aux compétitions internationales.",
  "Illustrer la progression logique de la diffusion internationale sans induire en erreur sur des données précises.",
  "Paysage, format horizontal, schéma simple.",
));
children.push(spacer(200));

// ---- 7.6 ----
children.push(sectionHeading("L’organisation internationale", "7.6"));
children.push(bodyPar(
  "En 1947 est fondée la Fédération Internationale de Volleyball (FIVB), chargée d’organiser ce sport à l’échelle mondiale et de structurer ses règles communes. Cette organisation internationale a permis, par la suite, la mise en place de grandes compétitions régulières entre équipes de différents pays."
));
children.push(spacer(200));

// ---- 7.7 ----
children.push(sectionHeading("Les grandes compétitions internationales", "7.7"));
children.push(bodyPar(
  "Après la fondation de la FIVB, les premiers championnats du monde de volleyball sont organisés en 1949 pour les hommes, puis en 1952 pour les femmes. Le volleyball est reconnu comme sport olympique en 1957, et fait son entrée officielle aux Jeux olympiques en 1964, à Tokyo, pour les hommes comme pour les femmes. Cette reconnaissance olympique a fortement contribué à sa visibilité mondiale."
));
children.push(illustrationBox(
  "ILL-9AF-C07-05",
  "Le volleyball international",
  "Scène sobre de compétition internationale de volleyball : deux équipes de chaque côté d’un filet, arbitre en position surélevée, public engagé mais respectueux, aucune marque commerciale visible.",
  "Le volleyball comme sport organisé à l’échelle internationale.",
  "Illustrer concrètement le développement des grandes compétitions internationales.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 7.8 ----
children.push(sectionHeading("Le volleyball moderne", "7.8"));
children.push(bodyPar(
  "Depuis sa création, le volleyball a beaucoup évolué : une organisation plus structurée, un rythme de jeu plus rapide, un arbitrage plus précis, un système de score ajusté à plusieurs reprises, une spécialisation croissante des rôles des joueurs, un entraînement plus scientifique, une médiatisation importante, et l’usage de technologies d’aide à la décision dans les compétitions de haut niveau."
));
children.push(spacer(200));

// ---- 7.9 ----
children.push(sectionHeading("Le volleyball féminin", "7.9"));
children.push(bodyPar(
  "La participation féminine au volleyball s’est développée comme une part intégrante de l’histoire de ce sport, marquée notamment par les premiers championnats du monde féminins en 1952 et l’intégration olympique féminine en 1964, en même temps que le tournoi masculin. Ce chapitre évite toute comparaison qui dévaloriserait la pratique féminine, et rappelle que le volleyball scolaire doit offrir des possibilités de participation réellement équitables entre filles et garçons."
));
children.push(illustrationBox(
  "ILL-9AF-C07-06",
  "Le volleyball féminin",
  "Joueuses dans une situation sportive organisée (match ou entraînement), attitude déterminée et professionnelle, environnement sportif crédible, aucun stéréotype.",
  "Le volleyball féminin comme partie intégrante de l’histoire et de la pratique du sport.",
  "Illustrer respectueusement la place du volleyball féminin.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 7.10 ----
children.push(sectionHeading("Le beach-volley et formes apparentées", "7.10"));
children.push(bodyPar(
  "Le beach-volley, pratiqué sur sable, se joue généralement à un nombre réduit de joueurs par équipe (le plus souvent deux), dans un environnement extérieur différent du volleyball en salle. Présenté en démonstration olympique en 1992, il devient un sport olympique officiel en 1996. Ce chapitre ne détaille pas son règlement complet, réservé à une étude plus approfondie."
));
children.push(spacer(200));

// ---- 7.11 ----
children.push(sectionHeading("Le volleyball dans la culture sportive", "7.11"));
children.push(bodyPar(
  "Le volleyball se pratique aujourd’hui à l’école, dans des clubs, en loisir et en compétition. Cette pratique mobilise coopération, communication constante entre coéquipiers, respect des règles et de l’adversaire, responsabilité, discipline, prise de décision rapide et esprit d’équipe. Ces valeurs ne se développent toutefois pas automatiquement : elles s’apprennent et se pratiquent, séance après séance."
));
children.push(calloutBox(
  "Fair-play",
  ["Au volleyball, la communication constante entre coéquipiers et le respect de l’adversaire et de l’arbitre sont indissociables d’un jeu collectif réussi."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ---- 7.12 ----
children.push(sectionHeading("Volleyball et contexte haïtien", "7.12"));
children.push(bodyPar(
  "En Haïti, le volleyball se pratique dans un cadre scolaire, communautaire et compétitif. Une fédération haïtienne de volleyball existe et est affiliée à la NORCECA, la confédération régionale qui organise le volleyball en Amérique du Nord, en Amérique centrale et dans les Caraïbes ; des sélections haïtiennes participent à des tournois de jeunesse et à des compétitions régionales."
));
children.push(bodyPar(
  "L’année exacte de fondation de la fédération haïtienne de volleyball, ainsi qu’un palmarès détaillé de ses sélections, n’ont pas pu être établis avec certitude à partir des sources consultées : ce manuel préfère donc l’omettre plutôt que d’inventer une information invérifiable. Ce chapitre ne mentionne aucun club, dirigeant, date ou résultat précis qui n’aurait pas pu être vérifié.",
  { italics: true }
));
children.push(illustrationBox(
  "ILL-9AF-C07-07",
  "Le volleyball en contexte scolaire haïtien",
  "Groupe d’élèves haïtiens de 9e AF, filles et garçons, pratiquant le volleyball dans une cour d’école ou sur un terrain scolaire sûr, filet scolaire simple visible, ambiance active et inclusive.",
  "Une pratique scolaire, inclusive et sûre du volleyball en Haïti.",
  "Illustrer concrètement et respectueusement la présence du volleyball dans le contexte scolaire haïtien.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 7.13 ----
children.push(sectionHeading("Le volleyball en milieu scolaire haïtien", "7.13"));
children.push(bodyPar(
  "Dans le cadre de l’EPS, le volleyball se prête bien à un travail en petits groupes et en ateliers : exercices de coopération autour du filet, échanges progressifs, espaces adaptés à la taille de la cour ou du terrain disponible, et organisation progressive de petits matchs. Aucun filet, poteau ou matériel improvisé dangereux n’est jamais utilisé, quelle que soit la contrainte de ressources."
));
children.push(spacer(200));

// ---- 7.14 ----
children.push(sectionHeading("Du patrimoine sportif à la pratique", "7.14"));
children.push(bodyPar(
  "Connaître l’histoire du volleyball aide à mieux comprendre son identité, ses règles, son organisation et son évolution — autant d’éléments utiles pour aborder, dans le prochain chapitre, la pratique concrète de ce sport : ses règles essentielles, ses fondamentaux techniques et son organisation tactique."
));
children.push(illustrationBox(
  "ILL-9AF-C07-08",
  "Frise historique du volleyball",
  "Frise chronologique sobre, horizontale, avec six repères clairement datés et vérifiés : Naissance (1895) → Évolution → Diffusion → Organisation (FIVB, 1947) → Internationalisation (Jeux olympiques, 1964) → Volleyball contemporain. Style épuré, sans ornement inutile.",
  "Les grandes étapes vérifiées de l’histoire du volleyball, de sa création à sa pratique contemporaine.",
  "Offrir une vue d’ensemble chronologique avant de passer à l’étude pratique du volleyball.",
  "Paysage, format horizontal, frise pleine largeur.",
));
children.push(spacer(200));

// ---- Méthode ----
children.push(sectionHeading("Analyser une information historique", ""));
children.push(bodyPar(
  "Toutes les informations que l’on trouve sur l’histoire d’un sport n’ont pas la même valeur. Avant d’utiliser une information historique dans un travail scolaire, il est utile de se poser plusieurs questions."
));
children.push(calloutBox(
  "Méthode — Analyser une information historique",
  [
    "Quelle est l’information exactement ?",
    "Quelle est la source de cette information ?",
    "La source est-elle clairement identifiable ?",
    "La date est-elle vérifiable ?",
    "Plusieurs sources sérieuses concordent-elles ?",
    "S’agit-il d’un fait, d’une interprétation ou d’une anecdote ?",
    "Peut-on l’utiliser dans un manuel scolaire, ou faut-il rester prudent ?",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ================= ACTIVITE 1 =================
children.push(pageBreak());
children.push(sectionHeading("Activité 1 — « Construisons la frise du volleyball »", ""));
children.push(bodyPar(
  "Ton enseignant te remet une série d’événements déjà vérifiés (par exemple : invention du jeu en 1895, changement de nom en 1896, fondation de la FIVB en 1947, premiers championnats du monde en 1949 et 1952, reconnaissance olympique en 1957, entrée aux Jeux olympiques en 1964, officialisation du beach-volley en 1996)."
));
[
  "Organisez ces événements dans l’ordre chronologique.",
  "Distinguez, pour chaque événement, s’il relève de la création, de l’évolution ou de l’internationalisation du volleyball.",
  "Choisissez l’événement qui vous semble le plus déterminant, et justifiez ce choix.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Cette activité ne demande jamais aux élèves d’inventer une date qu’ils ne connaissent pas ; seules des dates réellement enseignées et vérifiées sont utilisées.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE 2 =================
children.push(sectionHeading("Activité 2 — « Hier et aujourd’hui »", ""));
children.push(bodyPar(
  "Complète ce tableau en comparant quelques éléments du volleyball des débuts et du volleyball d’aujourd’hui, puis explique ce qui a changé et pourquoi."
));
children.push(threeColTable(
  ["Élément", "Aux débuts", "Aujourd’hui — Ce qui a changé"],
  [
    ["Nombre de joueurs par équipe", "", ""],
    ["Rythme du jeu", "", ""],
    ["Organisation des compétitions", "", ""],
  ],
  [2800, 3300, 3300],
));
children.push(spacer(200));

// ================= ACTIVITE 3 =================
children.push(pageBreak());
children.push(sectionHeading("Activité 3 — « Une information est-elle fiable ? »", ""));
children.push(bodyPar(
  "Voici trois exemples fictifs de formulations sur l’histoire du volleyball, créés uniquement pour cet exercice. Pour chacun, indique s’il te semble bien documenté, s’il demande une vérification, ou s’il ressemble à une affirmation non sourcée — et justifie ta réponse."
));
[
  "Exemple 1 (fictif) : « Selon l’International Volleyball Hall of Fame, le jeu a été testé pour la première fois en décembre 1895, à la YMCA de Holyoke. »",
  "Exemple 2 (fictif) : « Tout le monde sait que le volleyball a été inventé pour impressionner un roi européen en visite aux États-Unis. »",
  "Exemple 3 (fictif) : « Un site Internet sans nom d’auteur affirme qu’un tournoi mondial a eu lieu en 1900, sans donner d’autre précision. »",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Ces exemples sont volontairement fictifs et créés pour l’exercice : ils ne doivent jamais être mémorisés comme des faits réels.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(sectionHeading("Activité d’analyse — Volleyball et société", ""));
[
  "Pourquoi un sport comme le volleyball évolue-t-il au fil du temps ?",
  "Pourquoi les règles d’un sport doivent-elles être communes à tous les pays qui le pratiquent ?",
  "Comment l’école peut-elle contribuer à la diffusion d’un sport ?",
  "Pourquoi la coopération est-elle particulièrement importante au volleyball ?",
  "Pourquoi est-il important de vérifier une affirmation historique avant de la publier dans un manuel scolaire ?",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= AUTOEVALUATION =================
children.push(pageBreak());
children.push(sectionHeading("Autoévaluation", ""));
children.push(calloutBox(
  "Autoévaluation",
  ["Ce bilan personnel t’aide à mesurer ta propre compréhension. Il ne sert jamais à te comparer aux autres élèves."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Situer la naissance du volleyball", "", ""],
    ["Identifier le créateur du jeu", "", ""],
    ["Comprendre l’origine du nom « volleyball »", "", ""],
    ["Expliquer l’évolution des règles", "", ""],
    ["Distinguer naissance, diffusion et internationalisation", "", ""],
    ["Citer des formes modernes du volleyball", "", ""],
    ["Expliquer des valeurs éducatives associées au volleyball", "", ""],
    ["Vérifier le besoin d’une source avant d’affirmer un fait", "", ""],
    ["Expliquer la place du volleyball à l’école", "", ""],
  ],
  [3800, 3200, 2200],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le volleyball est né en 1895, à Holyoke (États-Unis), grâce à William G. Morgan, sous le nom initial de « Mintonette ».",
  "Le nom « volleyball » a été adopté en 1896, à la suite de la remarque d’un spectateur.",
  "Les règles du volleyball se sont progressivement structurées : terrain, nombre de joueurs, score, arbitrage, compétitions.",
  "La Fédération Internationale de Volleyball (FIVB), fondée en 1947, a organisé la diffusion mondiale du sport, jusqu’à son entrée aux Jeux olympiques en 1964.",
  "Le volleyball féminin fait partie intégrante de l’histoire de ce sport, et le beach-volley en est une forme apparentée, officialisée aux Jeux olympiques en 1996.",
  "Le volleyball mobilise une culture sportive et des valeurs éducatives (coopération, communication, respect) qui s’apprennent et ne sont jamais automatiques.",
  "En Haïti, le volleyball se pratique dans un cadre scolaire, communautaire et compétitif ; toute affirmation historique précise doit être vérifiée avant d’être présentée comme un fait.",
  "Analyser une information historique suppose de vérifier sa source, sa date, et de distinguer un fait d’une interprétation ou d’une anecdote.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : situer un événement, reconnaître un personnage historique, ordonner des événements, interpréter une frise, comparer deux périodes, expliquer une évolution, analyser une courte source, distinguer un fait d’une affirmation non vérifiée, et rédiger une courte réponse argumentée.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(7));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(culture - filet - Morgan - règles - international - Mintonette - histoire - coopération - volleyball - évolution)", italics: true, color: "555555" },
]));
[
  "1. L’inventeur du jeu à l’origine du volleyball s’appelle William G. ____________________.",
  "2. Le premier nom donné à ce jeu, avant qu’il ne soit renommé, était le ____________________.",
  "3. Le nom adopté après qu’un spectateur a remarqué que les joueurs semblaient « voleyer » le ballon est ____________________.",
  "4. La transformation progressive d’un sport dans le temps s’appelle son ____________________.",
  "5. L’élément qui sépare les deux équipes sur le terrain s’appelle le ____________________.",
  "6. La capacité à travailler ensemble vers un objectif commun s’appelle la ____________________.",
  "7. Diffusé dans de nombreux pays, le volleyball est devenu un sport véritablement ____________________.",
  "8. L’ensemble nécessaire à la sécurité, à l’équité et à l’organisation du jeu s’appelle les ____________________.",
  "9. L’ensemble des repères identitaires, des médias et des pratiques sociales autour d’un sport s’appelle sa ____________________.",
  "10. L’étude des faits vérifiés du passé, à distinguer d’une simple anecdote, s’appelle l’____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Qui est à l’origine du jeu qui deviendra le volleyball ?", opts: ["a) James Naismith", "b) William G. Morgan", "c) Un comité international", "d) Un groupe d’élèves haïtiens"] },
  { q: "2. Quel nom Morgan a-t-il donné au jeu à l’origine ?", opts: ["a) Basketball", "b) Mintonette", "c) Volley international", "d) Filet-ball"] },
  { q: "3. Pourquoi Morgan a-t-il cherché à créer une nouvelle activité physique ?", opts: ["a) pour remplacer complètement le basketball", "b) pour proposer une activité moins intense, adaptée à un public plus âgé", "c) pour organiser immédiatement des compétitions internationales", "d) pour créer un sport individuel"] },
  { q: "4. Que montre l’évolution du nom « Mintonette » vers « volleyball » ?", opts: ["a) qu’un sport et son identité peuvent évoluer après sa création", "b) que le jeu n’a jamais changé de nom", "c) que Morgan a copié un autre sport existant", "d) que le nom a été choisi avant même que le jeu existe"] },
  { q: "5. Que doit faire un élève face à une information historique trouvée sur Internet sans auteur ni organisme identifiable ?", opts: ["a) la considérer immédiatement comme vraie", "b) la traiter avec prudence et chercher à la vérifier avant de l’utiliser", "c) l’utiliser telle quelle dans un travail scolaire", "d) l’ignorer sans jamais la vérifier"] },
  { q: "6. Comment ce chapitre présente-t-il le volleyball féminin ?", opts: ["a) comme secondaire par rapport au volleyball masculin", "b) avec respect, en s’appuyant sur des faits vérifiés", "c) en inventant des résultats pour le rendre plus intéressant", "d) en le comparant systématiquement pour le dévaloriser"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque notion de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. William G. Morgan", "a) Fédération internationale qui organise le volleyball à l’échelle mondiale, fondée en 1947"],
  ["2. Mintonette", "b) Rencontre organisée entre équipes de différents pays, contribuant à la reconnaissance mondiale d’un sport"],
  ["3. Volleyball", "c) Forme du volleyball pratiquée sur sable, avec un nombre réduit de joueurs par équipe"],
  ["4. FIVB", "d) Fait de travailler ensemble, communiquer et s’entraider pour progresser collectivement"],
  ["5. Compétition internationale", "e) Origine vérifiable d’une information, permettant de distinguer un fait d’une simple affirmation"],
  ["6. Beach-volley", "f) Éducateur physique qui a inventé le jeu à l’origine du volleyball, en 1895"],
  ["7. Coopération", "g) Premier nom donné au jeu par son créateur, avant qu’il ne soit renommé"],
  ["8. Source historique", "h) Nom adopté après qu’un spectateur a remarqué que les joueurs semblaient « voleyer » le ballon"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Pourquoi les règles d’un sport comme le volleyball évoluent-elles au fil du temps ? Donne un exemple présenté dans ce chapitre.",
  "2. Un site Internet affirme une date précise concernant l’histoire du volleyball, sans indiquer ni auteur ni organisme. Explique comment tu devrais réagir face à cette information avant de l’utiliser dans un travail scolaire.",
  "3. Explique comment une activité inventée dans un contexte local (un gymnase à Holyoke) a pu devenir un sport pratiqué dans le monde entier.",
  "4. Pourquoi la coopération est-elle particulièrement importante dans la pratique du volleyball en EPS ?",
  "5. Explique la différence entre connaître l’histoire d’un sport et savoir le pratiquer. Pourquoi ce manuel présente-t-il les deux ?",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 80, "Manuel_EPS_9AF_Chapitre7.docx");
console.log("Chapitre 7 (9e AF) genere:", outPath);
