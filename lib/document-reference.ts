import type { DocumentType } from "@/lib/documents";

/**
 * Human-readable reference derived from the document's own already-unique
 * id, rather than a separately generated/stored value — avoids collision
 * handling when many documents are created in the same batch-generation
 * request (unlike the timestamp-based admission reference generator).
 */
export function formatDocumentReference(id: string, type: DocumentType): string {
  const prefix = type === "releve_semestre" ? "REL" : "BUL";
  return `CCIGA-${prefix}-${id.slice(-10).toUpperCase()}`;
}
