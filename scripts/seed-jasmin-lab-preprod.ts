// Phase 2 (Jasmine Kindergarten English Program, 2026-09-09) — contenu de
// démonstration pour l'unité "Colors Around Me" (Petite Section), PREPROD
// uniquement. Aucune donnée d'enfant réelle : ce script ne crée aucune ligne
// User, seulement du contenu pédagogique (LearningUnit/Activity/MediaAsset/
// OfflinePackageManifest), statut "brouillon" — jamais publié publiquement.
//
// Idempotent : peut être relancé sans dupliquer (upsert sur les clés
// uniques slug/unitId+path/unitId+version).
//
// Run this yourself against preprod — it never runs on its own.
// Usage : node --env-file=.env.preprod --import tsx scripts/seed-jasmin-lab-preprod.ts

import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { readFileSync } from "fs";
import path from "path";

const projectRoot = path.join(__dirname, "..");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Load your .env.preprod first (--env-file=.env.preprod).");
  process.exit(1);
}

const adapter = new PrismaLibSql({ url, authToken: process.env.TURSO_AUTH_TOKEN });
const prisma = new PrismaClient({ adapter });

interface LabManifest {
  unitId: string;
  unitTitle: string;
  version: string;
  minCompatibility: string;
  totalSizeBytes: number;
  vocabulary: { id: string }[];
  resources: { path: string; type: string; sizeBytes: number; checksum: string }[];
  activities: string[];
}

const manifest: LabManifest = JSON.parse(
  readFileSync(path.join(projectRoot, "public", "lab-jasmin-offline", "manifest.json"), "utf8"),
);

const PETITE_SECTION_SLUG = "prescolaire-petite-section";

const ACTIVITY_TITLES: Record<string, string> = {
  recognition: "Reconnaissance des couleurs",
  matching: "Association mot ↔ couleur",
  "mini-assessment": "Mini-évaluation",
};

async function main() {
  const program = await prisma.program.findUnique({ where: { slug: PETITE_SECTION_SLUG } });
  if (!program) {
    console.error(`Programme "${PETITE_SECTION_SLUG}" introuvable sur cette base — abandon (aucune écriture).`);
    process.exit(1);
  }
  console.log(`Programme cible : ${program.name} (${program.id}), school=${program.school}, niveau=${program.niveau}`);

  const unit = await prisma.learningUnit.upsert({
    where: { slug: manifest.unitId },
    update: { title: manifest.unitTitle, programId: program.id },
    create: {
      slug: manifest.unitId,
      title: manifest.unitTitle,
      programId: program.id,
      order: 1,
      status: "brouillon",
    },
  });
  console.log(`LearningUnit : ${unit.title} (${unit.id}), statut=${unit.status}`);

  let activityOrder = 1;
  for (const slug of manifest.activities) {
    const activity = await prisma.activity.upsert({
      where: { unitId_slug: { unitId: unit.id, slug } },
      update: { title: ACTIVITY_TITLES[slug] ?? slug },
      create: {
        unitId: unit.id,
        slug,
        type: slug === "mini-assessment" ? "mini_assessment" : slug,
        title: ACTIVITY_TITLES[slug] ?? slug,
        order: activityOrder++,
        config: JSON.stringify({ vocabulary: manifest.vocabulary.map((v) => v.id) }),
      },
    });
    console.log(`  Activity : ${activity.title} (${activity.id})`);
  }

  let assetCount = 0;
  for (const resource of manifest.resources) {
    await prisma.mediaAsset.upsert({
      where: { unitId_path: { unitId: unit.id, path: resource.path } },
      update: { checksum: resource.checksum, sizeBytes: resource.sizeBytes, type: resource.type },
      create: {
        unitId: unit.id,
        path: resource.path,
        type: resource.type,
        sizeBytes: resource.sizeBytes,
        checksum: resource.checksum,
      },
    });
    assetCount++;
  }
  console.log(`  MediaAsset : ${assetCount} ressource(s) enregistrée(s).`);

  const packageManifest = await prisma.offlinePackageManifest.upsert({
    where: { unitId_version: { unitId: unit.id, version: manifest.version } },
    update: { minCompatibility: manifest.minCompatibility, totalSizeBytes: manifest.totalSizeBytes },
    create: {
      unitId: unit.id,
      version: manifest.version,
      status: "brouillon",
      minCompatibility: manifest.minCompatibility,
      totalSizeBytes: manifest.totalSizeBytes,
    },
  });
  console.log(`  OfflinePackageManifest : v${packageManifest.version}, statut=${packageManifest.status}`);

  console.log("\nContenu de démonstration prêt (statut brouillon — jamais publié, jamais visible du public).");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
