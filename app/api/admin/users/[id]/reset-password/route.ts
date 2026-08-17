import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { hasRole, parseRoles, privilegedRoles } from "@/lib/roles";

/**
 * Admin-assisted password reset — the only recovery path for a user who's
 * locked out, since the app has no email service to power a self-service
 * "forgot password" flow. Mirrors the exact privilege-escalation guard used
 * by PATCH /api/admin/users/[id]: resetting your own password is always
 * allowed, but resetting someone else's already-privileged account requires
 * SUPER_ADMIN — this is at least as sensitive as editing their roles.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const userId = Number(id);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
  }

  const isSelf = userId === session.userId;
  const targetIsPrivileged = parseRoles(user.roles).some((r) => privilegedRoles.includes(r));
  if (targetIsPrivileged && !isSelf && !hasRole(session.roles, "SUPER_ADMIN")) {
    return NextResponse.json(
      { error: "Seul un Super Administrateur peut réinitialiser le mot de passe d'un compte Administration/Secrétariat." },
      { status: 403 },
    );
  }

  const temporaryPassword = randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

  return NextResponse.json({ temporaryPassword });
}
