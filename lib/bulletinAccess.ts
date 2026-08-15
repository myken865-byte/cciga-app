import { prisma } from "@/lib/db";
import { hasRole } from "@/lib/roles";
import type { SessionPayload } from "@/lib/auth";

/**
 * Who may view a given student's bulletin/relevé/document: the student
 * themself, a linked parent, the student's titulaire, an academic officer
 * (reviews results school-wide), or an admin. viewerCanSeeAll additionally
 * grants rank visibility and bypasses grade-publication confidentiality.
 */
export async function resolveBulletinAccess(
  session: SessionPayload | null,
  requestedId: number,
): Promise<{ targetId: number | null; viewerCanSeeAll: boolean }> {
  if (!session) return { targetId: null, viewerCanSeeAll: false };

  if (hasRole(session.roles, "ADMIN") || hasRole(session.roles, "ACADEMIC_OFFICER")) {
    return { targetId: requestedId || null, viewerCanSeeAll: true };
  }
  if (requestedId === session.userId) {
    return { targetId: requestedId, viewerCanSeeAll: false };
  }
  if (hasRole(session.roles, "PARENT")) {
    const child = await prisma.user.findFirst({ where: { id: requestedId, parentId: session.userId } });
    return { targetId: child ? requestedId : null, viewerCanSeeAll: false };
  }
  if (hasRole(session.roles, "TEACHER")) {
    const student = await prisma.user.findUnique({ where: { id: requestedId }, include: { program: true } });
    if (student?.program?.titulaireId === session.userId) {
      return { targetId: requestedId, viewerCanSeeAll: true };
    }
  }
  return { targetId: null, viewerCanSeeAll: false };
}
