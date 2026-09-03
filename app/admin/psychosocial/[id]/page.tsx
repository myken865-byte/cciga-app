import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import PsychosocialCaseDetail from "@/components/PsychosocialCaseDetail";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}

export default async function AdminPsychosocialCaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const psychosocialCase = await prisma.psychosocialCase.findUnique({
    where: { id },
    include: {
      student: true,
      notes: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!psychosocialCase) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton fallbackHref="/admin/psychosocial" />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{psychosocialCase.student.name}</h1>
        <p className="text-sm text-muted">Dossier ouvert le {formatDate(psychosocialCase.createdAt)}</p>
      </div>

      <PsychosocialCaseDetail
        caseId={psychosocialCase.id}
        status={psychosocialCase.status}
        notes={psychosocialCase.notes.map((n) => ({
          id: n.id,
          body: n.body,
          createdAt: formatDate(n.createdAt),
          author: { name: n.author.name },
        }))}
      />
    </div>
  );
}
