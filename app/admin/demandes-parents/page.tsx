import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { parentRequestServices, parentRequestServiceRoles } from "@/lib/parentRequests";
import ParentRequestList, { type ParentRequestSummary } from "@/components/ParentRequestList";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ChatIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = { title: "Demandes des parents" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AdminDemandesParentsPage() {
  const session = await getSession();

  // Chaque rôle ne gère que certains services (voir proxy.ts) — la page
  // narrowe ici la liste à ce que le rôle de l'agent connecté couvre
  // réellement, ADMIN/SUPER_ADMIN étant inclus dans tous les services.
  const allowedServices = session
    ? parentRequestServices.filter((service) => hasAnyRole(session.roles, parentRequestServiceRoles[service]))
    : [];

  const requests = allowedServices.length
    ? await prisma.parentRequest.findMany({
        where: { service: { in: allowedServices } },
        include: { student: true },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  const summaries: ParentRequestSummary[] = requests.map((r) => ({
    id: r.id,
    subject: r.subject,
    category: r.category,
    status: r.status,
    updatedAt: formatDate(r.updatedAt),
    studentName: r.student.name,
  }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Guichet institutionnel" title="Demandes des parents" />
      <p className="mb-6 text-sm text-muted">
        Guichet numérique — demandes routées vers votre service.
      </p>
      <AdminCard title="Demandes reçues" icon={ChatIcon}>
        <ParentRequestList requests={summaries} basePath="/admin/demandes-parents" />
      </AdminCard>
    </AdminShell>
  );
}
