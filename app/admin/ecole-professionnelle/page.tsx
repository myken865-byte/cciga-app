import { prisma } from "@/lib/db";
import CreateAcademicYearForm from "@/components/CreateAcademicYearForm";
import CreateSemesterForm from "@/components/CreateSemesterForm";
import SectorLogo from "@/components/SectorLogo";
import { AdminShell, AdminTitleBand, AdminCard, AdminTile } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { CalendarIcon, ClockIcon } from "@/components/icons";
import AuditLogTable from "@/components/admin/AuditLogTable";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

export default async function AdminEcoleProfessionnellePage() {
  const [academicYears, auditLogs] = await Promise.all([
    prisma.academicYear.findMany({
      orderBy: { startDate: "desc" },
      include: { semesters: { orderBy: { order: "asc" } } },
    }),
    prisma.auditLog.findMany({
      where: { entityType: { in: ["Program", "Grade", "AcademicDocument"] } },
      include: { actor: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — École Professionnelle"
        title="Structure académique — École Professionnelle"
        trailing={<SectorLogo sector="PROFESSIONNELLE" className="h-10 w-10 object-contain" />}
      />
      <p className="mb-6 text-sm text-muted">
        Les années académiques et périodes sont partagées avec les autres institutions — créez ici les périodes
        (trimestres/semestres) propres à l&apos;École Professionnelle, avec le libellé de votre choix.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Années académiques & périodes" icon={CalendarIcon}>
          <div className="space-y-3">
            {academicYears.length === 0 ? (
              <p className="text-sm text-muted">Aucune année académique pour le moment.</p>
            ) : (
              <div className="space-y-2">
                {academicYears.map((y) => (
                  <AdminTile key={y.id}>
                    <p className="font-medium text-foreground">
                      {y.label} {y.isActive && <span className="text-xs text-emerald-600">(active)</span>}
                    </p>
                    <ul className="mt-1 text-sm text-muted">
                      {y.semesters.map((s) => (
                        <li key={s.id}>{s.name}</li>
                      ))}
                      {y.semesters.length === 0 && <li>Aucune période.</li>}
                    </ul>
                  </AdminTile>
                ))}
              </div>
            )}
            <CreateAcademicYearForm />
            <CreateSemesterForm academicYears={academicYears.map((y) => ({ id: y.id, label: y.label }))} />
          </div>
        </AdminCard>

        <AdminCard title="Journal d'audit (50 dernières entrées)" icon={ClockIcon}>
          <div className="max-h-[600px] overflow-y-auto">
            <AuditLogTable
              showEntityId={false}
              logs={auditLogs.map((log) => ({
                id: log.id,
                createdAt: formatDateTime(log.createdAt),
                entityType: log.entityType,
                entityId: log.entityId,
                action: log.action,
                actorName: log.actor?.name ?? null,
              }))}
            />
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
