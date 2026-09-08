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
    return NextResponse.json({ error: "Choisissez une institution avant d'ajouter un menu." }, { status: 400 });
  }

  const { date, label, description } = (await request.json()) ?? {};
  if (!date || typeof date !== "string" || !label || typeof label !== "string" || !label.trim()) {
    return NextResponse.json({ error: "Date et libellé requis." }, { status: 400 });
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Date invalide." }, { status: 400 });
  }

  const menu = await prisma.canteenMenu.create({
    data: {
      date: parsedDate,
      label: label.trim(),
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      school,
    },
  });

  await writeAuditLog({
    entityType: "CanteenMenu",
    entityId: menu.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: menu,
  });

  return NextResponse.json({ id: menu.id }, { status: 201 });
}
