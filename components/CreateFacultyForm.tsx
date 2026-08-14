"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFacultyForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/faculties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school: "universite", name }),
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

  return (
    <form onSubmit={submit} className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <h3 className="font-semibold text-foreground">Ajouter une faculté / un domaine</h3>
      <input
        required
        className="input"
        placeholder="Ex. Faculté des Sciences de la Santé"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
