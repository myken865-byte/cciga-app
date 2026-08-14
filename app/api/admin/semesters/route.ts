import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { academicYearId, name, order } = (await request.json()) ?? {};
  if (!academicYearId || !name) {
    return NextResponse.json({ error: "Année académique et nom sont requis." }, { status: 400 });
  }

  const year = await prisma.academicYear.findUnique({ where: { id: academicYearId } });
  if (!year) {
    return NextResponse.json({ error: "Année académique invalide." }, { status: 400 });
  }

  const semester = await prisma.semester.create({
    data: {
      academicYearId,
      name,
      order: Number.isFinite(Number(order)) ? Number(order) : 1,
    },
  });

  await writeAuditLog({
    entityType: "Semester",
    entityId: semester.id,
    action: "create",
    actorId: session.userId,
    after: semester,
  });

  return NextResponse.json({ id: semester.id }, { status: 201 });
}
