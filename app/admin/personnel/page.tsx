import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import CreateEmployeeForm from "@/components/CreateEmployeeForm";
import LeaveRequestReview from "@/components/LeaveRequestReview";

export const dynamic = "force-dynamic";

const typeContratLabels: Record<string, string> = {
  cdi: "CDI",
  cdd: "CDD",
  vacataire: "Vacataire",
  autre: "Autre",
};

const statutBadge: Record<string, string> = {
  actif: "badge-success",
  conge: "badge-warning",
  suspendu: "badge-danger",
  termine: "badge-neutral",
};

const statutLabels: Record<string, string> = {
  actif: "Actif",
  conge: "En congé",
  suspendu: "Suspendu",
  termine: "Terminé",
};

export default async function AdminPersonnelPage() {
  const [employees, candidateUsers] = await Promise.all([
    prisma.employee.findMany({
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
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-foreground">Personnel / RH</h1>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="badge badge-neutral !py-1.5 !px-3">{employees.length} employé(s)</span>
          <span className={`badge !py-1.5 !px-3 ${pendingLeaveCount > 0 ? "badge-warning" : "badge-neutral"}`}>
            {pendingLeaveCount} demande(s) de congé en attente
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">CCIGA ID</th>
                <th className="px-4 py-3 font-semibold">Nom</th>
                <th className="px-4 py-3 font-semibold">Fonction</th>
                <th className="px-4 py-3 font-semibold">Département</th>
                <th className="px-4 py-3 font-semibold">Contrat</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3 font-semibold">Congés</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t border-border align-top">
                  <td className="px-4 py-3 font-mono text-primary">{formatCcigaId(employee.user.id)}</td>
                  <td className="px-4 py-3 text-foreground">{employee.user.name}</td>
                  <td className="px-4 py-3 text-muted">{employee.fonction}</td>
                  <td className="px-4 py-3 text-muted">{employee.departement}</td>
                  <td className="px-4 py-3 text-muted">{typeContratLabels[employee.typeContrat] ?? employee.typeContrat}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${statutBadge[employee.statut] ?? "badge-neutral"}`}>
                      {statutLabels[employee.statut] ?? employee.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {employee.leaveRequests.length === 0 ? (
                      <span className="text-muted">—</span>
                    ) : (
                      <LeaveRequestReview leaveRequests={employee.leaveRequests} />
                    )}
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted">
                    Aucun profil employé pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <CreateEmployeeForm candidates={candidateUsers} />
      </div>
    </div>
  );
}
