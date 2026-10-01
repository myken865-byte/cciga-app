"use client";

import Link from "next/link";
import { internshipStatusLabels, internshipStatusBadge, type InternshipStatus } from "@/lib/internships";
import { ArrowRightIcon } from "@/components/icons";
import SearchableList from "@/components/admin/SearchableList";

export interface InternshipSummary {
  id: string;
  title: string;
  hostOrganization: string;
  status: string;
  startDate: string;
  studentName?: string;
}

export default function InternshipList({ internships, basePath }: { internships: InternshipSummary[]; basePath: string }) {
  if (internships.length === 0) {
    return <div className="empty-state">Aucun stage pour le moment.</div>;
  }

  return (
    <SearchableList
      items={internships}
      keyFor={(i) => i.id}
      getSearchText={(i) => [i.title, i.hostOrganization, i.studentName]}
      placeholder="Rechercher par titre, organisme, élève…"
      renderItem={(i) => (
        <Link href={`${basePath}/${i.id}`} className="card card-interactive flex items-center justify-between gap-3 p-3.5 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{i.title}</p>
            <p className="text-xs text-muted">
              {i.hostOrganization}
              {i.studentName ? ` · ${i.studentName}` : ""} · {i.startDate}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2">
            <span className={`badge ${internshipStatusBadge[i.status as InternshipStatus]}`}>
              {internshipStatusLabels[i.status as InternshipStatus] ?? i.status}
            </span>
            <ArrowRightIcon className="h-4 w-4 text-muted" />
          </span>
        </Link>
      )}
    />
  );
}
