import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { label, startDate, endDate, isActive } = (await request.json()) ?? {};
  if (!label || !startDate || !endDate) {
    return NextResponse.json({ error: "Libellé, date de début et date de fin sont requis." }, { status: 400 });
  }

  const existing = await prisma.academicYear.findUnique({ where: { label } });
  if (existing) {
    return NextResponse.json({ error: "Cette année académique existe déjà." }, { status: 400 });
  }

  const year = await prisma.academicYear.create({
    data: {
      label,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isActive: Boolean(isActive),
    },
  });

  await writeAuditLog({
    entityType: "AcademicYear",
    entityId: year.id,
    action: "create",
    actorId: session.userId,
    after: year,
  });

  return NextResponse.json({ id: year.id }, { status: 201 });
}
