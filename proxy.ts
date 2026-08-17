import { NextResponse, type NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { hasAnyRole, type Role } from "@/lib/roles";

const ADMIN_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN"];
const SECRETARIAT_LEVEL: Role[] = ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"];

// Order matters: more specific prefixes must come before broader ones,
// since the first match wins (e.g. "/admin/admissions" must be checked
// before the general "/admin" catch-all, or it would never be reached).
const protectedPrefixes: { prefix: string; roles: Role[] }[] = [
  { prefix: "/admin/admissions", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin/finance", roles: SECRETARIAT_LEVEL },
  { prefix: "/admin", roles: ADMIN_LEVEL },
  { prefix: "/portail/etudiant", roles: ["STUDENT"] },
  { prefix: "/portail/parent", roles: ["PARENT"] },
  { prefix: "/portail/enseignant", roles: ["TEACHER"] },
  { prefix: "/portail/responsable", roles: ["ACADEMIC_OFFICER"] },
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
  const session = token ? await verifySession(token) : null;

  if (!session || !hasAnyRole(session.roles, match.roles)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
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
    "/api/:path*",
  ],
};
