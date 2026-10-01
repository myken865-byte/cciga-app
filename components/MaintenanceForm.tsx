"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { maintenanceResourceTypes, maintenanceResourceTypeLabels, type MaintenanceResourceType } from "@/lib/maintenance";

export interface MaintenanceResourceOption {
  id: string;
  label: string;
}

export default function MaintenanceForm({
  equipment,
  rooms,
  vehicles,
}: {
  equipment: MaintenanceResourceOption[];
  rooms: MaintenanceResourceOption[];
  vehicles: MaintenanceResourceOption[];
}) {
  const router = useRouter();
  const [resourceType, setResourceType] = useState<MaintenanceResourceType>("equipement");
  const [resourceId, setResourceId] = useState("");
  const [otherLabel, setOtherLabel] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const optionsByType: Record<Exclude<MaintenanceResourceType, "autre">, MaintenanceResourceOption[]> = {
    equipement: equipment,
    salle: rooms,
    vehicule: vehicles,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const finalResourceId = resourceType === "autre" ? otherLabel.trim() : resourceId;
    if (!finalResourceId || !description.trim()) {
      setError("Ressource et description sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceType, resourceId: finalResourceId, description: description.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Création impossible.");
        return;
      }
      setSuccess(true);
      setDescription("");
      setOtherLabel("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5 sm:p-6">
      {success && <p className="rounded-md bg-success-bg px-3 py-2 text-sm text-success">Demande signalée.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Type de ressource</span>
          <select
            className="input"
            value={resourceType}
            onChange={(e) => {
              setResourceType(e.target.value as MaintenanceResourceType);
              setResourceId("");
            }}
          >
            {maintenanceResourceTypes.map((t) => (
              <option key={t} value={t}>
                {maintenanceResourceTypeLabels[t]}
              </option>
            ))}
          </select>
        </label>
        {resourceType === "autre" ? (
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Préciser la ressource</span>
            <input className="input" value={otherLabel} onChange={(e) => setOtherLabel(e.target.value)} />
          </label>
        ) : (
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Ressource</span>
            <select className="input" value={resourceId} onChange={(e) => setResourceId(e.target.value)}>
              <option value="">Sélectionner…</option>
              {optionsByType[resourceType].map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            {optionsByType[resourceType].length === 0 && (
              <p className="mt-1 text-xs text-muted">Aucune ressource de ce type enregistrée pour cette institution.</p>
            )}
          </label>
        )}
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Description du problème</span>
        <textarea className="input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "Envoi…" : "Signaler"}
      </button>
    </form>
  );
}
