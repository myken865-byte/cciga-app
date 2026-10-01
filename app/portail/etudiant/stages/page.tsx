import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import InternshipList, { type InternshipSummary } from "@/components/InternshipList";

export const metadata: Metadata = { title: "Mes stages" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function PortailEtudiantStagesPage() {
  const session = await getSession();

  const internships = session
    ? await prisma.internship.findMany({ where: { studentId: session.userId }, orderBy: { startDate: "desc" } })
    : [];

  const summaries: InternshipSummary[] = internships.map((i) => ({
    id: i.id,
    title: i.title,
    hostOrganization: i.hostOrganization,
    status: i.status,
    startDate: formatDate(i.startDate),
  }));

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/portail/etudiant" />
      <h1 className="mb-1 text-2xl font-bold text-foreground">Mes stages</h1>
      <p className="mb-6 text-sm text-muted">Organisme, période, superviseur et évaluation de vos stages.</p>
      <InternshipList internships={summaries} basePath="/portail/etudiant/stages" />
    </div>
  );
}
