import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import CanteenManager from "@/components/CanteenManager";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

// Phase C3 (2026-09-08) : cloisonnement réel — CanteenMenu.school
// (Phase C1/C2). Le menu resté AMBIGU n'apparaît dans aucune vue
// institutionnelle : invisible ici, non perdu, à arbitrer séparément.
export default async function AdminCantinePage() {
  const activeSchool = await getActiveSchool();

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Vie scolaire" title="Cantine" />
        <div className="empty-state">
          La cantine est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const [rawMenus, allUsers] = await Promise.all([
    prisma.canteenMenu.findMany({
      where: { school: activeSchool },
      include: {
        reservations: { include: { student: { select: { name: true } } } },
      },
      orderBy: { date: "desc" },
    }),
    prisma.user.findMany({ select: { id: true, name: true, roles: true }, orderBy: { name: "asc" } }),
  ]);

  const students = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => ({ id: u.id, name: u.name }));

  const menus = rawMenus.map((m) => ({
    id: m.id,
    date: m.date.toISOString().slice(0, 10),
    label: m.label,
    description: m.description,
    reservations: m.reservations.map((r) => ({ id: r.id, student: { name: r.student.name } })),
  }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Vie scolaire" title={`Cantine — ${schoolLabels[activeSchool]}`} />
      <CanteenManager menus={menus} students={students} />
    </AdminShell>
  );
}
