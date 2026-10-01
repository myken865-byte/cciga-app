import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canAccessInternship, isInternshipStaff } from "@/lib/internshipAccess";
import BackButton from "@/components/BackButton";
import InternshipDetail, { type InternshipDetailData } from "@/components/InternshipDetail";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AdminStageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) notFound();

  const internship = await prisma.internship.findUnique({
    where: { id },
    include: { student: true, internalSupervisor: true, attendances: { orderBy: { date: "desc" } } },
  });
  if (!internship || !(await canAccessInternship(session, internship))) notFound();

  const canManage = isInternshipStaff(session);

  const detail: InternshipDetailData = {
    id: internship.id,
    title: internship.title,
    hostOrganization: internship.hostOrganization,
    hostAddress: internship.hostAddress,
    hostSupervisorName: internship.hostSupervisorName,
    hostSupervisorContact: internship.hostSupervisorContact,
    internalSupervisorName: internship.internalSupervisor?.name ?? null,
    startDate: formatDate(internship.startDate),
    endDate: internship.endDate ? formatDate(internship.endDate) : null,
    status: internship.status,
    evaluationScore: internship.evaluationScore,
    evaluationComment: internship.evaluationComment,
    student: { name: internship.student.name },
    attendances: internship.attendances.map((a) => ({ id: a.id, date: formatDate(a.date), status: a.status })),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
      <BackButton fallbackHref="/admin/stages" />
      <InternshipDetail internship={detail} canManage={canManage} />
    </div>
  );
}
