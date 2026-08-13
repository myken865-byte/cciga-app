import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSchoolBySlug, getProgramBySlug } from "@/lib/content";
import { admissionStatusLabels, admissionStatusStyles, isAdmissionStatus } from "@/lib/admission-status";
import { formatCcigaId } from "@/lib/cciga-id";
import StatusUpdateForm from "./StatusUpdateForm";
import CreateStudentAccountButton from "./CreateStudentAccountButton";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await prisma.admissionSubmission.findUnique({ where: { id } });
  if (!submission) notFound();

  const school = getSchoolBySlug(submission.school);
  const program = await getProgramBySlug(submission.programSlug);
  const documents: string[] = JSON.parse(submission.documents || "[]");
  const statusKey = isAdmissionStatus(submission.status) ? submission.status : "nouveau";

  return (
    <div>
      <Link href="/admin/admissions" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Toutes les candidatures
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-sm text-muted">{submission.reference}</p>
          <h1 className="text-2xl font-bold text-foreground">
            {submission.firstName} {submission.lastName}
          </h1>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${admissionStatusStyles[statusKey]}`}>
          {admissionStatusLabels[statusKey]}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-4 font-semibold text-foreground">Informations du candidat</h2>
            <dl className="grid gap-4 sm:grid-cols-2 text-sm">
              <Field label="Email" value={submission.email} />
              <Field label="Téléphone" value={submission.phone} />
              <Field label="Date de naissance" value={submission.dob || "—"} />
              <Field label="Adresse" value={submission.address || "—"} />
              <Field label="École" value={school?.name ?? submission.school} />
              <Field label="Programme" value={program?.name ?? submission.programSlug} />
              <Field label="Soumis le" value={formatDate(submission.submittedAt)} />
              <Field label="Mis à jour le" value={formatDate(submission.updatedAt)} />
            </dl>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-4 font-semibold text-foreground">Documents fournis</h2>
            {documents.length === 0 ? (
              <p className="text-sm text-muted">Aucun document coché par le candidat.</p>
            ) : (
              <ul className="space-y-2 text-sm text-muted">
                {documents.map((doc) => (
                  <li key={doc} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {submission.adminNote && (
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-2 font-semibold text-foreground">Note interne actuelle</h2>
              <p className="text-sm text-muted">{submission.adminNote}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <StatusUpdateForm
            id={submission.id}
            currentStatus={statusKey}
            currentNote={submission.adminNote ?? ""}
          />

          {statusKey === "admis" && (
            submission.studentUserId ? (
              <div className="rounded-lg border border-border bg-surface p-6">
                <h2 className="mb-2 font-semibold text-foreground">Compte étudiant</h2>
                <p className="font-mono text-sm text-primary">
                  {formatCcigaId(submission.studentUserId)}
                </p>
              </div>
            ) : (
              <CreateStudentAccountButton id={submission.id} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
