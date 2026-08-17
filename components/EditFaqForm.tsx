"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditFaqForm({
  id,
  initialQuestion,
  initialAnswer,
}: {
  id: string;
  initialQuestion: string;
  initialAnswer: string;
}) {
  const router = useRouter();
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/faq/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  async function remove() {
    if (!confirm("Supprimer définitivement cette question ?")) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        setDeleting(false);
        return;
      }
      router.push("/admin/faq");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Modifier la question</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Question</span>
        <input required className="input" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Réponse</span>
        <textarea required rows={4} className="input" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </label>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {saved && (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Modifications enregistrées.</p>
      )}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
        >
          {submitting ? "Enregistrement…" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={remove}
          disabled={deleting}
          className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {deleting ? "Suppression…" : "Supprimer"}
        </button>
      </div>
    </form>
  );
}
