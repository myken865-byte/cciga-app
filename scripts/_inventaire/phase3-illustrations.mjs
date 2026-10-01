import fs from "node:fs";
import path from "node:path";
import { detectDiscipline, detectLevel, detectCategory, detectKind } from "./classify.mjs";

const META_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_metadata.json";
const DEEP_PATH = "C:\\Users\\Me. Alcide\\Desktop\\_inventaire_deep_compare.json";
const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";

const allEntries = JSON.parse(fs.readFileSync(META_PATH, "utf8"));
for (const e of allEntries) {
  e.discipline = detectDiscipline(e.base);
  e.level = detectLevel(e.base);
  e.category = detectCategory(e.base);
  e.kind = detectKind(e.category, e);
}
const deepEntries = JSON.parse(fs.readFileSync(DEEP_PATH, "utf8"));
const deepByHash = new Map(deepEntries.map(e => [e.sha256, e]));

const DISCIPLINES = ["EPS", "EEA", "ETAP", "EC"];
const LEVELS = ["7AF", "8AF", "9AF"];

const md = ["# ÉTAT DES ILLUSTRATIONS — Vue d'ensemble des 12 manuels (Phase de Travail 3)", "",
  "**Limite méthodologique importante** : ceci compare un NOMBRE d'emplacements d'illustration déclarés (texte détecté du type `ILL-...` ou `Illustration N.M`) à un NOMBRE d'images réellement intégrées dans le meilleur candidat trouvé pour ce manuel. Ce n'est PAS une vérification que chaque image correspond au bon emplacement, ni un contrôle visuel de qualité — cela viendra en Phase 10 une fois une version confirmée. Une correspondance nombre-pour-nombre n'exclut pas une image mal placée ou dupliquée ; un écart n'exclut pas non plus une fausse mesure (le texte de repérage peut avoir été supprimé lors de l'intégration d'une image sans que ce soit un problème).",
  "",
  "| Manuel | Emplacements déclarés (max observé, tous candidats) | Meilleur candidat pour les images | Images intégrées (ce candidat) | Écart | Statut provisoire |",
  "|---|---|---|---|---|---|"];

const rows = [];

for (const disc of DISCIPLINES) {
  for (const lvl of LEVELS) {
    const manualEntries = allEntries.filter(e => e.discipline === disc && e.level === lvl && e.kind === "manuscrit_complet" && e.docx);
    const maxMarkers = Math.max(0, ...manualEntries.map(e => e.docx?.illustrationMarkerCount || 0));

    // Best candidate = most embedded images among all manuscrit_complet candidates (docx media count
    // or pdf approx image objects), regardless of Phase-3 "recommended" version — we want the ceiling
    // on what's actually been produced anywhere, to know if illustration work is done at all.
    const allManuscripts = allEntries.filter(e => e.discipline === disc && e.level === lvl && e.kind === "manuscrit_complet");
    let best = null, bestImages = -1;
    for (const e of allManuscripts) {
      const d = deepByHash.get(e.sha256);
      const imgs = e.ext.toLowerCase() === ".pdf" ? (d?.deep?.approxImageObjectCount ?? 0) : (e.docx?.mediaImageCount ?? 0);
      if (imgs > bestImages) { bestImages = imgs; best = e; }
    }

    const gap = maxMarkers > 0 ? bestImages - maxMarkers : null;
    let statut;
    if (bestImages <= 0) statut = "MANQUANTE (aucune image trouvée dans aucun candidat)";
    else if (maxMarkers === 0) statut = `IMAGES PRÉSENTES (${bestImages}) mais nombre d'emplacements attendus indéterminé (aucun marqueur texte trouvé — normal si toutes les images ont déjà remplacé leur encadré-brief)`;
    else if (gap >= 0) statut = "PROBABLEMENT COMPLÈTE (images ≥ emplacements déclarés)";
    else statut = `PARTIELLE (${-gap} de moins que déclaré)`;

    md.push(`| ${disc} ${lvl} | ${maxMarkers || "—"} | \`${best ? best.base : "aucun"}\` | ${bestImages >= 0 ? bestImages : "—"} | ${gap != null ? gap : "n/a"} | ${statut} |`);
    rows.push({ disc, lvl, maxMarkers, bestImages, statut });
  }
}

md.push("");
md.push("## Constat marquant");
md.push("");
md.push("Plusieurs manuels montrent des images intégrées dans un fichier **PDF** récent alors qu'AUCUN fichier .docx correspondant du même niveau de complétude n'existe avec ces mêmes images. Concrètement : le PDF le plus avancé n'a pas de source .docx éditable à jour derrière lui. Si une correction textuelle est nécessaire plus tard, il faudra soit repartir du .docx moins illustré et réinsérer les images, soit traiter le PDF comme la seule source de vérité (non éditable facilement). Cas observés : EEA 9AF (43 images dans le PDF réorganisé, 10 seulement dans les .docx), ETAP 9AF (39 images dans le PDF corrigé final, 1 seule dans le .docx). À clarifier avec vous avant toute correction.");
md.push("");

fs.writeFileSync(path.join(ROOT, "00_RAPPORT_GENERAL", "ETAT_ILLUSTRATIONS_12_MANUELS.md"), md.join("\n"), "utf8");
console.log(md.join("\n"));
