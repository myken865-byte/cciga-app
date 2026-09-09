import { prisma } from "@/lib/db";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import BackButton from "@/components/BackButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { UsersIcon } from "@/components/icons";
import ElevesEcoleClassiqueTable from "@/components/admin/ElevesEcoleClassiqueTable";

export const dynamic = "force-dynamic";

export default async function ElevesEcoleClassiquePage() {
  // Mandat "Mise en état opérationnel" (2026-09-06) : même garde de contexte
  // que app/admin/inscriptions-ecole-classique/page.tsx — voir son commentaire.
  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool !== "ecole-classique" && activeSchool !== "toutes") {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/inscriptions-ecole-classique" label="Fiches d'inscription — École Classique" />
        <AdminTitleBand eyebrow="CCIGA — École Classique" title="Élèves inscrits — École Classique" />
        <AdminCard>
          <p className="text-sm text-muted">
            Sélectionnez l&apos;institution École Classique pour accéder à cette liste.
          </p>
        </AdminCard>
      </AdminShell>
    );
  }

  // Élèves déjà inscrits (item 4) : fiches validées et effectivement
  // rattachées à un compte élève — même paire de conditions que le hook
  // badge automatique (lib/badgeAuto.ts), jamais une simple lecture du statut.
  const forms = await prisma.classicEnrollmentForm.findMany({
    where: { status: "validee", studentUserId: { not: null } },
    include: { program: true, academicYear: true, student: { include: { badge: true } } },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/inscriptions-ecole-classique" label="Fiches d'inscription — École Classique" />
      <AdminTitleBand eyebrow="CCIGA — École Classique" title="Élèves inscrits — École Classique" />

      <AdminCard title="Élèves inscrits" icon={UsersIcon}>
        <ElevesEcoleClassiqueTable
          forms={forms.map((f) => ({
            id: f.id,
            lastName: f.lastName,
            firstName: f.firstName,
            studentUserId: f.studentUserId,
            program: f.program ? { name: f.program.name } : null,
            academicYear: f.academicYear ? { label: f.academicYear.label } : null,
            badgeStatus: f.student?.badge?.status ?? null,
          }))}
        />
      </AdminCard>
    </AdminShell>
  );
}
