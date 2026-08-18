import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { createNotification } from "@/lib/notifications";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || !hasRole(session.roles, "STUDENT")) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const assignment = await prisma.assignment.findUnique({
    where: { id },
    include: { course: true },
  });
  if (!assignment) {
    return NextResponse.json({ error: "Devoir introuvable." }, { status: 404 });
  }

  const student = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!student || student.programId !== assignment.course.programId) {
    return NextResponse.json({ error: "Non autorisé pour ce devoir." }, { status: 403 });
  }

  let requestBody: Record<string, any>;
  try {
    requestBody = ((await request.json()) as Record<string, any>) ?? {};
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }
  const { textContent, fileUrl } = requestBody;
  if (!textContent && !fileUrl) {
    return NextResponse.json(
      { error: "Un texte ou un lien de fichier est requis." },
      { status: 400 },
    );
  }

  const late = Boolean(assignment.dueDate && new Date() > assignment.dueDate);

  const submission = await prisma.submission.upsert({
    where: { assignmentId_studentId: { assignmentId: id, studentId: student.id } },
    update: {
      textContent: textContent || null,
      fileUrl: fileUrl || null,
      submittedAt: new Date(),
      late,
    },
    create: {
      assignmentId: id,
      studentId: student.id,
      textContent: textContent || null,
      fileUrl: fileUrl || null,
      late,
    },
  });

  if (assignment.course.teacherId) {
    await createNotification(assignment.course.teacherId, {
      type: "submission_new",
      title: "Nouvelle remise de devoir",
      body: `${assignment.course.name} : ${assignment.title} (${student.name})`,
    });
  }

  return NextResponse.json({ id: submission.id }, { status: 201 });
}
