import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import ParentRequestForm from "@/components/ParentRequestForm";
import ParentRequestList, { type ParentRequestSummary } from "@/components/ParentRequestList";

export const metadata: Metadata = { title: "Mes demandes" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function PortailParentDemandesPage() {
  const session = await getSession();

  const [children, requests] = session
    ? await Promise.all([
        prisma.user.findMany({ where: { parentId: session.userId }, orderBy: { name: "asc" } }),
        prisma.parentRequest.findMany({
          where: { parentId: session.userId },
          include: { student: true },
          orderBy: { updatedAt: "desc" },
        }),
      ])
    : [[], []];

  const summaries: ParentRequestSummary[] = requests.map((r) => ({
    id: r.id,
    subject: r.subject,
    category: r.category,
    status: r.status,
    updatedAt: formatDate(r.updatedAt),
    studentName: r.student.name,
  }));

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/portail/parent" />

      <h1 className="mb-1 text-2xl font-bold text-foreground">Mes demandes</h1>
      <p className="mb-6 text-sm text-muted">
        Contactez l&apos;administration au sujet de vos enfants et suivez vos échanges.
      </p>

      {children.length === 0 ? (
        <div className="empty-state mb-6">
          Aucun enfant n&apos;est encore lié à votre compte. Contactez l&apos;administration du CCIGA
          pour établir ce lien.
        </div>
      ) : (
        <div className="mb-6">
          <ParentRequestForm students={children.map((c) => ({ id: c.id, name: c.name }))} />
        </div>
      )}

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Historique</h2>
      <ParentRequestList requests={summaries} basePath="/portail/parent/demandes" />
    </div>
  );
}
