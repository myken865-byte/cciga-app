import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { schoolKeys, schoolLabels, type SchoolKey } from "@/lib/institutions";
import { getActiveSchool } from "@/lib/institutionContext";
import AdminCommandCenter, { type EnvironmentStats } from "@/components/AdminCommandCenter";

export const dynamic = "force-dynamic";

const FINAL_ADMISSION_STATUSES = ["admis", "rejete"];

export default async function AdminCentreDeCommandementPage() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const [
    allPrograms,
    allUsers,
    allPayments,
    allAdmissions,
    allAttendanceToday,
    allPendingGrades,
    allSnapshots,
    allAcademicYears,
  ] = await Promise.all([
    prisma.program.findMany(),
    prisma.user.findMany({
      include: { program: true, coursesTaught: { include: { program: true } } },
    }),
    prisma.payment.findMany({ include: { student: { include: { program: true } } } }),
    prisma.admissionSubmission.findMany({ select: { school: true, status: true, submittedAt: true } }),
    prisma.attendance.findMany({
      where: { date: { gte: todayStart, lt: todayEnd } },
      include: { course: { include: { program: true } } },
    }),
    prisma.grade.findMany({
      where: { status: { in: ["soumis", "en_verification"] } },
      include: { course: { include: { program: true } } },
    }),
    prisma.enrollmentSnapshot.findMany({ include: { program: true, academicYear: true } }),
    prisma.academicYear.findMany({ orderBy: { startDate: "asc" } }),
  ]);

  const yearOrder = new Map(allAcademicYears.map((y, i) => [y.label, i]));

  function statsFor(schoolFilter: SchoolKey | null): EnvironmentStats {
    const programsInScope = schoolFilter ? allPrograms.filter((p) => p.school === schoolFilter) : allPrograms;

    const studentsInScope = allUsers.filter(
      (u) => hasRole(parseRoles(u.roles), "STUDENT") && (!schoolFilter || u.program?.school === schoolFilter),
    );
    const teachersInScope = allUsers.filter((u) => {
      if (!hasRole(parseRoles(u.roles), "TEACHER")) return false;
      if (!schoolFilter) return true;
      return u.coursesTaught.some((c) => c.program?.school === schoolFilter);
    });

    const attendanceInScope = allAttendanceToday.filter(
      (a) => !schoolFilter || a.course.program?.school === schoolFilter,
    );
    const presentToday = attendanceInScope.filter((a) => a.status === "present").length;
    const absentToday = attendanceInScope.filter((a) => a.status === "absent").length;
    const retardToday = attendanceInScope.filter((a) => a.status === "retard").length;

    const pendingGradesCount = allPendingGrades.filter(
      (g) => !schoolFilter || g.course.program?.school === schoolFilter,
    ).length;

    const paidByStudentId = new Map<number, number>();
    for (const p of allPayments) {
      if (schoolFilter && p.student.program?.school !== schoolFilter) continue;
      paidByStudentId.set(p.studentId, (paidByStudentId.get(p.studentId) ?? 0) + p.amount);
    }
    let totalPaid = 0;
    let totalExpected = 0;
    let balanceOutstanding = 0;
    for (const s of studentsInScope) {
      const fee = s.program?.tuitionFee ?? 0;
      const paid = paidByStudentId.get(s.id) ?? 0;
      totalExpected += fee;
      totalPaid += paid;
      balanceOutstanding += Math.max(fee - paid, 0);
    }

    const admissionsInScope = allAdmissions.filter((a) => !schoolFilter || a.school === schoolFilter);
    const admissionsPending = admissionsInScope.filter((a) => !FINAL_ADMISSION_STATUSES.includes(a.status)).length;
    const admissionYearCounts = new Map<number, number>();
    for (const a of admissionsInScope) {
      const year = a.submittedAt.getFullYear();
      admissionYearCounts.set(year, (admissionYearCounts.get(year) ?? 0) + 1);
    }
    const admissionsByYear = [...admissionYearCounts.entries()]
      .sort(([a], [b]) => a - b)
      .map(([year, count]) => ({ year, count }));

    const snapshotsInScope = allSnapshots.filter((s) => !schoolFilter || s.program.school === schoolFilter);
    const enrollmentByLabel = new Map<string, number>();
    for (const s of snapshotsInScope) {
      enrollmentByLabel.set(s.academicYear.label, (enrollmentByLabel.get(s.academicYear.label) ?? 0) + s.studentCount);
    }
    const enrollmentByYear = [...enrollmentByLabel.entries()]
      .sort(([a], [b]) => (yearOrder.get(a) ?? 0) - (yearOrder.get(b) ?? 0))
      .map(([label, count]) => ({ label, count }));

    return {
      programsCount: programsInScope.length,
      studentsCount: studentsInScope.length,
      teachersCount: teachersInScope.length,
      presentToday,
      absentToday,
      retardToday,
      pendingGradesCount,
      totalPaid,
      totalExpected,
      balanceOutstanding,
      admissionsPending,
      admissionsByYear,
      enrollmentByYear,
    };
  }

  const global = statsFor(null);
  const environments = schoolKeys.map((key) => ({
    key,
    label: schoolLabels[key],
    stats: statsFor(key),
  }));
  const activeAcademicYear = allAcademicYears.find((y) => y.isActive) ?? null;
  const initialScope = await getActiveSchool();

  return (
    <AdminCommandCenter
      global={global}
      environments={environments}
      activeAcademicYearLabel={activeAcademicYear?.label ?? null}
      initialScope={initialScope}
    />
  );
}
