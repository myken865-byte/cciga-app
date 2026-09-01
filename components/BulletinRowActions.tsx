"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function GenerateOneButton({
  studentId,
  programId,
  semesterId,
}: {
  studentId: number;
  programId: string;
  semesterId: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/documents/generate-one", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, programId, semesterId }),
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
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={generate} disabled={busy} className="text-xs font-semibold text-primary hover:underline disabled:opacity-50">
        {busy ? "Génération…" : "Générer"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function RegenerateButton({ documentId }: { documentId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function regenerate() {
    if (!confirm("Régénérer ce bulletin à partir des données actuelles ? L'ancienne version reste conservée et consultable.")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/documents/${documentId}/regenerate`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={regenerate} disabled={busy} className="text-xs text-muted hover:underline disabled:opacity-50">
        {busy ? "…" : "Régénérer"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
