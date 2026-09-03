const moduleLabels: Record<string, string> = {
  Program: "Programmes",
  Course: "Cours",
  Grade: "Notes",
  Payment: "Finances",
  StudentAppreciation: "Appréciation / Conduite",
  AcademicYear: "Année académique",
  Semester: "Semestre",
  Faculty: "Faculté",
  User: "Comptes",
  AcademicDocument: "Bulletins / Documents",
};

export function auditModuleLabel(entityType: string): string {
  return moduleLabels[entityType] ?? entityType;
}

const actionLabels: Record<string, string> = {
  create: "Création",
  update: "Modification",
  delete: "Suppression",
  archive: "Archivage",
  reactivate: "Réactivation",
  status_change: "Changement de statut",
  score_change: "Modification de note",
  submit: "Soumission",
  review: "Mise en vérification",
  validate: "Validation",
  publish: "Publication",
  generate_publish: "Génération et publication",
  document_superseded: "Nouvelle version (correction)",
};

export function auditActionLabel(action: string): string {
  return actionLabels[action] ?? action;
}
