import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLearnerPortalContext } from "@/lib/portal/learnerData";
import { formatCcigaId } from "@/lib/cciga-id";
import { getParentPortalTheme } from "@/lib/parentPortalTheme";
import { niveauLabels, type Niveau } from "@/lib/niveaux";
import type { SchoolKey } from "@/lib/institutions";
import ChildSwitcher from "@/components/portal/ChildSwitcher";
import ParentInstitutionSelector from "@/components/portal/ParentInstitutionSelector";
import ParentPortalBanner from "@/components/portal/ParentPortalBanner";
import ParentNavPills from "@/components/portal/ParentNavPills";
import {
  ParentChildIdentityCard,
  ParentWelcomeCard,
  ParentFinanceSummaryCard,
  ParentRecentDocumentsCard,
  ParentGradesEvolutionCard,
  ParentAssignmentsPreviewCard,
  ParentAttendanceDonutCard,
} from "@/components/portal/ParentDashboardWidgets";

export const metadata: Metadata = { title: "Portail Parent" };
export const dynamic = "force-dynamic";

const docTypeLabel: Record<string, string> = {
  bulletin_periode: "Bulletin périodique",
  bulletin_annuel: "Bulletin annuel",
  releve_semestre: "Relevé de semestre",
};

/**
 * Mission "Portail Parent multi-institutions" (2026-09-13) — page racine du
 * portail Parent : tableau de bord de l'enfant sélectionné, moteur commun
 * aux 3 institutions (thème résolu dynamiquement, jamais une 4e variante
 * codée en dur). Réutilise exactement les mêmes briques que les sous-pages
 * Documents/Finance/Présence/Devoirs (getLearnerPortalContext, ChildSwitcher,
 * ParentPortalBanner, ParentNavPills) — aucune deuxième logique ici.
 */
export default async function PortailParentPage({
  searchParams,
}: {
  searchParams: Promise<{ enfant?: string; institution?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const children = await prisma.user.findMany({
    where: { parentId: session.userId },
    include: { program: true },
    orderBy: { name: "asc" },
  });

  if (children.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 lg:px-6">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Portail Parent</h1>
        <div className="empty-state">
          Aucun enfant n&apos;est encore lié à votre compte. Contactez l&apos;administration du CCIGA pour établir ce
          lien.
        </div>
      </div>
    );
  }

  const { enfant, institution } = await searchParams;
  const institutions = Array.from(
    new Set(children.map((c) => c.program?.school).filter((s): s is SchoolKey => !!s)),
  );
  const activeInstitution = institution && institutions.includes(institution as SchoolKey) ? (institution as SchoolKey) : null;
  const visibleChildren = activeInstitution ? children.filter((c) => c.program?.school === activeInstitution) : children;

  const requestedId = enfant ? Number(enfant) : null;
  const selected =
    (requestedId && visibleChildren.find((c) => c.id === requestedId)) || visibleChildren[0] || children[0];

  const ctx = await getLearnerPortalContext(selected.id);
  if (!ctx) redirect("/portail/parent");

  const theme = getParentPortalTheme(
    (ctx.user.program?.school as SchoolKey | undefined) ?? null,
    ctx.user.program?.niveau ?? null,
  );
  const niveauLabel = ctx.user.program?.niveau ? niveauLabels[ctx.user.program.niveau as Niveau] : null;

  const recentDocuments = ctx.documents.slice(0, 4).map((d) => ({
    id: d.id,
    label: docTypeLabel[d.type] ?? d.type,
    href: `/api/documents/${d.id}/pdf`,
  }));

  const gradeItems = ctx.grades.published.slice(0, 5).map((g) => ({
    id: g.id,
    label: `${g.course.name}${g.assignment ? ` — ${g.assignment.title}` : ""}`,
    score: g.score,
  }));

  const assignmentItems = ctx.assignments.all.slice(0, 4).map((a) => ({
    id: a.id,
    title: a.title,
    courseName: a.course.name,
    dueDateLabel: a.dueDate ? a.dueDate.toLocaleDateString("fr-FR") : null,
    status: (a.submissions.length > 0 || a.grades.length > 0 ? "remis" : "non_remis") as "remis" | "non_remis",
  }));

  const presentCount = Math.max(0, ctx.attendance.total - ctx.attendance.absences - ctx.attendance.retards);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-14 lg:px-6">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Portail Parent</h1>
      <ParentInstitutionSelector institutions={institutions} active={activeInstitution} basePath="/portail/parent" />
      <ParentPortalBanner theme={theme} childName={selected.name} />
      <ParentNavPills active="dashboard" childId={selected.id} />
      <ChildSwitcher kids={visibleChildren.map((c) => ({ id: c.id, name: c.name }))} selectedId={selected.id} basePath="/portail/parent" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ParentChildIdentityCard
          name={selected.name}
          photoUrl={ctx.user.photoUrl}
          ccigaId={formatCcigaId(selected.id)}
          programName={ctx.user.program?.name ?? null}
          niveauLabel={niveauLabel}
          institutionLabel={theme.institutionLabel}
          academicYearLabel={ctx.academicYearLabel}
        />
        <ParentWelcomeCard theme={theme} childName={selected.name} />
        <ParentFinanceSummaryCard
          fee={ctx.finance.fee}
          paid={ctx.finance.paid}
          balance={ctx.finance.balance}
          financeLabel={theme.moduleLabels.finance}
          studentId={selected.id}
        />
        <ParentAssignmentsPreviewCard assignments={assignmentItems} devoirsLabel={theme.moduleLabels.devoirs} studentId={selected.id} />
        <ParentAttendanceDonutCard
          present={presentCount}
          absent={ctx.attendance.absences}
          retard={ctx.attendance.retards}
          presenceLabel={theme.moduleLabels.presence}
        />
        <ParentGradesEvolutionCard
          grades={gradeItems}
          evolutionLabel={theme.moduleLabels.evolution}
          emptyHint="Aucune note publiée pour le moment."
        />
        <ParentRecentDocumentsCard documents={recentDocuments} studentId={selected.id} />
      </div>
    </div>
  );
}
