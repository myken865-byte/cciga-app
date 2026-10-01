// Manuel d'EPS 7e AF — Phase Finale : Glossaire.
//
// Termes réellement employés dans les 10 chapitres (bancs de mots des
// exercices A et correspondances de l'exercice C), classés par ordre
// alphabétique, dédupliqués (un terme identique repris dans plusieurs
// chapitres n'apparaît qu'une fois, au chapitre de première introduction).
// Le mot « Réception » recouvre deux notions distinctes selon le sport
// (contrôler un ballon reçu / se réceptionner après un saut) : les deux
// sens sont conservés comme deux entrées séparées et précisées.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, spacer, pageBreak,
  buildAndSave, AlignmentType, TextRun, Paragraph, NAVY, GREY_TEXT,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text: "Glossaire", bold: true, color: NAVY, size: 40 })],
}));
children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Manuel d'EPS 7e Année Fondamentale — 2026-2027", italics: true, color: "1B7A6E", size: 26 })],
}));
children.push(bodyPar(
  "Termes essentiels employés dans les 10 chapitres du Manuel d'EPS 7e AF, classés par ordre alphabétique. Le " +
  "numéro entre parenthèses indique le chapitre où le terme est introduit pour la première fois.",
  { italics: true },
));
children.push(spacer(240));

function entry(term, chapNum, def) {
  children.push(new Paragraph({
    spacing: { after: 140, line: 276 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: `${term} `, bold: true, color: NAVY, size: 24 }),
      new TextRun({ text: `(Chapitre ${chapNum}) — `, italics: true, color: GREY_TEXT, size: 22 }),
      new TextRun({ text: def, size: 24 }),
    ],
  }));
}

entry("Activité physique", 1, "Mouvement du corps qui fait travailler les muscles, organisé ou non (ex. marcher, jouer, balayer la cour).");
entry("Allure", 6, "Rythme de course choisi pour répartir son effort sur une distance plus longue.");
entry("Appui", 9, "Point de contact entre le corps et le sol.");
entry("Coopération", 1, "Fait de travailler ensemble pour atteindre un but commun.");
entry("Coordination", 9, "Association de plusieurs mouvements du corps, avec rythme et continuité.");
entry("Cœur", 2, "Muscle qui pompe le sang dans tout le corps ; bat plus vite pendant l'effort pour apporter plus d'oxygène aux muscles.");
entry("Défense", 7, "Fait de protéger son but et de gêner la progression de l'équipe adverse.");
entry("Démarquage", 5, "Fait de se déplacer vers un espace libre pour se rendre disponible à une passe.");
entry("Discipline", 1, "Fait de suivre les consignes et de respecter les règles du groupe (ex. arriver à l'heure, porter une tenue adaptée).");
entry("Dribble", 5, "Fait de faire rebondir le ballon au sol pour se déplacer en le gardant sous contrôle.");
entry("Échauffement", 4, "Préparation progressive du corps et de l'esprit avant l'activité principale.");
entry("Enchaînement", 9, "Série de plusieurs actions simples réalisées l'une après l'autre.");
entry("EPS (Éducation physique et sportive)", 1, "Matière scolaire structurée qui utilise le mouvement pour poursuivre des objectifs éducatifs moteurs, cognitifs, sociaux et personnels.");
entry("Équilibre", 9, "Position stable obtenue à partir de ses appuis.");
entry("Fair-play", 1, "Fait de jouer honnêtement et de respecter l'adversaire, l'arbitre et les partenaires.");
entry("Filet", 8, "Élément qui sépare le terrain en deux espaces, un par équipe.");
entry("Genou", 2, "Articulation très sollicitée pendant la course et le saut, qui permet de plier et tendre la jambe.");
entry("Hydratation", 3, "Fait de boire régulièrement pour compenser la perte d'eau, notamment par la transpiration.");
entry("Hygiène", 3, "Ensemble des gestes qui permettent de garder son corps propre (ex. se laver les mains avant de manger).");
entry("Impulsion", 6, "Moment où l'on pousse sur le sol pour décoller pendant un saut.");
entry("Lancer de précision", 6, "Fait de viser une cible avec un objet léger et contrôlé.");
entry("Manchette", 8, "Technique qui contrôle un ballon bas avec les avant-bras.");
entry("Matériel", 4, "Ballons, cônes, cordes et autres objets utilisés pendant une séance, qui doivent être vérifiés avant usage et rangés après.");
entry("Mobilisation", 4, "Mouvement des articulations pour les préparer à l'effort, au début de l'échauffement.");
entry("Passe", 5, "Fait d'envoyer le ballon à un partenaire pour qu'il le reçoive.");
entry("Passe haute", 8, "Geste qui renvoie le ballon avec les mains, au-dessus du visage.");
entry("Poumons", 2, "Organes qui permettent à l'air, et donc à l'oxygène, d'entrer et de sortir du corps.");
entry("Récupération", 3, "Retour progressif du corps au calme après un effort, favorisé par l'hydratation et le repos.");
entry("Réception (contrôle du ballon)", 5, "Fait de regarder le ballon, préparer les mains et amortir son arrivée pour le contrôler.");
entry("Réception (après un saut)", 6, "Fait de retomber au sol de façon équilibrée après un saut ou un déplacement, avec les genoux légèrement fléchis.");
entry("Relais", 6, "Course où chaque élève transmet un témoin à un partenaire dans une zone prévue.");
entry("Retour au calme", 4, "Diminution progressive de l'intensité après l'effort, avec hydratation et repos.");
entry("Sécurité", 4, "Ensemble des règles et comportements qui protègent les élèves pendant une activité physique.");
entry("Sédentarité", 3, "Fait de passer beaucoup de temps assis, sans bouger.");
entry("Service", 8, "Geste qui met le ballon en jeu depuis l'arrière du terrain, au volley-ball.");
entry("Sommeil", 3, "Moment de repos qui permet au corps et à l'esprit de récupérer et de bien grandir.");
entry("Squelette", 2, "Ensemble des os qui soutiennent le corps, protègent des organes et participent au mouvement.");
entry("Tir", 5, "Geste qui envoie le ballon vers le panier ou le but pour marquer.");
entry("Trajectoire", 8, "Chemin suivi par le ballon dans les airs.");
entry("Transpiration", 2, "Réaction du corps, produisant de la sueur, qui aide à se refroidir pendant l'effort.");

await buildAndSave(children, 121, "Manuel_EPS_7AF_Glossaire.docx");
