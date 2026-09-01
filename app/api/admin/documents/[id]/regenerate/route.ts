import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { regenerateDocumentVersion } from "@/lib/documents";

/**
 * Régénération manuelle — même moteur que la régénération automatique après
 * correction de note (app/api/grades/[id]/route.ts), pour les cas où une
 * autre donnée du bulletin (présence, appréciation) a changé sans correction
 * de note. Réservée à l'administration (permissions déjà en place).
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const { reason } = (await request.json().catch(() => null)) ?? {};

  await regenerateDocumentVersion(id, session.userId, reason || "Régénération manuelle depuis le Centre des Bulletins.");
  return NextResponse.json({ ok: true });
}
