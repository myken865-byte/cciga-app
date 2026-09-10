import { NextResponse } from "next/server";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isJasminKindergartenModuleEnabled } from "@/lib/labFeatureFlags";
import { JASMIN_DEMO_STUDENT_ID } from "@/lib/lab/jasminLabConstants";
import { hasRole, parseRoles } from "@/lib/roles";

/**
 * Point de synchronisation RÉEL pour le module Jasmine Kindergarten (mandat
 * "Phase 2 — socle données + synchronisation réelle preprod", 2026-09-09).
 * Remplace le Map en mémoire du prototype Phase 1 par une écriture Prisma
 * persistante — survit à un redémarrage de serveur, contrairement à l'ancien
 * mécanisme. Toutes les tables concernées (ActivityAttempt, ChildProgress,
 * LearningUnit, Activity, OfflinePackageManifest) sont additives, créées par
 * la migration 20260909215555_add_jasmin_kindergarten_module — voir
 * prisma/schema.prisma pour le détail et la note sur l'absence volontaire de
 * relation Prisma entre studentId et User (aucune pollution des listes
 * d'élèves de l'administration).
 */

interface SyncEventInput {
  idempotencyKey?: string;
  studentIdFictif?: number;
  unitId?: string;
  activityId?: string;
  contentVersion?: string;
  localDate?: string;
  actionType?: string;
}

type EventResult =
  | { idempotencyKey: string; status: "accepted"; receivedAt: string }
  | { idempotencyKey: string; status: "duplicate"; receivedAt: string }
  | { idempotencyKey: string | null; status: "rejected"; reason: string };

async function resolveStudent(studentId: number): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (studentId === JASMIN_DEMO_STUDENT_ID) return { ok: true };
  const user = await prisma.user.findUnique({ where: { id: studentId }, select: { id: true, roles: true, active: true } });
  if (!user || !user.active) return { ok: false, reason: "student_not_found" };
  if (!hasRole(parseRoles(user.roles), "STUDENT")) return { ok: false, reason: "student_not_authorized" };
  return { ok: true };
}

async function processEvent(event: SyncEventInput): Promise<EventResult> {
  const { idempotencyKey, studentIdFictif, unitId, activityId, contentVersion, localDate } = event;

  if (!idempotencyKey) return { idempotencyKey: null, status: "rejected", reason: "missing_idempotency_key" };
  if (typeof studentIdFictif !== "number" || !Number.isInteger(studentIdFictif)) {
    return { idempotencyKey, status: "rejected", reason: "missing_or_invalid_student_id" };
  }
  if (!unitId || !activityId || !contentVersion || !localDate) {
    return { idempotencyKey, status: "rejected", reason: "missing_required_field" };
  }

  const studentCheck = await resolveStudent(studentIdFictif);
  if (!studentCheck.ok) return { idempotencyKey, status: "rejected", reason: studentCheck.reason };

  const unit = await prisma.learningUnit.findUnique({ where: { slug: unitId } });
  if (!unit) return { idempotencyKey, status: "rejected", reason: "unit_not_found" };

  const activity = await prisma.activity.findUnique({ where: { unitId_slug: { unitId: unit.id, slug: activityId } } });
  if (!activity) return { idempotencyKey, status: "rejected", reason: "activity_not_found" };

  const manifestVersion = await prisma.offlinePackageManifest.findUnique({
    where: { unitId_version: { unitId: unit.id, version: contentVersion } },
  });
  if (!manifestVersion) return { idempotencyKey, status: "rejected", reason: "unknown_content_version" };

  const clientLocalDate = new Date(localDate);
  if (Number.isNaN(clientLocalDate.getTime())) {
    return { idempotencyKey, status: "rejected", reason: "invalid_local_date" };
  }

  try {
    const attempt = await prisma.activityAttempt.create({
      data: {
        idempotencyKey,
        studentId: studentIdFictif,
        unitId: unit.id,
        activityId: activity.id,
        contentVersion,
        outcome: "completed",
        clientLocalDate,
      },
    });

    await prisma.childProgress.upsert({
      where: { studentId_activityId: { studentId: studentIdFictif, activityId: activity.id } },
      update: { outcome: attempt.outcome, unitId: unit.id },
      create: { studentId: studentIdFictif, unitId: unit.id, activityId: activity.id, outcome: attempt.outcome },
    });

    return { idempotencyKey, status: "accepted", receivedAt: attempt.receivedAt.toISOString() };
  } catch (err) {
    // Contrainte unique sur idempotencyKey : un même événement déjà reçu —
    // y compris en cas de course entre deux requêtes concurrentes (le
    // "read-then-write" seul ne suffirait pas à garantir cette protection,
    // c'est la contrainte SQL qui la garantit vraiment ici).
    //
    // Avec @prisma/adapter-libsql (Turso), une violation de contrainte
    // unique NE remonte PAS comme le P2002 habituel (driver natif) : elle
    // arrive en P2039 ("Database error" générique), le vrai détail restant
    // dans err.message ("SQLITE_CONSTRAINT..."). Confirmé en direct contre
    // preprod (voir rapport Phase 2) — sans ce cas, l'idempotence semblait
    // fonctionner en test superficiel mais renvoyait "rejected" au lieu de
    // "duplicate" dès qu'un même idempotencyKey était réellement rejoué.
    const isUniqueConstraintViolation =
      err instanceof Prisma.PrismaClientKnownRequestError &&
      (err.code === "P2002" || (err.code === "P2039" && /SQLITE_CONSTRAINT/i.test(err.message)));
    if (isUniqueConstraintViolation) {
      const existing = await prisma.activityAttempt.findUnique({ where: { idempotencyKey } });
      return { idempotencyKey, status: "duplicate", receivedAt: (existing?.receivedAt ?? new Date()).toISOString() };
    }
    console.error("[jasmin-sync] Erreur inattendue lors de l'écriture d'un événement :", err);
    return { idempotencyKey, status: "rejected", reason: "internal_error" };
  }
}

export async function POST(request: Request) {
  if (!isJasminKindergartenModuleEnabled()) {
    return NextResponse.json({ error: "Module désactivé." }, { status: 404 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { events?: SyncEventInput[] } | null;
  if (!body || !Array.isArray(body.events)) {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const results: EventResult[] = [];
  for (const event of body.events) {
    results.push(await processEvent(event));
  }

  return NextResponse.json({ ok: true, results });
}

/** Lecture — utile pour vérifier depuis les tests ce que la base a réellement reçu. */
export async function GET(request: Request) {
  if (!isJasminKindergartenModuleEnabled()) {
    return NextResponse.json({ error: "Module désactivé." }, { status: 404 });
  }
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const unitSlug = searchParams.get("unitId");

  const unit = unitSlug ? await prisma.learningUnit.findUnique({ where: { slug: unitSlug } }) : null;
  const attempts = await prisma.activityAttempt.findMany({
    where: unit ? { unitId: unit.id } : undefined,
    orderBy: { receivedAt: "desc" },
    take: 50,
  });
  const progress = await prisma.childProgress.findMany({
    where: unit ? { unitId: unit.id } : undefined,
  });

  return NextResponse.json({
    ok: true,
    totalAttempts: attempts.length,
    attempts,
    progress,
  });
}
