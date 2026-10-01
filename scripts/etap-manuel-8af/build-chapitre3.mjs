// Manuel d'ETAP 8e AF — Chapitre 3 : Les energies renouvelables (champ
// officiel : Metiers du recyclage et des energies renouvelables).
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - ETAP", version definitive
//   du 28 juillet 2024 ("ETAP (3).pdf"), notamment :
//     - p.49-50/77 (programme detaille 8e AF, unite "Les metiers du
//       recyclage et des energies renouvelables en 8e annee du fondamental") :
//       competence ciblee, savoirs/savoir-faire (sources d'energie
//       renouvelables, installations, unites physiques, chaines d'energie,
//       impacts), activites, modalites/criteres.
// Deja lu et verifie integralement a deux reprises pendant les phases
// precedentes de ce projet (preparation du Chapitre 1 de la 7e AF, puis
// Phase 0 ETAP 8e AF) : meme texte, meme pages, aucune divergence. Non
// re-telecharge une troisieme fois (document statique deja capture avec son
// contexte complet) ; les pages restent p.49-50.
//
// Constat important : pour la 8e AF, ce champ officiel bascule ENTIEREMENT
// sur les energies renouvelables (aucun savoir sur le recyclage a ce
// niveau, deja traite en 7e AF) - confirme en Phase 0, non re-suppose ici.
// Le titre "Les energies renouvelables" est donc fidele au contenu reel.
//
// Regle de securite stricte appliquee : aucune activite ne demande a
// l'eleve de manipuler le reseau electrique domestique, une batterie
// endommagee, une installation solaire reelle, ou de realiser un montage
// electrique fonctionnel branche sur une vraie source d'energie. L'activite
// officielle "realiser des circuits electriques alimentes par des sources
// d'energie renouvelables" (p.49) est reprise sous forme de SCHEMA/MAQUETTE
// NON FONCTIONNELLE dessinee sur papier, jamais de montage electrique reel.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_OUTIL_FILL, BOX_OUTIL_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  VERT, CUIVRE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  3,
  "Les énergies renouvelables",
  "Dans beaucoup d'écoles et de foyers haïtiens, l'électricité n'est pas toujours disponible. Le soleil, le " +
  "vent et l'eau peuvent-ils aider à résoudre ce problème ? Ce chapitre t'aide à comprendre comment.",
  [
    "Distinguer une ressource renouvelable d'une ressource non renouvelable.",
    "Identifier plusieurs sources d'énergie renouvelables.",
    "Comprendre comment une installation transforme une source d'énergie en électricité.",
    "Décrire une chaîne d'énergie simple.",
    "Comparer plusieurs sources d'énergie selon leurs avantages et leurs limites.",
    "Proposer une solution énergétique adaptée à un besoin de sa communauté.",
  ],
));

children.push(bodyPar(
  "Situation de départ : L'école de Djenane, dans les hauteurs de Kenscoff, n'est jamais raccordée au réseau " +
  "électrique. Certains soirs, les élèves qui étudient chez eux manquent de lumière. Le comité de l'école se " +
  "demande quelle solution énergétique pourrait être installée, sans savoir laquelle choisir. Ce chapitre va " +
  "t'aider à comprendre les options possibles.",
  { italics: true },
));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Ressource renouvelable — ressource naturelle qui se renouvelle en permanence ou rapidement (soleil, vent, eau)."));
children.push(bulletPar("Ressource non renouvelable — ressource qui existe en quantité limitée et s'épuise (charbon, pétrole)."));
children.push(bulletPar("Installation — ensemble d'équipements qui transforme une source d'énergie en électricité utilisable."));
children.push(bulletPar("Chaîne d'énergie — suite des transformations que subit l'énergie, de sa source jusqu'à son usage final."));
children.push(bulletPar("Impact — conséquence positive ou négative d'une technologie sur l'économie ou l'environnement."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : du recyclage aux énergies renouvelables", "3.1"));
children.push(bodyPar(
  "L'an dernier, tu as étudié le recyclage des objets techniques : comment leur donner une seconde vie plutôt " +
  "que de les jeter. Ce chapitre change de sujet : il porte sur les énergies renouvelables, une autre façon de " +
  "préserver les ressources de la planète, cette fois en produisant de l'électricité autrement.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Ressource renouvelable ou non renouvelable ?", "3.2"));
children.push(bodyPar(
  "Certaines ressources utilisées pour produire de l'énergie se renouvellent naturellement et rapidement : on " +
  "les dit renouvelables. D'autres existent en quantité limitée et finissent par s'épuiser : on les dit non " +
  "renouvelables.",
));

children.push(calloutBox(
  "DÉCOUVRIR — Renouvelable ou non ?",
  [
    "Renouvelables : le soleil, le vent, l'eau, la chaleur de la terre, la matière organique (biomasse).",
    "Non renouvelables : le charbon, le pétrole, et d'autres ressources qui s'épuisent avec leur utilisation.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, VERT,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Découvrir les sources d'énergie renouvelables", "3.3"));
children.push(bodyPar(
  "Le programme officiel identifie plusieurs sources d'énergie renouvelables : l'énergie solaire, l'énergie " +
  "éolienne (le vent), l'énergie hydraulique (l'eau), l'énergie géothermique (la chaleur de la terre), la " +
  "biomasse (matière organique) et l'énergie cinétique des courants marins.",
));

children.push(threeColTable(
  ["Source", "D'où vient l'énergie ?", "Exemple d'usage"],
  [
    ["Solaire", "La lumière et la chaleur du soleil", "Panneau solaire pour l'électricité, four solaire pour cuisiner"],
    ["Éolienne", "Le mouvement du vent", "Éolienne pour produire de l'électricité"],
    ["Hydraulique", "Le mouvement de l'eau", "Barrage ou petite installation sur une rivière"],
    ["Biomasse", "La matière organique (végétaux, déchets)", "Biodigesteur produisant du gaz ou de l'électricité"],
  ],
  [2400, 3400, 3400],
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-01",
  "Une école haïtienne face à un besoin d'électricité",
  "Scène d'ouverture : une école de montagne haïtienne, sans ligne électrique visible, avec des élèves " +
  "étudiant à la lumière du jour, illustrant le besoin qui ouvre le chapitre.",
  "De nombreux besoins d'électricité en Haïti pourraient être couverts par des sources renouvelables.",
  "Ancrer le chapitre dans un besoin réel avant de présenter les solutions techniques.",
  "Illustration pleine largeur, scène scolaire rurale haïtienne, réaliste et paisible.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-02",
  "Panorama des sources d'énergie renouvelables",
  "Quatre vignettes illustrant respectivement le soleil (panneau solaire), le vent (éolienne), l'eau " +
  "(installation hydraulique) et la biomasse (biodigesteur), avec de courtes légendes.",
  "Il existe plusieurs sources d'énergie renouvelables, chacune avec ses propres usages.",
  "Aider l'élève à visualiser et distinguer les différentes sources d'énergie renouvelables.",
  "Illustration en 4 vignettes, pleine largeur, style pédagogique clair.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Des installations qui transforment l'énergie", "3.4"));
children.push(bodyPar(
  "Une installation (solaire, éolienne, hydraulique, ou un four solaire) est un ensemble d'équipements conçu " +
  "pour transformer une source d'énergie renouvelable en électricité ou en chaleur utilisable. Le programme " +
  "officiel demande de savoir représenter ces systèmes par un schéma, un croquis ou une maquette.",
));

children.push(calloutBox(
  "OUTIL — Exemples d'installations",
  [
    "Installation solaire : capte la lumière du soleil pour produire de l'électricité.",
    "Installation éolienne : capte le mouvement du vent pour produire de l'électricité.",
    "Installation hydraulique : capte le mouvement de l'eau pour produire de l'électricité.",
    "Four solaire : concentre la chaleur du soleil pour cuire des aliments, sans électricité.",
  ],
  BOX_OUTIL_FILL, BOX_OUTIL_LINE, "343B42",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-03",
  "Schéma d'une installation solaire simple",
  "Schéma légendé d'un panneau solaire relié à une petite batterie et à une lampe, présenté uniquement comme " +
  "un schéma explicatif (pas un montage réel à reproduire par l'élève).",
  "Une installation solaire transforme la lumière du soleil en électricité utilisable.",
  "Faire comprendre le principe d'une installation solaire simple, de façon uniquement schématique.",
  "Schéma pédagogique, demi-page, légendé, présenté clairement comme non fonctionnel/à but explicatif.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Comprendre une chaîne d'énergie", "3.5"));
children.push(bodyPar(
  "Pour bien comprendre un objet technique utilisant une énergie renouvelable, on peut identifier sa fonction " +
  "d'usage, son fonctionnement, ses impacts, et sa chaîne d'énergie : la suite des transformations que subit " +
  "l'énergie, de sa source jusqu'à son usage final.",
));

children.push(calloutBox(
  "TECHNIQUE — Une chaîne d'énergie simple",
  [
    "1. Source : le soleil (ou le vent, l'eau...).",
    "2. Captage : un panneau solaire (ou une éolienne, une turbine...) capte l'énergie.",
    "3. Transformation : l'énergie captée est transformée en électricité.",
    "4. Usage : l'électricité alimente une lampe, un petit appareil...",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "222B33",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-04",
  "Schéma d'une chaîne d'énergie",
  "Schéma en 4 cases reliées par des flèches : source → captage → transformation → usage, illustré avec " +
  "l'exemple du soleil et d'une lampe.",
  "L'énergie passe par plusieurs étapes avant d'être utilisée.",
  "Fixer visuellement la notion de chaîne d'énergie.",
  "Schéma horizontal, pleine largeur, style pédagogique clair et coloré.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Comparer les sources d'énergie renouvelables", "3.6"));
children.push(bodyPar(
  "Aucune source d'énergie n'est parfaite : chacune a des avantages et des limites, selon la ressource " +
  "disponible, le coût, l'entretien nécessaire et son impact sur l'environnement.",
));

children.push(threeColTable(
  ["Source", "Avantage", "Limite / contrainte"],
  [
    ["Solaire", "Disponible dans la plupart des régions d'Haïti, entretien limité", "Ne fonctionne pas la nuit ni par forte nuage; coût d'achat initial"],
    ["Éolienne", "Fonctionne tant qu'il y a du vent", "Nécessite un vent régulier et suffisant, entretien mécanique"],
    ["Hydraulique", "Peut produire de l'énergie en continu si l'eau est disponible", "Nécessite un cours d'eau adapté, installation plus complexe"],
    ["Biomasse", "Valorise des déchets organiques", "Nécessite une source régulière de matière organique, entretien"],
  ],
  [2200, 3600, 3400],
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Sécurité face à l'énergie", "3.7"));
children.push(calloutBox(
  "SÉCURITÉ",
  [
    "Ne jamais toucher au réseau électrique domestique, à une batterie endommagée ou à une installation " +
    "solaire/éolienne réelle sans la présence et l'autorisation d'un adulte compétent.",
    "Ne jamais tenter de construire un montage électrique fonctionnel raccordé à une vraie source d'énergie.",
    "Les schémas et maquettes réalisés en classe sont uniquement des représentations, jamais des installations réelles.",
    "Signaler tout équipement électrique endommagé à un adulte responsable, sans y toucher.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Choisir une solution énergétique pour sa communauté", "3.8"));
children.push(bodyPar(
  "Choisir une source d'énergie renouvelable pour une communauté demande de comparer les solutions selon les " +
  "besoins réels et les ressources disponibles localement. Une solution adaptée à une région côtière " +
  "venteuse ne conviendra pas forcément à une région de montagne peu venteuse mais ensoleillée.",
));

children.push(calloutBox(
  "ENVIRONNEMENT — Choisir en fonction des ressources locales",
  [
    "Quelle ressource (soleil, vent, eau, biomasse) est réellement disponible dans la région ?",
    "Quel est le besoin réel (éclairage, recharge d'appareils, activité productive) ?",
    "Quel entretien la communauté peut-elle assurer dans la durée ?",
  ],
  BOX_ENVIRONNEMENT_FILL, BOX_ENVIRONNEMENT_LINE, "1E4D3B",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Situation-problème : quelle solution pour l'école de Djenane ?", "3.9"));
children.push(bodyPar(
  "Reprenons la situation présentée au début du chapitre. L'école de Djenane, à Kenscoff, est en altitude, " +
  "assez ensoleillée mais aussi souvent venteuse ; aucun cours d'eau important n'est à proximité.",
));
children.push(numberedPar("1. Quelle(s) source(s) d'énergie renouvelable semble(nt) la mieux adaptée(s) à cette situation ? Justifie ta réponse."));
children.push(numberedPar("2. Quel besoin précis cette solution devrait-elle satisfaire en priorité ?"));
children.push(numberedPar("3. Quelle limite ou contrainte faudrait-il anticiper avant d'installer cette solution ?"));
children.push(numberedPar("4. Quelle règle de sécurité faudrait-il rappeler aux élèves de cette école une fois l'installation en place ?"));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Activité pratique — Comparer des solutions énergétiques"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Analyser un besoin énergétique simple et comparer plusieurs sources d'énergie renouvelables selon des critères accessibles." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Cahier, crayon, règle. Aucun matériel électrique réel n'est nécessaire." }]));
children.push(mixedPar([{ text: "ORGANISATION : ", bold: true }, { text: "Groupes de 3 à 4 élèves." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisissez un lieu (votre école, votre quartier) et un besoin énergétique simple (éclairage, recharge d'un petit appareil)." }]));
children.push(bodyPar("ÉTAPES :", { bold: true }));
children.push(numberedPar("1. Identifiez le besoin énergétique précis à satisfaire."));
children.push(numberedPar("2. Listez les ressources (soleil, vent, eau, biomasse) réellement disponibles dans ce lieu."));
children.push(numberedPar("3. Complétez la fiche comparative ci-dessous."));
children.push(numberedPar("4. Choisissez la solution qui vous semble la plus adaptée et justifiez votre choix."));
children.push(spacer(80));

children.push(bodyPar("OBSERVATIONS — Fiche comparative :", { bold: true }));
children.push(threeColTable(
  ["Source envisagée", "Ressource disponible ? (oui/non)", "Avantage principal pour ce besoin"],
  [
    ["Solaire", "", ""],
    ["Éolienne", "", ""],
    ["Hydraulique", "", ""],
  ],
  [3000, 3200, 3200],
));
children.push(spacer(120));

children.push(bodyPar("QUESTIONS D'ANALYSE :", { bold: true }));
children.push(numberedPar("1. Quelle solution avez-vous choisie, et pourquoi ?"));
children.push(numberedPar("2. Quelle serait la principale limite de votre solution choisie ?"));
children.push(spacer(80));

children.push(mixedPar([{ text: "CONCLUSION : ", bold: true }, { text: "Présentez votre choix à la classe en expliquant les critères qui ont guidé votre décision." }]));
children.push(spacer(80));

children.push(calloutBox(
  "RÈGLES DE SÉCURITÉ pour cette activité",
  [
    "Cette activité se réalise entièrement par écrit, sans aucun matériel électrique.",
    "Aucune installation réelle n'est manipulée ni construite.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "7A2A0E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-05",
  "Comparer des solutions énergétiques en classe",
  "Un groupe d'élèves de 8e AF, en classe, complétant une fiche comparative de sources d'énergie sur papier, " +
  "sans matériel électrique visible.",
  "Comparer des solutions énergétiques peut se faire entièrement par écrit, en toute sécurité.",
  "Illustrer concrètement le déroulement de l'activité pratique du chapitre.",
  "Illustration pleine largeur, scène de classe haïtienne, ambiance studieuse et collaborative.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Activité d'observation / analyse — Un schéma de chaîne d'énergie"));
children.push(bodyPar(
  "Choisis une source d'énergie renouvelable étudiée dans ce chapitre et dessine, sur ton cahier, sa chaîne " +
  "d'énergie en 4 étapes (source → captage → transformation → usage), en t'inspirant du schéma de la section " +
  "3.5. Ce schéma reste une représentation sur papier, jamais un montage réel.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Une ressource renouvelable se renouvelle naturellement (soleil, vent, eau...) ; une ressource non renouvelable s'épuise.",
    "Les principales sources d'énergie renouvelables sont : solaire, éolienne, hydraulique, géothermique, biomasse, courants marins.",
    "Une installation transforme une source d'énergie renouvelable en électricité ou en chaleur utilisable.",
    "Une chaîne d'énergie suit plusieurs étapes : source, captage, transformation, usage.",
    "Chaque source d'énergie a des avantages et des limites, selon la ressource disponible, le coût et l'entretien.",
    "Le choix d'une solution énergétique doit tenir compte des ressources réellement disponibles localement.",
    "Aucune installation électrique réelle ne doit être manipulée sans un adulte compétent.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, VERT,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Distinguer une ressource renouvelable d'une ressource non renouvelable.",
    "☐ Citer au moins trois sources d'énergie renouvelables.",
    "☐ Expliquer ce qu'est une installation transformant une énergie renouvelable.",
    "☐ Décrire une chaîne d'énergie en 4 étapes.",
    "☐ Comparer deux sources d'énergie selon leurs avantages et leurs limites.",
    "☐ Proposer une solution énergétique adaptée à un besoin et à des ressources données.",
    "☐ Citer une règle de sécurité liée à l'énergie électrique.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : ressource renouvelable/non renouvelable, sources d'énergie renouvelables, " +
    "installation, chaîne d'énergie, impact économique/environnemental.",
    "Vocabulaire clé à maîtriser : solaire, éolienne, hydraulique, géothermique, biomasse, captage, transformation.",
    "Avant l'évaluation, vérifie que tu peux : citer 3 sources d'énergie renouvelables avec un exemple d'usage " +
    "chacune ; décrire une chaîne d'énergie ; comparer deux sources selon un critère donné (coût, disponibilité, entretien).",
    "Question rapide de vérification : pour ton lieu de vie, quelle source d'énergie renouvelable te semble la " +
    "plus adaptée, et pourquoi ?",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(3));

children.push(subHeading("Exercice A — Compléter"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre des mots est mélangé) : " +
  "éolienne · chaîne d'énergie · renouvelable · biomasse · installation · non renouvelable · hydraulique · impact.",
  { italics: true },
));
children.push(numberedPar("1. Une ressource qui se renouvelle naturellement, comme le soleil, est dite ......................"));
children.push(numberedPar("2. Une ressource qui s'épuise avec l'utilisation, comme le pétrole, est dite ......................"));
children.push(numberedPar("3. Une source d'énergie qui utilise le mouvement du vent s'appelle l'énergie ......................"));
children.push(numberedPar("4. Une source d'énergie qui utilise le mouvement de l'eau s'appelle l'énergie ......................"));
children.push(numberedPar("5. Une source d'énergie qui valorise la matière organique s'appelle la ......................"));
children.push(numberedPar("6. Un ensemble d'équipements qui transforme une source d'énergie en électricité est une ......................"));
children.push(numberedPar("7. La suite des transformations de l'énergie, de sa source à son usage, s'appelle une ......................"));
children.push(numberedPar("8. Une conséquence positive ou négative d'une technologie sur l'environnement est un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — QCM"));
children.push(numberedPar("1. Laquelle de ces ressources est renouvelable ?"));
children.push(bulletPar("a) le pétrole"));
children.push(bulletPar("b) le soleil"));
children.push(bulletPar("c) le charbon"));
children.push(spacer(60));
children.push(numberedPar("2. Un four solaire permet de :"));
children.push(bulletPar("a) produire de l'électricité uniquement"));
children.push(bulletPar("b) concentrer la chaleur du soleil pour cuire des aliments"));
children.push(bulletPar("c) capter le vent"));
children.push(spacer(60));
children.push(numberedPar("3. Dans une chaîne d'énergie solaire simple, quelle est la première étape ?"));
children.push(bulletPar("a) l'usage (allumer une lampe)"));
children.push(bulletPar("b) la source (le soleil)"));
children.push(bulletPar("c) la transformation"));
children.push(spacer(60));
children.push(numberedPar("4. Une limite de l'énergie éolienne est que :"));
children.push(bulletPar("a) elle nécessite un vent régulier et suffisant"));
children.push(bulletPar("b) elle fonctionne uniquement la nuit"));
children.push(bulletPar("c) elle n'a aucune limite"));
children.push(spacer(60));
children.push(numberedPar("5. Que faut-il faire face à une installation électrique endommagée ?"));
children.push(bulletPar("a) essayer de la réparer soi-même"));
children.push(bulletPar("b) la signaler à un adulte responsable sans y toucher"));
children.push(bulletPar("c) l'ignorer"));
children.push(spacer(200));

children.push(subHeading("Exercice C — Relier"));
children.push(bodyPar(
  "Relie chaque source d'énergie de la colonne A à son origine dans la colonne B (une seule bonne réponse par terme).",
  { italics: true },
));
children.push(twoColTable(
  "Colonne A", "Colonne B",
  [
    ["1. Énergie solaire", "a. Le mouvement de l'eau."],
    ["2. Énergie éolienne", "b. La chaleur de la terre."],
    ["3. Énergie hydraulique", "c. La lumière et la chaleur du soleil."],
    ["4. Biomasse", "d. Le mouvement du vent."],
    ["5. Énergie géothermique", "e. La matière organique (végétaux, déchets)."],
  ],
));
children.push(spacer(200));

children.push(subHeading("Exercice D — Réflexion / application"));
children.push(numberedPar("1. Ta commune connaît des coupures d'électricité fréquentes. Propose une source d'énergie renouvelable adaptée, en tenant compte des ressources disponibles chez toi, et justifie ton choix."));
children.push(numberedPar("2. Explique, avec tes propres mots, pourquoi aucune source d'énergie renouvelable n'est parfaite."));
children.push(numberedPar("3. Un camarade affirme qu'une fois un panneau solaire installé, l'électricité est gratuite et sans aucune limite. Que lui réponds-tu ?"));
children.push(numberedPar("4. Décris, en une phrase pour chaque étape, la chaîne d'énergie d'une éolienne qui alimente une lampe."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de distinguer les ressources renouvelables des ressources non renouvelables, et de " +
  "découvrir plusieurs sources d'énergie renouvelables : solaire, éolienne, hydraulique, géothermique et " +
  "biomasse. Tu as appris comment une installation transforme ces sources en électricité utilisable, à " +
  "travers une chaîne d'énergie en plusieurs étapes. Tu as aussi comparé ces sources selon leurs avantages et " +
  "leurs limites, et réfléchi à la manière de choisir une solution énergétique adaptée aux ressources " +
  "réellement disponibles dans une communauté, tout en respectant des règles de sécurité strictes face à " +
  "l'électricité. Ces notions te préparent à comprendre, dans le prochain chapitre, comment concevoir des " +
  "solutions techniques pour l'agriculture.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "ressource renouvelable/non renouvelable · énergie solaire/éolienne/hydraulique/géothermique/biomasse · " +
  "installation · chaîne d'énergie · impact · sécurité électrique.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-06",
  "Ce qu'il ne faut jamais faire face à l'électricité",
  "Illustration claire montrant un élève qui s'éloigne prudemment d'une installation électrique endommagée et " +
  "va prévenir un adulte, avec une légende explicite sur la conduite à tenir.",
  "La sécurité face à l'électricité passe par des règles simples et claires.",
  "Ancrer visuellement les règles de sécurité du chapitre.",
  "Illustration demi-page, ton pédagogique clair, sans dramatisation excessive.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-07",
  "Comparer les sources d'énergie",
  "Tableau visuel comparant les quatre principales sources d'énergie renouvelables (solaire, éolienne, " +
  "hydraulique, biomasse) selon disponibilité, coût approximatif et entretien.",
  "Comparer plusieurs sources aide à choisir la solution la plus adaptée à une situation donnée.",
  "Synthétiser visuellement la comparaison déjà présentée en section 3.6.",
  "Illustration pleine largeur, tableau visuel coloré, cohérent avec la charte ETAP.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-ETAP-8AF-C03-08",
  "Carte mentale de synthèse du chapitre",
  "Une carte mentale simple centrée sur « Les énergies renouvelables », avec des branches vers : sources, " +
  "installations, chaîne d'énergie, comparaison, sécurité, choix pour la communauté.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation.",
  "Illustration pleine largeur, style carte mentale colorée, sobre.",
));

await buildAndSave(children, 28, "Manuel_ETAP_8AF_Chapitre3.docx");
