import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

export async function POST(request: Request) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant d'ajouter un véhicule." }, { status: 400 });
  }

  const { label, plate, capacity, driverName } = (await request.json()) ?? {};
  if (!label || typeof label !== "string" || !label.trim()) {
    return NextResponse.json({ error: "Le nom du véhicule/circuit est requis." }, { status: 400 });
  }

  const parsedCapacity = Number(capacity);
  const vehicle = await prisma.vehicle.create({
    data: {
      label: label.trim(),
      plate: typeof plate === "string" && plate.trim() ? plate.trim() : null,
      capacity: Number.isInteger(parsedCapacity) && parsedCapacity > 0 ? parsedCapacity : null,
      driverName: typeof driverName === "string" && driverName.trim() ? driverName.trim() : null,
      school,
    },
  });

  await writeAuditLog({
    entityType: "Vehicle",
    entityId: vehicle.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: vehicle,
  });

  return NextResponse.json({ id: vehicle.id }, { status: 201 });
}
