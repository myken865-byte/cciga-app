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

export const metadata: Metadata = { title: "Présence" };
export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  present: "Présent",
  absent: "Absent",
  retard: "Retard",
};

const monthLabel = (d: Date) => d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

/**
 * Mission "Portail Parent — Phase P1" (2026-09-13), objectif C — même
 * principe que app/portail/etudiant/presence/page.tsx (déjà validée),
 * réutilise getLearnerPortalContext, jamais une deuxième requête
 * Attendance. Le modèle Attendance n'a aucun champ de justification —
 * aucune migration, aucun champ inventé ici (§14 de la mission).
 */
export default async function ParentPresencePage({
  searchParams,
}: {
  searchParams: Promise<{ enfant?: string; mois?: string; statut?: string }>;
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
        <h1 className="mb-6 text-2xl font-bold text-foreground">Présence</h1>
        <p className="empty-state">Aucun enfant lié à votre compte pour le moment.</p>
      </div>
    );
  }

  const { enfant, mois, statut } = await searchParams;
  const requestedId = enfant ? Number(enfant) : null;
  const selected = (requestedId && children.find((c) => c.id === requestedId)) || children[0];

  const ctx = await getLearnerPortalContext(selected.id);
  if (!ctx) notFound();
  const { attendance } = ctx;
  const theme = getParentPortalTheme((ctx.user.program?.school as SchoolKey | undefined) ?? null, ctx.user.program?.niveau ?? null);

  const availableMonths = Array.from(
    new Set(attendance.all.map((a) => `${a.date.getFullYear()}-${String(a.date.getMonth() + 1).padStart(2, "0")}`)),
  );
  const monthFilter = mois && availableMonths.includes(mois) ? mois : null;
  const statusFilter = statut && ["present", "absent", "retard"].includes(statut) ? statut : null;

  const filtered = attendance.all.filter((a) => {
    if (monthFilter) {
      const key = `${a.date.getFullYear()}-${String(a.date.getMonth() + 1).padStart(2, "0")}`;
      if (key !== monthFilter) return false;
    }
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  });

  const queryFor = (params: Record<string, string | null>) => {
    const usp = new URLSearchParams();
    usp.set("enfant", String(selected.id));
    if (params.mois) usp.set("mois", params.mois);
    if (params.statut) usp.set("statut", params.statut);
    return `?${usp.toString()}`;
  };

  return (
    <div>
      <BackButton fallbackHref="/portail/parent" />
      <ParentPortalBanner theme={theme} childName={selected.name} />
      <ParentNavPills active="presence" childId={selected.id} />
      <h1 className="mb-2 text-2xl font-bold text-foreground">{theme.moduleLabels.presence}</h1>
      <p className="mb-6 text-sm text-muted">{theme.moduleLabels.presence} de {selected.name}.</p>

      <ChildSwitcher kids={children.map((c) => ({ id: c.id, name: c.name }))} selectedId={selected.id} basePath="/portail/parent/presence" />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-5 text-center">
          <p className="text-2xl font-bold text-foreground">
            {attendance.presenceRate !== null ? `${attendance.presenceRate}%` : "—"}
          </p>
          <p className="text-xs text-muted">Taux de présence</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-bold text-red-600">{attendance.absences}</p>
          <p className="text-xs text-muted">Absences</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-bold text-amber-600">{attendance.retards}</p>
          <p className="text-xs text-muted">Retards</p>
        </div>
      </div>

      {(availableMonths.length > 1 || statusFilter) && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted">Filtrer :</span>
          <a
            href={queryFor({ mois: null, statut: statusFilter })}
            className={`rounded-full px-2 py-1 ${!monthFilter ? "bg-primary text-white" : "bg-background text-muted"}`}
          >
            Tous les mois
          </a>
          {availableMonths.map((m) => (
            <a
              key={m}
              href={queryFor({ mois: m, statut: statusFilter })}
              className={`rounded-full px-2 py-1 capitalize ${monthFilter === m ? "bg-primary text-white" : "bg-background text-muted"}`}
            >
              {monthLabel(new Date(`${m}-01`))}
            </a>
          ))}
          <span className="mx-1 text-muted">·</span>
          <a
            href={queryFor({ mois: monthFilter, statut: null })}
            className={`rounded-full px-2 py-1 ${!statusFilter ? "bg-primary text-white" : "bg-background text-muted"}`}
          >
            Tous statuts
          </a>
          {(["present", "absent", "retard"] as const).map((s) => (
            <a
              key={s}
              href={queryFor({ mois: monthFilter, statut: s })}
              className={`rounded-full px-2 py-1 ${statusFilter === s ? "bg-primary text-white" : "bg-background text-muted"}`}
            >
              {statusLabel[s]}
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">Aucune donnée de présence pour ce filtre.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-row-divider text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Cours</th>
                <th className="px-4 py-3">Enseignant</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 200).map((a) => (
                <tr key={a.id} className="border-b border-row-divider last:border-0">
                  <td className="px-4 py-3 text-muted">{a.date.toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{a.course.name}</td>
                  <td className="px-4 py-3 text-muted">{a.course.teacher?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        a.status === "present"
                          ? "bg-emerald-100 text-emerald-700"
                          : a.status === "retard"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {statusLabel[a.status] ?? a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
