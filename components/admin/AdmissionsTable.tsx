"use client";

import Link from "next/link";
import SearchableTable from "@/components/admin/SearchableTable";
import { admissionStatusLabels, admissionStatusStyles, type AdmissionStatus } from "@/lib/admission-status";

interface SubmissionRow {
  id: string;
  reference: string;
  firstName: string;
  lastName: string;
  schoolName: string;
  programName: string;
  statusKey: AdmissionStatus;
  submittedAtLabel: string;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function AdmissionsTable({ rows }: { rows: SubmissionRow[] }) {
  return (
    <SearchableTable
      items={rows}
      getSearchText={(s) => [s.reference, s.firstName, s.lastName, s.schoolName, s.programName, admissionStatusLabels[s.statusKey]]}
      placeholder="Rechercher par référence, nom, programme…"
      colSpan={5}
      baseEmptyMessage="Aucune candidature pour ce filtre."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">Référence</th>
          <th className="px-4 py-3 font-semibold">Candidat</th>
          <th className="px-4 py-3 font-semibold">École / Programme</th>
          <th className="px-4 py-3 font-semibold">Statut</th>
          <th className="px-4 py-3 font-semibold">Soumis le</th>
        </tr>
      }
      renderRow={(s) => (
        <tr key={s.id} className="border-t border-row-divider">
          <td className="px-4 py-3">
            <Link href={`/admin/admissions/${s.id}`} className="font-mono font-medium text-primary hover:underline">
              {s.reference}
            </Link>
          </td>
          <td className="px-4 py-3 text-foreground">
            {s.firstName} {s.lastName}
          </td>
          <td className="px-4 py-3 text-muted">
            {s.schoolName} — {s.programName}
          </td>
          <td className="px-4 py-3">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${admissionStatusStyles[s.statusKey]}`}>
              {admissionStatusLabels[s.statusKey]}
            </span>
          </td>
          <td className="px-4 py-3 text-muted">{s.submittedAtLabel}</td>
        </tr>
      )}
    />
  );
}
