// Insère le logo officiel "Collection Potentiel en Éveil" en tête de
// couverture et remplace le pied de page dans un manuel .docx déjà
// assemblé, par chirurgie OOXML directe (JSZip), SANS repasser par les
// scripts de génération (NO REDO) : le contenu pédagogique, la pagination,
// les exercices, corrigés, glossaire, références, en-têtes et emplacements
// d'illustrations ne sont pas touchés. Seuls deux éléments sont modifiés :
//   1. Un nouveau paragraphe (image centrée) est inséré comme tout premier
//      enfant de <w:body> — donc à l'intérieur de la toute première section
//      (pages liminaires, numérotation romaine), avant le titre existant.
//      Cela ne déplace aucune limite de section (chaque section porte déjà
//      son propre <w:sectPr>, placé APRÈS son contenu).
//   2. Le premier w:t du pied de page (footer1.xml), qui contient l'ancienne
//      mention d'auteur, est remplacé par la formulation officielle. Le
//      deuxième w:t ("   |   Page ") et le champ PAGE restent intacts.
import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";

const NEW_FOOTER_TEXT = "Préparé par My-ken Dieujuste. Contact: (+509) 3220-1749 / 3617-9944";
const LOGO_REL_ID = "rIdLogoPotentielEnEveil";
const LOGO_MEDIA_NAME = "media/logo_potentiel_en_eveil.png";
// Logo carré 1254x1254 px, beaucoup de marge transparente autour du
// graphisme -> 1.7 pouce de large suffit pour une couverture, sans dominer
// la page. 1 pouce = 914400 EMU.
const LOGO_SIZE_EMU = Math.round(1.7 * 914400);

function escapeXmlAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export async function brandManual(inputPath, logoPngPath, { dryRunOutputPath } = {}) {
  const buf = fs.readFileSync(inputPath);
  const zip = await JSZip.loadAsync(buf);

  // ---- 1. Ajouter l'image dans word/media/ -----------------------------
  const logoBuf = fs.readFileSync(logoPngPath);
  zip.file(`word/${LOGO_MEDIA_NAME}`, logoBuf);

  // ---- 2. Ajouter la relation dans word/_rels/document.xml.rels --------
  const relsPath = "word/_rels/document.xml.rels";
  let relsXml = await zip.file(relsPath).async("string");
  if (relsXml.includes(LOGO_REL_ID)) {
    throw new Error(`Relation ${LOGO_REL_ID} déjà présente — le logo a déjà été inséré dans ce fichier ?`);
  }
  const newRel = `<Relationship Id="${LOGO_REL_ID}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${LOGO_MEDIA_NAME}"/>`;
  relsXml = relsXml.replace("</Relationships>", newRel + "</Relationships>");
  zip.file(relsPath, relsXml);

  // ---- 3. Insérer le paragraphe logo en tout premier enfant de <w:body> -
  const docPath = "word/document.xml";
  let docXml = await zip.file(docPath).async("string");
  const bodyOpenTag = "<w:body>";
  const bodyOpenIdx = docXml.indexOf(bodyOpenTag);
  if (bodyOpenIdx === -1) throw new Error("Balise <w:body> introuvable");
  const insertAt = bodyOpenIdx + bodyOpenTag.length;

  const logoParagraph =
    `<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="240"/></w:pPr>` +
    `<w:r><w:rPr/><w:drawing>` +
    `<wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">` +
    `<wp:extent cx="${LOGO_SIZE_EMU}" cy="${LOGO_SIZE_EMU}"/>` +
    `<wp:effectExtent l="0" t="0" r="0" b="0"/>` +
    `<wp:docPr id="1" name="LogoCollectionPotentielEnEveil" descr="Logo officiel de la Collection Potentiel en Éveil"/>` +
    `<wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr>` +
    `<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">` +
    `<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:nvPicPr><pic:cNvPr id="1" name="logo_potentiel_en_eveil.png"/><pic:cNvPicPr/></pic:nvPicPr>` +
    `<pic:blipFill><a:blip r:embed="${LOGO_REL_ID}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>` +
    `<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${LOGO_SIZE_EMU}" cy="${LOGO_SIZE_EMU}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>` +
    `</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;

  docXml = docXml.slice(0, insertAt) + logoParagraph + docXml.slice(insertAt);
  zip.file(docPath, docXml);

  // ---- 4. Remplacer le texte du pied de page ----------------------------
  const footerPath = "word/footer1.xml";
  let footerXml = await zip.file(footerPath).async("string");
  const oldFooterPattern = /(<w:t[^>]*>)(Préparé par My-ken Dieujuste[^<]*)(<\/w:t>)/;
  if (!oldFooterPattern.test(footerXml)) {
    throw new Error("Ancien texte de pied de page introuvable dans footer1.xml — motif inattendu, vérification manuelle requise.");
  }
  footerXml = footerXml.replace(oldFooterPattern, (m, open, _old, close) => `${open}${NEW_FOOTER_TEXT}${close}`);
  zip.file(footerPath, footerXml);

  const outPath = dryRunOutputPath || inputPath;
  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(outPath, outBuf);
  return { outPath, size: outBuf.length };
}

