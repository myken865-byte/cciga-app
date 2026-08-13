"use client";

import { useState } from "react";
import { formatCcigaId } from "@/lib/cciga-id";

export default function CreateStudentAccountButton({ id }: { id: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ id: number; password?: string } | null>(null);

  async function createAccount() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/admissions/${id}/create-account`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setCreated({ id: json.id, password: json.temporaryPassword });
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
        <p className="mb-1 font-semibold text-foreground">
          Compte créé — {formatCcigaId(created.id)}
        </p>
        {created.password && (
          <>
            <p className="mb-2 text-sm text-muted">
              Mot de passe temporaire (à communiquer à l&apos;étudiant, affiché une seule fois) :
            </p>
            <p className="rounded-md bg-background px-3 py-2 font-mono text-sm text-foreground">
              {created.password}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-2 font-semibold text-foreground">Compte étudiant</h2>
      <p className="mb-4 text-sm text-muted">
        Ce dossier est admis. Créez le compte CCIGA ID de l&apos;étudiant pour
        activer son portail.
      </p>
      {error && (
        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}
      <button
        onClick={createAccount}
        disabled={submitting}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Création…" : "Créer le compte étudiant"}
      </button>
    </div>
  );
}
