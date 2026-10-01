import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isSeminarStaff } from "@/lib/seminarAccess";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { isSchoolKey } from "@/lib/institutions";
import SeminarForm from "@/components/SeminarForm";
import SeminarList, { type SeminarSummary } from "@/components/SeminarList";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ChatIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = { title: "Séminaires" };

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}

export default async function AdminSeminairesPage() {
  const session = await getSession();
  const authorized = Boolean(session && isSeminarStaff(session));
  const activeSchool = authorized ? await getActiveSchoolOrAll() : null;
  const canCreate = Boolean(activeSchool && isSchoolKey(activeSchool));

  const seminars =
    authorized && activeSchool
      ? await prisma.seminar.findMany({
          where: activeSchool === "toutes" ? {} : { school: activeSchool },
          include: { registrations: true },
          orderBy: { startAt: "desc" },
        })
      : [];

  const summaries: SeminarSummary[] = seminars.map((s) => ({
    id: s.id,
    title: s.title,
    startAt: formatDateTime(s.startAt),
    status: s.status,
  }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Vie scolaire" title="Séminaires" />
      <p className="mb-6 text-sm text-muted">Organisez les séminaires institutionnels et suivez les inscriptions.</p>
      {canCreate ? (
        <div className="mb-6">
          <SeminarForm />
        </div>
      ) : (
        <div className="empty-state mb-6">Choisissez une institution précise (pas « toutes ») pour créer un séminaire.</div>
      )}
      <AdminCard title="Séminaires" icon={ChatIcon}>
        <SeminarList seminars={summaries} basePath="/admin/seminaires" />
      </AdminCard>
    </AdminShell>
  );
}
