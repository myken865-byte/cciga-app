import type { Metadata } from "next";
import Link from "next/link";
import PortalStub from "@/components/PortalStub";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";
import { prisma } from "@/lib/db";
import { getSchoolBySlug } from "@/lib/content";
import { hasSchedule, formatSchedule } from "@/lib/schedule";

export const metadata: Metadata = { title: "Portail Étudiant" };

export const dynamic = "force-dynamic";

export default async function PortailEtudiantPage() {
  const session = await getSession();

  const user = session
    ? await prisma.user.findUnique({ where: { id: session.userId }, include: { program: true } })
    : null;
  const school = user?.program ? getSchoolBySlug(user.program.school) : undefined;

  const payments = user
    ? await prisma.payment.aggregate({ where: { studentId: user.id }, _sum: { amount: true } })
    : null;
  const paid = payments?._sum.amount ?? 0;
  const fee = user?.program?.tuitionFee ?? 0;
  const balance = fee - paid;

  const courses = user?.programId
    ? await prisma.course.findMany({ where: { programId: user.programId }, include: { teacher: true } })
    : [];

  const scheduledCourses = courses
    .filter(hasSchedule)
    .sort((a, b) => (a.dayOfWeek! - b.dayOfWeek!) || a.startTime!.localeCompare(b.startTime!));

  return (
    <div>
      {user?.program && (
        <div className="mx-auto max-w-2xl px-4 pt-10 lg:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent">
                Mon programme
              </h2>
              <p className="font-semibold text-foreground">{user.program.name}</p>
              <p className="text-sm text-muted">
                {school?.name ?? user.program.school} · {user.program.level} · {user.program.duration}
              </p>
              <Link href="/portail/bulletin" className="mt-2 inline-block text-sm text-primary hover:underline">
                Voir mon bulletin →
              </Link>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent">
                Mes finances
              </h2>
              <p className="font-semibold text-foreground">
                Solde :{" "}
                <span className={balance > 0 ? "text-red-600" : "text-emerald-600"}>
                  {formatHTG(balance)}
                </span>
              </p>
              <p className="text-sm text-muted">
                Frais {formatHTG(fee)} · Payé {formatHTG(paid)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Mes cours
            </h2>
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucun cours publié pour votre programme pour le moment.</p>
            ) : (
              <ul className="space-y-2">
                {courses.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/portail/etudiant/cours/${c.id}`}
                      className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:border-primary"
                    >
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-muted">{c.teacher?.name ?? "Enseignant non assigné"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Mon emploi du temps
            </h2>
            {scheduledCourses.length === 0 ? (
              <p className="text-sm text-muted">Aucun horaire renseigné pour vos cours pour le moment.</p>
            ) : (
              <ul className="space-y-2">
                {scheduledCourses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="text-muted">{formatSchedule(c)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <PortalStub
        title="Portail Étudiant"
        description="Accédez à votre emploi du temps, vos notes, vos devoirs et vos documents."
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
    </div>
  );
}
