import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parseRoles, roleLabels, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { getPrograms } from "@/lib/content";
import CreateUserForm from "@/components/CreateUserForm";
import type { Prisma } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

// Recognizes a numeric or "CCIGA-ID-000016"-style query as a request to match
// a specific account by its identifier, in addition to the usual name/email search.
function parseIdQuery(query: string): number | null {
  if (!/^\d+$/.test(query) && !/^cciga-id-\d+$/i.test(query)) {
    return null;
  }
  const digits = query.replace(/[^0-9]/g, "");
  if (!digits) return null;
  const id = Number(digits);
  return Number.isInteger(id) ? id : null;
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const session = await getSession();
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  const { q, page: pageParam } = await searchParams;
  const query = (q ?? "").trim();
  const page = Math.max(1, Math.trunc(Number(pageParam)) || 1);

  const idMatch = query ? parseIdQuery(query) : null;
  const where: Prisma.UserWhereInput | undefined = query
    ? {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
          ...(idMatch !== null ? [{ id: idMatch }] : []),
        ],
      }
    : undefined;

  const [totalCount, users, allUsersLight, programs] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { id: "asc" },
      include: { program: true },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    // Full-table light projection: needed so the "enfant lié" lookup and the
    // CreateUserForm student picker aren't limited to the current search/page.
    prisma.user.findMany({ select: { id: true, name: true, roles: true, parentId: true } }),
    getPrograms(),
  ]);

  const students = allUsersLight
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => ({ id: u.id, name: u.name }));

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/admin/users${qs ? `?${qs}` : ""}`;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Comptes CCIGA ID</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form action="/admin/users" method="get" className="mb-4 flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Rechercher par nom, email ou identifiant CCIGA ID…"
              className="input flex-1"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
            >
              Rechercher
            </button>
            {query && (
              <Link
                href="/admin/users"
                className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted hover:bg-background"
              >
                Réinitialiser
              </Link>
            )}
          </form>

          <p className="mb-2 text-sm text-muted">
            {totalCount} compte{totalCount !== 1 ? "s" : ""}
            {query && <> pour « {query} »</>}
          </p>

          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">CCIGA ID</th>
                  <th className="px-4 py-3 font-semibold">Nom</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Rôles</th>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 font-semibold">Enfant lié</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-border">
                    <td className="px-4 py-3 font-mono">
                      <Link href={`/admin/users/${user.id}`} className="text-primary hover:underline">
                        {formatCcigaId(user.id)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-foreground">{user.name}</td>
                    <td className="px-4 py-3 text-muted">{user.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {parseRoles(user.roles).map((role) => (
                          <span
                            key={role}
                            className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
                          >
                            {roleLabels[role]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{user.program?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">
                      {hasRole(parseRoles(user.roles), "PARENT")
                        ? allUsersLight.find((c) => c.parentId === user.id)?.name ?? "—"
                        : "—"}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted">
                      {query ? "Aucun compte ne correspond à cette recherche." : "Aucun compte pour le moment."}
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

        <CreateUserForm students={students} programs={programs.filter((p) => p.active)} isSuperAdmin={isSuperAdmin} />
      </div>
    </div>
  );
}
