// Extracts the full illustration-brief text (ID, title, description, objective, orientation,
// legend) already embedded as an "encadré-brief" placeholder in the manuscript, for manuals whose
// illustrations are still largely missing. Read-only — does not touch the source file.
import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";

const TARGETS = [
  { disc: "EEA", lvl: "7AF", file: "Manuel_EEA_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx" },
  { disc: "EEA", lvl: "8AF", file: "Manuel_EEA_8AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx" },
  { disc: "ETAP", lvl: "7AF", file: "Manuel_ETAP_7AF_2026_2027_PRE-FINAL_AVANT_ILLUSTRATIONS.docx" },
  { disc: "ETAP", lvl: "8AF", file: "Manuel_ETAP_8AF_2026_2027_PRE-FINAL_AVANT_ILLUSTRATIONS.docx" },
];
const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";

function decodeXmlEntities(s) {
  if (!s) return s;
  return s
    .replace(/&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function fieldAfter(block, labelPattern) {
  const re = new RegExp(`(?:${labelPattern})\\s*:\\s*\\|?([^|]+)`, "i");
  const m = block.match(re);
  return m && m[1] ? decodeXmlEntities(m[1].trim()) : null;
}

async function extractFrom(filePath) {
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  const docXml = await zip.file("word/document.xml").async("string");
  const plain = docXml.replace(/<[^>]+>/g, "|").replace(/\|+/g, "|");

  const idRe = /ILL-([A-Z]+)-(\d+[A-Z]+)-C(\d+)-(\d+)\s*—\s*([^|]+)/g;
  const matches = [...plain.matchAll(idRe)];
  const results = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const start = m.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : Math.min(plain.length, start + 3000);
    const block = plain.slice(start, end);

    // "Emplacement exact" proxy: the nearest numbered sub-section heading (e.g. "1.2") found in
    // the ~400 chars immediately before this marker — gives a real in-chapter position instead of
    // just repeating the generic "réservé" bracket text every document.docx carries verbatim.
    const before = plain.slice(Math.max(0, start - 400), start);
    const headingMatches = [...before.matchAll(/\b(\d+\.\d+)\s+([A-ZÉÈÀÂÊÎÔÛ][^|]{3,60})/g)];
    const nearestHeading = headingMatches.length ? headingMatches[headingMatches.length - 1] : null;

    results.push({
      id: `ILL-${m[1]}-${m[2]}-C${m[3]}-${m[4]}`,
      chapitre: Number(m[3]),
      titre: decodeXmlEntities(m[5].trim()),
      description: fieldAfter(block, "Description visuelle"),
      objectif: fieldAfter(block, "Objectif p[eé]dagogique|Fonction p[eé]dagogique"),
      orientation: fieldAfter(block, "Orientation\\s*/\\s*format"),
      legende: fieldAfter(block, "L[eé]gende"),
      emplacement: nearestHeading
        ? `Chapitre ${m[3]}, après la section ${nearestHeading[1]} (${decodeXmlEntities(nearestHeading[2].trim())})`
        : `Chapitre ${m[3]}, section précise non détectée automatiquement — à vérifier manuellement`,
    });
  }
  return results;
}

async function main() {
  for (const t of TARGETS) {
    const filePath = path.join(ROOT, "05_A_VERIFIER_MANUELLEMENT", `${t.disc}_${t.lvl}`, t.file);
    if (!fs.existsSync(filePath)) {
      console.error(`INTROUVABLE: ${filePath}`);
      continue;
    }
    const briefs = await extractFrom(filePath);
    console.log(`${t.disc} ${t.lvl}: ${briefs.length} briefs extraits depuis ${t.file}`);

    const md = [];
    md.push(`# ${t.disc} ${t.lvl} — Liste des illustrations manquantes`);
    md.push("");
    md.push(`Source : \`${t.file}\` (version principale de travail, chemin d'origine documenté dans INVENTAIRE_12_MANUELS.md / JOURNAL_COPIES_PHASE2.md).`);
    md.push("");
    md.push(`**${briefs.length} illustrations recensées, toutes au statut MANQUANTE** (encadré-brief présent dans le texte, aucune image insérée à sa place). Aucune image n'a été créée ni insérée — cette liste sert de base de travail pour une future production (ChatGPT + insertion manuelle, comme pour les autres manuels de la collection).`);
    md.push("");
    md.push("| Identifiant | Chapitre | Titre | Brief (description visuelle) | Objectif pédagogique | Emplacement | Légende | Statut |");
    md.push("|---|---|---|---|---|---|---|---|");
    for (const b of briefs) {
      md.push(`| ${b.id} | ${b.chapitre} | ${b.titre} | ${b.description || "—"} | ${b.objectif || "—"} | ${b.emplacement} | ${b.legende || "—"} | MANQUANTE |`);
    }
    md.push("");

    const outDir = path.join(ROOT, "03_ILLUSTRATIONS_MANQUANTES", t.disc);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${t.disc}_${t.lvl}_ILLUSTRATIONS_MANQUANTES.md`), md.join("\n"), "utf8");
  }
}

main();
