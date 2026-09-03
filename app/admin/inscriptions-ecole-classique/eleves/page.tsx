import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatClassicEnrollmentFormReference } from "@/lib/classicEnrollmentFormReference";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

const badgeStatusLabels: Record<string, string> = {
  actif: "Actif",
  a_finaliser: "À finaliser",
  perdu: "Perdu",
  remplace: "Remplacé",
  inactif: "Inactif",
};

export default async function ElevesEcoleClassiquePage() {
  // Élèves déjà inscrits (item 4) : fiches validées et effectivement
  // rattachées à un compte élève — même paire de conditions que le hook
  // badge automatique (lib/badgeAuto.ts), jamais une simple lecture du statut.
  const forms = await prisma.classicEnrollmentForm.findMany({
    where: { status: "validee", studentUserId: { not: null } },
    include: { program: true, academicYear: true, student: { include: { badge: true } } },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });

  return (
    <div>
      <BackButton fallbackHref="/admin/inscriptions-ecole-classique" label="Fiches d'inscription — École Classique" />
      <h1 className="mb-6 text-2xl font-bold text-foreground">Élèves inscrits — École Classique</h1>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">CCIGA ID</th>
              <th className="px-4 py-3 font-semibold">Nom</th>
              <th className="px-4 py-3 font-semibold">Prénom</th>
              <th className="px-4 py-3 font-semibold">Classe</th>
              <th className="px-4 py-3 font-semibold">Année scolaire</th>
              <th className="px-4 py-3 font-semibold">Référence fiche</th>
              <th className="px-4 py-3 font-semibold">Badge</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {forms.map((f) => {
              const badge = f.student?.badge ?? null;
              return (
                <tr key={f.id} className="border-t border-border">
                  <td className="px-4 py-3 font-mono">
                    {f.studentUserId ? formatCcigaId(f.studentUserId) : "—"}
                  </td>
                  <td className="px-4 py-3 text-foreground">{f.lastName || "—"}</td>
                  <td className="px-4 py-3 text-foreground">{f.firstName || "—"}</td>
                  <td className="px-4 py-3 text-muted">{f.program?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{f.academicYear?.label ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {formatClassicEnrollmentFormReference(f.id)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {badge ? (badgeStatusLabels[badge.status] ?? badge.status) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {f.studentUserId && (
                      <Link href={`/admin/users/${f.studentUserId}`} className="text-primary hover:underline">
                        Voir le dossier →
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
            {forms.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted">
                  Aucun élève inscrit pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
