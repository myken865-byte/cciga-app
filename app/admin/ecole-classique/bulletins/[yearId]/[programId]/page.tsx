import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { computePeriodReadiness } from "@/lib/documents";

export const dynamic = "force-dynamic";

export default async function BulletinsClassPage({
  params,
}: {
  params: Promise<{ yearId: string; programId: string }>;
}) {
  const { yearId, programId } = await params;
  const [year, program] = await Promise.all([
    prisma.academicYear.findUnique({ where: { id: yearId } }),
    prisma.program.findUnique({ where: { id: programId } }),
  ]);
  if (!year || !program || program.school !== "ecole-classique") notFound();

  const periods = await prisma.semester.findMany({
    where: { academicYearId: yearId, school: "ecole-classique" },
    orderBy: { order: "asc" },
  });

  const periodsWithStats = await Promise.all(
    periods.map(async (period) => {
      const readiness = await computePeriodReadiness(programId, period.id);
      return {
        ...period,
        total: readiness.length,
        ready: readiness.filter((r) => r.ready).length,
        generated: readiness.filter((r) => r.hasDocument).length,
      };
    }),
  );

  return (
    <div>
      <Link href={`/admin/ecole-classique/bulletins/${yearId}`} className="mb-4 inline-block text-sm text-primary hover:underline">
        ← {year.label}
      </Link>
      <h1 className="mb-1 text-2xl font-bold text-foreground">Bulletins — {program.name}</h1>
      <p className="mb-6 text-sm text-muted">{year.label}</p>

      <h2 className="mb-3 font-semibold text-foreground">Choisir une période</h2>
      {periodsWithStats.length === 0 ? (
        <div className="empty-state">
          Aucune période créée pour l&apos;École Classique en {year.label}. Créez-en une depuis « Structure — École
          Classique ».
        </div>
      ) : (
        <ul className="space-y-2">
          {periodsWithStats.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/ecole-classique/bulletins/${yearId}/${programId}/${p.id}`}
                className="card card-interactive flex items-center justify-between p-4 text-sm"
              >
                <span className="font-medium text-foreground">{p.name}</span>
                <span className="flex items-center gap-2 text-xs">
                  <span className="badge badge-neutral">{p.total} élève(s)</span>
                  <span className="badge badge-info">{p.ready} prêt(s)</span>
                  <span className="badge badge-success">{p.generated} généré(s)</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
