"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SectorLogo from "@/components/SectorLogo";
import type { Sector } from "@/lib/branding";

const primaryLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/programmes", label: "Programmes" },
  { href: "/admission", label: "Admission" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

const schoolLinks = [
  { href: "/ecole-classique", label: "École Classique" },
  { href: "/ecole-professionnelle", label: "École Professionnelle" },
  { href: "/universite", label: "Université" },
];

const portalLinks = [
  { href: "/portail/etudiant", label: "Portail Étudiant" },
  { href: "/portail/parent", label: "Portail Parent" },
  { href: "/portail/enseignant", label: "Portail Enseignant" },
  { href: "/portail/administration", label: "Portail Administration" },
];

function sectorForPathname(pathname: string): Sector | null {
  if (pathname.startsWith("/ecole-classique")) return "CLASSIQUE";
  if (pathname.startsWith("/ecole-professionnelle")) return "PROFESSIONNELLE";
  if (pathname.startsWith("/universite")) return "UNIVERSITE";
  return null;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const pathname = usePathname();
  const sector = sectorForPathname(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          {sector ? (
            <SectorLogo sector={sector} className="h-10 w-10 object-contain" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/branding/CCIGA_App_Icon.png" alt="Logo CCIGA" className="h-9 w-9 rounded-md object-contain" />
          )}
          <span className="text-lg font-bold text-primary">CCIGA</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-background hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setSchoolsOpen(true)}
            onMouseLeave={() => setSchoolsOpen(false)}
          >
            <button className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-background hover:text-primary">
              Nos écoles
            </button>
            {schoolsOpen && (
              <div className="absolute left-0 top-full w-56 rounded-md border border-border bg-surface py-1 shadow-lg">
                {schoolLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-background hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setPortalsOpen(true)}
            onMouseLeave={() => setPortalsOpen(false)}
          >
            <button className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-background hover:text-primary">
              Portails
            </button>
            {portalsOpen && (
              <div className="absolute right-0 top-full w-56 rounded-md border border-border bg-surface py-1 shadow-lg">
                {portalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-background hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/admission/candidater"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-primary-dark hover:bg-accent-light"
          >
            Candidater / S&apos;inscrire
          </Link>
        </div>

        <button
          className="flex items-center rounded-md border border-border p-2 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-surface px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {[...primaryLinks, ...schoolLinks, ...portalLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-background hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admission/candidater"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-primary-dark hover:bg-accent-light"
            >
              Candidater / S&apos;inscrire
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
