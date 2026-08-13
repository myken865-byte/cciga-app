import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Portail Administration" };

export default function PortailAdministrationPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-14 text-center lg:px-6">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
        🔐
      </span>
      <h1 className="mb-3 text-2xl font-bold text-foreground lg:text-3xl">
        Portail Administration
      </h1>
      <p className="mb-6 text-muted">
        Le traitement des candidatures est désormais disponible pour
        l&apos;administration. Les autres fonctionnalités (finances,
        communications, rapports) seront ajoutées progressivement.
      </p>
      <Link
        href="/login"
        className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light"
      >
        Se connecter à l&apos;administration
      </Link>
    </div>
  );
}
