// Calls the OpenAI Images API (gpt-image-2) to generate one illustration and
// save it to disk. Never logs the API key. Reads it exclusively from
// process.env.OPENAI_API_KEY (set it via your shell, or a local .env file
// used with `node --env-file=.env ...`, consistent with this repo's other
// scripts — see scripts/apply-turso-migrations.mjs).
import fs from "node:fs";
import path from "node:path";

export const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const API_URL = "https://api.openai.com/v1/images/generations";
const MIN_DIMENSION = 512;

export class MissingApiKeyError extends Error {
  constructor() {
    super(
      "OPENAI_API_KEY n'est pas défini dans l'environnement. " +
      "Définis cette variable d'environnement (ex. dans .env puis " +
      "`node --env-file=.env scripts/eps-manuel/....mjs`, ou directement " +
      "dans le shell) avant de relancer la génération d'illustrations."
    );
    this.name = "MissingApiKeyError";
  }
}

function requireApiKey() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new MissingApiKeyError();
  return key;
}

function readPngDimensions(buf) {
  if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/**
 * Generate one image and save it to `outPath`. Does not retry — callers
 * decide retry/prompt-correction policy (see generateWithRetry below).
 * @returns {Promise<{ok: true, path: string, width: number, height: number} | {ok: false, error: string}>}
 */
export async function generateIllustration({ prompt, outPath, size = "1536x1024", quality = "medium" }) {
  const apiKey = requireApiKey();

  let response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: IMAGE_MODEL, prompt, size, quality, n: 1 }),
    });
  } catch (networkErr) {
    return { ok: false, error: `Erreur réseau lors de l'appel à l'API OpenAI : ${networkErr.message}` };
  }

  if (!response.ok) {
    let detail;
    try {
      const body = await response.json();
      detail = body?.error?.message || JSON.stringify(body);
    } catch {
      detail = await response.text().catch(() => response.statusText);
    }
    return { ok: false, error: `API OpenAI a répondu ${response.status} : ${detail}` };
  }

  const body = await response.json();
  const item = body?.data?.[0];
  if (!item) return { ok: false, error: "Réponse API sans donnée image (data[0] manquant)." };

  let buffer;
  if (item.b64_json) {
    buffer = Buffer.from(item.b64_json, "base64");
  } else if (item.url) {
    const imgRes = await fetch(item.url);
    if (!imgRes.ok) return { ok: false, error: `Échec du téléchargement de l'image depuis l'URL retournée (${imgRes.status}).` };
    buffer = Buffer.from(await imgRes.arrayBuffer());
  } else {
    return { ok: false, error: "Réponse API sans b64_json ni url exploitable." };
  }

  const dims = readPngDimensions(buffer);
  if (!dims) return { ok: false, error: "Le contenu retourné n'est pas un PNG valide." };
  if (dims.width < MIN_DIMENSION || dims.height < MIN_DIMENSION) {
    return { ok: false, error: `Image trop petite (${dims.width}x${dims.height}), minimum ${MIN_DIMENSION}px attendu.` };
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);

  return { ok: true, path: outPath, width: dims.width, height: dims.height };
}

/**
 * Generate with a small bounded retry: on failure, retries once more with a
 * corrected/reinforced prompt (safety + clarity emphasis appended). Never
 * throws for API/content failures — returns a result object so callers can
 * fall back to the placeholder brief box instead of breaking the document.
 * MissingApiKeyError still throws, since there is nothing useful to retry.
 */
export async function generateWithRetry({ prompt, outPath, size, quality, maxAttempts = 2 }) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const correctedPrompt = attempt === 1
      ? prompt
      : `${prompt} Reformulation pour clarté et sécurité : scène simple, calme, aucune ambiguïté, ` +
        "aucune violence, aucun élément dangereux, activité scolaire standard et bien encadrée.";
    const result = await generateIllustration({ prompt: correctedPrompt, outPath, size, quality });
    if (result.ok) return { ...result, attempts: attempt, promptUsed: correctedPrompt };
    lastError = result.error;
    console.error(`[generate-illustration] tentative ${attempt}/${maxAttempts} échouée : ${lastError}`);
  }
  return { ok: false, error: lastError, attempts: maxAttempts };
}
