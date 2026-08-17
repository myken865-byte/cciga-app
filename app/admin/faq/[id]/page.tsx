import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EditFaqForm from "@/components/EditFaqForm";

export const dynamic = "force-dynamic";

export default async function AdminFaqDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <div>
      <Link href="/admin/faq" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Toutes les questions
      </Link>
      <div className="mx-auto max-w-xl">
        <EditFaqForm id={faq.id} initialQuestion={faq.question} initialAnswer={faq.answer} />
      </div>
    </div>
  );
}
