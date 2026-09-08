import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";

// Mandat "Mise en état opérationnel" (2026-09-06) : EditProgramForm.tsx
// appelle déjà cette route (toggle archiver/réactiver, attend { active } en
// retour) mais elle n'a jamais existé côté serveur — bouton mort en
// production. Program.active existe déjà dans le schéma exactement pour cet
// usage ; aucune donnée n'est jamais supprimée ici, seulement basculée.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const program = await prisma.program.findUnique({ where: { id } });
  if (!program) {
    return NextResponse.json({ error: "Programme introuvable." }, { status: 404 });
  }

  const updated = await prisma.program.update({
    where: { id },
    data: { active: !program.active },
  });

  await writeAuditLog({
    entityType: "Program",
    entityId: id,
    action: "status_change",
    actorId: resolveActorId(session.userId),
    before: { active: program.active },
    after: { active: updated.active },
  });

  return NextResponse.json({ ok: true, active: updated.active });
}
