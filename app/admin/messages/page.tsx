import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ChatIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";
import MessagesTable from "@/components/admin/MessagesTable";

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
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — Correspondance"
        title="Messages"
        trailing={
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
        }
      />

      <AdminCard title="Boîte de réception" icon={ChatIcon}>
        <MessagesTable
          messages={messages.map((m) => ({
            id: m.id,
            name: m.name,
            subject: m.subject,
            email: m.email,
            body: m.body,
            status: m.status,
            createdAtLabel: formatDate(m.createdAt),
          }))}
        />
      </AdminCard>
    </AdminShell>
  );
}
