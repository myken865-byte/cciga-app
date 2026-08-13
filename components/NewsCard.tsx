import Link from "next/link";
import type { NewsItem } from "@/lib/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/actualites/${item.slug}`}
      className="flex flex-col rounded-lg border border-border bg-surface p-5 transition hover:border-primary hover:shadow-md"
    >
      <span className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
        {item.category}
      </span>
      <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
      <p className="mb-3 text-sm text-muted">{item.excerpt}</p>
      <span className="mt-auto text-xs text-muted">{formatDate(item.date)}</span>
    </Link>
  );
}
