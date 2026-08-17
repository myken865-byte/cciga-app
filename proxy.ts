import { NextResponse, type NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { hasRole, type Role } from "@/lib/roles";

const protectedPrefixes: { prefix: string; role: Role }[] = [
  { prefix: "/admin", role: "ADMIN" },
  { prefix: "/portail/etudiant", role: "STUDENT" },
  { prefix: "/portail/parent", role: "PARENT" },
  { prefix: "/portail/enseignant", role: "TEACHER" },
  { prefix: "/portail/responsable", role: "ACADEMIC_OFFICER" },
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

  if (!session || !hasRole(session.roles, match.role)) {
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
