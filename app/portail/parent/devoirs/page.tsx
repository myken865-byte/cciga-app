import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLearnerPortalContext } from "@/lib/portal/learnerData";
import ChildSwitcher from "@/components/portal/ChildSwitcher";
import BackButton from "@/components/BackButton";
import ParentPortalBanner from "@/components/portal/ParentPortalBanner";
import ParentNavPills from "@/components/portal/ParentNavPills";
import { getParentPortalTheme } from "@/lib/parentPortalTheme";
import type { SchoolKey } from "@/lib/institutions";

export const metadata: Metadata = { title: "Devoirs" };
export const dynamic = "force-dynamic";

/**
 * Mission "Portail Parent — Phase P1" (2026-09-13), objectif B — même
 * principe que la page Présence : réutilise getLearnerPortalContext
 * (assignments.all), jamais une deuxième requête Assignment.
 */
export default async function ParentDevoirsPage({
  searchParams,
}: {
  searchParams: Promise<{ enfant?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const children = await prisma.user.findMany({
    where: { parentId: session.userId },
    orderBy: { name: "asc" },
  });

  if (children.length === 0) {
    return (
      <div>
        <BackButton fallbackHref="/portail/parent" />
        <h1 className="mb-6 text-2xl font-bold text-foreground">Devoirs</h1>
        <p className="empty-state">Aucun enfant lié à votre compte pour le moment.</p>
      </div>
    );
  }

  const { enfant } = await searchParams;
  const requestedId = enfant ? Number(enfant) : null;
  const selected = (requestedId && children.find((c) => c.id === requestedId)) || children[0];

  const ctx = await getLearnerPortalContext(selected.id);
  if (!ctx) notFound();
  const { assignments } = ctx;
  const theme = getParentPortalTheme((ctx.user.program?.school as SchoolKey | undefined) ?? null, ctx.user.program?.niveau ?? null);

  return (
    <div>
      <BackButton fallbackHref="/portail/parent" />
      <ParentPortalBanner theme={theme} childName={selected.name} />
      <ParentNavPills active="devoirs" childId={selected.id} />
      <h1 className="mb-2 text-2xl font-bold text-foreground">{theme.moduleLabels.devoirs}</h1>
      <p className="mb-6 text-sm text-muted">{theme.moduleLabels.devoirs} de {selected.name}.</p>

      <ChildSwitcher kids={children.map((c) => ({ id: c.id, name: c.name }))} selectedId={selected.id} basePath="/portail/parent/devoirs" />

      {assignments.all.length === 0 ? (
        <div className="empty-state">Aucun devoir publié pour le moment.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-row-divider text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Devoir</th>
                <th className="px-4 py-3">Cours</th>
                <th className="px-4 py-3">Enseignant</th>
                <th className="px-4 py-3">Échéance</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {assignments.all.map((a) => {
                const submitted = a.submissions.length > 0 || a.grades.length > 0;
                return (
                  <tr key={a.id} className="border-b border-row-divider last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{a.title}</td>
                    <td className="px-4 py-3 text-muted">{a.course.name}</td>
                    <td className="px-4 py-3 text-muted">{a.course.teacher?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">
                      {a.dueDate ? a.dueDate.toLocaleDateString("fr-FR") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          submitted ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {submitted ? "Remis" : "Non remis"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
