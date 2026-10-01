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
  // Mission "Correction des 5 blockers P0" (2026-09-13), §3 — vue unifiée
  // (mandat "Inscription unifiée — Phase 1") jamais ajoutée ici : elle
  // retombait sur le catch-all "/admin" (ADMIN_LEVEL) plus bas et
  // redirigeait SECRETARIAT vers /login malgré le lien déjà présent dans sa
  // propre navigation (AdminNav.tsx). Doit rester APRÈS
  // "/admin/inscriptions-ecole-classique" (ce préfixe plus général la
  // contiendrait sinon, premier match gagnant).
  { prefix: "/admin/inscriptions", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/finance", roles: SECRETARIAT_LEVEL },
  // Dossier élève/étudiant consolidé (mandat "Dossier élève / étudiant
  // consolidé", 2026-09-10) — même niveau d'accès que les fiches
  // d'inscription et la finance qu'il agrège, pour que le secrétariat qui
  // valide une inscription puisse ouvrir le dossier qui en découle.
  { prefix: "/admin/dossier", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/audit", roles: SUPER_ADMIN_ONLY },
  // Every service-routed role must reach the guichet list — the page itself
  // narrows further to just the services each role actually handles.
  { prefix: "/admin/demandes-parents", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER"] },
  // Mandat "Messagerie étudiant + Demandes administratives" (2026-09-12) —
  // demandes-etudiants suit exactement le même niveau d'accès que
  // demandes-parents (guichet institutionnel) ; messages-etudiants ajoute
  // TEACHER (un enseignant ne voit que ses propres conversations "enseignant",
  // filtré côté page — voir lib/studentConversationAccess.ts).
  { prefix: "/admin/demandes-etudiants", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER"] },
  { prefix: "/admin/messages-etudiants", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER", "TEACHER"] },
  // Mandat "Stages & Séminaires" (2026-09-12) — §12 : rôles existants
  // uniquement, TEACHER inclus pour un superviseur interne consultant "son"
  // stage (filtré côté page via canAccessInternship, jamais élargi ici).
  { prefix: "/admin/stages", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER", "COORDONNATEUR", "TEACHER"] },
  { prefix: "/admin/seminaires", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER", "COORDONNATEUR"] },
  // The search page itself re-derives per-category access from the session;
  // this only lets every staff role reach it, never widens what they see.
  { prefix: "/admin/recherche", roles: [...SECRETARIAT_LEVEL, "ACADEMIC_OFFICER"] },
  // Source unique de vérité : lib/psychosocialAccess.ts — extensible vers un
  // futur rôle CONSEILLER/PSYCHOLOGUE sans toucher ce fichier.
  { prefix: "/admin/psychosocial", roles: PSYCHOSOCIAL_ACCESS_ROLES },
  { prefix: "/admin/personnel", roles: ADMIN_LEVEL },
  // Mandat "Générateur de badges multi-institutions" (2026-09-17) — élargi
  // de ADMIN_LEVEL à Secrétariat + Coordination (voir requireBadgeManagerSession
  // dans lib/auth.ts, la même liste de rôles, jamais divergente).
  { prefix: "/admin/badges", roles: [...SECRETARIAT_LEVEL, "COORDONNATEUR"] },
  { prefix: "/admin/infirmerie", roles: ADMIN_LEVEL },
  // Mandat "Portail Logistique — migration additive 3 tables" (2026-09-12) :
  // incohérence corrigée — l'API (requireInventoryAccess dans
  // app/api/admin/inventaire/route.ts) autorisait déjà LOGISTICIEN, mais ce
  // garde-fou de page ne le laissait pas passer. LOGISTICIEN n'utilise pas
  // cette page dans son flux réel (son portail dédié /portail/logistique
  // embarque le même composant), mais rien ne justifiait qu'un accès direct
  // à cette URL le redirige alors que l'API l'accepterait.
  { prefix: "/admin/inventaire", roles: [...ADMIN_LEVEL, "LOGISTICIEN"] },
  { prefix: "/admin/bibliotheque", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/transport", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/cantine", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/parametres", roles: SUPER_ADMIN_ONLY },
  { prefix: "/admin", roles: ADMIN_LEVEL },
  { prefix: "/portail/etudiant", roles: ["STUDENT"] },
  { prefix: "/portail/parent", roles: ["PARENT"] },
  { prefix: "/portail/enseignant", roles: ["TEACHER"] },
  // Mandat "Gouvernance académique" (2026-09-12) : DOYEN/COORDONNATEUR
  // peuvent ouvrir la fiche de révision d'UN cours de leur propre faculté/
  // programme (lien direct depuis leur propre tableau de bord) — mais pas
  // la liste globale non scopée de /portail/responsable elle-même, d'où
  // cette entrée plus spécifique déclarée AVANT la règle générale
  // ci-dessous (proxy.ts prend le premier préfixe qui matche).
  { prefix: "/portail/responsable/cours", roles: [...ADMIN_LEVEL, "ACADEMIC_OFFICER", "DOYEN", "COORDONNATEUR"] },
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

  // Mission "Audit final Portail Enseignant" (2026-09-13) — régression réelle
  // trouvée en test utilisateur réel : un enseignant "pur" (aucun rôle
  // d'établissement) n'a jamais besoin de choisir une institution pour
  // atteindre /admin/messages-etudiants ou /admin/stages (les deux seuls
  // préfixes /admin/* que TEACHER peut atteindre) — ces pages filtrent déjà
  // par propriété réelle (canAccessStudentConversation / canAccessInternship,
  // jamais par école), et /admin/institution lui-même n'offre aucun moyen
  // à un enseignant de choisir une école. Avant ce correctif, cliquer sur
  // "Messagerie" depuis le tableau de bord enseignant menait à une impasse
  // (redirection vers /admin/institution, jamais utilisable par ce rôle).
  const isPureTeacher =
    hasAnyRole(session.roles, ["TEACHER"]) &&
    !hasAnyRole(session.roles, [
      "ADMIN",
      "SUPER_ADMIN",
      "SECRETARIAT",
      "ACADEMIC_OFFICER",
      "COORDONNATEUR",
      "DOYEN",
      "RECTEUR",
      "LOGISTICIEN",
    ]);

  // Institution-first entry (Prompt Maître "séparation stricte des trois
  // grands portails") : toute page /admin/* exige un contexte institutionnel
  // choisi explicitement avant d'afficher la moindre donnée, uniformément sur
  // Web, Android et Windows (même middleware, mêmes URLs, aucune logique dupliquée).
  // /portail/logistique y est inclus : la Logistique couvre les 3 institutions
  // sans jamais mélanger leurs données (isolation stricte, comme l'admin).
  const needsInstitutionGate =
    !isPureTeacher &&
    ((pathname.startsWith("/admin") && !INSTITUTION_GATE_EXEMPT.some((p) => pathname.startsWith(p))) ||
      pathname.startsWith("/portail/logistique"));
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
