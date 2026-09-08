import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import PsychosocialCaseDetail from "@/components/PsychosocialCaseDetail";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import { getActiveSchool } from "@/lib/institutionContext";

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
  const activeSchool = await getActiveSchool();
  const psychosocialCase = await prisma.psychosocialCase.findUnique({
    where: { id },
    include: {
      student: true,
      notes: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });
  // Non-croisement (Phase C3) : accès direct par ID à un dossier d'une autre
  // institution (ou non attribué — cas AMBIGU) refusé, comme s'il n'existait pas.
  if (!psychosocialCase || !activeSchool || psychosocialCase.school !== activeSchool) notFound();

  return (
    <AdminShell>
      <div className="mx-auto max-w-2xl">
        <BackButton fallbackHref="/admin/psychosocial" />

        <AdminTitleBand
          eyebrow="CCIGA — Suivi psychosocial"
          title={psychosocialCase.student.name}
          trailing={
            <p className="text-sm text-white/80">
              Dossier ouvert le {formatDate(psychosocialCase.createdAt)}
            </p>
          }
        />

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
    </AdminShell>
  );
}
