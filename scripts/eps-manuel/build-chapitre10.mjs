import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_SANTE_FILL, BOX_SANTE_LINE, BOX_SANTE_TITLE,
  BOX_CITOYEN_FILL, BOX_CITOYEN_LINE, BOX_CITOYEN_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(10, "Hygiène de vie, santé, récupération et pratique physique responsable"));

children.push(
  calloutBox(
    "Situation de départ",
    [
      "En dix chapitres, tu as appris à t'échauffer, à courir, sauter, lancer, jouer au basket-ball, au football, au volley-ball, à réaliser des équilibres en gymnastique, et à respecter des règles de sécurité. Mais l'EPS ne s'arrête pas à la fin de l'année scolaire : elle t'a aussi transmis des habitudes utiles pour toute ta vie.",
      "Ce dernier chapitre fait la synthèse entre activité physique, hygiène, hydratation, alimentation, sommeil, sécurité et responsabilité, pour t'aider à devenir progressivement autonome dans une pratique physique raisonnable et durable.",
    ],
    "F0F0F0", "1F4E5F", NAVY,
  ),
  spacer(240),
);

children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "expliquer le lien général entre activité physique régulière et bien-être ;",
  "identifier des habitudes simples d’hygiène avant et après une séance d’EPS ;",
  "comprendre l’importance de boire de l’eau de manière appropriée, particulièrement dans un climat chaud ;",
  "comprendre le rôle général d’une alimentation variée et équilibrée, sans régime ni restriction ;",
  "expliquer pourquoi le sommeil et la récupération sont importants ;",
  "reconnaître les signes simples indiquant qu’il faut ralentir, arrêter l’activité et prévenir l’enseignant ;",
  "préparer de manière élémentaire tes affaires pour une séance d’EPS ;",
  "participer à l’entretien et au rangement responsable du matériel ;",
  "construire un petit projet personnel d’activité physique raisonnable et adapté à ton âge.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Mots-clés"));
children.push(mixedPar([
  { text: "Bien-être, hygiène, hydratation, alimentation, sommeil, récupération, sécurité, responsabilité, autonomie.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ================= 10.1 =================
children.push(sectionHeading("Activité physique et bien-être", "10.1"));
children.push(bodyPar(
  "Une activité physique régulière, adaptée à ton âge, contribue à ton développement moteur, à ton énergie, à ta coordination, à ta concentration en classe et à ta capacité à coopérer avec les autres. Elle participe aussi, plus largement, à ton bien-être général."
));
children.push(bodyPar(
  "Ce chapitre ne fait aucune promesse médicale absolue : l’activité physique est bénéfique, mais elle ne remplace jamais un avis médical si nécessaire. Elle n’a pas non plus pour but de te faire correspondre à un idéal corporel particulier : chaque corps est différent, et l’essentiel est de bouger régulièrement, comme tu l’as appris au chapitre 3."
));
children.push(spacer(160));

// ================= 10.2 =================
children.push(sectionHeading("Hygiène avant et après l’EPS", "10.2"));
children.push(bodyPar(
  "Quelques habitudes simples t’aident à pratiquer l’EPS dans de bonnes conditions : porter une tenue propre et adaptée, porter des chaussures appropriées lorsqu’elles sont demandées, avoir les mains propres, garder tes affaires personnelles organisées, et changer ou nettoyer ta tenue après la séance lorsque cela est possible."
));
children.push(bodyPar(
  "Il est important de ne pas partager certains objets personnels d’hygiène (comme une serviette ou une bouteille d’eau) avec d’autres élèves. Ces recommandations doivent toujours s’adapter aux réalités matérielles de chaque famille et de chaque établissement, sans jamais porter de jugement sur ce que chacun peut ou ne peut pas avoir."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C10-01",
  "Préparer sa séance",
  "Dessiner un élève haïtien de 7e AF, à la maison ou dans la cour de l’école, en train de préparer calmement ses affaires pour une séance d’EPS : tenue de sport propre, une petite bouteille d’eau personnelle, et son matériel scolaire habituel posé à côté. Ambiance simple et réaliste, sans objet coûteux ou superflu.",
  "Bien préparer sa tenue, son eau et son matériel avant une séance d’EPS.",
  "Illustrer concrètement les éléments d’une bonne préparation avant une séance, en lien avec la section 10.7.",
));
children.push(spacer(200));

// ================= 10.3 =================
children.push(sectionHeading("Hydratation", "10.3"));
children.push(bodyPar(
  "Comme tu l’as appris au chapitre 3, le corps perd de l’eau pendant l’activité physique, notamment par la transpiration. Il est donc important d’avoir accès à de l’eau potable et de boire régulièrement, en adaptant la quantité à l’activité pratiquée et aux conditions climatiques."
));
children.push(bodyPar(
  "En Haïti, la chaleur et l’exposition directe au soleil demandent une attention particulière : il faut boire plus souvent lors des journées chaudes, et éviter de rester trop longtemps en plein soleil sans raison. Les boissons énergisantes ou les produits stimulants ne sont jamais recommandés pour les élèves : l’eau reste toujours la boisson de référence."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C10-02",
  "Hydratation",
  "Dessiner un petit groupe d’élèves haïtiens buvant de l’eau à leur bouteille personnelle, pendant une pause organisée par l’enseignant, si possible à l’ombre. Ambiance calme, climat visiblement chaud (soleil, cour d’école), supervision de l’enseignant visible en arrière-plan.",
  "Une pause d’hydratation organisée, à l’ombre, sous la supervision de l’enseignant.",
  "Illustrer une pause d’hydratation bien organisée, adaptée au climat chaud d’Haïti.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Santé",
  ["Bois de l’eau régulièrement pendant l’effort, surtout par temps chaud, sans attendre d’avoir très soif. L’eau reste toujours la boisson de référence pendant et après l’activité physique."],
  BOX_SANTE_FILL, BOX_SANTE_LINE, BOX_SANTE_TITLE,
));
children.push(spacer(200));

// ================= 10.4 =================
children.push(sectionHeading("Alimentation et activité physique", "10.4"));
children.push(bodyPar(
  "Une alimentation variée apporte à ton corps l’énergie et les nutriments nécessaires à son fonctionnement, y compris pendant l’activité physique. En Haïti, une alimentation variée peut par exemple associer céréales, légumineuses, protéines, légumes et fruits locaux, comme tu l’as vu au chapitre 3."
));
children.push(bodyPar(
  "Ce chapitre ne classe jamais les aliments en « bons » ou « mauvais » d’un point de vue moral, et ne propose aucun régime amaigrissant, aucune restriction calorique et aucun objectif de poids. Un élève doit pouvoir apprendre et pratiquer l’EPS sans obsession de son apparence corporelle : l’essentiel est une alimentation variée et adaptée à tes besoins d’élève actif."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C10-03",
  "Alimentation variée",
  "Dessiner une composition pédagogique simple présentant des aliments variés et familiers du quotidien haïtien (céréales, légumineuses, protéines, légumes, fruits locaux), sans représentation de personnage ni de silhouette corporelle, dans le même esprit que l’illustration du chapitre 3. Aucun message de régime ou de restriction ne doit apparaître.",
  "Une alimentation variée, avec des aliments familiers du quotidien haïtien.",
  "Rappeler visuellement la notion de variété alimentaire, sans jamais promouvoir un régime ou un idéal corporel.",
));
children.push(spacer(200));

// ================= 10.5 =================
children.push(sectionHeading("Sommeil et récupération", "10.5"));
children.push(bodyPar(
  "Le repos et le sommeil participent à la récupération de ton corps, à ton attention en classe et à ta disponibilité pour tous tes apprentissages, y compris en EPS. Ce lien a déjà été présenté en détail au chapitre 3."
));
children.push(bodyPar(
  "Comme tu l’as appris au chapitre 4, le retour au calme après une activité physique fait aussi partie de la récupération. La récupération n’est jamais une perte de temps : elle est une partie normale et nécessaire de toute pratique physique."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C10-04",
  "Récupération",
  "Dessiner un petit groupe d’élèves haïtiens en train de marcher doucement après une séance d’EPS, dans une cour d’école calme, certains s’étirant légèrement, sous la supervision de l’enseignant qui organise le retour au calme. Ambiance posée, cohérente avec l’illustration du retour au calme du chapitre 4.",
  "Le retour au calme, la marche douce et l’organisation après l’activité : des gestes de récupération.",
  "Rappeler visuellement les gestes de récupération déjà présentés au chapitre 4, en lien avec le sommeil et le repos.",
));
children.push(spacer(200));

// ================= 10.6 =================
children.push(sectionHeading("Écouter les signaux du corps", "10.6"));
children.push(bodyPar(
  "Une douleur inhabituelle, un malaise, des vertiges ou une difficulté inhabituelle à respirer sont des signaux que ton corps t’envoie. Ils demandent toujours d’arrêter immédiatement l’activité et d’informer sans attendre l’enseignant ou un adulte responsable."
));
children.push(bodyPar(
  "Il ne t’est jamais demandé de poser toi-même un diagnostic médical : ton rôle est simplement de reconnaître qu’un signal inhabituel existe, et de le signaler. Continuer une activité malgré une douleur importante n’est jamais une attitude à valoriser, quelle que soit la situation."
));
children.push(spacer(160));

children.push(calloutBox(
  "Sécurité",
  ["Une douleur inhabituelle, un malaise ou des vertiges ne sont jamais des signes à ignorer : arrête l’activité et préviens immédiatement l’enseignant ou un adulte responsable."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(200));

// ================= 10.7 =================
children.push(sectionHeading("Se préparer à une séance d’EPS", "10.7"));
children.push(bodyPar("Une petite liste simple peut t’aider à bien te préparer avant chaque séance d’EPS :"));
[
  "une tenue adaptée à l’activité ;",
  "de l’eau, lorsque cela est disponible ;",
  "le matériel demandé par l’enseignant ;",
  "une bonne écoute des consignes données en début de séance ;",
  "une observation du terrain avant de commencer ;",
  "un échauffement réalisé selon les consignes de l’enseignant.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Une bonne préparation réduit les oublis et facilite l’organisation de toute la classe, pour que chacun puisse profiter pleinement de la séance."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Une bonne préparation avant une séance d’EPS (tenue, eau, matériel, écoute des consignes) profite à toute la classe, pas seulement à toi-même."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(200));

// ================= 10.8 =================
children.push(sectionHeading("Respect du matériel et de l’environnement", "10.8"));
children.push(bodyPar(
  "Transporter, utiliser, compter et ranger le matériel se fait toujours selon les consignes de l’enseignant. Prendre soin du matériel permet à tous les élèves d’en profiter, année après année."
));
children.push(bodyPar(
  "Cette responsabilité s’étend aussi à la cour, au terrain, aux espaces verts et à la propreté générale de l’établissement. Prendre soin des biens collectifs de l’école est directement lié à la citoyenneté : c’est une façon concrète de montrer du respect envers l’ensemble de la communauté scolaire."
));
children.push(spacer(160));

children.push(calloutBox(
  "Citoyen responsable",
  ["Ranger le matériel après usage, garder la cour d'école propre et respecter les espaces communs sont des gestes de citoyenneté aussi importants à l'école que dans toute la communauté."],
  BOX_CITOYEN_FILL, BOX_CITOYEN_LINE, BOX_CITOYEN_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C10-05",
  "Respect du matériel",
  "Dessiner un petit groupe d’élèves haïtiens rangeant ensemble le matériel d’EPS (ballons, cônes, cordes) sous la supervision de l’enseignant, dans une cour d’école propre et bien tenue. Ambiance coopérative et organisée.",
  "Ranger le matériel ensemble, sous la supervision de l’enseignant : un geste de responsabilité collective.",
  "Illustrer concrètement la responsabilité partagée du rangement et de l’entretien du matériel d’EPS.",
));
children.push(spacer(200));

// ================= 10.9 =================
children.push(sectionHeading("Activité physique au quotidien", "10.9"));
children.push(bodyPar(
  "L’activité physique ne se limite pas aux sports organisés en classe d’EPS : marcher, jouer activement, se déplacer à pied et pratiquer diverses activités physiques adaptées contribuent aussi à une vie active au quotidien."
));
children.push(bodyPar(
  "Ce chapitre n’impose aucun objectif rigide de durée ou d’intensité identique pour tous les élèves : l’âge, les capacités, l’état de santé et le contexte de chacun peuvent nécessiter des adaptations, toujours décidées par les adultes responsables (enseignants, parents, ou personnel de santé si besoin)."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-7AF-C10-06",
  "Vie active",
  "Dessiner plusieurs petites vignettes montrant différentes formes d’activité physique quotidienne adaptées aux jeunes, dans un contexte haïtien crédible : un élève qui marche pour se rendre à l’école, des enfants jouant activement dans la cour ou dans la rue en sécurité, un élève aidant à une tâche domestique qui demande du mouvement. Aucune activité dangereuse ou non supervisée sur la voie publique.",
  "L’activité physique au quotidien prend plusieurs formes, au-delà des sports organisés.",
  "Montrer que la vie active peut s’intégrer simplement au quotidien, sans matériel coûteux ni structure organisée.",
));
children.push(spacer(200));

// ================= 10.10 =================
children.push(sectionHeading("Construire un petit projet personnel", "10.10"));
children.push(bodyPar(
  "Pour terminer ce chapitre, tu vas réfléchir à un petit projet personnel d’activité physique : choisir quelques activités que tu apprécies réellement, et réfléchir à la manière de les pratiquer régulièrement et raisonnablement."
));
children.push(bodyPar(
  "Ce projet doit porter uniquement sur le plaisir, la régularité, la sécurité, la progression personnelle et l’organisation — jamais sur la perte de poids ou la transformation de ton apparence physique."
));
children.push(spacer(160));

// ================= 10.11 =================
children.push(sectionHeading("Bilan des apprentissages du manuel", "10.11"));
children.push(bodyPar(
  "Ce manuel t’a accompagné tout au long de l’année pour développer un ensemble de compétences liées à l’éducation physique et sportive :"
));
[
  "connaître ton corps et comprendre ses réactions à l’effort (chapitres 1 et 2) ;",
  "adopter des habitudes de santé, d’hygiène et de récupération (chapitre 3) ;",
  "t’échauffer, pratiquer en sécurité et prévenir les risques (chapitre 4) ;",
  "jouer collectivement au basket-ball, au football et au volley-ball (chapitres 5, 7 et 8) ;",
  "courir, sauter et lancer en athlétisme (chapitre 6) ;",
  "maîtriser des actions gymniques simples : équilibre et coordination (chapitre 9) ;",
  "coopérer, respecter les règles et pratiquer le fair-play tout au long de l’année ;",
  "adopter des habitudes de vie responsables et une pratique physique raisonnable (chapitre 10).",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Ce bilan valorise ton autonomie progressive, tout en rappelant que l’enseignant et les adultes responsables restent toujours présents pour t’accompagner et t’encadrer."
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Les habitudes que tu développes en EPS (hydratation, sommeil, sécurité, coopération, régularité) sont exactement les mêmes qui accompagnent les sportifs tout au long de leur vie, bien après l’école. Ce que tu apprends cette année te sert donc bien au-delà de la salle de classe."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-7AF-C10-07",
  "Bilan du manuel",
  "Dessiner une grande scène pédagogique réunissant, dans un même espace scolaire haïtien, plusieurs éléments symbolisant les dix chapitres : un ballon de basket-ball, un ballon de football, un ballon de volley-ball et un filet, une piste ou ligne de course, un petit tapis de gymnastique, une bouteille d’eau, et un groupe d’élèves haïtiens souriants réunis autour de leur enseignant. Composition claire, sans texte dans l’image, ambiance positive et rassembleuse.",
  "Un an d’apprentissages en EPS, résumé en une seule scène : sports, sécurité, santé et coopération.",
  "Offrir une image de synthèse visuelle du parcours complet de l’élève à travers les dix chapitres du manuel.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Mon sac d’EPS",
  [
    "Objectif : identifier ce qui est utile pour préparer une séance d’EPS.",
    "Organisation : activité individuelle ou en petit groupe, en classe ou à la maison avec l’accord d’un adulte.",
    "Matériel éventuel : une feuille pour dresser une liste, ou simplement une discussion orale en classe.",
    "Consignes : dresser la liste de ce qu’il est utile de préparer avant une séance d’EPS (tenue, eau, matériel), en tenant compte de ce qui est réellement disponible chez toi.",
    "Sécurité : ne jamais inclure d’objet dangereux ou non approuvé par l’enseignant dans la liste.",
    "Critère de réussite : proposer une liste simple et réaliste, adaptée à ta situation.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Organisons notre pause",
  [
    "Objectif : réfléchir à l’organisation d’une pause pendant une activité physique.",
    "Organisation : discussion en petit groupe, à partir d’une situation proposée par l’enseignant (par exemple une journée chaude).",
    "Matériel : aucun matériel indispensable.",
    "Consignes : discuter de l’endroit où faire la pause (ombre disponible), de l’hydratation, du temps de récupération nécessaire, et des consignes à respecter avant de reprendre l’activité.",
    "Sécurité : toujours attendre l’autorisation de l’enseignant avant de reprendre une activité après une pause.",
    "Critère de réussite : proposer une organisation de pause cohérente incluant ombre, eau et récupération.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Prenons soin de notre matériel",
  [
    "Objectif : participer à l’inventaire, à l’utilisation correcte et au rangement collectif du matériel d’EPS.",
    "Organisation : petit groupe, en fin de séance, sous la supervision de l’enseignant.",
    "Matériel : le matériel utilisé pendant la séance (ballons, cônes, cordes, etc.).",
    "Consignes : compter le matériel utilisé, vérifier qu’aucune pièce n’est manquante ou abîmée, puis le ranger correctement à l’endroit prévu.",
    "Sécurité : ranger le matériel calmement, sans le lancer ni bousculer les autres élèves.",
    "Critère de réussite : participer activement au rangement complet et ordonné du matériel.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Mon projet pour rester actif",
  [
    "Objectif : construire un petit plan personnel raisonnable pour rester physiquement actif.",
    "Organisation : activité individuelle, avec l’aide de l’enseignant pour cadrer le projet.",
    "Matériel : une feuille pour noter le projet, ou un support proposé par l’enseignant.",
    "Consignes : choisir deux ou trois activités physiques que tu apprécies, réfléchir à quand et comment les pratiquer régulièrement, en tenant compte de la sécurité et de tes ressources réelles.",
    "Sécurité : le projet doit rester raisonnable et adapté à ton âge ; aucune activité dangereuse ou non supervisée ne doit y figurer.",
    "Critère de réussite : présenter un petit projet réaliste, centré sur le plaisir, la régularité et la sécurité, jamais sur l’apparence physique.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité de synthèse ----
children.push(sectionHeading("Activité de synthèse", ""));
children.push(bodyPar(
  "Pour clore cette année d’EPS, complète le tableau suivant en réfléchissant à ce que tu as appris dans chaque domaine. Ce bilan ne sert jamais à comparer les élèves entre eux selon leurs performances physiques : il t’aide simplement à prendre conscience de ton propre parcours."
));
children.push(threeColTable(
  ["Domaine de compétence", "Ce que j’ai appris", "Ce que je veux continuer à améliorer"],
  [
    ["Sécurité et échauffement", "", ""],
    ["Coopération et fair-play", "", ""],
    ["Sports collectifs (basket-ball, football, volley-ball)", "", ""],
    ["Athlétisme (courir, sauter, lancer)", "", ""],
    ["Gymnastique (équilibre, coordination)", "", ""],
    ["Récupération et responsabilité", "", ""],
  ],
  [3400, 3000, 2800],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "Une activité physique régulière contribue au bien-être, sans promesse médicale absolue ni recherche d’un idéal corporel.",
  "De bonnes habitudes d’hygiène avant et après l’EPS profitent à l’élève et au groupe.",
  "L’hydratation régulière, surtout par temps chaud, est essentielle ; l’eau reste la boisson de référence.",
  "Une alimentation variée soutient l’activité physique, sans régime ni restriction imposée.",
  "Le sommeil et la récupération sont des parties normales et nécessaires de la pratique physique.",
  "Certains signaux du corps (douleur inhabituelle, malaise, vertiges) exigent d’arrêter l’activité et de prévenir un adulte responsable.",
  "Bien préparer sa séance (tenue, eau, matériel, consignes) facilite l’organisation de toute la classe.",
  "Prendre soin du matériel et de l’environnement scolaire est un geste de responsabilité et de citoyenneté.",
  "L’activité physique quotidienne dépasse les sports organisés : marche, jeux actifs et déplacements y contribuent aussi.",
  "Un projet personnel d’activité physique doit rester raisonnable, sécuritaire et centré sur le plaisir et la régularité.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(10));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(hydratation - récupération - hygiène - sommeil - sécurité - matériel - activité - responsabilité)", italics: true, color: "555555" },
]));
[
  "1. Boire de l’eau régulièrement, surtout par temps chaud, est une question d’____________________.",
  "2. Porter une tenue propre et adaptée avant une séance d’EPS est une règle d’____________________.",
  "3. Le repos et le ____________________ participent à la récupération du corps et de l’esprit.",
  "4. Après l’effort, un retour au calme progressif favorise une bonne ____________________.",
  "5. Une douleur inhabituelle ou un malaise doivent toujours être signalés, pour une raison de ____________________.",
  "6. Compter, utiliser correctement et ranger le ____________________ après la séance est essentiel.",
  "7. Marcher, jouer activement et se déplacer à pied font partie de l’____________________ physique quotidienne.",
  "8. Ranger le matériel et respecter les espaces communs sont des gestes de ____________________ envers l’école.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Que recommande ce chapitre au sujet de l’alimentation ?", opts: ["a) suivre un régime pour perdre du poids", "b) une alimentation variée, sans régime ni restriction", "c) éviter certains aliments considérés comme « mauvais »", "d) manger le moins possible avant l’effort"] },
  { q: "2. Que doit faire un élève qui ressent un malaise inhabituel pendant l’activité ?", opts: ["a) continuer sans en parler à personne", "b) arrêter l’activité et prévenir immédiatement l’enseignant", "c) essayer de poser lui-même un diagnostic", "d) attendre la fin de la séance pour en parler"] },
  { q: "3. Pourquoi faut-il boire de l’eau régulièrement pendant l’effort, surtout en Haïti ?", opts: ["a) parce que l’eau remplace les repas", "b) à cause de la perte d’eau par la transpiration, surtout par climat chaud", "c) parce que c’est une boisson énergisante", "d) il n’y a aucune raison particulière"] },
  { q: "4. Que signifie prendre soin du matériel et de l’environnement scolaire ?", opts: ["a) une contrainte inutile imposée par l’enseignant", "b) un geste de responsabilité et de citoyenneté", "c) une activité réservée à certains élèves seulement", "d) une activité sans lien avec l’EPS"] },
  { q: "5. Sur quoi doit porter un projet personnel d’activité physique, selon ce chapitre ?", opts: ["a) la perte de poids", "b) la transformation de l’apparence physique", "c) le plaisir, la régularité et la sécurité", "d) la comparaison avec les performances des autres élèves"] },
]));

// C - Relier
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Hydratation", "a) Moment de repos qui participe à la récupération du corps et de l’esprit"],
  ["2. Récupération", "b) Ensemble des règles et comportements qui protègent les élèves"],
  ["3. Hygiène", "c) Ensemble des objets utilisés pendant une séance, à utiliser et ranger correctement"],
  ["4. Sommeil", "d) Tout mouvement du corps, pratiqué régulièrement à l’école ou au quotidien"],
  ["5. Sécurité", "e) Fait de boire régulièrement pour compenser la perte d’eau"],
  ["6. Matériel", "f) Retour progressif du corps au calme après un effort"],
  ["7. Activité physique", "g) Ensemble des gestes qui permettent de garder son corps propre"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. C’est une journée particulièrement chaude et tu n’as pas assez bu d’eau avant la séance d’EPS. Explique ce que tu devrais faire, et pourquoi.",
  "2. Tu as oublié une partie de ton matériel pour la séance d’EPS. Que devrais-tu faire, et comment éviter que cela se reproduise ?",
  "3. Un camarade continue une activité malgré une fatigue inhabituelle et te dit que « ce n’est rien ». Explique pourquoi son attitude n’est pas responsable, et ce que tu pourrais faire.",
  "4. En pensant à toute ton année d’EPS, choisis une habitude apprise dans ce manuel que tu comptes garder même en dehors de l’école, et explique pourquoi.",
].forEach(t => children.push(numberedPar(t)));

await buildAndSave(children, 98, "Manuel_EPS_7AF_Chapitre10.docx");
