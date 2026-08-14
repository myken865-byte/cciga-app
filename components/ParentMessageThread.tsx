"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface ParentMessageItem {
  id: string;
  body: string;
  senderName: string;
  isSelf: boolean;
  createdAt: string;
}

export default function ParentMessageThread({
  studentId,
  messages,
  canSend,
  disabledReason,
}: {
  studentId: number;
  messages: ParentMessageItem[];
  canSend: boolean;
  disabledReason?: string;
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/parent-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, body }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setBody("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
        Communication avec les parents
      </h3>
      {messages.length === 0 ? (
        <p className="text-sm text-muted">Aucun message pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-md p-3 text-sm ${m.isSelf ? "bg-primary/10" : "bg-background"}`}
            >
              <p className="text-foreground">{m.body}</p>
              <p className="mt-1 text-xs text-muted">
                {m.senderName} · {m.createdAt}
              </p>
            </li>
          ))}
        </ul>
      )}

      {canSend ? (
        <form onSubmit={submit} className="mt-3 space-y-2">
          <textarea
            required
            rows={2}
            className="input"
            placeholder="Écrire un message…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-light disabled:opacity-50"
          >
            {submitting ? "Envoi…" : "Envoyer"}
          </button>
        </form>
      ) : (
        disabledReason && <p className="mt-3 text-xs text-muted">{disabledReason}</p>
      )}
    </div>
  );
}
