import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";

export async function GET(request: Request) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ users: [], submissions: [] });
  }

  const [users, submissions] = await Promise.all([
    prisma.user.findMany({
      where: { OR: [{ name: { contains: q } }, { email: { contains: q } }, { phone: { contains: q } }] },
      orderBy: { name: "asc" },
      take: 8,
    }),
    prisma.admissionSubmission.findMany({
      where: {
        school: "ecole-classique",
        OR: [
          { firstName: { contains: q } },
          { lastName: { contains: q } },
          { email: { contains: q } },
          { phone: { contains: q } },
        ],
      },
      orderBy: { submittedAt: "desc" },
      take: 8,
    }),
  ]);

  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      dob: u.dob ? u.dob.toISOString().slice(0, 10) : null,
      address: u.address,
      photoUrl: u.photoUrl,
      ccigaId: formatCcigaId(u.id),
    })),
    submissions: submissions.map((s) => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      phone: s.phone,
      dob: s.dob,
      address: s.address,
      studentUserId: s.studentUserId,
    })),
  });
}
