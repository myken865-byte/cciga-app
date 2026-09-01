"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import NotificationBell, { type NotificationItem } from "@/components/NotificationBell";
import SectorLogo from "@/components/SectorLogo";
import type { Sector } from "@/lib/branding";
import { hasAnyRole, hasRole, type Role } from "@/lib/roles";
import { PSYCHOSOCIAL_ACCESS_ROLES } from "@/lib/psychosocialAccess";
import { schoolLabels, type SchoolKey } from "@/lib/institutions";

const ADMIN_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN"];
const SECRETARIAT_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"];
const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];
const DEMANDES_PARENTS_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT", "ACADEMIC_OFFICER"];

// Les trois pages de structure académique (École Classique / École
// Professionnelle / Université) ne sont JAMAIS listées ensemble : une seule
// est exposée, celle de l'institution active — une navigation interne ne
// doit jamais permettre de changer d'institution silencieusement.
const SCHOOL_STRUCTURE: Record<SchoolKey, { href: string; label: string }> = {
  "ecole-classique": { href: "/admin/ecole-classique", label: "Structure — École Classique" },
  "ecole-professionnelle": { href: "/admin/ecole-professionnelle", label: "Structure — École Professionnelle" },
  universite: { href: "/admin/universite", label: "Structure — Université" },
};

const tabs = [
  { href: "/admin/centre-de-commandement", label: "Centre de commandement", roles: ADMIN_LEVEL },
  { href: "/admin/dashboard", label: "Tableau de bord", roles: ADMIN_LEVEL },
  { href: "/admin/admissions", label: "Candidatures", roles: SECRETARIAT_LEVEL },
  { href: "/admin/programs", label: "Programmes", roles: ADMIN_LEVEL },
  { href: "/admin/courses", label: "Cours", roles: ADMIN_LEVEL },
  { href: "/admin/documents", label: "Bulletins", roles: ADMIN_LEVEL },
  { href: "/admin/finance", label: "Finances", roles: SECRETARIAT_LEVEL },
  { href: "/admin/demandes-parents", label: "Demandes parents", roles: DEMANDES_PARENTS_LEVEL },
  { href: "/admin/recherche", label: "Recherche", roles: DEMANDES_PARENTS_LEVEL },
  { href: "/admin/personnel", label: "Personnel", roles: ADMIN_LEVEL },
  { href: "/admin/badges", label: "Badges", roles: ADMIN_LEVEL },
  { href: "/admin/infirmerie", label: "Infirmerie", roles: ADMIN_LEVEL },
  { href: "/admin/psychosocial", label: "Suivi psychosocial", roles: PSYCHOSOCIAL_ACCESS_ROLES },
  { href: "/admin/bibliotheque", label: "Bibliothèque", roles: SECRETARIAT_LEVEL },
  { href: "/admin/transport", label: "Transport", roles: SECRETARIAT_LEVEL },
  { href: "/admin/cantine", label: "Cantine", roles: SECRETARIAT_LEVEL },
  { href: "/admin/inventaire", label: "Inventaire", roles: ADMIN_LEVEL },
  { href: "/admin/parametres", label: "Paramètres", roles: SUPER_ADMIN_ONLY },
  { href: "/admin/users", label: "Comptes", roles: ADMIN_LEVEL },
  { href: "/admin/news", label: "Contenu", roles: ADMIN_LEVEL },
  { href: "/admin/messages", label: "Messages", roles: ADMIN_LEVEL },
  { href: "/admin/audit", label: "Journal d'audit", roles: SUPER_ADMIN_ONLY },
];

function sectorForAdminPathname(pathname: string): Sector | null {
  if (pathname.startsWith("/admin/ecole-classique")) return "CLASSIQUE";
  if (pathname.startsWith("/admin/ecole-professionnelle")) return "PROFESSIONNELLE";
  if (pathname.startsWith("/admin/universite")) return "UNIVERSITE";
  return null;
}

export default function AdminNav({
  name,
  roles,
  notifications,
  activeSchool,
}: {
  name: string;
  roles: Role[];
  notifications: NotificationItem[];
  activeSchool: SchoolKey | "toutes" | null;
}) {
  const pathname = usePathname();
  const sector = sectorForAdminPathname(pathname);
  const structureTab =
    hasAnyRole(roles, ADMIN_LEVEL) && activeSchool && activeSchool !== "toutes"
      ? { ...SCHOOL_STRUCTURE[activeSchool], roles: ADMIN_LEVEL }
      : null;
  const visibleTabs = tabs.filter((tab) => hasAnyRole(roles, tab.roles));
  // Une seule page de structure — celle de l'institution active — insérée
  // juste après "Cours", jamais les trois à la fois.
  if (structureTab) {
    const coursesIndex = visibleTabs.findIndex((t) => t.href === "/admin/courses");
    visibleTabs.splice(coursesIndex + 1, 0, structureTab);
  }
  // Centre des Bulletins — hiérarchie année/classe/période propre à l'École
  // Classique, distincte du "Bulletins" générique (partagé avec les 2 autres
  // institutions, jamais modifié) — visible uniquement quand cette
  // institution est active.
  if (hasAnyRole(roles, ADMIN_LEVEL) && activeSchool === "ecole-classique") {
    const documentsIndex = visibleTabs.findIndex((t) => t.href === "/admin/documents");
    visibleTabs.splice(documentsIndex + 1, 0, {
      href: "/admin/ecole-classique/bulletins",
      label: "Centre des Bulletins",
      roles: ADMIN_LEVEL,
    });
  }
  // CONSEILLER has no admissions/secretariat access (moindre privilège) —
  // route it to its one accessible page instead of the SECRETARIAT default.
  const homeHref = hasAnyRole(roles, ADMIN_LEVEL)
    ? "/admin/dashboard"
    : hasRole(roles, "CONSEILLER") && !hasAnyRole(roles, SECRETARIAT_LEVEL)
      ? "/admin/psychosocial"
      : "/admin/admissions";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-primary-dark text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 lg:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link href={homeHref} className="flex min-w-0 items-center gap-2">
            {sector ? (
              <SectorLogo sector={sector} className="h-9 w-9 shrink-0 object-contain" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/branding/CCIGA_App_Icon.png" alt="Logo CCIGA" className="h-8 w-8 shrink-0 rounded-md object-contain" />
            )}
            <span className="hidden truncate font-semibold sm:inline">Administration CCIGA</span>
          </Link>
          <nav className="hidden gap-1 sm:flex">
            {visibleTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  pathname.startsWith(tab.href)
                    ? "bg-white/15 font-semibold"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-sm sm:gap-4">
          {activeSchool && (
            <Link
              href={`/admin/institution?next=${encodeURIComponent(pathname)}`}
              className="hidden items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 md:flex"
              title="Changer d'institution"
            >
              {activeSchool === "toutes" ? "Toutes institutions" : schoolLabels[activeSchool]}
              <span aria-hidden>⇄</span>
            </Link>
          )}
          <NotificationBell notifications={notifications} dark />
          <Link href="/mon-espace" className="hidden text-white/70 hover:text-white sm:inline">
            {name}
          </Link>
          <LogoutButton className="rounded-md border border-white/30 px-3 py-1.5 hover:bg-white/10" />
          <button
            className="flex items-center rounded-md border border-white/30 p-2 sm:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Ouvrir le menu d'administration"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-primary-dark px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            <span className="px-3 py-1 text-xs uppercase tracking-wide text-white/60">{name}</span>
            {activeSchool && (
              <Link
                href={`/admin/institution?next=${encodeURIComponent(pathname)}`}
                onClick={() => setMobileOpen(false)}
                className="mb-1 rounded-md border border-white/25 px-3 py-2 text-sm font-semibold text-white"
              >
                {activeSchool === "toutes" ? "Toutes institutions" : schoolLabels[activeSchool]} — changer
              </Link>
            )}
            {visibleTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm ${
                  pathname.startsWith(tab.href)
                    ? "bg-white/15 font-semibold"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
