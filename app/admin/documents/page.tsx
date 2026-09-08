import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPrograms } from "@/lib/content";
import { computePeriodReadiness } from "@/lib/documents";
import GenerateDocumentsPanel from "@/components/GenerateDocumentsPanel";
import PreviewDocumentButton from "@/components/PreviewDocumentButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ClipboardIcon, DocumentIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ programId?: string; semesterId?: string }>;
}) {
  const { programId, semesterId } = await searchParams;

  const [allPrograms, semesters, recentDocs] = await Promise.all([
    getPrograms(),
    prisma.semester.findMany({ include: { academicYear: true }, orderBy: { order: "asc" } }),
    prisma.academicDocument.findMany({
      include: { student: true, program: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);
  const programs = allPrograms.filter((p) => p.school === "universite" || p.school === "ecole-classique");

  const selectedProgramId = programId && semesterId ? programId : null;
  const selectedSemesterId = programId && semesterId ? semesterId : null;
  const readiness =
    selectedProgramId && selectedSemesterId
      ? await computePeriodReadiness(selectedProgramId, selectedSemesterId)
      : null;
  const readyCount = readiness?.filter((r) => r.ready).length ?? 0;

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Documents académiques" title="Bulletins et relevés" />

      <AdminCard className="mb-6" title="Sélection" icon={ClipboardIcon}>
        <form method="get" className="grid gap-2 sm:grid-cols-3">
          <select name="programId" defaultValue={programId ?? ""} className="input">
            <option value="">Choisir un programme…</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select name="semesterId" defaultValue={semesterId ?? ""} className="input">
            <option value="">Choisir une période…</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.academicYear.label} — {s.name}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background">
            Afficher
          </button>
        </form>
      </AdminCard>

      {readiness && (
        <AdminCard className="mb-6" title="État de préparation" icon={ClipboardIcon}>
          <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Étudiant</th>
                  <th className="px-4 py-3 font-semibold">État</th>
                  <th className="px-4 py-3 font-semibold">Détail</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {readiness.map((r) => (
                  <tr key={r.studentId} className="border-t border-row-divider">
                    <td className="px-4 py-3 text-foreground">{r.studentName}</td>
                    <td className="px-4 py-3">
                      {r.hasDocument ? (
                        <span className="text-muted">Document déjà généré</span>
                      ) : r.ready ? (
                        <span className="font-semibold text-emerald-600">Prêt</span>
                      ) : (
                        <span className="font-semibold text-amber-600">Incomplet</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {r.missing.length > 0
                        ? `${r.missing.length} note(s) manquante(s)`
                        : r.hasUnpublishedGrades
                          ? "Notes non publiées"
                          : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <PreviewDocumentButton
                        programId={selectedProgramId!}
                        semesterId={selectedSemesterId!}
                        studentId={r.studentId}
                      />
                    </td>
                  </tr>
                ))}
                {readiness.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-muted">
                      Aucun étudiant inscrit à ce programme.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {selectedProgramId && selectedSemesterId && (
            <GenerateDocumentsPanel programId={selectedProgramId} semesterId={selectedSemesterId} readyCount={readyCount} />
          )}
          </div>
        </AdminCard>
      )}

      <AdminCard title="Documents générés récemment" icon={DocumentIcon}>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Étudiant</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Version</th>
              <th className="px-4 py-3 font-semibold">Publié le</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentDocs.map((doc) => (
              <tr key={doc.id} className="border-t border-row-divider">
                <td className="px-4 py-3 text-foreground">{doc.student.name}</td>
                <td className="px-4 py-3 text-muted">{doc.program.name}</td>
                <td className="px-4 py-3 text-muted">
                  {doc.type === "releve_semestre" ? "Relevé" : "Bulletin"}
                </td>
                <td className="px-4 py-3 text-muted">v{doc.version}</td>
                <td className="px-4 py-3 text-muted">
                  {doc.publishedAt
                    ? doc.publishedAt.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/documents/${doc.id}`} className="text-primary hover:underline">
                    Détail →
                  </Link>
                </td>
              </tr>
            ))}
            {recentDocs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  Aucun document généré pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </AdminCard>
    </AdminShell>
  );
}
