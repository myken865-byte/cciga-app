import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parseRoles, roleLabels, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { getPrograms, getProgramsBySchool } from "@/lib/content";
import { getActiveSchoolOrAll, schoolLabels, type SchoolKey } from "@/lib/institutionContext";
import { isUserInSchoolScope } from "@/lib/institutionScope";
import CreateUserForm from "@/components/CreateUserForm";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { UsersIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Mandat "Mise en état opérationnel" (2026-09-06) : séparation stricte par
  // institution active — plus de liste mélangeant les trois écoles.
  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool === null) redirect("/admin/institution");
  const scopeSchool = activeSchool !== "toutes" ? activeSchool : null;

  const { q } = await searchParams;
  const search = (q ?? "").trim().toLowerCase();

  const [allUsers, programs, session] = await Promise.all([
    prisma.user.findMany({
      orderBy: { id: "asc" },
      include: { program: true, coursesTaught: { include: { program: true } }, titulaireOf: true, coordinatedPrograms: true },
    }),
    scopeSchool ? getProgramsBySchool(scopeSchool) : getPrograms(),
    getSession(),
  ]);

  let users = scopeSchool ? allUsers.filter((u) => isUserInSchoolScope(u, scopeSchool)) : allUsers;
  if (search) {
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        formatCcigaId(u.id).toLowerCase().includes(search),
    );
  }

  const students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => ({ id: u.id, name: u.name }));
  const parents = users
    .filter((u) => hasRole(parseRoles(u.roles), "PARENT"))
    .map((u) => ({ id: u.id, name: u.name }));
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Comptes institutionnels" title="Comptes CCIGA ID" />

      <form className="mb-6 flex flex-wrap items-center gap-2" action="/admin/users">
        <input
          type="text"
          name="q"
          defaultValue={search}
          placeholder="Rechercher par nom, email ou CCIGA ID…"
          className="input max-w-xs"
        />
        <button type="submit" className="btn-secondary text-sm">
          Rechercher
        </button>
        {search && (
          <Link href="/admin/users" className="text-xs text-muted hover:underline">
            Effacer la recherche
          </Link>
        )}
      </form>

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard title="Comptes enregistrés" icon={UsersIcon} className="lg:col-span-2">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">CCIGA ID</th>
                  <th className="px-4 py-3 font-semibold">Nom</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Rôles</th>
                  <th className="px-4 py-3 font-semibold">École</th>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 font-semibold">Enfant lié</th>
                  <th className="px-4 py-3 font-semibold">Dossier</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-row-divider">
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
                    <td className="px-4 py-3 text-muted">
                      {user.program ? schoolLabels[user.program.school as SchoolKey] ?? user.program.school : "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">{user.program?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">
                      {hasRole(parseRoles(user.roles), "PARENT")
                        ? users.find((c) => c.parentId === user.id)?.name ?? "—"
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {hasRole(parseRoles(user.roles), "STUDENT") ? (
                        <Link href={`/admin/dossier/${user.id}`} className="text-primary hover:underline">
                          Voir le dossier
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted">
                      Aucun compte pour ce filtre.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <CreateUserForm students={students} parents={parents} programs={programs} isSuperAdmin={isSuperAdmin} />
      </div>
    </AdminShell>
  );
}
