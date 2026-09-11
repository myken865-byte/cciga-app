import { readFileSync } from "fs";
import path from "path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  pushGraphicsState,
  popGraphicsState,
  rectangle,
  clip,
  endPath,
  type PDFFont,
  type PDFPage,
  type RGB,
} from "pdf-lib";

/**
 * Moteur général de remplissage des fiches officielles CCIGA — mandat
 * "moteur professionnel, règle permanente" (2026-09-11). Les 3 PDF fournis
 * par l'établissement (assets/fiches/*.pdf) sont les gabarits MAÎTRES,
 * immuables : ce module ne les redessine jamais, il charge leurs pages
 * telles quelles comme fond et superpose uniquement le texte/la photo aux
 * coordonnées propres à chaque institution (voir templates/*.ts). Design,
 * logo, couleurs, marges, nombre de pages : strictement inchangés.
 *
 * RÈGLE PERMANENTE DU PROJET : toute donnée injectée dans une fiche
 * d'inscription — actuelle, nouvelle, ou régénérée après modification —
 * passe par les fonctions ci-dessous (drawTextOnLine / fitTextToField /
 * drawCheckboxCentered / drawPhotoInsideFrame), jamais par un appel
 * `page.drawText`/`drawImage` direct ailleurs dans le code. Les
 * coordonnées restent propres à chaque gabarit (3 mises en page réellement
 * différentes, voir templates/*.ts) ; c'est la LOGIQUE d'alignement,
 * d'ajustement de taille et de centrage qui est commune aux trois.
 */

const templateCache = new Map<string, Uint8Array>();

function readTemplateBytes(filename: string): Uint8Array {
  const cached = templateCache.get(filename);
  if (cached) return cached;
  const bytes = readFileSync(path.join(process.cwd(), "assets", "fiches", filename));
  templateCache.set(filename, bytes);
  return bytes;
}

export interface TextField {
  page: number; // 0-indexed
  /** Début réel de la zone de saisie — jamais un point arbitraire, mesuré sur le gabarit réel. */
  x: number;
  /** Baseline du texte, positionnée pour reposer juste au-dessus de la ligne imprimée sans la traverser. */
  y: number;
  size?: number;
  /** Largeur disponible avant le champ voisin — jamais dépassée (rétrécissement puis troncature). */
  maxWidth?: number;
  bold?: boolean;
}

export interface CheckboxMark {
  page: number;
  /** Centre de la case (pas un coin) — drawCheckboxCentered calcule le placement du glyphe à partir de ce centre. */
  x: number;
  y: number;
  /** Côté de la case à cocher, en points — le glyphe est dimensionné et centré en fonction de cette taille. */
  size?: number;
}

export interface PhotoBox {
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const DEFAULT_FIELD_SIZE = 9.5;
const MIN_FIELD_SIZE = 6.5; // en dessous, le texte devient illisible — on tronque plutôt que de continuer à rétrécir
const DEFAULT_CHECKBOX_SIZE = 9;

/**
 * Rétrécit la taille de police par petits paliers tant que le texte ne
 * tient pas dans `maxWidth`, avant de tronquer en dernier recours (jamais
 * l'inverse) — "adapter la taille si le texte est trop long" plutôt que de
 * systématiquement couper les valeurs longues (adresses, noms composés…).
 */
export function fitTextToField(
  text: string,
  font: PDFFont,
  desiredSize: number,
  maxWidth: number | undefined,
): { text: string; size: number } {
  if (!maxWidth) return { text, size: desiredSize };
  if (font.widthOfTextAtSize(text, desiredSize) <= maxWidth) return { text, size: desiredSize };

  let size = desiredSize;
  while (size > MIN_FIELD_SIZE && font.widthOfTextAtSize(text, size) > maxWidth) {
    size -= 0.5;
  }
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return { text, size };

  // Toujours trop large même à la taille plancher : tronquer proprement
  // plutôt que déborder sur le champ voisin.
  let truncated = text;
  while (truncated.length > 1 && font.widthOfTextAtSize(`${truncated}…`, size) > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return { text: `${truncated}…`, size };
}

/**
 * Place une valeur sur sa ligne — point d'entrée UNIQUE pour tout texte
 * injecté dans une fiche. `field.x`/`field.y` marquent le début réel de la
 * zone de saisie mesuré sur le gabarit ; cette fonction ne fait jamais que
 * garantir que le rendu y tient (rétrécissement puis troncature via
 * fitTextToField) — jamais de déplacement improvisé au cas par cas.
 */
function drawTextOnLine(page: PDFPage, rawValue: string | null | undefined, field: TextField, font: PDFFont, ink: RGB) {
  const text = (rawValue ?? "").trim();
  if (!text) return;
  const desiredSize = field.size ?? DEFAULT_FIELD_SIZE;
  const { text: rendered, size } = fitTextToField(text, font, desiredSize, field.maxWidth);
  page.drawText(rendered, { x: field.x, y: field.y, size, font, color: ink });
}

/**
 * Centre une coche dans sa case — jamais à côté, jamais sur la bordure.
 * `mark.x`/`mark.y` sont le CENTRE géométrique de la case (voir
 * CheckboxMark) ; le glyphe "X" est mesuré (largeur réelle de la police) et
 * calé pour que son propre centre visuel coïncide avec celui de la case,
 * indépendamment de la police ou de la taille choisie.
 */
function drawCheckboxCentered(page: PDFPage, mark: CheckboxMark, font: PDFFont, ink: RGB) {
  const boxSize = mark.size ?? DEFAULT_CHECKBOX_SIZE;
  const glyphSize = boxSize * 0.78;
  const glyph = "X";
  const glyphWidth = font.widthOfTextAtSize(glyph, glyphSize);
  // Approximation standard : la hauteur visuelle d'une majuscule est proche
  // de 0.7 * la taille de police (pdf-lib n'expose pas la cap-height réelle
  // des polices standard) — suffisant pour un centrage optique correct.
  const glyphCapHeight = glyphSize * 0.7;
  const x = mark.x - glyphWidth / 2;
  const y = mark.y - glyphCapHeight / 2;
  page.drawText(glyph, { x, y, size: glyphSize, font, color: ink });
}

/**
 * Insère une photo dans son cadre — proportions toujours conservées
 * ("contain", jamais de déformation ni de recadrage forcé) ET un clip-path
 * PDF réel qui borne physiquement tout dessin au rectangle du cadre : même
 * une image de forme atypique (large, carrée, portrait…) ou une coordonnée
 * de cadre légèrement imprécise ne peut jamais déborder sur un champ voisin.
 */
async function drawPhotoInsideFrame(
  pdfDoc: PDFDocument,
  page: PDFPage,
  bytes: Buffer,
  contentType: string,
  box: PhotoBox,
) {
  const image = contentType.includes("png") ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);
  const scale = Math.min(box.width / image.width, box.height / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  const x = box.x + (box.width - w) / 2;
  const y = box.y + (box.height - h) / 2;
  page.pushOperators(pushGraphicsState(), rectangle(box.x, box.y, box.width, box.height), clip(), endPath());
  page.drawImage(image, { x, y, width: w, height: h });
  page.pushOperators(popGraphicsState());
}

export async function fillOfficialFiche(options: {
  templateFilename: string;
  fields: Array<{ value: string | null | undefined; field: TextField }>;
  checkboxes?: Array<{ checked: boolean; mark: CheckboxMark }>;
  photo?: { bytes: Buffer; contentType: string; box: PhotoBox } | null;
}): Promise<Uint8Array> {
  const templateBytes = readTemplateBytes(options.templateFilename);
  const pdfDoc = await PDFDocument.load(templateBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  const ink = rgb(0.07, 0.09, 0.24); // encre bleu marine, jamais un noir pur étranger à la charte

  for (const { value, field } of options.fields) {
    const page: PDFPage | undefined = pages[field.page];
    if (!page) continue;
    drawTextOnLine(page, value, field, field.bold ? boldFont : font, ink);
  }

  for (const { checked, mark } of options.checkboxes ?? []) {
    if (!checked) continue;
    const page = pages[mark.page];
    if (!page) continue;
    drawCheckboxCentered(page, mark, boldFont, ink);
  }

  if (options.photo) {
    const page = pages[options.photo.box.page];
    if (page) {
      await drawPhotoInsideFrame(pdfDoc, page, options.photo.bytes, options.photo.contentType, options.photo.box);
    }
  }

  // useObjectStreams: false — certains PDF sources (export outil tiers,
  // structure tolérée en lecture mais atypique) produisaient un fichier
  // corrompu (xref invalide) une fois réenregistrés par pdf-lib avec des
  // flux d'objets ; la sérialisation classique (sans object streams) reste
  // fiable pour tous les gabarits testés.
  return pdfDoc.save({ useObjectStreams: false });
}
