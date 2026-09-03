/**
 * DEV/TEST-only illustrative content for the Student digital classroom
 * preview (credential-free DEV bypass persona only — session.userId === -1,
 * matches no real database row). Never written to any database, never
 * shown to a real student with real enrollment, never reachable on
 * Production (gated upstream by isDevBypassAllowed()). Every value here is
 * fictional and must stay visibly labeled "DONNÉES DE DÉMONSTRATION". Only
 * published/validated-style grades are shown, consistent with the real
 * grade workflow (brouillon/soumis notes are never presented as final).
 */

export interface StudentCourse {
  nom: string;
  enseignant: string;
  progression: number;
  chapitres: { titre: string; statut: "termine" | "en_cours" | "a_venir" }[];
  ressources: string[];
  annonces: string[];
}

export interface StudentEnvironment {
  key: "classique" | "professionnelle" | "universite";
  label: string;
  breadcrumb: string[];
  identite: { classeLabel: string; classeValeur: string; contexte: string };
  cours: StudentCourse[];
  emploiDuTemps: { jour: string; heure: string; matiere: string; enseignant: string; salle: string }[];
  presence: { totaux: { presents: number; absences: number; retards: number }; historique: { date: string; statut: "present" | "absent" | "retard" | "justifie"; cours: string }[] };
  devoirs: { titre: string; cours: string; echeance: string; etat: "a_faire" | "en_cours" | "remis" | "en_retard" | "corrige" }[];
  examens: { titre: string; cours: string; date: string; statut: "a_venir" | "resultats_disponibles" }[];
  notes: { cours: string; note: number; max: number; evaluation: string; date: string; feedback?: string }[];
  carnet?: { periode: string; matieres: { matiere: string; note: number; max: number; appreciation: string }[]; moyenne: number; statut: "publie" | "a_venir" }[];
  documents: { nom: string; categorie: string }[];
}

export const studentDemoEnvironments: StudentEnvironment[] = [
  {
    key: "classique",
    label: "École Classique",
    breadcrumb: ["École Classique", "2026-2027", "9e Année Fondamentale — Section A"],
    identite: { classeLabel: "Classe", classeValeur: "9e AF — Section A", contexte: "École Classique CCIGA" },
    cours: [
      {
        nom: "Mathématiques",
        enseignant: "Prof. Wilner Casséus",
        progression: 62,
        chapitres: [
          { titre: "Introduction aux équations", statut: "termine" },
          { titre: "Équations du 1er degré", statut: "en_cours" },
          { titre: "Systèmes d'équations", statut: "a_venir" },
        ],
        ressources: ["Chapitre 4 — Équations (PDF)", "Fiche d'exercices — Semaine 3"],
        annonces: ["Contrôle prévu le 3 septembre 2026."],
      },
      {
        nom: "Sciences",
        enseignant: "Prof. Marie-Ange Fils",
        progression: 45,
        chapitres: [
          { titre: "Le corps humain — introduction", statut: "termine" },
          { titre: "Le système digestif", statut: "en_cours" },
        ],
        ressources: ["Schéma du système digestif"],
        annonces: [],
      },
    ],
    emploiDuTemps: [
      { jour: "Aujourd'hui", heure: "08h00", matiere: "Mathématiques", enseignant: "Prof. Casséus", salle: "Salle 12" },
      { jour: "Aujourd'hui", heure: "10h00", matiere: "Sciences", enseignant: "Prof. Fils", salle: "Salle 5" },
      { jour: "Demain", heure: "08h00", matiere: "Français", enseignant: "Prof. Élinor Saint-Vil", salle: "Salle 12" },
    ],
    presence: {
      totaux: { presents: 96, absences: 3, retards: 5 },
      historique: [
        { date: "24 août 2026", statut: "present", cours: "Mathématiques" },
        { date: "21 août 2026", statut: "retard", cours: "Sciences" },
        { date: "18 août 2026", statut: "justifie", cours: "Français" },
      ],
    },
    devoirs: [
      { titre: "Exercices — équations du 1er degré", cours: "Mathématiques", echeance: "28 août 2026", etat: "en_cours" },
      { titre: "Résumé de lecture — chapitre 4", cours: "Français", echeance: "26 août 2026", etat: "a_faire" },
      { titre: "Rapport d'expérience", cours: "Sciences", echeance: "20 août 2026", etat: "corrige" },
    ],
    examens: [
      { titre: "Contrôle — Équations", cours: "Mathématiques", date: "3 sept. 2026", statut: "a_venir" },
      { titre: "Interrogation — Vocabulaire", cours: "Français", date: "18 août 2026", statut: "resultats_disponibles" },
    ],
    notes: [
      { cours: "Mathématiques", note: 82, max: 100, evaluation: "Contrôle — 1re période", date: "15 août 2026", feedback: "Très bon travail" },
      { cours: "Sciences", note: 88, max: 100, evaluation: "Contrôle — 1re période", date: "12 août 2026", feedback: "Excellent" },
    ],
    carnet: [
      {
        periode: "1re période",
        matieres: [
          { matiere: "Mathématiques", note: 82, max: 100, appreciation: "Très bon travail" },
          { matiere: "Français", note: 76, max: 100, appreciation: "Bonne participation" },
          { matiere: "Sciences", note: 88, max: 100, appreciation: "Excellent" },
        ],
        moyenne: 82,
        statut: "publie",
      },
      {
        periode: "2e période",
        matieres: [
          { matiere: "Mathématiques", note: 85, max: 100, appreciation: "Progrès constant" },
          { matiere: "Français", note: 79, max: 100, appreciation: "En amélioration" },
          { matiere: "Sciences", note: 84, max: 100, appreciation: "Solide" },
        ],
        moyenne: 82.7,
        statut: "publie",
      },
      { periode: "3e période", matieres: [], moyenne: 0, statut: "a_venir" },
      { periode: "4e période", matieres: [], moyenne: 0, statut: "a_venir" },
    ],
    documents: [
      { nom: "Bulletin — 1re période", categorie: "Bulletin" },
      { nom: "Chapitre 4 — Équations (PDF)", categorie: "Support de cours" },
    ],
  },
  {
    key: "professionnelle",
    label: "École Professionnelle",
    breadcrumb: ["École Professionnelle", "Programme Électricité Bâtiment", "Promotion 2026 — Groupe B"],
    identite: { classeLabel: "Groupe", classeValeur: "Promotion 2026 — Groupe B", contexte: "Programme Électricité Bâtiment" },
    cours: [
      {
        nom: "Module 3 — Câblage électrique",
        enseignant: "Prof. Wilner Casséus",
        progression: 70,
        chapitres: [
          { titre: "Sécurité électrique", statut: "termine" },
          { titre: "Câblage d'un circuit simple", statut: "en_cours" },
        ],
        ressources: ["Guide sécurité électrique", "Fiche technique — Câblage"],
        annonces: ["Évaluation pratique le 5 septembre 2026."],
      },
    ],
    emploiDuTemps: [
      { jour: "Aujourd'hui", heure: "13h00", matiere: "Module 3 — Atelier", enseignant: "Prof. Casséus", salle: "Atelier B" },
    ],
    presence: {
      totaux: { presents: 40, absences: 1, retards: 2 },
      historique: [{ date: "23 août 2026", statut: "present", cours: "Module 3 — Atelier" }],
    },
    devoirs: [{ titre: "Rapport d'atelier — Câblage", cours: "Module 3", echeance: "27 août 2026", etat: "en_cours" }],
    examens: [{ titre: "Évaluation pratique — Module 3", cours: "Module 3", date: "5 sept. 2026", statut: "a_venir" }],
    notes: [{ cours: "Module 3", note: 78, max: 100, evaluation: "Évaluation théorique", date: "10 août 2026" }],
    documents: [{ nom: "Grille d'évaluation — Module 3", categorie: "Document académique" }],
  },
  {
    key: "universite",
    label: "Université",
    breadcrumb: ["Université", "Faculté des Sciences", "Licence Informatique", "Semestre 3"],
    identite: { classeLabel: "Groupe", classeValeur: "Licence Informatique — Groupe 1", contexte: "Faculté des Sciences" },
    cours: [
      {
        nom: "Bases de données",
        enseignant: "Prof. Wilner Casséus",
        progression: 55,
        chapitres: [
          { titre: "Modèle relationnel", statut: "termine" },
          { titre: "Normalisation", statut: "en_cours" },
        ],
        ressources: ["Slides — Normalisation", "Énoncé projet semestriel"],
        annonces: [],
      },
    ],
    emploiDuTemps: [
      { jour: "Aujourd'hui", heure: "14h00", matiere: "Bases de données — CM", enseignant: "Prof. Casséus", salle: "Amphi 2" },
    ],
    presence: {
      totaux: { presents: 22, absences: 2, retards: 0 },
      historique: [{ date: "25 août 2026", statut: "present", cours: "Bases de données" }],
    },
    devoirs: [{ titre: "Projet — Schéma relationnel", cours: "Bases de données", echeance: "15 sept. 2026", etat: "a_faire" }],
    examens: [{ titre: "Examen final — Bases de données", cours: "Bases de données", date: "20 déc. 2026", statut: "a_venir" }],
    notes: [{ cours: "Bases de données", note: 88, max: 100, evaluation: "Contrôle continu 1", date: "5 août 2026" }],
    documents: [{ nom: "Slides — Normalisation", categorie: "Support de cours" }],
  },
];

export const studentDemoNotifications = [
  { titre: "Nouvelle note publiée — Sciences", corps: "Votre note du contrôle de la 1re période est disponible.", etat: "normal" as const, lu: false },
  { titre: "Devoir en retard — Histoire-Géographie", corps: "La carte des reliefs d'Haïti n'a pas encore été remise.", etat: "important" as const, lu: false },
  { titre: "Réunion de parents", corps: "Réunion prévue le 5 septembre 2026.", etat: "normal" as const, lu: true },
];

export const studentDemoCalendar = [
  { date: "26 août 2026", titre: "Résumé de lecture — Français", type: "Devoir" },
  { date: "3 sept. 2026", titre: "Contrôle — Mathématiques", type: "Examen" },
  { date: "5 sept. 2026", titre: "Réunion de parents", type: "Événement" },
];
