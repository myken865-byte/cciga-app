"use client";

import Link from "next/link";
import SearchableTable from "@/components/admin/SearchableTable";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";

interface StudentRow {
  id: number;
  name: string;
  paid: number;
  fee: number;
  balance: number;
  program: { name: string; school: string } | null;
  schoolLabel: string | null;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function FinanceTable({ students }: { students: StudentRow[] }) {
  return (
    <SearchableTable
      items={students}
      getSearchText={(s) => [s.name, formatCcigaId(s.id), s.program?.name, s.schoolLabel]}
      placeholder="Rechercher par nom, CCIGA ID, programme…"
      colSpan={8}
      baseEmptyMessage="Aucun étudiant pour ce filtre."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">CCIGA ID</th>
          <th className="px-4 py-3 font-semibold">Étudiant</th>
          <th className="px-4 py-3 font-semibold">École</th>
          <th className="px-4 py-3 font-semibold">Programme</th>
          <th className="px-4 py-3 font-semibold">Frais</th>
          <th className="px-4 py-3 font-semibold">Payé</th>
          <th className="px-4 py-3 font-semibold">Solde</th>
          <th className="px-4 py-3 font-semibold">Carnet</th>
        </tr>
      }
      renderRow={(s) => (
        <tr key={s.id} className="border-t border-row-divider">
          <td className="px-4 py-3 font-mono text-primary">
            <Link href={`/admin/finance/${s.id}`} className="hover:underline">
              {formatCcigaId(s.id)}
            </Link>
          </td>
          <td className="px-4 py-3 text-foreground">{s.name}</td>
          <td className="px-4 py-3 text-muted">{s.schoolLabel ?? "—"}</td>
          <td className="px-4 py-3 text-muted">{s.program?.name ?? "—"}</td>
          <td className="px-4 py-3 text-muted">{formatHTG(s.fee)}</td>
          <td className="px-4 py-3 text-muted">{formatHTG(s.paid)}</td>
          <td className={`px-4 py-3 font-semibold ${s.balance > 0 ? "text-red-600" : "text-emerald-600"}`}>
            {formatHTG(s.balance)}
          </td>
          <td className="px-4 py-3">
            <a
              href={`/api/admin/carnet-paiement/${s.id}/pdf`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-xs"
            >
              Voir / PDF
            </a>
          </td>
        </tr>
      )}
    />
  );
}
