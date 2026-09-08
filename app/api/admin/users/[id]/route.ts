import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { isRole, hasRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { isUserInSchoolScope } from "@/lib/institutionScope";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) {
    return NextResponse.json({ error: "Choisissez une institution avant de modifier un compte." }, { status: 400 });
  }

  const { id } = await params;
  const userId = Number(id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      program: { select: { school: true } },
      coursesTaught: { include: { program: { select: { school: true } } } },
      titulaireOf: { select: { school: true } },
      coordinatedPrograms: { select: { school: true } },
    },
  });
  if (!user) {
    return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
  }
  // Non-croisement (Phase C3) : même prédicat que la liste (isUserInSchoolScope,
  // app/admin/users/page.tsx) — un accès direct par ID à un compte d'une
  // autre institution est refusé hors vue globale ("toutes", SUPER_ADMIN).
  if (activeSchool !== "toutes" && !isUserInSchoolScope(user, activeSchool)) {
    return NextResponse.json({ error: "Ce compte appartient à une autre institution." }, { status: 403 });
  }

  const { name, roles, programId, active } = (await request.json()) ?? {};

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

  const newActive = typeof active === "boolean" ? active : user.active;
  if (userId === session.userId && !newActive) {
    return NextResponse.json({ error: "Vous ne pouvez pas archiver votre propre compte." }, { status: 400 });
  }

  let newProgramId: string | null = null;
  if (roles.includes("STUDENT") && programId) {
    const program = await prisma.program.findUnique({ where: { id: programId } });
    if (!program) {
      return NextResponse.json({ error: "Programme invalide." }, { status: 400 });
    }
    // Non-croisement (Phase C3) : impossible de rattacher un élève à un
    // programme d'une autre institution depuis ce contexte.
    if (activeSchool !== "toutes" && program.school !== activeSchool) {
      return NextResponse.json({ error: "Ce programme appartient à une autre institution." }, { status: 403 });
    }
    newProgramId = program.id;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { name, roles: JSON.stringify(roles), programId: newProgramId, active: newActive },
  });

  return NextResponse.json({ ok: true });
}
