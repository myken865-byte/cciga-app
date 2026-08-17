import Link from "next/link";
import { getFaq } from "@/lib/content";
import ContentSubNav from "@/components/ContentSubNav";
import CreateFaqForm from "@/components/CreateFaqForm";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const items = await getFaq();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Contenu du site</h1>
      <ContentSubNav />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/admin/faq/${item.id}`}
              className="block rounded-lg border border-border bg-surface p-4 hover:border-primary"
            >
              <p className="font-medium text-foreground">{item.question}</p>
              <p className="mt-1 text-sm text-muted">{item.answer}</p>
            </Link>
          ))}
          {items.length === 0 && (
            <p className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
              Aucune question pour le moment.
            </p>
          )}
        </div>

        <CreateFaqForm />
      </div>
    </div>
  );
}
