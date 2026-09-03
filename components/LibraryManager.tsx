"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoanRow {
  id: string;
  dueDate: string;
  returnedAt: string | null;
  borrower: { name: string };
}
interface BookRow {
  id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  loans: LoanRow[];
}

export default function LibraryManager({ books, users }: { books: BookRow[]; users: { id: number; name: string }[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [copies, setCopies] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loanFor, setLoanFor] = useState<string | null>(null);
  const [borrowerId, setBorrowerId] = useState(users[0]?.id ?? "");
  const [dueDate, setDueDate] = useState("");

  async function addBook(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !category.trim()) {
      setError("Titre, auteur et catégorie requis.");
      return;
    }
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/bibliotheque", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, category, totalCopies: copies }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setError(json.error);
    setTitle(""); setAuthor(""); setCategory(""); setCopies("1");
    router.refresh();
  }

  async function lend(bookId: string) {
    if (!borrowerId || !dueDate) {
      setError("Emprunteur et date d'échéance requis.");
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/admin/bibliotheque/${bookId}/loan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowerId, dueDate }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setError(json.error);
    setLoanFor(null);
    setDueDate("");
    router.refresh();
  }

  async function markReturned(loanId: string) {
    setBusy(true);
    await fetch(`/api/admin/bibliotheque/${loanId}/loan`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loanId }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={addBook} className="card mb-6 space-y-3 p-5 sm:p-6">
        <h2 className="section-label">Ajouter un ouvrage au catalogue</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="input" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input className="input" placeholder="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input className="input" type="number" min="1" placeholder="Exemplaires" value={copies} onChange={(e) => setCopies(e.target.value)} />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary text-sm">Ajouter</button>
      </form>

      {books.length === 0 ? (
        <div className="empty-state">Aucun ouvrage dans le catalogue.</div>
      ) : (
        <ul className="space-y-2">
          {books.map((b) => {
            const activeLoans = b.loans.filter((l) => !l.returnedAt);
            const available = b.totalCopies - activeLoans.length;
            return (
              <li key={b.id} className="card p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{b.title}</p>
                    <p className="text-xs text-muted">{b.author} · {b.category}</p>
                  </div>
                  <span className={`badge ${available > 0 ? "badge-success" : "badge-danger"}`}>
                    {available}/{b.totalCopies} disponible(s)
                  </span>
                </div>
                {activeLoans.length > 0 && (
                  <ul className="mb-2 space-y-1">
                    {activeLoans.map((l) => (
                      <li key={l.id} className="flex items-center justify-between text-xs text-muted">
                        <span>{l.borrower.name} — échéance {l.dueDate}</span>
                        <button onClick={() => markReturned(l.id)} disabled={busy} className="text-primary hover:underline">
                          Marquer retourné
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {available > 0 && (
                  loanFor === b.id ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <select className="input !w-auto text-xs" value={borrowerId} onChange={(e) => setBorrowerId(Number(e.target.value))}>
                        {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                      </select>
                      <input type="date" className="input !w-auto text-xs" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                      <button onClick={() => lend(b.id)} disabled={busy} className="btn-secondary !min-h-0 !py-1 text-xs">Confirmer</button>
                    </div>
                  ) : (
                    <button onClick={() => setLoanFor(b.id)} className="btn-secondary !min-h-0 !py-1 text-xs">Prêter</button>
                  )
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
