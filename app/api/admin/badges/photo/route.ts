import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

// Route dédiée à la photo — distincte de la gestion générale des badges pour
// que l'import de photo (immédiat, dès le choix du fichier, voir
// components/BadgeManager.tsx `handlePhoto`) ne dépende jamais d'une autre
// action concurrente. Cible un compte (userId), pas un badge : la photo vit
// sur User.photoUrl, réutilisée partout où le compte est affiché.
export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { userId, photoUrl } = (await request.json().catch(() => ({}))) as {
    userId?: unknown;
    photoUrl?: unknown;
  };
  const uid = Number(userId);
  if (!Number.isInteger(uid) || typeof photoUrl !== "string" || !photoUrl) {
    return NextResponse.json({ error: "Compte et photo requis." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: uid } });
  if (!user) {
    return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
  }

  const updated = await prisma.user.update({ where: { id: uid }, data: { photoUrl } });

  if (user.photoUrl && user.photoUrl !== photoUrl) {
    try {
      await del(user.photoUrl);
    } catch {
      // Ancien blob déjà supprimé ou inaccessible — sans impact sur la mise à jour.
    }
  }

  await writeAuditLog({
    entityType: "User",
    entityId: String(uid),
    action: "photo_update",
    actorId: resolveActorId(session.userId),
    before: { photoUrl: user.photoUrl },
    after: { photoUrl: updated.photoUrl },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { userId } = (await request.json().catch(() => ({}))) as { userId?: unknown };
  const uid = Number(userId);
  if (!Number.isInteger(uid)) {
    return NextResponse.json({ error: "Compte requis." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: uid } });
  if (!user) {
    return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
  }

  await prisma.user.update({ where: { id: uid }, data: { photoUrl: null } });

  if (user.photoUrl) {
    try {
      await del(user.photoUrl);
    } catch {
      // Blob déjà supprimé ou inaccessible.
    }
  }

  await writeAuditLog({
    entityType: "User",
    entityId: String(uid),
    action: "photo_remove",
    actorId: resolveActorId(session.userId),
    before: { photoUrl: user.photoUrl },
    after: { photoUrl: null },
  });

  return NextResponse.json({ ok: true });
}
