import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DEV_BYPASS_USER_ID } from "@/lib/devBypass";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.userId === DEV_BYPASS_USER_ID) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { currentPassword, newPassword } = (await request.json()) ?? {};
  if (!currentPassword || !newPassword || typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json({ error: "Mot de passe actuel et nouveau mot de passe (8 caractères min.) requis." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Mot de passe actuel incorrect." }, { status: 401 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: session.userId }, data: { passwordHash } });

  return NextResponse.json({ ok: true });
}
