import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import BackButton from "@/components/BackButton";
import PrintBadgeButton from "@/components/PrintBadgeButton";
import { getActiveSchool } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

export default async function PrintBadgePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activeSchool = await getActiveSchool();
  const badge = await prisma.badge.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true } } },
  });
  // Non-croisement (Phase C3) : un accès direct par ID à un badge d'une autre
  // institution (ou non attribué — cas AMBIGU de Phase C2) est refusé, comme
  // s'il n'existait pas.
  if (!badge || !activeSchool || badge.school !== activeSchool) notFound();

  return (
    <div>
      <BackButton fallbackHref="/admin/badges" className="print:hidden" />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h1 className="text-2xl font-bold text-foreground">Badge — {badge.user.name}</h1>
        <PrintBadgeButton />
      </div>
      <div className="mx-auto max-w-3xl">
        <iframe
          src={`/api/badges/${badge.id}/pdf`}
          title={`Badge de ${badge.user.name}`}
          className="h-[80vh] w-full rounded-lg border border-border"
        />
      </div>
    </div>
  );
}
