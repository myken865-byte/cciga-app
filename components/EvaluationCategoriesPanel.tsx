"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  weightPercent: number;
}

export default function EvaluationCategoriesPanel({
  courseId,
  categories,
}: {
  courseId: string;
  categories: Category[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [weightPercent, setWeightPercent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = categories.reduce((sum, c) => sum + c.weightPercent, 0);
  const complete = Math.abs(total - 100) < 0.01;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/evaluation-categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, weightPercent: Number(weightPercent) }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setName("");
      setWeightPercent("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(id: string) {
    const res = await fetch(`/api/admin/evaluation-categories/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-3 font-semibold text-foreground">Catégories d&apos;évaluation</h2>

      {categories.length > 0 && (
        <ul className="mb-3 space-y-1 text-sm">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-md bg-background px-3 py-2">
              <span className="text-foreground">
                {c.name} — {c.weightPercent}%
              </span>
              <button
                onClick={() => remove(c.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className={`mb-3 text-sm font-medium ${complete ? "text-emerald-600" : "text-amber-600"}`}>
        Total : {total}% {complete ? "(complet)" : "— doit atteindre 100% pour permettre le calcul des notes finales"}
      </p>

      <form onSubmit={submit} className="grid grid-cols-3 gap-2">
        <input
          required
          className="input col-span-2"
          placeholder="Ex. Examen final"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="number"
          min="1"
          max="100"
          className="input"
          placeholder="%"
          value={weightPercent}
          onChange={(e) => setWeightPercent(e.target.value)}
        />
        {error && <p className="col-span-3 text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="col-span-3 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
        >
          {submitting ? "Ajout…" : "Ajouter la catégorie"}
        </button>
      </form>
    </div>
  );
}
