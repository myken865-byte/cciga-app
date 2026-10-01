import path from "path";
import { openSync, type Font } from "fontkit";

/**
 * Mission "Finition visuelle" (2026-09-17) — un nom (ou un intitulé de
 * classe/programme) trop long pour la largeur disponible du badge faisait
 * déborder BadgeDocument.tsx : react-pdf enveloppe le <Text> sur plusieurs
 * lignes, mais les frères (la pastille de rôle notamment) ne se redéplacent
 * pas pour laisser la place — confirmé visuellement (texte et pastille
 * superposés) sur un nom long réel en audit. `fitFontSizePt` calcule, AVANT
 * le rendu, la plus grande taille de police qui tient sur UNE seule ligne
 * dans la largeur donnée. Mesure uniquement — react-pdf reste le seul moteur
 * qui dessine réellement le texte du PDF.
 *
 * Mission "Correction finale verso École Classique / Enseignant — césures
 * interdites" (2026-09-17) — mesuré à l'origine avec opentype.js, une
 * bibliothèque DIFFÉRENTE de celle que react-pdf utilise réellement pour
 * dessiner (fontkit, via @react-pdf/font) : un écart de mesure réel et
 * reproductible a été constaté (un texte calculé comme tenant sur une ligne
 * s'enveloppait quand même). Remplacé par fontkit — même police (mêmes
 * fichiers .woff), même bibliothèque que le rendu réel : la mesure et le
 * dessin ne peuvent plus diverger.
 */
let fontsCache: { regular: Font; bold: Font } | null = null;
function getFonts() {
  if (fontsCache) return fontsCache;
  const fontsDir = path.join(process.cwd(), "assets", "fonts");
  fontsCache = {
    regular: openSync(path.join(fontsDir, "NotoSans-Regular.woff")),
    bold: openSync(path.join(fontsDir, "NotoSans-Bold.woff")),
  };
  return fontsCache;
}

/** Largeur réelle (en points) de `text` rendu à `sizePt`, mesurée avec la même police/bibliothèque que react-pdf. */
export function measureTextWidthPt(text: string, sizePt: number, bold: boolean): number {
  const fonts = getFonts();
  const font = bold ? fonts.bold : fonts.regular;
  return (font.layout(text).advanceWidth / font.unitsPerEm) * sizePt;
}

export function fitFontSizePt(text: string, maxWidthPt: number, startSize: number, minSize: number, bold: boolean): number {
  let size = startSize;
  while (size > minSize && measureTextWidthPt(text, size, bold) > maxWidthPt) {
    size -= 0.25;
  }
  return size;
}
