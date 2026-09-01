import { formatHTG } from "@/lib/currency";
import { auditActionLabel } from "@/lib/auditLabels";

function parseJson(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** The student a Payment, StudentAppreciation, or document-generation entry is about — read directly off the stored JSON, no extra query needed. */
export function concernedStudentIdFromJson(entityType: string, before: string | null, after: string | null): number | null {
  if (entityType !== "Payment" && entityType !== "StudentAppreciation" && entityType !== "AcademicDocument") return null;
  const parsedAfter = parseJson(after);
  const parsedBefore = parseJson(before);
  const id = parsedAfter?.studentId ?? parsedBefore?.studentId;
  return typeof id === "number" ? id : null;
}

export function summarizeAuditEntry(entry: {
  entityType: string;
  action: string;
  reason: string | null;
  before: string | null;
  after: string | null;
}): string {
  const before = parseJson(entry.before);
  const after = parseJson(entry.after);

  if (entry.entityType === "Grade" && entry.action === "score_change") {
    const from = before?.score;
    const to = after?.score;
    const change = typeof from === "number" && typeof to === "number" ? `Note : ${from} → ${to}.` : "Note modifiée.";
    return entry.reason ? `${change} ${entry.reason}` : change;
  }

  // Grade workflow steps (submit/review/validate/publish) already carry a
  // full human-readable summary ("12 note(s) validée(s) pour Mathématiques.").
  if (entry.reason) {
    return entry.reason;
  }

  if (entry.entityType === "Payment" && entry.action === "create") {
    const amount = typeof after?.amount === "number" ? formatHTG(after.amount) : null;
    const note = typeof after?.note === "string" ? after.note : null;
    return amount ? `Paiement de ${amount} enregistré${note ? ` — ${note}` : ""}.` : "Paiement enregistré.";
  }

  if (entry.entityType === "AcademicDocument" && entry.action === "generate_publish") {
    const docType = typeof after?.type === "string" ? after.type : null;
    const decision = typeof after?.decision === "string" ? after.decision : null;
    const parts = [docType ? `Document : ${docType}` : null, decision ? `Décision : ${decision}` : null].filter(
      (p): p is string => Boolean(p),
    );
    return parts.length ? `${parts.join(" — ")}.` : "Document généré et publié.";
  }

  if (entry.entityType === "StudentAppreciation") {
    return entry.action === "create" ? "Appréciation et conduite saisies." : "Appréciation et conduite mises à jour.";
  }

  if (entry.entityType === "Program" || entry.entityType === "Course") {
    if (entry.action === "archive") return "Archivé — masqué du site public, données conservées.";
    if (entry.action === "reactivate") return "Réactivé — de nouveau visible publiquement.";
    if (entry.action === "delete") return "Supprimé définitivement.";
    if (entry.action === "status_change") {
      const from = typeof before?.programStatus === "string" ? before.programStatus : "—";
      const to = typeof after?.programStatus === "string" ? after.programStatus : "—";
      return `Statut d'autorisation : ${from} → ${to}.`;
    }
  }

  if (entry.entityType === "Faculty" && typeof after?.name === "string") {
    return `Faculté : ${after.name}.`;
  }
  if (entry.entityType === "AcademicYear" && typeof after?.label === "string") {
    return `Année académique : ${after.label}.`;
  }
  if (entry.entityType === "Semester" && typeof after?.name === "string") {
    return `Semestre : ${after.name}.`;
  }

  return auditActionLabel(entry.action);
}
