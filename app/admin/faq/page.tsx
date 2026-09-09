import { getFaq } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateFaqForm from "@/components/CreateFaqForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { ChatIcon } from "@/components/icons";
import FaqList from "@/components/admin/FaqList";

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
          <FaqList items={items.map((item) => ({ id: item.id, question: item.question, answer: item.answer }))} />
        </AdminCard>

        <CreateFaqForm />
      </div>
    </AdminShell>
  );
}
