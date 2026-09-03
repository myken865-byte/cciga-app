import { NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const { token, newPassword } = (await request.json()) ?? {};
  if (!token || typeof token !== "string" || !newPassword || typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json({ error: "Lien invalide ou mot de passe trop court (8 caractères min.)." }, { status: 400 });
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const user = await prisma.user.findUnique({ where: { passwordResetTokenHash: tokenHash } });
  if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
    return NextResponse.json({ error: "Ce lien de réinitialisation est invalide ou expiré." }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash, passwordResetTokenHash: null, passwordResetExpires: null },
  });

  return NextResponse.json({ ok: true });
}
