"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VoidPaymentButton({
  studentId,
  paymentId,
}: {
  studentId: number;
  paymentId: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleVoid() {
    if (!window.confirm("Annuler ce paiement ? Une contrepassation traçable sera enregistrée.")) {
      return;
    }
    const reason = window.prompt("Motif de l'annulation (optionnel) :") ?? undefined;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/finance/${studentId}/payments/${paymentId}/void`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
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
    <span className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleVoid}
        disabled={submitting}
        className="btn-secondary text-xs text-red-700 hover:bg-red-50 disabled:opacity-50"
      >
        {submitting ? "Annulation…" : "Annuler"}
      </button>
      {error && <span className="text-xs text-red-700">{error}</span>}
    </span>
  );
}
