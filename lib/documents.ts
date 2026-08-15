import { prisma } from "@/lib/db";
import { computeMissingGrades } from "@/lib/gradeCompleteness";
import { computeStudentPeriodResult } from "@/lib/periodResults";
import { writeAuditLog } from "@/lib/auditLog";
import { createNotification } from "@/lib/notifications";

export type DocumentType = "bulletin_periode" | "releve_semestre";

export function documentTypeForSchool(school: string): DocumentType {
  return school === "universite" ? "releve_semestre" : "bulletin_periode";
}

export interface StudentReadiness {
  studentId: number;
  studentName: string;
  ready: boolean;
  missing: { studentName: string; categoryName: string }[];
  hasUnpublishedGrades: boolean;
  hasDocument: boolean;
}

/**
 * For a program + period (semester), determines per enrolled student whether
 * every required grade is present AND published — the hard gate for
 * automatic document generation ("le document reste Incomplet tant qu'une
 * note obligatoire manque").
 */
export async function computePeriodReadiness(programId: string, semesterId: string): Promise<StudentReadiness[]> {
  const [program, courses] = await Promise.all([
    prisma.program.findUnique({ where: { id: programId }, include: { students: true } }),
    prisma.course.findMany({
      where: { programId, semesterId },
      include: { evaluationCategories: true, grades: true },
    }),
  ]);
  if (!program) return [];

  const type = documentTypeForSchool(program.school);
  const students = program.students;
  const courseIds = courses.map((c) => c.id);

  const existingDocs = await prisma.academicDocument.findMany({
    where: { type, programId, semesterId, studentId: { in: students.map((s) => s.id) } },
    select: { studentId: true, supersededBy: true },
  });
  const currentDocByStudent = new Map(existingDocs.filter((d) => !d.supersededBy).map((d) => [d.studentId, true]));

  return students.map((student) => {
    const missing = courses.flatMap((course) =>
      computeMissingGrades(
        course.evaluationCategories,
        [{ id: student.id, name: student.name }],
        course.grades.filter((g) => g.studentId === student.id),
      ),
    );
    const studentGrades = courses.flatMap((c) => c.grades.filter((g) => g.studentId === student.id));
    const hasUnpublishedGrades = studentGrades.some((g) => g.status !== "publie");

    return {
      studentId: student.id,
      studentName: student.name,
      ready: missing.length === 0 && !hasUnpublishedGrades && courseIds.length > 0,
      missing,
      hasUnpublishedGrades,
      hasDocument: currentDocByStudent.has(student.id),
    };
  });
}

/**
 * Bulk-generates (and publishes) documents for every ready student in a
 * period who doesn't already have one — the only way an AcademicDocument row
 * is ever created. Skips students who already have a current document in
 * this group (a grade correction after publication goes through
 * regenerateDocumentVersion instead, never through this bulk action).
 */
export async function generateDocumentsForPeriod(
  programId: string,
  semesterId: string,
  actorId: number,
): Promise<number> {
  const [program, semester, courses] = await Promise.all([
    prisma.program.findUnique({ where: { id: programId } }),
    prisma.semester.findUnique({ where: { id: semesterId }, include: { academicYear: true } }),
    prisma.course.findMany({
      where: { programId, semesterId },
      include: { evaluationCategories: true },
    }),
  ]);
  if (!program || !semester) return 0;

  const type = documentTypeForSchool(program.school);
  const readiness = await computePeriodReadiness(programId, semesterId);
  const readyStudents = readiness.filter((r) => r.ready && !r.hasDocument);
  if (readyStudents.length === 0) return 0;

  const cohortIds = readiness.map((r) => r.studentId);
  const allGrades = await prisma.grade.findMany({
    where: { courseId: { in: courses.map((c) => c.id) } },
  });
  const weightField = type === "releve_semestre" ? "credits" : "coefficient";

  let created = 0;
  for (const student of readyStudents) {
    const result = computeStudentPeriodResult({
      studentId: student.studentId,
      courses,
      grades: allGrades,
      weightField,
      passingGrade: program.passingGrade,
      rankingEnabled: program.rankingEnabled,
      cohortIds,
    });

    const appreciation = await prisma.studentAppreciation.findUnique({
      where: { studentId_semesterId: { studentId: student.studentId, semesterId } },
    });

    const attendances = await prisma.attendance.findMany({
      where: { studentId: student.studentId, courseId: { in: courses.map((c) => c.id) } },
    });

    const snapshotData = {
      studentName: student.studentName,
      programName: program.name,
      periodLabel: `${semester.academicYear.label} — ${semester.name}`,
      courseFinals: result.courseFinals,
      average: result.average,
      decision: result.decision,
      rank: result.rank,
      rankingEnabled: program.rankingEnabled,
      absences: attendances.filter((a) => a.status === "absent").length,
      retards: attendances.filter((a) => a.status === "retard").length,
      appreciation: appreciation?.appreciation ?? null,
      conduct: appreciation?.conduct ?? null,
      certification: null as string | null,
      generatedAt: new Date().toISOString(),
    };

    const documentGroupKey = `${type}:${student.studentId}:${programId}:${semesterId}`;
    const doc = await prisma.academicDocument.create({
      data: {
        type,
        studentId: student.studentId,
        programId,
        semesterId,
        academicYearId: semester.academicYearId,
        status: "publie",
        version: 1,
        documentGroupKey,
        snapshotData: JSON.stringify(snapshotData),
        generatedById: actorId,
        publishedAt: new Date(),
      },
    });

    await writeAuditLog({
      entityType: "AcademicDocument",
      entityId: doc.id,
      action: "generate_publish",
      actorId,
      after: { studentId: student.studentId, type, average: result.average, decision: result.decision },
    });

    await createNotification(student.studentId, {
      type: "document",
      title: "Bulletin/relevé disponible",
      body: `Votre document pour ${snapshotData.periodLabel} est maintenant disponible.`,
    });

    created += 1;
  }

  return created;
}

/**
 * Finds the current (non-superseded) documents whose period covers a given
 * grade, for regeneration after a post-publication correction.
 */
export async function findDocumentsCoveringGrade(gradeId: string) {
  const grade = await prisma.grade.findUnique({
    where: { id: gradeId },
    include: { course: true },
  });
  if (!grade || !grade.course.semesterId) return [];

  return prisma.academicDocument.findMany({
    where: {
      studentId: grade.studentId,
      programId: grade.course.programId,
      semesterId: grade.course.semesterId,
      supersededBy: null,
    },
  });
}

/**
 * Creates a new document version reflecting current live data, chaining from
 * the previous version — which is never mutated or deleted, satisfying
 * "conserver les anciennes versions après correction".
 */
export async function regenerateDocumentVersion(
  documentId: string,
  actorId: number,
  reason: string,
): Promise<void> {
  const previous = await prisma.academicDocument.findUnique({ where: { id: documentId } });
  if (!previous || !previous.semesterId) return;

  const [program, semester, courses] = await Promise.all([
    prisma.program.findUnique({ where: { id: previous.programId } }),
    prisma.semester.findUnique({ where: { id: previous.semesterId }, include: { academicYear: true } }),
    prisma.course.findMany({
      where: { programId: previous.programId, semesterId: previous.semesterId },
      include: { evaluationCategories: true },
    }),
  ]);
  if (!program || !semester) return;

  const readiness = await computePeriodReadiness(previous.programId, previous.semesterId);
  const cohortIds = readiness.map((r) => r.studentId);
  const allGrades = await prisma.grade.findMany({ where: { courseId: { in: courses.map((c) => c.id) } } });
  const weightField = previous.type === "releve_semestre" ? "credits" : "coefficient";

  const result = computeStudentPeriodResult({
    studentId: previous.studentId,
    courses,
    grades: allGrades,
    weightField,
    passingGrade: program.passingGrade,
    rankingEnabled: program.rankingEnabled,
    cohortIds,
  });

  const appreciation = await prisma.studentAppreciation.findUnique({
    where: { studentId_semesterId: { studentId: previous.studentId, semesterId: previous.semesterId } },
  });
  const attendances = await prisma.attendance.findMany({
    where: { studentId: previous.studentId, courseId: { in: courses.map((c) => c.id) } },
  });

  const previousSnapshot = JSON.parse(previous.snapshotData);
  const snapshotData = {
    ...previousSnapshot,
    courseFinals: result.courseFinals,
    average: result.average,
    decision: result.decision,
    rank: result.rank,
    absences: attendances.filter((a) => a.status === "absent").length,
    retards: attendances.filter((a) => a.status === "retard").length,
    appreciation: appreciation?.appreciation ?? null,
    conduct: appreciation?.conduct ?? null,
    generatedAt: new Date().toISOString(),
  };

  const next = await prisma.academicDocument.create({
    data: {
      type: previous.type,
      studentId: previous.studentId,
      programId: previous.programId,
      semesterId: previous.semesterId,
      academicYearId: previous.academicYearId,
      status: "publie",
      version: previous.version + 1,
      documentGroupKey: previous.documentGroupKey,
      previousVersionId: previous.id,
      snapshotData: JSON.stringify(snapshotData),
      generatedById: actorId,
      publishedAt: new Date(),
    },
  });

  await writeAuditLog({
    entityType: "AcademicDocument",
    entityId: next.id,
    action: "document_superseded",
    actorId,
    before: { previousVersionId: previous.id },
    after: { newDocumentId: next.id },
    reason,
  });

  await createNotification(previous.studentId, {
    type: "document",
    title: "Bulletin/relevé mis à jour",
    body: `Votre document pour ${previousSnapshot.periodLabel ?? "une période"} a été corrigé et republié.`,
  });
}
