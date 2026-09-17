import Link from "next/link";

export type ParentNavKey = "dashboard" | "devoirs" | "documents" | "presence" | "demandes";

const TABS: { key: ParentNavKey; label: string; href: string }[] = [
  { key: "dashboard", label: "Tableau de bord", href: "/portail/parent" },
  { key: "devoirs", label: "Devoirs", href: "/portail/parent/devoirs" },
  { key: "documents", label: "Documents", href: "/portail/parent/documents" },
  { key: "presence", label: "Présence", href: "/portail/parent/presence" },
  { key: "demandes", label: "Demandes", href: "/portail/parent/demandes" },
];

/**
 * Mission "Portail Parent multi-institutions" (2026-09-13) — pile
 * d'onglets commune à toutes les pages du portail Parent. `childId` est
 * propagé sur chaque lien (?enfant=<id>) pour rester sur le même enfant en
 * changeant d'onglet.
 */
export default function ParentNavPills({ active, childId }: { active: ParentNavKey; childId: number }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2 border-b border-row-divider pb-3">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={`${tab.href}?enfant=${childId}`}
          className={`rounded-full px-3 py-1.5 text-sm font-medium ${
            tab.key === active ? "bg-primary text-white" : "text-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
