/**
 * Mission "Finalisation portail Parent" (2026-09-12) — liste simple des
 * bulletins/relevés/attestations déjà agrégés côté page (aucune requête
 * ici). Chaque lien PDF passe par une route sécurisée existante (jamais un
 * Blob URL brut).
 */
export default function ChildDocumentsList({
  documents,
}: {
  documents: { id: string; typeLabel: string; href: string; linkLabel: string }[];
}) {
  if (documents.length === 0) {
    return <p className="empty-state">Aucun document disponible pour le moment.</p>;
  }
  return (
    <ul className="space-y-2 text-sm">
      {documents.map((d) => (
        <li key={d.id} className="flex items-center justify-between gap-2 rounded-md border border-row-divider px-3 py-2">
          <span className="truncate text-foreground">{d.typeLabel}</span>
          <a href={d.href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-primary hover:underline">
            {d.linkLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}
