import type { SessionPayload } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { prisma } from "@/lib/db";

/**
 * True if `session` belongs to the PARENT of `studentId` — the same
 * `User.parentId` self-relation already used by the parent dashboard
 * (app/portail/parent/page.tsx) and `resolveBulletinAccess` (lib/bulletinAccess.ts).
 * Centralized here (mandat "Finalisation portail Parent", 2026-09-12) so every
 * self-service PDF route (carnet, badge, reçu, fiche d'inscription, demande)
 * adds the exact same parent branch instead of five slightly different ones.
 */
export async function isParentOfStudent(session: SessionPayload, studentId: number | null | undefined): Promise<boolean> {
  if (!studentId || !hasRole(session.roles, "PARENT")) return false;
  const child = await prisma.user.findFirst({ where: { id: studentId, parentId: session.userId } });
  return !!child;
}
