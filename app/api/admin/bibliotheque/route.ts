import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

export async function POST(request: Request) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant d'ajouter un ouvrage." }, { status: 400 });
  }

  const { title, author, category, totalCopies } = (await request.json()) ?? {};
  if (
    !title || typeof title !== "string" || !title.trim() ||
    !author || typeof author !== "string" || !author.trim() ||
    !category || typeof category !== "string" || !category.trim()
  ) {
    return NextResponse.json({ error: "Titre, auteur et catégorie requis." }, { status: 400 });
  }

  const parsedCopies = Number(totalCopies);
  const copies = Number.isInteger(parsedCopies) && parsedCopies > 0 ? parsedCopies : 1;

  const book = await prisma.book.create({
    data: {
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      totalCopies: copies,
      school,
    },
  });

  await writeAuditLog({
    entityType: "Book",
    entityId: book.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: book,
  });

  return NextResponse.json({ id: book.id }, { status: 201 });
}
