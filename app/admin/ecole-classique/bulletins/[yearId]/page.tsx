import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BulletinsYearPage({
  params,
}: {
  params: Promise<{ yearId: string }>;
}) {
  const { yearId } = await params;
  const year = await prisma.academicYear.findUnique({ where: { id: yearId } });
  if (!year) notFound();

  const [programs, periodsThisYear] = await Promise.all([
    prisma.program.findMany({ where: { school: "ecole-classique" }, orderBy: { name: "asc" } }),
    prisma.semester.findMany({ where: { academicYearId: yearId, school: "ecole-classique" } }),
  ]);
  const periodIds = periodsThisYear.map((p) => p.id);

  // Classes réellement actives cette année scolaire : au moins un cours
  // rattaché à l'une des périodes de cette année.
  const activeCourses =
    periodIds.length > 0
      ? await prisma.course.findMany({ where: { semesterId: { in: periodIds } }, select: { programId: true } })
      : [];
  const activeProgramIds = new Set(activeCourses.map((c) => c.programId));

  return (
    <div>
      <Link href="/admin/ecole-classique/bulletins" className="mb-4 inline-block text-sm text-primary hover:underline">
        ← Toutes les années
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Bulletins — {year.label}</h1>

      <h2 className="mb-3 font-semibold text-foreground">Choisir un niveau / une classe</h2>
      {programs.length === 0 ? (
        <div className="empty-state">Aucune classe configurée pour l&apos;École Classique.</div>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/ecole-classique/bulletins/${yearId}/${p.id}`}
                className="card card-interactive flex items-center justify-between p-3.5 text-sm"
              >
                <span className="font-medium text-foreground">{p.name}</span>
                {!activeProgramIds.has(p.id) && (
                  <span className="text-xs text-muted">Aucun cours cette année</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
