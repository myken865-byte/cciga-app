"use client";

import Link from "next/link";
import SearchableTable from "@/components/admin/SearchableTable";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";

const badgeStatusLabels: Record<string, string> = {
  actif: "Actif",
  a_finaliser: "À finaliser",
  perdu: "Perdu",
  remplace: "Remplacé",
  inactif: "Inactif",
};

interface FormRow {
  id: string;
  lastName: string;
  firstName: string;
  studentUserId: number | null;
  program: { name: string } | null;
  academicYear: { label: string } | null;
  badgeStatus: string | null;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function ElevesEcoleClassiqueTable({ forms }: { forms: FormRow[] }) {
  return (
    <SearchableTable
      items={forms}
      getSearchText={(f) => [
        f.lastName,
        f.firstName,
        f.program?.name,
        f.academicYear?.label,
        formatClassicEnrollmentFormReference(f.id),
        f.studentUserId ? formatCcigaId(f.studentUserId) : null,
      ]}
      placeholder="Rechercher par nom, classe, référence…"
      colSpan={8}
      baseEmptyMessage="Aucun élève inscrit pour le moment."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">CCIGA ID</th>
          <th className="px-4 py-3 font-semibold">Nom</th>
          <th className="px-4 py-3 font-semibold">Prénom</th>
          <th className="px-4 py-3 font-semibold">Classe</th>
          <th className="px-4 py-3 font-semibold">Année scolaire</th>
          <th className="px-4 py-3 font-semibold">Référence fiche</th>
          <th className="px-4 py-3 font-semibold">Badge</th>
          <th></th>
        </tr>
      }
      renderRow={(f) => (
        <tr key={f.id} className="border-t border-row-divider">
          <td className="px-4 py-3 font-mono">{f.studentUserId ? formatCcigaId(f.studentUserId) : "—"}</td>
          <td className="px-4 py-3 text-foreground">{f.lastName || "—"}</td>
          <td className="px-4 py-3 text-foreground">{f.firstName || "—"}</td>
          <td className="px-4 py-3 text-muted">{f.program?.name ?? "—"}</td>
          <td className="px-4 py-3 text-muted">{f.academicYear?.label ?? "—"}</td>
          <td className="px-4 py-3 font-mono text-xs text-muted">{formatClassicEnrollmentFormReference(f.id)}</td>
          <td className="px-4 py-3 text-muted">{f.badgeStatus ? badgeStatusLabels[f.badgeStatus] ?? f.badgeStatus : "—"}</td>
          <td className="px-4 py-3">
            {f.studentUserId && (
              <Link href={`/admin/users/${f.studentUserId}`} className="text-primary hover:underline">
                Voir le dossier →
              </Link>
            )}
          </td>
        </tr>
      )}
    />
  );
}
