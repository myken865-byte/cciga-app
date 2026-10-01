import fs from "node:fs";
import JSZip from "jszip";

const TARGETS = [
  { disc: "EPS", lvl: "7AF", expected: 60, path: "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\7AF\\EPS 7e.AF final.docx" },
  { disc: "EPS", lvl: "8AF", expected: 102, path: "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\8AF\\Manuel_EPS_8AF_2026_2027_COMPLET_IMPRESSION_FINAL_MAJ_TITRES.docx" },
  { disc: "EC", lvl: "7AF", expected: 29, path: "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EC\\7AF\\EC 7e AF. Final.docx" },
  { disc: "EC", lvl: "8AF", expected: 28, path: "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EC\\8AF\\Manuel_EC_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx" },
  { disc: "EC", lvl: "9AF", expected: 21, path: "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EC\\9AF\\Manuel_EC_9AF_2026_2027_CORRIGE_FINAL.docx" },
];

async function analyze(t) {
  const buf = fs.readFileSync(t.path);
  const zip = await JSZip.loadAsync(buf);

  // 1. Media files present, flagging anything filename-matching "logo".
  const mediaFiles = Object.keys(zip.files).filter(p => /^word\/media\//i.test(p) && !zip.files[p].dir);
  const logoFiles = mediaFiles.filter(p => /logo/i.test(p));

  // 2. Relationship IDs -> media target, from document.xml.rels (body-level rels only).
  const relsXml = zip.file("word/_rels/document.xml.rels") ? await zip.file("word/_rels/document.xml.rels").async("string") : "";
  const relMap = new Map();
  for (const m of relsXml.matchAll(/<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) relMap.set(m[1], m[2]);
  const imageRelIds = [...relMap.entries()].filter(([, target]) => /media\//i.test(target)).map(([id]) => id);
  const logoRelIds = [...relMap.entries()].filter(([, target]) => /media\/.*logo/i.test(target)).map(([id]) => id);

  // 3. How many of those rIds are actually DRAWN (referenced via r:embed=) in the BODY document.xml
  //    (as opposed to declared in rels but unused, or only used in header/footer).
  const docXml = await zip.file("word/document.xml").async("string");
  const embedsInBody = new Set([...docXml.matchAll(/r:embed="([^"]+)"/g)].map(m => m[1]));
  const bodyImageRelIds = imageRelIds.filter(id => embedsInBody.has(id));
  const bodyLogoUsed = logoRelIds.some(id => embedsInBody.has(id));

  // 4. Remaining un-replaced text markers (still present as text = definitely not yet illustrated).
  const plain = docXml.replace(/<[^>]+>/g, "|").replace(/\|+/g, "|");
  const illIds = new Set((plain.match(/ILL-[A-Z0-9\-]+/gi) || []).map(s => s.trim().toUpperCase()));
  const illLabels = new Set((plain.match(/\bIllustration\s+\d+\.\d+\b/gi) || []).map(s => s.trim()));
  const remainingMarkers = illIds.size + illLabels.size;
  const remainingMarkerIds = [...illIds, ...illLabels];

  // 5. Duplicate check: same media file (by content hash) used more than once via different rIds.
  const crypto = await import("node:crypto");
  const contentHashToFiles = new Map();
  for (const mf of mediaFiles) {
    const content = await zip.file(mf).async("nodebuffer");
    const h = crypto.createHash("sha256").update(content).digest("hex");
    if (!contentHashToFiles.has(h)) contentHashToFiles.set(h, []);
    contentHashToFiles.get(h).push(mf);
  }
  const duplicateGroups = [...contentHashToFiles.values()].filter(g => g.length > 1);

  const pedagogicalBodyImages = bodyImageRelIds.length - (bodyLogoUsed ? 1 : 0);

  console.log(`\n=== ${t.disc} ${t.lvl} (attendu: ${t.expected}) ===`);
  console.log(`Fichiers média total dans le .docx: ${mediaFiles.length} (dont logo: ${logoFiles.length} fichier(s): ${logoFiles.join(", ") || "aucun"})`);
  console.log(`Relations image déclarées: ${imageRelIds.length}`);
  console.log(`Relations image RÉELLEMENT dessinées dans le corps (r:embed trouvé): ${bodyImageRelIds.length}`);
  console.log(`Logo utilisé dans le corps: ${bodyLogoUsed}`);
  console.log(`Images pédagogiques (corps - logo): ${pedagogicalBodyImages}`);
  console.log(`Écart vs attendu: ${pedagogicalBodyImages - t.expected}`);
  console.log(`Marqueurs texte encore non remplacés (ILL-/Illustration N.M): ${remainingMarkers} ${remainingMarkerIds.length ? "-> " + remainingMarkerIds.join(", ") : ""}`);
  console.log(`Groupes de doublons (même image, plusieurs occurrences physiques dans le zip): ${duplicateGroups.length}`);
  if (duplicateGroups.length) duplicateGroups.forEach(g => console.log(`  - ${g.join(", ")}`));

  return { ...t, mediaTotal: mediaFiles.length, bodyImageRelIds: bodyImageRelIds.length, bodyLogoUsed, pedagogicalBodyImages, remainingMarkers, remainingMarkerIds, duplicateGroups: duplicateGroups.length };
}

const results = [];
for (const t of TARGETS) results.push(await analyze(t));
fs.writeFileSync("C:\\Users\\Me. Alcide\\Desktop\\_precise_illustration_audit.json", JSON.stringify(results, null, 2), "utf8");

// --- EPS 9AF check (pilot manual — verify its "96/96 exact" claim precisely too) ---
await analyze({ disc: "EPS", lvl: "9AF", expected: 96, path: "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels\\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\\EPS\\9AF\\Manuel_EPS_9AF_2026_2027_FINAL.docx" });
