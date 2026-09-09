"use client";

import { SearchIcon, CloseIcon } from "@/components/icons";

/**
 * Reusable instant-search input — mandat "Barres de recherche globales"
 * (2026-09-09). Presentational only (controlled value/onChange) so it can
 * back either client-side filtering (SearchableTable/SearchableList) or a
 * server ?q= form, matching the CCIGA input style already used elsewhere
 * (app/admin/users, app/admin/fiches-inscription).
 */
export default function ListSearchBar({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="input w-full !pl-9 !pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted transition hover:bg-background hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-light"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
