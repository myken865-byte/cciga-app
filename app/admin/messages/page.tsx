import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status === "nouveau" || status === "traite" ? status : undefined;

  const messages = await prisma.message.findMany({
    where: filter ? { status: filter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <div className="flex gap-2 text-xs font-semibold">
          <Link
            href="/admin/messages"
            className={`rounded-full px-3 py-1.5 ${
              !filter ? "bg-primary text-white" : "border border-border bg-surface text-muted"
            }`}
          >
            Tous
          </Link>
          <Link
            href="/admin/messages?status=nouveau"
            className={`rounded-full px-3 py-1.5 ${
              filter === "nouveau" ? "bg-primary text-white" : "border border-border bg-surface text-muted"
            }`}
          >
            Nouveaux
          </Link>
          <Link
            href="/admin/messages?status=traite"
            className={`rounded-full px-3 py-1.5 ${
              filter === "traite" ? "bg-primary text-white" : "border border-border bg-surface text-muted"
            }`}
          >
            Traités
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">De</th>
              <th className="px-4 py-3 font-semibold">Sujet</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Reçu le</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <td className="px-4 py-3 text-foreground">{m.name}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/messages/${m.id}`} className="text-primary hover:underline">
                    {m.subject}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      m.status === "traite" ? "bg-emerald-100 text-emerald-700" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {m.status === "traite" ? "Traité" : "Nouveau"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{formatDate(m.createdAt)}</td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  Aucun message pour ce filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
