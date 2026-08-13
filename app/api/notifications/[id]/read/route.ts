import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== session.userId) {
    return NextResponse.json({ error: "Notification introuvable." }, { status: 404 });
  }

  await prisma.notification.update({ where: { id }, data: { read: true } });

  return NextResponse.json({ ok: true });
}
