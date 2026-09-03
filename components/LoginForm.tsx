"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ devBypassAllowed }: { devBypassAllowed: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (devBypassAllowed && !email && !password) {
      router.push("/dev-bypass");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Connexion impossible.");
        return;
      }
      router.push("/mon-espace");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-14">
      <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-accent">
        CCIGA ID
      </p>
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground">Connexion</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-surface p-6" noValidate={devBypassAllowed}>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Email</span>
          <input
            type="email"
            required={!devBypassAllowed}
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Mot de passe</span>
          <input
            type="password"
            required={!devBypassAllowed}
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
        >
          {submitting ? "Connexion…" : "Se connecter"}
        </button>
        {devBypassAllowed && (
          <p className="text-center text-xs text-muted">
            DEV/TEST : laisser les deux champs vides puis « Se connecter » ouvre le choix de portail sans identifiants.
          </p>
        )}
      </form>
    </div>
  );
}
