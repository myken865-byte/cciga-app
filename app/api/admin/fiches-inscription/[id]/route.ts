import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { resolveActorId } from "@/lib/devBypass";
import { writeAuditLog } from "@/lib/auditLog";
import { isEnrollmentFormStatus } from "@/lib/enrollmentFormStatus";
import { parseEnrollmentFormDocuments } from "@/lib/enrollmentFormDocuments";
import { ensureBadgeForUser } from "@/lib/badgeAuto";

// Sauvegarde de la fiche d'inscription École Professionnelle depuis
// EnrollmentFormEditor (bouton "Enregistrer", changement de statut, mise à
// jour des pièces). Le composant envoie l'objet fiche complet (spread) : on
// ne reprend que les colonnes réellement gérées ici — jamais `id`/`reference`
// (dérivée, jamais stockée) et jamais `photoUrl` (géré par la route dédiée
// [id]/photo, pour ne jamais écraser une photo par une sauvegarde concurrente).
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.enrollmentForm.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  function str(key: string, current: string | null): string | null {
    const value = body[key];
    return typeof value === "string" ? value : current;
  }

  const status = typeof body.status === "string" && isEnrollmentFormStatus(body.status) ? body.status : existing.status;

  const documents =
    typeof body.documents === "string" ? JSON.stringify(parseEnrollmentFormDocuments(body.documents)) : existing.documents;

  const declarationAccepted =
    typeof body.declarationAccepted === "boolean" ? body.declarationAccepted : existing.declarationAccepted;
  const declarationDate = declarationAccepted ? (existing.declarationAccepted ? existing.declarationDate : new Date()) : null;

  const studentUserId =
    typeof body.studentUserId === "number" || body.studentUserId === null ? (body.studentUserId as number | null) : existing.studentUserId;

  const actorId = resolveActorId(session.userId);

  const updated = await prisma.enrollmentForm.update({
    where: { id },
    data: {
      status,
      programId: typeof body.programId === "string" || body.programId === null ? ((body.programId as string | null) || null) : existing.programId,
      lastName: str("lastName", existing.lastName) ?? existing.lastName,
      firstName: str("firstName", existing.firstName) ?? existing.firstName,
      birthDateAndPlace: str("birthDateAndPlace", existing.birthDateAndPlace),
      sex: str("sex", existing.sex),
      fatherName: str("fatherName", existing.fatherName),
      motherName: str("motherName", existing.motherName),
      familyStatus: str("familyStatus", existing.familyStatus),
      cin: str("cin", existing.cin),
      cinIssuedDate: str("cinIssuedDate", existing.cinIssuedDate),
      cinIssuedPlace: str("cinIssuedPlace", existing.cinIssuedPlace),
      address: str("address", existing.address),
      phone: str("phone", existing.phone),
      email: str("email", existing.email),
      emergencyContactName: str("emergencyContactName", existing.emergencyContactName),
      emergencyContactEmail: str("emergencyContactEmail", existing.emergencyContactEmail),
      emergencyContactPhone: str("emergencyContactPhone", existing.emergencyContactPhone),
      documents,
      declarationAccepted,
      declarationDate,
      inscriptionInfo: str("inscriptionInfo", existing.inscriptionInfo),
      uniformInfo: str("uniformInfo", existing.uniformInfo),
      versement1: str("versement1", existing.versement1),
      versement2: str("versement2", existing.versement2),
      versement3: str("versement3", existing.versement3),
      studentUserId,
      updatedById: actorId ?? undefined,
    },
  });

  await writeAuditLog({
    entityType: "EnrollmentForm",
    entityId: id,
    action: "update",
    actorId,
    before: existing,
    after: updated,
  });

  // Badge auto — même schéma que celui établi pour les autres parcours
  // d'inscription validée : jamais déclenché sans dossier élève lié.
  if (updated.status === "validee" && updated.studentUserId) {
    await ensureBadgeForUser(updated.studentUserId, actorId);
  }

  return NextResponse.json({ ok: true, form: updated });
}
