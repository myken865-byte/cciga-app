import fs from "node:fs";
import JSZip from "jszip";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";
const DOCX_PATH = `${ROOT}\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx`;

const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");
const stylesXml = zip.file("word/styles.xml") ? await zip.file("word/styles.xml").async("string") : "";
const settingsXml = zip.file("word/settings.xml") ? await zip.file("word/settings.xml").async("string") : "";

// --- Section properties: every <w:sectPr>...</w:sectPr> block (body sections + final one) ---
const sectPrBlocks = [...docXml.matchAll(/<w:sectPr\b[^>]*>[\s\S]*?<\/w:sectPr>/g)].map(m => m[0]);
console.log(`Nombre de blocs <w:sectPr> trouvés: ${sectPrBlocks.length}`);

function attr(block, tag, name) {
  const m = block.match(new RegExp(`<w:${tag}[^>]*\\b${name}="([^"]+)"`));
  return m ? m[1] : null;
}
function hasTag(block, tag) {
  return new RegExp(`<w:${tag}\\b`).test(block);
}

const sections = sectPrBlocks.map((block, i) => {
  const w = attr(block, "pgSz", "w:w");
  const h = attr(block, "pgSz", "w:h");
  const orient = attr(block, "pgSz", "w:orient") || "portrait";
  return {
    index: i + 1,
    pageWidthTwips: w, pageHeightTwips: h, orient,
    pageWidthIn: w ? (Number(w) / 1440).toFixed(2) : null,
    pageHeightIn: h ? (Number(h) / 1440).toFixed(2) : null,
    marginTopTwips: attr(block, "pgMar", "w:top"),
    marginBottomTwips: attr(block, "pgMar", "w:bottom"),
    marginLeftTwips: attr(block, "pgMar", "w:left"),
    marginRightTwips: attr(block, "pgMar", "w:right"),
    marginGutterTwips: attr(block, "pgMar", "w:gutter"),
    headerDistTwips: attr(block, "pgMar", "w:header"),
    footerDistTwips: attr(block, "pgMar", "w:footer"),
    titlePg: hasTag(block, "titlePg"),
    pgNumFmt: attr(block, "pgNumType", "w:fmt") || "decimal (défaut)",
    pgNumStart: attr(block, "pgNumType", "w:start"),
    sectionType: attr(block, "type", "w:val") || "nextPage (défaut)",
    mirrorMargins: /<w:mirrorMargins\/>/.test(settingsXml),
  };
});

for (const s of sections) {
  console.log(`\nSection ${s.index}: ${s.pageWidthIn}x${s.pageHeightIn} in (${s.orient}), format num=${s.pgNumFmt}${s.pgNumStart ? " début=" + s.pgNumStart : ""}, type=${s.sectionType}, 1ère page différente=${s.titlePg}`);
  console.log(`  Marges (twips, 1440=1in): haut=${s.marginTopTwips} bas=${s.marginBottomTwips} gauche=${s.marginLeftTwips} droite=${s.marginRightTwips} reliure=${s.marginGutterTwips}`);
  console.log(`  Distance en-tête=${s.headerDistTwips} (${s.headerDistTwips ? (s.headerDistTwips / 1440).toFixed(2) : "?"} in), distance pied=${s.footerDistTwips} (${s.footerDistTwips ? (s.footerDistTwips / 1440).toFixed(2) : "?"} in / ${s.footerDistTwips ? (s.footerDistTwips / 1440 * 2.54).toFixed(2) : "?"} cm)`);
}

// --- TOC field presence ---
const hasToc = /TOC\s*\\o/i.test(docXml) || /<w:fldSimple[^>]*TOC/i.test(docXml);
console.log(`\nChamp Table des matières (TOC) présent: ${hasToc}`);

// --- Comments / revisions ---
const hasComments = zip.file("word/comments.xml") !== null;
let commentCount = 0;
if (hasComments) {
  const commentsXml = await zip.file("word/comments.xml").async("string");
  commentCount = (commentsXml.match(/<w:comment\b/g) || []).length;
}
const hasTrackChanges = /<w:ins\b|<w:del\b/.test(docXml);
console.log(`Commentaires: ${commentCount} (fichier comments.xml présent: ${hasComments})`);
console.log(`Marques de révision (insertions/suppressions suivies) détectées dans le corps: ${hasTrackChanges}`);

// --- Fonts declared vs actually used (rFonts references in body) ---
const usedFontNames = new Set([...docXml.matchAll(/w:(?:ascii|hAnsi|eastAsia|cs)="([^"]+)"/g)].map(m => m[1]));
console.log(`Polices référencées dans le corps du document: ${[...usedFontNames].join(", ") || "aucune (hérite du style par défaut)"}`);

// --- Distinct page sizes across sections (format consistency) ---
const distinctSizes = new Set(sections.map(s => `${s.pageWidthIn}x${s.pageHeightIn}`));
console.log(`\nTailles de page distinctes utilisées: ${[...distinctSizes].join(", ")} ${distinctSizes.size > 1 ? "-- MÉLANGE DE FORMATS DÉTECTÉ" : "-- format uniforme"}`);

// --- Empty paragraphs that might indicate accidental blank pages (heuristic only) ---
const emptyParaRuns = (docXml.match(/<w:p\/>|<w:p [^>]*\/>/g) || []).length;
console.log(`Paragraphes complètement vides (heuristique de page blanche potentielle, à confirmer visuellement): ${emptyParaRuns}`);

fs.writeFileSync(`${ROOT}\\00_RAPPORT_GENERAL\\_eps9af_audit_ooxml_raw.json`, JSON.stringify({ sections, hasToc, commentCount, hasTrackChanges, usedFontNames: [...usedFontNames], distinctSizes: [...distinctSizes], emptyParaRuns }, null, 2), "utf8");
