import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const { status } = (await request.json()) ?? {};
  if (status !== "nouveau" && status !== "traite") {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const message = await prisma.message.findUnique({ where: { id } });
  if (!message) {
    return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
  }

  await prisma.message.update({ where: { id }, data: { status } });

  return NextResponse.json({ ok: true });
}
