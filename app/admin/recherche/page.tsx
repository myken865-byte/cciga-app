import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasAnyRole, parseRoles, roleLabels } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { getActiveSchoolOrAll, schoolLabels, type SchoolKey } from "@/lib/institutionContext";
import { isUserInSchoolScope } from "@/lib/institutionScope";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { UsersIcon, BookIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

// Mandat "Audit global boutons de retour" : ce lien existe dans le menu
// Outils depuis longtemps (components/AdminNav.tsx), mais app/admin/recherche/
// n'a jamais eu de page.tsx — la route menait donc systématiquement au 404
// générique de Next.js.
//
// Mandat "Mise en état opérationnel" (2026-09-06) : la recherche globale
// mélangeait délibérément les trois institutions (choix documenté ici même
// avant cette révision). Ce mandat inverse explicitement ce choix : scopée
// par défaut sur l'institution active, comme partout ailleurs. Le seul chemin
// légitime pour une vue croisant les trois écoles est le cookie "toutes"
// (réservé SUPER_ADMIN — app/api/admin/institution/route.ts refuse déjà cette
// valeur à quiconque d'autre) — chaque ligne y reste étiquetée par institution.
export default async function AdminRecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["ADMIN", "SUPER_ADMIN", "SECRETARIAT", "ACADEMIC_OFFICER"])) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Outils" title="Recherche" />
        <AdminCard>
          <p className="text-sm text-muted">Accès non autorisé.</p>
        </AdminCard>
      </AdminShell>
    );
  }

  const activeSchool = await getActiveSchoolOrAll();
  if (activeSchool === null) redirect("/admin/institution");
  const scopeSchool = activeSchool !== "toutes" ? activeSchool : null;

  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const [rawUsers, programs] = query
    ? await Promise.all([
        prisma.user.findMany({
          where: {
            OR: [{ name: { contains: query } }, { email: { contains: query } }],
          },
          include: { program: true, coursesTaught: { include: { program: true } }, titulaireOf: true, coordinatedPrograms: true },
          take: 100,
          orderBy: { name: "asc" },
        }),
        prisma.program.findMany({
          where: { name: { contains: query }, ...(scopeSchool ? { school: scopeSchool } : {}) },
          take: 30,
          orderBy: { name: "asc" },
        }),
      ])
    : [[], []];

  const users = (scopeSchool ? rawUsers.filter((u) => isUserInSchoolScope(u, scopeSchool)) : rawUsers).slice(0, 30);

  // Recherche par CCIGA ID exact (ex. "CCIGA-ID-000039" ou juste "39").
  const idMatch = query.match(/(\d+)$/);
  const userById =
    idMatch && !users.some((u) => u.id === Number(idMatch[1]))
      ? await prisma.user.findUnique({
          where: { id: Number(idMatch[1]) },
          include: { program: true, coursesTaught: { include: { program: true } }, titulaireOf: true, coordinatedPrograms: true },
        })
      : null;
  const idMatchInScope = userById && (!scopeSchool || isUserInSchoolScope(userById, scopeSchool));
  const allUsers = idMatchInScope ? [userById, ...users] : users;

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Outils" title="Recherche" />

      <AdminCard className="mb-6">
        <form className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Nom, email ou CCIGA ID d'un compte, ou nom d'un programme…"
            className="input flex-1"
            autoFocus
          />
          <button type="submit" className="btn-primary text-sm">
            Rechercher
          </button>
        </form>
      </AdminCard>

      {query && (
        <>
          <AdminCard title={`Comptes (${allUsers.length})`} icon={UsersIcon} className="mb-6">
            {allUsers.length === 0 ? (
              <p className="empty-state text-sm">Aucun compte ne correspond à « {query} ».</p>
            ) : (
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
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminCard>

          <AdminCard title={`Programmes (${programs.length})`} icon={BookIcon}>
            {programs.length === 0 ? (
              <p className="empty-state text-sm">Aucun programme ne correspond à « {query} ».</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-background text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Programme</th>
                      <th className="px-4 py-3 font-semibold">École</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((program) => (
                      <tr key={program.id} className="border-t border-row-divider">
                        <td className="px-4 py-3 font-medium text-foreground">
                          <Link href={`/admin/programs/${program.id}`} className="text-primary hover:underline">
                            {program.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-muted">{schoolLabels[program.school as SchoolKey] ?? program.school}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminCard>
        </>
      )}
    </AdminShell>
  );
}
