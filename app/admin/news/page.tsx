import { getNews } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateNewsForm from "@/components/CreateNewsForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { DocumentIcon } from "@/components/icons";
import NewsTable from "@/components/admin/NewsTable";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Contenu du site" title="Contenu du site" />
      <ContentSubNav />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <AdminCard title="Actualités" icon={DocumentIcon} className="overflow-hidden lg:col-span-2">
          <NewsTable
            news={news.map((item) => ({
              id: item.id,
              title: item.title,
              category: item.category,
              dateLabel: formatDate(item.date),
            }))}
          />
        </AdminCard>

        <CreateNewsForm />
      </div>
    </AdminShell>
  );
}
