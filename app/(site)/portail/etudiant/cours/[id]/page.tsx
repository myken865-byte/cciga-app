import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CourseContentView from "@/components/CourseContentView";
import { attendanceStatusLabels, isAttendanceStatus } from "@/lib/attendance";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function StudentCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      program: true,
      teacher: true,
      materials: { orderBy: { createdAt: "desc" } },
      assignments: { orderBy: { createdAt: "desc" } },
      lessonModules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
      quizzes: {
        orderBy: { createdAt: "asc" },
        include: { questions: { orderBy: { order: "asc" } } },
      },
      announcements: {
        orderBy: { createdAt: "desc" },
        include: { author: true },
      },
    },
  });

  if (!course || !user?.programId || course.programId !== user.programId) {
    notFound();
  }

  const assignmentIds = course.assignments.map((a) => a.id);
  const mySubmissions = assignmentIds.length
    ? await prisma.submission.findMany({
        where: { assignmentId: { in: assignmentIds }, studentId: user.id },
        include: { grade: true },
      })
    : [];
  const submissionByAssignment = new Map(mySubmissions.map((s) => [s.assignmentId, s]));
  const assignmentsForView = course.assignments.map((a) => {
    const submission = submissionByAssignment.get(a.id);
    return {
      ...a,
      submission: submission
        ? {
            textContent: submission.textContent,
            fileUrl: submission.fileUrl,
            submittedAt: submission.submittedAt,
            late: submission.late,
            // Only surface the grade once it has cleared the same publication gate as
            // "Mes notes" below (status null = classic non-workflow note, or "publie").
            // A brouillon/soumis/en_verification grade must stay invisible to the
            // student until an admin publishes it, exactly like every other grade.
            grade:
              submission.grade && (submission.grade.status === null || submission.grade.status === "publie")
                ? { score: submission.grade.score }
                : null,
          }
        : null,
    };
  });

  const quizIds = course.quizzes.map((q) => q.id);
  const myAttempts = quizIds.length
    ? await prisma.quizAttempt.findMany({
        where: { quizId: { in: quizIds }, studentId: user.id },
        orderBy: { startedAt: "desc" },
      })
    : [];
  const attemptsByQuiz = new Map<string, typeof myAttempts>();
  for (const att of myAttempts) {
    const list = attemptsByQuiz.get(att.quizId) ?? [];
    list.push(att);
    attemptsByQuiz.set(att.quizId, list);
  }
  const quizzesForView = course.quizzes.map((q) => ({
    ...q,
    // Never send correctAnswer to the student before they submit — CourseContentView
    // passes this array as a prop into the client-side TakeQuizForm, and any field
    // present here would be serialized into the page and visible in dev tools.
    questions: q.questions.map((question) => ({
      id: question.id,
      type: question.type,
      prompt: question.prompt,
      options: question.options,
      order: question.order,
    })),
    myAttempts: (attemptsByQuiz.get(q.id) ?? []).map((att) => ({
      id: att.id,
      score: att.score,
      submittedAt: att.submittedAt,
    })),
  }));

  const lessonIds = course.lessonModules.flatMap((m) => m.lessons.map((l) => l.id));
  const progressRows = lessonIds.length
    ? await prisma.lessonProgress.findMany({ where: { studentId: user.id, lessonId: { in: lessonIds } } })
    : [];
  const completedLessonIds = new Set(progressRows.map((p) => p.lessonId));
  const lessonModulesWithProgress = course.lessonModules.map((m) => ({
    ...m,
    lessons: m.lessons.map((l) => ({ ...l, completed: completedLessonIds.has(l.id) })),
  }));

  const grades = await prisma.grade.findMany({
    where: {
      courseId: id,
      studentId: user.id,
      OR: [{ status: null }, { status: "publie" }],
    },
    include: { assignment: true, evaluationCategory: true },
    orderBy: { recordedAt: "desc" },
  });

  const attendances = await prisma.attendance.findMany({
    where: { courseId: id, studentId: user.id },
    orderBy: { date: "desc" },
  });

  const announcementsForView = course.announcements.map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    authorName: a.author.name,
    createdAt: a.createdAt,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <Link href="/portail/etudiant" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Mon portail
      </Link>
      <CourseContentView
        course={{
          name: course.name,
          code: course.code,
          description: course.description,
          programName: course.program.name,
          teacherName: course.teacher?.name,
          dayOfWeek: course.dayOfWeek,
          startTime: course.startTime,
          endTime: course.endTime,
        }}
        materials={course.materials}
        assignments={assignmentsForView}
        lessonModules={lessonModulesWithProgress}
        showLessonProgress
        canSubmitAssignments
        quizzes={quizzesForView}
        canTakeQuizzes
        announcements={announcementsForView}
      />

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Mes présences</h2>
        {attendances.length === 0 ? (
          <p className="text-sm text-muted">Aucune présence enregistrée pour ce cours pour le moment.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((a) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="px-4 py-3 text-muted">{formatDate(a.date)}</td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {isAttendanceStatus(a.status) ? attendanceStatusLabels[a.status] : a.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Mes notes</h2>
        {grades.length === 0 ? (
          <p className="text-sm text-muted">Aucune note enregistrée pour ce cours pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {grades.map((g) => (
              <div key={g.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    {g.assignment?.title ?? g.evaluationCategory?.name ?? "Note générale"}
                  </span>
                  <span className="font-semibold text-primary">{g.score}/100</span>
                </div>
                {g.comment && <p className="mt-1 text-sm text-muted">{g.comment}</p>}
                <p className="mt-1 text-xs text-muted">{formatDate(g.recordedAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
