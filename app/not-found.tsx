import Link from "next/link";
import { getSession } from "@/lib/auth";
import { rolePortalPath } from "@/lib/roles";
import BackButton from "@/components/BackButton";

// Mandat "Audit global boutons de retour" : remplace le 404 générique de
// Next.js ("This page could not be found", sans issue) par un écran qui
// respecte la même règle que le reste de l'app — jamais de page sans
// sortie. Sert pour TOUTE route inexistante, dans n'importe quel portail.
export const dynamic = "force-dynamic";

export default async function NotFound() {
  const session = await getSession();
  const homeHref = session ? rolePortalPath[session.roles[0]] : "/";
  const homeLabel = session ? "Retour à mon espace" : "Retour à l'accueil";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">CCIGA</p>
        <h1 className="mb-2 text-xl font-bold text-foreground">Page introuvable</h1>
        <p className="mb-6 text-sm text-muted">
          Cette page n&apos;existe pas ou n&apos;est plus disponible. Vous pouvez revenir à l&apos;écran précédent ou
          rejoindre votre espace.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <BackButton fallbackHref={homeHref} className="!mb-0" />
          <Link href={homeHref} className="btn-primary text-sm">
            {homeLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
