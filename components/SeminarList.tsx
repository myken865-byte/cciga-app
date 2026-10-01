"use client";

import Link from "next/link";
import { seminarStatusLabels, seminarStatusBadge, type SeminarStatus } from "@/lib/seminars";
import { ArrowRightIcon } from "@/components/icons";
import SearchableList from "@/components/admin/SearchableList";

export interface SeminarSummary {
  id: string;
  title: string;
  startAt: string;
  status: string;
  registered?: boolean;
}

export default function SeminarList({ seminars, basePath }: { seminars: SeminarSummary[]; basePath: string }) {
  if (seminars.length === 0) {
    return <div className="empty-state">Aucun séminaire pour le moment.</div>;
  }

  return (
    <SearchableList
      items={seminars}
      keyFor={(s) => s.id}
      getSearchText={(s) => [s.title]}
      placeholder="Rechercher un séminaire…"
      renderItem={(s) => (
        <Link href={`${basePath}/${s.id}`} className="card card-interactive flex items-center justify-between gap-3 p-3.5 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{s.title}</p>
            <p className="text-xs text-muted">{s.startAt}</p>
          </div>
          <span className="flex shrink-0 items-center gap-2">
            {s.registered && <span className="badge badge-success">Inscrit</span>}
            <span className={`badge ${seminarStatusBadge[s.status as SeminarStatus]}`}>
              {seminarStatusLabels[s.status as SeminarStatus] ?? s.status}
            </span>
            <ArrowRightIcon className="h-4 w-4 text-muted" />
          </span>
        </Link>
      )}
    />
  );
}
