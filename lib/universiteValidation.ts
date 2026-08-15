import { prisma } from "@/lib/db";
import {
  isProgramType,
  isProgramStatus,
  usesAuthorizationWorkflow,
  usesGradeWorkflow,
  type ProgramType,
  type ProgramStatus,
} from "@/lib/universite";

export interface ResolvedUniversiteFields {
  academicFacultyId: string | null;
  programType: ProgramType | null;
  programStatus: ProgramStatus | null;
  authorizationRef: string | null;
  authorizationDate: Date | null;
  authorizationDocumentRef: string | null;
  passingGrade: number | null;
  rankingEnabled: boolean;
}

/**
 * passingGrade/rankingEnabled are grading-decision settings, not
 * authorization-status settings — they apply to every school using the grade
 * workflow (including École Classique, which never uses the authorization
 * workflow). Validated separately from the rest of this file's
 * authorization-only fields.
 */
function resolveGradeDecisionFields(
  school: string,
  input: { passingGrade?: unknown; rankingEnabled?: unknown },
): { ok: true; value: { passingGrade: number | null; rankingEnabled: boolean } } | { ok: false; error: string } {
  if (!usesGradeWorkflow(school)) {
    return { ok: true, value: { passingGrade: null, rankingEnabled: false } };
  }
  const passingGrade =
    input.passingGrade !== undefined && input.passingGrade !== null && input.passingGrade !== ""
      ? Number(input.passingGrade)
      : null;
  if (passingGrade !== null && (!Number.isFinite(passingGrade) || passingGrade < 0 || passingGrade > 100)) {
    return { ok: false, error: "Le seuil de réussite doit être compris entre 0 et 100." };
  }
  return { ok: true, value: { passingGrade, rankingEnabled: Boolean(input.rankingEnabled) } };
}

/**
 * Validates the authorization-workflow Program fields, shared by Université
 * and École Professionnelle. Other schools always resolve to all-null (same
 * pattern as resolveTeacherModel in lib/titulaire.ts).
 *
 * Université-only: programType (licence|diplome — never maîtrise/doctorat,
 * there's no such option to select) and a Faculté/Domaine (academicFacultyId)
 * belonging to school="universite" are required.
 *
 * Shared by both schools: a status of "autorise" requires both an
 * authorization reference AND a justificatif reference to be present — a
 * programme can never go live publicly without both.
 */
export async function resolveUniversiteFields(
  school: string,
  input: {
    academicFacultyId?: unknown;
    programType?: unknown;
    programStatus?: unknown;
    authorizationRef?: unknown;
    authorizationDate?: unknown;
    authorizationDocumentRef?: unknown;
    passingGrade?: unknown;
    rankingEnabled?: unknown;
  },
): Promise<{ ok: true; value: ResolvedUniversiteFields } | { ok: false; error: string }> {
  const gradeFields = resolveGradeDecisionFields(school, input);
  if (!gradeFields.ok) return gradeFields;

  if (!usesAuthorizationWorkflow(school)) {
    return {
      ok: true,
      value: {
        academicFacultyId: null,
        programType: null,
        programStatus: null,
        authorizationRef: null,
        authorizationDate: null,
        authorizationDocumentRef: null,
        ...gradeFields.value,
      },
    };
  }

  let programType: ProgramType | null = null;
  let academicFacultyId: string | null = null;

  if (school === "universite") {
    if (!isProgramType(input.programType)) {
      return { ok: false, error: "Type de programme invalide : choisissez Licence ou Diplôme." };
    }
    if (!input.academicFacultyId) {
      return { ok: false, error: "Une faculté ou un domaine est requis pour un programme universitaire." };
    }
    const faculty = await prisma.faculty.findUnique({ where: { id: String(input.academicFacultyId) } });
    if (!faculty || faculty.school !== "universite") {
      return { ok: false, error: "Faculté ou domaine invalide." };
    }
    programType = input.programType;
    academicFacultyId = faculty.id;
  }

  const status: ProgramStatus = isProgramStatus(input.programStatus) ? input.programStatus : "brouillon";

  const authorizationRef =
    typeof input.authorizationRef === "string" && input.authorizationRef.trim()
      ? input.authorizationRef.trim()
      : null;
  const authorizationDocumentRef =
    typeof input.authorizationDocumentRef === "string" && input.authorizationDocumentRef.trim()
      ? input.authorizationDocumentRef.trim()
      : null;
  const authorizationDate =
    typeof input.authorizationDate === "string" && input.authorizationDate
      ? new Date(input.authorizationDate)
      : null;

  if (status === "autorise" && (!authorizationRef || !authorizationDocumentRef)) {
    return {
      ok: false,
      error:
        "Un programme ne peut être marqué « Autorisé » sans référence d'autorisation ET document justificatif enregistrés.",
    };
  }

  return {
    ok: true,
    value: {
      academicFacultyId,
      programType,
      programStatus: status,
      authorizationRef,
      authorizationDate,
      authorizationDocumentRef,
      ...gradeFields.value,
    },
  };
}
