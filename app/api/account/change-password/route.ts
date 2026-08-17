import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  if (isRateLimited(`change-password:${session.userId}`, { max: 5, windowMs: 15 * 60_000 })) {
    return NextResponse.json(
      { error: "Trop de tentatives. Merci de réessayer dans quelques minutes." },
      { status: 429 },
    );
  }

  const { currentPassword, newPassword } = (await request.json()) ?? {};
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Mot de passe actuel et nouveau mot de passe requis." }, { status: 400 });
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json(
      { error: "Le nouveau mot de passe doit contenir au moins 8 caractères." },
      { status: 400 },
    );
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
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return NextResponse.json({ ok: true });
}
