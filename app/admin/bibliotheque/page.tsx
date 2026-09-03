import { prisma } from "@/lib/db";
import LibraryManager from "@/components/LibraryManager";

export const dynamic = "force-dynamic";

export default async function AdminBibliothequePage() {
  const [rawBooks, allUsers] = await Promise.all([
    prisma.book.findMany({
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
    <div>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Bibliothèque</h1>
      <LibraryManager books={books} users={allUsers} />
    </div>
  );
}
