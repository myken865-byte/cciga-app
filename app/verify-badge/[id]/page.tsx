import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BADGE_STATUS_A_FINALISER } from "@/lib/badgeAuto";

export const metadata: Metadata = { title: "Vérification de badge" };

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  actif: "Actif",
  perdu: "Signalé perdu",
  remplace: "Remplacé",
  inactif: "Inactif",
  [BADGE_STATUS_A_FINALISER]: "À finaliser",
};

export default async function VerifyBadgePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const badge = await prisma.badge.findUnique({
    where: { id },
    include: { user: { select: { name: true } } },
  });

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/branding/CCIGA_App_Icon.png" alt="Logo CCIGA" className="h-12 w-12 rounded-md object-contain" />
      <h1 className="mb-6 mt-4 text-xl font-bold text-foreground">Vérification de badge CCIGA</h1>

      {!badge ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Badge introuvable. Ce badge n&apos;est pas authentique ou n&apos;existe plus.
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-surface p-6 text-sm">
          <p
            className={`mb-3 flex items-center gap-2 font-semibold ${
              badge.status === "actif" ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            {badge.status === "actif" ? "✅ Badge actif" : "⚠️ Badge non actif"}
          </p>
          <dl className="space-y-2">
            <div>
              <dt className="text-muted">Titulaire</dt>
              <dd className="font-medium text-foreground">{badge.user.name}</dd>
            </div>
            <div>
              <dt className="text-muted">Statut</dt>
              <dd className="font-medium text-foreground">{statusLabel[badge.status] ?? badge.status}</dd>
            </div>
          </dl>
        </div>
      )}
      <p className="mt-6 text-xs text-muted">
        Aucune donnée sensible n&apos;est affichée ici — cette page confirme uniquement le statut du badge.
      </p>
    </div>
  );
}
