"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin/news", label: "Actualités" },
  { href: "/admin/events", label: "Événements" },
  { href: "/admin/faq", label: "FAQ" },
];

export default function ContentSubNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex gap-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            pathname.startsWith(tab.href)
              ? "bg-primary text-white"
              : "border border-border bg-surface text-muted"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
