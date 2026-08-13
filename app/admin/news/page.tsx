import { getNews } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateNewsForm from "@/components/CreateNewsForm";

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
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Contenu du site</h1>
      <ContentSubNav />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface lg:col-span-2">
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
                <tr key={item.id} className="border-t border-border">
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

        <CreateNewsForm />
      </div>
    </div>
  );
}
