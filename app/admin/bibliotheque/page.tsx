import { prisma } from "@/lib/db";
import LibraryManager from "@/components/LibraryManager";
import { AdminShell, AdminTitleBand } from "@/components/AdminPremium";
import BackButton from "@/components/BackButton";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

// Phase C3 (2026-09-08) : cloisonnement réel — Book.school (Phase C1/C2). Les
// 3 ouvrages restés AMBIGU (catalogue sans propriétaire institutionnel
// déterminable) n'apparaissent dans aucune bibliothèque : invisibles ici,
// non perdus, à arbitrer séparément.
export default async function AdminBibliothequePage() {
  const activeSchool = await getActiveSchool();

  if (!activeSchool) {
    return (
      <AdminShell>
        <BackButton fallbackHref="/admin/centre-de-commandement" />
        <AdminTitleBand eyebrow="CCIGA — Ressources pédagogiques" title="Bibliothèque" />
        <div className="empty-state">
          La bibliothèque est propre à chaque institution — choisissez École Classique, École Professionnelle ou
          Université pour y accéder.
        </div>
      </AdminShell>
    );
  }

  const [rawBooks, allUsers] = await Promise.all([
    prisma.book.findMany({
      where: { school: activeSchool },
      include: {
        loans: {
          include: { borrower: { select: { name: true } } },
          orderBy: { borrowedAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  const books = rawBooks.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    category: b.category,
    totalCopies: b.totalCopies,
    loans: b.loans.map((l) => ({
      id: l.id,
      dueDate: l.dueDate.toISOString(),
      returnedAt: l.returnedAt ? l.returnedAt.toISOString() : null,
      borrower: { name: l.borrower.name },
    })),
  }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Ressources pédagogiques" title={`Bibliothèque — ${schoolLabels[activeSchool]}`} />
      <LibraryManager books={books} users={allUsers} />
    </AdminShell>
  );
}
