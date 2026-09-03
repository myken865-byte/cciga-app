import type { Metadata } from "next";
import PortalHeader from "@/components/PortalHeader";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { prisma } from "@/lib/db";
import { hasRole } from "@/lib/roles";

export const metadata: Metadata = { title: "Portail Décanat" };

export const dynamic = "force-dynamic";

export default async function PortailDecanatPage() {
  const session = await getSession();
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  const faculties = session
    ? await prisma.faculty.findMany({
        where: {
          school: "universite",
          ...(isSuperAdmin ? {} : { doyenId: session.userId }),
        },
        include: {
          doyen: true,
          programs: { include: { coordinator: true, _count: { select: { students: true } } } },
        },
        orderBy: { name: "asc" },
      })
    : [];

  return (
    <div>
      <PortalHeader
        title="Portail Décanat"
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
      {session && (
        <div className="mx-auto max-w-4xl space-y-6 px-4 pb-14 lg:px-6">
          {faculties.length === 0 ? (
            <div className="empty-state">
              Aucune faculté ne vous est assignée pour le moment. Contactez l&apos;administration.
            </div>
          ) : (
            faculties.map((f) => (
              <div key={f.id} className="card p-6">
                <h2 className="section-label mb-3">{f.name}</h2>
                {f.programs.length === 0 ? (
                  <div className="empty-state">Aucun programme rattaché à cette faculté.</div>
                ) : (
                  <ul className="space-y-2">
                    {f.programs.map((p) => (
                      <li key={p.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
                        <span className="font-medium text-foreground">{p.name}</span>
                        <span className="text-muted">
                          {p._count.students} étudiant(s) · Coordonnateur : {p.coordinator?.name ?? "à assigner"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}

          <div className="empty-state">
            Décisions de faculté et rapports du Décanat — à compléter.
          </div>
        </div>
      )}
    </div>
  );
}
