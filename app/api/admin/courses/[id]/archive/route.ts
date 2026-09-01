import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";

/**
 * Toggles Course.active — the reversible alternative to deletion. Archiving
 * never touches any dependent data (grades, attendance, materials,
 * assignments, evaluation categories): it only removes the course from
 * "create new" pickers, per the "Archiver au lieu de supprimer" policy.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const updated = await prisma.course.update({ where: { id }, data: { active: !course.active } });

  await writeAuditLog({
    entityType: "Course",
    entityId: id,
    action: updated.active ? "reactivate" : "archive",
    actorId: session.userId,
    before: { active: course.active },
    after: { active: updated.active },
  });

  return NextResponse.json({ active: updated.active });
}
