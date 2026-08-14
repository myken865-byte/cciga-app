import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getPrograms } from "@/lib/content";
import { parseRoles, hasRole } from "@/lib/roles";
import { gradeStatusLabels, type GradeStatus } from "@/lib/universite";
import CourseContentView from "@/components/CourseContentView";
import AddCourseMaterialForm from "@/components/AddCourseMaterialForm";
import AddAssignmentForm from "@/components/AddAssignmentForm";
import RecordGradeForm from "@/components/RecordGradeForm";
import AttendanceForm from "@/components/AttendanceForm";
import EditCourseForm from "@/components/EditCourseForm";
import EvaluationCategoriesPanel from "@/components/EvaluationCategoriesPanel";
import GradeWorkflowPanel from "@/components/GradeWorkflowPanel";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      program: { include: { students: true } },
      teacher: true,
      semester: { include: { academicYear: true } },
      materials: { orderBy: { createdAt: "desc" } },
      assignments: { orderBy: { createdAt: "desc" } },
      evaluationCategories: { orderBy: { createdAt: "asc" } },
      grades: {
        include: { student: true, assignment: true, evaluationCategory: true },
        orderBy: { recordedAt: "desc" },
      },
    },
  });
  if (!course) notFound();

  const isUniversite = course.program.school === "universite";
  const students = course.program.students.map((s) => ({ id: s.id, name: s.name }));
  const assignmentOptions = course.assignments.map((a) => ({ id: a.id, title: a.title }));
  const categoryOptions = course.evaluationCategories.map((c) => ({
    id: c.id,
    name: c.name,
    weightPercent: c.weightPercent,
  }));

  const [programs, allUsers, semesters] = await Promise.all([
    getPrograms(),
    prisma.user.findMany(),
    prisma.semester.findMany({ include: { academicYear: true }, orderBy: { order: "asc" } }),
  ]);
  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));
  const semesterOptions = semesters.map((s) => ({ id: s.id, label: `${s.academicYear.label} — ${s.name}` }));

  const gradeCounts = { brouillon: 0, soumis: 0, valide: 0, publie: 0 };
  for (const g of course.grades) {
    if (g.status && g.status in gradeCounts) {
      gradeCounts[g.status as GradeStatus] += 1;
    }
  }

  return (
    <div>
      <Link href="/admin/courses" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les cours
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
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

          {isUniversite && (
            <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
              {course.semester ? `${course.semester.academicYear.label} — ${course.semester.name}` : "Aucun semestre"}
              {course.groupLabel && ` · ${course.groupLabel}`}
              {course.credits !== null && ` · ${course.credits} crédit(s)`}
              {course.coefficient !== null && ` · coefficient ${course.coefficient}`}
            </div>
          )}

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Notes enregistrées</h2>
            {course.grades.length === 0 ? (
              <p className="text-sm text-muted">Aucune note enregistrée pour ce cours.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="bg-background text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Étudiant</th>
                      <th className="px-4 py-3 font-semibold">{isUniversite ? "Catégorie" : "Devoir"}</th>
                      <th className="px-4 py-3 font-semibold">Note</th>
                      {isUniversite && <th className="px-4 py-3 font-semibold">Statut</th>}
                      <th className="px-4 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.grades.map((g) => (
                      <tr key={g.id} className="border-t border-border">
                        <td className="px-4 py-3 text-foreground">{g.student.name}</td>
                        <td className="px-4 py-3 text-muted">
                          {isUniversite ? g.evaluationCategory?.name ?? "—" : g.assignment?.title ?? "Général"}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">{g.score}/100</td>
                        {isUniversite && (
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

        <div className="space-y-6">
          <EditCourseForm
            course={{
              id: course.id,
              programId: course.programId,
              name: course.name,
              code: course.code,
              description: course.description,
              teacherId: course.teacherId,
              dayOfWeek: course.dayOfWeek,
              startTime: course.startTime,
              endTime: course.endTime,
              semesterId: course.semesterId,
              credits: course.credits,
              coefficient: course.coefficient,
              groupLabel: course.groupLabel,
            }}
            programs={programs}
            teachers={teachers}
            semesters={semesterOptions}
          />
          <AttendanceForm courseId={course.id} students={students} />
          <AddCourseMaterialForm courseId={course.id} />
          {!isUniversite && <AddAssignmentForm courseId={course.id} />}
          {isUniversite && <EvaluationCategoriesPanel courseId={course.id} categories={categoryOptions} />}
          <RecordGradeForm
            courseId={course.id}
            students={students}
            assignments={assignmentOptions}
            categories={isUniversite ? categoryOptions : undefined}
          />
          {isUniversite && (
            <GradeWorkflowPanel courseId={course.id} counts={gradeCounts} isAdmin />
          )}
        </div>
      </div>
    </div>
  );
}
