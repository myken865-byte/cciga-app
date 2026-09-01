import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.faq.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Question introuvable." }, { status: 404 });
  }

  const { question, answer } = (await request.json()) ?? {};
  if (!question || !answer) {
    return NextResponse.json({ error: "Question et réponse requises." }, { status: 400 });
  }

  await prisma.faq.update({ where: { id }, data: { question, answer } });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.faq.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Question introuvable." }, { status: 404 });
  }

  await prisma.faq.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
