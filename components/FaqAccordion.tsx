"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/content";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.id} className="rounded-lg border border-border bg-surface">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="font-medium text-foreground">{item.question}</span>
              <span className="text-primary">{open ? "−" : "+"}</span>
            </button>
            {open && (
              <p className="px-5 pb-4 text-sm text-muted">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
