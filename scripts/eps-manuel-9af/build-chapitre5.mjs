// Manuel d'EPS 9e AF — Chapitre 5
// Basketball : histoire, evolution et culture sportive
//
// Sources reellement consultees pour les faits historiques de ce chapitre
// (a integrer aux References finales du manuel) :
// - Naismith Basketball Hall of Fame, EBSCO Research Starters, Springfield
//   College, Encyclopaedia Britannica : James Naismith, educateur physique
//   a l'International YMCA Training School de Springfield (Massachusetts),
//   invente le basketball le 21 decembre 1891 (13 regles ecrites, ballon de
//   football, deux paniers de peches, deux equipes de neuf joueurs), pour
//   proposer une activite collective praticable en interieur pendant
//   l'hiver.
// - FIBA.basketball : la Federation Internationale de Basketball (FIBA) est
//   fondee le 18 juin 1932 a Geneve, par huit pays fondateurs (Argentine,
//   Tchecoslovaquie, Grece, Italie, Lettonie, Portugal, Roumanie, Suisse).
// - Olympics.com / FIBA.basketball : le basketball masculin est introduit
//   aux Jeux olympiques en 1936 (Berlin) ; le basketball feminin y est
//   introduit en 1976 (Montreal).
// - Wikipedia (EN) "Haitian Basketball Federation" et "Haiti men's national
//   basketball team" : la federation haitienne est membre de la FIBA ;
//   l'annee exacte de sa fondation est incertaine (l'article Wikipedia
//   lui-meme indique deux annees differentes et contradictoires, 1951 et
//   1970, sans les concilier) — volontairement NON affirmee ici, conformement
//   a la consigne de ne jamais transformer une information incertaine en
//   fait. Faits confirmes et retenus : adhesion a la FIBA en 1970, premiere
//   participation documentee aux Jeux panamericains de 1971 (12e place),
//   puis Centrobasket 1975 (6e place) et Centrobasket 1981 a San Juan
//   (8e place), suivis d'une longue interruption de competitions
//   internationales et d'un retour recent en competition officielle.
// Aucune date, club, dirigeant, palmares ou evenement non verifie n'a ete
// invente ; lorsque l'information restait incertaine ou contradictoire
// (fondation de la federation haitienne), elle a ete omise ou formulee avec
// prudence plutot que fabriquee.
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
  5,
  "Basketball : histoire, évolution et culture sportive",
  "Un ballon de football, deux paniers de pêches cloués à un balcon, treize règles écrites en une seule matinée d’hiver : et si le basketball, aujourd’hui joué dans le monde entier, était né d’un problème tout simple à résoudre ?",
  [
    "Expliquer dans quel contexte le basketball est né et identifier James Naismith comme son créateur.",
    "Situer les grandes étapes de l’évolution du basketball.",
    "Comprendre la diffusion internationale du basketball et certaines dimensions de sa culture sportive.",
    "Analyser les valeurs de coopération, respect, discipline et fair-play associées à la pratique.",
    "Décrire avec prudence la présence du basketball dans le contexte sportif haïtien.",
    "Lire une frise chronologique ou un document sportif simple et en tirer des informations.",
    "Comparer le basketball d’origine et sa pratique contemporaine sans anachronisme.",
  ],
));

children.push(illustrationBox(
  "ILL-9AF-C05-01",
  "La naissance du basketball",
  "Illustration historique pédagogique (clairement présentée comme reconstitution, non comme une photographie d’archive) montrant un gymnase d’hiver à la fin du XIXe siècle : un éducateur physique et un groupe de jeunes gens en tenue d’époque, un ballon de football, deux paniers de pêches fixés en hauteur sur une balustrade.",
  "Le contexte de création du basketball, dans un gymnase d’hiver à la fin du XIXe siècle.",
  "Ancrer visuellement le contexte de naissance du basketball, sans le présenter comme un document d’archive authentique.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 5.1 ----
children.push(sectionHeading("Naissance du basketball", "5.1"));
children.push(bodyPar(
  "Le basketball naît le 21 décembre 1891, à Springfield, dans le Massachusetts (États-Unis), à l’International YMCA Training School. James Naismith, éducateur physique, doit alors résoudre un problème concret : proposer à ses étudiants une activité collective praticable en intérieur pendant l’hiver, moins rude que les sports de contact pratiqués en extérieur. Il écrit treize règles, utilise un ballon de football, et fait fixer deux paniers de pêches en hauteur, de part et d’autre d’un gymnase, pour la toute première partie."
));
children.push(bodyPar(
  "Ce chapitre ne s’attarde pas sur des détails anecdotiques : l’essentiel est de comprendre que le basketball est né d’un besoin éducatif concret, pensé par un enseignant, avant de devenir le sport largement pratiqué aujourd’hui."
));
children.push(calloutBox(
  "À retenir",
  ["Le basketball a été inventé par James Naismith, éducateur physique, en 1891, à Springfield (États-Unis), pour répondre à un besoin éducatif concret."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, "1F4E5F",
));
children.push(spacer(200));

// ---- 5.2 ----
children.push(sectionHeading("Les premières règles", "5.2"));
children.push(bodyPar(
  "Dès l’origine, le basketball reposait sur un ensemble initial de règles écrites, qui se sont ensuite progressivement transformées. Des règles communes sont nécessaires pour au moins quatre raisons : assurer la sécurité des joueurs, garantir l’équité entre les équipes, organiser clairement le déroulement du jeu, et permettre sa continuité d’une rencontre à l’autre. Ce chapitre ne détaille pas le règlement technique moderne complet, qui sera abordé dans un chapitre dédié à la pratique du basketball."
));
children.push(spacer(200));

// ---- 5.3 ----
children.push(sectionHeading("De l’activité scolaire au sport organisé", "5.3"));
children.push(bodyPar(
  "Conçu à l’origine dans un cadre éducatif, le basketball s’est ensuite diffusé dans d’autres établissements, puis dans des associations sportives, avant de donner naissance à des organisations chargées de structurer sa pratique. Cette transformation progressive — d’une activité pédagogique locale vers un sport organisé à l’échelle nationale puis internationale — est typique de la façon dont plusieurs sports modernes se sont développés."
));
children.push(illustrationBox(
  "ILL-9AF-C05-03",
  "Frise chronologique du basketball",
  "Frise chronologique sobre, horizontale, avec un petit nombre de repères clairement datés et vérifiés (invention en 1891, fondation de la FIBA en 1932, intégration olympique masculine en 1936, intégration olympique féminine en 1976, adhésion d’Haïti à la FIBA en 1970). Style épuré, sans ornement inutile.",
  "Les grandes étapes vérifiées de l’histoire du basketball, de sa création à sa diffusion internationale.",
  "Donner un repère chronologique global avant de détailler la diffusion internationale et l’intégration olympique.",
  "Paysage, format horizontal, frise pleine largeur.",
));
children.push(spacer(200));

// ---- 5.4 ----
children.push(sectionHeading("Diffusion internationale", "5.4"));
children.push(bodyPar(
  "Le basketball s’est diffusé dans de nombreuses régions du monde au cours du XXe siècle. En 1932, à Genève, huit pays fondent la Fédération Internationale de Basketball (FIBA), chargée d’organiser ce sport à l’échelle mondiale. Des fédérations nationales se constituent progressivement dans de nombreux pays, rendant possibles des rencontres et des compétitions internationales régulières."
));
children.push(illustrationBox(
  "ILL-9AF-C05-04",
  "La diffusion internationale du basketball",
  "Schéma pédagogique simple (non cartographique et non trompeur) montrant, par des icônes reliées, l’idée de diffusion progressive : activité scolaire → associations → fédérations nationales → fédération internationale → compétitions mondiales. Éviter toute carte présentée comme statistiquement précise si elle ne l’est pas.",
  "La diffusion du basketball, de l’activité scolaire aux compétitions internationales.",
  "Illustrer la progression logique de la diffusion internationale sans induire en erreur sur des données précises.",
  "Paysage, format horizontal, schéma simple.",
));
children.push(spacer(200));

// ---- 5.5 ----
children.push(sectionHeading("Basketball et mouvement olympique", "5.5"));
children.push(bodyPar(
  "Le basketball masculin est introduit aux Jeux olympiques en 1936, à Berlin, soit 45 ans seulement après son invention. Le basketball féminin y fait son entrée plus tard, en 1976, aux Jeux de Montréal. L’intégration d’un sport aux Jeux olympiques contribue fortement à sa visibilité internationale, en le faisant connaître à un très large public à travers le monde."
));
children.push(calloutBox(
  "Le savais-tu ?",
  ["Le basketball a été intégré aux Jeux olympiques masculins seulement 45 ans après son invention par James Naismith — une diffusion internationale particulièrement rapide pour un sport de cette époque."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A0F",
));
children.push(spacer(200));

// ---- 5.6 ----
children.push(sectionHeading("Évolution du jeu", "5.6"));
children.push(bodyPar(
  "Depuis 1891, le basketball a beaucoup évolué : le matériel a changé (des paniers de pêches aux paniers modernes avec filet et panneau), le terrain et ses dimensions ont été précisés, l’organisation et l’arbitrage se sont structurés, le rythme du jeu s’est accéléré, les règles ont été ajustées à plusieurs reprises, et la préparation des joueurs s’est professionnalisée. Ces changements répondent le plus souvent à des besoins précis : plus d’équité entre les équipes, plus de sécurité pour les joueurs, plus de clarté dans l’application des règles, ou plus de dynamisme dans le jeu."
));
children.push(illustrationBox(
  "ILL-9AF-C05-02",
  "Des premiers paniers au basketball moderne",
  "Illustration comparative en deux parties : à gauche, un panier de pêches fixé sur une balustrade en bois (fin XIXe siècle) ; à droite, un panier moderne avec cerceau, filet et panneau. Style clair, comparaison pédagogique, sans effet stylistique excessif.",
  "L’évolution visible du matériel de basketball, des origines à aujourd’hui.",
  "Illustrer concrètement l’évolution du matériel évoquée dans cette section.",
  "Paysage, format horizontal, comparaison côte à côte.",
));
children.push(spacer(200));

// ---- 5.7 ----
children.push(sectionHeading("Basketball féminin", "5.7"));
children.push(bodyPar(
  "Le développement du basketball féminin fait partie intégrante de l’histoire de ce sport, et non d’une évolution secondaire. L’accès des femmes à la pratique, à des compétitions organisées, puis à une visibilité croissante — marquée notamment par leur intégration aux Jeux olympiques en 1976 — constitue une évolution importante, encore en cours aujourd’hui dans de nombreux pays. Ce chapitre évite toute comparaison qui dévaloriserait la pratique féminine par rapport à la pratique masculine."
));
children.push(illustrationBox(
  "ILL-9AF-C05-05",
  "Le basketball féminin",
  "Représentation respectueuse de joueuses dans une situation sportive organisée (match ou entraînement), attitude déterminée et professionnelle, environnement sportif crédible.",
  "Le basketball féminin comme partie intégrante de l’histoire et de la pratique du sport.",
  "Illustrer respectueusement la place du basketball féminin, sans stéréotype ni dévalorisation.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 5.8 ----
children.push(sectionHeading("Basketball et culture sportive", "5.8"));
children.push(bodyPar(
  "Au-delà du jeu lui-même, le basketball a développé une véritable culture sportive : une identité d’équipe, des supporters, des maillots reconnaissables, une couverture médiatique, un langage sportif particulier (des expressions propres au jeu), de grands événements, et des modèles sportifs qui inspirent des jeunes pratiquants. Cette culture influence la façon dont un sport est perçu et vécu par une société, bien au-delà des seuls résultats obtenus sur le terrain."
));
children.push(illustrationBox(
  "ILL-9AF-C05-06",
  "La culture sportive du basketball",
  "Scène de match organisé montrant une équipe, un public engagé mais respectueux, un arbitre en position d’observation. Ambiance vivante et positive, aucune marque commerciale ni logo d’équipe professionnelle visible.",
  "Équipe, public et arbitrage réunis dans une même scène de culture sportive.",
  "Illustrer concrètement les éléments de la culture sportive présentés dans cette section, sans publicité.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 5.9 ----
children.push(sectionHeading("Valeurs éducatives", "5.9"));
children.push(bodyPar(
  "Le basketball mobilise des valeurs éducatives concrètes : coopération avec les coéquipiers, communication constante, respect des règles, maîtrise de soi, responsabilité, discipline, persévérance et fair-play. Ces valeurs ne sont toutefois jamais automatiques : elles doivent être apprises, pratiquées et respectées, séance après séance, pour devenir des réflexes durables."
));
children.push(calloutBox(
  "Fair-play",
  ["Le fair-play au basketball, c’est respecter les règles, l’adversaire et l’arbitre — et célébrer une victoire ou accepter une défaite sans jamais manquer de respect à l’autre équipe."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(spacer(200));

// ---- 5.10 ----
children.push(sectionHeading("Basketball et jeunesse", "5.10"));
children.push(bodyPar(
  "Un sport collectif bien encadré peut constituer un véritable espace d’apprentissage social et moteur pour les jeunes pratiquants : coopération, gestion des émotions, respect des règles et responsabilité s’y développent concrètement. Ce chapitre reste toutefois prudent : la pratique d’un sport, même bien encadrée, ne garantit à elle seule ni la réussite sociale, ni la réussite professionnelle. C’est l’encadrement éducatif de qualité, et non le sport seul, qui rend ces apprentissages possibles."
));
children.push(spacer(200));

// ---- 5.11 ----
children.push(sectionHeading("Le basketball en Haïti", "5.11"));
children.push(bodyPar(
  "En Haïti, le basketball se pratique dans un cadre scolaire, communautaire, associatif et compétitif. La fédération haïtienne de basketball est membre de la Fédération Internationale de Basketball (FIBA), qui a enregistré l’adhésion d’Haïti en 1970. La sélection masculine a participé, notamment, aux Jeux panaméricains de 1971, puis à des championnats régionaux (Centrobasket) en 1975 et en 1981, avant de connaître une longue interruption de compétitions internationales officielles, suivie d’un retour plus récent à la compétition."
));
children.push(bodyPar(
  "L’année exacte de fondation de la fédération haïtienne de basketball n’a pas pu être établie avec certitude à partir des sources consultées, qui se contredisent sur ce point précis : ce manuel préfère donc ne pas l’affirmer, plutôt que de choisir arbitrairement une date. De la même façon, ce chapitre ne mentionne aucun club, dirigeant ou palmarès précis qui n’aurait pas pu être vérifié.",
  { italics: true }
));
children.push(illustrationBox(
  "ILL-9AF-C05-07",
  "Le basketball en contexte scolaire haïtien",
  "Groupe d’élèves haïtiens de 9e AF, filles et garçons, pratiquant le basketball dans une cour d’école ou sur un terrain scolaire sûr, ambiance active et inclusive, panier scolaire simple visible.",
  "Une pratique scolaire, inclusive et sûre du basketball en Haïti.",
  "Illustrer concrètement et respectueusement la présence du basketball dans le contexte scolaire haïtien.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 5.12 ----
children.push(sectionHeading("Observer l’évolution d’un sport", "5.12"));
children.push(bodyPar(
  "Comparer deux périodes d’un même sport permet de mieux comprendre son évolution : le matériel utilisé, les règles en vigueur, l’organisation du jeu, la participation (qui pratique, et dans quelles conditions), sa diffusion géographique, et la culture qui l’entoure. Une démarche simple d’analyse historique peut s’appuyer sur cinq questions."
));
children.push(calloutBox(
  "Méthode — Analyser un document historique sportif",
  [
    "Identifier le document (image, texte, chronologie).",
    "Repérer la date et le contexte.",
    "Observer attentivement ce que montre ou dit le document.",
    "Relever les informations importantes.",
    "Distinguer ce qui est un fait de ce qui relève d’une interprétation.",
    "Formuler une conclusion simple à partir de ces observations.",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Le basketball, une pratique inclusive à l’école haïtienne", ""));
children.push(bodyPar(
  "Filles et garçons peuvent pratiquer et suivre le basketball dans des cadres scolaires sûrs, que ce soit en cours d’EPS, dans un club scolaire ou lors d’un tournoi communautaire encadré. Ce chapitre présente cette pratique sans jamais transformer une information non vérifiée en fait national, et sans jamais introduire de marque commerciale ou de logo d’équipe professionnelle."
));
children.push(spacer(200));

// ================= ACTIVITE PRINCIPALE =================
children.push(pageBreak());
children.push(sectionHeading("Activité principale — « Construisons la frise du basketball »", ""));
children.push(bodyPar(
  "Ton enseignant te remet une série d’étapes historiques déjà vérifiées (par exemple : invention du basketball en 1891, fondation de la FIBA en 1932, intégration olympique masculine en 1936, intégration olympique féminine en 1976, adhésion d’Haïti à la FIBA en 1970)."
));
[
  "Organisez ces étapes dans l’ordre chronologique.",
  "Pour chaque étape, précisez : la date ou la période, l’événement, le changement observé, et son importance.",
  "Discutez en groupe : quelles étapes vous semblent les plus marquantes, et pourquoi ?",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Cette activité peut se réaliser sans matériel numérique, par exemple avec des étiquettes de papier à ordonner sur une grande feuille ou au tableau. Elle ne demande jamais à un élève d’inventer une date qu’il ne connaît pas.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(sectionHeading("Activité d’analyse — « Le basketball a-t-il toujours été le même ? »", ""));
children.push(illustrationBox(
  "ILL-9AF-C05-08",
  "Autrefois / aujourd’hui : comparer deux périodes",
  "Illustration en deux parties comparant une scène de basketball de la fin du XIXe siècle (paniers de pêches, tenue d’époque, gymnase simple) et une scène de basketball scolaire contemporain (panier moderne, tenue de sport actuelle). Style clair, comparaison pédagogique.",
  "Une comparaison visuelle entre deux périodes du basketball, support à l’analyse historique.",
  "Servir de support commun à l’activité d’analyse du chapitre.",
  "Paysage, format horizontal, comparaison côte à côte.",
));
children.push(bodyPar(
  "En comparant les deux scènes ci-dessus, réponds aux questions suivantes."
));
[
  "Que peux-tu observer comme différences de matériel, d’espace ou de tenue entre les deux périodes ?",
  "Qu’est-ce qui te semble être resté stable malgré ces changements ?",
  "Quelles raisons peuvent expliquer certains de ces changements (sécurité, équité, clarté, dynamisme) ?",
  "Distingue, parmi tes réponses précédentes, ce qui relève d’une observation directe et ce qui relève d’une hypothèse.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE CULTURE SPORTIVE =================
children.push(pageBreak());
children.push(sectionHeading("Activité culture sportive", ""));
children.push(bodyPar(
  "Voici plusieurs comportements observés autour d’un match de basketball scolaire : encouragements respectueux envers les deux équipes ; insultes adressées à un joueur adverse ; respect des décisions de l’arbitre ; coopération entre coéquipiers pendant le jeu ; célébration respectueuse après une victoire."
));
children.push(bodyPar(
  "Pour chaque comportement, indique s’il correspond au fair-play et à une culture sportive éducative, ou non, et explique pourquoi."
));
children.push(spacer(200));

// ================= AUTOEVALUATION =================
children.push(sectionHeading("Autoévaluation", ""));
children.push(calloutBox(
  "Autoévaluation",
  ["Ce bilan personnel t’aide à mesurer ta propre compréhension. Il ne sert jamais à te comparer aux autres élèves."],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(threeColTable(
  ["Notion", "Je maîtrise / Je progresse / À travailler", "Un exemple personnel"],
  [
    ["Expliquer l’origine du basketball", "", ""],
    ["Identifier plusieurs étapes de son évolution", "", ""],
    ["Lire une frise chronologique simple", "", ""],
    ["Distinguer un fait vérifié d’une interprétation", "", ""],
    ["Expliquer une dimension de la culture sportive du basketball", "", ""],
    ["Analyser une évolution entre deux périodes", "", ""],
    ["Comprendre l’importance du respect et du fair-play", "", ""],
  ],
  [3600, 3200, 2400],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le basketball a été inventé en 1891, à Springfield, par James Naismith, pour répondre à un besoin éducatif concret.",
  "Le jeu s’est progressivement diffusé d’une activité scolaire vers un sport organisé, structuré par la FIBA (fondée en 1932).",
  "L’intégration aux Jeux olympiques (1936 pour les hommes, 1976 pour les femmes) a fortement contribué à sa visibilité internationale.",
  "Le basketball a beaucoup évolué (matériel, règles, arbitrage, rythme) pour répondre à des besoins d’équité, de sécurité, de clarté et de dynamisme.",
  "Le basketball féminin fait partie intégrante de l’histoire de ce sport, avec un accès et une visibilité croissante.",
  "Le basketball a développé une culture sportive propre : identité d’équipe, supporters, médias, langage sportif et modèles inspirants.",
  "Coopération, respect, discipline, persévérance et fair-play sont des valeurs éducatives associées au basketball, mais elles s’apprennent et ne sont jamais automatiques.",
  "En Haïti, le basketball se pratique dans un cadre scolaire, communautaire et compétitif ; toute affirmation historique précise doit être vérifiée avant d’être présentée comme un fait.",
  "Comparer deux périodes d’un même sport permet d’observer son évolution, en distinguant toujours un fait vérifié d’une interprétation.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : lire une frise chronologique, ordonner des événements, analyser une illustration, distinguer un fait d’une interprétation, expliquer une évolution et justifier une réponse, à partir de documents ou de situations nouveaux.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(5));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(culture - Haïti - 1891 - fair-play - règles - international - Naismith - évolution - arbitrage - coopération)", italics: true, color: "555555" },
]));
[
  "1. L’inventeur du basketball s’appelle James ____________________.",
  "2. La première partie de basketball a été jouée en ____________________.",
  "3. L’ensemble nécessaire à la sécurité, à l’équité et à l’organisation du jeu s’appelle les ____________________.",
  "4. La capacité à travailler ensemble vers un objectif commun s’appelle la ____________________.",
  "5. La transformation progressive d’un sport dans le temps s’appelle son ____________________.",
  "6. L’action d’observer le jeu, signaler et décider selon des règles communes s’appelle l’____________________.",
  "7. L’ensemble des repères identitaires, des médias et des pratiques sociales autour d’un sport s’appelle sa ____________________.",
  "8. Diffusé dans de nombreux pays, le basketball est devenu un sport véritablement ____________________.",
  "9. Le respect des règles, de l’adversaire et de l’arbitre, dans la victoire comme dans la défaite, est une marque de ____________________.",
  "10. Le basketball s’y pratique dans un cadre scolaire, communautaire et compétitif, avec prudence quant aux faits historiques précis non vérifiés : il s’agit d’____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Où et quand le basketball a-t-il été inventé ?", opts: ["a) à Paris, en 1904", "b) à Springfield, aux États-Unis, en 1891", "c) à Genève, en 1932", "d) à Berlin, en 1936"] },
  { q: "2. Pourquoi James Naismith a-t-il inventé le basketball ?", opts: ["a) pour remplacer complètement le football", "b) pour proposer une activité collective praticable en intérieur pendant l’hiver", "c) pour créer un sport individuel", "d) pour organiser immédiatement des compétitions internationales"] },
  { q: "3. Que montre l’intégration du basketball aux Jeux olympiques ?", opts: ["a) qu’un sport ne change jamais après sa création", "b) qu’une compétition internationale peut contribuer à la visibilité mondiale d’un sport", "c) que seuls les hommes peuvent participer aux Jeux olympiques", "d) que les Jeux olympiques n’ont aucune influence sur le basketball"] },
  { q: "4. Comment ce chapitre présente-t-il le basketball féminin ?", opts: ["a) comme une pratique secondaire sans intérêt", "b) comme une partie intégrante de l’histoire du sport, avec des faits vérifiés", "c) en la comparant systématiquement pour la dévaloriser", "d) en inventant des résultats pour la rendre plus intéressante"] },
  { q: "5. Que doit faire un élève face à une information historique sur le basketball en Haïti qu’il ne peut pas vérifier ?", opts: ["a) l’affirmer quand même si elle semble plausible", "b) l’omettre ou la formuler avec prudence plutôt que de la présenter comme un fait certain", "c) l’inventer pour compléter son travail", "d) l’ignorer complètement sans le signaler"] },
  { q: "6. Que signifie la culture sportive d’un sport, selon ce chapitre ?", opts: ["a) uniquement les résultats des compétitions", "b) l’ensemble des repères identitaires, des médias et des pratiques sociales qui l’entourent", "c) seulement les marques commerciales associées à ce sport", "d) uniquement le règlement technique du jeu"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque notion de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Naismith", "a) Ensemble des repères identitaires, des médias et des pratiques sociales autour d’un sport"],
  ["2. FIBA", "b) Respect des règles, de l’adversaire et de l’arbitre, dans la victoire comme dans la défaite"],
  ["3. Jeux olympiques", "c) Transformation progressive du matériel, des règles et de l’organisation d’un sport dans le temps"],
  ["4. Culture sportive", "d) Développement de la pratique et de la visibilité des joueuses, partie intégrante de l’histoire du basketball"],
  ["5. Fair-play", "e) Pratique scolaire, communautaire et compétitive, documentée avec prudence faute de sources complètes"],
  ["6. Évolution du jeu", "f) Éducateur physique qui a inventé le basketball en 1891, à Springfield"],
  ["7. Basketball féminin", "g) Fédération internationale qui organise le basketball à l’échelle mondiale"],
  ["8. Basketball en Haïti", "h) Compétition qui a contribué à la visibilité internationale du basketball"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Pourquoi les règles d’un sport comme le basketball évoluent-elles au fil du temps ? Donne au moins deux exemples présentés dans ce chapitre.",
  "2. Explique comment une activité conçue à l’origine dans un cadre éducatif (le basketball de Naismith) a pu devenir un phénomène sportif international.",
  "3. En comparant une illustration ancienne et une illustration récente du basketball, que peux-tu observer comme changement, et que peux-tu seulement supposer comme hypothèse ?",
  "4. Explique pourquoi le fair-play et la culture sportive sont étroitement liés, en t’appuyant sur un exemple concret de comportement autour d’un match.",
  "5. Pourquoi est-il important, en parlant du basketball en Haïti, de distinguer ce qui est réellement vérifié de ce qui ne l’est pas ?",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 54, "Manuel_EPS_9AF_Chapitre5.docx");
console.log("Chapitre 5 (9e AF) genere:", outPath);
