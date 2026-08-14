import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { getPrograms } from "@/lib/content";
import EditUserForm from "@/components/EditUserForm";

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) notFound();

  const [user, programs] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    getPrograms(),
  ]);
  if (!user) notFound();

  return (
    <div>
      <Link href="/admin/users" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les comptes
      </Link>
      <div className="mx-auto max-w-xl">
        <p className="mb-4 font-mono text-sm text-muted">
          {formatCcigaId(user.id)} · {user.email}
        </p>
        {hasRole(parseRoles(user.roles), "STUDENT") && (
          <Link
            href={`/portail/bulletin?student=${user.id}`}
            className="mb-4 inline-block text-sm text-primary hover:underline"
          >
            Voir le bulletin →
          </Link>
        )}
        <EditUserForm
          userId={user.id}
          initialName={user.name}
          initialRoles={parseRoles(user.roles)}
          initialProgramId={user.programId}
          programs={programs}
        />
      </div>
    </div>
  );
}
