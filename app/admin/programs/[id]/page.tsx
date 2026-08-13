import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramById, getSchools } from "@/lib/content";
import EditProgramForm from "@/components/EditProgramForm";

export const dynamic = "force-dynamic";

export default async function AdminProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  return (
    <div>
      <Link href="/admin/programs" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les programmes
      </Link>
      <div className="mx-auto max-w-xl">
        <EditProgramForm program={program} schools={getSchools()} />
      </div>
    </div>
  );
}
