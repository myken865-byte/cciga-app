"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateDocumentsPanel({
  programId,
  semesterId,
  readyCount,
}: {
  programId: string;
  semesterId: string;
  readyCount: number;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  async function generate() {
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programId, semesterId }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setResult(json.created);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      {result !== null && (
        <p className="mb-2 text-sm text-emerald-600">{result} document(s) généré(s) et publié(s).</p>
      )}
      <button
        onClick={generate}
        disabled={submitting || readyCount === 0}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Génération…" : `Générer et publier les bulletins/relevés (${readyCount} prêt(s))`}
      </button>
    </div>
  );
}
