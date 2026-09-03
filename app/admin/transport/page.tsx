import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import TransportManager from "@/components/TransportManager";

export const dynamic = "force-dynamic";

export default async function AdminTransportPage() {
  const [vehicles, allUsers] = await Promise.all([
    prisma.vehicle.findMany({
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
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Transport</h1>
      <TransportManager vehicles={vehicleRows} students={students} />
    </div>
  );
}
