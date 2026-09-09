"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ListSearchBar from "@/components/admin/ListSearchBar";
import { matchesSearch } from "@/lib/searchNormalize";

interface MenuRow {
  id: string;
  date: string;
  label: string;
  description: string | null;
  reservations: { id: string; student: { name: string } }[];
}

export default function CanteenManager({ menus, students }: { menus: MenuRow[]; students: { id: number; name: string }[] }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [reserveFor, setReserveFor] = useState<string | null>(null);
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const filteredMenus = useMemo(
    () =>
      query.trim()
        ? menus.filter((m) => matchesSearch(query, m.label, m.date, m.description, ...m.reservations.map((r) => r.student.name)))
        : menus,
    [menus, query],
  );

  async function addMenu(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !label.trim()) return setError("Date et libellé requis.");
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/cantine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, label, description }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setError(json.error);
    setDate(""); setLabel(""); setDescription("");
    router.refresh();
  }

  async function reserve(menuId: string) {
    if (!studentId) return;
    setBusy(true);
    await fetch(`/api/admin/cantine/${menuId}/reserve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId }),
    });
    setBusy(false);
    setReserveFor(null);
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={addMenu} className="card mb-6 space-y-3 p-5 sm:p-6">
        <h2 className="section-label">Ajouter un menu</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input className="input" placeholder="Libellé (ex. Déjeuner)" value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>
        <textarea className="input" rows={2} placeholder="Description (optionnel)" value={description} onChange={(e) => setDescription(e.target.value)} />
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary text-sm">Ajouter</button>
      </form>

      {menus.length === 0 ? (
        <div className="empty-state">Aucun menu programmé.</div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <ListSearchBar
              value={query}
              onChange={setQuery}
              placeholder="Rechercher par menu, date, élève…"
              className="max-w-xs flex-1"
            />
            {query && (
              <span className="text-xs text-muted">
                {filteredMenus.length} / {menus.length} résultat{menus.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          {filteredMenus.length === 0 ? (
            <p className="empty-state">Aucun résultat pour cette recherche.</p>
          ) : (
        <ul className="space-y-2">
          {filteredMenus.map((m) => (
            <li key={m.id} className="card p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">{m.label} — {m.date}</p>
                  {m.description && <p className="text-xs text-muted">{m.description}</p>}
                </div>
                <span className="badge badge-info">{m.reservations.length} réservation(s)</span>
              </div>
              {reserveFor === m.id ? (
                <div className="flex flex-wrap items-center gap-2">
                  <select className="input !w-auto text-xs" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
                    {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <button onClick={() => reserve(m.id)} disabled={busy} className="btn-secondary !min-h-0 !py-1 text-xs">Confirmer</button>
                </div>
              ) : (
                <button onClick={() => setReserveFor(m.id)} className="btn-secondary !min-h-0 !py-1 text-xs">Réserver pour un élève</button>
              )}
            </li>
          ))}
        </ul>
          )}
        </>
      )}
    </div>
  );
}
