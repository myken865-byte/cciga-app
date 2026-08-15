import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { writeAuditLog } from "@/lib/auditLog";
import { findDocumentsCoveringGrade, regenerateDocumentVersion } from "@/lib/documents";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const grade = await prisma.grade.findUnique({ where: { id }, include: { course: true } });
  if (!grade) {
    return NextResponse.json({ error: "Note introuvable." }, { status: 404 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isCourseTeacher = grade.course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour cette note." }, { status: 403 });
  }

  const { score, reason } = (await request.json()) ?? {};
  const parsedScore = Number(score);
  if (!Number.isFinite(parsedScore) || parsedScore < 0 || parsedScore > 100) {
    return NextResponse.json({ error: "Note invalide (entre 0 et 100)." }, { status: 400 });
  }
  if (!reason || typeof reason !== "string" || !reason.trim()) {
    return NextResponse.json({ error: "Un motif est requis pour toute modification de note." }, { status: 400 });
  }

  if (grade.status && grade.status !== "brouillon" && grade.status !== "soumis" && !isAdmin) {
    return NextResponse.json(
      { error: "Seule l'administration peut modifier une note déjà validée ou publiée." },
      { status: 403 },
    );
  }

  if (parsedScore === grade.score) {
    return NextResponse.json({ ok: true });
  }

  const updated = await prisma.grade.update({ where: { id }, data: { score: parsedScore } });

  await writeAuditLog({
    entityType: "Grade",
    entityId: id,
    action: "score_change",
    actorId: session.userId,
    before: { score: grade.score },
    after: { score: updated.score },
    reason: reason.trim(),
  });

  const covering = await findDocumentsCoveringGrade(id);
  for (const doc of covering) {
    await regenerateDocumentVersion(doc.id, session.userId, reason.trim());
  }

  return NextResponse.json({ ok: true });
}
