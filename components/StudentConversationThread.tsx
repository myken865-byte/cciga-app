"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { studentConversationServiceLabels, type StudentConversationService } from "@/lib/studentConversations";

export interface StudentConversationDetail {
  id: string;
  subject: string;
  service: string;
  student: { name: string };
  staff: { name: string };
  messages: { id: string; body: string; createdAt: string; author: { name: string }; isSelf: boolean }[];
}

export default function StudentConversationThread({ conversation }: { conversation: StudentConversationDetail }) {
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Marque la conversation comme lue dès l'ouverture — voir
  // app/api/student-conversations/[id]/read/route.ts.
  useEffect(() => {
    fetch(`/api/student-conversations/${conversation.id}/read`, { method: "POST" }).catch(() => {});
  }, [conversation.id]);

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/student-conversations/${conversation.id}/messages`, {
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

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4">
        <p className="section-label mb-1">
          {studentConversationServiceLabels[conversation.service as StudentConversationService] ?? conversation.service}
        </p>
        <h2 className="text-lg font-bold text-foreground">{conversation.subject}</h2>
        <p className="text-sm text-muted">
          {conversation.student.name} ↔ {conversation.staff.name}
        </p>
      </div>

      <div className="mb-4 space-y-3">
        {conversation.messages.map((m) => (
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
          {sending ? "Envoi…" : "Répondre"}
        </button>
      </form>
    </div>
  );
}
