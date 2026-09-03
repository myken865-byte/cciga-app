import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { Role } from "@/lib/roles";
import { isRole, hasRole, hasAnyRole } from "@/lib/roles";
import { PSYCHOSOCIAL_ACCESS_ROLES } from "@/lib/psychosocialAccess";

const SESSION_COOKIE = "cciga_session";
const SESSION_DURATION = "8h";

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set.");
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  userId: number;
  email: string;
  name: string;
  roles: Role[];
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const roles = Array.isArray(payload.roles) ? payload.roles.filter(isRole) : [];
    if (
      typeof payload.userId === "number" &&
      typeof payload.email === "string" &&
      typeof payload.name === "string" &&
      roles.length > 0
    ) {
      return { userId: payload.userId, email: payload.email, name: payload.name, roles };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;
  if (session) return session;

  const { DEV_BYPASS_COOKIE, buildDevBypassSession } = await import("@/lib/devBypass");
  return buildDevBypassSession(cookieStore.get(DEV_BYPASS_COOKIE)?.value);
}

/**
 * For /api/admin/* route handlers: proxy.ts only gates page routes, not API
 * routes, so each admin API route must check this itself. SUPER_ADMIN carries
 * every ADMIN privilege, so it's accepted here too.
 */
export async function requireAdminSession(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN"])) {
    return null;
  }
  return session;
}

/**
 * Full admin rights required, and nothing less: creating or editing an
 * account that itself holds a privileged (staff) role. Kept separate from
 * requireAdminSession so ADMIN/SECRETARIAT can't mint new staff accounts.
 */
export async function requireSuperAdminSession(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || !hasRole(session.roles, "SUPER_ADMIN")) {
    return null;
  }
  return session;
}

/**
 * Dedicated guard for the psychosocial module — deliberately not just an
 * alias of requireSuperAdminSession. The allowed roles live in a single
 * named list (lib/psychosocialAccess.ts) so that activating a future
 * CONSEILLER/PSYCHOLOGUE role later is a one-line change there, not a
 * hunt through every call site.
 */
export async function requirePsychosocialSession(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, PSYCHOSOCIAL_ACCESS_ROLES)) {
    return null;
  }
  return session;
}

/**
 * Narrower staff scope for admissions/finance/document-generation routes —
 * the day-to-day secretarial work — in addition to full admin rights.
 */
export async function requireSecretariatSession(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN", "SECRETARIAT"])) {
    return null;
  }
  return session;
}

/**
 * For the grade review step (soumis→en_verification→validé): ADMIN or the
 * dedicated ACADEMIC_OFFICER role. Publication stays ADMIN-only — see
 * requireAdminSession above, used by the publish route.
 */
export async function requireReviewerSession(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN", "ACADEMIC_OFFICER"])) {
    return null;
  }
  return session;
}

export { SESSION_COOKIE };
