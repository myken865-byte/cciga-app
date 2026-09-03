import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SCHOOL_COOKIE, isSchoolKey, schoolLabels } from "@/lib/institutions";
import InventoryManager from "@/components/InventoryManager";

export const dynamic = "force-dynamic";

export default async function AdminInventairePage() {
  const cookieStore = await cookies();
  const rawSchool = cookieStore.get(SCHOOL_COOKIE)?.value;
  const activeSchool = isSchoolKey(rawSchool) ? rawSchool : null;

  if (!activeSchool) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold text-foreground">Inventaire</h1>
        <div className="empty-state">
          L&apos;inventaire est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </div>
    );
  }

  const items = await prisma.inventoryItem.findMany({
    where: { school: activeSchool },
    include: { assignedTo: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">
        Inventaire <span className="text-base font-normal text-muted">— {schoolLabels[activeSchool]}</span>
      </h1>
      <InventoryManager items={items} />
    </div>
  );
}
