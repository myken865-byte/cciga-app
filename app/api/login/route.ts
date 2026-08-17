import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signSession, SESSION_COOKIE } from "@/lib/auth";
import { parseRoles } from "@/lib/roles";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) ?? {};

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  if (isRateLimited(`login-ip:${getClientKey(request)}`, { max: 20, windowMs: 15 * 60_000 })) {
    return NextResponse.json(
      { error: "Trop de tentatives de connexion. Merci de réessayer dans quelques minutes." },
      { status: 429 },
    );
  }
  if (isRateLimited(`login-email:${String(email).toLowerCase()}`, { max: 5, windowMs: 15 * 60_000 })) {
    return NextResponse.json(
      { error: "Trop de tentatives pour ce compte. Merci de réessayer dans quelques minutes." },
      { status: 429 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
  }

  const roles = parseRoles(user.roles);
  const token = await signSession({ userId: user.id, email: user.email, name: user.name, roles });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
