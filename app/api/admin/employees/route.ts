import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { writeAuditLog } from "@/lib/auditLog";
import { resolveActorId } from "@/lib/devBypass";
import { getActiveSchool } from "@/lib/institutionContext";

const typeContratValues = ["cdi", "cdd", "vacataire", "autre"];

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const school = await getActiveSchool();
  if (!school) {
    return NextResponse.json({ error: "Choisissez une institution avant de créer un profil employé." }, { status: 400 });
  }

  const { userId, fonction, departement, typeContrat, dateEntree, horaire } = (await request.json()) ?? {};

  const parsedUserId = Number(userId);
  if (
    !Number.isInteger(parsedUserId) ||
    !fonction ||
    typeof fonction !== "string" ||
    !fonction.trim() ||
    !departement ||
    typeof departement !== "string" ||
    !departement.trim() ||
    !dateEntree
  ) {
    return NextResponse.json(
      { error: "Compte, fonction, département et date d'entrée sont obligatoires." },
      { status: 400 },
    );
  }
  if (typeContrat && !typeContratValues.includes(typeContrat)) {
    return NextResponse.json({ error: "Type de contrat invalide." }, { status: 400 });
  }
  const entree = new Date(dateEntree);
  if (Number.isNaN(entree.getTime())) {
    return NextResponse.json({ error: "Date d'entrée invalide." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: parsedUserId } });
  if (!user) {
    return NextResponse.json({ error: "Compte introuvable." }, { status: 404 });
  }

  const existingProfile = await prisma.employee.findUnique({ where: { userId: parsedUserId } });
  if (existingProfile) {
    return NextResponse.json({ error: "Ce compte a déjà un profil employé." }, { status: 400 });
  }

  const employee = await prisma.employee.create({
    data: {
      userId: parsedUserId,
      fonction: fonction.trim(),
      departement: departement.trim(),
      typeContrat: typeContrat && typeContratValues.includes(typeContrat) ? typeContrat : "cdi",
      dateEntree: entree,
      horaire: typeof horaire === "string" && horaire.trim() ? horaire.trim() : null,
      school,
    },
  });

  await writeAuditLog({
    entityType: "Employee",
    entityId: employee.id,
    action: "create",
    actorId: resolveActorId(session.userId),
    after: employee,
  });

  return NextResponse.json({ id: employee.id }, { status: 201 });
}
