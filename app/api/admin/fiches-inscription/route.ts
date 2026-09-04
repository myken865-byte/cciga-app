import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { resolveActorId } from "@/lib/devBypass";
import { writeAuditLog } from "@/lib/auditLog";
import { defaultEnrollmentFormDocuments } from "@/lib/enrollmentFormDocuments";
import { isSchoolKey } from "@/lib/institutions";

// Création d'une fiche d'inscription — le strict minimum (nom/prénoms,
// requis par le modèle Prisma) est saisi ici ; le reste se complète ensuite
// dans l'éditeur complet (EnrollmentFormEditor). Modèle EnrollmentForm
// partagé École Professionnelle / Université (champ `school` déjà prévu au
// schéma) — jamais un second moteur d'inscription, voir
// PROMPT_OFFICIEL_INSCRIPTION_UNIVERSITE_BADGE_AUTOMATIQUE.
export async function POST(request: Request) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    lastName?: string;
    firstName?: string;
    programId?: string | null;
    school?: string;
  };
  const lastName = (body.lastName ?? "").trim();
  const firstName = (body.firstName ?? "").trim();
  // École Professionnelle par défaut : préserve le comportement existant
  // pour tout appelant qui n'envoie pas encore `school` explicitement.
  const school = body.school === "universite" && isSchoolKey(body.school) ? body.school : "ecole-professionnelle";

  if (!lastName || !firstName) {
    return NextResponse.json({ error: "Nom et prénoms requis." }, { status: 400 });
  }

  const actorId = resolveActorId(session.userId);

  const form = await prisma.enrollmentForm.create({
    data: {
      school,
      lastName,
      firstName,
      programId: body.programId || undefined,
      documents: JSON.stringify(defaultEnrollmentFormDocuments()),
      createdById: actorId ?? undefined,
      updatedById: actorId ?? undefined,
    },
  });

  await writeAuditLog({
    entityType: "EnrollmentForm",
    entityId: form.id,
    action: "create",
    actorId,
    after: form,
  });

  return NextResponse.json({ ok: true, id: form.id });
}
