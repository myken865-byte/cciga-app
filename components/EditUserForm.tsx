"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { roleList, roleLabels, privilegedRoles, type Role } from "@/lib/roles";
import type { Program } from "@/lib/content";
import ProgramSelect from "@/components/ProgramSelect";

export default function EditUserForm({
  userId,
  initialName,
  initialRoles,
  initialProgramId,
  programs,
  isSuperAdmin,
  isSelf,
}: {
  userId: number;
  initialName: string;
  initialRoles: Role[];
  initialProgramId: string | null;
  programs: Program[];
  isSuperAdmin: boolean;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [programId, setProgramId] = useState(initialProgramId ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState<string | null>(null);

  const targetIsPrivileged = initialRoles.some((r) => privilegedRoles.includes(r));
  const locked = targetIsPrivileged && !isSuperAdmin && !isSelf;
  const selectableRoles = isSuperAdmin ? roleList : roleList.filter((r) => !privilegedRoles.includes(r));

  function toggleRole(role: Role) {
    setRoles((r) => (r.includes(role) ? r.filter((x) => x !== role) : [...r, role]));
  }

  if (locked) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-2 font-semibold text-foreground">Modifier le compte</h2>
        <p className="text-sm text-muted">
          Seul un Super Administrateur peut modifier un compte Administration ou Secrétariat.
        </p>
      </div>
    );
  }

  async function resetPasswordAction() {
    if (!confirm("Générer un nouveau mot de passe temporaire pour ce compte ?")) return;
    setResetting(true);
    setResetError(null);
    setResetPassword(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/reset-password`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setResetError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setResetPassword(json.temporaryPassword);
    } catch {
      setResetError("Impossible de contacter le serveur.");
    } finally {
      setResetting(false);
    }
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

  const form = (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Modifier le compte</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Nom complet</span>
        <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div>
        <span className="mb-2 block text-sm font-medium text-foreground">Rôles</span>
        <div className="flex flex-wrap gap-3">
          {selectableRoles.map((role) => (
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

  return (
    <>
      {form}
      <div className="mt-6 rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-2 font-semibold text-foreground">Réinitialiser le mot de passe</h2>
        <p className="mb-4 text-sm text-muted">
          Génère un nouveau mot de passe temporaire pour ce compte — utile si la personne l&apos;a
          oublié. Communiquez-le lui directement ; il ne sera plus affiché ensuite.
        </p>
        {resetError && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{resetError}</p>
        )}
        {resetPassword && (
          <p className="mb-4 rounded-md bg-background px-3 py-2 font-mono text-sm text-foreground">
            {resetPassword}
          </p>
        )}
        <button
          type="button"
          onClick={resetPasswordAction}
          disabled={resetting}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background disabled:opacity-50"
        >
          {resetting ? "Génération…" : "Réinitialiser le mot de passe"}
        </button>
      </div>
    </>
  );
}
