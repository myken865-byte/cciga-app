import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CourseContentView from "@/components/CourseContentView";
import AttendanceForm from "@/components/AttendanceForm";

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
      grades: { include: { student: true, assignment: true }, orderBy: { recordedAt: "desc" } },
    },
  });

  if (!course || course.teacherId !== session.userId) {
    notFound();
  }

  const students = course.program.students.map((s) => ({ id: s.id, name: s.name }));

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

      <div className="mt-8">
        <AttendanceForm courseId={course.id} students={students} />
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
  );
}
