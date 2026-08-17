import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";

/**
 * Toggles Program.active — the reversible alternative to deletion. Archiving
 * never touches any dependent data (students, courses, grades, documents,
 * payments): it only removes the programme from public listings and
 * "create new" pickers, per the "Archiver au lieu de supprimer" policy.
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const program = await prisma.program.findUnique({ where: { id } });
  if (!program) {
    return NextResponse.json({ error: "Programme introuvable." }, { status: 404 });
  }

  const updated = await prisma.program.update({ where: { id }, data: { active: !program.active } });

  await writeAuditLog({
    entityType: "Program",
    entityId: id,
    action: updated.active ? "reactivate" : "archive",
    actorId: session.userId,
    before: { active: program.active },
    after: { active: updated.active },
  });

  return NextResponse.json({ active: updated.active });
}
