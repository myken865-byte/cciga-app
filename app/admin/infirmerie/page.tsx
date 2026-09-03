import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import InfirmaryVisitForm from "@/components/InfirmaryVisitForm";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

export default async function AdminInfirmeriePage() {
  const [visits, users] = await Promise.all([
    prisma.infirmaryVisit.findMany({
      include: { student: true, recordedBy: true },
      orderBy: { visitDate: "desc" },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);

  const students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Infirmerie</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {visits.map((v) => (
            <div key={v.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{v.student.name}</p>
                  <p className="text-sm text-muted">{v.category}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{formatDate(v.visitDate)}</span>
              </div>
              {v.observations && (
                <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{v.observations}</p>
              )}
              <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                <span>{v.contactedGuardian ? "Responsable/parent contacté" : "Responsable/parent non contacté"}</span>
                <span>· Enregistré par {v.recordedBy.name}</span>
              </div>
            </div>
          ))}
          {visits.length === 0 && (
            <p className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
              Aucun passage enregistré pour le moment.
            </p>
          )}
        </div>

        <InfirmaryVisitForm students={students} />
      </div>
    </div>
  );
}
