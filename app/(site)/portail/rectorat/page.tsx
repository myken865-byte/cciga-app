import type { Metadata } from "next";
import PortalHeader from "@/components/PortalHeader";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Portail Rectorat" };

export const dynamic = "force-dynamic";

export default async function PortailRectoratPage() {
  const session = await getSession();

  const [faculties, programs] = session
    ? await Promise.all([
        prisma.faculty.findMany({
          where: { school: "universite" },
          include: { doyen: true, _count: { select: { programs: true } } },
          orderBy: { name: "asc" },
        }),
        prisma.program.findMany({
          where: { school: "universite" },
          include: { coordinator: true, academicFaculty: true, _count: { select: { students: true } } },
          orderBy: { name: "asc" },
        }),
      ])
    : [[], []];

  return (
    <div>
      <PortalHeader
        title="Portail Rectorat"
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
      {session && (
        <div className="mx-auto max-w-4xl space-y-6 px-4 pb-14 lg:px-6">
          <div className="card p-6">
            <h2 className="section-label mb-3">Facultés — Université</h2>
            {faculties.length === 0 ? (
              <div className="empty-state">Aucune faculté enregistrée pour le moment.</div>
            ) : (
              <ul className="space-y-2">
                {faculties.map((f) => (
                  <li key={f.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
                    <span className="font-medium text-foreground">{f.name}</span>
                    <span className="text-muted">
                      {f._count.programs} programme(s) · Doyen : {f.doyen?.name ?? "à assigner"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-6">
            <h2 className="section-label mb-3">Programmes — Université</h2>
            {programs.length === 0 ? (
              <div className="empty-state">Aucun programme enregistré pour le moment.</div>
            ) : (
              <ul className="space-y-2">
                {programs.map((p) => (
                  <li key={p.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
                    <span className="font-medium text-foreground">
                      {p.name} <span className="text-muted">— {p.academicFaculty?.name ?? "faculté non assignée"}</span>
                    </span>
                    <span className="text-muted">
                      {p._count.students} étudiant(s) · Coordonnateur : {p.coordinator?.name ?? "à assigner"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="empty-state">
            Rapports institutionnels et décisions du Rectorat — à compléter.
          </div>
        </div>
      )}
    </div>
  );
}
