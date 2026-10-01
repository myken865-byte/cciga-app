// Registre maître des illustrations — Manuel d'EC 7e AF.
// Données source : relecture intégrale des 7 scripts
// scripts/ec-manuel-7af/build-chapitreN.mjs (illustrationBox(...) calls),
// des en-têtes de section (sectionHeading) qui les précèdent, et mesure
// directe des pages réelles (Word COM, Find + Information(3)) sur le
// document maître déjà validé :
//   LIVRES_EC/EC_7e_AF/09_ASSEMBLAGE/Manuel_EC_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx
// (89 pages : 3 romaines + 86 arabes ; version utilisée pour cet inventaire
// car c'est la seule version assemblée et validée du manuel EC 7e AF).
//
// Ce fichier ne modifie AUCUN contenu du manuel : il ne fait que
// recenser des données déjà présentes dans les scripts existants et les
// pages mesurées. Les 5 documents textuels DOC-EC-7AF-* (textes de
// référence à vérifier) sont HORS PÉRIMÈTRE de cet inventaire : ce sont des
// documents textuels à sourcer, pas des illustrations à générer par IA.

export const STYLE_CLAUSE =
  "Style : illustration pédagogique semi-réaliste, propre et moderne, niveau éditorial international, " +
  "cohérente avec la charte visuelle du manuel (tons bleu civique, rouge engagement, or citoyen, vert " +
  "communautaire, fond papier chaleureux). Personnages haïtiens crédibles, diversité naturelle, tenues " +
  "scolaires/civiques sobres, attitudes naturelles, aucune caricature ni stéréotype. Lumière naturelle douce, " +
  "de jour. Niveau de détail : suffisant pour être compris rapidement par un(e) élève de 7e AF (11-13 ans), " +
  "sans surcharge visuelle ni décoration inutile. Éviter : esthétique publicitaire, effets fantastiques, " +
  "éléments futuristes injustifiés, style cartoon enfantin, photoréalisme brut.";

export const FORBIDDEN_BASE =
  "logo officiel, sceau institutionnel, uniforme officiel précis non décrit ci-dessus, texte de loi, document " +
  "administratif réel, marque commerciale, violence, arme, scène effrayante ou dégradante, contenu partisan " +
  "ou électoral réel, élément fantastique ou futuriste, style cartoon enfantin.";

// chap: { num, title, pageStart, pageEnd }
export const CHAPTERS = [
  { num: 1, title: "Moi, Haïtien : nation et identité", pageStart: 1, pageEnd: 11 },
  { num: 2, title: "Citoyenne, citoyen : mes droits, mes devoirs", pageStart: 12, pageEnd: 21 },
  { num: 3, title: "Vivre dans un État démocratique", pageStart: 22, pageEnd: 30 },
  { num: 4, title: "Toi comme moi : le principe d'égalité", pageStart: 31, pageEnd: 39 },
  { num: 5, title: "Résoudre les conflits, vivre ensemble", pageStart: 40, pageEnd: 48 },
  { num: 6, title: "Paix, protection et sécurité au quotidien", pageStart: 49, pageEnd: 57 },
  { num: 7, title: "Protéger notre environnement", pageStart: 58, pageEnd: 66 },
];

// Each entry: ecId auto-numbered by array order (001..029).
export const ILLUSTRATIONS = [
  // ===================== CHAPITRE 1 =====================
  {
    illId: "ILL-EC-7AF-C01-01", chap: 1, section: "1.1 — Qu'est-ce qu'une nation ?", type: "Ouverture",
    page: 2,
    objectif: "Ancrer l'ouverture du chapitre dans une scène concrète et reconnaissable.",
    notion: "Un lieu du quotidien (place, monument local) comme point de départ pour comprendre l'identité nationale.",
    personnages: "4 à 5 élèves de 7e AF (11-13 ans), filles et garçons, tenue scolaire haïtienne sobre (chemise/blouse simple, pas de logo d'établissement).",
    lieu: "Place publique ou devant un monument/fort générique d'une commune haïtienne (non identifiable précisément).",
    action: "Le groupe d'élèves regarde et discute en pointant vers le monument, expression de curiosité.",
    objets: "Monument générique (silhouette de fort ancien, statue ou obélisque simple), végétation tropicale, bâtiments haïtiens colorés en arrière-plan.",
    interdits: "Monument réel identifiable avec précision architecturale exacte, drapeau détaillé, inscription lisible, adulte en uniforme.",
    texte: "Aucun texte visible.",
    format: "Paysage, pleine largeur",
    realisme: "Semi-réaliste éditorial",
    statut: "PROMPT PRÊT",
    prompt:
      "Illustration pédagogique semi-réaliste montrant un groupe de 5 élèves haïtiens de 7e année fondamentale " +
      "(environ 12 ans), filles et garçons, en tenue scolaire sobre sans logo d'établissement, réunis devant un " +
      "monument public générique d'une commune haïtienne (silhouette de fort ancien ou statue sur une place, " +
      "sans architecture identifiable précisément à un monument réel). Les élèves regardent et discutent en " +
      "pointant vers le monument, expression de curiosité et d'intérêt. Environnement : place publique " +
      "haïtienne typique, végétation tropicale, bâtiments colorés en arrière-plan, ciel clair de journée. " +
      "Cadrage : plan large, format paysage pleine largeur. Lumière naturelle chaude et douce. " + STYLE_CLAUSE +
      " Aucun texte visible dans l'image. Ne pas ajouter : " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C01-02", chap: 1, section: "1.3 — Les symboles de la nation et de l'État haïtiens", type: "Exemple analysé",
    page: 4,
    objectif: "Donner une référence visuelle claire des principaux symboles évoqués dans le cours.",
    notion: "Reconnaître et distinguer les symboles nationaux (drapeau, hymne, devise).",
    personnages: "Aucun personnage — planche pédagogique schématique.",
    lieu: "Fond neutre clair (planche/infographie), sans décor.",
    action: "Présentation côte à côte, sans scène narrative.",
    objets: "Drapeau haïtien simplifié (bandes bleue et rouge horizontales, SANS reproduction exacte et détaillée des armoiries centrales), une portée musicale stylisée symbolisant l'hymne, une banderole/étiquette portant la devise nationale.",
    interdits: "Reproduction exacte et détaillée des armoiries officielles (palmier, canons, drapeaux, bonnet, inscription héraldique) — à exclure par précaution tant que la source précise n'est pas vérifiée ; texte de l'hymne ; proportions de drapeau incorrectes.",
    texte: "Le mot « devise » et le texte de la devise nationale peuvent apparaître en petite étiquette, en créole ou français standard, sans autre inscription.",
    format: "Paysage, demi-page, planche schématique en 3 volets",
    realisme: "Infographie pédagogique semi-réaliste",
    statut: "PROMPT PRÊT (armoiries détaillées volontairement exclues, cf. section 6)",
    prompt:
      "Planche pédagogique infographique en 3 volets côte à côte sur fond clair neutre, présentant de façon " +
      "schématique les symboles de la nation haïtienne : (1) un drapeau simplifié à deux bandes horizontales " +
      "bleue (en haut) et rouge (en bas), SANS reproduction détaillée et exacte des armoiries centrales " +
      "(remplacer le centre par une forme simple et neutre, ou laisser la zone centrale discrète et non " +
      "détaillée) ; (2) une portée musicale stylisée avec quelques notes, symbolisant l'hymne national, sans " +
      "paroles ; (3) une petite bannière/étiquette portant le mot « Devise » (le texte exact de la devise peut " +
      "être ajouté en mise en page ultérieure, laisser un espace propre si incertain). Style d'infographie " +
      "scolaire propre, pictogrammes clairs, légendes courtes optionnelles sous chaque volet. Cadrage : plan " +
      "moyen, format paysage demi-page. " + STYLE_CLAUSE +
      " Ne pas ajouter : armoiries détaillées exactes (palmier, canons, bonnet phrygien, inscriptions " +
      "héraldiques précises), " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C01-03", chap: 1, section: "1.5 — Le patrimoine haïtien et la responsabilité citoyenne", type: "Étude de cas",
    page: 6,
    objectif: "Illustrer concrètement la situation de l'étude de cas pour faciliter la discussion.",
    notion: "Un même lieu patrimonial montré avant (dégradé) et après (entretenu grâce à un engagement citoyen).",
    personnages: "3 à 4 élèves ou membres de la communauté (âges mixtes, adultes et adolescents) dans la scène « après », participant à une journée de nettoyage.",
    lieu: "Lieu patrimonial haïtien générique (fort, place ancienne ou maison ancienne, non identifiable précisément).",
    action: "Composition avant/après : à gauche, le lieu en état de dégradation (herbes hautes, détritus légers, façade négligée) ; à droite, le même lieu après une action citoyenne de nettoyage/sensibilisation (personnes avec balais/sacs, panneau vide de sensibilisation).",
    objets: "Panneau ou banderole vide (sans texte imposé), outils de nettoyage simples (balai, sac, gants).",
    interdits: "Monument réel identifiable, détritus choquants, personnes en détresse, dégradation exagérée ou alarmante.",
    texte: "Aucun texte visible, ou un panneau vide laissé pour ajout ultérieur en mise en page.",
    format: "Paysage, demi-page, composition avant/après en deux volets",
    realisme: "Semi-réaliste éditorial",
    statut: "PROMPT PRÊT",
    prompt:
      "Illustration en composition « avant / après » divisée en deux volets côte à côte, montrant un même lieu " +
      "patrimonial haïtien générique (par exemple un ancien fort ou une place historique, sans architecture " +
      "identifiable précisément à un monument réel). Volet gauche « avant » : le lieu légèrement négligé, " +
      "herbes hautes, quelques détritus discrets, façade un peu défraîchie, sans exagération alarmante. Volet " +
      "droit « après » : le même lieu entretenu, avec 3 à 4 personnes (mélange d'adolescents et d'adultes " +
      "haïtiens) participant activement à une journée citoyenne de nettoyage — balayant, ramassant des déchets " +
      "dans des sacs, un panneau ou une banderole vide de sensibilisation en arrière-plan (sans texte imposé). " +
      "Ambiance positive et constructive dans le volet « après ». Cadrage : plan large, format paysage " +
      "demi-page, séparation visuelle nette entre les deux volets. " + STYLE_CLAUSE +
      " Aucun texte visible dans l'image (panneau laissé vide). Ne pas ajouter : " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C01-04", chap: 1, section: "Projet du cycle — Lancer le glossaire illustré collaboratif", type: "Espace de production",
    page: 7,
    objectif: "Offrir un espace direct de production pour lancer le glossaire illustré collaboratif dès le premier chapitre.",
    notion: "Glossaire illustré collaboratif (dispositif transversal du cycle) — espace vierge à compléter par l'élève.",
    personnages: "Aucun personnage — cadre de production vide.",
    lieu: "Sans objet (gabarit de page).",
    action: "Sans objet (gabarit vide à compléter par l'élève).",
    objets: "Un cadre avec 4 cases égales, chacune avec un petit espace dessin et une ligne pour une définition manuscrite.",
    interdits: "Tout contenu pré-rempli, texte de définition, dessin déjà présent — le cadre doit rester vide.",
    texte: "Uniquement des étiquettes de structure neutres si nécessaire (ex. « Mot », « Définition ») — aucun contenu pédagogique rempli.",
    format: "Portrait, demi-page, quatre cases",
    realisme: "Gabarit graphique simple (pas une scène illustrée)",
    statut: "PROMPT PRÊT",
    prompt:
      "Gabarit graphique vide de type page d'activité, format portrait, divisé en 4 cases égales de taille " +
      "identique disposées en grille 2×2. Chaque case contient une petite zone rectangulaire vide destinée à un " +
      "dessin ou une image collée par l'élève, et une ligne fine en dessous destinée à une courte définition " +
      "manuscrite. Bordures fines et propres couleur or/jaune doré autour du cadre général et de chaque case. " +
      "Fond blanc ou papier clair. Aucune illustration, aucun personnage, aucun contenu déjà rempli à " +
      "l'intérieur des cases — le gabarit doit rester entièrement vide et réutilisable. Style graphique sobre " +
      "de manuel scolaire, lignes nettes. Cadrage : vue de face à plat, format portrait demi-page. Aucun texte " +
      "autre que des étiquettes neutres optionnelles (« Mot », « Définition »). Ne pas ajouter : personnages, " +
      "scène illustrée, contenu déjà rempli, couleurs vives non conformes à une charte sobre bleu/or.",
  },
  {
    illId: "ILL-EC-7AF-C01-05", chap: 1, section: "Fin de chapitre (après les exercices)", type: "Synthèse",
    page: 11,
    objectif: "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
    notion: "Carte mentale de synthèse du Chapitre 1 : nation, symboles, organisation territoriale, patrimoine, responsabilité citoyenne.",
    personnages: "Aucun personnage — infographie de type carte mentale.",
    lieu: "Sans objet (infographie).",
    action: "Sans objet.",
    objets: "Bulle centrale « Nation haïtienne », 5 branches vers : fondements, symboles nationaux, organisation territoriale, patrimoine, responsabilité citoyenne, chacune avec une petite icône représentative simple.",
    interdits: "Texte long dans les bulles, symboles nationaux détaillés (armoiries), toute carte géographique précise avec frontières exactes.",
    texte: "Les 6 libellés courts (bulle centrale + 5 branches) sont autorisés, en français, mots courts uniquement.",
    format: "Paysage, pleine largeur",
    realisme: "Infographie type carte mentale colorée",
    statut: "PROMPT PRÊT",
    prompt:
      "Infographie de type carte mentale (mind map) colorée et pédagogique, format paysage pleine largeur. Une " +
      "bulle centrale ronde porte le texte court « Nation haïtienne ». Cinq branches courbes partent de cette " +
      "bulle centrale vers 5 bulles secondaires plus petites portant chacune un des libellés courts suivants : " +
      "« Fondements », « Symboles nationaux », « Organisation territoriale », « Patrimoine », « Responsabilité " +
      "citoyenne ». Chaque bulle secondaire est accompagnée d'une petite icône simple et générique illustrant " +
      "son thème (ex. une icône de carte simplifiée pour « organisation territoriale », une icône de monument " +
      "générique pour « patrimoine ») — sans reproduire de symbole national détaillé. Palette de couleurs " +
      "chaleureuse et variée (bleu, or, vert, terre), lignes de connexion nettes et arrondies. Fond clair. " +
      "Cadrage : vue de face à plat, format paysage pleine largeur. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 6 libellés courts listés ci-dessus, en français. Ne pas " +
      "ajouter : personnages, symboles nationaux détaillés, carte géographique précise, texte long, " + FORBIDDEN_BASE,
  },

  // ===================== CHAPITRE 2 =====================
  {
    illId: "ILL-EC-7AF-C02-01", chap: 2, section: "2.1 — Droit et devoir : deux notions liées", type: "Ouverture",
    page: 13,
    objectif: "Ancrer l'ouverture du chapitre dans une scène scolaire concrète et reconnaissable.",
    notion: "Un règlement de classe affiché comme illustration concrète de droits et devoirs.",
    personnages: "5 à 6 élèves de 7e AF assis à leurs pupitres, un(e) enseignant(e) haïtien(ne) debout près du mur.",
    lieu: "Salle de classe haïtienne typique (murs simples, fenêtres ouvertes, pupitres en bois).",
    action: "Les élèves regardent une affiche murale intitulée « Règlement de classe » listant de façon schématique droits et devoirs ; l'enseignant(e) désigne l'affiche.",
    objets: "Affiche murale avec deux colonnes visuelles (icônes, pas de texte long), pupitres, tableau noir en arrière-plan.",
    interdits: "Texte de règlement détaillé et lisible, contenu disciplinaire négatif, sanctions représentées.",
    texte: "Sur l'affiche, seuls deux titres courts sont autorisés : « Droits » et « Devoirs ».",
    format: "Paysage, pleine largeur",
    realisme: "Semi-réaliste éditorial",
    statut: "PROMPT PRÊT",
    prompt:
      "Illustration pédagogique semi-réaliste d'une salle de classe haïtienne typique (murs simples, fenêtres " +
      "ouvertes laissant entrer la lumière, pupitres en bois, tableau noir en arrière-plan). Un(e) enseignant(e) " +
      "haïtien(ne) adulte se tient debout près du mur et désigne une affiche murale intitulée en deux colonnes " +
      "« Droits » et « Devoirs », chaque colonne illustrée par 2-3 petites icônes simples (pas de texte long, " +
      "pas de phrases). 5 à 6 élèves de 7e année fondamentale (environ 12 ans), filles et garçons, assis à " +
      "leurs pupitres, regardent l'affiche avec attention. Ambiance studieuse et positive. Cadrage : plan " +
      "d'ensemble de la salle, format paysage pleine largeur. Lumière naturelle de jour entrant par les " +
      "fenêtres. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les mots « Droits » et « Devoirs » sur l'affiche. Ne pas ajouter : " +
      "texte de règlement détaillé, contenu disciplinaire négatif, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C02-02", chap: 2, section: "2.4 — Les principaux droits : textes nationaux et internationaux", type: "Exemple analysé",
    page: 15,
    objectif: "Rendre visible la distinction entre principe du droit et exercice effectif.",
    notion: "Un droit reconnu par un texte n'est pas toujours pleinement exercé dans la vie réelle.",
    personnages: "Aucun personnage central — schéma avec petites silhouettes génériques optionnelles.",
    lieu: "Fond neutre (schéma/infographie).",
    action: "Sans scène narrative — schéma en deux colonnes reliées par une flèche interrogative.",
    objets: "Icône de document officiel stylisé (feuille avec lignes, sans texte lisible) à gauche ; icône de situation concrète (ex. petite scène simplifiée de vie quotidienne) à droite ; flèche avec point d'interrogation entre les deux.",
    interdits: "Texte de loi lisible, document administratif réel reproduit, symboles institutionnels précis.",
    texte: "Deux titres courts autorisés : « Ce que dit le texte » et « Ce qui se passe en réalité ».",
    format: "Paysage, demi-page, schéma en deux colonnes",
    realisme: "Infographie pédagogique",
    statut: "PROMPT PRÊT",
    prompt:
      "Schéma infographique pédagogique en deux colonnes sur fond clair neutre, format paysage demi-page. " +
      "Colonne de gauche titrée « Ce que dit le texte », illustrée par une icône stylisée de document officiel " +
      "(feuille avec lignes horizontales représentant du texte, sans mots lisibles) surmontée d'un petit sceau " +
      "générique non identifiable (forme ronde simple, sans emblème précis). Colonne de droite titrée « Ce qui " +
      "se passe en réalité », illustrée par une petite scène simplifiée de vie quotidienne (silhouettes " +
      "génériques simples représentant des personnes). Une flèche courbe avec un point d'interrogation relie " +
      "les deux colonnes au centre. Style d'infographie scolaire épurée, pictogrammes clairs, peu de couleurs. " +
      STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les deux titres de colonne indiqués. Ne pas ajouter : texte de loi " +
      "lisible, document administratif réel, sceau institutionnel précis, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C02-03", chap: 2, section: "Activité citoyenne — Répertoire de textes (après 2.5)", type: "Espace de production",
    page: 17,
    objectif: "Offrir un espace direct de production pour lancer le répertoire de textes sur les droits et devoirs.",
    notion: "Répertoire personnel de textes protégeant des droits — espace vierge à compléter.",
    personnages: "Aucun personnage — gabarit vide.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Tableau vide à trois colonnes.",
    interdits: "Tout contenu pré-rempli.",
    texte: "Trois en-têtes de colonne autorisés : « Nom du texte », « Ce qu'il protège », « Ma remarque ».",
    format: "Portrait, demi-page, tableau à trois colonnes",
    realisme: "Gabarit graphique simple",
    statut: "PROMPT PRÊT",
    prompt:
      "Gabarit graphique vide de type page d'activité, format portrait demi-page, présentant un tableau vide à " +
      "trois colonnes de largeur égale, avec 5-6 lignes vides. En-têtes de colonnes : « Nom du texte », « Ce " +
      "qu'il protège », « Ma remarque ». Bordures fines et propres couleur or/jaune doré. Fond blanc ou papier " +
      "clair. Aucun contenu rempli dans les cellules, aucune illustration, aucun personnage. Style graphique " +
      "sobre de manuel scolaire, lignes nettes. Cadrage : vue de face à plat. Texte visible autorisé : " +
      "uniquement les 3 en-têtes de colonne. Ne pas ajouter : personnages, scène illustrée, contenu déjà " +
      "rempli.",
  },
  {
    illId: "ILL-EC-7AF-C02-04", chap: 2, section: "Fin de chapitre (après les exercices)", type: "Synthèse",
    page: 21,
    objectif: "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
    notion: "Carte mentale de synthèse du Chapitre 2 : droit/devoir, citoyen/nationalité, vocabulaire politique, textes de référence, éthique citoyenne.",
    personnages: "Aucun personnage — infographie carte mentale.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Bulle centrale « Citoyen : droits et devoirs », 5 branches avec icônes simples.",
    interdits: "Texte long, symboles institutionnels détaillés.",
    texte: "6 libellés courts autorisés (bulle centrale + 5 branches).",
    format: "Paysage, pleine largeur",
    realisme: "Infographie type carte mentale colorée",
    statut: "PROMPT PRÊT",
    prompt:
      "Infographie de type carte mentale (mind map) colorée et pédagogique, format paysage pleine largeur. Une " +
      "bulle centrale ronde porte le texte court « Citoyen : droits et devoirs ». Cinq branches courbes partent " +
      "vers 5 bulles secondaires portant chacune un des libellés courts suivants : « Droit / Devoir », " +
      "« Citoyen / Nationalité », « Vocabulaire politique », « Textes de référence », « Éthique citoyenne ». " +
      "Chaque bulle secondaire est accompagnée d'une petite icône simple et générique (ex. une balance simple " +
      "pour « Droit / Devoir », un petit livre pour « Textes de référence »). Palette chaleureuse et variée, " +
      "lignes de connexion nettes et arrondies, fond clair. Cadrage : vue de face à plat, format paysage pleine " +
      "largeur. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 6 libellés courts. Ne pas ajouter : personnages, symboles " +
      "institutionnels détaillés, texte long, " + FORBIDDEN_BASE,
  },

  // ===================== CHAPITRE 3 =====================
  {
    illId: "ILL-EC-7AF-C03-01", chap: 3, section: "3.1 — Le fonctionnement d'un État démocratique", type: "Ouverture",
    page: 23,
    objectif: "Ancrer l'ouverture du chapitre dans une scène scolaire concrète et reconnaissable.",
    notion: "Une élection de classe illustre concrètement le principe démocratique du pouvoir confié pour un temps.",
    personnages: "6 à 8 élèves de 7e AF, un(e) élève debout devant la classe tenant un bulletin/urne simple.",
    lieu: "Salle de classe haïtienne typique.",
    action: "Des élèves votent à main levée ou déposent un bulletin simple dans une boîte/urne de classe improvisée.",
    objets: "Boîte/urne de classe simple (boîte en carton décorée sobrement), bulletins vierges, pupitres.",
    interdits: "Symboles de partis politiques réels, urne électorale officielle nationale, contenu électoral adulte réel.",
    texte: "Aucun texte visible.",
    format: "Paysage, pleine largeur",
    realisme: "Semi-réaliste éditorial",
    statut: "PROMPT PRÊT",
    prompt:
      "Illustration pédagogique semi-réaliste d'une salle de classe haïtienne typique où se déroule une élection " +
      "de délégué(e) de classe. Un groupe de 6 à 8 élèves de 7e année fondamentale (environ 12 ans), filles et " +
      "garçons, participe : certains lèvent la main pour voter, un(e) élève dépose un petit bulletin de papier " +
      "vierge dans une boîte simple décorée sobrement servant d'urne de classe (pas une urne électorale " +
      "officielle). Ambiance sérieuse mais positive, sourires discrets. Un tableau noir en arrière-plan, " +
      "pupitres en bois. Cadrage : plan d'ensemble, format paysage pleine largeur. Lumière naturelle de jour. " +
      STYLE_CLAUSE +
      " Aucun texte visible. Ne pas ajouter : symbole de parti politique réel, urne électorale officielle " +
      "nationale, affiche de campagne réelle, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C03-02", chap: 3, section: "3.3 — Le rôle du citoyen dans une élection démocratique", type: "Exemple analysé",
    page: 24,
    objectif: "Donner une référence visuelle claire et mémorisable des étapes d'une élection démocratique.",
    notion: "Les quatre étapes d'une élection démocratique : s'informer, réfléchir, voter, accepter le résultat.",
    personnages: "Petites silhouettes génériques simples dans chaque icône d'étape (optionnel).",
    lieu: "Fond neutre (frise infographique).",
    action: "Frise horizontale en 4 étapes.",
    objets: "4 icônes simples : une loupe ou un livre ouvert (s'informer), une ampoule ou une tête pensive (réfléchir), une main déposant un bulletin (voter), une poignée de main ou un pouce levé (accepter le résultat).",
    interdits: "Symboles électoraux officiels précis, contenu partisan.",
    texte: "4 libellés courts autorisés sous chaque icône : « S'informer », « Réfléchir », « Voter », « Accepter le résultat ».",
    format: "Paysage, demi-page, frise en quatre étapes",
    realisme: "Infographie pédagogique",
    statut: "PROMPT PRÊT",
    prompt:
      "Frise infographique horizontale en 4 étapes égales, format paysage demi-page, fond clair neutre. Chaque " +
      "étape est représentée par une icône simple et claire reliée à la suivante par une flèche fine : (1) une " +
      "loupe ou un livre ouvert pour « S'informer » ; (2) une ampoule ou une silhouette de tête avec un point " +
      "d'interrogation pour « Réfléchir » ; (3) une main déposant un petit bulletin dans une boîte simple pour " +
      "« Voter » ; (4) une poignée de main ou un pouce levé pour « Accepter le résultat ». Style d'infographie " +
      "scolaire épurée, pictogrammes ronds ou carrés uniformes, couleurs cohérentes. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 4 libellés courts sous chaque icône. Ne pas ajouter : symbole " +
      "électoral officiel précis, contenu partisan réel, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C03-03", chap: 3, section: "3.4 — Participer au renforcement de la démocratie dans sa communauté", type: "Espace de production",
    page: 26,
    objectif: "Offrir un espace direct de production pour ancrer la mise en place réelle de la coopérative de classe.",
    notion: "Règlement de la coopérative de classe — espace vierge à compléter.",
    personnages: "Aucun personnage — gabarit vide.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Liste vide à compléter (nom, rôles élus, règles principales).",
    interdits: "Tout contenu pré-rempli.",
    texte: "En-têtes courts autorisés : « Nom de la coopérative », « Rôles élus », « Règles principales ».",
    format: "Portrait, demi-page, liste à compléter",
    realisme: "Gabarit graphique simple",
    statut: "PROMPT PRÊT",
    prompt:
      "Gabarit graphique vide de type page d'activité, format portrait demi-page, structuré en trois blocs " +
      "verticaux vides avec lignes à compléter : un premier bloc titré « Nom de la coopérative » (une ligne " +
      "vide), un deuxième bloc titré « Rôles élus » (3-4 lignes vides avec petites puces), un troisième bloc " +
      "titré « Règles principales » (4-5 lignes vides numérotées). Bordures fines couleur or/jaune doré. Fond " +
      "blanc ou papier clair. Aucun contenu rempli, aucune illustration, aucun personnage. Style graphique " +
      "sobre de manuel scolaire. Cadrage : vue de face à plat. Texte visible autorisé : uniquement les 3 " +
      "titres de bloc. Ne pas ajouter : personnages, scène illustrée, contenu déjà rempli.",
  },
  {
    illId: "ILL-EC-7AF-C03-04", chap: 3, section: "Fin de chapitre (après les exercices)", type: "Synthèse",
    page: 30,
    objectif: "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
    notion: "Carte mentale de synthèse du Chapitre 3 : fonctionnement, conquête au quotidien, élection, coopérative de classe, participation communautaire.",
    personnages: "Aucun personnage — infographie carte mentale.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Bulle centrale « État démocratique », 5 branches avec icônes simples.",
    interdits: "Texte long, symboles électoraux précis.",
    texte: "6 libellés courts autorisés.",
    format: "Paysage, pleine largeur",
    realisme: "Infographie type carte mentale colorée",
    statut: "PROMPT PRÊT",
    prompt:
      "Infographie de type carte mentale (mind map) colorée et pédagogique, format paysage pleine largeur. Une " +
      "bulle centrale ronde porte le texte court « État démocratique ». Cinq branches courbes partent vers 5 " +
      "bulles secondaires portant chacune un des libellés courts suivants : « Fonctionnement », « Conquête au " +
      "quotidien », « Élection », « Coopérative de classe », « Participation communautaire ». Chaque bulle " +
      "secondaire accompagnée d'une petite icône simple et générique. Palette chaleureuse et variée, lignes de " +
      "connexion nettes, fond clair. Cadrage : vue de face à plat, format paysage pleine largeur. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 6 libellés courts. Ne pas ajouter : personnages, symboles " +
      "électoraux précis, texte long, " + FORBIDDEN_BASE,
  },

  // ===================== CHAPITRE 4 =====================
  {
    illId: "ILL-EC-7AF-C04-01", chap: 4, section: "4.1 — La dignité de toute personne", type: "Ouverture",
    page: 32,
    objectif: "Ancrer l'ouverture du chapitre dans une scène scolaire réaliste et respectueuse.",
    notion: "Une situation ordinaire de moquerie permet d'introduire concrètement le principe d'égalité et de dignité.",
    personnages: "1 élève légèrement en retrait, expression neutre à triste discrète (sans détresse exagérée) ; 3-4 camarades qui chuchotent/détournent le regard, sans geste agressif visible.",
    lieu: "Cour d'école ou salle de classe haïtienne.",
    action: "Scène subtile : un élève isolé/mal à l'aise pendant que d'autres élèves chuchotent entre eux en détournant le regard — AUCUN geste de moquerie explicite ou violent représenté, tout doit rester suggéré et pudique.",
    objets: "Aucun objet particulier requis.",
    interdits: "Toute forme de violence physique, geste explicite de moquerie (doigt pointé, grimace), pleurs visibles, expression de détresse forte, tout élément stigmatisant (poids, handicap visible, couleur de peau comme sujet de la moquerie).",
    texte: "Aucun texte visible.",
    format: "Paysage, pleine largeur",
    realisme: "Semi-réaliste éditorial, traitement pudique",
    statut: "PROMPT PRÊT — sujet sensible, traitement pudique obligatoire",
    prompt:
      "Illustration pédagogique semi-réaliste et pudique d'une cour d'école haïtienne. Un(e) élève de 7e année " +
      "fondamentale (environ 12 ans) se tient légèrement en retrait du groupe, expression neutre à légèrement " +
      "mal à l'aise (PAS de pleurs, PAS de détresse visible forte). À quelques pas, 3-4 autres élèves chuchotent " +
      "entre eux en détournant le regard vers cet(te) élève, SANS aucun geste explicite de moquerie (pas de " +
      "doigt pointé, pas de grimace, pas de rire moqueur visible) — la situation doit rester suggérée et " +
      "subtile, compréhensible mais jamais choquante ni humiliante à l'image. Aucune caractéristique physique " +
      "particulière (poids, handicap, couleur de peau) ne doit être mise en avant comme sujet de la scène — les " +
      "personnages doivent avoir une apparence ordinaire et diverse. Cadrage : plan moyen, format paysage " +
      "pleine largeur. Lumière naturelle neutre, ni trop sombre ni dramatique. " + STYLE_CLAUSE +
      " Aucun texte visible. Ne pas ajouter : violence, geste de moquerie explicite, pleurs, expression de " +
      "détresse forte, stigmatisation d'une caractéristique physique, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C04-02", chap: 4, section: "4.2 — Les libertés fondamentales de la personne", type: "Exemple analysé",
    page: 33,
    objectif: "Donner une référence visuelle claire et mémorisable des libertés fondamentales.",
    notion: "Les cinq libertés fondamentales : circulation, pensée, conscience, opinion, expression.",
    personnages: "Petites silhouettes génériques simples dans chaque pictogramme.",
    lieu: "Fond neutre (planche de pictogrammes).",
    action: "Sans scène narrative — 5 pictogrammes alignés.",
    objets: "5 pictogrammes simples : silhouette qui marche (circulation), tête avec ampoule (pensée), main sur le cœur (conscience), bulle de dialogue (opinion), bouche/mégaphone stylisé (expression).",
    interdits: "Symboles religieux précis, contenu politique réel, texte long.",
    texte: "5 libellés courts autorisés sous chaque pictogramme.",
    format: "Paysage, demi-page, planche de 5 pictogrammes",
    realisme: "Infographie pédagogique",
    statut: "PROMPT PRÊT",
    prompt:
      "Planche infographique alignant 5 pictogrammes simples de taille égale sur fond clair neutre, format " +
      "paysage demi-page : (1) une silhouette qui marche pour « Liberté de circulation » ; (2) une tête stylisée " +
      "avec une ampoule pour « Liberté de pensée » ; (3) une main posée sur le cœur pour « Liberté de " +
      "conscience » ; (4) une bulle de dialogue avec un point d'interrogation ou d'exclamation pour « Liberté " +
      "d'opinion » ; (5) une silhouette avec un petit mégaphone stylisé pour « Liberté d'expression ». " +
      "Pictogrammes simples, ronds ou carrés, style cohérent et coloré, sans symbole religieux ou politique " +
      "précis. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 5 libellés courts sous chaque pictogramme. Ne pas ajouter : " +
      "symbole religieux précis, contenu politique réel, personnage identifiable, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C04-03", chap: 4, section: "Activité — Portfolio sur un droit de l'enfant (après 4.5)", type: "Espace de production",
    page: 36,
    objectif: "Offrir un espace direct de production pour ancrer le portfolio sur le respect des droits de l'enfant.",
    notion: "Portfolio personnel sur un droit de l'enfant — espace vierge à compléter.",
    personnages: "Aucun personnage — gabarit vide.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Deux zones vides : une pour texte, une pour dessin/image collée.",
    interdits: "Tout contenu pré-rempli.",
    texte: "Aucun texte imposé, zones vides uniquement.",
    format: "Portrait, demi-page, deux zones",
    realisme: "Gabarit graphique simple",
    statut: "PROMPT PRÊT",
    prompt:
      "Gabarit graphique vide de type page de portfolio, format portrait demi-page, divisé en deux zones " +
      "égales : zone supérieure avec des lignes fines horizontales vides destinées à un court texte manuscrit, " +
      "zone inférieure avec un cadre rectangulaire vide destiné à un dessin ou une image collée par l'élève. " +
      "Bordures fines couleur or/jaune doré autour du cadre général. Fond blanc ou papier clair. Aucun contenu " +
      "rempli, aucune illustration, aucun personnage. Style graphique sobre de manuel scolaire. Cadrage : vue " +
      "de face à plat. Aucun texte visible dans le gabarit. Ne pas ajouter : personnages, scène illustrée, " +
      "contenu déjà rempli.",
  },
  {
    illId: "ILL-EC-7AF-C04-04", chap: 4, section: "Fin de chapitre (après les exercices)", type: "Synthèse",
    page: 39,
    objectif: "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
    notion: "Carte mentale de synthèse du Chapitre 4 : dignité, libertés fondamentales, droit à l'éducation, droit à l'information, actions contre les inégalités.",
    personnages: "Aucun personnage — infographie carte mentale.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Bulle centrale « Égalité », 5 branches avec icônes simples.",
    interdits: "Texte long, contenu stigmatisant.",
    texte: "6 libellés courts autorisés.",
    format: "Paysage, pleine largeur",
    realisme: "Infographie type carte mentale colorée",
    statut: "PROMPT PRÊT",
    prompt:
      "Infographie de type carte mentale (mind map) colorée et pédagogique, format paysage pleine largeur. Une " +
      "bulle centrale ronde porte le texte court « Égalité ». Cinq branches courbes partent vers 5 bulles " +
      "secondaires portant chacune un des libellés courts suivants : « Dignité », « Libertés fondamentales », " +
      "« Droit à l'éducation », « Droit à l'information », « Actions contre les inégalités ». Chaque bulle " +
      "secondaire accompagnée d'une petite icône simple et générique. Palette chaleureuse et variée, lignes de " +
      "connexion nettes, fond clair. Cadrage : vue de face à plat, format paysage pleine largeur. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 6 libellés courts. Ne pas ajouter : personnages, contenu " +
      "stigmatisant, texte long, " + FORBIDDEN_BASE,
  },

  // ===================== CHAPITRE 5 =====================
  {
    illId: "ILL-EC-7AF-C05-01", chap: 5, section: "5.1 — Qu'est-ce qu'un conflit ?", type: "Ouverture",
    page: 41,
    objectif: "Ancrer l'ouverture du chapitre dans une scène scolaire réaliste et non violente.",
    notion: "Un conflit ordinaire du quotidien scolaire permet d'introduire concrètement la résolution par le dialogue.",
    personnages: "2 élèves en désaccord (expression contrariée mais non agressive), 1 enseignant(e) adulte qui s'approche.",
    lieu: "Cour d'école haïtienne.",
    action: "Deux élèves se font face autour d'un ballon, tous deux le touchant ou pointant vers lui, expression de désaccord ferme mais non violente ; l'enseignant s'approche pour engager le dialogue.",
    objets: "Un ballon de football simple.",
    interdits: "Tout contact physique agressif, poing levé, bousculade, expression de colère extrême.",
    texte: "Aucun texte visible.",
    format: "Paysage, pleine largeur",
    realisme: "Semi-réaliste éditorial, non violent",
    statut: "PROMPT PRÊT",
    prompt:
      "Illustration pédagogique semi-réaliste d'une cour d'école haïtienne. Deux élèves de 7e année " +
      "fondamentale (environ 12 ans) se font face autour d'un ballon de football posé au sol, chacun désignant " +
      "ou touchant le ballon, avec une expression de désaccord ferme mais SANS agressivité ni contact physique " +
      "(pas de bousculade, pas de poing levé, pas de cri représenté). Un(e) enseignant(e) adulte haïtien(ne) " +
      "s'approche du groupe avec une posture calme et bienveillante, s'apprêtant à engager le dialogue. Autres " +
      "élèves discrets en arrière-plan observant sans intervenir. Cadrage : plan moyen, format paysage pleine " +
      "largeur. Lumière naturelle de jour. " + STYLE_CLAUSE +
      " Aucun texte visible. Ne pas ajouter : violence physique, contact agressif, expression de colère " +
      "extrême, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C05-02", chap: 5, section: "5.2-5.4 — Dialogue, négociation, pensée critique", type: "Exemple analysé",
    page: 43,
    objectif: "Donner une référence visuelle claire et mémorisable des trois outils du chapitre.",
    notion: "Trois outils complémentaires pour résoudre un conflit : écouter (dialogue), trouver un accord (négociation), vérifier les faits (pensée critique).",
    personnages: "Petites silhouettes génériques simples dans chaque icône (optionnel).",
    lieu: "Fond neutre (schéma en trois étapes).",
    action: "Sans scène narrative — schéma reliant trois pictogrammes.",
    objets: "3 pictogrammes : deux silhouettes face à face avec une oreille stylisée (écouter/dialogue), une poignée de main (négociation/accord), une loupe sur un point d'interrogation (pensée critique/vérifier les faits).",
    interdits: "Contenu d'actualité réel, texte long.",
    texte: "3 libellés courts autorisés : « Écouter », « Trouver un accord », « Vérifier les faits ».",
    format: "Paysage, demi-page, schéma en trois étapes",
    realisme: "Infographie pédagogique",
    statut: "PROMPT PRÊT",
    prompt:
      "Schéma infographique en trois étapes reliées par des flèches fines, format paysage demi-page, fond clair " +
      "neutre. Étape 1 : deux silhouettes stylisées face à face avec une petite icône d'oreille, libellé " +
      "« Écouter ». Étape 2 : une poignée de main stylisée, libellé « Trouver un accord ». Étape 3 : une loupe " +
      "posée sur un point d'interrogation, libellé « Vérifier les faits ». Pictogrammes simples et uniformes, " +
      "style d'infographie scolaire épurée, couleurs cohérentes. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 3 libellés indiqués. Ne pas ajouter : contenu d'actualité réel, " +
      "personnage identifiable, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C05-03", chap: 5, section: "Activité — Carnet du dialogue (après 5.5)", type: "Espace de production",
    page: 45,
    objectif: "Offrir un espace direct de production pour ancrer la pratique régulière du dialogue et de la négociation.",
    notion: "Carnet du dialogue personnel — espace vierge à compléter.",
    personnages: "Aucun personnage — gabarit vide.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Tableau vide à deux colonnes.",
    interdits: "Tout contenu pré-rempli.",
    texte: "Deux en-têtes courts autorisés : « Le désaccord », « La solution trouvée ensemble ».",
    format: "Portrait, demi-page, tableau à deux colonnes",
    realisme: "Gabarit graphique simple",
    statut: "PROMPT PRÊT",
    prompt:
      "Gabarit graphique vide de type page d'activité, format portrait demi-page, présentant un tableau vide à " +
      "deux colonnes de largeur égale avec 5-6 lignes vides. En-têtes de colonnes : « Le désaccord » et « La " +
      "solution trouvée ensemble ». Bordures fines couleur or/jaune doré. Fond blanc ou papier clair. Aucun " +
      "contenu rempli, aucune illustration, aucun personnage. Style graphique sobre de manuel scolaire. " +
      "Cadrage : vue de face à plat. Texte visible autorisé : uniquement les 2 en-têtes de colonne. Ne pas " +
      "ajouter : personnages, scène illustrée, contenu déjà rempli.",
  },
  {
    illId: "ILL-EC-7AF-C05-04", chap: 5, section: "Fin de chapitre (après les exercices)", type: "Synthèse",
    page: 48,
    objectif: "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
    notion: "Carte mentale de synthèse du Chapitre 5 : conflit positif/négatif, dialogue, négociation, pensée critique, paix sociale.",
    personnages: "Aucun personnage — infographie carte mentale.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Bulle centrale « Vivre ensemble », 5 branches avec icônes simples.",
    interdits: "Texte long, contenu violent.",
    texte: "6 libellés courts autorisés.",
    format: "Paysage, pleine largeur",
    realisme: "Infographie type carte mentale colorée",
    statut: "PROMPT PRÊT",
    prompt:
      "Infographie de type carte mentale (mind map) colorée et pédagogique, format paysage pleine largeur. Une " +
      "bulle centrale ronde porte le texte court « Vivre ensemble ». Cinq branches courbes partent vers 5 " +
      "bulles secondaires portant chacune un des libellés courts suivants : « Conflit positif/négatif », " +
      "« Dialogue », « Négociation », « Pensée critique », « Paix sociale ». Chaque bulle secondaire " +
      "accompagnée d'une petite icône simple et générique. Palette chaleureuse et variée, lignes de connexion " +
      "nettes, fond clair. Cadrage : vue de face à plat, format paysage pleine largeur. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 6 libellés courts. Ne pas ajouter : personnages, contenu " +
      "violent, texte long, " + FORBIDDEN_BASE,
  },

  // ===================== CHAPITRE 6 =====================
  {
    illId: "ILL-EC-7AF-C06-01", chap: 6, section: "6.1 — La sécurité, une responsabilité partagée", type: "Ouverture",
    page: 50,
    objectif: "Ancrer l'ouverture du chapitre dans une scène réaliste et non alarmante.",
    notion: "Un geste quotidien simple (traverser prudemment) illustre concrètement la sécurité individuelle et collective.",
    personnages: "3-4 élèves de 7e AF devant une école, l'un d'eux regardant prudemment des deux côtés avant de traverser.",
    lieu: "Rue haïtienne devant une école.",
    action: "Un groupe d'élèves s'apprête à traverser la rue ; l'un regarde à gauche et à droite avec prudence.",
    objets: "Façade d'école simple en arrière-plan, rue calme, éventuellement un adulte/agent de circulation générique au loin (optionnel).",
    interdits: "Toute scène d'accident, véhicule en mouvement dangereux, situation alarmante ou dramatique.",
    texte: "Aucun texte visible.",
    format: "Paysage, pleine largeur",
    realisme: "Semi-réaliste éditorial, non alarmant",
    statut: "PROMPT PRÊT",
    prompt:
      "Illustration pédagogique semi-réaliste d'une rue haïtienne calme devant une école. Un groupe de 3-4 " +
      "élèves de 7e année fondamentale (environ 12 ans) s'apprête à traverser la rue ensemble ; l'un(e) d'eux " +
      "regarde prudemment à gauche puis à droite avant de s'engager, geste clairement lisible et pédagogique. " +
      "Rue calme et sûre, sans véhicule proche ou menaçant, façade simple d'école en arrière-plan, quelques " +
      "arbres. Ambiance sereine et non alarmante. Cadrage : plan moyen, format paysage pleine largeur. Lumière " +
      "naturelle de jour. " + STYLE_CLAUSE +
      " Aucun texte visible. Ne pas ajouter : scène d'accident, véhicule en mouvement dangereux, situation " +
      "alarmante, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C06-02", chap: 6, section: "6.3 — Comprendre et respecter une consigne de sécurité", type: "Exemple analysé",
    page: 52,
    objectif: "Donner une méthode visuelle claire pour analyser toute consigne de sécurité.",
    notion: "Une consigne de sécurité se décompose en trois éléments clairs : le danger, l'action à faire, la personne à prévenir.",
    personnages: "Aucun personnage central — pictogrammes avec silhouette générique optionnelle.",
    lieu: "Fond neutre (schéma annoté).",
    action: "Sans scène narrative — schéma avec 3 flèches annotées autour d'un exemple de consigne (fortes pluies).",
    objets: "Icône de nuage/pluie forte (danger), icône d'action simple (ex. se mettre à l'abri, silhouette sous un toit), icône de personne à prévenir (silhouette avec bulle de dialogue vers un adulte).",
    interdits: "Image alarmante de catastrophe, texte de consigne officielle réelle, logo d'institution.",
    texte: "3 libellés courts autorisés : « Le danger », « L'action à faire », « Qui prévenir ».",
    format: "Paysage, demi-page, schéma annoté en trois flèches",
    realisme: "Infographie pédagogique",
    statut: "PROMPT PRÊT",
    prompt:
      "Schéma infographique pédagogique sur fond clair neutre, format paysage demi-page, illustrant l'exemple " +
      "d'une consigne de sécurité liée aux fortes pluies, décomposée en trois éléments reliés par des flèches " +
      "annotées : (1) « Le danger », illustré par une icône simple de nuage avec pluie intense ; (2) « L'action " +
      "à faire », illustré par une petite silhouette générique se mettant à l'abri sous un toit ; (3) « Qui " +
      "prévenir », illustré par une petite silhouette avec une bulle de dialogue pointant vers une silhouette " +
      "adulte. Pictogrammes simples et clairs, style d'infographie scolaire épurée, sans image de catastrophe " +
      "ni scène alarmante. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 3 libellés indiqués. Ne pas ajouter : image de catastrophe " +
      "réelle, texte de consigne officielle, logo d'institution, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C06-03", chap: 6, section: "Activité — Portfolio presse (après 6.4)", type: "Espace de production",
    page: 54,
    objectif: "Offrir un espace direct de production pour ancrer le portfolio de presse sur la paix et la sécurité.",
    notion: "Portfolio de presse personnel — espace vierge à compléter.",
    personnages: "Aucun personnage — gabarit vide.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Trois zones vides : titre d'article, résumé personnel, lien avec paix/protection/sécurité.",
    interdits: "Tout contenu pré-rempli.",
    texte: "Trois en-têtes courts autorisés.",
    format: "Portrait, demi-page, trois zones",
    realisme: "Gabarit graphique simple",
    statut: "PROMPT PRÊT",
    prompt:
      "Gabarit graphique vide de type page de portfolio, format portrait demi-page, divisé en trois zones " +
      "verticales vides avec lignes fines à compléter : « Titre de l'article » (une ligne), « Résumé personnel " +
      "» (4-5 lignes vides), « Lien avec la paix / la protection / la sécurité » (3-4 lignes vides). Bordures " +
      "fines couleur or/jaune doré. Fond blanc ou papier clair. Aucun contenu rempli, aucune illustration, " +
      "aucun personnage. Style graphique sobre de manuel scolaire. Cadrage : vue de face à plat. Texte visible " +
      "autorisé : uniquement les 3 titres de zone. Ne pas ajouter : personnages, scène illustrée, contenu déjà " +
      "rempli.",
  },
  {
    illId: "ILL-EC-7AF-C06-04", chap: 6, section: "Fin de chapitre (après les exercices)", type: "Synthèse",
    page: 57,
    objectif: "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
    notion: "Carte mentale de synthèse du Chapitre 6 : sécurité individuelle/collective, institutions de sécurité, consignes de sécurité, rôle du citoyen, portfolio de presse.",
    personnages: "Aucun personnage — infographie carte mentale.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Bulle centrale « Sécurité », 5 branches avec icônes simples.",
    interdits: "Texte long, uniforme/insigne officiel précis, arme.",
    texte: "6 libellés courts autorisés.",
    format: "Paysage, pleine largeur",
    realisme: "Infographie type carte mentale colorée",
    statut: "PROMPT PRÊT",
    prompt:
      "Infographie de type carte mentale (mind map) colorée et pédagogique, format paysage pleine largeur. Une " +
      "bulle centrale ronde porte le texte court « Sécurité ». Cinq branches courbes partent vers 5 bulles " +
      "secondaires portant chacune un des libellés courts suivants : « Sécurité individuelle/collective », " +
      "« Institutions de sécurité », « Consignes de sécurité », « Rôle du citoyen », « Portfolio de presse ». " +
      "Chaque bulle secondaire accompagnée d'une petite icône simple et générique (ex. un bouclier stylisé " +
      "générique pour « Institutions de sécurité », sans insigne officiel précis). Palette chaleureuse et " +
      "variée, lignes de connexion nettes, fond clair. Cadrage : vue de face à plat, format paysage pleine " +
      "largeur. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 6 libellés courts. Ne pas ajouter : uniforme ou insigne " +
      "officiel précis, arme, personnages, texte long, " + FORBIDDEN_BASE,
  },

  // ===================== CHAPITRE 7 =====================
  {
    illId: "ILL-EC-7AF-C07-01", chap: 7, section: "7.1 — Qu'est-ce qu'un bien collectif ?", type: "Ouverture",
    page: 59,
    objectif: "Ancrer l'ouverture du chapitre dans une scène scolaire réaliste et non alarmante.",
    notion: "Un espace collectif négligé illustre concrètement la notion de bien collectif à préserver.",
    personnages: "3-4 élèves de 7e AF observant l'espace, expression pensive/préoccupée mais pas alarmée.",
    lieu: "Espace vert scolaire haïtien (jardin ou cour végétalisée).",
    action: "Les élèves observent un espace vert envahi par les herbes hautes, léger désordre, sans dégradation choquante.",
    objets: "Herbes hautes, quelques feuilles/déchets légers, clôture simple ou bâtiment scolaire en arrière-plan.",
    interdits: "Dégradation choquante, déchets en grande quantité, pollution alarmante.",
    texte: "Aucun texte visible.",
    format: "Paysage, pleine largeur",
    realisme: "Semi-réaliste éditorial, non alarmant",
    statut: "PROMPT PRÊT",
    prompt:
      "Illustration pédagogique semi-réaliste d'un espace vert scolaire haïtien légèrement envahi par les " +
      "herbes hautes et quelques feuilles au sol, sans dégradation choquante ni pollution visible en grande " +
      "quantité. 3-4 élèves de 7e année fondamentale (environ 12 ans) observent l'espace avec une expression " +
      "pensive et légèrement préoccupée, sans détresse. Bâtiment scolaire simple ou clôture en arrière-plan, " +
      "végétation tropicale. Ambiance calme, réaliste, non alarmante. Cadrage : plan moyen, format paysage " +
      "pleine largeur. Lumière naturelle de jour. " + STYLE_CLAUSE +
      " Aucun texte visible. Ne pas ajouter : dégradation choquante, pollution alarmante, déchets en grande " +
      "quantité, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C07-02", chap: 7, section: "7.2 — Le patrimoine naturel, culturel et historique", type: "Exemple analysé",
    page: 60,
    objectif: "Donner une référence visuelle claire des trois types de patrimoine étudiés.",
    notion: "Trois formes de patrimoine : naturel, culturel, historique.",
    personnages: "Aucun personnage central — petites silhouettes génériques optionnelles pour l'échelle.",
    lieu: "Fond neutre (planche en trois colonnes).",
    action: "Sans scène narrative — trois vignettes côte à côte.",
    objets: "Vignette 1 (patrimoine naturel) : paysage générique haïtien (montagne, mer ou forêt, non identifiable précisément). Vignette 2 (patrimoine culturel) : scène générique de tradition (danse, artisanat, instrument, sans détail identifiable précisément à une pratique religieuse précise). Vignette 3 (patrimoine historique) : monument générique ancien, non identifiable précisément.",
    interdits: "Monument réel identifiable, symbole religieux précis, contenu ethnographique stéréotypé.",
    texte: "3 libellés courts autorisés sous chaque vignette : « Patrimoine naturel », « Patrimoine culturel », « Patrimoine historique ».",
    format: "Paysage, demi-page, planche en trois colonnes",
    realisme: "Semi-réaliste éditorial / infographie mixte",
    statut: "PROMPT PRÊT",
    prompt:
      "Planche illustrée en trois vignettes côte à côte de largeur égale, format paysage demi-page, présentant " +
      "trois formes génériques de patrimoine haïtien, sans représenter de lieu ou de pratique identifiable " +
      "précisément : vignette 1 « Patrimoine naturel » — un paysage haïtien générique (chaîne de montagnes " +
      "verdoyantes ou littoral, style semi-réaliste) ; vignette 2 « Patrimoine culturel » — une scène générique " +
      "et respectueuse évoquant une tradition artisanale ou musicale haïtienne (par exemple un instrument de " +
      "musique traditionnel simple ou un objet d'artisanat, sans personnage identifiable ni pratique religieuse " +
      "précise) ; vignette 3 « Patrimoine historique » — un monument ancien générique (silhouette de fort ou de " +
      "bâtiment colonial simplifié, non identifiable précisément). Style cohérent entre les trois vignettes, " +
      "séparées par une fine bordure. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 3 libellés sous chaque vignette. Ne pas ajouter : monument réel " +
      "identifiable, symbole religieux précis, contenu ethnographique stéréotypé, " + FORBIDDEN_BASE,
  },
  {
    illId: "ILL-EC-7AF-C07-03", chap: 7, section: "Activité — Plan du jardin/pépinière scolaire (après 7.3)", type: "Espace de production",
    page: 62,
    objectif: "Offrir un espace direct de production pour ancrer la mise en place réelle du jardin ou de la pépinière scolaire.",
    notion: "Plan personnel de jardin/pépinière scolaire — espace vierge à compléter.",
    personnages: "Aucun personnage — gabarit vide.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Plan simple vide à compléter (emplacement, plantes choisies, responsables par semaine).",
    interdits: "Tout contenu pré-rempli.",
    texte: "En-têtes courts autorisés : « Emplacement », « Plantes choisies », « Responsables (semaine) ».",
    format: "Portrait, demi-page, plan à compléter",
    realisme: "Gabarit graphique simple",
    statut: "PROMPT PRÊT",
    prompt:
      "Gabarit graphique vide de type page d'activité, format portrait demi-page, présentant un plan simple à " +
      "compléter : un rectangle vide représentant une parcelle de jardin (grille légère en pointillés, sans " +
      "contenu dessiné), puis en dessous deux zones à lignes vides titrées « Plantes choisies » et " +
      "« Responsables (semaine) ». Bordures fines couleur vert communautaire. Fond blanc ou papier clair. Aucun " +
      "contenu rempli, aucune illustration de plante, aucun personnage. Style graphique sobre de manuel " +
      "scolaire. Cadrage : vue de face à plat. Texte visible autorisé : uniquement les en-têtes indiqués. Ne " +
      "pas ajouter : personnages, plantes dessinées, contenu déjà rempli.",
  },
  {
    illId: "ILL-EC-7AF-C07-04", chap: 7, section: "Fin de chapitre (après les exercices)", type: "Synthèse",
    page: 66,
    objectif: "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
    notion: "Carte mentale de synthèse du Chapitre 7 : patrimoine naturel, patrimoine culturel, patrimoine historique, préservation citoyenne, jardin/pépinière scolaire.",
    personnages: "Aucun personnage — infographie carte mentale.",
    lieu: "Sans objet.",
    action: "Sans objet.",
    objets: "Bulle centrale « Bien collectif », 5 branches avec icônes simples.",
    interdits: "Texte long, monument identifiable.",
    texte: "6 libellés courts autorisés.",
    format: "Paysage, pleine largeur",
    realisme: "Infographie type carte mentale colorée",
    statut: "PROMPT PRÊT",
    prompt:
      "Infographie de type carte mentale (mind map) colorée et pédagogique, format paysage pleine largeur. Une " +
      "bulle centrale ronde porte le texte court « Bien collectif ». Cinq branches courbes partent vers 5 " +
      "bulles secondaires portant chacune un des libellés courts suivants : « Patrimoine naturel », " +
      "« Patrimoine culturel », « Patrimoine historique », « Préservation citoyenne », « Jardin/pépinière " +
      "scolaire ». Chaque bulle secondaire accompagnée d'une petite icône simple et générique (ex. une feuille " +
      "stylisée pour « Jardin/pépinière scolaire »). Palette chaleureuse et variée (dominante verte), lignes de " +
      "connexion nettes, fond clair. Cadrage : vue de face à plat, format paysage pleine largeur. " + STYLE_CLAUSE +
      " Texte visible autorisé : uniquement les 6 libellés courts. Ne pas ajouter : personnages, monument " +
      "identifiable, texte long, " + FORBIDDEN_BASE,
  },
];

// Sanity check helper (used by build script)
export function assignEcIds() {
  return ILLUSTRATIONS.map((it, idx) => ({ ...it, ecId: `EC7-IMG-${String(idx + 1).padStart(3, "0")}` }));
}
