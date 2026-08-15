import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

export default async function AdminDocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await prisma.academicDocument.findUnique({
    where: { id },
    include: {
      student: true,
      program: true,
      semester: { include: { academicYear: true } },
      supersededBy: true,
    },
  });
  if (!doc) notFound();

  const snapshot = JSON.parse(doc.snapshotData);

  const versions = await prisma.academicDocument.findMany({
    where: { documentGroupKey: doc.documentGroupKey },
    orderBy: { version: "asc" },
    include: { supersededBy: true },
  });

  const auditLogs = await prisma.auditLog.findMany({
    where: { entityType: "AcademicDocument", entityId: id },
    include: { actor: true },
    orderBy: { createdAt: "desc" },
  });

  const isCurrent = !doc.supersededBy;

  return (
    <div>
      <Link href="/admin/documents" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Bulletins et relevés
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-foreground">
        {doc.type === "releve_semestre" ? "Relevé" : "Bulletin"} — {doc.student.name}
      </h1>
      <p className="mb-6 text-sm text-muted">
        {doc.program.name} · {doc.semester ? `${doc.semester.academicYear.label} — ${doc.semester.name}` : "—"} ·
        Version {doc.version} {!isCurrent && <span className="text-amber-600">(remplacée)</span>}
      </p>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-3 font-semibold text-foreground">Résultats</h2>
          <p className="mb-2 text-sm text-muted">
            Moyenne :{" "}
            <span className="font-semibold text-foreground">
              {snapshot.average !== null ? Number(snapshot.average).toFixed(1) : "—"}/100
            </span>
          </p>
          <p className="mb-2 text-sm text-muted">Décision : {snapshot.decision}</p>
          {snapshot.rank !== null && snapshot.rank !== undefined && (
            <p className="mb-2 text-sm text-muted">Rang : {snapshot.rank}</p>
          )}
          <a
            href={`/api/documents/${doc.id}/pdf`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
          >
            Télécharger le PDF →
          </a>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-3 font-semibold text-foreground">Historique des versions</h2>
          <ul className="space-y-2 text-sm">
            {versions.map((v) => (
              <li key={v.id} className="flex items-center justify-between">
                <Link href={`/admin/documents/${v.id}`} className="text-primary hover:underline">
                  Version {v.version}
                </Link>
                <span className="text-muted">
                  {v.publishedAt ? formatDateTime(v.publishedAt) : "—"}
                  {v.supersededBy && " (remplacée)"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-3 font-semibold text-foreground">Journal d&apos;audit</h2>
        {auditLogs.length === 0 ? (
          <p className="text-sm text-muted">Aucune entrée pour ce document.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {auditLogs.map((log) => (
              <li key={log.id} className="border-t border-border pt-2">
                <span className="font-medium text-foreground">{log.action}</span>{" "}
                <span className="text-muted">
                  par {log.actor?.name ?? "—"} le {formatDateTime(log.createdAt)}
                </span>
                {log.reason && <p className="text-muted">Motif : {log.reason}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
