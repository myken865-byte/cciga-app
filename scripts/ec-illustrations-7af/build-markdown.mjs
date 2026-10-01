// Génère INVENTAIRE_ILLUSTRATIONS_EC_7AF.md à partir des mêmes données
// que le registre docx/pdf (data.mjs), pour garantir une cohérence totale
// entre les livrables. Ne modifie aucun fichier du manuel EC 7e AF.
import fs from "node:fs";
import path from "node:path";
import { ILLUSTRATIONS, CHAPTERS, assignEcIds } from "./data.mjs";

const items = assignEcIds();

let md = "";
md += "# Inventaire des illustrations — Manuel d'EC 7e AF\n\n";
md += "Document source analysé : `LIVRES_EC/EC_7e_AF/09_ASSEMBLAGE/Manuel_EC_7AF_PRE-FINAL_AVANT_ILLUSTRATIONS.docx` " +
  "(version assemblée et validée la plus récente, 89 pages : 3 romaines + 86 arabes). Ce fichier ne modifie " +
  "aucun contenu du manuel.\n\n";
md += "**Périmètre** : les 29 illustrations (`ILL-EC-7AF-*`) réellement prévues dans les 7 chapitres. Les 5 " +
  "documents textuels de référence (`DOC-EC-7AF-*`) sont **hors périmètre** (textes à sourcer, pas des " +
  "illustrations).\n\n";

md += "## Index synthétique\n\n";
md += "| ID | ID verrouillé | Chap. | Page | Type | Format | Statut |\n";
md += "|---|---|---|---|---|---|---|\n";
for (const it of items) {
  md += `| ${it.ecId} | ${it.illId} | ${it.chap} | ${it.page} | ${it.type} | ${it.format.split(",")[0]} | ${it.statut.split(" — ")[0]} |\n`;
}
md += "\n";

const perChapter = CHAPTERS.map(c => ({ c, count: items.filter(it => it.chap === c.num).length }));
const promptPret = items.filter(it => it.statut.startsWith("PROMPT PRÊT")).length;
md += `**Total : ${items.length} illustrations.** ` +
  perChapter.map(p => `Chapitre ${p.c.num} : ${p.count}`).join(" · ") + ".\n\n";
md += `**PROMPT PRÊT : ${promptPret}** — À VÉRIFIER (statut nuancé) : ${items.length - promptPret}.\n\n`;
md += "**Doublons potentiels** : aucun doublon exact. Deux familles de gabarits récurrents (7 « Synthèse » / " +
  "cartes mentales, 7 « Espace de production » / cadres vides) partagent un même format visuel mais un " +
  "contenu distinct à chaque occurrence — conservées, non fusionnées (voir `AUDIT_ILLUSTRATIONS_EC_7AF.md`).\n\n";

md += "---\n\n";

for (const it of items) {
  const chapMeta = CHAPTERS.find(c => c.num === it.chap);
  md += `## ${it.ecId} — ${it.illId}\n\n`;
  md += `- **Chapitre** : ${it.chap} — ${chapMeta.title}\n`;
  md += `- **Section** : ${it.section}\n`;
  md += `- **Page / emplacement** : page ${it.page} du manuel assemblé (chapitre ${it.chap} : p.${chapMeta.pageStart}-${chapMeta.pageEnd})\n`;
  md += `- **Type d'image** : ${it.type}\n`;
  md += `- **Objectif pédagogique** : ${it.objectif}\n`;
  md += `- **Notion à illustrer** : ${it.notion}\n`;
  md += `- **Personnages nécessaires** : ${it.personnages}\n`;
  md += `- **Lieu / environnement** : ${it.lieu}\n`;
  md += `- **Action / scène** : ${it.action}\n`;
  md += `- **Objets / éléments obligatoires** : ${it.objets}\n`;
  md += `- **Éléments interdits** : ${it.interdits}\n`;
  md += `- **Texte visible autorisé** : ${it.texte}\n`;
  md += `- **Orientation / format recommandé** : ${it.format}\n`;
  md += `- **Niveau de réalisme** : ${it.realisme}\n`;
  md += `- **Statut** : ${it.statut}\n\n`;
  md += "**PROMPT COMPLET POUR CHATGPT :**\n\n";
  md += "> " + it.prompt.replace(/\n/g, " ") + "\n\n";
  md += "---\n\n";
}

const outDir = "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\13_ILLUSTRATIONS_INVENTAIRE";
const outPath = path.join(outDir, "INVENTAIRE_ILLUSTRATIONS_EC_7AF.md");
fs.writeFileSync(outPath, md, "utf-8");
console.log("OK ->", outPath, md.length, "chars");
