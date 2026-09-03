import type { Metadata } from "next";
import { cookies } from "next/headers";
import PortalHeader from "@/components/PortalHeader";
import { getSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { prisma } from "@/lib/db";
import { SCHOOL_COOKIE, isSchoolKey, schoolLabels } from "@/lib/institutions";
import InventoryManager from "@/components/InventoryManager";

export const metadata: Metadata = { title: "Portail Logistique" };

export const dynamic = "force-dynamic";

const sections = [
  { key: "inventaire", label: "Inventaire", ready: true },
  { key: "stocks", label: "Stocks", ready: false },
  { key: "fournitures", label: "Fournitures", ready: false },
  { key: "mobilier", label: "Mobilier", ready: false },
  { key: "salles", label: "Salles", ready: false },
  { key: "vehicules", label: "Véhicules", ready: false },
  { key: "maintenance", label: "Maintenance", ready: false },
  { key: "demandes", label: "Demandes logistiques", ready: false },
];

export default async function PortailLogistiquePage() {
  const session = await getSession();
  const cookieStore = await cookies();
  const rawSchool = cookieStore.get(SCHOOL_COOKIE)?.value;
  const activeSchool = isSchoolKey(rawSchool) ? rawSchool : null;

  // Le middleware (proxy.ts) impose déjà le choix d'une institution avant
  // d'atteindre cette page pour toute institution réelle ; ce garde-fou ne
  // couvre que le cas "toutes" (vue globale Super Admin), non pertinent pour
  // un inventaire qui doit rester strictement cloisonné.
  const items =
    session && activeSchool
      ? await prisma.inventoryItem.findMany({
          where: { school: activeSchool },
          include: { assignedTo: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        })
      : [];

  return (
    <div>
      <PortalHeader
        title="Portail Logistique"
        name={session?.name}
        ccigaId={session ? formatCcigaId(session.userId) : undefined}
      />
      {session && !activeSchool && (
        <div className="mx-auto max-w-2xl px-4 pb-14 lg:px-6">
          <div className="empty-state">
            La Logistique est cloisonnée par institution — choisissez École Classique, École Professionnelle ou
            Université pour accéder à l&apos;inventaire.
          </div>
        </div>
      )}
      {session && activeSchool && (
        <div className="mx-auto max-w-5xl px-4 pb-14 lg:px-6">
          <p className="mb-4 text-sm text-muted">
            Institution active : <span className="font-semibold text-foreground">{schoolLabels[activeSchool]}</span>
          </p>
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <nav className="card h-max space-y-1 p-3">
              {sections.map((s) => (
                <a
                  key={s.key}
                  href={s.ready ? `#${s.key}` : undefined}
                  aria-disabled={!s.ready}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                    s.ready
                      ? "font-medium text-foreground hover:bg-background"
                      : "cursor-not-allowed text-muted"
                  }`}
                >
                  {s.label}
                  {!s.ready && <span className="badge badge-neutral text-[10px]">À compléter</span>}
                </a>
              ))}
            </nav>

            <div className="space-y-6">
              <section id="inventaire" className="card p-6">
                <h2 className="section-label mb-3">Inventaire — {schoolLabels[activeSchool]}</h2>
                <InventoryManager items={items} />
              </section>

              {sections
                .filter((s) => !s.ready)
                .map((s) => (
                  <section key={s.key} id={s.key} className="empty-state">
                    {s.label} — module à compléter au fur et à mesure des besoins réels.
                  </section>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
