"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { roleList, roleLabels, type Role } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";

interface StudentOption {
  id: number;
  name: string;
}

export default function CreateUserForm({ students }: { students: StudentOption[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [childId, setChildId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ id: number; password: string } | null>(null);

  function toggleRole(role: Role) {
    setRoles((r) => (r.includes(role) ? r.filter((x) => x !== role) : [...r, role]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          roles,
          childId: roles.includes("PARENT") && childId ? Number(childId) : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setCreated({ id: json.id, password: json.temporaryPassword });
      setName("");
      setEmail("");
      setRoles([]);
      setChildId("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (created) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="mb-2 text-2xl">✅</p>
        <p className="mb-1 font-semibold text-foreground">Compte créé</p>
        <p className="mb-4 text-sm text-muted">
          {formatCcigaId(created.id)} — communiquez ce mot de passe temporaire à
          la personne concernée, il ne sera plus affiché ensuite.
        </p>
        <p className="mb-4 rounded-md bg-background px-3 py-2 font-mono text-sm text-foreground">
          {created.password}
        </p>
        <button
          onClick={() => setCreated(null)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background"
        >
          Créer un autre compte
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Créer un compte</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Nom complet</span>
        <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Email</span>
        <input
          required
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

      {roles.includes("PARENT") && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Enfant (étudiant)</span>
          <select className="input" value={childId} onChange={(e) => setChildId(e.target.value)}>
            <option value="">Aucun (à lier plus tard)</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting || roles.length === 0}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Création…" : "Créer le compte"}
      </button>
    </form>
  );
}
