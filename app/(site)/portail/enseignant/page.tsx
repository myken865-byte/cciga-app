import type { Metadata } from "next";
import Link from "next/link";
import PortalHeader from "@/components/PortalHeader";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { prisma } from "@/lib/db";
import { hasSchedule, formatSchedule } from "@/lib/schedule";

export const metadata: Metadata = { title: "Portail Enseignant" };

export const dynamic = "force-dynamic";

export default async function PortailEnseignantPage() {
  const session = await getSession();

  const courses = session
    ? await prisma.course.findMany({
        where: { teacherId: session.userId },
        include: { program: true, materials: true },
      })
    : [];

  const titulaireOf = session
    ? await prisma.program.findMany({
        where: { titulaireId: session.userId },
        include: { students: true },
      })
    : [];

  const scheduledCourses = courses
    .filter(hasSchedule)
    .sort((a, b) => (a.dayOfWeek! - b.dayOfWeek!) || a.startTime!.localeCompare(b.startTime!));

  return (
    <div>
      <PortalHeader
        title="Portail Enseignant"
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
      {session && (
        <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
          {titulaireOf.length > 0 && (
            <div className="mb-4 rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
                Mes classes (titulaire)
              </h2>
              <ul className="space-y-2">
                {titulaireOf.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/portail/enseignant/classe/${p.id}`}
                      className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:border-primary"
                    >
                      <span className="font-medium text-foreground">{p.name}</span>
                      <span className="text-muted">{p.students.length} élève(s)</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Mes cours
            </h2>
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucun cours ne vous est assigné pour le moment.</p>
            ) : (
              <ul className="space-y-2">
                {courses.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/portail/enseignant/cours/${c.id}`}
                      className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:border-primary"
                    >
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-muted">
                        {c.program.name} · {c.materials.length} contenu(s)
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Mon emploi du temps
            </h2>
            {scheduledCourses.length === 0 ? (
              <p className="text-sm text-muted">Aucun horaire renseigné pour vos cours pour le moment.</p>
            ) : (
              <ul className="space-y-2">
                {scheduledCourses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="text-muted">{formatSchedule(c)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
