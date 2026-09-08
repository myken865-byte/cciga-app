import Link from "next/link";
import { prisma } from "@/lib/db";
import SectorLogo from "@/components/SectorLogo";
import BackButton from "@/components/BackButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { CalendarIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

/**
 * Centre des Bulletins — hiérarchie année académique → programme → période,
 * propre à l'École Classique (voir components/AdminNav.tsx). Cette page ne
 * réimplémente pas la génération de bulletins : chaque lien mène vers
 * app/admin/documents, qui gère déjà cette logique de façon générique pour
 * l'École Classique et l'Université.
 */
export default async function AdminEcoleClassiqueBulletinsPage() {
  const [academicYears, programs] = await Promise.all([
    prisma.academicYear.findMany({
      orderBy: { startDate: "desc" },
      include: { semesters: { orderBy: { order: "asc" } } },
    }),
    prisma.program.findMany({
      where: { school: "ecole-classique" },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/ecole-classique" label="Retour à l'École Classique" />
      <AdminTitleBand
        eyebrow="CCIGA — École Classique"
        title="Centre des Bulletins — École Classique"
        trailing={<SectorLogo sector="CLASSIQUE" className="h-10 w-10 object-contain" />}
      />
      <p className="mb-6 text-sm text-muted">
        Choisissez une année académique, un programme et une période pour accéder à la génération des bulletins
        et relevés correspondants.
      </p>

      {academicYears.length === 0 && (
        <p className="text-sm text-muted">Aucune année académique pour le moment.</p>
      )}
      {programs.length === 0 && (
        <p className="text-sm text-muted">Aucun programme d&apos;École Classique pour le moment.</p>
      )}

      <div className="space-y-6">
        {academicYears.map((year) => (
          <AdminCard
            key={year.id}
            title={year.label}
            icon={CalendarIcon}
            action={year.isActive ? <span className="text-xs font-semibold text-success">Active</span> : undefined}
          >
            {year.semesters.length === 0 ? (
              <p className="text-sm text-muted">Aucune période pour cette année.</p>
            ) : programs.length === 0 ? (
              <p className="text-sm text-muted">Aucun programme d&apos;École Classique disponible.</p>
            ) : (
              <div className="space-y-4">
                {programs.map((program) => (
                  <div key={program.id}>
                    <p className="mb-1 text-sm font-medium text-foreground">{program.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {year.semesters.map((semester) => (
                        <Link
                          key={semester.id}
                          href={`/admin/documents?programId=${program.id}&semesterId=${semester.id}`}
                          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-background"
                        >
                          {semester.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        ))}
      </div>
    </AdminShell>
  );
}
