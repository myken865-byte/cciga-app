import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { gradeStatusLabels, usesGradeWorkflow, type GradeStatus } from "@/lib/universite";
import CourseContentView from "@/components/CourseContentView";
import GradeWorkflowPanel from "@/components/GradeWorkflowPanel";
import MissingGradesWarning from "@/components/MissingGradesWarning";
import { computeMissingGrades } from "@/lib/gradeCompleteness";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ResponsableCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session || !(hasRole(session.roles, "ADMIN") || hasRole(session.roles, "ACADEMIC_OFFICER"))) {
    notFound();
  }

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      program: { include: { students: true } },
      teacher: true,
      materials: { orderBy: { createdAt: "desc" } },
      assignments: {
        orderBy: { createdAt: "desc" },
        include: {
          submissions: { include: { student: true, grade: true }, orderBy: { submittedAt: "desc" } },
        },
      },
      evaluationCategories: { orderBy: { createdAt: "asc" } },
      grades: { include: { student: true, assignment: true, evaluationCategory: true }, orderBy: { recordedAt: "desc" } },
    },
  });
  if (!course || !usesGradeWorkflow(course.program.school)) notFound();

  const students = course.program.students.map((s) => ({ id: s.id, name: s.name }));
  const categoryOptions = course.evaluationCategories.map((c) => ({ id: c.id, name: c.name }));
  const missingGrades = computeMissingGrades(categoryOptions, students, course.grades);

  const [lessonModulesRaw, quizzesRaw, announcements] = await Promise.all([
    prisma.lessonModule.findMany({
      where: { courseId: id },
      include: { lessons: { orderBy: { order: "asc" }, include: { progress: true } } },
      orderBy: { order: "asc" },
    }),
    prisma.quiz.findMany({
      where: { courseId: id },
      include: {
        questions: { orderBy: { order: "asc" } },
        attempts: { include: { student: true }, orderBy: { submittedAt: "desc" } },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.courseAnnouncement.findMany({
      where: { courseId: id },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalEnrolled = students.length;

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
      completedCount: l.progress.length,
    })),
  }));

  const quizzes = quizzesRaw.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    isGraded: q.isGraded,
    maxAttempts: q.maxAttempts,
    questions: q.questions,
    attempts: q.attempts.map((att) => ({
      id: att.id,
      studentName: att.student.name,
      score: att.score,
      submittedAt: att.submittedAt,
    })),
  }));

  const assignmentsWithSubmissions = course.assignments.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    dueDate: a.dueDate,
    submissions: a.submissions.map((s) => ({
      id: s.id,
      studentName: s.student.name,
      textContent: s.textContent,
      fileUrl: s.fileUrl,
      submittedAt: s.submittedAt,
      late: s.late,
      grade: s.grade ? { score: s.grade.score } : null,
    })),
  }));

  const gradeCounts = { brouillon: 0, soumis: 0, en_verification: 0, valide: 0, publie: 0 };
  for (const g of course.grades) {
    if (g.status && g.status in gradeCounts) {
      gradeCounts[g.status as GradeStatus] += 1;
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <BackButton fallbackHref="/portail/responsable" label="Mon portail" />
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
        assignments={assignmentsWithSubmissions}
        lessonModules={lessonModules}
        showSubmissions
        quizzes={quizzes}
        showQuizAttempts
        announcements={announcements.map((a) => ({
          id: a.id,
          title: a.title,
          body: a.body,
          authorName: a.author.name,
          createdAt: a.createdAt,
        }))}
        totalEnrolled={totalEnrolled}
      />

      <div className="mt-8 space-y-4">
        <MissingGradesWarning missing={missingGrades} />
        <GradeWorkflowPanel courseId={course.id} counts={gradeCounts} canReview canPublish={false} />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Notes de la classe</h2>
        {course.grades.length === 0 ? (
          <p className="text-sm text-muted">Aucune note enregistrée pour ce cours.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Étudiant</th>
                  <th className="px-4 py-3 font-semibold">Catégorie</th>
                  <th className="px-4 py-3 font-semibold">Note</th>
                  <th className="px-4 py-3 font-semibold">Statut</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {course.grades.map((g) => (
                  <tr key={g.id} className="border-t border-row-divider">
                    <td className="px-4 py-3 text-foreground">{g.student.name}</td>
                    <td className="px-4 py-3 text-muted">{g.evaluationCategory?.name ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{g.score}/100</td>
                    <td className="px-4 py-3 text-muted">
                      {g.status ? gradeStatusLabels[g.status as GradeStatus] : "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(g.recordedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
