export type ProgramType = "licence" | "diplome";

export const programTypeList: ProgramType[] = ["licence", "diplome"];

export const programTypeLabels: Record<ProgramType, string> = {
  licence: "Licence",
  diplome: "Diplôme",
};

export function isProgramType(value: unknown): value is ProgramType {
  return value === "licence" || value === "diplome";
}

export type ProgramStatus = "brouillon" | "en_attente" | "autorise" | "suspendu" | "archive";

export const programStatusList: ProgramStatus[] = [
  "brouillon",
  "en_attente",
  "autorise",
  "suspendu",
  "archive",
];

export const programStatusLabels: Record<ProgramStatus, string> = {
  brouillon: "Brouillon",
  en_attente: "En attente de vérification",
  autorise: "Autorisé",
  suspendu: "Suspendu",
  archive: "Archivé",
};

export function isProgramStatus(value: unknown): value is ProgramStatus {
  return (programStatusList as readonly string[]).includes(value as string);
}

export const DEFAULT_PASSING_GRADE = 60;

export interface AuthorizationFields {
  programStatus: ProgramStatus | null;
  authorizationRef: string | null;
  authorizationDocumentRef: string | null;
}

/**
 * A programme may only appear in public listings / admission pickers when it
 * is explicitly Autorisé AND carries both an authorization reference and a
 * justificatif reference. Presence of a title in the app is never itself proof
 * of authorization (see compliance note in the Université module spec).
 */
export function isPubliclyVisible(program: AuthorizationFields): boolean {
  return (
    program.programStatus === "autorise" &&
    !!program.authorizationRef?.trim() &&
    !!program.authorizationDocumentRef?.trim()
  );
}

export type GradeStatus = "brouillon" | "soumis" | "valide" | "publie";

export const gradeStatusList: GradeStatus[] = ["brouillon", "soumis", "valide", "publie"];

export const gradeStatusLabels: Record<GradeStatus, string> = {
  brouillon: "Brouillon",
  soumis: "Soumis par l'enseignant",
  valide: "Validé par l'administration",
  publie: "Publié à l'étudiant",
};

export function isGradeStatus(value: unknown): value is GradeStatus {
  return (gradeStatusList as readonly string[]).includes(value as string);
}

/** A grade is visible to the student once published — or if it predates the workflow (status null). */
export function isGradeVisibleToStudent(status: string | null): boolean {
  return status === null || status === "publie";
}
