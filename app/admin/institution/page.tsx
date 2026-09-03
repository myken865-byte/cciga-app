import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import InstitutionPicker from "@/components/InstitutionPicker";

export default async function AdminInstitutionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const session = await getSession();
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-accent">
        CCIGA App
      </p>
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground">Choisir une institution</h1>
      <InstitutionPicker next={next && next.startsWith("/") ? next : "/admin/dashboard"} showAllSchools={isSuperAdmin} />
    </div>
  );
}
