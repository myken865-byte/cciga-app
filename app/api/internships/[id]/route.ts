import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessInternship, isInternshipStaff } from "@/lib/internshipAccess";
import { isInternshipStatus } from "@/lib/internships";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { createNotification } from "@/lib/notifications";

// Mise à jour d'un stage — statut, évaluation, documents. Réservé au
// personnel (jamais l'étudiant, qui reste en lecture seule — mandat §3).
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !isInternshipStaff(session)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.internship.findUnique({ where: { id } });
  if (!existing || !(await canAccessInternship(session, existing))) {
    return NextResponse.json({ error: "Stage introuvable." }, { status: 404 });
  }

  const { status, evaluationScore, evaluationComment, reportUrl, reportName, conventionUrl, conventionName } =
    (await request.json().catch(() => null)) ?? {};

  const data: Record<string, unknown> = {};

  if (status !== undefined) {
    if (typeof status !== "string" || !isInternshipStatus(status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    data.status = status;
  }
  if (evaluationScore !== undefined) {
    const n = Number(evaluationScore);
    if (evaluationScore !== null && (Number.isNaN(n) || n < 0 || n > 100)) {
      return NextResponse.json({ error: "Note d'évaluation invalide." }, { status: 400 });
    }
    data.evaluationScore = evaluationScore === null ? null : n;
    data.evaluatedById = resolveActorId(session.userId) ?? undefined;
  }
  if (evaluationComment !== undefined) {
    if (evaluationComment !== null && typeof evaluationComment !== "string") {
      return NextResponse.json({ error: "Commentaire invalide." }, { status: 400 });
    }
    data.evaluationComment = evaluationComment;
  }
  if (reportUrl !== undefined) data.reportUrl = typeof reportUrl === "string" ? reportUrl : null;
  if (reportName !== undefined) data.reportName = typeof reportName === "string" ? reportName : null;
  if (conventionUrl !== undefined) data.conventionUrl = typeof conventionUrl === "string" ? conventionUrl : null;
  if (conventionName !== undefined) data.conventionName = typeof conventionName === "string" ? conventionName : null;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Aucune modification fournie." }, { status: 400 });
  }

  const updated = await prisma.internship.update({ where: { id }, data });

  await writeAuditLog({
    entityType: "Internship",
    entityId: updated.id,
    action: "update",
    actorId: resolveActorId(session.userId),
    before: existing,
    after: updated,
  });

  if (typeof data.status === "string" && data.status !== existing.status) {
    await createNotification(existing.studentId, {
      type: "internship_status",
      title: "Mise à jour de votre stage",
      body: `Votre stage "${existing.title}" est maintenant : ${data.status}.`,
    });
  }

  return NextResponse.json({ id: updated.id });
}
