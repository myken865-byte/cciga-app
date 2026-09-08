"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";

export default function NouvelleInscriptionEcoleClassiquePage() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/inscriptions-ecole-classique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastName, firstName }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      router.push(`/admin/inscriptions-ecole-classique/${json.id}`);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/inscriptions-ecole-classique" label="Fiches d'inscription — École Classique" />
      <AdminTitleBand
        eyebrow="CCIGA — École Classique"
        title="Nouvelle fiche d'inscription — École Classique"
      />
      <AdminCard className="max-w-md">
        <form onSubmit={submit} className="space-y-4">
          <p className="text-sm text-muted">
            Renseignez le nom de l&apos;enfant pour créer la fiche — la photo, les responsables, la santé et la fratrie se
            complètent sur la page suivante.
          </p>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-muted">Nom de famille</span>
            <input required className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-muted">Prénom</span>
            <input required className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary text-sm">
            {busy ? "Création…" : "Créer la fiche"}
          </button>
        </form>
      </AdminCard>
    </AdminShell>
  );
}
