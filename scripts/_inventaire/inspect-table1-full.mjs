import fs from "node:fs";
import JSZip from "jszip";

const DOCX_PATH = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx";
const buf = fs.readFileSync(DOCX_PATH);
const zip = await JSZip.loadAsync(buf);
const docXml = await zip.file("word/document.xml").async("string");

const idx = docXml.indexOf("Capacit\u00E9s mobilis\u00E9es");
const tblStart = docXml.lastIndexOf("<w:tbl>", idx);
const tblEnd = docXml.indexOf("</w:tbl>", idx) + "</w:tbl>".length;
const tableXml = docXml.slice(tblStart, tblEnd);
console.log("Table length:", tableXml.length);

// Count rows and show each row's trPr (gridBefore/gridAfter) + cell tcW/gridSpan summary.
const rowMatches = [...tableXml.matchAll(/<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/g)];
console.log("Row count:", rowMatches.length);
for (let i = 0; i < rowMatches.length; i++) {
  const row = rowMatches[i][0];
  const trPrM = row.match(/<w:trPr>([\s\S]*?)<\/w:trPr>/);
  const gridBefore = row.match(/<w:gridBefore w:val="(\d+)"/);
  const gridAfter = row.match(/<w:gridAfter w:val="(\d+)"/);
  const cells = [...row.matchAll(/<w:tcW w:w="(\d+)" w:type="\w+"\/>(?:<w:gridSpan w:val="(\d+)"\/>)?/g)];
  const cellSummary = cells.map(c => `w=${c[1]}${c[2] ? `,span=${c[2]}` : ""}`).join(" | ");
  console.log(`Row ${i}: gridBefore=${gridBefore ? gridBefore[1] : "-"} gridAfter=${gridAfter ? gridAfter[1] : "-"} cells=[${cellSummary}]`);
}
