import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EditNewsForm from "@/components/EditNewsForm";

export const dynamic = "force-dynamic";

export default async function AdminNewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) notFound();

  return (
    <div>
      <Link href="/admin/news" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Toutes les actualités
      </Link>
      <div className="mx-auto max-w-xl">
        <EditNewsForm
          id={news.id}
          initialTitle={news.title}
          initialDate={news.date.toISOString().slice(0, 10)}
          initialCategory={news.category}
          initialExcerpt={news.excerpt}
          initialContent={news.content}
        />
      </div>
    </div>
  );
}
