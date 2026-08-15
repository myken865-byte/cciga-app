import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Vérification de document" };

export const dynamic = "force-dynamic";

export default async function VerifyDocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await prisma.academicDocument.findUnique({
    where: { id },
    include: { student: true, program: true, semester: { include: { academicYear: true } }, supersededBy: true },
  });

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-14">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-lg font-bold text-white">
        CG
      </div>
      <h1 className="mb-6 mt-4 text-xl font-bold text-foreground">Vérification de document CCIGA</h1>

      {!doc ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Document introuvable. Ce document n&apos;est pas authentique ou n&apos;existe plus.
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-surface p-6 text-sm">
          <p className="mb-3 flex items-center gap-2 font-semibold text-emerald-600">
            ✅ Document authentique
          </p>
          <dl className="space-y-2">
            <div>
              <dt className="text-muted">Élève / Étudiant</dt>
              <dd className="font-medium text-foreground">{doc.student.name}</dd>
            </div>
            <div>
              <dt className="text-muted">Programme</dt>
              <dd className="font-medium text-foreground">{doc.program.name}</dd>
            </div>
            <div>
              <dt className="text-muted">Période</dt>
              <dd className="font-medium text-foreground">
                {doc.semester ? `${doc.semester.academicYear.label} — ${doc.semester.name}` : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Type</dt>
              <dd className="font-medium text-foreground">
                {doc.type === "releve_semestre" ? "Relevé de notes" : "Bulletin scolaire"}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Publié le</dt>
              <dd className="font-medium text-foreground">
                {doc.publishedAt
                  ? doc.publishedAt.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
                  : "—"}
              </dd>
            </div>
          </dl>
          {doc.supersededBy && (
            <p className="mt-4 rounded-md bg-amber-50 p-3 text-xs text-amber-700">
              Cette version a été remplacée par une version plus récente suite à une correction.
            </p>
          )}
        </div>
      )}
      <p className="mt-6 text-xs text-muted">
        Aucune note n&apos;est affichée ici — cette page confirme uniquement l&apos;authenticité du document.
      </p>
    </div>
  );
}
