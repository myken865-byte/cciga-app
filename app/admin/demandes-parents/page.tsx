import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole } from "@/lib/roles";
import { parentRequestServices, parentRequestServiceRoles } from "@/lib/parentRequests";
import ParentRequestList, { type ParentRequestSummary } from "@/components/ParentRequestList";

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
    <div>
      <h1 className="mb-1 text-2xl font-bold text-foreground">Demandes des parents</h1>
      <p className="mb-6 text-sm text-muted">
        Guichet numérique — demandes routées vers votre service.
      </p>
      <ParentRequestList requests={summaries} basePath="/admin/demandes-parents" />
    </div>
  );
}
