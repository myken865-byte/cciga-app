import { prisma } from "@/lib/db";
import CreateEmployeeForm from "@/components/CreateEmployeeForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { UsersIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";
import PersonnelTable from "@/components/admin/PersonnelTable";

export const dynamic = "force-dynamic";

// Phase C3 (2026-09-08) : cloisonnement réel — Employee.school (Phase C1/C2).
// L'unique employé resté AMBIGU en Phase C2 n'apparaît dans aucune vue
// institutionnelle : invisible ici, non perdu, à arbitrer séparément.
export default async function AdminPersonnelPage() {
  const activeSchool = await getActiveSchool();

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Ressources humaines" title="Personnel / RH" />
        <div className="empty-state">
          Le personnel est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const [employees, candidateUsers] = await Promise.all([
    prisma.employee.findMany({
      where: { school: activeSchool },
      include: { user: true, leaveRequests: { orderBy: { createdAt: "desc" } } },
      orderBy: { user: { name: "asc" } },
    }),
    prisma.user.findMany({
      where: { employeeProfile: null, active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const pendingLeaveCount = employees.reduce(
    (sum, e) => sum + e.leaveRequests.filter((l) => l.status === "soumis").length,
    0,
  );

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — Ressources humaines"
        title={`Personnel / RH — ${schoolLabels[activeSchool]}`}
        trailing={
          <div className="flex gap-2 text-xs font-semibold">
            <span className="badge badge-neutral !py-1.5 !px-3">{employees.length} employé(s)</span>
            <span className={`badge !py-1.5 !px-3 ${pendingLeaveCount > 0 ? "badge-warning" : "badge-neutral"}`}>
              {pendingLeaveCount} demande(s) de congé en attente
            </span>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard title="Effectif" icon={UsersIcon} className="lg:col-span-2">
          <PersonnelTable employees={employees} />
        </AdminCard>

        <CreateEmployeeForm candidates={candidateUsers} />
      </div>
    </AdminShell>
  );
}
