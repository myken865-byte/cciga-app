import type { ParentPortalTheme } from "@/lib/parentPortalTheme";

/**
 * Mission "Portail Parent multi-institutions" (2026-09-13) — bandeau
 * d'identité de l'institution, au-dessus de la pile de navigation
 * (ParentNavPills). Purement présentationnel, alimenté par le thème déjà
 * résolu par getParentPortalTheme() côté page.
 */
export default function ParentPortalBanner({ theme, childName }: { theme: ParentPortalTheme; childName: string }) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-surface px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{theme.institutionLabel}</p>
      <p className="text-sm text-muted">
        Suivi de <span className="font-medium text-foreground">{childName}</span> — {theme.tagline}
      </p>
    </div>
  );
}
