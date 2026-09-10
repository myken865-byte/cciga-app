import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatCarnetPaiementReference } from "@/lib/carnetPaiementReference";
import { formatEnrollmentFormReference } from "@/lib/enrollmentFormReference";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";
import { formatDocumentReference } from "@/lib/document-reference";
import { enrollmentFormStatusLabels, enrollmentFormStatusStyles, type EnrollmentFormStatus } from "@/lib/enrollmentFormStatus";
import { parseEnrollmentFormDocuments } from "@/lib/enrollmentFormDocuments";
import { parseClassicEnrollmentDocuments } from "@/lib/classicEnrollmentDocuments";
import { getActiveSchoolOrAll, schoolLabels } from "@/lib/institutionContext";
import type { SchoolKey } from "@/lib/institutions";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import GenerateBadgeButton from "@/components/GenerateBadgeButton";
import { UsersIcon, DocumentIcon, ClockIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

const badgeStatusLabels: Record<string, string> = {
  actif: "Actif",
  perdu: "Signalé perdu",
  remplace: "Remplacé",
  inactif: "Inactif",
  a_finaliser: "À finaliser",
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 break-words text-sm text-foreground">{value ?? "—"}</dd>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="empty-state text-sm">{children}</p>;
}

export default async function StudentDossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) notFound();

  // Même garde institution que le reste de /admin/* (proxy.ts) — mais un
  // accès direct par URL à un dossier d'une AUTRE institution que celle
  // active doit rester refusé même si l'utilisateur a le rôle requis (voir
  // isUserInSchoolScope ci-dessous), pas seulement bloqué en amont.
  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      program: true,
      badge: true,
      payments: { orderBy: { paidAt: "desc" } },
      academicDocuments: { orderBy: { generatedAt: "desc" }, take: 10 },
      enrollmentFormsAsCandidate: { orderBy: { updatedAt: "desc" }, take: 1, include: { program: true } },
      classicEnrollmentFormsAsCandidate: { orderBy: { updatedAt: "desc" }, take: 1, include: { program: true } },
    },
  });
  if (!user) notFound();
  if (!hasRole(parseRoles(user.roles), "STUDENT")) notFound();

  // Portée institutionnelle stricte (Phase C3, même principe que
  // /admin/users/[id]) : un dossier n'est jamais consultable en dehors de
  // l'institution active, même par accès direct à l'URL — sauf vue globale
  // ("toutes"), réservée SUPER_ADMIN en amont par proxy.ts.
  if (activeSchool !== "toutes" && user.program?.school !== activeSchool) notFound();

  const school = user.program?.school as SchoolKey | undefined;

  // Une seule fiche d'inscription "active" par élève dans les usages réels du
  // projet (École Professionnelle XOR École Classique) — on retient celle
  // mise à jour le plus récemment si, par construction du schéma, les deux
  // existaient (jamais le cas en pratique).
  const proForm = user.enrollmentFormsAsCandidate[0] ?? null;
  const classicForm = user.classicEnrollmentFormsAsCandidate[0] ?? null;
  const form =
    proForm && classicForm
      ? (proForm.updatedAt > classicForm.updatedAt ? { kind: "pro" as const, data: proForm } : { kind: "classic" as const, data: classicForm })
      : proForm
        ? { kind: "pro" as const, data: proForm }
        : classicForm
          ? { kind: "classic" as const, data: classicForm }
          : null;

  const formReference = form
    ? form.kind === "pro"
      ? formatEnrollmentFormReference(form.data.id)
      : formatClassicEnrollmentFormReference(form.data.id)
    : null;
  const formStatus = (form?.data.status ?? null) as EnrollmentFormStatus | null;
  const formDocuments = form
    ? form.kind === "pro"
      ? parseEnrollmentFormDocuments(form.data.documents)
      : parseClassicEnrollmentDocuments(form.data.documents)
    : [];

  const confirmedPayments = user.payments.filter((p) => p.status === "confirme");
  const totalPaid = confirmedPayments.reduce((sum, p) => sum + p.amount, 0);
  const tuitionFee = user.program?.tuitionFee ?? 0;
  const solde = tuitionFee > 0 ? tuitionFee - totalPaid : null;

  const historyEntityIds = [
    ["User", String(user.id)],
    user.badge ? ["Badge", user.badge.id] : null,
    form ? [form.kind === "pro" ? "EnrollmentForm" : "ClassicEnrollmentForm", form.data.id] : null,
  ].filter((x): x is [string, string] => x !== null);

  const history = await prisma.auditLog.findMany({
    where: { OR: historyEntityIds.map(([entityType, entityId]) => ({ entityType, entityId })) },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  const historyActionLabels: Record<string, string> = {
    create: "Création",
    update: "Mise à jour",
    status_change: "Changement de statut",
    auto_create: "Badge généré automatiquement",
    status_auto_reconcile: "Statut du badge réconcilié",
  };

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/users" />
      <AdminTitleBand eyebrow="CCIGA — Dossier élève / étudiant" title={user.name} />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Identité" icon={UsersIcon}>
          <dl className="grid grid-cols-2 gap-4">
            <Field
              label="Photo"
              value={
                user.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.photoUrl} alt={user.name} className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  "Aucune photo"
                )
              }
            />
            <Field label="Code CCIGA" value={<span className="font-mono">{formatCcigaId(user.id)}</span>} />
            <Field label="Nom" value={user.name} />
            <Field label="Email" value={user.email} />
            <Field label="Téléphone" value={user.phone} />
            <Field label="Statut du compte" value={user.active ? "Actif" : "Inactif / archivé"} />
          </dl>
        </AdminCard>

        <AdminCard title="Scolarité / Programme">
          {user.program ? (
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Institution" value={schoolLabels[school as SchoolKey] ?? user.program.school} />
              <Field label="Programme / filière" value={user.program.name} />
              <Field label="Niveau" value={user.program.niveau ?? user.program.level} />
              <Field label="Statut programme" value={user.program.active ? "Actif" : "Archivé"} />
            </dl>
          ) : (
            <Empty>Aucun programme rattaché pour le moment.</Empty>
          )}
        </AdminCard>

        <AdminCard title="Inscription">
          {form ? (
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Référence" value={<span className="font-mono">{formReference}</span>} />
              <Field
                label="Statut"
                value={
                  formStatus ? (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${enrollmentFormStatusStyles[formStatus]}`}>
                      {enrollmentFormStatusLabels[formStatus]}
                    </span>
                  ) : (
                    "—"
                  )
                }
              />
              <Field label="Filière (fiche)" value={form.data.program?.name ?? "—"} />
              <Field label="Déclaration acceptée" value={form.data.declarationAccepted ? "Oui" : "Non"} />
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Pièces fournies</dt>
                <dd className="mt-1 text-sm text-foreground">
                  {formDocuments.length === 0 ? (
                    "Aucune pièce enregistrée."
                  ) : (
                    <ul className="space-y-1">
                      {formDocuments.map((doc) => (
                        <li key={doc.label} className="flex items-center justify-between gap-2">
                          <span>{doc.label}</span>
                          <span className="text-xs text-muted">{doc.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            </dl>
          ) : (
            <Empty>Aucune fiche d&rsquo;inscription liée à ce compte.</Empty>
          )}
        </AdminCard>

        <AdminCard title="Badge & identification">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Code CCIGA" value={<span className="font-mono">{formatCcigaId(user.id)}</span>} />
            {user.badge ? (
              <>
                <Field label="Numéro de badge" value={<span className="font-mono">{user.badge.badgeNumber}</span>} />
                <Field label="Statut du badge" value={badgeStatusLabels[user.badge.status] ?? user.badge.status} />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Badge PDF</dt>
                  <dd className="mt-1">
                    <a href={`/api/badges/${user.badge.id}/pdf`} target="_blank" rel="noreferrer" className="btn-secondary inline-block text-xs">
                      Voir / Imprimer le badge
                    </a>
                  </dd>
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <Empty>Aucun badge généré pour le moment.</Empty>
                <div className="mt-2">
                  <GenerateBadgeButton userId={user.id} />
                </div>
              </div>
            )}
          </dl>
        </AdminCard>

        <AdminCard title="Paiements & carnet" className="lg:col-span-2">
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Field label="Référence carnet" value={<span className="font-mono">{formatCarnetPaiementReference(user.id)}</span>} />
            <Field label="Frais de scolarité" value={tuitionFee > 0 ? `${tuitionFee} HTG` : "Non disponible"} />
            <Field label="Total payé" value={`${totalPaid} HTG`} />
            <Field label="Solde" value={solde !== null ? `${solde} HTG` : "Non disponible"} />
          </div>
          <a href={`/api/admin/carnet-paiement/${user.id}/pdf`} target="_blank" rel="noreferrer" className="btn-secondary mb-4 inline-block text-sm">
            Carnet de paiement — Voir / PDF
          </a>
          {user.payments.length === 0 ? (
            <Empty>Aucun paiement enregistré.</Empty>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-background text-muted">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Date</th>
                    <th className="px-4 py-2 font-semibold">Montant</th>
                    <th className="px-4 py-2 font-semibold">Statut</th>
                    <th className="px-4 py-2 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {user.payments.map((p) => (
                    <tr key={p.id} className="border-t border-row-divider">
                      <td className="px-4 py-2 text-muted">{p.paidAt.toISOString().slice(0, 10)}</td>
                      <td className="px-4 py-2 font-semibold text-foreground">{p.amount} HTG</td>
                      <td className="px-4 py-2 text-muted">{p.status}</td>
                      <td className="px-4 py-2 text-muted">{p.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>

        <AdminCard title="Documents" icon={DocumentIcon} className="lg:col-span-2">
          {user.academicDocuments.length === 0 ? (
            <Empty>Aucun document généré pour le moment.</Empty>
          ) : (
            <ul className="space-y-2">
              {user.academicDocuments.map((doc) => (
                <li key={doc.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                  <span className="font-mono text-xs text-muted">
                    {formatDocumentReference(doc.id, doc.type === "releve_semestre" ? "releve_semestre" : "bulletin_periode")}
                  </span>
                  <span className="capitalize">{doc.type}</span>
                  <span className="text-muted">{doc.generatedAt.toISOString().slice(0, 10)}</span>
                  <a href={`/api/documents/${doc.id}/pdf`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    Voir le PDF
                  </a>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard title="Historique" icon={ClockIcon} className="lg:col-span-2">
          {history.length === 0 ? (
            <Empty>Aucun historique disponible.</Empty>
          ) : (
            <ul className="space-y-2 text-sm">
              {history.map((h) => (
                <li key={h.id} className="flex flex-wrap items-center gap-2 border-t border-row-divider pt-2 first:border-t-0 first:pt-0">
                  <span className="text-xs text-muted">{h.createdAt.toISOString().slice(0, 16).replace("T", " ")}</span>
                  <span className="font-semibold">{historyActionLabels[h.action] ?? h.action}</span>
                  <span className="text-muted">({h.entityType})</span>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>

      <p className="mt-6 text-xs text-muted">
        <Link href={`/admin/users/${user.id}`} className="hover:underline">
          ← Retour à la fiche du compte
        </Link>
      </p>
    </AdminShell>
  );
}
