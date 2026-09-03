export function formatHTG(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} HTG`;
}

/**
 * Same formatting, but with the French locale's narrow no-break space
 * (U+202F, used as the thousands separator) replaced by a plain space.
 * The bundled NotoSans PDF font (lib/pdf/fonts.ts) has no glyph for U+202F,
 * so every @react-pdf/renderer document must use this instead of
 * formatHTG() directly for any amount it renders — the HTML/browser
 * rendering elsewhere in the app is unaffected and keeps formatHTG().
 */
export function formatHTGForPdf(amount: number): string {
  return formatHTG(amount).replace(/ /g, " ");
}
