"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

// Formulaire minimal de création — seuls nom et prénoms sont requis par le
// modèle (voir prisma/schema.prisma model EnrollmentForm). Toute autre
// information se saisit ensuite dans l'éditeur complet (EnrollmentFormEditor),
// vers lequel on redirige immédiatement après création.
export default function NewFicheForm({ programs }: { programs: { id: string; name: string }[] }) {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [programId, setProgramId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!lastName.trim() || !firstName.trim()) {
      setError("Nom et prénoms sont requis.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/fiches-inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastName: lastName.trim(), firstName: firstName.trim(), programId: programId || null }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      router.push(`/admin/fiches-inscription/${json.id}`);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <BackButton fallbackHref="/admin/fiches-inscription" label="Fiches d'inscription" />
      <h1 className="mb-6 text-2xl font-bold text-foreground">Nouvelle fiche d&apos;inscription</h1>

      <form onSubmit={handleSubmit} className="card max-w-lg space-y-4 p-6">
        <p className="text-sm text-muted">
          Saisissez le nom et les prénoms du candidat pour créer la fiche — les autres informations (état civil,
          photo, pièces, engagement) se complètent ensuite dans l&apos;éditeur complet.
        </p>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted">Nom</span>
          <input className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted">Prénoms</span>
          <input className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted">À la formation (optionnel)</span>
          <select className="input" value={programId} onChange={(e) => setProgramId(e.target.value)}>
            <option value="">— Sélectionner —</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button type="submit" disabled={busy} className="btn-primary text-sm">
          {busy ? "Création…" : "Créer la fiche"}
        </button>
      </form>
    </div>
  );
}
