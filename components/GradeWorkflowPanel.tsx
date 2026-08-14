"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gradeStatusLabels } from "@/lib/universite";

export default function GradeWorkflowPanel({
  courseId,
  counts,
  isAdmin,
}: {
  courseId: string;
  counts: { brouillon: number; soumis: number; valide: number; publie: number };
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function trigger(action: "submit" | "validate" | "publish") {
    setSubmitting(action);
    setError(null);
    try {
      const url =
        action === "submit"
          ? `/api/courses/${courseId}/grades/submit`
          : `/api/admin/courses/${courseId}/grades/${action}`;
      const res = await fetch(url, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-3 font-semibold text-foreground">Flux de validation des notes</h2>
      <ul className="mb-3 space-y-1 text-sm text-muted">
        <li>
          {gradeStatusLabels.brouillon} : <span className="font-semibold text-foreground">{counts.brouillon}</span>
        </li>
        <li>
          {gradeStatusLabels.soumis} : <span className="font-semibold text-foreground">{counts.soumis}</span>
        </li>
        <li>
          {gradeStatusLabels.valide} : <span className="font-semibold text-foreground">{counts.valide}</span>
        </li>
        <li>
          {gradeStatusLabels.publie} : <span className="font-semibold text-foreground">{counts.publie}</span>
        </li>
      </ul>

      {error && <p className="mb-2 text-xs text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => trigger("submit")}
          disabled={submitting !== null || counts.brouillon === 0}
          className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-background disabled:opacity-50"
        >
          {submitting === "submit" ? "Envoi…" : `Soumettre les brouillons (${counts.brouillon})`}
        </button>
        {isAdmin && (
          <>
            <button
              onClick={() => trigger("validate")}
              disabled={submitting !== null || counts.soumis === 0}
              className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-background disabled:opacity-50"
            >
              {submitting === "validate" ? "Validation…" : `Valider les soumises (${counts.soumis})`}
            </button>
            <button
              onClick={() => trigger("publish")}
              disabled={submitting !== null || counts.valide === 0}
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
            >
              {submitting === "publish" ? "Publication…" : `Publier les validées (${counts.valide})`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
