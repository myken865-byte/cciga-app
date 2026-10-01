import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, bulletMixed, numberedPar,
  calloutBox, spacer, illustrationBox, twoColTable, threeColTable, chapterTitleBlock, exercicesHeading,
  pageBreak, qcmBlock, buildAndSave, AlignmentType,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BOX_SAVAIS_FILL, BOX_SAVAIS_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_OBSERVE_FILL, BOX_OBSERVE_LINE,
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
  BOX_CREATIVITE_FILL, BOX_CREATIVITE_LINE, BOX_CREATIVITE_TITLE,
  BOX_CITOYEN_FILL, BOX_CITOYEN_LINE, BOX_CITOYEN_TITLE, NAVY,
} from "./common.mjs";

const children = [];

children.push(...chapterTitleBlock(10, "Gymnastique et expression corporelle : équilibre, coordination et construction d’enchaînements"));

// ---- Introduction courte ----
children.push(bodyPar(
  "Après les sports collectifs des chapitres 7 à 9, ce chapitre change à nouveau de registre : il ne s’agit plus de jouer avec un ballon face à des adversaires, mais de mieux maîtriser ton propre corps, seul, à deux ou en petit groupe. Tu vas apprendre à construire un enchaînement simple, contrôlé et cohérent, et à l’exprimer avec du rythme et de l’intention, toujours en sécurité."
));
children.push(spacer(160));

// ---- Objectif général ----
children.push(subHeading("Objectif général"));
children.push(bodyPar(
  "Mieux maîtriser ton corps dans des situations gymniques scolaires simples et dans des activités d’expression corporelle, puis construire et présenter un enchaînement court, cohérent, contrôlé et sûr. Ce chapitre développe l’équilibre, la coordination, l’orientation spatiale, le rythme, la mémorisation motrice, la créativité, l’observation et la coopération."
));
children.push(spacer(160));

// ---- Objectifs d'apprentissage ----
children.push(subHeading("Objectifs d’apprentissage"));
children.push(bodyPar("À la fin de ce chapitre, tu seras capable de :"));
[
  "maintenir ou retrouver un équilibre dans des positions et déplacements adaptés ;",
  "coordonner plusieurs actions simples dans un ordre déterminé ;",
  "comprendre les notions d’appui, posture, orientation, niveau, direction et transition ;",
  "passer d’une position ou d’un mouvement à un autre de façon contrôlée ;",
  "construire un enchaînement simple comprenant un début, plusieurs actions reliées et une fin maîtrisée ;",
  "utiliser le rythme, l’espace et l’expression corporelle dans une courte composition ;",
  "observer une séquence à partir de critères simples et formuler un retour respectueux ;",
  "adapter une proposition à tes capacités et aux conditions matérielles ;",
  "respecter strictement les zones, distances, consignes et interdictions de sécurité.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(subHeading("Vocabulaire essentiel"));
children.push(mixedPar([
  { text: "Équilibre, coordination, transition, rythme, orientation, enchaînement, sécurité, expression.", italics: true, color: "333333" },
]));
children.push(spacer(160));

// ---- Activation des acquis ----
children.push(subHeading("Activation des acquis"));
children.push(bodyPar(
  "Ce chapitre réutilise la coordination, la souplesse adaptée, la force contrôlée, l’échauffement, la sécurité, l’observation et l’autoévaluation déjà étudiés. Réponds à cette question avant de commencer :"
));
children.push(bodyPar(
  "Qu’est-ce qui transforme plusieurs mouvements séparés en un enchaînement cohérent ?"
));
children.push(bodyPar(
  "Cette question t’invite à réfléchir à ce que tu as peut-être déjà remarqué : l’ordre des actions, les transitions entre elles, le contrôle du geste, le rythme, l’orientation dans l’espace, et une fin clairement maîtrisée sont autant d’éléments qui distinguent un enchaînement organisé d’une simple suite de mouvements au hasard."
));
children.push(spacer(160));

// ================= 10.1 =================
children.push(sectionHeading("Gymnastique scolaire et expression corporelle", "10.1"));
children.push(bodyPar(
  "La gymnastique scolaire et l’expression corporelle sont deux domaines liés : tous deux demandent une maîtrise du corps, une utilisation de l’espace et du rythme, et parfois une forme de communication non verbale à travers les gestes et les postures."
));
children.push(bodyPar(
  "Ce chapitre reste toujours au niveau d’un apprentissage scolaire, progressif et sécurisé, et ne propose jamais de démonstration acrobatique spécialisée réservée à un encadrement professionnel."
));
children.push(spacer(160));

// ================= 10.2 =================
children.push(sectionHeading("Les appuis et l’équilibre", "10.2"));
children.push(bodyPar(
  "Un appui est un point de contact entre ton corps et le sol : les pieds, mais aussi parfois les mains dans des tâches au sol adaptées, selon la consigne de l’enseignant. Ce chapitre explore l’équilibre statique (une position tenue) et l’équilibre dynamique (maintenu pendant un déplacement), toujours dans des situations à faible risque."
));
children.push(bodyPar(
  "Pour observer et améliorer ton équilibre, tu peux porter attention à la stabilité de ta position, à la direction de ton regard, au contrôle général de ton corps, et à l’espace dont tu disposes autour de toi."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-01",
  "Appuis et équilibres simples",
  "Dessiner 3 vignettes montrant des élèves haïtiens de 8e AF dans des positions d’équilibre simples et sûres : vignette 1, équilibre statique sur deux appuis (pieds) ; vignette 2, équilibre sur un pied, bras écartés pour s’aider ; vignette 3, un appui simple au sol avec les mains, dans une tâche adaptée validée par l’enseignant.",
  "Des appuis et des équilibres simples, sûrs et adaptés au niveau 8e AF.",
  "Montrer différents types d’appuis et d’équilibres accessibles, du plus simple au plus avancé, toujours à faible risque.",
  "Paysage, format horizontal, bande de 3 vignettes.",
));
children.push(spacer(200));

// ================= 10.3 =================
children.push(sectionHeading("Posture et contrôle corporel", "10.3"));
children.push(bodyPar(
  "La posture correspond à l’alignement général de ton corps, et la tonicité à l’état de tension de tes muscles, adapté à l’action réalisée. Ce chapitre ne recherche jamais une posture corporelle esthétique idéale : ce qui compte est la maîtrise fonctionnelle du geste, la sécurité, et ta propre progression."
));
children.push(spacer(160));

// ================= 10.4 =================
children.push(sectionHeading("Orientation, directions et niveaux", "10.4"));
children.push(bodyPar(
  "Se déplacer ou se positionner dans l’espace peut se décrire avec quelques repères simples : avant/arrière, sur le côté, en diagonale, et des niveaux (haut, moyen, bas). Utiliser ces repères, avec des changements de direction contrôlés, développe ta conscience de l’espace disponible et le respect des distances avec tes camarades."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-02",
  "Orientation dans l’espace",
  "Dessiner un élève haïtien de 8e AF au centre d’un schéma avec des flèches pédagogiques indiquant les directions possibles (avant, arrière, côté, diagonale) et trois niveaux représentés verticalement (haut, moyen, bas), avec de petites icônes pour chaque niveau.",
  "Les directions et les niveaux utilisables dans l’espace pendant une composition gymnique.",
  "Aider l’élève à mémoriser le vocabulaire spatial utile pour construire un enchaînement, en lien avec la section 10.4.",
  "Paysage, format horizontal, schéma avec flèches.",
));
children.push(spacer(200));

// ================= 10.5 =================
children.push(sectionHeading("Coordination et transitions", "10.5"));
children.push(bodyPar(
  "Relier deux, puis plusieurs actions simples, sans précipitation, développe ta coordination. Une transition est le passage organisé entre deux éléments d’un enchaînement : elle permet de passer d’une action à l’autre de façon fluide, plutôt que par un arrêt brutal ou désordonné."
));
children.push(bodyPar(
  "Ce chapitre recherche la continuité, le contrôle et la mémorisation de l’ordre des actions, jamais la difficulté technique pour elle-même."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-03",
  "Trois mouvements reliés par des transitions",
  "Dessiner une séquence de 3 vignettes numérotées montrant un même élève haïtien réalisant trois actions simples reliées (par exemple une position d’équilibre, un déplacement latéral, puis une flexion contrôlée), avec de petites flèches entre chaque vignette représentant les transitions.",
  "Trois mouvements simples reliés par des transitions contrôlées, sans précipitation.",
  "Illustrer concrètement la notion de transition entre plusieurs actions, en lien avec l’Activité 2.",
  "Paysage, format horizontal, bande de 3 vignettes avec flèches.",
));
children.push(spacer(200));

// ================= 10.6 =================
children.push(sectionHeading("Construire un enchaînement", "10.6"));
children.push(bodyPar(
  "Un enchaînement gymnique scolaire suit une structure simple : une position de départ, 3 à 5 actions simples, des transitions entre elles, puis une position finale contrôlée."
));
children.push(bodyPar("Quelques exemples d’éléments possibles, toujours validés par l’enseignant avant réalisation :"));
[
  "une marche rythmée ;",
  "un changement de direction ;",
  "un équilibre simple ;",
  "une flexion contrôlée ;",
  "un déplacement latéral ;",
  "une rotation debout simple ;",
  "un geste expressif ;",
  "une pose finale.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "Aucune acrobatie avancée n’est jamais proposée dans ce chapitre : l’enseignant valide toujours les éléments choisis avant leur réalisation."
));
children.push(spacer(160));

children.push(calloutBox(
  "À retenir",
  ["Un bon enchaînement est contrôlé, cohérent, mémorisé et adapté aux capacités de l’élève."],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, NAVY,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-04",
  "Structure d’un enchaînement",
  "Réaliser un schéma en quatre étapes reliées par des flèches : 1) position de départ (un élève haïtien immobile, posture stable) ; 2) une série de 3 à 5 actions simples représentées par de petites icônes ; 3) des transitions entre elles (flèches courbes) ; 4) une position finale contrôlée (élève immobile, posture stable).",
  "La structure d’un enchaînement : départ, actions, transitions, fin maîtrisée.",
  "Donner à l’élève un schéma de référence pour construire son propre enchaînement, en lien avec l’Activité 4.",
  "Paysage, format horizontal, schéma en 4 étapes.",
));
children.push(spacer(200));

// ================= 10.7 =================
children.push(sectionHeading("Rythme et expression corporelle", "10.7"));
children.push(bodyPar(
  "Le rythme d’un enchaînement peut varier : la vitesse d’exécution, des pauses volontaires, des accents (un mouvement plus marqué) et des changements de direction, sans qu’il soit nécessaire d’utiliser de la musique."
));
children.push(bodyPar(
  "Les gestes, la posture, le regard et les déplacements peuvent exprimer une intention ou une idée, de manière appropriée au contexte scolaire. Ce chapitre n’impose jamais de normes d’apparence ou de performance corporelle : chaque élève exprime à sa manière, selon ses propres capacités."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-06",
  "Expression corporelle : variations de rythme, direction et niveau",
  "Dessiner 3 vignettes montrant un même élève haïtien réalisant un même geste simple de façons différentes : vignette 1, geste rapide et direct ; vignette 2, geste lent avec une pause marquée ; vignette 3, le même geste réalisé à un niveau bas (accroupi). Étiqueter chaque vignette.",
  "Un même geste peut varier en rythme, en direction et en niveau pour exprimer des intentions différentes.",
  "Illustrer concrètement comment le rythme et le niveau modifient l’expression d’un même mouvement.",
  "Paysage, format horizontal, bande de 3 vignettes.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Créativité",
  ["Il existe toujours plusieurs façons sûres de relier des mouvements : varier l'ordre, le rythme, la direction ou le niveau permet de créer sans jamais rechercher une figure dangereuse."],
  BOX_CREATIVITE_FILL, BOX_CREATIVITE_LINE, BOX_CREATIVITE_TITLE,
));
children.push(spacer(200));

// ================= 10.8 =================
children.push(sectionHeading("Créer seul, à deux ou en petit groupe", "10.8"));
children.push(bodyPar(
  "Le travail commence toujours individuellement, avant de proposer, si l’espace le permet, des compositions simples en duo ou en petit groupe. Quelques procédés simples de composition peuvent être introduits : la simultanéité (agir en même temps), la succession (agir l’un après l’autre), le miroir (reproduire le geste d’un partenaire comme dans un miroir), ou l’alternance."
));
children.push(bodyPar(
  "Ce chapitre veille toujours à préserver la participation de tous les élèves, et exclut totalement les portés ou manipulations risquées entre élèves."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-07",
  "Petit groupe construisant une composition",
  "Dessiner un petit groupe de 3 élèves haïtiens de 8e AF en train de construire ensemble une courte composition gymnique, discutant de l’ordre des actions, sous la supervision visible de l’enseignant. Aucun porté ni manipulation physique entre élèves.",
  "Un petit groupe construisant une composition ensemble, sous supervision.",
  "Illustrer la construction collaborative d’une composition en petit groupe, en lien avec l’Activité créative.",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ================= 10.9 =================
children.push(sectionHeading("Observer et donner un retour", "10.9"));
children.push(bodyPar(
  "Observer une séquence gymnique peut se faire à partir de critères simples : un début identifiable, un ordre mémorisé, des équilibres tenus, des transitions fluides, une bonne utilisation de l’espace, un rythme perceptible, du contrôle, et une fin maîtrisée."
));
children.push(bodyPar(
  "Le retour donné à un camarade doit toujours décrire ce qui a été observé et proposer un seul ajustement utile, jamais une critique du corps ou de l’apparence de l’élève."
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-08",
  "Élèves observateurs avec grille",
  "Dessiner deux élèves haïtiens de 8e AF debout à distance raisonnable, tenant une petite grille d’observation, observant attentivement un camarade en train de réaliser un enchaînement, dans une attitude respectueuse et attentive.",
  "Des élèves observateurs utilisant une grille simple et respectueuse.",
  "Servir de support visuel à l’Activité 5 « Observer, conseiller, ajuster ».",
  "Paysage, format horizontal, plan moyen.",
));
children.push(spacer(200));

// ================= 10.10 =================
children.push(sectionHeading("Présenter une composition", "10.10"));
children.push(bodyPar(
  "Préparer une courte présentation devant un groupe demande un climat respectueux, où chaque élève peut se sentir en confiance. Ce chapitre valorise la maîtrise, la cohérence, l’engagement, la créativité et le respect des consignes, plutôt que la difficulté spectaculaire."
));
children.push(spacer(120));

children.push(calloutBox(
  "Citoyen responsable",
  ["Respecter les présentations de tes camarades et les encourager, sans jamais se moquer, fait partie des attitudes attendues de chaque élève."],
  BOX_CITOYEN_FILL, BOX_CITOYEN_LINE, BOX_CITOYEN_TITLE,
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-8AF-C10-10",
  "Présentation finale d’un enchaînement",
  "Dessiner un élève haïtien de 8e AF présentant un enchaînement simple et non acrobatique (position d’équilibre ou geste expressif) devant un petit groupe de camarades assis et attentifs, sous la supervision de l’enseignant, dans une ambiance respectueuse.",
  "Une présentation d’enchaînement simple, dans un climat respectueux et encourageant.",
  "Illustrer le moment de présentation finale d’une composition, en lien avec la section 10.10.",
  "Paysage, format horizontal, plan large.",
));
children.push(spacer(200));

// ================= 10.11 =================
children.push(sectionHeading("Sécurité spécifique", "10.11"));
children.push(bodyPar(
  "Avant toute pratique gymnique, il faut vérifier le sol, l’espace, les obstacles, les distances entre élèves et le matériel éventuellement utilisé."
));
[
  "les saltos, flips, plongeons, équilibres renversés complexes, portés risqués et toute acrobatie non adaptée ou non encadrée sont strictement interdits ;",
  "il ne faut jamais improviser un tapis avec une surface instable ou dangereuse ;",
  "un élève ne doit jamais être poussé, tiré ou forcé dans une position ;",
  "en cas de douleur, de malaise ou de tout autre problème inhabituel, il faut arrêter l’activité et prévenir immédiatement l’enseignant.",
].forEach(t => children.push(bulletPar(t)));
children.push(spacer(120));

children.push(calloutBox(
  "Sécurité",
  ["Aucune figure dangereuse ou non validée par l'enseignant ne doit jamais être tentée, même à la demande d'un camarade."],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A2E22",
));
children.push(spacer(160));

children.push(calloutBox(
  "Méthode",
  ["Choisir → Organiser → Répéter → Observer → Ajuster → Présenter : ce cycle t'aide à construire et améliorer ton enchaînement, étape par étape."],
  BOX_METHODE_FILL, BOX_METHODE_LINE, BOX_METHODE_TITLE,
));
children.push(spacer(160));

children.push(calloutBox(
  "Le savais-tu ?",
  ["Dans de nombreuses cultures, y compris en Haïti, l'expression corporelle à travers le rythme et le mouvement fait partie de traditions riches et variées. Tu approfondiras les liens entre culture haïtienne et activités physiques au chapitre 11."],
  BOX_SAVAIS_FILL, BOX_SAVAIS_LINE, "8A5A14",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-8AF-C10-09",
  "Organisation sécurisée d’un espace gymnique scolaire haïtien",
  "Dessiner une vue d’ensemble d’un espace scolaire haïtien organisé pour la gymnastique : une zone dégagée sans obstacle, des distances suffisantes entre plusieurs élèves qui pratiquent, et l’enseignant en position de supervision, observant l’ensemble.",
  "Un espace gymnique scolaire bien organisé : zones dégagées, distances respectées et supervision.",
  "Illustrer l’organisation sécurisée nécessaire à toute pratique gymnique, en lien avec la section 10.11.",
  "Paysage, format horizontal, vue d’ensemble large.",
));
children.push(spacer(200));

// ---- Activités pratiques ----
children.push(sectionHeading("Activités pratiques", ""));

children.push(calloutBox(
  "Activité 1 — Équilibre et contrôle",
  [
    "Objectif : réaliser un parcours très simple de positions et déplacements au sol, sans hauteur dangereuse.",
    "Organisation : individuellement, à tour de rôle, dans un espace dégagé.",
    "Matériel : repères au sol si nécessaire ; aucun matériel spécialisé indispensable.",
    "Consignes : enchaîner quelques positions d’équilibre simples et des déplacements contrôlés, en gardant le contrôle du corps à chaque étape.",
    "Sécurité : rester au sol, sans aucune hauteur ; attendre que l’espace soit libre avant de commencer.",
    "Critères de réussite : réaliser le parcours en gardant le contrôle et l’équilibre à chaque étape.",
    "Variantes et adaptations : réduire le nombre de positions ou la difficulté selon le niveau de l’élève.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 2 — Relier trois mouvements",
  [
    "Objectif : créer des transitions contrôlées entre trois actions validées par l’enseignant.",
    "Organisation : individuellement, avec un temps de préparation avant réalisation.",
    "Matériel : aucun matériel indispensable.",
    "Consignes : choisir trois actions simples (parmi celles validées par l’enseignant), puis les relier par des transitions fluides, sans précipitation.",
    "Sécurité : l’enseignant valide les trois actions choisies avant réalisation.",
    "Critères de réussite : enchaîner les trois actions avec des transitions fluides et sans interruption brutale.",
    "Variantes et adaptations : réduire à deux actions pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 3 — Jouer avec l’espace et le rythme",
  [
    "Objectif : répéter une courte phrase motrice en variant direction, niveau ou tempo.",
    "Organisation : individuellement, dans un espace délimité.",
    "Matériel : aucun matériel indispensable.",
    "Consignes : répéter un même court mouvement plusieurs fois, en changeant à chaque fois la direction, le niveau (haut/moyen/bas) ou la vitesse d’exécution.",
    "Sécurité : garder une distance suffisante avec les autres élèves qui pratiquent en même temps.",
    "Critères de réussite : réaliser le même mouvement de façon reconnaissable, avec au moins deux variations différentes.",
    "Variantes et adaptations : se concentrer sur une seule variation (par exemple uniquement le niveau) pour les élèves qui en ont besoin.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 4 — Construisons notre enchaînement",
  [
    "Objectif : créer une séquence de 3 à 5 actions avec un début et une fin clairement identifiables.",
    "Organisation : individuellement ou en petit groupe, avec l’aide de l’enseignant pour valider les éléments choisis.",
    "Matériel : aucun matériel indispensable ; des repères au sol peuvent aider à organiser l’espace.",
    "Consignes : choisir une position de départ, 3 à 5 actions simples validées, des transitions entre elles, et une position finale contrôlée ; répéter l’enchaînement pour le mémoriser.",
    "Sécurité : aucune action non validée par l’enseignant ne doit être incluse dans l’enchaînement.",
    "Critères de réussite : réaliser l’enchaînement complet, du début à la fin, de façon mémorisée et contrôlée.",
    "Variantes et adaptations : réduire à 3 actions pour les élèves qui ont besoin de plus de temps pour mémoriser.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(160));

children.push(calloutBox(
  "Activité 5 — Observer, conseiller, ajuster",
  [
    "Objectif : présenter son enchaînement par petits groupes et donner un retour respectueux à partir d’une grille simple.",
    "Organisation : petits groupes, chaque élève présentant son enchaînement à tour de rôle devant le reste du groupe.",
    "Matériel : une petite grille d’observation avec les critères de la section 10.9.",
    "Consignes : observer attentivement chaque présentation, puis donner un retour factuel décrivant ce qui a été observé et proposant un seul ajustement utile.",
    "Sécurité : rester assis ou à distance pendant les présentations, pour ne pas gêner l’élève qui présente.",
    "Critères de réussite : donner un retour respectueux, factuel, et centré sur un seul ajustement utile.",
    "Variantes et adaptations : réduire la taille du groupe d’observation pour les élèves qui sont impressionnés par un public nombreux.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité d'observation et de résolution de problème ----
children.push(sectionHeading("Activité d’observation et de résolution de problème", ""));
children.push(bodyPar(
  "Observe les deux séquences suivantes, identifie les différences, justifie tes observations, puis propose un ajustement sûr."
));

children.push(illustrationBox(
  "ILL-8AF-C10-05",
  "Comparaison pédagogique : enchaînement cohérent / séquence à améliorer",
  "Dessiner une image en deux parties, côte à côte. À gauche : un élève haïtien réalisant un enchaînement cohérent, avec une position de départ claire, des transitions fluides entre les actions, une bonne utilisation de l’espace (déplacements dans plusieurs directions) et une position finale maîtrisée. À droite, dans un espace similaire : un élève réalisant les mêmes actions mais avec des arrêts brusques entre chacune, toujours au même endroit, sans position finale claire.",
  "À gauche, un enchaînement cohérent ; à droite, une séquence à améliorer.",
  "Servir de support visuel à l’activité « Quel enchaînement est le plus cohérent ? », pour permettre à l’élève de comparer directement les deux séquences.",
  "Paysage, format horizontal, image divisée en deux parties.",
));
children.push(spacer(200));

children.push(calloutBox(
  "Quel enchaînement est le plus cohérent ?",
  [
    "Séquence 1 : un élève réalise un enchaînement avec une position de départ claire, des transitions fluides entre chaque action, une bonne utilisation de l’espace, et une position finale maîtrisée.",
    "Séquence 2 : un élève enchaîne les mêmes actions, mais sans transition claire entre elles (arrêts brusques), en restant toujours au même endroit de l’espace, et sans position finale identifiable.",
    "Pour ces deux séquences, réponds : quelles différences observes-tu ? Quelle séquence te semble la plus cohérente, et pourquoi ? Quel ajustement proposerais-tu à l’élève de la séquence 2 ?",
    "Situation supplémentaire : un élève propose d’inclure une acrobatie non autorisée (par exemple une roue ou un salto) dans son enchaînement. Explique pourquoi cette proposition doit être remplacée, et propose un élément scolaire sûr pour la remplacer.",
  ],
  BOX_OBSERVE_FILL, BOX_OBSERVE_LINE, "2E5A2E",
));
children.push(spacer(200));

// ---- Activité créative ----
children.push(sectionHeading("Activité créative", ""));
children.push(calloutBox(
  "Une idée en mouvement",
  [
    "Objectif : construire une courte séquence expressive à partir d’un thème neutre et scolaire.",
    "Organisation : en petit groupe, avec un temps de préparation avant présentation.",
    "Consignes : choisir un thème parmi énergie, coopération, nature, école ou sport (ou un thème équivalent proposé par l’enseignant), puis construire une courte séquence exprimant ce thème à travers l’ordre des actions, le rythme, les directions et les gestes.",
    "La créativité porte uniquement sur l’ordre, le rythme, les directions et les gestes choisis, jamais sur des figures dangereuses.",
    "Une version sans musique est toujours possible, afin que l’activité reste réalisable dans tous les établissements, quel que soit le matériel disponible.",
  ],
  BOX_CREATIVITE_FILL, BOX_CREATIVITE_LINE, BOX_CREATIVITE_TITLE,
));
children.push(spacer(200));

// ---- Autoévaluation ----
children.push(sectionHeading("Autoévaluation", ""));
children.push(bodyPar(
  "Complète ce tableau pour faire le point sur ta pratique de la gymnastique et de l’expression corporelle. Utilise « acquis », « en progrès » ou « à travailler avec aide » : ce tableau ne sert jamais à évaluer ton apparence physique."
));
children.push(threeColTable(
  ["Compétence", "Acquis / En progrès / À travailler avec aide", "Un exemple personnel"],
  [
    ["Je contrôle mes équilibres", "", ""],
    ["Je mémorise l’ordre", "", ""],
    ["Je relie les mouvements", "", ""],
    ["J’utilise l’espace", "", ""],
    ["Je respecte le rythme", "", ""],
    ["Je participe à la création", "", ""],
    ["Je respecte la sécurité", "", ""],
    ["Je peux proposer un ajustement", "", ""],
  ],
  [3400, 3400, 2600],
));
children.push(spacer(200));

// ---- Résumé ----
children.push(sectionHeading("Résumé du chapitre", ""));
[
  "La gymnastique scolaire et l’expression corporelle demandent la maîtrise du corps, de l’espace et du rythme.",
  "Un appui est un point de contact avec le sol ; l’équilibre peut être statique ou dynamique.",
  "La posture et le contrôle corporel privilégient la maîtrise fonctionnelle, jamais une apparence idéale.",
  "L’orientation utilise des directions et des niveaux (haut, moyen, bas) dans l’espace.",
  "La coordination relie plusieurs actions ; une transition est le passage organisé entre deux éléments.",
  "Un enchaînement suit une structure : position de départ, 3 à 5 actions, transitions, position finale.",
  "Le rythme et l’expression corporelle varient vitesse, pauses, accents et directions, sans musique obligatoire.",
  "Créer seul, à deux ou en petit groupe utilise des procédés simples comme la simultanéité ou le miroir.",
  "Observer une séquence se fait avec des critères simples, et le retour décrit sans jamais juger le corps.",
  "La sécurité interdit strictement toute acrobatie dangereuse, tout porté risqué et toute contrainte physique.",
].forEach(t => children.push(bulletPar(t)));
children.push(bodyPar(
  "L’élève de 8e AF doit désormais savoir créer, mémoriser, présenter, analyser et ajuster une courte composition sûre, et non simplement imiter un mouvement isolé."
));
children.push(spacer(200));

// ================= EXERCICES =================
children.push(pageBreak());
children.push(exercicesHeading(10));

// A - Compléter
children.push(sectionHeading("A. Compléter", ""));
children.push(mixedPar([
  { text: "(équilibre - coordination - transition - rythme - orientation - enchaînement - sécurité - expression)", italics: true, color: "555555" },
]));
[
  "1. Maintenir ou retrouver une position stable, c’est garder son ____________________.",
  "2. Organiser harmonieusement plusieurs mouvements du corps s’appelle la ____________________.",
  "3. Le passage organisé entre deux éléments d’un enchaînement s’appelle une ____________________.",
  "4. Varier la vitesse, les pauses et les accents d’un mouvement, c’est jouer avec le ____________________.",
  "5. Utiliser des directions et des niveaux dans l’espace relève de l’____________________.",
  "6. Une suite organisée d’actions avec un début, des transitions et une fin s’appelle un ____________________.",
  "7. Interdire les acrobaties dangereuses et non validées est une règle de ____________________.",
  "8. Communiquer une intention à travers les gestes et la posture s’appelle l’____________________ corporelle.",
].forEach(t => children.push(numberedPar(t)));
children.push(spacer(160));

// B - QCM
children.push(sectionHeading("B. Questions à choix multiples (QCM)", ""));
children.push(bodyPar("Pour chaque question, entoure la bonne réponse."));
children.push(...qcmBlock([
  { q: "1. Qu’est-ce qui transforme plusieurs mouvements séparés en un enchaînement cohérent ?", opts: ["a) uniquement leur difficulté technique", "b) l’ordre, les transitions, le contrôle et une fin maîtrisée", "c) le fait de les réaliser le plus vite possible", "d) rien, un enchaînement n’a pas besoin d’organisation"] },
  { q: "2. Que doit faire un élève qui propose une acrobatie dangereuse (salto, roue) pour son enchaînement ?", opts: ["a) la réaliser quand même s’il se sent capable", "b) remplacer cette proposition par un élément scolaire sûr, validé par l’enseignant", "c) demander à un camarade de la réaliser à sa place", "d) l’inclure uniquement pendant la présentation finale"] },
  { q: "3. Que recherche ce chapitre en priorité pour la posture et le contrôle corporel ?", opts: ["a) une apparence corporelle idéale", "b) la maîtrise fonctionnelle et la sécurité", "c) la comparaison entre les corps des élèves", "d) la performance spectaculaire"] },
  { q: "4. Comment doit être formulé un retour donné à un camarade après sa présentation ?", opts: ["a) une critique de son apparence physique", "b) une description factuelle avec un seul ajustement utile", "c) une comparaison avec les autres élèves du groupe", "d) aucun retour n’est nécessaire"] },
  { q: "5. Quelle est l’une des interdictions strictes de ce chapitre en matière de sécurité ?", opts: ["a) les marches rythmées", "b) les équilibres simples au sol", "c) les portés risqués et les acrobaties non encadrées", "d) les changements de direction contrôlés"] },
]));

// C - Correspondances
children.push(sectionHeading("C. Relier par des flèches", ""));
children.push(bodyPar("Associe chaque élément de la colonne A à sa définition correspondante dans la colonne B."));
children.push(twoColTable("Colonne A", "Colonne B", [
  ["1. Équilibre", "a) Passage organisé entre deux éléments d’un enchaînement"],
  ["2. Coordination", "b) Variation de vitesse, de pauses et d’accents dans un mouvement"],
  ["3. Transition", "c) Direction et niveau utilisés dans l’espace"],
  ["4. Rythme", "d) Suite organisée de plusieurs actions avec un début et une fin"],
  ["5. Orientation", "e) Capacité à maintenir ou retrouver une position stable"],
  ["6. Enchaînement", "f) Organisation harmonieuse de plusieurs mouvements"],
]));
children.push(spacer(160));

// D - Réflexion
children.push(sectionHeading("D. Questions de réflexion", ""));
[
  "1. Un élève enchaîne plusieurs actions sans aucune transition, avec des arrêts brusques entre chacune. Analyse cette situation et propose un ajustement précis.",
  "2. Un élève réalise tout son enchaînement au même endroit, sans jamais utiliser l’espace disponible autour de lui. Explique pourquoi cela limite sa composition et propose une amélioration.",
  "3. Un camarade te propose d’intégrer une figure acrobatique dangereuse (comme un salto) dans une composition de groupe. Explique pourquoi tu devrais refuser, et ce que tu pourrais proposer à la place.",
  "4. Dans une composition en petit groupe, les élèves ne sont jamais synchronisés : chacun agit à son propre rythme, sans lien avec les autres. Propose une solution pour améliorer la cohérence du groupe.",
  "5. Décris les caractéristiques d’une composition que tu juges bien organisée, en t’appuyant sur les critères étudiés dans ce chapitre (début, ordre, transitions, espace, rythme, fin).",
].forEach(t => children.push(numberedPar(t)));

const outPath = await buildAndSave(children, 122, "Manuel_EPS_8AF_Chapitre10.docx");
console.log("Chapitre 10 (8e AF) genere:", outPath);
