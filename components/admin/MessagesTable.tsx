"use client";

import Link from "next/link";
import SearchableTable from "@/components/admin/SearchableTable";

interface MessageRow {
  id: string;
  name: string;
  subject: string;
  email: string;
  body: string;
  status: string;
  createdAtLabel: string;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function MessagesTable({ messages }: { messages: MessageRow[] }) {
  return (
    <SearchableTable
      items={messages}
      getSearchText={(m) => [m.name, m.subject, m.email, m.body]}
      placeholder="Rechercher par nom, sujet, email…"
      colSpan={4}
      baseEmptyMessage="Aucun message pour ce filtre."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">De</th>
          <th className="px-4 py-3 font-semibold">Sujet</th>
          <th className="px-4 py-3 font-semibold">Statut</th>
          <th className="px-4 py-3 font-semibold">Reçu le</th>
        </tr>
      }
      renderRow={(m) => (
        <tr key={m.id} className="border-t border-row-divider">
          <td className="px-4 py-3 text-foreground">{m.name}</td>
          <td className="px-4 py-3">
            <Link href={`/admin/messages/${m.id}`} className="text-primary hover:underline">
              {m.subject}
            </Link>
          </td>
          <td className="px-4 py-3">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                m.status === "traite" ? "bg-emerald-100 text-emerald-700" : "bg-primary/10 text-primary"
              }`}
            >
              {m.status === "traite" ? "Traité" : "Nouveau"}
            </span>
          </td>
          <td className="px-4 py-3 text-muted">{m.createdAtLabel}</td>
        </tr>
      )}
    />
  );
}
