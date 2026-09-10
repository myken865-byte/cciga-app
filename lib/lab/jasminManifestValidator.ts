/**
 * Validation d'un manifeste de paquet offline (mandat Phase 1, §11).
 * Pure fonction — aucun accès réseau, aucun état. Utilisée aussi bien côté
 * client (avant téléchargement) que dans les tests.
 */

export interface LabManifestResource {
  path: string;
  type: string;
  sizeBytes: number;
  checksum: string;
}

export interface LabManifest {
  programId: string;
  niveau: string;
  unitId: string;
  unitTitle: string;
  version: string;
  langue: string;
  publishedAt: string;
  minCompatibility: string;
  status: string;
  totalSizeBytes: number;
  vocabulary: { id: string; word: string; image: string; audio: string }[];
  resources: LabManifestResource[];
  activities: string[];
}

export interface ManifestValidationResult {
  ok: boolean;
  errors: string[];
}

const APP_MANIFEST_SCHEMA_VERSION = "1.0.0";

const REQUIRED_FIELDS: (keyof LabManifest)[] = [
  "programId",
  "niveau",
  "unitId",
  "unitTitle",
  "version",
  "langue",
  "resources",
  "vocabulary",
];

function isSha256Checksum(value: string): boolean {
  return /^sha256:[0-9a-f]{64}$/.test(value);
}

/**
 * Compare deux versions "x.y.z" — retourne true si `have` est
 * suffisant pour satisfaire `required` (have >= required).
 */
function satisfiesMinVersion(have: string, required: string): boolean {
  const a = have.split(".").map(Number);
  const b = required.split(".").map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    if (av !== bv) return av > bv;
  }
  return true;
}

export function validateManifest(input: unknown): ManifestValidationResult {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: ["Manifeste illisible (pas un objet JSON)."] };
  }
  const manifest = input as Partial<LabManifest>;

  for (const field of REQUIRED_FIELDS) {
    if (manifest[field] === undefined || manifest[field] === null) {
      errors.push(`Champ obligatoire manquant : ${String(field)}`);
    }
  }
  if (errors.length > 0) return { ok: false, errors };

  // Compatibilité de version — l'app "actuelle" du prototype supporte 1.0.0.
  if (!satisfiesMinVersion(APP_MANIFEST_SCHEMA_VERSION, manifest.minCompatibility ?? "0.0.0")) {
    errors.push(
      `Unité incompatible : requiert au moins la version d'app ${manifest.minCompatibility}, prototype = ${APP_MANIFEST_SCHEMA_VERSION}.`,
    );
  }

  // Toute ressource référencée par le vocabulaire doit exister dans "resources".
  const resourcePaths = new Set((manifest.resources ?? []).map((r) => r.path));
  for (const item of manifest.vocabulary ?? []) {
    if (!resourcePaths.has(item.image)) errors.push(`Ressource manquante pour "${item.word}" : ${item.image}`);
    if (!resourcePaths.has(item.audio)) errors.push(`Ressource manquante pour "${item.word}" : ${item.audio}`);
  }

  // Format de checksum.
  for (const r of manifest.resources ?? []) {
    if (!isSha256Checksum(r.checksum)) {
      errors.push(`Checksum mal formé pour ${r.path} : ${r.checksum}`);
    }
  }

  return { ok: errors.length === 0, errors };
}

/** Vérifie un fichier téléchargé contre son checksum déclaré — détecte la corruption. */
export async function verifyResourceChecksum(blob: Blob, expectedChecksum: string): Promise<boolean> {
  if (!isSha256Checksum(expectedChecksum)) return false;
  const buffer = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hex}` === expectedChecksum;
}
