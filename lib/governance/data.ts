import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { ATTENDANCE_ALERT_THRESHOLD } from "@/lib/attendance";
import type { GovernanceScope } from "@/lib/governance/scope";

export interface GovernanceAlert {
  id: string;
  label: string;
  severity: "info" | "warning";
}

export interface GovernanceProgramRow {
  id: string;
  name: string;
  levelLabel: string;
  facultyName: string | null;
  studentsCount: number;
  coursesCount: number;
  coordinatorName: string | null;
}

export interface GovernanceStudentRow {
  id: number;
  name: string;
  ccigaId: string;
  programName: string;
}

export interface GovernanceTeacherRow {
  id: number;
  name: string;
  coursesCount: number;
}

export interface GovernanceCourseToReview {
  id: string;
  name: string;
  programName: string;
  soumis: number;
  enVerification: number;
}

export interface GovernanceOverview {
  programs: GovernanceProgramRow[];
  studentsCount: number;
  teachersCount: number;
  coursesCount: number;
  attendanceRatePercent: number | null;
  gradesSubmitted: number;
  gradesPending: number;
  internshipsEnCours: number;
  internshipsAEvaluer: number;
  seminarRegistrationsCount: number;
  pendingRequestsCount: number;
  alerts: GovernanceAlert[];
  students: GovernanceStudentRow[];
  teachers: GovernanceTeacherRow[];
  coursesToReview: GovernanceCourseToReview[];
}

function emptyOverview(): GovernanceOverview {
  return {
    programs: [],
    studentsCount: 0,
    teachersCount: 0,
    coursesCount: 0,
    attendanceRatePercent: null,
    gradesSubmitted: 0,
    gradesPending: 0,
    internshipsEnCours: 0,
    internshipsAEvaluer: 0,
    seminarRegistrationsCount: 0,
    pendingRequestsCount: 0,
    alerts: [],
    students: [],
    teachers: [],
    coursesToReview: [],
  };
}

/**
 * Moteur commun de gouvernance académique (mandat "Gouvernance académique —
 * Rectorat/Décanat/Coordination", 2026-09-12) — un seul agrégateur, consommé
 * par les trois portails avec un `GovernanceScope` déjà résolu différemment
 * par rôle (voir lib/governance/scope.ts). Toutes les métriques sont
 * calculées dynamiquement à partir des modèles existants ; aucune n'est
 * inventée, aucune table "Alert" n'est créée.
 */
export async function getGovernanceOverview(scope: GovernanceScope): Promise<GovernanceOverview> {
  const { programIds } = scope;
  if (programIds.length === 0) return emptyOverview();

  const [programs, students, courses] = await Promise.all([
    prisma.program.findMany({
      where: { id: { in: programIds } },
      include: { academicFaculty: true, coordinator: true, _count: { select: { students: true, courses: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.user.findMany({
      where: { programId: { in: programIds } },
      include: { program: true },
      orderBy: { name: "asc" },
    }),
    prisma.course.findMany({
      where: { programId: { in: programIds } },
      include: { teacher: true, program: true },
    }),
  ]);

  const studentIds = students.map((s) => s.id);
  const courseIds = courses.map((c) => c.id);

  const [attendances, grades, internships, seminarRegistrations, pendingRequests] = await Promise.all([
    courseIds.length
      ? prisma.attendance.findMany({ where: { courseId: { in: courseIds } }, select: { status: true, studentId: true } })
      : Promise.resolve([]),
    courseIds.length
      ? prisma.grade.findMany({ where: { courseId: { in: courseIds } }, select: { status: true, courseId: true } })
      : Promise.resolve([]),
    prisma.internship.findMany({ where: { programId: { in: programIds } }, select: { status: true, evaluationScore: true } }),
    studentIds.length
      ? prisma.seminarRegistration.findMany({ where: { studentId: { in: studentIds } }, select: { id: true } })
      : Promise.resolve([]),
    studentIds.length
      ? prisma.studentRequest.findMany({
          where: { studentId: { in: studentIds }, status: { in: ["soumise", "en_traitement"] } },
          select: { id: true },
        })
      : Promise.resolve([]),
  ]);

  const teacherMap = new Map<number, GovernanceTeacherRow>();
  for (const c of courses) {
    if (!c.teacher) continue;
    const existing = teacherMap.get(c.teacher.id);
    if (existing) existing.coursesCount += 1;
    else teacherMap.set(c.teacher.id, { id: c.teacher.id, name: c.teacher.name, coursesCount: 1 });
  }

  const attendanceTotal = attendances.length;
  const attendanceAbsent = attendances.filter((a) => a.status === "absent").length;
  const attendanceRatePercent =
    attendanceTotal > 0 ? Math.round(((attendanceTotal - attendanceAbsent) / attendanceTotal) * 100) : null;

  const absencesByStudent = new Map<number, number>();
  for (const a of attendances) {
    if (a.status !== "absent") continue;
    absencesByStudent.set(a.studentId, (absencesByStudent.get(a.studentId) ?? 0) + 1);
  }
  const studentsWithHighAbsences = Array.from(absencesByStudent.values()).filter(
    (count) => count >= ATTENDANCE_ALERT_THRESHOLD,
  ).length;

  const gradesPending = grades.filter((g) => !g.status || g.status === "brouillon" || g.status === "soumis").length;
  const gradesSubmitted = grades.length - gradesPending;

  const coursesWithoutTeacher = courses.filter((c) => !c.teacherId).length;
  const internshipsEnCours = internships.filter((i) => i.status === "en_cours").length;
  const internshipsAEvaluer = internships.filter((i) => i.status === "termine" && i.evaluationScore === null).length;

  const alerts: GovernanceAlert[] = [];
  if (coursesWithoutTeacher > 0) {
    alerts.push({ id: "no-teacher", label: `${coursesWithoutTeacher} cours sans enseignant assigné`, severity: "warning" });
  }
  if (studentsWithHighAbsences > 0) {
    alerts.push({
      id: "high-absences",
      label: `${studentsWithHighAbsences} étudiant(s) avec ${ATTENDANCE_ALERT_THRESHOLD} absences ou plus`,
      severity: "warning",
    });
  }
  if (internshipsAEvaluer > 0) {
    alerts.push({ id: "internship-eval", label: `${internshipsAEvaluer} stage(s) terminé(s) en attente d'évaluation`, severity: "warning" });
  }
  if (gradesPending > 0) {
    alerts.push({ id: "grades-pending", label: `${gradesPending} note(s) en brouillon ou soumise(s) non finalisée(s)`, severity: "info" });
  }
  if (pendingRequests.length > 0) {
    alerts.push({ id: "requests-pending", label: `${pendingRequests.length} demande(s) administrative(s) en attente`, severity: "info" });
  }

  // Réutilise le workflow de révision de notes existant (app/portail/
  // responsable/cours/[id]) — jamais un second système. Compte, par cours,
  // les notes soumis/en_verification déjà chargées ci-dessus.
  const reviewCounts = new Map<string, { soumis: number; enVerification: number }>();
  for (const g of grades) {
    if (g.status !== "soumis" && g.status !== "en_verification") continue;
    const entry = reviewCounts.get(g.courseId) ?? { soumis: 0, enVerification: 0 };
    if (g.status === "soumis") entry.soumis += 1;
    else entry.enVerification += 1;
    reviewCounts.set(g.courseId, entry);
  }
  const coursesToReview: GovernanceCourseToReview[] = courses
    .filter((c) => reviewCounts.has(c.id))
    .map((c) => {
      const counts = reviewCounts.get(c.id)!;
      return { id: c.id, name: c.name, programName: c.program.name, soumis: counts.soumis, enVerification: counts.enVerification };
    });

  return {
    programs: programs.map((p) => ({
      id: p.id,
      name: p.name,
      levelLabel: p.level,
      facultyName: p.academicFaculty?.name ?? null,
      studentsCount: p._count.students,
      coursesCount: p._count.courses,
      coordinatorName: p.coordinator?.name ?? null,
    })),
    studentsCount: students.length,
    teachersCount: teacherMap.size,
    coursesCount: courses.length,
    attendanceRatePercent,
    gradesSubmitted,
    gradesPending,
    internshipsEnCours,
    internshipsAEvaluer,
    seminarRegistrationsCount: seminarRegistrations.length,
    pendingRequestsCount: pendingRequests.length,
    alerts,
    students: students.map((s) => ({
      id: s.id,
      name: s.name,
      ccigaId: formatCcigaId(s.id),
      programName: s.program?.name ?? "—",
    })),
    teachers: Array.from(teacherMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
    coursesToReview,
  };
}
