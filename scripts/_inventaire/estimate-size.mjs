import fs from "node:fs";
const entries = JSON.parse(fs.readFileSync("C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json", "utf8"));
const seen = new Map();
let totalAll = 0, totalUnique = 0;
for (const e of entries) {
  totalAll += e.length;
  if (!seen.has(e.sha256)) { seen.set(e.sha256, true); totalUnique += e.length; }
}
console.log("Total (all 472, with duplicate bytes):", (totalAll / 1024 / 1024 / 1024).toFixed(2), "Go");
console.log("Total unique content (dedup by hash):", (totalUnique / 1024 / 1024 / 1024).toFixed(2), "Go");
console.log("Distinct hashes:", seen.size, "/", entries.length, "files");
