import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { school, name } = (await request.json()) ?? {};
  if (!school || !name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "École et nom sont requis." }, { status: 400 });
  }

  const existing = await prisma.faculty.findUnique({
    where: { school_name: { school, name: name.trim() } },
  });
  if (existing) {
    return NextResponse.json({ error: "Cette faculté/domaine existe déjà." }, { status: 400 });
  }

  const faculty = await prisma.faculty.create({ data: { school, name: name.trim() } });

  await writeAuditLog({
    entityType: "Faculty",
    entityId: faculty.id,
    action: "create",
    actorId: session.userId,
    after: faculty,
  });

  return NextResponse.json({ id: faculty.id }, { status: 201 });
}
