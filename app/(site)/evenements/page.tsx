import type { Metadata } from "next";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Événements",
  description: "Le calendrier des événements du CCIGA.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export const dynamic = "force-dynamic";

export default async function EvenementsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Agenda
      </p>
      <h1 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">Événements</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.slug}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-semibold text-foreground">{event.title}</h3>
              <p className="text-sm text-muted">{event.description}</p>
              <p className="mt-1 text-xs text-muted">📍 {event.location}</p>
            </div>
            <span className="shrink-0 rounded-md bg-accent/20 px-3 py-1.5 text-sm font-semibold text-primary-dark">
              {formatDate(event.date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
