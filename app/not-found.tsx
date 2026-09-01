import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-14 text-center lg:px-6">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
        🧭
      </span>
      <h1 className="mb-3 text-2xl font-bold text-foreground lg:text-3xl">Page introuvable</h1>
      <p className="mb-6 text-muted">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
