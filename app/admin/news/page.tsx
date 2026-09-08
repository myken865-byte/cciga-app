import { getNews } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateNewsForm from "@/components/CreateNewsForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { DocumentIcon } from "@/components/icons";

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
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Titre</th>
                  <th className="px-4 py-3 font-semibold">Catégorie</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-t border-row-divider">
                    <td className="px-4 py-3 text-foreground">{item.title}</td>
                    <td className="px-4 py-3 text-muted">{item.category}</td>
                    <td className="px-4 py-3 text-muted">{formatDate(item.date)}</td>
                  </tr>
                ))}
                {news.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted">
                      Aucune actualité pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <CreateNewsForm />
      </div>
    </AdminShell>
  );
}
