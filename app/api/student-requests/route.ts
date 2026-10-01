import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { isStudentRequestCategory } from "@/lib/studentRequests";
import { notifyRoles } from "@/lib/notifications";

// Création d'une demande administrative par l'élève/étudiant lui-même —
// même schéma que app/api/parent-requests/route.ts mais studentId/authorId
// viennent toujours de la session, jamais d'un champ libre envoyé par le
// client (mandat "Finaliser les modules manquants", 2026-10-01, Phase 9 §6).
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["STUDENT"])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { category, subject, description } = (await request.json().catch(() => null)) ?? {};

  if (
    typeof category !== "string" ||
    !isStudentRequestCategory(category) ||
    typeof subject !== "string" ||
    !subject.trim() ||
    subject.trim().length > 200 ||
    (description !== undefined && description !== null && typeof description !== "string")
  ) {
    return NextResponse.json({ error: "Champs requis manquants ou invalides." }, { status: 400 });
  }

  const created = await prisma.studentRequest.create({
    data: {
      studentId: session.userId,
      category,
      subject: subject.trim(),
      description: typeof description === "string" && description.trim() ? description.trim() : undefined,
    },
  });

  const student = await prisma.user.findUnique({ where: { id: session.userId } });
  await notifyRoles(["ADMIN", "SUPER_ADMIN", "SECRETARIAT"], {
    type: "student_request_created",
    title: "Nouvelle demande administrative",
    body: `${student?.name ?? "Un étudiant"} a soumis une nouvelle demande : "${subject.trim()}".`,
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
