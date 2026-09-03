"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateBadgeButton({ userId }: { userId: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Aucune donnée à retaper : /api/admin/badges/auto applique la même
  // logique que la génération automatique après inscription
  // (lib/badgeAuto.ts) — numéro dérivé du matricule, statut "à finaliser"
  // si aucune classe/programme n'est encore assignée.
  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/badges/auto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
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
      <button
        type="button"
        onClick={generate}
        disabled={busy}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {busy ? "Génération…" : "Générer le badge"}
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
