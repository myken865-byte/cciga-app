import fs from "node:fs";
import JSZip from "jszip";
import { brandManual } from "./brand-manual.mjs";

const LOGO = "C:\\Users\\Me. Alcide\\Desktop\\logo livre.png";
const BACKUP_DIR = process.argv[2]; // backup root, contains <LABEL>_ORIGINAL.docx

const targets = [
  ["EPS 8AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EPS\\EPS_8e_AF\\09_ASSEMBLAGE_FINAL\\Manuel_EPS_8AF_2026_2027_FINAL_VALIDE.docx"],
  ["EPS 9AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EPS\\EPS_9e_AF\\09_ASSEMBLAGE_FINAL\\Manuel_EPS_9AF_2026_2027_FINAL.docx"],
  ["EEA 7AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_7e_AF\\09_ASSEMBLAGE\\Manuel_EEA_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
  ["EEA 8AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_8e_AF\\09_ASSEMBLAGE\\Manuel_EEA_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
  ["EEA 9AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EEA\\EEA_9e_AF\\09_ASSEMBLAGE\\Manuel_EEA_9AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
  ["EC 7AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\09_ASSEMBLAGE\\Manuel_EC_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
  ["EC 8AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_8e_AF\\09_ASSEMBLAGE\\Manuel_EC_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
  ["EC 9AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\09_ASSEMBLAGE\\Manuel_EC_9AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
  ["ETAP 7AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_ETAP\\ETAP_7e_AF\\09_ASSEMBLAGE\\Manuel_ETAP_7AF_2026_2027_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
  ["ETAP 8AF", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_ETAP\\ETAP_8e_AF\\09_ASSEMBLAGE\\Manuel_ETAP_8AF_2026_2027_PRE-FINAL_AVANT_ILLUSTRATIONS.docx"],
];

function labelToBackupFile(label) {
  return `${BACKUP_DIR}\\${label.replace(" ", "_")}_ORIGINAL.docx`;
}

async function diffCheck(originalPath, modifiedPath) {
  const origBuf = fs.readFileSync(originalPath);
  const modBuf = fs.readFileSync(modifiedPath);
  const origZip = await JSZip.loadAsync(origBuf);
  const modZip = await JSZip.loadAsync(modBuf);
  const origDoc = await origZip.file("word/document.xml").async("string");
  const modDoc = await modZip.file("word/document.xml").async("string");
  const bodyOpenTag = "<w:body>";
  const insertAt = modDoc.indexOf(bodyOpenTag) + bodyOpenTag.length;
  const afterInsert = modDoc.indexOf("</w:p>", insertAt) + "</w:p>".length;
  const modDocWithoutInjection = modDoc.slice(0, insertAt) + modDoc.slice(afterInsert);
  const bodyMatch = modDocWithoutInjection === origDoc;
  const origSect = (origDoc.match(/<w:sectPr/g) || []).length;
  const modSect = (modDoc.match(/<w:sectPr/g) || []).length;
  const origIll = (origDoc.match(/ILL-[A-Z0-9-]+/g) || []).length;
  const modIll = (modDoc.match(/ILL-[A-Z0-9-]+/g) || []).length;
  const origDocIds = (origDoc.match(/DOC-[A-Z0-9-]+/g) || []).length;
  const modDocIds = (modDoc.match(/DOC-[A-Z0-9-]+/g) || []).length;
  return {
    bodyOtherwiseIdentical: bodyMatch,
    sectionsMatch: origSect === modSect,
    sections: { orig: origSect, mod: modSect },
    illMatch: origIll === modIll,
    ill: { orig: origIll, mod: modIll },
    docIdMatch: origDocIds === modDocIds,
    docIds: { orig: origDocIds, mod: modDocIds },
  };
}

for (const [label, target] of targets) {
  console.log(`\n=== ${label} ===`);
  try {
    const backupPath = labelToBackupFile(label);
    if (!fs.existsSync(backupPath)) throw new Error(`Backup introuvable: ${backupPath}`);
    const res = await brandManual(target, LOGO);
    console.log(`  branded -> ${res.outPath} (${res.size} bytes)`);
    const check = await diffCheck(backupPath, target);
    console.log(`  diff check:`, JSON.stringify(check));
    if (!check.bodyOtherwiseIdentical || !check.sectionsMatch || !check.illMatch || !check.docIdMatch) {
      console.log(`  *** WARNING: STRUCTURAL MISMATCH DETECTED FOR ${label} ***`);
    } else {
      console.log(`  OK — no collateral change detected.`);
    }
  } catch (err) {
    console.log(`  ERROR: ${err.message}`);
  }
}
