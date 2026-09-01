import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Actualité introuvable." }, { status: 404 });
  }

  const { title, date, excerpt, content, category } = (await request.json()) ?? {};
  if (!title || !date || !excerpt || !content || !category) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  await prisma.news.update({
    where: { id },
    data: { title, date: new Date(date), excerpt, content, category },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Actualité introuvable." }, { status: 404 });
  }

  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
