import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || !hasRole(session.roles, "STUDENT")) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const assignment = await prisma.assignment.findUnique({ where: { id }, include: { course: true } });
  if (!assignment) {
    return NextResponse.json({ error: "Devoir introuvable." }, { status: 404 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.programId || user.programId !== assignment.course.programId) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const { textContent, fileUrl } = (await request.json()) ?? {};
  if (!textContent && !fileUrl) {
    return NextResponse.json({ error: "Une réponse ou un fichier est requis." }, { status: 400 });
  }

  const submittedAt = new Date();
  const late = Boolean(assignment.dueDate && submittedAt > assignment.dueDate);

  const submission = await prisma.submission.upsert({
    where: { assignmentId_studentId: { assignmentId: id, studentId: user.id } },
    update: { textContent: textContent || undefined, fileUrl: fileUrl || undefined, submittedAt, late },
    create: {
      assignmentId: id,
      studentId: user.id,
      textContent: textContent || undefined,
      fileUrl: fileUrl || undefined,
      submittedAt,
      late,
    },
  });

  return NextResponse.json({ id: submission.id }, { status: 201 });
}
