import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { getSchools } from "@/lib/content";
import { resolveTeacherModel, cascadeTitulaireToCourses } from "@/lib/titulaire";

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

  const {
    school,
    faculty,
    name,
    level,
    niveau,
    teacherModel,
    titulaireId,
    duration,
    description,
    tuitionFee,
    admissionConditions,
  } = (await request.json()) ?? {};

  if (!school || !getSchools().some((s) => s.slug === school)) {
    return NextResponse.json({ error: "École invalide." }, { status: 400 });
  }
  if (!name || !faculty || !level || !duration || !description) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  const resolved = await resolveTeacherModel(school, teacherModel, titulaireId);
  if (!resolved.ok) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const conditions: string[] = Array.isArray(admissionConditions)
    ? admissionConditions.filter((c) => typeof c === "string" && c.trim().length > 0)
    : [];

  const validNiveaux = ["prescolaire", "primaire", "secondaire"];
  await prisma.program.update({
    where: { id },
    data: {
      school,
      faculty,
      name,
      level,
      niveau: school === "ecole-classique" && validNiveaux.includes(niveau) ? niveau : null,
      teacherModel: resolved.value.teacherModel,
      titulaireId: resolved.value.titulaireId,
      duration,
      description,
      tuitionFee: Number.isFinite(Number(tuitionFee)) ? Math.max(0, Math.round(Number(tuitionFee))) : 0,
      admissionConditions: JSON.stringify(conditions),
    },
  });

  if (resolved.value.teacherModel === "titulaire" && resolved.value.titulaireId !== program.titulaireId) {
    await cascadeTitulaireToCourses(id, resolved.value.titulaireId);
  }

  return NextResponse.json({ ok: true });
}
