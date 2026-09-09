"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ListSearchBar from "@/components/admin/ListSearchBar";
import { matchesSearch } from "@/lib/searchNormalize";

interface ItemRow {
  id: string;
  name: string;
  category: string;
  identifier: string | null;
  location: string | null;
  condition: string;
  quantity: number;
  assignedTo: { name: string } | null;
}

const categoryLabels: Record<string, string> = {
  equipement: "Équipement",
  mobilier: "Mobilier",
  informatique: "Informatique",
  pedagogique: "Pédagogique",
  laboratoire: "Laboratoire",
};

const conditionLabels: Record<string, { label: string; badge: string }> = {
  bon: { label: "Bon", badge: "badge-success" },
  moyen: { label: "Moyen", badge: "badge-warning" },
  mauvais: { label: "Mauvais", badge: "badge-danger" },
  hors_service: { label: "Hors service", badge: "badge-neutral" },
};

export default function InventoryManager({ items }: { items: ItemRow[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("equipement");
  const [identifier, setIdentifier] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(
    () =>
      query.trim()
        ? items.filter((it) =>
            matchesSearch(query, it.name, categoryLabels[it.category] ?? it.category, it.identifier, it.location, it.assignedTo?.name),
          )
        : items,
    [items, query],
  );

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Nom requis.");
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/inventaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, identifier, location, quantity }),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok) return setError(json.error);
    setName(""); setIdentifier(""); setLocation(""); setQuantity(1);
    router.refresh();
  }

  async function setCondition(itemId: string, condition: string) {
    setBusy(true);
    await fetch("/api/admin/inventaire", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, condition }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={addItem} className="card mb-6 space-y-3 p-5 sm:p-6">
        <h2 className="section-label">Ajouter un article</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Nom (ex. Vidéoprojecteur)" value={name} onChange={(e) => setName(e.target.value)} />
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.entries(categoryLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="input" placeholder="Identifiant (optionnel)" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
          <input className="input" placeholder="Emplacement (optionnel)" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input className="input" type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary text-sm">Ajouter</button>
      </form>

      {items.length === 0 ? (
        <div className="empty-state">Aucun article enregistré.</div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <ListSearchBar
              value={query}
              onChange={setQuery}
              placeholder="Rechercher par nom, catégorie, emplacement…"
              className="max-w-xs flex-1"
            />
            {query && (
              <span className="text-xs text-muted">
                {filteredItems.length} / {items.length} résultat{items.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          {filteredItems.length === 0 ? (
            <p className="empty-state">Aucun résultat pour cette recherche.</p>
          ) : (
        <ul className="space-y-2">
          {filteredItems.map((it) => (
            <li key={it.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-semibold text-foreground">
                  {it.name} <span className="text-xs font-normal text-muted">· {categoryLabels[it.category] ?? it.category}</span>
                </p>
                <p className="text-xs text-muted">
                  {it.identifier ? `Réf. ${it.identifier} · ` : ""}
                  {it.location ? `${it.location} · ` : ""}
                  Qté {it.quantity}
                  {it.assignedTo ? ` · Assigné à ${it.assignedTo.name}` : ""}
                </p>
              </div>
              <select
                className="input !w-auto text-xs"
                value={it.condition}
                disabled={busy}
                onChange={(e) => setCondition(it.id, e.target.value)}
              >
                {Object.entries(conditionLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
          )}
        </>
      )}
    </div>
  );
}
