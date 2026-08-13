import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getPrograms } from "@/lib/content";
import { parseRoles, hasRole } from "@/lib/roles";
import CourseContentView from "@/components/CourseContentView";
import AddCourseMaterialForm from "@/components/AddCourseMaterialForm";
import AddAssignmentForm from "@/components/AddAssignmentForm";
import RecordGradeForm from "@/components/RecordGradeForm";
import AttendanceForm from "@/components/AttendanceForm";
import EditCourseForm from "@/components/EditCourseForm";

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
      materials: { orderBy: { createdAt: "desc" } },
      assignments: { orderBy: { createdAt: "desc" } },
      grades: { include: { student: true, assignment: true }, orderBy: { recordedAt: "desc" } },
    },
  });
  if (!course) notFound();

  const students = course.program.students.map((s) => ({ id: s.id, name: s.name }));
  const assignmentOptions = course.assignments.map((a) => ({ id: a.id, title: a.title }));

  const [programs, allUsers] = await Promise.all([getPrograms(), prisma.user.findMany()]);
  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));

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
                      <th className="px-4 py-3 font-semibold">Devoir</th>
                      <th className="px-4 py-3 font-semibold">Note</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.grades.map((g) => (
                      <tr key={g.id} className="border-t border-border">
                        <td className="px-4 py-3 text-foreground">{g.student.name}</td>
                        <td className="px-4 py-3 text-muted">{g.assignment?.title ?? "Général"}</td>
                        <td className="px-4 py-3 font-semibold text-foreground">{g.score}/100</td>
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
            }}
            programs={programs}
            teachers={teachers}
          />
          <AttendanceForm courseId={course.id} students={students} />
          <AddCourseMaterialForm courseId={course.id} />
          <AddAssignmentForm courseId={course.id} />
          <RecordGradeForm courseId={course.id} students={students} assignments={assignmentOptions} />
        </div>
      </div>
    </div>
  );
}
