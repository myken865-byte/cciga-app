import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { isRole, hasRole, parseRoles } from "@/lib/roles";
import { createNotification } from "@/lib/notifications";
import { formatCcigaId } from "@/lib/cciga-id";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { name, email, roles, childId, programId } = (await request.json()) ?? {};

  if (!name || !email) {
    return NextResponse.json({ error: "Nom et email requis." }, { status: 400 });
  }
  if (!Array.isArray(roles) || roles.length === 0 || !roles.every(isRole)) {
    return NextResponse.json({ error: "Au moins un rôle valide est requis." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Un compte existe déjà avec cet email." }, { status: 409 });
  }

  let child: Awaited<ReturnType<typeof prisma.user.findUnique>> = null;
  if (roles.includes("PARENT") && childId) {
    child = await prisma.user.findUnique({ where: { id: Number(childId) } });
    if (!child || !hasRole(parseRoles(child.roles), "STUDENT")) {
      return NextResponse.json({ error: "Étudiant invalide." }, { status: 400 });
    }
    if (child.parentId) {
      return NextResponse.json(
        { error: "Cet étudiant est déjà lié à un autre compte parent." },
        { status: 409 },
      );
    }
  }

  let program: Awaited<ReturnType<typeof prisma.program.findUnique>> = null;
  if (roles.includes("STUDENT") && programId) {
    program = await prisma.program.findUnique({ where: { id: programId } });
    if (!program) {
      return NextResponse.json({ error: "Programme invalide." }, { status: 400 });
    }
  }

  const temporaryPassword = randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  const user = await prisma.user.create({
    data: { name, email, roles: JSON.stringify(roles), passwordHash, programId: program?.id },
  });

  if (child) {
    await prisma.user.update({ where: { id: child.id }, data: { parentId: user.id } });
  }

  await createNotification(user.id, {
    type: "welcome",
    title: "Bienvenue sur CCIGA",
    body: `Votre compte CCIGA ID ${formatCcigaId(user.id)} est actif.`,
  });

  return NextResponse.json({ id: user.id, temporaryPassword }, { status: 201 });
}
