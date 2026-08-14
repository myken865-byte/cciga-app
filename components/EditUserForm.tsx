"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { roleList, roleLabels, type Role } from "@/lib/roles";
import type { Program } from "@/lib/content";
import ProgramSelect from "@/components/ProgramSelect";

export default function EditUserForm({
  userId,
  initialName,
  initialRoles,
  initialProgramId,
  programs,
}: {
  userId: number;
  initialName: string;
  initialRoles: Role[];
  initialProgramId: string | null;
  programs: Program[];
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [programId, setProgramId] = useState(initialProgramId ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function toggleRole(role: Role) {
    setRoles((r) => (r.includes(role) ? r.filter((x) => x !== role) : [...r, role]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          roles,
          programId: roles.includes("STUDENT") && programId ? programId : null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Modifier le compte</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Nom complet</span>
        <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div>
        <span className="mb-2 block text-sm font-medium text-foreground">Rôles</span>
        <div className="flex flex-wrap gap-3">
          {roleList.map((role) => (
            <label key={role} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={roles.includes(role)}
                onChange={() => toggleRole(role)}
                className="h-4 w-4"
              />
              {roleLabels[role]}
            </label>
          ))}
        </div>
      </div>
      {roles.includes("STUDENT") && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Programme (niveau + classe)</span>
          <ProgramSelect
            programs={programs}
            value={programId}
            onChange={setProgramId}
            includeEmpty
            emptyLabel="Aucun"
          />
        </label>
      )}

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {saved && (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Modifications enregistrées.
        </p>
      )}
      <button
        type="submit"
        disabled={submitting || roles.length === 0}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
