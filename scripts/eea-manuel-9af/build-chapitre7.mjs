// Manuel d'EEA 9e AF — Chapitre 7 : Produire sa musique aujourd'hui
// (champ officiel : Musique, Axes 4-5 — MAO + Appréciation musicale,
// regroupés [CHOIX ÉDITORIAL] en un seul chapitre — même logique que le
// Chapitre 7 de la 7e AF, qui regroupait déjà ces deux axes à un niveau
// d'introduction).
//
// DERNIER CHAPITRE PEDAGOGIQUE DE L'ARCHITECTURE VERROUILLEE (7/7) —
// n'entame PAS la Phase Finale (corriges, glossaire, references,
// assemblage, illustrations), strictement reservee a un futur prompt
// maitre distinct.
//
// Contenu construit a partir du document source verifie :
//   MENFP/DEF, "Programme du 3e cycle (7e a 9e AF) - EEA", version definitive
//   du 28 juillet 2024 ("EEA.pdf").
//   - p.57-58/63 : TABLEAU DE PROGRESSION explicitement separe par annee
//     (7e/8e/9e AF) pour les axes MAO et Appreciation musicale — verifie en
//     direct le 2026-08-23. Colonne 9e AF, MAO, citee verbatim :
//     "Renforcement des acquis des deux annees precedentes. L'eleve se
//     familiarise avec les notions essentielles pour faire le mixing et
//     mastering de sa production musicale." et "L'eleve s'applique a creer
//     ses propres rythmes (Pattern Beat Maker) Il collabore avec d'autres
//     eleves dans la creation musicale." Colonne 9e AF, Appreciation
//     musicale, citee verbatim : "L'eleve situe les œuvres musicales
//     ecoutees, les analyse, les compare tout en developpant une bonne
//     comprehension de la production musicale locale et internationale.
//     Il developpe un jugement et une comprehension de la musique actuelle
//     et de sa production et de son impact."
//   - p.62-63/63 : Unite 4 (MAO, full-cycle), verifiee en direct.
//     Competences officielles : C2, C6, C7, C8. Savoir-faire cite verbatim :
//     "Maitrise des aspects theoriques et pratiques du mixage. Creer et
//     produire en home studio." Evaluation citee verbatim : "un examen
//     final a chaque fin de session permettra de faire le bilan des
//     acquis."
//   - p.63/63 : Unite 5 (Appreciation musicale, full-cycle), verifiee en
//     direct. Competences officielles : C3, C4, C5, C8. Savoir-faire cite
//     verbatim : "Analyser une piece de musique. Placer une œuvre dans le
//     temps et dans l'espace. Juger la valeur artistique et esthetique
//     d'une œuvre." Activites citees verbatim : "Montage de biographie de
//     compositeurs. Creation de discographie." Evaluation citee verbatim :
//     "L'analyse des œuvres musicales sera le moyen privilegie pour
//     verifier les acquis."
//
// COMPETENCES : union officielle des deux unites = C2, C3, C4, C5, C6, C7,
// C8 — exactement le sous-ensemble retenu dans la table des matieres
// verrouillee pour ce chapitre.
//
// STATUT DE TRACABILITE : comme pour les Chapitres 1, 4, 5 et 6, le tableau
// de progression separe explicitement les colonnes 7e/8e/9e AF — le
// mixage/mastering, le Pattern Beat Maker et le jugement critique sur la
// production musicale actuelle sont donc confirmes [OFFICIEL - SOURCE
// MENFP VERIFIEE] pour la 9e AF precisement.
//
// PROTECTION DU CHAPITRE 7 DE LA 7e AF ET DES CHAPITRES 1-6 DE LA 9e AF —
// CONTROLE ANTI-REPETITION : le Chapitre 7 de la 7e AF (deja finalise, NON
// modifie ici, et SEUL chapitre 7 existant dans un manuel EEA anterieur —
// la 8e AF s'arrete a 6 chapitres) a traite la MAO d'INTRODUCTION
// (Musescore, volume, panoramique, effet de balayage) et l'ecoute de
// grands classiques UNIVERSELS. CE CHAPITRE NE REPREND NI L'UN NI L'AUTRE :
// il developpe le mixage/mastering avance, le Pattern Beat Maker, et le
// jugement critique sur la production musicale LOCALE ET INTERNATIONALE
// ACTUELLE — un aboutissement reel, non une redite. Le Chapitre 6 de la 9e
// AF (deja redige, NON modifie ici) a introduit les bases de
// l'enregistrement sonore (capter un son) ; ce chapitre va plus loin en
// traitant le MIXAGE (transformer/equilibrer un son deja capte).
//
// PATRIMOINE : "production musicale locale" est un contenu officiellement
// verifie (p.57-58), mais aucun titre, artiste ou date precis n'est cite
// par la source a ce niveau. Ce chapitre transforme donc ce contenu en une
// demarche d'ecoute et de jugement critique guidee, sans affirmation
// musicologique precise non verifiee — meme prudence que les chapitres
// musicaux precedents.
//
// Adaptations de securite : aucune activite dangereuse ; alternative papier
// systematique (storyboard de production) pour le mixage si aucun
// ordinateur/logiciel n'est disponible, conforme a la table des matieres
// verrouillee ("alternative papier : storyboard de production si pas
// d'ordinateur").
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, illustrationBox, twoColTable, threeColTable, spacer, pageBreak,
  exercicesHeading, chapterOpening, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE,
  BOX_OBSERVER_FILL, BOX_OBSERVER_LINE,
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE,
  BOX_PATRIMOINE_FILL, BOX_PATRIMOINE_LINE,
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE,
  BOX_NUMERIQUE_FILL, BOX_NUMERIQUE_LINE,
  BOX_ATELIER_FILL, BOX_ATELIER_LINE,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_CRITIQUE_FILL, BOX_CRITIQUE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE,
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
  OUTREMER, OCRE, SAUGE,
} from "./common.mjs";

const children = [];

// ---------------------------------------------------------------------
// Ouverture du chapitre
// ---------------------------------------------------------------------
children.push(...chapterOpening(
  7,
  "Produire sa musique aujourd'hui",
  "Tu sais désormais lire, écrire, jouer et enregistrer de la musique. Ce dernier chapitre t'invite à " +
  "franchir une étape de plus : transformer un enregistrement en véritable production, et à porter un regard " +
  "critique sur la musique que tu écoutes chaque jour, ici et ailleurs.",
  [
    "Comprendre les bases du mixage et du mastering.",
    "S'initier à la création rythmique assistée par ordinateur (ou sur papier).",
    "Développer un jugement critique sur la production musicale locale et internationale actuelle.",
    "Réaliser une courte production musicale ou un projet équivalent sur papier.",
    "Documenter une œuvre ou un compositeur à travers une fiche ou une discographie.",
  ],
));

children.push(bodyPar(
  "Situation de départ : Dans une école de Miragoâne, une classe de 9e AF écoute deux versions d'un même " +
  "enregistrement : l'une brute, l'autre retravaillée, plus équilibrée, plus agréable à l'oreille. « Qu'est-ce " +
  "qui a changé, exactement ? » demande une élève. Son enseignant répond : « C'est le mixage. Et c'est " +
  "exactement ce que nous allons apprendre à faire, pour clore ensemble ce cycle de trois ans en musique. »",
  { italics: true },
));

children.push(subHeading("Prérequis"));
children.push(bodyPar(
  "Ce chapitre suppose que tu as déjà une première expérience de la musique assistée par ordinateur " +
  "(notation, volume, panoramique, effet de balayage, 7e AF), ainsi que les bases de l'enregistrement sonore " +
  "découvertes au chapitre précédent. Ces deux acquis se rejoignent ici dans une véritable démarche de " +
  "production.",
));
children.push(spacer(160));

children.push(subHeading("Vocabulaire essentiel"));
children.push(bulletPar("Mixage — équilibrage et ajustement de plusieurs sons ou pistes enregistrées pour obtenir un résultat harmonieux."));
children.push(bulletPar("Mastering — dernière étape de finalisation d'une production musicale, avant sa diffusion."));
children.push(bulletPar("Home studio — espace, même modeste, équipé pour enregistrer et produire de la musique chez soi ou à l'école."));
children.push(bulletPar("Pattern Beat Maker — outil (logiciel ou application) permettant de créer et d'assembler des motifs rythmiques."));
children.push(bulletPar("Jugement critique — capacité à évaluer et à justifier une opinion argumentée sur une œuvre."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Rappel : de la notation numérique à l'enregistrement", "7.1"));
children.push(bodyPar(
  "En 7e AF, tu as découvert la musique assistée par ordinateur à travers la notation numérique et des " +
  "réglages simples (volume, panoramique). Au chapitre précédent, tu as appris à capter un son par " +
  "l'enregistrement. Ce chapitre réunit ces deux acquis autour d'une nouvelle étape : transformer un " +
  "enregistrement brut en véritable production.",
));
children.push(spacer(160));

// ---------------------------------------------------------------------
children.push(sectionHeading("Le mixage et le mastering", "7.2"));
children.push(bodyPar(
  "Le mixage consiste à équilibrer plusieurs sons ou pistes entre eux — volume, clarté, position — pour " +
  "obtenir un résultat cohérent. Le mastering intervient ensuite, comme une dernière touche de finition avant " +
  "que la production soit prête à être écoutée par d'autres.",
));
children.push(calloutBox(
  "DÉCOUVRIR — Deux étapes de la production musicale",
  [
    "Le mixage ajuste l'équilibre entre les différents sons d'un enregistrement (par exemple, la voix et un " +
    "instrument).",
    "Le mastering uniformise et finalise l'ensemble, pour que le résultat sonne bien sur différents appareils " +
    "d'écoute.",
    "Ces étapes existent aussi bien dans un studio professionnel que dans un « home studio » modeste — " +
    "seule l'ampleur des moyens change, pas le principe.",
  ],
  BOX_DECOUVRIR_FILL, BOX_DECOUVRIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C07-01",
  "Ouverture — Avant et après le mixage",
  "Une salle de classe haïtienne crédible (Miragoâne ou similaire) où des élèves de 9e AF comparent, sur un " +
  "ordinateur ou un support stylisé, deux représentations visuelles d'un même enregistrement : brut, puis " +
  "mixé.",
  "Le mixage transforme un enregistrement brut en une production plus équilibrée.",
  "Ouvrir le chapitre sur une scène concrète illustrant l'effet du mixage.",
  "Illustration pleine largeur, scène de classe haïtienne, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(sectionHeading("Créer des rythmes : le Pattern Beat Maker", "7.3"));
children.push(bodyPar(
  "Un « Pattern Beat Maker » est un outil qui permet d'assembler des motifs rythmiques courts et répétés " +
  "pour construire un accompagnement ou une base musicale — une façon supplémentaire de composer, en plus de " +
  "l'écriture manuscrite déjà pratiquée.",
));
children.push(calloutBox(
  "TECHNIQUE — Assembler un motif rythmique",
  [
    "1. Choisis un tempo régulier (ni trop lent, ni trop rapide) comme base de ton motif.",
    "2. Construis un court motif rythmique répétitif (par exemple 4 ou 8 temps), sur ordinateur ou sur " +
    "papier.",
    "3. Répète ce motif pour former une structure stable, comme la base d'une chanson.",
    "4. Si tu travailles en groupe, propose ton motif à un camarade et écoutez ensemble comment vos motifs " +
    "pourraient se combiner.",
  ],
  BOX_TECHNIQUE_FILL, BOX_TECHNIQUE_LINE, "2A2622",
));
children.push(spacer(160));
children.push(bodyPar(
  "Alternative sans ordinateur : construis ton motif rythmique entièrement sur papier, en notant une suite de " +
  "frappes (par exemple : frappe, frappe, pause, frappe) que tu peux ensuite reproduire à la voix ou en " +
  "percussion corporelle.",
  { italics: true },
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C07-02",
  "Exemple analysé — un motif rythmique assemblé",
  "Une grille simple représentant un motif rythmique de 8 temps, avec des cases remplies indiquant les " +
  "frappes, présentée à la fois en version numérique stylisée et en version papier.",
  "Un motif rythmique se construit par répétition d'un court schéma stable.",
  "Donner un exemple visuel clair de la construction d'un motif rythmique.",
  "Illustration demi-page, grille rythmique annotée, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(sectionHeading("Porter un jugement critique sur la musique actuelle", "7.4"));
children.push(bodyPar(
  "Après trois années à apprendre la musique, tu es maintenant capable de l'écouter avec un regard plus " +
  "averti : situer une œuvre dans le temps, comprendre sa production, et juger sa valeur artistique de façon " +
  "argumentée — pas seulement dire si elle te plaît ou non.",
));
children.push(calloutBox(
  "ÉCOUTER — Analyser la production musicale actuelle",
  [
    "Choisis une œuvre musicale actuelle, locale ou internationale, que tu connais bien.",
    "Situe-la : quand et dans quel contexte a-t-elle été produite, selon ce que tu peux vérifier ?",
    "Analyse sa production : peux-tu repérer des choix de mixage, d'instrumentation, ou de rythme " +
    "particuliers ?",
    "Juge sa valeur artistique de façon argumentée : qu'est-ce qui, précisément, justifie ton appréciation ?",
  ],
  BOX_ECOUTER_FILL, BOX_ECOUTER_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C07-03",
  "Démonstration technique — fiche de biographie et discographie",
  "Une fiche stylisée présentant la structure d'une biographie de compositeur et d'une discographie " +
  "(catégories à remplir : nom, période, œuvres, contexte), sans nommer de personne réelle précise.",
  "Documenter un compositeur ou une œuvre suit une méthode structurée.",
  "Montrer un exemple de structure pour la fiche de biographie/discographie de l'atelier.",
  "Illustration demi-page, fiche structurée stylisée, cohérente avec la charte EEA.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Atelier / Projet — Ma production musicale"));
children.push(mixedPar([{ text: "OBJECTIF : ", bold: true }, { text: "Réaliser une courte production musicale (mixage simple ou storyboard papier) et documenter une œuvre ou un compositeur par une fiche critique." }]));
children.push(mixedPar([{ text: "MATÉRIEL : ", bold: true }, { text: "Un ordinateur avec logiciel simple si disponible. Alternative : papier, pour réaliser un storyboard de production ou un motif rythmique écrit." }]));
children.push(mixedPar([{ text: "CONSIGNES : ", bold: true }, { text: "Choisis l'une des deux options : (A) réaliser une courte production mixée (numérique) ; (B) réaliser un storyboard papier détaillant les étapes d'une production imaginée." }]));
children.push(bodyPar("ÉTAPES (option A ou B, production) :", { bold: true }));
children.push(numberedPar("1. Choisis ou compose un court enregistrement/motif de départ (repris d'un chapitre précédent si besoin)."));
children.push(numberedPar("2. Décide de deux ou trois ajustements de mixage que tu souhaites appliquer (volume, équilibre, position)."));
children.push(numberedPar("3. Réalise ces ajustements (sur logiciel) ou décris-les précisément (storyboard papier)."));
children.push(bodyPar("ÉTAPES (fiche critique, obligatoire pour tous) :", { bold: true }));
children.push(numberedPar("4. Choisis une œuvre musicale actuelle (locale ou internationale) que tu connais bien."));
children.push(numberedPar("5. Complète une courte fiche : contexte, choix de production repérés, jugement critique argumenté."));
children.push(spacer(120));
children.push(bodyPar("RÉSULTAT ATTENDU : ", { bold: true }));
children.push(bodyPar(
  "Une courte production musicale (mixée ou en storyboard papier) et une fiche critique argumentée sur une " +
  "œuvre musicale actuelle.",
));
children.push(spacer(120));
children.push(bodyPar("CRITÈRES D'OBSERVATION :", { bold: true }));
children.push(bulletPar("Les ajustements de mixage proposés sont cohérents et clairement expliqués."));
children.push(bulletPar("La fiche critique situe l'œuvre et justifie le jugement porté, au-delà d'un simple « j'aime »/« je n'aime pas »."));
children.push(bulletPar("L'élève peut présenter et défendre son projet devant la classe."));
children.push(spacer(200));

children.push(calloutBox(
  "SÉCURITÉ — Une production sans risque",
  [
    "L'utilisation d'un ordinateur ou d'un logiciel de mixage ne présente aucun danger particulier.",
    "L'écoute d'œuvres se fait à un volume raisonnable, pour préserver l'audition.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "5A2A1E",
));
children.push(spacer(200));

children.push(illustrationBox(
  "ILL-EEA-9AF-C07-04",
  "Espace de production — ma fiche critique",
  "Un cadre vide, format portrait, structuré en zones (œuvre choisie, contexte, choix de production repérés, " +
  "jugement argumenté), prévu pour que l'élève y rédige directement sa fiche dans le manuel.",
  "Offrir un espace direct de production pour structurer la fiche critique de l'élève.",
  "Espace de production dédié, conforme à la charte EEA.",
  "Cadre à quatre zones, bordure fine ocre, format portrait pleine page.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(subHeading("Regard critique"));
children.push(bodyPar(
  "Présente ta fiche critique à un camarade qui a choisi une œuvre différente. Vos jugements reposent-ils sur " +
  "des critères similaires ou très différents ? Discutez ensemble de ce qui rend un jugement musical " +
  "réellement argumenté, au-delà du simple goût personnel.",
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(calloutBox(
  "À RETENIR",
  [
    "Le mixage équilibre plusieurs sons entre eux ; le mastering finalise la production avant diffusion.",
    "Un Pattern Beat Maker assemble des motifs rythmiques répétés, sur ordinateur ou sur papier.",
    "Porter un jugement critique suppose de situer une œuvre, d'analyser sa production, et de justifier son " +
    "appréciation.",
    "La production musicale actuelle, locale et internationale, peut être analysée avec les mêmes outils " +
    "théoriques appris depuis la 7e AF.",
    "Documenter une œuvre ou un compositeur (biographie, discographie) suit une méthode structurée.",
  ],
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, OUTREMER,
));
children.push(spacer(200));

children.push(calloutBox(
  "AUTOÉVALUATION — Je peux…",
  [
    "☐ Expliquer la différence entre mixage et mastering.",
    "☐ Assembler un motif rythmique simple, sur ordinateur ou sur papier.",
    "☐ Porter un jugement critique argumenté sur une œuvre musicale actuelle.",
    "☐ Réaliser une courte production musicale ou un storyboard équivalent.",
    "☐ Documenter une œuvre ou un compositeur par une fiche structurée.",
  ],
  BOX_AUTOEVAL_FILL, BOX_AUTOEVAL_LINE, BOX_AUTOEVAL_TITLE,
));
children.push(spacer(200));

children.push(calloutBox(
  "PRÉPARATION À L'ÉVALUATION",
  [
    "Notions essentielles : mixage, mastering, home studio, Pattern Beat Maker, jugement critique.",
    "Vocabulaire clé à maîtriser : mixage, mastering, jugement critique, discographie.",
    "Avant l'évaluation, vérifie que tu peux : expliquer les étapes du mixage et du mastering ; construire un " +
    "motif rythmique simple ; argumenter un jugement critique sur une œuvre musicale.",
    "Rappel officiel : l'analyse des œuvres musicales reste le moyen privilégié pour vérifier les acquis de " +
    "ce chapitre, en plus d'un examen final possible en fin de session [OFFICIEL — SOURCE MENFP VÉRIFIÉE].",
  ],
  BOX_PREPEVAL_FILL, BOX_PREPEVAL_LINE, BOX_PREPEVAL_TITLE,
));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(exercicesHeading(7));

children.push(subHeading("Exercice A — Connaissance/compréhension"));
children.push(bodyPar(
  "Complète les phrases suivantes à l'aide des mots de la banque (attention, l'ordre est mélangé) : mixage · " +
  "mastering · home studio · Pattern Beat Maker · jugement critique.",
  { italics: true },
));
children.push(numberedPar("1. Équilibrer plusieurs sons ou pistes entre eux s'appelle le ......................"));
children.push(numberedPar("2. La dernière étape de finalisation d'une production avant sa diffusion s'appelle le ......................"));
children.push(numberedPar("3. Un espace modeste équipé pour enregistrer et produire de la musique s'appelle un ......................"));
children.push(numberedPar("4. Un outil permettant d'assembler des motifs rythmiques s'appelle un ......................"));
children.push(numberedPar("5. La capacité à évaluer et justifier une opinion argumentée sur une œuvre s'appelle un ......................"));
children.push(spacer(200));

children.push(subHeading("Exercice B — Observation"));
children.push(numberedPar("1. Explique, avec tes mots, la différence entre le mixage et le mastering."));
children.push(numberedPar("2. Cite deux éléments qu'on peut observer en analysant la production d'une œuvre musicale actuelle."));
children.push(spacer(200));

children.push(subHeading("Exercice C — Application"));
children.push(numberedPar("1. Décris, en trois étapes, comment tu construirais un motif rythmique simple sur papier."));
children.push(numberedPar("2. Pourquoi une fiche critique doit-elle contenir davantage qu'une simple opinion (« j'aime » ou « je n'aime pas ») ?"));
children.push(spacer(200));

children.push(subHeading("Exercice D — Analyse et justification"));
children.push(numberedPar("1. Compare la MAO d'introduction découverte en 7e AF et la production étudiée dans ce chapitre : quelles compétences nouvelles cela demande-t-il ?"));
children.push(numberedPar("2. Un camarade juge une œuvre musicale uniquement « bonne » ou « mauvaise », sans justification. Que lui conseilles-tu pour argumenter davantage son jugement ?"));
children.push(numberedPar("3. Choisis une œuvre musicale haïtienne actuelle que tu connais et explique, en argumentant, ce qui te semble réussi ou perfectible dans sa production."));
children.push(spacer(200));

// ---------------------------------------------------------------------
children.push(pageBreak());
children.push(subHeading("Résumé du chapitre"));
children.push(bodyPar(
  "Ce chapitre a permis de découvrir les bases du mixage et du mastering, de s'initier à la création " +
  "rythmique assistée par ordinateur ou sur papier, et de développer un jugement critique argumenté sur la " +
  "production musicale locale et internationale actuelle. Ce dernier chapitre pédagogique du manuel " +
  "d'Éducation Esthétique et Artistique de 9e AF referme un cycle de trois années : du point et de la ligne " +
  "à la couleur, du trait à la composition avancée, du patrimoine imaginé à la découverte des métiers de la " +
  "culture, et de la première note lue à la production musicale critique et autonome.",
));
children.push(spacer(120));
children.push(bodyPar("Mots-clés du chapitre :", { bold: true }));
children.push(bodyPar(
  "mixage · mastering · home studio · Pattern Beat Maker · jugement critique · discographie.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C07-05",
  "Patrimoine — écouter la production musicale haïtienne actuelle",
  "Une scène de classe haïtienne où des élèves de 9e AF écoutent attentivement une production musicale " +
  "actuelle, casque ou haut-parleur simple à l'appui, sans qu'aucune œuvre ou artiste précis ne soit " +
  "représenté ou nommé.",
  "La production musicale haïtienne actuelle peut être analysée avec les mêmes outils que toute autre " +
  "musique.",
  "Illustrer la dimension patrimoniale et critique du chapitre sans fixer une œuvre précise.",
  "Illustration demi-page, scène de classe haïtienne, ambiance concentrée et musicale.",
));
children.push(spacer(160));

children.push(illustrationBox(
  "ILL-EEA-9AF-C07-06",
  "Synthèse — Produire sa musique aujourd'hui",
  "Une carte mentale simple centrée sur « Produire aujourd'hui », avec des branches vers : mixage/mastering, " +
  "Pattern Beat Maker, jugement critique, biographie/discographie, musique locale et internationale.",
  "Visualiser d'un coup d'œil l'ensemble des notions du chapitre, dernier du manuel.",
  "Aider l'élève à mémoriser la structure globale du chapitre avant l'évaluation de fin de cycle.",
  "Illustration pleine largeur, style carte mentale colorée, cohérente avec la charte EEA.",
));

await buildAndSave(children, 61, "Manuel_EEA_9AF_Chapitre7.docx");
