"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gradeStatusLabels } from "@/lib/universite";

export default function GradeWorkflowPanel({
  courseId,
  counts,
  canReview,
  canPublish,
}: {
  courseId: string;
  counts: { brouillon: number; soumis: number; en_verification: number; valide: number; publie: number };
  canReview: boolean;
  canPublish: boolean;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function trigger(action: "submit" | "review" | "validate" | "publish") {
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
    <div className="card p-5 sm:p-6">
      <h2 className="section-label mb-3">Flux de validation des notes</h2>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <span className="badge badge-neutral">{gradeStatusLabels.brouillon} {counts.brouillon}</span>
        <span className="badge badge-warning">{gradeStatusLabels.soumis} {counts.soumis}</span>
        <span className="badge badge-info">{gradeStatusLabels.en_verification} {counts.en_verification}</span>
        <span className="badge badge-success">{gradeStatusLabels.valide} {counts.valide}</span>
        <span className="badge badge-neutral">{gradeStatusLabels.publie} {counts.publie}</span>
      </div>

      {error && <p className="mb-3 rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => trigger("submit")}
          disabled={submitting !== null || counts.brouillon === 0}
          className="btn-secondary text-sm disabled:opacity-50"
        >
          {submitting === "submit" ? "Envoi…" : `Soumettre les brouillons (${counts.brouillon})`}
        </button>
        {canReview && (
          <>
            <button
              onClick={() => trigger("review")}
              disabled={submitting !== null || counts.soumis === 0}
              className="btn-secondary text-sm disabled:opacity-50"
            >
              {submitting === "review" ? "Envoi…" : `Mettre en vérification (${counts.soumis})`}
            </button>
            <button
              onClick={() => trigger("validate")}
              disabled={submitting !== null || counts.en_verification === 0}
              className="btn-secondary text-sm disabled:opacity-50"
            >
              {submitting === "validate" ? "Validation…" : `Valider (${counts.en_verification})`}
            </button>
          </>
        )}
        {canPublish && (
          <button
            onClick={() => trigger("publish")}
            disabled={submitting !== null || counts.valide === 0}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {submitting === "publish" ? "Publication…" : `Publier les validées (${counts.valide})`}
          </button>
        )}
      </div>
    </div>
  );
}
