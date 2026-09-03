/**
 * DEV/TEST-only illustrative content for the Teacher digital classroom
 * preview (credential-free DEV bypass persona only — session.userId === -1,
 * matches no real database row). Never written to any database, never
 * shown to a real teacher with real assigned courses, never reachable on
 * Production (gated upstream by isDevBypassAllowed()). Every value here is
 * fictional and must stay visibly labeled "DONNÉES DE DÉMONSTRATION".
 */

export const teacherDemoName = "Prof. Wilner Casséus";

export const teacherDemoToday = {
  coursAujourdhui: 2,
  prochaineClasse: "9e AF — Mathématiques, 10h00",
  travauxACorriger: 5,
  notesEnBrouillon: 1,
  presencesACompleter: 1,
};

export interface TeacherEnvironment {
  key: "classique" | "professionnelle" | "universite";
  label: string;
  breadcrumb: string[];
  groupeLabel: string;
  apprenantLabel: string;
  groupeName: string;
  matiereOuModule: string;
  periodeLabel: string;
  roster: string[];
  attendance: { nom: string; statut: "present" | "absent" | "retard" | "justifie" }[];
  journal: { date: string; sujet: string; contenu: string; devoirDonne: string }[];
  ressources: { nom: string; type: string }[];
  devoirs: { titre: string; echeance: string; etat: "brouillon" | "publie" | "remis" | "en_retard" | "corrige" }[];
  examens: { titre: string; date: string; bareme: number; statut: "a_venir" | "termine" | "note" }[];
  gradebook: { apprenant: string; note: number | null; max: number }[];
  syncStatut: "brouillon" | "soumis" | "a_verifier" | "valide" | "retourne";
  palmares: { rang: number; nom: string; moyenne: number }[];
  audit: { date: string; action: string; statut: string }[];
}

export const teacherDemoEnvironments: TeacherEnvironment[] = [
  {
    key: "classique",
    label: "École Classique",
    breadcrumb: ["École Classique", "2026-2027", "9e Année Fondamentale", "Mathématiques"],
    groupeLabel: "Classe",
    apprenantLabel: "Élève",
    groupeName: "9e AF — Section A",
    matiereOuModule: "Mathématiques",
    periodeLabel: "2e période",
    roster: ["Joséphine Lendor", "Kervens Michel", "Sarah Delva", "Wadler Joseph", "Nadège Pierre"],
    attendance: [
      { nom: "Joséphine Lendor", statut: "present" },
      { nom: "Kervens Michel", statut: "present" },
      { nom: "Sarah Delva", statut: "retard" },
      { nom: "Wadler Joseph", statut: "absent" },
      { nom: "Nadège Pierre", statut: "justifie" },
    ],
    journal: [
      {
        date: "24 août 2026",
        sujet: "Équations du 1er degré",
        contenu: "Résolution d'équations simples, mise en pratique au tableau.",
        devoirDonne: "Exercices 1 à 8, page 42",
      },
      {
        date: "21 août 2026",
        sujet: "Introduction aux équations",
        contenu: "Vocabulaire, notion d'inconnue, exemples concrets.",
        devoirDonne: "Aucun",
      },
    ],
    ressources: [
      { nom: "Chapitre 4 — Équations (PDF)", type: "Support de cours" },
      { nom: "Fiche d'exercices — Semaine 3", type: "Exercices" },
    ],
    devoirs: [
      { titre: "Exercices — équations du 1er degré", echeance: "28 août 2026", etat: "publie" },
      { titre: "Contrôle rapide — vocabulaire", echeance: "20 août 2026", etat: "corrige" },
    ],
    examens: [
      { titre: "Contrôle — Équations", date: "3 sept. 2026", bareme: 100, statut: "a_venir" },
      { titre: "Interrogation — Vocabulaire", date: "18 août 2026", bareme: 20, statut: "note" },
    ],
    gradebook: [
      { apprenant: "Joséphine Lendor", note: 82, max: 100 },
      { apprenant: "Kervens Michel", note: 74, max: 100 },
      { apprenant: "Sarah Delva", note: 91, max: 100 },
      { apprenant: "Wadler Joseph", note: null, max: 100 },
      { apprenant: "Nadège Pierre", note: 68, max: 100 },
    ],
    syncStatut: "brouillon",
    palmares: [
      { rang: 1, nom: "Sarah Delva", moyenne: 91 },
      { rang: 2, nom: "Joséphine Lendor", moyenne: 82 },
      { rang: 3, nom: "Kervens Michel", moyenne: 74 },
    ],
    audit: [
      { date: "24 août 2026, 08h12", action: "Présence enregistrée", statut: "Complété" },
      { date: "20 août 2026, 16h40", action: "Note saisie — Interrogation vocabulaire", statut: "Brouillon" },
    ],
  },
  {
    key: "professionnelle",
    label: "École Professionnelle",
    breadcrumb: ["École Professionnelle", "Programme Électricité Bâtiment", "Promotion 2026", "Module 3 — Câblage"],
    groupeLabel: "Groupe",
    apprenantLabel: "Apprenant",
    groupeName: "Promotion 2026 — Groupe B",
    matiereOuModule: "Module 3 — Câblage électrique",
    periodeLabel: "Session en cours",
    roster: ["Ricardo Auguste", "Fabiola Noël", "Jeff Baptiste", "Emmanuela Cétoute"],
    attendance: [
      { nom: "Ricardo Auguste", statut: "present" },
      { nom: "Fabiola Noël", statut: "present" },
      { nom: "Jeff Baptiste", statut: "retard" },
      { nom: "Emmanuela Cétoute", statut: "present" },
    ],
    journal: [
      {
        date: "23 août 2026",
        sujet: "Câblage d'un circuit simple",
        contenu: "Atelier pratique : montage et vérification de sécurité.",
        devoirDonne: "Rapport d'atelier à remettre",
      },
    ],
    ressources: [
      { nom: "Guide sécurité électrique", type: "Support" },
      { nom: "Fiche technique — Câblage", type: "Ressource technique" },
    ],
    devoirs: [
      { titre: "Rapport d'atelier — Câblage", echeance: "27 août 2026", etat: "publie" },
    ],
    examens: [
      { titre: "Évaluation pratique — Module 3", date: "5 sept. 2026", bareme: 100, statut: "a_venir" },
    ],
    gradebook: [
      { apprenant: "Ricardo Auguste", note: 78, max: 100 },
      { apprenant: "Fabiola Noël", note: 85, max: 100 },
      { apprenant: "Jeff Baptiste", note: null, max: 100 },
      { apprenant: "Emmanuela Cétoute", note: 80, max: 100 },
    ],
    syncStatut: "soumis",
    palmares: [
      { rang: 1, nom: "Fabiola Noël", moyenne: 85 },
      { rang: 2, nom: "Emmanuela Cétoute", moyenne: 80 },
      { rang: 3, nom: "Ricardo Auguste", moyenne: 78 },
    ],
    audit: [
      { date: "22 août 2026, 14h05", action: "Notes soumises à l'Administration", statut: "Soumis" },
    ],
  },
  {
    key: "universite",
    label: "Université",
    breadcrumb: ["Université", "Faculté des Sciences", "Licence Informatique", "Semestre 3", "Bases de données"],
    groupeLabel: "Groupe",
    apprenantLabel: "Étudiant",
    groupeName: "Licence Informatique — Groupe 1",
    matiereOuModule: "Bases de données",
    periodeLabel: "Semestre 3",
    roster: ["Steevenson Louis", "Mirlande Exumé", "Peterson Charles"],
    attendance: [
      { nom: "Steevenson Louis", statut: "present" },
      { nom: "Mirlande Exumé", statut: "absent" },
      { nom: "Peterson Charles", statut: "present" },
    ],
    journal: [
      {
        date: "25 août 2026",
        sujet: "Normalisation des bases de données",
        contenu: "1re, 2e et 3e formes normales, exemples appliqués.",
        devoirDonne: "Projet — schéma relationnel à normaliser",
      },
    ],
    ressources: [
      { nom: "Slides — Normalisation", type: "Support de cours" },
      { nom: "Énoncé projet semestriel", type: "Projet" },
    ],
    devoirs: [
      { titre: "Projet — Schéma relationnel", echeance: "15 sept. 2026", etat: "brouillon" },
    ],
    examens: [
      { titre: "Examen final — Bases de données", date: "20 déc. 2026", bareme: 100, statut: "a_venir" },
    ],
    gradebook: [
      { apprenant: "Steevenson Louis", note: 88, max: 100 },
      { apprenant: "Mirlande Exumé", note: 72, max: 100 },
      { apprenant: "Peterson Charles", note: null, max: 100 },
    ],
    syncStatut: "retourne",
    palmares: [
      { rang: 1, nom: "Steevenson Louis", moyenne: 88 },
      { rang: 2, nom: "Mirlande Exumé", moyenne: 72 },
    ],
    audit: [
      { date: "19 août 2026, 09h30", action: "Notes retournées pour correction", statut: "Retourné" },
      { date: "18 août 2026, 17h00", action: "Notes soumises à l'Administration", statut: "Soumis" },
    ],
  },
];

export const teacherDemoNotifications = [
  { titre: "Notes retournées — Bases de données", corps: "L'Administration demande une correction avant resoumission.", etat: "urgent" as const, lu: false },
  { titre: "Réunion pédagogique", corps: "Réunion des enseignants le 2 septembre à 15h.", etat: "important" as const, lu: false },
  { titre: "Notes validées — Module 3 Câblage", corps: "Vos notes ont été validées par l'Administration.", etat: "normal" as const, lu: true },
];

export const teacherDemoCalendar = [
  { date: "3 sept. 2026", titre: "Contrôle — Équations (9e AF)", type: "Examen" },
  { date: "5 sept. 2026", titre: "Évaluation pratique — Module 3", type: "Examen" },
  { date: "15 sept. 2026", titre: "Remise projet — Bases de données", type: "Échéance" },
];

export const teacherDemoDocuments = [
  { nom: "Modèle de cahier de classe", type: "Formulaire" },
  { nom: "Grille d'évaluation — Barème standard", type: "Document administratif" },
];
