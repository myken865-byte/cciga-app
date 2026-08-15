import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { gradeStatusLabels, usesGradeWorkflow, type GradeStatus } from "@/lib/universite";
import CourseContentView from "@/components/CourseContentView";
import AttendanceForm from "@/components/AttendanceForm";
import AddCourseMaterialForm from "@/components/AddCourseMaterialForm";
import AddAssignmentForm from "@/components/AddAssignmentForm";
import RecordGradeForm from "@/components/RecordGradeForm";
import GradeWorkflowPanel from "@/components/GradeWorkflowPanel";
import MissingGradesWarning from "@/components/MissingGradesWarning";
import { computeMissingGrades } from "@/lib/gradeCompleteness";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function TeacherCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      program: { include: { students: true } },
      teacher: true,
      materials: { orderBy: { createdAt: "desc" } },
      assignments: { orderBy: { createdAt: "desc" } },
      evaluationCategories: { orderBy: { createdAt: "asc" } },
      grades: { include: { student: true, assignment: true, evaluationCategory: true }, orderBy: { recordedAt: "desc" } },
    },
  });

  if (!course || course.teacherId !== session.userId) {
    notFound();
  }

  const usesWorkflow = usesGradeWorkflow(course.program.school);
  const students = course.program.students.map((s) => ({ id: s.id, name: s.name }));
  const assignmentOptions = course.assignments.map((a) => ({ id: a.id, title: a.title }));
  const categoryOptions = course.evaluationCategories.map((c) => ({
    id: c.id,
    name: c.name,
    weightPercent: c.weightPercent,
  }));

  const missingGrades = usesWorkflow ? computeMissingGrades(categoryOptions, students, course.grades) : [];

  const gradeCounts = { brouillon: 0, soumis: 0, en_verification: 0, valide: 0, publie: 0 };
  for (const g of course.grades) {
    if (g.status && g.status in gradeCounts) {
      gradeCounts[g.status as GradeStatus] += 1;
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <Link href="/portail/enseignant" className="mb-6 inline-block text-sm text-primary hover:underline">
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
        assignments={course.assignments}
      />

      {usesWorkflow && categoryOptions.length > 0 && (
        <div className="mt-4 rounded-lg border border-border bg-surface p-4 text-sm">
          <p className="mb-1 font-semibold text-foreground">Catégories d&apos;évaluation</p>
          <ul className="text-muted">
            {categoryOptions.map((c) => (
              <li key={c.id}>
                {c.name} — {c.weightPercent}%
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AttendanceForm courseId={course.id} students={students} />
        <AddCourseMaterialForm courseId={course.id} />
        {!usesWorkflow && <AddAssignmentForm courseId={course.id} />}
        <RecordGradeForm
          courseId={course.id}
          students={students}
          assignments={assignmentOptions}
          categories={usesWorkflow ? categoryOptions : undefined}
        />
        {usesWorkflow && <MissingGradesWarning missing={missingGrades} />}
        {usesWorkflow && (
          <GradeWorkflowPanel courseId={course.id} counts={gradeCounts} canReview={false} canPublish={false} />
        )}
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
                  <th className="px-4 py-3 font-semibold">{usesWorkflow ? "Catégorie" : "Devoir"}</th>
                  <th className="px-4 py-3 font-semibold">Note</th>
                  {usesWorkflow && <th className="px-4 py-3 font-semibold">Statut</th>}
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {course.grades.map((g) => (
                  <tr key={g.id} className="border-t border-border">
                    <td className="px-4 py-3 text-foreground">{g.student.name}</td>
                    <td className="px-4 py-3 text-muted">
                      {usesWorkflow ? g.evaluationCategory?.name ?? "—" : g.assignment?.title ?? "Général"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">{g.score}/100</td>
                    {usesWorkflow && (
                      <td className="px-4 py-3 text-muted">
                        {g.status ? gradeStatusLabels[g.status as GradeStatus] : "—"}
                      </td>
                    )}
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
