import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramById, getSchools } from "@/lib/content";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import EditProgramForm from "@/components/EditProgramForm";

export const dynamic = "force-dynamic";

export default async function AdminProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [program, allUsers, courses] = await Promise.all([
    getProgramById(id),
    prisma.user.findMany(),
    prisma.course.findMany({ where: { programId: id }, include: { teacher: true } }),
  ]);
  if (!program) notFound();

  const teachers = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "TEACHER"))
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <div>
      <Link href="/admin/programs" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les programmes
      </Link>
      <div className="mx-auto max-w-xl space-y-6">
        <EditProgramForm program={program} schools={getSchools()} teachers={teachers} />

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
