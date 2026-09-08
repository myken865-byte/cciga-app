import { getEvents } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateEventForm from "@/components/CreateEventForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { CalendarIcon } from "@/components/icons";

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
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Titre</th>
                  <th className="px-4 py-3 font-semibold">Lieu</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-t border-row-divider">
                    <td className="px-4 py-3 text-foreground">{event.title}</td>
                    <td className="px-4 py-3 text-muted">{event.location}</td>
                    <td className="px-4 py-3 text-muted">{formatDate(event.date)}</td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted">
                      Aucun événement pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <CreateEventForm />
      </div>
    </AdminShell>
  );
}
