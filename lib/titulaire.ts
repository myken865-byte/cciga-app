import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { isTeacherModel, type TeacherModel } from "@/lib/teacherModel";

export interface ResolvedTeacherModel {
  teacherModel: TeacherModel | null;
  titulaireId: number | null;
}

/**
 * Validates the (teacherModel, titulaireId) pair for a Program POST/PATCH body.
 * Only relevant for École Classique — other schools always resolve to nulls.
 * Returns an error string if titulaireId doesn't reference a TEACHER-role user.
 */
export async function resolveTeacherModel(
  school: string,
  teacherModel: unknown,
  titulaireId: unknown,
): Promise<{ ok: true; value: ResolvedTeacherModel } | { ok: false; error: string }> {
  if (school !== "ecole-classique" || !isTeacherModel(teacherModel)) {
    return { ok: true, value: { teacherModel: null, titulaireId: null } };
  }

  if (teacherModel !== "titulaire" || !titulaireId) {
    return { ok: true, value: { teacherModel, titulaireId: null } };
  }

  const teacher = await prisma.user.findUnique({ where: { id: Number(titulaireId) } });
  if (!teacher || !hasRole(parseRoles(teacher.roles), "TEACHER")) {
    return { ok: false, error: "Titulaire invalide : doit être un compte enseignant." };
  }

  return { ok: true, value: { teacherModel, titulaireId: teacher.id } };
}

/** Sets every Course.teacherId under this program to the titulaire, for titulaire-model classes. */
export async function cascadeTitulaireToCourses(programId: string, titulaireId: number | null): Promise<void> {
  await prisma.course.updateMany({ where: { programId }, data: { teacherId: titulaireId } });
}
