import { isRole, type Role } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";

/**
 * Credential-free preview session for DEV/TEST only (Phase 2.9). Gated by
 * TWO independent conditions that must both hold, neither of which is ever
 * set on the real Production Vercel project: VERCEL_ENV is auto-populated
 * by Vercel per deployment (never "production" on this isolated preview
 * project), and ENABLE_DEV_AUTH_BYPASS is an opt-in flag scoped only to
 * this project's Preview environment. The synthetic session uses a
 * sentinel userId that matches no real database row, so every page that
 * scopes its query by session.userId legitimately renders empty — no real
 * or fabricated institutional data is ever produced.
 */
export const DEV_BYPASS_COOKIE = "cciga_dev_bypass_role";

/** Sentinel session.userId used only by the synthetic DEV bypass session — matches no real User row. */
export const DEV_BYPASS_USER_ID = -1;

export function isDevBypassAllowed(): boolean {
  return process.env.VERCEL_ENV !== "production" && process.env.ENABLE_DEV_AUTH_BYPASS === "true";
}

export function buildDevBypassSession(roleValue: string | undefined): SessionPayload | null {
  if (!isDevBypassAllowed()) return null;
  if (!roleValue || !isRole(roleValue)) return null;
  return {
    userId: DEV_BYPASS_USER_ID,
    email: "apercu-dev@local.test",
    name: `Aperçu DEV — ${roleValue}`,
    roles: [roleValue as Role],
  };
}

/**
 * A session.userId is only safe to store as a foreign key (createdById,
 * enteredById, etc.) when it references a real User row. The DEV bypass
 * sentinel never does — writing it directly trips a FOREIGN KEY constraint
 * and crashes the page. Every write that persists "who did this" from a
 * session must resolve through here instead of using session.userId raw;
 * null is the semantically correct value for "no real actor", not a
 * fabricated one, since DEV bypass sessions are credential-free by design.
 */
export function resolveActorId(userId: number): number | null {
  return userId === DEV_BYPASS_USER_ID ? null : userId;
}
