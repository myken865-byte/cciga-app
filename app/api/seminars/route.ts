import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isSeminarStaff } from "@/lib/seminarAccess";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { isSchoolKey } from "@/lib/institutions";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { notifySchoolStudents } from "@/lib/notifications";

// Création d'un séminaire par le personnel — school vient de l'institution
// active de l'agent, jamais d'un champ libre envoyé par le client (mandat
// §4, Phase 9 §6).
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session || !isSeminarStaff(session)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool || activeSchool === "toutes" || !isSchoolKey(activeSchool)) {
    return NextResponse.json(
      { error: "Choisissez une institution précise (pas « toutes ») avant de créer un séminaire." },
      { status: 400 },
    );
  }

  const { title, theme, speaker, location, startAt, endAt } = (await request.json().catch(() => null)) ?? {};

  const startAtObj = typeof startAt === "string" ? new Date(startAt) : null;
  const endAtObj = typeof endAt === "string" && endAt ? new Date(endAt) : null;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    !startAtObj ||
    Number.isNaN(startAtObj.getTime()) ||
    (endAtObj && Number.isNaN(endAtObj.getTime()))
  ) {
    return NextResponse.json({ error: "Champs requis manquants ou invalides." }, { status: 400 });
  }

  const activeYear = await prisma.academicYear.findFirst({ where: { isActive: true } });

  const created = await prisma.seminar.create({
    data: {
      title: title.trim(),
      theme: typeof theme === "string" && theme.trim() ? theme.trim() : undefined,
      speaker: typeof speaker === "string" && speaker.trim() ? speaker.trim() : undefined,
      location: typeof location === "string" && location.trim() ? location.trim() : undefined,
      startAt: startAtObj,
      endAt: endAtObj ?? undefined,
      school: activeSchool,
      academicYearId: activeYear?.id,
      createdById: resolveActorId(session.userId) ?? undefined,
    },
  });

  await writeAuditLog({
    entityType: "Seminar",
    entityId: created.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: { id: created.id, title: title.trim(), school: activeSchool },
  });

  await notifySchoolStudents(activeSchool, {
    type: "seminar_open",
    title: "Nouveau séminaire",
    body: `"${title.trim()}" — inscriptions ouvertes.`,
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
