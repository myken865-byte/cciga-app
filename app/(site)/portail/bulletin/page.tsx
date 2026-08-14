import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { getSchoolBySlug } from "@/lib/content";
import { isGradeVisibleToStudent } from "@/lib/universite";
import {
  computeFinalCourseGrade,
  computeSemesterAverage,
  computeAcademicDecision,
  rankStudents,
  academicDecisionLabels,
} from "@/lib/universiteGrades";

export const metadata: Metadata = { title: "Bulletin" };

export const dynamic = "force-dynamic";

export default async function BulletinPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string }>;
}) {
  const { student: studentParam } = await searchParams;
  const session = await getSession();

  let targetId: number | null = null;
  let viewerCanSeeAll = false;
  if (session) {
    const requestedId = studentParam ? Number(studentParam) : session.userId;
    if (hasRole(session.roles, "ADMIN")) {
      if (requestedId) targetId = requestedId;
      viewerCanSeeAll = true;
    } else if (requestedId === session.userId) {
      targetId = requestedId;
    } else if (hasRole(session.roles, "PARENT")) {
      const child = await prisma.user.findFirst({
        where: { id: requestedId, parentId: session.userId },
      });
      if (child) targetId = requestedId;
    } else if (hasRole(session.roles, "TEACHER")) {
      const student = await prisma.user.findUnique({
        where: { id: requestedId },
        include: { program: true },
      });
      if (student?.program?.titulaireId === session.userId) {
        targetId = requestedId;
        viewerCanSeeAll = true;
      }
    }
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center lg:px-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Bulletin</h1>
        <p className="text-muted">
          Connectez-vous à votre compte CCIGA ID pour consulter un bulletin.
        </p>
        <Link href="/login" className="mt-4 inline-block text-primary hover:underline">
          Se connecter →
        </Link>
      </div>
    );
  }

  if (targetId === null) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center lg:px-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Bulletin</h1>
        <p className="text-muted">
          Vous n&apos;avez pas accès à ce bulletin. Seul l&apos;élève concerné, ses parents liés,
          son titulaire de classe ou l&apos;administration peuvent le consulter.
        </p>
      </div>
    );
  }

  const student = await prisma.user.findUnique({ where: { id: targetId }, include: { program: true } });
  if (!student) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center lg:px-6">
        <p className="text-muted">Élève introuvable.</p>
      </div>
    );
  }

  const school = student.program ? getSchoolBySlug(student.program.school) : undefined;
  const isUniversite = student.program?.school === "universite";

  if (!isUniversite) {
    const grades = await prisma.grade.findMany({
      where: { studentId: targetId },
      include: { course: true, assignment: true },
      orderBy: { recordedAt: "asc" },
    });

    const byCourse = new Map<string, { name: string; grades: typeof grades }>();
    for (const g of grades) {
      const entry = byCourse.get(g.courseId) ?? { name: g.course.name, grades: [] };
      entry.grades.push(g);
      byCourse.set(g.courseId, entry);
    }
    const courseSummaries = Array.from(byCourse.values()).map((c) => ({
      ...c,
      average: c.grades.reduce((sum, g) => sum + g.score, 0) / c.grades.length,
    }));
    const overallAverage =
      grades.length > 0 ? grades.reduce((sum, g) => sum + g.score, 0) / grades.length : null;

    return (
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Bulletin</p>
        <h1 className="mb-1 text-2xl font-bold text-foreground lg:text-3xl">{student.name}</h1>
        <p className="mb-8 text-sm text-muted">
          {formatCcigaId(student.id)}
          {student.program && (
            <>
              {" · "}
              {student.program.name} — {school?.name ?? student.program.school}
            </>
          )}
        </p>

        {courseSummaries.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-6 text-center text-muted">
            Aucune note enregistrée pour le moment.
          </p>
        ) : (
          <>
            <div className="mb-6 rounded-lg border border-border bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">Moyenne générale</p>
              <p className="text-2xl font-bold text-primary">
                {overallAverage !== null ? overallAverage.toFixed(1) : "—"}/100
              </p>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="bg-background text-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Cours</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                    <th className="px-4 py-3 font-semibold">Moyenne</th>
                  </tr>
                </thead>
                <tbody>
                  {courseSummaries.map((c) => (
                    <tr key={c.name} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                      <td className="px-4 py-3 text-muted">
                        {c.grades
                          .map((g) => `${g.score}${g.assignment ? ` (${g.assignment.title})` : ""}`)
                          .join(", ")}
                      </td>
                      <td className="px-4 py-3 font-semibold text-primary">{c.average.toFixed(1)}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    );
  }

  // Université: bulletin per semester, with weighted final grades, semester average, decision and rank.
  const cohort = await prisma.user.findMany({ where: { programId: student.programId! } });
  const cohortIds = cohort.map((u) => u.id);

  const courses = await prisma.course.findMany({
    where: { programId: student.programId! },
    include: { semester: { include: { academicYear: true } }, evaluationCategories: true },
  });

  const allGrades = await prisma.grade.findMany({
    where: { courseId: { in: courses.map((c) => c.id) }, studentId: { in: cohortIds } },
  });

  const visibleGrades = viewerCanSeeAll
    ? allGrades
    : allGrades.filter((g) => isGradeVisibleToStudent(g.status));

  const semesterGroups = new Map<string, typeof courses>();
  for (const c of courses) {
    if (!c.semesterId) continue;
    const list = semesterGroups.get(c.semesterId) ?? [];
    list.push(c);
    semesterGroups.set(c.semesterId, list);
  }

  const semesterSections = Array.from(semesterGroups.entries()).map(([semesterId, semCourses]) => {
    const semesterLabel = semCourses[0]?.semester
      ? `${semCourses[0].semester.academicYear.label} — ${semCourses[0].semester.name}`
      : "Semestre";

    function courseFinalsFor(studentId: number) {
      return semCourses.map((course) => {
        const categories = course.evaluationCategories.map((cat) => ({
          id: cat.id,
          weightPercent: cat.weightPercent,
        }));
        const grades = visibleGrades
          .filter((g) => g.courseId === course.id && g.studentId === studentId)
          .map((g) => ({ evaluationCategoryId: g.evaluationCategoryId, score: g.score }));
        return {
          courseId: course.id,
          courseName: course.name,
          finalGrade: computeFinalCourseGrade(grades, categories),
          credits: course.credits ?? 0,
        };
      });
    }

    const studentCourseFinals = courseFinalsFor(student.id);
    const semesterAverage = computeSemesterAverage(studentCourseFinals);
    const decision = computeAcademicDecision(semesterAverage, student.program!.passingGrade);

    let rank: number | null = null;
    if (viewerCanSeeAll) {
      const cohortAverages = cohort.map((u) => ({
        studentId: u.id,
        average: computeSemesterAverage(courseFinalsFor(u.id)),
      }));
      const ranked = rankStudents(cohortAverages);
      rank = ranked.find((r) => r.studentId === student.id)?.rank ?? null;
    }

    return { semesterId, semesterLabel, courseFinals: studentCourseFinals, semesterAverage, decision, rank };
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Bulletin universitaire</p>
      <h1 className="mb-1 text-2xl font-bold text-foreground lg:text-3xl">{student.name}</h1>
      <p className="mb-8 text-sm text-muted">
        {formatCcigaId(student.id)} · {student.program!.name} — {school?.name ?? student.program!.school}
      </p>

      {semesterSections.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-muted">
          Aucun cours rattaché à un semestre pour le moment.
        </p>
      ) : (
        <div className="space-y-8">
          {semesterSections.map((sec) => (
            <div key={sec.semesterId} className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold text-foreground">{sec.semesterLabel}</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted">
                    Moyenne :{" "}
                    <span className="font-semibold text-primary">
                      {sec.semesterAverage !== null ? sec.semesterAverage.toFixed(1) : "—"}/100
                    </span>
                  </span>
                  <span
                    className={`font-semibold ${
                      sec.decision === "reussi"
                        ? "text-emerald-600"
                        : sec.decision === "echec"
                          ? "text-red-600"
                          : "text-muted"
                    }`}
                  >
                    {academicDecisionLabels[sec.decision]}
                  </span>
                  {sec.rank !== null && <span className="text-muted">Rang : {sec.rank}</span>}
                </div>
              </div>

              <table className="w-full text-left text-sm">
                <thead className="bg-background text-muted">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Cours</th>
                    <th className="px-3 py-2 font-semibold">Crédits</th>
                    <th className="px-3 py-2 font-semibold">Note finale</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.courseFinals.map((c) => (
                    <tr key={c.courseId} className="border-t border-border">
                      <td className="px-3 py-2 text-foreground">{c.courseName}</td>
                      <td className="px-3 py-2 text-muted">{c.credits}</td>
                      <td className="px-3 py-2 font-semibold text-primary">
                        {c.finalGrade !== null ? `${c.finalGrade.toFixed(1)}/100` : "En attente"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {semesterSections.length > 0 && (
        <div className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-3 font-semibold text-foreground">Relevé de notes</h2>
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-3 py-2 font-semibold">Semestre</th>
                <th className="px-3 py-2 font-semibold">Moyenne</th>
                <th className="px-3 py-2 font-semibold">Décision</th>
              </tr>
            </thead>
            <tbody>
              {semesterSections.map((sec) => (
                <tr key={sec.semesterId} className="border-t border-border">
                  <td className="px-3 py-2 text-foreground">{sec.semesterLabel}</td>
                  <td className="px-3 py-2 text-muted">
                    {sec.semesterAverage !== null ? `${sec.semesterAverage.toFixed(1)}/100` : "—"}
                  </td>
                  <td className="px-3 py-2 text-muted">{academicDecisionLabels[sec.decision]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
