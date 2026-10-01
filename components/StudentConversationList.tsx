"use client";

import Link from "next/link";
import { studentConversationServiceLabels, type StudentConversationService } from "@/lib/studentConversations";
import { ArrowRightIcon } from "@/components/icons";
import SearchableList from "@/components/admin/SearchableList";

export interface StudentConversationSummary {
  id: string;
  subject: string;
  service: string;
  updatedAt: string;
  counterpartName: string;
  unread: boolean;
}

export default function StudentConversationList({
  conversations,
  basePath,
}: {
  conversations: StudentConversationSummary[];
  basePath: string;
}) {
  if (conversations.length === 0) {
    return <div className="empty-state">Aucune conversation pour le moment.</div>;
  }

  return (
    <SearchableList
      items={conversations}
      keyFor={(c) => c.id}
      getSearchText={(c) => [
        c.subject,
        c.counterpartName,
        studentConversationServiceLabels[c.service as StudentConversationService] ?? c.service,
      ]}
      placeholder="Rechercher par sujet, interlocuteur…"
      renderItem={(c) => (
        <Link href={`${basePath}/${c.id}`} className="card card-interactive flex items-center justify-between gap-3 p-3.5 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {c.unread && <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-primary align-middle" aria-hidden />}
              {c.subject}
            </p>
            <p className="text-xs text-muted">
              {c.counterpartName} ·{" "}
              {studentConversationServiceLabels[c.service as StudentConversationService] ?? c.service} · {c.updatedAt}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2">
            {c.unread && <span className="badge badge-info">Non lu</span>}
            <ArrowRightIcon className="h-4 w-4 text-muted" />
          </span>
        </Link>
      )}
    />
  );
}
