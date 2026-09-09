/**
 * Shared text-search normalization — mandat "Barres de recherche globales"
 * (2026-09-09). Diacritic-insensitive, case-insensitive substring matching,
 * reused by every SearchableTable/SearchableList instance instead of each
 * page reimplementing its own comparison.
 */
export function normalizeSearchText(value: string): string {
  // Codepoint-range filter rather than a regex literal containing combining
  // marks (same pattern as app/(site)/page.tsx's normalizeText) — avoids any
  // ambiguity from combining characters sitting inside source code.
  return Array.from(value.normalize("NFD"))
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0;
      return code < 0x0300 || code > 0x036f;
    })
    .join("")
    .toLowerCase()
    .trim();
}

/** True if `query` is empty, or found as a substring in any of `fields` (diacritic/case-insensitive). */
export function matchesSearch(query: string, ...fields: (string | number | null | undefined)[]): boolean {
  const q = normalizeSearchText(query);
  if (!q) return true;
  return fields.some((f) => f !== null && f !== undefined && normalizeSearchText(String(f)).includes(q));
}
