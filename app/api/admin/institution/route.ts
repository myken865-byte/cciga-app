import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { isSchoolKey, ALL_SCHOOLS_VALUE, SCHOOL_COOKIE } from "@/lib/institutions";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { school } = (await request.json()) ?? {};
  const isAllSchools = school === ALL_SCHOOLS_VALUE;
  if (!isSchoolKey(school) && !isAllSchools) {
    return NextResponse.json({ error: "Institution invalide." }, { status: 400 });
  }
  if (isAllSchools && !hasRole(session.roles, "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Réservé au Super Administrateur." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SCHOOL_COOKIE, school, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
