import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canManageSeminar } from "@/lib/seminarAccess";
import BackButton from "@/components/BackButton";
import SeminarDetail, { type SeminarDetailData } from "@/components/SeminarDetail";

export const dynamic = "force-dynamic";

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}

export default async function AdminSeminaireDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();

  const seminar = await prisma.seminar.findUnique({ where: { id }, include: { registrations: true } });
  if (!seminar || !(await canManageSeminar(session, seminar))) notFound();

  const detail: SeminarDetailData = {
    id: seminar.id,
    title: seminar.title,
    theme: seminar.theme,
    speaker: seminar.speaker,
    location: seminar.location,
    startAt: formatDateTime(seminar.startAt),
    endAt: seminar.endAt ? formatDateTime(seminar.endAt) : null,
    status: seminar.status,
    registrationOpen: seminar.registrationOpen,
    registrationCount: seminar.registrations.length,
    isRegistered: false,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/admin/seminaires" />
      <SeminarDetail seminar={detail} canManage canRegister={false} />
    </div>
  );
}
