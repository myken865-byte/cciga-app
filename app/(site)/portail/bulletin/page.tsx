import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { getSchoolBySlug } from "@/lib/content";

export const metadata: Metadata = { title: "Bulletin" };

export const dynamic = "force-dynamic";

export default async function BulletinPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string }>;
}) {
  const { student: studentParam } = await searchParams;
  const session = await getSession();

  let targetId: number | null = null;
  if (session) {
    const requestedId = studentParam ? Number(studentParam) : session.userId;
    if (requestedId === session.userId) {
      targetId = requestedId;
    } else if (hasRole(session.roles, "ADMIN")) {
      targetId = requestedId;
    } else if (hasRole(session.roles, "PARENT")) {
      const child = await prisma.user.findFirst({
        where: { id: requestedId, parentId: session.userId },
      });
      if (child) targetId = requestedId;
    }
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center lg:px-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Bulletin</h1>
        <p className="text-muted">
          Connectez-vous à votre compte CCIGA ID pour consulter un bulletin.
        </p>
        <Link href="/login" className="mt-4 inline-block text-primary hover:underline">
          Se connecter →
        </Link>
      </div>
    );
  }

  if (targetId === null) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center lg:px-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Bulletin</h1>
        <p className="text-muted">
          Vous n&apos;avez pas accès à ce bulletin. Seul l&apos;élève concerné, ses parents liés
          ou l&apos;administration peuvent le consulter.
        </p>
      </div>
    );
  }

  const [student, grades] = await Promise.all([
    prisma.user.findUnique({ where: { id: targetId }, include: { program: true } }),
    prisma.grade.findMany({
      where: { studentId: targetId },
      include: { course: true, assignment: true },
      orderBy: { recordedAt: "asc" },
    }),
  ]);

  if (!student) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center lg:px-6">
        <p className="text-muted">Élève introuvable.</p>
      </div>
    );
  }

  const school = student.program ? getSchoolBySlug(student.program.school) : undefined;

  const byCourse = new Map<string, { name: string; grades: typeof grades }>();
  for (const g of grades) {
    const entry = byCourse.get(g.courseId) ?? { name: g.course.name, grades: [] };
    entry.grades.push(g);
    byCourse.set(g.courseId, entry);
  }
  const courseSummaries = Array.from(byCourse.values()).map((c) => ({
    ...c,
    average: c.grades.reduce((sum, g) => sum + g.score, 0) / c.grades.length,
  }));
  const overallAverage =
    grades.length > 0 ? grades.reduce((sum, g) => sum + g.score, 0) / grades.length : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Bulletin</p>
      <h1 className="mb-1 text-2xl font-bold text-foreground lg:text-3xl">{student.name}</h1>
      <p className="mb-8 text-sm text-muted">
        {formatCcigaId(student.id)}
        {student.program && (
          <>
            {" · "}
            {student.program.name} — {school?.name ?? student.program.school}
          </>
        )}
      </p>

      {courseSummaries.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-muted">
          Aucune note enregistrée pour le moment.
        </p>
      ) : (
        <>
          <div className="mb-6 rounded-lg border border-border bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Moyenne générale
            </p>
            <p className="text-2xl font-bold text-primary">
              {overallAverage !== null ? overallAverage.toFixed(1) : "—"}/100
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Cours</th>
                  <th className="px-4 py-3 font-semibold">Notes</th>
                  <th className="px-4 py-3 font-semibold">Moyenne</th>
                </tr>
              </thead>
              <tbody>
                {courseSummaries.map((c) => (
                  <tr key={c.name} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-muted">
                      {c.grades
                        .map((g) => `${g.score}${g.assignment ? ` (${g.assignment.title})` : ""}`)
                        .join(", ")}
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">
                      {c.average.toFixed(1)}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
