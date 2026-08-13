import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import MarkMessageTreatedButton from "@/components/MarkMessageTreatedButton";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const message = await prisma.message.findUnique({ where: { id } });
  if (!message) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/messages" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les messages
      </Link>

      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{message.subject}</h1>
            <p className="text-sm text-muted">
              {message.name} · {message.email}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              message.status === "traite" ? "bg-emerald-100 text-emerald-700" : "bg-primary/10 text-primary"
            }`}
          >
            {message.status === "traite" ? "Traité" : "Nouveau"}
          </span>
        </div>
        <p className="mb-1 text-xs text-muted">Reçu le {formatDate(message.createdAt)}</p>
        <p className="mt-4 whitespace-pre-wrap text-sm text-foreground">{message.body}</p>

        <div className="mt-6">
          <MarkMessageTreatedButton messageId={message.id} status={message.status} />
        </div>
      </div>
    </div>
  );
}
