import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPrograms } from "@/lib/content";
import { parseRoles, hasRole } from "@/lib/roles";
import CreateCourseForm from "@/components/CreateCourseForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { BookIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const [courses, programs, users, semesters] = await Promise.all([
    prisma.course.findMany({ include: { program: true, teacher: true }, orderBy: { createdAt: "asc" } }),
    getPrograms(),
    prisma.user.findMany(),
    prisma.semester.findMany({ include: { academicYear: true }, orderBy: { order: "asc" } }),
  ]);

  const teachers = users
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));

  const semesterOptions = semesters.map((s) => ({ id: s.id, label: `${s.academicYear.label} — ${s.name}` }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Offre académique" title="Cours" />

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard title="Liste des cours" icon={BookIcon} className="lg:col-span-2">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 font-semibold">Cours</th>
                  <th className="px-4 py-3 font-semibold">Code</th>
                  <th className="px-4 py-3 font-semibold">Enseignant</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-t border-row-divider">
                    <td className="px-4 py-3 text-muted">{course.program.name}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/courses/${course.id}`} className="font-medium text-primary hover:underline">
                        {course.name}
                        {course.groupLabel && ` (${course.groupLabel})`}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{course.code ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">{course.teacher?.name ?? "Non assigné"}</td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted">
                      Aucun cours pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <CreateCourseForm programs={programs} teachers={teachers} semesters={semesterOptions} />
      </div>
    </AdminShell>
  );
}
