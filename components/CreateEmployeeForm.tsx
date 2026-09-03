"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEmployeeForm({ candidates }: { candidates: { id: number; name: string }[] }) {
  const router = useRouter();
  const [userId, setUserId] = useState(candidates[0]?.id ?? "");
  const [fonction, setFonction] = useState("");
  const [departement, setDepartement] = useState("");
  const [typeContrat, setTypeContrat] = useState("cdi");
  const [dateEntree, setDateEntree] = useState("");
  const [horaire, setHoraire] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !fonction.trim() || !departement.trim() || !dateEntree) {
      setError("Compte, fonction, département et date d'entrée sont obligatoires.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, fonction, departement, typeContrat, dateEntree, horaire }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur.");
        return;
      }
      router.refresh();
      setFonction("");
      setDepartement("");
      setHoraire("");
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (candidates.length === 0) {
    return <div className="empty-state">Tous les comptes existants ont déjà un profil employé, ou aucun compte n&apos;est disponible.</div>;
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-5 sm:p-6">
      <h2 className="section-label">Créer un profil employé</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <select className="input" value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
          {candidates.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select className="input" value={typeContrat} onChange={(e) => setTypeContrat(e.target.value)}>
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="vacataire">Vacataire</option>
          <option value="autre">Autre</option>
        </select>
        <input className="input" placeholder="Fonction" value={fonction} onChange={(e) => setFonction(e.target.value)} />
        <input className="input" placeholder="Département / service" value={departement} onChange={(e) => setDepartement(e.target.value)} />
        <input className="input" type="date" value={dateEntree} onChange={(e) => setDateEntree(e.target.value)} />
        <input className="input" placeholder="Horaire (optionnel)" value={horaire} onChange={(e) => setHoraire(e.target.value)} />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-primary text-sm">
        {submitting ? "Création…" : "Créer le profil"}
      </button>
    </form>
  );
}
