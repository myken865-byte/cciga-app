"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import NotificationBell, { type NotificationItem } from "@/components/NotificationBell";
import SectorLogo from "@/components/SectorLogo";
import type { Sector } from "@/lib/branding";
import { hasAnyRole, type Role } from "@/lib/roles";

const ADMIN_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN"];
const SECRETARIAT_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"];
const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];

const tabs = [
  { href: "/admin/dashboard", label: "Tableau de bord", roles: ADMIN_LEVEL },
  { href: "/admin/admissions", label: "Candidatures", roles: SECRETARIAT_LEVEL },
  { href: "/admin/programs", label: "Programmes", roles: ADMIN_LEVEL },
  { href: "/admin/courses", label: "Cours", roles: ADMIN_LEVEL },
  { href: "/admin/ecole-classique", label: "École Classique", roles: ADMIN_LEVEL },
  { href: "/admin/ecole-professionnelle", label: "École Professionnelle", roles: ADMIN_LEVEL },
  { href: "/admin/universite", label: "Université", roles: ADMIN_LEVEL },
  { href: "/admin/documents", label: "Bulletins", roles: ADMIN_LEVEL },
  { href: "/admin/finance", label: "Finances", roles: SECRETARIAT_LEVEL },
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
}: {
  name: string;
  roles: Role[];
  notifications: NotificationItem[];
}) {
  const pathname = usePathname();
  const sector = sectorForAdminPathname(pathname);
  const visibleTabs = tabs.filter((tab) => hasAnyRole(roles, tab.roles));
  const homeHref = hasAnyRole(roles, ADMIN_LEVEL) ? "/admin/dashboard" : "/admin/admissions";

  return (
    <header className="border-b border-border bg-primary-dark text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-6">
          <Link href={homeHref} className="flex items-center gap-2">
            {sector ? (
              <SectorLogo sector={sector} className="h-9 w-9 object-contain" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/branding/CCIGA_App_Icon.png" alt="Logo CCIGA" className="h-8 w-8 rounded-md object-contain" />
            )}
            <span className="font-semibold">Administration CCIGA</span>
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
        <div className="flex items-center gap-4 text-sm">
          <NotificationBell notifications={notifications} dark />
          <Link href="/mon-espace" className="text-white/70 hover:text-white">
            {name}
          </Link>
          <LogoutButton className="rounded-md border border-white/30 px-3 py-1.5 hover:bg-white/10" />
        </div>
      </div>
    </header>
  );
}
