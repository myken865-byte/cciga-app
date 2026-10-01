// Manuel d'EPS 9e AF — Chapitre 3
// Football : histoire, evolution et place dans le patrimoine sportif haitien
//
// Sources reellement consultees pour les faits historiques de ce chapitre
// (a integrer aux References finales du manuel) :
// - Wikipedia (EN) "Haitian Football Federation" : fondation 1904, affiliation
//   FIFA 1934, affiliation CONCACAF 1961.
// - Wikipedia (EN) "Haiti national football team" : premier match
//   international le 22 mars 1925 contre la Jamaique (defaite 1-2) ;
//   qualification et campagne a la Coupe du monde 1974 (groupe Italie,
//   Pologne, Argentine ; resultats Italie 3-1, Pologne 7-0, Argentine 4-1) ;
//   "Golden Age" des annees 1970, 3e equipe de la CONCACAF derriere le
//   Mexique.
// - FIFA.com, article "Newcomers Haiti give Italy mighty fright at World
//   Cup 1974" : but d'Emmanuel Sanon a la 46e minute, fin de la serie de
//   1143 minutes sans but encaisse du gardien italien Dino Zoff.
// - Wikipedia (EN) "Emmanuel Sanon" : carriere professionnelle en Floride
//   dans les annees 1980, puis selectionneur de l'equipe haitienne, deces a
//   Orlando en 2008, funerailles d'Etat en Haiti.
// - Wikipedia (EN) "Haiti women's national football team" et "1991 CONCACAF
//   Women's Championship" : premier match le 17 avril 1991 (victoire 1-0
//   contre la Jamaique a Port-au-Prince), tournoi hote la meme annee,
//   4e place (meilleur resultat historique), defaite en demi-finale contre
//   les Etats-Unis.
// - Wikipedia (EN) "2023 FIFA Women's World Cup Group D" : premiere
//   qualification d'Haiti a une Coupe du monde feminine (Australie/
//   Nouvelle-Zelande 2023), groupe avec l'Angleterre, le Danemark et la
//   Chine, trois defaites (0-1, 0-1, 0-2), aucun but marque.
// - Wikipedia (EN) "The Football Association" et resultats de recherche
//   croises : codification des regles modernes a Londres en 1863 ; FIFA
//   fondee a Paris en 1904 par sept pays ; premiere Coupe du monde en 1930
//   en Uruguay (l'hote remporte le titre face a l'Argentine, 4-2).
// Aucune date, club, dirigeant ou evenement non verifie n'a ete invente ;
// lorsqu'une information n'a pas pu etre confirmee (ex. premiers clubs
// haitiens, pionniers precis), elle a ete volontairement omise plutot que
// fabriquee.
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
  3,
  "Football : histoire, évolution et place dans le patrimoine sportif haïtien",
  "En 1974, un but a suffi pour arrêter, l’espace d’un instant, un gardien resté invaincu pendant plus de 1 100 minutes — et pour inscrire Haïti dans l’histoire de la Coupe du monde. Que reste-t-il aujourd’hui de ce moment ?",
  [
    "Situer quelques grandes étapes de l’histoire du football moderne.",
    "Expliquer comment le football s’est diffusé et organisé dans le monde.",
    "Expliquer la place du football dans le patrimoine sportif haïtien.",
    "Comprendre pourquoi la qualification d’Haïti à la Coupe du monde de 1974 reste un repère majeur.",
    "Distinguer un fait historique vérifiable d’une interprétation ou d’une opinion.",
    "Analyser une chronologie, une illustration ou un court document sportif.",
    "Relier football, fair-play, responsabilité et patrimoine.",
  ],
));

children.push(illustrationBox(
  "ILL-9AF-C03-01",
  "Frise synthétique de l’évolution du football",
  "Frise chronologique sobre, horizontale, avec un petit nombre de repères clairement datés et espacés (codification des règles au XIXe siècle, fondation de la FIFA, premières compétitions internationales, développement du football en Haïti, Coupe du monde 1974, essor du football féminin). Style épuré, sans ornement inutile.",
  "Les grandes étapes de l’évolution du football, du jeu codifié aux compétitions internationales.",
  "Donner un repère chronologique global avant d’entrer dans le détail de chaque période.",
  "Paysage, format horizontal, frise pleine largeur.",
));
children.push(spacer(200));

// ---- 3.1 ----
children.push(sectionHeading("Des jeux de ballon au football moderne", "3.1"));
children.push(bodyPar(
  "Des jeux impliquant un ballon ou un objet à faire progresser avec les pieds ont existé dans plusieurs sociétés à travers l’histoire. Ces pratiques anciennes ne doivent toutefois pas être confondues avec le football moderne : c’est au XIXe siècle, en Angleterre, que des règles communes ont été progressivement écrites, permettant de distinguer clairement le football des autres jeux de ballon, comme le rugby."
));
children.push(bodyPar(
  "Ce chapitre reste prudent sur les origines anciennes du jeu : de nombreuses affirmations historiques largement répétées ne sont pas toutes vérifiées avec la même rigueur. Seule la codification progressive des règles, bien documentée, est présentée ici comme un repère fiable."
));
children.push(spacer(200));

// ---- 3.2 ----
children.push(sectionHeading("Codification, règles et organisation", "3.2"));
children.push(bodyPar(
  "En 1863, à Londres, une association de football a formalisé un premier ensemble de règles communes. Cette codification a permis d’organiser des rencontres entre équipes différentes, puis des compétitions régulières, en s’appuyant sur des éléments partagés : un terrain délimité, deux équipes, un arbitre chargé de faire respecter les règles, une durée de jeu fixée, et un but du jeu clairement défini — faire progresser le ballon pour marquer, dans le respect des règles communes."
));
children.push(calloutBox(
  "À retenir",
  ["Des règles communes, écrites et partagées, sont ce qui a permis au football de devenir un jeu organisé, comparable d’un pays à l’autre."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, "1F4E5F",
));
children.push(illustrationBox(
  "ILL-9AF-C03-02",
  "Codification et organisation du football moderne",
  "Infographie pédagogique sobre présentant les éléments de base de l’organisation du jeu : terrain délimité, deux équipes, arbitre, durée, but du jeu. Icônes simples, style épuré, aucune marque commerciale.",
  "Les éléments qui organisent une rencontre de football depuis sa codification.",
  "Synthétiser visuellement les bases de l’organisation du jeu.",
  "Paysage, format horizontal, infographie pleine largeur.",
));
children.push(spacer(200));

// ---- 3.3 ----
children.push(sectionHeading("Diffusion internationale et compétitions", "3.3"));
children.push(bodyPar(
  "À partir de règles communes, le football s’est progressivement diffusé bien au-delà de l’Angleterre, porté notamment par les échanges internationaux. En 1904, à Paris, sept pays ont fondé la Fédération Internationale de Football Association (FIFA), chargée d’organiser le football à l’échelle mondiale. Des clubs, puis des sélections nationales, se sont constitués dans de nombreux pays, rendant possible l’organisation de compétitions internationales. La première Coupe du monde masculine a eu lieu en 1930, en Uruguay, pays hôte qui a remporté le titre face à l’Argentine."
));
children.push(illustrationBox(
  "ILL-9AF-C03-03",
  "La diffusion internationale du football",
  "Schéma pédagogique simple (non cartographique et non trompeur) montrant, par des flèches ou des icônes reliées, l’idée de diffusion progressive du football : règles communes → clubs → sélections nationales → compétitions internationales. Éviter toute carte présentée comme géographiquement précise si elle ne l’est pas.",
  "La diffusion du football, des règles communes aux compétitions internationales.",
  "Illustrer la progression logique de la diffusion du football sans induire en erreur sur des données géographiques précises.",
  "Paysage, format horizontal, schéma simple.",
));
children.push(spacer(200));

// ---- 3.4 ----
children.push(sectionHeading("Évolution du football", "3.4"));
children.push(bodyPar(
  "Depuis sa codification, le football a beaucoup évolué : les règles ont été précisées et ajustées, l’arbitrage s’est outillé (assistants, puis technologies d’aide à la décision), la préparation physique et les tactiques se sont professionnalisées, les équipements ont changé, la médiatisation s’est considérablement développée, et la participation s’est élargie — notamment celle des femmes. Ce chapitre montre qu’un sport peut évoluer profondément dans le temps tout en conservant des principes fondamentaux : des règles communes, un esprit de compétition organisée, et le respect de l’adversaire."
));
children.push(spacer(200));

// ---- 3.5 ----
children.push(sectionHeading("Implantation et développement du football en Haïti", "3.5"));
children.push(bodyPar(
  "En Haïti, le football s’est organisé à l’échelle nationale avec la fondation, en 1904, de la Fédération Haïtienne de Football (FHF), aujourd’hui l’instance responsable de l’organisation du football dans le pays. La FHF a été affiliée à la FIFA en 1934, puis à la Confédération de football d’Amérique du Nord, d’Amérique centrale et des Caraïbes (CONCACAF) en 1961, dont elle est membre fondateur. Le premier match international connu de la sélection masculine haïtienne remonte au 22 mars 1925, face à la Jamaïque (défaite 1-2)."
));
children.push(bodyPar(
  "Ce manuel ne cite volontairement aucun club, dirigeant ou événement antérieur qui n’aurait pas pu être vérifié avec certitude : l’histoire détaillée des tout premiers clubs et pionniers du football haïtien mériterait une recherche documentaire plus approfondie que ce chapitre ne peut en proposer.",
  { italics: true }
));
children.push(illustrationBox(
  "ILL-9AF-C03-04",
  "Le football en Haïti",
  "Reconstitution pédagogique (clairement identifiée comme telle, non comme une photographie d’archive) d’une scène de football dans une cour ou un petit terrain haïtien du début du XXe siècle : joueurs en tenue simple de l’époque, ambiance communautaire. Légende précisant explicitement qu’il s’agit d’une reconstitution pédagogique.",
  "Une reconstitution pédagogique évoquant les débuts organisés du football en Haïti — jamais présentée comme une photographie d’archive authentique.",
  "Illustrer la période sans faire passer une image générée pour un document historique réel.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 3.6 ----
children.push(sectionHeading("Haïti et la Coupe du monde 1974", "3.6"));
children.push(bodyPar(
  "En 1974, la sélection masculine haïtienne termine première de son groupe de qualification de la CONCACAF et se qualifie pour la Coupe du monde organisée en Allemagne de l’Ouest — la toute première participation d’Haïti à ce tournoi. Ce résultat s’inscrit dans ce que plusieurs sources sportives appellent l’« âge d’or » du football haïtien dans les années 1970, période où la sélection est considérée comme l’une des plus fortes de la CONCACAF, derrière le Mexique."
));
children.push(bodyPar(
  "Lors du tournoi, Haïti est placée dans un groupe très relevé, avec l’Italie, la Pologne et l’Argentine. Dès le match d’ouverture face à l’Italie, l’attaquant haïtien Emmanuel Sanon inscrit un but resté célèbre, à la 46e minute : il met fin à une série de 1 143 minutes sans but encaissé du gardien italien Dino Zoff. Haïti perd finalement ce match 3-1, puis s’incline face à la Pologne (7-0) et à l’Argentine (4-1), terminant dernière de son groupe. Sanon inscrit un second but au cours du tournoi."
));
children.push(calloutBox(
  "Le savais-tu ?",
  ["Malgré trois défaites, la qualification d’Haïti en 1974 reste, encore aujourd’hui, la seule participation de la sélection masculine haïtienne à une Coupe du monde — ce qui en fait un repère durable du patrimoine sportif national."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A0F",
));
children.push(illustrationBox(
  "ILL-9AF-C03-05",
  "Haïti à la Coupe du monde 1974",
  "Illustration pédagogique commémorative (non photographique) évoquant l’équipe haïtienne de 1974 sur un terrain de Coupe du monde, dans un style sobre et respectueux, clairement présentée en légende comme une illustration commémorative et non comme une photographie d’archive.",
  "Une évocation commémorative de la participation historique d’Haïti à la Coupe du monde 1974.",
  "Marquer visuellement ce repère du patrimoine sportif sans jamais le faire passer pour un document d’archive authentique.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ---- 3.7 ----
children.push(sectionHeading("Figures et mémoire du football haïtien", "3.7"));
children.push(bodyPar(
  "La mémoire d’un sport se construit aussi à travers des figures reconnues. Emmanuel Sanon, auteur du but resté célèbre contre l’Italie en 1974, illustre bien comment un joueur peut devenir une référence durable dans la mémoire collective d’un pays : il poursuit ensuite une carrière professionnelle en Floride dans les années 1980, puis devient plus tard sélectionneur de l’équipe nationale haïtienne. À son décès à Orlando en 2008, il reçoit des funérailles d’État en Haïti — un signe de la place qu’il occupe dans le patrimoine sportif national."
));
children.push(bodyPar(
  "Au-delà des joueurs, cette mémoire collective se construit aussi grâce aux entraîneurs, aux arbitres, aux équipes et aux supporters, qui transmettent d’une génération à l’autre le souvenir des grands moments du football haïtien."
));
children.push(spacer(200));

// ---- 3.8 ----
children.push(sectionHeading("Football féminin et participation", "3.8"));
children.push(bodyPar(
  "Le football féminin haïtien a lui aussi son histoire propre. La sélection féminine dispute son premier match international connu le 17 avril 1991, à Port-au-Prince, face à la Jamaïque (victoire 1-0). Quelques jours plus tard, Haïti accueille et dispute la toute première édition du championnat féminin de la CONCACAF, où elle termine à la 4e place — son meilleur résultat historique dans cette compétition — après une défaite en demi-finale face aux États-Unis."
));
children.push(bodyPar(
  "En 2023, la sélection féminine haïtienne se qualifie pour la première fois de son histoire à la Coupe du monde féminine, organisée en Australie et en Nouvelle-Zélande. Placée dans un groupe avec l’Angleterre, le Danemark et la Chine, elle perd ses trois matchs (0-1, 0-1 et 0-2) sans marquer de but. Cette qualification reste néanmoins présentée, dans plusieurs sources sportives, comme une réussite historique en elle-même, indépendamment des résultats obtenus sur le terrain."
));
children.push(illustrationBox(
  "ILL-9AF-C03-06",
  "Le football féminin haïtien",
  "Scène respectueuse et crédible d’une équipe féminine haïtienne de football à l’entraînement ou en match, dans un environnement scolaire ou communautaire haïtien. Joueuses en action, attitude déterminée et professionnelle, aucun stéréotype.",
  "Une représentation respectueuse et crédible du football féminin haïtien.",
  "Illustrer la place du football féminin dans le patrimoine sportif haïtien, sans stéréotype.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ---- 3.9 ----
children.push(sectionHeading("Football, société et patrimoine", "3.9"));
children.push(bodyPar(
  "Le football occupe une place particulière dans de nombreuses sociétés, y compris en Haïti : il se pratique à l’école, dans les quartiers et les communautés, il rassemble des familles autour des médias lors des grandes compétitions, et il suscite des émotions collectives fortes. Il contribue ainsi à un sentiment d’identité partagée et se transmet d’une génération à l’autre, notamment à travers les souvenirs familiaux."
));
children.push(bodyPar(
  "Cette place du football dans la société ne doit toutefois pas être idéalisée : comme toute pratique sociale largement suivie, le football peut aussi être associé à des tensions, à des déceptions, ou à des attentes parfois disproportionnées. Une lecture équilibrée reconnaît à la fois ce que le football apporte à une communauté et les limites de ce qu’il peut réellement changer."
));
children.push(spacer(200));

// ---- 3.10 ----
children.push(sectionHeading("Valeurs et comportements", "3.10"));
children.push(bodyPar(
  "Le football, comme toute pratique sportive, repose sur des valeurs concrètes : le fair-play, le respect de l’adversaire, de l’arbitre et des règles, la responsabilité, la maîtrise de soi, la coopération avec ses coéquipiers, et le refus explicite de toute violence ou discrimination, sur le terrain comme dans les tribunes."
));
children.push(calloutBox(
  "Fair-play",
  ["Le fair-play, c’est respecter les règles, l’adversaire et l’arbitre, dans la victoire comme dans la défaite — et refuser toute forme de violence ou de discrimination liée au jeu."],
  BOX_FAIRPLAY_FILL, BOX_FAIRPLAY_LINE, BOX_FAIRPLAY_TITLE,
));
children.push(illustrationBox(
  "ILL-9AF-C03-07",
  "Fair-play et responsabilité",
  "Situation à analyser : un joueur haïtien de 9e AF aidant un adversaire à se relever après une action de jeu, sous le regard d’un arbitre scolaire. Attitude clairement respectueuse.",
  "Une situation concrète de fair-play à observer et à analyser.",
  "Servir de support à une réflexion sur les valeurs sportives.",
  "Paysage, format horizontal, plan rapproché.",
));
children.push(spacer(200));

// ---- 3.11 ----
children.push(sectionHeading("Lire une chronologie sportive", "3.11"));
children.push(bodyPar(
  "Lire une chronologie, c’est savoir identifier la date d’un événement, le nommer précisément, le replacer dans un ordre par rapport aux autres événements, reconnaître ce qui relève de la continuité (ce qui ne change pas) et ce qui relève du changement, et enfin évaluer l’importance de cet événement dans une histoire plus large."
));
children.push(spacer(200));

// ---- 3.12 ----
children.push(sectionHeading("Distinguer fait, interprétation et opinion", "3.12"));
children.push(bodyPar(
  "Toutes les phrases que l’on peut lire ou entendre sur le football n’ont pas la même valeur. Un fait vérifiable s’appuie sur des sources fiables et recoupées (par exemple : « Haïti a joué son premier match de Coupe du monde en 1974 »). Une interprétation propose une explication argumentée à partir de faits (par exemple : « Ce résultat s’explique par… »). Une opinion exprime un jugement personnel qui peut varier d’une personne à l’autre (par exemple : « C’était la meilleure équipe de l’histoire d’Haïti »)."
));
children.push(calloutBox(
  "Méthode — Vérifier une information historique sportive",
  [
    "Identifier l’auteur ou l’organisme à l’origine de l’information.",
    "Vérifier la date de l’information et celle de l’événement décrit.",
    "Identifier la source (site officiel, organisme sportif, ouvrage documenté).",
    "Recouper l’information avec au moins une autre source fiable.",
    "Distinguer ce qui est un fait vérifiable de ce qui relève de l’interprétation ou de l’opinion.",
  ],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(illustrationBox(
  "ILL-9AF-C03-08",
  "Lire une chronologie, distinguer fait et opinion",
  "Support visuel sobre montrant, d’un côté, une courte chronologie à points numérotés, et de l’autre, trois courtes phrases étiquetées « fait », « interprétation » et « opinion » à titre d’exemple. Style clair, pédagogique, sans illustration figurative complexe.",
  "Un support visuel d’entraînement à la lecture chronologique et à la distinction fait/opinion.",
  "Servir de support à l’activité de lecture critique du chapitre.",
  "Paysage, format horizontal, schéma pédagogique.",
));
children.push(spacer(200));

// ---- Contextualisation ----
children.push(sectionHeading("Le football, une pratique enracinée dans le quotidien haïtien", ""));
children.push(bodyPar(
  "Que ce soit à l’école, sur un terrain communautaire ou dans un club, le football occupe une place très concrète dans la vie de nombreux élèves haïtiens : matchs entre camarades, discussions sur les résultats des grandes compétitions, souvenirs transmis en famille autour de la sélection nationale. Ce chapitre garde un ton éducatif et non partisan : il ne prend jamais parti pour un club, une équipe ou une rivalité en particulier."
));
children.push(spacer(200));

// ================= ACTIVITE PRINCIPALE =================
children.push(pageBreak());
children.push(sectionHeading("Activité principale — « Construisons la frise du football »", ""));
children.push(bodyPar(
  "Ton enseignant te remet une série d’événements déjà vérifiés, mêlant histoire mondiale du football et histoire du football haïtien (par exemple : codification des règles en 1863, fondation de la FIFA en 1904, fondation de la FHF en 1904, première Coupe du monde en 1930, premier match international haïtien en 1925, qualification d’Haïti pour la Coupe du monde de 1974, premier match de la sélection féminine en 1991, qualification de la sélection féminine pour la Coupe du monde en 2023)."
));
[
  "Organisez ces événements dans l’ordre chronologique.",
  "Distinguez, pour chaque événement, s’il appartient à l’histoire mondiale du football ou à l’histoire du football haïtien.",
  "Choisissez deux événements que vous jugez particulièrement importants et justifiez ce choix.",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(bodyPar(
  "Les événements proposés par l’enseignant doivent toujours être préalablement vérifiés : cette activité ne demande jamais de mémoriser une date inventée.",
  { italics: true }
));
children.push(spacer(200));

// ================= ACTIVITE D'ANALYSE =================
children.push(sectionHeading("Activité d’analyse — « Pourquoi 1974 reste-t-il un repère ? »", ""));
children.push(bodyPar(
  "À partir du contenu de la section 3.6, réponds aux questions suivantes en développant une explication argumentée."
));
[
  "Quels faits précis peux-tu citer pour décrire la qualification et la campagne d’Haïti à la Coupe du monde de 1974 ?",
  "Dans quel contexte sportif cette qualification s’inscrit-elle (place de la sélection haïtienne à cette époque) ?",
  "En quoi ce résultat a-t-il une importance qui dépasse le simple résultat sportif (3 défaites) ?",
  "Selon toi, comment cet événement continue-t-il d’influencer la mémoire du football haïtien aujourd’hui ?",
].forEach((t, i) => children.push(numberedPar(`${i + 1}. ${t}`)));
children.push(spacer(200));

// ================= ACTIVITE DE LECTURE CRITIQUE =================
children.push(pageBreak());
children.push(sectionHeading("Activité de lecture critique — « Fait ou opinion ? »", ""));
children.push(bodyPar(
  "Pour chaque énoncé ci-dessous, indique s’il s’agit d’un fait vérifiable, d’une interprétation ou d’une opinion, et justifie ta réponse."
));
[
  "« La Fédération Haïtienne de Football a été fondée en 1904. »",
  "« Emmanuel Sanon a marqué un but resté célèbre contre l’Italie en 1974. »",
  "« L’équipe haïtienne de 1974 était la meilleure équipe de l’histoire du pays. »",
  "« La qualification d’Haïti à la Coupe du monde féminine de 2023 est une réussite historique, même sans victoire. »",
  "« Le football est le sport le plus important du monde. »",
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
    ["Situer quelques repères de l’histoire du football", "", ""],
    ["Expliquer pourquoi les règles et pratiques évoluent", "", ""],
    ["Expliquer la place du football dans le patrimoine haïtien", "", ""],
    ["Analyser une chronologie simple", "", ""],
    ["Distinguer un fait d’une opinion", "", ""],
    ["Expliquer l’importance du fair-play et du respect", "", ""],
  ],
  [3800, 3200, 2200],
));
children.push(spacer(200));

// ================= RESUME =================
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Le football moderne naît de la codification de règles communes en Angleterre au XIXe siècle, distinctes des jeux de ballon plus anciens.",
  "La FIFA, fondée en 1904 à Paris, et la première Coupe du monde, disputée en 1930 en Uruguay, marquent la diffusion internationale du football.",
  "Le football a beaucoup évolué (règles, arbitrage, tactiques, équipements, médiatisation, participation) tout en gardant des principes fondamentaux.",
  "La Fédération Haïtienne de Football, fondée en 1904, organise le football en Haïti ; elle est affiliée à la FIFA depuis 1934 et à la CONCACAF depuis 1961.",
  "La qualification d’Haïti à la Coupe du monde masculine de 1974, marquée par le but d’Emmanuel Sanon contre l’Italie, reste un repère majeur du patrimoine sportif haïtien.",
  "La sélection féminine haïtienne a construit sa propre histoire, du premier match en 1991 à la première qualification en Coupe du monde en 2023.",
  "Le football occupe une place importante dans la société haïtienne, sans que cette place doive être idéalisée.",
  "Le fair-play, le respect et le refus de la violence et de la discrimination restent des valeurs centrales du football.",
  "Lire une chronologie et distinguer un fait vérifiable d’une interprétation ou d’une opinion sont des compétences essentielles pour analyser l’histoire du sport.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= PREPARATION A L'EVALUATION =================
children.push(calloutBox(
  "Préparation à l’évaluation",
  [
    "Ce chapitre t’aide à t’entraîner à : interpréter une frise, une illustration ou un court document ; situer un événement dans le temps ; expliquer une évolution ; distinguer un fait d’une opinion ; et argumenter sur la valeur patrimoniale d’un événement sportif.",
    "Ce travail de préparation ne reproduit pas et ne prétend pas reproduire une future épreuve officielle du MENFP.",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(3));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(codification - diffusion - patrimoine - fair-play - chronologie - arbitre - fait - opinion - repère - mémoire)", italics: true, color: "555555" },
]));
[
  "1. Établir des règles communes qui permettent d’organiser rencontres et compétitions s’appelle la ____________________.",
  "2. Le fait, pour une pratique sportive, de se répandre et de devenir largement pratiquée dans différents pays s’appelle sa ____________________.",
  "3. L’ensemble des repères, événements et mémoires qu’une société conserve autour d’un sport s’appelle son ____________________.",
  "4. Respecter adversaires, partenaires, règles et arbitre, dans la victoire comme dans la défaite, est une marque de ____________________.",
  "5. Mettre des événements en ordre selon leur date pour observer continuité et changement s’appelle une ____________________.",
  "6. La personne qui observe le jeu, signale et décide selon des règles communes s’appelle l’____________________.",
  "7. Une information vérifiable, appuyée par des sources fiables et recoupées, s’appelle un ____________________.",
  "8. Un jugement personnel qui peut varier d’une personne à l’autre, non vérifiable comme un fait, s’appelle une ____________________.",
  "9. Un événement marquant que l’on retient comme particulièrement important dans une histoire s’appelle un ____________________.",
  "10. Ce qu’une communauté transmet d’une génération à l’autre à propos d’un événement ou d’une pratique s’appelle sa ____________________.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Pourquoi les règles communes (codification) ont-elles été importantes pour le développement du football ?", opts: ["a) elles ont rendu le jeu impossible à organiser", "b) elles ont permis d’organiser des rencontres et des compétitions entre équipes différentes", "c) elles n’ont eu aucune influence sur le jeu", "d) elles ont supprimé toute compétition"] },
  { q: "2. Que représente la qualification d’Haïti à la Coupe du monde masculine de 1974 ?", opts: ["a) un événement sans importance pour le football haïtien", "b) un repère majeur du patrimoine sportif national", "c) la première participation d’un pays caribéen à une Coupe du monde", "d) une victoire d’Haïti en finale"] },
  { q: "3. Que doit faire un élève face à une information historique sportive non vérifiée ?", opts: ["a) la répéter comme si elle était certaine", "b) chercher à la vérifier avant de la considérer comme un fait", "c) l’ignorer complètement sans réagir", "d) l’inventer si elle semble plausible"] },
  { q: "4. Qu’est-ce qui distingue un fait historique d’une opinion ?", opts: ["a) un fait est toujours plus récent qu’une opinion", "b) un fait est vérifiable par des sources fiables, une opinion est un jugement personnel", "c) une opinion est toujours fausse", "d) il n’existe aucune différence entre les deux"] },
  { q: "5. Que montre l’évolution du football au fil du temps, selon ce chapitre ?", opts: ["a) que le sport n’a jamais changé depuis sa codification", "b) qu’un sport peut évoluer (règles, tactiques, équipements) tout en conservant des principes fondamentaux", "c) que seules les règles ont changé, jamais les tactiques", "d) que l’évolution du football ne concerne que les compétitions internationales"] },
  { q: "6. Comment ce chapitre présente-t-il le football féminin haïtien ?", opts: ["a) comme une pratique secondaire sans intérêt", "b) avec respect et égalité, en s’appuyant sur des faits vérifiés", "c) en inventant des résultats pour le rendre plus intéressant", "d) en le comparant systématiquement au football masculin pour le déprécier"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque notion de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Codification", "a) Respect des règles, de l’adversaire et de l’arbitre, dans la victoire comme dans la défaite"],
  ["2. Diffusion", "b) Mise en ordre d’événements selon leur date, permettant d’observer continuité et changement"],
  ["3. Patrimoine", "c) Action d’observer le jeu, signaler et décider selon des règles communes"],
  ["4. Fair-play", "d) Information vérifiable, appuyée par des sources fiables et recoupées"],
  ["5. Chronologie", "e) Jugement personnel qui peut varier d’une personne à l’autre, non vérifiable comme un fait"],
  ["6. Arbitrage", "f) Fait d’établir des règles communes permettant d’organiser rencontres et compétitions"],
  ["7. Fait historique", "g) Fait, pour une pratique sportive, de se répandre et de devenir largement pratiquée"],
  ["8. Opinion", "h) Ensemble des repères, événements et mémoires qu’une société conserve autour d’un sport"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Explique pourquoi la qualification d’Haïti à la Coupe du monde de 1974 est considérée comme un repère important du patrimoine sportif haïtien, même si l’équipe n’a remporté aucun match du tournoi.",
  "2. Un camarade affirme : « Le football n’a jamais changé depuis sa codification au XIXe siècle. » Explique pourquoi cette affirmation est incorrecte, en donnant au moins deux exemples d’évolution présentés dans ce chapitre.",
  "3. Un texte affirme : « L’équipe haïtienne de 1974 était clairement la meilleure de l’histoire du pays. » Explique s’il s’agit d’un fait vérifiable ou d’une opinion, et justifie ta réponse.",
  "4. Explique en quoi la participation d’Haïti à la Coupe du monde féminine de 2023, malgré trois défaites, peut être considérée comme une réussite historique importante.",
  "5. Décris une situation où le fair-play pourrait être mis à l’épreuve pendant un match de football, et explique comment un joueur, un entraîneur ou un supporter pourrait réagir de façon responsable.",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 27, "Manuel_EPS_9AF_Chapitre3.docx");
console.log("Chapitre 3 (9e AF) genere:", outPath);
