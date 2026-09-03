"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddQuizForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGraded, setIsGraded] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/courses/${courseId}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, isGraded, maxAttempts: Number(maxAttempts) }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setTitle("");
      setDescription("");
      setIsGraded(false);
      setMaxAttempts("1");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 card p-6">
      <h2 className="font-semibold text-foreground">Créer un quiz</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Titre du quiz</span>
        <input required className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Description (optionnel)</span>
        <textarea rows={2} className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Tentatives autorisées</span>
        <input
          required
          type="number"
          min="1"
          className="input"
          value={maxAttempts}
          onChange={(e) => setMaxAttempts(e.target.value)}
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={isGraded} onChange={(e) => setIsGraded(e.target.checked)} />
        <span className="text-foreground">Quiz noté</span>
      </label>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Création…" : "Créer le quiz"}
      </button>
    </form>
  );
}
