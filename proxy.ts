import { NextResponse, type NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { DEV_BYPASS_COOKIE, buildDevBypassSession } from "@/lib/devBypass";
import { hasAnyRole, roleList, type Role } from "@/lib/roles";
import { PSYCHOSOCIAL_ACCESS_ROLES } from "@/lib/psychosocialAccess";
import { SCHOOL_COOKIE } from "@/lib/institutions";

// Pages legitimately institution-agnostic by design — never gated behind the
// institution picker (the picker page itself, a platform-wide audit trail,
// the global settings hub, and the command center — which already has its
// own working cross-institution scope selector, wired to this same cookie).
const INSTITUTION_GATE_EXEMPT = [
  "/admin/institution",
  "/admin/audit",
  "/admin/parametres",
  "/admin/centre-de-commandement",
];

// Each structure page belongs to exactly one institution — reaching it while
// a DIFFERENT institution is active (e.g. a typed/bookmarked URL, since the
// nav only ever links to the active one) must not silently show that other
// institution's structure; force an explicit re-choice instead.
const SCHOOL_STRUCTURE_PAGES: { prefix: string; school: string }[] = [
  { prefix: "/admin/ecole-classique", school: "ecole-classique" },
  { prefix: "/admin/ecole-professionnelle", school: "ecole-professionnelle" },
  { prefix: "/admin/universite", school: "universite" },
];

const ADMIN_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN"];
const SECRETARIAT_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"];
const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];

// Order matters: more specific prefixes must come before broader ones,
// since the first match wins (e.g. "/admin/admissions" must be checked
// before the general "/admin" catch-all, or it would never be reached).
const protectedPrefixes: { prefix: string; roles: Role[] }[] = [
  // Le sélecteur rapide d'entité (composant AdminNav) doit rester joignable
  // par tout rôle qui accède à une section /admin/* quelconque — la page
  // elle-même n'exige déjà qu'une session valide, sans restriction de rôle ;
  // avant cet ajout elle retombait sur le catch-all "/admin" (ADMIN_LEVEL
  // uniquement) plus bas et redirigeait SECRETARIAT/CONSEILLER/etc. vers
  // /login au clic — c'était la cause du bug corrigé ici.
  { prefix: "/admin/institution", roles: [...roleList] },
  { prefix: "/admin/admissions", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/fiches-inscription", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/inscriptions-ecole-classique", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/finance", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/audit", roles: SUPER_ADMIN_ONLY },
  // Every service-routed role must reach the guichet list — the page itself
  // narrows further to just the services each role actually handles.
  { prefix: "/admin/demandes-parents", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER"] },
  // The search page itself re-derives per-category access from the session;
  // this only lets every staff role reach it, never widens what they see.
  { prefix: "/admin/recherche", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER"] },
  // Source unique de vérité : lib/psychosocialAccess.ts — extensible vers un
  // futur rôle CONSEILLER/PSYCHOLOGUE sans toucher ce fichier.
  { prefix: "/admin/psychosocial", roles: PSYCHOSOCIAL_ACCESS_ROLES },
  { prefix: "/admin/personnel", roles: ADMIN_LEVEL },
  { prefix: "/admin/badges", roles: ADMIN_LEVEL },
  { prefix: "/admin/infirmerie", roles: ADMIN_LEVEL },
  { prefix: "/admin/inventaire", roles: ADMIN_LEVEL },
  { prefix: "/admin/bibliotheque", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/transport", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/cantine", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/parametres", roles: SUPER_ADMIN_ONLY },
  { prefix: "/admin", roles: ADMIN_LEVEL },
  { prefix: "/portail/etudiant", roles: ["STUDENT"] },
  { prefix: "/portail/parent", roles: ["PARENT"] },
  { prefix: "/portail/enseignant", roles: ["TEACHER"] },
  // ADMIN/SUPER_ADMIN included: requireReviewerSession (the API-side guard
  // for the review action) and the course page's own check both already
  // admit ADMIN alongside ACADEMIC_OFFICER — this must match, or ADMIN gets
  // redirected to /login before ever reaching a page it's actually allowed to use.
  { prefix: "/portail/responsable", roles: [...ADMIN_LEVEL, "ACADEMIC_OFFICER"] },
  // Gouvernance universitaire — SUPER_ADMIN a toujours accès (supervision
  // globale), chaque portail reste réservé à son rôle propre sinon.
  { prefix: "/portail/rectorat", roles: ["SUPER_ADMIN", "RECTEUR"] },
  { prefix: "/portail/decanat", roles: ["SUPER_ADMIN", "DOYEN"] },
  { prefix: "/portail/coordination", roles: ["SUPER_ADMIN", "COORDONNATEUR"] },
  // Logistique couvre les 3 institutions — SUPER_ADMIN supervise toutes,
  // LOGISTICIEN reste le rôle métier dédié.
  { prefix: "/portail/logistique", roles: ["SUPER_ADMIN", "LOGISTICIEN"] },
];

const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * Origin-vs-Host check on state-changing requests — the standard, low-friction
 * CSRF defense for a cookie+fetch architecture (no per-form token plumbing
 * needed). A cross-site attacker page's request carries an Origin that won't
 * match our Host and gets rejected; same-origin requests either omit Origin
 * or match Host, and pass through unaffected.
 */
function hasValidOrigin(request: NextRequest): boolean {
  if (!UNSAFE_METHODS.has(request.method)) return true;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/") && !hasValidOrigin(request)) {
    return NextResponse.json({ error: "Requête refusée (origine invalide)." }, { status: 403 });
  }

  const match = protectedPrefixes.find((p) => pathname.startsWith(p.prefix));
  if (!match) {
    return NextResponse.next();
  }

  if (!hasValidOrigin(request)) {
    return NextResponse.json({ error: "Requête refusée (origine invalide)." }, { status: 403 });
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session =
    (token ? await verifySession(token) : null) ??
    buildDevBypassSession(request.cookies.get(DEV_BYPASS_COOKIE)?.value);

  if (!session || !hasAnyRole(session.roles, match.roles)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Institution-first entry (Prompt Maître "séparation stricte des trois
  // grands portails") : toute page /admin/* exige un contexte institutionnel
  // choisi explicitement avant d'afficher la moindre donnée, uniformément sur
  // Web, Android et Windows (même middleware, mêmes URLs, aucune logique dupliquée).
  // /portail/logistique y est inclus : la Logistique couvre les 3 institutions
  // sans jamais mélanger leurs données (isolation stricte, comme l'admin).
  const needsInstitutionGate =
    (pathname.startsWith("/admin") && !INSTITUTION_GATE_EXEMPT.some((p) => pathname.startsWith(p))) ||
    pathname.startsWith("/portail/logistique");
  if (request.method === "GET" && needsInstitutionGate) {
    const activeSchool = request.cookies.get(SCHOOL_COOKIE)?.value;

    if (!activeSchool) {
      const institutionUrl = new URL("/admin/institution", request.url);
      institutionUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(institutionUrl);
    }

    const structurePage = SCHOOL_STRUCTURE_PAGES.find((p) => pathname.startsWith(p.prefix));
    if (structurePage && activeSchool !== structurePage.school) {
      const institutionUrl = new URL("/admin/institution", request.url);
      institutionUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(institutionUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portail/etudiant/:path*",
    "/portail/parent/:path*",
    "/portail/enseignant/:path*",
    "/portail/responsable/:path*",
    "/portail/rectorat/:path*",
    "/portail/decanat/:path*",
    "/portail/coordination/:path*",
    "/portail/logistique/:path*",
    "/api/:path*",
  ],
};
