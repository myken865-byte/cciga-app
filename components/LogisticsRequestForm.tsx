"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logisticsUrgencies, logisticsUrgencyLabels } from "@/lib/logisticsRequests";

export default function LogisticsRequestForm() {
  const router = useRouter();
  const [resourceLabel, setResourceLabel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [urgency, setUrgency] = useState(logisticsUrgencies[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!resourceLabel.trim()) {
      setError("La description de la ressource est obligatoire.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/demandes-logistiques", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceLabel: resourceLabel.trim(), quantity: quantity || undefined, urgency }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Création impossible.");
        return;
      }
      setSuccess(true);
      setResourceLabel("");
      setQuantity("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5 sm:p-6">
      {success && <p className="rounded-md bg-success-bg px-3 py-2 text-sm text-success">Demande envoyée.</p>}
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Besoin</span>
        <input className="input" value={resourceLabel} onChange={(e) => setResourceLabel(e.target.value)} required />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Quantité (optionnel)</span>
          <input type="number" min={1} className="input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Urgence</span>
          <select className="input" value={urgency} onChange={(e) => setUrgency(e.target.value as typeof urgency)}>
            {logisticsUrgencies.map((u) => (
              <option key={u} value={u}>
                {logisticsUrgencyLabels[u]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "Envoi…" : "Soumettre la demande"}
      </button>
    </form>
  );
}
