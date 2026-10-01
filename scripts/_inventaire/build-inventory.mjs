import fs from "node:fs";
import { detectDiscipline, detectLevel, detectCategory, detectSource } from "./classify.mjs";

const META_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";
const MD_OUT = "C:\\Users\\Me. Alcide\\Desktop\\INVENTAIRE_12_MANUELS.md";
const CSV_OUT = "C:\\Users\\Me. Alcide\\Desktop\\INVENTAIRE_12_MANUELS.csv";

const entries = JSON.parse(fs.readFileSync(META_PATH, "utf8"));

for (const e of entries) {
  e.discipline = detectDiscipline(e.base);
  e.level = detectLevel(e.base);
  e.category = detectCategory(e.base);
  e.source = detectSource(e.fullName);
}

// --- Duplicate detection by sha256 ---
const byHash = new Map();
for (const e of entries) {
  if (!e.sha256) continue;
  if (!byHash.has(e.sha256)) byHash.set(e.sha256, []);
  byHash.get(e.sha256).push(e);
}
const duplicateGroups = [...byHash.values()].filter(g => g.length > 1);

// --- Group by discipline+level for the 12-manual matrix ---
const levels = ["7AF", "8AF", "9AF"];
const disciplines = ["EPS", "EEA", "ETAP", "EC"];

function fmtSize(bytes) {
  if (bytes == null) return "";
  if (bytes > 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " Mo";
  return (bytes / 1024).toFixed(0) + " Ko";
}
function fmtDate(iso) {
  if (!iso) return "";
  return iso.slice(0, 19).replace("T", " ");
}

let md = [];
md.push("# INVENTAIRE_12_MANUELS — Collection Potentiel en Éveil (EPS, EEA, ETAP, EC — 7e/8e/9e AF)");
md.push("");
md.push(`Généré le ${new Date().toISOString().slice(0, 19).replace("T", " ")}. Analyse automatique — aucun fichier original déplacé, renommé ou modifié.`);
md.push("");
md.push(`Fichiers candidats retenus (filtrés par nom sur les 4 disciplines cibles, dans Desktop/Documents/Downloads) : **${entries.length}**.`);
md.push(`Groupes de copies strictement identiques (même empreinte SHA-256) : **${duplicateGroups.length}** (${duplicateGroups.reduce((s, g) => s + g.length, 0)} fichiers au total dans ces groupes).`);
md.push("");
md.push("Méthodologie : recherche récursive de fichiers .docx/.doc/.pdf/.odt/.rtf/.png/.jpg/.jpeg/.tif/.tiff/.webp sous Desktop, Documents et Downloads (dossiers système/cache/AppData/node_modules/.git exclus), filtrée aux noms contenant explicitement une des 4 disciplines (EPS, EEA, ETAP, EC/Citoyenneté — abrégé ou en toutes lettres). Un simple « 7AF »/« Potentiel en Éveil » seul n'a PAS suffi à qualifier un fichier, pour éviter de mélanger avec les autres collections de la même bibliothèque (Sciences Physiques, Sciences Sociales, Biologie, Kreyòl, Économie, etc.).");
md.push("");

for (const disc of disciplines) {
  md.push(`## Discipline : ${disc}`);
  md.push("");
  for (const lvl of levels) {
    const group = entries.filter(e => e.discipline === disc && e.level === lvl)
      .sort((a, b) => new Date(b.lastWriteTime) - new Date(a.lastWriteTime));
    md.push(`### ${disc} ${lvl} — ${group.length} fichier(s) candidat(s)`);
    md.push("");
    if (group.length === 0) {
      md.push("_Aucun fichier trouvé sous ce niveau avec le filtre actuel — à vérifier manuellement si un fichier existe sous un nom inattendu._");
      md.push("");
      continue;
    }
    md.push("| Fichier | Catégorie | Origine | Taille | Modifié | Pages (cache/estimé) | Chap. détectés | Images intégrées | Marqueurs illustration | Ouverture | SHA-256 (8 car.) |");
    md.push("|---|---|---|---|---|---|---|---|---|---|---|");
    for (const e of group) {
      let pages = "";
      let openOk = "OK";
      if (e.docx) {
        pages = e.docx.pagesCached ? `${e.docx.pagesCached} (cache Word)` : "—";
        if (e.docx.openError) { openOk = `ERREUR: ${e.docx.openError}`; }
      } else if (e.pdf) {
        pages = e.pdf.pages != null ? `${e.pdf.pages} (${e.pdf.method})` : `indéterminé (${e.pdf.method})`;
      }
      const chapCount = e.docx ? (e.docx.chapterHeadingCount || 0) : "";
      const mediaCount = e.docx ? e.docx.mediaImageCount : "";
      const illCount = e.docx ? (e.docx.illustrationMarkerCount || 0) : "";
      md.push(`| \`${e.base}\` | ${e.category} | ${e.source} | ${fmtSize(e.length)} | ${fmtDate(e.lastWriteTime)} | ${pages} | ${chapCount} | ${mediaCount} | ${illCount} | ${openOk} | \`${(e.sha256 || "").slice(0, 8)}\` |`);
    }
    md.push("");
    md.push(`<details><summary>Chemins complets (${group.length})</summary>`);
    md.push("");
    for (const e of group) md.push(`- \`${e.fullName}\``);
    md.push("");
    md.push("</details>");
    md.push("");
  }
}

md.push("## Copies strictement identiques (même SHA-256)");
md.push("");
md.push("Ces groupes sont des doublons binaires exacts — même contenu, peu importe le nom ou l'emplacement. Aucune décision requise entre eux (ce sont la même donnée), mais ils gonflent le compte de fichiers.");
md.push("");
if (duplicateGroups.length === 0) {
  md.push("_Aucun doublon binaire exact détecté._");
} else {
  let gi = 0;
  for (const g of duplicateGroups.sort((a, b) => b.length - a.length)) {
    gi++;
    md.push(`### Groupe ${gi} — ${g.length} copies identiques (\`${g[0].sha256.slice(0, 12)}...\`, ${fmtSize(g[0].length)})`);
    for (const e of g) md.push(`- \`${e.fullName}\` (${e.discipline} ${e.level}, modifié ${fmtDate(e.lastWriteTime)})`);
    md.push("");
  }
}
md.push("");

md.push("## Fichiers non ouvrables (potentiellement endommagés)");
md.push("");
const broken = entries.filter(e => e.docx && e.docx.openError);
if (broken.length === 0) {
  md.push("_Aucun fichier .docx candidat n'a échoué à l'ouverture (test : lecture de l'archive ZIP interne du .docx)._");
} else {
  for (const e of broken) md.push(`- \`${e.fullName}\` — erreur : ${e.docx.openError}`);
}
md.push("");

fs.writeFileSync(MD_OUT, md.join("\n"), "utf8");

// --- CSV ---
const csvHeader = ["Discipline", "Niveau", "Categorie", "Origine", "NomFichier", "CheminComplet", "Taille_octets", "DerniereModif", "PagesCacheOuEstime", "ChapitresDetectes", "ImagesIntegrees", "MarqueursIllustration", "SHA256", "Erreur"];
const csvRows = [csvHeader.join(",")];
function csvEsc(v) {
  if (v == null) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
for (const e of entries) {
  const pages = e.docx ? (e.docx.pagesCached || "") : (e.pdf ? (e.pdf.pages ?? "") : "");
  const chap = e.docx ? (e.docx.chapterHeadingCount || 0) : "";
  const media = e.docx ? e.docx.mediaImageCount : "";
  const ill = e.docx ? (e.docx.illustrationMarkerCount || 0) : "";
  const err = e.docx && e.docx.openError ? e.docx.openError : "";
  csvRows.push([
    e.discipline, e.level, e.category, e.source, e.base, e.fullName, e.length, e.lastWriteTime,
    pages, chap, media, ill, e.sha256, err,
  ].map(csvEsc).join(","));
}
let csvActualPath = CSV_OUT;
try {
  fs.writeFileSync(CSV_OUT, csvRows.join("\n"), "utf8");
} catch (err) {
  if (err.code === "EBUSY") {
    csvActualPath = CSV_OUT.replace(".csv", `_v${Date.now()}.csv`);
    fs.writeFileSync(csvActualPath, csvRows.join("\n"), "utf8");
    console.warn(`CSV_OUT verrouillé (probablement ouvert dans Excel) — écrit à la place vers ${csvActualPath}`);
  } else {
    throw err;
  }
}

console.log(`MD -> ${MD_OUT}`);
console.log(`CSV -> ${csvActualPath}`);
console.log(`Total entries: ${entries.length}`);
console.log(`Duplicate groups: ${duplicateGroups.length}`);
console.log(`Broken docx: ${broken.length}`);
const unknownDisc = entries.filter(e => e.discipline === "INCONNU");
console.log(`Unknown discipline (should be 0): ${unknownDisc.length}`);
if (unknownDisc.length) unknownDisc.forEach(e => console.log("  ?? " + e.fullName));
