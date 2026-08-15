import type { Metadata } from "next";
import Link from "next/link";
import PortalHeader from "@/components/PortalHeader";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { prisma } from "@/lib/db";
import { GRADE_WORKFLOW_SCHOOLS } from "@/lib/universite";

export const metadata: Metadata = { title: "Portail Responsable académique" };

export const dynamic = "force-dynamic";

export default async function PortailResponsablePage() {
  const session = await getSession();

  const courses = session
    ? await prisma.course.findMany({
        where: {
          program: { school: { in: GRADE_WORKFLOW_SCHOOLS } },
          grades: { some: { status: { in: ["soumis", "en_verification"] } } },
        },
        include: { program: true, grades: true },
      })
    : [];

  const withCounts = courses.map((c) => ({
    id: c.id,
    name: c.name,
    programName: c.program.name,
    soumis: c.grades.filter((g) => g.status === "soumis").length,
    enVerification: c.grades.filter((g) => g.status === "en_verification").length,
  }));

  return (
    <div>
      <PortalHeader
        title="Portail Responsable académique"
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
      {session && (
        <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Cours à réviser
            </h2>
            {withCounts.length === 0 ? (
              <p className="text-sm text-muted">Aucun cours n&apos;a de notes en attente de révision pour le moment.</p>
            ) : (
              <ul className="space-y-2">
                {withCounts.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/portail/responsable/cours/${c.id}`}
                      className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:border-primary"
                    >
                      <span className="font-medium text-foreground">
                        {c.name} <span className="text-muted">— {c.programName}</span>
                      </span>
                      <span className="text-muted">
                        {c.soumis} soumise(s) · {c.enVerification} en vérification
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
