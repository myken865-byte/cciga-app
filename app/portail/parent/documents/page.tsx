import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLearnerPortalContext } from "@/lib/portal/learnerData";
import ChildSwitcher from "@/components/portal/ChildSwitcher";
import ChildDocumentsList from "@/components/portal/ChildDocumentsList";
import BackButton from "@/components/BackButton";
import ParentPortalBanner from "@/components/portal/ParentPortalBanner";
import ParentNavPills from "@/components/portal/ParentNavPills";
import { getParentPortalTheme } from "@/lib/parentPortalTheme";
import type { SchoolKey } from "@/lib/institutions";

export const metadata: Metadata = { title: "Documents" };
export const dynamic = "force-dynamic";

const docTypeLabel: Record<string, string> = {
  bulletin_periode: "Bulletin périodique",
  bulletin_annuel: "Bulletin annuel",
  releve_semestre: "Relevé de semestre",
};

// Mandat "Finalisation portail Parent" (2026-09-12) — même aggrégateur et
// mêmes routes PDF que le portail élève/étudiant (app/portail/etudiant/documents/page.tsx),
// simplement appelé pour l'enfant sélectionné. Les routes badge/carnet/fiche/
// attestation ont chacune reçu une branche parent dédiée (lib/parentAccess.ts)
// avant cette mission — un parent qui ouvre ces liens est donc bien autorisé
// côté serveur, pas seulement caché côté UI.
export default async function ParentDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ enfant?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const children = await prisma.user.findMany({
    where: { parentId: session.userId },
    orderBy: { name: "asc" },
  });

  if (children.length === 0) {
    return (
      <div>
        <BackButton fallbackHref="/portail/parent" />
        <h1 className="mb-6 text-2xl font-bold text-foreground">Documents</h1>
        <p className="empty-state">Aucun enfant lié à votre compte pour le moment.</p>
      </div>
    );
  }

  const { enfant } = await searchParams;
  const requestedId = enfant ? Number(enfant) : null;
  const selected = (requestedId && children.find((c) => c.id === requestedId)) || children[0];

  const ctx = await getLearnerPortalContext(selected.id);
  if (!ctx) notFound();
  const { user, badge, enrollmentForm, enrollmentFormKind, documents, requests } = ctx;
  const theme = getParentPortalTheme((user.program?.school as SchoolKey | undefined) ?? null, user.program?.niveau ?? null);

  const fichePdfHref = enrollmentForm
    ? enrollmentFormKind === "classique"
      ? `/api/admin/inscriptions-ecole-classique/${enrollmentForm.id}/pdf`
      : `/api/admin/fiches-inscription/${enrollmentForm.id}/pdf`
    : null;

  const documentRows = [
    ...documents.map((d) => ({
      id: d.id,
      typeLabel: docTypeLabel[d.type] ?? d.type,
      href: `/api/documents/${d.id}/pdf`,
      linkLabel: "Voir le PDF",
    })),
    ...requests.all
      .filter((r) => r.documentUrl)
      .map((r) => ({
        id: r.id,
        typeLabel: r.subject,
        href: `/api/student-requests/${r.id}/file?type=document`,
        linkLabel: r.documentName ?? "Voir le PDF",
      })),
  ];

  return (
    <div>
      <BackButton fallbackHref="/portail/parent" />
      <ParentPortalBanner theme={theme} childName={selected.name} />
      <ParentNavPills active="documents" childId={selected.id} />
      <h1 className="mb-2 text-2xl font-bold text-foreground">Documents</h1>
      <p className="mb-6 text-sm text-muted">Documents de {selected.name}.</p>

      <ChildSwitcher kids={children.map((c) => ({ id: c.id, name: c.name }))} selectedId={selected.id} basePath="/portail/parent/documents" />

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">Fiche d&apos;inscription</h2>
          {fichePdfHref ? (
            <a href={fichePdfHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              📄 Voir / Télécharger le PDF
            </a>
          ) : (
            <p className="empty-state">Aucune fiche d&apos;inscription rattachée pour le moment.</p>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">Badge</h2>
          {badge ? (
            <a href={`/api/badges/${badge.id}/pdf`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              🪪 Voir / Télécharger le PDF
            </a>
          ) : (
            <p className="empty-state">Aucun badge encore émis.</p>
          )}
        </div>
      </div>

      <div className="mb-4 card p-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">Carnet de paiement</h2>
        <a href={`/api/admin/carnet-paiement/${user.id}/pdf`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          🧾 Voir / Télécharger le PDF
        </a>
      </div>

      <div className="card p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">Bulletins, relevés, attestations et certificats</h2>
        <ChildDocumentsList documents={documentRows} />
      </div>
    </div>
  );
}
