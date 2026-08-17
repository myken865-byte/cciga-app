"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditNewsForm({
  id,
  initialTitle,
  initialDate,
  initialCategory,
  initialExcerpt,
  initialContent,
}: {
  id: string;
  initialTitle: string;
  initialDate: string;
  initialCategory: string;
  initialExcerpt: string;
  initialContent: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [category, setCategory] = useState(initialCategory);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [content, setContent] = useState(initialContent);
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
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, category, excerpt, content }),
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
    if (!confirm("Supprimer définitivement cette actualité ?")) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        setDeleting(false);
        return;
      }
      router.push("/admin/news");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Modifier l&apos;actualité</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Titre</span>
        <input required className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Date</span>
          <input required type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Catégorie</span>
          <input required className="input" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Résumé</span>
        <textarea required rows={2} className="input" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Contenu</span>
        <textarea required rows={4} className="input" value={content} onChange={(e) => setContent(e.target.value)} />
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
