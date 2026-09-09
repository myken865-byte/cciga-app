"use client";

import { useMemo, useState, type ReactNode } from "react";
import ListSearchBar from "@/components/admin/ListSearchBar";
import { matchesSearch } from "@/lib/searchNormalize";

/**
 * Generic instant-filter wrapper for a <table> list — mandat "Barres de
 * recherche globales" (2026-09-09). Data fetching stays server-side in the
 * page (Server Component); this Client Component only owns the search input
 * state and the resulting filtered slice, so the table markup itself
 * (columns, cell styling) is defined once per page via `renderRow`/`head`.
 */
export default function SearchableTable<T>({
  items,
  getSearchText,
  placeholder,
  ariaLabel,
  head,
  renderRow,
  colSpan,
  emptyMessage = "Aucun résultat pour cette recherche.",
  baseEmptyMessage,
  toolbarExtra,
}: {
  items: T[];
  getSearchText: (item: T) => (string | number | null | undefined)[];
  placeholder: string;
  ariaLabel?: string;
  head: ReactNode;
  renderRow: (item: T) => ReactNode;
  colSpan: number;
  /** Shown when the search matches nothing. */
  emptyMessage?: string;
  /** Shown instead when `items` was already empty before any search (e.g. "Aucun compte pour ce filtre."). */
  baseEmptyMessage?: ReactNode;
  /** Optional extra controls (filters, tabs) rendered next to the search input. */
  toolbarExtra?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) => matchesSearch(query, ...getSearchText(item)));
  }, [items, query, getSearchText]);

  return (
    <div>
      {items.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <ListSearchBar value={query} onChange={setQuery} placeholder={placeholder} ariaLabel={ariaLabel} className="max-w-xs flex-1" />
          {query && (
            <span className="text-xs text-muted">
              {filtered.length} / {items.length} résultat{items.length > 1 ? "s" : ""}
            </span>
          )}
          {toolbarExtra}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">{head}</thead>
          <tbody>
            {filtered.map((item) => renderRow(item))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-8 text-center text-muted">
                  {items.length === 0 ? (baseEmptyMessage ?? emptyMessage) : emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
