import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { parseRoles } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
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

  const user = await prisma.user.findUnique({ where: { id: userId } });
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
        <EditUserForm userId={user.id} initialName={user.name} initialRoles={parseRoles(user.roles)} />
      </div>
    </div>
  );
}
