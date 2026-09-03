"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface VehicleRow {
  id: string;
  label: string;
  plate: string | null;
  capacity: number | null;
  driverName: string | null;
  passengers: { id: string; student: { name: string } }[];
}

export default function TransportManager({ vehicles, students }: { vehicles: VehicleRow[]; students: { id: number; name: string }[] }) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [driverName, setDriverName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [assignFor, setAssignFor] = useState<string | null>(null);
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");

  async function addVehicle(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return setError("Le nom du véhicule/circuit est requis.");
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/transport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, plate, capacity, driverName }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setError(json.error);
    setLabel(""); setPlate(""); setCapacity(""); setDriverName("");
    router.refresh();
  }

  async function assign(vehicleId: string) {
    if (!studentId) return;
    setBusy(true);
    await fetch(`/api/admin/transport/${vehicleId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId }),
    });
    setBusy(false);
    setAssignFor(null);
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={addVehicle} className="card mb-6 space-y-3 p-5 sm:p-6">
        <h2 className="section-label">Ajouter un véhicule / circuit</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Nom du circuit/véhicule" value={label} onChange={(e) => setLabel(e.target.value)} />
          <input className="input" placeholder="Plaque (optionnel)" value={plate} onChange={(e) => setPlate(e.target.value)} />
          <input className="input" type="number" placeholder="Capacité (optionnel)" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          <input className="input" placeholder="Chauffeur / personnel autorisé" value={driverName} onChange={(e) => setDriverName(e.target.value)} />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary text-sm">Ajouter</button>
      </form>

      {vehicles.length === 0 ? (
        <div className="empty-state">Aucun véhicule ou circuit enregistré.</div>
      ) : (
        <ul className="space-y-2">
          {vehicles.map((v) => (
            <li key={v.id} className="card p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">{v.label}</p>
                  <p className="text-xs text-muted">
                    {v.driverName ?? "Chauffeur À COMPLÉTER"} {v.capacity ? `· Capacité ${v.capacity}` : ""}
                  </p>
                </div>
                <span className="badge badge-info">{v.passengers.length} passager(s)</span>
              </div>
              {v.passengers.length > 0 && (
                <ul className="mb-2 flex flex-wrap gap-1.5">
                  {v.passengers.map((p) => <span key={p.id} className="badge badge-neutral">{p.student.name}</span>)}
                </ul>
              )}
              {assignFor === v.id ? (
                <div className="flex flex-wrap items-center gap-2">
                  <select className="input !w-auto text-xs" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
                    {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <button onClick={() => assign(v.id)} disabled={busy} className="btn-secondary !min-h-0 !py-1 text-xs">Confirmer</button>
                </div>
              ) : (
                <button onClick={() => setAssignFor(v.id)} className="btn-secondary !min-h-0 !py-1 text-xs">Affecter un élève</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
