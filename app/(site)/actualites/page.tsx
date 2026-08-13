import type { Metadata } from "next";
import { getNews } from "@/lib/content";
import NewsCard from "@/components/NewsCard";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Toutes les actualités du CCIGA.",
};

export const dynamic = "force-dynamic";

export default async function ActualitesPage() {
  const news = await getNews();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Actualités
      </p>
      <h1 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">
        Les actualités du CCIGA
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
