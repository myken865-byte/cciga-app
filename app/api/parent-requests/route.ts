import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { isParentRequestCategory, isParentRequestService } from "@/lib/parentRequests";

// Création d'une demande par un parent — voir components/ParentRequestForm.tsx
// `handleSubmit`. L'upload de la pièce jointe (le cas échéant) a déjà eu lieu
// avant cet appel via /api/parent-requests/upload ; ici on ne reçoit que
// l'URL/le nom du blob déjà déposé.
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["PARENT"])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { studentId, category, service, subject, message, attachmentUrl, attachmentName } =
    (await request.json().catch(() => null)) ?? {};

  const studentIdNum = Number(studentId);
  if (
    !Number.isInteger(studentIdNum) ||
    typeof category !== "string" ||
    !isParentRequestCategory(category) ||
    typeof service !== "string" ||
    !isParentRequestService(service) ||
    typeof subject !== "string" ||
    !subject.trim() ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "Champs requis manquants ou invalides." }, { status: 400 });
  }

  // Le parent ne peut créer une demande que pour un de ses propres enfants liés.
  const child = await prisma.user.findFirst({
    where: { id: studentIdNum, parentId: session.userId },
  });
  if (!child) {
    return NextResponse.json({ error: "Élève introuvable ou non lié à votre compte." }, { status: 400 });
  }

  const created = await prisma.parentRequest.create({
    data: {
      studentId: studentIdNum,
      parentId: session.userId,
      category,
      service,
      subject: subject.trim(),
      attachmentUrl: typeof attachmentUrl === "string" && attachmentUrl ? attachmentUrl : undefined,
      attachmentName: typeof attachmentName === "string" && attachmentName ? attachmentName : undefined,
      messages: { create: { body: message.trim(), authorId: session.userId } },
    },
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
