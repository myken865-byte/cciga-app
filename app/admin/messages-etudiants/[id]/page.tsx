import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessStudentConversation, isAnyStudentConversationStaff } from "@/lib/studentConversationAccess";
import { hasRole } from "@/lib/roles";
import BackButton from "@/components/BackButton";
import StudentConversationThread, { type StudentConversationDetail } from "@/components/StudentConversationThread";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}

export default async function AdminMessagerieEtudiantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session || !(isAnyStudentConversationStaff(session) || hasRole(session.roles, "TEACHER"))) notFound();

  const conversation = await prisma.studentConversation.findUnique({
    where: { id },
    include: {
      student: true,
      staff: true,
      messages: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!conversation || !(await canAccessStudentConversation(session, conversation))) notFound();

  const detail: StudentConversationDetail = {
    id: conversation.id,
    subject: conversation.subject,
    service: conversation.service,
    student: { name: conversation.student.name },
    staff: { name: conversation.staff.name },
    messages: conversation.messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: formatDateTime(m.createdAt),
      author: { name: m.author.name },
      isSelf: m.authorId === session.userId,
    })),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/admin/messages-etudiants" />
      <StudentConversationThread conversation={detail} />
    </div>
  );
}
