import { getEvents } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateEventForm from "@/components/CreateEventForm";

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
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Contenu du site</h1>
      <ContentSubNav />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface lg:col-span-2">
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
                <tr key={event.id} className="border-t border-border">
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

        <CreateEventForm />
      </div>
    </div>
  );
}
