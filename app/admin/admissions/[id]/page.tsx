import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { prisma } from "@/lib/db";
import { getSchoolBySlug, getProgramBySlug } from "@/lib/content";
import { admissionStatusLabels, admissionStatusStyles, isAdmissionStatus } from "@/lib/admission-status";
import { normalizeAdmissionDocumentLabels } from "@/lib/admission-documents";
import { formatCcigaId } from "@/lib/cciga-id";
import StatusUpdateForm from "./StatusUpdateForm";
import CreateStudentAccountButton from "./CreateStudentAccountButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ClipboardIcon, DocumentIcon, ChatIcon } from "@/components/icons";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";

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
  const activeSchool = await getActiveSchoolOrAll();
  const submission = await prisma.admissionSubmission.findUnique({ where: { id } });
  // Non-croisement (Phase C3) : accès direct par ID à une candidature d'une
  // autre institution refusé — sauf vue globale ("toutes", réservée SUPER_ADMIN).
  if (!submission || !activeSchool) notFound();
  if (activeSchool !== "toutes" && submission.school !== activeSchool) notFound();

  const school = getSchoolBySlug(submission.school);
  const program = await getProgramBySlug(submission.programSlug);
  const documents = normalizeAdmissionDocumentLabels(submission.documents);
  const statusKey = isAdmissionStatus(submission.status) ? submission.status : "nouveau";

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/admissions" label="Toutes les candidatures" />

      <AdminTitleBand
        eyebrow={`CCIGA — Candidature ${submission.reference}`}
        title={`${submission.firstName} ${submission.lastName}`}
        trailing={
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${admissionStatusStyles[statusKey]}`}>
            {admissionStatusLabels[statusKey]}
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AdminCard title="Informations du candidat" icon={ClipboardIcon}>
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
          </AdminCard>

          <AdminCard title="Documents fournis" icon={DocumentIcon}>
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
          </AdminCard>

          {submission.adminNote && (
            <AdminCard title="Note interne actuelle" icon={ChatIcon}>
              <p className="text-sm text-muted">{submission.adminNote}</p>
            </AdminCard>
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
              <AdminCard title="Compte étudiant">
                <p className="font-mono text-sm text-primary">
                  {formatCcigaId(submission.studentUserId)}
                </p>
              </AdminCard>
            ) : (
              <CreateStudentAccountButton id={submission.id} />
            )
          )}
        </div>
      </div>
    </AdminShell>
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
