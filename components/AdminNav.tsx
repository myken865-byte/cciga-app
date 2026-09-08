"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import NotificationBell, { type NotificationItem } from "@/components/NotificationBell";
import SectorLogo from "@/components/SectorLogo";
import type { Sector } from "@/lib/branding";
import { hasAnyRole, hasRole, type Role } from "@/lib/roles";
import { PSYCHOSOCIAL_ACCESS_ROLES } from "@/lib/psychosocialAccess";
import { schoolLabels, type SchoolKey } from "@/lib/institutions";
import { nextSchoolInCycle, resolveEquivalentAdminPath } from "@/lib/institutionSwitch";

const ADMIN_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN"];
const SECRETARIAT_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"];
const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];
const DEMANDES_PARENTS_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT", "ACADEMIC_OFFICER"];

const SIDEBAR_COLLAPSE_KEY = "cciga-admin-sidebar-collapsed";

// List pages whose own nav entry (no query string) must match the pathname
// exactly rather than by prefix, since they have sibling subpages
// (nouvelle/eleves/[id]…) with their own distinct tabs.
const EXACT_MATCH_LIST_PATHS = ["/admin/fiches-inscription", "/admin/inscriptions-ecole-classique"];

// Regroupement purement visuel de la sidebar — n'affecte ni les permissions,
// ni les routes, ni la liste des modules réellement affichés (voir `tabs` /
// les insertions conditionnelles plus bas, strictement inchangées).
type NavGroup = "Général" | "Académique" | "Inscriptions" | "École Classique" | "Vie scolaire" | "Administration" | "Outils";
// Refonte visuelle du dashboard (2026-09-07) : "Administration" est
// volontairement placée en dernier — ce groupe reçoit un traitement visuel
// spécial (bloc encadré + logo, voir dash-admin-block plus bas), donc toutes
// les autres cases du dashboard doivent apparaître au-dessus de lui.
const GROUP_ORDER: NavGroup[] = ["Général", "Académique", "Inscriptions", "École Classique", "Vie scolaire", "Outils", "Administration"];

// Les trois pages de structure académique (École Classique / École
// Professionnelle / Université) ne sont JAMAIS listées ensemble : une seule
// est exposée, celle de l'institution active — une navigation interne ne
// doit jamais permettre de changer d'institution silencieusement.
const SCHOOL_STRUCTURE: Record<SchoolKey, { href: string; label: string }> = {
  "ecole-classique": { href: "/admin/ecole-classique", label: "Structure — École Classique" },
  "ecole-professionnelle": { href: "/admin/ecole-professionnelle", label: "Structure — École Professionnelle" },
  universite: { href: "/admin/universite", label: "Structure — Université" },
};

const tabs: { href: string; label: string; roles: Role[]; icon: string; group: NavGroup }[] = [
  { href: "/admin/centre-de-commandement", label: "Centre de commandement", roles: ADMIN_LEVEL, icon: "🧭", group: "Général" },
  { href: "/admin/dashboard", label: "Tableau de bord", roles: ADMIN_LEVEL, icon: "📊", group: "Général" },
  { href: "/admin/admissions", label: "Candidatures", roles: SECRETARIAT_LEVEL, icon: "📝", group: "Académique" },
  { href: "/admin/programs", label: "Programmes", roles: ADMIN_LEVEL, icon: "🎓", group: "Académique" },
  { href: "/admin/courses", label: "Cours", roles: ADMIN_LEVEL, icon: "📚", group: "Académique" },
  { href: "/admin/documents", label: "Bulletins", roles: ADMIN_LEVEL, icon: "🗂️", group: "Académique" },
  { href: "/admin/finance", label: "Finances", roles: SECRETARIAT_LEVEL, icon: "💰", group: "Administration" },
  { href: "/admin/demandes-parents", label: "Demandes parents", roles: DEMANDES_PARENTS_LEVEL, icon: "💬", group: "Administration" },
  { href: "/admin/recherche", label: "Recherche", roles: DEMANDES_PARENTS_LEVEL, icon: "🔍", group: "Outils" },
  { href: "/admin/personnel", label: "Personnel", roles: ADMIN_LEVEL, icon: "👥", group: "Vie scolaire" },
  { href: "/admin/badges", label: "Badges", roles: ADMIN_LEVEL, icon: "🪪", group: "Vie scolaire" },
  { href: "/admin/infirmerie", label: "Infirmerie", roles: ADMIN_LEVEL, icon: "🩺", group: "Vie scolaire" },
  { href: "/admin/psychosocial", label: "Suivi psychosocial", roles: PSYCHOSOCIAL_ACCESS_ROLES, icon: "🧠", group: "Vie scolaire" },
  { href: "/admin/bibliotheque", label: "Bibliothèque", roles: SECRETARIAT_LEVEL, icon: "📕", group: "Vie scolaire" },
  { href: "/admin/transport", label: "Transport", roles: SECRETARIAT_LEVEL, icon: "🚌", group: "Vie scolaire" },
  { href: "/admin/cantine", label: "Cantine", roles: SECRETARIAT_LEVEL, icon: "🍽️", group: "Vie scolaire" },
  { href: "/admin/inventaire", label: "Inventaire", roles: ADMIN_LEVEL, icon: "📦", group: "Vie scolaire" },
  { href: "/admin/parametres", label: "Paramètres", roles: SUPER_ADMIN_ONLY, icon: "⚙️", group: "Administration" },
  { href: "/admin/users", label: "Comptes", roles: ADMIN_LEVEL, icon: "👤", group: "Administration" },
  { href: "/admin/news", label: "Contenu", roles: ADMIN_LEVEL, icon: "📰", group: "Administration" },
  { href: "/admin/messages", label: "Messages", roles: ADMIN_LEVEL, icon: "✉️", group: "Administration" },
  { href: "/admin/audit", label: "Journal d'audit", roles: SUPER_ADMIN_ONLY, icon: "🧾", group: "Administration" },
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
  children,
}: {
  name: string;
  roles: Role[];
  notifications: NotificationItem[];
  activeSchool: SchoolKey | "toutes" | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [switchingSchool, setSwitchingSchool] = useState(false);
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");
  const sector = sectorForAdminPathname(pathname);
  const structureTab =
    hasAnyRole(roles, ADMIN_LEVEL) && activeSchool && activeSchool !== "toutes"
      ? { ...SCHOOL_STRUCTURE[activeSchool], roles: ADMIN_LEVEL, icon: "🏫", group: "Académique" as NavGroup }
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
      icon: "📖",
      group: "École Classique",
    });
  }
  // Inscriptions — module du Secrétariat propre à l'École Professionnelle,
  // distinct des "Candidatures" (partagées avec les 2 autres institutions,
  // jamais modifiées) — groupe dédié avec ses statuts en entrées directes,
  // visible uniquement quand cette institution est active.
  if (hasAnyRole(roles, SECRETARIAT_LEVEL) && activeSchool === "ecole-professionnelle") {
    visibleTabs.push(
      { href: "/admin/fiches-inscription/nouvelle", label: "Nouvelle fiche d'inscription", roles: SECRETARIAT_LEVEL, icon: "🆕", group: "Inscriptions" },
      { href: "/admin/fiches-inscription", label: "Fiches enregistrées", roles: SECRETARIAT_LEVEL, icon: "🗒️", group: "Inscriptions" },
      { href: "/admin/fiches-inscription?status=incomplet", label: "Fiches incomplètes", roles: SECRETARIAT_LEVEL, icon: "⚠️", group: "Inscriptions" },
      { href: "/admin/fiches-inscription?status=a_verifier", label: "Fiches à vérifier", roles: SECRETARIAT_LEVEL, icon: "🔎", group: "Inscriptions" },
      { href: "/admin/fiches-inscription?status=validee", label: "Fiches validées", roles: SECRETARIAT_LEVEL, icon: "✅", group: "Inscriptions" },
    );
  }
  // Inscriptions Université — mêmes routes que l'École Professionnelle
  // ci-dessus (modèle EnrollmentForm partagé via le champ `school`, jamais
  // un second moteur d'inscription) — voir
  // PROMPT_OFFICIEL_INSCRIPTION_UNIVERSITE_BADGE_AUTOMATIQUE.
  if (hasAnyRole(roles, SECRETARIAT_LEVEL) && activeSchool === "universite") {
    visibleTabs.push(
      { href: "/admin/fiches-inscription/nouvelle", label: "Nouvelle fiche d'inscription", roles: SECRETARIAT_LEVEL, icon: "🆕", group: "Inscriptions" },
      { href: "/admin/fiches-inscription", label: "Fiches enregistrées", roles: SECRETARIAT_LEVEL, icon: "🗒️", group: "Inscriptions" },
      { href: "/admin/fiches-inscription?status=incomplet", label: "Fiches incomplètes", roles: SECRETARIAT_LEVEL, icon: "⚠️", group: "Inscriptions" },
      { href: "/admin/fiches-inscription?status=a_verifier", label: "Fiches à vérifier", roles: SECRETARIAT_LEVEL, icon: "🔎", group: "Inscriptions" },
      { href: "/admin/fiches-inscription?status=validee", label: "Fiches validées", roles: SECRETARIAT_LEVEL, icon: "✅", group: "Inscriptions" },
    );
  }
  // Inscriptions — module du Secrétariat propre à l'École Classique, modèle
  // et routes strictement distincts de la fiche École Professionnelle
  // ci-dessus (voir ClassicEnrollmentForm) — jamais mélangés.
  if (hasAnyRole(roles, SECRETARIAT_LEVEL) && activeSchool === "ecole-classique") {
    visibleTabs.push(
      { href: "/admin/inscriptions-ecole-classique/nouvelle", label: "Nouvelle inscription", roles: SECRETARIAT_LEVEL, icon: "🆕", group: "Inscriptions" },
      { href: "/admin/inscriptions-ecole-classique", label: "Fiches enregistrées", roles: SECRETARIAT_LEVEL, icon: "🗒️", group: "Inscriptions" },
      { href: "/admin/inscriptions-ecole-classique?status=incomplet", label: "Fiches incomplètes", roles: SECRETARIAT_LEVEL, icon: "⚠️", group: "Inscriptions" },
      { href: "/admin/inscriptions-ecole-classique?status=a_verifier", label: "Fiches à vérifier", roles: SECRETARIAT_LEVEL, icon: "🔎", group: "Inscriptions" },
      { href: "/admin/inscriptions-ecole-classique?status=validee", label: "Fiches validées", roles: SECRETARIAT_LEVEL, icon: "✅", group: "Inscriptions" },
      { href: "/admin/inscriptions-ecole-classique/eleves", label: "Élèves inscrits", roles: SECRETARIAT_LEVEL, icon: "🎓", group: "Inscriptions" },
    );
  }
  const groupedTabs = GROUP_ORDER.map((group) => ({
    group,
    items: visibleTabs.filter((t) => t.group === group),
  })).filter((g) => g.items.length > 0);

  // CONSEILLER has no admissions/secretariat access (moindre privilège) —
  // route it to its one accessible page instead of the SECRETARIAT default.
  const homeHref = hasAnyRole(roles, ADMIN_LEVEL)
    ? "/admin/dashboard"
    : hasRole(roles, "CONSEILLER") && !hasAnyRole(roles, SECRETARIAT_LEVEL)
      ? "/admin/psychosocial"
      : "/admin/admissions";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Lecture ponctuelle d'un système externe (localStorage) après montage —
    // pas de boucle de rendu, la préférence n'est lue qu'une fois au chargement.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(window.localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === "1");
    } catch {
      // localStorage indisponible (navigation privée, etc.) — reste déployée.
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed((v) => {
      const next = !v;
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        // pas grave si ça ne persiste pas d'une session à l'autre.
      }
      return next;
    });
  }

  // Refonte visuelle du dashboard (2026-09-07) : le logo ne doit jamais
  // reposer directement sur un fond bleu marine (mandat §7) — `dash-logo-wrap`
  // lui garde un fond crème propre, qu'il apparaisse en haut de la barre ou
  // dans le bloc Administration spécial en bas.
  const logoMark = sector ? (
    <SectorLogo sector={sector} className="h-8 w-8 shrink-0 object-contain" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/branding/Logo_CCIGA_General.png" alt="Logo CCIGA" className="h-7 w-7 shrink-0 rounded-md object-contain" />
  );

  const brand = (
    <Link href={homeHref} className="flex min-w-0 items-center gap-2 px-1">
      <span className="dash-logo-wrap flex h-9 w-9 shrink-0 items-center justify-center p-1">{logoMark}</span>
      {/* "Réduire" (item 7) n'est qu'un mode Desktop — le drawer mobile doit
          toujours garder ses libellés, jamais l'état icônes-seules qui n'a
          de sens qu'avec un tooltip au survol (impossible au tactile) ; d'où
          `lg:hidden` plutôt que retirer l'élément du DOM avec `{!collapsed && }`. */}
      <span className={`truncate font-semibold text-primary-dark ${collapsed ? "lg:hidden" : ""}`}>Administration CCIGA</span>
    </Link>
  );

  function renderLinks(items: typeof visibleTabs) {
    return items.map((tab) => {
      const [tabPath, tabQuery] = tab.href.split("?");
      const tabStatus = tabQuery ? new URLSearchParams(tabQuery).get("status") : null;
      // These list pages have their own distinct sibling tabs
      // (nouvelle/eleves/[id]…) reachable via startsWith, so their
      // own "Fiches enregistrées" entry must only light up on an
      // exact match — never bleed onto those subpages.
      const active = tabQuery || EXACT_MATCH_LIST_PATHS.includes(tabPath)
        ? pathname === tabPath && currentStatus === tabStatus
        : pathname.startsWith(tabPath);
      return (
        <Link
          key={tab.href}
          href={tab.href}
          title={collapsed ? tab.label : undefined}
          onClick={() => setMobileOpen(false)}
          aria-current={active ? "page" : undefined}
          className={`dash-link group flex items-center gap-3 rounded-md border-l-2 px-2.5 py-2 text-sm transition-colors ${
            active ? "dash-link-active" : "border-transparent"
          } ${collapsed ? "lg:justify-center" : ""}`}
        >
          <span aria-hidden className="shrink-0 text-base leading-none">
            {tab.icon}
          </span>
          <span className={`truncate ${collapsed ? "lg:hidden" : ""}`}>{tab.label}</span>
        </Link>
      );
    });
  }

  const navList = (
    <nav className="flex-1 overflow-y-auto px-2 py-2">
      {groupedTabs.map(({ group, items }) =>
        group === "Administration" ? (
          // Traitement spécial (mandat "Refonte visuelle du dashboard",
          // §6-7) : Administration + logo SIGA dans une seule case
          // clairement encadrée, sous toutes les autres — jamais un fond
          // bleu marine direct derrière le logo.
          <div key={group} className="dash-admin-block mb-2 mt-2 p-2.5">
            {/* Mandat "Correction ciblée du dashboard" (2026-09-07) : titre
            "Administration SIGA" au-dessus, grand logo bien net en dessous —
            fond spécial (dégradé) distinct des pastilles de groupe. */}
            <div className="mb-3 flex flex-col items-center gap-2 px-1 pt-1">
              <span className="dash-admin-title-special">Administration SIGA</span>
              <span
                className={`dash-logo-wrap flex items-center justify-center p-2 ${
                  collapsed ? "h-12 w-12" : "h-24 w-24"
                }`}
              >
                {sector ? (
                  <SectorLogo sector={sector} className="h-full w-full object-contain" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/branding/Logo_CCIGA_General.png"
                    alt="Logo CCIGA"
                    className="h-full w-full rounded-md object-contain"
                  />
                )}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">{renderLinks(items)}</div>
          </div>
        ) : (
          <div key={group} className="mb-4">
            <p className={`mb-1 px-2 ${collapsed ? "lg:hidden" : ""}`}>
              <span className="dash-group-title">{group}</span>
            </p>
            <div className="flex flex-col gap-0.5">{renderLinks(items)}</div>
          </div>
        ),
      )}
    </nav>
  );

  const sidebarFooter = (
    <div className="border-t border-primary/15 px-2 py-2">
      <button
        type="button"
        onClick={toggleCollapsed}
        className="hidden w-full items-center justify-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-muted hover:bg-primary/10 hover:text-primary-dark lg:flex"
        aria-label={collapsed ? "Déployer la barre latérale" : "Réduire la barre latérale"}
        title={collapsed ? "Déployer" : "Réduire"}
      >
        <span aria-hidden>{collapsed ? "»" : "«"}</span>
        {!collapsed && <span>Réduire</span>}
      </button>
    </div>
  );

  // Sélecteur rapide d'entité — un clic bascule directement vers
  // l'institution suivante du cycle fixe (École Classique -> École
  // Professionnelle -> Université -> École Classique), jamais via l'écran
  // de connexion ni la page de choix des trois institutions : la session et
  // le rôle restent ceux déjà actifs, seul le cookie d'institution change,
  // et la navigation vise directement la page équivalente dans la cible
  // (ou son tableau de bord si cette page n'existe pas là-bas).
  async function handleQuickSwitch() {
    if (!activeSchool || activeSchool === "toutes" || switchingSchool) return;
    setSwitchingSchool(true);
    try {
      const target = nextSchoolInCycle(activeSchool);
      const res = await fetch("/api/admin/institution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school: target }),
      });
      if (!res.ok) return;
      router.push(resolveEquivalentAdminPath(pathname, target, homeHref));
      router.refresh();
    } finally {
      setSwitchingSchool(false);
    }
  }

  return (
    <div className="lg:flex">
      {/* Sidebar desktop (sticky, pleine hauteur) + drawer mobile (recouvrement). */}
      <aside
        className={`dash-shell fixed inset-y-0 left-0 z-40 flex flex-col shadow-xl transition-transform duration-200 lg:sticky lg:inset-y-auto lg:top-0 lg:bottom-auto lg:h-screen lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[76px] is-collapsed" : "lg:w-64"} w-64`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-primary/15 px-3 py-4">
          {brand}
          <button
            className="rounded-md border border-primary/30 p-1.5 text-primary-dark lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          >
            ✕
          </button>
        </div>
        {navList}
        {sidebarFooter}
      </aside>

      {mobileOpen && (
        <button
          aria-label="Fermer le menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <div className="min-w-0 flex-1">
        {/* Bande supérieure (mandat "Correction ciblée du dashboard",
        2026-09-07) : crème à double bordure bleu marine + jaune or, angles
        arrondis, clairement séparée du contenu (marge) et de la barre
        latérale. Contenu inchangé (même session/rôle/institution active),
        uniquement la présentation. */}
        <header className="dash-topbar relative z-20 mx-3 mt-3 lg:sticky lg:top-3">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 lg:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                className="flex items-center rounded-md border border-primary/30 p-2 text-primary-dark lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu d'administration"
              >
                <span className="text-xl">☰</span>
              </button>
              <span className="dash-topbar-case hidden truncate px-3 py-1.5 text-sm font-semibold lg:inline-block">
                {groupedTabs.flatMap((g) => g.items).find((t) => pathname.startsWith(t.href))?.label ?? "CCIGA"}
              </span>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2 text-sm">
              {activeSchool && activeSchool !== "toutes" && (
                <>
                  {/* Version compacte tactile (mobile/tablette) — même cycle, même handler. */}
                  <button
                    type="button"
                    onClick={handleQuickSwitch}
                    disabled={switchingSchool}
                    className="dash-topbar-case dash-topbar-case-active flex h-9 w-9 items-center justify-center rounded-full text-base disabled:opacity-60 md:hidden"
                    title="Changer d'entité"
                    aria-label={`Changer d'entité — actuellement ${schoolLabels[activeSchool]}`}
                  >
                    <span aria-hidden>⇄</span>
                  </button>
                  {/* Trio des 3 institutions — mandat §3-4 : chaque institution
                  a sa propre case visible, celle active clairement valorisée.
                  Un seul contrôle, un seul handler (le cycle déjà en place) —
                  jamais un lien direct par institution (règle établie :
                  "une navigation interne ne doit jamais permettre de changer
                  d'institution silencieusement"). */}
                  <button
                    type="button"
                    onClick={handleQuickSwitch}
                    disabled={switchingSchool}
                    className="dash-topbar-case hidden items-center gap-1 rounded-full p-1 disabled:opacity-60 md:flex"
                    title="Changer d'entité"
                    aria-label={`Changer d'entité — actuellement ${schoolLabels[activeSchool]}`}
                  >
                    {(Object.keys(schoolLabels) as SchoolKey[]).map((key) => (
                      <span
                        key={key}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                          key === activeSchool ? "bg-primary text-white shadow-sm" : "text-muted"
                        }`}
                      >
                        {schoolLabels[key]}
                      </span>
                    ))}
                    <span aria-hidden className="px-1 text-primary-dark">
                      ⇄
                    </span>
                  </button>
                </>
              )}
              {activeSchool === "toutes" && (
                <Link
                  href={`/admin/institution?next=${encodeURIComponent(pathname)}`}
                  className="dash-topbar-case dash-topbar-case-active hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold md:flex"
                  title="Changer d'institution"
                >
                  Toutes institutions
                  <span aria-hidden>⇄</span>
                </Link>
              )}
              <NotificationBell notifications={notifications} />
              <Link
                href="/mon-espace"
                className="dash-topbar-case hidden px-3 py-1.5 text-primary-dark hover:bg-background sm:inline-block"
              >
                {name}
              </Link>
              <LogoutButton className="dash-topbar-case px-3 py-1.5 hover:bg-background" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-4 py-10 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
