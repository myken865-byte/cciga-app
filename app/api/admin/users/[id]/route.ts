import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { isRole, hasRole, hasAnyRole, parseRoles, privilegedRoles, type Role } from "@/lib/roles";

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

  const { name, roles, programId } = (await request.json()) ?? {};

  if (!name) {
    return NextResponse.json({ error: "Nom requis." }, { status: 400 });
  }
  if (!Array.isArray(roles) || roles.length === 0 || !roles.every(isRole)) {
    return NextResponse.json({ error: "Au moins un rôle valide est requis." }, { status: 400 });
  }
  // Privilege-escalation guard: granting yourself (or anyone) a privileged
  // role you don't already hold requires SUPER_ADMIN. Separately, touching
  // *someone else's* already-privileged account (even just their name) also
  // requires SUPER_ADMIN. Editing your own profile while keeping your
  // existing role is always allowed — otherwise an ADMIN could never rename
  // themselves.
  const currentRoles = parseRoles(user.roles);
  const currentPrivileged = currentRoles.filter((r) => privilegedRoles.includes(r));
  const requestedPrivileged = (roles as string[]).filter((r) => privilegedRoles.includes(r as Role));
  const isSelf = userId === session.userId;
  const grantsNewPrivilege = requestedPrivileged.some((r) => !currentPrivileged.includes(r as Role));
  const editsSomeoneElsesPrivilegedAccount = !isSelf && currentPrivileged.length > 0;

  if ((grantsNewPrivilege || editsSomeoneElsesPrivilegedAccount) && !hasRole(session.roles, "SUPER_ADMIN")) {
    return NextResponse.json(
      { error: "Seul un Super Administrateur peut modifier un compte Administration/Secrétariat." },
      { status: 403 },
    );
  }
  if (userId === session.userId && !hasAnyRole(roles, ["ADMIN", "SUPER_ADMIN"])) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas retirer votre propre rôle d'administration." },
      { status: 400 },
    );
  }

  let newProgramId: string | null = null;
  if (roles.includes("STUDENT") && programId) {
    const program = await prisma.program.findUnique({ where: { id: programId } });
    if (!program) {
      return NextResponse.json({ error: "Programme invalide." }, { status: 400 });
    }
    newProgramId = program.id;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { name, roles: JSON.stringify(roles), programId: newProgramId },
  });

  return NextResponse.json({ ok: true });
}
