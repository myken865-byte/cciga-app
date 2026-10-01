import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";

function decodeXmlEntities(s) {
  if (!s) return s;
  return s.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
function fieldAfter(block, labelPattern) {
  const re = new RegExp(`(?:${labelPattern})\\s*:\\s*\\|?([^|]+)`, "i");
  const m = block.match(re);
  return m && m[1] ? decodeXmlEntities(m[1].trim()) : null;
}

async function extractSpecificBrief(filePath, targetIds) {
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  const docXml = await zip.file("word/document.xml").async("string");
  const plain = docXml.replace(/<[^>]+>/g, "|").replace(/\|+/g, "|");

  const results = [];
  for (const targetId of targetIds) {
    const escaped = targetId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const idx = plain.search(new RegExp(escaped, "i"));
    if (idx < 0) { results.push({ id: targetId, found: false }); continue; }
    const block = plain.slice(idx, idx + 1200);
    // Try to grab a title right after the id (pattern "ID — Titre" or "ID Titre")
    const titleMatch = block.match(new RegExp(`${escaped}\\s*[—\\-:]?\\s*\\|?([^|]{0,80})`, "i"));
    results.push({
      id: targetId,
      found: true,
      titre: titleMatch ? decodeXmlEntities(titleMatch[1].trim()) : null,
      description: fieldAfter(block, "Description visuelle|Description"),
      objectif: fieldAfter(block, "Objectif p[eé]dagogique|Fonction p[eé]dagogique|Fonction"),
      legende: fieldAfter(block, "L[eé]gende"),
    });
  }
  return results;
}

function move(src, destDir, destName) {
  fs.mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, destName || path.basename(src));
  if (fs.existsSync(dest)) return dest;
  fs.renameSync(src, dest);
  return dest;
}

const RECLASS = [
  {
    disc: "EPS", lvl: "7AF", file: "EPS 7e.AF final.docx", gap: 2,
    knownIds: ["ILL-7AF-C10-02"],
    note: "Écart réel de 2 sur 59 illustrations canoniques (vérifié par correspondance image-par-image, pas seulement par comptage). 1 identifiant précis retrouvé encore visible comme texte (ci-dessous). Le second manque sans laisser de trace textuelle — son marqueur a été supprimé sans qu'une image le remplace ; sa position exacte n'a pas pu être déterminée automatiquement et nécessite une vérification visuelle page par page.",
  },
  {
    disc: "EC", lvl: "7AF", file: "EC 7e AF. Final.docx", gap: 1,
    knownIds: ["ILL-EC-7AF-C03-02"],
    note: "Écart réel de 1 sur 29 emplacements déclarés, confirmé par comptage des relations d'image réellement dessinées dans le corps du document (28 images pour 29 attendues) ET par le marqueur texte encore présent listé ci-dessous.",
  },
  {
    disc: "EC", lvl: "8AF", file: "Manuel_EC_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx", gap: 1,
    knownIds: ["ILL-EC-8AF-C04-02"],
    note: "Écart réel de 1 sur 28 emplacements déclarés, confirmé par comptage (27 images pour 28 attendues) ET par le marqueur texte encore présent listé ci-dessous.",
  },
  {
    disc: "EC", lvl: "9AF", file: "Manuel_EC_9AF_2026_2027_CORRIGE_FINAL.docx", gap: 1,
    knownIds: ["ILL-EC-9AF-C04-02"],
    note: "Le compte global d'images correspond exactement (21 images dessinées pour 21 emplacements déclarés dans le sous-ensemble mesurable), MAIS un marqueur texte précis reste visible (ci-dessous) — signe qu'une image a probablement été dupliquée ou mal positionnée ailleurs pendant que cet emplacement précis restait vide. Le fichier contient aussi 20 paires d'images strictement identiques stockées en double dans son archive interne (bruit technique, sans rapport avec le contenu affiché — explique en partie la taille anormalement élevée du fichier).",
  },
];

for (const r of RECLASS) {
  const srcPath = path.join(ROOT, "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER", r.disc, r.lvl, r.file);
  if (!fs.existsSync(srcPath)) { console.error(`INTROUVABLE: ${srcPath}`); continue; }

  const briefs = await extractSpecificBrief(srcPath, r.knownIds);

  // Move the manuscript + its companion notes to 03_ILLUSTRATIONS_MANQUANTES
  const oldDir = path.join(ROOT, "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER", r.disc, r.lvl);
  const newDir = path.join(ROOT, "03_ILLUSTRATIONS_MANQUANTES", r.disc, r.lvl);
  for (const f of fs.readdirSync(oldDir)) {
    move(path.join(oldDir, f), newDir, f);
  }
  fs.rmdirSync(oldDir);
  try { fs.rmdirSync(path.join(ROOT, "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER", r.disc)); } catch {}

  const md = [];
  md.push(`# ${r.disc} ${r.lvl} — Reclassement en 03_ILLUSTRATIONS_MANQUANTES (suite à vérification)`);
  md.push("");
  md.push(`**Reclassé le 2026-09-22, à votre demande de vérification des écarts d'illustrations avant de figer les statuts.**`);
  md.push("");
  md.push(r.note);
  md.push("");
  md.push("| Identifiant | Titre | Brief (description visuelle) | Objectif pédagogique | Légende | Statut |");
  md.push("|---|---|---|---|---|---|");
  for (const b of briefs) {
    if (!b.found) { md.push(`| ${b.id} | — | Texte du marqueur non retrouvé (peut avoir été supprimé) | — | — | MANQUANTE (position à vérifier visuellement) |`); continue; }
    md.push(`| ${b.id} | ${b.titre || "—"} | ${b.description || "—"} | ${b.objectif || "—"} | ${b.legende || "—"} | MANQUANTE |`);
  }
  if (r.gap > r.knownIds.length) {
    md.push(`| (non identifié) | — | ${r.gap - r.knownIds.length} illustration(s) supplémentaire(s) manquante(s) détectée(s) par le comptage global, sans marqueur texte retrouvable | — | — | MANQUANTE — position à confirmer par contrôle visuel |`);
  }
  md.push("");
  fs.writeFileSync(path.join(newDir, `${r.disc}_${r.lvl}_ILLUSTRATIONS_MANQUANTES.md`), md.join("\n"), "utf8");
  console.log(`${r.disc} ${r.lvl} reclassé en 03, liste écrite (${briefs.length} identifiant(s) confirmé(s) + ${Math.max(0, r.gap - r.knownIds.length)} non localisé(s)).`);
}
