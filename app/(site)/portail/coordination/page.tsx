import type { Metadata } from "next";
import Link from "next/link";
import PortalHeader from "@/components/PortalHeader";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { prisma } from "@/lib/db";
import { hasRole } from "@/lib/roles";

export const metadata: Metadata = { title: "Portail Coordination" };

export const dynamic = "force-dynamic";

export default async function PortailCoordinationPage() {
  const session = await getSession();
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  const programs = session
    ? await prisma.program.findMany({
        where: {
          school: "universite",
          ...(isSuperAdmin ? {} : { coordinatorId: session.userId }),
        },
        include: {
          academicFaculty: true,
          _count: { select: { students: true } },
          courses: { select: { id: true, name: true } },
        },
        orderBy: { name: "asc" },
      })
    : [];

  return (
    <div>
      <PortalHeader
        title="Portail Coordination"
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
      {session && (
        <div className="mx-auto max-w-4xl space-y-6 px-4 pb-14 lg:px-6">
          {programs.length === 0 ? (
            <div className="empty-state">
              Aucun programme ne vous est assigné pour le moment. Contactez l&apos;administration.
            </div>
          ) : (
            programs.map((p) => (
              <div key={p.id} className="card p-6">
                <h2 className="section-label mb-1">{p.name}</h2>
                <p className="mb-3 text-sm text-muted">
                  {p.academicFaculty?.name ?? "faculté non assignée"} · {p._count.students} étudiant(s)
                </p>
                {p.courses.length === 0 ? (
                  <div className="empty-state">Aucun cours dans ce programme.</div>
                ) : (
                  <ul className="space-y-2">
                    {p.courses.map((c) => (
                      <li key={c.id} className="rounded-md border border-border p-3 text-sm text-foreground">
                        {c.name}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/admin/programs/${p.id}`} className="mt-3 inline-block text-sm text-primary hover:underline">
                  Voir le programme →
                </Link>
              </div>
            ))
          )}

          <div className="empty-state">
            Suivi de progression et rapports de coordination — à compléter.
          </div>
        </div>
      )}
    </div>
  );
}
