/**
 * DEV/TEST-only illustrative content for the Parent digital office preview
 * (credential-free DEV bypass persona only — session.userId === -1, which
 * matches no real database row). Never written to any database, never
 * shown to a real parent with a real linked child, never reachable on
 * Production (gated upstream by isDevBypassAllowed()). Every value here is
 * fictional and must stay visibly labeled "DONNÉES DE DÉMONSTRATION" in
 * the UI that consumes it.
 */

export const parentDemoStudent = {
  name: "Joséphine Lendor",
  matricule: "CCIGA-DEMO-0001",
  classe: "9e Année Fondamentale",
  section: "A",
  etablissement: "École Classique CCIGA",
  anneeAcademique: "2026-2027",
  statut: "Inscrit(e)",
  tuteur: "Vous (aperçu démo)",
};

export const parentDemoAttendance = {
  aujourdhui: "present" as const,
  semaine: { present: 4, absent: 0, retard: 1 },
  totaux: { presents: 96, absences: 3, absencesJustifiees: 2, retards: 5 },
  historique: [
    { date: "24 août 2026", statut: "present" as const },
    { date: "21 août 2026", statut: "retard" as const },
    { date: "18 août 2026", statut: "absent" as const, justifie: true },
    { date: "17 août 2026", statut: "present" as const },
  ],
};

export interface DemoSubject {
  matiere: string;
  note: number;
  max: number;
  moyenneClasse: number;
  appreciation: string;
}

export interface DemoPeriod {
  label: string;
  matieres: DemoSubject[];
  moyenneGenerale: number;
  rang: string;
  decision: string;
  appreciationGenerale: string;
}

export const parentDemoCarnet: DemoPeriod[] = [
  {
    label: "1re période",
    matieres: [
      { matiere: "Mathématiques", note: 82, max: 100, moyenneClasse: 74, appreciation: "Très bon travail" },
      { matiere: "Français", note: 76, max: 100, moyenneClasse: 71, appreciation: "Bonne participation" },
      { matiere: "Sciences", note: 88, max: 100, moyenneClasse: 75, appreciation: "Excellent" },
      { matiere: "Histoire-Géographie", note: 69, max: 100, moyenneClasse: 70, appreciation: "Peut mieux faire" },
    ],
    moyenneGenerale: 78.75,
    rang: "5e / 32",
    decision: "Admis(e)",
    appreciationGenerale: "Bon départ, régularité à maintenir.",
  },
  {
    label: "2e période",
    matieres: [
      { matiere: "Mathématiques", note: 85, max: 100, moyenneClasse: 73, appreciation: "Progrès constant" },
      { matiere: "Français", note: 79, max: 100, moyenneClasse: 72, appreciation: "En amélioration" },
      { matiere: "Sciences", note: 84, max: 100, moyenneClasse: 76, appreciation: "Solide" },
      { matiere: "Histoire-Géographie", note: 73, max: 100, moyenneClasse: 71, appreciation: "Progrès notable" },
    ],
    moyenneGenerale: 80.25,
    rang: "4e / 32",
    decision: "Admis(e)",
    appreciationGenerale: "Progression encourageante par rapport à la période précédente.",
  },
  {
    label: "3e période",
    matieres: [],
    moyenneGenerale: 0,
    rang: "—",
    decision: "À COMPLÉTER",
    appreciationGenerale: "Notes non encore publiées.",
  },
  {
    label: "4e période",
    matieres: [],
    moyenneGenerale: 0,
    rang: "—",
    decision: "À COMPLÉTER",
    appreciationGenerale: "Notes non encore publiées.",
  },
];

export const parentDemoHomework = [
  { titre: "Exercices — équations du 1er degré", matiere: "Mathématiques", echeance: "28 août 2026", etat: "a_faire" as const },
  { titre: "Résumé de lecture — chapitre 4", matiere: "Français", echeance: "26 août 2026", etat: "en_cours" as const },
  { titre: "Rapport d'expérience", matiere: "Sciences", echeance: "20 août 2026", etat: "remis" as const },
  { titre: "Carte des reliefs d'Haïti", matiere: "Histoire-Géographie", echeance: "15 août 2026", etat: "en_retard" as const },
];

export const parentDemoProgression = {
  pointsForts: ["Sciences", "Mathématiques"],
  aAmeliorer: ["Histoire-Géographie"],
  note:
    "Progression globale positive entre la 1re et la 2e période (+1,5 point de moyenne générale). Aucun diagnostic automatique — synthèse illustrative uniquement.",
};

export const parentDemoPayments = {
  fraisTotal: 85000,
  paye: 55000,
  solde: 30000,
  versements: [
    { label: "1er versement", montant: 25000, date: "5 sept. 2026", reference: "DEMO-V1-0001", statut: "paye" as const },
    { label: "2e versement", montant: 30000, date: "5 nov. 2026", reference: "DEMO-V2-0001", statut: "paye" as const },
    { label: "3e versement", montant: 15000, date: "5 janv. 2027", reference: "—", statut: "partiel" as const },
    { label: "4e versement", montant: 15000, date: "5 mars 2027", reference: "—", statut: "en_attente" as const },
  ],
};

export const parentDemoDiscipline = [
  { date: "22 août 2026", categorie: "Félicitation", description: "Excellente participation en classe de sciences.", statut: "positif" as const },
  { date: "10 août 2026", categorie: "Retard", description: "Arrivée 15 minutes après le début des cours.", statut: "neutre" as const },
];

export const parentDemoNotifications = [
  { titre: "Réunion de parents — 9e AF", corps: "Réunion prévue le 5 septembre 2026 à 16h.", etat: "important" as const, lu: false },
  { titre: "Nouveau bulletin disponible", corps: "Le bulletin de la 2e période a été publié.", etat: "normal" as const, lu: false },
  { titre: "Rappel de paiement", corps: "3e versement à régulariser avant le 5 janvier 2027.", etat: "urgent" as const, lu: true },
];

export const parentDemoCalendar = [
  { date: "5 sept. 2026", titre: "Réunion de parents", type: "Réunion" },
  { date: "20 sept. 2026", titre: "Contrôle — Mathématiques", type: "Examen" },
  { date: "10 oct. 2026", titre: "Journée portes ouvertes", type: "Activité" },
];

export const parentDemoDocuments = [
  { nom: "Bulletin — 1re période", type: "Bulletin" },
  { nom: "Bulletin — 2e période", type: "Bulletin" },
  { nom: "Attestation de scolarité", type: "Attestation" },
];

export const parentDemoRequests = [
  { subject: "Justification d'absence du 18 août", category: "justification_absence", status: "resolue", updatedAt: "19 août 2026" },
  { subject: "Question sur le solde du 3e versement", category: "question_paiements", status: "en_traitement", updatedAt: "24 août 2026" },
];
