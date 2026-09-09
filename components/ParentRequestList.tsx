"use client";

import Link from "next/link";
import {
  parentRequestCategoryLabels,
  parentRequestStatusLabels,
  parentRequestStatusBadge,
  type ParentRequestCategory,
  type ParentRequestStatus,
} from "@/lib/parentRequests";
import { ArrowRightIcon } from "@/components/icons";
import SearchableList from "@/components/admin/SearchableList";

export interface ParentRequestSummary {
  id: string;
  subject: string;
  category: string;
  status: string;
  updatedAt: string;
  studentName?: string;
}

export default function ParentRequestList({
  requests,
  basePath,
}: {
  requests: ParentRequestSummary[];
  basePath: string;
}) {
  if (requests.length === 0) {
    return <div className="empty-state">Aucune demande pour le moment.</div>;
  }

  return (
    <SearchableList
      items={requests}
      keyFor={(r) => r.id}
      getSearchText={(r) => [
        r.subject,
        r.studentName,
        parentRequestCategoryLabels[r.category as ParentRequestCategory] ?? r.category,
        parentRequestStatusLabels[r.status as ParentRequestStatus] ?? r.status,
      ]}
      placeholder="Rechercher par sujet, élève, catégorie…"
      renderItem={(r) => (
        <Link href={`${basePath}/${r.id}`} className="card card-interactive flex items-center justify-between gap-3 p-3.5 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{r.subject}</p>
            <p className="text-xs text-muted">
              {parentRequestCategoryLabels[r.category as ParentRequestCategory] ?? r.category}
              {r.studentName ? ` · ${r.studentName}` : ""} · {r.updatedAt}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2">
            <span className={`badge ${parentRequestStatusBadge[r.status as ParentRequestStatus]}`}>
              {parentRequestStatusLabels[r.status as ParentRequestStatus] ?? r.status}
            </span>
            <ArrowRightIcon className="h-4 w-4 text-muted" />
          </span>
        </Link>
      )}
    />
  );
}
