import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
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
      assignments: {
        orderBy: { createdAt: "desc" },
        include: {
          submissions: { where: { studentId: session.userId }, include: { grade: true } },
        },
      },
    },
  });

  if (!course || !user?.programId || course.programId !== user.programId) {
    notFound();
  }

  const [lessonModulesRaw, quizzesRaw, announcements] = await Promise.all([
    prisma.lessonModule.findMany({
      where: { courseId: id },
      include: { lessons: { orderBy: { order: "asc" }, include: { progress: { where: { studentId: user.id } } } } },
      orderBy: { order: "asc" },
    }),
    prisma.quiz.findMany({
      where: { courseId: id },
      include: {
        questions: { orderBy: { order: "asc" } },
        attempts: { where: { studentId: user.id }, orderBy: { submittedAt: "desc" } },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.courseAnnouncement.findMany({
      where: { courseId: id },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const lessonModules = lessonModulesRaw.map((mod) => ({
    id: mod.id,
    title: mod.title,
    order: mod.order,
    lessons: mod.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      order: l.order,
      contentType: l.contentType,
      body: l.body,
      fileUrl: l.fileUrl,
      videoUrl: l.videoUrl,
      completed: l.progress.length > 0,
    })),
  }));

  const quizzes = quizzesRaw.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    isGraded: q.isGraded,
    maxAttempts: q.maxAttempts,
    questions: q.questions,
    myAttempts: q.attempts.map((att) => ({ id: att.id, score: att.score, submittedAt: att.submittedAt })),
  }));

  const assignmentsWithSubmission = course.assignments.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    dueDate: a.dueDate,
    submission: a.submissions[0]
      ? {
          textContent: a.submissions[0].textContent,
          fileUrl: a.submissions[0].fileUrl,
          submittedAt: a.submissions[0].submittedAt,
          late: a.submissions[0].late,
          grade: a.submissions[0].grade ? { score: a.submissions[0].grade.score } : null,
        }
      : null,
  }));

  const grades = await prisma.grade.findMany({
    where: {
      courseId: id,
      studentId: user.id,
      OR: [{ status: null }, { status: "publie" }],
    },
    include: { assignment: true },
    orderBy: { recordedAt: "desc" },
  });

  const attendances = await prisma.attendance.findMany({
    where: { courseId: id, studentId: user.id },
    orderBy: { date: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <BackButton fallbackHref="/portail/etudiant" label="Mon portail" />
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
        assignments={assignmentsWithSubmission}
        lessonModules={lessonModules}
        showLessonProgress
        canSubmitAssignments
        quizzes={quizzes}
        canTakeQuizzes
        announcements={announcements.map((a) => ({
          id: a.id,
          title: a.title,
          body: a.body,
          authorName: a.author.name,
          createdAt: a.createdAt,
        }))}
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
                    {g.assignment?.title ?? "Note générale"}
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
