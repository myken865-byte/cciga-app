import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EditEventForm from "@/components/EditEventForm";

export const dynamic = "force-dynamic";

export default async function AdminEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div>
      <Link href="/admin/events" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les événements
      </Link>
      <div className="mx-auto max-w-xl">
        <EditEventForm
          id={event.id}
          initialTitle={event.title}
          initialDate={event.date.toISOString().slice(0, 10)}
          initialLocation={event.location}
          initialDescription={event.description}
        />
      </div>
    </div>
  );
}
