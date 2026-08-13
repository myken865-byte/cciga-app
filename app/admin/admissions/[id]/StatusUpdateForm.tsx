"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  admissionStatuses,
  admissionStatusLabels,
  type AdmissionStatus,
} from "@/lib/admission-status";

export default function StatusUpdateForm({
  id,
  currentStatus,
  currentNote,
}: {
  id: string;
  currentStatus: AdmissionStatus;
  currentNote: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<AdmissionStatus>(currentStatus);
  const [note, setNote] = useState(currentNote);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch(`/api/admin/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNote: note }),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-4 font-semibold text-foreground">Traiter la candidature</h2>

      <label className="mb-4 block text-sm">
        <span className="mb-1 block font-medium text-foreground">Statut</span>
        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value as AdmissionStatus)}
        >
          {admissionStatuses.map((s) => (
            <option key={s} value={s}>
              {admissionStatusLabels[s]}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-4 block text-sm">
        <span className="mb-1 block font-medium text-foreground">Note interne</span>
        <textarea
          rows={4}
          className="input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note visible uniquement par l'administration…"
        />
      </label>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}
      {saved && (
        <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Modifications enregistrées.
        </p>
      )}

      <button
        onClick={save}
        disabled={saving}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {saving ? "Enregistrement…" : "Enregistrer"}
      </button>
    </div>
  );
}
