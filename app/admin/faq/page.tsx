import { getFaq } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateFaqForm from "@/components/CreateFaqForm";
import { AdminShell, AdminTitleBand, AdminCard, AdminTile } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { ChatIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const items = await getFaq();

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Contenu du site" title="Contenu du site" />
      <ContentSubNav />

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard title="Questions fréquentes" icon={ChatIcon} className="lg:col-span-2">
          <div className="space-y-3">
            {items.map((item) => (
              <AdminTile key={item.id}>
                <p className="font-medium text-foreground">{item.question}</p>
                <p className="mt-1 text-sm text-muted">{item.answer}</p>
              </AdminTile>
            ))}
            {items.length === 0 && (
              <p className="empty-state">Aucune question pour le moment.</p>
            )}
          </div>
        </AdminCard>

        <CreateFaqForm />
      </div>
    </AdminShell>
  );
}
