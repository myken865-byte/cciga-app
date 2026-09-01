import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { auditModuleLabel, auditActionLabel } from "@/lib/auditLabels";
import { summarizeAuditEntry, concernedStudentIdFromJson } from "@/lib/auditSummary";
import type { Prisma } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 30;

const ENTITY_NAME_TYPES = ["Program", "Course", "Faculty", "Semester", "AcademicYear"] as const;

function formatDateTime(iso: Date) {
  return iso.toLocaleString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    module?: string;
    action?: string;
    actor?: string;
    from?: string;
    to?: string;
    page?: string;
  }>;
}) {
  const session = await getSession();
  if (!hasRole(session?.roles ?? [], "SUPER_ADMIN")) {
    notFound();
  }

  const { q, module: moduleFilter, action: actionFilter, actor: actorFilter, from, to, page: pageParam } =
    await searchParams;
  const query = (q ?? "").trim();
  const page = Math.max(1, Math.trunc(Number(pageParam)) || 1);

  // Resolving "search by concerned person's name" requires knowing which user
  // ids match first, since studentId only appears as a raw number inside the
  // stored before/after JSON blobs, not as a name we could search directly.
  const matchingUsers = query
    ? await prisma.user.findMany({
        where: { OR: [{ name: { contains: query } }, { email: { contains: query } }] },
        select: { id: true },
      })
    : [];
  const matchingUserIds = matchingUsers.map((u) => u.id);

  const fromDate = from ? new Date(`${from}T00:00:00.000`) : null;
  const toDate = to ? new Date(`${to}T23:59:59.999`) : null;

  const conditions: Prisma.AuditLogWhereInput[] = [];
  if (moduleFilter) conditions.push({ entityType: moduleFilter });
  if (actionFilter) conditions.push({ action: actionFilter });
  if (actorFilter) conditions.push({ actorId: Number(actorFilter) });
  if (fromDate) conditions.push({ createdAt: { gte: fromDate } });
  if (toDate) conditions.push({ createdAt: { lte: toDate } });
  if (query) {
    conditions.push({
      OR: [
        { entityId: { contains: query } },
        { reason: { contains: query } },
        { before: { contains: query } },
        { after: { contains: query } },
        { actor: { is: { OR: [{ name: { contains: query } }, { email: { contains: query } }] } } },
        ...matchingUserIds.flatMap((uid) => [
          { after: { contains: `"studentId":${uid}` } },
          { before: { contains: `"studentId":${uid}` } },
        ]),
      ],
    });
  }
  const where: Prisma.AuditLogWhereInput | undefined = conditions.length ? { AND: conditions } : undefined;

  const [totalCount, entries, moduleRows, actionRows, actorIdRows] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { actor: true },
    }),
    prisma.auditLog.findMany({ distinct: ["entityType"], select: { entityType: true }, orderBy: { entityType: "asc" } }),
    prisma.auditLog.findMany({ distinct: ["action"], select: { action: true }, orderBy: { action: "asc" } }),
    prisma.auditLog.findMany({ distinct: ["actorId"], where: { actorId: { not: null } }, select: { actorId: true } }),
  ]);

  const actorIds = actorIdRows.map((r) => r.actorId).filter((id): id is number => id !== null);
  const actorUsers = actorIds.length
    ? await prisma.user.findMany({ where: { id: { in: actorIds } }, select: { id: true, name: true }, orderBy: { name: "asc" } })
    : [];

  // Per-page resolution: which student a Grade score change concerns isn't
  // stored on the log entry itself (only the score is) — look it up from the
  // Grade it references, best-effort since the grade may since be deleted.
  const gradeScoreChangeIds = entries
    .filter((e) => e.entityType === "Grade" && e.action === "score_change")
    .map((e) => e.entityId);
  const gradeStudentRows = gradeScoreChangeIds.length
    ? await prisma.grade.findMany({ where: { id: { in: gradeScoreChangeIds } }, select: { id: true, studentId: true } })
    : [];
  const gradeStudentMap = new Map(gradeStudentRows.map((g) => [g.id, g.studentId]));

  // document_superseded entries don't carry studentId in their JSON (only
  // the linked document ids) — fall back to the AcademicDocument row itself.
  const unresolvedDocumentIds = entries
    .filter((e) => e.entityType === "AcademicDocument" && concernedStudentIdFromJson(e.entityType, e.before, e.after) === null)
    .map((e) => e.entityId);
  const documentStudentRows = unresolvedDocumentIds.length
    ? await prisma.academicDocument.findMany({ where: { id: { in: unresolvedDocumentIds } }, select: { id: true, studentId: true } })
    : [];
  const documentStudentMap = new Map(documentStudentRows.map((d) => [d.id, d.studentId]));

  function concernedUserIdFor(e: (typeof entries)[number]): number | null {
    const fromJson = concernedStudentIdFromJson(e.entityType, e.before, e.after);
    if (fromJson !== null) return fromJson;
    if (e.entityType === "Grade" && e.action === "score_change") {
      return gradeStudentMap.get(e.entityId) ?? null;
    }
    if (e.entityType === "AcademicDocument") {
      return documentStudentMap.get(e.entityId) ?? null;
    }
    return null;
  }

  const concernedIds = new Set<number>();
  for (const e of entries) {
    const id = concernedUserIdFor(e);
    if (id !== null) concernedIds.add(id);
  }
  const concernedUsers = concernedIds.size
    ? await prisma.user.findMany({ where: { id: { in: [...concernedIds] } }, select: { id: true, name: true } })
    : [];
  const concernedUserMap = new Map(concernedUsers.map((u) => [u.id, u.name]));

  const idsByType: Partial<Record<(typeof ENTITY_NAME_TYPES)[number], Set<string>>> = {};
  for (const e of entries) {
    if ((ENTITY_NAME_TYPES as readonly string[]).includes(e.entityType)) {
      const key = e.entityType as (typeof ENTITY_NAME_TYPES)[number];
      (idsByType[key] ??= new Set()).add(e.entityId);
    }
  }
  const [programs, courses, faculties, semesters, years] = await Promise.all([
    idsByType.Program?.size
      ? prisma.program.findMany({ where: { id: { in: [...idsByType.Program] } }, select: { id: true, name: true } })
      : [],
    idsByType.Course?.size
      ? prisma.course.findMany({ where: { id: { in: [...idsByType.Course] } }, select: { id: true, name: true } })
      : [],
    idsByType.Faculty?.size
      ? prisma.faculty.findMany({ where: { id: { in: [...idsByType.Faculty] } }, select: { id: true, name: true } })
      : [],
    idsByType.Semester?.size
      ? prisma.semester.findMany({ where: { id: { in: [...idsByType.Semester] } }, select: { id: true, name: true } })
      : [],
    idsByType.AcademicYear?.size
      ? prisma.academicYear.findMany({ where: { id: { in: [...idsByType.AcademicYear] } }, select: { id: true, label: true } })
      : [],
  ]);
  const entityNameMap = new Map<string, string>();
  for (const p of programs) entityNameMap.set(`Program:${p.id}`, p.name);
  for (const c of courses) entityNameMap.set(`Course:${c.id}`, c.name);
  for (const f of faculties) entityNameMap.set(`Faculty:${f.id}`, f.name);
  for (const s of semesters) entityNameMap.set(`Semester:${s.id}`, s.name);
  for (const y of years) entityNameMap.set(`AcademicYear:${y.id}`, y.label);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (moduleFilter) params.set("module", moduleFilter);
    if (actionFilter) params.set("action", actionFilter);
    if (actorFilter) params.set("actor", actorFilter);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/admin/audit${qs ? `?${qs}` : ""}`;
  }

  const hasFilters = Boolean(query || moduleFilter || actionFilter || actorFilter || from || to);

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-foreground">Journal d&apos;audit</h1>
      <p className="mb-6 text-sm text-muted">
        Traçabilité des actions importantes effectuées dans CCIGA App — réservé au Super Administrateur.
      </p>

      <form action="/admin/audit" method="get" className="mb-4 space-y-3 rounded-lg border border-border bg-surface p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Module</span>
            <select name="module" defaultValue={moduleFilter ?? ""} className="input">
              <option value="">Tous</option>
              {moduleRows.map((r) => (
                <option key={r.entityType} value={r.entityType}>
                  {auditModuleLabel(r.entityType)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Type d&apos;action</span>
            <select name="action" defaultValue={actionFilter ?? ""} className="input">
              <option value="">Tous</option>
              {actionRows.map((r) => (
                <option key={r.action} value={r.action}>
                  {auditActionLabel(r.action)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Auteur</span>
            <select name="actor" defaultValue={actorFilter ?? ""} className="input">
              <option value="">Tous</option>
              {actorUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Du</span>
              <input type="date" name="from" defaultValue={from ?? ""} className="input" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Au</span>
              <input type="date" name="to" defaultValue={to ?? ""} className="input" />
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Rechercher (auteur, utilisateur concerné, motif, identifiant…)"
            className="input flex-1"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
          >
            Filtrer
          </button>
          {hasFilters && (
            <Link
              href="/admin/audit"
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted hover:bg-background"
            >
              Réinitialiser
            </Link>
          )}
        </div>
      </form>

      <p className="mb-2 text-sm text-muted">
        {totalCount} entrée{totalCount !== 1 ? "s" : ""}
      </p>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Date et heure</th>
              <th className="px-4 py-3 font-semibold">Module</th>
              <th className="px-4 py-3 font-semibold">Action</th>
              <th className="px-4 py-3 font-semibold">Auteur</th>
              <th className="px-4 py-3 font-semibold">Utilisateur concerné</th>
              <th className="px-4 py-3 font-semibold">Informations pertinentes</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const entityName = entityNameMap.get(`${entry.entityType}:${entry.entityId}`);
              const concernedId = concernedUserIdFor(entry);
              const concernedName = concernedId !== null ? concernedUserMap.get(concernedId) : undefined;
              return (
                <tr key={entry.id} className="border-t border-border align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDateTime(entry.createdAt)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{auditModuleLabel(entry.entityType)}</p>
                    {entityName && <p className="text-xs text-muted">{entityName}</p>}
                  </td>
                  <td className="px-4 py-3 text-muted">{auditActionLabel(entry.action)}</td>
                  <td className="px-4 py-3 text-muted">
                    {entry.actor ? (
                      <Link href={`/admin/users/${entry.actor.id}`} className="text-primary hover:underline">
                        {entry.actor.name}
                      </Link>
                    ) : (
                      "Système"
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {concernedId !== null ? (
                      <Link href={`/admin/users/${concernedId}`} className="text-primary hover:underline">
                        {concernedName ?? `#${concernedId}`}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{summarizeAuditEntry(entry)}</td>
                </tr>
              );
            })}
            {entries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  {hasFilters ? "Aucune entrée ne correspond à ces filtres." : "Aucune entrée pour le moment."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <Link
            href={pageHref(page - 1)}
            aria-disabled={page <= 1}
            className={`rounded-md border border-border px-3 py-1.5 font-semibold ${
              page <= 1 ? "pointer-events-none opacity-40" : "text-foreground hover:bg-background"
            }`}
          >
            ← Précédent
          </Link>
          <span className="text-muted">
            Page {page} / {totalPages}
          </span>
          <Link
            href={pageHref(page + 1)}
            aria-disabled={page >= totalPages}
            className={`rounded-md border border-border px-3 py-1.5 font-semibold ${
              page >= totalPages ? "pointer-events-none opacity-40" : "text-foreground hover:bg-background"
            }`}
          >
            Suivant →
          </Link>
        </div>
      )}
    </div>
  );
}
