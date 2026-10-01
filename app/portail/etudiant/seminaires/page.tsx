import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import SeminarList, { type SeminarSummary } from "@/components/SeminarList";

export const metadata: Metadata = { title: "Séminaires" };

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}

export default async function PortailEtudiantSeminairesPage() {
  const session = await getSession();

  const student = session
    ? await prisma.user.findUnique({ where: { id: session.userId }, include: { program: true } })
    : null;

  const seminars = student?.program
    ? await prisma.seminar.findMany({
        where: { school: student.program.school },
        include: { registrations: { where: { studentId: session!.userId } } },
        orderBy: { startAt: "desc" },
      })
    : [];

  const summaries: SeminarSummary[] = seminars.map((s) => ({
    id: s.id,
    title: s.title,
    startAt: formatDateTime(s.startAt),
    status: s.status,
    registered: s.registrations.length > 0,
  }));

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/portail/etudiant" />
      <h1 className="mb-1 text-2xl font-bold text-foreground">Séminaires</h1>
      <p className="mb-6 text-sm text-muted">Séminaires ouverts à votre institution — inscrivez-vous en un clic.</p>
      {!student?.program ? (
        <div className="empty-state">Aucun programme ne vous est encore assigné.</div>
      ) : (
        <SeminarList seminars={summaries} basePath="/portail/etudiant/seminaires" />
      )}
    </div>
  );
}
