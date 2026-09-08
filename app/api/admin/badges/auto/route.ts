import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { ensureBadgeForUser } from "@/lib/badgeAuto";
import { resolveActorId } from "@/lib/devBypass";

// Appelé par components/GenerateBadgeButton.tsx — même logique que la
// génération automatique après inscription (lib/badgeAuto.ts), réutilisée
// telle quelle pour une génération manuelle depuis la fiche d'un compte.
export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { userId } = (await request.json().catch(() => ({}))) as { userId?: unknown };
  const uid = Number(userId);
  if (!Number.isInteger(uid)) {
    return NextResponse.json({ error: "Compte invalide." }, { status: 400 });
  }

  const badge = await ensureBadgeForUser(uid, resolveActorId(session.userId));
  if (!badge) {
    return NextResponse.json(
      { error: "Impossible de générer un badge pour ce compte (rôle non éligible ou compte introuvable)." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, badge });
}
