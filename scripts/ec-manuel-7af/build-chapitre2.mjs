// Manuel d'EC 7e AF — Chapitre 2 : Citoyenne, citoyen : mes droits, mes devoirs
// (Unité 2 — La citoyenne, le citoyen, la citoyenneté et l'État, des droits
// et des devoirs, Compétences C1, C2, C3).
//
// Prolonge le Chapitre 1 (déjà finalisé, NON modifié ici) : pagination
// continue à partir de la page 12 (Chapitre 1 = pages 1-11).
//
// Contenu construit à partir des livrables verrouillés de la Collection EC,
// eux-mêmes vérifiés en direct sur le document source :
//   MENFP/DEF, "Programme du 3e cycle (7e à 9e AF) - Éducation à la
//   Citoyenneté", version définitive du 28 juillet 2024 ("EC.pdf").
//   - p.34-35 : Unité 2, colonne 7e AF explicitement séparée par année
//     (`09_TABLE_MATIERES_PROPOSEE_EC_7AF.md`, verrouillée sans changement
//     dans `19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md`) : "droits et devoirs
//     fondamentaux (Constitution, DUDH) ; l'éthique citoyenne ; droits et
//     devoirs de l'État et du citoyen ; participation active à la vie de la
//     cité."
//   - `05_MATRICE_COMPETENCES_UNITES_EC.md`, Unité 2 : savoirs/savoir-faire
//     cités verbatim : "maîtriser le vocabulaire et la syntaxe du texte
//     constitutionnel et des textes internationaux ; maîtriser le
//     vocabulaire politique de base (démocratie, république, constitution,
//     loi, liberté, État, gouvernement, institutions, suffrage universel) ;
//     définir citoyen/nationalité ; connaître les principaux droits (textes
//     nationaux/internationaux) et distinguer principe du droit et exercice
//     effectif." Activité officielle citée verbatim : "à partir de constats
//     réels (marginalisation, accès à l'eau, au logement, à l'emploi),
//     sensibilisation de l'entourage et actions concrètes." Évaluation
//     officielle citée verbatim : "rédiger une étude sur la violation des
//     droits sociaux des citoyens de Cité Soleil... et un argumentaire avec
//     recommandations aux autorités." [OFFICIEL — exemple géographique
//     nommé explicitement par la source elle-même, non un choix éditorial
//     de ce projet].
//   - Compétences C1, C2, C3 toutes mobilisées par cette unité (tableau
//     croisé compétences × unités, `05_MATRICE_COMPETENCES_UNITES_EC.md`).
//
// TRAITEMENT DE L'EXEMPLE « CITÉ SOLEIL » (transparence éditoriale) :
// l'exemple est repris car nommé explicitement par le programme MENFP
// lui-même — il n'est pas ajouté par choix éditorial. Il est traité ici de
// façon factuelle et respectueuse, centré sur les DROITS SOCIAUX en jeu
// (accès à l'eau, au logement, à l'emploi) et sur les réponses citoyennes
// possibles (sensibilisation, argumentaire, recommandations), sans détail
// invraisemblable, sans référence à la violence ou à l'insécurité (hors
// périmètre de cette unité), et sans stigmatiser les habitants : la
// consigne officielle porte sur l'analyse d'une situation de droits, pas
// sur un jugement de valeur envers une population.
//
// STATUT DES TEXTES DE RÉFÉRENCE (transparence, section 3/9 du prompt) :
// aucun article précis de la Constitution haïtienne de 1987 ni de la
// Déclaration universelle des droits de l'homme (DUDH) n'est cité mot pour
// mot dans ce chapitre : leur contenu est résumé pédagogiquement
// [ADAPTATION PÉDAGOGIQUE], et deux emplacements DOC sont réservés,
// marqués [SOURCE À VÉRIFIER], pour de futurs extraits exacts et vérifiés.
//
// CONTRÔLE DE LA PROGRESSION (continuité avec le Chapitre 1, section 4 du
// prompt) : le Chapitre 1 a construit les notions de nation, d'identité et
// de citoyenneté au sens large (appartenance). Ce Chapitre 2 approfondit
// spécifiquement la CITOYENNETÉ JURIDIQUE : ce que sont un droit et un
// devoir, le vocabulaire politique de base, et la distinction entre
// citoyen et nationalité — sans reprendre le contenu déjà traité (symboles
// nationaux, organisation territoriale, patrimoine). Aucun contenu réservé
// au Chapitre 3 (fonctionnement de l'État démocratique, élections) n'est
// anticipé ici : seule la notion de suffrage universel est nommée, à titre
// de vocabulaire, sans développement du fonctionnement électoral.
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
  "Citoyenne, citoyen : mes droits, mes devoirs",
  "Le droit d'aller à l'école. Le devoir de respecter le règlement. Le droit d'être protégé. Le devoir de " +
  "respecter les autres. Chaque jour, sans toujours t'en rendre compte, tu exerces déjà des droits et des " +
  "devoirs. Ce chapitre te donne les mots et les repères pour les nommer, les comprendre et les faire " +
  "respecter.",
  [
    "Distinguer un droit d'un devoir, et un citoyen d'une nationalité.",
    "Maîtriser le vocabulaire politique de base : démocratie, république, constitution, loi, liberté, État, " +
    "gouvernement, institution, suffrage universel.",
    "Connaître les principaux droits reconnus par les textes nationaux et internationaux.",
    "Distinguer le principe d'un droit de son exercice réellement effectif.",
    "Analyser une situation réelle de droits sociaux non pleinement respectés.",
    "Proposer une action citoyenne de sensibilisation face à une situation de droits.",
  ],
));

children.push(calloutBox(
  "SITUATION RÉELLE — Une règle de classe, un droit constitutionnel",
  [
    "Dans une école haïtienne, le règlement de classe affirme : « Chaque élève a le droit de s'exprimer et le " +
    "devoir d'écouter les autres. » Une élève remarque : « Ça ressemble à ce qu'on dit pour tout le pays, non " +
    "? » Ce chapitre part de cette intuition : une règle de classe et un texte constitutionnel partagent la " +
    "même logique — des droits, accompagnés de devoirs.",
  ],
  BOX_SITUATION_FILL, BOX_SITUATION_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(subHeading("Prérequis issus du Chapitre 1"));
children.push(bodyPar(
  "Au Chapitre 1, tu as découvert ce qu'est une nation, les symboles qui la représentent et la notion de " +
  "citoyenneté comme appartenance à un pays. Ce chapitre reprend ce dernier mot — citoyenneté — pour " +
  "l'approfondir sous un angle nouveau : non plus l'appartenance, mais les droits et les devoirs concrets " +
  "qu'elle implique.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Droit — ce qu'une personne est autorisée à faire, à recevoir ou à voir respecter, reconnu par la loi ou par un texte fondamental."));
children.push(bulletPar("Devoir — ce qu'une personne est tenue de faire ou de respecter envers les autres ou envers l'État."));
children.push(bulletPar("Citoyen — personne reconnue comme membre à part entière d'un État, avec des droits et des devoirs civiques et politiques."));
children.push(bulletPar("Nationalité — lien juridique qui rattache une personne à un État ; elle ne se confond pas toujours avec la citoyenneté active."));
children.push(bulletPar("Constitution — texte fondamental qui organise un État et fixe les droits et devoirs de ses citoyens."));
children.push(bulletPar("Loi — règle écrite, adoptée selon une procédure officielle, qui s'applique à tous dans un État."));
children.push(bulletPar("Démocratie — système politique dans lequel le pouvoir appartient au peuple, exercé directement ou par des représentants."));
children.push(bulletPar("République — forme d'État dans laquelle le pouvoir n'appartient à personne à titre héréditaire, mais à des institutions et des représentants."));
children.push(bulletPar("Liberté — possibilité reconnue à une personne d'agir, de penser ou de s'exprimer sans entrave injustifiée."));
children.push(bulletPar("Gouvernement / institution — organes chargés de diriger l'État et d'assurer le fonctionnement de ses services."));
children.push(bulletPar("Suffrage universel — droit de vote reconnu à l'ensemble des citoyennes et citoyens remplissant les conditions légales."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Droit et devoir : deux notions liées", "2.1"));
children.push(bodyPar(
  "Un droit et un devoir fonctionnent souvent ensemble. Le droit d'un citoyen correspond fréquemment au devoir " +
  "d'un autre — ou de l'État lui-même — de le respecter. À l'inverse, exercer pleinement ses droits suppose " +
  "généralement d'assumer certains devoirs envers la collectivité.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Des exemples du quotidien",
  [
    "Droit à l'éducation → devoir de l'État d'organiser des écoles ; devoir de l'élève de fréquenter l'école " +
    "et de respecter son fonctionnement.",
    "Droit à la sécurité → devoir des institutions de protéger la population ; devoir du citoyen de respecter " +
    "les règles communes.",
    "Droit de s'exprimer → devoir de respecter l'expression et l'écoute des autres.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C02-01",
  "Ouverture — Le règlement de classe affiché",
  "Une salle de classe haïtienne crédible, avec un règlement de classe affiché au mur mentionnant droits et " +
  "devoirs des élèves, dans un style illustratif cohérent avec la charte EC.",
  "Une règle simple du quotidien peut illustrer la même logique qu'un texte fondamental.",
  "Ancrer l'ouverture du chapitre dans une scène scolaire concrète et reconnaissable.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Citoyen ou nationalité : quelle différence ?", "2.2"));
children.push(bodyPar(
  "Ces deux mots sont proches, mais ne signifient pas exactement la même chose. La nationalité est un lien " +
  "juridique qui rattache une personne à un État — elle peut l'avoir de naissance ou l'acquérir. La " +
  "citoyenneté, elle, insiste davantage sur le rôle actif : participer à la vie collective, exercer ses " +
  "droits, assumer ses devoirs.",
));
children.push(bodyPar(
  "Une personne peut avoir la nationalité haïtienne sans, pour autant, exercer pleinement sa citoyenneté au " +
  "quotidien — par exemple si elle ne connaît pas encore ses droits, ou n'a pas encore l'âge de voter. C'est " +
  "justement ce que cette collection t'aide à construire, année après année.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le vocabulaire politique de base", "2.3"));
children.push(bodyPar(
  "Comprendre la citoyenneté suppose de maîtriser quelques mots clés, que tu retrouveras tout au long de la " +
  "collection : démocratie, république, constitution, loi, liberté, État, gouvernement, institution, suffrage " +
  "universel.",
));
children.push(threeColTable(
  ["Mot", "Explication simple", "Exemple ou remarque"],
  [
    ["État", "Organisation politique qui exerce l'autorité sur un territoire et une population", "Haïti est un État"],
    ["Gouvernement", "Ensemble des personnes qui dirigent l'État à un moment donné", "Change selon les élections"],
    ["Institution", "Organe chargé d'une mission publique précise (justice, éducation, santé...)", "Une école publique est une institution"],
    ["Loi", "Règle écrite qui s'applique à tous, adoptée selon une procédure officielle", "Doit être respectée par chacun"],
    ["Suffrage universel", "Droit de vote reconnu à l'ensemble des citoyens remplissant les conditions légales", "Vocabulaire à connaître, sans développement électoral ici"],
  ],
  [2400, 3700, 2900],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Les principaux droits : textes nationaux et internationaux", "2.4"));
children.push(bodyPar(
  "Les droits des citoyens ne sont pas inventés au hasard : ils sont inscrits dans des textes précis, à " +
  "l'échelle nationale et internationale. En Haïti, la Constitution reconnaît des droits fondamentaux. À " +
  "l'échelle internationale, la Déclaration universelle des droits de l'homme (DUDH), adoptée en 1948, " +
  "reconnaît des droits communs à tous les êtres humains.",
));
children.push(calloutBox(
  "TEXTE DE RÉFÉRENCE — Extraits à vérifier",
  [
    "DOC-EC-7AF-C02-01 — Emplacement réservé pour un extrait exact et vérifié de la Constitution haïtienne de " +
    "1987 sur les droits et devoirs fondamentaux du citoyen.",
    "DOC-EC-7AF-C02-02 — Emplacement réservé pour un extrait exact et vérifié de la Déclaration universelle " +
    "des droits de l'homme (DUDH, 1948), notamment sur les droits sociaux (niveau de vie, logement, travail).",
    "Statut : [SOURCE À VÉRIFIER] pour les deux emplacements — aucune formulation exacte n'est reproduite ici " +
    "tant qu'elle n'a pas été confirmée auprès d'une source institutionnelle vérifiable.",
  ],
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Connaître un droit en principe ne signifie pas qu'il est toujours exercé dans la réalité. C'est une " +
  "distinction importante : entre ce que dit le texte, et ce qui se passe réellement pour chaque personne.",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C02-02",
  "Exemple analysé — principe du droit et exercice effectif",
  "Un schéma en deux colonnes : « Ce que dit le texte » (une icône de document officiel) et « Ce qui se passe " +
  "en réalité » (une icône de situation concrète), reliées par une flèche interrogative.",
  "Un droit reconnu par un texte n'est pas toujours pleinement exercé dans la vie réelle.",
  "Rendre visible la distinction entre principe du droit et exercice effectif.",
  "Illustration demi-page, schéma en deux colonnes, cohérent avec la charte EC.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("L'éthique citoyenne et la participation à la vie de la cité", "2.5"));
children.push(bodyPar(
  "Avoir des droits et des devoirs ne suffit pas : encore faut-il agir en conséquence. L'éthique citoyenne, " +
  "c'est cette capacité à se comporter de façon responsable envers les autres et envers la collectivité — " +
  "à l'école, dans le quartier, dans la commune.",
));
children.push(bodyPar(
  "Participer activement à la vie de la cité, ce n'est pas réservé aux adultes : cela commence par de petites " +
  "actions accessibles dès la 7e AF — s'informer, sensibiliser son entourage, proposer une amélioration " +
  "concrète.",
));
children.push(spacer(200));

children.push(calloutBox(
  "ÉTUDE DE CAS — Droits sociaux et vie quotidienne",
  [
    "Dans plusieurs quartiers d'Haïti — le programme officiel cite notamment Cité Soleil, à Port-au-Prince — " +
    "l'accès à l'eau potable, au logement décent ou à l'emploi reste difficile pour de nombreuses familles, " +
    "alors que ces droits sociaux sont reconnus par les textes nationaux et internationaux.",
    "1. Quels droits sociaux sont concernés dans cette situation ?",
    "2. En quoi peut-on dire qu'il existe un écart entre le principe du droit et son exercice effectif ?",
    "3. À qui revient, selon toi, la responsabilité d'agir face à cette situation : seulement à l'État, " +
    "seulement aux habitants, ou aux deux ? Justifie ta réponse.",
  ],
  BOX_ETUDECAS_FILL, BOX_ETUDECAS_LINE, ANTHRACITE,
));
children.push(spacer(160));
children.push(bodyPar(
  "Cette étude de cas porte sur des droits, pas sur un jugement des personnes qui vivent cette situation : " +
  "l'objectif est de comprendre un problème social réel et de réfléchir à des réponses citoyennes possibles, " +
  "avec respect.",
  { italics: true },
));
children.push(spacer(200));

children.push(calloutBox(
  "DÉBAT RAISONNÉ — Qui est responsable quand un droit n'est pas exercé ?",
  [
    "Certains pensent que c'est d'abord à l'État de garantir les droits sociaux. D'autres pensent que la " +
    "solidarité citoyenne et l'action locale comptent tout autant. D'autres encore pensent que les deux sont " +
    "indispensables ensemble.",
    "Règles du débat : chacun présente un argument à la fois ; on écoute sans couper la parole ; on peut " +
    "changer d'avis si un argument te convainc ; aucune position n'est ridiculisée.",
    "À la fin du débat, formule une position personnelle qui tient compte des arguments échangés en classe.",
  ],
  BOX_DEBAT_FILL, BOX_DEBAT_LINE, ANTHRACITE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité citoyenne — Sensibiliser autour d'un droit social"));
children.push(calloutBox(
  "ACTIVITÉ CITOYENNE",
  [
    "OBJECTIF : À partir d'un constat réel observé dans ton quartier ou ta commune (accès à l'eau, au " +
    "logement, à l'emploi, ou tout autre droit social), proposer une action de sensibilisation de ton " +
    "entourage. [OFFICIEL — activité prévue par le programme]",
    "CONSIGNES : Choisis un droit social et une situation concrète que tu connais ou peux observer. Identifie " +
    "au moins une personne ou un groupe que tu pourrais sensibiliser (famille, camarades, voisins).",
    "ÉTAPES : 1. Décrire la situation observée. 2. Identifier le droit social concerné. 3. Préparer un court " +
    "message de sensibilisation (affiche, texte oral, dessin). 4. Le présenter à un groupe réel ou simulé en " +
    "classe.",
    "RÉSULTAT ATTENDU : Un message de sensibilisation clair, reliant une situation réelle à un droit précis, " +
    "présenté de façon respectueuse et constructive.",
  ],
  BOX_ACTIVITECIT_FILL, BOX_ACTIVITECIT_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Projet du cycle — Poursuivre glossaire et répertoire de textes"));
children.push(calloutBox(
  "PROJET",
  [
    "Poursuis le glossaire illustré collaboratif lancé au Chapitre 1 : ajoute au moins cinq nouveaux mots de " +
    "ce chapitre (droit, devoir, citoyen, constitution, démocratie...), illustrés et expliqués avec tes " +
    "propres mots.",
    "Commence aussi le répertoire de textes sur les droits et devoirs, prévu par le programme officiel : note " +
    "les références des textes utiles rencontrés cette année (Constitution, DUDH), même sans en reproduire le " +
    "contenu exact. [OFFICIEL — dispositif transversal de la Collection EC]",
  ],
  BOX_PROJET_FILL, BOX_PROJET_LINE, ANTHRACITE,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EC-7AF-C02-03",
  "Espace de production — mon répertoire de textes",
  "Un cadre vide, format portrait, structuré en un tableau à trois colonnes (Nom du texte / Ce qu'il protège / " +
  "Ma remarque), prévu pour que l'élève y commence son répertoire directement dans le manuel.",
  "Offrir un espace direct de production pour lancer le répertoire de textes sur les droits et devoirs.",
  "Espace de production dédié, conforme à la charte EC.",
  "Cadre simple, bordure fine or citoyen, tableau à trois colonnes, format portrait demi-page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Un droit et un devoir fonctionnent souvent ensemble : le droit de l'un correspond souvent au devoir d'un " +
    "autre, ou de l'État.",
    "La nationalité est un lien juridique avec un État ; la citoyenneté insiste sur le rôle actif du citoyen.",
    "Le vocabulaire politique de base (État, gouvernement, institution, loi, suffrage universel...) permet de " +
    "comprendre l'organisation d'un pays.",
    "Les droits sont reconnus par des textes nationaux (Constitution) et internationaux (DUDH), mais leur " +
    "exercice effectif n'est pas toujours garanti dans la réalité.",
    "L'éthique citoyenne se manifeste par des actions concrètes de participation à la vie de la cité, " +
    "accessibles dès la 7e AF.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, BLEU_CIVIQUE,
));
children.push(spacer(200));

children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de distinguer droit et devoir, citoyen et nationalité, de découvrir le vocabulaire " +
  "politique de base, et de comprendre que les droits reconnus par les textes ne sont pas toujours pleinement " +
  "exercés dans la réalité — comme le montre l'exemple des droits sociaux dans certains quartiers d'Haïti. Il " +
  "a aussi permis de s'exercer à une première action citoyenne de sensibilisation, et de poursuivre le " +
  "glossaire et le répertoire de textes lancés au Chapitre 1.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "droit · devoir · citoyen · nationalité · constitution · loi · démocratie · république · liberté · " +
  "institution · suffrage universel.",
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer la différence entre un droit et un devoir.",
    "☐ Expliquer la différence entre citoyen et nationalité.",
    "☐ Utiliser correctement au moins cinq mots du vocabulaire politique de base.",
    "☐ Citer un droit reconnu par un texte national ou international.",
    "☐ Expliquer la différence entre le principe d'un droit et son exercice effectif.",
    "☐ Décrire une action citoyenne de sensibilisation face à une situation de droits sociaux.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : droit, devoir, citoyen, nationalité, vocabulaire politique de base, principe du " +
    "droit / exercice effectif, éthique citoyenne.",
    "Vocabulaire clé à maîtriser : droit, devoir, constitution, loi, démocratie, institution, suffrage " +
    "universel.",
    "Avant l'évaluation, vérifie que tu peux : distinguer droit et devoir ; citer des droits reconnus par un " +
    "texte national ou international ; analyser une situation réelle de droits sociaux et proposer une " +
    "réponse citoyenne argumentée.",
    "Rappel officiel : l'évaluation attendue pour cette unité porte sur l'étude d'une situation réelle de " +
    "droits sociaux non pleinement exercés, avec un argumentaire et des recommandations aux autorités " +
    "[OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(2));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : droit · " +
  "devoir · citoyen · constitution · démocratie.",
  { italics: true },
));
children.push(numberedPar("1. Ce qu'une personne est autorisée à faire ou à voir respecté s'appelle un ......................"));
children.push(numberedPar("2. Ce qu'une personne est tenue de faire envers les autres s'appelle un ......................"));
children.push(numberedPar("3. Le texte fondamental qui organise un État et fixe les droits/devoirs s'appelle la ......................"));
children.push(numberedPar("4. Une personne reconnue comme membre actif d'un État, avec des droits et des devoirs, est une ......................"));
children.push(numberedPar("5. Le système politique dans lequel le pouvoir appartient au peuple s'appelle une ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation/analyse de situation"));
children.push(numberedPar("1. Associe chaque droit à un devoir correspondant : (a) droit à l'éducation, (b) droit à la sécurité, (c) droit de s'exprimer — avec : (1) devoir de respecter l'écoute d'autrui, (2) devoir de fréquenter et respecter l'école, (3) devoir de respecter les règles communes."));
children.push(numberedPar("2. Vrai ou faux, en justifiant ta réponse : « Avoir la nationalité haïtienne signifie automatiquement exercer pleinement sa citoyenneté au quotidien. »"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application/argumentation courte"));
children.push(numberedPar("1. Explique, avec un exemple de ton quotidien, la différence entre le principe d'un droit et son exercice effectif."));
children.push(numberedPar("2. Pourquoi le vocabulaire politique de base (État, gouvernement, institution...) est-il utile pour comprendre la citoyenneté ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification / proposition d'action"));
children.push(numberedPar("1. Reprends l'étude de cas sur les droits sociaux (accès à l'eau, au logement, à l'emploi). Rédige un court argumentaire avec au moins une recommandation adressée aux autorités."));
children.push(numberedPar("2. Propose une action concrète de sensibilisation que tu pourrais réaliser, à ton échelle, face à une situation de droit social non pleinement exercé."));
children.push(numberedPar("3. Un camarade affirme : « Si un droit n'est pas respecté quelque part, ce n'est pas mon problème. » Que lui réponds-tu, en t'appuyant sur ce que tu as appris dans ce chapitre ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(illustrationBox(
  "ILL-EC-7AF-C02-04",
  "Synthèse — Mes droits, mes devoirs",
  "Une carte mentale simple centrée sur « Citoyen : droits et devoirs », avec des branches vers : droit/devoir, " +
  "citoyen/nationalité, vocabulaire politique, textes de référence, éthique citoyenne.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EC.",
));

await buildAndSave(children, 12, "Manuel_EC_7AF_Chapitre2.docx");
