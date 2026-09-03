"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  parentRequestCategoryLabels,
  parentRequestServiceLabels,
  parentRequestStatusLabels,
  parentRequestStatusBadge,
  parentRequestStatuses,
  type ParentRequestCategory,
  type ParentRequestService,
  type ParentRequestStatus,
} from "@/lib/parentRequests";

export interface ParentRequestDetail {
  id: string;
  subject: string;
  category: string;
  service: string;
  status: string;
  attachmentUrl: string | null;
  attachmentName: string | null;
  createdAt: string;
  updatedAt: string;
  student: { name: string };
  parent: { name: string };
  messages: { id: string; body: string; createdAt: string; author: { name: string }; isSelf: boolean }[];
}

export default function ParentRequestThread({
  request,
  canChangeStatus,
}: {
  request: ParentRequestDetail;
  canChangeStatus: boolean;
}) {
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(request.status);
  const [statusSaving, setStatusSaving] = useState(false);

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/parent-requests/${request.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: reply.trim() }),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Envoi impossible.");
        return;
      }
      setReply("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSending(false);
    }
  }

  async function changeStatus(newStatus: string) {
    setStatus(newStatus);
    setStatusSaving(true);
    try {
      const res = await fetch(`/api/parent-requests/${request.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setStatusSaving(false);
    }
  }

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-label mb-1">
            {parentRequestCategoryLabels[request.category as ParentRequestCategory] ?? request.category}
          </p>
          <h2 className="text-lg font-bold text-foreground">{request.subject}</h2>
          <p className="text-sm text-muted">
            {request.student.name} · Service : {parentRequestServiceLabels[request.service as ParentRequestService] ?? request.service}
          </p>
        </div>
        {canChangeStatus ? (
          <select
            className="input !w-auto text-sm"
            value={status}
            disabled={statusSaving}
            onChange={(e) => changeStatus(e.target.value)}
          >
            {parentRequestStatuses.map((s) => (
              <option key={s} value={s}>
                {parentRequestStatusLabels[s]}
              </option>
            ))}
          </select>
        ) : (
          <span className={`badge ${parentRequestStatusBadge[status as ParentRequestStatus]}`}>
            {parentRequestStatusLabels[status as ParentRequestStatus] ?? status}
          </span>
        )}
      </div>

      {request.attachmentUrl && (
        <a href={request.attachmentUrl} target="_blank" rel="noreferrer" className="btn-secondary mb-4 text-sm">
          Pièce jointe : {request.attachmentName ?? "document"}
        </a>
      )}

      <div className="mb-4 space-y-3">
        {request.messages.map((m) => (
          <div key={m.id} className={`card p-3.5 text-sm ${m.isSelf ? "border-primary/40 bg-primary/5" : ""}`}>
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="font-medium text-foreground">{m.author.name}</span>
              <span className="text-xs text-muted">{m.createdAt}</span>
            </div>
            <p className="whitespace-pre-wrap text-foreground">{m.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={sendReply} className="space-y-2">
        <textarea
          className="input"
          rows={3}
          placeholder="Écrire une réponse…"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={sending || !reply.trim()} className="btn-primary text-sm">
          {sending ? "Envoi…" : "Répondre"}
        </button>
      </form>
    </div>
  );
}
