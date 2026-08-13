import { NextResponse, type NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { hasRole, type Role } from "@/lib/roles";

const protectedPrefixes: { prefix: string; role: Role }[] = [
  { prefix: "/admin", role: "ADMIN" },
  { prefix: "/portail/etudiant", role: "STUDENT" },
  { prefix: "/portail/parent", role: "PARENT" },
  { prefix: "/portail/enseignant", role: "TEACHER" },
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = protectedPrefixes.find((p) => pathname.startsWith(p.prefix));
  if (!match) {
    return NextResponse.next();
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
  matcher: ["/admin/:path*", "/portail/etudiant/:path*", "/portail/parent/:path*", "/portail/enseignant/:path*"],
};
