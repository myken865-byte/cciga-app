"use client";

import Link from "next/link";
import {
  studentRequestCategoryLabels,
  studentRequestStatusLabels,
  studentRequestStatusBadge,
  type StudentRequestCategory,
  type StudentRequestStatus,
} from "@/lib/studentRequests";
import { ArrowRightIcon } from "@/components/icons";
import SearchableList from "@/components/admin/SearchableList";

export interface StudentRequestSummary {
  id: string;
  subject: string;
  category: string;
  status: string;
  updatedAt: string;
  studentName?: string;
}

export default function StudentRequestList({
  requests,
  basePath,
}: {
  requests: StudentRequestSummary[];
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
        studentRequestCategoryLabels[r.category as StudentRequestCategory] ?? r.category,
        studentRequestStatusLabels[r.status as StudentRequestStatus] ?? r.status,
      ]}
      placeholder="Rechercher par sujet, élève, catégorie…"
      renderItem={(r) => (
        <Link href={`${basePath}/${r.id}`} className="card card-interactive flex items-center justify-between gap-3 p-3.5 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{r.subject}</p>
            <p className="text-xs text-muted">
              {studentRequestCategoryLabels[r.category as StudentRequestCategory] ?? r.category}
              {r.studentName ? ` · ${r.studentName}` : ""} · {r.updatedAt}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2">
            <span className={`badge ${studentRequestStatusBadge[r.status as StudentRequestStatus]}`}>
              {studentRequestStatusLabels[r.status as StudentRequestStatus] ?? r.status}
            </span>
            <ArrowRightIcon className="h-4 w-4 text-muted" />
          </span>
        </Link>
      )}
    />
  );
}
