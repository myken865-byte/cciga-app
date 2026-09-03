import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { parseRoles, hasRole } from "@/lib/roles";

// "Candidat déjà connu de CCIGA App ?" (components/EnrollmentFormEditor.tsx
// `runLookup`) — recherche par nom, e-mail ou téléphone parmi les comptes
// élèves existants et les candidatures déjà soumises pour l'École
// Professionnelle, pour éviter la double saisie.
export async function GET(request: Request) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ users: [], submissions: [] });
  }

  const [candidateUsers, submissions] = await Promise.all([
    prisma.user.findMany({
      where: {
        active: true,
        OR: [{ name: { contains: q } }, { email: { contains: q } }, { phone: { contains: q } }],
      },
      take: 20,
    }),
    prisma.admissionSubmission.findMany({
      where: {
        school: "ecole-professionnelle",
        OR: [
          { firstName: { contains: q } },
          { lastName: { contains: q } },
          { email: { contains: q } },
          { phone: { contains: q } },
        ],
      },
      take: 5,
    }),
  ]);

  const users = candidateUsers
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .slice(0, 5)
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone ?? null,
      dob: u.dob ? u.dob.toISOString() : null,
      address: u.address ?? null,
      photoUrl: u.photoUrl ?? null,
      ccigaId: formatCcigaId(u.id),
    }));

  return NextResponse.json({
    users,
    submissions: submissions.map((s) => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      phone: s.phone,
      dob: s.dob ?? null,
      address: s.address ?? null,
      studentUserId: s.studentUserId ?? null,
    })),
  });
}
