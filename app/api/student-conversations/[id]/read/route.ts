import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessStudentConversation } from "@/lib/studentConversationAccess";

// Marque comme lus tous les messages de l'autre partie — appelé à
// l'ouverture d'une conversation (voir StudentConversationThread).
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.studentConversation.findUnique({ where: { id } });
  if (!existing || !(await canAccessStudentConversation(session, existing))) {
    return NextResponse.json({ error: "Conversation introuvable." }, { status: 404 });
  }

  const isStudent = session.userId === existing.studentId;
  await prisma.studentConversationMessage.updateMany({
    where: { conversationId: id, authorId: { not: session.userId } },
    data: isStudent ? { readByStudent: true } : { readByStaff: true },
  });

  return NextResponse.json({ ok: true });
}
