import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { academicDecisionLabels } from "@/lib/universiteGrades";
import { computeStudentPeriodResult } from "@/lib/periodResults";
import { documentTypeForSchool } from "@/lib/documents";
import { schoolToSector } from "@/lib/branding";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import BulletinDocument from "@/lib/pdf/BulletinDocument";
import ReleveDocument from "@/lib/pdf/ReleveDocument";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { programId, semesterId, studentId } = (await request.json()) ?? {};
  if (!programId || !semesterId || !studentId) {
    return new Response("Programme, période et étudiant requis.", { status: 400 });
  }

  const program = await prisma.program.findUnique({ where: { id: programId } });
  const student = await prisma.user.findUnique({ where: { id: Number(studentId) } });
  if (!program || !student) {
    return new Response("Introuvable.", { status: 404 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isOfficer = hasRole(session.roles, "ACADEMIC_OFFICER");
  const isTitulaire = program.titulaireId === session.userId;
  if (!isAdmin && !isOfficer && !isTitulaire) {
    return new Response("Non autorisé.", { status: 403 });
  }

  const [semester, courses] = await Promise.all([
    prisma.semester.findUnique({ where: { id: semesterId }, include: { academicYear: true } }),
    prisma.course.findMany({ where: { programId, semesterId }, include: { evaluationCategories: true } }),
  ]);
  if (!semester) {
    return new Response("Période invalide.", { status: 400 });
  }

  const cohort = await prisma.program.findUnique({ where: { id: programId }, include: { students: true } });
  const cohortIds = cohort?.students.map((s) => s.id) ?? [];
  const allGrades = await prisma.grade.findMany({ where: { courseId: { in: courses.map((c) => c.id) } } });
  const type = documentTypeForSchool(program.school);
  const weightField = type === "releve_semestre" ? "credits" : "coefficient";

  const result = computeStudentPeriodResult({
    studentId: student.id,
    courses,
    grades: allGrades,
    weightField,
    passingGrade: program.passingGrade,
    rankingEnabled: program.rankingEnabled,
    cohortIds,
  });

  const appreciation = await prisma.studentAppreciation.findUnique({
    where: { studentId_semesterId: { studentId: student.id, semesterId } },
  });
  const attendances = await prisma.attendance.findMany({
    where: { studentId: student.id, courseId: { in: courses.map((c) => c.id) } },
  });

  const logoBase64 = getDocumentLogoDataUri(schoolToSector(program.school));
  const periodLabel = `${semester.academicYear.label} — ${semester.name}`;

  let buffer: Buffer;
  if (type === "releve_semestre") {
    const retakeIds = new Set(courses.filter((c) => c.retakeOfCourseId).map((c) => c.id));
    buffer = await renderToBuffer(
      ReleveDocument({
        logoBase64,
        studentName: student.name,
        ccigaId: formatCcigaId(student.id),
        programName: program.name,
        periodLabel,
        courseFinals: result.courseFinals.map((c) => ({
          courseName: c.courseName,
          weight: c.weight,
          finalGrade: c.finalGrade,
          retake: retakeIds.has(c.courseId),
        })),
        average: result.average,
        decisionLabel: academicDecisionLabels[result.decision],
        rank: result.rank,
        rankingEnabled: program.rankingEnabled,
        isDraft: true,
        reference: "APERÇU",
        publishedLabel: "Aperçu — non publié",
        qrDataUri: null,
      }),
    );
  } else {
    buffer = await renderToBuffer(
      BulletinDocument({
        logoBase64,
        studentName: student.name,
        ccigaId: formatCcigaId(student.id),
        programName: program.name,
        periodLabel,
        courseFinals: result.courseFinals.map((c) => ({
          courseName: c.courseName,
          weight: c.weight,
          finalGrade: c.finalGrade,
        })),
        average: result.average,
        decisionLabel: academicDecisionLabels[result.decision],
        rank: result.rank,
        rankingEnabled: program.rankingEnabled,
        absences: attendances.filter((a) => a.status === "absent").length,
        retards: attendances.filter((a) => a.status === "retard").length,
        appreciation: appreciation?.appreciation ?? null,
        conduct: appreciation?.conduct ?? null,
        isDraft: true,
        reference: "APERÇU",
        publishedLabel: "Aperçu — non publié",
        qrDataUri: null,
      }),
    );
  }

  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "application/pdf" },
  });
}
