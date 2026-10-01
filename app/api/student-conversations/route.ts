import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { isStudentConversationService } from "@/lib/studentConversations";
import { resolveConversationStaffId } from "@/lib/studentConversationAccess";
import { notifyRoles, createNotification } from "@/lib/notifications";
import { studentConversationServiceRoles } from "@/lib/studentConversations";

// Création d'une conversation élève↔personnel — studentId vient toujours de
// la session. Pour service="enseignant", courseId doit référencer un cours
// réellement suivi par l'élève (programId correspondant) avec un
// enseignant assigné, jamais un id libre envoyé par le client.
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["STUDENT"])) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { service, subject, message, courseId } = (await request.json().catch(() => null)) ?? {};

  if (
    typeof service !== "string" ||
    !isStudentConversationService(service) ||
    typeof subject !== "string" ||
    !subject.trim() ||
    subject.trim().length > 200 ||
    typeof message !== "string" ||
    !message.trim() ||
    message.trim().length > 2000
  ) {
    return NextResponse.json({ error: "Champs requis manquants ou invalides." }, { status: 400 });
  }

  let staffId: number | null;
  let resolvedCourseId: string | undefined;

  if (service === "enseignant") {
    if (typeof courseId !== "string" || !courseId) {
      return NextResponse.json({ error: "Cours requis pour contacter un enseignant." }, { status: 400 });
    }
    const student = await prisma.user.findUnique({ where: { id: session.userId } });
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!student?.programId || !course || course.programId !== student.programId || !course.teacherId) {
      return NextResponse.json({ error: "Cours introuvable ou sans enseignant assigné." }, { status: 400 });
    }
    staffId = course.teacherId;
    resolvedCourseId = course.id;
  } else {
    staffId = await resolveConversationStaffId(service);
  }

  if (!staffId) {
    return NextResponse.json({ error: "Aucun membre du personnel disponible pour ce service." }, { status: 400 });
  }

  const created = await prisma.studentConversation.create({
    data: {
      studentId: session.userId,
      staffId,
      subject: subject.trim(),
      service,
      courseId: resolvedCourseId,
      messages: { create: { body: message.trim(), authorId: session.userId, readByStaff: false, readByStudent: true } },
    },
  });

  const student = await prisma.user.findUnique({ where: { id: session.userId } });
  if (service === "enseignant") {
    await createNotification(staffId, {
      type: "student_conversation_created",
      title: "Nouveau message d'un étudiant",
      body: `${student?.name ?? "Un étudiant"} vous a écrit : "${subject.trim()}".`,
    });
  } else {
    await notifyRoles(studentConversationServiceRoles[service], {
      type: "student_conversation_created",
      title: "Nouveau message d'un étudiant",
      body: `${student?.name ?? "Un étudiant"} a écrit : "${subject.trim()}".`,
    });
  }

  return NextResponse.json({ id: created.id }, { status: 201 });
}
