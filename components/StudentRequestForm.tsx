"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { studentRequestCategories, studentRequestCategoryLabels } from "@/lib/studentRequests";

export default function StudentRequestForm() {
  const router = useRouter();
  const [category, setCategory] = useState(studentRequestCategories[0]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!subject.trim()) {
      setError("L'objet est obligatoire.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/student-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, subject: subject.trim(), description: description.trim() || undefined }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Envoi impossible.");
        return;
      }
      setSuccess(true);
      setSubject("");
      setDescription("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5 sm:p-6">
      {success && (
        <p className="rounded-md bg-success-bg px-3 py-2 text-sm text-success">
          Votre demande a été envoyée à l&apos;administration.
        </p>
      )}
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Type de demande</span>
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
          {studentRequestCategories.map((c) => (
            <option key={c} value={c}>
              {studentRequestCategoryLabels[c]}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Objet</span>
        <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} required />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Description (optionnel)</span>
        <textarea className="input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "Envoi…" : "Envoyer à l'administration"}
      </button>
    </form>
  );
}
