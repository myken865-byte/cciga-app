import type { Metadata } from "next";
import { getFaq } from "@/lib/content";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur le CCIGA.",
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const items = await getFaq();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Aide
      </p>
      <h1 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">
        Questions fréquentes
      </h1>
      <FaqAccordion items={items} />
    </div>
  );
}
