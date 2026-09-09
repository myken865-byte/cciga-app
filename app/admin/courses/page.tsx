import { prisma } from "@/lib/db";
import { getPrograms } from "@/lib/content";
import { parseRoles, hasRole } from "@/lib/roles";
import CreateCourseForm from "@/components/CreateCourseForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { BookIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import CoursesTable from "@/components/admin/CoursesTable";

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
          <CoursesTable
            courses={courses.map((course) => ({
              id: course.id,
              name: course.name,
              code: course.code,
              groupLabel: course.groupLabel,
              program: { name: course.program.name },
              teacher: course.teacher ? { name: course.teacher.name } : null,
            }))}
          />
        </AdminCard>

        <CreateCourseForm programs={programs} teachers={teachers} semesters={semesterOptions} />
      </div>
    </AdminShell>
  );
}
