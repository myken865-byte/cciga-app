"use client";

import Link from "next/link";
import SearchableList from "@/components/admin/SearchableList";

const STATUS_LABELS: Record<string, string> = {
  ouvert: "Ouvert",
  suivi: "Suivi",
  cloture: "Clôturé",
};

const STATUS_STYLES: Record<string, string> = {
  ouvert: "bg-primary/10 text-primary",
  suivi: "bg-accent/10 text-accent",
  cloture: "bg-emerald-100 text-emerald-700",
};

interface CaseRow {
  id: string;
  status: string;
  createdAtLabel: string;
  student: { name: string };
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function PsychosocialCaseList({ cases }: { cases: CaseRow[] }) {
  return (
    <SearchableList
      items={cases}
      keyFor={(c) => c.id}
      getSearchText={(c) => [c.student.name, STATUS_LABELS[c.status] ?? c.status]}
      placeholder="Rechercher par élève ou statut…"
      baseEmptyMessage="Aucun dossier pour le moment."
      renderItem={(c) => (
        <Link
          href={`/admin/psychosocial/${c.id}`}
          className="block rounded-lg border border-border p-4 hover:border-primary-light"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">{c.student.name}</p>
              <p className="text-xs text-muted">Ouvert le {c.createdAtLabel}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[c.status] ?? "bg-primary/10 text-primary"}`}>
              {STATUS_LABELS[c.status] ?? c.status}
            </span>
          </div>
        </Link>
      )}
    />
  );
}
