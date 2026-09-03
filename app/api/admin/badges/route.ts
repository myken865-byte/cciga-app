import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { BADGE_STATUS_A_FINALISER } from "@/lib/badgeAuto";

const VALID_STATUSES = ["actif", "perdu", "remplace", "inactif", BADGE_STATUS_A_FINALISER];

// Création manuelle explicite (numéro choisi par l'administration) — distincte
// de la génération automatique de /api/admin/badges/auto, qui réutilise
// lib/badgeAuto.ts. Voir components/BadgeManager.tsx pour le contrat exact.
export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { userId, badgeNumber } = (await request.json().catch(() => ({}))) as {
    userId?: unknown;
    badgeNumber?: unknown;
  };
  const uid = Number(userId);
  if (!Number.isInteger(uid) || typeof badgeNumber !== "string" || !badgeNumber.trim()) {
    return NextResponse.json({ error: "Compte et numéro de badge requis." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: uid } });
  if (!user) {
    return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
  }

  const existing = await prisma.badge.findUnique({ where: { userId: uid } });
  if (existing) {
    return NextResponse.json({ error: "Ce compte a déjà un badge." }, { status: 400 });
  }

  const numberTaken = await prisma.badge.findUnique({ where: { badgeNumber: badgeNumber.trim() } });
  if (numberTaken) {
    return NextResponse.json({ error: "Ce numéro de badge est déjà utilisé." }, { status: 400 });
  }

  // Même convention que lib/badgeAuto.ts : un badge sans classe/programme
  // assigné reste "à finaliser" jusqu'à ce que l'information soit fournie.
  const badge = await prisma.badge.create({
    data: {
      userId: uid,
      badgeNumber: badgeNumber.trim(),
      status: user.programId ? "actif" : BADGE_STATUS_A_FINALISER,
      issuedById: session.userId,
    },
  });

  await writeAuditLog({
    entityType: "Badge",
    entityId: badge.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: badge,
  });

  return NextResponse.json({ id: badge.id }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { badgeId, status } = (await request.json().catch(() => ({}))) as {
    badgeId?: unknown;
    status?: unknown;
  };
  if (typeof badgeId !== "string" || !badgeId || typeof status !== "string" || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Badge et statut valides requis." }, { status: 400 });
  }

  const badge = await prisma.badge.findUnique({ where: { id: badgeId } });
  if (!badge) {
    return NextResponse.json({ error: "Badge introuvable." }, { status: 404 });
  }

  const updated = await prisma.badge.update({ where: { id: badgeId }, data: { status } });

  await writeAuditLog({
    entityType: "Badge",
    entityId: badgeId,
    action: "status_change",
    actorId: resolveActorId(session.userId),
    before: { status: badge.status },
    after: { status: updated.status },
  });

  return NextResponse.json({ ok: true });
}
