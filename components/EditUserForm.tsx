"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { roleList, roleLabels, privilegedRoles, type Role } from "@/lib/roles";
import type { Program } from "@/lib/content";
import ProgramSelect from "@/components/ProgramSelect";
import BackButton from "@/components/BackButton";

interface ParentOption {
  id: number;
  name: string;
}

export default function EditUserForm({
  userId,
  initialName,
  initialRoles,
  initialProgramId,
  initialPhotoUrl,
  initialDob,
  initialPhone,
  initialAddress,
  initialActive,
  initialParentId,
  parents,
  programs,
  isSuperAdmin,
  isSelf,
}: {
  userId: number;
  initialName: string;
  initialRoles: Role[];
  initialProgramId: string | null;
  initialPhotoUrl: string | null;
  initialDob: string | null;
  initialPhone: string | null;
  initialAddress: string | null;
  initialActive: boolean;
  initialParentId: number | null;
  parents: ParentOption[];
  programs: Program[];
  isSuperAdmin: boolean;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [programId, setProgramId] = useState(initialProgramId ?? "");
  const [parentId, setParentId] = useState(initialParentId ? String(initialParentId) : "");
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl ?? "");
  const [dob, setDob] = useState(initialDob ?? "");
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [address, setAddress] = useState(initialAddress ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) setDirty(true);
    else mounted.current = true;
  }, [name, roles, programId, parentId, photoUrl, dob, phone, address]);

  const targetIsPrivileged = initialRoles.some((r) => privilegedRoles.includes(r));
  const locked = targetIsPrivileged && !isSuperAdmin && !isSelf;
  const selectableRoles = isSuperAdmin ? roleList : roleList.filter((r) => !privilegedRoles.includes(r));

  function toggleRole(role: Role) {
    setRoles((r) => (r.includes(role) ? r.filter((x) => x !== role) : [...r, role]));
  }

  if (locked) {
    return (
      <>
        <BackButton fallbackHref="/admin/users" label="Tous les comptes" />
        <div className="card p-6">
          <h2 className="mb-2 font-semibold text-foreground">Modifier le compte</h2>
          <p className="text-sm text-muted">
            Seul un Super Administrateur peut modifier un compte Administration ou Secrétariat.
          </p>
        </div>
      </>
    );
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

  async function toggleArchive() {
    const willArchive = initialActive;
    const label = willArchive ? "archiver" : "réactiver";
    if (!confirm(`Confirmer : ${label} ce compte ?`)) return;
    setArchiving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roles, programId: roles.includes("STUDENT") && programId ? programId : null, active: !willArchive }),
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
      setArchiving(false);
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
          parentId: roles.includes("STUDENT") ? (parentId ? Number(parentId) : null) : undefined,
          photoUrl,
          dob: dob || null,
          phone: phone || null,
          address: address || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      setDirty(false);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  const form = (
    <form onSubmit={submit} className="space-y-4 card p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-foreground">Modifier le compte</h2>
        {!initialActive && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            Archivé
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background text-xs text-muted">
            Photo
          </div>
        )}
        <label className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-xs font-medium text-primary hover:border-primary">
          {uploadingPhoto ? "Envoi…" : photoUrl ? "Changer la photo" : "Ajouter une photo"}
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
              emptyLabel="Aucun"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Parent / tuteur</span>
            <select className="input" value={parentId} onChange={(e) => setParentId(e.target.value)}>
              <option value="">Aucun</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </>
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
      <BackButton fallbackHref="/admin/users" label="Tous les comptes" confirmIfUnsaved={dirty} />
      {form}
      <div className="mt-6 card p-6">
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
          className="btn-secondary disabled:opacity-50"
        >
          {resetting ? "Génération…" : "Réinitialiser le mot de passe"}
        </button>
      </div>

      {!isSelf && (
        <div className="mt-6 card p-6">
          <h2 className="mb-2 font-semibold text-foreground">
            {initialActive ? "Archiver ce compte" : "Réactiver ce compte"}
          </h2>
          <p className="mb-4 text-sm text-muted">
            {initialActive
              ? "Bloque l'accès du compte sans supprimer son historique (notes, présences, bulletins, documents) — réversible à tout moment."
              : "Ce compte est archivé et ne peut pas se connecter. La réactivation restaure l'accès immédiatement."}
          </p>
          <button
            type="button"
            onClick={toggleArchive}
            disabled={archiving}
            className={`disabled:opacity-50 ${
              initialActive
                ? "rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100"
                : "btn-secondary"
            }`}
          >
            {archiving ? "…" : initialActive ? "Archiver" : "Réactiver"}
          </button>
        </div>
      )}
    </>
  );
}
