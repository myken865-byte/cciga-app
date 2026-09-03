"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InfirmaryVisitForm({ students }: { students: { id: number; name: string }[] }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [category, setCategory] = useState("");
  const [observations, setObservations] = useState("");
  const [contacted, setContacted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId || !category.trim()) {
      setError("Élève et catégorie requis.");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/infirmerie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, category: category.trim(), observations, contactedGuardian: contacted }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(json.error);
      return;
    }
    setCategory("");
    setObservations("");
    setContacted(false);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-5 sm:p-6">
      <h2 className="section-label">Enregistrer un passage</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <select className="input" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <input className="input" placeholder="Catégorie (ex. malaise, blessure légère)" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <textarea className="input" rows={2} placeholder="Observations (optionnel)" value={observations} onChange={(e) => setObservations(e.target.value)} />
      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" checked={contacted} onChange={(e) => setContacted(e.target.checked)} />
        Responsable/parent contacté
      </label>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary text-sm">{busy ? "Enregistrement…" : "Enregistrer"}</button>
    </form>
  );
}
