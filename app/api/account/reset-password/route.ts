import { NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

/**
 * Token-based password reset for a user who can't use the self-service
 * change-password flow because they don't know their current password.
 * No session required by design — the token itself, generated out-of-band
 * (see scripts/generate-password-reset-link.mjs) and delivered through a
 * trusted channel, is what proves the requester is the account owner.
 * Single-use: the token is cleared as soon as it's successfully consumed.
 */
export async function POST(request: Request) {
  if (isRateLimited(`reset-password-ip:${getClientKey(request)}`, { max: 10, windowMs: 15 * 60_000 })) {
    return NextResponse.json(
      { error: "Trop de tentatives. Merci de réessayer dans quelques minutes." },
      { status: 429 },
    );
  }

  const { token, newPassword } = (await request.json()) ?? {};
  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Lien de réinitialisation invalide." }, { status: 400 });
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json(
      { error: "Le nouveau mot de passe doit contenir au moins 8 caractères." },
      { status: 400 },
    );
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const user = await prisma.user.findUnique({ where: { passwordResetTokenHash: tokenHash } });
  if (!user || !user.passwordResetExpires || user.passwordResetExpires.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "Ce lien de réinitialisation est invalide ou a expiré. Demandez-en un nouveau." },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash, passwordResetTokenHash: null, passwordResetExpires: null },
  });

  return NextResponse.json({ ok: true });
}
