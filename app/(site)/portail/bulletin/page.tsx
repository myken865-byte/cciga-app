import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { getSchoolBySlug } from "@/lib/content";
import { isGradeVisibleToStudent } from "@/lib/universite";
import { resolveBulletinAccess } from "@/lib/bulletinAccess";
import {
  computeFinalCourseGrade,
  computeSimpleAverage,
  computeAcademicDecision,
  academicDecisionLabels,
} from "@/lib/universiteGrades";
import { computeStudentPeriodResult } from "@/lib/periodResults";
import PeriodResultCard from "@/components/PeriodResultCard";

export const metadata: Metadata = { title: "Bulletin" };

export const dynamic = "force-dynamic";

export default async function BulletinPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string }>;
}) {
  const { student: studentParam } = await searchParams;
  const session = await getSession();
  const requestedId = studentParam ? Number(studentParam) : session?.userId ?? 0;
  const { targetId, viewerCanSeeAll } = await resolveBulletinAccess(session, requestedId);

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
          son titulaire de classe, un responsable académique ou l&apos;administration peuvent le consulter.
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
  const isEcoleProfessionnelle = student.program?.school === "ecole-professionnelle";
  const isEcoleClassique = student.program?.school === "ecole-classique";

  if (isEcoleProfessionnelle) {
    const courses = await prisma.course.findMany({
      where: { programId: student.programId! },
      include: { evaluationCategories: true },
    });
    const grades = await prisma.grade.findMany({
      where: { courseId: { in: courses.map((c) => c.id) }, studentId: student.id },
    });
    const visibleGrades = viewerCanSeeAll ? grades : grades.filter((g) => isGradeVisibleToStudent(g.status));

    const courseFinals = courses.map((course) => {
      const categories = course.evaluationCategories.map((cat) => ({
        id: cat.id,
        weightPercent: cat.weightPercent,
      }));
      const courseGrades = visibleGrades
        .filter((g) => g.courseId === course.id)
        .map((g) => ({ evaluationCategoryId: g.evaluationCategoryId, score: g.score }));
      return {
        courseId: course.id,
        courseName: course.name,
        finalGrade: computeFinalCourseGrade(courseGrades, categories),
      };
    });

    const overallAverage = computeSimpleAverage(courseFinals);
    const decision = computeAcademicDecision(overallAverage, student.program!.passingGrade);

    return (
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          Bulletin de formation professionnelle
        </p>
        <h1 className="mb-1 text-2xl font-bold text-foreground lg:text-3xl">{student.name}</h1>
        <p className="mb-8 text-sm text-muted">
          {formatCcigaId(student.id)} · {student.program!.name} — {school?.name ?? student.program!.school}
        </p>

        {courseFinals.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-6 text-center text-muted">
            Aucun cours enregistré pour le moment.
          </p>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">Moyenne générale</p>
                <p className="text-2xl font-bold text-primary">
                  {overallAverage !== null ? overallAverage.toFixed(1) : "—"}/100
                </p>
              </div>
              <span
                className={`font-semibold ${
                  decision === "reussi"
                    ? "text-emerald-600"
                    : decision === "echec"
                      ? "text-red-600"
                      : "text-muted"
                }`}
              >
                {academicDecisionLabels[decision]}
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="bg-background text-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Cours</th>
                    <th className="px-4 py-3 font-semibold">Note finale</th>
                  </tr>
                </thead>
                <tbody>
                  {courseFinals.map((c) => (
                    <tr key={c.courseId} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground">{c.courseName}</td>
                      <td className="px-4 py-3 font-semibold text-primary">
                        {c.finalGrade !== null ? `${c.finalGrade.toFixed(1)}/100` : "En attente"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {decision === "reussi" && student.program!.certification && (
              <div className="mt-6 rounded-lg border border-emerald-300 bg-emerald-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Certification délivrée
                </p>
                <p className="mt-1 text-foreground">{student.program!.certification}</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  if (isUniversite || isEcoleClassique) {
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

    const retakeCourseIds = new Set(courses.filter((c) => c.retakeOfCourseId).map((c) => c.id));

    const semesterGroups = new Map<string, typeof courses>();
    for (const c of courses) {
      if (!c.semesterId) continue;
      const list = semesterGroups.get(c.semesterId) ?? [];
      list.push(c);
      semesterGroups.set(c.semesterId, list);
    }

    const documents = await prisma.academicDocument.findMany({
      where: { studentId: student.id, programId: student.programId!, supersededBy: null },
    });
    const documentBySemester = new Map(documents.map((d) => [d.semesterId, d]));

    const weightField = isUniversite ? "credits" : "coefficient";
    const weightLabel = isUniversite ? "Crédits" : "Coefficient";

    const periodSections = Array.from(semesterGroups.entries()).map(([semesterId, semCourses]) => {
      const periodLabel = semCourses[0]?.semester
        ? `${semCourses[0].semester.academicYear.label} — ${semCourses[0].semester.name}`
        : "Période";

      const result = computeStudentPeriodResult({
        studentId: student.id,
        courses: semCourses,
        grades: visibleGrades,
        weightField,
        passingGrade: student.program!.passingGrade,
        rankingEnabled: student.program!.rankingEnabled,
        cohortIds,
      });

      const doc = documentBySemester.get(semesterId);

      return { semesterId, periodLabel, result, pdfHref: doc ? `/api/documents/${doc.id}/pdf` : undefined };
    });

    const annualAverage = computeSimpleAverage(periodSections.map((s) => ({ finalGrade: s.result.average })));

    let appreciationRow: { appreciation: string | null; conduct: string | null } | null = null;
    let absences = 0;
    let retards = 0;
    if (isEcoleClassique && periodSections.length > 0) {
      const latestSemesterId = periodSections[periodSections.length - 1].semesterId;
      const appreciation = await prisma.studentAppreciation.findUnique({
        where: { studentId_semesterId: { studentId: student.id, semesterId: latestSemesterId } },
      });
      appreciationRow = appreciation
        ? { appreciation: appreciation.appreciation, conduct: appreciation.conduct }
        : null;
      const attendances = await prisma.attendance.findMany({
        where: { studentId: student.id, courseId: { in: courses.map((c) => c.id) } },
      });
      absences = attendances.filter((a) => a.status === "absent").length;
      retards = attendances.filter((a) => a.status === "retard").length;
    }

    return (
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          {isUniversite ? "Relevé de notes universitaire" : "Bulletin scolaire"}
        </p>
        <h1 className="mb-1 text-2xl font-bold text-foreground lg:text-3xl">{student.name}</h1>
        <p className="mb-8 text-sm text-muted">
          {formatCcigaId(student.id)} · {student.program!.name} — {school?.name ?? student.program!.school}
        </p>

        {periodSections.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-6 text-center text-muted">
            Aucun cours rattaché à une période pour le moment.
          </p>
        ) : (
          <div className="space-y-8">
            {periodSections.map((sec) => (
              <PeriodResultCard
                key={sec.semesterId}
                periodLabel={sec.periodLabel}
                weightLabel={weightLabel}
                courseResults={sec.result.courseFinals.map((c) => ({
                  courseId: c.courseId,
                  courseName: c.courseName,
                  weight: c.weight,
                  finalGrade: c.finalGrade,
                  retake: isUniversite ? retakeCourseIds.has(c.courseId) : undefined,
                }))}
                average={sec.result.average}
                decisionLabel={academicDecisionLabels[sec.result.decision]}
                decisionTone={sec.result.decision}
                rank={sec.result.rank}
                rankingEnabled={student.program!.rankingEnabled}
                pdfHref={sec.pdfHref}
                extra={
                  isEcoleClassique && sec === periodSections[periodSections.length - 1] ? (
                    <div className="mt-3 space-y-1 text-sm text-muted">
                      <p>
                        Absences / Retards : {absences} / {retards}
                      </p>
                      {appreciationRow?.conduct && <p>Conduite : {appreciationRow.conduct}</p>}
                      {appreciationRow?.appreciation && <p>Appréciation : {appreciationRow.appreciation}</p>}
                    </div>
                  ) : undefined
                }
              />
            ))}
          </div>
        )}

        {periodSections.length > 0 && (
          <div className="mt-8 rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold text-foreground">
              {isUniversite ? "Relevé complet — moyenne cumulative" : "Récapitulatif annuel"}
            </h2>
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-3 py-2 font-semibold">Période</th>
                  <th className="px-3 py-2 font-semibold">Moyenne</th>
                  <th className="px-3 py-2 font-semibold">Décision</th>
                </tr>
              </thead>
              <tbody>
                {periodSections.map((sec) => (
                  <tr key={sec.semesterId} className="border-t border-border">
                    <td className="px-3 py-2 text-foreground">{sec.periodLabel}</td>
                    <td className="px-3 py-2 text-muted">
                      {sec.result.average !== null ? `${sec.result.average.toFixed(1)}/100` : "—"}
                    </td>
                    <td className="px-3 py-2 text-muted">{academicDecisionLabels[sec.result.decision]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-muted">
              Moyenne {isUniversite ? "cumulative" : "annuelle"} :{" "}
              <span className="font-semibold text-primary">
                {annualAverage !== null ? annualAverage.toFixed(1) : "—"}/100
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center lg:px-6">
      <p className="text-muted">Aucun programme rattaché à ce compte.</p>
    </div>
  );
}
