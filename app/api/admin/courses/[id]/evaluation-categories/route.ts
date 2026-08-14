import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const { name, weightPercent } = (await request.json()) ?? {};
  const weight = Number(weightPercent);
  if (!name || !Number.isFinite(weight) || weight <= 0 || weight > 100) {
    return NextResponse.json(
      { error: "Nom et pondération (entre 0 et 100) sont requis." },
      { status: 400 },
    );
  }

  const existing = await prisma.evaluationCategory.findMany({ where: { courseId: id } });
  const currentSum = existing.reduce((sum, c) => sum + c.weightPercent, 0);
  if (currentSum + weight > 100.01) {
    return NextResponse.json(
      {
        error: `Le total des pondérations dépasserait 100 % (actuellement ${currentSum}%, +${weight}%). La somme de toutes les catégories doit être égale à 100 %.`,
      },
      { status: 400 },
    );
  }

  const category = await prisma.evaluationCategory.create({
    data: { courseId: id, name, weightPercent: weight },
  });

  return NextResponse.json({ id: category.id }, { status: 201 });
}
