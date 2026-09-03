import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import PsychosocialCaseForm from "@/components/PsychosocialCaseForm";
import BackToPortalsButton from "@/components/BackToPortalsButton";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  ouvert: "Ouvert",
  suivi: "Suivi",
  cloture: "Clôturé",
};

const STATUS_STYLES: Record<string, string> = {
  ouvert: "bg-primary/10 text-primary",
  suivi: "bg-accent/10 text-accent",
  cloture: "bg-emerald-100 text-emerald-700",
};

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AdminPsychosocialPage() {
  const [cases, users] = await Promise.all([
    prisma.psychosocialCase.findMany({
      include: { student: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ orderBy: { name: "asc" } }),
  ]);

  const students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <div>
      <BackToPortalsButton className="mb-4" />
      <h1 className="mb-1 text-2xl font-bold text-foreground">Suivi psychosocial</h1>
      <p className="mb-6 text-sm text-muted">Dossiers confidentiels — accès restreint.</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/admin/psychosocial/${c.id}`}
              className="block rounded-lg border border-border bg-surface p-4 hover:border-primary-light"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{c.student.name}</p>
                  <p className="text-xs text-muted">Ouvert le {formatDate(c.createdAt)}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[c.status] ?? "bg-primary/10 text-primary"}`}>
                  {STATUS_LABELS[c.status] ?? c.status}
                </span>
              </div>
            </Link>
          ))}
          {cases.length === 0 && (
            <p className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
              Aucun dossier pour le moment.
            </p>
          )}
        </div>

        <PsychosocialCaseForm students={students} />
      </div>
    </div>
  );
}
