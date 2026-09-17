import Link from "next/link";

/**
 * Mission "Portail Parent multi-institutions" (2026-09-13) — sélecteur
 * d'enfant, commun à toutes les pages du portail Parent (rendu identique
 * quel que soit l'onglet actif ; basePath permet de rester sur la même
 * page au changement d'enfant, ?enfant=<id>). N'affiche rien pour un
 * parent avec un seul enfant.
 */
export default function ChildSwitcher({
  kids,
  selectedId,
  basePath,
}: {
  kids: { id: number; name: string }[];
  selectedId: number;
  basePath: string;
}) {
  if (kids.length <= 1) return null;
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {kids.map((k) => (
        <Link
          key={k.id}
          href={`${basePath}?enfant=${k.id}`}
          className={`rounded-full px-3 py-1.5 text-sm font-medium ${
            k.id === selectedId ? "bg-primary text-white" : "bg-background text-muted hover:text-foreground"
          }`}
        >
          {k.name}
        </Link>
      ))}
    </div>
  );
}
