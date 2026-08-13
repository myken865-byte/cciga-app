import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { question, answer } = (await request.json()) ?? {};

  if (!question || !answer) {
    return NextResponse.json({ error: "Question et réponse requises." }, { status: 400 });
  }

  const count = await prisma.faq.count();

  const faq = await prisma.faq.create({
    data: { question, answer, order: count },
  });

  return NextResponse.json({ id: faq.id }, { status: 201 });
}
