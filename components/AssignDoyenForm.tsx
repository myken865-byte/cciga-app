"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StaffOption {
  id: number;
  name: string;
}

export default function AssignDoyenForm({
  facultyId,
  currentDoyenId,
  candidates,
}: {
  facultyId: string;
  currentDoyenId: number | null;
  candidates: StaffOption[];
}) {
  const router = useRouter();
  const [doyenId, setDoyenId] = useState(currentDoyenId ? String(currentDoyenId) : "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(value: string) {
    setDoyenId(value);
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/faculties/${facultyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doyenId: value || null }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-1 text-xs">
      <select
        className="input !py-1 !text-xs"
        value={doyenId}
        disabled={submitting}
        onChange={(e) => save(e.target.value)}
      >
        <option value="">Doyen : aucun (à assigner)</option>
        {candidates.map((c) => (
          <option key={c.id} value={c.id}>
            Doyen : {c.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-red-600">{error}</p>}
    </div>
  );
}
