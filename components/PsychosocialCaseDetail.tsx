"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  body: string;
  createdAt: string;
  author: { name: string };
}

export default function PsychosocialCaseDetail({ caseId, status, notes }: { caseId: string; status: string; notes: Note[] }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [currentStatus, setCurrentStatus] = useState(status);
  const [busy, setBusy] = useState(false);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setBusy(true);
    await fetch(`/api/admin/psychosocial/${caseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: note.trim() }),
    });
    setNote("");
    setBusy(false);
    router.refresh();
  }

  async function changeStatus(newStatus: string) {
    setCurrentStatus(newStatus);
    await fetch(`/api/admin/psychosocial/${caseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
  }

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="section-label">Dossier</h2>
        <select className="input !w-auto text-sm" value={currentStatus} onChange={(e) => changeStatus(e.target.value)}>
          <option value="ouvert">Ouvert</option>
          <option value="suivi">Suivi</option>
          <option value="cloture">Clôturé</option>
        </select>
      </div>
      <div className="mb-4 space-y-2">
        {notes.map((n) => (
          <div key={n.id} className="card p-3.5 text-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-medium text-foreground">{n.author.name}</span>
              <span className="text-xs text-muted">{n.createdAt}</span>
            </div>
            <p className="whitespace-pre-wrap text-foreground">{n.body}</p>
          </div>
        ))}
      </div>
      <form onSubmit={addNote} className="space-y-2">
        <textarea className="input" rows={3} placeholder="Nouvelle observation…" value={note} onChange={(e) => setNote(e.target.value)} />
        <button type="submit" disabled={busy || !note.trim()} className="btn-primary text-sm">Ajouter</button>
      </form>
    </div>
  );
}
