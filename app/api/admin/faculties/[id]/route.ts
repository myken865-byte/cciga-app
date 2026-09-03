import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const faculty = await prisma.faculty.findUnique({ where: { id } });
  if (!faculty) {
    return NextResponse.json({ error: "Faculté introuvable." }, { status: 404 });
  }

  const { doyenId } = (await request.json()) ?? {};
  const resolvedDoyenId =
    doyenId !== null && doyenId !== undefined && doyenId !== "" && Number.isInteger(Number(doyenId))
      ? Number(doyenId)
      : null;

  const updated = await prisma.faculty.update({
    where: { id },
    data: { doyenId: resolvedDoyenId },
  });

  await writeAuditLog({
    entityType: "Faculty",
    entityId: id,
    action: "assign_doyen",
    actorId: resolveActorId(session.userId),
    before: { doyenId: faculty.doyenId },
    after: { doyenId: updated.doyenId },
  });

  return NextResponse.json({ ok: true });
}
