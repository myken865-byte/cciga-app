import path from "path";
import { readFileSync } from "fs";
import * as opentype from "opentype.js";
import sharp from "sharp";

/**
 * Mandat "Générateur de badges multi-institutions" (2026-09-17) — export
 * PNG haute résolution du badge, recto et verso séparément.
 *
 * Deux approches essayées et rejetées avant celle-ci, toutes deux testées
 * en DEVTEST réel (pas seulement en local) :
 *  1. <text> SVG + @font-face en data URI, rasterisé par `sharp` (librsvg) :
 *     l'embed de police en data URI est silencieusement ignoré par la
 *     version de librsvg embarquée dans `sharp` → texte vide ("tofu").
 *  2. `satori` : moteur de shaping `harfbuzzjs` charge son .wasm via un
 *     chemin absolu figé au bundling, ENOENT réel sur Vercel.
 *
 * Solution retenue : `opentype.js` (pur JS) convertit chaque ligne de texte
 * en tracés SVG (<path>) — aucune résolution de police à la rasterisation.
 * Les formes vectorielles pures (rect/path/circle/ligne, sans texte) n'ont
 * pas ce problème et sont écrites directement en SVG brut ci-dessous.
 *
 * Mission "Finition visuelle premium" (2026-09-17) — même refonte que
 * lib/pdf/BadgeDocument.tsx (moteur PDF) : logo consolidé dans l'en-tête,
 * photo agrandie, panneaux teintés, icônes contact vectorielles pures.
 *
 * Mission "Finition visuelle finale" (2026-09-17, suite) — mêmes correctifs
 * que BadgeDocument.tsx (voir son en-tête pour le détail complet) :
 * avatar de repli réduit (proportionné, pas géant), Faculté/Programme
 * séparés pour l'Université quand `Program.faculty` existe réellement,
 * panneau recto remonté/agrandi, QR agrandi (recto et verso), libellés gris
 * renforcés, bloc Consignes resserré. Les deux fichiers évoluent ensemble.
 */

// Carte portrait avec fente de cordon (badge à lanière). 53,98 mm x 85,6 mm à 300 DPI.
const DPI = 300;
const MM_TO_IN = 1 / 25.4;
const CARD_W = Math.round(53.98 * MM_TO_IN * DPI); // 637px
const CARD_H = Math.round(85.6 * MM_TO_IN * DPI); // 1011px

const NAVY = "#0b1f4d";
const GOLD = "#f0b429";
const PANEL_BG = "#f4f6fb";
const PANEL_BORDER = "#dfe4ee";
const LABEL_GRAY = "#3f4753";

/** Un accent secondaire distinct par institution — même ossature CCIGA, identité propre (voir BadgeDocument.tsx). */
const INSTITUTION_ACCENTS: Record<string, string> = {
  "École Classique": "#c98a12",
  Kindergarten: "#1f8a7d",
  "École Professionnelle": "#4a6b85",
  Université: "#7a1f3d",
};
const DEFAULT_ACCENT = "#c98a12";

function accentFor(institutionLine: string): string {
  return INSTITUTION_ACCENTS[institutionLine] ?? DEFAULT_ACCENT;
}

let fontsCache: { regular: opentype.Font; bold: opentype.Font } | null = null;
function getFonts() {
  if (fontsCache) return fontsCache;
  const fontsDir = path.join(process.cwd(), "assets", "fonts");
  fontsCache = {
    regular: opentype.parse(toArrayBuffer(readFileSync(path.join(fontsDir, "NotoSans-Regular.woff")))),
    bold: opentype.parse(toArrayBuffer(readFileSync(path.join(fontsDir, "NotoSans-Bold.woff")))),
  };
  return fontsCache;
}

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export interface BadgePngData {
  logoBase64: string; // data:image/...;base64,...
  orgName: string;
  badgeTypeLabel: string;
  photoBase64: string | null;
  fullName: string;
  roleLabel: string;
  matricule: string;
  classOrFunction: string;
  /** Faculté — Université uniquement, seulement quand `Program.faculty` existe réellement (jamais inventée pour les 3 autres institutions). */
  facultyLabel?: string;
  yearLabel: string;
  badgeNumber: string;
  issuedLabel: string;
  statusLabel: string;
  qrDataUri: string | null;
  contactEmail: string;
}

function initialsOf(fullName: string): string {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// `y` reçu ici est la ligne de base du texte (convention SVG <text>).
// Glyphe par glyphe, pas en un seul appel `font.getPath(texte entier, ...)` :
// `getPath` sur une chaîne multi-caractères produit parfois un point de
// contrôle "NaN" (imprécision flottante accumulée d'opentype.js), qui casse
// le parseur SVG de librsvg au premier jeton invalide → mot tronqué. Le
// tracé glyphe par glyphe, curseur arrondi à 2 décimales, élimine le bug.
function textPath(font: opentype.Font, text: string, x: number, y: number, fontSize: number, fill: string): string {
  if (!text) return "";
  let cursor = x;
  let d = "";
  for (const ch of text) {
    d += font.getPath(ch, round2(cursor), round2(y), fontSize).toPathData(2);
    cursor += font.getAdvanceWidth(ch, fontSize);
  }
  return `<path d="${d}" fill="${fill}"/>`;
}

function textWidth(font: opentype.Font, text: string, fontSize: number): number {
  return font.getAdvanceWidth(text, fontSize);
}

interface TextStyle {
  size: number;
  bold?: boolean;
  fill: string;
}

function makeWriter(fonts: { regular: opentype.Font; bold: opentype.Font }) {
  return {
    text(text: string, x: number, y: number, style: TextStyle): string {
      const font = style.bold ? fonts.bold : fonts.regular;
      return textPath(font, text, x, y, style.size, style.fill);
    },
    textCentered(text: string, cx: number, y: number, style: TextStyle): string {
      const font = style.bold ? fonts.bold : fonts.regular;
      const w = textWidth(font, text, style.size);
      return textPath(font, text, cx - w / 2, y, style.size, style.fill);
    },
    width(text: string, style: TextStyle): number {
      return textWidth(style.bold ? fonts.bold : fonts.regular, text, style.size);
    },
  };
}

// Réduit progressivement la taille de police jusqu'à ce que `text` tienne
// dans `maxWidth`, sans jamais descendre sous `minSize` — ce SVG n'a pas de
// moteur de mise en page vivant (voir wrapText plus bas).
function fitSize(
  w: ReturnType<typeof makeWriter>,
  text: string,
  style: Omit<TextStyle, "size">,
  maxWidth: number,
  startSize: number,
  minSize: number,
): number {
  let size = startSize;
  while (size > minSize && w.width(text, { ...style, size }) > maxWidth) {
    size -= 1;
  }
  return size;
}

const HEADER_X = CARD_W * 0.06;
const HEADER_W = CARD_W * 0.88;
const HEADER_Y = CARD_H * 0.045;
const HEADER_H = CARD_H * 0.062;
const HEADER_WAVE_Y = HEADER_Y + HEADER_H;
const HEADER_WAVE_H = CARD_H * 0.024;

/** En-tête consolidé (logo + nom institution en une seule pastille) + vague dorée — commun recto/verso. Un seul logo sur toute la carte : évite l'effet "double logo" quand la photo n'est pas une vraie photo. */
function headerAndWave(w: ReturnType<typeof makeWriter>, logoBase64: string, institutionLine: string): string {
  const holeW = CARD_W * 0.24;
  const chipR = HEADER_H * 0.48;
  const chipCx = HEADER_X + HEADER_W * 0.12;
  const chipCy = HEADER_Y + HEADER_H / 2;
  const textCx = HEADER_X + HEADER_W * 0.58;

  return `
  <rect x="${CARD_W / 2 - holeW / 2}" y="${CARD_H * 0.014}" width="${holeW}" height="${CARD_H * 0.016}" rx="999" fill="#f4f5f8" stroke="#c9ccd6" stroke-width="1.5"/>
  <rect x="${HEADER_X}" y="${HEADER_Y}" width="${HEADER_W}" height="${HEADER_H}" rx="7" fill="${NAVY}" stroke="${GOLD}" stroke-width="2"/>
  <circle cx="${chipCx}" cy="${chipCy}" r="${chipR}" fill="#ffffff"/>
  <image href="${logoBase64}" x="${chipCx - chipR * 0.76}" y="${chipCy - chipR * 0.76}" width="${chipR * 1.52}" height="${chipR * 1.52}"/>
  ${w.textCentered("CCIGA", textCx, HEADER_Y + HEADER_H * 0.44, { size: CARD_H * 0.025, bold: true, fill: "#ffffff" })}
  ${w.textCentered(institutionLine.toUpperCase(), textCx, HEADER_Y + HEADER_H * 0.78, { size: CARD_H * 0.0145, bold: true, fill: "#ffffff" })}
  <path d="M0 ${HEADER_WAVE_Y} H${CARD_W} V${HEADER_WAVE_Y + HEADER_WAVE_H * 0.3} C${CARD_W * 0.7} ${HEADER_WAVE_Y + HEADER_WAVE_H * 1.3}, ${CARD_W * 0.35} ${HEADER_WAVE_Y - HEADER_WAVE_H * 0.3}, 0 ${HEADER_WAVE_Y + HEADER_WAVE_H * 0.6} Z" fill="${GOLD}"/>`;
}

/** Bandeau bleu marine du pied de carte, bord supérieur ondulé, avec la signature institutionnelle. */
function footerWave(): string {
  const bandH = CARD_H * 0.065;
  const bandY = CARD_H - bandH;
  const waveH = CARD_H * 0.015;
  return `
  <path d="M0 ${bandY} H${CARD_W} V${bandY + waveH * 0.2} C${CARD_W * 0.65} ${bandY + waveH * 1.1}, ${CARD_W * 0.3} ${bandY - waveH * 0.5}, 0 ${bandY + waveH * 0.2} Z" fill="${GOLD}"/>
  <rect x="0" y="${bandY + waveH}" width="${CARD_W}" height="${bandH - waveH}" fill="${NAVY}"/>`;
}

function footerText(w: ReturnType<typeof makeWriter>): string {
  const bandH = CARD_H * 0.065;
  const bandY = CARD_H - bandH;
  const text = "Marchons vers l'excellence";
  return w.textCentered(text, CARD_W / 2, bandY + bandH * 0.62, { size: CARD_H * 0.0148, bold: true, fill: "#ffffff" });
}

/** Icônes contact — primitives vectorielles pures, aucun glyphe Unicode (NotoSans n'a pas de glyphes symboles). Taille locale 20x20, positionnées via `x`,`y` (coin haut-gauche). */
function phoneIcon(x: number, y: number, size: number, color: string): string {
  const s = size / 20;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="6" y="1.5" width="8" height="17" rx="2" fill="none" stroke="${color}" stroke-width="1.6"/>
    <circle cx="10" cy="15.6" r="0.9" fill="${color}"/>
  </g>`;
}
function emailIcon(x: number, y: number, size: number, color: string): string {
  const s = size / 20;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="1.5" y="4" width="17" height="12" rx="1.5" fill="none" stroke="${color}" stroke-width="1.6"/>
    <path d="M2.5 5.2 L10 11 L17.5 5.2" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;
}
function globeIcon(x: number, y: number, size: number, color: string): string {
  const s = size / 20;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="10" cy="10" r="8" fill="none" stroke="${color}" stroke-width="1.5"/>
    <line x1="2" y1="10" x2="18" y2="10" stroke="${color}" stroke-width="1.5"/>
    <ellipse cx="10" cy="10" rx="3.4" ry="8" fill="none" stroke="${color}" stroke-width="1.5"/>
  </g>`;
}

function rectoSvg(d: BadgePngData): string {
  const fonts = getFonts();
  const w = makeWriter(fonts);
  const institutionLine = d.orgName.replace(/^CCIGA\s*/i, "").trim() || d.badgeTypeLabel;
  const accent = accentFor(institutionLine);

  // Mission "Cadre photo circulaire" (2026-09-20) — cercle parfait, en
  // parité exacte avec BadgeDocument.tsx (PHOTO_DIAMETER, PHOTO_BORDER,
  // PHOTO_IMAGE_SIDE). `meet` (= contain) dans un carré de côté 70 % du
  // diamètre utile : la diagonale de la photo reste inférieure au diamètre,
  // aucun format n'est rogné (ni cheveux, ni front, ni menton).
  const photoD = CARD_H * 0.285;
  const photoStrokeWidth = CARD_W * 0.0131;
  const photoCx = CARD_W / 2;
  const photoCy = CARD_H * 0.205 + photoD / 2;
  const photoCircleR = photoD / 2 - photoStrokeWidth / 2;
  const photoImageSide = (photoD - photoStrokeWidth * 2) * 0.7;
  const photoCircle = `<circle cx="${photoCx}" cy="${photoCy}" r="${photoCircleR}" fill="#eef1f7"/>`;
  const photoRing = `<circle cx="${photoCx}" cy="${photoCy}" r="${photoCircleR}" fill="none" stroke="${accent}" stroke-width="${photoStrokeWidth}"/>`;
  const photoNode = d.photoBase64
    ? `${photoCircle}
       <image href="${d.photoBase64}" x="${photoCx - photoImageSide / 2}" y="${photoCy - photoImageSide / 2}" width="${photoImageSide}" height="${photoImageSide}" preserveAspectRatio="xMidYMid meet"/>
       ${photoRing}`
    : `${photoCircle}
       ${photoRing}
       ${w.textCentered(initialsOf(d.fullName), photoCx, photoCy + CARD_H * 0.0265, { size: CARD_H * 0.075, bold: true, fill: accent })}`;

  const roleLabel = d.roleLabel.toUpperCase();
  const pillPadX = 14;
  const pillW = pillPadX * 2 + w.width(roleLabel, { size: CARD_H * 0.0145, bold: true, fill: "" });
  const pillH = CARD_H * 0.025;
  const identityCx = CARD_W / 2;
  const nameY = CARD_H * 0.547;

  // `minSize` abaissé en sécurité : `fitSize` s'arrête au plancher même si
  // le texte ne tient toujours pas à cette taille — un nom extrême doit
  // pouvoir descendre plus bas plutôt que de déborder sur le panneau fixe
  // du dessous (voir la même protection dans BadgeDocument.tsx, où le
  // moteur PDF a réellement débordé en audit avec un nom à 4 prénoms).
  const nameMaxWidth = CARD_W * 0.84;
  // Taille réduite très légèrement (0.034→0.031), en parité avec
  // BadgeDocument.tsx — le nom restait dominant face au rôle/niveau.
  const nameSize = fitSize(w, d.fullName, { bold: true, fill: NAVY }, nameMaxWidth, CARD_H * 0.031, CARD_H * 0.018);
  const classSize = fitSize(w, d.classOrFunction, { bold: true, fill: "#1a1a1a" }, nameMaxWidth, CARD_H * 0.0165, CARD_H * 0.0105);

  // Mission "Correction ciblée du recto — QR retiré du recto" (2026-09-17) —
  // le QR (déjà présent au verso) est retiré sans laisser de case vide :
  // panneau Matricule/Année à 2 colonnes réparties sur toute la largeur
  // récupérée, plus bas et plus compact (le QR n'a plus besoin de place),
  // en parité avec `rectoBottomPanel` de BadgeDocument.tsx.
  const panelX = CARD_W * 0.07;
  const panelW = CARD_W * 0.86;
  // `panelY` remonté (0.65→0.63), en parité avec `rectoBottomPanel` de
  // BadgeDocument.tsx, pour réduire le vide sous "Petite Section".
  const panelY = CARD_H * 0.63;
  const panelH = CARD_H * (1 - 0.63 - 0.1);
  const colMidX = panelX + panelW / 2;

  return `<svg width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="cardClip"><rect x="0" y="0" width="${CARD_W}" height="${CARD_H}" rx="18"/></clipPath></defs>
  <g clip-path="url(#cardClip)">
  <rect width="${CARD_W}" height="${CARD_H}" fill="#ffffff"/>
  ${headerAndWave(w, d.logoBase64, institutionLine)}

  ${photoNode}

  ${w.textCentered(d.fullName, identityCx, nameY, { size: nameSize, bold: true, fill: NAVY })}
  <rect x="${identityCx - pillW / 2}" y="${nameY + CARD_H * 0.01}" width="${pillW}" height="${pillH}" rx="8" fill="${GOLD}"/>
  ${w.textCentered(roleLabel, identityCx, nameY + CARD_H * 0.01 + pillH * 0.68, { size: CARD_H * 0.0145, bold: true, fill: NAVY })}
  ${w.textCentered(d.classOrFunction, identityCx, nameY + CARD_H * 0.01 + pillH + CARD_H * 0.024, { size: classSize, bold: true, fill: "#1a1a1a" })}

  <rect x="${panelX}" y="${panelY}" width="${panelW}" height="${panelH}" rx="8" fill="${PANEL_BG}" stroke="${PANEL_BORDER}" stroke-width="1.5"/>
  <rect x="${panelX}" y="${panelY}" width="5" height="${panelH}" fill="${accent}"/>
  <line x1="${colMidX}" y1="${panelY + panelH * 0.22}" x2="${colMidX}" y2="${panelY + panelH * 0.78}" stroke="${PANEL_BORDER}" stroke-width="1.5"/>
  ${w.textCentered("Matricule", panelX + panelW * 0.25, panelY + panelH * 0.4, { size: CARD_H * 0.0138, fill: LABEL_GRAY })}
  ${w.textCentered(d.matricule, panelX + panelW * 0.25, panelY + panelH * 0.65, { size: CARD_H * 0.0175, bold: true, fill: "#1a1a1a" })}
  ${w.textCentered("Année", panelX + panelW * 0.75, panelY + panelH * 0.4, { size: CARD_H * 0.0138, fill: LABEL_GRAY })}
  ${w.textCentered(d.yearLabel, panelX + panelW * 0.75, panelY + panelH * 0.65, { size: CARD_H * 0.0175, bold: true, fill: "#1a1a1a" })}

  ${footerWave()}
  ${footerText(w)}
  </g>
</svg>`;
}

function versoSvg(d: BadgePngData): string {
  const fonts = getFonts();
  const w = makeWriter(fonts);
  const institutionLine = d.orgName.replace(/^CCIGA\s*/i, "").trim() || d.badgeTypeLabel;
  const accent = accentFor(institutionLine);
  const pad = CARD_W * 0.07;
  const bodyY = CARD_H * 0.185;

  // Panneau profil : nom + grille (statut/année/classe/matricule, ou 5
  // cases avec Faculté+Programme séparés pour l'Université) + QR.
  const panelX = pad;
  const panelW = CARD_W - pad * 2;
  const panelY = bodyY;
  const panelPad = panelW * 0.075;
  const nameY = panelY + panelPad + CARD_H * 0.018;
  const gridTop = nameY + CARD_H * 0.042;
  const qrCellW = panelW * 0.28;
  const gridW = panelW - panelPad * 2 - qrCellW;
  const colW = gridW / 2;
  const rowH = CARD_H * 0.058;

  // `colW` n'a pas de gouttière entre les 2 colonnes de la grille — une
  // valeur longue (ex. "Techniques en Informatique") débordait sur la
  // colonne voisine (chevauchement réel trouvé en audit visuel). `fitSize`
  // réduit la police avant tout dépassement, au lieu de risquer une
  // collision de texte.
  const tileValueMaxWidth = colW - colW * 0.08;

  // Une fonction/classe réelle peut rester trop longue pour une demi-colonne
  // même au plancher de taille lisible ("Coordonnateur Pédagogique Adjoint",
  // "9e Année Fondamentale — Section B" — cas réels du plan de test de cette
  // mission) : "Classe / Fonction" ET "Matricule" passent alors tous les
  // deux en pleine largeur, en parité avec la même bascule dans
  // BadgeDocument.tsx (même mécanisme déjà utilisé pour Faculté/Programme à
  // l'Université, jamais un nouveau design).
  const valueFitsAtHalfWidth = (value: string) => {
    const size = fitSize(w, value, { bold: true, fill: "#161b22" }, tileValueMaxWidth, CARD_H * 0.0165, CARD_H * 0.0112);
    return w.width(value, { bold: true, fill: "#161b22", size }) <= colW;
  };
  const needsFullWidthPromotion =
    !d.facultyLabel && (!valueFitsAtHalfWidth(d.classOrFunction) || !valueFitsAtHalfWidth(d.matricule));

  // Faculté/Programme en pleine largeur (jamais à 2 colonnes) : un nom de
  // faculté réel ("Faculté des Sciences de la Santé") est trop long pour
  // une demi-largeur de grille — chevauchement réel trouvé en audit visuel
  // sur DEVTEST avec une vraie donnée, pas seulement un cas de test.
  const tiles: { label: string; value: string; full?: boolean }[] = d.facultyLabel
    ? [
        { label: "Statut", value: d.statusLabel },
        { label: "Année", value: d.yearLabel },
        { label: "Faculté", value: d.facultyLabel, full: true },
        { label: "Programme / Filière", value: d.classOrFunction, full: true },
        { label: "Matricule", value: d.matricule, full: true },
      ]
    : [
        { label: "Statut", value: d.statusLabel },
        { label: "Année", value: d.yearLabel },
        { label: "Classe / Fonction", value: d.classOrFunction, full: needsFullWidthPromotion },
        { label: "Matricule", value: d.matricule, full: needsFullWidthPromotion },
      ];
  let tileRow = 0;
  const tilesSvg = tiles
    .map((tile) => {
      const isFull = Boolean(tile.full);
      const col = isFull ? 0 : tileRow % 2;
      const row = isFull ? Math.ceil(tileRow / 2) : Math.floor(tileRow / 2);
      if (!isFull) tileRow += 1;
      else tileRow = (row + 1) * 2;
      const tx = panelX + panelPad + col * colW;
      const ty = gridTop + row * rowH;
      const maxW = isFull ? gridW - gridW * 0.04 : tileValueMaxWidth;
      const valueSize = fitSize(w, tile.value, { bold: true, fill: "#161b22" }, maxW, CARD_H * 0.0165, CARD_H * 0.0112);
      // Ce moteur ne fait jamais de retour à la ligne automatique ni de
      // césure (positionnement de glyphes en une seule ligne, voir l'en-tête
      // du fichier) — `fitSize` sur le libellé est une sécurité en parité
      // avec BadgeDocument.tsx (où react-pdf, lui, insère une césure), pas
      // un correctif d'un bug observé ici.
      const labelSize = fitSize(w, tile.label.toUpperCase(), { fill: LABEL_GRAY }, maxW, CARD_H * 0.0127, CARD_H * 0.0088);
      return `${w.text(tile.label.toUpperCase(), tx, ty, { size: labelSize, fill: LABEL_GRAY })}
      ${w.text(tile.value, tx, ty + CARD_H * 0.022, { size: valueSize, bold: true, fill: "#161b22" })}`;
    })
    .join("\n");
  const totalRows = Math.ceil(tileRow / 2);

  const qrSize = CARD_W * 0.2;
  const qrX = panelX + panelW - panelPad - qrSize;
  const qrY = gridTop - CARD_H * 0.012;
  const panelH = gridTop + rowH * totalRows - panelY + panelPad * 0.6;

  // Panneau consignes — resserré (moins de padding/interligne) pour ne pas
  // paraître plus vide que nécessaire.
  const consignesY = panelY + panelH + CARD_H * 0.022;
  const consignes = [
    "Ce badge est strictement personnel. Il doit être porté en tout temps.",
    "En cas de perte, informer immédiatement l'administration.",
    "Toute utilisation frauduleuse est interdite.",
  ];
  const consignesPad = panelW * 0.065;
  const consignesMaxWidth = panelW - consignesPad * 2 - 12;
  let cy = consignesY + consignesPad + CARD_H * 0.013;
  const consignesTitle = w.text("Consignes importantes", panelX + consignesPad, cy, { size: CARD_H * 0.0155, bold: true, fill: NAVY });
  cy += CARD_H * 0.02;
  const consignesBlock = consignes
    .map((line) => {
      const wrapped = wrapText(w, line, { size: CARD_H * 0.0118, fill: "#2e2e2e" }, consignesMaxWidth - 12);
      const bulletSvg = `<rect x="${panelX + consignesPad}" y="${cy - CARD_H * 0.0082}" width="5" height="5" rx="1.5" fill="${accent}"/>`;
      const linesSvg = wrapped
        .map((wline, i) => w.text(wline, panelX + consignesPad + 10, cy + i * CARD_H * 0.0158, { size: CARD_H * 0.0118, fill: "#2e2e2e" }))
        .join("\n");
      cy += wrapped.length * CARD_H * 0.0158 + CARD_H * 0.006;
      return bulletSvg + "\n" + linesSvg;
    })
    .join("\n");
  const consignesH = cy - consignesY + consignesPad * 0.55;

  // Panneau contact — icône dimensionnée en fraction de CARD_H comme le
  // texte qui l'accompagne, jamais une taille fixe en px indépendante de
  // l'échelle de la carte. Texte agrandi pour la lisibilité, icône quasi
  // inchangée ("sans agrandir exagérément les icônes").
  const contactY = consignesY + consignesH + CARD_H * 0.018;
  const contactPad = panelW * 0.065;
  const contactTextSize = CARD_H * 0.0152;
  const iconSize = CARD_H * 0.019;
  const contactRows: [string, (x: number, y: number, s: number, c: string) => string][] = [
    [`(+509) 3220-1749 / 3617-9944`, phoneIcon],
    [d.contactEmail, emailIcon],
    [`www.cciga.edu.ht`, globeIcon],
  ];
  let cty = contactY + contactPad + CARD_H * 0.014;
  const contactBlock = contactRows
    .map(([text, icon]) => {
      const row = `${icon(panelX + contactPad, cty - iconSize * 0.72, iconSize, NAVY)}
      ${w.text(text, panelX + contactPad + iconSize + 10, cty, { size: contactTextSize, fill: "#242424" })}`;
      cty += CARD_H * 0.03;
      return row;
    })
    .join("\n");
  const contactH = cty - contactY + contactPad * 0.55;

  const disclaimerY = CARD_H * 0.9;
  const disclaimer = `N° ${d.badgeNumber} — Émis le ${d.issuedLabel} — scannez le QR pour vérifier.`;
  const disclaimerLines = wrapText(w, disclaimer, { size: CARD_H * 0.0088, fill: "#7d879a" }, CARD_W - pad * 2);

  return `<svg width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="cardClipV"><rect x="0" y="0" width="${CARD_W}" height="${CARD_H}" rx="18"/></clipPath></defs>
  <g clip-path="url(#cardClipV)">
  <rect width="${CARD_W}" height="${CARD_H}" fill="#ffffff"/>
  ${headerAndWave(w, d.logoBase64, institutionLine)}

  <rect x="${panelX}" y="${panelY}" width="${panelW}" height="${panelH}" rx="8" fill="${PANEL_BG}" stroke="${PANEL_BORDER}" stroke-width="1.5"/>
  <rect x="${panelX}" y="${panelY}" width="5" height="${panelH}" fill="${accent}"/>
  ${w.text(d.fullName, panelX + panelPad, nameY, { size: CARD_H * 0.019, bold: true, fill: NAVY })}
  ${tilesSvg}
  <rect x="${qrX - 6}" y="${qrY - 6}" width="${qrSize + 12}" height="${qrSize + 12}" rx="5" fill="#ffffff" stroke="${PANEL_BORDER}" stroke-width="1.5"/>
  ${d.qrDataUri ? `<image href="${d.qrDataUri}" x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}"/>` : ""}
  ${w.textCentered("Vérification", qrX + qrSize / 2, qrY + qrSize + 20, { size: CARD_H * 0.0085, fill: LABEL_GRAY })}

  <rect x="${panelX}" y="${consignesY}" width="${panelW}" height="${consignesH}" rx="8" fill="none" stroke="${PANEL_BORDER}" stroke-width="1.5"/>
  ${consignesTitle}
  ${consignesBlock}

  <rect x="${panelX}" y="${contactY}" width="${panelW}" height="${contactH}" rx="8" fill="none" stroke="${PANEL_BORDER}" stroke-width="1.5"/>
  ${contactBlock}

  ${disclaimerLines.map((line, i) => w.text(line, pad, disclaimerY + i * CARD_H * 0.013, { size: CARD_H * 0.0088, fill: "#7d879a" })).join("\n  ")}

  ${footerWave()}
  ${footerText(w)}
  </g>
</svg>`;
}

// Retour à la ligne manuel simple (mot par mot) : opentype.js ne fait que du
// tracé de glyphes, aucune mise en page — nécessaire ici car le SVG produit
// n'a plus de <text>/<tspan> vivant pour laisser le moteur de rendu gérer
// l'habillage automatiquement, contrairement à react-pdf (BadgeDocument.tsx).
function wrapText(w: ReturnType<typeof makeWriter>, text: string, style: TextStyle, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (w.width(candidate, style) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function svgToPng(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function renderBadgePngs(data: BadgePngData): Promise<{ recto: Buffer; verso: Buffer }> {
  const [recto, verso] = await Promise.all([svgToPng(rectoSvg(data)), svgToPng(versoSvg(data))]);
  return { recto, verso };
}
