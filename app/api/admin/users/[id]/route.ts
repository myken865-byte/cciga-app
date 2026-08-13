import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { isRole, hasRole } from "@/lib/roles";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { name, roles } = (await request.json()) ?? {};

  if (!name) {
    return NextResponse.json({ error: "Nom requis." }, { status: 400 });
  }
  if (!Array.isArray(roles) || roles.length === 0 || !roles.every(isRole)) {
    return NextResponse.json({ error: "Au moins un rôle valide est requis." }, { status: 400 });
  }
  if (userId === session.userId && !hasRole(roles, "ADMIN")) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas retirer votre propre rôle Administration." },
      { status: 400 },
    );
  }

  await prisma.user.update({
    where: { id: userId },
    data: { name, roles: JSON.stringify(roles) },
  });

  return NextResponse.json({ ok: true });
}
