import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessStudentRequest } from "@/lib/studentRequestAccess";
import BackButton from "@/components/BackButton";
import StudentRequestThread, { type StudentRequestDetail } from "@/components/StudentRequestThread";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}

export default async function PortailEtudiantDemandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();

  const request = await prisma.studentRequest.findUnique({
    where: { id },
    include: {
      student: true,
      messages: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });
  // Cette route vit sous /portail/etudiant (réservée au rôle STUDENT par
  // proxy.ts), donc en pratique seul l'élève propriétaire l'atteint — le
  // contrôle reste exécuté pour la même raison que ParentRequest : jamais se
  // reposer uniquement sur le préfixe de route.
  if (!request || !(await canAccessStudentRequest(session, request))) notFound();

  const detail: StudentRequestDetail = {
    id: request.id,
    subject: request.subject,
    category: request.category,
    status: request.status,
    description: request.description,
    attachmentUrl: request.attachmentUrl,
    attachmentName: request.attachmentName,
    documentUrl: request.documentUrl,
    documentName: request.documentName,
    createdAt: formatDateTime(request.createdAt),
    updatedAt: formatDateTime(request.updatedAt),
    student: { name: request.student.name },
    messages: request.messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: formatDateTime(m.createdAt),
      author: { name: m.author.name },
      isSelf: m.authorId === session.userId,
    })),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/portail/etudiant/demandes" />
      <StudentRequestThread request={detail} canChangeStatus={false} />
    </div>
  );
}
