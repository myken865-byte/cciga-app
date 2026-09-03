"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateBadgesBulkButton({ programId }: { programId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ total: number; created: number } | null>(null);

  async function generate() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/badges/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programId }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setResult({ total: json.total, created: json.created });
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={generate} disabled={busy} className="btn-secondary !min-h-0 !py-1.5 text-xs disabled:opacity-50">
        {busy ? "Génération…" : "Générer les badges de la classe"}
      </button>
      {result && (
        <p className="mt-1 text-xs text-muted">
          {result.created} nouveau(x) badge(s) créé(s) sur {result.total} élève(s)/étudiant(s).
        </p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
