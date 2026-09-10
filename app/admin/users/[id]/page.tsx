import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { getPrograms } from "@/lib/content";
import EditUserForm from "@/components/EditUserForm";
import GenerateBadgeButton from "@/components/GenerateBadgeButton";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import { isUserInSchoolScope } from "@/lib/institutionScope";

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) notFound();

  const activeSchool = await getActiveSchoolOrAll();
  if (!activeSchool) notFound();

  const [user, programs, session, allUsers] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        program: { select: { school: true } },
        coursesTaught: { include: { program: { select: { school: true } } } },
        titulaireOf: { select: { school: true } },
        coordinatedPrograms: { select: { school: true } },
      },
    }),
    getPrograms(),
    getSession(),
    prisma.user.findMany(),
  ]);
  if (!user) notFound();
  // Non-croisement (Phase C3) : accès direct par ID à un compte d'une autre
  // institution refusé — sauf vue globale ("toutes", réservée SUPER_ADMIN).
  if (activeSchool !== "toutes" && !isUserInSchoolScope(user, activeSchool)) notFound();

  const parents = allUsers
    .filter((u) => hasRole(parseRoles(u.roles), "PARENT"))
    .map((u) => ({ id: u.id, name: u.name }));
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  return (
    <AdminShell>
      <AdminTitleBand eyebrow="CCIGA — Comptes utilisateurs" title={user.name} />
      <div className="mx-auto max-w-xl">
        <p className="mb-4 font-mono text-sm text-muted">
          {formatCcigaId(user.id)} · {user.email}
        </p>
        {hasRole(parseRoles(user.roles), "STUDENT") && (
          <>
            <Link
              href={`/portail/bulletin?student=${user.id}`}
              className="mb-4 inline-block text-sm text-primary hover:underline"
            >
              Voir le bulletin →
            </Link>
            <div className="mb-4">
              <GenerateBadgeButton userId={user.id} />
            </div>
            <a
              href={`/api/admin/carnet-paiement/${user.id}/pdf`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mb-4 inline-block text-sm"
            >
              Carnet de paiement — Voir / PDF
            </a>
            <Link href={`/admin/dossier/${user.id}`} className="btn-primary mb-4 ml-2 inline-block text-sm">
              Voir le dossier
            </Link>
          </>
        )}
        <EditUserForm
          userId={user.id}
          initialName={user.name}
          initialRoles={parseRoles(user.roles)}
          initialProgramId={user.programId}
          initialPhotoUrl={user.photoUrl}
          initialDob={user.dob ? user.dob.toISOString().slice(0, 10) : null}
          initialPhone={user.phone}
          initialAddress={user.address}
          initialActive={user.active}
          initialParentId={user.parentId}
          programs={programs}
          parents={parents}
          isSuperAdmin={isSuperAdmin}
          isSelf={session?.userId === user.id}
        />
      </div>
    </AdminShell>
  );
}
