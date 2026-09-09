"use client";

import SearchableList from "@/components/admin/SearchableList";

interface VisitRow {
  id: string;
  category: string;
  observations: string | null;
  contactedGuardian: boolean;
  visitDateLabel: string;
  student: { name: string };
  recordedBy: { name: string };
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function InfirmaryVisitList({ visits }: { visits: VisitRow[] }) {
  return (
    <SearchableList
      items={visits}
      keyFor={(v) => v.id}
      getSearchText={(v) => [v.student.name, v.category, v.recordedBy.name]}
      placeholder="Rechercher par élève ou catégorie…"
      baseEmptyMessage="Aucun passage enregistré pour le moment."
      renderItem={(v) => (
        <div className="cc-tile p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">{v.student.name}</p>
              <p className="text-sm text-muted">{v.category}</p>
            </div>
            <span className="shrink-0 text-xs text-muted">{v.visitDateLabel}</span>
          </div>
          {v.observations && <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{v.observations}</p>}
          <div className="mt-2 flex items-center gap-3 text-xs text-muted">
            <span>{v.contactedGuardian ? "Responsable/parent contacté" : "Responsable/parent non contacté"}</span>
            <span>· Enregistré par {v.recordedBy.name}</span>
          </div>
        </div>
      )}
    />
  );
}
