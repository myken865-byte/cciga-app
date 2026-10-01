import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import StudentConversationForm from "@/components/StudentConversationForm";
import StudentConversationList, { type StudentConversationSummary } from "@/components/StudentConversationList";

export const metadata: Metadata = { title: "Mes messages" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function PortailEtudiantMessagesPage() {
  const session = await getSession();

  const [student, conversations] = session
    ? await Promise.all([
        prisma.user.findUnique({ where: { id: session.userId } }),
        prisma.studentConversation.findMany({
          where: { studentId: session.userId },
          include: { staff: true, messages: { select: { authorId: true, readByStudent: true } } },
          orderBy: { updatedAt: "desc" },
        }),
      ])
    : [null, []];

  const courses = student?.programId
    ? await prisma.course.findMany({
        where: { programId: student.programId, teacherId: { not: null } },
        select: { id: true, name: true },
      })
    : [];

  const summaries: StudentConversationSummary[] = conversations.map((c) => ({
    id: c.id,
    subject: c.subject,
    service: c.service,
    updatedAt: formatDate(c.updatedAt),
    counterpartName: c.staff.name,
    unread: c.messages.some((m) => m.authorId !== session!.userId && !m.readByStudent),
  }));

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/portail/etudiant" />

      <h1 className="mb-1 text-2xl font-bold text-foreground">Mes messages</h1>
      <p className="mb-6 text-sm text-muted">Contactez le personnel autorisé et suivez vos échanges.</p>

      <div className="mb-6">
        <StudentConversationForm courses={courses} />
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Conversations</h2>
      <StudentConversationList conversations={summaries} basePath="/portail/etudiant/messages" />
    </div>
  );
}
