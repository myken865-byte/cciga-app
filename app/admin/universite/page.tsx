import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import CreateFacultyForm from "@/components/CreateFacultyForm";
import CreateAcademicYearForm from "@/components/CreateAcademicYearForm";
import CreateSemesterForm from "@/components/CreateSemesterForm";
import SectorLogo from "@/components/SectorLogo";
import AssignDoyenForm from "@/components/AssignDoyenForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { BookIcon, CalendarIcon, ClipboardIcon } from "@/components/icons";
import AuditLogTable from "@/components/admin/AuditLogTable";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

export default async function AdminUniversitePage() {
  const [faculties, academicYears, auditLogs, allUsers] = await Promise.all([
    prisma.faculty.findMany({ where: { school: "universite" }, orderBy: { name: "asc" } }),
    prisma.academicYear.findMany({
      orderBy: { startDate: "desc" },
      include: { semesters: { orderBy: { order: "asc" } } },
    }),
    prisma.auditLog.findMany({
      where: { entityType: { in: ["Program", "Grade"] } },
      include: { actor: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.user.findMany(),
  ]);
  const doyenCandidates = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "DOYEN"))
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — Structure académique"
        title="Structure académique — Université"
        trailing={<SectorLogo sector="UNIVERSITE" className="h-10 w-10 object-contain" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard title="Facultés / domaines" icon={BookIcon}>
          <div className="space-y-3">
            {faculties.length === 0 ? (
              <p className="text-sm text-muted">Aucune faculté pour le moment.</p>
            ) : (
              <ul className="space-y-1 rounded-lg border border-border p-3 text-sm">
                {faculties.map((f) => (
                  <li key={f.id} className="text-foreground">
                    {f.name}
                    <AssignDoyenForm facultyId={f.id} currentDoyenId={f.doyenId} candidates={doyenCandidates} />
                  </li>
                ))}
              </ul>
            )}
            <CreateFacultyForm />
          </div>
        </AdminCard>

        <AdminCard title="Années académiques & semestres" icon={CalendarIcon}>
          <div className="space-y-3">
            {academicYears.length === 0 ? (
              <p className="text-sm text-muted">Aucune année académique pour le moment.</p>
            ) : (
              <div className="space-y-2">
                {academicYears.map((y) => (
                  <div key={y.id} className="rounded-lg border border-border p-3 text-sm">
                    <p className="font-medium text-foreground">
                      {y.label} {y.isActive && <span className="text-xs text-emerald-600">(active)</span>}
                    </p>
                    <ul className="mt-1 text-muted">
                      {y.semesters.map((s) => (
                        <li key={s.id}>{s.name}</li>
                      ))}
                      {y.semesters.length === 0 && <li>Aucun semestre.</li>}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <CreateAcademicYearForm />
            <CreateSemesterForm academicYears={academicYears.map((y) => ({ id: y.id, label: y.label }))} />
          </div>
        </AdminCard>

        <AdminCard title="Journal d'audit (50 dernières entrées)" icon={ClipboardIcon}>
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
