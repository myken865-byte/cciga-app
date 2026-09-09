"use client";

import SearchableTable from "@/components/admin/SearchableTable";

interface NewsRow {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function NewsTable({ news }: { news: NewsRow[] }) {
  return (
    <SearchableTable
      items={news}
      getSearchText={(item) => [item.title, item.category]}
      placeholder="Rechercher par titre ou catégorie…"
      colSpan={3}
      baseEmptyMessage="Aucune actualité pour le moment."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">Titre</th>
          <th className="px-4 py-3 font-semibold">Catégorie</th>
          <th className="px-4 py-3 font-semibold">Date</th>
        </tr>
      }
      renderRow={(item) => (
        <tr key={item.id} className="border-t border-row-divider">
          <td className="px-4 py-3 text-foreground">{item.title}</td>
          <td className="px-4 py-3 text-muted">{item.category}</td>
          <td className="px-4 py-3 text-muted">{item.dateLabel}</td>
        </tr>
      )}
    />
  );
}
