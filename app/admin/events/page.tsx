import { getEvents } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateEventForm from "@/components/CreateEventForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { CalendarIcon } from "@/components/icons";
import EventsTable from "@/components/admin/EventsTable";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Contenu du site" title="Contenu du site" />
      <ContentSubNav />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <AdminCard title="Événements" icon={CalendarIcon} className="overflow-hidden lg:col-span-2">
          <EventsTable
            events={events.map((event) => ({
              id: event.id,
              title: event.title,
              location: event.location,
              dateLabel: formatDate(event.date),
            }))}
          />
        </AdminCard>

        <CreateEventForm />
      </div>
    </AdminShell>
  );
}
