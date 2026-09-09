"use client";

import SearchableTable from "@/components/admin/SearchableTable";
import LeaveRequestReview from "@/components/LeaveRequestReview";
import { formatCcigaId } from "@/lib/cciga-id";

interface LeaveRequestRow {
  id: string;
  type: string;
  startDate: Date;
  endDate: Date | null;
  reason: string | null;
  status: string;
  createdAt: Date;
}

interface EmployeeRow {
  id: string;
  fonction: string;
  departement: string;
  typeContrat: string;
  statut: string;
  user: { id: number; name: string };
  leaveRequests: LeaveRequestRow[];
}

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

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function PersonnelTable({ employees }: { employees: EmployeeRow[] }) {
  return (
    <SearchableTable
      items={employees}
      getSearchText={(employee) => [
        employee.user.name,
        formatCcigaId(employee.user.id),
        employee.fonction,
        employee.departement,
        statutLabels[employee.statut] ?? employee.statut,
      ]}
      placeholder="Rechercher par nom, fonction, département…"
      colSpan={7}
      baseEmptyMessage="Aucun profil employé pour le moment."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">CCIGA ID</th>
          <th className="px-4 py-3 font-semibold">Nom</th>
          <th className="px-4 py-3 font-semibold">Fonction</th>
          <th className="px-4 py-3 font-semibold">Département</th>
          <th className="px-4 py-3 font-semibold">Contrat</th>
          <th className="px-4 py-3 font-semibold">Statut</th>
          <th className="px-4 py-3 font-semibold">Congés</th>
        </tr>
      }
      renderRow={(employee) => (
        <tr key={employee.id} className="border-t border-row-divider align-top">
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
      )}
    />
  );
}
