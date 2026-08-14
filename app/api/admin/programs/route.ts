import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { getSchools } from "@/lib/content";
import { slugify } from "@/lib/slugify";
import { resolveTeacherModel } from "@/lib/titulaire";
import { resolveUniversiteFields } from "@/lib/universiteValidation";
import { writeAuditLog } from "@/lib/auditLog";

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || "programme";
  let n = 2;
  while (await prisma.program.findUnique({ where: { slug } })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json()) ?? {};
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
  } = body;

  if (!school || !getSchools().some((s) => s.slug === school)) {
    return NextResponse.json({ error: "École invalide." }, { status: 400 });
  }

  const universite = await resolveUniversiteFields(school, body);
  if (!universite.ok) {
    return NextResponse.json({ error: universite.error }, { status: 400 });
  }

  const facultyName = school === "universite" ? (faculty || "").trim() || null : faculty;
  if (!name || !facultyName || !level || !duration || !description) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  const resolved = await resolveTeacherModel(school, teacherModel, titulaireId);
  if (!resolved.ok) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const conditions: string[] = Array.isArray(admissionConditions)
    ? admissionConditions.filter((c) => typeof c === "string" && c.trim().length > 0)
    : [];

  const slug = await uniqueSlug(slugify(name));

  const validNiveaux = ["prescolaire", "primaire", "secondaire"];
  const program = await prisma.program.create({
    data: {
      slug,
      school,
      faculty: facultyName!,
      academicFacultyId: universite.value.academicFacultyId,
      name,
      level,
      niveau: school === "ecole-classique" && validNiveaux.includes(niveau) ? niveau : null,
      teacherModel: resolved.value.teacherModel,
      titulaireId: resolved.value.titulaireId,
      programType: universite.value.programType,
      programStatus: universite.value.programStatus,
      authorizationRef: universite.value.authorizationRef,
      authorizationDate: universite.value.authorizationDate,
      authorizationDocumentRef: universite.value.authorizationDocumentRef,
      passingGrade: universite.value.passingGrade,
      duration,
      description,
      tuitionFee: Number.isFinite(Number(tuitionFee)) ? Math.max(0, Math.round(Number(tuitionFee))) : 0,
      admissionConditions: JSON.stringify(conditions),
    },
  });

  await writeAuditLog({
    entityType: "Program",
    entityId: program.id,
    action: "create",
    actorId: session.userId,
    after: program,
  });

  return NextResponse.json({ slug: program.slug }, { status: 201 });
}
