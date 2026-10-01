import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isAnyStudentRequestStaff } from "@/lib/studentRequestAccess";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import StudentRequestList, { type StudentRequestSummary } from "@/components/StudentRequestList";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ChatIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = { title: "Demandes des étudiants" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AdminDemandesEtudiantsPage() {
  const session = await getSession();
  const authorized = session && isAnyStudentRequestStaff(session);
  const activeSchool = authorized ? await getActiveSchoolOrAll() : null;

  // Non-croisement institutionnel — même garde que canAccessStudentRequest
  // (lib/studentRequestAccess.ts), appliqué ici au niveau de la liste pour
  // qu'une institution ne voie jamais les demandes d'une autre.
  const requests =
    authorized && activeSchool
      ? await prisma.studentRequest.findMany({
          where: activeSchool === "toutes" ? {} : { student: { program: { school: activeSchool } } },
          include: { student: true },
          orderBy: { updatedAt: "desc" },
        })
      : [];

  const summaries: StudentRequestSummary[] = requests.map((r) => ({
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
      <AdminTitleBand eyebrow="CCIGA — Guichet institutionnel" title="Demandes des étudiants" />
      <p className="mb-6 text-sm text-muted">Demandes administratives soumises directement par les élèves/étudiants.</p>
      <AdminCard title="Demandes reçues" icon={ChatIcon}>
        <StudentRequestList requests={summaries} basePath="/admin/demandes-etudiants" />
      </AdminCard>
    </AdminShell>
  );
}
