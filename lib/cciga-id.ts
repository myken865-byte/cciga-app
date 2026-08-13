export function formatCcigaId(id: number): string {
  return `CCIGA-ID-${String(id).padStart(6, "0")}`;
}
