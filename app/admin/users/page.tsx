import Link from "next/link";
import { prisma } from "@/lib/db";
import { parseRoles, roleLabels, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { getPrograms } from "@/lib/content";
import CreateUserForm from "@/components/CreateUserForm";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [users, programs] = await Promise.all([
    prisma.user.findMany({ orderBy: { id: "asc" }, include: { program: true } }),
    getPrograms(),
  ]);

  const students = users
    .filter((u) => hasRole(parseRoles(u.roles), "STUDENT"))
    .map((u) => ({ id: u.id, name: u.name }));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Comptes CCIGA ID</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface lg:col-span-2">
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
                      ? users.find((c) => c.parentId === user.id)?.name ?? "—"
                      : "—"}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    Aucun compte pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <CreateUserForm students={students} programs={programs} />
      </div>
    </div>
  );
}
