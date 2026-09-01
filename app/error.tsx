"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-14 text-center lg:px-6">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
        ⚠️
      </span>
      <h1 className="mb-3 text-2xl font-bold text-foreground lg:text-3xl">
        Une erreur est survenue
      </h1>
      <p className="mb-6 text-muted">
        Quelque chose s&apos;est mal passé. Vous pouvez réessayer, ou revenir à l&apos;accueil si le
        problème persiste.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
