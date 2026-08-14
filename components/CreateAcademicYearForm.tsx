"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAcademicYearForm() {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/academic-years", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, startDate, endDate, isActive }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setLabel("");
      setStartDate("");
      setEndDate("");
      setIsActive(false);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <h3 className="font-semibold text-foreground">Ajouter une année académique</h3>
      <input
        required
        className="input"
        placeholder="Ex. 2025-2026"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <input required type="date" className="input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input required type="date" className="input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Année active
      </label>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Ajout…" : "Ajouter"}
      </button>
    </form>
  );
}
