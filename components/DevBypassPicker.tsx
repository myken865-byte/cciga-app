"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { roleList, roleLabels, rolePortalPath } from "@/lib/roles";

export default function DevBypassPicker() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(role: string) {
    setLoading(role);
    setError(null);
    try {
      const res = await fetch("/api/dev-bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        setError("Aperçu DEV indisponible dans cet environnement.");
        return;
      }
      router.push(rolePortalPath[role as keyof typeof rolePortalPath]);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-2">
      {roleList.map((role) => (
        <button
          key={role}
          onClick={() => choose(role)}
          disabled={loading !== null}
          className="card card-interactive flex w-full items-center justify-between p-4 text-left disabled:opacity-50"
        >
          <span className="font-semibold text-foreground">{roleLabels[role]}</span>
          <span className="text-sm text-muted">{loading === role ? "Ouverture…" : "Entrer"}</span>
        </button>
      ))}
      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}
    </div>
  );
}
