// CLI: generate one or more illustrations (any chapter 1-10) via the OpenAI
// Images API and update the manifest. Usage:
//
//   node scripts/eps-manuel/run-illustration.mjs 7 1        # generate chapter 7, illustration 1 only
//   node scripts/eps-manuel/run-illustration.mjs 7 missing  # generate every not-yet-validated illustration of chapter 7
//
// Requires OPENAI_API_KEY in the environment (see generate-illustration.mjs).
// Never prints the key. Status flow per illustration: pending -> generated
// (needs visual QC, done separately by reviewing the PNG) -> validated
// (only set by scripts/eps-manuel/mark-validated.mjs after review) | failed.
import path from "node:path";
import fs from "node:fs";
import { generateWithRetry, MissingApiKeyError } from "./generate-illustration.mjs";
import { loadManifest, saveManifest, upsertEntry, getEntry, chapterKey } from "./manifest.mjs";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\cciga app";

function outDirFor(chapterNum) {
  return path.join(ROOT, "assets", "illustrations", chapterKey(chapterNum));
}

async function run() {
  const [, , chapterArg, illArg] = process.argv;
  const chapterNum = Number(chapterArg);
  if (!chapterNum || chapterNum < 1 || chapterNum > 10) {
    console.error("Usage: node run-illustration.mjs <chapitre 1-10> [<numéro>|missing]");
    process.exit(1);
  }

  let CHAPITRE, ILLUSTRATIONS, promptFor;
  try {
    ({ CHAPITRE, ILLUSTRATIONS, promptFor } = await import(`./prompts-chapitre${chapterNum}.mjs`));
  } catch (err) {
    console.error(`Impossible de charger prompts-chapitre${chapterNum}.mjs : ${err.message}`);
    process.exit(1);
  }
  if (CHAPITRE !== chapterNum) {
    console.error(`prompts-chapitre${chapterNum}.mjs déclare CHAPITRE=${CHAPITRE}, incohérent avec l'argument ${chapterNum}.`);
    process.exit(1);
  }

  let targets;
  if (illArg === "missing" || !illArg) {
    const manifest = loadManifest();
    targets = ILLUSTRATIONS.filter(ill => {
      const entry = getEntry(manifest, chapterNum, ill.numero);
      return !entry || entry.statut !== "validated";
    });
    console.log(`Illustrations à générer (statut != validated) : ${targets.map(t => t.numero).join(", ") || "aucune"}`);
  } else {
    const num = Number(illArg);
    const found = ILLUSTRATIONS.find(i => i.numero === num);
    if (!found) {
      console.error(`Illustration ${num} introuvable pour le Chapitre ${chapterNum}.`);
      process.exit(1);
    }
    targets = [found];
  }

  if (targets.length === 0) {
    console.log("Rien à faire — toutes les illustrations demandées sont déjà validées.");
    return;
  }

  for (const ill of targets) {
    const prompt = promptFor(ill);
    const outPath = path.join(outDirFor(chapterNum), ill.nomFichier);
    console.log(`\n--- Illustration ${chapterNum}.${ill.numero} → ${ill.nomFichier} ---`);

    let result;
    try {
      result = await generateWithRetry({ prompt, outPath, size: ill.size || "1536x1024", quality: "medium" });
    } catch (err) {
      if (err instanceof MissingApiKeyError) {
        console.error(`\n${err.message}`);
        process.exit(2);
      }
      throw err;
    }

    const manifest = loadManifest();
    if (result.ok) {
      upsertEntry(manifest, chapterNum, ill.numero, {
        nomFichier: ill.nomFichier,
        cheminFichier: path.relative(ROOT, result.path),
        prompt,
        legende: ill.legende,
        emplacement: ill.emplacement,
        modele: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
        dimensions: `${result.width}x${result.height}`,
        tentatives: result.attempts,
        statut: "generated",
        date: new Date().toISOString(),
      });
      console.log(`OK -> ${result.path} (${result.width}x${result.height}, ${result.attempts} tentative(s)). Statut: generated (en attente de revue visuelle).`);
    } else {
      upsertEntry(manifest, chapterNum, ill.numero, {
        nomFichier: ill.nomFichier,
        prompt,
        legende: ill.legende,
        emplacement: ill.emplacement,
        modele: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
        statut: "failed",
        erreur: result.error,
        date: new Date().toISOString(),
      });
      console.error(`ÉCHEC : ${result.error}. Statut: failed — le chapitre gardera l'encadré-brief pour cette illustration.`);
    }
    saveManifest(manifest);
  }
}

run().catch(err => {
  console.error("Erreur inattendue :", err.message);
  process.exit(1);
});
