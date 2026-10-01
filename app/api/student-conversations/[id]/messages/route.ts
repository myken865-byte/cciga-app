import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessStudentConversation } from "@/lib/studentConversationAccess";
import { createNotification } from "@/lib/notifications";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.studentConversation.findUnique({ where: { id } });
  if (!existing || !(await canAccessStudentConversation(session, existing))) {
    return NextResponse.json({ error: "Conversation introuvable." }, { status: 404 });
  }

  const { body } = (await request.json().catch(() => null)) ?? {};
  if (typeof body !== "string" || !body.trim() || body.trim().length > 2000) {
    return NextResponse.json({ error: "Message requis." }, { status: 400 });
  }

  const isStudent = session.userId === existing.studentId;
  const message = await prisma.studentConversationMessage.create({
    data: {
      conversationId: id,
      authorId: session.userId,
      body: body.trim(),
      readByStudent: isStudent,
      readByStaff: !isStudent,
    },
  });

  // Fait remonter la conversation en tête de liste (tri par updatedAt).
  await prisma.studentConversation.update({ where: { id }, data: { subject: existing.subject } });

  await createNotification(isStudent ? existing.staffId : existing.studentId, {
    type: "student_conversation_message",
    title: "Nouveau message",
    body: `Nouveau message dans la conversation "${existing.subject}".`,
  });

  return NextResponse.json({ id: message.id }, { status: 201 });
}
