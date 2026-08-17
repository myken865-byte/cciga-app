import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
  }

  const { title, date, location, description } = (await request.json()) ?? {};
  if (!title || !date || !location || !description) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  await prisma.event.update({
    where: { id },
    data: { title, date: new Date(date), location, description },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
  }

  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
