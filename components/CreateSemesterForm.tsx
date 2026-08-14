"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AcademicYearOption {
  id: string;
  label: string;
}

export default function CreateSemesterForm({ academicYears }: { academicYears: AcademicYearOption[] }) {
  const router = useRouter();
  const [academicYearId, setAcademicYearId] = useState(academicYears[0]?.id ?? "");
  const [name, setName] = useState("");
  const [order, setOrder] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/semesters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ academicYearId, name, order: Number(order) }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setName("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (academicYears.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
        Créez d&apos;abord une année académique.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <h3 className="font-semibold text-foreground">Ajouter un semestre</h3>
      <select className="input" value={academicYearId} onChange={(e) => setAcademicYearId(e.target.value)}>
        {academicYears.map((y) => (
          <option key={y.id} value={y.id}>
            {y.label}
          </option>
        ))}
      </select>
      <input
        required
        className="input"
        placeholder="Ex. Semestre 1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        className="input"
        placeholder="Ordre"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />
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
