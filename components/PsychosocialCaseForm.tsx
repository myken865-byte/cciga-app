"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PsychosocialCaseForm({ students }: { students: { id: number; name: string }[] }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId || !note.trim()) {
      setError("Élève et observation initiale requis.");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/psychosocial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, note: note.trim() }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(json.error);
      return;
    }
    setNote("");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-5 sm:p-6">
      <h2 className="section-label">Ouvrir un dossier</h2>
      <select className="input" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
        {students.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <textarea className="input" rows={2} placeholder="Observation initiale (confidentielle)" value={note} onChange={(e) => setNote(e.target.value)} />
      {error && <p className="text-sm text-danger">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary text-sm">{busy ? "Ouverture…" : "Ouvrir le dossier"}</button>
    </form>
  );
}
