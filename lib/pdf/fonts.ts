import path from "path";
import { Font } from "@react-pdf/renderer";

/**
 * @react-pdf/renderer's built-in standard-14 fonts (Helvetica, Times-Roman,
 * Courier) mis-render French accented characters (é, è, à, û…) — every letter
 * with a diacritic collapses to the same wrong glyph. This affects every
 * document built on lib/pdf/shared.tsx (bulletins, relevés, reçus) and any
 * new one (badges) — a real, previously-undetected defect on official
 * printed documents. Fix: register a bundled Unicode-capable font instead of
 * relying on the standard fonts. Bundled locally (assets/fonts/, same
 * pattern as the logo in lib/pdf/logo.ts) rather than fetched from a CDN at
 * render time, so PDF generation never depends on outbound network access.
 */
export const DOCUMENT_FONT_FAMILY = "NotoSans";

let registered = false;

export function ensureDocumentFontRegistered() {
  if (registered) return;
  const fontsDir = path.join(process.cwd(), "assets", "fonts");
  Font.register({
    family: DOCUMENT_FONT_FAMILY,
    fonts: [
      { src: path.join(fontsDir, "NotoSans-Regular.woff"), fontWeight: 400 },
      { src: path.join(fontsDir, "NotoSans-Bold.woff"), fontWeight: 700 },
    ],
  });
  registered = true;
}
