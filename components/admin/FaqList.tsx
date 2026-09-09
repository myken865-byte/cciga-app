"use client";

import SearchableList from "@/components/admin/SearchableList";
import { AdminTile } from "@/components/AdminPremium";

interface FaqRow {
  id: string;
  question: string;
  answer: string;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function FaqList({ items }: { items: FaqRow[] }) {
  return (
    <SearchableList
      items={items}
      keyFor={(item) => item.id}
      getSearchText={(item) => [item.question, item.answer]}
      placeholder="Rechercher une question…"
      baseEmptyMessage="Aucune question pour le moment."
      renderItem={(item) => (
        <AdminTile>
          <p className="font-medium text-foreground">{item.question}</p>
          <p className="mt-1 text-sm text-muted">{item.answer}</p>
        </AdminTile>
      )}
    />
  );
}
