import { prisma } from "@/lib/db";

export async function writeAuditLog(entry: {
  entityType: string;
  entityId: string;
  action: string;
  actorId?: number | null;
  before?: unknown;
  after?: unknown;
  reason?: string | null;
}): Promise<void> {
  await prisma.auditLog.create({
    data: {
      entityType: entry.entityType,
      entityId: entry.entityId,
      action: entry.action,
      actorId: entry.actorId ?? undefined,
      before: entry.before !== undefined ? JSON.stringify(entry.before) : undefined,
      after: entry.after !== undefined ? JSON.stringify(entry.after) : undefined,
      reason: entry.reason ?? undefined,
    },
  });
}
