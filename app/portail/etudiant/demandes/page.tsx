import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import StudentRequestForm from "@/components/StudentRequestForm";
import StudentRequestList, { type StudentRequestSummary } from "@/components/StudentRequestList";

export const metadata: Metadata = { title: "Mes demandes administratives" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function PortailEtudiantDemandesPage() {
  const session = await getSession();

  const requests = session
    ? await prisma.studentRequest.findMany({
        where: { studentId: session.userId },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  const summaries: StudentRequestSummary[] = requests.map((r) => ({
    id: r.id,
    subject: r.subject,
    category: r.category,
    status: r.status,
    updatedAt: formatDate(r.updatedAt),
  }));

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/portail/etudiant" />

      <h1 className="mb-1 text-2xl font-bold text-foreground">Mes demandes administratives</h1>
      <p className="mb-6 text-sm text-muted">
        Attestation, relevé, duplicata de badge, correction d&apos;information… Soumettez une demande et suivez son
        traitement.
      </p>

      <div className="mb-6">
        <StudentRequestForm />
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Historique</h2>
      <StudentRequestList requests={summaries} basePath="/portail/etudiant/demandes" />
    </div>
  );
}
