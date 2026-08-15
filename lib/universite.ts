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

/**
 * Schools whose programmes carry the authorization workflow (programStatus,
 * authorizationRef/Date/DocumentRef) — a MENFP/DESRS/INFP program-accreditation
 * concern, unrelated to grading. École Classique is deliberately excluded here:
 * it has no accreditation-status concept, its programmes are always public.
 */
export const AUTHORIZATION_WORKFLOW_SCHOOLS = ["universite", "ecole-professionnelle"];

export function usesAuthorizationWorkflow(school: string): boolean {
  return AUTHORIZATION_WORKFLOW_SCHOOLS.includes(school);
}

/**
 * Schools whose courses use the evaluation-category / grade publication
 * workflow (brouillon→soumis→en_verification→validé→publié) instead of the
 * original flat, instant-notify grading. All three schools use it — this is a
 * separate concern from AUTHORIZATION_WORKFLOW_SCHOOLS above.
 */
export const GRADE_WORKFLOW_SCHOOLS = ["universite", "ecole-professionnelle", "ecole-classique"];

export function usesGradeWorkflow(school: string): boolean {
  return GRADE_WORKFLOW_SCHOOLS.includes(school);
}

export interface AuthorizationFields {
  school: string;
  programStatus: ProgramStatus | null;
  authorizationRef: string | null;
  authorizationDocumentRef: string | null;
}

/** Statuses that take a programme off the public Université catalogue — everything else shows. */
const UNIVERSITE_HIDDEN_STATUSES: ProgramStatus[] = ["archive", "suspendu"];

/**
 * Whether a programme may appear in public listings / admission pickers.
 *
 * Université: every non-archived, non-suspended programme is public as soon
 * as it exists — the accreditation status/references are internal
 * administrative record-keeping only and never gate public visibility (see
 * the "Correction de la visibilité publique des programmes" instruction).
 *
 * École Professionnelle (and any other authorization-workflow school): kept
 * on the original strict rule — a programme only appears once explicitly
 * Autorisé and carrying both an authorization reference and a justificatif
 * reference. Presence of a title in the app is never itself proof of
 * authorization.
 */
export function isPubliclyVisible(program: AuthorizationFields): boolean {
  if (program.school === "universite") {
    return !program.programStatus || !UNIVERSITE_HIDDEN_STATUSES.includes(program.programStatus);
  }
  return (
    program.programStatus === "autorise" &&
    !!program.authorizationRef?.trim() &&
    !!program.authorizationDocumentRef?.trim()
  );
}

export type GradeStatus = "brouillon" | "soumis" | "en_verification" | "valide" | "publie";

export const gradeStatusList: GradeStatus[] = ["brouillon", "soumis", "en_verification", "valide", "publie"];

export const gradeStatusLabels: Record<GradeStatus, string> = {
  brouillon: "Brouillon",
  soumis: "Soumis par l'enseignant",
  en_verification: "En vérification",
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
