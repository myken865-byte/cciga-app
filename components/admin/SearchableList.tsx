"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import ListSearchBar from "@/components/admin/ListSearchBar";
import { matchesSearch } from "@/lib/searchNormalize";

/**
 * Generic instant-filter wrapper for a card/grid list (non-table pages) —
 * mandat "Barres de recherche globales" (2026-09-09). Same contract as
 * SearchableTable, but renders whatever container/grid markup the page
 * needs via `listClassName`, instead of a fixed <table>.
 */
export default function SearchableList<T>({
  items,
  getSearchText,
  placeholder,
  ariaLabel,
  renderItem,
  keyFor,
  listClassName = "space-y-3",
  emptyMessage = "Aucun résultat pour cette recherche.",
  baseEmptyMessage,
  toolbarExtra,
}: {
  items: T[];
  getSearchText: (item: T) => (string | number | null | undefined)[];
  placeholder: string;
  ariaLabel?: string;
  renderItem: (item: T) => ReactNode;
  keyFor: (item: T) => string;
  listClassName?: string;
  emptyMessage?: string;
  baseEmptyMessage?: ReactNode;
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
      {filtered.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
          {items.length === 0 ? (baseEmptyMessage ?? emptyMessage) : emptyMessage}
        </p>
      ) : (
        <div className={listClassName}>{filtered.map((item) => <Fragment key={keyFor(item)}>{renderItem(item)}</Fragment>)}</div>
      )}
    </div>
  );
}
