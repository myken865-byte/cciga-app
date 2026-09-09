import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import PsychosocialCaseForm from "@/components/PsychosocialCaseForm";
import BackToPortalsButton from "@/components/BackToPortalsButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { ChatIcon } from "@/components/icons";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";
import PsychosocialCaseList from "@/components/admin/PsychosocialCaseList";

export const dynamic = "force-dynamic";

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
          <PsychosocialCaseList
            cases={cases.map((c) => ({
              id: c.id,
              status: c.status,
              createdAtLabel: formatDate(c.createdAt),
              student: { name: c.student.name },
            }))}
          />
        </AdminCard>

        <PsychosocialCaseForm students={students} />
      </div>
    </AdminShell>
  );
}
