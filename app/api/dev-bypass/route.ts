import { NextResponse } from "next/server";
import { isRole } from "@/lib/roles";
import { isDevBypassAllowed, DEV_BYPASS_COOKIE } from "@/lib/devBypass";

export async function POST(request: Request) {
  if (!isDevBypassAllowed()) {
    return NextResponse.json({ error: "Aperçu DEV indisponible dans cet environnement." }, { status: 403 });
  }

  const { role } = (await request.json()) ?? {};
  if (!role || !isRole(role)) {
    return NextResponse.json({ error: "Rôle invalide." }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(DEV_BYPASS_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 4,
  });
  return response;
}
