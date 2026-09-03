import { prisma } from "@/lib/db";
import type { SchoolKey } from "@/lib/institutions";

/**
 * AuditLog n'a pas de champ `school` (entityType/entityId génériques) — pour
 * les pages de structure académique par institution (École Classique,
 * École Professionnelle, Université), on résout d'abord les identifiants
 * réellement rattachés à l'école visée, puis on filtre le journal dessus.
 * Sans ce filtrage, une entrée Grade/AcademicDocument d'une autre
 * institution apparaissait sur cette page (contamination croisée).
 */
export async function getSchoolScopedAuditLogs(school: SchoolKey, take = 50) {
  const programs = await prisma.program.findMany({ where: { school }, select: { id: true } });
  const programIds = programs.map((p) => p.id);
  if (programIds.length === 0) return [];

  const [courses, documents] = await Promise.all([
    prisma.course.findMany({ where: { programId: { in: programIds } }, select: { id: true } }),
    prisma.academicDocument.findMany({ where: { programId: { in: programIds } }, select: { id: true } }),
  ]);
  const courseIds = courses.map((c) => c.id);
  const documentIds = documents.map((d) => d.id);
  const grades = courseIds.length
    ? await prisma.grade.findMany({ where: { courseId: { in: courseIds } }, select: { id: true } })
    : [];
  const gradeIds = grades.map((g) => g.id);

  return prisma.auditLog.findMany({
    where: {
      OR: [
        { entityType: "Program", entityId: { in: programIds } },
        { entityType: "Grade", entityId: { in: gradeIds } },
        { entityType: "AcademicDocument", entityId: { in: documentIds } },
      ],
    },
    include: { actor: true },
    orderBy: { createdAt: "desc" },
    take,
  });
}
