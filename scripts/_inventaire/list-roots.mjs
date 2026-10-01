import fs from "node:fs";
const entries = JSON.parse(fs.readFileSync("C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json", "utf8"));
const roots = new Map();
for (const e of entries) {
  const parts = e.fullName.split("\\");
  const key = parts.slice(3, 5).join("\\");
  roots.set(key, (roots.get(key) || 0) + 1);
}
[...roots.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`${v}\t${k}`));
