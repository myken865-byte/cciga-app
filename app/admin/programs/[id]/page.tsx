import { notFound } from "next/navigation";
import { getProgramById, getSchools, getFaculties } from "@/lib/content";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parseRoles, hasRole } from "@/lib/roles";
import EditProgramForm from "@/components/EditProgramForm";
import GenerateBadgesBulkButton from "@/components/GenerateBadgesBulkButton";

export const dynamic = "force-dynamic";

export default async function AdminProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [program, allUsers, courses, faculties, session] = await Promise.all([
    getProgramById(id),
    prisma.user.findMany(),
    prisma.course.findMany({ where: { programId: id }, include: { teacher: true } }),
    getFaculties("universite"),
    getSession(),
  ]);
  if (!program) notFound();

  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));
  const coordinators = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "COORDONNATEUR"))
    .map((u) => ({ id: u.id, name: u.name }));
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  return (
    <div>
      <div className="mx-auto max-w-xl space-y-6">
        <EditProgramForm
          program={program}
          schools={getSchools()}
          teachers={teachers}
          coordinators={coordinators}
          faculties={faculties}
          isSuperAdmin={isSuperAdmin}
        />

        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-3 font-semibold text-foreground">Badges</h2>
          <GenerateBadgesBulkButton programId={program.id} />
        </div>

        {program.teacherModel && (
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold text-foreground">Cours de cette classe</h2>
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucun cours créé pour cette classe pour le moment.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {courses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted">{c.teacher?.name ?? "Non assigné"}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
