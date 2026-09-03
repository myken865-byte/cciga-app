import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import CanteenManager from "@/components/CanteenManager";

export const dynamic = "force-dynamic";

export default async function AdminCantinePage() {
  const [rawMenus, allUsers] = await Promise.all([
    prisma.canteenMenu.findMany({
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
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Cantine</h1>
      <CanteenManager menus={menus} students={students} />
    </div>
  );
}
