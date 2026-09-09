"use client";

import SearchableTable from "@/components/admin/SearchableTable";

interface EventRow {
  id: string;
  title: string;
  location: string;
  dateLabel: string;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function EventsTable({ events }: { events: EventRow[] }) {
  return (
    <SearchableTable
      items={events}
      getSearchText={(event) => [event.title, event.location]}
      placeholder="Rechercher par titre ou lieu…"
      colSpan={3}
      baseEmptyMessage="Aucun événement pour le moment."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">Titre</th>
          <th className="px-4 py-3 font-semibold">Lieu</th>
          <th className="px-4 py-3 font-semibold">Date</th>
        </tr>
      }
      renderRow={(event) => (
        <tr key={event.id} className="border-t border-row-divider">
          <td className="px-4 py-3 text-foreground">{event.title}</td>
          <td className="px-4 py-3 text-muted">{event.location}</td>
          <td className="px-4 py-3 text-muted">{event.dateLabel}</td>
        </tr>
      )}
    />
  );
}
