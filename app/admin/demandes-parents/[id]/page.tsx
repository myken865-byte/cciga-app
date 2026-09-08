import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessParentRequest } from "@/lib/parentRequestAccess";
import BackButton from "@/components/BackButton";
import ParentRequestThread, { type ParentRequestDetail } from "@/components/ParentRequestThread";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}

export default async function AdminDemandeParentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();

  const request = await prisma.parentRequest.findUnique({
    where: { id },
    include: {
      student: true,
      parent: true,
      messages: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!request || !canAccessParentRequest(session, request)) notFound();

  const detail: ParentRequestDetail = {
    id: request.id,
    subject: request.subject,
    category: request.category,
    service: request.service,
    status: request.status,
    attachmentUrl: request.attachmentUrl,
    attachmentName: request.attachmentName,
    createdAt: formatDateTime(request.createdAt),
    updatedAt: formatDateTime(request.updatedAt),
    student: { name: request.student.name },
    parent: { name: request.parent.name },
    messages: request.messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: formatDateTime(m.createdAt),
      author: { name: m.author.name },
      isSelf: m.authorId === session.userId,
    })),
  };

  return (
    <AdminShell>
      <AdminTitleBand eyebrow="CCIGA — Demande parent" title={detail.subject} />
      <div className="mx-auto max-w-2xl">
        <BackButton fallbackHref="/admin/demandes-parents" />
        <ParentRequestThread request={detail} canChangeStatus={true} />
      </div>
    </AdminShell>
  );
}
