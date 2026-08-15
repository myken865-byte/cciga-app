import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { getSchools } from "@/lib/content";
import { resolveTeacherModel, cascadeTitulaireToCourses } from "@/lib/titulaire";
import { resolveUniversiteFields } from "@/lib/universiteValidation";
import { writeAuditLog } from "@/lib/auditLog";

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
    skillsTargeted,
    practicalWork,
    internship,
    certification,
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
  const skills: string[] = Array.isArray(skillsTargeted)
    ? skillsTargeted.filter((s) => typeof s === "string" && s.trim().length > 0)
    : [];

  const validNiveaux = ["prescolaire", "primaire", "secondaire"];
  const updated = await prisma.program.update({
    where: { id },
    data: {
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
      rankingEnabled: universite.value.rankingEnabled,
      skillsTargeted: skills.length > 0 ? JSON.stringify(skills) : null,
      practicalWork: typeof practicalWork === "string" && practicalWork.trim() ? practicalWork.trim() : null,
      internship: typeof internship === "string" && internship.trim() ? internship.trim() : null,
      certification: typeof certification === "string" && certification.trim() ? certification.trim() : null,
      duration,
      description,
      tuitionFee: Number.isFinite(Number(tuitionFee)) ? Math.max(0, Math.round(Number(tuitionFee))) : 0,
      admissionConditions: JSON.stringify(conditions),
    },
  });

  if (resolved.value.teacherModel === "titulaire" && resolved.value.titulaireId !== program.titulaireId) {
    await cascadeTitulaireToCourses(id, resolved.value.titulaireId);
  }

  if (updated.programStatus !== program.programStatus) {
    await writeAuditLog({
      entityType: "Program",
      entityId: id,
      action: "status_change",
      actorId: session.userId,
      before: { programStatus: program.programStatus },
      after: { programStatus: updated.programStatus },
    });
  } else {
    await writeAuditLog({
      entityType: "Program",
      entityId: id,
      action: "update",
      actorId: session.userId,
      before: program,
      after: updated,
    });
  }

  return NextResponse.json({ ok: true });
}
