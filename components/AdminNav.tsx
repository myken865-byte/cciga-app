"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import NotificationBell, { type NotificationItem } from "@/components/NotificationBell";

const tabs = [
  { href: "/admin/dashboard", label: "Tableau de bord" },
  { href: "/admin/admissions", label: "Candidatures" },
  { href: "/admin/programs", label: "Programmes" },
  { href: "/admin/courses", label: "Cours" },
  { href: "/admin/universite", label: "Université" },
  { href: "/admin/finance", label: "Finances" },
  { href: "/admin/users", label: "Comptes" },
  { href: "/admin/news", label: "Contenu" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminNav({
  name,
  notifications,
}: {
  name: string;
  notifications: NotificationItem[];
}) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-primary-dark text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-primary-dark">
              CG
            </span>
            <span className="font-semibold">Administration CCIGA</span>
          </Link>
          <nav className="hidden gap-1 sm:flex">
            {tabs.map((tab) => (
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
