import fs from "node:fs";
import JSZip from "jszip";

const p = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
try {
  const buf = fs.readFileSync(p);
  console.log("File size:", buf.length);
  const zip = await JSZip.loadAsync(buf);
  const names = Object.keys(zip.files);
  console.log("Zip entries:", names.length);
  console.log("Has [Content_Types].xml:", names.includes("[Content_Types].xml"));
  console.log("Has word/document.xml:", names.includes("word/document.xml"));
  const docXml = await zip.file("word/document.xml").async("string");
  console.log("document.xml length:", docXml.length);
  console.log("Ends with </w:document>?", docXml.trim().endsWith("</w:document>"));
  console.log("Starts with <?xml?", docXml.trim().startsWith("<?xml"));
} catch (err) {
  console.log("ERREUR:", err.message);
}
