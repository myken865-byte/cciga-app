import { prisma } from "@/lib/db";
import { isProgramType, isProgramStatus, type ProgramType, type ProgramStatus } from "@/lib/universite";

export interface ResolvedUniversiteFields {
  academicFacultyId: string | null;
  programType: ProgramType | null;
  programStatus: ProgramStatus | null;
  authorizationRef: string | null;
  authorizationDate: Date | null;
  authorizationDocumentRef: string | null;
  passingGrade: number | null;
}

/**
 * Validates the université-only Program fields. Non-université schools always
 * resolve to all-null (these fields are meaningless for École Classique /
 * École Professionnelle, same pattern as resolveTeacherModel in lib/titulaire.ts).
 *
 * Enforces: programType is licence|diplome only (never maîtrise/doctorat —
 * there's no such option to select in the first place); a faculté/domaine
 * belonging to school="universite" must be selected; a status of "autorise"
 * requires both an authorization reference AND a justificatif reference to be
 * present — a programme can never go live publicly without both.
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
  },
): Promise<{ ok: true; value: ResolvedUniversiteFields } | { ok: false; error: string }> {
  if (school !== "universite") {
    return {
      ok: true,
      value: {
        academicFacultyId: null,
        programType: null,
        programStatus: null,
        authorizationRef: null,
        authorizationDate: null,
        authorizationDocumentRef: null,
        passingGrade: null,
      },
    };
  }

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

  const passingGrade =
    input.passingGrade !== undefined && input.passingGrade !== null && input.passingGrade !== ""
      ? Number(input.passingGrade)
      : null;
  if (passingGrade !== null && (!Number.isFinite(passingGrade) || passingGrade < 0 || passingGrade > 100)) {
    return { ok: false, error: "Le seuil de réussite doit être compris entre 0 et 100." };
  }

  return {
    ok: true,
    value: {
      academicFacultyId: faculty.id,
      programType: input.programType,
      programStatus: status,
      authorizationRef,
      authorizationDate,
      authorizationDocumentRef,
      passingGrade,
    },
  };
}
