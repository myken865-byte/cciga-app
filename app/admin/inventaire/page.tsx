import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SCHOOL_COOKIE, isSchoolKey, schoolLabels } from "@/lib/institutions";
import InventoryManager from "@/components/InventoryManager";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function AdminInventairePage() {
  const cookieStore = await cookies();
  const rawSchool = cookieStore.get(SCHOOL_COOKIE)?.value;
  const activeSchool = isSchoolKey(rawSchool) ? rawSchool : null;

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Gestion des ressources" title="Inventaire" />
        <div className="empty-state">
          L&apos;inventaire est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const items = await prisma.inventoryItem.findMany({
    where: { school: activeSchool },
    include: { assignedTo: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand
        eyebrow="CCIGA — Gestion des ressources"
        title={`Inventaire — ${schoolLabels[activeSchool]}`}
      />
      <InventoryManager items={items} />
    </AdminShell>
  );
}
