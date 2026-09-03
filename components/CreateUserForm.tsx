"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { roleList, roleLabels, privilegedRoles, type Role } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import type { Program } from "@/lib/content";
import ProgramSelect from "@/components/ProgramSelect";

interface StudentOption {
  id: number;
  name: string;
}

interface ParentOption {
  id: number;
  name: string;
}

export default function CreateUserForm({
  students,
  parents,
  programs,
  isSuperAdmin,
  defaultRoles,
}: {
  students: StudentOption[];
  parents: ParentOption[];
  programs: Program[];
  isSuperAdmin: boolean;
  defaultRoles?: Role[];
}) {
  const router = useRouter();
  const selectableRoles = isSuperAdmin ? roleList : roleList.filter((r) => !privilegedRoles.includes(r));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<Role[]>(defaultRoles ?? []);
  const [childId, setChildId] = useState("");
  const [parentId, setParentId] = useState("");
  const [programId, setProgramId] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ id: number; password: string } | null>(null);

  function toggleRole(role: Role) {
    setRoles((r) => (r.includes(role) ? r.filter((x) => x !== role) : [...r, role]));
  }

  async function handlePhotoSelect(file: File | undefined) {
    if (!file) return;
    setUploadingPhoto(true);
    setError(null);
    try {
      const blob = await upload(`badge-photos/${crypto.randomUUID()}-${file.name}`, file, {
        access: "private",
        handleUploadUrl: "/api/admin/badges/photo/upload",
      });
      setPhotoUrl(blob.url);
    } catch {
      setError("Échec du téléversement de la photo.");
    } finally {
      setUploadingPhoto(false);
    }
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
          programId: roles.includes("STUDENT") && programId ? programId : undefined,
          parentId: roles.includes("STUDENT") && parentId ? Number(parentId) : undefined,
          photoUrl: photoUrl || undefined,
          dob: dob || undefined,
          phone: phone || undefined,
          address: address || undefined,
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
      setParentId("");
      setProgramId("");
      setPhotoUrl("");
      setDob("");
      setPhone("");
      setAddress("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (created) {
    return (
      <div className="card p-6">
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
          className="btn-secondary"
        >
          Créer un autre compte
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 card p-6">
      <h2 className="font-semibold text-foreground">+ Ajouter un compte</h2>

      <div className="flex items-center gap-4">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt="" className="h-14 w-14 rounded-full object-cover" />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background text-xs text-muted">
            Photo
          </div>
        )}
        <label className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-xs font-medium text-primary hover:border-primary">
          {uploadingPhoto ? "Envoi…" : "Ajouter une photo"}
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            disabled={uploadingPhoto}
            onChange={(e) => handlePhotoSelect(e.target.files?.[0])}
          />
        </label>
      </div>

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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Date de naissance</span>
          <input type="date" className="input" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Téléphone</span>
          <input type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Adresse</span>
        <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
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
        <>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Programme (niveau + classe)</span>
            <ProgramSelect
              programs={programs}
              value={programId}
              onChange={setProgramId}
              includeEmpty
              emptyLabel="Aucun (à assigner plus tard)"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Parent / tuteur</span>
            <select className="input" value={parentId} onChange={(e) => setParentId(e.target.value)}>
              <option value="">Aucun (à lier plus tard)</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

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
