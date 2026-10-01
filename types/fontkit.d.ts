// `fontkit` ships no type declarations (pure JS, see node_modules/fontkit/package.json).
// Minimal surface actually used by lib/pdf/textFit.ts — measuring text width
// with the same library @react-pdf/renderer uses internally to draw text.
declare module "fontkit" {
  export interface GlyphRun {
    advanceWidth: number;
  }
  export interface Font {
    unitsPerEm: number;
    layout(text: string): GlyphRun;
  }
  export function openSync(path: string): Font;
}
