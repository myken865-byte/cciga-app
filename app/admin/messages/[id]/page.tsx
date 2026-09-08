import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import MarkMessageTreatedButton from "@/components/MarkMessageTreatedButton";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ChatIcon } from "@/components/icons";

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
    <AdminShell>
      <div className="mx-auto max-w-2xl">
        <BackButton fallbackHref="/admin/messages" label="Tous les messages" />

        <AdminTitleBand
          eyebrow="CCIGA — Messagerie"
          title={message.subject}
          trailing={
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                message.status === "traite" ? "bg-emerald-100 text-emerald-700" : "bg-white/15 text-white"
              }`}
            >
              {message.status === "traite" ? "Traité" : "Nouveau"}
            </span>
          }
        />

        <AdminCard icon={ChatIcon}>
          <p className="text-sm text-muted">
            {message.name} · {message.email}
          </p>
          <p className="mb-1 mt-1 text-xs text-muted">Reçu le {formatDate(message.createdAt)}</p>
          <p className="mt-4 whitespace-pre-wrap text-sm text-foreground">{message.body}</p>

          <div className="mt-6">
            <MarkMessageTreatedButton messageId={message.id} status={message.status} />
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
