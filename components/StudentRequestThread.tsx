"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  studentRequestCategoryLabels,
  studentRequestStatusLabels,
  studentRequestStatusBadge,
  studentRequestStatuses,
  type StudentRequestCategory,
  type StudentRequestStatus,
} from "@/lib/studentRequests";

export interface StudentRequestDetail {
  id: string;
  subject: string;
  category: string;
  status: string;
  description: string | null;
  attachmentUrl: string | null;
  attachmentName: string | null;
  documentUrl: string | null;
  documentName: string | null;
  createdAt: string;
  updatedAt: string;
  student: { name: string };
  messages: { id: string; body: string; createdAt: string; author: { name: string }; isSelf: boolean }[];
}

export default function StudentRequestThread({
  request,
  canChangeStatus,
}: {
  request: StudentRequestDetail;
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
      const res = await fetch(`/api/student-requests/${request.id}/messages`, {
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
      const res = await fetch(`/api/student-requests/${request.id}/status`, {
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
            {studentRequestCategoryLabels[request.category as StudentRequestCategory] ?? request.category}
          </p>
          <h2 className="text-lg font-bold text-foreground">{request.subject}</h2>
          <p className="text-sm text-muted">{request.student.name}</p>
        </div>
        {canChangeStatus ? (
          <select
            className="input !w-auto text-sm"
            value={status}
            disabled={statusSaving}
            onChange={(e) => changeStatus(e.target.value)}
          >
            {studentRequestStatuses.map((s) => (
              <option key={s} value={s}>
                {studentRequestStatusLabels[s]}
              </option>
            ))}
          </select>
        ) : (
          <span className={`badge ${studentRequestStatusBadge[status as StudentRequestStatus]}`}>
            {studentRequestStatusLabels[status as StudentRequestStatus] ?? status}
          </span>
        )}
      </div>

      {request.description && <p className="mb-4 whitespace-pre-wrap text-sm text-foreground">{request.description}</p>}

      {request.attachmentUrl && (
        <a href={request.attachmentUrl} target="_blank" rel="noreferrer" className="btn-secondary mb-2 mr-2 text-sm">
          Pièce jointe : {request.attachmentName ?? "document"}
        </a>
      )}
      {request.documentUrl && (
        <a href={request.documentUrl} target="_blank" rel="noreferrer" className="btn-secondary mb-4 text-sm">
          Document disponible : {request.documentName ?? "document"}
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
          placeholder="Écrire un message…"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={sending || !reply.trim()} className="btn-primary text-sm">
          {sending ? "Envoi…" : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
