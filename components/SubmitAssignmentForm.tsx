"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitAssignmentForm({
  assignmentId,
  initialTextContent,
  initialFileUrl,
}: {
  assignmentId: string;
  initialTextContent?: string | null;
  initialFileUrl?: string | null;
}) {
  const router = useRouter();
  const [textContent, setTextContent] = useState(initialTextContent ?? "");
  const [fileUrl, setFileUrl] = useState(initialFileUrl ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/assignments/${assignmentId}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textContent, fileUrl }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-2 rounded-md border border-border bg-background p-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Réponse</span>
        <textarea
          rows={3}
          className="input"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Lien du fichier (optionnel)</span>
        <input
          type="url"
          className="input"
          placeholder="https://…"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
      </label>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Envoi…" : initialTextContent || initialFileUrl ? "Mettre à jour ma remise" : "Remettre mon travail"}
      </button>
    </form>
  );
}
