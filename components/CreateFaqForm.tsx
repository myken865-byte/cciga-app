"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFaqForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setCreated(true);
      setQuestion("");
      setAnswer("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (created) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="mb-2 text-2xl">✅</p>
        <p className="mb-4 font-semibold text-foreground">Question ajoutée</p>
        <button
          onClick={() => setCreated(false)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background"
        >
          Ajouter une autre question
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Ajouter une question</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Question</span>
        <input required className="input" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Réponse</span>
        <textarea
          required
          rows={4}
          className="input"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Ajout…" : "Ajouter"}
      </button>
    </form>
  );
}
