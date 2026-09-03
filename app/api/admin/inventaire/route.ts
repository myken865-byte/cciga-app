import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";
import { writeAuditLog } from "@/lib/auditLog";
import { SCHOOL_COOKIE, isSchoolKey } from "@/lib/institutions";
import { resolveActorId } from "@/lib/devBypass";

const categories = ["equipement", "mobilier", "informatique", "pedagogique", "laboratoire"];
const conditions = ["bon", "moyen", "mauvais", "hors_service"];

async function requireInventoryAccess() {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN", "LOGISTICIEN"])) return null;
  return session;
}

/**
 * L'institution active vient toujours du cookie serveur (jamais du corps de
 * la requête) — un client ne peut pas déclarer appartenir à une autre école
 * pour contourner l'isolation de l'inventaire.
 */
async function getActiveSchool() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SCHOOL_COOKIE)?.value;
  return isSchoolKey(raw) ? raw : null;
}

export async function POST(request: Request) {
  const session = await requireInventoryAccess();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant d'ajouter un article." }, { status: 400 });
  }

  const { name, category, identifier, location, quantity } = (await request.json()) ?? {};
  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Nom requis." }, { status: 400 });
  }
  if (!categories.includes(category)) {
    return NextResponse.json({ error: "Catégorie invalide." }, { status: 400 });
  }

  const item = await prisma.inventoryItem.create({
    data: {
      school,
      name: name.trim(),
      category,
      identifier: typeof identifier === "string" && identifier.trim() ? identifier.trim() : null,
      location: typeof location === "string" && location.trim() ? location.trim() : null,
      quantity: Number.isInteger(Number(quantity)) && Number(quantity) > 0 ? Number(quantity) : 1,
    },
  });

  await writeAuditLog({
    entityType: "InventoryItem",
    entityId: item.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: item,
  });

  return NextResponse.json({ id: item.id }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await requireInventoryAccess();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant de modifier un article." }, { status: 400 });
  }

  const { itemId, condition } = (await request.json()) ?? {};
  if (!itemId || !conditions.includes(condition)) {
    return NextResponse.json({ error: "Article ou état invalide." }, { status: 400 });
  }

  const existing = await prisma.inventoryItem.findUnique({ where: { id: itemId } });
  if (!existing) {
    return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  }
  if (existing.school !== school) {
    return NextResponse.json({ error: "Cet article appartient à une autre institution." }, { status: 403 });
  }

  const updated = await prisma.inventoryItem.update({ where: { id: itemId }, data: { condition } });

  await writeAuditLog({
    entityType: "InventoryItem",
    entityId: itemId,
    action: "condition_change",
    actorId: resolveActorId(session.userId),
    before: { condition: existing.condition },
    after: { condition: updated.condition },
  });

  return NextResponse.json({ ok: true });
}
