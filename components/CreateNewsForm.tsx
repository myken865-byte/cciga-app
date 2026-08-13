"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNewsForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, category, excerpt, content }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setCreated(json.slug);
      setTitle("");
      setCategory("");
      setExcerpt("");
      setContent("");
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
        <p className="mb-4 font-semibold text-foreground">Actualité créée — {created}</p>
        <button
          onClick={() => setCreated(null)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background"
        >
          Créer une autre actualité
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Créer une actualité</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Titre</span>
        <input required className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Date</span>
          <input
            required
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Catégorie</span>
          <input
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Résumé</span>
        <textarea
          required
          rows={2}
          className="input"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Contenu</span>
        <textarea
          required
          rows={4}
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Création…" : "Créer l'actualité"}
      </button>
    </form>
  );
}
