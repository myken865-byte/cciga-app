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
} from "pdf-lib";

/**
 * Remplissage de fiches officielles CCIGA — mandat "fiches d'inscription
 * fidèles au modèle papier" (2026-09-11). Les 3 PDF fournis par
 * l'établissement (assets/fiches/*.pdf) sont les gabarits MAÎTRES,
 * immuables : ce module ne les redessine jamais, il charge leurs pages
 * telles quelles comme fond et superpose uniquement le texte/la photo aux
 * coordonnées mesurées sur le PDF réel (voir templates/*.ts). Design,
 * logo, couleurs, marges, nombre de pages : strictement inchangés.
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
  x: number;
  y: number; // coordonnées PDF (origine en bas à gauche)
  size?: number;
  maxWidth?: number; // tronque proprement plutôt que déborder sur un champ voisin
  bold?: boolean;
}

export interface CheckboxMark {
  page: number;
  x: number;
  y: number;
  size?: number;
}

export interface PhotoBox {
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

function truncateToWidth(text: string, font: PDFFont, size: number, maxWidth: number): string {
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 1 && font.widthOfTextAtSize(`${truncated}…`, size) > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return `${truncated}…`;
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
    const text = (value ?? "").trim();
    if (!text) continue;
    const page: PDFPage | undefined = pages[field.page];
    if (!page) continue;
    const size = field.size ?? 9.5;
    const usedFont = field.bold ? boldFont : font;
    const rendered = field.maxWidth ? truncateToWidth(text, usedFont, size, field.maxWidth) : text;
    page.drawText(rendered, { x: field.x, y: field.y, size, font: usedFont, color: ink });
  }

  for (const { checked, mark } of options.checkboxes ?? []) {
    if (!checked) continue;
    const page = pages[mark.page];
    if (!page) continue;
    page.drawText("X", { x: mark.x, y: mark.y, size: mark.size ?? 9, font: boldFont, color: ink });
  }

  if (options.photo) {
    const { bytes, contentType, box } = options.photo;
    const page = pages[box.page];
    if (page) {
      // "Conserver les proportions, ne pas déformer le visage" — cadrage
      // "contain" (jamais de recadrage/déformation) plutôt qu'un remplissage
      // total de l'encadré qui exigerait de rogner l'image. Le contain-fit
      // seul dépend de coordonnées de cadre exactes ; comme filet de
      // sécurité absolu (mandat "aucune image, même large ou atypique, ne
      // doit pouvoir dépasser de la zone photo", 2026-09-11), un clip-path
      // PDF réel borne physiquement tout dessin à la zone rectangulaire —
      // même une coordonnée de cadre légèrement fausse ne peut plus produire
      // un débordement visible.
      const image = contentType.includes("png") ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);
      const scale = Math.min(box.width / image.width, box.height / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      const x = box.x + (box.width - w) / 2;
      const y = box.y + (box.height - h) / 2;
      page.pushOperators(
        pushGraphicsState(),
        rectangle(box.x, box.y, box.width, box.height),
        clip(),
        endPath(),
      );
      page.drawImage(image, { x, y, width: w, height: h });
      page.pushOperators(popGraphicsState());
    }
  }

  // useObjectStreams: false — certains PDF sources (export outil tiers,
  // structure tolérée en lecture mais atypique) produisaient un fichier
  // corrompu (xref invalide) une fois réenregistrés par pdf-lib avec des
  // flux d'objets ; la sérialisation classique (sans object streams) reste
  // fiable pour tous les gabarits testés.
  return pdfDoc.save({ useObjectStreams: false });
}
