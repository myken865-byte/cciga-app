import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { parseRoles, hasRole } from "@/lib/roles";
import { ensureBadgeForUser } from "@/lib/badgeAuto";

// Appelé par components/GenerateBadgesBulkButton.tsx — applique
// ensureBadgeForUser (lib/badgeAuto.ts) à chaque élève/étudiant du programme,
// sans jamais dupliquer sa logique de statut ni de numérotation.
export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { programId } = (await request.json().catch(() => ({}))) as { programId?: unknown };
  if (typeof programId !== "string" || !programId) {
    return NextResponse.json({ error: "Programme requis." }, { status: 400 });
  }

  const program = await prisma.program.findUnique({ where: { id: programId } });
  if (!program) {
    return NextResponse.json({ error: "Programme introuvable." }, { status: 404 });
  }

  const students = (await prisma.user.findMany({ where: { programId } })).filter((u) =>
    hasRole(parseRoles(u.roles), "STUDENT"),
  );

  let created = 0;
  for (const student of students) {
    const existing = await prisma.badge.findUnique({ where: { userId: student.id } });
    const badge = await ensureBadgeForUser(student.id, session.userId);
    if (badge && !existing) created += 1;
  }

  return NextResponse.json({ ok: true, total: students.length, created });
}
