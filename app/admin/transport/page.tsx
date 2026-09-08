import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import TransportManager from "@/components/TransportManager";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

// Phase C3 (2026-09-08) : cloisonnement réel — Vehicle.school (Phase C1/C2).
// Le véhicule resté AMBIGU n'apparaît dans aucune vue institutionnelle :
// invisible ici, non perdu, à arbitrer séparément.
export default async function AdminTransportPage() {
  const activeSchool = await getActiveSchool();

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Vie scolaire" title="Transport" />
        <div className="empty-state">
          Le transport est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const [vehicles, allUsers] = await Promise.all([
    prisma.vehicle.findMany({
      where: { school: activeSchool },
      include: {
        assignments: { include: { student: { select: { name: true } } } },
      },
      orderBy: { label: "asc" },
    }),
    prisma.user.findMany({ select: { id: true, name: true, roles: true }, orderBy: { name: "asc" } }),
  ]);

  const students = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => ({ id: u.id, name: u.name }));

  const vehicleRows = vehicles.map((v) => ({
    id: v.id,
    label: v.label,
    plate: v.plate,
    capacity: v.capacity,
    driverName: v.driverName,
    passengers: v.assignments.map((a) => ({ id: a.id, student: { name: a.student.name } })),
  }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Vie scolaire" title={`Transport — ${schoolLabels[activeSchool]}`} />
      <TransportManager vehicles={vehicleRows} students={students} />
    </AdminShell>
  );
}
