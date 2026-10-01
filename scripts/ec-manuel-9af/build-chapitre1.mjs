// Manuel d'EC 9e AF — Chapitre 1 : Citoyenne, citoyen du monde
// (Unité 1 — La nation haïtienne et l'identité haïtienne, Compétence C1).
//
// PREMIER CHAPITRE DU MANUEL 9e AF, DERNIER NIVEAU DE LA COLLECTION EC :
// ouvre le livre, pagination fraîche (page 1), ne réutilise ni le texte ni
// la pagination des manuels EC 7e ou 8e AF (déjà finalisés, Phase Finale
// incluse pour les deux, NON modifiés ici).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.33-34 : Unité 1, colonne 9e AF explicitement séparée par année
//     (`04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, verrouillée sans changement
//     dans `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`) : "La
//     citoyenneté du monde : respect et engagement pour les valeurs
//     universelles. La responsabilité citoyenne dans la sauvegarde du
//     patrimoine historique et culturel du pays."
//   - `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md` (verrouillée sans changement
//     dans `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`) : situation de départ
//     "un enjeu mondial (patrimoine mondial, droits humains) mis en regard
//     du patrimoine haïtien" ; activité "synthèse du glossaire collaboratif
//     construit sur 3 ans" ; lien examen "cohérent avec les questions de
//     symboles/identité nationale du Texte modèle 2024".
//
// PROGRESSION RÉELLE 7e → 8e → 9e AF (section 4 du prompt d'exécution) :
// le Chapitre 1 de 7e AF a construit nation/symboles/organisation
// territoriale/patrimoine local ; le Chapitre 1 de 8e AF a élargi à la
// comparaison caribéenne et introduit les valeurs universelles. CES ACQUIS
// NE SONT PAS REDÉVELOPPÉS ICI : ils sont mobilisés (rappel bref, section
// 1.1) pour construire la maîtrise attendue en fin de cycle — une véritable
// SYNTHÈSE (nation → région → monde) et un engagement concret pour les
// valeurs universelles à l'échelle mondiale, conformément à
// `18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md` (« citoyenneté
// mondiale, engagement pour les valeurs universelles »).
//
// PATRIMOINE MONDIAL — FAIT VÉRIFIABLE UTILISÉ (transparence éditoriale) :
// le Parc national historique — Citadelle, Sans-Souci, Ramiers, inscrit au
// patrimoine mondial de l'UNESCO depuis 1982, est un fait public largement
// documenté [ADAPTATION PÉDAGOGIQUE — connaissance générale, non vérifiée
// en direct sur une source institutionnelle pendant cette session], utilisé
// ici pour ancrer concrètement la notion de « patrimoine mondial » dans un
// exemple haïtien réel, sans invention de détail (date d'inscription,
// composition du site) au-delà de ce qui est de notoriété publique établie.
//
// LOGIQUE « PRÉPARATION AUX EXAMENS OFFICIELS » (sections 2, 6, 7, 8 du
// prompt d'exécution) : ce chapitre intègre, pour la première fois dans la
// collection, un bloc « PRÉPARATION EXAMEN 9e AF » distinct du cours et des
// exercices ordinaires. Il s'appuie sur l'analyse déjà réalisée en Phase 0
// (`07_INVENTAIRE_EXAMENS_EC_9AF.md`, `08_MATRICE_EXIGENCES_EVALUATION_
// EC_9AF.md`) du « Texte modèle » EC 9e AF (juillet 2024, MENFP/DEF/BUNEXE,
// statut conservé tel quel — JAMAIS requalifié en « examen officiel »,
// DROITS/SOURCE À RÉGLER, non reproduit). Seuls le FORMAT et le NIVEAU DE
// DIFFICULTÉ observés (QCM de reconnaissance sur les symboles nationaux,
// Partie I du Texte modèle) servent de repère : toutes les questions
// ci-dessous sont des créations originales, aucun énoncé n'est copié.
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
  1,
  "Citoyenne, citoyen du monde",
  "Nation haïtienne (7e AF). Région caribéenne (8e AF). Aujourd'hui, un pas de plus : le monde entier. Ce " +
  "chapitre clôt un parcours de trois ans en te montrant que ton identité haïtienne et ta citoyenneté " +
  "mondiale ne s'opposent pas — elles se complètent.",
  [
    "Faire la synthèse entre identité nationale, régionale et mondiale.",
    "Définir la citoyenneté mondiale et l'engagement pour les valeurs universelles.",
    "Expliquer ce qu'est le patrimoine mondial et le relier au patrimoine haïtien.",
    "Réaliser la synthèse du glossaire collaboratif construit sur les trois années du cycle.",
    "S'entraîner aux formats de questions attendus à l'examen officiel de 9e AF.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Un site haïtien reconnu dans le monde entier",
  [
    "Une classe de 9e AF découvre qu'un monument haïtien qu'elle connaît déjà est reconnu comme faisant " +
    "partie du patrimoine mondial de l'humanité, au même titre que des sites célèbres d'autres continents. " +
    "« Notre patrimoine, c'est aussi le patrimoine du monde entier ? » demande une élève. Ce chapitre répond à " +
    "cette question, en clôturant le parcours commencé en 7e AF.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis / rappel ciblé (synthèse 7e et 8e AF)"));
children.push(bodyPar(
  "En 7e AF, tu as découvert la nation haïtienne, ses symboles et son patrimoine. En 8e AF, tu as élargi ce " +
  "regard à la région caribéenne et découvert la notion de valeur universelle. Ce chapitre ne redéveloppe pas " +
  "ces contenus : il les rassemble pour construire, pour la première fois, une véritable citoyenneté " +
  "mondiale.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Citoyenneté mondiale — conscience et engagement d'une personne envers l'humanité tout entière, au-delà de sa seule nation."));
children.push(bulletPar("Patrimoine mondial — biens culturels ou naturels reconnus comme ayant une valeur exceptionnelle pour l'humanité entière, au-delà du seul pays où ils se trouvent."));
children.push(bulletPar("Engagement universel — action concrète en faveur de valeurs reconnues importantes pour l'ensemble des êtres humains (dignité, paix, justice)."));
children.push(bulletPar("Synthèse — mise en relation cohérente de plusieurs connaissances déjà acquises pour en dégager une compréhension d'ensemble."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("De la nation au monde : une synthèse", "1.1"));
children.push(bodyPar(
  "Ce cycle t'a fait parcourir trois échelles : ta nation (7e AF), ta région (8e AF), et maintenant le monde " +
  "(9e AF). Ces trois échelles ne s'opposent pas : elles s'emboîtent. Être citoyen du monde ne signifie pas " +
  "cesser d'être haïtien — cela signifie reconnaître que ton identité nationale fait partie d'une humanité " +
  "plus large, avec laquelle elle partage des valeurs et des responsabilités communes.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Trois échelles, une seule personne",
  [
    "Échelle nationale (7e AF) : symboles, patrimoine, identité haïtienne.",
    "Échelle régionale (8e AF) : comparaison avec les nations caribéennes voisines, valeurs universelles " +
    "introduites.",
    "Échelle mondiale (9e AF) : citoyenneté mondiale, patrimoine mondial, engagement universel.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C01-01",
  "Ouverture — Un monument haïtien reconnu mondialement",
  "Une illustration stylisée d'un monument historique haïtien emblématique (silhouette générale de forteresse " +
  "en montagne, sans reproduction architecturale exacte protégée), accompagnée d'une carte du monde en " +
  "arrière-plan suggérant sa reconnaissance internationale, cohérente avec la charte EC.",
  "Un monument haïtien célèbre incarne concrètement le lien entre patrimoine national et patrimoine mondial.",
  "Ancrer l'ouverture du chapitre dans un exemple haïtien fort et reconnaissable.",
  "Illustration pleine largeur, composition monument + carte du monde, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("La citoyenneté mondiale et l'engagement universel", "1.2"));
children.push(bodyPar(
  "Être citoyen du monde, c'est reconnaître que certaines responsabilités dépassent les frontières d'un seul " +
  "pays : protéger l'environnement, défendre les droits humains, œuvrer pour la paix. Cette citoyenneté " +
  "mondiale ne remplace pas la citoyenneté nationale : elle s'y ajoute.",
));
children.push(calloutBox(
  "DÉCOUVRIR — S'engager concrètement pour des valeurs universelles",
  [
    "S'informer sur des enjeux mondiaux (droits humains, environnement, paix) et pas seulement locaux.",
    "Reconnaître que la dignité, la paix et la justice sont dues à toute personne, où qu'elle vive.",
    "Relier une action locale (déjà pratiquée les années précédentes : entraide, reboisement, dialogue) à une " +
    "valeur reconnue au niveau mondial.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le patrimoine mondial : le patrimoine haïtien vu par le monde", "1.3"));
children.push(bodyPar(
  "Certains lieux, en raison de leur valeur exceptionnelle, sont reconnus comme faisant partie du patrimoine " +
  "mondial de l'humanité — une reconnaissance qui dépasse le seul pays où ils se trouvent. Haïti compte un " +
  "site reconnu à ce titre : le Parc national historique, qui réunit la Citadelle, Sans-Souci et les Ramiers, " +
  "inscrit au patrimoine mondial depuis 1982 [ADAPTATION PÉDAGOGIQUE — fait public généralement reconnu].",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extrait à vérifier",
  [
    "DOC-EC-9AF-C01-01 — Emplacement réservé pour une fiche descriptive exacte et vérifiée du Parc national " +
    "historique (Citadelle, Sans-Souci, Ramiers) et de sa reconnaissance internationale.",
    "Statut : [SOURCE À VÉRIFIER] — la date et les grandes lignes citées ici relèvent de la notoriété " +
    "publique générale ; aucun détail précis non vérifié n'est ajouté au-delà de ce constat général.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Ce type de reconnaissance illustre concrètement l'idée de citoyenneté mondiale : préserver ce patrimoine " +
  "est à la fois une responsabilité haïtienne (déjà étudiée en 7e AF) et une responsabilité envers l'humanité " +
  "tout entière.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C01-02",
  "Exemple analysé — patrimoine national et patrimoine mondial",
  "Un schéma en deux cercles concentriques : « Patrimoine national » à l'intérieur, « Patrimoine mondial » à " +
  "l'extérieur, avec une flèche montrant qu'un même site peut appartenir aux deux catégories, cohérent avec " +
  "la charte EC.",
  "Un même lieu peut être à la fois un patrimoine national et un patrimoine reconnu mondialement.",
  "Rendre visible la relation entre patrimoine national et patrimoine mondial.",
  "Illustration demi-page, schéma en cercles concentriques, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "ÉTUDE DE CAS — Un enjeu mondial vu depuis Haïti",
  [
    "Un enjeu mondial (par exemple : la protection de sites historiques menacés dans le monde) est présenté " +
    "aux côtés du Parc national historique haïtien.",
    "1. En quoi la préservation d'un site reconnu mondialement dépasse-t-elle l'intérêt d'un seul pays ?",
    "2. Quelle responsabilité un(e) jeune citoyen(ne) haïtien(ne) peut-il ou elle exercer envers ce type de " +
    "patrimoine ?",
    "3. Compare cette responsabilité avec celle, plus locale, étudiée pour un bien collectif de quartier en " +
    "7e AF : qu'est-ce qui change, qu'est-ce qui reste identique ?",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Être citoyen du monde, est-ce affaiblir son identité nationale ?",
  [
    "Certains pensent que se sentir citoyen du monde risque d'affaiblir l'attachement à la nation haïtienne. " +
    "D'autres pensent que les deux appartenances se renforcent mutuellement, sans se concurrencer.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle nuancée, qui s'appuie sur la synthèse des trois " +
    "années du cycle.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne / Projet — Synthèse du glossaire collaboratif (3 ans)"));
children.push(calloutBox(
  "PROJET",
  [
    "Le glossaire illustré collaboratif, commencé en 7e AF et poursuivi en 8e AF, se conclut cette année. " +
    "[OFFICIEL — dispositif transversal de la Collection EC]",
    "OBJECTIF : Relire l'ensemble des mots ajoutés depuis la 7e AF et en réaliser une synthèse organisée.",
    "ÉTAPES : 1. Rassembler tous les mots du glossaire des trois années (si le support a été conservé). 2. " +
    "Les classer par grand thème (nation, droits, démocratie, égalité, conflit, sécurité, environnement, " +
    "citoyenneté mondiale). 3. Choisir, pour chaque thème, le mot que tu juges le plus important et expliquer " +
    "pourquoi. 4. Présenter cette synthèse à la classe.",
    "RÉSULTAT ATTENDU : Une vue d'ensemble organisée du vocabulaire civique construit sur tout le cycle, " +
    "démontrant une réelle maîtrise cumulative.",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-9AF-C01-03",
  "Espace de production — ma synthèse du glossaire",
  "Un cadre vide, format portrait, structuré en un tableau à deux colonnes (Thème / Mot le plus important et " +
  "pourquoi), prévu pour que l'élève y consigne directement sa synthèse.",
  "Offrir un espace direct de production pour la synthèse finale du glossaire collaboratif.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, tableau à deux colonnes, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Les trois échelles de citoyenneté (nationale, régionale, mondiale) s'emboîtent plutôt qu'elles ne " +
    "s'opposent.",
    "La citoyenneté mondiale suppose un engagement concret pour des valeurs universelles (dignité, paix, " +
    "justice), en complément de la citoyenneté nationale.",
    "Le patrimoine mondial reconnaît la valeur exceptionnelle de certains sites pour l'humanité entière ; " +
    "Haïti possède un site reconnu à ce titre.",
    "Un même lieu ou une même responsabilité peut exister simultanément à l'échelle locale, nationale et " +
    "mondiale.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de faire la synthèse des trois années du cycle (nation, région, monde), de définir la " +
  "citoyenneté mondiale et l'engagement pour les valeurs universelles, de relier le patrimoine haïtien au " +
  "patrimoine mondial à travers un exemple réel, et de réaliser la synthèse finale du glossaire collaboratif " +
  "construit depuis la 7e AF.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "citoyenneté mondiale · patrimoine mondial · engagement universel · synthèse.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer comment s'articulent identité nationale, régionale et mondiale.",
    "☐ Définir la citoyenneté mondiale et citer un engagement universel concret.",
    "☐ Expliquer ce qu'est le patrimoine mondial à partir d'un exemple haïtien réel.",
    "☐ Présenter une synthèse organisée du vocabulaire civique appris sur trois ans.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : citoyenneté mondiale, patrimoine mondial, engagement universel, synthèse des " +
    "trois échelles.",
    "Vocabulaire clé à maîtriser : citoyenneté mondiale, patrimoine mondial, engagement universel.",
    "Avant l'évaluation, vérifie que tu peux : relier les trois échelles de citoyenneté ; expliquer un exemple " +
    "réel de patrimoine mondial haïtien ; définir l'engagement universel.",
    "Rappel officiel : l'évaluation de cette unité reste cohérente avec la structure officielle full-cycle sur " +
    "les symboles et l'identité, adaptée ici au niveau de synthèse attendu en 9e AF [OFFICIEL, adapté au " +
    "niveau 9e AF].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(1));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : " +
  "citoyenneté mondiale · patrimoine mondial · engagement universel · synthèse.",
  { italics: true },
));
children.push(numberedPar("1. La conscience et l'engagement d'une personne envers l'humanité tout entière s'appelle la ......................"));
children.push(numberedPar("2. Des biens reconnus comme ayant une valeur exceptionnelle pour l'humanité entière forment le ......................"));
children.push(numberedPar("3. Une action concrète en faveur de valeurs importantes pour tous les êtres humains est un ......................"));
children.push(numberedPar("4. Mettre en relation plusieurs connaissances déjà acquises pour en dégager une vue d'ensemble s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Cite les trois échelles de citoyenneté étudiées sur le cycle (7e, 8e, 9e AF) et associe chacune à l'année où elle a été introduite."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Se sentir citoyen du monde signifie renoncer à son identité nationale. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, à partir de l'exemple du Parc national historique, ce que signifie « patrimoine mondial »."));
children.push(numberedPar("2. Donne un exemple d'engagement universel que tu pourrais pratiquer à ton échelle."));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Compare la responsabilité envers un bien collectif de quartier (7e AF) et la responsabilité envers un site de patrimoine mondial (9e AF) : qu'est-ce qui change, qu'est-ce qui reste identique ?"));
children.push(numberedPar("2. Réalise, à partir de ton glossaire des trois années (ou d'une liste reconstituée), une courte synthèse de trois mots que tu juges essentiels, en justifiant chacun."));
children.push(numberedPar("3. Un camarade affirme : « La citoyenneté mondiale, c'est un concept trop abstrait pour un jeune haïtien. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(240));

// =======================================================================
// BLOC SPÉCIFIQUE — PRÉPARATION AUX EXAMENS OFFICIELS 9e AF
// =======================================================================
children.push(pageBreak());
children.push(sectionHeading("Préparation à l'examen officiel de 9e AF", ""));
children.push(bodyPar(
  "À partir de ce chapitre, chaque chapitre du Manuel d'EC 9e AF comprend un bloc dédié à la préparation de " +
  "l'examen officiel de fin de cycle. Ce bloc est clairement distinct des exercices ordinaires ci-dessus.",
  { italics: true },
));
children.push(spacer(160));

children.push(calloutBox(
  "TEXTE MODÈLE MENFP / DOCUMENT DE PRÉPARATION — Traçabilité",
  [
    "Un document à en-tête MENFP/DEF/BUNEXE authentique a été identifié et documenté en Phase 0 : « EXAMENS " +
    "DE 9ème ANNÉE FONDAMENTALE » (juillet 2024), matière Éducation à la Citoyenneté, explicitement intitulé " +
    "« Texte modèle » par le document lui-même.",
    "Statut conservé tel quel : [TEXTE MODÈLE] — jamais requalifié en « examen officiel ». Statut de " +
    "reproduction : [DROITS / SOURCE À RÉGLER] — aucun énoncé de ce document n'est reproduit ici.",
    "Ce document (Partie I, QCM) porte notamment sur les symboles de la nation haïtienne — un thème " +
    "directement lié à ce Chapitre 1. Seuls le FORMAT (QCM de reconnaissance directe) et le NIVEAU DE " +
    "DIFFICULTÉ observés servent de repère ci-dessous ; aucune question n'est copiée.",
    "Aucun document daté 2025 ou 2026 spécifique à l'EC n'a été localisé et vérifié à ce jour — statut " +
    "[À VÉRIFIER — PREUVE À FOURNIR] pour ces années.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("A. Entraînement type examen — QCM de reconnaissance"));
children.push(bodyPar(
  "Questions originales, inspirées du format QCM observé (Partie I du Texte modèle 2024). Entoure la bonne " +
  "réponse.",
  { italics: true },
));
children.push(numberedPar("1. Le patrimoine mondial reconnaît des biens ayant une valeur exceptionnelle pour : (a) un seul quartier (b) une seule nation (c) l'humanité entière"));
children.push(numberedPar("2. Le site haïtien inscrit au patrimoine mondial étudié dans ce chapitre est : (a) une cathédrale (b) le Parc national historique (Citadelle, Sans-Souci, Ramiers) (c) un aéroport"));
children.push(numberedPar("3. Être citoyen du monde signifie : (a) abandonner sa nationalité (b) s'engager pour des valeurs importantes pour toute l'humanité, en plus de sa citoyenneté nationale (c) ignorer les enjeux locaux"));
children.push(numberedPar("4. Parmi ces valeurs, laquelle est présentée comme universelle dans ce chapitre : (a) la préférence pour une équipe sportive (b) la dignité humaine (c) une mode vestimentaire"));
children.push(numberedPar("5. La synthèse du glossaire collaboratif, en 9e AF, porte sur : (a) une seule année (b) les trois années du cycle (c) uniquement le vocabulaire de ce chapitre"));
children.push(spacer(200));

children.push(subHeading("B. Entraînement type examen — Justification courte"));
children.push(bodyPar(
  "Question originale, inspirée du format « justification en 2-3 lignes » observé dans le Texte modèle 2024.",
  { italics: true },
));
children.push(numberedPar("1. En 2 à 3 lignes, justifie pourquoi la préservation d'un site de patrimoine mondial haïtien concerne aussi bien les Haïtiens que le reste du monde."));
children.push(spacer(240));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Mini-évaluation — Préparation à l'examen officiel de 9e AF, Chapitre 1", ""));
children.push(bodyPar(
  "Épreuve d'entraînement originale, propre à ce manuel. Elle ne reproduit pas et ne remplace pas une épreuve " +
  "MENFP réelle. Barème indicatif sur 20 points. Le corrigé est réservé à la Phase Finale du manuel.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie I — QCM (10 points, 5 questions)"));
children.push(numberedPar("1. La citoyenneté mondiale s'ajoute à la citoyenneté nationale, elle ne la remplace pas : (a) Vrai (b) Faux"));
children.push(numberedPar("2. Le Parc national historique haïtien est reconnu comme : (a) patrimoine local uniquement (b) patrimoine mondial (c) patrimoine d'un seul continent"));
children.push(numberedPar("3. La dignité, la paix et la justice sont des exemples de : (a) lois haïtiennes (b) valeurs universelles (c) règles de classe"));
children.push(numberedPar("4. Le glossaire collaboratif de la Collection EC a été construit sur : (a) une seule année (b) trois années (c) six mois"));
children.push(numberedPar("5. L'échelle de citoyenneté introduite pour la première fois en 8e AF est : (a) nationale (b) régionale/caribéenne (c) mondiale"));
children.push(spacer(200));

children.push(subHeading("Partie II — Classement d'attitudes (5 points)"));
children.push(bodyPar(
  "Classe les attitudes suivantes en « cohérente avec la citoyenneté mondiale » ou « incohérente avec la " +
  "citoyenneté mondiale » : (a) s'informer sur un enjeu humanitaire international ; (b) refuser de connaître " +
  "toute réalité en dehors de son quartier ; (c) relier une action locale d'entraide à une valeur universelle.",
  { italics: true },
));
children.push(spacer(200));

children.push(subHeading("Partie III — Question ouverte courte (5 points)"));
children.push(numberedPar("1. En 3 à 5 lignes, explique en quoi le parcours nation → région → monde, suivi sur trois ans, t'aide à mieux comprendre ta place de citoyen(ne) haïtien(ne) aujourd'hui."));

await buildAndSave(children, 1, "Manuel_EC_9AF_Chapitre1.docx");
