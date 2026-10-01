import fs from "node:fs";
import JSZip from "jszip";
import { DOMParser } from "@xmldom/xmldom";

const file = process.argv[2];
const buf = fs.readFileSync(file);
const zip = await JSZip.loadAsync(buf);
const parts = ["word/document.xml", "word/footer1.xml", "word/_rels/document.xml.rels", "[Content_Types].xml"];
const parser = new DOMParser({
  onError: (level, msg) => {
    console.log(level.toUpperCase(), msg);
    if (level !== "warning") process.exitCode = 1;
  },
});
for (const p of parts) {
  const xml = await zip.file(p).async("string");
  console.log("=== parsing", p, "(", xml.length, "chars ) ===");
  parser.parseFromString(xml, "text/xml");
}
console.log("done");
