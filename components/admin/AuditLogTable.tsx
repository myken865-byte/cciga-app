"use client";

import SearchableTable from "@/components/admin/SearchableTable";

interface AuditLogRow {
  id: string;
  createdAt: string; // pre-formatted by the server page
  entityType: string;
  entityId: string;
  action: string;
  actorName: string | null;
}

/**
 * Client wrapper around SearchableTable for the audit log table — used by
 * /admin/audit and the three institution "structure académique" pages.
 * Server Components can't pass function props (getSearchText/renderRow)
 * across the RSC boundary, so each SearchableTable usage needs a small
 * "use client" wrapper like this one instead of being called directly from
 * a page.tsx (mandat "Barres de recherche globales", 2026-09-09).
 */
export default function AuditLogTable({
  logs,
  showEntityId = true,
}: {
  logs: AuditLogRow[];
  showEntityId?: boolean;
}) {
  return (
    <SearchableTable
      items={logs}
      getSearchText={(log) => [log.entityType, log.entityId, log.action, log.actorName]}
      placeholder="Rechercher par type, identifiant, action, auteur…"
      colSpan={showEntityId ? 5 : 4}
      baseEmptyMessage="Aucune entrée pour le moment."
      head={
        <tr>
          <th className="px-3 py-2 font-semibold">Date</th>
          <th className="px-3 py-2 font-semibold">Type</th>
          {showEntityId && <th className="px-3 py-2 font-semibold">Identifiant</th>}
          <th className="px-3 py-2 font-semibold">Action</th>
          <th className="px-3 py-2 font-semibold">Par</th>
        </tr>
      }
      renderRow={(log) => (
        <tr key={log.id} className="border-t border-row-divider">
          <td className="px-3 py-2 whitespace-nowrap text-muted">{log.createdAt}</td>
          <td className="px-3 py-2 text-foreground">{log.entityType}</td>
          {showEntityId && <td className="px-3 py-2 font-mono text-xs text-muted">{log.entityId}</td>}
          <td className="px-3 py-2 text-muted">{log.action}</td>
          <td className="px-3 py-2 text-muted">{log.actorName ?? "—"}</td>
        </tr>
      )}
    />
  );
}
