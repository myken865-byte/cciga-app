import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createNotification } from "@/lib/notifications";
import { formatCcigaId } from "@/lib/cciga-id";

/**
 * Mission "Inscription unifiée — Phase 1" (2026-09-12), §11/§12 — logique
 * extraite de app/api/admin/admissions/[id]/create-account/route.ts (seule
 * route de conversion existante avant cette mission) pour être réutilisée
 * telle quelle par les fiches EnrollmentForm/ClassicEnrollmentForm — NO REDO :
 * même comportement, même anti-double-création (email d'abord), pas de
 * logique nouvelle inventée.
 */

export interface StudentAccountInput {
  firstName: string;
  lastName: string;
  email: string | null;
  phone?: string | null;
  programId?: string | null;
  /**
   * Mission "Portail Secrétariat — Phase P1" (2026-09-13), objectif A —
   * meilleure photo disponible au moment de la création/liaison du compte
   * (déjà résolue par l'appelant via lib/enrollmentContinuity.ts). Jamais
   * écrasée si le compte a déjà une photo (§6 : "ne jamais écraser une
   * photo plus récente avec une ancienne").
   */
  photoUrl?: string | null;
}

export interface StudentAccountResult {
  userId: number;
  created: boolean;
  temporaryPassword?: string;
}

/**
 * Cherche un compte existant AVANT d'en créer un nouveau (§12) — email
 * d'abord (identifiant le plus fiable, unique en base), puis téléphone à
 * défaut. Un nom seul n'est jamais suffisant pour lier automatiquement
 * (risque d'homonymie) — dans ce cas seulement, un nouveau compte est créé.
 */
export async function resolveOrCreateStudentAccount(input: StudentAccountInput): Promise<StudentAccountResult> {
  let existing = null as Awaited<ReturnType<typeof prisma.user.findUnique>> | null;

  if (input.email) {
    existing = await prisma.user.findUnique({ where: { email: input.email } });
  }
  if (!existing && input.phone) {
    existing = await prisma.user.findFirst({ where: { phone: input.phone } });
  }

  if (existing) {
    const fillProgramId = input.programId && !existing.programId ? input.programId : undefined;
    const fillPhotoUrl = input.photoUrl && !existing.photoUrl ? input.photoUrl : undefined;
    if (fillProgramId || fillPhotoUrl) {
      await prisma.user.update({
        where: { id: existing.id },
        data: { programId: fillProgramId, photoUrl: fillPhotoUrl },
      });
    }
    await createNotification(existing.id, {
      type: "welcome",
      title: "Dossier d'inscription validé",
      body: `Votre dossier a été validé et lié à votre compte CCIGA ID ${formatCcigaId(existing.id)}.`,
    });
    return { userId: existing.id, created: false };
  }

  if (!input.email) {
    throw new Error("Un email est requis pour créer un nouveau compte étudiant.");
  }

  const temporaryPassword = randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  const user = await prisma.user.create({
    data: {
      name: `${input.firstName} ${input.lastName}`.trim(),
      email: input.email,
      passwordHash,
      roles: JSON.stringify(["STUDENT"]),
      programId: input.programId || undefined,
      photoUrl: input.photoUrl || undefined,
    },
  });

  await createNotification(user.id, {
    type: "welcome",
    title: "Bienvenue sur CCIGA",
    body: `Votre dossier a été validé. Votre compte CCIGA ID ${formatCcigaId(user.id)} est actif.`,
  });

  return { userId: user.id, created: true, temporaryPassword };
}
