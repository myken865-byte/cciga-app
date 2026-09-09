"use client";

import Link from "next/link";
import SearchableTable from "@/components/admin/SearchableTable";

interface DocRow {
  id: string;
  version: number;
  typeLabel: string;
  publishedAtLabel: string;
  student: { name: string };
  program: { name: string };
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function RecentDocumentsTable({ docs }: { docs: DocRow[] }) {
  return (
    <SearchableTable
      items={docs}
      getSearchText={(doc) => [doc.student.name, doc.program.name, doc.typeLabel]}
      placeholder="Rechercher par étudiant ou programme…"
      colSpan={6}
      baseEmptyMessage="Aucun document généré pour le moment."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">Étudiant</th>
          <th className="px-4 py-3 font-semibold">Programme</th>
          <th className="px-4 py-3 font-semibold">Type</th>
          <th className="px-4 py-3 font-semibold">Version</th>
          <th className="px-4 py-3 font-semibold">Publié le</th>
          <th></th>
        </tr>
      }
      renderRow={(doc) => (
        <tr key={doc.id} className="border-t border-row-divider">
          <td className="px-4 py-3 text-foreground">{doc.student.name}</td>
          <td className="px-4 py-3 text-muted">{doc.program.name}</td>
          <td className="px-4 py-3 text-muted">{doc.typeLabel}</td>
          <td className="px-4 py-3 text-muted">v{doc.version}</td>
          <td className="px-4 py-3 text-muted">{doc.publishedAtLabel}</td>
          <td className="px-4 py-3">
            <Link href={`/admin/documents/${doc.id}`} className="text-primary hover:underline">
              Détail →
            </Link>
          </td>
        </tr>
      )}
    />
  );
}
