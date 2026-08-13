import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { getSchools } from "@/lib/content";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const program = await prisma.program.findUnique({ where: { id } });
  if (!program) {
    return NextResponse.json({ error: "Programme introuvable." }, { status: 404 });
  }

  const { school, faculty, name, level, duration, description, tuitionFee, admissionConditions } =
    (await request.json()) ?? {};

  if (!school || !getSchools().some((s) => s.slug === school)) {
    return NextResponse.json({ error: "École invalide." }, { status: 400 });
  }
  if (!name || !faculty || !level || !duration || !description) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  const conditions: string[] = Array.isArray(admissionConditions)
    ? admissionConditions.filter((c) => typeof c === "string" && c.trim().length > 0)
    : [];

  await prisma.program.update({
    where: { id },
    data: {
      school,
      faculty,
      name,
      level,
      duration,
      description,
      tuitionFee: Number.isFinite(Number(tuitionFee)) ? Math.max(0, Math.round(Number(tuitionFee))) : 0,
      admissionConditions: JSON.stringify(conditions),
    },
  });

  return NextResponse.json({ ok: true });
}
