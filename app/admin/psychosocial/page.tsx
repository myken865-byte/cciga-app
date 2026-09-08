import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import PsychosocialCaseForm from "@/components/PsychosocialCaseForm";
import BackToPortalsButton from "@/components/BackToPortalsButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { ChatIcon } from "@/components/icons";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";

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

// Phase C3 (2026-09-08) : cloisonnement réel — PsychosocialCase.school
// (Phase C1/C2). Dossier confidentiel, cloisonnement d'autant plus
// nécessaire ; aucun dossier n'apparaît hors de son institution.
export default async function AdminPsychosocialPage() {
  const activeSchool = await getActiveSchool();

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <BackToPortalsButton className="mb-4" />
        <AdminTitleBand eyebrow="CCIGA — Dossiers confidentiels" title="Suivi psychosocial" />
        <div className="empty-state">
          Le suivi psychosocial est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const [cases, users] = await Promise.all([
    prisma.psychosocialCase.findMany({
      where: { school: activeSchool },
      include: { student: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ include: { program: true } }),
  ]);

  const students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT") && u.program?.school === activeSchool)
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <BackToPortalsButton className="mb-4" />
      <AdminTitleBand eyebrow="CCIGA — Dossiers confidentiels" title={`Suivi psychosocial — ${schoolLabels[activeSchool]}`} />
      <p className="mb-6 -mt-3 text-sm text-muted">Dossiers confidentiels — accès restreint.</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard title="Dossiers" icon={ChatIcon} className="lg:col-span-2">
          <div className="space-y-3">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/admin/psychosocial/${c.id}`}
                className="block rounded-lg border border-border p-4 hover:border-primary-light"
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
              <p className="rounded-lg border border-border p-8 text-center text-sm text-muted">
                Aucun dossier pour le moment.
              </p>
            )}
          </div>
        </AdminCard>

        <PsychosocialCaseForm students={students} />
      </div>
    </AdminShell>
  );
}
