import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import InfirmaryVisitForm from "@/components/InfirmaryVisitForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { AlertIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

// Phase C3 (2026-09-08) : cloisonnement réel — InfirmaryVisit.school
// (Phase C1/C2). Dossier confidentiel de santé, cloisonnement d'autant plus
// nécessaire ; aucun passage n'apparaît hors de son institution.
export default async function AdminInfirmeriePage() {
  const activeSchool = await getActiveSchool();

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Santé scolaire" title="Infirmerie" />
        <div className="empty-state">
          L&apos;infirmerie est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const [visits, users] = await Promise.all([
    prisma.infirmaryVisit.findMany({
      where: { school: activeSchool },
      include: { student: true, recordedBy: true },
      orderBy: { visitDate: "desc" },
    }),
    prisma.user.findMany({ include: { program: true } }),
  ]);

  const students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT") && u.program?.school === activeSchool)
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Santé scolaire" title={`Infirmerie — ${schoolLabels[activeSchool]}`} />

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard title="Passages enregistrés" icon={AlertIcon} className="lg:col-span-2">
          <div className="space-y-3">
            {visits.map((v) => (
              <div key={v.id} className="cc-tile p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{v.student.name}</p>
                    <p className="text-sm text-muted">{v.category}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">{formatDate(v.visitDate)}</span>
                </div>
                {v.observations && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{v.observations}</p>
                )}
                <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                  <span>{v.contactedGuardian ? "Responsable/parent contacté" : "Responsable/parent non contacté"}</span>
                  <span>· Enregistré par {v.recordedBy.name}</span>
                </div>
              </div>
            ))}
            {visits.length === 0 && (
              <p className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
                Aucun passage enregistré pour le moment.
              </p>
            )}
          </div>
        </AdminCard>

        <InfirmaryVisitForm students={students} />
      </div>
    </AdminShell>
  );
}
