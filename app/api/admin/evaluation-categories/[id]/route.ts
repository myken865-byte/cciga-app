import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const category = await prisma.evaluationCategory.findUnique({ where: { id } });
  if (!category) {
    return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
  }

  const gradeCount = await prisma.grade.count({ where: { evaluationCategoryId: id } });
  if (gradeCount > 0) {
    return NextResponse.json(
      { error: "Impossible de supprimer une catégorie qui a déjà des notes enregistrées." },
      { status: 400 },
    );
  }

  await prisma.evaluationCategory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
