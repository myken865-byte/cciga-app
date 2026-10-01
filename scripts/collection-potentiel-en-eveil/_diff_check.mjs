import fs from "node:fs";
import JSZip from "jszip";

const [, , originalPath, modifiedPath] = process.argv;

const origBuf = fs.readFileSync(originalPath);
const modBuf = fs.readFileSync(modifiedPath);
const origZip = await JSZip.loadAsync(origBuf);
const modZip = await JSZip.loadAsync(modBuf);

const origDoc = await origZip.file("word/document.xml").async("string");
const modDoc = await modZip.file("word/document.xml").async("string");

const bodyOpenTag = "<w:body>";
const insertAt = modDoc.indexOf(bodyOpenTag) + bodyOpenTag.length;
// Find where the inserted logo paragraph ends: it's the first <w:p>...</w:p> we injected.
const afterInsert = modDoc.indexOf("</w:p>", insertAt) + "</w:p>".length;
const injected = modDoc.slice(insertAt, afterInsert);
const modDocWithoutInjection = modDoc.slice(0, insertAt) + modDoc.slice(afterInsert);

console.log("Injected paragraph length:", injected.length, "chars");
console.log("Injected contains LogoCollectionPotentielEnEveil:", injected.includes("LogoCollectionPotentielEnEveil"));
console.log("document.xml identical after removing injection:", modDocWithoutInjection === origDoc);
if (modDocWithoutInjection !== origDoc) {
  // find first diff position
  let i = 0;
  const minLen = Math.min(modDocWithoutInjection.length, origDoc.length);
  while (i < minLen && modDocWithoutInjection[i] === origDoc[i]) i++;
  console.log("FIRST DIFF at char", i);
  console.log("orig:", origDoc.slice(Math.max(0, i - 60), i + 60));
  console.log("mod :", modDocWithoutInjection.slice(Math.max(0, i - 60), i + 60));
}

// sectPr count (section boundaries) must be identical
const origSect = (origDoc.match(/<w:sectPr/g) || []).length;
const modSect = (modDoc.match(/<w:sectPr/g) || []).length;
console.log("sectPr count orig/mod:", origSect, "/", modSect, origSect === modSect ? "OK" : "MISMATCH");

// footer diff
const origFooter = await origZip.file("word/footer1.xml").async("string");
const modFooter = await modZip.file("word/footer1.xml").async("string");
console.log("footer1.xml orig:", origFooter.match(/<w:t[^>]*>([^<]*)<\/w:t>/g));
console.log("footer1.xml mod :", modFooter.match(/<w:t[^>]*>([^<]*)<\/w:t>/g));

// media + rels sanity
console.log("media file present:", !!modZip.file("word/media/logo_potentiel_en_eveil.png"));
const modRels = await modZip.file("word/_rels/document.xml.rels").async("string");
console.log("rels contains logo relationship:", modRels.includes("rIdLogoPotentielEnEveil"));

// ILL- and DOC- id counts must be unchanged (illustration placeholders untouched)
const origIll = (origDoc.match(/ILL-[A-Z0-9-]+/g) || []).length;
const modIll = (modDoc.match(/ILL-[A-Z0-9-]+/g) || []).length;
console.log("ILL- id occurrences orig/mod:", origIll, "/", modIll, origIll === modIll ? "OK" : "MISMATCH");
