import { prisma } from "@/lib/db";
import { schoolLabels, type SchoolKey } from "@/lib/institutions";
import type { ActiveSchoolScope } from "@/lib/institutionContext";
import { isAdmissionStatus } from "@/lib/admission-status";
import { isEnrollmentFormStatus } from "@/lib/enrollmentFormStatus";
import {
  mapAdmissionStatusToUnified,
  mapEnrollmentFormStatusToUnified,
  type UnifiedEnrollmentStatus,
} from "@/lib/unifiedEnrollmentStatus";
import { formatEnrollmentFormReference } from "@/lib/enrollmentFormReference";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";

/**
 * Mission "Inscription unifiée — Phase 1" (2026-09-12). Couche de lecture
 * agrégeant AdmissionSubmission (en ligne) + EnrollmentForm (École Pro/Uni,
 * présentiel) + ClassicEnrollmentForm (École Classique, présentiel) en une
 * seule liste pour le Secrétariat — AUCUNE fusion de table, AUCUNE écriture :
 * chaque ligne pointe toujours vers sa page de détail native (NO REDO §21).
 */

export type EnrollmentKind = "admission" | "enrollment" | "classic";
export type EnrollmentSource = "en_ligne" | "presentiel";

export interface UnifiedEnrollmentRow {
  id: string;
  kind: EnrollmentKind;
  source: EnrollmentSource;
  reference: string;
  firstName: string;
  lastName: string;
  school: string;
  schoolLabel: string;
  programName: string;
  date: Date;
  unifiedStatus: UnifiedEnrollmentStatus;
  hasStudentAccount: boolean;
  linkedToAdmission: boolean;
  hasLinkedFiche: boolean;
  href: string;
  /** Mission "Inscription unifiée — Phase 1.1" (2026-09-12), §5 — l'agent doit toujours savoir quelle est la prochaine action. */
  nextAction: string;
}

function computeNextAction(row: {
  kind: EnrollmentKind;
  unifiedStatus: UnifiedEnrollmentStatus;
  hasStudentAccount: boolean;
  hasLinkedFiche: boolean;
}): string {
  if (row.kind === "admission" && !row.hasLinkedFiche && row.unifiedStatus !== "rejete" && row.unifiedStatus !== "archive") {
    // Une candidature en ligne pas encore transformée reste d'abord un
    // dossier à vérifier/transformer, peu importe son statut natif — c'est
    // la seule action réellement disponible pour elle tant qu'aucune fiche
    // présentielle n'existe.
    if (row.unifiedStatus === "incomplet") return "Compléter les pièces, puis transformer en fiche";
    return "Transformer en fiche d'inscription";
  }
  switch (row.unifiedStatus) {
    case "nouveau":
      return "Vérifier le dossier";
    case "incomplet":
      return "Compléter les pièces manquantes";
    case "a_verifier":
      return "Valider le dossier";
    case "valide":
      return row.hasStudentAccount ? "Terminé — compte étudiant actif" : "Créer / lier le compte étudiant";
    case "rejete":
      return "Dossier rejeté";
    case "archive":
      return "Archivé";
  }
}

export interface UnifiedEnrollmentCounts {
  total: number;
  enLigne: number;
  presentiel: number;
  aVerifier: number;
  incomplet: number;
  valide: number;
}

function schoolLabelFor(school: string): string {
  return (schoolLabels as Record<string, string>)[school] ?? school;
}

/**
 * `scope`: une institution précise (isolation stricte — jamais de fuite
 * cross-institution, §20) ou "toutes" (vue globale, déjà réservée
 * SUPER_ADMIN par app/api/admin/institution/route.ts — jamais réinterprété
 * ici).
 */
export async function getUnifiedEnrollmentRows(scope: ActiveSchoolScope): Promise<{
  rows: UnifiedEnrollmentRow[];
  counts: UnifiedEnrollmentCounts;
}> {
  const schoolFilter = scope && scope !== "toutes" ? (scope as SchoolKey) : undefined;

  const [admissions, enrollmentForms, classicForms] = await Promise.all([
    prisma.admissionSubmission.findMany({
      where: schoolFilter ? { school: schoolFilter } : undefined,
      include: { enrollmentForms: { select: { id: true } }, classicEnrollmentForms: { select: { id: true } } },
      orderBy: { submittedAt: "desc" },
    }),
    // EnrollmentForm est partagé École Professionnelle / Université — jamais
    // École Classique (voir schema). Filtré par école si une institution
    // précise (parmi ces deux-là) est active ; sinon (vue "toutes", ou
    // École Classique active) on ne perd aucune ligne École Pro/Uni.
    prisma.enrollmentForm.findMany({
      where: schoolFilter && schoolFilter !== "ecole-classique" ? { school: schoolFilter } : schoolFilter ? { id: "__none__" } : undefined,
      include: { program: true },
      orderBy: { createdAt: "desc" },
    }),
    // ClassicEnrollmentForm n'a pas de colonne `school` (exclusivement École
    // Classique par construction) — exclu explicitement quand une autre
    // institution précise est active, jamais par un filtre `school` qui
    // n'existe pas sur ce modèle.
    prisma.classicEnrollmentForm.findMany({
      where: schoolFilter && schoolFilter !== "ecole-classique" ? { id: "__none__" } : undefined,
      include: { program: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const rows: UnifiedEnrollmentRow[] = [];

  for (const a of admissions) {
    const statusKey = isAdmissionStatus(a.status) ? a.status : "nouveau";
    const unifiedStatus = mapAdmissionStatusToUnified(statusKey);
    const hasLinkedFiche = a.enrollmentForms.length > 0 || a.classicEnrollmentForms.length > 0;
    rows.push({
      id: a.id,
      kind: "admission",
      source: "en_ligne",
      reference: a.reference,
      firstName: a.firstName,
      lastName: a.lastName,
      school: a.school,
      schoolLabel: schoolLabelFor(a.school),
      programName: a.programSlug,
      date: a.submittedAt,
      unifiedStatus,
      hasStudentAccount: Boolean(a.studentUserId),
      linkedToAdmission: false,
      hasLinkedFiche,
      href: `/admin/admissions/${a.id}`,
      nextAction: computeNextAction({ kind: "admission", unifiedStatus, hasStudentAccount: Boolean(a.studentUserId), hasLinkedFiche }),
    });
  }

  for (const f of enrollmentForms) {
    const statusKey = isEnrollmentFormStatus(f.status) ? f.status : "brouillon";
    const unifiedStatus = mapEnrollmentFormStatusToUnified(statusKey);
    rows.push({
      id: f.id,
      kind: "enrollment",
      source: "presentiel",
      reference: formatEnrollmentFormReference(f.id),
      firstName: f.firstName,
      lastName: f.lastName,
      school: f.school,
      schoolLabel: schoolLabelFor(f.school),
      programName: f.program?.name ?? "—",
      date: f.createdAt,
      unifiedStatus,
      hasStudentAccount: Boolean(f.studentUserId),
      linkedToAdmission: Boolean(f.admissionSubmissionId),
      hasLinkedFiche: true,
      href: `/admin/fiches-inscription/${f.id}`,
      nextAction: computeNextAction({ kind: "enrollment", unifiedStatus, hasStudentAccount: Boolean(f.studentUserId), hasLinkedFiche: true }),
    });
  }

  for (const f of classicForms) {
    const statusKey = isEnrollmentFormStatus(f.status) ? f.status : "brouillon";
    const unifiedStatus = mapEnrollmentFormStatusToUnified(statusKey);
    rows.push({
      id: f.id,
      kind: "classic",
      source: "presentiel",
      reference: formatClassicEnrollmentFormReference(f.id),
      firstName: f.firstName,
      lastName: f.lastName,
      school: "ecole-classique",
      schoolLabel: schoolLabelFor("ecole-classique"),
      programName: f.program?.name ?? "—",
      date: f.createdAt,
      unifiedStatus,
      hasStudentAccount: Boolean(f.studentUserId),
      linkedToAdmission: Boolean(f.admissionSubmissionId),
      hasLinkedFiche: true,
      href: `/admin/inscriptions-ecole-classique/${f.id}`,
      nextAction: computeNextAction({ kind: "classic", unifiedStatus, hasStudentAccount: Boolean(f.studentUserId), hasLinkedFiche: true }),
    });
  }

  rows.sort((a, b) => b.date.getTime() - a.date.getTime());

  const counts: UnifiedEnrollmentCounts = {
    total: rows.length,
    enLigne: rows.filter((r) => r.source === "en_ligne").length,
    presentiel: rows.filter((r) => r.source === "presentiel").length,
    aVerifier: rows.filter((r) => r.unifiedStatus === "a_verifier").length,
    incomplet: rows.filter((r) => r.unifiedStatus === "incomplet").length,
    valide: rows.filter((r) => r.unifiedStatus === "valide").length,
  };

  return { rows, counts };
}
