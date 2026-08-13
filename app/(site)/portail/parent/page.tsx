import type { Metadata } from "next";
import PortalStub from "@/components/PortalStub";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatHTG } from "@/lib/currency";
import { prisma } from "@/lib/db";
import { getSchoolBySlug } from "@/lib/content";

export const metadata: Metadata = { title: "Portail Parent" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function PortailParentPage() {
  const session = await getSession();

  const children = session
    ? await prisma.user.findMany({ where: { parentId: session.userId }, include: { program: true } })
    : [];

  const childSummaries = await Promise.all(
    children.map(async (child) => {
      const [paidAgg, grades, absenceCount] = await Promise.all([
        prisma.payment.aggregate({ where: { studentId: child.id }, _sum: { amount: true } }),
        prisma.grade.findMany({
          where: { studentId: child.id },
          include: { course: true, assignment: true },
          orderBy: { recordedAt: "desc" },
          take: 5,
        }),
        prisma.attendance.count({ where: { studentId: child.id, status: "absent" } }),
      ]);
      const paid = paidAgg._sum.amount ?? 0;
      const fee = child.program?.tuitionFee ?? 0;
      return { child, paid, fee, balance: fee - paid, grades, absenceCount };
    }),
  );

  return (
    <div>
      {session && (
        <div className="mx-auto max-w-2xl px-4 pt-10 lg:px-6">
          {childSummaries.length === 0 ? (
            <div className="rounded-lg border border-border bg-surface p-6 text-center text-sm text-muted">
              Aucun enfant n&apos;est encore lié à votre compte. Contactez
              l&apos;administration du CCIGA pour établir ce lien.
            </div>
          ) : (
            <div className="space-y-6">
              {childSummaries.map(({ child, paid, fee, balance, grades, absenceCount }) => {
                const school = child.program ? getSchoolBySlug(child.program.school) : undefined;
                return (
                  <div key={child.id} className="rounded-lg border border-border bg-surface p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-bold text-foreground">{child.name}</h2>
                      <span className="font-mono text-sm text-muted">{formatCcigaId(child.id)}</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                          Programme
                        </p>
                        {child.program ? (
                          <>
                            <p className="font-medium text-foreground">{child.program.name}</p>
                            <p className="text-sm text-muted">{school?.name ?? child.program.school}</p>
                          </>
                        ) : (
                          <p className="text-sm text-muted">Aucun programme</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                          Finances
                        </p>
                        <p className={`font-medium ${balance > 0 ? "text-red-600" : "text-emerald-600"}`}>
                          Solde {formatHTG(balance)}
                        </p>
                        <p className="text-sm text-muted">
                          Frais {formatHTG(fee)} · Payé {formatHTG(paid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                          Présence
                        </p>
                        <p className="font-medium text-foreground">{absenceCount} absence(s)</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                        Notes récentes
                      </p>
                      {grades.length === 0 ? (
                        <p className="text-sm text-muted">Aucune note enregistrée pour le moment.</p>
                      ) : (
                        <ul className="space-y-1 text-sm">
                          {grades.map((g) => (
                            <li key={g.id} className="flex items-center justify-between">
                              <span className="text-foreground">
                                {g.course.name}
                                {g.assignment ? ` — ${g.assignment.title}` : ""}
                              </span>
                              <span className="flex items-center gap-2 text-muted">
                                <span className="font-semibold text-primary">{g.score}/100</span>
                                {formatDate(g.recordedAt)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <PortalStub
        title="Portail Parent"
        description="Suivez la présence, les résultats et les finances de votre enfant."
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
    </div>
  );
}
