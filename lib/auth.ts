import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { Role } from "@/lib/roles";
import { isRole, hasRole } from "@/lib/roles";

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
  return token ? verifySession(token) : null;
}

/**
 * For /api/admin/* route handlers: proxy.ts only gates page routes, not API
 * routes, so each admin API route must check this itself.
 */
export async function requireAdminSession(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || !hasRole(session.roles, "ADMIN")) {
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
  if (!session || !(hasRole(session.roles, "ADMIN") || hasRole(session.roles, "ACADEMIC_OFFICER"))) {
    return null;
  }
  return session;
}

export { SESSION_COOKIE };
