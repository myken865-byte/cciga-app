// Phase C2 — attribution institutionnelle CONTRÔLÉE sur PREPROD uniquement.
// Mandat "Prompt_Claude_Code_Phase_C2_Attribution_Institutionnelle_Controlee_
// PREPROD_SIGA_App" (2026-09-08).
//
// Principe (repris tel quel du mandat) :
//   - Une ligne n'est attribuée que si son institution peut être déterminée
//     AVEC CERTITUDE à partir d'une relation directe déjà présente en base.
//   - Aucune déduction, aucune supposition. Un signal absent OU contradictoire
//     laisse la ligne school = NULL, classée AMBIGU / À ARBITRER.
//   - `school` reste nullable partout (aucun passage en NOT NULL ici).
//   - Aucune suppression, aucune donnée artificielle, PREPROD uniquement.
//
// Règles d'attribution utilisées (documentées aussi dans le rapport JSON,
// par ligne) :
//
//   R1 — Élève/apprenant déjà rattaché à un programme :
//        <Table>.<studentOrUserField> → User.programId → Program.school
//        (Badge, InfirmaryVisit, PsychosocialCase, InventoryItem via
//        assignedToId — quand l'utilisateur lié est un élève inscrit).
//
//   R2 — Personnel dont l'activité d'enseignement/direction ne pointe que
//        vers UNE SEULE école (aucun mélange) :
//        User.coursesTaught[].course.program.school
//        ∪ User.titulaireOf[].school
//        ∪ User.coordinatedPrograms[].school
//        Si cet ensemble contient exactement 1 valeur distincte → attribution.
//        S'il en contient 0 → aucun signal (AMBIGU). S'il en contient ≥2 →
//        signaux contradictoires, refus explicite d'arbitrer (AMBIGU).
//        (Employee, et tout autre modèle lié à un User par userId.)
//
//   R3 — Modèles "catalogue" sans propriétaire institutionnel direct dans le
//        schéma actuel (Book, Vehicle, CanteenMenu) : AUCUNE relation fiable
//        n'existe pour déterminer l'institution (un livre/véhicule/menu n'est
//        pas intrinsèquement lié à un élève précis). Explicitement laissé
//        AMBIGU pour toutes les lignes — na pas déduire depuis un seul
//        emprunteur/passager/réservataire, ce serait une supposition.
//
//   R4 — Dénormalisation stricte pour les tables enfants (BookLoan ←
//        Book.school, TransportAssignment ← Vehicle.school,
//        CanteenReservation ← CanteenMenu.school) : copie EXACTE de l'école
//        du parent une fois celui-ci résolu (jamais déduite de l'emprunteur/
//        élève/réservataire lui-même — cf. commentaires du schéma Prisma).
//        Si le parent reste NULL (R3), l'enfant reste NULL aussi.
//
// Run this yourself against devtest — it never runs on its own.
//
// Usage (depuis la racine du projet) :
//   node --env-file=.env.preprod scripts/phase-c2-backfill.mjs
//     → aperçu complet (plan détaillé, comptages, cas ambigus), AUCUNE écriture.
//   node --env-file=.env.preprod scripts/phase-c2-backfill.mjs --apply
//     → applique réellement les attributions fiables, dans une seule
//     transaction. Rien n'est écrit pour les lignes ambiguës (déjà NULL).

import { createClient } from "@libsql/client";
import { writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const apply = process.argv.includes("--apply");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Load your .env.preprod first (--env-file=.env.preprod).");
  process.exit(1);
}

const backupsDir = path.join(projectRoot, "backups");
const hasPhaseC2Backup =
  existsSync(backupsDir) && readdirSync(backupsDir).some((d) => d.startsWith("phase-c2-"));
if (!hasPhaseC2Backup) {
  console.error(
    "Aucune sauvegarde Phase C2 trouvée dans backups/phase-c2-*. " +
      "Lancez d'abord : node --env-file=.env.preprod scripts/phase-c2-backup.mjs",
  );
  process.exit(1);
}

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const VALID_SCHOOLS = new Set(["ecole-classique", "ecole-professionnelle", "universite"]);

// --- Chargement en mémoire (lecture seule) des relations nécessaires -------

const programRows = (await client.execute(`SELECT id, school FROM Program`)).rows;
const programSchoolById = new Map(programRows.map((p) => [p.id, p.school]));

const userRows = (await client.execute(`SELECT id, programId FROM User`)).rows;
const userProgramId = new Map(userRows.map((u) => [Number(u.id), u.programId]));

const coursesRows = (await client.execute(`SELECT id, programId, teacherId FROM Course WHERE teacherId IS NOT NULL`)).rows;
const coursesByTeacher = new Map();
for (const c of coursesRows) {
  const key = Number(c.teacherId);
  if (!coursesByTeacher.has(key)) coursesByTeacher.set(key, []);
  coursesByTeacher.get(key).push(c);
}

const titulaireRows = (await client.execute(`SELECT id, school, titulaireId FROM Program WHERE titulaireId IS NOT NULL`)).rows;
const titulaireByUser = new Map();
for (const p of titulaireRows) {
  const key = Number(p.titulaireId);
  if (!titulaireByUser.has(key)) titulaireByUser.set(key, []);
  titulaireByUser.get(key).push(p);
}

const coordinatorRows = (await client.execute(`SELECT id, school, coordinatorId FROM Program WHERE coordinatorId IS NOT NULL`)).rows;
const coordinatorByUser = new Map();
for (const p of coordinatorRows) {
  const key = Number(p.coordinatorId);
  if (!coordinatorByUser.has(key)) coordinatorByUser.set(key, []);
  coordinatorByUser.get(key).push(p);
}

// --- R1 + R2 : résolution d'un utilisateur vers une école, ou AMBIGU -------

function resolveUserSchool(userId) {
  const signals = []; // { school, rule }

  const programId = userProgramId.get(Number(userId));
  if (programId) {
    const school = programSchoolById.get(programId);
    if (school) signals.push({ school, rule: `R1: User(${userId}).programId=${programId} → Program.school=${school}` });
  }

  for (const c of coursesByTeacher.get(Number(userId)) ?? []) {
    const school = programSchoolById.get(c.programId);
    if (school) signals.push({ school, rule: `R2: User(${userId}).coursesTaught Course(${c.id}) → Program(${c.programId}).school=${school}` });
  }
  for (const p of titulaireByUser.get(Number(userId)) ?? []) {
    if (p.school) signals.push({ school: p.school, rule: `R2: User(${userId}).titulaireOf Program(${p.id}).school=${p.school}` });
  }
  for (const p of coordinatorByUser.get(Number(userId)) ?? []) {
    if (p.school) signals.push({ school: p.school, rule: `R2: User(${userId}).coordinatedPrograms Program(${p.id}).school=${p.school}` });
  }

  const distinctSchools = [...new Set(signals.map((s) => s.school))];

  if (distinctSchools.length === 1) {
    return {
      school: distinctSchools[0],
      status: "ATTRIBUE",
      rule: signals.map((s) => s.rule).join(" ; "),
    };
  }
  if (distinctSchools.length === 0) {
    return { school: null, status: "AMBIGU", rule: `Aucun signal fiable : User(${userId}) n'a ni programme d'inscription, ni cours enseigné, ni titulariat, ni coordination rattachés à une école.` };
  }
  return {
    school: null,
    status: "AMBIGU",
    rule: `Signaux contradictoires pour User(${userId}) : ${distinctSchools.join(", ")} — refus d'arbitrer automatiquement.`,
  };
}

// --- Plan par table ----------------------------------------------------

const auditTrail = []; // { table, id, before, after, rule, status }
const updatesByTable = new Map(); // table -> [{id, school}]
const resolvedParentSchool = new Map(); // `${table}:${id}` -> school|null (pour dénormalisation)

async function planUserLinkedTable(table, userField, { nullableUser = false } = {}) {
  const rows = (await client.execute(`SELECT id, "${userField}", school FROM "${table}"`)).rows;
  const updates = [];
  for (const row of rows) {
    const userId = row[userField];
    let outcome;
    if (userId === null || userId === undefined) {
      if (!nullableUser) throw new Error(`${table}.${userField} est NULL alors que le champ est requis par le schéma — incohérence à examiner manuellement.`);
      outcome = { school: null, status: "AMBIGU", rule: `${table}(${row.id}).${userField} est NULL (aucune affectation) — rien à résoudre.` };
    } else {
      outcome = resolveUserSchool(userId);
    }
    auditTrail.push({ table, id: row.id, before: row.school, after: outcome.school, status: outcome.status, rule: outcome.rule });
    resolvedParentSchool.set(`${table}:${row.id}`, outcome.school);
    if (outcome.status === "ATTRIBUE" && row.school === null) {
      updates.push({ id: row.id, school: outcome.school });
    }
  }
  updatesByTable.set(table, updates);
  return rows.length;
}

async function planCatalogTable(table, reason) {
  const rows = (await client.execute(`SELECT id, school FROM "${table}"`)).rows;
  for (const row of rows) {
    auditTrail.push({ table, id: row.id, before: row.school, after: null, status: "AMBIGU", rule: reason });
    resolvedParentSchool.set(`${table}:${row.id}`, null);
  }
  updatesByTable.set(table, []);
  return rows.length;
}

async function planDenormalizedTable(table, parentTable, parentIdField) {
  const rows = (await client.execute(`SELECT id, "${parentIdField}", school FROM "${table}"`)).rows;
  const updates = [];
  for (const row of rows) {
    const parentId = row[parentIdField];
    const parentSchool = resolvedParentSchool.get(`${parentTable}:${parentId}`) ?? null;
    const rule = parentSchool
      ? `R4: copie dénormalisée de ${parentTable}(${parentId}).school=${parentSchool}`
      : `R4: ${parentTable}(${parentId}).school reste NULL (AMBIGU) — dénormalisation impossible, aucune déduction depuis l'emprunteur/élève.`;
    auditTrail.push({ table, id: row.id, before: row.school, after: parentSchool, status: parentSchool ? "ATTRIBUE" : "AMBIGU", rule });
    if (parentSchool && row.school === null) updates.push({ id: row.id, school: parentSchool });
  }
  updatesByTable.set(table, updates);
  return rows.length;
}

const tableTotals = {};

tableTotals.Badge = await planUserLinkedTable("Badge", "userId");
tableTotals.Employee = await planUserLinkedTable("Employee", "userId");
tableTotals.InfirmaryVisit = await planUserLinkedTable("InfirmaryVisit", "studentId");
tableTotals.PsychosocialCase = await planUserLinkedTable("PsychosocialCase", "studentId");
tableTotals.InventoryItem = await planUserLinkedTable("InventoryItem", "assignedToId", { nullableUser: true });

tableTotals.Book = await planCatalogTable(
  "Book",
  "R3: aucune relation fiable — un ouvrage de catalogue n'est pas intrinsèquement lié à un élève ou une école ; attribuer depuis un seul emprunteur serait une supposition.",
);
tableTotals.Vehicle = await planCatalogTable(
  "Vehicle",
  "R3: aucune relation fiable — un véhicule n'est pas intrinsèquement lié à un élève ou une école dans le schéma actuel.",
);
tableTotals.CanteenMenu = await planCatalogTable(
  "CanteenMenu",
  "R3: aucune relation fiable — un menu n'est pas intrinsèquement lié à un élève ou une école dans le schéma actuel.",
);

tableTotals.BookLoan = await planDenormalizedTable("BookLoan", "Book", "bookId");
tableTotals.TransportAssignment = await planDenormalizedTable("TransportAssignment", "Vehicle", "vehicleId");
tableTotals.CanteenReservation = await planDenormalizedTable("CanteenReservation", "CanteenMenu", "menuId");

// --- Résumé par table ----------------------------------------------------

function summarize(table) {
  const rows = auditTrail.filter((a) => a.table === table);
  const total = rows.length;
  const byInstitution = { "ecole-classique": 0, "ecole-professionnelle": 0, "universite": 0 };
  let ambigu = 0;
  for (const r of rows) {
    if (r.status === "ATTRIBUE" && VALID_SCHOOLS.has(r.after)) byInstitution[r.after]++;
    else ambigu++;
  }
  return { total, ...byInstitution, ambigu };
}

const ALL_TABLES = [
  "Badge",
  "Employee",
  "InfirmaryVisit",
  "PsychosocialCase",
  "InventoryItem",
  "Book",
  "BookLoan",
  "Vehicle",
  "TransportAssignment",
  "CanteenMenu",
  "CanteenReservation",
];

console.log(`Phase C2 — plan d'attribution institutionnelle (PREPROD)\n`);
console.log(
  "Table".padEnd(22) +
    "Total".padStart(7) +
    "ÉcoleClass.".padStart(13) +
    "ÉcoleProf.".padStart(12) +
    "Université".padStart(12) +
    "Ambigu".padStart(9),
);
const summaries = {};
for (const table of ALL_TABLES) {
  const s = summarize(table);
  summaries[table] = s;
  console.log(
    table.padEnd(22) +
      String(s.total).padStart(7) +
      String(s["ecole-classique"]).padStart(13) +
      String(s["ecole-professionnelle"]).padStart(12) +
      String(s.universite).padStart(12) +
      String(s.ambigu).padStart(9),
  );
}

const ambiguousRows = auditTrail.filter((a) => a.status === "AMBIGU");
const attributedRows = auditTrail.filter((a) => a.status === "ATTRIBUE");

console.log(`\nTotal lignes examinées : ${auditTrail.length}`);
console.log(`Attribuables avec certitude : ${attributedRows.length}`);
console.log(`Restent AMBIGU / À ARBITRER : ${ambiguousRows.length}`);

// --- Rapport JSON (toujours écrit, aperçu ou réel) ------------------------

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const reportDir = path.join(projectRoot, "reports", `phase-c2-${timestamp}${apply ? "" : "-preview"}`);
mkdirSync(reportDir, { recursive: true });
writeFileSync(path.join(reportDir, "audit-trail.json"), JSON.stringify(auditTrail, null, 2), "utf8");
writeFileSync(path.join(reportDir, "ambiguous.json"), JSON.stringify(ambiguousRows, null, 2), "utf8");
writeFileSync(path.join(reportDir, "attributed.json"), JSON.stringify(attributedRows, null, 2), "utf8");
writeFileSync(
  path.join(reportDir, "summary.json"),
  JSON.stringify({ timestamp, applied: apply, tables: summaries }, null, 2),
  "utf8",
);
console.log(`\nRapport écrit dans : ${path.relative(projectRoot, reportDir)}/`);

if (!apply) {
  console.log(`\nMode aperçu uniquement — AUCUNE écriture effectuée sur la base.`);
  console.log(`Relancer avec --apply pour appliquer les ${attributedRows.length} attribution(s) fiable(s) ci-dessus.`);
  client.close();
  process.exit(0);
}

if (attributedRows.length === 0) {
  console.log(`\nAucune attribution fiable à appliquer — rien à écrire. La base n'est pas modifiée.`);
  client.close();
  process.exit(0);
}

// --- Application réelle (une seule transaction) ---------------------------

console.log(`\nApplication de ${attributedRows.length} attribution(s) fiable(s), en une seule transaction…`);
const tx = await client.transaction("write");
try {
  for (const [table, updates] of updatesByTable) {
    for (const u of updates) {
      await tx.execute({ sql: `UPDATE "${table}" SET school = ? WHERE id = ? AND school IS NULL`, args: [u.school, u.id] });
    }
  }
  await tx.commit();
  console.log("OK — transaction validée.");
} catch (err) {
  await tx.rollback();
  console.error(`ÉCHEC — transaction annulée, aucune donnée modifiée : ${err.message}`);
  client.close();
  process.exit(1);
} finally {
  tx.close();
}

// --- Vérification post-application -----------------------------------

console.log(`\nVérification post-application…`);
let verifyOk = true;
for (const table of ALL_TABLES) {
  const rows = (await client.execute(`SELECT id, school FROM "${table}"`)).rows;
  const schoolById = new Map(rows.map((r) => [r.id, r.school]));
  for (const a of auditTrail.filter((x) => x.table === table)) {
    const actual = schoolById.get(a.id) ?? null;
    const expected = a.status === "ATTRIBUE" ? a.after : a.before; // AMBIGU rows: unchanged
    if (actual !== expected) {
      verifyOk = false;
      console.error(`  DIVERGENCE ${table}(${a.id}) : attendu ${expected}, trouvé ${actual}`);
    }
  }
}
console.log(verifyOk ? "Vérification RÉUSSIE — la base reflète exactement le plan appliqué." : "ÉCHEC de vérification — voir divergences ci-dessus.");

client.close();
process.exit(verifyOk ? 0 : 1);
