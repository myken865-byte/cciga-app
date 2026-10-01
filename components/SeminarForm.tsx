"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeminarForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [location, setLocation] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !startAt) {
      setError("Titre et date/heure de début sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/seminars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          theme: theme.trim() || undefined,
          speaker: speaker.trim() || undefined,
          location: location.trim() || undefined,
          startAt,
          endAt: endAt || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Création impossible.");
        return;
      }
      setSuccess(true);
      setTitle("");
      setTheme("");
      setSpeaker("");
      setLocation("");
      setStartAt("");
      setEndAt("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5 sm:p-6">
      {success && <p className="rounded-md bg-success-bg px-3 py-2 text-sm text-success">Séminaire créé.</p>}
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Titre</span>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Thème (optionnel)</span>
          <input className="input" value={theme} onChange={(e) => setTheme(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Intervenant (optionnel)</span>
          <input className="input" value={speaker} onChange={(e) => setSpeaker(e.target.value)} />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Lieu (optionnel)</span>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Début</span>
          <input
            type="datetime-local"
            className="input"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Fin (optionnel)</span>
          <input type="datetime-local" className="input" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
        </label>
      </div>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "Création…" : "Créer le séminaire"}
      </button>
    </form>
  );
}
