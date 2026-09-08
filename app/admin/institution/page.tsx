import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import InstitutionPicker from "@/components/InstitutionPicker";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";

export default async function AdminInstitutionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const session = await getSession();
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");

  return (
    <AdminShell>
      <BackButton fallbackHref="/mon-espace" label="Mon espace" />
      <AdminTitleBand eyebrow="CCIGA — Sélection d'institution" title="Choisir une institution" />
      <div className="mx-auto max-w-3xl">
        <InstitutionPicker next={next && next.startsWith("/") ? next : "/admin/dashboard"} showAllSchools={isSuperAdmin} />
      </div>
    </AdminShell>
  );
}
