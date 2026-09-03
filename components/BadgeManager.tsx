"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { upload } from "@vercel/blob/client";

interface BadgeRow {
  id: string;
  badgeNumber: string;
  status: string;
  user: { id: number; name: string; photoUrl: string | null };
}

const statusBadgeClass: Record<string, string> = {
  actif: "badge-success",
  perdu: "badge-danger",
  remplace: "badge-warning",
  inactif: "badge-neutral",
  a_finaliser: "badge-warning",
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function BadgeManager({ badges, candidates }: { badges: BadgeRow[]; candidates: { id: number; name: string }[] }) {
  const router = useRouter();
  const [userId, setUserId] = useState(candidates[0]?.id ?? "");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [photoBusyId, setPhotoBusyId] = useState<number | null>(null);

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>, targetUserId: number) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Photo : JPG ou PNG uniquement.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Photo trop volumineuse (4 Mo maximum).");
      return;
    }
    setPhotoBusyId(targetUserId);
    setError(null);
    try {
      const blob = await upload(`badge-photos/${crypto.randomUUID()}-${file.name}`, file, {
        access: "private",
        handleUploadUrl: "/api/admin/badges/photo/upload",
      });
      await fetch("/api/admin/badges/photo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: targetUserId, photoUrl: blob.url }),
      });
      router.refresh();
    } catch {
      setError("Échec du téléversement de la photo.");
    } finally {
      setPhotoBusyId(null);
    }
  }

  async function removePhoto(targetUserId: number) {
    setPhotoBusyId(targetUserId);
    await fetch("/api/admin/badges/photo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: targetUserId }),
    });
    setPhotoBusyId(null);
    router.refresh();
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !badgeNumber.trim()) {
      setError("Compte et numéro de badge requis.");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/badges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, badgeNumber: badgeNumber.trim() }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(json.error);
      return;
    }
    setBadgeNumber("");
    router.refresh();
  }

  async function updateStatus(badgeId: string, status: string) {
    setBusy(true);
    await fetch("/api/admin/badges", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ badgeId, status }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      {candidates.length > 0 && (
        <form onSubmit={create} className="card mb-6 space-y-3 p-5 sm:p-6">
          <h2 className="section-label">Générer un badge</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="input" value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input className="input" placeholder="Numéro de badge (unique)" value={badgeNumber} onChange={(e) => setBadgeNumber(e.target.value)} />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary text-sm">Générer</button>
        </form>
      )}

      {badges.length === 0 ? (
        <div className="empty-state">Aucun badge généré pour le moment.</div>
      ) : (
        <ul className="space-y-2">
          {badges.map((b) => (
            <li key={b.id} className="card flex flex-wrap items-center justify-between gap-3 p-3.5 text-sm">
              <div className="flex items-center gap-3">
                {b.user.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.user.photoUrl} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {initials(b.user.name)}
                  </span>
                )}
                <div>
                  <p className="font-medium text-foreground">{b.user.name}</p>
                  <p className="font-mono text-xs text-muted">{b.badgeNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="btn-secondary !min-h-0 !py-1 cursor-pointer text-xs">
                  {photoBusyId === b.user.id ? "…" : b.user.photoUrl ? "Changer photo" : "Ajouter photo"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    disabled={photoBusyId === b.user.id}
                    onChange={(e) => handlePhoto(e, b.user.id)}
                  />
                </label>
                {b.user.photoUrl && (
                  <button
                    onClick={() => removePhoto(b.user.id)}
                    disabled={photoBusyId === b.user.id}
                    className="text-xs font-semibold text-danger hover:underline"
                  >
                    Retirer
                  </button>
                )}
                <Link href={`/admin/badges/${b.id}/print`} className="btn-secondary !min-h-0 !py-1 text-xs">
                  Imprimer
                </Link>
                <select
                  className={`badge ${statusBadgeClass[b.status]} !border-0`}
                  value={b.status}
                  disabled={busy}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                >
                  <option value="actif">actif</option>
                  <option value="a_finaliser">à finaliser</option>
                  <option value="perdu">perdu</option>
                  <option value="remplace">remplacé</option>
                  <option value="inactif">inactif</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
