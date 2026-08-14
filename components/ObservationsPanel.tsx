"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface ObservationItem {
  id: string;
  body: string;
  authorName: string;
  createdAt: string;
}

export default function ObservationsPanel({
  studentId,
  observations,
  canAdd,
}: {
  studentId: number;
  observations: ObservationItem[];
  canAdd: boolean;
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
      const res = await fetch("/api/observations", {
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
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">Observations</h3>
      {observations.length === 0 ? (
        <p className="text-sm text-muted">Aucune observation pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {observations.map((o) => (
            <li key={o.id} className="rounded-md bg-background p-3 text-sm">
              <p className="text-foreground">{o.body}</p>
              <p className="mt-1 text-xs text-muted">
                {o.authorName} · {o.createdAt}
              </p>
            </li>
          ))}
        </ul>
      )}

      {canAdd && (
        <form onSubmit={submit} className="mt-3 space-y-2">
          <textarea
            required
            rows={2}
            className="input"
            placeholder="Ajouter une observation…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-light disabled:opacity-50"
          >
            {submitting ? "Ajout…" : "Ajouter"}
          </button>
        </form>
      )}
    </div>
  );
}
