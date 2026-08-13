import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <Link href="/actualites" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Toutes les actualités
      </Link>
      <span className="mb-3 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
        {item.category}
      </span>
      <h1 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">{item.title}</h1>
      <p className="mb-8 text-sm text-muted">{formatDate(item.date)}</p>
      <p className="text-muted leading-relaxed">{item.content}</p>
    </div>
  );
}
