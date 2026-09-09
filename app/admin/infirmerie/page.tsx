import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import InfirmaryVisitForm from "@/components/InfirmaryVisitForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { AlertIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";
import InfirmaryVisitList from "@/components/admin/InfirmaryVisitList";

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
          <InfirmaryVisitList
            visits={visits.map((v) => ({
              id: v.id,
              category: v.category,
              observations: v.observations,
              contactedGuardian: v.contactedGuardian,
              visitDateLabel: formatDate(v.visitDate),
              student: { name: v.student.name },
              recordedBy: { name: v.recordedBy.name },
            }))}
          />
        </AdminCard>

        <InfirmaryVisitForm students={students} />
      </div>
    </AdminShell>
  );
}
